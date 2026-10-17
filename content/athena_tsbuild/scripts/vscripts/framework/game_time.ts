import { reloadable } from "../lib/tstl-utils";

/** 本局唯一秒/分钟时钟；只发布事实，属性成长和玩法分别订阅。 */
@reloadable
class CGameTime extends CModule {
	private timer?: string;
	private runId = 0;
	private tick = 0;
	private generation = 0;
	init(reload: boolean) {
		Event.UnregisterContext(this);
		Event.Register("game_start", ({ runId }) => { if (runId !== undefined) this.Start(runId); }, this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.Stop(); }, this);
		Event.Register("game_reset", event => { if (event.runId === this.runId) this.Stop(); }, this);
		if (reload && !this.timer) {
			const session = GameState.GetSession();
			if (session.state === "GameState_Battle") this.Start(session.runId);
		}
	}
	private Start(runId: number) {
		const session = GameState.GetSession();
		if (session.runId !== runId || session.state !== "GameState_Battle" || (this.timer && this.runId === runId)) return;
		this.Stop(); this.runId = runId; this.tick = 0;
		const generation = this.generation;
		this.timer = Timer.GameTimer(1, () => {
			if (generation !== this.generation) return;
			const current = GameState.GetSession();
			if (this.runId !== runId || current.runId !== runId || current.state !== "GameState_Battle") { this.Stop(); return; }
			this.tick++;
			Event.FireUnit("tick_time", { runId, tick: this.tick, tick_time: 1 });
			// 秒事件可能结束本局；结束后不能继续发送同一时刻的分钟事件。
			if (generation === this.generation && this.timer && this.runId === runId && this.tick % 60 === 0
				&& GameState.GetSession().state === "GameState_Battle") Event.FireUnit("tick_time", { runId, tick: this.tick, tick_time: 60 });
			return generation === this.generation && this.timer ? 1 : undefined;
		});
	}
	private Stop() { this.generation++; if (this.timer) Timer.StopTimer(this.timer); this.timer = undefined; }
}
declare global { var GameTime: CGameTime; }
GameTime ??= new CGameTime();
