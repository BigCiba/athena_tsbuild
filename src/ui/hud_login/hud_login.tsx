import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createEffect, createMemo, createSignal, For, on, Show } from "solid-js";
import { EOM_Popup } from "../../components/EOMDesign/Container/EOM_Popup/EOM_Popup";
import { EOM_Countdown } from "../../components/EOMDesign/DataDisplay/EOM_Countdown/EOM_Countdown";
import { EOM_Loading } from "../../components/EOMDesign/DataDisplay/EOM_Loading/EOM_Loading";
import { EOM_BaseButton, EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { createNetDataSignal } from "../../utils/solid_utils";

const LOGIN_FLOW_STEPS = [
	{ key: "login", label: "#LoginStep_login" },
	{ key: "setting", label: "#LoginStep_setting" },
] as const;

const gameState = createNetDataSignal("common", "game_state", {
	state: "GameState_Login",
	start_time: -1,
	end_time: -1,
});
const loginState = createNetDataSignal("common", "login_state", {});
const settings = createNetDataSignal("common", "settings", {
	is_local_host: false,
	is_in_tools_mode: false,
	is_cheat_mode: false,
});

createEffect(on([gameState], () => {
	$.GetContextPanel().SwitchClass("GameState_Login", gameState().state);
}));

function Root() {
	const [inviteKey, setInviteKey] = createSignal("");
	const [submittingInviteKey, setSubmittingInviteKey] = createSignal(false);
	const [authPassword, setAuthPassword] = createSignal("");
	const [submittingAuth, setSubmittingAuth] = createSignal(false);
	const localPlayerLoginState = createMemo(() => loginState()?.[Players.GetLocalPlayer()]?.state ?? PlayerLoginState.None);
	const localPlayerSteps = createMemo(() => loginState()?.[Players.GetLocalPlayer()]?.steps);
	const isLocalHost = createMemo(() => settings()?.is_local_host == true || settings()?.is_local_host);

	createEffect(on(localPlayerLoginState, (state) => {
		print(localPlayerLoginState());
		if (state != PlayerLoginState.NoPermission) {
			setSubmittingInviteKey(false);
		}
		if (state != PlayerLoginState.NeedAuth) {
			setSubmittingAuth(false);
		}
	}));

	const submitInviteKey = () => {
		let key = inviteKey().trim();
		if (key === "") return;
		setSubmittingInviteKey(true);
		CallAction("/v1/white_list/add", { key });
		GameEvents.SendCustomEventToServer("login_retry_white_list", {});
	};

	const submitAuthPassword = () => {
		let password = authPassword().trim();
		if (password === "") return;
		setSubmittingAuth(true);
		CallAction("/v1/player/auth_login", { password });
	};

	return <>
		<EOM_BaseButton id="Return" class="MenuButton" onactivate={self => $.DispatchEvent("DOTAHUDShowDashboard", self)}>
			<Panel id="SelectedHover" />
			<Panel id="SelectParticleRoot">
				<DOTAParticleScenePanel id="SelectParticle" particleName="particles/ui/game/ui_game_general_special_effects_02_fx.vpcf" cameraOrigin="0 0 60" fov={40} lookAt="0 0 0" hittest={false} squarePixels />
			</Panel>
			<Panel class={classNames("BGImage", "Return")} />
			<Label class={classNames("MenuLabel", "Return")} text="#MenuButton_Return" />
		</EOM_BaseButton>
		<Panel id="PlayerReadyUp" >
			<For each={Object.keys(loginState())} >
				{(_, index) => {
					const playerID = () => toFiniteNumber(_) as PlayerID;
					const playerSteamID = () => {
						return Game.GetPlayerInfo(playerID())?.player_steamid;
					};
					const state = () => {
						return loginState()?.[playerID()]?.state ?? PlayerLoginState.None;
					};

					return <Panel class={classNames("PlayerReadySlot", { Accepted: state() == PlayerLoginState.Success, Declined: state() != PlayerLoginState.Success })} >
						<DOTAAvatarImage id="AvatarImage" steamid={playerSteamID()} width="100%" height="100%" hittest={false} />
						<Panel class="AcceptedMatch" hittest={false} />
						<Panel class="DeclinedMatch" hittest={false} />
					</Panel>;
				}}
			</For>
		</Panel>
		<Show when={localPlayerSteps()}>
			{() => (
				<Panel id="LoginStepsContainer">
					<For each={LOGIN_FLOW_STEPS}>
						{(step, index) => {
							const completed = () => localPlayerSteps()?.[step.key] ?? false;
							return <Panel class={classNames("LoginStepItem", { Completed: completed() })}>
								<Panel class="LoginStepIndicator" />
								<Label class="LoginStepLabel" color="white" text={`${index() + 1}. ${GetLocalization(step.label)}`} />
							</Panel>;
						}}
					</For>
				</Panel>
			)}
		</Show>
		<Show when={localPlayerLoginState() == PlayerLoginState.None} >
			<Panel id="LoadingContainer" >
				<EOM_Loading id="Loading" />
				<Label color="white" text="#Login_Loading" horizontalAlign="center" marginTop="20px" />
			</Panel>
		</Show>
		<Show when={isLocalHost() && localPlayerLoginState() == PlayerLoginState.NeedAuth} >
			<Panel id="InviteKey">
				<Panel id="InviteKeyContainer" >
					<Label id="InviteKeyTitle" text="#Login_LocalAuth_Title" />
					<Label id="InviteKeyDesc" html text="#Login_LocalAuth_Desc" />
					<Panel id="InviteKeyForm">
						<EOM_TextEntry id="InviteKeyEntry" textmode="password" text={authPassword()} placeholder={"#Login_LocalAuth_Placeholder"} onChange={(self, _, text) => setAuthPassword(text)} oninputsubmit={submitAuthPassword} />
						<EOM_Button id="InviteKeyConfirm" enabled={!submittingAuth() && authPassword().trim() !== ""} size="Small" text={submittingAuth() ? GetLocalization("#Login_Submitting") : GetLocalization("#Login_Unlock")} onactivate={submitAuthPassword} />
					</Panel>
				</Panel>
			</Panel>
		</Show>
		<Show when={localPlayerLoginState() == PlayerLoginState.NoPermission} >
			<Panel id="InviteKey">
				<Panel id="InviteKeyContainer" >
					<Label id="InviteKeyTitle" text="#Login_NoPermission_Title" />
					<Label id="InviteKeyDesc" text="#Login_NoPermission_Desc" />
					<Panel id="InviteKeyForm">
						<EOM_TextEntry id="InviteKeyEntry" text={inviteKey()} placeholder={"#Login_InviteKey_Placeholder"} onChange={(self, _, text) => setInviteKey(text)} oninputsubmit={submitInviteKey} />
						<EOM_Button id="InviteKeyConfirm" enabled={!submittingInviteKey() && inviteKey().trim() !== ""} size="Small" text={submittingInviteKey() ? GetLocalization("#Login_Submitting") : GetLocalization("#Login_Unlock")} onactivate={submitInviteKey} />
					</Panel>
				</Panel>
			</Panel>
		</Show>
		<Show when={loginState()?.[Players.GetLocalPlayer()]?.state == PlayerLoginState.Banned}>
			<EOM_Popup id="BannedContainer" size="normal" class="EOM_PopupMainShow" hideClose title="Login_Banned">
				<Label id="BannedContent" text="#Login_Banned_Content" html />
				<Panel id="BanCountdownContainer">
					<Label text="#Login_Banned_Endtime" />
					<EOM_Countdown id="BanCountdown" endTime={loginState()?.[Players.GetLocalPlayer()]?.ban_end_time ?? 0} />
				</Panel>
				<Panel flowChildren="down" align="right bottom" marginBottom="20px">
					<Panel id="BanQrCode" class={Language()} />
					<Label id="BanContact" text="#BanContact" />
				</Panel>
			</EOM_Popup>
		</Show>
	</>;
}

(() => {
	$.GetContextPanel().SetPanelEvent("onactivate", () => { }); // 用于防止可以点穿操作

	render(() => <Root />, $.GetContextPanel());
})();
