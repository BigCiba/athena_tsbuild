/* 生产英雄脚本、EOM 装饰器、属性/状态/伤害/充能系统；只模拟 Dota 实体和时钟。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { fixture: resourceFixture } = require('./test-run-resources');
const { parseKV } = require('./kv-parser');
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS ' + name); }
function near(a, b) { assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`); }
test('生成 Lua 的装置初始化必须读取局部 parent，不能读取 nil 全局变量', () => {
	const lua = require('luaparse');
	const file = path.resolve(__dirname, '../game/athena_tsbuild/scripts/vscripts/abilities/heroes/omniknight/omniknight_2.lua');
	const ast = lua.parse(fs.readFileSync(file, 'utf8'), { scope: true, luaVersion: '5.1' });
	assert.equal(ast.globals.some(identifier => identifier.name === 'parent'), false, '生成代码在局部声明前读取全局 parent，会报 attempt to index global parent (a nil value)');
});
function fixture() {
	const f = resourceFixture(), c = f.c, hero = f.heroes[0];
	const originalFire = c.Event.Fire;
	c.Event.Fire = function (...args) { const errors = originalFire.apply(this, args); assert.ok(!errors?.length, JSON.stringify(errors)); return errors; };
	let now = 0, abilityIndex = 100000, percentage = true, prd = true, rolls = 0, prds = 0;
	const scheduled = new Map(), particles = [], hits = [], devices = [];
	c.GameRules.GetGameTime = () => now;
	c.CustomNetTables.SetNetData = c.CustomNetTables.SetTableValue;
	c.KeyValues.abilities = parseKV(fs.readFileSync(path.resolve(__dirname, '../game/athena_tsbuild/scripts/npc/kv/abilities/ability_heroes.kv'), 'utf8')).data;
	Object.assign(c, { CDOTABaseAbility: {}, C_DOTABaseAbility: {}, AI_SEARCH_BEHAVIOR: { AI_SEARCH_BEHAVIOR_NONE: 0 },
		Service: { GetPlayerSetting: () => false }, AbilityUpgrade: { GetUpgradedValue: (_u, _a, _l, _k, v) => v },
		EntityConstructor() {}, ParticleAttachment_t: new Proxy({}, { get: (_o, k) => k }),
		DOTA_ABILITY_BEHAVIOR: { DOTA_ABILITY_BEHAVIOR_PASSIVE: 1, DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE: 2, DOTA_ABILITY_BEHAVIOR_NO_TARGET: 4, DOTA_ABILITY_BEHAVIOR_IMMEDIATE: 8 },
		Vector: (x, y, z) => ({ x, y, z }),
		ParticleManager: { CreateParticle(name) { particles.push(name); return particles.length; }, SetParticleControl() {}, SetParticleControlEnt() {}, ReleaseParticleIndex() {} },
	});
	c.CDOTA_Ability_Lua = c.CDOTABaseAbility; c.C_DOTA_Ability_Lua = c.CDOTABaseAbility;
	f.load('override/CDOTABaseAbility');
	const BaseModifier = Object.getPrototypeOf(f.eom.EOMModifier);
	Object.assign(BaseModifier.prototype, {
		GetCaster() { return this.caster; }, GetAbility() { return this.ability; },
		GetAbilitySpecialValueFor(key) { return this.GetAbility()?.GetSpecialValueFor(key) ?? 0; },
		IncrementStackCount() { this.SetStackCount(this.GetStackCount() + 1); },
		SendBuffRefreshToClients() { this.transmits = (this.transmits ?? 0) + 1; },
		StartIntervalThink(value) { this.interval = value; },
		Destroy() { if (this.destroyed) return; this.destroyed = true; this.OnDestroy(); if (this.unit.modifiers[this.modifierName] === this) delete this.unit.modifiers[this.modifierName]; },
	});
	function BaseAbility() {}
	BaseAbility.prototype = c.CDOTABaseAbility;
	const adapter = { BaseAbility, BaseItem: BaseAbility, BaseModifier, BaseModifierMotionBoth: BaseModifier, BaseModifierMotionHorizontal: BaseModifier, BaseModifierMotionVertical: BaseModifier,
		toDotaClassInstance(target, ctor) {
			for (let current = ctor; current && current !== Function.prototype; current = Object.getPrototypeOf(current)) current.____super = Object.getPrototypeOf(current);
			for (let proto = ctor.prototype; proto; proto = Object.getPrototypeOf(proto)) for (const key of Object.getOwnPropertyNames(proto)) if (key !== 'constructor' && target[key] === undefined) target[key] = proto[key];
			target.____constructor = function () { ctor.call(this); };
		},
	};
	const ability = f.load('abilities/eom_ability', { '../lib/dota_ts_adapter': adapter });
	const eom = f.load('modifiers/eom_modifier/eom_modifier', { '../../abilities/eom_ability': ability, '../../lib/dota_ts_adapter': adapter });
	f.load('modifiers/framework/modifier_stunned', { '../eom_modifier/eom_modifier': eom });
	const imports = { '../../eom_ability': ability, '../../../modifiers/eom_modifier/eom_modifier': eom, '../../../modifiers/framework/modifier_stunned': {} };
	const thunder = f.load('abilities/heroes/omniknight/omniknight_0', imports);
	for (const id of [1, 2, 3, 4]) f.load('abilities/heroes/omniknight/omniknight_' + id, { ...imports, './omniknight_0': thunder });
	// 只截取全局文件中的数值解释器，执行生产 _str 等 KV 公式。
	const global = fs.readFileSync(path.resolve(__dirname, '../content/athena_tsbuild/scripts/vscripts/framework/global.ts'), 'utf8');
	const ts = require('typescript'), vm = require('vm');
	c.addedValueFunctionMap = { str: 'GetStrength', agi: 'GetAgility', int: 'GetIntellect' };
	vm.runInContext(ts.transpileModule(global.slice(global.indexOf('function GetAbilityValues('), global.indexOf('/** 弹出错误信息 */')), { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText, c);
	Object.assign(c.ATTACK_STATES, { SKIPCOUNTING: 1024, NOT_PROCESSPROCS: 2, FAKEATTACK: 32, NO_CLEAVE: 128 });
	f.loadDamage(); c.RECORD_SYSTEM_DUMMY = {}; c.DamageSystem.init(false);
	Object.assign(c, { RollPercentage: () => { rolls++; return percentage; }, PRD: () => { prds++; return prd; },
		DOTA_UNIT_TARGET_TEAM: { DOTA_UNIT_TARGET_TEAM_ENEMY: 2, DOTA_UNIT_TARGET_TEAM_FRIENDLY: 1, DOTA_UNIT_TARGET_TEAM_BOTH: 3 },
		DOTA_UNIT_TARGET_TYPE: { DOTA_UNIT_TARGET_HERO: 1, DOTA_UNIT_TARGET_BASIC: 2 }, DOTA_UNIT_TARGET_FLAGS: { DOTA_UNIT_TARGET_FLAG_NONE: 0 }, FindOrder: { FIND_ANY_ORDER: 0, FIND_CLOSEST: 1 },
	});
	c.modifierstate.MODIFIER_STATE_STUNNED = 'stunned'; c.modifierstate.MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY = 'flying';
	const engine = Object.getPrototypeOf(hero);
	const publishAbilityNetData = engine.UpdateAbilityNetData;
	Object.assign(engine, {
		GetAbsOrigin() { return this.position ?? { x: 0, y: 0, z: 0 }; },
		FindAbilityByName(name) { return this.abilities?.[name]; }, GetStatusResistance() { return this.resistance ?? 0; }, IsStunned() { return this.nativeStun ?? false; },
		HasScepter() { return this.nativeScepter ?? false; },
		EmitSound() {}, SetControllableByPlayer() {}, UpdateAbilityNetData() {}, SpendMana(value) { this.SetMana(Math.max(0, this.GetMana() - value)); },
		RemoveModifierByName(name) { this.modifiers[name]?.Destroy(); },
		AddNewModifier(caster, ability, name, params = {}) {
			const old = this.modifiers[name];
			if (old) { old.caster = caster; old.ability = ability; old.params = params; old.OnRefresh(params); return old; }
			assert.ok(c[name], 'unregistered modifier: ' + name);
			const result = Object.assign(Object.create(c[name]), { unit: this, caster, ability, modifierName: name, params });
			this.modifiers[name] = result; result.OnCreated(params); return result;
		},
	});
	c.UTIL_Remove = unit => { if (unit.removing) return; unit.removing = true; for (const mod of Object.values(unit.modifiers)) { if (mod.Destroy) mod.Destroy(); else mod.OnDestroy?.(); } unit.valid = false; };
	c.FindUnitsInRadius = (team, origin, _cache, radius, targetTeam) => [...f.units.values()].filter(u => c.IsValid(u) && u.IsAlive()
		&& (targetTeam === 3 || (targetTeam === 1 ? u.GetTeamNumber() === team : u.GetTeamNumber() !== team))
		&& Math.hypot(u.GetAbsOrigin().x - origin.x, u.GetAbsOrigin().y - origin.y) <= radius).sort((a, b) => Math.abs(a.GetAbsOrigin().x - origin.x) - Math.abs(b.GetAbsOrigin().x - origin.x));
	c.CreateUnitByName = (name, position, _clear, owner) => {
		const unit = f.unit(name, { CustomStatusHealth: 100000, Armor: 200 }); unit.position = position; unit.GetTeamNumber = () => owner.GetTeamNumber(); f.spawn(unit); devices.push(unit); return unit;
	};
	Object.assign(c.CDOTABaseAbility, {
		GetCaster() { return this.caster; }, GetAbilityName() { return this.name; }, GetName() { return this.name; }, GetLevel() { return this.level; }, entindex() { return this.index; }, IsItem() { return false; },
		GetEffectiveCooldown() { return this.GetCooldown(this.level - 1); }, GetAbilityTargetTeam() { return 2; }, GetAbilityTargetType() { return 3; }, GetAbilityTargetFlags() { return 0; }, GetCursorPosition() { return this.caster.GetAbsOrigin(); },
		StartCooldown(value) { this.cooldown = now + value; }, EndCooldown() { this.cooldown = now; }, IsCooldownReady() { return now >= (this.cooldown ?? 0); },
		StartThink(delay, name, callback) { scheduled.set(this.index + ':' + name, { due: now + delay, callback, delay }); },
		GetToggleState() { return this.toggled ?? false; }, ToggleAbility() { this.toggled = !this.GetToggleState(); this.OnToggle(); },
	});
	const abilities = {};
	for (const id of [0, 1, 2, 3, 4]) {
		const name = 'omniknight_' + id;
		const skill = Object.assign(Object.create(c[name]), { name, index: ++abilityIndex, caster: hero, level: 1 });
		// Dota 的类表用 __index 访问原生能力 API。
		for (const [key, value] of Object.entries(c.CDOTABaseAbility)) if (skill[key] === undefined) skill[key] = value;
		abilities[id] = skill;
	}
	hero.abilities = Object.fromEntries(Object.values(abilities).map(a => [a.name, a]));
	for (const a of Object.values(abilities)) { a.Spawn(); a.__OnCreated(); }
	f.start();
	hero.AddNewModifier(hero, abilities[0], 'modifier_omniknight_0');
	hero.AddNewModifier(hero, abilities[3], 'modifier_omniknight_3');
	c.Event.Register('damage_event', event => hits.push({ attacker: event.attacker, target: event.target, damage: event.damage, ability: event.ability, category: event.damage_category }));
	function attack(attacker, target, states = 0, damage = 1) { c.DamageSystem.DealDamage({ attacker, target, damage, damage_type: 1, damage_category: 1, damage_flags: 2, attack_states: states }); }
	function advance(seconds) {
		now += seconds;
		for (const [key, task] of [...scheduled]) if (task.due <= now) {
			if (task.callback() === -1) scheduled.delete(key); else task.due = now + Math.max(task.delay, 0.01);
		}
	}
	function scepter(level) { if (level) hero.modifiers.modifier_scepter_custom = { GetStackCount: () => level }; else delete hero.modifiers.modifier_scepter_custom; }
	function skin(on = true) { if (on) hero.modifiers.modifier_omniknight_01 = {}; else delete hero.modifiers.modifier_omniknight_01; }
	return { ...f, hero, abilities, particles, hits, devices, attack, advance, scheduled, scepter, skin,
		publishAbilities() { publishAbilityNetData.call(hero); return c.CustomNetTables.GetTableValue("unit", String(hero.index)); },
		roll(value) { percentage = value; }, prd(value) { prd = value; }, rolls: () => rolls, prds: () => prds };
}

