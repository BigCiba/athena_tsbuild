/**
 * 构建 VScripts 的包装脚本
 * 动态读取 addon name 并执行 tstl 编译
 */

const { spawn } = require('child_process');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');
const { generateVScriptsTsConfig } = require('./generate-tsconfig');

const paths = getAddonPaths();
const args = process.argv.slice(2); // 获取传递给脚本的参数
const WRITE_RETRY_PRELOAD = path.join(__dirname, 'retry-vscripts-write.js').replace(/\\/g, '/');
const NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --require="${WRITE_RETRY_PRELOAD}"`.trim();
const TSTL_ENTRY = path.join(paths.root, 'node_modules', '@bigciba', 'typescript-to-lua', 'dist', 'tstl.js');

console.log(`📦 Building VScripts for addon: ${paths.addonName}`);

// 先生成 tsconfig.json（确保配置是最新的）
try {
	generateVScriptsTsConfig();
} catch (error) {
	console.error('❌ Failed to generate tsconfig.json:', error);
	process.exit(1);
}

console.log(`📂 Config: ${paths.vscriptsTsConfig}`);

// 执行 tstl 命令
// 直接使用 Node 入口，保证包含空格的项目路径在 Windows 上可正常构建。
const tstlProcess = spawn(process.execPath, [TSTL_ENTRY, '--project', paths.vscriptsTsConfig, ...args], {
	stdio: 'inherit',
	cwd: paths.contentScripts,
	env: {
		...process.env,
		NODE_PATH: path.join(paths.root, 'node_modules'),
		NODE_OPTIONS,
	},
});

tstlProcess.on('error', (error) => {
	console.error('❌ Failed to run TSTL:', error);
	process.exit(1);
});

tstlProcess.on('exit', (code) => {
	process.exitCode = code ?? 1;
});
