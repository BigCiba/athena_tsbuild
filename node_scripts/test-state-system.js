/* 执行生产 StateSystem、NPC 覆盖与客户端读取；引擎只提供实体、计时器和网表容器。 */
const fs = require('fs'), path = require('path'), vm = require('vm'), ts = require('typescript'), assert = require('node:assert/strict');
const source = path.resolve(__dirname, '../content/athena_tsbuild/scripts/vscripts');
let passed = 0, failed = 0;
function test(name, check) {
	try { check(); passed++; console.log('PASS ' + name); }
	catch (error) { failed++; console.error('FAIL ' + name + ': ' + error.message); }
}
function fixture(server = true, tables = new Map()) {
	let now = 0;
	const timers = [], events = [], writes = [];
	function CModule() {}
	CModule.prototype.print = function () {};
	const engine = {};
	const c = vm.createContext({ console, CModule, StateData: undefined, StateSystem: undefined, IsServer: () => server, IsClient: () => !server,
		GameRules: { GetGameTime: () => now }, Timer: { GameTimer(_delay, fn) { timers.push(fn); } }, IsInToolsMode: () => false,
		String, tonumber: Number, tostring: String, pairs: Object.entries, IsValid: value => value != null && value.valid !== false,
		Event: { Fire(name, data) { events.push({ name, ...data }); } }, CDOTA_BaseNPC: engine, C_DOTA_BaseNPC: engine,
		CustomNetTables: { SetTableValue(table, key, value) { tables.set(table + ':' + key, structuredClone(value)); writes.push({ table, key, value }); },
			GetTableValue: (table, key) => tables.get(table + ':' + key), GetAllTableKeys: table => [...tables.keys()].filter(key => key.startsWith(table + ':')).map(key => key.slice(table.length + 1)) },
	});
	c._G = c;
	function load(file, imports = {}) {
		c.module = { exports: {} }; c.exports = c.module.exports;
		c.require = name => { assert.ok(Object.hasOwn(imports, name), 'unexpected import ' + name); return imports[name]; };
		vm.runInContext(ts.transpileModule(fs.readFileSync(path.join(source, file + '.ts'), 'utf8'), {
			compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true },
		}).outputText, c, { filename: file });
		return c.module.exports;
	}
	load('framework/enums');
	load('framework/state_system/state_system', { '../../lib/tstl-utils': { reloadable: value => value } });
	c.StateSystem.init(false);
	load('override/CDOTA_BaseNPC');
	return { c, system: c.StateSystem, tables, events, writes, load,
		unit(index = 1) { return Object.assign(Object.create(engine), { entindex: () => index, GetEntityIndex: () => index }); }, timerCount: () => timers.length,
		tick() { now += 0.2; timers[0](); },
	};
}

