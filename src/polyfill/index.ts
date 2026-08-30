let CustomUIConfig = GameUI.CustomUIConfig();
let KeyValues = GameUI.CustomUIConfig();
let Storage = GameUI.CustomUIConfig().Storage;
let Timer = GameUI.CustomUIConfig().Timer;
let STEAM_WEB_KEY = "D34B40626FBA6E482A7653E4FB8A80CB";
enum Digit {
	"K" = 1,
	"M" = 2,
	"G" = 3,
	"T" = 4,
	"P" = 5,
	"E" = 6,
	"Z" = 7,
	"Y" = 8,
	"R" = 9,
}

// 中文单位
enum DigitSchinese {
	"万" = 1,
	"亿" = 2,
	"兆" = 3,
	"京" = 4,
	"垓" = 5,
	"秭" = 6,
	"穰" = 7,
	"沟" = 8,
	"涧" = 9,
}
interface CDOTA_PanoramaScript_GameEvents {
	/**
	 * Send a custom game event. 不要直接使用SendCustomGameEventToServer，会有观战问题
	 *
	 * @example
	 * // Separate definition
	 * interface CustomGameEventDeclarations {
	 *     custom_event: { field: string };
	 * }
	 *
	 * GameEvents.SendCustomEventToServer("custom_event", { field: "foo" });
	 *
	 * @example
	 * // Inline type definition
	 * GameEvents.SendCustomEventToServer<{ field: string }>("custom_event", { field: "foo" });
	 */
	SendCustomEventToServer<T extends string | object>(
		pEventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations,
		eventData: GameEvents.InferCustomGameEventType<T, never>,
	): void;
}
GameEvents.SendCustomEventToServer = (pEventName, eventData) => {
	if (!(Players.GetLocalPlayer() == -1 || Players.IsSpectator(Players.GetLocalPlayer()) || Players.IsLocalPlayerLiveSpectating())) {
		GameEvents.SendCustomGameEventToServer(pEventName, eventData);
	}
};

JSON.parseSafe = function (text, reviver) {
	if (text == "") return undefined;
	try {
		return JSON.parse(text, reviver);
	} catch (error: any) {
		error.message += '\n\tparams={text:' + text + '}';
		print(error?.stack);
		return undefined;
	}
};

function print(...args: any[]) {
	if (!Game.IsInToolsMode()) {
		return;
	}
	let s = "";
	let a = [...args];

	a.forEach(e => {
		if (s != "") {
			s += "\t";
		}
		if (typeof (e) == "function" && e.length == 0) {
			e = e();
		}
		if (typeof (e) == "object") {
			s = s + JSON.stringify(e);
		} else {
			s = s + String(e);
		}
	});
	if (s.length > 2000) {
		for (let i = 0; i < s.length; i += 2000) {
			$.Msg(s.slice(i, Math.min(s.length, i + 2000)));
		}
	} else {
		$.Msg(s);
	}
}

/**
 * 四舍五入
 * @param fNumber 数值
 * @param prec 精确到小数点几位，选填，默认0
 */
function Round(fNumber: number, prec: number = 0): number {
	let i = Math.pow(10, prec);
	return Math.round(fNumber * i) / i;
}
/**
 * 区间限定函数
 * @param num 数值
 * @param min 最大值
 * @param max 最小值
 * @returns 返回限定区间的值
 */
function Clamp(num: number, min: number, max: number): number {
	return num <= min ? min : (num >= max ? max : num);
}

/**
 * 线性插值函数
 * @param percent 百分比（0~1）
 * @param a 起始值
 * @param b 结束值
 * @returns 返回插值结果
 */
function Lerp(percent: number, a: number, b: number): number {
	return a + percent * (b - a);
}
/**
 * 重映射区间函数
 * @param num 数值
 * @param a 初始区间最小值
 * @param b 初始区间最大值
 * @param c 最终区间最小值
 * @param d 最终区间最大值
 * @returns 返回重映射区间的值
 */
function RemapVal(num: number, a: number, b: number, c: number, d: number): number {
	if (a == b)
		return c;

	var percent = (num - a) / (b - a);
	return Lerp(percent, c, d);
}
/**
 * 重映射区间限定函数
 * @param num 数值
 * @param a 初始区间最小值
 * @param b 初始区间最大值
 * @param c 最终区间最小值
 * @param d 最终区间最大值
 * @returns 返回重映射区间的值
 */