test('旧 KV 充能初始为三次、消耗不瞬间回充、恢复后解除冷却，专属上限四次', () => {
	const f = fixture(), a = f.abilities[1], common = f.hero.modifiers.modifier_common;
	assert.equal(a.GetCharges(), 3); common.OnAbilityFullyCast({ unit: f.hero, ability: a }); assert.equal(a.GetCharges(), 2); assert.equal(a.__ChargeRestoreTime, 8);
	f.advance(0.1); assert.equal(a.GetCharges(), 2);
	common.OnAbilityFullyCast({ unit: f.hero, ability: a }); common.OnAbilityFullyCast({ unit: f.hero, ability: a }); assert.equal(a.GetCharges(), 0); assert.equal(a.IsCooldownReady(), false);
	f.advance(8); assert.equal(a.GetCharges(), 1); assert.equal(a.IsCooldownReady(), true);
	f.scepter(1); a.OnScepterLevelup(1); assert.equal(a.GetMaxCharges(), 4); a.RestoreCharges(20); assert.equal(a.GetCharges(), 4);
	a.OnScepterRemove(); assert.equal(a.GetCharges(), 3); f.scepter(0); assert.equal(a.GetMaxCharges(), 3);
});

test('普攻先检查已有眩晕再施加新眩晕，力量与属性状态来自框架', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 100000 }); target.resistance = 0.25;
	f.attack(f.hero, target); assert.equal(f.hits.filter(h => h.ability === f.abilities[0]).length, 0);
	assert.equal(f.hero.modifiers.modifier_omniknight_0.GetStackCount(), 1);
	assert.equal(target.modifiers.modifier_athena_stunned.params.duration, 3);
	assert.equal(target.modifiers.modifier_common.CheckState().stunned, true);
	f.attack(f.hero, target); assert.equal(f.hits.filter(h => h.ability === f.abilities[0]).length, 1);
	target.RemoveModifierByName('modifier_athena_stunned'); assert.equal(target.modifiers.modifier_common.CheckState().stunned, undefined);
});

