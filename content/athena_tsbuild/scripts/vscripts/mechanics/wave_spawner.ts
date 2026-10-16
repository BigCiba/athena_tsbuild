import { reloadable } from "../lib/tstl-utils";

/** 原版 rounds / CRound / CSpawner 的波次主链；模块通过 Event 自行管理每局刷怪。 */
export interface WaveSpawner {
	unit: string;
	anchor: string;
	total: number;
	batch: number;
	interval: number;
	wait: number;
	level?: number;
	championUnit?: string;
	championChance?: number;
	championMax?: number;
	championIntervalMax?: number;
	championLevel?: number;
	championScale?: number;
}
export interface WaveDefinition { number: number; prepare: number; duration?: number; sound?: string; spawners: WaveSpawner[]; }
export interface WaveHost {
	Spawn(spawner: WaveSpawner, champion: boolean, round: number): number;
	IsAlive(entity: number): boolean;
	Publish(round: number, stage: "prepare" | "battle" | "end", deadline?: number): void;
	Complete(): void;
	Clear?(entities: number[]): void;
}

/** 只推进当前波次；全部生成且清空存活怪物才结束，定时波次也可在时限到达后结束。 */
export class RoundRunner {
	private index = 0;
	private stage: "prepare" | "battle" | "end" = "prepare";
	private deadline = 0;
	private active = false;
	private enemies: number[] = [];
	private spawnState: { spawned: number; champions: number; next: number; }[] = [];
	constructor(private waves: WaveDefinition[], private host: WaveHost) { }
	Start(now: number) { this.Stop(); this.active = true; this.index = 0; this.Prepare(now); }
	/** 停止后不能继续刷怪。实体由所属对局清理。 */
	Stop() { this.active = false; }
	/** 波次怪召唤的敌人也计入清场条件。 */
	TrackEnemy(entity: number) { if (this.active && this.stage === "battle" && this.enemies.indexOf(entity) < 0) this.enemies.push(entity); }
	/** 调试暂停只清理当前波次敌人，保留已生成数量和后续批次进度。 */
	ClearEnemies() { this.host.Clear?.(this.enemies.slice()); this.enemies = []; }
	private Prepare(now: number) {
		const wave = this.waves[this.index];
		if (!wave) { this.active = false; this.host.Complete(); return; }
		this.stage = "prepare"; this.deadline = now + wave.prepare; this.enemies = [];
		this.spawnState = wave.spawners.map(() => ({ spawned: 0, champions: 0, next: 0 }));
		const names: string[] = [];
		for (const spawner of wave.spawners) {
			for (const name of [spawner.unit, spawner.championUnit]) {
				if (!name || names.indexOf(name) >= 0) continue;
				names.push(name);
				// 单位预载编号不是本模块创建的地图 spawn group，资源由引擎随地图管理。
				PrecacheUnitByNameAsync(name, () => {});
			}
		}
		this.host.Publish(wave.number, this.stage, this.deadline);
	}
	Tick(now: number) {
		if (!this.active) return;
		const wave = this.waves[this.index];
		if (this.stage === "end") { this.index++; this.Prepare(now); return; }
		if (this.stage === "prepare") {
			if (now < this.deadline) return;
			this.stage = "battle"; this.deadline = wave.duration === undefined ? 0 : now + wave.duration;
			// WaitForTime 从实际开波时刻计算，不能因上一帧延迟而提前刷怪。
			for (let i = 0; i < wave.spawners.length; i++) this.spawnState[i].next = now + wave.spawners[i].wait;
			if (wave.sound) Game.EachPlayer(id => {
				const player = PlayerResource.GetPlayer(id);
				if (IsValid(player)) EmitSoundOnClient(wave.sound!, player);
			});
			this.host.Publish(wave.number, this.stage, this.deadline || undefined);
		}
		const expired = this.deadline > 0 && now >= this.deadline;
		for (let i = 0; this.active && !expired && i < wave.spawners.length; i++) {
			const spawner = wave.spawners[i], progress = this.spawnState[i];
			if (progress.spawned >= spawner.total || now < progress.next) continue;
			const count = Math.min(spawner.batch, spawner.total - progress.spawned);
			let champions = 0;
			EmitGlobalSound("Tutorial.Quest.complete_01");
			for (let n = 0; this.active && n < count; n++) {
				const champion = progress.champions < (spawner.championMax ?? 1) && champions < (spawner.championIntervalMax ?? 999) && RollPercentage(spawner.championChance ?? 0);
				this.enemies.push(this.host.Spawn(spawner, champion, wave.number));
				progress.spawned++;
				if (champion) { progress.champions++; champions++; }
			}
			progress.next += spawner.interval;
		}
		if (!this.active) return;
		this.enemies = this.enemies.filter(entity => this.host.IsAlive(entity));
		const finishedSpawning = wave.spawners.every((spawner, i) => this.spawnState[i].spawned >= spawner.total);
		if (expired || (finishedSpawning && this.enemies.length === 0)) {
			this.host.Clear?.(this.enemies.slice());
			this.stage = "end"; this.host.Publish(wave.number, this.stage);
		}
	}
}

