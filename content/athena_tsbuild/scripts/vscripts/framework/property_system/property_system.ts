/** @noSelfInFile */

import { reloadable } from "../../lib/tstl-utils";

/**
 * 属性系统 - 整合版 CModule
 * 
 * 完整的属性管理系统，支持：
 * - 双作用域（玩家/单位级别）
 * - 双类型（静态/动态属性）
 * - 自动网表同步
 * - 多层缓存优化
 * - 自动内存清理
 * - 完整调试工具
 * 
 */
/**
用户获取属性：
  GetPropertyValue/GetPropertyValueEx
 → GetPropertyValueCore
   → GetDynamicPropertyValue（会触发回调）
	 → CalculateDynamicPropertyValue（调用所有回调）
  网表同步：
  SyncEntityBatch
 → GetPropertyValueInternal
   → 直接读缓存（不触发回调）
 */
// ==================== 类型定义 ====================
require('property_system_types');
require('properties_tool');

// ==================== 主类定义 ====================
@reloadable
class MPropertySystem extends CModule {
	// 网表同步配置
	private readonly NETTABLE_NAME = 'property_system';
	private readonly SYNC_INTERVAL = 0.2;
	private readonly MAX_NETTABLE_SIZE = 14000; // 留余量，实际限制是 16KB

	// 自动清理配置
	private autoCleanupInterval = 30;

	init(reload: boolean): void {
		if (!reload) {
			this.InitializeCore();

			if (IsServer()) {
				this.InitializeNetTableSync();
				this.StartAutoCleanup();
				if (IsInToolsMode()) {
					this.RegisterDebugCommands();
				}
				this.RegisterEventPropertyResponses();
			}

			this.print('Property System initialized');
		} else {
			this.print('Property System reloaded');
		}
		require("properties");
	}

	initPriority(): number {
		return 10; // 较高优先级，在大多数系统之前初始化
	}

	reset(): void {
		this.ResetSystem();
	}

	// ==================== 核心初始化 ====================

	private InitializeCore(): void {
		if (!PropertyData) {
			PropertyData = {
				configs: {},
				playerStorage: {},
				unitStorage: {},
				dirtyKeys: {},
				lastSyncTime: 0,
				stats: {
					totalReads: 0,
					cacheHits: 0,
					totalWrites: 0,
					syncCount: 0,
				},
				eventPropertyResponses: {},
			};
		}
	}


	// ==================== 属性配置 ====================

	/** 注册单个属性配置 */
	RegisterProperty(config: PropertyConfig): void {
		const finalConfig: PropertyConfig = {
			...config,
			defaultValue: config.defaultValue ?? 0,
			syncToClient: config.syncToClient ?? true,
			syncPriority: config.syncPriority ?? 100,
			enableCache: config.enableCache ?? true,
			cacheDuration: config.cacheDuration ?? 0,
		};

		PropertyData.configs[config.id] = finalConfig;

		// 注册事件属性响应
		if (config.event_name != undefined && config.event_name != "" && config.event_link_id != undefined && config.event_link_id != "") {
			// 如果该事件还没有注册响应，创建一个数组
			if (!PropertyData.eventPropertyResponses[config.event_name]) {
				PropertyData.eventPropertyResponses[config.event_name] = [];
			}
			const responseList = PropertyData.eventPropertyResponses[config.event_name];
			const existingIndex = responseList.findIndex(response =>
				response.sourcePropertyId === config.id
				&& response.targetPropertyId === config.event_link_id
			);
			if (existingIndex !== -1) {
				return;
			}
			// 将属性ID和链接属性名添加到该事件的响应列表中
			responseList.push({
				sourcePropertyId: config.id,
				targetPropertyId: config.event_link_id,
			});
			// this.print(`Registered event property response: ${config.event_name} -> ${config.id} to ${config.event_link_id}`);
		}
	}

	/** 批量注册属性配置 */
	RegisterProperties(configs: PropertyConfig[]): void {
		for (const config of configs) {
			this.RegisterProperty(config);
		}
	}

	// ==================== 静态属性 API ====================

