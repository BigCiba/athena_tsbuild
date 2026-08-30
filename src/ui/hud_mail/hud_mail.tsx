import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createEffect, createMemo, createSignal, Index, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_Countdown } from "../../components/EOMDesign/DataDisplay/EOM_Countdown/EOM_Countdown";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { createMenuLayout, EOM_MenuLayout, EOM_MenuLayout_Content } from "../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { createServiceNetData } from "../../utils/solid_utils";

const language = Language();
let debugMails: MailData[] = [];
if (Game.IsInToolsMode()) {
	debugMails = [
		{
			mail_id: 0,
			category: "category",
			title: "这是本地测试代码",
			title_en: "title_en",
			title_ru: "title_ru",
			sub_title: "这是本地测试代码",
			sub_title_en: "sub_title_ensub_title_ensub_title_ensub_title _ensub_title_ensub_title_ensub_title_en",
			sub_title_ru: "sub_title_ru",
			content: Array.from({ length: 1000 }).fill("测试").join(),
			content_en: "content_en",
			content_ru: "content_ru",
			expire_time: 0,
			items: [{ item_id: "190001", amounts: 999 }, { item_id: "110001", amounts: 999 }, { item_id: "110001", amounts: 999 }],
			step: 0
		},
		{
			mail_id: 0,
			category: "category",
			title: "这是本地测试代码",
			title_en: "title_en",
			title_ru: "title_ru",
			sub_title: "这是本地测试代码",
			sub_title_en: "sub_title_en",
			sub_title_ru: "sub_title_ru",
			content: Array.from({ length: 10 }).fill("测试").join(),
			content_en: "content_en",
			content_ru: "content_ru",
			expire_time: 0,
			items: [{ item_id: "190001", amounts: 999 }, { item_id: "110002", amounts: 999 }, { item_id: "110002", amounts: 999 }],
			step: 1
		},
		{
			mail_id: 0,
			category: "category",
			title: "这是本地测试代码",
			title_en: "title_en",
			title_ru: "title_ru",
			sub_title: "这是本地测试代码",
			sub_title_en: "sub_title_en",
			sub_title_ru: "sub_title_ru",
			content: Array.from({ length: 1000 }).fill("测试").join(),
			content_en: "content_en",
			content_ru: "content_ru",
			expire_time: 0,
			items: [{ item_id: "190001", amounts: 999 }, { item_id: "110003", amounts: 999 }, { item_id: "110003", amounts: 999 }],
			step: 2
		},
	];
}
/**
 * 获取邮件标题，根据当前语言环境返回对应语言的标题
 * @param mailData - 邮件数据对象
 * @returns 对应语言的标题文本
 */
const getTitle = (mailData?: MailData) => {
	if (mailData == undefined) {
		return "";
	}
	const mapData: Record<string, string> = {
		["schinese"]: mailData.title,
		["english"]: mailData.title_en,
		["russian"]: mailData.title_ru,
	};
	return mapData[language] ?? mailData.title_en;
};
/**
 * 获取邮件副标题，根据当前语言环境返回对应语言的副标题
 * @param mailData - 邮件数据对象
 * @returns 对应语言的副标题文本
 */
const getSubTitle = (mailData?: MailData) => {
	if (mailData == undefined) {
		return "";
	}
	const mapData: Record<string, string> = {
		["schinese"]: mailData.sub_title,
		["english"]: mailData.sub_title_en,
		["russian"]: mailData.sub_title_ru,
	};
	return mapData[language] ?? mailData.sub_title_en;
};
/**
 * 获取邮件内容，根据当前语言环境返回对应语言的内容
 * @param mailData - 邮件数据对象
 * @returns 对应语言的内容文本
 */
const getContent = (mailData?: MailData) => {
	if (mailData == undefined) {
		return "";
	}
	const mapData: Record<string, string> = {
		["schinese"]: mailData.content,
		["english"]: mailData.content_en,
		["russian"]: mailData.content_ru,
	};
	return mapData[language] ?? mailData.content_en;
};

/** 操作邮件 */
const mailOperate = (mail_id: number, step: number, operate_type: number) => {
	CallAction("/v1/mails/operate", { mail_id, step, operate_type });
	// if (step == 9) {
	// 	setMailPreview(undefined);
	// }
};
/** 批量操作邮件 */
const mailOperateAll = (step: number) => {
	CallAction("/v1/mails/operate", { step, operate_type: 2 });
	if (step == 9) {
		setMailPreviewIndex(undefined);
	}
};
const [mailPreviewIndex, setMailPreviewIndex] = createSignal<number | undefined>();

const [category, setCategory] = createStore({ "mail_all": [] });
const { LayoutMenu, show, setShow, menuName, secondTabName, setMenuName, setSecondTabName } = createMenuLayout("mail", () => category);

