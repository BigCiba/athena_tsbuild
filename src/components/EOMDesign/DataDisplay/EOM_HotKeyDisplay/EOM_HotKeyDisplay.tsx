import { ParentComponent, Show, createMemo, mergeProps, splitProps } from 'solid-js';
import "./EOM_HotKeyDisplay.less";

const defaultKeyImg: Record<string, string> = {
	"MOUSE0": "hud/h_key_mouse.png",
	"MOUSE1": "hud/h_key_mouse.png",
	"MOUSE2": "hud/h_key_mouse.png",
	"SPACE": "hud/h_key_space.png"
};

interface EOM_HotKeyDisplayAttribute extends PanelAttributes {
	/** 快捷键内容：图片路径或快捷键文本 */
	hotkey?: string;
	/**翻转图片 */
	filp?: boolean;
}

/**
 * 快捷键显示组件
 * 支持显示图片或文本快捷键
 */
export const EOM_HotKeyDisplay: ParentComponent<EOM_HotKeyDisplayAttribute> = (rawProps) => {
	const props = mergeProps({ hotkey: '', filp: false }, { class: "EOM_HotKeyDisplay" }, rawProps);
	const [local, others] = splitProps(props, ['hotkey', 'filp']);
	// 判断是否为图片格式（通过文件扩展名判断）
	const isImage = createMemo(() => {
		if (defaultKeyImg[local.hotkey]) {
			return true;
		}
		const hotkey = local.hotkey || '';
		return /\.(jpg|jpeg|png|vtex)$/i.test(hotkey);
	});

	return (
		<Panel  {...others} classList={{ IsImage: isImage(), Filp: local.hotkey == "MOUSE1" || local.filp }}>
			<Show
				when={isImage()}
				fallback={<>
					<Image class='EOM_HotKeyDisplayBorder' />
					<Label class='EOM_HotKeyDisplayText' text={GetLocalization(local.hotkey)} />
				</>}
			>
				<Image
					class='EOM_HotKeyDisplayImage'
					src={defaultKeyImg[local.hotkey] ? getSrcPath(defaultKeyImg[local.hotkey]) : local.hotkey}
					scaling="stretch-to-cover-preserve-aspect"
				/>
			</Show>
		</Panel>
	);
};