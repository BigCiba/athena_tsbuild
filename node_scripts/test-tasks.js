/* 使用生产 Task/NPC 模块与真实 KV；验证事件接入、服务器校验和跨局资源隔离。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { parseKV } = require('./kv-parser');
const root = path.resolve(__dirname, '..'), source = path.join(root, 'content/athena_tsbuild/scripts/vscripts');
const npcDir = path.join(root, 'game/athena_tsbuild/scripts/npc');
const read = file => { const full = path.join(npcDir, file); return parseKV(fs.readFileSync(full, 'utf8'), full).data; };
const realTasks = read('kv/gameplay/tasks.kv'), realNPCs = read('kv/units/npc_quest.kv');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function fixture(definitions = structuredClone(realTasks)) {
	let next = 0, now = 0, tools = false, rewardHook, itemsFail = false, triggerName = '';
	const triggerHandlers = {};
	const session = { runId: 1, state: 'GameState_Battle', participants: [0, 1] };
	const timers = new Map(), listeners = new Map(), actions = new Map(), entities = new Map(), net = new Map(), dialogs = [], rewards = [], events = [], cleanup = [];
	const fire = (name, data) => {
		events.push({ name, data });
		if (name === 'task_reward' && rewardHook) rewardHook(data);
		for (const listener of [...listeners.values()].reverse()) if (listener.name === name) listener.callback.call(listener.context, data);
	};
	function unit(name, playerID = -1, team = 3) {
		const unit = { name, index: ++next, valid: true, alive: true, position: -10000, playerID, team, xp: 0, gold: 0, items: [], buffs: [],
			entindex() { return this.index; }, GetUnitName() { return this.name; }, GetPlayerOwnerID() { return this.playerID; }, GetTeamNumber() { return this.team; },
			IsAlive() { return this.alive; }, IsRealHero() { return this.name.startsWith('hero'); }, GetLevel() { return this.level ?? 1; },
			GetAbsOrigin() { return this.position; }, SetForwardVector() {}, AddNewModifier(_caster, _ability, name) { this.buffs.push(name); return { valid: true }; },
			AddExperience(amount) { this.xp += amount; }, HasRoomForItem() { return true; }, AddItem(item) { this.items.push(item); },
		}; entities.set(unit.index, unit); return unit;
	}
	const heroes = [unit('hero0', 0, 2), unit('hero1', 1, 2), unit('hero2', 2, 2)];
	const globals = {
		CModule: class { error() {} }, NPC: undefined, Task: undefined, math: Math, tostring: String, tonumber: value => value === undefined ? undefined : Number(value),
		string: { find: (text, pattern) => text.match(new RegExp(pattern)) ? [1] : [], gsub: (text) => [text.replace(/\s/g, '')] },
		IsValid: value => !!value?.valid, IsInToolsMode: () => tools, CalcDistance: (a, b) => Math.abs(a.position - b.position),
		Vector: (x, y, z) => ({ x, y, z }), DOTATeam_t: { DOTA_TEAM_GOODGUYS: 2 }, EDOTA_ModifyGold_Reason: {}, EDOTA_ModifyXP_Reason: {}, _G: {},
		thisEntity: { GetName: () => triggerName }, FindClearSpaceForUnit: (hero, position) => { hero.destination = position; },
		GameRules: { GetGameTime: () => now, ExecuteTeamPing() {} }, GameState: { GetSession: () => session, FinishRun(_run, _outcome, error) { assert.fail(error); } },
		Game: { EachPlayer: callback => heroes.forEach((_hero, id) => callback(id)) },
		PlayerResource: { GetSelectedHeroEntity: id => heroes[id], GetPlayer: id => ({ valid: true, id }), ModifyGold: (id, amount) => { heroes[id].gold += amount; } },
		KeyValues: { units: realNPCs, items: { item_zhanqi: {}, item_xiongpi: {}, item_hexin: {}, item_mirror: {}, item_yunshizhaohuan: {}, item_hero0: {}, item_hero1: {}, item_butianshi: {}, item_enchant: {} } },
		LoadKeyValues: file => file.includes('npc_quest') ? realNPCs : definitions,
		Entities: { FindByName: (_last, name) => name.startsWith('npc_') ? { valid: true, GetAbsOrigin: () => 1000, GetForwardVector: () => 1 } : undefined },
		EntIndexToHScript: id => entities.get(id), CreateUnitByName: (name, position) => { const npc = unit(name, -1, 2); npc.position = position; return npc; },
		UTIL_Remove: unit => { unit.valid = false; unit.alive = false; },
		CreateItem: name => itemsFail ? undefined : { valid: true, name }, CreateItemOnPositionSync() {},
		CustomGameEventManager: { Send_ServerToPlayer: (player, name, data) => dialogs.push({ player: player.id, name, ...data }) },
		Notification: { CombatToPlayer() {} }, ParticleManager: { CreateParticle: () => 1, DestroyParticle() {}, CreateParticleForPlayer: () => 1, SetParticleControl() {}, ReleaseParticleIndex() {} }, ParticleAttachment_t: {},
		PropertySystem: { CleanupUnitPropertiesByIndex: id => cleanup.push(id) }, StateSystem: { CleanupUnitStatesByIndex() {} }, AbilityUpgrade: { CleanupUnitUpgrades() {} },
		Event: { Register(name, callback, context) { const id = ++next; listeners.set(id, { name, callback, context }); return id; },
			UnregisterContext(context) { for (const [id, listener] of listeners) if (listener.context === context) listeners.delete(id); }, Fire: fire },
		CustomUIEvent: (name, callback, context) => actions.set(name, data => callback.call(context, data)),
		CustomNetTables: { SetTableValue: (_table, key, value) => net.set(key, JSON.parse(JSON.stringify(value))) },
		Timer: { GameTimer(delay, callback) { const id = String(++next); timers.set(id, { due: now + delay, callback }); return id; }, StopTimer: id => timers.delete(id) },
	};
	function load(file, imports = {}) {
		const module = { exports: {} };
		const code = ts.transpileModule(fs.readFileSync(path.join(source, file + '.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText;
		vm.runInNewContext(code, { module, exports: module.exports, ...globals, require: name => { if (imports[name]) return imports[name]; assert.equal(name, '../lib/tstl-utils'); return { reloadable: value => value }; } }); return module.exports;
	}
	const { CNPC } = load('framework/npc'); const npc = globals.NPC = new CNPC(); npc.init(false);
	const { CTask, TaskState } = load('mechanics/task'); const task = new CTask(); task.init(false);
	load('triggers/events', { '../lib/dota_ts_adapter': { registerEntityFunction: (name, callback) => { triggerHandlers[name] = callback; } } });
	function advance(seconds) {
		const end = now + seconds;
		for (let guard = 0; guard < 10000; guard++) {
			const pending = [...timers].filter(([, timer]) => timer.due <= end + 1e-9).sort((a, b) => a[1].due - b[1].due)[0];
			if (!pending) { now = end; return; }
			const [id, timer] = pending; now = timer.due; const again = timer.callback();
			if (timers.has(id)) { if (typeof again === 'number') timer.due = now + again; else timers.delete(id); }
		}
		assert.fail('timer did not converge');
	}
	return { task, npc, TaskState, globals, heroes, session, timers, listeners, net, dialogs, entities, events, rewards, cleanup, fire, unit, advance,
		start: () => fire('game_start', { runId: session.runId }),
		talk(id, name) { const target = [...entities.values()].find(unit => unit.name === name && unit.valid); heroes[id].position = target.position; actions.get('npc_interact')({ PlayerID: id, npc: target.index, runId: session.runId }); },
		action: (name, id, taskname, runId = session.runId) => actions.get(name)({ PlayerID: id, taskname, runId }),
		kill(id, name) { const victim = unit(name); fire('entity_killed', { victim, attacker: heroes[id] }); return victim; },
		state: (id, name) => task.GetPlayerTaskState(id, name),
		debug(id, name) { tools = true; fire('task_debug_start', { playerID: id, taskName: name }); tools = false; },
		handleRewards(fn = () => true) { rewardHook = event => { if (fn(event)) { rewards.push({ ...event }); event.handled = true; } }; },
		failItems(value = true) { itemsFail = value; },
		touch(name, id) { triggerName = name; triggerHandlers.OnStartTouch({ activator: heroes[id] }); },
	};
}
test('实际 14 个任务与 6 个 NPC 配置保持原版；solo/team 地图锚点和三种本地化完整', () => {
	assert.equal(Object.keys(realTasks).length, 14); assert.equal(Object.keys(realNPCs).length, 6);
	assert.deepEqual(fs.readFileSync(path.join(npcDir, 'kv/gameplay/tasks.kv')), fs.readFileSync('D:/Dota Addons/athena-reborn/game/athena_reborn/scripts/npc/kv/gameplay/tasks.kv'));
	for (const map of ['solo', 'team']) {
		const data = fs.readFileSync(path.join(root, 'content/athena_tsbuild/maps', map + '.vmap'));
		for (const name of Object.keys(realNPCs)) assert.ok(data.includes(Buffer.from('npc_' + name + '\0')), map + '/' + name);
	}
	for (const language of ['schinese', 'english', 'Russian']) {
		const full = path.join(root, 'game/athena_tsbuild/resource/addon_' + language + '.txt'), tokens = parseKV(fs.readFileSync(full, 'utf8'), full).data.Tokens;
		for (const name of Object.keys(realTasks).filter(name => !name.startsWith('Defense'))) assert.ok(tokens['TaskTitle_' + name], name);
	}
});
test('开局接练功任务，击杀按玩家归属和模式匹配，原生/自定义重复死亡只累计一次', () => {
	const f = fixture(); f.start(); assert.equal(f.state(0, 'KillPracticer'), 1); assert.equal(f.state(2, 'KillPracticer'), 0);
	const victim = f.kill(0, 'practicer'); f.fire('entity_killed', { victim, attacker: f.heroes[0] }); f.kill(1, 'practicer'); f.kill(2, 'practicer');
	const data = f.net.get('player_tasks'); assert.equal(data[0].tInProgress.KillPracticer.tStageProgress[1], 1); assert.equal(data[1].tInProgress.KillPracticer.tStageProgress[1], 1);
	f.debug(0, 'Defense1'); f.kill(0, 'wave_14_champion'); f.kill(0, 'wave_2'); f.kill(0, 'wave_3'); assert.equal(f.state(0, 'Defense1'), 2);
});
test('NPC 按顺序接取和交付，前置领奖后解锁下一项；重复交付不重复发奖励', () => {
	const f = fixture(); f.start(); assert.equal(f.state(0, 'KillHellBeast'), 4);
	f.talk(0, 'bounty_hunter'); assert.equal(f.state(0, 'KillKoboldLord'), 1);
	for (let i = 0; i < 3; i++) f.kill(0, 'kobold_lord'); assert.equal(f.state(0, 'KillKoboldLord'), 2);
	f.talk(0, 'bounty_hunter'); assert.equal(f.state(0, 'KillKoboldLord'), 3); assert.equal(f.heroes[0].items.length, 1); assert.equal(f.heroes[0].xp, 1500);
	f.talk(0, 'bounty_hunter'); assert.equal(f.state(0, 'KillHellBeast'), 1); assert.equal(f.heroes[0].items.length, 1);
});
test('多阶段和原版子串匹配；可重复 NPC 任务领取后重新接取', () => {
	const f = fixture(); f.handleRewards(); f.start(); f.talk(0, 'beaverknight');
	for (let i = 0; i < 4; i++) f.kill(0, 'ogre'); for (let i = 0; i < 2; i++) f.kill(0, 'boss_ogre');
	assert.equal(f.state(0, 'Beaverknight_Ogre'), 2); f.talk(0, 'beaverknight'); assert.equal(f.state(0, 'Beaverknight_Ogre'), 3);
	f.talk(0, 'beaverknight'); assert.equal(f.state(0, 'Beaverknight_Ogre'), 1); assert.equal(f.net.get('player_tasks')[0].tInProgress.Beaverknight_Ogre.tStageProgress[1], 0);
});
test('领奖失败保留完成态，NPC 再次交付可重试；客户端不能远程领取 NPC 奖励', () => {
	const f = fixture(); f.start(); f.talk(0, 'bounty_hunter');
	for (let i = 0; i < 3; i++) f.kill(0, 'kobold_lord');
	f.action('task_claim', 0, 'KillKoboldLord'); assert.equal(f.state(0, 'KillKoboldLord'), 2); assert.equal(f.heroes[0].items.length, 0);
	f.failItems(); f.talk(0, 'bounty_hunter'); assert.equal(f.state(0, 'KillKoboldLord'), 2); assert.equal(f.net.get('player_tasks')[0].rewardErrors.KillKoboldLord, 'TaskRewardFailed');
	f.failItems(false); f.talk(0, 'bounty_hunter'); assert.equal(f.state(0, 'KillKoboldLord'), 3); assert.equal(f.heroes[0].items.length, 1); assert.equal(f.heroes[0].xp, 1500);
});
test('自动领奖延迟 2 秒；奖励未接入保留完成态，重试只续发剩余奖励，练功领奖后自动再接', () => {
	const definitions = structuredClone(realTasks); definitions.KillPracticer.TaskStage[1].TaskStageCount = 1;
	const f = fixture(definitions); f.start(); f.kill(0, 'practicer'); f.advance(1.9); assert.equal(f.heroes[0].gold, 0);
	f.advance(0.1); assert.equal(f.heroes[0].gold, 1000); assert.equal(f.heroes[0].xp, 200); assert.equal(f.state(0, 'KillPracticer'), 2);
	assert.equal(f.net.get('player_tasks')[0].rewardErrors.KillPracticer, 'TaskRewardUnavailable');
	f.handleRewards(event => event.type === 'TASK_REWARD_TYPE_ATTRIBUTE'); f.action('task_claim', 0, 'KillPracticer');
	assert.equal(f.heroes[0].gold, 1000); assert.equal(f.heroes[0].xp, 200); assert.equal(f.state(0, 'KillPracticer'), 1); assert.equal(f.rewards.length, 1);
});
test('转生启动仅来自本局英雄里程碑事件；100-400 级可再次触发，500 级不触发', () => {
	const f = fixture(); f.start(); f.handleRewards();
	f.touch('hero_reborn', 0); assert.equal(f.heroes[0].destination, undefined);
	for (const level of [100, 200, 300, 400]) {
		f.fire('hero_level_up', { unit: f.heroes[0], level }); assert.equal(f.state(0, 'Reborn'), 1);
		f.touch('hero_reborn', 0); assert.equal(f.heroes[0].destination.x, 6080);
		f.fire('hero_level_up', { unit: f.heroes[0], level }); f.kill(0, 'boss_iapetos'); f.advance(2); assert.equal(f.state(0, 'Reborn'), 3);
	}
	f.fire('hero_level_up', { unit: f.heroes[0], level: 500 }); assert.equal(f.state(0, 'Reborn'), 3);
});
test('NPC 范围/生命/局号校验、旁观拒绝、放弃标签与调试权限均由服务器执行', () => {
	const f = fixture(); f.start(); const npc = [...f.entities.values()].find(unit => unit.name === 'bounty_hunter');
	f.fire('task_debug_start', { playerID: 0, taskName: 'Trial' }); assert.equal(f.state(0, 'Trial'), 0);
	f.talk(2, 'bounty_hunter'); assert.equal(f.state(2, 'KillKoboldLord'), 0);
	f.action('task_remove', 0, 'KillPracticer'); assert.equal(f.state(0, 'KillPracticer'), 1);
	f.talk(0, 'bounty_hunter'); f.action('task_remove', 0, 'KillKoboldLord', 0); assert.equal(f.state(0, 'KillKoboldLord'), 1);
	f.action('task_remove', 0, 'KillKoboldLord'); assert.equal(f.state(0, 'KillKoboldLord'), 0);
	f.heroes[0].position = npc.position + 401; f.advance(0.2); assert.equal(f.state(0, 'KillKoboldLord'), 0);
	f.heroes[0].alive = false; f.heroes[0].position = npc.position; f.advance(0.2); assert.equal(f.state(0, 'KillKoboldLord'), 0);
	f.heroes[0].alive = true; f.advance(0.2); assert.equal(f.state(0, 'KillKoboldLord'), 1);
});
test('结算取消自动领奖，重开清理 NPC/任务；热重载不重复监听，旧局回调和请求失效', () => {
	const definitions = structuredClone(realTasks); definitions.KillPracticer.TaskStage[1].TaskStageCount = 1;
	const f = fixture(definitions); f.start(); f.kill(0, 'practicer'); const callbacks = [...f.timers.values()].map(timer => timer.callback);
	const count = f.listeners.size; f.task.init(true); f.npc.init(true); assert.equal(f.listeners.size, count);
	f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); f.advance(3); assert.equal(f.heroes[0].gold, 0);
	f.fire('game_reset', { runId: 1 }); assert.deepEqual(f.net.get('player_tasks'), {}); assert.deepEqual(f.net.get('npcs'), {});
	f.session.runId = 2; f.session.state = 'GameState_Battle'; f.start(); f.fire('game_end', { run_id: 1 }); f.fire('game_reset', { runId: 1 });
	callbacks.forEach(callback => callback()); assert.equal(f.heroes[0].gold, 0); assert.equal(f.state(0, 'KillPracticer'), 1); assert.equal(f.timers.size, 1);
	assert.equal([...f.entities.values()].filter(unit => unit.valid && Object.hasOwn(realNPCs, unit.name)).length, 6);
});
console.log(`Passed ${passed} task checks.`);
