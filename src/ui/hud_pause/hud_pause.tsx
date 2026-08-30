import { render } from "@bigciba/solid-panorama-runtime";
import { Show, createEffect, createSignal, on } from "solid-js";
import { useGameEvent } from "solid-panorama-all-in-jsx/events.macro";
import { CustomTip } from "../../components/CustomTip/CustomTip";
import { createNetTableSignal } from "../../utils/solid_utils";

function Root() {
	const [show, setShow] = createSignal($.GetContextPanel().BHasClass("Paused"));

	const customPause = createNetTableSignal("common", "custom_pause", {
		pause: 0
	});
	createEffect(() => {
		setShow(customPause().pause == 1);
		$.GetContextPanel().SetHasClass("Paused", customPause().pause == 1);
	});
	const [sPauseKey, setPauseKey] = createSignal(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_PAUSE));

	useGameEvent("keybind_changed", (events) => {
		setPauseKey(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_PAUSE));
	});

	createEffect(on(sPauseKey, (value) => {
		const sCommand = value + (Date.now() / 1000);
		Game.CreateCustomKeyBind(value, "+" + sCommand);
		Game.AddCommand("+" + sCommand, () => {
			GameEvents.SendCustomEventToServer("CustomTogglePause", {});
		}, "", 1 << 26);
	}));
	return (
		<Show when={show()}>
			<Label id="CustomPausing" text="#CustomPausing" hittest={false} />
			<CustomTip id="PauseCustomTip" hittest={false} />
		</Show>
	);
}

render(() => <Root />, $.GetContextPanel());