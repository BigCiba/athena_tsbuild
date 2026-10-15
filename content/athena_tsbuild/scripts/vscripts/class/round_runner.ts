export interface WaveSpawner { unit: string; anchor: string; total: number; batch: number; interval: number; wait: number; }
export interface WaveDefinition { number: number; prepare: number; duration?: number; spawners: WaveSpawner[]; }
export interface WaveHost {
	Spawn(spawner: WaveSpawner): number;
	IsAlive(entity: number): boolean;
	Publish(round: number, stage: "prepare" | "battle" | "end", deadline?: number): void;
	Complete(): void;
	Clear?(entities: number[]): void;
}
/** 每局一个波次实例。调用方持有调度计时器，Stop 后绝不继续刷怪。 */
export class RoundRunner {
	private index = 0;
	private stage: "prepare" | "battle" | "end" = "prepare";
	private deadline = 0;
	private active = false;
	private enemies: number[] = [];
	private spawnState: { spawned: number; next: number; }[] = [];
	constructor(private waves: WaveDefinition[], private host: WaveHost) { }
	Start(now: number) { this.active = true; this.index = 0; this.Prepare(now); }
	Stop() { this.active = false; }
	private Prepare(now: number) {
		const wave = this.waves[this.index];
		if (!wave) { this.active = false; this.host.Complete(); return; }
		this.stage = "prepare"; this.deadline = now + wave.prepare; this.enemies = [];
		this.spawnState = wave.spawners.map(spawner => ({ spawned: 0, next: this.deadline + spawner.wait }));
		this.host.Publish(wave.number, this.stage, this.deadline);
	}
	Tick(now: number) {
		if (!this.active) return;
		const wave = this.waves[this.index];
		if (this.stage === "end") { this.index++; this.Prepare(now); return; }
		if (this.stage === "prepare") {
			if (now < this.deadline) return;
			this.stage = "battle"; this.deadline = wave.duration === undefined ? 0 : now + wave.duration;
			this.host.Publish(wave.number, this.stage, this.deadline || undefined);
		}
		const expired = this.deadline > 0 && now >= this.deadline;
		for (let i = 0; !expired && i < wave.spawners.length; i++) {
			const spawner = wave.spawners[i], progress = this.spawnState[i];
			if (progress.spawned >= spawner.total || now < progress.next) continue;
			const count = Math.min(spawner.batch, spawner.total - progress.spawned);
			for (let n = 0; n < count; n++) this.enemies.push(this.host.Spawn(spawner));
			progress.spawned += count; progress.next = now + spawner.interval;
		}
		this.enemies = this.enemies.filter(entity => this.host.IsAlive(entity));
		const finishedSpawning = wave.spawners.every((spawner, i) => this.spawnState[i].spawned >= spawner.total);
		if (expired || (finishedSpawning && this.enemies.length === 0)) {
			this.host.Clear?.(this.enemies.slice());
			this.stage = "end"; this.host.Publish(wave.number, this.stage);
		}
	}
}
