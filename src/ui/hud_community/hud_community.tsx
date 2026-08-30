import { render } from "@bigciba/solid-panorama-runtime";
import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { EOM_BaseButton, EOM_CloseButton } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { createMenuLayout } from "../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";

// 菜单配置（预留扩展）
const MENU_LIST = {
	Community_Menu: [],
};

interface CommunityTimedCache<T> {
	data: T;
	updatedAt: number;
}

interface CommunityLanguageCache {
	home?: CommunityTimedCache<CommunityHomeData>;
	guideContents: Partial<Record<CommunityGuideTag, CommunityTimedCache<CommunityContentData[]>>>;
}

declare global {
	interface CustomUIConfig {
		__communityCache?: Partial<Record<CommunityLanguage, CommunityLanguageCache>>;
		__communityWeeklyRewardCache?: CommunityTimedCache<CommunityWeeklyRewardState>;
		__communityFeedbackSubmittedAt?: number;
	}
}

const communityCache = CustomUIConfig.__communityCache ??= {};
let communityOpenHandler: ((forceRefresh?: boolean) => void) | undefined;
const { show } = createMenuLayout("community", () => MENU_LIST, {
	beforeShow: () => communityOpenHandler?.(),
});
const CDK_LINKS: Record<CommunityLanguage, string> = {
	zh: "https://docs.qq.com/sheet/DTkZNeWxBZXhvU1BY?tab=BB08J2",
	en: "https://docs.google.com/spreadsheets/d/17PQvZO9GS9MnsZoqKRn3b8JGFOhxKR59asS7whRv33I/edit?usp=sharing",
	ru: "https://docs.google.com/spreadsheets/d/1sAfyheyX2iWpjQDu87q_8ZFWYNuU0Ivbo1hdP-B6cYE/edit?usp=sharing",
};
const BANNER_INTERVAL = 5;
const COMMUNITY_REFRESH_INTERVAL = 5 * 60;
const FEEDBACK_SUBMIT_INTERVAL = 0;
const HIDE_MENU_BAR = false;
const [inGameBrowserURL, setInGameBrowserURL] = createSignal<string>();

// 基础介绍、新手进阶、英雄攻略、局外成长
const GUIDE_TAGS: { tag: CommunityGuideTag; localization: string; }[] = [
	{ tag: "basics", localization: "#Community_Guide_Basics" },
	{ tag: "advanced", localization: "#Community_Guide_Advanced" },
	{ tag: "heroes", localization: "#Community_Guide_Heroes" },
	{ tag: "meta", localization: "#Community_Guide_Meta" },
];

const FEEDBACK_TYPES: { type: CommunityFeedbackType; localization: string; }[] = [
	{ type: "bug", localization: "#Community_Feedback_Bug" },
	{ type: "suggestion", localization: "#Community_Feedback_Suggestion" },
	{ type: "other", localization: "#Community_Feedback_Other" },
];

function GetCommunityLanguage(): CommunityLanguage {
	const language = Language();
	if (language == "russian") return "ru";
	if (language == "english") return "en";
	return "zh";
}

function GetLanguageCache(lang: CommunityLanguage): CommunityLanguageCache {
	return communityCache[lang] ??= { guideContents: {} };
}

function IsCacheFresh(cache?: CommunityTimedCache<unknown>): boolean {
	if (cache == undefined) return false;
	const age = Date.now() / 1000 - cache.updatedAt;
	return age >= 0 && age < COMMUNITY_REFRESH_INTERVAL;
}

function OpenExternalURL(url?: string | null) {
	if (typeof url != "string" || url == "" || url == "#") return;
	$.DispatchEvent("ExternalBrowserGoToURL", url);
}

function OpenExternalURL2(url?: string | null) {
	if (typeof url != "string" || url == "" || url == "#") return;
	setInGameBrowserURL(url);
}

function ReportCommunity(detail: string) {
	GameUI.CustomUIConfig().ReportClick("community", detail);
}

function FormatDate(value?: string | null): string {
	if (typeof value != "string" || value == "") return "";
	return value.slice(0, 10);
}

