import { Index, createMemo } from "solid-js";
import { createGlobalServiceNetData, createPlayerNetDataSignal, createServiceNetData } from "../../utils/solid_utils";
import { EOM_MenuLayout_Content } from "../EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { StoreItem } from "../StoreItem/StoreItem";
import "./StoreTagPage.less";

export type StoreProductData = (typeof KeyValues.info_shop_product)[keyof typeof KeyValues.info_shop_product];

function isActiveTime(startTime: number, endTime: number, now: number) {
	return (startTime < now || startTime == 0) && (endTime > now || endTime == 0);
}

export function getStoreTagItems(tag: string, infoProducts: NetDataDeclarations["info_products"]): StoreProductData[] {
	const result: StoreProductData[] = [];
	const now = Date.now() / 1000;

	for (const itemName in KeyValues.info_shop_product) {
		const itemData = KeyValues.info_shop_product[itemName];
		if (itemData.hide_time && itemData.hide_time <= now) {
			continue;
		}

		const tags = String(itemData.tag ?? "").split("|");
		if (!tags.includes(tag) || itemData.hide != 0) {
			continue;
		}

		const infoProduct = infoProducts[itemData.id];
		if (isActiveTime(itemData.start_time, itemData.end_time, now)
			|| infoProduct != undefined && isActiveTime(infoProduct.start_time, infoProduct.end_time, now)) {
			result.push(itemData);
		}
	}

	return result.sort((a, b) => b.orderby - a.orderby);
}

export function sortStoreTagItems(items: StoreProductData[], purchasedProducts: NetDataDeclarations["player_shop_product_limits"]) {
	return [...items].sort((a, b) => {
		const aLimited = a.limit_type != 0 && (purchasedProducts[a.id] ?? 0) >= a.limit_count;
		const bLimited = b.limit_type != 0 && (purchasedProducts[b.id] ?? 0) >= b.limit_count;
		if (aLimited !== bLimited) return aLimited ? 1 : -1;
		return b.orderby - a.orderby;
	});
}

export function hasFreeStoreTagItem(
	items: StoreProductData[],
	purchasedProducts: NetDataDeclarations["player_shop_product_limits"],
	playerPrivileges: Record<string, boolean>
) {
	const language = Language();
	return items.some(itemData => {
		const purchased = purchasedProducts[itemData.id] ?? 0;
		const limited = itemData.limit_type != 0 && purchased >= itemData.limit_count;
		if (limited || !HasStorePrivilege(itemData.effect_condition, playerPrivileges)) {
			return false;
		}

		let price = itemData.real_price;
		if (itemData.pay_type == 0) {
			if (language == "english") {
				price = itemData.overseas_realprice;
			} else if (language == "russian") {
				price = itemData.russia_realprice;
			}
		}
		return price == 0;
	});
}

export function StoreTagPage(props: { tag: string; id?: string; show?: boolean; }) {
	const infoProducts = createGlobalServiceNetData("info_products", {});
	const purchasedProducts = createServiceNetData("player_shop_product_limits", {});
	const storeItems = createMemo(() => sortStoreTagItems(getStoreTagItems(props.tag, infoProducts()), purchasedProducts()));

	return <EOM_MenuLayout_Content id={props.id ?? props.tag} show={props.show}>
		<Panel class="StoreTagPageList VerticalScrollStyle" scroll="y">
			<Index each={storeItems()}>
				{data => {
					const infoProduct = () => infoProducts()[data().id];
					return <StoreItem
						itemid={data().id}
						purchased_num={purchasedProducts()[data().id]}
						startTime={infoProduct()?.start_time}
						endTime={infoProduct()?.end_time}
					/>;
				}}
			</Index>
		</Panel>
	</EOM_MenuLayout_Content>;
}

export function createStoreTagRedPointData(tag: string) {
	const infoProducts = createGlobalServiceNetData("info_products", {});
	const purchasedProducts = createServiceNetData("player_shop_product_limits", {});
	const playerPrivileges = createPlayerNetDataSignal("common", "player_privileges", {});
	const items = createMemo(() => getStoreTagItems(tag, infoProducts()));

	return () => hasFreeStoreTagItem(items(), purchasedProducts(), playerPrivileges());
}
