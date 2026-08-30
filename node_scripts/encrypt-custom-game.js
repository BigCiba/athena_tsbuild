const path = require('path');
const crypto = require('crypto');
const glob = require('glob');
const micromatch = require('micromatch');
const fs = require('fs-extra');
const luamin = require('luamin');

const CONFIG_FILENAME = 'package.json';
const ROOT_DIR = path.resolve(__dirname, '..');
const AES_SCRIPT_PATH = path.join(__dirname, 'aes.lua');
const args = new Set(process.argv.slice(2));
const shouldRestore = args.has('--restore');
const shouldKeepEncrypted = args.has('--no-restore');

if (shouldRestore && shouldKeepEncrypted) {
	throw new Error('Use either --restore or --no-restore, not both');
}

const createMatcher = (patterns) => {
	const normalized = Array.isArray(patterns) ? patterns : [];
	if (!normalized.length) {
		return () => false;
	}
	return (file) => micromatch([file], normalized).length === 1;
};

function loadPackageJson() {
	const packageJsonPath = path.join(ROOT_DIR, CONFIG_FILENAME);
	let packageJson;

	try {
		packageJson = fs.readJsonSync(packageJsonPath);
	} catch (error) {
		throw new Error(`Unable to read ${CONFIG_FILENAME}: ${error.message}`);
	}

	return packageJson;
}

const packageJson = loadPackageJson();
const encryptionConfig = packageJson.encryption || {};
const addonName = packageJson.name || 'addon';
const debug = Boolean(encryptionConfig.debug);
const keyHex = encryptionConfig.key;

if (typeof keyHex !== 'string' || keyHex.length !== 32 || keyHex.match(/[^0-9a-fA-F]/)) {
	throw new Error('encryption.key must be a 32-character hex string');
}

const key = Buffer.from(keyHex, 'hex');

const SERVER_MODULE_PATTERNS = [
	'filter',
	'game',
	'service/**',
	'game_states/**',
	'framework/game_state',
	'framework/demo',
	'framework/settings',
	'framework/unit_manager',
	'mechanics/controller',
	'mechanics/base',
	'mechanics/npc',
	'mechanics/service_attribute',
	'mechanics/player',
	'mechanics/multi_choice/**',
	'mechanics/skill_upgrade_choice',
	'mechanics/courier',
	'mechanics/interaction',
	'mechanics/bullet',
	'mechanics/game_mode_manager',
	'mechanics/dungeon_manager',
	'mechanics/damage_system/**',
	'mechanics/bless',
	'mechanics/bless_upgrade_choice',
	'mechanics/artifact',
	'mechanics/artifact_upgrade_choice',
	'mechanics/privilege',
	'mechanics/fishing',
	'mechanics/fish_item',
	'mechanics/courier_explore',
	'mechanics/arena',
	'mechanics/sound',
	'mechanics/combo_system/**',
	'mechanics/game_mode/**',
	'mechanics/abyssal_horde',
	'mechanics/fake_cosmetic_preview',
	'mechanics/rune',
	'mechanics/simulate_unit_manager',
];
const MINIFY_PATTERNS = ['**/*'];

const isMatchingLuaServerModule = createMatcher(SERVER_MODULE_PATTERNS);
const isMatchingLuaMinifyModule = createMatcher(MINIFY_PATTERNS);

function encryptCode(code) {
	const iv = crypto.randomBytes(16);

	const codeByteLength = Buffer.from(code).length;
	const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	cipher.setAutoPadding(false);

	const encrypted = Buffer.concat([
		iv,
		cipher.update(code),
		cipher.update('\0'.repeat(16 - (codeByteLength % 16))),
		cipher.final(),
	]);

	return encrypted.toString('hex');
}

function processLuaModule(modulePath, code) {
	if (isMatchingLuaServerModule(modulePath)) {
		const serverCode = `return (decryptModule("${encryptCode(code)}", ...))`;
		return serverCode;
	}

	if (isMatchingLuaMinifyModule(modulePath)) {
		return luamin.minify(code);
	}

	return code;
}

