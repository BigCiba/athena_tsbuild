local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_common"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayPush = ____lualib.__TS__ArrayPush
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 1,["13"] = 4,["14"] = 5,["15"] = 4,["16"] = 5,["18"] = 5,["19"] = 6,["20"] = 7,["21"] = 8,["22"] = 9,["23"] = 10,["24"] = 11,["25"] = 12,["26"] = 13,["27"] = 14,["28"] = 15,["29"] = 16,["30"] = 17,["31"] = 4,["32"] = 19,["33"] = 20,["34"] = 20,["35"] = 21,["36"] = 21,["37"] = 21,["39"] = 21,["40"] = 21,["41"] = 21,["43"] = 21,["44"] = 22,["45"] = 22,["46"] = 22,["47"] = 22,["48"] = 23,["49"] = 24,["50"] = 25,["51"] = 25,["52"] = 25,["53"] = 25,["54"] = 26,["55"] = 27,["56"] = 28,["57"] = 29,["58"] = 31,["59"] = 32,["60"] = 33,["61"] = 34,["62"] = 19,["63"] = 36,["64"] = 37,["65"] = 37,["66"] = 37,["67"] = 37,["68"] = 37,["69"] = 37,["70"] = 37,["71"] = 37,["72"] = 37,["73"] = 37,["74"] = 37,["75"] = 37,["76"] = 37,["77"] = 36,["78"] = 52,["79"] = 52,["80"] = 52,["82"] = 53,["83"] = 54,["86"] = 55,["87"] = 56,["88"] = 57,["89"] = 57,["90"] = 57,["91"] = 57,["92"] = 58,["93"] = 58,["94"] = 58,["95"] = 58,["96"] = 58,["97"] = 58,["98"] = 58,["99"] = 58,["100"] = 59,["101"] = 60,["102"] = 60,["103"] = 61,["104"] = 62,["105"] = 62,["107"] = 63,["108"] = 63,["109"] = 64,["110"] = 65,["111"] = 65,["112"] = 66,["113"] = 67,["114"] = 52,["115"] = 69,["116"] = 70,["117"] = 71,["118"] = 71,["120"] = 70,["121"] = 69,["122"] = 74,["123"] = 75,["124"] = 75,["125"] = 75,["126"] = 75,["127"] = 75,["128"] = 75,["129"] = 75,["130"] = 75,["131"] = 75,["132"] = 75,["133"] = 81,["134"] = 81,["135"] = 81,["136"] = 81,["137"] = 81,["138"] = 81,["139"] = 81,["140"] = 81,["141"] = 81,["142"] = 81,["144"] = 86,["145"] = 74,["146"] = 89,["147"] = 89,["148"] = 89,["149"] = 90,["150"] = 90,["151"] = 90,["152"] = 91,["153"] = 91,["154"] = 91,["155"] = 92,["156"] = 92,["157"] = 92,["158"] = 93,["159"] = 93,["160"] = 93,["161"] = 94,["162"] = 94,["163"] = 94,["164"] = 95,["165"] = 95,["166"] = 95,["167"] = 96,["168"] = 96,["169"] = 96,["170"] = 97,["171"] = 97,["172"] = 97,["173"] = 98,["174"] = 98,["175"] = 98,["176"] = 99,["177"] = 100,["178"] = 101,["179"] = 99,["180"] = 103,["181"] = 104,["182"] = 104,["183"] = 104,["184"] = 104,["185"] = 104,["186"] = 104,["187"] = 104,["188"] = 104,["189"] = 104,["190"] = 104,["192"] = 103,["193"] = 106,["194"] = 107,["197"] = 108,["198"] = 108,["199"] = 108,["200"] = 108,["201"] = 108,["202"] = 108,["203"] = 108,["204"] = 108,["205"] = 108,["206"] = 109,["207"] = 110,["208"] = 111,["209"] = 111,["212"] = 113,["213"] = 114,["214"] = 115,["215"] = 115,["216"] = 115,["217"] = 115,["218"] = 115,["219"] = 115,["220"] = 115,["221"] = 115,["223"] = 106,["224"] = 118,["225"] = 119,["226"] = 119,["227"] = 119,["228"] = 119,["229"] = 119,["230"] = 119,["231"] = 119,["232"] = 119,["233"] = 119,["234"] = 119,["236"] = 118,["237"] = 121,["238"] = 122,["239"] = 123,["240"] = 123,["242"] = 121,["243"] = 5,["244"] = 4,["245"] = 4,["246"] = 4,["247"] = 4,["248"] = 4,["249"] = 4,["250"] = 4,["251"] = 4,["252"] = 5,["254"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- c1 公共属性入口；优先使用 Athena 自定义字段，兼容普通 Dota/c1 KV。
____exports.modifier_common = __TS__Class()
local modifier_common = ____exports.modifier_common
modifier_common.name = "modifier_common"
__TS__ClassExtends(modifier_common, EOMModifier)
function modifier_common.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.health = 1
    self.mana = 0
    self.attack = 0
    self.armor = 0
    self.reduction = 0
    self.critChance = 0
    self.critDamage = 0
    self.attackCritChance = 0
    self.attackCritDamage = 0
    self.spellCritChance = 0
    self.spellCritDamage = 0
    self.initialized = false
end
function modifier_common.prototype.OnCreated(self)
    local unit = self:GetParent()
    local name = unit:GetUnitName()
    local ____KeyValues_heroes_name_0 = KeyValues.heroes[name]
    if ____KeyValues_heroes_name_0 == nil then
        ____KeyValues_heroes_name_0 = KeyValues.units[name]
    end
    local ____KeyValues_heroes_name_0_1 = ____KeyValues_heroes_name_0
    if ____KeyValues_heroes_name_0_1 == nil then
        ____KeyValues_heroes_name_0_1 = {}
    end
    local kv = ____KeyValues_heroes_name_0_1
    self.health = math.max(
        1,
        tonumber(kv.CustomStatusHealth) or tonumber(kv.StatusHealth) or unit:GetMaxHealth_Engine()
    )
    self.mana = tonumber(kv.StatusMana) or unit:GetMaxMana_Engine()
    local attack = tonumber(kv.AttackDamage)
    self.attack = attack or RandomFloat(
        tonumber(kv.AttackDamageMin) or unit:GetBaseDamageMin(),
        tonumber(kv.AttackDamageMax) or unit:GetBaseDamageMax()
    )
    self.armor = tonumber(kv.Armor) or tonumber(kv.ArmorPhysical) or unit:GetPhysicalArmorBaseValue()
    self.reduction = tonumber(kv.DamageReduction) or 0
    self.critChance = tonumber(kv.CritChance) or 0
    self.critDamage = tonumber(kv.CritDamage) or 0
    self.attackCritChance = tonumber(kv.PhysicalCritChance) or 0
    self.attackCritDamage = tonumber(kv.PhysicalCritDamage) or 0
    self.spellCritChance = tonumber(kv.MagicalCritChance) or 0
    self.spellCritDamage = tonumber(kv.MagicalCritDamage) or 0
end
function modifier_common.prototype.StaticProperty(self)
    return {
        [PropertyFunction.BASE_HEALTH] = self.health,
        [PropertyFunction.BASE_MANA] = self.mana,
        [PropertyFunction.BASE_ATTACK] = self.attack,
        [PropertyFunction.PHYSICAL_ARMOR] = self.armor,
        [PropertyFunction.DAMAGE_REDUCTION] = self.reduction,
        [PropertyFunction.CRIT_CHANCE] = self.critChance,
        [PropertyFunction.CRIT_DAMAGE] = self.critDamage,
        [PropertyFunction.ATTACK_CRIT_CHANCE] = self.attackCritChance,
        [PropertyFunction.ATTACK_CRIT_DAMAGE] = self.attackCritDamage,
        [PropertyFunction.SPELL_CRIT_CHANCE] = self.spellCritChance,
        [PropertyFunction.SPELL_CRIT_DAMAGE] = self.spellCritDamage
    }
end
function modifier_common.prototype.SyncStats(self, fill)
    if fill == nil then
        fill = false
    end
    local unit = self:GetParent()
    if not IsServer() or not IsValid(unit) or not unit:IsAlive() or self._bDestroyed then
        return
    end
    local full = fill or not self.initialized
    local healthPercent = unit:GetHealthPercent_Engine() * 0.01
    local manaPercent = unit:GetMana() / math.max(
        1,
        unit:GetMaxMana_Engine()
    )
    local health = math.max(
        1,
        unit:GetMaxHealth()
    )
    local mana = math.max(
        0,
        unit:GetMaxMana()
    )
    if not LargeNumberHealth:Refresh(unit) then
        unit:SetBaseMaxHealth(health)
        unit:SetMaxHealth(health)
        unit:SetHealth(full and health or math.max(1, health * healthPercent))
    elseif full then
        unit:SetHealth(health)
    end
    unit:SetMaxMana(mana)
    unit:SetMana(full and mana or mana * manaPercent)
    local attack = unit:GetAttackDamage()
    unit:SetBaseDamageMin(attack)
    unit:SetBaseDamageMax(attack)
    unit:SetPhysicalArmorBaseValue(unit:GetProperty(PropertyFunction.PHYSICAL_ARMOR))
    self.initialized = true
end
function modifier_common.prototype.EventListener(self)
    return {property_changed = function(____, event)
        if event.scope == PropertyScope.UNIT and event.key == self:GetParent():entindex() then
            self:SyncStats()
        end
    end}
end
function modifier_common.prototype.DeclareFunctions(self)
    local functions = {
        MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE,
        MODIFIER_PROPERTY_EVASION_CONSTANT,
        MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
        MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
        MODIFIER_PROPERTY_DISABLE_AUTOATTACK
    }
    if self:GetParent():IsRealHero() then
        __TS__ArrayPush(
            functions,
            MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET,
            MODIFIER_EVENT_ON_ABILITY_FULLY_CAST,
            MODIFIER_EVENT_ON_ABILITY_START,
            MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE,
            MODIFIER_EVENT_ON_SPENT_MANA,
            MODIFIER_EVENT_ON_ABILITY_END_CHANNEL
        )
    end
    return functions
end
function modifier_common.prototype.CheckState(self)
    return {[MODIFIER_STATE_NO_HEALTH_BAR] = false}
end
function modifier_common.prototype.GetDisableAutoAttack(self)
    return 1
end
function modifier_common.prototype.GetModifierMoveSpeed_MaxOverride(self)
    return 8000
end
function modifier_common.prototype.GetModifierMoveSpeedBonus_Constant(self)
    return GetMovespeed(self:GetParent()) + GetMovespeedNotCalculated(self:GetParent())
end
function modifier_common.prototype.GetModifierMoveSpeedBonus_Percentage(self)
    return GetMovespeedAmplify(self:GetParent())
end
function modifier_common.prototype.GetModifierAttackSpeedBonus_Constant(self)
    return GetAttackspeed(self:GetParent())
end
function modifier_common.prototype.GetModifierAttackSpeedPercentage(self)
    return -GetAttackspeedReduction(self:GetParent())
end
function modifier_common.prototype.GetModifierEvasion_Constant(self)
    return GetEvasion(self:GetParent())
end
function modifier_common.prototype.GetModifierPercentageCooldown(self)
    return GetCooldownReduction(self:GetParent())
end
function modifier_common.prototype.GetModifierHealAmplify_PercentageTarget(self)
    return GetHealAmplify(self:GetParent())
end
function modifier_common.prototype.GetModifierAttackRangeBonus(self)
    local unit = self:GetParent()
    return GetAttackRange(unit) + (unit:IsRangedAttacker() and GetAttackRangeRanger(unit) or GetAttackRangeMelee(unit))
end
function modifier_common.prototype.OnAbilityStart(self, event)
    if event.unit == self:GetParent() then
        Event:Fire(
            "ability_cast_start",
            {
                ability = event.ability,
                caster = event.unit,
                position = event.ability:GetCursorPosition(),
                abilityTag = event.ability:GetAbilityTag()
            }
        )
    end
end
function modifier_common.prototype.OnAbilityFullyCast(self, event)
    if event.unit ~= self:GetParent() then
        return
    end
    Event:Fire(
        "ability_cast_complete",
        {
            ability = event.ability,
            caster = event.unit,
            position = event.ability:GetCursorPosition(),
            abilityTag = event.ability:GetAbilityTag()
        }
    )
    if event.ability:UseCharges() then
        event.ability:EndCooldown()
        if event.ability:GetCharges() == 0 then
            event.ability:StartCooldown(event.ability.__ChargeRestoreTime - GameRules:GetGameTime())
        end
    end
    if event.ability:GetCastCooldown() > 0 then
        event.ability:SetActivated(false)
        self:StartThink(
            event.ability:GetCastCooldown(),
            DoUniqueString("CastCooldown"),
            function()
                event.ability:SetActivated(true)
                return -1
            end
        )
    end
end
function modifier_common.prototype.OnAbilityEndChannel(self, event)
    if event.unit == self:GetParent() then
        Event:Fire(
            "ability_end_channel",
            {
                ability = event.ability,
                caster = event.unit,
                position = event.ability:GetCursorPosition(),
                abilityTag = event.ability:GetAbilityTag()
            }
        )
    end
end
function modifier_common.prototype.OnSpentMana(self, event)
    local cost = event.cost
    if event.unit == self:GetParent() and cost > 0 then
        Event:Fire("spent_mana", {unit = event.unit, ability = event.ability, cost = cost})
    end
end
modifier_common = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {
        IsHidden = true,
        IsDebuff = false,
        IsPurgable = false,
        IsPurgeException = false,
        AllowIllusionDuplicate = false,
        RemoveOnDeath = false
    })},
    modifier_common
)
____exports.modifier_common = modifier_common
return ____exports
