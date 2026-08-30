import classNames from "classnames";
import { createMemo, Match, mergeProps, ParentComponent, Show, splitProps, Switch } from "solid-js";
import "./EOM_Button.less";

interface EOM_ButtonAttribute extends LabelLikeAttributes<Button> {
	/** 图标 */
	icon?: JSX.Element;
	/** 设置按钮颜色，Green：免费，Gold: 购买，Confirm: 通用、确定、使用，Cancel: 取消、撤销、重置 */
	color?: "Green" | "Gold" | "Confirm" | "Cancel";
	/** 预设大小 */
	size?: "Small" | "Normal" | "Large";
	/** loading */
	loading?: boolean;
	/** loading样式 */
	loadingStyle?: "Spinner" | "Refresh";
	/** 按钮缩放 */
	btnScale?: `${number}%`;
}

export const EOM_Button: ParentComponent<EOM_ButtonAttribute> = (props) => {
	// ✅ 先合并 props，设置默认值
	const merged = mergeProps(
		{ loading: false, color: "Gold", size: "Normal", loadingStyle: "Spinner" as const, enabled: true },
		props
	);

	// ✅ 提取所有需要响应式的属性（包括 loadingStyle 和 enabled）
	const [local, others] = splitProps(merged, [
		"loading",
		"loadingStyle",  // ✅ 添加
		"icon",
		"color",
		"size",
		"enabled",      // ✅ 添加
		"children",
		"text",
		"html",
		"vars",
		"btnScale"
	]);
	// ✅ 使用 createMemo 缓存 class 计算，只有依赖变化时才重新计算
	const mergedClass = createMemo(() => classNames(
		"EOM_Button",
		local.loading ? "Loading" : "",
		local.loadingStyle == "Refresh" ? "Loading_Refresh" : "Loading_Spinner",
		`color-${local.enabled == false ? "Gray" : (local.color || "Gold")}`,
		`size-${local.size || "Normal"}`,
		props.class,
		props.className
	));

	// ✅ 使用 local 的属性
	const enabled = createMemo(() => local.loading ? false : local.enabled);
	return (
		<EOM_BaseButton {...others} class={mergedClass()} style={{ uiScale: local.btnScale }} enabled={enabled()} >
			<Panel class="EOM_Button_Content">
				<Switch fallback={local.icon}>
					<Match when={local.loading == true}>
						<Image class="EOM_Button_LoadingIcon" />
					</Match>
				</Switch>
				<Label
					class="EOM_Button_Label"
					vars={local.vars}
					visible={local.text != undefined}
					text={local.text}
					html={local.html}
				/>
			</Panel>
			{local.children}
		</EOM_BaseButton >
	);
};

export const EOM_BaseButton: ParentComponent<PanelAttributes<Button> & LabelLikeAttributes<Panel>> = (props) => {
	const [local, others] = splitProps(props, ["text", "html", "children", "class"]);

	return (
		<Button class={classNames("EOM_BaseButton", local.class)} {...others}>
			{local.children}
			<Show when={local.text}>
				<Label text={local.text} html={local.html} />
			</Show>
		</Button>
	);
};

export const EOM_CloseButton: ParentComponent<PanelAttributes<Button>> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_CloseButton SecondaryButtonStates", props.class) });
	const [local, others] = splitProps(merged, ["children"]);
	return <EOM_BaseButton {...others}>
		{local.children}
	</EOM_BaseButton>;
};

interface EOM_IconAttribute extends PanelAttributes<Button> {
	icon: JSX.Element;
}
export const EOM_IconButton: ParentComponent<EOM_IconAttribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_IconButton", props.class) });
	const [local, others] = splitProps(merged, ["children", "icon"]);
	return (
		<EOM_BaseButton {...others}>
			{local.icon}
			{local.children}
		</EOM_BaseButton>
	);
};