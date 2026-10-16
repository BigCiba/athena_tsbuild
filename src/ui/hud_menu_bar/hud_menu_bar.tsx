import { insert, render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_RedMark } from "../../components/EOMDesign/DataDisplay/EOM_RedMark/EOM_RedMark";
import { EOM_BaseButton } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { createNetDataSignal, createPlayerNetDataSignal, createServiceNetData } from "../../utils/solid_utils";

const menus: string[] = [
	// "setting",
	// "mail",
	// "store",
	// "activity",
	// "draw",
	// "rank",
	// "hero",
	// "equipment",
	// "cosmetic",
	// "rune",
	// "profile",
	// "book",
	// "guide",
	// "community",
	// "ladder",
	// 这个永远是最后一个
	// "endscreen",
];


type DropdownItemData = {
	label: string;
	menu?: string;
	menu2?: string;
	action?: () => void;
	red?: boolean;
	redMenu?: string;
	redMenu2?: string;
};

const storeActivityMenus = new Set(["battlepass", "growth_fund", "starsea"]);
const STATIC_MENU_LIST: Record<string, Record<string, string[]>> = {
	activity: {
		first_celebration: [],
		battlepass: [
			"battlepass",
			"daily_task",
			"week_task",
		],
		growth_fund: [
			"growth_fund_301"
		],
		starsea: [],
		seven_days: [],
		// saving_pot: [],
		// football: [],
		// boardslot: [
		// 	"dice_game",
		// 	"dice_store",
		// 	"dice_gift",
		// ],
		mining: [
			"veins_game",
			"veins_rank",
			"veins_store",
			"veins_gift",
		],
	},
	hero: {
		Hero_Menu: [],
		Weapon_Menu: [],
		Courier_Menu: [],
	},
	equipment: {
		EquipmentTab_equip: [],
		EquipmentTab_part_levelup: [],
		EquipmentTab_forge2: [],
		EquipmentTab_break: [],
		EquipmentTab_key: [],
		EquipmentTab_drawing: [
			"EquipmentTab_drawing_make",
			"EquipmentTab_drawing_recast",
		],
	},
	cosmetic: {
		Props_Menu: [],
		Cosmetic_Hero: [
			"HERO_WEAPON",
			"HEAD",
			"SHOULDER",
			"BACK",
			"TAIL",
			"WING",
			"MISC",
			"FOOTPRINT_EFFECT",
			"AURA_EFFECT",
			"ATTACK_EFFECT",
			"SPECIAL_SKILL_EFFECT",
			"DASH_SKILL_EFFECT",
			"DEFENSE_SKILL_EFFECT",
			"ULTIMATE_SKILL_EFFECT",
		],
		Cosmetic_Player: [
			"BORDER",
			"TITLE",
		],
	},
	rune: {
		RuneEmbed_Menu: [],
		RuneBreak_Menu: [],
		RuneDevour_Menu: [],
		RuneInlay_Menu: [],
	},
	book: {
		PlayerInfo_Menu: [],
		Blessing_Menu: [],
		Collection_Menu: [],
		Handbook_Menu: [],
		Achieve_Menu: [],
	},
	guide: {
		Guide1: [],
		Guide2: [],
		Guide3: [],
	},
};

const separatedStoreTags = new Set(["Fish", "Explore", "Flowers", "StarStone", "BoardSlotGift", "BoardSlot", "MiningGift", "Mining"]);
const staticStoreMenus = ["collection_vip", "collection_treasure"];
const storeMenuOrder = ["Privilege", "Hot", "Gift", "Resource", "collection_vip", "collection_treasure", "Moon", "Universe"];
const open_store = createServiceNetData("open_shop", { value: false });
const player_activity_tasks = createServiceNetData("player_activity_tasks", {});
const player_login_activity_data = createServiceNetData("player_login_activity_data", {});

const getStoreMenuOrder = (tag: string) => {
	const order = storeMenuOrder.indexOf(tag);
	return order == -1 ? storeMenuOrder.length : order;
};

