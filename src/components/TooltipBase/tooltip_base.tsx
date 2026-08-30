import "./tooltip_base.less";

export function InitTooltipStyle(tooltip: Panel, styleName: "BaseTooltip" | "EmptyTooltip" = "BaseTooltip") {
	let parent = tooltip.GetParent()?.GetParent();
	if (parent) {
		parent.SetHasClass("BaseTooltip", styleName == "BaseTooltip");
		parent.SetHasClass("EmptyTooltip", styleName == "EmptyTooltip");
		let list = ["TopArrow", "BottomArrow", "LeftArrow", "RightArrow"];
		list.forEach((arrowName) => {
			let arrow = parent.FindChildTraverse(arrowName);
			if (arrow) arrow.visible = false;
		});
	}
}