/**
 * 同步共享的 enum 文件到 VScripts 和 Panorama UI
 * 双端共用的枚举定义统一在 src/shared/ 目录管理
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');

const ROOT_DIR = path.join(__dirname, '..');
const paths = getAddonPaths();

// 双端 enum 文件路径
const VSCRIPTS_ENUMS_TARGET = path.join(paths.contentScripts, 'framework', 'enums.ts');
const PANORAMA_ENUMS_TARGET = path.join(ROOT_DIR, 'src', 'polyfill', 'enums.ts');
const ENUM_FILE_PATHS = [VSCRIPTS_ENUMS_TARGET, PANORAMA_ENUMS_TARGET];

// 锁文件路径
const LOCK_FILE = path.join(ROOT_DIR, 'node_modules', '.sync-enums.lock');

// 镜像同步状态文件，用于跨进程防止 watcher 死循环
const SYNC_STATE_FILE = path.join(ROOT_DIR, 'node_modules', '.sync-enums.state.json');
const MIRROR_CHANGE_TTL_MS = Number(process.env.SYNC_ENUMS_MIRROR_TTL_MS || 5000);

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
 * 统一路径格式，便于跨进程比较
 */

function normalizeComparablePath(filePath) {
	return path.resolve(filePath).replace(/\\/g, '/').toLowerCase();
}

/**
 * 计算内容 hash，用于识别镜像写入
 */
function hashContent(content) {
	return crypto.createHash('sha1').update(content, 'utf8').digest('hex');
}

/**
 * 读取 enum 文件状态
 */
function readEnumState(filePath) {
	if (!fs.existsSync(filePath)) {
		return null;
	}

	const content = fs.readFileSync(filePath, 'utf8');
	const stat = fs.statSync(filePath);

	return {
		path: filePath,
		normalizedPath: normalizeComparablePath(filePath),
		content,
		hash: hashContent(content),
		mtimeMs: stat.mtimeMs,
	};
}

/**
 * 获取双端 enum 文件路径
 */
function getEnumWatchPaths() {
	return [...ENUM_FILE_PATHS];
}

/**
 * 读取最近一次镜像同步状态
 */
function readSyncState() {
	try {
		if (!fs.existsSync(SYNC_STATE_FILE)) {
			return null;
		}

		return fs.readJsonSync(SYNC_STATE_FILE);
	} catch (error) {
		return null;
	}
}

/**
 * 记录镜像写入，用于 watcher 忽略回写事件
 */
function writeSyncState(sourcePath, targetPath, targetHash) {
	fs.ensureDirSync(path.dirname(SYNC_STATE_FILE));
	fs.writeJsonSync(
		SYNC_STATE_FILE,
		{
			timestamp: Date.now(),
			sourcePath: normalizeComparablePath(sourcePath),
			targetPath: normalizeComparablePath(targetPath),
			targetHash,
		},
		{ spaces: 2 }
	);
}

/**
 * 判断某次文件变更是否为同步器刚写入的镜像变更
 */
function shouldIgnoreMirroredChange(filePath) {
	const syncState = readSyncState();
	if (syncState === null) {
		return false;
	}

	if (Date.now() - Number(syncState.timestamp || 0) > MIRROR_CHANGE_TTL_MS) {
		return false;
	}

	if (normalizeComparablePath(filePath) !== syncState.targetPath) {
		return false;
	}

	if (!fs.existsSync(filePath)) {
		return false;
	}

	try {
		const content = fs.readFileSync(filePath, 'utf8');
		return hashContent(content) === syncState.targetHash;
	} catch (error) {
		return false;
	}
}

/**
 * 决定本次同步的源文件和目标文件
 */
function resolveSyncPlan(preferredSourcePath) {
	const states = ENUM_FILE_PATHS.map((filePath) => readEnumState(filePath)).filter((state) => state !== null);
	if (states.length === 0) {
		throw new Error(`enum 文件不存在: ${ENUM_FILE_PATHS.join(', ')}`);
	}

	if (preferredSourcePath !== undefined) {
		const normalizedPreferred = normalizeComparablePath(preferredSourcePath);
		const sourceState = states.find((state) => state.normalizedPath === normalizedPreferred);
		if (sourceState !== undefined) {
			const targetPath = ENUM_FILE_PATHS.find((filePath) => normalizeComparablePath(filePath) !== normalizedPreferred);
			if (targetPath === undefined) {
				throw new Error(`无法确定同步目标: ${preferredSourcePath}`);
			}

			return {
				sourceState,
				targetState: readEnumState(targetPath),
				targetPath,
			};
		}
	}

	states.sort((left, right) => {
		if (right.mtimeMs !== left.mtimeMs) {
			return right.mtimeMs - left.mtimeMs;
		}

		return left.normalizedPath.localeCompare(right.normalizedPath);
	});

	const sourceState = states[0];
	const targetPath = ENUM_FILE_PATHS.find((filePath) => normalizeComparablePath(filePath) !== sourceState.normalizedPath);
	if (targetPath === undefined) {
		throw new Error(`无法确定同步目标: ${sourceState.path}`);
	}

	return {
		sourceState,
		targetState: readEnumState(targetPath),
		targetPath,
	};
}

/**
 * 同步 enum 文件
 */
function syncEnums(options = {}) {
	const { sourcePath } = options;

	// 尝试获取锁
	if (!acquireLock()) {
		console.log('⏸️ 其他进程正在同步 enums，跳过本次执行');
		return { skipped: true, reason: 'locked' };
	}

	try {
		const { sourceState, targetState, targetPath } = resolveSyncPlan(sourcePath);
		fs.ensureDirSync(path.dirname(targetPath));

		if (targetState !== null && targetState.hash === sourceState.hash) {
			console.log('✅ Enums 已同步，无需写入:', path.relative(ROOT_DIR, targetPath));
			return {
				skipped: true,
				reason: 'already-synced',
				sourcePath: sourceState.path,
				targetPath,
			};
		}

		fs.writeFileSync(targetPath, sourceState.content, 'utf8');
		writeSyncState(sourceState.path, targetPath, sourceState.hash);

		console.log('✅ Enums 已同步:', `${path.relative(ROOT_DIR, sourceState.path)} -> ${path.relative(ROOT_DIR, targetPath)}`);

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

		return {
			skipped: false,
			sourcePath: sourceState.path,
			targetPath,
		};
	} catch (error) {
		console.error('❌ 同步失败:', error.message);
		throw error;
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

// 如果直接运行此脚本
if (require.main === module) {
	try {
		syncEnums();
	} catch (error) {
		process.exit(1);
	}
}

module.exports = { syncEnums, shouldIgnoreMirroredChange, getEnumWatchPaths };
