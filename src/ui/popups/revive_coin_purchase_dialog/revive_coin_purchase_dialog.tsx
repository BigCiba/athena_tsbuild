import { createEffect, createSignal, onCleanup } from "solid-js";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { CurrencyIcon } from "../../../components/Player/Player";
import { BasePopup, PopupProps } from "../base_popup";
import "./revive_coin_purchase_dialog.less";

interface ReviveCoinPurchaseDialogProps extends PopupProps {
	requestId?: string;
	timeout?: number;
}

const REVIVE_COIN_PRODUCT_ID = 800018;

export function Popup_ReviveCoinPurchaseDialog(props: ReviveCoinPurchaseDialogProps) {
	const timeout = props.timeout ?? 100;
	const [remaining, setRemaining] = createSignal(timeout);
	const itemData = KeyValues.info_shop_product[REVIVE_COIN_PRODUCT_ID];

	let resolved = false;

	const sendChoice = (buy: 0 | 1) => {
		if (resolved) return;
		resolved = true;
		GameEvents.SendCustomGameEventToServer("revive_coin_purchase_choice", { buy, requestId: props.requestId });
		ClosePopup(props.PopupID);
	};

	createEffect(() => {
		const timer = setInterval(() => {
			const r = remaining() - 1;
			if (r <= 0) {
				setRemaining(0);
				clearInterval(timer);
				sendChoice(0);
				return;
			}
			setRemaining(r);
		}, 1000);
		onCleanup(() => clearInterval(timer));
	});

	return (
		<BasePopup
			class="Popup_ReviveCoinPurchaseDialog"
			PopupID={props.PopupID}
			group={props.group}
			title="#ReviveCoinPurchase_Title"
			size="small"
			closeOnClickOuter={false}
			closeOnEsc={false}
			hideClose
		>
			<Panel id="CenterBlock" hittest={false}>
				<Label text="#ReviveCoinPurchase_Text" />
			</Panel>
			<Panel id="CountdownBar" hittest={false}>
				<Panel id="CountdownFill" style={{ width: `${(remaining() / timeout) * 100}%` }} />
			</Panel>
			<Panel id="CountdownText" hittest={false}>
				<Label text={remaining().toString() + "s"} />
			</Panel>
			<Panel id="BottomButtons" hittest={false}>
				<EOM_Button id="Cancel" color="Cancel" text="#ReviveCoin_GiveUp" onactivate={() => {
					sendChoice(0);
				}} />
				<EOM_Button color="Confirm" onactivate={() => {
					sendChoice(1);
				}}>
					<Panel flowChildren="right" align="center center">
						<Label text="#ReviveCoinPurchase_Confirm" />
						<CurrencyIcon tokenID={itemData.pay_type} />
						<Label className="CostLabel" text={Float(GetStoreItemCost(itemData, 1))} />
					</Panel>
				</EOM_Button>
			</Panel>
		</BasePopup>
	);
}
