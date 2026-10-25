import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";

class Clarity extends EOMItem {
	OnSpellStart() {
		const hero = this.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!Items.Owns(hero, this) || Items.Hero(hero.GetPlayerOwnerID(), this.__itemRunId ?? 0) !== hero) return;
		const name = "modifier_" + this.GetAbilityName(), duration = this.GetSpecialValueFor("buff_duration");
		const existing = hero.FindModifierByName(name);
		if (IsValid(existing)) existing.SetDuration(existing.GetRemainingTime() + duration, true);
		else if (!IsValid(hero.AddNewModifier(hero, this, name, { duration, rate: this.GetSpecialValueFor("mana_per_tick") }))) return;
		hero.EmitSound("DOTA_Item.ClarityPotion.Activate"); Items.SpendCharge(this);
	}
}
@registerAbility() export class item_clarity1 extends Clarity { }
@registerAbility() export class item_clarity2 extends Clarity { }
@registerAbility() export class item_clarity3 extends Clarity { }
@registerAbility() export class item_clarity4 extends Clarity { }
class ClarityModifier extends EOMModifier {
	private rate = 0;
	OnCreated(params: { rate?: number; }) { this.rate = params.rate ?? 0; }
	IsPurgable() { return true; }
	StaticProperty() { return { [PropertyFunction.MANA_REGEN_CONSTANT]: this.rate }; }
}
@registerEOMModifier() export class modifier_item_clarity1 extends ClarityModifier { }
@registerEOMModifier() export class modifier_item_clarity2 extends ClarityModifier { }
@registerEOMModifier() export class modifier_item_clarity3 extends ClarityModifier { }
@registerEOMModifier() export class modifier_item_clarity4 extends ClarityModifier { }
