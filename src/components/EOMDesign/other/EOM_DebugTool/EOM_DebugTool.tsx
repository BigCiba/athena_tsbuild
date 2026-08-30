import classNames from "classnames";
import { For, Match, ParentComponent, Show, Switch, children, createEffect, createSignal, mergeProps, onCleanup, onMount, splitProps, untrack } from "solid-js";
import { createServiceNetData } from "../../../../utils/solid_utils";
import { EOM_Icon } from "../../DataDisplay/EOM_Icon/EOM_Icon";
import { EOM_BaseButton, EOM_IconButton } from "../../Input/EOM_Button/EOM_Button";
import { EOM_DropDown } from "../../Input/EOM_DropDown/EOM_DropDown";
import { EOM_Breadcrumb } from "../../Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { EOM_KeyBinder, Key2Command } from "../EOM_KeyBinder/EOM_KeyBinder";
import "./EOM_DebugTool.less";

interface EOM_DebugToolAttribute extends PanelAttributes {
	/** 面板的方向 */
	direction: "right" | "left";
	/** 展开按钮的位置 */
	expandButtonAlign?: "top" | "bottom" | "left" | "right";
	/** 容器元素 */
	containerElement?: JSX.Element[];
	/** 分页标签 */
	tabList?: string[];
}

const player_key_values = createServiceNetData("player_key_values", {});

const GetPlayerConfig = (key: string, defaultValue?: any) => {
	return player_key_values()[key] != undefined ? player_key_values()[key].value : defaultValue;
};

/** 主面板 */
export const EOM_DebugTool: ParentComponent<EOM_DebugToolAttribute> = (props) => {
	// const [fps, setFps] = createSignal("0");
	// const [fpsRecord, setFpsRecord] = createSignal(0);
	// const [fpsCount, setFpsCount] = createSignal(0);

	const [minimized, setMinimized] = createSignal(true);
	const [manualShowPanel, setManualShowPanel] = createSignal(false);
	const [direction, setDirection] = createSignal<"left" | "right">(props.direction);
	const [tabIndex, setTabIndex] = createSignal(0);
	const Update = () => {
		// setFpsRecord(fpsRecord() + Game.GetGameFrameTime());
		// setFpsCount(fpsCount() + 1);
		// if (fpsRecord() > 1 && fpsCount() != 0) {
		// 	setFps((fpsCount() / fpsRecord()).toFixed(0));
		// 	setFpsRecord(0);
		// 	setFpsCount(0);
		// }
		if (!manualShowPanel()) {
			if (minimized() == GameUI.IsAltDown() && GetPlayerConfig("alt_tool", true)) {
				setMinimized(!GameUI.IsAltDown());
			}
		} else {
			if (GameUI.IsAltDown() && GetPlayerConfig("alt_tool", true)) {
				setManualShowPanel(false);
			}
		}
	};
	const timer = setInterval(Update, Game.GetGameFrameTime());
	onCleanup(() => clearInterval(timer));
	return (
		<Panel id="EOM_DebugTool" hittest={false} >
			{props.containerElement}
			<EOM_DebugTool_Setting />
			<Panel id="EOM_DebugToolControlPanel" class={classNames("ControlPanel", {
				Minimized: minimized(),
				DirectionLeft: direction() == "left",
				DirectionRight: direction() == "right",
			})} hittest={false}>
				<Panel class={"ControlPanelContainer TabShow" + tabIndex()}>
					<Panel class="ControlPanelTitle">
						<Panel class="CategoryHeaderFilledFront" />
						{/* <Label class="CategoryHeader" text={`工具(FPS:${fps()})`} /> */}
						<Switch fallback={<Label class="CategoryHeader" text={`工具`} />}>
							<Match when={props.tabList != undefined && props.tabList.length > 0}>
								<EOM_Breadcrumb class="CategoryHeader" list={props.tabList!} onChange={(index, text) => setTabIndex(index)} />
							</Match>
						</Switch>
						<Panel class="CategoryHeaderFilledNext" />
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="切换布局" verticalAlign="center" icon={<EOM_Icon type="Popout" size="24" />} >
							<EOM_DropDown id="ToggleSize" width="100px" onChange={(index, item) => {
								const nextDirection = item.id == "right" ? "right" : "left";
								setDirection(nextDirection);
								SaveConfig("direction", nextDirection);
							}}>
								<Label text={"左侧"} id="left" />
								<Label text={"右侧"} id="right" />
							</EOM_DropDown>
						</EOM_IconButton>
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="重载数据" verticalAlign="center" icon={<EOM_Icon type="Refresh" size="24" />} onactivate={() => {
							// @ts-ignore
							GameEvents.SendEventClientSide("client_side_event", { event_name: "RefreshDebugToolData", event_data: JSON.stringify({}) });
						}} />
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="设置" verticalAlign="center" icon={<EOM_Icon type="Gear" size="24" onactivate={() => ToggleSelection("EOM_DebugTool_Setting")} />} />
					</Panel>
					{props.children}
				</Panel>
				<Panel id="ExpandButtonContainer" verticalAlign="center" >
					<Button id="ExpandButton" onactivate={() => {
						setManualShowPanel(minimized());
						setMinimized(!minimized());
					}} >
						<EOM_Icon type="ArrowRight" width="8px" height="14px" align="center center" preTransformRotate2d={(minimized() ? 0 : 180) + "deg"} />
					</Button>
				</Panel>
			</Panel>
		</Panel>
	);
};

