/* 执行生产 Event；仅模拟 Lua 容器、保护调用和引擎实体。 */
const fs = require('fs'), path = require('path'), vm = require('vm'), ts = require('typescript'), assert = require('node:assert/strict');
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { failed++; console.error('FAIL ' + name + ': ' + e.message); } }
function fixture() {
	const c = vm.createContext({ exports: {}, Event: undefined, CModule: class {}, require: () => ({ reloadable: x => x }), pairs: Object.entries,
		table: { insert: (a, i, v) => a.splice(i - 1, 0, v), remove: (a, i) => a.splice(i - 1, 1) },
		xpcall: (fn, _handler, context, data) => { try { fn.call(context, data); return [true]; } catch (e) { return [false, String(e)]; } }, traceback: x => x, print() {},
		IsValid: value => value != null && value.valid !== false,
	});
	vm.runInContext(ts.transpileModule(fs.readFileSync(path.resolve(__dirname, '../content/athena_tsbuild/scripts/vscripts/framework/event.ts'), 'utf8'), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true },
	}).outputText, c);
	return c.Event;
}
test('普通注册与优先级注册混用仍按优先级、同级后注册先执行', () => {
	const e = fixture(), order = [];
	e.RegisterWithPriority('game_init', () => order.push(200), 200);
	e.Register('game_init', () => order.push('first100'));
	e.RegisterWithPriority('game_init', () => order.push(50), 50);
	e.Register('game_init', () => order.push('last100'));
	e.Fire('game_init', {}); assert.deepEqual(order, [200, 'last100', 'first100', 50]);
});
test('分发中注销前方监听者不会重复当前回调，已注销者不再执行', () => {
	const e = fixture(), order = [];
	const id = e.Register('game_init', () => order.push('removed'));
	e.Register('game_init', () => order.push('middle'));
	e.Register('game_init', () => { order.push('newest'); e.Unregister(id); });
	e.Fire('game_init', {}); assert.deepEqual(order, ['newest', 'middle']);
});
test('Once 抛错也只能执行一次，其他监听者继续执行', () => {
	const e = fixture(); let once = 0, other = 0;
	e.Register('game_init', () => other++);
	e.Once('game_init', () => { once++; throw Error('expected'); });
	e.Fire('game_init', {}); e.Fire('game_init', {});
	assert.equal(once, 1); assert.equal(other, 2);
});
test('Once 在递归触发同一事件前就注销', () => {
	const e = fixture(); let count = 0;
	e.Once('game_init', () => { if (++count < 3) e.Fire('game_init', {}); });
	e.Fire('game_init', {}); assert.equal(count, 1);
});
test('分发中新注册监听者下次才参与，本次清空后不会复活旧快照', () => {
	const e = fixture(), order = [];
	e.Register('game_init', () => order.push('old'));
	e.Register('game_init', () => { order.push('new'); e.UnregisterAll('game_init'); e.Register('game_init', () => order.push('next')); });
	e.Fire('game_init', {}); assert.deepEqual(order, ['new']);
	e.Fire('game_init', {}); assert.deepEqual(order, ['new', 'next']);
});
test('原版严格来源→目标→全局顺序，各组后注册先调用，同玩家另一单位不通过', () => {
	const e = fixture(), source = { GetPlayerOwnerID: () => 0 }, target = {}, sibling = { GetPlayerOwnerID: () => 0 }, order = [];
	e.RegisterUnit('cleave', () => order.push('global1'), 'global');
	e.RegisterUnit('cleave', () => order.push('target1'), 'target', target);
	e.RegisterUnit('cleave', () => order.push('source1'), 'source', source);
	e.RegisterUnit('cleave', () => order.push('global2'), 'global');
	e.RegisterUnit('cleave', () => order.push('target2'), 'target', target);
	e.RegisterUnit('cleave', () => order.push('source2'), 'source', source);
	e.RegisterUnit('cleave', () => order.push('wrong'), 'source', sibling);
	e.FireUnit('cleave', {}, source, target);
	assert.deepEqual(order, ['source2', 'source1', 'target2', 'target1', 'global2', 'global1']);
});
test('同一单位同时注册来源和目标时保留原版两次分发，普通 Fire 不误触发单位监听', () => {
	const e = fixture(), unit = {}, order = [];
	e.RegisterUnit('cleave', () => order.push('source'), 'source', unit);
	e.RegisterUnit('cleave', () => order.push('target'), 'target', unit);
	e.RegisterUnit('cleave', () => order.push('legacyGlobal'), 'global');
	e.Register('cleave', () => order.push('ordinary'));
	e.Fire('cleave', {}); assert.deepEqual(order, ['ordinary']); order.length = 0;
	e.FireUnit('cleave', {}, unit, unit); assert.deepEqual(order, ['source', 'target', 'ordinary', 'legacyGlobal']);
});
test('过滤器异常被隔离；注销上下文或失效单位后不再执行', () => {
	const e = fixture(), unit = {}, context = {}, order = [];
	e.Register('cleave', () => order.push('ok'));
	e.Register('cleave', () => order.push('bad'), undefined, () => { throw Error('expected filter error'); });
	e.RegisterUnit('cleave', () => order.push('unit'), 'source', unit, context);
	e.UnregisterContext(context); e.FireUnit('cleave', {}, unit); assert.deepEqual(order, ['ok']);
	e.RegisterUnit('cleave', () => order.push('invalid'), 'source', unit); unit.valid = false;
	e.FireUnit('cleave', {}, unit); assert.deepEqual(order, ['ok', 'ok']);
});

