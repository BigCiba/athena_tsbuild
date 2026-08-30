import classNames from "classnames";
import { mergeProps, ParentComponent } from "solid-js";
import { EOM_HeroImage } from "../EOMDesign/DataDisplay/EOM_HeroImage/EOM_HeroImage";
import { EOM_BaseButton } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import "./hero_card.less";

export const HeroCard: ParentComponent<PanelAttributes<Button> & { heroName: string; selected?: boolean; }> = (props) => {
	return <EOM_BaseButton {...mergeProps(props, { class: classNames("HeroCard", { Selected: props.selected == true }, props.class) })}>
		<DOTAParticleScenePanel class="BorderParticle" particleName="particles/ui/game/ui_game_general_special_effects_03_fx.vpcf" cameraOrigin="0 0 90" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
		<Panel id="HeroCardBG" />
		<EOM_HeroImage heroname={props.heroName} heroimagestyle="portrait" opacityMask={getImagePath("h2_hero/h2_mask.png")} />
		<Panel id="HeroCardBorder" />
	</EOM_BaseButton>;
};