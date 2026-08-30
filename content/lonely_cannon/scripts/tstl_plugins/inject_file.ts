import * as path from "path";
import * as ts from "typescript";
import * as tstl from "@bigciba/typescript-to-lua";
import { transformCallAndArguments } from "@bigciba/typescript-to-lua/dist/transformation/visitors/call";

type PluginOptions = {
	variableName?: string;
};

const toPosix = (value: string) => value.replace(/\\/g, "/");
const escapeLuaString = (value: string) => value
	.replace(/\\/g, "\\\\")
	.replace(/"/g, "\\\"")
	.replace(/\r/g, "\\r")
	.replace(/\n/g, "\\n");

// TSTL 插件：
// 1) 注入全局 local 变量 __FILE__（默认名可配置）
// 2) 在装饰器调用处把 this 设为当前文件路径
const createPlugin = (pluginOptions: PluginOptions = {}): tstl.Plugin => {
	const variableName = pluginOptions.variableName || "__TSTL_FILE_PATH__";
	const decoratorNames = [
		"registerEOMModifier",
		"registerModifier"
	];

	return {
		visitors: {
			// 访问 CallExpression，将 registerEOMModifier(...) 的 this 绑定为 __FILE__
			[ts.SyntaxKind.CallExpression]: (node, context) => {
				if (ts.isIdentifier(node.expression) && decoratorNames.includes(node.expression.text)) {
					const signature = context.checker.getResolvedSignature(node);
					const callContext = ts.factory.createIdentifier(variableName);
					const [callPath, parameters] = transformCallAndArguments(
						context,
						node.expression,
						node.arguments,
						signature,
						callContext,
					);
					return tstl.createCallExpression(callPath, parameters, node);
				}
				return context.superTransformNode(node) as any;
			},
		},
		// 生成 Lua 代码后，插入 local __FILE__ = "path"
		afterPrint: (program, options, emitHost, result) => {
			const baseDir = (options && options.configFilePath ? path.dirname(options.configFilePath) : undefined)
				|| (emitHost && emitHost.getCurrentDirectory ? emitHost.getCurrentDirectory() : undefined)
				|| process.cwd();

			for (const file of result) {
				const sourceFile = file.sourceFiles && file.sourceFiles[0];
				let rawPath = (sourceFile && sourceFile.fileName) || file.fileName;
				if (rawPath === undefined) {
					continue;
				}
				rawPath = path.relative(baseDir, rawPath);
				const normalized = toPosix(rawPath).replace(/\.ts$/i, "");
				const escaped = escapeLuaString(normalized);
				const prefix = `local ${variableName} = "${escaped}"\n`;
				if (!file.code.startsWith(prefix)) {
					file.code = prefix + file.code;
				}
			}
		},
	};
};

export default createPlugin;