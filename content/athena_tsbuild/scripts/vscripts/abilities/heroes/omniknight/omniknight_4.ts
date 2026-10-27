import { AbilityValue, EOMAbility, registerEOMAbility } from "../../eom_ability";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";
import { omniknight_0, OmniknightParticle } from "./omniknight_0";

@registerEOMAbility()
export class omniknight_4 extends EOMAbility {
	private stormGeneration = 0;
	OnDestroy() { this.stormGeneration++; }
	EventListener(): Partial<EventListenerMap> { return { game_end: ({ run_id }) => { if (run_id === GameState.GetSession().runId) this.StopStorms(); }, game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.StopStorms(); } }; }
	private StopStorms() {
		this.stormGeneration++;
		if (this.GetToggleState()) this.ToggleAbility();
	}
	OnToggle() {
		const caster = this.GetCaster();
		if (this.GetToggleState()) {
			caster.AddNewModifier(caster, this, "modifier_omniknight_4", {});
			caster.EmitSound("Hero_Terrorblade.Reflection");
		} else caster.RemoveModifierByName("modifier_omniknight_4");
	}
	ThunderStorm(target: CDOTA_BaseNPC) {
		const caster = this.GetCaster();
		// 每次风暴入口只有这一次 PRD；脉冲、皮肤反击共用同一概率规则。
		if (!IsServer() || !IsValid(target) || !target.IsAlive() || !PRD(this, this.GetSpecialValueFor("storm_chance"), "omniknight_4")) return;
		const generation = this.stormGeneration, runId = GameState.GetSession().runId;
		const damage = this.GetSpecialValueFor("storm_str_damage"), jumps = this.GetSpecialValueFor("storm_jump_count");
		const hit: CDOTA_BaseNPC[] = [];
		const strike = (victim: CDOTA_BaseNPC) => {
			if (!IsValid(this) || !IsValid(caster) || !IsValid(victim) || !victim.IsAlive() || generation !== this.stormGeneration || GameState.GetSession().runId !== runId) return;
			const origin = victim.GetAbsOrigin();
			hit.push(victim);
			caster.DealDamage(victim, this, damage);
			const thunder = caster.FindAbilityByName("omniknight_0") as omniknight_0 | undefined;
			if (IsValid(thunder)) thunder.ThunderPower(victim);
			const particle = ParticleManager.CreateParticle("particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, caster);
			ParticleManager.SetParticleControl(particle, 0, Vector(origin.x, origin.y, origin.z + 900));
			ParticleManager.SetParticleControl(particle, 1, origin);
			ParticleManager.ReleaseParticleIndex(particle);
			caster.EmitSound("Hero_Leshrac.Lightning_Storm");
			if (hit.length >= jumps) return;
			this.StartThink(this.GetSpecialValueFor("storm_interval"), DoUniqueString("omniknight_storm"), () => {
				if (!IsValid(this) || !IsValid(caster) || generation !== this.stormGeneration || GameState.GetSession().runId !== runId) return -1;
				const next = FindUnitsInRadius(caster.GetTeamNumber(), origin, undefined, 600, this.GetAbilityTargetTeam(), this.GetAbilityTargetType(), this.GetAbilityTargetFlags(), FindOrder.FIND_CLOSEST, false)
					.find(unit => hit.indexOf(unit) < 0);
				if (next) strike(next);
				return -1;
			});
		};
		strike(target);
	}
}

@registerEOMModifier({ IsHidden: false, IsPurgable: false })
export class modifier_omniknight_4 extends EOMModifier {
	@AbilityValue() bonus_attackspeed: number;
	@AbilityValue() bonus_movespeed: number;
	@AbilityValue() bonus_resistance: number;
	@AbilityValue() bonus_amp_percent: number;
	@AbilityValue() mana_cost: number;
	@AbilityValue() palsy_duration: number;
	@AbilityValue() palsy_radius: number;
	@AbilityValue() palsy_interval: number;
	private retaliationReady = true;
	StaticProperty() {
		return { [PropertyFunction.ATTACKSPEED]: this.bonus_attackspeed, [PropertyFunction.MOVESPEED]: this.bonus_movespeed,
			[PropertyFunction.ARMOR_BONUS]: this.bonus_resistance, [PropertyFunction.OUTGOING_MAGICAL_DAMAGE_PERCENTAGE]: this.bonus_amp_percent };
	}
	GetEffectName() { return OmniknightParticle(this.GetParent(), 4); }
	GetEffectAttachType() { return ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW; }
	OnCreated() { if (IsServer()) this.StartIntervalThink(this.palsy_interval); }
	UnitEventListener(): Partial<UnitEventListenerMap> {
		return { attack_landed: { target: ({ attacker }) => {
			if (this.retaliationReady && this.GetParent().HasModifier("modifier_omniknight_01")) {
				this.retaliationReady = false;
				(this.GetAbility() as omniknight_4).ThunderStorm(attacker);
			}
		} } };
	}
	OnIntervalThink() {
		const caster = this.GetCaster(), ability = this.GetAbility();
		if (!IsValid(caster) || !IsValid(ability)) { this.Destroy(); return; }
		this.retaliationReady = true;
		caster.SpendMana(this.mana_cost, ability);
		const targets = FindUnitsInRadius(caster.GetTeamNumber(), caster.GetAbsOrigin(), undefined, this.palsy_radius,
			ability.GetAbilityTargetTeam(), ability.GetAbilityTargetType(), ability.GetAbilityTargetFlags(), FindOrder.FIND_CLOSEST, false);
		for (const target of targets) target.AddNewModifier(caster, ability, "modifier_omniknight_4_debuff", { duration: this.palsy_duration * (1 - target.GetStatusResistance()) });
		if (caster.GetMana() < this.mana_cost && ability.GetToggleState()) ability.ToggleAbility();
	}
}

@registerEOMModifier({ IsHidden: false, IsDebuff: true, IsPurgable: true, IsPurgeException: true })
export class modifier_omniknight_4_debuff extends EOMModifier {
	IgnoreTenacity() { return true; }
	EventListener(): Partial<EventListenerMap> { return { game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.Destroy(); } }; }
	@AbilityValue() palsy_attackspeed: number;
	@AbilityValue() palsy_movespeed: number;
	StaticProperty() { return { [PropertyFunction.ATTACKSPEED]: -this.palsy_attackspeed, [PropertyFunction.MOVESPEED]: -this.palsy_movespeed }; }
	GetEffectName() { return "particles/units/heroes/hero_leshrac/leshrac_lightning_slow.vpcf"; }
	GetEffectAttachType() { return ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW; }
	OnCreated() {
		if (!IsServer()) return;
		const caster = this.GetCaster()!, ability = this.GetAbility() as omniknight_4, parent = this.GetParent();
		ability.ThunderStorm(parent);
		if (caster.GetScepterLevel() >= 4) {
			caster.DealDamage(parent, ability, ability.GetSpecialValueFor("scepter_damage"));
			const thunder = caster.FindAbilityByName("omniknight_0") as omniknight_0 | undefined;
			if (IsValid(thunder)) thunder.ThunderPower(parent);
		}
	}
}
