// VScripts 专用常量（不需要在 UI 端使用）
/**
const vec3_left = Vector(-1, 0, 0);
const vec3_right = Vector(1, 0, 0);
const vec3_top = Vector(0, 1, 0);
const vec3_bottom = Vector(0, -1, 0);
// @ts-ignore
const vec3_invalid = Vector(3.402823466e+38, 3.402823466e+38, 3.402823466e+38);

/**
 */
const AI_TIMER_TICK_TIME = 0.15; // AI的计时器间隔
/**暂停冷却 */
const CUSTOM_PAUSE_CD = 60;

/** 网格大小 */
const GRID_SIZE = 384;

const MINIMUM_ATTACK_SPEED = 20; // 最小攻击速度
const MAXIMUM_ATTACK_SPEED = 600; // 最大攻击速度

const BULLET_WIDTH = 32;	// 普通子弹宽度

const INTERACT_RADIUS = 200; // 交互范围半径

const HERO_MAX_LEVEL = 30; // 英雄最大等级
const HERO_XP_PER_LEVEL_TABLE: number[] = []; // 英雄升级经验表
for (let index = 0; index < 30; index++) {
	HERO_XP_PER_LEVEL_TABLE.push(75 * index + 50 * index * index);
}

/** 复活次数 */
const HERO_RESPAWN_COUNT = 0;
/** 酒馆商店物品Key */
const TAVERN_ITEMS = ["item_whisky", "item_beer", "item_rum", "item_tequila", "item_champagne", "item_gin", "item_wine"];

/** 最大祝福类型数量数量（不包括风） */
const MAX_BLESS_TYPE_COUNT = 3;
//祝福稀有度对应权重
const BLESS_RARITY_WEIGHT: Record<number, number> = {
	1: 60,  // 普通 - 构筑基石
	2: 25,  // 稀有 - 可靠强化
	3: 10,  // 史诗 - 惊喜提升
	4: 5,   // 英雄 - 顶级奖励
};
/** 稀有度价格表 */
const SHOP_RARITY_COST: Record<number, number> = {
	1: 50,
	2: 100,
	3: 150,
	4: 200,
	5: 250,
};

/** 套装经验 */
const SUIT_EXP: Record<number, number> = {
	1: 4,
	2: 8,
	3: 16,
	4: 32,
};
// 遗物稀有度对应权重
const ARTIFACT_RARITY_WEIGHT: Record<number, number> = {
	1: 60,  // 普通
	2: 25,  // 稀有
	3: 10,  // 史诗
	4: 5,   // 传说
	5: 1,   // 英雄
};
/** %基础背刺伤害 */
const BASE_BACKSTAB_DAMAGE = 25;
/** 陷阱伤害系数，生命百分比 */
const TRAP_DAMAGE_FACTOR = 0.2;

/** 伤害/防御强度 百分比 */
const INTENSITY_FACTOR = 0.1;

/** 钥匙每点强度提供的怪物生命额外乘区 */
const DIFFICULTY_KEY_HEALTH_FACTOR_PER_INTENSITY = 0.052;
/** 钥匙每点强度提供的怪物攻击额外乘区 */
const DIFFICULTY_KEY_DAMAGE_FACTOR_PER_INTENSITY = 0.005;

// 技能冷却缩减
const COOLDOWN_REDUCTION_RATE = 0.005;  // 每点冷却缩减属性的基础转换率
const COOLDOWN_REDUCTION_CAP = 0.8;     // 冷却缩减上限（80%）

/** 难度对应的Boss冷却缩减（负值=增加冷却时间），key为难度等级 */
const DIFFICULTY_COOLDOWN_REDUCTION: Record<number, number> = {
	1: -60,
	2: -50,
	3: -40,
	4: -30,
	5: -20,
	6: -10,
};
/** 难度对应的Boss技能间隔增幅，key为难度等级 */
const DIFFICULTY_BOSS_GAP_AMPLIFY: Record<number, number> = {
	1: 80,
	2: 60,
	3: 45,
	4: 30,
	5: 15,
	6: 5,
};
/** 难度对应的陷阱伤害 */
const DIFFICULTY_TRAP_DAMAGE_REDUCTION: Record<number, number> = {
	1: -90,
	2: -80,
	3: -70,
	4: -60,
	5: -40,
	6: -20,
};

