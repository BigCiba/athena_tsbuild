import { Accessor, createSignal, Setter, Signal, untrack } from "solid-js";

// 纯 UI 端的全局预览状态，供多个界面共享当前预览目标。
export interface PreviewSelectionState {
	heroName: string;
	weaponID: string;
	courierID: string;
}

type PreviewSelectionKey = keyof PreviewSelectionState;
type PreviewSelectionValue<K extends PreviewSelectionKey> = Exclude<PreviewSelectionState[K], Function>;

interface PreviewSelectionOptions<K extends PreviewSelectionKey> {
	defaultValue: PreviewSelectionState[K] | (() => PreviewSelectionState[K]);
	storageKey?: string;
	persist?: boolean;
}

interface PreviewSelectionEventPayload<K extends PreviewSelectionKey = PreviewSelectionKey> {
	key: K;
	value: PreviewSelectionState[K];
}

declare global {
	interface CustomUIConfig {
		__previewSelections?: Partial<PreviewSelectionState>;
	}
}

const PREVIEW_SELECTION_EVENT = "preview_selection_changed";
const previewSelectionSignals: Partial<Record<PreviewSelectionKey, Signal<any>>> = {};

// 状态源挂在 CustomUIConfig 上，避免页面切换卸载后丢失当前预览值。
function getPreviewSelections() {
	if (CustomUIConfig.__previewSelections == undefined) {
		CustomUIConfig.__previewSelections = {};
	}
	return CustomUIConfig.__previewSelections;
}

function resolveDefaultValue<K extends PreviewSelectionKey>(defaultValue: PreviewSelectionOptions<K>["defaultValue"]) {
	if (typeof defaultValue == "function") {
		return (defaultValue as () => PreviewSelectionState[K])();
	}
	return defaultValue;
}

function getStorageValue<K extends PreviewSelectionKey>(options: PreviewSelectionOptions<K>) {
	if (options.persist === false || options.storageKey == undefined) {
		return undefined;
	}
	return CustomUIConfig.Storage.LoadData(options.storageKey, undefined as PreviewSelectionState[K] | undefined);
}

function getCurrentPlayerHeroName() {
	const heroIndex = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
	if (heroIndex != undefined && Entities.IsValidEntity(heroIndex)) {
		const heroName = Entities.GetUnitName(heroIndex);
		if (heroName != undefined && heroName != "") {
			return heroName;
		}
	}
	return Object.keys(KeyValues.heroes)[0];
}

// 读取优先级：全局内存态 -> Storage 快照 -> 默认值。
function getPreviewSelectionValue<K extends PreviewSelectionKey>(key: K, options: PreviewSelectionOptions<K>) {
	const selections = getPreviewSelections();
	const currentValue = selections[key];
	if (currentValue != undefined) {
		return currentValue as PreviewSelectionState[K];
	}

	const storageValue = getStorageValue(options);
	if (storageValue != undefined) {
		selections[key] = storageValue;
		return storageValue;
	}

	const defaultValue = resolveDefaultValue(options.defaultValue);
	selections[key] = defaultValue;
	return defaultValue;
}

// 写入时同时刷新全局内存态、可选持久化，并广播给已挂载页面同步更新。
function setPreviewSelectionValue<K extends PreviewSelectionKey>(key: K, value: PreviewSelectionState[K], options: PreviewSelectionOptions<K>) {
	const selections = getPreviewSelections();
	selections[key] = value;
	if (options.persist !== false && options.storageKey != undefined) {
		CustomUIConfig.Storage.SaveData(options.storageKey, value);
	}
	ClientSideEvent(PREVIEW_SELECTION_EVENT, { key, value } satisfies PreviewSelectionEventPayload<K>);
	return value;
}

// 每个 key 只创建一个共享 signal，所有页面复用同一份响应式状态。
export function createPreviewSelectionSignal<K extends PreviewSelectionKey>(key: K, options: PreviewSelectionOptions<K>): Signal<PreviewSelectionState[K]> {
	const cachedSignal = previewSelectionSignals[key];
	if (cachedSignal != undefined) {
		return cachedSignal as Signal<PreviewSelectionState[K]>;
	}

	const initialValue = getPreviewSelectionValue(key, options);
	const [value, setValue] = createSignal<PreviewSelectionState[K]>(initialValue);
	useClientSideEvent(PREVIEW_SELECTION_EVENT, (payload: PreviewSelectionEventPayload) => {
		if (payload.key == key) {
			setValue(() => payload.value as PreviewSelectionState[K]);
		}
	});

	const setter: Setter<PreviewSelectionState[K]> = ((nextValue) => {
		let resolvedValue: PreviewSelectionState[K];
		if (typeof nextValue == "function") {
			resolvedValue = (nextValue as (prev: PreviewSelectionState[K]) => PreviewSelectionState[K])(untrack(value as Accessor<PreviewSelectionState[K]>));
		} else {
			resolvedValue = nextValue as PreviewSelectionState[K];
		}
		setValue(resolvedValue as PreviewSelectionValue<K>);
		return setPreviewSelectionValue(key, resolvedValue, options);
	}) as Setter<PreviewSelectionState[K]>;

	const signal: Signal<PreviewSelectionState[K]> = [value, setter];
	previewSelectionSignals[key] = signal;
	return signal;
}

// 预设的常用预览状态工厂，便于页面直接接入统一 key。
export function createPreviewHeroNameSignal() {
	return createPreviewSelectionSignal("heroName", {
		defaultValue: getCurrentPlayerHeroName,
		storageKey: "preview_hero_name",
	});
}

export function createPreviewWeaponIDSignal(defaultWeaponID = "1000001") {
	return createPreviewSelectionSignal("weaponID", {
		defaultValue: defaultWeaponID,
		storageKey: "preview_weapon_id",
	});
}

export function createPreviewCourierIDSignal(defaultCourierID = "600001") {
	return createPreviewSelectionSignal("courierID", {
		defaultValue: defaultCourierID,
		storageKey: "preview_courier_id",
	});
}