/** 操作面板读取当前检视单位；引擎负责选中/施法，框架网表补充自定义充能和大数值生命。 */
export interface HudAction {
	entity: AbilityEntityIndex;
	name: string;
	slot: number;
	item: boolean;
	level: number;
	maxLevel: number;
	cooldown: number;
	cooldownLength: number;
	mana: number;
	hotkey: string;
	passive: boolean;
	canUpgrade: boolean;
	active: boolean;
	charges: number;
	maxCharges: number;
	restore: number;
}

export interface LowerHudState {
	unit: EntityIndex;
	controllable: boolean;
	alive: boolean;
	hero: boolean;
	multiSelection: boolean;
	learnMode: boolean;
	points: number;
	abilities: HudAction[];
	items: (HudAction | undefined)[];
	health: number;
	maxHealth: number;
	mana: number;
	maxMana: number;
	healthRegen: number;
	manaRegen: number;
	attack: number;
	attackSpeed: number;
	armor: number;
	reduction: number;
	movement: number;
	attributes: number[];
}

const finite = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const invalid = -1 as EntityIndex;

export function emptyLowerHudState(): LowerHudState {
	return { unit: invalid, controllable: false, alive: false, hero: false, multiSelection: false, learnMode: false, points: 0,
		abilities: [], items: Array.from({ length: 9 }), health: 0, maxHealth: 0, mana: 0, maxMana: 0,
		healthRegen: 0, manaRegen: 0, attack: 0, attackSpeed: 0, armor: 0, reduction: 0, movement: 0, attributes: [0, 0, 0] };
}

/** 仅用于显示三维；与服务端 GetAthenaStat 使用相同的 PropertySystem 来源。 */
export function hudAttribute(unit: EntityIndex, stat: "strength" | "agility" | "intellect") {
	if (!Entities.IsHero(unit)) return 0;
	const p = (name: string) => finite(Entities.GetPropertyValue(unit, name, false));
	const original = Math.floor(p("base_" + stat) + (Entities.GetLevel(unit) - 1) * p(stat + "_gain"));
	const base = Math.max(0, original + Math.floor(p("stats_" + stat + "_base") + p("stats_all_base")));
	return Math.max(0, Math.floor((base * (1 + (p("stats_" + stat + "_base_percentage") + p("stats_all_base_percentage")) * 0.01)
		+ p("stats_" + stat + "_bonus") + p("stats_all_bonus")) * (1 + (p("stats_" + stat + "_percentage") + p("stats_all_percentage")) * 0.01)));
}

