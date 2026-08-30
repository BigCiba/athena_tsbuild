import classNames from "classnames";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { createServiceNetData } from "../../utils/solid_utils";
import { EOM_RedMark } from "../EOMDesign/DataDisplay/EOM_RedMark/EOM_RedMark";
import { EOM_BaseButton } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import { RecycleView, RecycleViewHandle } from "../RecycleView/RecycleView";
import { HeroSmallAvatar } from "./hero_avatar";
import "./hero_selection_bar.less";
export const HeroSelectionBar = (props: {
	selecteHeroName?: string;
	onchange?: (heroName: string, heroID: HeroID) => void;
	redPoints?: () => Record<string, boolean>;
}) => {
	let heroListRef: Panel | undefined;
	const player_heroes = createServiceNetData("player_heroes", {});
	const heroList = createMemo(() => {
		let heroes = player_heroes() ?? {};
		return Object.keys(KeyValues.heroes).sort((a, b) => {
			const heroIDA = GetHeroIDByHeroName(a)!;
			const heroIDB = GetHeroIDByHeroName(b)!;
			return (heroes[heroIDB]?.star ?? 0) - (heroes[heroIDA]?.star ?? 0);
		});
	});
	const [selectHeroName, setSelectHeroName] = createSignal(props.selecteHeroName ?? "npc_dota_hero_alp");
	createEffect(() => {
		if (props.selecteHeroName != undefined) {
			setSelectHeroName(props.selecteHeroName);
		}
	});
	let refList: RecycleViewHandle | undefined;
	const [scrollPercent, SetScrollPercent] = createSignal(0);
	return <Panel id="HeroSelectionBar">
		<EOM_BaseButton id="LeftArrow" class="HeroSelectionArrow" enabled={scrollPercent() > 0} onactivate={() => refList?.scroll(0, { bSet: true })} />
		<Panel id="HeroListContainer">
			<Panel id="Line" />
			<RecycleView id="HeroSelectionList" input={heroList} direction="Horizontal"
				childConfig={{ width: 72, height: 72, margin_left: 5, margin_right: 5 }}
				showBar={false} handle={h => refList = h}
				onScrollPercent={(percent) => SetScrollPercent(percent)}
			>
				{heroName => {
					const currentHeroName = () => heroName();
					const heroID = GetHeroIDByHeroName(currentHeroName())!;
					return <Panel id="HeroIconContainer" class={classNames({ Disabled: player_heroes()[heroID] == undefined })}
						onactivate={() => {
							const nextHeroName = currentHeroName();
							setSelectHeroName(nextHeroName);
							props.onchange?.(nextHeroName, heroID);
						}}
						onload={self => {
							if (selectHeroName() == currentHeroName()) {
								self.ScrollParentToMakePanelFit(3, false);
							}
						}}
					>
						<HeroSmallAvatar id="HeroIcon" heroname={currentHeroName()} quality={1} selected={selectHeroName() == currentHeroName()} />
						<Show when={props.redPoints?.()[String(heroID)]}>
							<EOM_RedMark hittest={false} />
						</Show>
					</Panel>;
				}}
			</RecycleView>
		</Panel>
		<EOM_BaseButton id="RightArrow" class="HeroSelectionArrow" enabled={scrollPercent() < 1} onactivate={() => refList?.scroll(100, { bSet: true, bPercent: true })} />
	</Panel>;
};
