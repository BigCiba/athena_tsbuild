import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import "./upgrade_icon.less";
interface UpgradeIconProps extends PanelAttributes {
	upgradeID: string;
	size?: "small" | "large";
	showRarity?: boolean;
	showTips?: boolean;
}

export const UpgradeIcon: ParentComponent<UpgradeIconProps> = (props) => {
	const merged = mergeProps(props, {
		class: classNames("UpgradeIcon", props.class, props.size ?? "small"),
		showRarity: true
	});
	const [local, others] = splitProps(merged, ["upgradeID", "showRarity", "showTips"]);
	const kv = createMemo(() => KeyValues.ability_upgrades[local.upgradeID]);
	const src = createMemo(() => {
		const getTexturePath = (name?: string) => {
			if (!name) return;
			if (name.startsWith("item_")) {
				const rawPath = `resource/flash3/images/items/${name.substring(5)}.png`;
				if (HasResource(rawPath)) {
					return "raw://" + rawPath;
				}
				return `file://{images}/items/${name.substring(5)}.png`;
			}
			const rawPath = `resource/flash3/images/spellicons/${name}.png`;
			if (HasResource(rawPath)) {
				return "raw://" + rawPath;
			}
			return `file://{images}/spellicons/${name}.png`;
		};

		let abilityTextureName = kv()?.AbilityTextureName;
		if (!abilityTextureName) {
			const abilityName = kv()?.ability_name;
			if (abilityName) {
				const abilityKv = KeyValues.npc_abilities_custom[abilityName];
				abilityTextureName = abilityKv?.AbilityTextureName;
			}
		}
		return getTexturePath(abilityTextureName);
	});
	const rarity = createMemo(() => {
		return toFiniteNumber(kv()?.Rarity);
	});
	const tooltipProps = createMemo(() => {
		return local.showTips ? { customTooltip: { name: "ability_upgrade", upgradeID: local.upgradeID } } : undefined;
	});
	return <Panel {...others} {...tooltipProps()}  >
		<Image id="UpgradeImage" scaling="stretch-to-fit-y-preserve-aspect" src={src()} />
		<Show when={local.showRarity}>
			<Panel id="Border" class={"Rarity" + rarity()} />
		</Show>
	</Panel>;
};