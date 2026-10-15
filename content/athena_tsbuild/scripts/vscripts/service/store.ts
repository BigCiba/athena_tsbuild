import { reloadable } from "../lib/tstl-utils";

type OrderData = {
	/** 订单号 */
	order: string,
	/** 商品id */
	pid: number,
	/** 数量 */
	amount: number,
	/** 玩家ID */
	playerID: PlayerID,
	/** 本次查询时间 */
	time: number,
	/** 查询次数 */
	count: number,
	/** 失效标记，用来清理列表 */
	enable: boolean,
	/** 用来标记查询中状态 */
	querying: boolean,
	/** 加速查询间隔 */
	query_fast: boolean,
	/** 唯一标识 */
	unique: string,
};

interface PaymentOrder {
	order_id?: string,
}

interface CreateOrderData {
	order_id: string,
	order_link: string,
}

/** 商城 */
@reloadable
class CStore extends CModule {
	/** 订单列表 */
	private orderList: OrderData[] = [];
	/** 获得付款网页后延迟多久再查询订单 */
	private orderStartTimeDelay: number = 10;
	/** 查询几次 */
	private orderQueryMaxTime: number = IsInToolsMode() ? 30 : 120;
	/** 两次查询之间的间隔 */
	private orderQueryInterval: number = 10;
	/** 两次查询之间的快速间隔 */
	private orderQueryFastInterval: number = 5;
	/** 两次查询之间的超时间隔 */
	private orderQueryTimeoutInterval: number = 30;
	/** 预创建订单列表（用于玩家确认支付前的追踪） */
	private orderPreCreateList: string[] = [];

	private orderTimerHandler?: string;

	init(bReload: boolean) {
		if (!bReload) {
			this.startPollingOrders();
		}

		/** 创建订单，真金白银付费 */
		RequestEvent("order_create", (event) => {
			if (!this.orderPreCreateList.includes(event.unique)) {
				this.orderPreCreateList.push(event.unique);
			}
			let response = CommonService.CallActionSync("/v1/shop/create_order", event.PlayerID, {
				title: event.title,
				body: event.body,
				amounts: event.product_num,
				product_id: event.product_id,
				pay_type: event.pay_type,
				pmid: event.p_mid,
				country: event.country,
			}, { commonCallback: false });
			let status = -1;
			let data: CreateOrderData | undefined;
			print("order_create", json.encode(response));
			if (response.code == 0 || response.code == 200) {
				status = response.code ?? -1;
				if (response.data != undefined) {
					const paymentOrder = response.data.payment_order ?? response.data.player_orders?.[0];
					if (!paymentOrder?.order_id) {
						print("order_create missing order_id", json.encode(data));
						return {
							status: status,
							msg: "",
							data: data as any,
						};
					}
					data = paymentOrder;
					let index = this.orderPreCreateList.indexOf(event.unique);
					if (index != -1) {
						this.orderPreCreateList.splice(index, 1);
						this.orderList.push({
							order: paymentOrder.order_id,
							pid: event.product_id,
							amount: event.product_num,
							playerID: event.PlayerID,
							time: Time(),
							count: 0,
							enable: true,
							querying: false,
							query_fast: event.fast == 1,
							unique: event.unique,
						});
					}
				}
			}
			return {
				status: status,
				msg: "",
				data: data ?? {},
			};
		}, this);
		/** 货币购买 */
		RequestEvent("product_buy", (event) => {
			DeepPrintTable(event);
			let response = CommonService.CallActionSync("/v1/shop/buy", event.PlayerID, {
				amounts: event.amounts,
				product_id: event.product_id,
			}, { ignoreInvalidResponse: false, commonCallback: false });
			DeepPrintTable(response);
			let status = -1;
			let data: any = {};
			if (response.code == 0 || response.code == 200) {
				status = response.code ?? -1;
				data = response.data;
				CommonService.CommonCallback(event.PlayerID, response);
			}
			return {
				status: status,
				msg: response.message,
				data: data,
			};
		}, this);

		// CustomUIEvent("payment_on_close_popup", function (...args) { return this.OnPopupClose(...args); }, this);
		/** 玩家确认支付选择（c4 移植） */
		CustomUIEvent("order_pay_choice", (event) => {
			let unique = event.unique;
			let state = event.state;
			let index = this.orderPreCreateList.indexOf(event.unique);
			if (index != -1) {
				this.orderPreCreateList.splice(index, 1);
			}
			let data = this.orderList.find(order => order.unique == unique);
			if (data != undefined) {
				if (state == 1) {
					data.query_fast = true;
				} else {
					data.query_fast = false;
				}
			}
		}, this);
		/** 历史支付方式记录 */
		CustomUIEvent("order_payway_history", (event) => {
			let playerID = event.PlayerID;
			let key = event.key;
			// 记录教学模式结束
			CommonService.SetPlayerServiceNetData(playerID, "player_key_values", { ["order_payway_history"]: { type: "settings", key: "order_payway_history", value: key } });
			Service.SetPlayerSetting(playerID, "order_payway_history", key);
		}, this);
	}

