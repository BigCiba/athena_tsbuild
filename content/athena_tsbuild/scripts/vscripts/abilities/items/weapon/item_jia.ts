import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";

class Armor extends EOMItem { GetIntrinsicModifierName() { return "modifier_item_jia"; } }
@registerAbility() export class item_jia_1 extends Armor { }
@registerAbility() export class item_jia_2 extends Armor { }
@registerAbility() export class item_jia_3 extends Armor { }
@registerAbility() export class item_jia_4 extends Armor { }
@registerAbility() export class item_jia_5 extends Armor { }
@registerEOMModifier({ IsHidden: true, IsPurgable: false, RemoveOnDeath: false })
export class modifier_item_jia extends EOMModifier {
	DeclareFunctions() { return [modifierfunction.MODIFIER_PROPERTY_AVOID_DAMAGE]; }
	GetModifierAvoidDamage() { return RollPercentage(this.GetAbilitySpecialValueFor("avoid_chance")) ? 1 : 0; }
}
