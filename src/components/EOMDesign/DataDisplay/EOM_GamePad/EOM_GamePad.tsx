import classNames from "classnames";
import { ParentComponent, Show, createMemo, mergeProps, splitProps } from "solid-js";
import "./EOM_GamePad.less";

const normalizeKeyName = (keyName: string): string => keyName.trim().toLowerCase();

const isStickDirectionKey = (keyName: string): boolean => /^(x_axis|y_axis|r_axis|u_axis)_(neg|pos)$/.test(keyName);

const textKeyLabelMap: Partial<Record<string, string>> = {
	joy5: "LB",
	joy6: "RB",
	joy7: "SELECT",
	joy8: "MENU",
	z_axis_pos: "LT",
	v_axis_pos: "RT",
	lb: "LB",
	rb: "RB",
	select: "SELECT",
	menu: "MENU",
	lt: "LT",
	rt: "RT",
};

const isKnownGamePadKey = (keyName: string): boolean => /^(joy[1-9]|joy10|z_axis_pos|v_axis_pos|pov_left|pov_right|pov_up|pov_down|x_axis_neg|x_axis_pos|y_axis_neg|y_axis_pos|r_axis_neg|r_axis_pos|u_axis_neg|u_axis_pos|start|view|home|menu|select)$/.test(keyName);

const getTextKeyLabel = (keyName: string): string | undefined => textKeyLabelMap[keyName];

export interface EOM_GamePadAttribute extends PanelAttributes {
	keyName?: string;
}

export const EOM_GamePad: ParentComponent<EOM_GamePadAttribute> = (rawProps) => {
	const props = mergeProps({ keyName: "" }, { class: "EOM_GamePad" }, rawProps);
	const [local, others] = splitProps(props, ["keyName", "children"]);
	const currentKeyName = createMemo(() => normalizeKeyName(local.keyName));
	const isKnownKey = createMemo(() => isKnownGamePadKey(currentKeyName()));
	const isStickKey = createMemo(() => isStickDirectionKey(currentKeyName()));
	const textKeyLabel = createMemo(() => getTextKeyLabel(currentKeyName()));

	return (
		<Panel
			{...others}
			class={classNames(props.class, { HasDirection: isStickKey(), IsTextKey: textKeyLabel() !== undefined }, isKnownKey() ? `Key-${currentKeyName()}` : undefined)}
		>
			<Show
				when={isKnownKey()}
				fallback={<Label class="EOM_GamePadText" text={local.keyName} />}
			>
				{() => (
					<Show
						when={textKeyLabel() !== undefined}
						fallback={
							<Show
								when={isStickKey()}
								fallback={<Image class="EOM_GamePadIcon" scaling="stretch-to-fit-preserve-aspect" />}
							>
								<Image class="EOM_GamePadStick" scaling="stretch-to-fit-preserve-aspect" />
								<Image class="EOM_GamePadDirection" scaling="stretch-to-fit-preserve-aspect" />
							</Show>
						}
					>
						<>
							<Image class="EOM_GamePadTextBorder" />
							<Label class="EOM_GamePadTextValue" text={textKeyLabel()} />
						</>
					</Show>
				)}
			</Show>
			{local.children}
		</Panel>
	);
};