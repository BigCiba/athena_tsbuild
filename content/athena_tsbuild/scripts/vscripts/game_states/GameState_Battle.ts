import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 战斗的计时器与刷怪都由阶段持有，退出后不再推进旧波次。 */
@reloadable
export class GameState_Battle extends CGameStateBase {
	OnStateStart() {
		const runId = GameState.GetSession().runId;
		Event.Fire("game_start", { runId });
		GameState.GetWorld().StartBattle(this);
	}
	OnStateEnd() { GameState.GetWorld().Freeze(); }
}
