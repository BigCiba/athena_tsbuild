import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 每局选人及准备。尚未创建本局世界，也不提前发送 game_start。 */
@reloadable
export class GameState_Prepare extends CGameStateBase {
	OnStateStart(): void {
		this.timeEnd = this.timeStart + 30;
		GameState.RefreshPlayers();
		const runId = GameState.GetSession().runId;
		this.StartThink(30, () => {
			// 全员断线时不创建空局；恢复在线玩家后再完成本次选人。
			if (!GameState.CompleteSelection(runId)) return 1;
		});
	}

	OnStateEnd(): void {
	}
}
