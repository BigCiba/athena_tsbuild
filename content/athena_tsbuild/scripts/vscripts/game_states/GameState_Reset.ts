import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 清理失败时留在 Reset，不能带着半清理的世界进入下一局。 */
@reloadable
export class GameState_Reset extends CGameStateBase {
	OnStateStart() {
		const errors = Event.Fire("game_reset", { runId: GameState.GetSession().runId });
		if (errors?.length) throw errors.map(error => error.error).join("; ");
		GameState.GetWorld().Cleanup();
		this.StartThink(0, () => GameState.SwitchState("GameState_Prepare"));
	}
}
