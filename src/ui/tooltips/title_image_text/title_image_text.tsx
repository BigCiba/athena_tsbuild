import { render } from "@bigciba/solid-panorama-runtime";
import { createMemo, Show } from "solid-js";
import { InitTooltipStyle } from "../../../components/TooltipBase/tooltip_base";

let root = $.GetContextPanel();
function TooltipContents(props: { title: string, image: string, text: string, specialEffectsImage: boolean, propTypeKey: string; }) {
	const heroCosmeticData = createMemo(() => {
		const cosmeticData = KeyValues.info_item_cosmetic[props.title];
		if (
			cosmeticData == undefined ||
			cosmeticData.type == COSMETIC_TYPE.BORDER ||
			cosmeticData.type == COSMETIC_TYPE.TITLE
		) {
			return undefined;
		}
		return cosmeticData;
	});
	return <Panel id="TitleImageText">
		<Label id="TooltipTitle" html text={GetLocalization(props.title)} />
		<Show when={props.propTypeKey !== ""}>
			<Label class="TooltipPropType" text={"[" + GetLocalization(props.propTypeKey) + "]"} />
		</Show>
		<Show when={props.specialEffectsImage} fallback={
			<Image id="TooltipImage" src={props.image} />
		}>
			<Panel id="TooltipSpecialEffectsImagePanel">
				<Image id="TooltipSpecialEffectsFrame" />
				<Image id="TooltipImage" src={props.image} />
			</Panel>
		</Show>
		<Label id="TooltipDesc" html text={GetLocalization(props.text, props.text)} />
		<Show when={heroCosmeticData()}>
			<Panel id="TooltipCosmeticHero">
				<Label class="BelongHero" text={GetLocalization("#Cosmetic_BelongingHero")} />
			</Panel>
		</Show>
	</Panel>;
}
function SetupTooltip() {
	render(() => <TooltipContents
		title={root.GetAttributeString("title", "")}
		image={root.GetAttributeString("image", "")}
		text={root.GetAttributeString("text", "")}
		specialEffectsImage={root.GetAttributeInt("special_effects_image", 0) == 1}
		propTypeKey={root.GetAttributeString("prop_type", "")}
	/>, root);
}

(function () {
	InitTooltipStyle(root, "BaseTooltip");
	root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();
