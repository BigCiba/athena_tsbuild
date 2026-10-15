import { For, createSignal, onCleanup } from "solid-js";
import { sendGameAction } from "../game_lifecycle/GameVote";
import { heroPreviewIDs } from "./hero_preview_ids";
import "./HeroSelection.less";

type HeroKV = Record<string, string | number | undefined>;

/** 沿用 reborn 的可见英雄规则；英雄与技能数据直接读取当前项目 KV。 */
export function selectableHeroes(heroes: Record<string, HeroKV>) {
	return Object.keys(heroes).filter(name => name.startsWith("npc_dota_hero_") && Number(heroes[name].IsHero) === 1 && heroes[name].UnitLabel !== "hide");
}

/** reborn 的前六个技能槽，过滤空槽和隐藏技能。 */
export function previewAbilities(hero: HeroKV | undefined) {
	return Array.from({ length: 6 }, (_, index) => String(hero?.[`Ability${index + 1}`] ?? "")).filter(name => name !== "" && name !== "generic_hidden");
}

const difficulties = [
	"Easy", "Common", "Hard", "Nightmare", "Hell",
];

/** 原版账号等级规则；尚无 Score 时沿用原版初始等级 1。 */
export function playerLevelFromScore(score: unknown) {
	return score !== undefined && Number.isFinite(Number(score)) ? Math.floor(Number(score) / 10) : 1;
}

/** 保留 reborn 玩家条的头像、Steam 名称与右侧等级徽章。 */
function PlayerCard(props: { playerID: PlayerID; }) {
	const key = `player_${props.playerID}`;
	const steamID = Game.GetPlayerInfo(props.playerID)?.player_steamid ?? "0";
	const readLevel = () => playerLevelFromScore(CustomNetTables.GetTableValue("service", key)?.Score);
	const [level, setLevel] = createSignal(readLevel());
	const listener = CustomNetTables.SubscribeNetTableListener("service", (_table, changedKey, value) => {
		if (changedKey === key) setLevel(playerLevelFromScore(value?.Score));
	});
	onCleanup(() => CustomNetTables.UnsubscribeNetTableListener(listener));
	return <Panel class="PlayerContainer">
		<DOTAAvatarImage class="AvatarAndHero" steamid={steamID} style={{ width: "54px", height: "54px", zIndex: 10, verticalAlign: "center", marginLeft: "20px", boxShadow: "#000000aa 0px 0px 5px 0px" }} />
		<Panel class="PlayerBackground"><Panel class="UserInfoContainer"><DOTAUserName class="UserName" steamid={steamID} /></Panel></Panel>
		<Panel class="PlayerLevelContent">
			<Image src={`s2r://panorama/images/profile_badges/bg_0${Math.ceil(level() / 100)}_psd.vtex`} />
			<Image src={`s2r://panorama/images/profile_badges/level_${(`0${level()}`).slice(-2)}_png.vtex`} />
			<Image src={`s2r://panorama/images/profile_badges/bg_number_0${Math.ceil(level() / 100)}_psd.vtex`}><Label id="ProfileLevelText" text={String(level())} /></Image>
		</Panel>
	</Panel>;
}

