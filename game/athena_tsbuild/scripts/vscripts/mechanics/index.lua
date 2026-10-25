local __TSTL_FILE_PATH__ = "mechanics/index"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 12,["5"] = 13,["6"] = 15,["7"] = 16,["8"] = 17,["9"] = 18,["10"] = 19,["11"] = 20,["12"] = 21,["13"] = 22,["14"] = 24,["15"] = 25,["16"] = 26,["17"] = 27,["18"] = 28,["19"] = 29,["20"] = 30,["21"] = 31,["22"] = 32,["23"] = 33,["24"] = 34});
require("mechanics.kv")
require("mechanics.ability_upgrade")
if IsServer() then
    require("abilities.items.consumable.item_salve")
    require("abilities.items.consumable.item_clarity")
    require("abilities.items.weapon.item_jia")
    require("abilities.items.weapon.item_xie")
    require("abilities.items.drops.item_bag_of_coin")
    require("abilities.items.essence.essence")
    require("abilities.items.quest.item_zhanqi")
    require("mechanics.base")
    require("mechanics.run_resources")
    require("mechanics.items")
    require("mechanics.shop")
    require("mechanics.task")
    require("mechanics.wave_spawner")
    require("mechanics.neutral_spawners")
    require("mechanics.special_spawner")
    require("mechanics.bullet")
    require("mechanics.damage_system.damage_counter")
    require("mechanics.damage_system.damage_system")
else
end