const { fixture: dotaFixture } = require('./test-common-modifier');
test('真实 common 在 Executed 阶段按原版三个条件过滤，并传递目标和原始参数', () => {
	const f = dotaFixture(), c = f.context, caster = f.unit('caster', {}, true), target = f.unit('target', {}), sibling = f.unit('sibling', {}, true);
	f.spawn(caster); const common = caster.modifiers.modifier_common, order = [];
	c.Event.RegisterUnit('valid_ability_executed', event => { order.push('source'); assert.equal(event.target, target); }, 'source', caster);
	c.Event.RegisterUnit('valid_ability_executed', () => order.push('target'), 'target', target);
	c.Event.RegisterUnit('valid_ability_executed', () => order.push('global'), 'global');
	for (const flags of [{}, { item: true }, { toggle: true }, { stick: false }]) {
		const ability = { IsItem: () => flags.item ?? false, IsToggle: () => flags.toggle ?? false, ProcsMagicStick: () => flags.stick ?? true };
		common.OnAbilityExecuted({ unit: caster, target, ability });
	}
	common.OnAbilityExecuted({ unit: sibling, target, ability: {} });
	common.OnAbilityExecuted({ unit: caster, target, ability: undefined });
	assert.deepEqual(order, ['source', 'target', 'global']);
	assert.ok(common.DeclareFunctions().includes(c.modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED));
});
test('真实 EOM 单位监听使用 modifier 实例上下文，刷新不重复登记，销毁完整注销', () => {
	const f = dotaFixture(), c = f.context, unit = f.unit('owner', {}, true); let calls = 0;
	const probe = Object.assign(Object.create(f.eom.EOMModifier.prototype), { unit, modifierName: 'event_probe',
		UnitEventListener() { return { reborn: { source: function () { assert.equal(this, probe); calls++; } } }; },
	});
	probe.OnCreated({}); probe.OnRefresh({}); c.Event.FireUnit('reborn', { unit }, unit);
	assert.equal(calls, 1); probe.OnDestroy(); c.Event.FireUnit('reborn', { unit }, unit); assert.equal(calls, 1);
});
test('真实分裂只通知一次，包含原目标列表；法术和禁止分裂攻击不通知', () => {
	const f = dotaFixture(), c = f.context, attacker = f.unit('attacker', { CustomStatusHealth: 1000 }, true), target = f.unit('target', { CustomStatusHealth: 1000, Armor: 0 }), other = f.unit('other', { CustomStatusHealth: 1000, Armor: 0 });
	for (const unit of [attacker, target, other]) f.spawn(unit);
	const damage = f.loadDamage([target, other]), events = [];
	c.PropertySystem.AddStaticProperty(attacker.index, 'cleave_radius', 'test', 300);
	c.PropertySystem.AddStaticProperty(attacker.index, 'cleave_damage', 'test', 50);
	c.Event.RegisterUnit('cleave', event => events.push(event), 'source', attacker);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2 });
	assert.equal(events.length, 1); assert.equal(events[0].damage, 50); assert.equal(events[0].radius, 300);
	assert.equal(events[0].tTargets[0], target); assert.equal(events[0].tTargets[1], other); assert.equal(other.GetHealth(), 950);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2, damage_flags: 2 });
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2, attack_states: c.ATTACK_STATES.NOT_PROCESSPROCS });
	assert.equal(events.length, 1);
});
test('暴击复用同一事件，旧版来源/全局仅处理法术暴击，现有订阅仍收到普攻暴击', () => {
	const f = dotaFixture(), c = f.context, attacker = f.unit('crit', { CustomStatusHealth: 1000, PhysicalCritChance: 100, PhysicalCritDamage: 150 }, true), target = f.unit('victim', { CustomStatusHealth: 1000, Armor: 0 });
	f.spawn(attacker); f.spawn(target); const damage = f.loadDamage(), calls = [];
	c.Event.Register('crit_event', () => calls.push('ordinary'));
	c.Event.RegisterUnit('crit_event', () => calls.push('source'), 'source', attacker);
	c.Event.RegisterUnit('crit_event', () => calls.push('global'), 'global');
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1 });
	assert.deepEqual(calls, ['ordinary']); calls.length = 0;
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2 });
	assert.deepEqual(calls, ['source', 'global', 'ordinary']);
	c.StateSystem.AddStaticState(target.index, c.StateEnum.CRITICAL_IMMUNE, 'test', true);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2 }); assert.equal(calls.length, 3);
});
test('英雄再次出生沿用 reborn 通知，首次出生和普通单位不触发，不伪造 level', () => {
	const f = dotaFixture(), c = f.context, hero = f.unit('hero', {}, true), unit = f.unit('unit', {}), seen = [];
	c.Event.RegisterUnit('reborn', event => seen.push(event), 'source', hero);
	f.spawn(hero); f.spawn(unit); f.spawn(unit); assert.equal(seen.length, 0);
	f.spawn(hero); assert.equal(seen.length, 1); assert.equal(seen[0].level, undefined);
});
test('唯一公共时钟发布 60 次秒事件和 1 次分钟事件，重复通知不双算成长', () => {
	const f = dotaFixture(), c = f.context, hero = f.unit('growth', {}, true), ticks = [];
	f.spawn(hero); c.UnitAttributes.init(); hero.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_PER_SEC', 2); hero.AddPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK_PER_MIN', 10);
	c.Event.RegisterUnit('tick_time', event => ticks.push({ ...event }), 'global');
	c.Event.Fire('game_start', { runId: 1 }); c.Event.Fire('game_start', { runId: 1 }); c.GameTime.init(true);
	for (let i = 0; i < 60; i++) f.tick();
	assert.equal(ticks.filter(e => e.tick_time === 1).length, 60); assert.equal(ticks.filter(e => e.tick_time === 60).length, 1);
	assert.equal(hero.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 130);
	for (const event of [...ticks]) c.Event.FireUnit('tick_time', event);
	assert.equal(hero.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 130);
	c.Event.Fire('game_end', { run_id: 1 }); f.tick(); assert.equal(hero.GetPermanentAttribute('CUSTOM_ATTRIBUTE_ATTACK'), 130);
});
test('连续对局旧时钟回调及旧 reset 不会停止新局时钟', () => {
	const f = dotaFixture(), c = f.context, seen = [];
	c.Event.Register('tick_time', event => seen.push({ ...event })); c.Event.Fire('game_start', { runId: 1 });
	const stale = [...f.timers.values()].at(-1);
	c.Event.Fire('game_end', { run_id: 1 }); f.session.runId = 2;
	c.Event.Fire('game_start', { runId: 2 }); c.Event.Fire('game_reset', { runId: 1 }); stale(); f.tick();
	assert.equal(seen.length, 1); assert.equal(seen[0].runId, 2); assert.equal(seen[0].tick, 1);
});
test('充能增减、封顶无变化、刷新归零均经真实覆盖层通知，保留总线→技能回调顺序', () => {
	const f = dotaFixture(), c = f.context, caster = f.unit('charge_owner', {}, true), order = [];
	c.CDOTABaseAbility = {}; c.C_DOTABaseAbility = {}; c.CDOTA_Ability_Lua = {}; c.KeyValues.abilities = {}; caster.UpdateAbilityNetData = () => {};
	f.load('override/CDOTABaseAbility');
	const ability = Object.assign(Object.create(c.CDOTABaseAbility), { __Charge: 1, __ChargeRestoreTime: 0,
		IsItem: () => false, GetCaster: () => caster, GetMaxCharges: () => 2, GetChargeRestoreTime: () => 10, GetAbilityName: () => 'charge_test',
		OnAbilityChargeChanged(charge, old) { order.push(['ability', charge, old]); },
	});
	c.Event.RegisterUnit('ability_charge_changed', event => order.push(['source', event.charge, event.old_charge]), 'source', caster);
	c.Event.RegisterUnit('ability_charge_changed', event => order.push(['global', event.charge, event.old_charge]), 'global');
	ability.RestoreCharges(); ability.RestoreCharges(); ability.UseCharges(); ability.UseCharges(); assert.equal(ability.UseCharges(), false);
	ability.RestoreCharges(); ability.__OnRefresh();
	assert.equal(order.length, 15);
	for (let i = 0; i < order.length; i += 3) assert.deepEqual(order.slice(i, i + 3).map(e => e[0]), ['source', 'global', 'ability']);
	assert.deepEqual(order.filter(e => e[0] === 'source').map(e => e.slice(1)), [[2, 1], [1, 2], [0, 1], [1, 0], [0, 1]]);
});
test('真实技能单位监听随创建/销毁管理，充能刷新不会重复注册', () => {
	const f = dotaFixture(), c = f.context, caster = f.unit('ability_owner', {}, true); let calls = 0;
	c.CDOTABaseAbility = {}; c.C_DOTABaseAbility = {}; c.CDOTA_Ability_Lua = {}; c.KeyValues.abilities = {};
	f.load('override/CDOTABaseAbility');
	const ability = Object.assign(Object.create(c.CDOTABaseAbility), { IsItem: () => false, GetCaster: () => caster, GetAbilityName: () => 'listener_test', GetAbilityTag: () => -1, GetName: () => 'listener_test', entindex: () => 100,
		UnitEventListener() { return { reborn: { source: function () { assert.equal(this, ability); calls++; } } }; },
	});
	ability.__OnCreated(); ability.__OnRefresh(); c.Event.FireUnit('reborn', { unit: caster }, caster); assert.equal(calls, 1);
	ability.__OnDestroy(); c.Event.FireUnit('reborn', { unit: caster }, caster); assert.equal(calls, 1);
});
test('禁用攻击弹道仅向来源与全局通知，无效目标仍通知，技能弹道不触发', () => {
	const f = dotaFixture(), c = f.context, attacker = f.unit('projectile', {}), target = f.unit('target', {}), seen = [];
	let targetCalls = 0;
	f.load('filter', { './lib/tstl-utils': { reloadable: value => value } });
	c.StateSystem.AddStaticState(attacker.index, c.StateEnum.ATTACK_PROJECTILE_DISABLED, 'test', true);
	c.Event.RegisterUnit('attack_projectile_disabled', event => seen.push(event), 'source', attacker);
	c.Event.RegisterUnit('attack_projectile_disabled', () => targetCalls++, 'target', target);
	const input = { is_attack: 1, entindex_source_const: attacker.index, entindex_target_const: target.index };
	assert.equal(c.Filter.TrackingProjectileFilter(input), false); assert.equal(seen.length, 1);
	assert.equal(c.Filter.TrackingProjectileFilter({ ...input, entindex_target_const: -1 }), false); assert.equal(seen.length, 2); assert.equal(seen[1].target, undefined);
	assert.equal(c.Filter.TrackingProjectileFilter({ ...input, is_attack: 0 }), true); assert.equal(seen.length, 2);
	assert.equal(targetCalls, 0);
});
test('第 60 秒的秒回调结束本局时，不再发布分钟结算', () => {
	const f = dotaFixture(), c = f.context, ticks = [];
	c.Event.RegisterUnit('tick_time', event => {
		ticks.push(event.tick_time);
		if (event.tick === 60 && event.tick_time === 1) c.Event.Fire('game_end', { run_id: 1 });
	}, 'global');
	c.Event.Fire('game_start', { runId: 1 }); for (let i = 0; i < 61; i++) f.tick();
	assert.equal(ticks.length, 60); assert.equal(ticks.includes(60), false);
});
test('预留事件不会被普通攻击、消耗、出生和公共时钟自动激活', () => {
	const f = dotaFixture(), c = f.context, hero = f.unit('reserved', {}, true), seen = [];
	for (const name of ['item_devoured', 'scepter_levelup', 'attack_start_custom']) c.Event.RegisterUnit(name, () => seen.push(name), 'global');
	f.spawn(hero); c.Event.Fire('item_consumed', { unit: hero, item: {} }); c.Event.Fire('attack_event', { attacker: hero, position: 0 });
	c.Event.Fire('game_start', { runId: 1 }); f.tick(); assert.deepEqual(seen, []);
});

if (failed) process.exitCode = 1;
console.log(`${passed} event tests passed, ${failed} failed`);
