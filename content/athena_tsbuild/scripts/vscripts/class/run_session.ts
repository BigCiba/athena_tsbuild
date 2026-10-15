/** 纯对局规则，不调用 Dota 引擎；每次准备都会生成新的局号。 */
export class RunSession {
	state: AthenaStateName = "GameState_Login";
	version = 0;
	runId = 0;
	difficulty = 2;
	players: Partial<Record<PlayerID, AthenaPlayerSelection>> = {};
	participants: PlayerID[] = [];
	result?: AthenaRunResult;
	vote?: AthenaVote;
	private voteSequence = 0;
	constructor(readonly mode: AthenaMode, readonly defaultHero: string) { }
	Matches(runId: number, version: number) { return runId === this.runId && version === this.version; }
	/** 仅允许设计中的转换；错误结算也必须经过 Reset。 */
	Transition(next: AthenaStateName): boolean {
		const edges: Record<AthenaStateName, AthenaStateName[]> = {
			GameState_Login: ["GameState_Prepare"], GameState_Prepare: ["GameState_DiffSelection"],
			GameState_DiffSelection: ["GameState_RunInit"], GameState_RunInit: ["GameState_Battle", "GameState_Settle"],
			GameState_Battle: ["GameState_Settle"], GameState_Settle: ["GameState_Reset"], GameState_Reset: ["GameState_Prepare"],
		};
		if (edges[this.state].indexOf(next) < 0) return false;
		if (next === "GameState_DiffSelection" && this.participants.length === 0) return false;
		if (next === "GameState_Settle" && !this.result) return false;
		this.state = next; this.version++; this.vote = undefined;
		if (next === "GameState_Prepare") {
			this.runId++; this.difficulty = 2; this.participants = []; this.result = undefined;
			for (const key of Object.keys(this.players)) { const player = this.players[Number(key) as PlayerID]!; player.ready = false; player.difficulty = 2; }
		}
		return true;
	}
	/** 参战名单锁定后，新连接玩家只旁观到下一局。投票成员掉线会取消本次投票。 */
	SyncPlayers(online: PlayerID[]) {
		for (const key of Object.keys(this.players)) this.players[Number(key) as PlayerID]!.online = false;
		for (const id of online) {
			if (this.players[id]) this.players[id]!.online = true;
			else if (this.state === "GameState_Prepare" || this.state === "GameState_Login") this.players[id] = { hero: this.defaultHero, ready: false, difficulty: 2, online: true };
		}
		if (this.vote && this.vote.voters.some(id => !this.players[id]?.online)) this.vote = undefined;
	}
	SelectHero(id: PlayerID, hero: string) {
		const player = this.players[id];
		if (this.state !== "GameState_Prepare" || !player?.online) return false;
		player.hero = hero; player.ready = false; return true;
	}
	SetReady(id: PlayerID, ready: boolean) {
		const player = this.players[id];
		if (this.state !== "GameState_Prepare" || !player?.online) return false;
		player.ready = ready; return true;
	}
	LockParticipants() {
		if (this.state !== "GameState_Prepare") return false;
		const online = Object.keys(this.players).map(key => Number(key) as PlayerID).filter(id => this.players[id]!.online);
		if (!online.length || online.length > (this.mode === "solo" ? 1 : 4) || online.some(id => !this.players[id]!.ready)) return false;
		this.participants = online; return true;
	}
	SetDifficulty(id: PlayerID, value: number) {
		if (this.state !== "GameState_DiffSelection" || this.participants.indexOf(id) < 0 || !this.players[id]?.online || value % 1 !== 0 || value < 1 || value > 5) return false;
		this.players[id]!.difficulty = value; return true;
	}
	/** 沿用原版多数票、同票取较低难度；未投票者默认选择难度 2。 */
	ResolveDifficulty() {
		let best = 1, bestCount = -1;
		for (let value = 1; value <= 5; value++) {
			const count = this.participants.filter(id => this.players[id]!.difficulty === value).length;
			if (count > bestCount) { best = value; bestCount = count; }
		}
		this.difficulty = best; return best;
	}
	/** 同一局只接受一次结果，旧局异步回调不能影响新局。 */
	Finish(runId: number, outcome: AthenaOutcome, reason: string, elapsed: number) {
		if (runId !== this.runId || this.result || (this.state !== "GameState_Battle" && this.state !== "GameState_RunInit")) return false;
		this.result = { run_id: runId, outcome, reason, elapsed, difficulty: this.difficulty, participants: this.participants.slice() }; return true;
	}
	RequestVote(id: PlayerID, action: "abandon" | "replay", now: number) {
		if (this.vote || this.participants.indexOf(id) < 0 || !this.players[id]?.online || (action === "abandon" ? this.state !== "GameState_Battle" : this.state !== "GameState_Settle")) return false;
		const voters = this.participants.filter(player => this.players[player]?.online);
		this.vote = { id: ++this.voteSequence, action, deadline: now + 30, voters, accepted: [id] }; return true;
	}
	RespondVote(id: PlayerID, accepted: boolean, now: number, voteId?: number) {
		if (!this.vote || voteId !== this.vote.id || now >= this.vote.deadline || this.vote.voters.indexOf(id) < 0 || !this.players[id]?.online) return false;
		if (!accepted) { this.vote = undefined; return true; }
		if (this.vote.accepted.indexOf(id) < 0) this.vote.accepted.push(id); return true;
	}
	VotePassed(now: number) { return !!this.vote && now < this.vote.deadline && this.vote.voters.length > 0 && this.vote.voters.every(id => this.vote!.accepted.indexOf(id) >= 0); }
	ExpireVote(now: number) { if (this.vote && now >= this.vote.deadline) this.vote = undefined; }
}
