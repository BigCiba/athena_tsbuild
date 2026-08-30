import { Index, createEffect, createMemo, createSignal, on } from "solid-js";
import { createServiceNetData } from "../../utils/solid_utils";
import { EOM_DrawerLayout } from "../EOMDesign/Layout/EOM_DrawerLayout/EOM_DrawerLayout";
import { StoreItem, StoreItemImage } from "../StoreItem/StoreItem";
import "./ExchangeStore.less";

export const ExchangeStore = (params: {
	tag: string,
	show: boolean,
	onclose: () => void;
}) => {
	const player_shop_product_limit = createServiceNetData("player_shop_product_limits", {});

	const getStoreItemData = () => {
		const list: StoreItemData[] = [];
		const now = CustomUIConfig.GetServerTimeStamp();
		for (const itemname in KeyValues.info_shop_product) {
			const itemdata = KeyValues.info_shop_product[itemname];
			if ((itemdata.start_time < now || itemdata.start_time == 0) && (itemdata.end_time > now || itemdata.end_time == 0)) {
				const tags = itemdata.tag.split("|");
				tags.forEach((tag) => {
					if (tag == params.tag) {
						list.push(itemdata);
					}
				});
			}
		}
		return list;
	};
	const [storeItemData, setStoreItemData] = createSignal(getStoreItemData());
	const [plusPreviewID, setPlusPreviewID] = createSignal(storeItemData()[0]?.id ?? -1);
	createEffect(on(() => params.show, (v) => {
		if (params.show == true) {
			const data = getStoreItemData();
			setStoreItemData(data);
			setPlusPreviewID(data[0]?.id ?? -1);
		}
	}));
	const previewItemID = createMemo(() => {
		const productID = plusPreviewID();
		if (productID == -1) return;
		const productData = KeyValues.info_shop_product[productID];
		return Object.keys(productData?.items ?? {})[0] ?? productID;
	});
	const previewItemLocalizeKey = () => {
		const itemID = previewItemID();
		return itemID == undefined ? "" : "#" + itemID;
	};
	const previewItemDescriptionKey = () => {
		const itemID = previewItemID();
		return itemID == undefined ? "" : "#" + itemID + "_description";
	};
	return (
		<Panel id="ExchangeStore" classList={{ showPlusPreview: params.show }} hittest={params.show} onactivate={() => { }}>
			<Panel id="TitleBG" hittest={false} visible={params.show} />
			<Panel id="BG" hittest={false} />
			<DOTAParticleScenePanel id="LightParticle" particleName="particles/ui/game/ui_game_signin_04.vpcf" particleonly cameraOrigin="0 0 600" fov={90} lookAt="0 0 0" hittest={false} squarePixels />
			<DOTAParticleScenePanel id="BgParticle" particleName="particles/ui/game/ui_game_signin_05.vpcf" particleonly cameraOrigin="0 0 400" fov={90} lookAt="0 0 0" hittest={false} squarePixels />

			<EOM_DrawerLayout id="PlusRewards" title={"#" + params.tag} show={params.show}
				onclose={() => params.onclose()}
			>
				<Panel id="PlusItemList" scroll="y" class="VerticalScrollStyle">
					<Index each={storeItemData().sort((a, b) => b.orderby - a.orderby)}>
						{(data, index) =>
							<Panel onmouseover={() => setPlusPreviewID(data().id)}>
								<StoreItem itemid={data().id} purchased_num={player_shop_product_limit()[data().id]} />
							</Panel>
						}
					</Index>
				</Panel>
			</EOM_DrawerLayout>
			<Panel id="RewardPreview">
				{createMemo(() => {
					let id = previewItemID();
					if (id == undefined) return;
					return <StoreItemImage itemid={id} />;
				})}
				<Panel id="PreviewDesc">
					<Label id="Name" text={previewItemLocalizeKey()} html />
					<Panel id="Line" />
					<Label id="Access" text={previewItemDescriptionKey()} html />
				</Panel>
			</Panel>
		</Panel>
	);
};
