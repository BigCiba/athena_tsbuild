import classNames from "classnames";
import { mergeProps, ParentComponent } from "solid-js";
import { EOM_BaseButton } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import { StoreItemImage } from "../StoreItem/StoreItem";
import "./weapon_card.less";
import { Weapon3DPreview } from "../portraits/weapon3DPreview/weapon3DPreview";

export const WeaponCard: ParentComponent<PanelAttributes<Button> & { weapon_id: string | number; selected?: boolean; }> = (props) => {
	const weaponKV = () => KeyValues.weapon[props.weapon_id];
	return <EOM_BaseButton {...mergeProps(props, { class: classNames("WeaponCard", { Selected: props.selected == true }, props.class) })}>
		<DOTAParticleScenePanel class="BorderParticle" particleName="particles/ui/game/ui_game_general_special_effects_03_fx.vpcf" cameraOrigin="0 0 90" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
		<Panel id="WeaponCardBG" />
		<StoreItemImage itemid={props.weapon_id} />
		{/* <Weapon3DPreview hittest={false} hittestchildren={false} model={weaponKV()?.model ?? ""} defaultConfig={weaponKV()?.hero} /> */}
		<Panel id="WeaponCardBorder" hittest={false} />
	</EOM_BaseButton>;
};