/** 与 c1 一致：玩法模块自行订阅生命周期，世界适配器不创建或调度波次。 */
@reloadable
export class CWaveSpawner extends CModule {
	private runId = 0;
	private runner?: RoundRunner;
	private timer?: string;
	private units: { index: EntityIndex; unit: CDOTA_BaseNPC; }[] = [];
	private creepsEnabled = true;

	init(reload: boolean) {
		this.creepsEnabled = Demo.IsCreepsEnabled();
		Event.UnregisterContext(this);
		Event.Register("game_start", this.OnGameStart, this);
		Event.Register("game_end", this.OnGameEnd, this);
		Event.Register("game_reset", this.OnGameReset, this);
		Event.Register("npc_spawned", this.OnNPCSpawned, this);
		Event.Register("demo_creeps_changed", this.OnCreepsChanged, this);
	}
	private OnCreepsChanged(event: EventCallback["demo_creeps_changed"]) {
		this.creepsEnabled = event.enabled;
		if (!event.enabled) this.runner?.ClearEnemies();
	}
	private OnGameStart(event: EventCallback["game_start"]) {
		const session = GameState.GetSession();
		if (event.runId !== session.runId || session.state !== "GameState_Battle" || (this.runner && this.runId === event.runId)) return;
		const runId = session.runId;
		try {
			this.reset();
			this.runId = runId;
			const runner = new RoundRunner(LoadWaves(), {
				Spawn: (spawner, champion, round) => SpawnWaveUnit(spawner, champion, round, runId, unit => this.TrackUnit(unit)).entindex(),
				IsAlive: index => {
					const unit = EntIndexToHScript(index as EntityIndex) as CDOTA_BaseNPC;
					return IsValid(unit) && unit.IsAlive();
				},
				Publish: (round, stage, deadline) => {
					CustomNetTables.SetNetData("common", "round_state", {
						round_number: round, stage, run_id: runId,
						prep_end_time: stage === "prepare" ? deadline ?? 0 : 0,
						timed_round_end_time: stage === "battle" ? deadline : undefined,
					});
					Event.Fire("round_state_change", { runId, round_number: round, stage });
				},
				Complete: () => { this.Stop(); Event.Fire("waves_complete", { runId }); },
				Clear: indices => {
					for (const record of this.units) if (indices.indexOf(record.index) >= 0 && IsValid(record.unit)) UTIL_Remove(record.unit);
				},
			});
			this.runner = runner;
			runner.Start(GameRules.GetGameTime());
			this.timer = Timer.GameTimer(0.1, () => {
				if (this.runner !== runner || this.runId !== runId || GameState.GetSession().runId !== runId || GameState.GetSession().state !== "GameState_Battle") return;
				try { if (this.creepsEnabled) runner.Tick(GameRules.GetGameTime()); }
				catch (reason) { this.Stop(); GameState.FinishRun(runId, "error", tostring(reason)); return; }
				if (this.runner === runner) return 0.1;
			});
		} catch (reason) {
			this.Stop(); GameState.FinishRun(runId, "error", tostring(reason));
		}
	}
	private TrackUnit(unit: CDOTA_BaseNPC) {
		if (!this.units.some(record => record.unit === unit)) this.units.push({ index: unit.entindex(), unit });
	}
	private OnNPCSpawned(event: EventCallback["npc_spawned"]) {
		if (!this.runner) return;
		const owner = event.unit.GetOwnerEntity();
		if (IsValid(owner) && this.units.some(record => record.unit === owner)) {
			this.TrackUnit(event.unit);
			if (event.unit.GetTeamNumber() === DOTATeam_t.DOTA_TEAM_BADGUYS) this.runner.TrackEnemy(event.unit.entindex());
		}
	}
	private Stop() {
		if (this.timer) { Timer.StopTimer(this.timer); this.timer = undefined; }
		this.runner?.Stop(); this.runner = undefined;
	}
	private OnGameEnd(event: EventCallback["game_end"]) {
		if (event.run_id !== this.runId) return;
		this.Stop();
		for (const { unit } of this.units) if (IsValid(unit)) {
			unit.Stop(); unit.AddNewModifier(unit, undefined, "modifier_invulnerable", {}); unit.AddNewModifier(unit, undefined, "modifier_stunned", {});
		}
	}
	private OnGameReset(event: EventCallback["game_reset"]) { if (event.runId === this.runId) this.reset(); }
	/** 清理可重入；只释放本模块创建的单位及其局内数据，保留地图和账号模块。 */
	reset() {
		this.Stop();
		while (this.units.length > 0) {
			const record = this.units[this.units.length - 1];
			const current = EntIndexToHScript(record.index);
			if (!IsValid(current) || current === record.unit) {
				PropertySystem.CleanupUnitPropertiesByIndex(record.index); StateSystem.CleanupUnitStatesByIndex(record.index); AbilityUpgrade.CleanupUnitUpgrades(record.index);
			}
			if (IsValid(record.unit)) UTIL_Remove(record.unit);
			this.units.pop();
		}
		CustomNetTables.SetNetData("common", "round_state", undefined);
	}
}

