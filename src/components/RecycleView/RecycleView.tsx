import { Accessor, batch, createEffect, createMemo, createRenderEffect, createRoot, createSignal, mergeProps, onCleanup, onMount, Setter, Show, splitProps, untrack } from "solid-js";
import "./RecycleView.less";

function IsValidPanel(...args: (Panel | undefined | null)[]) {
	return args.every(panel => {
		return panel && panel.IsValid?.();
	});
}

function TryCancelScheduled(id: ScheduleID) {
	try {
		$.CancelScheduled(id);
	} catch (error) { }
}

interface dragPanel extends Panel {
	m_pPanel?: Panel;
	m_DragCompleted?: boolean;
	m_DragType?: string;
	m_DragType_Extra?: any;
}

function RegisterDrag(pPanel: Panel, OnStart: () => void, OnEnd: () => void) {
	let id1 = $.RegisterForUnhandledEvent("DragStart", (_Panel, tDragCallbacks) => {
		if (_Panel == pPanel) {
			let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "DragEmpty") as dragPanel;
			tDragCallbacks.displayPanel = pDisplayPanel;
			OnStart();
		}
	});
	let id2 = $.RegisterForUnhandledEvent("DragEnd", (_Panel, pDraggedPanel) => {
		if (_Panel == pPanel) {
			try {
				(pDraggedPanel as Panel).DeleteAsync(-1);
			} catch (error) { }
			OnEnd();
		}
	});
	return {
		"DragStart": id1,
		"DragEnd": id2
	};
}

interface ScrollOptions {
	/** 是否是百分比 */
	bPercent?: boolean,
	/** 是设置滚动而不是增减滚动值，默认为增减滚动值，所以多次滚轮操作会累计下来有惯性 */
	bSet?: boolean,
	/** 没有过渡动画 */
	bNoSmooth?: boolean;
}

export interface RecycleViewHandle {
	readonly refRoot: Panel | undefined,
	readonly fScroll: number,
	scroll(fScroll: number, options?: ScrollOptions): void;
	scroll2Child(index: number, type: "start" | "center" | "end", bNoSmooth?: boolean): void;
}

type RecycleViewProps<T> = PanelAttributes & {
	input: Accessor<T[]>,
	/**
	 * 必须返回单个Panel，不支持例如<><a/><b/></>
	 * 返回的元素的长宽必须是恒久固定的
	 */
	children: (item: Accessor<T>) => Panel;

	/** 子元素的大小 TODO:child的margin如何处理？*/
	childConfig: {
		width: number;
		height: number;
		margin?: number;
		margin_top?: number,
		margin_right?: number,
		margin_bottom?: number,
		margin_left?: number,
	},
	/**
	 * 滚动方向
	 * HorizontalGrid:水平方向无限延伸的网格排布
	 * VerticalGrid:垂直方向无限延伸的网格排布
	 */
	direction: "Horizontal" | "Vertical" | "HorizontalGrid" | "VerticalGrid",
	/** 开头空余的大小 */
	paddingStart?: number,
	/** 结尾空余的大小 */
	paddingEnd?: number,
	/** 滚动回调 */
	onScroll?: (fScroll: number, handler: RecycleViewHandle) => void,
	onScrollPercent?: (percent: number) => void;
	onPageChange?: (currentPage: number, totalPage: number) => void;
	/** 即使没用到也暂时不删除的数量，默认1，增大这个数量可以减少滚动时创建删除的操作 */
	cacheSize?: number,
	/** 是否显示进度条 */
	showBar?: boolean,
	/** 是否显示页数标签 */
	showPageLabel?: boolean,
	/** 滚轮每次滚动的像素步长 */
	wheelStep?: number,
	/** 是否禁用鼠标拖拽滚动 */
	disableMouseDrag?: boolean,

	/** 当children不足以填满一行的时候显示的网格，direction = "HorizontalGrid" | "VerticalGrid"时使用 */
	grid_children?: () => Panel,

	/** 暴露给上级操作组件的各种接口 */
	handle?: (handler: RecycleViewHandle) => void;
};

