local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_stunned"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 7,["22"] = 8,["23"] = 8,["24"] = 8,["25"] = 9,["26"] = 9,["27"] = 9,["28"] = 10,["29"] = 10,["30"] = 10,["31"] = 11,["32"] = 11,["33"] = 11,["34"] = 12,["35"] = 12,["36"] = 12,["37"] = 12,["38"] = 12,["39"] = 12,["41"] = 12,["42"] = 12,["43"] = 13,["44"] = 13,["45"] = 13,["46"] = 14,["47"] = 14,["48"] = 14,["49"] = 15,["50"] = 15,["51"] = 15,["52"] = 5,["53"] = 4,["54"] = 5,["56"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 眩晕由状态系统持有，modifier_common 统一桥接引擎状态。
____exports.modifier_athena_stunned = __TS__Class()
local modifier_athena_stunned = ____exports.modifier_athena_stunned
modifier_athena_stunned.name = "modifier_athena_stunned"
__TS__ClassExtends(modifier_athena_stunned, EOMModifier)
function modifier_athena_stunned.prototype.IsHidden(self)
    return false
end
function modifier_athena_stunned.prototype.IsDebuff(self)
    return true
end
function modifier_athena_stunned.prototype.IsPurgable(self)
    return false
end
function modifier_athena_stunned.prototype.IsPurgeException(self)
    return true
end
function modifier_athena_stunned.prototype.IsStunDebuff(self)
    return true
end
function modifier_athena_stunned.prototype.IgnoreTenacity(self)
    return true
end
function modifier_athena_stunned.prototype.EventListener(self)
    return {game_reset = function(____, ____bindingPattern0)
        local runId
        runId = ____bindingPattern0.runId
        if runId == GameState:GetSession().runId then
            self:Destroy()
        end
    end}
end
function modifier_athena_stunned.prototype.StaticState(self)
    return {[StateEnum.STUNNED] = true}
end
function modifier_athena_stunned.prototype.GetEffectName(self)
    return "particles/generic_gameplay/generic_stunned.vpcf"
end
function modifier_athena_stunned.prototype.GetEffectAttachType(self)
    return PATTACH_OVERHEAD_FOLLOW
end
modifier_athena_stunned = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_athena_stunned
)
____exports.modifier_athena_stunned = modifier_athena_stunned
return ____exports
