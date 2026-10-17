import { EOMModifier, registerEOMModifier } from "../eom_modifier/eom_modifier";

/** 单位公共属性入口；优先使用 Athena 自定义字段，兼容普通 Dota/c1 KV。 */
@registerEOMModifier({ IsHidden: true, IsDebuff: false, IsPurgable: false, IsPurgeException: false, AllowIllusionDuplicate: false, RemoveOnDeath: false })
export class modifier_common extends EOMModifier {
	private health = 1;
	private mana = 0;
	private attack = 0;
	private armor = 0;
	private reduction = 0;
	private critChance = 0;
	private critDamage = 0;
	private attackCritChance = 0;
	private attackCritDamage = 0;
	private spellCritChance = 0;
	private spellCritDamage = 0;
	private initialized = false;
	private usingLargeHealth = false;
	private baseProperties: Partial<Record<PropertyFunction, number>> = {};

	OnCreated() {
		// 基础属性与随机攻击只在服务端初始化；客户端通过属性系统网表读取结果。
		if (!IsServer()) return;
		const unit = this.GetParent(), name = unit.GetUnitName();
		const kv = KeyValues.heroes[name] ?? KeyValues.units[name] ?? {};
		this.health = math.max(1, tonumber(kv.CustomStatusHealth) ?? tonumber(kv.StatusHealth) ?? unit.GetMaxHealth_Engine());
		this.mana = tonumber(kv.StatusMana) ?? unit.GetMaxMana_Engine();
		const attack = tonumber(kv.AttackDamage);
		this.attack = attack ?? RandomFloat(tonumber(kv.AttackDamageMin) ?? unit.GetBaseDamageMin(), tonumber(kv.AttackDamageMax) ?? unit.GetBaseDamageMax());
		this.armor = tonumber(kv.Armor) ?? tonumber(kv.ArmorPhysical) ?? unit.GetPhysicalArmorBaseValue();
		this.reduction = tonumber(kv.DamageReduction) ?? 0;
		this.critChance = tonumber(kv.CritChance) ?? 0;
		this.critDamage = tonumber(kv.CritDamage) ?? 0;
		// Athena 暴击按伤害类型区分；C1 的攻击/技能通道仍可独立使用。
		this.attackCritChance = tonumber(kv.PhysicalCritChance) ?? 0;
		this.attackCritDamage = tonumber(kv.PhysicalCritDamage) ?? 0;
		this.spellCritChance = tonumber(kv.MagicalCritChance) ?? 0;
		this.spellCritDamage = tonumber(kv.MagicalCritDamage) ?? 0;
		const fields: Record<string, PropertyFunction> = {
			StatusHealthRegen: PropertyFunction.BASE_HEALTH_REGEN, StatusManaRegen: PropertyFunction.BASE_MANA_REGEN,
			Evasion: PropertyFunction.BASE_EVASION, AttackRate: PropertyFunction.BASE_ATTACK_TIME, AttackRange: PropertyFunction.BASE_ATTACK_RANGE,
			CleaveDamage: PropertyFunction.CLEAVE_DAMAGE, CleaveRadius: PropertyFunction.CLEAVE_RADIUS,
		};
		if (unit.IsHero()) {
			fields.BaseStrength = PropertyFunction.BASE_STRENGTH; fields.BaseAgility = PropertyFunction.BASE_AGILITY; fields.BaseIntellect = PropertyFunction.BASE_INTELLECT;
			fields.StrengthGain = PropertyFunction.STRENGTH_GAIN; fields.AgilityGain = PropertyFunction.AGILITY_GAIN; fields.IntellectGain = PropertyFunction.INTELLECT_GAIN;
		}
		for (const [field, property] of pairs(fields)) this.baseProperties[property] = tonumber(kv[field]) ?? 0;
		this.baseProperties[PropertyFunction.BASE_ATTACK_TIME] = tonumber(kv.AttackRate) ?? unit.GetBaseAttackTime(true);
		this.baseProperties[PropertyFunction.BASE_ATTACK_RANGE] = tonumber(kv.AttackRange) ?? unit.Script_GetAttackRange();
		// 基础回复并入属性系统，避免引擎 KV 再计算一次。
		unit.SetBaseHealthRegen(0); unit.SetBaseManaRegen(0);
	}
	StaticProperty(): Partial<Record<PropertyFunction, number>> {
		if (!IsServer()) return {};
		return {
			...this.baseProperties,
			[PropertyFunction.BASE_HEALTH]: this.health,
			[PropertyFunction.BASE_MANA]: this.mana,
			[PropertyFunction.BASE_ATTACK]: this.attack,
			[PropertyFunction.PHYSICAL_ARMOR]: this.armor,
			[PropertyFunction.DAMAGE_REDUCTION]: this.reduction,
			[PropertyFunction.CRIT_CHANCE]: this.critChance,
			[PropertyFunction.CRIT_DAMAGE]: this.critDamage,
			[PropertyFunction.PHYSICAL_CRITICALSTRIKE_CHANCE]: this.attackCritChance,
			[PropertyFunction.PHYSICAL_CRITICALSTRIKE_DAMAGE]: this.attackCritDamage,
			[PropertyFunction.MAGICAL_CRITICALSTRIKE_CHANCE]: this.spellCritChance,
			[PropertyFunction.MAGICAL_CRITICALSTRIKE_DAMAGE]: this.spellCritDamage,
		};
	}
	/** 属性来源注册完毕后同步引擎；后续加成变化保持当前生命/魔法比例，不额外治疗。 */
	SyncStats(fill = false) {
		const unit = this.GetParent();
		if (!IsServer() || !IsValid(unit) || !unit.IsAlive() || this._bDestroyed) return;
		const full = fill || !this.initialized;
		const healthPercent = unit.GetHealthPercent_Engine() * 0.01;
		const manaPercent = unit.GetMana() / math.max(1, unit.GetMaxMana_Engine());
		const health = math.max(1, unit.GetMaxHealth()), mana = math.max(0, unit.GetMaxMana());
		const largeHealth = LargeNumberHealth.Refresh(unit);
		if (!largeHealth) {
			unit.SetBaseMaxHealth(health); unit.SetMaxHealth(health);
			unit.SetHealth(full ? health : math.max(1, health * healthPercent));
		} else if (full) unit.SetHealth(health);
		if (largeHealth !== this.usingLargeHealth) {
			this.usingLargeHealth = largeHealth; this.StartIntervalThink(largeHealth ? 0.1 : -1);
		}
		unit.SetMaxMana(mana); unit.SetMana(full ? mana : mana * manaPercent);
		const attack = unit.GetAttackDamage();
		unit.SetBaseDamageMin(attack); unit.SetBaseDamageMax(attack);
		unit.SetPhysicalArmorBaseValue(GetAthenaArmor(unit));
		this.initialized = true;
	}
	EventListener(): Partial<EventListenerMap> {
		return { property_changed: event => {
			if (event.scope === PropertyScope.UNIT && event.key === this.GetParent().entindex()) this.SyncStats();
		} };
	}
	DeclareFunctions(): modifierfunction[] {
		const functions = [
			modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT, modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT, modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE,
			modifierfunction.MODIFIER_PROPERTY_EVASION_CONSTANT, modifierfunction.MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
			modifierfunction.MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE, modifierfunction.MODIFIER_PROPERTY_DISABLE_AUTOATTACK,
			modifierfunction.MODIFIER_PROPERTY_MANA_REGEN_CONSTANT, modifierfunction.MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
			modifierfunction.MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT, modifierfunction.MODIFIER_PROPERTY_RESPAWNTIME_STACKING,
			modifierfunction.MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT, modifierfunction.MODIFIER_PROPERTY_COOLDOWN_REDUCTION_CONSTANT,
			modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BASE_OVERRIDE,
			modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED,
		];
		if (this.GetParent().IsRealHero()) functions.push(
			modifierfunction.MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET, modifierfunction.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST,
			modifierfunction.MODIFIER_EVENT_ON_ABILITY_START, modifierfunction.MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE,
			modifierfunction.MODIFIER_EVENT_ON_SPENT_MANA, modifierfunction.MODIFIER_EVENT_ON_ABILITY_END_CHANNEL,
			modifierfunction.MODIFIER_PROPERTY_EXP_RATE_BOOST,
		);
		return functions;
	}
	// 保留引擎血条；自定义血条界面尚未迁移。
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
	/** 客户端默认允许血条，具体 modifier 再用 NO_HEALTH_BAR 按优先级覆盖。 */
	StaticState() { return { [StateEnum.HEALTH_BAR]: true }; }
	GetDisableAutoAttack(): 0 | 1 { return 1; }
	GetModifierMoveSpeed_MaxOverride() { return 8000; }
	GetModifierMoveSpeedBonus_Constant() { return GetMovespeed(this.GetParent()) + GetMovespeedNotCalculated(this.GetParent()); }
	GetModifierMoveSpeedBonus_Percentage() { return GetMovespeedAmplify(this.GetParent()); }
	GetModifierAttackSpeedBonus_Constant() { return GetAttackspeed(this.GetParent()); }
	GetModifierAttackSpeedPercentage() { return -GetAttackspeedReduction(this.GetParent()); }
	GetModifierEvasion_Constant() { return GetAthenaEvasion(this.GetParent()); }
	/** 原版只检查技能 KV；物品和没有参数的查询沿用普通减 CD。 */
	private IgnoresCooldownReduction(params?: { ability?: CDOTABaseAbility; }) {
		const ability = params?.ability;
		return IsValid(ability) && tonumber(KeyValues.abilities?.[ability.GetAbilityName()]?.IgnoreCooldownReduction) === 1;
	}
	GetModifierPercentageCooldown(params?: { ability?: CDOTABaseAbility; }) { return this.IgnoresCooldownReduction(params) ? 0 : GetAthenaCooldownReduction(this.GetParent()); }
	GetModifierConstantManaRegen() { return GetAthenaManaRegen(this.GetParent()); }
	GetModifierConstantHealthRegen() { return LargeNumberHealth.IsActive(this.GetParent()) ? 0 : GetAthenaHealthRegen(this.GetParent()); }
	/** 大数值单位由逻辑生命代理恢复，禁止只恢复引擎代理值造成血条与逻辑不一致。 */
	OnIntervalThink() {
		const unit = this.GetParent();
		if (IsServer() && unit.IsAlive() && LargeNumberHealth.IsActive(unit)) unit.Heal(GetAthenaHealthRegen(unit) * 0.1, undefined);
	}
	GetModifierCooldownReduction_Constant(params?: { ability?: CDOTABaseAbility; }) { return this.IgnoresCooldownReduction(params) ? 0 : GetCooldownConstant(this.GetParent(), params); }
	GetModifierAttackSpeedBaseOverride() { return math.min((MAXIMUM_ATTACK_SPEED + GetMaxAttackspeedBonus(this.GetParent())) * 0.01, math.max(MINIMUM_ATTACK_SPEED * 0.01, 1 + this.GetParent().GetIncreasedAttackSpeed(true))); }
	GetModifierPercentageExpRateBoost() { return GetPlayerExperienceGainPercentage(this.GetParent().GetPlayerOwnerID()); }
	GetModifierStatusResistanceStacking() { return (1 - (1 - GetStatusResistanceStacking(this.GetParent()) * 0.01) * (1 - GetStatusResistanceUnique(this.GetParent()) * 0.01)) * 100; }
	GetModifierBaseAttackTimeConstant() { return GetBaseAttackTime(this.GetParent()) + GetBaseAttackTimeConstantAdjust(this.GetParent()); }
	GetModifierStackingRespawnTime() { return GetRespawnTime(this.GetParent()); }
	GetModifierHealAmplify_PercentageTarget() { return GetHealAmplify(this.GetParent()); }
	GetModifierAttackRangeBonus() {
		const unit = this.GetParent();
		return GetAthenaAttackRangeBonus(unit) + (unit.IsRangedAttacker() ? GetAttackRangeRanger(unit) : GetAttackRangeMelee(unit));
	}
	OnAbilityStart(event: ModifierAbilityEvent) {
		if (event.unit === this.GetParent()) Event.Fire("ability_cast_start", { ability: event.ability, caster: event.unit, position: event.ability.GetCursorPosition(), abilityTag: event.ability.GetAbilityTag() });
	}
	/** 原版在执行阶段通知，不以 FULLY_CAST 或冷却/被动判断替代。 */
	OnAbilityExecuted(event: ModifierAbilityEvent) {
		if (!IsServer() || event.unit !== this.GetParent() || !IsValid(event.ability)) return;
		if (!event.ability.IsItem() && !event.ability.IsToggle() && event.ability.ProcsMagicStick()) {
			Event.FireUnit("valid_ability_executed", event, event.unit, event.target);
		}
	}
	OnAbilityFullyCast(event: ModifierAbilityEvent) {
		if (event.unit !== this.GetParent()) return;
		Event.Fire("ability_cast_complete", { ability: event.ability, caster: event.unit, position: event.ability.GetCursorPosition(), abilityTag: event.ability.GetAbilityTag() });
		if (event.ability.UseCharges()) {
			event.ability.EndCooldown();
			if (event.ability.GetCharges() === 0) event.ability.StartCooldown(event.ability.__ChargeRestoreTime - GameRules.GetGameTime());
		}
		if (event.ability.GetCastCooldown() > 0) {
			event.ability.SetActivated(false);
			this.StartThink(event.ability.GetCastCooldown(), DoUniqueString("CastCooldown"), () => { event.ability.SetActivated(true); return -1; });
		}
	}
	OnAbilityEndChannel(event: ModifierAbilityEvent) {
		if (event.unit === this.GetParent()) Event.Fire("ability_end_channel", { ability: event.ability, caster: event.unit, position: event.ability.GetCursorPosition(), abilityTag: event.ability.GetAbilityTag() });
	}
	OnSpentMana(event: ModifierAbilityEvent) {
		const cost = (event as ModifierAbilityEvent & { cost: number; }).cost;
		if (event.unit === this.GetParent() && cost > 0) Event.Fire("spent_mana", { unit: event.unit, ability: event.ability, cost });
	}
}