export function readLowerHudState(): LowerHudState {
	const unit = Players.GetLocalPlayerPortraitUnit();
	if (unit < 0 || !Entities.IsValidEntity(unit)) return emptyLowerHudState();
	const controllable = Entities.IsControllableByPlayer(unit, Players.GetLocalPlayer());
	const net = getNetDataKey("unit", String(unit));
	const actions = (entity: AbilityEntityIndex, slot: number, item: boolean): HudAction => {
		const charge = Object.values(net?.abilities ?? {}).find(entry => entry.entIndex === entity);
		const maxCharges = item ? 0 : finite(charge?.maxCharge);
		const charges = item ? finite(Items.GetCurrentCharges(entity as ItemEntityIndex)) : finite(charge?.charge);
		const restore = charge?.isChargeCooldownFrozen ? finite(charge.chargeFrozenCooldownRemaining)
			: Math.max(0, finite(charge?.chargeRestoreTime) - Game.GetGameTime());
		return { entity, name: Abilities.GetAbilityName(entity), slot, item,
			level: Abilities.GetLevel(entity), maxLevel: Abilities.GetMaxLevel(entity),
			cooldown: Math.max(0, finite(Abilities.GetCooldownTimeRemaining(entity)), maxCharges > 0 && charges <= 0 ? restore : 0),
			cooldownLength: Math.max(0, finite(Abilities.GetCooldownLength(entity))),
			mana: Math.max(0, finite(Abilities.GetManaCost(entity))),
			hotkey: item ? (slot < 6 ? Game.GetKeybindForInventorySlot(slot) : "") : Abilities.GetKeybind(entity),
			passive: Abilities.IsPassive(entity),
			canUpgrade: !item && controllable && Abilities.CanAbilityBeUpgraded(entity, false) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
			active: Abilities.GetToggleState(entity) || Abilities.GetAutoCastState(entity), charges, maxCharges, restore };
	};
	const abilities: HudAction[] = [];
	for (let slot = 0; slot < Entities.GetAbilityCount(unit); slot++) {
		const entity = Entities.GetAbility(unit, slot);
		if (entity < 0 || !Entities.IsValidEntity(entity) || !Abilities.IsDisplayedAbility(entity)) continue;
		abilities.push(actions(entity, slot, false));
	}
	const items = Array.from({ length: 9 }, (_, slot) => {
		const entity = Entities.GetItemInSlot(unit, slot);
		return entity >= 0 && Entities.IsValidEntity(entity) ? actions(entity as AbilityEntityIndex, slot, true) : undefined;
	});
	const largeHealth = CustomNetTables.GetTableValue("large_number_health", String(unit));
	const maxHealth = Math.max(0, finite(largeHealth?.maximum, Entities.GetMaxHealth(unit)));
	const attributes = [hudAttribute(unit, "strength"), hudAttribute(unit, "agility"), hudAttribute(unit, "intellect")];
	const selected = Players.GetSelectedEntities(Players.GetLocalPlayer());
	const p = (name: string) => finite(Entities.GetPropertyValue(unit, name, false));
	return { unit, controllable, alive: Entities.IsAlive(unit), hero: Entities.IsHero(unit),
		multiSelection: selected.length > 1 && selected.indexOf(unit) >= 0, learnMode: Game.IsInAbilityLearnMode(),
		points: Entities.GetAbilityPoints(unit), abilities, items, attributes,
		health: Math.max(0, Math.min(maxHealth, finite(largeHealth?.current, Entities.GetHealth(unit)))), maxHealth,
		mana: Math.max(0, finite(Entities.GetMana(unit))), maxMana: Math.max(0, finite(Entities.GetMaxMana(unit))),
		healthRegen: Math.max(0, p("base_health_regen") + attributes[0] * 0.16 + p("base_health_regen_constant") + p("base_health_regen_constant_str"))
			+ p("health_regen_constant") + p("health_regen_percentage") * maxHealth * 0.01,
		manaRegen: Math.max(0, p("base_mana_regen")) + attributes[2] * 0.08 + p("base_mana_regen_constant_int") + p("mana_regen_constant") + p("mana_regen_constant_unique")
			+ p("mana_regen_percentage") * Entities.GetMaxMana(unit) * 0.01,
		attack: (Entities.GetDamageMin(unit) + Entities.GetDamageMax(unit)) * 0.5 + Entities.GetDamageBonus(unit),
		attackSpeed: finite(Entities.GetAttackSpeed(unit)) * 100,
		armor: finite(Entities.GetPhysicalArmorValue(unit)),
		reduction: Math.max(0, p("damage_reduction")),
		movement: finite(Entities.GetMoveSpeedModifier(unit, Entities.GetBaseMoveSpeed(unit))) };
}

export function hudNumber(value: number) {
	if (!Number.isFinite(value)) return "0";
	const magnitude = Math.abs(value);
	for (const [threshold, suffix] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]] as const) {
		if (magnitude >= threshold) return (value / threshold).toFixed(magnitude < threshold * 10 ? 1 : 0).replace(/\.0$/, "") + suffix;
	}
	return String(Math.floor(value));
}

export function isCurrentHudAction(unit: EntityIndex, action: HudAction, runId: number) {
	const session = getNetDataKey("common", "game_state");
	if (!session || session.run_id !== runId || session.state !== "GameState_Battle" || Players.GetLocalPlayerPortraitUnit() !== unit
		|| !Entities.IsValidEntity(unit) || !Entities.IsControllableByPlayer(unit, Players.GetLocalPlayer()) || !Entities.IsValidEntity(action.entity)) return false;
	return action.item ? Entities.GetItemInSlot(unit, action.slot) === action.entity : Entities.GetAbility(unit, action.slot) === action.entity;
}
