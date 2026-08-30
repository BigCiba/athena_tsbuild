import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

@reloadable
export class GameState_Login extends CGameStateBase {
	times: number = 0;
	OnStateStart(): void {
		Timer.Timer(1, () => {
			if (Login.IsAllLoginState()) {
				GameState.SwitchState("GameState_Prepare");
				return;
			}
			this.times++;
			// if (this.times > 100) {
			// 	GameState.SwitchState();
			// 	return;
			// }
			return 1;
		});
	}
}