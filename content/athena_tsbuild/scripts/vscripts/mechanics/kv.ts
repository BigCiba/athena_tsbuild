import { reloadable } from "../lib/tstl-utils";

/**
 * 功能介绍：
 * 负责读取和预处理自定义 KV 配置，并提供常用配置查询工具。
 *
 * 使用方法：
 * 模块初始化时自动加载 ability / item / unit / gameplay 等 KV 到全局 KeyValues；
 * 其他模块通过 KeyValues 或 KV.GetAttackSoundSet(...) 获取配置数据。
 */
type GameSetting = {
	revive: GameSettingItemRule;
	in_game_bless_refresh: GameSettingItemRule;
	in_game_ability_upgrade: GameSettingItemRule;
	adventureLocks: Record<string, boolean>;
};

type GameSettingItemRule = {
	itemId: number;
	itemCount: number;
	max: number;
};

type GameSettingKVEntry = {
	value?: string | number;
};

@reloadable
class MKeyValues extends CModule {
	abilities: KV = LoadKeyValues("scripts/npc/npc_abilities_custom.txt");
	units: KV = LoadKeyValues("scripts/npc/npc_units_custom.txt");
	heroes: KV = LoadKeyValues("scripts/npc/npc_heroes_custom.txt");
	hero_abilities: KV = LoadKeyValues("scripts/npc/abilities/hero_abilities.kv");
	items: KV = LoadKeyValues("scripts/npc/npc_items_custom.txt");
	initPriority(): number {
		return 3;
	}

	init(reload: boolean) {
		if (IsClient()) {
		}
	}

	GetUnitData<T extends any[]>(unit: string | EntityIndex | CDOTA_BaseNPC, ...keys: string[]): LuaMultiReturn<Partial<T>> {
		let unitName;
		if (typeof unit == "number") {
			unit = EntIndexToHScript(unit) as CDOTA_BaseNPC;
		}
		let kv;
		if (typeof unit == "object" && IsValid(unit)) {
			unitName = unit.GetUnitName();
			kv = this.heroes[unitName] || this.units[unitName];
		} else if (typeof unit == "string") {
			kv = this.heroes[unit] || this.units[unit];
		}
		if (kv == undefined) {
			// @ts-ignore
			return undefined;
		}

		let t = [] as never as T;
		let n = select("#", ...keys);
		for (const i of $range(1, n, 1)) {
			const [key] = select(i, ...keys);
			t[i - 1] = kv[key];
		}
		// @ts-ignore
		return unpack(t, 1, n);
	};
	// --------------------------------------------------
	GetAttackSoundSet(hUnit: CDOTA_BaseNPC, tParams?: any): string {
		let soundSet = KeyValues.GetUnitData<[string | undefined]>(hUnit, "SoundSet")[0];
		if (typeof soundSet == "string" && soundSet != "") {
			return soundSet;
		}
		return "";
	}

	GetKvAbilityValue(kv: KV, name: string, key: string, level: number = 1, caster?: CDOTA_BaseNPC) {
		const abilityValues = kv[name]?.AbilityValues;
		if (abilityValues == undefined) return 0;
		return GetAbilityValues(abilityValues[key], level, caster);
	}
}


declare global {
	var KeyValues: MKeyValues;
}
KeyValues ??= new MKeyValues();
