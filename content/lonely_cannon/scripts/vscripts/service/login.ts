import { reloadable } from "../lib/tstl-utils";

interface PlayerLoginSteps {
	login: boolean;
	setting: boolean;
	equipment: boolean;
	mails: boolean;
	activities: boolean;
	attributes: boolean;
};

interface PlayerLoginInfo {
	state: PlayerLoginState;
	steps: PlayerLoginSteps;
	ban_end_time?: number;
};

const REQUIRED_LOGIN_STEPS: Array<keyof PlayerLoginSteps> = ["login", "setting", "equipment", "attributes"];

@reloadable
class CLogin extends CModule {
	/** 是否初始化完成，比如登录接口，config等数据 */
	loginState: Partial<Record<PlayerID, PlayerLoginInfo>> = {};
	private ServiceTimeOffset?: number;
	private SystemTimeOffset?: number;
	/** 战令当前赛季，会根据配置的开始时间自动推算 */
	BP_SEASON = 1;
	BPSeasonChecked = false;
	ShouldFetchAfterCheck = false;
	pendingBattlePassPlayers: Partial<Record<PlayerID, boolean>> = {};
	init(reload: boolean) {
		if (!reload) {

		}
		Event.Register("game_init", () => {
			this.Login();
		});
		CustomUIEvent("login_retry_white_list", (event) => {
			this.RetryWhiteListLogin(event.PlayerID);
		});
		Event.Register("service_data_change", (event) => {
			if (event.key == "player_auth") {
				this.OnPlayerAuthChanged(event.playerID);
			}
		});
	}
	/** 登录 */
	Login() {
		Game.EachPlayer((playerID) => {
			this.LoginPlayer(playerID);
		});
		this.RequestServerTime();
		// 获取商品卡池活动开始结束时间
		CommonService.CallAction("/v1/server/info", -1, {});
	}

	private LoginPlayer(playerID: PlayerID) {
		this.print("LoginPlayer")
		if (this.FailCheatModeLogin(playerID)) {
			return;
		}
		if (this.RequireLocalHostAuth(playerID)) {
			return;
		}
		CommonService.RepeatCallAction("/v1/player/login", playerID, {}, (playerID, result) => {
			let code = toFiniteNumber(result.code, -1);
			if (code == 0) {
				const info = this.ensureLoginInfo(playerID);
				if (result.data != undefined && result.data.black_list != undefined) {
					info.state = PlayerLoginState.Banned;
					info.ban_end_time = result.data.black_list.time ?? 0;
					this.syncLoginState();
				} else {
					info.state = PlayerLoginState.Success;
					info.steps.login = true;
					this.syncLoginState();
				}
				CommonService.CommonCallback(playerID, result);
				this.TriggerPostLoginSteps(playerID);
			} else if (toFiniteString(result.message) == "not in white list") { // 如果不在白名单，则进入白名单邀请码状态
				const info = this.ensureLoginInfo(playerID);
				info.state = PlayerLoginState.NoPermission;
				this.syncLoginState();
			}
		}, false);
	}

	private RetryWhiteListLogin(playerID: PlayerID) {
		if (this.FailCheatModeLogin(playerID)) {
			return;
		}
		if (this.RequireLocalHostAuth(playerID)) {
			return;
		}
		const info = this.ensureLoginInfo(playerID);
		if (info.state != PlayerLoginState.NoPermission) {
			return;
		}
		info.state = PlayerLoginState.None;
		this.syncLoginState();

		let retryCount = 5;
		Timer.Timer(1, () => {
			const currentInfo = this.ensureLoginInfo(playerID);
			if (currentInfo.state == PlayerLoginState.Success || currentInfo.state == PlayerLoginState.Banned) {
				return;
			}
			this.LoginPlayer(playerID);
			retryCount--;
			if (retryCount > 0) {
				return 2;
			}
		});
	}

	private FailCheatModeLogin(playerID: PlayerID): boolean {
		if (IsInToolsMode() || !GameRules.IsCheatMode()) {
			return false;
		}
		const info = this.ensureLoginInfo(playerID);
		info.state = PlayerLoginState.Failed;
		this.syncLoginState();
		ErrorMessage("error_cheat_mode_not_allowed", playerID);
		return true;
	}

	private ShouldUseLocalHostAuth(): boolean {
		return !IsDedicatedServer() && !IsInToolsMode();
	}

	private RequireLocalHostAuth(playerID: PlayerID): boolean {
		if (!this.ShouldUseLocalHostAuth()) {
			return false;
		}
		const auth = CommonService.GetPlayerServiceNetTable(playerID, "player_auth");
		if (auth?.player_session != undefined && auth.player_session != "") {
			return false;
		}
		const info = this.ensureLoginInfo(playerID);
		info.state = PlayerLoginState.NeedAuth;
		this.syncLoginState();
		return true;
	}

