import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import "./EOM_Separator.less";

export interface EOM_SeparatorAttribute extends PanelAttributes {
	// 仅用于调节C4款式的长度
	size?: "normal" | "short" | "symmetric" | "symmetric_long";
	// 长度
	length?: "fit-children" | `fill-parent-flow(${number})` | `${number}px` | `${number}%` | string;
	// 方向， (C4 默认水平方向，不支持垂直方向)
	direction?: "vertical" | "horizontal";
}

/** 分割线 */
export const EOM_Separator: ParentComponent<EOM_SeparatorAttribute> = (props) => {
	const merged = mergeProps({ size: "normal", direction: "horizontal" }, props, { class: classNames("EOM_Separator", props.direction, "Size_" + props.size) });
	const [local, others] = splitProps(merged, ["direction", "length", "size"]);
	const defaultStyle = () => {
		if (local.direction == "horizontal") {
			return { width: local.length };
		} else if (local.direction == "vertical") {
			return { height: local.length };
		}
		return {};
	};
	return (
		<Panel {...others} style={defaultStyle()} />
	);
};