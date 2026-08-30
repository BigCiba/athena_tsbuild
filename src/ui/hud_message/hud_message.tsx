import { insert, render } from "@bigciba/solid-panorama-runtime";
import { createEffect, createMemo, createSignal, JSXElement, onCleanup, onMount } from "solid-js";
import { EOM_ProgressBar } from "../../components/EOMDesign/DataDisplay/EOM_ProgressBar/EOM_ProgressBar";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { createNetDataSignal, createServiceNetData } from "../../utils/solid_utils";

interface HudMessageReceiveItem {
	item_id: string;
	uid?: string;
	rarity: number;
	item_name: string;
	src?: string;
}

interface HudMessageGameplayText {
	text: string;
}

interface HudMessageState {
	receiveItemList: HudMessageReceiveItem[];
	gameplayTextList: HudMessageGameplayText[];
	listenerIDs: GameEventListenerID[];
	abyssalEndRequestDismissedStartTime?: number;
	abyssalEndRequestSubmittingStartTime?: number;
}

interface CustomUIConfig {
	HudMessageState?: HudMessageState;
}

const customUIConfig = GameUI.CustomUIConfig() as CustomUIConfig;
const hudMessageState = customUIConfig.HudMessageState ??= {
	receiveItemList: [],
	gameplayTextList: [],
	listenerIDs: []
};

declare global {
	interface CustomGameEventDeclarations {
		abyssal_early_settle: {};
	}
}

const ABYSSAL_RUNE_END_SCORE = 10000;
const ABYSSAL_ENGRAVING_END_SCORE = 20000;

const getToastManager = (id: string) => {
	const panel = $(`#${id}`) as ToastManager | undefined | null;
	return panel != undefined && panel.IsValid() ? panel : undefined;
};

Timer.CreateTimer("Message", 0, () => {
	if (hudMessageState.receiveItemList.length == 0) {
		return 0.3;
	}
	const receiveItemToast = getToastManager("ReceiveItemToast");
	if (receiveItemToast === undefined) {
		return 0.3;
	}

	const receiveItemData = hudMessageState.receiveItemList.shift();
	if (receiveItemData === undefined) {
		return 0.3;
	}

	const { item_id, rarity, uid, item_name, src } = receiveItemData;
	let panel = $.CreatePanel("Panel", receiveItemToast, "");
	insert(panel, <Panel className={"AddItemRow Rarity" + rarity}>
		<Panel class="ItemBg"></Panel>
		{/* <StoreItemImage itemid={item_id} src={src} uid={uid} /> */}
		<Label class="ItemName" text={item_name} html />
	</Panel>);
	receiveItemToast.QueueToast(panel);
	return 0.3;

});

Timer.CreateTimer("GameplayMessage", 0, () => {
	if (hudMessageState.gameplayTextList.length == 0) {
		return 0.15;
	}
	const gameplayTextToast = getToastManager("GameplayTextToast");
	if (gameplayTextToast === undefined) {
		return 0.15;
	}

	const gameplayTextData = hudMessageState.gameplayTextList.shift();
	if (gameplayTextData === undefined) {
		return 0.15;
	}

	let panel = $.CreatePanel("Panel", gameplayTextToast, "");
	insert(panel, <Panel class="GameplayTextRow">
		<Label class="GameplayTextLabel" text={gameplayTextData.text} />
	</Panel>);
	gameplayTextToast.QueueToast(panel);
	return 0.15;
});

function OnReceiveItem(data: { json: string; equipments?: string, gems?: string; }) {
	const formatData = JSON.parse(data.json);
	// print("ReceiveRewards", data);
	if (formatData != undefined) {
		for (const itemData of formatData) {
			// DeepPrint(itemData);
			// let panel = $.CreatePanel("Panel", ReceiveItemToast, "");
			let itemID: string = String(itemData.item_id);
			const uid = itemData.uid != undefined ? String(itemData.uid) : undefined;
			// const itemType = GetPropType(itemID);
			let itemName = GetLocalization(`#${itemID}`, itemID);
			let src;
			let rarity = toFiniteNumber(itemData.item_rarity, 1);
			hudMessageState.receiveItemList.push({
				item_id: itemID,
				uid,
				rarity,
				item_name: itemName + (itemData.amounts > 1 ? ("×" + itemData.amounts) : ""),
				src
			});
		}
	}
}

function OnReceiveGameplayText(data: { text?: string; message?: string; }) {
	const text = String(data.text ?? data.message ?? "").trim();
	if (text.length <= 0) {
		return;
	}

	hudMessageState.gameplayTextList.push({ text });
}

