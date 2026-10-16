/* 执行生产 EOM 注册器、属性系统、NPC 属性覆盖及 modifier；引擎仅提供实体与生命容器。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = path.resolve(__dirname, '../content/athena_tsbuild/scripts/vscripts');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function near(actual, expected) { assert.ok(Math.abs(actual - expected) < Math.max(1, Math.abs(expected)) * 1e-9, `${actual} != ${expected}`); }
function fixture(difficulty = 4, randomFactors = [], server = true) {
	let index = 0, eventID = 0, rolls = 0, uniqueID = 0;
	const listeners = new Map(), units = new Map(), timers = new Map(), gold = [];
	const session = { runId: 1, state: 'GameState_Battle', participants: [0] };
	function BaseModifier() {}
	Object.assign(BaseModifier.prototype, {
		GetParent() { return this.unit; }, GetCaster() { return this.unit; }, GetAbility() {}, GetName() { return this.modifierName; },
		GetPriority() { return 0; }, GetStackCount() { return this.stack ?? 0; },
		SetStackCount(value) { const old = this.GetStackCount(); this.stack = value; if (old !== value) this.OnStackCountChanged?.(old); },
		StartIntervalThink() {}, SetHasCustomTransmitterData() {}, GetDuration() { return -1; },
	});
	// 模拟 Dota 接收的 Lua 类表和构造器，不替代生产装饰器的生命周期或属性注册逻辑。
	const adapter = { BaseModifier, BaseModifierMotionBoth: BaseModifier, BaseModifierMotionHorizontal: BaseModifier, BaseModifierMotionVertical: BaseModifier,
		registerModifier: () => value => value,
		toDotaClassInstance(target, ctor) {
			for (let current = ctor; current && current !== Function.prototype; current = Object.getPrototypeOf(current)) current.____super = Object.getPrototypeOf(current);
			for (let proto = ctor.prototype; proto; proto = Object.getPrototypeOf(proto)) {
				for (const key of Object.getOwnPropertyNames(proto)) if (key !== 'constructor' && target[key] === undefined) target[key] = proto[key];
			}
			target.____constructor = function () { ctor.call(this); };
		},
	};
	const engine = {
		GetMaxHealth() { return this.engineMax; }, GetHealth() { return this.engineHealth; }, GetHealthPercent() { return 100 * this.engineHealth / this.engineMax; },
		SetMaxHealth(value) { assert.ok(value < 1e9, 'large logical health must not reach engine'); this.engineMax = value; },
		SetBaseMaxHealth(value) { assert.ok(value < 1e9); }, SetHealth(value) { this.engineHealth = value; }, ModifyHealth(value) { this.engineHealth = value; },
		GetMaxMana() { return this.engineManaMax; }, GetMana() { return this.engineMana; }, SetMaxMana(value) { this.engineManaMax = value; }, SetMana(value) { this.engineMana = value; },
		GetAttackDamage() { return this.engineAttack; }, GetBaseDamageMin() { return this.engineAttack; }, GetBaseDamageMax() { return this.engineAttack; },
		SetBaseDamageMin(value) { this.engineAttack = value; }, SetBaseDamageMax(value) { this.engineAttack = value; },
		GetPhysicalArmorBaseValue() { return this.engineArmor; }, SetPhysicalArmorBaseValue(value) { this.engineArmor = value; },
		IsAlive() { return this.engineHealth > 0; }, IsHero() { return this.hero; }, IsRealHero() { return this.hero; },
		IsInvulnerable() { return false; }, IsBuilding() { return false; }, IsOther() { return false; }, GetAbsOrigin() { return 0; }, HasMovementCapability() { return false; },
		Kill() { this.engineHealth = 0; },
		GetUnitName() { return this.unitName; }, GetPlayerOwnerID() { return this.hero ? this.playerID ?? 0 : -1; }, entindex() { return this.index; },
		GetLevel() { return this.level ?? 1; }, GetItemInSlot(slot) { return this.items?.[slot]; }, GetTeamNumber() { return this.hero ? 2 : 3; },
		GetBaseAttackTime() { return 1.7; }, Script_GetAttackRange() { return 150; }, SetBaseHealthRegen() {}, SetBaseManaRegen() {},
		HasModifier(name) { return !!this.modifiers[name]; }, FindModifierByName(name) { return this.modifiers[name]; },
		AddNewModifier(_caster, _ability, name, params) {
			const existing = this.modifiers[name]; if (existing) { existing.OnRefresh(params ?? {}); return existing; }
			const result = Object.assign(Object.create(context[name]), { unit: this, modifierName: name });
			this.modifiers[name] = result; result.OnCreated(params ?? {}); return result;
		},
		SetMaximumGoldBounty() {}, SetMinimumGoldBounty() {}, SetDeathXP() {},
	};
	if (!server) {
		// 客户端不提供这些服务端属性接口，也没有全局 RandomFloat。
		for (const name of ['GetBaseDamageMin', 'GetBaseDamageMax', 'GetPhysicalArmorBaseValue', 'SetBaseDamageMin', 'SetBaseDamageMax', 'SetPhysicalArmorBaseValue', 'SetBaseMaxHealth', 'SetMaxHealth', 'SetHealth', 'ModifyHealth', 'SetMaxMana', 'SetMana']) delete engine[name];
	}
	const netTables = new Map();
	const context = vm.createContext({ console, math: Object.assign(Object.create(Math), { huge: Infinity }), tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		// Lua 的 pairs(nil) 会报错，不能用空表回退掩盖生产装饰器的参数问题。
		pairs: value => { assert.ok(value != null, "bad argument #1 to 'pairs' (table expected, got nil)"); return Object.entries(value); },
		ipairs: value => (value ?? []).map((v, i) => [i + 1, v]),
		IsServer: () => server, IsClient: () => !server, IsValid: value => value != null && value.valid !== false,
		RandomFloat: server ? min => { rolls++; return randomFactors.shift() ?? min; } : undefined,
		DoUniqueString: prefix => prefix + ':' + ++uniqueID,
		toFiniteNumber: (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback,
		CModule: function () {}, PropertySystem: undefined, PropertyData: undefined, UnitAttributes: undefined, Game: undefined, CDOTA_BaseNPC: engine, C_DOTA_BaseNPC: engine,
		modifierfunction: new Proxy({ MODIFIER_FUNCTION_LAST: 1000 }, { get: (target, key) => target[key] ?? key }),
		modifierstate: { MODIFIER_STATE_NO_HEALTH_BAR: 'no_health_bar' }, modifierpriority: { MODIFIER_PRIORITY_NORMAL: 0, MODIFIER_PRIORITY_HIGH: 50 }, LuaModifierType: { LUA_MODIFIER_MOTION_NONE: 0 }, INTENSITY_FACTOR: 1,
		KeyValues: { heroes: {}, units: {}, items: {}, GetUnitData: () => [1] }, GameRules: { GetGameTime: () => 0, GetDOTATime: () => 0, GetCustomGameDifficulty: () => difficulty },
		GameState: { GetSession: () => session }, Timer: { GameTimer(_delay, fn) { const id = 'timer' + timers.size; timers.set(id, fn); return id; }, StopTimer(id) { timers.delete(id); } },
		PlayerResource: { GetSelectedHeroEntity: id => [...units.values()].find(unit => unit.hero && unit.GetPlayerOwnerID() === id), ModifyGold: (...args) => gold.push(args) },
		EDOTA_ModifyGold_Reason: { DOTA_ModifyGold_Unspecified: 0 }, EOM_DAMAGE_TYPES: { DAMAGE_TYPE_NONE: 0, DAMAGE_TYPE_PHYSICAL: 1, DAMAGE_TYPE_MAGICAL: 2, DAMAGE_TYPE_PURE: 4 },
		DamageCategory_t: { DOTA_DAMAGE_CATEGORY_ATTACK: 1, DOTA_DAMAGE_CATEGORY_SPELL: 2 }, ATTACK_STATES: { SKIPCOUNTING: 1 << 10 },
		CustomNetTables: { SetTableValue(table, key, value) { netTables.set(table + ':' + key, value); }, GetTableValue(table, key) { return netTables.get(table + ':' + key); } },
		StateSystem: undefined, StateData: undefined,
		EntIndexToHScript: id => units.get(id), FireGameEventLocal() {},
		Event: {
			RegisterWithPriority(name, fn) { const id = ++eventID; listeners.set(id, { name, fn }); return id; },
			Register(name, fn) { const id = ++eventID; listeners.set(id, { name, fn }); return id; }, UnregisterContext() {},
			RegisterForOwner(name, fn) { const id = ++eventID; listeners.set(id, { name, fn }); return id; },
			Unregister: id => listeners.delete(id), Fire(name, data) { for (const listener of [...listeners.values()]) if (listener.name === name) listener.fn(data); },
		},
	});
	context._G = context;
	context.CModule.prototype.print = function () {};
	function load(file, imports = {}) {
		context.module = { exports: {} }; context.exports = context.module.exports;
		context.require = name => { assert.ok(Object.hasOwn(imports, name), 'unexpected import ' + name); return imports[name]; };
		// ES5 constructors can be invoked with the same instance, as Lua's ____constructor is by the real decorator.
		// transpileModule 不解析 Dota 的跨文件枚举常量，提供测试引擎的已知起始编号。
		const input = fs.readFileSync(path.join(source, file + '.ts'), 'utf8').replace('HEALTH = modifierfunction.MODIFIER_FUNCTION_LAST + 1,', 'HEALTH = 1001,');
		const code = ts.transpileModule(input, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES5, downlevelIteration: true, experimentalDecorators: true } }).outputText;
		vm.runInContext(Object.keys(imports).length > 0 ? '(function () {\n' + code + '\n})()' : code, context, { filename: file }); return context.module.exports;
	}
	const reload = { reloadable: value => value };
	load('framework/enums');
	load('framework/state_system/state_system', { '../../lib/tstl-utils': reload });
	context.StateSystem.InitializeCore();
	load('framework/property_system/property_system_types');
	load('framework/property_system/property_system', { '../../lib/tstl-utils': reload, property_system_types: {}, properties_tool: {} });
	context.PropertySystem.InitializeCore();
	load('framework/property_system/properties');
	load('framework/property_system/athena_property_map');
	load('framework/property_system/athena_properties');
	load('framework/large_number_health');
	load('override/CDOTA_BaseNPC');
	const eom = load('modifiers/eom_modifier/eom_modifier', { '../../abilities/eom_ability': { collectAbilityValueEntries: () => [] }, '../../lib/dota_ts_adapter': adapter });
	const common = load('modifiers/framework/modifier_common', { '../eom_modifier/eom_modifier': eom });
	load('framework/unit_attributes', { '../lib/tstl-utils': reload, '../modifiers/framework/modifier_common': common });
	load('modifiers/enemy/modifier_enemy_scaling', { '../eom_modifier/eom_modifier': eom });
	load('modifiers/wave_unit', { './eom_modifier/eom_modifier': eom, '../lib/dota_ts_adapter': adapter });
	load('modifiers/modifier_original_health_bar', { './eom_modifier/eom_modifier': eom });
	load('modifiers/modifier_neutral', { './eom_modifier/eom_modifier': eom });
	load('modifiers/framework/modifier_npc', { '../eom_modifier/eom_modifier': eom });
	load('modifiers/framework/modifier_no_health_bar', { '../eom_modifier/eom_modifier': eom });
	load('game', { './lib/tstl-utils': reload });
	function unit(name, kv, hero = false) {
		context.KeyValues[hero ? 'heroes' : 'units'][name] = kv;
		const result = Object.assign(Object.create(engine), { index: ++index, unitName: name, hero, modifiers: {}, engineMax: 10000, engineHealth: 10000, engineManaMax: 50, engineMana: 50, engineAttack: 7, engineArmor: 3 });
		units.set(result.index, result); return result;
	}
	return { context, unit, spawn: unit => context.Game.OnNPCSpawned({ entindex: unit.index }),
		add: (unit, name, round = 4) => unit.AddNewModifier(unit, undefined, name, { round_number: round }),
		remove(unit, name) { unit.modifiers[name].OnDestroy(); delete unit.modifiers[name]; },
		storage: unit => context.PropertyData.unitStorage[unit.index], rolls: () => rolls,
		value: (unit, property) => unit.GetProperty(context.PropertyFunction[property]),
		tick() { for (const fn of [...timers.values()]) fn(); }, session, gold, eom, load, units,
		loadDamage(targets = []) {
			Object.assign(context, { DamageSystem: undefined, Service: { GetPlayerSetting: () => false },
				// 原有 C1 增伤入口在这里不参与；新增的雅典娜公式和真实 DealDamage 完整执行。
				GetOutgoingDamagePercent: () => 0, GetIncomingDamagePercent: () => 0, PRD: (_unit, chance) => chance >= 100,
				EOM_DAMAGE_FLAGS: { NONE: 0, NO_CRIT: 2, NO_LIFESTEAL: 1 << 28, REFLECT_DAMAGE: 1 << 22 },
				DOTA_UNIT_TARGET_TEAM: {}, DOTA_UNIT_TARGET_TYPE: {}, DOTA_UNIT_TARGET_FLAGS: {}, FindOrder: {}, FindUnitsInRadius: () => targets,
			});
			context.ATTACK_STATES.NO_CLEAVE = 256; context.ATTACK_STATES.NOT_PROCESSPROCS = 4;
			load('mechanics/damage_system/damage_system', { '../../class/object_pool': {}, '../../lib/tstl-utils': reload, damage_system_type: {} });
			return context.DamageSystem;
		},
	};
}
const athena = { CustomStatusHealth: '200', StatusHealth: 10000, AttackDamage: '20', AttackDamageMin: 0, AttackDamageMax: 0, Armor: '3', StatusMana: '60', DamageReduction: '5', PhysicalCritChance: 10, PhysicalCritDamage: 150, MagicalCritChance: 5, MagicalCritDamage: 175 };

if (require.main === module) {
test('地图预载同步持有全部单位和英雄资源，覆盖重开待命英雄', () => {
	const loaded = [], precacheContext = {}, units = { athena: {}, wave_1: {}, Version: '1' }, heroes = { npc_dota_hero_antimage: {}, npc_dota_hero_phantom_assassin: {} };
	const context = vm.createContext({ SendToServerConsole() {}, Convars: { SetBool() {} },
		require: () => ({}), KeyValues: { units, heroes }, pairs: Object.entries,
		PrecacheUnitByNameSync: (name, handle) => { assert.equal(handle, precacheContext); loaded.push(name); },
	});
	const code = ts.transpileModule(fs.readFileSync(path.join(source, 'addon_game_mode.ts'), 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
	vm.runInContext(code, context); context.Precache(precacheContext);
	assert.deepEqual(loaded.sort(), [...Object.keys(units).filter(name => name !== 'Version'), ...Object.keys(heroes)].sort());
});

test('服务端和客户端都能加载无参数注册的波次精英 modifier', () => {
	for (const server of [true, false]) {
		const { context } = fixture(4, [], server);
		assert.equal(typeof context.modifier_champion.OnCreated, 'function');
		assert.equal(typeof context.modifier_elite.OnCreated, 'function');
	}
});

test('客户端出生不调用服务端随机/基础攻击接口，公共属性只读取服务端网表', () => {
	const errors = [], clients = [];
	for (const kv of [{}, { AttackDamageMin: 6, AttackDamageMax: 10 }, athena]) {
		const f = fixture(4, [], false), unit = f.unit('client_unit', kv);
		try { f.add(unit, 'modifier_common'); } catch (error) { errors.push(error.message); continue; }
		clients.push({ f, unit });
	}
	assert.deepEqual(errors, []);
	for (const { f, unit } of clients) {
		assert.equal(Object.keys(unit.modifiers.modifier_common.StaticProperty()).length, 0);
		assert.equal(f.context.PropertyData.unitStorage[unit.index], undefined);
		f.context.CustomNetTables.SetTableValue('property_system', `${f.context.PropertyScope.UNIT}_${unit.index}`, { base_health: 200, base_mana: 60, base_attack: 8 });
		assert.equal(unit.GetMaxHealth(), 200); assert.equal(unit.GetMaxMana(), 60); assert.equal(unit.GetAttackDamage(), 8);
		unit.modifiers.modifier_common.OnRefresh({}); unit.modifiers.modifier_common.SyncStats(true);
		assert.equal(unit.engineMax, 10000); assert.equal(unit.engineAttack, 7); assert.equal(f.rolls(), 0);
	}
});

test('实际单位 KV 保留正数引擎出生生命，基地逻辑生命仍由公共 modifier 初始化', () => {
	const { parseKV } = require('./kv-parser'), file = path.resolve(__dirname, '../game/athena_tsbuild/scripts/npc/npc_units_custom.txt');
	const units = parseKV(fs.readFileSync(file, 'utf8'), file).data;
	for (const [name, kv] of Object.entries(units)) if (kv && typeof kv === 'object' && kv.StatusHealth !== undefined) assert.ok(Number(kv.StatusHealth) > 0, name + ' starts dead before npc_spawned');
	const f = fixture(), unit = f.unit('athena', units.athena);
	unit.engineMax = Number(units.athena.StatusHealth); unit.engineHealth = unit.engineMax;
	f.spawn(unit); assert.equal(unit.GetHealth(), 20); assert.equal(unit.IsAlive(), true);
	unit.SetHealth(0); unit.modifiers.modifier_common.SyncStats(true); f.add(unit, 'modifier_elite'); assert.equal(unit.GetHealth(), 0);
});

test('Athena 字段优先，基地/英雄/召唤物和变身新单位共用出生入口', () => {
	const f = fixture();
	for (const [name, hero] of [['athena', false], ['hero', true], ['summon', false], ['zeus_reborn', false]]) {
		const unit = f.unit(name, athena, hero); f.spawn(unit);
		assert.equal(unit.GetMaxHealth(), 200); assert.equal(unit.GetHealth(), 200); assert.equal(unit.engineAttack, 20); assert.equal(unit.engineArmor, 3); assert.equal(unit.GetMana(), 60);
		near(f.value(unit, 'DAMAGE_REDUCTION'), 5); assert.equal(f.value(unit, 'CRIT_CHANCE'), 0); assert.equal(f.value(unit, 'CRIT_DAMAGE'), 0);
		assert.equal(f.value(unit, 'PHYSICAL_CRITICALSTRIKE_CHANCE'), 10); assert.equal(f.value(unit, 'PHYSICAL_CRITICALSTRIKE_DAMAGE'), 150);
		assert.equal(f.value(unit, 'MAGICAL_CRITICALSTRIKE_CHANCE'), 5); assert.equal(f.value(unit, 'MAGICAL_CRITICALSTRIKE_DAMAGE'), 175);
		assert.equal(f.value(unit, 'ATTACK_CRIT_CHANCE'), 0); assert.equal(f.value(unit, 'SPELL_CRIT_CHANCE'), 0);
		assert.deepEqual(Array.from(f.storage(unit).static.base_health, entry => entry.sourceId), ['modifier_common']);
	}
});
test('兼容 c1/Dota KV 与引擎默认值，零攻击和零魔法不被回退值覆盖', () => {
	const f = fixture();
	const c1 = f.unit('c1', { StatusHealth: 80, StatusMana: 0, AttackDamageMin: 6, AttackDamageMax: 10, ArmorPhysical: 2, CritChance: 7, CritDamage: 175 }); f.spawn(c1);
	assert.equal(c1.GetMaxHealth(), 80); assert.equal(c1.engineAttack, 6); assert.equal(c1.GetMana(), 0); assert.equal(c1.engineArmor, 2);
	assert.equal(f.value(c1, 'CRIT_CHANCE'), 7);
	const fallback = f.unit('fallback', {}); f.spawn(fallback); assert.equal(fallback.GetMaxHealth(), 10000); assert.equal(fallback.engineAttack, 7);
	const zero = f.unit('zero', { ...athena, AttackDamage: 0, Armor: 0, StatusMana: 0 }); f.spawn(zero); assert.equal(zero.engineAttack, 0); assert.equal(zero.engineArmor, 0); assert.equal(zero.GetMana(), 0);
});
test('难度/波次与两种精英按原版公式组合；刷新、叠层和重生不重复加成或重抽随机', () => {
	const f = fixture(), unit = f.unit('wave_4', athena); f.spawn(unit);
	f.add(unit, 'modifier_enemy_scaling'); f.add(unit, 'modifier_champion'); f.add(unit, 'modifier_elite');
	const factor = 1.5 ** 4 * 1.04 ** 4, bonus = 2 * 1.04 ** 4, expected = Math.floor(200 * factor * (1 + 2 * bonus));
	assert.equal(unit.GetMaxHealth(), expected); near(unit.engineAttack, 20 * factor * (1 + 2 * bonus)); near(unit.engineArmor, 3 * factor);
	assert.equal(f.value(unit, 'BASE_HEALTH'), 200); assert.equal(f.storage(unit).static.base_health.length, 1);
	const rolls = f.rolls();
	for (let i = 0; i < 3; i++) { f.add(unit, 'modifier_enemy_scaling'); f.add(unit, 'modifier_champion'); f.add(unit, 'modifier_elite'); }
	assert.equal(unit.GetMaxHealth(), expected); assert.equal(f.rolls(), rolls);
	unit.SetHealth(0); unit.modifiers.modifier_common.SyncStats(); assert.equal(unit.GetHealth(), 0);
	unit.engineHealth = 10000; f.spawn(unit); assert.equal(unit.GetHealth(), expected); assert.equal(f.rolls(), rolls);
	unit.modifiers.modifier_champion.SetStackCount(5);
	assert.equal(unit.GetMaxHealth(), Math.floor(200 * factor * (1 + bonus + 2 * 1.04 ** 5)));
	f.remove(unit, 'modifier_elite'); near(unit.engineAttack, 20 * factor * (1 + 2 * 1.04 ** 5));
});
test('成长 modifier 先于 npc_spawned 时仍读到完整基础值，野怪免难度/波次倍率', () => {
	const f = fixture();
	const unit = f.unit('wave_4', athena); f.add(unit, 'modifier_enemy_scaling'); f.add(unit, 'modifier_elite'); f.spawn(unit);
	const factor = 1.5 ** 4 * 1.04 ** 4, bonus = 2 * 1.04 ** 4;
	assert.equal(unit.GetHealth(), Math.floor(200 * factor * (1 + bonus))); near(unit.engineAttack, 20 * factor * (1 + bonus));
	const neutral = f.unit('neutral', { ...athena, IsNeutralUnitType: 1 }); f.spawn(neutral); f.add(neutral, 'modifier_enemy_scaling', 99);
	assert.equal(neutral.GetMaxHealth(), 200); assert.equal(neutral.engineAttack, 20); assert.equal(neutral.engineArmor, 3);
	const random = fixture(4, [1.5, 1.25, 1.75]), creature = random.unit('random_neutral', { ...athena, IsNeutralUnitType: 1 });
	random.spawn(creature); random.add(creature, 'modifier_enemy_scaling', 99);
	assert.equal(creature.GetMaxHealth(), 300); assert.equal(creature.engineArmor, 3.75); assert.equal(creature.engineAttack, 35);
});
test('属性添加/移除保持生命魔法比例；大数值生命只写代理值，死亡后不复活', () => {
	const f = fixture(), unit = f.unit('wave', athena); f.spawn(unit); unit.SetHealth(100); unit.SetMana(30);
	f.add(unit, 'modifier_enemy_scaling'); near(unit.GetHealth() / unit.GetMaxHealth(), 0.5); assert.equal(unit.GetMana(), 30);
	f.remove(unit, 'modifier_enemy_scaling'); near(unit.GetHealth(), 100); assert.equal(unit.GetMana(), 30); assert.equal(unit.engineAttack, 20);
	const huge = f.unit('huge', { ...athena, CustomStatusHealth: 2e9 }); f.spawn(huge); assert.equal(huge.GetHealth(), 2e9); assert.equal(huge.engineMax, 1e6);
	huge.SetHealth(1e9); f.add(huge, 'modifier_enemy_scaling'); near(huge.GetHealth() / huge.GetMaxHealth(), 0.5); assert.equal(huge.engineHealth, 5e5);
	huge.SetHealth(0); huge.modifiers.modifier_common.SyncStats(); assert.equal(huge.GetHealth(), 0); assert.equal(huge.engineHealth, 0);
});

test('原版三围取整和派生公式，升级额外成长仅累计本次升级', () => {
	const f = fixture(), c = f.context;
	c.UnitAttributes.init();
	const unit = f.unit('attribute_hero', { ...athena, BaseStrength: 28, StrengthGain: 3, BaseAgility: 13, AgilityGain: 1.8, BaseIntellect: 22, IntellectGain: 2 }, true);
	f.spawn(unit); assert.equal(c.GetStrength(unit), 28); assert.equal(unit.GetMaxHealth(), 760); assert.equal(unit.GetMaxMana(), 324); assert.equal(unit.GetAttackDamage(), 137);
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_STRENGTH_GAIN', 4); unit.level = 3;
	c.Event.Fire('hero_level_up', { unit, old_level: 1, level: 3 });
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_STRENGTH'), 8); assert.equal(c.GetStrength(unit), 42); assert.equal(c.GetAgility(unit), 16);
	const id = c.PROPERTY_MAP_REVERSE[c.PropertyFunction.STATS_STRENGTH_BASE_PERCENTAGE];
	c.PropertySystem.AddStaticProperty(unit.index, id, 'skill', 50);
	assert.equal(c.GetStrength(unit), 63); assert.equal(unit.GetMaxHealth(), 1460);
	near(c.GetAthenaDamageBlock(unit, { attacker: unit }), 12.6);
});
test('装备先乘算再与永久相加，卸装不丢永久属性，吞噬列表持续保留', () => {
	const f = fixture(), c = f.context, unit = f.unit('items_hero', athena, true); f.spawn(unit);
	function item(name, values) { c.KeyValues.items[name] = {}; return { GetAbilityName: () => name, GetSpecialValueFor: key => values[key] ?? 0 }; }
	unit.items = [item('a', { item_evasion: 20, item_outgoing_damage: 50, item_attack_damage: 10, item_movement_speed_pct: 20 }), item('b', { item_evasion: 20, item_outgoing_damage: 50, item_attack_damage: 10, item_movement_speed_pct: 20 })];
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_EVASION', 10); unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK', 30);
	c.UnitAttributes.RefreshItems(unit); near(c.GetAthenaEvasion(unit), 46); near(c.GetItemOutgoingDamage(unit), 125); near(c.GetMovespeedAmplify(unit), 36); near(unit.GetAttackDamage(), 70);
	const eaten = item('devoured', { item_attack_damage: 5 }); c.UnitAttributes.RefreshItems(unit, [eaten]); near(unit.GetAttackDamage(), 75);
	unit.items = []; c.UnitAttributes.RefreshItems(unit); near(unit.GetAttackDamage(), 55); near(c.GetAthenaEvasion(unit), 10);
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 30);
	c.UnitAttributes.RefreshItems(unit, []); near(unit.GetAttackDamage(), 50);
});
test('伤害类型暴击、护甲/魔抗/格挡和旧版增伤乘区', () => {
	const f = fixture(), c = f.context, unit = f.unit('combat_hero', athena, true), target = f.unit('enemy', { ...athena, Armor: 10 });
	f.spawn(unit); f.spawn(target);
	for (const category of [1, 2]) {
		assert.equal(c.GetAthenaCritChance(unit, { damage_type: 1, damage_category: category }), 10);
		assert.equal(c.GetAthenaCritChance(unit, { damage_type: 2, damage_category: category }), 5);
	}
	near(c.GetAthenaIncomingMultiplier(target, { attacker: unit, damage_type: 1 }), 0.625);
	near(c.GetAthenaIncomingMultiplier(target, { attacker: unit, damage_type: 2 }), 0.75);
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_PHYSICAL_DAMAGE', 50); unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_FINALLY_DAMAGE', 50);
	near(c.GetAthenaOutgoingMultiplier(unit, { attacker: unit, damage_type: 1 }), 2.25);
	near(c.GetAthenaOutgoingMultiplier(unit, { attacker: unit, damage_type: 2 }), 1.5);
});
test('每秒/分钟、攻击计数和任务奖励按生命周期工作，结算后停止', () => {
	const f = fixture(), c = f.context, unit = f.unit('growth_hero', athena, true); f.spawn(unit); c.UnitAttributes.init();
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_PER_SEC', 2); unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_PER_MIN', 10);
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_ATTACK', 3); c.Event.Fire('game_start', { runId: 1 });
	for (let i = 0; i < 60; i++) f.tick();
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 130);
	c.Event.Fire('damage_event', { attacker: unit, damage_category: 1, attack_states: 1024 }); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 130);
	c.Event.Fire('damage_event', { attacker: unit, damage_category: 1 }); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 133);
	const reward = { handled: false, type: 'TASK_REWARD_TYPE_ATTRIBUTE', playerID: 0, name: 'CUSTOM_ATTRIBUTE_ATTACK', amount: 7 };
	c.Event.Fire('task_reward', reward); assert.equal(reward.handled, true); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 140);
	c.Event.Fire('game_end', { run_id: 1 }); f.tick(); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 140);
});
test('双玩家隔离，销毁的旧英雄也释放玩家级来源，重置不会清除外部来源', () => {
	const f = fixture(), c = f.context, one = f.unit('one', athena, true), two = f.unit('two', athena, true); two.playerID = 1;
	f.spawn(one); f.spawn(two); c.UnitAttributes.init();
	one.AddPermanentAttribute('CUSTOM_ATTRIBUTE_EXPERIENCE', 20); two.AddPermanentAttribute('CUSTOM_ATTRIBUTE_EXPERIENCE', 50);
	const exp = c.PROPERTY_MAP_REVERSE[c.PropertyFunction.PLAYER_EXPERIENCE_GAIN_PERCENTAGE]; c.PropertySystem.AddStaticProperty(0, exp, 'external', 10);
	assert.equal(c.GetPlayerExperienceGainPercentage(0), 30); assert.equal(c.GetPlayerExperienceGainPercentage(1), 50);
	one.valid = false; c.Event.Fire('game_reset', { runId: 1 });
	assert.equal(c.GetPlayerExperienceGainPercentage(0), 10); assert.equal(c.GetPlayerExperienceGainPercentage(1), 0);
	assert.equal(two.GetPermanentAttribute('CUSTOM_ATTRIBUTE_EXPERIENCE'), 0);
});

test('生产伤害入口执行物理/魔法暴击、吸血、分裂且不递归计数', () => {
	const f = fixture(), c = f.context, unit = f.unit('leech', { ...athena, Armor: 0 }, true), target = f.unit('primary', { CustomStatusHealth: 1000, Armor: 0 }), other = f.unit('secondary', { CustomStatusHealth: 1000, Armor: 0 });
	f.spawn(unit); f.spawn(target); f.spawn(other); c.UnitAttributes.init(); c.Event.Fire('game_start', { runId: 1 });
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ALL_LIFESTEAL', 20); unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_ATTACK', 3);
	unit.SetHealth(100);
	const damage = f.loadDamage([target, other]);
	const add = (property, value) => c.PropertySystem.AddStaticProperty(unit.index, c.PROPERTY_MAP_REVERSE[c.PropertyFunction[property]], 'test', value);
	add('CLEAVE_DAMAGE', 50); add('CLEAVE_RADIUS', 300);
	damage.DealDamage({ attacker: unit, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2 });
	near(target.GetHealth(), 900); near(other.GetHealth(), 950); near(unit.GetHealth(), 130);
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 3);
	damage.DealDamage({ attacker: unit, target, damage: 100, damage_type: 2, damage_category: 2, damage_flags: 2 | 1 << 28 });
	near(target.GetHealth(), 825); near(unit.GetHealth(), 130);
	add('PHYSICAL_CRITICALSTRIKE_CHANCE', 100); damage.DealDamage({ attacker: unit, target, damage: 100, damage_type: 1, damage_category: 2 });
	near(target.GetHealth(), 675);
	const sounds = []; c.EmitSoundOn = sound => sounds.push(sound);
	c.PropertySystem.RegisterDynamicProperty(unit.index, 'criticalstrike_sound', 'sound', () => 'Hero_PhantomAssassin.CoupDeGrace');
	damage.DealDamage({ attacker: unit, target, damage: 100, damage_type: 1, damage_category: 1 });
	assert.deepEqual(sounds, ['Hero_PhantomAssassin.CoupDeGrace']); near(target.GetHealth(), 525);
});

test('同一死亡的双上报只成长一次，复活后可再次计数', () => {
	const f = fixture(), c = f.context, unit = f.unit('killer', athena, true), victim = f.unit('victim', athena);
	f.spawn(unit); f.spawn(victim); c.UnitAttributes.init(); c.Event.Fire('game_start', { runId: 1 });
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_KILL_ATTACK', 4);
	for(let i=0;i<2;i++) c.Event.Fire('entity_killed', { attacker: unit, victim });
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 4); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_STRENGTH'), 4);
	c.Event.Fire('npc_spawned', { unit: victim }); c.Event.Fire('entity_killed', { attacker: unit, victim });
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 8);
});
test('EOM modifier 的玩家静态和动态属性按 playerID 注册，释放不误删同索引玩家', () => {
	const f = fixture(), c = f.context, unit = f.unit('scope_hero', athena, true); f.spawn(unit);
	const exp = c.PropertyFunction.PLAYER_EXPERIENCE_GAIN_PERCENTAGE, drop = c.PropertyFunction.PLAYER_DROP_CHANCE_PERCENTAGE;
	const probe = Object.assign(Object.create(f.eom.EOMModifier.prototype), {
		GetParent: () => unit, GetName: () => 'scope_probe',
		StaticProperty: () => ({ [exp]: 20 }), DynamicProperty: () => ({ [drop]: () => 15 }),
	});
	c.PropertySystem.AddStaticProperty(unit.index, c.PROPERTY_MAP_REVERSE[exp], 'scope_probe', 90);
	probe.OnCreated({}); assert.equal(c.GetPlayerExperienceGainPercentage(0), 20); assert.equal(c.GetPlayerDropChancePercentage(0), 15);
	probe.OnDestroy(); assert.equal(c.GetPlayerExperienceGainPercentage(0), 0); assert.equal(c.GetPlayerDropChancePercentage(0), 0);
	assert.equal(c.GetPlayerExperienceGainPercentage(unit.index), 90);
});
test('盘点快照、KV 元数据和生成映射一一对应，旧版未登记字段不进入装备汇总', () => {
	const f = fixture(), c = f.context, { parseKV } = require('./kv-parser');
	const inventory = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../docs/athena-property-inventory.json'), 'utf8'));
	const p = path.join(source, 'framework/property_system/properties.kv'), kv = parseKV(fs.readFileSync(p, 'utf8'), p).data;
	for (const [kind, map, expected] of [['modifier', c.ATHENA_MODIFIER_PROPERTIES, 97], ['permanent', c.ATHENA_PERMANENT_PROPERTIES, 67], ['item', c.ATHENA_ITEM_PROPERTIES, 75]]) {
		assert.equal(Object.keys(map).length, expected);
		for (const record of inventory.records.filter(record => record.kind === kind)) {
			assert.equal(map[record.old], c.PropertyFunction[record.property], record.old);
			assert.ok(kv[record.property]);
		}
	}
	for (const record of inventory.records.filter(record => record.kind === 'item_unlisted')) assert.equal(c.ATHENA_ITEM_PROPERTIES[record.old], undefined);
});
test('保留的永久每分钟智力/护甲不会被自动激活，客户端按网表计算三围', () => {
	const f = fixture(), c = f.context, unit = f.unit('reserved', athena, true); f.spawn(unit); c.UnitAttributes.init();
	unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_INTELLECT_PER_MIN', 50); unit.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ARMOR_PER_MIN', 50);
	c.Event.Fire('game_start', { runId: 1 }); for (let i = 0; i < 60; i++) f.tick();
	assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_INTELLECT'), 0); assert.equal(unit.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ARMOR'), 0);
	const client = fixture(4, [], false), hero = client.unit('client_stat', {}, true); hero.level = 2;
	client.context.CustomNetTables.SetTableValue('property_system', `${client.context.PropertyScope.UNIT}_${hero.index}`, {
		base_health: 200, base_mana: 60, base_attack: 20, base_strength: 28, strength_gain: 3, base_agility: 13, agility_gain: 1.8, base_intellect: 22, intellect_gain: 2,
	});
	assert.equal(client.context.GetStrength(hero), 31); assert.equal(client.context.GetAgility(hero), 14); assert.equal(client.context.GetIntellect(hero), 24);
	assert.equal(hero.GetMaxHealth(), 820); assert.equal(hero.GetMaxMana(), 348); assert.equal(hero.GetAttackDamage(), 148);
});
console.log(`Passed ${passed} common and Athena property checks.`);
}
module.exports = { fixture };
