import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./fish3DPreview.less";

interface Fish3DPreviewProps {
	fishID: string | number;
}

export const Fish3DPreview: ParentComponent<PanelAttributes & Fish3DPreviewProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const [key, SetKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "fish_3d_preview" as const;
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
	return <Panel {...others} class={classNames("Fish3DPreview", local.class)} >
		<Show when={sceneEnabled()}>
			<DOTAScenePanel
				id="Fish3DPreviewScene"
				animate-during-pause={true}
				map="scene/fish_3d_preview"
				camera="camera_1"
				light="portrait_light"
				renderdeferred={true}
				rendershadows={true}
				deferredalpha={true}
				particleonly={false}
				allowrotation
				// @ts-ignore
				squarePixels
				antialias={true}
				ref={(self) => {
					reload = false;
					SetKey(WaitSceneEntityLoad(entityName, { fishID: String(props.fishID) }));
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
				}} onload={(self) => {
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
					}
				}} />
		</Show>
		{local.children}
	</Panel>;
};