import * as fs from "fs";
import { existsSync } from "fs-extra";
import path, { basename, extname, join } from "path";
import { Plugin } from "rollup";
import { addAddonNameToFileStem, ensureDir, writeFileCache } from "./utils";

// 生成XML文件
export function GenerateXML(options: {
	inputFiles: string[];
	rootPath: string;
	dir: string;
	addonName: string;
	globalStyles?: string[];
	resolvePath?: (path: string) => string | undefined;
	resolveFilename?: (filename: string) => string | undefined;
	/** Hud/FlyoutScoreboard 面板名称集合，这些面板的 XML 文件名会添加 addonName 后缀 */
	hudPanelNames?: string[];
}): Plugin {
	return {
		name: 'plugin-xml',
		async buildStart() {
			for (const file of options.inputFiles) {
				const xmlFile = file.replace(/\.tsx?$/, '.xml');
				if (existsSync(xmlFile)) {
					this.addWatchFile(xmlFile);
				}
			}
		},
		async writeBundle() {
			for (const filePath of options.inputFiles) {
				const sourcePath = filePath.replace(/\.tsx?$/, '.xml');

				let sourceContent = existsSync(sourcePath) ? fs.readFileSync(sourcePath, "utf-8") : defaultXML;

				const rawName = basename(filePath, extname(filePath));
				let outFilename = rawName;
				if (options.resolveFilename) {
					outFilename = options.resolveFilename(outFilename) ?? outFilename;
				}
				// 仅对 Hud/FlyoutScoreboard 面板添加 addonName 后缀，Tooltip/ContextMenu 等不加
				const isHudPanel = options.hudPanelNames?.includes(rawName);
				const outputXmlFilename = isHudPanel
					? addAddonNameToFileStem(outFilename, options.addonName)
					: outFilename;
				let outPath = join(
					options.dir,
					outputXmlFilename + '.xml'
				);
				if (options.resolvePath) {
					outPath = options.resolvePath(outPath) ?? outPath;
				}

				// 全局样式（从 package.json 的 Less 配置读取）
				if (options.globalStyles && options.globalStyles.length > 0) {
					for (const style of options.globalStyles) {
						const cssName = style.replace(/\.less$/, '.css');
						if (!sourceContent.includes(`<include src="file://{resources}/styles/custom_game/${cssName}" />`)) {
							sourceContent = sourceContent.replace('</styles>', `\t<include src="file://{resources}/styles/custom_game/${cssName}" />\n\t</styles>`);
						}
					}
				}

				// css
				if (!sourceContent.includes(`<include src="file://{resources}/styles/custom_game/${outFilename}`) && existsSync(filePath.replace(/\.tsx?$/, '.less'))) {
					sourceContent = sourceContent.replace('</styles>', `\t<include src="file://{resources}/styles/custom_game/${outFilename}.css" />\n\t</styles>`);
				}


				// js无法处理为对应路径的，只能直接储存在同一个目录下
				// js
				if (!sourceContent.includes(`<include src="file://{resources}/scripts/custom_game/${basename(outFilename)}`)) {
					sourceContent = sourceContent.replace('<scripts>', `<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/${basename(outFilename)}.js" />`);
				}
				// 自动加入common.js和polyfill.js
				// if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/libs.js" />')) {
				// 	sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/libs.js" />');
				// }

				if (!sourceContent.includes('<include src="s2r://panorama/scripts/sequence_actions.vts_c" />')) {
					sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="s2r://panorama/scripts/sequence_actions.vts_c" />');
				}
				// 自动加入common.js和polyfill.js
				if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/panorama-polyfill.js" />')) {
					sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/panorama-polyfill.js" />');
				}

				// loading screen 特例加入
				if (outFilename == "custom_loading_screen") {
					// 自动加入common.js和polyfill.js
					if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/solid-core.js" />')) {
						sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/solid-core.js" />');
					}
				}

				// 自动加入class（将路径分隔符替换为下划线）
				const className = outFilename.replace(/\//g, '_');
				sourceContent = sourceContent.replace('<Panel class="', `<Panel class="${className} `);
				// if (!sourceContent.includes('<include src="file://{resources}/scripts/custom_game/common.js" />')) {
				// 	sourceContent = sourceContent.replace('<scripts>', '<scripts>\n\t\t<include src="file://{resources}/scripts/custom_game/common.js" />');
				// }
				ensureDir(path.dirname(outPath));
				writeFileCache(outPath, sourceContent);
			}
		}
	};
}

const defaultXML = `<root>
	<styles>
		<include src="s2r://panorama/styles/dotastyles.vcss_c" />
	</styles>
	<scripts>
		<include src="s2r://panorama/scripts/sequence_actions.vts_c" />
	</scripts>
	<Panel class="CustomHudRoot" hittest="false">
	</Panel>
</root>`;
