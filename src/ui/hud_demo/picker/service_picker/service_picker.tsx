import { createMemo, createSignal, ParentComponent, Show } from "solid-js";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { EOM_Breadcrumb } from "../../../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { DemoTextEntry, FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { RecycleView } from "../../../../components/RecycleView/RecycleView";
import { StoreItemImage } from "../../../../components/StoreItem/StoreItem";
import { Pinyin } from "../../pinyin";
import "./service_picker.less";

/** 添加局外道具 */
export const ServicePicker: ParentComponent<{
}> = (props) => {
	const getServiceList = () => {
		const serviceSet = new Set<string>();
		// 稀有度总表
		for (const id of Object.keys(KeyValues.info_item_rarity)) {
			serviceSet.add(id);
		}
		// 1 货币
		for (let index = 1; index < 100; index++) {
			if (GetLocalization("11000" + index, "") != "") {
				serviceSet.add("11000" + index);
			}
		}
		// 4 藏品
		// for (const id of Object.keys(KeyValues.collection)) {
		// 	serviceSet.add(id);
		// }
		// 5 英雄
		for (const id in KeyValues.hero) {
			serviceSet.add(String(KeyValues.hero[id].hero_fragment));
		}
		// 6 信使
		for (const id of Object.keys(KeyValues.courier)) {
			serviceSet.add(id);
		}
		// 8 商店和背包
		for (const id of Object.keys(KeyValues.info_shop_product)) {
			serviceSet.add(id);
		}
		// 9 装备
		for (const id of Object.keys(KeyValues.info_item_equipment)) {
			serviceSet.add(id);
		}
		// 10 英雄武器
		for (const id of Object.keys(KeyValues.weapon)) {
			serviceSet.add(id);
		}
		// 11 技能符文
		for (const id of Object.keys(KeyValues.info_item_rune)) {
			serviceSet.add(id);
		}
		// 19 钥匙
		for (const id of Object.keys(KeyValues.info_item_key)) {
			serviceSet.add(id);
		}
		// 20 图纸
		for (const id of Object.keys(KeyValues.info_item_drawing)) {
			serviceSet.add(id);
		}

		return Array.from(serviceSet);
	};
	const getServiceToggleList = () => {
		let serviceToggleList: Record<string, string> = {
			"#PropType_All": "0",
		};
		for (const key in PropType) {
			if (typeof PropType[key] == "number") {
				serviceToggleList["#PropType_" + key] = PropType[key];
			}
		}
		return serviceToggleList;
	};
	const serviceFilter = (toggleType: string, itemName: string) => {
		if (toggleType == "") return true;
		return toggleType == GetPropType(itemName).toString();
	};
	const [itemList, setItemList] = createSignal(getServiceList());
	const toggleList = getServiceToggleList();
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const visiable = (abilityname: string) => {
		if (!serviceFilter(toggleType(), abilityname)) {
			return false;
		}
		if (filterWord() != "") {
			let regExp = new RegExp(filterWord(), "gim");
			if (abilityname.search(regExp) != -1) return true;

			let localized = GetLocalization("#" + abilityname);
			if (localized.search(regExp) != -1 || Pinyin.test(regExp, localized)) return true;

			let descLocalized = GetLocalization("#" + abilityname + "_Description");
			if (descLocalized.search(regExp) != -1 || Pinyin.test(regExp, descLocalized)) return true;

			return false;
		}
		return true;
	};
	const filteredItemList = createMemo(() => {
		return itemList()
			.filter(itemID => visiable(itemID))
			.map((itemID, index) => ({ itemID, index }));
	});
	const addItem = (itemName: string, amount: number) => {
		FireEvent("AddServiceToken", `${itemName}|${amount}`);
	};
	const [previewItemID, setPreviewItemID] = createSignal<string>();
	useClientSideEvent("RefreshDebugToolData", () => {
		setItemList([]);
		setItemList(getServiceList());
	});

	return (
		<SelectionContainer
			eventName="ServiceAddItem"
			title="添加局外道具"
			// toggleList={toggleList}
			onSearch={text => setFilterWord(text)}
			// onToggleType={text => setToggleType(text)}
			hasRawMode={false}
			hasToggleSize={false}
			width="1200px"
			height="800px"
		>
			<Panel width="100%" height="100%" margin="-6px" backgroundColor="#00000066" flowChildren="down">
				<EOM_Breadcrumb flowChildren="right-wrap" margin="10px 6px" list={Object.keys(toggleList)} onChange={(index, text) => {
					if (index == 0) {
						setToggleType("");
					} else {
						setToggleType(toggleList[text]);
					}
				}} />
				<Panel id="ItemGrid" >
					<Panel class="TitleRow">
						<Label class="RowItem" width="100px" text="ID" />
						<Label class="RowItem" width="260px" text="Name" />
						<Label class="RowItem" width="fill-parent-flow(1.2)" text="Desc" />
						<Label class="RowItem" width="100px" text="Type" />
						<Label class="RowItem" width="100px" text="Rarity" />
						<Label class="RowItem" width="200px" text="Action" />
					</Panel>
					<RecycleView id="ItemList" input={filteredItemList}
						childConfig={{ width: 1, height: 30 }}
						direction="Vertical"
	>
						{item => <Panel
							class={"ItemRow " + (item().index % 2 == 0 ? "EvenRow" : "OddRow")}
							onactivate={() => setPreviewItemID(item().itemID)}
						>
							<Label class="RowItem" width="100px" text={item().itemID} />
							<Label class="RowItem" width="260px" text={GetLocalization("#" + item().itemID, item().itemID)} />
							<Label class="RowItem" width="fill-parent-flow(1.2)" text={GetLocalization("#" + item().itemID + "_Description", "")} />
							<Label class="RowItem" width="100px" text={"#PropType_" + PropType[GetPropType(item().itemID)]} />
							<Label class="RowItem" width="100px" text={KeyValues.info_item_rarity[item().itemID]?.rarity ?? 0} />
							<Panel class="RowItem" width="200px" flowChildren="right">
								<EOM_BaseButton class="DemoButton GreenButton" onactivate={() => addItem(item().itemID, 1)} >
									<Label text="+1" />
								</EOM_BaseButton>
								<EOM_BaseButton class="DemoButton GreenButton" onactivate={() => addItem(item().itemID, 10)}>
									<Label text="+10" />
								</EOM_BaseButton>
								<EOM_BaseButton class="DemoButton GreenButton" onactivate={() => addItem(item().itemID, 100)}>
									<Label text="+100" />
								</EOM_BaseButton>
							</Panel>
						</Panel>}
					</RecycleView>
				</Panel >
				<Panel id="BottomBar">
					<Show when={previewItemID() != undefined}>
						<StoreItemImage itemid={previewItemID()!} />
						<Panel id="Detail">
							<Panel flowChildren="right">
								<Label id="Name" text={GetLocalization("#" + previewItemID(), previewItemID())} />
								<EOM_BaseButton id="Copy" onactivate={() => $.DispatchEvent("CopyStringToClipboard", GetLocalization("#" + previewItemID()!, previewItemID()), null)} >
									<Panel align="center center">
										<Panel id="Copy1" />
										<Panel id="Copy2" />
									</Panel>
								</EOM_BaseButton>
								<Label id="Name" text={`[${previewItemID()}]`} />
								<EOM_BaseButton id="Copy" onactivate={() => $.DispatchEvent("CopyStringToClipboard", previewItemID(), null)} >
									<Panel align="center center">
										<Panel id="Copy1" />
										<Panel id="Copy2" />
									</Panel>
								</EOM_BaseButton>
							</Panel>
							<Label id="Desc" text={GetLocalization("#" + previewItemID()! + "_Description", "")} />
						</Panel>
					</Show>
					<Panel id="Action">
						<Panel flowChildren="right-wrap">
							<EOM_TextEntry height="30px" margin="2px" textmode="numeric" placeholder="自定义ID" onChange={(a, b, text) => {
								if (text != "") {
									setPreviewItemID(text);
								}
							}} />
							<EOM_BaseButton width="100px" class="DemoButton GreenButton" onactivate={() => addItem(previewItemID()!, 1)} >
								<Label text="+1" />
							</EOM_BaseButton>
							<EOM_BaseButton width="100px" class="DemoButton GreenButton" onactivate={() => addItem(previewItemID()!, 10)}>
								<Label text="+10" />
							</EOM_BaseButton>
							<EOM_BaseButton width="100px" class="DemoButton GreenButton" onactivate={() => addItem(previewItemID()!, 100)}>
								<Label text="+100" />
							</EOM_BaseButton>
							<EOM_BaseButton width="100px" class="DemoButton GreenButton" onactivate={() => addItem(previewItemID()!, 1000)}>
								<Label text="+1000" />
							</EOM_BaseButton>
							<DemoTextEntry eventName="" text="自定义数量" onClick={count => addItem(previewItemID()!, toFiniteNumber(count, 1))} />
						</Panel>
					</Panel>
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};
