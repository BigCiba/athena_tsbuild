import { reloadable } from "../lib/tstl-utils";

const COMMUNITY_BASE_URL = "http://110.40.187.139:8200";
const COMMUNITY_ONLINE_URL = "https://community.eomgames.net";
const COMMUNITY_API_KEY = "4cdafd77a1989d3f9716b9bd0c7fedb1";
const COMMUNITY_DEFAULT_LANG: CommunityLanguage = "zh";
const COMMUNITY_FEEDBACK_MAX_LENGTH = 2000;

interface CommunityHTTPResult {
	statusCode: number;
	body?: Record<string, any>;
	rawBody: string;
	url: string;
}

interface CommunityHTTPRequestOptions {
	method: "GET" | "POST";
	path: string;
	query?: Record<string, string | number | boolean | undefined>;
	body?: Record<string, string | number | boolean>;
	timeout?: number;
}

/** 社区服务：按 Panorama 请求代理社区 HTTP，数据仅返回给发起请求的客户端。 */
@reloadable
class CCommunity extends CModule {
	private useOnlineURLInTools = false;

	init(_bReload: boolean) {
		RequestEvent("community_set_test_url", (event) => {
			if (!IsInToolsMode()) {
				return {
					ok: false,
					useOnline: true,
					url: COMMUNITY_ONLINE_URL,
					message: "Community URL switching is only available in Tools Mode",
				};
			}
			this.useOnlineURLInTools = event.useOnline;
			const url = this.GetBaseUrl();
			print(`[Community] API URL switched to ${url}`);
			return {
				ok: true,
				useOnline: this.useOnlineURLInTools,
				url,
			};
		});

		RequestEvent("community_refresh", (event) => {
			return this.FetchHomeData(this.NormalizeLanguage(event.lang));
		});

		RequestEvent("community_contents", (event) => {
			const lang = this.NormalizeLanguage(event.lang);
			const result = this.HTTP_GET_SYNC("/api/contents", { tag: event.tag, lang });
			if (!this.IsSuccess(result.statusCode)) {
				return {
					ok: false,
					contents: [],
					message: this.GetResponseMessage(result, "Community contents request failed"),
				};
			}
			return {
				ok: true,
				contents: (result.body?.contents as CommunityContentData[] | undefined) ?? [],
			};
		});

		RequestEvent("community_weekly_status", (event) => {
			const steamID = this.GetPlayerSteamID(event.PlayerID);
			if (steamID == undefined) {
				return { ok: false, message: "Steam ID unavailable" };
			}
			const result = this.HTTP_GET_SYNC("/api/weekly-rewards/current", { steam_id: steamID });
			if (!this.IsSuccess(result.statusCode)) {
				return {
					ok: false,
					message: this.GetResponseMessage(result, "Weekly reward status request failed"),
				};
			}
			const state = result.body?.status;
			if (state != "available" && state != "received") {
				return { ok: false, message: "Invalid weekly reward status" };
			}
			return { ok: true, state: state as CommunityWeeklyRewardState };
		});

		RequestEvent("community_claim_weekly", (event) => {
			const steamID = this.GetPlayerSteamID(event.PlayerID);
			if (steamID == undefined) {
				return { ok: false, message: "Steam ID unavailable" };
			}
			const result = this.HTTP_POST_SYNC("/api/weekly-rewards/claim", { steam_id: steamID });
			const responseSuccess = result.body?.success;
			if (!this.IsSuccess(result.statusCode) || responseSuccess == false) {
				return {
					ok: false,
					retryAfter: result.body?.data?.retryAfter as number | undefined,
					message: this.GetResponseMessage(result, "Weekly reward claim failed"),
				};
			}
			// 当前成功响应里的 claimed 不能表示最终 UI 状态；领取成功后统一视为 received。
			return {
				ok: true,
				state: "received" as CommunityWeeklyRewardState,
				message: tostring(result.body?.message ?? "Claimed successfully"),
			};
		});

		RequestEvent("community_submit_feedback", (event) => {
			const steamID = this.GetPlayerSteamID(event.PlayerID);
			if (steamID == undefined) {
				return { ok: false, message: "Steam ID unavailable" };
			}

			const content = tostring(event.content ?? "").trim();
			if (content == "" || content.length > COMMUNITY_FEEDBACK_MAX_LENGTH) {
				return { ok: false, message: "Invalid feedback content" };
			}
			if (event.type != "bug" && event.type != "suggestion" && event.type != "other") {
				return { ok: false, message: "Invalid feedback type" };
			}

			const result = this.HTTP_POST_SYNC("/api/feedbacks", {
				steam_id: steamID,
				type: event.type,
				content,
			});
			if (!this.IsSuccess(result.statusCode)) {
				return {
					ok: false,
					message: this.GetResponseMessage(result, "Feedback submission failed"),
				};
			}
			return { ok: true };
		});
	}