/** 设置界面 */
function EOM_DebugTool_Setting() {
	const [deleteMode, setDeleteMode] = createSignal(false);
	const [customKeyBindCount, setCustomKeyBindCount] = createSignal(0);
	const [eventNameList, setEventNameList] = createSignal<string[]>([]);
	const [buttonTextList, setButtonTextList] = createSignal<string[]>([]);
	const [buttonTypeList, setButtonTypeList] = createSignal<string[]>([]);

	const defaultSettingList = ["ReloadScriptButtonPressed"];
	const RegisterDemoButton = (key: string, eventName: string, bInit: boolean) => {
		return;
		if (key && key != undefined) {
			RegisterKeyEvent(key, () => {
				const EOM_DebugTool = $.GetContextPanel().FindChildTraverse("EOM_DebugTool");
				if (EOM_DebugTool) {
					const demoButtonList = EOM_DebugTool.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
					demoButtonList.map((element) => {
						if (element.id == eventName.replace("hotkey_", "")) {
							const index = eventNameList().indexOf(eventName.replace("hotkey_", ""));
							if (index > -1) {
								const buttonType = buttonTypeList()[index];
								if (buttonType == "FireEvent") {
									// FireEvent(eventName.replace("hotkey_", ""));
									$.DispatchEvent("Activated", element, "mouse");
								} else if (buttonType == "ToggleSelection") {
									// ToggleSelection(eventName.replace("hotkey_", ""));
									$.DispatchEvent("Activated", element, "mouse");
								}
							}
						}
					});
				}
			});
			if (!bInit) {
				FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
			}
			setCustomKeyBindCount(0);
		}
	};
	const RegisterHotkey = (eventName: string) => {
		const EOM_DebugTool = $.GetContextPanel().FindChildTraverse("EOM_DebugTool");
		if (EOM_DebugTool) {
			const demoButtonList = EOM_DebugTool.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
			demoButtonList.map((element) => {
				if (element.id == eventName.replace("hotkey_", "")) {
					const index = eventNameList().indexOf(eventName.replace("hotkey_", ""));
					if (index > -1) {
						const buttonType = buttonTypeList()[index];
						if (buttonType == "FireEvent") {
							// FireEvent(eventName.replace("hotkey_", ""));
							$.DispatchEvent("Activated", element, "mouse");
						} else if (buttonType == "ToggleSelection") {
							// ToggleSelection(eventName.replace("hotkey_", ""));
							$.DispatchEvent("Activated", element, "mouse");
						}
					}
				}
			});
		}
	};
	const RegisterKeyBind = (key: string, onkeydown?: () => void, onkeyup?: () => void) => {
		if (key && key != "") {
			const sCommand = key + (Date.now() / 1000);
			Game.CreateCustomKeyBind(Key2Command[key], "+" + sCommand);
			Game.AddCommand("+" + sCommand, () => {
				if (onkeydown) {
					onkeydown();
				}
			}, "", 67108864);
			Game.AddCommand("-" + sCommand, () => {
				if (onkeyup) {
					onkeyup();
				}
			}, "", 67108864);
		}
	};
	/** 添加一个键位绑定 */
	const addKeyBind = (self: Panel) => {
		setCustomKeyBindCount(customKeyBindCount() + 1);
		findHotKeyValidButton(self);
	};
	/** 寻找可以绑定的按钮 */
	const findHotKeyValidButton = (self: Panel) => {
		const root = self.FindAncestor("EOM_DebugTool");
		let eventList: string[] = [];
		let textList: string[] = [];
		let typeList: string[] = [];
		if (root) {
			const demoButtonList = root.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
			demoButtonList.map((element) => {
				eventList.push(element.id);
				textList.push(element.text);
				typeList.push((() => {
					let result = "";
					if (element.BHasClass("FireEvent")) {
						result = "FireEvent";
					} else if (element.BHasClass("ToggleSelection")) {
						result = "ToggleSelection";
					}
					return result;
				})());
			});
			setEventNameList(eventList);
			setButtonTextList(textList);
			setButtonTypeList(typeList);
		}
	};
	const OnLoad = (self: Panel) => {
		findHotKeyValidButton(self);
	};
	return (
		<SelectionContainer
			eventName={"EOM_DebugTool_Setting"}
			title={"调试工具设置"}
			width="500px"
			height="700px"
			hasRawMode={false}
			hasToggleSize={false}
			hasFilter={false}
		>
			<Panel id="EOM_DebugTool_Setting" class="EOM_DebugTool_Setting" flowChildren="down" width="100%" height="100%">{/* 面板热键 */}
				{/* 面板热键 */}
				<Panel flowChildren="down" width="100%" marginTop="12px" onload={self => OnLoad(self)}>
					<ToggleButton class="HotKeyValid FireEvent" selected={GetPlayerConfig("alt_tool", true)} onactivate={self => {
						SaveConfig("alt_tool", self.IsSelected());
					}} text={"ALT切换调试工具"} />
					{/* <Label text="面板热键" class="SectionHeader" />
					<Panel class="SectionHeaderLine" /> */}
					{/* 默认设置 */}
					{/* <For each={defaultSettingList}>
						{(eventName, index) => {
							const hotkey = () => playerConfig()[eventName];
							return <EOM_KeyBinder text={buttonTextList()[eventNameList().indexOf(eventName)]} initKey={hotkey()} onChange={(key, init) => {
								if (!init) {
									// FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
									SaveConfig(eventName, key);
								};
							}} callback={() => RegisterHotkey(eventName)} />;
						}}
					</For> */}
					{/* 已保存的自定义热键设置 */}
					{/* <For each={Object.keys(playerConfig())}>
						{(eventName, index) => {
							if (eventName.indexOf("hotkey_") != -1 && defaultSettingList.indexOf(eventName.replace("hotkey_", "")) == -1) {
								return (
									<Panel width="100%" height="36px" flowChildren="right" class={classNames("CanRemoveKeyBind", { deleteMode: deleteMode })}>
										<EOM_IconButton verticalAlign="center" icon={<Image src="s2r://panorama/images/control_icons/x_close_png.vtex" />} onactivate={self => {
											// FireEvent("ChangeToolSettingKeyBind", "_delete_" + eventName);
											SaveConfig(eventName, "");
										}} />
										<EOM_KeyBinder text={buttonTextList()} initDropIndex={eventNameList().indexOf(eventName.replace("hotkey_", "")) + 1} initKey={playerConfig()[eventName]} onChange={(key, init) => {
											if (!init) {
												SaveConfig(eventName, key);
												// FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
											};
										}} callback={() => RegisterHotkey(eventName)} />
									</Panel>
								);
							}
						}}
					</For> */}
					{/* 添加热键 */}
					{[...Array(customKeyBindCount)].map((_, index) => {
						if (buttonTextList.length > 0) {
							return (
								<Panel width="100%" height="36px" flowChildren="right" class={classNames("CanRemoveKeyBind", { deleteMode: deleteMode })}>
									<EOM_IconButton verticalAlign="center" icon={<Image src="s2r://panorama/images/control_icons/x_close_png.vtex" />} onactivate={self => setCustomKeyBindCount(customKeyBindCount() - 1)} />
									<EOM_KeyBinder text={buttonTextList()} onChange={(key, bInit, dropIndex) => {
										if (eventNameList()[dropIndex]) {
											if (key && key != "") {
												RegisterDemoButton(key, "hotkey_" + eventNameList()[dropIndex], bInit);
											}
										}
									}} callback={() => { }} />
								</Panel>
							);
						}
					})}
					{/* <Panel width="100%">
						<EOM_Button margin="4px 8px" class="AddNewKeyBind" type="Text" text="+ 按键绑定" onactivate={(self: Panel) => addKeyBind(self)} />
						{!deleteMode() &&
							<EOM_Button margin="4px 8px" class="AddNewKeyBind" horizontalAlign="right" type="Text" text="- 删除绑定" onactivate={(self: Panel) => setDeleteMode(true)} />
						}
						{deleteMode() &&
							<EOM_Button margin="4px 8px" class="AddNewKeyBind" horizontalAlign="right" type="Text" text="取消" onactivate={(self: Panel) => setDeleteMode(false)} />
						}
					</Panel> */}
				</Panel>

			</Panel>
		</SelectionContainer>
	);
}
const SettingToggleButton = (props: {
	settingName: string;
	text: string;
	selected?: boolean | string;
}) => {
	const tooltip = GetLocalization(`${props.settingName}_Description`);
	const [selected, setSelected] = createSignal(props.selected);
	createEffect(() => {
		setSelected(props.selected);
	});
	return <Button class={classNames("ToggleButton SettingToggleButton", {
		selected: selected()
	})} onactivate={self => {
		setSelected(!selected());
		SaveConfig(props.settingName, props.selected ? "FALSE" : "TRUE");
		// callAction("/v1/key/save", { type: "setting", key: props.settingName, value: props.selected ? "FALSE" : "TRUE" });
	}} tooltip_text={tooltip == "" ? undefined : tooltip}>
		<Panel class="TickBox" />
		<Panel class="SettingToggleLabel">
			<Label text={props.text} />
		</Panel>
	</Button>;
};
export function EOM_DebugTool_Category(props: {
	/** 标题 */
	title: string,
	/** 自动排版根据col数进行分列排版，默认为2 */
	col?: number,
	/** 是否使用手动排版，默认为false */
	layout?: boolean,
	children?: JSX.Element[],
	/** 分页 */
	tabIndex?: number,
}) {
	const col = () => props.col ?? 2;
	const childs = children(() => props.children).toArray();

	return (
		<Panel class={classNames("Category", "TabIndex" + (props.tabIndex ?? ""), { SingleCol: col() <= 1 })}>
			<Panel class="CategoryHeader">
				<Label class="CategoryHeaderLabel" text={props.title} />
				<Panel width="fill-parent-flow(1)" />
				{/* <EOM_Switch horizontalAlign="right" checkedChildren="1列" unCheckedChildren="2列" checked={col == 1 ? true : false} onChange={(checked) => { SaveConfig({ ["ctg_col_" + this.props.title]: checked ? 1 : 2 }); this.setState({ col: checked ? 1 : 2 }); }} /> */}
			</Panel>
			<Panel class="CategoryButtonContainer">
				<Show when={!(props.layout ?? false)} fallback={props.children}>
					<For each={Array.from({ length: Math.ceil(childs.length / col()) })}>
						{(child, rowIndex) => <Panel class="Row">
							<For each={Array.from({ length: col() })}>
								{(_, idx) => {
									let childIndex = rowIndex() * col() + idx();
									return childs[childIndex];
								}}
							</For>
						</Panel>}
					</For>
				</Show>
			</Panel>
		</Panel>
	);
}
export function FireEvent(sEventName: string, str: string = "", extraParams?: Table) {
	if (!(Players.GetLocalPlayer() == -1 || Players.IsSpectator(Players.GetLocalPlayer()) || Players.IsLocalPlayerLiveSpectating())) {
		const params: Table = {
			event_name: sEventName,
			player_id: Players.GetLocalPlayer(),
			unit: Players.GetLocalPlayerPortraitUnit(),
			position: GameUI.GetCameraLookAtPosition(),
			str: str,
		};
		if (extraParams) {
			Object.entries(extraParams).forEach(([key, value]) => {
				params[key] = value;
			});
		}
		// @ts-ignore
		GameEvents.SendCustomEventToServer("DemoEvent", params);
	}
}

