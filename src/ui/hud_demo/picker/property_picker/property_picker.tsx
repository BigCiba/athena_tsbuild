import { createSignal, For, onCleanup, onMount, ParentComponent } from "solid-js";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { EOM_ToggleButton } from "../../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { Pinyin } from "../../pinyin";
import "./property_picker.less";


/** 局外道具选择 */
export const PropertyPicker: ParentComponent = () => {
	let panel: Panel | undefined;
	const eventName = "AddAttribute";
	const title = "添加属性";
	const getPropertyList = () => {
		return PROPERTY_LIST;
	};
	const [itemList, setItemList] = createSignal(getPropertyList());
	const [filterWord, setFilterWord] = createSignal("");
	const [addValueMap, setAddValueMap] = createSignal<Record<string, string>>({});
	const [currentValueMap, setCurrentValueMap] = createSignal<Record<string, string>>({});
	const [useCurrentUnit, setUseCurrentUnit] = createSignal(true);
	const [customEntIndexText, setCustomEntIndexText] = createSignal("");
	const [isMousePickingUnit, setIsMousePickingUnit] = createSignal(false);
	let wasLeftMouseDown = false;
	let waitLeftReleaseAfterStart = false;
	const syncCurrentUnitIndexText = () => {
		const entIndex = Players.GetLocalPlayerPortraitUnit();
		if (entIndex !== -1) {
			setCustomEntIndexText(String(entIndex));
		}
	};
	const visiable = (itemName: string) => {
		if (filterWord() != "") {
			let regExp = new RegExp(filterWord(), "gim");
			if (itemName.search(regExp) != -1) return true;

			let localized = GetLocalization("#property_" + itemName);
			if (localized.search(regExp) != -1 || Pinyin.test(regExp, localized)) return true;

			let descLocalized = GetLocalization("#property_" + itemName + "_Description");
			if (descLocalized.search(regExp) != -1 || Pinyin.test(regExp, descLocalized)) return true;

			return false;
		}
		return true;
	};
	const getAddValue = (itemName: string) => {
		return toFiniteNumber(addValueMap()[itemName], 1);
	};
	const submitAddValue = (itemName: string) => {
		FireEvent(eventName, `${itemName}|${getAddValue(itemName)}`);
	};
	const getTargetEntIndex = () => {
		if (useCurrentUnit()) {
			return Players.GetLocalPlayerPortraitUnit();
		}
		return toFiniteNumber(customEntIndexText(), -1) as EntityIndex;
	};
	const refreshCurrentValueMap = () => {
		const entIndex = getTargetEntIndex();
		const nextMap: Record<string, string> = {};
		const list = itemList();
		for (let i = 0; i < list.length; i++) {
			const propName = list[i];
			if (entIndex === -1 || entIndex === undefined) {
				nextMap[propName] = "0";
			} else {
				nextMap[propName] = String(Entities.GetPropertyValue(entIndex, propName));
			}
		}
		setCurrentValueMap(nextMap);
	};
	const pickUnitByMouse = () => {
		if (!isMousePickingUnit()) {
			wasLeftMouseDown = false;
			return;
		}

		const isLeftMouseDown = GameUI.IsMouseDown(0);
		if (waitLeftReleaseAfterStart) {
			if (isLeftMouseDown === false) {
				waitLeftReleaseAfterStart = false;
			}
			wasLeftMouseDown = isLeftMouseDown;
			return;
		}

		if (isLeftMouseDown === true && wasLeftMouseDown === false) {
			setIsMousePickingUnit(false);
			wasLeftMouseDown = isLeftMouseDown;
			return;
		}
		wasLeftMouseDown = isLeftMouseDown;

		const entIndex = GetCursorEntity();
		if (entIndex !== -1) {
			const nextText = String(entIndex);
			if (customEntIndexText() !== nextText) {
				setCustomEntIndexText(nextText);
				refreshCurrentValueMap();
			}
		}
	};

	useClientSideEvent("RefreshDebugToolData", () => {
		setItemList([]);
		setItemList(getPropertyList());
		refreshCurrentValueMap();
	});

	const Update = () => {
		if (panel?.FindAncestor("AddAttribute")?.BHasClass("Show") !== true) {
			return;
		}
		const entIndex = Players.GetLocalPlayerPortraitUnit();
		if (entIndex != -1 && useCurrentUnit()) {
			syncCurrentUnitIndexText();
		}
		refreshCurrentValueMap();
	};
	onMount(() => {
		syncCurrentUnitIndexText();
		refreshCurrentValueMap();
		const timer = setInterval(Update, 1000);
		const pickTimer = setInterval(pickUnitByMouse, 100);
		onCleanup(() => {
			clearInterval(timer);
			clearInterval(pickTimer);
		});
	});
	return (
		<SelectionContainer
			eventName={eventName}
			title={title}
			onSearch={text => setFilterWord(text)}
			hasFilter={true}
			hasRawMode={false}
			hasToggleSize={false}
			width="1000px"
			height="800px"
		>
			<Panel id="ItemGrid" ref={panel}>
				<Panel class="ControlRow">
					<EOM_ToggleButton verticalAlign="center" selected={useCurrentUnit()} text="当前单位" onchange={(p, checked) => {
						setUseCurrentUnit(checked);
						if (checked) {
							syncCurrentUnitIndexText();
						}
						refreshCurrentValueMap();
					}} />
					<Label class="ControlDivider" verticalAlign="center" text="|" />
					<EOM_TextEntry
						width="220px"
						height="30px"
						text={customEntIndexText()}
						textmode="numeric"
						enabled={!useCurrentUnit()}
						placeholder="输入实体Index"
						verticalAlign="center"
						onChange={(self, prev, text) => {
							setCustomEntIndexText(text);
							refreshCurrentValueMap();
						}}
					/>
					<EOM_BaseButton marginLeft="8px" tooltip="鼠标选取查找单位" verticalAlign="center" washColor={isMousePickingUnit() ? "White" : "LightGrey"} onactivate={() => {
						const nextPicking = !isMousePickingUnit();
						setIsMousePickingUnit(nextPicking);
						if (nextPicking) {
							setUseCurrentUnit(false);
							waitLeftReleaseAfterStart = true;
							wasLeftMouseDown = GameUI.IsMouseDown(0);
							pickUnitByMouse();
						} else {
							waitLeftReleaseAfterStart = false;
						}
					}}>
						<Image src="s2r://panorama/images/control_icons/24px/unusual.vsvg" />
					</EOM_BaseButton>
					{isMousePickingUnit() ? <Label class="PickingStateText" verticalAlign="center" text="检索中" /> : undefined}
					{/* <EOM_BaseButton class="DemoButton GreenButton" onactivate={() => { }}>
						<Label text="刷新属性" />
					</EOM_BaseButton> */}
				</Panel>
				<Panel class="TitleRow">
					<Label class="RowItem" width="360px" text="ID" />
					<Label class="RowItem" width="fill-parent-flow(1.5)" text="描述" />
					<Label class="RowItem" width="100px" text="当前数值" />
					<Label class="RowItem" width="220px" text="添加数值" />
				</Panel>
				<Panel id="ItemList" scroll="y">
					<For each={itemList()}>
						{(propName, index) => {
							return <Panel
								class={"ItemRow " + (index() % 2 == 0 ? "EvenRow" : "OddRow") + (visiable(propName) ? "" : " Hide")}
								customTooltip={{ name: "feature_tags", tags: GetTagsFromString($.Localize("#property_" + propName, $.GetContextPanel())).join("|") }}
							>
								<Label class="RowItem" width="360px" html text={propName} />
								<Label class="RowItem" width="fill-parent-flow(1.5)" html text={GetLocalization("property_" + propName)} />
								<Label class="RowItem" width="100px" text={currentValueMap()[propName] ?? "0"} />
								<Panel class="RowItem" width="220px" flowChildren="right">
									<EOM_TextEntry
										width="140px"
										height="30px"
										margin="0px 6px 0px 0px"
										text={addValueMap()[propName] ?? "1"}
										textmode="numeric"
										onChange={(self, prev, text) => {
											setAddValueMap(prevMap => ({ ...prevMap, [propName]: text }));
										}}
										oninputsubmit={() => submitAddValue(propName)}
									/>
									<EOM_BaseButton class="DemoButton GreenButton" onactivate={() => submitAddValue(propName)}>
										<Label text="添加" />
									</EOM_BaseButton>
								</Panel>
							</Panel>;
						}}
					</For>
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};