test('单位 HasState 连接生产 StateSystem，客户端读取相同网表', () => {
	const f = fixture(), state = f.c.StateEnum.ATTACK_IMMUNE;
	f.system.AddStaticState(1, state, 'buff', true);
	assert.equal(f.unit().HasState(state), true);
	f.tick(); const client = fixture(false, f.tables);
	assert.equal(client.unit().HasState(state), true);
});
test('高优先级 false 覆盖低优先级 true，移除后恢复', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'bar', 'low', true, 0);
	f.system.AddStaticState(1, 'bar', 'high', false, 100);
	assert.equal(f.system.GetStateValue(1, 'bar'), false);
	f.system.RemoveStaticState(1, 'high'); assert.equal(f.system.GetStateValue(1, 'bar'), true);
});
test('静态与动态来源共同按优先级决胜，动态 false 同样有效', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'state', 'static', false, 100);
	f.system.RegisterDynamicState(1, 'state', 'dynamic', () => true, 0);
	assert.equal(f.system.GetStateValue(1, 'state'), false);
	f.system.RegisterDynamicState(1, 'state', 'dynamic', () => true, 200);
	assert.equal(f.system.GetStateValue(1, 'state'), true);
	f.system.RegisterDynamicState(1, 'state', 'dynamic', () => false, 200);
	assert.equal(f.system.GetStateValue(1, 'state'), false);
});
test('动态条件变化立即生效，无需手动清缓存', () => {
	const f = fixture(); let value = false;
	f.system.RegisterDynamicState(1, 'dynamic', 'buff', () => value);
	assert.equal(f.system.GetStateValue(1, 'dynamic'), false);
	value = true; assert.equal(f.system.GetStateValue(1, 'dynamic'), true);
	value = false; assert.equal(f.system.GetStateValue(1, 'dynamic'), false);
});
test('从未被服务端查询的动态状态也能首次同步，条件改变后主动更新客户端', () => {
	const f = fixture(); let value = true;
	f.system.RegisterDynamicState(1, 'dynamic', 'buff', () => value);
	f.tick(); const client = fixture(false, f.tables);
	assert.equal(client.system.GetStateValue(1, 'dynamic'), true);
	value = false; f.tick(); assert.equal(client.system.GetStateValue(1, 'dynamic'), false);
});
test('数值 0 是有效状态 ID，按 ID 移除不能误删同来源其他状态', () => {
	const f = fixture();
	f.system.AddStaticState(1, 0, 'same', true); f.system.AddStaticState(1, 1, 'same', true);
	f.system.RemoveStaticState(1, 'same', 0);
	assert.equal(f.system.GetStateValue(1, 0), false); assert.equal(f.system.GetStateValue(1, 1), true);
});

