import { render } from "@bigciba/solid-panorama-runtime";
import { Show } from "solid-js";
import { GameVote } from "../../components/game_lifecycle/GameVote";
import { TaskPanel } from "../../components/task/TaskPanel";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_main.less";

function HudMain() {
	const state = createNetDataSignal("common", "game_state");
	return <Panel id="AthenaMainRoot" hittest={false}>
		<Show when={state()?.state === "GameState_Battle"}><TaskPanel runId={state()?.run_id ?? 0} /></Show>
		<Show when={state()?.state === "GameState_Battle" && state()?.vote}>
			<Panel class="AthenaBattleVote" hittest={true}>
				<GameVote snapshot={state()} />
			</Panel>
		</Show>
		{/* 小地图 */}
		<Panel id="MinimapContainer">
			<DOTAMinimap />
			<Panel id="MinimapSkin" />
		</Panel>
		{/* 操作面板 */}
		<Panel id="ActionPanel" >
			<Panel id="LeftPart">
				<DOTAPortrait />
				<Panel id="LeftPartSkin" />
			</Panel>
			<Panel id="CenterPart">

			</Panel>
			<Panel id="RightPart">

			</Panel>
		</Panel>
	</Panel>;
}

render(HudMain, $.GetContextPanel());
