import classNames from "classnames";
import { Index, ParentComponent, Show, batch, createEffect, createMemo, createSignal, mergeProps, on, onCleanup, onMount, splitProps, untrack } from "solid-js";
import { createStore } from "solid-js/store";
import { usePlayerMaxAbyssalDiff, usePlayerMaxDiff } from "../../../service_utils/service_netdata_helper";
import { EOM_RedMark } from "../../DataDisplay/EOM_RedMark/EOM_RedMark";
import { EOM_CloseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_MenuLayout.less";
const playerMaxDiff = usePlayerMaxDiff();
const playerMaxAbyssalDiff = usePlayerMaxAbyssalDiff();

type MenuLockRequirement = {
	requiredDiff: number;
	type: "common" | "abyssal";
};

function parseMenuLockConfig(rawValue: string): Record<string, number> {
	if (rawValue == "") {
		return {};
	}
	const result: Record<string, number> = {};
	const rows = rawValue.split("|");
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		if (row == "") {
			continue;
		}
		const [menuKey, diffText] = row.split(":");
		const requiredDiff = Number(diffText);
		if (menuKey && Number.isFinite(requiredDiff) && requiredDiff > 0) {
			result[menuKey] = requiredDiff;
		}
	}
	return result;
}

/** 【store】 */
export const useEOM_MenuLayout = (eventName: string) => {
	const [show, setShow] = createSignal(false);
	const [menuName, setMenuName] = createSignal(false);
	onMount(() => {
		let gameEventIDList: GameEventListenerID[] = [];
		// 切换窗口
		gameEventIDList.push(useToggleWindow(eventName, show, setShow));

		onCleanup(() => {
			for (const id of gameEventIDList) {
				GameEvents.Unsubscribe(id);
			}
		});
	});
	return {
		show,
		setShow,
	};
};

export interface EOM_MenuLayoutProps extends PanelAttributes {
	// 隐藏或显示
	show: boolean;
	/** 面板名字，用来关闭界面 */
	name: string;

	backgroundChildren?: JSX.Element[];
	renderOnShow?: boolean;
	close?: () => void;
}

/** 【布局】全屏的二级界面，拥有导航菜单栏 */
export const EOM_MenuLayout: ParentComponent<EOM_MenuLayoutProps> = (props) => {
	const merged = mergeProps({ renderOnShow: false }, props);
	const [local, others] = splitProps(merged, ["children", "renderOnShow", "name", "show", "close", "backgroundChildren", "class"]);

	const mergedClass = createMemo(() => classNames(
		"EOM_MenuLayout",
		local.class
	));

	return (
		<Panel
			{...others}
			class={mergedClass()}
			classList={{ Show: local.show }}
			onactivate={() => { }}>
			{local.backgroundChildren}
			<Image id="TopBottomBG" hittest={false} />
			<EOM_CloseButton onactivate={self => {
				if (local.close != undefined) {
					local.close();
				} else {
					ClientSideEvent("custom_ui_toggle_windows", { windowName: local.name, state: 0 });
				}
			}} />
			<Show when={(!local.renderOnShow || local.show)}>
				{untrack(() => local.children)}
			</Show>
		</Panel>
	);
};


export type MenuToggleSource = "click" | "jump" | "api";

export interface MenuToggleGuardContext {
	fromMenu: string;
	fromMenu2?: string;
	toMenu: string;
	toMenu2?: string;
	source: MenuToggleSource;
}

export type MenuToggleGuardResult = boolean | string | {
	allow: boolean;
	message?: string;
	sound?: string;
};

export interface CreateMenuLayoutOptions {
	defaultShow?: boolean;
	windowNameOverride?: string;
	/** 在隐藏窗口即将显示、且菜单跳转合法性校验之前调用。 */
	beforeShow?: () => void;
	canToggleMenu?: (context: MenuToggleGuardContext) => MenuToggleGuardResult | undefined;
}

const DEFAULT_MENU_TOGGLE_BLOCKED_MESSAGE = "#MenuLayout_CannotSwitch";

