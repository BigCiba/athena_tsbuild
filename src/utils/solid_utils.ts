import { Accessor, createEffect, createMemo, createSignal, getOwner, onCleanup, onMount, Signal, untrack } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { SetStoreFunction } from "solid-js/store";

export interface TokenCost {
	name: string;
	value: number;
}

export function parseTokenCosts(rawCost: string | undefined): TokenCost[] {
	if (!rawCost) {
		return [];
	}

	const costs: TokenCost[] = [];
	const costIndexes: Record<string, number> = {};
	for (const rawEntry of rawCost.split("|")) {
		const separatorIndex = rawEntry.indexOf(":");
		if (separatorIndex <= 0 || separatorIndex >= rawEntry.length - 1) {
			return [];
		}

		const rawName = rawEntry.slice(0, separatorIndex).trim();
		const rawValue = rawEntry.slice(separatorIndex + 1).trim();
		const tokenID = Number(rawName);
		const value = Number(rawValue);
		if (!Number.isFinite(tokenID) || tokenID <= 0 || !Number.isFinite(value) || value < 0) {
			return [];
		}

		const name = String(tokenID);
		const existingIndex = costIndexes[name];
		if (existingIndex == undefined) {
			costIndexes[name] = costs.length;
			costs.push({ name, value });
		} else {
			costs[existingIndex].value += value;
		}
	}
	return costs;
}

export type PlayerUnreadSystem = "equipment" | "gem" | "rune" | "engraving" | "prop" | "cosmetic" | "key" | "drawing";

type SharedServiceNetDataEntry = {
	data: Accessor<any>;
	initialData: any;
	listenerID: NetTableListenerID;
	refCount: number;
};

type SharedPlayerUnreadReadCacheEntry = {
	readCache: Record<string, boolean>;
	setReadCache: SetStoreFunction<Record<string, boolean>>;
};

declare global {
	interface CustomUIConfig {
		__serviceNetDataRegistry?: Record<string, SharedServiceNetDataEntry>;
		__playerUnreadReadCacheRegistry?: Partial<Record<PlayerUnreadSystem, SharedPlayerUnreadReadCacheEntry>>;
	}
}

function resolveServiceNetDataArgs<TName extends keyof NetDataDeclarations>(
	defaultPlayerID: PlayerID,
	args: any[]
) {
	let defaultVar: NetDataDeclarations[TName] | undefined;
	let playerID = defaultPlayerID;
	if (args.length == 2) {
		[defaultVar, playerID] = args;
	} else if (args.length == 1) {
		let first = args[0];
		if (typeof first == "number") {
			playerID = first as PlayerID;
		} else {
			defaultVar = first;
		}
	}
	return { defaultVar, playerID };
}

function getServiceRegistry() {
	CustomUIConfig.__serviceNetDataRegistry ??= {};
	return CustomUIConfig.__serviceNetDataRegistry;
}

function getServiceRegistryKey(key: keyof NetDataDeclarations, playerID: PlayerID) {
	return `service:${String(key)}:${playerID}`;
}

function acquireSharedServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	playerID: PlayerID
) {
	const registry = getServiceRegistry();
	const registryKey = getServiceRegistryKey(key, playerID);
	let entry = registry[registryKey];
	if (entry == undefined) {
		const initialData = getServiceNetData(key, playerID);
		const [data, setData] = createSignal(initialData);
		const listenerID = useServiceNetData(key, (tData) => {
			setData(() => tData);
		}, playerID);
		entry = {
			data,
			initialData,
			listenerID,
			refCount: 0,
		};
		registry[registryKey] = entry;
	}
	entry.refCount++;

	const release = () => {
		const current = registry[registryKey];
		if (current == undefined) {
			return;
		}
		current.refCount--;
		if (current.refCount <= 0) {
			CustomNetTables.UnsubscribeNetTableListener(current.listenerID);
			delete registry[registryKey];
		}
	};

	if (getOwner() != undefined) {
		onCleanup(release);
	}

	return entry.data as Accessor<NetDataDeclarations[TName] | undefined>;
}

function createDefaultedServiceAccessor<TName extends keyof NetDataDeclarations>(
	sharedData: Accessor<NetDataDeclarations[TName] | undefined>,
	defaultVar: NetDataDeclarations[TName] | undefined
) {
	return (() => {
		const value = sharedData();
		return value == undefined ? defaultVar : value;
	}) as Accessor<NetDataDeclarations[TName] | undefined>;
}

export function createToggleWindowSignal(
	windowName: string,
	state?: boolean,
	options?: { ignoreOtherWindows?: boolean; }
): Signal<boolean> {
	const [value, setter] = createSignal(state ?? false);
	onMount(() => {
		let id = useClientSideEvent("custom_ui_toggle_windows", (eventData) => {
			if (eventData.windowName == windowName) {
				if (eventData.state === undefined) {
					setter(value => !value);
				} else {
					setter(eventData.state == 1 || eventData.state === true);
				}
			} else if (!options?.ignoreOtherWindows) {
				setter(false);
			}
		});
		onCleanup(() => {
			GameEvents.Unsubscribe(id);
		});
	});
	return [value, setter];
}


