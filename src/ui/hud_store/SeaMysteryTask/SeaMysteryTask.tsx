import { createMemo, For, Match, Switch } from "solid-js";
import { EOM_ProgressBar } from "../../../components/EOMDesign/DataDisplay/EOM_ProgressBar/EOM_ProgressBar";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { StoreItemImage } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import "./SeaMysteryTask.less";

interface MoonstoneReward {
	activity_id: number;
	reward_id: number;
	num: number;
	rewards: Record<string, number>;
}

interface MoonstoneActivityData {
	received?: string | number[];
	extra_num?: number;
	round?: number;
	total_num?: number;
	activity_id?: number;
}

const DEFAULT_ACTIVITY_DATA: MoonstoneActivityData = {
	received: "",
	round: 0,
	extra_num: 0,
	total_num: 0,
	activity_id: 0,
};

export const SeaMysteryTask = (props: { activityID?: number; }) => {
	const activityID = () => props.activityID ?? 901;
	const playerMoonstoneActivityData = createServiceNetData("player_moonstone_activity_data", {});
	const rewards = createMemo(() => {
		const groupedRewards = KeyValues.activity_moonstone[String(activityID())] as unknown as Record<string, MoonstoneReward> | undefined;
		return Object.values(groupedRewards ?? {}).sort((a, b) => a.num - b.num);
	});
	const activityData = createMemo<MoonstoneActivityData>(() => playerMoonstoneActivityData()[String(activityID())] ?? DEFAULT_ACTIVITY_DATA);
	const receivedRewardIDs = createMemo(() => {
		const received = activityData().received;
		if (Array.isArray(received)) return received.map(Number);
		return String(received ?? "").split(",").filter(Boolean).map(Number);
	});
	const progress = () => Number(activityData().extra_num ?? 0);
	const canReceiveAll = createMemo(() => rewards().some(reward => !receivedRewardIDs().includes(reward.reward_id) && progress() >= reward.num));

	return <Panel id="SeaMysteryTaskContent">
		<Panel id="LeftContent">
			<Image id="SeaMysteryTitle" />
			<Label id="SeaMysteryTitle2" text={GetLocalization("#SeaMysteryTitle2")} />
		</Panel>
		<Panel id="RightContent">
			{/* <CurrencyGroup tokens={[110015]} /> */}
			<Panel id="ItemList">
				<For each={rewards()}>{reward => {
					const itemID = () => Object.keys(reward.rewards)[0] ?? "110015";
					const itemCount = () => reward.rewards[itemID()] ?? 0;
					const received = () => receivedRewardIDs().includes(reward.reward_id);
					const claimable = () => progress() >= reward.num;
					return <Panel class="ItemCard">
						<Panel id="CardBG">
							<Panel id="SeaTask201Title">
								<Label text={GetLocalization("#SeaMysteryTitle_" + reward.num)} />
							</Panel>
							<StoreItemImage itemid={itemID()} />
							<Label id="ItemCount" text={itemCount()} />
							<Switch fallback={<EOM_Button id="ActionButton" enabled={false} text={GetLocalization("#TaskUnFinished")} />}>
								<Match when={received()}>
									<Image id="TaskFinished" />
								</Match>
								<Match when={claimable()}>
									<EOM_Button id="ActionButton" text={GetLocalization("#DailyTask_Get")} onactivate={() => CallActionRequest("/v1/activity/receive_rewards", { activity_id: activityID(), reward_id: reward.reward_id }, () => { })} />

								</Match>
							</Switch>
							<EOM_ProgressBar id="Progress" value={Math.min(reward.num, progress())} min={0} max={reward.num} />
							<Label id="ProgressText" text={`${Round(Math.min(reward.num, progress()) / reward.num * 100, 2)}%`} />
						</Panel>
						<Image id="Gift" />
					</Panel>;
				}}</For>
				<EOM_Button horizontalAlign="center" marginTop="20px" enabled={canReceiveAll()} text={GetLocalization("#ReceiveAll")} onactivate={panel => {
					panel.enabled = false;
					CallActionRequest("/v1/activity/batch_receive_rewards", { activity_id: activityID() }, () => { panel.enabled = true; });
				}} />
			</Panel>
		</Panel>
	</Panel>;
};
