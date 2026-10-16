//********************************************************************************
// 编辑 polyfill/enums.ts 或 framework/enums.ts 自动同步
//********************************************************************************

enum StateEnum {
	/** 默认都是没有血条的，但是会在modifier_common中加入该值，防止出生或者销毁瞬间血条闪烁 */
	HEALTH_BAR,
	/** 优先级比HEALTH_BAR高 */
	NO_HEALTH_BAR,
	/** 禁用AI */
	AI_DISABLED,
	/** 无法控制 */
	UNCONTROLLABLE,
	/** 闪避弹道 */
	DODGE_BULLET,
	/** TODO:闪避陷阱 */
	DODGE_TRAP,
	/** 破坏物 */
	BREAKABLE,
	/** 无法暴击 */
	NO_CRIT,
	/** 晕眩免疫 */
	STUN_IMMUNE,
	/** 击退免疫 */
	KNOCKBACK_IMMUNE,
	/** 攻击免疫 */
	ATTACK_IMMUNE,
	/** 致盲 */
	BLIND,
	/** 迷雾免疫 */
	SMOKE_IMMUNE,
	/** 雅典娜：目标免疫物理/魔法暴击，与攻击者 NO_CRIT 区分。 */
	CRITICAL_IMMUNE,
	/** 雅典娜：禁止创建该攻击者的普通攻击弹道。 */
	ATTACK_PROJECTILE_DISABLED,
	/** 雅典娜预留：冲锋无效，待冲锋玩法接入。 */
	DASH_DISABLE,
	/** 雅典娜预留：传送无效，待公共传送入口接入。 */
	TELEPORT_DISABLE,
	/** 雅典娜：自定义恐惧标记，AI 同时尊重此状态和引擎 IsFeared。 */
	FEAR,
}

/** 支付类型 */
enum PayType {
	MONEY = 0,
	MOON = 100001,
	STAR = 100002,
	SHARD = 100003,
	COIN = 110001,
}

/** 玩家登录状态 */
enum PlayerLoginState {
	None,
	Success, // 登录成功
	NoPermission, // 无许可证
	Banned, // 封禁
	Failed, // 登录失败
	NeedAuth // 本地主机需要密码认证
}

/** 伤害状态 */
enum EOM_DAMAGE_FLAGS {
	NONE = 0,
	/** 暴击 */
	CRIT = 1 << 0,
	/** 不触发暴击 */
	NO_CRIT = 1 << 1,
	/** 持续伤害 */
	DOT = 1 << 2,
	/** TODO:m不会受到来源者的伤害增强 */
	NO_SOURCE_AMPLIFY = 1 << 3,
	/** TODO:不会受到伤害增强，包含来源伤害增强 */
	NO_DAMAGE_AMPLIFY = 1 << 4,
	/** TODO:被转化后的伤害 */
	CONVERTED_DAMAGE = 1 << 5,
	/** TODO:召唤伤害 */
	SUMMONED_DAMAGE = 1 << 6,
	/** TODO:无输出伤害调整 */
	NO_OUTGOING_ADJUST = 1 << 7,
	/** TODO:无承受伤害调整 */
	NO_INCOMING_ADJUST = 1 << 8,
	/** 无视护盾 */
	IGNORE_BARRIER = 1 << 9,
	/** TODO:无视躲避伤害，包括免死效果 */
	IGNORE_VOID_DAMAGE = 1 << 10,
	/** 反击伤害 */
	RETALIATED_DAMAGE = 1 << 11,
	/** 流血伤害 */
	BLEEDING_DAMAGE = 1 << 12,
	/** 中毒伤害 */
	POISON_DAMAGE = 1 << 13,
	/** 燃烧伤害 */
	BURNING_DAMAGE = 1 << 14,
	/** 特殊标记 */
	SPECIAL_MARK = 1 << 15,
	/** 环绕物标记 */
	RING_DAMAGE = 1 << 16,
	/** 飞剑标记 */
	SWORD = 1 << 17,
	/** 没有怒气回复 */
	NO_MANA_REGEN = 1 << 18,
	/** 雷电伤害 */
	LIGHTNING_DAMAGE = 1 << 19,
	/** 冰冻伤害 */
	FREEZE_DAMAGE = 1 << 20,
	/** 盾击伤害 */
	SHIELD_DAMAGE = 1 << 21,
	/** 反弹伤害 */
	REFLECT_DAMAGE = 1 << 22,
	/** 散射伤害 */
	SPLIT_DAMAGE = 1 << 23,
	/** 剑气伤害 */
	BLADE = 1 << 24,
	/** 陷阱伤害 */
	TRAP = 1 << 25,
	/** 背刺伤害 */
	Backstab = 1 << 26,
	/** 不触发触电效果 */
	NO_EXPOSE = 1 << 27,
	/** 生命消耗等伤害禁止吸血。 */
	NO_LIFESTEAL = 1 << 28,
}