/**
 * 创建网表数据的信号，在lua端使用CustomNetTables.SetNetData(tableName, tableKey, data)更新数据时会自动更新
 * @param tableName 
 * @param tableKey 
 */
export function createNetDataSignal<
	TName extends keyof NetDataDeclarations,
	K extends keyof NetDataDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
): Accessor<NetDataDeclarations[TName][K] | undefined>;
export function createNetDataSignal<
	TName extends keyof NetDataDeclarations,
	K extends keyof NetDataDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
	defaultVar: NetDataDeclarations[TName][K]
): Accessor<NetDataDeclarations[TName][K]>;
export function createNetDataSignal(tableName: any, tableKey: any, defaultVar?: any) {
	const [v, setter] = createSignal(getNetDataKey(tableName, tableKey) ?? defaultVar);
	onMount(() => {
		let id = useNetDataKey(tableName, tableKey, (value) => {
			setter((value ?? defaultVar) as any);
		});
		onCleanup(() => {
			CustomNetTables.UnsubscribeNetTableListener(id);
		});
	});
	return v;
}

export function createPlayerNetDataSignal<
	TName extends keyof NetDataDeclarations,
	K extends keyof NetDataDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
): Accessor<NetDataDeclarations[TName][K] | undefined>;
export function createPlayerNetDataSignal<
	TName extends keyof NetDataDeclarations,
	K extends keyof NetDataDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
	defaultVar: NetDataDeclarations[TName][K],
): Accessor<NetDataDeclarations[TName][K]>;
export function createPlayerNetDataSignal<
	TName extends keyof NetDataDeclarations,
	K extends keyof NetDataDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
	defaultVar: NetDataDeclarations[TName][K],
	playerID: PlayerID,
): Accessor<NetDataDeclarations[TName][K]>;
export function createPlayerNetDataSignal(tableName: any, tableKey: any, defaultVar?: any, playerID?: PlayerID) {
	const actualPlayerID = playerID ?? Players.GetLocalPlayer();
	const [v, setter] = createSignal(getNetDataKey(tableName, tableKey, actualPlayerID) ?? defaultVar);
	onMount(() => {
		let id = useNetDataKey(tableName, tableKey, (value) => {
			setter(value as any ?? defaultVar);
		}, actualPlayerID);
		onCleanup(() => {
			CustomNetTables.UnsubscribeNetTableListener(id);
		});
	});
	return v;
}

export function createNetTableSignal<
	TName extends keyof CustomNetTableDeclarations,
	K extends keyof CustomNetTableDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
): Accessor<NetworkedData<CustomNetTableDeclarations[TName][K]> | undefined>;
export function createNetTableSignal<
	TName extends keyof CustomNetTableDeclarations,
	K extends keyof CustomNetTableDeclarations[TName],
>(
	tableName: TName,
	tableKey: K,
	defaultVar: NetworkedData<CustomNetTableDeclarations[TName][K]>
): Accessor<NetworkedData<CustomNetTableDeclarations[TName][K]>>;
export function createNetTableSignal(tableName: any, tableKey: any, defaultVar?: any) {
	const [v, setter] = createSignal(CustomNetTables.GetTableValue(tableName, tableKey) ?? defaultVar);
	onMount(() => {
		let id = CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == tableKey && value != undefined) {
				setter(value as any);
			}
		});
		onCleanup(() => {
			CustomNetTables.UnsubscribeNetTableListener(id);
		});
	});
	return v;
}

export function createPlayerData<T extends keyof PlayerDataType>(tableKey: T, playerID = Players.GetLocalPlayer()) {
	const [data, setData] = createSignal(GetPlayerData(playerID, tableKey));
	onMount(() => {
		let id = SubscribePlayerDataListener(playerID, tableKey, (_, value) => {
			if (value) setData(value as any);
		});
		onCleanup(() => {
			UnsubscribePlayerDataListener(id);
		});
	});
	return data;
}

type PlayerPropertyData = Record<string, any>;

export function createPlayerPropertyData(playerID: Accessor<PlayerID>) {
	const [data, setData] = createSignal<PlayerPropertyData>({});

	createEffect(() => {
		const tableKey = `1_${playerID()}`;
		setData(CustomNetTables.GetTableValue("property_system", tableKey) ?? {});

		const listenerID = CustomNetTables.SubscribeNetTableListener("property_system", (_, key, value) => {
			if (key === tableKey) {
				setData(value ?? {});
			}
		});

		onCleanup(() => {
			CustomNetTables.UnsubscribeNetTableListener(listenerID);
		});
	});

	return data;
}