function SortCommunityItems<T extends { priority?: number | null; publishedAt?: string | null; }>(items: T[]): T[] {
	return [...items].sort((a, b) => {
		const priorityDifference = (b.priority ?? 0) - (a.priority ?? 0);
		if (priorityDifference != 0) return priorityDifference;

		const aPublishedAt = Date.parse(a.publishedAt ?? "") || 0;
		const bPublishedAt = Date.parse(b.publishedAt ?? "") || 0;
		return bPublishedAt - aPublishedAt;
	});
}

function BannerCarousel(props: { banners: CommunityBannerData[]; loading: boolean; error: boolean; }) {
	const [bannerIndex, setBannerIndex] = createSignal(0);
	let scheduleID: ScheduleID | undefined;
	const getBannerPosition = (index: number) => {
		const count = props.banners.length;
		if (count <= 1) return 0;
		let position = index - bannerIndex();
		if (position > count / 2) position -= count;
		if (position < -count / 2) position += count;
		if (position < -1) return -2;
		if (position > 1) return 2;
		return position;
	};
	const scheduleRotation = () => {
		if (scheduleID != undefined) {
			$.CancelScheduled(scheduleID);
		}
		scheduleID = $.Schedule(BANNER_INTERVAL, () => {
			scheduleID = undefined;
			const count = props.banners.length;
			if (count > 1) {
				setBannerIndex((index) => (index + 1) % count);
			}
			scheduleRotation();
		});
	};
	const changeBanner = (offset: number) => {
		const count = props.banners.length;
		if (count <= 1) return;
		setBannerIndex((index) => (index + offset + count) % count);
		scheduleRotation();
	};
	const selectBanner = (index: number) => {
		setBannerIndex(index);
		scheduleRotation();
	};

	createEffect(() => {
		const count = props.banners.length;
		if (count == 0 || bannerIndex() >= count) {
			setBannerIndex(0);
		}
	});

	onMount(() => {
		scheduleRotation();
	});

	onCleanup(() => {
		if (scheduleID != undefined) {
			$.CancelScheduled(scheduleID);
		}
	});

	return <Panel id="Banner" class="CommonBannerWindow">
		<Panel class="BannerList">
			<For each={props.banners}>
				{(banner, index) => <EOM_BaseButton
					class={`BannerSlide Index${getBannerPosition(index())}`}
					hittest={getBannerPosition(index()) == 0}
					onactivate={() => {
						ReportCommunity("banner");
						OpenExternalURL2(banner.link);
					}}>
					<Image class="BannerImage" scaling="none" src={banner.imageUrl ?? ""} hittest={false} />
					<Panel class="BannerMask" />
					<Label
						class="BannerTitle"
						text={banner.title ?? ""}
						visible={(banner.title ?? "") != ""}
						hittest={false} />
				</EOM_BaseButton>}
			</For>
		</Panel>
		<Show when={props.banners.length == 0}>
			<Label class="CommunityState BannerState" text={GetLocalization(
				props.loading ? "#Community_Loading" : props.error ? "#Community_LoadFailed" : "#Community_Empty"
			)} />
		</Show>
		<Show when={props.banners.length > 1}>
			<EOM_BaseButton class="BannerArrow Left" onactivate={() => changeBanner(-1)} />
			<EOM_BaseButton class="BannerArrow Right" onactivate={() => changeBanner(1)} />
			<Panel class="BannerDots">
				<For each={props.banners}>
					{(_, index) => <EOM_BaseButton
						class="BannerDot"
						classList={{ Selected: index() == bannerIndex() }}
						onactivate={() => selectBanner(index())} />}
				</For>
			</Panel>
		</Show>
		<Panel class="BannerBorder" hittest={false} />
	</Panel>;
}

