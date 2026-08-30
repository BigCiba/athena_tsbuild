import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import "./EOM_SectionDivider.less";

interface EOM_SectionDividerProps extends PanelAttributes {
	text?: string;
}

/**
 * 章节分隔线组件 - 左右两条线 + 中间标题文字
 */
export function EOM_SectionDivider(props: EOM_SectionDividerProps) {
	const merged = mergeProps(props, { class: classNames("EOM_SectionDivider", props.class) });
	const [local, others] = splitProps(merged, ["text"]);
	return (
		<Panel  {...others} >
			<Image class="LineLeft" />
			<Label class="TitleLabel" text={local.text} />
			<Image class="LineRight" />
		</Panel>
	);
}