interface ChildStore<T> {
	child: Panel,
	setter: Setter<T>,
	disposer: () => void;
}

interface GridBlockStore {
	child: Panel,
	disposer: () => void;
}

/** 可滚动容器，child在滚动时会被复用，减少重复创建Panel */
// 且可以避免4k甚至更高分辨率时child数量过多导致最后面的几个child不显示的bug
export function RecycleView<T>(props: RecycleViewProps<T>) {
	const sMouseUnique: Readonly<string> = DoUniqueString("RecycleView");

	const GridDirectionConfig: Record<string, "Vertical" | "Horizontal"> = {
		"HorizontalGrid": "Horizontal",
		"VerticalGrid": "Vertical",
	};

	let refRoot: Panel | undefined;
	let refRecycle: Panel | undefined;
	let refCache: Panel | undefined;
	let refBar: ScrollBarRef | undefined;

	let childStore: Record<number, ChildStore<T>> = {};
	let childStoreGrid: Record<number, GridBlockStore> = {};
	let cachePool: ChildStore<T>[] = [];

	/** 目标滚动值，此值会随着时间趋近fScroll，直到相等 */
	let fTargetScroll = -(props.paddingStart ?? 0);
	/** 当前滚动值，向右/向下滚动时增加 */
	let fScroll = fTargetScroll - 1;
	let bNoSmooth = false;
	let visibleStart = -1;
	let visibleEnd = -1;

	let bDragging = false;
	let fDragLastTime = 0;
	let vDragLastPos: [number, number] = [0, 0];
	let dragHandle: Record<string, UnhandledEventListenerID> = {};
	let lastThumbPositionPct: number | undefined = undefined;
	let lastCurrentPage: number | undefined = undefined;
	let lastTotalPage: number | undefined = undefined;

	function CleanupDragHandle() {
		try {
			for (const eventName in dragHandle) {
				$.UnregisterForUnhandledEvent(eventName, dragHandle[eventName]);
			}
		} catch (error) { }
		dragHandle = {};
		bDragging = false;
	}

	const expose = {
		get refRoot() {
			return refRoot;
		},
		get fScroll() {
			return fScroll;
		},
		scroll2Child,
		scroll,
	};
	if (props.handle) {
		props.handle(expose);
	}

	const [fParentWidth, SetParentWidth] = createSignal(0);
	const [fParentHeight, SetParentHeight] = createSignal(0);
	const [currentPage, setCurrentPage] = createSignal(1);
	const [totalPage, setTotalPage] = createSignal(1);

	const pageLabelText = createMemo(() => `${currentPage()}/${totalPage()}`);

	const memoInfo = createMemo((old: any) => {
		let { childConfig, direction, paddingEnd = 0, input, grid_children, } = props;

		const parent_width = fParentWidth();
		const parent_height = fParentHeight();

		let childCount = input().length;
		let top = childConfig.margin_top ?? childConfig.margin ?? 0;
		let right = childConfig.margin_right ?? childConfig.margin ?? 0;
		let bottom = childConfig.margin_bottom ?? childConfig.margin ?? 0;
		let left = childConfig.margin_left ?? childConfig.margin ?? 0;
		const width = childConfig.width + right + left;
		const height = childConfig.height + top + bottom;

		let isHorizontal = direction == "Horizontal" || direction == "HorizontalGrid";
		let isSingleScroll = direction == "Horizontal" || direction == "Vertical";

		let fParentSize = isHorizontal ? parent_width : parent_height;
		let fChildSize = isHorizontal ? width : height;
		const rawColumnCount = isSingleScroll ? 1 : Math.floor((isHorizontal ? parent_height : parent_width) / (isHorizontal ? height : width));
		let columnCount = Math.max(1, Number.isFinite(rawColumnCount) ? rawColumnCount : 1);
		let rowCount = Math.ceil(childCount / columnCount);
		if (grid_children) {
			rowCount = Math.max(Math.ceil(fParentSize / fChildSize), rowCount);
		}
		let fMaxScroll = Math.max(0, paddingEnd + (rowCount * fChildSize - fParentSize));
		let fContentSize = fChildSize * rowCount;

		if (refBar) {
			refBar.updateBarLength(fParentSize, fContentSize);
		}

		const res = {
			/** fScroll的最大数值 */
			fMaxScroll,
			/** 沿滚动方向的parent长度 */
			fParentSize,
			/** 沿滚动方向的child长度 */
			fChildSize,
			/** 沿滚动方向的总长度 */
			fContentSize,
			/** 垂直滚动方向的数量 */
			columnCount,
			/** 沿滚动方向的数量 */
			rowCount,
			// child
			width, height,
			// margin
			top, right, bottom, left,
		};
		if (old) {
			for (const k in old) {
				if (old[k] != (res as any)[k]) {
					return res;
				}
			}
			return old as typeof res;
		}
		return res;
	});

	createRenderEffect(() => {
		props.input();
		untrack(() => update(true));
	});
	createRenderEffect(() => {
		fParentWidth();
		fParentHeight();
		untrack(() => update());
	});

	onMount(() => {
		function Tick() {
			const isActive = bDragging || fTargetScroll != fScroll;
			let interval = isActive ? Math.max(1 / 90, Game.GetGameFrameTime()) : 0.05;
			id = $.Schedule(interval, Tick);

			if (refRoot?.IsValid()) {
				const nextParentWidth = refRoot.actuallayoutwidth / refRoot.actualuiscale_x;
				const nextParentHeight = refRoot.actuallayoutheight / refRoot.actualuiscale_y;
				if (nextParentWidth != fParentWidth() || nextParentHeight != fParentHeight()) {
					batch(() => {
						SetParentWidth(nextParentWidth);
						SetParentHeight(nextParentHeight);
					});
				}
			}

			if (bDragging) dragThinker();
			if (fTargetScroll == fScroll) return interval;
			update();
		}

		var id = $.Schedule(0, Tick);

		onCleanup(() => TryCancelScheduled(id));
	});

	// 滚轮监听
	onMount(() => {
		CustomUIConfig.SubscribeMouseEvent(sMouseUnique, ({ event_name: sEventName, value: iValue }) => {
			let pRoot = refRoot;
			if (pRoot && pRoot.IsValid() && pRoot.BHasHoverStyle()) {
				const fWheel = props.wheelStep ?? 96;
				switch (sEventName) {
					case "pressed":
						if (iValue == 5) {
							scroll(-fWheel);
						} else if (iValue == 6) {
							scroll(fWheel);
						}
						break;
					case "wheeled":
						if (iValue == 1) {
							scroll(-fWheel);
						} else if (iValue == -1) {
							scroll(fWheel);
						}
						break;
				}
			}
		});

		onCleanup(() => {
			try {
				CustomUIConfig.UnsubscribeMouseEvent(sMouseUnique);
			} catch (error) { }
		});
	});

	// 拖拽监听
	onMount(() => {
		createEffect(() => {
			const disableMouseDrag = props.disableMouseDrag ?? false;
			CleanupDragHandle();
			if (disableMouseDrag || refRoot == undefined) {
				return;
			}

			dragHandle = RegisterDrag(refRoot,
				() => {
					bDragging = true;
					fDragLastTime = Game.Time();
					let vPosition = GameUI.GetCursorPosition();
					vDragLastPos = vPosition;
					fScroll = fTargetScroll; // 拖拽开始时让页面直接跟住鼠标
				},
				() => {
					bDragging = false;
				}
			);

			onCleanup(() => {
				CleanupDragHandle();
			});
		});

		onCleanup(() => {
			CleanupDragHandle();
		});
	});

	onCleanup(() => {
		for (let [key, data] of Object.entries(childStore)) {
			if (data && data.disposer) {
				data.disposer();
			}
		}
	});

	function update(forceUpdate = false) {
		let pRoot = refRoot;
		if (!(pRoot && pRoot.IsValid())) {
			return;
		}
		if (pRoot.actuallayoutwidth <= 0 && pRoot.actuallayoutheight <= 0) {
			return;
		}

		const { direction, paddingStart = 0, onScroll, onScrollPercent, grid_children } = props;
		const {
			fMaxScroll,
			fParentSize,
			fChildSize,
			fContentSize,
			columnCount,
			rowCount,
			width, height,
			top, right, bottom, left,
		} = memoInfo();
		const childCount = props.input().length;

		// 计算这帧的滚动
		const fCurrentScroll = fScroll;
		const fMinScroll = -paddingStart;
		fTargetScroll = Clamp(fTargetScroll, fMinScroll, fMaxScroll);
		const fChange = (fTargetScroll - fScroll) / 3;
		if (bNoSmooth || Math.abs(fChange) <= 1) {
			bNoSmooth = false;
			fScroll = fTargetScroll;
		} else {
			fScroll = Math.floor(fScroll + fChange);
		}
		// 发送滚动事件
		if (fCurrentScroll != fScroll) {
			onScroll?.(fScroll, expose);
			onScrollPercent?.(fMaxScroll > 0 ? fScroll / fMaxScroll : 0);
		}
		// 更新滚动条
		if (refBar) {
			const nextThumbPositionPct = fContentSize > 0 ? fScroll / fContentSize * 100 : 0;
			if (lastThumbPositionPct != nextThumbPositionPct) {
				lastThumbPositionPct = nextThumbPositionPct;
				refBar.setThumbPosition(nextThumbPositionPct);
			}
		}

		let isHorizontal = direction == "Horizontal" || direction == "HorizontalGrid";
		const lastChild = grid_children == undefined ? childCount - 1 : Math.max(columnCount * rowCount, childCount) - 1;
		const firstIndex = Clamp((Math.floor(fScroll / fChildSize) - 1 - 1) * columnCount, 0, lastChild);
		const lastIndex = Clamp(Math.ceil(((fScroll + fParentSize) / fChildSize) + 1) * columnCount, 0, lastChild);
		if (props.showPageLabel || props.onPageChange) {
			const rowsPerPage = Math.max(1, Math.floor(fParentSize / fChildSize));
			const nextTotalPage = Math.max(1, Math.ceil(rowCount / rowsPerPage));
			const nextCurrentPage = nextTotalPage <= 1
				? 1
				: Clamp(Math.round((fScroll / fMaxScroll) * (nextTotalPage - 1)) + 1, 1, nextTotalPage);
			const pageChanged = nextCurrentPage != lastCurrentPage || nextTotalPage != lastTotalPage;
			if (nextTotalPage != lastTotalPage) {
				lastTotalPage = nextTotalPage;
				setTotalPage(nextTotalPage);
			}
			if (nextCurrentPage != lastCurrentPage) {
				lastCurrentPage = nextCurrentPage;
				setCurrentPage(nextCurrentPage);
			}
			if (pageChanged) {
				props.onPageChange?.(nextCurrentPage, nextTotalPage);
			}
		}
		const rangeChanged = firstIndex != visibleStart || lastIndex != visibleEnd;
		visibleStart = firstIndex;
		visibleEnd = lastIndex;
		let realEnd = Math.min(visibleEnd, childCount - 1);
		if (rangeChanged || forceUpdate) {
			updateChild(visibleStart, realEnd, lastIndex, props.input(), forceUpdate);
		}

		for (let i = firstIndex; i <= lastIndex; i++) {
			let pChild = childStore[i]?.child;
			if (pChild && pChild.IsValid()) {
				if (isHorizontal) {
					pChild.style.x = (Math.floor(i / columnCount) * width + left - fScroll) + "px";
					pChild.style.y = ((i % columnCount) * height + top) + "px";
				} else {
					pChild.style.x = ((i % columnCount) * width + left) + "px";
					pChild.style.y = (Math.floor(i / columnCount) * height + top - fScroll) + "px";
				}
			}
		}
		for (let i = realEnd + 1; i <= lastIndex; i++) {
			let pChild = childStoreGrid[i]?.child;
			if (pChild && pChild.IsValid()) {
				if (isHorizontal) {
					pChild.style.x = (Math.floor(i / columnCount) * width + left - fScroll) + "px";
					pChild.style.y = ((i % columnCount) * height + top) + "px";
				} else {
					pChild.style.x = ((i % columnCount) * width + left) + "px";
					pChild.style.y = (Math.floor(i / columnCount) * height + top - fScroll) + "px";
				}
			}
		}
	}

	function updateChild(iStart: number, realEnd: number, totalEnd: number, input: T[], fullFresh = false) {
		if (iStart < 0 || totalEnd < 0) {
			return;
		}
		let pRoot = refRoot!;
		let pRecycle = refRecycle!;
		let pCache = refCache!;
		if (!IsValidPanel(pRoot, pRecycle, pCache)) {
			return;
		}

		let invisible: ChildStore<T>[] = [];
		for (let [key, value] of Object.entries(childStore)) {
			let index = Number(key);
			if (index < iStart || index > realEnd) {
				invisible.push(value);
				delete childStore[index];
			}
		}

		for (let i = iStart; i <= realEnd; i++) {
			let data = childStore[i];
			if (data == undefined) {
				let p = invisible.pop();
				if (p == undefined) {
					p = cachePool.pop();
					if (p) {
						p.child.SetParent(pRoot);
					}
				}

				if (p) {
					childStore[i] = data = p;
					data.setter(input[i] as any);
				} else {
					createRoot(disposer => {
						let [s, setter] = createSignal(input[i]);
						let c = props.children(s);
						c.SetParent(pRoot);
						childStore[i] = data = {
							disposer,
							setter,
							child: c
						};
					});
				}
			} else {
				if (fullFresh) {
					data.setter(input[i] as any);
				}
			}
		}

		let cacheSize = props.cacheSize ?? 1;
		let cacheLeft = cacheSize - cachePool.length; // 还剩几个缓存位
		for (let i = 0; i < invisible.length; i++) {
			const data = invisible[i];
			if (i < cacheLeft) {
				data.child.SetParent(pCache);
				cachePool.push(data);
			} else {
				data.disposer();
				data.child.SetParent(pRecycle);
			}
		}

		if (props.grid_children) {
			let invisible_block: GridBlockStore[] = [];
			for (let [key, value] of Object.entries(childStoreGrid)) {
				let index = Number(key);
				if (index <= realEnd || index > totalEnd) {
					invisible_block.push(value);
					delete childStoreGrid[index];
				}
			}
			for (let i = realEnd + 1; i <= totalEnd; i++) {
				let data = childStoreGrid[i];
				if (data == undefined) {
					let p = invisible_block.pop();
					if (p) {
						p.child.SetParent(pRoot);
					}
					if (p) {
						childStoreGrid[i] = data = p;
					} else {
						createRoot(disposer => {
							let c = props.grid_children!();
							c.SetParent(pRoot);
							childStoreGrid[i] = data = {
								disposer,
								child: c
							};
						});
					}
				}
			}

			for (let i = 0; i < invisible_block.length; i++) {
				const data = invisible_block[i];
				data.disposer();
				data.child.SetParent(pRecycle);
			}
		}

		pRecycle.RemoveAndDeleteChildren();
	}

	function dragThinker() {
		let pRoot = refRoot;
		if (pRoot == undefined) return;

		const direction = GridDirectionConfig[props.direction] ?? props.direction;
		let vPosition = GameUI.GetCursorPosition();
		let fMove = direction == "Horizontal"
			? (vPosition[0] - vDragLastPos[0]) / pRoot.actualuiscale_x
			: (vPosition[1] - vDragLastPos[1]) / pRoot.actualuiscale_y;
		if (Math.abs(fMove) < 1) return;

		let fTimePass = Game.Time() - fDragLastTime;
		let vVelocity = fMove / fTimePass;
		if (Math.abs(vVelocity) < 2000) {
			bNoSmooth = true;
			fTargetScroll = fScroll - fMove;
		} else {
			bNoSmooth = false;
			fTargetScroll = fScroll + 0.5 * Math.pow(vVelocity, 2) / 20000 * (vVelocity >= 0 ? -1 : 1);
		}

		fDragLastTime = Game.Time();
		vDragLastPos = vPosition;

		if (!pRoot?.BHasHoverStyle()) {
			bDragging = false;
		}
	}
	function scroll(fScroll: number, options?: ScrollOptions) {
		let pRoot = refRoot;
		if (pRoot) {
			const { paddingStart = 0, } = props;
			const { fMaxScroll, fContentSize } = memoInfo();

			const { bPercent, bSet, bNoSmooth: _bNoSmooth } = options ?? {};
			fTargetScroll = Clamp((bSet ? 0 : fTargetScroll) + (bPercent ? fScroll * fContentSize : fScroll),
				-paddingStart,
				fMaxScroll
			);
			if (_bNoSmooth) {
				bNoSmooth = true;
			}
		}
	}
	function scroll2Child(index: number, type: "start" | "center" | "end", _bNoSmooth = false) {
		let pRoot = refRoot!;
		if (!IsValidPanel(pRoot)) {
			return;
		}
		const { paddingStart = 0 } = props;
		const { fParentSize, fChildSize, fMaxScroll, columnCount } = memoInfo();

		index = Math.floor(index / columnCount);
		// "start":例如水平滚动是最左边
		let target_scroll = index * fChildSize;
		if (type == "center") {
			target_scroll -= (fParentSize - fChildSize) / 2;
		} else if (type == "end") {
			target_scroll -= fParentSize - fChildSize;
		}
		fTargetScroll = Clamp(
			target_scroll,
			-paddingStart,
			fMaxScroll
		);
		if (_bNoSmooth) {
			bNoSmooth = true;
		}
	}

	const [local, others] = splitProps(props, ["classList", "input", "children", "childConfig", "direction", "paddingStart", "paddingEnd", "onScroll", "onScrollPercent", "cacheSize", "onload", "disableMouseDrag", "showPageLabel"]);

	return (
		<Panel ref={refRoot} {...others} draggable={!local.disableMouseDrag} onload={p => {
			p.SetAcceptsFocus(false);
			// @ts-ignore
			local.onload?.(p);
		}}
			classList={mergeProps(local.classList, { RecycleView: true, [local.direction]: true })}
		>
			<Panel id="RecyclePool" ref={refRecycle} hittest={false} hittestchildren={false} visible={false} style={{ width: "100%", height: "100%", opacity: "0" }} />
			<Panel id="CachePool" ref={refCache} hittest={false} hittestchildren={false} visible={false} style={{ width: "100%", height: "100%", opacity: "0" }} />
			<Show when={props.showBar ?? true}>
				<ScrollBar ref={refBar} barType={GridDirectionConfig[local.direction] ?? local.direction} scrollCallBack={scroll} />
			</Show>
			<Show when={local.showPageLabel ?? false}>
				<Label class="RecycleViewPageLabel" text={pageLabelText()} />
			</Show>
		</Panel>
	);
}