declare global { var WaveSpawning: CWaveSpawner; }
WaveSpawning ??= new CWaveSpawner();

/** 每局重新读取原版 KV；保留当前 38 波实际使用的字段和默认值。 */
export function LoadWaves(): WaveDefinition[] {
	const rounds = LoadKeyValues("scripts/npc/kv/gameplay/round.kv") as KV;
	const groups = LoadKeyValues("scripts/npc/kv/gameplay/spawner_group.kv") as KV;
	const result: WaveDefinition[] = [];
	for (const key of Object.keys(rounds)) {
		const data = rounds[key]; if (typeof data !== "object") continue;
		const group = groups[tostring(data.SpawnerGroupID)] as KV | undefined;
		if (!group) throw `波次刷怪组不存在：${data.SpawnerGroupID}`;
		const spawners: WaveSpawner[] = [];
		for (const name of Object.keys(group)) {
			const spawn = group[name]; if (typeof spawn !== "object" || !spawn.NPCName) continue;
			if (!KeyValues.units[spawn.NPCName] || (spawn.ChampionNPCName && !KeyValues.units[spawn.ChampionNPCName]) || !IsValid(Entities.FindByName(undefined, spawn.SpawnerName))) throw `刷怪配置或锚点不存在：${spawn.NPCName}/${spawn.SpawnerName}`;
			const total = tonumber(spawn.TotalUnitsToSpawn) ?? 0, batch = tonumber(spawn.UnitsPerSpawn) ?? 1;
			if (total <= 0 || total % 1 !== 0 || batch <= 0 || batch % 1 !== 0) throw `刷怪数量配置无效：${key}/${name}`;
			spawners.push({
				unit: spawn.NPCName, anchor: spawn.SpawnerName, total, batch,
				interval: math.max(0, tonumber(spawn.SpawnInterval) ?? 0), wait: math.max(0, tonumber(spawn.WaitForTime) ?? 0),
				level: tonumber(spawn.CreatureLevel) ?? 0, championUnit: spawn.ChampionNPCName,
				championChance: tonumber(spawn.ChampionChance) ?? 0, championMax: tonumber(spawn.ChampionMax) ?? 1,
				championIntervalMax: tonumber(spawn.ChampionIntervalMax) ?? 999,
				championLevel: tonumber(spawn.ChampionBonusLevel) ?? 0, championScale: tonumber(spawn.ChampionBonusModelScale) ?? 1,
			});
		}
		if (spawners.length === 0) throw `波次没有刷怪配置：${key}`;
		const number = tonumber(data.RoundNumber) ?? 0;
		if (number <= 0 || number % 1 !== 0 || result.some(wave => wave.number === number)) throw `波次编号无效或重复：${key}`;
		const duration = (tonumber(data.TimedRound) ?? 0) !== 0 ? tonumber(data.TimedRoundDuration) ?? 60 : undefined;
		if (duration !== undefined && duration <= 0) throw `定时波次时长无效：${key}`;
		result.push({ number, prepare: math.max(0, tonumber(data.PrepareRoundTime) ?? 0), duration, sound: data.SoundName, spawners });
	}
	if (result.length === 0) throw "缺少有效波次配置";
	return result.sort((a, b) => a.number - b.number);
}

