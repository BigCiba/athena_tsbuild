import classNames from "classnames";
import { createMemo, createSignal, onCleanup, ParentComponent, Show, splitProps } from "solid-js";
import "./portraits.less";

interface PortraitsFullBodyLoadoutProps {
	unit: string;
	allowrotation?: boolean;
	camera?: string;
	/** 渲染背景贴图 */
	background?: boolean;
}

export const PortraitsFullBodyLoadout: ParentComponent<PanelAttributes & PortraitsFullBodyLoadoutProps> = (props) => {
	const [local, others] = splitProps(props, ["unit", "class", "camera", "background", "allowrotation", "children"]);
	const [key, SetKey] = createSignal<string | undefined>(undefined);
	const [sceneEnabled, setSceneEnabled] = createSignal(false);
	const entityName = "portraits_full_body_loadout" as const;
	let camera = createMemo(() => local.camera ?? "default");
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

	return <Panel {...others} class={classNames("PortraitsFullBodyLoadout", local.class)} >
		<DOTAScenePanel id="PortraitsFullBodyLoadoutBG" hittest={false} ref={(self) => {
			if (local.background) {
				const kv = KeyValues.npc_units_custom[local.unit] ?? KeyValues.heroes[local.unit];
				if (kv != undefined && kv.Model2D != undefined && kv.Model2D != "") {
					self.SetUnit(kv.Model2D, "", true);
				}
			}
		}} />
		<Show when={sceneEnabled()}>
			<DOTAScenePanel id="PortraitsFullBodyLoadoutScene" animate-during-pause={true} map="scene/portraits_full_body_loadout" camera={camera()} light="portrait_light" renderdeferred={true} rendershadows={true} deferredalpha={true} particleonly={false} allowrotation={local.allowrotation} antialias={true} ref={(self) => {
				reload = false;
				SetKey(WaitSceneEntityLoad(entityName, { unitname: local.unit, camera: camera() }));
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

export function PortraitsFullBodyLoadout2(props: PanelAttributes & { unit: string, allowrotation?: boolean, camera?: string; }) {
	return <PortraitsFullBodyLoadout {...props} />;
}