function SaveConfig(key: string, value: string | boolean) {
	if (value == true) {
		value = "TRUE";
	}
	if (value == false) {
		value = "FALSE";
	}
	CallAction("/v1/key/save", {
		type: "tool_settings",
		key,
		value: String(value)
	});
};

/** 切换面板 */
export function ToggleSelection(sPickerName: string) {
	let aPickerList = $.GetContextPanel().FindChildrenWithClassTraverse("SelectionContainer");
	if (aPickerList !== null) {
		for (const iterator of aPickerList) {
			if (iterator.id == sPickerName) {
				iterator.ToggleClass("Show");
			}
			else if (iterator.BHasClass("LockWindow") == false) {
				iterator.SetHasClass("Show", false);
			}
		}
	}
}
export function CompilePopups(tooltips: string[]) {
	for (const k of tooltips) {
		$.DispatchEvent("UIShowCustomLayoutTooltip", $.GetContextPanel(), k, "file://{resources}/layout/custom_game/" + k + ".xml");
		$.Schedule(0.1, () => {
			$.DispatchEvent("UIHideCustomLayoutTooltip", $.GetContextPanel(), k);
		});
	}

	const context_menu: string[] = [
	];
	context_menu.forEach(src => {
		let pContextMenu = $.CreatePanel("ContextMenuScript", $.GetContextPanel(), "");

		let pContentsPanel = pContextMenu.GetContentsPanel();
		pContentsPanel.BLoadLayout(src, false, false);
	});
	$.Schedule(0.1, () => {
		$.DispatchEvent("DismissAllContextMenus");
	});
}


