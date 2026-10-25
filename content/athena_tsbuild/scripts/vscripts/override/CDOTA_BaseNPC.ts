/** @noSelfInFile */

//********************************************************************************
// Both
//********************************************************************************
declare interface CDOTA_BaseNPC {
	IsFriendly(target: CDOTA_BaseNPC): boolean;
	/** 获取属性 */
	GetProperty(property: PropertyFunction): number;
	/** 旧版永久属性入口，实际数值由 PropertySystem 按来源存储。 */
	AddPermanentAttribute(attribute: string, value: number, increase?: boolean): boolean;
	GetPermanentAttribute(attribute: string): number;

	GetAttackDamage_Engine(): number;
	GetAttackDamage(): number;

	GetBaseAttackTime(bIgnoreModifiers: boolean): number;
	// 怒气
	GetMaxMana_Engine(): number;
	GetMaxMana(): number;
	/**
	 * Give mana to this unit, this can be used for mana gained by abilities or item usage.
	 */
	GiveMana_Engine(mana: number): void;
	GiveMana(mana: number): void;
	/**
	 * Heal this unit.
	 */
	Heal_Engine(amount: number, inflictor: CDOTABaseAbility | undefined): void;
	Heal(amount: number, inflictor: CDOTABaseAbility | undefined): void;
	HealthCost(amount: number): void;
	/** @private 引擎真实生命读取，仅供大数值生命代理层使用。 */
	GetHealth_Engine(): number;
	/** @private 引擎真实生命写入，仅供大数值生命代理层使用。 */
	SetHealth_Engine: typeof CDOTA_BaseNPC.SetHealth;
	/** @private */
	ModifyHealth_Engine: typeof CDOTA_BaseNPC.ModifyHealth;
	/** @private */
	SetMaxHealth_Engine: typeof CDOTA_BaseNPC.SetMaxHealth;
	/** @private */
	SetBaseMaxHealth_Engine: typeof CDOTA_BaseNPC.SetBaseMaxHealth;
	GetMaxHealth_Engine(): number;
	GetMaxHealth(): number;
	GetHealthPercent_Engine(): number;
	GetHealthPercent(): number;
	HasState(state: StateId, params?: any): boolean;
}

enum KnockBackFlag {
	IS_HIDDEN = 1 << 0, // 隐藏
	IS_BUFF = 1 << 1, // 正面效果
	IS_PURGABLE = 1 << 2, // 可以被弱驱散
	IS_NOT_PURGE_EXCEPTION = 1 << 3, // 不能被强驱散
	NO_STUN = 1 << 4, // 没有眩晕效果
	IS_BLOCKABLE = 1 << 5, // 是否被阻挡
	RETAIN_ON_DEATH = 1 << 6, // 死亡时保留
	DESTROY_TREES = 1 << 7, // 摧毁树木
	NO_STUN_PARTICLE = 1 << 8, // 没有眩晕特效，前提不是NO_STUN
	IS_HORIZONTAL_FLAIL = 1 << 9, // 会将水平动作调整为ACT_DOTA_FLAIL
}



let BaseNPC = IsServer() ? CDOTA_BaseNPC : C_DOTA_BaseNPC;
BaseNPC.IsFriendly = function (hTarget: CDOTA_BaseNPC) {
	if (IsValid(this) && IsValid(hTarget)) {
		return this.GetTeamNumber() == hTarget.GetTeamNumber();
	}
	return false;
};
BaseNPC.GetProperty = function (property) {
	let propertyId = PROPERTY_MAP_REVERSE[property];
	if (propertyId == undefined) return 0;
	return PropertySystem.GetPropertyValueEx(propertyId, this.GetPlayerOwnerID(), this.entindex());
};
/** 自定义状态统一通过 StateSystem 查询；客户端读取服务端同步快照。 */
BaseNPC.HasState = function (state, params) {
	return StateSystem.GetStateValue(this.entindex(), state, params);
};

BaseNPC.GetAttackDamage_Engine ??= BaseNPC.GetAttackDamage;
BaseNPC.GetAttackDamage = function () {
	return GetAthenaAttack(this);
};
BaseNPC.AddPermanentAttribute = function (attribute, value, increase = false) { return UnitAttributes.AddPermanent(this, attribute, value, increase); };
BaseNPC.GetPermanentAttribute = function (attribute) { return UnitAttributes.GetPermanent(this, attribute); };

if (IsServer()) {
	CDOTA_BaseNPC.GetHealth_Engine ??= CDOTA_BaseNPC.GetHealth;
	CDOTA_BaseNPC.SetHealth_Engine ??= CDOTA_BaseNPC.SetHealth;
	CDOTA_BaseNPC.ModifyHealth_Engine ??= CDOTA_BaseNPC.ModifyHealth;
	CDOTA_BaseNPC.SetMaxHealth_Engine ??= CDOTA_BaseNPC.SetMaxHealth;
	CDOTA_BaseNPC.SetBaseMaxHealth_Engine ??= CDOTA_BaseNPC.SetBaseMaxHealth;

	CDOTA_BaseNPC.GetHealth = function () {
		return LargeNumberHealth.GetHealth(this) ?? this.GetHealth_Engine();
	};
	CDOTA_BaseNPC.SetHealth = function (health) {
		if (!LargeNumberHealth.SetHealth(this, health)) {
			this.SetHealth_Engine(health);
		}
	};
	CDOTA_BaseNPC.ModifyHealth = function (health, inflictor, lethal, damageFlags) {
		if (!LargeNumberHealth.ModifyHealth(this, health)) {
			this.ModifyHealth_Engine(health, inflictor, lethal, damageFlags);
		}
	};
}

