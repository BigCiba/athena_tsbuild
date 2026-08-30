import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./cosmeticPreview.less";

interface CosmeticPreviewProps {
	heroName?: string;
	bodyGroup?: string;
	bodyGroupChoice?: number;
	/** 回调获取内部 DOTAScenePanel 引用 */
	sceneRef?: (scene: ScenePanel) => void;
	/** 回调onload */
	sceneReady?: (scene: ScenePanel) => void;
}

export const CosmeticPreview: ParentComponent<PanelAttributes & CosmeticPreviewProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const [key, SetKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "hero_preview" as const;
	let queueReleased = false;
	let reload = false;
	let queueToken = QueueSerialSceneEntityLoad(entityName, () => {
		setSceneEnabled(true);
	});
	const releaseQueueToken = () => {
		if (!queueReleased) {
			queueReleased = true;
			ReleaseSerialSceneEntityLoad(entityName, queueToken);
		}
	};

	onCleanup(() => {
		let s = key();
		if (s != undefined) {
			StopWaitSceneEntityLoad(entityName, s);
			SetKey(undefined);
		}
		releaseQueueToken();
	});
	return <Panel {...others} class={classNames("CosmeticPreview", local.class)} >
		<Show when={sceneEnabled()}>
			<DOTAScenePanel
				id="CosmeticPreviewScene"
				animate-during-pause
				map="scene/hero_preview"
				camera="camera_dist"
				light="preview_light"
				renderdeferred
				rendershadows
				deferredalpha
				particleonly={false}
				allowrotation
				// @ts-ignore
				squarePixels
				//@ts-ignore
				renderwaterreflections
				antialias
				allowsuspendrepaint
				ref={(self) => {
					props.sceneRef?.(self);
					reload = false;
					SetKey(WaitSceneEntityLoad(entityName, { heroName: props.heroName, bodyGroup: props.bodyGroup, bodyGroupChoice: props.bodyGroupChoice }));
					let checkUpdate = () => {
						let s = key();
						if (!self.IsValid() || s == undefined) {
							if (s != undefined) {
								StopWaitSceneEntityLoad(entityName, s);
								SetKey(undefined);
							}
							releaseQueueToken();
						} else {
							$.Schedule(0, checkUpdate);
						}
					};
					checkUpdate();
				}}
				onload={(self) => {
					props.sceneReady?.(self);
					if (reload) {
						setSceneEnabled(false);
						queueReleased = false;
						queueToken = QueueSerialSceneEntityLoad(entityName, () => {
							setSceneEnabled(true);
						});
					} else {
						let s = key();
						if (s != undefined) {
							StopWaitSceneEntityLoad(entityName, s);
							SetKey(undefined);
						}
						releaseQueueToken();
						if (reload == false) {
							reload = true;
						}
					} self.LerpToCameraEntity("preview_camera_far", 0.25);
				}}
			/>
		</Show>
		{local.children}
	</Panel>;
};