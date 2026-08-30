import { For, createMemo, createSignal, onCleanup } from "solid-js";
import { EOM_Button, EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { StoreItemBlock } from "../../../components/StoreItem/StoreItem";
import { BasePopup, PopupProps } from "../base_popup";
import "./community_survey.less";

type CommunitySurveyLanguage = "zh" | "en" | "ru";

interface CommunitySurveyOption {
	id: string;
	localization?: string;
	text?: Partial<Record<CommunitySurveyLanguage, string>>;
}

interface PopupCommunitySurveyProps extends PopupProps { }

const CHINESE_SOURCE_OPTIONS: CommunitySurveyOption[] = [
	{ id: "zh_arcade_home", localization: "#Community_Survey_Source_ZH_01" },
	{ id: "zh_friend", localization: "#Community_Survey_Source_ZH_02" },
	{ id: "zh_eom_group", localization: "#Community_Survey_Source_ZH_03" },
	{ id: "zh_custom_hero_chaos", localization: "#Community_Survey_Source_ZH_04" },
	{ id: "zh_auto_gladiators", localization: "#Community_Survey_Source_ZH_05" },
	{ id: "zh_daoke_alin", localization: "#Community_Survey_Source_ZH_06" },
	{ id: "zh_aoki", localization: "#Community_Survey_Source_ZH_07" },
	{ id: "zh_nannan", localization: "#Community_Survey_Source_ZH_08" },
	{ id: "zh_shanhaijing_online", localization: "#Community_Survey_Source_ZH_09" },
	{ id: "zh_chixiaochao", localization: "#Community_Survey_Source_ZH_10" },
	{ id: "zh_feizhai_kuailelang", localization: "#Community_Survey_Source_ZH_18" },
	{ id: "zh_bino", localization: "#Community_Survey_Source_ZH_11" },
	{ id: "zh_douyin_ximen", localization: "#Community_Survey_Source_ZH_12" },
	{ id: "zh_pencil_hb", localization: "#Community_Survey_Source_ZH_13" },
	{ id: "zh_sad_sweet_potato", localization: "#Community_Survey_Source_ZH_14" },
	{ id: "zh_dota_romance", localization: "#Community_Survey_Source_ZH_15" },
	{ id: "zh_dota2_chuangge", localization: "#Community_Survey_Source_ZH_16" },
	{ id: "zh_dota_daily_rhythm", localization: "#Community_Survey_Source_ZH_17" },
	{ id: "zh_murong_ruolan", localization: "#Community_Survey_Source_ZH_19" },
	{ id: "zh_liu_dadu_dota2", localization: "#Community_Survey_Source_ZH_20" },
	{ id: "zh_xinsheng_dota2", localization: "#Community_Survey_Source_ZH_21" },
];

const INTERNATIONAL_SOURCE_OPTIONS: CommunitySurveyOption[] = [
	{ id: "arcade_browse", text: { en: "Browsing the Dota 2 Arcade", ru: "Листал аркаду в Dota 2" } },
	{ id: "eom_discord", text: { en: "Found through another EOM Discord server", ru: "Из другого Discord-сервера EOM" } },
	{ id: "friend_or_spectator", text: { en: "A friend told me / saw someone playing", ru: "Друг посоветовал / увидел, как играют" } },
	{ id: "stream_or_video", text: { en: "Watched a streamer or video about it", ru: "Смотрел стрим или видео" } },
	{ id: "random", text: { en: "Just found it randomly", ru: "Случайно наткнулся" } },
	{ id: "custom_hero_chaos", text: { en: "Via the Custom Hero Chaos collab event", ru: "Коллаб с Custom Hero Chaos" } },
	{ id: "auto_gladiators", text: { en: "Via the Auto Gladiators collab event", ru: "Коллаб с Auto Gladiators" } },
];

const RECOMMEND_OPTIONS: CommunitySurveyOption[] = [
	{ id: "yes", localization: "#Community_Survey_Recommend_Yes" },
	{ id: "no", localization: "#Community_Survey_Recommend_No" },
];

function GetCommunitySurveyLanguage(): CommunitySurveyLanguage {
	const language = Language();
	if (language == "english") return "en";
	if (language == "russian") return "ru";
	return "zh";
}

function GetCommunitySurveyOptionText(option: CommunitySurveyOption, language: CommunitySurveyLanguage): string {
	const text = option.text?.[language];
	if (text != undefined) return text;
	return option.localization == undefined ? "" : GetLocalization(option.localization);
}

export function Popup_CommunitySurvey(props: PopupCommunitySurveyProps) {
	const language = GetCommunitySurveyLanguage();
	const sourceOptions = language == "zh" ? CHINESE_SOURCE_OPTIONS : INTERNATIONAL_SOURCE_OPTIONS;
	const [selectedSourceID, setSelectedSourceID] = createSignal<string>();
	const [selectedRecommend, setSelectedRecommend] = createSignal<boolean>();
	const [submitAttempted, setSubmitAttempted] = createSignal(false);
	const [submitting, setSubmitting] = createSignal(false);
	const canSubmit = createMemo(() => selectedSourceID() != undefined && selectedRecommend() != undefined);
	const sourceColumns = createMemo(() => {
		const splitIndex = Math.ceil(sourceOptions.length / 2);
		return [sourceOptions.slice(0, splitIndex), sourceOptions.slice(splitIndex)];
	});
	let requestSent = false;

	const getAnswers = () => {
		const sourceID = selectedSourceID();
		const recommend = selectedRecommend();
		if (sourceID == undefined || recommend == undefined) return;

		const sourceOption = sourceOptions.find(option => option.id == sourceID);
		const recommendOption = RECOMMEND_OPTIONS.find(option => (option.id == "yes") == recommend);
		if (sourceOption == undefined || recommendOption == undefined) return;

		return [
			{ id: 1, answer: GetCommunitySurveyOptionText(sourceOption, language) },
			{ id: 2, answer: GetCommunitySurveyOptionText(recommendOption, language) },
		];
	};

	const submit = () => {
		setSubmitAttempted(true);
		const answers = getAnswers();
		if (answers == undefined || submitting()) return;

		setSubmitting(true);
		requestSent = true;
		CallActionRequest("/v1/player/submit_questionnaire", {
			answers,
		}, result => {
			setSubmitting(false);
			if (result.code == 0 || result.code == 200) {
				ClosePopup(props.PopupID);
				return;
			}
			requestSent = false;
			ErrorMessage(result.message ?? GetLocalization("#Community_Survey_SubmitFailed"));
		}, () => {
			setSubmitting(false);
			requestSent = false;
			ErrorMessage(GetLocalization("#Community_Survey_SubmitFailed"));
		});
	};
	onCleanup(() => {
		const answers = getAnswers();
		if (requestSent) return;

		requestSent = true;
		CallActionRequest("/v1/player/submit_questionnaire", answers == undefined ? {} : { answers }, () => { });
	});
	return <BasePopup
		id="Popup_CommunitySurvey"
		PopupID={props.PopupID}
		group={props.group}
		closeOnClickOuter={false}
		size="large"
		title={GetLocalization("#Community_Survey_Title")}>
		<Panel id="SurveyShell" classList={{ International: language != "zh" }}>
			<Panel class="SurveyBackdrop" hittest={false} />
			<Image
				class="SurveyHero Left"
				hittest={false}
				scaling="stretch-to-fit-preserve-aspect"
				src={getImagePath("activity/f2_football/f5_hero_03.png")} />
			<Image
				class="SurveyHero Right"
				hittest={false}
				scaling="stretch-to-fit-preserve-aspect"
				src={getImagePath("activity/f2_football/f5_hero_04.png")} />

			<Panel id="SurveyBody">
				<Panel id="SurveyIntro">
					<Label class="SurveyIntroText" text={GetLocalization("#Community_Survey_Intro")} />
					<Panel class="SurveyIntroLine" />
				</Panel>

				<Panel id="SurveyQuestions">
					<Panel
						class="SurveyQuestion SourceQuestion"
						classList={{ Incomplete: submitAttempted() && selectedSourceID() == undefined }}>
						<Label class="SurveyQuestionTitle" text={GetLocalization("#Community_Survey_Question_1")} />
						<Panel class="SurveySourceColumns">
							<For each={sourceColumns()}>
								{column => <Panel class="SurveyOptionColumn VerticalScrollStyle" scroll="y">
									<For each={column}>
										{option => <EOM_BaseButton
											class="SurveyOption"
											classList={{ Selected: selectedSourceID() == option.id }}
											onactivate={() => setSelectedSourceID(option.id)}>
											<Panel class="SurveyRadioBox">
												<Panel class="SurveyRadioDot" />
											</Panel>
											<Label text={GetCommunitySurveyOptionText(option, language)} />
										</EOM_BaseButton>}
									</For>
								</Panel>}
							</For>
						</Panel>
					</Panel>

					<Panel id="SurveySideColumn">
						<Panel
							class="SurveyQuestion RecommendQuestion"
							classList={{ Incomplete: submitAttempted() && selectedRecommend() == undefined }}>
							<Label class="SurveyQuestionTitle" text={GetLocalization("#Community_Survey_Question_2")} />
							<Panel class="SurveyRecommendOptions">
								<For each={RECOMMEND_OPTIONS}>
									{option => {
										const value = option.id == "yes";
										return <EOM_BaseButton
											class="SurveyOption"
											classList={{ Selected: selectedRecommend() == value }}
											onactivate={() => setSelectedRecommend(value)}>
											<Panel class="SurveyRadioBox">
												<Panel class="SurveyRadioDot" />
											</Panel>
											<Label text={GetCommunitySurveyOptionText(option, language)} />
										</EOM_BaseButton>;
									}}
								</For>
							</Panel>
						</Panel>

						<Panel id="SurveyReward">
							<Label class="SurveyRewardTitle" text={GetLocalization("#Community_Survey_Reward_Title")} />
							<StoreItemBlock class="SurveyRewardItem" item_id="190001" amounts={5} />
							<Label class="SurveyRewardName" text={GetLocalization("#Community_Survey_Reward_Name")} />
						</Panel>
					</Panel>
				</Panel>

				<Panel id="SurveyFooter">
					<Label
						class="SurveyValidation"
						visible={submitAttempted() && !canSubmit()}
						text={GetLocalization("#Community_Survey_Validation")} />
					<EOM_Button
						id="SurveySubmit"
						color="Confirm"
						loading={submitting()}
						text={GetLocalization("#Community_Survey_Submit")}
						onactivate={submit} />
				</Panel>
			</Panel>
		</Panel>
	</BasePopup>;
}
