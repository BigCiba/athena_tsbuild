import { render } from "@bigciba/solid-panorama-runtime";
import { InitTooltipStyle } from "../../../components/TooltipBase/tooltip_base";

let root = $.GetContextPanel();
function TooltipContents(props: { title: string, text: string; }) {
	return <Panel id="TitleText" >
		<Label class="TooltipTitle" html text={GetLocalization(props.title)} />
		<Label html text={GetLocalization(props.text)} />
	</Panel>;
}
function SetupTooltip() {
	render(() => <TooltipContents title={root.GetAttributeString("title", "")} text={root.GetAttributeString("text", "")} />, root);
}

(function () {
	InitTooltipStyle(root, "BaseTooltip");
	root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();