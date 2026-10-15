import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_endscreen.less";
import { Show } from "solid-js";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { GameVote, sendGameAction } from "../../components/game_lifecycle/GameVote";

const QUESTIONNAIRE_COMPLETED_COUNTER = "questionnaire_completed";

const EndScreen = () => {
	const gameState = createNetDataSignal("common", "game_state");


	const titles: Record<AthenaOutcome, string> = { victory: "本局胜利", defeat: "本局失败", abandoned: "已放弃本局", error: "本局未能完成" };
	return <Panel id="HudEndScreenRoot" class={classNames("CustomHudRoot", { ShowHud: gameState()?.state === "GameState_Settle" })} hittest={false}>
		<Show when={gameState()?.result}>
			<Panel class="AthenaResultCard" hittest={true}>
				<Label class="AthenaResultTitle" text={titles[gameState()!.result!.outcome]} />
				<Label text={`第 ${gameState()?.run_id} 局 · 难度 ${gameState()?.result?.difficulty} · 用时 ${Math.floor(gameState()?.result?.elapsed ?? 0)} 秒`} />
				<Label text={gameState()?.result?.reason} />
				<Show when={gameState()?.error}><Label text={gameState()?.error} /></Show>
				<EOM_Button text="再来一局" enabled={gameState()?.participants?.includes(Players.GetLocalPlayer()) && !gameState()?.vote} onactivate={() => sendGameAction(gameState(), { action: "replay" })} />
				<GameVote snapshot={gameState()} />
			</Panel>
		</Show>
	</Panel>;
};

render(EndScreen, $.GetContextPanel());
