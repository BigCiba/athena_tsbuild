import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { existsSync, readdirSync } from 'node:fs';
import path, { join } from 'node:path';
import { RollupWatchOptions } from 'rollup';
import { GenerateKVFiles } from './plugin-kv';
import { fixLibs } from "./plugin-libs-inject";
import { GenerateCustomUIManifest } from './plugin-manifest';
import { GeneratePolyfill } from './plugin-polyfill';
import { SaveFresh } from "./plugin-save-fresh";
import { GenerateXML } from './plugin-xml';
import { rollupPluginLess } from './rollup-plugin-less';
import compatiblePanorama from './rollup-plugin-panorama';
import { ImageGuardMode, PanoramaImageGuard } from './panorama-image-guard';
import { ContextMenu, Panorama, Tooltip } from './utils';

/**
 * 从 configure 文件夹获取所有配置文件名
 */
function getConfigureFiles(configureDir: string): string[] {
	if (!existsSync(configureDir)) {
		console.warn(`Configure directory not found: ${configureDir}`);
		return [];
	}

	try {
		const files = readdirSync(configureDir);
		return files
			.filter(file => file.endsWith('.js') && !file.startsWith('.'))
			.map(file => file.replace('.js', ''))
			.sort();
	} catch (error) {
		console.error(`Error reading configure directory ${configureDir}:`, error);
		return [];
	}
}

