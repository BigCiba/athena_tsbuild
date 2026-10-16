import path from 'path';
import { readFileSync } from 'fs';
import { buildPolyfillBundle } from './plugin-polyfill';

/** 使用正式 Rollup 插件的同一实现，单独编译双端共享状态/属性等 Panorama 代码。 */
const root = path.resolve(__dirname, '..');
const packageFile = path.join(root, 'package.json');
const addon = JSON.parse(readFileSync(packageFile, 'utf8')).name as string;
const result = buildPolyfillBundle({
	packageFile,
	rootDir: path.join(root, 'src/polyfill'),
	outputFile: path.join(root, `content/${addon}/panorama/scripts/custom_game/panorama-polyfill.js`),
});
if (result.missing.length > 0) throw new Error(`缺少 Polyfill 源文件：${result.missing.join(', ')}`);
console.log(`✅ Polyfill files compiled: ${result.files.join(', ')}`);
