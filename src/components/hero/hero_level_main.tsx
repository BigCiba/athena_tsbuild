import { createMemo, Show } from "solid-js";
import "./hero_level_main.less";

interface HeroLevelMainProps {
	level: number;
	extraExp: number;
	title: string;
	hideToolTip?: boolean;
	tooltip?: string;
	size?: "Normal" | "Small";
}

export function HeroLevelMain(props: HeroLevelMainProps) {
	const size = () => props.size ?? "Normal";
	const MAX_LEVEL = Object.keys(KeyValues.hero_level_exp).length;
	const maxExp = createMemo(() => {
		return KeyValues.hero_level_exp[Math.min(props.level, MAX_LEVEL)]?.exp ?? 1;
	});
	const isMax = createMemo(() => {
		return (props.level ?? 1) >= MAX_LEVEL;
	});
	let tooltipNode: Panel | undefined;
	return <Panel class={"HeroLevelMain " + size()} onmouseover={() => {
		const text = `${GetLocalization("#HeroExp_Tips")} ${props.extraExp}/${maxExp()}`;
		if (tooltipNode) {
			ShowCustomTooltip(tooltipNode, "text", {
				text: text,
			});
		}
	}}
		onmouseout={() => {
			if (tooltipNode)
				HideCustomTooltip(tooltipNode, "text");
		}}>
		<Label id="HeroLevel" text={props.level} />
		<Label id="HeroLevelTitle" text={props.title} />
		<Show when={!isMax()}>
			<Panel id="HeroLevelProgressBar">
				<Panel id="ProgressBarBG" />
				<Panel id="ProgressBar" width={props.extraExp / maxExp() * 100} />
			</Panel>
		</Show>
		<Show when={props.hideToolTip != true}>
			<Panel id="HeroLevelTooltip" tooltip={props.tooltip ?? "#HeroLevelTooltip"} />
		</Show>
		<Panel ref={tooltipNode} width="100%" height="60%" verticalAlign="bottom" marginLeft="60px" marginRight="70px" style={{ tooltipPosition: "top" }} />
	</Panel>;
}
