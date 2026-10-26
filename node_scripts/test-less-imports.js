/* 验证跨目录 LESS 导入、原文件不变及嵌套依赖热更新监听。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
require('ts-node').register({ project: path.resolve(__dirname, '../rollup/tsconfig.json'), transpileOnly: true });
const { rollupPluginLess } = require('../rollup/rollup-plugin-less');
(async () => {
 const root = fs.mkdtempSync(path.join(os.tmpdir(), 'athena-less-'));
 const a = path.join(root, 'a'), b = path.join(root, 'b'); fs.mkdirSync(a); fs.mkdirSync(b);
 const entry = path.join(root, 'hud.tsx'), own = path.join(root, 'hud.less'), main = path.join(a, 'main.less'), nested = path.join(b, 'nested.less');
 const original = '@import "../b/nested.less";\n.Outer { .Inner { width: @size; } }';
 fs.writeFileSync(entry, 'import "./a/main.less";'); fs.writeFileSync(main, original); fs.writeFileSync(own, '.Root { height: 100%; }'); fs.writeFileSync(nested, '@size: 42px;');
 const watched = new Set(), output = [];
 const plugin = rollupPluginLess({ inputFiles: [entry], dir: root, rootPath: root, imageGuard: { css: css => css, write: (_path, css) => output.push(css) } });
 const context = { addWatchFile: file => watched.add(file), getModuleInfo: () => undefined };
 try {
  await plugin.buildStart.call(context); assert.ok(watched.has(main)); assert.ok(watched.has(nested));
  await plugin.writeBundle.call({ ...context, addWatchFile() { throw Error('Write phase must not register watches'); } }); assert.ok(output[0].includes('width: 42px;')); assert.ok(output[0].includes('height: 100%;'));
  fs.writeFileSync(nested, '@size: 84px;'); await plugin.writeBundle.call(context); assert.ok(output[1].includes('width: 84px;')); assert.equal(fs.readFileSync(main, 'utf8'), original);
  console.log('PASS LESS 嵌套导入按原文件解析，依赖变更重建生效，源文件保持不变');
 } finally {
  for (const file of [entry, own, main, nested]) fs.unlinkSync(file); fs.rmdirSync(a); fs.rmdirSync(b); fs.rmdirSync(root);
 }
})().catch(error => { console.error(error); process.exitCode = 1; });
