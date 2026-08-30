import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./weapon3DPreview.less";

interface Weapon3DPreviewProps {
	model: string;
	defaultConfig: string | number;
}

export const Weapon3DPreview: ParentComponent<PanelAttributes & Weapon3DPreviewProps> = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const [key, SetKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "weapon_3d_preview" as const;
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
	return <Panel {...others} class={classNames("Weapon3DPreview", local.class)} >
		<Show when={sceneEnabled()}>
			<DOTAScenePanel id="Weapon3DPreviewScene" animate-during-pause={true} map="scene/weapon_3d_preview" camera="camera_1" light="portrait_light" renderdeferred={true} rendershadows={true} deferredalpha={true} particleonly={false} allowrotation antialias={true} ref={(self) => {
				reload = false;
				SetKey(WaitSceneEntityLoad(entityName, { model: props.model, default_config: String(props.defaultConfig) }));
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