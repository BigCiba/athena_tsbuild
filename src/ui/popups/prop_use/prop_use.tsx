import { createMemo, createSignal, For } from "solid-js";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { StoreItemBlock } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import { BasePopup, PopupProps } from "../base_popup";
import "./prop_use.less";

interface Popup_PropUse_Props extends PopupProps {
	prop_id: number | string,
}

export function Popup_PropUse(props: Popup_PropUse_Props) {
	const player_cosmetics = createServiceNetData("player_cosmetics", {});
	// 获取道具数据和掉落物品列表
	const propData = createMemo(() => KeyValues.info_item_prop[props.prop_id]);
	const dropItems = createMemo(() => {
		const data = propData();
		if (data === undefined || data.prop_drop === undefined) return [];
		return Object.keys(data.prop_drop);
	});

	const isItemOwned = (item_id: string) => player_cosmetics()[item_id] !== undefined;

	const [pickItemID, setPickItemID] = createSignal<string>();

	const handleConfirm = () => {
		const pickID = pickItemID();
		if (pickID === undefined) return;
		CallAction("/v1/prop/open", {
			prop_id: Number(props.prop_id),
			pick_item_id: Number(pickID),
		});
		ClosePopup(props.PopupID);
	};

	return (
		<BasePopup class="Popup_PropUse" PopupID={props.PopupID} group={props.group} title="#Props_Action">
			<Panel id="CenterBlock" >
				<Panel id="PickList" class="VerticalScrollStyle" scroll="y">
					<For each={dropItems()}>
						{item_id => (
							<Panel
								class="DropItemBlock"
								classList={{ Selected: pickItemID() == item_id, Disabled: isItemOwned(item_id) }}
								onactivate={() => {
									if (!isItemOwned(item_id)) setPickItemID(item_id);
								}}
							>
								<StoreItemBlock item_id={item_id} hideTips={false} />
								<Panel class="SelectedBorder" hittest={false} />
							</Panel>
						)}
					</For>
				</Panel>
			</Panel>
			<Panel id="BottomButtons" hittest={false}>
				<EOM_Button id="Cancel" color="Cancel" text="#Popup_Button_Cancel" onactivate={() => {
					ClosePopup(props.PopupID);
				}} />
				<EOM_Button color="Confirm" text="#Popup_Button_Confirm"
					enabled={pickItemID() !== undefined}
					onactivate={handleConfirm}
				/>
			</Panel>
		</BasePopup>
	);
}