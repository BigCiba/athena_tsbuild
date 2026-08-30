import classNames from "classnames";
import { createMemo, For, mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import { HotkeyLabel } from "../../hotkey_label/hotkey_label";
import { CommonItem } from "../common/common_item";
import "./artifact_box.less";

interface ArtifactBoxProps extends PanelAttributes {
	/** 物品名 */
	itemName: string;
	/** 物品稀有度 */
	rarity?: number;
	/** 单位，用于获取折扣 */
	entIndex?: EntityIndex;
	/** 是否显示价格 */
	showCost?: boolean;
}

export const ArtifactBox: ParentComponent<ArtifactBoxProps> = (props) => {
	const merged = mergeProps({ showCost: false, entIndex: -1 as EntityIndex }, props, { class: classNames("ArtifactBox", props.class) });
	const [local, others] = splitProps(merged, ["itemName", "showCost", "entIndex"]);
	const kv = createMemo(() => KeyValues.npc_items_custom[local.itemName]);
	const rarity = createMemo(() => toFiniteNumber(props.rarity ?? kv().Rarity ?? 1));
	const goldCost = createMemo(() => {
		let cost = toFiniteNumber(kv()?.GoldCost, 0);
		if (cost == 0) return 0;
		let discountPercent = 0;
		if (local.entIndex != -1) {
			discountPercent = Entities.GetPropertyValue(local.entIndex, "shop_discount");
		}
		cost = Math.max(0, Math.ceil(cost * (1 - discountPercent * 0.01)));
		return cost;
	});
	// 获取技能详细数值
	const abilityDetailValues = createMemo(() => {
		const values = kv().AbilityValues || {};
		return Object.entries(values)
			.map(([key, value]) => {
				const label = GetLocalization(`DOTA_Tooltip_ability_${local.itemName}_${key}`, "");
				return {
					key,
					label: label.startsWith('DOTA_Tooltip') ? key : label,
					value: GetAbilityValue(value as any)
				};
			})
			.filter(item => item.label !== ""); // 过滤掉没有本地化的项
	});
	return <Panel {...others}>
		<CommonItem class="AbilityImage" itemName={local.itemName} />
		<Panel class="ArtifactInfo">
			<Label class="ArtifactName Rarity1" classList={{ ["Rarity" + rarity()]: true }} html text={GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}`, "")} />
			<HotkeyLabel class="ArtifactDescription" html text={getItemArrtibute(local.itemName) + getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}_description`, ""), kv().AbilityValues)} />
			{/* 技能详细数值 */}
			<Show when={abilityDetailValues().length > 0}>
				<Panel class="HeroAbility__Details">
					<For each={abilityDetailValues()}>
						{(detail) => <Panel class="HeroAbility__Detail">
							<Label html class="HeroAbility__DetailLabel" text={detail.label} />
							<Label html class="HeroAbility__DetailValue" text={detail.value} />
						</Panel>}
					</For>
				</Panel>
			</Show>
		</Panel>
		<Label visible={kv().AbilityCooldown != undefined} class="HeroAbility__PropertyValue AbilityCooldown" text={kv().AbilityCooldown} />
		<Label visible={local.showCost && goldCost() > 0} class="HeroAbility__PropertyValue GoldCost" text={goldCost()} />
	</Panel>;
};