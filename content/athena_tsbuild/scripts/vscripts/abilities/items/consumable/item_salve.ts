import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";

/** 原版药水：同种延长持续时间，不同档分别提供回复来源；最后一层消耗后 buff 保留数值。 */
class Salve extends EOMItem {
	OnSpellStart() {
		const hero = this.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!Items.Owns(hero, this) || Items.Hero(hero.GetPlayerOwnerID(), this.__itemRunId ?? 0) !== hero) return;
		const name = "modifier_" + this.GetAbilityName(), duration = this.GetSpecialValueFor("buff_duration");
		const existing = hero.FindModifierByName(name);
		if (IsValid(existing)) existing.SetDuration(existing.GetRemainingTime() + duration, true);
		else if (!IsValid(hero.AddNewModifier(hero, this, name, { duration, rate: this.GetSpecialValueFor("hp_per_tick") }))) return;
		hero.EmitSound("DOTA_Item.HealingSalve.Activate"); Items.SpendCharge(this);
	}
}
@registerAbility() export class item_salve1 extends Salve { }
@registerAbility() export class item_salve2 extends Salve { }
@registerAbility() export class item_salve3 extends Salve { }
@registerAbility() export class item_salve4 extends Salve { }
class SalveModifier extends EOMModifier {
	private rate = 0;
	OnCreated(params: { rate?: number; }) { this.rate = params.rate ?? 0; }
	IsPurgable() { return true; }
	StaticProperty() { return { [PropertyFunction.HEALTH_REGEN_CONSTANT]: this.rate }; }
}
@registerEOMModifier() export class modifier_item_salve1 extends SalveModifier { }
@registerEOMModifier() export class modifier_item_salve2 extends SalveModifier { }
@registerEOMModifier() export class modifier_item_salve3 extends SalveModifier { }
@registerEOMModifier() export class modifier_item_salve4 extends SalveModifier { }
