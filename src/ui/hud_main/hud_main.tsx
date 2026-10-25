import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { Show } from "solid-js";
import { GameVote } from "../../components/game_lifecycle/GameVote";
import { RunResourcesPanel } from "../../components/game_lifecycle/RunResourcesPanel";
import { ShopPanel } from "../../components/shop/ShopPanel";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import { TaskPanel } from "../../components/task/TaskPanel";
import { createNetDataSignal } from "../../utils/solid_utils";
import "./hud_main.less";

function HudMain() {
	const state = createNetDataSignal("common", "game_state");
	const resources = useNetTable("common", "run_resources");
	const gold = () => resources()?.run_id === state()?.run_id ? resources()?.players[String(Players.GetLocalPlayer())]?.gold ?? 0 : 0;

	GetLocalization("#TowerProtect_description")
	return <Panel id="AthenaMainRoot" hittest={false}>
		<RunResourcesPanel snapshot={state()} />
		<ShopPanel snapshot={state()} />
		<Show when={state()?.state === "GameState_Battle"}><TaskPanel runId={state()?.run_id ?? 0} /></Show>
		<Show when={state()?.state === "GameState_Battle" && state()?.vote}>
			<Panel class="AthenaBattleVote" hittest={true}>
				<GameVote snapshot={state()} />
			</Panel>
		</Show>
		{/* 小地图 */}
		<Panel id="MinimapContainer">
			<DOTAMinimap />
			<Panel class="GlyphScan">
				<Button
					class="TowerUpgrade"
					titleTooltip={{
						title: `${GetLocalization("#TowerUpgradeTitle")}（${Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_RADAR)}）`,
						text: GetLocalization("#TowerUpgrade_description") + `<font color='#ffcc33'>${GetLocalization("#TowerUpgrade_Cost") + (0)}</font>`
					}}
					enabled
					onactivate={self => GameEvents.SendCustomGameEventToServer("active_scan", {})}
				>
					<Panel class="TowerUpgradeIcon" />
					<Panel class="CooldownCover" style={{ clip: "radial(50% 50% ,0deg,-311deg)" }} />
				</Button>
				<Button
					class={classNames("TowerProtect", { Cooldown: true })}
					enabled={!true}
					onactivate={self => GameEvents.SendCustomGameEventToServer("active_glyph", {})}
					titleTooltip={{
						title: GetLocalization("#TowerProtectTitle") + `（${Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_GLYPH)}）`,
						text: GetLocalization("#TowerProtect_description")
					}}
				>
					<Panel class="TowerProtectIcon" />
					<Panel class="CooldownCover" style={{ clip: `radial(50% 50% ,0deg,${180}deg)` }} />
				</Button>
			</Panel>
		</Panel>
		{/* 操作面板 */}
		<Panel id="ActionPanel" >
			<Panel id="LeftPart">
				<DOTAPortrait />
				<Panel id="LeftPartSkin" />
			</Panel>
			<Panel id="CenterPart">

			</Panel>
			<Panel id="RightPart">

			</Panel>
		</Panel>
		{/* 商店 */}
		<Panel id="ShopPanel">
			<Panel id="shop_launcher_bg" >
				<Panel id="HUDSkinFXGold" class="GleamPanel" hittest={false} />
			</Panel>
			<Button id="ShopButton" enabled={state()?.state === "GameState_Battle"} onactivate={() => ToggleWindow("shop")}>
				<Label id="CustomGoldLabel" hittest={false} class="MonoNumbersFont ShopButtonValueLabel" text={Math.floor(gold())} />
				<Panel id="CustomGoldIcon" hittest={false} />
			</Button>
			<Button class="NextRound" tooltip="#NextRound" onactivate={() => { GameEvents.SendCustomGameEventToServer("next_round", {}); }}>
				<Panel class="NextRoundIcon" />
				<Panel class="CooldownCover" style={{ clip: "radial(50% 50% ,0deg,-360deg)" }} />
			</Button>
		</Panel>
	</Panel>;
}

render(HudMain, $.GetContextPanel());
