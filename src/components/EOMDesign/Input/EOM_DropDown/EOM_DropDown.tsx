import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { ParentComponent, children, createEffect, getOwner, mergeProps, onCleanup, onMount, runWithOwner, splitProps } from "solid-js";
import "./EOM_DropDown.less";

/** 找到最顶层 */
let menuRoot: Panel;
let timer: number;

const createDropDownContainer = (panel: Panel) => {
	// const layoutFile = panel.layoutfile;
	while (panel.GetParent() != undefined) {
		panel = panel.GetParent() as Panel;
	}
	let EOM_DropDownContainer = panel.FindChildTraverse("EOM_DropDownContainer") as Panel;
	/** 创建一个全屏的DropDown容器 */
	if (panel != undefined && EOM_DropDownContainer == undefined) {
		EOM_DropDownContainer = $.CreatePanel("Panel", panel, "EOM_DropDownContainer", { style: "width: 100%; height: 100%; z-index: 99999;" });
		EOM_DropDownContainer.visible = false;
		EOM_DropDownContainer.SetPanelEvent("onactivate", () => {
			// 隐藏DropDown
			EOM_DropDownContainer.visible = false;
			EOM_DropDownContainer?.FindChildrenWithClassTraverse("EOM_DropDownMenu").forEach((child) => {
				child.visible = false;
			});
		});

	}

	menuRoot = EOM_DropDownContainer;
};