/** 攻击状态 */
enum ATTACK_STATES {
	NONE = 0,
	/** 不触发攻击法球 */
	NOT_USECASTATTACKORB = 1 << 1,
	/** 不触发攻击特效 */
	NOT_PROCESSPROCS = 1 << 2,
	/** 无视攻击间隔 */
	SKIPCOOLDOWN = 1 << 3,
	/** 不触发破影一击 */
	IGNOREINVIS = 1 << 4,
	/** 没有攻击弹道 */
	NOT_USEPROJECTILE = 1 << 5,
	/** 假攻击 */
	FAKEATTACK = 1 << 6,
	/** 攻击不会丢失 */
	NEVERMISS = 1 << 7,
	/** 没有分裂攻击 */
	NO_CLEAVE = 1 << 8,
	/** 无额外攻击 */
	NO_EXTENDATTACK = 1 << 9,
	/** 不减少各种攻击计数 */
	SKIPCOUNTING = 1 << 10,
	/** 攻击暴击，攻击流程中会自动插入，Attack调用时不能填 */
	CRIT = 1 << 11,
	/** 不计算格挡 */
	BYPASSES_BLOCK = 1 << 12,
	/** 反击 */
	RETALIATION = 1 << 13,
}

/** 添加 Modifier 标记 */
enum AddModifierFlag {
	IGNORE_DEATH = 1 << 0, // 无视死亡
}

/** AI 搜索行为 */
enum AI_SEARCH_BEHAVIOR {
	AI_SEARCH_BEHAVIOR_NONE,
	AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET,
	AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET,
}

/** 属性类型 */
enum EOMModifierPropertyType {
	NONE, // 无，挂载在单位身上的属性
	PLAYER, // 玩家属性，挂载在单位所属玩家上的属性
	TEAM, // 队伍属性，挂载在单位所属队伍上的属性
	TEAM_HERO, // 队伍英雄属性，挂载在单位所属队伍中所有英雄上的属性
}

enum BULLET_TYPE {
	CUSTOM,
	LINEAR,
	TRACKING,
	SURROUND,
	GUIDED,
	RING,
}

enum KeyFunction {
	Up = "up",
	Down = "down",
	Left = "left",
	Right = "right",
	Skill = "skill",
	Dodge = "dodge",
	Defense = "defense",
	Ultimate = "ultimate",
	Attack = "attack",
	Interact = "interact",
	Attribute = "attribute",
	Upgrade = "upgrade",
	OptionUp = "OptionUp",
	OptionDown = "OptionDown",
	OptionConfirm = "OptionConfirm",
	ToggleAutoCast = "ToggleAutoCast",
}

/** 装饰品类型 */
enum COSMETIC_TYPE {
	BORDER = "BORDER",
	TITLE = "TITLE",
	HEAD = "HEAD",
	SHOULDER = "SHOULDER",
	BACK = "BACK",
	TAIL = "TAIL",
	WING = "WING",
	FOOTPRINT_EFFECT = "FOOTPRINT_EFFECT",
	AURA_EFFECT = "AURA_EFFECT",
	ATTACK_EFFECT = "ATTACK_EFFECT",
	SPECIAL_SKILL_EFFECT = "SPECIAL_SKILL_EFFECT",
	DASH_SKILL_EFFECT = "DASH_SKILL_EFFECT",
	DEFENSE_SKILL_EFFECT = "DEFENSE_SKILL_EFFECT",
	ULTIMATE_SKILL_EFFECT = "ULTIMATE_SKILL_EFFECT",
	MISC = "MISC",
}
enum COSMETIC_SLOT {
	HEAD = 1,
	SHOULDER,
	BACK,
	TAIL,
	WING,
	FOOTPRINT_EFFECT,
	AURA_EFFECT,
	ATTACK_EFFECT,
	SPECIAL_SKILL_EFFECT,
	DASH_SKILL_EFFECT,
	DEFENSE_SKILL_EFFECT,
	ULTIMATE_SKILL_EFFECT,
	MISC,
	BORDER,
	TITLE,
}

