import { render } from "@bigciba/solid-panorama-runtime";
import { Show } from "solid-js";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { GameVote, sendGameAction } from "../../components/game_lifecycle/GameVote";
import { HeroSelection } from "../../components/hero_selection/HeroSelection";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_main.less";
import { TaskPanel } from "../../components/task/TaskPanel";

function HudMain() {
	const state = createNetDataSignal("common", "game_state");
	const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
	return <Panel id="AthenaSessionRoot" hittest={false}>
		<Show when={state()?.state === "GameState_Battle"}><TaskPanel runId={state()?.run_id ?? 0} /></Show>
		<Show when={selecting()}>
			<HeroSelection snapshot={state()} />
		</Show>
		<Show when={state()?.state === "GameState_Battle" && state()?.vote}>
			<Panel class="AthenaBattleVote" hittest={true}>
				<GameVote snapshot={state()} />
			</Panel>
		</Show>
		<Show when={state()?.state === "GameState_RunInit" || state()?.state === "GameState_Reset"}>
			<Panel class="AthenaSessionCard" hittest={true}>
				<Label class="AthenaTitle" text={state()?.state === "GameState_Reset" ? "正在清理本局" : "正在初始化本局"} />
				<Show when={state()?.error}><Label class="AthenaError" text={state()?.error} /><EOM_Button text="重试清理" onactivate={() => sendGameAction(state(), { action: "retry_cleanup" })} /></Show>
			</Panel>
		</Show>
	</Panel>;
}

(function () {
})();

render(HudMain, $.GetContextPanel());
