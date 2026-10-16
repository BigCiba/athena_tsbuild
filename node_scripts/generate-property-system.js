const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const packageJson = require(path.join(ROOT_DIR, 'package.json'));
const PROJECT_NAME = packageJson.name;

// TypeScript reload 防抖（跨进程）
const TS_RELOAD_DEBOUNCE_FILE = path.join(ROOT_DIR, 'node_modules', '.ts-reloadProjects.debounce');
const TS_RELOAD_DEBOUNCE_MS = Number(process.env.TS_RELOAD_DEBOUNCE_MS || 2000);

/**
 * 解析 KV 文件
 * @param {string} content - KV 文件内容
 * @returns {Object} 解析后的对象
 */
function parseKV(content) {
	const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));
	const root = {};
	const stack = [root];
	let current = root;
	let i = 0;

	while (i < lines.length) {
		const trimmed = lines[i];

		// 跳过 "KeyValue" 顶层标记
		if (trimmed === '"KeyValue"') {
			i++;
			continue;
		}

		// 处理对象开始 "{" 
		if (trimmed === '{') {
			i++;
			continue;
		}

		// 处理对象结束
		if (trimmed === '}') {
			stack.pop();
			current = stack[stack.length - 1];
			i++;
			continue;
		}

		// 处理键值对: "key" "value"
		const kvMatch = trimmed.match(/^"([^"]+)"\s+"([^"]*)"$/);
		if (kvMatch) {
			const [, key, value] = kvMatch;
			current[key] = value;
			i++;
			continue;
		}

		// 处理对象键: "key" 后面跟 "{"
		const keyMatch = trimmed.match(/^"([^"]+)"$/);
		if (keyMatch && i + 1 < lines.length && lines[i + 1] === '{') {
			const [, key] = keyMatch;
			const newObj = {};
			current[key] = newObj;
			stack.push(newObj);
			current = newObj;
			i++; // 跳过当前键
			continue;
		}

		i++;
	}

	return root;
}

/**
 * 检查重复的属性定义
 * @param {string} content - KV 文件内容
 * @returns {Array} 重复的属性列表
 */
function checkDuplicateProperties(content) {
	const lines = content.split('\n');
	const duplicates = [];
	const propertyKeys = [];
	const propertyPositions = [];

	// 查找所有属性定义的位置
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		// 匹配 "KEY_NAME" 格式的属性定义
		const match = line.match(/^"([^"]+)"$/);
		if (match) {
			const key = match[1];
			// 检查下一行是否是 '{'，确认这是一个属性定义
			if (i + 1 < lines.length && lines[i + 1].trim() === '{') {
				if (propertyKeys.includes(key)) {
					duplicates.push({
						key: key,
						positions: propertyPositions.filter(p => p.key === key).map(p => p.line)
					});
				}
				propertyKeys.push(key);
				propertyPositions.push({ key, line: i + 1 }); // 行号从1开始
			}
		}
	}

	return duplicates;
}

/**
 * 从本地 KV 文件读取属性数据
 */
