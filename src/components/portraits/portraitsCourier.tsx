import classNames from "classnames";
import { createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./portraits.less";

export const PortraitsCourier: ParentComponent<PanelAttributes & { courier_id: number, scale?: number, allowrotation?: boolean; }> = (props) => {
	const [local, others] = splitProps(props, ["class", "scale", "courier_id", "allowrotation"]);
	const [key, SetKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "courier" as const;
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
		let s = key();
		if (s != undefined) {
			StopWaitSceneEntityLoad(entityName, s);
			SetKey(undefined);
		}
		releaseQueueToken();
	});

	return <Panel {...others} class={classNames("PortraitsCourier", local.class)} >
		<Show when={sceneEnabled()}>
			<DOTAScenePanel id="PortraitsCourierScene" animate-during-pause={true} map="scene/courier" camera="camera_1" light="portrait_light" renderdeferred={true} rendershadows={true} deferredalpha={true} particleonly={false} allowrotation={local.allowrotation} antialias={true} yawmax={40} yawmin={40} ref={(self) => {
				SetKey(WaitSceneEntityLoad(entityName, { id: local.courier_id, scale: local.scale }));
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
				let s = key();
				if (s != undefined) {
					StopWaitSceneEntityLoad(entityName, s);
					SetKey(undefined);
					self.FireEntityInput("courier", "SetIdleAnimation", "ACT_DOTA_SPAWN");
					self.FireEntityInput("courier", "SetIdleAnimationLooping", "ACT_DOTA_IDLE");
				}
				releaseQueueToken();
			}} />
		</Show>
	</Panel>;
};
