local __TSTL_FILE_PATH__ = "abilities/items/weapon/item_jia"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 3,["13"] = 3,["14"] = 3,["15"] = 5,["16"] = 5,["17"] = 5,["18"] = 5,["19"] = 5,["20"] = 5,["21"] = 6,["22"] = 6,["23"] = 6,["24"] = 6,["25"] = 6,["26"] = 6,["27"] = 6,["29"] = 6,["30"] = 7,["31"] = 7,["32"] = 7,["33"] = 7,["34"] = 7,["35"] = 7,["36"] = 7,["38"] = 7,["39"] = 8,["40"] = 8,["41"] = 8,["42"] = 8,["43"] = 8,["44"] = 8,["45"] = 8,["47"] = 8,["48"] = 9,["49"] = 9,["50"] = 9,["51"] = 9,["52"] = 9,["53"] = 9,["54"] = 9,["56"] = 9,["57"] = 10,["58"] = 10,["59"] = 10,["60"] = 10,["61"] = 10,["62"] = 10,["63"] = 10,["65"] = 10,["66"] = 11,["67"] = 12,["68"] = 11,["69"] = 12,["70"] = 13,["71"] = 13,["72"] = 13,["73"] = 14,["74"] = 14,["75"] = 14,["76"] = 12,["77"] = 11,["78"] = 12,["80"] = 12});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local Armor = __TS__Class()
Armor.name = "Armor"
__TS__ClassExtends(Armor, EOMItem)
function Armor.prototype.GetIntrinsicModifierName(self)
    return "modifier_item_jia"
end
____exports.item_jia_1 = __TS__Class()
local item_jia_1 = ____exports.item_jia_1
item_jia_1.name = "item_jia_1"
__TS__ClassExtends(item_jia_1, Armor)
item_jia_1 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_jia_1
)
____exports.item_jia_1 = item_jia_1
____exports.item_jia_2 = __TS__Class()
local item_jia_2 = ____exports.item_jia_2
item_jia_2.name = "item_jia_2"
__TS__ClassExtends(item_jia_2, Armor)
item_jia_2 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_jia_2
)
____exports.item_jia_2 = item_jia_2
____exports.item_jia_3 = __TS__Class()
local item_jia_3 = ____exports.item_jia_3
item_jia_3.name = "item_jia_3"
__TS__ClassExtends(item_jia_3, Armor)
item_jia_3 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_jia_3
)
____exports.item_jia_3 = item_jia_3
____exports.item_jia_4 = __TS__Class()
local item_jia_4 = ____exports.item_jia_4
item_jia_4.name = "item_jia_4"
__TS__ClassExtends(item_jia_4, Armor)
item_jia_4 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_jia_4
)
____exports.item_jia_4 = item_jia_4
____exports.item_jia_5 = __TS__Class()
local item_jia_5 = ____exports.item_jia_5
item_jia_5.name = "item_jia_5"
__TS__ClassExtends(item_jia_5, Armor)
item_jia_5 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_jia_5
)
____exports.item_jia_5 = item_jia_5
____exports.modifier_item_jia = __TS__Class()
local modifier_item_jia = ____exports.modifier_item_jia
modifier_item_jia.name = "modifier_item_jia"
__TS__ClassExtends(modifier_item_jia, EOMModifier)
function modifier_item_jia.prototype.DeclareFunctions(self)
    return {MODIFIER_PROPERTY_AVOID_DAMAGE}
end
function modifier_item_jia.prototype.GetModifierAvoidDamage(self)
    return RollPercentage(self:GetAbilitySpecialValueFor("avoid_chance")) and 1 or 0
end
modifier_item_jia = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false, RemoveOnDeath = false})},
    modifier_item_jia
)
____exports.modifier_item_jia = modifier_item_jia
return ____exports
