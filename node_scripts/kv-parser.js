const fs = require('fs');
const path = require('path');

/**
 * 解析KV文件内容（不处理#base）
 * @param {string} content - KV文件内容
 * @returns {object} 解析后的对象
 */
function parseKVContent(content) {
	// 移除注释
	content = content.replace(/\/\/.*$/gm, '');
	content = content.replace(/\/\*[\s\S]*?\*\//g, '');

	const lines = content.split('\n').map(line => line.trim()).filter(line => line);
	let current = {};
	let stack = [{ obj: current, key: null }];
	let rootKey = null;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// 跳过空行和#base指令（已在外部处理）
		if (!line || line.startsWith('#base')) continue;

		// 处理键值对（键值之间可以没有空格）
		const kvMatch = line.match(/^"([^"]+)"\s*"([^"]+)"$/);
		if (kvMatch) {
			const [, key, value] = kvMatch;
			const parent = stack[stack.length - 1];

			// 尝试转换数值
			let parsedValue = value;
			if (/^-?\d+$/.test(value)) {
				parsedValue = parseInt(value, 10);
			} else if (/^-?\d+\.\d+$/.test(value)) {
				parsedValue = parseFloat(value);
			}

			if (parent.obj) {
				parent.obj[key] = parsedValue;
			}
			continue;
		}

		// 处理对象开始
		const objStartMatch = line.match(/^"([^"]+)"$/);
		if (objStartMatch && i + 1 < lines.length && lines[i + 1].trim() === '{') {
			const key = objStartMatch[1];
			const parent = stack[stack.length - 1];

			if (!rootKey) {
				rootKey = key;
			}

			const newObj = {};
			if (parent.obj) {
				parent.obj[key] = newObj;
			}

			stack.push({ obj: newObj, key });
			i++; // 跳过下一行的 {
			continue;
		}

		// 处理闭合括号
		if (line === '}') {
			if (stack.length > 1) {
				stack.pop();
			}
			continue;
		}

		// 处理独立的左括号
		if (line === '{') {
			continue;
		}
	}

	return { rootKey, data: current[rootKey] || current };
}

/**
 * 提取#base指令引用的文件路径
 * @param {string} content - KV文件内容
 * @returns {string[]} 引用的文件路径列表
 */