test('普通伤害、同玩家其他单位、分裂和禁止触发攻击不计入举重；致死普攻仍计数', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 100000 }); f.roll(false);
	f.hero.DealDamage(target, f.abilities[1], 10); f.attack(f.heroes[1], target); f.attack(f.hero, target, f.c.ATTACK_STATES.NOT_PROCESSPROCS);
	f.attack(f.hero, target, f.c.ATTACK_STATES.FAKEATTACK); f.attack(f.hero, target, f.c.ATTACK_STATES.SKIPCOUNTING);
	assert.equal(f.hero.modifiers.modifier_omniknight_3.GetStackCount(), 0);
	f.attack(f.hero, target, 0, 1e9); assert.equal(f.hero.modifiers.modifier_omniknight_3.GetStackCount(), 1);
	assert.equal(f.hero.modifiers.modifier_omniknight_0.GetStackCount(), 0);
});

test('举重每八次永久力量加一、皮肤额外雷击，升级刷新不累加联动', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 10000000 }), mod = f.hero.modifiers.modifier_omniknight_3; f.roll(false); f.skin();
	for (let i = 0; i < 8; i++) f.attack(f.hero, target);
	assert.equal(f.hero.GetPermanentAttribute('CUSTOM_ATTRIBUTE_STRENGTH'), 1); assert.equal(mod.earnedStrength, 1); assert.equal(mod.GetStackCount(), 0);
	assert.equal(f.hits.filter(h => h.ability === f.abilities[0]).length, 1);
	assert.equal(f.abilities[0].GetSpecialValueFor('chance'), 11);
	f.abilities[3].level = 2; mod.OnRefresh({}); mod.OnRefresh({}); assert.equal(f.abilities[0].GetSpecialValueFor('chance'), 12);
	near(f.abilities[0].GetSpecialValueFor('str_factor'), f.c.GetStrength(f.hero) * 12);
	f.hero.RemoveModifierByName('modifier_omniknight_3'); assert.equal(f.abilities[0].GetSpecialValueFor('chance'), 10);
});

