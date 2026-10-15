import { collectAbilityValueEntries } from "../../abilities/eom_ability";
import { BaseModifier, BaseModifierMotionBoth, BaseModifierMotionHorizontal, BaseModifierMotionVertical, toDotaClassInstance } from "../../lib/dota_ts_adapter";

const TransmitterDataRegistry: Record<string, string[]> = {};

function registerTransmitterData(ctor: Function, propertyKey: string) {
	const key = ctor.name || tostring(ctor);
	let list = TransmitterDataRegistry[key];
	if (list === undefined) {
		list = [];
		TransmitterDataRegistry[key] = list;
	}
	if (!list.includes(propertyKey)) {
		list.push(propertyKey);
	}
}

function collectTransmitterDataEntries(ctor: any): string[] {
	const fields: string[] = [];
	let current = ctor;
	while (current !== undefined) {
		const key = current.name || tostring(current);
		const list = TransmitterDataRegistry[key];
		if (list !== undefined) {
			for (const name of list) {
				if (!fields.includes(name)) {
					fields.push(name);
				}
			}
		}
		current = current.____super;
	}
	return fields;
}

/**
 * Modifier 客户端同步数据装饰器
 */
export function TransmitterData(): PropertyDecorator {
	return (target, propertyKey) => {
		const constructor = target.constructor;
		if (constructor != undefined) {
			registerTransmitterData(constructor, propertyKey as string);
		}
	};
}

interface easyModifierReturn {
	name: string,
	IsHidden: boolean,
	IsDebuff: boolean,
	IsPermanent: boolean,
	IsPurgable: boolean,
	IsPurgeException: boolean,
	IsStunDebuff: boolean,
	RemoveOnDeath: boolean,
	DestroyOnExpire: boolean,
	CanParentBeAutoAttacked: boolean,
	AllowIllusionDuplicate: boolean,
	GetAttributes: DOTAModifierAttribute_t,
	GetPriority: modifierpriority,

	IsAura: boolean;
	IsAuraActiveOnDeath: boolean;
	GetAuraDuration: number,
	GetAuraRadius: number,
	GetAuraSearchTeam: DOTA_UNIT_TARGET_TEAM,
	GetAuraSearchType: DOTA_UNIT_TARGET_TYPE,
	GetAuraSearchFlags: DOTA_UNIT_TARGET_FLAGS,
	GetModifierAura: string,

