import { batch, createEffect, createSignal, For, Match, onCleanup, onMount, ParentComponent, Show, splitProps, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_Loading } from "../../../components/EOMDesign/DataDisplay/EOM_Loading/EOM_Loading";
import { EOM_QRCode } from "../../../components/EOMDesign/DataDisplay/EOM_QRCode/EOM_QRCode";
import { EOM_BaseButton, EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_DropDown } from "../../../components/EOMDesign/Input/EOM_DropDown/EOM_DropDown";
import { EOM_SearchBox } from "../../../components/EOMDesign/Input/EOM_SearchBox/EOM_SearchBox";
import { BasePopup, PopupProps } from "../base_popup";
import "./payment_order.less";

type PaymentOrder = {
	product_id: number,
	count: number,
	pay_way: string,
	unique: string,
	fast?: boolean,
};
GameEvents.Subscribe("order_payed", (event) => {
	if (event.state == 1) {
		CustomUIConfig.showPopup("PaymentSuccess", {
			product_id: event.p_id,
			count: event.count,
		});
	}
});
interface OrderCreateResponse {
	status?: number;
	data?: {
		payment_order?: PaymentOrder;
		player_orders?: PaymentOrder[];
	};
}

function getPaymentOrder(response?: OrderCreateResponse) {
	const data = response?.data;
	return data?.payment_order ?? data?.player_orders?.[0];
}

function RequestPaymentOrder(data: PaymentOrder, callback: (success: boolean, msg?: string) => void): string {
	let request: ServerRequestEventDeclarations["order_create"]["params"] = {
		title: GetLocalization("#" + data.product_id),
		body: GetLocalization("#" + data.product_id + "_description"),
		product_id: data.product_id,
		product_num: data.count,
		country: CustomUIConfig.__LocalISOCode ?? "",
		unique: data.unique,
		fast: data.fast ? 1 : 0,
	};
	let pay_type = finiteNumber(Number(data.pay_way), -1);
	if (pay_type == -1) {
		pay_type = KeyValues.payments_order[data.pay_way]?.pid ?? -1;
	}
	if (pay_type == -1) {
		return "";
	}
	request.pay_type = pay_type as PaymentType;
	return ServerRequest("order_create", request, (data) => {
		if (data.status == 0) {
			callback(true, data.data.order_link);
		} else {
			callback(false, "Error: 404");
		}
	});
}

function recordPaymentHistory(payWay: string) {
	// 记录历史支付方式
	let max = 3;
	let historyList: string[] = [];
	const config = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["order_payway_history"];

	if (config != undefined) {
		historyList = (config.value).split(",");
	}
	let sameRecord: Record<string, boolean> = {};
	historyList.unshift(payWay);
	historyList = historyList.filter((item) => {
		if (sameRecord[item]) {
			return false;
		}
		sameRecord[item] = true;
		return true;
	});
	if (historyList.length > max) {
		historyList = historyList.slice(0, max);
	}
	GameEvents.SendCustomEventToServer("order_payway_history", {
		key: historyList.join(","),
	});
	return historyList;
}

function getPaymentHistory(): string[] {
	const config = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["order_payway_history"];
	if (config != undefined) {
		// @ts-ignore
		return ((config?.value ?? "") as string).split(",").filter((item: string) => KeyValues.payments_order[item] != undefined).slice(0, 3);
	}
	return [];
}
interface Popup_PaymentOrder_Prop extends PopupProps {
	/** 物品属性 */
	itemData: StoreItemData;
	/** 物品数量 */
	count: number;
}

// const language = "english" as string;
const language = Language();

