import { reloadable } from "../lib/tstl-utils";
import { modifier_common } from "../modifiers/framework/modifier_common";

/** 单位属性来源与成长生命周期；基础 KV 只由 modifier_common 初始化。 */
@reloadable
export class CUnitAttributes extends CModule {
	private units: { unit: CDOTA_BaseNPC; index: EntityIndex; playerID: PlayerID; }[] = [];
	private items: Record<number, Record<string, number>> = {};
	private devoured: Record<number, CDOTA_Item[]> = {};
	private running = false;
	private runId = 0;
	private lastSecondTick = 0;
	private lastMinuteTick = 0;
	private killed: CDOTA_BaseNPC[] = [];
	init() {
		Event.UnregisterContext(this);
		Event.Register("npc_spawned", ({ unit }) => {
			this.killed = this.killed.filter(victim => IsValid(victim) && victim !== unit);
			if (unit.IsRealHero()) { this.Track(unit); this.RefreshItems(unit); }
		}, this);
		Event.Register("item_added", ({ unit }) => this.RefreshItems(unit), this);
		Event.Register("item_removed", ({ unit }) => this.RefreshItems(unit), this);
		Event.Register("hero_level_up", ({ unit, level, old_level }) => {
			for (const stat of ["STRENGTH", "AGILITY", "INTELLECT"]) this.AddPermanent(unit, "CUSTOM_ATTRIBUTE_" + stat,
				AthenaProperty(unit, (PropertyFunction as AnyTable)["STATS_" + stat + "_GAIN"]) * math.max(0, level - old_level));
			this.Sync(unit);
		}, this);
		Event.Register("game_start", ({ runId }) => this.Start(runId!), this);
		Event.Register("tick_time", event => {
			if (!this.running || event.runId !== this.runId) return;
			const key = event.tick_time === 1 ? "lastSecondTick" : "lastMinuteTick";
			if (event.tick <= this[key]) return;
			this[key] = event.tick;
			for (const { unit } of this.units) if (this.Active(unit)) {
				if (event.tick_time === 1) this.RefreshItems(unit);
				this.Grow(unit, event.tick_time === 1 ? "SEC" : "MIN");
			}
		}, this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.Stop(); }, this);
		Event.Register("game_reset", event => { if (event.runId === GameState.GetSession().runId) this.Clear(); }, this);
		Event.RegisterWithPriority("entity_killed", ({ victim, attacker }) => {
			if (!this.Active(attacker) || victim === attacker || victim.GetTeamNumber() === attacker.GetTeamNumber()) return;
			// 引擎死亡事件和自定义伤害事件可能同时上报同一次死亡。
			if (this.killed.includes(victim)) return; this.killed.push(victim);
			this.AddPermanent(attacker, "CUSTOM_ATTRIBUTE_ALL", GetKillAll(attacker), true);
			this.AddPermanent(attacker, "CUSTOM_ATTRIBUTE_ATTACK", GetKillAttack(attacker), true);
			// 旧版读了 flStrength 却将 flAttack 写入力量，本次保留有效行为。
			this.AddPermanent(attacker, "CUSTOM_ATTRIBUTE_STRENGTH", GetKillAttack(attacker), true);
			this.GrantGold(attacker, GetKillGoldFlat(attacker));
		}, 200, this); // 在胜负判定结束本局前结算最后一次击杀成长。
		Event.Register("damage_event", event => {
			if (!this.Active(event.attacker) || event.damage_category !== DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK
				|| ((event.attack_states ?? 0) & ATTACK_STATES.SKIPCOUNTING) !== 0) return;
			for (const stat of ["HEALTH", "ARMOR", "ATTACK", "ALL"]) this.AddPermanent(event.attacker, "CUSTOM_ATTRIBUTE_" + stat,
				AthenaProperty(event.attacker, (PropertyFunction as AnyTable)["ATTACK_" + stat]), true);
		}, this);
		Event.Register("task_reward", reward => {
			if (reward.handled || reward.type !== "TASK_REWARD_TYPE_ATTRIBUTE") return;
			const unit = PlayerResource.GetSelectedHeroEntity(reward.playerID);
			if (IsValid(unit)) reward.handled = this.AddPermanent(unit, reward.name, reward.amount);
		}, this);
	}
	private Track(unit: CDOTA_BaseNPC) {
		if (!this.units.some(record => record.unit === unit)) this.units.push({ unit, index: unit.entindex(), playerID: unit.GetPlayerOwnerID() });
	}
	private Key(unit: CDOTA_BaseNPC, propertyId: string): PropertySystemKey {
		return PropertyData.configs[propertyId].scope === PropertyScope.PLAYER ? unit.GetPlayerOwnerID() : unit.entindex();
	}
	private Source(unit: CDOTA_BaseNPC, attribute: string) { return "athena_permanent:" + unit.entindex() + ":" + attribute; }
	/** 永久属性只累加自己的来源；不会把装备、技能或其他玩家的贡献写回。 */
	AddPermanent(unit: CDOTA_BaseNPC, attribute: string, value: number, increase = false): boolean {
		const property = ATHENA_PERMANENT_PROPERTIES[attribute];
		if (!IsServer() || !IsValid(unit) || !unit.IsRealHero() || property === undefined || value !== value || math.abs(value) === math.huge) return false;
		if (value === 0) return true;
		if (increase) value *= 1 + GetPlayerAttributeGainPercentage(unit.GetPlayerOwnerID()) * 0.01;
		this.Track(unit);
		const id = PROPERTY_MAP_REVERSE[property]!;
		const success = PropertySystem.AddStaticProperty(this.Key(unit, id), id, this.Source(unit, attribute), this.GetPermanent(unit, attribute) + value);
		if (success) this.Sync(unit);
		return success;
	}
	GetPermanent(unit: CDOTA_BaseNPC, attribute: string): number {
		const property = ATHENA_PERMANENT_PROPERTIES[attribute];
		if (property === undefined) return 0;
		const id = PROPERTY_MAP_REVERSE[property]!, key = this.Key(unit, id), scope = PropertyData.configs[id].scope;
		const storage = scope === PropertyScope.UNIT ? PropertyData.unitStorage[key as EntityIndex] : PropertyData.playerStorage[key as PlayerID];
		return storage?.static[id]?.find(entry => entry.sourceId === this.Source(unit, attribute))?.value ?? 0;
	}
	/** 装备汇总只接收旧版 75 个登记字段；额外列表供后续吞噬玩法显式传入。 */
	RefreshItems(unit: CDOTA_BaseNPC, devoured?: CDOTA_Item[]) {
		if (!IsServer() || !IsValid(unit) || !unit.IsRealHero()) return;
		if (devoured !== undefined) this.devoured[unit.entindex()] = devoured;
		const equipped: CDOTA_Item[] = [];
		for (let slot = 0; slot < 6; slot++) {
			const item = unit.GetItemInSlot(slot);
			if (IsValid(item) && KeyValues.items[item.GetAbilityName()]?.CustomItemType !== "CUSTOM_ITEM_TYPE_DIVINE") equipped.push(item);
		}
		const values: Record<string, number> = {};
		for (const [field, property] of pairs(ATHENA_ITEM_PROPERTIES)) {
			const id = PROPERTY_MAP_REVERSE[property]!, aggregation = ATHENA_ITEM_AGGREGATIONS[field];
			let total = 0;
			for (const item of [...equipped, ...(this.devoured[unit.entindex()] ?? [])]) {
				if (!IsValid(item)) continue;
				const value = item.GetSpecialValueFor(field, unit);
				if (aggregation === AggregationStrategy.DECMUL) total = (1 - (1 - total * 0.01) * (1 - value * 0.01)) * 100;
				else if (aggregation === AggregationStrategy.MULTIPLY) total = ((1 + total * 0.01) * (1 + value * 0.01) - 1) * 100;
				else total += value;
			}
			values[id] = total;
		}
		const previous = this.items[unit.entindex()] ?? {}, source = "athena_items:" + unit.entindex();
		this.items[unit.entindex()] = values; this.Track(unit);
		for (const [id, value] of pairs(values)) if ((previous[id] ?? 0) !== value) {
			if (value === 0) PropertySystem.RemoveStaticProperty(this.Key(unit, id), source, id);
			else PropertySystem.AddStaticProperty(this.Key(unit, id), id, source, value);
		}
		this.Sync(unit);
	}
	private Sync(unit: CDOTA_BaseNPC) {
		const common = unit.FindModifierByName("modifier_common") as modifier_common;
		if (IsValid(common)) common.SyncStats();
	}
	private Active(unit: CDOTA_BaseNPC) {
		const session = GameState.GetSession();
		return this.running && session.runId === this.runId && session.state === "GameState_Battle"
			&& IsValid(unit) && unit.IsRealHero() && session.participants.includes(unit.GetPlayerOwnerID());
	}
	private GrantGold(unit: CDOTA_BaseNPC, value: number) {
		if (value !== 0) PlayerResource.ModifyGold(unit.GetPlayerOwnerID(), value, true, EDOTA_ModifyGold_Reason.DOTA_ModifyGold_Unspecified);
	}
	private Grow(unit: CDOTA_BaseNPC, interval: "SEC" | "MIN") {
		// 旧版每分钟护甲仅使用装备值，永久 ARMOR_PER_MIN 未接入。
		const stats = interval === "SEC" ? ["HEALTH", "ATTACK", "ARMOR", "ALL", "STRENGTH", "AGILITY", "INTELLECT"] : ["HEALTH", "ATTACK", "ALL", "INTELLECT", "PHYSICAL_DAMAGE", "MAGICAL_DAMAGE"];
		for (const stat of stats) this.AddPermanent(unit, "CUSTOM_ATTRIBUTE_" + stat,
			interval === "MIN" && stat === "INTELLECT" ? GetItemIntellectPerMin(unit) : AthenaProperty(unit, (PropertyFunction as AnyTable)[stat + "_PER_" + interval]), true);
		if (interval === "MIN") this.AddPermanent(unit, "CUSTOM_ATTRIBUTE_ARMOR", GetItemArmorPerMin(unit), true);
		else this.GrantGold(unit, GetGoldPerSec(unit) + GetPlayerGoldPerSecond(unit.GetPlayerOwnerID()));
	}
	private Start(runId: number) {
		const session = GameState.GetSession();
		if (session.runId !== runId || session.state !== "GameState_Battle" || (this.running && this.runId === runId)) return;
		this.running = true; this.runId = runId; this.lastSecondTick = 0; this.lastMinuteTick = 0;
		for (const playerID of GameState.GetSession().participants) {
			const unit = PlayerResource.GetSelectedHeroEntity(playerID);
			if (IsValid(unit)) { this.Track(unit); this.RefreshItems(unit); }
		}
	}
	private Stop() { this.running = false; }
	/** 玩家作用域来源也按实体清除，避免连续对局把上局装备/永久收益带入新英雄。 */
	private Clear() {
		this.Stop();
		for (const { unit, index, playerID } of this.units) {
			const keyFor = (id: string) => PropertyData.configs[id].scope === PropertyScope.PLAYER ? playerID : index;
			const current = EntIndexToHScript(index);
			// 已复用的实体索引不能清理新单位；玩家属性仍根据旧记录释放。
			const canClear = (id: string) => PropertyData.configs[id].scope === PropertyScope.PLAYER || !IsValid(current) || current === unit;
			for (const [attribute, property] of pairs(ATHENA_PERMANENT_PROPERTIES)) {
				const id = PROPERTY_MAP_REVERSE[property]!;
				if (canClear(id)) PropertySystem.RemoveStaticProperty(keyFor(id), "athena_permanent:" + index + ":" + attribute, id);
			}
			for (const [id] of pairs(this.items[index] ?? {})) if (canClear(id)) PropertySystem.RemoveStaticProperty(keyFor(id), "athena_items:" + index, id);
			if (IsValid(unit)) this.Sync(unit);
		}
		this.units = []; this.items = {}; this.devoured = {}; this.killed = [];
	}
}
declare global { var UnitAttributes: CUnitAttributes; }
UnitAttributes ??= new CUnitAttributes();
