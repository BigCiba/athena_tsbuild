import * as path from "path";
import * as tstl from "@bigciba/typescript-to-lua";

/**
 * TSTL 插件：为 addon_game_mode.ts 和 addon_game_mode_client.ts 注入 debug 模块容错实现。
 *
 * 线上版本的 Lua debug 模块会被删除，需要在 Lua 文件最顶部注入 fallback，
 * 确保 debug.traceback / debug.getinfo 调用不会因 nil 而崩溃。
 */

const TARGET_FILES = new Set(["addon_game_mode", "addon_game_mode_client"]);

const DEBUG_FALLBACK_LUA = [
	`-- [debug fallback] production environment may remove the debug module`,
	`if _G.debug == nil then _G.debug = {} end`,
	`if _G.debug.traceback == nil then _G.debug.traceback = function(...) return "" end end`,
	`if _G.debug.getinfo == nil then _G.debug.getinfo = function(...) return { source = "", what = "" } end end`,
	``,
].join("\n");

const createPlugin = (): tstl.Plugin => {
	return {
		afterPrint: (_program, options, emitHost, result) => {
			const baseDir =
				(options?.configFilePath ? path.dirname(options.configFilePath) : undefined) ??
				emitHost?.getCurrentDirectory?.() ??
				process.cwd();

			for (const file of result) {
				const sourceFile = file.sourceFiles?.[0];
				const rawPath = sourceFile?.fileName ?? file.fileName;
				if (rawPath === undefined) continue;

				const baseName = path.basename(rawPath, path.extname(rawPath));
				if (!TARGET_FILES.has(baseName)) continue;

				if (!file.code.startsWith(DEBUG_FALLBACK_LUA)) {
					file.code = DEBUG_FALLBACK_LUA + file.code;
				}
			}
		},
	};
};

export default createPlugin;
