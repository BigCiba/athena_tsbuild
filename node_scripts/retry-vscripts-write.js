/**
 * Retry short-lived Windows file locks while TSTL writes generated Lua files.
 *
 * Dota, antivirus software, and file indexers can briefly open generated files
 * without write sharing. Node reports that situation as UNKNOWN, EACCES, EBUSY,
 * or EPERM. TSTL uses fs.openSync(..., "w"), so preload this module in the TSTL
 * child process and retry only writes inside the generated VScripts directory.
 */

const fs = require('fs');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');

const OUTPUT_DIR = path.resolve(getAddonPaths().gameScripts);
const RETRYABLE_WRITE_ERRORS = new Set(['EACCES', 'EBUSY', 'EPERM', 'UNKNOWN']);
const MAX_OPEN_ATTEMPTS = 6;
const originalOpenSync = fs.openSync;
const sleepBuffer = new Int32Array(new SharedArrayBuffer(4));

function isGeneratedVScript(file) {
	if (typeof file !== 'string' && !Buffer.isBuffer(file)) {
		return false;
	}

	const resolvedFile = path.resolve(file.toString());
	const relativePath = path.relative(OUTPUT_DIR, resolvedFile);
	return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

function isWriteFlag(flags) {
	return typeof flags === 'string' && /[wax+]/.test(flags);
}

function wait(milliseconds) {
	Atomics.wait(sleepBuffer, 0, 0, milliseconds);
}

fs.openSync = function openSyncWithRetry(file, flags, mode) {
	const shouldRetry = isWriteFlag(flags) && isGeneratedVScript(file);

	for (let attempt = 1; ; attempt++) {
		try {
			return originalOpenSync.call(fs, file, flags, mode);
		} catch (error) {
			if (!shouldRetry || !RETRYABLE_WRITE_ERRORS.has(error?.code) || attempt >= MAX_OPEN_ATTEMPTS) {
				throw error;
			}

			// 50 + 100 + 200 + 400 + 800 ms: enough for typical transient locks.
			wait(50 * 2 ** (attempt - 1));
		}
	}
};