	/**
	 * 添加静态属性（不依赖 modifier）
	 * @param key 目标键（playerID 或 entityIndex）
	 * @param propertyId 属性 ID
	 * @param sourceId 属性来源的唯一标识（如 "item_sword", "ability_crit", "buff_aura"）
	 * @param value 属性值
	 * @param metadata 可选的元数据
	 */
	AddStaticProperty(
		key: PropertySystemKey,
		propertyId: string,
		sourceId: string,
		value: number,
		metadata?: Record<string, any>
	): boolean {
		const config = this.GetConfig(propertyId);
		if (config == undefined) { return false; }

		const storage = this.GetStorage(config.scope, key);
		let propertyList = storage.static[propertyId];

		if (!propertyList) {
			propertyList = [];
			storage.static[propertyId] = propertyList;
		}

		// 检查是否已存在相同 sourceId
		const existingIndex = propertyList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有值
			const oldValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			propertyList[existingIndex].value = value;
			propertyList[existingIndex].metadata = metadata;
			this.RecalculateStaticProperty(config.scope, key, propertyId);
			const newValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			if (config.notify && oldValue !== newValue) {
				Event.Fire('property_changed', {
					scope: config.scope,
					key,
					propertyId,
					oldValue,
					newValue,
				});
			}
		} else {
			// 添加新属性
			const oldValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			propertyList.push({
				sourceId,
				value,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
			this.RecalculateStaticProperty(config.scope, key, propertyId);
			const newValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			if (config.notify && oldValue !== newValue) {
				Event.Fire('property_changed', {
					scope: config.scope,
					key,
					propertyId,
					oldValue,
					newValue,
				});
			}
		}

		if (config.syncToClient) {
			this.MarkDirty(config.scope, key, propertyId);
		}

		PropertyData.stats.totalWrites++;
		return true;
	}

	/**
	 * 移除静态属性
	 * @param key 目标键
	 * @param sourceId 属性来源 ID
	 * @param propertyId 属性 ID（可选，不传则移除该 sourceId 的所有属性）
	 */
	RemoveStaticProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId?: string
	): boolean {
		if (propertyId) {
			return this.RemoveSingleStaticProperty(key, sourceId, propertyId);
		} else {
			// 移除该 sourceId 的所有属性
			let removed = false;
			for (const [pid] of pairs(PropertyData.configs as any)) {
				if (this.RemoveSingleStaticProperty(key, sourceId, pid as string)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private RemoveSingleStaticProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId: string
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		const propertyList = storage.static[propertyId];

		if (!propertyList) return false;


		const index = propertyList.findIndex(d => d.sourceId === sourceId);

		if (index !== -1) {
			// 在修改前记录状态
			const oldValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			propertyList.splice(index, 1);

			if (propertyList.length === 0) {
				delete storage.static[propertyId];
				delete storage.staticCache[propertyId];
			} else {
				this.RecalculateStaticProperty(config.scope, key, propertyId);
			}

			const newValue = this.GetStaticPropertyValue(config.scope, key, propertyId);
			if (config.notify && oldValue !== newValue) {
				Event.Fire('property_changed', {
					scope: config.scope,
					key,
					propertyId,
					oldValue,
					newValue,
				});
			}

			if (config.syncToClient) {
				this.MarkDirty(config.scope, key, propertyId);
			}

			return true;
		}

		return false;
	}


	// ==================== 静态属性扩展 API ====================

	/**
	 * 添加静态属性（便捷版本，自动根据 scope 选择 key）
	 *
	 * 根据属性配置的作用域，自动选择适当的键值来存储属性：
	 * - 对于PLAYER作用域：使用playerId作为键
	 * - 对于UNIT作用域：使用unitIndex作为键（如果提供了有效的单位索引）
	 *
	 * @param propertyId 属性ID，必须是已注册的属性
	 * @param sourceId 属性来源的唯一标识（如 "item_sword", "ability_crit", "buff_aura"）
	 * @param value 属性值
	 * @param playerId 玩家ID，用于PLAYER作用域或作为UNIT作用域的备选
	 * @param unitIndex 单位实体索引，仅对UNIT作用域属性有效
	 * @param metadata 可选的元数据
	 * @returns 操作是否成功
	 *
	 * 示例：
	 * ```typescript
	 * PropertySystem.AddStaticPropertyEx("attack_damage", "item_sword", 50, playerID, hero.entindex());
	 * ```
	 */
	AddStaticPropertyEx(
		propertyId: string,
		sourceId: string,
		value: number,
		playerId: PlayerID,
		unitIndex?: EntityIndex,
		metadata?: Record<string, any>
	): boolean {
		const config = this.GetConfig(propertyId);
		if (config == undefined) { return false; }
		const key = this.SelectKeyFromContext(config.scope, playerId, unitIndex);
		return this.AddStaticProperty(key, propertyId, sourceId, value, metadata);
	}

	/**
	 * 移除静态属性（便捷版本，自动根据 scope 选择 key）
	 *
	 * 遍历所有已注册的属性配置，根据每个属性的 scope 自动选择正确的 key 来移除：
	 * - PLAYER作用域的属性：从 playerID 下移除
	 * - UNIT作用域的属性：从 unitIndex 下移除（如果提供了）
	 *
	 * @param sourceId 属性来源的唯一标识
	 * @param playerId 玩家ID，用于PLAYER作用域
	 * @param unitIndex 单位实体索引，用于UNIT作用域（可选）
	 * @param propertyId 属性ID（可选，指定则只移除该属性，不指定则移除该sourceId的所有属性）
	 * @returns 是否移除了任何属性
	 *
	 * 示例：
	 * ```typescript
	 * // 移除该来源的所有属性（包括 PLAYER 和 UNIT scope）
	 * PropertySystem.RemoveStaticPropertyEx("item_sword", playerID, hero.entindex());
	 *
	 * // 只移除特定属性
	 * PropertySystem.RemoveStaticPropertyEx("item_sword", playerID, hero.entindex(), "attack_damage");
	 * ```
	 */
	RemoveStaticPropertyEx(
		sourceId: string,
		playerId: PlayerID,
		unitIndex?: EntityIndex,
		propertyId?: string
	): boolean {
		let removed = false;

		if (propertyId) {
			// 移除指定属性
			const config = this.GetConfig(propertyId);
			if (config == undefined) { return false; }
			const key = this.SelectKeyFromContext(config.scope, playerId, unitIndex);
			return this.RemoveStaticProperty(key, sourceId, propertyId);
		} else {
			// 遍历所有已注册的属性，根据各自的 scope 移除
			for (const [pid] of pairs(PropertyData.configs as any)) {
				const propId = pid as string;
				const config = this.GetConfig(propId);
				if (config == undefined) continue;

				// 根据属性的 scope 选择正确的 key
				const key = this.SelectKeyFromContext(config.scope, playerId, unitIndex);
				if (this.RemoveSingleStaticProperty(key, sourceId, propId)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	/**
	 * 根据属性作用域从上下文中选择合适的键值
	 * 
	 * 根据属性的配置作用域（玩家级或单位级），从给定的上下文参数中选择适当的键值：
	 * - PLAYER作用域：返回 playerID
	 * - UNIT作用域：返回 unitIndex（如果提供了有效的单位索引）
	 * 
	 * @param scope 属性的作用域（玩家级或单位级）
	 * @param playerID 玩家ID，对于PLAYER作用域属性必填，对于UNIT作用域作为备选
	 * @param unitIndex 单位实体索引，仅对UNIT作用域属性有效
	 * @returns 用于属性存储的键值（PlayerID 或 EntityIndex）
	 */
	private SelectKeyFromContext(scope: PropertyScope, playerID: PlayerID, unitIndex?: EntityIndex): PropertySystemKey {
		if (scope === PropertyScope.PLAYER) {
			return playerID;
		} else if (scope === PropertyScope.UNIT) {
			if (!unitIndex) {
				this.print(`[PropertySystem] Error: UNIT scope property requires unit in context`);
				return playerID; // 降级到 playerID
			}
			return unitIndex;
		}

		this.print(`[PropertySystem] Error: Unknown scope ${scope}`);
		return playerID;
	}

	/** 获取静态属性值 */
	GetStaticPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);
		const cachedValue = storage.staticCache[propertyId];

		PropertyData.stats.totalReads++;
		if (cachedValue !== undefined) {
			PropertyData.stats.cacheHits++;
		}

		// 返回缓存的值或0，不返回defaultValue
		// defaultValue 由 GetPropertyValue 统一处理，避免重复添加
		return cachedValue ?? 0;
	}

	private RecalculateStaticProperty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
		const config = this.GetConfig(propertyId);
		if (!config) return;

		const storage = this.GetStorage(scope, key);
		const propertyList = storage.static[propertyId];

		if (!propertyList || propertyList.length === 0) {
			delete storage.staticCache[propertyId];
			return;
		}

		// 计算总和（静态属性不需要清理无效项）
		// 注意：这里使用 0 作为初始值，而不是 defaultValue
		// defaultValue 应该在没有属性值时由 GetPropertyValue 统一处理
		let result = this.GetAggregationInitialValue(config.aggregation, 0);

		for (const data of propertyList) {
			result = this.AggregateValues(config.aggregation, result, data.value, config.customAggregator);
		}

		storage.staticCache[propertyId] = result;
	}

	//region Ability Extra Static Property API

	AddAbilityStaticProperty(
		ability: CDOTABaseAbility,
		propertyId: string,
		sourceId: string,
		value: number,
		metadata?: Record<string, any>
	): boolean {
		if (!IsValid(ability)) return false;

		const config = this.GetConfig(propertyId);
		if (config == undefined) { return false; }
		if (config.scope !== PropertyScope.UNIT) {
			this.print(`[PropertySystem] Ability extra property only supports UNIT scope: ${propertyId}`);
			return false;
		}

		ability.__ExtraStaticPropertyList ??= {};
		ability.__ExtraStaticPropertyCache ??= {};
		let propertyList = ability.__ExtraStaticPropertyList[propertyId];

		if (!propertyList) {
			propertyList = [];
			ability.__ExtraStaticPropertyList[propertyId] = propertyList;
		}

		const existingIndex = propertyList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			propertyList[existingIndex].value = value;
			propertyList[existingIndex].metadata = metadata;
		} else {
			propertyList.push({
				sourceId,
				value,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
		}

		this.RecalculateAbilityStaticProperty(ability, propertyId);
		return true;
	}

	RemoveAbilityStaticProperty(
		ability: CDOTABaseAbility,
		sourceId: string,
		propertyId?: string
	): boolean {
		if (!IsValid(ability) || ability.__ExtraStaticPropertyList == undefined) return false;

		if (propertyId != undefined) {
			return this.RemoveSingleAbilityStaticProperty(ability, sourceId, propertyId);
		}

		let removed = false;
		for (const [pid] of pairs(ability.__ExtraStaticPropertyList as any)) {
			if (this.RemoveSingleAbilityStaticProperty(ability, sourceId, pid as string)) {
				removed = true;
			}
		}
		return removed;
	}

	GetAbilityExtraPropertyTable(ability: CDOTABaseAbility): ExtraPropertyTable | undefined {
		if (!IsValid(ability)) return undefined;
		return ability.__ExtraStaticPropertyCache;
	}

	ClearAbilityStaticProperties(ability: CDOTABaseAbility): void {
		if (!IsValid(ability)) return;
		ability.__ExtraStaticPropertyList = undefined;
		ability.__ExtraStaticPropertyCache = undefined;
	}

	private RemoveSingleAbilityStaticProperty(
		ability: CDOTABaseAbility,
		sourceId: string,
		propertyId: string
	): boolean {
		const propertyList = ability.__ExtraStaticPropertyList?.[propertyId];
		if (!propertyList) return false;

		const index = propertyList.findIndex(d => d.sourceId === sourceId);
		if (index === -1) return false;

		propertyList.splice(index, 1);
		if (propertyList.length === 0) {
			delete ability.__ExtraStaticPropertyList![propertyId];
			delete ability.__ExtraStaticPropertyCache?.[propertyId];
		} else {
			this.RecalculateAbilityStaticProperty(ability, propertyId);
		}

		return true;
	}

	private RecalculateAbilityStaticProperty(ability: CDOTABaseAbility, propertyId: string): void {
		const config = this.GetConfig(propertyId);
		if (!config) return;

		ability.__ExtraStaticPropertyCache ??= {};
		const propertyList = ability.__ExtraStaticPropertyList?.[propertyId];

		if (!propertyList || propertyList.length === 0) {
			delete ability.__ExtraStaticPropertyCache[propertyId];
			return;
		}

		let result = this.GetAggregationInitialValue(config.aggregation, 0);
		for (const data of propertyList) {
			result = this.AggregateValues(config.aggregation, result, data.value, config.customAggregator);
		}

		ability.__ExtraStaticPropertyCache[propertyId] = result;
	}

	//region 动态属性 API

	/**
	 * 注册动态属性（不依赖 modifier）
	 * @param key 目标键
	 * @param propertyId 属性 ID
	 * @param sourceId 属性来源的唯一标识
	 * @param callback 回调函数
	 * @param priority 优先级（越小越先执行）
	 * @param metadata 可选的元数据
	 */
	RegisterDynamicProperty(
		key: PropertySystemKey,
		propertyId: string,
		sourceId: string,
		callback: DynamicPropertyCallback,
		priority: number = 0,
		metadata?: Record<string, any>
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		let propertyList = storage.dynamic[propertyId];

		if (!propertyList) {
			propertyList = [];
			storage.dynamic[propertyId] = propertyList;
		}

		const existingIndex = propertyList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有的
			propertyList[existingIndex].callback = callback;
			propertyList[existingIndex].priority = priority;
			propertyList[existingIndex].metadata = metadata;
		} else {
			// 添加新的
			propertyList.push({
				sourceId,
				callback,
				priority,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
		}

		propertyList.sort((a, b) => a.priority - b.priority);
		const oldValue = this.GetDynamicPropertyValueInternal(config.scope, key, propertyId);
		delete storage.runtimeCache[propertyId];
		const newValue = this.GetDynamicPropertyValueInternal(config.scope, key, propertyId);

		// 发送属性变更事件
		if (config.notify && oldValue !== newValue) {
			Event.Fire('property_changed', {
				scope: config.scope,
				key,
				propertyId,
				oldValue,
				newValue,
			});
		}

		if (config.syncToClient) {
			this.MarkDirty(config.scope, key, propertyId);
		}

		PropertyData.stats.totalWrites++;
		return true;
	}

	/**
	 * 注销动态属性
	 * @param key 目标键
	 * @param sourceId 属性来源 ID
	 * @param propertyId 属性 ID（可选）
	 */
	UnregisterDynamicProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId?: string
	): boolean {
		if (propertyId) {
			return this.UnregisterSingleDynamicProperty(key, sourceId, propertyId);
		} else {
			// 移除该 sourceId 的所有动态属性
			let removed = false;
			for (const [pid] of pairs(PropertyData.configs as any)) {
				if (this.UnregisterSingleDynamicProperty(key, sourceId, pid as string)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private UnregisterSingleDynamicProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId: string
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		const propertyList = storage.dynamic[propertyId];

		if (!propertyList) return false;

		// 在修改前记录状态
		const index = propertyList.findIndex(d => d.sourceId === sourceId);
		if (index !== -1) {
			const oldValue = this.GetDynamicPropertyValueInternal(config.scope, key, propertyId);
			propertyList.splice(index, 1);

			if (propertyList.length === 0) {
				delete storage.dynamic[propertyId];
			}

			delete storage.runtimeCache[propertyId];
			const newValue = this.GetDynamicPropertyValueInternal(config.scope, key, propertyId);
			if (config.notify && oldValue !== newValue) {
				Event.Fire('property_changed', {
					scope: config.scope,
					key,
					propertyId,
					oldValue,
					newValue,
				});
			}

			if (config.syncToClient) {
				this.MarkDirty(config.scope, key, propertyId);
			}

			return true;
		}

		return false;
	}

	/** 获取动态属性值（带缓存） */
	GetDynamicPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);

		// 检查缓存
		if (config.enableCache) {
			const cached = storage.runtimeCache[propertyId];
			const currentFrame = this.GetCurrentFrame();

			if (cached != undefined) {
				const frameAge = currentFrame - cached.frame;
				if (frameAge <= (config.cacheDuration ?? 0)) {
					PropertyData.stats.totalReads++;
					PropertyData.stats.cacheHits++;
					return cached.value;
				}
			}
		}

		// 计算新值
		const value = this.CalculateDynamicPropertyValue(scope, key, propertyId, params);

		// 更新缓存
		if (config.enableCache) {
			storage.runtimeCache[propertyId] = {
				value,
				frame: this.GetCurrentFrame(),
				time: this.GetCurrentTime(),
			};
		}

		PropertyData.stats.totalReads++;
		return value;
	}

	/**
	 * 内部获取动态属性值（不触发副作用回调，用于系统同步）
	 * 直接返回缓存值，如果没有缓存则返回默认值
	 */
	private GetDynamicPropertyValueInternal(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);
		const cached = storage.runtimeCache[propertyId];

		// 如果有缓存就返回缓存，否则返回0
		// defaultValue 由 GetPropertyValue 统一处理，避免重复添加
		return cached?.value ?? 0;
	}

	private CalculateDynamicPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);
		const propertyList = storage.dynamic[propertyId];

		if (!propertyList || propertyList.length === 0) {
			return 0;  // 返回 0 而不是 defaultValue，避免重复添加
		}

		// 计算总和（动态属性不需要清理无效项）
		// 注意：这里使用 0 作为初始值，而不是 defaultValue
		// defaultValue 应该在没有属性值时由 GetPropertyValue 统一处理
		let result = this.GetAggregationInitialValue(config.aggregation, 0);

		for (const data of propertyList) {
			try {
				const value = data.callback(params);
				if (value !== undefined) {
					result = this.AggregateValues(config.aggregation, result, value, config.customAggregator);
				}
			} catch (error) {
				this.print(`Error in callback for ${propertyId} (sourceId: ${data.sourceId}): ${error}`);
			}
		}

		return result;
	}

	/** 清除动态属性缓存 */
	ClearDynamicPropertyCache(scope: PropertyScope, key: PropertySystemKey, propertyId?: string): void {
		const storage = this.GetStorage(scope, key);

		if (propertyId) {
			delete storage.runtimeCache[propertyId];
		} else {
			storage.runtimeCache = {};
		}
	};

	// ==================== 通用属性值获取 ====================

	/**
	 * 核心属性值计算（内部实现）
	 * @param config 属性配置（避免重复 GetConfig 调用）
	 * @param scope 属性作用域
	 * @param key 属性键
	 * @param params 可选参数
	 */
	private GetPropertyValueCore(
		config: PropertyConfig,
		key: PropertySystemKey,
		params?: any
	): number {
		const scope: PropertyScope = config.scope;
		if (IsServer()) {
			const defaultValue = config?.defaultValue ?? 0;
			const staticValue = this.GetStaticPropertyValue(scope, key, config.id);

			// 大多数属性只有静态值。没有注册动态属性时，跳过配置读取、
			// 帧缓存检查和动态聚合，避免伤害热路径上的无效调用。
			const dynamicProperties = this.GetStorage(scope, key).dynamic[config.id];
			const dynamicValue = dynamicProperties !== undefined && dynamicProperties.length > 0
				? this.GetDynamicPropertyValue(scope, key, config.id, params)
				: 0;
			const extraValue = scope === PropertyScope.UNIT ? params?.extraProperties?.[config.id] : undefined;

			// 使用配置的聚合策略将三部分聚合
			let result = this.AggregateValues(config.aggregation, dynamicValue, staticValue, config.customAggregator);
			if (extraValue !== undefined) {
				result = this.AggregateValues(config.aggregation, result, extraValue, config.customAggregator);
			}
			result = this.AggregateValues(config.aggregation, result, defaultValue, config.customAggregator);
			return result;
		} else {
			// 客户端直接从网表获取
			return this.GetPropertyValueFromNetTable(scope, key, config.id);
		}
	}

	/**
	 * 获取属性值（便捷版本，自动根据 scope 选择 key）
	 * @param propertyId 属性 ID
	 * @param playerId 玩家 ID
	 * @param unitIndex 单位索引（可选，用于 UNIT scope 的属性）
	 * @param params 可选参数
	 */
	GetPropertyValueEx(propertyId: string, playerId: PlayerID, unitIndex?: EntityIndex, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (config == undefined) { return 0; }
		const key = this.SelectKeyFromContext(config.scope, playerId, unitIndex);
		return this.GetPropertyValueCore(config, key, params);
	}
	/**
	 * 获取属性值（标准版本，需要明确指定 key）
	 * @param key 属性键（playerID 或 entityIndex）
	 * @param propertyId 属性 ID
	 * @param params 可选参数
	 */
	GetPropertyValue(key: PropertySystemKey, propertyId: string, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;
		return this.GetPropertyValueCore(config, key, params);
	}

	/**
	 * 内部方法：获取属性值（只读缓存，不触发回调）
	 * 用于网表同步、日志记录、内部比较等场景
	 *
	 * 与 GetPropertyValue 的区别：
	 * - 不触发动态属性的回调函数（避免副作用）
	 * - 只读取缓存，不重新计算（性能优化）
	 * - 可能返回过期值（但用于同步场景是可接受的）
	 *
	 * @param scope 属性作用域
	 * @param key 属性键
	 * @param propertyId 属性 ID
	 * @internal
	 */
	private GetPropertyValueInternal(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);

		// 直接读取缓存，不重新计算，避免触发回调
		const defaultValue = config?.defaultValue ?? 0;
		const staticValue = storage.staticCache[propertyId] ?? 0;
		const dynamicValue = storage.runtimeCache[propertyId]?.value ?? 0;

		// 使用配置的聚合策略
		let result = this.AggregateValues(config.aggregation, dynamicValue, staticValue, config.customAggregator);
		result = this.AggregateValues(config.aggregation, result, defaultValue, config.customAggregator);

		return result;
	}

	// ==================== 网表同步 ====================

	private InitializeNetTableSync(): void {
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, 'init', {
			version: 1,
			time: this.GetCurrentTime(),
		});

		Timer.GameTimer(this.SYNC_INTERVAL, () => {
			this.SyncDirtyProperties();
			return this.SYNC_INTERVAL;
		});

		this.print('NetTable sync initialized');
	}

	private SyncDirtyProperties(): void {
		let dirtyKeysCount = 0;
		for (const [_] of pairs(PropertyData.dirtyKeys as any)) { dirtyKeysCount++; }
		if (dirtyKeysCount === 0) return;

		const dirtyArray = Object.keys(PropertyData.dirtyKeys);

		// 按 scope+key 分组（每个单位/玩家一个网表 key）
		const groupedByEntity: Record<string, string[]> = {};

		for (const dirtyKey of dirtyArray) {
			const [scopeStr, keyStr] = dirtyKey.split('|');
			const scope = parseInt(scopeStr) as PropertyScope;
			const key = parseInt(keyStr) as PropertySystemKey;
			if (!this.ShouldSyncEntityToClient(scope, key)) {
				continue;
			}

			const entityKey = `${scopeStr}_${keyStr}`; // 例如：UNIT_0, PLAYER_1

			if (groupedByEntity[entityKey] === undefined) {
				groupedByEntity[entityKey] = [];
			}
			groupedByEntity[entityKey].push(dirtyKey);
		}

		// 按优先级排序各组
		for (const [entityKey, keys] of pairs(groupedByEntity as any)) {
			const ek = entityKey as string;
			const keysArray = keys as string[];
			keysArray.sort((a: string, b: string) => {
				const [, , propIdA] = a.split('|');
				const [, , propIdB] = b.split('|');

				const configA = this.GetConfig(propIdA);
				const configB = this.GetConfig(propIdB);

				const priorityA = configA?.syncPriority ?? 100;
				const priorityB = configB?.syncPriority ?? 100;

				return priorityA - priorityB;
			});

			// 按单位/玩家同步（每个单位一个独立的网表 key）
			this.SyncEntityBatch(ek, keysArray);
		}

		PropertyData.dirtyKeys = {};
		PropertyData.lastSyncTime = this.GetCurrentTime();
		PropertyData.stats.syncCount++;
	}

	private ShouldSyncEntityToClient(scope: PropertyScope, key: PropertySystemKey): boolean {
		if (scope !== PropertyScope.UNIT) {
			return true;
		}

		const unit = EntIndexToHScript(key as EntityIndex) as CDOTA_BaseNPC | undefined;
		return IsValid(unit) && unit.IsRealHero();
	}

	/**
	 * 同步单个实体的属性（按网表文档建议：每个单位一个 key）
	 */
	private SyncEntityBatch(entityKey: string, dirtyKeys: string[]): void {
		const existingData = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);
		const update: Record<string, number> = existingData ? { ...existingData } : {};
		for (const dirtyKey of dirtyKeys) {
			const [scopeStr, keyStr, propertyId] = dirtyKey.split('|');
			const scope = parseInt(scopeStr) as PropertyScope;
			const key = parseInt(keyStr) as PropertySystemKey;

			// 使用内部方法获取值（只读缓存，不触发回调，避免级联副作用）
			const value = this.GetPropertyValueInternal(scope, key, propertyId);
			update[propertyId] = value;
		}
		// 使用实体专属的 key（例如：unit_0, player_1）
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, update);
	}

	/** 强制同步指定属性（立即执行） */
	// ForceSyncProperty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
	// 	if (!IsServer()) return;

	// 	const config = this.GetConfig(propertyId);
	// 	if (!config || !config.syncToClient) return;

	// 	const entityKey = `${scope}_${key}`;
	// 	// 使用内部方法获取值，不触发副作用
	// 	const value = this.GetPropertyValueInternal(scope, key, propertyId);

	// 	// 获取该实体的现有数据并合并
	// 	const existingData = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);
	// 	const update: Record<string, number> = existingData ? { ...existingData } : {};
	// 	update[propertyId] = value;

	// 	CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, update);

	// 	// 从脏标记中移除（因为已经同步）
	// 	const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
	// 	delete PropertyData.dirtyKeys[dirtyKey];
	// }

	/** 强制同步实体的所有属性（立即执行） */
	// ForceSyncEntity(scope: PropertyScope, key: PropertySystemKey): void {
	// 	if (!IsServer()) return;

	// 	const storage = this.GetStorage(scope, key);
	// 	const entityKey = `${scope}_${key}`;
	// 	const updates: Record<string, number> = {};

	// 	// 收集所有需要同步的属性
	// 	for (const [propertyId] of pairs(storage.static as any)) {
	// 		const pid = propertyId as string;
	// 		const config = this.GetConfig(pid);
	// 		if (config && config.syncToClient) {
	// 			// 使用内部方法获取值，不触发副作用
	// 			const value = this.GetPropertyValueInternal(scope, key, pid);
	// 			updates[pid] = value;

	// 			// 从脏标记中移除
	// 			const dirtyKey = this.GetDirtyKey(scope, key, pid);
	// 			delete PropertyData.dirtyKeys[dirtyKey];
	// 		}
	// 	}

	// 	for (const [propertyId] of pairs(storage.dynamic as any)) {
	// 		const pid = propertyId as string;
	// 		const config = this.GetConfig(pid);
	// 		if (config && config.syncToClient) {
	// 			// 使用内部方法获取值，不触发副作用
	// 			const value = this.GetPropertyValueInternal(scope, key, pid);
	// 			updates[pid] = value;

	// 			// 从脏标记中移除
	// 			const dirtyKey = this.GetDirtyKey(scope, key, pid);
	// 			delete PropertyData.dirtyKeys[dirtyKey];
	// 		}
	// 	}

	// 	if (Object.keys(updates).length > 0) {
	// 		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, updates);
	// 	}
	// }

	/** 从网表获取属性值（服务器和客户端都可用） */
	GetPropertyValueFromNetTable(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number {
		const entityKey = `${scope}_${key}`;
		const data = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);

		if (data && data[propertyId] !== undefined) {
			return toFiniteNumber(data[propertyId], 0) as number;
		}

		return 0;
	}

	/** 客户端：监听属性变化（使用定时器轮询） */
	ListenPropertyChange(
		scope: PropertyScope,
		key: PropertySystemKey,
		propertyId: string,
		callback: (oldValue: number | undefined, newValue: number | undefined) => void
	): string | undefined {
		if (IsServer()) {
			this.print('Warning: ListenPropertyChange should only be called on client');
			return undefined;
		}

		let lastValue = this.GetPropertyValueFromNetTable(scope, key, propertyId);

		return Timer.GameTimer(0.1, () => {
			const newValue = this.GetPropertyValueFromNetTable(scope, key, propertyId);
			if (newValue !== lastValue) {
				callback(lastValue, newValue);
				lastValue = newValue;
			}
			return 0.1;
		});
	}

	// ==================== 清理系统 ====================

	/**
	 * 清理指定来源的所有属性
	 * @param key 目标键
	 * @param sourceId 来源 ID
	 */
	CleanupSourceProperties(key: PropertySystemKey, sourceId: string): void {
		// 清理静态属性
		this.RemoveStaticProperty(key, sourceId);

		// 清理动态属性
		this.UnregisterDynamicProperty(key, sourceId);
	};

	/** 清理单位的所有属性 */
	CleanupUnitProperties(unit: CDOTA_BaseNPC): void {
		if (!unit) return;

		const entIndex = unit.GetEntityIndex();
		this.CleanupUnitPropertiesByIndex(entIndex);

		const playerID = unit.GetPlayerOwnerID();
		if (playerID !== -1) {
			this.ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID);
		}
	}

	/** 尸体已被引擎移除时，生命周期仍能按记录的索引清理旧数据。 */
	CleanupUnitPropertiesByIndex(entIndex: EntityIndex): void {
		this.ClearEntityDirtyKeys(PropertyScope.UNIT, entIndex);
		this.ClearEntityNetTable(PropertyScope.UNIT, entIndex);
		this.CleanupStorage(PropertyScope.UNIT, entIndex);
	}

	/** 清理玩家的所有属性 */
	CleanupPlayerProperties(playerID: PlayerID): void {
		if (playerID < 0) return;
		this.CleanupStorage(PropertyScope.PLAYER, playerID);
	}

	private CleanupStorage(scope: PropertyScope, key: PropertySystemKey): void {
		const storageMap: any = scope === PropertyScope.PLAYER
			? PropertyData.playerStorage
			: PropertyData.unitStorage;

		const storage = storageMap[key];
		if (storage !== undefined) {
			storage.static = {};
			storage.dynamic = {};
			storage.staticCache = {};
			storage.runtimeCache = {};
			delete storageMap[key];
		}
	}

	private ClearEntityDirtyKeys(scope: PropertyScope, key: PropertySystemKey): void {
		const prefix = `${scope}|${key}|`;
		for (const [dirtyKey] of pairs(PropertyData.dirtyKeys as any)) {
			const currentDirtyKey = dirtyKey as string;
			if (string.sub(currentDirtyKey, 1, string.len(prefix)) === prefix) {
				delete PropertyData.dirtyKeys[currentDirtyKey];
			}
		}
	}

	private ClearEntityNetTable(scope: PropertyScope, key: PropertySystemKey): void {
		if (!IsServer()) {
			return;
		}

		const entityKey = `${scope}_${key}`;
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, {});
	}

	/** 清理所有无效的修饰符引用 */
	CleanupInvalidModifiers(): number {
		let cleanedCount = 0;

		for (const [, storage] of pairs(PropertyData.playerStorage as any)) {
			cleanedCount += this.CleanupStorageInvalidModifiers(storage);
		}

		for (const [, storage] of pairs(PropertyData.unitStorage as any)) {
			cleanedCount += this.CleanupStorageInvalidModifiers(storage);
		}

		if (cleanedCount > 0) {
			this.print(`Cleaned up ${cleanedCount} invalid modifiers`);
		}

		return cleanedCount;
	}

	private CleanupStorageInvalidModifiers(storage: PropertyStorage): number {
		// 注意：移除 modifier 依赖后，此方法不再自动清理
		// 属性现在通过手动调用 CleanupSourceProperties 清理
		// 或者可以扩展为基于时间的过期机制
		return 0;
	}

	/** 清理空存储 */
	CleanupEmptyStorages(): number {
		let cleanedCount = 0;

		for (const [key, storage] of pairs(PropertyData.playerStorage as any)) {
			if (this.IsStorageEmpty(storage)) {
				delete (PropertyData.playerStorage as any)[key];
				cleanedCount++;
			}
		}

		for (const [key, storage] of pairs(PropertyData.unitStorage as any)) {
			const entIndex = toFiniteNumber(key, -1) as EntityIndex;
			const entity = entIndex !== -1 ? EntIndexToHScript(entIndex) : undefined;
			if (!IsValid(entity)) {
				this.ClearEntityDirtyKeys(PropertyScope.UNIT, entIndex);
				this.ClearEntityNetTable(PropertyScope.UNIT, entIndex);
				delete (PropertyData.unitStorage as any)[key];
				cleanedCount++;
			} else if (this.IsStorageEmpty(storage)) {
				delete (PropertyData.unitStorage as any)[key];
				cleanedCount++;
			}
		}

		return cleanedCount;
	}

	private IsStorageEmpty(storage: PropertyStorage): boolean {
		let staticCount = 0;
		for (const [_] of pairs(storage.static as any)) { staticCount++; }
		let dynamicCount = 0;
		for (const [_] of pairs(storage.dynamic as any)) { dynamicCount++; }
		let cacheCount = 0;
		for (const [_] of pairs(storage.staticCache as any)) { cacheCount++; }
		let runtimeCount = 0;
		for (const [_] of pairs(storage.runtimeCache as any)) { runtimeCount++; }
		return staticCount === 0 && dynamicCount === 0 && cacheCount === 0 && runtimeCount === 0;
	}

	/** 启动自动清理 */
	private StartAutoCleanup(): void {
		Timer.GameTimer(this.autoCleanupInterval, () => {
			this.CleanupInvalidModifiers();
			this.CleanupEmptyStorages();
			return this.autoCleanupInterval;
		});

		this.print(`Auto cleanup started (${this.autoCleanupInterval}s)`);
	};

	/** 重置系统 */
	private ResetSystem(): void {
		if (IsServer()) for (const key of CustomNetTables.GetAllTableKeys("property_system")) CustomNetTables.SetTableValue("property_system", key, {});
		PropertyData.playerStorage = {};
		PropertyData.unitStorage = {};
		PropertyData.dirtyKeys = {};
		PropertyData.stats = {
			totalReads: 0,
			cacheHits: 0,
			totalWrites: 0,
			syncCount: 0,
		};
	};

	// ==================== 网表体积管理 ====================

	/** 估算实体的网表体积 */
	EstimateEntityNetTableSize(scope: PropertyScope, key: PropertySystemKey): number {
		const storage = this.GetStorage(scope, key);
		let size = 50; // 基础开销

		// 估算静态属性
		for (const [propertyId] of pairs(storage.static as any)) {
			const pid = propertyId as string;
			size += pid.length + 10;
		}

		// 估算动态属性
		for (const [propertyId] of pairs(storage.dynamic as any)) {
			const pid = propertyId as string;
			size += pid.length + 10;
		}

		return size;
	}

	/** 获取网表体积统计 */
	GetNetTableSizeStats(): { total: number; entities: Record<string, number>; warnings: string[]; } {
		const entities: Record<string, number> = {};
		const warnings: string[] = [];
		let total = 0;

		// 统计玩家
		for (const [playerID] of pairs(PropertyData.playerStorage as any)) {
			const pid = playerID as PlayerID;
			const size = this.EstimateEntityNetTableSize(PropertyScope.PLAYER, pid);
			const key = `PLAYER_${pid}`;
			entities[key] = size;
			total += size;

			if (size > this.MAX_NETTABLE_SIZE) {
				warnings.push(`${key} exceeds size limit: ${size} bytes`);
			}
		}

		// 统计单位
		for (const [entIndex] of pairs(PropertyData.unitStorage as any)) {
			const eid = entIndex as EntityIndex;
			const size = this.EstimateEntityNetTableSize(PropertyScope.UNIT, eid);
			const key = `UNIT_${eid}`;
			entities[key] = size;
			total += size;

			if (size > this.MAX_NETTABLE_SIZE) {
				warnings.push(`${key} exceeds size limit: ${size} bytes`);
			}
		}

		return { total, entities, warnings };
	}

	// ==================== 事件属性响应系统 ====================
	/**
	 * 注册所有事件属性响应监听器
	 * 遍历所有已注册的事件属性响应，为每个事件注册监听器
	 */
	private RegisterEventPropertyResponses(): void {

	}

	/**
	 * 处理事件属性响应的核心逻辑
	 * @param eventName 事件名称
	 * @param eventData 事件数据（用于生成sourceId）
	 * @param playerId 玩家ID
	 * @param unitIndex 单位索引（可选）
	 */
	private ProcessPropertyEventResponse(eventName: string, eventData: any, playerId: PlayerID, unitIndex?: EntityIndex): void {
		const responses = PropertyData.eventPropertyResponses[eventName];
		if (!responses || responses.length === 0) return;

		const sourceId = `${eventName}_${eventData}`;

		// 处理该事件的所有响应
		for (const response of responses) {
			const sourceValue = this.GetPropertyValueEx(
				response.sourcePropertyId,
				playerId,
				unitIndex
			);
			if (sourceValue > 0) {
				this.AddStaticPropertyEx(
					response.targetPropertyId,
					sourceId,
					sourceValue,
					playerId,
					unitIndex
				);
				// this.print(`[EventPropertyResponse] ${eventName}-${sourceId}: Added ${sourceValue} from ${response.sourcePropertyId} to ${response.targetPropertyId} for player ${playerId}`);
			}
		}
	}

	// ==================== 调试命令 ====================

	private RegisterDebugCommands(): void {
		// 打印系统状态
		Convars.RegisterCommand('property_status', () => {
			this.PrintSystemStatus();
		}, 'Print property system status', 0);

		// 打印性能统计
		Convars.RegisterCommand('property_stats', () => {
			this.PrintPerformanceStats();
		}, 'Print performance statistics', 0);

		// 重置统计
		Convars.RegisterCommand('property_reset_stats', () => {
			PropertyData.stats = {
				totalReads: 0,
				cacheHits: 0,
				totalWrites: 0,
				syncCount: 0,
			};
			this.print('Stats reset');
		}, 'Reset performance statistics', 0);

		// 列出所有属性
		Convars.RegisterCommand('property_list', () => {
			this.print('=== Registered Properties ===');
			for (const [id, config] of pairs(PropertyData.configs as any)) {
				const propId = id as string;
				this.print(`${propId}: scope=${PropertyScope[config.scope]}, type=${PropertyValueType[config.valueType]}`);
			}
		}, 'List all registered properties', 0);

		// 强制清理
		Convars.RegisterCommand('property_cleanup', () => {
			const count = this.CleanupInvalidModifiers();
			const storageCount = this.CleanupEmptyStorages();
			this.print(`Cleaned: ${count} modifiers, ${storageCount} storages`);
		}, 'Force cleanup invalid modifiers', 0);

		// 网表体积统计
		Convars.RegisterCommand('property_nettable_size', () => {
			const stats = this.GetNetTableSizeStats();
			this.print('=== NetTable Size Stats ===');
			this.print(`Total: ${stats.total} bytes`);
			this.print(`Entities: ${stats.entities.size}`);

			if (stats.warnings.length > 0) {
				this.print('⚠️ WARNINGS:');
				for (const warning of stats.warnings) {
					this.print(`  ${warning}`);
				}
			}

			// 显示最大的实体
			const entitiesArray: [string, number][] = [];
			for (const [k, v] of pairs(stats.entities as any)) {
				entitiesArray.push([k as string, v as number]);
			}
			const sorted = entitiesArray.sort((a, b) => b[1] - a[1]);
			this.print('\nTop 10 largest entities:');
			for (let i = 0; i < Math.min(10, sorted.length); i++) {
				this.print(`  ${sorted[i][0]}: ${sorted[i][1]} bytes`);
			}
		}, 'Show NetTable size statistics', 0);

		this.print('Debug commands registered');
	}

	private PrintSystemStatus(): void {
		let configCount = 0;
		for (const [_] of pairs(PropertyData.configs as any)) { configCount++; }
		let playerCount = 0;
		for (const [_] of pairs(PropertyData.playerStorage as any)) { playerCount++; }
		let unitCount = 0;
		for (const [_] of pairs(PropertyData.unitStorage as any)) { unitCount++; }

		let dirtyKeysCount = 0;
		for (const [_] of pairs(PropertyData.dirtyKeys as any)) { dirtyKeysCount++; }

		this.print('=== Property System Status ===');
		this.print(`Registered Properties: ${configCount}`);
		this.print(`Player Storages: ${playerCount}`);
		this.print(`Unit Storages: ${unitCount}`);
		this.print(`Dirty Keys: ${dirtyKeysCount}`);
		this.print(`Last Sync: ${PropertyData.lastSyncTime.toFixed(2)}s`);
	}

	private PrintPerformanceStats(): void {
		const stats = PropertyData.stats;
		const hitRate = stats.totalReads > 0
			? (stats.cacheHits / stats.totalReads * 100).toFixed(2)
			: '0.00';

		this.print('=== Performance Stats ===');
		this.print(`Total Reads: ${stats.totalReads}`);
		this.print(`Cache Hits: ${stats.cacheHits} (${hitRate}%)`);
		this.print(`Total Writes: ${stats.totalWrites}`);
		this.print(`Sync Count: ${stats.syncCount}`);
	};

	// ==================== 工具函数 ====================

	private GetStorage(scope: PropertyScope, key: PropertySystemKey): PropertyStorage {
		const storageMap: any = scope === PropertyScope.PLAYER
			? PropertyData.playerStorage
			: PropertyData.unitStorage;

		let storage = storageMap[key];
		if (!storage) {
			storage = {
				static: {},
				dynamic: {},
				staticCache: {},
				runtimeCache: {},
			};
			storageMap[key] = storage;
		}

		return storage;
	}

	private GetConfig(propertyId: string): PropertyConfig | undefined {
		return PropertyData.configs[propertyId];
	}

	GetScopeOfProperty(propertyId: string): PropertyScope | undefined {
		const config = this.GetConfig(propertyId);
		return config ? config.scope : undefined;
	}

	/** 根据属性配置的聚合策略，将两个值聚合（客户端使用） */
	AggregatePropertyValues(propertyId: string, current: number, value: number): number {
		const config = PropertyData.configs[propertyId];
		if (config === undefined) {
			return current + value;
		}
		return this.AggregateValues(config.aggregation, current, value, config.customAggregator);
	}

	private ValidateProperty(propertyId: string): boolean {
		if (PropertyData.configs[propertyId] === undefined) {
			this.print(`Error: Property ${propertyId} not registered`);
			return false;
		}
		return true;
	}

	/**
	 * 获取实体的上下文信息
	 * 辅助方法：根据实体自动推断 scope 和 key
	 * @param entity 单位或玩家
	 * @returns [scope, key] 或 undefined
	 */
	GetEntityContext(entity: CDOTA_BaseNPC | CDOTAPlayerController): [PropertyScope, PropertySystemKey] | undefined {
		if (!entity || !IsValid(entity)) return undefined;

		// 尝试作为玩家
		if ((entity as CDOTAPlayerController).IsPlayer && (entity as CDOTAPlayerController).IsPlayer()) {
			const playerID = (entity as CDOTAPlayerController).GetPlayerID();
			return [PropertyScope.PLAYER, playerID];
		}

		// 尝试作为单位
		if ((entity as CDOTA_BaseNPC).IsBaseNPC && (entity as CDOTA_BaseNPC).IsBaseNPC()) {
			return [PropertyScope.UNIT, (entity as CDOTA_BaseNPC).GetEntityIndex()];
		}

		return undefined;
	}

	private AggregateValues(strategy: AggregationStrategy, current: number, value: number, customAggregator?: CustomAggregator): number {
		switch (strategy) {
			case AggregationStrategy.SUM:
				return current + value;
			case AggregationStrategy.MULTIPLY:
				return ((1 + current * 0.01) * (1 + value * 0.01) - 1) * 100;
			case AggregationStrategy.DECMUL:
				return (1 - (1 - current * 0.01) * (1 - value * 0.01)) * 100;
			case AggregationStrategy.MAX:
				return Math.max(current, value);
			case AggregationStrategy.MIN:
				return Math.min(current, value);
			case AggregationStrategy.FIRST:
				return current !== 0 ? current : value;
			case AggregationStrategy.LAST:
				return value;
			case AggregationStrategy.CUSTOM:
				if (customAggregator) {
					return customAggregator(current, value);
				}
				return current + value;
			default:
				return current + value;
		}
	}

	private GetAggregationInitialValue(strategy: AggregationStrategy, defaultValue: number): number {
		switch (strategy) {
			case AggregationStrategy.MAX:
				return Number.NEGATIVE_INFINITY;
			case AggregationStrategy.MIN:
				return Number.POSITIVE_INFINITY;
			case AggregationStrategy.FIRST:
			case AggregationStrategy.LAST:
				return defaultValue;
			default:
				return defaultValue;
		}
	}

	private GetDirtyKey(scope: PropertyScope, key: PropertySystemKey, propertyId: string): string {
		// 使用 | 作为分隔符，避免与 propertyId 中的 _ 冲突
		return `${scope}|${key}|${propertyId}`;
	}

	private MarkDirty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
		const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
		PropertyData.dirtyKeys[dirtyKey] = true;
	}

	private GetCurrentFrame(): number {
		return GameRules.GetDOTATime(false, false) as number;
	}

	private GetCurrentTime(): number {
		return GameRules.GetGameTime();
	}

	/**
	 * 强制同步所有未同步的属性（用于测试/调试）
	 */
	ForceSyncAllDirty(): void {
		if (!IsServer()) return;

		let dirtyCount = 0;
		for (const [_] of pairs(PropertyData.dirtyKeys as any)) { dirtyCount++; }
		if (dirtyCount === 0) return;

		this.print(`[ForceSyncAllDirty] Syncing ${dirtyCount} dirty properties...`);
		this.SyncDirtyProperties();
		let remainingCount = 0;
		for (const [_] of pairs(PropertyData.dirtyKeys as any)) { remainingCount++; }
		this.print(`[ForceSyncAllDirty] Sync completed, remaining: ${remainingCount}`);
	}
}

// ==================== 导出 ====================

declare global {
	var PropertySystem: MPropertySystem;
	var PropertyData: {
		configs: Record<string, PropertyConfig>,
		playerStorage: Partial<Record<PlayerID, PropertyStorage>>,
		unitStorage: Partial<Record<EntityIndex, PropertyStorage>>,
		dirtyKeys: Record<string, true>;
		lastSyncTime: number,
		stats: {
			totalReads: number,
			cacheHits: number,
			totalWrites: number,
			syncCount: number,
		},
		eventPropertyResponses: Record<string, {
			sourcePropertyId: string,
			targetPropertyId: string,
		}[]>,
	};

}
PropertySystem ??= new MPropertySystem();
