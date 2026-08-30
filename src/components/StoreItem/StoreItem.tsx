import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, ParentProps, Show, splitProps } from "solid-js";
import { createServiceNetData } from "../../utils/solid_utils";
import { EOM_ImageNumber } from "../EOMDesign/DataDisplay/EOM_ImageNumber/EOM_ImageNumber";
import { EOM_Button } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import { CurrencyIcon } from "../Player/Player";
import "./storeItem.less";

/** 商城商品，多个物品的组合包 */
export const StoreItem = (props: { itemid: number, purchased_num?: number, hasItem?: boolean, enable?: boolean, btnDisable?: boolean; priceBtnHide?: boolean; }) => {
	const language = $.Language().toLowerCase();
	const itemData = () => KeyValues.info_shop_product[props.itemid];
	const player_ornament = createServiceNetData("player_ornament", {});
	const player_couriers = createServiceNetData("player_couriers", {});
	let purchased_num = createMemo(() => {
		let data = itemData();
		let items = data.items ?? {};
		let itemList = Object.keys(items);
		let purchased_num = props.purchased_num ?? 0;
		let star = 0;
		itemList.map(item_id => {
			if (player_couriers()[item_id]) {
				star += (player_couriers()[item_id]?.star ?? 0) + (player_couriers()[item_id]?.extra_star_exp ?? 0);
			}
		});
		if (star > 0) {
			return star;
		}
		return purchased_num;
	});

	const memoData = createMemo(() => {
		let data = itemData();
		let price = data.real_price;
		let origin_price = data.origin_price;
		if (data.pay_type == 0) {
			if (language == "english") {
				price = data.overseas_realprice;
				origin_price = data.overseas_originprice;
			} else if (language == "russian") {
				price = data.russia_realprice;
				origin_price = data.russia_originprice;
			}
		}

		let items = data.items ?? {};
		let itemList = Object.keys(items);
		let itemCount = itemList.length == 1 ? (items[itemList[0]] ?? 1) : 1;
		let limited = data.limit_type > 0 && purchased_num() >= data.limit_count;
		let now = Math.floor(Date.now() / 1000);
		// let buffCondition = player_buff()[data.buff_condition];
		let buffCondition;
		// let hasBuffCondition = buffCondition != undefined && (buffCondition.permanent == true || (now < buffCondition.expire_time && buffCondition.expire_time != -1));
		let hasBuffCondition = false;
		let hasBundleBuff = false;
		let hasCosmetic = itemList.some(item_id => player_ornament()[item_id] != undefined);
		return { price, origin_price, itemCount, limited, hasBuffCondition, hasBundleBuff, hasCosmetic };
	});
	let freeLabel = createMemo(() => {
		// if (memoData().limited) {
		// 	return "#mail_receive";
		// }
		// if (itemData().buff_condition != 0 && !memoData().hasBuffCondition) {
		// 	return "#Store_Buff" + itemData().buff_condition;
		// }
		return "#Store_Free_Button";
	});
	let limitLabel = createMemo(() => {
		if (memoData().hasBundleBuff && !memoData().limited) {
			return "#Store_HasBuff";
		}
		if (memoData().hasCosmetic && !memoData().limited) {
			return "#Store_HasCosmetic";
		}
		return "#Store_LimitCount" + itemData().limit_type;
	});
	let buyLimit = createMemo(() => {
		return itemData().limit_type != 0 && purchased_num() >= itemData().limit_count;
	});
	let customTooltip = createMemo(() => {
		if (itemData().show_type == 1) {
			return { name: "privilege_preview", buff_id: String(Object.keys(itemData().items)[0]) };
		}
		if (Object.keys(itemData().items).length > 1) {
			return { name: "bundle_preview", item_list: JSON.stringify(itemData().items) };
		}
	});

	const src = createMemo(() => {
		let imgName = props.itemid.toString();
		if (itemData().img != undefined && itemData().img != "") {
			imgName = itemData().img;
		}
		return getSrcPath("store_items/" + imgName + ".png");
	});

	const merged = mergeProps({
		enable: true,
		btnDisable: false,
	}, props);
	return <Panel
		class={classNames(
			"StoreItemMain",
			{
				"Free": memoData().price == 0,
				"Limit": memoData().limited,
				"purchased": props.purchased_num,
				"HasBoundleBuff": memoData().hasBundleBuff
			}
		)}
		enabled={merged.enable}
		customTooltip={customTooltip()}
	>
		<Panel class={classNames(
			"StoreItem",
			"Rarity" + itemData().rarity,
		)} >
			<Label id="ItemName" text={"#" + props.itemid} />
			<Image id="SplitLine" />
			<Image id="ItemImage" src={src()} scaling="stretch-to-cover-preserve-aspect" />
			<Label id="ItemCount" text={"×" + memoData().itemCount} visible={memoData().itemCount > 1} />
			<Panel id="LimitInfo" visible={itemData().limit_type != 0}>
				<Label text={limitLabel()} vars={{ num: purchased_num(), max: itemData().limit_count }} html />
			</Panel>
			<Label id="FirstPayDesc" visible={itemData().first_pay == 1 && (props.purchased_num ?? 0) == 0} text={"#" + props.itemid + "_first_pay"} />
		</Panel>
		<Panel id="DiscountNum" visible={itemData().discount != 0}>
			<Panel class="Rotate15">
				<EOM_ImageNumber value={itemData().discount} type="7" percentSign={true} />
				<Panel id="OffSign" />
			</Panel>
		</Panel>
		<Image id="FirstPayLabel" visible={itemData().first_pay == 1 && (props.purchased_num ?? 0) == 0} />
		<Show when={!props.priceBtnHide}>
			<EOM_Button id="PriceBtn" enabled={!buyLimit() && (props.enable ?? true)}
				onactivate={() => {
					let { limited, price } = memoData();
					if (limited || merged.btnDisable) {
						return;
					}
					if (memoData().hasBundleBuff) {
						return "#Store_HasBuff";
					}
					if (memoData().hasCosmetic) {
						return "#Store_HasCosmetic";
					}
					Game.EmitSound("UI.Store.Click");
					ShowPopup("StoreBuyItem", { itemData: itemData(), purchased_num: props.purchased_num, group: "StoreBuyItem" });
				}}
			>
				<Show when={!buyLimit()} fallback={<Label text={"已销售"} />}>
					<Panel id="PriceDisplay" align="center center" flowChildren="right">
						<Panel id="CurrentPrice" horizontalAlign="center" flowChildren="right">
							<CurrencyIcon tokenID={itemData().pay_type} />
							<Label id="CostLabel" text={memoData().price} />
						</Panel>
						<Label id="CostOriginPriceLabel" visible={memoData().price != memoData().origin_price} text={memoData().origin_price} />
					</Panel>
					<Label id="FreeLabel" text={freeLabel()} />
				</Show>
			</EOM_Button>
		</Show>
		<Image id="RedPoint" visible={memoData().price == 0 && !memoData().limited} />
	</Panel>;
};

