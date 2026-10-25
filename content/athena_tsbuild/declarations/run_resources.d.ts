/** 局内资源快照；与 service 中的账号资产分开，所有写入必须携带 runId。 */
type AthenaRunResource = "gold" | "crystal" | "score" | "experience";
interface AthenaPlayerResources {
	gold: number;
	crystal: number;
	score: number;
	experience: number;
	level: number;
	level_exp: number;
	next_level_exp: number;
}
interface AthenaResourceSnapshot {
	run_id: number;
	active: boolean;
	players: Record<string, AthenaPlayerResources>;
}
