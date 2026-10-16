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
	let index = 0, eventID = 0, rolls = 0;
	const listeners = new Map(), units = new Map();
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
		GetUnitName() { return this.unitName; }, GetPlayerOwnerID() { return this.hero ? 0 : -1; }, entindex() { return this.index; },
		GetLevel() { return 1; },
		HasModifier(name) { return !!this.modifiers[name]; }, FindModifierByName(name) { return this.modifiers[name]; },
		AddNewModifier(_caster, _ability, name, params) {
			const existing = this.modifiers[name]; if (existing) { existing.OnRefresh(params ?? {}); return existing; }
			const result = Object.assign(Object.create(context[name]), { unit: this, modifierName: name });
			this.modifiers[name] = result; result.OnCreated(params ?? {}); return result;
		},
		SetMaximumGoldBounty() {}, SetMinimumGoldBounty() {}, SetDeathXP() {},
	};
	const context = vm.createContext({ console, math: Math, tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		// Lua 的 pairs(nil) 会报错，不能用空表回退掩盖生产装饰器的参数问题。
		pairs: value => { assert.ok(value != null, "bad argument #1 to 'pairs' (table expected, got nil)"); return Object.entries(value); },
		ipairs: value => (value ?? []).map((v, i) => [i + 1, v]),
		IsServer: () => server, IsClient: () => !server, IsValid: value => value != null && value.valid !== false,
		RandomFloat: min => { rolls++; return randomFactors.shift() ?? min; },
		CModule: function () {}, PropertySystem: undefined, PropertyData: undefined, Game: undefined, CDOTA_BaseNPC: engine, C_DOTA_BaseNPC: engine,
		modifierfunction: new Proxy({ MODIFIER_FUNCTION_LAST: 1000 }, { get: (target, key) => target[key] ?? key }),
		modifierstate: {}, LuaModifierType: { LUA_MODIFIER_MOTION_NONE: 0 }, INTENSITY_FACTOR: 1,
		KeyValues: { heroes: {}, units: {} }, GameRules: { GetGameTime: () => 0, GetDOTATime: () => 0, GetCustomGameDifficulty: () => difficulty },
		CustomNetTables: { SetTableValue() {} }, StateSystem: { RemoveStaticState() {}, UnregisterDynamicState() {} },
		EntIndexToHScript: id => units.get(id), FireGameEventLocal() {},
		Event: {
			RegisterForOwner(name, fn) { const id = ++eventID; listeners.set(id, { name, fn }); return id; },
			Unregister: id => listeners.delete(id), Fire(name, data) { for (const listener of [...listeners.values()]) if (listener.name === name) listener.fn(data); },
		},
	});
	context._G = context;
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
	load('framework/property_system/property_system_types');
	load('framework/property_system/property_system', { '../../lib/tstl-utils': reload, property_system_types: {}, properties_tool: {} });
	context.PropertySystem.InitializeCore();
	load('framework/property_system/properties');
	load('framework/large_number_health');
	load('override/CDOTA_BaseNPC');
	const eom = load('modifiers/eom_modifier/eom_modifier', { '../../abilities/eom_ability': { collectAbilityValueEntries: () => [] }, '../../lib/dota_ts_adapter': adapter });
	load('modifiers/framework/modifier_common', { '../eom_modifier/eom_modifier': eom });
	load('modifiers/enemy/modifier_enemy_scaling', { '../eom_modifier/eom_modifier': eom });
	load('modifiers/wave_unit', { './eom_modifier/eom_modifier': eom, '../lib/dota_ts_adapter': adapter });
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
	};
}
const athena = { CustomStatusHealth: '200', StatusHealth: 10000, AttackDamage: '20', AttackDamageMin: 0, AttackDamageMax: 0, Armor: '3', StatusMana: '60', DamageReduction: '5', PhysicalCritChance: 10, PhysicalCritDamage: 150, MagicalCritChance: 5, MagicalCritDamage: 175 };

test('服务端和客户端都能加载无参数注册的波次精英 modifier', () => {
	for (const server of [true, false]) {
		const { context } = fixture(4, [], server);
		assert.equal(typeof context.modifier_champion.OnCreated, 'function');
		assert.equal(typeof context.modifier_elite.OnCreated, 'function');
	}
});

test('Athena 字段优先，基地/英雄/召唤物和变身新单位共用出生入口', () => {
	const f = fixture();
	for (const [name, hero] of [['athena', false], ['hero', true], ['summon', false], ['zeus_reborn', false]]) {
		const unit = f.unit(name, athena, hero); f.spawn(unit);
		assert.equal(unit.GetMaxHealth(), 200); assert.equal(unit.GetHealth(), 200); assert.equal(unit.engineAttack, 20); assert.equal(unit.engineArmor, 3); assert.equal(unit.GetMana(), 60);
		near(f.value(unit, 'DAMAGE_REDUCTION'), 5); assert.equal(f.value(unit, 'CRIT_CHANCE'), 0); assert.equal(f.value(unit, 'CRIT_DAMAGE'), 0);
		assert.equal(f.value(unit, 'ATTACK_CRIT_CHANCE'), 10); assert.equal(f.value(unit, 'ATTACK_CRIT_DAMAGE'), 150);
		assert.equal(f.value(unit, 'SPELL_CRIT_CHANCE'), 5); assert.equal(f.value(unit, 'SPELL_CRIT_DAMAGE'), 175);
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
console.log(`Passed ${passed} common modifier checks.`);
