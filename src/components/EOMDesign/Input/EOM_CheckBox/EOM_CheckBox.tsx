import { mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_CheckBox.less";
import classNames from "classnames";

export const EOM_CheckBox: ParentComponent<ToggleButtonAttributes> = (props) => {
	const merged = mergeProps(props, { class: "EOM_CheckBox" });
	const [local, other] = splitProps(merged, ["text"]);
	return (
		<ToggleButton {...other}>
			<Label text={local.text} />
		</ToggleButton>
	);
};


export function EOM_CheckBox2(props: { text: string | number, onchecked?: (b: boolean, p: Panel) => void; } & PanelAttributes) {
	const [local, others] = splitProps(props, ["text", "onchecked", "class"]);

	return (
		<Panel  {...others} class={classNames("EOM_CheckBox2", local.class)}
			onactivate={(p) => {
				p.checked = !p.checked;
				local.onchecked?.(p.checked, p);
			}}>
			<Panel id="CheckBox" >
				<Panel id="CheckBoxTick" />
			</Panel>
			<Label class="CheckLabel" text={local.text} html />
		</Panel>
	);
}