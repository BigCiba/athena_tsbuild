import { createElement, insert, spread } from "@bigciba/solid-panorama-runtime";
import { createEffect, createMemo, createRoot, createSignal, getOwner, onCleanup, ParentProps, runWithOwner, splitProps } from "solid-js";

interface GenericPanelAttributes<T extends Panel = Panel> extends PanelAttributes<T> {
	type: string;
	[key: string]: any;
}
export function GenericPanel2<T extends Panel = Panel>(props: ParentProps<GenericPanelAttributes<T>>) {
	let [local, other] = splitProps(props, ["type", "children"]);
	return (() => {
		// @ts-ignore
		const el = createElement(local.type, other, null);
		spread(el, other, false);
		insert(el, () => local.children);
		return el;
	})();
};


/**
 * 将组件渲染到mount里而不是parent
 * @param mount 最终渲染到的Panel
 */
export function Portal(props: { mount?: Panel, children?: JSX.Element; }) {
	const mount = () => props.mount;
	let content: undefined | (() => JSX.Element);
	const owner = getOwner();

	createEffect(() => {
		const mountRoot = mount();
		if (!(mountRoot && mountRoot.IsValid())) {
			return;
		}
		content ??= runWithOwner(owner, () => createMemo(() => {
			return props.children;
		}));
		const [clean, setClean] = createSignal(false);
		createRoot(dispose => insert(mountRoot, () => (clean() ? dispose() : content!()), null));
		onCleanup(() => setClean(true));
	}, undefined, { render: true });

	// return {
	// 	IsValid() {
	// 		return false;
	// 	}
	// };
}
