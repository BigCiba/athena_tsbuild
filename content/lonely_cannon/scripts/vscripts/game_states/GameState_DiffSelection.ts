import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 选完英雄后的准备阶段 */
@reloadable
export class GameState_DiffSelection extends CGameStateBase {
	OnStateStart(): void {
		EmitAnnouncerSound("UI.DiffSelection");
	}
}