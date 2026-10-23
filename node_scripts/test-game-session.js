/* 验证生产 TypeScript 对局规则；引擎计时器、实体及资源另外需要 Dota 验收。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const vscripts = path.join(root, 'content/athena_tsbuild/scripts/vscripts');
let passed = 0;
function load(file, globals = {}, overrides = {}) {
	const module = { exports: {} };
	const code = ts.transpileModule(fs.readFileSync(path.join(vscripts, file + '.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText;
	const sandbox = { module, exports: module.exports, console, ...globals, require: name => {
		if (overrides[name]) return overrides[name];
		throw new Error('Unmocked module: ' + name);
	} };
	vm.runInNewContext(code, sandbox, { filename: file }); return module.exports;
}
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function loadWaves(globals = {}) {
	return load('mechanics/wave_spawner', { CModule: class {}, WaveSpawning: undefined, Demo: { IsCreepsEnabled: () => true }, ...globals }, {
		'../lib/tstl-utils': { reloadable: value => value },
	});
}
const { RunSession } = load('class/run_session');
const waveGlobals = {
	PrecacheUnitByNameAsync() {}, UnloadSpawnGroupByHandle() {}, EmitGlobalSound() {}, RollPercentage: chance => chance >= 100,
};
const { RoundRunner } = loadWaves(waveGlobals);
function prepare(mode, ids) {
	const session = new RunSession(mode, 'hero_a');
	assert.equal(session.Transition('GameState_Prepare'), true); session.SyncPlayers(ids);
	return session;
}
function battle(session) {
	for (const id of Object.keys(session.players).map(Number)) session.SetReady(id, true);
	assert.equal(session.LockParticipants(), true);
	assert.equal(session.Transition('GameState_DiffSelection'), true); session.ResolveDifficulty();
	assert.equal(session.Transition('GameState_RunInit'), true); assert.equal(session.Transition('GameState_Battle'), true);
}
test('solo/team 连续胜利、失败、放弃共三局，局号隔离且第二局重新准备', () => {
	for (const mode of ['solo', 'team']) {
		const ids = mode === 'solo' ? [0] : [0, 1, 2, 3], session = prepare(mode, ids);
		for (const outcome of ['victory', 'defeat', 'abandoned']) {
			battle(session); const oldId = session.runId, oldVersion = session.version;
			assert.equal(session.Finish(oldId, outcome, outcome, 10), true);
			assert.equal(session.Finish(oldId, 'victory', 'duplicate', 10), false);
			assert.equal(session.Transition('GameState_Settle'), true);
			assert.equal(session.RequestVote(ids[0], 'replay', 20), true);
			for (const id of ids) session.RespondVote(id, true, 21, session.vote.id);
			assert.equal(session.VotePassed(21), true);
			session.Transition('GameState_Reset'); session.Transition('GameState_Prepare');
			assert.equal(session.runId, oldId + 1); assert.equal(session.result, undefined);
			assert.equal(session.Matches(oldId, oldVersion), false);
			assert.equal(session.Finish(oldId, 'victory', 'late', 99), false);
			assert.equal(session.LockParticipants(), false);
		}
	}
});
test('team 等待全部在线玩家就绪，旁观者不能加入当前局或参与投票', () => {
	const session = prepare('team', [0, 1]); session.SetReady(0, true);
	assert.equal(session.LockParticipants(), false); session.SetReady(1, true); assert.equal(session.LockParticipants(), true);
	session.Transition('GameState_DiffSelection'); session.SyncPlayers([0, 1, 2]);
	assert.equal(session.players[2], undefined); assert.equal(session.SetDifficulty(2, 5), false);
	session.Transition('GameState_RunInit'); session.Transition('GameState_Battle');
	assert.equal(session.RequestVote(2, 'abandon', 0), false);
});
test('人数上限、非法难度和同票取较低难度', () => {
	const solo = prepare('solo', [0, 1]); solo.SetReady(0, true); solo.SetReady(1, true); assert.equal(solo.LockParticipants(), false);
	const session = prepare('team', [0, 1]); session.SetReady(0, true); session.SetReady(1, true); session.LockParticipants(); session.Transition('GameState_DiffSelection');
	assert.equal(session.SetDifficulty(0, 1.5), false); assert.equal(session.SetDifficulty(0, 6), false);
	session.SetDifficulty(0, 4); session.SetDifficulty(1, 2); assert.equal(session.ResolveDifficulty(), 2);
});
test('原版选人前可以投难度，进入难度阶段后保留投票并限制参战名单', () => {
	const session = prepare('team', [0, 1]);
	assert.equal(session.SetDifficulty(0, 5), true); assert.equal(session.players[0].ready, false);
	assert.equal(session.SetDifficulty(1, 3), true); assert.equal(session.SetDifficulty(2, 1), false);
	assert.equal(session.SetDifficulty(0, 0), false); assert.equal(session.SetDifficulty(0, 2.5), false);
	for (const id of [0, 1]) session.SetReady(id, true);
	session.LockParticipants(); session.Transition('GameState_DiffSelection');
	assert.equal(session.players[0].difficulty, 5); assert.equal(session.ResolveDifficulty(), 3);
	session.Transition('GameState_RunInit'); session.Transition('GameState_Battle');
	assert.equal(session.SetDifficulty(0, 1), false);
});
test('放弃需全部在线参与者确认，拒绝/超时/掉线取消投票', () => {
	const session = prepare('team', [0, 1]); battle(session);
	session.RequestVote(0, 'abandon', 0); assert.equal(session.VotePassed(1), false);
	session.RespondVote(1, false, 1, session.vote.id); assert.equal(session.vote, undefined);
	session.RequestVote(0, 'abandon', 2); session.ExpireVote(32); assert.equal(session.vote, undefined);
	session.RequestVote(0, 'abandon', 40); session.SyncPlayers([0]); assert.equal(session.vote, undefined);
	session.RequestVote(0, 'abandon', 41); assert.equal(session.VotePassed(41), true);
});
test('初始化失败只结算一次，清理完成前禁止开始新局', () => {
	const session = prepare('solo', [0]); session.SetReady(0, true); session.LockParticipants(); session.Transition('GameState_DiffSelection'); session.Transition('GameState_RunInit');
	assert.equal(session.Finish(session.runId, 'error', 'missing anchor', 0), true); session.Transition('GameState_Settle');
	assert.equal(session.Transition('GameState_Prepare'), false); session.Transition('GameState_Reset');
	assert.equal(session.Transition('GameState_Battle'), false);
});
test('阶段退出清除全部计时器和事件，晚到回调不能再次执行', () => {
	const timers = new Map(), listeners = new Map(), native = new Map(); let id = 0, calls = 0;
	const { CGameStateBase } = load('class/game_state_class', {
		GameRules: { GetGameTime: () => 100 }, tostring: String,
		Timer: { Timer: (_time, fn) => { const key = String(++id); timers.set(key, fn); return key; }, GameTimer: (_time, fn) => { const key = String(++id); timers.set(key, fn); return key; }, StopTimer: key => timers.delete(key) },
		Event: { Register: (_name, fn) => { const key = ++id; listeners.set(key, fn); return key; }, Unregister: key => listeners.delete(key) },
		ListenToGameEvent: (_name, fn) => { const key = ++id; native.set(key, fn); return key; }, StopListeningToGameEvent: key => native.delete(key),
	});
	for (let round = 0; round < 6; round++) {
		const state = new CGameStateBase(); state.StartThink(1, () => calls++); state.StartThink(1, () => calls++, true);
		const eventID = state.Register('test', () => calls++); assert.equal(listeners.has(eventID), true);
		state.Listen('entity_killed', () => calls++);
		const stale = [...timers.values(), ...listeners.values(), ...native.values()]; state.dispose(); state.dispose(); stale.forEach(fn => fn({}));
		assert.equal(timers.size, 0); assert.equal(listeners.size, 0); assert.equal(native.size, 0); assert.equal(calls, 0);
	}
});
test('波次备战、分批刷怪、死亡清空后推进，只完成一次且 Stop 后不刷怪', () => {
	let nextID = 0, completed = 0; const alive = new Set(), events = [];
	const runner = new RoundRunner([{ number: 1, prepare: 2, spawners: [{ unit: 'creep', anchor: 'spawn', total: 3, batch: 2, interval: 1, wait: 0 }] }], {
		Spawn: () => { const id = ++nextID; alive.add(id); return id; }, IsAlive: id => alive.has(id), Publish: (_round, stage) => events.push(stage), Complete: () => completed++,
	});
	runner.Start(0); runner.Tick(1); assert.equal(nextID, 0); runner.Tick(2); assert.equal(nextID, 2);
	runner.Tick(2.5); assert.equal(nextID, 2); runner.Tick(3); assert.equal(nextID, 3); assert.equal(completed, 0);
	alive.clear(); runner.Tick(4); runner.Tick(5); runner.Tick(6); assert.equal(completed, 1); assert.deepEqual(events, ['prepare', 'battle', 'end']);
	runner.Start(10); runner.Stop(); runner.Tick(100); assert.equal(nextID, 3);
});
test('精英替换按刷怪点与每批配额限制，开波音效只播放一次', () => {
	const spawned = [], sounds = [], batchSounds = [];
	const { RoundRunner } = loadWaves({
		...waveGlobals, Game: { EachPlayer: fn => fn(0) }, PlayerResource: { GetPlayer: () => ({}) }, IsValid: Boolean,
		EmitSoundOnClient: sound => sounds.push(sound), EmitGlobalSound: sound => batchSounds.push(sound),
	});
	const runner = new RoundRunner([{ number: 4, prepare: 0, sound: 'round_sound', spawners: [{ unit: 'wave_4', anchor: 'spawn', total: 7, batch: 3, interval: 1, wait: 0, championChance: 100, championMax: 3, championIntervalMax: 1 }] }], {
		Spawn: (_spawner, champion, round) => { assert.equal(round, 4); spawned.push(champion); return spawned.length; }, IsAlive: () => true, Publish() {}, Complete() {},
	});
	runner.Start(0); runner.Tick(0); runner.Tick(1); runner.Tick(2); runner.Tick(3);
	assert.deepEqual(spawned, [true, false, false, true, false, false, true]);
	assert.deepEqual(sounds, ['round_sound']); assert.equal(batchSounds.length, 3);
});
test('延迟开波仍从实际开始计算 WaitForTime，等待下一批时不能误判清空', () => {
	let count = 0; const stages = [];
	const runner = new RoundRunner([{ number: 1, prepare: 2, spawners: [{ unit: 'creep', anchor: 'spawn', total: 2, batch: 1, interval: 5, wait: 3 }] }], {
		Spawn: () => ++count, IsAlive: () => false, Publish: (_round, stage) => stages.push(stage), Complete() {},
	});
	runner.Start(0); runner.Tick(10); runner.Tick(12); assert.equal(count, 0);
	runner.Tick(13); runner.Tick(17); assert.equal(count, 1); assert.deepEqual(stages, ['prepare', 'battle']);
	runner.Tick(18); assert.equal(count, 2); assert.deepEqual(stages, ['prepare', 'battle', 'end']);
});
test('预载普通怪与精英去重，停止后的预载完成不能卸载地图 spawn group', () => {
	const callbacks = [], names = [], unloaded = [];
	const { RoundRunner } = loadWaves({ ...waveGlobals,
		PrecacheUnitByNameAsync: (name, fn) => { names.push(name); callbacks.push(fn); }, UnloadSpawnGroupByHandle: id => unloaded.push(id),
	});
	const spawn = { unit: 'creep', championUnit: 'elite', anchor: 'spawn', total: 1, batch: 1, interval: 1, wait: 0 };
	const runner = new RoundRunner([{ number: 1, prepare: 10, spawners: [spawn, spawn] }], { Spawn() {}, IsAlive() {}, Publish() {}, Complete() {} });
	runner.Start(0); assert.deepEqual(names, ['creep', 'elite']); callbacks[0](2);
	runner.Stop(); callbacks[1](2); runner.Tick(100); assert.deepEqual(unloaded, []);
});
test('刷怪保留精英单位、等级、朝向路径和零赏金，属性交给对应 modifier', () => {
	const created = [], tracked = []; let rolled = false;
	const anchor = { GetAbsOrigin: () => 'position', GetForwardVector: () => 'forward' };
	function entity(name) {
		const unit = { name, levels: [], buffs: [], engineMaxWrites: 0, entindex: () => 1, IsCreature: () => true, GetLevel: () => 1,
			CreatureLevelUp(n) { this.levels.push(n); }, SetChampion(value) { this.champion = value; }, GetModelScale: () => 1,
			SetModelScale(value) { this.scale = value; }, GetMaxMana_Engine: () => 10,
			SetForwardVector(value) { this.forward = value; }, SetRequiresReachingEndPath(value) { this.reach = value; },
			SetInitialGoalEntity(value) { this.goal = value; }, SetMustReachEachGoalEntity(value) { this.must = value; },
			SetDeathXP(value) { this.xp = value; }, SetMaximumGoldBounty(value) { this.goldMax = value; }, SetMinimumGoldBounty(value) { this.goldMin = value; },
			AddNewModifier(_caster, _ability, buff) { this.buffs.push(buff); },
			GetMaxHealth: () => 100,
			SetBaseMaxHealth() { this.engineMaxWrites++; }, SetMaxHealth() { this.engineMaxWrites++; }, SetHealth(value) { this.health = value; },
			SetBaseDamageMin(value) { this.attack = value; }, SetBaseDamageMax() {}, SetPhysicalArmorBaseValue(value) { this.armor = value; }, SetMaxMana() {}, SetMana() {},
		}; created.push(unit); return unit;
	}
	const { SpawnWaveUnit } = loadWaves({
		Entities: { FindByName: () => anchor }, IsValid: Boolean, CreateUnitByName: entity, DOTATeam_t: { DOTA_TEAM_BADGUYS: 3, DOTA_TEAM_GOODGUYS: 2 },
		GameRules: { GetCustomGameDifficulty: () => 4 }, RandomFloat: () => 1, RollPercentage: () => rolled,
		tonumber: value => value === undefined ? undefined : Number(value), math: { max: Math.max },
		PropertySystem: { AddStaticProperty() { assert.fail('刷怪函数不应手动初始化基础属性'); } },
		LargeNumberHealth: { Refresh() { assert.fail('生命同步应交给公共 modifier'); } },
		KeyValues: { units: { wave_4: { CustomStatusHealth: 100, AttackDamage: 10, Armor: 2 }, elite_4: { CustomStatusHealth: 200, AttackDamage: 20, Armor: 3, DamageReduction: 5 } } },
	});
	const spawn = { unit: 'wave_4', anchor: 'spawn', championUnit: 'elite_4', level: 3, championLevel: 2 };
	const unit = SpawnWaveUnit(spawn, true, 4, 7, value => tracked.push(value));
	assert.equal(unit.name, 'elite_4'); assert.equal(tracked[0], unit); assert.deepEqual(unit.levels, [2, 2]); assert.equal(unit.champion, true);
	assert.equal(unit.attack, undefined); assert.equal(unit.health, undefined); assert.equal(unit.engineMaxWrites, 0);
	assert.equal(unit.forward, 'forward'); assert.equal(unit.goal, anchor); assert.equal(unit.reach, true); assert.equal(unit.must, false);
	assert.equal(unit.xp, 0); assert.equal(unit.goldMin, 0); assert.equal(unit.goldMax, 0); assert.deepEqual(unit.buffs, ['modifier_enemy_scaling', 'modifier_champion']);
	rolled = true;
	const elite = SpawnWaveUnit({ ...spawn, championUnit: undefined }, false, 4, 7, () => {});
	assert.deepEqual(elite.buffs, ['modifier_enemy_scaling', 'modifier_wave', 'modifier_elite']); assert.equal(elite.engineMaxWrites, 0); assert.equal(elite.iRoundNumber, 4);
});
/** 用虚拟引擎调度实际阶段与控制器，验证阶段代码而不只验证规则模型。 */
function controllerFixture(mode = 'solo') {
	let now = 0, nextTimer = 0, controller;
	const timers = new Map(), events = [], actions = new Map();
	const online = mode === 'solo' ? [0] : [0, 1], teams = new Map();
	const stateProxy = new Proxy({}, { get: (_target, key) => typeof controller?.[key] === 'function' ? controller[key].bind(controller) : controller?.[key] });
	const timer = (interval, fn) => { const id = String(++nextTimer); timers.set(id, { fn, due: now + interval }); return id; };
	const world = { starts: 0, cleanups: 0, failInit: false, failCleanup: false, failModuleCleanup: false, previewed: [],
		PreparePlayers(ids) { this.previewed = [...ids]; },
		Initialize() { if (this.failInit) throw new Error('missing map anchor'); },
		StartBattle(scope) { this.starts++; scope.StartThink(1, () => 1); }, Freeze() {},
		Cleanup() { this.cleanups++; if (this.failCleanup) throw new Error('cleanup failed'); },
	};
	class Module { print() {} error() {} }
	const globals = {
		CModule: Module, GameState: stateProxy, tostring: String, GetMapName: () => mode, IsInToolsMode: () => false,
		math: { max: Math.max }, tonumber: Number, RandomInt: (_min, max) => max, Time: () => now, GameRules: { GetGameTime: () => now, State_Get: () => 7 },
		DOTA_GameState: { DOTA_GAMERULES_STATE_GAME_IN_PROGRESS: 7 }, DOTAConnectionState_t: { DOTA_CONNECTION_STATE_CONNECTED: 2 },
		DOTATeam_t: { DOTA_TEAM_GOODGUYS: 2 },
		Game: { EachPlayer: fn => online.forEach(fn), SetGameResult() {} }, PlayerResource: { GetConnectionState: () => 2, GetTeam: id => teams.get(id) ?? 2 },
		Login: { IsAllLoginState: () => true, IsPlayerRequiredLoginCompleted: () => true }, KeyValues: { heroes: { npc_dota_hero_axe: { IsHero: '1' }, npc_dota_hero_lina: { IsHero: '1' }, npc_dota_hero_hidden: { IsHero: '1', UnitLabel: 'hide' } } },
		Timer: { Timer: timer, GameTimer: timer, StopTimer: id => timers.delete(id) },
		Event: { Fire: name => { events.push(name); if (name === 'game_reset' && world.failModuleCleanup) return [{ error: 'module cleanup failed' }]; }, Register: () => ++nextTimer, Unregister() {} },
		CustomUIEvent: (name, fn, context) => actions.set(name, data => fn.call(context, data)), CustomNetTables: { SetNetData() {} },
	};
	const imports = { '../class/game_state_class': load('class/game_state_class', globals), '../lib/tstl-utils': { reloadable: value => value }, '../class/run_session': { RunSession }, '../mechanics/athena_run_world': { AthenaRunWorld: class { constructor() { return world; } } } };
	for (const name of ['Login', 'Prepare', 'DiffSelection', 'RunInit', 'Battle', 'Settle', 'Reset']) imports['../game_states/GameState_' + name] = load('game_states/GameState_' + name, globals, imports);
	const { CGameState } = load('framework/game_state', globals, imports); controller = new CGameState(); controller.init(false);
	function advance(seconds) {
		const end = now + seconds;
		for (let limit = 0; limit < 1000; limit++) {
			const due = [...timers.entries()].filter(([, value]) => value.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
			if (!due) { now = end; return; }
			const [id, value] = due; now = value.due;
			const interval = value.fn();
			if (timers.get(id) === value) { if (typeof interval === 'number') value.due = now + Math.max(interval, 0.001); else timers.delete(id); }
		}
		throw new Error('scheduler did not converge');
	}
	function action(id, value) { const session = controller.GetSession(); actions.get('athena_game_action')({ PlayerID: id, run_id: session.runId, state_version: session.version, vote_id: session.vote?.id, ...value }); }
	return { controller, world, events, timers, online, teams, advance, action };
}
test('实际控制器与阶段连续开三局，不重复登录、game_start/game_end 或常驻计时器', () => {
	for (const mode of ['solo', 'team']) {
		const f = controllerFixture(mode); f.advance(0.5); assert.equal(f.controller.GetStateName(), 'GameState_Prepare');
		for (const outcome of ['victory', 'defeat', 'abandoned']) {
			for (const id of f.online) f.action(id, { action: 'ready', ready: true });
			f.advance(0);
			assert.equal(f.controller.GetStateName(), 'GameState_Battle'); const runId = f.controller.GetSession().runId;
			f.controller.FinishRun(runId, outcome, 'test'); f.controller.FinishRun(runId, outcome, 'duplicate');
			assert.equal(f.controller.GetStateName(), 'GameState_Settle'); assert.equal(f.timers.size, 1);
			f.action(f.online[0], { action: 'replay' }); for (const id of f.online.slice(1)) f.action(id, { action: 'accept' });
			f.advance(0); assert.equal(f.controller.GetStateName(), 'GameState_Prepare'); assert.equal(f.timers.size, 2);
			f.controller.FinishRun(runId, 'victory', 'late callback'); assert.equal(f.controller.GetStateName(), 'GameState_Prepare');
		}
		assert.equal(f.world.starts, 3); assert.equal(f.world.cleanups, 3);
		assert.equal(f.events.filter(name => name === 'game_start').length, 3); assert.equal(f.events.filter(name => name === 'game_end').length, 3);
	}
});
test('真实阶段初始化失败进入错误结算；清理失败停在 Reset，重试后恢复', () => {
	const f = controllerFixture(); f.world.failInit = true; f.advance(0.5); f.action(0, { action: 'ready', ready: true }); f.advance(30);
	assert.equal(f.controller.GetStateName(), 'GameState_Settle'); assert.equal(f.controller.GetSession().result.outcome, 'error'); assert.equal(f.world.starts, 0);
	f.world.failCleanup = true; f.action(0, { action: 'replay' }); f.advance(0); assert.equal(f.controller.GetStateName(), 'GameState_Reset');
	f.action(0, { action: 'ready', ready: true }); assert.equal(f.controller.GetStateName(), 'GameState_Reset');
	f.world.failCleanup = false; f.action(0, { action: 'retry_cleanup' }); f.advance(0); assert.equal(f.controller.GetStateName(), 'GameState_Prepare');
});
test('玩法模块重置失败不能进入下一局，重试成功后才继续清理世界', () => {
	const f = controllerFixture(); f.advance(0.5); f.advance(30); assert.equal(f.controller.GetStateName(), 'GameState_Battle');
	f.controller.FinishRun(1, 'defeat', 'test'); f.world.failModuleCleanup = true; f.action(0, { action: 'replay' });
	assert.equal(f.controller.GetStateName(), 'GameState_Reset'); assert.equal(f.world.cleanups, 0);
	f.world.failModuleCleanup = false; f.action(0, { action: 'retry_cleanup' }); f.advance(0);
	assert.equal(f.controller.GetStateName(), 'GameState_Prepare'); assert.equal(f.world.cleanups, 1);
});
test('世界与波次模块独立持有实体；Event 结算、重置清理刷怪，旧回调失效', () => {
	let nextEntity = 0, now = 0, nextID = 0; const entities = new Map(), selected = new Map(), native = new Map(), internal = new Map(), timers = new Map(), resets = [], netClears = [], safeRemovals = [], gold = new Map();
	const player = { valid: true, SetSelectedHero(name) { this.heroName = name; }, SetAssignedHeroEntity(hero) { selected.set(0, hero); } };
	function entity(name) {
		const unit = { id: ++nextEntity, name, valid: true, alive: true, owner: undefined,
			entindex() { return this.id; }, IsAlive() { return this.alive; }, GetUnitName() { return this.name; }, GetOwnerEntity() { return this.owner; }, GetTeamNumber: () => 3,
			GetAbsOrigin() { return [0, 0, 0]; }, GetForwardVector() { return [1, 0, 0]; }, SetForwardVector() {},
			IsRealHero() { return ['hero_a', 'placeholder'].includes(this.name) || this.name.startsWith('npc_dota_hero_'); },
			IsCreature() { return !this.IsRealHero(); }, GetLevel() { return 1; }, CreatureLevelUp() {}, SetChampion() {}, SetRequiresReachingEndPath() {}, SetInitialGoalEntity() {}, SetMustReachEachGoalEntity() {},
			GetMaxHealth() { return 1000; }, SetDeathXP() {}, SetMaximumGoldBounty() {}, SetMinimumGoldBounty() {},
			SetPlayerID(id) { this.playerID = id; }, SetOwner(owner) { this.owner = owner; }, SetControllableByPlayer(id) { this.controller = id; },
			SafeRemoveUnit() { assert.equal(this.removing, undefined, '旧英雄不能重复清理'); this.removing = true; this.alive = false; safeRemovals.push(() => { this.valid = false; }); },
			GetMaxHealth_Engine() { return 1000; }, GetAttackDamage_Engine() { return 10; }, GetMaxMana_Engine() { return 100; },
			SetBaseMaxHealth() {}, SetMaxHealth() {}, SetHealth() {}, SetBaseDamageMin() {}, SetBaseDamageMax() {}, SetMaxMana() {}, SetMana() {}, SetPhysicalArmorBaseValue() {}, MoveToTargetToAttack() {}, Stop() {}, AddNewModifier() {}, RemoveModifierByName() {},
		}; entities.set(unit.id, unit); return unit;
	}
	const anchor = entity('athena_anchor'), unrelated = entity('map_decoration'); selected.set(0, entity('placeholder'));
	const globals = {
		...waveGlobals, RandomFloat: min => min, LargeNumberHealth: { Refresh: () => false },
		GameRules: { GetGameTime: () => now, IsGamePaused: () => false, SetCustomGameDifficulty() {}, GetCustomGameDifficulty: () => 2 }, math: { max: Math.max }, tonumber: value => value === undefined ? undefined : Number(value), tostring: String,
		IsValid: unit => !!unit?.valid, Entities: { FindByName: () => anchor }, DOTA_TEAM_GOODGUYS: 2, DOTATeam_t: { DOTA_TEAM_GOODGUYS: 2, DOTA_TEAM_BADGUYS: 3 },
		CreateUnitByName: (name, _position, _clear, owner) => {
			if (name === 'hero_a' || name.startsWith('npc_dota_hero_')) {
				assert.equal(selected.get(0).removing, true, '创建新英雄前应安全清理旧英雄'); assert.equal(owner, player);
			}
			return entity(name);
		}, EntIndexToHScript: id => entities.get(id), UTIL_Remove: unit => { assert.equal(unit.IsRealHero(), false, '英雄不能直接 UTIL_Remove'); unit.valid = false; unit.alive = false; },
		PlayerResource: { GetSelectedHeroEntity: id => selected.get(id), GetPlayer: () => player, SetGold: (id, value, reliable) => gold.set(`${id}:${reliable}`, value), ReplaceHeroWith: () => { throw new Error('更换英雄应使用 c1 的创建与绑定流程'); } },
		PropertySystem: { AddStaticProperty() {}, CleanupUnitPropertiesByIndex: id => { resets.push('properties'); assert.notEqual(id, unrelated.id); }, ClearDynamicPropertyCache() {} }, StateSystem: { CleanupUnitStatesByIndex: () => resets.push('states') },
		AbilityUpgrade: { CleanupUnitUpgrades: () => resets.push('upgrades') }, PropertyScope: { PLAYER: 1 }, DamageCounter: { reset: () => resets.push('damage') }, UnitManager: { reset: () => resets.push('units') }, Bullet: { reset: () => resets.push('bullets') },
		Game: { SetGameResult() {}, ResetRunState() {} }, GameState: { FinishRun() {}, GetSession: () => session }, DataRecord: { reset: () => resets.push('match-data') },
		CustomNetTables: { SetNetData: (_table, key, value) => { if (value === undefined) netClears.push(key); } },
		Event: {
			Register: (name, callback, context) => { const id = ++nextID; internal.set(id, { name, callback, context }); return id; }, Unregister: id => internal.delete(id),
			UnregisterContext: context => { for (const [id, listener] of internal) if (listener.context === context) internal.delete(id); },
			Fire: (name, data) => {
				const errors = [];
				for (const listener of [...internal.values()].reverse()) if (listener.name === name) {
					try { listener.callback.call(listener.context, data); } catch (error) { errors.push({ error: String(error) }); }
				}
				return errors.length ? errors : undefined;
			},
		},
		ListenToGameEvent: (_name, callback) => { const id = ++nextID; native.set(id, callback); return id; }, StopListeningToGameEvent: id => native.delete(id),
		Timer: { GameTimer: (_delay, callback) => { const id = String(++nextID); timers.set(id, callback); return id; }, StopTimer: id => timers.delete(id) },
		KeyValues: { units: { athena: { CustomStatusHealth: '20' }, creep: {} }, heroes: { hero_a: {} } },
		LoadKeyValues: file => file.includes('spawner_group') ? { group: { unit: { NPCName: 'creep', SpawnerName: 'spawn', TotalUnitsToSpawn: '1', UnitsPerSpawn: '1', SpawnInterval: '1' } } } : { round: { RoundNumber: '1', PrepareRoundTime: '0', SpawnerGroupID: 'group' } },
	};
	const { CGameStateBase } = load('class/game_state_class', globals);
	const { CWaveSpawner } = loadWaves(globals);
	const waveModule = new CWaveSpawner(); waveModule.init(false);
	const { AthenaRunWorld } = load('mechanics/athena_run_world', globals);
	const session = prepare('solo', [0]); battle(session); const world = new AthenaRunWorld(); world.Initialize(session);
	const firstHero = selected.get(0), scope = new CGameStateBase(); world.StartBattle(scope);
	assert.equal(timers.size, 0, 'world 不应创建波次计时器');
	globals.Event.Fire('game_start', { runId: session.runId });
	globals.Event.Fire('game_start', { runId: session.runId }); assert.equal(timers.size, 1, '重复开局事件不能重复刷怪');
	waveModule.init(true); assert.equal(internal.size, 6, '热重载只保留模块五个监听与世界一个监听'); assert.equal(timers.size, 1);
	assert.equal(firstHero.playerID, 0); assert.equal(firstHero.controller, 0); assert.equal(firstHero.owner, player); assert.equal(player.heroName, 'hero_a');
	assert.equal(gold.get('0:true'), 200); assert.equal(gold.get('0:false'), 0);
	let customResource = 1; world.Own(session.runId, () => customResource--);
	now = 1; [...timers.values()].forEach(fn => fn());
	const owned = [...entities.values()].filter(unit => ['athena', 'creep'].includes(unit.name));
	assert.equal(owned.length, 2);
	const creep = owned.find(unit => unit.name === 'creep'), summon = entity('enemy_summon'); summon.owner = creep;
	globals.Event.Fire('npc_spawned', { unit: summon });
	const stale = [...timers.values(), ...native.values()]; scope.dispose();
	session.state = 'GameState_Settle'; globals.Event.Fire('game_end', { run_id: session.runId }); assert.equal(timers.size, 0);
	world.Cleanup(); world.Cleanup(); assert.equal(creep.valid, true, 'world 不能越权清理波次模块实体');
	assert.equal(globals.Event.Fire('game_reset', { runId: session.runId }), undefined);
	globals.Event.Fire('game_reset', { runId: session.runId }); assert.equal(summon.valid, false);
	assert.equal(firstHero.removing, true); assert.equal(firstHero.valid, true, '安全移除应延迟释放实体');
	for (const remove of safeRemovals) remove();
	assert.equal(firstHero.valid, false); assert.equal(selected.get(0).valid, true); assert.equal(selected.get(0).controller, 0);
	assert.equal(player.heroName, 'hero_a', '待命英雄沿用已加载的本局英雄，不引入未预载的其他英雄和饰品'); assert.equal(gold.get('0:true'), 0); assert.equal(gold.get('0:false'), 0);
	assert.equal(unrelated.valid, true); assert.equal(anchor.valid, true); assert.ok(owned.every(unit => !unit.valid));
	const count = nextEntity; stale.forEach(fn => fn({ entindex_killed: owned[0].id })); assert.equal(nextEntity, count);
	assert.equal(timers.size, 0); assert.equal(native.size, 0); assert.equal(internal.size, 5, '玩法模块的生命周期监听应常驻');
	assert.equal(customResource, 0);
	const lateUnit = entity('late_old_run'); world.TrackUnit(lateUnit, session.runId - 1); assert.equal(lateUnit.valid, false);
	const lateSameRun = entity('late_after_cleanup'); world.TrackUnit(lateSameRun, session.runId); assert.equal(lateSameRun.valid, false);
	assert.ok(netClears.includes('round_state')); assert.ok(resets.includes('properties')); assert.ok(resets.includes('states')); assert.ok(resets.includes('upgrades'));
	assert.ok(resets.includes('match-data'));
	// 同一常驻模块连续处理新局，旧局结束/重置事件和晚到计时器不能影响新局。
	for (let round = 0; round < 3; round++) {
		const oldRunId = session.runId; session.runId++; session.state = 'GameState_Battle';
		globals.Event.Fire('game_start', { runId: oldRunId }); assert.equal(timers.size, 0);
		globals.Event.Fire('game_start', { runId: session.runId }); assert.equal(timers.size, 1);
		globals.Event.Fire('game_end', { run_id: oldRunId }); globals.Event.Fire('game_reset', { runId: oldRunId }); assert.equal(timers.size, 1);
		now++; [...timers.values()].forEach(fn => fn()); const oldTick = [...timers.values()][0];
		const lastCreep = [...entities.values()].filter(unit => unit.name === 'creep' && unit.valid); assert.equal(lastCreep.length, 1);
		session.state = 'GameState_Settle'; globals.Event.Fire('game_end', { run_id: session.runId }); assert.equal(timers.size, 0);
		globals.Event.Fire('game_reset', { runId: session.runId }); assert.equal(lastCreep[0].valid, false);
		const count = nextEntity; oldTick(); assert.equal(nextEntity, count); assert.equal(internal.size, 5);
	}
});
test('上一轮投票的晚到同意不能通过新一轮投票', () => {
	const session = prepare('team', [0, 1]); battle(session); session.RequestVote(0, 'abandon', 0);
	const oldVote = session.vote.id; session.RespondVote(1, false, 1, oldVote); session.RequestVote(0, 'abandon', 2);
	assert.equal(session.RespondVote(1, true, 3, oldVote), false); assert.equal(session.VotePassed(3), false);
});
test('定时波次超时后停止刷怪并清理存活怪物', () => {
	let spawned = 0, ended = 0; const cleared = [];
	const runner = new RoundRunner([{ number: 1, prepare: 0, duration: 2, spawners: [{ unit: 'creep', anchor: 'spawn', total: 10, batch: 1, interval: 5, wait: 0 }] }], {
		Spawn: () => ++spawned, IsAlive: () => true, Publish() {}, Clear: ids => cleared.push(...ids), Complete: () => ended++,
	});
	runner.Start(0); runner.Tick(0); runner.Tick(2); runner.Tick(3);
	assert.equal(spawned, 1); assert.deepEqual(cleared, [1]); assert.equal(ended, 1);
});
test('中途连接者的英雄保持待命，不能通过准备请求加入当前局', () => {
	const f = controllerFixture('team'); f.advance(0.5); f.action(0, { action: 'ready', ready: true }); f.action(1, { action: 'ready', ready: true }); f.advance(30);
	f.online.push(2); f.advance(0.5); assert.ok(f.world.previewed.includes(2));
	f.action(2, { action: 'ready', ready: true }); assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.equal(f.controller.GetSession().participants.includes(2), false);
});
test('真实波次 KV 的单位和 solo/team 地图刷怪锚点完整', () => {
	const { parseKV } = require('./kv-parser');
	const npcRoot = path.join(root, 'game/athena_tsbuild/scripts/npc');
	const read = file => { const full = path.join(npcRoot, file); return parseKV(fs.readFileSync(full, 'utf8'), full).data; };
	const rounds = read('kv/gameplay/round.kv'), groups = read('kv/gameplay/spawner_group.kv'), units = read('npc_units_custom.txt');
	const anchors = new Set(['athena']); let waves = 0;
	for (const round of Object.values(rounds)) {
		if (!round || typeof round !== 'object') continue;
		const group = groups[round.SpawnerGroupID]; assert.ok(group, 'missing spawner group'); waves++;
		for (const spawn of Object.values(group)) if (spawn && typeof spawn === 'object' && spawn.NPCName) {
			assert.ok(units[spawn.NPCName], 'missing unit ' + spawn.NPCName); anchors.add(spawn.SpawnerName);
			if (spawn.ChampionNPCName) assert.ok(units[spawn.ChampionNPCName], 'missing champion ' + spawn.ChampionNPCName);
		}
	}
	assert.equal(waves, 38);
	const { LoadWaves, RoundRunner } = loadWaves({
		...waveGlobals, LoadKeyValues: file => file.includes('spawner_group') ? groups : rounds,
		KeyValues: { units }, Entities: { FindByName: name => ({ name }) }, IsValid: Boolean,
		tostring: String, tonumber: value => value === undefined ? undefined : Number(value), math: { max: Math.max },
		Game: { EachPlayer() {} },
	});
	const definitions = LoadWaves(); assert.equal(definitions.length, 38);
	let created = 0, champions = 0, completed = 0; const started = [];
	const runner = new RoundRunner(definitions, {
		Spawn: (_spawn, champion) => { created++; if (champion) champions++; return created; }, IsAlive: () => false,
		Publish: (number, stage) => { if (stage === 'battle') started.push(number); }, Complete: () => completed++,
	});
	runner.Start(0);
	for (let now = 0; now < 10000 && !completed; now++) runner.Tick(now);
	assert.equal(completed, 1); assert.deepEqual(started, Array.from({ length: 38 }, (_, i) => i + 1));
	const configs = Object.values(groups).flatMap(group => Object.values(group).filter(value => value && typeof value === 'object' && value.NPCName));
	assert.equal(created, configs.reduce((sum, spawn) => sum + Number(spawn.TotalUnitsToSpawn), 0));
	assert.equal(champions, configs.filter(spawn => Number(spawn.ChampionChance) === 100).length);
	assert.ok(definitions.every(wave => wave.prepare === 120));
	for (const name of ['solo', 'team']) {
		const map = fs.readFileSync(path.join(root, 'content/athena_tsbuild/maps', name + '.vmap'));
		for (const anchor of anchors) assert.ok(map.includes(Buffer.from(anchor + '\0')), `${name} lacks ${anchor}`);
	}
});
test('定时波次使用原版 TimedRoundDuration，未配置时默认 60 秒', () => {
	let duration = '12';
	const { LoadWaves } = loadWaves({
		LoadKeyValues: file => file.includes('spawner_group') ? { group: { unit: { NPCName: 'creep', SpawnerName: 'spawn', TotalUnitsToSpawn: 1 } } } : { round: { RoundNumber: 1, SpawnerGroupID: 'group', TimedRound: 1, TimedRoundDuration: duration } },
		KeyValues: { units: { creep: {} } }, Entities: { FindByName: () => ({}) }, IsValid: Boolean,
		tostring: String, tonumber: value => value === undefined ? undefined : Number(value), math: { max: Math.max },
	});
	assert.equal(LoadWaves()[0].duration, 12); duration = undefined; assert.equal(LoadWaves()[0].duration, 60);
	duration = '-1'; assert.throws(() => LoadWaves(), /定时波次时长无效/);
});
test('观战队伍不进入准备或参战名单', () => {
	const f = controllerFixture('team'); f.online.push(2); f.teams.set(2, 1); f.advance(0.5);
	assert.equal(f.controller.GetSession().players[2], undefined);
	f.action(0, { action: 'ready', ready: true }); f.action(1, { action: 'ready', ready: true });
	f.advance(0);
	assert.equal(f.controller.GetStateName(), 'GameState_Battle');
	assert.deepEqual(Array.from(f.controller.GetSession().participants), [0, 1]);
});
test('Panorama 的 0/1 准备值正确处理，非法字符串不会准备', () => {
	const f = controllerFixture('team'); f.advance(0.5);
	f.action(0, { action: 'ready', ready: '1' }); assert.equal(f.controller.GetSession().players[0].ready, false);
	f.action(0, { action: 'ready', ready: 1 }); assert.equal(f.controller.GetSession().players[0].ready, true);
	f.action(0, { action: 'ready', ready: 0 }); assert.equal(f.controller.GetSession().players[0].ready, false);
	f.action(0, { action: 'ready', ready: 1 }); f.action(1, { action: 'ready', ready: 1 });
	f.advance(0);
	assert.equal(f.controller.GetStateName(), 'GameState_Battle');
});
test('选人立即公布 30 秒期限；到时随机未确认英雄并直接战斗，保留已确认英雄和难度', () => {
	const f = controllerFixture('team'); f.advance(0.5);
	const session = f.controller.GetSession();
	f.action(0, { action: 'select_hero', hero: 'npc_dota_hero_axe' }); f.action(0, { action: 'ready', ready: true });
	f.action(0, { action: 'difficulty', difficulty: 4 }); f.action(1, { action: 'difficulty', difficulty: 3 });
	f.advance(29.9); assert.equal(f.controller.GetStateName(), 'GameState_Prepare'); assert.equal(f.world.starts, 0);
	f.advance(0.1); assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.equal(f.world.starts, 1);
	assert.equal(session.players[0].hero, 'npc_dota_hero_axe'); assert.equal(session.players[1].hero, 'npc_dota_hero_lina');
	assert.equal(session.players[1].ready, true); assert.equal(session.difficulty, 3); assert.deepEqual(Array.from(session.participants), [0, 1]);
});
test('全员确认立即开局并保留难度，重开重新计时且旧回调失效', () => {
	const f = controllerFixture(); f.advance(0.5);
	const oldTimeout = [...f.timers.values()].find(timer => timer.due > 20).fn;
	f.action(0, { action: 'difficulty', difficulty: 5 }); f.action(0, { action: 'ready', ready: true });
	assert.equal(f.controller.GetStateName(), 'GameState_RunInit'); f.advance(0);
	assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.equal(f.controller.GetSession().difficulty, 5);
	oldTimeout(); assert.equal(f.world.starts, 1); assert.equal(f.events.filter(name => name === 'game_start').length, 1);
	f.controller.FinishRun(1, 'victory', 'test'); f.action(0, { action: 'replay' }); f.advance(0);
	assert.equal(f.controller.GetSession().runId, 2); assert.equal(f.controller.GetSession().players[0].ready, false);
	oldTimeout(); f.advance(29.9); assert.equal(f.controller.GetStateName(), 'GameState_Prepare'); assert.equal(f.world.starts, 1);
	f.advance(0.1); assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.equal(f.world.starts, 2);
});

test('多人等待最后一人确认，预览英雄不会提前开局且确认英雄保持不变', () => {
	const f = controllerFixture('team'); f.advance(0.5);
	f.action(0, { action: 'select_hero', hero: 'npc_dota_hero_lina' }); f.action(0, { action: 'difficulty', difficulty: 4 });
	f.action(1, { action: 'select_hero', hero: 'npc_dota_hero_axe' }); f.action(1, { action: 'difficulty', difficulty: 3 });
	assert.equal(f.controller.GetStateName(), 'GameState_Prepare');
	f.action(0, { action: 'ready', ready: true }); f.advance(5);
	assert.equal(f.controller.GetStateName(), 'GameState_Prepare'); assert.equal(f.world.starts, 0);
	f.action(1, { action: 'ready', ready: true });
	assert.equal(f.controller.GetStateName(), 'GameState_RunInit'); f.advance(0);
	const session = f.controller.GetSession();
	assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.equal(f.world.starts, 1);
	assert.equal(session.players[0].hero, 'npc_dota_hero_lina'); assert.equal(session.players[1].hero, 'npc_dota_hero_axe');
	assert.equal(session.difficulty, 3); assert.deepEqual(Array.from(session.participants), [0, 1]);
	f.advance(30); assert.equal(f.world.starts, 1);
});

test('未确认玩家断线后，剩余玩家全员确认即可开局', () => {
	const f = controllerFixture('team'); f.advance(0.5); f.action(0, { action: 'ready', ready: true });
	f.online.splice(1); f.advance(0.5);
	assert.equal(f.controller.GetStateName(), 'GameState_Battle');
	assert.deepEqual(Array.from(f.controller.GetSession().participants), [0]);
});
test('超时不把断线玩家加入名单；全员断线不启动空局，恢复后可开局', () => {
	const f = controllerFixture('team'); f.advance(0.5); f.online.splice(1); f.advance(30);
	assert.equal(f.controller.GetStateName(), 'GameState_Battle'); assert.deepEqual(Array.from(f.controller.GetSession().participants), [0]);
	assert.equal(f.controller.GetSession().players[1].ready, false);
	const empty = controllerFixture(); empty.advance(0.5); empty.online.length = 0; empty.advance(30);
	assert.equal(empty.controller.GetStateName(), 'GameState_Prepare'); assert.equal(empty.world.starts, 0);
	empty.online.push(0); empty.advance(1); assert.equal(empty.controller.GetStateName(), 'GameState_Battle');
});
console.log(`Passed ${passed} game session checks.`);
