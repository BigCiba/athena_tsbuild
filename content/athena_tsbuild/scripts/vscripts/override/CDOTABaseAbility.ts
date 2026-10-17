/** @noSelfInFile */

declare interface CDOTABaseAbility {
	__AbilityValueEntries?: { propertyKey: string; specialValueKey: string; }[];
	behavior?: DOTA_ABILITY_BEHAVIOR,
	searchBehavior?: AI_SEARCH_BEHAVIOR,
	aoeRadius?: number,
	startWidth?: number,
	endWidth?: number,
	targetTeam?: DOTA_UNIT_TARGET_TEAM,
	targetType?: DOTA_UNIT_TARGET_TYPE,
	targetFlags?: DOTA_UNIT_TARGET_FLAGS,
	funcSortFunction?: (a: CDOTA_BaseNPC, b: CDOTA_BaseNPC) => boolean,
	funcCondition?: (ability: CDOTA_Ability_Lua) => boolean,
	funcUnitsCallback?: (this: CDOTA_Ability_Lua, tTargets: CDOTA_BaseNPC[]) => CDOTA_BaseNPC[],
	isNotPassive?: boolean,
	orderType?: FindOrder,
	__StackCount: number;
	__Charge: number;
	__ChargeRestoreTime: number;
	__IsChargeCooldownFrozen?: boolean;
	__ChargeFrozenCooldownRemaining?: number;
	__ExtraStaticPropertyList?: Record<string, StaticPropertyData[]>;
	__ExtraStaticPropertyCache?: ExtraPropertyTable;
	__RuneAttributeSummary?: Record<string, number>;
	__RuneSuitPointSummary?: Record<string, number>;
	__RuneEffectSummary?: Record<string, number>;

	/** 伪随机 */
	PRD(chance: number, pseudo_random_recording?: string): boolean;

	SaveData(key: string, value: any): void;
	LoadData<T>(key: string, defaultValue: T): T;
	/**
	 * 技能是否准备就绪可以施放
	 * @serverOnly
	 */
	IsAbilityReady(): boolean;
	/**
	 * 技能是否是可以触发技能施法事件
	 */
	CanProcsCast(): boolean;
	/** 减少冷却 */
	ReduceCooldown(reduce: number): void;

	/** 控制器事件 */
	OnController(position: Vector, direction: Vector): void;

	/** 获取伤害类型 */
	GetDamageType(): EOM_DAMAGE_TYPES;
	/** 获取伤害类型 */
	GetAbilityTag(): AbilityTag;

	GetLevelSpecialValueFor_Engine: typeof CDOTABaseAbility.GetLevelSpecialValueFor;
	GetSpecialValueFor_Engine: typeof CDOTABaseAbility.GetSpecialValueFor;
	GetLevelSpecialValueFor(key: string, level: number, caster?: CDOTA_BaseNPC): number;
	GetSpecialValueFor(key: string, caster?: CDOTA_BaseNPC): number;
	IncrementStackCount(stackCount?: number, update?: boolean): void;
	DecrementStackCount(stackCount?: number, update?: boolean): void;
	SetStackCount(stack: number, update?: boolean): void;
	GetStackCount(): number;

	__EventIDList?: number[];
	StaticProperty(): Partial<Record<PropertyFunction, any>>;
	DynamicProperty(): Partial<Record<PropertyFunction, DynamicPropertyFunction>>;
	EventListener(): Partial<EventListenerMap>;
	UnitEventListener(): Partial<UnitEventListenerMap>;
	OnAbilityChargeChanged?: (charge: number, oldCharge: number) => void;
	__NotifyChargeChanged(oldCharge: number): void;
	/** 刷新静态属性 */
	RefreshStaticProperty(): void;

	StaticStates(): Partial<Record<StateEnum, any>>;
	DeclareState(): Partial<Record<StateEnum, () => boolean>>;
	/** 刷新静态状态 */
	RefreshStaticState(): void;

	/**
	 * 技能创建
	 * @serverOnly
	 */
	OnCreated(): void;
	/** @private */
	__OnCreated(): void;
	/**
	 * 技能刷新
	 * @serverOnly
	 */
	OnRefresh(): void;
	/** @private */
	__OnRefresh(): void;
	/**
	 * 技能销毁
	 * @serverOnly
	 */
	OnDestroy(): void;
	/** @private */
	__OnDestroy(): void;

