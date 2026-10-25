local __TSTL_FILE_PATH__ = "abilities/items/essence/essence"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 2,["13"] = 2,["14"] = 3,["15"] = 3,["16"] = 3,["18"] = 6,["19"] = 6,["20"] = 6,["21"] = 7,["22"] = 7,["23"] = 7,["24"] = 8,["25"] = 9,["26"] = 10,["29"] = 11,["30"] = 11,["31"] = 11,["32"] = 11,["33"] = 11,["34"] = 12,["35"] = 12,["36"] = 12,["37"] = 12,["38"] = 12,["39"] = 12,["40"] = 12,["42"] = 8,["43"] = 14,["44"] = 15,["45"] = 16,["48"] = 17,["49"] = 17,["50"] = 18,["51"] = 19,["52"] = 20,["53"] = 20,["54"] = 20,["55"] = 20,["56"] = 21,["57"] = 21,["58"] = 21,["59"] = 21,["60"] = 21,["61"] = 21,["63"] = 22,["65"] = 14,["66"] = 25,["68"] = 25,["69"] = 25,["70"] = 25,["71"] = 25,["72"] = 25,["73"] = 25,["74"] = 25,["78"] = 26,["79"] = 27,["80"] = 27,["81"] = 27,["82"] = 28,["83"] = 29,["84"] = 29,["85"] = 29,["87"] = 30,["88"] = 30,["89"] = 31,["90"] = 32,["91"] = 32,["92"] = 32,["93"] = 32,["94"] = 33,["95"] = 33,["98"] = 30,["101"] = 37,["102"] = 37,["103"] = 37,["104"] = 37,["105"] = 37,["106"] = 37,["107"] = 37,["109"] = 29,["110"] = 29,["111"] = 28,["112"] = 41,["113"] = 41,["114"] = 41,["115"] = 41,["116"] = 41,["117"] = 41,["118"] = 41,["120"] = 41,["121"] = 42,["122"] = 42,["123"] = 42,["124"] = 42,["125"] = 42,["126"] = 42,["127"] = 42,["129"] = 42,["130"] = 43,["131"] = 43,["132"] = 43,["133"] = 43,["134"] = 43,["135"] = 43,["136"] = 43,["138"] = 43,["139"] = 44,["140"] = 45,["141"] = 44,["142"] = 45,["143"] = 46,["144"] = 47,["145"] = 48,["146"] = 48,["147"] = 49,["148"] = 49,["151"] = 50,["152"] = 50,["153"] = 50,["154"] = 50,["156"] = 50,["159"] = 51,["160"] = 47,["161"] = 53,["162"] = 53,["163"] = 53,["164"] = 53,["165"] = 53,["166"] = 53,["167"] = 53,["168"] = 53,["169"] = 53,["170"] = 46,["171"] = 45,["172"] = 44,["173"] = 45,["175"] = 45});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 精华掉落与原版精髓：首次拾取生成力量精髓，后续充能升级，可主动循环三种偏向。
local Essence = __TS__Class()
Essence.name = "Essence"
__TS__ClassExtends(Essence, EOMItem)
function Essence.prototype.GetIntrinsicModifierName(self)
    return "modifier_essence"
end
function Essence.prototype.OnSpellStart(self)
    local hero = self:GetCaster()
    if not Items:Owns(hero, self) then
        return
    end
    local parts = __TS__StringSplit(
        self:GetAbilityName(),
        "_"
    )
    local modes = {str = "agi", agi = "int", int = "str"}
    if modes[parts[3]] then
        Items:Replace(
            hero,
            self,
            (("item_essence_" .. modes[parts[3]]) .. "_") .. parts[4],
            self:GetCurrentCharges()
        )
    end
end
function Essence.prototype.AddCharges(self, amount)
    local hero = self:GetCaster()
    if not Items:Owns(hero, self) then
        return
    end
    local required = self:GetSpecialValueFor("require_count")
    local level = self:GetLevel()
    local total = self:GetCurrentCharges() + amount
    if required > 0 and total >= required and level < 15 then
        local parts = __TS__StringSplit(
            self:GetAbilityName(),
            "_"
        )
        Items:Replace(
            hero,
            self,
            (("item_essence_" .. parts[3]) .. "_") .. tostring(level + 1),
            total - required
        )
    else
        self:SetCurrentCharges(total)
    end
