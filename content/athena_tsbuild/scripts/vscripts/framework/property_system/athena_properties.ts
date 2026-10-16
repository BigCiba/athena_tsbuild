/** @noSelfInFile */
/** 雅典娜旧版公式；只组合 PropertySystem 中的属性，不另建属性存储或重复读取 KV。 */
function AthenaProperty(unit: CDOTA_BaseNPC, property: PropertyFunction, params?: DamageInfo): number {
	const id = PROPERTY_MAP_REVERSE[property];
	return id === undefined ? 0 : PropertySystem.GetPropertyValueEx(id, unit.GetPlayerOwnerID(), unit.entindex(), params);
}

/** 三围分开保留原始值、等级成长、永久基础、基础百分比、额外值和总百分比。 */
function GetAthenaStat(unit: CDOTA_BaseNPC, stat: "STRENGTH" | "AGILITY" | "INTELLECT"): number {
	if (!unit.IsHero()) return 0;
	const p = (name: string) => AthenaProperty(unit, (PropertyFunction as AnyTable)[name]);
	const original = math.floor(p("BASE_" + stat) + (unit.GetLevel() - 1) * p(stat + "_GAIN"));
	const base = math.max(0, original + math.floor(p("STATS_" + stat + "_BASE") + p("STATS_ALL_BASE")));
	const basePercent = p("STATS_" + stat + "_BASE_PERCENTAGE") + p("STATS_ALL_BASE_PERCENTAGE");
	const bonus = p("STATS_" + stat + "_BONUS") + p("STATS_ALL_BONUS");
	const percent = p("STATS_" + stat + "_PERCENTAGE") + p("STATS_ALL_PERCENTAGE");
	return math.max(0, math.floor((base * (1 + basePercent * 0.01) + bonus) * (1 + percent * 0.01)));
}
function GetStrength(unit: CDOTA_BaseNPC) { return GetAthenaStat(unit, "STRENGTH"); }
function GetAgility(unit: CDOTA_BaseNPC) { return GetAthenaStat(unit, "AGILITY"); }
function GetIntellect(unit: CDOTA_BaseNPC) { return GetAthenaStat(unit, "INTELLECT"); }

function GetAthenaAttack(unit: CDOTA_BaseNPC) {
	const base = GetBaseAttack(unit) + GetStrength(unit) * 2 + GetAgility(unit) * 3 + GetIntellect(unit)
		+ GetAttackDamageBaseStr(unit) + GetAttackDamageBaseAgi(unit) + GetAttackDamageBaseInt(unit);
	return (base * (1 + GetAttackDamageBasePercentage(unit) * 0.01) + GetAttack(unit)) * (1 + GetAttackAmplify(unit) * 0.01);
}
function GetAthenaMaxHealth(unit: CDOTA_BaseNPC) {
	const base = math.max(0, GetBaseHealth(unit) + GetStrength(unit) * 20 + GetHealthBaseStr(unit));
	const intensity = GetDefenseIntensity(unit) * (1 + GetDefenseIntensityBoost(unit) * 0.01);
	return math.floor((base + GetHealth(unit)) * (1 + (GetHealthAmplify(unit) + GetHealthPercentEnemy(unit)) * 0.01) * (1 + intensity * INTENSITY_FACTOR * 0.01));
}
function GetAthenaMaxMana(unit: CDOTA_BaseNPC) {
	return math.floor((math.max(0, GetBaseMana(unit) + GetIntellect(unit) * 12 + GetManaBaseInt(unit)) + GetMana(unit)) * (1 + GetManaAmplify(unit) * 0.01));
}
function GetAthenaArmor(unit: CDOTA_BaseNPC, params?: DamageInfo) {
	const base = AthenaProperty(unit, PropertyFunction.PHYSICAL_ARMOR, params) + GetArmorBaseStr(unit, params) + GetArmorBaseAgi(unit, params) + GetArmorBaseInt(unit, params);
	return (base * (1 + GetArmorBasePercentage(unit, params) * 0.01) + GetArmorBonus(unit, params)) * (1 + GetArmorPercentage(unit, params) * 0.01);
}
function GetAthenaHealthRegen(unit: CDOTA_BaseNPC) {
	return math.max(0, GetBaseHealthRegen(unit) + GetStrength(unit) * 0.16 + GetBaseHealthRegenConstant(unit) + GetBaseHealthRegenConstantStr(unit))
		+ GetHealthRegenConstant(unit) + GetHealthRegenPercentage(unit) * unit.GetMaxHealth() * 0.01;
}
function GetAthenaManaRegen(unit: CDOTA_BaseNPC) {
	return math.max(0, GetBaseManaRegen(unit)) + GetIntellect(unit) * 0.08 + GetBaseManaRegenConstantInt(unit)
		+ GetManaRegenConstant(unit) + GetManaRegenConstantUnique(unit) + GetManaRegenPercentage(unit) * unit.GetMaxMana() * 0.01;
}
function GetAthenaEvasion(unit: CDOTA_BaseNPC, params?: DamageInfo) {
	return GetBaseEvasion(unit) + (1 - (1 - GetEvasion(unit, params) * 0.01) * (1 - (AthenaProperty(unit, PropertyFunction.ATHENA_EVASION) + GetItemEvasion(unit, params)) * 0.01)) * 100;
}
function GetAthenaCooldownReduction(unit: CDOTA_BaseNPC) {
	return (1 - (1 - GetCooldownReduction(unit) * 0.01) * (1 - (AthenaProperty(unit, PropertyFunction.ATHENA_COOLDOWN_REDUCTION) + GetItemCooldownReduction(unit)) * 0.01)) * 100;
}
function GetAthenaAttackRangeBonus(unit: CDOTA_BaseNPC) {
	return (GetBaseAttackRange(unit) + GetAttackRange(unit)) * (1 + GetAttackRangePercentage(unit) * 0.01) - GetBaseAttackRange(unit);
}

