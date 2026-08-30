import { render } from "@bigciba/solid-panorama-runtime";

function HudMain() {
	return <>
		<Image id="Logo" hittest={false} />
	</>;
}

(function () {
})();

render(HudMain, $.GetContextPanel());