const Mail = () => {
	const [mailList, setMailList] = createSignal<MailData[]>([]);
	const [filter, setFilter] = createSignal("mail_all");
	const playerMails = createServiceNetData("player_mails", {});
	createEffect(() => {
		if (show()) {
			CallAction("/v1/mails/fetch", {});
		}
	});
	const mailPreview = createMemo(() => {
		if (mailPreviewIndex() != undefined) {
			return mailList()[mailPreviewIndex()!];
		}
	});
	createEffect(() => {
		const data = playerMails();
		const nameList: any = {};
		for (const mid in data) {
			const mailData = data[mid];
			if (nameList[mailData.category] == undefined) {
				nameList[mailData.category] = [];
			}
		}
		setCategory(nameList);
		// 把Object.values(data)按mid弹道大小排序
		setMailList(Object.values(data).sort((a, b) => b.mail_id - a.mail_id));
	});

	// 计算是否需要显示红点（使用 memo 缓存计算结果）
	const needShowRedPoint = createMemo(() => {
		const currentMailList = mailList();
		const now = Date.now() / 1000;
		// 判断是否有未领取的邮件（未过期、未领取、有附件）

		return currentMailList.some(data => data.expire_time > now && data.step < 2 && data.items.length > 0);
	});

	// 设置红点状态（NPC红点系统会自动处理粒子创建/销毁）
	createEffect(() => {
		CustomUIConfig.SetRedPoint(needShowRedPoint(), "mail");
		print("mail:", needShowRedPoint());
	});
	return (
		<EOM_MenuLayout id="MenuButton_mail" show={show()} name="MenuButton_mail">
			<LayoutMenu />
			<EOM_MenuLayout_Content id="MailRoot">
				<Show when={mailList().length > 0} fallback={<EmptyFallback />}>
					<Panel id="MailBolck">
						<Panel id="MailLeft">
							<Panel id="MailList" scroll="y" class="VerticalScrollStyle">
								<Index each={mailList()}>
									{(mailData, i) => {
										return <Show when={filter() == "mail_all" || filter() == mailData()?.category}>
											<MailRow mailData={mailData()} callback={() => {
												setMailPreviewIndex(i);
											}} />
										</Show>;
									}}
								</Index>
							</Panel>
							<Panel class="ButtonBox">
								<EOM_Button text="#mail_action_receive_all" color="Confirm"
									enabled={mailList().some(v => v.step < 2)}
									onactivate={() => mailOperateAll(2)}
								/>
								<EOM_Button text="#mail_action_remove_all" marginLeft="66px" color="Cancel"
									enabled={mailList().some(v => v.step == 2)}
									onactivate={() => mailOperateAll(9)}
								/>
							</Panel>
						</Panel>
						<Panel id="MailRight" >
							<Panel id="MailContent">
								<Show when={mailPreview() != undefined}>
									<Label hittest={false} html className="ContentTitle" padding="0px 16px" text={getTitle(mailPreview())} />
									<Panel class="HorizontalLine" />
									<Panel className="ContentBody VerticalScrollStyle" scroll="y">
										<Label hittest={false} html className="ContentLabel" text={getContent(mailPreview())} />
									</Panel>
									<Panel width="100%" flowChildren="right" padding="0px 16px">
										<Image id="Attachment" />
										<Label id="AttachmentLabel" text="#mail_attachment" />
									</Panel>
									<Panel class="HorizontalLine"></Panel>
									<Panel id="MailItemList" class="HorizontalScrollBar" flowChildren="right" scroll="x" hittest={false}>
										{/* <Index each={mailPreview()?.items ?? []}>
											{(item, index) => <StoreItemBlock item_id={item().item_id} amounts={item().amounts} />}
										</Index> */}
									</Panel>
								</Show>
							</Panel>
							<Panel class="ButtonBox">
								<Switch fallback={<EOM_Button text="#mail_delete" color="Cancel"
									enabled={(mailPreview()?.step ?? 0) == 2}
									onactivate={() => {
										const mid = mailPreview()?.mail_id;
										if (mid) {
											mailOperate(mid, 9, 1);
										}
									}} />}>
									<Match when={((mailPreview()?.step ?? 0) < 2 && (mailPreview()?.items ?? "{}") != "{}")}>
										<EOM_Button text="#mail_action_receive" color="Confirm"
											// enabled={((mailPreview()?.step ?? 0) < 2 && (mailPreview()?.items ?? "{}") != "{}")}
											onactivate={() => {
												const mid = mailPreview()?.mail_id;
												if (mid) {
													mailOperate(mid, 2, 1);
												}
											}} />
									</Match>
								</Switch>
							</Panel>
						</Panel>
					</Panel>
				</Show>
			</EOM_MenuLayout_Content>
		</EOM_MenuLayout>
	);
};

/**
 * 邮件列表行组件，用于显示单个邮件信息
 * @param props - 组件属性
 * @param props.mailData - 邮件数据对象
 * @param props.callback - 点击回调函数
 * @returns 邮件行组件JSX
 */
const MailRow = (props: { mailData: MailData, callback: () => void; }) => {
	return (
		<TabButton group="MailRow" className="MailRow" classList={{ Open: props.mailData.step > 1 }} onactivate={self => {
			if (props.mailData.items && props.mailData.items.length > 0) {
				if (props.mailData.step == 0) {
					mailOperate(props.mailData.mail_id, 1, 1);
				}
			} else {
				if (props.mailData.step <= 1) {
					mailOperate(props.mailData.mail_id, 2, 1);
				}
			}
			props.callback();
		}}>
			<Panel id="RowMain" hittest={false}>
				<Image className={classNames("MailIcon", props.mailData.category)} />
				<Label className="MailTitle" text={getSubTitle(props.mailData)} />
				<Panel id="IconCountDown">
					<Panel id="Icon" />
					<EOM_Countdown className="MailTimeout" endTime={props.mailData.expire_time} />
				</Panel>
				<Panel id="Select"></Panel>
			</Panel>
			<Show when={props.mailData.step == 0}>
				<Image className="MailUnRead" />
			</Show>

		</TabButton>
	);
};


const EmptyFallback = () => {
	return <Panel id="EmptyFallback">
		<Image />
		<Panel align="center center" flowChildren="down">
			<Label id="Title" text="#Props_EmptyFallbackTitle" />
			<Label id="Desc" text="#Mail_EmptyFallback" />
		</Panel>
	</Panel>;
};


render(() => <Mail />, $.GetContextPanel());