test('雷霆一击皮肤叠层先读后加，沿用雷霆动力伤害归属及专属二级范围', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 10000000 }); f.skin();
	f.abilities[1].OnSpellStart(); const first = f.hits.find(h => h.ability === f.abilities[0]).damage;
	f.hits.length = 0; target.RemoveModifierByName('modifier_athena_stunned'); f.abilities[1].OnSpellStart();
	near(f.hits.find(h => h.ability === f.abilities[0]).damage, first * 1.25); assert.equal(target.modifiers.modifier_omniknight_1_debuff.GetStackCount(), 2);
	const other = f.enemy({ CustomStatusHealth: 10000000 }, 'other'); f.scepter(2); f.hits.length = 0; f.abilities[0].Action(target);
	assert.equal(f.hits.filter(h => h.ability === f.abilities[0]).length, 2); assert.ok(f.hits.some(h => h.target === other));
	assert.ok(f.particles.some(p => p.includes('/thunder_warrior/')));
});

test('治疗装置使用力量快照独立属性，友军回复、敌军百分比减速及充能减半', () => {
	const f = fixture(); const strength = f.c.GetStrength(f.hero); f.abilities[2].OnSpellStart(); const device = f.devices[0];
	assert.equal(device.GetMaxHealth(), Math.floor(strength * 100)); near(f.c.GetAthenaArmor(device), strength);
	f.hero.AddNewModifier(device, f.abilities[2], 'modifier_omniknight_2_aura');
	assert.equal(f.c.GetHealthRegenConstant(f.hero), 10); assert.equal(f.c.GetManaRegenConstant(f.hero), 4); assert.equal(f.abilities[1].GetCooldown(0), 4);
	const target = f.enemy(); target.AddNewModifier(device, f.abilities[2], 'modifier_omniknight_2_aura');
	assert.equal(f.c.GetAttackspeed(target), -50); assert.equal(f.c.GetMovespeedAmplify(target), -15); assert.equal(f.c.GetHealthRegenConstant(target), 0);
	const original = device.GetMaxHealth(); f.abilities[3].level = 3; f.hero.modifiers.modifier_omniknight_3.OnRefresh({}); assert.equal(device.GetMaxHealth(), original);
});

