/**
 * 将字符串里$xxx替换为具体翻译
 * @param str 要替换的字符串
 * @returns 替换后的字符串
 * @example replaceDollar("$mana") -> "蓝量加成"
 */
function replaceDollar(text: string): string {
	return text.replace(/\$(\w+)\b/g, (match, variableName, offset, string) => {
		let text = `dota_ability_variable_${variableName}`;
		let localization = Localize(text);
		if (localization == text) {
			return match;
		}
		return localization;
	});
}

//  function replaceKeyWord(text: string): string {
// 	return text.replace(/\{KeyWord:(\w+)\}/g, (match, keyName, offset, string) => {
// 		let replacement = Localize(`KeyWord_${keyName}`);
// 		return replacement;
// 	});
// }

/**
 * 翻译字符串，会将$xxx替换为具体翻译
 * @param str 翻译key
 * @param p 可选Panel
 * @returns 翻译后的字符串
 */
function Localize(token: string, parent?: PanelBase): string;
function Localize(token: string, value: number, parent?: PanelBase): string;
function Localize(token: string, ...args: any[]) {
	if (token == "") return token;
	let parent;
	let value;
	if (args.length == 1) {
		if (typeof args[0] == "number") {
			value = args[0];
		} else {
			parent = args[0];
		}
	}
	if (args.length == 2) {
		value = args[0];
		parent = args[1];
	}
	let originalToken = token;
	if (token[0] != "#") {
		token = "#" + token;
	}

	let old = token;
	if (value != undefined) {
		if (parent != undefined) {
			token = $.Localize(token, value, parent);
		} else {
			token = $.Localize(token, value, $.GetContextPanel());
		}
	} else {
		if (parent != undefined) {
			token = $.Localize(token, parent);
		} else {
			token = $.Localize(token, $.GetContextPanel());
		}
	}

	if (token.length == old.length && token.toLocaleLowerCase() == old.toLocaleLowerCase()) {
		return originalToken;
	}

	token = replaceDollar(token);
	token = token.replace(/(?<!%(-)?(\.(\d+))?([dfl])?\w+\b)%%/g, "%");

	// 匹配 <Hotkey|Skill/> 这样的 <aaa|bbb/> 格式
	token = token.replace(/<(\w+)\|([\s\S]*?)\/>/g, (match, key: string, value: string) => {
		// key = "Hotkey", value = "Skill"
		/** 快捷键加描述 */
		if (key == "Hotkey") {
			return `<panel class='InlineHotKey HotKey${value}'/><span class='AbilityLabel'>${GetLocalization("#feature_" + value)}</span>`;
		}
		/** 只有快捷键 */
		if (key == "HotkeyOnly") {
			return `<panel class='InlineHotKey HotKey${value}'/>`;
		}
		if (key == "Mark") {
			return `<span class='MarkLabel'>${value}</span>`;
		}
		if (key == "Constant") {
			// @ts-ignore
			return `<span class='MarkLabel'>${globalThis[value]}</span>`;
		}
		if (key == "Ability") {
			let abilityName = GetLocalization(`DOTA_Tooltip_ability_${value}`, "");
			// const keybind = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["keybind_keyboard_skill"]?.value ?? "";
			// return `<span class='AbilityLabel'>${abilityName}</span><span class="hotkey">${keybind}</span>`;
			return `<span class='MarkLabel'>${abilityName}</span>`;
		}
		return match; // 暂时返回原字符串，等待具体实现
	});

	token = token.replace(/<(\w+\b):([\s\S]*?)\/>/g, (match, key: string, text, offset, string) => {
		let featureKey = GetLocalization(`feature_${key}`, "");
		if (featureKey == "") return match;
		// GameUI.CustomUIConfig().LocalizationFeatureList ??= []
		if (GameUI.CustomUIConfig().LocalizationFeatureList != undefined) {
			if (GameUI.CustomUIConfig().LocalizationFeatureList!.indexOf(key) == -1) {
				GameUI.CustomUIConfig().LocalizationFeatureList!.push(key);
			}
		}
		return `<span class='FeatureLabel'>${text}</span>`;

	});
	return token;
}

