local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_common"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayPush = ____lualib.__TS__ArrayPush
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 1,["13"] = 4,["14"] = 5,["15"] = 4,["16"] = 5,["18"] = 5,["19"] = 6,["20"] = 7,["21"] = 8,["22"] = 9,["23"] = 10,["24"] = 11,["25"] = 12,["26"] = 13,["27"] = 14,["28"] = 15,["29"] = 16,["30"] = 17,["31"] = 4,["32"] = 19,["33"] = 21,["36"] = 22,["37"] = 22,["38"] = 23,["39"] = 23,["40"] = 23,["42"] = 23,["43"] = 23,["44"] = 23,["46"] = 23,["47"] = 24,["48"] = 24,["49"] = 24,["50"] = 24,["51"] = 25,["52"] = 26,["53"] = 27,["54"] = 27,["55"] = 27,["56"] = 27,["57"] = 28,["58"] = 29,["59"] = 30,["60"] = 31,["61"] = 33,["62"] = 34,["63"] = 35,["64"] = 36,["65"] = 19,["66"] = 38,["67"] = 39,["68"] = 39,["70"] = 40,["71"] = 40,["72"] = 40,["73"] = 40,["74"] = 40,["75"] = 40,["76"] = 40,["77"] = 40,["78"] = 40,["79"] = 40,["80"] = 40,["81"] = 40,["82"] = 40,["83"] = 38,["84"] = 55,["85"] = 55,["86"] = 55,["88"] = 56,["89"] = 57,["92"] = 58,["93"] = 59,["94"] = 60,["95"] = 60,["96"] = 60,["97"] = 60,["98"] = 61,["99"] = 61,["100"] = 61,["101"] = 61,["102"] = 61,["103"] = 61,["104"] = 61,["105"] = 61,["106"] = 62,["107"] = 63,["108"] = 63,["109"] = 64,["110"] = 65,["111"] = 65,["113"] = 66,["114"] = 66,["115"] = 67,["116"] = 68,["117"] = 68,["118"] = 69,["119"] = 70,["120"] = 55,["121"] = 72,["122"] = 73,["123"] = 74,["124"] = 74,["126"] = 73,["127"] = 72,["128"] = 77,["129"] = 78,["130"] = 78,["131"] = 78,["132"] = 78,["133"] = 78,["134"] = 78,["135"] = 78,["136"] = 78,["137"] = 78,["138"] = 78,["139"] = 84,["140"] = 84,["141"] = 84,["142"] = 84,["143"] = 84,["144"] = 84,["145"] = 84,["146"] = 84,["147"] = 84,["148"] = 84,["150"] = 89,["151"] = 77,["152"] = 92,["153"] = 92,["154"] = 92,["155"] = 93,["156"] = 93,["157"] = 93,["158"] = 94,["159"] = 94,["160"] = 94,["161"] = 95,["162"] = 95,["163"] = 95,["164"] = 96,["165"] = 96,["166"] = 96,["167"] = 97,["168"] = 97,["169"] = 97,["170"] = 98,["171"] = 98,["172"] = 98,["173"] = 99,["174"] = 99,["175"] = 99,["176"] = 100,["177"] = 100,["178"] = 100,["179"] = 101,["180"] = 101,["181"] = 101,["182"] = 102,["183"] = 103,["184"] = 104,["185"] = 102,["186"] = 106,["187"] = 107,["188"] = 107,["189"] = 107,["190"] = 107,["191"] = 107,["192"] = 107,["193"] = 107,["194"] = 107,["195"] = 107,["196"] = 107,["198"] = 106,["199"] = 109,["200"] = 110,["203"] = 111,["204"] = 111,["205"] = 111,["206"] = 111,["207"] = 111,["208"] = 111,["209"] = 111,["210"] = 111,["211"] = 111,["212"] = 112,["213"] = 113,["214"] = 114,["215"] = 114,["218"] = 116,["219"] = 117,["220"] = 118,["221"] = 118,["222"] = 118,["223"] = 118,["224"] = 118,["225"] = 118,["226"] = 118,["227"] = 118,["229"] = 109,["230"] = 121,["231"] = 122,["232"] = 122,["233"] = 122,["234"] = 122,["235"] = 122,["236"] = 122,["237"] = 122,["238"] = 122,["239"] = 122,["240"] = 122,["242"] = 121,["243"] = 124,["244"] = 125,["245"] = 126,["246"] = 126,["248"] = 124,["249"] = 5,["250"] = 4,["251"] = 4,["252"] = 4,["253"] = 4,["254"] = 4,["255"] = 4,["256"] = 4,["257"] = 4,["258"] = 5,["260"] = 5});
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
end
function modifier_common.prototype.StaticProperty(self)
    if not IsServer() then
        return {}
    end
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
