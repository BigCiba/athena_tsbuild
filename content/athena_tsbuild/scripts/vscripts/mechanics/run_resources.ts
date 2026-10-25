import { reloadable } from "../lib/tstl-utils";

/** 局内资源、击杀基础奖励与资源类任务奖励。金币以引擎为准，账号资产不在本模块内。 */
@reloadable
export class CRunResources extends CModule {
	private runId = 0;
	private running = false;
	private lastTick = 0;
	private heroes: Partial<Record<PlayerID, CDOTA_BaseNPC_Hero>> = {};
	private balances: Partial<Record<PlayerID, { crystal: number; score: number; goldFraction: number; }>> = {};
	private snapshot: AthenaResourceSnapshot = { run_id: 0, active: false, players: {} };
	init() {
		Event.UnregisterContext(this);
		// 必须先于任务/属性模块开始；重复 game_start 不重置余额。
		Event.RegisterWithPriority("game_start", ({ runId }) => {
			if (runId === undefined) return;
			try { this.Start(runId); }
			catch (error) { this.running = false; this.Publish(); GameState.FinishRun(runId, "error", tostring(error)); }
		}, 300, this);
		Event.RegisterWithPriority("entity_killed", this.OnKilled, 300, this);
		Event.RegisterWithPriority("tick_time", this.OnTick, 50, this); // 属性模块先刷新装备收益。
		Event.Register("npc_spawned", ({ unit }) => this.TrackSpawn(unit), this);
		Event.Register("hero_level_up", ({ unit }) => {
			const id = unit.GetPlayerOwnerID();
			if (this.Active(id, this.runId) && this.heroes[id] === unit) this.Publish();
		}, this);
		Event.Register("task_reward", reward => {
			if (reward.handled || reward.type !== "TASK_REWARD_TYPE_RESOURCE") return;
			const resources: Record<string, AthenaRunResource> = {
				CUSTOM_RESOURCE_TYPE_GOLD: "gold", CUSTOM_RESOURCE_TYPE_CRYSTAL: "crystal",
				CUSTOM_RESOURCE_TYPE_SCORE: "score", CUSTOM_RESOURCE_TYPE_EXP: "experience",
			};
			const resource = resources[reward.name];
			if (resource && reward.amount >= 0) reward.handled = this.Modify(reward.playerID, resource, reward.amount, reward.runId);
		}, this);
		Event.Register("game_end", event => {
			if (event.run_id === this.runId) { this.running = false; this.Publish(); }
		}, this);
		Event.Register("game_reset", event => {
			if (event.runId === this.runId && event.runId === GameState.GetSession().runId) this.reset();
		}, this);
	}
	private TrackSpawn(unit: CDOTA_BaseNPC) {
		const session = GameState.GetSession();
		if (!IsValid(unit) || (session.state !== "GameState_RunInit" && session.state !== "GameState_Battle")) return;
		// 旧局实体复活/晚到通知不能被重新标成新局。新实体即使复用索引也有独立标记。
		unit.__resourceRunId ??= session.runId;
		if (unit.__resourceRunId === session.runId && unit.IsAlive()) unit.__resourceDeathPaid = false;
	}
	private Active(playerID: PlayerID, runId: number) {
		const session = GameState.GetSession();
		return this.running && runId === this.runId && session.runId === runId && session.state === "GameState_Battle"
			&& session.participants.includes(playerID) && this.balances[playerID] !== undefined
			&& IsValid(this.heroes[playerID]) && PlayerResource.GetSelectedHeroEntity(playerID) === this.heroes[playerID];
	}
	private Start(runId: number) {
		const session = GameState.GetSession();
		if (session.runId !== runId || session.state !== "GameState_Battle" || this.runId === runId) return;
		this.reset(); this.runId = runId; this.lastTick = 0;
		for (const id of session.participants) {
			const hero = PlayerResource.GetSelectedHeroEntity(id);
			if (!IsValid(hero) || !hero.IsRealHero()) throw `玩家 ${id} 的资源英雄不存在`;
			this.heroes[id] = hero;
			this.TrackSpawn(hero);
			this.balances[id] = { crystal: 0, score: 0, goldFraction: 0 };
			PlayerResource.SetGold(id, 0, false);
			PlayerResource.SetGold(id, [300, 200, 100, 0, 0][session.difficulty - 1], true);
		}
		this.running = true; this.Publish();
	}
	/** 交易查询同样校验局号；金币始终返回最新引擎余额。 */
	Get(playerID: PlayerID, resource: AthenaRunResource, runId: number): number | undefined {
		if (!this.Active(playerID, runId)) return undefined;
		if (resource === "gold") return PlayerResource.GetGold(playerID);
		if (resource === "experience") return this.heroes[playerID]!.GetCurrentXP();
		return this.balances[playerID]![resource];
	}
	/** 同步发放/扣除；余额不足、旧局、非参战玩家或非法数值均无副作用。经验交给引擎计算增益一次。 */
	Modify(playerID: PlayerID, resource: AthenaRunResource, amount: number, runId: number): boolean {
		if (!this.Active(playerID, runId) || typeof amount !== "number" || amount !== amount || math.abs(amount) === math.huge) return false;
		const balance = this.balances[playerID]!, hero = this.heroes[playerID]!;
		if (resource === "gold") {
			const current = PlayerResource.GetGold(playerID), total = current + balance.goldFraction + amount;
			if (total < 0 || math.abs(total) === math.huge) return false;
			// 保留收益小数，避免每次引擎取整吃掉低额百分比收益；扣费始终读取最新引擎余额。
			const whole = math.floor(total);
			if (whole < current) PlayerResource.SpendGold(playerID, current - whole, EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Unspecified);
			else if (whole > current) PlayerResource.ModifyGold(playerID, whole - current, true, EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Unspecified);
			balance.goldFraction = total - whole;
		} else if (resource === "crystal" || resource === "score") {
			const total = balance[resource] + amount;
			if (total < 0 || math.abs(total) === math.huge) return false;
			balance[resource] = total;
		} else if (resource === "experience") {
			if (amount < 0) return false;
			// 已满级仍确认奖励，避免同一任务的后续奖励被经验上限卡住。
			if (amount > 0 && hero.GetLevel() < HERO_MAX_LEVEL && !hero.AddExperience(amount, EDOTA_ModifyXP_Reason.DOTA_ModifyXP_Unspecified, false, false, 0)) return false;
		} else return false;
		this.Publish(); return true;
	}
	private OnKilled({ victim, attacker }: EventCallback["entity_killed"]) {
		if (!IsValid(victim) || !IsValid(attacker) || victim === attacker || victim.IsAlive()
			|| victim.__resourceRunId !== this.runId || attacker.__resourceRunId !== this.runId
			|| victim.__resourceDeathPaid || victim.GetTeamNumber() === attacker.GetTeamNumber()) return;
		let id = victim.iKillerPlayerID !== undefined && victim.iKillerPlayerID >= 0 ? victim.iKillerPlayerID : attacker.GetPlayerOwnerID();
		// 部分召唤物只设置 owner 而没有 playerID；沿实体 owner 找到本局英雄，循环/旧局 owner 都不能串账。
		if (id < 0) {
			let owner = attacker.GetOwnerEntity();
			for (let depth = 0; IsValid(owner) && depth < 8; depth++) {
				for (const key of Object.keys(this.heroes)) if (this.heroes[tonumber(key) as PlayerID] === owner) id = tonumber(key) as PlayerID;
				if (id >= 0) break;
				owner = owner.GetOwnerEntity();
			}
		}
		if (!this.Active(id, this.runId) || attacker.GetTeamNumber() !== this.heroes[id]!.GetTeamNumber()) return;
		victim.__resourceDeathPaid = true;
		const kv = KeyValues.units[victim.GetUnitName()] ?? KeyValues.heroes[victim.GetUnitName()] ?? {};
		const gold = (tonumber(kv.BountyGold) ?? 0) * math.max(0, 1 + GetPlayerKillGoldPercentage(id) * 0.01);
		// 旧版装备固定击杀金币只在英雄亲自击杀时发放，不乘基础赏金收益加成。
		this.Modify(id, "gold", math.max(0, gold) + (attacker === this.heroes[id] ? math.max(0, GetKillGoldFlat(attacker)) : 0), this.runId);
		this.Modify(id, "crystal", math.max(0, tonumber(kv.BountyCrystal) ?? 0), this.runId);
		this.Modify(id, "score", math.max(0, GetPlayerKillScoreBonus(id)), this.runId);
		this.Modify(id, "experience", math.max(0, tonumber(kv.BountyXP) ?? 0), this.runId);
		Event.Fire("unit_bounty", { playerID: id, victim, attacker, runId: this.runId });
	}
	private OnTick(event: EventCallback["tick_time"]) {
		if (event.tick_time !== 1 || event.runId !== this.runId || event.tick <= this.lastTick || !this.running) return;
		this.lastTick = event.tick;
		const session = GameState.GetSession();
		for (const id of session.participants) {
			if (!this.Active(id, event.runId)) continue;
			this.Modify(id, "gold", GetGoldPerSec(this.heroes[id]!) + GetPlayerGoldPerSecond(id) + [9, 6, 3, 0, 0][session.difficulty - 1], event.runId);
			this.Modify(id, "crystal", GetPlayerCrystalPerSecond(id), event.runId);
			this.Modify(id, "score", GetPlayerScorePerSecond(id), event.runId);
		}
		this.Publish(); // 同时同步引擎技能扣费、经验变化；没有变化时不写网表。
	}
	private Publish() {
		const players: Record<string, AthenaPlayerResources> = {};
		for (const key of Object.keys(this.balances)) {
			const id = tonumber(key) as PlayerID, hero = this.heroes[id], balance = this.balances[id]!;
			if (!IsValid(hero)) continue;
			const level = hero.GetLevel(), experience = hero.GetCurrentXP();
			const floor = HERO_XP_PER_LEVEL_TABLE[level - 1] ?? experience;
			players[key] = { gold: PlayerResource.GetGold(id), crystal: balance.crystal, score: balance.score,
				experience, level, level_exp: math.max(0, experience - floor),
				next_level_exp: level >= HERO_MAX_LEVEL ? 0 : (HERO_XP_PER_LEVEL_TABLE[level] ?? floor) - floor };
		}
		const next = { run_id: this.runId, active: this.running, players };
		let changed = next.run_id !== this.snapshot.run_id || next.active !== this.snapshot.active || Object.keys(players).length !== Object.keys(this.snapshot.players).length;
		for (const key of Object.keys(players)) {
			const previous = this.snapshot.players[key];
			for (const field of Object.keys(players[key]) as (keyof AthenaPlayerResources)[]) if (!previous || previous[field] !== players[key][field]) changed = true;
		}
		if (changed) { this.snapshot = next; CustomNetTables.SetTableValue("common", "run_resources", next); }
	}
	reset() {
		this.running = false;
		for (const key of Object.keys(this.balances)) {
			const id = tonumber(key) as PlayerID;
			PlayerResource.SetGold(id, 0, false); PlayerResource.SetGold(id, 0, true);
		}
		this.heroes = {}; this.balances = {}; this.lastTick = 0;
		this.Publish();
	}
}
declare global { var RunResources: CRunResources; }
RunResources ??= new CRunResources();