export const Popup_PaymentOrder: ParentComponent<Popup_PaymentOrder_Prop> = (props) => {
	const [local, others] = splitProps(props, ["itemData", "PopupID", "group", "count"]);
	const { itemData, count, group, PopupID } = local;
	const [tab, setTab] = createSignal(0); // 0: default, 1: others
	const [filteredRegionIndex, setFilteredRegionIndex] = createSignal(-1);
	const [searchText, setSearchText] = createSignal("");
	const ChineseDefaultPayWay = ["Alipay", "WeChat_Pay"];
	const [qrinfo, setQrinfo] = createStore<Record<string, string>>({});
	const [payStateConfirm, setPayStateConfirm] = createSignal(false);
	const mainPaymentList: string[] = [];
	let otherDefaultList: string[] = [];
	let paymentsRegions: string[] = [];
	let payPopupUnique: string = "";
	function createNewPopupUnique() {
		if (payPopupUnique != "") {
			payUniqueList = payUniqueList.filter(v => v != payPopupUnique);
		}
		payPopupUnique = DoUniqueString(Players.GetLocalPlayer().toString() + "_");
	}
	let payUniqueList: string[] = [];
	createNewPopupUnique();
	const [historyPaymentList, setHistoryPaymentList] = createSignal<string[]>(getPaymentHistory());
	function PaymentWaySort(list: string[], all: boolean = false) {
		return list.sort((a, b) => multiCompare(
			all ?
				((KeyValues.payments_order[b].region == "") ? 1 : 0) - ((KeyValues.payments_order[a].region == "") ? 1 : 0)
				:
				((KeyValues.payments_order[a].region == "") ? 1 : 0) - ((KeyValues.payments_order[b].region == "") ? 1 : 0)
			,
			finiteNumber(KeyValues.payments_order[b].order, 0) - finiteNumber(KeyValues.payments_order[a].order, 0),
			a < b ? -1 : a > b ? 1 : 0
		));
	}
	{
		const BLACK_LIST: Record<string, { main: string[]; others: string[]; }> = {
			["russian"]: {
				main: [
					"VISA_MasterCard__Global",
					"PayPal_Global",
					"YooMoney_RU",
					"SBP_RU",
				],
				others: []
			},
			["english"]: {
				main: [],
				others: ["YooMoney_RU",]
			},
		};
		Object.keys(KeyValues.payments_order).forEach((key) => {
			if (KeyValues.payments_order[key].state != 1) {
				return;
			}
			let region = KeyValues.payments_order[key].region ?? "";
			if (region != "" && !paymentsRegions.includes(region)) {
				paymentsRegions.push(region);
			}
			let flag = false;
			if (language == "schinese") {
				flag = region == "CN";
			} else if (language == "russian") {
				flag = region == "RU" || region == "";
			} else {
				flag = region == "";
			}
			if (flag) {
				if (!BLACK_LIST[language]?.main?.includes(key)) {
					mainPaymentList.push(key);
				}
			}
			if (!BLACK_LIST[language]?.others?.includes(key)) {
				otherDefaultList.push(key);
			}
		});
		otherDefaultList = PaymentWaySort(otherDefaultList, true);
		paymentsRegions = paymentsRegions.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
		paymentsRegions.push("Global");
	}
	const [filteredPaymentList, setFilteredPaymentList] = createSignal<string[]>([]);
	createEffect(() => {
		let filteredRegion = "";
		let otherList = otherDefaultList.concat([]);
		if (filteredRegionIndex() >= 0) {
			filteredRegion = paymentsRegions[filteredRegionIndex()];
			otherList = otherList.filter(v => (KeyValues.payments_order[v].region == filteredRegion || KeyValues.payments_order[v].region == "" || KeyValues.payments_order[v].region == undefined));
		}

		if (searchText() != "") {
			let filteredList: string[] = [];
			let entries = searchText().toLowerCase().split(" ").filter(s => s != "");
			otherList.filter(key => {
				let localize = GetLocalization("#PaymentWay_" + key).toLowerCase();
				if (entries.some(v => localize.includes(v) || (key).toLowerCase().includes(v))) {
					filteredList.push(key);
				}
			});
			setFilteredPaymentList(PaymentWaySort(filteredList, filteredRegionIndex() == -1));
		} else {
			setFilteredPaymentList(PaymentWaySort(otherList, filteredRegionIndex() == -1));
		}
	});
	if (language == "schinese") {
		onMount(() => {
			let requestIDList: string[] = [];
			ChineseDefaultPayWay.forEach(payWay => {
				let unique = DoUniqueString(Players.GetLocalPlayer().toString() + "_");
				payUniqueList.push(unique);
				requestIDList.push(RequestPaymentOrder({
					product_id: itemData.id,
					count: count,
					pay_way: payWay,
					unique: unique,
					fast: true,
				}, (success, msg) => {
					if (success && msg) {
						setQrinfo(payWay, msg);
					}
				}));
			});
			onCleanup(() => {
				requestIDList.forEach(id => CancelRequest(id));
			});
		});
	}
	onMount(() => {
		let id = GameEvents.Subscribe("order_payed", (event) => {
			if (payUniqueList.includes(event.unique)) {
				if (event.state == 1) {
					ClosePopup(PopupID);
				} else {
					setPayStateConfirm(false);
				}
			}
		});
		onCleanup(() => {
			GameEvents.Unsubscribe(id);
		});
	});
	function showOrderCreaterPopup(way: string) {
		setHistoryPaymentList(recordPaymentHistory(way));
		CustomUIConfig.showPopup("PaymentOrderCreater", {
			product_id: itemData.id,
			count: count,
			pay_way: way,
			unique: payPopupUnique,
		});
		payUniqueList.push(payPopupUnique);
		setPayStateConfirm(true);
	}
	onCleanup(() => {
		payUniqueList.forEach((unique) => {
			GameEvents.SendCustomEventToServer("order_pay_choice", {
				unique: unique,
				state: 0
			});
		});
	});
	let payment_currency = () => {
		let dollarMark = "￥";
		if (language == "english") {
			dollarMark = "$";
		} else if (language == "russian") {
			dollarMark = "₽";
		}
		return dollarMark;
	};
	return (
		<BasePopup
			PopupID={PopupID}
			group={group}
			class="Popup_PaymentOrder"
			title="#Popup_StoreMoneyPayment_Title"
			closeOnClickOuter={false}
			closeOnEsc={false}
		>
			<Show when={!payStateConfirm()} fallback={
				<>
					<Panel align="center center" id="PaymentOrderMain" class={language} >
						<Label horizontalAlign="center" marginTop="175px" text="#PaymentOrder_isPaid" />
					</Panel>
					<Panel id="PaymentOrderBottom">
						<EOM_Button align="center center" marginLeft="300px" color="Confirm" text="#PaymentOrder_Payed" onactivate={() => {
							setPayStateConfirm(false);
							GameEvents.SendCustomEventToServer("order_pay_choice", {
								unique: payPopupUnique,
								state: 1
							});
							createNewPopupUnique();
						}} />
						<EOM_Button align="center center" marginRight="300px" color="Cancel" text="#PaymentOrder_NotPayed" onactivate={() => {
							setPayStateConfirm(false);
							GameEvents.SendCustomEventToServer("order_pay_choice", {
								unique: payPopupUnique,
								state: 0
							});
							createNewPopupUnique();
						}} />
					</Panel>
				</>
			} >
				<Panel id="PaymentOrderTitle">
					<Panel id="PaymentOrderInfo">
						<Label class="PaymentTitleLabel" text={GetLocalization("#StoreItemName") + ":"} />
						<Label width="150px" textOverflow={"shrink"} marginRight="20px" text={"#" + props.itemData.id} />
						<Label class="PaymentTitleLabel" text={GetLocalization("#PaymentAmount") + ":"} />
						<Label color="#FFD05F" fontSize="24px" text={GetStoreItemCost(itemData, count) + payment_currency()} />
					</Panel>
					<Panel id="PaymentOrderSearcher" visible={tab() == 1} >
						<EOM_DropDown
							id="RegionFilterDropDown"
							placeholder="#PaymentRegion_Choice"
							hasClear
							onChange={(index, item) => {
								setFilteredRegionIndex(index);
							}}
							onClear={() => {
								setFilteredRegionIndex(-1);
							}}
						>
							{paymentsRegions.map(region =>
								<Label text={`#PaymentRegion_${region}`} />
							)}
						</EOM_DropDown>
						{/* pTextEntry.SetAcceptsFocus(false) */}
						<EOM_SearchBox
							onSearch={(text) => {
								setSearchText(text);
							}} />
					</Panel>
				</Panel>
				<Panel id="PaymentOrderMain" class={language} >
					<Switch>
						<Match when={tab() == 1}>
							<Panel className="PaymentsTypeList" height="100%">
								<For each={filteredPaymentList()}>
									{(payWay) => {
										return (
											<Panel className="Paytype" onactivate={() => showOrderCreaterPopup(payWay)}>
												<Image src={`file://{images}/custom_game/payment/payermax_icon/${payWay}.png`} />
											</Panel>
										);
									}}
								</For>
							</Panel>
						</Match>
						<Match when={tab() == 0}>
							<Show when={language != "schinese"} fallback={
								<Panel align="center center" flowChildren="right">
									{
										ChineseDefaultPayWay.map((payType) => {
											return (
												<Panel width="250px" height="250px" margin="0 40px">
													<Show when={qrinfo[payType] != undefined} fallback={
														<EOM_Loading align="center center" type="Wave" />
													}>
														<EOM_QRCode align="center center" value={qrinfo[payType]} qrcodesize={200} imageSrc={`file://{images}/custom_game/payment/${payType}_logo.png`} />
													</Show>
												</Panel>
											);
										})
									}
								</Panel>
							} >
								<Show when={historyPaymentList().length > 0}>
									<Panel width="100%" flowChildren="right">
										<Label class="PaymentTitleLabel" marginTop="40px" text={"#PaymentWayLast"} />
										<Panel className="PaymentsTypeList NoBorder">
											<For each={historyPaymentList()}>
												{(payWay) =>
													<Panel className="Paytype" onactivate={() => showOrderCreaterPopup(payWay)}>
														<Image src={`file://{images}/custom_game/payment/payermax_icon/${payWay}.png`} />
													</Panel>
												}
											</For>
										</Panel>
									</Panel>
								</Show>
								<Panel width="100%" marginTop="50px" flowChildren="right">
									<Label class="PaymentTitleLabel" marginTop="40px" text={"#PaymentWayUsual"} />
									<Panel className="PaymentsTypeList NoBorder">
										<For each={mainPaymentList}>
											{(payWay) =>
												<Panel className="Paytype" onactivate={() => showOrderCreaterPopup(payWay)}>
													<Image src={`file://{images}/custom_game/payment/payermax_icon/${payWay}.png`} />
												</Panel>
											}
										</For>
									</Panel>
								</Panel>
							</Show>
						</Match>
					</Switch>
				</Panel >
				<Panel id="PaymentOrderBottom">
					<Show when={tab()} fallback={
						<EOM_BaseButton class="PaymentOrderTabButton" onactivate={() => setTab(1)} >
							<Panel id="PaymentOrderTabButtonBG" />
							<Label text={"#PaymentMoreType"} />
						</EOM_BaseButton>
					}>
						<EOM_BaseButton class="PaymentOrderTabButton reverse" onactivate={() => setTab(0)}>
							<Panel id="PaymentOrderTabButtonBG" />
							<Label text={"#PaymentNormalType"} />
						</EOM_BaseButton>
					</Show>
				</Panel>
			</Show>
		</BasePopup >

	);
};

