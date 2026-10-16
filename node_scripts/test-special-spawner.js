/* 执行生产特殊进攻、权重池和波次模块；一维坐标桩验证规则，游戏表现另行验收。 */
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
	vm.runInNewContext(code, { module, exports: module.exports, ...globals, require: name => { assert.ok(imports[name], 'unexpected import: ' + name); return imports[name]; } });
	return module.exports;
}
const stats = { CustomStatusHealth: 100, AttackDamage: 10, Armor: 2, StatusMana: 50 };
const defaultRush = { iRound: 15, UnitPool: { a: 30, b: 60, c: 70, d: 100 }, Spawner: { special_1: 1, special_2: 1, special_3: 1, special_4: 1 }, flInterval: 9, flDuration: 130, fSpawnOffset: 150 };
function fixture(config = { rush: defaultRush }, difficulty = 2, unitKvs = { a: stats, b: stats, c: stats, d: stats, zeus: stats, zeus_reborn: stats, wave: stats }) {
	let now = 0, next = 0, index = 0, randomValue = 1, createFailure = false, cleanupFailure = false, missingBase = false, currentRound = 15;
	const session = { runId: 1, state: 'GameState_Battle' }, timers = new Map(), listeners = new Map(), entities = new Map();
	const created = [], notifications = [], sounds = [], preloads = [], unloaded = [], outcomes = [], cleaned = [], events = [], properties = new Map();
	const anchors = new Map([['special_1', 1000], ['special_2', 2000], ['special_3', 3000], ['special_4', 4000], ['spawn', 5000]]);
	const fire = (name, data) => {
		events.push({ name, data }); const errors = [];
		for (const listener of [...listeners.values()].reverse()) if (listener.name === name) {
			try { listener.callback.call(listener.context, data); } catch (error) { errors.push({ error: String(error) }); }
		}
		return errors.length ? errors : undefined;
	};
	function entity(name, position, team = 3) {
		const unit = { name, position, team, index: ++index, valid: true, alive: true, owner: undefined, buffs: [],
			entindex() { return this.index; }, GetUnitName() { return this.name; }, GetTeamNumber() { return this.team; }, IsAlive() { return this.alive; }, IsCreature: () => true,
			GetOwnerEntity() { return this.owner; }, GetAbsOrigin() { return this.position; }, GetLevel: () => 1, SetForwardVector() {},
			SetRequiresReachingEndPath(value) { this.reach = value; }, SetInitialGoalEntity(value) { this.goal = value; }, SetMustReachEachGoalEntity(value) { this.must = value; },
			AddNewModifier(_caster, _ability, name) { this.buffs.push(name); }, Stop() { this.stopped = true; },
			GetMaxMana_Engine: () => 0, GetMaxHealth() { return Math.floor(properties.get(this.index)?.base_health ?? 100); },
			SetBaseMaxHealth() {}, SetMaxHealth() {}, SetHealth(value) { this.health = value; }, SetMaxMana() {}, SetMana() {}, SetBaseDamageMin(value) { this.attack = value; }, SetBaseDamageMax() {}, SetPhysicalArmorBaseValue() {},
			SetDeathXP(value) { this.xp = value; }, SetMaximumGoldBounty(value) { this.goldMax = value; }, SetMinimumGoldBounty(value) { this.goldMin = value; },
		}; entities.set(unit.index, unit); return unit;
	}
	const base = entity('athena', 0, 2);
	const globals = {
		CModule: class {}, SpecialSpawner: undefined, WaveSpawning: undefined, Demo: { IsCreepsEnabled: () => true },
		math: { max: Math.max, pow: Math.pow, log: Math.log, floor: Math.floor, random: (min, max) => Math.min(max, Math.max(min, randomValue)) }, pairs: value => Object.entries(value),
		Vector: (x, y, z) => x + y * 1000 + z * 1000000, tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		IsValid: unit => !!unit?.valid, RandomVector: length => length, RandomFloat: (min, max) => min === 0 ? max / 2 : min, RollPercentage: () => false, EmitGlobalSound() {},
		GameRules: { GetGameTime: () => now, GetCustomGameDifficulty: () => difficulty }, Game: { EachPlayer: fn => fn(0) },
		Notification: { Upper: data => notifications.push(data.message) }, PlayerResource: { GetPlayer: () => ({ valid: true }) }, EmitSoundOnClient: sound => sounds.push(sound),
		Entities: { FindByName: (_previous, name) => anchors.has(name) ? { valid: true, GetAbsOrigin: () => anchors.get(name), GetForwardVector: () => 1 } : undefined, FindAllByClassname: () => missingBase ? [] : [base] },
		CreateUnitByName: (name, position) => { if (createFailure) return undefined; const unit = entity(name, position); created.push(unit); return unit; },
		EntIndexToHScript: id => entities.get(id), UTIL_Remove: unit => { unit.valid = false; unit.alive = false; }, DOTATeam_t: { DOTA_TEAM_BADGUYS: 3, DOTA_TEAM_GOODGUYS: 2 },
		LoadKeyValues: file => file.includes('special_rush') ? config : file.includes('spawner_group') ? { group: { unit: { NPCName: 'wave', SpawnerName: 'spawn', TotalUnitsToSpawn: 1 } } } : { round: { RoundNumber: 38, PrepareRoundTime: 0, SpawnerGroupID: 'group' } },
		KeyValues: { units: unitKvs }, GameState: { GetSession: () => session, FinishRun: (runId, outcome, reason) => { outcomes.push({ runId, outcome, reason }); session.state = 'GameState_Settle'; fire('game_end', { run_id: runId }); } },
		Event: { Register: (name, callback, context) => { const id = ++next; listeners.set(id, { name, callback, context }); return id; }, UnregisterContext: context => { for (const [id, value] of listeners) if (value.context === context) listeners.delete(id); }, Fire: fire },
		Timer: { GameTimer: (delay, callback) => { const id = String(++next); timers.set(id, { due: now + delay, callback }); return id; }, StopTimer: id => timers.delete(id) },
		PrecacheUnitByNameAsync: (name, callback) => preloads.push({ name, callback }), UnloadSpawnGroupByHandle: handle => unloaded.push(handle),
		PropertySystem: { AddStaticProperty: (id, key, _source, value) => { if (!properties.has(id)) properties.set(id, {}); properties.get(id)[key] = value; }, CleanupUnitPropertiesByIndex: id => { if (cleanupFailure) throw new Error('cleanup failed'); cleaned.push(id); } },
		StateSystem: { CleanupUnitStatesByIndex() {} }, AbilityUpgrade: { CleanupUnitUpgrades() {} }, LargeNumberHealth: { Refresh: () => false },
		CustomNetTables: { GetNetData: () => ({ run_id: session.runId, round_number: currentRound }), SetNetData: (_table, key, value) => { if (key === 'round_state' && value) currentRound = value.round_number; } },
	};
	const imports = {
		'../lib/tstl-utils': { reloadable: value => value },
		'../class/weight_pool': load('class/weight_pool', globals, { './priority_queue': load('class/priority_queue', globals) }),
	};
	const { CSpecialSpawner } = load('mechanics/special_spawner', globals, imports); const module = new CSpecialSpawner(); module.init(false);
	function advance(time) {
		const end = now + time;
		for (let guard = 0; guard < 10000; guard++) {
			const pending = [...timers].filter(([, timer]) => timer.due <= end + 1e-9).sort((a, b) => a[1].due - b[1].due)[0];
			if (!pending) { now = end; return; }
			const [id, timer] = pending; now = timer.due; const interval = timer.callback();
			if (timers.has(id)) { if (typeof interval === 'number') timer.due = now + Math.max(0.01, interval); else timers.delete(id); }
		}
		throw new Error('timer loop did not converge');
	}
	return { module, session, globals, base, anchors, created, timers, listeners, notifications, sounds, preloads, unloaded, outcomes, events, properties, fire, entity, advance,
		start: () => fire('game_start', { runId: session.runId }), endRound: round => fire('round_state_change', { runId: session.runId, round_number: round, stage: 'end' }),
		kill: unit => { unit.alive = false; fire('entity_killed', { victim: unit }); }, setRandom: value => { randomValue = value; },
		failCreation: () => { createFailure = true; }, failCleanup: value => { cleanupFailure = value; }, removeBase: () => { missingBase = true; },
		addWaves: () => { const { CWaveSpawner } = load('mechanics/wave_spawner', globals, imports); const waves = new CWaveSpawner(); waves.init(false); return waves; },
	};
}

