import { render } from "@bigciba/solid-panorama-runtime";
import { createMemo, createSignal } from "solid-js";
import { EOM_Popup } from "../../components/EOMDesign/Container/EOM_Popup/EOM_Popup";
import { EOM_GamePad } from "../../components/EOMDesign/DataDisplay/EOM_GamePad/EOM_GamePad";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_DropDown } from "../../components/EOMDesign/Input/EOM_DropDown/EOM_DropDown";
import { createMenuLayout } from "../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { ExchangeEntry } from "../../components/Player/Player";
import { createNetDataSignal, createServiceNetData } from "../../utils/solid_utils";


let currentGamepadBindings: Record<string, string> = { ...DEFAULT_GAMEPAD_BINDINGS };
let keyToFunction: Record<string, KeyFunction> = {};
let registeredKeyboardEventNames: Partial<Record<KeyFunction, string>> = {};
let registeredKeyboardKeys: Partial<Record<KeyFunction, string>> = {};

const KEYBOARD_MOVE_FUNCTIONS: KeyFunction[] = [KeyFunction.Up, KeyFunction.Down, KeyFunction.Left, KeyFunction.Right];

function IsKeyboardMoveFunction(func: KeyFunction): boolean {
	return KEYBOARD_MOVE_FUNCTIONS.includes(func);
}

function IsKeyboardMoveFunctionDisabled(mode: string, func: KeyFunction): boolean {
	return mode !== MOVE_MODE_KEYBOARD && IsKeyboardMoveFunction(func);
}

function RemoveDisabledKeyboardMoveBindings(bindings: Record<string, string>, mode: string) {
	if (mode === MOVE_MODE_KEYBOARD) {
		return;
	}
	for (const func of KEYBOARD_MOVE_FUNCTIONS) {
		delete bindings[func];
	}
}

function RebuildKeyToFunctionMap(keyboardBindings: Record<string, string>, gamepadBindings: Record<string, string>) {
	keyToFunction = {};
	for (const func in keyboardBindings) {
		const keyName = keyboardBindings[func];
		if (keyName) {
			keyToFunction[keyName] = func as KeyFunction;
		}
	}
	for (const func in gamepadBindings) {
		const keyName = gamepadBindings[func];
		if (keyName) {
			keyToFunction[keyName] = func as KeyFunction;
		}
	}
}

function ResolveKeyFunctionByKeyName(keyName: string): KeyFunction | undefined {
	return keyToFunction[keyName];
}

function SyncKeyboardKeyRegistrations(bindings: Record<string, string>) {
	for (const func in bindings) {
		const keyFunction = func as KeyFunction;
		const nextKey = bindings[keyFunction] ?? "";
		const registeredKey = registeredKeyboardKeys[keyFunction] ?? "";
		if (registeredKey === nextKey) {
			continue;
		}

		const registeredEventName = registeredKeyboardEventNames[keyFunction];
		if (registeredEventName) {
			UnregisterKeyEvent(registeredEventName);
			delete registeredKeyboardEventNames[keyFunction];
			delete registeredKeyboardKeys[keyFunction];
		}

		if (nextKey && !nextKey.includes("MOUSE")) {
			const eventName = RegisterKeyEvent(nextKey, onKeyPressed, onKeyReleased);
			if (eventName) {
				registeredKeyboardEventNames[keyFunction] = eventName;
				registeredKeyboardKeys[keyFunction] = nextKey;
			}
		}
	}
}

