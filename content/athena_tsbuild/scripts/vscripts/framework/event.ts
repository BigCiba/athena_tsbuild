import { reloadable } from "../lib/tstl-utils";

declare global {
	var Event: MEvent;

	/** 事件监听器映射类型 */
	type EventListenerMap = { [K in keyof EventCallback]: (data: EventCallback[K]) => void };

	interface EventCallback {
		/** 游戏可以初始化，一次 */
		game_init: {};
		/** 本局进入战斗，基地与英雄已就绪。 */
		game_start: { runId?: number; };
		/** 本局结果已冻结，只发送一次；后端奖励须以会话标识 + run_id 实现幂等。 */
		game_end: AthenaRunResult;
		/** 清理本局玩法数据；各模块只清理自身持有的资源。 */
		game_reset: { runId: number; };
		/** 波次状态变化，特殊进攻等玩法自行订阅。 */
		round_state_change: { runId: number; round_number: number; stage: "prepare" | "battle" | "end"; };
		/** 普通波次全部完成，交由特殊进攻处理最终首领和胜利。 */
		waves_complete: { runId: number; };
		/** HUD Demo 刷怪开关；仅控制普通波次，沿用原版范围。 */
		demo_creeps_changed: { enabled: boolean; };
		/** NPC 只发布交互事实，接取、交付和任务顺序由 Task 决定。 */
		npc_interact: { playerID: PlayerID; npc: CDOTA_BaseNPC; runId: number; };
		/** 调试专用入口，正常玩法使用出生、升级、击杀和 NPC 交互事件。 */
		task_debug_start: { playerID: PlayerID; taskName: string; };
		task_completed: { playerID: PlayerID; taskName: string; runId: number; };
		task_reward_received: { playerID: PlayerID; taskName: string; runId: number; };
		/** 对应玩法先检查 handled，同步执行成功后置 true；未处理的奖励保留待领取。 */
		task_reward: AthenaTaskReward & { playerID: PlayerID; taskName: string; runId: number; handled: boolean; };
		/** 全部登录完成 */
		finish_login: {};
		/** 玩家设置变更 */
		player_settings_changed: { playerID: PlayerID; settings: Table; };
		/** 英雄升级 */
		hero_level_up: { unit: CDOTA_BaseNPC_Hero; level: number; old_level: number; };
		/** 英雄获得经验 */
		hero_gain_exp: { playerID: PlayerID, unit: CDOTA_BaseNPC_Hero, oldLevel: number, newLevel: number, exp: number; };
		/** 英雄复活 */
		hero_respawn: { playerID: PlayerID, unit: CDOTA_BaseNPC_Hero; };
		/** 击杀事件 */
		entity_killed: { victim: CDOTA_BaseNPC; attacker: CDOTA_BaseNPC; };
		/** 单位创建 */
		npc_spawned: { unit: CDOTA_BaseNPC; };
		/** 单位首次创建 */
		npc_first_spawned: { unit: CDOTA_BaseNPC; };
		/** 伤害事件 */
		damage_event: DamageEvent;
		/** 规避伤害 */
		avoid_damage: { unit: CDOTA_BaseNPC; };
		/** 预攻击事件 */
		pre_attack_event: { attacker: CDOTA_BaseNPC; position: Vector; };
		/** 攻击事件 */
		attack_event: { attacker: CDOTA_BaseNPC; position: Vector; };
		/** 护盾消耗事件 */
		consume_shield: { damageEvent: DamageEvent, shield: number; };
		/** 暴击事件 */
		crit_event: DamageEvent;
		/** 药水回复 */
		potion_heal: { caster: CDOTA_BaseNPC, healAmount: number; };
		/** 回复怒气 */
		give_mana: { unit: CDOTA_BaseNPC, manaAmount: number; };
		/** 消耗怒气 */
		spent_mana: { unit: CDOTA_BaseNPC, ability?: CDOTABaseAbility, cost: number; };
		/** 冲刺 */
		dash_start: { caster: CDOTA_BaseNPC, start: Vector; };
		dash_end: { caster: CDOTA_BaseNPC, start: Vector, end: Vector; };
		/** 技能释放开始 */
		ability_cast_start: { caster: CDOTA_BaseNPC, position: Vector, ability: CDOTABaseAbility, abilityTag: AbilityTag; };
		/** 技能释放完成 */
		ability_cast_complete: { caster: CDOTA_BaseNPC, position: Vector, ability: CDOTABaseAbility, abilityTag: AbilityTag; record?: string; };
		/** 技能释放引导 */
		ability_end_channel: { caster: CDOTA_BaseNPC, position: Vector, ability: CDOTABaseAbility, abilityTag: AbilityTag; };
		/** 技能结束 */
		ability_end: { caster: CDOTA_BaseNPC, ability: CDOTABaseAbility; };
		/** 属性变更 */
		property_changed: { scope: PropertyScope; key: PropertySystemKey; propertyId: string; oldValue: number; newValue: number; };
		/** 状态变更 */
		state_changed: { key: StateSystemKey; stateId: string; oldValue: boolean; newValue: boolean; };
		/** 雷击 */
		lightning_strike: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; damage: number; };
		/** 闪电风暴 */
		lightning_storm: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; damage: number; };
		/** 冰冻 */
		frozen_event: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; addStack: number; stack: number; };
		/**
		 * 寒霜爆发
		 * @base_frozen_stack 基础施加冰冻的层数
		 * @added_frozen 实际施加的冰冻层数
		 */
		frozen_burst: { caster: CDOTA_BaseNPC; position: Vector; base_frozen_stack: number; added_frozen: number, targets: CDOTA_BaseNPC[]; extra?: boolean; };
		/** 发射雪球 */
		throw_snowball: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; extra?: boolean; };
		/** 发射冰雹 */
		ice_strike: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; extra?: boolean; };
		/** 施加中毒 */
		poison_event: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; addStack: number; stack: number; };
		/** 中毒池子下毒 */
		poison_pool_event: { caster: CDOTA_BaseNPC; position: Vector; };
		/** 技能升级添加 */
		ability_upgrade_added: { unit: CDOTA_BaseNPC; upgradeName: string; level: number; };
		/** 技能升级移除 */
		ability_upgrade_removed: { unit: CDOTA_BaseNPC; upgradeName: string; };
		/** 技能升级清除 */
		ability_upgrades_cleared: { unit: CDOTA_BaseNPC; };
		/** 资源变动 */
		resource_change: { playerID: PlayerID; resourceType: keyof PlayerDataType["resource"]; value: number; };
		/** 后端数据改变 */
		service_data_change: { playerID: PlayerID; key: string; };
		/** 陷阱 */
		trap_floor: { caster: CDOTA_BaseNPC, trap: CBaseEntity; };
		/** 触电效果 */
		expose_effect: DamageInfo;
		/** 施加触电 */
		expose_event: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; addStack: number; stack: number; };
		/** 寒霜印记效果 */
		ice_mark_effect: DamageInfo;
		/** 施加寒霜印记 */
		ice_mark_event: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; addStack: number; stack: number; };
		/** 物品添加 */
		item_added: { unit: CDOTA_BaseNPC; item: CDOTA_Item; };
		/** 物品销毁 */
		item_removed: { unit: CDOTA_BaseNPC; item: CDOTA_Item; };
		/** 拾取客户端物品（主要为了播语音） */
		client_item_pickup: { playerID: PlayerID; item_id: number; };
		/** 冰冻衰减 */
		frozen_attenation: { caster: CDOTA_BaseNPC; target: CDOTA_BaseNPC; oldStack: number; newStack: number; };
		/** 当碰撞触发器触发时, 0: 离开 1: 进入 */
		collision_trigger: { activator: CDOTA_BaseNPC; name: string; type: 0 | 1; };
		/** 召唤飞剑 */
		call_sword: { caster: CDOTA_BaseNPC, extra?: boolean; };
		/** 放弃祝福 */
		give_up_bless: { playerID: PlayerID; gainGold: number; };
		/** 祝福选择成功 */
		bless_selected: { playerID: PlayerID; blessName: string; rarity: number; };
		/** 祝福房间奖励被领取 */
		bless_room_reward_claimed: { playerID: PlayerID; isDouble: boolean; };
		/** 祝福候选刷新成功 */
		bless_selection_refreshed: { playerID: PlayerID; };
		/** 技能升级候选刷新成功 */
		ability_upgrade_selection_refreshed: { playerID: PlayerID; };
		/** 刷新商店 */
		shop_refresh_purchased: { playerID: PlayerID; cost: number; };
		/** 许愿 */
		wishing_pool_reward: { playerID: PlayerID; cost: number; };
		/** 商店购买 */
		shop_item_purchased: { playerID: PlayerID, cost: number; item: CDOTA_Item; source: "Default" | "TravelingMerchant"; };
		/** 龙蛋成功孵化 */
		dragon_egg_hatched: {
			playerID: PlayerID;
			hero: CDOTA_BaseNPC;
			babyItemName: string;
			babyRarity: number;
			baseCount: number;
		};
		/** 传送 */
		teleport: { caster: CDOTA_BaseNPC, target: string; };
		/** 触发水井 */
		regen_well_trigger: { caster: CDOTA_BaseNPC, target: CDOTA_BaseNPC; };
		/** 物品消耗（RemoveItem 时自动发送） */
		item_consumed: { unit: CDOTA_BaseNPC; item: CDOTA_Item; };
		/** 教学模式任务完成 */
		tutorial_task_completed: { tutorialKey: string; };
		/** 血矛命中 */
		blood_spear: { caster: CDOTA_BaseNPC, target: CDOTA_BaseNPC; };
		/** 祝福套装改变 */
		bless_suit_changed: { playerID: PlayerID; };
	}
	interface EventListenerData {
		context?: any;
		eventID: number;
		callback: Function;
		filter?: Function;
		priority?: number;  // ✅ 新增优先级字段
	}

	type EventFilter<K extends keyof EventCallback> = (data: EventCallback[K]) => boolean;
}


