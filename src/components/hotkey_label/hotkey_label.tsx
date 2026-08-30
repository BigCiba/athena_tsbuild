import { insert } from "@bigciba/solid-panorama-runtime";
import { createEffect, createMemo, on, ParentComponent, Show } from "solid-js";
import { createPlayerNetDataSignal, createServiceNetData } from "../../utils/solid_utils";
import { EOM_GamePad } from "../EOMDesign/DataDisplay/EOM_GamePad/EOM_GamePad";
import { EOM_HotKeyDisplay } from "../EOMDesign/DataDisplay/EOM_HotKeyDisplay/EOM_HotKeyDisplay";

const HOTKEY_REPLACERS: [string, KeyFunction][] = [
	["HotKeyAttack", KeyFunction.Attack],
	["HotKeySkill", KeyFunction.Skill],
	["HotKeyDodge", KeyFunction.Dodge],
	["HotKeyDefense", KeyFunction.Defense],
	["HotKeyUltimate", KeyFunction.Ultimate],
];

/** 在文本中插入快捷键提示的组件，主要是用来显示技能快捷键 */
export const HotkeyLabel: ParentComponent<LabelAttributes> = (props) => {
	let ref: LabelPanel | undefined;
	const inputMode = createPlayerNetDataSignal("common", "input_mode", { mode: "keyboard", isGamepad: 0 });
	const playerKeyValues = createServiceNetData("player_key_values", {});
	const isGamepad = createMemo(() => inputMode().isGamepad == 1);

	const getKeyboardHotkey = (func: KeyFunction): string => {
		const data = playerKeyValues();
		const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
		const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
		const keybindData = data?.[`keybind_keyboard${modePrefix}_${func}`];
		if (keybindData !== undefined && keybindData.value !== undefined) {
			return keybindData.value;
		}
		const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
		return defaults[func] ?? "";
	};

	const getGamepadHotkey = (func: KeyFunction): string => {
		return playerKeyValues()[`keybind_gamepad_${func}`]?.value ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
	};

	const HotkeyIcon = (iconProps: { func: KeyFunction; }) => {
		const keyboardHotkey = createMemo(() => getKeyboardHotkey(iconProps.func));
		const gamepadHotkey = createMemo(() => getGamepadHotkey(iconProps.func));
		return <Show when={isGamepad()} fallback={<EOM_HotKeyDisplay hotkey={keyboardHotkey()} />}>
			<EOM_GamePad keyName={gamepadHotkey()} uiScale="70%" marginTop="-4px" />
		</Show>;
	};

	createEffect(on(() => props.text, () => {
		if (ref && ref.IsValid()) {
			let replacers = ref.Children();
			if (replacers.length > 0) {
				replacers.forEach(replacer => {
					const hotkeyReplacer = HOTKEY_REPLACERS.find(([className]) => replacer.BHasClass(className));
					if (hotkeyReplacer !== undefined) {
						replacer.RemoveAndDeleteChildren();
						insert(replacer, <HotkeyIcon func={hotkeyReplacer[1]} />);
					}
				});
			}
		}
	}));
	return <Label {...props} ref={ref} />;
};