/** 地牢房间类型 */
enum DungeonRoomType {
	Combat = "Combat",
	Reward = "Reward",
	Shop = "Shop",
	MiniBoss = "MiniBoss",
	Boss = "Boss"
}

/** 地牢区域（4大关） */
enum DungeonZone {
	Zone1 = 1,
	Zone2 = 2,
	Zone3 = 3,
	Zone4 = 4
}

/** 升级稀有度 */
enum UpgradeRarity {
	Common = "Common",
	Rare = "Rare",
	Epic = "Epic",
	Legendary = "Legendary"
}

/** 房间尺寸类型 */
enum RoomSizeType {
	Small = "Small",
	Medium = "Medium",
	Large = "Large",
	XLarge = "XLarge"
}

/** 敌人生成模式 */
enum SpawnPattern {
	Circle = "Circle",		// 环形分布
	Line = "Line",			// 直线排列
	Random = "Random"		// 随机分散
}

/** 可交互物类型 */
enum InteractType {
	Portal = "Portal",				// 传送门
	Faith = "Faith",				// 信仰
	Chest = "Chest",				// 宝箱
	NPC = "NPC",					// NPC对话
	Outpost = "Outpost",			// 哨塔
	Pool = "Pool",					// 许愿池
	Smithy = "Smithy",				// 铁匠铺
	ShopItem = "ShopItem",			// 商品
	Consumables = "Consumables",	// 消耗品
	DropItem = "DropItem",			// 掉落物
	Fishing = "Fishing",			// 钓鱼
	RegenWell = "RegenWell",		// 回复水井
	Book = "Book",					// 贤者之书
	Mirror = "Mirror",				// 镜子（更换英雄）
	Refresh = "Refresh",			// 刷新商品
	BossChest = "BossChest",		// Boss宝箱
	CourierExplore = "CourierExplore",	// 信使探险
	Arena = "Arena",				// 竞技场
	Meepo = "Meepo",				// 游商
	Abyssal = "Abyssal",				// 深渊入口
}

enum RoomType {
	/** 无效 */
	INVALID,
	/** 开始房间 */
	STARTING,
	/** 主线的怪物房间 */
	ENEMY,
	/** 商店房间 */
	SHOP,
	/** 酒馆 */
	TAVERN,
	/** BOSS房间 */
	BOSS,
	/** 特殊房间 */
	SPECIAL,
	/** 休息（恢复生命） */
	REST,
	/** 楼梯房（通往下一区域） */
	STAIR,
	/** Mini-boss房 */
	MINI_BOSS,
	/** 精英房（增强敌人） */
	ELITE,
}

enum RoomState {
	ROOM_STATE_INVALID = 0,		// 无效
	ROOM_STATE_HIDE = 1,		// 隐藏状态
	ROOM_STATE_ACTIVE = 2,		// 激活状态
	ROOM_STATE_USED = 3,		// 使用过
}

/** 房间奖励类型（哈迪斯风格） */
enum RoomRewardType {
	NONE = 0,				// 无奖励
	HERO_UPGRADE = 1,		// 武器强化（锤子）
	BOON = 2,				// 神恩（祝福）
	POM = 3,				// Pom（属性提升）
	GOLD = 4,				// 金币
	SHOP = 5,				// 商店
	WISH_POOL = 6,				// 许愿池
	DOUBLE_BOON = 7,			// 双倍祝福
	TREASURE = 8,				// 宝箱 
}
/** 技能标签 */
enum AbilityTag {
	/** 无 */
	None,
	/** 攻击 */
	Attack,
	/** 技能 */
	Skill,
	/** 闪避 */
	Dodge,
	/** 防御 */
	Defense,
	/** 大招 */
	Ultimate,
	/** 交互 */
	Interact,
}

/** 临时阻挡区域类型 */
enum TEMPORARY_BLOCK_TYPE {
	CIRCLE = 1,		/** 圆形区域 */
	POLYGON = 2,	/** 多边形区域 */
}

enum DOTA_UNIT_TARGET_TYPE {
	UNIT_AND_BUILDING = DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_OTHER,
}
