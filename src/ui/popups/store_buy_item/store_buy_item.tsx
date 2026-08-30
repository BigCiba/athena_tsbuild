import { For, ParentComponent, Show, createMemo, createSignal, splitProps } from "solid-js";
import { BackpackItemContent } from "../../../components/BackpackItem/BackpackItem";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_NumberAdjust } from "../../../components/EOMDesign/Input/EOM_NumberAdjust/EOM_NumberAdjust";
import { CurrencyGroup, CurrencyIcon } from "../../../components/Player/Player";
import { StoreItem } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import { BasePopup, PopupProps } from "../base_popup";
import "./store_buy_item.less";
interface Popup_StoreBuyItem_Prop extends PopupProps {
	/** 物品属性 */
	itemData: StoreItemData;
	/** 已购买的物品数量（用于处理有限购次数的商品） */
	purchased_num?: number;
	/** 默认的购买数量，例如抽卡时缺9张卡可传入9 */
	buy_count?: number;
}
/** 买物品 */
export const Popup_StoreBuyItem: ParentComponent<Popup_StoreBuyItem_Prop> = (props) => {
	const [local, others] = splitProps(props, ["itemData", "PopupID", "group"]);
	const getCost = () => {
		if (getMaxCount() == 0) {
		}
		return Float(GetStoreItemCost(local.itemData, count()));
	};
	const player_tokens = createServiceNetData("player_tokens", {});
	const player_props = createServiceNetData("player_props", {});
	const player_couriers = createServiceNetData("player_couriers", {});

	let purchased_num = createMemo(() => {
		let data = props.itemData;
		let items = data.items ?? {};
		let itemList = Object.keys(items);
		let purchased_num = props.purchased_num ?? 0;
		let couriers = player_couriers();
		let star = 0;
		itemList.map(item_id => {
			if (couriers[item_id]) {
				star += (couriers[item_id]?.star ?? 0) + (couriers[item_id]?.extra_star_exp ?? 0);
			}
		});
		if (star > 0) {
			return star;
		}
		return purchased_num;
	});
	/** 剩余可购买的最大数量 */
	const getMaxCount = () => {
		return local.itemData.limit_type > 0 ? (local.itemData.limit_count - purchased_num()) : 999;
	};
	const buyItem = () => {
		const itemData = local.itemData;
		if (itemData.pay_type == PayType.MONEY) {
			ShowPopup("PaymentOrder", { itemData: itemData, PopupID: props.PopupID, count: count(), group: String(itemData.id) });
			// ShowPopup("StoreMoneyPayment", { itemData: itemData, PopupID: props.PopupID, count: count(), group: String(itemData.id) });
		} else {
			ShowPopup("StoreBuyItemResult", { result: "loading", PopupID: props.PopupID, group: String(itemData.id) });
			ServerRequest("product_buy", {
				product_id: itemData.id,
				amounts: count()
			}, (res) => {
				if (res.status == 0) {
					let items: {
						item_id: number;
						amounts: number;
					}[] = [];
					const itemsData = itemData.items ?? {};
					for (const itemID in itemsData) {
						const amount = itemsData[itemID];
						items.push({ item_id: Number(itemID), amounts: amount * count() });
					}
					ShowPopup("StoreBuyItemResult", { result: "success", PopupID: props.PopupID, group: String(itemData.id), items: items });
				} else {
					ShowPopup("StoreBuyItemResult", { result: "failure", reason: res.msg, PopupID: props.PopupID, group: String(itemData.id) });
				}
			});
		}
	};
	const getItemKeys = () => Object.keys(local.itemData.items ?? {});

	const desc = () => {
		const key = "#" + itemData.id + "_description";
		let description = GetLocalization(key);
		const itemListKeys = getItemKeys();
		if (description == key) {
			if (itemListKeys.length >= 1) {
				description = GetLocalization("#" + itemListKeys[0] + "_description");
			}
		}
		return description;
	};
	const showBundleInfo = () => getItemKeys().length >= 1 && itemData.id != 802039 && itemData.id != 802040;
	const nameStr = () => {
		const key = "#" + itemData.id;
		let nameText = GetLocalization(key, "");
		if (nameText == key) {
			const itemListKeys = getItemKeys();
			if (itemListKeys.length >= 1) {
				nameText = GetLocalization("#" + itemListKeys[0], "");
			}
		}
		return nameText;
	};
	/** 跳转资源充值界面 */
	const jumpCharge = () => {
		ClientSideEvent("toggle_store_tag", { tabIndex: 3 });
		ClosePopup(props.PopupID);
	};
	const [count, setCount] = createSignal(1);
	const { itemData, PopupID } = local;

	const canBuy = createMemo(() => {
		if (getMaxCount() <= 0) return;
		// 免费
		if (itemData.pay_type == 0) return true;
		let cost = getCost();
		if ((player_tokens()[itemData.pay_type]?.amounts ?? 0) >= cost) return true;
		if (GetServiceItemCount(itemData.pay_type) >= cost) return true;
		return false;
	});

	return (
		<BasePopup id="StoreBuyItemPopup" PopupID={PopupID} group={String(itemData.id)} title="#Popup_StoreBuyItem_title" >
			{/* <Label id="StoreBuyItemTitle" text="#Popup_StoreBuyItem_title" /> */}
			{/* 玩家货币 */}
			<CurrencyGroup currencyType="popup" tokens={[local.itemData.pay_type]} classList={{ Cash: local.itemData.pay_type == 0 }} />
			{/* 中间部分 */}
			<Panel id="CenterBlock">
				{/* 商品图片 */}
				<StoreItem btnDisable={true} itemid={itemData.id} purchased_num={purchased_num()} priceBtnHide={true} />
				<Panel id="ItemInfo" >
					{/* 商品介绍 */}
					<Panel width="100%">
						<Label html id="ItemName" text={nameStr()} />
						<Show when={itemData.limit_type > 0}>
							<Label html id="ItemLimit" text={"#Popup_Store_LimitCount" + itemData.limit_type} vars={{ num: purchased_num(), max: local.itemData.limit_count }} />
						</Show>
					</Panel>
					<Label html id="ItemDesc" text={desc()} scroll="y" class="VerticalScrollStyle" />
					<Show when={itemData.limit_repeat != undefined}>
						<Label class="PurchaseLimitTips" text={LocalizeWithVars("Goods_Repeat_Buy_Notice", { value: itemData.limit_repeat })} />
					</Show>
					<Show when={showBundleInfo()}>
						<Label id="ItemBundleInfo" text="#StoreItem_BundleInfo" />
					</Show>
					<Panel id="ItemList">
						<For each={Object.keys(itemData.items ?? {})}>
							{(itemID) => {
								const itemsData = itemData.items ?? {};
								return <BackpackItemContent itemid={itemID} amounts={itemsData[itemID]} />;
							}}
						</For>
					</Panel>
					{/* 分割线 */}
					<Panel id="Separator" />
					{/* 价格 */}
					<Panel height="40px" flowChildren="right" >
						<Label className="LeftLabel" text="#Popup_StoreBuyItem_cost" />
						<CurrencyIcon tokenID={local.itemData.pay_type} />
						<Label className="CostLabel" text={getCost()} />
					</Panel>
					{/* 数量调整 */}
					<Panel height="40px" flowChildren="right"   >
						<Label className="LeftLabel" text="#Popup_StoreBuyItem_count" />
						<EOM_NumberAdjust value={props.buy_count ?? 1} onChange={(self, value) => {
							setCount(value);
						}} min={1} max={getMaxCount()} />
					</Panel>
				</Panel>
			</Panel>
			{/* 按钮 */}
			<Panel flowChildren="right" horizontalAlign="center" marginTop="22px">
				<EOM_Button color="Cancel" text="#Popup_Button_Cancel" onactivate={() => ClosePopup(PopupID)} />
				<EOM_Button enabled={canBuy()} marginLeft="82px" color="Gold" text="#Popup_Button_Buy" onactivate={() => buyItem()} />
			</Panel>
		</BasePopup>
	);
};
