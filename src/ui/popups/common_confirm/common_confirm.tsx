import { Show, createMemo, mergeProps, onCleanup } from "solid-js";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { BasePopup, PopupProps } from "../base_popup";
import "./common_confirm.less";

interface CommonConfirmItem {
	item_id: string | number,
	uid?: string | number,
	amounts?: number,
	item_rarity?: number,
	rarity?: number,
}

interface Popup_CommonConfirm_Props extends PopupProps {
	text: string,
	onconfirm?: () => void,
	confirm_text?: string,
	cancel_text?: string,
	title?: string,
	icon?: string,
	vars?: Record<string, any>,
	onresult?: (bConfirm: boolean) => void,
	showCancel?: boolean,
	items?: CommonConfirmItem[],
}

export function Popup_CommonConfirm(props: Popup_CommonConfirm_Props) {

	const merged = mergeProps({ showCancel: true }, props);
	const items = createMemo(() => props.items ?? []);

	let bConfirm = false;

	onCleanup(() => {
		if (bConfirm && props.onconfirm) {
			props.onconfirm();
		}
		if (props.onresult) {
			props.onresult(bConfirm);
		}
	});

	return (
		<BasePopup class="Popup_CommonConfirm" PopupID={props.PopupID} size="small" group={props.group} title={props.title}>
			<Panel id="CenterBlock" hittest={false}>
				<Panel align="center center" flowChildren="down">
					<Label id="Text" text={props.text} html vars={props.vars} visible={props.text != ""} />
					<Show when={items().length > 0}>
						<Panel id="ItemList">
						</Panel>
					</Show>
				</Panel>
			</Panel>
			<Panel id="BottomButtons" hittest={false}>
				<EOM_Button id="Cancel" color="Cancel" visible={merged.showCancel} text={props.cancel_text ?? "#Popup_Button_Cancel"} onactivate={() => {
					ClosePopup(props.PopupID);
				}} />
				<EOM_Button color="Confirm" text={props.confirm_text ?? "#Popup_Button_Confirm"} onactivate={() => {
					bConfirm = true;
					ClosePopup(props.PopupID);
				}} />
			</Panel>
		</BasePopup>
	);
}
