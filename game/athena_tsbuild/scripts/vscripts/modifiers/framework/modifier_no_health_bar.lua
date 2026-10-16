local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_no_health_bar"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 5,["20"] = 4,["21"] = 5,["23"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 原版通用标记：仅隐藏自定义血条，不改变引擎 CheckState。
____exports.modifier_no_health_bar = __TS__Class()
local modifier_no_health_bar = ____exports.modifier_no_health_bar
modifier_no_health_bar.name = "modifier_no_health_bar"
__TS__ClassExtends(modifier_no_health_bar, EOMModifier)
function modifier_no_health_bar.prototype.StaticState(self)
    return {[StateEnum.NO_HEALTH_BAR] = true}
end
modifier_no_health_bar = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false, RemoveOnDeath = false})},
    modifier_no_health_bar
)
____exports.modifier_no_health_bar = modifier_no_health_bar
return ____exports
