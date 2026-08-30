import classNames from "classnames";
import { For, mergeProps, ParentComponent, Show, splitProps } from "solid-js";
import "./EOM_ImageNumber.less";

interface EOMImageNumberAttribute extends PanelAttributes {
	value: number,
	type: "1" | "2" | "3" | "4" | "5" | "6" | "7",
	percentSign?: boolean,
}

export const EOM_ImageNumber: ParentComponent<EOMImageNumberAttribute> = (props) => {
	const merged = mergeProps(props, { class: "EOM_ImageNumber" + props.type });
	const [local, others] = splitProps(merged, ["value", "type", "percentSign"]);
	return (
		<Panel {...others}>
			<For each={String(local.value).split("")}>
				{(num, index) => <Image class={classNames("EOM_NUM", "EOM_NUM_" + num)} />}
			</For>
			<Show when={local.percentSign}>
				<Image class="EOM_PercentSign" />
			</Show>
		</Panel>
	);
};