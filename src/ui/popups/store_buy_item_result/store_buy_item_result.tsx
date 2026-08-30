import { For, Match, ParentComponent, Switch, splitProps } from "solid-js";
import { BackpackItemContent } from "../../../components/BackpackItem/BackpackItem";
import { EOM_Loading } from "../../../components/EOMDesign/DataDisplay/EOM_Loading/EOM_Loading";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { BasePopup, PopupProps } from "../base_popup";
import "./store_buy_item_result.less";

interface Popup_StoreBuyItemResult_Prop extends PopupProps {
	/** 标题 */
	title?: string,
	/** 物品名字 */
	result: "loading" | "success" | "failure" | "gotoUrl",
	/** 原因 */
	reason?: string,
	items?: {
		item_id: number;
		amounts: number;
	}[];
}

/** 买物品 */
export const Popup_StoreBuyItemResult: ParentComponent<Popup_StoreBuyItemResult_Prop> = (props) => {
	const [local, others] = splitProps(props, ["title", "result", "PopupID", "group", "reason", "items"]);
	const getTitle = () => {
		if (local.title != undefined) {
			return local.title;
		}
		switch (local.result) {
			case "loading":
				return "#Popup_StoreBuyItem_Result";
			case "success":
				return "#Popup_StoreBuyItem_Result";
			case "failure":
				return "#Popup_StoreBuyItem_Result";
			case "gotoUrl":
				return "#Popup_StoreBuyItem_GotoURL";
			default:
				return "#Popup_StoreBuyItem_Result";
		}
	};
	return (
		<BasePopup class="StoreBuyItemResult" PopupID={local.PopupID} group={local.group} title={getTitle()} size="small">
			<Panel width="100%" height="100%">
				<Switch fallback={<EOM_Loading align="center center" type="Wave" />}>
					{/* 购买中 */}
					<Match when={local.result == "loading"}>
						<Panel align="center center" flowChildren="down">
							<EOM_Loading horizontalAlign="center" type="Wave" color="#D9B88D" />
							<Label id="TipLabel" text="#Popup_StoreOverseaPayment_Loading" />
						</Panel>
					</Match>
					{/* 购买成功 */}
					<Match when={local.result == "success"}>
						<Switch fallback={<>
							<Image className="Popup_StoreBuyItemResultIcon Success" />
							<Label id="TipLabel" text="#Popup_StoreBuyItem_Success" />
						</>}>
							<Match when={local.items != undefined && local.items.length > 0}>
								<Panel id="RewardList" >
									<For each={local.items}>
										{(item) => <BackpackItemContent itemid={item.item_id} amounts={item.amounts} >
											<DOTAParticleScenePanel id="Bubble" visible={item.item_id == 110016} hittest={false} particleName="particles/ui/game/ui_game_general_special_effects_02_fx.vpcf" cameraOrigin="0 0 40" fov={40} lookAt="0 0 0" />
										</BackpackItemContent>}
									</For>
								</Panel>
							</Match>
						</Switch>
						{/* <EOM_Image className="Popup_StoreBuyItemResultIcon Success" />
						<EOM_Label id="TipLabel" text="#Popup_StoreBuyItem_Success" /> */}
					</Match>
					{/* 购买失败 */}
					<Match when={local.result == "failure"}>
						<Image className="Popup_StoreBuyItemResultIcon Failure" />
						<Label id="TipLabel" text="#Popup_StoreBuyItem_Failure" />
						<Label id="Reason" text={local.reason} />
					</Match>

				</Switch>
				<Switch fallback={() =>
					<Panel align="center bottom" flowChildren="right">
						<EOM_Button color="Cancel" text="#GameUI_Close" onactivate={() => {
							ClosePopup(local.PopupID);
						}} />
					</Panel>
				}>
					<Match when={props.reason == "no_enough_moon"} >
						{/* 月石不足 */}
						<Label id="ErrorMsg" text="#no_enough_moon" />
						<Panel align="center bottom" flowChildren="right">
							<EOM_Button color="Cancel" text="#no_thanks" onactivate={() => {
								ClosePopup(local.PopupID);
							}} />
							<EOM_Button text="#go_buy" onactivate={() => {
								ClosePopup(local.PopupID);
								ClientSideEvent("toggle_store_tag", { menu: "Resource" });
							}} />
						</Panel>
					</Match>
					<Match when={props.reason == "no_enough_coin"}>
						{/* 金币不足 */}
						<Label id="ErrorMsg" text="#no_enough_token" />
						<Panel align="center bottom" flowChildren="right">
							<EOM_Button color="Cancel" text="#no_thanks" onactivate={() => {
								ClosePopup(local.PopupID);
							}} />
							<EOM_Button text="#go_buy" onactivate={() => {
								ClosePopup(local.PopupID);
								ClientSideEvent("directly_purchase", { itemid: 9900208 });
							}} />
						</Panel>
					</Match>
					<Match when={props.reason == "no_enough_token"}>
						{/* 金币不足 */}
						<Label id="ErrorMsg" text="#no_enough_token_2" />
						<Panel align="center bottom" flowChildren="right">
							<EOM_Button color="Cancel" text="#no_thanks" onactivate={() => {
								ClosePopup(local.PopupID);
							}} />
							<EOM_Button text="#CosmeticGet" onactivate={() => {
								ClosePopup(local.PopupID);
								ToggleWindow('MenuButton_draw', true);
							}} />
						</Panel>
					</Match>
				</Switch>
			</Panel>
		</BasePopup>
	);
};