const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { getAddonPaths } = require('./get-addon-name');

/**
 * 写入KV格式文件
 */
function writeKeyValue(obj, depth = 0, tab = 12) {
	const os = require('os');
	var str = '';
	if (obj === null || obj === undefined) {
		return str;
	}
	// 添加制表符
	function addDepthTab(depth, addString) {
		var tab = '';
		for (let d = 0; d < depth; d++) {
			tab += '\t';
		}
		tab += addString;
		return tab;
	}
	// 添加key与value之间制表符
	function addIntervalTab(depth, key, nTab = 12) {
		var tab = '';
		for (let d = 0; d < nTab - Math.floor((depth * 4 + key.length + 2) / 4); d++) {
			tab += '\t';
		}
		return tab;
	}
	let keys = Object.keys(obj).sort(function (a, b) { return Number(a) - Number(b); });
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		const value = obj[key];
		if (value === undefined || value === null || (typeof (value) === "object" && Object.keys(value).length === 0)) {
		} else if (typeof (value) === 'string' || typeof (value) === 'number') {
			str += addDepthTab(depth, '"' + key + '"');
			str += addIntervalTab(depth, key, tab);
			str += '"' + value + '"' + os.EOL;
		} else {
			str += addDepthTab(depth, '"' + key + '"' + os.EOL);
			str += addDepthTab(depth, '{' + os.EOL);
			str += writeKeyValue(value, depth + 1);
			str += addDepthTab(depth, '}' + os.EOL);
		}
	}
	return str;
}

/**
 * 加载配置规则
 */
function loadConfigureRules() {
	const rulesPath = path.join(__dirname, 'configure-rules.json');
	if (fs.existsSync(rulesPath)) {
		const rulesData = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
		return rulesData;
	}
	console.warn('Configure rules file not found, using default behavior');
	return { rules: {} };
}

/**
 * 解析分隔符配置
 */
function parseSpliterConfig(config) {

	if (config == null || config === undefined) {
		return null;
	}
	if (Array.isArray(config)) {
		return { separator: config[0], connector: config[1] };
	}

	if (typeof config === 'string') {
		if (config.length === 2) {
			return { separator: config[0], connector: config[1] };
		}
		return { separator: config };
	}

	return null;
}

/**
 * 解析键值对字符串
 */
function parseKeyValueString(str, separator, connector) {
	if (connector) {
		// 双分隔符模式：按分隔符分割，每对再按连接符分割
		const result = str.split(separator).map(pair => {
			const [key, value] = pair.split(connector);
			return [
				key?.trim() || '',
				value === undefined ? '' : (isNaN(Number(value)) ? value.trim() : Number(value))
			];
		});
		return result;
	} else {
		// 单分隔符模式：分割后两两配对
		const parts = str.split(separator).filter(p => p.trim());
		const result = [];

		for (let i = 0; i < parts.length; i += 2) {
			const key = parts[i].trim();
			const value = i + 1 < parts.length ? parts[i + 1].trim() : '';
			result.push([key, value === '' ? true : (isNaN(Number(value)) ? value : Number(value))]);
		}

		return result;
	}
}

/**
 * 处理分隔符规则
 */
function processSpliterRules(data, spliterRules) {
	if (!spliterRules) return data;

	const keys = Object.keys(spliterRules);

	function processObject(obj) {
		for (const key in obj) {
			if (keys.includes(key)) {
				const value = obj[key];
				if (!value && value !== 0) {
					obj[key] = {};
				} else {
					const config = parseSpliterConfig(spliterRules[key]);
					if (config) {
						const pairs = parseKeyValueString(String(value), config.separator, config.connector);
						obj[key] = Object.fromEntries(pairs);
					}
				}
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				processObject(obj[key]);
			}
		}
	}

	processObject(data);
	return data;
}

/**
 * 处理数组分隔符规则
 */
