/* 执行真实资源/属性/事件模块，验证奖励归属、余额同步及跨局隔离。 */
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), ts = require('typescript');
const { fixture: attributeFixture } = require('./test-common-modifier');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function fixture(difficulty = 4) {
	const f = attributeFixture(difficulty), c = f.context, engineGold = new Map(), selected = new Map(), writes = [];
	f.session.difficulty = difficulty; f.session.participants = [0, 1];
	Object.assign(c, { RunResources: undefined, HERO_MAX_LEVEL: 500, HERO_XP_PER_LEVEL_TABLE: Array.from({ length: 500 }, (_, i) => i * 1000), EDOTA_ModifyXP_Reason: { DOTA_ModifyXP_Unspecified: 0 } });
	Object.assign(c.PlayerResource, {
		GetSelectedHeroEntity: id => selected.get(id),
		GetGold: id => (engineGold.get(id + ':true') ?? 0) + (engineGold.get(id + ':false') ?? 0),
		SetGold: (id, amount, reliable) => engineGold.set(id + ':' + reliable, amount),
		ModifyGold: (id, amount, reliable) => engineGold.set(id + ':' + reliable, (engineGold.get(id + ':' + reliable) ?? 0) + amount),
		SpendGold: (id, amount) => {
			const unreliable = engineGold.get(id + ':false') ?? 0, used = Math.min(unreliable, amount);
			engineGold.set(id + ':false', unreliable - used);
			engineGold.set(id + ':true', (engineGold.get(id + ':true') ?? 0) - (amount - used));
		},
	});
	const original = c.CustomNetTables.SetTableValue;
	c.CustomNetTables.SetTableValue = (table, key, value) => { if (key === 'run_resources') writes.push(JSON.parse(JSON.stringify(value))); original(table, key, value); };
	c.UnitAttributes.init();
	f.load('mechanics/run_resources', { '../lib/tstl-utils': { reloadable: value => value } }); c.RunResources.init();
	function fire(name, event) { const errors = c.Event.Fire(name, event); assert.ok(!errors?.length, JSON.stringify(errors)); }
	function hero(id) {
		const hero = f.unit('hero_' + f.session.runId + '_' + id, { CustomStatusHealth: 100 }, true); hero.playerID = id; hero.xp = 0;
		hero.GetCurrentXP = function () { return this.xp; };
		hero.AddExperience = function (amount) {
			const old = this.GetLevel(); this.xp = Math.min(499000, this.xp + amount * Math.max(0, 1 + this.modifiers.modifier_common.GetModifierPercentageExpRateBoost() * 0.01));
			this.level = Math.floor(this.xp / 1000) + 1;
			if (old !== this.level) fire('hero_level_up', { unit: this, old_level: old, level: this.level });
			return true;
		};
		selected.set(id, hero); f.spawn(hero); return hero;
	}
	const heroes = [hero(0), hero(1)];
	function enemy(kv = { BountyGold: 20, BountyCrystal: 3, BountyXP: 100 }, name = 'creep') { const unit = f.unit(name, kv); f.spawn(unit); return unit; }
	function kill(victim, attacker = heroes[0]) { victim.Kill(); fire('entity_killed', { victim, attacker }); }
	function property(id, key, value) { c.PropertySystem.AddStaticProperty(id, key, 'resource-test', value); }
	function snapshot() { return c.CustomNetTables.GetTableValue('common', 'run_resources'); }
	function tick(tick, runId = f.session.runId) { fire('tick_time', { runId, tick, tick_time: 1 }); }
	function start() { fire('game_start', { runId: f.session.runId }); }
	return { ...f, c, heroes, hero, selected, engineGold, writes, fire, enemy, kill, property, snapshot, tick, start,
		modify: (id, kind, amount, runId = f.session.runId) => c.RunResources.Modify(id, kind, amount, runId) };
}
test('五档初始金币与秒收益沿用原版，重复开局/秒通知不重发', () => {
	for (let difficulty = 1; difficulty <= 5; difficulty++) {
		const f = fixture(difficulty); f.start(); const initial = [300, 200, 100, 0, 0][difficulty - 1];
		assert.equal(f.snapshot().players[0].gold, initial); assert.equal(f.snapshot().players[1].gold, initial);
		f.start(); f.tick(1); f.tick(1); assert.equal(f.snapshot().players[0].gold, initial + [9, 6, 3, 0, 0][difficulty - 1]);
	}
});
test('真实属性汇总参与基础赏金、固定金币与经验，经验增益仅交给引擎一次', () => {
	const f = fixture(); f.start();
	f.property(0, 'player_kill_gold_percentage', 50); f.property(f.heroes[0].index, 'kill_gold_flat', 7);
	f.property(0, 'player_experience_gain_percentage', 50); f.property(0, 'player_kill_score_bonus', 2);
	const enemy = f.enemy(); f.kill(enemy); f.kill(enemy);
	const player = f.snapshot().players[0]; assert.equal(player.gold, 37); assert.equal(player.crystal, 3); assert.equal(player.score, 2); assert.equal(player.experience, 150);
	assert.equal(f.snapshot().players[1].gold, 0);
	f.property(0, 'player_kill_gold_percentage', 100); f.kill(f.enemy()); assert.equal(f.snapshot().players[0].gold, 84);
});
test('召唤物及指定击杀归属发给正确参战者，旁观/友军/旧局/活单位拒绝', () => {
	const f = fixture(); f.start();
	const summon = f.enemy({}, 'summon'); summon.GetPlayerOwnerID = () => 1; summon.GetTeamNumber = () => 2;
	f.property(f.heroes[1].index, 'kill_gold_flat', 99); f.kill(f.enemy(), summon); assert.equal(f.snapshot().players[1].gold, 20);
	const assigned = f.enemy(); assigned.iKillerPlayerID = 0; f.kill(assigned, summon); assert.equal(f.snapshot().players[0].gold, 20);
	summon.GetPlayerOwnerID = () => -1; summon.GetOwnerEntity = () => f.heroes[1]; f.kill(f.enemy(), summon);
	const friendly = f.enemy(); friendly.GetTeamNumber = () => 2; f.kill(friendly);
	const alive = f.enemy(); f.fire('entity_killed', { victim: alive, attacker: f.heroes[0] });
	const old = f.enemy(); old.__resourceRunId = 0; f.kill(old);
	const observer = f.enemy({}, 'observer'); observer.GetTeamNumber = () => 2; observer.GetPlayerOwnerID = () => 2; f.kill(f.enemy(), observer);
	assert.equal(f.snapshot().players[0].gold, 20); assert.equal(f.snapshot().players[1].gold, 40);
});
test('复活允许下一次奖励；实体索引复用不继承死亡去重标记', () => {
	const f = fixture(); f.start(); const enemy = f.enemy(); f.kill(enemy); f.kill(enemy);
	enemy.SetHealth(100); f.spawn(enemy); f.kill(enemy); assert.equal(f.snapshot().players[0].gold, 40);
	const other = f.enemy(); other.index = enemy.index; f.units.set(enemy.index, other); f.kill(other); assert.equal(f.snapshot().players[0].gold, 60);
});
test('每秒金币/魂晶/荣誉与永久属性成长各算一次，结算后均停止', () => {
	const f = fixture(); f.start();
	f.heroes[0].AddPermanentAttribute('CUSTOM_ATTRIBUTE_GOLD_PER_SEC', 3);
	f.property(0, 'player_gold_per_second', 4); f.property(0, 'player_crystal_per_second', 2); f.property(0, 'player_score_per_second', 1);
	f.tick(1); f.tick(1); assert.equal(f.snapshot().players[0].gold, 7); assert.equal(f.snapshot().players[0].crystal, 2); assert.equal(f.snapshot().players[0].score, 1);
	f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); f.tick(2); f.kill(f.enemy());
	assert.equal(f.snapshot().players[0].gold, 7); assert.equal(f.snapshot().active, false);
	assert.equal(f.modify(0, 'crystal', 10), false);
});
test('资源任务奖励走同一余额入口，已处理/旧局/非法资源不重复发放', () => {
	const f = fixture(); f.start();
	for (const [name, kind] of [['GOLD', 'gold'], ['CRYSTAL', 'crystal'], ['SCORE', 'score'], ['EXP', 'experience']]) {
		const reward = { playerID: 0, taskName: 'test', type: 'TASK_REWARD_TYPE_RESOURCE', name: 'CUSTOM_RESOURCE_TYPE_' + name, amount: 100, runId: 1, handled: false };
		f.fire('task_reward', reward); f.fire('task_reward', reward); assert.equal(reward.handled, true); assert.equal(f.snapshot().players[0][kind], 100);
	}
	const stale = { playerID: 0, type: 'TASK_REWARD_TYPE_RESOURCE', name: 'CUSTOM_RESOURCE_TYPE_GOLD', amount: 10, runId: 0, handled: false };
	f.fire('task_reward', stale); assert.equal(stale.handled, false); assert.equal(f.snapshot().players[0].gold, 100);
});
test('小数赏金不会逐次丢失，扣费读取引擎余额，非法金额/透支没有副作用', () => {
	const f = fixture(); f.start(); f.property(0, 'player_kill_gold_percentage', 25);
	for (let i = 0; i < 4; i++) f.kill(f.enemy({ BountyGold: 1 })); assert.equal(f.snapshot().players[0].gold, 5);
	f.c.PlayerResource.ModifyGold(0, -3, true); assert.equal(f.modify(0, 'gold', -3), false); assert.equal(f.modify(0, 'gold', -2), true);
	for (const value of [NaN, Infinity, -Infinity]) assert.equal(f.modify(0, 'gold', value), false);
	assert.equal(f.modify(2, 'gold', 3), false); assert.equal(f.modify(0, 'experience', -1), false); assert.equal(f.modify(0, 'crystal', -1), false);
	assert.equal(f.snapshot().players[0].gold, 0);
	assert.equal(f.c.RunResources.Get(0, 'gold', 1), 0); assert.equal(f.c.RunResources.Get(0, 'gold', 0), undefined);
	f.c.PlayerResource.SetGold(0, 2, true); f.c.PlayerResource.SetGold(0, 3, false);
	assert.equal(f.modify(0, 'gold', -4), true); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 1);
	assert.equal(f.engineGold.get('0:false'), 0); assert.equal(f.engineGold.get('0:true'), 1);
});
test('终局击杀先发奖再冻结，热重载不重置/重复监听，无变化不重复写网表', () => {
	const f = fixture(); f.start(); f.c.RunResources.init(); f.c.RunResources.init();
	f.c.Event.Register('entity_killed', () => { f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: 1 }); });
	f.kill(f.enemy()); assert.equal(f.snapshot().players[0].gold, 20); assert.equal(f.snapshot().players[0].experience, 100); assert.equal(f.snapshot().active, false);
	const count = f.writes.length; f.fire('game_end', { run_id: 1 }); assert.equal(f.writes.length, count);
});
test('连续三局清零：旧英雄、旧尸体、旧时钟和旧奖励都不能写入新局', () => {
	const f = fixture(2); let previousHero, previousVictim;
	for (let runId = 1; runId <= 3; runId++) {
		f.session.runId = runId; f.session.state = 'GameState_Battle';
		if (runId > 1) { f.heroes[0] = f.hero(0); f.heroes[1] = f.hero(1); }
		f.start(); assert.equal(f.snapshot().players[0].gold, 200); assert.equal(f.snapshot().players[0].crystal, 0); assert.equal(f.snapshot().players[0].experience, 0);
		if (previousVictim) {
			f.kill(previousVictim); f.fire('npc_spawned', { unit: previousHero }); f.kill(f.enemy(), previousHero);
			f.tick(500, runId - 1); f.fire('game_end', { run_id: runId - 1 }); f.fire('game_reset', { runId: runId - 1 });
			assert.equal(f.modify(0, 'gold', 999, runId - 1), false); assert.equal(f.snapshot().players[0].gold, 200);
		}
		previousVictim = f.enemy(); previousHero = f.heroes[0]; f.kill(previousVictim);
		f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: runId }); assert.equal(f.snapshot().players[0].gold, 220);
		f.session.state = 'GameState_Reset'; f.fire('game_reset', { runId }); f.fire('game_reset', { runId });
		assert.deepEqual(Object.keys(f.snapshot().players), []); assert.equal(f.c.PlayerResource.GetGold(0), 0);
	}
});
test('引擎扣费/经验变化在下个时钟同步，经验跨级与满级展示使用实际引擎值', () => {
	const f = fixture(2); f.start(); f.c.PlayerResource.ModifyGold(0, -10, true); f.heroes[0].AddExperience(2500);
	f.tick(1); const player = f.snapshot().players[0]; assert.equal(player.gold, 196); assert.equal(player.level, 3); assert.equal(player.level_exp, 500); assert.equal(player.next_level_exp, 1000);
	f.modify(0, 'experience', 1000000); assert.equal(f.snapshot().players[0].level, 500); assert.equal(f.snapshot().players[0].next_level_exp, 0);
	f.heroes[0].AddExperience = () => { assert.fail('满级奖励不再调用引擎加经验'); };
	const reward = { playerID: 0, type: 'TASK_REWARD_TYPE_RESOURCE', name: 'CUSTOM_RESOURCE_TYPE_EXP', amount: 100, runId: 1, handled: false };
	f.fire('task_reward', reward); assert.equal(reward.handled, true);
});

