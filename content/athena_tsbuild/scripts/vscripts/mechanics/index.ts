/** @noSelfInFile */

/**
 * 功能介绍：
 * mechanics 模块总入口，按依赖顺序 require 所有服务端玩法模块并触发全局单例注册。
 *
 * 使用方法：
 * 新增 mechanics 模块后在此文件按依赖顺序 require；
 * KV 和基础声明类模块应先加载，服务端专用模块放在 IsServer() 分支内。
 */

require("kv");
require("ability_upgrade");

if (IsServer()) {
	require("../abilities/items/consumable/item_salve");
	require("../abilities/items/consumable/item_clarity");
	require("../abilities/items/weapon/item_jia");
	require("../abilities/items/weapon/item_xie");
	require("../abilities/items/drops/item_bag_of_coin");
	require("../abilities/items/essence/essence");
	require("../abilities/items/quest/item_zhanqi");
	// 服务器端初始化
	require("base");
	require("run_resources");
	require("items");
	require("shop");
	require("task");
	require("wave_spawner");
	require("neutral_spawners");
	require("special_spawner");
	require("bullet");
	require("damage_system/damage_counter");
	require("damage_system/damage_system");
} else {
	// 客户端初始化
}
