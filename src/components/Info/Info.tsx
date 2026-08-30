import classNames from "classnames";
import { createMemo, mergeProps, splitProps } from "solid-js";
import "./Info.less";

interface InfoIconProps extends PanelAttributes {
	text: string;
	src?: string;
	color?: string;
};
export function Info(props: InfoIconProps) {
	const merged = mergeProps(props, { class: classNames("Info", props.class) });
	const [local, others] = splitProps(merged, ["tooltip_text", "text", "src", "color"]);
	const tooltip = createMemo(() => local.tooltip_text ?? (local.text + "_desc"));
	return <Panel {...others} tooltip_text={tooltip()}>
		<Image id="InfoIcon" src={local.src} />
		<Panel id="InfoLabel">
			<Label text={local.text} style={{ color: local.color }} />
		</Panel>
	</Panel>;
}
