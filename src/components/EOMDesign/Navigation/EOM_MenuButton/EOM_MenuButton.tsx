import classNames from "classnames";
import { For, ParentComponent, createSignal, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import "./EOM_MenuButton.less";

interface EOM_MenuButtonsAttribute {
	/** 菜单列表 */
	list: string[];
	/** 操作回调 */
	onToggle?: (menuName: string, state: boolean) => void;
	/** 隐藏 */
	collapse?: boolean;
}

export const EOM_MenuButtons: ParentComponent<EOM_MenuButtonsAttribute> = (props) => {
	const merged = mergeProps({
		onToggle: (menuName: string, state: boolean) => {
			ClientSideEvent("custom_ui_toggle_windows", { windowName: "MenuButton_" + menuName, state: 1 });
		},
		collapse: false
	}, props);
	const [local, others] = splitProps(merged, ["children", "list", "onToggle", "collapse"]);
	const [selectName, setSelectName] = createSignal("");
	const [subscribeEnable, setSubscribeEnable] = createSignal(true);
	onMount(() => {
		let gameEventListeners: GameEventListenerID[] = [];
		gameEventListeners.push(useClientSideEvent("custom_ui_toggle_windows", (eventData) => {
			const name = eventData.windowName.replace("MenuButton_", "");
			if (eventData.state == undefined) {
				if (selectName() == name) {
					setSelectName("");
				} else {
					setSelectName(name);
				}
			} else {
				if (eventData.state == 1) {
					setSelectName(name);
				} else {
					setSelectName("");
				}
			}
		}));
		onCleanup(() => {
			for (const id of gameEventListeners) {
				GameEvents.Unsubscribe(id);
			}
		});
	});
	return (
		<Panel id="LeftTopMain" class={classNames("InitHide", { InitAnimation: !local.collapse })} hittest={false}>
			<Panel id="EOM_MenuButtons">
				<For each={local.list}>
					{(name, index) => {
						return (
							<Button id={"EOM_MenuButtons_" + name} class={classNames("EOM_MenuButton", { IsActive: selectName() == name })} onactivate={self => {
								if (local.onToggle) {
									setSubscribeEnable(false);
									local.onToggle(name, selectName() == name ? false : true);
									setSubscribeEnable(true);
								}
								setSelectName(selectName() == name ? "" : name);
							}} >
								<Image id={`${name}Icon`} class="LeftTopButtonIcon" backgroundImage={getImagePath("icon/" + name + ".png")} />
								<Image id={`${name}Icon`} class="LeftTopButtonIcon" backgroundImage={getImagePath("icon/" + name + ".png")} />
								<Label text={"#MenuButton_" + name} />
							</Button>
						);
					}}
				</For>
			</Panel>
		</Panel>
	);
};


interface EOM_MenuButtonAttribute {
	/** 菜单名 */
	menuName: string;
	/** 图标 */
	icon?: JSX.Element;
}
/** 左上角按钮组，RPG常用 */
export const EOM_MenuButton: ParentComponent<EOM_MenuButtonAttribute & PanelAttributes> = (props) => {
	const [hasMark, setHasMark] = createSignal(false);
	const [selected, setSelected] = createSignal(false);
	const merged = mergeProps(props, { class: "EOM_MenuButton" });
	const [local, others] = splitProps(merged, ["menuName", "icon"]);
	const { menuName, icon } = local;
	return (
		<TabButton selected={selected()} {...others}  >
			<Label class="EOM_MenuLabel" text={"#" + menuName} />
			{hasMark() &&
				<Image class="EOM_MenuExclamationMark" />
			}
			{icon}
		</TabButton>
	);
};