// 编译并执行实际 TSX，分别改变游戏阶段与网表，确保旧局数据和旁观者不显示。
test('HUD 使用当前局当前玩家快照，结算保留结果，重开/旁观不显示旧账', () => {
	let snapshot = { run_id: 1, state: 'GameState_Battle' }, resources = { run_id: 1, players: { 0: { gold: 25, crystal: 7, score: 3, level: 2, level_exp: 10, next_level_exp: 1000 } } };
	const file = path.resolve(__dirname, '../src/components/game_lifecycle/RunResourcesPanel.tsx'), module = { exports: {} };
	const context = { module, exports: module.exports, Math, Players: { GetLocalPlayer: () => 0 }, Panel: 'Panel', Label: 'Label',
		h: (tag, props, ...children) => typeof tag === 'function' ? tag({ ...props, children }) : { tag, props, children },
		require: name => name.endsWith('.less') ? {} : name === 'solid-js' ? { Show: props => props.when ? props.children : undefined } : { useNetTable: () => () => resources } };
	vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, jsxFactory: 'h' } }).outputText, context);
	const render = () => module.exports.RunResourcesPanel({ snapshot });
	const labels = () => { const result = {}; function visit(value) { if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === 'object') { if (value.props?.id) result[value.props.id] = value.props.text; visit(value.children); } } visit(render()); return result; };
	assert.equal(labels().AthenaGold, '25'); assert.equal(labels().AthenaCrystal, '7'); assert.equal(labels().AthenaExperience, '10 / 1000');
	snapshot.state = 'GameState_Settle'; assert.equal(labels().AthenaGold, '25');
	snapshot = { run_id: 2, state: 'GameState_Battle' }; assert.equal(render(), undefined);
	resources = { run_id: 2, players: {} }; assert.equal(render(), undefined);
	resources.players[0] = { gold: 100, crystal: 0, score: 0, level: 1, level_exp: 0, next_level_exp: 1000 }; assert.equal(labels().AthenaGold, '100');
	snapshot.state = 'GameState_Prepare'; assert.equal(render(), undefined);
});
console.log(`Passed ${passed} run resource checks.`);