const getStoreMenuList = () => {
	const result: Record<string, string[]> = {};
	const now = Date.now() / 1000;
	for (const itemname in KeyValues.info_shop_product) {
		const itemdata = KeyValues.info_shop_product[itemname];
		if (((itemdata.start_time < now || itemdata.start_time == 0) &&
			(itemdata.end_time > now || itemdata.end_time == 0) &&
			itemdata.hide == 0) ||
			itemdata.tag == "Privilege") {
			for (const tag of itemdata.tag.split("|")) {
				if (!separatedStoreTags.has(tag)) {
					result[tag] = [];
				}
			}
		}
	}
	for (const menu of staticStoreMenus) {
		result[menu] = [];
	}
	if (KeyValues.drawcards["3001"] != undefined) {
		result["Universe"] = [];
	}
	const sortedResult: Record<string, string[]> = {};
	for (const [key, value] of Object.entries(result).sort(([a], [b]) => getStoreMenuOrder(a) - getStoreMenuOrder(b))) {
		sortedResult[key] = value;
	}
	return sortedResult;
};

const getDrawDropdownItems = (): DropdownItemData[] => {
	const timestamp = CustomUIConfig.GetServerTimeStamp();
	return Object.entries(KeyValues.drawcards)
		.sort((a, b) => a[1].order - b[1].order)
		.filter(([_, config]) => {
			const validTime = config.open_time < timestamp && (config.end_time > timestamp || config.end_time == 0);
			return config.show == 1 && validTime;
		})
		.map(([poolID]) => ({
			label: "Draw_PoolName_" + poolID,
			action: () => {
				ToggleWindow("MenuButton_draw", true);
				ClientSideEvent("draw_select_pool", { poolID });
			},
		}));
};

const buildDropdownItems = (menuList: Record<string, string[]>): DropdownItemData[] => {
	const result: DropdownItemData[] = [];
	for (const menu in menuList) {
		result.push({
			label: menu,
			menu,
			redMenu: menu,
		});
	}
	return result;
};

/** 下拉快捷 */
const dropdownMenus: Record<string, () => DropdownItemData[]> = {
	setting: () => [
		{ label: "MenuButton_setting", menu: "MenuButton_setting" },
		{ label: "MenuDropDown_Dota2Setting", action: () => $.DispatchEvent("DOTAShowSettingsRebornPopup", $.GetContextPanel()) },
	],
	store: () => buildDropdownItems(getStoreMenuList()),
	draw: getDrawDropdownItems,
	hero: () => buildDropdownItems(STATIC_MENU_LIST.hero),
	equipment: () => buildDropdownItems(STATIC_MENU_LIST.equipment),
	cosmetic: () => buildDropdownItems(STATIC_MENU_LIST.cosmetic),
	rune: () => buildDropdownItems(STATIC_MENU_LIST.rune),
	book: () => buildDropdownItems(STATIC_MENU_LIST.book),
	guide: () => buildDropdownItems(STATIC_MENU_LIST.guide),
};

const [selectName, setSelectName] = createSignal("");
const GUIDE_SETTING_KEY = "setting_switch_guide";
const GUIDE_AUTO_CLOSE_KEY = "setting_guide_auto_closed";
const CAPACITY_LIMIT = 400;
const EQUIPMENT_CAPACITY_WARNING_RATIO = 0.8;
const EQUIPMENT_CAPACITY_CRITICAL_RATIO = 0.95;

type CapacityTipType = "equipment" | "gem" | "drawing" | "key";
type CapacityLevel = "none" | "warning" | "critical";
type CapacityTipData = {
	type: CapacityTipType;
	count: number;
	limit: number;
	level: Exclude<CapacityLevel, "none">;
	title: string;
	content: string;
};

const CAPACITY_TIP_CONFIG: Array<{
	type: CapacityTipType;
	counterKey: string;
	title: string;
	fullTitle: string;
	content: string;
}> = [
		{ type: "equipment", counterKey: "equipment_count", title: "#Equipment_EquipmentTipTitle", fullTitle: "#Equipment_EquipmentTipTitle2", content: "#Equipment_EquipmentTipContent" },
		{ type: "gem", counterKey: "gem_count", title: "#Equipment_GemCapacityTipTitle", fullTitle: "#Equipment_GemCapacityTipTitle2", content: "#Equipment_GemCapacityTipContent" },
		{ type: "drawing", counterKey: "drawing_count", title: "#Equipment_DrawingTipTitle", fullTitle: "#Equipment_DrawingTipTitle2", content: "#Equipment_DrawingTipContent" },
		{ type: "key", counterKey: "key_count", title: "#Equipment_KeyCapacityTipTitle", fullTitle: "#Equipment_KeyCapacityTipTitle2", content: "#Equipment_KeyCapacityTipContent" },
	];

function getCapacityLevel(count: number, limit: number): CapacityLevel {
	const ratio = count / limit;
	if (ratio >= EQUIPMENT_CAPACITY_CRITICAL_RATIO) {
		return "critical";
	}
	if (ratio >= EQUIPMENT_CAPACITY_WARNING_RATIO) {
		return "warning";
	}
	return "none";
}