test('同优先级后登记者优先，刷新不偷偷改变登记顺序', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'tie', 'first', true, 10); f.system.AddStaticState(1, 'tie', 'last', false, 10);
	assert.equal(f.system.GetStateValue(1, 'tie'), false);
	f.system.AddStaticState(1, 'tie', 'first', true, 10); assert.equal(f.system.GetStateValue(1, 'tie'), false);
	f.system.RegisterDynamicState(1, 'tie', 'dynamic', () => true, 10); assert.equal(f.system.GetStateValue(1, 'tie'), true);
});
test('动态 undefined 让出优先级，false 明确覆盖；异常来源不阻断其他来源', () => {
	const f = fixture(); let value;
	f.system.AddStaticState(1, 'state', 'base', true, 0);
	f.system.RegisterDynamicState(1, 'state', 'override', () => value, 100);
	assert.equal(f.system.GetStateValue(1, 'state'), true); value = false; assert.equal(f.system.GetStateValue(1, 'state'), false);
	f.system.RegisterDynamicState(1, 'state', 'broken', () => { throw Error('expected test failure'); }, 200);
	assert.equal(f.system.GetStateValue(1, 'state'), false); value = undefined; assert.equal(f.system.GetStateValue(1, 'state'), true);
});
test('静态和动态专用查询互不污染，带参数的查询不覆盖默认客户端状态', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'state', 'static', true, 0);
	f.system.RegisterDynamicState(1, 'state', 'dynamic', params => params?.enabled ?? false, 100);
	assert.equal(f.system.GetStaticStateValue(1, 'state'), true); assert.equal(f.system.GetDynamicStateValue(1, 'state'), false);
	assert.equal(f.system.GetStateValue(1, 'state', { enabled: true }), true);
	f.tick(); assert.equal(f.system.GetStateValueFromNetTable(1, 'state'), false);
});
test('动态优先级变化也会在无人查询时同步，默认优先级与静态来源一致', () => {
	const f = fixture(); let priority = 0;
	f.system.AddStaticState(1, 'state', 'dynamicPriority', true, () => priority);
	f.system.AddStaticState(1, 'state', 'fixed', false, 10); f.tick();
	priority = 20; f.tick(); assert.equal(f.system.GetStateValueFromNetTable(1, 'state'), true);
	f.system.AddStaticState(2, 'state', 'static', true); f.system.RegisterDynamicState(2, 'state', 'dynamic', () => false);
	assert.equal(f.system.GetStateValue(2, 'state'), false);
});
test('动态变化只发送一次事件和一次新快照，相同条件不反复写网表', () => {
	const f = fixture(); let value = false;
	f.system.RegisterDynamicState(1, 'state', 'dynamic', () => value); f.tick();
	const count = () => f.writes.filter(write => write.key === 'unit_1').length;
	const original = count(); for (let i = 0; i < 5; i++) f.tick(); assert.equal(count(), original);
	value = true; f.tick(); assert.equal(count(), original + 1);
	const events = f.events.filter(event => event.stateId === 'state'); assert.equal(events.length, 1); assert.equal(events[0].newValue, true);
	for (let i = 0; i < 5; i++) f.system.GetStateValue(1, 'state'); f.tick(); assert.equal(count(), original + 1);
});
test('来源整体释放只通知最终值，不暴露静态/动态清理之间的中间状态', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'state', 'other', false, -10);
	f.system.RegisterDynamicState(1, 'state', 'same', () => true, 0);
	f.system.AddStaticState(1, 'state', 'same', false, 100); f.events.length = 0;
	f.system.CleanupSourceStates(1, 'same'); assert.equal(f.system.GetStateValue(1, 'state'), false); assert.equal(f.events.length, 0);
});
test('来源移除同步 false，实体清理不会复活旧快照；空查询不创建存储', () => {
	const f = fixture();
	assert.equal(f.system.GetStateValue(900, 'missing'), false); assert.equal(f.c.StateData.unitStorage[900], undefined);
	f.system.RegisterDynamicState(1, 0, 'same', () => true); f.system.RegisterDynamicState(1, 1, 'same', () => true); f.tick();
	f.system.UnregisterDynamicState(1, 'same', 0); f.tick();
	assert.equal(f.system.GetStateValueFromNetTable(1, 0), false); assert.equal(f.system.GetStateValueFromNetTable(1, 1), true);
	f.system.CleanupUnitStatesByIndex(1); f.tick(); assert.equal(f.system.GetStateValueFromNetTable(1, 1), false);
	assert.equal(f.c.StateData.unitStorage[1], undefined);
});
test('多单位隔离，重置和热重载不会重复开同步计时器或保留旧状态', () => {
	const f = fixture();
	f.system.AddStaticState(1, 'state', 'same', true); f.system.AddStaticState(2, 'state', 'same', false); f.tick();
	assert.equal(f.system.GetStateValueFromNetTable(1, 'state'), true); assert.equal(f.system.GetStateValueFromNetTable(2, 'state'), false);
	const timers = f.timerCount(); f.system.init(true); assert.equal(f.timerCount(), timers);
	f.system.reset(); f.tick(); assert.equal(f.system.GetStateValueFromNetTable(1, 'state'), false);
	assert.equal(Object.keys(f.c.StateData.unitStorage).length, 0);
});
test('最后一个 false 来源移除后能回收空存储，相同客户端结果不重复写入', () => {
	const f = fixture(); f.system.AddStaticState(1, 'state', 'false_source', false); f.tick();
	const writes = f.writes.filter(write => write.key === 'unit_1').length;
	f.system.RemoveStaticState(1, 'false_source'); f.tick();
	assert.equal(f.system.CleanupEmptyStorages(), 1); assert.equal(f.c.StateData.unitStorage[1], undefined);
	assert.equal(f.writes.filter(write => write.key === 'unit_1').length, writes);
});

