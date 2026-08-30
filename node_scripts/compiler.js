const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require('child_process');
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();
const addonName = paths.addonName;
const link = paths.gameRoot;
let dota2Path = "F:/SteamLibrary/steamapps/common/dota 2 beta";
let stats = fs.lstatSync(link);
if (stats.isSymbolicLink()) {
	// 读取符号链接的原地址
	const linkString = fs.readlinkSync(link);
	dota2Path = path.resolve(linkString, "../../../");
}
console.log('符号链接的原地址:', dota2Path);
const prefabs = path.join(dota2Path, `content/dota_addons/${addonName}/maps/prefabs`);

/** 递归获取所有文件 */
function getAllFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			getAllFiles(filePath, fileList);
		} else {
			fileList.push(filePath);
		}
	}
	return fileList;
}

/** 过滤24小时内修改的文件 */
function filterRecentFiles(files) {
	const now = Date.now();
	const oneDayAgo = now - 12 * 60 * 60 * 1000;
	return files.filter(filePath => {
		const stat = fs.statSync(filePath);
		return stat.mtimeMs >= oneDayAgo;
	});
}

/** HTML颜色转ANSI终端颜色 */
const colorMap = {
	'#FF0000': '\x1b[31m',    // 红色 - 错误
	'#FFFF00': '\x1b[33m',    // 黄色 - 警告
	'#00FF00': '\x1b[32m',    // 绿色 - 成功
	'#00FFFF': '\x1b[36m',    // 青色 - 信息
	'#FFFFFF': '\x1b[37m',    // 白色
	'#C0C00A': '\x1b[33m',    // 深黄色 - 警告
};
const RESET = '\x1b[0m';

/** 将HTML格式输出转换为可读的终端格式 */
function convertHtmlToReadable(html) {
	let text = html
		// 转换颜色标签为ANSI颜色
		.replace(/<font color="([^"]+)">/gi, (match, color) => {
			return colorMap[color.toUpperCase()] || '';
		})
		.replace(/<\/font>/gi, RESET)
		// 转换HTML实体
		.replace(/&#(\d+);/g, (match, code) => String.fromCharCode(parseInt(code)))
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		// 转换换行
		.replace(/<br\s*\/?>/gi, '\n')
		// 移除其他HTML标签
		.replace(/<[^>]+>/g, '')
		// 清理多余空行
		.replace(/\n{3,}/g, '\n\n');

	return text.trim();
}

/** 编译文件列表 */
function compileFiles(files) {
	console.log(`找到 ${files.length} 个文件需要编译\n`);

	if (files.length === 0) {
		console.log('没有需要编译的文件');
		return;
	}

	for (let i = 0; i < files.length; i++) {
		const prefabPath = files[i];
		const relativePath = path.relative(prefabs, prefabPath);
		console.log(`[${i + 1}/${files.length}] 正在编译: ${relativePath}`);

		try {
			const output = execSync(
				`"${dota2Path}\\game\\bin\\win64\\resourcecompiler.exe" -fshallow -maxtextureres 256 -dxlevel 110 -quiet -html -unbufferedio -i "${prefabPath}" -noassert -world -phys -vis -gridnav -breakpad -nompi -nop4 -outroot "${dota2Path}\\game"`,
				{ encoding: 'utf8', stdio: 'pipe' }
			);
			if (output.trim()) {
				console.log(convertHtmlToReadable(output));
			}
			console.log(`\x1b[32m✓ 完成\x1b[0m\n`);
		} catch (error) {
			// execSync 抛出的错误包含 stdout
			const stdout = error.stdout ? convertHtmlToReadable(error.stdout) : '';
			if (stdout) {
				console.log(stdout);
			}
			console.error(`\x1b[31m✗ 编译失败: ${error.message}\x1b[0m\n`);
		}
	}

	console.log('所有文件编译完成!');
}

/** 主函数 */
async function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log('\n请选择编译模式:');
	console.log('1. 近期编译 (12小时内修改的文件)');
	console.log('2. 全编译 (所有文件)\n');

	rl.question('请输入选项 (1/2): ', (answer) => {
		rl.close();

		const allFiles = getAllFiles(prefabs);

		if (answer === '1') {
			console.log('\n--- 近期编译模式 ---\n');
			const recentFiles = filterRecentFiles(allFiles);
			compileFiles(recentFiles);
		} else if (answer === '2') {
			console.log('\n--- 全编译模式 ---\n');
			compileFiles(allFiles);
		} else {
			console.log('无效选项，默认使用近期编译模式\n');
			const recentFiles = filterRecentFiles(allFiles);
			compileFiles(recentFiles);
		}
	});
}

main();