export function createMenuLayout(name: string, menuList: () => Record<string, string[]>, options?: CreateMenuLayoutOptions): ReturnType<typeof createMenuLayoutImpl>;
export function createMenuLayout(name: string, menuList: () => Record<string, string[]>, defaultShow?: boolean, windowNameOverride?: string, options?: CreateMenuLayoutOptions): ReturnType<typeof createMenuLayoutImpl>;
export function createMenuLayout(
	name: string,
	menuList: () => Record<string, string[]>,
	defaultShowOrOptions?: boolean | CreateMenuLayoutOptions,
	windowNameOverride?: string,
	extraOptions?: CreateMenuLayoutOptions
) {
	const options = typeof defaultShowOrOptions === "object"
		? defaultShowOrOptions
		: {
			...extraOptions,
			defaultShow: defaultShowOrOptions ?? extraOptions?.defaultShow,
			windowNameOverride: windowNameOverride ?? extraOptions?.windowNameOverride,
		};
	return createMenuLayoutImpl(name, menuList, options);
}

function createMenuLayoutImpl(name: string, menuList: () => Record<string, string[]>, options: CreateMenuLayoutOptions = {}) {
	const windowName = options.windowNameOverride ?? "MenuButton_" + name;

	const [show, setShowSignal] = createSignal(options.defaultShow ?? false);
	const prepareToShow = () => {
		if (!show()) {
			options.beforeShow?.();
		}
	};
	const setShow = (value: boolean | ((previous: boolean) => boolean)) => {
		const nextShow = typeof value === "function" ? value(show()) : value;
		if (nextShow) {
			prepareToShow();
		}
		return setShowSignal(() => nextShow);
	};
	const [menuName, setMenuName] = createSignal(Object.keys(menuList())[0] ?? "");
	const [jumpInfo, setJumpInfo] = createSignal<Parameters<typeof JumpToMenu>[0] | undefined>();
	const [menuSelected, setMenuSelected] = createStore<Record<string, string>>({});
	const menuLockConfigMap = createMemo(() => {
		return parseMenuLockConfig(KeyValues.game_setting?.menu_lock?.value ?? "");
	});
	const menuAbyssalLockConfigMap = createMemo(() => {
		return parseMenuLockConfig(KeyValues.game_setting?.menu_abyssal_lock?.value ?? "");
	});
	const getMenuAbyssalLockRequiredDiff = (menu: string, menu2?: string): number | undefined => {
		const abyssalConfigMap = menuAbyssalLockConfigMap();
		if (menu2 != undefined && abyssalConfigMap[menu2] != undefined) {
			return abyssalConfigMap[menu2];
		}
		return abyssalConfigMap[menu];
	};
	const isAbyssalMenuUnlocked = (menu: string, menu2?: string): boolean => {
		const requiredDiff = getMenuAbyssalLockRequiredDiff(menu, menu2);
		return requiredDiff == undefined || playerMaxAbyssalDiff() >= requiredDiff;
	};
	const getMenuLockRequirement = (menu: string, menu2?: string): MenuLockRequirement | undefined => {
		const commonConfigMap = menuLockConfigMap();
		const abyssalConfigMap = menuAbyssalLockConfigMap();
		if (menu2 != undefined && commonConfigMap[menu2] != undefined) {
			return { requiredDiff: commonConfigMap[menu2], type: "common" };
		}
		if (menu2 != undefined && abyssalConfigMap[menu2] != undefined) {
			return { requiredDiff: abyssalConfigMap[menu2], type: "abyssal" };
		}
		if (commonConfigMap[menu] != undefined) {
			return { requiredDiff: commonConfigMap[menu], type: "common" };
		}
		if (abyssalConfigMap[menu] != undefined) {
			return { requiredDiff: abyssalConfigMap[menu], type: "abyssal" };
		}
		return undefined;
	};
	const isMenuUnlocked = (menu: string, menu2?: string): boolean => {
		const requirement = getMenuLockRequirement(menu, menu2);
		if (requirement == undefined) {
			return true;
		}
		return requirement.type === "abyssal"
			? playerMaxAbyssalDiff() >= requirement.requiredDiff
			: playerMaxDiff() >= requirement.requiredDiff;
	};
	const showBlockedMessage = (message?: string, sound?: string) => {
		const text = message ?? DEFAULT_MENU_TOGGLE_BLOCKED_MESSAGE;
		if (text == undefined || text === "") {
			return;
		}
		if (sound != undefined) {
			ErrorMessage(text, sound);
		} else {
			ErrorMessage(text);
		}
	};
	const canToggleMenu = (menu: string, menu2: string | undefined, source: MenuToggleSource) => {
		const requirement = getMenuLockRequirement(menu, menu2);
		if (requirement != undefined && !isMenuUnlocked(menu, menu2)) {
			showBlockedMessage(LocalizeWithVars(
				requirement.type === "abyssal" ? "#MenuLayout_AbyssalLock" : "#MenuLayout_Lock",
				{ value: requirement.requiredDiff }
			));
			return false;
		}
		if (options.canToggleMenu == undefined) {
			return true;
		}
		const result = options.canToggleMenu({
			fromMenu: menuName(),
			fromMenu2: menuSelected[menuName()],
			toMenu: menu,
			toMenu2: menu2,
			source,
		});
		if (result === undefined || result === true) {
			return true;
		}
		if (result === false) {
			showBlockedMessage();
			return false;
		}
		if (typeof result === "string") {
			showBlockedMessage(result);
			return false;
		}
		if (result.allow) {
			return true;
		}
		showBlockedMessage(result.message, result.sound);
		return false;
	};

	createEffect(on(menuList, (list) => {
		let result: Record<string, string> = {};
		if (list) {
			for (const key in list) {
				const element = list[key];
				result[key] = element[0];
			}
			setMenuSelected(result);
			setMenuName(Object.keys(list)[0] ?? "");
		}
	}));

	createEffect(on(show, (visible) => {
		if (!visible) {
			setJumpInfo(undefined);
		}
	}));

	let LayoutMenu = () => {
		return (
			<EOM_MenuLayout_Menu
				menuName={name}
				menuList={menuList()}
				show={show()}
				selectedMenu={menuName()}
				selectedMenu2={menuSelected[menuName()]}
				isMenuUnlocked={isMenuUnlocked}
				onToggleMenu={(menu, menu2) => {
					if (!canToggleMenu(menu, menu2, "click")) {
						return;
					}
					if (menu) {
						setMenuName(menu);
					}
					if (menu2) {
						setMenuSelected({ [menu]: menu2 });
					}
					// 数据打点
					GameUI.CustomUIConfig().ReportClick(name, menu2 ?? menu);
				}}
			/>
		);
	};

	onMount(() => {
		const gameEventListeners: GameEventListenerID[] = [];
		gameEventListeners.push(
			useClientSideEvent("custom_ui_toggle_windows", (eventData) => {
				if (eventData.windowName == windowName) {
					if (eventData.state === undefined) {
						const nextShow = !show();
						setShow(nextShow);
						if (!nextShow) {
							setJumpInfo(undefined);
						}
					} else {
						const nextShow = eventData.state == 1 || eventData.state === true;
						setShow(nextShow);
						if (!nextShow) {
							setJumpInfo(undefined);
						}
					}
				} else {
					setShow(false);
					setJumpInfo(undefined);
				}
			})
		);
		// 快速跳转到指定菜单
		gameEventListeners.push(
			useClientSideEvent("toggle_window_tag", (event: Parameters<typeof JumpToMenu>[0]) => {

				if (event.window_name == windowName) {
					prepareToShow();
					batch(() => {
						const menuEntry = event.menu && menuList()[event.menu];
						const menu2Valid = !!(menuEntry && event.menu2 && menuEntry.includes(event.menu2));
						if (menu2Valid) {
							if (!canToggleMenu(event.menu!, event.menu2!, "jump")) {
								return;
							}
							setMenuSelected({ [event.menu!]: event.menu2! });
						}
						const toggle = event.force || menu2Valid;
						if (toggle) {
							if (event.menu && !canToggleMenu(event.menu, menu2Valid ? event.menu2 : undefined, "jump")) {
								return;
							}
							if (menuEntry) {
								setMenuName(event.menu!);
							}
							setJumpInfo(event);
							ToggleWindow(event.window_name, true);
						}
					});
				}
			})
		);

		onCleanup(() => gameEventListeners.forEach(id => GameEvents.Unsubscribe(id)));
	});
	return {
		LayoutMenu,
		show, setShow,
		jumpInfo,
		menuName,
		getMenuAbyssalLockRequiredDiff,
		isAbyssalMenuUnlocked,
		secondTabName: () => menuSelected[menuName()] ?? menuList()[menuName()]?.[0] ?? "",
		setMenuName: (menu: string, menu2?: string) => {
			if (!canToggleMenu(menu, menu2, "api")) {
				return;
			}
			batch(() => {
				setMenuName(menu);
				if (menu2 == undefined) {
					menu2 = menuList()[menu][0];
				}
				setMenuSelected(menu, menu2 ?? "");
			});
		},
		setSecondTabName: (menu2: string) => {
			setMenuSelected(menuName(), menu2);
		}
	};
}
export interface EOM_MenuLayout_MenuProps extends PanelAttributes {
	menuName: string;
	/** 二级菜单 */
	menuList: Record<string, string[]>;
	/** 指定选择某个menu，功能可以是指定初始选择，也可以通过更新该值在外部控制当前选择项 */
	selectedMenu: string;
	selectedMenu2?: string;
	/** 切换菜单的回调 */
	onToggleMenu: (menu: string, menu2?: string) => void;
	/** 菜单是否已解锁 */
	isMenuUnlocked?: (menu: string, menu2?: string) => boolean;
	/** 按键的专属角标 */
	mark_icon?: (menu: string, menu2?: string) => JSX.Element | undefined;
	show?: boolean;
}
/** 【布局】菜单栏 */
export const EOM_MenuLayout_Menu: ParentComponent<EOM_MenuLayout_MenuProps> = (props) => {
	const sLanguage = Language();

	const merged = mergeProps({ menuList: [] }, props, { class: classNames("EOM_MenuLayout_Menu") });
	const [local, others] = splitProps(merged, ["menuList", "onToggleMenu", "selectedMenu", "selectedMenu2", "menuName", "mark_icon", "show", "isMenuUnlocked"]);

	// 红点
	const [_key, SetKey] = createSignal(1);
	onMount(() => {
		let gameEventIDList: GameEventListenerID[] = [];
		gameEventIDList.push(CustomUIConfig.SubscribeRedPointChange((menuName) => {
			SetKey(k => k + 1);
		}, props.menuName));
		onCleanup(() => {
			for (const id of gameEventIDList) {
				GameEvents.Unsubscribe(id);
			}
		});
	});

	return (
		<Panel hittest={false}
			{...others}
			classList={{ Show: local.show ?? false }}
		>
			<Index each={Object.keys(local.menuList)}>
				{(menu, index) => {
					const menuIcon = () => {
						if (local.mark_icon) {
							return local.mark_icon(menu());
						}
					};
					const hasSecondaryMenu = createMemo(() => {
						let list = local.menuList[menu()];
						return list != undefined && list.length > 0;
					});

					const red = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu());
					const locked = () => local.isMenuUnlocked != undefined && !local.isMenuUnlocked(menu());

					// 选中菜单后滚动位置让整个菜单显示，防止太长的菜单在屏幕外
					let refMenu: Panel | undefined;
					createEffect((old?: boolean) => {
						let selected = local.selectedMenu == menu();
						if (old != selected && selected && refMenu?.IsValid()) {
							$.Schedule(0.1 + Game.GetGameFrameTime(), () => {
								if (!refMenu?.IsValid()) return;
								let parent = refMenu.GetParent();
								if (!parent?.IsValid()) return;
								let position = refMenu.GetPositionWithinAncestor(parent);
								if (position.y + refMenu.actuallayoutheight > parent.actuallayoutheight) {
									refMenu.ScrollParentToMakePanelFit(2, false);
								}
							});
						}
						return old;
					});

					return (<>
						<Panel id={menu()} className={classNames("TabButton", {
							HasSecondaryMenu: hasSecondaryMenu(),
							Selected: local.selectedMenu == menu()
						})} onactivate={self => {
							let newMenu = menu();
							local.onToggleMenu(newMenu);
						}}>
							<Show when={local.selectedMenu == menu()}>
								<DOTAParticleScenePanel class="TabButtonParticle" particleName="particles/ui/game/ui_game_general_special_effects_01_fx.vpcf" cameraOrigin="0 0 150" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
							</Show>
							{menuIcon}
							<Image className="TabIcon" />
							<Label className={classNames("TabLabel", sLanguage)} text={GetLocalization("#" + menu())} html />
							<Show when={locked()}>
								<Image class="MenuLockIcon" />
							</Show>
							<Show when={red()}>
								<EOM_RedMark />
							</Show>
							<Show when={hasSecondaryMenu()}>
								<Image className="TabBackgroundArrow" />
							</Show>
						</Panel>
						<Show when={hasSecondaryMenu()}>
							<Panel ref={refMenu} className={classNames("SecondaryContainer", { Selected: local.selectedMenu == menu() })}>
								<Index each={local.menuList?.[menu()] ?? []}>
									{(menu2, index2) => {
										const menu2Icon = () => {
											if (local.mark_icon) {
												return local.mark_icon(menu(), menu2());
											}
										};
										const red2 = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu(), menu2());
										const locked2 = () => local.isMenuUnlocked != undefined && !local.isMenuUnlocked(menu(), menu2());
										return (
											<Panel className={classNames("SecondaryMenuButton", { Selected: local.selectedMenu2 == menu2() })} onactivate={self => {
												local.onToggleMenu(menu(), menu2());
											}}>
												<Show when={local.selectedMenu2 == menu2()}>
													<DOTAParticleScenePanel class="TabButtonParticle" particleName="particles/ui/game/ui_game_general_special_effects_01_fx.vpcf" cameraOrigin="0 0 150" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
												</Show>
											<Image className="SecondaryBackgroundActive" />
											<Panel id="TextAndRedMark">
												<Label className={classNames(sLanguage)} text={GetLocalization("#" + menu2())} html />
													<Show when={locked2()}>
														<Image class="MenuLockIcon" />
													</Show>
													<Show when={red2()}>
														<EOM_RedMark />
													</Show>
												</Panel>
												{menu2Icon()}

											</Panel>
										);
									}}
								</Index>
							</Panel>
						</Show>
					</>);
				}}
			</Index>
		</Panel>
	);
};

export interface EOM_MenuLayout_ContentProps extends PanelAttributes {
	/** 是否可见 */
	show?: boolean;
	topbarChildren?: JSX.Element;
	shadow_border?: boolean;
}
/** 【布局】内容页 */
export const EOM_MenuLayout_Content: ParentComponent<EOM_MenuLayout_ContentProps> = (props) => {
	const merged = mergeProps(props, { shadow_border: false });
	const [local, others] = splitProps(merged, ["class", "children", "show", "topbarChildren", "shadow_border"]);
	return (
		<Panel {...others} hittest={false} class={classNames("EOM_MenuLayout_Content", local.class)} classList={{ Show: local.show ?? true }}>
			<Panel class="EOM_MenuLayout_Content_BG" hittest={false} />
			<Panel class="EOM_MenuLayout_ShadowBoder" visible={local.shadow_border} />
			<Panel class="EOM_MenuLayout_ShadowBoder Right" visible={local.shadow_border} />
			{local.topbarChildren}
			<Panel class="EOM_MenuLayout_Content_Box" hittest={false}>
				{untrack(() => local.children)}
			</Panel>
		</Panel>
	);
};  
