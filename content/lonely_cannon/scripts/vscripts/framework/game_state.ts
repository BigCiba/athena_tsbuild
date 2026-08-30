import { CGameStateBase } from "../class/game_state_class";
import { reloadable } from "../lib/tstl-utils";

/** 游戏阶段 */
@reloadable
export class CGameState extends CModule {
	private currentGameStage: CGameStateBase;

	init(reload: boolean): void {
		if (!reload) {
			this.currentGameStage = this.CreateStateByName("GameState_Login");
			this.currentGameStage.OnStateStart();
			this.UpdateNetTable();
		}
	}

	/**
	 * 通过类名字符串创建状态实例
	 * @param className 状态类名（如 "GameState_Login"）
	 */
	private CreateStateByName(className: string): CGameStateBase {
		// 使用 require 动态加载模块
		// 编译后的路径格式: game_states.GameState_Login
		const modulePath = `game_states.${className}`;
		const stateModule = require(modulePath);
		const StateClass = stateModule[className];

		if (!StateClass) {
			error(`游戏状态类 ${className} 不存在于模块 ${modulePath}`);
		}
		return new StateClass() as CGameStateBase;
	}

	SwitchState(nextStateClassName?: string) {
		const nextStateName = nextStateClassName ?? this.GetNextStateName(this.currentGameStage);
		const nextState = this.CreateStateByName(nextStateName);

		xpcall(this.currentGameStage.OnStateEnd, traceback, this.currentGameStage);
		xpcall(this.currentGameStage.dispose, traceback, this.currentGameStage);

		this.currentGameStage = nextState;
		xpcall(this.currentGameStage.OnStateStart, traceback, this.currentGameStage);
		this.print("Switching game state from", this.currentGameStage.GetName(), "to", nextState.GetName());
		this.UpdateNetTable();
	}

	GetStateName(): string {
		return this.currentGameStage.GetName();
	}

	GetNextStateName(previousState: CGameStateBase): string {
		if (previousState.GetName() == "GameState_Login") {
			return "GameState_Prepare";
		} else if (previousState.GetName() == "GameState_Prepare") {
			return "GameState_DiffSelection";
		} else if (previousState.GetName() == "GameState_DiffSelection") {
			return "GameState_Dungeon";
		} else if (previousState.GetName() == "GameState_Dungeon") {
			return "GameState_Settle";
		} else if (previousState.GetName() == "GameState_Settle") {
			return "GameState_Prepare";
		}
		return "GameState_Login";
	}
	UpdateNetTable() {
		CustomNetTables.SetNetData("common", "game_state", {
			state: this.currentGameStage.GetName(),
			start_time: this.currentGameStage.timeStart,
			end_time: this.currentGameStage.timeEnd,
		});
	}
}

declare global {
	var GameState: CGameState;
}
GameState ??= new CGameState();