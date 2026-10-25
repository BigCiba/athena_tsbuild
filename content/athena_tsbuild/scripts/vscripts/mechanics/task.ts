import { reloadable } from "../lib/tstl-utils";

export enum TaskState { None, Progress, Finish, Received, Locked }

// 原版 npc_task 的任务顺序集中在这里，NPC 不再分步调用 StartTask/GiveTaskRewards。
const NPC_TASKS: Record<string, string[]> = {
	bounty_hunter: ["KillKoboldLord", "KillHellBeast", "KillAcientGolem"],
	cuihua: ["KillFireDemon"], bajie: ["Trial"],
	bearzky: ["Bearzky_Zombie", "Bearzky_SandKing"], beaverknight: ["Beaverknight_Ogre"],
};

/** Athena 局内任务：配置、自动触发、NPC 流程、进度、领奖与重开均由本模块持有。 */
@reloadable
export class CTask extends CModule {
	private runId = 0;
	private running = false;
	private definitions: Record<string, AthenaTaskDefinition> = {};
	private players: Partial<Record<PlayerID, AthenaPlayerTasks>> = {};
	private npcs: CDOTA_BaseNPC[] = [];
	private npcParticles: ParticleID[] = [];
	private timers: string[] = [];
	private rewardProgress: Record<string, number> = {};
	private claiming: Record<string, boolean> = {};
	private killed: CDOTA_BaseNPC[] = [];
	init(reload: boolean) {
		Event.UnregisterContext(this);
		Event.Register("game_start", this.OnGameStart, this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.Stop(); }, this);
		Event.Register("game_reset", event => { if (event.runId === this.runId) this.reset(); }, this);
		Event.Register("entity_killed", this.OnKilled, this);
		Event.Register("item_added", event => this.Progress(event.unit.GetPlayerOwnerID(), "TASK_STAGE_TYPE_ITEM", event.item.GetAbilityName()), this);
		Event.Register("hero_level_up", event => {
			if (event.unit.IsRealHero() && event.level > 0 && event.level < 500 && event.level % 100 === 0) this.Start(event.unit.GetPlayerOwnerID(), "Reborn", true);
		}, this);
		Event.Register("npc_interact", this.OnNPCInteract, this);
		Event.Register("collision_trigger", event => {
			const unit = event.activator;
			if (event.type === 1 && event.name === "hero_reborn" && IsValid(unit) && unit.IsRealHero() && this.Active(unit.GetPlayerOwnerID()) && this.GetPlayerTaskState(unit.GetPlayerOwnerID(), "Reborn") === TaskState.Progress) FindClearSpaceForUnit(unit, Vector(6080, 6920, 384), true);
		}, this);
		Event.Register("task_debug_start", event => { if (IsInToolsMode()) this.Start(event.playerID, event.taskName, true); }, this);
		CustomUIEvent("task_remove", data => {
			if (data.runId !== this.runId || !this.Active(data.PlayerID) || !this.definitions[data.taskname] || this.HasTag(data.taskname, "TASK_TAG_CANT_ABANDONED")) return;
			const player = this.players[data.PlayerID]!;
			// 完成待领取的奖励不能通过放弃绕过已发放记录。
			if (!player.tInProgress[data.taskname]) return;
			delete player.tInProgress[data.taskname]; this.Publish();
		}, this);
		CustomUIEvent("task_mark", data => {
			const state = this.GetPlayerTaskState(data.PlayerID, data.taskname);
			if (data.runId === this.runId && this.Active(data.PlayerID) && (state === TaskState.Progress || state === TaskState.Finish)) this.Mark(data.PlayerID, data.taskname);
		}, this);
		CustomUIEvent("task_claim", data => {
			if (data.runId === this.runId && this.Active(data.PlayerID) && this.players[data.PlayerID]?.rewardErrors[data.taskname] && tonumber(this.definitions[data.taskname]?.AutoComplete) === 1) this.Claim(data.PlayerID, data.taskname);
		}, this);
	}
	private Active(playerID: PlayerID) {
		const session = GameState.GetSession();
		return this.running && session.runId === this.runId && session.state === "GameState_Battle" && session.participants.includes(playerID) && this.players[playerID] !== undefined;
	}
	private HasTag(name: string, tag: string) { return (this.definitions[name]?.TaskTag ?? "").split(",").includes(tag); }
	GetTaskInfo(name: string) { return this.definitions[name]; }
	GetPlayerTaskState(playerID: PlayerID, name: string): TaskState {
		const definition = this.definitions[name];
		if (!definition) return TaskState.Locked;
		const player = this.players[playerID];
		if (definition.UnlockType === "TASK_UNLOCK_TYPE_TASK" && player?.tComplete[definition.UnlockName!] !== TaskState.Received) return TaskState.Locked;
		return player?.tComplete[name] ?? (player?.tInProgress[name] ? TaskState.Progress : TaskState.None);
	}
	private OnGameStart(event: EventCallback["game_start"]) {
		const session = GameState.GetSession();
		if (event.runId !== session.runId || session.state !== "GameState_Battle" || (this.running && this.runId === event.runId)) return;
		this.reset(); this.runId = session.runId;
		this.definitions = LoadKeyValues("scripts/npc/kv/gameplay/tasks.kv") as Record<string, AthenaTaskDefinition>;
		const npcKV = LoadKeyValues("scripts/npc/kv/units/npc_quest.kv") as KV;
		try {
			for (const name of Object.keys(this.definitions)) {
				const definition = this.definitions[name];
				if (!definition.TaskStage || Object.keys(definition.TaskStage).length === 0) throw `任务缺少阶段：${name}`;
				for (const stage of Object.values(definition.TaskStage)) if ((tonumber(stage.TaskStageCount) ?? 0) <= 0) throw `任务阶段数量无效：${name}`;
				if (definition.UnlockName && !this.definitions[definition.UnlockName]) throw `任务前置不存在：${name}/${definition.UnlockName}`;
			}
			for (const name of Object.keys(npcKV)) {
				const anchor = Entities.FindByName(undefined, "npc_" + name);
				if (!IsValid(anchor)) continue; // 原版允许不同地图省略 NPC。
				const npc = NPC.CreateNPC(name, anchor.GetAbsOrigin(), anchor.GetForwardVector(), this.runId);
				this.npcs.push(npc);
				if (NPC_TASKS[name]) this.npcParticles.push(ParticleManager.CreateParticle("particles/map/quest.vpcf", ParticleAttachment_t.PATTACH_OVERHEAD_FOLLOW, npc));
			}
			for (const playerID of session.participants) this.players[playerID] = { tInProgress: {}, tComplete: {}, rewardErrors: {} };
			this.running = true;
			CustomNetTables.SetTableValue("common", "task_definitions", this.definitions);
			for (const playerID of session.participants) this.Start(playerID, "KillPracticer");
			this.Publish();
		} catch (error) { this.Stop(); GameState.FinishRun(this.runId, "error", tostring(error)); }
	}
	private Start(playerID: PlayerID, name: string, repeat = false) {
		if (!this.Active(playerID) || !this.definitions[name]) return;
		const player = this.players[playerID]!, state = this.GetPlayerTaskState(playerID, name);
		if (state === TaskState.Received && (repeat || this.HasTag(name, "TASK_TAG_REPEAT"))) {
			delete player.tComplete[name]; delete this.rewardProgress[`${playerID}:${name}`];
		} else if (state !== TaskState.None) return;
		const task: AthenaActiveTask = { tStageProgress: {} };
		for (const key of Object.keys(this.definitions[name].TaskStage)) task.tStageProgress[key] = 0;
		player.tInProgress[name] = task;
		if (tonumber(this.definitions[name].AutoComplete) !== 1) Notification.CombatToPlayer(playerID, { message: "Combat_StartTask", string_taskname: "TaskTitle_" + name });
		this.Mark(playerID, name); this.Publish();
	}
	private OnNPCInteract(event: EventCallback["npc_interact"]) {
		if (event.runId !== this.runId || !this.Active(event.playerID) || !this.npcs.includes(event.npc)) return;
		const player = this.players[event.playerID]!;
		let text = "TaskDialog_NoTask";
		for (const name of NPC_TASKS[event.npc.GetUnitName()] ?? []) {
			const state = this.GetPlayerTaskState(event.playerID, name);
			if (state === TaskState.None || (state === TaskState.Received && this.HasTag(name, "TASK_TAG_REPEAT"))) { this.Start(event.playerID, name); text = `TaskDialog_${name}_Accept`; }
			else if (state === TaskState.Progress) text = `TaskDialog_${name}_Inprogress`;
			else if (state === TaskState.Finish) { this.Claim(event.playerID, name); text = player.rewardErrors[name] ?? `TaskDialog_${name}_Finish`; }
			else continue;
			break;
		}
		const client = PlayerResource.GetPlayer(event.playerID);
		if (IsValid(client)) CustomGameEventManager.Send_ServerToPlayer(client, "task_dialog", { npc: event.npc.entindex(), text, runId: this.runId });
		this.Progress(event.playerID, "TASK_STAGE_TYPE_TALK", event.npc.GetUnitName());
	}
	private OnKilled(event: EventCallback["entity_killed"]) {
		if (!this.running || !IsValid(event.victim) || !IsValid(event.attacker) || event.victim.GetTeamNumber() === event.attacker.GetTeamNumber() || this.killed.includes(event.victim)) return;
		const playerID = event.attacker.GetPlayerOwnerID();
		if (!this.Active(playerID)) return;
		// 原生死亡和自定义伤害都可能发布事件，同一实体只计一次，索引复用不误伤新单位。
		this.killed = this.killed.filter(unit => IsValid(unit)); this.killed.push(event.victim);
		this.Progress(playerID, "TASK_STAGE_TYPE_KILL", event.victim.GetUnitName());
	}
	private Progress(playerID: PlayerID, type: string, target: string) {
		if (!this.Active(playerID)) return;
		const player = this.players[playerID]!;
		for (const name of Object.keys(player.tInProgress)) {
			const task = player.tInProgress[name], definition = this.definitions[name];
			let changed = false;
			for (const key of Object.keys(definition.TaskStage)) {
				const stage = definition.TaskStage[key];
				if (stage.TaskStageType === type && string.find(target, stage.TaskStageTarget)[0] !== undefined) {
					task.tStageProgress[key] = math.min(tonumber(stage.TaskStageCount)!, task.tStageProgress[key] + 1); changed = true;
				}
			}
			if (!changed) continue;
			if (Object.keys(definition.TaskStage).every(key => task.tStageProgress[key] >= tonumber(definition.TaskStage[key].TaskStageCount)!)) {
				delete player.tInProgress[name]; player.tComplete[name] = TaskState.Finish;
				Event.Fire("task_completed", { playerID, taskName: name, runId: this.runId });
				if (tonumber(definition.AutoComplete) === 1) {
					const runId = this.runId;
					this.timers.push(Timer.GameTimer(2, () => { if (this.runId === runId && this.players[playerID] === player && this.Active(playerID)) this.Claim(playerID, name); }));
				}
			}
		}
		this.Publish();
	}
	private Rewards(name: string): AthenaTaskReward[] {
		const rewards: AthenaTaskReward[] = [];
		for (const reward of Object.values(this.definitions[name].TaskReward ?? {})) {
			for (const part of string.gsub(reward.TaskRewardName ?? "", "%s", "")[0].split("|")) {
				const [target, amount] = part.split(",");
				rewards.push({ type: reward.TaskRewardType, name: target, amount: tonumber(amount) ?? 1 });
			}
		}
		return rewards;
	}
	/** 逐条确认奖励，未接入的玩法保留待领取；再次交付只续发尚未确认的部分。 */
	private Claim(playerID: PlayerID, name: string) {
		const key = `${playerID}:${name}`, player = this.players[playerID];
		if (!this.Active(playerID) || !player || player.tComplete[name] !== TaskState.Finish || this.claiming[key]) return;
		this.claiming[key] = true;
		try {
			const hero = PlayerResource.GetSelectedHeroEntity(playerID);
			if (!IsValid(hero)) return;
			const rewards = this.Rewards(name);
			for (let index = this.rewardProgress[key] ?? 0; index < rewards.length; index++) {
				const event: EventCallback["task_reward"] = { ...rewards[index], playerID, taskName: name, runId: this.runId, handled: false };
				Event.Fire("task_reward", event);
				if (!event.handled) this.GrantAvailableReward(hero, event);
				if (!event.handled) { player.rewardErrors[name] = "TaskRewardUnavailable"; this.error("任务奖励尚未接入", name, event.type, event.name); this.Publish(); return; }
				this.rewardProgress[key] = index + 1;
			}
			delete player.rewardErrors[name]; player.tComplete[name] = TaskState.Received; this.Publish();
			Event.Fire("task_reward_received", { playerID, taskName: name, runId: this.runId });
			if (name === "KillPracticer") this.Start(playerID, name, true);
		} catch (error) { player.rewardErrors[name] = "TaskRewardFailed"; this.error("任务奖励发放失败", name, error); this.Publish(); }
		finally { delete this.claiming[key]; }
	}
	private GrantAvailableReward(hero: CDOTA_BaseNPC_Hero, reward: EventCallback["task_reward"]) {
		if (reward.type === "TASK_REWARD_TYPE_ITEM" || reward.type === "TASK_REWARD_TYPE_SCEPTER") {
			const itemName = reward.type === "TASK_REWARD_TYPE_SCEPTER" ? "item_" + hero.GetUnitName() : reward.name;
			if (!KeyValues.items[itemName]) return;
			for (let i = 0; i < reward.amount; i++) {
				const item = CreateItem(itemName, PlayerResource.GetPlayer(reward.playerID), hero);
				if (!IsValid(item)) throw `任务物品创建失败：${itemName}`;
				if (!hero.HasRoomForItem(itemName, true, true)) CreateItemOnPositionSync(hero.GetAbsOrigin(), item);
				else hero.AddItem(item);
			}
			reward.handled = true;
		} else if (reward.type === "TASK_REWARD_TYPE_MODIFIER" && (_G as AnyTable)[reward.name] !== undefined) {
			reward.handled = IsValid(hero.AddNewModifier(hero, undefined, reward.name, {}));
		}
	}
	private Mark(playerID: PlayerID, name: string) {
		for (const stage of Object.values(this.definitions[name]?.TaskStage ?? {})) {
			if (!stage.TaskPosition) continue;
			const parts = stage.TaskPosition.split(",").map(value => tonumber(value));
			const anchor = Entities.FindByName(undefined, stage.TaskPosition);
			const position = IsValid(anchor) ? anchor.GetAbsOrigin() : parts.length === 3 && parts.every(value => value !== undefined) ? Vector(parts[0]!, parts[1]!, parts[2]!) : undefined;
			if (!position) continue;
			GameRules.ExecuteTeamPing(DOTATeam_t.DOTA_TEAM_GOODGUYS, position.x, position.y, undefined, 0);
			const client = PlayerResource.GetPlayer(playerID);
			if (IsValid(client)) {
				const particle = ParticleManager.CreateParticleForPlayer("particles/ui_mouseactions/international2020/ping_world_questionmarks.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, undefined, client);
				ParticleManager.SetParticleControl(particle, 0, position); ParticleManager.SetParticleControl(particle, 7, Vector(1, 0.7, 0)); ParticleManager.ReleaseParticleIndex(particle);
			}
		}
	}
	private Publish() { CustomNetTables.SetTableValue("common", "player_tasks", this.players); }
	private Stop() { this.running = false; for (const timer of this.timers) Timer.StopTimer(timer); this.timers = []; }
	reset() {
		this.Stop();
		for (const particle of this.npcParticles) { ParticleManager.DestroyParticle(particle, false); ParticleManager.ReleaseParticleIndex(particle); }
		this.npcParticles = []; this.players = {}; this.npcs = []; this.killed = []; this.rewardProgress = {}; this.claiming = {}; this.Publish();
	}
}
declare global { var Task: CTask; }
Task ??= new CTask();
