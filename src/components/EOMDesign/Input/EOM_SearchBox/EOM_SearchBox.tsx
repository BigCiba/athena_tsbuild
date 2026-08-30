import classNames from "classnames";
import { createEffect, createMemo, createSignal, mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_SearchBox.less";

interface EOM_SearchBoxAttribute extends PanelAttributes {
	/** 文本变化时回调 */
	onChange?: (self: TextEntry, previousText: string, changedText: string) => void;
	/** 搜索文本变化时回调 */
	onSearch?: (text: string) => void;
}

export const EOM_SearchBox: ParentComponent<EOM_SearchBoxAttribute & TextEntryAttributes> = (props) => {
	let textEntry: TextEntry | undefined;
	const merged = mergeProps({
		placeholder: "#DOTA_Search",
	}, props);
	const [local, rootProps] = splitProps(merged, [
		"children",
		"class",
		"onChange",
		"onSearch",
		"oninputsubmit",
		"text",
		"placeholder",
		"multiline",
		"textmode",
		"maxchars"
	]);
	const [text, setText] = createSignal(local.text ?? "");
	const [focused, setFocused] = createSignal(false);

	createEffect(() => {
		const nextText = local.text;
		if (nextText === undefined) {
			return;
		}
		setText(nextText);
		if (textEntry !== undefined && textEntry.text !== nextText) {
			textEntry.text = nextText;
		}
	});

	const rootClass = createMemo(() => classNames("EOM_SearchBox", local.class, {
		Focused: focused()
	}));

	const emitChange = (self: TextEntry) => {
		const previousText = text();
		const changedText = self.text;
		if (local.onChange !== undefined) {
			local.onChange(self, previousText, changedText);
		}
		if (local.onSearch !== undefined) {
			local.onSearch(changedText);
		}
		setText(changedText);
	};

	return (
		<Panel {...rootProps} class={rootClass()}>
			<Image class="EOM_SearchBox_Icon" scaling="stretch" src="s2r://panorama/images/control_icons/24px/search.vsvg" />
			<TextEntry
				class="EOM_SearchBox_Input"
				placeholder={local.placeholder}
				multiline={local.multiline}
				textmode={local.textmode}
				// maxchars={local.maxchars}
				ontextentrychange={emitChange}
				oninputsubmit={self => {
					if (local.oninputsubmit !== undefined) {
						local.oninputsubmit(self);
					}
					emitChange(self);
				}}
				onload={self => {
					textEntry = self;
					self.text = text();
					self.SetDisableFocusOnMouseDown(false);
					self.SetPanelEvent("onfocus", () => {
						setFocused(true);
					});
					self.SetPanelEvent("onblur", () => {
						setFocused(false);
						$.DispatchEvent("DropInputFocus", self);
					});
				}}
			>
				{local.children}
			</TextEntry>
		</Panel>
	);
};