// import { For, Match, ParentComponent, Show, Switch, createMemo, createSignal, on, onCleanup, onMount, splitProps } from "solid-js";
// import { useGameEvent } from "solid-panorama-all-in-jsx/events.macro";
// import { EOM_Loading } from "../../../components/EOMDesign/DataDisplay/EOM_Loading/EOM_Loading";
// import { EOM_QRCode } from "../../../components/EOMDesign/DataDisplay/EOM_QRCode/EOM_QRCode";
// import { BasePopup, PopupProps } from "../base_popup";
// import "./store_money_payment.less";

// interface Popup_StoreMoneyPayment_Prop extends PopupProps {
// 	/** 物品属性 */
// 	itemData: StoreItemData;
// 	/** 购买的数量 */
// 	count: number;
// }

// // 8000支付方式支持的code
// const ISOCodeValid: Record<string, boolean> = {
// 	ID: true, // 印度尼西亚
// 	PH: true, // 菲律宾
// 	MY: true, // 马来西亚
// 	TH: true, // 泰国
// 	SG: true, // 新加坡
// 	VN: true, // 越南
// 	BD: true, // 孟加拉国
// 	PK: true, // 巴基斯坦
// };

// interface PaymentOrder {
// 	order_id?: string;
// 	order_link?: string;
// }

// interface OrderCreateResponse {
// 	status?: number;
// 	data?: {
// 		payment_order?: PaymentOrder;
// 		player_orders?: PaymentOrder[];
// 	};
// }

// function getPaymentOrder(response?: OrderCreateResponse) {
// 	const data = response?.data;
// 	return data?.payment_order ?? data?.player_orders?.[0];
// }

// function stringifyForLog(data: unknown) {
// 	try {
// 		return JSON.stringify(data);
// 	} catch {
// 		return String(data);
// 	}
// }

// function logPayment(tag: string, data?: unknown) {
// 	if (data == undefined) {
// 		print("[StoreMoneyPayment]", tag);
// 	} else {
// 		print("[StoreMoneyPayment]", tag, stringifyForLog(data));
// 	}
// }

// function logPaymentError(tag: string, error: unknown) {
// 	const err = error as { message?: string; stack?: string; };
// 	logPayment(tag, {
// 		message: err?.message ?? String(error),
// 		stack: err?.stack,
// 	});
// }

// function ShowIfPayed(order_ids: string[]) {
// 	CustomUIConfig.showPopup("CommonConfirm", {
// 		text: "#Popup_StoreMoneyPayment_IfPayed",
// 		title: "#Popup_Title_Common_Tips",
// 		confirm_text: "#Popup_StoreMoneyPayment_Payed",
// 		cancel_text: "#Popup_StoreMoneyPayment_NotPayed",
// 		onresult(bConfirm: boolean) {
// 			GameEvents.SendCustomEventToServer("payment_on_close_popup", {
// 				status: bConfirm ? 1 : 0,
// 				order_ids
// 			});
// 		},
// 	});
// }

// export const Popup_StoreMoneyPayment: ParentComponent<Popup_StoreMoneyPayment_Prop> = (props) => {
// 	const [local, others] = splitProps(props, ["itemData", "PopupID", "group"]);

// 	const sLanguage = Language();
// 	const tConfig = CustomUIConfig.pay_config[sLanguage] ?? CustomUIConfig.pay_config.english;
// 	let otherPayment = Object.entries(CustomUIConfig.payments)
// 		.filter(([id, { disable }]) => {
// 			return disable != 1 && tConfig.home[id] == undefined;
// 		})
// 		.map(([pmid, _]) => pmid);
// 	// if (sLanguage == "schinese") {
// 	// 	otherPayment.sort((a,b)=> {return a.pay_type == "" ? 1:-1})
// 	// }

// 	// 通过任意方式支付成功
// 	const [bPayed, SetPayed] = createSignal(false);
// 	// 记录已经请求到的支付链接和订单ID
// 	const [ordersData, SetOrdersData] = createSignal<Record<string, {
// 		orderID: string;
// 		link: string;
// 	}>>({});
// 	const [searchText, setSearchText] = createSignal("");
// 	const rText = createMemo(() => new RegExp(searchText()));

