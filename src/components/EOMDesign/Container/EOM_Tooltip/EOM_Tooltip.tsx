import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import "./EOM_Tooltip.less";

interface EOM_Tooltip_Attribute extends PanelAttributes { }

export const EOM_Tooltip: ParentComponent<EOM_Tooltip_Attribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_Tooltip", props.class) });
	const [local, others] = splitProps(merged, ["children"]);
	return <Panel {...others} >
		{local.children}
	</Panel>;
};