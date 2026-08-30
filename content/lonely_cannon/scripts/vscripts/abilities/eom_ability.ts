import { BaseAbility, BaseItem, toDotaClassInstance } from "../lib/dota_ts_adapter";

interface AbilityValueEntry {
	propertyKey: string;
	specialValueKey: string;
}

const AbilityValueRegistry: Record<string, AbilityValueEntry[]> = {};

function registerAbilityValueEntry(ctor: Function, propertyKey: string, specialValueKey: string): void {
	const registryKey = ctor.name || tostring(ctor);
	let list = AbilityValueRegistry[registryKey];
	if (list === undefined) {
		list = [];
		AbilityValueRegistry[registryKey] = list;
	}

	let existingIndex = -1;
	for (let i = 0; i < list.length; i++) {
		if (list[i].propertyKey === propertyKey) {
			existingIndex = i;
			break;
		}
	}

	if (existingIndex !== -1) {
		list[existingIndex].specialValueKey = specialValueKey;
	} else {
		list.push({ propertyKey, specialValueKey });
	}
}

export function collectAbilityValueEntries(ctor: any): AbilityValueEntry[] {
	const fields: AbilityValueEntry[] = [];
	let current = ctor;
	while (current !== undefined) {
		const registryKey = current.name || tostring(current);
		const list = AbilityValueRegistry[registryKey];
		if (list !== undefined) {
			for (let i = 0; i < list.length; i++) {
				const entry = list[i];
				let duplicated = false;
				for (let j = 0; j < fields.length; j++) {
					if (fields[j].propertyKey === entry.propertyKey) {
						duplicated = true;
						break;
					}
				}
				if (!duplicated) {
					fields.push(entry);
				}
			}
		}
		current = current.____super;
	}
	return fields;
}

/**
 * Ability 数值装饰器：
 * - 收集被装饰字段
 * - 统一通过 this.GetSpecialValueFor("xxx") 读取
 * - 支持modifier 统一通过 this.GetAbilitySpecialValueFor("xxx") 读取
 * - 支持可选别名：@AbilityValue("duration")
 */
export function AbilityValue(specialValueKey?: string): PropertyDecorator {
	return (target, propertyKey) => {
		const propertyName = propertyKey as string;
		const kvKey = specialValueKey ?? propertyName;
		const ctor = (target as any).constructor as Function;
		if (ctor !== undefined) {
			registerAbilityValueEntry(ctor, propertyName, kvKey);
		}
	};
}

interface easyAbilityReturn {
	name: string,

	startLevel?: number | ((ability: CDOTA_Ability_Lua | CDOTA_Item_Lua) => number),
	startCooldown?: number | ((ability: CDOTA_Ability_Lua | CDOTA_Item_Lua) => number),
	behavior?: DOTA_ABILITY_BEHAVIOR,
	searchBehavior?: AI_SEARCH_BEHAVIOR,
	aoeRadius?: number,
	startWidth?: number,
	endWidth?: number,
	targetTeam?: DOTA_UNIT_TARGET_TEAM,
	targetType?: DOTA_UNIT_TARGET_TYPE,
	targetFlags?: DOTA_UNIT_TARGET_FLAGS,
	funcSortFunction?: (a: CDOTA_BaseNPC, b: CDOTA_BaseNPC) => boolean,
	funcCondition?: (ability: CDOTA_Ability_Lua) => boolean,
	funcUnitsCallback?: (this: CDOTA_Ability_Lua, tTargets: CDOTA_BaseNPC[]) => CDOTA_BaseNPC[],
	isNotPassive?: boolean,
	orderType?: FindOrder,
}
export const registerEOMAbility = (param?: Partial<easyAbilityReturn>) => {
	let name = param?.name;
	return (ability: new () => CDOTA_Ability_Lua | CDOTA_Item_Lua) => {
		if (name !== undefined) {
			// @ts-ignore
			ability.name = name;
		} else {
			name = ability.name;
		}

		const env = _G as AnyTable;
		// const [env] = getFileScope();

		env[name] = {};

		toDotaClassInstance(env[name], ability);
		const abilityValueEntries = collectAbilityValueEntries(ability as any);

		const originalSpawn = (env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).Spawn;
		(env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).Spawn = function () {
			(this as any).__AbilityValueEntries = abilityValueEntries;
			this.behavior = param?.behavior;
			this.searchBehavior = param?.searchBehavior ?? AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE;
			this.aoeRadius = param?.aoeRadius;
			this.startWidth = param?.startWidth;
			this.endWidth = param?.endWidth;
			this.targetTeam = param?.targetTeam;
			this.targetType = param?.targetType;
			this.targetFlags = param?.targetFlags;
			this.funcSortFunction = param?.funcSortFunction;
			this.funcCondition = param?.funcCondition;
			this.funcUnitsCallback = param?.funcUnitsCallback;
			this.isNotPassive = param?.isNotPassive;
			this.orderType = param?.orderType ?? FindOrder.FIND_ANY_ORDER;
			EntityConstructor(this);

			(this as any).__AbilityValueEntries = abilityValueEntries;
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetSpecialValueFor(entry.specialValueKey);
				}
			}

			if (IsServer()) {
				if (param?.startLevel != undefined) {
					if (typeof param.startLevel == "function") {
						this.SetLevel(param.startLevel(this));
					} else {
						this.SetLevel(param.startLevel);
					}
				}
				if (param?.startCooldown != undefined) {
					if (typeof param.startCooldown == "function") {
						this.StartCooldown(param.startCooldown(this));
					} else {
						this.StartCooldown(param.startCooldown);
					}
				} else {
					const kv = KeyValues.abilities[this.GetAbilityName()]
					if (kv?.AbilityStartCooldown != undefined) {
						this.StartCooldown(toFiniteNumber(kv.AbilityStartCooldown, 1));
					}
				}
			}

			// @ts-ignore
			this.____constructor();
			if (originalSpawn) {
				originalSpawn.call(this);
			}
		};

		const originalOnUpgrade = (env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).OnUpgrade;
		(env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).OnUpgrade = function () {
			(this as any).__AbilityValueEntries = abilityValueEntries;
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetSpecialValueFor(entry.specialValueKey);
				}
			}

			if (originalOnUpgrade != undefined) {
				originalOnUpgrade.call(this);
			}
		};

		const originalOnSpellStart = (env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).OnSpellStart;
		(env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).OnSpellStart = function () {
			(this as any).__AbilityValueEntries = abilityValueEntries;
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetSpecialValueFor(entry.specialValueKey);
				}
			}

			if (originalOnSpellStart != undefined) {
				originalOnSpellStart.call(this);
			}
		};
	};
};

export interface EOMAbility extends CDOTA_Ability_Lua {
}
export class EOMAbility extends BaseAbility {
}

export interface EOMItem extends CDOTA_Item_Lua {
}

export class EOMItem extends BaseItem { }

