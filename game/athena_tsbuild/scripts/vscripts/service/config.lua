local __TSTL_FILE_PATH__ = "service/config"
local ____lualib = require("lualib_bundle")
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayJoin = ____lualib.__TS__ArrayJoin
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 2,["8"] = 6,["9"] = 7,["10"] = 8,["12"] = 11,["13"] = 11,["14"] = 11,["15"] = 11,["16"] = 11,["17"] = 11,["18"] = 11,["19"] = 11,["20"] = 11,["21"] = 11,["22"] = 11,["23"] = 11,["24"] = 11,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 11,["29"] = 11,["30"] = 11,["31"] = 11,["32"] = 11,["33"] = 11,["34"] = 11,["35"] = 11,["36"] = 11,["37"] = 11,["38"] = 11,["39"] = 11,["40"] = 11,["41"] = 11,["42"] = 11,["43"] = 11,["44"] = 11,["45"] = 11,["46"] = 11,["47"] = 11,["48"] = 11,["49"] = 11,["50"] = 11,["51"] = 11,["52"] = 11,["53"] = 11,["54"] = 11,["55"] = 11,["56"] = 11,["57"] = 11,["58"] = 11,["59"] = 11,["60"] = 11,["61"] = 11,["62"] = 11,["63"] = 11,["64"] = 11,["65"] = 11,["66"] = 11,["67"] = 11,["68"] = 11,["69"] = 11,["70"] = 11,["71"] = 11,["72"] = 11,["73"] = 11,["74"] = 11,["75"] = 11,["76"] = 11,["77"] = 11,["78"] = 11,["79"] = 11,["81"] = 85,["82"] = 86,["83"] = 85,["85"] = 90,["86"] = 91,["87"] = 92,["88"] = 93,["89"] = 94,["91"] = 96,["94"] = 99,["95"] = 90,["96"] = 103,["97"] = 104,["98"] = 105,["99"] = 106,["100"] = 107,["101"] = 108,["103"] = 110,["106"] = 113,["107"] = 103,["109"] = 118,["110"] = 118,["111"] = 120,["112"] = 121,["113"] = 122,["114"] = 122,["115"] = 122,["116"] = 122,["117"] = 122,["118"] = 122,["119"] = 122,["121"] = 124,["122"] = 118,["125"] = 131,["126"] = 131,["127"] = 131,["128"] = 131,["129"] = 131,["130"] = 131,["131"] = 131,["132"] = 131,["133"] = 131,["134"] = 131,["135"] = 131,["136"] = 131,["137"] = 131,["138"] = 131,["139"] = 131,["140"] = 131,["141"] = 131,["142"] = 131,["143"] = 131,["144"] = 131,["145"] = 131,["146"] = 131,["147"] = 131,["148"] = 131,["149"] = 131,["150"] = 131,["151"] = 131,["152"] = 131,["153"] = 131,["154"] = 131,["155"] = 131,["156"] = 131,["157"] = 131,["158"] = 131,["159"] = 131,["160"] = 131,["161"] = 131,["162"] = 131,["163"] = 131,["164"] = 131,["165"] = 131,["166"] = 131,["167"] = 131,["168"] = 131,["169"] = 131,["170"] = 131,["171"] = 131,["172"] = 131,["173"] = 131,["176"] = 185,["179"] = 193,["181"] = 198,["183"] = 206,["185"] = 211,["187"] = 215,["188"] = 220,["189"] = 223,["191"] = 230});
ServiceAddress = "http://150.158.155.234:8003"
ServerKey = "6688A65111C4FD49F52A546E5674DB44082776FE"
REQUEST_TIME_OUT = 30
Service_IsCheat = true
Service_IsLocal = true
--- 用官方nettable的，后面的参数代表是否是玩家数据
NetTableKeys = {
    player_key_values = true,
    info_products = false,
    player_hero_equip_suits = true,
    player_hero_rune_equip_suits = true,
    player_rune_unlock_data = true,
    player_common_first_passes = true,
    player_abyssal_first_passes = true,
    player_mails = true,
    player_tokens = true,
    player_talent = true,
    player_couriers = true,
    player_account_levels = true,
    player_heroes = true,
    player_collections = true,
    player_blessings = true,
    player_weapons = true,
    player_counters = true,
    info_cards = false,
    player_card_guarantees = true,
    player_card_lucky_choice = true,
    player_shop_product_limits = true,
    player_achievements = true,
    player_battle_passes = true,
    player_daily_tasks = true,
    player_daily_task_box_receive_records = true,
    player_weekly_tasks = true,
    player_daily_bounty_tasks = true,
    player_weekly_bounty_tasks = true,
    player_activity_tasks = true,
    player_idle_game_data = true,
    player_idle_game_fish_data = true,
    player_idle_game_explore_datas = true,
    player_idle_game_fishes = true,
    player_idle_game_fish_fuinness_records = true,
    player_room_rewards_preview = true,
    player_unread_new_ids = true,
    player_collection_essences = true,
    open_shop = true,
    player_unread_ids = true,
    player_common_match_data = true,
    player_common_data = true,
    player_common_match_records = true,
    player_collection_treasures = true,
    player_account_level_rewards_receive_records = true,
    player_growth_fund_activity_data = true,
    player_starsea_activity_data = true,
    player_moonstone_activity_data = true,
    player_cosmetics = true,
    player_cosmetic_equips = true,
    player_props = true,
    player_keys = true,
    player_drawings = true,
    player_idle_game_explore_building_data = true,
    player_recast_equipment_v2_results = true,
    player_auth = true,
    player_tower_rewards_preview = true,
    player_login_activity_data = true,
    player_dragonboat_activity_data = true,
    player_saving_pot_activity_data = true,
    player_hero_star_rewards_receive_records = true,
    player_boardslot_activity_data = true,
    player_boardslot_activity_slot_data = true,
    player_boardslot_activity_play_result = true,
    player_mining_activity_data = true,
    player_equipment_part_datas = true,
    player_show_room_likes = true
}
--- 用自定义netdata的，后面的参数代表是否是玩家数据
SpecialDealKeys = {player_show_rooms = function(____, iPlayerID, data)
    return PlayerData:DealShowRoomData(iPlayerID, data)
end}
--- 通用的数据重构函数，把数据里的唯一键提取出来作为key
CommonReconstruct = function(____, data, key)
    local reconstruct = {}
    for k, v in pairs(data) do
        if v.deleted == true then
            reconstruct[tostring(v[key])] = "nil"
        else
            reconstruct[tostring(v[key])] = v
        end
    end
    return reconstruct
