/**
 * 同步 VScripts 的 constant.ts 到 Panorama UI
 * 使 UI 端可以访问 VScripts 中定义的常量
 */

const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');

const ROOT_DIR = path.join(__dirname, '..');
const paths = getAddonPaths();

// 源文件路径
const VSCRIPTS_CONSTANTS_SOURCE = path.join(paths.contentScripts, 'framework', 'constant.ts');

// 目标路径
const PANORAMA_CONSTANTS_TARGET = path.join(ROOT_DIR, 'src', 'polyfill', 'constant.ts');

// 锁文件路径
const LOCK_FILE = path.join(ROOT_DIR, 'node_modules', '.sync-constants.lock');

// TypeScript reload 防抖（跨进程）
const TS_RELOAD_DEBOUNCE_FILE = path.join(ROOT_DIR, 'node_modules', '.ts-reloadProjects.debounce');
const TS_RELOAD_DEBOUNCE_MS = Number(process.env.TS_RELOAD_DEBOUNCE_MS || 2000);

/**
 * 获取文件锁（等待最多5秒）
 */
function acquireLock(maxWaitMs = 5000) {
	const startTime = Date.now();

	while (Date.now() - startTime < maxWaitMs) {
		try {
			// 使用 wx 标志：只有文件不存在时才能创建成功
			fs.writeFileSync(LOCK_FILE, process.pid.toString(), { flag: 'wx' });
			return true;
		} catch (error) {
			if (error.code === 'EEXIST') {
				// 文件已存在，说明有其他进程在执行
				// 检查锁文件是否过期（超过10秒）
				try {
					const stats = fs.statSync(LOCK_FILE);
					const age = Date.now() - stats.mtimeMs;
					if (age > 10000) {
						// 锁文件过期，强制删除
						console.warn('⚠️ 检测到过期的锁文件，正在清理...');
						fs.unlinkSync(LOCK_FILE);
						continue;
					}
				} catch (statError) {
					// 锁文件可能刚被删除，继续尝试
				}

				// 等待100ms后重试
				const waitTime = 100;
				const sleepSync = (ms) => {
					const end = Date.now() + ms;
					while (Date.now() < end) { }
				};
				sleepSync(waitTime);
			} else {
				throw error;
			}
		}
	}

	return false;
}

/**
 * 释放文件锁
 */
function releaseLock() {
	try {
		if (fs.existsSync(LOCK_FILE)) {
			fs.unlinkSync(LOCK_FILE);
		}
	} catch (error) {
		// 忽略删除失败
	}
}

/**
 * 过滤常量文件内容，只保留 @Both 标记的内容，排除 @VscriptsOnly 标记的内容
 */
function filterConstants(content) {
	const lines = content.split('\n');
	const result = [];
	let currentTag = null; // 当前代码块的标记：'VscriptsOnly' | 'Both' | null
	let blockDepth = 0; // 大括号深度，用于跟踪代码块范围
	let inDeclaration = false; // 是否在声明语句中

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();

		// 检测注释标记
		if (trimmed.includes('@VscriptsOnly')) {
			currentTag = 'VscriptsOnly';
			continue; // 跳过注释行本身
		} else if (trimmed.includes('@Both')) {
			currentTag = 'Both';
			continue; // 跳过注释行本身
		}

		// 如果是普通注释行（不含标记），保留
		if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
			if (currentTag !== 'VscriptsOnly') {
				result.push(line);
			}
			continue;
		}

		// 检测声明语句的开始
		if (/^(const|let|var|function|class|interface|type|enum)\s/.test(trimmed)) {
			inDeclaration = true;
			blockDepth = 0;
		}

		// 跟踪大括号深度
		for (const char of line) {
			if (char === '{') blockDepth++;
			if (char === '}') blockDepth--;
		}

		// 根据标记决定是否输出
		if (currentTag === 'VscriptsOnly') {
			// 跳过 VscriptsOnly 标记的内容
		} else {
			// 保留 Both 标记的内容或未标记的内容
			result.push(line);
		}

		// 检测声明语句的结束（分号或大括号闭合）
		if (inDeclaration && (trimmed.endsWith(';') || (blockDepth === 0 && trimmed.endsWith('}')))) {
			inDeclaration = false;
			currentTag = null; // 重置标记
		}

		// 空行也重置标记（防止标记影响后续无关代码）
		if (trimmed === '' && !inDeclaration) {
			currentTag = null;
		}
	}

	return result.join('\n');
}

/**
 * 同步 constant.ts 文件
 */
