import classNames from "classnames";
import { mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_CostLabel.less";

export interface EOM_CostLabelAttribute extends PanelAttributes {
	/** 消耗需求数量 */
	cost: number;
	/** 你有的数量 */
	have: number;
	/** 消耗需求数量为0时是否隐藏 */
	hiddenCostOnZero?: boolean;
}

export const EOM_CostLabel: ParentComponent<EOM_CostLabelAttribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_CostLabel", props.class) });
	const [local, others] = splitProps(merged, ["children", "cost", "have", "hiddenCostOnZero"]);

	return (
		<Panel {...others}>
			<Label class="EOM_CostLabelValue EOM_CostLabelValueHave" classList={{ NoEnough: local.have < local.cost }} text={local.have} />
			<Label class="EOM_CostLabelValue EOM_CostLabelValueCost" text={`/${local.cost}`} visible={!local.hiddenCostOnZero || local.cost !== 0} />
			{local.children}
		</Panel>
	);
};
