local __TSTL_FILE_PATH__ = "framework/property_system/athena_properties"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 3,["6"] = 4,["7"] = 5,["8"] = 5,["9"] = 5,["10"] = 5,["11"] = 5,["12"] = 5,["13"] = 3,["15"] = 9,["16"] = 10,["17"] = 10,["19"] = 11,["20"] = 11,["21"] = 11,["22"] = 12,["23"] = 13,["24"] = 13,["25"] = 13,["26"] = 13,["27"] = 14,["28"] = 15,["29"] = 16,["30"] = 17,["31"] = 17,["32"] = 17,["33"] = 17,["34"] = 9,["35"] = 19,["36"] = 19,["37"] = 19,["38"] = 20,["39"] = 20,["40"] = 20,["41"] = 21,["42"] = 21,["43"] = 21,["44"] = 23,["45"] = 24,["46"] = 26,["47"] = 23,["48"] = 28,["49"] = 29,["50"] = 29,["51"] = 29,["52"] = 29,["53"] = 30,["54"] = 31,["55"] = 28,["56"] = 33,["57"] = 34,["58"] = 34,["59"] = 34,["60"] = 34,["61"] = 33,["62"] = 36,["63"] = 37,["64"] = 38,["65"] = 36,["66"] = 40,["67"] = 41,["68"] = 41,["69"] = 41,["70"] = 41,["71"] = 40,["72"] = 44,["73"] = 45,["74"] = 45,["75"] = 45,["76"] = 45,["77"] = 44,["78"] = 48,["79"] = 49,["80"] = 48,["81"] = 51,["82"] = 52,["83"] = 51,["84"] = 54,["85"] = 55,["86"] = 54,["88"] = 59,["89"] = 60,["90"] = 60,["92"] = 61,["93"] = 61,["95"] = 62,["96"] = 59,["97"] = 64,["98"] = 65,["99"] = 65,["101"] = 67,["102"] = 67,["104"] = 69,["105"] = 64,["107"] = 72,["108"] = 73,["109"] = 74,["110"] = 74,["111"] = 74,["112"] = 75,["113"] = 76,["114"] = 77,["115"] = 78,["116"] = 79,["117"] = 79,["118"] = 80,["119"] = 80,["120"] = 81,["121"] = 82,["122"] = 82,["123"] = 83,["124"] = 83,["126"] = 85,["127"] = 72,["129"] = 88,["130"] = 89,["131"] = 90,["132"] = 90,["133"] = 90,["134"] = 91,["135"] = 92,["136"] = 93,["137"] = 94,["138"] = 94,["139"] = 94,["140"] = 94,["141"] = 95,["142"] = 98,["144"] = 100,["145"] = 101,["146"] = 101,["147"] = 102,["148"] = 103,["149"] = 103,["150"] = 103,["152"] = 104,["154"] = 105,["155"] = 105,["156"] = 107,["157"] = 107,["158"] = 107,["159"] = 107,["160"] = 108,["161"] = 108,["162"] = 108,["163"] = 108,["164"] = 108,["165"] = 108,["166"] = 108,["167"] = 108,["169"] = 109,["170"] = 88,["171"] = 111,["172"] = 113,["173"] = 111});
--- 雅典娜旧版公式；只组合 PropertySystem 中的属性，不另建属性存储或重复读取 KV。
function AthenaProperty(unit, property, params)
    local id = PROPERTY_MAP_REVERSE[property]
    return id == nil and 0 or PropertySystem:GetPropertyValueEx(
        id,
        unit:GetPlayerOwnerID(),
        unit:entindex(),
        params
    )
end
--- 三围分开保留原始值、等级成长、永久基础、基础百分比、额外值和总百分比。
function GetAthenaStat(unit, stat)
    if not unit:IsHero() then
        return 0
    end
    local function p(name)
        return AthenaProperty(unit, PropertyFunction[name])
    end
    local original = math.floor(p("BASE_" .. stat) + (unit:GetLevel() - 1) * p(stat .. "_GAIN"))
    local base = math.max(
        0,
        original + math.floor(p(("STATS_" .. stat) .. "_BASE") + p("STATS_ALL_BASE"))
    )
    local basePercent = p(("STATS_" .. stat) .. "_BASE_PERCENTAGE") + p("STATS_ALL_BASE_PERCENTAGE")
    local bonus = p(("STATS_" .. stat) .. "_BONUS") + p("STATS_ALL_BONUS")
    local percent = p(("STATS_" .. stat) .. "_PERCENTAGE") + p("STATS_ALL_PERCENTAGE")
    return math.max(
        0,
        math.floor((base * (1 + basePercent * 0.01) + bonus) * (1 + percent * 0.01))
    )