function syncConstants() {
	if (!fs.existsSync(VSCRIPTS_CONSTANTS_SOURCE)) {
		console.error('❌ VScripts constant.ts 文件不存在:', VSCRIPTS_CONSTANTS_SOURCE);
		process.exit(1);
	}

	// 尝试获取锁
	if (!acquireLock()) {
		console.log('⏸️ 其他进程正在同步 constants，跳过本次执行');
		return;
	}

	try {
		// 确保目标目录存在
		fs.ensureDirSync(path.dirname(PANORAMA_CONSTANTS_TARGET));

		// 读取源文件内容
		const sourceContent = fs.readFileSync(VSCRIPTS_CONSTANTS_SOURCE, 'utf8');

		// 过滤内容
		const filteredContent = filterConstants(sourceContent);

		// 写入目标文件
		fs.writeFileSync(PANORAMA_CONSTANTS_TARGET, filteredContent, 'utf8');

		// 触碰文件修改时间，确保 VSCode 和 Rollup 检测到变化
		touchFile(PANORAMA_CONSTANTS_TARGET);
		console.log('✅ Panorama UI constants 已同步:', path.relative(ROOT_DIR, PANORAMA_CONSTANTS_TARGET));

		console.log('🎉 constant.ts 文件同步完成！');

		// 主动触发 VS Code TS 工程刷新（需要在 VS Code 里运行/或系统已注册 URI handler）
		if (shouldDebouncedTrigger(TS_RELOAD_DEBOUNCE_FILE, TS_RELOAD_DEBOUNCE_MS)) {
			const ok = runVSCodeCommand('typescript.restartTsServer');
			if (ok) {
				console.log('🔄 已触发 TypeScript: Reload Projects');
			} else {
				console.warn('⚠️ 无法触发 TypeScript: Reload Projects（可手动执行 TypeScript: Reload Projects 或 Restart TS Server）');
			}
		} else {
			console.log(`⏭️ 跳过 TypeScript: Reload Projects（${TS_RELOAD_DEBOUNCE_MS}ms 防抖）`);
		}
	} catch (error) {
		console.error('❌ 同步失败:', error.message);
		releaseLock();
		process.exit(1);
	} finally {
		// 释放锁
		releaseLock();
	}
}

/**
 * 触发 VS Code 命令（通过 command URI）
 * @param {string} commandId VS Code command id，如 typescript.reloadProjects
 */
function runVSCodeCommand(commandId) {
	const uri = `vscode://command/${commandId}`;

	// 方式1：优先使用 VS Code CLI（通常在 VS Code 终端 / Task 内可用）
	try {
		const r = spawnSync('code', ['-r', '--open-url', uri], {
			stdio: 'ignore',
			shell: true,
			windowsHide: true,
		});
		if (r.status === 0) {
			return true;
		}
	} catch (e) {
		// ignore
	}

	// 方式2：Windows fallback - 交给系统 URI handler
	try {
		const r = spawnSync('cmd', ['/c', 'start', '', uri], {
			stdio: 'ignore',
			shell: false,
			windowsHide: true,
		});
		return r.status === 0;
	} catch (e) {
		return false;
	}
}

/**
 * 跨进程防抖：在 debounceMs 内只允许触发一次
 * @param {string} filePath debounce 文件路径
 * @param {number} debounceMs 防抖时间（毫秒）
 */
function shouldDebouncedTrigger(filePath, debounceMs) {
	try {
		fs.ensureDirSync(path.dirname(filePath));

		if (fs.existsSync(filePath)) {
			const stat = fs.statSync(filePath);
			const age = Date.now() - stat.mtimeMs;
			if (age >= 0 && age < debounceMs) {
				return false;
			}
		}

		// 写入当前时间（刷新 mtime）
		fs.writeFileSync(filePath, String(Date.now()), 'utf8');
		return true;
	} catch (e) {
		// 防抖失败不应阻止主流程
		return true;
	}
}

/**
 * 触碰文件修改时间，强制触发 VSCode TypeScript 语言服务器重新分析
 * 通过追加并删除空行的方式，确保文件内容有实际变化
 */
function touchFile(filePath) {
	try {
		// 方法：在文件末尾添加一个空行，然后立即删除
		// 这会触发 VSCode 的文件监视器，同时不改变最终文件内容
		const content = fs.readFileSync(filePath, 'utf8');

		// 添加一个空行
		fs.writeFileSync(filePath, content + '\n', 'utf8');

		// 立即恢复原内容（同步操作）
		fs.writeFileSync(filePath, content, 'utf8');

		// 更新文件时间戳
		const now = new Date();
		fs.utimesSync(filePath, now, now);
	} catch (error) {
		if (error.code !== 'ENOENT') {
			console.warn(`⚠️ 无法触碰文件 ${filePath}:`, error.message);
		}
	}
}

// 如果直接运行此脚本
if (require.main === module) {
	syncConstants();
}

module.exports = { syncConstants };
