import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { Plugin } from "rollup";
import { ensureDir, writeFileCache } from "./utils";

const { parseKV, objToJS, generateTSDefinition, extractBaseFiles } = require("../node_scripts/kv-parser");

interface KVPluginOptions {
	/** KV源文件根目录 */
	npcRoot: string;
	/** JS输出目录 */
	outputDir: string;
	/** TypeScript定义文件输出路径 */
	tsDefinitionPath: string;
	/** KV配置列表 (KV文件或文件夹路径,相对于npcRoot) */
	kvConfigs: string[];
}

/**
 * 从路径提取配置名称
 * 例如: units/heroes.kv -> heroes
 *      abilities/hero_abilities.kv -> hero_abilities
 *      items -> items
 */
function extractNameFromPath(kvPath: string): string {
	const normalized = kvPath.replace(/\\/g, '/');
	const withoutExt = normalized.replace(/\.(kv|txt)$/, '');
	const parts = withoutExt.split('/');
	return parts[parts.length - 1];
}

/**
 * 收集KV文件
 */
function collectKVFiles(basePath: string, relativePath: string): string[] {
	const fullPath = path.join(basePath, relativePath);
	const files: string[] = [];

	if (!existsSync(fullPath)) {
		console.warn(`KV path not found: ${fullPath}`);
		return files;
	}

	const stat = statSync(fullPath);

	if (stat.isFile()) {
		// 单个文件
		if (fullPath.endsWith('.txt') || fullPath.endsWith('.kv')) {
			files.push(relativePath);
		}
	} else if (stat.isDirectory()) {
		// 文件夹，递归收集（排序保证确定性）
		const entries = readdirSync(fullPath).sort();
		for (const entry of entries) {
			const entryRelPath = path.join(relativePath, entry);
			files.push(...collectKVFiles(basePath, entryRelPath));
		}
	}

	return files;
}

/**
 * 获取KV文件的变量名
 */
function getKVVariableName(filePath: string, configName: string): string {
	// 使用配置名称作为变量名
	return configName;
}

/**
 * 处理KV文件转JS（只解析不写文件）
 */
function parseKVFile(
	kvFilePath: string
): { success: boolean; data?: any; rootKey?: string; } {
	try {
		const content = readFileSync(kvFilePath, 'utf-8');
		// 传入文件路径以支持#base指令解析
		const { rootKey, data } = parseKV(content, kvFilePath);
		return { success: true, data, rootKey };
	} catch (error) {
		console.error(`✗ Failed to parse KV file ${kvFilePath}:`, error);
		return { success: false };
	}
}

/**
 * 写入KV数据到JS文件
 */
function writeKVToJS(
	varName: string,
	data: any,
	outputDir: string
): boolean {
	try {
		// 生成JS内容
		const jsContent = `GameUI.CustomUIConfig().${varName} = ${objToJS(data)};\n`;

		// 输出路径（outputDir已经包含kv子目录）
		const outputPath = path.join(
			outputDir,
			varName + '.js'
		);

		ensureDir(path.dirname(outputPath));
		writeFileCache(outputPath, jsContent);
		return true;
	} catch (error) {
		console.error(`✗ Failed to write JS file for ${varName}:`, error);
		return false;
	}
}

/**
 * 递归收集所有#base引用的文件
 * @param kvFilePath KV文件路径
 * @param collected 已收集的文件集合
 */
function collectBaseFiles(kvFilePath: string, collected: Set<string> = new Set()): Set<string> {
	if (collected.has(kvFilePath) || !existsSync(kvFilePath)) {
		return collected;
	}

	collected.add(kvFilePath);

	try {
		const content = readFileSync(kvFilePath, 'utf-8');
		const baseFiles = extractBaseFiles(content);
		const fileDir = path.dirname(kvFilePath);

		for (const baseFile of baseFiles) {
			const basePath = path.resolve(fileDir, baseFile);
			collectBaseFiles(basePath, collected);
		}
	} catch (error) {
		// 忽略读取错误
	}

	return collected;
}

