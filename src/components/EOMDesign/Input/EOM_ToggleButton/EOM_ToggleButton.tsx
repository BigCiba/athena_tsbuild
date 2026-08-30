import classNames from "classnames";
import { createSignal, splitProps } from "solid-js";
import "./EOM_ToggleButton.less";

interface EOM_ToggleButtonAttributes extends LabelLikeAttributes<Panel> {
	selected?: boolean;
	defaultSelected?: boolean;
	onselect?: EventHandler<Panel>;
	ondeselect?: EventHandler<Panel>;
	onchange?: (p: Panel, checked: boolean) => void;
	oncontextmenu?: EventHandler<Panel>;
}

export function EOM_ToggleButton(props: EOM_ToggleButtonAttributes) {
	const [local, others] = splitProps(props, ["class", "onactivate", "oncontextmenu", "selected", "defaultSelected", "onselect", "ondeselect", "onchange", "text", "html"]);
	const [innerSelected, setInnerSelected] = createSignal(local.defaultSelected ?? local.selected ?? false);
	const checked = () => local.selected ?? innerSelected();

	return (
		<Panel {...others} class={classNames(local.class, "EOM_ToggleButton")}
			checked={checked()}
			onactivate={p => {
				const newVar = !checked();
				if (local.selected === undefined) {
					setInnerSelected(newVar);
				}
				if (newVar) {
					local.onselect?.(p);
				} else {
					local.ondeselect?.(p);
				}
				local.onchange?.(p, newVar);

				if (typeof local.onactivate == "function")
					local.onactivate?.(p);
			}}
			oncontextmenu={p => {
				local.oncontextmenu?.(p);
			}}
		>
			<Panel id="ToggleBox">
				<Panel id="ToggleBoxRing" />
				<Panel id="ToggleBoxTick" />
			</Panel>
			<Label text={local.text ?? ""} html={local.html ?? false} />
		</Panel>
	);
}