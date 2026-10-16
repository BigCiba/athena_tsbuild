/** Athena 局内任务的数据与事件契约；状态数字沿用原版。 */
interface AthenaTaskDefinition {
	TaskTag?: string;
	UnlockType?: string;
	UnlockName?: string;
	AutoComplete?: string | number;
	TaskStage: Record<string, { TaskStageType: string; TaskStageTarget: string; TaskStageCount: string | number; TaskPosition?: string; }>;
	TaskReward?: Record<string, { TaskRewardType: string; TaskRewardName?: string; }>;
}
interface AthenaActiveTask {
	tStageProgress: Record<string, number>;
}
interface AthenaPlayerTasks {
	tInProgress: Record<string, AthenaActiveTask>;
	tComplete: Record<string, number>;
	rewardErrors: Record<string, string>;
}
interface AthenaTaskReward {
	type: string;
	name: string;
	amount: number;
}
