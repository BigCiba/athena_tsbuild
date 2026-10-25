local __TSTL_FILE_PATH__ = "abilities/items/consumable/item_clarity"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 3,["13"] = 3,["14"] = 3,["15"] = 5,["16"] = 5,["17"] = 5,["18"] = 6,["19"] = 7,["20"] = 8,["21"] = 8,["22"] = 8,["23"] = 8,["26"] = 9,["27"] = 9,["28"] = 10,["29"] = 11,["30"] = 11,["31"] = 11,["32"] = 11,["33"] = 11,["34"] = 12,["35"] = 12,["36"] = 12,["37"] = 12,["38"] = 12,["39"] = 12,["40"] = 12,["41"] = 12,["42"] = 12,["45"] = 13,["46"] = 13,["47"] = 6,["48"] = 16,["49"] = 16,["50"] = 16,["51"] = 16,["52"] = 16,["53"] = 16,["54"] = 16,["56"] = 16,["57"] = 17,["58"] = 17,["59"] = 17,["60"] = 17,["61"] = 17,["62"] = 17,["63"] = 17,["65"] = 17,["66"] = 18,["67"] = 18,["68"] = 18,["69"] = 18,["70"] = 18,["71"] = 18,["72"] = 18,["74"] = 18,["75"] = 19,["76"] = 19,["77"] = 19,["78"] = 19,["79"] = 19,["80"] = 19,["81"] = 19,["83"] = 19,["84"] = 20,["85"] = 20,["86"] = 20,["88"] = 20,["89"] = 21,["90"] = 20,["91"] = 22,["92"] = 22,["93"] = 22,["94"] = 23,["95"] = 23,["96"] = 23,["97"] = 24,["98"] = 24,["99"] = 24,["100"] = 26,["101"] = 26,["102"] = 26,["103"] = 26,["104"] = 26,["105"] = 26,["106"] = 26,["108"] = 26,["109"] = 27,["110"] = 27,["111"] = 27,["112"] = 27,["113"] = 27,["114"] = 27,["115"] = 27,["117"] = 27,["118"] = 28,["119"] = 28,["120"] = 28,["121"] = 28,["122"] = 28,["123"] = 28,["124"] = 28,["126"] = 28,["127"] = 29,["128"] = 29,["129"] = 29,["130"] = 29,["131"] = 29,["132"] = 29,["133"] = 29,["135"] = 29});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local Clarity = __TS__Class()
Clarity.name = "Clarity"
__TS__ClassExtends(Clarity, EOMItem)
function Clarity.prototype.OnSpellStart(self)
    local hero = self:GetCaster()
    if not Items:Owns(hero, self) or Items:Hero(
        hero:GetPlayerOwnerID(),
        self.__itemRunId or 0
    ) ~= hero then
        return
    end
    local name = "modifier_" .. self:GetAbilityName()
    local duration = self:GetSpecialValueFor("buff_duration")
    local existing = hero:FindModifierByName(name)
    if IsValid(existing) then
        existing:SetDuration(
            existing:GetRemainingTime() + duration,
            true
        )
    elseif not IsValid(hero:AddNewModifier(
        hero,
        self,
        name,
        {
            duration = duration,
            rate = self:GetSpecialValueFor("mana_per_tick")
        }
    )) then
        return
    end
    hero:EmitSound("DOTA_Item.ClarityPotion.Activate")
    Items:SpendCharge(self)
end
____exports.item_clarity1 = __TS__Class()
local item_clarity1 = ____exports.item_clarity1
item_clarity1.name = "item_clarity1"
__TS__ClassExtends(item_clarity1, Clarity)
item_clarity1 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_clarity1
)
____exports.item_clarity1 = item_clarity1
____exports.item_clarity2 = __TS__Class()
local item_clarity2 = ____exports.item_clarity2
item_clarity2.name = "item_clarity2"
__TS__ClassExtends(item_clarity2, Clarity)
item_clarity2 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_clarity2
)
____exports.item_clarity2 = item_clarity2
____exports.item_clarity3 = __TS__Class()
local item_clarity3 = ____exports.item_clarity3
item_clarity3.name = "item_clarity3"
__TS__ClassExtends(item_clarity3, Clarity)
item_clarity3 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_clarity3
)
____exports.item_clarity3 = item_clarity3
____exports.item_clarity4 = __TS__Class()
local item_clarity4 = ____exports.item_clarity4
item_clarity4.name = "item_clarity4"
__TS__ClassExtends(item_clarity4, Clarity)
item_clarity4 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_clarity4
)
____exports.item_clarity4 = item_clarity4
local ClarityModifier = __TS__Class()
ClarityModifier.name = "ClarityModifier"
__TS__ClassExtends(ClarityModifier, EOMModifier)
function ClarityModifier.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.rate = 0
end
function ClarityModifier.prototype.OnCreated(self, params)
    self.rate = params.rate or 0
end
function ClarityModifier.prototype.IsPurgable(self)
    return true
end
function ClarityModifier.prototype.StaticProperty(self)
    return {[PropertyFunction.MANA_REGEN_CONSTANT] = self.rate}
end
____exports.modifier_item_clarity1 = __TS__Class()
local modifier_item_clarity1 = ____exports.modifier_item_clarity1
modifier_item_clarity1.name = "modifier_item_clarity1"
__TS__ClassExtends(modifier_item_clarity1, ClarityModifier)
modifier_item_clarity1 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_clarity1
)
____exports.modifier_item_clarity1 = modifier_item_clarity1
____exports.modifier_item_clarity2 = __TS__Class()
local modifier_item_clarity2 = ____exports.modifier_item_clarity2
modifier_item_clarity2.name = "modifier_item_clarity2"
__TS__ClassExtends(modifier_item_clarity2, ClarityModifier)
modifier_item_clarity2 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_clarity2
)
____exports.modifier_item_clarity2 = modifier_item_clarity2
____exports.modifier_item_clarity3 = __TS__Class()
local modifier_item_clarity3 = ____exports.modifier_item_clarity3
modifier_item_clarity3.name = "modifier_item_clarity3"
__TS__ClassExtends(modifier_item_clarity3, ClarityModifier)
modifier_item_clarity3 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_clarity3
)
____exports.modifier_item_clarity3 = modifier_item_clarity3
____exports.modifier_item_clarity4 = __TS__Class()
local modifier_item_clarity4 = ____exports.modifier_item_clarity4
modifier_item_clarity4.name = "modifier_item_clarity4"
__TS__ClassExtends(modifier_item_clarity4, ClarityModifier)
modifier_item_clarity4 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_clarity4
)
____exports.modifier_item_clarity4 = modifier_item_clarity4
return ____exports
