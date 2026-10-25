import { Show } from "solid-js";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import "./RunResourcesPanel.less";

/** 只展示当前局、当前玩家的服务端快照；账号余额不参与局内 HUD。 */
export function RunResourcesPanel(props: { snapshot?: AthenaGameSnapshot; }) {
	const resources = useNetTable("common", "run_resources");
	const player = () => {
		const data = resources(), state = props.snapshot;
		if (!data || !state || data.run_id !== state.run_id || (state.state !== "GameState_Battle" && state.state !== "GameState_Settle")) return undefined;
		return data.players[String(Players.GetLocalPlayer())];
	};
	const number = (value: number | undefined) => Math.floor(value ?? 0).toString();
	const progress = () => Math.min(100, Math.max(0, (player()?.level_exp ?? 0) / (player()?.next_level_exp || 1) * 100));
	return <Show when={player()}>
		<Panel id="AthenaResources" hittest={false}>
			<Panel class="AthenaResourceRow">
				<Label class="ResourceName" text="#CUSTOM_RESOURCE_TYPE_GOLD" /><Label id="AthenaGold" class="GoldValue" text={number(player()?.gold)} />
				<Label class="ResourceName" text="#CUSTOM_RESOURCE_TYPE_CRYSTAL" /><Label id="AthenaCrystal" class="CrystalValue" text={number(player()?.crystal)} />
				<Label class="ResourceName" text="#CUSTOM_RESOURCE_TYPE_SCORE" /><Label id="AthenaScore" class="ScoreValue" text={number(player()?.score)} />
			</Panel>
			<Panel class="AthenaResourceRow">
				<Label id="AthenaHeroLevel" text={`Lv. ${player()?.level ?? 1}`} />
				<Label class="ResourceName" text="#CUSTOM_RESOURCE_TYPE_EXP" />
				<Label id="AthenaExperience" text={player()?.next_level_exp ? `${number(player()?.level_exp)} / ${number(player()?.next_level_exp)}` : "MAX"} />
			</Panel>
			<Panel class="AthenaExperienceTrack"><Panel class="AthenaExperienceFill" style={{ width: `${player()?.next_level_exp ? progress() : 100}%` }} /></Panel>
		</Panel>
	</Show>;
}
