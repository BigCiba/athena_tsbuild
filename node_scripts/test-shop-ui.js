/* 执行真实 Solid 商店 TSX，模拟 Panorama 容器与网络，覆盖交互和跨局隔离。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), ts = require('typescript'), crypto = require('node:crypto');
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS ' + name); }
function fixture(networked = false, configuredShops, configuredItems) {
 const props = { snapshot: { state: 'GameState_Battle', run_id: 3 } }, sent = [], listeners = new Map(), cleanups = [], effects = [], mounts = [], handlers = [], timers = new Map(), menus = [], orders = [], dispatched = [], errors = [], sounds = [], signals = [];
 let open = true, id = 0;
 const definitions = { item_salve1: { ItemCost: 50, ItemStackable: 1 }, item_jia_1: { ItemCost: 1000 }, item_jia_2: {}, item_jia_3: {},
  item_recipe_jia_2: { ItemCost: 2000, ItemResult: 'item_jia_2', ItemRequirements: { '01': 'item_jia_1' } },
  item_recipe_jia_3: { ItemCost: 4000, ItemResult: 'item_jia_3', ItemRequirements: { '01': 'item_jia_2' } } };
 const tables = { shop_catalog: { run_id: 3, groups: { consumables: [{ name: 'item_salve1', currency: 'gold', price: 50, ingredients: [] }], MainWeapon: [{ name: 'item_jia_1', currency: 'gold', price: 1000, ingredients: [] }],
  DefShop: [{ name: 'item_crystal', currency: 'crystal', price: 10, ingredients: [] }], PracticeShop: [{ name: 'item_score', currency: 'score', price: 20, ingredients: [] }] },
  related: { item_jia_2: { name: 'item_jia_2', currency: 'gold', price: 3000, ingredients: ['item_jia_1'] } } },
  item_inventory: { run_id: 3, players: { 0: [{ entity: 77, name: 'item_salve1', slot: 9, charges: 2, sellable: 1, sell_gold: 100 }] } },
  run_resources: { run_id: 3, players: { 0: { gold: 100, crystal: 10, score: 20 } } } };
 if (networked) {
  for (const [key, list] of Object.entries(tables.shop_catalog.groups)) tables.shop_catalog.groups[key] = Object.fromEntries(list.map((entry, i) => [i + 1, { ...entry, ingredients: Object.fromEntries(entry.ingredients.map((v, j) => [j + 1, v])) }]));
  tables.item_inventory.players[0] = { 1: tables.item_inventory.players[0][0] };
 }
 const module = { exports: {} }, solid = {
  createSignal: value => { const state = { value }; signals.push(state); return [() => state.value, next => state.value = typeof next === 'function' ? next(state.value) : next]; },
  createMemo: fn => fn, createEffect: fn => effects.push(fn), onMount: fn => mounts.push(fn), onCleanup: fn => cleanups.push(fn),
  For: p => p.each.map((value, index) => p.children(value, () => index)),
 };
 const items = () => Object.values(tables.item_inventory.players[0]);
 if (configuredItems) Object.assign(definitions, configuredItems);
 const config = { npc_items_custom: definitions, shops: configuredShops, showContextMenu: (_panel, entries) => menus.push(entries) };
 const context = { module, exports: module.exports, Math, Map, ErrorMessage: error => errors.push(error),
  Players: { GetLocalPlayer: () => 0, GetPlayerHeroEntityIndex: () => 100 },
  Entities: { IsValidEntity: entity => entity > 0, GetItemInSlot: (_hero, slot) => items().find(item => item.slot === slot)?.entity ?? -1 },
  Abilities: { GetCaster: entity => entity === 999 ? 999 : 100 },
  GameUI: { CustomUIConfig: () => config },
  Game: { GetGameTime: () => 60, GetDOTATime: () => 0, IsDayTime: () => true, EmitSound: name => sounds.push(name), PrepareUnitOrders: order => orders.push(order), DropItemAtCursor: (hero, item) => orders.push({ drop: item, hero }) },
  dotaunitorder_t: { DOTA_UNIT_ORDER_MOVE_ITEM: 19 },
  $: { Localize: value => value, DispatchEvent: (...args) => dispatched.push(args), GetContextPanel: () => ({}), CreatePanel: () => ({ DeleteAsync() { this.deleted = true; } }), RegisterEventHandler: (name, _panel, fn) => handlers.push({ name, fn }) },
  setInterval: fn => { const key = ++id; timers.set(key, fn); return key; }, clearInterval: key => timers.delete(key),
  GameEvents: { SendCustomEventToServer: (name, event) => sent.push({ name, ...event }), Subscribe: (name, fn) => { const key = ++id; listeners.set(key, { name, fn }); return key; }, Unsubscribe: key => listeners.delete(key) },
  h: (tag, p, ...children) => typeof tag === 'function' ? tag({ ...p, children: children.length === 1 ? children[0] : children }) : { tag, props: p ?? {}, children },
  require: name => name.endsWith('.less') ? {} : name === 'solid-js' ? solid : name.includes('events.macro') ? { useNetTable: (_name, key) => () => tables[key] } : { createToggleWindowSignal: () => [() => open, value => open = value] },
 };
 for (const tag of ['Panel', 'Label', 'Button', 'Image', 'DOTAItemImage']) context[tag] = tag;
 const file = path.resolve(__dirname, '../src/components/shop/shop.tsx');
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, jsxFactory: 'h' } }).outputText, context);
 const tree = module.exports.ShopPanel(props), nodes = [];
 function visit(value) { if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === 'object') { nodes.push(value); visit(value.children); } } visit(tree);
 mounts.forEach(fn => fn());
 return { props, sent, tables, listeners, effects, nodes, handlers, timers, menus, orders, dispatched, errors, sounds, signals, definitions, model: module.exports,
  buy: nodes.find(node => node.tag === 'Button' && node.props.id === 'item_salve1'),
  stash: nodes.find(node => node.props.id === 'AbilityButton'),
  emit(name, event) { for (const listener of listeners.values()) if (listener.name === name) listener.fn(event); },
  reply(event) { this.emit('athena_shop_result', event); }, cleanup: () => cleanups.forEach(fn => fn()), open: () => open };
}
test('按原版 shops.kv 完整展示所有商品，服务端旧目录缺项也不能删掉显示', () => {
 const { parseKV } = require('./kv-parser'), base = path.resolve(__dirname, '../game/athena_tsbuild/scripts/npc');
 const read = file => parseKV(fs.readFileSync(path.join(base, file), 'utf8'), path.join(base, file)).data;
 const shops = read('kv/gameplay/shops.kv'), items = read('npc_items_custom.txt'), f = fixture(true, shops, items);
 const rendered = f.nodes.filter(node => node.tag === 'Button' && node.props.class === 'CustomItemImage ShopItem').map(node => node.props.id);
 const expected = Object.keys(shops).filter(group => ['DefShop', 'PracticeShop'].includes(group)).flatMap(group => Object.keys(shops[group]))
  .concat(Object.keys(shops).filter(group => !['DefShop', 'PracticeShop'].includes(group)).flatMap(group => Object.keys(shops[group])));
 assert.deepEqual(rendered, expected); assert.equal(rendered.length, 92);
 assert.ok(rendered.includes('item_ring_shop')); assert.ok(rendered.includes('item_chaos_plate')); assert.ok(rendered.includes('item_jian_1')); assert.ok(rendered.includes('item_zhanqi'));
 assert.equal(f.nodes.find(node => node.tag === 'Button' && node.props.id === 'item_zhanqi').props.classList.CanPurchase, false);
 f.cleanup();
});
test('右键购买只发送商品名、局号和请求标识，不发送客户端价格或配方', () => {
 const f = fixture(); f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 1);
 const request = f.sent[0]; assert.equal(request.name, 'athena_shop_action'); assert.equal(request.run_id, 3); assert.equal(request.item_name, 'item_salve1'); assert.equal(request.action, 'buy');
 for (const key of ['price', 'gold_cost', 'materials', 'item_requirement']) assert.equal(Object.hasOwn(request, key), false); f.cleanup();
});
test('等待响应拒绝重复点击，成功响应后才播放购买声，旧局和其他响应无效', () => {
 const f = fixture(); f.buy.props.oncontextmenu(); const request = f.sent[0]; f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 1); assert.equal(f.sounds.length, 0);
 f.reply({ run_id: 2, request_id: request.request_id, success: true }); f.reply({ run_id: 3, request_id: 'other', success: true }); f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 1);
 f.reply({ run_id: 3, request_id: request.request_id, success: true }); assert.equal(f.sounds.length, 1); f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 2); assert.notEqual(f.sent[0].request_id, f.sent[1].request_id); f.cleanup();
});
test('服务器失败显示错误并释放请求；余额不足不发请求', () => {
 const f = fixture(); f.buy.props.oncontextmenu(); f.reply({ run_id: 3, request_id: f.sent[0].request_id, success: false, error: 'CreateFailed' }); assert.equal(f.errors[0], '#ShopError_CreateFailed'); assert.equal(f.sounds.length, 0);
 f.tables.run_resources.players[0].gold = 0; f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 1); assert.equal(f.errors[1], '#ShopError_NotEnoughResource'); f.cleanup();
});
test('左键查看配方，魂晶和荣誉商品分栏显示并按各自货币购买', () => {
 const f = fixture(); f.buy.props.onactivate(); assert.equal(f.signals[0].value, 'item_salve1'); assert.equal(f.sent.length, 0);
 for (const name of ['item_crystal', 'item_score']) { const node = f.nodes.find(n => n.tag === 'Button' && n.props.id === name); assert.equal(node.props.classList.CanPurchase, true); node.props.oncontextmenu(); assert.equal(f.sent.at(-1).item_name, name); f.reply({ ...f.sent.at(-1), success: true }); }
 assert.ok(f.nodes.some(n => n.props.class === 'SideCostCrystal')); assert.ok(f.nodes.some(n => n.props.class === 'SideCostScore')); f.cleanup();
});
test('Lua 数字键网表可展示商品与储藏，库存右键菜单出售真实实体', () => {
 const f = fixture(true); assert.ok(f.buy); f.stash.props.oncontextmenu({}); const menu = f.menus[0]; const sell = Object.keys(menu).find(key => key.includes('AthenaShopSell')); assert.ok(sell); menu[sell](); assert.equal(f.sent[0].action, 'sell'); assert.equal(f.sent[0].item_entity, 77); f.cleanup();
});
test('储藏取回和全部取回走原生操作；旧菜单不操作新局', () => {
 const f = fixture(); f.stash.props.oncontextmenu({}); const menu = f.menus[0]; menu['#AthenaShopRetrieve'](); assert.equal(f.orders[0].AbilityIndex, 77); assert.equal(f.orders[0].TargetIndex, 0);
 f.nodes.find(n => n.props.id === 'grab_all_button').props.onactivate({}); assert.equal(f.dispatched[0][0], 'DOTAHUDStashGrabAll');
 f.props.snapshot.run_id = 4; f.tables.shop_catalog.run_id = 4; f.tables.item_inventory.run_id = 4; for (const fn of Object.values(menu)) fn(); assert.equal(f.orders.length, 1); assert.equal(f.sent.length, 0); f.cleanup();
});
test('旧目录、结算阶段和旧库存隔离；重开关闭窗口并清除选择和请求', () => {
 const f = fixture(); f.props.snapshot.run_id = 4; f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 0);
 f.props.snapshot.run_id = 3; f.props.snapshot.state = 'GameState_Settle'; f.buy.props.oncontextmenu(); assert.equal(f.sent.length, 0);
 f.props.snapshot.state = 'GameState_Battle'; f.tables.item_inventory.run_id = 2; f.stash.props.oncontextmenu({}); assert.equal(f.menus.length, 1); // 旧渲染的槽位回调仍会检查实体，菜单执行必须重新校验网表。
 for (const fn of Object.values(f.menus[0])) fn(); assert.equal(f.sent.length, 0);
 f.effects.forEach(fn => fn()); assert.equal(f.open(), false); assert.equal(f.signals[0].value, ''); assert.equal(f.signals[1].value, ''); f.cleanup(); assert.equal(f.listeners.size, 0); assert.equal(f.timers.size, 0);
});
test('拖拽支持储藏换位和丢弃，拒绝其他英雄或上局留下的拖拽', () => {
 const f = fixture(), start = f.handlers.find(h => h.name === 'DragStart').fn, drop = f.handlers.find(h => h.name === 'DragDrop').fn, end = f.handlers.find(h => h.name === 'DragEnd').fn;
 const callbacks = {}; assert.equal(start({}, callbacks), true); assert.equal(callbacks.displayPanel.shopRunId, 3); assert.equal(drop({}, { overrideentityindex: 999 }), false); assert.equal(drop({}, { overrideentityindex: 77, shopRunId: 2 }), false);
 assert.equal(drop({}, callbacks.displayPanel), true); assert.equal(f.orders[0].TargetIndex, 9); end({}, callbacks.displayPanel); assert.equal(callbacks.displayPanel.deleted, true); assert.equal(f.orders.length, 1);
 const second = {}; start({}, second); end({}, second.displayPanel); assert.equal(f.orders[1].drop, 77); f.cleanup(); assert.equal(start({}, {}), false);
});
test('配方布局保持原版三层坐标，重复材料独立展示，连线有限', () => {
 const f = fixture(), graph = f.model.recipeLayout('item_jia_2', { item_jia_2: ['item_jia_1', 'item_jia_1'], item_jia_3: ['item_jia_2'] });
 assert.equal(graph.nodes.length, 4); assert.equal(graph.lines.length, 3); assert.equal(graph.nodes[0].x, 180); assert.equal(graph.nodes[0].y, 75.5); assert.equal(graph.nodes.filter(n => n.name === 'item_jia_1').length, 2); assert.ok(graph.lines.every(line => Number.isFinite(line.width) && Number.isFinite(line.angle))); f.cleanup();
});
test('配方提示计算卷轴费用、嵌套材料与叠加数量，排除储藏材料', () => {
 const f = fixture(), recipes = f.model.recipeRequirements(f.definitions), entry = { currency: 'gold', price: 7000, ingredients: ['item_jia_2'] };
 assert.equal(f.model.displayedPrice(entry, [{ entity: 1, slot: 0, name: 'item_jia_1' }], f.definitions, recipes), 6000);
 assert.equal(f.model.displayedPrice(entry, [{ entity: 1, slot: 0, name: 'item_jia_2' }], f.definitions, recipes), 4000);
 assert.equal(f.model.displayedPrice(entry, [{ entity: 1, slot: 9, name: 'item_jia_2' }], f.definitions, recipes), 7000);
 assert.equal(f.model.displayedPrice({ currency: 'gold', price: 150, ingredients: ['item_salve1', 'item_salve1', 'item_salve1'] }, [{ entity: 1, slot: 0, name: 'item_salve1', charges: 2 }], f.definitions, recipes), 50); f.cleanup();
});
test('缺少不可购买材料时不显示可购买状态，持有材料后可以报价', () => {
 const f = fixture(), definitions = { rare: { ItemCost: 0, ItemPurchasable: 0 } }, entry = { currency: 'gold', price: 500, ingredients: ['rare'] };
 assert.equal(f.model.displayedPrice(entry, [], definitions, {}), undefined);
 assert.equal(f.model.displayedPrice(entry, [{ entity: 1, slot: 0, name: 'rare' }], definitions, {}), 500); f.cleanup();
});
test('外部查看物品事件接入配方选择；昼夜时钟与监听定时器释放', () => {
 const f = fixture(); f.emit('custom_item_check', { itemname: 'item_jia_2' }); assert.equal(f.signals[0].value, 'item_jia_2'); assert.equal(f.signals[2].value.hour, 6); assert.equal(f.signals[2].value.min, 12); assert.equal(f.signals[2].value.day, true); assert.equal(f.timers.size, 1); f.cleanup(); assert.equal(f.timers.size, 0); assert.equal(f.listeners.size, 0);
});
test('迁入的三份 LESS 与原版逐字节一致，商店和储藏的原生样式均已加载', () => {
 const hashes = { 'shop/styles.less': '8064361edbcbd3081d954bb580e54abdd63f0f1a5015d612ff28ad2b07b24195', 'elements/AbilityPanel/styles.less': '5eee65ac454ddd4913209ced497dfbc08d14030ee677e2fd15395ebaf5a2b6a5', 'define.less': 'e121394d4607448428b6e71939f8c39c7cf71693ae77e68f10e6d311db43e1e6' };
 for (const [file, hash] of Object.entries(hashes)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname, '../src/components/shop/legacy', file))).digest('hex'), hash);
 const xml = fs.readFileSync(path.resolve(__dirname, '../src/ui/hud_main/hud_main.xml'), 'utf8'); assert.ok(xml.includes('dota_hud_shop.vcss_c')); assert.ok(xml.includes('dota_hud_stash.vcss_c'));
});
console.log(`Passed ${passed} shop UI checks.`);
