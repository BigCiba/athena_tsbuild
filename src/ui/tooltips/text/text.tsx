import { render } from "@bigciba/solid-panorama-runtime";
import { InitTooltipStyle } from "../../../components/TooltipBase/tooltip_base";

let root = $.GetContextPanel();
function TooltipContents(props: { text: string; }) {
	return <Label html text={GetLocalization(props.text)} />;
}
function SetupTooltip() {
	render(() => <TooltipContents text={root.GetAttributeString("text", "")} />, root);
}

(function () {
	InitTooltipStyle(root, "BaseTooltip");
	root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();