export const Popup_PaymentOrderCreater: ParentComponent<PaymentOrder & PopupProps> = (props) => {
	const [local, others] = splitProps(props, ["product_id", "PopupID", "group", "count", "unique", "pay_way"]);
	const { product_id, count, unique, pay_way, group, PopupID } = local;
	let isQRCode = KeyValues.payments_order[pay_way]?.QRCode == 1;
	const [state, setState] = createSignal(0);	// 0- 加载中, 1- 跳转中, 2- 二维码, 3- 支付成功, -1- 支付失败或取消
	const [msg, setMsg] = createSignal("");
	onMount(() => {
		let requestID = RequestPaymentOrder({
			product_id: product_id,
			count: count,
			pay_way: pay_way,
			unique: unique,
		}, (success, msg) => {
			batch(() => {
				if (success) {
					if (isQRCode) {
						setState(2);
					} else {
						if (msg) {
							$.DispatchEvent("ExternalBrowserGoToURL", msg);
						}
						setState(1);
					}
				} else {
					setState(-1);
				}
				setMsg(msg ?? "");
			});
		});
		let id = GameEvents.Subscribe("order_payed", (event) => {
			if (event.unique == unique) {
				ClosePopup(PopupID);
			}
		});
		onCleanup(() => {
			GameEvents.Unsubscribe(id);
		});
		onCleanup(() => {
			CancelRequest(requestID);
		});

	});
	return (
		<BasePopup
			PopupID={PopupID}
			group={group}
			class="Popup_PaymentOrderCreater"
			title="#Popup_StoreMoneyPayment_Title"
			closeOnClickOuter={false}
			closeOnEsc={false}
		>
			<Panel width="100%" height="450px" horizontalAlign="center" >
				<Panel align="center center" flowChildren="down">
					<Switch>
						<Match when={state() == 0}>
							<Label class="PopupMainLabel" text="#PaymentOrder_OrderCreating" />
							<EOM_Loading horizontalAlign="center" type="Wave" />
						</Match>
						<Match when={state() == 1}>
							<Label class="PopupMainLabel" text="#PaymentOrder_OrderCreated" />
							<Label class="PopupMainLabel" id="BrowserUrl" text="#PaymentOrder_OrderCreatedLink"
								onactivate={() => {
									$.DispatchEvent("CopyStringToClipboard", msg(), null);
								}}
							/>
						</Match>
						<Match when={state() == 2}>
							<EOM_QRCode align="center center" value={msg()} qrcodesize={200} imageSrc={`file://{images}/custom_game/payment/${pay_way}_logo.png`} />
						</Match>
						<Match when={state() == -1}>
							<Image class="PaymentOrderStateIcon Failure" />
							<Label class="PopupMainLabel" text="#PaymentOrder_Failure" dialogVariables={{ error: msg() }} />
						</Match>
					</Switch>
				</Panel>
			</Panel>
			<Panel align="center bottom" flowChildren="right" >
				<EOM_Button text="#Popup_Button_Cancel" onactivate={() => {
					ClosePopup(PopupID);
				}} />
			</Panel>
		</BasePopup>
	);
};
interface Popup_PaymentSuccess_Props extends PopupProps {
	product_id: number,
	count: number,
};
export const Popup_PaymentSuccess: ParentComponent<Popup_PaymentSuccess_Props> = (props) => {
	const [local, others] = splitProps(props, ["product_id", "PopupID", "group", "count"]);
	const { product_id, count, group, PopupID } = local;
	// c1 使用 KeyValues.info_shop_product 查找商品数据
	let itemData: StoreItemData | undefined = undefined;
	Object.values(KeyValues.info_shop_product ?? {}).forEach((item) => {
		if (itemData == undefined && item.id == product_id) {
			itemData = item;
		}
	});

	let cost = itemData != undefined ? GetStoreItemCost(itemData, count) : undefined;
	let payment_currency = () => {
		let dollarMark = "￥";
		if (language == "english") {
			dollarMark = "$";
		} else if (language == "russian") {
			dollarMark = "₽";
		}
		return dollarMark;
	};
	return (
		<BasePopup
			PopupID={PopupID}
			group={group}
			class="Popup_PaymentSuccess"
			title="#Popup_StoreMoneyPayment_Title"
			closeOnClickOuter={true}
			closeOnEsc={true}
			size="small"
		>
			<Panel width="100%" height="450px" horizontalAlign="center" >
				<Panel align="center center" flowChildren="down">
					<Panel horizontalAlign="center" flowChildren="right" marginBottom="50px">
						<Label class="PaymentTitleLabel" fontSize="24px" text={GetLocalization("#StoreItemName") + ":"} />
						<Label width="150px" fontSize="24px" color="#fff" textOverflow={"shrink"} marginRight="20px" text={"#" + product_id} />
						<Show when={cost != undefined}>
							<Label class="PaymentTitleLabel" fontSize="24px" text={GetLocalization("#PaymentAmount") + ":"} />
							<Label color="#FFD05F" fontSize="24px" text={cost + payment_currency()} />
						</Show>
					</Panel>
					<Image class="PaymentOrderStateIcon Success" />
					<Label marginTop="20px" horizontalAlign="center" text="#PaymentOrder_Success" />
				</Panel>
			</Panel>
			{/* <Panel align="center bottom" flowChildren="right" >
				<EOM_Button text="#Popup_Button_Confirm" onactivate={() => {
					ClosePopup(PopupID);
				}} />
			</Panel> */}
		</BasePopup>
	);
};