function RemapValClamped(num: number, a: number, b: number, c: number, d: number): number {
	if (a == b)
		return c;

	var percent = (num - a) / (b - a);
	percent = Clamp(percent, 0.0, 1.0);

	return Lerp(percent, c, d);
}
/**
 * 在对象里寻找值
 * @param o 对象
 * @param v 值
 * @returns 返回值的key，无此值则返回undefined
 */
function FindKey(o: any, v: any): string | undefined {
	for (var k in o) {
		if (o[k] == v)
			return k;
	}
}
/** 处理错误Float */
function Float(f: number): number {
	return Math.round(f * 10000) / 10000;
}
/**
 * 将矢量转化为字符串（方便lua端和js端通讯）
 * @param vec 矢量
 * @returns 返回以空格分隔坐标的字符串
 */
function VectorToString(vec: [number, number, number]): string {
	return vec.join(" ");
}
/**
 * 将字符串转化为矢量（方便lua端和js端通讯）
 * @param str 空格分隔坐标的字符串
 * @returns 返回矢量
 */
function StringToVector(str: string): [number, number, number] {
	let a = str.split(" ");
	return [Number(a[0]), Number(a[1]), Number(a[2])];
}

/**
 * 递归打印对象结构
 * @param obj 要打印的对象
 * @param name 对象名称
 * @param str 缩进字符串
 * @param map 已访问对象的映射，用于避免循环引用
 */
function alertObj(obj: any, name?: string, str?: string, map?: Map<any, boolean>): void {
	if (!Game.IsInToolsMode()) {
		return;
	}
	let output = "";
	if (name == null) {
		name = toString(obj);
	}
	if (str == null) {
		str = "";
	}

	if (map == null) {
		map = new Map();
	}
	map.set(obj, true);

	$.Msg(str + name + "\n" + str + "{");
	for (let k in obj) {
		let property = obj[k];
		if (typeof (property) == "object") {
			if (map.get(property)) {
				$.Msg(str + "\t" + k + " = [already seen]");
				continue;
			}
			alertObj(property, k, str + "\t", map);
		} else {
			output = k + " = " + property + "\t(" + typeof (property) + ")";
			$.Msg(str + "\t" + output);
		}
	}
	$.Msg(str + "}");
}

/**
 * 深度打印对象的所有属性和结构
 * @param obj 要打印的对象
 */
function DeepPrint(obj: any): void {
	return alertObj(obj);
}
/**
 * 符号分割器 - 将内容按指定分隔符分割并转换为对象
 * @param content 要分割的内容
 * @param symbol1 第一级分隔符
 * @param symbol2 第二级分隔符
 * @returns 分割后的对象
 */
function SymbolSpliter(content: string, symbol1: string, symbol2: string): Record<string, string> {
	return Object.fromEntries(
		content.split(symbol1).map(str => {
			return str.split(symbol2);
		})
	);
}

/** 获取当前语言
 * @returns 当前语言字符串（仅返回 english、russian 或 schinese）
 */
function Language() {
	// 获取当前语言的逻辑
	let language = $.Language().toLowerCase();
	// 只返回english, russian和schinese两种语言，其他语言均返回english
	if (language !== "russian" && language !== "schinese") {
		language = "english";
	}
	return language;
}

interface CustomUIConfig {
	_unique_id: number;
	_scene_load_serial_queue?: Record<string, { token: string; activate: () => void; }[]>;
	_scene_load_serial_active?: Record<string, string | undefined>;
}

CustomUIConfig._unique_id = CustomUIConfig._unique_id || 0;
/**
 * 获取随机字符串
 * @param {string} string 基础字符串
 * @returns {string}
 */
function DoUniqueString(string?: string | number): string {
	return `${string}${CustomUIConfig._unique_id++}`;
};

function EnsureSceneLoadSerialState() {
	CustomUIConfig._scene_load_serial_queue = CustomUIConfig._scene_load_serial_queue || {};
	CustomUIConfig._scene_load_serial_active = CustomUIConfig._scene_load_serial_active || {};
	return {
		queue: CustomUIConfig._scene_load_serial_queue,
		active: CustomUIConfig._scene_load_serial_active,
	};
}

function TryStartNextSerialSceneLoad(entityName: string) {
	const state = EnsureSceneLoadSerialState();
	if (state.active[entityName] !== undefined) {
		return;
	}
	const queue = state.queue[entityName];
	if (queue == undefined || queue.length == 0) {
		return;
	}
	const next = queue.shift();
	if (next == undefined) {
		return;
	}
	state.active[entityName] = next.token;
	next.activate();
}

