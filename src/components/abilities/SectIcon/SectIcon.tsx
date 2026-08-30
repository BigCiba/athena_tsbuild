import classNames from "classnames";
import { ParentComponent, createMemo, mergeProps, splitProps } from "solid-js";
import "./SectIcon.less";
interface SectIconAttribute extends PanelAttributes {
	sectName: string;
	/** 没激活就是灰图 */
	active?: boolean;
	// 大号
	large?: boolean;
}

export const SectIcon: ParentComponent<SectIconAttribute> = (props) => {
	const merged = mergeProps({
		active: true,
		large: false
	}, props);
	const [local, others] = splitProps(merged, ["children", "sectName", "active", "large", "class"]);
	const sectClass = createMemo(() => classNames("SectIcon", local.class, local.sectName, {
		Active: local.active ?? true,
		Large: local.large ?? false
	}));
	return (
		<Panel {...others} class={sectClass()}>
			<Image class="SectImage" />
		</Panel>
	);
};
