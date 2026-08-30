declare interface VCSSStyleDeclaration {
	imgShadow: string | null;
}

declare type ValueOf<T> = T[keyof T];

type ExcludeFunctions<T> = {
	[K in keyof T as T[K] extends Function ? never : K]: T[K]
};

declare interface LuaVector {
	x: number;
	y: number;
	z: number;
}


declare type Vector = [number, number, number];
declare type Cube = [Vector, Vector, Vector, Vector, Vector, Vector, Vector, Vector];
declare type Rect = [Vector, Vector, Vector, Vector];
declare const vec3_origin: Vector;
declare const vec3_invalid: Vector;

/**
 * 打印
 * @param args
 */
declare function print(...args: any[]): void;

/**
 * 在对象里寻找值
 * @param o 对象
 * @param v 值
 * @returns 返回值的key，无此值则返回undefined
 */
declare function FindKey(o: object, v: any): string | undefined;

/**
 * 四舍五入
 * @param fNumber 数值
 * @param prec 精确到小数点几位，选填，默认0
 */
declare function Round(fNumber: number, prec?: number): number;

/**
 * 播放音效
 * @param sSoundName 音效名字
 */
declare function PlaySoundEffect(sSoundName: string): void;

/**
 * 区间限定函数
 * @param num 数值
 * @param min 最大值
 * @param max 最小值
 * @returns 返回限定区间的值
 */
declare function Clamp(num: number, min: number, max: number): number;

/**
 * 插值
 * @param t 百分比
 * @param a 开始值
 * @param b 结束值
 */
declare function Lerp(t: number, a: number, b: number): number;

/**
 * 重映射区间限定函数
 * @param num 数值
 * @param a 初始区间最小值
 * @param b 初始区间最大值
 * @param c 最终区间最小值
 * @param d 最终区间最大值
 * @returns 返回重映射区间的值
 */
declare function RemapValClamped(num: number, a: number, b: number, c: number, d: number): number;

/**
 * 判断点是否在点集形成的多边形区域内
 * @param point
 * @param polygon 顶点位置集，按顶点位置顺序划线，线之间不能交叉
 * @returns 返回点是否在区域内
 */
declare function IsPointInPolygon(point: [number, number, number], polygon: LuaVector[]): boolean;

/**
 * 深度打印对象信息
 * @param obj 对象
 */
declare function DeepPrint(obj: object | Array<any>): void;

/**
 * $里的自定义函数
 */
declare interface DollarStatic {
	/**
	 * 获取一个随机整数
	 * @param n 最小值
	 * @param m 最大值
	 * @returns 返回一个[n, m]区间的随机整数
	 */
	RandomInt(n: number, m: number): number;
	/**
	 * 获取一个随机浮点数
	 * @param n 最小值
	 * @param m 最大值
	 * @returns 返回一个[n, m]区间的随机浮点数
	 */
	RandomFloat(n: number, m: number): number;
	/**
	 * 获取一个随机百分比
	 * @returns 返回是否通过
	 */
	RollPercentage(n: number): boolean;
}

declare function SaveData(panel: Panel, key: any, data: any): void;
declare function LoadData<T = any>(panel: Panel, key: any): T;

/**
 * 自定义鼠标事件表
 */
declare type MouseEvents = { fCallback: (tData: { event_name: MouseEvent, value: MouseButton | MouseScrollDirection, result: boolean; }) => boolean | void, iPriority: number; };

declare interface AbilityTooltipBaseOptions {
	onlycurrentlevelvalue?: boolean;
}
declare interface AbilityInventoryItemTooltip extends AbilityTooltipBaseOptions {
	entityindex: EntityIndex;
	inventoryslot: number;
}
declare interface AbilityShopItemTooltip extends AbilityTooltipBaseOptions {
	abilityname: string;
	guidename: string;
	entityindex: EntityIndex;
	level?: number;
	playerownerid?: PlayerID;
}
declare interface DropItemTooltip extends AbilityTooltipBaseOptions {
	abilityname: string;
	guidename: string;
	level?: number;
	playerownerid?: PlayerID;
	expirytime?: number;
	droppeditemcharges?: number;
}
declare interface AbilityTooltipForEntityIndex extends AbilityTooltipBaseOptions {
	abilityname: string;
	entityindex: EntityIndex;
}
declare interface AbilityTooltipForLevel extends AbilityTooltipBaseOptions {
	abilityname: string;
	level: number;
}
declare interface AbilityEntityTooltip extends AbilityTooltipBaseOptions {
	abilityentityindex: AbilityEntityIndex | ItemEntityIndex;
	entityindex?: EntityIndex;
}
declare interface AbilityTooltip extends AbilityTooltipBaseOptions {
	abilityname: string;
}
declare interface AbilityTooltipData extends AbilityTooltipBaseOptions {
	abilityname?: string;
	entityindex?: EntityIndex;
	inventoryslot?: number;
	level?: number;
	guidename?: string;
	abilityentityindex?: AbilityEntityIndex | ItemEntityIndex;
	playerownerid?: PlayerID;
}
declare type AbilityTooltipOptions = AbilityInventoryItemTooltip | AbilityShopItemTooltip | AbilityTooltipForEntityIndex | AbilityTooltipForLevel | AbilityEntityTooltip | AbilityTooltip;
declare interface BuffTooltipOptions {
	entityIndex: EntityIndex;
	buffSerial: BuffID;
	onEnemy: boolean;
}
declare interface UnitStatsTooltipOptions { }
declare interface TextTooltipOptions {
	text: string;
}
declare interface TitleTextTooltipOptions {
	title: string;
	text: string;
}
declare interface TitleImageTextTooltipOptions {
	title: string;
	image: string;
	text: string;
}
declare interface AbilityTalentTooltip {
	abilityname: string;
	talentname: string;
	level?: number;
	onlycurrentlevelvalue?: boolean;
	canlearn?: boolean;
}
declare interface AbilityUpgradeTooltip {
	upgrade_id: string;
}
declare interface CustomUIConfig {
	__serverTimeDiff: number;
	GetServerTimeStamp(): number;
	__LocalISOCode?: string;
	CommandUniqueSuffix: string,
	OverheadPanels: OverheadPanel[];
	// 转化技能升级数据表
	FormatAbilityUpgradeData: (t: Table) => AbilityUpgrade;