function QueueSerialSceneEntityLoad(entityName: string, activate: () => void): string {
	const token = DoUniqueString(`${entityName}_serial_scene_load_`);
	const state = EnsureSceneLoadSerialState();
	if (state.queue[entityName] == undefined) {
		state.queue[entityName] = [];
	}
	state.queue[entityName].push({ token, activate });
	TryStartNextSerialSceneLoad(entityName);
	return token;
}

function ReleaseSerialSceneEntityLoad(entityName: string, token: string): void {
	const state = EnsureSceneLoadSerialState();
	if (state.active[entityName] == token) {
		state.active[entityName] = undefined;
		TryStartNextSerialSceneLoad(entityName);
		return;
	}
	const queue = state.queue[entityName];
	if (queue == undefined) {
		return;
	}
	for (let i = 0; i < queue.length; i++) {
		if (queue[i].token == token) {
			queue.splice(i, 1);
			break;
		}
	}
}

/** 保存数据到面板的Data属性中
 * @param panel 目标面板
 * @param key 键
 * @param value 值
 */
function SaveData(panel: Panel, key: string, value: any) {
	(panel.Data() as any)[key] = value;
};

/** 从面板的Data属性中加载数据
 * @param panel 目标面板
 * @param key 键
 * @returns 值
 */
function LoadData(panel: Panel, key: string) {
	return (panel.Data() as any)[key];
};