/** 旧版按物理/魔法分暴击，与 C1 攻击/技能通道互相独立。 */
function GetAthenaCritChance(unit: CDOTA_BaseNPC, params: DamageInfo) {
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) return GetPhysicalCriticalstrikeChance(unit, params) + GetItemPhysicalCritChance(unit, params);
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) return GetMagicalCriticalstrikeChance(unit, params) + GetItemMagicalCritChance(unit, params);
	return 0;
}
function GetAthenaCritDamage(unit: CDOTA_BaseNPC, params: DamageInfo) {
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) return (GetPhysicalCriticalstrikeDamage(unit, params) + GetItemPhysicalCritDamage(unit, params))
		* (1 + (GetPhysicalCriticalstrikeDamageAmplify(unit, params) + GetItemPhysicalCritDamage2(unit, params)) * 0.01);
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) return (GetMagicalCriticalstrikeDamage(unit, params) + GetItemMagicalCritDamage(unit, params))
		* (1 + (GetMagicalCriticalstrikeDamageAmplify(unit, params) + GetItemMagicalCritDamage2(unit, params)) * 0.01);
	return 0;
}
/** 装备先聚合，永久加成在各自乘区中相加，三围派生增伤另乘。 */
function GetAthenaOutgoingMultiplier(unit: CDOTA_BaseNPC, params: DamageInfo) {
	let result = 1;
	const factor = (value: number) => { result *= 1 + value * 0.01; };
	factor(GetItemOutgoingDamage(unit, params));
	factor(GetItemOutgoingDamage2(unit, params) + GetAthenaFinallyDamage(unit, params));
	factor(GetOutgoingDamagePercentage(unit, params));
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
		factor(GetItemPhysicalDamage(unit, params) + GetAthenaPhysicalDamage(unit, params)); factor(GetItemPhysicalDamage2(unit, params));
		factor(GetOutgoingPhysicalDamagePercentage(unit, params)); factor(GetAgility(unit) * 0.002 + GetOutgoingPhysicalDamagePercentageAgi(unit, params));
	} else if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
		factor(GetItemMagicalDamage(unit, params) + GetAthenaMagicalDamage(unit, params)); factor(GetItemMagicalDamage2(unit, params));
		factor(GetOutgoingMagicalDamagePercentage(unit, params)); factor(GetIntellect(unit) * 0.02 + GetOutgoingMagicalDamagePercentageInt(unit, params));
	}
	return result;
}
/** 护甲只减免物理伤害，魔法保留旧版固定 25% 抗性；格挡在百分比减免后扣除。 */
function GetAthenaIncomingMultiplier(unit: CDOTA_BaseNPC, params: DamageInfo) {
	let result = 1;
	const factor = (value: number) => { result *= 1 + value * 0.01; };
	if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
		let armor = GetAthenaArmor(unit, params);
		if (armor > 0) {
			armor = math.max(0, armor - GetIgnoreArmor(params.attacker, params));
			const ignore = 1 - (1 - GetIgnoreArmorPercentageTarget(unit, params) * 0.01)
				* (1 - GetIgnoreArmorPercentage(params.attacker, params) * 0.01) * (1 - GetIgnoreArmorPercentageUnique(params.attacker, params) * 0.01)
				* (1 - (AthenaProperty(params.attacker, PropertyFunction.ATHENA_ARMOR_IGNORE, params) + GetItemArmorIgnorePct(params.attacker, params)) * 0.01);
			armor -= math.max(armor * ignore, 0);
		}
		result *= 1 - 0.06 * armor / (1 + 0.06 * math.abs(armor));
		factor(GetIncomingPhysicalDamagePercentage(unit, params)); result *= 1 - GetItemDamageReducePhysical(unit, params) * 0.01;
	} else if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
		result *= 0.75; factor(GetIncomingMagicalDamagePercentage(unit, params)); result *= 1 - GetItemDamageReduceMagical(unit, params) * 0.01;
	} else return 1;
	factor(GetIncomingDamagePercentage(unit, params)); factor(GetIncomingDamagePercentageStr(unit, params));
	// 保留旧版的符号：这里的力量项是正百分比，清单中记录了与注释不符的行为。
	factor(math.min(60, GetStrength(unit) * 0.0005));
	for (const value of [GetItemDamageReduce(unit, params), GetItemDamageReduce2(unit, params), GetAthenaDamageReduce(unit, params), GetAthenaDamageReduce2(unit, params), GetItemIncomingDamage(unit, params)]) result *= 1 - value * 0.01;
	return result;
}
function GetAthenaDamageBlock(unit: CDOTA_BaseNPC, params: DamageInfo) {
	// 原版 IgnoreDamageAgi 实际读取力量，不在系统迁移时更改平衡。
	return GetIgnoreDamage(unit, params) + GetIgnoreDamageAgi(unit, params) + GetStrength(unit) * 0.2;
}
