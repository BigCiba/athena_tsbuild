import { createSignal, For, ParentComponent } from "solid-js";
import { CommonItem } from "../../../components/abilities/common/common_item";
import { EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Breadcrumb } from "../../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { FireEvent, SelectionContainer } from "../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { Pinyin } from "../pinyin";

/** 选择遗物 */
export const DropPicker: ParentComponent<{
}> = (props) => {
	const getDropList = () => Object.keys(KeyValues.consumables).sort((a, b) => {
		return Number(KeyValues.consumables[a].Rarity) - Number(KeyValues.consumables[b].Rarity);
	});
	const getDropToggleList = () => {
		let itemToggleList: Table = {};
		Object.values(KeyValues.consumables).map(v => {
			if (v.Access) {
				itemToggleList[v.Access] = v.Access;
			}
		});
		return itemToggleList;
	};
	const artifactFilter = (toggleType: string, itemName: string) => {
		if (toggleType == "") return true;
		return toggleType == KeyValues.consumables[itemName]?.Access;
	};
	const [itemList, setItemList] = createSignal(getDropList());
	const toggleList = getDropToggleList();
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	const [rarity, setRarity] = createSignal(0);
	const visiable = (abilityname: string) => {
		if (!artifactFilter(toggleType(), abilityname)) {
			return false;
		}
		if (rarity() != 0 && !String(KeyValues.consumables[abilityname].RarityRange).includes(String(rarity()))) {
			return false;
		}
		if (filterWord() != "") {
			let regExp;
			try {
				regExp = new RegExp(filterWord(), "gim");
			} catch (error) {
				return true;
			}
			let localized = GetLocalization("#DOTA_Tooltip_ability_" + abilityname);
			if (
				abilityname.search(regExp) != -1
				|| localized.search(regExp) != -1
				|| GetLocalization("#DOTA_Tooltip_ability_" + abilityname + "_Description", abilityname).search(regExp) != -1
				|| Pinyin.test(regExp, localized)
			) {
				return true;
			}
			let abilityValues = CustomUIConfig.npc_items_custom[abilityname].AbilityValues;
			if (typeof abilityValues == "object") {
				for (const k in abilityValues) {
					if (k.search(regExp) != -1) {
						return true;
					}
					let key;
					if (k.substring(0, 5) == "item_") {
						key = k.substring(5);
					}
					if (key != undefined && key.search(regExp) != -1 || GetLocalization("#property_" + key, "").search(regExp) != -1) {
						return true;
					}
					let t = abilityValues[k];
					if (typeof t == "object") {
						for (let key in t) {
							key = key.replaceAll(/\s/g, "");
							if (key.search(regExp) != -1 || GetLocalization("#dota_ability_special_variable" + key, "").search(regExp) != -1) {
								return true;
							}
						}
					}
				}

				let description = GetLocalization(`dota_tooltip_ability_${abilityname}_description`, abilityname);
				if (description != "") {
					if (description.search(regExp) != -1) {
						return true;
					}
				}
			}
			return false;
		}
		return true;
	};

	useClientSideEvent("RefreshDebugToolData", () => {
		setItemList([]);
		setItemList(getDropList());
	});

	return (
		<SelectionContainer
			eventName="AddDropItem"
			title="创建掉落物"
			toggleList={toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			canScroll={false}
		>
			<Panel width="100%" height="100%" margin="-6px" backgroundColor="#00000066" flowChildren="down">
				<Panel flowChildren="right" margin="10px 6px" width="100%">
					<EOM_Breadcrumb list={["ALL", "1级", "2级", "3级", "4级", "5级"]} onChange={(index) => setRarity(index)} />
				</Panel>
				<Panel class="EOM_DebugTool_AbilityPicker" flowChildren="right-wrap" width="100%" scroll="y" >
					<For each={itemList()}>
						{(abilityname, index) =>
							<EOM_BaseButton
								visible={visiable(abilityname)}
								class="EOM_DebugTool_AbilityPickerItem"
								width="64px"
								flowChildren="down"
								onactivate={self => FireEvent("AddDropItem", abilityname)}
								// onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityShopItemTooltip>(p, { abilityname: abilityname, guidename: "", entityindex: -1 as EntityIndex, onlycurrentlevelvalue: false })}
								// onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}
								// customTooltip={{ name: "artifact", itemName: abilityname, showCost: 1 }}
								oncontextmenu={self => {
									if (rawMode()) {
										$.DispatchEvent("CopyStringToClipboard", abilityname, null);
									} else {
										$.DispatchEvent("CopyStringToClipboard", GetLocalization("#DOTA_Tooltip_ability_" + abilityname), null);
									}
								}}
							>
								<CommonItem itemName={abilityname} width="64px" height="64px" marginBottom="8px" showTips />
								<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : GetLocalization("#DOTA_Tooltip_ability_" + abilityname, abilityname)} />
							</EOM_BaseButton>}
					</For>
				</Panel >
			</Panel>
		</SelectionContainer>
	);
};