	private OnPlayerAuthChanged(playerID: PlayerID): void {
		if (!this.ShouldUseLocalHostAuth()) {
			return;
		}
		const auth = CommonService.GetPlayerServiceNetTable(playerID, "player_auth");
		if (auth?.player_session == undefined || auth.player_session == "") {
			return;
		}
		const info = this.ensureLoginInfo(playerID);
		if (info.state != PlayerLoginState.NeedAuth) {
			return;
		}
		info.state = PlayerLoginState.None;
		this.syncLoginState();
		this.LoginPlayer(playerID);
	}
	/**
	 * 创建初始登录步骤状态
	 * @returns 包含所有登录步骤为false的初始状态对象
	 */
	private createInitialSteps(): PlayerLoginSteps {
		return {
			login: false,
			setting: false,
			equipment: false,
			mails: false,
			activities: false,
			attributes: false,
		};
	}
	/**
	 * 确保指定玩家的登录信息存在，如果不存在则创建
	 * @param playerID 玩家ID
	 * @returns 玩家登录信息对象
	 */
	private ensureLoginInfo(playerID: PlayerID): PlayerLoginInfo {
		const info = this.loginState[playerID];
		if (info != undefined) {
			if (info.steps == undefined) {
				info.steps = this.createInitialSteps();
			}
			return info;
		}
		const fresh: PlayerLoginInfo = {
			state: PlayerLoginState.None,
			steps: this.createInitialSteps(),
		};
		this.loginState[playerID] = fresh;
		return fresh;
	}
	/**
	 * 执行登录后的数据步骤，确保每个步骤只触发一次
	 * @param playerID 玩家ID
	 */
	private TriggerPostLoginSteps(playerID: PlayerID) {
		const info = this.ensureLoginInfo(playerID);
		if (info.state != PlayerLoginState.Success) {
			return;
		}
		this.FetchPlayerRequiredData(playerID);
		this.FetchPlayerOptionalData(playerID);
	}

	/**
	 * 登录阶段获取玩家的必要数据
	 * @param playerID 
	 */
	private FetchPlayerRequiredData(playerID: PlayerID) {
		this.FetchPlayerSettings(playerID);
		this.FetchPlayerEquipment(playerID);
		this.FetchPlayerAttributes(playerID);
	}

	/**
	 * 后台静默加载的数据
	 * @param playerID 
	 */
	private FetchPlayerOptionalData(playerID: PlayerID) {
		this.FetchPlayerMail(playerID);
		this.FetchPlayerActivities(playerID);
		this.FetchPlayerFishes(playerID);
		this.FetchPlayerFishingBagSettings(playerID);
		this.FetchPlayerEquipmentBreakSettings(playerID);
		this.FetchPlayerBriefData(playerID);
		this.FetchPlayerAllEquipment(playerID);
	}