interface EOM_DropDownProp extends PanelAttributes {
	/** 没有初始选择时显示的文字 */
	placeholder?: string;
	/** 初始选择 */
	index?: number;
	/** 样式类型 */
	type?: string;
	/** 下拉宽度 */
	customWidth?: number | string;
	/** 菜单位置，默认在下面 */
	menuPosition?: "top" | "bottom",
	/** 是否有清空选项 */
	hasClear?: boolean;
	/** 点击选项时触发，返回 false 时拦截内部选中变化 */
	onSelect?: (index: number, item: LabelPanel) => boolean | void;
	/** 当选择改变时 */
	onChange?: (index: number, item: LabelPanel) => void;
	/** 当清除选项 */
	onClear?: () => void;
};
function doUniqueString(str: string) {
	if (GameUI.CustomUIConfig()._Record_UniqueString == undefined) {
		GameUI.CustomUIConfig()._Record_UniqueString = 0;
	}
	let result = "_" + Math.random().toString().substring(2, 8) + GameUI.CustomUIConfig()._Record_UniqueString + "_" + str;
	GameUI.CustomUIConfig()._Record_UniqueString++;
	return result;
}
export const EOM_DropDown: ParentComponent<EOM_DropDownProp> = (props) => {
	const mergerd = mergeProps({ id: doUniqueString("EOM_DropDown"), menuPosition: "bottom", index: -1, hasClear: false }, props, { class: classNames("EOM_DropDown", props.class, props.type) });
	const [local, others] = splitProps(mergerd, ["children", "width", "index", "placeholder", "onSelect", "onChange", "onClear", "type", "id", "menuPosition", "hasClear"]);

	const getCustomWidth = () => {
		if (props.customWidth == undefined) {
			return undefined;
		}
		const widthText = String(props.customWidth).trim();
		const match = widthText.match(/^([0-9]+(?:\.[0-9]+)?)px$/i);
		if (match === null) {
			return undefined;
		}
		return Number(match[1]);
	};

	let selfRef: Button | undefined;
	let myMenu: Panel | undefined;

	const isOptionChild = (child: Panel | null | undefined): child is Panel => {
		return child != undefined && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow";
	};

	const getOptionChild = (button: Button, targetIndex: number) => {
		let optionIndex = 0;
		for (let index = 0; index < button.GetChildCount(); index++) {
			const child = button.GetChild(index);
			if (!isOptionChild(child)) {
				continue;
			}
			if (optionIndex === targetIndex) {
				return child as LabelPanel;
			}
			optionIndex++;
		}
		return undefined;
	};

	const syncSelectedIndex = (selectedIndex: number | undefined) => {
		if (selfRef == undefined) {
			return;
		}

		let optionIndex = 0;
		let hasSelected = false;
		for (let index = 0; index < selfRef.GetChildCount(); index++) {
			const child = selfRef.GetChild(index);
			if (!isOptionChild(child)) {
				continue;
			}

			child.visible = optionIndex === selectedIndex;
			hasSelected = hasSelected || child.visible;
			optionIndex++;
		}

		const placeholder = selfRef.FindChildTraverse("EOM_DropDown_placeholder") as Panel | null;
		if (placeholder != undefined) {
			placeholder.visible = !hasSelected;
		}
	};

	const commitSelectedIndex = (childIndex: number, item: LabelPanel) => {
		syncSelectedIndex(childIndex);
		local.onChange?.(childIndex, item);
	};

	onMount(() => {
		if (selfRef) {
			syncSelectedIndex(local.index);
			createDropDownContainer(selfRef);
		}
	});

	createEffect(() => {
		syncSelectedIndex(local.index);
	});

	// ✅ 应该完全删除
	onCleanup(() => {
		if (myMenu && myMenu.IsValid()) {
			myMenu.DeleteAsync(0);
		}
	});

	const onClear = () => {
		if (local.onClear) {
			local.onClear();
		}
	};

	const owner = getOwner();

	const createDropDown = (pBtn: Button) => {
		if (myMenu == undefined && selfRef) {
			myMenu = $.CreatePanel("Panel", selfRef, `${local.id}_DropDownMenu`);
			myMenu.AddClass("EOM_DropDownMenu");
			if (local.type)
				myMenu.AddClass(local.type);
			myMenu.visible = true;

			const childrens = runWithOwner(owner, () => {
				return children(() => local.children).toArray();
			});
			if (childrens) {
				if (local.hasClear) {
					let content = $.CreatePanel("RadioButton", myMenu, 'EOM_DropDown_Clear', {
						class: "EOM_DropDownMenuItem",
						group: "EOM_DropDownMenuItem",
					});
					content.SetPanelEvent("onactivate", () => {
						if (pBtn) {
							for (let index = 0; index < pBtn.GetChildCount(); index++) {
								const c = pBtn.GetChild(index) as LabelPanel;
								if (c && c.id != "EOM_DropDown_arrow") {
									c.visible = false;
								}
							}
							onClear();
							(pBtn.FindChildTraverse("EOM_DropDown_placeholder") as Panel).visible = true;
						}
						toggleMenu(pBtn, false);
					});
					render(() => <Label text="#DropDown_Clear" />, content);
				}
				for (let childIndex = 0; childIndex < childrens.length; childIndex++) {
					let content = $.CreatePanel("TabButton", myMenu, '', {
						class: "EOM_DropDownMenuItem",
						group: "EOM_DropDownMenuItem",
					});
					content.SetPanelEvent("onblur", () => {
						// toggleMenu(pBtn, false);
					});
					content.SetPanelEvent("onactivate", () => {
						if (pBtn) {
							const selectedChild = getOptionChild(pBtn, childIndex);
							if (selectedChild?.id === "EOM_DropDown_Clear") {
								syncSelectedIndex(-1);
								onClear();
							} else if (selectedChild != undefined && local.onSelect?.(childIndex, selectedChild) !== false) {
								commitSelectedIndex(childIndex, selectedChild);
							}
						}
						toggleMenu(pBtn, false);
					});
					render(() => childrens[childIndex], content);
				}
			}
			let vPos = pBtn.GetPositionWithinWindow();
			let menuPosition = local.menuPosition;
			let y = Math.max(0, menuPosition == "bottom"
				? vPos.y + pBtn.actuallayoutheight + 2
				: vPos.y - myMenu.actuallayoutheight - 2
			);
			let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
			myMenu.style.maxHeight = (maxHeight / myMenu.actualuiscale_y) + "px";
			//先藏到屏幕外
			myMenu.SetPositionInPixels(
				Game.GetScreenWidth(),
				Game.GetScreenHeight(),
				0
			);
			if (menuRoot != undefined) {
				myMenu.SetParent(menuRoot);
			}
			myMenu.visible = false;
		}
	};

	const toggleMenu = (pBtn: Button, state?: boolean) => {
		if (myMenu == undefined || !myMenu.IsValid()) {
			createDropDown(pBtn);
		}
		if (pBtn && myMenu?.IsValid()) {
			myMenu.visible = state == undefined ? !myMenu.visible : state;
			if (menuRoot != undefined) {
				menuRoot.visible = myMenu.visible;
			}
			myMenu.SetHasClass("EOM_DropDownMenuShow", myMenu.visible);
			if (myMenu.visible) {
				myMenu.SetFocus();
				$.Schedule(0.1, () => {
					if (pBtn && myMenu) {
						const customWidth = getCustomWidth();
						const minWidth = customWidth !== undefined ? customWidth : pBtn.actuallayoutwidth / myMenu.actualuiscale_x;
						myMenu.style.minWidth = minWidth + "px";
						if (customWidth !== undefined) {
							myMenu.style.width = customWidth + "px";
						}
						const childItems = myMenu.FindChildrenWithClassTraverse("EOM_DropDownMenuItem");
						if (childItems && childItems.length > 0) {
							childItems.forEach(item => {
								item.style.width = (minWidth - 10/* border的宽度 */) + "px";
							});
						}

						let vPos = pBtn.GetPositionWithinWindow();

						let menuPosition = local.menuPosition;
						let x = vPos.x;
						let y = Math.max(0, menuPosition == "bottom"
							? vPos.y + pBtn.actuallayoutheight + 2
							: vPos.y - myMenu.actuallayoutheight - 2
						);
						let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
						myMenu.style.maxHeight = (maxHeight / myMenu.actualuiscale_y) + "px";
						if (myMenu.actuallayoutheight > maxHeight) {
							y = Math.max(0, menuPosition == "bottom" ? y : vPos.y - maxHeight);
						}
						myMenu.SetPositionInPixels(
							x / myMenu.actualuiscale_x,
							y / myMenu.actualuiscale_y,
							0
						);
					}
				});
			}
		}
	};

	return (
		<Button ref={selfRef} id={local.id} {...others}
			onactivate={(self) => {
				toggleMenu(self);
			}}
		>
			{local.children}
			<Label id="EOM_DropDown_placeholder" text={local.placeholder && (local.index === undefined || local.index <= 0) ? local.placeholder : ""} />
			<Image id="EOM_DropDown_arrow" />
		</Button>
	);
};