end
function GetStrength(unit)
    return GetAthenaStat(unit, "STRENGTH")
end
function GetAgility(unit)
    return GetAthenaStat(unit, "AGILITY")
end
function GetIntellect(unit)
    return GetAthenaStat(unit, "INTELLECT")
end
function GetAthenaAttack(unit)
    local base = GetBaseAttack(unit) + GetStrength(unit) * 2 + GetAgility(unit) * 3 + GetIntellect(unit) + GetAttackDamageBaseStr(unit) + GetAttackDamageBaseAgi(unit) + GetAttackDamageBaseInt(unit)
    return (base * (1 + GetAttackDamageBasePercentage(unit) * 0.01) + GetAttack(unit)) * (1 + GetAttackAmplify(unit) * 0.01)
end
function GetAthenaMaxHealth(unit)
    local base = math.max(
        0,
        GetBaseHealth(unit) + GetStrength(unit) * 20 + GetHealthBaseStr(unit)
    )
    local intensity = GetDefenseIntensity(unit) * (1 + GetDefenseIntensityBoost(unit) * 0.01)
    return math.floor((base + GetHealth(unit)) * (1 + (GetHealthAmplify(unit) + GetHealthPercentEnemy(unit)) * 0.01) * (1 + intensity * INTENSITY_FACTOR * 0.01))
end
function GetAthenaMaxMana(unit)
    return math.floor((math.max(
        0,
        GetBaseMana(unit) + GetIntellect(unit) * 12 + GetManaBaseInt(unit)
    ) + GetMana(unit)) * (1 + GetManaAmplify(unit) * 0.01))
end
function GetAthenaArmor(unit, params)
    local base = AthenaProperty(unit, PropertyFunction.PHYSICAL_ARMOR, params) + GetArmorBaseStr(unit, params) + GetArmorBaseAgi(unit, params) + GetArmorBaseInt(unit, params)
    return (base * (1 + GetArmorBasePercentage(unit, params) * 0.01) + GetArmorBonus(unit, params)) * (1 + GetArmorPercentage(unit, params) * 0.01)
end
function GetAthenaHealthRegen(unit)
    return math.max(
        0,
        GetBaseHealthRegen(unit) + GetStrength(unit) * 0.16 + GetBaseHealthRegenConstant(unit) + GetBaseHealthRegenConstantStr(unit)
    ) + GetHealthRegenConstant(unit) + GetHealthRegenPercentage(unit) * unit:GetMaxHealth() * 0.01
end
function GetAthenaManaRegen(unit)
    return math.max(
        0,
        GetBaseManaRegen(unit)
    ) + GetIntellect(unit) * 0.08 + GetBaseManaRegenConstantInt(unit) + GetManaRegenConstant(unit) + GetManaRegenConstantUnique(unit) + GetManaRegenPercentage(unit) * unit:GetMaxMana() * 0.01
end
function GetAthenaEvasion(unit, params)
    return GetBaseEvasion(unit) + (1 - (1 - GetEvasion(unit, params) * 0.01) * (1 - (AthenaProperty(unit, PropertyFunction.ATHENA_EVASION) + GetItemEvasion(unit, params)) * 0.01)) * 100
end
function GetAthenaCooldownReduction(unit)
    return (1 - (1 - GetCooldownReduction(unit) * 0.01) * (1 - (AthenaProperty(unit, PropertyFunction.ATHENA_COOLDOWN_REDUCTION) + GetItemCooldownReduction(unit)) * 0.01)) * 100
end
function GetAthenaAttackRangeBonus(unit)
    return (GetBaseAttackRange(unit) + GetAttackRange(unit)) * (1 + GetAttackRangePercentage(unit) * 0.01) - GetBaseAttackRange(unit)
end
--- 旧版按物理/魔法分暴击，与 C1 攻击/技能通道互相独立。
function GetAthenaCritChance(unit, params)
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
        return GetPhysicalCriticalstrikeChance(unit, params) + GetItemPhysicalCritChance(unit, params)
    end
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        return GetMagicalCriticalstrikeChance(unit, params) + GetItemMagicalCritChance(unit, params)
    end
    return 0
