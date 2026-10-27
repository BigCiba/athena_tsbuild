import { AbilityValue, EOMAbility, registerEOMAbility } from "../../eom_ability";
import { EOMModifier, registerEOMModifier, TransmitterData } from "../../../modifiers/eom_modifier/eom_modifier";
import { omniknight_0 } from "./omniknight_0";

@registerEOMAbility()
export class omniknight_3 extends EOMAbility {
	GetIntrinsicModifierName() { return "modifier_omniknight_3"; }
}

@registerEOMModifier({ IsHidden: false, IsPurgable: false, RemoveOnDeath: false, AllowIllusionDuplicate: true })
export class modifier_omniknight_3 extends EOMModifier {
	@AbilityValue() bonus_attackspeed: number;
	@AbilityValue() bonus_str: number;
	@AbilityValue() bonus_str_pct: number;
	@AbilityValue() attack_count: number;
	@TransmitterData() earnedStrength = 0;
	StaticProperty() {
		return { [PropertyFunction.ATTACKSPEED]: this.bonus_attackspeed,
			[PropertyFunction.STATS_STRENGTH_BONUS]: this.bonus_str,
			[PropertyFunction.STATS_STRENGTH_BASE_PERCENTAGE]: this.bonus_str_pct };
	}
	DeclareFunctions() { return [modifierfunction.MODIFIER_PROPERTY_TOOLTIP]; }
	OnTooltip() { return this.earnedStrength; }
	EventListener(): Partial<EventListenerMap> { return { game_reset: ({ runId }) => { if (runId !== GameState.GetSession().runId) return; this.SetStackCount(0); this.earnedStrength = 0; this.SendBuffRefreshToClients(); } }; }
	UnitEventListener(): Partial<UnitEventListenerMap> {
		return { attack_landed: { source: ({ target, attack_states }) => {
			if (((attack_states ?? 0) & ATTACK_STATES.SKIPCOUNTING) !== 0 || this.attack_count <= 0) return;
			const parent = this.GetParent(), next = this.GetStackCount() + 1;
			if (next >= this.attack_count && parent.HasModifier("modifier_omniknight_01")) {
				const thunder = parent.FindAbilityByName("omniknight_0") as omniknight_0 | undefined;
				if (IsValid(thunder)) thunder.Action(target, true);
			}
			if (next >= this.attack_count) {
				this.SetStackCount(0);
				if (parent.AddPermanentAttribute("CUSTOM_ATTRIBUTE_STRENGTH", 1)) {
					this.earnedStrength++; this.SendBuffRefreshToClients();
				}
			} else this.SetStackCount(next);
		} } };
	}
}