/**
 * KV文件处理插件
 */
export function GenerateKVFiles(options: KVPluginOptions): Plugin {
	const kvDataList: Array<{ name: string; data: any; }> = [];
	const generatedConfigs: string[] = []; // 记录实际生成了文件的配置
	let isFirstBuild = true; // 标记是否是首次构建
	// KV文件路径 -> 受影响的配置名称集合
	// 同一个文件可能同时属于目录配置(abilities/)且又被 npc_abilities_custom.txt 通过 #base 引用。
	// 需要同时触发多个 config 的重建。
	const kvFileToConfig = new Map<string, Set<string>>();

	return {
		name: 'plugin-kv',

		async buildStart() {
			// 构建KV文件到配置名称的映射，并监听所有KV文件（包括#base引用的文件）
			kvFileToConfig.clear();
			for (const configPath of options.kvConfigs) {
				const configName = extractNameFromPath(configPath);
				const kvFiles = collectKVFiles(options.npcRoot, configPath);
				for (const kvFile of kvFiles) {
					const fullPath = path.join(options.npcRoot, kvFile);

					// 收集该文件及其所有#base引用的文件
					const allFiles = collectBaseFiles(fullPath);
					for (const file of allFiles) {
						const key = path.resolve(file);
						let configs = kvFileToConfig.get(key);
						if (!configs) {
							configs = new Set<string>();
							kvFileToConfig.set(key, configs);
						}
						configs.add(configName);
						this.addWatchFile(key);
					}
				}
			}
		},

		watchChange(id: string) {
			// 只有在非首次构建时才处理变化
			if (isFirstBuild) {
				return;
			}

			const resolvedId = path.resolve(id);

			// 检查变化的文件是否是KV文件
			const configNames = kvFileToConfig.get(resolvedId);
			if (configNames === undefined || configNames.size === 0) {
				return;
			}

			console.log(`\n🔄 KV file changed: ${path.basename(resolvedId)} (configs: ${Array.from(configNames).join(", ")})`);

			for (const configName of configNames) {
				rebuildConfig(configName);
			}

			// 重新生成 TypeScript 定义文件（包含所有配置）
			if (kvDataList.length > 0) {
				const tsContent = generateTSDefinition(kvDataList);
				ensureDir(path.dirname(options.tsDefinitionPath));
				writeFileCache(options.tsDefinitionPath, tsContent);
				console.log(`✓ Updated TypeScript definitions (trigger: ${path.basename(resolvedId)})`);
			}
		},

		writeBundle() {
			// 只在首次构建时处理所有配置
			if (!isFirstBuild) {
				return;
			}

			console.log('\n🔨 Generating all KV->JS files (first build)...');

			kvDataList.length = 0;
			generatedConfigs.length = 0;

			// 处理每个KV配置
			for (const configPath of options.kvConfigs) {
				processConfigInternal(configPath);
			}

			// 生成TypeScript定义文件
			if (kvDataList.length > 0) {
				const tsContent = generateTSDefinition(kvDataList);
				ensureDir(path.dirname(options.tsDefinitionPath));
				writeFileCache(options.tsDefinitionPath, tsContent);
				console.log(`✓ Generated TypeScript definitions: ${path.basename(options.tsDefinitionPath)}`);
			}

			// 标记首次构建完成
			isFirstBuild = false;
		}
	};

	function rebuildConfig(configName: string) {
		// 重新生成该配置数据
		const configPath = options.kvConfigs.find(cp => extractNameFromPath(cp) === configName);
		if (configPath === undefined) {
			return;
		}

		const kvFiles = collectKVFiles(options.npcRoot, configPath);
		if (kvFiles.length === 0) {
			return;
		}

		// 检查是文件还是文件夹
		const fullPath = path.join(options.npcRoot, configPath);
		const isDirectory = existsSync(fullPath) && statSync(fullPath).isDirectory();

		if (isDirectory) {
			// 文件夹模式：每个文件生成独立的 JS 文件
			for (const kvFile of kvFiles) {
				const kvFilePath = path.join(options.npcRoot, kvFile);
				const fileName = extractNameFromPath(kvFile);
				const result = parseKVFile(kvFilePath);

				if (result.success && result.data) {
					console.log(`✓ Parsed KV: ${fileName} (${path.basename(kvFilePath)})`);

					// 写入JS文件
					if (writeKVToJS(fileName, result.data, options.outputDir)) {
						console.log(`✓ Generated KV->JS: ${fileName}`);
					}

					// 更新数据列表
					const existingIndex = kvDataList.findIndex(item => item.name === fileName);
					if (existingIndex !== -1) {
						kvDataList.splice(existingIndex, 1, { name: fileName, data: result.data });
					} else {
						kvDataList.push({ name: fileName, data: result.data });
					}
				}
			}
		} else {
			// 单文件模式
			const kvFilePath = path.join(options.npcRoot, kvFiles[0]);
			const result = parseKVFile(kvFilePath);

			if (result.success && result.data) {
				console.log(`✓ Parsed KV: ${configName} (${path.basename(kvFilePath)})`);

				// 写入JS文件
				if (writeKVToJS(configName, result.data, options.outputDir)) {
					console.log(`✓ Generated KV->JS: ${configName}`);
				}

				const existingIndex = kvDataList.findIndex(item => item.name === configName);
				if (existingIndex !== -1) {
					kvDataList.splice(existingIndex, 1, { name: configName, data: result.data });
				} else {
					kvDataList.push({ name: configName, data: result.data });
				}
			}
		}
	}

	/**
	 * 处理单个配置的内部函数
	 */
	function processConfigInternal(configPath: string): void {
		const configName = extractNameFromPath(configPath);
		const kvFiles = collectKVFiles(options.npcRoot, configPath);

		if (kvFiles.length === 0) {
			console.warn(`No KV files found for config: ${configPath}`);
			return;
		}

		// 检查是文件还是文件夹
		const fullPath = path.join(options.npcRoot, configPath);
		const isDirectory = existsSync(fullPath) && statSync(fullPath).isDirectory();

		if (isDirectory) {
			// 文件夹模式：每个文件生成独立的 JS 文件
			for (const kvFile of kvFiles) {
				const kvFilePath = path.join(options.npcRoot, kvFile);
				const fileName = extractNameFromPath(kvFile); // 使用文件自己的名字
				const result = parseKVFile(kvFilePath);

				if (result.success && result.data) {
					console.log(`✓ Parsed KV: ${fileName} (${path.basename(kvFilePath)})`);

					// 写入JS文件
					if (writeKVToJS(fileName, result.data, options.outputDir)) {
						console.log(`✓ Generated KV->JS: ${fileName}`);
						kvDataList.push({ name: fileName, data: result.data });
						generatedConfigs.push(fileName);
					}
				}
			}
		} else {
			// 单文件模式：使用配置名生成 JS 文件
			const kvFilePath = path.join(options.npcRoot, kvFiles[0]);
			const result = parseKVFile(kvFilePath);

			if (result.success && result.data) {
				console.log(`✓ Parsed KV: ${configName} (${path.basename(kvFilePath)})`);

				// 写入JS文件
				if (writeKVToJS(configName, result.data, options.outputDir)) {
					console.log(`✓ Generated KV->JS: ${configName}`);
					kvDataList.push({ name: configName, data: result.data });
					generatedConfigs.push(configName);
				}
			}
		}
	}
}

/**
 * 获取生成的KV配置列表的辅助函数
 */
export function getGeneratedKVConfigs(npcRoot: string, outputDir: string, kvConfigs: string[]): string[] {
	const generatedConfigs: string[] = [];
	for (const configPath of kvConfigs) {
		const configName = extractNameFromPath(configPath);
		const outputPath = path.join(outputDir, 'kv', `${configName}.js`);
		if (existsSync(outputPath)) {
			generatedConfigs.push(configName);
		}
	}
	return generatedConfigs;
}