(function () {
	for (const listenerID of hudMessageState.listenerIDs) {
		try {
			GameEvents.Unsubscribe(listenerID);
		} catch (error) { }
	}
	hudMessageState.listenerIDs = [
		GameEvents.Subscribe("ReceiveRewards", OnReceiveItem),
		useClientSideEvent("ReceiveRewards", OnReceiveItem),
		GameEvents.Subscribe("ReceiveGameplayText", OnReceiveGameplayText)
	];
	// useClientSideEvent("ReceiveGameplayText", OnReceiveGameplayText);
})();

type GameModePrepareRequestData = NetDataDeclarations["common"]["game_mode_prepare_request"];
type TeamRequestData = NetDataDeclarations["common"]["team_request"];
type RestartGameRequestData = NetDataDeclarations["common"]["restart_game_request"];
type DungeonStartWaitData = NetDataDeclarations["common"]["dungeon_start_wait"];
interface RequestTextData {
	cancel?: string;
}
type RequestData =
	| (GameModePrepareRequestData & { text?: RequestTextData })
	| TeamRequestData
	| (RestartGameRequestData & { text?: RequestTextData });
type RequestState = "pending" | "success" | "failed";
type RequestChoice = "pending" | "accepted" | "rejected";

interface RequestPanelProps {
	requestKey: "game_mode_prepare_request" | "team_request" | "restart_game_request";
	eventName: "game_mode_prepare_response" | "team_request_response" | "restart_game";
	panelID: string;
	countDownID: string;
	isVisible?: boolean;
	children?: JSXElement;
	pendingInitiatorText?: string;
	pendingOtherText?: string;
	successText?: string;
	rejectedText?: string;
	timeoutText?: string;
}

const RequestPanel = (props: RequestPanelProps) => {
	const playerID = Players.GetLocalPlayer();
	const [request, setRequest] = createSignal<RequestData | undefined>(getNetDataKey("common", props.requestKey));
	const [countDown, setCountDown] = createSignal(0);
	let countDownTimer: number | undefined;

	const clearCountDownTimer = () => {
		if (countDownTimer !== undefined) {
			clearInterval(countDownTimer);
			countDownTimer = undefined;
		}
	};

	const updateCountDown = () => {
		const data = request();
		const state = getRequestState(data);
		const endTime = state === "pending" ? getEndTime(data) : getCloseTime(data);
		if (endTime === undefined) {
			setCountDown(0);
			return;
		}

		setCountDown(Math.max(0, Math.ceil(endTime - Game.GetGameTime())));
	};

	const restartCountDownTimer = () => {
		clearCountDownTimer();
		updateCountDown();

		const data = request();
		const state = getRequestState(data);
		const endTime = state === "pending" ? getEndTime(data) : getCloseTime(data);
		if (endTime !== undefined && endTime - Game.GetGameTime() > 0) {
			countDownTimer = setInterval(updateCountDown, 100);
		}
	};

	onMount(() => {
		restartCountDownTimer();
		const listener = useNetDataKey("common", props.requestKey, (value) => {
			setRequest(value);
			restartCountDownTimer();
		});

		onCleanup(() => {
			GameUI.CustomUIConfig().EndDrag();
			clearCountDownTimer();
			CustomNetTables.UnsubscribeNetTableListener(listener);
		});
	});

	const isVisible = createMemo(() => (props.isVisible ?? true) && getRequestState(request()) !== undefined);
	const isPending = createMemo(() => getRequestState(request()) === "pending");
	const localChoice = createMemo(() => getLocalChoice(request(), playerID));
	const canChoose = createMemo(() => isPending() && localChoice() === "pending");
	const isInitiator = createMemo(() => getInitiatorPlayerId(request()) == playerID);
	const messageText = createMemo(() => {
		const data = request();
		const state = getRequestState(data);
		if (state === undefined) {
			return "";
		}
		if (state === "success") {
			return GetLocalization(isTeamRequest(data) ? data.text.success : (props.successText ?? ""));
		}
		if (state === "failed") {
			const text = isTeamRequest(data)
				? (getFailReason(data) === "rejected" ? data.text.rejected : data.text.timeout)
				: (getFailReason(data) === "rejected" ? props.rejectedText : props.timeoutText);
			return GetLocalization(text ?? "");
		}
		return GetLocalization(isTeamRequest(data)
			? (isInitiator() ? data.text.pendingInitiator : data.text.pendingOther)
			: (isInitiator() ? props.pendingInitiatorText : props.pendingOtherText) ?? "");
	});

	const submitChoice = (result: "accepted" | "rejected") => {
		if (!canChoose()) {
			return;
		}
		const data = request();
		if (props.eventName === "team_request_response") {
			GameEvents.SendCustomEventToServer(props.eventName, {
				result,
				requestId: isTeamRequest(data) ? data.requestId : undefined,
			});
			return;
		}
		GameEvents.SendCustomEventToServer(props.eventName, { result });
	};

	// 拖拽相关
	let dragable = false;
	let dragPanel: Panel & { offsetX?: number, offsetY?: number; } | undefined = undefined;
	const dragStart = (panel: Panel & { dragable?: boolean; }) => {
		dragable = true;
		dragPanel = panel;
		dragTimer();
	};
	const dragTimer = () => {
		if (dragable) {
			if (dragPanel != undefined && dragPanel.IsValid()) {
				if (GameUI.IsMouseDown(0)) {
					let position = GameUI.GetCursorPosition();
					if (dragPanel.offsetX == undefined || dragPanel.offsetY == undefined) {
						dragPanel.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
						dragPanel.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
						dragPanel.style.align = "left top";
						dragPanel.style.margin = "0px 0px 0px 0px";
					}
					if (dragPanel.offsetX != undefined && dragPanel.offsetY != undefined) {
						dragPanel.SetPositionInPixels((position[0] + dragPanel.offsetX) / dragPanel.actualuiscale_x, (position[1] + dragPanel.offsetY) / dragPanel.actualuiscale_y, 0);
					}
				} else {
					dragPanel.offsetX = undefined;
					dragPanel.offsetY = undefined;
				}
				$.Schedule(Game.GetGameFrameTime(), dragTimer);
			}
		} else {
			dragPanel = undefined;
		}
	};

	return <Panel id={props.panelID} visible={isVisible()} hittest={isVisible()}
		onmouseover={self => dragStart(self)}
		onmouseout={self => dragable = false}
	>
		{props.children}
		<Label id={props.countDownID} text={messageText()} vars={{ value: countDown() }} />
		<Panel id="RequestActionList" visible={isPending()}>
			<EOM_Button
				size="Small"
				color="Cancel"
				text={GetLocalization(request()?.text?.cancel ?? "#Popup_Button_Cancel")}
				enabled={canChoose()}
				onactivate={() => submitChoice("rejected")}
			/>
			<EOM_Button size="Small" color="Confirm" text="#Popup_Button_Confirm" enabled={canChoose()} onactivate={() => submitChoice("accepted")} />
		</Panel>
	</Panel>;
};

