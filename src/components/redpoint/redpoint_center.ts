import { createServiceNetData } from "../../utils/solid_utils";

export type RedPointPath = readonly [string, ...Array<string | number>];

export type RedPointUpdate = {
	path: RedPointPath;
	value: boolean;
};

declare global {
	interface CustomUIConfig {
		__redPointRuleRegistry?: Record<string, boolean>;
	}
}

export function defineRedPointRule(name: string, setup: () => void) {
	CustomUIConfig.__redPointRuleRegistry ??= {};
	if (CustomUIConfig.__redPointRuleRegistry[name] === true) {
		return;
	}
	CustomUIConfig.__redPointRuleRegistry[name] = true;
	setup();
}

export function setRedPoint(path: RedPointPath, value: boolean) {
	const [rootKey, ...keys] = path;
	CustomUIConfig.SetRedPoint(value, rootKey, ...keys.map(String));
}

export function setRedPointBatch(updates: RedPointUpdate[]) {
	for (const update of updates) {
		setRedPoint(update.path, update.value);
	}
}

export function createRedPointServiceData<TName extends keyof NetDataDeclarations>(
	key: TName,
): () => NetDataDeclarations[TName] | undefined;
export function createRedPointServiceData<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar: NetDataDeclarations[TName],
): () => NetDataDeclarations[TName];
export function createRedPointServiceData<TName extends keyof NetDataDeclarations>(
	key: TName,
	defaultVar?: NetDataDeclarations[TName],
) {
	return defaultVar == undefined
		? createServiceNetData(key)
		: createServiceNetData(key, defaultVar);
}
