import { reloadable } from "../lib/tstl-utils";

type TimerType = "GameTimer" | "Timer" | "Modifier";
type TimerData = {
	interval: number;
	stack: number;
	type: TimerType;
	entity?: CBaseEntity;
	callback: () => number | void;
};

/** 计时器，不会被游戏暂停 */
@reloadable
class CTimer extends CModule {
	logicTimer?: CBaseEntity;
	index: number = 1;
	timerList: Record<string, TimerData> = {};
	activeTimerIds: string[] = [];
	removedTimerCount: number = 0;
	record: number = 0;

	// reset() {
	// 	this.index = 1;
	// 	this.timerList = {};
	// 	this.record = 0;
	// }

	private EnsureTimerStorage() {
		if (this.timerList == undefined) {
			this.timerList = {};
		}
		if (this.activeTimerIds == undefined) {
			this.activeTimerIds = [];
			for (const id of Object.keys(this.timerList)) {
				if (this.timerList[id] != undefined) {
					this.activeTimerIds.push(id);
				}
			}
		}
		if (this.removedTimerCount == undefined) {
			this.removedTimerCount = 0;
		}
	}

	private RemoveTimerById(id: string) {
		if (this.timerList[id] != undefined) {
			delete this.timerList[id];
			this.removedTimerCount++;
		}
	}

	private CompactActiveTimerIds() {
		if (this.removedTimerCount <= 0) {
			return;
		}
		if (this.removedTimerCount < 64 && this.removedTimerCount * 2 < this.activeTimerIds.length) {
			return;
		}

		const activeTimerIds: string[] = [];
		for (const id of this.activeTimerIds) {
			if (this.timerList[id] != undefined) {
				activeTimerIds.push(id);
			}
		}
		this.activeTimerIds = activeTimerIds;
		this.removedTimerCount = 0;
	}

	Think() {
		this.EnsureTimerStorage();
		this.record++;
		const frame = FrameTime();
		const isGamePaused = IsServer() ? GameRules.IsGamePaused() : false;
		for (const i of $range(this.activeTimerIds.length, 1, -1)) {
			const id = this.activeTimerIds[i - 1];
			const timerData = this.timerList[id];
			// 回调中StopTimer会导致timerData为空
			if (timerData == undefined) {
				continue;
			}
			// 暂停处理
			if (isGamePaused && (timerData.type == "GameTimer" || timerData.type == "Modifier")) {
				continue;
			}
			// 实体销毁
			if (timerData.entity != undefined && !IsValid(timerData.entity)) {
				// 销毁计时器
				this.RemoveTimerById(id);
				continue;
			}
			timerData.stack += frame;
			// 时间到期
			if (timerData.stack >= timerData.interval) {
				let [_, interval] = xpcall(timerData.callback, traceback, timerData.entity ?? this);
				if (this.timerList[id] != timerData) {
					continue;
				}
				if (typeof interval == "number") {
					timerData.stack -= timerData.interval;
					// 根据return的间隔开启下一次think
					// let _interval = math.max(interval, FRAME_TIME);
					timerData.interval = math.max(interval, FrameTime());
				} else if (timerData.type == "Modifier") {
					// Modifier不会return interval，特殊处理
					timerData.stack -= timerData.interval;
				} else {
					// 没有return销毁计时器
					this.RemoveTimerById(id);
				}
			}
		}
		this.CompactActiveTimerIds();
	}

	init(reload: boolean): void {
		if (!reload) {
			if (IsServer()) {
				this.logicTimer = SpawnEntityFromTableSynchronous("logic_timer", {
					origin: "0 0 0",
					RefireTime: 0,
				});
				// 私有脚本作用域里挂一个回调函数
				const scope = this.logicTimer.GetOrCreatePrivateScriptScope() as Record<string, (...args: unknown[]) => void>;
				scope.OnTimer = () => {
					this.Think();
				};
				this.logicTimer.RedirectOutput("OnTimer", "OnTimer", this.logicTimer);
			}

			if (IsClient()) {
				SpawnEntityFromTableAsynchronous("prop_dynamic", {
					origin: "0 0 0",
					model: "models/development/invisiblebox.vmdl"
					/** @noSelf **/
				}, ((logicTimer: CBaseEntity) => {
					logicTimer.SetContextThink(DoUniqueString("Timer"), () => {
						this.Think();
						return FrameTime();
					}, 0)
					// @ts-ignore
				}) as typeof noSelfFunction, undefined);
			}
		}
	}

	StartThink(type: TimerType, entity: any, fInterval: any, funcThink: () => number | void) {
		this.EnsureTimerStorage();
		fInterval = math.max(fInterval, FrameTime());
		const id = tostring(this.index);
		this.timerList[id] = {
			interval: fInterval,
			stack: 0,
			type: type,
			entity: entity,
			callback: funcThink
		};
		this.activeTimerIds.push(id);
		this.index++;
		return id;
	}

	// 不暂停
	Timer(fInterval: number, funcThink: () => any, _?: any): string;
	Timer(entity: any, fInterval: number, funcThink: () => number | void): string;
	Timer(entity: any, fInterval: any, funcThink: () => number | void) {
		if (funcThink == undefined) {
			funcThink = fInterval;
			fInterval = entity;
			entity = undefined;
		}
		return this.StartThink("Timer", entity, fInterval, funcThink);
	}

	// 暂停
	GameTimer(fInterval: number, funcThink: () => any, _?: any): string;
	GameTimer(entity: any, fInterval: number, funcThink: () => number | void): string;
	GameTimer(entity: any, fInterval: any, funcThink: any) {
		if (funcThink == undefined) {
			funcThink = fInterval;
			fInterval = entity;
			entity = undefined;
		}
		return this.StartThink("GameTimer", entity, fInterval, funcThink);
	}

	/** 代替Buff上的StartIntervalThink */
	StartIntervalThink(modifier: any, fInterval: number, funcThink: () => void) {
		return this.StartThink("Modifier", modifier, fInterval, funcThink);
	}

	// 清除计时器
	StopTimer(index: string) {
		this.EnsureTimerStorage();
		this.RemoveTimerById(tostring(index));
	}
	RestartTimer(index: string) {
		this.EnsureTimerStorage();
		const id = tostring(index);
		if (this.timerList[id]) {
			this.timerList[id].stack = 0;
		}
	}
}

declare global {
	var Timer: CTimer;
}

Timer ??= new CTimer();
