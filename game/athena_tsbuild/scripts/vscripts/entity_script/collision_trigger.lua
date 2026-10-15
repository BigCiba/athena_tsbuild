local __TSTL_FILE_PATH__ = "entity_script/collision_trigger"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 1,["7"] = 3,["8"] = 3,["9"] = 3,["10"] = 3,["11"] = 5,["12"] = 6,["13"] = 7,["14"] = 8,["16"] = 3,["17"] = 3,["18"] = 15,["19"] = 15,["20"] = 15,["21"] = 15,["22"] = 17,["23"] = 18,["24"] = 19,["25"] = 20,["27"] = 15,["28"] = 15});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerEntityFunction = ____dota_ts_adapter.registerEntityFunction
registerEntityFunction(
    nil,
    "CollisionTrigger_OnStartTouch",
    function(____, event)
        local unit = event.activator
        local name = thisEntity and thisEntity:GetName() or ""
        if unit and name ~= "" then
            Event:Fire("collision_trigger", {activator = unit, name = name, type = 1})
        end
    end
)
registerEntityFunction(
    nil,
    "CollisionTrigger_OnEndTouch",
    function(____, event)
        local unit = event.activator
        local name = thisEntity and thisEntity:GetName() or ""
        if unit and name ~= "" then
            Event:Fire("collision_trigger", {activator = unit, name = name, type = 0})
        end
    end
)
return ____exports
