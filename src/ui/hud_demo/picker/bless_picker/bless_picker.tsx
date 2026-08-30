import { render } from "@bigciba/solid-panorama-runtime";
import { createMemo, createSignal, For, ParentComponent, Show } from "solid-js";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Switch } from "../../../../components/EOMDesign/Input/EOM_Switch/EOM_Switch";
import { EOM_ToggleButton } from "../../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { SectIcon } from "../../../../components/abilities/SectIcon/SectIcon";
import { CommonBox } from "../../../../components/abilities/common/common_box";
import { CommonItem } from "../../../../components/abilities/common/common_item";
import { Pinyin } from "../../pinyin";
import "./bless_picker.less";

/** 添加祝福 */
export const BlessPicker: ParentComponent<{
}> = (props) => {
	const parsePipeField = (value: unknown) => {
		if (value === undefined || value === null || value === "") {
			return [] as string[];
		}
		if (Array.isArray(value)) {
			const list: string[] = [];
			for (let i = 0; i < value.length; i++) {
				const text = String(value[i]).trim();
				if (text !== "") {
					list.push(text);
				}
			}
			return list;
		}
		if (typeof value === "object") {
			const list: string[] = [];
			for (const key in value as Record<string, unknown>) {
				const text = String((value as Record<string, unknown>)[key]).trim();
				if (text !== "") {
					list.push(text);
				}
			}
			return list;
		}
		const text = String(value);
		const all = text.split("|");
		const result: string[] = [];
		for (let i = 0; i < all.length; i++) {
			const item = all[i].trim();
			if (item !== "") {
				result.push(item);
			}
		}
		return result;
	};

	const getItemList = () => {
		return Object.keys(KeyValues.bless);
	};
	const toggleList = createMemo(() => {
		let toggleList: Record<string, string> = {};
		for (const itemName in KeyValues.bless) {
			const itemData = KeyValues.bless[itemName];
			if (itemData.Suit == undefined) continue;
			const suitList = parsePipeField(itemData.Suit);
			suitList.forEach(suit => toggleList[suit] = GetLocalization("#Bless_" + suit));
		}
		return toggleList;
	});
	const [itemList, setItemList] = createSignal(getItemList());
	const [filterWord, setFilterWord] = createSignal("");
	const [selectedSuits, setSelectedSuits] = createSignal<Record<string, boolean>>((() => {
		const initial: Record<string, boolean> = {};
		const allSuitKeys = Object.keys(toggleList());
		for (let i = 0; i < allSuitKeys.length; i++) {
			initial[allSuitKeys[i]] = true;
		}
		return initial;
	})());
	const hasSelectedSuit = () => Object.keys(selectedSuits()).length > 0;
	const getBlessSuits = (itemName: string) => {
		const suitText = KeyValues.bless[itemName]?.Suit;
		return parsePipeField(suitText);
	};
	const suitMatched = (itemName: string) => {
		if (!hasSelectedSuit()) {
			return true;
		}
		const suitList = getBlessSuits(itemName);
		for (let i = 0; i < suitList.length; i++) {
			if (selectedSuits()[suitList[i]] === true) {
				return true;
			}
		}
		return false;
	};
	const toggleAll = (check: boolean) => {
		if (!check) {
			setSelectedSuits({});
			return;
		}
		const next: Record<string, boolean> = {};
		const allSuitKeys = Object.keys(toggleList());
		for (let i = 0; i < allSuitKeys.length; i++) {
			next[allSuitKeys[i]] = true;
		}
		setSelectedSuits(next);
	};
	const toggleInvert = () => {
		const next: Record<string, boolean> = {};
		const allSuitKeys = Object.keys(toggleList());
		for (let i = 0; i < allSuitKeys.length; i++) {
			const suit = allSuitKeys[i];
			if (selectedSuits()[suit] !== true) {
				next[suit] = true;
			}
		}
		setSelectedSuits(next);
	};
	const visiable = (abilityname: string) => {
		if (!suitMatched(abilityname)) {
			return false;
		}
		if (filterWord() != "") {
			let regExp = new RegExp(filterWord(), "gim");
			if (abilityname.search(regExp) != -1) return true;

			let localized = GetLocalization("#DOTA_Tooltip_ability_" + abilityname);
			if (localized.search(regExp) != -1 || Pinyin.test(regExp, localized)) return true;

			let descLocalized = GetLocalization("#DOTA_Tooltip_ability_" + abilityname + "_Description");
			if (descLocalized.search(regExp) != -1 || Pinyin.test(regExp, descLocalized)) return true;

			return false;
		}
		return true;
	};
	const [previewItemID, setPreviewItemID] = createSignal<string>(Object.keys(KeyValues.bless)[0]);
	const previewBlessData = createMemo(() => {
		const id = previewItemID();
		if (id == undefined || id == "") {
			return undefined;
		}
		return KeyValues.bless[id];
	});
	const parseRequireBless = (requireBless?: unknown) => {
		return parsePipeField(requireBless);
	};
	const getBlessName = (blessName: string) => {
		return GetLocalization("#DOTA_Tooltip_ability_" + blessName, blessName);
	};
	const rarityRangeText = createMemo(() => {
		const data = previewBlessData();
		if (data == undefined || data.RarityRange == undefined || data.RarityRange == "") {
			return "无";
		}
		const ranges = parsePipeField(data.RarityRange);
		if (ranges.length == 0) {
			return "无";
		}
		return ranges.join(" / ");
	});
	const requireBless1List = createMemo(() => {
		return parseRequireBless(previewBlessData()?.RequireBless1);
	});
	const requireBless2List = createMemo(() => {
		return parseRequireBless(previewBlessData()?.RequireBless2);
	});
	const hasRequireRule = createMemo(() => {
		return requireBless1List().length > 0 || requireBless2List().length > 0;
	});
	const getRequireGroupSect = (requireList: string[]) => {
		if (requireList.length == 0) {
			return "";
		}
		const firstBless = requireList[0];
		const suitList = parsePipeField(KeyValues.bless[firstBless]?.Suit);
		if (suitList.length == 0) {
			return "";
		}
		return suitList[0];
	};

	// ===== 编辑模式 =====
	const [editMode, setEditMode] = createSignal(false);
	/** 当前正在向哪个条件组添加（点击+后激活） */
	const [addingToGroup, setAddingToGroup] = createSignal<1 | 2 | null>(null);
	const [condition1Items, setCondition1Items] = createSignal<string[]>([]);
	const [condition2Items, setCondition2Items] = createSignal<string[]>([]);
	/** 拖拽悬停在哪个条件组上 */
	const [dragHoverGroup, setDragHoverGroup] = createSignal<1 | 2 | null>(null);

	/** 从当前预览数据同步条件到编辑器 */
	const syncConditionsFromPreview = () => {
		const data = previewBlessData();
		if (data !== undefined) {
			setCondition1Items(parseRequireBless(data.RequireBless1));
			setCondition2Items(parseRequireBless(data.RequireBless2));
		} else {
			setCondition1Items([]);
			setCondition2Items([]);
		}
	};

	/** 切换编辑模式 */
	const handleEditModeChange = (_p: Panel, check: boolean) => {
		setEditMode(check);
		if (check) {
			syncConditionsFromPreview();
		}
		setAddingToGroup(null);
	};

	/** 向条件组添加祝福 */
	const addToCondition = (groupNum: 1 | 2, itemName: string) => {
		if (groupNum === 1) {
			setCondition1Items(prev => {
				for (let i = 0; i < prev.length; i++) {
					if (prev[i] === itemName) return prev;
				}
				const next: string[] = [];
				for (let i = 0; i < prev.length; i++) next.push(prev[i]);
				next.push(itemName);
				return next;
			});
		} else {
			setCondition2Items(prev => {
				for (let i = 0; i < prev.length; i++) {
					if (prev[i] === itemName) return prev;
				}
				const next: string[] = [];
				for (let i = 0; i < prev.length; i++) next.push(prev[i]);
				next.push(itemName);
				return next;
			});
		}
	};

	/** 从条件组移除祝福 */
	const removeFromCondition = (groupNum: 1 | 2, itemName: string) => {
		if (groupNum === 1) {
			setCondition1Items(prev => {
				const next: string[] = [];
				for (let i = 0; i < prev.length; i++) {
					if (prev[i] !== itemName) next.push(prev[i]);
				}
				return next;
			});
		} else {
			setCondition2Items(prev => {
				const next: string[] = [];
				for (let i = 0; i < prev.length; i++) {
					if (prev[i] !== itemName) next.push(prev[i]);
				}
				return next;
			});
		}
	};

	/** 点击左侧列表项的处理 */
	const handleItemClick = (itemName: string) => {
		if (!editMode()) {
			FireEvent("AddBless", itemName);
			return;
		}
		const group = addingToGroup();
		if (group === null) return;
		addToCondition(group, itemName);
		setAddingToGroup(null);
	};

	/** 条件组的+按钮切换 */
	const toggleAddingGroup = (groupNum: 1 | 2) => {
		setAddingToGroup(prev => prev === groupNum ? null : groupNum);
	};

	const getCopyText = (items: string[]) => {
		const parts: string[] = [];
		for (let i = 0; i < items.length; i++) parts.push(items[i]);
		return parts.join("|");
	};

	const copyCond1 = () => {
		$.DispatchEvent("CopyStringToClipboard", getCopyText(condition1Items()), null as any);
	};
	const copyCond2 = () => {
		$.DispatchEvent("CopyStringToClipboard", getCopyText(condition2Items()), null as any);
	};

	useClientSideEvent("RefreshDebugToolData", () => {
		setItemList([]);
		setItemList(getItemList());
	});

	return (
		<SelectionContainer
			eventName="AddBless"
			title="添加祝福"
			// toggleList={toggleList}
			onSearch={text => setFilterWord(text)}
			hasRawMode={false}
			hasToggleSize={false}
			width="1280px"
			height="720px"
		>
			<Panel id="LeftNav">
				<Panel width="100%" flowChildren="right">
					<EOM_BaseButton class="DemoButton" width="fill-parent-flow(1)" onactivate={() => toggleAll(true)}>
						<Label text="全部打开" />
					</EOM_BaseButton>
					<EOM_BaseButton class="DemoButton" width="fill-parent-flow(1)" onactivate={() => toggleAll(false)}>
						<Label text="全部关闭" />
					</EOM_BaseButton>
				</Panel>
				<EOM_BaseButton class="DemoButton" width="fill-parent-flow(1)" onactivate={toggleInvert}>
					<Label text="反选" />
				</EOM_BaseButton>
				<For each={Object.entries(toggleList())}>
					{([suit, text]) => <EOM_ToggleButton selected={selectedSuits()[suit] === true} margin="4px 0px" text={text} onchange={(p, check) => {
						setSelectedSuits(prev => {
							const next = { ...prev };
							if (check) {
								next[suit] = true;
							} else {
								delete next[suit];
							}
							return next;
						});
					}} oncontextmenu={() => setSelectedSuits({ [suit]: true })} />}
				</For>
			</Panel>
			<Panel
				id="BlessList"
				scroll="y"
				class={editMode() ? (addingToGroup() !== null ? "EditModeAdding" : "EditMode") : ""}
			>
				<For each={itemList()}>
					{(abilityname) =>
						<EOM_BaseButton
							visible={visiable(abilityname)}
							width="64px"
							margin="6px"
							flowChildren="down"
							onactivate={() => handleItemClick(abilityname)}
							onDragStart={(panel, dragCallbacks) => {
								if (!editMode()) return;
								const dragPanel = $.CreatePanel("Panel", $.GetContextPanel(), "blessDragImage");
								render(() => <CommonItem itemName={abilityname} width="64px" height="64px" showTips={false} />, dragPanel);
								dragCallbacks.displayPanel = dragPanel;
								dragCallbacks.offsetX = 0;
								dragCallbacks.offsetY = 0;
								SaveData(dragPanel, "blessName", abilityname);
							}}
							onDragEnd={(_panel, draggedPanel) => {
								draggedPanel.DeleteAsync(-1);
								setDragHoverGroup(null);
							}}
						>
							<CommonItem
								itemName={abilityname}
								width="64px"
								height="64px"
								marginBottom="8px"
								showTips={editMode()}
								onmouseover={editMode() ? undefined : () => {
									if (!editMode()) {
										setPreviewItemID(abilityname);
									}
								}}
							/>
							<Label class="PickerItemName" text={GetLocalization("#DOTA_Tooltip_ability_" + abilityname, abilityname)} />
						</EOM_BaseButton>}
				</For>
			</Panel>
			<Panel id="BlessDetail" scroll="y">
				<CommonBox itemName={previewItemID()} customTooltip={{ name: "feature_tags", tags: GetArtifactTags(previewItemID()).join("|") }} />
				<Panel class="BlessMetaSection">
					<Label class="BlessMetaTitle" text="稀有度" />
					<Label class="BlessMetaText" text={rarityRangeText()} />
				</Panel>

				{/* 查看模式：前置条件展示 */}
				<Show when={!editMode()}>
					<Panel class="BlessMetaSection">
						<Label class="BlessMetaTitle" text="前置条件" />
						<Show when={hasRequireRule()} fallback={<Label class="BlessMetaText" text="无" />}>
							<Show when={requireBless1List().length > 0}>
								<Panel class="RequireGroupHeader">
									<SectIcon sectName={getRequireGroupSect(requireBless1List())} large />
									<Label class="BlessMetaText" text="以下任一项" />
								</Panel>
								<Panel flowChildren="right-wrap">
									<For each={requireBless1List()}>
										{(itemName) => <Panel class="RequireItemRow">
											<CommonItem class="RequireBlessBox" itemName={itemName} showTips />
											<Label class="RequireBlessName" text={getBlessName(itemName)} />
										</Panel>}
									</For>
								</Panel>
							</Show>
							<Show when={requireBless2List().length > 0}>
								<Panel class="RequireGroupHeader">
									<SectIcon sectName={getRequireGroupSect(requireBless2List())} large />
									<Label class="BlessMetaText" text="以下任一项" />
								</Panel>
								<Panel flowChildren="right-wrap">
									<For each={requireBless2List()}>
										{(itemName) => <Panel class="RequireItemRow">
											<CommonItem class="RequireBlessBox" itemName={itemName} showTips />
											<Label class="RequireBlessName" text={getBlessName(itemName)} />
										</Panel>}
									</For>
								</Panel>
							</Show>
						</Show>
					</Panel>
				</Show>

				{/* 编辑模式：前置条件编辑器 */}
				<Show when={editMode()}>
					<Panel class="BlessConditionEditor">
						<Label class="BlessMetaTitle" text="前置条件" />

						{/* 条件组1 */}
						<Panel class="ConditionGroupHeader">
							<Label class="ConditionGroupLabel" text="条件1" />
							<Label class="ConditionGroupHint" text="（以下任一项）" />
							<EOM_BaseButton class="ConditionCopyButton" onactivate={copyCond1}>
								<Label text="📋 复制" />
							</EOM_BaseButton>
						</Panel>
						<Panel
							class={(addingToGroup() === 1 || dragHoverGroup() === 1) ? "ConditionBox ConditionBoxAdding" : "ConditionBox"}
							flowChildren="right-wrap"
							onDragEnter={(_panel, draggedPanel) => {
								if (LoadData(draggedPanel, "blessName")) {
									setDragHoverGroup(1);
								}
							}}
							onDragLeave={() => setDragHoverGroup(null)}
							onDragDrop={(_panel, draggedPanel) => {
								const blessName = LoadData(draggedPanel, "blessName") as string;
								if (blessName) addToCondition(1, blessName);
								setDragHoverGroup(null);
							}}
						>
							<For each={condition1Items()}>
								{(itemName) =>
									<EOM_BaseButton class="ConditionItem" flowChildren="down" onactivate={() => removeFromCondition(1, itemName)}>
										<CommonItem
											class="ConditionItemIcon"
											itemName={itemName}
											width="62px"
											height="62px"
											showTips
											onactivate={() => removeFromCondition(1, itemName)}
										/>
										{/* <Label class="ConditionItemName" text={getBlessName(itemName)} /> */}
										{/* <EOM_BaseButton class="ConditionRemoveButton" onactivate={() => removeFromCondition(1, itemName)}>
											<Label text="×" />
										</EOM_BaseButton> */}
									</EOM_BaseButton>
								}
							</For>
							<EOM_BaseButton
								class={addingToGroup() === 1 ? "ConditionAddButton Active" : "ConditionAddButton"}
								onactivate={() => toggleAddingGroup(1)}
							>
								<Image class="ConditionAddIcon" svgfill="#aaccff" src="s2r://panorama/images/control_icons/24px/plus.vsvg" />
							</EOM_BaseButton>
						</Panel>

						{/* 条件组2 */}
						<Panel class="ConditionGroupHeader">
							<Label class="ConditionGroupLabel" text="条件2" />
							<Label class="ConditionGroupHint" text="（以下任一项，与条件1独立）" />
							<EOM_BaseButton class="ConditionCopyButton" onactivate={copyCond2}>
								<Label text="📋 复制" />
							</EOM_BaseButton>
						</Panel>
						<Panel
							class={(addingToGroup() === 2 || dragHoverGroup() === 2) ? "ConditionBox ConditionBoxAdding" : "ConditionBox"}
							flowChildren="right-wrap"
							onDragEnter={(_panel, draggedPanel) => {
								if (LoadData(draggedPanel, "blessName")) {
									setDragHoverGroup(2);
								}
							}}
							onDragLeave={() => setDragHoverGroup(null)}
							onDragDrop={(_panel, draggedPanel) => {
								const blessName = LoadData(draggedPanel, "blessName") as string;
								if (blessName) addToCondition(2, blessName);
								setDragHoverGroup(null);
							}}
						>
							<For each={condition2Items()}>
								{(itemName) =>
									<Panel class="ConditionItem" flowChildren="down">
										<CommonItem
											class="ConditionItemIcon"
											itemName={itemName}
											width="62px"
											height="62px"
											showTips
											onactivate={() => removeFromCondition(2, itemName)}
										/>
									</Panel>
								}
							</For>
							<EOM_BaseButton
								class={addingToGroup() === 2 ? "ConditionAddButton Active" : "ConditionAddButton"}
								onactivate={() => toggleAddingGroup(2)}
							>
								<Image class="ConditionAddIcon" svgfill="#aaccff" src="s2r://panorama/images/control_icons/24px/plus.vsvg" />
							</EOM_BaseButton>
						</Panel>

						{/* 添加状态提示 */}
						<Show when={addingToGroup() !== null}>
							<Label
								class="ConditionAddHint"
								text={`请点击左侧祝福列表，加入条件${addingToGroup()}`}
							/>
						</Show>
					</Panel>
				</Show>

				<Panel horizontalAlign="right" margin="10px" flowChildren="right">
					<EOM_Switch onchange={handleEditModeChange} />
					<Label text="编辑模式" marginLeft="4px" verticalAlign="center" />
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};