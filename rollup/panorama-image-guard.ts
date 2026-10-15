import { existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { Plugin, PluginContext } from 'rollup';
import { writeFileCache } from './utils';

export type ImageGuardMode = 'fallback' | 'strict';
type MissingImage = { file: string; line: number; url: string; fallback: string; };

/** 检查项目自有图片；只降级构建产物，源码保留原始资源路径。 */
export class PanoramaImageGuard {
	private issues = new Map<string, MissingImage>();
	private outputs = new Map<string, string>();
	readonly placeholder = 'file://{images}/custom_game/eom_design/icon/conv_worngmark.png';
	readonly reportPath: string;
	private isFile(file: string) { try { return statSync(file).isFile(); } catch { return false; } }
	constructor(private options: { projectRoot: string; contentImages: string; gameImages: string; mode: ImageGuardMode }) {
		this.reportPath = path.join(options.projectRoot, 'node_modules/.cache/panorama/missing-images.json');
	}

	/** 返回 undefined 表示引擎内置/动态资源，无需按项目文件校验。 */
	private resolveImage(url: string): { uri: string } | false | undefined {
		if (!url.trim()) return false;
		let relative: string | undefined;
		if (url.startsWith('file://{images}/custom_game/')) relative = url.slice('file://{images}/'.length);
		else if (url.startsWith('file://{resources}/images/custom_game/')) relative = url.slice('file://{resources}/images/'.length);
		else if (url.startsWith('s2r://panorama/images/custom_game/')) relative = url.slice('s2r://panorama/images/'.length);
		else return undefined;
		try { relative = decodeURIComponent(relative.split(/[?#]/)[0]).replace(/\\/g, '/'); } catch { return false; }
		relative = path.posix.normalize(relative);
		if (!relative.startsWith('custom_game/')) return false;
		const resource = relative.endsWith('_c') ? relative.slice(0, -2) : relative;
		const candidates = [relative, resource];
		const compiled = [relative.endsWith('_c') ? relative : relative + '_c'];
		const extension = path.posix.extname(resource).toLowerCase();
		const stem = resource.slice(0, -extension.length);
		if (extension === '.vtex') {
			const match = /^(.*)_(png|jpg|jpeg|tga|psd|vtf|bmp|gif|webp)$/i.exec(stem);
			if (match) candidates.push(`${match[1]}.${match[2]}`);
		} else if (extension === '.vsvg') candidates.push(stem + '.svg');
		else if (extension) {
			const texture = `${stem}_${extension.slice(1)}.vtex`;
			candidates.push(texture); compiled.push(texture + '_c');
			if (extension === '.svg') compiled.push(stem + '.vsvg_c');
		}
		if (candidates.some(file => this.isFile(path.join(this.options.contentImages, file)))) return { uri: url };
		const texture = compiled.find(file => this.isFile(path.join(this.options.gameImages, file)));
		// file:// 源图路径即使有编译纹理也可能生成空弱引用；直接引用现有引擎纹理。
		return texture ? { uri: 's2r://panorama/images/' + texture.replace(/_c$/, '') } : false;
	}
	private missing(url: string, file: string, content: string, offset: number, fallback: string, startLine = 1) {
		this.issues.set(`${file}\0${url}`, { file: path.relative(this.options.projectRoot, file).replace(/\\/g, '/'), line: startLine - 1 + content.slice(0, offset).split('\n').length, url, fallback });
	}

	/** 按声明处理缺图。Panorama 不接受 none, none 或 url(...), none 这样的图片列表。 */
	css(content: string, file: string, startLine = 1): string {
		const tokens = /\/\*[\s\S]*?\*\/|\burl\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^)]*?))\s*\)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/gi;
		const replacements: { start: number; end: number; value: string }[] = [];
		const transform = (start: number, end: number) => {
			const value = content.slice(start, end);
			let missing = false;
			let safe = value.replace(tokens, (token, double, single, plain, offset) => {
				if (!/^url\(/i.test(token)) return token;
				const url = String(double ?? single ?? plain ?? '').trim();
				const resolved = this.resolveImage(url);
				if (resolved !== false) return resolved && resolved.uri !== url ? `url("${resolved.uri}")` : token;
				missing = true; this.missing(url, file, content, start + offset, 'none', startLine); return token;
			});
			if (missing) {
				// 整个声明降级，避免非法图片列表，也不重排已有图层与 background-size 的对应关系。
				const leading = /^\s*/.exec(value)![0], trailing = /\s*$/.exec(value)![0];
				const important = /\s*!important(?=\s*$)/i.exec(value)?.[0] ?? '';
				safe = `${leading}none${important}${trailing}`;
				// 保留行数，报告中的后续生成文件行号仍然准确。
				const lines = (value.match(/\n/g)?.length ?? 0) - (safe.match(/\n/g)?.length ?? 0);
				if (lines > 0) safe = `${leading}none${important}${'\n'.repeat(lines)}${trailing}`;
			}
			if (safe !== value) replacements.push({ start, end, value: safe });
		};
		// 仅在引号、注释和函数外识别声明边界；不把 gradient() 的逗号、URL 或选择器当成属性。
		let boundary = 0, valueStart = -1, depth = 0, quote = '';
		for (let i = 0; i < content.length; i++) {
			const character = content[i];
			if (quote) { if (character === '\\') i++; else if (character === quote) quote = ''; continue; }
			if (character === '/' && content[i + 1] === '*') {
				const end = content.indexOf('*/', i + 2); if (end < 0) break; i = end + 1; continue;
			}
			if (character === '"' || character === "'") { quote = character; continue; }
			if (character === '(') { depth++; continue; }
			if (character === ')') { depth = Math.max(0, depth - 1); continue; }
			if (depth) continue;
			if (character === ':' && valueStart < 0) {
				const property = content.slice(boundary, i).replace(/\/\*[\s\S]*?\*\//g, '').trim();
				if (/^[-_a-zA-Z][-_a-zA-Z0-9]*$/.test(property)) valueStart = i + 1;
			} else if (character === '{') { boundary = i + 1; valueStart = -1; }
			else if (character === ';' || character === '}') {
				if (valueStart >= 0) transform(valueStart, i);
				boundary = i + 1; valueStart = -1;
			}
		}
		if (valueStart >= 0) transform(valueStart, content.length);
		let result = '', cursor = 0;
		for (const replacement of replacements) { result += content.slice(cursor, replacement.start) + replacement.value; cursor = replacement.end; }
		return result + content.slice(cursor);
	}
	/** 静态 Image 和内联样式也会参与 Source 2 依赖编译，必须一起处理。 */
	xml(content: string, file: string): string {
		const decode = (value: string) => value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
		return content.replace(/<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<[A-Za-z][^>]*>/g, (tag, offset) => {
			if (tag.startsWith('<!--') || tag.startsWith('<![CDATA[')) return tag;
			if (/^<Image\b/i.test(tag)) tag = tag.replace(/(?<![\w:-])src\s*=\s*(["'])([\s\S]*?)\1/i, (attribute: string, quote: string, value: string) => {
				const url = decode(value), resolved = this.resolveImage(url);
				if (resolved !== false) return resolved && resolved.uri !== url ? `src=${quote}${resolved.uri}${quote}` : attribute;
				const placeholder = this.resolveImage(this.placeholder);
				if (!placeholder) throw new Error('调试占位图片缺失：' + this.placeholder);
				this.missing(url, file, content, offset, placeholder.uri); return `src=${quote}${placeholder.uri}${quote}`;
			});
			return tag.replace(/(?<![\w:-])style\s*=\s*(["'])([\s\S]*?)\1/gi, (attribute: string, quote: string, value: string, attributeOffset: number) => {
				const original = decode(value), safe = this.css(original, file, content.slice(0, offset + attributeOffset).split('\n').length);
				if (safe === original) return attribute;
				const escaped = safe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(quote === '"' ? /"/g : /'/g, quote === '"' ? '&quot;' : '&apos;');
				return `style=${quote}${escaped}${quote}`;
			});
		});
	}
	/** 统一延迟写出；严格模式缺图时保留上次可用的 XML/CSS。 */
	write(file: string, content: string) { this.outputs.set(file, content); }
	private finish(context: PluginContext) {
		const issues = [...this.issues.values()];
		mkdirSync(path.dirname(this.reportPath), { recursive: true });
		writeFileCache(this.reportPath, JSON.stringify({ mode: this.options.mode, missingImages: new Set(issues.map(item => item.url)).size, issues }, null, 2));
		if (issues.length) {
			const details = issues.slice(0, 12).map(item => `${item.file}:${item.line} ${item.url || '<empty URL>'} → ${item.fallback}`).join('\n');
			const message = `[panorama-images] ${new Set(issues.map(item => item.url)).size} 个缺失图片路径，${issues.length} 处文件引用。\n${details}\n完整清单：${this.reportPath}`;
			if (this.options.mode === 'strict') context.error(message + '\n严格构建禁止缺图，XML/CSS 未写出。');
			else context.warn(message);
		}
		// 先落盘 CSS 再写布局，避免编辑器观察到尚未生成样式的入口 XML。
		const outputs = [...this.outputs].sort(([a], [b]) => Number(a.endsWith('.xml')) - Number(b.endsWith('.xml')));
		for (const [file, content] of outputs) { mkdirSync(path.dirname(file), { recursive: true }); writeFileCache(file, content); }
	}
	plugin(): Plugin {
		const guard = this;
		return {
			name: 'panorama-image-guard',
			buildStart: { order: 'pre', handler() {
				guard.issues.clear(); guard.outputs.clear();
				// 目录监听也覆盖新增图片；下次编译重新检查，自动恢复原始引用。
				for (const directory of [guard.options.contentImages, guard.options.gameImages]) if (existsSync(directory)) this.addWatchFile(directory);
			} },
			writeBundle: { order: 'post', sequential: true, handler() { guard.finish(this); } },
		};
	}
}