test('只在指定波次结束时触发，重复事件不重复通知或创建计时器', () => {
	const f = fixture(); f.start(); assert.equal(f.created.length, 0);
	f.fire('round_state_change', { runId: 0, round_number: 15, stage: 'end' }); f.fire('round_state_change', { runId: 1, round_number: 15, stage: 'battle' }); f.endRound(14); assert.equal(f.timers.size, 0);
	f.endRound(15); f.endRound(15); assert.equal(f.timers.size, 1); assert.deepEqual(f.notifications, ['rush']);
	f.advance(0); assert.equal(f.created.length, 4); assert.deepEqual(f.created.map(unit => unit.position), [1075, 2075, 3075, 4075]);
	assert.ok(f.created.every(unit => unit.goal === f.base && unit.reach === true && unit.must === false && unit.buffs.includes('modifier_original_health_bar')));
});
test('使用生产 CWeightPool 按权重区间抽取单位，不把 KV 权重当累计阈值', () => {
	const f = fixture(); f.start();
	for (const [roll, expected] of [[1, 'a'], [30, 'a'], [31, 'b'], [90, 'b'], [91, 'c'], [160, 'c'], [161, 'd'], [260, 'd']]) {
		f.setRandom(roll); f.endRound(15); f.advance(0); assert.ok(f.created.slice(-4).every(unit => unit.name === expected));
		f.fire('game_end', { run_id: f.session.runId }); f.fire('game_reset', { runId: f.session.runId }); f.session.runId++; f.start();
	}
});
test('三个持续进攻在难度 1 至 5 保留 130 - 50/难度 时限、9/10/12 秒间隔，超时不移除存活怪', () => {
	for (const interval of [9, 10, 12]) for (let difficulty = 1; difficulty <= 5; difficulty++) {
		const f = fixture({ rush: { ...defaultRush, flInterval: interval } }, difficulty); f.start(); f.endRound(15); f.advance(140);
		assert.equal(f.created.length, Math.ceil((130 - 50 / difficulty) / interval) * 4); assert.equal(f.timers.size, 0);
		assert.ok(f.created.every(unit => unit.valid && unit.alive));
	}
});
test('无间隔的 Boss 只生成一次，保留坐标、提示和音效', () => {
	const f = fixture({ poseidon: { UnitPool: { a: 1 }, Spawner: { '-1972,1972,384': 1 }, iRound: 13, sSoundName: 'Ability.Ghostship' } });
	f.start(); f.endRound(13); f.advance(200); assert.equal(f.created.length, 1); assert.equal(f.created[0].position, -1972 + 1972 * 1000 + 384 * 1000000);
	assert.deepEqual(f.sounds, ['Ability.Ghostship']); assert.deepEqual(f.notifications, ['poseidon']); assert.equal(f.timers.size, 0);
});
test('结算停止、冻结和重置可重试；重载和重开隔离旧事件、计时器、预载及召唤物', () => {
	const f = fixture(); f.start(); f.endRound(15); f.advance(0); const callbacks = [...f.timers.values()].map(timer => timer.callback);
	const summon = f.entity('summon', 0); summon.owner = f.created[0]; f.fire('npc_spawned', { unit: summon }); const unrelated = f.entity('map_dummy', 0);
	f.preloads[0].callback(2); f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); assert.equal(f.timers.size, 0); assert.ok(f.created.every(unit => unit.buffs.includes('modifier_stunned')));
	f.preloads[1].callback(2); assert.deepEqual(f.unloaded, []); f.failCleanup(true); assert.equal(f.fire('game_reset', { runId: 1 }).length, 1);
	f.failCleanup(false); assert.equal(f.fire('game_reset', { runId: 1 }), undefined); assert.equal(summon.valid, false); assert.equal(unrelated.valid, true); assert.equal(f.base.valid, true);
	f.session.runId = 2; f.session.state = 'GameState_Battle'; f.start(); f.start(); f.module.init(true); assert.equal(f.listeners.size, 7);
	f.fire('game_end', { run_id: 1 }); f.fire('game_reset', { runId: 1 }); callbacks.forEach(callback => callback()); const count = f.created.length;
	f.endRound(15); f.advance(0); assert.equal(f.created.length, count + 4); assert.equal(f.timers.size, 1);
});
test('缺失基地、单位、锚点及创建失败均进入错误结算并停止刷怪', () => {
	const base = fixture(); base.removeBase(); base.start(); assert.equal(base.outcomes[0].outcome, 'error');
	const unit = fixture({ rush: { ...defaultRush, UnitPool: { missing: 1 } } }); unit.start(); assert.equal(unit.outcomes[0].outcome, 'error');
	const anchor = fixture(); anchor.anchors.clear(); anchor.start(); assert.equal(anchor.outcomes[0].outcome, 'error');
	const create = fixture(); create.start(); create.failCreation(); create.endRound(15); create.advance(0); assert.equal(create.outcomes[0].outcome, 'error'); assert.equal(create.timers.size, 0);
});
test('真实波次结束事件生成最终宙斯，普通波次完成不提前判胜，只在本局 zeus_reborn 死亡后结束', () => {
	const f = fixture({ zeus: { UnitPool: { zeus: 1 }, Spawner: { '-1972,1972,384': 1 }, iRound: 38 } });
	f.addWaves(); f.start(); f.advance(0.1); const wave = f.created.find(unit => unit.name === 'wave'); assert.ok(wave);
	f.kill(wave); f.advance(0.2); assert.equal(f.created.filter(unit => unit.name === 'zeus').length, 1); assert.equal(f.outcomes.length, 0);
	assert.equal(f.events.filter(event => event.name === 'waves_complete').length, 1);
	f.kill(f.created.find(unit => unit.name === 'zeus')); assert.equal(f.outcomes.length, 0);
	const reborn = f.entity('zeus_reborn', 0); f.fire('npc_spawned', { unit: reborn }); f.kill(reborn); f.kill(reborn);
	assert.equal(f.outcomes.length, 1); assert.equal(f.outcomes[0].outcome, 'victory'); assert.equal(f.timers.size, 0);
});
test('未配置最终宙斯时，普通波次完成仍通过事件正常判胜', () => {
	const f = fixture(); f.addWaves(); f.start(); f.advance(0.1); f.kill(f.created[0]); f.advance(0.2);
	assert.equal(f.outcomes[0].outcome, 'victory'); assert.equal(f.timers.size, 0);
});
test('实际六类进攻配置与原版一致，单位和 solo/team 四个入口齐全', () => {
	const { parseKV } = require('./kv-parser'); const npc = path.join(root, 'game/athena_tsbuild/scripts/npc');
	const read = file => { const full = path.join(npc, file); return parseKV(fs.readFileSync(full, 'utf8'), full).data; };
	const config = read('kv/gameplay/special_rush.kv'), units = read('npc_units_custom.txt'); assert.equal(Object.keys(config).length, 6);
	assert.ok(fs.readFileSync(path.join(npc, 'kv/gameplay/special_rush.kv')).equals(fs.readFileSync('D:/Dota Addons/athena-reborn/game/athena_reborn/scripts/npc/kv/gameplay/special_rush.kv')));
	const f = fixture(config, 2, units); for (let i = 1; i <= 4; i++) f.anchors.set('special_rush_' + i, i * 1000);
	f.start(); assert.equal(f.outcomes.length, 0); for (const round of [13, 15, 25, 26, 35, 38]) f.endRound(round); f.advance(0); assert.equal(f.created.length, 15);
	for (const map of ['solo', 'team']) {
		const data = fs.readFileSync(path.join(root, 'content/athena_tsbuild/maps', map + '.vmap'));
		for (let i = 1; i <= 4; i++) assert.ok(data.includes(Buffer.from('special_rush_' + i + '\0')));
	}
});
console.log(`Passed ${passed} special spawner checks.`);
