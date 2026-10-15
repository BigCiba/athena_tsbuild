/** 服务端通用响应包装 */
type SvcRes<T = {}> = {
	code: number;
	message?: string;
	data: T;
};

/** 服务端点定义：Params=请求参数, Data=响应data类型 */
type EP<Params = {}, Data = {}> = {
	params: Params;
	result: SvcRes<Data>;
};

declare interface ServiceActionConfig {
	"/v1/log/report": EP<{
		/** 类型 */
		level: string;
		/** 报错内容 */
		message: string;
		/** 玩家id */
		uid?: string;
	}>;
	/** 登录 */
	"/v1/player/login": EP<{ uid?: number; }, { black_list: { time: number; }; }>;
	"/v1/player/set_lang": EP<{ lang: string; }>;
	"/v1/key/save": EP<{
		/** 玩家ID */
		uid?: number;
		/** 类型 */
		type: string;
		/** 键 */
		key: string;
		/** 值 */
		value: string;
	}, {
		player_key_values: { type: string; key: string; value: string; }[];
	}>;
	//添加物品
	"/v1/gm/add_item": EP<{ add_items: { item_id: number; amounts: number; }[]; }>;
	"/v1/key/fetch": EP<{
		/** 玩家ID */
		uid?: number;
		/** 类型 */
		type: string;
	}, {
		player_key_values: { type: string; key: string; value: string; }[];
	}>;
	/** 排行榜 */
	"/v1/leaderboard/fetch": EP<{
		leaderboard_type: "common_match" | string;
		/** common_match 传人数，common_match_hero 传英雄id */
		extra_keys: string[];
		start?: number;
		end?: number;
	}, LeaderboardFetchResponseData>;
	/** 补单 */
	"/v1/shop/supplement_orders": EP;
	"/v1/cdkey/receive": EP<{ key: string; }>;
	// 创建订单，真金白银付费
	"/v1/shop/create_order": EP<{
		/** 玩家ID */
		uid?: number;
		/** 订单页面上的标题 */
		title: string;
		/** 订单页面上的描述 */
		body: string;
		/** 商品ID */
		product_id: number;
		/** 商品数量 */
		amounts: number;
		/** 支付等级 */
		pay_type?: PaymentType;
		/** passion用的 */
		pmid?: string;
		/** 地区 */
		country?: string;
	}, {
		payment_order: { /** 订单号 */
			order_id: string; /** 链接 */
			order_link: string;
		};
		player_orders: {
			order_id: string;
			order_link: string;
			pay_state: number;
		}[];
	}>;
	/** 货币购买 */
	"/v1/shop/buy": EP<{
		/** 玩家ID */
		uid?: number;
		/** 商品ID */
		product_id: number;
		/** 商品数量 */
		amounts: number;
	}>;
	/** 查询订单 */
	"/v1/shop/query_order": {
		params: {
			/** 玩家ID */
			uid?: number;
			/** 订单号 */
			order_id: string;
		};
		result: {
			code: number;
			data: {};
			reason: string;
			message: string;
		};
	};
	// 邮件操作
	"/v1/mails/operate": EP<{ mail_id?: number; operate_type: number; step: number; }>;
	// 邮件列表
	"/v1/mails/fetch": EP;
	//获取所有装备
	"/v1/equip/fetch_all": EP<{ only_equipped?: boolean; }, { player_equipments: Equipment[]; }>;
	"/v1/equip/refine": EP<{
		id: number;
		entry_type: number; //1主词条 2副词条 3技能词条 4神话词条 5混沌词条
		entry_index: number; //index从0开始
	}, { player_equipments: Equipment[]; }>;
	//装备穿戴/卸下
	"/v1/hero/equip_equipment": EP<{ part: number; hero_id: number; suit_id: number; equipment_id: number; }>;
	//切换装备套装
	"/v1/hero/change_equip_suit": EP<{ hero_id: number; suit_id: number; }>;
	//装备上锁
	"/v1/equip/lock": EP<{ id: number; lock: boolean; }>;
	//装备分解
	"/v1/equip/break": EP<{ ids: number[]; }>;
	"/v1/equip/levelup": EP<{ id: number; level: number; }>;
	"/v1/talent/change": EP<{ talents: Record<string, number>; }>;
	//装备升阶
	"/v1/equip/classup": EP<{ id: number; }>;
	//装备升品
	"/v1/equip/rarity_upgrade": EP<{ id: number; }>;
	//装备槽位强化
	"/v1/equip/levelup_part": EP<{ part: number; level: number; }>;
	//词条重铸
	"/v1/equip/recast": EP<{
		id: number;
		/** 1主词条 2副词条 3技能词条 4神话词条 5混沌词条 */
		entry_type: number;
		/** index从0开始 */
		entry_index: number;
	}>;
	//图纸打造
	"/v1/drawing/craft": EP<{
		drawing_id: number;
		adverb_entry_ids?: string[];
		ability_entry_ids?: string[];
		myth_entry_ids?: string[];
		chaos_entry_ids?: string[];
	}>;
	//图纸合成
	"/v1/drawing/combine": EP<{
		ids: number[];
	}>;
	//图纸锁定/解锁
	"/v1/drawing/lock": EP<{ id: number; lock: boolean; }>;
	// 对局开始
	"/v1/settle/match_begin": EP<{
		match_id: number;
		match_type: string;
		version: string;
		player_details: { [uid: string]: { hero_id: number; }; };
		common_match_detail?: { diff: number; };
		abyssal_match_detail?: { diff: number; };
	}>;
	// 预览房间奖励
	"/v1/settle/preview_room_rewards": EP<{
		match_id: number;
		rooms: { round: number; room_step: number; room_type: string; }[];
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
	}>;
	// 房间结算
	"/v1/settle/room": EP<{
		match_id: number;
		round: number;
		room_step: number;
		hit_count: number;
		is_mvp?: boolean;
		fail?: boolean;
		fail_rewards?: Record<string, number>;
		total_damage: string; //总伤
		damage_per_second: string; //秒伤
		ability_upgrade: string; //技能升级
		end_attribute: string; //单位属性
		bless: string;
		artifact: string;
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
	}>;
	// BOSS奖励开箱
	"/v1/settle/receive_boss_rewards": EP<{
		match_id: number;
		round: number;
		room_step: number;
		open_times: number;
		use_daily_free_open_times: boolean;
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
		player_equipments?: { id: number; equipment_item_id: number; rarity: number; }[];
		player_drawings?: { id: number; drawing_item_id: number; rarity: number; }[];
		player_keys?: { id: number; key_item_id: number; rarity: number; }[];
		player_notices?: { key: string; }[];
	}>;
	// 教学模式奖励开箱
	"/v1/player/receive_teach_rewards": EP<{}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
		player_equipments?: { id: number; equipment_item_id: number; rarity: number; }[];
		player_drawings?: { id: number; drawing_item_id: number; rarity: number; }[];
		player_keys?: { id: number; key_item_id: number; rarity: number; }[];
	}>;
	// 获取英雄局外属性
	"/outside/get_privileges": EP<{ hero_id: number; }, {
		outside_attributes: {
			attributes: Record<string, number>;
			effects: Record<string, number>; // {天赋,等级}
			skills: Record<string, number>; // {信使出战技能,等级}
			myth: Record<string, number>; // 神话词条
		};
	}>;
	"/v1/outside/get_privileges": EP<{}, {
		global_outside_attributes: { data: OutsideAttributeMap; };
		hero_outside_attributes: Record<string, { data: OutsideAttributeMap; }>;
		hero_skill_outside_attributes: Record<string, OutsideAbilityAttributeMap>;
	}>;
	"/outside/add_extra_privileges": EP<{
		/** 玩家id */
		uid?: string;
		effects?: Record<string, number>;
		attributes?: Record<string, number>;
		skills?: Record<string, number>;
	}>;
	// 收藏品一键升级
	"/v1/collection/levelup": EP<{ collection_id: number; collection_type?: string; }>;
	"/v1/weapon/starup": EP<{ weapon_id: number; }>;
	"/v1/hero/equip_weapon": EP<{ hero_id: number; weapon_id: number; }>;
	/** 卡池抽奖 */
	"/v1/draw/card": EP<{
		/** 几连抽 */
		draw_type: number;
		pool_id: number;
	}, {
		add_items: Record<string, {
			item_id: number; amounts: number; item_rarity: number; draw_card_rarity: number;
		}[]>;
	}>;
	"/v1/draw/card/change_lucky_choice": EP<{ pool_id: number; lucky_choice: number; }>;
	"/v1/server/info": EP;
	"/v1/hero/starup": EP<{ hero_id: number; }>;
	"/v1/courier/equip": EP<{ courier_id: number; }>;
	"/v1/courier/starup": EP<{ courier_id: number; }>;
	"/v1/courier/assist": EP<{ courier_id: number; slot_id: number; }>;
	// 任务领取
	"/v1/task/receive_rewards": EP<{ task_id: number; extra_id?: number; }>;
	"/v1/battle_pass/fetch": EP<{ season: number; }>;
	"/v1/battle_pass/receive_rewards": EP<{
		season: number; receive_all?: boolean; level?: number; plus?: boolean;
	}>;
	"/v1/idle_game/flush_data": EP;
	"/v1/idle_game/play_fish": EP<{}, { player_play_idle_game_fish_result: ServiceFishResult; }>;
	"/v1/idle_game/receive_fish": EP<{ id: string; success_box: boolean; }, {
		add_items: Record<string, { item_id: number; amounts: number; item_rarity: number; }[]>;
		player_play_idle_game_fish_result: ServiceFishResult;
	}>;
	"/v1/hero/change_talent": EP<{ hero_id: string; talents: Record<string, number>; }>;
	"/v1/hero/reset_talent": EP<{ hero_id: string; }>;
	"/v1/idle_game/levelup_explore_building": EP<{ target_level: number; }>;
	"/v1/idle_game/flush_explore_data": EP<{}, { player_idle_game_explore_datas: ServiceCourierExploreResult[]; }>;
	"/v1/idle_game/explore_courier": EP<{ slot_id: number; courier_id: number; }, { player_idle_game_explore_datas: ServiceCourierExploreResult[]; }>;
	"/v1/idle_game/receive_explore_rewards": EP<{ slot_id: number; }, { player_idle_game_explore_datas: ServiceCourierExploreResult[]; }>;
	"/v1/idle_game/update_fish_data": EP<{
		/** 鱼饵ID */
		fish_bait: number;
		/** 使用的鱼钩 */
		fish_hooks: number[];
		times: 1;
		/** 装备的信使 */
		fish_courier_ids: number[];
		/** 自动填充鱼饵、鱼钩 */
		auto_switch_tools: boolean;
	}, { player_idle_game_fish_data: FishItemEquipment; }>;
	"/v1/idle_game/levelup_fish_rod": EP<{ /** 鱼竿等级 */ target_level: number; }>;
	"/v1/idle_game/fetch_fishes": EP;
	"/v1/idle_game/sell_fishes": EP<{ fish_ids: number[]; }>;
	"/v1/idle_game/show_fish": EP<{ fish_id: number; show: boolean; }>;
	"/v1/task/report": EP<{
		events: { param1: number; param2: number | string; param_s1: number | string; count: number; }[];
	}>;
	/**精粹一键升级 */
	"/v1/collection/levelup_essence": EP<{ collection_essence_id: number; }>;
	/**物品已读 */
	"/v1/equip/read": EP<{ system: "equipment" | "gem" | "rune" | "engraving" | "prop" | "cosmetic" | "key" | "drawing"; ids: number[]; }>;
	/**宝石升级 */
	"/v1/gem/levelup": EP<{ gem_id: number; level: number; }>;
	/** 装备打孔 */
	"/v1/gem/punch_equipment": EP<{ equipment_id: number; punch_num: number; }>;
	/**装备镶嵌宝石 */
	"/v1/gem/equipment_inlay_gem": EP<{ equipment_id: number; slot_index: number; gem_id: number; }>;
	/**宝石上锁/解锁*/
	"/v1/gem/lock": EP<{ gem_id: number; lock: boolean; }>;
	"/v1/gem/break": EP<{ gem_ids: number[]; }>;
	"/v1/gem/make": EP<{ gem_id: number; main_entry_id: string; adverb_entry_id: string; }>;
	"/v1/idle_game/levelup_aquarium": EP<{ target_level: number; }>;
	//切换装备套装
	"/v1/hero/change_rune_equip_suit": EP<{ hero_id: number; suit_id: number; }>;
	"/v1/rune/unlock_slot": EP<{ skill_id: number; slot_id: number; }>;
	"/v1/hero/equip_rune": EP<{
		// 英雄ID
		hero_id: number;
		// 装备方案ID
		suit_id: number;
		// 技能ID
		skill_id: number;
		// 插槽ID
		slot_id: number;
		// 符文ID
		rune_id: number;
	}>;
	"/v1/rune/devour": EP<{
		// 词条类型  1-主词条  2-副词条  3-套装词条
		entry_type: number;
		// 目标符文ID
		target_rune_id: number;
		// 被吞噬符文ID
		devoured_rune_id: number;
		//  被吞噬符文词条下标 每种词条类型下标独立 从0开始
		devoured_entry_index: number;
		locked_target_adverb_indexes: number[];
	}>;
	"/v1/rune/devour_confirm": EP<{ rune_id: number; confirm: boolean; }>;
	"/v1/engraving/rune_inlay_engraving_confirm": EP<{ rune_id: number; confirm: boolean; }>
	"/v1/engraving/punch_rune": EP<{ rune_id: number }>
	"/v1/rune/lock": EP<{ id: number; lock: boolean; }>;
	"/v1/engraving/lock": EP<{ id: number; lock: boolean; }>;
	"/v1/engraving/break": EP<{ ids: number[]; }>;
	"/v1/engraving/rune_inlay_engraving": EP<{
		rune_id: number;
		engraving_id: number;
	}>
	"/v1/brief/get_data": EP<{
		//steamid
		target_uid: number;
	}, {
		player_heroes: {
			hero_id: number; star: number; extra_star_exp: number;
			equip_suit: number; rune_equip_suit: number; equip_weapon: number; talents: string;
		}[];
		player_common_match_data: { max_diff: number; max_total_damage: string; max_damage_per_second: string; };
		player_common_data: { achievement_progress: number; };
	}>;
	"/v1/brief/match_records": EP<{
		//steamid
		target_uid: number;
		limit: number;
	}, {
		player_common_match_records: {
			uid: number; match_id: number; hero_id: number; diff: number; pass: boolean;
			star: number; start_time: number; player_num: number;
			total_damage: string; bless: string; artifact: string;
		}[];
	}>;
	"/v1/brief/show_room": EP<{ target_uid: number; }, Record<string, any>>;
	"/v1/brief/update_show_room": EP<{ show_type: string; slot: number; id: number; }>;
	"/v1/brief/like_show_room": EP<{ uid?: number; target_uid: number; }>;
	"/v1/account_level/receive_rewards": EP<{ account_type: string; level: number; }>;
	"/v1/activity/data": EP<{ activity_id: number; }>;
	"/v1/activity/receive_rewards": EP<{ activity_id: number; reward_id: number; }, {
		add_items: { common: { item_id: number; amounts: number; }[]; };
	}>;
	"/v1/activity/play_boardslot": EP<{
		activity_id: number;
		play_times: number;
		play_num: number;
	}, {
		player_boardslot_activity_play_result: BoardslotActivityPlayResult[];
		add_items: Record<string, { item_id: number; amounts: number; item_rarity: number; }[]>;
	}>;
	"/v1/activity/play_mining": EP<{
		activity_id: number;
		line: number;
		row: number;
		/** 1-Pickaxe 2-Bomb 3-Drill */
		operate_type: number;
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
		player_mining_activity_data: [MiningActivityServiceData];
	}>;
	"/v1/collection/levelup_treasure": EP<{ collection_treasure_ids: number[]; }>;
	"/v1/activity/batch_receive_rewards": EP<{ activity_id: number; }>;
	"/v1/rune/break": EP<{ ids: number[]; }>;
	"/v1/cosmetic/equip": EP<{ hero_id?: number; slot_id: number; cosmetic_id: number; }>;
	"/v1/prop/open": EP<{ prop_id: number; pick_item_id?: number; }>;
	"/v1/prop/batch_open": EP<{ prop_id: number; pick_item_id?: number; amounts: number; }>;
	"/v1/key/lock": EP<{ id: number; lock: boolean; }>;
	"/v1/key/devour": EP<{ target_id: number; devoured_ids: number[]; }>;
	"/v1/task/receive_daily_task_box": EP<{ day: number; task_num?: number; }>;
	"/v1/white_list/add": EP<{ key: string; }>;
	"/v1/equip/recast_v2_confirm": EP<{ id: number, option: number; }>;
	"/v1/player/change_password": EP<{ password: string; }>;
	"/v1/player/auth_login": EP<{ password: string; }, { player_auth: { player_session: string; }; }>;
	"/v1/settle/abyssal": EP<{
		match_id: number;
		pass: boolean;
		score: number;
		bless: string;
		artifact: string;
	}>;
	"/v1/settle/receive_abyssal_rewards": EP<{
		match_id: number;
		use_free_open_chance: boolean;
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
		player_runes: Record<string, SimplifyRuneProps>;
	}>;
	"/v1/settle/receive_abyssal_engraving_rewards": EP<{
		match_id: number;
		use_free_open_chance: boolean;
	}, {
		add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
		player_engravings: Record<string, SimplifyEngravingProps>;
	}>;
	"/v1/player/heart_beat": EP;
	"/v1/settle/preview_tower_rewards": EP<{
		/** 玩家ID */
		uid?: number;
		match_id: number;
		layer: number;
	}, {
		player_tower_rewards_preview: ServiceTowerRewardsPreview[];
	}>;
	"/v1/settle/receive_tower_rewards": EP<{
		/** 玩家ID */
		uid?: number;
		match_id: number;
		actions: Array<{ row: number, column: number; }>;
	}, {

		}>;
	"/v1/click/report": EP<{ click_messages: { click_type: string; detail: string; }[]; }>;
	// 参加足球赛活动
	"/v1/activity/dragonboat/join": EP<{
		activity_id: number;
	}, {
		player_dragonboat_activity_data: {
			activity_id: number,
			status: number,
			start_time: number;
		}[];
	}>;
	"/v1/hero/receive_star_rewards": EP<
		{
			hero_id: number;
			star: number;
		}, {
			add_items: { [access: string]: { amounts: number; item_rarity: number; item_id: number; }[]; };
			player_tokens: { token_id: number; amounts: number; }[];
			player_hero_star_rewards_receive_records: { hero_id: number; star: number; }[];
		}
	>;
	"/v1/player/submit_questionnaire": EP<{
		answers?: {
			id: number;
			answer: string;
		}[];
	}>;
	"/v1/settle/buy_tower_actions": EP<{ match_id: number; }>;
	"/v1/gem/equipment_swap_gem": EP<{ equipment_id1: number; equipment_id2: number; }>;
}