// 	onMount(() => {
// 		let RequestIDList: string[] = [];
// 		for (let [id, value] of Object.entries(tConfig.home)) {
// 			if (value != "qrcode") {
// 				continue;
// 			}
// 			const params = getPaymentParams(id);
// 			if (!params) {
// 				continue;
// 			}
// 			RequestIDList.push(
// 				ServerRequest("order_create", params, (data) => {
// 					const paymentOrder = getPaymentOrder(data as OrderCreateResponse);
// 					if (paymentOrder?.order_id && paymentOrder.order_link) {
// 						let storeData = {
// 							orderID: paymentOrder.order_id,
// 							link: paymentOrder.order_link,
// 						};
// 						const nextOrdersData = {
// 							...ordersData(),
// 							[id]: storeData,
// 						};
// 						try {
// 							SetOrdersData(nextOrdersData);
// 						} catch (error) {
// 							logPaymentError("set qrcode order data error", error);
// 						}
// 					} else {
// 						logPayment("missing order_id or order_link", { id, paymentOrder, data });
// 					}
// 				})
// 			);
// 		}
// 	});

// 	useGameEvent("payment_success", data => {
// 		for (const { orderID } of Object.values(ordersData())) {
// 			if (orderID == data.order_id) {
// 				SetPayed(true);
// 				break;
// 			}
// 		}
// 	});


// 	function getPaymentParams(id: string, bPopup = false) {
// 		if (!id) {
// 			return;
// 		}
// 		const tKV = CustomUIConfig.payments[id];
// 		if (tKV == undefined || tKV.disable == 1) {
// 			return;
// 		}
// 		const paytype = tKV.pay_type;
// 		let result: ServerRequestEventDeclarations["order_create"]["params"] = {
// 			pay_id: id,
// 			pid: props.itemData.id,
// 			amounts: props.count,
// 			pay_type: tKV.pay_type as any,
// 			title: GetLocalization("#" + props.itemData.id),
// 			body: GetLocalization("#" + props.itemData.id + "_description"),
// 		};
// 		switch (paytype) {
// 			case 4000:
// 				result.pmid = tKV.pmid;
// 				break;
// 			case 6000:
// 				/* 暂时禁用了 */
// 				break;
// 			case 8000:
// 				let ISOCode = CustomUIConfig.__LocalISOCode;
// 				if (ISOCodeValid[ISOCode ?? ""]) {
// 					result.country = ISOCode;
// 				} else {
// 					if (bPopup) {
// 						CustomUIConfig.showPopup("CommonConfirm", { text: "#Popup_StoreMoneyPayment_NotSupportInYourCountry" });
// 					}
// 					return;
// 				}
// 				break;
// 			default:
// 				break;
// 		}
// 		return result;
// 	}

// 	function requestLinkAndOpen(id: string) {
// 		const detail = getPaymentParams(id, true);
// 		if (detail) {
// 			CustomUIConfig.showPopup("StoreMoneyPaymentOversea", {
// 				request_params: detail,
// 				onPayed() {
// 					SetPayed(true);
// 				},
// 			});
// 		}
// 	}

// 	function PaymentCard(props: { pid: string; } & PanelAttributes) {
// 		const [local, others] = splitProps(props, ["pid"]);
// 		const src = createMemo(() => {
// 			let tKV = CustomUIConfig.payments[local.pid];
// 			if (tKV == undefined) {
// 				return "";
// 			}
// 			let src = tKV.pay_type == 4000 ? tKV.pmid! : tKV.pay_type;
// 			return src;
// 		});

// 		const bShow = createMemo(() => {
// 			let tKV = CustomUIConfig.payments[local.pid];
// 			if (tKV == undefined || tKV.disable == 1) {
// 				return false;
// 			}
// 			if (tKV.pay_type == 8000) {
// 				let ISOCode = CustomUIConfig.__LocalISOCode;
// 				return ISOCodeValid[ISOCode ?? ""];
// 			} else {
// 				return true;
// 			}
// 		});

