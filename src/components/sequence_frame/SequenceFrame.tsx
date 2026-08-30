import classNames from "classnames";
import { Accessor, Index, ParentComponent, createEffect, createMemo, createSignal, mergeProps, onCleanup, onMount, splitProps, untrack } from "solid-js";
import "./SequenceFrame.less";

type MaybeAccessor<T> = T | Accessor<T>;

export interface CreateSequenceFrameOptions {
	frames: MaybeAccessor<string[]>;
	/** Frame switch interval in milliseconds. */
	interval?: MaybeAccessor<number>;
	/** @default true */
	isLoop?: MaybeAccessor<boolean>;
	/** @default true */
	autoPlay?: boolean;
}

export interface SequenceFrameProps extends PanelAttributes {
	class?: string;
	className?: string;
}

function clampFrame(index: number, frameCount: number) {
	if (frameCount <= 0) {
		return 0;
	}
	return Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
}

function normalizeInterval(interval: number | undefined) {
	return interval != undefined && Number.isFinite(interval) ? Math.max(1, interval) : 100;
}

export function createSequenceFrame(options: CreateSequenceFrameOptions) {
	const frames = createMemo(() => typeof options.frames === "function" ? options.frames() : options.frames);
	const frameCount = createMemo(() => frames().length);
	const [controlledIsLoop, setControlledIsLoop] = createSignal<boolean>();
	const isLoop = createMemo(() => {
		const controlled = controlledIsLoop();
		if (controlled != undefined) {
			return controlled;
		}
		return typeof options.isLoop === "function" ? options.isLoop() : options.isLoop ?? true;
	});
	const autoPlay = options.autoPlay ?? true;
	const [controlledInterval, setControlledInterval] = createSignal<number>();
	const interval = createMemo(() => {
		const controlled = controlledInterval();
		if (controlled != undefined) {
			return controlled;
		}
		const optionInterval = typeof options.interval === "function" ? options.interval() : options.interval;
		return normalizeInterval(optionInterval);
	});

	const [currentFrame, setCurrentFrame] = createSignal(0);
	const [isPlaying, setIsPlaying] = createSignal(false);
	const [isFinished, setIsFinished] = createSignal(frameCount() <= 1 && !isLoop());

	let timer: ReturnType<typeof setInterval> | undefined;
	let timerInterval: number | undefined;

	function clearTimer() {
		if (timer != undefined) {
			clearInterval(timer);
			timer = undefined;
			timerInterval = undefined;
		}
	}

	function startTimer() {
		timerInterval = interval();
		timer = setInterval(tick, timerInterval);
	}

	function restartTimer() {
		clearTimer();
		startTimer();
	}

	function finish() {
		clearTimer();
		setIsPlaying(false);
		setIsFinished(true);
	}

	function tick() {
		const count = frameCount();
		if (count <= 0) {
			finish();
			setCurrentFrame(0);
			return;
		}
		if (count <= 1) {
			if (!isLoop()) {
				finish();
			}
			setCurrentFrame(0);
			return;
		}

		setCurrentFrame((frame) => {
			const lastFrame = count - 1;
			if (frame >= lastFrame) {
				if (isLoop()) {
					return 0;
				}
				finish();
				return lastFrame;
			}
			return frame + 1;
		});
	}

	function play() {
		if (timer != undefined || isPlaying()) {
			return;
		}

		const count = frameCount();
		if (count <= 0) {
			setCurrentFrame(0);
			setIsFinished(true);
			setIsPlaying(false);
			return;
		}
		if (count <= 1) {
			setCurrentFrame(0);
			setIsFinished(!isLoop());
			setIsPlaying(false);
			return;
		}
		if (!isLoop() && isFinished()) {
			return;
		}

		setIsFinished(false);
		setIsPlaying(true);
		startTimer();
	}

	function pause() {
		clearTimer();
		setIsPlaying(false);
	}

	function reset() {
		pause();
		setCurrentFrame(0);
		setIsFinished(frameCount() <= 1 && !isLoop());
	}

	function stop() {
		reset();
	}

	function replay() {
		reset();
		play();
	}

	function gotoFrame(index: number) {
		setCurrentFrame(clampFrame(index, frameCount()));
		setIsFinished(false);
	}

	function setLoop(loop: boolean) {
		setControlledIsLoop(loop);
		if (loop && isFinished()) {
			setIsFinished(false);
		}
	}

	function setFrameInterval(frameInterval: number) {
		setControlledInterval(normalizeInterval(frameInterval));
	}

	createEffect(() => {
		const nextInterval = interval();
		if (timer != undefined && timerInterval !== nextInterval && untrack(isPlaying)) {
			restartTimer();
		}
	});

	createEffect((previous: { frames: string[]; loop: boolean } | undefined) => {
		const frameList = frames();
		const count = frameList.length;
		const loop = isLoop();
		setCurrentFrame((frame) => clampFrame(frame, count));
		if (count <= 1) {
			clearTimer();
			setIsPlaying(false);
			setIsFinished(!loop);
		} else if (previous != undefined && (previous.frames !== frameList || previous.loop !== loop) && untrack(isFinished)) {
			setIsFinished(false);
		}

		return { frames: frameList, loop };
	});

	onMount(() => {
		if (autoPlay) {
			play();
		}
	});

	onCleanup(() => {
		clearTimer();
	});

	const SequenceFrame: ParentComponent<SequenceFrameProps> = (props) => {
		const merged = mergeProps(props, { class: classNames("SequenceFrame", props.class, props.className) });
		const [local, others] = splitProps(merged, ["children", "className"]);

		return (
			<Panel {...others}>
				<Index each={frames()}>
					{(src, index) => (
						<Image
							class="SequenceFrameImage"
							src={src()}
							visible={currentFrame() == index}
							hittest={false}
						/>
					)}
				</Index>
				{local.children}
			</Panel>
		);
	};

	return {
		SequenceFrame,
		currentFrame,
		isPlaying,
		isFinished,
		isLoop,
		interval,
		frameCount,
		setLoop,
		setFrameInterval,
		play,
		pause,
		stop,
		reset,
		replay,
		gotoFrame,
	};
}
