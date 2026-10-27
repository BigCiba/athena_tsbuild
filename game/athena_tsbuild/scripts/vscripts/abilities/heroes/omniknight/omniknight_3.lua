local __TSTL_FILE_PATH__ = "abilities/heroes/omniknight/omniknight_3"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 1,["12"] = 2,["13"] = 2,["14"] = 2,["15"] = 2,["16"] = 5,["17"] = 6,["18"] = 5,["19"] = 6,["20"] = 7,["21"] = 7,["22"] = 7,["23"] = 6,["24"] = 5,["25"] = 6,["27"] = 6,["28"] = 10,["29"] = 11,["30"] = 10,["31"] = 11,["33"] = 11,["34"] = 16,["35"] = 10,["36"] = 17,["37"] = 18,["38"] = 17,["39"] = 22,["40"] = 22,["41"] = 22,["42"] = 23,["43"] = 23,["44"] = 23,["45"] = 24,["46"] = 24,["47"] = 24,["48"] = 24,["49"] = 24,["52"] = 24,["53"] = 24,["54"] = 24,["55"] = 24,["56"] = 24,["57"] = 25,["58"] = 26,["59"] = 26,["60"] = 26,["61"] = 26,["62"] = 26,["63"] = 27,["66"] = 28,["67"] = 28,["68"] = 29,["69"] = 30,["70"] = 31,["71"] = 31,["74"] = 33,["75"] = 34,["76"] = 35,["77"] = 36,["78"] = 36,["81"] = 38,["83"] = 26,["84"] = 25,["86"] = 12,["92"] = 13,["98"] = 14,["104"] = 15,["110"] = 16,["115"] = 11,["116"] = 10,["117"] = 11,["119"] = 11});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local AbilityValue = ____eom_ability.AbilityValue
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local TransmitterData = ____eom_modifier.TransmitterData
____exports.omniknight_3 = __TS__Class()
local omniknight_3 = ____exports.omniknight_3
omniknight_3.name = "omniknight_3"
__TS__ClassExtends(omniknight_3, EOMAbility)
function omniknight_3.prototype.GetIntrinsicModifierName(self)
    return "modifier_omniknight_3"
end
omniknight_3 = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    omniknight_3
)
____exports.omniknight_3 = omniknight_3
____exports.modifier_omniknight_3 = __TS__Class()
local modifier_omniknight_3 = ____exports.modifier_omniknight_3
modifier_omniknight_3.name = "modifier_omniknight_3"
__TS__ClassExtends(modifier_omniknight_3, EOMModifier)
function modifier_omniknight_3.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.earnedStrength = 0
end
function modifier_omniknight_3.prototype.StaticProperty(self)
    return {[PropertyFunction.ATTACKSPEED] = self.bonus_attackspeed, [PropertyFunction.STATS_STRENGTH_BONUS] = self.bonus_str, [PropertyFunction.STATS_STRENGTH_BASE_PERCENTAGE] = self.bonus_str_pct}
end
function modifier_omniknight_3.prototype.DeclareFunctions(self)
    return {MODIFIER_PROPERTY_TOOLTIP}
end
function modifier_omniknight_3.prototype.OnTooltip(self)
    return self.earnedStrength
end
function modifier_omniknight_3.prototype.EventListener(self)
    return {game_reset = function(____, ____bindingPattern0)
        local runId
        runId = ____bindingPattern0.runId
        if runId ~= GameState:GetSession().runId then
            return
        end
        self:SetStackCount(0)
        self.earnedStrength = 0
        self:SendBuffRefreshToClients()
    end}
end
function modifier_omniknight_3.prototype.UnitEventListener(self)
    return {attack_landed = {source = function(____, ____bindingPattern0)
        local attack_states
        local target
        target = ____bindingPattern0.target
        attack_states = ____bindingPattern0.attack_states
        if bit.band(attack_states or 0, ATTACK_STATES.SKIPCOUNTING) ~= 0 or self.attack_count <= 0 then
            return
        end
        local parent = self:GetParent()
        local next = self:GetStackCount() + 1
        if next >= self.attack_count and parent:HasModifier("modifier_omniknight_01") then
            local thunder = parent:FindAbilityByName("omniknight_0")
            if IsValid(thunder) then
                thunder:Action(target, true)
            end
        end
        if next >= self.attack_count then
            self:SetStackCount(0)
            if parent:AddPermanentAttribute("CUSTOM_ATTRIBUTE_STRENGTH", 1) then
                self.earnedStrength = self.earnedStrength + 1
                self:SendBuffRefreshToClients()
            end
        else
            self:SetStackCount(next)
        end
    end}}
end
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_3.prototype,
    "bonus_attackspeed",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_3.prototype,
    "bonus_str",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_3.prototype,
    "bonus_str_pct",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_3.prototype,
    "attack_count",
    nil
)
__TS__DecorateLegacy(
    {TransmitterData(nil)},
    modifier_omniknight_3.prototype,
    "earnedStrength",
    nil
)
modifier_omniknight_3 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false, RemoveOnDeath = false, AllowIllusionDuplicate = true})},
    modifier_omniknight_3
)
____exports.modifier_omniknight_3 = modifier_omniknight_3
return ____exports
