/* 原版语义回归：执行真实属性、modifier、伤害与事件链，固定随机结果。 */
const assert = require('node:assert/strict');
const { fixture } = require('./test-common-modifier');
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { failed++; console.error('FAIL ' + name + ': ' + e.message); } }
function battle(attackerKV = {}, targetKV = {}) {
	const f = fixture(), c = f.context;
	const attacker = f.unit('attacker', { CustomStatusHealth: 1000, ...attackerKV }, true);
	const target = f.unit('target', { CustomStatusHealth: 1000, Armor: 0, ...targetKV });
	f.spawn(attacker); f.spawn(target); return { f, c, attacker, target };
}
function probe(f, unit, name, declarations) {
	return Object.assign(Object.create(f.eom.EOMModifier.prototype), { unit, modifierName: name, ...declarations });
}
function net(c, unit, id) { return c.CustomNetTables.GetTableValue('property_system', `${c.PropertyScope.UNIT}_${unit.index}`)?.[id]; }

test('一次致死只由原生死亡入口发布一次，复活后下一次死亡可再次发布', () => {
	const { f, c, attacker, target } = battle(), damage = f.loadDamage(); let deaths = 0;
	target.UnitCanRespawn = () => true;
	target.Kill = function () { this.engineHealth = 0; c.Game.OnEntityKilled({ entindex_killed: this.index, entindex_attacker: attacker.index }); };
	c.Event.Register('entity_killed', () => deaths++);
	damage.DealDamage({ attacker, target, damage: 10, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(deaths, 0);
	damage.DealDamage({ attacker, target, damage: 2000, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(deaths, 1);
	target.SetHealth(1000); f.spawn(target); // 原生复活先恢复生命，再发 npc_spawned。
	damage.DealDamage({ attacker, target, damage: 2000, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(deaths, 2);
});
test('100% 闪避仅阻止普攻，不吞法术/纯粹伤害，法术暴击只通知一次', () => {
	const { f, c, attacker, target } = battle({ PhysicalCritChance: 100, PhysicalCritDamage: 150 }, { Evasion: 100 }), damage = f.loadDamage(); let crits = 0;
	c.SendOverheadEventMessage = () => {}; c.DOTA_OVERHEAD_ALERT = {}; attacker.GetPlayerOwner = () => ({});
	c.Event.RegisterUnit('crit_event', () => crits++, 'source', attacker);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 2 }); assert.equal(target.GetHealth(), 850); assert.equal(crits, 1);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(target.GetHealth(), 750);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2 }); assert.equal(target.GetHealth(), 750); assert.equal(crits, 1);
});
test('禁用读缓存的动态属性仍同步默认值；无人读取的变化和移除也正确同步', () => {
	const { c, attacker } = battle(); let value = 10;
	c.PropertySystem.RegisterDynamicProperty(attacker.index, 'stats_strength_base', 'dynamic', () => value);
	assert.equal(c.GetStrength(attacker), 10); c.PropertySystem.ForceSyncAllDirty(); assert.equal(net(c, attacker, 'stats_strength_base'), 10);
	value = 20; c.PropertySystem.ForceSyncAllDirty(); assert.equal(net(c, attacker, 'stats_strength_base'), 20);
	c.PropertySystem.UnregisterDynamicProperty(attacker.index, 'dynamic'); c.PropertySystem.ForceSyncAllDirty(); assert.equal(net(c, attacker, 'stats_strength_base'), 0);
});
test('带伤害上下文的动态读取不污染客户端默认快照，重复同步不重复通知或写网表', () => {
	const { c, attacker } = battle(), writes = [], events = [];
	const original = c.CustomNetTables.SetTableValue; c.CustomNetTables.SetTableValue = (table, key, data) => { if (table === 'property_system') writes.push(data); original(table, key, data); };
	c.Event.Register('property_changed', e => { if (e.propertyId === 'stats_strength_base') events.push(e); });
	c.PropertySystem.RegisterDynamicProperty(attacker.index, 'stats_strength_base', 'context', params => params?.amount ?? 10);
	assert.equal(c.PropertySystem.GetPropertyValue(attacker.index, 'stats_strength_base', { amount: 70 }), 70);
	c.PropertySystem.ForceSyncAllDirty(); assert.equal(net(c, attacker, 'stats_strength_base'), 10);
	const eventCount = events.length, writeCount = writes.length;
	for (let i = 0; i < 3; i++) c.PropertySystem.ForceSyncAllDirty();
	assert.equal(events.length, eventCount); assert.equal(writes.length, writeCount);
});
test('同名 modifier 静态与动态属性按实例累加，刷新和销毁互不覆盖', () => {
	const { f, c, attacker } = battle(), attack = c.PropertyFunction.ATTACK, strength = c.PropertyFunction.STATS_STRENGTH_BASE;
	const one = probe(f, attacker, 'multiple', { StaticProperty: () => ({ [attack]: 10 }), DynamicProperty: () => ({ [strength]: () => 3 }) });
	const two = probe(f, attacker, 'multiple', { StaticProperty: () => ({ [attack]: 20 }), DynamicProperty: () => ({ [strength]: () => 7 }) });
	one.OnCreated({}); two.OnCreated({}); assert.equal(attacker.GetProperty(attack), 30); assert.equal(c.GetStrength(attacker), 10);
	one.OnRefresh({}); one.OnStackCountChanged(0); assert.equal(attacker.GetProperty(attack), 30);
	one.OnDestroy(); assert.equal(attacker.GetProperty(attack), 20); assert.equal(c.GetStrength(attacker), 7);
	two.OnDestroy(); assert.equal(attacker.GetProperty(attack), 0); assert.equal(c.GetStrength(attacker), 0);
});
test('动态来源刷新/移除只发布最终聚合值，带参数读取绕过默认缓存', () => {
	const { c, attacker } = battle(), changes = [];
	c.PropertySystem.RegisterProperty({ id: 'cached_probe', scope: c.PropertyScope.UNIT, valueType: c.PropertyValueType.NUMBER, aggregation: c.AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: true });
	c.Event.Register('property_changed', e => { if (e.propertyId === 'cached_probe') changes.push([e.oldValue, e.newValue]); });
	c.PropertySystem.RegisterDynamicProperty(attacker.index, 'cached_probe', 'first', params => params?.amount ?? 3);
	c.PropertySystem.RegisterDynamicProperty(attacker.index, 'cached_probe', 'second', () => 7);
	c.PropertySystem.RegisterDynamicProperty(attacker.index, 'cached_probe', 'first', params => params?.amount ?? 3);
	assert.deepEqual(changes, [[0, 3], [3, 10]]);
	assert.equal(c.PropertySystem.GetPropertyValue(attacker.index, 'cached_probe', { amount: 20 }), 27);
	assert.equal(c.PropertySystem.GetPropertyValue(attacker.index, 'cached_probe'), 10);
	c.PropertySystem.UnregisterDynamicProperty(attacker.index, 'first', 'cached_probe'); assert.deepEqual(changes, [[0, 3], [3, 10], [10, 7]]);
	c.PropertySystem.ForceSyncAllDirty(); assert.equal(net(c, attacker, 'cached_probe'), 7);
});
test('同玩家不同单位的同名 PLAYER 属性独立释放，不删除外部来源', () => {
	const { f, c, attacker } = battle(), other = f.unit('other_hero', { CustomStatusHealth: 1000 }, true), property = c.PropertyFunction.PLAYER_EXPERIENCE_GAIN_PERCENTAGE;
	f.spawn(other); const id = c.PROPERTY_MAP_REVERSE[property];
	c.PropertySystem.AddStaticProperty(0, id, 'external', 5);
	const one = probe(f, attacker, 'shared_player_buff', { StaticProperty: () => ({ [property]: 10 }) });
	const two = probe(f, other, 'shared_player_buff', { StaticProperty: () => ({ [property]: 20 }) });
	one.OnCreated({}); two.OnCreated({}); assert.equal(c.PropertySystem.GetPropertyValue(0, id), 35);
	one.OnDestroy(); assert.equal(c.PropertySystem.GetPropertyValue(0, id), 25);
	two.OnDestroy(); assert.equal(c.PropertySystem.GetPropertyValue(0, id), 5);
});
test('IgnoreCooldownReduction=1 排除百分比与固定减 CD，普通技能继续受益', () => {
	const { c, attacker } = battle();
	c.KeyValues.abilities = { ignored: { IgnoreCooldownReduction: '1' }, ordinary: {} };
	c.PropertySystem.AddStaticProperty(attacker.index, 'cooldown_reduction', 'test', 40);
	c.PropertySystem.AddStaticProperty(attacker.index, 'cooldown_constant', 'test', 3);
	const common = attacker.modifiers.modifier_common, event = name => ({ ability: { GetAbilityName: () => name } });
	assert.equal(common.GetModifierPercentageCooldown(event('ignored')), 0); assert.equal(common.GetModifierCooldownReduction_Constant(event('ignored')), 0);
	assert.equal(common.GetModifierPercentageCooldown(event('ordinary')), 40); assert.equal(common.GetModifierCooldownReduction_Constant(event('ordinary')), 3);
	assert.equal(common.GetModifierPercentageCooldown(), 40);
});
test('英雄、敌人、宠物均声明有效施法回调，并按来源→目标→全局各触发一次', () => {
	const { f, c, attacker, target } = battle(), pet = f.unit('pet', { CustomStatusHealth: 100 }, false); f.spawn(pet);
	for (const caster of [attacker, target, pet]) {
		const common = caster.modifiers.modifier_common, calls = [];
		assert.ok(common.DeclareFunctions().includes(c.modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED));
		const context = {};
		c.Event.RegisterUnit('valid_ability_executed', () => calls.push('source'), 'source', caster, context);
		c.Event.RegisterUnit('valid_ability_executed', () => calls.push('target'), 'target', attacker, context);
		c.Event.RegisterUnit('valid_ability_executed', () => calls.push('global'), 'global', undefined, context);
		common.OnAbilityExecuted({ unit: caster, target: attacker, ability: { IsItem: () => false, IsToggle: () => false, ProcsMagicStick: () => true } });
		assert.deepEqual(calls, ['source', 'target', 'global']); c.Event.UnregisterContext(context);
	}
});
test('分裂跳过来源增伤，保留目标减免/格挡，不重复分裂或攻击计数', () => {
	const { f, c, attacker, target } = battle(), secondary = f.unit('secondary', { CustomStatusHealth: 1000, Armor: 0 }); f.spawn(secondary);
	const damage = f.loadDamage([target, secondary]); let cleaves = 0, attacks = 0;
	attacker.AddPermanentAttribute('CUSTOM_ATTRIBUTE_PHYSICAL_DAMAGE', 100);
	c.PropertySystem.AddStaticProperty(attacker.index, 'cleave_radius', 'test', 300); c.PropertySystem.AddStaticProperty(attacker.index, 'cleave_damage', 'test', 50);
	c.PropertySystem.AddStaticProperty(secondary.index, 'ignore_damage', 'test', 10);
	c.Event.Register('cleave', () => cleaves++); c.Event.Register('damage_event', e => { if (e.damage_category === 1) attacks++; });
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2 });
	assert.equal(target.GetHealth(), 800); assert.equal(secondary.GetHealth(), 960); assert.equal(cleaves, 1); assert.equal(attacks, 1);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 1, damage_category: 1, damage_flags: 2, attack_states: c.ATTACK_STATES.NO_CLEAVE });
	assert.equal(target.GetHealth(), 600); assert.equal(secondary.GetHealth(), 960); assert.equal(cleaves, 1);
});
test('纯粹伤害保留原版格挡，不受物理护甲/魔法抗性影响，过量格挡不产生治疗', () => {
	const { f, c, attacker, target } = battle({}, { Armor: 100 }), damage = f.loadDamage();
	c.PropertySystem.AddStaticProperty(target.index, 'ignore_damage', 'test', 30);
	damage.DealDamage({ attacker, target, damage: 100, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(target.GetHealth(), 930);
	damage.DealDamage({ attacker, target, damage: 10, damage_type: 4, damage_category: 2, damage_flags: 2 }); assert.equal(target.GetHealth(), 930);
});
test('伤害对象回池后清除分裂标记，后续普通伤害不会继承跳过增伤', () => {
	const { f, c, attacker } = battle(), damage = f.loadDamage(); c.RECORD_SYSTEM_DUMMY = attacker; damage.init(false);
	const info = damage.AcquireDamageInfo(); info.is_cleave = true; damage.ReleaseDamageInfo(info);
	const next = damage.AcquireDamageInfo(); assert.equal(next, info); assert.equal(next.is_cleave, undefined);
	damage.ReleaseDamageInfo(next);
});
test('保留旧版静态属性省略字段限制；最终销毁仍释放本实例来源', () => {
	const { f, c, attacker } = battle(); let enabled = true;
	const modifier = probe(f, attacker, 'omission', { StaticProperty: () => enabled ? { [c.PropertyFunction.ATTACK]: 8 } : {} });
	modifier.OnCreated({}); enabled = false; modifier.OnRefresh({}); assert.equal(attacker.GetProperty(c.PropertyFunction.ATTACK), 8);
	modifier.OnDestroy(); assert.equal(attacker.GetProperty(c.PropertyFunction.ATTACK), 0);
});
test('状态在静态/动态 true 间切换不产生伪事件，变为 false 只通知一次', () => {
	const { f, c, attacker } = battle(), state = c.StateEnum.NO_HEALTH_BAR, changes = []; let phase = 0;
	const modifier = probe(f, attacker, 'state_transition', {
		StaticState: () => phase === 0 ? { [state]: true } : {},
		DynamicState: () => phase === 0 ? {} : { [state]: () => phase < 3 },
	});
	modifier.OnCreated({}); c.Event.Register('state_changed', e => { if (e.stateId === String(state)) changes.push([e.oldValue, e.newValue]); });
	phase = 1; modifier.OnRefresh({}); phase = 2; modifier.OnStackCountChanged(0);
	assert.deepEqual(changes, []); assert.equal(attacker.HasState(state), true);
	phase = 0; modifier.OnRefresh({}); assert.deepEqual(changes, []);
	phase = 3; modifier.OnRefresh({}); assert.deepEqual(changes, [[true, false]]);
	c.StateSystem.ForceSyncAllDirty(); assert.equal(c.StateSystem.GetStateValueFromNetTable(attacker.index, state), false);
});
test('状态切换来源类型保留同级登记顺序；一次刷新先提交全部状态再通知', () => {
	const { f, c, attacker } = battle(), first = c.StateEnum.NO_HEALTH_BAR, second = c.StateEnum.ATTACK_IMMUNE; let dynamic = false;
	const modifier = probe(f, attacker, 'state_order', { StaticState: () => dynamic ? {} : { [first]: true }, DynamicState: () => dynamic ? { [first]: () => true } : {} });
	modifier.OnCreated({}); c.StateSystem.AddStaticState(attacker.index, first, 'later', false, 0);
	dynamic = true; modifier.OnRefresh({}); assert.equal(attacker.HasState(first), false);
	let enabled = true; const snapshots = [];
	const batch = probe(f, attacker, 'two_states', { StaticState: () => ({ [first]: enabled, [second]: enabled }), GetPriority: () => 100 });
	batch.OnCreated({}); c.Event.Register('state_changed', e => { if (e.key === attacker.index) snapshots.push([attacker.HasState(first), attacker.HasState(second)]); });
	enabled = false; batch.OnRefresh({}); assert.deepEqual(snapshots, [[false, false], [false, false]]);
});

console.log(`Migration regressions: ${passed} passed, ${failed} failed.`);
process.exitCode = failed ? 1 : 0;