/**
 * 创建服务端网表数据的信号，在lua端使用SetPlayerServiceNetData更新数据时会自动更新
 * @param key 
 */
export function createServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
): () => NetDataDeclarations[TName] | undefined;
export function createServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	playerID: PlayerID,
): () => NetDataDeclarations[TName] | undefined;
export function createServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar: NetDataDeclarations[TName],
): () => NetDataDeclarations[TName];
export function createServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar: NetDataDeclarations[TName],
	playerID: PlayerID,
): () => NetDataDeclarations[TName];
export function createServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	...args: any[]
) {
	const { defaultVar, playerID } = resolveServiceNetDataArgs<TName>(Players.GetLocalPlayer(), args);
	return createDefaultedServiceAccessor(acquireSharedServiceNetData(key, playerID), defaultVar);
}

/**
 * 红点相关
 * @param key 
 */
export function createPlayerUnreadIds(system: PlayerUnreadSystem) {
	const playerUnreadIds = createServiceNetData("player_unread_ids", {});
	CustomUIConfig.__playerUnreadReadCacheRegistry ??= {};
	let entry = CustomUIConfig.__playerUnreadReadCacheRegistry[system];
	if (entry == undefined) {
		const [readCache, setReadCache] = createStore<Record<string, boolean>>({});
		entry = { readCache, setReadCache };
		CustomUIConfig.__playerUnreadReadCacheRegistry[system] = entry;
	}
	const { readCache, setReadCache } = entry;
	const unreadIds = createMemo(() => playerUnreadIds()[system] ?? {});

	const isUnread = (id: number | string) => {
		const key = String(id);
		return unreadIds()[key] === true && readCache[key] !== true;
	};

	const markRead = (id: number | string) => {
		const key = String(id);
		if (isUnread(key)) {
			setReadCache(key, true);
		}
	};

	const clearReadCache = (ids?: (number | string)[]) => {
		setReadCache(produce((cache: Record<string, boolean>) => {
			if (ids != undefined) {
				for (const id of ids) {
					delete cache[String(id)];
				}
			} else {
				for (const key in cache) {
					delete cache[key];
				}
			}
		}));
	};

	createEffect(() => {
		const unreads = unreadIds();
		setReadCache(produce((cache: Record<string, boolean>) => {
			for (const key in cache) {
				if (unreads[key] !== true) {
					delete cache[key];
				}
			}
		}));
	});

	let submitting = false;
	const submitReadCache = () => {
		const ids = Object.keys(readCache).map(Number).filter(id => isFinite(id));
		if (ids.length === 0 || submitting) return;
		submitting = true;
		ServerRequest("player_unread_read", {
			system,
			ids
		}, (result) => {
			submitting = false;
			if (result.code == 0 || result.code == 200) {
				clearReadCache(ids);
			}
		}, undefined, () => {
			submitting = false;
		});
	};

	return {
		unreadIds,
		readCache,
		isUnread,
		markRead,
		clearReadCache,
		submitReadCache,
	};
}

export function createGlobalServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
): () => NetDataDeclarations[TName] | undefined;
export function createGlobalServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar: NetDataDeclarations[TName],
): () => NetDataDeclarations[TName];
export function createGlobalServiceNetData<TName extends keyof NetDataDeclarations>(
	key: TName,
	...args: any[]
) {
	const { defaultVar, playerID } = resolveServiceNetDataArgs<TName>(-1 as PlayerID, args);
	return createDefaultedServiceAccessor(acquireSharedServiceNetData(key, playerID), defaultVar);
}

export function createServiceNetTableDataStore<TName extends keyof NetDataDeclarations>(
	key: TName,
	playerID?: PlayerID
): NetDataDeclarations[TName] | undefined;
export function createServiceNetTableDataStore<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar: NetDataDeclarations[TName],
	playerID?: PlayerID,
): NetDataDeclarations[TName];
export function createServiceNetTableDataStore<TName extends keyof NetDataDeclarations>(
	key: TName,
	...args: any[]
) {
	const { defaultVar, playerID } = resolveServiceNetDataArgs<TName>(Players.GetLocalPlayer(), args);
	const sharedData = acquireSharedServiceNetData(key, playerID);
	const [data, setData] = createStore((sharedData() ?? defaultVar ?? {}) as any);
	createEffect(() => {
		setData(resetStore((sharedData() ?? defaultVar ?? {}) as Record<string, any>) as any);
	});
	return data;
}

/**
 * 重置store数据
 * @param data 
 * @returns 
 */
export function resetStore(data: Record<string, any>) {
	return produce((prev: Record<string, any>) => {
		for (let k in prev) {
			delete prev[k];
		}
		for (let [k, v] of Object.entries(data)) {
			prev[k] = v;
		}
	});
}

export function DynamicKey<T>(props: { key: () => T, children: (input: T) => any; }) {
	return createMemo(() => {
		const key = props.key();
		return untrack(() => props.children(key));
	});
}