end
for ____, mode in ipairs({"str", "agi", "int"}) do
    do
        local level = 1
        while level <= 15 do
            registerAbility(
                nil,
                (("item_essence_" .. mode) .. "_") .. tostring(level)
            )(nil, Essence)
            level = level + 1
        end
    end
end
registerAbility(nil, "item_essence_core")(nil, Essence)
local EssenceDrop = __TS__Class()
EssenceDrop.name = "EssenceDrop"
__TS__ClassExtends(EssenceDrop, EOMItem)
function EssenceDrop.prototype.OnSpellStart(self)
    Items:UsePickup(
        self,
        function(____, hero)
            do
                local slot = 0
                while slot < 6 do
                    local item = hero:GetItemInSlot(slot)
                    if IsValid(item) and item ~= self and __TS__StringStartsWith(
                        item:GetAbilityName(),
                        "item_essence_"
                    ) and item:GetLevel() < 15 and item.AddCharges ~= nil then
                        item:AddCharges(self:GetSpecialValueFor("charges"))
                        Items:Destroy(self)
                        return
                    end
                    slot = slot + 1
                end
            end
            if Items:Grant(
                hero:GetPlayerOwnerID(),
                "item_essence_str_1",
                1,
                self.__itemRunId
            ) then
                Items:Destroy(self)
            end
        end
    )
end
____exports.item_essence_small = __TS__Class()
local item_essence_small = ____exports.item_essence_small
item_essence_small.name = "item_essence_small"
__TS__ClassExtends(item_essence_small, EssenceDrop)
item_essence_small = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_essence_small
)
____exports.item_essence_small = item_essence_small
____exports.item_essence_medium = __TS__Class()
local item_essence_medium = ____exports.item_essence_medium
item_essence_medium.name = "item_essence_medium"
__TS__ClassExtends(item_essence_medium, EssenceDrop)
item_essence_medium = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_essence_medium
)
____exports.item_essence_medium = item_essence_medium
____exports.item_essence_big = __TS__Class()
local item_essence_big = ____exports.item_essence_big
item_essence_big.name = "item_essence_big"
__TS__ClassExtends(item_essence_big, EssenceDrop)
item_essence_big = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_essence_big
)
____exports.item_essence_big = item_essence_big
____exports.modifier_essence = __TS__Class()
local modifier_essence = ____exports.modifier_essence
modifier_essence.name = "modifier_essence"
__TS__ClassExtends(modifier_essence, EOMModifier)
function modifier_essence.prototype.DynamicProperty(self)
    local function value(____, field)
        local ability = self:GetAbility()
        local hero = self:GetParent()
        if not IsValid(ability) then
            return 0
        end
        do
            local slot = 0
            while slot < 6 do
                if hero:GetItemInSlot(slot) == ability then
                    return ability:GetSpecialValueFor(field)
                end
                slot = slot + 1
            end
        end
        return 0
    end
    return {
        [PropertyFunction.STATS_STRENGTH_BONUS] = function() return value(nil, "str") end,
        [PropertyFunction.STATS_AGILITY_BONUS] = function() return value(nil, "agi") end,
        [PropertyFunction.STATS_INTELLECT_BONUS] = function() return value(nil, "int") end,
        [PropertyFunction.HEALTH] = function() return value(nil, "hp") end,
        [PropertyFunction.MANA] = function() return value(nil, "mp") end,
        [PropertyFunction.HEALTH_REGEN_CONSTANT] = function() return value(nil, "hp_regen") end,
        [PropertyFunction.MANA_REGEN_CONSTANT] = function() return value(nil, "mp_regen") end
    }
end
modifier_essence = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false, RemoveOnDeath = false, GetAttributes = MODIFIER_ATTRIBUTE_MULTIPLE})},
    modifier_essence
)
____exports.modifier_essence = modifier_essence
return ____exports