BaseNPC.Heal_Engine ??= BaseNPC.Heal;

BaseNPC.Heal = function (amount, inflictor) {
	const hp = this.GetHealth();
	this.ModifyHealth(math.min(hp + amount, this.GetMaxHealth()), inflictor, false, 0);
	// fire event;
};
BaseNPC.HealthCost = function (amount) {
	const hp = this.GetHealth();
	this.ModifyHealth(math.min(hp + amount, this.GetMaxHealth()), undefined, false, 0);
};
BaseNPC.GiveMana_Engine ??= BaseNPC.GiveMana;
BaseNPC.GiveMana = function (mana) {
	this.GiveMana_Engine(mana);
	Event.Fire("give_mana", { unit: this, manaAmount: mana });
};
BaseNPC.GetMaxHealth_Engine ??= BaseNPC.GetMaxHealth;
BaseNPC.GetMaxHealth = function () {
	return GetAthenaMaxHealth(this);
};

BaseNPC.GetHealthPercent_Engine ??= BaseNPC.GetHealthPercent;
BaseNPC.GetHealthPercent = function () {
	return (this.GetHealth() / this.GetMaxHealth()) * 100;
};
BaseNPC.GetMaxMana_Engine ??= BaseNPC.GetMaxMana;
BaseNPC.GetMaxMana = function () {
	return GetAthenaMaxMana(this);
};
//********************************************************************************
// Server
//********************************************************************************
interface PassiveCastExtraData {
	position?: Vector;
	castPoint?: number;
	castAnimation?: GameActivity_t;
	sActivityModifier?: string | object;
	animationRate?: number;
	target?: CDOTA_BaseNPC;
	bFadeAnimation?: boolean;
	fadeAnimationTime?: number;
	bIgnoreBackswing?: boolean;
	bUseCooldown?: boolean;
	bUseMana?: boolean;
	OnAbilityPhaseStart?: () => void;
	OnAbilityPhaseInterrupted?: () => void;
}

declare interface CDOTA_BaseNPC {
	/** @private */
	EmitSound_Engine: typeof CDOTA_BaseNPC.EmitSound;
	EmitSound(soundname: string, position?: Vector): void;
	/** @private */
	AddAbility_Engine: typeof CDOTA_BaseNPC.AddAbility;
	AddAbility(abilityName: string, level?: number): CDOTABaseAbility;
	/** @private */
	RemoveAbility_Engine: typeof CDOTA_BaseNPC.RemoveAbility;
	RemoveAbility(abilityName: string, level?: number): CDOTABaseAbility;
	/** @private */
	RemoveAbilityByHandle_Engine: typeof CDOTA_BaseNPC.RemoveAbilityByHandle;
	RemoveAbilityByHandle(ability: CDOTABaseAbility): void;

	__unitCanRespawn_: boolean;
	/** @private */
	RespawnUnit_Engine: typeof CDOTA_BaseNPC.RespawnUnit;
	/** @private */
	SetUnitCanRespawn_Engine: typeof CDOTA_BaseNPC.SetUnitCanRespawn;
	/** @private */
	UnitCanRespawn_Engine: typeof CDOTA_BaseNPC.UnitCanRespawn;
	/** @private */
	AddNewModifier_Engine: typeof CDOTA_BaseNPC.AddNewModifier;
	/** * Add a modifier to this unit. */
	AddNewModifier(
		caster: CDOTA_BaseNPC | undefined,
		ability: CDOTABaseAbility | undefined,
		modifierName: string,
		modifierTable: object | undefined,
		flags?: AddModifierFlag,
	): CDOTA_Buff | undefined;
	GetAttachmentPosition(attachmentName: string): Vector;
	/** 执行指令 */
	ExecuteOrder(iOrder: dotaunitorder_t, ...arg: any): void;
	/**
	 * 使目标向某个方向冲刺
	 * @param direction 方向
	 * @param distance 距离
	 * @param height 最大高度
	 * @param duration 持续时间
	 * @param intrinsicModifier 附带的modifier会在结束的时候销毁
	 * @param callback 结束回调
	 */
	Dash(direction: Vector, distance: number, height: number, duration: number, callback?: (position: Vector, hasLanded: boolean) => void): void;// 删除单位，会自动处理所有modifier
	/**
	 * 给单位施加击退BUFF
	 * @param caster 来源
	 * @param ability 技能
	 * @param modifierTable 击退参数
	 * @param flags buff添加flag
	 */
	KnockBack(direction: Vector, distance: number, height: number, duration: number, callback?: (position: Vector) => void): void;
	// 击晕
	Stun(caster: CDOTA_BaseNPC | undefined, ability: CDOTABaseAbility | undefined, duration: number): void;
	// 召唤者
	__Summoner: CDOTA_BaseNPC | undefined;
	/**
	 * 召唤单位
	 * @param unitName 单位名
	 * @param postion 召唤位置
	 * @param duration 持续时间
	 * @param extraData 额外数据
	 */
	SummonUnit(unitName: string, postion: Vector, duration?: number, extraData?: any): CDOTA_BaseNPC | undefined;
	/** 删除单位，会自动处理所有modifier */
	SafeRemoveUnit(): void;
	/** 被动施法模拟动作 */
	PassiveCast(ability: CDOTA_Ability_Lua, iOrderType: dotaunitorder_t, tExtraData: PassiveCastExtraData, func: (success: boolean) => void): void;
	/**
	 * 添加ActivityModifier
	 * @param sName
	 */
	AddActivityModifier(sName: string): void;
	/**
	 * 移除ActivityModifier
	 * @param sName
	 */
	RemoveActivityModifier(sName: string): void;
	AddActivityModifier_Engine(name: string): void;
	UpdateActivityModifier(): void;
	/** @private */
	__activityModifiers: string[] | undefined;
	/** @private */
	__isNotFirstSpawn: boolean | undefined;
	/** @private */
	__isRemoving: boolean | undefined;
	/** 造成伤害 */
	DealDamage(target: CDOTA_BaseNPC, ability: CDOTABaseAbility | undefined, damage: number, damage_type?: EOM_DAMAGE_TYPES, damage_flags?: EOM_DAMAGE_FLAGS): void;
	DealDamage(target: CDOTA_BaseNPC[], ability: CDOTABaseAbility | undefined, damage: number, damage_type?: EOM_DAMAGE_TYPES, damage_flags?: EOM_DAMAGE_FLAGS): void;
	DealDamage(target: any, ability: CDOTABaseAbility | undefined, damage: number, damage_type?: EOM_DAMAGE_TYPES, damage_flags?: EOM_DAMAGE_FLAGS): void;

