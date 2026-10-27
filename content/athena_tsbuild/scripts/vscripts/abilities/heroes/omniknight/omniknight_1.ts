import { EOMAbility, registerEOMAbility } from "../../eom_ability";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";
import { omniknight_0, OmniknightParticle, OmniknightStun } from "./omniknight_0";

@registerEOMAbility()
export class omniknight_1 extends EOMAbility {
	GetCooldown(_level: number) { return this.GetSpecialValueFor("charge_restore_time") * (this.GetCaster().HasModifier("modifier_omniknight_2_aura") ? 0.5 : 1); }
	GetMaxCharges() {
		return this.GetCaster().GetScepterLevel() >= 1 ? this.GetSpecialValueFor("scepter_charges") || 4
			: tonumber(KeyValues.abilities[this.GetAbilityName()]?.CustomAbilityCharges) ?? 3;
	}
	OnScepterLevelup(_level: number) { this.RefreshScepterCharges(); }
	// 原版在专属 modifier 的 OnDestroy 内调用，此时标记可能仍可查询。
	OnScepterRemove() { this.RefreshScepterCharges(tonumber(KeyValues.abilities[this.GetAbilityName()]?.CustomAbilityCharges) ?? 3); }
	UnitEventListener(): Partial<UnitEventListenerMap> { return { scepter_levelup: { source: () => this.RefreshScepterCharges() } }; }
	private RefreshScepterCharges(limit = this.GetMaxCharges()) {
		if (!IsServer()) return;
		const old = this.GetCharges();
		this.__Charge = math.min(old ?? 0, limit);
		this.GetCaster().UpdateAbilityNetData();
		this.__NotifyChargeChanged(old);
	}
	OnSpellStart() {
		const caster = this.GetCaster(), thunder = caster.FindAbilityByName("omniknight_0") as omniknight_0 | undefined;
		if (!IsValid(thunder)) return;
		const targets = FindUnitsInRadius(caster.GetTeamNumber(), caster.GetAbsOrigin(), undefined, this.GetSpecialValueFor("radius"),
			thunder.GetAbilityTargetTeam(), thunder.GetAbilityTargetType(), thunder.GetAbilityTargetFlags(), FindOrder.FIND_ANY_ORDER, false);
		const damage = this.GetSpecialValueFor("base_damage"), duration = this.GetSpecialValueFor("stun_duration");
		for (const target of targets) {
			const stacks = target.FindModifierByName("modifier_omniknight_1_debuff")?.GetStackCount() ?? 0;
			caster.DealDamage(target, thunder, damage * (1 + stacks * this.GetSpecialValueFor("damage_increase_pct") * 0.01));
			thunder.ThunderPower(target);
			OmniknightStun(caster, target, this, duration);
			if (IsValid(target) && target.IsAlive() && caster.HasModifier("modifier_omniknight_01")) {
				target.AddNewModifier(caster, this, "modifier_omniknight_1_debuff", { duration: duration * (1 - target.GetStatusResistance()) });
			}
		}
		const particle = ParticleManager.CreateParticle(OmniknightParticle(caster, 1), ParticleAttachment_t.PATTACH_ABSORIGIN, caster);
		ParticleManager.ReleaseParticleIndex(particle);
		caster.EmitSound("n_creep_Thunderlizard_Big.Stomp");
	}
}

@registerEOMModifier({ IsHidden: false, IsDebuff: true, IsPurgable: true })
export class modifier_omniknight_1_debuff extends EOMModifier {
	IgnoreTenacity() { return true; }
	EventListener(): Partial<EventListenerMap> { return { game_reset: ({ runId }) => { if (runId === GameState.GetSession().runId) this.Destroy(); } }; }
	OnCreated() { if (IsServer()) this.IncrementStackCount(); }
	OnRefresh() { if (IsServer()) this.IncrementStackCount(); }
}