/** reborn 选人页面的 Solid 版本。由 HUD 阶段挂载，重开时可再次使用，不依赖引擎首次选人状态。 */
export function HeroSelection(props: { snapshot: AthenaGameSnapshot | undefined; }) {
	const heroes = GameUI.CustomUIConfig().npc_heroes_custom as unknown as Record<string, HeroKV>;
	const heroNames = selectableHeroes(heroes ?? {});
	const playerID = Players.GetLocalPlayer();
	const player = () => props.snapshot?.players?.[playerID];
	const preparing = () => props.snapshot?.state === "GameState_Prepare";
	const canPick = () => preparing() && !!player()?.online && !player()?.ready;
	const canVote = () => !!player()?.online && (preparing() || (props.snapshot?.state === "GameState_DiffSelection" && !!props.snapshot.participants?.includes(playerID)));
	const heroName = () => player()?.hero ?? heroNames[0] ?? "npc_dota_hero_omniknight";
	const heroData = () => heroes?.[heroName()];
	const displayName = () => { const name = $.Localize(`#${heroName()}`); return name !== `#${heroName()}` ? name : String(heroData()?.Name ?? heroName()); };
	const [now, setNow] = createSignal(Game.GetGameTime());
	const timer = setInterval(() => setNow(Game.GetGameTime()), 200);
	onCleanup(() => clearInterval(timer));
	const countdown = () => Math.max(0, Math.ceil((props.snapshot?.end_time ?? now()) - now()));
	const attribute = () => {
		const primary = heroData()?.AttributePrimary;
		return primary === "DOTA_ATTRIBUTE_AGILITY" ? "agility" : primary === "DOTA_ATTRIBUTE_INTELLECT" ? "intelligence" : primary === "DOTA_ATTRIBUTE_ALL" ? "all" : "strength";
	};
	return <Panel class="AthenaHeroSelection" hittest={false}>
		<Panel class="HeroSelectionRoot" hittest={false}>
			<MoviePanel id="BackgroundImage" class="HeroSelectionBackgroundScene" src="file://{resources}/videos/ti10_aegis_frontpage.webm" repeat autoplay="onload" hittest={false} />
			<Panel class="MainSelectionPage">
				<Panel class="SideBar">
					<Panel class="PlayerList">
						<For each={Object.keys(props.snapshot?.players ?? {})}>{key => <PlayerCard playerID={Number(key) as PlayerID} />}</For>
					</Panel>
					<Panel class="DiffList">
						<For each={difficulties}>{(difficulty, index) => <TabButton class={`DiffButton GameMode_${difficulty}`} group="diffGroup" selected={player()?.difficulty === index() + 1} enabled={canVote()} onactivate={() => {
							if (canVote()) sendGameAction(props.snapshot, { action: "difficulty", difficulty: index() + 1 });
						}}>
							<Image class="DiffIcon" src={`s2r://panorama/images/hero_badges/hero_badge_rank_${index()}_png.vtex`} />
							<Label text={$.Localize(`#GameMode_${difficulty}`)} />
						</TabButton>}</For>
					</Panel>
				</Panel>
				<Panel class="MainPage">
					<Panel class="TimerContent"><Label text={preparing() ? "00" : String(countdown() % 60).padStart(2, "0")} /></Panel>
					<Panel class="HeroListAndChat">
						<Panel class="HeroList">
							<For each={heroNames}>{name => <TabButton class="HeroCard Unlock" group="athenaHeroes" selected={name === heroName()} enabled={canPick()} onactivate={() => {
								if (canPick()) sendGameAction(props.snapshot, { action: "select_hero", hero: name });
							}}><DOTAHeroMovie heroname={name} hittest={false} /></TabButton>}</For>
						</Panel>
						{/* 库存与装备接口尚未迁移，保留原版栏位及默认图，不发送旧后端请求。 */}
						<Panel id="HeroSettingPanel">
							<Panel id="SettingPet" class="SettingPanel"><Panel id="MenuArrowContainer"><Panel id="MenuArrow" /></Panel><Image class="SettingIcon" src="s2r://panorama/images/custom_game/hero_selection/pet_default_png.vtex" scaling="stretch-to-cover-preserve-aspect" /><Label text={$.Localize("#Category_pet")} /></Panel>
							<Panel id="SettingSkin" class="SettingPanel"><Panel id="MenuArrowContainer"><Panel id="MenuArrow" /></Panel><Image class="SettingIcon" src="s2r://panorama/images/custom_game/hero_selection/skin_default_png.vtex" scaling="stretch-to-cover-preserve-aspect" /><Label text={$.Localize("#Category_skin")} /></Panel>
							<Panel id="SettingParticle" class="SettingPanel"><Panel id="MenuArrowContainer"><Panel id="MenuArrow" /></Panel><Image class="SettingIcon" src="s2r://panorama/images/custom_game/hero_selection/particle_default_png.vtex" scaling="stretch-to-cover-preserve-aspect" /><Label text={$.Localize("#Category_particle")} /></Panel>
						</Panel>
					</Panel>
					<Panel id="HeroInfoContent">
						<Panel id="HeroDataPanel">
							<Panel id="HeroNamePanel"><Image id="PrimaryAttributeImage" src={`s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_${attribute()}_psd.vtex`} /><Label text={displayName()} /></Panel>
							<Panel id="HeroAbilityPanel"><For each={previewAbilities(heroData())}>{name => <DOTAAbilityImage class="HeroAbility" abilityname={name} onmouseover={self => $.DispatchEvent("DOTAShowAbilityTooltip", self, name)} onmouseout={self => $.DispatchEvent("DOTAHideAbilityTooltip", self)} />}</For></Panel>
							<Button id="HeroSelectPanel" enabled={canPick() && heroNames.includes(heroName())} onactivate={() => {
								if (canPick() && heroNames.includes(heroName())) sendGameAction(props.snapshot, { action: "ready", ready: true });
							}}><Label text={$.Localize("#SelectHero")} /></Button>
						</Panel>
					</Panel>
					<Panel id="HeroScenePanel" hittest={false} hittestchildren={false}>
						<For each={[heroName()]}>{name => {
							let initialized = false;
							return <DOTAScenePanel class="HeroScene" unit={name} light="global_light" antialias drawbackground={false} particleonly={false} hittest={false} hittestchildren={false} onload={self => {
								// 设置模型可能再次触发 onload，每个预览面板只初始化一次。
								if (initialized) return;
								initialized = true;
								const heroID = Number(heroes?.[name]?.HeroID ?? heroPreviewIDs[name]);
								if (heroID > 0) self.SetScenePanelToLocalHero(heroID as HeroID);
							}} />;
						}}</For>
					</Panel>
				</Panel>
			</Panel>
		</Panel>
	</Panel>;
}
