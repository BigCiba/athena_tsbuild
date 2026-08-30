import classNames from "classnames";
import { createMemo, mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_HeroImage.less";
export interface EOM_HeroImageAttribute extends ImageAttributes {
	heroname?: string;
	heroid?: HeroID;
	/** icon: 小头像，portrait: 竖排的卡片头像，landscape: 横排的卡片头像 */
	heroimagestyle: 'icon' | 'portrait' | 'landscape';
}
export const EOM_HeroImage: ParentComponent<EOM_HeroImageAttribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_HeroImage", props.heroimagestyle ?? "landscape", props.class) });
	const [local, others] = splitProps(merged, ["children", "heroname", "heroid", "heroimagestyle"]);
	const src = createMemo(() => {
		let prefix = "";
		if (local.heroimagestyle == 'icon') {
			prefix = "icons/";
		} else if (local.heroimagestyle == 'portrait') {
			prefix = "selection/";
		}
		if (local.heroname != undefined) {
			return `s2r://panorama/images/heroes/${prefix}${local.heroname}_png.vtex`;
		} else if (local.heroid != undefined) {
			return `s2r://panorama/images/heroes/${prefix}${GetHeroNameByHeroID(local.heroid)}_png.vtex`;
		}
		return "";
	});
	return (
		<Image {...others} src={src()} scaling="stretch-to-cover-preserve-aspect">
			{local.children}
		</Image>
	);
};