test('三级专属装置脉冲魔法伤害并联动已晕目标，寻路状态由框架桥接', () => {
	const f = fixture(); f.scepter(3); f.abilities[2].OnSpellStart(); const device = f.devices[0], mod = device.modifiers.modifier_omniknight_2;
	assert.equal(mod.interval, 1); assert.equal(device.modifiers.modifier_common.CheckState().flying, true);
	const target = f.enemy({ CustomStatusHealth: 1000000 }); target.nativeStun = true; mod.OnIntervalThink();
	assert.equal(f.hits.filter(h => h.target === target).length, 2); assert.equal(f.hits[0].ability, f.abilities[2]); assert.equal(f.hits[1].ability, f.abilities[0]);
});

test('风暴屏障每次脉冲只做一次 PRD，四级专属额外伤害，移速为固定减值', () => {
	const f = fixture(); f.scepter(4); f.prd(false); const target = f.enemy({ CustomStatusHealth: 1000000 });
	const before = f.prds(); target.AddNewModifier(f.hero, f.abilities[4], 'modifier_omniknight_4_debuff');
	assert.equal(f.prds() - before, 1); assert.equal(f.rolls(), 0); assert.equal(f.hits.length, 1);
	assert.equal(f.c.GetMovespeed(target), -120); assert.equal(f.c.GetAttackspeed(target), -80);
	assert.equal(f.hits[0].ability, f.abilities[4]);
	assert.equal(f.hits[0].category, f.c.DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL);
});

test('皮肤反击只由本人受击触发，每个脉冲至多一次，普通法术不触发', () => {
	const f = fixture(); f.skin(); f.prd(false); const target = f.enemy({ CustomStatusHealth: 1000000 }); f.abilities[4].ToggleAbility();
	const buff = f.hero.modifiers.modifier_omniknight_4;
	assert.equal(f.c.GetArmorBonus(f.hero), 10); assert.equal(f.c.GetOutgoingMagicalDamagePercentage(f.hero), 100);
	f.attack(target, f.heroes[1]); assert.equal(f.prds(), 0);
	f.attack(target, f.hero); f.attack(target, f.hero); assert.equal(f.prds(), 1);
	f.hero.SetMana(100); buff.OnIntervalThink(); const afterPulse = f.prds(); f.attack(target, f.hero); assert.equal(f.prds(), afterPulse + 1);
});

test('连锁不重复目标，延迟跨局失效；装置、开关、攻击计数与永久成长重开归零', () => {
	const f = fixture(); f.roll(false); f.skin(); f.abilities[2].OnSpellStart(); f.abilities[4].ToggleAbility();
	const target = f.enemy({ CustomStatusHealth: 10000000 }); const other = f.enemy({ CustomStatusHealth: 10000000 }, 'other');
	for (let i = 0; i < 8; i++) f.attack(f.hero, target);
	f.hits.length = 0; f.abilities[4].ThunderStorm(target); assert.equal(f.hits.length, 1); f.advance(0.3); assert.equal(f.hits.filter(h => h.ability === f.abilities[4]).length, 2);
	f.advance(0.3); assert.equal(f.hits.filter(h => h.ability === f.abilities[4]).length, 2);
	f.abilities[4].ThunderStorm(target); const count = f.hits.length;
	f.session.state = 'GameState_Reset'; f.fire('game_reset', { runId: f.session.runId });
	assert.equal(f.devices[0].valid, false); assert.equal(f.abilities[4].GetToggleState(), false);
	assert.equal(f.hero.modifiers.modifier_omniknight_3.earnedStrength, 0); assert.equal(f.hero.GetPermanentAttribute('CUSTOM_ATTRIBUTE_STRENGTH'), 0);
	f.session.runId++; f.advance(1); assert.equal(f.hits.length, count);
});

