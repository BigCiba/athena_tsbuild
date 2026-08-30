import { EOM_BaseButton, EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_MenuLayout_Content } from "../../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { StoreItemImage } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import classNames from "classnames";
import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import "./collectioin_vip.less";

type VipRewardState = "received" | "claimable" | "locked";

type VipReward = {
	reward_id?: number;
	level: number;
	levelCost: number;
	amount?: number;
	rarity: number;
	state: VipRewardState;
	hasReward: boolean;
};

type RewardProgressSegmentState = "completed" | "current" | "locked";

const REWARD_PROGRESS_SLICE_CLASSES = ["Slice0", "Slice1", "Slice2", "Slice3", "Slice4"] as const;

type CollectionTreasureLevelReward = {
	level: number;
	level_cost?: number;
	reward?: Record<string, number>;
};

function getRewardSegmentState(segmentLevel: number, currentLevel: number): RewardProgressSegmentState {
	if (segmentLevel < currentLevel) return "completed";
	if (segmentLevel === currentLevel) return "current";
	return "locked";
}

function getRewardSegmentProgress(segmentLevel: number, levelCost: number, currentLevel: number, currentLevelExp: number) {
	if (segmentLevel < currentLevel) return 100;
	if (segmentLevel > currentLevel || levelCost <= 0) return 0;
	return Math.max(0, Math.min(100, currentLevelExp / levelCost * 100));
}

function RewardProgressSegment(props: { progress: number; state: RewardProgressSegmentState; segmentIndex: number; }) {
	const sliceClass = REWARD_PROGRESS_SLICE_CLASSES[props.segmentIndex % REWARD_PROGRESS_SLICE_CLASSES.length];
	let progressValue = 0
	if (props.progress >= 100) {
		progressValue = 100;
	} else if (props.progress <= 0) {
		progressValue = 0;
	} else {
		progressValue = 13 + props.progress * 0.74;
	}

	return <Panel class={classNames("RewardProgressSegment", props.state, sliceClass)} hittest={false}>
		<Panel class="RewardProgressSegmentBG" />
		<Panel class="RewardProgressSegmentFill" style={{ clip: `rect( 0%, ${progressValue}%, 100%, 0% )` }} />
	</Panel>;
}

function CollectionCard(props: VipReward & {
	selected: boolean;
	segmentProgress?: number;
	segmentState?: RewardProgressSegmentState;
	segmentIndex?: number;
	panelRef?: (panel: Panel) => void;
	onactivate?: () => void;
}) {
	const stateClass = props.state === "received" ? "Received" : props.state === "claimable" ? "Claimable" : "Locked";

	return <Panel
		ref={props.panelRef}
		class={classNames("CollectionCard", `Rarity${props.rarity}`, stateClass, { Selected: props.selected, EmptyReward: !props.hasReward })}
		onactivate={props.onactivate}
	>
		<Panel class="CollectionCardRoot">
			{/* CardMain */}
			<Panel class="CollectionCardMain">
				{/* <Panel class="CollectionCardFxLayer">
					<DOTAParticleScenePanel class="CollectionCardFx" particleName={"particles/ui/game/ui_game_fx_chouka_pinzhi_jinse_zong.vpcf"} cameraOrigin="0 0 320" lookAt="0 0 0" fov={90} hittest={false} />
				</Panel> */}
				<Image class="CollectionCardBG" />
				<Panel class="CollectionCardFxLayerTop">
					<DOTAParticleScenePanel class="CollectionCardFx" particleName={"particles/ui/game/ui_game_tishi_fx.vpcf"} cameraOrigin="0 0 220" lookAt="0 0 0" fov={90} hittest={false} />
				</Panel>
				{/* <Image class="CollectionCardBorder" /> */}
				<Image class="CollectionCardSelectedBorder" />
				<Panel class="CollectionCardContent">
					<Show when={props.reward_id != undefined}>
						<Label class="CollectionCardName" text={`#${props.reward_id}`} />
						<Image class="CollectionCardDivider" />
						<StoreItemImage class="CollectionCardIcon" itemid={props.reward_id!} />
						<Label class="CollectionCardAmount" text={`x${props.amount}`} visible={(props.amount ?? 0) > 1} />
					</Show>
				</Panel>
				<Image class="CollectionCardRecived" />
				<Image class="CollectionCardRedPoint" />
			</Panel>
		</Panel>
		<Show when={props.segmentState != undefined}>
			<RewardProgressSegment progress={props.segmentProgress ?? 0} state={props.segmentState!} segmentIndex={props.segmentIndex ?? 0} />
		</Show>
		{/* LevelMarker */}
		<Panel class={classNames("RewardLevelMarker", stateClass, { Current: props.selected })}>
			<Panel class="RewardLevelMarkerContent">
				<Image class="RewardLevelMarkerBG" />

				<Label class="RewardLevelLabel" text={props.level} />
			</Panel>
		</Panel>
	</Panel>;
}

