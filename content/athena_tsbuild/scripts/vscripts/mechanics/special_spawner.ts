import { CWeightPool } from "../class/weight_pool";
import { reloadable } from "../lib/tstl-utils";

interface SpecialRush {
	round: number;
	pool: CWeightPool<string>;
	positions: Vector[];
	interval?: number;
	duration?: number;
	offset: number;
	sound?: string;
}

/** 保留原版对地图实体名或逗号分隔坐标的支持。 */
function ResolvePosition(value: string): Vector {
	const anchor = Entities.FindByName(undefined, value);
	if (IsValid(anchor)) return anchor.GetAbsOrigin();
	const parts = value.split(",").map(part => tonumber(part));
	if (parts.length === 3 && parts.every(part => part !== undefined)) return Vector(parts[0]!, parts[1]!, parts[2]!);
	throw `特殊进攻刷新位置不存在：${value}`;
}

/** 原版特殊进攻；模块通过 Event 监听波次和对局事件，自行持有计时器及实体。 */
@reloadable
export class CSpecialSpawner extends CModule {
	private runId = 0;
	private running = false;
	private rushes: Record<string, SpecialRush> = {};
	private started: Record<string, boolean> = {};
	private timers: Record<string, string> = {};
	private spawnGroups: SpawnGroupHandle[] = [];
	private units: { index: EntityIndex; unit: CDOTA_BaseNPC; }[] = [];
	private base?: CDOTA_BaseNPC;