end
NumReconstruct = function(____, data, key, num_key)
    local reconstruct = {}
    for k, v in pairs(data) do
        local num = v[num_key]
        if num and num > 0 then
            reconstruct[tostring(v[key])] = v
        else
            reconstruct[tostring(v[key])] = "nil"
        end
    end
    return reconstruct
end
--- 通用的数据重构函数，数据里的多个字段组成唯一键
CommonReconstruct_CombineKey = function(____, data, ...)
    local keys = {...}
    local reconstruct = {}
    for k, v in pairs(data) do
        reconstruct[__TS__ArrayJoin(
            __TS__ArrayMap(
                keys,
                function(____, key) return v[key] end
            ),
            "-"
        )] = v
    end
    return reconstruct
end
--- 数据重构（将后端传过来的数据重构成需要的结构），主要是为了把array转成object，方便数据自动更新
-- key: 重构函数
ReconstructConfig = {
    player_tokens = {CommonReconstruct, "token_id"},
    player_key_values = {CommonReconstruct, "key"},
    player_devour_rune_results = {CommonReconstruct, "id"},
    player_inlay_engraving_results = {CommonReconstruct, "id"},
    player_engravings = {CommonReconstruct, "id"},
    player_runes = {CommonReconstruct, "id"},
    player_equipments = {CommonReconstruct, "id"},
    player_equipment_part_datas = {CommonReconstruct, "part"},
    player_recast_equipment_v2_results = {CommonReconstruct, "id"},
    player_gems = {CommonReconstruct, "id"},
    player_mails = ServiceReconstruct.ParseMailData,
    player_account_levels = {CommonReconstruct, "account_type"},
    player_heroes = {CommonReconstruct, "hero_id"},
    player_common_first_passes = {CommonReconstruct, "diff"},
    player_abyssal_first_passes = {CommonReconstruct, "diff"},
    player_collections = {CommonReconstruct, "collection_id"},
    player_blessings = {CommonReconstruct, "blessing_id"},
    player_weapons = {CommonReconstruct, "weapon_id"},
    info_products = {CommonReconstruct, "product_id"},
    info_cards = {CommonReconstruct, "card_id"},
    player_card_lucky_choice = {CommonReconstruct, "pool_id"},
    player_achievements = {CommonReconstruct, "task_id"},
    player_daily_tasks = {CommonReconstruct_CombineKey, {"task_id", "extra_id"}},
    player_daily_task_box_receive_records = {CommonReconstruct, "day"},
    player_weekly_tasks = {CommonReconstruct_CombineKey, {"task_id", "extra_id"}},
    player_daily_bounty_tasks = {CommonReconstruct_CombineKey, {"task_id", "extra_id"}},
    player_weekly_bounty_tasks = {CommonReconstruct_CombineKey, {"task_id", "extra_id"}},
    player_activity_tasks = {CommonReconstruct_CombineKey, {"task_id", "extra_id"}},
    player_idle_game_fish_fuinness_records = {CommonReconstruct, "fish_item_id"},
    player_collection_essences = {CommonReconstruct, "collection_essence_id"},
    player_counters = {CommonReconstruct, "counter_type"},
    player_collection_treasures = {CommonReconstruct, "collection_treasure_id"},
    player_starsea_activity_data = {CommonReconstruct, "activity_id"},
    player_growth_fund_activity_data = {CommonReconstruct, "activity_id"},
    player_moonstone_activity_data = {CommonReconstruct, "activity_id"},
    player_cosmetics = {CommonReconstruct, "cosmetic_id"},
    player_cosmetic_equips = {CommonReconstruct_CombineKey, {"hero_id", "slot_id"}},
    player_props = {CommonReconstruct, "prop_id"},
    player_keys = {CommonReconstruct, "id"},
    player_drawings = {CommonReconstruct, "id"},
    player_login_activity_data = {CommonReconstruct, "activity_id"},
    player_saving_pot_activity_data = {CommonReconstruct, "activity_id"},
    player_dragonboat_activity_data = {CommonReconstruct, "activity_id"},
    player_boardslot_activity_data = {CommonReconstruct, "activity_id"},
    player_boardslot_activity_slot_data = {CommonReconstruct, "slot_id"},
    player_mining_activity_data = {CommonReconstruct, "activity_id"},
    player_show_room_likes = {CommonReconstruct, "target_uid"}
}
--- 副作用函数，比如每次更新courier数据的时候，自动切换当前使用的信使皮肤，或者需要标记红点也可以
-- 传入的data是当次请求的数据（合并前）
SideEffectConfig = {player_key_values = ServiceSideEffect.OnUpdatePlayerKeyValues}
--- 副作用函数，比如每次更新courier数据的时候，自动切换当前使用的信使皮肤，或者需要标记红点也可以
-- 传入的data是合并后的数据
AfterSideEffectConfig = {}
--- 直接覆盖的数据，不进行合并
OverrideDataConfig = {player_idle_game_fish_data = true, player_boardslot_activity_play_result = true}
--- 原始数据处理，阶段最早
RawDataConfig = {}
--- 设置网表前对数据进行最后处理
FinalConfig = {}
--- 添加物品提醒黑名单（不会提醒获得物品）
AddItemBlackList = {"other", "open_box"}
AddItemBlackListConfig = {}
AddItemCallback = {}
--- 添加物品后派生的未读红点规则
AddItemUnreadConfig = {}