const DungeonStartWaitNotice = () => {
	const waitData = createNetDataSignal("common", "dungeon_start_wait");
	const [now, setNow] = createSignal(Game.GetGameTime());
	let timer: number | undefined;

	onMount(() => {
		timer = setInterval(() => setNow(Game.GetGameTime()), 250);
		onCleanup(() => {
			if (timer !== undefined) {
				clearInterval(timer);
				timer = undefined;
			}
		});
	});

	const data = createMemo<DungeonStartWaitData | undefined>(() => waitData());
	const elapsedSeconds = createMemo(() => {
		const startTime = data()?.start_time;
		return startTime === undefined ? 0 : Math.max(0, now() - startTime);
	});
	const remainingSeconds = createMemo(() => {
		const endTime = data()?.end_time;
		return endTime === undefined ? 0 : Math.max(0, Math.ceil(endTime - now()));
	});
	const showLongWait = createMemo(() => {
		const value = data();
		return value?.state === "pending" && elapsedSeconds() >= (value.long_wait_second ?? 10);
	});

	return <Panel id="DungeonStartWaitNotice" visible={showLongWait()} hittest={showLongWait()}>
		<Label id="DungeonStartWaitTitle" text="#DungeonStartWaitTitle" />
		<Label id="DungeonStartWaitDesc" text="#DungeonStartWaitDesc" vars={{ value: remainingSeconds() }} />
		<Panel id="DungeonStartWaitActionList">
			<EOM_Button size="Small" color="Cancel" text="#DungeonStartWaitCancel" onactivate={() => GameEvents.SendCustomEventToServer("dungeon_start_wait_cancel", {})} />
		</Panel>
	</Panel>;
};