	GetEffectName: string,
	GetEffectAttachType: ParticleAttachment_t,
	ShouldUseOverheadOffset: boolean,
	GetHeroEffectName: string,
	HeroEffectPriority: number,
	GetStatusEffectName: string,
	StatusEffectPriority: number,
}
export const registerEOMModifier = function (this: string | undefined | void, param?: Partial<easyModifierReturn>) {
	let name = param?.name;
	/** NOTE:tstl的插件会将this改为当前文件路径 */
	let fileName = this;
	return (modifier: new () => CDOTA_Modifier_Lua) => {
		if (name !== undefined) {
			// @ts-ignore
			modifier.name = name;
		} else {
			name = modifier.name;
		}

		const env = _G as AnyTable;
		env[name] = {};

		toDotaClassInstance(env[name], modifier);
		const abilityValueEntries = collectAbilityValueEntries(modifier as any);

		let isEOMModifier = false;
		let type = LuaModifierType.LUA_MODIFIER_MOTION_NONE;
		let base = (modifier as any).____super;
		while (base) {
			if (!isEOMModifier && (base === EOMModifier || base === EOMModifierMotionBoth || base === EOMModifierMotionHorizontal || base === EOMModifierMotionVertical)) {
				isEOMModifier = true;
			}
			if (base === EOMModifierMotionBoth || base === BaseModifierMotionBoth) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_BOTH;
				break;
			} else if (base === EOMModifierMotionHorizontal || base === BaseModifierMotionHorizontal) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_HORIZONTAL;
				break;
			} else if (base === EOMModifierMotionVertical || base === BaseModifierMotionVertical) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_VERTICAL;
				break;
			}

			base = base.____super;
		}

		const classType = env[name] as EOMModifier;
		const transmitterDataFields = collectTransmitterDataEntries(modifier);
		const originalGetAbilitySpecialValue = classType.GetAbilitySpecialValue;
		const originalOnCreated = classType.OnCreated;
		classType.OnCreated = function (parameters: any) {
			(this as any).____constructor();
			(this as any).__AbilityValueEntries = abilityValueEntries;
			this.parent = this.GetParent();
			this.caster = this.GetCaster();
			this.ability = this.GetAbility();
			this.name = name!;
			if (transmitterDataFields.length > 0 && IsServer()) {
				this.SetHasCustomTransmitterData(true);
			}
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetAbilitySpecialValueFor(entry.specialValueKey);
				}
			}
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnCreated !== undefined) {
				originalOnCreated.call(this, parameters);
			}
			if (isEOMModifier && originalOnCreated != EOMModifier.prototype.OnCreated) {
				EOMModifier.prototype.OnCreated.call(this, parameters);
			}
		};
		const originalOnRefresh = classType.OnRefresh;
		classType.OnRefresh = function (parameters: any) {
			this.caster = this.GetCaster();
			this.ability = this.GetAbility();
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetAbilitySpecialValueFor(entry.specialValueKey);
				}
			}
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnRefresh !== undefined) {
				originalOnRefresh.call(this, parameters);
			}
			if (isEOMModifier && originalOnRefresh != EOMModifier.prototype.OnRefresh) {
				EOMModifier.prototype.OnRefresh.call(this, parameters);
			}
		};
		const originalOnStackCountChanged = classType.OnStackCountChanged;
		classType.OnStackCountChanged = function (parameters: any) {
			if (this.__AbilityValueEntries != undefined) {
				for (let i = 0; i < this.__AbilityValueEntries.length; i++) {
					const entry = this.__AbilityValueEntries[i];
					(this as any)[entry.propertyKey] = this.GetAbilitySpecialValueFor(entry.specialValueKey);
				}
			}
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnStackCountChanged !== undefined) {
				originalOnStackCountChanged.call(this, parameters);
			}
			if (isEOMModifier && originalOnStackCountChanged != EOMModifier.prototype.OnStackCountChanged) {
				EOMModifier.prototype.OnStackCountChanged.call(this, parameters);
			}
		};
		const originalOnDestroy = classType.OnDestroy;
		classType.OnDestroy = function () {
			if (originalOnDestroy !== undefined) {
				originalOnDestroy.call(this);
			}
			if (isEOMModifier && originalOnDestroy != EOMModifier.prototype.OnDestroy) {
				EOMModifier.prototype.OnDestroy.call(this);
			}
		};
		const originalGetTexture = classType.GetTexture;
		classType.GetTexture = function () {
			// if (_G._GetBuffProperties != undefined) {
			// 	let propertyValues: Record<string, any[]> = {};
			// 	for (let i = 0; i < _G._GetBuffProperties.length; i++) {
			// 		let property = _G._GetBuffProperties[i];
			// 		let value;
			// 		let iEOMModifierProperty = EOMModifierFunction[property as any] as any as EOMModifierFunction;
			// 		if (iEOMModifierProperty != undefined) {
			// 			let t = undefined;
			// 			if (iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_PHYSICAL_DAMAGE_BARRIER || iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_MAGICAL_DAMAGE_BARRIER || iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_DAMAGE_BARRIER) {
			// 				t = { do_not_consume: true };
			// 			}
			// 			// @ts-ignore
			// 			if (this._DynamicProperty?.[iEOMModifierProperty] != undefined) {
			// 				// @ts-ignore
			// 				value = this._DynamicProperty[iEOMModifierProperty](t);
			// 				// @ts-ignore
			// 			} else if (this._StaticProperty?.[iEOMModifierProperty] != undefined) {
			// 				// @ts-ignore
			// 				value = this._StaticProperty[iEOMModifierProperty];
			// 			}
			// 			if (MULTIPLE_ATTRIBUTE_PROPERTY[iEOMModifierProperty]) {
			// 				property = property + "[x]";
			// 			}
			// 		}
			// 		let modifierFunctionName = ModifierFunctions[property];
			// 		if (modifierFunctionName != undefined) {
			// 			let modifierFunction = this[modifierFunctionName as keyof EOMModifier];
			// 			if (typeof modifierFunction == "function") {
			// 				// @ts-ignore
			// 				value = modifierFunction.call(this);
			// 			}
			// 		}
			// 		if (value != undefined) {
			// 			if (propertyValues[property] == undefined) {
			// 				propertyValues[property] = [];
			// 			}
			// 			propertyValues[property].push(value);
			// 		}
			// 	}
			// 	_G._GetBuffProperties = undefined;
			// 	return json.encode({
			// 		property_values: propertyValues,
			// 		is_aura: this.GetAuraOwner() != undefined,
			// 	});
			// }
			if (originalGetTexture !== undefined) {
				return originalGetTexture.call(this);
			}
			return EOMModifier.prototype.GetTexture.call(this);
		};
		// const originalGetAuraDuration = classType.GetAuraDuration;
		// classType.GetAuraDuration = function () {
		// 	if (originalGetAuraDuration !== undefined) {
		// 		return originalGetAuraDuration.call(this);
		// 	}
		// 	return 0.1;
		// };
		for (const [key, value] of pairs(param)) {
			if (key != "name" && typeof classType[key] != "function") {
				(classType as any)[key] = () => {
					return value;
				};
			}
		}

		if (transmitterDataFields.length > 0) {
			const originalAddCustomTransmitterData = classType.AddCustomTransmitterData;
			classType.AddCustomTransmitterData = function () {
				let payload = originalAddCustomTransmitterData !== undefined ? originalAddCustomTransmitterData.call(this) : undefined;
				if (payload == undefined) {
					payload = {};
				}
				for (const field of transmitterDataFields) {
					(payload as Record<string, any>)[field] = (this as any)[field];
				}
				return payload;
			};
			const originalHandleCustomTransmitterData = classType.HandleCustomTransmitterData;
			classType.HandleCustomTransmitterData = function (data: Record<string, any>) {
				if (data != undefined) {
					for (const field of transmitterDataFields) {
						if (data[field] !== undefined) {
							// @ts-ignore
							if (typeof data[field] == "userdata") {
								const result = tonumber(tostring(data[field])) ?? 0;
								(this as any)[field] = result;
								if (this.OnTransmitterDataUpdated != undefined) {
									this.OnTransmitterDataUpdated(field, result);
								}
							} else {
								(this as any)[field] = data[field];
								if (this.OnTransmitterDataUpdated != undefined) {
									this.OnTransmitterDataUpdated(field, data[field]);
								}
							}
						}
					}
				}
				if (originalHandleCustomTransmitterData !== undefined) {
					originalHandleCustomTransmitterData.call(this, data);
				}
			};
		}


		const extraDeclareList: modifierfunction[] = [];
		const originalDeclareFunctions = classType.DeclareFunctions;

		function bindDeclareEntries(declareMap: Record<modifierfunction, any>, isDynamic: boolean) {
			for (const [modifierfunction, value] of pairs(declareMap)) {
				// @ts-ignore
				const methodName = MODIFIER_FUNCTION_MAP[modifierfunction];
				if (methodName === undefined) {
					continue;
				}
				extraDeclareList.push(modifierfunction);

				const existing = (classType as any)[methodName];
				if (typeof existing != "function") {
					if (isDynamic && typeof value == "function") {
						(classType as any)[methodName] = function (this: any, params: any) {
							return value.call(this, params);
						};
					} else {
						(classType as any)[methodName] = () => {
							return value;
						};
					}
				}
			}
		}

		if (classType.StaticDeclare != undefined) {
			const staticDeclare = classType.StaticDeclare();
			bindDeclareEntries(staticDeclare as Record<modifierfunction, any>, false);
		}
		if (classType.DynamicDeclare != undefined) {
			const dynamicDeclare = classType.DynamicDeclare();
			bindDeclareEntries(dynamicDeclare as Record<modifierfunction, any>, true);
		}

		if (extraDeclareList.length > 0 || originalDeclareFunctions != undefined) {
			classType.DeclareFunctions = function () {
				const result = originalDeclareFunctions != undefined ? (originalDeclareFunctions.call(this) ?? []) : [];
				for (let i = 0; i < extraDeclareList.length; i++) {
					const funcId = extraDeclareList[i];
					let exists = false;
					for (let j = 0; j < result.length; j++) {
						if (result[j] == funcId) {
							exists = true;
							break;
						}
					}
					if (!exists) {
						result.push(funcId);
					}
				}
				return result;
			};
		}

		if (fileName && fileName.length > 0)
			LinkLuaModifier(name, fileName, type);
	};
};