	/** 更新KV键值的函数，每次创建和刷新的时候会调用 */
	GetSpecialValue(): void;

	/** UseResource */
	GetCooldown_Engine(level: number): number;
	GetCooldown(level: number): number;
	UseCooldown(): void;

	/** 获取最大充能 */
	GetMaxCharges(): number;
	/** 获取当前充能 */
	GetCharges(): number;
	/** 获取充能时间 */
	GetChargeRestoreTime(): number;
	/** 使用1点充能 */
	UseCharges(): boolean;
	/** 恢复充能 */
	RestoreCharges(charges?: number): void;

	/** @private */
	SetFrozenCooldown_Engine: typeof CDOTABaseAbility.SetFrozenCooldown;
	SetFrozenCooldown(frozen: boolean): void;
	IsChargeCooldownFrozen(): boolean;
	GetChargeCooldownRemaining(): number;

	/** 施法冷却，防止有充能点的情况下连续施法 */
	GetCastCooldown(): number;

	/** 获取辅助施法点 */
	GetSupportCastPoint(): Vector;
}
let DOTABaseAbility = IsServer() ? CDOTABaseAbility : C_DOTABaseAbility;
DOTABaseAbility.IsAbility = function () {
	return true;
};
DOTABaseAbility.SaveData = function (key, value) {
	if (!IsValid(this)) return;
	const caster = this.GetCaster();
	if (!IsValid(caster)) return;
	caster.SaveData(this.GetAbilityName() + key, value);
};
DOTABaseAbility.LoadData = function (key, defaultValue) {
	const caster = this.GetCaster();
	return caster._saveData_?.[this.GetAbilityName() + key] ?? defaultValue;
};
DOTABaseAbility.PRD = function (chance, pseudo_random_recording) {
	return PRD(this.GetCaster(), chance, pseudo_random_recording ?? this.GetName());
};

// 保存原始的 GetSpecialValueFor 函数
DOTABaseAbility.GetLevelSpecialValueFor_Engine ??= DOTABaseAbility.GetLevelSpecialValueFor;
DOTABaseAbility.GetSpecialValueFor_Engine ??= DOTABaseAbility.GetSpecialValueFor;
/** 覆盖 GetSpecialValueFor 以支持技能升级系统 */
DOTABaseAbility.GetLevelSpecialValueFor = function (key: string, level: number, caster?: CDOTA_BaseNPC): number {
	if (!IsValid(this)) return 0;
	caster = caster ?? this.GetCaster();
	const abilityName = this.GetAbilityName();
	const abilityKV = this.IsItem() ? KeyValues.items[abilityName] : KeyValues.abilities[abilityName];
	if (abilityKV == undefined) {
		return 0;
	}
	const AbilityValues = abilityKV.AbilityValues ?? {};
	const valueKV = abilityKV[key] ?? AbilityValues[key];
	let baseValue = GetAbilityValues(valueKV, level, caster);
	if (key == "abilitycharges") {
		// baseValue += GetAbilityChargeByType(this);
	}
	return AbilityUpgrade.GetUpgradedValue(caster, abilityName, level, key, baseValue);
};
/** 覆盖 GetSpecialValueFor 以支持技能升级系统 */
DOTABaseAbility.GetSpecialValueFor = function (key: string, caster?: CDOTA_BaseNPC): number {
	return this.GetLevelSpecialValueFor(key, this.GetLevel(), caster);
};
DOTABaseAbility.GetSpecialValue = function () {
	const entries = this.__AbilityValueEntries;
	if (entries == undefined) {
		return;
	}
	for (let i = 0; i < entries.length; i++) {
		const entry = entries[i];
		(this as any)[entry.propertyKey] = this.GetSpecialValueFor(entry.specialValueKey);
	}
};
DOTABaseAbility.IncrementStackCount = function (stackCount?: number, update = false) {
	this.__StackCount ??= 0;
	this.__StackCount += stackCount ?? 1;
	this.RefreshStaticProperty();
	if (update && this.IsItem()) {
		this.GetCaster().UpdateAbilityNetData();
	}
};
DOTABaseAbility.DecrementStackCount = function (stackCount?: number, update = false) {
	this.__StackCount ??= 0;
	this.__StackCount -= stackCount ?? 1;
	this.RefreshStaticProperty();
	if (update && this.IsItem()) {
		this.GetCaster().UpdateAbilityNetData();
	}
};
DOTABaseAbility.SetStackCount = function (stackCount: number, update = false) {
	this.__StackCount = stackCount;
	this.RefreshStaticProperty();
	if (update && this.IsItem()) {
		this.GetCaster().UpdateAbilityNetData();
	}
};
DOTABaseAbility.GetStackCount = function () {
	return this.__StackCount ?? 0;
};
DOTABaseAbility.RefreshStaticProperty = function () {
	const caster = this.GetCaster();
	if (this.StaticProperty != undefined) {
		for (const [property, value] of pairs(this.StaticProperty())) {
			if (PROPERTY_MAP_REVERSE[property]) {
				PropertySystem.AddStaticProperty(caster.entindex(), PROPERTY_MAP_REVERSE[property], this.GetName() + this.entindex(), value);
			}
		}
	}
};
DOTABaseAbility.GetAbilityTag = function () {
	const abilityTag = (KeyValues.abilities[this.GetAbilityName()]?.AbilityTag ?? "None") as "None";
	return AbilityTag[abilityTag];
};
DOTABaseAbility.GetMaxCharges = function () {
	const charge = this.GetSpecialValueFor("abilitycharges");
	if (charge > 0) {
		return 1 + charge;
	}
	return 0;
};
DOTABaseAbility.GetCharges = function () {
	return this.__Charge;
};
DOTABaseAbility.GetChargeRestoreTime = function () {
	const cooldown = this.GetEffectiveCooldown(this.GetLevel() - 1);
	const abilityTag = this.GetAbilityTag();
	const caster = this.GetCaster();
	switch (abilityTag) {
		case AbilityTag.Defense:
			return cooldown * (1 - GetAbilityChargeDefenseTime(caster) * 0.01);
		default:
			return cooldown;
	}
};
DOTABaseAbility.IsChargeCooldownFrozen = function () {
	return this.__IsChargeCooldownFrozen === true;
};
DOTABaseAbility.GetChargeCooldownRemaining = function () {
	if (this.IsChargeCooldownFrozen()) {
		return this.__ChargeFrozenCooldownRemaining ?? 0;
	}
	return math.max(0, (this.__ChargeRestoreTime ?? GameRules.GetGameTime()) - GameRules.GetGameTime());
};