/** 触电伤害百分比 */
const EXPOSE_DAMAGE_PCT = 25;
/** 飞剑伤害 */
const SWORD_DAMAGE = 24;
/** 剑意每层提升 */
const SWORD_INTENT_PCT_PER_STACK = 20;
/** 剑意最大层数 */
const SWORD_INTENT_MAX_STACK = 5;
/** 护盾每秒衰减比例 */
const SHIELD_DECAY_RATE = 30;
/** 护盾每秒衰减最低值，生命上限系数 */
const SHIELD_DECAY_MIN = 0.05;
/** 护盾衰减间隔（秒） */
const SHIELD_DECAY_INTERVAL = 1.0;
/** 中毒每秒衰减比例 */
const POISON_DECAY_RATE = 30;
/** 中毒衰减间隔（秒） */
const POISON_DECAY_INTERVAL = 1.0;
/** 冰冻每秒衰减比例 */
const FROZEN_DECAY_RATE = 30;
/** 冰冻衰减间隔（秒） */
const FROZEN_DECAY_INTERVAL = 2.0;
/** 冰冻增伤曲线最大值（%） */
const FROZEN_DAMAGE_AMPLIFY_MAX = 30;
/** 冰冻增伤达到一半收益时的层数 */
const FROZEN_DAMAGE_AMPLIFY_HALF_STACK = 50;
/** 毒瓶最大数量 */
const POISON_BOTTLE_MAX_COUNT = 5;
/** 虚弱减少伤害 */
const WEAK_REDUCE_DAMAGE_PCT = 1;
/** 虚弱最大层数 */
const WEAK_MAX_STACK = 25;
/** 虚弱最大层数 */
const WEAK_DURATION = 5;
/** 斩杀线最大生命值% */
const EXECUTE_THRESHOLD_MAX_HEALTH = 20;
/** 流血基础伤害次数 */
const BLEED_DAMAGE_COUNT = 2;
/** 流血基础伤害间隔 */
const BLEED_DAMAGE_INTERVAL = 1;
/** 流血移动额外伤害距离阈值 */
const BLEED_MOVE_DAMAGE_DISTANCE_THRESHOLD = 100;
/** 流血移动额外伤害内置冷却 */
const BLEED_MOVE_DAMAGE_COOLDOWN = 0.25;
/** 流血移动额外伤害百分比 */
const BLEED_MOVE_DAMAGE_PCT = 40;
/** 反击冷却 */
const COUNTER_CD = 0.3;
/** 暴击飞剑冷却 */
const CRIT_CALL_BLADE_CD = 0.3;
/** 健康血量 */
const HEALTHY_PCT = 80;
/** 残血血量 */
const LOW_HEALTH_PCT = 20;
/** 近距离 */
const CLOSE_RANGE = 250;
/** 远距离 */
const FAR_RANGE = 850;
/** 激光长度 */
const LASER_LENGTH = 600;
/** 激光宽度 */
const LASER_WIDTH = 100;
/** 天罚伤害 */
const PUNISHMENT_DAMAGE = 30;
/** 洗礼 */
const PURIFY_DAMAGE = 48;
/** 洗礼范围 */
const PURIFY_RADIUS = 300;
/** 霜冻印记伤害 */
const ICE_MARK_DAMAGE = 24;


/** 许愿池每次消耗 */
const WISHING_POOL_COST = 10;
/** 商店刷新基础消耗 */
const SHOP_REFRESH_BASE_COST = 50;
/** 商店刷新每次递增消耗 */
const SHOP_REFRESH_COST_INCREMENT = 10;
/** 祝福选择放弃获得金币 */
const BLESS_GIVEUP_REWARD = 10;
/** 祝福选择放弃获得金币稀有度 */
const BLESS_GIVEUP_RARITY_REWARD = 5;