// 		return (
// 			<Show when={bShow()}>
// 				<Panel {...others} class="PaymentCard" onactivate={() => requestLinkAndOpen(local.pid)}>
// 					<Image src={`file://{images}/custom_game/payments/payssion_icon/${src()}.png`} />
// 				</Panel>
// 			</Show>
// 		);
// 	}

// 	/* TODO:显示上次使用的支付方式，主要是方便外国玩家快速找到自己上次使用的冷门支付渠道 */
// 	const lastPayID = () => "";

// 	const { itemData, PopupID } = local;

// 	onCleanup(() => {
// 		if (!bPayed()) {
// 			ShowIfPayed(Object.values(ordersData()).map(({ orderID }) => orderID));
// 		}
// 	});

// 	return (
// 		<BasePopup class="Popup_StoreMoneyPayment" PopupID={PopupID} group={String(itemData.id)} title="#Popup_StoreMoneyPayment_Title" closeOnClickOuter={bPayed()} closeOnEsc={bPayed()}>
// 			<TabContents id="DefaultPayments" selected={true} group="payment_page" tabid="DefaultPaymentsBtn">
// 				<Panel id="DefaultPaymentCenter" hittest={false}>
// 					<Switch>
// 						<Match when={bPayed()}>
// 							<Panel id="PaymentSuccess">
// 								<Image src="file://{images}/custom_game/icon/icon_party_ready_psd.png" />
// 								<Label text="#Popup_StoreMoneyPayment_Success" />
// 							</Panel>
// 						</Match>
// 						<Match when={!bPayed()}>
// 							<For each={Object.keys(tConfig.home)}>
// 								{id => {
// 									let id_config = tConfig.home[id];
// 									if (id_config == "qrcode") {
// 										const data = () => ordersData()[id];
// 										return (
// 											<Panel className="QrCodeContainer" hittest={false}>
// 												<Show when={data()} keyed
// 													fallback={
// 														<EOM_Loading align="center center" color="#D9B88D" />
// 													}
// 												>
// 													<EOM_QRCode align="center center" qrcodesize={200} value={data().link} imageSrc={`file://{images}/custom_game/payments/qrcode/${id}.png`} />;
// 												</Show>
// 											</Panel>

// 										);
// 									} else {
// 										return <PaymentCard pid={id} />;
// 									}
// 								}}
// 							</For>
// 						</Match>
// 					</Switch>
// 				</Panel>

// 				{/* 上次使用的支付方式 */}
// 				{createMemo(on(lastPayID, (id?: string) => {
// 					if (!id) return;
// 					/* 显示在首页的支付方式就没必要再显示一个了 */
// 					if (tConfig.home[id] != undefined) return;

// 					return (
// 						<Panel id="RecentUsePayment" hittest={false}>
// 							<Label text="#Popup_StoreMoneyPayment_RecentUse" hittest={false} />
// 							<PaymentCard pid={id} />
// 						</Panel>
// 					);
// 				}))}
// 			</TabContents>
// 			<TabContents id="MorePayments" group="payment_page" tabid="MorePaymentsBtn">
// 				<Panel id="PaymentSearch" className="SearchBox">
// 					<TextEntry placeholder="#DOTA_Search" ontextentrychange={p => setSearchText(p.text)} oninputsubmit={p => setSearchText(p.text)} />
// 					<Image />
// 				</Panel>
// 				<Panel id="MorePaymentsList">
// 					<For each={otherPayment}>
// 						{id => {
// 							let data = CustomUIConfig.payments[id];
// 							const names = (data.names ?? "").split("|");
// 							const visible = () => {
// 								let reg = rText();
// 								return names.some(n => reg.test(n));
// 							};

// 							return <PaymentCard pid={id} visible={visible()} />;
// 						}}
// 					</For>
// 				</Panel>
// 			</TabContents>
// 			<Panel id="SwitchRoot" hittest={false}>
// 				<TabButton id="DefaultPaymentsBtn" class="SwitchButton" selected group="payment_page" text="#Popup_StoreMoneyPayment_Common" />
// 				<TabButton id="MorePaymentsBtn" class="SwitchButton" group="payment_page" text="#Popup_StoreMoneyPayment_More" />
// 			</Panel>
// 		</BasePopup>
// 	);
// };

