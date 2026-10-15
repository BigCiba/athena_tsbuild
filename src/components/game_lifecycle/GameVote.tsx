import { Show } from "solid-js";
import { EOM_Button } from "../EOMDesign/Input/EOM_Button/EOM_Button";

/** 只发送意图，局号、阶段、参与资格与投票结果均由服务端校验。 */
export function sendGameAction(snapshot: AthenaGameSnapshot | undefined, action: Omit<AthenaGameAction, "run_id" | "state_version">) {
	if (snapshot?.run_id === undefined || snapshot.state_version === undefined) return;
	GameEvents.SendCustomEventToServer("athena_game_action", { ...action, run_id: snapshot.run_id, state_version: snapshot.state_version });
}

export function GameVote(props: { snapshot: AthenaGameSnapshot | undefined; }) {
	const playerID = Players.GetLocalPlayer();
	return <Show when={props.snapshot?.vote}>
		<Panel class="AthenaVote">
			<Label text={props.snapshot?.vote?.action === "replay" ? "是否再来一局？" : "是否放弃本局？"} />
			<Label text={`已同意 ${props.snapshot?.vote?.accepted.length ?? 0}/${props.snapshot?.vote?.voters.length ?? 0}，30 秒内未通过将取消。`} />
			<Panel class="AthenaActions">
				<EOM_Button text="同意" enabled={props.snapshot?.vote?.voters.includes(playerID) && !props.snapshot?.vote?.accepted.includes(playerID)} onactivate={() => sendGameAction(props.snapshot, { action: "accept", vote_id: props.snapshot?.vote?.id })} />
				<EOM_Button text="取消" color="Cancel" enabled={props.snapshot?.vote?.voters.includes(playerID)} onactivate={() => sendGameAction(props.snapshot, { action: "reject", vote_id: props.snapshot?.vote?.id })} />
			</Panel>
		</Panel>
	</Show>;
}
