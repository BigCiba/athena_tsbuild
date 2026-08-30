import { reloadable } from "../lib/tstl-utils";
require("./config");

type TYPE_PARAM = Partial<Record<string, string | number | boolean | Table>>;

/** 服务器相关的通用的工具函数 */
@reloadable
class CCommonService extends CModule {
	serviceNettableData: Record<string, any> = {};
	init(reload: boolean) {
		// 响应ui调用callaction
		CustomUIEvent("call_action", (event) => {
			if (typeof event.params == "string") {
				// @ts-ignore
				const [params] = json.decode(event.params);
				this.CallAction(event.actionName, event.PlayerID, params);
			}
			// DeepPrintTable(params);
		});

		RequestEvent("call_action_request", (event) => {
			let result = CommonService.CallActionSync(event.action, event.PlayerID, event.action_params, { ignoreInvalidResponse: false, showAddItems: event.showAddItems });

			return result;
		});
	}
	HTTP_GET(url: string, playerID: PlayerID, callback?: (playerID: PlayerID, respone: Partial<Record<string, any>>, url: string) => void, timeout: number = REQUEST_TIME_OUT, NoServerKey: boolean = false) {
		//this.print("<!> CCommonService.HTTP_GET: " + url);
		//this.print("<!> CCommonService.HTTP_GET playerID: " + playerID);

		const handle = CreateHTTPRequestScriptVM("GET", url);
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		if ((IsDedicatedServer() || IsInToolsMode()) && !NoServerKey) {
			handle.SetHTTPRequestHeaderValue("Authorization", ServerKey);
		}
		this.SetPlayerAuthHeader(handle, playerID, url);
		handle.SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000);
		handle.Send((response) => {
			if (typeof callback == "function") {
				callback(playerID, response, url);
			} else {
				// CommonService.Callback(playerID, response, url);
			}
		});
	}
	/** 同步的GET */
	HTTP_GET_SYNC(url: string, playerID: PlayerID, timeout: number = REQUEST_TIME_OUT, NoServerKey: boolean = false) {
		let co = coroutine.running();
		this.HTTP_GET(url, playerID, (playerID, response, url) => {
			assert(coroutine.resume(co!, response, url));
		}, timeout);
		return coroutine.yield();
	}

	HTTP_PUT(url: string, playerID: PlayerID, params: TYPE_PARAM, callback?: (playerID: PlayerID, response: object, url: string) => void, timeout: number = REQUEST_TIME_OUT, NoServerKey: boolean = false) {
		const handle = CreateHTTPRequestScriptVM("PUT", url);
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		if ((IsDedicatedServer() || IsInToolsMode()) && !NoServerKey) {
			handle.SetHTTPRequestHeaderValue("Authorization", ServerKey);
		}
		this.SetPlayerAuthHeader(handle, playerID, url);
		handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
		handle.SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000);
		handle.Send((response) => {
			PrintLongStr(`StatusCode: ${response.StatusCode}\tBody: ${response.Body}`, url);
			let result;
			if (response != undefined && response.Body) {
				[result] = json.decode(response.Body);
			}
			if (result == 404) {
				// this.print("404 no found");
				return;
			}
			if (typeof callback == "function") {
				callback(playerID, result ?? {}, url);
			}
		});
	}
	/** 同步POST */
	HTTP_POST<
		K extends keyof ServiceActionConfig,
	>(url: string, playerID: PlayerID, params: TYPE_PARAM, callback?: (playerID: PlayerID, response: ServiceActionConfig[K]["result"], url: string) => void, timeout: number = REQUEST_TIME_OUT, NoServerKey: boolean = false, ignoreInvalidResponse: boolean = true) {
		this.print("<!> CCommonService.HTTP_POST: " + url);
		DeepPrintTable(params);
		const handle = CreateHTTPRequestScriptVM("POST", url);
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		handle.SetHTTPRequestHeaderValue("Accept-Encoding", "gzip");
		if ((IsDedicatedServer() || IsInToolsMode()) && !NoServerKey) {
			handle.SetHTTPRequestHeaderValue("Authorization", ServerKey);
		}
		this.SetPlayerAuthHeader(handle, playerID, url);
		// @ts-ignore
		setmetatable(params, { __jsontype: "object" });
		handle.SetHTTPRequestRawPostBody("application/json", json.encode(params));
		handle.SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000);
		handle.Send((response) => {
			PrintLongStr(`StatusCode: ${response.StatusCode}\tBody: ${response.Body}`, url);
			if (ignoreInvalidResponse) {
				if (response.StatusCode != 200) {
					return;
				}
			}
			let result;
			if (response != undefined && response.Body) {
				[result] = json.decode(response.Body);
			}

			print("<!><HTTP> CCommonService.HTTP_POST(" + url + ") RESPONSE body:");
			print(response.Body);

			if (typeof callback == "function") {
				callback(playerID, result ?? {}, url);
			} else {
				CommonService.CommonCallback(playerID, result ?? {});
			}
		});
	}
	/** 异步POST */
	HTTP_POST_SYNC<
		K extends keyof ServiceActionConfig
	>(url: string, playerID: PlayerID, params: TYPE_PARAM, timeout: number, NoServerKey: boolean = false, ignoreInvalidResponse: boolean = true): LuaMultiReturn<[ServiceActionConfig[K]["result"]]> {
		let co = coroutine.running();
		this.print(url);
		// DeepPrintTable(params);
		this.HTTP_POST<K>(url, playerID, params, (playerID, response, url) => {
			assert(coroutine.resume(co!, response)[0]);
		}, timeout, NoServerKey, ignoreInvalidResponse);
		return coroutine.yield()[0];
	}

	private SetPlayerAuthHeader(handle: CScriptHTTPRequest, playerID: PlayerID, url: string): void {
		if (IsDedicatedServer() || IsInToolsMode()) {
			return;
		}
		if (url.includes("/v1/settle/match_begin")) {
			const sessions = this.GetAllPlayerAuthSessions();
			if (sessions != "") {
				handle.SetHTTPRequestHeaderValue("session", sessions);
			}
			return;
		} else {
			const auth = this.GetPlayerServiceNetTable(playerID, "player_auth");
			const session = auth?.player_session;
			if (session == undefined || session == "") {
				return;
			}
			handle.SetHTTPRequestHeaderValue("session", session);
		}
	}

	private GetAllPlayerAuthSessions(): string {
		let sessions = "";
		Game.EachPlayer((playerID) => {
			const auth = this.GetPlayerServiceNetTable(playerID, "player_auth");
			const session = auth?.player_session;
			if (session != undefined && session != "") {
				sessions += session;
			}
		});
		return sessions;
	}

	/**
	 * 同步请求
	 * @param action 地址
	 * @param playerID 玩家ID
	 * @param params 参数列表
	 * @param callback 回调
	 */
	CallAction<
		K extends keyof ServiceActionConfig,
	>(
		action: K,
		playerID: PlayerID,
		params: ServiceActionConfig[K]["params"],
		callback?: (playerID: PlayerID, response: ServiceActionConfig[K]["result"], url: string) => void,
		ignoreInvalidResponse: boolean = true,
	) {
		// 检测请求
		let address = this.WrapUrl(action);
		this.HTTP_POST<K>(address, playerID, this.SetDefaultParams(params, playerID, {}), callback, undefined, undefined, ignoreInvalidResponse);
	}
	/**
	 * 同步请求
	 * @param action 地址
	 * @param playerID 玩家ID
	 * @param params 参数列表
	 * @param callback 回调
	 */
	RepeatCallAction<
		K extends keyof ServiceActionConfig,
	>(
		action: K,
		playerID: PlayerID,
		params: ServiceActionConfig[K]["params"],
		callback?: (playerID: PlayerID, respone: ServiceActionConfig[K]["result"], url: string) => void,
		ignoreInvalidResponse: boolean = true,
		repeatCount: number = 8,
		interval: number = 5,
	) {
		let address = this.WrapUrl(action);
		let bindDefault = this.SetDefaultParams(params, playerID, {});
		const id = Timer.Timer(0, () => {
			this.HTTP_POST<K>(address, playerID, bindDefault, (playerID, result, url) => {
				if (typeof callback == "function") {
					callback(playerID, result ?? {}, url);
				} else {
					CommonService.CommonCallback(playerID, result ?? {});
				}
				Timer.StopTimer(id);
			}, undefined, undefined, ignoreInvalidResponse);
			repeatCount--;
			if (repeatCount > 0) {
				return interval;
			}
		});
		return id;
		// 检测请求
	}

	/**
	 * 异步请求
	 * @param action 地址
	 * @param playerID 玩家ID
	 * @param params 参数列表
	 * @param callback 回调
	 */
	CallActionSync<
		K extends keyof ServiceActionConfig,
	>(
		action: K,
		playerID: PlayerID,
		params?: ServiceActionConfig[K]["params"],
		extraOptions?: {
			timeout?: number,
			NoServerKey?: boolean,
			ignoreInvalidResponse?: boolean,
			commonCallback?: boolean,
			showAddItems?: boolean,
			toastDelay?: number;
		}
	) {
		const { timeout = REQUEST_TIME_OUT, NoServerKey = false, ignoreInvalidResponse = true, commonCallback = true, showAddItems = true, toastDelay } = extraOptions ?? {};
		let address = this.WrapUrl(action);
		let res = this.HTTP_POST_SYNC<K>(address, playerID, this.SetDefaultParams(params ?? {}, playerID, {}), timeout, NoServerKey, ignoreInvalidResponse)[0];
		if (commonCallback) {
			CommonService.CommonCallback(playerID, res, showAddItems, toastDelay);
		}
		return res;
	}

	transformBoolean(obj: Table) {
		for (const [k, v] of pairs(obj)) {
			if (typeof v == "object") {
				obj[k] = this.transformBoolean(v);
			} else if (v == "TRUE") {
				obj[k] = true;
			} else if (v == "FALSE") {
				obj[k] = false;
			}
		}
		return obj;
	}

	SendReceiveRewards(playerID: PlayerID, rewardList: { item_id: number | string, item_rarity?: number, amounts?: number; equip_id?: number; }[], toastDelay?: number) {
		const player = PlayerResource.GetPlayer(playerID);
		if (player == undefined) {
			return;
		}

		const toastData: { json: string, [x: string]: any; } = {
			json: json.encode(rewardList)
		};

		if (toastDelay) {
			Timer.Timer(toastDelay, () => {
				CustomGameEventManager.Send_ServerToPlayer(player, "ReceiveRewards", toastData);
			});
			return;
		}

		CustomGameEventManager.Send_ServerToPlayer(player, "ReceiveRewards", toastData);
	}

	// 用于处理一些数据，默认接口的回调都是这个，如果接口自己填了回调需要数据处理则需要手动调用
	CommonCallback<
		K extends keyof ServiceActionConfig,
	>(playerID: PlayerID, response: ServiceActionConfig[K]["result"], showAddItems = true, toastDelay?: number) {
		if ((response.code == 0 || response.code == 200) && response.data) {
			for (let [K, V] of pairs(response.data as Record<string, any>)) {
				// K = K as string
				// DeepPrintTable(V);
				// print(typeof V); 
				if (typeof V == "object") {
					// DeepPrintTable(V);
					V = this.transformBoolean(V);

					if (RawDataConfig[K] != undefined) {
						[K, V] = RawDataConfig[K](playerID, K, V) as [string, Table];
					}
					// print(K)
					const reconstructInfo = ReconstructConfig[K];
					if (reconstructInfo != undefined) {
						if (typeof reconstructInfo == "function") {
							V = reconstructInfo(V, playerID);
						} else {
							const [func, key] = reconstructInfo;
							if (typeof key == "string") {
								V = func(V, key);
							} else {
								V = func(V, ...key);
							}
						}
					}
					if (K == "add_items" && showAddItems) {
						let newList = [];

						for (const [way, list] of pairs(V)) {
							if (!AddItemBlackList.includes(way as string)) {
								for (const [_, tData] of pairs(list)) {
									// DeepPrintTable(tData)
									let t: any = {};
									Object.assign(t, tData);
									t.way = way;
									newList.push(t);
									if (AddItemCallback[t.item_id]) {
										AddItemCallback[t.item_id](t, playerID);
									}
								}
							} else if (AddItemBlackListConfig[way as string] != undefined) {
								let blackList = [];
								for (const [_, tData] of pairs(list)) {
									// DeepPrintTable(tData)
									let t: any = {};
									Object.assign(t, tData);
									t.way = way;
									blackList.push(t);
								}
								AddItemBlackListConfig[way as string](blackList, playerID);
							}
						}
						this.SendReceiveRewards(playerID, newList, toastDelay);

					}
					// 更新网表
					if (NetTableKeys[K] != undefined) {
						if (NetTableKeys[K]) {
							// 副作用函数
							if (SideEffectConfig[K] != undefined) {
								SideEffectConfig[K](playerID, V);
							}
							// @ts-ignore
							let result = this.SetPlayerServiceNetData(playerID, K, V, OverrideDataConfig[K] != undefined);
							AfterSideEffectConfig[K]?.(playerID, result);
						} else {
							// 副作用函数
							if (SideEffectConfig[K] != undefined) {
								SideEffectConfig[K](V);
							}
							// @ts-ignore
							let result = this.SetServiceNetData(K, V, OverrideDataConfig[K] != undefined);
							AfterSideEffectConfig[K]?.(playerID, result);
						}
						Event.Fire("service_data_change", { playerID, key: K });
					}
					// if (NetDataKeys[K] != undefined) {
					// 	if (NetDataKeys[K]) {
					// 		// 副作用函数
					// 		if (SideEffectConfig[K] != undefined) {
					// 			SideEffectConfig[K](playerID, V);
					// 		}
					// 		// @ts-ignore
					// 		let result = NetData.setPlayerTableValue(playerID, K, V, OverrideDataConfig[K] != undefined);
					// 		AfterSideEffectConfig[K]?.(playerID, result);
					// 	} else {
					// 		// 副作用函数
					// 		if (SideEffectConfig[K] != undefined) {
					// 			SideEffectConfig[K](V);
					// 		}
					// 		// @ts-ignore
					// 		let result = NetData.setTableValue(K, V, OverrideDataConfig[K] != undefined);
					// 		AfterSideEffectConfig[K]?.(playerID, result);
					// 	}
					// }
					if (SpecialDealKeys[K]) {
						// 特殊处理的数据
						SpecialDealKeys[K](playerID, V);
					}
				}
			}
		}
	}

	SetDefaultParams(params: TYPE_PARAM, playerID: PlayerID, tDefaultParams: Record<string, number>) {
		if (!params) {
			params = {};
		}

		if (params.uid == null && typeof playerID == "number" && PlayerResource.IsValidPlayerID(playerID)) {
			params.uid = OVERRIDE_STEAMID ?? PlayerResource.GetSteamAccountID(playerID);
		}
		if (tDefaultParams != undefined) {
			for (const [K, V] of pairs(tDefaultParams)) {
				if (K == "sid") {
					params.sid = tostring(PlayerResource.GetSteamID(playerID));
				} else if (K == "name") {
					params.name = PlayerResource.GetPlayerName(playerID) == "" ? V : PlayerResource.GetPlayerName(playerID);
				} else {
					params[K] = params[K] ?? V;
				}
			}
		}
		return params;
	}

	SetPlayerServiceNetData<
		TName extends keyof NetDataDeclarations
	>(
		playerID: PlayerID,
		k: TName,
		v: NetDataDeclarations[TName],
		/** 覆盖数组，否则合并数据 */
		override: boolean = false
	) {
		if (playerID == -1) {
			return;
		}
		if (this.serviceNettableData[k] == undefined) {
			this.serviceNettableData[k] = {};
		}
		if (this.serviceNettableData[k][playerID] == undefined) {
			this.serviceNettableData[k][playerID] = {};
		}
		v = (!override ? this.ServiceTableOverride(this.serviceNettableData[k][playerID], v) : v) as NetDataDeclarations[TName];
		if (FinalConfig[k] != undefined) {
			v = FinalConfig[k](v, playerID) as NetDataDeclarations[TName];
		}
		this.serviceNettableData[k][playerID] = v;
		// @ts-ignore
		CustomNetTables.SetTableValue("service", k + playerID, { data: json.encode(this.serviceNettableData[k][playerID]) });

		return this.serviceNettableData[k][playerID];
	}

	/** 设置网表 */
	SetServiceNetData<
		TName extends keyof NetDataDeclarations
	>(k: TName, v: NetDataDeclarations[TName], override: boolean = false) {
		if (this.serviceNettableData[k] == undefined) {
			this.serviceNettableData[k] = {};
		}
		if (override) {
			this.serviceNettableData[k] = v;
		} else {
			this.serviceNettableData[k] = this.ServiceTableOverride(this.serviceNettableData[k], v);
		}
		// @ts-ignore
		CustomNetTables.SetTableValue("service", k, { data: json.encode(this.serviceNettableData[k]) });

		return this.serviceNettableData[k];
	}

	GetPlayerServiceNetTable<
		TName extends keyof NetDataDeclarations
	>(playerID: PlayerID, k: TName): NetDataDeclarations[TName] | undefined {
		if (this.serviceNettableData[k] == undefined) {
			return;
		}
		return this.serviceNettableData[k][playerID];
	}

	GetServiceNetTable<
		TName extends keyof NetDataDeclarations
	>(k: TName, defaultValue?: NetDataDeclarations[TName]): NetDataDeclarations[TName] {
		return this.serviceNettableData[k] ?? defaultValue;
	}

	ServiceTableOverride(mainTable: AnyTable, table: AnyTable) {
		for (const k in table) {
			const v = table[k];
			if (typeof v == "object") {
				if (typeof mainTable[k] == "object") {
					mainTable[k] = this.ServiceTableOverride(mainTable[k], v);
				} else {
					mainTable[k] = this.ServiceTableOverride({}, v);
				}
			} else {
				if (v == "nil") {
					mainTable[k] = undefined;
				} else {
					mainTable[k] = v;
				}
			}
		}
		return mainTable;
	}

	WrapUrl(url: string, address?: string) {
		if (address) {
			return address + url + "?cheat=" + Service_IsCheat + "&local=" + Service_IsLocal;
		}
		return ServiceAddress + url + "?cheat=" + Service_IsCheat + "&local=" + Service_IsLocal;
	}

	UploadError(level: string, msg: string) {
		if (!IsInToolsMode()) {
			this.CallAction("/v1/log/report", 0, { level: level, message: msg });
		}
	}
}


declare global {
	/**
	 * @ServerOnly
	 */
	var CommonService: CCommonService;
}
CommonService ??= new CCommonService();
