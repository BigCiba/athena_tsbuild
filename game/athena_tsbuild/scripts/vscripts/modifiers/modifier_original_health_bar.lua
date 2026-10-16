local __TSTL_FILE_PATH__ = "modifiers/modifier_original_health_bar"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 7,["22"] = 8,["23"] = 8,["24"] = 8,["25"] = 9,["26"] = 9,["27"] = 9,["28"] = 10,["29"] = 10,["30"] = 10,["31"] = 12,["32"] = 12,["33"] = 12,["34"] = 5,["35"] = 4,["36"] = 5,["38"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 原版特殊进攻使用的引擎血条标记，不依赖尚未迁移的自定义血条。
____exports.modifier_original_health_bar = __TS__Class()
local modifier_original_health_bar = ____exports.modifier_original_health_bar
modifier_original_health_bar.name = "modifier_original_health_bar"
__TS__ClassExtends(modifier_original_health_bar, EOMModifier)
function modifier_original_health_bar.prototype.IsHidden(self)
    return true
end
function modifier_original_health_bar.prototype.IsPurgable(self)
    return false
end
function modifier_original_health_bar.prototype.RemoveOnDeath(self)
    return false
end
function modifier_original_health_bar.prototype.GetPriority(self)
    return MODIFIER_PRIORITY_HIGH
end
function modifier_original_health_bar.prototype.CheckState(self)
    return {[MODIFIER_STATE_NO_HEALTH_BAR] = false}
end
function modifier_original_health_bar.prototype.StaticState(self)
    return {[StateEnum.NO_HEALTH_BAR] = true}
end
modifier_original_health_bar = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_original_health_bar
)
____exports.modifier_original_health_bar = modifier_original_health_bar
return ____exports