function ReadBooleanSetting(value: unknown, defaultValue: boolean): boolean {
	if (value == undefined) {
		return defaultValue;
	}
	if (typeof value === "boolean") {
		return value;
	}
	if (typeof value === "number") {
		return value !== 0;
	}
	if (typeof value === "string") {
		const normalized = value.toLowerCase();
		if (normalized === "true" || normalized === "1") {
			return true;
		}
		if (normalized === "false" || normalized === "0") {
			return false;
		}
	}
	return defaultValue;
}

const gameState = createNetDataSignal("common", "game_state", {
	state: "GameState_Prepare",
	start_time: -1,
	end_time: -1,
});
const settle_info = createNetDataSignal("common", "settle_info", {
	end_time: -1,
	show_menu_bar: false
});
let DropContainer: Panel | undefined;
let DropContent: Panel | undefined;
let EquipmentButtonPanel: Panel | undefined;
let EquipmentCapacityTipContainer: Panel | undefined;
const EQUIPMENT_CAPACITY_TIP_POSITION_RETRIES = 2;
const EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL = 0.03;
const showDropDown = (panel?: Panel, name?: string) => {
	if (DropContainer == undefined || !DropContainer.IsValid()) return;
	if (panel != undefined) {
		if (name != undefined && dropdownMenus[name] != undefined) {
			const dropdownItems = dropdownMenus[name]();
			if (dropdownItems.length == 0) {
				LoadData<Panel>(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
				DropContainer.RemoveClass("Show");
				return;
			}
			let position = panel.GetPositionWithinWindow();
			let dropX = position.x / DropContainer.actualuiscale_x - 80 + 23;
			if (DropContent != undefined) {
				DropContainer.SetPositionInPixels(Math.max(0, dropX), 0, 0);
				if (dropX < 0) {
					DropContainer.FindChild("MarginTop")!.style.transform = `translateX(${dropX}px)`;
				} else {
					DropContainer.FindChild("MarginTop")!.style.transform = `translateX(0px)`;
				}
				DropContent.RemoveAndDeleteChildren();
				for (const item of dropdownItems) {
					insert(DropContent, <DropdownItem menuName={name} item={item} />);
				}
			}
			SaveData(DropContainer, "targetPanel", panel);
		} else {
			LoadData<Panel>(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
			DropContainer.RemoveClass("Show");
			return;
		}
	}
	LoadData<Panel>(DropContainer, "targetPanel")?.AddClass("ShowDropDown");
	DropContainer.AddClass("Show");
};
const hideDropDown = () => {
	if (!DropContainer?.IsValid()) return;
	LoadData<Panel>(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
	DropContainer.RemoveClass("Show");
};
const updateEquipmentCapacityTipPosition = (remainingRetries: number) => {
	if (!EquipmentButtonPanel?.IsValid() || !EquipmentCapacityTipContainer?.IsValid()) return;
	const scale = EquipmentCapacityTipContainer.actualuiscale_x;
	if (!isFinite(scale) || scale <= 0) {
		if (remainingRetries > 0) {
			$.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => updateEquipmentCapacityTipPosition(remainingRetries - 1));
		}
		return;
	}
	const position = EquipmentButtonPanel.GetPositionWithinWindow();
	const buttonCenterX = position.x + EquipmentButtonPanel.actuallayoutwidth / 2;
	const tipX = buttonCenterX / scale - 180;
	if (!isFinite(tipX)) return;
	EquipmentCapacityTipContainer.SetPositionInPixels(Math.max(0, tipX), 0, 0);
	if (remainingRetries > 0) {
		$.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => updateEquipmentCapacityTipPosition(remainingRetries - 1));
		return;
	}
	EquipmentCapacityTipContainer.AddClass("Positioned");
};
const scheduleEquipmentCapacityTipPositionUpdate = () => {
	EquipmentCapacityTipContainer?.RemoveClass("Positioned");
	$.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => {
		updateEquipmentCapacityTipPosition(EQUIPMENT_CAPACITY_TIP_POSITION_RETRIES);
	});
};

const [redData, SetRed] = createSignal<Record<string, boolean>>((() => {
	let res: Record<string, boolean> = {};
	menus.forEach(menu => {
		// res[menu] = CustomUIConfig.GetRedPoint(menu);
	});
	return res;
})());

