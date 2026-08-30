import classNames from "classnames";
import { mergeProps, ParentComponent, Show, splitProps, untrack } from "solid-js";
import { EOM_Countdown } from "../EOMDesign/DataDisplay/EOM_Countdown/EOM_Countdown";
import { StoreItemImage } from "../StoreItem/StoreItem";
import "./backpackItem.less";

interface BackpackItem {
	amounts: number;
	endTime?: number;
	rarity?: number;
	itemid: string | number;
	isButton?: boolean;
	isSelected?: boolean;
}

export function BackpackItem(props: BackpackItem & PanelAttributes) {
	const merged = mergeProps({ endTime: 0, isButton: false, isSelected: false }, props, { class: classNames("BackpackItem", { Button: props.isButton, Selected: props.isSelected }) });
	const [local, others] = splitProps(merged, ["endTime", "amounts", "rarity", "itemid", "isButton", "isSelected"]);
	return <Panel {...others}>
		<Panel id="Container" >
			<Panel id="Border" hittest={false} />
			<BackpackItemContent id="Content" itemid={local.itemid} rarity={local.rarity}  >
				<Show when={local.endTime > 0}>
					<Panel id="Countdown" >
						<EOM_Countdown endTime={local.endTime} short />
					</Panel>
				</Show>
			</BackpackItemContent>
		</Panel>
		<Panel id="Amounts">
			<Label id="ItemAmounts" text={local.amounts} />
		</Panel>
	</Panel>;
}

interface BackpackItemContent {
	itemid: string | number;
	rarity?: number;
	amounts?: number;
}
export const BackpackItemContent: ParentComponent<BackpackItemContent & PanelAttributes> = (props) => {
	const rarity = () => {
		const tokenRarity: Record<string, number> = {
			"110001": 3,
			"110002": 3,
			"110003": 0,
			"110004": 4,
			"110005": 0,
			"110006": 5,
		};
		if (tokenRarity[String(props.itemid)]) {
			return tokenRarity[String(props.itemid)];
		}
		return props.rarity ?? GetServiceItemRarity(props.itemid);
	};
	const merged = mergeProps(props, { class: classNames("BackpackItemContent", "Rarity" + rarity()) });
	const [local, others] = splitProps(merged, ["itemid", "rarity", "children", "amounts"]);

	return <Panel {...others}  >
		<Panel id="Bg" />
		<StoreItemImage id="BackpackItemImage" itemid={local.itemid} />
		<Label id="BackpackItemCount" visible={local.amounts != undefined && local.amounts > 0} text={"×" + local.amounts} />
		{untrack(() => local.children)}
	</Panel>;
};