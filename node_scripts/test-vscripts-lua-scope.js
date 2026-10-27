/* 对照 TS 中声明的依赖和真实生成 Lua 的作用域，捕获初始化表达式被提升后误读全局变量。 */
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const ts = require('typescript'), lua = require('luaparse');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'content/athena_tsbuild/scripts/vscripts');
const output = path.join(root, 'game/athena_tsbuild/scripts/vscripts');
const failures = [];
let checked = 0;
function scan(directory) {
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) { scan(file); continue; }
		if (!file.endsWith('.ts')) continue;
		const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
		let globals;
		function visit(node) {
			if (ts.isVariableDeclarationList(node) && node.declarations.length > 1) {
				const earlier = new Set();
				for (const declaration of node.declarations) {
					if (declaration.initializer) {
						const dependencies = new Set();
						function references(child) {
							if (ts.isIdentifier(child) && earlier.has(child.text)
								&& !(ts.isPropertyAccessExpression(child.parent) && child.parent.name === child)) dependencies.add(child.text);
							ts.forEachChild(child, references);
						}
						references(declaration.initializer);
						if (dependencies.size) {
							const relative = path.relative(source, file);
							if (!globals) {
								const generated = path.join(output, relative.replace(/\.ts$/, '.lua'));
								assert.ok(fs.existsSync(generated), '请先构建 VScripts: ' + generated);
								globals = new Set(lua.parse(fs.readFileSync(generated, 'utf8'), { scope: true, luaVersion: '5.2' }).globals.map(identifier => identifier.name));
							}
							checked++;
							for (const name of dependencies) if (globals.has(name)) failures.push(`${relative}:${ast.getLineAndCharacterOfPosition(declaration.getStart(ast)).line + 1}: ${name} 被生成代码当作全局变量读取`);
						}
					}
					if (ts.isIdentifier(declaration.name)) earlier.add(declaration.name.text);
				}
			}
			ts.forEachChild(node, visit);
		}
		visit(ast);
	}
}
scan(source);
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`PASS ${checked} dependent declarations preserve local scope in generated Lua.`);
