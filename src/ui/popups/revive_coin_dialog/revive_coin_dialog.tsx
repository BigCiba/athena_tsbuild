import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { BasePopup, PopupProps } from "../base_popup";
import "./revive_coin_dialog.less";

interface ReviveCoinDialogProps extends PopupProps {
	requestId?: string;
	timeout?: number;
	coinCount?: number;
}

export function Popup_ReviveCoinDialog(props: ReviveCoinDialogProps) {
	const coinCount = props.coinCount ?? 0;
	const timeout = props.timeout ?? 100;
	const [remaining, setRemaining] = createSignal(timeout);

	let resolved = false;

	const sendChoice = (use: 0 | 1) => {
		if (resolved) return;
		resolved = true;
		if (use === 1) {
			GameUI.CustomUIConfig().ReportClick("revive_coin", "dialog|use");
		}
		GameEvents.SendCustomGameEventToServer("revive_coin_choice", { use, requestId: props.requestId });
		ClosePopup(props.PopupID);
	};
	onMount(() => {
		GameUI.CustomUIConfig().ReportClick("revive_coin", "dialog|show");
	});
	// 倒计时
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
			class="Popup_ReviveCoinDialog"
			PopupID={props.PopupID}
			group={props.group}
			title="#ReviveCoin_Title"
			size="small"
			closeOnClickOuter={false}
			closeOnEsc={false}
			hideClose
		>
			<Panel id="CenterBlock" hittest={false}>
				<Label
					text={"#ReviveCoin_Confirm"}
					vars={{ value: coinCount }}
				/>
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
				<EOM_Button color="Confirm" text="#ReviveCoin_Use" onactivate={() => {
					sendChoice(1);
				}} />
			</Panel>
		</BasePopup>
	);
}
