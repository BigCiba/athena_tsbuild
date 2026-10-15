import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 每局选人及准备。尚未创建本局世界，也不提前发送 game_start。 */
@reloadable
export class GameState_Prepare extends CGameStateBase {
	OnStateStart(): void {
		GameState.RefreshPlayers();
	}

	OnStateEnd(): void {
	}
}
