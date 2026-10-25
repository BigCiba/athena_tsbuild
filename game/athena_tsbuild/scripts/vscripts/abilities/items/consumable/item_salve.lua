local __TSTL_FILE_PATH__ = "abilities/items/consumable/item_salve"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 3,["13"] = 3,["14"] = 3,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 8,["21"] = 9,["22"] = 9,["23"] = 9,["24"] = 9,["27"] = 10,["28"] = 10,["29"] = 11,["30"] = 12,["31"] = 12,["32"] = 12,["33"] = 12,["34"] = 12,["35"] = 13,["36"] = 13,["37"] = 13,["38"] = 13,["39"] = 13,["40"] = 13,["41"] = 13,["42"] = 13,["43"] = 13,["46"] = 14,["47"] = 14,["48"] = 7,["49"] = 17,["50"] = 17,["51"] = 17,["52"] = 17,["53"] = 17,["54"] = 17,["55"] = 17,["57"] = 17,["58"] = 18,["59"] = 18,["60"] = 18,["61"] = 18,["62"] = 18,["63"] = 18,["64"] = 18,["66"] = 18,["67"] = 19,["68"] = 19,["69"] = 19,["70"] = 19,["71"] = 19,["72"] = 19,["73"] = 19,["75"] = 19,["76"] = 20,["77"] = 20,["78"] = 20,["79"] = 20,["80"] = 20,["81"] = 20,["82"] = 20,["84"] = 20,["85"] = 21,["86"] = 21,["87"] = 21,["89"] = 21,["90"] = 22,["91"] = 21,["92"] = 23,["93"] = 23,["94"] = 23,["95"] = 24,["96"] = 24,["97"] = 24,["98"] = 25,["99"] = 25,["100"] = 25,["101"] = 27,["102"] = 27,["103"] = 27,["104"] = 27,["105"] = 27,["106"] = 27,["107"] = 27,["109"] = 27,["110"] = 28,["111"] = 28,["112"] = 28,["113"] = 28,["114"] = 28,["115"] = 28,["116"] = 28,["118"] = 28,["119"] = 29,["120"] = 29,["121"] = 29,["122"] = 29,["123"] = 29,["124"] = 29,["125"] = 29,["127"] = 29,["128"] = 30,["129"] = 30,["130"] = 30,["131"] = 30,["132"] = 30,["133"] = 30,["134"] = 30,["136"] = 30});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 原版药水：同种延长持续时间，不同档分别提供回复来源；最后一层消耗后 buff 保留数值。
local Salve = __TS__Class()
Salve.name = "Salve"
__TS__ClassExtends(Salve, EOMItem)
function Salve.prototype.OnSpellStart(self)
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
            rate = self:GetSpecialValueFor("hp_per_tick")
        }
    )) then
        return
    end
    hero:EmitSound("DOTA_Item.HealingSalve.Activate")
    Items:SpendCharge(self)
end
____exports.item_salve1 = __TS__Class()
local item_salve1 = ____exports.item_salve1
item_salve1.name = "item_salve1"
__TS__ClassExtends(item_salve1, Salve)
item_salve1 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_salve1
)
____exports.item_salve1 = item_salve1
____exports.item_salve2 = __TS__Class()
local item_salve2 = ____exports.item_salve2
item_salve2.name = "item_salve2"
__TS__ClassExtends(item_salve2, Salve)
item_salve2 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_salve2
)
____exports.item_salve2 = item_salve2
____exports.item_salve3 = __TS__Class()
local item_salve3 = ____exports.item_salve3
item_salve3.name = "item_salve3"
__TS__ClassExtends(item_salve3, Salve)
item_salve3 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_salve3
)
____exports.item_salve3 = item_salve3
____exports.item_salve4 = __TS__Class()
local item_salve4 = ____exports.item_salve4
item_salve4.name = "item_salve4"
__TS__ClassExtends(item_salve4, Salve)
item_salve4 = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_salve4
)
____exports.item_salve4 = item_salve4
local SalveModifier = __TS__Class()
SalveModifier.name = "SalveModifier"
__TS__ClassExtends(SalveModifier, EOMModifier)
function SalveModifier.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.rate = 0
end
function SalveModifier.prototype.OnCreated(self, params)
    self.rate = params.rate or 0
end
function SalveModifier.prototype.IsPurgable(self)
    return true
end
function SalveModifier.prototype.StaticProperty(self)
    return {[PropertyFunction.HEALTH_REGEN_CONSTANT] = self.rate}
end
____exports.modifier_item_salve1 = __TS__Class()
local modifier_item_salve1 = ____exports.modifier_item_salve1
modifier_item_salve1.name = "modifier_item_salve1"
__TS__ClassExtends(modifier_item_salve1, SalveModifier)
modifier_item_salve1 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_salve1
)
____exports.modifier_item_salve1 = modifier_item_salve1
____exports.modifier_item_salve2 = __TS__Class()
local modifier_item_salve2 = ____exports.modifier_item_salve2
modifier_item_salve2.name = "modifier_item_salve2"
__TS__ClassExtends(modifier_item_salve2, SalveModifier)
modifier_item_salve2 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_salve2
)
____exports.modifier_item_salve2 = modifier_item_salve2
____exports.modifier_item_salve3 = __TS__Class()
local modifier_item_salve3 = ____exports.modifier_item_salve3
modifier_item_salve3.name = "modifier_item_salve3"
__TS__ClassExtends(modifier_item_salve3, SalveModifier)
modifier_item_salve3 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_salve3
)
____exports.modifier_item_salve3 = modifier_item_salve3
____exports.modifier_item_salve4 = __TS__Class()
local modifier_item_salve4 = ____exports.modifier_item_salve4
modifier_item_salve4.name = "modifier_item_salve4"
__TS__ClassExtends(modifier_item_salve4, SalveModifier)
modifier_item_salve4 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_item_salve4
)
____exports.modifier_item_salve4 = modifier_item_salve4
return ____exports
