/**
 * Service NetTable Helper - Talent Module
 *
 * 专门处理 NetTable 数据解析和访问
 *
 * @module service_netdata_helper
 */

import { Accessor, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { createServiceNetData } from "../../utils/solid_utils";

type MaybeAccessor<T> = T | Accessor<T | undefined>;
type PlayerInfoTargetProps = {
	steamID?: MaybeAccessor<string | number>;
	steam64ID?: MaybeAccessor<string | number>;
	playerID?: MaybeAccessor<PlayerID>;
};

export type PlayerInfoCacheData = ManagedPlayerInfoData;
// ============== 核心工具函数 ==============

/**
 * 安全解析JSON字符串
 * @param jsonString JSON字符串
 * @param defaultValue 解析失败时的默认值
 * @returns 解析后的对象或默认值
 *
 * @example
 * parseJSONSafe('{"a":1,"b":2}', {}) // {a: 1, b: 2}
 * parseJSONSafe('invalid', {}) // {}
 * parseJSONSafe('null', {}) // {}
 */
export function parseJSONSafe<T>(jsonString: string | null | undefined, defaultValue: T): T {
	if (!jsonString || jsonString === "null" || jsonString === "undefined") {
		return defaultValue;
	}

	try {
		const parsed = JSON.parse(jsonString);
		return parsed || defaultValue;
	} catch (e) {
		print(`[parseJSONSafe] Failed to parse JSON: ${e}`);
		return defaultValue;
	}
}

type ShopOwnedUpgradeItem = {
	itemName: string;
	level: number;
	rank: number;
};

type ShopItemUpgradeInfo = {
	owned: ShopOwnedUpgradeItem;
	targetRank: number;
	isUpgrade: boolean;
};

export function getShopItemBaseCost(itemName: string, rarity: number, fallbackCost = 0): number {
	let cost: number | undefined;
	const itemKV = KeyValues.npc_items_custom[itemName];
	if (itemKV != undefined && itemKV.GoldCost != undefined && String(itemKV.GoldCost) != "") {
		const costList = String(itemKV.GoldCost).split(" ").map((c: string) => parseInt(c));
		cost = costList[Math.min(costList.length - 1, rarity - 1)];
	}
	return cost ?? SHOP_RARITY_COST[rarity] ?? fallbackCost;
}

export function getShopDiscountPercent(heroIndex: EntityIndex): number {
	return Entities.IsValidEntity(heroIndex) ? Entities.GetPropertyValue(heroIndex, "shop_discount") : 0;
}

export function getDiscountedShopItemCost(heroIndex: EntityIndex, itemName: string, rarity: number, fallbackCost = 0): number {
	const cost = getShopItemBaseCost(itemName, rarity, fallbackCost);
	if (cost <= 0) {
		return 0;
	}
	const discountPercent = getShopDiscountPercent(heroIndex);
	return Math.max(0, Math.ceil(cost * (1 - discountPercent * 0.01)));
}

/**
 * 获取商店物品对指定单位是否构成“升级链购买”。
 *
 * 返回值只描述升级链关系：
 * - `undefined`：目标物品不属于升级链，或单位身上没有同组旧物品
 * - `isUpgrade === true`：本次购买属于补差价升级
 * - `isUpgrade === false`：单位已拥有同级或更高阶物品，展示价格应为 0
 *
 * 当 `heroIndex` 非法时，会自然退化为 `undefined`。
 */
export function getShopItemUpgradeInfo(heroIndex: EntityIndex, itemName: string): ShopItemUpgradeInfo | undefined {
	const itemKV = KeyValues.npc_items_custom[itemName];
	const targetGroup = String(itemKV?.UpgradeGroup ?? "");
	const targetRank = Number(itemKV?.UpgradeRank ?? 0);
	if (targetGroup == "" || targetRank <= 0) {
		return undefined;
	}
	const unitData = getNetDataKey("unit", String(heroIndex)) ?? { items: [] as Array<{ itemName: string; level: number; }> };
	let owned: ShopOwnedUpgradeItem | undefined;
	for (const item of unitData.items ?? []) {
		const ownedKV = KeyValues.npc_items_custom[item.itemName];
		if (String(ownedKV?.UpgradeGroup ?? "") != targetGroup) {
			continue;
		}
		const rank = Number(ownedKV?.UpgradeRank ?? 0);
		if (owned == undefined || rank > owned.rank) {
			owned = { itemName: item.itemName, level: item.level, rank };
		}
	}
	if (owned == undefined) {
		return undefined;
	}
	return {
		owned,
		targetRank,
		isUpgrade: owned.rank < targetRank,
	};
}

/**
 * 获取商店物品对指定单位的最终展示价格。
 *
 * 这个接口统一处理：
 * - 基础价格读取
 * - 商店折扣
 * - 神器升级链补差价
 *
 * 当 `heroIndex` 非法时，会自动退化为“无折扣、无升级链”的基础价格。
 */
export function getShopItemDisplayCost(heroIndex: EntityIndex, itemName: string, rarity: number, fallbackCost = 0): number {
	const upgradeInfo = getShopItemUpgradeInfo(heroIndex, itemName);
	if (upgradeInfo != undefined) {
		if (!upgradeInfo.isUpgrade) {
			return 0;
		}
		return Math.max(
			0,
			getDiscountedShopItemCost(heroIndex, itemName, rarity, fallbackCost)
			- getDiscountedShopItemCost(heroIndex, upgradeInfo.owned.itemName, upgradeInfo.owned.level, fallbackCost)
		);
	}
	return getDiscountedShopItemCost(heroIndex, itemName, rarity, fallbackCost);
}

// ============== 天赋数据专用 ==============

/**
 * 天赋等级映射类型
 */
export type TalentLevels = Record<string, number>;

/**
 * 获取指定天赋的等级
 * @param talentId 天赋ID
 * @param talentLevels 天赋等级映射
 * @returns 天赋等级（不存在则返回0）
 *
 * @example
 * const levels = { fireball: 5, frostbolt: 3 };
 * getTalentLevel("fireball", levels) // 5
 * getTalentLevel("lightning", levels) // 0
 */
export function getTalentLevel(talentId: string, talentLevels: TalentLevels): number {
	return talentLevels[talentId] ?? 0;
}

/**
 * 获取玩家天赋等级数据
 * @param playerID 玩家ID（默认本地玩家）
 * @returns 响应式的天赋等级 Signal
 *
 * @example
 * const talentLevels = useTalentLevels();
 * talentLevels()["fireball"] // 5
 */
export function useTalentLevels(playerID = Game.GetLocalPlayerID()) {
	function Parse(data: any) {
		const talentsStr = data?.talents;
		return parseJSONSafe<TalentLevels>(talentsStr, {});
	}

	const playerTalent = createServiceNetData("player_talent", playerID);
	return createMemo<TalentLevels>(() => Parse(playerTalent()));
}

/**
 * 玩家账号等级
 */
export interface PlayerAccountLevel {
	level: number;
	extra_exp: number;
}

/**
 * 获取玩家账号等级信息
 * @param levelType 等级类型，从 NetDataDeclarations['player_account_levels'] 的键中获取（默认 "hero_level"）
 * @param playerID 玩家ID（默认本地玩家）
 * @returns 响应式的账号等级 Signal
 *
 * @example
 * // 获取英雄等级
 * const heroLevel = usePlayerAccountLevel("hero_level");
 * heroLevel().level // 50
 *
 * // 获取装备突破等级
 * const breakLevel = usePlayerAccountLevel("equip_break_level");
 * breakLevel().level // 30
 */
export function usePlayerAccountLevel(
	levelType: keyof NetDataDeclarations['player_account_levels'] = "hero_level",
	playerID = Game.GetLocalPlayerID()
) {
	function Parse(data: any) {
		return data?.[levelType] ?? { level: 1, extra_exp: 0 };
	}

	const playerAccountLevels = createServiceNetData("player_account_levels", playerID);
	return createMemo<PlayerAccountLevel>(() => Parse(playerAccountLevels()));
}

/**
 * 获取玩家当前已解锁的最大普通难度
 * @param playerID 玩家ID（默认本地玩家）
 * @returns 响应式的最大难度 Signal
 *
 * @example
 * const maxDiff = usePlayerMaxDiff();
 * maxDiff() // 8
 */
export function usePlayerMaxDiff(playerID = Game.GetLocalPlayerID()) {
	function Parse(data: any) {
		return toFiniteNumber(data?.max_diff, 0);
	}

	const playerCommonMatchData = createServiceNetData("player_common_match_data", playerID);
	return createMemo<number>(() => Parse(playerCommonMatchData()));
}

/**
 * 获取玩家当前已解锁的最大深渊难度
 * @param playerID 玩家ID（默认本地玩家）
 * @returns 响应式的最大深渊难度 Signal
 */
export function usePlayerMaxAbyssalDiff(playerID = Game.GetLocalPlayerID()) {
	function Parse(data: any) {
		let maxDiff = 0;
		for (const [diffText, info] of Object.entries(data ?? {})) {
			//@ts-ignore
			if ((info?.star ?? 0) <= 0) {
				continue;
			}
			const diff = toFiniteNumber(diffText, 0);
			if (diff > maxDiff) {
				maxDiff = diff;
			}
		}
		return maxDiff;
	}

	const playerAbyssalFirstPasses = createServiceNetData("player_abyssal_first_passes", playerID);
	return createMemo<number>(() => Parse(playerAbyssalFirstPasses()));
}

// ============== 信使数据专用 ==============



/**
 * 获取玩家信使数据
 * @param playerID 玩家ID（默认本地玩家）
 * @returns 响应式的信使数据 Signal
 *
 * @example
 * const playerCouriers = usePlayerCouriers();
 * playerCouriers()["600001"]?.star // 5
 */
export function usePlayerCouriers(playerID = Game.GetLocalPlayerID()) {
	function Parse(data: any) {
		return data ?? {};
	}

	const playerCouriers = createServiceNetData("player_couriers", playerID);
	return createMemo<Record<string, ServiceCourierInfo>>(() => Parse(playerCouriers()));
}

/**
 * 获取已装备的信使
 * @param playerCouriers 信使数据
 * @returns 已装备的信使数据
 */
export function getEquippedCourier(playerCouriers: Record<string, ServiceCourierInfo>): ServiceCourierInfo | undefined {
	for (const [id, data] of Object.entries(playerCouriers)) {
		if (data.equipped && data.equipped) {
			return data;
		}
	}
	return undefined;
}

/**
 * 获取助战信使映射（槽位 -> 信使ID）
 * @param play8erCouriers 信使数据
 * @returns Record<slotId, courierId>
 */
export function getAssistCouriersMap(playerCouriers: Record<string, ServiceCourierInfo>): Record<number, string> {
	const result: Record<number, string> = {};

	for (const [id, data] of Object.entries(playerCouriers)) {
		if (data.assist_slot && data.assist_slot !== 0) {
			result[data.assist_slot] = id;
		}
	}

	return result;
}

/**
 * 获取第一个可用的助战槽位
 * @param playerCouriers 信使数据
 * @returns 可用槽位ID（1-6），无可用槽位返回 0
 */
export function getFirstAvailableSlot(playerCouriers: Record<string, ServiceCourierInfo>): number {
	const assistCouriers = getAssistCouriersMap(playerCouriers);

	// 找到第一个未被占用的槽位
	for (let i = 1;i <= 6;i++) {
		if (!assistCouriers[i]) {
			return i;
		}
	}

	return 0; // 所有槽位都被占用
}

/**
 * 计算所有信使的总星级
 * @param playerCouriers 信使数据
 * @returns 总星级
 */
export function getTotalStars(playerCouriers: Record<string, ServiceCourierInfo>): number {
	let total = 0;

	for (const [id, data] of Object.entries(playerCouriers)) {
		total += data.star;
	}

	return total;
}

/**
 * 获取所有信使分类
 * @returns 分类ID数组（已去重和排序）
 *
 * @example
 * const categories = getCourierCategories();
 * categories // [1, 2, 3]
 */
export function getCourierCategories(): number[] {
	const categories: number[] = [0]; // 默认包含 0（表示全部）

	for (const id of Object.keys(KeyValues.service_courier || {})) {
		const category = KeyValues.service_courier[id]?.category;
		if (category !== undefined && category !== null && !categories.includes(category)) {
			categories.push(category);
		}
	}

	// 返回排序后的数组
	return categories.sort((a, b) => a - b);
}

/**
 * 获取排序后的信使ID列表
 * @param playerCouriers 信使数据
 * @param categoryID 分类ID（默认0表示全部，否则只返回指定分类的信使）
 * @returns 排序后的信使ID数组
 *
 * 排序规则：已装备 > 星级 > 品质稀有度
 */
export function getSortedCourierIDs(playerCouriers: Record<string, ServiceCourierInfo>, categoryID: number = 0): string[] {
	const courierIDList = Object.keys(KeyValues.courier);

	return courierIDList
		.filter(id => {
			// categoryID 为 0 时返回所有，否则只返回匹配 category 的信使
			if (categoryID === 0) return true;
			return KeyValues.service_courier[id]?.category === categoryID;
		})
		.map(id => ({
			id,
			data: playerCouriers[id] ?? {
				courier_id: id,
				star: 0,
				exp: 0,
				extra_star_exp: 0,
				equipped: 0,
				assist_slot: 0
			}
		}))
		.sort((a, b) => {
			// 优先级：已装备 > 星级 > 品质稀有度
			const aEquipped = Boolean(a.data.equipped);
			const bEquipped = Boolean(b.data.equipped);
			if (aEquipped !== bEquipped) {
				return bEquipped ? 1 : -1;
			}
			const starDiff = b.data.star - a.data.star;
			if (starDiff !== 0) {
				return starDiff;
			}
			const aQuality = KeyValues.service_courier[a.id]?.quality ?? 0;
			const bQuality = KeyValues.service_courier[b.id]?.quality ?? 0;
			return bQuality - aQuality;
		})
		.map(item => toFiniteString(item.data.courier_id));
}

export function usePlayerAchievements(playerID = Game.GetLocalPlayerID()) {
	function Parse(data: any) {
		return data ?? {};
	}

	const playerAchievements = createServiceNetData("player_achievements", playerID);
	return createMemo<Record<string, ServiceTaskInfo>>(() => Parse(playerAchievements()));
}

function resolveMaybeAccessor<T>(value: MaybeAccessor<T> | undefined): T | undefined {
	if (typeof value === "function") {
		return (value as Accessor<T | undefined>)();
	}
	return value;
}

export function getPlayerSteamID(props: PlayerInfoTargetProps): number | undefined {
	return CustomUIConfig.PlayerManager.ResolveSteamID({
		steamID: resolveMaybeAccessor(props.steamID),
		steam64ID: resolveMaybeAccessor(props.steam64ID),
		playerID: resolveMaybeAccessor(props.playerID),
	});
}

function createPlayerInfoAccessor(props: PlayerInfoTargetProps, requestData: boolean) {
	const [steamID, setSteamID] = createSignal<number | undefined>();
	const [snapshot, setSnapshot] = createSignal<PlayerInfoSnapshot | undefined>();

	const applySnapshot = (targetSteamID: number) => {
		setSnapshot(CustomUIConfig.PlayerManager.GetSnapshot(targetSteamID));
	};

	createEffect(() => {
		const targetSteamID = getPlayerSteamID(props);
		setSteamID(targetSteamID);
		if (targetSteamID == undefined) {
			setSnapshot(undefined);
			return;
		}
		const unsubscribe = CustomUIConfig.PlayerManager.Subscribe(targetSteamID, () => {
			if (steamID() == targetSteamID) {
				applySnapshot(targetSteamID);
			}
		});
		onCleanup(unsubscribe);
		applySnapshot(targetSteamID);
		if (requestData) {
			CustomUIConfig.PlayerManager.EnsurePlayerInfo(targetSteamID);
		}
	});

	return {
		data: () => snapshot()?.data,
		steamID,
		snapshot,
	};
}

/** 只监听 PlayerManager 中已有的玩家资料缓存，不主动发起请求。 */
export function GetPlayerInfoCache(props: PlayerInfoTargetProps) {
	const playerInfo = createPlayerInfoAccessor(props, false);
	return {
		data: playerInfo.data,
		steamID: playerInfo.steamID,
	};
}

/** 监听玩家资料缓存，并在缺失或过期时主动请求。 */
export function GetPlayerInfo(props: PlayerInfoTargetProps) {
	const playerInfo = createPlayerInfoAccessor(props, true);

	return {
		data: playerInfo.data,
		loading: () => playerInfo.snapshot()?.status == "loading",
		refreshing: () => playerInfo.snapshot()?.status == "refreshing",
		error: () => playerInfo.snapshot()?.error,
		steamID: playerInfo.steamID,
		refresh: () => {
			const targetSteamID = playerInfo.steamID();
			if (targetSteamID != undefined) {
				CustomUIConfig.PlayerManager.RefreshPlayerInfo(targetSteamID);
			}
		}
	};
}