/** 默认键盘按键设置 */
const DEFAULT_KEYBOARD_BINDINGS: Partial<Record<KeyFunction, string>> = {
	[KeyFunction.Up]: "W",
	[KeyFunction.Down]: "S",
	[KeyFunction.Left]: "A",
	[KeyFunction.Right]: "D",
	[KeyFunction.Skill]: "MOUSE1",
	[KeyFunction.Dodge]: "SPACE",
	[KeyFunction.Defense]: "SHIFT",
	[KeyFunction.Ultimate]: "R",
	[KeyFunction.Attack]: "MOUSE0",
	[KeyFunction.Interact]: "E",
	[KeyFunction.Attribute]: "`",
	[KeyFunction.Upgrade]: "Q"
};
/** Mode2 (左键移动) 默认键位 */
const DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK: Partial<Record<KeyFunction, string>> = {
	...DEFAULT_KEYBOARD_BINDINGS,
	[KeyFunction.Skill]: "Q",
	[KeyFunction.Dodge]: "W",
	[KeyFunction.Defense]: "E",
	[KeyFunction.Ultimate]: "R",
	[KeyFunction.Attack]: "MOUSE1",
	[KeyFunction.Interact]: "F"
};
/** Mode3 (右键移动) 默认键位 */
const DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK: Partial<Record<KeyFunction, string>> = {
	...DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK,
	[KeyFunction.Attack]: "MOUSE0"
};
const MOVE_MODE_KEYBOARD = "keyboard";
const MOVE_MODE_LEFT_CLICK = "left_click";
const MOVE_MODE_RIGHT_CLICK = "right_click";
const DEFAULT_MOVE_MODE = MOVE_MODE_RIGHT_CLICK;
const MOVE_MODE_DEFAULTS: Record<string, Partial<Record<KeyFunction, string>>> = {
	[MOVE_MODE_KEYBOARD]: DEFAULT_KEYBOARD_BINDINGS,
	[MOVE_MODE_LEFT_CLICK]: DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK,
	[MOVE_MODE_RIGHT_CLICK]: DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK,
};
/** 点击移动子模式 */
const CLICK_MOVE_MODE_CLICK = "click";
const CLICK_MOVE_MODE_HOLD = "hold";
const CLICK_MOVE_MODE_FOLLOW = "follow";
const DEFAULT_CLICK_MOVE_MODE = CLICK_MOVE_MODE_HOLD;
const DEFAULT_CAMERA_FOLLOW_MODE = "free";
/**
 * joy5:		左肩键
 * joy6:		右肩键
 * joy7:		切换键
 * joy8:		菜单键
 * joy9:		左摇杆按下
 * joy10:		右摇杆按下
 * joy1:		A键(下)
 * joy2:		B键(右)
 * joy4:		Y键(上)
 * joy3:		X键(左)
 * z_axis_pos:	左扳机
 * y_axis_pos:	右扳机
 * pov_left:	十字方向键 - 左
 * pov_right:	十字方向键 - 右
 * pov_up:		十字方向键 - 上
 * pov_down:	十字方向键 - 下
 * x_axis_neg:	左摇杆 - 左
 * x_axis_pos:	左摇杆 - 右
 * y_axis_neg:	左摇杆 - 上
 * y_axis_pos:	左摇杆 - 下
 * r_axis_neg:	右摇杆 - 左
 * r_axis_pos:	右摇杆 - 右
 * u_axis_neg:	右摇杆 - 上
 * u_axis_pos:	右摇杆 - 下
 */
// 默认手柄按键设置（用于在UI侧解析 key -> KeyFunction）
const DEFAULT_GAMEPAD_BINDINGS: Partial<Record<KeyFunction, string>> = {
	[KeyFunction.Up]: "y_axis_neg",
	[KeyFunction.Down]: "y_axis_pos",
	[KeyFunction.Left]: "x_axis_neg",
	[KeyFunction.Right]: "x_axis_pos",
	[KeyFunction.Skill]: "v_axis_pos",
	[KeyFunction.Dodge]: "joy1",
	[KeyFunction.Defense]: "joy4",
	[KeyFunction.Ultimate]: "joy2",
	[KeyFunction.Attack]: "joy3",
	[KeyFunction.Interact]: "joy5",
	[KeyFunction.Upgrade]: "joy7",
	[KeyFunction.OptionUp]: "pov_up",
	[KeyFunction.OptionDown]: "pov_down",
	[KeyFunction.OptionConfirm]: "joy10",
	[KeyFunction.ToggleAutoCast]: "joy9",
};

