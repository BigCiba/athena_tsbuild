import * as fs from "fs";
import { render } from 'less';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path, { basename, dirname, extname, join } from 'node:path';
import { Plugin, PluginContext } from 'rollup';
import { getAllCacheCSS } from 'solid-panorama-all-in-jsx/css.macro';
import { ensureDir, writeFileCache } from "./utils";

export function rollupPluginLess(options: {
	inputFiles: string[];
	dir: string;
	rootPath: string;
	globalLessFiles?: string[];
	resolvePath?: (path: string) => string | undefined;
	resolveFilename?: (filename: string) => string | undefined;
}): Plugin {
	function findAndMergeLess(
		ctx: PluginContext,
		id: string,
		cache: Record<string, string>
	): string {
		const info = ctx.getModuleInfo(id);
		const importedIds = info?.importedIds;

		if (!importedIds) {
			return '';
		}
		let code = '';

		for (const child of importedIds) {
			code += findAndMergeLess(ctx, child, cache) + '\n\n';
		}

		if (cache[id]) {
			code += cache[id];
		}
		return code;
	}

	return {
		name: 'rollup-plugin-less',
		// 处理tsx中import ""./xxx.less"
		resolveId(source, importer) {
			if (importer) {
				if (source.endsWith('.less')) {
					return source;
				}
			}
			return null;
		},
		async load(id) {
			if (id.endsWith('.less')) {
				return "";
			}
			return null;
		},
		// 监听less文件变更
		async buildStart() {
			for (const file of options.inputFiles) {
				const lessFile = file.replace(/\.tsx?$/, '.less');
				if (existsSync(lessFile)) {
					this.addWatchFile(lessFile);
				}

				// 关联import的less文件
				let lessList = resolveImport(path.dirname(file), file);
				for (const lessPath in lessList) {
					this.addWatchFile(lessPath);
				}
			}

			// 监听全局 less 文件
			if (options.globalLessFiles) {
				for (const lessFile of options.globalLessFiles) {
					if (existsSync(lessFile)) {
						this.addWatchFile(lessFile);
					}
				}
			}
		},
		async writeBundle() {
			// 编译全局 less 文件
			if (options.globalLessFiles) {
				for (const lessFile of options.globalLessFiles) {
					if (!existsSync(lessFile)) continue;

					const lessContent = await readFile(lessFile, 'utf8');
					const result = await render(lessContent, {
						filename: dirname(lessFile),
						paths: [dirname(lessFile), options.rootPath],
					});

					const outFilename = basename(lessFile, '.less');
					const outPath = join(options.dir, outFilename + '.css');

					const css = result.css.replace(/@keyframes\s*(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g, (match, name) => {
						return match.replace(name, `'${name}'`);
					});

					ensureDir(path.dirname(outPath));
					writeFileCache(outPath, css);
				}
			}

			// 编译组件 less 文件
			const cache = getAllCacheCSS();
			for (const filePath of options.inputFiles) {
				let lessFileCode = '';
				const lessFile = filePath.replace(/\.tsx?$/, '.less');
				if (existsSync(lessFile)) {
					lessFileCode = await readFile(lessFile, 'utf8');
				}

				let lessList = resolveImport(dirname(filePath), filePath);
				for (const lessPath in lessList) {
					lessFileCode += '\n' + await readFile(lessPath, 'utf8');
				}

				const code = findAndMergeLess(this, filePath, cache).trim();

				const result = await render(
					lessFileCode + '\n' + code,
					{
						filename: dirname(filePath),
						paths: [dirname(filePath), options.rootPath],
					}
				);

				let outFilename = basename(filePath, extname(filePath));
				if (options.resolveFilename) {
					outFilename = options.resolveFilename(outFilename) ?? outFilename;
				}
				let outPath = join(
					options.dir,
					outFilename + '.css'
				);
				if (options.resolvePath) {
					outPath = options.resolvePath(outPath) ?? outPath;
				}

				const css = result.css.replace(/@keyframes\s*(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g, (match, name) => {
					return match.replace(name, `'${name}'`);
				});

				ensureDir(path.dirname(outPath));
				writeFileCache(outPath, css);
			}
		}
	};
}


/** 递归解析所有的import，暂时只支持tsx */
function resolveImport(layoutPath: string, importPath: string) {
	let list: { [k: string]: boolean; } = {};
	const content = fs.readFileSync(importPath, "utf-8");
	const importList = content.match(/import.*('|")(\.\.\/.*|\.\/.*)('|");/g)?.map((relativePath) => {
		return relativePath.replace(/import.*('|")(\.\.\/.*|\.\/.*)('|");/g, "$2");
	})?.map((relativePath) => {
		return path.resolve(layoutPath, relativePath);
	});
	if (importList) {
		importList.forEach(element => {
			if (element.search(/.*\.less/) != -1) {
				list[element] = true;
			} else {
				let exists = fs.existsSync(element + ".tsx");
				if (exists) {
					list = Object.assign(list, resolveImport(path.dirname(element + ".tsx"), element + ".tsx"));
				}
			}
		});
	}
	return list;
}