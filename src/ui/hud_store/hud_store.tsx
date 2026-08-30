import { render } from "@bigciba/solid-panorama-runtime";
import { createEffect, createMemo, createSignal, Match, on, onCleanup, onMount, Switch } from "solid-js";
import { createMenuLayout, EOM_MenuLayout, EOM_MenuLayout_Content } from "../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { CurrencyGroup } from "../../components/Player/Player";
import { StoreTagPage } from "../../components/StoreTagPage/StoreTagPage";
import { createGlobalServiceNetData, createServiceNetData } from "../../utils/solid_utils";
import { CollectionTreasure } from "./collection_treasure/collection_treasure";
import { CollectionVip } from "./collection_vip/collection_vip";
import { SeaMystery } from "./SeaMystery/SeaMystery";
import { SeaMysteryTask } from "./SeaMysteryTask/SeaMysteryTask";
import { StorePrivilege } from "./store_privilege/store_privilege";

type StoreProductData = (typeof KeyValues.info_shop_product)[keyof typeof KeyValues.info_shop_product];

interface StoreItemDataAttribute {
	[tag: string]: StoreProductData[];
}
// 常驻：商品时间戳、directly_purchase、跳转指定特权商品需要在页面隐藏时继续可用。
// 后端获取的商品时间戳
const info_products = createGlobalServiceNetData("info_products", {});
const getStoreItemData = () => {
	let result: StoreItemDataAttribute = {
		//Recommend: [],
	};
	const now = Date.now() / 1000;
	for (const itemname in KeyValues.info_shop_product) {
		const itemdata = KeyValues.info_shop_product[itemname];
		const info_product = info_products()[itemdata.id];
		const effective_start_time = info_product ? info_product.start_time : itemdata.start_time;
		const effective_end_time = info_product ? info_product.end_time : itemdata.end_time;
		if (
			(effective_start_time < now || effective_start_time == 0) &&
			(effective_end_time > now || effective_end_time == 0) &&
			(itemdata.hide_time > now || !itemdata.hide_time) &&
			itemdata.hide == 0 || itemdata.tag == "Privilege"
		) {
			const tags = itemdata.tag.split("|");
			tags.forEach((tag) => {
				result[tag] = result[tag] || [];
				//@ts-ignore
				result[tag].push(itemdata);
			});
		}
	}
	return result;
};

const [storeItemData, setStoreItemData] = createSignal(getStoreItemData());
const purchased_product = createServiceNetData("player_shop_product_limits", {});
const open_store = createServiceNetData("open_shop", { value: false });
const [targetPrivilegeItem, setTargetPrivilegeItem] = createSignal<{ itemid: number, key: number; }>();
let targetPrivilegeItemKey = 0;

const separatedStoreTags = new Set(["Fish", "Explore", "Flowers", "StarStone", "BoardSlotGift", "BoardSlot", "MiningGift", "Mining"]);
const staticStoreMenus = ["collection_vip", "collection_treasure"];
const seaMysteryPoolID = "3001";
const hasSeaMysteryPool = () => KeyValues.drawcards[seaMysteryPoolID] != undefined;
const storeMenuOrder = ["Privilege", "Hot", "Gift", "Resource", "collection_vip", "collection_treasure", "Moon", "Universe"];
const getStoreMenuOrder = (tag: string) => {
	const order = storeMenuOrder.indexOf(tag);
	return order == -1 ? storeMenuOrder.length : order;
};
const menuKeys = createMemo(() => Array.from(new Set([
	...Object.keys(storeItemData()).filter(tag => !separatedStoreTags.has(tag)),
	...staticStoreMenus,
	...(hasSeaMysteryPool() ? ["Universe"] : []),
])).sort((a, b) => getStoreMenuOrder(a) - getStoreMenuOrder(b)));
const menuList = createMemo(() => {
	const list: Record<string, string[]> = {};
	for (const tag of menuKeys()) {
		list[tag] = [];
	}
	if (hasSeaMysteryPool()) {
		list.Universe = ["SeaMysteryTurntable", "SeaMysteryTask"];
	}
	return list;
}, {}, {
	equals: (a, b) => {
		let aKeys = Object.keys(a);
		let bKeys = Object.keys(b);
		if (aKeys.length != bKeys.length) return false;
		for (let i = 0; i < aKeys.length; i++) {
			if (aKeys[i] != bKeys[i]) return false;
			let key = aKeys[i];
			if (a[key].length != b[key].length) return false;
			for (let j = 0; j < a[key].length; j++) {
				if (a[key][j] != b[key][j]) return false;
			}
		}
		return true;
	}
});
const { LayoutMenu, show, setShow, menuName, secondTabName: menu2Name, setMenuName, setSecondTabName } = createMenuLayout("store", menuList);
createEffect(on([show, info_products], ([isShown]) => {
	if (isShown) {
		setStoreItemData(getStoreItemData());
	}
}));