// 普通按钮
export const DemoButton: ParentComponent<{
	eventName: string,
	str?: string,
	text: string,
	onactivate?: () => void,
	color?: "RedButton" | "GreenButton" | "YellowButton" | "BlueButton" | "OrangeButton" | "QuitButton" | string;
}> = (props) => {
	const onactivate = props.onactivate ?? (() => FireEvent(props.eventName, props.str));
	return <TextButton id={props.eventName} class={classNames("DemoButton", "HotKeyValid", "FireEvent", props.color)} text={props.text} onactivate={onactivate} />;
};

// 切换按钮
export const DemoToggle: ParentComponent<{
	eventName: string,
	str?: string,
	selected?: boolean,
	text: string;
}> = (props) => {
	const selected = props.selected ?? false;
	return (
		<ToggleButton id={props.eventName} class="HotKeyValid FireEvent" selected={selected} onactivate={self => { FireEvent(props.eventName, self.IsSelected() ? "1" : "0"); }} text={props.text} />
	);
};
// 文本输入按钮
export const DemoTextEntry: ParentComponent<{
	eventName: string,
	text: string,
	defaultValue?: string;
	onClick?: (value: string) => void;
}> = (props) => {
	return (
		<TextButton class="DemoTextEntry" flowChildren="right" onactivate={(self) => {
			let TextEntry = self.FindChildTraverse("DemoTextEntry") as TextEntry;
			FireEvent(props.eventName, TextEntry.text);
			if (props.onClick) {
				props.onClick(TextEntry.text);
			}
		}} text={props.text}>
			<TextEntry id="DemoTextEntry" text={props.defaultValue} onload={self => {
				self.SetDisableFocusOnMouseDown(false);
			}} oninputsubmit={(self) => {
				FireEvent(props.eventName, self.text);
				if (props.onClick) {
					props.onClick(self.text);
				}
				$.DispatchEvent("DropInputFocus", self);
			}} oncancel={self => {
				$.DispatchEvent("DropInputFocus", self);
			}} >
			</TextEntry>
		</TextButton>
	);
};
export const DemoSlider: ParentComponent<{
	text: string,
	min: number,
	max: number,
	defaultValue: number,
	onChange: (value: number) => void;
}> = (props) => {
	const [value, setValue] = createSignal(props.defaultValue);
	return (
		<Panel class="DemoSlider">
			<Panel flowChildren="right">
				<Label class="Title" text={props.text} />
				<Label class="Value" text={value().toFixed(0)} />
			</Panel>
			<Slider class="HorizontalSlider" value={(props.defaultValue - props.min) / (props.max - props.min)} direction="horizontal" onvaluechanged={self => {
				props.onChange(self.value * (props.max - props.min) + props.min);
				setValue(self.value * (props.max - props.min) + props.min);
			}} onload={self => {
				props.onChange(self.value * (props.max - props.min) + props.min);
			}} />
		</Panel>
	);
};

