import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { ComponentProps, For, Show, mergeProps, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { PopupProps } from "./base_popup";
import { Popup_CommonConfirm } from "./common_confirm/common_confirm";
import { Popup_CommunitySurvey } from "./community_survey/community_survey";
import { Popup_HeroTalent } from "./hero_talent/hero_talent";
import { Popup_PropUse } from "./prop_use/prop_use";
import { Popup_ReviveCoinDialog } from "./revive_coin_dialog/revive_coin_dialog";
import { Popup_ReviveCoinPurchaseDialog } from "./revive_coin_purchase_dialog/revive_coin_purchase_dialog";
import { Popup_StoreBuyItem } from "./store_buy_item/store_buy_item";
import { Popup_StoreBuyItemResult } from "./store_buy_item_result/store_buy_item_result";
// import { Popup_PaymentOversea, Popup_StoreMoneyPayment } from "./store_money_payment/store_money_payment";
import { Popup_PaymentOrder, Popup_PaymentOrderCreater, Popup_PaymentSuccess } from "./payment_order/payment_order";

/** 不同的popup要在这里定义一下 */
const PopupComponents = {
	CommonConfirm: Popup_CommonConfirm,
	CommunitySurvey: Popup_CommunitySurvey,
	StoreBuyItem: Popup_StoreBuyItem,
	// StoreMoneyPayment: Popup_StoreMoneyPayment,
	// StoreMoneyPaymentOversea: Popup_PaymentOversea,
	StoreBuyItemResult: Popup_StoreBuyItemResult,
	HeroTalent: Popup_HeroTalent,
	ReviveCoinDialog: Popup_ReviveCoinDialog,
	ReviveCoinPurchaseDialog: Popup_ReviveCoinPurchaseDialog,
	PropUse: Popup_PropUse,
	PaymentOrder: Popup_PaymentOrder,
	PaymentOrderCreater: Popup_PaymentOrderCreater,
	PaymentSuccess: Popup_PaymentSuccess,
};
const StaticPopup: string[] = [
];

declare global {
	type PopupComponents = typeof PopupComponents;
	type PopupName = keyof PopupComponents;

	type GetPopupProps<T extends PopupName> = (Omit<ComponentProps<PopupComponents[T]>, keyof PopupProps>) & { PopupID?: string; group?: string; };

	// 写到CustomUIConfig里以解决重载代码顺序造成引用还是旧代码的问题
	interface CustomUIConfig {
		/** 开启Popup，可以传入回调函数的版本 */
		showPopup: <T extends PopupName>(
			name: T,
			props: GetPopupProps<T>
		) => string;

		setPopupData: <T extends PopupName>(PopupID: string, props: Partial<GetPopupProps<T>>) => void;
	}
}

const Popups = () => {
	const [popupData, setPopupData] = createStore<Record<string, any>>({});

	CustomUIConfig.showPopup = function (popupName, props) {
		const PopupID = StaticPopup.includes(popupName) ? popupName : (props.PopupID ?? DoUniqueString("Popup"));
		setPopupData(PopupID, { ...props, ...{ popupName, PopupID } });
		return PopupID;
	};
	CustomUIConfig.setPopupData = function (PopupID, props) {
		if (popupData[PopupID]) {
			setPopupData(PopupID, Object.assign({}, mergeProps(popupData[PopupID], props)));
		}
	};

	onMount(() => {
		/** 监听事件显示面板 */
		const id = GameEvents.Subscribe("client_side_event", (eventData: any) => {
			if ("show_popup" == eventData.event_name) {
				let data = (JSON.parse(eventData.event_data)) as {
					PopupID: string,
					popupName: string;
				};
				if (data.popupName && PopupComponents[data.popupName as PopupName]) {
					setPopupData(data.PopupID, data);
				} else {
					console.error("invalid popupName: " + data.popupName);
				}
			}
			if ("close_popup" == eventData.event_name) {
				let data = eventData.event_data as {
					PopupID?: string,
					group?: string;
				};
				if (data.PopupID) {
					setPopupData(data.PopupID, undefined);
				}
			}
		});
		onCleanup(() => GameEvents.Unsubscribe(id));
	});
	return (
		<Panel id="Popups" hittest={false} className={classNames({ ShowPopup: Object.keys(popupData).length > 0 })}>
			<For each={Object.keys(popupData)}>
				{(PopupID, index) => {
					return <Show when={popupData[PopupID].popupName}>
						{PopupComponents[popupData[PopupID].popupName as PopupName](popupData[(PopupID)])}
					</Show>;
				}}
			</For>
		</Panel>
	);
};

render(() => Popups(), $.GetContextPanel());
