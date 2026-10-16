local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_common"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayPush = ____lualib.__TS__ArrayPush
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 1,["14"] = 4,["15"] = 5,["16"] = 4,["17"] = 5,["19"] = 5,["20"] = 6,["21"] = 7,["22"] = 8,["23"] = 9,["24"] = 10,["25"] = 11,["26"] = 12,["27"] = 13,["28"] = 14,["29"] = 15,["30"] = 16,["31"] = 17,["32"] = 18,["33"] = 19,["34"] = 4,["35"] = 21,["36"] = 23,["39"] = 24,["40"] = 24,["41"] = 25,["42"] = 25,["43"] = 25,["45"] = 25,["46"] = 25,["47"] = 25,["49"] = 25,["50"] = 26,["51"] = 26,["52"] = 26,["53"] = 26,["54"] = 27,["55"] = 28,["56"] = 29,["57"] = 29,["58"] = 29,["59"] = 29,["60"] = 30,["61"] = 31,["62"] = 32,["63"] = 33,["64"] = 35,["65"] = 36,["66"] = 37,["67"] = 38,["68"] = 39,["69"] = 39,["70"] = 39,["71"] = 39,["72"] = 39,["73"] = 39,["74"] = 39,["75"] = 39,["76"] = 39,["77"] = 44,["78"] = 45,["79"] = 45,["80"] = 45,["81"] = 46,["82"] = 46,["83"] = 46,["85"] = 48,["86"] = 48,["88"] = 49,["89"] = 50,["90"] = 52,["91"] = 52,["92"] = 21,["93"] = 54,["94"] = 55,["95"] = 55,["97"] = 56,["98"] = 56,["99"] = 56,["100"] = 56,["101"] = 56,["102"] = 56,["103"] = 56,["104"] = 56,["105"] = 56,["106"] = 56,["107"] = 56,["108"] = 56,["109"] = 56,["110"] = 54,["111"] = 72,["112"] = 72,["113"] = 72,["115"] = 73,["116"] = 74,["119"] = 75,["120"] = 76,["121"] = 77,["122"] = 77,["123"] = 77,["124"] = 77,["125"] = 78,["126"] = 78,["127"] = 78,["128"] = 78,["129"] = 78,["130"] = 78,["131"] = 78,["132"] = 78,["133"] = 79,["134"] = 80,["135"] = 81,["136"] = 81,["137"] = 82,["138"] = 83,["139"] = 83,["141"] = 84,["142"] = 85,["143"] = 85,["145"] = 87,["146"] = 87,["147"] = 88,["148"] = 89,["149"] = 89,["150"] = 90,["151"] = 91,["152"] = 72,["153"] = 93,["154"] = 94,["155"] = 95,["156"] = 95,["158"] = 94,["159"] = 93,["160"] = 98,["161"] = 99,["162"] = 99,["163"] = 99,["164"] = 99,["165"] = 99,["166"] = 99,["167"] = 99,["168"] = 99,["169"] = 99,["170"] = 99,["171"] = 99,["172"] = 99,["173"] = 99,["174"] = 99,["175"] = 99,["176"] = 99,["177"] = 99,["178"] = 109,["179"] = 109,["180"] = 109,["181"] = 109,["182"] = 109,["183"] = 109,["184"] = 109,["185"] = 109,["186"] = 109,["187"] = 109,["188"] = 109,["190"] = 115,["191"] = 98,["192"] = 118,["193"] = 118,["194"] = 118,["195"] = 120,["196"] = 120,["197"] = 120,["198"] = 121,["199"] = 121,["200"] = 121,["201"] = 122,["202"] = 122,["203"] = 122,["204"] = 123,["205"] = 123,["206"] = 123,["207"] = 124,["208"] = 124,["209"] = 124,["210"] = 125,["211"] = 125,["212"] = 125,["213"] = 126,["214"] = 126,["215"] = 126,["216"] = 127,["217"] = 127,["218"] = 127,["219"] = 128,["220"] = 128,["221"] = 128,["222"] = 129,["223"] = 129,["224"] = 129,["225"] = 130,["226"] = 130,["227"] = 130,["228"] = 132,["229"] = 133,["230"] = 134,["231"] = 134,["232"] = 134,["233"] = 134,["234"] = 134,["236"] = 132,["237"] = 136,["238"] = 136,["239"] = 136,["240"] = 137,["241"] = 137,["242"] = 137,["243"] = 137,["244"] = 137,["245"] = 137,["246"] = 137,["247"] = 137,["248"] = 137,["249"] = 138,["250"] = 138,["251"] = 138,["252"] = 139,["253"] = 139,["254"] = 139,["255"] = 140,["256"] = 140,["257"] = 140,["258"] = 141,["259"] = 141,["260"] = 141,["261"] = 142,["262"] = 142,["263"] = 142,["264"] = 143,["265"] = 144,["266"] = 145,["267"] = 143,["268"] = 147,["269"] = 148,["270"] = 148,["271"] = 148,["272"] = 148,["273"] = 148,["274"] = 148,["275"] = 148,["276"] = 148,["277"] = 148,["278"] = 148,["280"] = 147,["281"] = 150,["282"] = 151,["285"] = 152,["286"] = 152,["287"] = 152,["288"] = 152,["289"] = 152,["290"] = 152,["291"] = 152,["292"] = 152,["293"] = 152,["294"] = 153,["295"] = 154,["296"] = 155,["297"] = 155,["300"] = 157,["301"] = 158,["302"] = 159,["303"] = 159,["304"] = 159,["305"] = 159,["306"] = 159,["307"] = 159,["308"] = 159,["309"] = 159,["311"] = 150,["312"] = 162,["313"] = 163,["314"] = 163,["315"] = 163,["316"] = 163,["317"] = 163,["318"] = 163,["319"] = 163,["320"] = 163,["321"] = 163,["322"] = 163,["324"] = 162,["325"] = 165,["326"] = 166,["327"] = 167,["328"] = 167,["330"] = 165,["331"] = 5,["332"] = 4,["333"] = 4,["334"] = 4,["335"] = 4,["336"] = 4,["337"] = 4,["338"] = 4,["339"] = 4,["340"] = 5,["342"] = 5});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 单位公共属性入口；优先使用 Athena 自定义字段，兼容普通 Dota/c1 KV。
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
    self.usingLargeHealth = false
    self.baseProperties = {}