const MenuBar = () => {
	const dungeon_loading = createPlayerNetDataSignal("common", "dungeon_loading", { state: false });
	const boss_intro = createNetDataSignal("common", "boss_intro", { state: false });
	createEffect(() => {
		$.GetContextPanel().SetHasClass("DungeonLoading", (dungeon_loading()?.state ?? false) || (boss_intro()?.state ?? false));
	});
	// 玩家历史最高通关难度（后端聚合统计，直接下发）
	const briefMatchData = createServiceNetData("player_common_match_data");
	const maxDiff = createMemo(() => briefMatchData()?.max_diff ?? 0);
	const playerKeyValues = createServiceNetData("player_key_values");
	const guideEnabled = createMemo(() => ReadBooleanSetting(playerKeyValues()?.[GUIDE_SETTING_KEY]?.value, true));
	const playerCounters = createServiceNetData("player_counters", {});
	const [dismissedCapacityTips, setDismissedCapacityTips] = createSignal<Partial<Record<CapacityTipType, true>>>({});
	const capacityTip = createMemo<CapacityTipData | undefined>(() => {
		const counters = playerCounters();
		const dismissed = dismissedCapacityTips();
		for (const config of CAPACITY_TIP_CONFIG) {
			const count = counters?.[config.counterKey]?.count ?? 0;
			const level = getCapacityLevel(count, CAPACITY_LIMIT);
			if (level == "none" || (level == "warning" && dismissed[config.type])) {
				continue;
			}
			return {
				type: config.type,
				count,
				limit: CAPACITY_LIMIT,
				level,
				title: GetLocalization(count >= CAPACITY_LIMIT ? config.fullTitle : config.title),
				content: LocalizeWithVars(config.content, {
					count,
					limit: CAPACITY_LIMIT,
				}),
			};
		}
		return undefined;
	});
	createEffect(() => {
		const keyValues = playerKeyValues();
		if (keyValues == undefined || maxDiff() < 3) {
			return;
		}
		if (ReadBooleanSetting(keyValues[GUIDE_AUTO_CLOSE_KEY]?.value, false)) {
			return;
		}
		Players.SetPlayerSetting(GUIDE_SETTING_KEY, false);
		Players.SetPlayerSetting(GUIDE_AUTO_CLOSE_KEY, true);
	});
	// 每个菜单按钮的可选可见性判断；未声明者恒显
	const menuVisibleWhen: Partial<Record<string, () => boolean>> = {
		// guide：由游戏设置里的“新手指引”开关控制
		guide: () => guideEnabled(),
		// endscreen：仅在结算阶段且服务端要求显示菜单时出现（原硬编码逻辑迁入）
		endscreen: () => settle_info().show_menu_bar === true,
		rune: () => maxDiff() >= 5,
	};
	const [activityRedVersion, setActivityRedVersion] = createSignal(0);
	const [hideRecord, SetHideRecord] = createStore<Record<string, boolean>>({});
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
		gameEventListeners.push(CustomUIConfig.SubscribeRedPointChange((key) => {
			// print(key);
			if (key == "activity") {
				setActivityRedVersion(version => version + 1);
			}
			// SetRed(oldData => {
			// 	let old = oldData[key];
			// 	let newState = CustomUIConfig.GetRedPoint(key);
			// 	if (old == newState) {
			// 		return oldData;
			// 	}
			// 	return { ...oldData, [key]: newState };
			// });
		}));
		gameEventListeners.push(GameEvents.Subscribe("client_side_event", data => {
			if (data.event_name == "set_menu_bar_visible") {
				let { hide, key } = JSON.parse(data.event_data);
				SetHideRecord(key, hide);
			}
		}));
		onCleanup(() => {
			for (const id of gameEventListeners) {
				GameEvents.Unsubscribe(id);
			}
		});
	});

	const Hide = createMemo(() => {
		return Object.values(hideRecord).some(v => v == true);
	});
	const showEquipmentCapacityTip = createMemo(() => {
		if (Hide() || selectName() != "") {
			return false;
		}
		return capacityTip() != undefined;
	});
	createEffect(() => {
		if (showEquipmentCapacityTip()) {
			scheduleEquipmentCapacityTipPositionUpdate();
		}
	});
	return (
		<Panel id="MenuMain" hittest={false}>
			<Panel id="MenuBar" classList={{ Hidden: Hide() }} hittest={false}>
				<MenuButton name="Return" onactivate={self => $.DispatchEvent("DOTAHUDShowDashboard", self)} />
				<For each={menus}>
					{menu => <Show when={menuVisibleWhen[menu]?.() ?? true}>
						<MenuButton name={menu} red={redData()[menu] == true}
							buttonRef={menu == "equipment" ? panel => {
								EquipmentButtonPanel = panel;
								scheduleEquipmentCapacityTipPositionUpdate();
							} : undefined}
							onMenuActivate={name => {
								const tip = capacityTip();
								if (name == "equipment" && tip != undefined) {
									setDismissedCapacityTips(prev => ({ ...prev, [tip.type]: true }));
								}
							}} />
					</Show>}
				</For>
			</Panel>
			<Panel id="DropContainer" ref={DropContainer} hittest={false}>
				<Panel id="MarginTop" onmouseover={self => showDropDown()} onmouseout={self => hideDropDown()} />
				<Panel id="DropMain" onmouseover={self => showDropDown()} onmouseout={self => hideDropDown()} ref={DropContent} />
			</Panel>
			<Panel id="EquipmentCapacityTipContainer" classList={{ Show: showEquipmentCapacityTip() }} ref={panel => {
				EquipmentCapacityTipContainer = panel;
				scheduleEquipmentCapacityTipPositionUpdate();
			}} hittest={false}>
				<Panel id="EquipmentCapacityTipArrow" hittest={false} />
				<Show when={capacityTip()} keyed>
					{(tip: CapacityTipData) => <EquipmentCapacityTip {...tip} />}
				</Show>
			</Panel>
		</Panel>
	);
};