@reloadable
class MEvent extends CModule {
	private eventId: number = 1;
	private eventIdMap: Record<string, EventListenerData[]> = {};

	initPriority() {
		return 9;
	}

	init(reload: boolean) {
		if (!reload) {
		} else {
			this.cleanupModuleListeners();
		}
	}
	reset(): void {
		// ✅ 改进：完整清理模块事件
		// this.cleanupModuleListeners();
	}

	/**
	 * 清理所有 CModule 注册的监听器
	 */
	private cleanupModuleListeners() {
		this.print("cleanupModuleListeners");
		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				const listener = listeners[i];
				if (listener.context?.isModule === true) {
					table.remove(listeners, i + 1);
				}
			}

			// ✅ 清理空的事件类型
			if (listeners.length === 0) {
				delete this.eventIdMap[eventType];
			}
		}
	}

	/**
	 * 注册事件监听器
	 * @returns 事件ID，用于取消注册
	 */
	Register<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext,
		filter?: EventFilter<K>
	): number {
		// this.print("Register event:", eventType);
		this.eventIdMap[eventType] ??= [];

		const eventID = this.eventId++;
		const listener: EventListenerData = {
			context,
			eventID,
			callback,
			filter,
		};

		this.eventIdMap[eventType].push(listener);
		return eventID;
	}

	/**
	 * 为技能/Modifier 注册按持有者预过滤的高频战斗事件。
	 * 同玩家控制的单位也会通过预过滤，具体触发条件仍由原监听器决定。
	 */
	RegisterForOwner<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		owner: CDOTA_BaseNPC,
		context?: TContext
	): number {
		let filter: EventFilter<K> | undefined;
		if (
			eventType === "damage_event" ||
			eventType === "crit_event" ||
			eventType === "expose_effect" ||
			eventType === "lightning_strike"
		) {
			filter = ((data: any) => {
				if (!IsValid(owner)) return false;
				const ownerPlayerID = owner.GetPlayerOwnerID();
				const belongsToOwner = (entity?: CDOTA_BaseNPC) => {
					if (entity === owner) return true;
					if (
						ownerPlayerID >= 0 &&
						IsValid(entity) &&
						entity.GetPlayerOwnerID() === ownerPlayerID
					) {
						return true;
					}
					return false;
				};
				return belongsToOwner(data.attacker) ||
					belongsToOwner(data.target) ||
					belongsToOwner(data.caster);
			}) as EventFilter<K>;
		}
		return this.Register(eventType, callback, context, filter);
	}

	/**
	 * 注册带优先级的事件监听器
	 * @param priority 优先级（越大越先执行，默认 100）。Fire 按数组倒序触发，因此大优先级先执行。
	 */
	RegisterWithPriority<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		priority: number = 100,
		context?: TContext
	): number {
		this.eventIdMap[eventType] ??= [];

		const eventID = this.eventId++;
		const listener: EventListenerData = {
			context,
			eventID,
			callback,
			priority
		};

		const listeners = this.eventIdMap[eventType];

		// 按优先级插入（保持有序）
		let insertIndex = listeners.length;
		for (let i = 0; i < listeners.length; i++) {
			const currentPriority = listeners[i].priority ?? 100;
			if (priority < currentPriority) {
				insertIndex = i;
				break;
			}
		}

		table.insert(listeners, insertIndex + 1, listener);
		return eventID;
	}

	/**
	 * 取消注册事件监听器
	 */
	Unregister(eventId: number): boolean {
		// ✅ 修复：从 eventIdMap 中移除
		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i].eventID === eventId) {
					table.remove(listeners, i + 1);

					// 清理空的事件类型
					if (listeners.length === 0) {
						delete this.eventIdMap[eventType];
					}

					return true;
				}
			}
		}

		return false;
	}

	/**
	 * 取消注册特定上下文的所有监听器
	 */
	UnregisterContext(context: any): number {
		let count = 0;

		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i].context === context) {
					table.remove(listeners, i + 1);
					count++;
				}
			}

			if (listeners.length === 0) {
				delete this.eventIdMap[eventType];
			}
		}

		return count;
	}

	/**
	 * 取消注册特定事件类型的所有监听器
	 */
	UnregisterAll<K extends keyof EventCallback>(eventType: K): number {
		const listeners = this.eventIdMap[eventType];
		if (!listeners) return 0;

		const count = listeners.length;
		delete this.eventIdMap[eventType];
		return count;
	}

	/**
	 * 检查是否有监听器
	 */
	HasListeners<K extends keyof EventCallback>(eventType: K): boolean {
		const listeners = this.eventIdMap[eventType];
		return listeners !== undefined && listeners.length > 0;
	}

	/**
	 * 获取监听器数量
	 */
	GetListenerCount<K extends keyof EventCallback>(eventType?: K): number {
		if (eventType !== undefined) {
			return this.eventIdMap[eventType]?.length ?? 0;
		}

		// 所有监听器总数
		let total = 0;
		for (const [_, listeners] of pairs(this.eventIdMap)) {
			total += listeners.length;
		}
		return total;
	}

	/**
	 * 发送事件
	 */
	Fire<K extends keyof EventCallback>(
		eventType: K,
		data: EventCallback[K]
	) {
		const listeners = this.eventIdMap[eventType];
		if (!listeners || listeners.length === 0) {
			return;
		}

		// ✅ 改进：清理无效监听器 + 错误收集
		let errors: Array<{ eventID: number; error: string; }> | undefined;

		for (let i = listeners.length - 1; i >= 0; i--) {
			const listener = listeners[i];

			// 检查监听器是否仍然有效
			if (!listener || !listener.callback) {
				table.remove(listeners, i + 1);
				continue;
			}
			if (listener.filter !== undefined && !listener.filter(data)) {
				continue;
			}

			// 安全调用回调
			const [success, errorMsg] = xpcall(
				listener.callback as any,
				traceback,
				listener.context,
				data
			);

			if (!success) {
				errors ??= [];
				errors.push({
					eventID: listener.eventID,
					error: errorMsg as string,
				});

				print(`Event listener error:\nType: ${eventType}\nID: ${listener.eventID}\nError: ${errorMsg}`);
			}
		}

		// 清理空的事件类型
		if (listeners.length === 0) {
			delete this.eventIdMap[eventType];
		}

		return errors;
	}

	/**
	 * 注册一次性事件监听器（触发后自动取消）
	 */
	Once<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext
	): number {
		let eventID: number;

		const wrappedCallback = (data: EventCallback[K]) => {
			callback.call(context as TContext, data);
			this.Unregister(eventID);
		};

		eventID = this.Register(eventType, wrappedCallback as any, context);
		return eventID;
	}

	/**
	 * 发送到lua客户端
	 * @param playerID 客户端玩家ID
	 * @param eventType 
	 * @param data 
	 */
	FireClient<K extends keyof EventCallback>(
		playerID: PlayerID,
		eventType: K,
		data: EventCallback[K]
	) {
		const player = PlayerResource.GetPlayer(playerID);
		if (player != undefined) {
			CustomGameEventManager.Send_ServerToPlayer(player, "lua_server_to_client", {
				event_name: eventType,
				data: json.encode(data),
			});
		}
	}

	/**
	 * 注册带过滤器的事件监听器
	 * 只有通过过滤器的事件才会触发回调
	 */
	RegisterFiltered<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		filter: EventFilter<K>,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext
	): number {
		const wrappedCallback = (data: EventCallback[K]) => {
			if (filter(data)) {
				callback.call(context as TContext, data);
			}
		};

		return this.Register(eventType, wrappedCallback as any, context);
	}

	/**
	 * 打印所有事件监听器（调试用）
	 */
	DebugPrint() {
		if (IsDedicatedServer()) return;

		print("=== Event System Debug ===");
		print(`Total event types: ${Object.keys(this.eventIdMap).length}`);
		print(`Total listeners: ${this.GetListenerCount()}`);
		print(`Next event ID: ${this.eventId}`);
		print("");

		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			print(`[${eventType}] (${listeners.length} listeners)`);

			for (const listener of listeners) {
				const contextName = listener.context?.constructor?.name ??
					(listener.context?.isModule ? "Module" : "Global");
				const priority = listener.priority ?? 100;

				print(`  - ID:${listener.eventID} Priority:${priority} Context:${contextName}`);
			}
			print("");
		}

		print("========================");
	}

	/**
	 * 获取内存使用统计
	 */
	GetMemoryStats() {
		let totalListeners = 0;
		let totalEventTypes = 0;

		for (const [_, listeners] of pairs(this.eventIdMap)) {
			totalEventTypes++;
			totalListeners += listeners.length;
		}

		return {
			eventTypes: totalEventTypes,
			listeners: totalListeners,
			avgListenersPerType: totalEventTypes > 0 ? totalListeners / totalEventTypes : 0
		};
	}
}



Event ??= new MEvent();
// 注册调试命令
// if (!IsDedicatedServer()) {
// 	Convars.RegisterCommand("event_debug", () => {
// 		Event.DebugPrint();
// 	}, "Print event system debug info", 0);

// 	Convars.RegisterCommand("event_stats", () => {
// 		const stats = Event.GetMemoryStats();
// 		print(`Event Types: ${stats.eventTypes}`);
// 		print(`Total Listeners: ${stats.listeners}`);
// 		print(`Avg Listeners/Type: ${stats.avgListenersPerType.toFixed(2)}`);
// 	}, "Print event system statistics", 0);
// }