// 按键事件处理函数
const onKeyPressed = (data: { event_name: string; }) => {
	const keyName = data.event_name;
	const keyFunction = ResolveKeyFunctionByKeyName(keyName);
	const payload: any = {
		key: keyName,
		position: GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition()),
		entIndex: Players.GetLocalPlayerPortraitUnit(),
	};
	if (keyFunction !== undefined) {
		payload.keyFunction = keyFunction;
	}
	ClientSideEvent("key_pressed", payload);
	GameEvents.SendCustomEventToServer("key_pressed", { key: keyName, position: payload.position, entIndex: payload.entIndex });
};
const onKeyReleased = (data: any) => {
	const keyName = data.event_name;
	const keyFunction = ResolveKeyFunctionByKeyName(keyName);
	const payload: any = {
		key: keyName,
		position: GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition()),
		entIndex: Players.GetLocalPlayerPortraitUnit(),
	};
	if (keyFunction !== undefined) {
		payload.keyFunction = keyFunction;
	}
	ClientSideEvent("key_released", payload);
	GameEvents.SendCustomEventToServer("key_released", { key: keyName, position: payload.position, entIndex: payload.entIndex });
};
const [showPicker, setShowPicker] = createSignal<{ func: KeyFunction; panel: Panel; currentKey: string; isGamepad: boolean; text: string; } | undefined>();
const [keyBindings, setKeyBindings] = createSignal<Record<string, string>>({ ...DEFAULT_KEYBOARD_BINDINGS });
const [gamepadBindings, setGamepadBindings] = createSignal<Record<string, string>>({ ...DEFAULT_GAMEPAD_BINDINGS });
const player_key_values = createServiceNetData("player_key_values", {});
const [moveMode, setMoveMode] = createSignal<string>(MOVE_MODE_KEYBOARD);
const [aimMode, setAimMode] = createSignal<string>("2");
const [clickMoveMode, setClickMoveMode] = createSignal<string>(CLICK_MOVE_MODE_CLICK);


function Setting() {
	const { LayoutMenu, show, secondTabName, menuName } = createMenuLayout("setting", () => ({}));
	const settings = createNetDataSignal("common", "settings");
	const gameState = createNetDataSignal("common", "game_state");
	const isLocalHost = createMemo(() => settings()?.is_local_host == true || settings()?.is_local_host);

	return <EOM_Popup id="Setting" title="#MenuButton_setting" classList={{ EOM_PopupMainShow: show(), ShowPicker: showPicker() != undefined }} hideClose={false} onClose={() => ToggleWindow("MenuButton_setting", false)}>
		<Panel id="SettingMain">
			{/* 游戏设置 */}
			<Panel class="SettingColumn">
				<Panel class="TitleRow">
					<Label text="#Setting_Game" class="SectionHeader" />
				</Panel>
				<Panel class="Separator" />
				<Panel class="SettingList VerticalScrollStyle" scroll="y" >

				</Panel>
			</Panel>
			{/* 键盘快捷设置 */}
			<Panel class="SettingColumn">
				<Panel class="TitleRow">
					<Label text="#Setting_Hotkey" class="SectionHeader" />
				</Panel>
				<Panel class="Separator" />
				<Panel id="SettingTabContainer">

				</Panel>
			</Panel>
			{/* 社区 */}
			<Panel class="SettingColumn" >
				<Panel class="TitleRow">
					<Label text="#Store_Exchange_Placeholder" class="SectionHeader" />
				</Panel>
				<Panel class="Separator" />
				<ExchangeEntry />

				<EOM_Button enabled={gameState()?.state == "GameState_Battle"} text="#Setting_GiveUp" align="right bottom" onactivate={() => {
					const snapshot = gameState();
					if (snapshot?.run_id !== undefined && snapshot.state_version !== undefined) GameEvents.SendCustomEventToServer("athena_game_action", { action: "abandon", run_id: snapshot.run_id, state_version: snapshot.state_version });
				}} />
			</Panel>
		</Panel>
	</EOM_Popup>;
}

/** 快捷键设置 */
const KeyBinder = (props: { text: string; func: KeyFunction; hotkey?: string; enabled?: boolean; }) => {
	const enabled = () => props.enabled ?? true;
	return <Panel class="KeyBinderRow" classList={{ Disable: !enabled() }}>
		<Label class="KeyBinderText" text={props.text} />
		<Panel class="KeyBinderInput" enabled={enabled()} onactivate={self => {
			if (!enabled()) {
				return;
			}
			setShowPicker({ func: props.func, panel: self, currentKey: props.hotkey || "", isGamepad: false, text: props.text });
		}} >
			<Label class="KeyBinderHotKey" text={props.hotkey} />
		</Panel>
	</Panel>;
};

const GamepadKeyBinder = (props: { text: string; func: KeyFunction; hotkey?: string; }) => {
	const tooltip = GetLocalization(`${props.text}_Description`, "");
	return <Panel class="KeyBinderRow" tooltip={tooltip == "" ? undefined : tooltip}>
		<Label class="KeyBinderText" text={props.text} />
		<Panel class="GamepadInput" onactivate={self => {
			setShowPicker({ func: props.func, panel: self, currentKey: props.hotkey || "", isGamepad: true, text: props.text });
		}} >
			<EOM_GamePad keyName={props.hotkey} />
		</Panel>
	</Panel>;
};