	/** 并行拉取 Banner、首页攻略和公告，等待完成后直接返回给发起请求的客户端。 */
	private FetchHomeData(
		lang: CommunityLanguage = COMMUNITY_DEFAULT_LANG,
	): ServerRequestEventDeclarations["community_refresh"]["results"] {
		const data: CommunityHomeData = {
			banners: [],
			homeContents: [],
			notices: [],
		};
		let firstFailure: CommunityHTTPResult | undefined;
		let pending = 3;
		const co = coroutine.running();
		const finish = (result: CommunityHTTPResult, apply: () => void) => {
			const success = this.IsSuccess(result.statusCode);
			if (success) {
				apply();
			} else if (firstFailure == undefined) {
				firstFailure = result;
			}
			pending--;
			if (pending == 0) {
				const resumeResult = coroutine.resume(co!);
				assert(resumeResult[0], resumeResult[1]);
			}
		};

		// Banner 接口会按 lang 将当前语言的图片和链接映射到 imageUrl、link。
		this.HTTP_GET("/api/banners", { lang }, (result) => {
			finish(result, () => {
				const banners = (result.body?.banners as CommunityBannerData[] | undefined) ?? [];
				data.banners = banners.filter((banner) => banner.imageUrl != undefined && banner.imageUrl != "");
			});
		});
		this.HTTP_GET("/api/contents", { tag: "home", limit: 15, lang }, (result) => {
			finish(result, () => {
				data.homeContents = (result.body?.contents as CommunityContentData[] | undefined) ?? [];
			});
		});
		this.HTTP_GET("/api/contents", { tag: "notice", limit: 30, lang }, (result) => {
			finish(result, () => {
				data.notices = (result.body?.contents as CommunityContentData[] | undefined) ?? [];
			});
		});

		coroutine.yield();
		return {
			ok: firstFailure == undefined,
			data,
			message: firstFailure == undefined
				? undefined
				: this.GetResponseMessage(firstFailure, "Community home request failed"),
		};
	}

	private HTTP_GET(
		path: string,
		query: Record<string, string | number | boolean | undefined>,
		callback: (result: CommunityHTTPResult) => void,
		timeout: number = REQUEST_TIME_OUT,
	) {
		this.HTTP_REQUEST({ method: "GET", path, query, timeout }, callback);
	}

	private HTTP_GET_SYNC(
		path: string,
		query: Record<string, string | number | boolean | undefined>,
		timeout: number = REQUEST_TIME_OUT,
	): CommunityHTTPResult {
		return this.HTTP_REQUEST_SYNC({ method: "GET", path, query, timeout });
	}

	private HTTP_POST_SYNC(
		path: string,
		body: Record<string, string | number | boolean>,
		timeout: number = REQUEST_TIME_OUT,
	): CommunityHTTPResult {
		return this.HTTP_REQUEST_SYNC({ method: "POST", path, body, timeout });
	}

	/** 统一的异步请求入口；同步请求只负责用协程等待这个入口的结果。 */
	private HTTP_REQUEST(options: CommunityHTTPRequestOptions, callback: (result: CommunityHTTPResult) => void) {
		const url = this.BuildUrl(options.path, options.query ?? {});
		const handle = this.CreateRequest(options.method, url, options.timeout ?? REQUEST_TIME_OUT);
		if (options.body != undefined) {
			// 保证空对象也按 JSON object 编码，与 CommonService.HTTP_POST 一致。
			// @ts-ignore
			setmetatable(options.body, { __jsontype: "object" });
			handle.SetHTTPRequestRawPostBody("application/json", json.encode(options.body));
		}
		handle.Send((response) => callback(this.DecodeResponse(options.method, url, response)));
	}

	private HTTP_REQUEST_SYNC(options: CommunityHTTPRequestOptions): CommunityHTTPResult {
		const co = coroutine.running();
		this.HTTP_REQUEST(options, (result) => {
			const resumeResult = coroutine.resume(co!, result);
			assert(resumeResult[0], resumeResult[1]);
		});
		return coroutine.yield()[0] as CommunityHTTPResult;
	}

	private CreateRequest(method: "GET" | "POST", url: string, timeout: number): CScriptHTTPRequest {
		const handle = CreateHTTPRequestScriptVM(method, url);
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		handle.SetHTTPRequestHeaderValue("Accept", "application/json");
		//handle.SetHTTPRequestHeaderValue("x-api-key", COMMUNITY_API_KEY);
		handle.SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000);
		return handle;
	}

	private DecodeResponse(method: string, url: string, response: CScriptHTTPResponse): CommunityHTTPResult {
		const statusCode = response?.StatusCode ?? -1;
		const rawBody = response?.Body ?? "";
		this.print(`[Community] ${method} ${url}`);
		this.print(`[Community] StatusCode: ${statusCode}`);
		this.print(rawBody);

		let body: Record<string, any> | undefined;
		if (rawBody != "") {
			try {
				[body] = json.decode(rawBody);
			} catch (err) {
				this.error(`json decode failed url=${url}`, tostring(err));
			}
		}
		if (!this.IsSuccess(statusCode)) {
			this.error(`${method} failed url=${url} status=${statusCode}`);
		}
		return { statusCode, body, rawBody, url };
	}

	private BuildUrl(path: string, query: Record<string, string | number | boolean | undefined>): string {
		let url = this.GetBaseUrl();
		url += path;
		let separator = "?";
		for (const [key, value] of pairs(query)) {
			if (value == undefined) {
				continue;
			}
			url += `${separator}${key}=${tostring(value)}`;
			separator = "&";
		}
		return url;
	}

	private GetBaseUrl(): string {
		return IsInToolsMode() && !this.useOnlineURLInTools
			? COMMUNITY_BASE_URL
			: COMMUNITY_ONLINE_URL;
	}

	private NormalizeLanguage(lang: string | undefined): CommunityLanguage {
		return lang == "en" || lang == "ru" ? lang : "zh";
	}

	private IsSuccess(statusCode: number): boolean {
		return statusCode >= 200 && statusCode < 300;
	}

	private GetPlayerSteamID(playerID: PlayerID): string | undefined {
		if (!PlayerResource.IsValidPlayerID(playerID)) {
			return;
		}
		return tostring(PlayerResource.GetSteamAccountID(playerID));
	}

	private GetResponseMessage(result: CommunityHTTPResult, fallback: string): string {
		return tostring(
			result.body?.statusMessage
			?? result.body?.message
			?? result.body?.error
			?? fallback
		);
	}
}

declare global {
	/** @ServerOnly */
	var CommunityService: CCommunity;
}
CommunityService ??= new CCommunity();
