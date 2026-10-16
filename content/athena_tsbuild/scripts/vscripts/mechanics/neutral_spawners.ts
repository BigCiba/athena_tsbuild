import { reloadable } from "../lib/tstl-utils";

/** 每个 KV Unit 条目独立计时；该条目全部死亡后，才在下次检查时整批刷新。 */
interface NeutralCamp {
	unit: string;
	elite: string;
	eliteChance: number;
	count: number;
	wait: number;
	interval: number;
	position: Vector;
	offset: number;
	forward?: Vector;
	grow: boolean;
	level: number;
	remaining: CDOTA_BaseNPC[];
}

/** 原版支持地图实体名和逗号分隔坐标；ForwardVector 也使用同一种写法。 */
function ResolveVector(value: string): Vector {
	const entity = Entities.FindByName(undefined, value);
	if (IsValid(entity)) return entity.GetAbsOrigin();
	const parts = value.split(",").map(part => tonumber(part));
	if (parts.length === 3 && parts.every(part => part !== undefined)) return Vector(parts[0]!, parts[1]!, parts[2]!);
	throw `野怪刷新位置或向量无效：${value}`;
}

/** 野怪模块自行订阅 Event，持有计时器、预载和实体，不依赖世界适配器。 */
@reloadable
export class CNeutralSpawners extends CModule {
	private runId = 0;
	private running = false;
	private camps: NeutralCamp[] = [];
	private timers: string[] = [];
	private spawnGroups: SpawnGroupHandle[] = [];
	private units: { index: EntityIndex; unit: CDOTA_BaseNPC; }[] = [];