	/** 造成攻击 */
	Attack(target: CDOTA_BaseNPC, params?: {
		/** 覆盖基础伤害 */
		baseDamage?: number;
		/** 附伤 */
		bonusDamage?: number;
		/** 增伤 0.0-base */
		damageAmplify?: number;
		/** 伤害类型 */
		damageType?: EOM_DAMAGE_TYPES;
		flags?: EOM_DAMAGE_FLAGS;
	}): void;

	/** @private */
	__items: {
		entIndex: EntityIndex,
		stackCount: number,
		level: number,
		charge: number,
		maxCharge: number,
		chargeRestoreTime: number,
		isChargeCooldownFrozen: boolean,
		chargeFrozenCooldownRemaining: number,
		itemName: string,
	}[] | undefined;
	AddItem(item: CDOTA_Item, updateNetData?: boolean): CDOTA_Item;
	AddItem_Engine(item: CDOTA_Item): CDOTA_Item;
	TakeItem_Engine(item: CDOTA_Item): CDOTA_Item;
	/** 以真实物品栏为准同步脚本生命周期和物品事件。 */
	SyncInventory(updateNetData?: boolean): void;
	__inventoryItems?: CDOTA_Item[];
	AddItemByName(itemName: string, level?: number, updateNetData?: boolean): CDOTA_Item;
	AddItemByName_Engine(itemName: string): CDOTA_Item;
	CheckNoDraw(ent?: CBaseEntity): void;
	AddNoDraw_Engine(): void;
	RemoveNoDraw_Engine(): void;
	RemoveItem_Engine(item: CDOTA_Item): void;
	RemoveAllItem(): void;
	GetAllItems(): CDOTA_Item[];
	GetItemByName(itemName: string): CDOTA_Item | undefined;
	GetItemByNameAndLevel(itemName: string, level: number): CDOTA_Item | undefined;
	HasItem(itemName: string): boolean;
	GetItemCount(itemName: string): number;

	/** 更新单位的物品网表 */
	UpdateAbilityNetData(): void;

	/** 调用技能的__OnCreated */
	CallAbilityCreated(): void;
	/** 调用技能的__OnRefresh */
	CallAbilityRefresh(): void;
	/** 调用技能的__OnDestroy */
	CallAbilityDestroy(): void;