end
function modifier_common.prototype.OnCreated(self)
    if not IsServer() then
        return
    end
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
    local fields = {
        StatusHealthRegen = PropertyFunction.BASE_HEALTH_REGEN,
        StatusManaRegen = PropertyFunction.BASE_MANA_REGEN,
        Evasion = PropertyFunction.BASE_EVASION,
        AttackRate = PropertyFunction.BASE_ATTACK_TIME,
        AttackRange = PropertyFunction.BASE_ATTACK_RANGE,
        CleaveDamage = PropertyFunction.CLEAVE_DAMAGE,
        CleaveRadius = PropertyFunction.CLEAVE_RADIUS
    }
    if unit:IsHero() then
        fields.BaseStrength = PropertyFunction.BASE_STRENGTH
        fields.BaseAgility = PropertyFunction.BASE_AGILITY
        fields.BaseIntellect = PropertyFunction.BASE_INTELLECT
        fields.StrengthGain = PropertyFunction.STRENGTH_GAIN
        fields.AgilityGain = PropertyFunction.AGILITY_GAIN
        fields.IntellectGain = PropertyFunction.INTELLECT_GAIN
    end
    for field, property in pairs(fields) do
        self.baseProperties[property] = tonumber(kv[field]) or 0
    end
    self.baseProperties[PropertyFunction.BASE_ATTACK_TIME] = tonumber(kv.AttackRate) or unit:GetBaseAttackTime(true)
    self.baseProperties[PropertyFunction.BASE_ATTACK_RANGE] = tonumber(kv.AttackRange) or unit:Script_GetAttackRange()
    unit:SetBaseHealthRegen(0)
    unit:SetBaseManaRegen(0)
