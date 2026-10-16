import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 战斗阶段准备基地/英雄，再通知玩法模块开始本局。 */
@reloadable
export class GameState_Battle extends CGameStateBase {
	OnStateStart() {
		const runId = GameState.GetSession().runId;
		GameState.GetWorld().StartBattle(this);
		Event.Fire("game_start", { runId });
	}
	OnStateEnd() { GameState.GetWorld().Freeze(); }
}