function GetLocalization(token: string, defaultText?: string, parent?: PanelBase): string;
function GetLocalization(token: string, defaultText: string | undefined, value: number, parent?: PanelBase): string;
function GetLocalization(text: string, defaultText?: string, ...args: any[]) {
	// @ts-ignore
	let canLocalize = $.CanLocalize(text) as boolean
	if (!canLocalize) {
		return defaultText ?? text;
	}
	let localizedText = Localize(text, ...args);
	if (defaultText != undefined && localizedText == text) {
		localizedText = defaultText;
	}
	return localizedText;
}

/**
 * 在独立作用域内收集 GetLocalization 解析到的特性标签。
 * 回调必须同步执行；结束后会恢复调用前的收集状态。
 */
function CollectLocalizationFeatureTags<T>(callback: () => T): { result: T; tags: string[]; } {
	const config = GameUI.CustomUIConfig();
	const previousFeatureList = config.LocalizationFeatureList;
	config.LocalizationFeatureList = [];

	try {
		const result = callback();
		return {
			result,
			tags: [...(config.LocalizationFeatureList ?? [])],
		};
	} finally {
		config.LocalizationFeatureList = previousFeatureList;
	}
}
const addedValueFunctionMap: Record<string, any> = {
	attack: Entities.GetAttackDamage,
	health: Entities.GetMaxHealth,
	shield: Entities.GetShield,
};
/** 获取具体的数值
 * @param valueData 键对应的值，如"100 200 300"，也有可能是个表，{"value": "100 200 300", "_str": "1"}
 * @param entIndex 实体index，传入实体index就会计算_str这种加成，类型定义在addedValueFunctionMap中
 * @param onlyShowNowLevel 默认为false，true的情况下只显示当前等级的数值
 */
function GetAbilityValue(valueData: Table, params: {
	hasPct?: boolean;
	level?: any;
	entIndex?: EntityIndex,
	onlyShowNowLevel?: boolean,
} = {}, onlyValue = false) {
	if (valueData == undefined) {
		return 0;
	}
	let level = params.level ?? 1;
	let entIndex = params.entIndex;
	let onlyShowNowLevel = params.onlyShowNowLevel;
	let hasPct = params.hasPct ?? false;
	let pctSymbol = hasPct ? "%" : "";

	let baseValueString = "";
	let addedValueString = "";

	const valueList = String(typeof valueData == "object" ? valueData.value : valueData).split(" ");
	const maxLevel = valueList.length - 1;
	const currentLevel = Math.min(maxLevel, Math.max(0, level - 1));
	{
		let _baseValue = [];
		let digitalNum = 1;
		let maxs = 0;
		if (onlyShowNowLevel) {
			let value = Number(valueList?.[currentLevel] ?? "0");
			let s = value.toString().split(".");
			if (s[1] && s[1].length > 0) {
				maxs = s[1].length;
			}
			_baseValue = [Number(valueList?.[currentLevel] ?? "0")];
		} else {
			_baseValue = valueList.map((v, index) => {
				let value = Number(v);
				let s = value.toString().split(".");
				if (s[1] && s[1].length > maxs) {
					maxs = s[1].length;
				}
				return value;
			});
		}
		if (maxs > 0) {
			for (let i = 0; i < maxs; i++) {
				digitalNum = digitalNum * 10;
			}
		}
		if (entIndex != undefined && entIndex > -1) {
			if (_baseValue.length > 0) {
				// 加入单位属性的数值
				if (typeof valueData == "object") {
					for (const key in valueData) {
						const method = key.substring(0, 1);
						const addedKey = key.substring(1);
						let addedValue = 0;
						const addedValueList = String(valueData[key]).split(" ");
						const maxLevel = addedValueList.length - 1;
						if (addedValueFunctionMap[addedKey]) {
							if (method == "_" || method == "+") {
								addedValue += Round((addedValueFunctionMap[addedKey](entIndex) * Number(addedValueList[Math.min(maxLevel, Math.max(0, level - 1))])) * digitalNum) / digitalNum;
							}
						}
					}
				}
			}
		} else {
			// 加入单位属性的数值
			if (typeof valueData == "object") {
				const addedParts: string[] = [];
				for (const key in valueData) {
					const method = key.substring(0, 1);
					const addedKey = key.substring(1);
					const addedValueList = String(valueData[key]).split(" ");
					const addedMaxLevel = addedValueList.length - 1;
					const addedCurrentLevel = Math.min(addedMaxLevel, Math.max(0, level - 1));
					if (Object.keys(addedValueFunctionMap).includes(addedKey)) {
						let addedValueText: string;
						const toPct = (v: string) => Math.round(Number(v) * 10000) / 100;
						if (onlyShowNowLevel) {
							addedValueText = `${toPct(addedValueList[addedCurrentLevel])}%`;
						} else {
							addedValueText = addedValueList.map((v, index) => {
								let str = `${toPct(v)}%`;
								if (addedValueList.length > 1) {
									if (level > 0 && index == addedCurrentLevel) {
										str = `<span class="current">${str}</span>`;
									}
								} else {
									str = `<span class="current">${str}</span>`;
								}
								return str;
							}).join("/");
						}
						addedParts.push(`${addedValueText} × ${GetLocalization("dota_ability_special_variable_" + addedKey)}`);
					}
				}
				if (addedParts.length > 0) {
					addedValueString = addedParts.join(" + ");
				}
			}
		}
		if (onlyValue && onlyShowNowLevel) {
			return _baseValue[currentLevel] ?? _baseValue[0] ?? 0;
		}
		if (_baseValue.some(v => v !== 0)) {
			baseValueString = _baseValue.map((v, index) => {
				let str = v + pctSymbol;
				if (_baseValue.length > 1) {
					if (level > 0 && index == currentLevel) {
						str = `<span class="current">${str}</span>`;
					}
				} else {
					str = `<span class="current">${str}</span>`;
				}
				return str;
			}).join("/");
		}
	}
	const connector = (baseValueString != "" && addedValueString != "") ? " + " : "";
	return baseValueString + connector + addedValueString;
}

