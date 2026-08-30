import { ParentComponent, Show, mergeProps, splitProps } from 'solid-js';
import { EOM_IconButton } from '../../Input/EOM_Button/EOM_Button';
import "./EOM_Currency.less";
import classNames from 'classnames';

export interface EOM_CurrencyAttribute extends PanelAttributes {
	/** 图标 */
	icon?: string;
	/** 值 */
	value?: number;
	currencyType?: "top" | "popup";
	/** wash-color */
	onaddbuttonactivate?: (self: Panel) => void;
}

export const EOM_Currency: ParentComponent<EOM_CurrencyAttribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_Currency type_" + (props.currencyType ?? "top")) });
	const [local, others] = splitProps(merged, ["icon", "value", "onaddbuttonactivate"]);
	return (
		<Panel {...others}>
			<Panel id='Background' />
			<Panel class="EOM_CurrencyIcon" backgroundImage={local.icon} />
			<Panel class="EOM_CurrencyLabelContainer">
				<Label text={local.value} />
			</Panel>
			<Show when={local.onaddbuttonactivate != undefined}>
				<EOM_IconButton class="EOM_CurrencyRecharge" icon={<Image />} onactivate={local.onaddbuttonactivate} />
			</Show>
		</Panel>
	);
};