onMount(() => {
	let gameEventIDList: GameEventListenerID[] = [];
	gameEventIDList.push(useClientSideEvent("store_jump_to_privilege_item", (event) => {
		const itemid = Number(event.itemid);
		if (!itemid) {
			return;
		}
		setTargetPrivilegeItem({ itemid, key: targetPrivilegeItemKey++ });
		JumpToMenu({ window_name: "store", menu: "Privilege", force: true });
	}));
	// 直接弹出指定商品id的购买窗口
	gameEventIDList.push(useClientSideEvent("directly_purchase", (event) => {
		if (!open_store().value) {
			return;
		}
		if (event.itemid) {
			let hasFind = false;
			const now = Date.now() / 1000;
			for (const itemname in KeyValues.info_shop_product) {
				const itemData = KeyValues.info_shop_product[itemname];
				const info_product = info_products()[itemData.id];
				const effective_start_time = info_product ? info_product.start_time : itemData.start_time;
				const effective_end_time = info_product ? info_product.end_time : itemData.end_time;
				if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0)) {
					if (event.itemid == itemData.id) {
						hasFind = true;
						ShowPopup("StoreBuyItem", {
							itemData,
							purchased_num: purchased_product()[event.itemid],
							group: "StoreBuyItem",
							buy_count: event.buy_count,
						});
						// 商品来源打点
						if (event.source != undefined) {
							GameUI.CustomUIConfig().ReportClick("product|" + itemData.id, event.source + "|click");
						}
						break;
					}
				}
				if (hasFind) {
					break;
				}
			}
		}
	}));

	onCleanup(() => {
		for (const id of gameEventIDList) {
			GameEvents.Unsubscribe(id);
		}
	});
});

function Store() {
	const playerTokens = createServiceNetData("player_tokens", {});
	const [seaMysteryCurrencyValues, setSeaMysteryCurrencyValues] = createSignal<Partial<Record<number, number>>>();
	// 获取tokens列表
	const tokenIDs = createMemo(() => {
		if (menuName() == "Active") {
			return [110001, 110005];
		}
		if (menuName() == "StarseaShop") {
			return [110001, 110007];
		}
		if (menuName() == "Universe") {
			if (menu2Name() == "SeaMysteryTurntable") {
				return [110016, 110015];
			} else {
				return [110001, 110015];
			}
		}
		return [110001, 110002];
	});
	const setSeaMysteryDrawing = (drawing: boolean) => {
		if (!drawing) {
			setSeaMysteryCurrencyValues();
			return;
		}
		setSeaMysteryCurrencyValues(Object.fromEntries(tokenIDs().map(tokenID => [tokenID, playerTokens()[tokenID]?.amounts ?? 0])));
	};
	return <EOM_MenuLayout renderOnShow id="StoreMain" show={show()} className={`${menuName()} ${menu2Name()}`} name="MenuButton_store">
		<Image id="StoreBG" class={"StoreTab" + menuName() + (menu2Name() ?? "")} />
		<LayoutMenu />
		<CurrencyGroup tokens={tokenIDs()} values={seaMysteryCurrencyValues()} exchangeButton recentOrder />
		<Switch>
			<Match when={menuName() == "Privilege"}>
				<EOM_MenuLayout_Content id="Privilege" show={true} topbarChildren={
					<Panel id="BGRoot">
						<DOTAParticleScenePanel id="BGLight" particleName="particles/ui/game/ui_game_general_special_effects_04_2_fx.vpcf" cameraOrigin="0 0 700" fov={90} lookAt="0 0 0" hittest={false} squarePixels />
					</Panel>
				}>
					<StorePrivilege datas={storeItemData()["Privilege"] ?? []} targetItem={targetPrivilegeItem()} />
				</EOM_MenuLayout_Content>
			</Match>
			<Match when={menuName() == "collection_vip"}>
				<CollectionVip show={true} />
			</Match>
			<Match when={menuName() == "collection_treasure"}>
				<CollectionTreasure show={true} />
			</Match>
			<Match when={menuName() == "Universe"}>
				<Switch fallback={<SeaMystery itemList={Array.from(storeItemData()["Universe"] ?? []).sort((a, b) => b.orderby - a.orderby)} poolID={Number(seaMysteryPoolID)} onDrawStateChange={setSeaMysteryDrawing} />}>
					<Match when={menu2Name() == "SeaMysteryTask"}>
						<SeaMysteryTask activityID={901} />
					</Match>
				</Switch>
			</Match>
			<Match when={true}>
				<StoreTagPage tag={menuName()} id={menuName()} show={true} />
			</Match>
		</Switch>
	</EOM_MenuLayout>;
}

render(() => <Store />, $.GetContextPanel());

/* 获取客户端地区 */
if (!CustomUIConfig.__LocalISOCode) {
	let steamid = Game.GetLocalPlayerInfo().player_steamid;
	let uid = Steam_64_3(steamid);
	if (uid == "NaN") uid = "0";

	const sCommand = "iso_code_result_" + Math.floor(Date.now() / 1000);
	Game.AddCommand(sCommand, (_, code) => {
		CustomUIConfig.__LocalISOCode = code;
	}, "", 67108864);

	ClientRequest("get_iso_code", {
		uid,
		response_key: sCommand
	});
}