end
function modifier_common.prototype.StaticProperty(self)
    if not IsServer() then
        return {}
    end
    return __TS__ObjectAssign({}, self.baseProperties, {
        [PropertyFunction.BASE_HEALTH] = self.health,
        [PropertyFunction.BASE_MANA] = self.mana,
        [PropertyFunction.BASE_ATTACK] = self.attack,
        [PropertyFunction.PHYSICAL_ARMOR] = self.armor,
        [PropertyFunction.DAMAGE_REDUCTION] = self.reduction,
        [PropertyFunction.CRIT_CHANCE] = self.critChance,
        [PropertyFunction.CRIT_DAMAGE] = self.critDamage,
        [PropertyFunction.PHYSICAL_CRITICALSTRIKE_CHANCE] = self.attackCritChance,
        [PropertyFunction.PHYSICAL_CRITICALSTRIKE_DAMAGE] = self.attackCritDamage,
        [PropertyFunction.MAGICAL_CRITICALSTRIKE_CHANCE] = self.spellCritChance,
        [PropertyFunction.MAGICAL_CRITICALSTRIKE_DAMAGE] = self.spellCritDamage
    })
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
    local largeHealth = LargeNumberHealth:Refresh(unit)
    if not largeHealth then
        unit:SetBaseMaxHealth(health)
        unit:SetMaxHealth(health)
        unit:SetHealth(full and health or math.max(1, health * healthPercent))
    elseif full then
        unit:SetHealth(health)
    end
    if largeHealth ~= self.usingLargeHealth then
        self.usingLargeHealth = largeHealth
        self:StartIntervalThink(largeHealth and 0.1 or -1)
    end
    unit:SetMaxMana(mana)
    unit:SetMana(full and mana or mana * manaPercent)
    local attack = unit:GetAttackDamage()
    unit:SetBaseDamageMin(attack)
    unit:SetBaseDamageMax(attack)
    unit:SetPhysicalArmorBaseValue(GetAthenaArmor(unit))
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
        MODIFIER_PROPERTY_DISABLE_AUTOATTACK,
        MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
        MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
        MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
        MODIFIER_PROPERTY_RESPAWNTIME_STACKING,
        MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
        MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT,
        MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE
    }
    if self:GetParent():IsRealHero() then
        __TS__ArrayPush(
            functions,
            MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET,
            MODIFIER_EVENT_ON_ABILITY_FULLY_CAST,
            MODIFIER_EVENT_ON_ABILITY_START,
            MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE,
            MODIFIER_EVENT_ON_SPENT_MANA,
            MODIFIER_EVENT_ON_ABILITY_END_CHANNEL,
            MODIFIER_PROPERTY_EXP_RATE_BOOST
        )
    end
    return functions
end
function modifier_common.prototype.CheckState(self)
    return {[MODIFIER_STATE_NO_HEALTH_BAR] = false}
end
function modifier_common.prototype.StaticState(self)
    return {[StateEnum.HEALTH_BAR] = true}
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
    return GetAthenaEvasion(self:GetParent())
end
function modifier_common.prototype.GetModifierPercentageCooldown(self)
    return GetAthenaCooldownReduction(self:GetParent())
end
function modifier_common.prototype.GetModifierConstantManaRegen(self)
    return GetAthenaManaRegen(self:GetParent())
end
function modifier_common.prototype.GetModifierConstantHealthRegen(self)
    return LargeNumberHealth:IsActive(self:GetParent()) and 0 or GetAthenaHealthRegen(self:GetParent())
end
function modifier_common.prototype.OnIntervalThink(self)
    local unit = self:GetParent()
    if IsServer() and unit:IsAlive() and LargeNumberHealth:IsActive(unit) then
        unit:Heal(
            GetAthenaHealthRegen(unit) * 0.1,
            nil
        )
    end
end
function modifier_common.prototype.GetModifierCooldownReduction_Constant(self)
    return GetCooldownConstant(self:GetParent())
end
function modifier_common.prototype.GetModifierAttackSpeedBaseOverride(self)
    return math.min(
        (MAXIMUM_ATTACK_SPEED + GetMaxAttackspeedBonus(self:GetParent())) * 0.01,
        math.max(
            MINIMUM_ATTACK_SPEED * 0.01,
            1 + self:GetParent():GetIncreasedAttackSpeed(true)
        )
    )
end
function modifier_common.prototype.GetModifierPercentageExpRateBoost(self)
    return GetPlayerExperienceGainPercentage(self:GetParent():GetPlayerOwnerID())
end
function modifier_common.prototype.GetModifierStatusResistanceStacking(self)
    return (1 - (1 - GetStatusResistanceStacking(self:GetParent()) * 0.01) * (1 - GetStatusResistanceUnique(self:GetParent()) * 0.01)) * 100
end
function modifier_common.prototype.GetModifierBaseAttackTimeConstant(self)
    return GetBaseAttackTime(self:GetParent()) + GetBaseAttackTimeConstantAdjust(self:GetParent())
end
function modifier_common.prototype.GetModifierStackingRespawnTime(self)
    return GetRespawnTime(self:GetParent())
end
function modifier_common.prototype.GetModifierHealAmplify_PercentageTarget(self)
    return GetHealAmplify(self:GetParent())
end
function modifier_common.prototype.GetModifierAttackRangeBonus(self)
    local unit = self:GetParent()
    return GetAthenaAttackRangeBonus(unit) + (unit:IsRangedAttacker() and GetAttackRangeRanger(unit) or GetAttackRangeMelee(unit))
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