	UnsubscribeMouseEvent: (sName: string) => void;
	tMouseEvents: { [sName: string]: MouseEvents; };

	SubscribeMouseEvent(sName: string, fCallback: (tData: { event_name: MouseEvent, value: MouseButton | MouseScrollDirection, result: boolean; }) => boolean | void, iPriority?: number): void;
	ReportClick(clickType: string, detail: string): void;
	PlayerTypeReport(detail: string): void;
	FlushClickReport(): void;

	/**
	 * 显示自定义技能Tooltip
	 * @param panel 目标面板
	 */
	ShowAbilityTooltip<T extends AbilityTooltipBaseOptions>(panel: PanelBase, data: T): void;

	/**
	 * 隐藏自定义技能Tooltip
	 * @param panel 目标面板
	 */
	HideAbilityTooltip(panel: Panel): void;

	/**
	 * 显示自定义BuffTooltip
	 * @param panel 目标面板
	 */
	ShowBuffTooltip(panel: Panel, data: BuffTooltipOptions): void;

	/**
	 * 隐藏自定义BuffTooltip
	 * @param panel 目标面板
	 */
	HideBuffTooltip(panel: Panel): void;

	/**
	 * 显示自定义BuffTooltip
	 * @param panel 目标面板
	 */
	ShowUnitStatsTooltip(panel: Panel, data: UnitStatsTooltipOptions): void;

	/**
	 * 隐藏自定义UnitStatsTooltip
	 * @param panel 目标面板
	 */
	HideUnitStatsTooltip(panel: Panel): void;

	/**
	 * 显示技能天赋Toolip
	 * @param panel 目标面板
	 */
	ShowAbilityTalentTooltip(panel: PanelBase, data: AbilityTalentTooltip): void;

	/**
	 * 隐藏技能天赋Toolip
	 * @param panel 目标面板
	 */
	HideAbilityTalentTooltip(panel: Panel): void;
	/**
	 * 显示技能升级Toolip
	 * @param panel 目标面板
	 */
	ShowAbilityUpgradeTooltip(panel: PanelBase, data: AbilityUpgradeTooltip): void;

	/**
	 * 隐藏技能升级Toolip
	 * @param panel 目标面板
	 */
	HideAbilityUpgradeTooltip(panel: Panel): void;

	/**
	 * 显示标题文本Tooltip
	 * @param panel 目标面板
	 */
	ShowCustomTitleTextTooltip(panel: PanelBase, data: any): void;
	/**
	 * 隐藏技能升级Toolip
	 * @param panel 目标面板
	 */
	HideCustomTitleTextTooltip(panel: Panel): void;

	/**
	 * 显示标题文本Tooltip
	 * @param panel 目标面板
	 */
	ShowCustomTextTooltip(panel: PanelBase, data: any): void;
	/**
	 * 隐藏技能升级Toolip
	 * @param panel 目标面板
	 */
	HideCustomTextTooltip(panel: Panel): void;

	/**
	 * 获取指定位置的物品容器
	 * @param aPosition 屏幕位置，选填，默认鼠标位置
	 */
	GetCursorPhysicalItem(aPosition?: [number, number]): ItemEntityIndex;

	/**
	 * 获取指定位置的实体
	 * @param aPosition 屏幕位置，选填，默认鼠标位置
	 */
	GetCursorEntity(aPosition?: [number, number]): EntityIndex;
	/**
	 * 拖拽开始
	 * @param panel 面板
	 */
	StartDrag(panel: Panel): void;
	/**
	 * 拖拽结束
	 */
	EndDrag(): void;

