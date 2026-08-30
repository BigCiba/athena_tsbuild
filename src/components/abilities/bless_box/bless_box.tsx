import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, splitProps } from "solid-js";

import { CommonItem } from "../common/common_item";
import "./bless_box.less";


interface UpgradeBoxProps extends PanelAttributes {
	/** 物品名 */
	itemName: string;
}

export const BlessBox: ParentComponent<UpgradeBoxProps> = (props) => {
	const merged = mergeProps(props, { class: classNames("BlessBox", props.class) });
	const [local, others] = splitProps(merged, ["itemName"]);
	const kv = createMemo(() => KeyValues.npc_items_custom[local.itemName]);
	return <Panel {...others}>
		<Panel class="BlessIcon">
			<CommonItem class="AbilityImage" itemName={local.itemName} />
		</Panel>
		<Panel class="BlessInfo">
			<Label class="BlessName" html text={GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}`, "")} />
			<Label class="BlessDescription" html text={getItemArrtibute(local.itemName) + getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}_description`, ""), kv().AbilityValues)} />
		</Panel>
	</Panel>;
};