export interface EOMModifier extends CDOTA_Modifier_Lua {
	EventListener(): Partial<EventListenerMap>;
	GetAbilitySpecialValue(): void;
	StaticProperty(): Partial<Record<PropertyFunction, any>>;
	DynamicProperty(): Partial<Record<PropertyFunction, DynamicPropertyFunction>>;
	StaticState(): Partial<Record<StateEnum, any>>;
	DynamicState(): Partial<Record<StateEnum, () => boolean>>;
	AddCustomTransmitterData(): any;
	HandleCustomTransmitterData(data: any): void;
	OnTransmitterDataUpdated(field: string, value: any): void;
	StaticDeclare(): StaticDeclareMap;
	DynamicDeclare(): DynamicDeclareMap;
}
export class EOMModifier extends BaseModifier {
	protected _StaticProperty?: Partial<Record<PropertyFunction, any>>;
	protected _DynamicProperty?: Partial<Record<PropertyFunction, DynamicPropertyFunction>>;
	protected _bDestroyed?: boolean;
	protected __EventIDList?: number[];
	protected __AbilityValueEntries?: { propertyKey: string; specialValueKey: string; }[];
	parent: CDOTA_BaseNPC;
	ability?: CDOTABaseAbility;
	caster?: CDOTA_BaseNPC;
	name: string;