const Community = () => {
	const lang = GetCommunityLanguage();
	const languageCache = GetLanguageCache(lang);
	const [homeData, setHomeData] = createSignal<CommunityHomeData | undefined>(languageCache.home?.data);
	const [homeLoading, setHomeLoading] = createSignal(false);
	const [homeError, setHomeError] = createSignal(false);
	const [selectedGuideTag, setSelectedGuideTag] = createSignal<CommunityGuideTag | undefined>();
	const [categoryContents, setCategoryContents] = createSignal<CommunityContentData[]>([]);
	const [categoryLoading, setCategoryLoading] = createSignal(false);
	const [categoryError, setCategoryError] = createSignal(false);
	const [weeklyClaiming, setWeeklyClaiming] = createSignal(false);
	const [weeklyState, setWeeklyState] = createSignal<CommunityWeeklyRewardState>(CustomUIConfig.__communityWeeklyRewardCache?.data ?? "available");
	const [weeklyStateLoading, setWeeklyStateLoading] = createSignal(false);
	const [weeklyStatus, setWeeklyStatus] = createSignal("");
	const [feedbackType, setFeedbackType] = createSignal<CommunityFeedbackType>("bug");
	const [feedbackContent, setFeedbackContent] = createSignal("");
	const [feedbackSubmitting, setFeedbackSubmitting] = createSignal(false);
	const [feedbackCooldown, setFeedbackCooldown] = createSignal(0);
	const [feedbackStatus, setFeedbackStatus] = createSignal("");
	const [feedbackSucceeded, setFeedbackSucceeded] = createSignal(false);
	let homeRequest: string | undefined;
	let guideRequest: string | undefined;
	let guideRequestTag: CommunityGuideTag | undefined;
	let weeklyStateRequest: string | undefined;
	let weeklyRequest: string | undefined;
	let feedbackRequest: string | undefined;
	let feedbackCooldownSchedule: ScheduleID | undefined;

	const updateFeedbackCooldown = () => {
		feedbackCooldownSchedule = undefined;
		const submittedAt = CustomUIConfig.__communityFeedbackSubmittedAt ?? 0;
		const remaining = Math.max(0, Math.ceil(submittedAt + FEEDBACK_SUBMIT_INTERVAL - Date.now() / 1000));
		setFeedbackCooldown(remaining);
		if (remaining > 0) {
			feedbackCooldownSchedule = $.Schedule(1, updateFeedbackCooldown);
		}
	};
	updateFeedbackCooldown();

	const guideContents = createMemo(() => {
		const contents = selectedGuideTag() == undefined
			? homeData()?.homeContents ?? []
			: categoryContents();
		return SortCommunityItems(contents);
	});
	const banners = createMemo(() => SortCommunityItems(homeData()?.banners ?? []));
	const notices = createMemo(() => SortCommunityItems(homeData()?.notices ?? []));
	const guideLoading = createMemo(() => {
		return selectedGuideTag() == undefined
			? homeLoading() && guideContents().length == 0
			: categoryLoading();
	});
	const guideError = createMemo(() => {
		return selectedGuideTag() == undefined ? homeError() : categoryError();
	});

	const loadHomeData = () => {
		const cached = languageCache.home;
		if (cached != undefined) {
			setHomeData(cached.data);
		}
		if (IsCacheFresh(cached)) {
			setHomeLoading(false);
			setHomeError(false);
			return;
		}
		if (homeRequest != undefined) return;

		setHomeLoading(true);
		setHomeError(false);
		homeRequest = ServerRequest("community_refresh", { lang }, (result) => {
			homeRequest = undefined;
			setHomeLoading(false);
			if (result.ok) {
				const cache = { data: result.data, updatedAt: Date.now() / 1000 };
				languageCache.home = cache;
				setHomeData(cache.data);
				setHomeError(false);
			} else {
				if (languageCache.home == undefined) {
					setHomeData(result.data);
				}
				setHomeError(true);
			}
		}, 15, () => {
			homeRequest = undefined;
			setHomeLoading(false);
			setHomeError(true);
		});
	};

	const loadGuideCategory = (tag: CommunityGuideTag) => {
		setSelectedGuideTag(tag);
		const cached = languageCache.guideContents[tag];
		setCategoryContents(cached?.data ?? []);
		setCategoryError(false);
		if (IsCacheFresh(cached)) {
			setCategoryLoading(false);
			return;
		}
		if (guideRequest != undefined && guideRequestTag == tag) return;
		if (guideRequest != undefined) CancelRequest(guideRequest);

		setCategoryLoading(true);
		guideRequestTag = tag;
		guideRequest = ServerRequest("community_contents", { lang, tag }, (result) => {
			if (guideRequestTag != tag) return;
			guideRequest = undefined;
			guideRequestTag = undefined;
			if (selectedGuideTag() != tag) return;
			setCategoryLoading(false);
			if (result.ok) {
				const cache = { data: result.contents, updatedAt: Date.now() / 1000 };
				languageCache.guideContents[tag] = cache;
				setCategoryContents(cache.data);
			} else {
				setCategoryError(true);
				ErrorMessage(result.message ?? GetLocalization("#Community_LoadFailed"));
			}
		}, 15, () => {
			if (guideRequestTag != tag) return;
			guideRequest = undefined;
			guideRequestTag = undefined;
			if (selectedGuideTag() != tag) return;
			setCategoryLoading(false);
			setCategoryError(true);
			ErrorMessage(GetLocalization("#Community_LoadFailed"));
		});
	};

	const showGuideHome = () => {
		if (guideRequest != undefined) {
			const request = guideRequest;
			guideRequest = undefined;
			guideRequestTag = undefined;
			CancelRequest(request);
		}
		setSelectedGuideTag(undefined);
		setCategoryLoading(false);
		setCategoryError(false);
	};

	const cacheWeeklyState = (state: CommunityWeeklyRewardState) => {
		setWeeklyState(state);
		CustomUIConfig.__communityWeeklyRewardCache = {
			data: state,
			updatedAt: Date.now() / 1000,
		};
	};

	const loadWeeklyState = () => {
		const cached = CustomUIConfig.__communityWeeklyRewardCache;
		if (cached != undefined) {
			setWeeklyState(cached.data);
		}
		if (IsCacheFresh(cached)) {
			setWeeklyStateLoading(false);
			return;
		}
		if (weeklyStateRequest != undefined) return;

		setWeeklyStateLoading(true);
		weeklyStateRequest = ServerRequest("community_weekly_status", {}, (result) => {
			weeklyStateRequest = undefined;
			setWeeklyStateLoading(false);
			if (result.ok && result.state != undefined) {
				cacheWeeklyState(result.state);
				setWeeklyStatus("");
			}
		}, 15, () => {
			weeklyStateRequest = undefined;
			setWeeklyStateLoading(false);
		});
	};

	const handleCommunityOpen = (forceRefresh = false) => {
		if (forceRefresh) {
			if (homeRequest != undefined) {
				CancelRequest(homeRequest);
				homeRequest = undefined;
			}
			if (weeklyStateRequest != undefined) {
				CancelRequest(weeklyStateRequest);
				weeklyStateRequest = undefined;
			}
			languageCache.home = undefined;
			languageCache.guideContents = {};
			CustomUIConfig.__communityWeeklyRewardCache = undefined;
			setHomeData(undefined);
			setHomeLoading(false);
			setHomeError(false);
			setWeeklyState("available");
			setWeeklyStateLoading(false);
			setWeeklyStatus("");
		}
		showGuideHome();
		loadHomeData();
		loadWeeklyState();
	};
	communityOpenHandler = handleCommunityOpen;

	onCleanup(() => {
		if (communityOpenHandler == handleCommunityOpen) {
			communityOpenHandler = undefined;
		}
		for (const request of [homeRequest, guideRequest, weeklyStateRequest, weeklyRequest, feedbackRequest]) {
			if (request != undefined) CancelRequest(request);
		}
		if (feedbackCooldownSchedule != undefined) {
			$.CancelScheduled(feedbackCooldownSchedule);
		}
	});

	const claimWeeklyGift = () => {
		if (weeklyStateLoading() || weeklyClaiming() || weeklyState() == "received") return;
		setWeeklyClaiming(true);
		setWeeklyStatus("");
		weeklyRequest = ServerRequest("community_claim_weekly", {}, (result) => {
			weeklyRequest = undefined;
			setWeeklyClaiming(false);
			if (result.ok) {
				ReportCommunity("weekly_welfare");
				cacheWeeklyState(result.state ?? "received");
				setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimSuccess"));
				CustomUIConfig.showPopup("CommonConfirm", {
					title: GetLocalization("#Community_Weekly_Name"),
					text: GetLocalization("#Community_Weekly_ClaimSuccess"),
					icon: "conv_checkmark",
					showCancel: false,
				});
			} else {
				if (result.state != undefined) {
					cacheWeeklyState(result.state);
				}
				const message = result.message ?? GetLocalization("#Community_Weekly_ClaimFailed");
				setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimFailed"));
				ErrorMessage(message);
			}
		}, 15, () => {
			weeklyRequest = undefined;
			setWeeklyClaiming(false);
			setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimFailed"));
			ErrorMessage(GetLocalization("#Community_Weekly_ClaimFailed"));
		});
	};

	const submitFeedback = () => {
		const content = feedbackContent().trim();
		if (feedbackSubmitting() || feedbackCooldown() > 0 || content.length <= 5) return;
		ReportCommunity(`feedback_${feedbackType()}`);
		setFeedbackSubmitting(true);
		setFeedbackStatus("");
		feedbackRequest = ServerRequest("community_submit_feedback", {
			type: feedbackType(),
			content,
		}, (result) => {
			feedbackRequest = undefined;
			setFeedbackSubmitting(false);
			if (result.ok) {
				CustomUIConfig.__communityFeedbackSubmittedAt = Date.now() / 1000;
				updateFeedbackCooldown();
				setFeedbackContent("");
				setFeedbackSucceeded(true);
				setFeedbackStatus(GetLocalization("#Community_Feedback_Success"));
			} else {
				setFeedbackSucceeded(false);
				setFeedbackStatus(GetLocalization("#Community_Feedback_Failed"));
				ErrorMessage(result.message ?? GetLocalization("#Community_Feedback_Failed"));
			}
		}, 15, () => {
			feedbackRequest = undefined;
			setFeedbackSubmitting(false);
			setFeedbackSucceeded(false);
			setFeedbackStatus(GetLocalization("#Community_Feedback_Failed"));
			ErrorMessage(GetLocalization("#Community_Feedback_Failed"));
		});
	};

	return <Panel id="Community">
		<Panel flowChildren="right">
			{/** 游戏 Banner 图 */}
			<BannerCarousel
				banners={banners()}
				loading={homeLoading()}
				error={homeError()} />
			{/** 游戏攻略 */}
			<Panel id="GameGuide" class="CommonBannerWindow">
				<Panel class="Content">
					<Label class="GuideTitle" text={GetLocalization("#Community_GameGuide")} />
					<Panel class="DividingLine1" />
					<Panel class="PageFlow">
						<Panel class="PageTab">
							<For each={GUIDE_TAGS}>
								{item => <EOM_BaseButton
									class="PageTabBtn"
									classList={{ Selected: selectedGuideTag() == item.tag }}
									onactivate={() => {
										ReportCommunity(`guide_tab_${item.tag}`);
										loadGuideCategory(item.tag);
									}}>
									<Label text={GetLocalization(item.localization)} />
								</EOM_BaseButton>}
							</For>
						</Panel>
						<Panel class="GuideList VerticalScrollStyle" scroll="y">
							<For each={guideContents()}>
								{(content, index) => <Panel class="GuideItem" >
									<Panel class="GuideLine" visible={index() != 0} />
									<EOM_BaseButton width="100%" onactivate={() => {
										ReportCommunity(`guide_content_${selectedGuideTag() ?? "home"}`);
										OpenExternalURL2(content.link);
									}}>
										<Label text={content.title ?? ""} />
									</EOM_BaseButton>
								</Panel>}
							</For>
							<Label class="CommunityState" visible={guideContents().length == 0} text={GetLocalization(
								guideLoading()
									? "#Community_Loading"
									: guideError()
										? "#Community_LoadFailed"
										: "#Community_Empty"
							)} />
						</Panel>
					</Panel>
				</Panel>
				<Panel class="BannerBorder" hittest={false} />
			</Panel>
		</Panel>
		<Panel flowChildren="right" marginTop="18px">
			{/** 游戏公告 */}
			<Panel id="GameNotice">
				<Label class="NoticeTitle" text={GetLocalization("#Community_GameNotice")} />
				<Panel class="NoticeListContainer">
					<Panel class="NoticeList" scroll="y">
						<For each={notices()}>
							{(notice, index) => <Panel class="NoticeItem" >
								<Panel class="NoticeLine" visible={index() != 0} hittest={false} />
								<EOM_BaseButton width="100%" flowChildren="right" onactivate={() => {
									ReportCommunity("notice");
									OpenExternalURL2(notice.link);
								}}>
									<Label class="NoticeLabel" text={notice.title ?? ""} />
									<Label class="NoticeDate" text={FormatDate(notice.publishedAt)} />
								</EOM_BaseButton>
							</Panel>}
						</For>
						<Show when={notices().length == 0}>
							<Label class="CommunityState NoticeState" text={GetLocalization(
								homeLoading()
									? "#Community_Loading"
									: homeError()
										? "#Community_LoadFailed"
										: "#Community_Empty"
							)} />
						</Show>
					</Panel>
				</Panel>
			</Panel>

			{/** 游戏福利、反馈 */}
			<Panel id="GiftAndFeedback">
				<Panel class="GiftContent">
					<Label class="NoticeTitle" text={GetLocalization("#Community_GameWelfare")} />
					<Panel class="ClaimPanel">
						<Panel align="center center" flowChildren="right">
							<EOM_BaseButton class="ClaimBtn" enabled={!weeklyStateLoading() && !weeklyClaiming() && weeklyState() == "available"} onactivate={claimWeeklyGift}>
								<Panel align="center center" flowChildren="down">
									<Label class="GiftName" text={GetLocalization("#Community_Weekly_Name")} />
									<Panel class="GiftDescContainer">
										<Label class="GiftDesc" text={GetLocalization("#Community_Weekly_Items")} />
									</Panel>
									<Label class="GiftState" text={weeklyStateLoading()
										? GetLocalization("#Community_Loading")
										: weeklyClaiming()
											? GetLocalization("#Community_Weekly_Claiming")
											: weeklyState() == "received"
												? GetLocalization("#Community_Weekly_Claimed")
												: weeklyStatus() || GetLocalization("#Community_Weekly_Claim")} />
								</Panel>
							</EOM_BaseButton>
							<EOM_BaseButton class="ClaimBtn" onactivate={() => {
								ReportCommunity("cdk");
								OpenExternalURL2(CDK_LINKS[lang]);
							}}>
								<Panel align="center center" flowChildren="down">
									<Label class="GiftName" text={GetLocalization("#Community_CDK_Name")} />
									<Panel class="GiftDescContainer">
										<Label class="GiftDesc" text={GetLocalization("#Community_CDK_Desc")} />
									</Panel>
									<Label class="GiftState" text={GetLocalization("#Community_CDK_Action")} />
								</Panel>
							</EOM_BaseButton>
						</Panel>
					</Panel>
				</Panel>
				<Panel class="FeedbackContent">
					<Label class="NoticeTitle" text={GetLocalization("#Community_Feedback_Title")} />
					<Panel class="FeedbackPanel">
						<Panel align="center center" flowChildren="right">
							<Panel class="FeedbackTypeList">
								<For each={FEEDBACK_TYPES}>
									{item => <EOM_BaseButton
										class="FeedTypeBtn"
										classList={{ Selected: feedbackType() == item.type }}
										text={GetLocalization(item.localization)}
										onactivate={() => setFeedbackType(item.type)} />}
								</For>
							</Panel>
							<EOM_TextEntry
								multiline
								maxchars={2000}
								text={feedbackContent()}
								placeholder={GetLocalization("#Community_Feedback_Placeholder")}
								onChange={(_, __, text) => {
									setFeedbackContent(text);
									setFeedbackStatus("");
								}} />
							<EOM_BaseButton
								class="PushBtn"
								enabled={!feedbackSubmitting() && feedbackCooldown() == 0 && feedbackContent().trim().length > 5}
								text={feedbackSubmitting()
									? GetLocalization("#Community_Feedback_Submitting")
									: feedbackCooldown() > 0
										? LocalizeWithVars("#Community_Feedback_Cooldown", { seconds: feedbackCooldown() })
										: GetLocalization("#Community_Feedback_Submit")}
								onactivate={submitFeedback} />
						</Panel>
						<Show when={feedbackStatus() != ""}>
							<Label class="FeedbackStatus" classList={{ Success: feedbackSucceeded() }} text={feedbackStatus()} />
						</Show>
					</Panel>
				</Panel>
			</Panel>
		</Panel>
	</Panel>;
};