	IsBoss(): boolean; //boss
	IsElite(): boolean; //精英
	IsCreep(): boolean; //小怪
}
if (IsServer()) {
	CDOTA_BaseNPC.EmitSound_Engine ??= CDOTA_BaseNPC.EmitSound;
	CDOTA_BaseNPC.EmitSound = function (sound: string, position?: Vector) {
		if (position) {
			EmitSoundOnLocationWithCaster(position, sound, this);
		} else {
			this.EmitSound_Engine(sound);
		}
	};

	CDOTA_BaseNPC.AddAbility_Engine ??= CDOTA_BaseNPC.AddAbility;
	CDOTA_BaseNPC.AddAbility = function (abilityName: string, level?: number) {
		let ability = this.AddAbility_Engine(abilityName);
		if (level != undefined && IsValid(ability)) {
			ability.SetLevel(level);
		}
		ability.__OnCreated();
		return ability;
	};
	CDOTA_BaseNPC.RemoveAbility_Engine ??= CDOTA_BaseNPC.RemoveAbility;
	CDOTA_BaseNPC.RemoveAbility = function (abilityName: string) {
		const ability = this.FindAbilityByName(abilityName);
		if (IsValid(ability)) {
			this.RemoveAbilityByHandle(ability);
		}
	};
	CDOTA_BaseNPC.RemoveAbilityByHandle_Engine ??= CDOTA_BaseNPC.RemoveAbilityByHandle;
	CDOTA_BaseNPC.RemoveAbilityByHandle = function (ability: CDOTABaseAbility) {
		if (IsValid(ability)) {
			if (ability.__OnDestroy != undefined) {
				ability.__OnDestroy();
			}
			this.RemoveAbilityByHandle_Engine(ability);
		}
	};

	CDOTA_BaseNPC.GetAttachmentPosition = function (attachName: string) {
		if (!IsValid(this)) return vec3_zero;
		return this.GetAttachmentOrigin(this.ScriptLookupAttachment(attachName));
	};

	CDOTA_BaseNPC.RespawnUnit_Engine ??= CDOTA_BaseNPC.RespawnUnit;
	CDOTA_BaseNPC.RespawnUnit = function () {
		if (!this.UnitCanRespawn()) return;
		let model = this.FirstMoveChild();
		while (model != undefined) {
			let next = model.NextMovePeer();
			if (model != undefined && model.GetClassname() != "" && model.GetClassname() == "dota_item_wearable") {
				UTIL_Remove(model);
			}
			model = next;
		}
		this.RespawnUnit_Engine();
	};

	CDOTA_BaseNPC.SetUnitCanRespawn_Engine ??= CDOTA_BaseNPC.SetUnitCanRespawn;
	CDOTA_BaseNPC.SetUnitCanRespawn = function (flag) {
		this.__unitCanRespawn_ = flag;
		// 处理回收计时器
		if (flag == true) {
			this.StopTimer("RecyclingUnit");
		} else if (!this.IsAlive() && !this.IsRealHero()) {
			this.GameTimer("RecyclingUnit", 8, () => {
				if (this.IsAlive()) return;
				if (this.IsRealHero()) return;
				if (this.UnitCanRespawn()) return;
				this.SafeRemoveUnit();
			});
		}
	};

	CDOTA_BaseNPC.UnitCanRespawn_Engine ??= CDOTA_BaseNPC.UnitCanRespawn;
	CDOTA_BaseNPC.UnitCanRespawn = function () {
		return this.__unitCanRespawn_ ?? false;
	};
	CDOTA_BaseNPC.AddNewModifier_Engine ??= CDOTA_BaseNPC.AddNewModifier;
	// @ts-ignore
	CDOTA_BaseNPC.AddNewModifier = function (caster, ability, modifierName, modifierTable: any, flags?: AddModifierFlag) {
		let modifier: CDOTA_Buff | undefined = undefined;
		if (flags != undefined) {
			// 无视死亡添加，但是不能同步到客户端
			if (IsValid(this) && (flags & AddModifierFlag.IGNORE_DEATH) == AddModifierFlag.IGNORE_DEATH) {
				if (this.__isRemoving) {
					return;
				}
				let isDead = !this.IsAlive();

				if (isDead) {
					this.SetHealth(1);
				}
				modifier = this.AddNewModifier_Engine(caster, ability, modifierName, modifierTable);
				if (isDead) {
					this.SetHealth(0);
				}
			}
		} else {
			modifier = this.AddNewModifier_Engine(caster, ability, modifierName, modifierTable);
		}
		if (IsValid(modifier) && IsValid(caster)) {
			let duration = modifier.GetDuration();
			if (duration > 0) {
				if (modifier.IsDebuff()) {
					modifier.SetDuration(duration * (1 + GetDebuffDuration(caster, undefined) * 0.01), false);
				} else {
					modifier.SetDuration(duration * (1 + GetBuffDuration(caster, undefined) * 0.01), false);
				}
			}
		}
		return modifier;

	};
	CDOTA_BaseNPC.ExecuteOrder = function (iOrder: dotaunitorder_t, ...arg: any) {
		let hAbility: CDOTA_Ability_Lua | undefined;
		let hTarget: CDOTA_BaseNPC | undefined;
		let vPosition: Vector | undefined;
		const tPositionOrder = [dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_POSITION, dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_MOVE];
		const tTargetOrder = [dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_TARGET, dotaunitorder_t.DOTA_UNIT_ORDER_ATTACK_TARGET];
		const tAbilityOrder = [dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION, dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET, dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET_TREE, dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET, dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE];
		if (TableFindKey(tPositionOrder, iOrder) != undefined) {
			vPosition = arg[1];
		} else if (TableFindKey(tTargetOrder, iOrder) != undefined) {
			hTarget = arg[1];
		} else if (TableFindKey(tAbilityOrder, iOrder) != undefined) {
			if (iOrder == dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION) {
				hAbility = arg[1];
				vPosition = arg[2];
			} else if (iOrder == dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET || iOrder == dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE) {
				hAbility = arg[1];
			} else {
				hAbility = arg[1];
				hTarget = arg[2];
			}
		}
		ExecuteOrderFromTable({
			UnitIndex: this.entindex(),
			OrderType: iOrder,
			TargetIndex: IsValid(hTarget) ? hTarget.entindex() : undefined,
			AbilityIndex: IsValid(hAbility) ? hAbility.entindex() : undefined,
			Position: vPosition,
			Queue: false
		});
	};

	CDOTA_BaseNPC.Dash = function (direction: Vector, distance: number, height: number, duration: number, callback?: (position: Vector, hasLanded: boolean) => void) {
		if (!this.IsAlive()) {
			return;
		}
		const extraDistance = GetDashDistance(this, undefined);
		const kv = {
			direction: direction,
			dash_duration: duration,
			dash_distance: distance + extraDistance,
			dash_height: height,
		};
		this.RemoveModifierByName("modifier_dash");
		let buff = this.AddNewModifier(this, undefined, "modifier_dash", kv);
		if (IsValid(buff) && callback != undefined) {
			//@ts-ignore
			buff.callback = callback;
		}
	};
	CDOTA_BaseNPC.KnockBack = function (direction: Vector, distance: number, height: number, duration: number, callback?: (position: Vector) => void): CDOTA_Buff | undefined {
		if (!this.IsAlive()) return;
		if (this.HasState(StateEnum.KNOCKBACK_IMMUNE)) return;

		const kv = {
			direction: direction,
			dash_duration: duration,
			dash_distance: distance,
			dash_height: height,
		};
		this.RemoveModifierByName("modifier_knockback_custom");
		let buff = this.AddNewModifier(this, undefined, "modifier_knockback_custom", kv);
		if (IsValid(buff) && callback != undefined) {
			//@ts-ignore
			buff.callback = callback;
		}
	};
	CDOTA_BaseNPC.Stun = function (caster: CDOTA_BaseNPC | undefined, ability: CDOTABaseAbility | undefined, duration: number): void {
		if (!IsValid(this)) return;
		if (duration <= 0) return;
		if (this.HasState(StateEnum.STUN_IMMUNE)) return;

		this.AddNewModifier(caster, ability, "modifier_stunned", { duration: duration });
	};



	CDOTA_BaseNPC.SummonUnit = function (unitName, position, duration, extraData): CDOTA_BaseNPC | undefined {
		let forward = this.GetForwardVector();
		let unitData: any = {
			MapUnitName: unitName,
			angles: tostring(forward.x) + " " + tostring(forward.y) + " " + tostring(forward.z),
			teamnumber: this.GetTeamNumber(),
			NeverMoveToClearSpace: false,
			IsSummoned: "1",
		};
		if (extraData != undefined) {
			unitData = TableOverride(unitData, extraData);
		}
		let unit = CreateUnitFromTable(unitData, position);
		if (!IsValid(unit)) {
			return undefined;
		}
		unit.__Summoner = this;
		if (duration != undefined && duration > 0) {
			unit.AddNewModifier(this, undefined, "modifier_kill", { duration: duration });
		}
		// Event.Fire()
		return unit;
	};
	CDOTA_BaseNPC.SafeRemoveUnit = function () {
		if (!IsValid(this)) return;
		if (this.__isRemoving) {
			return;
		}
		this.__isRemoving = true;
		this.RemoveAllModifiers(0, false, true, false);
		this.ForceKill(false);
		this.MakeIllusion();
		this.AddNoDraw();
		this.CallAbilityDestroy();
		if (PropertySystem != undefined) {
			PropertySystem.CleanupUnitProperties(this);
		}
		Timer.GameTimer(0, () => {
			if (this.IsNull()) return;
			this.Remove();
		});
	};
	CDOTA_BaseNPC.PassiveCast = function (ability, orderType, extraData, func) {
		if (!IsValid(ability)) { return; }
		if (extraData == undefined) extraData = {};

		let castPoint = extraData.castPoint ?? ability.GetCastPoint();
		let castAnimation = extraData.castAnimation ?? ability.GetCastAnimation();
		let activityModifier = extraData.sActivityModifier;
		if (extraData.sActivityModifier && typeof extraData.sActivityModifier == "object") {
			activityModifier = json.encode(extraData.sActivityModifier);
		}
		// 使用modifier模拟前摇
		let data = {
			duration: castPoint,
			castPoint: castPoint,
			castAnimation: castAnimation,
			orderType: orderType,
			animationRate: extraData.animationRate,
			position: extraData.position ? VectorToString(extraData.position) : undefined,
			targetIndex: IsValid(extraData.target) ? extraData.target.entindex() : undefined,
			bFadeAnimation: extraData.bFadeAnimation,
			fadeAnimationTime: extraData.fadeAnimationTime,
			activityModifier: activityModifier,
			bIgnoreBackswing: extraData.bIgnoreBackswing ?? true,
			bUseCooldown: (extraData.bUseCooldown == undefined || extraData.bUseCooldown == true) ? 1 : 0,
			bUseMana: (extraData.bUseMana == undefined || extraData.bUseMana == true) ? 1 : 0,
		};

		// 自定义施法抬手与打断
		//@ts-ignore
		ability.CustomAbilityPhaseStart = extraData.OnAbilityPhaseStart;
		//@ts-ignore
		ability.CustomAbilityPhaseInterrupted = extraData.OnAbilityPhaseInterrupted;
		let modifier = this.AddNewModifier(this, ability, "modifier_passive_cast", data);
		if (IsValid(modifier)) {
			//@ts-ignore
			modifier.callback = func;
		}
	};
	CDOTA_BaseNPC.AddActivityModifier_Engine ??= CDOTA_BaseNPC.AddActivityModifier;
	CDOTA_BaseNPC.UpdateActivityModifier = function () {
		if (this.__activityModifiers == undefined) this.__activityModifiers = [];

		this.ClearActivityModifiers();

		for (const i of $range(0, this.__activityModifiers.length - 1, 1)) {
			this.AddActivityModifier_Engine(this.__activityModifiers[i]);
		}
	};
	CDOTA_BaseNPC.AddActivityModifier = function (sName) {
		if (this.__activityModifiers == undefined) this.__activityModifiers = [];

		this.__activityModifiers.push(sName);

		this.UpdateActivityModifier();
	};
	CDOTA_BaseNPC.RemoveActivityModifier = function (sName) {
		if (this.__activityModifiers == undefined) this.__activityModifiers = [];

		ArrayRemove(this.__activityModifiers, sName);

		this.UpdateActivityModifier();
	};
	CDOTA_BaseNPC.DealDamage = function (target, ability, damage, damage_type, damage_flags) {
		// 延迟弹道和 modifier OnDestroy 可能在施法者、技能或目标已被同步销毁后回调。
		if (!IsValid(this) || (ability !== undefined && !IsValid(ability))) {
			return;
		}
		let damage_category = DamageCategory_t.DOTA_DAMAGE_CATEGORY_BARRIER;
		if (ability != undefined) {
			if (damage_type == undefined) {
				damage_type = ability.GetDamageType();
			}
			const abilityTag = ability.GetAbilityTag();
			if (
				abilityTag == AbilityTag.Skill ||
				abilityTag == AbilityTag.Dodge ||
				abilityTag == AbilityTag.Defense ||
				abilityTag == AbilityTag.Ultimate
			) {
				damage_category = DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL;
			}
		}
		if (Array.isArray(target)) {
			for (const [i, v] of ipairs(target)) {
				if (!IsValid(v)) continue;
				const params = DamageSystem.AcquireDamageInfo();
				params.attacker = this;
				params.target = v as CDOTA_BaseNPC;
				params.ability = ability;
				params.damage = damage;
				params.damage_type = damage_type ?? EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE;
				params.damage_flags = damage_flags;
				params.damage_category = damage_category;
				DamageSystem.DealDamage(params, true);
			}
		} else {
			if (!IsValid(target)) return;
			const params = DamageSystem.AcquireDamageInfo();
			params.attacker = this;
			params.target = target as CDOTA_BaseNPC;
			params.ability = ability;
			params.damage = damage;
			params.damage_type = damage_type ?? EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE;
			params.damage_flags = damage_flags;
			params.damage_category = damage_category;
			DamageSystem.DealDamage(params, true);
		}
	};
	CDOTA_BaseNPC.Attack = function (target, params) {
		const baseDamage = params?.baseDamage ?? this.GetAttackDamage();
		const damageAmplify = params?.damageAmplify ?? 0;
		const bonusDamage = params?.bonusDamage ?? 0;
		const damageType = params?.damageType ?? EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL;

		const damageInfo = DamageSystem.AcquireDamageInfo();
		damageInfo.attacker = this;
		damageInfo.target = target;
		damageInfo.damage = (baseDamage + bonusDamage) * (1 + damageAmplify);
		damageInfo.damage_category = DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK;
		damageInfo.damage_type = damageType;
		damageInfo.damage_flags = params?.flags ?? EOM_DAMAGE_FLAGS.NONE;
		DamageSystem.DealDamage(damageInfo, true);
	};

	CDOTA_BaseNPC.AddItem_Engine ??= CDOTA_BaseNPC.AddItem;
	CDOTA_BaseNPC.AddItemByName_Engine ??= CDOTA_BaseNPC.AddItemByName;
	CDOTA_BaseNPC.RemoveItem_Engine ??= CDOTA_BaseNPC.RemoveItem;
	CDOTA_BaseNPC.TakeItem_Engine ??= CDOTA_BaseNPC.TakeItem;
	CDOTA_BaseNPC.AddItem = function (item, updateNetData: boolean = true) {
		const added = this.AddItem_Engine(item);
		this.SyncInventory(updateNetData);
		return added;
	};
	CDOTA_BaseNPC.AddItemByName = function (itemName, level: number = 1, updateNetData: boolean = true) {
		const item = CreateItem(itemName, PlayerResource.GetPlayer(this.GetPlayerOwnerID()), this.IsRealHero() ? this as CDOTA_BaseNPC_Hero : undefined);
		if (!IsValid(item)) throw `物品创建失败：${itemName}`;
		if (level > 1) {
			item.SetLevel(level, false);
		}
		return this.AddItem(item, updateNetData);
	};
	CDOTA_BaseNPC.TakeItem = function (item) {
		const result = this.TakeItem_Engine(item);
		this.SyncInventory();
		return result;
	};
	CDOTA_BaseNPC.SyncInventory = function (updateNetData = true) {
		const previous = this.__inventoryItems ?? [], current = this.GetAllItems();
		// 先提交快照，避免 item_added 的同步消费者再次扫描时重复初始化。
		this.__inventoryItems = current;
		for (const item of previous) if (!current.includes(item)) {
			if (IsValid(item) && item.__inventoryOwner === this) { item.__OnDestroy(); item.__inventoryOwner = undefined; }
			else Event.UnregisterContext(item);
			Event.Fire("item_removed", { unit: this, item });
		}
		for (const item of current) if (!previous.includes(item)) {
			if (IsValid(item.__inventoryOwner) && item.__inventoryOwner !== this) item.__inventoryOwner.SyncInventory(false);
			item.__inventoryOwner = this; item.__OnCreated();
			Event.Fire("item_added", { unit: this, item });
		}
		this.__items = current.map(item => ({ entIndex: item.entindex(), itemName: item.GetAbilityName(), level: item.GetLevel(),
			stackCount: item.__StackCount ?? 0, charge: item.__Charge ?? 0, maxCharge: item.GetMaxCharges(),
			chargeRestoreTime: item.__ChargeRestoreTime ?? 0, isChargeCooldownFrozen: item.IsChargeCooldownFrozen(), chargeFrozenCooldownRemaining: item.GetChargeCooldownRemaining() }));
		if (updateNetData) this.UpdateAbilityNetData();
	};
	CDOTA_BaseNPC.RemoveItem = function (item: CDOTA_Item) {
		this.__items ??= [];
		if (!IsValid(item)) {
			return;
		}
		Event.Fire("item_consumed", { unit: this, item: item });
		if (item.__inventoryOwner === this) { item.__OnDestroy(); item.__inventoryOwner = undefined; }
		this.__items = this.__items.filter((data) => data.entIndex != item.entindex());
		this.RemoveItem_Engine(item);
		this.SyncInventory();
	};
	CDOTA_BaseNPC.RemoveAllItem = function () {
		this.__items ??= [];
		const removingItems = this.GetAllItems();
		removingItems.forEach((item) => {
			if (IsValid(item)) {
				if (item.__inventoryOwner === this) { item.__OnDestroy(); item.__inventoryOwner = undefined; }
				this.__items = (this.__items ?? []).filter((data) => data.entIndex != item.entindex());
				this.RemoveItem_Engine(item);
				Event.Fire("item_removed", { unit: this, item: item });
			}
		});
		this.__items = [];
		this.__inventoryItems = [];
		CustomNetTables.SetNetData("unit", this.entindex().toString(), undefined);
	};
	CDOTA_BaseNPC.GetAllItems = function () {
		const items: CDOTA_Item[] = [];
		for (let slot = 0; slot <= 16; slot++) {
			const item = this.GetItemInSlot(slot);
			if (IsValid(item) && !items.includes(item)) items.push(item);
		}
		return items;
	};
	CDOTA_BaseNPC.GetItemByName = function (itemName: string) {
		this.__items ??= [];
		let item: CDOTA_Item | undefined;
		this.__items.map(data => {
			if (data.itemName == itemName) {
				item = EntIndexToHScript(data.entIndex) as CDOTA_Item;
			}
		});
		return item;
	};

	CDOTA_BaseNPC.GetItemByNameAndLevel = function (itemName: string, level: number) {
		this.__items ??= [];
		let item: CDOTA_Item | undefined;
		this.__items.map(data => {
			if (data.itemName == itemName && data.level == level) {
				item = EntIndexToHScript(data.entIndex) as CDOTA_Item;
			}
		});
		return item;
	};
	CDOTA_BaseNPC.HasItem = function (itemName: string) {
		this.__items ??= [];
		return this.__items.some((data) => data.itemName == itemName);
	};
	CDOTA_BaseNPC.GetItemCount = function (itemName: string) {
		this.__items ??= [];
		return this.__items.filter((data) => data.itemName == itemName).length;
	};

	CDOTA_BaseNPC.UpdateAbilityNetData = function () {
		this.__items ??= [];
		this.__items = this.__items.filter(data => IsValid(EntIndexToHScript(data.entIndex)));
		this.__items.forEach((data) => {
			const item = EntIndexToHScript(data.entIndex) as CDOTA_Item;
			data.stackCount = item.__StackCount ?? 0;
			data.charge = item.__Charge ?? 0;
			data.maxCharge = item.GetMaxCharges();
			data.chargeRestoreTime = item.__ChargeRestoreTime ?? 0;
			data.isChargeCooldownFrozen = item.IsChargeCooldownFrozen();
			data.chargeFrozenCooldownRemaining = item.GetChargeCooldownRemaining();
		});
		const abilities: CDOTABaseAbility[] = [];
		if (!this.IsRealHero()) {
			return;
		}
		CustomNetTables.SetNetData("unit", this.entindex().toString(), {
			items: this.__items,
			abilities: abilities.map(ability => {
				return {
					entIndex: ability.entindex() ?? -1,
					stackCount: ability.__StackCount ?? 0,
					abilityName: ability.GetAbilityName(),
					charge: ability.__Charge ?? 0,
					maxCharge: ability.GetMaxCharges(),
					chargeRestoreTime: ability.__ChargeRestoreTime ?? 0,
					isChargeCooldownFrozen: ability.IsChargeCooldownFrozen(),
					chargeFrozenCooldownRemaining: ability.GetChargeCooldownRemaining(),
				};
			})
		});
	};
	CDOTA_BaseNPC.CallAbilityCreated = function () {
		for (let i = 0; i < this.GetAbilityCount(); i++) {
			const ability = this.GetAbilityByIndex(i);
			if (IsValid(ability)) {
				ability.__OnCreated();
			}
		}
	};
	CDOTA_BaseNPC.CallAbilityRefresh = function () {
		for (let i = 0; i < this.GetAbilityCount(); i++) {
			const ability = this.GetAbilityByIndex(i);
			if (IsValid(ability)) {
				ability.__OnRefresh();
			}
		}
	};
	CDOTA_BaseNPC.CallAbilityDestroy = function () {
		for (let i = 0; i < this.GetAbilityCount(); i++) {
			const ability = this.GetAbilityByIndex(i);
			if (IsValid(ability)) {
				ability.__OnDestroy();
			}
		}
		this.RemoveAllItem();
	};
	CDOTA_BaseNPC.IsBoss = function (): boolean {
		return this.GetUnitLabel().includes("boss");
	};
	CDOTA_BaseNPC.IsElite = function (): boolean {
		return this.HasModifier("modifier_elite");
	};
	CDOTA_BaseNPC.IsCreep = function (): boolean {
		return this.GetUnitLabel().includes("creep");
	};
}


