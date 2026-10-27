import { EOMAbility, registerEOMAbility } from "../../eom_ability";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";
import "../../../modifiers/framework/modifier_stunned";
import type { modifier_omniknight_2_aura } from "./omniknight_2";

/** 保留原版雷霆战士标记和粒子映射；皮肤装备入口后续实现。 */
export function OmniknightParticle(caster: CDOTA_BaseNPC, skill: 0 | 1 | 2 | 4) {
	return "particles/units/heroes/hero_omniknight/" + (caster.HasModifier("modifier_omniknight_01") ? "thunder_warrior/" : "") + "omniknight_" + skill + ".vpcf";
}

export function OmniknightStun(caster: CDOTA_BaseNPC, target: CDOTA_BaseNPC, ability: CDOTABaseAbility, duration: number) {
	if (!IsValid(target) || !target.IsAlive() || target.HasState(StateEnum.STUN_IMMUNE)) return;
	target.AddNewModifier(caster, ability, "modifier_athena_stunned", { duration: duration * (1 - target.GetStatusResistance()) });
}

@registerEOMAbility()
export class omniknight_0 extends EOMAbility {
	GetIntrinsicModifierName() { return "modifier_omniknight_0"; }
	GetBehavior() {
		return this.GetCaster().HasModifier("modifier_omniknight_01")
			? DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			: DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE;
	}
	GetCooldown(_level: number) { return this.GetSpecialValueFor(this.GetCaster().HasModifier("modifier_omniknight_01") ? "active_cooldown" : "cooldown"); }
	/** 举重的联动由当前 modifier 提供，刷新/降级/移除都不积累旧升级记录。 */
	GetLevelSpecialValueFor(key: string, level: number, caster = this.GetCaster()): number {
		const base = (CDOTABaseAbility.GetLevelSpecialValueFor as (this: CDOTABaseAbility, key: string, level: number, caster?: CDOTA_BaseNPC) => number).call(this, key, level, caster);
		const weight = caster.FindModifierByName("modifier_omniknight_3")?.GetAbility();
		if (level <= 0 || !IsValid(weight) || weight.GetLevel() <= 0) return base;
		if (key === "chance") return base + weight.GetSpecialValueFor("bonus_chance");
		if (key === "str_factor") return base + GetStrength(caster) * weight.GetSpecialValueFor("bonus_str_factor");
		return base;
	}
	OnSpellStart() { this.GetCaster().AddNewModifier(this.GetCaster(), this, "modifier_omniknight_0_active", {}); }
	ThunderPower(target: CDOTA_BaseNPC, sound = false) {
		if (IsValid(target) && (target.IsStunned() || target.HasState(StateEnum.STUNNED))) this.Action(target, sound);
	}
	Action(target: CDOTA_BaseNPC, sound = false) {
		const caster = this.GetCaster();
		if (!IsServer() || !IsValid(caster) || !IsValid(target)) return;
		const origin = target.GetAbsOrigin();
		const victims = caster.GetScepterLevel() >= 2 ? FindUnitsInRadius(caster.GetTeamNumber(), origin, undefined, this.GetSpecialValueFor("scepter_radius"),
			this.GetAbilityTargetTeam(), this.GetAbilityTargetType(), this.GetAbilityTargetFlags(), FindOrder.FIND_ANY_ORDER, false) : [target];
		caster.DealDamage(victims, this, this.GetSpecialValueFor("str_factor"));
		const particle = ParticleManager.CreateParticle(OmniknightParticle(caster, 0), ParticleAttachment_t.PATTACH_CUSTOMORIGIN, caster);
		ParticleManager.SetParticleControl(particle, 0, Vector(origin.x, origin.y, origin.z + 5000));
		ParticleManager.SetParticleControl(particle, 1, origin);
		ParticleManager.SetParticleControl(particle, 3, origin);
		ParticleManager.ReleaseParticleIndex(particle);
		if (sound && IsValid(target)) target.EmitSound("Hero_Zuus.LightningBolt");
	}
}

@registerEOMModifier({ IsHidden: false, IsPurgable: false, RemoveOnDeath: false, AllowIllusionDuplicate: true })
export class modifier_omniknight_0 extends EOMModifier {
	StaticProperty() { return { [PropertyFunction.STATS_STRENGTH_BONUS]: this.GetStackCount() }; }
	DeclareFunctions() { return [modifierfunction.MODIFIER_PROPERTY_TOOLTIP]; }
	OnTooltip() { return this.GetStackCount(); }
	OnCreated() {
		if (IsClient()) {
			const particle = ParticleManager.CreateParticle("particles/econ/items/faceless_void/faceless_void_weapon_voidhammer/faceless_void_weapon_voidhammer.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, this.GetParent());
			ParticleManager.SetParticleControlEnt(particle, 0, this.GetParent(), ParticleAttachment_t.PATTACH_POINT_FOLLOW, "attach_attack1", this.GetParent().GetAbsOrigin(), true);
			this.AddParticle(particle, false, false, -1, false, false);
		}
	}
	EventListener(): Partial<EventListenerMap> { return { game_reset: ({ runId }) => { if (runId !== GameState.GetSession().runId) return; this.SetStackCount(0); this.GetParent().RemoveModifierByName("modifier_omniknight_0_active"); } }; }
	UnitEventListener(): Partial<UnitEventListenerMap> {
		return { attack_landed: { source: ({ target, attack_states }) => {
			if (((attack_states ?? 0) & ATTACK_STATES.SKIPCOUNTING) !== 0 || !IsValid(target) || !target.IsAlive()) return;
			const parent = this.GetParent(), ability = this.GetAbility() as omniknight_0;
			// 原版先对已眩晕目标触发天罚，再判定本次眩晕。
			ability.ThunderPower(target, true);
			if (!IsValid(target)) return;
			if ((ability.IsCooldownReady() && RollPercentage(ability.GetSpecialValueFor("chance"))) || parent.HasModifier("modifier_omniknight_0_active")) {
				const aura = parent.FindModifierByName("modifier_omniknight_2_aura") as modifier_omniknight_2_aura | undefined;
				ability.StartCooldown(aura?.Roll() ? 0 : ability.GetSpecialValueFor("cooldown"));
				this.IncrementStackCount();
				OmniknightStun(parent, target, ability, ability.GetSpecialValueFor("stun_duration"));
				parent.RemoveModifierByName("modifier_omniknight_0_active");
			}
		} } };
	}
}

@registerEOMModifier({ IsHidden: false, IsPurgable: false, RemoveOnDeath: false })
export class modifier_omniknight_0_active extends EOMModifier { }
