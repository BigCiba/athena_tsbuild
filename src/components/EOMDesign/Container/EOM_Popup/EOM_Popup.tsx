import classNames from "classnames";
import { ParentComponent, Show, createEffect, mergeProps, splitProps } from "solid-js";
import { EOM_CloseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_Popup.less";

interface EOM_Popup_Attribute extends PanelAttributes {
	title?: string;
	/** 只适配C4 预设的窗口大小，如果传入了长宽该属性无效 */
	size?: "normal" | "small" | "large";
	popType?: "PopupType_LeftTop" | "PopupType_PopOut";
	/** 隐藏关闭按钮 */
	hideClose?: boolean;
	onClose?: () => void;
}

/** 新的弹窗通用样式 */
export const EOM_Popup: ParentComponent<EOM_Popup_Attribute & PanelAttributes> = (props) => {
	const merged = mergeProps({
		popType: "PopupType_LeftTop",
		hideClose: false,
		size: "normal",
		onClose: () => { }
	}, props, { class: classNames("EOM_PopupMain", props.popType ?? "PopupType_LeftTop", props.size ?? "normal", { hideTitle: props.title == undefined }) });
	const [local, others] = splitProps(merged, ["children", "title", "size", "popType", "hideClose", "onClose"]);
	return (
		<Panel {...others} onactivate={() => { }} >
			<Image class="EOM_PopupBG" hittest={false} />
			<Show when={local.title != undefined && local.title != ""}>
				<Label class="EOM_PopupTitle" text={local.title} />
			</Show>
			<Show when={!local.hideClose}>
				<EOM_CloseButton onactivate={() => local.onClose()} />
			</Show>
			<Panel hittest={false} class="EOM_PopupContent">
				{local.children}
			</Panel>
		</Panel>
	);
};