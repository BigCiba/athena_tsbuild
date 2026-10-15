// 验证生产资源检查器、严格构建和真实 Rollup 图片补齐监听。
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), vm = require('node:vm'), assert = require('node:assert/strict'), ts = require('typescript');
const project = path.resolve(__dirname, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'athena-ui-assets-'));
const sourceRoot = path.join(temp, 'content/images'), gameRoot = path.join(temp, 'game/images');
const png = fs.readFileSync(path.join(project, 'content/athena_tsbuild/panorama/images/custom_game/eom_design/icon/conv_worngmark.png'));
function write(file, data) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, data); }
write(path.join(sourceRoot, 'custom_game/existing.png'), png);
write(path.join(sourceRoot, 'custom_game/eom_design/icon/conv_worngmark.png'), png);
write(path.join(gameRoot, 'custom_game/packed_png.vtex_c'), Buffer.from('existence-only resolver fixture'));
const moduleObject = { exports: {} };
const emitted = [];
const code = ts.transpileModule(fs.readFileSync(path.join(project, 'rollup/panorama-image-guard.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
vm.runInNewContext(code, { module: moduleObject, exports: moduleObject.exports, require: name => name === './utils' ? { writeFileCache: (file, data) => { emitted.push(file); write(file, data); } } : require(name) });
const { PanoramaImageGuard } = moduleObject.exports;
const make = (mode = 'fallback') => new PanoramaImageGuard({ projectRoot: temp, contentImages: sourceRoot, gameImages: gameRoot, mode });
const output = path.join(temp, 'out/style.css');
const url = name => `file://{images}/custom_game/${name}`;
let passed = 0;
async function test(name, check) { await check(); passed++; console.log('PASS ' + name); }
function finish(guard, errors = false) {
	const context = { warn() {}, error(message) { throw new Error(message); } };
	if (errors) assert.throws(() => guard.plugin().writeBundle.handler.call(context), /严格构建禁止缺图/);
	else guard.plugin().writeBundle.handler.call(context);
	return JSON.parse(fs.readFileSync(guard.reportPath, 'utf8'));
}
async function main() {
	await test('全局滚动条缺图转为 none，保持原始源码字符串', () => {
		const input = `A { border-image-source: url("${url('missing.png')}"); }`, guard = make();
		assert.equal(guard.css(input, output), 'A { border-image-source: none; }'); assert.ok(input.includes('missing.png'));
		assert.equal(finish(guard).missingImages, 1);
	});
	await test('Panorama 复合图片缺图时输出单个 none，不能生成 none, none', () => {
		const guard = make(), input = `A { background-image: url('${url('normal.png')}'), url('${url('hover.png')}'); background-size: 100%, 0%; }`;
		assert.equal(guard.css(input, output), 'A { background-image: none; background-size: 100%, 0%; }');
		assert.equal(finish(guard).missingImages, 2);
	});
	await test('现有 PNG 与隐式纹理保留，仅有编译产物时规范化为 s2r', () => {
		const guard = make();
		for (const value of [url('existing.png'), 's2r://panorama/images/custom_game/existing_png.vtex', 's2r://panorama/images/custom_game/packed_png.vtex']) {
			const input = `A { background-image: url('${value}'); }`; assert.equal(guard.css(input, output), input);
		}
		assert.equal(guard.css(`A { background-image: url('${url('packed.png')}'); }`, output), 'A { background-image: url("s2r://panorama/images/custom_game/packed_png.vtex"); }');
		assert.equal(guard.xml(`<Image src="${url('packed.png')}"/>`, output), '<Image src="s2r://panorama/images/custom_game/packed_png.vtex"/>');
		assert.equal(finish(guard).missingImages, 0);
	});
	await test('内置资源、panel URL 和动态引用不按项目文件误判', () => {
		const guard = make();
		for (const value of ['s2r://panorama/images/control_icons/lock_small_png.vtex', 'file://{images}/control_icons/lock_small.png', 'panel://id', '{s:runtime_image}']) {
			const input = `A { background-image: url("${value}"); }`; assert.equal(guard.css(input, output), input);
		}
	});
	await test('缺失的自定义 s2r 纹理也降级，空 URL 不再进入资源编译器', () => {
		const guard = make();
		for (const value of ['s2r://panorama/images/custom_game/absent_png.vtex', '', '   ']) assert.equal(guard.css(`A { opacity-mask: url("${value}"); }`, output), 'A { opacity-mask: none; }');
	});
	await test('CSS 注释和文本字符串不改写，部分缺图的复合声明也整体降级', () => {
		const guard = make(), input = `/* url('${url('comment.png')}') */ A { content: "url('${url('text.png')}')"; background-image: url('${url('existing.png')}'), url(${url('absent.png')}); }`;
		const safe = guard.css(input, output); assert.ok(safe.includes('comment.png')); assert.ok(safe.includes('text.png')); assert.ok(safe.includes('background-image: none;'));
		assert.equal(finish(guard).missingImages, 1);
	});
	await test('资源完整的多重背景和渐变不改写，选择器与函数内分隔符不误判', () => {
		const guard = make(), input = `Panel:hover:not(.Hidden) { background-image: url('${url('existing.png')}'), url('${url('existing.png')}'); background-color: gradient(linear, 0% 0%, 100% 100%, from(#111), to(#222)); content: "text; } url('${url('text.png')}')"; }`;
		assert.equal(guard.css(input, output), input); assert.equal(finish(guard).missingImages, 0);
	});
	await test('多行复合背景保留行号，XML 内联样式和掩码采用相同声明降级', () => {
		const guard = make(), input = `A {\n background-image: url('${url('first.png')}'),\n url('${url('second.png')}');\n opacity-mask: url('${url('third.png')}');\n}`;
		const safe = guard.css(input, output); assert.equal(safe.split('\n').length, input.split('\n').length); assert.equal(finish(guard).issues.find(item => item.url.endsWith('third.png')).line, 4);
		assert.equal(guard.xml(`<Panel style="background-image: url('${url('first.png')}'), url('${url('existing.png')}');"/>`, output), '<Panel style="background-image: none;"/>');
		assert.equal(guard.css(`border-image-source: url('${url('first.png')}'), url('${url('second.png')}')`, output), 'border-image-source: none');
	});
	await test('静态 XML Image 使用有效占位图，注释与现有图片保留', () => {
		const guard = make(), input = `<root><!-- <Image src="${url('comment.png')}"/> --><Image src="${url('missing.png')}"/><Image src="${url('existing.png')}"/></root>`;
		const safe = guard.xml(input, path.join(temp, 'out/panel.xml')); assert.ok(safe.includes(guard.placeholder)); assert.ok(safe.includes('comment.png')); assert.ok(safe.includes('existing.png'));
		assert.equal(finish(guard).missingImages, 1);
	});
	await test('XML 内联 CSS 处理缺图并正确保留实体转义', () => {
		const guard = make(), input = `<Panel style="background-image: url(&quot;${url('missing.png')}&quot;); opacity: 0.5;"/>`;
		assert.equal(guard.xml(input, output), '<Panel style="background-image: none; opacity: 0.5;"/>');
	});
	await test('目录不当作图片；data 属性不误改；内联样式报告 XML 行号', () => {
		const guard = make();
		assert.equal(guard.css(`A { background-image: url('${url('eom_design/')}'); }`, output), 'A { background-image: none; }');
		const input = `<root>\n<Image data-src="${url('unused.png')}" src="${url('existing.png')}"/>\n<Panel data-style="url('${url('unused.png')}')" style="background-image: url('${url('missing.png')}');"/></root>`;
		const safe = guard.xml(input, path.join(temp, 'out/panel.xml')); assert.ok(safe.includes('unused.png')); assert.equal(finish(guard).issues.find(item => item.url.endsWith('missing.png')).line, 3);
	});
	await test('XML/CSS 延迟统一写出时，CSS 必须先于关联布局落盘', () => {
		const guard = make(), start = emitted.length;
		guard.write(path.join(temp, 'out/ordered.xml'), '<root/>'); guard.write(path.join(temp, 'out/ordered.css'), 'A {}'); finish(guard);
		assert.deepEqual(emitted.slice(start).filter(file => /ordered\./.test(file)).map(file => path.extname(file)), ['.css', '.xml']);
	});
	await test('严格模式阻止产物写出，保留上一份可用 CSS 并生成报告', () => {
		write(output, 'previous valid CSS'); const guard = make('strict');
		guard.write(output, guard.css(`A { background-image: url('${url('missing.png')}'); }`, output));
		const report = finish(guard, true); assert.equal(report.mode, 'strict'); assert.equal(fs.readFileSync(output, 'utf8'), 'previous valid CSS');
	});
	await test('严格模式在资源完整时正常写出；开发模式报告文件和行号', () => {
		let guard = make('strict'); guard.write(output, guard.css(`A { background-image: url('${url('existing.png')}'); }`, output)); finish(guard);
		guard = make(); guard.write(output, guard.css(`A {\n background-image: url('${url('missing.png')}');\n}`, output));
		const report = finish(guard); assert.equal(report.issues[0].line, 2); assert.equal(report.issues[0].file, 'out/style.css'); assert.ok(fs.readFileSync(output, 'utf8').includes('none'));
	});
	await test('真实 global_style 的 4 张未迁移图片全部处理', () => {
		const guard = new PanoramaImageGuard({ projectRoot: temp, contentImages: path.join(project, 'content/athena_tsbuild/panorama/images'), gameImages: path.join(project, 'game/athena_tsbuild/panorama/images'), mode: 'fallback' });
		const input = fs.readFileSync(path.join(project, 'src/less/global_style.less'), 'utf8');
		const safe = guard.css(input, output); assert.equal(/url\([^)]*conv\/common\//.test(safe), false);
		assert.equal(finish(guard).missingImages, 4);
	});
	await test('真实 Rollup 在 CSS 生成结束后统一写出；补齐图片自动恢复引用', async () => {
		const rollup = require('rollup'), guard = make();
		const entry = path.join(temp, 'entry.js'), watchedOutput = path.join(temp, 'watch/style.css'), added = path.join(sourceRoot, 'custom_game/later.png');
		write(entry, 'export default 1;');
		let builds = 0, watcher;
		const complete = new Promise((resolve, reject) => {
			watcher = rollup.watch({ input: entry, output: { dir: path.join(temp, 'watch'), format: 'cjs' }, watch: { buildDelay: 20 }, onwarn() {}, plugins: [
				{ name: 'css-producer', async writeBundle() { await new Promise(resolve => setTimeout(resolve, 5)); guard.write(watchedOutput, guard.css(`A { background-image: url('${url('later.png')}'); }`, watchedOutput)); } }, guard.plugin(),
			] });
			watcher.on('event', async event => {
				try {
					if (event.code === 'ERROR') return reject(event.error);
					if (event.code !== 'BUNDLE_END') return;
					await event.result.close(); builds++;
					const current = fs.readFileSync(watchedOutput, 'utf8');
					if (builds === 1) { assert.ok(current.includes('none')); setTimeout(() => write(added, png), 200); }
					else if (current.includes('later.png')) { assert.equal(JSON.parse(fs.readFileSync(guard.reportPath)).missingImages, 0); resolve(); }
				} catch (error) { reject(error); }
			});
		});
		let timeout;
		try { await Promise.race([complete, new Promise((_resolve, reject) => { timeout = setTimeout(() => reject(new Error('图片补齐后未触发恢复编译')), 12000); })]); }
		finally { clearTimeout(timeout); await watcher?.close(); }
	});
	console.log(`Passed ${passed} Panorama image checks.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
	const verified = path.resolve(temp);
	if (path.dirname(verified) !== path.resolve(os.tmpdir()) || !path.basename(verified).startsWith('athena-ui-assets-')) throw new Error('拒绝清理工作目录之外的路径');
	fs.rmSync(verified, { recursive: true, force: true });
});
