/* 在虚拟 Panorama 中执行真实商店 TSX，验证请求合同、等待响应、旧局隔离及监听释放。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), ts = require('typescript');
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS ' + name); }
function fixture(networked = false) {
	const props = { snapshot: { state: 'GameState_Battle', run_id: 3 } }, sent = [], listeners = new Map(), cleanups = [], effects = [];
	let open = true;
	const tables = { shop_catalog: { run_id: 3, groups: { consumables: [{ name: 'item_salve1', currency: 'gold', price: 50, ingredients: [] }] } },
		item_inventory: { run_id: 3, players: { 0: [{ entity: 77, name: 'item_salve1', charges: 2, sellable: true, sell_gold: 100 }] } },
		run_resources: { run_id: 3, players: { 0: { gold: 100, crystal: 10, score: 20 } } } };
	if (networked) {
		tables.shop_catalog.groups.consumables = { 1: { ...tables.shop_catalog.groups.consumables[0], ingredients: { 1: 'test_material' } } };
		tables.item_inventory.players[0] = { 1: { ...tables.item_inventory.players[0][0], sellable: 1 } };
	}
	const module = { exports: {} }, solid = {
		createSignal: value => [() => value, next => value = next], createEffect: fn => effects.push(fn), onMount: fn => fn(), onCleanup: fn => cleanups.push(fn),
		For: props => props.each.map(props.children), Show: props => ({ tag: 'Show', props, children: props.children }),
	};
	const context = { module, exports: module.exports, Panel: 'Panel', Label: 'Label', Button: 'Button', DOTAItemImage: 'DOTAItemImage', Math,
		Players: { GetLocalPlayer: () => 0 }, Game: { GetGameTime: () => 60 }, $: { Localize: value => value },
		GameEvents: { SendCustomEventToServer: (name, event) => sent.push({ name, ...event }), Subscribe: (_name, fn) => { listeners.set(1, fn); return 1; }, Unsubscribe: id => listeners.delete(id) },
		h: (tag, props, ...children) => typeof tag === 'function' ? tag({ ...props, children: children.length === 1 ? children[0] : children }) : { tag, props, children },
		require: name => name.endsWith('.less') ? {} : name === 'solid-js' ? solid : name.includes('events.macro') ? { useNetTable: (_name, key) => () => tables[key] }
			: { createToggleWindowSignal: () => [() => open, value => open = value] },
	};
	const file = path.resolve(__dirname, '../src/components/shop/ShopPanel.tsx');
	vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, jsxFactory: 'h' } }).outputText, context);
	const tree = module.exports.ShopPanel(props), nodes = [];
	function visit(value) { if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === 'object') { nodes.push(value); visit(value.children); } } visit(tree);
	return { props, sent, tables, listeners, effects, nodes, buy: nodes.find(node => node.props?.class === 'ShopBuy'),
		sell: nodes.find(node => node.tag === 'Button' && node.props?.enabled === true && !node.props.class),
		reply(event) { for (const fn of listeners.values()) fn(event); }, cleanup: () => cleanups.forEach(fn => fn()), open: () => open };
}
test('购买只发送商品名、局号和请求标识，不发送客户端价格或配方', () => {
	const f = fixture(); f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	const request = f.sent[0]; assert.equal(request.name, 'athena_shop_action'); assert.equal(request.run_id, 3); assert.equal(request.item_name, 'item_salve1'); assert.equal(request.action, 'buy');
	assert.equal(Object.hasOwn(request, 'price'), false); assert.equal(Object.hasOwn(request, 'gold_cost'), false); assert.equal(Object.hasOwn(request, 'materials'), false); f.cleanup();
});
test('等待响应时拒绝重复点击；旧局/其他请求响应不会解除当前请求等待', () => {
	const f = fixture(); f.buy.props.onactivate(); const request = f.sent[0]; f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	f.reply({ run_id: 2, request_id: request.request_id, success: true }); f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	f.reply({ run_id: 3, request_id: 'other', success: true }); f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	f.reply({ run_id: 3, request_id: request.request_id, success: true }); f.buy.props.onactivate(); assert.equal(f.sent.length, 2); assert.notEqual(f.sent[0].request_id, f.sent[1].request_id); f.cleanup();
});
test('出售只发送实际物品实体；旧局目录和结算阶段不能发送交易', () => {
	const f = fixture(); f.sell.props.onactivate(); assert.equal(f.sent[0].action, 'sell'); assert.equal(f.sent[0].item_entity, 77);
	f.reply({ run_id: 3, request_id: f.sent[0].request_id, success: true });
	f.props.snapshot.run_id = 4; f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	f.props.snapshot.run_id = 3; f.props.snapshot.state = 'GameState_Settle'; f.buy.props.onactivate(); assert.equal(f.sent.length, 1);
	f.effects.forEach(fn => fn()); assert.equal(f.open(), false); f.cleanup(); assert.equal(f.listeners.size, 0);
});
test('Lua 数字键对象可以展示商品、材料和库存，不依赖网表数组的 length', () => {
	const f = fixture(true); assert.ok(f.buy); assert.ok(f.sell); f.buy.props.onactivate(); assert.equal(f.sent[0].item_name, 'item_salve1');
	assert.ok(f.nodes.some(node => node.tag === 'DOTAItemImage' && node.props.itemname === 'test_material')); f.cleanup();
});
console.log(`Passed ${passed} shop UI checks.`);