function loadPropertiesFromKV() {
	const kvPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/properties.kv`);

	if (!fs.existsSync(kvPath)) {
		console.error(`❌ 错误: 找不到文件 ${kvPath}`);
		process.exit(1);
	}

	console.log(`📄 读取属性文件: ${kvPath}`);
	const content = fs.readFileSync(kvPath, 'utf-8');

	// 检查重复的属性定义
	const duplicates = checkDuplicateProperties(content);
	if (duplicates.length > 0) {
		const yellow = '\x1b[33m';
		const reset = '\x1b[0m';
		console.warn(`\n${yellow}⚠️  警告: 检测到重复的属性定义！${reset}`);
		duplicates.forEach(dup => {
			console.warn(`${yellow}   属性 "${dup.key}" 在以下行重复定义:${reset}`);
			console.warn(`${yellow}   - 第 ${dup.positions.join(', ')} 行${reset}`);
			console.warn(`${yellow}   ⚠️  后面的定义会覆盖前面的定义，可能导致属性配置不生效！${reset}`);
		});
		console.warn('');
	}

	const kvData = parseKV(content);

	// 转换 KV 数据格式为属性对象
	const properties = {};
	for (const key in kvData) {
		if (typeof kvData[key] === 'object' && kvData[key] !== null) {
			properties[key] = kvData[key];
		}
	}

	console.log(`✅ 成功读取 ${Object.keys(properties).length} 个属性定义\n`);
	return properties;
}

/**
 * 将枚举键转换为 PascalCase 函数名
 * HEALTH -> Health, ATTACK_SPEED -> AttackSpeed
 */
function toPascalCase(str) {
	return str
		.toLowerCase()
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

/**
 * 生成 properties.ts 文件内容
 */
function generatePropertiesTS(properties) {
	const propertyKeys = Object.keys(properties);

	// 1. 生成 PropertyFunction 枚举
	let enumContent = `enum PropertyFunction {\n`;
	propertyKeys.forEach((key, index) => {
		const propData = properties[key];
		const comment = propData.localization || propData.string || key;

		if (index === 0) {
			enumContent += `\t/** ${comment} */\n\t${key} = modifierfunction.MODIFIER_FUNCTION_LAST + 1,\n`;
		} else {
			enumContent += `\t/** ${comment} */\n\t${key},\n`;
		}
	});
	enumContent += `\tLAST,\n}`;

	// 2. 生成 PROPERTY_MAP
	let mapContent = `\nconst PROPERTY_MAP: Record<string, PropertyFunction> = {\n`;
	propertyKeys.forEach(key => {
		const propData = properties[key];
		if (propData.string) {
			mapContent += `\t${propData.string}: PropertyFunction.${key},\n`;
		}
	});
	mapContent += `};\n`;
	mapContent += `const PROPERTY_MAP_REVERSE: Partial<Record<PropertyFunction, string>> = {};\nfor (const [k, v] of pairs(PROPERTY_MAP)) {\n	PROPERTY_MAP_REVERSE[v] = k;\n}`;

	// 3. 生成 PropertySystem.RegisterProperty 调用
	let registerContent = `\n`;
	propertyKeys.forEach(key => {
		const propData = properties[key];
		const id = propData.string || key.toLowerCase();
		const scope = propData.scope || 'UNIT';
		const valueType = propData.type || 'NUMBER';
		const aggregation = propData.aggregation || 'SUM';
		const defaultValue = propData.default || '';
		const syncToClient = propData.client === '1' || propData.client === 1;

		// 构建 RegisterProperty 参数对象
		let params = [];
		params.push(`id: "${id}"`);
		params.push(`scope: PropertyScope.${scope}`);
		params.push(`valueType: PropertyValueType.${valueType}`);
		params.push(`aggregation: AggregationStrategy.${aggregation}`);

		// 添加 defaultValue（如果存在且非空）
		if (defaultValue) {
			// 如果是数字类型，直接使用数值，否则用字符串
			if (valueType === 'NUMBER' && !isNaN(Number(defaultValue))) {
				params.push(`defaultValue: ${defaultValue}`);
			} else {
				params.push(`defaultValue: "${defaultValue}"`);
			}
		}

		// 添加 syncToClient（如果为 true）
		if (syncToClient) {
			params.push(`syncToClient: true`);
		}

		// 添加 notify（如果为 '1' 或 1）
		if (propData.notify === '1' || propData.notify === 1) {
			params.push(`notify: true`);
		}

		// 添加 disable_cache（如果为 '1'）
		if (propData.disable_cache === '1') {
			params.push(`enableCache: false`);
		}

		// 添加 event_name（如果存在且非空）
		if (propData.event_name && propData.event_name.trim() !== '') {
			params.push(`event_name: "${propData.event_name}"`);
		}

		// 添加 event_link_id（如果存在且非空）
		if (propData.event_link_id && propData.event_link_id.trim() !== '') {
			params.push(`event_link_id: "${propData.event_link_id}"`);
		}

		registerContent += `PropertySystem.RegisterProperty({ ${params.join(', ')} });\n`;
	});

	// 4. 生成 Get 函数
	let functionsContent = ``;
	const functionMappings = []; // 用于收集函数映射关系
	propertyKeys.forEach(key => {
		const propData = properties[key];

		// 只有 generate_function 为 1 时才生成函数
		if (propData.generate_function !== '1' && propData.generate_function !== 1) {
			return;
		}

		const funcName = toPascalCase(key);
		const id = propData.string || key.toLowerCase();
		const scope = propData.scope || 'UNIT';
		const comment = propData.localization || propData.string || key;

		// 收集函数映射关系
		functionMappings.push({ id, funcName });

		if (scope === 'PLAYER') {
			functionsContent += `\n/** ${comment} */
function Get${funcName}(playerID: PlayerID, params?: any) {
\treturn PropertySystem.GetPropertyValue(playerID, "${id}", params);
}`;
		} else {
			functionsContent += `\n/** ${comment} */
function Get${funcName}(unit: CDOTA_BaseNPC, params?: any) {
\treturn PropertySystem.GetPropertyValue(unit.entindex(), "${id}", params);
}`;
		}
	});

	// 5. 生成 PROPERTY_FUNCTION_MAP
	let functionMapContent = `\n\nconst PROPERTY_FUNCTION_MAP: Record<string, (this: void, unit: any, params?: any) => number> = {\n`;
	functionMappings.forEach(({ id, funcName }) => {
		functionMapContent += `\t${id}: Get${funcName},\n`;
	});
	functionMapContent += `};`;

	// 组合最终内容
	return `/**
 * @noSelfInFile
 * ⚠️ 此文件由 generate-property-system.js 自动生成，请勿手动修改！
 * 源文件: content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/properties.kv
 */

${enumContent}
${mapContent}
${registerContent}${functionsContent}${functionMapContent}
`;
}

/**
 * 生成本地化文件内容
 */
function generateLocalization(properties) {
	let content = `"lang"
{
\t"Language"\t\t"schinese"
\t"Tokens"
\t{`;

	Object.keys(properties).forEach(key => {
		const propData = properties[key];
		if (propData.string && propData.localization) {
			content += `\n\t\t"property_${propData.string}"\t\t"${propData.localization}"`;
		}
		if (propData.string && propData.localization_desc) {
			content += `\n\t\t"property_${propData.string}_desc"\t\t"${propData.localization_desc}"`;
		}
	});

	content += `\n\t}\n}`;
	return content;
}

/**
 * 生成 Panorama polyfill 属性文件内容
 */
function generatePolyfillProperties(properties) {
	const propertyKeys = Object.keys(properties);

	// 文件头部注释
	let content = `/**
 * ⚠️ 此文件由 generate-property-system.js 自动生成，请勿手动修改！
 * 源文件: content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/properties.kv
 */

`;

	// 1. 生成 PROPERTY_LIST
	content += `const PROPERTY_LIST = [\n`;
	propertyKeys.forEach(key => {
		const propData = properties[key];
		if (propData.string) {
			content += `\t"${propData.string}",\n`;
		}
	});
	content += `];\n`;

	// 2. 生成 PROPERTY_TAGS（只包含有 FeatureTag 的属性）
	content += `\nconst PROPERTY_TAGS: Record<string, string[]> = {\n`;
	propertyKeys.forEach(key => {
		const propData = properties[key];
		if (propData.string && propData.FeatureTag && propData.FeatureTag.trim() !== '') {
			// 用 | 分割多个 Tag
			const tags = propData.FeatureTag.split('|').map(t => t.trim()).filter(t => t !== '');
			if (tags.length > 0) {
				const tagsStr = tags.map(t => `"${t}"`).join(', ');
				content += `\t${propData.string}: [${tagsStr}],\n`;
			}
		}
	});
	content += `};\n`;

	return content;
}

/**
 * 触发 VS Code 命令（通过 command URI）
 * @param {string} commandId VS Code command id，如 typescript.reloadProjects
 */
function runVSCodeCommand(commandId) {
	const uri = `vscode://command/${commandId}`;

	// 方式1：优先使用 VS Code CLI（通常在 VS Code 终端 / Task 内可用）
	try {
		const r = spawnSync('code', ['-r', '--open-url', uri], {
			stdio: 'ignore',
			shell: true,
			windowsHide: true,
		});
		if (r.status === 0) {
			return true;
		}
	} catch (e) {
		// ignore
	}

	// 方式2：Windows fallback - 交给系统 URI handler
	try {
		const r = spawnSync('cmd', ['/c', 'start', '', uri], {
			stdio: 'ignore',
			shell: false,
			windowsHide: true,
		});
		return r.status === 0;
	} catch (e) {
		return false;
	}
}

