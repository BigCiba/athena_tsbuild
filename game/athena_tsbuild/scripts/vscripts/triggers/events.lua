local __TSTL_FILE_PATH__ = "triggers/events"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 1,["7"] = 5,["8"] = 5,["9"] = 5,["10"] = 5,["11"] = 6,["12"] = 6,["13"] = 6,["14"] = 6,["15"] = 6,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 6,["21"] = 5,["22"] = 5,["23"] = 8,["24"] = 8,["25"] = 8,["26"] = 8,["27"] = 9,["28"] = 9,["29"] = 9,["30"] = 9,["31"] = 9,["32"] = 9,["33"] = 9,["34"] = 9,["35"] = 9,["37"] = 8,["38"] = 8});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerEntityFunction = ____dota_ts_adapter.registerEntityFunction
registerEntityFunction(
    nil,
    "OnStartTouch",
    function(____, trigger)
        if IsValid(trigger.activator) then
            Event:Fire(
                "collision_trigger",
                {
                    activator = trigger.activator,
                    name = thisEntity:GetName(),
                    type = 1
                }
            )
        end
    end
)
registerEntityFunction(
    nil,
    "OnEndTouch",
    function(____, trigger)
        if IsValid(trigger.activator) then
            Event:Fire(
                "collision_trigger",
                {
                    activator = trigger.activator,
                    name = thisEntity:GetName(),
                    type = 0
                }
            )
        end
    end
)
return ____exports
