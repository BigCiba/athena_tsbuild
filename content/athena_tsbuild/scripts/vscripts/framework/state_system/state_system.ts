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


	/** 注册来源时分配顺序；同优先级后登记者优先，刷新已有来源不改变顺序。 */
	private NextRegistrationOrder(): number {
		StateData.nextRegistrationOrder = (StateData.nextRegistrationOrder ?? 0) + 1;
		return StateData.nextRegistrationOrder;
	}
	/** 静态与动态来源使用同一套优先级：数值越大越优先，明确 false 也能胜出。 */
	private ResolveStateValue(key: StateSystemKey, stateId: StateId, kind: "static" | "dynamic" | "both", params?: any): boolean {
		const stateKey = this.NormalizeStateId(stateId), storage = StateData.unitStorage[key];
		if (!storage) return false;
		const sources: (StaticStateData | DynamicStateData)[] = [];
		if (kind !== "dynamic") sources.push(...(storage.static[stateKey] ?? []));
		if (kind !== "static") sources.push(...(storage.dynamic[stateKey] ?? []));
		const ranked = sources.map(data => {
			let priority = 0;
			try {
				const value = typeof data.priority === "function" ? data.priority() : data.priority;
				if (typeof value === "number" && value === value) priority = value;
			} catch (error) { this.print("State priority failed", stateKey, data.sourceId, error); }
			return { data, priority };
		});
		ranked.sort((a, b) => {
			if (a.priority !== b.priority) return b.priority - a.priority;
			return (b.data.registrationOrder ?? 0) - (a.data.registrationOrder ?? 0);
		});
		for (const { data } of ranked) {
			try {
				const value = "callback" in data ? data.callback(params) : data.value;
				// undefined 表示此来源当前不声明该状态，继续查询下一优先级。
				if (typeof value === "boolean") return value;
			} catch (error) { this.print("State callback failed", stateKey, data.sourceId, error); }
		}
		return false;
	}
	/** cache 只保留上次聚合结果供事件与同步比较，绝不阻止动态回调重新执行。 */
	private RefreshResolvedValue(key: StateSystemKey, stateId: StateId): boolean {
		const stateKey = this.NormalizeStateId(stateId), storage = StateData.unitStorage[key];
		if (!storage) return false;
		const previous = storage.cache[stateKey];
		if (!previous && !storage.static[stateKey] && !storage.dynamic[stateKey]) return false;
		const value = this.ResolveStateValue(key, stateKey, "both");
		storage.cache[stateKey] = { value, cachedAt: this.GetCurrentTime() };
		if (!previous || previous.value !== value) this.MarkDirty(key, stateKey);
		// 先更新快照再发事件，监听器再次查询时不会重复触发同一个变化。
		if ((previous?.value ?? false) !== value) Event.Fire("state_changed", {
			key, stateId: stateKey, oldValue: previous?.value ?? false, newValue: value,
		});
		return value;
	}
	/** 原子替换一个来源的完整声明；先提交所有状态，再发布最终值，跨类型保留登记顺序。 */
	ReplaceSourceStates(key: StateSystemKey, sourceId: string, staticStates: Partial<Record<StateId, boolean>>,
		dynamicStates: Partial<Record<StateId, DynamicStateCallback>>, priority: StatePriority = 0): void {
		if (!IsServer()) return;
		const ids = new Set([...Object.keys(staticStates), ...Object.keys(dynamicStates)]);
		const previous = StateData.unitStorage[key];
		if (previous) for (const layer of [previous.static, previous.dynamic]) {
			for (const id of Object.keys(layer)) if (layer[id]!.some(data => data.sourceId === sourceId)) ids.add(id);
		}
		if (ids.size === 0) return;
		const storage = this.GetStorage(key);
		for (const id of ids) {
			const oldStatic = storage.static[id]?.find(data => data.sourceId === sourceId);
			const oldDynamic = storage.dynamic[id]?.find(data => data.sourceId === sourceId);
			const statics = (storage.static[id] ?? []).filter(data => data.sourceId !== sourceId);
			const dynamics = (storage.dynamic[id] ?? []).filter(data => data.sourceId !== sourceId);
			const value = staticStates[id], callback = dynamicStates[id];
			// 新来源的两层同时声明时仍沿用创建顺序：动态先登记，静态后登记。
			if (callback !== undefined) dynamics.push({ sourceId, callback, priority,
				registrationOrder: oldDynamic?.registrationOrder ?? (value === undefined ? oldStatic?.registrationOrder : undefined) ?? this.NextRegistrationOrder(),
				addedTime: oldDynamic?.addedTime ?? oldStatic?.addedTime ?? this.GetCurrentTime(), metadata: oldDynamic?.metadata,
			});
			if (value !== undefined) statics.push({ sourceId, value, priority,
				registrationOrder: oldStatic?.registrationOrder ?? (callback === undefined ? oldDynamic?.registrationOrder : undefined) ?? this.NextRegistrationOrder(),
				addedTime: oldStatic?.addedTime ?? oldDynamic?.addedTime ?? this.GetCurrentTime(), metadata: oldStatic?.metadata,
			});
			if (statics.length > 0) storage.static[id] = statics; else delete storage.static[id];
			if (dynamics.length > 0) storage.dynamic[id] = dynamics; else delete storage.dynamic[id];
			StateData.stats.totalWrites++;
		}
		for (const id of ids) { this.MarkDirty(key, id); this.RefreshResolvedValue(key, id); }
	}

	/** 添加或刷新静态状态；只覆盖指定来源，保留其登记顺序。 */
	AddStaticState(key: StateSystemKey, stateId: StateId, sourceId: string, value: boolean, priority: StatePriority = 0, metadata?: Record<string, any>): boolean {
		if (!IsServer()) return false;
		const stateKey = this.NormalizeStateId(stateId), storage = this.GetStorage(key);
		const list = storage.static[stateKey] ??= [];
		const existing = list.find(data => data.sourceId === sourceId);
		if (existing) { existing.value = value; existing.priority = priority; existing.metadata = metadata; }
		else list.push({ sourceId, value, priority, metadata, addedTime: this.GetCurrentTime(), registrationOrder: this.NextRegistrationOrder() });
		StateData.stats.totalWrites++;
		this.RefreshResolvedValue(key, stateKey);
		return true;
	}
	/** 移除来源的一个或全部静态状态，0 是有效的状态编号。 */
	RemoveStaticState(key: StateSystemKey, sourceId: string, stateId?: StateId): boolean {
		if (!IsServer()) return false;
		const storage = StateData.unitStorage[key];
		if (!storage) return false;
		const ids = stateId !== undefined ? [this.NormalizeStateId(stateId)] : Object.keys(storage.static);
		let removed = false;
		for (const id of ids) {
			const list = storage.static[id];
			const remaining = list?.filter(data => data.sourceId !== sourceId);
			if (!list || remaining!.length === list.length) continue;
			if (remaining!.length > 0) storage.static[id] = remaining; else delete storage.static[id];
			removed = true; this.MarkDirty(key, id); this.RefreshResolvedValue(key, id);
		}
		return removed;
	}
	/** 修改已有静态来源，不改变其优先级和登记顺序。 */
	UpdateStaticStateValue(key: StateSystemKey, stateId: StateId, sourceId: string, newValue: boolean): boolean {
		if (!IsServer()) return false;
		const data = StateData.unitStorage[key]?.static[this.NormalizeStateId(stateId)]?.find(value => value.sourceId === sourceId);
		if (!data) return false;
		data.value = newValue; StateData.stats.totalWrites++;
		this.RefreshResolvedValue(key, stateId); return true;
	}
	/** 仅查询静态层；不与动态层共用读取缓存。 */
	GetStaticStateValue(key: StateSystemKey, stateId: StateId): boolean {
		StateData.stats.totalReads++;
		return this.ResolveStateValue(key, stateId, "static");
	}
	/** 注册动态来源。回调返回 false 是明确声明，返回 undefined 才是让出优先级。 */
	RegisterDynamicState(key: StateSystemKey, stateId: StateId, sourceId: string, callback: DynamicStateCallback, priority: StatePriority = 0, metadata?: Record<string, any>): boolean {
		if (!IsServer()) return false;
		const stateKey = this.NormalizeStateId(stateId), storage = this.GetStorage(key);
		const list = storage.dynamic[stateKey] ??= [];
		const existing = list.find(data => data.sourceId === sourceId);
		if (existing) { existing.callback = callback; existing.priority = priority; existing.metadata = metadata; }
		else list.push({ sourceId, callback, priority, metadata, addedTime: this.GetCurrentTime(), registrationOrder: this.NextRegistrationOrder() });
		StateData.stats.totalWrites++;
		this.RefreshResolvedValue(key, stateKey);
		return true;
	}
	/** 移除来源的一个或全部动态状态。 */
	UnregisterDynamicState(key: StateSystemKey, sourceId: string, stateId?: StateId): boolean {
		if (!IsServer()) return false;
		const storage = StateData.unitStorage[key];
		if (!storage) return false;
		const ids = stateId !== undefined ? [this.NormalizeStateId(stateId)] : Object.keys(storage.dynamic);
		let removed = false;
		for (const id of ids) {
			const list = storage.dynamic[id];
			const remaining = list?.filter(data => data.sourceId !== sourceId);
			if (!list || remaining!.length === list.length) continue;
			if (remaining!.length > 0) storage.dynamic[id] = remaining; else delete storage.dynamic[id];
			removed = true; this.MarkDirty(key, id); this.RefreshResolvedValue(key, id);
		}
		return removed;
	}
	/** 仅查询动态层，每次执行最新条件，不污染默认聚合快照。 */
	GetDynamicStateValue(key: StateSystemKey, stateId: StateId, params?: any): boolean {
		StateData.stats.totalReads++;
		return this.ResolveStateValue(key, stateId, "dynamic", params);
	}
	/** 兼容旧调用方的主动刷新入口；不丢失上次结果和来源信息。 */
	ClearDynamicStateCache(key: StateSystemKey, stateId?: StateId): void {
		if (!IsServer()) return;
		const storage = StateData.unitStorage[key];
		if (!storage) return;
		const ids = stateId !== undefined ? [this.NormalizeStateId(stateId)] : Object.keys(storage.dynamic);
		for (const id of ids) this.RefreshResolvedValue(key, id);
	}
	/** 服务端实时聚合，客户端读取服务器快照；带上下文的查询不覆盖默认同步值。 */
	GetStateValue(key: StateSystemKey, stateId: StateId, params?: any): boolean {
		StateData.stats.totalReads++;
		if (!IsServer()) return this.GetStateValueFromNetTable(key, stateId);
		return params === undefined ? this.RefreshResolvedValue(key, stateId) : this.ResolveStateValue(key, stateId, "both", params);
	}
	/** 同步前轮询动态条件与动态优先级，不依赖玩法先查询状态。 */
	private RefreshLiveStates(): void {
		for (const key of Object.keys(StateData.unitStorage)) {
			const index = Number(key) as EntityIndex, storage = StateData.unitStorage[index]!;
			const ids = new Set(Object.keys(storage.dynamic));
			for (const id of Object.keys(storage.static)) if (storage.static[id]!.some(data => typeof data.priority === "function")) ids.add(id);
			for (const id of ids) this.RefreshResolvedValue(index, id);
		}
	}
	private InitializeNetTableSync(): void {
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, "init", { version: 2, time: this.GetCurrentTime() });
		Timer.GameTimer(this.SYNC_INTERVAL, () => { this.SyncDirtyStates(); return this.SYNC_INTERVAL; });
	}
	private SyncDirtyStates(): void {
		this.RefreshLiveStates();
		const dirtyArray = Object.keys(StateData.dirtyKeys);
		if (dirtyArray.length === 0) return;
		const groups: Record<string, string[]> = {};
		// 只消费本轮快照，发布过程中产生的新脏标记留到下一轮。
		for (const dirtyKey of dirtyArray) {
			delete StateData.dirtyKeys[dirtyKey];
			const entityKey = this.GetEntityKeyForNetTable(Number(dirtyKey.split("|")[0]) as EntityIndex);
			(groups[entityKey] ??= []).push(dirtyKey);
		}
		for (const [entityKey, keys] of pairs(groups)) this.SyncEntityBatch(entityKey, keys);
		StateData.lastSyncTime = this.GetCurrentTime(); StateData.stats.syncCount++;
	}
	/** 每个实体一份完整快照；相同值不重复写网表，移除来源明确发布 false。 */
	private SyncEntityBatch(entityKey: string, dirtyKeys: string[]): void {
		const existing = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);
		const update: Record<string, boolean> = existing ? { ...existing } : {};
		let changed = false;
		for (const dirtyKey of dirtyKeys) {
			const [key, stateId] = dirtyKey.split("|"), storage = StateData.unitStorage[Number(key) as EntityIndex];
			if (!storage) continue;
			const value = storage.cache[stateId]?.value ?? false;
			if (update[stateId] !== value) { update[stateId] = value; changed = true; }
			if (!storage.static[stateId] && !storage.dynamic[stateId]) delete storage.cache[stateId];
		}
		if (changed) CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, update);
	}
	/** 服务器和客户端共用的网表读取。 */
	GetStateValueFromNetTable(key: StateSystemKey, stateId: StateId): boolean {
		return CustomNetTables.GetTableValue(this.NETTABLE_NAME, this.GetEntityKeyForNetTable(key))?.[this.NormalizeStateId(stateId)] === true;
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
		if (!IsServer()) return;
		const storage = StateData.unitStorage[key];
		if (!storage) return;
		const ids = new Set([...Object.keys(storage.static), ...Object.keys(storage.dynamic)]);
		for (const id of ids) {
			let changed = false;
			for (const layer of [storage.static, storage.dynamic]) {
				const list = layer[id];
				if (!list) continue;
				const remaining = list.filter(data => data.sourceId !== sourceId);
				if (list.length === remaining.length) continue;
				if (remaining.length === 0) delete layer[id]; else layer[id] = remaining as any;
				changed = true;
			}
			// 同一个来源的两层一起释放，只通知最终状态，避免中途闪烁。
			if (changed) { this.MarkDirty(key, id); this.RefreshResolvedValue(key, id); }
		}
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
		// 即使没有显式脏标记，也要检查动态条件变化。

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
