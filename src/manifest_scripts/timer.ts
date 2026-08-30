interface CustomUIConfig {
	Timer: CPanoramaScript_Timer;
}

class CPanoramaScript_Timer {
	private timers: Record<string, {
		time: number;
		callback: () => number | void;
		running: boolean;
	}> = {};
	private timerKeys: string[] = [];
	private removedTimerCount = 0;
	private scheduleHandle: ScheduleID | undefined;

	constructor() { }

	private EnsureTimerStorage() {
		if (typeof this.timers !== "object") {
			this.timers = {};
		}
		if (!Array.isArray(this.timerKeys)) {
			this.timerKeys = Object.keys(this.timers);
		}
		this.removedTimerCount ??= 0;
	}

	private RemoveTimerByKey(sKey: string) {
		if (this.timers[sKey] !== undefined) {
			delete this.timers[sKey];
			this.removedTimerCount++;
		}
	}

	private CompactTimerKeys() {
		if (this.removedTimerCount <= 0) return;
		if (this.removedTimerCount < 32 && this.removedTimerCount * 2 < this.timerKeys.length) return;

		this.timerKeys = this.timerKeys.filter((sKey) => this.timers[sKey] !== undefined);
		this.removedTimerCount = 0;
	}

	private TimerFunction() {
		this.EnsureTimerStorage();
		let fTime = Game.Time();
		let bNoSchedule = false;

		for (let index = this.timerKeys.length - 1; index >= 0; index--) {
			let sKey = this.timerKeys[index];

			let tData = this.timers[sKey];
			if (tData) {
				let time = tData.time;
				if (typeof time === "number") {
					if (fTime < time) continue;

					if (tData.running === true) {
						bNoSchedule = true;
						continue;
					}

					let callback = tData.callback;
					if (typeof callback === "function") {
						tData.running = true;
						let result = callback();
						tData.running = false;
						if (this.timers[sKey] !== tData) {
							continue;
						}
						if (typeof result === "number") {
							tData.time = fTime + result;
							continue;
						}
					}
				}
			}
			this.RemoveTimerByKey(sKey);
		}

		this.CompactTimerKeys();
		if (!bNoSchedule && this.timerKeys.length > 0) {
			this.scheduleHandle = $.Schedule(Game.GetGameFrameTime(), () => this.TimerFunction());
		} else {
			this.scheduleHandle = undefined;
		}
	}

	/**
	 * 创建/删除计时器
	 * @param sKey 计时器唯一标识
	 * @param fTime 延迟时间（秒）
	 * @param funcCallback 回调函数，返回数字则继续循环
	 */
	CreateTimer(sKey: string, fTime: number, funcCallback: () => number | void) {
		this.EnsureTimerStorage();
		if (typeof fTime === "number" && typeof funcCallback === "function") {
			if (fTime === 0) fTime = 0.0001;
			if (this.timers[sKey] === undefined) {
				this.timerKeys.push(sKey);
			}
			this.timers[sKey] = {
				time: Game.Time() + fTime,
				callback: funcCallback,
				running: false,
			};
		} else {
			this.RemoveTimerByKey(sKey);
		}

		if (this.scheduleHandle) {
			try {
				$.CancelScheduled(this.scheduleHandle);
			} catch (error) { }
			this.scheduleHandle = undefined;
		}
		this.TimerFunction();
	}

	Wait(time: number): Promise<void> {
		return new Promise((resolve) => {
			$.Schedule(time, () => {
				resolve();
			});
		});
	}

	WaitConditionPromise(conditon: () => boolean) {
		return new Promise<void>((resolve) => {
			function check() {
				let result = conditon();
				if (result) {
					return resolve();
				}
				$.Schedule(0, check);
			}
			check();
		});
	}
	/**
	 * 移除计时器
	 * @param sKey 计时器唯一标识
	 */
	RemoveTimer(sKey: string) {
		this.EnsureTimerStorage();
		this.RemoveTimerByKey(sKey);
		this.CompactTimerKeys();
	}

	/**
	 * 清空所有计时器
	 */
	ClearAllTimers() {
		this.timers = {};
		this.timerKeys = [];
		this.removedTimerCount = 0;
		if (this.scheduleHandle) {
			try {
				$.CancelScheduled(this.scheduleHandle);
			} catch (error) { }
			this.scheduleHandle = undefined;
		}
	}
}

const timer = CustomUIConfig.Timer as CPanoramaScript_Timer | undefined;

if (timer !== undefined) {
	Object.setPrototypeOf(timer, CPanoramaScript_Timer.prototype);
	(timer as any).timers ??= {};
	(timer as any).timerKeys ??= Object.keys((timer as any).timers);
	(timer as any).removedTimerCount ??= 0;
} else {
	CustomUIConfig.Timer = new CPanoramaScript_Timer();
}