	// 为当前修饰器实例注册静态属性到属性系统。
	protected RegisterStaticProperties(): void {
		if (this.StaticProperty == undefined) {
			return;
		}

		const entIndex = this.GetParent().entindex();
		const sourceId = this.GetName();
		const staticProperty = this.StaticProperty();
		for (const [property, value] of pairs(staticProperty)) {
			if (PROPERTY_MAP_REVERSE[property]) {
				PropertySystem.AddStaticProperty(entIndex, PROPERTY_MAP_REVERSE[property], sourceId, value);
			}
		}
	}

	// 为当前修饰器实例注册动态状态回调。
	protected RegisterDynamicStates(): void {
		if (this.DynamicState == undefined) {
			return;
		}

		const entIndex = this.GetParent().entindex();
		const sourceId = this.GetName();
		const dynamicState = this.DynamicState();
		for (const [state, func] of pairs(dynamicState)) {
			StateSystem.RegisterDynamicState(entIndex, state, sourceId, func);
		}
	}

	// 按当前修饰器优先级注册静态状态。
	protected RegisterStaticStates(): void {
		if (this.StaticState == undefined) {
			return;
		}

		const entIndex = this.GetParent().entindex();
		const sourceId = this.GetName();
		const staticState = this.StaticState();
		for (const [state, value] of pairs(staticState)) {
			StateSystem.AddStaticState(entIndex, state, sourceId, value, this.GetPriority());
		}
	}

	OnCreated(params: object): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;
		let entIndex = this.GetParent().entindex();
		let sourceId = this.GetName();
		if (this.DynamicProperty != undefined) {
			const dynamicProperty = this.DynamicProperty();
			for (const [property, func] of pairs(dynamicProperty)) {
				if (PROPERTY_MAP_REVERSE[property]) {
					PropertySystem.RegisterDynamicProperty(entIndex, PROPERTY_MAP_REVERSE[property], sourceId, func);
				}
			}
		}
		this.RegisterStaticProperties();
		this.RegisterDynamicStates();
		this.RegisterStaticStates();

		if (IsServer()) {
			if (calculateGenericBonuses) {
				const parent = this.GetParent();
				parent.IsHero() ? parent.CalculateStatBonus(true) : parent.CalculateGenericBonuses();
			}
			if (this.EventListener != undefined) {
				this.__EventIDList ??= [];
				for (const [event, listener] of pairs(this.EventListener())) {
					// @ts-ignore
					this.__EventIDList.push(Event.RegisterForOwner(event, listener, this.GetParent()));
				}
			}
		}
	}
	OnRefresh(params: object): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;
		let sourceId = this.GetName();

		this.RegisterStaticProperties();
		this.RegisterStaticStates();
		if (IsServer()) {
			if (calculateGenericBonuses) {
				const parent = this.GetParent();
				parent.IsHero() ? parent.CalculateStatBonus(true) : parent.CalculateGenericBonuses();
			}
		}
	}
	OnStackCountChanged(stackCount: number): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;
		let sourceId = this.GetName();

		this.RegisterStaticProperties();
		this.RegisterStaticStates();
		if (IsServer()) {
			if (calculateGenericBonuses) {
				const parent = this.GetParent();
				parent.IsHero() ? parent.CalculateStatBonus(true) : parent.CalculateGenericBonuses();
			}
		}
	}
	OnDestroy(): void {
		this._bDestroyed = true;

		let calculateGenericBonuses = false;

		let parent = this.GetParent();
		let sourceId = this.GetName();
		let entIndex = this.GetParent().entindex();

		PropertySystem.RemoveStaticProperty(entIndex, sourceId);
		PropertySystem.UnregisterDynamicProperty(entIndex, sourceId);

		StateSystem.RemoveStaticState(entIndex, sourceId);
		StateSystem.UnregisterDynamicState(entIndex, sourceId);

		if (IsServer()) {
			if (calculateGenericBonuses && IsValid(parent)) {
				parent.IsHero() ? parent.CalculateStatBonus(true) : parent.CalculateGenericBonuses();
			}
			if (this.__EventIDList != undefined) {
				for (const [i, v] of ipairs(this.__EventIDList)) {
					Event.Unregister(v);
				}
				this.__EventIDList = undefined;
			}
		}
	}
}
export interface EOMModifierMotionHorizontal extends CDOTA_Modifier_Lua_Horizontal_Motion { }
export class EOMModifierMotionHorizontal extends EOMModifier { }

export interface EOMModifierMotionVertical extends CDOTA_Modifier_Lua_Vertical_Motion { }
export class EOMModifierMotionVertical extends EOMModifier { }

export interface EOMModifierMotionBoth extends CDOTA_Modifier_Lua_Motion_Both { }
export class EOMModifierMotionBoth extends EOMModifier { }
