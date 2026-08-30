local __TSTL_FILE_PATH__ = "framework/property_system/properties_tool"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 22,["6"] = 23,["7"] = 23,["8"] = 23,["9"] = 23,["10"] = 22,["12"] = 27,["13"] = 28,["14"] = 28,["15"] = 28,["16"] = 28,["17"] = 27,["18"] = 3,["19"] = 4,["20"] = 3,["21"] = 7,["22"] = 8,["23"] = 7,["24"] = 11,["25"] = 12,["26"] = 11,["28"] = 15,["29"] = 16,["30"] = 16,["31"] = 16,["32"] = 16,["33"] = 15,["35"] = 32,["36"] = 33,["37"] = 33,["38"] = 33,["39"] = 33,["40"] = 32,["42"] = 36,["43"] = 37,["44"] = 37,["45"] = 37,["46"] = 37,["47"] = 36,["86"] = 79,["87"] = 81,["88"] = 84,["89"] = 85,["90"] = 86,["91"] = 87,["92"] = 88,["93"] = 89,["95"] = 93,["96"] = 94,["97"] = 95,["98"] = 96,["99"] = 97,["100"] = 98,["102"] = 101,["103"] = 102,["104"] = 104,["105"] = 106,["106"] = 107,["107"] = 107,["108"] = 107,["109"] = 107,["111"] = 110,["112"] = 111,["113"] = 111,["114"] = 111,["115"] = 111,["117"] = 114,["118"] = 115,["119"] = 115,["120"] = 115,["121"] = 115,["123"] = 118,["124"] = 119,["125"] = 119,["126"] = 119,["127"] = 119,["129"] = 122,["130"] = 125,["131"] = 125,["132"] = 125,["133"] = 125,["135"] = 128,["136"] = 129,["138"] = 132,["139"] = 133,["141"] = 137,["142"] = 138,["143"] = 138,["144"] = 138,["145"] = 138,["147"] = 142,["148"] = 143,["149"] = 143,["150"] = 143,["151"] = 143,["152"] = 147,["153"] = 148,["156"] = 152,["157"] = 155,["158"] = 155,["159"] = 155,["160"] = 155,["161"] = 155,["162"] = 155,["163"] = 155,["164"] = 155,["165"] = 155,["166"] = 155,["167"] = 155,["168"] = 155,["169"] = 169,["170"] = 79,["171"] = 171,["172"] = 172,["173"] = 179,["174"] = 180,["176"] = 183,["177"] = 171});
--- %物理伤害
function GetOutgoingPhysicalDamagePercent(self, unit, params)
    return CompoundIncrease(
        GetDamageBoost(unit, params) + GetPhysicalDamageBoost(unit, params),
        GetDamageAmplify(unit, params) + GetPhysicalDamageAmplify(unit, params)
    )
end
--- %魔法伤害
function GetOutgoingMagicalDamagePercent(self, unit, params)
    return CompoundIncrease(
        GetDamageBoost(unit, params) + GetMagicalDamageBoost(unit, params),
        GetDamageAmplify(unit, params) + GetMagicalDamageAmplify(unit, params)
    )
end
function GetAttackDamage(self, unit)
    return unit:GetAttackDamage()
end
function GetMaxHealth(self, unit)
    return unit:GetMaxHealth()
end
function GetShield(self, unit)
    return 0
end
--- %伤害
function GetOutgoingNoneDamagePercent(self, unit, params)
    return math.max(
        GetOutgoingPhysicalDamagePercent(nil, unit, params),
        GetOutgoingMagicalDamagePercent(nil, unit, params)
    )
end
--- %攻击伤害
function GetOutgoingAttackDamagePercent(self, unit, params)
    return CompoundIncrease(
        GetAttackDamageBoost(unit, params),
        GetAttackDamageAmplify(unit, params)
    )
end
--- %技能伤害
function GetOutgoingSpellDamagePercent(self, unit, params)
    return CompoundIncrease(
        GetSpellDamageBoost(unit, params),
        GetSpellDamageAmplify(unit, params)
    )