// 特效处理相关
declare interface CDOTABaseAbility {
	/** @private */
	__ParticleIDs: ParticleID[];
	/** 添加到特效管理中，在技能销毁时自动销毁，也可以调用 */
	AddParticle(particleID: ParticleID): void;
	/** 删除__ParticleList中的特效 */
	DestroyParticles(): void;
	/** @private */
	__WarningParticleIDs: ParticleID[];
	AddWarningParticle(particleID: ParticleID): void;
	DestroyWarningParticles(interrupted?: boolean): void;
	/** 直线警示 */
	LineWarning(start: Vector | CDOTA_BaseNPC, end: Vector | CDOTA_BaseNPC, width: number, duration: number): ParticleID;
	LineWarning(start: Vector | CDOTA_BaseNPC, end: Vector | CDOTA_BaseNPC, startWidth: number, endWidth: number, duration: number): ParticleID;
	/** 圆形警示 */
	CircleWarning(position: Vector | CDOTA_BaseNPC, radius: number, duration: number): ParticleID;
	/** 扇形警示 */
	SectorWarning(start: Vector, direction: Vector, radius: number, angle: number, duration: number): ParticleID;
	/** 截断扇形警示（近端截断的扇形区域） */
	TruncatedSectorWarning(start: Vector, direction: Vector, innerRadius: number, outerRadius: number, angle: number, duration: number): ParticleID;

}
DOTABaseAbility.AddParticle = function (particleID) {
	this.__ParticleIDs ??= [];
	this.__ParticleIDs.push(particleID);
};
DOTABaseAbility.DestroyParticles = function () {
	if (this.__ParticleIDs != undefined) {
		for (const [i, particleID] of ipairs(this.__ParticleIDs)) {
			ParticleManager.DestroyParticle(particleID, false);
			ParticleManager.ReleaseParticleIndex(particleID);
		}
	}
	this.__ParticleIDs = [];
};
DOTABaseAbility.AddWarningParticle = function (particleID) {
	this.__WarningParticleIDs ??= [];
	this.__WarningParticleIDs.push(particleID);
};
DOTABaseAbility.DestroyWarningParticles = function (interrupted = false) {
	if (this.__WarningParticleIDs == undefined) return;
	for (const warnParticleId of this.__WarningParticleIDs) {
		ParticleManager.DestroyParticle(warnParticleId, interrupted);
		ParticleManager.ReleaseParticleIndex(warnParticleId);
	}
	this.__WarningParticleIDs = [];
};
DOTABaseAbility.LineWarning = function (start: Vector | CDOTA_BaseNPC, end: Vector | CDOTA_BaseNPC, startWidth: number, endWidth: number, duration: number) {
	const particleID = ParticleManager.CreateParticleForce("particles/generic_gameplay/creep_linear_warning_fx.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, undefined);
	let startUnit = start as CDOTA_BaseNPC;
	let startPosition = start as Vector;
	let endUnit = end as CDOTA_BaseNPC;
	let endPosition = end as Vector;
	if (startUnit.GetAbsOrigin != undefined) {
		ParticleManager.SetParticleControlEnt(particleID, 0, startUnit, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, undefined, startUnit.GetAbsOrigin(), true);
	} else {
		ParticleManager.SetParticleControl(particleID, 0, startPosition);
	}
	if (endUnit.GetAbsOrigin != undefined) {
		ParticleManager.SetParticleControlEnt(particleID, 1, endUnit, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, undefined, endUnit.GetAbsOrigin(), true);
	} else {
		ParticleManager.SetParticleControl(particleID, 1, endPosition);
	}
	if (duration == undefined) {
		duration = endWidth;
		endWidth = startWidth;
	}
	ParticleManager.SetParticleControl(particleID, 2, Vector(duration, startWidth, endWidth));
	ParticleManager.SetParticleControl(particleID, 15, Vector(1, 0, 0));
	this.AddWarningParticle(particleID);
	return particleID;
};
DOTABaseAbility.CircleWarning = function (start: Vector | CDOTA_BaseNPC, radius: number, duration: number) {
	let unit = start as CDOTA_BaseNPC;
	let position = start as Vector;
	const particleID = ParticleManager.CreateParticleForce("particles/warning/circular.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, undefined);
	if (unit.GetAbsOrigin != undefined) {
		ParticleManager.SetParticleControlEnt(particleID, 0, unit, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, undefined, unit.GetAbsOrigin(), true);
		ParticleManager.SetParticleControlEnt(particleID, 1, unit, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, undefined, unit.GetAbsOrigin(), true);
	} else {
		ParticleManager.SetParticleControl(particleID, 0, position);
		ParticleManager.SetParticleControl(particleID, 1, position);
	}
	ParticleManager.SetParticleControl(particleID, 2, Vector(radius, duration, 0));
	this.AddWarningParticle(particleID);
	return particleID;
};
DOTABaseAbility.SectorWarning = function (start: Vector, direction: Vector, radius: number, angle: number, duration: number) {
	const particleID = ParticleManager.CreateParticleForce("particles/warning/sector.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, undefined);
	ParticleManager.SetParticleControlTransformForward(particleID, 0, start, direction);
	ParticleManager.SetParticleControl(particleID, 1, Vector(radius, angle, duration));
	this.AddWarningParticle(particleID);
	return particleID;
};
DOTABaseAbility.TruncatedSectorWarning = function (start: Vector, direction: Vector, innerRadius: number, outerRadius: number, angle: number, duration: number) {
	const particleID = ParticleManager.CreateParticleForce("particles/warning/creep_sector_waring_fx.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, undefined);
	ParticleManager.SetParticleControlTransformForward(particleID, 0, start, direction);
	ParticleManager.SetParticleControl(particleID, 1, Vector(innerRadius, outerRadius, angle));
	ParticleManager.SetParticleControl(particleID, 2, Vector(outerRadius, duration, 0));
	this.AddWarningParticle(particleID);
	return particleID;
};

// 1. CDOTABaseAbility / C_DOTABaseAbility
//     - 这是一个自定义对象，承载了所有的自定义方法
//     - 例如：GetMaxCharges, GetCharges, GetChargeRestoreTime, GetAbilityTag 等
//     - 这些方法在第99-200行通过 DOTABaseAbility.Method = function() 定义
//   2. CDOTA_Ability_Lua / C_DOTA_Ability_Lua
//     - 这是引擎原始类
//     - BaseAbility.prototype.__index 指向它
//     - 当 TypeScript 类中调用 super.GetCooldown() 时，实际调用的是 CDOTA_Ability_Lua.GetCooldown

//********************************************************************************
// Engine GetCooldown Override (Server & Client)
//********************************************************************************
const DOTALuaAbility = IsServer() ? CDOTA_Ability_Lua : C_DOTA_Ability_Lua;
DOTALuaAbility.GetCooldown_Engine ??= DOTALuaAbility.GetCooldown;
DOTALuaAbility.GetCooldown = function (this: CDOTABaseAbility, level: number): number {
	return this.GetCooldown_Engine(level)
};

//********************************************************************************
// Server
//********************************************************************************
if (IsServer()) {
	CDOTABaseAbility.SetFrozenCooldown_Engine ??= CDOTABaseAbility.SetFrozenCooldown;
	CDOTABaseAbility.SetFrozenCooldown = function (frozen: boolean) {
		this.SetFrozenCooldown_Engine(frozen);

		const caster = this.GetCaster();
		const now = GameRules.GetGameTime();
		const hasChargeCooldown = this.GetMaxCharges() > 0 && this.GetCharges() < this.GetMaxCharges();
		if (frozen) {
			if (!this.IsChargeCooldownFrozen()) {
				this.__IsChargeCooldownFrozen = true;
				this.__ChargeFrozenCooldownRemaining = hasChargeCooldown ? math.max(0, this.__ChargeRestoreTime - now) : 0;
			}
		} else if (this.IsChargeCooldownFrozen()) {
			if (hasChargeCooldown) {
				this.__ChargeRestoreTime = now + (this.__ChargeFrozenCooldownRemaining ?? 0);
			} else {
				this.__ChargeRestoreTime = now;
			}
			this.__IsChargeCooldownFrozen = false;
			this.__ChargeFrozenCooldownRemaining = 0;
		}
		if (IsValid(caster)) {
			caster.UpdateAbilityNetData();
		}
	};
	CDOTABaseAbility.__OnCreated = function () {
		this.__Charge = 0;
		this.__ChargeRestoreTime = GameRules.GetGameTime();
		this.__IsChargeCooldownFrozen = false;
		this.__ChargeFrozenCooldownRemaining = 0;
		const caster = this.GetCaster();
		const playerID = caster.GetPlayerOwnerID()
		if (this.StaticProperty != undefined) {
			for (const [property, value] of pairs(this.StaticProperty())) {
				if (PROPERTY_MAP_REVERSE[property]) {
					PropertySystem.AddStaticProperty(caster.entindex(), PROPERTY_MAP_REVERSE[property], this.GetName() + this.entindex(), value);
				}
			}
		}
		if (this.DynamicProperty != undefined) {
			for (const [property, func] of pairs(this.DynamicProperty())) {
				if (PROPERTY_MAP_REVERSE[property]) {
					PropertySystem.RegisterDynamicProperty(caster.entindex(), PROPERTY_MAP_REVERSE[property], this.GetName() + this.entindex(), func);
				}
			}
		}
		if (IsServer() && this.UnitEventListener) {
			this.__EventIDList ??= [];
			this.__EventIDList.push(...Event.RegisterUnitListeners(this.UnitEventListener(), caster, this));
		}
		if (this.EventListener != undefined) {
			this.__EventIDList ??= [];
			for (const [event, listener] of pairs(this.EventListener())) {
				// @ts-ignore
				this.__EventIDList.push(Event.RegisterForOwner(event, listener, caster));
			}
		}
		// 自动添加属性item_前缀属性
		const abilityName = this.GetAbilityName();
		const kv = KeyValues.abilities[abilityName] ?? KeyValues.items[abilityName];
		if (kv != undefined && kv.AbilityValues != undefined && kv.AbilityValues != "") {
			for (const [k, valueData] of pairs(kv.AbilityValues)) {
				if ((k as string).startsWith("item_")) {
					const value = GetAbilityValues(valueData as any, this.GetLevel(), caster);
					const property = (k as string).substring(5);
					if (PROPERTY_MAP[property] != undefined) {
						PropertySystem.AddStaticProperty(caster.entindex(), property, "item_" + this.GetName() + this.entindex(), value);
					}
				}
			}
		}
		// 遍历技能，如果有 abilitycharges 则刷新
		// const skill = caster.GetAbilityByTag(AbilityTag.Skill);
		// skill?.RefreshCharges();
		// const dodge = caster.GetAbilityByTag(AbilityTag.Dodge);
		// dodge?.RefreshCharges();
		// const defense = caster.GetAbilityByTag(AbilityTag.Defense);
		// defense?.RefreshCharges();
		// const ultimate = caster.GetAbilityByTag(AbilityTag.Ultimate);
		// ultimate?.RefreshCharges();
		const abilityTag = this.GetAbilityTag()
		if (
			abilityTag == AbilityTag.Attack ||
			abilityTag == AbilityTag.Skill ||
			abilityTag == AbilityTag.Dodge ||
			abilityTag == AbilityTag.Defense ||
			abilityTag == AbilityTag.Ultimate
		) {
			this.StartThink(0, "ChargeRestore", () => {
				if (this.GetMaxCharges() <= 0) return 0;
				if (this.GetChargeRestoreTime() <= 0) return 0;
				if (this.IsChargeCooldownFrozen()) return 0;
				if (this.GetCharges() < this.GetMaxCharges() && GameRules.GetGameTime() >= this.__ChargeRestoreTime) {
					this.RestoreCharges();
				}
			});
		}
		// 每个技能单独存储自动施法
		if (IsServer() && kv != undefined && Service.GetPlayerSetting<boolean>(playerID, "setting_switch_" + kv.AbilityTag, false)) {
			this.ToggleAutoCast()
		}

		this.OnCreated();
	};
	CDOTABaseAbility.OnCreated = function () { };
	CDOTABaseAbility.__OnRefresh = function () {
		const oldCharge = this.__Charge;
		this.__Charge = 0;
		this.__ChargeRestoreTime = GameRules.GetGameTime();
		this.__IsChargeCooldownFrozen = false;
		this.__ChargeFrozenCooldownRemaining = 0;
		const caster = this.GetCaster();
		if (this.StaticProperty != undefined) {
			for (const [property, value] of pairs(this.StaticProperty())) {
				if (PROPERTY_MAP_REVERSE[property]) {
					PropertySystem.AddStaticProperty(caster.entindex(), PROPERTY_MAP_REVERSE[property], this.GetName() + this.entindex(), value);
				}
			}
		}
		// 自动添加属性item_前缀属性
		const abilityName = this.GetAbilityName();
		const kv = KeyValues.abilities[abilityName] ?? KeyValues.items[abilityName];
		if (kv != undefined && kv.AbilityValues != undefined && kv.AbilityValues != "") {
			for (const [k, valueData] of pairs(kv.AbilityValues)) {
				if ((k as string).startsWith("item_")) {
					const value = GetAbilityValues(valueData as any, this.GetLevel(), caster);
					const property = (k as string).substring(5);
					if (PROPERTY_MAP[property] != undefined) {
						PropertySystem.AddStaticProperty(caster.entindex(), property, "item_" + this.GetName() + this.entindex(), value);
					}
				}
			}
		}

		this.__NotifyChargeChanged(oldCharge);
		this.OnRefresh();
	};
	CDOTABaseAbility.OnRefresh = function () { };
	CDOTABaseAbility.__OnDestroy = function () {
		const caster = this.GetCaster();
		PropertySystem.RemoveStaticProperty(caster.entindex(), this.GetName() + this.entindex());
		PropertySystem.RemoveStaticProperty(caster.entindex(), "item_" + this.GetName() + this.entindex());
		PropertySystem.UnregisterDynamicProperty(caster.entindex(), this.GetName() + this.entindex());
		PropertySystem.ClearAbilityStaticProperties(this);
		if (this.__EventIDList != undefined) {
			this.__EventIDList.forEach(eventID => {
				Event.Unregister(eventID);
			});
		}
		this.DestroyParticles();
		this.OnDestroy();
	};
	CDOTABaseAbility.OnDestroy = function () { };
	CDOTABaseAbility.IsAbilityReady = function () {
		const hCaster = this.GetCaster();
		const iBehavior = this.GetBehaviorInt();

		if (!IsValid(hCaster)) {
			return false;
		}

		if (!(hCaster.IsAlive() || (iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNRESTRICTED)) {
			return false;
		}

		const hAbility = hCaster.GetCurrentActiveAbility();
		if (IsValid(hAbility) && hAbility.IsInAbilityPhase()) {
			return false;
		}

		if (this.GetLevel() <= 0) {
			return false;
		}

		if (this.IsHidden()) {
			return false;
		}

		if (!this.IsActivated()) {
			return false;
		}

		if (!this.IsCooldownReady()) {
			return false;
		}

		if (!this.IsOwnersManaEnough()) {
			return false;
		}

		if (!this.IsOwnersGoldEnough(hCaster.GetPlayerOwnerID())) {
			return false;
		}

		if (hCaster.IsHexed() || hCaster.IsCommandRestricted()) {
			return false;
		}

		if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE) != DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE && hCaster.IsStunned()) {
			return false;
		}

		if (!this.IsItem() && !this.IsPassive() && hCaster.IsSilenced()) {
			return false;
		}

		if (!this.IsItem() && this.IsPassive() && hCaster.PassivesDisabled()) {
			return false;
		}

		if (this.IsItem() && !this.IsPassive() && hCaster.IsMuted()) {
			return false;
		}

		if ((iBehavior & (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE)) !== (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE) && hCaster.IsChanneling()) {
			return false;
		}

		if (!this.IsFullyCastable()) {
			return false;
		}

		return true;
	};

	CDOTABaseAbility.CanProcsCast = function () {
		if (!IsValid(this)) {
			return false;
		}
		if (!this.IsAbility()) {
			return false;
		}
		if (this.IsItem()) {
			return false;
		}
		if (this.IsPassive()) {
			return false;
		}
		if (this.IsToggle()) {
			return false;
		}
		if (!this.ProcsMagicStick()) {
			return false;
		}
		return true;
	};

	CDOTABaseAbility.ReduceCooldown = function (reduce: number) {
		const remaining = this.GetCooldownTimeRemaining();
		this.EndCooldown();
		if (remaining > reduce) {
			this.StartCooldown(remaining - reduce);
		}
		this.RefreshCharges();
	};
	CDOTABaseAbility.OnController = function (position: Vector, direction: Vector): void { };

	CDOTABaseAbility.GetDamageType = function () {
		const kvDamageType = (KeyValues.abilities[this.GetAbilityName()]?.AbilityDamageType ?? "DAMAGE_TYPE_NONE") as "DAMAGE_TYPE_NONE";
		return EOM_DAMAGE_TYPES[kvDamageType];
	};

	CDOTABaseAbility.UseCooldown = function () {
		this.UseResources(false, false, false, true);
	};

	CDOTABaseAbility.UseCharges = function () {
		if (this.__Charge > 0) {
			const oldCharge = this.__Charge;
			const wasChargeCooldownFrozen = this.IsChargeCooldownFrozen();
			const frozenCooldownRemaining = this.__ChargeFrozenCooldownRemaining ?? 0;
			this.__Charge -= 1;
			if (this.__ChargeRestoreTime < GameRules.GetGameTime()) {
				this.__ChargeRestoreTime = GameRules.GetGameTime() + this.GetChargeRestoreTime();
			}
			if (wasChargeCooldownFrozen) {
				this.__ChargeFrozenCooldownRemaining = frozenCooldownRemaining > 0 ? frozenCooldownRemaining : math.max(0, this.__ChargeRestoreTime - GameRules.GetGameTime());
			}
			this.GetCaster().UpdateAbilityNetData();
			this.__NotifyChargeChanged(oldCharge);
			return true;
		}
		return false;
	};
	CDOTABaseAbility.RestoreCharges = function (charges = 1) {
		const oldCharge = this.__Charge;
		this.__Charge = math.min(this.__Charge + charges, this.GetMaxCharges());
		if (this.__Charge < this.GetMaxCharges()) {
			this.__ChargeRestoreTime = GameRules.GetGameTime() + this.GetChargeRestoreTime();
		} else {
			this.__ChargeRestoreTime = GameRules.GetGameTime();
			this.__IsChargeCooldownFrozen = false;
			this.__ChargeFrozenCooldownRemaining = 0;
		}
		this.GetCaster().UpdateAbilityNetData();
		this.__NotifyChargeChanged(oldCharge);
	};
	/** 仅实际数值变化发一次；保留原版先总线通知、再技能自身回调的顺序。 */
	CDOTABaseAbility.__NotifyChargeChanged = function (oldCharge: number) {
		if (!IsServer() || oldCharge === this.__Charge) return;
		const charge = this.__Charge;
		Event.FireUnit("ability_charge_changed", { unit: this.GetCaster(), ability: this, charge, old_charge: oldCharge }, this.GetCaster());
		if (IsValid(this) && this.OnAbilityChargeChanged) this.OnAbilityChargeChanged(charge, oldCharge);
	};
	CDOTABaseAbility.GetCastCooldown = function () {
		return 0;
	};
	CDOTABaseAbility.GetSupportCastPoint = function () {
		const caster = this.GetCaster();
		const playerID = caster.GetPlayerOwnerID();
		const animMode = Service.GetPlayerSetting<number>(playerID, "aim_mode", 2);
		const position = this.GetCursorPosition();
		if (animMode == 3) {
			return position;
		} else if (animMode == 2) {
			const animDistance = Service.GetPlayerSetting<number>(playerID, "Setting_aim_distance", 300);
			const targets = FindUnitsInRadius(
				caster.GetTeamNumber(),
				position,
				undefined,
				animDistance,
				DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
				DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
				DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
				FindOrder.FIND_CLOSEST,
				false
			);
			if (targets[0]) {
				// caster.StopFacing();
				// caster.SetForwardVector(CalcDirection2D(targets[0].GetAbsOrigin(), caster));
				return targets[0].GetAbsOrigin();
			}
		}
		return position;
	};

}

declare interface CDOTABaseAbility {
	/** 
	 * 持续朝向锁定目标 
	 * @param target 锁定目标
	 * @param turnRate 转向速度，默认为1，每秒转过的角度
	 * @param duration 持续时间，默认为施法前摇，单位为秒，负数表示持续到技能结束
	 * @serverOnly
	 */
	LockFacingTarget(target: CDOTA_BaseNPC, turnRate: number, duration?: number): void;
	/**
	 * 辅助实体持续朝向锁定目标
	 * @param start 初始位置
	 * @param target 锁定目标
	 * @param turnRate 转向速度，默认为1，每秒转过的角度
	 * @param distance 锁定距离，默认为技能施法范围
	 * @param duration 持续时间，默认为施法前摇，单位为秒，负数表示持续到技能结束
	 * @param flowAngle 跟随角度，在锁定目标的基础上增加一个角度偏移，默认为0，单位为度
	 */
	FacingSupport(start: Vector, target: CDOTA_BaseNPC, turnRate: number, distance?: number, duration?: number, flowAngle?: number): CDOTA_BaseNPC;
}
if (IsServer()) {
	CDOTABaseAbility.LockFacingTarget = function (target: CDOTA_BaseNPC, turnRate: number, duration?: number) {
		turnRate ??= 1;
		const caster = this.GetCaster();
		if (!IsValid(caster) || !IsValid(target)) return;
		const lockDuration = duration ?? this.GetCastPoint();
		const endTime = lockDuration >= 0 ? GameRules.GetGameTime() + lockDuration : -1;
		let currentYaw = caster.GetLocalAngles().y;
		this.StartThink(0, "LockFacingTarget", () => {
			if (!IsValid(this) || !IsValid(caster) || !IsValid(target) || !caster.IsAlive() || !target.IsAlive()) {
				return -1;
			}
			const targetDirection = CalcDirection2D(target.GetAbsOrigin(), caster);
			const targetYaw = VectorToAngles(targetDirection).y;
			const angleDiff = AngleDiff(targetYaw, currentYaw);
			const maxAngleChange = turnRate * FrameTime();
			const angleStep = math.max(-maxAngleChange, math.min(maxAngleChange, angleDiff));

			let newYaw = currentYaw + angleStep;
			if (math.abs(angleDiff) <= maxAngleChange) {
				newYaw = targetYaw;
			}
			caster.SetLocalAngles(0, newYaw, 0);
			caster.SetForwardVector(AnglesToVector(caster.GetLocalAngles()));
			caster.FaceTowards((caster.GetAbsOrigin() + caster.GetForwardVector()) as Vector);
			currentYaw = newYaw;
			if (endTime >= 0 && GameRules.GetGameTime() >= endTime) {
				return -1;
			}
			return 0;
		});
	};
	CDOTABaseAbility.FacingSupport = function (start: Vector, target: CDOTA_BaseNPC, turnRate: number, distance?: number, duration?: number, flowAngle?: number) {
		turnRate ??= 1;
		const caster = this.GetCaster();
		const thinker = CreateModifierThinker(caster, this, "modifier_tracing_support", {
			duration: duration ?? this.GetCastPoint(),
			entindex: target.entindex(),
			flowAngle: flowAngle ?? 0,
			turnRate: turnRate,
			distance: distance ?? this.GetCastRange(vec3_zero, undefined)
		}, start, caster.GetTeamNumber(), false);
		return thinker;
	};
};