	// OnPopupClose(event: UIEventProperties<"payment_on_close_popup">) {
	// 	if (event.status == 0) {
	// 		for (const [_, id] of pairs(event.order_ids)) {
	// 			let data = this.orderList.find(v => v.order == id);
	// 			if (data) {
	// 				data.gray = true;
	// 			}
	// 		}
	// 	} else {
	// 		// 玩家说自己支付了，加快下次支付轮询
	// 		let now = Time();
	// 		for (const [_, id] of pairs(event.order_ids)) {
	// 			let data = this.orderList.find(v => v.order == id);
	// 			if (data) {
	// 				if (data.nextTime > now) {
	// 					data.nextTime = now;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	/** 开始轮询订单支付 */
	startPollingOrders() {
		Timer.Timer(1, () => {
			try {
				for (const i of $range(this.orderList.length, 1, -1)) {
					if (this.orderList[i - 1].enable == false) {
						table.remove(this.orderList, i);
					}
				}
				let TimeNow = Time();
				for (const [i, orderData] of ipairs(this.orderList)) {
					if (orderData.query_fast) {
						if (TimeNow >= orderData.time + this.orderQueryFastInterval) {
							this.QueryOrder(orderData);
						}
					} else {
						if (orderData.querying) {
							if (TimeNow >= orderData.time + this.orderQueryTimeoutInterval) {
								this.QueryOrder(orderData);
							}
						} else {
							if (TimeNow >= orderData.time + this.orderQueryInterval) {
								this.QueryOrder(orderData);
							}
						}
					}
				}
			} catch (error) {

			}
			return 1;
		});
	}

	/** 查询订单（c4 移植） */
	QueryOrder(orderData: OrderData) {
		if (orderData.count < this.orderQueryMaxTime) {
			orderData.count++;
			orderData.querying = true;
			// 查询订单
			CommonService.CallAction("/v1/shop/query_order", orderData.playerID, { order_id: orderData.order }, (playerID, response, url) => {
				orderData.querying = false;
				DeepPrintTable(response);
				if (response.code == 0 || response.code == 200) {
					orderData.enable = false;
					const player = PlayerResource.GetPlayer(orderData.playerID)!;
					// 发送 c4 风格的 order_payed 事件
					CustomGameEventManager.Send_ServerToPlayer(player, "order_payed", {
						state: 1,
						p_id: orderData.pid,
						count: orderData.amount,
						unique: orderData.unique,
					});
					// // 也发送旧版 payment_success 事件（保持向后兼容）
					// CustomGameEventManager.Send_ServerToPlayer(player, "payment_success", { order_id: orderData.order });
					CommonService.CommonCallback(orderData.playerID, response);
				}
			}, false);
			orderData.time = Time();
			// // 根据 gray 标记调整下次查询间隔
			// if (orderData.gray) {
			// 	orderData.nextTime = Time() + 2 * this.orderQueryInterval;
			// } else {
			// 	orderData.nextTime = Time();
			// }
		} else {
			orderData.enable = false;
			const player = PlayerResource.GetPlayer(orderData.playerID)!;
			CustomGameEventManager.Send_ServerToPlayer(player, "order_payed", {
				state: 0,
				p_id: orderData.pid,
				count: orderData.amount,
				unique: orderData.unique,
			});
		}
	}

	/** 重构限购数据 */
	parsePurchasedProducts(data: any) {
		if (!data)
			return;

		let reconstruct: { purchased_products: { [sid: number]: number; }; } = { purchased_products: {} };
		for (const [k, v] of pairs(data.purchased_products)) {
			reconstruct.purchased_products[v.id] = v.purchased_num;
		}
		return reconstruct;
	}
}
declare global {
	/**
	 * @ServerOnly
	 */
	var Store: CStore;
}
Store ??= new CStore();
