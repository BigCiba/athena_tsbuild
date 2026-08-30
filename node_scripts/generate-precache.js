const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');

// ==================== 配置常量 ====================
const paths = getAddonPaths();
const OUTPUT_FILE = path.join('content', paths.addonName, 'scripts', 'vscripts', 'precache_auto.ts');

// 正则表达式
const REGEX = {
	VPCF: /(['"])[^.'"]+\.vpcf\1/g,        // 匹配 .vpcf 文件路径
	VMDL: /"[^."']+\.vmdl"/g,              // 匹配 .vmdl 文件路径
	COURIER: /"520\d{4}"\s*\{[^\}]+\}/g,   // 匹配信使定义（未使用）
};

// 文件扩展名白名单
const FILE_EXTENSIONS = ['.kv', '.txt', '.ts', '.tsx'];

// 黑名单文件（跳过扫描）
const BLACKLIST_FILES = [
	'items_game.kv',
	'precache.ts',
	'precache_auto.ts',
];

// 粒子特效扫描目录
const PARTICLE_SCAN_DIRS = [
	path.join('./src', 'ui'),
	path.join('./content', paths.addonName, 'scripts', 'vscripts'),
	path.join('./game', paths.addonName, 'scripts', 'npc'),
];

// 模型文件扫描目录
const MODEL_SCAN_DIRS = [
	path.join('./game', paths.addonName, 'scripts', 'npc', 'kv', 'units', 'heroes.kv'),
	path.join('./game', paths.addonName, 'scripts', 'npc', 'dropped_items.txt'),
	path.join('./game', paths.addonName, 'scripts', 'npc'),
];

// 默认预缓存模型列表（常用信使和单位模型）
const DEFAULT_MODELS = [
	'"models/props_gameplay/salve.vmdl"',
	'"models/props_gameplay/aghs21_device/aghs21_device.vmdl"',
	'"models/creeps/lane_creeps/creep_bad_melee/creep_bad_melee.vmdl"',
	'"models/creeps/lane_creeps/creep_radiant_melee/radiant_melee.vmdl"',
	'"models/items/courier/duskie/duskie.vmdl"',
	'"models/items/courier/flightless_dod/flightless_dod_flying.vmdl"',
	'"models/items/courier/shagbark/shagbark.vmdl"',
	'"models/courier/huntling/huntling_flying.vmdl"',
	'"models/courier/ram/ram_flying.vmdl"',
	'"models/courier/venoling/venoling_flying.vmdl"',
	'"models/items/courier/pw_zombie/pw_zombie.vmdl"',
	'"models/items/courier/devourling/devourling_flying.vmdl"',
	'"models/items/courier/jin_yin_white_fox/jin_yin_white_fox_flying.vmdl"',
	'"models/items/courier/courier_ti9/courier_ti9_lvl7/courier_ti9_lvl7_flying.vmdl"',
	'"models/courier/seekling/seekling_flying.vmdl"',
	'"models/items/warlock/golem/ti_8_warlock_darkness_apostate_golem/ti_8_warlock_darkness_apostate_golem.vmdl"',
	'"models/eom/props/booty/sword.vmdl"',
	'"models/eom/props/booty/shield.vmdl"',
	'"models/eom/props/booty/neck.vmdl"',
	'"models/eom/props/booty/ring.vmdl"',
	'"models/eom/props/booty/boots.vmdl"',
	'"models/eom/props/booty/arm.vmdl"',
	'"models/eom/props/booty/armor.vmdl"',
	'"models/eom/props/booty/helmet.vmdl"',
	'"models/props_gameplay/halloween_candy.vmdl"',
	'"models/eom/props/booty/trophy_1.vmdl"',
	'"models/eom/props/booty/trophy_2.vmdl"',
	'"models/eom/props/booty/trophy_3.vmdl"',
	'"models/eom/props/booty/trophy_4.vmdl"',
	'"models/eom/props/booty/trophy_5.vmdl"',
	'"models/eom/props/booty/chest.vmdl"',
	'"models/eom/props/campsite/bg_bookcase/bg_bookstand_01.vmdl"',
	'"models/heroes/grimstroke/ink_phantom.vmdl"',
	'"models/props_structures/secretshop_dire001.vmdl"',
];

// ==================== 数据存储 ====================
const particlesCustom = new Set();      // 自定义粒子特效
const particlesTool = new Set();        // 工具粒子特效（英雄/经济物品）
const models = new Set(DEFAULT_MODELS); // 模型文件
// ==================== 工具函数 ====================

/**
 * 递归读取目录中的所有文件
 * @param {string} dir - 目录路径
 * @param {Function} callback - 处理每个文件的回调函数
 */
function scanDirectory(dir, callback) {
	if (!fsSync.existsSync(dir)) {
		console.warn(`⚠️  目录不存在，跳过: ${dir}`);
		return;
	}

	const stat = fsSync.statSync(dir);

	if (stat.isDirectory()) {
		const files = fsSync.readdirSync(dir);
		files.forEach(file => {
			const filePath = path.join(dir, file);
			const fileStat = fsSync.statSync(filePath);

			if (fileStat.isDirectory()) {
				scanDirectory(filePath, callback); // 递归处理子目录
			} else {
				callback(file, filePath);
			}
		});
	} else {
		// 单个文件
		callback(path.basename(dir), dir);
	}
}

/**
 * 检查文件是否应该被扫描
 * @param {string} fileName - 文件名
 * @returns {boolean}
 */
function shouldScanFile(fileName) {
	if (BLACKLIST_FILES.includes(fileName)) {
		return false;
	}
	return FILE_EXTENSIONS.some(ext => fileName.endsWith(ext));
}

/**
 * 扫描文件内容中的粒子特效路径
 * @param {string} filePath - 文件路径
 */
function scanParticles(filePath) {
	try {
		const content = fsSync.readFileSync(filePath, 'utf-8');
		const matches = content.match(REGEX.VPCF);

		if (matches) {
			matches.forEach(match => {
				// 区分自定义粒子和工具粒子（英雄/经济物品）
				if (match.includes('particles/units/heroes') || match.includes('particles/econ/items')) {
					particlesTool.add(match);
				} else {
					particlesCustom.add(match);
				}
			});
		}
	} catch (error) {
		console.error(`❌ 读取文件失败: ${filePath}`, error.message);
	}
}

/**
 * 扫描文件内容中的模型路径
 * @param {string} filePath - 文件路径
 */
function scanModels(filePath) {
	try {
		const content = fsSync.readFileSync(filePath, 'utf-8');
		const matches = content.match(REGEX.VMDL);

		if (matches) {
			matches.forEach(match => {
				models.add(match);
			});
		}
	} catch (error) {
		console.error(`❌ 读取文件失败: ${filePath}`, error.message);
	}
}

/**
 * 扫描所有目录中的资源文件
 */
function scanAllResources() {
	console.log('🔍 开始扫描粒子特效...');
	let particleFileCount = 0;

	PARTICLE_SCAN_DIRS.forEach(dir => {
		scanDirectory(dir, (fileName, filePath) => {
			if (shouldScanFile(fileName)) {
				scanParticles(filePath);
				particleFileCount++;
			}
		});
	});

	console.log(`✅ 扫描了 ${particleFileCount} 个文件，找到:`);
	console.log(`   - ${particlesCustom.size} 个自定义粒子特效`);
	console.log(`   - ${particlesTool.size} 个工具粒子特效\n`);

	console.log('🔍 开始扫描模型文件...');
	let modelFileCount = 0;

	MODEL_SCAN_DIRS.forEach(dir => {
		scanDirectory(dir, (fileName, filePath) => {
			if (shouldScanFile(fileName)) {
				scanModels(filePath);
				modelFileCount++;
			}
		});
	});

	console.log(`✅ 扫描了 ${modelFileCount} 个文件，找到 ${models.size} 个模型\n`);
}

/**
 * 格式化资源集合为代码字符串
 * @param {Set} resourceSet - 资源路径集合
 * @returns {string}
 */
function formatResourceArray(resourceSet) {
	if (resourceSet.size === 0) {
		return '';
	}
	return Array.from(resourceSet)
		.sort() // 排序以保持一致性
		.map(item => `\n\t\t${item},`)
		.join('');
}

/**
 * 更新 precache_auto.ts 文件
 */
async function updatePrecacheFile() {
	const outputPath = path.join('./', OUTPUT_FILE);

	// 检查文件是否存在
	if (!fsSync.existsSync(outputPath)) {
		console.error(`❌ 错误: 目标文件不存在: ${outputPath}`);
		console.log('💡 提示: 请先创建 precache_auto.ts 文件模板');
		process.exit(1);
	}

	try {
		console.log('📝 正在更新 precache_auto.ts...');

		// 读取文件内容
		const content = await fs.readFile(outputPath, 'utf-8');

		// 格式化资源数组
		const particleCustomText = formatResourceArray(particlesCustom);
		const particleToolText = formatResourceArray(particlesTool);
		const modelText = formatResourceArray(models);

		// 替换对应的数组内容
		let updatedContent = content
			.replace(/particle:\s*\[.*?\]/s, `particle: [${particleCustomText}\n\t]`)
			.replace(/particle_tool:\s*\[.*?\]/s, `particle_tool: [${particleToolText}\n\t]`)
			.replace(/model:\s*\[.*?\]/s, `model: [${modelText}\n\t]`);

		// 写入更新后的内容
		await fs.writeFile(outputPath, updatedContent, 'utf-8');

		console.log('✅ precache_auto.ts 更新成功！');
		console.log(`   - particle: ${particlesCustom.size} 项`);
		console.log(`   - particle_tool: ${particlesTool.size} 项`);
		console.log(`   - model: ${models.size} 项`);
	} catch (error) {
		console.error('❌ 更新文件失败:', error.message);
		process.exit(1);
	}
}

// ==================== 主流程 ====================
(async () => {
	try {
		console.log('🚀 开始生成预缓存配置...\n');

		// 扫描所有资源
		scanAllResources();

		// 更新配置文件
		await updatePrecacheFile();

		console.log('\n✨ 预缓存配置生成完成！');
	} catch (error) {
		console.error('❌ 执行失败:', error.message);
		process.exit(1);
	}
})();