function processArraySpliterRules(data, arraySpliterRules) {
	if (!arraySpliterRules) return data;

	const splitString = (str, separator) => Object.fromEntries(
		str.split(separator)
			.map(v => v.trim())
			.filter(v => v)
			.map((v, i) => [i + 1, isNaN(Number(v)) ? v : Number(v)])
	);

	data.forEach(row => {
		for (const [key, separator] of Object.entries(arraySpliterRules)) {
			const value = row[key];
			if (Array.isArray(value)) {
				row[key] = value.map(v =>
					typeof v === "string" && v.trim() ? splitString(v, separator) : v
				);
			} else if (typeof value === "string" && value.trim()) {
				row[key] = splitString(value, separator);
			} else {
				delete row[key];
			}
		}
	});

	return data;
}

/**
 * 处理树形结构规则
 */
function processTreeStructure(data, treeKeys, keyWhitelist) {
	if (!treeKeys?.length) return data;

	const result = {};

	data.forEach(row => {
		let current = result;

		// 构建树形路径
		for (const key of treeKeys) {
			const value = row[key];
			if (!value && value !== 0) return;

			current[value] = current[value] || {};
			current = current[value];
		}

		// 添加数据到叶子节点
		const keysToAdd = keyWhitelist || Object.keys(row).filter(k => !treeKeys.includes(k));
		keysToAdd.forEach(k => {
			current[k] = row[k];
		});
	});

	return result;
}

/**
 * 应用配置规则处理数据
 */
function applyConfigureRules(data, fileName, rules) {
	const rule = rules[fileName] || {};

	// 如果数据是数组格式（新的处理方式）
	if (Array.isArray(data)) {
		const mainKey = rule.main_key || Object.keys(data[0])[0];

		// 处理 array_data 配置：将相同主键的数据收集到数组中
		if (rule.array_data === "true") {
			const result = {};
			data.forEach(row => {
				const id = row[mainKey];
				if (id == null) return;

				let processedData = { ...row };

				// 应用键白名单
				if (rule.key_whitelist) {
					processedData = {};
					rule.key_whitelist.forEach(k => {
						if (row[k] !== undefined) {
							processedData[k] = row[k];
						}
					});
				}

				// 将相同主键的数据收集到数组中
				if (!result[id]) {
					result[id] = [];
				}
				result[id].push(processedData);
			});

			// 处理分隔符
			if (rule.spliter) {
				for (const id in result) {
					result[id].forEach(row => {
						for (const key of Object.keys(rule.spliter)) {
							if (row[key]) {
								const config = parseSpliterConfig(rule.spliter[key]);
								if (config) {
									const pairs = parseKeyValueString(String(row[key]), config.separator, config.connector);
									row[key] = Object.fromEntries(pairs);
								}
							}
						}
					});
				}
			}

			return result;
		}

		// 处理树形结构
		if (rule.tree_keys) {
			const treeResult = processTreeStructure(data, rule.tree_keys, rule.key_whitelist);
			// 处理分隔符（树形结构也需要应用 spliter）
			if (rule.spliter) {
				processSpliterRules(treeResult, rule.spliter);
			}
			return treeResult;
		}

		// 处理数组分隔符
		if (rule.array_spliter) {
			processArraySpliterRules(data, rule.array_spliter);
		}

		// 处理普通结构：将数组转换为对象（后面的覆盖前面的）
		const result = {};
		data.forEach(row => {
			const id = row[mainKey];
			if (id == null) return;

			let processedData = { ...row };

			// 应用键白名单
			if (rule.key_whitelist) {
				processedData = {};
				rule.key_whitelist.forEach(k => {
					processedData[k] = row[k];
				});
			}

			if (rule.secondary_key) {
				result[id] = result[id] || {};
				const secondaryKey = row[rule.secondary_key];
				if (secondaryKey != null) {
					delete processedData[rule.secondary_key];
					delete processedData[mainKey];
					result[id][secondaryKey] = processedData;
				} else {
					console.warn(`Warning: Secondary key is empty for main key ${id} in ${fileName}`);
				}
			} else {
				result[id] = processedData;
			}
		});

		// 处理分隔符
		if (rule.spliter) {
			processSpliterRules(result, rule.spliter);
		}

		return result;
	}

	// 兼容旧代码：如果数据已经是对象格式
	const dataArray = Object.values(data);

	// 处理数组分隔符
	if (rule.array_spliter) {
		processArraySpliterRules(dataArray, rule.array_spliter);
	}

	// 处理树形结构
	if (rule.tree_keys) {
		const treeResult = processTreeStructure(dataArray, rule.tree_keys, rule.key_whitelist);
		// 处理分隔符（树形结构也需要应用 spliter）
		if (rule.spliter) {
			processSpliterRules(treeResult, rule.spliter);
		}
		return treeResult;
	}

	// 处理普通结构
	const mainKey = rule.main_key || Object.keys(data[Object.keys(data)[0]])[0];

	const result = {};
	dataArray.forEach(row => {
		const id = row[mainKey];
		if (id == null) return;

		let processedData;

		// 应用键白名单
		if (rule.key_whitelist) {
			processedData = {};
			rule.key_whitelist.forEach(k => {
				processedData[k] = row[k];
			});
		} else {
			processedData = { ...row };
		}

		if (rule.secondary_key) {
			result[id] = result[id] || {};
			const secondaryKey = row[rule.secondary_key];
			if (secondaryKey != null) {
				delete processedData[rule.secondary_key];
				delete processedData[mainKey];
				result[id][secondaryKey] = processedData;
			} else {
				console.warn(`Warning: Secondary key is empty for main key ${id} in ${fileName}`);
			}
		} else {
			result[id] = processedData;
		}
	});

	// 处理分隔符
	if (rule.spliter) {
		processSpliterRules(result, rule.spliter);
	}

	return result;
}

