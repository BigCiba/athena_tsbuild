import { mergeProps, splitProps } from "solid-js";
import { EOM_HeroImage } from "../EOMDesign/DataDisplay/EOM_HeroImage/EOM_HeroImage";
import "./hero_avatar.less";

interface HeroSmallAvatar_Props extends PanelAttributes {
	heroname: string,
	quality: number,
	selected?: boolean;
}

export function HeroSmallAvatar(props: HeroSmallAvatar_Props) {
	const merged = mergeProps({ selected: false }, props);
	const [local, others] = splitProps(merged, ["heroname", "quality", "selected",]);
	// let particlePanel: ParticleScenePanel | undefined
	return (
		<Panel {...others} className={"HeroSmallAvatar Quality_" + local.quality} classList={{ Selected: local.selected }}>
			<EOM_HeroImage id="HeroMidIconContainer" heroimagestyle="icon" heroname={local.heroname} />
			<Panel id="Selected" />
		</Panel>
	);
}
