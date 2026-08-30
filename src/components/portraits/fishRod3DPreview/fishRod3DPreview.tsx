import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./fishRod3DPreview.less";

interface FishRod3DPreviewProps {
	model: string;
}

export const FishRod3DPreview: ParentComponent<PanelAttributes & FishRod3DPreviewProps> = (props) => {
	const [local, others] = splitProps(props, ["model", "class", "children"]);
	const [key, setKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "fish_rod_preview" as const;
	let queueReleased = false;
	const queueToken = QueueSerialSceneEntityLoad(entityName, () => {
		setSceneEnabled(true);
	});
	const releaseQueueToken = () => {
		if (!queueReleased) {
			queueReleased = true;
			ReleaseSerialSceneEntityLoad(entityName, queueToken);
		}
	};

	onCleanup(() => {
		const currentKey = key();
		if (currentKey != undefined) {
			StopWaitSceneEntityLoad(entityName, currentKey);
			setKey(undefined);
		}
		releaseQueueToken();
	});

	return <Panel {...others} class={classNames("FishRod3DPreview", local.class)}>
		<Show when={sceneEnabled()}>
			<DOTAScenePanel id="FishRod3DPreviewScene" animate-during-pause={true} map="scene/fish_rod_preview" camera="camera_1" light="portrait_light" renderdeferred={true} rendershadows={true} deferredalpha={true} particleonly={false} allowrotation={true} antialias={true} ref={(self) => {
				setKey(WaitSceneEntityLoad(entityName, { model: local.model }));
				const checkUpdate = () => {
					const currentKey = key();
					if (!self.IsValid() || currentKey == undefined) {
						if (currentKey != undefined) {
							StopWaitSceneEntityLoad(entityName, currentKey);
							setKey(undefined);
						}
						releaseQueueToken();
					} else {
						$.Schedule(0, checkUpdate);
					}
				};
				checkUpdate();
			}} onload={() => {
				const currentKey = key();
				if (currentKey != undefined) {
					StopWaitSceneEntityLoad(entityName, currentKey);
					setKey(undefined);
				}
				releaseQueueToken();
			}} />
		</Show>
		{local.children}
	</Panel>;
};