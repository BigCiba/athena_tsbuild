import { render } from "@bigciba/solid-panorama-runtime";
import { For, Show } from "solid-js";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { GameVote, sendGameAction } from "../../components/game_lifecycle/GameVote";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_main.less";

function HudMain() {
	const state = createNetDataSignal("common", "game_state");
	const round = createNetDataSignal("common", "round_state");
	const playerID = Players.GetLocalPlayer();
	const player = () => state()?.players?.[playerID];
	const heroes = Object.keys(GameUI.CustomUIConfig().npc_heroes_custom ?? {}).filter(name => name.startsWith("npc_dota_hero_")).sort();
	const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
	return <Panel id="AthenaSessionRoot" hittest={false}>
		<Show when={selecting()}>
			<Panel class="AthenaSessionCard" hittest={true}>
				<Label class="AthenaTitle" text={`${state()?.mode === "solo" ? "单人模式" : "团队模式"} · 第 ${state()?.run_id ?? 1} 局`} />
				<Show when={state()?.state === "GameState_Prepare"}>
					<Label class="AthenaSection" text="选择英雄，等待在线玩家准备" />
					<Panel class="AthenaHeroes">
						<For each={heroes}>{hero => <EOM_Button size="Small" color={player()?.hero === hero ? "Gold" : "Confirm"} text={`#${hero}`} onactivate={() => sendGameAction(state(), { action: "select_hero", hero })} />}</For>
					</Panel>
					<For each={Object.keys(state()?.players ?? {})}>{key => {
						const id = Number(key) as PlayerID;
						return <Show when={state()?.players?.[id]?.online}><Label text={`${Players.GetPlayerName(id)}：${state()?.players?.[id]?.ready ? "已准备" : "未准备"}`} /></Show>;
					}}</For>
					<EOM_Button enabled={!!player()?.online} text={player()?.ready ? "取消准备" : "准备"} onactivate={() => sendGameAction(state(), { action: "ready", ready: !player()?.ready })} />
				</Show>
				<Show when={state()?.state === "GameState_DiffSelection"}>
					<Label class="AthenaSection" text="选择难度（15 秒后按多数票确定，同票取较低难度）" />
					<Panel class="AthenaActions"><For each={[1, 2, 3, 4, 5]}>{difficulty => <EOM_Button color={player()?.difficulty === difficulty ? "Gold" : "Confirm"} enabled={state()?.participants?.includes(playerID)} text={`难度 ${difficulty}`} onactivate={() => sendGameAction(state(), { action: "difficulty", difficulty })} />}</For></Panel>
				</Show>
			</Panel>
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
