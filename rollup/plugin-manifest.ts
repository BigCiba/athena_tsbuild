import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { Plugin } from "rollup";
import ts from "typescript";
import { ensureDir, writeFileCache } from "./utils";

// 生成custom_ui_manifest.xml文件
/**
 * 从路径提取配置名称
 */
function extractNameFromPath(kvPath: string): string {
	const normalized = kvPath.replace(/\\/g, '/');
	const withoutExt = normalized.replace(/\.(kv|txt)$/, '');
	const parts = withoutExt.split('/');
	return parts[parts.length - 1];
}

/**
 * 获取实际生成的KV配置文件列表
 * 支持文件夹遍历和单文件配置
 */
function getGeneratedKVConfigs(options: {
	KVConfigs: string[];
	scriptsDir: string;
	npcRoot: string;
}): string[] {
	const result: string[] = [];
	const kvOutputDir = path.join(options.scriptsDir, 'kv');

	for (const configPath of options.KVConfigs) {
		const fullPath = path.join(options.npcRoot, configPath);

		// 检查是文件夹还是文件
		if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
			// 文件夹模式：遍历输出目录查找该文件夹生成的所有JS文件
			if (existsSync(kvOutputDir)) {
				const allKVFiles = readdirSync(kvOutputDir)
					.filter(file => file.endsWith('.js'))
					.map(file => file.replace(/\.js$/, ''));

				// 将所有生成的KV文件都添加进去
				for (const kvFile of allKVFiles) {
					if (!result.includes(kvFile)) {
						result.push(kvFile);
					}
				}
			}
		} else {
			// 单文件模式：使用配置名称
			const configName = extractNameFromPath(configPath);
			const jsPath = path.join(kvOutputDir, `${configName}.js`);

			if (existsSync(jsPath)) {
				result.push(configName);
			}
		}
	}

	return result.sort();
}

function collectImageFiles(rootDir: string): string[] {
	const results: string[] = [];
	if (!existsSync(rootDir)) {
		return results;
	}
	const imageExts = new Set([
		".png",
		".jpg",
		".jpeg",
		".tga",
		".vtf",
		".vtex",
		".psd",
		".gif"
	]);
	const walk = (dir: string) => {
		const entries = readdirSync(dir);
		for (const entry of entries) {
			const fullPath = path.join(dir, entry);
			const stat = statSync(fullPath);
			if (stat.isDirectory()) {
				walk(fullPath);
				continue;
			}
			const ext = path.extname(entry).toLowerCase();
			if (imageExts.has(ext)) {
				results.push(fullPath);
			}
		}
	};
	walk(rootDir);
	return results.sort();
}

function toPosixPath(filePath: string): string {
	return filePath.replace(/[\\/]/g, "/");
}

function buildSrcListContent(paths: string[]): string {
	const listText = paths.map(p => `\t"${p}"`).join(",\n");
	return `GameUI.CustomUIConfig().src_list = [\n${listText}\n];`;
}

function getSrcListPaths(options: { scriptsDir: string; npcRoot: string; }): string[] {
	const panoramaRoot = path.join(options.scriptsDir, "..", "..");
	const imagesRoot = path.join(panoramaRoot, "images", "custom_game");
	const gameRoot = path.resolve(options.npcRoot, "..", "..");
	const gameImagesRoot = path.join(gameRoot, "resource", "flash3", "images");

	const panoramaFiles = collectImageFiles(imagesRoot);
	const spellIconFiles = collectImageFiles(path.join(gameImagesRoot, "spellicons"));
	const spellIconAltFiles = collectImageFiles(path.join(gameImagesRoot, "spelicons"));
	const itemFiles = collectImageFiles(path.join(gameImagesRoot, "items"));

	const panoramaPaths = panoramaFiles.map(filePath => {
		const relative = path.relative(panoramaRoot, filePath);
		const fullPath = path.join("panorama", relative);
		return toPosixPath(fullPath);
	});
	const gamePaths = [...spellIconFiles, ...spellIconAltFiles, ...itemFiles].map(filePath => {
		const relative = path.relative(gameRoot, filePath);
		return toPosixPath(relative);
	});

	const all = [...panoramaPaths, ...gamePaths];
	const unique = Array.from(new Set(all));
	unique.sort();
	return unique;
}