interface PackageInfo {
	name: string,
	panorama?: {
		CustomLoadingScreen?: string,
		TeamSelect?: string,
		Hud?: string[],
		FlyoutScoreboard?: string[],
		Tooltip?: string[],
		ContextMenu?: string[],
		ManifestScripts?: string[],
		KV?: string[],
		Less?: string[],
		ServiceConfig?: Record<string, any>,
	};
}
export default function GetRollupWatchOptions(rootPath: string, packageInfo: PackageInfo, imageMode: ImageGuardMode = 'fallback') {
	let pagesUrl = rootPath + "/ui";
	const addonName = packageInfo.name;
	const panorama = packageInfo.panorama ?? {};
	const imageGuard = new PanoramaImageGuard({
		projectRoot: path.resolve(rootPath, '..'),
		contentImages: join(__dirname, `../content/${addonName}/panorama/images`),
		gameImages: join(__dirname, `../game/${addonName}/panorama/images`),
		mode: imageMode,
	});

	let PanelList: {
		name: string;
		type: 'Hud' | 'FlyoutScoreboard';
	}[] = [];
	let ManifestScripts: string[] = [];
	let KVConfigs: string[] = [];
	let ConfigureList: string[] = [];
	let TooltipList: string[] = [];
	let LessConfigs: string[] = [];
	if (panorama.Hud) {
		for (const hud of panorama.Hud) {
			PanelList.push({ name: hud, type: 'Hud' });
		}
	}
	if (panorama.FlyoutScoreboard) {
		for (const flyoutScoreboard of panorama.FlyoutScoreboard) {
			PanelList.push({ name: flyoutScoreboard, type: 'FlyoutScoreboard' });
		}
	}

	if (panorama.KV) {
		KVConfigs = panorama.KV;
	}

	if (panorama.Less) {
		LessConfigs = panorama.Less;
	}

	// 从 configure 文件夹自动获取配置文件列表
	const configureDir = join(__dirname, `../content/${addonName}/panorama/scripts/custom_game/configure`);
	ConfigureList = getConfigureFiles(configureDir);

	// 显示检测到的配置文件
	if (ConfigureList.length > 0) {
		console.log('📋 Auto-detected configure files:');
		ConfigureList.forEach(config => {
			console.log(`   - ${config}.js`);
		});
	}
	// if (panorama.ServiceConfig) {
	// 	for (const configure in panorama.ServiceConfig) {
	// 		const configName = panorama.ServiceConfig[configure].output_name ?? configure;
	// 		if (!ConfigureList.includes(configName)) {
	// 			ConfigureList.push(configName);
	// 		}
	// 	}
	// }
	if (panorama.ManifestScripts) {
		for (const script of panorama.ManifestScripts) {
			ManifestScripts.push(script);
		}
	}
	// 入口文件夹
	const pages = PanelList.filter(v => {
		return existsSync(path.join(pagesUrl, `${v.name}/${v.name}.tsx`));
	});
	const inputFiles = pages.map(v => {
		return path.join(pagesUrl, `${v.name}/${v.name}.tsx`);
	});
	if (panorama.Tooltip) {
		panorama.Tooltip.filter(v => {
			let p = path.join(pagesUrl, `tooltips/${v}/${v}.tsx`);
			if (existsSync(p)) {
				inputFiles.push(p);
				TooltipList.push(v);
				return true;
			}
			return false;
		});
	}
	if (panorama.ContextMenu) {
		panorama.ContextMenu.filter(v => {
			let p = path.join(pagesUrl, `context_menus/${v}/${v}.tsx`);
			if (existsSync(p)) {
				inputFiles.push(p);
				return true;
			}
			return false;
		});
	}
	if (panorama.CustomLoadingScreen) {
		inputFiles.push(path.join(pagesUrl, `${panorama.CustomLoadingScreen}/${panorama.CustomLoadingScreen}.tsx`));
	}
	if (panorama.TeamSelect) {
		inputFiles.push(path.join(pagesUrl, `${panorama.TeamSelect}/${panorama.TeamSelect}.tsx`));
	}
	console.log(pages.map(v => Panorama + ' 👁️  ' + v.name).join('\n'));
	if (panorama.Tooltip) {
		console.log(panorama.Tooltip.map(v => Tooltip + ' 👁️  ' + v).join('\n'));
	}
	if (panorama.ContextMenu) {
		console.log(panorama.ContextMenu.map(v => ContextMenu + ' 👁️  ' + v).join('\n'));
	}

	const layoutDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/layout/custom_game'
	);

	const scriptsDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/scripts/custom_game'
	);

	const polyfillRoot = join(__dirname, '../src/polyfill');
	const packageFile = join(__dirname, '../package.json');
	const polyfillOutput = join(
		__dirname,
		'../content/' + addonName + '/panorama/scripts/custom_game/panorama-polyfill.js'
	);

	const stylesDir = join(
		__dirname,
		'../content/' + addonName + '/panorama/styles/custom_game'
	);

	const options: RollupWatchOptions = {
		input: inputFiles,
		output: {
			sourcemap: false,
			dir: scriptsDir,
			format: 'cjs',
			entryFileNames: `[name].js`,
			chunkFileNames: `[name].js`,
			assetFileNames: `[name].[ext]`,
			manualChunks(id, api) {
				// const u = new URL(id, 'file:');
				if (
					id.includes('commonjsHelpers.js') ||
					id.includes('rollupPluginBabelHelpers.js') ||
					id.search(/[\\/]node_modules[\\/]/) >= 0 ||
					id.search(/[\\/]inject_modules[\\/]/) >= 0
				) {
					return 'libs';
				}
			}
		},
		plugins: [
			babel({
				comments: false,
				exclude: 'node_modules/**',
				extensions: ['.js', '.ts', '.tsx'],
				babelHelpers: 'bundled',
				presets: [
					['@babel/preset-env', { targets: { node: '18.12' } }],
					'@babel/preset-typescript',
					[
						'@bigciba/babel-preset-solid-panorama',
						{
							moduleName: '@bigciba/solid-panorama-runtime',
							generate: 'universal'
						}
					]
				],
				plugins: [
					'@babel/plugin-transform-typescript',
					'babel-plugin-macros'
				]
			}),
			alias({
				entries: [
					{
						find: '@common/(.*)',
						replacement: join(__dirname, 'pages/common/$1.ts')
					}
				]
			}),
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify('production')
				// 'process.env.NODE_ENV': JSON.stringify('development'),
			}),
			// rollupTypescript({
			//     tsconfig: path.join(rootPath, `tsconfig.json`)
			// }),
			commonjs(),
			nodeResolve({ extensions: ['.tsx', '.ts', '.js', '.jsx'] }),
			compatiblePanorama({ addonName }),
			// rollupPluginXML({
			// 	inputFiles,
			// 	dir: layoutDir,
			// 	resolveFilename(filename) {
			// 		if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
			// 			return `tooltips/${filename}`;
			// 		} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
			// 			return `context_menus/${filename}`;
			// 		}
			// 		return filename;
			// 	}
			// }),
			GenerateXML({
				inputFiles,
				rootPath: pagesUrl,
				dir: layoutDir,
				globalStyles: LessConfigs,
				imageGuard,
				resolveFilename(filename) {
					if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
						return `tooltips/${filename}`;
					} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
						return `context_menus/${filename}`;
					}
					return filename;
				}
			}),
			rollupPluginLess({
				inputFiles,
				dir: stylesDir,
				rootPath: rootPath,
				globalLessFiles: LessConfigs.map(f => join(rootPath, 'less', f)),
				imageGuard,
				resolveFilename(filename) {
					if (panorama.Tooltip && panorama.Tooltip.indexOf(filename) != -1) {
						return `tooltips/${filename}`;
					} else if (panorama.ContextMenu && panorama.ContextMenu.indexOf(filename) != -1) {
						return `context_menus/${filename}`;
					}
					return filename;
				}
			}),
			GeneratePolyfill({
				packageFile,
				rootDir: polyfillRoot,
				outputFile: polyfillOutput
			}),
			GenerateKVFiles({
				npcRoot: path.join(__dirname, `../game/${addonName}/scripts/npc`),
				outputDir: path.join(scriptsDir, 'kv'),
				tsDefinitionPath: path.join(__dirname, '../src/declarations/kv.d.ts'),
				kvConfigs: KVConfigs
			}),
			GenerateCustomUIManifest({
				PanelList,
				ManifestScripts: ManifestScripts,
				KVConfigs,
				TooltipList,
				ConfigureList,
				rootPath: pagesUrl,
				dir: layoutDir,
				scriptsDir: scriptsDir,
				npcRoot: path.join(__dirname, `../game/${addonName}/scripts/npc`),
			}),
			fixLibs(),
			SaveFresh(),
			imageGuard.plugin(),
		]
	};

	return options;
}