/**
 * 跨进程防抖：在 debounceMs 内只允许触发一次
 * @param {string} filePath debounce 文件路径
 * @param {number} debounceMs 防抖时间（毫秒）
 */
function shouldDebouncedTrigger(filePath, debounceMs) {
	try {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });

		if (fs.existsSync(filePath)) {
			const stat = fs.statSync(filePath);
			const age = Date.now() - stat.mtimeMs;
			if (age >= 0 && age < debounceMs) {
				return false;
			}
		}

		fs.writeFileSync(filePath, String(Date.now()), 'utf8');
		return true;
	} catch (e) {
		// 防抖失败不应阻止主流程
		return true;
	}
}

// ==================== 主程序 ====================
(() => {
	console.log('🔧 PropertySystem 代码生成器\n');

	const properties = loadPropertiesFromKV();

	// 生成 properties.ts
	const tsContent = generatePropertiesTS(properties);
	const tsPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/properties.ts`);
	fs.mkdirSync(path.dirname(tsPath), { recursive: true });
	fs.writeFileSync(tsPath, tsContent);
	console.log(`✅ 生成文件: ${tsPath}`);

	// 生成本地化文件
	const langContent = generateLocalization(properties);
	const langPath = path.join(ROOT_DIR, `content/${PROJECT_NAME}/localization/schinese/property_system.vdf`);
	fs.mkdirSync(path.dirname(langPath), { recursive: true });
	fs.writeFileSync(langPath, langContent);
	console.log(`✅ 生成文件: ${langPath}`);

	// 生成 Panorama polyfill 属性文件
	const polyfillContent = generatePolyfillProperties(properties);
	const polyfillPath = path.join(ROOT_DIR, `src/polyfill/properties.ts`);
	fs.mkdirSync(path.dirname(polyfillPath), { recursive: true });
	fs.writeFileSync(polyfillPath, polyfillContent);
	console.log(`✅ 生成文件: ${polyfillPath}`);

	// 旧项目字段只是入口映射；数值、聚合、作用域仍全部由 properties.kv 定义。
	let migration = '/** 由 generate-property-system.js 从 properties.kv 生成，请勿手改。 */\n';
	for (const [field, name] of [['legacy_modifier', 'ATHENA_MODIFIER_PROPERTIES'], ['legacy_attribute', 'ATHENA_PERMANENT_PROPERTIES'], ['legacy_item', 'ATHENA_ITEM_PROPERTIES']]) {
		migration += `const ${name}: Record<string, PropertyFunction> = {\n`;
		for (const [key, data] of Object.entries(properties)) {
			for (const alias of (data[field] || '').split('|').filter(Boolean)) migration += `\t"${alias}": PropertyFunction.${key},\n`;
		}
		migration += '};\n';
	}
	fs.writeFileSync(path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/athena_property_map.ts`), migration);
	let itemAggregations = 'const ATHENA_ITEM_AGGREGATIONS: Record<string, AggregationStrategy> = {\n';
	for (const data of Object.values(properties)) if (data.legacy_item) itemAggregations += `\t"${data.legacy_item}": AggregationStrategy.${data.legacy_item_aggregation || data.aggregation || 'SUM'},\n`;
	fs.appendFileSync(path.join(ROOT_DIR, `content/${PROJECT_NAME}/scripts/vscripts/framework/property_system/athena_property_map.ts`), itemAggregations + '};\n');

	console.log('\n🎉 PropertySystem 代码生成完成！');

	if (!process.argv.includes('--no-editor-reload') && shouldDebouncedTrigger(TS_RELOAD_DEBOUNCE_FILE, TS_RELOAD_DEBOUNCE_MS)) {
		const ok = runVSCodeCommand('typescript.restartTsServer');
		if (ok) {
			console.log('🔄 已触发 TypeScript: Reload Projects');
		} else {
			console.warn('⚠️ 无法触发 TypeScript: Reload Projects（可手动执行 TypeScript: Reload Projects 或 Restart TS Server）');
		}
	} else {
		console.log(`⏭️ 跳过 TypeScript: Reload Projects（${TS_RELOAD_DEBOUNCE_MS}ms 防抖）`);
	}
})();
