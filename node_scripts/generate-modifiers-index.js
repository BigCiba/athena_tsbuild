const fs = require('fs');
const path = require('path');
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();
const MODIFIERS_DIR = path.join(paths.contentScripts, 'modifiers');
const OUTPUT_FILE = path.join(MODIFIERS_DIR, 'index.ts');

// 自定义顶部代码
const CUSTOM_HEADER = `// require("./eom_modifier/property_check_value_callback");
// require("./eom_modifier/properties_declare");
// require("./eom_modifier/properties");
// require("./eom_modifier/events");
// require("./eom_modifier/states");
`;

// 需要排除的文件夹
const EXCLUDE_DIRS = ['eom_modifier'];

// 需要排除的文件
const EXCLUDE_FILES = ['index.ts'];

/**
 * 递归扫描目录，获取所有 .ts 文件
 * @param {string} dir 目录路径
 * @param {string} baseDir 基准目录（用于计算相对路径）
 * @returns {Array<{folder: string, fileName: string}>} 文件信息数组
 */
function scanModifiers(dir, baseDir = MODIFIERS_DIR) {
	const results = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.relative(baseDir, dir);
		const folderName = relativePath || '.';

		if (entry.isDirectory()) {
			// 跳过排除的文件夹
			if (EXCLUDE_DIRS.includes(entry.name)) {
				continue;
			}
			// 递归扫描子目录
			results.push(...scanModifiers(fullPath, baseDir));
		} else if (entry.isFile() && entry.name.endsWith('.ts')) {
			// 跳过排除的文件
			if (EXCLUDE_FILES.includes(entry.name)) {
				continue;
			}
			const fileName = entry.name.replace(/\.ts$/, '');
			results.push({ folder: folderName, fileName });
		}
	}

	return results;
}

/**
 * 按文件夹分组
 * @param {Array<{folder: string, fileName: string}>} files 文件信息数组
 * @returns {Record<string, string[]>} 按文件夹分组的文件名
 */
function groupByFolder(files) {
	const groups = {};
	for (const { folder, fileName } of files) {
		if (!groups[folder]) {
			groups[folder] = [];
		}
		groups[folder].push(fileName);
	}
	return groups;
}

/**
 * 生成 index.ts 内容
 * @param {Record<string, string[]>} groups 分组的文件
 * @returns {string} 生成的代码
 */
function generateIndexContent(groups) {
	let content = CUSTOM_HEADER;
	content += '// modifier加载列表\n';

	// 按文件夹名排序
	const sortedFolders = Object.keys(groups).sort();

	for (const folder of sortedFolders) {
		const files = groups[folder].sort();

		// 生成注释
		const folderDisplay = folder === '.' ? 'root' : folder;
		content += `// ${folderDisplay}\n`;

		// 生成 require 代码
		content += 'for (const [i, v] of ipairs([\n';
		files.forEach((file, index) => {
			const isLast = index === files.length - 1;
			content += `\t"${file}"${isLast ? '' : ','}\n`;
		});
		content += '])) {\n';

		if (folder === '.') {
			content += '\trequire("modifiers." + v);\n';
		} else {
			// 将路径分隔符统一为点号
			const folderPath = folder.replace(/[\\/]/g, '.');
			content += `\trequire("modifiers.${folderPath}." + v);\n`;
		}
		content += '}\n\n';
	}

	return content.trimEnd() + '\n';
}

/**
 * 主函数
 */
function generateModifiersIndex() {
	try {
		console.log('🔍 扫描 modifiers 目录...');
		const files = scanModifiers(MODIFIERS_DIR);
		console.log(`   找到 ${files.length} 个 modifier 文件`);

		const groups = groupByFolder(files);
		const content = generateIndexContent(groups);

		console.log('📝 生成 index.ts...');
		fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
		console.log('✅ modifiers/index.ts 生成成功！');
	} catch (error) {
		console.error('❌ 生成失败:', error.message);
		process.exit(1);
	}
}

// 如果直接运行此脚本
if (require.main === module) {
	generateModifiersIndex();
}

module.exports = { generateModifiersIndex };