interface StoreItemImageProps {
	itemid: number | string;
	equip_id?: number | string;
	src?: string;
}
export const StoreItemImage: ParentComponent<ImageAttributes & StoreItemImageProps> = (props) => {
	const player_collections = createServiceNetData("player_collections", {});
	const merged = mergeProps(props, { class: "StoreItemImage" });
	const [local, other] = splitProps(merged, ["itemid", "equip_id", "src"]);
	const src = createMemo(() => {
		return local.src ?? getSrcPath("store_items/" + local.itemid + ".png");
	});
	const tooltipText = createMemo(() => {
		const collectionID = String(local.itemid);
		const collectionData = KeyValues.collection[collectionID];
		if (collectionData == undefined) {
			return GetLocalization(props.itemid + "_description");
		}

		const currentLevel = player_collections()[collectionID]?.level ?? 0;
		if (currentLevel <= 0) {
			return "#Store_NotObtained";
		}
		return Object.entries(collectionData.attribute ?? {}).map(([attribute, value]) => {
			const totalValue = Math.round(Number(value) * currentLevel * 10000) / 10000;
			return GetPropertyLocalization(attribute, totalValue);
		}).join("<br>");
	});
	return <Image {...other} src={src()} customTooltip={{
		name: "title_image_text",
		title: GetLocalization(String(props.itemid)),
		image: getSrcPath("store_items/" + props.itemid + ".png"),
		text: tooltipText()
	}} />;
};

interface StoreItemCommonProp {
	item_id: string | number,
	amounts?: number,
	rarity?: number,
}

/** 局外物品(方块) */
export function StoreItemBlock(props: ParentProps<PanelAttributes & StoreItemCommonProp>) {
	const rarity = () => 1
	const merged = mergeProps(props, { class: classNames("StoreItemBlock", "Rarity" + rarity()) });
	const [local, others] = splitProps(merged, ["item_id", "amounts", "rarity"]);
	return (
		<Panel {...others}>
			<StoreItemImage itemid={props.item_id} />
			<Show when={props.amounts}>
				<Label id="ItemCount" hittest={false} text={"×" + props.amounts} />
			</Show>
			{props.children}
		</Panel>
	);
}