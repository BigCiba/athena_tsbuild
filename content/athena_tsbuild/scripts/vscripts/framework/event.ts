import { reloadable } from "../lib/tstl-utils";

declare global {
	var Event: MEvent;

	/** 事件监听器映射类型 */
	type EventListenerMap = { [K in keyof EventCallback]: (data: EventCallback[K]) => void };
	/** 原版 EDeclareFunctions：来源、目标精确匹配实体，全局监听不限制单位。 */
	type UnitEventRole = "source" | "target" | "global";
	type UnitEventName = "valid_ability_executed" | "cleave" | "ability_charge_changed" | "reborn" | "item_devoured" | "tick_time" | "crit_event" | "attack_projectile_disabled" | "scepter_levelup" | "attack_start_custom";
	type UnitEventListenerMap = { [K in UnitEventName]: Partial<Record<UnitEventRole, (data: EventCallback[K]) => void>> };
	interface UnitEventRoute { source?: CDOTA_BaseNPC; target?: CDOTA_BaseNPC; }

	interface EventCallback {
		/** 引擎过滤器统一分发；玩法只收紧 allowed，不覆盖其他模块的过滤器。 */
		inventory_filter: { unit: CDOTA_BaseNPC; item: CDOTA_Item; allowed: boolean; };
		inventory_order: { order: ExecuteOrderFilterEvent; allowed: boolean; };
		/** 资源模块完成击杀归属和死亡去重后发布，掉落等玩法独立消费。 */
		unit_bounty: { playerID: PlayerID; victim: CDOTA_BaseNPC; attacker: CDOTA_BaseNPC; runId: number; };
		/** 原版 OnAbilityExecuted 阶段；排除物品、toggle 和不触发魔棒的技能。 */
		valid_ability_executed: ModifierAbilityEvent;
		/** 一次分裂结算完成；tTargets 保留原版查询列表，包含主目标。 */
		cleave: { attacker: CDOTA_BaseNPC; target: CDOTA_BaseNPC; center: Vector; radius: number; damage: number; tTargets: CDOTA_BaseNPC[]; };
		ability_charge_changed: { unit: CDOTA_BaseNPC; ability: CDOTABaseAbility; charge: number; old_charge: number; };
		/** 转生玩法尚未移植；再次出生沿用原版通知，此时没有 level。 */
		reborn: { unit: CDOTA_BaseNPC; level?: number; };
		/** 预留：吞噬成功、属性刷新后发布；不同于销毁/消耗物品。 */
		item_devoured: { unit: CDOTA_BaseNPC; item: CDOTA_Item; };
		/** 公共时钟每秒一次、每分钟额外一次；runId/tick 用于防止重复结算。 */
		tick_time: { tick_time: 1 | 60; runId: number; tick: number; };
		/** 原版仅声明未发出的事件，暂不生成触发点。 */
		scepter_levelup: { unit: CDOTA_BaseNPC; level: number; };
		attack_start_custom: { attacker: CDOTA_BaseNPC; target?: CDOTA_BaseNPC; };
		/** 原版全局事件预留：目前没有对应玩法消费者，不伪造连接/背包触发。 */
		player_first_spawned: { PlayerID: PlayerID; userid: number; };
		player_reconnect: { PlayerID: PlayerID; userid: number; };
		inventory_contents_changed: { EntityIndex: EntityIndex; EventType?: number; DropItemIndex?: EntityIndex; PickItemIndex?: EntityIndex; };
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
		/** 普通攻击弹道被攻击者状态阻止，沿用原版可供技能响应的事件。 */
		attack_projectile_disabled: { unit: CDOTA_BaseNPC; target?: CDOTA_BaseNPC; };
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
		removed?: boolean;
		unitRole?: UnitEventRole;
		unit?: CDOTA_BaseNPC;
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
					listener.removed = true;
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

	/** 使用与普通事件相同的注册表；单位监听只能由 FireUnit 的明确路由触发。 */
	RegisterUnit<K extends UnitEventName, TContext extends {}>(eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void, role: UnitEventRole,
		unit?: CDOTA_BaseNPC, context?: TContext): number {
		const eventID = this.Register(eventType, callback, context);
		const listener = this.eventIdMap[eventType].find(entry => entry.eventID === eventID)!;
		listener.unitRole = role; listener.unit = unit;
		return eventID;
	}

	/** Modifier/技能声明式注册，返回的 ID 由各自销毁生命周期释放。 */
	RegisterUnitListeners<TContext extends {}>(listeners: Partial<UnitEventListenerMap>, owner: CDOTA_BaseNPC, context: TContext): number[] {
		const ids: number[] = [];
		for (const [eventType, roles] of pairs(listeners)) {
			for (const role of ["source", "target", "global"] as UnitEventRole[]) {
				const callback = roles[role];
				if (callback) ids.push(this.RegisterUnit(eventType, callback as any, role, owner, context));
			}
		}
		return ids;
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
					listeners[i].removed = true;
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
					listeners[i].removed = true;
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
		for (const listener of listeners) listener.removed = true;
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
		data: EventCallback[K],
		route?: UnitEventRoute
	) {
		const listeners = this.eventIdMap[eventType];
		if (!listeners || listeners.length === 0) {
			return;
		}

		// 固定本次快照：新增监听下次参与，注销通过 removed 即时生效。
		// 原版先来源、再目标、最后全局；各组同优先级后注册先执行。
		const group = (listener: EventListenerData) => listener.unitRole === "source" ? 0 : listener.unitRole === "target" ? 1 : 2;
		const snapshot = listeners.slice().sort((a, b) => {
			const groupOrder = group(a) - group(b);
			if (groupOrder !== 0) return groupOrder;
			const priorityOrder = (b.priority ?? 100) - (a.priority ?? 100);
			if (priorityOrder !== 0) return priorityOrder;
			return b.eventID - a.eventID;
		});
		let errors: Array<{ eventID: number; error: string; }> | undefined;

		for (const listener of snapshot) {
			if (listener.removed || !listener.callback) continue;
			if (listener.unitRole) {
				if (!route) continue;
				if (listener.unitRole !== "global" && (!IsValid(listener.unit) || listener.unit !== route[listener.unitRole])) continue;
			}

			// 安全调用回调
			const [success, errorMsg] = xpcall(
				() => {
					if (listener.filter && !listener.filter(data)) return;
					listener.callback.call(listener.context, data);
				}, traceback
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

		return errors;
	}

	/** 只在真实原版触发点发布一次；普通订阅者仍能收到同一事件。 */
	FireUnit<K extends UnitEventName>(eventType: K, data: EventCallback[K], source?: CDOTA_BaseNPC, target?: CDOTA_BaseNPC) {
		return this.Fire(eventType, data, { source, target });
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
			this.Unregister(eventID);
			callback.call(context as TContext, data);
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
