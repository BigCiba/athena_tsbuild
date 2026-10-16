local __TSTL_FILE_PATH__ = "modifiers/modifier_neutral"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 8,["17"] = 8,["18"] = 8,["19"] = 9,["20"] = 9,["21"] = 9,["22"] = 10,["23"] = 10,["24"] = 10,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 12,["29"] = 12,["30"] = 12,["31"] = 13,["32"] = 13,["33"] = 13,["34"] = 14,["35"] = 15,["36"] = 16,["37"] = 16,["39"] = 14,["40"] = 19,["41"] = 20,["42"] = 21,["43"] = 21,["46"] = 22,["47"] = 23,["48"] = 24,["49"] = 25,["50"] = 25,["52"] = 26,["53"] = 26,["54"] = 26,["57"] = 27,["59"] = 28,["60"] = 29,["61"] = 30,["62"] = 30,["63"] = 30,["64"] = 30,["65"] = 30,["66"] = 30,["67"] = 30,["68"] = 30,["69"] = 30,["70"] = 30,["71"] = 30,["72"] = 33,["73"] = 33,["75"] = 34,["78"] = 35,["80"] = 19,["81"] = 5,["82"] = 4,["83"] = 5,["85"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 原版营地返回规则：追击离出生点超过 400 持续 5 秒后返回，空闲时自动回营。
____exports.modifier_neutral = __TS__Class()
local modifier_neutral = ____exports.modifier_neutral
modifier_neutral.name = "modifier_neutral"
__TS__ClassExtends(modifier_neutral, EOMModifier)
function modifier_neutral.prototype.IsHidden(self)
    return true
end
function modifier_neutral.prototype.IsPurgable(self)
    return false
end
function modifier_neutral.prototype.RemoveOnDeath(self)
    return false
end
function modifier_neutral.prototype.GetPriority(self)
    return MODIFIER_PRIORITY_HIGH
end
function modifier_neutral.prototype.CheckState(self)
    return {[MODIFIER_STATE_NO_HEALTH_BAR] = false}
end
function modifier_neutral.prototype.StaticState(self)
    return {[StateEnum.NO_HEALTH_BAR] = true}
end
function modifier_neutral.prototype.OnCreated(self)
    if IsServer() and self:GetParent():HasMovementCapability() then
        self.camp = self:GetParent():GetAbsOrigin()
        self:StartIntervalThink(0.1)
    end
end
function modifier_neutral.prototype.OnIntervalThink(self)
    local unit = self:GetParent()
    if self.camp == nil or not unit:IsAlive() or unit:IsFeared() or unit:HasState(StateEnum.FEAR) or unit:IsStunned() then
        self.returnAt = nil
        return
    end
    local distance = (unit:GetAbsOrigin() - self.camp):Length2D()
    if IsValid(unit:GetAggroTarget()) then
        if distance > 400 then
            if self.returnAt == nil then
                self.returnAt = GameRules:GetGameTime() + 5
            end
            if GameRules:GetGameTime() >= self.returnAt then
                unit:MoveToPosition(self.camp)
                self.returnAt = nil
            end
        else
            self.returnAt = nil
        end
    elseif distance > 0 then
        self.returnAt = nil
        local targets = FindUnitsInRadius(
            unit:GetTeamNumber(),
            unit:GetAbsOrigin(),
            nil,
            unit:Script_GetAttackRange(),
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_CLOSEST,
            false
        )
        if #targets == 0 then
            unit:MoveToPosition(self.camp)
        else
            unit:MoveToPositionAggressive(unit:GetAbsOrigin())
        end
    else
        self.returnAt = nil
    end
end
modifier_neutral = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_neutral
)
____exports.modifier_neutral = modifier_neutral
return ____exports
