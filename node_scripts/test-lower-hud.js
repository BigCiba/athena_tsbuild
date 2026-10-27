/* 操作面板实际数据读取代码；模拟 Panorama API，验证选中单位、充能、大数值和跨局操作校验。 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), ts = require('typescript');
let passed = 0;
function test(name, check) { check(); passed++; console.log('PASS ' + name); }
function fixture() {
	let selected = 1;
	const entities = new Set([1, 2, 10, 11, 12, 20, 21]);
	const properties = { base_strength: 20, strength_gain: 2, stats_strength_base: 8, stats_all_base: 2, stats_strength_base_percentage: 10, stats_strength_bonus: 5, stats_all_percentage: 20 };
	const slots = [20, -1, -1, -1, -1, -1, 21, -1, -1];
	const net = { unit: { '1': { abilities: [{ entIndex: 10, charge: 2, maxCharge: 3, chargeRestoreTime: 18 }] }, '2': { abilities: [{ entIndex: 10, charge: 0, maxCharge: 99 }] } },
		common: { game_state: { run_id: 7, state: 'GameState_Battle' } }, large_number_health: { '1': { current: 8e12, maximum: 1e13 } } };
	const c = vm.createContext({ exports: {}, console,
		getNetDataKey: (table, key) => net[table]?.[key], CustomNetTables: { GetTableValue: (table, key) => net[table]?.[key] },
		AbilityLearnResult_t: { ABILITY_CAN_BE_UPGRADED: 0 },
		Players: { GetLocalPlayerPortraitUnit: () => selected, GetLocalPlayer: () => 0, GetSelectedEntities: () => [selected] }, Game: { GetGameTime: () => 10, IsInAbilityLearnMode: () => false, GetKeybindForInventorySlot: slot => ['Z', 'X', 'C', 'V', 'B', 'N'][slot] },
		Entities: { IsValidEntity: id => entities.has(id), IsControllableByPlayer: id => id === 1, IsHero: id => id === 1, IsAlive: () => true,
			GetAbilityCount: () => 3, GetAbility: (_u, slot) => [10, 11, 12][slot], GetItemInSlot: (_u, slot) => slots[slot],
			GetMaxHealth: () => 1000000, GetHealth: () => 800000, GetLevel: () => 3, GetAbilityPoints: () => 1, GetMana: () => 60, GetMaxMana: () => 100,
			GetDamageMin: () => 100, GetDamageMax: () => 110, GetDamageBonus: () => 5, GetAttackSpeed: () => 1.5,
			GetPhysicalArmorValue: () => 7, GetMoveSpeedModifier: (_u, base) => base + 45, GetBaseMoveSpeed: () => 300,
			GetPropertyValue: (unit, key) => unit === 1 ? properties[key] ?? 0 : 0 },
		Abilities: { GetAbilityName: entity => 'ability_' + entity, GetLevel: () => 1, GetMaxLevel: () => 20,
			GetCooldownTimeRemaining: () => 0, GetCooldownLength: () => 8, GetManaCost: () => 20, GetKeybind: () => 'Q',
			IsPassive: entity => entity === 11, IsDisplayedAbility: entity => entity !== 12,
			CanAbilityBeUpgraded: function (entity, toUpgrade) {
				if (arguments.length !== 2) throw new Error(`undefined requires 2 arguments; only ${arguments.length} given.`);
				assert.equal(toUpgrade, false, 'HUD 查询不能使用实际升级检查模式'); return 0;
			},
			GetToggleState: () => false, GetAutoCastState: () => false }, Items: { GetCurrentCharges: entity => entity === 20 ? 3 : 1 },
	});
	c.module = { exports: c.exports };
	const source = fs.readFileSync(path.resolve(__dirname, '../src/components/lower_hud/lower_hud_state.ts'), 'utf8');
	vm.runInContext(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText, c);
	return { ...c.module.exports, c, net, properties, slots, select(id) { selected = id; } };
}

test('显示当前检视单位全部可见技能及六格物品、三格背包', () => {
	const f = fixture(), state = f.readLowerHudState();
	assert.equal(state.unit, 1); assert.equal(state.abilities.length, 2); assert.equal(state.items.length, 9);
	assert.equal(state.items[0].name, 'ability_20'); assert.equal(state.items[6].name, 'ability_21'); assert.equal(state.items[6].hotkey, '');
	assert.equal(state.abilities[0].hotkey, 'Q'); assert.equal(state.attack, 110); assert.equal(state.attackSpeed, 150); assert.equal(state.movement, 345);
});

test('自定义充能读取当前单位网表，耗尽后使用剩余恢复时间', () => {
	const f = fixture(); let ability = f.readLowerHudState().abilities[0]; assert.equal(ability.charges, 2); assert.equal(ability.maxCharges, 3); assert.equal(ability.cooldown, 0);
	f.net.unit['1'].abilities[0].charge = 0; ability = f.readLowerHudState().abilities[0]; assert.equal(ability.cooldown, 8);
	f.net.unit['1'].abilities[0].isChargeCooldownFrozen = true; f.net.unit['1'].abilities[0].chargeFrozenCooldownRemaining = 4; assert.equal(f.readLowerHudState().abilities[0].cooldown, 4);
});

test('大数值生命不显示引擎缩放后的数字，属性使用框架成长和独立加成', () => {
	const f = fixture(), state = f.readLowerHudState(); assert.equal(state.health, 8e12); assert.equal(state.maxHealth, 1e13); assert.equal(state.attributes[0], 50);
	assert.equal(f.hudNumber(8e12), '8T'); assert.equal(f.hudNumber(1500), '1.5K'); assert.equal(f.hudNumber(NaN), '0');
	delete f.net.large_number_health['1']; assert.equal(f.readLowerHudState().health, 800000);
});

test('更换单位清除旧单位的属性和控制权限，空选择清空所有槽位', () => {
	const f = fixture(); f.select(2); let state = f.readLowerHudState();
	assert.equal(state.controllable, false); assert.equal(state.attributes[0], 0); assert.equal(state.abilities[0].maxCharges, 99); assert.equal(state.abilities[0].canUpgrade, false);
	f.select(-1); state = f.readLowerHudState(); assert.equal(state.unit, -1); assert.equal(state.abilities.length, 0); assert.equal(state.items.filter(Boolean).length, 0);
});

test('单选使用头像，多选才显示多单位层，查询其他单位不被多选层遮挡', () => {
	const f = fixture(); assert.equal(f.readLowerHudState().multiSelection, false);
	f.c.Players.GetSelectedEntities = () => [1, 2]; assert.equal(f.readLowerHudState().multiSelection, true);
	f.c.Players.GetSelectedEntities = () => [2, 3]; assert.equal(f.readLowerHudState().multiSelection, false);
});

test('换槽、切换选中单位、旧局菜单和结算状态不能提交操作', () => {
	const f = fixture(), state = f.readLowerHudState(), item = state.items[0];
	assert.equal(f.isCurrentHudAction(1, item, 7), true); f.slots[0] = 21; assert.equal(f.isCurrentHudAction(1, item, 7), false); f.slots[0] = 20;
	f.select(2); assert.equal(f.isCurrentHudAction(1, item, 7), false); f.select(1);
	assert.equal(f.isCurrentHudAction(1, item, 6), false); f.net.common.game_state.state = 'GameState_Settle'; assert.equal(f.isCurrentHudAction(1, item, 7), false);
});

console.log(`Passed ${passed} lower HUD checks.`);
