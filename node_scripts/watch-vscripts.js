const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');
const { generateVScriptsTsConfig } = require('./generate-tsconfig');
const { syncEnums, shouldIgnoreMirroredChange, getEnumWatchPaths } = require('./sync-enums');
const { generateModifiersIndex } = require('./generate-modifiers-index');

const paths = getAddonPaths();
const ROOT_DIR = paths.root;
const SOURCE_DIR = paths.contentScripts;
const OUTPUT_DIR = paths.gameScripts;
const WRITE_RETRY_PRELOAD = path.join(__dirname, 'retry-vscripts-write.js').replace(/\\/g, '/');
const NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --require="${WRITE_RETRY_PRELOAD}"`.trim();
const TSTL_ENTRY = path.join(ROOT_DIR, 'node_modules', '@bigciba', 'typescript-to-lua', 'dist', 'tstl.js');

console.log('🔍 Starting TSTL watch with auto-cleanup...');

// 先同步双端 enums
try {
	syncEnums();
} catch (error) {
	console.error('❌ Failed to sync enums:', error);
	process.exit(1);
}

// 生成 modifiers/index.ts
try {
	generateModifiersIndex();
} catch (error) {
	console.error('❌ Failed to generate modifiers index:', error);
	process.exit(1);
}

// 生成 tsconfig.json（确保配置是最新的）
try {
	generateVScriptsTsConfig();
} catch (error) {
	console.error('❌ Failed to generate tsconfig.json:', error);
	process.exit(1);
}

console.log(`📂 Source: ${SOURCE_DIR}`);
console.log(`📂 Output: ${OUTPUT_DIR}`);

// 启动 TSTL 监听进程 (在源码目录运行，自动读取 tsconfig.json)
// 注入 NODE_PATH 确保跨盘插件（tstl_plugins）能解析到项目的 node_modules
// 直接运行 tstl 的 JavaScript 入口，避免 Windows .cmd 包装器处理含空格路径时的引号问题。
const tstlProcess = spawn(process.execPath, [TSTL_ENTRY, '--watch'], {
	stdio: 'inherit',
	cwd: SOURCE_DIR,
	env: {
		...process.env,
		NODE_PATH: path.join(ROOT_DIR, 'node_modules'),
		NODE_OPTIONS,
	},
});

tstlProcess.on('error', (error) => {
	console.error('❌ Failed to start TSTL:', error);
	process.exit(1);
});

// 监听源文件删除
const watcher = chokidar.watch('**/*.ts', {
	cwd: SOURCE_DIR,
	ignored: ['node_modules/**', '*.d.ts'],
	persistent: true,
	ignoreInitial: true
});

/**
 * 将 TypeScript 文件路径转换为对应的 Lua 文件路径
 */
function getLuaPathFromTsPath(tsPath) {
	const relativePath = path.relative(SOURCE_DIR, tsPath);
	const luaRelativePath = relativePath.replace(/\.tsx?$/, '.lua');
	return path.join(OUTPUT_DIR, luaRelativePath);
}

watcher.on('unlink', (filePath) => {
	const fullPath = path.join(SOURCE_DIR, filePath);
	const luaPath = getLuaPathFromTsPath(fullPath);

	if (fs.existsSync(luaPath)) {
		try {
			fs.unlinkSync(luaPath);
			console.log(`🗑️  Deleted: ${path.relative(OUTPUT_DIR, luaPath)}`);

			// 同时删除对应的 .lua.map 文件（如果存在）
			const luaMapPath = luaPath + '.map';
			if (fs.existsSync(luaMapPath)) {
				fs.unlinkSync(luaMapPath);
				console.log(`🗑️  Deleted: ${path.relative(OUTPUT_DIR, luaMapPath)}`);
			}
		} catch (error) {
			console.error(`❌ Failed to delete ${luaPath}:`, error.message);
		}
	}
});

watcher.on('error', (error) => {
	console.error('❌ Watcher error:', error);
});

watcher.on('ready', () => {
	console.log('👁️  Watching for file deletions...');
});

// 监听双端 enums 文件变化
const enumsWatcher = chokidar.watch(getEnumWatchPaths(), {
	persistent: true,
	ignoreInitial: true
});

enumsWatcher.on('change', (filePath) => {
	if (shouldIgnoreMirroredChange(filePath)) {
		console.log(`↩️ Ignored mirrored enums change: ${path.relative(ROOT_DIR, filePath)}`);
		return;
	}

	console.log(`📝 Enums changed, syncing from ${path.relative(ROOT_DIR, filePath)}...`);
	try {
		syncEnums({ sourcePath: filePath });
		console.log('✅ Enums synced successfully');
	} catch (error) {
		console.error('❌ Failed to sync enums:', error);
	}
});

// 监听 modifiers 目录文件变化
const MODIFIERS_DIR = path.join(SOURCE_DIR, 'modifiers');
const modifiersWatcher = chokidar.watch('**/*.ts', {
	cwd: MODIFIERS_DIR,
	ignored: ['**/eom_modifier/**', 'index.ts', '**/*.d.ts'],
	persistent: true,
	ignoreInitial: true
});

modifiersWatcher.on('add', () => {
	console.log('📝 Modifier file added, regenerating index...');
	try {
		generateModifiersIndex();
		console.log('✅ Modifiers index regenerated');
	} catch (error) {
		console.error('❌ Failed to regenerate modifiers index:', error);
	}
});

modifiersWatcher.on('unlink', () => {
	console.log('📝 Modifier file removed, regenerating index...');
	try {
		generateModifiersIndex();
		console.log('✅ Modifiers index regenerated');
	} catch (error) {
		console.error('❌ Failed to regenerate modifiers index:', error);
	}
});

// 监听 properties.kv 文件变化
const PROPERTIES_KV_PATH = path.join(SOURCE_DIR, 'framework', 'property_system', 'properties.kv');
const propertiesWatcher = chokidar.watch(PROPERTIES_KV_PATH, {
	persistent: true,
	ignoreInitial: true
});

propertiesWatcher.on('change', () => {
	console.log('📝 properties.kv changed, regenerating properties...');
	try {
		// 执行属性生成脚本
		const { spawnSync } = require('child_process');
		const result = spawnSync('node', [path.join(ROOT_DIR, 'node_scripts', 'generate-property-system.js')], {
			stdio: 'inherit'
		});

		if (result.status === 0) {
			console.log('✅ Properties regenerated successfully');
		} else {
			console.error('❌ Failed to regenerate properties');
		}
	} catch (error) {
		console.error('❌ Failed to regenerate properties:', error);
	}
});

// 优雅退出
process.on('SIGINT', () => {
	console.log('\n⏹️  Stopping watch...');
	watcher.close();
	enumsWatcher.close();
	modifiersWatcher.close();
	propertiesWatcher.close();
	tstlProcess.kill();
	process.exit(0);
});

process.on('SIGTERM', () => {
	watcher.close();
	enumsWatcher.close();
	modifiersWatcher.close();
	propertiesWatcher.close();
	tstlProcess.kill();
	process.exit(0);
});