/** 任务类型枚举（前端更新的任务类型，event_id=24） */
enum SERVICE_TASK_TYPE {
	/**陷阱清除所有怪 */
	TrapClearEnemy = 1,
	/**手动成功钓鱼 */
	Fishing = 2,
	/**单局游戏激活所有祝福 */
	ActivateAllBlessings = 3,
	/**击杀怪物 param_s1怪物ID */
	KillEnemy = 4,
	/**酒馆购买道具 param_2道具:1威士忌:2啤酒:3朗姆酒:4龙舌兰*/
	ShopItemPurchase = 5,
	/**拾取道具，param_2 (param_2道具:1属性书:2神杖祝福:3金币袋:4在许愿池花费金币许愿*/
	AddItem = 6,
	/**玩家死亡 */
	Die = 7,
}

/** 深渊玩法配置 */
const ABYSS_CONFIG = {
	/** 基础 */
	base: {
		/** 通关地牢难度解锁模式 */
		NeedDungeonDiff: 5,
		/** 玩法限时 */
		timeLimit: 600,
		/** 初始怪物数量 */
		initialEnemyCount: 10,
		/** 闪怪生命值百分比 */
		flashEnemyHealthPct: 400,
		/** 闪怪攻击力百分比 */
		flashEnemyAttackPct: 30,
		/** 闪怪模型缩放 */
		flashEnemyModelScale: 100,
		/** 自动拾取范围 */
		autoPickupRadius: 200,
	},
	/** 刷怪 */
	spawn: {
		/** 最大同时存在的敌人数量 */
		maxAliveEnemyCount: 60,
		/** 与玩家的最小距离 */
		minDistanceFromPlayer: 10,
	},
	/** 事件 */
	event: {
		/** 初始触发次数 */
		initialTriggerCount: 20,
		/** 每次增加的触发次数 */
		triggerCountIncrease: 5,
		/** 最大触发次数 */
		maxTriggerCount: 60,
	},
	/** 击杀 */
	kill: {
		/** 击杀敌人基础分数 */
		baseScore: 1,
	},
	/** UI */
	ui: {
		/** 吞噬解锁难度：深渊难度 */
		devourUnlock: 1,
	}
};

/** 连击系统配置 */
const COMBO_CONFIG = {
	/** 初始倍率、默认倍率 */
	initialMultiplier: 1,
	/** 最低倍率 */
	minMultiplier: 1,
	/** 最高倍率 */
	maxMultiplier: 10,
	/** 每次增加倍率的次数 */
	multiplierIncreaseEveryCount: 4,
	/** 每次增加的倍率值 */
	multiplierIncreaseValue: 0.1,
	/** 每次减少的倍率值 */
	multiplierDecreaseValue: 0.1,
	/** 倍率衰减倒计时 */
	comboCountdownDuration: 10,
	/** 分数取整模式 */
	scoreRoundingMode: "floor",
};

/** Boss挑战时间 */
const BOSS_MAX_TIME = 300;
/** Boss缩圈初始范围 */
const BOSS_SHRINK_START_RADIUS = 3000;
/** Boss缩圈每秒减少范围 */
const BOSS_SHRINK_RADIUS_PER_SECOND = 60;
/** Boss缩圈百分比伤害 */
const BOSS_SHRINK_OUTSIDE_DAMAGE_PCT = 5;
/** Boss缩圈伤害tick */
const BOSS_SHRINK_TICK_INTERVAL = 1;

/** 最大难度 */
const MAX_DIFFICULTY = 15;

/**最大装备数量 */
const EQUIP_MAX_COUNT = 400;

/** 商店物品数量 */
const SHOP_ITEM_COUNT = 5;