	CreateEnemyOverheadPanel(unitEntIndex: EntityIndex, worldPanel: WorldPanel): OverheadPanel;
	CreateHeroOverheadPanel(unitEntIndex: EntityIndex, worldPanel: WorldPanel): OverheadPanel;

	_PopupTempData: { [key: string]: any; };
	_HUDRoot_: Panel;
	_Record_UniqueString: number;

	TooltipList: string[];

	SetRedPoint: (state: boolean, rootKey: string, ..._keys: string[]) => void;
	SubscribeRedPointChange: (callback: (rootKey: string) => void, rootKey?: string) => GameEventListenerID;
	GetRedPoint: (rootKey: string, ...keys: string[]) => boolean;

	LocalizationFeatureList?: string[];
}

declare interface CScriptBindingPR_Entities {
	/**
	 * 从lua client获取单位数据
	 * @param iUnitEntIndex 单位
	 * @param sFuncName lua client函数名字
	 */
	GetUnitData<T extends number | boolean>(iUnitEntIndex: EntityIndex, sFuncName: string): T | undefined;
	/**
	 * 从lua client获取单位属性
	 * @param iUnitEntIndex 单位
	 * @param sPropertyName lua client函数名字
	 */
	GetModifierProperty<T extends number | boolean>(iUnitEntIndex: EntityIndex, sPropertyName: string, tParams?: Record<string, any>): T | undefined;