/** 将description用kv里的键值替换数值
 * @param description 文本描述
 * @param abilityValues 键值表AbilityValues，不再支持旧版的AbilitySpecial
 * @param entIndex 实体index，传入实体index就会计算_str这种加成，类型定义在addedValueFunctionMap中
 * @param symbol 匹配的符号，默认是官方的%damage%，你可以传入["<",">"]来匹配<damage>
 * @param onlyShowNowLevel 默认为false，true的情况下只显示当前等级的数值
 */
function getKeyValueDescription(description: string, abilityValues: Table = {}, params: {
	entIndex?: EntityIndex,
	symbol?: [string, string],
	onlyShowNowLevel?: boolean,
	level?: number;
} = {}) {
	let level = params.level ?? 0;
	let entIndex = (params.entIndex ?? -1) as EntityIndex;
	let symbol = params.symbol ?? ["%", "%"];
	let onlyShowNowLevel = params.onlyShowNowLevel ?? false;
	let valueNameList = Object.keys(abilityValues);
	for (const valueName of valueNameList) {
		let block = new RegExp(symbol[0] + valueName + symbol[1], "g");
		let blockPS = new RegExp(symbol[0] + valueName + symbol[1] + "%", "g");
		let iResult = description.search(block);
		let iResultPS = description.search(blockPS);
		if (iResult == -1 && iResultPS == -1) continue;
		let value = abilityValues[valueName];
		let spanClass = "GameplayValues GameplayVariable";
		const v = GetAbilityValue(value, {
			entIndex,
			level,
			onlyShowNowLevel,
			hasPct: iResultPS != -1
		});
		description = description.replace(blockPS, `<span class='${spanClass}'>${v}</span>`);
		description = description.replace(block, `<span class='${spanClass}'>${v}</span>`);
	}
	return description;
}

/** 获取物品属性文本 */
function getItemArrtibute(itemName: string, level: number = 1): string {
	const itemKV = GameUI.CustomUIConfig().npc_items_custom[itemName];

	const AbilityValues = itemKV?.AbilityValues ?? {};
	let aValueNames = Object.keys(AbilityValues);
	let sAttributes = aValueNames.filter(v => v.startsWith("item_")).map((sValueName) => {
		const valueData = AbilityValues[sValueName];
		const valueList = String(typeof valueData == "object" ? valueData.value : valueData).split(" ");
		const maxLevel = valueList.length - 1;
		const currentLevel = Math.min(maxLevel, Math.max(0, level - 1));
		let value = toFiniteNumber(valueList?.[currentLevel], 0);
		let text = GetLocalization("#property_" + sValueName.substring(5));
		const bHasPercentSign = text.search(/%/g) == 0;
		let name = text.substring(bHasPercentSign ? 1 : 0);
		if (value < 0) {
			name = "<font color='#e03f2f'>" + name + "</font>";
		}
		return (value >= 0 ? "+" : "-") + " <span class='GameplayValues GameplayVariable'>" + Math.abs(value) + (bHasPercentSign ? "%" : "") + "</span> " + name;
	}).join("<br>");
	return sAttributes;
}