end
function GetAthenaCritDamage(unit, params)
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
        return (GetPhysicalCriticalstrikeDamage(unit, params) + GetItemPhysicalCritDamage(unit, params)) * (1 + (GetPhysicalCriticalstrikeDamageAmplify(unit, params) + GetItemPhysicalCritDamage2(unit, params)) * 0.01)
    end
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        return (GetMagicalCriticalstrikeDamage(unit, params) + GetItemMagicalCritDamage(unit, params)) * (1 + (GetMagicalCriticalstrikeDamageAmplify(unit, params) + GetItemMagicalCritDamage2(unit, params)) * 0.01)
    end
    return 0
end
--- 装备先聚合，永久加成在各自乘区中相加，三围派生增伤另乘。
function GetAthenaOutgoingMultiplier(unit, params)
    local result = 1
    local function factor(value)
        result = result * (1 + value * 0.01)
    end
    factor(GetItemOutgoingDamage(unit, params))
    factor(GetItemOutgoingDamage2(unit, params) + GetAthenaFinallyDamage(unit, params))
    factor(GetOutgoingDamagePercentage(unit, params))
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
        factor(GetItemPhysicalDamage(unit, params) + GetAthenaPhysicalDamage(unit, params))
        factor(GetItemPhysicalDamage2(unit, params))
        factor(GetOutgoingPhysicalDamagePercentage(unit, params))
        factor(GetAgility(unit) * 0.002 + GetOutgoingPhysicalDamagePercentageAgi(unit, params))
    elseif params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        factor(GetItemMagicalDamage(unit, params) + GetAthenaMagicalDamage(unit, params))
        factor(GetItemMagicalDamage2(unit, params))
        factor(GetOutgoingMagicalDamagePercentage(unit, params))
        factor(GetIntellect(unit) * 0.02 + GetOutgoingMagicalDamagePercentageInt(unit, params))
    end
    return result
end
--- 护甲只减免物理伤害，魔法保留旧版固定 25% 抗性；格挡在百分比减免后扣除。
function GetAthenaIncomingMultiplier(unit, params)
    local result = 1
    local function factor(value)
        result = result * (1 + value * 0.01)
    end
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
        local armor = GetAthenaArmor(unit, params)
        if armor > 0 then
            armor = math.max(
                0,
                armor - GetIgnoreArmor(params.attacker, params)
            )
            local ignore = 1 - (1 - GetIgnoreArmorPercentageTarget(unit, params) * 0.01) * (1 - GetIgnoreArmorPercentage(params.attacker, params) * 0.01) * (1 - GetIgnoreArmorPercentageUnique(params.attacker, params) * 0.01) * (1 - (AthenaProperty(params.attacker, PropertyFunction.ATHENA_ARMOR_IGNORE, params) + GetItemArmorIgnorePct(params.attacker, params)) * 0.01)
            armor = armor - math.max(armor * ignore, 0)
        end
        result = result * (1 - 0.06 * armor / (1 + 0.06 * math.abs(armor)))
        factor(GetIncomingPhysicalDamagePercentage(unit, params))
        result = result * (1 - GetItemDamageReducePhysical(unit, params) * 0.01)
    elseif params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        result = result * 0.75
        factor(GetIncomingMagicalDamagePercentage(unit, params))
        result = result * (1 - GetItemDamageReduceMagical(unit, params) * 0.01)
    else
        return 1
    end
    factor(GetIncomingDamagePercentage(unit, params))
    factor(GetIncomingDamagePercentageStr(unit, params))
    factor(math.min(
        60,
        GetStrength(unit) * 0.0005
    ))
    for ____, value in ipairs({
        GetItemDamageReduce(unit, params),
        GetItemDamageReduce2(unit, params),
        GetAthenaDamageReduce(unit, params),
        GetAthenaDamageReduce2(unit, params),
        GetItemIncomingDamage(unit, params)
    }) do
        result = result * (1 - value * 0.01)
    end
    return result
end
function GetAthenaDamageBlock(unit, params)
    return GetIgnoreDamage(unit, params) + GetIgnoreDamageAgi(unit, params) + GetStrength(unit) * 0.2
end
