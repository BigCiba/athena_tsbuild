import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, splitProps } from "solid-js";

import { HotkeyLabel } from "../../hotkey_label/hotkey_label";
import "./upgrade_box.less";
import { UpgradeIcon } from "./upgrade_icon";

interface UpgradeBoxProps extends PanelAttributes {
	upgradeID: string;
}

export const UpgradeBox: ParentComponent<UpgradeBoxProps> = (props) => {
	const merged = mergeProps(props, { class: classNames("UpgradeBox", props.class) });
	const [local, others] = splitProps(merged, ["upgradeID"]);
	const kv = createMemo(() => KeyValues.ability_upgrades[local.upgradeID] ?? KeyValues.ability_upgrades_service[local.upgradeID] ?? {});

	return <Panel {...others}>
		<UpgradeIcon upgradeID={local.upgradeID} size="large" />
		<Panel class="UpgradeInfo">
			<Label class="UpgradeName" html text={`#${local.upgradeID}`} />
			<HotkeyLabel class="UpgradeDescription" html text={getKeyValueDescription(GetLocalization(`#${local.upgradeID}_description`), kv().AbilityValues ?? {})} />
		</Panel>
		{props.children}
	</Panel>;
};