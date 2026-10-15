import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 选完英雄后的准备阶段 */
@reloadable
export class GameState_DiffSelection extends CGameStateBase {
	OnStateStart(): void {
		this.timeEnd = this.timeStart + 15;
		this.StartThink(15, () => {
			GameState.GetSession().ResolveDifficulty();
			GameState.SwitchState("GameState_RunInit");
		});
	}
}
