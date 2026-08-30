// Auto-generated TypeScript definitions for Configure files
//
// 注意：
// 1. 所有配置的类型定义都在这个文件中
// 2. service/ 目录下的 KV 文件是从 Excel 生成的，仅用于服务端
//    前端直接使用 Excel→JS 的配置（configure/ 目录）
// 3. game/c1/scripts/npc/service/ 目录不参与前端 KV→JS 转换
// 4. kv.d.ts 只包含游戏引擎原生 KV 的类型定义
//
declare global {
	interface Activity_boardslotRow {
		/** 活动ID */
		activity_id: number;
		/** 随机宝箱最大刷新数量 */
		box_num: number;
		/** 随机宝箱道具内容 */
		box_reward: string;
		/** 掷骰道具 */
		ticket_id: number;
	}

	type Activity_boardslot = Record<string, Activity_boardslotRow>;

	interface Activity_boardslot_rewardRow {
		/** 自增id */
		id: number;
		/** 活动id */
		activity_id: number;
		/** 格子id */
		slot_id: number;
		/** 格子类型 */
		slot_type: number;
		/** 描述 */
		description: string;
		/** 触发类型 1经过 2停留 */
		trigger_type: number;
		/** 事件 */
		event: Record<string, number>;
		/** 奖励id */
		reward_id: string;
		/** 奖励数量随等级 */
		reward_num: string;
		/** 升级所需经验 */
		levelup_exp: string;
	}

	type Activity_boardslot_reward = Record<string, Activity_boardslot_rewardRow>;

	interface Activity_dataRow {
		/** 活动ID */
		activity_id: number;
		/** 活动类型:1签到活动2星海宝藏3成长基金4猪猪存钱罐5赛龙舟7初航庆典8奇遇巡游9累充活动10永恒矿脉 */
		type: number;
		/** 活动开放时间 */
		start_time: number;
		/** 结束时间 */
		end_time: number;
		/** 是否显示 */
		show: number;
		/** 显示类型 */
		combine_tag: string;
		/** 排序 */
		sort: number;
		/** 仅工具模式 */
		in_tool: number;
		/** 游戏内名字 */
		name: string;
		/** 模板 */
		template: string;
		/** 活动备注 */
		description: string;
		/** 右上角展示的货币 */
		tokens: string;
		/** json配置 */
		config: string;
	}

	type Activity_data = Record<string, Activity_dataRow>;

	interface Activity_football_starRow {
		/** 自增ID */
		id: number;
		/** 活动ID */
		activity_id: number;
		/** 名次 */
		rank: number;
		/** 奖励：道具id;num|道具id:num */
		rewards: string;
	}

	type Activity_football_star = Record<string, Activity_football_starRow>;

	interface Activity_growth_fundRow {
		/** 活动ID */
		activity_id: number;
		/** 进度类型 */
		progress_type: string;
		/** 付费道具ID */
		product_id: number;
	}

	type Activity_growth_fund = Record<string, Activity_growth_fundRow>;

	interface Activity_growth_fund_rewardsRow {
		/** 自增ID */
		id: number;
		/** 活动ID */
		activity_id: number;
		/** 顺序 */
		reward_id: number;
		/** 节点进度 */
		num: number;
		/** 奖励：道具id;num|道具id:num */
		rewards: string;
		/** 是否高级 */
		plus: number;
	}

	type Activity_growth_fund_rewards = Record<string, Activity_growth_fund_rewardsRow>;

	interface Activity_loginRow {
		/** 活动ID */
		activity_id: string;
		/** 天数 */
		day: string;
		/** 奖励：道具id:num */
		rewards: string;
	}

	type Activity_login = Record<string, Activity_loginRow>;

	interface Activity_miningRow {
		/** 自增 */
		id: number;
		/** 活动ID */
		activity_id: number;
		/** 镐子id */
		pickaxe_id: number;
		/** 钻头id */
		bit_id: number;
		/** 炸药id */
		explosive_id: number;
		/** 指定刷新层数 */
		reload_num: number;
		/** 模板组 */
		template_id: string;
		/** 初始层模板ID */
		default_template: number;
		/** 随机宝箱奖励内容 */
		box_reward: string;
		/** 宝箱概率(千分比) */
		box_config: number;
		/** 代币道具ID|代币产出基础数量 */
		coin_config: string;
		/** 代币概率(千分比) */
		coin_num: number;
		/** 泥土|石头耐久 */
		durability: string;
	}

	type Activity_mining = Record<string, Activity_miningRow>;

	interface Activity_mining_nodeRow {
		/** 流水 */
		id: number;
		/** 活动ID */
		activity_id: number;
		/** 深度 */
		depth_num: number;
		/** 奖励 */
		reward: string;
		/** 代币倍率(百分比) */
		coin_rate: number;
	}

	type Activity_mining_node = Record<string, Activity_mining_nodeRow>;

	interface Activity_mining_templateRow {
		/** 自增id */
		id: number;
		/** 模板权重 */
		template_weight: number;
		/** 类型(1：隔层；2：刷新层) */
		type: number;
		/** 模板构成 */
		tamplate_layout: string;
		/** 备注 */
		desc: string;
	}

	type Activity_mining_template = Record<string, Activity_mining_templateRow>;

	interface Activity_moonstoneRow {
		/** 活动ID */
		activity_id: number;
		/** 奖励顺序 */
		reward_id: number;
		/** 累积月石数额，默认为循环奖励 */
		num: number;
		/** 奖励：道具id;num */
		rewards: object;
	}

	type Activity_moonstone = Record<string, Activity_moonstoneRow>;

	interface Activity_saving_potRow {
		/** 活动ID */
		activity_id: number;
		/** 刷新类型 1终身2日3周4月 */
		flush_type: number;
		/** 房间掉落概率 */
		drop_rule: Record<string, number>;
		/** mvp额外掉落 */
		mvp_extra: number;
		/** 每日进度上限 */
		daily_limit: number;
		/** 总进度 */
		progress: number;
		/** 免费奖励 */
		free_reward: Record<string, number>;
		/** 付费奖励 */
		plus_reward: Record<string, number>;
		/** 解锁高级奖励物品id */
		plus_item: number;
		/** 解锁高级奖励物品id */
		plus_goods: number;
	}

	type Activity_saving_pot = Record<string, Activity_saving_potRow>;

	interface Activity_starseaRow {
		/** 自增ID */
		id: number;
		/** 活动ID */
		activity_id: number;
		/** 奖励顺序 */
		reward_id: number;
		/** 商城商品ID */
		product_id: number;
		/** 奖励：道具id:num */
		rewards: Record<string, number>;
		/** 稀有度 */
		rarity: number;
		/** 是否展示 */
		show: number;
		/** 备注 */
		beizhu: string;
	}

	type Activity_starsea = Record<string, Activity_starseaRow>;

	interface Info_item_blessingRow {
		/** 道具唯一ID */
		id: number;
		/** 道具名备注 */
		name: string;
		/** 备注效果 */
		effect: string;
		/** 属性:value| */
		attribute: Record<string, number>;
		/** 特权ID|特权ID */
		blessing_effect: string;
		/** 是否隐藏 */
		hide: number;
	}

	type Info_item_blessing = Record<string, Info_item_blessingRow>;

	interface Bp_level_expRow {
		/** 自增ID */
		id: string;
		/** 等级 */
		level: string;
		/** 经验 */
		exp: number;
		/** 赛季ID */
		season: string;
	}

	type Bp_level_exp = Record<string, Bp_level_expRow>;

	interface Bp_rewardsRow {
		/** 自增ID */
		id: string;
		/** 赛季ID */
		season: string;
		/** 等级 */
		level: number;
		/** 是否高级通行证 */
		plus: number;
		/** 道具ID：数量 */
		rewards: string;
		/** 品质（白0绿1蓝2紫3金4红5） */
		values: number;
		/** 备注 */
		beizhu: string;
	}

	type Bp_rewards = Record<string, Bp_rewardsRow>;

	interface Bp_seasonRow {
		/** 赛季ID */
		sid: number;
		/** 开始时间 */
		start_time: number;
		/** 结束时间 */
		end_time: number;
		/** 最大等级 */
		max_level: number;
		/** 赛季经验ID */
		exp: number;
		/** 高级战令item_id */
		plus_item_id: number;
		/** 高级战令商品id */
		plus_goods_id: number;
		/** 战令经验商品id */
		exp_goods_id: number;
		/** 开始时间 */
		read_start_time: string;
		/** 结束时间 */
		read_end_time: string;
	}

	type Bp_season = Record<string, Bp_seasonRow>;

	interface CollectionRow {
		/** 道具唯一ID */
		id: number;
		/** 道具名备注 */
		name: string;
		/** 稀有度 */
		rarity: number;
		/** 类型 */
		type: string;
		/** 属性:value| */
		attribute: Record<string, number>;
		/** 特权ID|特权ID(满级时生效) */
		privilege_effect: string;
		/** 是否隐藏(1隐藏0不隐藏 */
		hide: number;
		model: string;
		/** 只在沙滩上移动 */
		ground: string;
		/** 重量最小值 */
		weight_min: number;
		/** 重量最大值 */
		weight_max: number;
		/** 长度最小值 */
		length_min: number;
		/** 长度最大值 */
		length_max: number;
	}

	type Collection = Record<string, CollectionRow>;

	interface Collection_essenceRow {
		/** 自增ID */
		id: number;
		/** 道具ID */
		item_id: number;
		/** 道具名备注 */
		name: string;
		/** 精粹等级 */
		essence_lv: number;
		/** 属性:value| */
		attribute: Record<string, number>;
		/** 特权ID|特权ID */
		privilege_effect: string;
		/** 升级消耗 */
		level_cost: number;
	}

	type Collection_essence = Record<string, Collection_essenceRow>;

	interface Collection_level_upRow {
		/** 自增id */
		id: number;
		/** 类型 */
		type: string;
		/** 藏品品质 */
		rarity: number;
		/** 等级 */
		level: number;
		/** 升级消耗个数 */
		level_cost: number;
	}

	type Collection_level_up = Record<string, Collection_level_upRow>;

	interface Collection_treasureRow {
		/** 自增ID */
		id: number;
		/** 珍宝ID */
		item_id: string;
		/** 珍宝名称 */
		name: string;
		/** 珍宝等级 */
		treasure_lv: string;
		/** 属性:value|属性:value */
		attribute: Record<string, number>;
		/** 特权ID|特权ID */
		effect: string;
		/** 经验值id:经验值数量 */
		treasure_level_exp: Record<number, number>;
		/** 升级消耗 */
		level_cost: number;
	}

	type Collection_treasure = Record<string, Collection_treasureRow>;

	interface Collection_treasure_level_rewardRow {
		/** 等级 */
		level: number;
		/** 升级所需经验id：num */
		level_cost: number;
		/** 等级奖励itemid:num */
		reward: Record<string, number>;
	}

	type Collection_treasure_level_reward = Record<string, Collection_treasure_level_rewardRow>;

	interface Default_itemRow {
		/** 自增id */
		id: number;
		/** 初始物品id */
		item_id: number;
		/** 物品数量 */
		item_num: number;
	}

	type Default_item = Record<string, Default_itemRow>;

	interface Game_settingRow {
		/** 相关功能键值 */
		key: string;
		value: string;
	}

	type Game_setting = Record<string, Game_settingRow>;

	interface Recharge_rewardsRow {
		/** 自增id */
		id: number;
		/** 充值累计（RMB */
		recharge_num: number;
		/** 奖励 */
		rewards: string;
	}

	type Recharge_rewards = Record<string, Recharge_rewardsRow>;

	interface TransformationRow {
		/** 转化目标ID */
		id: number;
		/** 备注 */
		beizhu: string;
		/** 转化后ID */
		transformation: string;
	}

	type Transformation = Record<string, TransformationRow>;

	interface VersionRow {
		/** 递增 */
		major: number;
	}

	type Version = Record<string, VersionRow>;

	interface Service_courierRow {
		/** 信使id */
		id: number;
		/** 信使名 */
		name: string;
		/** 是否默认解锁信使 */
		unlock: number;
		/** 工具模式 */
		in_tool: string;
		/** 道具品质白1绿2蓝3紫4橙5 */
		quality: number;
		/** 分类出战1帕鲁2 */
		category: number;
		/** 抽卡界面大小 */
		draw_scale: number;
		/** 出战技能 */
		active_skill: string;
		/** 钓鱼1星技能 */
		fish_skill1: string;
		/** 钓鱼2星技能 */
		fish_skill2: string;
		/** 钓鱼3星技能 */
		fish_skill3: string;
		/** 钓鱼4星技能 */
		fish_skill4: string;
		/** 钓鱼5星技能 */
		fish_skill5: string;
		/** 钓鱼6星技能 */
		fish_skill6: string;
		/** 探险1星技能 */
		explore_skill1: string;
		/** 探险2星技能 */
		explore_skill2: string;
		/** 探险3星技能 */
		explore_skill3: string;
		/** 探险4星技能 */
		explore_skill4: string;
		/** 探险5星技能 */
		explore_skill5: string;
		/** 探险6星技能 */
		explore_skill6: string;
		/** 星级效果1 */
		star_effect1: Record<string, number>;
		/** 星级效果2 */
		star_effect2: Record<string, number>;
		/** 星级效果3 */
		star_effect3: Record<string, number>;
		/** 星级效果4 */
		star_effect4: Record<string, number>;
		/** 星级效果5 */
		star_effect5: Record<string, number>;
		/** 星级效果6 */
		star_effect6: Record<string, number>;
		/** 1星特权 */
		star_privilege1: string;
		/** 2星特权 */
		star_privilege2: string;
		/** 3星特权 */
		star_privilege3: string;
		/** 4星特权 */
		star_privilege4: string;
		/** 5星特权 */
		star_privilege5: string;
		/** 6星特权 */
		star_privilege6: string;
	}

	type Service_courier = Record<string, Service_courierRow>;

	interface DrawcardsRow {
		/** 卡池ID */
		id: number;
		/** 名字 */
		name: string;
		/** 显示排序 */
		order: number;
		/** 卡池类型 */
		type: string;
		/** 开放时间 */
		open_time: number;
		/** 结束时间，配置0表示永久 */
		end_time: number;
		/** 卡池时效 */
		duration_type: number;
		/** 抽卡券ID */
		item: number;
		/** 抽卡券商品ID */
		store_id: number;
		/** 单抽价格 */
		one_num: number;
		/** 十连抽价格 */
		ten_num: number;
		/** SSR稀有度掉落权重 */
		drop_q5: number;
		/** SR稀有度掉落权重 */
		drop_q4: number;
		/** R稀有度掉落权重 */
		drop_q3: number;
		/** N稀有度掉落权重 */
		drop_q2: number;
		/** 幸运值上限，必定获得 */
		q5_must: number;
		/** 自选SSR，掉落概率，百分比 */
		lucky_choose: number;
		/** N抽必出SR开关 */
		q4_must: number;
		/** 抽卡界面是否展示 */
		show: number;
		/** 是否显示红点 */
		red_point: number;
		/** 是否可自选 */
		choose: number;
		/** 兑换商场tag */
		store_tag: string;
		/** 继承卡池幸运值 */
		inheritance_lucky: number;
	}

	type Drawcards = Record<string, DrawcardsRow>;

	interface Drawcards_pondRow {
		/** 自增id */
		id: number;
		/** 卡池ID */
		pond_id: number;
		/** 掉落品质 */
		drop_rarity: number;
		/** 道具 */
		drop_id: number;
		/** 数量 */
		drop_num_min: number;
		/** 数量 */
		drop_num_max: number;
		/** 权重 */
		drop_weight: number;
	}

	type Drawcards_pond = Record<string, Drawcards_pondRow[]>;

	interface Equipment_suit_effectRow {
		/** 套装id */
		id: string;
		/** 2件套键值 */
		lv2: string;
		/** 4件套 */
		lv4: string;
		/** 6件套 */
		lv6: string;
		/** 套装技能图标 */
		suit_icon: string;
	}

	type Equipment_suit_effect = Record<string, Equipment_suit_effectRow>;

	interface Equip_break_level_expRow {
		/** 分解等级 */
		level: number;
		/** 分解经验 */
		exp: number;
		/** 等级效果（需要累加） */
		effect: string;
	}

	type Equip_break_level_exp = Record<string, Equip_break_level_expRow>;

	interface Equip_class_settingRow {
		/** 装备阶级 */
		equip_class: number;
		/** 穿戴所需等级 */
		need_level: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 副词条成长系数 */
		adverb_bonus: number;
		/** 副词条权重（1-9|10-19|20-29|30-39|40-49|50-59|60-69|70-79|80-89|90-99|100） */
		adverb_weight: string;
		/** 副词条洗练权重 */
		refine_weight: string;
		/** 升品的最大稀有度 */
		rarity_upgrade_max: number;
		/** 是够可以进阶 */
		ischange: number;
		/** 消耗 */
		consume: string;
	}

	type Equip_class_setting = Record<string, Equip_class_settingRow>;

	interface Equip_common_settingRow {
		/** 相关功能键值 */
		key: string;
		value: string;
	}

	type Equip_common_setting = Record<string, Equip_common_settingRow>;

	interface Equip_entryRow {
		/** 自增id */
		id: number;
		/** 词条类型 */
		entry_type: number;
		/** 词条属性键值 */
		entry_name: string;
		/** 词条数值最小值 */
		value_min: number;
		/** 词条数值最小值 */
		value_max: number;
		/** 小数位数 */
		ratio: number;
	}

	type Equip_entry = Record<string, Equip_entryRow>;

	interface Equip_entry_main_poolRow {
		/** 自增id */
		id: number;
		/** 装备部位 */
		equip_part: number;
		/** 词条id */
		entry_id: string;
	}

	type Equip_entry_main_pool = Record<string, Equip_entry_main_poolRow>;

	interface Equip_forge_settingRow {
		/** 打造类型 */
		type: string;
		/** 不消耗潜能值的概率 */
		no_cost_chance: number;
		/** 潜能值消耗最小值 */
		potential_cost_min: number;
		/** 潜能值消耗最大值 */
		potential_cost_max: number;
		/** 材料消耗 */
		consume: string;
	}

	type Equip_forge_setting = Record<string, Equip_forge_settingRow>;

	interface Equip_level_settingRow {
		/** 强化等级 */
		level: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 副词条成长系数 */
		adverb_bonus: number;
		/** 消耗 */
		consume: string;
	}

	type Equip_level_setting = Record<string, Equip_level_settingRow>;

	interface Equip_punchRow {
		/** 自增ID */
		id: number;
		/** 装备阶级 */
		class: number;
		/** 装备稀有度 */
		rarity: number;
		/** 打孔数量 */
		punch_num: number;
		/** 打孔消耗 */
		cost: string;
	}

	type Equip_punch = Record<string, Equip_punchRow>;

	interface Equip_rarity_settingRow {
		/** 装备稀有度 */
		rarity: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 主词条数量 */
		main_num: number;
		/** 副词条数量 */
		adverb_num: number;
		/** 技能数量 */
		ability_num: number;
		/** 神话词条数量 */
		myth_num: number;
		/** 混沌词条数量 */
		chaos_num: number;
		/** 装备潜能值最小值 */
		potential_num_min: number;
		/** 装备潜能值最大值 */
		potential_num_max: number;
		/** 开放升品 */
		rarity_upgrade: number;
		/** 开放词条重铸 */
		entry_recast: number;
		/** 开放词条洗练 */
		entry_refine: number;
		/** 分解奖励 */
		break_bonus: string;
	}

	type Equip_rarity_setting = Record<string, Equip_rarity_settingRow>;

	interface Gem_class_settingRow {
		/** 宝石阶级 */
		gem_class: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 副词条成长系数 */
		adverb_bonus: number;
	}

	type Gem_class_setting = Record<string, Gem_class_settingRow>;

	interface Gem_entryRow {
		/** 自增id */
		id: number;
		/** 词条池id */
		pool_id: number;
		/** 词条id */
		entry_id: string;
		/** 词条名 */
		name: string;
		/** 词条权重 */
		weight: number;
		/** 最小值 */
		min: number;
		/** 最大值 */
		max: number;
		/** 小数位数 */
		ratio: number;
	}

	type Gem_entry = Record<string, Gem_entryRow>;

	interface Gem_levelRow {
		/** 自增ID */
		id: number;
		/** 宝石稀有度 */
		rarity: number;
		/** 强化等级 */
		level: number;
		/** 主词条系数 */
		main_mul: number;
		/** 新增词条概率 */
		entry_probability: number;
		/** 强化消耗 */
		consume: string;
		/** 分解获得 */
		decompose: string;
	}

	type Gem_level = Record<string, Gem_levelRow>;

	interface Gem_settingRow {
		/** 设定键值 */
		key: string;
		/** 数值 */
		value: string;
	}

	type Gem_setting = Record<string, Gem_settingRow>;

	interface Info_item_equipmentRow {
		/** 装备id */
		id: number;
		/** 装备阶级 */
		class: number;
		/** 装备部位 */
		equip_part: number;
		/** 装备稀有度 */
		rarity: number;
		/** 装备iconid */
		icon: number;
	}

	type Info_item_equipment = Record<string, Info_item_equipmentRow>;

	interface Info_item_gemRow {
		/** 宝石id */
		id: number;
		/** 宝石阶级 */
		class: number;
		/** 宝石稀有度 */
		rarity: number;
		/** 主词条池 */
		main_entry_pool: number;
		/** 副词条池 */
		adverb_entry_pool: number;
		/** 精制消耗 */
		make_cost: string;
		/** 精制产出副词条数量:权重| */
		make_adverb_num: string;
		/** 掉落产出副词条数量:权重| */
		drop_adverb_num: string;
		/** 宝石图标 */
		icon: number;
	}

	type Info_item_gem = Record<string, Info_item_gemRow>;

	interface Drawing_class_settingRow {
		/** 图纸阶级 */
		drawing_class: number;
		/** 主词条数量 */
		main_num: number;
		/** 副词条数量 */
		adverb_num: string;
		/** 副词条成长系数 */
		adverb_bonus: number;
		/** 打造图纸消耗 */
		drawing_cost: Record<string, number>;
		/** 副词条权重（1-9|10-19|20-29|30-39|40-49|50-59|60-69|70-79|80-89|90-99|100） */
		adverb_weight: string;
	}

	type Drawing_class_setting = Record<string, Drawing_class_settingRow>;

	interface Drawing_entryRow {
		/** 自增id */
		id: number;
		/** 词条属性键值 */
		entry_name: string;
		/** 词条数值最小值 */
		value_min: number;
		/** 词条数值最小值 */
		value_max: number;
		/** 小数位数 */
		ratio: number;
		/** 最大掉落阶级（小于或等于该阶级才会掉落），不填为空就代表全阶级掉落 */
		class_max: number;
	}

	type Drawing_entry = Record<string, Drawing_entryRow>;

	interface Drawing_entry_mainRow {
		/** 词条属性键值 */
		entry_main_name: string;
		/** 词条属性类型 */
		entry_main_type: string;
		/** 权重 */
		weight: number;
		/** 效果参数1 */
		value_1: number;
		/** 效果参数2 */
		value_2: number;
		/** 打造参数 */
		select: string;
	}

	type Drawing_entry_main = Record<string, Drawing_entry_mainRow>;

	interface Info_item_drawingRow {
		/** 图纸id */
		id: number;
		/** 图纸阶级 */
		class: number;
		/** 图纸部位 */
		drawing_part: number;
		/** 图纸稀有度 */
		rarity: number;
		/** 图纸iconid */
		icon: number;
	}

	type Info_item_drawing = Record<string, Info_item_drawingRow>;

	interface Info_item_keyRow {
		/** 钥匙id */
		id: number;
		/** 钥匙阶级 */
		class: number;
		/** 钥匙稀有度 */
		rarity: number;
		/** 钥匙iconid */
		icon: number;
	}

	type Info_item_key = Record<string, Info_item_keyRow>;

	interface Key_class_settingRow {
		/** 钥匙阶级 */
		key_class: number;
		/** 强度成长系数 */
		intensity_bonus: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 主词条权重（1-9|10-19|20-29|30-39|40-49|50-59|60-69|70-79|80-89|90-99|100） */
		main_weight: string;
	}

	type Key_class_setting = Record<string, Key_class_settingRow>;

	interface Key_diff_settingRow {
		/** 难度（未配置的难度则无法放入钥匙） */
		diff: number;
		/** 最大钥匙阶数（小于该阶的钥匙才能放入） */
		class_max: number;
	}

	type Key_diff_setting = Record<string, Key_diff_settingRow>;

	interface Key_entryRow {
		/** 自增id */
		id: number;
		/** 词条类型 */
		entry_type: number;
		/** 词条属性键值 */
		entry_name: string;
		/** 词条数值最小值 */
		value_min: number;
		/** 词条数值最小值 */
		value_max: number;
		/** 小数位数 */
		ratio: number;
	}

	type Key_entry = Record<string, Key_entryRow>;

	interface Key_level_settingRow {
		/** 强化等级 */
		level: number;
		/** 强度成长系数 */
		intensity_bonus: number;
		/** 主词条成长系数 */
		main_bonus: number;
	}

	type Key_level_setting = Record<string, Key_level_settingRow>;

	interface Key_rarity_settingRow {
		/** 钥匙稀有度 */
		rarity: number;
		/** 耐久度 */
		durability: Record<string, number>;
		/** 钥匙强度 */
		intensity: number;
		/** 主词条数量（正向收益） */
		main_num: number;
		/** 副词条数量（负面惩罚） */
		adverb_num: number;
		/** 副词条随机点数:点数_权重 */
		adverb_points: Record<string, number>;
		/** 吞噬提供的经验 */
		devour_exp: number;
		/** 最大吞噬强化等级 */
		level_max: number;
		/** 吞噬强化所需经验,等级:所需经验 */
		level_exp: Record<string, number>;
	}

	type Key_rarity_setting = Record<string, Key_rarity_settingRow>;

	interface Engraving_class_settingRow {
		/** 刻印阶级 */
		engraving_class: number;
		/** 副词条权重（1-9|10-19|20-29|30-39|40-49|50-59|60-69|70-79|80-89|90-99|100） */
		adverb_weight: string;
	}

	type Engraving_class_setting = Record<string, Engraving_class_settingRow>;

	interface Engraving_dropRow {
		/** 难度 */
		difficulty: number;
		/** 刻印基础掉落数量（数量:权重） */
		base_drop: string;
		/** 每10分数额外掉落概率%（注:加成的概率超过100%必1，概率2） */
		extra_drop: number;
		/** 最高加成多少概率（超过这个概率后的积分不在增加额外的掉落率，但排行榜正常统计积分） */
		extra_limit: number;
		/** 刻印掉落阶级（稀有度:权重） */
		class: string;
		/** 刻印掉落稀有度（稀有度:权重） */
		rarity: string;
	}

	type Engraving_drop = Record<string, Engraving_dropRow>;

	interface Engraving_entryRow {
		/** 自增id */
		id: number;
		/** 词条属性键值 */
		entry_name: string;
		/** 词条数值最小值 */
		value_min: number;
		/** 词条数值最小值 */
		value_max: number;
		/** 小数位数 */
		ratio: number;
	}

	type Engraving_entry = Record<string, Engraving_entryRow>;

	interface Engraving_rarity_settingRow {
		/** 刻印稀有度 */
		rarity: number;
		/** 副词条成长系数 */
		adverb_bonus: number;
		/** 分解奖励 */
		break_bonus: string;
	}

	type Engraving_rarity_setting = Record<string, Engraving_rarity_settingRow>;

	interface Engraving_settingRow {
		/** 设置key */
		setting: string;
		/** 值 */
		value: string;
		/** 备注 */
		name: string;
	}

	type Engraving_setting = Record<string, Engraving_settingRow>;

	interface Info_item_engravingRow {
		/** 刻印id */
		id: number;
		/** 刻印阶级 */
		class: number;
		/** 刻印稀有度 */
		rarity: number;
		/** 刻印iconid */
		icon: number;
	}

	type Info_item_engraving = Record<string, Info_item_engravingRow>;

	interface Info_item_runeRow {
		/** 符文id */
		id: number;
		/** 符文阶级 */
		class: number;
		/** 符文稀有度 */
		rarity: number;
		/** 符文iconid */
		icon: number;
	}

	type Info_item_rune = Record<string, Info_item_runeRow>;

	interface Rune_break_level_expRow {
		/** 分解等级 */
		level: number;
		/** 分解经验 */
		exp: number;
		/** 等级效果（需要累加） */
		effect: Record<string, number>;
	}

	type Rune_break_level_exp = Record<string, Rune_break_level_expRow>;

	interface Rune_class_settingRow {
		/** 符文阶级 */
		rune_class: number;
		/** 副词条权重（1-9|10-19|20-29|30-39|40-49|50-59|60-69|70-79|80-89|90-99|100） */
		adverb_weight: string;
	}

	type Rune_class_setting = Record<string, Rune_class_settingRow>;

	interface Rune_dropRow {
		/** 难度 */
		difficulty: number;
		/** 符文基础掉落数量（数量:权重） */
		base_drop: string;
		/** 每10分数额外掉落概率%（注:加成的概率超过100%必1，概率2） */
		extra_drop: number;
		/** 最高加成多少概率（超过这个概率后的积分不在增加额外的掉落率，但排行榜正常统计积分） */
		extra_limit: number;
		/** 符文掉落阶级（稀有度:权重） */
		class: string;
		/** 符文掉落稀有度（稀有度:权重） */
		rarity: string;
		/** 首通奖励 */
		star_reward1: Record<string, number>;
		/** 星级奖励2 */
		star_reward2: Record<string, number>;
		/** 星级奖励3 */
		star_reward3: Record<string, number>;
	}

	type Rune_drop = Record<string, Rune_dropRow>;

	interface Rune_entryRow {
		/** 自增id */
		id: number;
		/** 词条类型 */
		entry_type: number;
		/** 词条属性键值 */
		entry_name: string;
		/** 词条数值最小值 */
		value_min: number;
		/** 词条数值最小值 */
		value_max: number;
		/** 小数位数 */
		ratio: number;
	}

	type Rune_entry = Record<string, Rune_entryRow>;

	interface Rune_rarity_settingRow {
		/** 符文稀有度 */
		rarity: number;
		/** 穿戴所需等级 */
		need_level: number;
		/** 主词条成长系数 */
		main_bonus: number;
		/** 副词条成长系数 */
		adverb_bonus: number;
		/** 主词条数量 */
		main_num: number;
		/** 副词条数量 */
		adverb_num: number;
		/** 套装数量:数量_权重 */
		suit_num: string;
		/** 套装随机点数:点数_权重 */
		suit_points: string;
		/** 分解奖励 */
		break_bonus: Record<string, number>;
	}

	type Rune_rarity_setting = Record<string, Rune_rarity_settingRow>;

	interface Rune_settingRow {
		/** 设置key */
		setting: string;
		/** 值 */
		value: string;
		/** 备注 */
		name: string;
	}

	type Rune_setting = Record<string, Rune_settingRow>;

	interface Rune_suit_effectRow {
		/** 套装id */
		id: string;
		/** 套装解锁效果  所需点数：特权  |隔开（固定效果） */
		points__effect: Record<string, string>;
		/** 套装技能图标 */
		suit_icon: string;
	}

	type Rune_suit_effect = Record<string, Rune_suit_effectRow>;

	interface HeroRow {
		/** 英雄id */
		hero_id: number;
		/** 英雄名（备注） */
		name: string;
		/** 英雄名（英文） */
		name_en: string;
		/** 英雄名（俄文） */
		name_ru: string;
		/** 默认拥有 */
		unlock: number;
		/** 英雄稀有度 */
		rarity: number;
		/** 属性类型 1-力量 2-敏捷 3-智力 */
		type: number;
		/** 对应的英雄碎片id */
		hero_fragment: number;
	}

	type Hero = Record<string, HeroRow>;

	interface Hero_level_expRow {
		/** 等级（升级下一级） */
		level: number;
		/** 英雄升级需要经验id：210001 */
		exp: number;
	}

	type Hero_level_exp = Record<string, Hero_level_expRow>;

	interface Hero_soul_infusionRow {
		/** 注魂等级（升级下一级消耗） */
		soul_level: number;
		/** 前端展示等级 */
		show_level: string;
		/** 前端备注 */
		soul_infusion: string;
		/** 注魂消耗英雄碎片数量 */
		soul_infusion_cost: number;
	}

	type Hero_soul_infusion = Record<string, Hero_soul_infusionRow>;

	interface Hero_soul_infusion_effectRow {
		/** 自增id */
		id: number;
		/** 英雄id */
		hero_id: number;
		/** 注魂等级 */
		soul_level: number;
		/** 注魂效果 */
		soul_effect: Record<string, number>;
		/** 英雄故事奖励 */
		reward: string;
	}

	type Hero_soul_infusion_effect = Record<string, Hero_soul_infusion_effectRow>;

	interface Aquarium_slotRow {
		/** 水族馆等级 */
		aquarium_level: number;
		/** 升级消耗 */
		cost_item: Record<string, number>;
		/** 升级效果（累加） */
		effect: Record<string, number>;
	}

	type Aquarium_slot = Record<string, Aquarium_slotRow>;

	interface Explore_rewardRow {
		/** 自增id */
		id: number;
		/** 信使稀有度 */
		courier_rarity: string;
		/** 信使星级 */
		courier_star: string;
		/** 探险奖励（/小时）（itemid:num) */
		explore_reward: Record<string, number>;
	}

	type Explore_reward = Record<string, Explore_rewardRow>;

	interface Explore_slotRow {
		/** 信使驿站等级 */
		build_level: number;
		/** 升级消耗 */
		cost: Record<string, number>;
		/** 信使槽位 */
		explore_slot: number;
		/** 效果（当前属性不累加） */
		effect: Record<string, number>;
	}

	type Explore_slot = Record<string, Explore_slotRow>;

	interface Fish_consumeRow {
		/** id */
		id: number;
		/** 备注 */
		name: string;
		/** 类型（鱼饵和鱼钩） */
		type: string;
		/** 效果 */
		effect: string;
		/** 装备所需鱼竿等级（0不限制） */
		required_rod_level: number;
	}

	type Fish_consume = Record<string, Fish_consumeRow>;

	interface Fish_transformationRow {
		/** 鱼品质（0代表垃圾 */
		rarity: number;
		/** 鱼币数量（id:数量 */
		transformation: object;
	}

	type Fish_transformation = Record<string, Fish_transformationRow>;

	interface Idle_game_boxRow {
		/** 自增id */
		id: number;
		/** 功能标签 */
		type: string;
		/** 宝藏类型（普通宝藏和传说宝藏 */
		box_type: string;
		/** 备注 */
		name: string;
		/** 奖励物品id和数量（属性ID:value） */
		drop_item: string;
		/** 权重 */
		drop_weight: number;
	}

	type Idle_game_box = Record<string, Idle_game_boxRow>;

	interface Idle_game_drop_privilegeRow {
		/** 特权id */
		privilege_id: string;
		/** 概率 */
		chance: number;
		/** 物品id */
		itemid: number;
		/** 物品数量 */
		num: number;
	}

	type Idle_game_drop_privilege = Record<string, Idle_game_drop_privilegeRow>;

	interface Idle_game_fish_rodRow {
		/** id */
		rod_level: number;
		/** 备注 */
		name: string;
		/** 稀有度 */
		rarity: number;
		/** 是否能用鱼饵 */
		is_bait: number;
		/** 鱼钩槽位数量 */
		fishhook_slot: number;
		/** 是否隐藏 */
		hide: string;
		/** 升级消耗 */
		cost: string;
		/** 钓鱼交互（上限10000） */
		interaction: number;
		/** 上钩等待时间 */
		wait_time: number;
		/** 额外效果 */
		effect: string;
		/** 模型路径 */
		model: string;
		/** 彩虹鱼概率 */
		rainbow_chance: number;
		/** 普通宝箱概率 */
		normalbox_chance: number;
		/** 传说宝箱概率 */
		goldbox_chance: number;
		/** 掉落权重（鱼|宝箱） */
		drop_weight: string;
		/** 鱼池权重（1|2|3|4|5） */
		fish_pool_weight: string;
		/** 鱼重量下限百分比 */
		fish_weight_min: number;
		/** 鱼重量上限百分比 */
		fish_weight_max: number;
	}

	type Idle_game_fish_rod = Record<string, Idle_game_fish_rodRow>;

	interface Idle_game_fish_typeRow {
		/** id */
		id: number;
		/** 备注 */
		name: string;
		/** 等级 */
		level: number;
		/** 上钩反应时间(帧) */
		hook_frame: number;
		/** 鱼逃跑动作配置 （速度|持续帧数） */
		action_config: {[index: number]: string}[];
		rainbow_action_config: {[index: number]: string}[];
	}

	type Idle_game_fish_type = Record<string, Idle_game_fish_typeRow>;

	interface Idle_game_settingRow {
		/** 相关功能键值 */
		key: string;
		value: string;
	}

	type Idle_game_setting = Record<string, Idle_game_settingRow>;

	interface Info_game_idsRow {
		/** 物品id */
		item_id: number;
		/** 类型 */
		type: string;
		/** 物品名 */
		name: string;
	}

	type Info_game_ids = Record<string, Info_game_idsRow>;

	interface Info_item_cosmeticRow {
		/** id */
		id: number;
		/** 备注 */
		name: string;
		/** 类型 */
		type: string;
		/** 稀有度 */
		rarity: string;
		/** 默认拥有 */
		default: number;
		/** 是否隐藏 */
		hide: number;
		/** 不填则全英雄可用 */
		hero_id: number;
		/** 是否有签名 */
		is_sign: number;
		/** 属性:value|属性:value */
		attribute: Record<string, number>;
		/** 特权ID|特权ID */
		effect: string;
		/** 特效路径 */
		particle: string;
		/** 模型路径 */
		model: string;
	}

	type Info_item_cosmetic = Record<string, Info_item_cosmeticRow>;

	interface Info_item_propRow {
		/** 道具唯一ID */
		id: number;
		/** 道具名备注 */
		name: string;
		/** 使用时的效果，目前支持:pick(N选1),drop(随机掉落)；all（获得全部） */
		use_func: string;
		/** 宝箱内容池：id:num:权重|id:num:权重|id:num:权重 */
		prop_drop: Record<string, number>;
	}

	type Info_item_prop = Record<string, Info_item_propRow>;

	interface Info_item_rarityRow {
		/** 自增id */
		id: number;
		/** 物品id */
		item_id: number;
		/** 稀有度（1-白 2-绿 3-蓝 4-紫 5-金 6-红 7-粉） */
		rarity: number;
		/** 掉落模型（武器和藏品不用配） */
		model: string;
	}

	type Info_item_rarity = Record<string, Info_item_rarityRow>;

	interface PaymentsRow {
		/** 支付ID */
		id: number;
		/** 支付类型 */
		pay_type: number;
		/** 支付名称别名 */
		names: string;
		/** 支付渠道ID */
		pmid: string;
		/** 是否禁用 */
		disable: number;
	}

	type Payments = Record<string, PaymentsRow>;

	interface Pay_configRow {
		/** 语言 */
		language: string;
		/** 货币 */
		currency: string;
		/** 首页支付方式，支付ID:显示方式，用|分隔 */
		home: Record<string, string>;
		/** 禁用支付方式，支付ID:值，用|分隔 */
		disabled: string;
	}

	type Pay_config = Record<string, Pay_configRow>;

	interface Pvp_rewardRow {
		/** 赛季ID */
		sid: number;
		/** 名词 */
		rank: number;
		/** 奖励 */
		rewards: string;
	}

	type Pvp_reward = Record<string, Pvp_rewardRow>;

	interface Pvp_seasonRow {
		/** 赛季ID */
		sid: number;
		/** 开始时间 */
		start_time: number;
		/** 结束时间 */
		end_time: number;
	}

	type Pvp_season = Record<string, Pvp_seasonRow>;

	interface Diff_star_rewardsRow {
		/** 难度 */
		difficulty: number;
		/** 首通奖励 */
		star_reward1: Record<string, number>;
		/** 星级奖励2 */
		star_reward2: Record<string, number>;
		/** 星级奖励3 */
		star_reward3: Record<string, number>;
	}

	type Diff_star_rewards = Record<string, Diff_star_rewardsRow>;

	interface Equip_dropRow {
		/** 自增id */
		id: number;
		/** 难度 */
		diff: number;
		/** 关卡章节 */
		round: number;
		/** 掉落池子类型 */
		drop_pool: string;
		/** 稀有度权重 */
		equip_rarity: string;
		/** 掉落概率 */
		chance: number;
		/** 掉落基数权重 */
		drop_base: number;
		/** 掉落数量权重 */
		drop_num: number;
	}

	type Equip_drop = Record<string, Equip_dropRow>;

	interface Gem_diffRow {
		/** 难度 */
		diff: number;
		/** 宝石副本层数上限 */
		layers_limit: number;
		/** 宝石掉落阶级 */
		class: number;
	}

	type Gem_diff = Record<string, Gem_diffRow>;

	interface Gem_dropRow {
		/** 副本通关层数 */
		layers: number;
		/** 棋盘长宽数 */
		cell: number;
		/** 基础宝石数量 */
		base_gem: number;
		/** 基础宝石稀有度权重 */
		gem_rarity: string;
		/** 基础行动次数 */
		base_actions: number;
		/** 格子稀有度随机权重(蓝|紫|红） */
		rarity_weight: string;
		/** 格子数量上限(紫|红） */
		cell_limit: string;
	}

	type Gem_drop = Record<string, Gem_dropRow>;

	interface Gem_drop_entryRow {
		/** 自增ID */
		id: number;
		/** 格子效果键值 */
		effect_key: string;
		/** 格子效果备注 */
		effect_name: string;
		/** 格子稀有度 */
		rarity: number;
		/** 格子权重 */
		weight: number;
		/** 数量上限 */
		effect_limit: number;
	}

	type Gem_drop_entry = Record<string, Gem_drop_entryRow>;

	interface Resource_dropRow {
		/** 自增id */
		id: number;
		/** 难度 */
		diff: number;
		/** 关卡章节 */
		round: number;
		/** 关卡类型 */
		drop_pool: string;
		/** 掉落物品id:数量:权重 */
		drop_item: string;
	}

	type Resource_drop = Record<string, Resource_dropRow>;

	interface Settle_settingRow {
		/** 相关功能键值 */
		key: string;
		/** itemid:num */
		value: string;
	}

	type Settle_setting = Record<string, Settle_settingRow>;

	interface StoreItemData {
		/** 商品ID */
		id: number;
		/** 备注 */
		name: string;
		/** 内容 */
		items: Record<string, number>;
		/** 货币ID（现金配置0） */
		pay_type: number;
		/** 原始价格 */
		origin_price: number;
		/** 真实价格 */
		real_price: number;
		/** 折扣 */
		discount: number;
		/** 标签 */
		tag: string;
		/** 是否隐藏 */
		hide: number;
		/** 购买所需特权 */
		effect_condition: string;
		/** 稀有度 */
		rarity: number;
		/** 角标 */
		title: number;
		/** 是否按照特权展示 */
		show_type: number;
		/** 商品图 */
		img: string;
		/** 特效 */
		particle: string;
		/** 排序权重 */
		orderby: number;
		/** 开始时间 */
		start_time: number;
		/** 结束时间 */
		end_time: number;
		/** 隐藏时间 */
		hide_time: number;
		/** 限购类型：1终身2日3周4月 */
		limit_type: number;
		/** 限购数量 */
		limit_count: number;
		/** 使用购买数量作为限购 */
		use_purchased_num: number;
		/** 美元标价 */
		overseas_originprice: number;
		/** 美元价格 */
		overseas_realprice: number;
		/** 俄语标价 */
		russia_originprice: number;
		/** 俄语价格 */
		russia_realprice: number;
		/** 是否首充双倍 */
		first_pay: number;
		/** 超出限购转换 */
		limit_repeat: number;
	}

	type Info_shop_product = Record<string, StoreItemData>;

	interface Hero_talentRow {
		/** 天赋id */
		talent_id: string;
		/** 所属英雄 */
		hero: number;
		/** 天赋名称 */
		name: string;
		/** 最大等级 */
		max_level: number;
		/** 位置 */
		x: number;
		/** 位置 */
		y: number;
		/** 前置解锁 */
		requires: string;
		/** 图标 */
		icon: string;
	}

	type Hero_talent = Record<string, Hero_talentRow>;

	interface Hero_talent_effectRow {
		/** 自增id */
		id: number;
		/** 天赋id */
		talent_id: string;
		/** 等级 */
		level: string;
		/** 升级消耗id */
		talent_cost: string;
		/** 属性 */
		attribute: string;
		/** 特权ID|特权ID */
		privilege_effect: string;
		/** 技能升级 */
		ability_upgrade: string;
		/** 解锁等级 */
		lock: number;
	}

	type Hero_talent_effect = Record<string, Hero_talent_effectRow>;

	interface TalentRow {
		/** 天赋id */
		talent_id: string;
		/** 天赋名称 */
		name: string;
		/** 最大等级 */
		max_level: number;
		/** 天赋类型 */
		type: number;
		/** 天赋大类 */
		category: number;
		/** 位置 */
		y: number;
		/** 前置解锁 */
		requires: Record<string, number>;
		/** 解锁等级 */
		lock: number;
	}

	type Talent = Record<string, TalentRow>;

	interface Talent_effectRow {
		/** 自增id */
		id: number;
		/** 天赋id */
		talent_id: string;
		/** 等级 */
		level: number;
		/** 升级消耗id */
		talent_cost: Record<string, number>;
		/** 属性 */
		attribute: Record<string, number>;
		/** 特权ID|特权ID */
		privilege_effect: string;
	}

	type Talent_effect = Record<string, Talent_effectRow>;

	interface Bounty_missionRow {
		/** 任务ID */
		task_id: number;
		/** 稀有度 */
		rarity: number;
		/** 通关难度解锁（不配置就是没有解锁条件 */
		need_diff: number;
		/** 需要英雄等级 */
		need_hero_level: number;
	}

	type Bounty_mission = Record<string, Bounty_missionRow>;

	interface Bounty_settingRow {
		/** 相关功能键值 */
		key: string;
		value: string;
	}

	type Bounty_setting = Record<string, Bounty_settingRow>;

	interface DayrewardRow {
		/** 需要完成日常任务数量 */
		task_num: number;
		/** 宝箱奖励 */
		rewards: string;
	}

	type Dayreward = Record<string, DayrewardRow>;

	interface TaskRow {
		/** 任务ID */
		task_id: number;
		/** 任务类型-1日常2周常-3成就-4悬赏日常5悬赏周常 6活动任务(一次性) 7活动任务（每日）8pvp任务（每周） */
		type: number;
		/** 特权buffid */
		blessing_condition: number;
		/** 事件类型 */
		event_id: number;
		/** 目标数量 */
		target: number;
		/** 参数1 */
		param_1: number;
		/** 参数2 */
		param_2: number;
		/** 参数3 */
		param_3: number;
		/** 参数4 */
		param_4: number;
		/** 参数s1 */
		param_s1: string;
		/** 图标 */
		icon: string;
		/** 描述，是否静态文本。配置1直接取task_id静态文本 */
		task_description: number;
		/** 描述备注 */
		description: string;
		/** 任务奖励 */
		rewards: Record<string, number>;
		/** 特殊奖特权ID */
		vip_blessing: number;
		/** 特殊奖励内容 */
		blessing_reward: Record<string, number>;
		/** 成就组 */
		achievement_group: number;
		/** 关联活动ID或赛季ID */
		activity_id: number;
		/** 前置任务 */
		pre_task: number;
		/** 是否有效 */
		status: number;
	}

	type Task = Record<string, TaskRow>;

	interface WeaponRow {
		/** 武器id */
		id: number;
		/** 武器名 */
		name: string;
		/** 所属英雄 */
		hero: number;
		/** 1默认0不是默认 */
		is_default: number;
		/** 工具模式 */
		in_tool: number;
		/** 道具品质白1绿2蓝3紫4橙5 */
		rarity: number;
		/** 模型 */
		model: string;
		/** 额外模型（6星解锁） */
		extra_model: string;
		/** 武器效果（不上阵也生效，只对当前武器的所属英雄生效） */
		weapon_effect: string;
		/** 星级效果1 */
		star_effect1: object;
		/** 星级效果2 */
		star_effect2: object;
		/** 星级效果3 */
		star_effect3: object;
		/** 星级效果4 */
		star_effect4: object;
		/** 星级效果5 */
		star_effect5: object;
		/** 星级效果6 */
		star_effect6: object;
		/** 1星特权 */
		star_privilege1: string;
		/** 2星特权 */
		star_privilege2: string;
		/** 3星特权 */
		star_privilege3: string;
		/** 4星特权 */
		star_privilege4: string;
		/** 5星特权 */
		star_privilege5: string;
		/** 6星特权 */
		star_privilege6: string;
	}

	type Weapon = Record<string, WeaponRow>;

	interface CustomUIConfig {
		activity_boardslot: Activity_boardslot;
		activity_boardslot_reward: Activity_boardslot_reward;
		activity_data: Activity_data;
		activity_football_star: Activity_football_star;
		activity_growth_fund: Activity_growth_fund;
		activity_growth_fund_rewards: Record<string, Activity_growth_fund_rewards>;
		activity_login: Record<string, Activity_login>;
		activity_mining: Activity_mining;
		activity_mining_node: Activity_mining_node;
		activity_mining_template: Activity_mining_template;
		activity_moonstone: Record<string, Activity_moonstone>;
		activity_saving_pot: Activity_saving_pot;
		activity_starsea: Record<string, Activity_starsea>;
		info_item_blessing: Info_item_blessing;
		bp_level_exp: Record<string, Bp_level_exp>;
		bp_rewards: Record<string, Record<string, Bp_rewards>>;
		bp_season: Bp_season;
		collection: Collection;
		collection_essence: Collection_essence;
		collection_level_up: Record<string, Record<string, Collection_level_up>>;
		collection_treasure: Record<string, Collection_treasure>;
		collection_treasure_level_reward: Collection_treasure_level_reward;
		default_item: Default_item;
		game_setting: Game_setting;
		recharge_rewards: Recharge_rewards;
		transformation: Transformation;
		version: Version;
		service_courier: Service_courier;
		drawcards: Drawcards;
		drawcards_pond: Drawcards_pond;
		equipment_suit_effect: Equipment_suit_effect;
		equip_break_level_exp: Equip_break_level_exp;
		equip_class_setting: Equip_class_setting;
		equip_common_setting: Equip_common_setting;
		equip_entry: Equip_entry;
		equip_entry_main_pool: Equip_entry_main_pool;
		equip_forge_setting: Equip_forge_setting;
		equip_level_setting: Equip_level_setting;
		equip_punch: Equip_punch;
		equip_rarity_setting: Equip_rarity_setting;
		gem_class_setting: Gem_class_setting;
		gem_entry: Gem_entry;
		gem_level: Gem_level;
		gem_setting: Gem_setting;
		info_item_equipment: Info_item_equipment;
		info_item_gem: Info_item_gem;
		drawing_class_setting: Drawing_class_setting;
		drawing_entry: Drawing_entry;
		drawing_entry_main: Drawing_entry_main;
		info_item_drawing: Info_item_drawing;
		info_item_key: Info_item_key;
		key_class_setting: Key_class_setting;
		key_diff_setting: Key_diff_setting;
		key_entry: Key_entry;
		key_level_setting: Key_level_setting;
		key_rarity_setting: Key_rarity_setting;
		engraving_class_setting: Engraving_class_setting;
		engraving_drop: Engraving_drop;
		engraving_entry: Engraving_entry;
		engraving_rarity_setting: Engraving_rarity_setting;
		engraving_setting: Engraving_setting;
		info_item_engraving: Info_item_engraving;
		info_item_rune: Info_item_rune;
		rune_break_level_exp: Rune_break_level_exp;
		rune_class_setting: Rune_class_setting;
		rune_drop: Rune_drop;
		rune_entry: Rune_entry;
		rune_rarity_setting: Rune_rarity_setting;
		rune_setting: Rune_setting;
		rune_suit_effect: Rune_suit_effect;
		hero: Hero;
		hero_level_exp: Hero_level_exp;
		hero_soul_infusion: Hero_soul_infusion;
		hero_soul_infusion_effect: Record<string, Hero_soul_infusion_effect>;
		aquarium_slot: Aquarium_slot;
		explore_reward: Record<string, Explore_reward>;
		explore_slot: Explore_slot;
		fish_consume: Fish_consume;
		fish_transformation: Fish_transformation;
		idle_game_box: Idle_game_box;
		idle_game_drop_privilege: Idle_game_drop_privilege;
		idle_game_fish_rod: Idle_game_fish_rod;
		idle_game_fish_type: Idle_game_fish_type;
		idle_game_setting: Idle_game_setting;
		info_game_ids: Info_game_ids;
		info_item_cosmetic: Info_item_cosmetic;
		info_item_prop: Info_item_prop;
		info_item_rarity: Info_item_rarity;
		payments: Payments;
		pay_config: Pay_config;
		pvp_reward: Pvp_reward;
		pvp_season: Pvp_season;
		diff_star_rewards: Diff_star_rewards;
		equip_drop: Equip_drop;
		gem_diff: Gem_diff;
		gem_drop: Gem_drop;
		gem_drop_entry: Gem_drop_entry;
		resource_drop: Resource_drop;
		settle_setting: Settle_setting;
		info_shop_product: Info_shop_product;
		hero_talent: Hero_talent;
		hero_talent_effect: Record<string, Hero_talent_effect>;
		talent: Talent;
		talent_effect: Talent_effect;
		bounty_mission: Bounty_mission;
		bounty_setting: Bounty_setting;
		dayreward: Dayreward;
		task: Task;
		weapon: Weapon;
	}
}

export {};
