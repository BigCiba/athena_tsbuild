import { AbilityValue, EOMAbility, registerEOMAbility } from "../../eom_ability";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";
import { omniknight_0, OmniknightParticle } from "./omniknight_0";

@registerEOMAbility()
export class omniknight_2 extends EOMAbility {
	OnSpellStart() {
		const caster = this.GetCaster();
		const device = CreateUnitByName("heal_device", this.GetCursorPosition(), true, caster, caster, caster.GetTeamNumber());
		if (!IsValid(device)) return;
		device.SetControllableByPlayer(caster.GetPlayerOwnerID(), true);
		// KV 基础值仍由 common 初始化，装置只注册施放时的力量快照差值。
		if (!device.HasModifier("modifier_common")) device.AddNewModifier(device, undefined, "modifier_common", {});
		device.AddNewModifier(caster, this, "modifier_omniknight_2", { duration: this.GetSpecialValueFor("duration"), strength: GetStrength(caster) });
		device.SetHealth(device.GetMaxHealth());
		device.EmitSound("Hero_Tinker.GridEffect");
	}
}

@registerEOMModifier({ IsHidden: true, IsPurgable: false })
export class modifier_omniknight_2 extends EOMModifier {
	@AbilityValue() radius: number;
	@AbilityValue() scepter_interval: number;
	private health = 0;
	private armor = 0;
	private scepterDamage = 0;
	private scepterPulse = false;
	OnCreated(params: { strength: number; }) {
		if (!IsServer()) return;
		const parent = this.GetParent();
		const kv = KeyValues.units[parent.GetUnitName()] ?? {};
		this.health = params.strength * 100 - (tonumber(kv.CustomStatusHealth) ?? tonumber(kv.StatusHealth) ?? 0);
		this.armor = params.strength - (tonumber(kv.Armor) ?? tonumber(kv.ArmorPhysical) ?? 0);
		this.scepterPulse = this.GetCaster()!.GetScepterLevel() >= 3;
		this.scepterDamage = this.GetAbilitySpecialValueFor("scepter_damage");
		if (this.scepterPulse) this.StartIntervalThink(this.scepter_interval);
	}
	StaticProperty() { return { [PropertyFunction.HEALTH]: this.health, [PropertyFunction.PHYSICAL_ARMOR]: this.armor }; }
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
	DynamicState() {
		return { [StateEnum.FLYING_FOR_PATHING_PURPOSES_ONLY]: () => {
			const caster = this.GetCaster();
			return IsValid(caster) && (caster.HasModifier("modifier_scepter_custom") || caster.HasScepter());
		} };
	}
	IsAura() { return true; }
	GetAuraRadius() { return this.radius; }
	GetAuraSearchTeam() { return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH; }
	GetAuraSearchType() { return DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC; }
	GetAuraSearchFlags() { return DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE; }
	GetModifierAura() { return "modifier_omniknight_2_aura"; }
	GetEffectName() { return OmniknightParticle(this.GetCaster()!, 2); }
	GetEffectAttachType() { return ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW; }
	EventListener(): Partial<EventListenerMap> { return { game_end: ({ run_id }) => { if (run_id === GameState.GetSession().runId) this.Destroy(); }, game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.Destroy(); } }; }
	OnDestroy() {
		if (IsServer() && IsValid(this.GetParent())) UTIL_Remove(this.GetParent());
	}
	OnIntervalThink() {
		const caster = this.GetCaster(), ability = this.GetAbility();
		if (!IsValid(caster) || !IsValid(ability)) { this.Destroy(); return; }
		const parent = this.GetParent(), thunder = caster.FindAbilityByName("omniknight_0") as omniknight_0 | undefined;
		const targets = FindUnitsInRadius(parent.GetTeamNumber(), parent.GetAbsOrigin(), undefined, this.radius,
			DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE, FindOrder.FIND_ANY_ORDER, false);
		for (const target of targets) {
			caster.DealDamage(target, ability, this.scepterDamage, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL);
			if (IsValid(thunder)) thunder.ThunderPower(target);
		}
		const particle = ParticleManager.CreateParticle("particles/econ/items/disruptor/disruptor_ti8_immortal_weapon/disruptor_ti8_immortal_thunder_strike_bolt.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, parent);
		for (const point of [1, 2]) ParticleManager.SetParticleControlEnt(particle, point, parent, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, "", parent.GetAbsOrigin(), false);
		ParticleManager.SetParticleControl(particle, 7, Vector(this.radius - 50, 0, 0));
		ParticleManager.ReleaseParticleIndex(particle);
		parent.EmitSound("Hero_Disruptor.ThunderStrike.Target");
	}
}

@registerEOMModifier({ IsHidden: false, IsPurgable: false })
export class modifier_omniknight_2_aura extends EOMModifier {
	EventListener(): Partial<EventListenerMap> { return { game_end: ({ run_id }) => { if (run_id === GameState.GetSession().runId) this.Destroy(); }, game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.Destroy(); } }; }
	@AbilityValue() health_regen: number;
	@AbilityValue() mana_regen: number;
	@AbilityValue() health_regen_pct: number;
	@AbilityValue() chance: number;
	@AbilityValue() attackspeed_reduce: number;
	@AbilityValue() movespeed_reduce: number;
	IsDebuff() { return !this.GetParent().IsFriendly(this.GetCaster()!); }
	DynamicProperty() {
		return { [PropertyFunction.HEALTH_REGEN_CONSTANT]: () => this.IsDebuff() ? 0 : this.health_regen,
			[PropertyFunction.HEALTH_REGEN_PERCENTAGE]: () => this.IsDebuff() ? 0 : this.health_regen_pct,
			[PropertyFunction.MANA_REGEN_CONSTANT]: () => this.IsDebuff() ? 0 : this.mana_regen,
			[PropertyFunction.ATTACKSPEED]: () => this.IsDebuff() ? -this.attackspeed_reduce : 0,
			[PropertyFunction.MOVESPEED_AMPLIFY]: () => this.IsDebuff() ? -this.movespeed_reduce : 0 };
	}
	Roll() {
		if (!IsServer() || !RollPercentage(this.chance)) return false;
		const parent = this.GetParent();
		const particle = ParticleManager.CreateParticle("particles/units/heroes/hero_omniknight/omniknight_2_refresh.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN, parent);
		ParticleManager.SetParticleControl(particle, 0, Vector(parent.GetAbsOrigin().x, parent.GetAbsOrigin().y, parent.GetAbsOrigin().z + 100));
		ParticleManager.ReleaseParticleIndex(particle);
		parent.EmitSound("Hero_Tinker.RearmStart");
		return true;
	}
}