/** 打开一个面板 */
export const DemoSelectionButton: ParentComponent<{ eventName: string, text: string; }> = (props) => {
	return (
		<TextButton id={props.eventName} class="DemoButton HotKeyValid ToggleSelection" text={props.text} onactivate={() => {
			ToggleSelection(props.eventName);
		}}>
			<EOM_Icon type="ArrowSolidRight" width="10px" height="16px" align="right center" marginRight="4px" />
		</TextButton>
	);
};

/** 选择容器 */
interface SelectContainerAttribute extends PanelAttributes {
	/** 事件名 */
	eventName: string,
	/** 标题 */
	title: string,
	/** 子元素 */
	itemNames?: string[],

	/** 筛选选项 */
	toggleList?: object,

	// 初始状态
	defaultLock?: boolean,
	defaultRawMode?: boolean,

	//是否显示控件
	hasRawMode?: boolean,
	hasToggleSize?: boolean,
	hasLock?: boolean,
	hasFilter?: boolean,
	hasDragable?: boolean,
	canScroll?: boolean;

	/** 搜索回调 */
	onSearch?: (text: string) => void;
	/** 分类回调 */
	onToggleType?: (text: string) => void;
	/** 更改显示模式回调 */
	onChangeRawMode?: (rawMode: boolean) => void;
}