	/**
	 * 获取玩家设置
	 * @param playerID 
	 */
	private FetchPlayerSettings(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/key/fetch", playerID, { type: "settings" }, (playerID, result) => {
			if (toFiniteNumber(result.code, -1) == 0) {
				this.MarkStepCompleted(playerID, "setting");
			}
			CommonService.CommonCallback(playerID, result);
			this.EnsureDefaultKeyboardBindings(playerID);
		});
	}

	private EnsureDefaultKeyboardBindings(playerID: PlayerID): void {
		const playerKeyValues = CommonService.GetPlayerServiceNetTable(playerID, "player_key_values") ?? {};
		const missingBindings: Record<string, { key: string; value: string; }> = {};
		let hasMissingBindings = false;

		for (const [func, key] of pairs(DEFAULT_KEYBOARD_BINDINGS)) {
			const settingKey = `keybind_keyboard_${func}`;
			const existingValue = playerKeyValues[settingKey]?.value;
			if (existingValue === undefined || existingValue === "") {
				missingBindings[settingKey] = {
					key: settingKey,
					value: key,
				};
				hasMissingBindings = true;
			}
		}

		if (hasMissingBindings === false) {
			return;
		}

		CommonService.SetPlayerServiceNetData(playerID, "player_key_values", missingBindings as any);
	}

	/**
	 * 获取指定玩家的装备数据
	 * @param playerID 玩家ID
	 */
	private FetchPlayerEquipment(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/equip/fetch_all", playerID, { only_equipped: true }, (playerID, result) => {
			if (toFiniteNumber(result.code, -1) == 0) {
				this.MarkStepCompleted(playerID, "equipment");
			}
			CommonService.CommonCallback(playerID, result);
		});
	}

	/**
	 * 后台静默获取玩家全部装备数据（包括未装备的）
	 * @param playerID 玩家ID
	 */
	private FetchPlayerAllEquipment(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/equip/fetch_all", playerID, { only_equipped: false }, (playerID, result) => {
			CommonService.CommonCallback(playerID, result, false);
		});
	}

	/**
	 * 获取指定玩家的邮件数据
	 * @param playerID 玩家ID
	 */
	private FetchPlayerMail(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/mails/fetch", playerID, {}, (playerID, result) => {
			if (toFiniteNumber(result.code, -1) == 0) {
				this.MarkStepCompleted(playerID, "mails");
			}
			CommonService.CommonCallback(playerID, result);
		});
	}
	/**
	 * 获取指定玩家的存档属性和特权
	 * @param playerID 玩家ID
	 */
	public FetchPlayerAttributes(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/outside/get_privileges", playerID, {}, (playerID, result) => {
			if (toFiniteNumber(result.code, -1) == 0) {
				this.MarkStepCompleted(playerID, "attributes");
			}
			CommonService.CommonCallback(playerID, result);
		});
	}
	/**
	 * 处理所有挂起的战令数据请求
	 */
	private FlushPendingBattlePassFetch() {
		for (const [playerIDKey, pending] of Object.entries(this.pendingBattlePassPlayers)) {
			if (!pending) continue;
			const numericPlayerID = toFiniteNumber(playerIDKey, -1) as PlayerID;
			if (numericPlayerID >= 0) {
				this.BPFetch(numericPlayerID, { step: "activities", playerID: numericPlayerID, preIncremented: true });
			}
			delete this.pendingBattlePassPlayers[numericPlayerID];
		}
		this.ShouldFetchAfterCheck = false;
	}
	/**
	 * 获取指定玩家的活动数据
	 * @param playerID 玩家ID
	 */
	private FetchPlayerActivities(playerID: PlayerID) {
		// 活动页面依赖各活动专属的玩家网表。这里必须在登录成功后统一预拉取，
		// 本地主机的认证完成前不具备 player_session，前端提前请求会丢失且不会重试。
		const activity_data = LoadKeyValues("scripts/npc/service/activity_data.kv")
		const activityConfigs = activity_data ?? {};
		for (const [activityID] of pairs(activityConfigs)) {
			const numericActivityID = tonumber(activityID);
			if (numericActivityID == undefined || numericActivityID <= 0) {
				continue;
			}
			CommonService.CallAction("/v1/activity/data", playerID, { activity_id: numericActivityID });
		}
		this.RequestBattlePass(playerID);
	}

	private FetchPlayerFishes(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/idle_game/fetch_fishes", playerID, {}, (currentPlayerID, response) => {
			CommonService.CommonCallback(currentPlayerID, response, false);
		});
	}

	private FetchPlayerFishingBagSettings(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/key/fetch", playerID, { type: "fishing_bag" }, (currentPlayerID, response) => {
			CommonService.CommonCallback(currentPlayerID, response, false);
		});
	}

	private FetchPlayerEquipmentBreakSettings(playerID: PlayerID) {
		CommonService.RepeatCallAction("/v1/key/fetch", playerID, { type: "equipment_break" }, (currentPlayerID, response) => {
			CommonService.CommonCallback(currentPlayerID, response, false);
		});
	}

	private FetchPlayerBriefData(playerID: PlayerID) {
		const targetUID = OVERRIDE_STEAMID ?? PlayerResource.GetSteamAccountID(playerID);
		CommonService.RepeatCallAction("/v1/brief/get_data", playerID, { target_uid: targetUID }, (currentPlayerID, response) => {
			CommonService.CommonCallback(currentPlayerID, response, false);
		});
		CommonService.RepeatCallAction("/v1/brief/show_room", playerID, { target_uid: targetUID }, (currentPlayerID, response) => {
			CommonService.CommonCallback(currentPlayerID, response, false);
		});
	}
	/**
	 * 请求指定玩家的战令数据
	 * @param playerID 玩家ID
	 */
	private RequestBattlePass(playerID: PlayerID) {
		if (this.BPSeasonChecked) {
			this.BPFetch(playerID, { step: "activities", playerID });
		} else {
			this.pendingBattlePassPlayers[playerID] = true;
			this.ShouldFetchAfterCheck = true;
		}
	}

	/**
	 * 获取战令数据
	 * @param targetPlayerID 目标玩家ID，如果未指定则为所有玩家获取
	 * @param options 可选参数，包含步骤、玩家ID和是否预增量等信息
	 */
	private BPFetch(targetPlayerID?: PlayerID, options?: { step?: keyof PlayerLoginSteps; playerID?: PlayerID; preIncremented?: boolean; }) {
		if (targetPlayerID != undefined) {
			if (!PlayerResource.IsFakeClient(targetPlayerID)) {
				if (options?.step != undefined && options.playerID != undefined) {
					CommonService.RepeatCallAction("/v1/battle_pass/fetch", targetPlayerID, { season: this.BP_SEASON }, (playerID, result) => {
						if (toFiniteNumber(result.code, -1) == 0) {
							this.MarkStepCompleted(playerID, "activities");
						}
						CommonService.CommonCallback(playerID, result);
					});
				} else {
					CommonService.CallAction("/v1/battle_pass/fetch", targetPlayerID, { season: this.BP_SEASON });
				}
			}
			return;
		}
		Game.EachPlayer(playerID => {
			this.BPFetch(playerID, options != undefined ? { ...options, playerID } : undefined);
		});
	}

	/**
	 * 标记指定步骤完成
	 */
	private MarkStepCompleted(playerID: PlayerID, step: keyof PlayerLoginSteps) {
		const info = this.ensureLoginInfo(playerID);
		if (info.steps[step] != true) {
			info.steps[step] = true;
			this.print(`[MarkStepCompleted] 玩家 ${playerID} 完成步骤: ${step}`);
			this.syncLoginState();
		} else {
			this.print(`[MarkStepCompleted] 玩家 ${playerID} 步骤 ${step} 已完成`);
		}
	}
	/**
	 * 同步登录状态到客户端网络表
	 */
	private syncLoginState() {
		CustomNetTables.SetNetData("common", "login_state", this.loginState);
	}

	/**
	 * 请求服务器时间并初始化时间偏移量
	 */
	private RequestServerTime() {
		let url = CommonService.WrapUrl("/server/time");
		const handle = CreateHTTPRequestScriptVM("POST", url);
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		if (IsDedicatedServer()) {
			handle.SetHTTPRequestHeaderValue("Authorization", ServerKey);
		}
		handle.SetHTTPRequestRawPostBody("application/json", "{}");
		handle.SetHTTPRequestAbsoluteTimeoutMS(30 * 1000);
		handle.Send((response) => {
			PrintLongStr(`StatusCode: ${response.StatusCode}\tBody: ${response.Body}`, url);
			if (response != undefined && response.Body) {
				let [result] = json.decode(response.Body);

				if (result != undefined && result.data != undefined && result.data.server_time != undefined) {
					let time = result.data.server_time;
					this.ServiceTimeOffset = time;
					this.SystemTimeOffset = GetSystemTimeMS() * 0.001;
					Timer.Timer(GameRules.GetGameModeEntity(), 1, () => {
						CustomNetTables.SetNetData("common", "server_time", {
							time_stamp: this.GetServiceTimestamp(),
						});
						return 1;
					});
				}
			}
		});
	}

	/**
	 * 获取当前时间戳，以服务器为准
	 * @returns 服务器时间戳，如果时间偏移量未设置则返回0
	 */
	GetServiceTimestamp() {
		if (this.SystemTimeOffset == undefined || this.ServiceTimeOffset == undefined) return 0;
		return this.ServiceTimeOffset + (GetSystemTimeMS() * 0.001 - this.SystemTimeOffset);
	}

	private IsRequiredStepCompleted(info: PlayerLoginInfo, step: keyof PlayerLoginSteps): boolean {
		return info.steps[step] === true;
	}

	/**
	 * 检查指定玩家是否完成进入下一游戏阶段所需的关键登录步骤
	 */
	IsPlayerRequiredLoginCompleted(playerID: PlayerID): boolean {
		const info = this.loginState[playerID];
		if (info == undefined) {
			return false;
		}

		if (info.state != PlayerLoginState.Success) {
			return false;
		}

		for (let i = 0; i < REQUIRED_LOGIN_STEPS.length; i++) {
			const step = REQUIRED_LOGIN_STEPS[i];
			if (!this.IsRequiredStepCompleted(info, step)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * 检查指定玩家是否完成所有登录步骤
	 * @param playerID 玩家ID
	 * @returns 是否完成所有步骤
	 */
	IsPlayerLoginCompleted(playerID: PlayerID): boolean {
		const info = this.loginState[playerID];
		if (info == undefined) {
			return false;
		}

		// 检查登录状态
		if (info.state != PlayerLoginState.Success) {
			return false;
		}

		// 遍历所有步骤（如果 steps 为 undefined，视为空对象，返回 true）
		for (const [stepName, completed] of Object.entries(info.steps ?? {})) {
			if (!completed) {
				return false;
			}
		}

		return true;
	}

	/**
	 * 检查所有玩家是否完成进入下一游戏阶段所需的关键登录步骤
	 * @returns 是否所有玩家都完成必需步骤
	 */
	IsAllLoginState() {
		let allDone = true;

		Game.EachPlayer((playerID) => {
			if (!this.IsPlayerRequiredLoginCompleted(playerID)) {
				allDone = false;
			}
		});

		return allDone;
	}

}

declare global {
	var Login: CLogin;
}
Login ??= new CLogin();