const GameStartRequest = () => {
	return <RequestPanel
		requestKey="game_mode_prepare_request"
		eventName="game_mode_prepare_response"
		panelID="GameStartRequest"
		countDownID="StartGameRequestCountDown"
		pendingInitiatorText="#StartGameRequestWaiting"
		pendingOtherText="#StartGameRequestCountDown"
		successText="#StartGameRequestAccepted"
		rejectedText="#StartGameRequestRejected"
		timeoutText="#StartGameRequestTimeout"
	/>;
};

const RestartGameRequest = () => {
	return <RequestPanel
		requestKey="restart_game_request"
		eventName="restart_game"
		panelID="RestartGameRequest"
		countDownID="RestartGameRequestCountDown"
		pendingInitiatorText="#RestartGameRequestWaiting"
		pendingOtherText="#RestartGameRequestCountDown"
		successText="#RestartGameRequestAccepted"
		rejectedText="#RestartGameRequestRejected"
		timeoutText="#RestartGameRequestTimeout"
	/>;
};

const TeamRequest = () => {
	const request = createNetDataSignal("common", "team_request");
	const isVisible = createMemo(() => {
		const data = request();
		return isTeamRequest(data) && getRequestState(data) !== undefined;
	});

	return <RequestPanel
		requestKey="team_request"
		eventName="team_request_response"
		panelID="TeamRequest"
		countDownID="TeamRequestCountDown"
		isVisible={isVisible()}
	>
		<Panel id="RequestHeader">
			<Label id="RequestTitle" text={GetLocalization(request()?.text?.title ?? "")} />
			<Label id="RequestSubtitle" text={GetLocalization(request()?.text?.subtitle ?? "")} />
		</Panel>
	</RequestPanel>;
};

const AbyssalEndRequest = () => {
	const abyssalState = createNetDataSignal("common", "abyssal_state");
	const comboState = createNetDataSignal("common", "combo_state");
	const [dismissedRunStartTime, setDismissedRunStartTime] = createSignal(hudMessageState.abyssalEndRequestDismissedStartTime);
	const [submittingRunStartTime, setSubmittingRunStartTime] = createSignal(hudMessageState.abyssalEndRequestSubmittingStartTime);

	const requestConfig = createMemo(() => {
		const state = abyssalState();
		if (state?.state !== "running") {
			return undefined;
		}

		const difficulty = String(state.difficulty);
		if (KeyValues.engraving_drop[difficulty] != undefined) {
			return {
				score: ABYSSAL_ENGRAVING_END_SCORE,
				text: "#AbyssalGame_EndRequestByEngraving",
			};
		}
		if (KeyValues.rune_drop[difficulty] != undefined) {
			return {
				score: ABYSSAL_RUNE_END_SCORE,
				text: "#AbyssalGame_EndRequestByRune",
			};
		}
		return undefined;
	});

	const isVisible = createMemo(() => {
		const state = abyssalState();
		const config = requestConfig();
		if (state?.state !== "running" || config == undefined) {
			return false;
		}
		return (comboState()?.comboScore ?? 0) >= config.score
			&& dismissedRunStartTime() !== state.start_time
			&& submittingRunStartTime() !== state.start_time;
	});

	const continuePlaying = () => {
		const state = abyssalState();
		if (state?.state !== "running") {
			return;
		}
		hudMessageState.abyssalEndRequestDismissedStartTime = state.start_time;
		setDismissedRunStartTime(state.start_time);
	};

	const endGame = () => {
		const state = abyssalState();
		if (state?.state !== "running" || submittingRunStartTime() === state.start_time) {
			return;
		}
		hudMessageState.abyssalEndRequestSubmittingStartTime = state.start_time;
		setSubmittingRunStartTime(state.start_time);
		GameEvents.SendCustomEventToServer("abyssal_early_settle", {});
	};

	return <Panel id="AbyssalEndRequest" visible={isVisible()} hittest={isVisible()}>
		<Panel id="AbyssalEndRequestHeader">
			<Label id="AbyssalEndRequestTitle" text={GetLocalization("#AbyssalGame_EndRequest_Title")} />
			<Label id="AbyssalEndRequestDescription" text={GetLocalization(requestConfig()?.text ?? "")} />
		</Panel>
		<Panel id="AbyssalEndRequestActionList">
			<EOM_Button size="Small" color="Cancel" text={GetLocalization("#AbyssalGame_EndRequest_Continue")} onactivate={continuePlaying} />
			<EOM_Button size="Small" color="Confirm" text={GetLocalization("#AbyssalGame_EndRequest_EndGame")} onactivate={endGame} />
		</Panel>
	</Panel>;
};

