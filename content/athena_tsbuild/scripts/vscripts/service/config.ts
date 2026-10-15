let ServiceAddress = "http://150.158.155.234:8003";
const ServerKey = "6688A65111C4FD49F52A546E5674DB44082776FE";

// let ServerKey = GetDedicatedServerKeyV2(KEY)  
let OVERRIDE_STEAMID: number | undefined;//用于测试的steamid; 
const REQUEST_TIME_OUT = 30; // 默认请求超时时长（秒）
const Service_IsCheat = true;
const Service_IsLocal = true;

/** 用官方nettable的，后面的参数代表是否是玩家数据 */
const NetTableKeys: Record<string, boolean> = {
	player_key_values: true,
	info_products: false,
	player_hero_equip_suits: true,
	player_hero_rune_equip_suits: true,
	player_rune_unlock_data: true,
	player_common_first_passes: true,
	player_abyssal_first_passes: true,
	player_mails: true,
	player_tokens: true,
	player_talent: true,
	player_couriers: true,
	player_account_levels: true,
	player_heroes: true,
	player_collections: true,
	player_blessings: true,
	player_weapons: true,
	player_counters: true,
	info_cards: false,
	player_card_guarantees: true,
	player_card_lucky_choice: true,
	player_shop_product_limits: true,
	player_achievements: true,
	player_battle_passes: true,
	player_daily_tasks: true,
	player_daily_task_box_receive_records: true,
	player_weekly_tasks: true,
	player_daily_bounty_tasks: true,
	player_weekly_bounty_tasks: true,
	player_activity_tasks: true,
	player_idle_game_data: true,
	player_idle_game_fish_data: true,
	player_idle_game_explore_datas: true,
	player_idle_game_fishes: true,
	player_idle_game_fish_fuinness_records: true,
	player_room_rewards_preview: true,
	player_unread_new_ids: true,
	player_collection_essences: true,
	open_shop: true,
	player_unread_ids: true,
	player_common_match_data: true,
	player_common_data: true,
	player_common_match_records: true,
	player_collection_treasures: true,
	player_account_level_rewards_receive_records: true,
	player_growth_fund_activity_data: true,
	player_starsea_activity_data: true,
	player_moonstone_activity_data: true,
	player_cosmetics: true,
	player_cosmetic_equips: true,
	player_props: true,
	player_keys: true,
	player_drawings: true,
	player_idle_game_explore_building_data: true,
	player_recast_equipment_v2_results: true,
	player_auth: true,
	player_tower_rewards_preview: true,
	player_login_activity_data: true,
	player_dragonboat_activity_data: true,
	player_saving_pot_activity_data: true,
	player_hero_star_rewards_receive_records: true,
	player_boardslot_activity_data: true,
	player_boardslot_activity_slot_data: true,
	player_boardslot_activity_play_result: true,
	player_mining_activity_data: true,
	player_equipment_part_datas: true,
	player_show_room_likes: true,
};
/** 用自定义netdata的，后面的参数代表是否是玩家数据 */
// const NetDataKeys: Record<string, boolean> = {

// };

// 特殊处理的数据字段
const SpecialDealKeys: Record<string, Function> = {
	player_show_rooms: (iPlayerID: PlayerID, data: any) => { return PlayerData.DealShowRoomData(iPlayerID, data); },
};

/** 通用的数据重构函数，把数据里的唯一键提取出来作为key */
const CommonReconstruct = (data: any, key: string) => {
	let reconstruct: any = {};
	for (const [k, v] of pairs(data)) {
		if (v.deleted == true) {
			reconstruct[tostring(v[key])] = "nil";
		} else {
			reconstruct[tostring(v[key])] = v;
		}
	}
	return reconstruct;
};

// 带数量的数据重构
const NumReconstruct = (data: any, key: string, num_key: string) => {
	let reconstruct: any = {};
	for (const [k, v] of pairs(data)) {
		let num = v[num_key];
		if (num && num > 0) {
			reconstruct[tostring(v[key])] = v;
		} else {
			reconstruct[tostring(v[key])] = "nil";
		}
	}
	return reconstruct;
};


/** 通用的数据重构函数，数据里的多个字段组成唯一键 */
const CommonReconstruct_CombineKey = (data: any, ...keys: string[]) => {
	// print("CommonReconstruct_CombineKey", keys);
	let reconstruct: any = {};
	for (const [k, v] of pairs(data)) {
		reconstruct[keys.map(key => v[key]).join("-")] = v;
	}
	return reconstruct;
};

/**
 * 数据重构（将后端传过来的数据重构成需要的结构），主要是为了把array转成object，方便数据自动更新
 * key: 重构函数
 */
