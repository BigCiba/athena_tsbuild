/**
 * 动态生成 tsconfig.json 文件
 * 确保所有路径引用都使用正确的 addon 名称
 */

const fs = require('fs-extra');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();

/**
 * 生成 VScripts 的 tsconfig.json
 */
function generateVScriptsTsConfig() {
	const outputPath = path.join(paths.contentScripts, 'tsconfig.json');

	const config = {
		compilerOptions: {
			rootDir: ".",
			outDir: `../../../../game/${paths.addonName}/scripts/vscripts`,
			target: "esnext",
			lib: ["esnext"],
			types: ["@moddota/dota-lua-types"],
			moduleResolution: "node",
			ignoreDeprecations: "6.0",
			experimentalDecorators: true,
			strictNullChecks: true,
			strictPropertyInitialization: false,
			incremental: true,
			skipLibCheck: true,
			strict: true,
		},
		tstl: {
			luaTarget: "JIT",
			sourceMapTraceback: true,
			luaPlugins: [
				{
					name: "../tstl_plugins/inject_file.ts",
					variableName: "__TSTL_FILE_PATH__"
				},
				{
					name: "../tstl_plugins/inject_debug_fallback.ts"
				}
			]
		},
		include: [
			".",
			"../../declarations"
		]
	};

	fs.ensureDirSync(path.dirname(outputPath));
	fs.writeJsonSync(outputPath, config, { spaces: '\t' });
	console.log(`✅ Generated VScripts tsconfig.json at ${outputPath}`);
}

/**
 * 生成 VScripts 的 _config.ts 配置文件
 * 提供项目级别的配置常量
 */
function generateVScriptsConfig() {
	const outputPath = path.join(paths.contentScripts, '_config.ts');

	const configContent = `/**
 * 🤖 此文件由 node_scripts/generate-tsconfig.js 自动生成
 * ⚠️  请勿手动编辑 - 每次构建时会被覆盖
 * 
 * 项目配置常量，从 package.json 读取
 */

/**
 * 项目名称（addon 名称）
 * 从 package.json 的 name 字段读取
 */
export const ADDON_NAME = "${paths.addonName}";

/**
 * 调试标签前缀
 * 用于错误追踪和日志系统
 */
export const DEBUG_TAG_SERVER = "${paths.addonName}_debug";
export const DEBUG_TAG_CLIENT = "${paths.addonName}_client_debug";
export const DEBUG_TAG_PUI = "${paths.addonName}_pui_debug";

/**
 * 根据当前环境获取调试标签
 */
export function GetDebugTag(): string {
	return IsServer() ? DEBUG_TAG_SERVER : DEBUG_TAG_CLIENT;
}
`;

	fs.ensureDirSync(path.dirname(outputPath));
	fs.writeFileSync(outputPath, configContent, 'utf-8');
	console.log(`✅ Generated VScripts _config.ts at ${outputPath}`);
}

/**
 * 生成 src 目录的 tsconfig.json
 */
function generateSrcTsConfig() {
	const outputPath = path.join(paths.root, 'src', 'tsconfig.json');

	const config = {
		include: [
			"**/*.ts",
			"**/*.tsx",
			`../content/${paths.addonName}/declarations`
		],
		compilerOptions: {
			rootDir: ".",
			sourceMap: false,
			noImplicitAny: true,
			experimentalDecorators: true,
			allowJs: true,
			removeComments: true,
			inlineSourceMap: true,
			moduleResolution: "Node",
			ignoreDeprecations: "6.0",
			esModuleInterop: true,
			strict: true,
			target: "ESNext",
			types: ["@moddota/panorama-types"],
			lib: ["ESNext"],
			jsx: "preserve",
			jsxImportSource: "solid-js",
			plugins: [
				{
					name: "typescript-styled-plugin",
					lint: {
						validProperties: [
							"flow-children",
							"horizontal-align",
							"wash-color",
							"saturation",
							"brightness",
							"contrast",
							"tooltip-position"
						]
					}
				}
			]
		}
	};

	fs.ensureDirSync(path.dirname(outputPath));
	fs.writeJsonSync(outputPath, config, { spaces: '\t' });
	console.log(`✅ Generated src tsconfig.json at ${outputPath}`);
}

/**
 * 主函数
 */
function main() {
	console.log(`📝 Generating configuration files for addon: ${paths.addonName}`);

	try {
		generateVScriptsTsConfig();
		// generateVScriptsConfig();
		generateSrcTsConfig();
		console.log(`\n✨ All configuration files generated successfully!`);
	} catch (error) {
		console.error('❌ Error generating configuration files:', error);
		process.exit(1);
	}
}

// 如果直接运行此脚本
if (require.main === module) {
	main();
}

module.exports = {
	generateVScriptsTsConfig,
	// generateVScriptsConfig,
	generateSrcTsConfig,
	main
};