/**
 * 遍历文件夹获取所有 xlsx 文件
 */
function getAllXlsxFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);

	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			getAllXlsxFiles(filePath, fileList);
		} else if (file.endsWith('.xlsx') && !file.startsWith('~$')) {
			fileList.push(filePath);
		}
	});

	return fileList;
}

/**
 * 解析数据类型
 */
function parseValue(value, type) {
	if (value === null || value === undefined || value === '') {
		return null;
	}

	const typeStr = String(type).toLowerCase();

	if (typeStr === 'int' || typeStr === 'int64') {
		return parseInt(value);
	} else if (typeStr === 'float') {
		return parseFloat(value);
	} else if (typeStr === 'string') {
		return String(value);
	} else if (typeStr === 'bool') {
		return Boolean(value);
	}

	// 默认返回原始值
	return value;
}

/**
 * 将数据类型转换为 Go 类型
 */
function toGoType(type) {
	const typeStr = String(type).toLowerCase();

	if (typeStr === 'int' || typeStr === 'int64') {
		return 'int64';
	} else if (typeStr === 'float' || typeStr === 'float64') {
		return 'float64';
	} else if (typeStr === 'bool') {
		return 'bool';
	} else {
		return 'string';
	}
}

/**
 * 将下划线命名转换为大驼峰命名
 * 例如: equip_main_pool -> EquipMainPool
 */
function toPascalCase(str) {
	return str.split('_').map(word =>
		word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	).join('');
}

/**
 * 生成 Go 结构体定义文件
 */
function generateGoModelFile(fileName, keysRow, typesRow, descriptionsRow, serverFlagsRow, outputPath) {
	const structName = toPascalCase(fileName);
	let goContent = `package info_model\n\n`;
	goContent += `type ${structName} struct {\n`;

	keysRow.forEach((key, index) => {
		if (!key || key === null || key === undefined || key === '') return;
		if (serverFlagsRow[index] != "server") return;

		const fieldName = toPascalCase(key);
		const goType = toGoType(typesRow[index]);
		const description = descriptionsRow[index] || '';
		const jsonTag = key;
		// const jsonTag = index === 0 ? 'id' : key; // 第一列作为 id

		let line = `\t${fieldName} ${goType} \`json:"${jsonTag}" csv:"${key},omitempty"\``;
		if (description) {
			line += ` // ${description}`;
		}
		goContent += line + '\n';
	});

	goContent += `}\n\n`;
	goContent += `func(${structName}) TableName() string {\n`;
	goContent += `\treturn "${fileName}"\n`;
	goContent += `}\n`;

	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, goContent, 'utf-8');
	console.log(`  ✓ Generated: ${fileName}.go`);
}

/**
 * 将对象转换为 JS 字符串（类似 plugin-kv.ts 的 objToJS）
 */
