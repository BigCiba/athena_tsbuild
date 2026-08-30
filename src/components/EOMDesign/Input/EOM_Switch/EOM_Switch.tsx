import classNames from "classnames";
import { createSignal, splitProps } from "solid-js";
import "./EOM_Switch.less";

interface EOM_SwitchAttributes extends PanelAttributes {
	/** 受控模式：当前选中状态 */
	selected?: boolean;
	/** 非受控模式：初始选中状态 */
	defaultSelected?: boolean;
	/** 状态切换回调 */
	onchange?: (p: Panel, checked: boolean) => void;
}

export function EOM_Switch(props: EOM_SwitchAttributes) {
	const [local, others] = splitProps(props, [
		"class",
		"selected",
		"defaultSelected",
		"onchange",
		"onactivate",
	]);

	const [innerSelected, setInnerSelected] = createSignal(
		local.defaultSelected ?? local.selected ?? false
	);
	const checked = () => local.selected ?? innerSelected();

	return (
		<Panel
			{...others}
			class={classNames("EOM_Switch", local.class)}
			checked={checked()}
			onactivate={(p) => {
				const newChecked = !checked();
				if (local.selected === undefined) {
					setInnerSelected(newChecked);
				}
				local.onchange?.(p, newChecked);
				if (typeof local.onactivate === "function") {
					local.onactivate(p);
				}
			}}
		>
			<Panel class="EOM_Switch_Track">
				<Panel class="EOM_Switch_Spacer" />
				<Panel class="EOM_Switch_Thumb" />
			</Panel>
		</Panel>
	);
}
