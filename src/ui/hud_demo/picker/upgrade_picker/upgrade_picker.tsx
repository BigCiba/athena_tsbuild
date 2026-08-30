import { createMemo, createSignal, For, ParentComponent } from "solid-js";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_ToggleButton } from "../../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { UpgradeBox } from "../../../../components/abilities/upgrade/upgrade_box";
import { UpgradeIcon } from "../../../../components/abilities/upgrade/upgrade_icon";
import { Pinyin } from "../../pinyin";
import "./upgrade_picker.less";

/** 选择技能升级 */
export const UpgradePicker: ParentComponent = () => {
	const [kv, setKV] = createSignal(Object.assign({}, KeyValues.ability_upgrades, KeyValues.ability_upgrades_service));
	const eventName = "AddAbilityUpgrade";
	const title = "添加技能升级";
	const getUpgradeList = () => {
		return Object.keys(kv());
	};
	const [itemList, setItemList] = createSignal(getUpgradeList());
	const [filterWord, setFilterWord] = createSignal("");
	const [previewUpgradeID, setPreviewUpgradeID] = createSignal<string>(itemList()[0] ?? "");

	const getHeroCode = (upgradeID: string) => {
		const abilityName = String(kv()[upgradeID]?.ability_name ?? "");
		if (abilityName !== "" && abilityName.indexOf("_") > 0) {
			return abilityName.substring(0, abilityName.indexOf("_"));
		}

		const index = upgradeID.indexOf("_upgrade_");
		if (index > 0) {
			return upgradeID.substring(0, index);
		}
		return "other";
	};
	const getHeroDisplayName = (heroCode: string) => {
		if (heroCode === "other") {
			return "其他";
		}
		const heroUnitName = "npc_dota_hero_" + heroCode;
		const heroData = KeyValues.heroes?.[heroUnitName];
		if (heroData !== undefined && heroData.Name !== undefined && heroData.Name !== "") {
			return heroData.Name;
		}
		const localized = GetLocalization("#" + heroCode);
		if (localized !== "") {
			return localized;
		}
		return heroCode;
	};

	const heroToggleList = createMemo(() => {
		const result: Record<string, string> = {};
		const list = itemList();
		for (let i = 0; i < list.length; i++) {
			const heroCode = getHeroCode(list[i]);
			result[heroCode] = getHeroDisplayName(heroCode);
		}
		return result;
	});
	const buildAllHeroSelected = () => {
		const initial: Record<string, boolean> = {};
		const heroCodes = Object.keys(heroToggleList());
		for (let i = 0; i < heroCodes.length; i++) {
			initial[heroCodes[i]] = true;
		}
		return initial;
	};
	const [selectedHeroes, setSelectedHeroes] = createSignal<Record<string, boolean>>((() => {
		return buildAllHeroSelected();
	})());

	const hasSelectedHero = () => Object.keys(selectedHeroes()).length > 0;
	const heroMatched = (upgradeID: string) => {
		if (!hasSelectedHero()) {
			return true;
		}
		const heroCode = getHeroCode(upgradeID);
		return selectedHeroes()[heroCode] === true;
	};

	const toggleAll = (check: boolean) => {
		if (!check) {
			setSelectedHeroes({});
			return;
		}
		const next: Record<string, boolean> = {};
		const heroCodes = Object.keys(heroToggleList());
		for (let i = 0; i < heroCodes.length; i++) {
			next[heroCodes[i]] = true;
		}
		setSelectedHeroes(next);
	};
	const toggleInvert = () => {
		const next: Record<string, boolean> = {};
		const heroCodes = Object.keys(heroToggleList());
		for (let i = 0; i < heroCodes.length; i++) {
			const heroCode = heroCodes[i];
			if (selectedHeroes()[heroCode] !== true) {
				next[heroCode] = true;
			}
		}
		setSelectedHeroes(next);
	};

	const visiable = (upgradeID: string) => {
		if (!heroMatched(upgradeID)) {
			return false;
		}
		if (filterWord() !== "") {
			let regExp: RegExp;
			try {
				regExp = new RegExp(filterWord(), "gim");
			} catch (error) {
				return true;
			}

			const localized = GetLocalization("#" + upgradeID);
			if (
				upgradeID.search(regExp) !== -1
				|| localized.search(regExp) !== -1
				|| GetLocalization("#" + upgradeID + "_description", upgradeID).search(regExp) !== -1
				|| Pinyin.test(regExp, localized)
			) {
				return true;
			}
			const abilityValues = kv()[upgradeID]?.AbilityValues;
			if (typeof abilityValues === "object") {
				for (const key in abilityValues) {
					if (key.search(regExp) !== -1) {
						return true;
					}
					const propertyKey = key.substring(0, 5) === "item_" ? key.substring(5) : key;
					if (propertyKey.search(regExp) !== -1 || GetLocalization("#property_" + propertyKey, "").search(regExp) !== -1) {
						return true;
					}
					const valueData = abilityValues[key];
					if (typeof valueData === "object") {
						for (const valueKey in valueData) {
							const keyText = valueKey.replaceAll(/\s/g, "");
							if (keyText.search(regExp) !== -1 || GetLocalization("#dota_ability_special_variable" + keyText, "").search(regExp) !== -1) {
								return true;
							}
						}
					}
				}
			}
			return false;
		}
		return true;
	};

	useClientSideEvent("RefreshDebugToolData", () => {
		setKV(Object.assign({}, KeyValues.ability_upgrades, KeyValues.ability_upgrades_service))
		const latestList = getUpgradeList();
		setItemList([]);
		setItemList(latestList);
		setPreviewUpgradeID(latestList[0] ?? "");
		setSelectedHeroes(buildAllHeroSelected());
	});

	return (
		<SelectionContainer
			eventName={eventName}
			title={title}
			onSearch={text => setFilterWord(text)}
			hasRawMode={false}
			hasToggleSize={false}
		// width="1280px"
		// height="720px"
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
				<For each={Object.entries(heroToggleList())}>
					{([heroCode, heroName]) => <EOM_ToggleButton selected={selectedHeroes()[heroCode] === true} margin="4px 0px" text={heroName} onchange={(p, check) => {
						setSelectedHeroes(prev => {
							const next = { ...prev };
							if (check) {
								next[heroCode] = true;
							} else {
								delete next[heroCode];
							}
							return next;
						});
					}} oncontextmenu={() => setSelectedHeroes({ [heroCode]: true })} />}
				</For>
			</Panel>
			<Panel width="fill-parent-flow(1)" height="100%" flowChildren="down">
				<Panel id="UpgradeList" scroll="y">
					<For each={itemList()}>
						{(upgradeID) =>
							<EOM_BaseButton
								visible={visiable(upgradeID)}
								width="64px"
								margin="6px"
								flowChildren="down"
								onmouseover={() => setPreviewUpgradeID(upgradeID)}
								onactivate={() => FireEvent(eventName, upgradeID)}
							>
								<UpgradeIcon upgradeID={upgradeID} width="64px" height="64px" marginBottom="8px" showTips={false} />
								<Label class="PickerItemName" text={GetLocalization("#" + upgradeID, upgradeID)} />
							</EOM_BaseButton>}
					</For>
				</Panel>
				<Panel id="UpgradeDetail" >
					<UpgradeBox upgradeID={previewUpgradeID()} />
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};
