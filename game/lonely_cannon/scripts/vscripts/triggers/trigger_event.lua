local __TSTL_FILE_PATH__ = "triggers/trigger_event"
local ____lualib = require("lualib_bundle")
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 6,["6"] = 7,["9"] = 8,["12"] = 9,["15"] = 10,["18"] = 11,["21"] = 12,["22"] = 13,["23"] = 15,["24"] = 16,["25"] = 17,["26"] = 18,["27"] = 19,["28"] = 19,["29"] = 19,["30"] = 20,["31"] = 19,["32"] = 19,["33"] = 22,["34"] = 23,["35"] = 24,["38"] = 6,["39"] = 39,["40"] = 40,["41"] = 39});
function OnStartTouch(trigger)
    if not IsValid(trigger.activator) or not IsValid(trigger.caller) then
        return
    end
    if not trigger.activator:IsBaseNPC() then
        return
    end
    if trigger.activator:IsBuilding() then
        return
    end
    if trigger.activator:IsInvulnerable() then
        return
    end
    if not trigger.caller:LoadData("enabled", true) then
        return
    end
    local caster = trigger.activator
    local triggerName = thisEntity:GetName()
    local prefix = __TS__StringSplit(triggerName, "_")[1]
    local trapList = Entities:FindAllByName(prefix .. "_trap_floor_model")
    local spawnGroup = thisEntity:GetSpawnGroupHandle()
    trigger.caller:SaveData("enabled", false)
    trigger.caller:GameTimer(
        2,
        function()
            trigger.caller:SaveData("enabled", true)
        end
    )
    for ____, trap in ipairs(trapList) do
        if trap:GetSpawnGroupHandle() == spawnGroup then
            Event:Fire("trap_floor", {caster = caster, trap = trap})
        end
    end
end
function OnEndTouch(trigger)
    local triggerName = thisEntity:GetName()
end