test('原生普攻只由攻击者 common 发布一次，眩晕免疫阻止状态，强制雷击消耗主动标记', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 1000000 }); f.roll(false); f.skin();
	f.c.StateSystem.AddStaticState(target.index, f.c.StateEnum.STUN_IMMUNE, 'immune', true);
	f.abilities[0].OnSpellStart();
	const event = { attacker: f.hero, target, record: 73 };
	f.hero.modifiers.modifier_common.OnAttackLanded(event); target.modifiers.modifier_common.OnAttackLanded(event);
	assert.equal(f.hero.modifiers.modifier_omniknight_3.GetStackCount(), 1);
	assert.equal(f.hero.modifiers.modifier_omniknight_0.GetStackCount(), 1);
	assert.equal(f.hero.HasModifier('modifier_omniknight_0_active'), false); assert.equal(target.HasModifier('modifier_athena_stunned'), false);
});

test('旧局结束和 reset 不能清理当前局装置与计数；真正结束清理光环且耗蓝不足关闭屏障', () => {
	const f = fixture(), target = f.enemy({ CustomStatusHealth: 1000000 }); f.roll(false);
	f.attack(f.hero, target); f.abilities[2].OnSpellStart(); const device = f.devices[0];
	f.hero.AddNewModifier(device, f.abilities[2], 'modifier_omniknight_2_aura');
	f.abilities[4].ToggleAbility();
	f.fire('game_end', { run_id: 0 }); f.fire('game_reset', { runId: 0 });
	assert.notEqual(device.valid, false); assert.equal(f.hero.modifiers.modifier_omniknight_3.GetStackCount(), 1); assert.equal(f.abilities[4].GetToggleState(), true);
	f.hero.SetMana(10); f.prd(false); f.hero.modifiers.modifier_omniknight_4.OnIntervalThink();
	assert.equal(f.hero.GetMana(), 0); assert.equal(f.abilities[4].GetToggleState(), false);
	f.fire('game_end', { run_id: f.session.runId }); assert.equal(device.valid, false); assert.equal(f.hero.HasModifier('modifier_omniknight_2_aura'), false);
});

test('装置脉冲保留施放时的伤害快照；风暴按四个不同目标结束', () => {
	const f = fixture(); f.scepter(3); f.abilities[2].OnSpellStart(); const mod = f.devices[0].modifiers.modifier_omniknight_2;
	const target = f.enemy({ CustomStatusHealth: 10000000 }); const snapshot = f.c.GetStrength(f.hero) * 10;
	f.abilities[3].level = 5; f.hero.modifiers.modifier_omniknight_3.OnRefresh({}); mod.OnIntervalThink();
	near(f.hits.find(h => h.ability === f.abilities[2]).damage, snapshot * f.c.GetAthenaIncomingMultiplier(target, { damage_type: 2, attacker: f.hero, target }));
	for (let i = 0; i < 5; i++) f.enemy({ CustomStatusHealth: 10000000 }, 'chain_' + i);
	f.hits.length = 0; f.abilities[4].ThunderStorm(target); for (let i = 0; i < 6; i++) f.advance(0.3);
	const hits = f.hits.filter(h => h.ability === f.abilities[4]); assert.equal(hits.length, 4); assert.equal(new Set(hits.map(h => h.target)).size, 4);
});

test('操作面板同步真实技能列表、当前充能与专属上限', () => {
	const f = fixture();
	const first = f.publishAbilities(); assert.equal(first.abilities.length, 5);
	const charge = () => f.publishAbilities().abilities.find(a => a.abilityName === 'omniknight_1');
	assert.equal(charge().charge, 3); assert.equal(charge().maxCharge, 3);
	f.abilities[1].UseCharges(); assert.equal(charge().charge, 2);
	f.scepter(1); assert.equal(charge().maxCharge, 4);
});

console.log(`Passed ${passed} omniknight integration checks.`);
