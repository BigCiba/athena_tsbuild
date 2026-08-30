export class CGameStateBase {
	/** 持续时间 */
	//duration?: number;
	/** 开始时间 */
	timeStart: number;
	/** 结束时间 */
	timeEnd?: number;
	/** 计时器 */
	timerID?: string;
	/** 事件ID列表 */
	eventIDList: number[] = [];
	constructor() {

	}
	dispose() {
		this.StopTimer();

		this.eventIDList.forEach((id) => {
			Event.Unregister(id);
		});
	}
	/** 开始阶段 */
	OnStateStart() {

	}
	/** 结束阶段 */
	OnStateEnd() {

	}
	StartThink(interval: number, callback: () => void) {
		this.timerID = Timer.GameTimer(interval, callback);
	}
	Register<K extends keyof EventCallback>(eventName: K, callback: (data: EventCallback[K]) => void): number {
		return this.eventIDList.push(Event.Register(eventName, callback));
	}
	/** 获取当前阶段的名字 */
	GetName() {
		return this.constructor.name;
	}

	StopTimer() {
		if (this.timerID) {
			Timer.StopTimer(this.timerID);
			this.timerID = undefined;
		}
	}
}