interface ScrollBarProp {
	barType: "Vertical" | "Horizontal";
	scrollCallBack(fPct: number, options?: ScrollOptions): void;
	ref?: ScrollBarRef | ((ref: ScrollBarRef) => void);
}

interface ScrollBarRef {
	setThumbPosition: (fPct: number) => void;
	updateBarLength: (fVisibleLength: number, fContentLength: number) => void;
}

function ScrollBar(props: ScrollBarProp) {
	let refBar: Panel | undefined;
	let refThumb: Panel | undefined;
	let thumbPct = 0;

	onMount(() => {
		let pRoot = refThumb;
		if (!pRoot) return;

		let timerID: ScheduleID;

		let dragHandle = RegisterDrag(pRoot,
			() => {
				let vLastPos = GameUI.GetCursorPosition();
				function Tick() {
					timerID = $.Schedule(0, Tick);

					const { scrollCallBack, barType } = props;
					const vPosition = GameUI.GetCursorPosition();
					const scale = 1;
					if (barType == "Horizontal") {
						const fMoveX = vPosition[0] - vLastPos[0];
						if (fMoveX != 0) {
							const pBar = refBar;
							if (pBar) {
								const fPct = fMoveX / pBar.actuallayoutwidth * scale;
								scrollCallBack(fPct, { bPercent: true, bNoSmooth: true });
							}
						}
					} else {
						const fMoveY = vPosition[1] - vLastPos[1];
						if (fMoveY != 0) {
							const pBar = refBar;
							if (pBar) {
								const fPct = fMoveY / pBar.actuallayoutheight * scale;
								scrollCallBack(fPct, { bPercent: true, bNoSmooth: true });
							}
						}
					}
					vLastPos = vPosition;
				}
				Tick();
			},
			() => TryCancelScheduled(timerID)
		);

		onCleanup(() => {
			try {
				for (let [event_name, id] of Object.entries(dragHandle)) {
					$.UnregisterForUnhandledEvent(event_name, id);
				}
			} catch (error) { }
		});
	});
	/**
	 * 设置滚动条的位置
	 * @param fPctX 滚动条横向百分比
	 * @param fPctY 滚动条纵向百分比
	 */
	function setThumbPosition(fPct: number) {
		if (refBar?.IsValid() && refThumb?.IsValid()) {
			if (!Number.isFinite(fPct)) {
				fPct = 0;
			}
			let pct = Round(fPct, 6) + "%";
			if (props.barType == "Horizontal") {
				refThumb.style.x = pct;
			} else {
				refThumb.style.y = pct;
			}
		}
	}

	function updateBarLength(fVisibleLength: number, fContentLength: number) {
		const pBar = refBar;
		const pThumb = refThumb;
		if (pBar && pThumb) {
			const bVisible = fContentLength > fVisibleLength;
			pBar.visible = bVisible;
			if (bVisible) {
				thumbPct = Clamp(fVisibleLength / fContentLength, 0, 1);
				const sThumbSize = (thumbPct * 100) + "%";
				if (props.barType == "Horizontal") {
					pThumb.style.width = sThumbSize;
				} else {
					pThumb.style.height = sThumbSize;
				}
			}
		}
	}

	createEffect(() => {
		let ref = props.ref;
		if (typeof ref == "function") {
			ref({
				setThumbPosition,
				updateBarLength
			});
		}
	});

	return (
		<Panel class={`CustomScrollBar Custom${props.barType}ScrollBar`} ref={refBar} onactivate={p => {
			// 点击进度条直接跳转到对应百分比
			const { scrollCallBack, barType } = props;
			const vCursor = GameUI.GetCursorPosition();
			const { x, y } = p.GetPositionWithinWindow();
			if (barType == "Horizontal") {
				let fPct = (vCursor[0] - x) / p.actuallayoutwidth;
				scrollCallBack(fPct, { bNoSmooth: true, bPercent: true, bSet: true });
			} else {
				let fPct = (vCursor[1] - y) / p.actuallayoutheight;
				scrollCallBack(fPct, { bNoSmooth: true, bPercent: true, bSet: true });
			}
		}} >
			<Panel id="ScrollBarThumb" ref={refThumb} draggable={true} />
		</Panel>
	);
}
