import { reloadable } from "../lib/tstl-utils";

/** 后端抽卡 */
@reloadable
class CServiceDraw extends CModule {
	init(bReload: boolean) {
		if (!bReload) {
		}

		RequestEvent("draw_card", (event) => {
			let result = CommonService.CallActionSync("/v1/draw/card", event.PlayerID, {
				draw_type: event.count,
				pool_id: event.id
			}, { ignoreInvalidResponse: false, showAddItems: false });
			let items_list: {
				item_id: number,
				amounts: number,
				item_rarity: number,
				draw_card_rarity: number,
			}[] = [];

			for (let [source, items] of pairs(result.data?.add_items ?? {})) {
				items_list.push(...items);
			}

			return { code: result.code ?? -1, items_list };
		});

		RequestEvent("change_lucky_choice", (event) => {
			let result = CommonService.CallActionSync("/v1/draw/card/change_lucky_choice", event.PlayerID, {
				pool_id: event.pool_id,
				lucky_choice: event.lucky_choice
			}, { ignoreInvalidResponse: false, showAddItems: false });

			return { code: result.code ?? -1 };
		});
	}
}

declare global {
	/**
	 * @ServerOnly
	 */
	var Community: CServiceDraw;
}
Community ??= new CServiceDraw();