import classNames from "classnames";
import { createMemo, For, mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import { EOM_Icon } from "../../EOMDesign/DataDisplay/EOM_Icon/EOM_Icon";
import { HotkeyLabel } from "../../hotkey_label/hotkey_label";
import { getShopItemDisplayCost } from "../../service_utils/service_netdata_helper";
import { SectIcon } from "../SectIcon/SectIcon";
import "./common_box.less";
import { CommonItem } from "./common_item";

interface CommonBoxProps extends PanelAttributes {
	/** 物品名 */
	itemName: string;
	/** 物品稀有度 */
	rarity?: number;
	/** 升级级数，传入后数值显示为 当前值 > 升级值 */
	upgradeLevel?: number;
	/** 单位，用于获取折扣 */
	entIndex?: EntityIndex;
	/** 是否显示价格 */
	showCost?: boolean;
	/** 外部价格 */
	cost?: number;
}

export const CommonBox: ParentComponent<CommonBoxProps> = (props) => {
	const merged = mergeProps({ showCost: false, showTips: true, entIndex: -1 as EntityIndex, showAutoAttribute: false }, props, { class: classNames("CommonBox", props.class) });
	const [local, others] = splitProps(merged, ["itemName", "showCost", "cost", "entIndex", "rarity", "upgradeLevel"]);
	const kv = createMemo(() => KeyValues.npc_items_custom[local.itemName] ?? {});
	const rarity = createMemo(() => {
		if (local.rarity != undefined) return local.rarity;
		let kv = KeyValues.npc_items_custom[local.itemName];
		let rarity = toFiniteNumber(String(kv?.RarityRange).split("|")[0], 1);
		return rarity;
	});
	const upgradedRarity = createMemo(() => {
		if (local.upgradeLevel != undefined && local.upgradeLevel > 0) return rarity() + local.upgradeLevel;
		return undefined;
	});
	const goldCost = createMemo(() => {
		let cost = local.cost;
		if (cost != undefined) {
			return Math.max(0, cost);
		}
		return getShopItemDisplayCost(local.entIndex, local.itemName, rarity());
	});
	// 获取技能详细数值
	const abilityDetailValues = createMemo(() => {
		const values = kv()?.AbilityValues || {};
		return Object.entries(values)
			.map(([key, value]) => {
				let label = GetLocalization(`DOTA_Tooltip_ability_${local.itemName}_${key}`, "");
				const hasPct = label.startsWith('%');
				if (hasPct) {
					label = label.slice(1);
				}
				const currentValue = GetAbilityValue(value as any, { hasPct, level: rarity(), onlyShowNowLevel: true });
				let upgradeValue: string | number | undefined;
				if (upgradedRarity() != undefined) {
					upgradeValue = GetAbilityValue(value as any, { hasPct, level: upgradedRarity()!, onlyShowNowLevel: true });
				}
				return {
					key,
					label: label.startsWith('DOTA_Tooltip') ? key : label,
					value: currentValue,
					upgradeValue,
				};
			})
			.filter(item => item.label !== ""); // 过滤掉没有本地化的项
	});
	const commonDescription = createMemo(() => {
		let description = getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}_description`, ""), kv()?.AbilityValues ?? {}, { level: rarity(), onlyShowNowLevel: true });
		if (kv().Access != "Bless") {
			description += getItemArrtibute(local.itemName, rarity());
		}
		return description;
	});
	const suitList = createMemo(() => (kv().Suit ?? "").split("|").filter(Boolean));
	const extraTags = createMemo(() => {
		const tags: Array<string> = [];
		if (toFiniteNumber(kv().Quantitylimit, 0) == 1) {
			tags.push(GetLocalization("#ArtifactQuantitylimit"));
		}
		if (String(kv().UpgradeGroup ?? "") != "") {
			tags.push(GetLocalization("#ArtifactGrouplimit"));
		}
		return tags;
	});

	const enoughGold = createMemo(() => {
		const playerID = Players.GetLocalPlayer();
		const playerData = getNetDataKey("player_data", "resource", playerID);
		if (!playerData) return true;
		return (playerData.gold ?? 0) >= goldCost();
	});
	return <Panel {...others}>
		<CommonItem class="AbilityImage" itemName={local.itemName} rarity={rarity()} size="large" />
		<Panel class="CommonInfo">
			<Panel class="CommonNameRow">
				<Label class="CommonName" classList={{ ["Rarity" + rarity()]: true }} html text={GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}`, "")} />
				<For each={extraTags()}>
					{tag => <Label html class={classNames("CommonExtraTag")} text={tag} />}
				</For>
			</Panel>
			<HotkeyLabel class="CommonDescription" html text={commonDescription()} />
			{/* 技能详细数值 */}
			<Show when={abilityDetailValues().length > 0}>
				<Panel class="HeroAbility__Details">
					<For each={abilityDetailValues()}>
						{(detail) => <Panel class="HeroAbility__Detail">
							<Label html class="HeroAbility__DetailLabel" text={detail.label} />
							<Label html class="HeroAbility__DetailValue" text={detail.value} />
							<Show when={detail.upgradeValue != undefined}>
								<EOM_Icon marginLeft="4px" type="DoubleArrowRight" size="16" align="center center" color="#70EA72" />
								<Label html marginLeft="4px" class="HeroAbility__DetailValue HeroAbility__UpgradeValue" text={`<font color='#70EA72'>${detail.upgradeValue}</font>`} />
							</Show>
						</Panel>}
					</For>
				</Panel>
			</Show>
		</Panel>
		<Panel class="SectList">
			<For each={suitList()}>
				{(sectName) => <SectIcon sectName={sectName} large={true} />}
			</For>
		</Panel>
		<Label visible={kv()?.AbilityCooldown != undefined} class="HeroAbility__PropertyValue AbilityCooldown" text={kv()?.AbilityCooldown ?? ""} />
		<Label visible={local.showCost && goldCost() > 0} class="HeroAbility__PropertyValue GoldCost" classList={{ NoEnoughGold: !enoughGold() }} text={goldCost()} />
	</Panel>;
};
