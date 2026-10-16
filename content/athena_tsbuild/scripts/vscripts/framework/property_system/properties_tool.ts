
// 攻击
require("athena_properties");
function GetAttackDamage(unit: CDOTA_BaseNPC): number {
	return unit.GetAttackDamage();
}

function GetMaxHealth(unit: CDOTA_BaseNPC): number {
	return unit.GetMaxHealth();
}

function GetShield(unit: CDOTA_BaseNPC): number {
	return 0;
}
/** %伤害 */
function GetOutgoingNoneDamagePercent(unit: CDOTA_BaseNPC, params?: any) {
	return math.max(
		GetOutgoingPhysicalDamagePercent(unit, params),
		GetOutgoingMagicalDamagePercent(unit, params)
	);
}
/** %物理伤害 */
function GetOutgoingPhysicalDamagePercent(unit: CDOTA_BaseNPC, params?: any) {
	return CompoundIncrease(GetDamageBoost(unit, params) + GetPhysicalDamageBoost(unit, params), GetDamageAmplify(unit, params) + GetPhysicalDamageAmplify(unit, params));
}

/** %魔法伤害 */
function GetOutgoingMagicalDamagePercent(unit: CDOTA_BaseNPC, params?: any) {
	return CompoundIncrease(GetDamageBoost(unit, params) + GetMagicalDamageBoost(unit, params), GetDamageAmplify(unit, params) + GetMagicalDamageAmplify(unit, params));
}

/** %攻击伤害 */
function GetOutgoingAttackDamagePercent(unit: CDOTA_BaseNPC, params?: any) {
	return CompoundIncrease(GetAttackDamageBoost(unit, params), GetAttackDamageAmplify(unit, params));
}
/** %技能伤害 */
function GetOutgoingSpellDamagePercent(unit: CDOTA_BaseNPC, params?: any) {
	return CompoundIncrease(GetSpellDamageBoost(unit, params), GetSpellDamageAmplify(unit, params));
}
/**
 * 计算单位最终增伤百分比（核心函数）
 *
 * 【计算公式】
 * 最终增伤 = 所有增伤项之和（加法叠加，线性增长）
 *
 * 说明：所有增伤采用加法叠加，数值线性增长，易于平衡和理解。
 * 例如：两个50%增伤 = 100%，八个50%增伤 = 400%
 *
 * 【增伤项组成】
 *
 * 1. 伤害类型基础增伤（物理/魔法）
 *    物理：CompoundIncrease(damage_boost + physical_damage_boost, damage_amplify + physical_damage_amplify)
 *    魔法：CompoundIncrease(damage_boost + magical_damage_boost, damage_amplify + magical_damage_amplify)
 *    无属性：取物理/魔法两者较高值，但不改变 damage_type
 *
 * 2. 伤害分类增伤（攻击/技能）
 *    攻击：CompoundIncrease(attack_damage_boost, attack_damage_amplify)
 *    技能：spell_damage_amplify
 *
 * 3. 条件增伤（破盾/反伤/盛怒）
 *    破盾（target.GetShield() > 0）：barrier_damage_amplify
 *    反伤（damage_flags包含RETALIATED_DAMAGE）：retaliated_damage_amplify
 *    盛怒（魔法值 ≥ 100）：berserk_damage_amplify
 *
 * 4. 技能标签增伤（根据AbilityTag自动选择）
 *    Skill/ Dodge/ Defense/ Ultimate → 对应的damage_amplify
 *
 * 5. 目标相关增伤
 *    目标类型：Boss/精英/小兵 → boss/elite/minion_damage_amplify
 *    斩杀（生命% ≤ 30）：CompoundIncrease(execute_damage, execute_damage_amplify)
 *    状态异常：bleeding/frozen/shocked → damage_vs_xxx_targets
 *
 * 6. 距离增伤
 *    近战(≤300)/ 远程(>300) → melee/ranged_damage
 *
 * @param unit 造成伤害的单位
 * @param params 伤害信息参数（包含damage_type, damage_category, target, damage_flags等）
 * @returns 最终增伤百分比（百分比形式，如50表示50%增伤）
 */
