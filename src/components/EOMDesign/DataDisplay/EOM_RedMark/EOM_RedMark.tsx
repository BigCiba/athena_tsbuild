import classNames from "classnames";
import { mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import "./EOM_RedMark.less";

export interface EOM_RedMarkAttribute extends PanelAttributes {
	/** 红点类型 */
	type?: "dot" | "exclamation" | "new";
	/** 红点大小 */
	size?: "small" | "medium" | "large";
	/** 是否有呼吸动画 */
	breathe?: boolean;
	/** 红点数字（可选，显示在红点中的数字） */
	count?: number;
	/** 数字最大值，超过显示为 99+ */
	maxCount?: number;
}

export const EOM_RedMark: ParentComponent<EOM_RedMarkAttribute> = (props) => {
	const merged = mergeProps(
		{
			type: "dot",
			size: "medium",
			breathe: false,
			maxCount: 99
		},
		props,
		{
			class: classNames(
				"EOM_RedMark",
				`Type-${props.type ?? "dot"}`,
				`Size-${props.size ?? "medium"}`,
				{
					"EOM_RedMark-Breathe": props.breathe ?? "false",
				},
				props.class
			)
		}
	);
	const [local, others] = splitProps(merged, ["children", "type", "size", "breathe", "count", "maxCount"]);

	const displayCount = () => {
		if (local.count === undefined || local.count <= 0) return "";
		if (local.count > local.maxCount!) return `${local.maxCount}+`;
		return local.count.toString();
	};

	return (
		<Panel {...others}>
			<Image class="EOM_RedMark-Dot" hittest={false} />
			<Show when={local.type === "dot" && local.count !== undefined && local.count > 0}>
				<Label class="EOM_RedMark-Count" text={displayCount()} hittest={false} />
			</Show>
			{local.children}
		</Panel>
	);
};