function extractBaseFiles(content) {
	const baseFiles = [];
	const lines = content.split('\n');

	for (const line of lines) {
		const trimmed = line.trim();
		// 匹配 #base "path/to/file.kv"
		const match = trimmed.match(/^#base\s+"([^"]+)"$/);
		if (match) {
			baseFiles.push(match[1]);
		}
	}

	return baseFiles;
}

/**
 * 深度合并对象
 * @param {object} target - 目标对象
 * @param {object} source - 源对象
 * @returns {object} 合并后的对象
 */
function deepMerge(target, source) {
	if (typeof source !== 'object' || source === null) {
		return source;
	}

	if (typeof target !== 'object' || target === null) {
		target = {};
	}

	for (const key of Object.keys(source)) {
		if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
			target[key] = deepMerge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	}

	return target;
}

/**
 * 解析KV文件，支持#base指令
 * @param {string} content - KV文件内容
 * @param {string} [filePath] - 文件路径（用于解析相对路径的#base）
 * @param {Set<string>} [processedFiles] - 已处理的文件集合（防止循环引用）
 * @returns {object} 解析后的对象
 */
function parseKV(content, filePath = null, processedFiles = new Set()) {
	// 提取#base引用
	const baseFiles = extractBaseFiles(content);

	// 先处理#base引用的文件
	let mergedData = {};
	let rootKey = null;

	if (filePath && baseFiles.length > 0) {
		const fileDir = path.dirname(filePath);

		for (const baseFile of baseFiles) {
			const basePath = path.resolve(fileDir, baseFile);

			// 防止循环引用
			if (processedFiles.has(basePath)) {
				console.warn(`Circular #base reference detected: ${basePath}`);
				continue;
			}

			if (!fs.existsSync(basePath)) {
				console.warn(`#base file not found: ${basePath}`);
				continue;
			}

			processedFiles.add(basePath);

			try {
				const baseContent = fs.readFileSync(basePath, 'utf-8');
				const baseResult = parseKV(baseContent, basePath, processedFiles);

				if (baseResult.data) {
					mergedData = deepMerge(mergedData, baseResult.data);
					if (!rootKey && baseResult.rootKey) {
						rootKey = baseResult.rootKey;
					}
				}
			} catch (error) {
				console.warn(`Failed to parse #base file ${basePath}:`, error.message);
			}
		}
	}

	// 解析当前文件内容
	const currentResult = parseKVContent(content);

	if (currentResult.data) {
		mergedData = deepMerge(mergedData, currentResult.data);
		if (!rootKey && currentResult.rootKey) {
			rootKey = currentResult.rootKey;
		}
	}

	return { rootKey, data: mergedData };
}

/**
 * 将对象转换为格式化的JavaScript代码
 * @param {object} obj - 要转换的对象
 * @param {number} indent - 缩进级别
 * @returns {string} 格式化的JavaScript代码
 */
function objToJS(obj, indent = 1) {
	if (typeof obj !== 'object' || obj === null) {
		return JSON.stringify(obj);
	}

	const tabs = '\t'.repeat(indent);
	const prevTabs = '\t'.repeat(indent - 1);
	const entries = Object.entries(obj);

	if (entries.length === 0) {
		return '{}';
	}

	let result = '{\n';
	entries.forEach(([key, value], index) => {
		const isLast = index === entries.length - 1;

		if (typeof value === 'object' && value !== null) {
			result += `${tabs}"${key}": ${objToJS(value, indent + 1)}${isLast ? '' : ','}\n`;
		} else if (typeof value === 'string') {
			result += `${tabs}"${key}": "${value}"${isLast ? '' : ','}\n`;
		} else {
			result += `${tabs}"${key}": ${value}${isLast ? '' : ','}\n`;
		}
	});
	result += `${prevTabs}}`;

	return result;
}

/**
 * 生成TypeScript类型定义
 * @param {object} obj - 对象
 * @param {string} typeName - 类型名称
 * @param {number} indent - 缩进级别
 * @returns {string} TypeScript接口定义
 */
function objToTSInterface(obj, typeName, indent = 0) {
	if (typeof obj !== 'object' || obj === null) {
		return typeof obj;
	}

	const tabs = '\t'.repeat(indent);
	const entries = Object.entries(obj);

	// 检查是否所有值都是相同结构（用于Record类型）
	const firstValue = entries[0]?.[1];
	const allSameStructure = entries.length > 1 && entries.every(([, value]) => {
		if (typeof value !== 'object' || typeof firstValue !== 'object') {
			return typeof value === typeof firstValue;
		}
		// 对于对象，检查键是否大致相同
		const keys1 = Object.keys(value || {});
		const keys2 = Object.keys(firstValue || {});
		return keys1.length === keys2.length;
	});

	// 如果所有值结构相同且有多个条目，生成Record类型
	if (allSameStructure && typeof firstValue === 'object' && firstValue !== null) {
		return `Record<string, ${typeName}Item>`;
	}

	// 生成完整接口
	let result = `{\n`;
	entries.forEach(([key, value]) => {
		const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
		if (typeof value === 'object' && value !== null) {
			const nestedInterface = objToTSInterface(value, typeName + '_' + key.replace(/[^a-zA-Z0-9_]/g, '_'), indent + 1);
			result += `${tabs}\t${safeKey}: ${nestedInterface};\n`;
		} else if (typeof value === 'string') {
			result += `${tabs}\t${safeKey}: string;\n`;
		} else if (typeof value === 'number') {
			result += `${tabs}\t${safeKey}: number;\n`;
		} else if (typeof value === 'boolean') {
			result += `${tabs}\t${safeKey}: boolean;\n`;
		}
	});
	result += `${tabs}}`;

	return result;
}

/**
 * 生成完整的TypeScript定义文件内容
 * @param {Array<{name: string, data: object}>} kvDataList - KV数据列表
 * @returns {string} TypeScript定义文件内容
 */
function generateTSDefinition(kvDataList) {
	let result = '/** Auto-generated KV type definitions */\n\n';

	// 首先生成所有Item接口
	const interfacesMap = new Map();

	kvDataList.forEach(({ name, data }) => {
		const typeName = name.charAt(0).toUpperCase() + name.slice(1) + 'KV';

		// 检查数据结构
		const entries = Object.entries(data || {});
		if (entries.length > 0) {
			const firstValue = entries[0][1];

			// 检查是否所有值都是对象（Record类型的候选）
			if (typeof firstValue === 'object' && firstValue !== null) {
				// 收集所有可能的属性
				const allKeys = new Set();
				const propertyTypes = new Map();

				entries.forEach(([, value]) => {
					if (typeof value === 'object' && value !== null) {
						Object.entries(value).forEach(([key, propValue]) => {
							allKeys.add(key);
							if (!propertyTypes.has(key)) {
								propertyTypes.set(key, typeof propValue);
							}
						});
					}
				});

				// 生成Item接口，所有属性都是可选的
				const itemTypeName = typeName + 'Item';
				let itemInterface = `interface ${itemTypeName} {\n	[k:string]: any;\n`;

				Array.from(allKeys).sort().forEach(key => {
					const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
					const propType = propertyTypes.get(key);

					let typeStr = 'any';
					if (propType === 'string') {
						typeStr = 'string';
					} else if (propType === 'number') {
						typeStr = 'number';
					} else if (propType === 'boolean') {
						typeStr = 'boolean';
					}

					// 所有属性都标记为可选，因为不同条目可能有不同的属性
					itemInterface += `\t${safeKey}?: ${typeStr};\n`;
				});

				itemInterface += `}\n`;
				interfacesMap.set(itemTypeName, itemInterface);
			}
		}
	});

	// 输出所有接口
	interfacesMap.forEach(interfaceCode => {
		result += interfaceCode + '\n';
	});

	// 生成CustomUIConfig扩展
	result += 'declare global {\n';
	result += '\tinterface CustomUIConfig {\n';

	kvDataList.forEach(({ name, data }) => {
		const typeName = name.charAt(0).toUpperCase() + name.slice(1) + 'KV';
		// 检查是否生成了Item接口
		const itemTypeName = typeName + 'Item';
		if (interfacesMap.has(itemTypeName)) {
			result += `\t\t${name}: Record<string, ${itemTypeName}>;\n`;
		} else {
			// 简单类型或空对象
			const typeRef = objToTSInterface(data, typeName, 2);
			result += `\t\t${name}: ${typeRef};\n`;
		}
	});

	result += '\t}\n';
	result += '}\n\n';
	result += 'export {};\n';

	return result;
}

module.exports = {
	parseKV,
	parseKVContent,
	extractBaseFiles,
	deepMerge,
	objToJS,
	objToTSInterface,
	generateTSDefinition
};