/** 生成波次单位，沿用原版难度/波数成长、精英规则、朝向、路径目标和零引擎赏金。 */
export function SpawnWaveUnit(spawner: WaveSpawner, champion: boolean, round: number, runId: number, track: (unit: CDOTA_BaseNPC) => void): CDOTA_BaseNPC {
	const name = champion && spawner.championUnit ? spawner.championUnit : spawner.unit;
	const anchor = Entities.FindByName(undefined, spawner.anchor);
	if (!IsValid(anchor)) throw `刷怪锚点不存在：${spawner.anchor}`;
	const unit = CreateUnitByName(name, anchor.GetAbsOrigin(), true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
	if (!IsValid(unit)) throw `单位创建失败：${name}`;
	track(unit);
	unit.SetForwardVector(anchor.GetForwardVector());
	unit.iRoundNumber = round;
	unit.iDefendingTeamNumber = DOTATeam_t.DOTA_TEAM_GOODGUYS;
	if (unit.IsCreature()) {
		const creature = unit as CDOTA_BaseNPC_Creature;
		if ((spawner.level ?? 0) > 0) creature.CreatureLevelUp(spawner.level! - unit.GetLevel());
		if (champion) {
			creature.CreatureLevelUp(spawner.championLevel ?? 0); creature.SetChampion(true);
			if (!spawner.championUnit) unit.SetModelScale(unit.GetModelScale() + (spawner.championScale ?? 1));
		}
	}
	const difficulty = GameRules.GetCustomGameDifficulty();
	const elite = difficulty >= 3 && name.indexOf("wave_") >= 0 && RollPercentage(difficulty * 2);
	unit.AddNewModifier(unit, undefined, "modifier_enemy_scaling", { round_number: round });
	if (unit.IsCreature()) (unit as CDOTA_BaseNPC_Creature).SetRequiresReachingEndPath(true);
	unit.SetInitialGoalEntity(anchor); unit.SetMustReachEachGoalEntity(false);
	unit.SetDeathXP(0); unit.SetMaximumGoldBounty(0); unit.SetMinimumGoldBounty(0);
	unit.AddNewModifier(unit, undefined, champion ? "modifier_champion" : "modifier_wave", { round_number: round });
	if (elite) unit.AddNewModifier(unit, undefined, "modifier_elite", { round_number: round });
	return unit;
}
