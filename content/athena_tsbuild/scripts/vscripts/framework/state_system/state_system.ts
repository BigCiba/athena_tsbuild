/** @noSelfInFile */

import { reloadable } from "../../lib/tstl-utils";

// ==================== 类型定义 ====================

// ==================== 主类定义 ====================
@reloadable
class MStateSystem extends CModule {
	// 网表同步配置
	private readonly NETTABLE_NAME = "state_system";
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
			}

			this.print('State System initialized');
		} else {
			this.print('State System reloaded');
		}
	}

	initPriority(): number {
		return 10; // 较高优先级，在大多数系统之前初始化
	}

	reset(): void {
		this.ResetSystem();
	}

	// ==================== 核心初始化 ====================

	private InitializeCore(): void {
		if (!StateData) {
			StateData = {
				unitStorage: {},
				dirtyKeys: {},
				lastSyncTime: 0,
				stats: {
					totalReads: 0,
					cacheHits: 0,
					totalWrites: 0,
					syncCount: 0,
				},
			};
		}
	}

	// ==================== 静态状态 API ====================

	/**
	 * 添加静态状态
	 * @param key 目标键（entityIndex）
	 * @param stateId 状态 ID
	 * @param sourceId 状态来源的唯一标识（如 "item_sword", "ability_root", "buff_stun"）
	 * @param value 状态值（true/false）
	 * @param priority 优先级（静态数值或返回数值的函数）
	 * @param metadata 可选的元数据
	 */
	AddStaticState(
		key: StateSystemKey,
		stateId: StateId,
		sourceId: string,
		value: boolean,
		priority: StatePriority = 0,
		metadata?: Record<string, any>
	): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		let stateList = storage.static[stateKey];

		if (!stateList) {
			stateList = [];
			storage.static[stateKey] = stateList;
		}

		// 检查是否已存在相同 sourceId
		const existingIndex = stateList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有状态
			const oldValue = this.GetStaticStateValue(key, stateKey);
			stateList[existingIndex].value = value;
			stateList[existingIndex].priority = priority;
			stateList[existingIndex].metadata = metadata;
			this.RecalculateStaticState(key, stateKey);
			const newValue = this.GetStaticStateValue(key, stateKey);
			if (oldValue !== newValue) {
				Event.Fire('state_changed', {
					key,
					stateId: stateKey,
					oldValue,
					newValue
				});
			}
		} else {
			// 添加新状态
			const oldValue = this.GetStaticStateValue(key, stateKey);
			stateList.push({
				sourceId,
				value,
				priority,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
			this.RecalculateStaticState(key, stateKey);
			const newValue = this.GetStaticStateValue(key, stateKey);
			if (oldValue !== newValue) {
				Event.Fire('state_changed', {
					key,
					stateId: stateKey,
					oldValue,
					newValue
				});
			}
		}

		this.MarkDirty(key, stateKey);

		StateData.stats.totalWrites++;
		return true;
	}

	/**
	 * 移除静态状态
	 * @param key 目标键
	 * @param sourceId 状态来源 ID
	 * @param stateId 状态 ID（可选，不传则移除该 sourceId 的所有状态）
	 */
	RemoveStaticState(
		key: StateSystemKey,
		sourceId: string,
		stateId?: StateId
	): boolean {
		if (stateId) {
			return this.RemoveSingleStaticState(key, sourceId, stateId);
		} else {
			// 移除该 sourceId 的所有状态
			const storage = StateData.unitStorage[key];
			if (!storage) return false;
			let removed = false;
			for (const [sid] of pairs(storage.static)) {
				if (this.RemoveSingleStaticState(key, sourceId, sid as StateId)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private RemoveSingleStaticState(
		key: StateSystemKey,
		sourceId: string,
		stateId: StateId
	): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const stateList = storage.static[stateKey];

		if (!stateList) return false;

		const index = stateList.findIndex(d => d.sourceId === sourceId);
		if (index !== -1) {
			const oldValue = this.GetStaticStateValue(key, stateKey);
			stateList.splice(index, 1);

			if (stateList.length === 0) {
				delete storage.static[stateKey];
				delete storage.cache[stateKey];
			} else {
				this.RecalculateStaticState(key, stateKey);
			}

			const newValue = this.GetStaticStateValue(key, stateKey);
			if (oldValue !== newValue) {
				Event.Fire('state_changed', {
					key,
					stateId: stateKey,
					oldValue,
					newValue
				});
			}

			this.MarkDirty(key, stateKey);

			return true;
		}

		return false;
	}

	/**
	 * 更新静态状态值
	 * @param key 目标键
	 * @param stateId 状态 ID
	 * @param sourceId 状态来源 ID
	 * @param newValue 新值
	 */
	UpdateStaticStateValue(
		key: StateSystemKey,
		stateId: StateId,
		sourceId: string,
		newValue: boolean
	): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const stateList = storage.static[stateKey];

		if (!stateList) return false;

		const data = stateList.find(d => d.sourceId === sourceId);
		if (data) {
			const oldValue = this.GetStaticStateValue(key, stateKey);
			data.value = newValue;
			this.RecalculateStaticState(key, stateKey);
			const finalValue = this.GetStaticStateValue(key, stateKey);
			if (oldValue !== finalValue) {
				Event.Fire('state_changed', {
					key,
					stateId: stateKey,
					oldValue,
					newValue: finalValue
				});
			}

			this.MarkDirty(key, stateKey);

			return true;
		}

		return false;
	}

	/** 获取静态状态值 */
	GetStaticStateValue(key: StateSystemKey, stateId: StateId): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const cachedEntry = storage.cache[stateKey];

		StateData.stats.totalReads++;
		if (cachedEntry !== undefined) {
			StateData.stats.cacheHits++;
			return cachedEntry.value;
		}

		return false;
	}

	private RecalculateStaticState(key: StateSystemKey, stateId: StateId): void {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const stateList = storage.static[stateKey];

		if (!stateList || stateList.length === 0) {
			delete storage.cache[stateKey];
			return;
		}

		// 按优先级排序（优先级数值越小越优先）
		const sortedList = [...stateList].sort((a, b) => {
			const priorityA = typeof a.priority === 'function' ? a.priority() : a.priority;
			const priorityB = typeof b.priority === 'function' ? b.priority() : b.priority;
			return priorityA - priorityB;
		});

		// 找到第一个值为 true 的项
		let result = false;
		for (const data of sortedList) {
			if (data.value === true) {
				result = true;
				break;
			}
		}

		storage.cache[stateKey] = {
			value: result,
			cachedAt: this.GetCurrentTime()
		};
	}

	// ==================== 动态状态 API ====================

	/**
	 * 注册动态状态
	 * @param key 目标键
	 * @param stateId 状态 ID
	 * @param sourceId 状态来源的唯一标识
	 * @param callback 回调函数（返回状态值）
	 * @param priority 优先级（静态数值或返回数值的函数）
	 * @param metadata 可选的元数据
	 */
	RegisterDynamicState(
		key: StateSystemKey,
		stateId: StateId,
		sourceId: string,
		callback: DynamicStateCallback,
		priority: StatePriority = 100,
		metadata?: Record<string, any>
	): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		let stateList = storage.dynamic[stateKey];

		if (!stateList) {
			stateList = [];
			storage.dynamic[stateKey] = stateList;
		}

		const existingIndex = stateList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有的
			stateList[existingIndex].callback = callback;
			stateList[existingIndex].priority = priority;
			stateList[existingIndex].metadata = metadata;
		} else {
			// 添加新的
			stateList.push({
				sourceId,
				callback,
				priority,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
		}

		const oldValue = this.GetDynamicStateValueInternal(key, stateKey);
		delete storage.cache[stateKey];
		const newValue = this.GetDynamicStateValueInternal(key, stateKey);

		// 发送状态变更事件
		if (oldValue !== newValue) {
			Event.Fire('state_changed', {
				key,
				stateId: stateKey,
				oldValue,
				newValue
			});
		}

		this.MarkDirty(key, stateKey);

		StateData.stats.totalWrites++;
		return true;
	}

	/**
	 * 注销动态状态
	 * @param key 目标键
	 * @param sourceId 状态来源 ID
	 * @param stateId 状态 ID（可选）
	 */
	UnregisterDynamicState(
		key: StateSystemKey,
		sourceId: string,
		stateId?: StateId
	): boolean {
		if (stateId) {
			return this.UnregisterSingleDynamicState(key, sourceId, stateId);
		} else {
			// 移除该 sourceId 的所有动态状态
			const storage = StateData.unitStorage[key];
			if (!storage) return false;
			let removed = false;
			for (const [sid] of pairs(storage.dynamic)) {
				if (this.UnregisterSingleDynamicState(key, sourceId, sid as StateId)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private UnregisterSingleDynamicState(
		key: StateSystemKey,
		sourceId: string,
		stateId: StateId
	): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const stateList = storage.dynamic[stateKey];

		if (!stateList) return false;

		const index = stateList.findIndex(d => d.sourceId === sourceId);
		if (index !== -1) {
			const oldValue = this.GetDynamicStateValueInternal(key, stateKey);
			stateList.splice(index, 1);

			if (stateList.length === 0) {
				delete storage.dynamic[stateKey];
			}

			delete storage.cache[stateKey];
			const newValue = this.GetDynamicStateValueInternal(key, stateKey);

			if (oldValue !== newValue) {
				Event.Fire('state_changed', {
					key,
					stateId: stateKey,
					oldValue,
					newValue
				});
			}

			this.MarkDirty(key, stateKey);

			return true;
		}

		return false;
	}

	/** 获取动态状态值（带缓存） */
	GetDynamicStateValue(key: StateSystemKey, stateId: StateId, params?: any): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);

		// 检查缓存
		const cached = storage.cache[stateKey];
		if (cached !== undefined) {
			StateData.stats.totalReads++;
			StateData.stats.cacheHits++;
			return cached.value;
		}

		// 计算新值
		const value = this.CalculateDynamicStateValue(key, stateKey, params);

		// 更新缓存
		storage.cache[stateKey] = {
			value,
			cachedAt: this.GetCurrentTime()
		};

		StateData.stats.totalReads++;
		return value;
	}

	/**
	 * 内部获取动态状态值（不触发副作用回调，用于系统同步）
	 * 直接返回缓存值，如果没有缓存则返回默认值
	 */
	private GetDynamicStateValueInternal(key: StateSystemKey, stateId: StateId): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const cached = storage.cache[stateKey];

		// 如果有缓存就返回缓存，否则返回默认值（不触发回调计算）
		return cached?.value ?? false;
	}

	private CalculateDynamicStateValue(key: StateSystemKey, stateId: StateId, params?: any): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const storage = this.GetStorage(key);
		const stateList = storage.dynamic[stateKey];

		if (!stateList || stateList.length === 0) {
			return false;
		}

		// 按优先级排序
		const sortedList = [...stateList].sort((a, b) => {
			const priorityA = typeof a.priority === 'function' ? a.priority() : a.priority;
			const priorityB = typeof b.priority === 'function' ? b.priority() : b.priority;
			return priorityA - priorityB;
		});

		// 找到第一个返回 true 的回调
		for (const data of sortedList) {
			try {
				if (data.callback(params) === true) {
					return true;
				}
			} catch (error) {
				this.print(`[Error] Dynamic state callback failed: ${stateKey} (${data.sourceId}): ${error}`);
			}
		}

		return false;
	}

	/** 清除动态状态缓存 */
	ClearDynamicStateCache(key: StateSystemKey, stateId?: StateId): void {
		const storage = this.GetStorage(key);

		if (stateId) {
			const stateKey = this.NormalizeStateId(stateId);
			delete storage.cache[stateKey];
		} else {
			storage.cache = {};
		}
	}

	// ==================== 通用状态值获取 ====================

	/** 获取状态值（静态 + 动态，优先级综合） */
	GetStateValue(key: StateSystemKey, stateId: StateId, params?: any): boolean {
		if (IsServer()) {
			const staticValue = this.GetStaticStateValue(key, stateId);
			const dynamicValue = this.GetDynamicStateValue(key, stateId, params);
			// 只要有一个为 true，状态就为 true
			return staticValue || dynamicValue;
		} else {
			// 客户端从网表获取
			return this.GetStateValueFromNetTable(key, stateId);
		}
	}

	/**
	 * 内部获取状态值（不触发副作用，用于系统同步）
	 * @internal
	 */
	private GetStateValueInternal(key: StateSystemKey, stateId: StateId): boolean {
		const staticValue = this.GetStaticStateValue(key, stateId);
		const dynamicValue = this.GetDynamicStateValueInternal(key, stateId);
		return staticValue || dynamicValue;
	}

	// ==================== 网表同步 ====================

	private InitializeNetTableSync(): void {
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, 'init', {
			version: 1,
			time: this.GetCurrentTime(),
		});

		Timer.GameTimer(this.SYNC_INTERVAL, () => {
			this.SyncDirtyStates();
			return this.SYNC_INTERVAL;
		});

		this.print('NetTable sync initialized');
	}

	private SyncDirtyStates(): void {
		let dirtyKeysCount = 0;
		for (const [_] of pairs(StateData.dirtyKeys)) { dirtyKeysCount++; }
		if (dirtyKeysCount === 0) return;

		const dirtyArray = Object.keys(StateData.dirtyKeys);

		// 按 key 分组（每个单位一个网表 key）
		const groupedByEntity: Record<string, string[]> = {};

		for (const dirtyKey of dirtyArray) {
			// dirtyKey 格式: "key|stateId"
			const parts = dirtyKey.split('|');
			const key = tonumber(parts[0]) as StateSystemKey;
			const entityKey = this.GetEntityKeyForNetTable(key);

			if (!groupedByEntity[entityKey]) {
				groupedByEntity[entityKey] = [];
			}
			groupedByEntity[entityKey].push(dirtyKey);
		}

		for (const [entityKey, keys] of pairs(groupedByEntity)) {
			this.SyncEntityBatch(entityKey as string, keys as string[]);
		}

		StateData.dirtyKeys = {};
		StateData.lastSyncTime = this.GetCurrentTime();
		StateData.stats.syncCount++;
	}

	/**
	 * 同步单个实体的状态（按网表文档建议：每个单位一个 key）
	 */
	private SyncEntityBatch(entityKey: string, dirtyKeys: string[]): void {
		const existingData = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);
		const update: Record<string, boolean> = existingData ? { ...existingData } : {};

		for (const dirtyKey of dirtyKeys) {
			const parts = dirtyKey.split('|');
			const key = tonumber(parts[0]) as StateSystemKey;
			const stateId = parts[1];

			// 使用内部方法获取值，不触发副作用
			const value = this.GetStateValueInternal(key, stateId);
			update[stateId] = value;
		}

		// 使用实体专属的 key（例如：unit_0）
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, update);
	}

	/** 从网表获取状态值（服务器和客户端都可用） */
	GetStateValueFromNetTable(key: StateSystemKey, stateId: StateId): boolean {
		const stateKey = this.NormalizeStateId(stateId);
		const entityKey = this.GetEntityKeyForNetTable(key);
		const data = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);

		if (data && data[stateKey] !== undefined) {
			return data[stateKey] as boolean;
		}

		return false;
	}

	/** 客户端：监听状态变化（使用定时器轮询） */
	ListenStateChange(
		key: StateSystemKey,
		stateId: StateId,
		callback: (oldValue: boolean | undefined, newValue: boolean | undefined) => void
	): void {
		if (IsServer()) {
			this.print('[Warning] ListenStateChange should only be used on client');
			return;
		}

		let lastValue = this.GetStateValueFromNetTable(key, stateId);

		Timer.GameTimer(0.1, () => {
			const newValue = this.GetStateValueFromNetTable(key, stateId);
			if (newValue !== lastValue) {
				callback(lastValue, newValue);
				lastValue = newValue;
			}
			return 0.1;
		});
	}

	// ==================== 清理系统 ====================

	/**
	 * 清理指定来源的所有状态
	 * @param key 目标键
	 * @param sourceId 来源 ID
	 */
	CleanupSourceStates(key: StateSystemKey, sourceId: string): void {
		// 清理静态状态
		this.RemoveStaticState(key, sourceId);

		// 清理动态状态
		this.UnregisterDynamicState(key, sourceId);
	}

	/** 清理单位的所有状态 */
	CleanupUnitStates(unit: CDOTA_BaseNPC): void {
		if (!unit) return;

		const entIndex = unit.GetEntityIndex();
		this.CleanupUnitStatesByIndex(entIndex);
	}
	/** 清理本局单位的状态与客户端快照，不影响地图常驻单位。 */
	CleanupUnitStatesByIndex(entIndex: EntityIndex): void {
		this.CleanupStorage(entIndex);
		const prefix = `${entIndex}|`;
		for (const key of Object.keys(StateData.dirtyKeys)) if (key.indexOf(prefix) === 0) delete StateData.dirtyKeys[key];
		if (IsServer()) CustomNetTables.SetTableValue(this.NETTABLE_NAME, this.GetEntityKeyForNetTable(entIndex), {});
	}

	private CleanupStorage(key: StateSystemKey): void {
		const storage = StateData.unitStorage[key];
		if (storage !== undefined) {
			delete StateData.unitStorage[key];
			this.print(`Cleaned up storage: Unit ${key}`);
		}
	}

	/** 清理空存储 */
	CleanupEmptyStorages(): number {
		let cleanedCount = 0;

		for (const [key, storage] of pairs(StateData.unitStorage)) {
			if (this.IsStorageEmpty(storage as StateStorage)) {
				delete StateData.unitStorage[key as EntityIndex];
				cleanedCount++;
			}
		}

		return cleanedCount;
	}

	private IsStorageEmpty(storage: StateStorage): boolean {
		let staticCount = 0;
		for (const [_] of pairs(storage.static)) { staticCount++; }
		let dynamicCount = 0;
		for (const [_] of pairs(storage.dynamic)) { dynamicCount++; }
		let cacheCount = 0;
		for (const [_] of pairs(storage.cache)) { cacheCount++; }
		return staticCount === 0 && dynamicCount === 0 && cacheCount === 0;
	}

	/** 启动自动清理 */
	private StartAutoCleanup(): void {
		Timer.GameTimer(this.autoCleanupInterval, () => {
			this.CleanupEmptyStorages();
			return this.autoCleanupInterval;
		});

		this.print(`Auto cleanup started (${this.autoCleanupInterval}s)`);
	}

	/** 重置系统 */
	private ResetSystem(): void {
		if (IsServer()) for (const key of CustomNetTables.GetAllTableKeys("state_system")) CustomNetTables.SetTableValue("state_system", key, {});
		StateData.unitStorage = {};
		StateData.dirtyKeys = {};
		StateData.stats = {
			totalReads: 0,
			cacheHits: 0,
			totalWrites: 0,
			syncCount: 0,
		};
	}

	// ==================== 调试命令 ====================

	private RegisterDebugCommands(): void {
		// 打印系统状态
		Convars.RegisterCommand('state_status', () => {
			this.PrintSystemStatus();
		}, 'Print state system status', 0);

		// 打印性能统计
		Convars.RegisterCommand('state_stats', () => {
			this.PrintPerformanceStats();
		}, 'Print performance statistics', 0);

		// 重置统计
		Convars.RegisterCommand('state_reset_stats', () => {
			StateData.stats = {
				totalReads: 0,
				cacheHits: 0,
				totalWrites: 0,
				syncCount: 0,
			};
			this.print('Statistics reset');
		}, 'Reset performance statistics', 0);

		// 列出所有状态
		Convars.RegisterCommand('state_list', () => {
			const stateSet: Record<string, true> = {};
			for (const [, storage] of pairs(StateData.unitStorage)) {
				for (const [sid] of pairs((storage as StateStorage).static)) {
					stateSet[String(sid)] = true;
				}
				for (const [sid] of pairs((storage as StateStorage).dynamic)) {
					stateSet[String(sid)] = true;
				}
			}

			this.print('=== Known States ===');
			for (const [sid] of pairs(stateSet)) {
				this.print(`${sid}`);
			}
		}, 'List all known states', 0);

		// 强制清理
		Convars.RegisterCommand('state_cleanup', () => {
			const count = this.CleanupEmptyStorages();
			this.print(`Cleaned up ${count} empty storages`);
		}, 'Force cleanup empty storages', 0);

		this.print('Debug commands registered');
	}

	private PrintSystemStatus(): void {
		let unitCount = 0;
		for (const [_] of pairs(StateData.unitStorage)) { unitCount++; }

		let dirtyKeysCount = 0;
		for (const [_] of pairs(StateData.dirtyKeys)) { dirtyKeysCount++; }

		this.print('=== State System Status ===');
		this.print(`Unit Storages: ${unitCount}`);
		this.print(`Dirty Keys: ${dirtyKeysCount}`);
		this.print(`Last Sync: ${StateData.lastSyncTime.toFixed(2)}s`);
	}

	private PrintPerformanceStats(): void {
		const stats = StateData.stats;
		const hitRate = stats.totalReads > 0
			? (stats.cacheHits / stats.totalReads * 100).toFixed(2)
			: '0.00';

		this.print('=== Performance Stats ===');
		this.print(`Total Reads: ${stats.totalReads}`);
		this.print(`Cache Hits: ${stats.cacheHits} (${hitRate}%)`);
		this.print(`Total Writes: ${stats.totalWrites}`);
		this.print(`Sync Count: ${stats.syncCount}`);
	}

	// ==================== 工具函数 ====================

	private GetStorage(key: StateSystemKey): StateStorage {
		let storage = StateData.unitStorage[key];
		if (!storage) {
			storage = {
				static: {},
				dynamic: {},
				cache: {},
			};
			StateData.unitStorage[key] = storage;
		}

		return storage;
	}

	/**
	 * 获取实体的上下文信息
	 * 辅助方法：根据实体获取 key
	 * @param entity 单位
	 * @returns key 或 undefined
	 */
	GetEntityContext(entity: CDOTA_BaseNPC): StateSystemKey | undefined {
		if (!entity || !IsValid(entity)) return undefined;

		// 作为单位
		if ((entity as CDOTA_BaseNPC).IsBaseNPC && (entity as CDOTA_BaseNPC).IsBaseNPC()) {
			return (entity as CDOTA_BaseNPC).GetEntityIndex();
		}

		return undefined;
	}

	private NormalizeStateId(stateId: StateId): string {
		return String(stateId);
	}

	private GetDirtyKey(key: StateSystemKey, stateId: StateId): string {
		// 使用 | 作为分隔符，避免与 stateId 中的 _ 冲突
		const stateKey = this.NormalizeStateId(stateId);
		return `${key}|${stateKey}`;
	}

	private MarkDirty(key: StateSystemKey, stateId: StateId): void {
		const dirtyKey = this.GetDirtyKey(key, stateId);
		StateData.dirtyKeys[dirtyKey] = true;
	}

	private GetEntityKeyForNetTable(key: StateSystemKey): string {
		return `unit_${key}`;
	}

	private GetCurrentTime(): number {
		return GameRules.GetGameTime();
	}

	/**
	 * 强制同步所有未同步的状态（用于测试/调试）
	 */
	ForceSyncAllDirty(): void {
		if (!IsServer()) return;

		let dirtyCount = 0;
		for (const [_] of pairs(StateData.dirtyKeys)) { dirtyCount++; }
		if (dirtyCount === 0) return;

		this.print(`[ForceSyncAllDirty] Syncing ${dirtyCount} dirty states...`);
		this.SyncDirtyStates();
		let remainingCount = 0;
		for (const [_] of pairs(StateData.dirtyKeys)) { remainingCount++; }
		this.print(`[ForceSyncAllDirty] Sync completed, remaining: ${remainingCount}`);
	}
}

// ==================== 导出 ====================

declare global {
	var StateSystem: MStateSystem;
	var StateData: StateSystemData;
}
StateSystem ??= new MStateSystem();