/** 返回`url('file://{images}/custom_game/${relativePath}')` */
function getImagePath(relativePath: string | string[]) {
	if (typeof relativePath == "string") {
		return `url('file://{images}/custom_game/${relativePath}')`;
	} else {
		return `url('file://{images}/custom_game/${relativePath.join("/")}')`;
	}
}
/** 返回`s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex` */
function getSrcPath(relativePath: string | string[]) {
	if (typeof relativePath == "string") {
		return `s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex`;
	} else {
		return `s2r://panorama/images/custom_game/${relativePath.join("/").replace(".png", "_png")}`;
	}
}
function ToggleWindow(windowName: string, state?: boolean, data?: any) {
	ClientSideEvent("custom_ui_toggle_windows", { windowName, state, data });
}
/** 封装客户端消息 */
function useToggleWindow(windowName: string, value: any, setter: any) {
	return GameEvents.Subscribe("custom_ui_toggle_windows", (eventData) => {
		if (eventData.windowName == windowName) {
			if (eventData.state === undefined) {
				setter(!value());
			} else {
				//@ts-ignore
				setter(eventData.state == 1 || eventData.state === true);
			}
		} else {
			setter(false);
		}
	});
}
/** 发送UI端事件到客户端 */
function ClientSideEvent(eventName: string, eventData: any) {
	GameEvents.SendEventClientSide("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 发送UI端事件到所有客户端 */
function AllClientSideEvent(eventName: string, eventData: any) {
	GameEvents.SendCustomGameEventToAllClients<any>("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 封装客户端消息 */
interface ClientSideEventData {
	event_name: string;
	event_data: string;
}
/** 封装客户端消息，轻量化使用，现写现用所以不写定义 */
function useClientSideEvent(eventName: string, callback: (data: any) => void): GameEventListenerID {
	return GameEvents.Subscribe<ClientSideEventData>("client_side_event", (eventData) => {
		if (eventName == eventData.event_name) {
			callback(JSON.parseSafe(eventData.event_data));
		}
	});
}
function ShowContextMenu(panel: Panel, name: string, showArrow: boolean = true) {
	let contextMenu = $.CreatePanel("ContextMenuScript", panel, "");
	if (showArrow) {
		contextMenu.AddClass("ContextMenuBlackArrow");
	}
	contextMenu.GetContentsPanel().BLoadLayout(`file://{resources}/layout/custom_game/context_menus/${name}.xml`, false, false);
	return contextMenu.GetContentsPanel();
}
function HideContextMenu() {
	$.DispatchEvent("DismissAllContextMenus");
}

function CallAction<TName extends keyof ServiceActionConfig>(actionName: TName, params: ServiceActionConfig[TName]["params"]): void {
	GameEvents.SendCustomEventToServer("call_action", {
		actionName,
		params: JSON.stringify(params)
	});
}

function CallActionRequest<K extends keyof ServiceActionConfig>(
	action: K,
	params: ServiceActionConfig[K]["params"],
	callback: (result: ServiceActionConfig[K]["result"]) => void,
	onTimeOut?: () => void,
	showAddItem?: boolean
) {
	ServerRequest("call_action_request", {
		action: action,
		action_params: params,
		showAddItems: showAddItem ?? true
	}, (result: any) => {
		callback(result);
	}, undefined, onTimeOut);
}

function finiteNumber(i: any, defaultVar = 0) {
	return isFinite(i) ? i : defaultVar;
}

function toFiniteNumber(i: any, defaultVar = 0) {
	return finiteNumber(Number(i), defaultVar);
}

function toString(i: any) {
	let t = typeof i;
	return (t == "number" || t == "string" || t == "boolean") ? String(i) : undefined;
}
function toFiniteString<T = string>(i: any, defaultVar: string = ""): string | T {
	return toString(i) ?? defaultVar;
}

/** 调用Lua客户端全局函数，有返回值 */
function CallLuaClientFunction(funcName: string, ...args: any[]) {
	let t = ClientRequest("call_lua_client_function", {
		func_name: funcName,
		args_json: JSON.stringify(args)
	});
	return t?.value;
};

function CallLuaClientAction(funcName: string, ...args: any[]) {
	GameEvents.SendEventClientSide("call_lua_client_action", {
		func_name: funcName,
		json: JSON.stringify(args),
	});
};

function GetCursorEntity(aPosition = GameUI.GetCursorPosition()) {
	let targets = GameUI.FindScreenEntities(aPosition);
	let world_position = GameUI.GetScreenWorldPosition(aPosition);
	if (world_position == undefined) return -1;
	let targets1 = targets.filter((e) => {
		return e.accurateCollision;
	});
	let targets2 = targets.filter((e) => {
		return !e.accurateCollision;
	});
	targets = targets1;
	if (targets1.length == 0) {
		targets = targets2;
	}
	if (targets.length == 0) {
		return -1;
	}
	targets.sort((a, b) => {
		let a_loc = Entities.GetAbsOrigin(a.entityIndex);
		let b_loc = Entities.GetAbsOrigin(b.entityIndex);
		return Game.Length2D(a_loc, world_position) - Game.Length2D(b_loc, world_position);
	});
	return targets[0].entityIndex;
};

/** steam短id转长id */
function Steam_3_64(steamid_3: string) {
	return "7656" + (parseFloat(steamid_3) + 1197960265728);
}

/** steam长id转短id */
function Steam_64_3(steamid_64: string) {
	return "" + (parseFloat((steamid_64 + "").substring(4)) - 1197960265728);
}


/** 显示一个popup，data中可以传入PopupID指定ID，如果已经存在则不会重新创建，group可以用closePopupGroup来批量关闭 */
function ShowPopup<T extends PopupName>(popupName: T, data: ExcludeFunctions<GetPopupProps<T>>): string {
	//@ts-ignore
	const PopupID = data.PopupID ?? DoUniqueString("Popup");
	GameEvents.SendEventClientSide("client_side_event", { event_name: "show_popup", event_data: JSON.stringify(Object.assign(data, { popupName: popupName, PopupID: PopupID })) });
	return PopupID;
}
/** 关闭一个popup */
function ClosePopup(PopupID: string) {
	GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup_fadeout", event_data: { PopupID } });
	$.Schedule(0.2, () => {
		GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup", event_data: { PopupID } });
	});
}
/** 关闭一个popup组 */
function ClosePopupGroup(group: string) {
	GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup_fadeout", event_data: { group } });
	$.Schedule(0.2, () => {
		GameEvents.SendEventClientSide("client_side_event", { event_name: "close_popup", event_data: { group } });
	});
}
/**
 *
 * @param entityName
 * @param data
 */
function WaitSceneEntityLoad<T extends keyof SceneEntityLoadData>(entityName: T, data: SceneEntityLoadData[T]): string {
	let key = DoUniqueString("WaitSceneEntityLoad");
	GameEvents.SendEventClientSide("wait_scene_entity_load", {
		name: entityName,
		key: key,
		data: JSON.stringify(data),
	});
	return key;
}

function StopWaitSceneEntityLoad<T extends keyof SceneEntityLoadData>(entityName: T, key: string): void {
	GameEvents.SendEventClientSide("wait_scene_entity_load", {
		name: entityName,
		key: key,
	});
}
/**
 *  将键值对序列化为URLQuery格式
 * @param data 
 */
function URLQuerySerialize(data: Record<string, string | number>): string {
	let stringList = [];
	let first = true;
	for (const k in data) {
		const v = data[k];
		if (!(typeof v == "string" || typeof v == "number")) {
			continue;
		}
		if (!first) {
			stringList.push("&");
		} else {
			first = false;
		}
		stringList.push(`${k}=${encodeURIComponent(String(v))}`);
	}
	return stringList.join("");
}

/**
 * 显示自定义Tooltip
 * @param {Panel} 面板
 * @param {string} 名字
 */
function ShowCustomTooltip(panel: Panel, name: string, data: { [key: string]: string | number; }) {
	$.DispatchEvent("UIShowCustomLayoutParametersTooltip", panel, name, "file://{resources}/layout/custom_game/tooltips/" + name + ".xml", URLQuerySerialize(data));
}

/**
 * 隐藏自定义Tooltip
 * @param {Panel} 面板
 * @param {string} 名字
 */
function HideCustomTooltip(panel: Panel, name: string) {
	$.DispatchEvent("UIHideCustomLayoutTooltip", panel, name);
}

function ToColor(text: string, color: string): string {
	return "<font color='" + color + "'>" + text + "</font>";
}

/**
 * 通过英雄ID获取DOTA2英雄名字
 * @param iHeroID 英雄ID
 * @returns DOTA2英雄名字
 */
function GetHeroNameByHeroID(heroID: HeroID) {
	for (let heroName in CustomUIConfig.npc_heroes_custom) {
		if (heroName != "Version") {
			// @ts-ignore
			let tHeroData = CustomUIConfig.npc_heroes_custom[heroName];
			if (tHeroData && Number(tHeroData.HeroID) == heroID) {
				return heroName;
			}
		}
	}
}

/**
 * 通过DOTA2英雄名字获取英雄ID
 * @param iHeroID 英雄ID
 * @returns DOTA2英雄名字
*/
function GetHeroIDByHeroName(heroName: string) {
	for (let sHeroName in CustomUIConfig.npc_heroes_custom) {
		if (sHeroName == heroName) {
			// @ts-ignore
			let tHeroData = CustomUIConfig.npc_heroes_custom[sHeroName];
			return Number(tHeroData.HeroID) as HeroID;
		}
	}
}

/**
 * 返回多个参数中第一个不为0的参数，一般用于多条件排序
 * @example 先以a降序，a相同的再以b降序
 * ```ts
 * array.sort((object_a, object_b) => {
 * 	return multiCompare(
 * 		object_b.a - object_a.a,
 * 		object_b.b - object_a.b,
 * 	);
 * });
 * ```
 */
function multiCompare(...args: number[]): number {
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg != 0) {
			return arg;
		}
	}
	return args[args.length - 1];
}

/**
 * 发送错误信息
 * @param msg 错误信息
 * @param sound 音效，选填，默认"General.CastFail_Custom"
 */
function ErrorMessage(msg: string, sound = "CastFail_Custom") {
	GameUI.SendCustomHUDError(msg, sound);
}

function intToARGB(i: number): string {
	return ('00' + (i & 0xFF).toString(16)).substr(-2) +
		('00' + ((i >> 8) & 0xFF).toString(16)).substr(-2) +
		('00' + ((i >> 16) & 0xFF).toString(16)).substr(-2) +
		('00' + ((i >> 24) & 0xFF).toString(16)).substr(-2);
}

$.RandomInt = function (n, m) {
	// 修正为左闭右闭区间 [n, m]
	let random = RemapValClamped(Math.random(), 0, 1, n, m + 1);
	return Math.floor(random);
};

$.RandomFloat = function (n, m) {
	let random = RemapValClamped(Math.random(), 0, 1, n, m);
	return random;
};

$.RollPercentage = function (percent) {
	return RemapValClamped(Math.random(), 0, 1, 0, 100) < percent;
};

/** 
 * 是否有某个资源 
 * @param path 资源路径，`panorama/images/custom_game/tokens/510004.png` 或 `resource/flash3/images/spellicons/vespera_1.png`
 */
function HasResource(path: string): boolean {
	// @ts-ignore
	const list = GameUI.CustomUIConfig().src_list;
	const normalized = path.startsWith("raw://") ? path.substring("raw://".length) : path;
	if (Array.isArray(list)) {
		return list.indexOf(normalized) !== -1;
	}
	return list?.[normalized] != undefined;
}

/** 获取图标路径 */
function GetTexturePath(name?: string) {
	if (!name) return;
	if (name.startsWith("item_")) {
		const rawPath = `resource/flash3/images/items/${name.substring(5)}.png`;
		if (HasResource(rawPath)) {
			return "raw://" + rawPath;
		}
		return `file://{images}/items/${name.substring(5)}.png`;
	}
	const rawPath = `resource/flash3/images/spellicons/${name}.png`;
	if (HasResource(rawPath)) {
		return "raw://" + rawPath;
	}
	return `file://{images}/spellicons/${name}.png`;
}

/** 跳转到指定菜单
 * @param events 包含window_name和menu字段的对象，
 * window_name 是要跳转的窗口， MenuButton_ + 菜单名，
 * menu 是要跳转的菜单（如果有的话），
 * menu2 是要跳转的二级菜单（如果有的话），
 * force 是是否强制跳转（如果为true则无论当前窗口状态如何都会跳转并打开窗口）
 * @example
 * JumpToMenu({ window_name: "MenuButton_hero", menu: "HeroTalent" });
 */
function JumpToMenu(events: {
	window_name: string,
	menu?: string,
	menu2?: string,
	force?: boolean,
	data?: any,
}) {
	if ((events.window_name === "store" || events.window_name === "MenuButton_store")
		&& (getServiceNetData("open_shop", Game.GetLocalPlayerID())?.value !== true)) {
		return;
	}
	if (!events.window_name.startsWith("MenuButton_")) {
		events.window_name = "MenuButton_" + events.window_name;
	}
	ClientSideEvent("toggle_window_tag", events);
}

/**
 * 根据属性配置的聚合策略，将当前累计值与新值聚合计算
 * 通过 ClientRequest 调用 Lua 客户端的 PropertySystem.AggregatePropertyValues 完成实际计算
 *
 * 聚合策略示例：
 * - SUM：直接相加（如伤害强度）
 * - MULTIPLY：乘算，((1+current*0.01)*(1+value*0.01)-1)*100
 * - MAX：取较大值
 *
 * @param propertyId 属性系统中的属性ID（如 "damage_intensity"），用于查找对应的聚合策略
 * @param current 当前已累计的值
 * @param value 本次新增的值
 * @returns 聚合后的结果值
 */
function CalculatePropertyValue(propertyId: string, current: number, value: number) {
	return CallLuaClientFunction("CalculatePropertyValue", propertyId, current, value);
}

function FormatNumber(fNumber: number, prec?: number): string {
	let [a, b] = FormatNumberBase(fNumber, prec);
	if (b) {
		return a + b;
	}
	return a;
}

function NumberToString(fNumber: number) {
	let sNumber = String(fNumber);
	if (sNumber.indexOf("e+") != -1) {
		let s = sNumber.split("e+");
		s[0] = s[0].replace(/\./g, "");
		let n = finiteNumber(Number(s[1])) + 1;
		for (let index = s[0].length; index < n; index++) {
			s[0] += "0";
		}
		sNumber = s[0];
	}
	return sNumber;
}

function FormatNumberBase(fNumber: number, prec?: number): [string, string?] {
	let sSign = fNumber < 0 ? "-" : "";
	fNumber = Math.abs(fNumber);
	let sNumber = NumberToString(Math.abs(fNumber));
	let a = sNumber.split(".");
	let sInteger = a[0];
	let sLanguage = $.Language().toLowerCase();
	if (sLanguage == "schinese") {
		let n = Math.floor((sInteger.length - 1) / 4);
		if (n == 0) {
			return [sSign + NumberToString(Round(fNumber, prec))];
		}
		sNumber = NumberToString(Round(fNumber / Math.pow(10000, n), prec));
		let sDigit = DigitSchinese[n];
		if (sDigit == undefined) {
			sDigit = `e+${4 * n}`;
		}
		return [sSign + sNumber, sDigit];
	} else {
		let n = Math.floor((sInteger.length - 1) / 3);
		if (n == 0) {
			return [sSign + NumberToString(Round(fNumber, prec))];
		}
		sNumber = NumberToString(Round(fNumber / Math.pow(1000, n), prec));
		let sDigit = Digit[n];
		if (sDigit == undefined) {
			sDigit = `e+${3 * n}`;
		}
		return [sSign + sNumber, sDigit];
	}
}

// 自定义 polyfill 初始化
!(function () {
	// polyfill 初始化逻辑
} as any)();
