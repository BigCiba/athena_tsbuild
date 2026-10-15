import { render } from "@bigciba/solid-panorama-runtime";
import { Show } from "solid-js";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { GameVote, sendGameAction } from "../../components/game_lifecycle/GameVote";
import { HeroSelection } from "../../components/hero_selection/HeroSelection";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_main.less";

function HudMain() {
	const state = createNetDataSignal("common", "game_state");
	const round = createNetDataSignal("common", "round_state");
	const playerID = Players.GetLocalPlayer();
	const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
	return <Panel id="AthenaSessionRoot" hittest={false}>
		<Show when={selecting()}>
			<HeroSelection snapshot={state()} />
		</Show>
		<Show when={state()?.state === "GameState_Battle"}>
			<Panel class="AthenaBattleBar" hittest={true}>
				<Label text={`第 ${state()?.run_id} 局 · 难度 ${state()?.difficulty} · 第 ${round()?.round_number ?? 1} 波 · ${round()?.stage === "prepare" ? "备战" : "战斗"}`} />
				<EOM_Button size="Small" text="放弃本局" enabled={state()?.participants?.includes(playerID) && !state()?.vote} onactivate={() => sendGameAction(state(), { action: "abandon" })} />
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
