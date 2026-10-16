local __TSTL_FILE_PATH__ = "modifiers/index"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 8,["5"] = 13,["7"] = 17,["8"] = 20,["10"] = 24,["11"] = 28});
for i, v in ipairs({"modifier_neutral", "modifier_original_health_bar", "wave_unit"}) do
    require("modifiers." .. v)
end
for i, v in ipairs({"modifier_enemy_scaling"}) do
    require("modifiers.enemy." .. v)
end
for i, v in ipairs({"modifier_common", "modifier_npc"}) do
    require("modifiers.framework." .. v)
end