	init(reload: boolean) {
		Event.UnregisterContext(this);
		Event.Register("game_start", this.OnGameStart, this);
		Event.Register("game_end", this.OnGameEnd, this);
		Event.Register("game_reset", this.OnGameReset, this);
		Event.Register("entity_killed", this.OnEntityKilled, this);
		Event.Register("npc_spawned", this.OnNPCSpawned, this);
	}
	/** 保留原版查询语义：GrowUp 条目返回下次生成所用的等级。 */
	GetLevel(unitName: string) { return this.camps.find(camp => camp.unit === unitName)?.level; }
	private LoadCamps(): NeutralCamp[] {
		const data = LoadKeyValues("scripts/npc/kv/gameplay/neutral_spawners.kv") as KV;
		const camps: NeutralCamp[] = [];
		for (const groupName of Object.keys(data)) {
			const group = data[groupName] as KV | undefined;
			if (typeof group !== "object" || !group) continue;
			for (const name of Object.keys(group)) {
				const spawn = group[name] as KV;
				if (typeof spawn !== "object" || !spawn || !spawn.NPCName) continue;
				if (!KeyValues.units[spawn.NPCName] || (spawn.EliteName && !KeyValues.units[spawn.EliteName])) throw `野怪单位配置不存在：${spawn.NPCName}/${spawn.EliteName ?? ""}`;
				const count = tonumber(spawn.TotalUnitsToSpawn) ?? 0;
				if (count <= 0 || count % 1 !== 0) throw `野怪刷新数量无效：${spawn.NPCName}`;
				camps.push({
					unit: spawn.NPCName, elite: spawn.EliteName ?? "", eliteChance: tonumber(spawn.EliteChance) ?? 0, count,
					wait: math.max(0, tonumber(spawn.WaitForTime) ?? 0), interval: math.max(0, tonumber(spawn.SpawnInterval) ?? 0),
					position: ResolveVector(spawn.SpawnerName ?? ""), offset: math.max(0, tonumber(spawn.SpawnOffset) ?? 0),
					forward: spawn.ForwardVector ? ResolveVector(spawn.ForwardVector) : undefined,
					grow: tonumber(spawn.GrowUp) === 1, level: 1, remaining: [],
				});
			}
		}
		if (camps.length === 0) throw "缺少有效野怪刷新配置";
		return camps;
	}
	private OnGameStart(event: EventCallback["game_start"]) {
		const session = GameState.GetSession();
		if (event.runId !== session.runId || session.state !== "GameState_Battle" || (this.running && this.runId === event.runId)) return;
		const runId = session.runId;
		try {
			this.reset(); this.runId = runId;
			const camps = this.camps = this.LoadCamps();
			this.running = true;
			const names: string[] = [];
			for (const camp of camps) {
				for (const name of [camp.unit, camp.elite]) {
					if (name === "" || names.indexOf(name) >= 0) continue;
					names.push(name);
					PrecacheUnitByNameAsync(name, handle => {
						if (this.running && this.camps === camps) this.spawnGroups.push(handle as SpawnGroupHandle);
						else UnloadSpawnGroupByHandle(handle as SpawnGroupHandle);
					});
				}
				this.timers.push(Timer.GameTimer(camp.wait, () => {
					if (!this.running || this.camps !== camps || GameState.GetSession().runId !== runId || GameState.GetSession().state !== "GameState_Battle") return;
					try {
						// 引擎击杀或直接移除也能被下一次检查收敛，不依赖每次死亡都经过伤害系统。
						camp.remaining = camp.remaining.filter(unit => IsValid(unit) && unit.IsAlive());
						if (camp.remaining.length === 0) this.SpawnCamp(camp);
					} catch (reason) { this.Stop(); GameState.FinishRun(runId, "error", tostring(reason)); return; }
					if (this.running && this.camps === camps) return camp.interval;
				}));
			}
		} catch (reason) { this.Stop(); GameState.FinishRun(runId, "error", tostring(reason)); }
	}
	private SpawnCamp(camp: NeutralCamp) {
		for (let i = 0; this.running && i < camp.count; i++) {
			const name = camp.elite !== "" && RollPercentage(camp.eliteChance) ? camp.elite : camp.unit;
			const position = (camp.position + RandomVector(RandomFloat(0, camp.offset))) as Vector;
			const unit = CreateUnitByName(name, position, true, undefined, undefined, DOTATeam_t.DOTA_TEAM_BADGUYS);
			if (!IsValid(unit)) throw `野怪单位创建失败：${name}`;
			this.TrackUnit(unit); camp.remaining.push(unit);
			if (camp.grow) {
				if (unit.IsCreature()) (unit as CDOTA_BaseNPC_Creature).CreatureLevelUp(camp.level - 1);
				camp.level++;
			}
			const round = CustomNetTables.GetNetData("common", "round_state")?.round_number ?? 1;
			unit.AddNewModifier(unit, undefined, "modifier_enemy_scaling", { round_number: round });
			unit.SetForwardVector(camp.forward ?? RandomVector(1));
			unit.AddNewModifier(unit, undefined, "modifier_neutral", {});
			unit.SetDeathXP(0); unit.SetMaximumGoldBounty(0); unit.SetMinimumGoldBounty(0);
		}
	}
	private TrackUnit(unit: CDOTA_BaseNPC) {
		if (!this.units.some(record => record.unit === unit)) this.units.push({ index: unit.entindex(), unit });
	}
	private OnEntityKilled(event: EventCallback["entity_killed"]) {
		if (!this.running) return;
		for (const camp of this.camps) {
			const index = camp.remaining.indexOf(event.victim);
			if (index >= 0) { camp.remaining.splice(index, 1); return; }
		}
	}
	/** 野怪召唤物只归模块清理，不计入原版刷怪条目的补怪条件。 */
	private OnNPCSpawned(event: EventCallback["npc_spawned"]) {
		if (!this.running) return;
		const owner = event.unit.GetOwnerEntity();
		if (IsValid(owner) && this.units.some(record => record.unit === owner)) this.TrackUnit(event.unit);
	}
	private Stop() {
		this.running = false;
		for (const timer of this.timers) Timer.StopTimer(timer);
		this.timers = [];
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
	/** 清理失败时保留剩余记录，现有 Reset 阶段可重试；不清理其他模块和地图实体。 */
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
		this.camps = [];
	}
}

declare global { var NeutralSpawners: CNeutralSpawners; }
NeutralSpawners ??= new CNeutralSpawners();
