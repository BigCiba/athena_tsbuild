import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import { EOM_Button } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import "./TaskPanel.less";

/** 原版任务列表与 NPC 对话；客户端只发送交互、放弃和标记意图。 */
export function TaskPanel(props: { runId: number; }) {
	const tasks = useNetTable("common", "player_tasks");
	const definitions = useNetTable("common", "task_definitions");
	const npcs = useNetTable("common", "npcs");
	const [expanded, setExpanded] = createSignal(true);
	const [dialog, setDialog] = createSignal<CustomGameEventDeclarations["task_dialog"]>();
	const player = () => tasks()?.[String(Players.GetLocalPlayer())];
	const names = () => [...Object.keys(player()?.tInProgress ?? {}), ...Object.keys(player()?.tComplete ?? {}).filter(name => player()?.tComplete[name] === 2)]
		.filter(name => !(definitions()?.[name]?.TaskTag ?? "").split(",").includes("TASK_TAG_HIDE"));
	const localize = (key: string) => { const text = $.Localize("#" + key); return text === "#" + key ? key : text; };
	onMount(() => {
		const id = GameEvents.Subscribe("task_dialog", event => { if (event.runId === props.runId) setDialog(event); });
		onCleanup(() => GameEvents.Unsubscribe(id));
	});
	const rewardText = (reward: NonNullable<AthenaTaskDefinition["TaskReward"]>[string]) => {
		if (reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER") return "专属装备";
		if (reward.TaskRewardType === "TASK_REWARD_TYPE_REBORN") return "转生";
		return (reward.TaskRewardName ?? "").split("|").map(part => {
			const [name, amount] = part.split(","); return `${localize(name)} × ${amount ?? 1}`;
		}).join("、");
	};
	return <>
		<Panel id="TaskMain" classList={{ Expand: expanded() }} hittest={true}>
			<Panel class="TaskTitle"><Label text={localize("questtitle")} /><Button class="ExpandButton" onactivate={() => setExpanded(!expanded())}><Label text={expanded() ? "«" : "»"} /></Button></Panel>
			<Show when={expanded()}>
				<Panel class="TaskList">
					<For each={names()}>{name => {
						const definition = () => definitions()?.[name];
						const complete = () => player()?.tComplete[name] === 2;
						return <Panel class="TaskContainer" classList={{ Complete: complete() }}>
							<Panel class="SelectedBar" />
							<Panel class="EntryTitles">
								<Label class="TaskName" text={localize("TaskTitle_" + name)} />
								<Panel flowChildren="right"><For each={(definition()?.TaskTag ?? "").split(",").filter(Boolean)}>{tag => <Label class="TaskTag" text={localize(tag)} />}</For></Panel>
								<Panel class="TaskButtonList">
									<Show when={!complete() && !(definition()?.TaskTag ?? "").includes("TASK_TAG_CANT_ABANDONED")}><EOM_Button size="Small" text={localize("TaskGiveUp")} onactivate={() => GameEvents.SendCustomEventToServer("task_remove", { taskname: name, runId: props.runId })} /></Show>
									<Show when={Object.values(definition()?.TaskStage ?? {}).some(stage => stage.TaskPosition)}><EOM_Button size="Small" text={localize("TaskMark")} onactivate={() => GameEvents.SendCustomEventToServer("task_mark", { taskname: name, runId: props.runId })} /></Show>
								</Panel>
								<Label class="TaskRequireTitle" text={localize("TaskRequire")} />
								<For each={Object.keys(definition()?.TaskStage ?? {})}>{key => <Panel class="TaskRequireRow">
									<Label class="TaskRequire" text={localize(`Task_${name}_${key}`)} />
									<Label class="TaskProgress" text={complete() ? "已完成" : `${player()?.tInProgress[name]?.tStageProgress[key] ?? 0}/${definition()?.TaskStage[key].TaskStageCount}`} />
								</Panel>}</For>
								<Label class="TaskRequireTitle" text={localize("TaskReward")} />
								<Panel class="TaskRewardRow"><For each={Object.values(definition()?.TaskReward ?? {})}>{reward => <Show when={reward.TaskRewardType === "TASK_REWARD_TYPE_ITEM" || reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER"} fallback={<Label class="TaskReward_Attribute" text={rewardText(reward)} />}>
									<For each={reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER" ? ["item_" + Players.GetPlayerSelectedHero(Players.GetLocalPlayer())] : (reward.TaskRewardName ?? "").split("|").map(part => part.split(",")[0].trim())}>{item => <DOTAItemImage class="TaskReward_Item" itemname={item} showtooltip={true} />}</For>
								</Show>}</For></Panel>
								<Show when={player()?.rewardErrors[name]}><Label class="TaskRewardError" text={localize(player()?.rewardErrors[name] ?? "")} /></Show>
								<Show when={player()?.rewardErrors[name] && Number(definition()?.AutoComplete) === 1}><EOM_Button size="Small" text="重试领奖" onactivate={() => GameEvents.SendCustomEventToServer("task_claim", { taskname: name, runId: props.runId })} /></Show>
							</Panel>
						</Panel>;
					}}</For>
				</Panel>
			</Show>
		</Panel>
		<Show when={dialog()}>{(value: () => CustomGameEventDeclarations["task_dialog"]) => <Panel class="TaskNPCDialog" hittest={true}>
			<Label class="TaskNPCName" text={localize(npcs()?.[String(value().npc)]?.name ?? "")} />
			<Label class="TaskNPCText" text={localize(value().text)} />
			<Panel class="TaskNPCActions">
				<EOM_Button text="交谈" onactivate={() => GameEvents.SendCustomEventToServer("npc_interact", { npc: value().npc, runId: props.runId })} />
				<EOM_Button text="关闭" onactivate={() => setDialog(undefined)} />
			</Panel>
		</Panel>}</Show>
	</>;
}
