import classNames from "classnames";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { EOM_BaseButton, EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { CurrencyIcon } from "../../../components/Player/Player";
import { RecycleView, RecycleViewHandle } from "../../../components/RecycleView/RecycleView";
import { StoreItemBlock } from "../../../components/StoreItem/StoreItem";
import { createPlayerNetDataSignal, createServiceNetData } from "../../../utils/solid_utils";
import "./store_privilege.less";

export const StorePrivilege = (props: { datas: (typeof KeyValues.info_shop_product)[keyof typeof KeyValues.info_shop_product][]; targetItem?: { itemid: number, key: number; }; }) => {
	const language = Language();
	const purchased_product = createServiceNetData("player_shop_product_limits", {});
	const player_ornament = createServiceNetData("player_ornament", {});
	const player_privileges = createPlayerNetDataSignal("common", "player_privileges", {});
	let listHandle: RecycleViewHandle | undefined;
	const [scrollPercent, setScrollPercent] = createSignal(0);
	const sortedDatas = createMemo(() => {
		const purchases = purchased_product();
		const privileges = player_privileges();
		return [...props.datas].sort((a, b) => {
			const aLimited = a.limit_type > 0 && (purchases[a.id] ?? 0) >= a.limit_count;
			const bLimited = b.limit_type > 0 && (purchases[b.id] ?? 0) >= b.limit_count;
			if (aLimited !== bLimited) return aLimited ? 1 : -1;
			const aHasBuff = HasStoreProductPrivileges(a, privileges) && (a.tag == "Privilege" || a.show_type == 1);
			const bHasBuff = HasStoreProductPrivileges(b, privileges) && (b.tag == "Privilege" || b.show_type == 1);
			if (aHasBuff !== bHasBuff) return aHasBuff ? 1 : -1;
			return a.orderby - b.orderby;
		});
	});
	const sortedDataIndexMap = createMemo(() => {
		const result: Record<number, number> = {};
		sortedDatas().forEach((data, index) => {
			result[data.id] = index;
		});
		return result;
	});
	const scrollToTargetItem = () => {
		const itemid = props.targetItem?.itemid;
		if (!itemid) {
			return;
		}
		const index = sortedDataIndexMap()[itemid];
		if (index == undefined) {
			return;
		}
		listHandle?.scroll2Child(index, "center");
	};
	createEffect(() => {
		const targetKey = props.targetItem?.key;
		if (targetKey == undefined) {
			return;
		}
		sortedDatas();
		$.Schedule(0.2, scrollToTargetItem);
	});
	return <Panel id="StorePrivilege" >
		<RecycleView id="Content"
			direction="Horizontal"
			input={sortedDatas}
			childConfig={{ width: 538, height: 882 }}
			showBar={false}
			onScrollPercent={setScrollPercent}
			handle={h => listHandle = h}
			onload={() => {
				$.Schedule(0.2, () => {
					scrollToTargetItem();
				});
			}}
		>
			{(itemData) => {
				let purchased_num = createMemo(() => {
					let data = itemData();
					let purchased_num = purchased_product()[data.id] ?? 0;
					return purchased_num;
				});
				const itemList = createMemo(() => Object.keys(itemData().items ?? {}));
				const memoData = createMemo(() => {
					let data = itemData();
					let price = data.real_price;
					let origin_price = data.origin_price;
					if (data.pay_type == 0) {
						if (language == "english") {
							price = data.overseas_realprice;
							origin_price = data.overseas_originprice;
						} else if (language == "russian") {
							price = data.russia_realprice;
							origin_price = data.russia_originprice;
						}
					}

					let limited = data.limit_type > 0 && purchased_num() >= data.limit_count;
					let hasCosmetic = itemList().some(item_id => player_ornament()[item_id] != undefined);
					return { price, origin_price, limited, hasCosmetic };
				});
				let refDescContainer: Panel | undefined;
				let refDescLabel: LabelPanel | undefined;
				const [canScrollDesc, setCanScrollDesc] = createSignal(false);
				const [descAtBottom, setDescAtBottom] = createSignal(false);
				const getDescScrollRange = () => {
					if (!refDescContainer?.IsValid() || !refDescLabel?.IsValid()) {
						return;
					}
					const scale = refDescContainer.actualuiscale_y || 1;
					return {
						minY: Math.min(0, (refDescContainer.actuallayoutheight - refDescLabel.actuallayoutheight) / scale),
						currentY: parseFloat(refDescLabel.style.y!) || 0,
					};
				};
				const updateDescScrollState = () => {
					const range = getDescScrollRange();
					if (!range) {
						return;
					}
					const scrollable = range.minY < 0;
					const currentY = scrollable ? Clamp(range.currentY, range.minY, 0) : 0;
					refDescLabel!.style.y = `${currentY}px`;
					setCanScrollDesc(scrollable);
					setDescAtBottom(scrollable && currentY <= range.minY + 0.5);
				};
				const scrollDescDown = () => {
					const range = getDescScrollRange();
					if (!range || range.minY >= 0) {
						return;
					}
					const nextY = Clamp(range.currentY - 80, range.minY, 0);
					refDescLabel!.style.y = `${nextY}px`;
					setDescAtBottom(nextY <= range.minY + 0.5);
				};
				createEffect(() => {
					itemData().id;
					$.Schedule(0, () => {
						if (refDescLabel?.IsValid()) {
							refDescLabel.style.y = "0px";
							updateDescScrollState();
						}
					});
				});
				const animationDelay = createMemo(() => {
					const index = sortedDataIndexMap()[itemData().id];
					return Math.max(index, 0) * 0.03;
				});
				return <Panel class={classNames("PrivilegeItem " + itemData().id)}
					animationDelay={"0s," + animationDelay() + "s"}
					animationDuration={animationDelay() + "s, 0.4s"}
				>
					<Panel id="Light" />
					<Panel id="BG" />
					<Label id="Title" text={"#" + itemData().id} />
					<Panel class="Line" />
					<Panel id="PrivilegeDescContainer"
						ref={refDescContainer}
						draggable={canScrollDesc()}
						onload={() => $.Schedule(0, updateDescScrollState)}
						onDragStart={(panel, callback) => {
							let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "");
							callback.displayPanel = pDisplayPanel;
							let position = GameUI.GetCursorPosition();
							if (callback.offsetX == undefined || callback.offsetY == undefined) {
								callback.offsetX = pDisplayPanel.GetPositionWithinWindow().x - position[0];
								callback.offsetY = pDisplayPanel.GetPositionWithinWindow().y - position[1];
							}

							let descLabel = refDescLabel!;
							let lastPos = GameUI.GetCursorPosition();
							let currentY = parseFloat(descLabel.style.y!) || 0;

							function Tick() {
								if (!descLabel?.IsValid()) return;
								let newPos = GameUI.GetCursorPosition();
								let deltaY = newPos[1] - lastPos[1];

								if (deltaY != 0) {
									currentY += deltaY / (panel.actualuiscale_y || 1);
									let minY = Math.min(0, (panel.actuallayoutheight - descLabel.actuallayoutheight) / (panel.actualuiscale_y || 1));
									currentY = Clamp(currentY, minY, 0);
									descLabel.style.y = `${currentY}px`;
									setDescAtBottom(currentY <= minY + 0.5);

									lastPos = newPos;
								}
								SaveData(pDisplayPanel, "dragThink", $.Schedule(0, Tick));
							}
							Tick();
						}}
						onDragEnd={(panel, draggedPanel) => {
							try {
								$.CancelScheduled(LoadData(draggedPanel, "dragThink"));
							} catch (error) { }
							draggedPanel.DeleteAsync(0);
						}}
					>
						<Label ref={refDescLabel} id="PrivilegeDesc" text={GetLocalization(`#${itemData().id}_description`)} html />
					</Panel>
					<EOM_BaseButton
						class={classNames("DownArrow", { Show: canScrollDesc() })}
						enabled={!descAtBottom()}
						onactivate={scrollDescDown}
					/>
					<Panel id="Valid">
						<Label id="ValidTips" text={"#Store_Lifespan"} />
						<Label id="ValidLabel" text={`#${itemData().id}_valid`} />
					</Panel>
					<Panel class="Line BottomLine" />
					<Label id="RewardTitle" text={"#Store_Claimed"} />
					<Panel id="RewardList">
						<For each={itemList()}>
							{itemID => {
								const amounts = itemData().items?.[itemID];
								return <StoreItemBlock item_id={itemID} amounts={amounts} />;
							}}
						</For>
					</Panel>
					<EOM_Button id="BuyBtn"
						color="Confirm"
						class={classNames({ HasBuff: memoData().limited })}
						enabled={!memoData().limited}
						onactivate={() => {
							let { limited } = memoData();
							if (limited) {
								return;
							}
							if (memoData().hasCosmetic) {
								return "#Store_HasCosmetic";
							}
							Game.EmitSound("UI.Store.Click");
							ShowPopup("StoreBuyItem", { itemData: itemData(), purchased_num: purchased_num(), group: "StoreBuyItem" });
						}}>
						<Show when={!memoData().limited} fallback={<Label id="StatLabel" text={"#Store_Activated"} />}>
							<Panel id="PriceDisplay" align="center center" flowChildren="right">
								<Panel id="CurrentPrice" horizontalAlign="center" flowChildren="right">
									<CurrencyIcon tokenID={itemData().pay_type} />
									<Label id="CostLabel" text={memoData().price} />
								</Panel>
								<Label id="CostOriginPriceLabel" visible={memoData().price != memoData().origin_price} text={memoData().origin_price} />
							</Panel>
						</Show>
					</EOM_Button>
				</Panel>;
			}}
		</RecycleView>
		<EOM_BaseButton id="LeftArrow" enabled={scrollPercent() != 0} onactivate={() => {
			listHandle?.scroll(-toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
		}} />
		<EOM_BaseButton id="RightArrow" enabled={scrollPercent() != 1} onactivate={() => {
			listHandle?.scroll(toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
		}} />
	</Panel>;
};