const { fixture: dotaFixture } = require('./test-common-modifier');
test('真实 EOM modifier 的动态状态使用 GetPriority，同名多实例独立释放', () => {
	const f = dotaFixture(), c = f.context, unit = f.unit('state_hero', {}, true), state = c.StateEnum.NO_HEALTH_BAR;
	function probe(priority, value) { return Object.assign(Object.create(f.eom.EOMModifier.prototype), {
		GetParent: () => unit, GetName: () => 'same_modifier', GetPriority: () => priority, DynamicState: () => ({ [state]: () => value }),
	}); }
	const low = probe(0, true), high = probe(100, false); low.OnCreated({}); high.OnCreated({});
	assert.equal(unit.HasState(state), false); high.OnDestroy(); assert.equal(unit.HasState(state), true);
	low.OnDestroy(); assert.equal(unit.HasState(state), false);
});
test('真实 modifier 刷新和叠层重建动态回调，省略字段后释放旧状态', () => {
	const f = dotaFixture(), c = f.context, unit = f.unit('refresh_hero', {}, true), state = c.StateEnum.NO_HEALTH_BAR;
	const probe = Object.assign(Object.create(f.eom.EOMModifier.prototype), {
		GetParent: () => unit, GetName: () => 'refresh_modifier', GetPriority: () => 100, value: false, enabled: true,
		DynamicState() { const value = this.value; return this.enabled ? { [state]: () => value } : {}; },
	});
	probe.OnCreated({}); assert.equal(unit.HasState(state), false);
	probe.value = true; probe.OnRefresh({}); assert.equal(unit.HasState(state), true);
	probe.value = false; probe.OnStackCountChanged(0); assert.equal(unit.HasState(state), false);
	probe.value = true; probe.OnRefresh({}); probe.enabled = false; probe.OnRefresh({}); assert.equal(unit.HasState(state), false);
	assert.equal(c.StateData.unitStorage[unit.index].dynamic[String(state)], undefined);
});
test('原版血条提供者保留引擎血条、自定义隐藏语义，客户端高优先级 false 可重新显示', () => {
	const f = dotaFixture(), c = f.context, unit = f.unit('bar_hero', { CustomStatusHealth: 200 }, true); f.spawn(unit);
	c.Entities = {};
	vm.runInContext(ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '../src/polyfill/Entities.ts'), 'utf8'), {
		compilerOptions: { target: ts.ScriptTarget.ES2020 },
	}).outputText, c);
	for (const name of ['modifier_wave', 'modifier_neutral', 'modifier_original_health_bar', 'modifier_no_health_bar']) {
		f.add(unit, name); c.StateSystem.ForceSyncAllDirty(); assert.equal(c.Entities.HasHealthBar(unit.index), false);
		if (name !== 'modifier_no_health_bar') assert.equal(unit.modifiers[name].CheckState()[c.modifierstate.MODIFIER_STATE_NO_HEALTH_BAR], false);
		c.StateSystem.AddStaticState(unit.index, c.StateEnum.NO_HEALTH_BAR, 'trial', false, 10000);
		c.StateSystem.ForceSyncAllDirty(); assert.equal(c.Entities.HasHealthBar(unit.index), true);
		c.StateSystem.RemoveStaticState(unit.index, 'trial'); f.remove(unit, name);
	}
});
test('目标免疫暴击覆盖物理/魔法和强制暴击，攻击者 NO_CRIT 单独控制输出', () => {
	const f = dotaFixture(), c = f.context, attacker = f.unit('attacker', { CustomStatusHealth: 200, PhysicalCritChance: 100, PhysicalCritDamage: 150, MagicalCritChance: 100, MagicalCritDamage: 150 }, true);
	const target = f.unit('target', { CustomStatusHealth: 1000, Armor: 0 }); f.spawn(attacker); f.spawn(target);
	const damage = f.loadDamage(); c.StateSystem.AddStaticState(target.index, c.StateEnum.CRITICAL_IMMUNE, 'immune', true);
	const physical = { attacker, target, damage: 100, damage_type: 1, damage_category: 2, is_crit: true };
	damage.DealDamage(physical); assert.equal(physical.is_crit, false); assert.equal(target.GetHealth(), 900);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 2, damage_category: 2 }); assert.equal(target.GetHealth(), 825);
	c.StateSystem.RemoveStaticState(target.index, 'immune'); damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2 }); assert.equal(target.GetHealth(), 675);
	c.StateSystem.AddStaticState(attacker.index, c.StateEnum.NO_CRIT, 'cannot_crit', true);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2 }); assert.equal(target.GetHealth(), 575);
});
test('真实攻击弹道过滤器阻止发射并发送事件，技能弹道与目标闪避状态不混用', () => {
	const f = dotaFixture(), c = f.context, attacker = f.unit('attacker', {}), target = f.unit('target', {}), created = [], disabled = [];
	Object.assign(attacker, { GetAttachmentPosition: () => 0, GetRangedProjectileName: () => 'projectile' });
	Object.assign(c, { BULLET_WIDTH: 32, CalcDirection: () => 0, GetUnitKeyValuesByName: () => undefined, Bullet: { CreateGuidedBullet: info => created.push(info) },
		DOTA_UNIT_TARGET_TEAM: {}, DOTA_UNIT_TARGET_TYPE: {}, DOTA_UNIT_TARGET_FLAGS: {} });
	f.load('filter', { './lib/tstl-utils': { reloadable: value => value } }); c.Event.Register('attack_projectile_disabled', event => disabled.push(event));
	const input = { is_attack: 1, entindex_source_const: attacker.index, entindex_target_const: target.index, move_speed: 300 };
	c.StateSystem.AddStaticState(attacker.index, c.StateEnum.ATTACK_PROJECTILE_DISABLED, 'disable', true);
	assert.equal(c.Filter.TrackingProjectileFilter(input), false); assert.equal(created.length, 0); assert.equal(disabled.length, 1);
	assert.equal(c.Filter.TrackingProjectileFilter({ ...input, is_attack: 0 }), true); assert.equal(disabled.length, 1);
	c.StateSystem.RemoveStaticState(attacker.index, 'disable'); c.StateSystem.AddStaticState(target.index, c.StateEnum.DODGE_BULLET, 'dodge', true);
	assert.equal(c.Filter.TrackingProjectileFilter(input), false); assert.equal(created.length, 1);
});
test('客户端创建 modifier 不注册本地状态来源，预留状态没有自动提供者', () => {
	const client = dotaFixture(4, [], false), unit = client.unit('client', {}, true);
	client.add(unit, 'modifier_common'); client.add(unit, 'modifier_no_health_bar'); assert.equal(Object.keys(client.context.StateData.unitStorage).length, 0);
	const f = dotaFixture(), c = f.context, hero = f.unit('reserved', {}, true); f.spawn(hero);
	for (const name of ['DASH_DISABLE', 'TELEPORT_DISABLE', 'FEAR', 'CRITICAL_IMMUNE', 'ATTACK_PROJECTILE_DISABLED']) {
		assert.equal(typeof c.StateEnum[name], 'number'); assert.equal(hero.HasState(c.StateEnum[name]), false);
	}
});
test('真实野怪 modifier 通过 StateSystem 的 FEAR 停止回营，原生恐惧独立生效', () => {
	const f = dotaFixture(), c = f.context, unit = f.unit('neutral_state', { CustomStatusHealth: 100, IsNeutralUnitType: 1 }), orders = [];
	let position = 0, engineFear = false;
	Object.assign(unit, { HasMovementCapability: () => true, GetAbsOrigin: () => position, IsFeared: () => engineFear, IsStunned: () => false,
		GetAggroTarget: () => undefined, MoveToPosition: value => orders.push(value), MoveToPositionAggressive: value => orders.push(value) });
	Object.assign(c, { FindUnitsInRadius: () => [], DOTA_UNIT_TARGET_TEAM: {}, DOTA_UNIT_TARGET_TYPE: {}, DOTA_UNIT_TARGET_FLAGS: {}, FindOrder: {} });
	vm.runInContext('Number.prototype.Length2D = function () { return Math.abs(this.valueOf()); };', c);
	f.spawn(unit); f.add(unit, 'modifier_neutral'); position = 100;
	c.StateSystem.AddStaticState(unit.index, c.StateEnum.FEAR, 'fear', true); unit.modifiers.modifier_neutral.OnIntervalThink(); assert.equal(orders.length, 0);
	c.StateSystem.RemoveStaticState(unit.index, 'fear'); unit.modifiers.modifier_neutral.OnIntervalThink(); assert.deepEqual(orders, [0]);
	orders.length = 0; engineFear = true; unit.modifiers.modifier_neutral.OnIntervalThink(); assert.equal(orders.length, 0);
});

console.log(`State checks: ${passed} passed, ${failed} failed.`);
process.exitCode = failed ? 1 : 0;