function objToJS(obj, indent = 1) {
	const indentStr = '\t'.repeat(indent);
	const prevIndentStr = '\t'.repeat(indent - 1);

	if (obj === null || obj === undefined) {
		return 'null';
	}

	if (typeof obj === 'string') {
		const normalized = obj
			.replace(/\r\n|\n|\r/g, '<br>')
			.replace(/\\/g, '\\\\')
			.replace(/"/g, '\\"');
		return `"${normalized}"`;
	}

	if (typeof obj === 'number' || typeof obj === 'boolean') {
		return String(obj);
	}

	if (Array.isArray(obj)) {
		if (obj.length === 0) return '[]';
		const items = obj.map(item => `${indentStr}${objToJS(item, indent + 1)}`).join(',\n');
		return `[\n${items}\n${prevIndentStr}]`;
	}

	if (typeof obj === 'object') {
		// 过滤掉 null 值
		const entries = Object.entries(obj).filter(([_, v]) => v !== null);
		if (entries.length === 0) return '{}';

		const items = entries.map(([key, value]) => {
			const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
			return `${indentStr}${keyStr}: ${objToJS(value, indent + 1)}`;
		}).join(',\n');

		return `{\n${items}\n${prevIndentStr}}`;
	}

	return String(obj);
}

/**
 * 处理单个 xlsx 文件
 */
function processXlsxFile(filePath, outputDir, goModelDir, rules) {
	const workbook = XLSX.readFile(filePath);
	const fileName = path.basename(filePath, '.xlsx');
	// 获取规则中配置的输出文件名(仅用于JS和KV文件)，如果没有则使用原文件名
	const rule = rules[fileName] || {};
	const outputFileName = rule.output_name || fileName;
	const allData = {};
	const allMetadata = {}; // 存储字段元数据（描述等）

	console.log(`Processing: ${fileName}${rule.output_name ? ' -> ' + outputFileName : ''}`);

	// 遍历所有工作表
	workbook.SheetNames.forEach(sheetName => {
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

		if (jsonData.length < 5) {
			console.warn(`  Sheet "${sheetName}" has less than 5 rows, skipping...`);
			return;
		}

		const keys = jsonData[0]; // 第1行：字段名
		const types = jsonData[1]; // 第2行：数据类型
		const descriptions = jsonData[2]; // 第3行：描述
		const serverFlags = jsonData[3]; // 第4行：服务端标记

		// 第5行开始是数据
		const dataRows = jsonData.slice(4);

		// 获取当前文件/工作表的规则，用于 column_array 支持
		const ruleKey = workbook.SheetNames.length === 1 ? fileName : sheetName;
		const currentRule = rules[ruleKey] || {};
		const columnArrayFields = currentRule.column_array || [];

		// 收集所有行数据到数组中
		const allRows = [];

		dataRows.forEach((row, rowIndex) => {
			if (!row || row.length === 0 || row.every(cell => cell === null || cell === '')) {
				return; // 跳过空行
			}

			const rowData = {};
			const primaryKey = String(row[0]); // 第一列作为主键

			// 主键为空时抛出异常
			if (!primaryKey || primaryKey === 'null' || primaryKey === '') {
				throw new Error(`配置文件 ${fileName} 工作表 ${sheetName} 第 ${rowIndex + 5} 行主键为空，请检查配置文件`);
			}

			keys.forEach((key, colIndex) => {
				if (!key) return; // 只跳过空列，不跳过主键列

				const value = row[colIndex];
				const type = types[colIndex];
				const parsedValue = parseValue(value, type);

				if (parsedValue !== null) {
					if (columnArrayFields.includes(key)) {
						if (!rowData[key]) rowData[key] = [];
						rowData[key].push(parsedValue);
					} else {
						rowData[key] = parsedValue;
					}
				}
			});

			if (Object.keys(rowData).length > 0) {
				allRows.push(rowData);
			}
		});

		if (allRows.length > 0) {
			allData[sheetName] = allRows;

			// 保存字段元数据
			const metadata = {};
			keys.forEach((key, index) => {
				if (key && key !== null && key !== undefined && key !== '') {
					metadata[key] = {
						type: types[index],
						description: descriptions[index] || ''
					};
				}
			});
			// 保存keys到metadata中，用于类型生成
			metadata._keys = keys;
			allMetadata[sheetName] = metadata;
		}

		// 生成 Go 模型文件（每个工作表一个文件）
		const modelName = workbook.SheetNames.length === 1 ? fileName : sheetName;
		const goOutputPath = path.join(goModelDir, `${modelName}.go`);
		generateGoModelFile(modelName, keys, types, descriptions, serverFlags, goOutputPath);
	});

	// 生成 JS 文件
	if (Object.keys(allData).length > 0) {
		// 如果只有一个工作表，直接导出该工作表的数据
		let exportData = workbook.SheetNames.length === 1
			? allData[workbook.SheetNames[0]]
			: allData;

		const exportMetadata = workbook.SheetNames.length === 1
			? allMetadata[workbook.SheetNames[0]]
			: allMetadata;

		// 应用配置规则处理数据
		if (workbook.SheetNames.length === 1) {
			const rule = rules[fileName];
			if (rule) {
				console.log(`  📋 Applying rules for ${fileName}: ${rule.description || 'No description'}`);
			}
			// 即使没有规则也要处理，确保数组转换为对象
			exportData = applyConfigureRules(exportData, fileName, rules);
		} else {
			// 多工作表时逐个应用规则
			exportData = {};
			for (const sheetName of workbook.SheetNames) {
				const sheetData = allData[sheetName];
				const rule = rules[sheetName];
				if (rule) {
					console.log(`  📋 Applying rules for ${sheetName}: ${rule.description || 'No description'}`);
				}
				// 即使没有规则也要处理，确保数组转换为对象
				exportData[sheetName] = applyConfigureRules(sheetData, sheetName, rules);
			}
		}

		// 生成 JS 文件（使用 outputFileName 作为文件名，但使用 fileName 作为全局变量名）
		const jsContent = `GameUI.CustomUIConfig().${outputFileName} = ${objToJS(exportData)};\n`;
		const jsOutputPath = path.join(outputDir, `${outputFileName}.js`);

		fs.mkdirSync(path.dirname(jsOutputPath), { recursive: true });
		fs.writeFileSync(jsOutputPath, jsContent, 'utf-8');

		console.log(`  ✓ Generated: ${outputFileName}.js`);

		// 检查是否需要导出KV文件
		let shouldExportKV = false;
		if (workbook.SheetNames.length === 1) {
			const rule = rules[fileName];
			if (rule && rule.export_kv === true) {
				shouldExportKV = true;
			}
		} else {
			// 多工作表时，检查是否有任何工作表需要导出KV
			for (const sheetName of workbook.SheetNames) {
				const rule = rules[sheetName];
				if (rule && rule.export_kv === true) {
					shouldExportKV = true;
					break;
				}
			}
		}

		// 导出KV文件
		if (shouldExportKV) {
			const paths = getAddonPaths();
			const kvOutputPath = path.join(process.cwd(), 'game', paths.addonName, 'scripts', 'npc', 'service');
			fs.mkdirSync(kvOutputPath, { recursive: true });
			const kvFilePath = path.join(kvOutputPath, `${outputFileName}.kv`);
			fs.writeFileSync(kvFilePath, writeKeyValue({ KeyValue: exportData }), 'utf8');
			console.log(`  ✓ Generated: ${outputFileName}.kv`);
		}

		return { name: fileName, data: exportData, metadata: exportMetadata, sheets: workbook.SheetNames };
	}

	return null;
}

/**
 * 推断字段类型
 */
function inferFieldType(fieldName, value, rule) {
	// 1. 优先使用字段类型自定义配置
	if (rule && rule.field_types && rule.field_types[fieldName]) {
		return rule.field_types[fieldName];
	}

	// 2. 根据实际值推断类型
	if (value === null || value === undefined) {
		return 'string'; // 默认为字符串类型
	}

	if (typeof value === 'object') {
		return 'object';
	}
	return typeof value === 'number' ? 'number' :
		typeof value === 'boolean' ? 'boolean' : 'string';
}

/**
 * 从（可能是 tree_keys 生成的）嵌套数据结构中，递归找到某字段的第一个有效值
 * 例如: { collection: { "0": { level_cost: 1 } } } -> key=level_cost => 1
 */
function findFirstValueForKey(data, key, maxDepth = 8) {
	function inner(node, depth) {
		if (node === null || node === undefined) return undefined;
		if (depth > maxDepth) return undefined;

		if (Array.isArray(node)) {
			for (let i = 0; i < node.length; i++) {
				const v = inner(node[i], depth + 1);
				if (v !== undefined && v !== null) return v;
			}
			return undefined;
		}

		if (typeof node !== 'object') {
			return undefined;
		}

		if (Object.prototype.hasOwnProperty.call(node, key)) {
			const val = node[key];
			if (val !== undefined && val !== null) return val;
		}

		const values = Object.values(node);
		for (let i = 0; i < values.length; i++) {
			const v = inner(values[i], depth + 1);
			if (v !== undefined && v !== null) return v;
		}
		return undefined;
	}

	return inner(data, 0);
}

function excelTypeToTS(excelType) {
	if (!excelType) return 'string';
	const t = String(excelType).toLowerCase();
	if (t === 'int' || t === 'int64' || t === 'float' || t === 'float64') return 'number';
	if (t === 'bool') return 'boolean';
	return 'string';
}

/**
 * 生成 TypeScript 定义文件
 */
function generateTSDefinition(configList, rules) {
	let tsContent = `// Auto-generated TypeScript definitions for Configure files
//
// 注意：
// 1. 所有配置的类型定义都在这个文件中
// 2. service/ 目录下的 KV 文件是从 Excel 生成的，仅用于服务端
//    前端直接使用 Excel→JS 的配置（configure/ 目录）
// 3. game/<addon_name>/scripts/npc/service/ 目录不参与前端 KV→JS 转换
// 4. kv.d.ts 只包含游戏引擎原生 KV 的类型定义
//
`;

	let rowTypesContent = '';
	configList.forEach(({ name, data, metadata, sheets }) => {
		// 如果有多个工作表，按工作表生成类型
		if (sheets && sheets.length > 1) {
			sheets.forEach(sheetName => {
				const sheetData = data[sheetName];
				const sheetMetadata = metadata[sheetName];
				if (!sheetData) return;

				// 获取自定义类型名
				const sheetRule = rules[sheetName] || {};
				const rowTypeName = sheetRule.ts_row_name || `${capitalize(sheetName)}Row`;

				rowTypesContent += `\tinterface ${rowTypeName} {\n`;

				// 生成接口字段
				const generateInterfaceFields = (metadata, data, rule) => {
					const keys = metadata._keys || Object.keys(data[Object.keys(data)[0]] || []);
					const columnArrayFields = rule.column_array || [];
					const seenColumnArrayKeys = new Set();
					let fieldsContent = '';

					keys.forEach((key, index) => {
						if (!key) return; // 跳过空列

						if (columnArrayFields.includes(key)) {
							if (seenColumnArrayKeys.has(key)) return;
							seenColumnArrayKeys.add(key);
							const description = metadata[key] ? metadata[key].description : '';
							const elemType = (rule.field_types && rule.field_types[key]) || excelTypeToTS(metadata[key] && metadata[key].type);
							if (description) {
								fieldsContent += `\t/** ${description} */\n`;
							}
							fieldsContent += `\t${key}: ${elemType}[];\n`;
							return;
						}

						const description = metadata[key] ? metadata[key].description : '';
						// 从（可能嵌套的）数据中获取类型推断参考值
						const refValue = findFirstValueForKey(data, key);

						const type = inferFieldType(key, refValue, rule);
						// 主键字段或第一个字段为必需，其余为可选
						const isRequired = index === 0 || key === rule.main_key;
						if (description) {
							fieldsContent += `\t/** ${description} */\n`;
						}
						fieldsContent += `\t${key}: ${type};\n`;
					});

					return fieldsContent;
				};

				rowTypesContent += `\tinterface ${rowTypeName} {\n`;
				rowTypesContent += generateInterfaceFields(sheetMetadata, sheetData, sheetRule);
				rowTypesContent += `\t}\n\n`;
			});

			// 获取主配置类型名
			const mainRule = rules[name] || {};
			const outputName = mainRule.output_name || name;
			const configTypeName = mainRule.ts_config_name || `${capitalize(outputName)}`;

			rowTypesContent += `\tinterface ${configTypeName} {\n`;
			sheets.forEach(sheetName => {
				const sheetRule = rules[sheetName] || {};
				const sheetRowTypeName = sheetRule.ts_row_name || `${capitalize(sheetName)}Row`;
				// 检查是否为数组数据
				const isArray = sheetRule.array_data === "true";
				rowTypesContent += `\t\t${sheetName}?: Record<string, ${isArray ? sheetRowTypeName + '[]' : sheetRowTypeName}>;\n`;
			});
			rowTypesContent += `\t}\n\n`;
		} else {
			// 单个工作表，直接生成行类型
			// 获取自定义类型名
			const rule = rules[name] || {};
			const outputName = rule.output_name || name;
			const rowTypeName = rule.ts_row_name || `${capitalize(outputName)}Row`;
			const columnArrayFields = rule.column_array || [];

			rowTypesContent += `\tinterface ${rowTypeName} {\n`;

			// 基于表头生成所有字段的类型声明，而不仅仅基于第一个数据行
			// data 现在可能是数组或对象
			const firstRow = Array.isArray(data) ? data[0] : data[Object.keys(data)[0]];
			const keys = metadata._keys || Object.keys(firstRow || []);
			const seenColumnArrayKeys = new Set();
			keys.forEach((key, index) => {
				if (!key) return; // 跳过空列

				if (columnArrayFields.includes(key)) {
					if (seenColumnArrayKeys.has(key)) return;
					seenColumnArrayKeys.add(key);
					const description = metadata[key] ? metadata[key].description : '';
					const elemType = (rule.field_types && rule.field_types[key]) || excelTypeToTS(metadata[key] && metadata[key].type);
					if (description) {
						rowTypesContent += `\t\t/** ${description} */\n`;
					}
					rowTypesContent += `\t\t${key}: ${elemType}[];\n`;
					return;
				}

				const description = metadata[key] ? metadata[key].description : '';
				// 从（可能嵌套的）数据中获取类型推断参考值
				const refValue = findFirstValueForKey(data, key);

				const type = inferFieldType(key, refValue, rule);
				// 主键字段或第一个字段为必需，其余为可选
				const isRequired = index === 0 || key === rule.main_key;
				if (description) {
					rowTypesContent += `\t\t/** ${description} */\n`;
				}
				rowTypesContent += `\t\t${key}: ${type};\n`;
			});
			rowTypesContent += `\t}\n\n`;

			const configTypeName = rule.ts_config_name || `${capitalize(outputName)}`;
			// 检查是否为数组数据
			const isArray = rule.array_data === "true";
			rowTypesContent += `\ttype ${configTypeName} = Record<string, ${isArray ? rowTypeName + '[]' : rowTypeName}>;\n\n`;
		}
	});

	// 生成全局声明
	tsContent += `declare global {\n`;
	tsContent += rowTypesContent;
	tsContent += `\tinterface CustomUIConfig {\n`;
	configList.forEach(({ name }) => {
		// 获取自定义配置类型名
		const rule = rules[name] || {};
		const outputName = rule.output_name || name;
		const configTypeName = rule.ts_config_name || `${capitalize(outputName)}`;
		// tree_keys 会把数据转换为多层 Record，需要按层数包装类型
		const treeDepth = Array.isArray(rule.tree_keys) ? rule.tree_keys.length : 0;
		let propertyType = configTypeName;
		if (treeDepth > 1) {
			for (let i = 1; i < treeDepth; i++) {
				propertyType = `Record<string, ${propertyType}>`;
			}
		}
		tsContent += `\t\t${outputName}: ${propertyType};\n`;
	});
	tsContent += `\t}\n`;
	tsContent += `}\n\n`;
	tsContent += `export {};\n`;

	return tsContent;
}

/**
 * 生成 apollo_configure.txt 文件
 */
function generateApolloConfigureTxt(xlsxFiles, outputPath) {
	const fileLines = []; // 每个文件一行

	xlsxFiles.forEach(filePath => {
		const workbook = XLSX.readFile(filePath);
		const fileName = path.basename(filePath, '.xlsx');
		let fileLine = ''; // 当前文件的所有内容

		workbook.SheetNames.forEach((sheetName, sheetIndex) => {
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

			if (jsonData.length < 5) return;

			const keysRow = jsonData[0]; // 第1行：字段名
			const serverFlags = jsonData[3]; // 第4行：服务端标记
			const dataRows = jsonData.slice(4); // 第5行开始是数据

			// 过滤出有效的列索引（字段名不为空）
			const validColumnIndices = [];
			const validKeys = [];
			keysRow.forEach((key, index) => {
				if (serverFlags[index] != "server") return;
				if (key !== null && key !== undefined && key !== '') {
					validColumnIndices.push(index);
					validKeys.push(key);
				}
			});

			if (validKeys.length === 0) return;

			// 过滤出有效的数据行（主键不为空）
			const validDataRows = dataRows.filter(row =>
				row && row.length > 0 && row[0] !== null && row[0] !== '' && row[0] !== undefined
			);

			if (validDataRows.length === 0) return;

			// 如果只有一个工作表，使用文件名作为表名，否则使用工作表名
			const tableName = workbook.SheetNames.length === 1 ? fileName : sheetName;

			// 表名 = 表头
			fileLine += `${tableName} = ${validKeys.join(',')}\\n`;

			// 数据行
			validDataRows.forEach(row => {
				// 只输出有效列的数据
				const rowData = validColumnIndices.map(colIndex => {
					const value = row[colIndex];
					return value !== null && value !== undefined ? String(value) : '';
				});
				fileLine += `${rowData.join(',')}\\n`;
			});
		});

		// 移除当前文件最后一个 \n
		if (fileLine.endsWith('\\n')) {
			fileLine = fileLine.slice(0, -2);
		}

		if (fileLine) {
			fileLines.push(fileLine);
		}
	});

	// 用实际换行符连接所有文件
	const txtContent = fileLines.join('\n');

	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, txtContent, 'utf-8');
	console.log(`✓ Generated: apollo_configure.txt`);
}