const MenuButton = (props: {
	name: string,
	red?: boolean,
	buttonRef?: (panel: Panel) => void,
	onMenuActivate?: (name: string) => void,
} & PanelAttributes<Button>) => {
	const [local] = splitProps(props, ["name", "hittest", "onactivate", "buttonRef", "onMenuActivate"]);
	const selected = () => selectName() == local.name;

	return (
		<EOM_BaseButton id={props.name} class="MenuButton" classList={{ Selected: selected() }} ref={self => local.buttonRef?.(self)} onactivate={local.onactivate ?? (self => {
			local.onMenuActivate?.(local.name);
			ToggleWindow("MenuButton_" + local.name, !selected());
		})} onmouseover={self => {
			showDropDown(self, local.name);
		}} onmouseout={self => {
			hideDropDown();
		}}>
			<Panel id="SelectedHover" />
			<Panel id="SelectParticleRoot">
				<DOTAParticleScenePanel id="SelectParticle" particleName="particles/ui/game/ui_game_general_special_effects_02_fx.vpcf" cameraOrigin="0 0 60" fov={40} lookAt="0 0 0" hittest={false} squarePixels />
			</Panel>
			<Panel class={classNames("BGImage", local.name)} />
			<Label class={classNames("MenuLabel", local.name, { Selected: selected() })} text={"#MenuButton_" + local.name} />
			<Show when={props.red}>
				<EOM_RedMark />
			</Show>
		</EOM_BaseButton>
	);
};

const EquipmentCapacityTip = (props: CapacityTipData) => {
	return <Panel class={classNames("EquipmentCapacityTip", { Critical: props.level == "critical" })} hittest={false}>
		<Panel class="TipBG" hittest={false} />
		<Panel class="TipContext">
			<Label id="EquipmentCapacityTipTitle" text={props.title} html />
			<Label id="EquipmentCapacityTipContent" text={props.content} html />
		</Panel>
	</Panel>;
};

const DropdownItem = (props: { menuName: string, item: DropdownItemData; }) => {
	const red = () => {
		return false
		// if (props.item.red != undefined) return props.item.red;
		// const redMenu = props.item.redMenu;
		// if (redMenu == undefined) return false;
		// const redMenu2 = props.item.redMenu2;
		// if (redMenu2 == undefined) {
		// 	return CustomUIConfig.GetRedPoint(props.menuName, redMenu);
		// }
		// return CustomUIConfig.GetRedPoint(props.menuName, redMenu, redMenu2);
	};
	return <EOM_BaseButton class="DropdownItem" onactivate={self => {
		if (props.item.action != undefined) {
			props.item.action();
		} else {
			const menu = props.item.menu;
			if (menu == undefined) {
				return;
			}
			JumpToMenu({
				window_name: "MenuButton_" + props.menuName,
				menu,
				menu2: props.item.menu2,
				force: true,
			});
		}
		hideDropDown();
	}}>
		<Label text={"#" + props.item.label} />
		<Show when={red()}>
			<EOM_RedMark />
		</Show>
	</EOM_BaseButton>;
};

render(() => <MenuBar />, $.GetContextPanel());
