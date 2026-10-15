/** 阶段持有全部计时器和监听器；退出后使晚到的回调失效。 */
export class CGameStateBase {
	timeStart = GameRules.GetGameTime();
	timeEnd?: number;
	private disposed = false;
	private timers: string[] = [];
	private cleanup: (() => void)[] = [];
	dispose() {
		if (this.disposed) return;
		this.disposed = true; this.StopTimer();
		const failures: string[] = [];
		for (let i = this.cleanup.length - 1; i >= 0; i--) { try { this.cleanup[i](); } catch (reason) { failures.push(tostring(reason)); } }
		this.cleanup = [];
		if (failures.length > 0) throw failures.join("; ");
	}
	OnStateStart() { }
	OnStateEnd() { }
	StartThink(interval: number, callback: () => number | void, realTime = false) {
		const guarded = () => { if (!this.disposed) return callback(); };
		const id = realTime ? Timer.Timer(interval, guarded) : Timer.GameTimer(interval, guarded);
		this.timers.push(id); return id;
	}
	Own(cleanup: () => void) { this.cleanup.push(cleanup); }
	/** 原生引擎事件同样归阶段持有，不依赖旧版 modifier_events 转发。 */
	Listen<K extends keyof GameEventDeclarations>(name: K, callback: (event: GameEventProvidedProperties & GameEventDeclarations[K]) => void) {
		const id = ListenToGameEvent(name, event => { if (!this.disposed) callback(event); }, undefined);
		this.Own(() => StopListeningToGameEvent(id)); return id;
	}
	Register<K extends keyof EventCallback>(eventName: K, callback: (data: EventCallback[K]) => void): number {
		const id = Event.Register(eventName, data => { if (!this.disposed) callback(data); });
		this.Own(() => Event.Unregister(id)); return id;
	}
	GetName() { return this.constructor.name; }
	StopTimer() { this.timers.forEach(id => Timer.StopTimer(id)); this.timers = []; }
}