	/**
	 * 获取单位施法距离
	 * @param iUnitEntIndex 单位
	 * @returns 返回施法距离
	 */
	GetCastRange(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位基础攻击力
	 * @param iUnitEntIndex 单位
	 * @returns 返回基础攻击力
	 */
	GetBaseAttackDamage(iUnitEntIndex: EntityIndex): number;
	/**
	* 获取单位防御
	* @param iUnitEntIndex 单位
	* @returns 返回防御
	*/
	GetArmor(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位基础防御
	 * @param iUnitEntIndex 单位
	 * @returns 返回基础防御
	 */
	GetBaseArmor(iUnitEntIndex: EntityIndex): number;
	/**
	 * 判断单位是否有英雄属性
	 * @param iUnitEntIndex 单位
	 * @returns 返回是否有英雄属性
	 */
	HasHeroAttribute(iUnitEntIndex: EntityIndex): boolean;
	/**
	 * 获取单位力量
	 * @param iUnitEntIndex 单位
	 * @returns 返回力量
	 */
	GetStrength(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位基础力量
	 * @param iUnitEntIndex 单位
	 * @returns 返回基础力量
	 */
	GetBaseStrength(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位敏捷
	 * @param iUnitEntIndex 单位
	 * @returns 返回敏捷
	 */
	GetAgility(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位基础敏捷
	 * @param iUnitEntIndex 单位
	 * @returns 返回基础敏捷
	 */
	GetBaseAgility(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位智力
	 * @param iUnitEntIndex 单位
	 * @returns 返回智力
	 */
	GetIntellect(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位基础智力
	 * @param iUnitEntIndex 单位
	 * @returns 返回基础智力
	 */
	GetBaseIntellect(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位主属性
	 * @param iUnitEntIndex 单位
	 * @returns 返回主属性
	 */
	GetPrimaryAttribute(iUnitEntIndex: EntityIndex): Attributes;
	/**
	 * 获取单位攻击速度百分比
	 * @param iUnitEntIndex 单位
	 * @returns 返回攻击速度百分比
	 */
	GetAttackSpeedPercent(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位移动速度
	 * @param iUnitEntIndex 单位
	 * @returns 返回移动速度
	 */
	GetMoveSpeed(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位技能伤害
	 * @param iUnitEntIndex 单位
	 * @returns 返回技能伤害
	 */
	GetSpellAmplify(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位冷却减少
	 * @param iUnitEntIndex 单位
	 * @returns 返回冷却减少
	 */
	GetCooldownReduction(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位闪避
	 * @param iUnitEntIndex 单位
	 * @returns 返回闪避
	 */
	GetEvasion(iUnitEntIndex: EntityIndex): number;
	/**
	 * 获取单位状态抗性
	 * @param iUnitEntIndex 单位
	 * @returns 返回状态抗性
	 */
	GetStatusResistance(iUnitEntIndex: EntityIndex): number;

	/**
	 * 获取单位的技能槽位
	 * @param iEntityIndex 单位
	 * @param iAbilityEntIndex 技能
	 * @returns 返回技能所在槽位，-1则不存在
	 */
	GetAbilityIndex(iEntityIndex: EntityIndex, iAbilityEntIndex: AbilityEntityIndex): number;
}

declare interface CScriptBindingPR_Abilities {
	/**
	 * 获取技能对应等级的金钱消耗
	 * @param iEntityIndex 技能
	 * @param iLevel 等级，选填，默认-1
	 */
	GetLevelGoldCost(iEntityIndex: AbilityEntityIndex, iLevel?: number): number;
	/**
	 * 获取技能对应等级的冷却时间
	 * @param iEntityIndex 技能
	 * @param iLevel 等级，选填，默认-1
	 */
	GetLevelCooldown(iEntityIndex: AbilityEntityIndex, iLevel?: number): number;
	/**
	 * 获取技能对应等级的魔法消耗
	 * @param iEntityIndex 技能
	 * @param iLevel 等级，选填，默认-1
	 */
	GetLevelManaCost(iEntityIndex: AbilityEntityIndex, iLevel?: number): number;
	/**
	 * 获取技能对应等级的怒气消耗
	 * @param iEntityIndex 技能
	 * @param iLevel 等级，选填，默认-1
	 */
	GetLevelEnergyCost(iEntityIndex: AbilityEntityIndex, iLevel?: number): number;
}

declare interface CScriptBindingPR_Players {
	/**
	 * 清除本地玩家选择的某个单位
	 * @param iRemoveEntIndex 单位
	 */
	RemoveSelection(iRemoveEntIndex: EntityIndex): void;

	/**
	 * 判断单位是否被玩家选择
	 * @param iEntIndex 单位
	 */
	IsEntitySelected(iEntIndex: EntityIndex): boolean;

	/**
	* 从lua client获取玩家数据
	* @param iPlayerID 玩家ID
	* @param sFuncName lua client函数名字
	*/
	GetPlayerData<T extends number | boolean>(iPlayerID: PlayerID, sFuncName: string): T | undefined;
}

declare interface CDOTA_PanoramaScript_GameUI {
	MoveCameraToEntity(nTargetEntIndex: EntityIndex): void;
}

/**
 * 计算技能升级数值结果
 * @param iEntityIndex 单位
 * @param sAbilityName 技能名字
 * @param sSpecialValueName 数值名字
 * @param fValue 计算前数值
 * @returns 计算后的数值
 */
declare function CalcSpecialValueUpgrade(iEntityIndex: EntityIndex, sAbilityName: string, sSpecialValueName: string, fValue: number): number;

/**
 * 获取物品稀有度
 * @param sItemName 物品名字
 * @returns 返回物品稀有度
 */
declare function GetItemRarity(sItemName: string): number;

/**
 * 获取物品价格
 * @param sItemName 物品名字
 * @returns 返回物品价格
 */
declare function GetItemCost(sItemName: string): number;

/**
 * 获取物品KV数据
 * @param sItemName 物品名字
 * @param sKeyName 键值名称
 * @returns 返回值
 */
declare function GetItemValue<T>(sItemName: string, sKeyName: string): T | undefined;

/**
 * 处理错误Float
 * @param f 浮点数
 */
declare function Float(f: number): number;

/**
 * 将矢量转化为字符串（方便lua端和js端通讯）
 * @param vec 矢量
 * @returns 返回以空格分隔坐标的字符串
 */
declare function VectorToString(vec: [number, number, number]): string;

/**
 * 将字符串转化为矢量（方便lua端和js端通讯）
 * @param str 空格分隔坐标的字符串
 * @returns 返回矢量
 */
declare function StringToVector(str: string): [number, number, number];

/**
 * 将技能kv里定义的AbilityBehavior转化为枚举
 * @param sBehaviors
 */
declare function SBehavior2IBehavior(sBehaviors: string): DOTA_ABILITY_BEHAVIOR;

/**
 * 将技能kv里定义的AbilityUnitTargetTeam转化为枚举
 * @param sTeam
 */
declare function STeam2ITeam(sTeam: string): DOTA_UNIT_TARGET_TEAM;

/**
 * 将技能kv里定义的AbilityUnitTargetType转化为枚举
 * @param sType
 */
declare function SType2IType(sType: string): DOTA_UNIT_TARGET_TYPE;

/**
 * 将技能kv里定义的AbilityUnitDamageType转化为枚举
 * @param sDamageType
 */
declare function SDamageType2IDamageType(sDamageType: string): DAMAGE_TYPES;

/**
 * 将技能kv里定义的SpellImmunityType转化为枚举
 * @param sSpellImmunityType
 */
declare function SSpellImmunityType2ISpellImmunityType(sSpellImmunityType: string): SPELL_IMMUNITY_TYPES;

/**
 * 特殊值对应的函数
 */
declare const tAddedProperties: { [x: string]: keyof CScriptBindingPR_Entities; };

/**
 * 将数据简化
 * @param aValues 数据数组
 */
declare function SimplifyValuesArray(aValues: number[]): number[];

/**
 * 将一串字符串以空格分隔的数值转化为数组
 * @param sValues 字符串数值
 * @returns 返回数值数组
 */
declare function StringToValues(sValues: string): number[];

/**
 * 获取技能的所有Special键
 * @param sAbilityName 技能名字
 * @param iEntityIndex 单位，选填，默认-1
 * @returns 返回Special键的数组
 */
declare function GetSpecialNames(sAbilityName: string, iEntityIndex?: EntityIndex): string[];

/**
 * 获取技能Special经过处理后的所有键值
 * @param sAbilityName 技能名字
 * @param sName 键名字
 * @param iEntityIndex 单位，选填，默认-1
 * @returns 返回一个对象：aValues-键值最终值数组;aOriginalValues-键值原值数组;aMinValues-键值最小值，可为undefined;tAddedFactors-所有附加值系数数组的对象;tAddedValues-所有附加值数值数组的对象
 */
declare function GetSpecialValuesWithCalculated(sAbilityName: string, sName: string, iEntityIndex?: EntityIndex): {
	aValues: number[],
	aOriginalValues: number[],
	aMinValues: number[] | undefined,
	aMaxValues: number[] | undefined,
	tAddedFactors: { [x: string]: number[] | undefined; },
	tAddedValues: { [x: string]: number[] | undefined; },
};

/**
 * 获取技能Special键的附加值
 * @param sAbilityName 技能名字
 * @param sName 键名字
 * @param sPropertyName 附加值名字
 * @param iEntityIndex 单位，选填，默认-1
 * @returns 返回Special键的附加值字符串
 */
declare function GetSpecialValueProperty(sAbilityName: string, sName: string, sPropertyName: string, iEntityIndex?: EntityIndex): string;

/**
 * 将官方获取的颜色integer转化为十六进制表示的颜色字符串
 * @param i 颜色integer
 * @returns 返回十六进制颜色字符串
 */
declare function intToARGB(i: number): string;

/**
 * 格式化数字显示
 * @param fNumber 数值
 * @param bSeparate 是否数值和单位分开返回，默认false
 * @param bUseScientific 是否使用科学计数法，默认false
 * @param iFixNum 小数点精度，默认2
 * @returns bSeparate为false时返回数值字符串；bSeparate为true的时候返回{ 数值, 单位字符串 }
 */
declare function formatNumByLanguage(fNumber: number, bSeparate?: boolean, bUseScientific?: boolean, iFixNum?: number): string;

/**
 * 判断物品是否被锁定
 * @param iItemEntIndex 物品EntIndex
 */
declare function IsItemLocked(iItemEntIndex: ItemEntityIndex): boolean;

/**
 * 获取物品的合成配方
 * @param sItemName 物品名字
 * @returns 返回物品所有的合成配方
 */
declare function GetItemRecipes(sItemName: string): string[][];

/**
 * 获取物品的所在的合成配方
 * @param sItemName 物品名字
 * @returns 返回物品所有所在的合成配方
 */
declare function GetItemRelatedRecipes(sItemName: string): string[][];

/**
 * 获取物品的所在的合成配方并附带结果
 * @param sItemName 物品名字
 * @returns 返回物品所有所在的合成配方以及配方的合成物品
 */
declare function GetItemRelatedRecipesWithResults(sItemName: string): [string[][], string[]];

declare interface WearablesData {
	"dummy"?: string,
	"used_by_heroes": string,
	"bundle": string,
	"item_slot": string,
	"item_rarity": string,
	"model_player"?: string,
	"item_name"?: string,
	"itemdef"?: string,
	"item_description"?: string,
	"visuals"?: {
		[key: string]: AssetModifierData | number;
	},
}
declare interface PlayerWearableData {
	sPlayerWearableIndex: string,
	sSlot: string,
	sWearableIndex: string,
	tPropertyData: { [x: string]: PlayerWearablePropertyData; },
	tGemData: { [x: string]: string; },
}

declare interface PlayerWearablePropertyData {
	attribute: string;
	value: number;
}

declare interface AssetModifierData {
	type: "activity" | "particle" | "particle_create" | "ability_icon" | "sound" | "particle_snapshot" | "entity_model" | "buff_modifier" | "response_criteria" | "portrait_background_model" | "icon_replacement_hero" | "particle_control_point" | "arcana_level" | "icon_replacement_hero_minimap";
	asset?: string,
	modifier?: string,
	style?: number,
	force_display?: number,
	force_dispawn_in_loadout_onlysplay?: number,
	minimum_priority?: number,
}

/**
 * 获取饰品信息
 * @param sHeroName 英雄名
 * @param sSlot 槽位
 */
declare function GetWearableDataByIndex(index: string): WearablesData;
/**
 * 获取英雄某个槽位的饰品列表
 * @param sHeroName 英雄名
 * @param sSlot 槽位
 */
declare function GetHeroWearableListBySlot(sHeroName: string, sSlot: string): string[];
/**
 * 获取英雄某个槽位的饰品列表
 * @param iPlayerID 玩家id
 * @param iEntIndex 单位
 * @param sPlayerWearableIndex 玩家饰品索引
 */
declare function GetPlayerWearableData(iPlayerID: PlayerID, iEntIndex: EntityIndex, sPlayerWearableIndex: string): PlayerWearableData;

declare function Transform(obj: Table, sTagName: string): any;

/**
 * 当传入Nan或者Infinity时，返回默认值
 * @param i 传入的数值
 * @param defaultVar 返回的默认值，默认为0
 */
declare function finiteNumber(i: number, defaultVar?: number): number;

/**
 * 将数据转化为数值，转入Nan或者Infinity时，返回默认值
 * @param i 传入的数据
 * @param defaultVar 返回的默认值，默认为0
 */
declare function toFiniteNumber(i: any, defaultVar?: number): number;

/**
 * 将有效的值转化为String
 * @param i 仅支持number、string和boolean转化为有效string，其余返回undefined
 */
declare function toString(i: any): string | undefined;

/**
 * 将有效的值转化为String，有默认值保留
 * @param i 传入的数据
 * @param defaultVar 返回的默认值，默认为0
 */
declare function toFiniteString<T = string>(i: any, defaultVar?: T): string | T;

interface JSON {
	/**
	 * 安全解析json字符串，错误时返回空对象{}
	 * @param text A valid JSON string.
	 * @param reviver A function that transforms the results. This function is called for each member of the object.
	 * If a member contains nested objects, the nested objects are transformed before the parent object is.
	 */
	parseSafe(text: string, reviver?: (this: any, key: string, value: any) => any): any;
}

/**
 *
 * @param entityName
 * @param data
 */
declare function WaitSceneEntityLoad<T extends keyof SceneEntityLoadData>(entityName: T, data: SceneEntityLoadData[T]): string;

declare function QueueSerialSceneEntityLoad(entityName: string, activate: () => void): string;

declare function ReleaseSerialSceneEntityLoad(entityName: string, token: string): void;

declare function StopWaitSceneEntityLoad<T extends keyof SceneEntityLoadData>(entityName: T, key: string): void;

/**
 * 获取副词条倍率
 * @param p 随机数
 * @returns 返回倍率
 */
declare function EquipmentAdverbRate(p: number): number;

/**
 * 获取副词条评分
 * @param p 随机数
 * @returns 返回评分
 */
declare function EquipmentAdverbScore(p: number): number;

/**
 * 解析装备词条
 * @param s 字符串
 * @returns 返回[词条ID, 词条随机数, 词条评分, 词条难度, 词条等级]
 */
declare function EquipmentParseEntry(s: string): [number, number, number, number, number];

/**
 * 解析装备ID
 * @param s 字符串
 * @returns 返回[EID, 稀有度, 等级, BOSS序号, 主词条ID, 锁定情况]
 */
declare function PlayerEquipmentIDSplit(s: string): [number, number, number, number, number, number];

/**
 * 解析注能石词条
 * @param p 随机数
 * @returns 返回[词条ID, 词条随机数]
 */
declare function InlaidStoneParseEntry(s: string): [number, number];

/**
 * 获取副词条倍率
 * @param p 随机数
 * @returns 返回倍率
 */
declare function InlaidStoneAdverbRate(p: number): number;

/**
 * 获取副词条评分
 * @param p 随机数
 * @returns 返回评分
 */
declare function InlaidStoneAdverbScore(p: number): number;

/**
 * 解析注能石ID
 * @param s 字符串
 * @returns 返回[词条ID, 稀有度, 词条ID]
 */
declare function PlayerInlaidStoneIDSplit(s: string): [number, number, number];

/**
 * 解析英雄装备情况
 * @param s 字符串
 * @returns 返回[英雄ID, BOSS序号]
 */
declare function PlayerHeroEquippedSplit(s: string): [number, number];

/**
 * 解析能力石ID
 * @param s 字符串
 * @returns 返回[AID, 稀有度, 英雄ID]
 */
declare function PlayerAbilityStoneIDSplit(s: string): [number, number, number];

/**
 * 解析潜能词条
 * @param s 字符串
 * @returns 返回[词条ID, 词条随机数, 词条评分, 词条难度, 词条等级]
 */
declare function PotentialParseEntry(s: string): [number, number, number, number, number];

/**
* 解析潜能ID
* @param s 字符串
* @returns 返回[PID, 稀有度, 等级, 主词条ID, 锁定情况]
*/
declare function PlayerPotentialIDSplit(s: string): [number, number, number, number, number];

/**
 * 获取副词条倍率
 * @param p 随机数
 * @returns 返回倍率
 */
declare function PotentialAdverbRate(p: number): number;

/**
 * 获取副词条评分
 * @param p 随机数
 * @returns 返回评分
 */
declare function PotentialAdverbScore(p: number): number;

/**
 * 获取射线到平面上的点
 * @param vRayStart 射线发射点
 * @param vDirection 射线方向
 * @param vPlanePoint 平面任意一点，不填则为(0,0,0)
 * @param vPlaneNormal 平面法向量，不填则为(0,0,1)
 * @returns 点
 */
declare function IsRayIntersectCube(vRayStart: Vector, vDirection: Vector, vPlanePoint?: Vector, vPlaneNormal?: Vector): Vector;

/**
 * 计算面的法线向量
 * @param faceVertices 面的点集，至少3个点以上
 */
declare function CalculateFaceNormal(faceVertices: Vector[]): Vector;

/**
 * 判断点是否在矩形内部
 * @param point
 * @param rectVertices 矩形
 */
declare function IsPointInsideRect(point: Vector, rectVertices: Rect): boolean;

/**
 * 判断射线是否与立方体相交
 * @param rayOrigin 射线发射点
 * @param rayDirection 射线方向
 * @param cubeVertices 正方体八个角坐标
 */
declare function IsRayIntersectCube(rayOrigin: Vector, rayDirection: Vector, cubeVertices: Cube): boolean;

/**
 * 将点围绕着中心点旋转
 * @param vCenter 中心点
 * @param QAngle 旋转[Pitch, Yaw, Roll]
 * @param vPosition
 * @returns
 */
declare function RotatePosition(vCenter: Vector, QAngle: QAngle | Vector, vPosition: Vector): Vector;

declare function GetRayToPlanePoint(vRayStart: Vector, vDirection: Vector, vPlanePoint?: Vector, vPlaneNormal?: Vector): Vector;
/**
 * 判断射线与AABB盒相交
 * @param rayOrigin 射线发射点
 * @param rayDirection 射线方向
 * @param aabbMin AABB盒最小边界
 * @param aabbMax AABB盒最大边界
 */
declare function IsRayIntersectAABB(rayOrigin: Vector, rayDirection: Vector, aabbMin: Vector, aabbMax: Vector): boolean;

/**
 * 获取射线与AABB盒相交的第一个交点
 * @param rayOrigin 射线发射点
 * @param rayDirection 射线方向
 * @param aabbMin AABB盒最小边界
 * @param aabbMax AABB盒最大边界
 * @returns 没有则返回undefined
 */
declare function GetRayIntersectAABBFirstPoint(rayOrigin: Vector, rayDirection: Vector, aabbMin: Vector, aabbMax: Vector): Vector | undefined;

/**
 * 获取射线到点的距离
 * @param rayOrigin 射线发射点
 * @param rayDirection 射线方向
 * @param point 点
 */
declare function GetDistanceFromRayToPoint(rayOrigin: Vector, rayDirection: Vector, point: Vector): number;

/**
 * 获取点到平面的距离
 * @param point 点
 * @param planePoint 平面任意一点
 * @param planeNormal 平面法向量
 */
declare function GetDistanceFromPointToPlane(point: Vector, planePoint: Vector, planeNormal: Vector): number;

/**
 * 向量长度
 */
declare function Vlength(v: Vector): number;

/**
 * 向量点乘
 */
declare function Vdot(v1: Vector, v2: Vector): number;

/**
 * 向量乘数字
 */
declare function Vmul(v1: Vector, f: number): Vector;

/**
 * 向量相减
 */
declare function Vsub(v1: Vector, v2: Vector): Vector;

/**
 * 向量相加
 */
declare function Vadd(v1: Vector, v2: Vector): Vector;

/**
 * 向量叉乘
 */
declare function Vcross(v1: Vector, v2: Vector): Vector;

interface HeroData {
	iGoodID: number,
	tStarEffect: {
		[iLevel: string]: {
			[x: string]: number;
		};
	},
	sAbilityName?: string,
}

interface CourierData {
	iItemDef: number,
	iItemStyle?: number,
	iRarity: number,
	sAbilityName?: string,
	tStarEffect: {
		[iLevel: string]: {
			[x: string]: number;
		};
	},
}

interface BlessingData {
	tEffect: {
		[x: string]: number;
	},
}

interface AddItemData {
	amounts: number,
	expire_type: 0 | 1 | 2 | 3 | number,
	itemId: number,
	type?: number,
	dust?: number,
	special?: number,
	new: 0 | 1,
}

interface AbilityStoneAbilityData {
	iHeroID: number,
	iAbilityUpgradeID: number,
	iCount: number,
}

interface CDOTA_PanoramaScript_CustomNetTables {
	/**
	 * 获取所有网表数据，以键值形式返回
	 * @param pTableName 网表名字
	 */
	GetAllTableValuesKV<TName extends keyof CustomNetTableDeclarations, T extends CustomNetTableDeclarations[TName]>(
		pTableName: TName,
	): NetworkedData<T>;
}


/** 取键，解决Object.keys定义问题 */
declare function keyof<T extends object>(obj: T): (keyof T)[];
/** 返回`url('file://{images}/custom_game/${relativePath}')` */
declare function getImagePath(relativePath: string | string[]): string;
/** 返回`s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex` */
declare function getSrcPath(relativePath: string | string[]): string;
declare function GetHeroInfoByGoodID(goodID: string | number): { heroID: number, heroName: string; } | undefined;
declare function GetHeroNameByGoodID(goodID: string | number): string | undefined;

declare function ClientSideEvent(eventName: string, data: any): void;
/** 发送UI端事件到所有客户端 */
declare function AllClientSideEvent<T extends string | object>(
	eventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations | keyof GameEventDeclarations,
	eventData: Table
): void;
/** 网表 */
declare function useNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined, playerID: PlayerID) => void,
	playerID: PlayerID
): NetTableListenerID;
declare function useNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined) => void,
): NetTableListenerID;
declare function ListenNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined) => void,
): NetTableListenerID;
declare function getNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	playerID?: PlayerID
): T[K] | undefined;


declare function AddCommandWithKey(
	pszCommandName: string,
	callback: (name: string, ...args: string[]) => void,
	pszDescription: string,
	nFlags: number,
): void;

declare type PlayerDataKey<T extends keyof PlayerDataType> = PlayerDataType[T];

declare function SubscribePlayerDataListener<T extends keyof PlayerDataType>(playerID: PlayerID, tableKey: T, callback: (playerID: PlayerID, data: PlayerDataKey<T> | undefined) => void): NetTableListenerID[];
declare function UnsubscribePlayerDataListener(listenerIDs: NetTableListenerID[]): void;

declare function GetPlayerData<T extends keyof PlayerDataType>(playerID: PlayerID, tableKey: T): PlayerDataKey<T> | undefined;
declare function GetAllPlayerData<T extends keyof PlayerDataType>(tableKey: T): Record<PlayerID, PlayerDataKey<T> | undefined>;

/**
 * 获取随机字符串
 * @param string 基础字符串
 */
declare function DoUniqueString(string?: string): string;

/**
 * 设置临时数据，可以跨域传输
 * @param data 数据
 * @param key 键值，不填会随机生成随机字符串
 * @returns 返回key
 */
declare function SetTempData<T>(data: T, key?: string): string;

/**
 * 获取临时数据，获取成功会返回并且删除数据
 * @param key 使用SetTempData返回的字符串
 * @returns 数据
 */
declare function GetTempData<T>(key: string): T | undefined;

declare interface ReplaceValuesOption {
	// 用于计算动态数值
	UnitEntIndex?: EntityIndex;
	// 用于显示公式计算结果和一些更多信息
	ShowExtra?: boolean;
	// 是否为描述，描述的性质是不会显示公式，而是直接显示最终值
	IsDescription?: boolean;
	// 仅显示当前等级的数值
	OnlyCurrentLevelValue?: boolean;
	// 技能伤害类型
	AbilityDamageType?: DAMAGE_TYPES;
}
/** @deprecated */
declare function ShowComfirmPopup(msg: string, onConfirm: () => void): string;
/** 网表，但是套的netdata的定义，因为是json所以会保留array
 * @param playerID -1时，会监听所有玩家
 */
declare function useServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	callback: (data: NetDataDeclarations[TName], playerID: PlayerID) => void,
	playerID: PlayerID
): NetTableListenerID;
/** playerID传入-1代表所有玩家 */
declare function useServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	callback: (data: NetDataDeclarations[TName]) => void,
): NetTableListenerID;
/** 网表，但是套的netdata的定义，因为是json所以会保留array */
declare function getServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	playerID?: Omit<PlayerID, -1>
): NetDataDeclarations[TName] | undefined;
/** playerID传入-1代表所有玩家 */
declare function getServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	playerID: -1
): Record<PlayerID, NetDataDeclarations[TName]> | undefined;
declare enum CustomItemType {
	EQUIPMENT, // 装备
	ABILITY_BOOK, // 技能书
	DEVOUR, // 神佑宝石
	HERCULES, // 海格力斯
	DIVINE, // 法宝
	SPECIAL_DIVINE, // 特殊法宝
	BASE, // 基地相关
	CHEST, // 宝箱
	CASTING, // 铸造
	TREAUSURE_MAP, // 藏宝图
	OTHER, // 其他
	SEED, // 种子
	CASTING_BROKE, // 尘封的铸造
	FISH, // 鱼
	TREASURE, // 宝物
	ZODIAC, // 星宫
	EX_EQUIPMENT, // EX装备
	SHARD, // 阿哈利姆魔晶和神杖
	SPECIAL_DIVINE_PLUS // 特殊法宝plus版
}

declare enum CustomAbilityType {
	HERO, // 英雄自带技能
	TALENT, // 天赋
	LEARNABLE, // 可以学习的
	COURIER, // 信使技能
	OTHER, // 其他未分类
}


declare function ColorGradientLinear(color1: [number, number, number], color2: [number, number, number], t: number): [number, number, number];

declare function ColorToHexString(color: [number, number, number]): string;

declare function GetGreeks(number: number): string;

declare const RARITY_COLOR: Record<number, string>;

declare function WaitPromise(iTime: number): Promise<void>;
declare const AttributeIcon: Record<string, string>;

declare function getBPSeason(): number;

declare interface ServerEquipmentContextMenu extends Panel {
	RegisterAction(menus: Record<string, (button: Button) => void>): void;
	SetEquipment(equipmentID: number): void;
}

declare interface ServerCourierContextMenu extends Panel {
	RegisterAction(menus: Record<string, (button: Button) => void>): void;
	SetCourier(courierID: string): void;
}