const ReconstructConfig: Record<string, Function | [Function, string] | [Function, string[]]> = {
	player_tokens: [CommonReconstruct, "token_id"],
	player_key_values: [CommonReconstruct, "key"],
	player_devour_rune_results: [CommonReconstruct, "id"],
	player_inlay_engraving_results: [CommonReconstruct, "id"],
	player_engravings: [CommonReconstruct, "id"],
	player_runes: [CommonReconstruct, "id"],
	player_equipments: [CommonReconstruct, "id"],
	player_equipment_part_datas: [CommonReconstruct, "part"],
	player_recast_equipment_v2_results: [CommonReconstruct, "id"],
	player_gems: [CommonReconstruct, "id"],
	player_mails: ServiceReconstruct.ParseMailData,
	player_account_levels: [CommonReconstruct, "account_type"],
	player_heroes: [CommonReconstruct, "hero_id"],
	player_common_first_passes: [CommonReconstruct, "diff"],
	player_abyssal_first_passes: [CommonReconstruct, "diff"],
	player_collections: [CommonReconstruct, "collection_id"],
	player_blessings: [CommonReconstruct, "blessing_id"],
	player_weapons: [CommonReconstruct, "weapon_id"],
	info_products: [CommonReconstruct, "product_id"],
	info_cards: [CommonReconstruct, "card_id"],
	player_card_lucky_choice: [CommonReconstruct, "pool_id"],
	player_achievements: [CommonReconstruct, "task_id"],
	player_daily_tasks: [CommonReconstruct_CombineKey, ["task_id", "extra_id"]],
	player_daily_task_box_receive_records: [CommonReconstruct, "day"],
	player_weekly_tasks: [CommonReconstruct_CombineKey, ["task_id", "extra_id"]],
	player_daily_bounty_tasks: [CommonReconstruct_CombineKey, ["task_id", "extra_id"]],
	player_weekly_bounty_tasks: [CommonReconstruct_CombineKey, ["task_id", "extra_id"]],
	player_activity_tasks: [CommonReconstruct_CombineKey, ["task_id", "extra_id"]],
	player_idle_game_fish_fuinness_records: [CommonReconstruct, "fish_item_id"],
	player_collection_essences: [CommonReconstruct, "collection_essence_id"],
	player_counters: [CommonReconstruct, "counter_type"],
	player_collection_treasures: [CommonReconstruct, "collection_treasure_id"],
	player_starsea_activity_data: [CommonReconstruct, "activity_id"],
	player_growth_fund_activity_data: [CommonReconstruct, "activity_id"],
	player_moonstone_activity_data: [CommonReconstruct, "activity_id"],
	player_cosmetics: [CommonReconstruct, "cosmetic_id"],
	player_cosmetic_equips: [CommonReconstruct_CombineKey, ["hero_id", "slot_id"]],
	player_props: [CommonReconstruct, "prop_id"],
	player_keys: [CommonReconstruct, "id"],
	player_drawings: [CommonReconstruct, "id"],
	player_login_activity_data: [CommonReconstruct, "activity_id"],
	player_saving_pot_activity_data: [CommonReconstruct, "activity_id"],
	player_dragonboat_activity_data: [CommonReconstruct, "activity_id"],
	player_boardslot_activity_data: [CommonReconstruct, "activity_id"],
	player_boardslot_activity_slot_data: [CommonReconstruct, "slot_id"],
	player_mining_activity_data: [CommonReconstruct, "activity_id"],
	player_show_room_likes: [CommonReconstruct, "target_uid"],
};

/**
 * 副作用函数，比如每次更新courier数据的时候，自动切换当前使用的信使皮肤，或者需要标记红点也可以
 * 传入的data是当次请求的数据（合并前）
 */
const SideEffectConfig: Record<string, Function> = {
	player_key_values: ServiceSideEffect.OnUpdatePlayerKeyValues,
};

/**
 * 副作用函数，比如每次更新courier数据的时候，自动切换当前使用的信使皮肤，或者需要标记红点也可以
 * 传入的data是合并后的数据
 */
const AfterSideEffectConfig: Record<string, Function> = {

};

/** 直接覆盖的数据，不进行合并 */
const OverrideDataConfig: Record<string, boolean> = {
	player_idle_game_fish_data: true,
	player_boardslot_activity_play_result: true,
	// player_map_first_pass: true,
	// player_idle_game_explore_datas: true,
};

/** 原始数据处理，阶段最早 */
const RawDataConfig: Record<string, Function> = {
	// leaderboard_data: ServiceReconstruct.rawLeaderboard,
};

/** 设置网表前对数据进行最后处理 */
const FinalConfig: Record<string, Function> = {
};

/** 添加物品提醒黑名单（不会提醒获得物品） */
const AddItemBlackList: string[] = [
	"other",
	"open_box",
];

const AddItemBlackListConfig: Record<string, Function> = {
};

const AddItemCallback: Record<number, Function> = {
};

type AddItemUnreadPatch = Record<string, Record<string, true>>;
type AddItemUnreadBuilder = (playerID: PlayerID, addItems: any, playerTokenAmountsBefore: Record<string, number>, playerCourierExistsBefore: Record<string, true>) => AddItemUnreadPatch | undefined;

/** 添加物品后派生的未读红点规则 */
const AddItemUnreadConfig: AddItemUnreadBuilder[] = [
];

type PlayerIdArr = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
