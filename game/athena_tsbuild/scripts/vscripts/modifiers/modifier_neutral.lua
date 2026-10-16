local __TSTL_FILE_PATH__ = "modifiers/modifier_neutral"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 8,["17"] = 8,["18"] = 8,["19"] = 9,["20"] = 9,["21"] = 9,["22"] = 10,["23"] = 10,["24"] = 10,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 12,["29"] = 12,["30"] = 12,["31"] = 13,["32"] = 14,["33"] = 15,["34"] = 15,["36"] = 13,["37"] = 18,["38"] = 19,["39"] = 20,["40"] = 20,["43"] = 21,["44"] = 22,["45"] = 23,["46"] = 24,["47"] = 24,["49"] = 25,["50"] = 25,["51"] = 25,["54"] = 26,["56"] = 27,["57"] = 28,["58"] = 29,["59"] = 29,["60"] = 29,["61"] = 29,["62"] = 29,["63"] = 29,["64"] = 29,["65"] = 29,["66"] = 29,["67"] = 29,["68"] = 29,["69"] = 32,["70"] = 32,["72"] = 33,["75"] = 34,["77"] = 18,["78"] = 5,["79"] = 4,["80"] = 5,["82"] = 5});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseModifier = ____dota_ts_adapter.BaseModifier
local registerModifier = ____dota_ts_adapter.registerModifier
--- 原版营地返回规则：追击离出生点超过 400 持续 5 秒后返回，空闲时自动回营。
____exports.modifier_neutral = __TS__Class()
local modifier_neutral = ____exports.modifier_neutral
modifier_neutral.name = "modifier_neutral"
__TS__ClassExtends(modifier_neutral, BaseModifier)
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
function modifier_neutral.prototype.OnCreated(self)
    if IsServer() and self:GetParent():HasMovementCapability() then
        self.camp = self:GetParent():GetAbsOrigin()
        self:StartIntervalThink(0.1)
    end
end
function modifier_neutral.prototype.OnIntervalThink(self)
    local unit = self:GetParent()
    if self.camp == nil or not unit:IsAlive() or unit:IsFeared() or unit:IsStunned() then
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
    {registerModifier(__TSTL_FILE_PATH__)},
    modifier_neutral
)
____exports.modifier_neutral = modifier_neutral
return ____exports
