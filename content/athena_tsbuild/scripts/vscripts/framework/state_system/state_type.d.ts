// ==================== 状态系统类型定义 ====================

/**
 * 状态 ID（推荐使用 StateEnum，也允许字符串）
 */
type StateId = StateEnum | string;

/**
 * 状态系统键（仅 EntityIndex）
 */
type StateSystemKey = EntityIndex;

/**
 * 优先级类型：可以是静态数值或动态函数
 */
type StatePriority = number | (() => number);

/**
 * 动态状态回调函数
 */
type DynamicStateCallback = (params?: any) => boolean | undefined;

/**
 * 静态状态数据（直接存储布尔值）
 */
interface StaticStateData {
	/** 同优先级按登记顺序决胜，刷新同一来源不改变顺序。 */
	registrationOrder: number;
	/** 状态来源的唯一标识（如 "item_sword", "ability_crit", "buff_root"） */
	sourceId: string;

	/** 状态值 */
	value: boolean;

	/** 优先级（可以是数值或函数） */
	priority: StatePriority;

	/** 添加时间 */
	addedTime: number;

	/** 可选的元数据 */
	metadata?: Record<string, any>;
}

/**
 * 动态状态数据（通过回调函数获取值）
 */
interface DynamicStateData {
	/** 与静态来源共享登记顺序。 */
	registrationOrder: number;
	/** 状态来源的唯一标识 */
	sourceId: string;

	/** 回调函数（返回状态值） */
	callback: DynamicStateCallback;

	/** 优先级（可以是数值或函数） */
	priority: StatePriority;

	/** 添加时间 */
	addedTime: number;

	/** 可选的元数据 */
	metadata?: Record<string, any>;
}

/**
 * 状态缓存数据
 */
interface StateCacheEntry {
	/** 缓存的值 */
	value: boolean;

	/** 缓存时间 */
	cachedAt: number;
}

/**
 * 状态存储（每个 entityIndex 一个）
 */
interface StateStorage {
	/** 静态状态存储：stateId -> StaticStateData[] */
	static: Partial<Record<string, StaticStateData[]>>;

	/** 动态状态存储：stateId -> DynamicStateData[] */
	dynamic: Partial<Record<string, DynamicStateData[]>>;

	/** 上次聚合快照，仅用于变更通知和同步，不用于跳过动态计算。 */
	cache: Partial<Record<string, StateCacheEntry>>;
}

/**
 * 状态变化事件数据
 */
interface StateChangeEventData {
	key: StateSystemKey;
	stateId: string;
	oldValue: boolean;
	newValue: boolean;
}

/**
 * 全局状态系统数据
 */
interface StateSystemData {
	/** 跨静态/动态来源的登记序号。 */
	nextRegistrationOrder?: number;
	/** 单位级别状态存储 */
	unitStorage: Partial<Record<EntityIndex, StateStorage>>;

	/** 脏标记（需要同步的状态） */
	dirtyKeys: Record<string, true>;

	/** 上次同步时间 */
	lastSyncTime: number;

	/** 性能统计 */
	stats: {
		totalReads: number;
		cacheHits: number;
		totalWrites: number;
		syncCount: number;
	};
}