function CommunityRoot() {
	const [useOnlineCommunityURL, setUseOnlineCommunityURL] = createSignal(false);
	const [switchingCommunityURL, setSwitchingCommunityURL] = createSignal(false);
	let communityOpenedAt: number | undefined;
	let testURLRequest: string | undefined;
	const reportStayTime = () => {
		if (communityOpenedAt == undefined) return;
		const seconds = Math.max(0, Math.round(Date.now() / 1000 - communityOpenedAt));
		communityOpenedAt = undefined;
		ReportCommunity(`stay_${seconds}`);
	};

	createEffect((previousVisible: boolean) => {
		const visible = show();
		if (visible && !previousVisible) {
			communityOpenedAt = Date.now() / 1000;
			ReportCommunity("entry");
		} else if (!visible && previousVisible) {
			reportStayTime();
		}
		return visible;
	}, false);

	createEffect((previousHide: boolean) => {
		const visible = show();
		if (!visible) {
			setInGameBrowserURL(undefined);
		}
		const hide = HIDE_MENU_BAR && visible;
		if (hide != previousHide) {
			GameEvents.SendEventClientSide("client_side_event", {
				event_name: "set_menu_bar_visible",
				event_data: JSON.stringify({ key: "community", hide }),
			});
		}
		return hide;
	}, false);

	onCleanup(() => {
		if (testURLRequest != undefined) {
			CancelRequest(testURLRequest);
		}
		reportStayTime();
		GameEvents.SendEventClientSide("client_side_event", {
			event_name: "set_menu_bar_visible",
			event_data: JSON.stringify({ key: "community", hide: false }),
		});
	});

	const handleClose = () => {
		setInGameBrowserURL(undefined);
		ClientSideEvent("custom_ui_toggle_windows", {
			windowName: "MenuButton_community",
			state: 0,
		});
	};
	const switchCommunityURL = () => {
		if (!Game.IsInToolsMode() || switchingCommunityURL()) return;
		const useOnline = !useOnlineCommunityURL();
		setSwitchingCommunityURL(true);
		testURLRequest = ServerRequest("community_set_test_url", { useOnline }, (result) => {
			testURLRequest = undefined;
			setSwitchingCommunityURL(false);
			if (!result.ok) {
				ErrorMessage(result.message ?? GetLocalization("#Community_LoadFailed"));
				return;
			}
			setUseOnlineCommunityURL(result.useOnline);
			communityOpenHandler?.(true);
		}, 5, () => {
			testURLRequest = undefined;
			setSwitchingCommunityURL(false);
			ErrorMessage(GetLocalization("#Community_LoadFailed"));
		});
	};
	return <Panel
		id="CommunityRoot"
		classList={{ Show: show() }}
		hittest={show()}
		acceptsfocus={show()}>
		<Panel id="AspectAdpater">
			<Community />
		</Panel>
		<EOM_CloseButton onactivate={handleClose} />
		<Show when={inGameBrowserURL()}>
			<Panel id="CommunityBrowser">
				<GenericPanel
					id="CommunityBrowserContent"
					acceptsinput
					hittest
					type="DOTAHTMLPanel"
					url={inGameBrowserURL()}
					onload={self => {
						self.SetAcceptsFocus(true);
						//@ts-ignore
						self.SetIgnoreCursor(true);

						$.Schedule(0.1, () => {
							if (!self.IsValid()) return;
							//@ts-ignore
							self.SetIgnoreCursor(false);
							self.SetFocus();
						});
					}}
				/>
				<EOM_CloseButton id="CommunityBrowserClose" onactivate={() => setInGameBrowserURL(undefined)} />
			</Panel>
		</Show>
		<EOM_BaseButton
			id="TESTButton"
			visible={Game.IsInToolsMode()}
			enabled={!switchingCommunityURL()}
			onactivate={switchCommunityURL}>
			<Label text={GetLocalization(
				switchingCommunityURL()
					? "#Community_Test_Switching"
					: useOnlineCommunityURL()
						? "#Community_Test_SwitchLocal"
						: "#Community_Test_SwitchOnline"
			)} />
		</EOM_BaseButton>
	</Panel>;
}

render(() => <CommunityRoot />, $.GetContextPanel());
