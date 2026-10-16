// 在虚拟 Panorama 中执行真实 TSX 与发送接口，验证阶段权限、服务端状态和重开。
const fs = require('fs'), path = require('path'), vm = require('vm'), ts = require('typescript'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function fixture(snapshot) {
	const sent = [], cleanup = [], timers = new Map(), listeners = new Map(); let nextTimer = 0;
	const heroes = {
		npc_dota_hero_axe: { IsHero: '1', HeroID: '2', Name: '斧王', Ability1: 'axe_1', Ability2: 'generic_hidden', Ability3: 'axe_2' },
		npc_dota_hero_omniknight: { IsHero: 1, HeroID: 57, Name: '全能骑士', Ability1: 'omniknight_1' },
		npc_dota_hero_hidden: { IsHero: 1, UnitLabel: 'hide' }, npc_dota_hero_base: { IsHero: 0 },
	};
	const props = { snapshot };
	const solid = { For: p => p.each.map((item, index) => p.children(item, () => index)), createSignal: value => [() => value, next => value = next], onCleanup: fn => cleanup.push(fn) };
	const globals = {
		GameUI: { CustomUIConfig: () => ({ npc_heroes_custom: heroes }) }, Players: { GetLocalPlayer: () => 0, GetPlayerName: id => 'Player ' + id },
		Game: { GetGameTime: () => 10, GetPlayerInfo: () => ({ player_steamid: '123' }) }, $: { Localize: name => name, DispatchEvent() {} },
		GameEvents: { SendCustomEventToServer: (name, data) => sent.push({ name, ...data }) },
		CustomNetTables: { GetTableValue: (_table, key) => key === 'player_0' ? { Score: 250 } : undefined,
			SubscribeNetTableListener: (_table, fn) => { const id = listeners.size + 1; listeners.set(id, fn); return id; }, UnsubscribeNetTableListener: id => listeners.delete(id) },
		setInterval: (fn, ms) => { const id = ++nextTimer; timers.set(id, { fn, ms }); return id; }, clearInterval: id => timers.delete(id),
	};
	const tags = ['Panel', 'Label', 'Image', 'MoviePanel', 'DOTAAvatarImage', 'DOTAUserName', 'DOTAHeroImage', 'DOTAHeroMovie', 'DOTAAbilityImage', 'DOTAScenePanel', 'TabButton', 'Button'];
	for (const tag of tags) globals[tag] = tag;
	globals.h = (tag, p, ...children) => typeof tag === 'function' ? tag({ ...p, children: children.length === 1 ? children[0] : children }) : { tag, props: p ?? {}, children: children.flat(Infinity) };
	function load(file, imports) {
		const module = { exports: {} };
		const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, jsxFactory: 'h' } }).outputText;
		vm.runInNewContext(code, { ...globals, module, exports: module.exports, require: name => {
			if (name.endsWith('.less')) return {};
			if (!imports[name]) throw new Error('Unmocked import ' + name);
			return imports[name];
		} }, { filename: file });
		return module.exports;
	}
	const protocol = load('src/components/game_lifecycle/GameVote.tsx', { 'solid-js': solid, '../EOMDesign/Input/EOM_Button/EOM_Button': {} });
	const metadata = load('src/components/hero_selection/hero_preview_ids.ts', {});
	const ui = load('src/components/hero_selection/HeroSelection.tsx', { 'solid-js': solid, '../game_lifecycle/GameVote': protocol, './hero_preview_ids': metadata });
	const tree = ui.HeroSelection(props), nodes = [];
	function visit(node) { if (!node || typeof node !== 'object') return; nodes.push(node); for (const child of node.children ?? []) visit(child); }
	visit(tree);
	return { ui, metadata, heroes, props, sent, timers, listeners, nodes, dispose: () => cleanup.forEach(fn => fn()), ready: () => nodes.find(n => n.props.id === 'HeroSelectPanel'), cards: () => nodes.filter(n => n.props.class === 'HeroCard Unlock'), difficulty: () => nodes.filter(n => n.props.class?.startsWith('DiffButton ')) };
}
function snapshot(state = 'GameState_Prepare', ready = false, run = 1) {
	return { state, run_id: run, state_version: 4, mode: 'team', end_time: 25, participants: [0, 1], players: { 0: { hero: 'npc_dota_hero_axe', online: true, ready, difficulty: 2 }, 1: { hero: 'npc_dota_hero_omniknight', online: true, ready: false, difficulty: 2 } } };
}
test('沿用 reborn 可见英雄规则，技能预览过滤隐藏和空槽', () => {
	const f = fixture(snapshot());
	assert.deepEqual(Array.from(f.ui.selectableHeroes(f.heroes)), ['npc_dota_hero_axe', 'npc_dota_hero_omniknight']);
	assert.deepEqual(Array.from(f.ui.previewAbilities(f.heroes.npc_dota_hero_axe)), ['axe_1', 'axe_2']); f.dispose();
});
test('选英雄与准备携带局号和阶段版本，只发送意图，不在客户端提前锁定', () => {
	const f = fixture(snapshot()); f.cards()[1].props.onactivate(); f.ready().props.onactivate();
	assert.equal(f.sent[0].name, 'athena_game_action'); assert.equal(f.sent[0].hero, 'npc_dota_hero_omniknight');
	assert.equal(f.sent[0].run_id, 1); assert.equal(f.sent[0].state_version, 4);
	assert.equal(f.sent[1].action, 'ready'); assert.equal(f.sent[1].ready, true); assert.equal(f.props.snapshot.players[0].ready, false); f.dispose();
});
test('服务端确认选择后锁定英雄卡片与选择按钮，沿用原版文本', () => {
	const f = fixture(snapshot('GameState_Prepare', true)); assert.ok(f.cards().every(n => n.props.enabled === false));
	f.cards()[1].props.onactivate(); assert.equal(f.sent.length, 0);
	f.ready().props.onactivate(); assert.equal(f.sent.length, 0);
	assert.equal(f.ready().children[0].props.text, '#SelectHero'); f.dispose();
});
test('难度阶段只允许参战玩家投票，旧选人按钮不再发送请求', () => {
	const f = fixture(snapshot('GameState_DiffSelection')); f.difficulty()[4].props.onactivate();
	assert.equal(f.sent[0].action, 'difficulty'); assert.equal(f.sent[0].difficulty, 5);
	f.cards()[1].props.onactivate(); f.ready().props.onactivate(); assert.equal(f.sent.length, 1);
	f.props.snapshot.participants = [1]; f.difficulty()[0].props.onactivate(); assert.equal(f.sent.length, 1); f.dispose();
});
test('尚未确认英雄即可选择难度；未同步玩家不能操作', () => {
	const f = fixture(snapshot()); f.difficulty()[0].props.onactivate(); assert.equal(f.sent.length, 1); assert.equal(f.sent[0].difficulty, 1);
	f.props.snapshot.players[0].online = false; f.cards()[0].props.onactivate(); f.ready().props.onactivate(); f.difficulty()[1].props.onactivate(); assert.equal(f.sent.length, 1); f.dispose();
});
test('第二局重新挂载后恢复选人，使用新局号；销毁时清理倒计时', () => {
	const old = fixture(snapshot('GameState_DiffSelection', true)); assert.equal(old.timers.size, 1); old.dispose(); assert.equal(old.timers.size, 0);
	const f = fixture(snapshot('GameState_Prepare', false, 2)); assert.ok(f.cards().every(n => n.props.enabled));
	f.ready().props.onactivate(); assert.equal(f.sent[0].run_id, 2); assert.equal(f.sent[0].ready, true); f.dispose(); assert.equal(f.timers.size, 0); assert.equal(f.listeners.size, 0);
});
test('真实迁移 KV 包含可选英雄，预览技能均可解析', () => {
	const { parseKV } = require('./kv-parser');
	const file = path.join(root, 'game/athena_tsbuild/scripts/npc/npc_heroes_custom.txt');
	const heroes = parseKV(fs.readFileSync(file, 'utf8'), file).data;
	const abilityFile = path.join(root, 'game/athena_tsbuild/scripts/npc/npc_abilities_custom.txt');
	const abilities = parseKV(fs.readFileSync(abilityFile, 'utf8'), abilityFile).data;
	const f = fixture(snapshot()); const names = f.ui.selectableHeroes(heroes); assert.ok(names.length > 0);
	const localization = fs.readFileSync(path.join(root, 'game/athena_tsbuild/resource/addon_schinese.txt'), 'utf8');
	for (const name of names) {
		assert.ok(Number(heroes[name].HeroID ?? f.metadata.heroPreviewIDs[name]) > 0, `missing preview ID ${name}`);
		for (const ability of f.ui.previewAbilities(heroes[name])) {
			assert.ok(abilities[ability], `missing ability ${ability}`);
			assert.ok(localization.includes(`"DOTA_Tooltip_ability_${ability}"`), `missing tooltip ${ability}`);
			const texture = abilities[ability].AbilityTextureName ?? ability;
			assert.ok(fs.existsSync(path.join(root, 'game/athena_tsbuild/resource/flash3/images/spellicons', texture + '.png')), `missing icon ${texture}`);
		}
	}
	f.dispose();
});
test('模型 onload 重入不会重复初始化场景', () => {
	const f = fixture(snapshot()); let loaded = 0;
	const scene = f.nodes.find(n => n.tag === 'DOTAScenePanel');
	const panel = { SetScenePanelToLocalHero: id => { loaded++; assert.equal(id, 2); scene.props.onload(panel); } };
	scene.props.onload(panel); scene.props.onload(panel); assert.equal(loaded, 1); f.dispose();
});
test('玩家条右侧恢复原版 Score 等级徽章，无新增说明文字', () => {
	const f = fixture(snapshot());
	assert.deepEqual(f.nodes.filter(n => n.props.id === 'ProfileLevelText').map(n => n.props.text), ['25', '1']);
	assert.equal(f.ui.playerLevelFromScore(999), 99); assert.equal(f.ui.playerLevelFromScore(undefined), 1);
	assert.equal(f.nodes.filter(n => n.tag === 'DOTAUserName').length, 2);
	assert.equal(f.nodes.filter(n => n.props.class === 'PlayerHero').length, 0);
	const heroNames = Object.values(f.heroes).map(hero => hero.Name);
	assert.ok(f.nodes.filter(n => n.tag === 'Label').every(n => /^(?:#|\d)/.test(n.props.text) || heroNames.includes(n.props.text)), '显示文字应来自原版本地化、英雄名称或数值');
	f.dispose(); assert.equal(f.listeners.size, 0);
});
test('选人样式与 reborn 一致，仅组件作用域和资源路径不同', () => {
	const migrated = fs.readFileSync(path.join(root, 'src/components/hero_selection/HeroSelection.less'), 'utf8').replace(/\r\n/g, '\n');
	const prefix = '// reborn 原版样式，仅限定组件作用域并适配资源路径。\n.AthenaHeroSelection {\nwidth: 100%;\nheight: 100%;\n';
	assert.ok(migrated.startsWith(prefix)); assert.ok(migrated.endsWith('\n}\n'));
	const original = migrated.slice(prefix.length, -3).replace('custom_game/hero_selection/triangle.png', 'custom_game/triangle.png');
	assert.equal(require('crypto').createHash('sha256').update(original).digest('hex'), '071dec13e76a0a48d164fa7924eaf5f50e2611902a31f11e94345e60a93d5bfd');
});
test('未确认英雄时也显示服务端选人倒计时，确认英雄不改变剩余时间', () => {
	for (const ready of [false, true]) {
		const data = snapshot('GameState_Prepare', ready); data.end_time = 40;
		const f = fixture(data), timer = f.nodes.find(n => n.props.class === 'TimerContent');
		assert.equal(timer.children[0].props.text, '30'); f.dispose();
	}
});
console.log(`Passed ${passed} hero selection checks.`);
