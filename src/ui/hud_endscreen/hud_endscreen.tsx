import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_endscreen.less";

const QUESTIONNAIRE_COMPLETED_COUNTER = "questionnaire_completed";

const EndScreen = () => {
	const gameState = createNetDataSignal("common", "game_state");


	return <Panel id="HudEndScreenRoot" class={classNames("CustomHudRoot", {
	})}>

	</Panel>;
};

render(EndScreen, $.GetContextPanel());