export const SelectionContainer: ParentComponent<SelectContainerAttribute> = (props) => {
	const merged = mergeProps({ canScroll: false }, props);
	const [local, others] = splitProps(merged, [
		"eventName", "title", "itemNames", "toggleList", "defaultLock", "defaultRawMode", "hasRawMode", "hasToggleSize", "hasLock", "hasFilter", "hasDragable", "onSearch", "onToggleType", "onChangeRawMode", "canScroll"
	]);
	// Prevent parent child getter from subscribing to internal signals in child subtree.
	const resolvedChildren = children(() => untrack(() => props.children));
	const [lock, setLock] = createSignal(local.defaultLock ?? false);
	const [rawMode, setRawMode] = createSignal(local.defaultRawMode ?? false);
	const [hasToggleList, setHasToggleList] = createSignal(Object.keys(local.toggleList ?? {}).length > 0);
	const [size, setSize] = createSignal({
		width: props.width ?? "864px",
		height: props.height ?? "620px"
	});
	// 切换显示模式
	const toggleRawMode = () => {
		setRawMode(!rawMode());
		if (local.onChangeRawMode) {
			local.onChangeRawMode(rawMode());
		}
	};
	// 切换窗口大小
	const toggleSize = (sizeText: string[]) => {
		setSize({
			width: sizeText[0] + "px",
			height: sizeText[1] + "px",
		});
		SaveConfig("size_" + local.eventName, sizeText[0] + "px" + "," + sizeText[1] + "px");
	};
	// 拖拽相关
	let dragable = false;
	let dragPanel: Panel & { offsetX?: number, offsetY?: number; } | undefined = undefined;
	const dragStart = (panel: Panel & { dragable?: boolean; }) => {
		if (local.hasDragable != false) {
			dragable = true;
			let parent = panel.FindAncestor(local.eventName);
			if (parent) {
				dragPanel = parent;
				dragTimer();
			}
		}
	};
	const dragTimer = () => {
		if (dragable) {
			if (dragPanel != undefined && dragPanel.IsValid()) {
				if (GameUI.IsMouseDown(0)) {
					let position = GameUI.GetCursorPosition();
					if (dragPanel.offsetX == undefined || dragPanel.offsetY == undefined) {
						dragPanel.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
						dragPanel.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
						dragPanel.style.align = "left top";
						dragPanel.style.margin = "0px 0px 0px 0px";
					}
					if (dragPanel.offsetX != undefined && dragPanel.offsetY != undefined) {
						dragPanel.SetPositionInPixels((position[0] + dragPanel.offsetX) / dragPanel.actualuiscale_x, (position[1] + dragPanel.offsetY) / dragPanel.actualuiscale_y, 0);
					}
				} else {
					dragPanel.offsetX = undefined;
					dragPanel.offsetY = undefined;
				}
				$.Schedule(Game.GetGameFrameTime(), dragTimer);
			}
		} else {
			dragPanel = undefined;
		}
	};
	onMount(() => {
		const sizeConfig = GetPlayerConfig("size_" + local.eventName);
		if (sizeConfig) {
			const sizeText = sizeConfig.split(",");
			if (sizeText.length == 2) {
				setSize({
					width: sizeText[0],
					height: sizeText[1],
				});
			}
		}
	});
	return (
		<Panel id={local.eventName} class={classNames("SelectionContainer", { LockWindow: lock() })} hittest={true} width={size().width} height={size().height}>
			<Panel id="SelectionPicker" >
				<Panel id="SelectionPickerHeader" onactivate={() => { }} onmouseover={self => dragStart(self)} onmouseout={self => dragable = false} >
					<Label id="SelectionTitle" text={local.title} />
					<Panel class="FillWidth" />
					<Show when={local.hasFilter != false}>
						<Panel id="SelectionSearch" class="SearchBox" >
							<Show when={hasToggleList()}>
								<EOM_DropDown placeholder="筛选" onChange={(index, item) => {
									if (local.onToggleType) {
										local.onToggleType(Object.keys(local.toggleList ?? {})[index - 1]);
									}
								}} onClear={() => {
									if (local.onToggleType) {
										local.onToggleType("");
									}
								}}>
									<Label id="EOM_DropDown_Clear" text="X 清除筛选" />
									<For each={Object.keys(local.toggleList ?? {})}>
										{(key, index) => (
											// @ts-ignore
											<Label text={local.toggleList?.[key] ?? ""} />
										)}
									</For>
								</EOM_DropDown>
							</Show>
							<TextEntry id="SelectionSearchTextEntry" borderLeftWidth={hasToggleList() ? "0px" : "1px"} placeholder="#DOTA_Search" onload={self => {
								self.SetDisableFocusOnMouseDown(false);
							}} oninputsubmit={(self) => {
								if (local.onSearch) {
									local.onSearch(self.text);
								}
							}} ontextentrychange={(self) => {
								if (self.text == "") {
									if (local.onSearch) {
										local.onSearch("");
									}
								}
							}} />
						</Panel>
					</Show>
					{/* 功能按钮 */}
					<Show when={local.hasRawMode != false}>
						<EOM_BaseButton class="HeaderButton" classList={{ Enable: rawMode() }} tooltip="查看内部编码" onactivate={() => toggleRawMode()} >
							<Image width="26px" svgfill="white" src="s2r://panorama/images/control_icons/24px/alt.vsvg" />
						</EOM_BaseButton>
						{/* <Panel class="CodeModeLabel" tooltip="查看内部编码" tooltipPosition="top" height="28px" verticalAlign="center">
							<TextButton fontSize="20px" width="27px" height="27px" marginTop="2px" text={rawMode() ? "汉" : "Aa"} onactivate={() => toggleRawMode()} />
						</Panel> */}
					</Show>
					<Show when={local.hasToggleSize != false}>
						<EOM_BaseButton class="HeaderButton" tooltip="切换窗口大小" >
							<Image width="26px" svgfill="white" src="s2r://panorama/images/control_icons/24px/full_screen.vsvg" />
							<EOM_DropDown id="ToggleSize" width="100px" onChange={(index, item) => { toggleSize(item.text.split("x")); }}>
								<Label text={"1280x720"} />
								<Label text={"864x620"} />
								<Label text={"620x360"} />
								<Label text={"620x620"} />
							</EOM_DropDown>
						</EOM_BaseButton>
						{/* <EOM_IconButton width="30px" tooltip="切换窗口大小" tooltipPosition="top" icon={<EOM_Icon type="ArrowExpand" />} >
						</EOM_IconButton> */}
					</Show>
					<Show when={local.hasLock != false}>
						<EOM_BaseButton class="HeaderButton" classList={{ Enable: lock() }} tooltip="锁定窗口" onactivate={() => setLock(!lock())} >
							<Image svgfill="white" src={`s2r://panorama/images/custom_game/eom_design/codicon/${lock() ? "lock" : "unlock"}.svg`} />
						</EOM_BaseButton>
						{/* <EOM_BaseButton width="28px" verticalAlign="center" tooltip="锁定窗口" tooltipPosition="top" class={classNames("LockIconButton", { Unlock: !lock() })} onactivate={() => setLock(!lock())} >
							<Image svgfill="#9aa5a8" width="24px" height="24px" src="s2r://panorama/images/custom_game/eom_design/codicon/lock.svg" />
						</EOM_BaseButton> */}
					</Show>
					<EOM_BaseButton class="HeaderButton" tooltip="关闭窗口" onactivate={() => ToggleSelection(local.eventName)} >
						<Image svgfill="white" src="s2r://panorama/images/control_icons/24px/x_close.vsvg" />
					</EOM_BaseButton>
				</Panel>
				{/* 物品列表 */}
				<Panel id="SelectionList" overflow={local.canScroll ? "squish scroll" : "clip"} >
					{resolvedChildren()}
				</Panel>
			</Panel>
		</Panel>
	);
};

