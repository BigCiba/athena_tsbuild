import { RunSession } from "../class/run_session";
import { CGameStateBase } from "../class/game_state_class";
import { RoundRunner, WaveDefinition, WaveSpawner } from "../class/round_runner";

/** Dota 世界适配器。只移除本局拥有的实体，地图静态实体和账号数据不归本局清理。 */
export class AthenaRunWorld {
	private runId = 0;
	private units: CDOTA_BaseNPC[] = [];
	private heroes: Partial<Record<PlayerID, CDOTA_BaseNPC_Hero>> = {};
	private base?: CDOTA_BaseNPC;
	private rounds?: RoundRunner;
	private frozen = true;
	private session?: RunSession;
	private waves: WaveDefinition[] = [];
	private cleanupTasks: (() => void)[] = [];
	private contextActive = false;
	private ownedData: { index: EntityIndex; unit: CDOTA_BaseNPC; }[] = [];
	/** 待命和旁观英雄不能在本局外行动；开局时会被新英雄替换。 */
	PreparePlayers(players: PlayerID[]) {
		for (const id of players) {
			const hero = PlayerResource.GetSelectedHeroEntity(id);
			if (!IsValid(hero)) continue;
			hero.Stop();
			if (!hero.HasModifier("modifier_invulnerable")) hero.AddNewModifier(hero, undefined, "modifier_invulnerable", {});
			if (!hero.HasModifier("modifier_stunned")) hero.AddNewModifier(hero, undefined, "modifier_stunned", {});
		}
	}
	/** 先验证配置和地图锚点，避免缺配置时生成一半世界仍然进入战斗。 */
	Initialize(session: RunSession) {
		this.session = session; this.runId = session.runId; this.frozen = true; this.contextActive = true;
		this.waves = this.LoadWaves();
		const anchor = Entities.FindByName(undefined, "athena");
		if (!IsValid(anchor)) throw "地图缺少 athena 基地锚点";
		this.base = CreateUnitByName("athena", anchor.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
		if (!IsValid(this.base)) throw "雅典娜基地创建失败";
		this.TrackUnit(this.base, session.runId); this.base.SetForwardVector(anchor.GetForwardVector());
		this.ApplyInitialStats(this.base, KeyValues.units.athena);
		this.base.AddNewModifier(this.base, undefined, "modifier_invulnerable", {});
		const initialGold = [300, 200, 100, 0, 0][session.difficulty - 1];
		for (const id of session.participants) {
			const hero = this.CreatePlayerHero(id, session.players[id]!.hero, initialGold);
			this.heroes[id] = hero;
			this.RecordOwnedData(hero);
			this.ApplyInitialStats(hero, KeyValues.heroes[session.players[id]!.hero]);
			hero.AddNewModifier(hero, undefined, "modifier_invulnerable", {});
			hero.AddNewModifier(hero, undefined, "modifier_stunned", {});
		}
		UnitManager.reset();
		GameRules.SetCustomGameDifficulty(session.difficulty);
		Game.SetGameResult(false);
	}
	/** 沿用 c1 Player.CreateHero：安全移除旧英雄，再创建并显式绑定玩家，不混用 ReplaceHeroWith 和直接删除。 */
	private CreatePlayerHero(playerID: PlayerID, heroName: string, initialGold: number): CDOTA_BaseNPC_Hero {
		const player = PlayerResource.GetPlayer(playerID);
		if (!IsValid(player)) throw `玩家 ${playerID} 的控制实体不存在`;
		const oldHero = PlayerResource.GetSelectedHeroEntity(playerID);
		const anchor = Entities.FindByName(undefined, "athena");
		const position = IsValid(oldHero) ? oldHero.GetAbsOrigin() : IsValid(anchor) ? anchor.GetAbsOrigin() : Vector(0, 0, 0);
		// SafeRemoveUnit 清理 modifier、技能和物品，并在下一次计时回调中释放实体。
		if (IsValid(oldHero)) oldHero.SafeRemoveUnit();
		const hero = CreateUnitByName(heroName, position, true, player, player, DOTATeam_t.DOTA_TEAM_GOODGUYS) as CDOTA_BaseNPC_Hero;
		if (!IsValid(hero)) throw `玩家 ${playerID} 的英雄创建失败：${heroName}`;
		if (!hero.IsRealHero()) { (hero as CDOTA_BaseNPC).SafeRemoveUnit(); throw `配置不是英雄：${heroName}`; }
		player.SetSelectedHero(heroName);
		player.SetAssignedHeroEntity(hero);
		hero.SetPlayerID(playerID);
		hero.SetOwner(player);
		hero.SetControllableByPlayer(playerID, true);
		PlayerResource.SetGold(playerID, 0, false);
		PlayerResource.SetGold(playerID, initialGold, true);
		return hero;
	}
	StartBattle(scope: CGameStateBase) {
		this.frozen = false;
		for (const unit of [...this.units, ...Object.values(this.heroes)]) if (IsValid(unit)) {
			unit.RemoveModifierByName("modifier_invulnerable"); unit.RemoveModifierByName("modifier_stunned");
		}
		const runId = this.runId;
		scope.Listen("entity_killed", event => {
			if (this.frozen || this.runId !== runId) return;
			const victim = EntIndexToHScript(event.entindex_killed as EntityIndex) as CDOTA_BaseNPC;
			if (!IsValid(victim)) return;
			if (victim === this.base) GameState.FinishRun(runId, "defeat", "雅典娜基地被摧毁");
			else if (victim.GetUnitName() === "zeus_reborn" && this.units.indexOf(victim) >= 0) GameState.FinishRun(runId, "victory", "最终首领被击败");
		});
		scope.Register("npc_spawned", event => {
			const owner = event.unit.GetOwnerEntity();
			if (!this.frozen && IsValid(owner) && (this.units.indexOf(owner as CDOTA_BaseNPC) >= 0 || Object.values(this.heroes).indexOf(owner as CDOTA_BaseNPC_Hero) >= 0)) this.TrackUnit(event.unit, runId);
		});
		this.rounds = new RoundRunner(this.waves, {
			Spawn: spawner => this.Spawn(spawner),
			IsAlive: entity => { const unit = EntIndexToHScript(entity as EntityIndex) as CDOTA_BaseNPC; return IsValid(unit) && unit.IsAlive(); },
			Publish: (round, stage, deadline) => CustomNetTables.SetNetData("common", "round_state", { round_number: round, stage, run_id: runId, prep_end_time: stage === "prepare" ? deadline ?? 0 : 0, timed_round_end_time: stage === "battle" ? deadline : undefined }),
			Complete: () => GameState.FinishRun(runId, "victory", "全部波次完成"),
			Clear: entities => { for (const index of entities) { const unit = EntIndexToHScript(index as EntityIndex) as CDOTA_BaseNPC; if (IsValid(unit) && this.units.indexOf(unit) >= 0) UTIL_Remove(unit); } },
		});
		this.rounds.Start(GameRules.GetGameTime());
		scope.Own(() => this.rounds?.Stop());
		scope.StartThink(0.1, () => {
			if (this.frozen || this.runId !== runId) return;
			try { this.rounds?.Tick(GameRules.GetGameTime()); } catch (reason) { GameState.FinishRun(runId, "error", tostring(reason)); return; }
			return 0.1;
		});
	}
	/** 异步创建的实体必须携带所属局号；旧局晚到实体立即释放。 */
	TrackUnit(unit: CDOTA_BaseNPC, runId: number) {
		if (!this.contextActive || runId !== this.runId || runId !== this.session?.runId || (this.session.state !== "GameState_RunInit" && this.session.state !== "GameState_Battle")) { if (IsValid(unit)) UTIL_Remove(unit); return; }
		if (this.units.indexOf(unit) < 0) this.units.push(unit);
		this.RecordOwnedData(unit);
	}
	private RecordOwnedData(unit: CDOTA_BaseNPC) { if (!this.ownedData.some(record => record.unit === unit)) this.ownedData.push({ index: unit.entindex(), unit }); }
	/** 后续掉落、场景粒子等模块通过此入口绑定本局释放函数。 */
	Own(runId: number, cleanup: () => void) {
		if (!this.contextActive || runId !== this.runId || runId !== this.session?.runId || (this.session.state !== "GameState_RunInit" && this.session.state !== "GameState_Battle")) { cleanup(); return; }
		this.cleanupTasks.push(cleanup);
	}
	/** 把原版初始 KV 数值写入新属性系统和引擎。技能、装备及成长效果另行迁移。 */
	private ApplyInitialStats(unit: CDOTA_BaseNPC, data: KV) {
		const health = math.max(1, tonumber(data.CustomStatusHealth) ?? unit.GetMaxHealth_Engine());
		const attack = tonumber(data.AttackDamage) ?? unit.GetAttackDamage_Engine();
		const mana = tonumber(data.StatusMana) ?? unit.GetMaxMana_Engine();
		const source = `run:${this.runId}:kv`;
		PropertySystem.AddStaticProperty(unit.entindex(), "base_health", source, health);
		PropertySystem.AddStaticProperty(unit.entindex(), "base_attack", source, attack);
		PropertySystem.AddStaticProperty(unit.entindex(), "base_mana", source, mana);
		unit.SetBaseMaxHealth(health); unit.SetMaxHealth(health); unit.SetHealth(health);
		unit.SetBaseDamageMin(attack); unit.SetBaseDamageMax(attack);
		unit.SetMaxMana(mana); unit.SetMana(mana);
		unit.SetPhysicalArmorBaseValue(tonumber(data.Armor) ?? 0);
	}
	private Spawn(spawner: WaveSpawner) {
		if (this.frozen) throw "已结束的对局禁止刷怪";
		const anchor = Entities.FindByName(undefined, spawner.anchor);
		if (!IsValid(anchor)) throw `刷怪锚点不存在：${spawner.anchor}`;
		const unit = CreateUnitByName(spawner.unit, anchor.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
		if (!IsValid(unit)) throw `单位创建失败：${spawner.unit}`;
		this.TrackUnit(unit, this.runId);
		this.ApplyInitialStats(unit, KeyValues.units[spawner.unit]);
		if (IsValid(this.base)) unit.MoveToTargetToAttack(this.base);
		return unit.entindex();
	}
	Freeze() {
		this.frozen = true; this.rounds?.Stop(); Bullet.reset();
		if (GameRules.IsGamePaused()) Game.Pause(false);
		for (const unit of [...this.units, ...Object.values(this.heroes)]) if (IsValid(unit)) {
			unit.Stop(); unit.AddNewModifier(unit, undefined, "modifier_invulnerable", {}); unit.AddNewModifier(unit, undefined, "modifier_stunned", {});
		}
	}
	/** 清理可重入；每移除一个实体即从清单移除，失败时允许重试。 */
	Cleanup() {
		this.contextActive = false;
		this.Freeze();
		while (this.cleanupTasks.length > 0) { this.cleanupTasks[this.cleanupTasks.length - 1](); this.cleanupTasks.pop(); }
		while (this.ownedData.length > 0) {
			const record = this.ownedData[this.ownedData.length - 1];
			const current = EntIndexToHScript(record.index);
			// 索引被复用给其他实体时，不能清掉新实体的数据。
			if (!IsValid(current) || current === record.unit) {
				PropertySystem.CleanupUnitPropertiesByIndex(record.index); StateSystem.CleanupUnitStatesByIndex(record.index); AbilityUpgrade.CleanupUnitUpgrades(record.index);
			}
			this.ownedData.pop();
		}
		for (const key of Object.keys(this.heroes)) {
			const id = Number(key) as PlayerID;
			const placeholder = this.CreatePlayerHero(id, "npc_dota_hero_phantom_assassin", 0);
			placeholder.AddNewModifier(placeholder, undefined, "modifier_invulnerable", {});
			placeholder.AddNewModifier(placeholder, undefined, "modifier_stunned", {});
			delete this.heroes[id];
		}
		while (this.units.length > 0) { const unit = this.units[this.units.length - 1]; if (IsValid(unit)) UTIL_Remove(unit); this.units.pop(); }
		this.base = undefined; this.rounds = undefined;
		for (const id of this.session?.participants ?? []) PropertySystem.ClearDynamicPropertyCache(PropertyScope.PLAYER, id);
		DamageCounter.reset(); DataRecord.reset(); UnitManager.reset(); Game.ResetRunState();
		CustomNetTables.SetNetData("common", "round_state", undefined);
	}
	/** 读取原版 round/spawner_group，当前迁移普通波次刷怪，不复制原版技能和 AI。 */
	private LoadWaves(): WaveDefinition[] {
		const rounds = LoadKeyValues("scripts/npc/kv/gameplay/round.kv") as KV;
		const groups = LoadKeyValues("scripts/npc/kv/gameplay/spawner_group.kv") as KV;
		const result: WaveDefinition[] = [];
		for (const key of Object.keys(rounds)) {
			const data = rounds[key]; if (typeof data !== "object") continue;
			const group = groups[tostring(data.SpawnerGroupID)] as Record<string, any> | undefined; if (!group) throw `波次刷怪组不存在：${data.SpawnerGroupID}`;
			const spawners: WaveSpawner[] = [];
			for (const name of Object.keys(group)) {
				const spawn = group[name]; if (typeof spawn !== "object" || !spawn.NPCName) continue;
				if (!KeyValues.units[spawn.NPCName] || !IsValid(Entities.FindByName(undefined, spawn.SpawnerName))) throw `刷怪配置或锚点不存在：${spawn.NPCName}/${spawn.SpawnerName}`;
				const total = tonumber(spawn.TotalUnitsToSpawn) ?? 0, batch = tonumber(spawn.UnitsPerSpawn) ?? 1;
				if (total <= 0 || total % 1 !== 0 || batch <= 0 || batch % 1 !== 0) throw `刷怪数量配置无效：${key}/${name}`;
				spawners.push({ unit: spawn.NPCName, anchor: spawn.SpawnerName, total, batch, interval: math.max(0.1, tonumber(spawn.SpawnInterval) ?? 0.1), wait: math.max(0, tonumber(spawn.WaitForTime) ?? 0) });
			}
			if (!spawners.length) throw `波次没有刷怪配置：${key}`;
			const number = tonumber(data.RoundNumber) ?? 0;
			if (number <= 0 || result.some(wave => wave.number === number)) throw `波次编号无效或重复：${key}`;
			const duration = tonumber(data.TimedRound) === 1 ? tonumber(data.RoundDuration) : undefined;
			if (tonumber(data.TimedRound) === 1 && (duration === undefined || duration <= 0)) throw `定时波次时长无效：${key}`;
			result.push({ number, prepare: math.max(0, tonumber(data.PrepareRoundTime) ?? 0), duration, spawners });
		}
		if (!result.length) throw "缺少有效波次配置";
		return result.sort((a, b) => a.number - b.number);
	}
}