function GetOutgoingDamagePercent(unit: CDOTA_BaseNPC, params: DamageInfo) {
	// 【0号乘区 伤害+物理伤害/魔法伤害】
	let pct0: number = 0;

	// 伤害类型基础增伤（物理/魔法）
	if (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
		pct0 += GetOutgoingPhysicalDamagePercent(unit, params);
	} else if (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
		pct0 += GetOutgoingMagicalDamagePercent(unit, params);
	} else if (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE) {
		pct0 += GetOutgoingNoneDamagePercent(unit, params);
	}

	// 【1号乘区 伤害分类增伤（攻击/技能 技能标签）】
	let pct1: number = 0;
	const damageCategory = params.damage_category;
	if (damageCategory == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK) {
		pct1 += GetOutgoingAttackDamagePercent(unit, params);
	} else if (damageCategory == DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL) {
		pct1 += GetOutgoingSpellDamagePercent(unit, params);
	}
	// 【2号乘区 条件增伤】：破盾（目标有护盾时）
	let pct2: number = 0;
	const target = params.target;

	const damageFlags = params.damage_flags ?? EOM_DAMAGE_FLAGS.NONE;
	// 闪电伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE) == EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE) {
		pct2 += CompoundIncrease(GetLightningDamageBoost(unit, params), GetLightningDamageBoost2(unit, params));
	}
	// 冰冻伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.FREEZE_DAMAGE) == EOM_DAMAGE_FLAGS.FREEZE_DAMAGE) {
		pct2 += CompoundIncrease(GetFreezeDamageBoost(unit, params), GetFreezeDamageBoost2(unit, params));
	}
	// 中毒伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.POISON_DAMAGE) == EOM_DAMAGE_FLAGS.POISON_DAMAGE) {
		pct2 += CompoundIncrease(GetPoisonDamageBoost(unit, params), GetPoisonDamageBoost2(unit, params));
	}
	// 流血伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE) == EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE) {
		pct2 += CompoundIncrease(GetBleedDamageBoost(unit, params), GetBleedDamageBoost2(unit, params));
	}
	// 反击/反弹/盾击伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.RETALIATED_DAMAGE) == EOM_DAMAGE_FLAGS.RETALIATED_DAMAGE ||
		(damageFlags & EOM_DAMAGE_FLAGS.REFLECT_DAMAGE) == EOM_DAMAGE_FLAGS.REFLECT_DAMAGE ||
		(damageFlags & EOM_DAMAGE_FLAGS.SHIELD_DAMAGE) == EOM_DAMAGE_FLAGS.SHIELD_DAMAGE) {
		pct2 += CompoundIncrease(GetHolyShieldDamageBoost(unit, params), GetHolyShieldDamageBoost2(unit, params));
	}
	// 环绕伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.RING_DAMAGE) == EOM_DAMAGE_FLAGS.RING_DAMAGE) {
		pct2 += GetRingDamageBoost(unit, params);
	}
	// 散射伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.SPLIT_DAMAGE) == EOM_DAMAGE_FLAGS.SPLIT_DAMAGE) {
		pct2 += GetSplashDamageBoost(unit, params);
	}

	// 剑气伤害 or 飞剑伤害
	if ((damageFlags & EOM_DAMAGE_FLAGS.BLADE) == EOM_DAMAGE_FLAGS.BLADE || (damageFlags & EOM_DAMAGE_FLAGS.SWORD) == EOM_DAMAGE_FLAGS.SWORD) {
		pct2 += CompoundIncrease(GetBladeDamageBoost(unit, params), GetBladeSwordBoost2(unit, params));
	}

	// 背刺伤害
	if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK || BitAndEquals(params.damage_flags, EOM_DAMAGE_FLAGS.Backstab)) {
		if (math.abs(AngleDiff(VectorToAngles(
			CalcDirection2D(target, unit)).y,
			VectorToAngles(target.GetForwardVector()).y)) < 90 || BitAndEquals(params.damage_flags, EOM_DAMAGE_FLAGS.Backstab)) {

			pct2 += (BASE_BACKSTAB_DAMAGE + GetBackstabDamageAmplify(unit, params)) * (1 + GetBackstabDamageBoost(unit, params) * 0.01);
			params.is_backstab = true;
		}
	}
	// 伤害强度
	let pct3 = INTENSITY_FACTOR * GetDamageIntensity(unit, params) * (1 + 0.01 * GetDamageIntensityBoost(unit, params))

	// 乘法叠加所有增伤
	const ret = CompoundIncrease(
		pct3,
		pct0,
		pct1,
		pct2,
		GetHeroDamageBoost(unit, params),
		GetDamageBoostMult(unit, params),
		GetFinalDamage(unit, params),
		// 符文羁绊单独乘区增伤 TODO
		GetFinalDamage101(unit, params),
		GetFinalDamage102(unit, params),
		GetFinalDamage103(unit, params),
	);
	// print("pct0: ", GetDamageIntensity(unit, params) * INTENSITY_FACTOR,pct0 , pct1, pct2, GetHeroDamageBoost(unit, params), GetDamageAmplify(unit, params), params.damage_type, params.damage_category, GetDamageBoostMult(unit, params), ret);
	return ret;
}
function GetIncomingDamagePercent(unit: CDOTA_BaseNPC, params?: DamageInfo) {
	let addition
		// 任意伤害
		= GetIncomingDamageAmplify(unit, params)
		- GetDamageReduction(unit, params)
		;

	// 陷阱伤害易伤
	if (params != undefined && params.damage_flags != undefined && (params.damage_flags & EOM_DAMAGE_FLAGS.TRAP) == EOM_DAMAGE_FLAGS.TRAP) {
		addition += GetTrapIncomingDamageAmplify(unit, params);
	}

	return addition;
}
