import { EOMModifier, registerEOMModifier } from "../eom_modifier/eom_modifier";

/** c1 公共属性入口；优先使用 Athena 自定义字段，兼容普通 Dota/c1 KV。 */
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

	OnCreated() {
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
		// Athena 的物理/魔法暴击接入新框架的攻击/技能通道，避免物理暴击串到技能。
		this.attackCritChance = tonumber(kv.PhysicalCritChance) ?? 0;
		this.attackCritDamage = tonumber(kv.PhysicalCritDamage) ?? 0;
		this.spellCritChance = tonumber(kv.MagicalCritChance) ?? 0;
		this.spellCritDamage = tonumber(kv.MagicalCritDamage) ?? 0;
	}
	StaticProperty(): Partial<Record<PropertyFunction, number>> {
		return {
			[PropertyFunction.BASE_HEALTH]: this.health,
			[PropertyFunction.BASE_MANA]: this.mana,
			[PropertyFunction.BASE_ATTACK]: this.attack,
			[PropertyFunction.PHYSICAL_ARMOR]: this.armor,
			[PropertyFunction.DAMAGE_REDUCTION]: this.reduction,
			[PropertyFunction.CRIT_CHANCE]: this.critChance,
			[PropertyFunction.CRIT_DAMAGE]: this.critDamage,
			[PropertyFunction.ATTACK_CRIT_CHANCE]: this.attackCritChance,
			[PropertyFunction.ATTACK_CRIT_DAMAGE]: this.attackCritDamage,
			[PropertyFunction.SPELL_CRIT_CHANCE]: this.spellCritChance,
			[PropertyFunction.SPELL_CRIT_DAMAGE]: this.spellCritDamage,
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
		if (!LargeNumberHealth.Refresh(unit)) {
			unit.SetBaseMaxHealth(health); unit.SetMaxHealth(health);
			unit.SetHealth(full ? health : math.max(1, health * healthPercent));
		} else if (full) unit.SetHealth(health);
		unit.SetMaxMana(mana); unit.SetMana(full ? mana : mana * manaPercent);
		const attack = unit.GetAttackDamage();
		unit.SetBaseDamageMin(attack); unit.SetBaseDamageMax(attack);
		unit.SetPhysicalArmorBaseValue(unit.GetProperty(PropertyFunction.PHYSICAL_ARMOR));
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
		];
		if (this.GetParent().IsRealHero()) functions.push(
			modifierfunction.MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET, modifierfunction.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST,
			modifierfunction.MODIFIER_EVENT_ON_ABILITY_START, modifierfunction.MODIFIER_PROPERTY_MOVESPEED_MAX_OVERRIDE,
			modifierfunction.MODIFIER_EVENT_ON_SPENT_MANA, modifierfunction.MODIFIER_EVENT_ON_ABILITY_END_CHANNEL,
		);
		return functions;
	}
	// 保留引擎血条；自定义血条界面尚未迁移。
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
	GetDisableAutoAttack(): 0 | 1 { return 1; }
	GetModifierMoveSpeed_MaxOverride() { return 8000; }
	GetModifierMoveSpeedBonus_Constant() { return GetMovespeed(this.GetParent()) + GetMovespeedNotCalculated(this.GetParent()); }
	GetModifierMoveSpeedBonus_Percentage() { return GetMovespeedAmplify(this.GetParent()); }
	GetModifierAttackSpeedBonus_Constant() { return GetAttackspeed(this.GetParent()); }
	GetModifierAttackSpeedPercentage() { return -GetAttackspeedReduction(this.GetParent()); }
	GetModifierEvasion_Constant() { return GetEvasion(this.GetParent()); }
	GetModifierPercentageCooldown() { return GetCooldownReduction(this.GetParent()); }
	GetModifierHealAmplify_PercentageTarget() { return GetHealAmplify(this.GetParent()); }
	GetModifierAttackRangeBonus() {
		const unit = this.GetParent();
		return GetAttackRange(unit) + (unit.IsRangedAttacker() ? GetAttackRangeRanger(unit) : GetAttackRangeMelee(unit));
	}
	OnAbilityStart(event: ModifierAbilityEvent) {
		if (event.unit === this.GetParent()) Event.Fire("ability_cast_start", { ability: event.ability, caster: event.unit, position: event.ability.GetCursorPosition(), abilityTag: event.ability.GetAbilityTag() });
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