const GameStartRequestLayer = () => <>
	<GameStartRequest />
	<TeamRequest />
	<DungeonStartWaitNotice />
	<AbyssalEndRequest />
</>;

render(() => <GameStartRequestLayer />, $("#GameStartRequestContainer"));
render(() => <RestartGameRequest />, $("#RestartGameRequestContainer"));

// 猪猪存钱罐进度提示
const SavingPotProgress = () => {
	const playerCounters = createServiceNetData("player_counters", {});
	const savingPotDailyDrop = createMemo(() => playerCounters()["saving_pot_daily_drop"]);
	const count = createMemo(() => savingPotDailyDrop()?.count ?? 0);
	const savingPotActivity = createMemo(() => {
		for (const activityID in KeyValues.activity_data) {
			const activityData = KeyValues.activity_data[activityID];
			if (activityData.name == "saving_pot") {
				return KeyValues.activity_saving_pot?.[activityData.activity_id];
			}
		}
		return Object.values(KeyValues.activity_saving_pot ?? {})[0];
	});
	const max = createMemo(() => savingPotActivity()?.progress ?? 0);
	const [visible, setVisible] = createSignal(false);

	let lastCount: number | undefined;
	let hideScheduleID: ScheduleID | undefined;

	const showProgress = () => {
		setVisible(true);
		if (hideScheduleID != undefined) {
			$.CancelScheduled(hideScheduleID);
		}
		hideScheduleID = $.Schedule(5, () => {
			hideScheduleID = undefined;
			setVisible(false);
		});
	};

	createEffect(() => {
		const counter = savingPotDailyDrop();
		if (counter == undefined) {
			return;
		}
		const nextCount = count();
		if (lastCount == undefined) {
			lastCount = nextCount;
			return;
		}
		if (nextCount != lastCount) {
			lastCount = nextCount;
			showProgress();
		}
	});

	onCleanup(() => {
		if (hideScheduleID != undefined) {
			$.CancelScheduled(hideScheduleID);
		}
	});

	return <Panel id="SavingPotProgress" hittest={visible()} classList={{ Show: visible() }} onactivate={() => {
		ClientSideEvent("toggle_window_tag", {
			window_name: "MenuButton_activity",
			menu: "saving_pot",
			force: true,
		});
	}}>
		<Panel id="ProgressBarIcon" />
		<EOM_ProgressBar min={0} max={max()} value={count()} />
		<Label id="ProgressLabel" text={`${count()}/${max()}`} />
	</Panel>;
}
render(() => <SavingPotProgress />, $("#SavingPotContainer"));

function isTeamRequest(data: RequestData | undefined): data is TeamRequestData {
	return data !== undefined && "playerResponses" in data && "requestType" in data;
}

function isResponseRequest(data: RequestData | undefined): data is GameModePrepareRequestData | TeamRequestData {
	return data !== undefined && "playerResponses" in data;
}

function getRequestState(data: RequestData | undefined): RequestState | undefined {
	if (data === undefined) {
		return undefined;
	}
	if (isResponseRequest(data)) {
		if (data.state === "None") {
			return undefined;
		}
		if (data.state === "success" || data.state === "failed" || data.state === "pending") {
			return data.state;
		}
		return undefined;
	}
	return data.state;
}

function getEndTime(data: RequestData | undefined): number | undefined {
	if (data === undefined) {
		return undefined;
	}
	return isResponseRequest(data) ? data.endTime : data.end_time;
}

function getCloseTime(data: RequestData | undefined): number | undefined {
	if (data === undefined) {
		return undefined;
	}
	return isResponseRequest(data) ? data.closeTime : data.close_time;
}

function getFailReason(data: RequestData | undefined): "rejected" | "timeout" | undefined {
	if (data === undefined) {
		return undefined;
	}
	return isResponseRequest(data) ? data.failReason : data.fail_reason;
}

function getInitiatorPlayerId(data: RequestData | undefined): PlayerID | undefined {
	if (data === undefined) {
		return undefined;
	}
	return isResponseRequest(data) ? data.requesterPlayerId : data.initiator_player_id;
}

function getLocalChoice(data: RequestData | undefined, playerID: PlayerID): RequestChoice {
	if (data === undefined) {
		return "pending";
	}
	if (!isResponseRequest(data)) {
		return data.players?.[playerID]?.status ?? "pending";
	}
	const response = data.playerResponses?.[playerID];
	if (response === "Ready") {
		return "accepted";
	}
	if (response === "Rejected") {
		return "rejected";
	}
	return "pending";
}
