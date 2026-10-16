/* 验证 HUD Demo 请求经生产 Demo 和 Event 控制波次；实体、计时器使用引擎桩。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = path.resolve(__dirname, '../content/athena_tsbuild/scripts/vscripts');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function fixture() {
	let now = 0, tools = true, next = 0, DemoClass, demoSettings;
	const session = { runId: 1, state: 'GameState_Battle' }, listeners = new Map(), timers = new Map(), entities = new Map(), actions = new Map();
	const created = [], published = [], completed = [];
	const anchor = { valid: true, GetAbsOrigin: () => 0, GetForwardVector: () => 1 };
	const fire = (name, data) => {
		for (const listener of [...listeners.values()]) if (listener.name === name) listener.callback.call(listener.context, data);
		if (name === 'waves_complete') completed.push(data);
	};
	function unit(name) {
		const result = { name, index: ++next, valid: true, alive: true,
			entindex() { return this.index; }, IsAlive() { return this.alive; }, GetOwnerEntity() { return this.owner; }, GetTeamNumber: () => 3,
			IsCreature: () => false, SetForwardVector() {}, SetInitialGoalEntity() {}, SetMustReachEachGoalEntity() {},
			SetDeathXP() {}, SetMaximumGoldBounty() {}, SetMinimumGoldBounty() {}, AddNewModifier() {}, Stop() {},
		}; entities.set(result.index, result); created.push(result); return result;
	}
	const globals = {
		CModule: class {}, Demo: undefined, WaveSpawning: undefined, math: Math, tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		pairs: value => Object.entries(value), IsInToolsMode: () => tools, IsValid: value => !!value?.valid,
		SendToServerConsole() {}, GameEvent() {}, CustomUIEvent: (name, fn, context) => actions.set(name, data => fn.call(context, data)), vec3_invalid: -1,
		GameRules: { GetGameTime: () => now, GetCustomGameDifficulty: () => 2 }, GameState: { GetSession: () => session, FinishRun() { assert.fail('unexpected settlement'); } },
		Event: { Register(name, callback, context) { const id = ++next; listeners.set(id, { name, callback, context }); return id; },
			UnregisterContext(context) { for (const [id, listener] of listeners) if (listener.context === context) listeners.delete(id); }, Fire: fire },
		CustomNetTables: { SetTableValue(_table, key, value) { if (key === 'demo_settings') demoSettings = value; },
			SetNetData(_table, key, value) { if (key === 'round_state' && value) published.push(value); } },
		Timer: { GameTimer(_delay, callback) { const id = String(++next); timers.set(id, callback); return id; }, StopTimer: id => timers.delete(id) },
		Entities: { FindByName: () => anchor }, EntIndexToHScript: id => entities.get(id), CreateUnitByName: unit,
		UTIL_Remove(unit) { unit.valid = false; unit.alive = false; }, DOTATeam_t: { DOTA_TEAM_BADGUYS: 3, DOTA_TEAM_GOODGUYS: 2 },
		PrecacheUnitByNameAsync() {}, UnloadSpawnGroupByHandle() {}, EmitGlobalSound() {}, RollPercentage: () => false,
		KeyValues: { units: { creep: {} } },
		LoadKeyValues: file => file.includes('spawner_group')
			? { group: { unit: { NPCName: 'creep', SpawnerName: 'spawn', TotalUnitsToSpawn: 3, UnitsPerSpawn: 1, SpawnInterval: 10 } } }
			: { round: { RoundNumber: 1, PrepareRoundTime: 3, SpawnerGroupID: 'group' } },
		PropertySystem: { CleanupUnitPropertiesByIndex() {} }, StateSystem: { CleanupUnitStatesByIndex() {} }, AbilityUpgrade: { CleanupUnitUpgrades() {} },
	};
	function load(file, reloadable) {
		const module = { exports: {} };
		const code = ts.transpileModule(fs.readFileSync(path.join(source, file + '.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText;
		vm.runInNewContext(code, { ...globals, module, exports: module.exports, require: name => { assert.equal(name, '../lib/tstl-utils'); return { reloadable }; } });
		return module.exports;
	}
	load('framework/demo', value => { DemoClass = value; return value; });
	const demo = globals.Demo = new DemoClass(); demo.init(false);
	const { CWaveSpawner } = load('mechanics/wave_spawner', value => value), waves = new CWaveSpawner(); waves.init(false);
	return { demo, waves, session, created, published, completed, listeners, timers, unit, fire,
		start: () => fire('game_start', { runId: session.runId }),
		tick(time) { now = time; [...timers.values()].forEach(callback => callback()); },
		toggle: () => actions.get('DemoEvent')({ event_name: 'NoCreepsButtonPressed', PlayerID: 0 }),
		settings: () => demoSettings, tools(value) { tools = value; },
	};
}
test('默认刷怪开启；HUD 请求切换服务器状态和网表，正式环境拒绝调试请求', () => {
	const f = fixture(); assert.equal(f.settings().creeps, 1); assert.equal(f.demo.IsCreepsEnabled(), true);
	f.tools(false); f.toggle(); assert.equal(f.settings().creeps, 1);
	f.tools(true); f.toggle(); assert.equal(f.settings().creeps, 0); assert.equal(f.demo.IsCreepsEnabled(), false);
	f.toggle(); assert.equal(f.settings().creeps, 1);
	// 已运行的 Demo 实例首次热更新此功能时也默认开启，并补发界面状态。
	delete f.demo.creeps; assert.equal(f.demo.IsCreepsEnabled(), true); f.demo.init(true); assert.equal(f.settings().creeps, 1);
});
test('暂停清空当前波次与召唤物，保留地图/野怪/特殊进攻；恢复不重刷已生成配额', () => {
	const f = fixture(); f.start(); f.tick(3); assert.equal(f.created.length, 1);
	const creep = f.created[0], summon = f.unit('summon'); summon.owner = creep; f.fire('npc_spawned', { unit: summon });
	const unrelated = ['map', 'neutral', 'special'].map(f.unit); f.toggle();
	assert.equal(creep.valid, false); assert.equal(summon.valid, false); assert.ok(unrelated.every(unit => unit.valid));
	const count = f.created.length; f.tick(100); f.tick(101); assert.equal(f.created.length, count); assert.equal(f.published.at(-1).stage, 'battle'); assert.equal(f.completed.length, 0);
	f.waves.init(true); assert.equal(f.listeners.size, 6); f.tick(102); assert.equal(f.created.length, count);
	f.toggle(); f.tick(103); f.tick(104); assert.equal(f.created.length, count + 2);
	f.created.filter(unit => unit.name === 'creep').forEach(unit => { unit.alive = false; }); f.tick(105); f.tick(106); assert.equal(f.completed.length, 1);
});
test('备战与重开保留调试开关；暂停期间不推进波次，旧局回调不能在新局刷怪', () => {
	const f = fixture(); f.toggle(); f.start(); f.tick(50); assert.equal(f.created.length, 0); assert.equal(f.published.at(-1).stage, 'prepare');
	const stale = [...f.timers.values()]; f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); f.fire('game_reset', { runId: 1 });
	f.session.runId = 2; f.session.state = 'GameState_Battle'; f.start(); f.tick(100); assert.equal(f.created.length, 0);
	f.toggle(); stale.forEach(callback => callback()); assert.equal(f.created.length, 0);
	f.tick(101); assert.equal(f.created.length, 1); assert.equal(f.timers.size, 1);
});
console.log(`Passed ${passed} demo creeps checks.`);