// interface Popup_PaymentOversea_Props extends PopupProps {
// 	request_params: ServerRequestEventDeclarations["order_create"]["params"];
// 	onPayed: () => void;
// }

// export function Popup_PaymentOversea(props: Popup_PaymentOversea_Props) {
// 	const [state, setState] = createSignal(-1); // -1 请求链接 0已有链接 1支付成功 2 创建订单失败
// 	const [failCode, SetFailCode] = createSignal(-1);
// 	const [ordersData, SetOrdersData] = createSignal<{
// 		orderID: string;
// 		link: string;
// 	}>();

// 	onMount(() => {
// 		const id = ServerRequest("order_create", props.request_params, (data) => {
// 			const paymentOrder = getPaymentOrder(data as OrderCreateResponse);
// 			if (paymentOrder?.order_id && paymentOrder.order_link) {
// 				setState(0);
// 				SetOrdersData({
// 					orderID: paymentOrder.order_id,
// 					link: paymentOrder.order_link,
// 				});
// 				if (props.request_params.pay_type == "1000" || props.request_params.pay_type == "2000") {
// 				} else {
// 					/** 海外支付，除了支付宝微信，其他通过打开网页实现 */
// 					$.DispatchEvent("ExternalBrowserGoToURL", paymentOrder.order_link);
// 				}
// 			} else {
// 				setState(2);
// 				SetFailCode(data?.status ?? -1);
// 			}
// 		});
// 		onCleanup(() => CancelRequest(id));
// 	});

// 	useGameEvent("payment_success", data => {
// 		if (ordersData()?.orderID == data.order_id) {
// 			props.onPayed();
// 			setState(1);
// 		}
// 	});

// 	onCleanup(() => {
// 		if (state() == 1) {
// 			let data = ordersData();
// 			if (data) {
// 				ShowIfPayed([data.orderID]);
// 			}
// 		}
// 	});

// 	return (
// 		<BasePopup class="Popup_PaymentOversea" PopupID={props.PopupID} group={props.group} size="small">
// 			<Switch>
// 				<Match when={state() == -1}>
// 					<EOM_Loading />
// 				</Match>
// 				<Match when={state() == 0}>
// 					<Show when={ordersData() != undefined}>
// 						<Switch fallback={(
// 							<Panel id="BrowserTipRoot" hittest={false}>
// 								<Label id="BrowserTip" text="#Popup_StoreMoneyPayment_WebPageOpened" />
// 								<Label id="BrowserUrl" text="#Popup_StoreMoneyPayment_WebPageClipCopy"
// 									onactivate={() => {
// 										$.DispatchEvent("CopyStringToClipboard", ordersData()!.link, null);
// 									}}
// 								/>
// 							</Panel>
// 						)}>
// 							<Match when={props.request_params.pay_type == "1000" || props.request_params.pay_type == "2000"}>
// 								<EOM_QRCode value={ordersData()!.link} className="QrCode" qrcodesize={200} imageSrc={`file://{images}/custom_game/payments/qrcode/${props.request_params.pay_id}.png`} />
// 							</Match>
// 						</Switch>
// 					</Show>
// 				</Match>
// 				<Match when={state() == 1}>
// 					<Panel id="PaymentSuccess">
// 						<Image src="file://{images}/custom_game/icons/tick.png" />
// 						<Label text="#Popup_StoreMoneyPayment_Success" />
// 					</Panel>
// 				</Match>
// 				<Match when={state() == 2}>
// 					<Panel id="PaymentFail">
// 						<Image src="file://{images}/custom_game/icons/exclamation_mark.png" />
// 						<Label text="#Popup_StoreMoneyPayment_OrderFailCode" dialogVariables={{ error_code: failCode() }} />
// 					</Panel>
// 				</Match>
// 			</Switch>
// 		</BasePopup>
// 	);
// }
