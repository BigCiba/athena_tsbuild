local __TSTL_FILE_PATH__ = "abilities/client_ability"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["16"] = 7,["17"] = 8,["18"] = 9,["20"] = 11,["21"] = 5,["22"] = 4,["23"] = 3,["24"] = 4});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
local client_ability = __TS__Class()
client_ability.name = "client_ability"
__TS__ClassExtends(client_ability, EOMAbility)
function client_ability.prototype.GetAbilityTextureName(self)
    if _G.ClientRequestEventResult ~= nil then
        local sResult = _G.ClientRequestEventResult
        _G.ClientRequestEventResult = nil
        return sResult
    end
    return ""
end
client_ability = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    client_ability
)
return ____exports