/**
 * 根据属性值生成格式化的属性描述文本
 * @param value 属性数值
 * @param propertyName 属性名称（不含前缀）
 * @param isPercent 是否为百分比格式（决定是否在属性名前查找%符号）
 * @returns 格式化后的属性描述HTML字符串
 */
function GetPropertyLocalization(propertyName: string, value: number, isPercent: boolean = false): string {
	let text = GetLocalization("#property_" + propertyName);

	// 检查文本是否以百分号开头
	const bHasPercentSign = text && text.search(/%/) === 0;

	// 根据是否以百分号开头截取实际名称
	let name = text ? text.substring(bHasPercentSign ? 1 : 0) : "";

	// 如果值为负数，则将名称标记为红色
	if (value < 0) {
		name = "<font color='#e03f2f'>" + name + "</font>";
	}
	// 返回格式化的字符串，包括正负号、数值和名称
	return (value >= 0 ? "+" : "-") +
		" <span class='GameplayValues GameplayVariable'>" +
		Math.abs(value) + (bHasPercentSign || isPercent ? "%" : "") +
		"</span> " + name;
}

/**
 * 从任意字符串中解析所有标签名
 * 支持格式：<Tag:文本/>、<Tag|文本/>
 */
function GetTagsFromString(text: string): string[] {
	if (!text) return [];
	const tags: Set<string> = new Set<string>();

	const regexList = [
		/<(\w+):[\s\S]*?\/>/g,
		// /<(\w+)\|[\s\S]*?\/>/g,
	];

	for (let i = 0; i < regexList.length; i++) {
		const regex = regexList[i];
		let match;
		while ((match = regex.exec(text)) !== null) {
			tags.add(match[1]);
		}
	}

	return Array.from(tags);
}
/** 获取物品的所有Tag（从描述文本和AbilityValues中解析） */
function GetArtifactTags(itemName: string): string[] {
	const itemKV = GameUI.CustomUIConfig().npc_items_custom[itemName];
	if (!itemKV) return [];

	const tags: Set<string> = new Set<string>();

	// 1. 从描述文本中解析标签
	const desc = $.Localize(`#DOTA_Tooltip_ability_${itemName}_description`, $.GetContextPanel());
	const descTags = GetTagsFromString(desc);
	descTags.forEach(tag => tags.add(tag));

	// 2. 从 AbilityValues 中获取 Tag
	const abilityValuesTags = GetAbilityValuesTags(itemKV.AbilityValues ?? {});
	abilityValuesTags.forEach(tag => tags.add(tag));

	// 3. 从 KV 字段中获取 Tag
	if (Number(itemKV.Quantitylimit ?? 0) == 1) {
		tags.add("Quantitylimit");
	}
	if (String(itemKV.UpgradeGroup ?? "") != "") {
		tags.add("Grouplimit");
	}

	// 4.从tags中获取 Tag
	tags.forEach(tag => {
		const tagDesc = $.Localize(`#feature_${tag}_description`, $.GetContextPanel());
		const nestedTags = GetTagsFromString(tagDesc);
		nestedTags.forEach(nestedTag => tags.add(nestedTag));
	});

	// tagsTemp.forEach(tempTag => {
	// 	tags.add(tempTag);
	// });

	return Array.from(tags);
}
/** 获取技能升级的所有Tag（从描述文本和AbilityValues中解析） */
function GetAbilityUpgradeTags(upgradeID: string): string[] {
	const upgradeKV = GameUI.CustomUIConfig().ability_upgrades[upgradeID];
	if (!upgradeKV) return [];

	const tags: Set<string> = new Set<string>();

	// 1. 从描述文本中解析标签
	const desc = $.Localize(`#${upgradeID}_description`, $.GetContextPanel());
	const descTags = GetTagsFromString(desc);
	descTags.forEach(tag => tags.add(tag));

	// 2. 从 AbilityValues 中获取 Tag
	const abilityValuesTags = GetAbilityValuesTags(upgradeKV.AbilityValues ?? {});
	abilityValuesTags.forEach(tag => tags.add(tag));

	// 3.从tags中获取 Tag
	tags.forEach(tag => {
		const tagDesc = $.Localize(`#feature_${tag}_description`, $.GetContextPanel());
		const nestedTags = GetTagsFromString(tagDesc);
		nestedTags.forEach(nestedTag => tags.add(nestedTag));
	});

	return Array.from(tags);
}

