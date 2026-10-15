import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

@reloadable
export class GameState_Login extends CGameStateBase {
	OnStateStart(): void {
		this.StartThink(0.5, () => {
			if (GameState.GetOnlinePlayers().length > 0 && Login.IsAllLoginState() && GameRules.State_Get() === DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
				GameState.SwitchState("GameState_Prepare");
				return;
			}
			return 0.5;
		}, true);
	}
}