function generateEncrypt(originalCode) {
	const code = `
			${fs.readFileSync(AES_SCRIPT_PATH, 'utf8')}

		local function fromHex(s)
			return s:gsub('..', function (cc) return string.char(tonumber(cc, 16)) end)
		end

		local key = {string.byte(fromHex(serverKey), 1, 16)}

		_G.decrypt = function(encrypted)
			local raw = fromHex(encrypted)
			local iv = {string.byte(raw, 1, 16)}
			local decrypted = ciphermode.decryptString(key, raw:sub(17), ciphermode.decryptCBC, iv)
			return string.sub(decrypted, 1, string.find(decrypted, "\\0") - 1)
		end

		_G.decryptModule = function(encrypted, chunkname, ...)
			return (assert(load(decrypt(encrypted), chunkname or "", nil, getfenv(2)))(...))
		end
	`;

	// const serverCode = `
	// 	serverKey = ${debug ? JSON.stringify(key.toString('hex')) : 'tostring(GetDedicatedServerKeyV3("encrypted_code")):sub(1, 32)'}
	// `;
	const serverCode = `
		serverKey = _G.CLIENT_CODE
	`;

	return luamin.minify(`
		local serverKey
		if IsServer() then
			${serverCode}
		else
			return
		end

		${code}
	`);
}

function encryptLua(tempPath, outPath) {
	for (const fileName of glob.sync('**/*', { cwd: tempPath, nodir: true })) {
		if (fileName === 'addon_init.lua') continue;
		const fileInputPath = path.join(tempPath, fileName);
		const fileOutputPath = path.join(outPath, fileName);
		if (fileName.endsWith('.lua')) {
			const code = fs.readFileSync(path.join(tempPath, fileName), 'utf8');
			fs.outputFileSync(fileOutputPath, processLuaModule(fileName.replace(/\.lua$/, ''), code));
		} else {
			fs.copySync(fileInputPath, fileOutputPath);
		}
	}

	const encryptPath = path.join(tempPath, 'encrypt.lua');
	fs.outputFileSync(
		path.join(outPath, 'encrypt.lua'),
		generateEncrypt(fs.existsSync(encryptPath) ? fs.readFileSync(encryptPath, 'utf8') : ''),
	);
}

const moveDir = (from, to) => {
	try {
		fs.moveSync(from, to);
	} catch {
		fs.copySync(from, to);
		fs.removeSync(from);
	}
};

const luaInPath = path.join(ROOT_DIR, `game/${addonName}/scripts/vscripts`);
const luaTempPath = path.join(ROOT_DIR, '_temp_vscripts');
let encryptionSucceeded = false;

try {
	moveDir(luaInPath, luaTempPath);
	encryptLua(luaTempPath, luaInPath);
	encryptionSucceeded = true;
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	const restoreOriginal = () => {
		if (fs.existsSync(luaTempPath)) {
			fs.rmSync(luaInPath, { recursive: true, force: true });
			moveDir(luaTempPath, luaInPath);
		}
	};

	if (!encryptionSucceeded) {
		restoreOriginal();
	} else if (shouldRestore) {
		restoreOriginal();
	} else if (!shouldKeepEncrypted && process.stdin.isTTY) {
		console.log('文件已加密，按任意键重置为原始文件。使用 --no-restore 可保留加密结果。');
		process.stdin.setRawMode(true);
		process.stdin.once('data', () => {
			process.stdin.setRawMode(false);
			restoreOriginal();
			process.exit();
		});
	} else {
		if (fs.existsSync(luaTempPath)) {
			fs.removeSync(luaTempPath);
		}
		if (!shouldKeepEncrypted && !process.stdin.isTTY) {
			console.log('文件已加密。非交互环境默认保留加密结果；如需自动恢复请传入 --restore。');
		}
	}
}