declare interface CDOTA_BaseNPC {
	/** 模拟施法 */
	SimulateCast(castData: {
		orderType?: dotaunitorder_t;
		position?: Vector;
		target?: CDOTA_BaseNPC;
		castPoint?: number;
		duration?: number;
		castAnimation?: GameActivity_t;
		animationRate?: number;
		activityModifier?: string;
		animationFadeIn?: number;
		animationFadeOut?: number;
		OnSpellStart?: () => void;
		OnFinish?: () => void;
	}): void;
}

if (IsServer()) {
	CDOTA_BaseNPC.SimulateCast = function (castData) {
		this.RemoveModifierByName("modifier_simulate_cast");
		let castPoint = castData.castPoint ?? 0;
		let duration = math.max((castData.duration ?? 0), castPoint ?? 0);
		let data = {
			duration: duration,
			castPoint: castPoint,
			castAnimation: castData.castAnimation,
			orderType: castData.orderType,
			animationRate: castData.animationRate ?? 1,
			animationFadeIn: castData.animationFadeIn,
			animationFadeOut: castData.animationFadeOut,
			position: castData.position ? VectorToString(castData.position) : undefined,
			targetIndex: IsValid(castData.target) ? castData.target.entindex() : undefined,
			activityModifier: castData.activityModifier,
		};
		let modifier = this.AddNewModifier(this, undefined, "modifier_simulate_cast", data);
		if (IsValid(modifier)) {
			// @ts-ignore
			modifier.OnSpellStart = castData.OnSpellStart;
			// @ts-ignore
			modifier.OnFinish = castData.OnFinish;
		}
	};
}
declare interface CDOTA_BaseNPC {
	/** 推开单位 */
	PushOff(position: Vector): void;
}
if (IsServer()) {
	CDOTA_BaseNPC.PushOff = function (position) {
		if (this.HasState(StateEnum.KNOCKBACK_IMMUNE)) return;
		this.SetAbsOrigin(position);
		const hullRadius = this.GetHullRadius() + 50;
		const hullUnits = FindEnemiesInRadius(this, position, hullRadius);
		for (const target of hullUnits) {
			target.KnockBack(CalcDirection2D(target, position) as Vector, hullRadius - CalcDistance(target, position), 0, 0.06);
		}
		FindClearSpaceForUnit(this, position, true);
	};
}
declare interface CDOTA_BaseNPC {
	/** 施法中 */
	IsCasting(): boolean;
}
if (IsServer()) {
	CDOTA_BaseNPC.IsCasting = function () {
		return this.IsChanneling() || this.HasModifier("modifier_simulate_cast") || this.HasModifier("modifier_passive_cast") || this.GetCurrentActiveAbility() != undefined;
	};
}
declare interface CDOTA_BaseNPC {
	/** 是否健康 */
	IsHealthy(): boolean;
	/** 是否健康 */
	IsLowHealth(): boolean;
}
BaseNPC.IsHealthy = function () {
	return this.GetHealthPercent() >= HEALTHY_PCT;
};
BaseNPC.IsLowHealth = function () {
	return this.GetHealthPercent() <= LOW_HEALTH_PCT;
};

declare interface CDOTA_BaseNPC {
	/** 近距离 */
	IsCloseRange(target: CDOTA_BaseNPC): boolean;
	/** 远距离 */
	IsFarRange(target: CDOTA_BaseNPC): boolean;
}
BaseNPC.IsCloseRange = function (target) {
	return CalcDistance(this, target) <= CLOSE_RANGE;
};
BaseNPC.IsFarRange = function (target) {
	return CalcDistance(this, target) >= FAR_RANGE;
};
