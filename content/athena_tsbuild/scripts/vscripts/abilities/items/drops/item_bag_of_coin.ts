import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";

@registerAbility()
export class item_bag_of_coin extends EOMItem {
	OnSpellStart() {
		Items.UsePickup(this, hero => {
			if (RunResources.Modify(hero.GetPlayerOwnerID(), "gold", this.GetSpecialValueFor("gold"), this.__itemRunId!)) Items.SpendCharge(this);
		});
	}
}
