import classNames from "classnames";
import { createEffect, mergeProps, Show, splitProps } from "solid-js";
import { EOM_BaseButton } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import { StoreItemImage } from "../StoreItem/StoreItem";
import "./courier_card.less";

interface CourierCard_Props extends PanelAttributes {
	courier_id: number | string,
	quality?: number,
	star?: number,
	// 出战
	equipped?: boolean,
	// 助战
	assisted?: boolean,
	// 选中
	selected?: boolean,
	// 已探险
	explored?: boolean;
	// 显示锁定状态
	showLock?: boolean,
	toolOnly?: boolean,
	hideTips?: boolean,
}

export function CourierCard(props: CourierCard_Props) {
	const [local, others] = splitProps(
		mergeProps({ quality: 0, star: 0, equipped: false, assisted: false, showLock: true, toolOnly: false }, props),
		["courier_id", "star", "quality", "equipped", "assisted", "explored", "class", "selected", "toolOnly", "showLock", "hideTips"]
	);

	return (
		<EOM_BaseButton {...others} class={classNames(local.class, "CourierCard", "Rarity" + local.quality, {
			Selected: local.selected,
			Unlock: local.star > 0 || local.showLock == false,
			Equiped: local.equipped,
			Assisted: local.assisted,
			Explored: local.explored,
		})} hittestchildren={false}>
			<Show when={local.selected}>
				<DOTAParticleScenePanel id="BorderParticle" particleName="particles/ui/game/ui_game_general_special_effects_03_fx.vpcf" cameraOrigin="0 0 93" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
			</Show>
			<Image class="CourierBG" />
			<StoreItemImage itemid={local.courier_id} hideTips={local.hideTips} />
			<Image class="CourierAssisted" >
				<Label text="#courier_assisted" />
			</Image>
			<Show when={local.toolOnly}>
				<Label class="CourierInTool" text="ToolOnly" />
			</Show>
			<Image class="CourierBorder" hittest={false} />
			<Image class="CourierEquiped" hittest={false}>
				<Label text="#courier_equipped" />
			</Image>
			<Image class="CourierExplored" hittest={false}>
			</Image>
			<Image class="CourierLock" hittest={false} />
			{/* <Panel class="CourierCardStarList">
				<For each={[1, 2, 3, 4, 5, 6]}>
					{(idx) => {
						return <Image class={classNames("CourierStar Unlock")} visible={local.star >= idx} />;
					}}
				</For>
			</Panel> */}
		</EOM_BaseButton>
	);
}
