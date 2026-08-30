import classNames from "classnames";
import { createMemo, createSignal, For, mergeProps, splitProps } from "solid-js";
import "./EOM_Segmented.less";

interface EOM_SegmentedAttributes extends PanelAttributes {
	/** 选项列表 */
	list: string[];
	/** 受控模式：当前选中 index（0-based） */
	selected?: number;
	/** 非受控模式：初始选中 index（0-based） */
	defaultSelected?: number;
	/** 每个选项的固定宽度（px），默认 80 */
	itemWidth?: number;
	/** 切换回调 */
	onChange?: (index: number, text: string) => void;
}

export function EOM_Segmented(props: EOM_SegmentedAttributes) {
	const merged = mergeProps({ list: [], defaultSelected: 0, itemWidth: 80 }, props);
	const [local, others] = splitProps(merged, [
		"class",
		"list",
		"selected",
		"defaultSelected",
		"itemWidth",
		"onChange",
	]);

	const [innerIndex, setInnerIndex] = createSignal(local.defaultSelected);
	const selectedIndex = () => local.selected ?? innerIndex();

	const containerWidth = createMemo(() => local.list.length * local.itemWidth + 8);
	const spacerWidth = createMemo(() => selectedIndex() * local.itemWidth);

	const onSelect = (index: number) => {
		if (local.selected === undefined) {
			setInnerIndex(index);
		}
		local.onChange?.(index, local.list[index]);
	};

	return (
		<Panel
			{...others}
			class={classNames("EOM_Segmented", local.class)}
			style={{ width: `${containerWidth()}px` }}
		>
			{/* 滑动指示块，通过 spacer 的 width 动画平移 */}
			<Panel class="EOM_Segmented_IndicatorRow">
				<Panel
					class="EOM_Segmented_Spacer"
					style={{ width: `${spacerWidth()}px` }}
				/>
				<Panel
					class="EOM_Segmented_Indicator"
					style={{ width: `${local.itemWidth}px` }}
				/>
			</Panel>

			{/* 选项文字层，z-index 高于指示块 */}
			<Panel class="EOM_Segmented_Items">
				<For each={local.list}>
					{(text, index) => (
						<Panel
							class={classNames(
								"EOM_Segmented_Item",
								selectedIndex() === index() && "is-selected"
							)}
							style={{ width: `${local.itemWidth}px` }}
							onactivate={() => onSelect(index())}
						>
							<Label class="EOM_Segmented_Label" text={text} />
						</Panel>
					)}
				</For>
			</Panel>
		</Panel>
	);
}
