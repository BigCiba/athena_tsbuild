/** 跨服务端与 Panorama 的每局生命周期协议。操作必须携带局号和阶段版本。 */
type AthenaMode = "solo" | "team";
type AthenaOutcome = "victory" | "defeat" | "abandoned" | "error";
type AthenaStateName = "GameState_Login" | "GameState_Prepare" | "GameState_DiffSelection" | "GameState_RunInit" | "GameState_Battle" | "GameState_Settle" | "GameState_Reset";
interface AthenaPlayerSelection { hero: string; ready: boolean; difficulty: number; online: boolean; }
interface AthenaRunResult { run_id: number; outcome: AthenaOutcome; reason: string; difficulty: number; elapsed: number; participants: PlayerID[]; }
interface AthenaVote { id: number; action: "abandon" | "replay"; deadline: number; voters: PlayerID[]; accepted: PlayerID[]; }
interface AthenaGameSnapshot {
	state: string; start_time: number; end_time?: number;
	run_id?: number; state_version?: number; mode?: AthenaMode; difficulty?: number;
	players?: Partial<Record<PlayerID, AthenaPlayerSelection>>; participants?: PlayerID[];
	result?: AthenaRunResult; vote?: AthenaVote; error?: string;
}
interface AthenaGameAction {
	run_id: number; state_version: number;
	action: "select_hero" | "ready" | "difficulty" | "abandon" | "replay" | "accept" | "reject" | "retry_cleanup";
	hero?: string; ready?: boolean; difficulty?: number; vote_id?: number;
}
