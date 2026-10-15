local __TSTL_FILE_PATH__ = "mechanics/index"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 12,["5"] = 13,["6"] = 15,["7"] = 17,["8"] = 18,["9"] = 19,["10"] = 20});
require("mechanics.kv")
require("mechanics.ability_upgrade")
if IsServer() then
    require("mechanics.base")
    require("mechanics.bullet")
    require("mechanics.damage_system.damage_counter")
    require("mechanics.damage_system.damage_system")
else
end
