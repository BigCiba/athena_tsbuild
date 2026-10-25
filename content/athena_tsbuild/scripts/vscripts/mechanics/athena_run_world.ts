import { RunSession } from "../class/run_session";
import { CGameStateBase } from "../class/game_state_class";

/** Dota 世界适配器。只移除本局拥有的实体，地图静态实体和账号数据不归本局清理。 */
export class AthenaRunWorld {
	private runId = 0;
	private units: CDOTA_BaseNPC[] = [];
	private heroes: Partial<Record<PlayerID, CDOTA_BaseNPC_Hero>> = {};
	private base?: CDOTA_BaseNPC;
	private frozen = true;
	private session?: RunSession;
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
		const anchor = Entities.FindByName(undefined, "athena");
		if (!IsValid(anchor)) throw "地图缺少 athena 基地锚点";
		this.base = CreateUnitByName("athena", anchor.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
		if (!IsValid(this.base)) throw "雅典娜基地创建失败";
		this.TrackUnit(this.base, session.runId); this.base.SetForwardVector(anchor.GetForwardVector());
		this.base.AddNewModifier(this.base, undefined, "modifier_invulnerable", {});
		for (const id of session.participants) {
			const hero = this.CreatePlayerHero(id, session.players[id]!.hero);
			this.heroes[id] = hero;
			this.RecordOwnedData(hero);
			hero.AddNewModifier(hero, undefined, "modifier_invulnerable", {});
			hero.AddNewModifier(hero, undefined, "modifier_stunned", {});
		}
		UnitManager.reset();
		GameRules.SetCustomGameDifficulty(session.difficulty);
		Game.SetGameResult(false);
	}
	/** 沿用 c1 Player.CreateHero：安全移除旧英雄，再创建并显式绑定玩家，不混用 ReplaceHeroWith 和直接删除。 */
	private CreatePlayerHero(playerID: PlayerID, heroName: string): CDOTA_BaseNPC_Hero {
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
		PlayerResource.SetGold(playerID, 0, true);
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
	Freeze() {
		this.frozen = true; Bullet.reset();
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
			// 待命沿用本局已加载的英雄，避免重开时临时加载另一个英雄及其饰品模型。
			const placeholder = this.CreatePlayerHero(id, this.session!.players[id]!.hero);
			placeholder.AddNewModifier(placeholder, undefined, "modifier_invulnerable", {});
			placeholder.AddNewModifier(placeholder, undefined, "modifier_stunned", {});
			delete this.heroes[id];
		}
		while (this.units.length > 0) { const unit = this.units[this.units.length - 1]; if (IsValid(unit)) UTIL_Remove(unit); this.units.pop(); }
		this.base = undefined;
		for (const id of this.session?.participants ?? []) PropertySystem.ClearDynamicPropertyCache(PropertyScope.PLAYER, id);
		DamageCounter.reset(); DataRecord.reset(); UnitManager.reset(); Game.ResetRunState();
	}
}
