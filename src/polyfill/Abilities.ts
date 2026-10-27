
declare interface CScriptBindingPR_Abilities {
	/** 当前客户端必传 bToUpgrade；仅查询升级状态时传 false，上游类型仍是旧的单参数声明。 */
	CanAbilityBeUpgraded(abilityEntIndex: AbilityEntityIndex, bToUpgrade: boolean): AbilityLearnResult_t;
	GetChargeRestoreTime(abilityEntIndex: AbilityEntityIndex): number;
	GetCharge(abilityEntIndex: AbilityEntityIndex): number;
	GetMaxCharge(abilityEntIndex: AbilityEntityIndex): number;
	GetChargeInfo(abilityEntIndex: AbilityEntityIndex): {
		entIndex: EntityIndex;
		stackCount: number;
		charge: number;
		maxCharge: number;
		chargeRestoreTime: number;
		isChargeCooldownFrozen: boolean;
		chargeFrozenCooldownRemaining: number;
		abilityName: string;
	};
	/** 获取真实的技能冷却，抛弃官方的api */
	GetAbilityCooldown(abilityEntIndex: AbilityEntityIndex): number;
	/**
	 * 获取升级后的技能数值
	 * @param abilityName 技能名称
	 * @param baseAbilityValues 基础技能值
	 * @param unitEntIndex 单位实体index
	 */
	GetUpgradedAbilityValues(abilityName: string, baseAbilityValues: Table, unitEntIndex?: EntityIndex): Table;
}
Abilities.GetChargeRestoreTime = function (abilityEntIndex) {
	const netData = getNetDataKey("unit", Players.GetLocalPlayerPortraitUnit().toString()) ?? { abilities: [] };
	for (const abilityData of netData.abilities) {
		if (abilityData.entIndex == abilityEntIndex) {
			return abilityData.chargeRestoreTime;
		}
	}
	return 0;
};
Abilities.GetMaxCharge = function (abilityEntIndex) {
	const netData = getNetDataKey("unit", Players.GetLocalPlayerPortraitUnit().toString()) ?? { abilities: [] };
	for (const abilityData of netData.abilities) {
		if (abilityData.entIndex == abilityEntIndex) {
			return abilityData.maxCharge;
		}
	}
	return 0;
};
Abilities.GetCharge = function (abilityEntIndex) {
	const netData = getNetDataKey("unit", Players.GetLocalPlayerPortraitUnit().toString()) ?? { abilities: [] };
	for (const abilityData of netData.abilities) {
		if (abilityData.entIndex == abilityEntIndex) {
			return abilityData.charge;
		}
	}
	return 0;
};
Abilities.GetChargeInfo = function (abilityEntIndex) {
	const netData = getNetDataKey("unit", Players.GetLocalPlayerPortraitUnit().toString()) ?? { abilities: [] };
	for (const abilityData of netData.abilities) {
		if (abilityData.entIndex == abilityEntIndex) {
			return abilityData;
		}
	}
	return {
		entIndex: -1 as EntityIndex,
		stackCount: 0,
		abilityName: "",
		charge: 0,
		maxCharge: 0,
		chargeRestoreTime: 0,
		isChargeCooldownFrozen: false,
		chargeFrozenCooldownRemaining: 0,
	};
};
Abilities.GetAbilityCooldown = function (abilityEntIndex) {
	const casterIndex = Abilities.GetCaster(abilityEntIndex);
	return Abilities.GetCooldown(abilityEntIndex) * (1 - Entities.GetPropertyValue(casterIndex, "cooldown_reduction") * 0.01);
};

/** 解析值数据在指定level的数值 */
function parseValueAtLevel(valueData: string | Table | undefined, level: number): number {
	if (valueData === undefined) return 0;

	const valueString = typeof valueData == "object" ? String(valueData.value) : String(valueData);
	const valueList = valueString.split(" ");
	const maxLevel = valueList.length - 1;
	return Number(valueList[Math.min(maxLevel, Math.max(0, level - 1))] ?? 0);
}

/** 将固定加成和百分比乘算统一应用到valueData的每一级上，保持原有格式 */
function calculateValueData(valueData: string | Table, bonus: number, multiplierPct: number): string | Table {
	if (bonus === 0 && multiplierPct === 0) return valueData;

	const factor = 1 + multiplierPct * 0.01;
	const calculateValueList = (value: any) => String(value)
		.split(" ")
		.map(v => String(Round((Number(v) + bonus) * factor, 6)))
		.join(" ");

	if (typeof valueData == "object") {
		return { ...valueData, value: calculateValueList(valueData.value) };
	}

	return calculateValueList(valueData);
}

Abilities.GetUpgradedAbilityValues = function (abilityName, baseAbilityValues, unitEntIndex) {
	if (unitEntIndex == undefined || unitEntIndex < 0) {
		return baseAbilityValues;
	}

	const data = getNetDataKey("ability_upgrade", String(unitEntIndex));
	if (!data?.upgrades) {
		return baseAbilityValues;
	}

	const bonusByTarget: Record<string, number> = {};
	const multiplierPctByTarget: Record<string, number> = {};

	// 遍历所有升级，分别累计固定加成和百分比乘算
	for (const upgrade of data.upgrades) {
		const upgradeKV = KeyValues.ability_upgrades?.[upgrade.name] ?? KeyValues.ability_upgrades_service?.[upgrade.name];
		if (!upgradeKV || upgradeKV.ability_name !== abilityName || !upgradeKV.AbilityValues) {
			continue;
		}

		for (const key in upgradeKV.AbilityValues) {
			if (baseAbilityValues[key] === undefined) continue;

			const upgradeValue = upgradeKV.AbilityValues[key];
			const bonus = parseValueAtLevel(upgradeValue, upgrade.level);
			bonusByTarget[key] = (bonusByTarget[key] ?? 0) + bonus;
		}

		const valueMultipliers = upgradeKV.AbilityValueMultipliers;
		if (valueMultipliers !== undefined) {
			for (const targetKey in valueMultipliers) {
				if (baseAbilityValues[targetKey] === undefined) continue;

				const multiplierValueName = valueMultipliers[targetKey];
				const multiplierValue = upgradeKV.AbilityValues[multiplierValueName];
				multiplierPctByTarget[targetKey] = (multiplierPctByTarget[targetKey] ?? 0) + parseValueAtLevel(multiplierValue, upgrade.level);
			}
		}
	}

	const mergedValues: Table = {};
	for (const key in baseAbilityValues) {
		mergedValues[key] = calculateValueData(
			baseAbilityValues[key],
			bonusByTarget[key] ?? 0,
			multiplierPctByTarget[key] ?? 0
		);
	}

	return mergedValues;
};
