import { reloadable } from "../lib/tstl-utils";

/** 物品引擎过滤器由框架统一持有；具体购买、拾取、转移规则交给玩法。 */
@reloadable
class CInventory extends CModule {
	init() {
		const mode = GameRules.GetGameModeEntity();
		mode.SetItemAddedToInventoryFilter(event => {
			const unit = EntIndexToHScript(event.inventory_parent_entindex_const) as CDOTA_BaseNPC;
			const item = EntIndexToHScript(event.item_entindex_const) as CDOTA_Item;
			const data = { unit, item, allowed: IsValid(unit) && IsValid(item) };
			const errors = Event.Fire("inventory_filter", data);
			return data.allowed && !errors?.length;
		}, this);
		mode.SetExecuteOrderFilter(order => {
			const data = { order, allowed: true };
			const errors = Event.Fire("inventory_order", data);
			return data.allowed && !errors?.length;
		}, this);
	}
}
declare global { var Inventory: CInventory; }
Inventory ??= new CInventory();
