local __TSTL_FILE_PATH__ = "modifiers/enemy/modifier_enemy_scaling"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 1,["13"] = 4,["14"] = 5,["15"] = 4,["16"] = 5,["18"] = 5,["19"] = 6,["20"] = 7,["21"] = 8,["22"] = 4,["23"] = 9,["24"] = 10,["27"] = 11,["28"] = 12,["29"] = 12,["31"] = 12,["33"] = 12,["34"] = 13,["35"] = 14,["36"] = 15,["37"] = 16,["38"] = 9,["39"] = 18,["40"] = 19,["41"] = 20,["42"] = 20,["43"] = 20,["44"] = 24,["45"] = 24,["47"] = 24,["48"] = 24,["50"] = 24,["51"] = 24,["52"] = 24,["54"] = 24,["55"] = 24,["57"] = 24,["59"] = 24,["60"] = 20,["61"] = 20,["62"] = 18,["64"] = 6,["70"] = 7,["76"] = 8,["81"] = 5,["82"] = 4,["83"] = 5,["85"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local TransmitterData = ____eom_modifier.TransmitterData
--- Athena 敌人的难度、波次和随机成长；只提供加成，不初始化基础属性。
____exports.modifier_enemy_scaling = __TS__Class()
local modifier_enemy_scaling = ____exports.modifier_enemy_scaling
modifier_enemy_scaling.name = "modifier_enemy_scaling"
__TS__ClassExtends(modifier_enemy_scaling, EOMModifier)
function modifier_enemy_scaling.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.healthFactor = 1
    self.attackFactor = 1
    self.armorFactor = 1
end
function modifier_enemy_scaling.prototype.OnCreated(self, params)
    if not IsServer() then
        return
    end
    local difficulty = GameRules:GetCustomGameDifficulty()
    local ____tonumber_2 = tonumber
    local ____opt_0 = KeyValues.units[self:GetParent():GetUnitName()]
    if ____opt_0 ~= nil then
        ____opt_0 = ____opt_0.IsNeutralUnitType
    end
    local neutral = ____tonumber_2(____opt_0) == 1
    local factor = neutral and 1 or 1.5 ^ difficulty * (1 + 0.01 * difficulty) ^ (params.round_number or 1)
    self.healthFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor
    self.armorFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor
    self.attackFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor
end
function modifier_enemy_scaling.prototype.DynamicProperty(self)
    local kv = KeyValues.units[self:GetParent():GetUnitName()]
    return {
        [PropertyFunction.HEALTH] = function() return GetBaseHealth(self:GetParent()) * (self.healthFactor - 1) end,
        [PropertyFunction.ATTACK] = function() return GetBaseAttack(self:GetParent()) * (self.attackFactor - 1) end,
        [PropertyFunction.PHYSICAL_ARMOR] = function()
            local ____tonumber_6 = tonumber
            local ____opt_result_5
            if kv ~= nil then
                ____opt_result_5 = kv.Armor
            end
            local ____tonumber_6_result_11 = ____tonumber_6(____opt_result_5)
            if ____tonumber_6_result_11 == nil then
                local ____tonumber_10 = tonumber
                local ____opt_result_9
                if kv ~= nil then
                    ____opt_result_9 = kv.ArmorPhysical
                end
                ____tonumber_6_result_11 = ____tonumber_10(____opt_result_9)
            end
            return (____tonumber_6_result_11 or 0) * (self.armorFactor - 1)
        end
    }
end
__TS__DecorateLegacy(
    {TransmitterData(nil)},
    modifier_enemy_scaling.prototype,
    "healthFactor",
    nil
)
__TS__DecorateLegacy(
    {TransmitterData(nil)},
    modifier_enemy_scaling.prototype,
    "attackFactor",
    nil
)
__TS__DecorateLegacy(
    {TransmitterData(nil)},
    modifier_enemy_scaling.prototype,
    "armorFactor",
    nil
)
modifier_enemy_scaling = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false, RemoveOnDeath = false})},
    modifier_enemy_scaling
)
____exports.modifier_enemy_scaling = modifier_enemy_scaling
return ____exports
