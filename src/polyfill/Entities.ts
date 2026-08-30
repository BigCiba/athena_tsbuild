
declare interface CScriptBindingPR_Entities {
	/**
	 * 判断单位是否拥有modifier
	 * @param unitEntIndex 单位
	 * @param buffName modifier名字
	 * @returns 返回是否拥有
	 */
	HasBuff(unitEntIndex: EntityIndex, buffName: string): boolean;
	/**
	 * 判断单位是否拥有modifier
	 * @param unitEntIndex 单位
	 * @param buffName modifier名字
	 * @returns 返回是BuffID
	 */
	FindBuffByName(unitEntIndex: EntityIndex, buffName: string): BuffID;

	/**
	 * 获取单位血条宽度
	 * @param unitEntIndex 单位
	 * @returns 返回血条宽度，无修改则为-1
	 */
	GetHealthBarWidth(unitEntIndex: EntityIndex): number;
	/**
	 * 获取单位血条高度
	 * @param unitEntIndex 单位
	 * @returns 返回血条高度，无修改则为-1
	 */
	GetHealthBarHeight(unitEntIndex: EntityIndex): number;

	/**
	 * 获取属性值
	 * @param key 单位entindex
	 * @param propertyId 属性名
	 * @param fallbackToPlayer 单位 scope 未命中时是否回退查询玩家 scope（默认 true）
	 */
	GetPropertyValue(key: EntityIndex, propertyId: string, fallbackToPlayer?: boolean): number;

	/**
	 * 获取状态
	 * @param unitEntIndex 
	 * @param stateId 
	 */
	HasState(unitEntIndex: EntityIndex, stateId: StateEnum): boolean;
	/**
	 * 获取最大怒气
	 * @param unitEntIndex 单位
	 * @returns 返回最大怒气
	 */
	GetMaxMana_Engine(unitEntIndex: EntityIndex): number;
	GetMaxMana(unitEntIndex: EntityIndex): number;
	/**
	 * 获取最大生命值
	 * @param unitEntIndex 单位
	 * @returns 返回最大生命值
	 */
	// GetMaxHealth_Engine(unitEntIndex: EntityIndex): number;
	// GetMaxHealth(unitEntIndex: EntityIndex): number;

	/** 是否显示血条 */
	HasHealthBar(unitEntIndex: EntityIndex): boolean;
	/** 获取攻击力 */
	GetAttackDamage(unitEntIndex: EntityIndex): number;

	/** 获取护盾 */
	GetShield(unitEntIndex: EntityIndex): number;
}
Entities.HasBuff = function (unitEntIndex, buffName) {
	for (let index = 0;index < Entities.GetNumBuffs(unitEntIndex);index++) {
		let buff = Entities.GetBuff(unitEntIndex, index);
		if (Buffs.GetName(unitEntIndex, buff) == buffName)
			return true;
	}
	return false;
};

Entities.FindBuffByName = function (unitEntIndex, buffName) {
	for (let index = 0;index < Entities.GetNumBuffs(unitEntIndex);index++) {
		let buff = Entities.GetBuff(unitEntIndex, index);
		if (Buffs.GetName(unitEntIndex, buff) == buffName)
			return buff;
	}
	return -1 as BuffID;
};
Entities.GetHealthBarWidth = (iUnitEntIndex) => {
	return finiteNumber(Number(Entities.GetUnitData(iUnitEntIndex, "GetHealthBarWidth")), -1);
};

Entities.GetHealthBarHeight = (iUnitEntIndex) => {
	return finiteNumber(Number(Entities.GetUnitData(iUnitEntIndex, "GetHealthBarHeight")), -1);
};
Entities.GetPropertyValue = (key, propertyId, fallbackToPlayer = true) => {
	// 0 = UNIT scope
	const unitKey = `0_${key}`;
	const unitData = CustomNetTables.GetTableValue("property_system", unitKey);
	if (unitData && unitData[propertyId] != undefined) {
		return toFiniteNumber(Float(unitData[propertyId]), 0) as number;
	}
	if (fallbackToPlayer) {
		//fallback: 1 = PLAYER scope，用单位的所有者 playerID 查
		const playerID = Entities.GetPlayerOwnerID(key);
		if (playerID !== -1) {
			const playerKey = `1_${playerID}`;
			const playerData = CustomNetTables.GetTableValue("property_system", playerKey);
			if (playerData && playerData[propertyId] != undefined) {
				return toFiniteNumber(Float(playerData[propertyId]), 0) as number;
			}
		}
	}
	return 0;
};
Entities.HasState = (unitEntIndex, stateId) => {
	const entityKey = `unit_${unitEntIndex}`;
	const data = CustomNetTables.GetTableValue("state_system", entityKey);
	if (data && data[stateId] != undefined) {
		return Boolean(data[stateId]);
	}
	return false;
};

// Entities.GetMaxMana_Engine ??= Entities.GetMaxMana;
// Entities.GetMaxMana = (unitEntIndex: EntityIndex): number => {
// 	return (Entities.GetMaxMana_Engine(unitEntIndex) + Entities.GetPropertyValue(unitEntIndex, "mana")) * (1 + Entities.GetPropertyValue(unitEntIndex, "mana_amplify") * 0.01);
// };

// Entities.GetMaxHealth_Engine ??= Entities.GetMaxHealth;
// Entities.GetMaxHealth = (unitEntIndex): number => {
// 	return Math.floor((Entities.GetPropertyValue(unitEntIndex, "base_health") + Entities.GetPropertyValue(unitEntIndex, "health")) * (1 + Entities.GetPropertyValue(unitEntIndex, "health_amplify") * 0.01) * (1 + Entities.GetPropertyValue(unitEntIndex, "defense_intensity") * INTENSITY_FACTOR * 0.01));
// };
Entities.HasHealthBar = (unitEntIndex) => {
	return Entities.HasState(unitEntIndex, StateEnum.HEALTH_BAR) && !Entities.HasState(unitEntIndex, StateEnum.NO_HEALTH_BAR);
};
Entities.GetAttackDamage = (unitEntIndex) => {
	return Float((Entities.GetPropertyValue(unitEntIndex, "base_attack") + Entities.GetPropertyValue(unitEntIndex, "attack")) * (1 + Entities.GetPropertyValue(unitEntIndex, "attack_amplify") / 100));
};
Entities.GetShield = (unitEntIndex) => {
	return Buffs.GetStackCount(unitEntIndex, Entities.FindBuffByName(unitEntIndex, "modifier_shield"));
};