export const EOM_DebugTool_TextPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
	// 切换toggle callback
	toggleCallback?: (toggleType: string) => void;
	// event额外参数
	extraEventParams?: Table;
	// 特殊tooltipText
	tooltipText?: (str: string) => string;
}> = (props) => {
	const [rawMode, setRawMode] = createSignal(false);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const visiable = (itemName: string) => {
		if (props.filterFunc) {
			if (!props.filterFunc(toggleType(), itemName)) {
				return false;
			}
		}
		if (itemName.search(filterWord()) == -1 && GetLocalization("#" + itemName,).search(filterWord()) == -1) {
			return false;
		}
		return true;
	};
	createEffect(() => {
		if (props.toggleCallback) {
			if (toggleType() != "") {
				props.toggleCallback(toggleType());
			}
		}
	});
	return (
		<SelectionContainer
			eventName={props.eventName}
			title={props.title}
			hasFilter
			toggleList={props.toggleList}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
		// width="620px"
		// height="360px"
		>
			<Panel class="EOM_DebugTool_TextPicker" flowChildren="right-wrap" width="100%" height="100%" scroll="y" >
				<For each={props.itemNames}>
					{(itemName, index) => <TextButton visible={visiable(itemName)} class="EOM_DebugTool_TextPickerItem" text={rawMode() ? itemName : ("#" + itemName)} tooltip_text={props.tooltipText ? props.tooltipText(itemName) : "#" + itemName + "_description"} onactivate={self => FireEvent(props.eventName, itemName, props.extraEventParams)} />}
				</For>
			</Panel>
		</SelectionContainer>
	);
};

