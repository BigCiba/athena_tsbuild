enum KeyCode {
	Q = "Q",
	W = "W",
	E = "E",
	R = "R",
	T = "T",
	Y = "Y",
	U = "U",
	// I="I",
	O = "O",
	P = "P",
	A = "A",
	S = "S",
	D = "D",
	F = "F",
	G = "G",
	H = "H",
	J = "J",
	K = "K",
	L = "L",
	Z = "Z",
	X = "X",
	C = "C",
	V = "V",
	B = "B",
	N = "N",
	M = "M",

	Backquote = "`",
	Tab = "TAB",
	Capslock = "CAPSLOCK",
	Shift = "SHIFT",
	Ctrl = "CTRL",
	//无效 Alt="ALT",
	Space = "SPACE",
	// Minus="-",
	// Equal="=",
	// Backspace="BACKSPACE",
	// BracketLeft="[",
	// BracketRight="]",
	// Backslash="\\",
	//无效 Semicolon=";",
	// Quote="'",
	// Comma=",",
	// Period=".",
	// Slash="/",
	//无效 Enter="RETURN",

	// Printscreen="PRINTSCREEN",
	// ScrollLock="SCROLLLOCK",
	// Pause="PAUSE",
	//无效 Insert="INSERT",
	// Home="HOME",
	//无效 Delete="DELETE",
	// End="END",
	//无效 PageUp="PAGEUP",
	//无效 PageDown="PAGEDOWN",
	//无效 Up="UP",
	//无效 Down="DOWN",
	//无效 Left="LEFT",
	//无效 Right="RIGHT",

	Digit1 = "1",
	Digit2 = "2",
	Digit3 = "3",
	Digit4 = "4",
	Digit5 = "5",
	Digit6 = "6",
	Digit7 = "7",
	Digit8 = "8",
	Digit9 = "9",
	Digit0 = "0",

	// S1_UP="S1_UP",
	// S1_DOWN="S1_DOWN",
	// S1_LEFT="S1_LEFT",
	// S1_RIGHT="S1_RIGHT",
	// A_BUTTON="A_BUTTON",
	// B_BUTTON="B_BUTTON",
	// X_BUTTON="X_BUTTON",
	// Y_BUTTON="Y_BUTTON",
	// L_SHOULDER="L_SHOULDER",
	// R_SHOULDER="R_SHOULDER",
	// L_TRIGGER="L_TRIGGER",
	// R_TRIGGER="R_TRIGGER",
	// X_AXIS="X_AXIS",

	// Keypad1="KEYPAD1",
	// Keypad2="KEYPAD2",
	// Keypad3="KEYPAD3",
	// Keypad4="KEYPAD4",
	// Keypad5="KEYPAD5",
	// Keypad6="KEYPAD6",
	// Keypad7="KEYPAD7",
	// Keypad8="KEYPAD8",
	// Keypad9="KEYPAD9",
	// Keypad0="KEYPAD0",
	// KeypadPeriod="KEYPAD.",
	// NumLock="NUMLOCK",
	//无效 KeypadDivide="KEYPAD/",
	//无效 KeypadMultiply="KEYPAD*",
	//无效 KeypadSubtract="KEYPAD-",
	//无效 KeypadAdd="KEYPAD+",
	//无效 KeypadEnter="KEYPAD ENTER",

	Esc = "ESCAPE",
	// F1="F1",
	// F2="F2",
	// F3="F3",
	// F4="F4",
	// F5="F5",
	// F6="F6",
	// F7="F7",
	// F8="F8",
	// F9="F9",
	// F10="F10",
	// F11="F11",
	// F12="F12",
};

/**
 * 根据功能获取当前快捷键（优先玩家自定义，其次默认键位）
 * @param func 功能枚举 KeyFunction
 * @returns 快捷键名（如 W、SPACE、MOUSE0）
 */
function GetKeyBind(func: KeyFunction): string {
	const playerKeyValues = getServiceNetData("player_key_values", Players.GetLocalPlayer());
	if (playerKeyValues !== undefined) {
		const mode = playerKeyValues["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
		const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
		const keybindData = playerKeyValues[`keybind_keyboard${modePrefix}_${func}`];
		if (keybindData !== undefined && keybindData.value !== undefined) {
			return keybindData.value;
		}
	}
	const mode = playerKeyValues?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
	const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
	return defaults[func] ?? "";
}

/**
 * 注册一个按键事件
 * @param keyName 按键名
 * @param funcPressedCallback 按下按键事件回调
 * @param funcReleasedCallback 松开按键事件回调
 * @returns 返回事件字符串用于取消注册
 */
function RegisterKeyEvent(keyName: string, funcPressedCallback?: (data: any) => void, funcReleasedCallback?: (data: any) => void) {
	let data = ClientRequest("register_key_event", { key_name: keyName });
	if (data) {
		let uniqueName = data.unique_name;
		Game.AddCommand(`+${uniqueName}`, (...arg) => {
			if (funcPressedCallback != undefined) {
				funcPressedCallback(data);
			}
		}, "", 67108864);
		Game.AddCommand(`-${uniqueName}`, () => {
			if (funcReleasedCallback != undefined) {
				funcReleasedCallback(data);
			}
		}, "", 67108864);
		return data.event_name;
	}
}

/**
 * 注销注册的按键事件
 * @param sEventName 事件字符串
 * @returns 是否注销成功
 */
function UnregisterKeyEvent(keyName: string) {
	return ClientRequest("unregister_key_event", { event_name: keyName })?.success;
}

/**
 * 注册一个技能槽位的快捷键
 * @param slot 槽位，从0开始
 * @param keyName 键位
 * @param quickCast 是否是快捷施法
 * @returns 返回注册的事件字符串
 */
function RegisterAbilityKeyEvent(slot: number, keyName: string, quickCast: boolean) {
	let tData = ClientRequest("register_ability_key_event", { slot: slot, key_name: keyName, quick_cast: quickCast });
	if (tData) {
		let sEventName = tData.event_name;
		Game.AddCommand(`+${sEventName}`, () => {
			let hCaster = Players.GetSelectedEntities(Players.GetLocalPlayer())[0];
			if (Entities.IsValidEntity(hCaster)) {
				let hAbility = Entities.GetAbility(hCaster, slot);
				if (Entities.IsValidEntity(hAbility)) {
					if (GameUI.IsAltDown() && Abilities.IsAutocast(hAbility)) {
						GameEvents.SendEventClientSide("custom_ability_key_event", {
							event_name: sEventName,
							phase: 0,
						});
						return;
					} else {
						GameEvents.SendEventClientSide("custom_ability_key_event", {
							event_name: sEventName,
							phase: 1,
						});
					}
				}
			}
		}, "", 67108864);
		Game.AddCommand(`-${sEventName}`, () => {
			let hCaster = Players.GetSelectedEntities(Players.GetLocalPlayer())[0];
			if (Entities.IsValidEntity(hCaster)) {
				let hAbility = Entities.GetAbility(hCaster, slot);
				if (Entities.IsValidEntity(hAbility)) {
					GameEvents.SendEventClientSide("custom_ability_key_event", {
						event_name: sEventName,
						phase: 2,
					});
				}
			}
		}, "", 67108864);
		return tData.event_name;
	}
}

/**
 * 注销注册的技能槽位快捷键
 * @param eventName 事件字符串
 * @returns 是否注销成功
 */
function UnregisterAbilityKeyEvent(eventName: string) {
	return ClientRequest("unregister_ability_key_event", { event_name: eventName })?.success;
}
