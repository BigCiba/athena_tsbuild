import { render } from "@bigciba/solid-panorama-runtime";
import { Show } from "solid-js";
import { HeroSelection } from "../../components/hero_selection/HeroSelection";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_hero_selection.less";

function HudHeroSelection() {
	const state = createNetDataSignal("common", "game_state");
	const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
	return <Panel id="AthenaHeroSelectionRoot" hittest={false}>
		<Show when={selecting()}>
			<HeroSelection snapshot={state()} />
		</Show>
	</Panel>;
}

render(HudHeroSelection, $.GetContextPanel());