	init(reload: boolean) {
		Event.UnregisterContext(this);
		Event.Register("game_start", this.OnGameStart, this);
		Event.Register("round_state_change", this.OnRoundStateChange, this);
		Event.Register("waves_complete", this.OnWavesComplete, this);
		Event.Register("game_end", this.OnGameEnd, this);
		Event.Register("game_reset", this.OnGameReset, this);
		Event.Register("npc_spawned", this.OnNPCSpawned, this);
		Event.Register("entity_killed", this.OnEntityKilled, this);
	}
	private OnGameStart(event: EventCallback["game_start"]) {
		const session = GameState.GetSession();
		if (event.runId !== session.runId || session.state !== "GameState_Battle" || (this.running && this.runId === event.runId)) return;
		try {
			this.reset(); this.runId = session.runId;
			// 从引擎查找已创建的基地，不通过世界适配器获取玩法对象。
			this.base = Entities.FindAllByClassname("npc_dota_creature").map(entity => entity as CDOTA_BaseNPC)
				.find(unit => IsValid(unit) && unit.GetUnitName() === "athena" && unit.GetTeamNumber() === DOTATeam_t.DOTA_TEAM_GOODGUYS && unit.IsAlive());
			if (!this.base) throw "特殊进攻缺少雅典娜基地";
			const data = LoadKeyValues("scripts/npc/kv/gameplay/special_rush.kv") as KV;
			const names: string[] = [];
			for (const name of Object.keys(data)) {
				const entry = data[name] as KV;
				if (!entry || typeof entry !== "object") continue;
				const weights: Record<string, number> = {};
				const unitPool = entry.UnitPool as Record<string, string | number> | undefined;
				for (const unitName of Object.keys(unitPool ?? {})) {
					if (!KeyValues.units[unitName]) throw `特殊进攻单位配置不存在：${unitName}`;
					weights[unitName] = tonumber(unitPool![unitName]) ?? 0;
					if (names.indexOf(unitName) < 0) names.push(unitName);
				}
				const pool = new CWeightPool(weights);
				const spawners = entry.Spawner as Record<string, number> | undefined;
				const positions = Object.keys(spawners ?? {}).map(position => ResolvePosition(position));
				const round = tonumber(entry.iRound) ?? 0;
				const interval = tonumber(entry.flInterval), duration = tonumber(entry.flDuration);
				if (round <= 0 || round % 1 !== 0 || pool.TotalWeight <= 0 || positions.length === 0 || (interval !== undefined && interval <= 0)) throw `特殊进攻配置无效：${name}`;
				this.rushes[name] = { round, pool, positions, interval, duration, offset: tonumber(entry.fSpawnOffset) ?? 0, sound: entry.sSoundName };
			}
			this.running = true;
			const rushes = this.rushes;
			for (const name of names) PrecacheUnitByNameAsync(name, handle => {
				if (this.running && this.rushes === rushes) this.spawnGroups.push(handle as SpawnGroupHandle);
				else UnloadSpawnGroupByHandle(handle as SpawnGroupHandle);
			});
		} catch (reason) { this.Stop(); GameState.FinishRun(session.runId, "error", tostring(reason)); }
	}
	private OnRoundStateChange(event: EventCallback["round_state_change"]) {
		if (!this.running || event.runId !== this.runId || event.stage !== "end") return;
		for (const name of Object.keys(this.rushes)) if (this.rushes[name].round === event.round_number) this.StartRush(name);
	}
	/** 每局每种特殊进攻只触发一次；未配置间隔时只生成一批，持续时间到达后保留已生成单位。 */
	StartRush(name: string) {
		const rush = this.rushes[name];
		if (!this.running || this.started[name] || !rush || GameState.GetSession().runId !== this.runId || GameState.GetSession().state !== "GameState_Battle") return;
		this.started[name] = true;
		const runId = this.runId, rushes = this.rushes;
		const end = rush.duration === undefined ? undefined : GameRules.GetGameTime() + rush.duration - 50 / GameRules.GetCustomGameDifficulty();
		this.timers[name] = Timer.GameTimer(0, () => {
			if (!this.running || this.rushes !== rushes || GameState.GetSession().runId !== runId || GameState.GetSession().state !== "GameState_Battle") return;
			if (end !== undefined && GameRules.GetGameTime() >= end) { delete this.timers[name]; return; }
			try {
				if (!IsValid(this.base) || !this.base.IsAlive()) throw "特殊进攻的基地目标不存在";
				for (const position of rush.positions) {
					if (!this.running) return;
					const unitName = rush.pool.Random();
					if (!unitName) throw `特殊进攻单位池为空：${name}`;
					const unit = CreateUnitByName(unitName, (position + RandomVector(RandomFloat(0, rush.offset))) as Vector, true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
					if (!IsValid(unit)) throw `特殊进攻单位创建失败：${unitName}`;
					this.TrackUnit(unit);
					const round = CustomNetTables.GetNetData("common", "round_state")?.round_number ?? rush.round;
					unit.AddNewModifier(unit, undefined, "modifier_enemy_scaling", { round_number: round });
					if (unit.IsCreature()) (unit as CDOTA_BaseNPC_Creature).SetRequiresReachingEndPath(true);
					unit.SetInitialGoalEntity(this.base); unit.SetMustReachEachGoalEntity(false);
					unit.AddNewModifier(unit, undefined, "modifier_original_health_bar", {});
					unit.SetDeathXP(0); unit.SetMaximumGoldBounty(0); unit.SetMinimumGoldBounty(0);
				}
			} catch (reason) { this.Stop(); GameState.FinishRun(runId, "error", tostring(reason)); return; }
			if (rush.interval !== undefined) return rush.interval;
			delete this.timers[name];
		});
		Notification.Upper({ message: name });
		if (rush.sound) Game.EachPlayer(id => {
			const player = PlayerResource.GetPlayer(id);
			if (IsValid(player)) EmitSoundOnClient(rush.sound!, player);
		});
	}
	private TrackUnit(unit: CDOTA_BaseNPC) {
		if (!this.units.some(record => record.unit === unit)) this.units.push({ index: unit.entindex(), unit });
	}
	private OnNPCSpawned(event: EventCallback["npc_spawned"]) {
		if (!this.running) return;
		const unit = event.unit, owner = unit.GetOwnerEntity();
		// 原版 god_body 创建的 zeus_reborn 没有 owner，仍须归入本局特殊进攻。
		if ((IsValid(owner) && this.units.some(record => record.unit === owner)) || (this.started.zeus && unit.GetUnitName() === "zeus_reborn" && unit.GetTeamNumber() === DOTATeam_t.DOTA_TEAM_BADGUYS)) this.TrackUnit(unit);
	}
	private OnEntityKilled(event: EventCallback["entity_killed"]) {
		if (this.running && this.started.zeus && event.victim.GetUnitName() === "zeus_reborn" && this.units.some(record => record.unit === event.victim)) GameState.FinishRun(this.runId, "victory", "最终首领被击败");
	}
	private OnWavesComplete(event: EventCallback["waves_complete"]) {
		if (this.running && event.runId === this.runId && !this.started.zeus) GameState.FinishRun(this.runId, "victory", "全部波次完成");
	}
	private Stop() {
		this.running = false;
		for (const timer of Object.values(this.timers)) Timer.StopTimer(timer);
		this.timers = {};
		for (const group of this.spawnGroups) UnloadSpawnGroupByHandle(group);
		this.spawnGroups = [];
	}
	private OnGameEnd(event: EventCallback["game_end"]) {
		if (event.run_id !== this.runId) return;
		this.Stop();
		for (const { unit } of this.units) if (IsValid(unit)) {
			unit.Stop(); unit.AddNewModifier(unit, undefined, "modifier_invulnerable", {}); unit.AddNewModifier(unit, undefined, "modifier_stunned", {});
		}
	}
	private OnGameReset(event: EventCallback["game_reset"]) { if (event.runId === this.runId) this.reset(); }
	/** 清理可重试，只处理本模块实体及属性；新局重新读取 KV 和创建权重池。 */
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
		this.rushes = {}; this.started = {}; this.base = undefined;
	}
}

declare global { var SpecialSpawner: CSpecialSpawner; }
SpecialSpawner ??= new CSpecialSpawner();
