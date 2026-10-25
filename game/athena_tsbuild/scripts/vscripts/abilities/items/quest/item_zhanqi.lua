local __TSTL_FILE_PATH__ = "abilities/items/quest/item_zhanqi"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 3,["13"] = 3,["14"] = 3,["16"] = 6,["17"] = 7,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 7,["22"] = 7,["23"] = 7,["24"] = 6,["25"] = 7,["27"] = 7,["28"] = 8,["29"] = 9,["30"] = 8,["31"] = 9,["32"] = 10,["33"] = 10,["34"] = 10,["35"] = 11,["36"] = 11,["37"] = 11,["38"] = 12,["39"] = 12,["40"] = 12,["41"] = 13,["42"] = 13,["43"] = 13,["44"] = 14,["45"] = 14,["46"] = 14,["47"] = 15,["48"] = 15,["49"] = 15,["50"] = 9,["51"] = 8,["52"] = 9,["54"] = 9,["55"] = 17,["56"] = 18,["57"] = 17,["58"] = 18,["59"] = 19,["60"] = 20,["61"] = 20,["62"] = 20,["63"] = 20,["64"] = 19,["65"] = 18,["66"] = 17,["67"] = 18,["69"] = 18});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 第一条赏金任务的战旗：原版友军基础攻击与攻击速度光环。
____exports.item_zhanqi = __TS__Class()
local item_zhanqi = ____exports.item_zhanqi
item_zhanqi.name = "item_zhanqi"
__TS__ClassExtends(item_zhanqi, EOMItem)
function item_zhanqi.prototype.GetIntrinsicModifierName(self)
    return "modifier_item_zhanqi"
end
item_zhanqi = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_zhanqi
)
____exports.item_zhanqi = item_zhanqi
____exports.modifier_item_zhanqi = __TS__Class()
local modifier_item_zhanqi = ____exports.modifier_item_zhanqi
modifier_item_zhanqi.name = "modifier_item_zhanqi"
__TS__ClassExtends(modifier_item_zhanqi, EOMModifier)
function modifier_item_zhanqi.prototype.IsAura(self)
    return true
end
function modifier_item_zhanqi.prototype.GetAuraRadius(self)
    return self:GetAbilitySpecialValueFor("radius")
end
function modifier_item_zhanqi.prototype.GetAuraSearchTeam(self)
    return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_item_zhanqi.prototype.GetAuraSearchType(self)
    return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_zhanqi.prototype.GetAuraSearchFlags(self)
    return DOTA_UNIT_TARGET_FLAG_NONE
end
function modifier_item_zhanqi.prototype.GetModifierAura(self)
    return "modifier_item_zhanqi_buff"
end
modifier_item_zhanqi = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false, RemoveOnDeath = false})},
    modifier_item_zhanqi
)
____exports.modifier_item_zhanqi = modifier_item_zhanqi
____exports.modifier_item_zhanqi_buff = __TS__Class()
local modifier_item_zhanqi_buff = ____exports.modifier_item_zhanqi_buff
modifier_item_zhanqi_buff.name = "modifier_item_zhanqi_buff"
__TS__ClassExtends(modifier_item_zhanqi_buff, EOMModifier)
function modifier_item_zhanqi_buff.prototype.StaticProperty(self)
    return {
        [PropertyFunction.ATTACK_DAMAGE_BASE_PERCENTAGE] = self:GetAbilitySpecialValueFor("bonus_attack"),
        [PropertyFunction.ATTACKSPEED] = self:GetAbilitySpecialValueFor("bonus_attack_speed")
    }
end
modifier_item_zhanqi_buff = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false})},
    modifier_item_zhanqi_buff
)
____exports.modifier_item_zhanqi_buff = modifier_item_zhanqi_buff
return ____exports