/** 传入AbilityValues解析tag */
function GetAbilityValuesTags(abilityValues: Table = {}) {
	let tags: Set<string> = new Set<string>();
	const addPropertyTags = (property: string) => {
		const token = `#property_${property}`;
		// @ts-ignore
		if (!$.CanLocalize(token)) return;
		const tagDesc = $.Localize(token, $.GetContextPanel());
		const parsedTags = GetTagsFromString(tagDesc);
		parsedTags.forEach(tag => tags.add(tag));
	};
	for (const key in abilityValues) {
		const value = abilityValues[key];
		// 物品自动属性检查
		if (key.startsWith("item_")) {
			const property = key.substring(5);
			addPropertyTags(property);
			// if (PROPERTY_TAGS[property]) {
			// 	PROPERTY_TAGS[property].forEach(tag => tags.add(tag));
			// }
		}
		// 附加属性检查
		if (typeof value == "object") {
			for (const _addedKey in value) {
				const method = _addedKey.substring(0, 1);
				if (method != "_" && method != "+") continue;
				const addedKey = _addedKey.substring(1);
				addPropertyTags(addedKey);
				// if (PROPERTY_TAGS[addedKey]) {
				// 	PROPERTY_TAGS[addedKey].forEach(tag => tags.add(tag));
				// }
			}
		}
	}
	return Array.from(tags);
}

/**
 * 获取特权描述
 * @param privilege 特权名
 * @param value 外部传入的value
 */
function GetPrivilegeDesc(privilege: string, level: number = 1, params?: any) {
	if (KeyValues.privilege[privilege]) {
		const privilegeData = KeyValues.privilege[privilege];
		let values = {
			...privilegeData.AbilityValues,
			...params,
		};
		return getKeyValueDescription(
			GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, ""),
			values,
			{ level: level, onlyShowNowLevel: true }
		);
	}
	return "";
}

interface ParsedEffectTooltipSegment {
	rawKey: string;
	value?: number;
	text: string;
}
/**
 *  解析描述文本
 * @param effectText K:V|PrivilegeKey 
 * @returns 
 */
function ParseEffectTooltipSegments(effectText?: string): ParsedEffectTooltipSegment[] {
	if (effectText === undefined || effectText === "") {
		return [];
	}

	const result: ParsedEffectTooltipSegment[] = [];
	const effectSegments = effectText.split("|");

	for (let index = 0; index < effectSegments.length; index++) {
		const segment = effectSegments[index];
		if (segment === "") {
			continue;
		}

		const [rawKey, rawValue] = segment.split(":");
		if (rawKey === undefined || rawKey === "") {
			continue;
		}

		if (rawValue !== undefined && rawValue !== "") {
			const parsedValue = Number(rawValue);
			if (!Number.isNaN(parsedValue)) {
				result.push({
					rawKey,
					value: parsedValue,
					text: GetPropertyLocalization(rawKey, parsedValue),
				});
				continue;
			}
		}

		const privilegeText = GetPrivilegeDesc(rawKey);
		if (privilegeText !== "") {
			result.push({
				rawKey,
				text: privilegeText,
			});
		}
	}

	return result;
}

function GetEffectTooltipText(effectText?: string): string {
	return ParseEffectTooltipSegments(effectText).map(segment => segment.text).join("<br>");
}

/**
 * 替换本地化文本中的变量
 * @param token 本地化 key（支持带或不带 # 前缀）
 * @param variables 变量对象，如 {playerName: "xxx", amount: 100}
 * @returns 替换后的文本
 *
 * @example
 * // 本地化文件： "npc_achievement" "成就系统 {playerName}"
 * LocalizeWithVars("#npc_achievement", {playerName: "张三"})
 * // 返回: "成就系统 张三"
 */
function LocalizeWithVars(token: string, variables: Record<string, string | number> = {}): string {
	// @ts-ignore
	let canLocalize = $.CanLocalize(token) as boolean
	if (!canLocalize) {
		return token
	}
	let text = Localize(token);

	// 替换所有 {variableName} 格式的变量
	for (const [key, value] of Object.entries(variables)) {
		const regex = new RegExp(`\\{${key}\\}`, "g");
		text = text.replace(regex, String(value));
	}

	return text;
};