const HERO_VOICE_LANGUAGES = [
	{ value: "schinese", label: "中文" },
	{ value: "english", label: "English" },
	{ value: "russian", label: "Русский" },
] as const;

type HeroVoiceLanguage = typeof HERO_VOICE_LANGUAGES[number]["value"];

function GetHeroVoiceLanguageSettingValue(value: unknown): HeroVoiceLanguage {
	if (value === "schinese" || value === "english" || value === "russian") {
		return value;
	}
	const language = Language();
	return language === "schinese" || language === "russian" ? language : "english";
}

/** 英雄语音语言 */
const SettingDropDown = (props: { text: string; }) => {
	const key = "setting_switch_" + props.text;
	const tooltip = GetLocalization(`#SettingSwitch_${props.text}_Description`, "");
	const selectedLanguage = createMemo(() => GetHeroVoiceLanguageSettingValue(player_key_values()[key]?.value));
	const selectedIndex = createMemo(() => HERO_VOICE_LANGUAGES.findIndex((option) => option.value === selectedLanguage()));
	return <Panel class="SwitchSettingRow" tooltip={tooltip == "" ? undefined : tooltip}>
		<Label class="SwitchSettingText" text={"#SettingSwitch_" + props.text} />
		<EOM_DropDown type="EquipmentDropDown" index={selectedIndex()} onChange={(index) => {
			const option = HERO_VOICE_LANGUAGES[index];
			if (option != undefined) {
				Players.SetPlayerSetting(key, option.value);
			}
		}}>
			{HERO_VOICE_LANGUAGES.map((option) => <Label text={option.label} />)}
		</EOM_DropDown>
	</Panel>;
};
const SettingSlotSlider = (props: {
	settingName: string;
	notches: number;
	value: number;
}) => {
	const [level, setLevel] = createSignal(props.value);
	let timerID: ScheduleID | undefined;
	const tooltip = GetLocalization(`${props.settingName}_Description`, "");
	return <Panel class="SettingSlotSlider" tooltip={tooltip == "" ? undefined : tooltip}>
		<Label text={`#${props.settingName}`} vars={{ value: GetLocalization("#SkipLevel_" + level()) }} />
		<SlottedSlider class="HorizontalSlider" notches={props.notches} value={1 / (props.notches - 1) * props.value} direction="horizontal" onvaluechanged={self => {
			const level = Round(self.value * (props.notches - 1));
			setLevel(level);
			if (timerID != undefined) {
				$.CancelScheduled(timerID);
			}
			timerID = $.Schedule(3, () => {
				CallAction("/v1/key/save", { type: "setting", key: props.settingName, value: level.toString() });
				timerID = undefined;
			});
		}} />
	</Panel>;
};
/** 百分比设置 */
const SettingSlider = (props: {
	settingName: string;
	value: number;
	min: number;
	max: number;
	enable?: boolean;
	onChange?: (value: number) => void;
}) => {
	const [level, setLevel] = createSignal(props.value);
	let timerID: ScheduleID | undefined;
	const tooltip = GetLocalization(`${props.settingName}_Description`, "");
	return <Panel class="SettingSlider" classList={{ Disable: !(props.enable ?? true) }} tooltip={tooltip == "" ? undefined : tooltip}>
		<Label text={`#${props.settingName}`} vars={{ value: GetLocalization("#SkipLevel_" + level()) }} />
		<Slider enabled={props.enable ?? true} class="HorizontalSlider" min={props.min} max={props.max} value={props.value} direction="horizontal" onvaluechanged={self => {
			const level = Round(self.value);
			setLevel(level);
			props.onChange?.(level);
			if (timerID != undefined) {
				$.CancelScheduled(timerID);
			}
			timerID = $.Schedule(3, () => {
				CallAction("/v1/key/save", { type: "setting", key: props.settingName, value: level.toString() });
				timerID = undefined;
			});
		}} />
	</Panel>;
};


render(Setting, $.GetContextPanel());