/** 技能选择 */
export const EOM_DebugTool_AbilityPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
}> = (props) => {
	const [local, other] = splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
		>
			<Panel class="EOM_DebugTool_AbilityPicker" flowChildren="right-wrap" width="100%" scroll="y" >
				{local.itemNames?.map((abilityname, index) => {
					if (local.filterFunc) {
						if (!local.filterFunc(toggleType(), abilityname)) {
							return;
						}
					}
					if (filterWord() != "") {
						if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && GetLocalization("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
							return;
						}
					}
					return (
						<EOM_BaseButton class="EOM_DebugTool_AbilityPickerItem" width="64px" flowChildren="down" onactivate={self => FireEvent(local.eventName, abilityname)} onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityTooltip>(p, { abilityname: abilityname })} onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}>
							<DOTAAbilityImage abilityname={abilityname} showtooltip={false} />
							<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname} />
						</EOM_BaseButton>
					);
				})}
			</Panel>
		</SelectionContainer>
	);
};

/** 选择物品 */
export const EOM_DebugTool_ItemPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
}> = (props) => {
	const [local, other] = splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	const visiable = (abilityname: string) => {
		if (local.filterFunc) {
			if (!local.filterFunc(toggleType(), abilityname)) {
				return false;
			}
		}
		if (filterWord() != "") {
			if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && GetLocalization("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
				return false;
			}
		}
		return true;
	};

	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			canScroll={false}
		>
			<Panel width={"100%"} height="100%" margin="-6px" backgroundColor="#00000066" >
				<Panel class="EOM_DebugTool_AbilityPicker" marginTop="10px" paddingTop="30px" flowChildren="right-wrap" width="100%" scroll="y" >
					<For each={local.itemNames}>
						{(abilityname, index) => <EOM_BaseButton visible={visiable(abilityname)} class="EOM_DebugTool_AbilityPickerItem" width="64px" flowChildren="down" onactivate={self => FireEvent(local.eventName, abilityname)} onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityShopItemTooltip>(p, { abilityname: abilityname, guidename: "", entityindex: -1 as EntityIndex })} onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}>
							<DOTAItemImage itemname={abilityname} showtooltip={false} />
							<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname} />
						</EOM_BaseButton>}
					</For>
				</Panel>
			</Panel >
		</SelectionContainer>
	);
};
