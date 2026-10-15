import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 创建本局世界；初始化失败统一进入错误结算，保留清理和重试入口。 */
@reloadable
export class GameState_RunInit extends CGameStateBase {
	OnStateStart() {
		const runId = GameState.GetSession().runId;
		try {
			GameState.GetWorld().Initialize(GameState.GetSession());
			this.StartThink(0, () => GameState.SwitchState("GameState_Battle", runId));
		} catch (reason) {
			GameState.FinishRun(runId, "error", tostring(reason));
		}
	}
}
