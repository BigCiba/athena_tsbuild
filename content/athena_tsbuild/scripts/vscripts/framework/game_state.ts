import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";
import { RunSession } from "../class/run_session";
import { AthenaRunWorld } from "../mechanics/athena_run_world";
import { GameState_Login } from "../game_states/GameState_Login";
import { GameState_Prepare } from "../game_states/GameState_Prepare";
import { GameState_DiffSelection } from "../game_states/GameState_DiffSelection";
import { GameState_RunInit } from "../game_states/GameState_RunInit";
import { GameState_Battle } from "../game_states/GameState_Battle";
import { GameState_Settle } from "../game_states/GameState_Settle";
import { GameState_Reset } from "../game_states/GameState_Reset";

/** 游戏阶段 */
@reloadable
export class CGameState extends CModule {
	private currentGameStage: CGameStateBase;
	private session: RunSession;
	private world = new AthenaRunWorld();
	private transitioning = false;
	private pending?: AthenaStateName;
	private monitor?: string;
	private lastError?: string;
	private runStarted = 0;
	initPriority() { return -20; }

	init(reload: boolean): void {
		if (!this.world) this.world = new AthenaRunWorld();
		if (!this.session) {
			const mode: AthenaMode = GetMapName() === "solo" ? "solo" : "team";
			this.session = new RunSession(mode, this.GetHeroList()[0] ?? "npc_dota_hero_phantom_assassin");
			this.currentGameStage = this.CreateStateByName("GameState_Login");
			this.currentGameStage.OnStateStart();
		}
		CustomUIEvent("athena_game_action", this.OnAction, this);
		if (this.monitor) Timer.StopTimer(this.monitor);
		this.monitor = Timer.Timer(0.5, () => {
			this.RefreshPlayers(); this.session.ExpireVote(Time()); this.UpdateNetTable(); return 0.5;
		});
		if (IsInToolsMode()) {
			Convars.RegisterCommand("athena_run_result", (_command, value) => {
				if (value === "victory" || value === "defeat") this.FinishRun(this.session.runId, value, "开发工具手动结束本局");
			}, "DEV: finish current run with victory/defeat", 0);
		}
		this.UpdateNetTable();
	}

	/**
	 * 通过类名字符串创建状态实例
	 * @param className 状态类名（如 "GameState_Login"）
	 */
	private CreateStateByName(className: AthenaStateName): CGameStateBase {
		const states = { GameState_Login, GameState_Prepare, GameState_DiffSelection, GameState_RunInit, GameState_Battle, GameState_Settle, GameState_Reset };
		const State = states[className]; return new State();
	}

	SwitchState(nextStateClassName?: AthenaStateName, runId = this.session.runId): void {
		if (runId !== this.session.runId) return;
		const next = nextStateClassName ?? this.GetNextStateName();
		if (this.transitioning) { this.pending = next; return; }
		const previous = this.session.state;
		if (!this.session.Transition(next)) return;
		this.transitioning = true; this.lastError = undefined;
		try {
			let exitError: string | undefined;
			try { this.currentGameStage.dispose(); } catch (reason) { exitError = tostring(reason); }
			try { this.currentGameStage.OnStateEnd(); } catch (reason) { exitError = tostring(reason); }
			this.currentGameStage = this.CreateStateByName(next);
			if (exitError && (next === "GameState_RunInit" || next === "GameState_Battle")) throw exitError;
			if (next === "GameState_Battle") this.runStarted = GameRules.GetGameTime();
			this.currentGameStage.OnStateStart();
		} catch (reason) {
			this.lastError = tostring(reason); this.error(this.lastError);
			if (next === "GameState_RunInit" || next === "GameState_Battle") this.FinishRun(runId, "error", this.lastError);
		} finally { this.transitioning = false; }
		this.print("Switching game state from", previous, "to", next);
		this.UpdateNetTable();
		const pending = this.pending; this.pending = undefined;
		if (pending) this.SwitchState(pending);
	}

	GetStateName(): string {
		return this.session.state;
	}

