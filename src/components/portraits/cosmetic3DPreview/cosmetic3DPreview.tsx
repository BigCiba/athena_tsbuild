import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./cosmetic3DPreview.less";

interface Cosmetic3DPreviewProps {
	cosmeticID: string | number;
}

/** 在通用可旋转 3D 场景中单独展示一件模型类英雄饰品。 */
export const Cosmetic3DPreview: ParentComponent<PanelAttributes & Cosmetic3DPreviewProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "children", "cosmeticID"]);
	const cosmeticData = () => KeyValues.info_item_cosmetic[String(local.cosmeticID)];
	const [key, setKey] = createSignal<string | undefined>();
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "cosmetic_3d_preview" as const;
	let queueReleased = false;
	let reload = false;
	let queueToken = QueueSerialSceneEntityLoad(entityName, () => setSceneEnabled(true));
	const releaseQueueToken = () => {
		if (queueReleased) return;
		queueReleased = true;
		ReleaseSerialSceneEntityLoad(entityName, queueToken);
	};

	onCleanup(() => {
		const waitingKey = key();
		if (waitingKey != undefined) {
			StopWaitSceneEntityLoad(entityName, waitingKey);
			setKey(undefined);
		}
		releaseQueueToken();
	});

	return (
		<Panel {...others} class={classNames("Cosmetic3DPreview", local.class)}>
			<Show when={sceneEnabled() && cosmeticData()?.model}>
				<DOTAScenePanel
					id="Cosmetic3DPreviewScene"
					animate-during-pause={true}
					map="scene/cosmetic_3d_preview"
					camera="camera_1"
					light="portrait_light"
					renderdeferred={true}
					rendershadows={true}
					deferredalpha={true}
					particleonly={false}
					allowrotation
					antialias={true}
					ref={(scene) => {
						reload = false;
						setKey(WaitSceneEntityLoad(entityName, {
							cosmetic_id: String(local.cosmeticID),
						}));
						const checkUpdate = () => {
							const waitingKey = key();
							if (!scene.IsValid() || waitingKey == undefined) {
								if (waitingKey != undefined) {
									StopWaitSceneEntityLoad(entityName, waitingKey);
									setKey(undefined);
								}
								releaseQueueToken();
								return;
							}
							$.Schedule(0, checkUpdate);
						};
						checkUpdate();
					}}
					onload={() => {
						if (reload) {
							setSceneEnabled(false);
							queueReleased = false;
							queueToken = QueueSerialSceneEntityLoad(entityName, () => setSceneEnabled(true));
							return;
						}
						const waitingKey = key();
						if (waitingKey != undefined) {
							StopWaitSceneEntityLoad(entityName, waitingKey);
							setKey(undefined);
						}
						releaseQueueToken();
						reload = true;
					}}
				/>
			</Show>
			{local.children}
		</Panel>
	);
};
