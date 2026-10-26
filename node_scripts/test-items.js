/* 真实物品/资源/商店/背包覆盖代码；仅模拟 Dota 的创建、过滤器与物品栏容器。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { fixture: resourceFixture } = require('./test-run-resources');
const { parseKV } = require('./kv-parser');
const root = path.resolve(__dirname, '..'), npc = path.join(root, 'game/athena_tsbuild/scripts/npc');
const read = name => parseKV(fs.readFileSync(path.join(npc, name), 'utf8'), path.join(npc, name)).data;
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS ' + name); }
function fixture() {
	const f = resourceFixture(), c = f.c, actions = new Map(), replies = [], created = [], containers = [], filters = {};
	let index = 20000, failCreate = false, failDrop = false, failAdd = false, stackItems = false;
	c.CModule.prototype.error = () => {};
	Object.assign(c, { Items: undefined, Shop: undefined, Inventory: undefined, json: { encode: JSON.stringify },
		LoadKeyValues: name => read(name.replace(/^scripts\/npc\//, '')),
		CustomUIEvent: (name, fn, context) => actions.set(name, event => fn.call(context, event)),
		StopCustomUIEvent: () => actions.delete('athena_shop_action'),
		CustomGameEventManager: { Send_ServerToPlayer: (player, _name, result) => replies.push({ player, ...result }) },
		dotaunitorder_t: { DOTA_UNIT_ORDER_PURCHASE_ITEM: 16, DOTA_UNIT_ORDER_SELL_ITEM: 17, DOTA_UNIT_ORDER_DISASSEMBLE_ITEM: 18 },
		Service: { GetPlayerSetting: () => false },
		DOTAModifierAttribute_t: { MODIFIER_ATTRIBUTE_MULTIPLE: 2 },
		CDOTABaseAbility: {}, C_DOTABaseAbility: {},
	});
	c.GameRules.GetGameModeEntity = () => ({ SetItemAddedToInventoryFilter(fn, context) { filters.add = event => fn.call(context, event); }, SetExecuteOrderFilter(fn, context) { filters.order = event => fn.call(context, event); } });
	c.PlayerResource.GetPlayer = id => ({ valid: true, id });
	c.CustomNetTables.SetNetData = (table, key, value) => c.CustomNetTables.SetTableValue(table, key, value);
	c.KeyValues.items = structuredClone(read('npc_items_custom.txt'));
	c.KeyValues.abilities = {};
	const abilityBase = c.CDOTABaseAbility;
	c.CDOTA_Ability_Lua = abilityBase;
	c.C_DOTA_Ability_Lua = abilityBase;
	f.load('override/CDOTABaseAbility');
	const heroBase = Object.getPrototypeOf(f.heroes[0]);
	function remove(item) { for (const hero of f.selected.values()) for (let slot = 0; slot <= 16; slot++) if (hero.items?.[slot] === item) delete hero.items[slot]; item.valid = false; }
	c.UTIL_Remove = entity => { if (entity?.GetAbilityName) remove(entity); else if (entity) entity.valid = false; };
	heroBase.AddItem_Engine = function (item) {
		if (failAdd) throw new Error('engine add failure');
		if (!filters.add({ inventory_parent_entindex_const: this.index, item_entindex_const: item.index })) return undefined;
		if (stackItems && c.KeyValues.items[item.name]?.ItemStackable === 1) {
			const target = this.items?.find(existing => existing?.name === item.name);
			if (target) { target.charges += item.charges; remove(item); if (item.container) item.container.valid = false; return target; }
		}
		const slot = Array.from({ length: 9 }, (_, i) => i).find(i => !this.items?.[i]); if (slot === undefined) return undefined;
		this.items ??= []; this.items[slot] = item; item.caster = this;
		if (item.container) item.container.valid = false; item.container = undefined;
		return item;
	};
	heroBase.TakeItem_Engine = function (item) { this.items ??= []; for (let i = 0; i <= 16; i++) if (this.items[i] === item) delete this.items[i]; return item; };
	heroBase.RemoveItem_Engine = function (item) { this.TakeItem_Engine(item); remove(item); };
	heroBase.SwapItems = function (one, two) { const temporary = this.items[one]; this.items[one] = this.items[two]; this.items[two] = temporary; };
	for (const hero of f.heroes) { hero.items = []; hero.EmitSound = () => {}; }
	function BaseItem() {} Object.setPrototypeOf(BaseItem.prototype, abilityBase);
	const adapter = { registerAbility: name => ctor => { c[name ?? ctor.name] = ctor.prototype; return ctor; } };
	for (const file of ['consumable/item_salve', 'consumable/item_clarity', 'weapon/item_jia', 'weapon/item_xie', 'drops/item_bag_of_coin', 'essence/essence', 'quest/item_zhanqi']) {
		f.load('abilities/items/' + file, { '../../eom_ability': { EOMItem: BaseItem }, '../../../lib/dota_ts_adapter': adapter, '../../../modifiers/eom_modifier/eom_modifier': f.eom });
	}
	c.CreateItem = (name, _owner, purchaser) => {
		if (failCreate === true || failCreate === name) return undefined;
		const kv = c.KeyValues.items[name]; if (!kv) return undefined;
		const item = Object.assign(Object.create(c[name] ?? abilityBase), { index: ++index, name, caster: purchaser, valid: true, level: Number(kv.ItemBaseLevel ?? 1), charges: Number(kv.ItemInitialCharges ?? 0),
			entindex() { return this.index; }, IsItem: () => true, GetAbilityName() { return this.name; }, GetName() { return this.name; },
			GetCaster() { return this.caster; }, GetParent() { return this.caster; }, GetContainer() { return this.container; }, GetLevel() { return this.level; },
			SetLevel(level) { this.level = level; }, GetCurrentCharges() { return this.charges; }, SetCurrentCharges(value) { this.charges = value; },
			SetCombineLocked(value) { this.combineLocked = value; }, GetAbilityTag: () => undefined,
			GetMaxCharges: () => 0, IsChargeCooldownFrozen: () => false, GetChargeCooldownRemaining: () => 0,
			DestroyParticles() {}, GetSpecialValueFor(key) { const value = kv.AbilityValues?.[key]; return Number(value?.value ?? value ?? 0); },
		}); c._G = c; f.units.set(item.index, item); created.push(item); return item;
	};
	c.CreateItemOnPositionSync = (position, item) => {
		if (failDrop) return undefined;
		const container = { valid: true, index: ++index, position, GetContainedItem: () => item, GetAbsOrigin() { return this.position; }, SetAbsOrigin(value) { this.position = value; } };
		containers.push(container); item.container = container; f.units.set(container.index, container); return container;
	};
	f.load('framework/inventory', { '../lib/tstl-utils': { reloadable: value => value } }); c.Inventory.init();
	const priority = f.load('class/priority_queue'), weight = f.load('class/weight_pool', { './priority_queue': priority });
	f.load('mechanics/items', { '../class/weight_pool': weight, '../lib/tstl-utils': { reloadable: value => value } }); c.Items.init();
	f.load('mechanics/shop', { '../lib/tstl-utils': { reloadable: value => value } }); c.Shop.init();
	const originalStart = f.start;
	let request = 0;
	function buy(name, id = 0, extra = {}) { return c.Shop.Action(id, { action: 'buy', item_name: name, run_id: f.session.runId, request_id: 'request:' + ++request, ...extra }); }
	function sell(item, id = 0, extra = {}) { return c.Shop.Action(id, { action: 'sell', item_entity: item.index, run_id: f.session.runId, request_id: 'request:' + ++request, ...extra }); }
	return { ...f, c, created, containers, filters, actions, replies, buy, sell,
		start() { originalStart(); },
		money(value, id = 0, currency = 'gold') { assert.equal(f.modify(id, currency, value), true); },
		items(id = 0) { return Array.from(c.Items.Inventory(f.selected.get(id)), entry => entry.item); },
		ground() { return containers.filter(container => container.valid && container.GetContainedItem().valid); },
		fail(kind, value = true) { if (kind === 'create') failCreate = value; else if (kind === 'drop') failDrop = value; else failAdd = value; },
		stack(value = true) { stackItems = value; },
		setup(name, kv, group = 'Accessory') {
			c.KeyValues.items[name] = { BaseClass: 'item_datadriven', AbilityBehavior: 'DOTA_ABILITY_BEHAVIOR_PASSIVE', ItemCost: 100, ...kv };
			const oldLoad = c.LoadKeyValues; c.LoadKeyValues = file => { const data = oldLoad(file); if (file.endsWith('/shops.kv')) { data[group] ??= {}; data[group][name] = 1; } return data; };
		},
	};
}

if (require.main === module) {
test('商店展示目录与原版配置逐组一致，荣耀商店和未迁移物品不能被删掉', () => {
	const f = fixture(); f.start();
	const expected = read('kv/gameplay/shops.kv'), catalog = f.c.CustomNetTables.GetTableValue('common', 'shop_catalog');
	for (const [group, names] of Object.entries(expected)) {
		assert.deepEqual(Array.from(catalog.groups[group] ?? [], entry => entry.name), Object.keys(names), group + ' 商品被过滤或顺序变化');
	}
	assert.equal(Object.values(catalog.groups).flat().length, 92);
	assert.equal(catalog.groups.DefShop.length, 8); assert.equal(catalog.groups.PracticeShop.length, 6);
	assert.ok(catalog.groups.MainWeapon.some(entry => entry.name === 'item_jian_1'));
	assert.ok(catalog.groups.consumables.some(entry => entry.name === 'item_gem'));
	f.money(1000000); assert.equal(f.buy('item_jian_1').error, 'ItemUnavailable'); assert.equal(f.buy('item_ring_shop').error, 'ItemUnavailable');
	assert.equal(f.c.RunResources.Get(0, 'gold', 1), 1000000);
});
test('普通商品真实入背包，属性只汇总一次；出售即清除属性且不重复退款', () => {
	const f = fixture(); f.start(); f.money(10000);
	const before = f.heroes[0].GetMaxHealth(); assert.equal(f.buy('item_shipin_1').success, true);
	const [item] = f.items(); assert.equal(item.GetAbilityName(), 'item_shipin_1'); assert.equal(item.combineLocked, true);
	assert.equal(f.heroes[0].GetMaxHealth() - before, 2000); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 5000);
	assert.equal(f.sell(item).success, true); assert.equal(f.heroes[0].GetMaxHealth(), before); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 10000);
	assert.equal(f.sell(item).success, false); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 10000);
});
test('购买只认服务端价与白名单；客户端伪造金额、材料和其他玩家实体均无效', () => {
	const f = fixture(); f.start(); f.money(6000);
	assert.equal(f.buy('item_shipin_1', 0, { gold_cost: 1, item_accessories: [] }).success, true); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 1000);
	assert.equal(f.buy('item_shipin_1').error, 'NotEnoughResource'); assert.equal(f.buy('item_blank').error, 'ItemUnavailable');
	assert.equal(f.sell(f.items()[0], 1).error, 'CannotSell'); assert.equal(f.buy('item_shipin_1', 2).error, 'Unavailable');
});
test('重复请求/原生商店订单只交易一次，原生引擎路径被拦截', () => {
	const f = fixture(); f.start(); f.money(10000);
	f.buy('item_shipin_1', 0, { request_id: 'same' }); f.buy('item_shipin_1', 0, { request_id: 'same' }); assert.equal(f.items().length, 1);
	const order = { units: { 0: f.heroes[0].index }, order_type: 16, issuer_player_id_const: 0, sequence_number_const: 99, shop_item_name: 'item_shipin_1' };
	assert.equal(f.filters.order(order), false); assert.equal(f.filters.order(order), false); assert.equal(f.items().length, 2); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 0);
	assert.equal(f.filters.order({ ...order, order_type: 1 }), true);
	assert.equal(f.filters.order({ ...order, units: { 0: 123456 }, sequence_number_const: 100 }), false); assert.equal(f.items().length, 2);
});
test('创建/落地失败不扣费；引擎加物品抛错时退款并清理准备好的掉落', () => {
	const f = fixture(); f.start(); f.money(10000);
	for (const kind of ['create', 'drop', 'add']) {
		f.fail(kind); const result = f.buy('item_shipin_1'); assert.equal(result.success, false); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 10000); assert.equal(f.ground().length, 0); f.fail(kind, false);
	}
	assert.equal(f.items().length, 0);
});
test('背包满购买保留地面物品；实际拾取使用引擎过滤器，属性与网表同步', () => {
	const f = fixture(); f.start(); f.money(60000);
	for (let i = 0; i < 9; i++) assert.equal(f.buy('item_shipin_1').success, true);
	assert.equal(f.buy('item_shipin_1').success, true); assert.equal(f.items().length, 9); assert.equal(f.ground().length, 1);
	const loot = f.ground()[0].GetContainedItem(); f.sell(f.items()[0]);
	f.heroes[0].AddItem_Engine(loot); f.c.Items.Sweep(); assert.equal(f.items().length, 9); assert.equal(f.ground().length, 0);
	assert.equal(f.c.CustomNetTables.GetTableValue('common', 'item_inventory').players[0].length, 9);
});
test('装备/背包交换只影响当前装备属性，普通丢弃后清除属性', () => {
	const f = fixture(); f.start(); f.money(5000); const before = f.heroes[0].GetMaxHealth(); f.buy('item_shipin_1');
	f.heroes[0].SwapItems(0, 6); f.c.Items.Sweep(); assert.equal(f.heroes[0].GetMaxHealth(), before);
	f.heroes[0].SwapItems(6, 0); f.c.Items.Sweep(); assert.equal(f.heroes[0].GetMaxHealth(), before + 2000);
	const item = f.items()[0]; f.c.Items.Drop(item, 10, 1); f.c.Items.Sweep(); assert.equal(f.heroes[0].GetMaxHealth(), before); assert.equal(f.ground().length, 1);
});
test('类型限制拒绝第二件副手，购买时保留掉落，不会越过过滤器强装', () => {
	const f = fixture(); f.setup('test_deputy', { CustomItemType: 'CUSTOM_ITEM_TYPE_DEPUTY', AbilityValues: { item_attack_damage: 10 } }); f.start(); f.money(300);
	assert.equal(f.buy('test_deputy').success, true); assert.equal(f.buy('test_deputy').success, true); assert.equal(f.items().length, 1); assert.equal(f.ground().length, 1);
	assert.equal(f.heroes[0].AddItem_Engine(f.ground()[0].GetContainedItem()), undefined);
});
test('魂晶/荣誉价格走同一资源模块，货币装备出售不会凭空兑换金币', () => {
	const f = fixture(); f.setup('test_crystal', { CrystalCost: 20, ItemCost: 999 }); f.setup('test_score', { ScoreCost: 30 }); f.start();
	f.money(25, 0, 'crystal'); f.money(35, 0, 'score'); assert.equal(f.buy('test_crystal').success, true); assert.equal(f.buy('test_score').success, true);
	assert.equal(f.c.RunResources.Get(0, 'crystal', 1), 5); assert.equal(f.c.RunResources.Get(0, 'score', 1), 5);
	f.sell(f.items()[0]); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 0);
});
test('服务端配方使用持有材料、收取缺件成本；失败不吞材料', () => {
	const f = fixture(); f.setup('test_material', { ItemCost: 100 }); f.setup('test_drop_material', { ItemPurchasable: 0, ItemCost: 0 });
	f.setup('test_result', { ItemCost: 20 }); f.c.KeyValues.items.test_recipe = { ItemResult: 'test_result', ItemRequirements: { '01': 'test_material;test_drop_material' } };
	f.start(); f.money(1000); assert.equal(f.buy('test_result').error, 'MissingMaterials');
	f.c.Items.Grant(0, 'test_drop_material', 1, 1); f.fail('create', 'test_result'); assert.equal(f.buy('test_result').success, false); assert.equal(f.items().length, 1);
	f.fail('create', false); assert.equal(f.buy('test_result').success, true); assert.deepEqual(f.items().map(item => item.name), ['test_result']); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 880);
});
test('药水包转为真实次数，使用减少次数；打包折扣不能靠出售套取金币', () => {
	const f = fixture(); f.start(); f.money(2000); assert.equal(f.buy('item_salve1_pack').success, true);
	const [item] = f.items(); assert.equal(item.name, 'item_salve1'); assert.equal(item.charges, 50); assert.equal(f.c.Items.SellGold(item), 2000);
	assert.equal(f.c.Items.SpendCharge(item), true); assert.equal(f.c.Items.SellGold(item), 1960);
	f.sell(item); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 1960);
});
test('原生拾取/脚本添加叠加药水都合并剩余成本，满背包也能叠加', () => {
	const f = fixture(); f.stack(); f.start(); f.money(10000); f.buy('item_salve1'); f.buy('item_salve1_pack');
	assert.equal(f.items().length, 1); assert.equal(f.items()[0].charges, 51); assert.equal(f.c.Items.SellGold(f.items()[0]), 2050);
	const dropped = f.c.Items.Create(0, 'item_salve1', 1); dropped.__saleGoldValue = 30; dropped.__saleChargeCount = 1; f.c.Items.Drop(dropped, 0, 1);
	f.heroes[0].AddItem_Engine(dropped); f.sell(f.items()[0]); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 10030);
});
test('合成添加失败时退款，材料即使无法放回背包也保留在地面', () => {
	const f = fixture(); f.setup('test_required', { ItemCost: 0, ItemPurchasable: 0 }); f.setup('test_crafted', { ItemCost: 20 });
	f.c.KeyValues.items.test_recipe = { ItemResult: 'test_crafted', ItemRequirements: { '01': 'test_required' } };
	f.start(); f.money(100); f.c.Items.Grant(0, 'test_required', 1, 1); const material = f.items()[0]; f.fail('add');
	assert.equal(f.buy('test_crafted').success, false); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 100); assert.equal(material.valid, true);
	assert.equal(f.ground().length, 1); assert.equal(f.ground()[0].GetContainedItem(), material);
});
test('批量任务物品创建到一半失败，会撤回整批而不是重复交付前半批', () => {
	const f = fixture(); f.start(); const create = f.c.CreateItem; let created = 0;
	f.c.CreateItem = (...args) => ++created === 2 ? undefined : create(...args);
	assert.equal(f.c.Items.Grant(0, 'item_shipin_1', 2, 1), false); assert.equal(f.items().length, 0); assert.equal(f.ground().length, 0);
});
test('重复配方材料按次数消费，同一叠加物品的剩余次数保留', () => {
	const f = fixture(); f.setup('test_stack_material', { ItemCost: 50, ItemInitialCharges: 5, ItemStackable: 1 }); f.setup('test_stack_result', { ItemCost: 20 });
	f.c.KeyValues.items.test_recipe = { ItemResult: 'test_stack_result', ItemRequirements: { '01': 'test_stack_material;test_stack_material' } };
	f.start(); f.money(100); f.c.Items.Grant(0, 'test_stack_material', 1, 1); assert.equal(f.buy('test_stack_result').success, true);
	const material = f.items().find(item => item.name === 'test_stack_material'); assert.equal(material.charges, 3);
	assert.equal(f.items().find(item => item.name === 'test_stack_result').__saleGoldValue, 40);
});
test('真实药水脚本消耗最后一次后保留回复，重复使用只延长同种 buff', () => {
	const f = fixture(); f.start(); f.money(1000); f.buy('item_salve1');
	const before = f.c.GetAthenaHealthRegen(f.heroes[0]); f.items()[0].OnSpellStart();
	assert.equal(f.items().length, 0); assert.equal(f.c.GetAthenaHealthRegen(f.heroes[0]) - before, 60);
	const buff = f.heroes[0].FindModifierByName('modifier_item_salve1'); buff.GetRemainingTime = () => 6; buff.SetDuration = value => buff.remaining = value;
	f.buy('item_salve1'); f.items()[0].OnSpellStart(); assert.equal(buff.remaining, 16); assert.equal(f.c.GetAthenaHealthRegen(f.heroes[0]) - before, 60);
});
test('精髓充能升级与三种偏向转换保留物品栏位置和剩余次数', () => {
	const f = fixture(); f.start(); f.c.Items.Grant(0, 'item_essence_str_1', 1, 1); f.items()[0].SetCurrentCharges(140);
	f.c.Items.Grant(0, 'item_essence_small', 1, 1); assert.equal(f.items()[0].name, 'item_essence_str_2'); assert.equal(f.items()[0].charges, 20);
	f.items()[0].OnSpellStart(); assert.equal(f.items()[0].name, 'item_essence_agi_2'); assert.equal(f.items()[0].charges, 20); assert.equal(f.items()[0].GetLevel(), 2);
});
test('热重载不增加事件或商店监听；停止后的计时器不会继续发物品', () => {
	const f = fixture(); f.start(); const count = f.c.Event.GetListenerCount();
	f.c.Items.init(); f.c.Shop.init(); f.c.Shop.init(); assert.equal(f.c.Event.GetListenerCount(), count); assert.equal(f.actions.size, 1);
	f.money(5000); assert.equal(f.buy('item_shipin_1').success, true); assert.equal(f.items().length, 1);
});
test('属性书即时使用且不占栏，任务物品奖励通过生产 Items 发放，失败保持未处理', () => {
	const f = fixture(); f.start(); f.money(10000); const before = f.c.GetStrength(f.heroes[0]); assert.equal(f.buy('item_str_book').success, true);
	assert.equal(f.items().length, 0); assert.equal(f.c.GetStrength(f.heroes[0]) - before, 10);
	const reward = { handled: false, playerID: 0, runId: 1, type: 'TASK_REWARD_TYPE_ITEM', name: 'item_shipin_1', amount: 1 };
	f.fire('task_reward', reward); assert.equal(reward.handled, true); assert.equal(f.items().length, 1);
	f.fail('create'); const failed = { ...reward, handled: false }; f.fire('task_reward', failed); assert.equal(failed.handled, false); assert.equal(f.items().length, 1);
});
test('首个赏金任务的战旗可以实际发放，任务物品不进入可购买目录', () => {
	const f = fixture(); f.start(); const reward = { handled: false, playerID: 0, runId: 1, type: 'TASK_REWARD_TYPE_ITEM', name: 'item_zhanqi', amount: 1 };
	f.fire('task_reward', reward); assert.equal(reward.handled, true); assert.equal(f.items()[0].name, 'item_zhanqi'); assert.equal(f.buy('item_zhanqi').success, false);
});
test('实际击杀奖励通知触发掉落，收益加成与 false 标记保留，重复死亡不重复掉落', () => {
	const f = fixture(); f.start(); f.property(0, 'player_drop_chance_percentage', 100); f.c.RandomFloat = () => 75;
	const enemy = f.enemy({ DropItem1: '50,item_baoshi_1', DropItem2: '50,item_baoshi_2,false', BountyGold: 0 }); f.kill(enemy); f.kill(enemy);
	assert.equal(f.ground().length, 1); assert.equal(f.ground()[0].GetContainedItem().name, 'item_baoshi_1');
});
test('权重池/水库按原版层次解析，字符串数值权重被规范为数值', () => {
	const f = fixture(); f.setup('test_pool_loot', { ItemCost: 0, ItemPurchasable: 0 });
	const load = f.c.LoadKeyValues; f.c.LoadKeyValues = file => file.endsWith('/pools.kv') ? { test_pool: { test_pool_loot: '1' } }
		: file.endsWith('/reservoirs.kv') ? { test_reservoir: { test_pool: '1' } } : load(file);
	f.start(); f.kill(f.enemy({ DropItem1: '100,test_reservoir' })); assert.equal(f.ground().length, 1); assert.equal(f.ground()[0].GetContainedItem().name, 'test_pool_loot');
});
test('掉落配置初始化失败进入错误结算，不能带着半初始化物品系统继续战斗', () => {
	const f = fixture(), load = f.c.LoadKeyValues; let reason;
	f.c.LoadKeyValues = file => file.endsWith('/pools.kv') ? undefined : load(file);
	f.c.GameState.FinishRun = (id, outcome, message) => { reason = message; assert.equal(outcome, 'error'); f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: id }); };
	f.start(); assert.ok(reason.includes('掉落配置不存在')); assert.equal(f.buy('item_shipin_1').success, false);
});
test('自动拾取金币袋只给一次，精华首次生成精髓且不递归重复充能', () => {
	const f = fixture(); f.start(); f.c.Items.Grant(0, 'item_bag_of_coin', 1, 1); f.c.Items.Sweep(); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 5000); assert.equal(f.items().length, 0);
	f.c.Items.Grant(0, 'item_essence_small', 1, 1); assert.deepEqual(f.items().map(item => item.name), ['item_essence_str_1']); assert.equal(f.items()[0].charges, 0);
	f.c.Items.Grant(0, 'item_essence_small', 1, 1); assert.equal(f.items()[0].charges, 30);
});
test('原版护甲配方图可连续购买升级，卷轴收费、材料回收和出售成本正确', () => {
	const f = fixture(); f.start(); f.money(50000);
	const catalog = f.c.CustomNetTables.GetTableValue('common', 'shop_catalog');
	assert.ok(catalog.related.item_jia_2); assert.ok(catalog.related.item_jia_5);
	assert.equal(Object.values(catalog.groups).flat().some(entry => entry.name === 'item_jia_2'), false);
	const base = Number(f.c.KeyValues.items.item_jia_1.ItemCost), fee2 = Number(f.c.KeyValues.items.item_recipe_jia_2.ItemCost), fee3 = Number(f.c.KeyValues.items.item_recipe_jia_3.ItemCost);
	assert.equal(catalog.related.item_jia_3.price, base + fee2 + fee3);
	assert.equal(f.buy('item_jia_1').success, true); const first = f.items()[0];
	assert.equal(f.buy('item_jia_2').success, true); assert.equal(first.valid, false); assert.deepEqual(f.items().map(item => item.name), ['item_jia_2']);
	assert.equal(f.c.RunResources.Get(0, 'gold', 1), 50000 - base - fee2);
	assert.equal(f.buy('item_jia_3').success, true); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 50000 - base - fee2 - fee3);
	assert.equal(f.sell(f.items()[0]).success, true); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 50000);
	assert.equal(f.buy('item_jia_3').success, true); assert.equal(f.c.RunResources.Get(0, 'gold', 1), 50000 - base - fee2 - fee3);
});
test('三局重开移除物品/地面容器，旧物品、旧请求和晚到计时器都不能污染新局', () => {
	const f = fixture(); let oldItem, stale;
	for (let run = 1; run <= 3; run++) {
		f.session.runId = run; f.session.state = 'GameState_Battle';
		if (run > 1) { f.heroes[0] = f.hero(0); f.heroes[0].items = []; f.heroes[1] = f.hero(1); f.heroes[1].items = []; }
		f.start(); f.money(10000); assert.equal(f.items().length, 0);
		if (oldItem) { assert.equal(oldItem.valid, false); assert.equal(f.buy('item_shipin_1', 0, { run_id: run - 1 }).error, 'StaleRun'); stale.forEach(fn => fn()); assert.equal(f.items().length, 0); }
		f.buy('item_shipin_1'); oldItem = f.items()[0]; f.c.Items.Drop(oldItem, 10, run); stale = [...f.timers.values()];
		f.session.state = 'GameState_Settle'; f.fire('game_end', { run_id: run }); assert.equal(f.buy('item_shipin_1').success, false);
		f.session.state = 'GameState_Reset'; f.fire('game_reset', { runId: run }); f.fire('game_reset', { runId: run });
		assert.equal(f.ground().length, 0); assert.equal(f.c.RunResources.Get(0, 'gold', run), undefined);
	}
});
console.log(`Passed ${passed} item, drop and shop checks.`);
}
module.exports = { fixture };
