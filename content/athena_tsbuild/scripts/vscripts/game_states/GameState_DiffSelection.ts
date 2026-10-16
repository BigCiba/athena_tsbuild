import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 选人期内已完成难度投票，此阶段只结算票数，不额外等待。 */
@reloadable
export class GameState_DiffSelection extends CGameStateBase {
	OnStateStart(): void {
		GameState.GetSession().ResolveDifficulty();
		GameState.SwitchState("GameState_RunInit");
	}
}