end
--- 计算单位最终增伤百分比（核心函数）
-- 
-- 【计算公式】
-- 最终增伤 = 所有增伤项之和（加法叠加，线性增长）
-- 
-- 说明：所有增伤采用加法叠加，数值线性增长，易于平衡和理解。
-- 例如：两个50%增伤 = 100%，八个50%增伤 = 400%
-- 
-- 【增伤项组成】
-- 
-- 1. 伤害类型基础增伤（物理/魔法）
--    物理：CompoundIncrease(damage_boost + physical_damage_boost, damage_amplify + physical_damage_amplify)
--    魔法：CompoundIncrease(damage_boost + magical_damage_boost, damage_amplify + magical_damage_amplify)
--    无属性：取物理/魔法两者较高值，但不改变 damage_type
-- 
-- 2. 伤害分类增伤（攻击/技能）
--    攻击：CompoundIncrease(attack_damage_boost, attack_damage_amplify)
--    技能：spell_damage_amplify
-- 
-- 3. 条件增伤（破盾/反伤/盛怒）
--    破盾（target.GetShield() > 0）：barrier_damage_amplify
--    反伤（damage_flags包含RETALIATED_DAMAGE）：retaliated_damage_amplify
--    盛怒（魔法值 ≥ 100）：berserk_damage_amplify
-- 
-- 4. 技能标签增伤（根据AbilityTag自动选择）
--    Skill/ Dodge/ Defense/ Ultimate → 对应的damage_amplify
-- 
-- 5. 目标相关增伤
--    目标类型：Boss/精英/小兵 → boss/elite/minion_damage_amplify
--    斩杀（生命% ≤ 30）：CompoundIncrease(execute_damage, execute_damage_amplify)
--    状态异常：bleeding/frozen/shocked → damage_vs_xxx_targets
-- 
-- 6. 距离增伤
--    近战(≤300)/ 远程(>300) → melee/ranged_damage
-- 
-- @param unit 造成伤害的单位
-- @param params 伤害信息参数（包含damage_type, damage_category, target, damage_flags等）
-- @returns 最终增伤百分比（百分比形式，如50表示50%增伤）
function GetOutgoingDamagePercent(self, unit, params)
    local pct0 = 0
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
        pct0 = pct0 + GetOutgoingPhysicalDamagePercent(nil, unit, params)
    elseif params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        pct0 = pct0 + GetOutgoingMagicalDamagePercent(nil, unit, params)
    elseif params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE then
        pct0 = pct0 + GetOutgoingNoneDamagePercent(nil, unit, params)
    end
    local pct1 = 0
    local damageCategory = params.damage_category
    if damageCategory == DOTA_DAMAGE_CATEGORY_ATTACK then
        pct1 = pct1 + GetOutgoingAttackDamagePercent(nil, unit, params)
    elseif damageCategory == DOTA_DAMAGE_CATEGORY_SPELL then
        pct1 = pct1 + GetOutgoingSpellDamagePercent(nil, unit, params)
    end
    local pct2 = 0
    local target = params.target
    local damageFlags = params.damage_flags or EOM_DAMAGE_FLAGS.NONE
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE) == EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE then
        pct2 = pct2 + CompoundIncrease(
            GetLightningDamageBoost(unit, params),
            GetLightningDamageBoost2(unit, params)
        )
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE) == EOM_DAMAGE_FLAGS.FREEZE_DAMAGE then
        pct2 = pct2 + CompoundIncrease(
            GetFreezeDamageBoost(unit, params),
            GetFreezeDamageBoost2(unit, params)
        )
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.POISON_DAMAGE) == EOM_DAMAGE_FLAGS.POISON_DAMAGE then
        pct2 = pct2 + CompoundIncrease(
            GetPoisonDamageBoost(unit, params),
            GetPoisonDamageBoost2(unit, params)
        )
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE) == EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE then
        pct2 = pct2 + CompoundIncrease(
            GetBleedDamageBoost(unit, params),
            GetBleedDamageBoost2(unit, params)
        )
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.RETALIATED_DAMAGE) == EOM_DAMAGE_FLAGS.RETALIATED_DAMAGE or bit.band(damageFlags, EOM_DAMAGE_FLAGS.REFLECT_DAMAGE) == EOM_DAMAGE_FLAGS.REFLECT_DAMAGE or bit.band(damageFlags, EOM_DAMAGE_FLAGS.SHIELD_DAMAGE) == EOM_DAMAGE_FLAGS.SHIELD_DAMAGE then
        pct2 = pct2 + CompoundIncrease(
            GetHolyShieldDamageBoost(unit, params),
            GetHolyShieldDamageBoost2(unit, params)
        )
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.RING_DAMAGE) == EOM_DAMAGE_FLAGS.RING_DAMAGE then
        pct2 = pct2 + GetRingDamageBoost(unit, params)
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.SPLIT_DAMAGE) == EOM_DAMAGE_FLAGS.SPLIT_DAMAGE then
        pct2 = pct2 + GetSplashDamageBoost(unit, params)
    end
    if bit.band(damageFlags, EOM_DAMAGE_FLAGS.BLADE) == EOM_DAMAGE_FLAGS.BLADE or bit.band(damageFlags, EOM_DAMAGE_FLAGS.SWORD) == EOM_DAMAGE_FLAGS.SWORD then
        pct2 = pct2 + CompoundIncrease(
            GetBladeDamageBoost(unit, params),
            GetBladeSwordBoost2(unit, params)
        )
    end
    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK or BitAndEquals(params.damage_flags, EOM_DAMAGE_FLAGS.Backstab) then
        if math.abs(AngleDiff(
            VectorToAngles(CalcDirection2D(target, unit)).y,
            VectorToAngles(target:GetForwardVector()).y
        )) < 90 or BitAndEquals(params.damage_flags, EOM_DAMAGE_FLAGS.Backstab) then
            pct2 = pct2 + (BASE_BACKSTAB_DAMAGE + GetBackstabDamageAmplify(unit, params)) * (1 + GetBackstabDamageBoost(unit, params) * 0.01)
            params.is_backstab = true
        end
    end
    local pct3 = INTENSITY_FACTOR * GetDamageIntensity(unit, params) * (1 + 0.01 * GetDamageIntensityBoost(unit, params))
    local ret = CompoundIncrease(
        pct3,
        pct0,
        pct1,
        pct2,
        GetHeroDamageBoost(unit, params),
        GetDamageBoostMult(unit, params),
        GetFinalDamage(unit, params),
        GetFinalDamage101(unit, params),
        GetFinalDamage102(unit, params),
        GetFinalDamage103(unit, params)
    )
    return ret
end
function GetIncomingDamagePercent(self, unit, params)
    local addition = GetIncomingDamageAmplify(unit, params) - GetDamageReduction(unit, params)
    if params ~= nil and params.damage_flags ~= nil and bit.band(params.damage_flags, EOM_DAMAGE_FLAGS.TRAP) == EOM_DAMAGE_FLAGS.TRAP then
        addition = addition + GetTrapIncomingDamageAmplify(unit, params)
    end
    return addition
end
