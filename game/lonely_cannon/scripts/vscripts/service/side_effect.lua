local __TSTL_FILE_PATH__ = "service/side_effect"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 5,["16"] = 8,["17"] = 9,["18"] = 10,["20"] = 10,["22"] = 10,["23"] = 11,["24"] = 12,["26"] = 15,["27"] = 16,["30"] = 8,["31"] = 3,["32"] = 26,["33"] = 26});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CServiceSideEffect = __TS__Class()
CServiceSideEffect.name = "CServiceSideEffect"
__TS__ClassExtends(CServiceSideEffect, CModule)
function CServiceSideEffect.prototype.init(self, reload)
end
function CServiceSideEffect.prototype.OnUpdatePlayerKeyValues(self, playerID, data)
    Event:Fire("player_settings_changed", {playerID = playerID, settings = data})
    local ____opt_0 = data.setting_switch_hero_voice_type
    if ____opt_0 ~= nil then
        ____opt_0 = ____opt_0.value
    end
    local heroVoiceType = ____opt_0
    if heroVoiceType ~= nil then
        PlayerData:SetHeroVoiceType(playerID, heroVoiceType)
    end
    local hero = PlayerResource:GetSelectedHeroEntity(playerID)
    if hero == nil then
        return
    end
end
CServiceSideEffect = __TS__DecorateLegacy({reloadable}, CServiceSideEffect)
if ServiceSideEffect == nil then
    ServiceSideEffect = __TS__New(CServiceSideEffect)
end
return ____exports