	GetNextStateName(): AthenaStateName {
		const next: Record<AthenaStateName, AthenaStateName> = { GameState_Login: "GameState_Prepare", GameState_Prepare: "GameState_DiffSelection", GameState_DiffSelection: "GameState_RunInit", GameState_RunInit: "GameState_Battle", GameState_Battle: "GameState_Settle", GameState_Settle: "GameState_Reset", GameState_Reset: "GameState_Prepare" };
		return next[this.session.state];
	}
	GetSession() { return this.session; }
	GetWorld() { return this.world; }
	GetHeroList() { return Object.keys(KeyValues.heroes).filter(name => name.indexOf("npc_dota_hero_") === 0).sort(); }
	GetOnlinePlayers(): PlayerID[] {
		const result: PlayerID[] = [];
		Game.EachPlayer(id => { if (PlayerResource.GetTeam(id) === DOTATeam_t.DOTA_TEAM_GOODGUYS && PlayerResource.GetConnectionState(id) === DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED) result.push(id); });
		return result;
	}
	RefreshPlayers() {
		const online = this.GetOnlinePlayers(); this.session.SyncPlayers(online);
		this.world.PreparePlayers(this.session.state === "GameState_Login" || this.session.state === "GameState_Prepare" ? online : online.filter(id => this.session.participants.indexOf(id) < 0));
	}
	FinishRun(runId: number, outcome: AthenaOutcome, reason: string) {
		const elapsed = this.session.state === "GameState_Battle" ? math.max(0, GameRules.GetGameTime() - this.runStarted) : 0;
		if (!this.session.Finish(runId, outcome, reason, elapsed)) return;
		Game.SetGameResult(outcome === "victory"); this.SwitchState("GameState_Settle", runId);
	}
	/** 开发工具也走同一条终局和清理流程，不直接全局 reset。 */
	DebugRestart() { if (IsInToolsMode()) { if (this.session.state === "GameState_Battle") this.FinishRun(this.session.runId, "abandoned", "开发工具放弃本局"); else if (this.session.state === "GameState_Settle") this.SwitchState("GameState_Reset"); } }
	/** 每局仅在选人期限结束后锁定名单，未确认英雄由服务器随机选择。 */
	CompleteSelection(runId: number) {
		if (runId !== this.session.runId || this.session.state !== "GameState_Prepare") return false;
		this.RefreshPlayers();
		const heroes = this.GetHeroList().filter(name => tonumber(KeyValues.heroes[name].IsHero) === 1 && KeyValues.heroes[name].UnitLabel !== "hide");
		if (!this.session.FinalizeSelection(heroes, count => RandomInt(0, count - 1))) return false;
		this.SwitchState("GameState_DiffSelection", runId); return true;
	}
	private OnAction(event: UIEventProperties<"athena_game_action">) {
		this.RefreshPlayers();
		if (!this.session.Matches(event.run_id, event.state_version)) { this.UpdateNetTable(); return; }
		const id = event.PlayerID;
		if (event.action === "retry_cleanup" && this.session.state === "GameState_Reset" && this.lastError && this.session.participants.indexOf(id) >= 0 && this.session.players[id]?.online) {
			try { this.currentGameStage.OnStateStart(); this.lastError = undefined; } catch (reason) { this.lastError = tostring(reason); }
			this.UpdateNetTable(); return;
		}
		if (event.action === "select_hero" && event.hero && this.GetHeroList().indexOf(event.hero) >= 0) this.session.SelectHero(id, event.hero);
		const ready: unknown = event.ready;
		// Dota 自定义事件会把客户端 boolean 转为 0/1；兼容直接调用的布尔值。
		if (event.action === "ready" && (typeof ready === "boolean" || ready === 0 || ready === 1)) {
			if (!Login.IsPlayerRequiredLoginCompleted(id)) return;
			this.session.SetReady(id, ready === true || ready === 1);
		}
		if (event.action === "difficulty" && typeof event.difficulty === "number") this.session.SetDifficulty(id, event.difficulty);
		const now = Time();
		if (event.action === "abandon" || event.action === "replay") this.session.RequestVote(id, event.action, now);
		if (event.action === "accept" || event.action === "reject") this.session.RespondVote(id, event.action === "accept", now, event.vote_id);
		if (this.session.VotePassed(now)) {
			if (this.session.vote!.action === "abandon") this.FinishRun(this.session.runId, "abandoned", "参战玩家确认放弃");
			else this.SwitchState("GameState_Reset");
		}
		this.UpdateNetTable();
	}
	UpdateNetTable() {
		CustomNetTables.SetNetData("common", "game_state", {
			state: this.session.state,
			start_time: this.currentGameStage.timeStart,
			end_time: this.currentGameStage.timeEnd,
			run_id: this.session.runId, state_version: this.session.version, mode: this.session.mode,
			difficulty: this.session.difficulty, players: this.session.players, participants: this.session.participants,
			result: this.session.result, vote: this.session.vote, error: this.lastError,
		});
	}
}

declare global {
	var GameState: CGameState;
}
GameState ??= new CGameState();
