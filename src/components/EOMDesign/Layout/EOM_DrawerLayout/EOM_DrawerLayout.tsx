import { createRenderEffect, createSignal, mergeProps, ParentComponent, Show, splitProps, untrack } from "solid-js";
import { EOM_BaseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_DrawerLayout.less";

export interface EOM_DrawerLayoutProps extends PanelAttributes {
	title: string,
	show: boolean,
	onclose?: () => void;
}

export const EOM_DrawerLayout: ParentComponent<EOM_DrawerLayoutProps> = (props) => {
	const merged = mergeProps(props, { class: "EOM_DrawerLayout" });
	const [local, others] = splitProps(merged, ["children", "show", "title", "onclose"]);
	const [show, setShow] = createSignal(local.show);
	createRenderEffect(() => {
		setShow(props.show);
	});

	return (
		<Panel {...others} classList={{ DrawerVisible: show() }}>
			{/* <EOM_CloseButton id="EOM_DrawerLayoutClose" onactivate={() => { setShow(false); local.onclose?.(); }} /> */}
			<Show when={local.title}>
				<Panel id="TitleContainer" hittest={false}>
					<Label text={local.title} />
				</Panel>
			</Show>
			<Panel id="DrawerContents" onactivate={() => { }}>
				{untrack(() => local.children)}
			</Panel>
			<EOM_BaseButton id="EOM_DrawerLayoutClose" onactivate={() => { setShow(false); local.onclose?.(); }} />
		</Panel>
	);
}