export function CollectionVip(props: { show?: boolean; }) {
	const REWARD_BASE_SCREEN_HEIGHT = 1080;
	const REWARD_WHEEL_SCROLL_STEP = 160;

	let rewardContentRef: Panel | undefined;
	let rewardViewportRef: Panel | undefined;
	let rewardListRef: Panel | undefined;
	let rewardCardRefs: Array<Panel | undefined> = [];
	const [scrollOffset, setScrollOffset] = createSignal(0);
	const [canScrollLeft, setCanScrollLeft] = createSignal(false);
	const [canScrollRight, setCanScrollRight] = createSignal(false);
	const [requesting, setRequesting] = createSignal(false);
	const [isRewardDragging, setIsRewardDragging] = createSignal(false);
	const [selectedRewardIndex, setSelectedRewardIndex] = createSignal(0);
	let rewardDragLastX = 0;
	let rewardDragScheduleId: ScheduleID | undefined;
	let rewardAutoScrollDone = false;
	let rewardUserScrolled = false;
	let rewardUserSelected = false;
	const playerAccountLevels = createServiceNetData("player_account_levels", {});
	const rewardReceiveRecordsRaw = createServiceNetData("player_account_level_rewards_receive_records", {});
	const rewardReceiveRecords = createMemo(() => {
		console.log("rewardReceiveRecordsRaw ", rewardReceiveRecordsRaw());
		return rewardReceiveRecordsRaw().collection_treasure ?? {};
	});

	const rewardConfigList = createMemo(() => {
		return Object.values(KeyValues.collection_treasure_level_reward ?? {})
			.map((config) => config as CollectionTreasureLevelReward)
			.sort((a, b) => a.level - b.level);
	});
	const maxLevel = createMemo(() => rewardConfigList()[rewardConfigList().length - 1]?.level ?? 0);
	const currentVipLevel = createMemo(() => {
		const level = Math.max(1, toFiniteNumber(playerAccountLevels().collection_treasure?.level, 1));
		const max = maxLevel();
		return max > 0 ? Math.min(level, max) : level;
	});
	const currentExp = createMemo(() => Math.max(0, toFiniteNumber(playerAccountLevels().collection_treasure?.extra_exp, 0)));
	const nextVipLevel = createMemo(() => {
		const max = maxLevel();
		return max > 0 ? Math.min(currentVipLevel() + 1, max) : currentVipLevel() + 1;
	});
	const currentLevelConfig = createMemo(() => rewardConfigList().find((config) => config.level === currentVipLevel()));
	const currentLevelCost = createMemo(() => {
		if (currentVipLevel() >= maxLevel()) return 0;
		return Math.max(0, toFiniteNumber(currentLevelConfig()?.level_cost, 0));
	});
	const remainingExp = createMemo(() => Math.max(0, currentLevelCost() - currentExp()));
	const vipRewards = createMemo<VipReward[]>(() => {
		const currentLevel = currentVipLevel();
		const received = rewardReceiveRecords()
		const rewardConfigs = rewardConfigList();
		return rewardConfigs.map((config) => {
			const rewardEntry = Object.entries(config.reward ?? {})[0];
			const rewardID = rewardEntry ? toFiniteNumber(rewardEntry[0]) : undefined;
			const amount = rewardEntry ? toFiniteNumber(rewardEntry[1]) : undefined;
			const state: VipRewardState = received[String(config.level)] === true
				? "received"
				: config.level <= currentLevel
					? "claimable"
					: "locked";
			const rarity = rewardID != undefined ? GetServiceItemRarity(rewardID) : 1;

			return {
				level: config.level,
				levelCost: Math.max(0, toFiniteNumber(config.level_cost, 0)),
				reward_id: rewardID,
				amount,
				rarity: rarity,
				state,
				hasReward: rewardID != undefined,
			};
		});
	});
	const hasClaimableReward = createMemo(() => vipRewards().some(reward => reward.state === "claimable" && reward.hasReward));
	const selectedRewardItemID = createMemo(() => vipRewards()[selectedRewardIndex()].reward_id);
	const vipLogoLang = createMemo(() => {
		const lang = Language();

		if (lang == "schinese") {
			return "Language_schinese";
		} else if (lang == "russian") {
			return "Language_russian";
		} else {
			return "Language_english";
		}
	});

	function handleReceiveRewards(level?: number) {
		if (requesting() || !hasClaimableReward()) {
			return;
		}

		setRequesting(true);
		CallActionRequest("/v1/account_level/receive_rewards", {
			account_type: "collection_treasure",
			level: level ?? 0,
		}, () => {
			setRequesting(false);
		}, () => {
			setRequesting(false);
		});
	}

	function selectRewardIndex(index: number, userSelected = false) {
		const rewardCount = vipRewards().length;
		if (rewardCount <= 0) {
			setSelectedRewardIndex(0);
			return;
		}

		setSelectedRewardIndex(Math.max(0, Math.min(rewardCount - 1, index)));
		if (userSelected) {
			rewardUserSelected = true;
		}
	}

	function handleReceiveReward(reward: VipReward, index: number) {
		selectRewardIndex(index, true);

		if (reward.state !== "claimable" || !reward.hasReward) {
			return;
		}

		handleReceiveRewards(reward.level);
	}

	function getRewardLayoutScale() {
		const panelScale = rewardViewportRef?.actualuiscale_x;
		if (panelScale != undefined && panelScale > 0) {
			return panelScale;
		}

		const heightScale = Game.GetScreenHeight() / REWARD_BASE_SCREEN_HEIGHT;
		return heightScale > 0 ? heightScale : 1;
	}

	function toRewardDesignPx(value: number) {
		return value / getRewardLayoutScale();
	}

	function getMaxScroll() {
		if (!rewardViewportRef?.IsValid() || !rewardListRef?.IsValid()) return 0;

		const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
		const validCards = rewardCardRefs.filter((panel): panel is Panel => !!panel?.IsValid());
		const lastCard = validCards[validCards.length - 1];
		const listWidth = lastCard?.IsValid()
			? toRewardDesignPx(lastCard.GetPositionWithinAncestor(rewardListRef).x + lastCard.actuallayoutwidth)
			: toRewardDesignPx(rewardListRef.actuallayoutwidth);

		return Math.max(0, listWidth - viewportWidth);
	}

	function clampScrollOffset(offset: number) {
		const maxScroll = getMaxScroll();
		return Math.max(0, Math.min(maxScroll, offset));
	}

	function updateRewardScrollState() {
		const maxScroll = getMaxScroll();
		const nextOffset = clampScrollOffset(scrollOffset());
		const tolerance = 2;

		if (Math.abs(nextOffset - scrollOffset()) > tolerance) {
			setScrollOffset(nextOffset);
		}

		setCanScrollLeft(nextOffset > tolerance);
		setCanScrollRight(nextOffset < maxScroll - tolerance);
	}

	function getCurrentRewardIndex() {
		const rewards = vipRewards();
		if (rewards.length === 0) return 0;

		const currentLevel = currentVipLevel();
		let currentIndex = 0;

		for (let index = 0; index < rewards.length; index++) {
			if (rewards[index].level <= currentLevel) {
				currentIndex = index;
			} else {
				break;
			}
		}

		return currentIndex;
	}

	function getInitialRewardIndex() {
		const rewards = vipRewards();
		if (rewards.length === 0) return 0;

		const firstClaimableIndex = rewards.findIndex(reward => reward.state === "claimable" && reward.hasReward);
		return firstClaimableIndex >= 0 ? firstClaimableIndex : getCurrentRewardIndex();
	}

	createEffect(() => {
		const rewards = vipRewards();
		if (rewards.length === 0) {
			setSelectedRewardIndex(0);
			return;
		}

		if (!rewardUserSelected) {
			selectRewardIndex(getInitialRewardIndex());
			return;
		}

		if (selectedRewardIndex() >= rewards.length) {
			setSelectedRewardIndex(rewards.length - 1);
		}
	});

	function scrollToRewardIndex(index: number, type: "start" | "center" | "end" = "center") {
		if (!rewardViewportRef?.IsValid() || !rewardListRef?.IsValid()) return false;

		const targetCard = rewardCardRefs[index];
		if (!targetCard?.IsValid()) return false;

		const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
		const cardWidth = toRewardDesignPx(targetCard.actuallayoutwidth);
		if (viewportWidth <= 0 || cardWidth <= 0) return false;

		const cardX = toRewardDesignPx(targetCard.GetPositionWithinAncestor(rewardListRef).x);
		let targetOffset = cardX;

		if (type === "center") {
			targetOffset -= (viewportWidth - cardWidth) / 2;
		} else if (type === "end") {
			targetOffset -= viewportWidth - cardWidth;
		}

		setScrollOffset(clampScrollOffset(targetOffset));
		$.Schedule(0, updateRewardScrollState);
		return true;
	}

	function scrollRewardList(direction: -1 | 1) {
		if (!rewardViewportRef?.IsValid()) return;

		const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
		const pageStep = Math.max(1, Math.floor(viewportWidth * 0.8));

		rewardUserScrolled = true;
		setScrollOffset(clampScrollOffset(scrollOffset() + direction * pageStep));
		$.Schedule(0, updateRewardScrollState);
	}

	function scrollRewardListByDelta(delta: number) {
		if (!rewardViewportRef?.IsValid()) return;

		rewardUserScrolled = true;
		setScrollOffset(clampScrollOffset(scrollOffset() + delta));
		$.Schedule(0, updateRewardScrollState);
	}

	function stopRewardDragThinker() {
		if (rewardDragScheduleId !== undefined) {
			try {
				$.CancelScheduled(rewardDragScheduleId);
			} catch (error) { }
			rewardDragScheduleId = undefined;
		}
	}

	function rewardDragThinker() {
		rewardDragScheduleId = undefined;
		if (!isRewardDragging() || !rewardViewportRef?.IsValid()) {
			return;
		}

		const cursorX = GameUI.GetCursorPosition()[0];
		const deltaX = (cursorX - rewardDragLastX) / getRewardLayoutScale();

		if (Math.abs(deltaX) >= 1) {
			setScrollOffset(clampScrollOffset(scrollOffset() - deltaX));
			updateRewardScrollState();
			rewardDragLastX = cursorX;
		}

		rewardDragScheduleId = $.Schedule(Math.max(1 / 90, Game.GetGameFrameTime()), rewardDragThinker);
	}

	function startRewardDrag(dragCallbacks: { displayPanel?: Panel; offsetX?: number; offsetY?: number; }) {
		if (!rewardViewportRef?.IsValid() || getMaxScroll() <= 0) {
			return;
		}

		rewardUserScrolled = true;
		const dragPanel = $.CreatePanel("Panel", $.GetContextPanel(), "CollectionVipRewardDragPanel");
		dragPanel.visible = false;
		dragCallbacks.displayPanel = dragPanel;
		const position = GameUI.GetCursorPosition();
		if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
			dragCallbacks.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
			dragCallbacks.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
		}

		stopRewardDragThinker();
		rewardDragLastX = GameUI.GetCursorPosition()[0];
		setIsRewardDragging(true);
		rewardDragThinker();
	}

	function endRewardDrag(draggedPanel?: Panel) {
		stopRewardDragThinker();
		setIsRewardDragging(false);
		if (draggedPanel?.IsValid()) {
			draggedPanel.DeleteAsync(-1);
		}
		updateRewardScrollState();
	}

	createEffect(() => {
		setScrollOffset(0);
		rewardAutoScrollDone = false;
		rewardUserScrolled = false;

		let scheduleId: ScheduleID | undefined;
		let disposed = false;

		const tick = () => {
			if (disposed) return;
			if (!rewardAutoScrollDone && !rewardUserScrolled) {
				const initialRewardIndex = getInitialRewardIndex();
				if (!rewardUserSelected) {
					selectRewardIndex(initialRewardIndex);
				}
				rewardAutoScrollDone = scrollToRewardIndex(initialRewardIndex, "center");
			}
			updateRewardScrollState();
			scheduleId = $.Schedule(0.1, tick);
		};

		scheduleId = $.Schedule(0, tick);

		onCleanup(() => {
			disposed = true;
			if (scheduleId !== undefined) {
				try {
					$.CancelScheduled(scheduleId);
				} catch (error) { }
			}
		});
	});

	onMount(() => {
		const mouseEventName = DoUniqueString("CollectionVipRewardList");
		CustomUIConfig.SubscribeMouseEvent(mouseEventName, ({ event_name: eventName, value }) => {
			const isRewardListHovered = rewardViewportRef?.IsValid() && rewardViewportRef.BHasHoverStyle()
				|| rewardContentRef?.IsValid() && rewardContentRef.BHasHoverStyle();

			if (!isRewardListHovered) {
				return;
			}

			if (eventName === "wheeled") {
				if (value === 1) {
					scrollRewardListByDelta(-REWARD_WHEEL_SCROLL_STEP);
				} else if (value === -1) {
					scrollRewardListByDelta(REWARD_WHEEL_SCROLL_STEP);
				}
			} else if (eventName === "pressed") {
				if (value === 5) {
					scrollRewardListByDelta(-REWARD_WHEEL_SCROLL_STEP);
				} else if (value === 6) {
					scrollRewardListByDelta(REWARD_WHEEL_SCROLL_STEP);
				}
			}
		});

		onCleanup(() => {
			try {
				CustomUIConfig.UnsubscribeMouseEvent(mouseEventName);
			} catch (error) { }
		});
	});

	onCleanup(() => {
		stopRewardDragThinker();
	});

	return <EOM_MenuLayout_Content id="CollectionVipRoot" show={props.show}>
		<Panel id="CollectionRewardPreview">
			<Image id="CollectionRewardPreviewBG" />
			<Panel class="CollectionBGFx">
				<DOTAParticleScenePanel class="CollectionCardFx" particleName={"particles/ui/game/ui_game_f3_background_fx.vpcf"} cameraOrigin="0 0 320" lookAt="0 0 0" fov={90} hittest={false} />
			</Panel>
			<Show when={selectedRewardItemID()} keyed>
				{(itemID: number) => <StoreItemImage itemid={itemID} />}
			</Show>
		</Panel>
		<Panel id="CollectionVipTopRight">
			<Image id="CollectionVipTopRightBG" class={vipLogoLang()} />
			<Panel id="CollectionVipToolTipIcon" class={vipLogoLang()} tooltip_text="#VIPLevelTitleToolTip" />
			{/* <Panel id="CollectionVipTimeLimit">
				<Image id="CollectionVipTimeIcon" />
				<Label id="CollectionVipTimeText" text={LocalizeWithVars("#VIPLevelTimeLimit", { day: 82, hour: 9 })} />
			</Panel> */}
		</Panel>
		<Panel id="CollectionVipContent">
			<Panel id="CollectionVipTop">
				<Panel id="CollectionVipLevelInfo">
					<Panel id="CollectionVipLevel">
						<Image id="CollectionVipLevelBG" />
						<Label id="VipLevelNumber" text={currentVipLevel()} />
						{/* <Label id="VipLevelNumber" text={20} /> */}
					</Panel>
					<Panel id="CollectionVipProgress">
						<Label id="VipProgressNumber" text={`${currentExp()} / ${currentLevelCost()}`} />
						<Label id="VipProgressTitle" vars={{ need_exp: remainingExp(), next_level: nextVipLevel() }} text={"#VIPLevelNeedExp"} />
						<Label id="VipProgressDesc" text={"#VIPLevelExpDescription"} />
					</Panel>
				</Panel>
				<Panel id="CollectionVipOperatorContainer">
					<EOM_Button
						id="ReciveRewardButton"
						color="Gold"
						size="Normal"
						text="#ClaimRewardsBtnTxt"
						enabled={!requesting() && hasClaimableReward()}
						onactivate={() => handleReceiveRewards(0)}
					/>
				</Panel>
			</Panel>
			<Panel id="CollectionVipCenter">
				<EOM_BaseButton
					id="LeftArrow"
					class={classNames("SwitchArrow", "LeftArrow")}
					enabled={canScrollLeft()}
					onactivate={() => scrollRewardList(-1)}
					visible={false}
				/>
				<Panel id="RewardsContent" class={classNames({ Dragging: isRewardDragging() })} ref={panel => rewardContentRef = panel}>
					<Panel
						id="RewardCardViewport"
						ref={panel => rewardViewportRef = panel}
						draggable={true}
						onDragStart={(_panel, dragCallbacks) => startRewardDrag(dragCallbacks)}
						onDragEnd={(_panel, draggedPanel) => endRewardDrag(draggedPanel)}
					>
						<Panel
							id="RewardCardList"
							ref={panel => rewardListRef = panel}
							style={{ transform: `translateX(${-scrollOffset()}px)` }}
						>
							{vipRewards().map((reward, index, rewards) => {
								const hasNextLevel = index < rewards.length - 1;
								const segmentState = hasNextLevel ? getRewardSegmentState(reward.level, currentVipLevel()) : undefined;
								const segmentProgress = hasNextLevel ? getRewardSegmentProgress(reward.level, reward.levelCost, currentVipLevel(), currentExp()) : undefined;

								return <CollectionCard
									panelRef={panel => rewardCardRefs[index] = panel}
									{...reward}
									segmentProgress={segmentProgress}
									segmentState={segmentState}
									segmentIndex={index}
									selected={index === selectedRewardIndex()}
									onactivate={() => handleReceiveReward(reward, index)}
								/>;
							})}
						</Panel>
					</Panel>
				</Panel>
				<EOM_BaseButton
					id="RightArrow"
					class={classNames("SwitchArrow", "RightArrow")}
					enabled={canScrollRight()}
					onactivate={() => scrollRewardList(1)}
					visible={false}
				/>
			</Panel>
		</Panel>
	</EOM_MenuLayout_Content>;
}