export function GenerateCustomUIManifest(options: {
	PanelList: {
		name: string;
		type: 'Hud' | 'FlyoutScoreboard';
	}[];
	ManifestScripts: string[];
	KVConfigs: string[];
	TooltipList: string[];
	ConfigureList: string[];
	rootPath: string;
	dir: string;
	scriptsDir: string;
	npcRoot: string; // 新增：NPC文件根目录
}): Plugin {
	return {
		name: 'plugin-manifest',
		// 监听less文件变更
		async buildStart() {
			for (const file of options.ManifestScripts) {
				const scriptFile = path.join(options.rootPath, "../manifest_scripts", file);
				if (existsSync(scriptFile)) {
					this.addWatchFile(scriptFile);
				}
			}

			const panoramaRoot = path.join(options.scriptsDir, "..", "..");
			const imagesRoot = path.join(panoramaRoot, "images", "custom_game");
			const gameRoot = path.resolve(options.npcRoot, "..", "..");
			const gameImagesRoot = path.join(gameRoot, "resource", "flash3", "images");
			const imageFiles = collectImageFiles(imagesRoot);
			const spellIconFiles = collectImageFiles(path.join(gameImagesRoot, "spellicons"));
			const spellIconAltFiles = collectImageFiles(path.join(gameImagesRoot, "spelicons"));
			const itemFiles = collectImageFiles(path.join(gameImagesRoot, "items"));
			for (const file of [...imageFiles, ...spellIconFiles, ...spellIconAltFiles, ...itemFiles]) {
				this.addWatchFile(file);
			}
		},
		writeBundle(outputOptions, bundle) {
			const compiledScripts = compileManifestScripts(options);

			// 获取实际生成的KV配置列表
			const generatedKVConfigs = getGeneratedKVConfigs(options);

			const srcListPaths = getSrcListPaths({ scriptsDir: options.scriptsDir, npcRoot: options.npcRoot });
			const srcListContent = buildSrcListContent(srcListPaths);
			const kvDir = path.join(options.scriptsDir, "kv");
			ensureDir(kvDir);
			writeFileCache(path.join(kvDir, "src_list.js"), srcListContent);

			const manifestPath = path.join(
				options.dir,
				"custom_ui_manifest.xml"
			);
			const tooltipText = `\t\t<include src="file://{resources}/scripts/custom_game/TooltipList.js"/>`;
			const srcListText = `\t\t<include src="file://{resources}/scripts/custom_game/kv/src_list.js"/>`;
			const kvList = generatedKVConfigs.length > 0
				? generatedKVConfigs.map(name => `\t\t<include src="file://{resources}/scripts/custom_game/kv/${name}.js"/>`).join('\n')
				: '';
			const configureList = options.ConfigureList.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/configure/${v}.js"/>`).join('\n');
			const scriptList = compiledScripts.map(v => `\t\t<include src="file://{resources}/scripts/custom_game/manifest_scripts/${v}.js"/>`).join('\n');
			const panel = options.PanelList.map(v => `\t\t<CustomUIElement type="${v.type}" layoutfile="file://{resources}/layout/custom_game/${v.name}.xml"/>`).join('\n');

			const allScripts = [tooltipText, srcListText, kvList, configureList, scriptList].filter(s => s).join('\n');
			writeFileCache(manifestPath, GetManifestContent(allScripts, panel));

			const text = `GameUI.CustomUIConfig().TooltipList = [${options.TooltipList.map(v => `"${v}"`).join(",")}];`;
			writeFileCache(path.join(
				options.scriptsDir,
				"TooltipList.js"
			), text);
		}
	};
}

/** 获取custom_ui_manifest.xml的内容 */
function GetManifestContent(script: string, panel: string) {
	return `<root>
	<scripts>
${script}
	</scripts>
	<Panel>
${panel}
	</Panel>
</root>`;
}

function compileManifestScripts(options: {
	ManifestScripts: string[];
	rootPath: string;
	scriptsDir: string;
}): string[] {
	const manifestRoot = path.join(options.rootPath, "../manifest_scripts");
	const outputs: string[] = [];
	for (const entry of options.ManifestScripts) {
		const sourcePath = path.join(manifestRoot, entry);
		if (!existsSync(sourcePath)) {
			console.warn(`Manifest script not found: ${entry}`);
			continue;
		}
		const parsed = path.parse(entry);
		const relativeDir = parsed.dir ? parsed.dir : '';
		const baseName = parsed.name;
		const includePath = relativeDir ? path.posix.join(relativeDir.split(path.sep).join('/'), baseName) : baseName;
		const targetDir = path.join(options.scriptsDir, relativeDir, "manifest_scripts");
		ensureDir(targetDir);
		const targetFile = path.join(targetDir, `${baseName}.js`);
		try {
			if (parsed.ext === '.ts' || parsed.ext === '.tsx') {
				const source = readFileSync(sourcePath, 'utf8');
				const result = ts.transpileModule(source, {
					compilerOptions: {
						target: ts.ScriptTarget.ES5,
						module: ts.ModuleKind.None,
						sourceMap: false,
						removeComments: false,
						noImplicitUseStrict: true,
						jsx: ts.JsxEmit.None
					},
					fileName: entry
				});
				writeFileCache(targetFile, result.outputText);
			} else {
				const source = readFileSync(sourcePath, 'utf8');
				writeFileCache(targetFile, source);
			}
			outputs.push(includePath);
		} catch (error) {
			console.error(`Failed to process manifest script ${entry}:`, error);
		}
	}
	return outputs;
}
