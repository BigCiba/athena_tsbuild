import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 结算阶段 */
@reloadable
export class GameState_Settle extends CGameStateBase {
	OnStateStart(): void {
		const result = GameState.GetSession().result;
		try { GameState.GetWorld().Freeze(); }
		finally { if (result) Event.Fire("game_end", result); }
	}
	OnStateEnd(): void {

	}
}
