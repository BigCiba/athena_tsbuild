import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import "./common_item.less";
type itemType = "none" | "artifact" | "bless";
interface CommonItemProps extends PanelAttributes {
	itemName: string;
	size?: "small" | "large";
	showRarity?: boolean;
	showTips?: boolean;
	rarity?: number;
	stackCount?: number;
}
/**
 * 通用物品样式  仅支持 遗物（artifact）、祝福（bless）
 * @param props 
 * @returns 
 */
export const CommonItem: ParentComponent<CommonItemProps> = (props) => {
	const merged = mergeProps(props, {
		class: classNames("CommonItem", props.class, props.size ?? "small"),
		showRarity: true,
	});
	const [local, others] = splitProps(merged, ["itemName", "showRarity", "stackCount", "rarity", "showTips", "class"]);
	const itemData = createMemo(() => {
		const kv = KeyValues.npc_items_custom[local.itemName];
		let itemType: itemType = "none";

		if (KeyValues.artifact[local.itemName]) {
			itemType = "artifact";
		} else if (KeyValues.bless[local.itemName]) {
			itemType = "bless";
		}

		return { kv, itemType };
	});

	const rarity = createMemo(() => {
		if (local.rarity != undefined) return local.rarity;
		let kv = KeyValues.npc_items_custom[local.itemName];
		let rarity = toFiniteNumber(String(kv?.RarityRange).split("|")[0], 1);
		return rarity;
	});

	const tooltip = createMemo(() => {
		const data = itemData();
		//目前只有artifact这一个tips
		return (local.showTips && data.itemType !== "none")
			? { name: "artifact", itemName: local.itemName, rarity: rarity() }
			: undefined;
	});

	const src = createMemo(() => {
		const abilityTextureName = itemData().kv?.AbilityTextureName;
		if (abilityTextureName == undefined || abilityTextureName == "") return undefined;

		if (abilityTextureName.startsWith("item_")) {
			return `file://{images}/items/${abilityTextureName.substring(5)}.png`;
		}
		return `file://{images}/spellicons/${abilityTextureName}.png`;
	});

	const defaultsrc = createMemo(() => {
		const abilityTextureName = itemData().kv?.AbilityTextureName;
		if (abilityTextureName == undefined || abilityTextureName == "") return undefined;

		if (abilityTextureName.startsWith("item_")) {
			return `raw://resource/flash3/images/items/${abilityTextureName.substring(5)}.png`;
		}
		return `raw://resource/flash3/images/spellicons/${abilityTextureName}.png`;
	});

	const panelClass = createMemo(() => classNames(local.class, itemData().itemType));

	return <Panel {...others} class={panelClass()} customTooltip={tooltip()}>
		<Image class="ItemIcon" scaling="stretch-to-fit-y-preserve-aspect" src={src()}>
			<Image width="100%" height="100%" scaling="stretch-to-fit-y-preserve-aspect" src={defaultsrc()} />
		</Image>
		<Show when={local.showRarity}>
			<Panel class={"Border Rarity" + rarity()} />
		</Show>
		<Show when={local.stackCount != undefined && local.stackCount > 0}>
			<Label class="StackCount" text={local.stackCount} />
		</Show>
		{props.children}
	</Panel>;
};