/* 执行生产野怪模块与 modifier；一维坐标桩只验证规则，实际寻路和表现仍需 Dota 验收。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'content/athena_tsbuild/scripts/vscripts');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function load(file, globals, imports = {}) {
	const module = { exports: {} };
	const code = ts.transpileModule(fs.readFileSync(path.join(source, file + '.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText;
	vm.runInNewContext('Number.prototype.Length2D = function() { return Math.abs(this.valueOf()); };\n' + code,
		{ module, exports: module.exports, ...globals, require: name => { assert.ok(imports[name], 'unexpected import: ' + name); return imports[name]; } });
	return module.exports;
}
const unitData = { CustomStatusHealth: 100, AttackDamage: 10, Armor: 2, StatusMana: 50, IsNeutralUnitType: 1 };
const entry = { NPCName: 'ogre', TotalUnitsToSpawn: 3, SpawnInterval: 20, SpawnerName: 'spawn_1', SpawnOffset: 150 };
function fixture(config = { nature: { Unit1: { ...entry } } }, unitKvs = { ogre: unitData, boss_ogre: unitData }) {
	let now = 0, next = 0, index = 0, cleanupFailure = false, createFailure = false, randomOffset = false;
	const session = { runId: 1, state: 'GameState_Battle' };
	const timers = new Map(), listeners = new Map(), entities = new Map(), anchors = new Map([['spawn_1', 1000]]);
	const created = [], preloads = [], unloaded = [], outcomes = [], cleaned = [], properties = new Map();
	const fire = (name, data) => {
		const errors = [];
		for (const listener of [...listeners.values()].reverse()) if (listener.name === name) {
			try { listener.callback.call(listener.context, data); } catch (error) { errors.push({ error: String(error) }); }
		}
		return errors.length ? errors : undefined;
	};
	function unit(name, position) {
		const value = { name, position, index: ++index, valid: true, alive: true, level: Number(unitKvs[name]?.Level ?? 1), buffs: [], owner: undefined,
			entindex() { return this.index; }, IsAlive() { return this.alive; }, GetOwnerEntity() { return this.owner; }, IsCreature: () => true,
			CreatureLevelUp(delta) { this.level += delta; }, GetLevel() { return this.level; }, SetForwardVector(value) { this.forward = value; },
			AddNewModifier(_caster, _ability, name) { this.buffs.push(name); }, Stop() { this.stopped = true; },
			GetMaxMana_Engine: () => 0, GetMaxHealth() { return Math.floor(properties.get(this.index)?.base_health ?? 100); },
			SetBaseMaxHealth() {}, SetMaxHealth() {}, SetHealth(value) { this.health = value; }, SetMaxMana() {}, SetMana(value) { this.mana = value; },
			SetBaseDamageMin(value) { this.attack = value; }, SetBaseDamageMax() {}, SetPhysicalArmorBaseValue(value) { this.armor = value; },
			SetDeathXP(value) { this.xp = value; }, SetMaximumGoldBounty(value) { this.goldMax = value; }, SetMinimumGoldBounty(value) { this.goldMin = value; },
		}; entities.set(value.index, value); created.push(value); return value;
	}
	const globals = {
		CModule: class {}, NeutralSpawners: undefined, Vector: (x, y, z) => x + 1000 * y + 1000000 * z,
		math: { max: Math.max }, tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		IsValid: unit => !!unit?.valid, RandomVector: value => value, RandomFloat: (min, max) => min === 0 && randomOffset ? max / 2 : min, RollPercentage: chance => chance > 0,
		LoadKeyValues: () => config, KeyValues: { units: unitKvs },
		Entities: { FindByName: (_previous, name) => anchors.has(name) ? { valid: true, GetAbsOrigin: () => anchors.get(name) } : undefined },
		CreateUnitByName: (...args) => createFailure ? undefined : unit(...args), EntIndexToHScript: id => entities.get(id), UTIL_Remove: unit => { unit.valid = false; unit.alive = false; },
		DOTATeam_t: { DOTA_TEAM_BADGUYS: 3 }, GameRules: { GetGameTime: () => now, GetCustomGameDifficulty: () => 4 },
		GameState: { GetSession: () => session, FinishRun: (runId, outcome, reason) => { outcomes.push({ runId, outcome, reason }); session.state = 'GameState_Settle'; fire('game_end', { run_id: runId }); } },
		Event: {
			Register: (name, callback, context) => { const id = ++next; listeners.set(id, { name, callback, context }); return id; },
			UnregisterContext: context => { for (const [id, listener] of listeners) if (listener.context === context) listeners.delete(id); }, Fire: fire,
		},
		Timer: { GameTimer: (delay, callback) => { const id = String(++next); timers.set(id, { due: now + delay, callback }); return id; }, StopTimer: id => timers.delete(id) },
		PrecacheUnitByNameAsync: (name, callback) => preloads.push({ name, callback }), UnloadSpawnGroupByHandle: handle => unloaded.push(handle),
		PropertySystem: {
			AddStaticProperty: (id, key, _source, value) => { if (!properties.has(id)) properties.set(id, {}); properties.get(id)[key] = value; },
			CleanupUnitPropertiesByIndex: id => { if (cleanupFailure) throw new Error('cleanup failed'); cleaned.push(id); },
		},
		LargeNumberHealth: { Refresh: () => false }, StateSystem: { CleanupUnitStatesByIndex() {} }, AbilityUpgrade: { CleanupUnitUpgrades() {} },
		CustomNetTables: { GetNetData: () => ({ run_id: session.runId, round_number: 10 }) },
	};
	const { CNeutralSpawners } = load('mechanics/neutral_spawners', globals, {
		'../lib/tstl-utils': { reloadable: value => value },
	});
	const module = new CNeutralSpawners(); module.init(false);
	function advance(time) {
		const end = now + time;
		for (let guard = 0; guard < 10000; guard++) {
			const pending = [...timers].filter(([, timer]) => timer.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
			if (!pending) { now = end; return; }
			const [id, timer] = pending; now = timer.due; const interval = timer.callback();
			if (timers.has(id)) { if (typeof interval === 'number') timer.due = now + Math.max(0.01, interval); else timers.delete(id); }
		}
		throw new Error('timer loop did not converge');
	}
	return { module, session, globals, timers, listeners, created, preloads, unloaded, outcomes, cleaned, anchors, properties, fire, advance,
		start: () => fire('game_start', { runId: session.runId }),
		kill: unit => { unit.alive = false; fire('entity_killed', { victim: unit }); },
		failCleanup: value => { cleanupFailure = value; },
		failCreation: value => { createFailure = value; }, useOffset: () => { randomOffset = true; },
	};
}

test('按固定检查时刻整批刷新；有存活怪不补单只，清空后不另起死亡倒计时', () => {
	const f = fixture(); f.start(); f.advance(0); assert.equal(f.created.length, 3);
	f.advance(5); f.kill(f.created[0]); f.advance(15); assert.equal(f.created.length, 3);
	f.advance(5); f.created.forEach(f.kill); f.advance(14.9); assert.equal(f.created.length, 3);
	f.advance(0.1); assert.equal(f.created.length, 6); assert.equal(f.outcomes.length, 0);
});
test('WaitForTime、精英替换、出生偏移和固定朝向使用原版字段', () => {
	const f = fixture({ nature: { Unit1: { ...entry, WaitForTime: 3, EliteName: 'boss_ogre', EliteChance: 100, ForwardVector: '0,-1,0' } } });
	f.useOffset();
	f.start(); f.advance(2.9); assert.equal(f.created.length, 0); f.advance(0.1);
	assert.ok(f.created.every(unit => unit.name === 'boss_ogre' && unit.position === 1075 && unit.forward === -1000));
	assert.ok(f.created.every(unit => unit.buffs.includes('modifier_enemy_scaling') && unit.buffs.includes('modifier_neutral')));
	assert.ok(f.created.every(unit => unit.xp === 0 && unit.goldMin === 0 && unit.goldMax === 0));
	assert.deepEqual(f.preloads.map(item => item.name), ['ogre', 'boss_ogre']);
});
test('同营地多个 Unit 条目独立刷新，直接移除或漏发死亡事件也能收敛', () => {
	const f = fixture({ nature: { Unit1: { ...entry, TotalUnitsToSpawn: 2 }, Unit2: { ...entry, NPCName: 'boss_ogre', TotalUnitsToSpawn: 1 } } });
	f.start(); f.advance(0); assert.equal(f.created.length, 3);
	f.created.filter(unit => unit.name === 'ogre').forEach(unit => { unit.valid = false; });
	f.advance(20); assert.equal(f.created.length, 5); assert.equal(f.created.filter(unit => unit.name === 'boss_ogre').length, 1);
});
test('GrowUp 保留原版逐次生成升级，重开等级恢复；旧事件和旧计时器不能影响新局', () => {
	const f = fixture({ boss: { Unit1: { ...entry, TotalUnitsToSpawn: 1, GrowUp: '1', SpawnerName: '1,2,3' } } });
	f.start(); f.advance(0); assert.equal(f.created[0].level, 1); assert.equal(f.module.GetLevel('ogre'), 2);
	f.kill(f.created[0]); f.advance(20); assert.equal(f.created[1].level, 2); assert.equal(f.module.GetLevel('ogre'), 3);
	const oldCallbacks = [...f.timers.values()].map(timer => timer.callback);
	f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); assert.equal(f.timers.size, 0);
	assert.ok(f.created[1].buffs.includes('modifier_stunned')); f.fire('game_reset', { runId: 1 }); assert.ok(f.created.every(unit => !unit.valid));
	f.session.runId = 2; f.session.state = 'GameState_Battle'; f.start(); f.start(); f.module.init(true); assert.equal(f.listeners.size, 5); assert.equal(f.timers.size, 1);
	f.fire('game_end', { run_id: 1 }); f.fire('game_reset', { runId: 1 }); oldCallbacks.forEach(fn => fn()); assert.equal(f.timers.size, 1);
	f.advance(0); assert.equal(f.created.at(-1).level, 1); assert.equal(f.created.length, 3);
});
test('停止后晚到预载不卸载地图；清理失败可重试，地图和无关实体保持有效', () => {
	const f = fixture(); f.start(); f.advance(0); const unrelated = f.globals.CreateUnitByName('map_dummy', 0);
	f.preloads[0].callback(2); f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 });
	f.preloads[0].callback(2); assert.deepEqual(f.unloaded, []);
	f.failCleanup(true); assert.equal(f.fire('game_reset', { runId: 1 }).length, 1);
	f.failCleanup(false); assert.equal(f.fire('game_reset', { runId: 1 }), undefined); f.fire('game_reset', { runId: 1 });
	assert.equal(unrelated.valid, true); assert.ok(f.created.slice(0, 3).every(unit => !unit.valid)); assert.equal(f.anchors.get('spawn_1'), 1000);
});
test('缺少锚点或创建失败进入错误结算，停止全部刷怪计时器', () => {
	const missing = fixture(); missing.anchors.clear(); missing.start(); assert.equal(missing.outcomes[0].outcome, 'error'); assert.equal(missing.timers.size, 0);
	const failed = fixture({ nature: { Unit1: { ...entry, NPCName: 'missing' } } }); failed.start(); assert.equal(failed.outcomes[0].outcome, 'error');
	const create = fixture(); create.failCreation(true); create.start(); create.advance(0);
	assert.equal(create.outcomes[0].outcome, 'error'); assert.equal(create.timers.size, 0);
});
test('实际 23 组/27 条目首轮共 54 只，单位与 solo/team 地图锚点完整', () => {
	const { parseKV } = require('./kv-parser'); const npc = path.join(root, 'game/athena_tsbuild/scripts/npc');
	const read = file => { const full = path.join(npc, file); return parseKV(fs.readFileSync(full, 'utf8'), full).data; };
	const camps = read('kv/gameplay/neutral_spawners.kv'), units = read('npc_units_custom.txt'); const f = fixture(camps, units);
	const entries = Object.values(camps).flatMap(group => Object.values(group).filter(entry => entry && typeof entry === 'object' && entry.NPCName));
	assert.equal(Object.keys(camps).length, 23); assert.equal(entries.length, 27);
	for (const entry of entries) f.anchors.set(entry.SpawnerName, 1000);
	f.start(); f.advance(0); assert.equal(f.created.length, 54); assert.equal(f.outcomes.length, 0);
	for (const map of ['solo', 'team']) {
		const data = fs.readFileSync(path.join(root, 'content/athena_tsbuild/maps', map + '.vmap'));
		for (const entry of entries) assert.ok(data.includes(Buffer.from(entry.SpawnerName + '\0')), map + ' lacks ' + entry.SpawnerName);
	}
});

test('营地返回：越界追击 5 秒、回营取消、恐惧/眩晕不下令，空闲按附近敌人行动', () => {
	let now = 0, position = 0, feared = false, customFear = false, stunned = false, aggro = {}, targets = [];
	const orders = [], unit = { HasMovementCapability: () => true, GetAbsOrigin: () => position, IsAlive: () => true,
		IsFeared: () => feared, HasState: () => customFear, IsStunned: () => stunned, GetAggroTarget: () => aggro, GetTeamNumber: () => 3, Script_GetAttackRange: () => 125,
		MoveToPosition: position => orders.push(['move', position]), MoveToPositionAggressive: position => orders.push(['attack', position]),
	};
	const { modifier_neutral } = load('modifiers/modifier_neutral', {
		IsServer: () => true, IsValid: Boolean, StateEnum: { FEAR: 1 }, GameRules: { GetGameTime: () => now }, FindUnitsInRadius: () => targets,
		DOTA_UNIT_TARGET_TEAM: { DOTA_UNIT_TARGET_TEAM_ENEMY: 1 }, DOTA_UNIT_TARGET_TYPE: { DOTA_UNIT_TARGET_BASIC: 1, DOTA_UNIT_TARGET_HERO: 2 },
		DOTA_UNIT_TARGET_FLAGS: { DOTA_UNIT_TARGET_FLAG_NONE: 0 }, FindOrder: { FIND_CLOSEST: 0 },
	}, { './eom_modifier/eom_modifier': { EOMModifier: class {}, registerEOMModifier: () => value => value } });
	const modifier = new modifier_neutral(); modifier.GetParent = () => unit; modifier.StartIntervalThink = interval => assert.equal(interval, 0.1); modifier.OnCreated();
	position = 500; modifier.OnIntervalThink(); now = 4.9; modifier.OnIntervalThink(); assert.equal(orders.length, 0);
	now = 5; modifier.OnIntervalThink(); assert.deepEqual(orders.pop(), ['move', 0]);
	modifier.OnIntervalThink(); position = 100; modifier.OnIntervalThink(); position = 500; now = 10; modifier.OnIntervalThink(); assert.equal(orders.length, 0);
	feared = true; now = 20; modifier.OnIntervalThink(); feared = false; stunned = true; modifier.OnIntervalThink(); assert.equal(orders.length, 0);
	stunned = false; customFear = true; now = 25; modifier.OnIntervalThink(); assert.equal(orders.length, 0); customFear = false;
	stunned = false; aggro = undefined; position = 100; modifier.OnIntervalThink(); assert.deepEqual(orders.pop(), ['move', 0]);
	targets = [{}]; modifier.OnIntervalThink(); assert.deepEqual(orders.pop(), ['attack', 100]);
});
console.log(`Passed ${passed} neutral spawner checks.`);
