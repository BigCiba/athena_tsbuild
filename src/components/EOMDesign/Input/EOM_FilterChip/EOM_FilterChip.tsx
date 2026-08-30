import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import "./EOM_FilterChip.less";

interface EOM_FilterChipAttribute extends PanelAttributes<Button> {
	selected?: boolean;
	text?: string;
	count?: string | number;
	dotColor?: string;
}

export const EOM_FilterChip: ParentComponent<EOM_FilterChipAttribute> = (props) => {
	const merged = mergeProps({
		selected: false,
		dotColor: "#9eb4ca",
	}, props);
	const [local, others] = splitProps(merged, ["children", "class", "selected", "text", "count", "dotColor"]);

	return (
		<Button
			{...others}
			class={classNames("EOM_FilterChip", local.class, {
				Selected: local.selected,
			})}
		>
			<Panel class="EOM_FilterChip_Dot" style={{ backgroundColor: local.dotColor }} />
			<Label class="EOM_FilterChip_Label" text={local.text} />
			<Label class="EOM_FilterChip_Count" text={local.count != undefined ? String(local.count) : ""} />
			{local.children}
		</Button>
	);
};