/**
 * 首字母大写
 */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 主函数
 */
function main() {
	console.log('🔨 Generating Configure files from XLSX...\n');

	// 加载配置规则
	const { rules } = loadConfigureRules();
	console.log('📋 Configure rules loaded');

	const paths = getAddonPaths();
	const configureRoot = path.join(process.cwd(), 'configure');
	const outputDir = path.join(paths.contentRoot, 'panorama', 'scripts', 'custom_game', 'configure');
	const tsDefinitionPath = path.join(process.cwd(), 'src', 'declarations', 'configure.d.ts');
	const apolloTxtPath = path.join(configureRoot, 'apollo_configure.txt');
	const goModelDir = path.join(configureRoot, 'info_model');

	// 检查 configure 文件夹是否存在
	if (!fs.existsSync(configureRoot)) {
		console.error('❌ Configure folder not found:', configureRoot);
		return;
	}

	// 删除info_model下所有.go文件
	if (fs.existsSync(goModelDir)) {
		fs.rmSync(goModelDir, { recursive: true, force: true });
		fs.mkdirSync(goModelDir);
	}

	// 获取所有 xlsx 文件
	const xlsxFiles = getAllXlsxFiles(configureRoot);

	if (xlsxFiles.length === 0) {
		console.warn('⚠️  No XLSX files found in configure folder');
		return;
	}

	console.log(`Found ${xlsxFiles.length} XLSX file(s):\n`);

	// 处理所有 xlsx 文件
	const configList = [];
	xlsxFiles.forEach(filePath => {
		try {
			const result = processXlsxFile(filePath, outputDir, goModelDir, rules);
			if (result) {
				configList.push(result);
			}
		} catch (error) {
			console.error(`❌ 处理文件失败: ${filePath}`);
			console.error(`   错误信息: ${error.message}`);
			process.exit(1); // 遇到错误时退出程序
		}
	});

	// 生成 TypeScript 定义文件
	if (configList.length > 0) {
		const tsContent = generateTSDefinition(configList, rules);
		fs.mkdirSync(path.dirname(tsDefinitionPath), { recursive: true });
		fs.writeFileSync(tsDefinitionPath, tsContent, 'utf-8');
		console.log(`\n✓ Generated: configure.d.ts`);
	}

	// 生成 apollo_configure.txt
	generateApolloConfigureTxt(xlsxFiles, apolloTxtPath);

	console.log(`\n✅ Configure generation completed!`);
}

// 执行
main();
