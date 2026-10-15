import { reloadable } from "../lib/tstl-utils";

interface ClickReportMessage {
	click_type: string;
	detail: string;
}

require("./reconstruct");
require("./side_effect");
require("./config");
require("./common");
require("./unread");
require("./login");
require("./store");
require("./data_record");
require("./draw");
require("./community");
require("./player");

@reloadable
class MService extends CModule {
	private heartBeatsTimer: string;
	private readonly clickReportBatchSize = 10;
	private readonly clickReportFlushDelay = 5;
	private clickReportQueues: Partial<Record<PlayerID, ClickReportMessage[]>> = {};
	private clickReportFlushTimers: Partial<Record<PlayerID, string>> = {};
	initPriority() {
		return 10;
	}
	init(reload: boolean) {
		GameEvent("game_rules_state_change", function (...args) { return this.OnGameRulesStateChange(...args); }, this);
		if (!reload) {
		}
	}
	/**
	 * 获取玩家设置
	 * @param playerID 玩家ID
	 * @param key 设置键名
	 * @param defaultValue 默认值
	 * @returns 玩家设置值或默认值
	 */
	GetPlayerSetting<T>(playerID: PlayerID, key: string, defaultValue: T): T {
		let value = CommonService.GetPlayerServiceNetTable(playerID, "player_key_values")?.[key]?.value as T;
		return tonumber(value) as T ?? value ?? defaultValue;
	}
	/**
	 * 设置玩家设置
	 * @param playerID 玩家ID
	 * @param key 设置键名
	 * @param value 设置值
	 */
	SetPlayerSetting(playerID: PlayerID, key: string, value: any) {
		if (value == true) {
			value = "TRUE";
		}
		if (value == false) {
			value = "FALSE";
		}
		CommonService.CallAction("/v1/key/save", playerID, { type: "setting", key: key, value: tostring(value) });
	}
	/**
	 * 将服务端产生的点击/行为埋点加入玩家队列。
	 * 队列满时立即提交，否则在短延迟后批量提交。
	 */
	ReportClick(playerID: PlayerID, clickType: string, detail: string): void {
		const queue = this.clickReportQueues[playerID] ?? [];
		this.clickReportQueues[playerID] = queue;
		queue.push({
			click_type: clickType,
			detail,
		});

		if (queue.length >= this.clickReportBatchSize) {
			this.FlushClickReport(playerID);
			return;
		}

		if (this.clickReportFlushTimers[playerID] === undefined) {
			this.clickReportFlushTimers[playerID] = Timer.Timer(this.clickReportFlushDelay, () => {
				delete this.clickReportFlushTimers[playerID];
				this.FlushClickReport(playerID);
			});
		}
	}
	/** 立即提交指定玩家尚未发送的埋点。 */
	FlushClickReport(playerID: PlayerID): void {
		const queue = this.clickReportQueues[playerID];
		if (queue === undefined || queue.length == 0) {
			return;
		}

		const timer = this.clickReportFlushTimers[playerID];
		if (timer !== undefined) {
			Timer.StopTimer(timer);
			delete this.clickReportFlushTimers[playerID];
		}

		const clickMessages = queue.slice();
		this.clickReportQueues[playerID] = [];
		CommonService.CallAction("/v1/click/report", playerID, {
			click_messages: clickMessages,
		});
	}
	private OnGameRulesStateChange(events: EventProperties<object>) {
		let state = GameRules.State_Get();
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
			this.StartHeartBeatTimer();
		}
	}
	private StartHeartBeatTimer() {
		const interval = 60;
		if (this.heartBeatsTimer == undefined) {
			this.heartBeatsTimer = Timer.Timer(interval, () => {
				Game.EachPlayer((playerID) => {
					if (PlayerResource.GetConnectionState(playerID) == DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED) {
						CommonService.CallAction("/v1/player/heart_beat", playerID, {});
						CommonService.HTTP_POST("https://metric.eomgames.net/heart_beat", playerID, {
							project: "athena_tsbuild",
							uid: PlayerResource.GetSteamAccountID(playerID)
						});
					}
				});
				return interval;
			});
		}
	}
}

declare global {
	/**
	 * @ServerOnly
	 */
	var Service: MService;
}
Service ??= new MService();
