import { CWeightPool } from "../class/weight_pool";
import { reloadable } from "../lib/tstl-utils";

/** 实体物品、掉落池、拾取和物品奖励；只持有本局创建或接纳的物品及其地面容器。 */
@reloadable
export class CItems extends CModule {
	private runId = 0;
	private running = false;
	private timer?: string;
	private generation = 0;
	private records: { item: CDOTA_Item; container?: CDOTA_Item_Physical; }[] = [];
	private pools: Record<string, CWeightPool<string>> = {};
	private reservoirs: Record<string, CWeightPool<string>> = {};
	private published = "";
	private merges: { target: CDOTA_Item; incoming: CDOTA_Item; before: number; charges: number; value: number; }[] = [];
	init() {
		Event.UnregisterContext(this);
		Event.RegisterWithPriority("game_start", ({ runId }) => {
			if (runId === undefined) return;
			try { this.Start(runId); } catch (error) { this.Stop(); GameState.FinishRun(runId, "error", tostring(error)); }
		}, 250, this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.Stop(); }, this);
		Event.Register("game_reset", event => { if (event.runId === this.runId) this.reset(); }, this);
		Event.Register("unit_bounty", this.OnBounty, this);
		Event.Register("inventory_filter", event => {
			if (!event.allowed || !IsValid(event.item) || !KeyValues.items[event.item.GetAbilityName()]) return;
			const id = event.unit.GetPlayerOwnerID();
			event.allowed = this.Hero(id, this.runId) === event.unit && this.CanAccept(event.unit, event.item) && this.Track(event.item);
			if (event.allowed && tonumber(KeyValues.items[event.item.GetAbilityName()].ItemStackable) === 1) {
				this.FlushMerges();
				const target = this.Inventory(event.unit).find(entry => entry.slot < 9 && entry.item !== event.item && entry.item.GetAbilityName() === event.item.GetAbilityName())?.item;
				if (target) this.merges.push({ target, incoming: event.item, before: target.GetCurrentCharges(), charges: event.item.GetCurrentCharges(), value: this.SellGold(target) + this.SellGold(event.item) });
			}
		}, this);
		Event.Register("item_added", ({ unit, item }) => {
			if (this.Hero(unit.GetPlayerOwnerID(), this.runId) !== unit) return;
			this.Track(item); this.Publish();
		}, this);
		Event.Register("item_removed", () => this.Publish(), this);
		Event.Register("task_reward", reward => {
			if (reward.handled || (reward.type !== "TASK_REWARD_TYPE_ITEM" && reward.type !== "TASK_REWARD_TYPE_SCEPTER")) return;
			const hero = this.Hero(reward.playerID, reward.runId);
			if (!hero) return;
			const name = reward.type === "TASK_REWARD_TYPE_SCEPTER" ? "item_" + hero.GetUnitName() : reward.name;
			reward.handled = this.Grant(reward.playerID, name, reward.amount, reward.runId);
		}, this);
	}
	Hero(playerID: PlayerID, runId: number): CDOTA_BaseNPC_Hero | undefined {
		const session = GameState.GetSession(), hero = PlayerResource.GetSelectedHeroEntity(playerID);
		return this.running && session.state === "GameState_Battle" && runId === this.runId && session.runId === runId
			&& session.participants.includes(playerID) && IsValid(hero) && hero.IsRealHero() && hero.__resourceRunId === runId ? hero : undefined;
	}
	/** 没有迁入技能脚本的 Lua 道具不能作为空壳卖出；原版纯数据属性物品直接可用。 */
	Supported(name: string) {
		// 这两种数据物品依赖完整戒指/融合玩法，不能仅凭 BaseClass 创建成无效商品。
		if (name === "item_ring_shop" || name === "item_ronghe") return false;
		const kv = KeyValues.items[name];
		return typeof kv === "object" && (kv.BaseClass !== "item_lua" || (_G as AnyTable)[name] !== undefined);
	}
	private Start(runId: number) {
		const session = GameState.GetSession();
		if (runId !== session.runId || session.state !== "GameState_Battle" || this.runId === runId) return;
		this.reset(); this.runId = runId;
		this.pools = this.LoadPools("scripts/npc/kv/pools.kv");
		this.reservoirs = this.LoadPools("scripts/npc/kv/reservoirs.kv");
		for (const [name, kv] of pairs(KeyValues.items)) {
			if (typeof kv !== "object" || kv.Rarity === undefined) continue;
			const kind = kv.CustomItemType === "CUSTOM_ITEM_TYPE_EQUIPMENT" ? "item_equipment_level_" : kv.CustomItemType === "CUSTOM_ITEM_TYPE_ABILITY_BOOK" ? "item_ability_book_level_" : "";
			if (kind !== "" && this.pools[kind + kv.Rarity]) this.pools[kind + kv.Rarity].Add(name, 1);
		}
		this.running = true;
		const generation = this.generation;
		this.timer = Timer.GameTimer(0.2, () => {
			if (!this.running || this.generation !== generation || GameState.GetSession().runId !== runId) return;
			this.Sweep(); return 0.2;
		});
		this.Publish();
	}
	private LoadPools(file: string): Record<string, CWeightPool<string>> {
		const data = LoadKeyValues(file) as KV | undefined;
		if (!data) throw `掉落配置不存在：${file}`;
		const result: Record<string, CWeightPool<string>> = {};
		for (const [name, values] of pairs(data)) {
			if (typeof values !== "object") continue;
			const pool = new CWeightPool<string>();
			for (const [entry, weight] of pairs(values)) {
				const value = tonumber(weight);
				if (value !== undefined && value >= 0 && value < math.huge) pool.Add(tostring(entry), value);
			}
			result[name] = pool;
		}
		return result;
	}
	private Track(item: CDOTA_Item): boolean {
		if (!IsValid(item) || (item.__itemRunId !== undefined && item.__itemRunId !== this.runId)) return false;
		item.__itemRunId = this.runId;
		if (!this.records.some(record => record.item === item)) this.records.push({ item, container: item.GetContainer() });
		return true;
	}
	Inventory(hero: CDOTA_BaseNPC) {
		const result: { item: CDOTA_Item; slot: number; }[] = [];
		for (let slot = 0; slot <= 16; slot++) { const item = hero.GetItemInSlot(slot); if (IsValid(item)) result.push({ item, slot }); }
		return result;
	}
	Owns(hero: CDOTA_BaseNPC, item: CDOTA_Item) {
		return IsValid(item) && item.__itemRunId === this.runId && this.records.some(record => record.item === item) && this.Inventory(hero).some(entry => entry.item === item);
	}
	CanAccept(hero: CDOTA_BaseNPC, item: CDOTA_Item) {
		const kv = KeyValues.items[item.GetAbilityName()];
		if (!kv || !this.Supported(item.GetAbilityName()) || (item.__itemRunId !== undefined && item.__itemRunId !== this.runId)) return false;
		const type = kv.CustomItemType;
		if (type === "CUSTOM_ITEM_TYPE_MAIN_WEAPON" || type === "CUSTOM_ITEM_TYPE_DEPUTY") {
			if (this.Inventory(hero).some(entry => entry.slot < 9 && entry.item !== item && KeyValues.items[entry.item.GetAbilityName()]?.CustomItemType === type)) return false;
		}
		return true;
	}
	Create(playerID: PlayerID, name: string, runId: number): CDOTA_Item | undefined {
		const hero = this.Hero(playerID, runId);
		if (!hero || !this.Supported(name)) return;
		const item = CreateItem(name, PlayerResource.GetPlayer(playerID), hero);
		if (!IsValid(item)) return;
		item.SetCombineLocked(true); // 配方只由服务端商店事务消费，禁止引擎抢先自动合成。
		const level = tonumber(KeyValues.items[name].ItemBaseLevel) ?? 1;
		if (level > 1) item.SetLevel(level, false);
		if (!this.Track(item)) { UTIL_Remove(item); return; }
		return item;
	}
	TryGive(hero: CDOTA_BaseNPC_Hero, item: CDOTA_Item, runId: number): boolean {
		if (this.Hero(hero.GetPlayerOwnerID(), runId) !== hero || !this.CanAccept(hero, item)) return false;
		const inventory = this.Inventory(hero), stackable = tonumber(KeyValues.items[item.GetAbilityName()]?.ItemStackable) === 1;
		if (!inventory.some(entry => entry.slot < 9 && (entry.item === item || (stackable && entry.item.GetAbilityName() === item.GetAbilityName()))) && inventory.filter(entry => entry.slot < 9).length >= 9) return false;
		const added = hero.AddItem(item);
		this.FlushMerges();
		const held = this.Inventory(hero).some(entry => entry.item === item || entry.item === added);
		if (held) this.Track(IsValid(added) ? added : item);
		return held;
	}
	/** 统一处理脚本添加和原生拾取产生的叠加；成本与剩余次数一同合并。 */
	private FlushMerges() {
		for (const merge of this.merges) if (IsValid(merge.target) && merge.target.GetCurrentCharges() > merge.before) {
			merge.target.__saleGoldValue = merge.value;
			merge.target.__saleChargeCount = merge.before + merge.charges;
		}
		this.merges = [];
	}
	SpendCharge(item: CDOTA_Item): boolean {
		const owner = item.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!IsValid(owner) || this.Hero(owner.GetPlayerOwnerID(), this.runId) !== owner || !this.Owns(owner, item)) return false;
		if (item.GetCurrentCharges() > 1) item.SetCurrentCharges(item.GetCurrentCharges() - 1);
		else this.Destroy(item);
		this.Publish(); return true;
	}
	/** 原生自动施法和补偿扫描共用重入保护；防止生成新物品时再次消费同一枚拾取物。 */
	UsePickup(item: CDOTA_Item, apply: (hero: CDOTA_BaseNPC_Hero) => void) {
		if (!IsValid(item) || item.__pickupRunning) return;
		const hero = item.GetCaster() as CDOTA_BaseNPC_Hero;
		if (!IsValid(hero) || this.Hero(hero.GetPlayerOwnerID(), this.runId) !== hero || !this.Owns(hero, item)) return;
		item.__pickupRunning = true;
		try { apply(hero); } finally { if (IsValid(item)) item.__pickupRunning = false; }
	}
	/** 升级/转换先准备新实体与落点，成功放回原物品栏后才销毁旧物品。 */
	Replace(hero: CDOTA_BaseNPC_Hero, old: CDOTA_Item, name: string, charges: number): CDOTA_Item | undefined {
		if (!this.Owns(hero, old)) return;
		const next = this.Create(hero.GetPlayerOwnerID(), name, this.runId);
		if (!next) return;
		if (!this.Drop(next, hero.GetAbsOrigin(), this.runId)) { this.Destroy(next); return; }
		const slot = this.Inventory(hero).find(entry => entry.item === old)!.slot;
		next.SetCurrentCharges(charges);
		hero.TakeItem(old);
		if (!this.TryGive(hero, next, this.runId)) { this.Destroy(next); this.TryGive(hero, old, this.runId); return; }
		const placed = this.Inventory(hero).find(entry => entry.item === next)!.slot;
		if (placed !== slot) hero.SwapItems(placed, slot);
		this.Destroy(old); UnitAttributes.RefreshItems(hero); this.Publish(); return next;
	}
	Drop(item: CDOTA_Item, position: Vector, runId: number): boolean {
		if (!this.running || runId !== this.runId || GameState.GetSession().runId !== runId || !this.Track(item)) return false;
		for (const id of GameState.GetSession().participants) {
			const hero = PlayerResource.GetSelectedHeroEntity(id);
			if (IsValid(hero) && this.Inventory(hero).some(entry => entry.item === item)) hero.TakeItem(item);
		}
		let container = item.GetContainer();
		if (IsValid(container)) container.SetAbsOrigin(position);
		else container = CreateItemOnPositionSync(position, item);
		if (!IsValid(container)) return false;
		this.records.find(record => record.item === item)!.container = container;
		return true;
	}
	Destroy(item: CDOTA_Item) {
		const record = this.records.find(entry => entry.item === item);
		if (IsValid(item)) {
			const owner = item.__inventoryOwner;
			if (IsValid(owner)) owner.SyncInventory(false);
			if (IsValid(owner) && this.Inventory(owner).some(entry => entry.item === item)) owner.RemoveItem(item);
			else { Event.UnregisterContext(item); UTIL_Remove(item); }
		}
		if (IsValid(record?.container)) UTIL_Remove(record.container);
		this.records = this.records.filter(entry => entry.item !== item);
	}
	/** 批量任务奖励先全部创建；创建/落地失败回滚，避免重试时再次发出前半批。 */
	Grant(playerID: PlayerID, name: string, amount: number, runId: number): boolean {
		const hero = this.Hero(playerID, runId);
		if (!hero || !this.Supported(name) || amount < 1 || amount > 100 || amount !== math.floor(amount)) return false;
		const created: CDOTA_Item[] = [];
		try {
			for (let i = 0; i < amount; i++) {
				const item = this.Create(playerID, name, runId);
				if (!item) throw "物品创建失败";
				created.push(item);
				if (!this.Drop(item, hero.GetAbsOrigin(), runId)) throw "物品落地失败";
			}
			for (const item of created) this.TryGive(hero, item, runId); // 背包满或类型冲突时保留真实掉落。
			this.Sweep(); return true;
		} catch (error) { for (const item of created) this.Destroy(item); this.error(name, error); return false; }
	}
	private Resolve(name: string, depth = 0): string | undefined {
		if (depth > 12) return;
		if (KeyValues.items[name]) return name;
		const pool = this.reservoirs[name] ?? this.pools[name];
		const selected = pool?.Random();
		return selected ? this.Resolve(selected, depth + 1) : undefined;
	}
	private OnBounty(event: EventCallback["unit_bounty"]) {
		if (!this.Hero(event.playerID, event.runId)) return;
		const kv = KeyValues.units[event.victim.GetUnitName()] ?? {};
		for (let i = 1; i <= 10; i++) {
			const field = kv["DropItem" + i]; if (typeof field !== "string") continue;
			const [raw, pool, bonus] = field.split(",").map(part => part.trim());
			const chance = (tonumber(raw) ?? 0) * (bonus === "false" ? 1 : math.max(0, 1 + GetPlayerDropChancePercentage(event.playerID) * 0.01));
			if (chance <= 0 || RandomFloat(0, 100) > chance) continue;
			const name = this.Resolve(pool);
			if (!name) continue;
			const item = this.Create(event.playerID, name, event.runId);
			if (!item) { this.error("掉落道具尚不可创建", name); continue; }
			if (!this.Drop(item, event.victim.GetAbsOrigin(), event.runId)) this.Destroy(item);
		}
	}
	/** 旧版按物品成本全额出售；叠加消耗品按剩余次数折算，不能使用后仍卖整包。 */
	SellGold(item: CDOTA_Item): number {
		const kv = KeyValues.items[item.GetAbilityName()] ?? {};
		const price = item.__saleGoldValue ?? tonumber(kv.ItemCost) ?? 0;
		const initial = item.__saleChargeCount ?? math.max(1, tonumber(kv.ItemInitialCharges) ?? 1);
		return math.max(0, math.floor(price * (tonumber(kv.ItemStackable) === 1 ? item.GetCurrentCharges() / initial : 1)));
	}
	Sweep() {
		this.FlushMerges();
		for (const id of GameState.GetSession().participants) {
			const hero = this.Hero(id, this.runId); if (!hero) continue;
			hero.SyncInventory(false);
			for (const { item } of this.Inventory(hero)) {
				this.Track(item);
				const kv = KeyValues.items[item.GetAbilityName()];
				if (kv?.CustomItemType === "CUSTOM_ITEM_TYPE_ATTRIBUTE_BOOK") {
					const value = kv.AbilityValues?.value;
					if (typeof value === "object" && UnitAttributes.AddPermanent(hero, value.type, tonumber(value.value) ?? 0)) this.Destroy(item);
				} else if (item.GetAbilityName() === "item_salve1_pack" || item.GetAbilityName() === "item_clarity1_pack") {
					const potion = this.Create(id, item.GetAbilityName() === "item_salve1_pack" ? "item_salve1" : "item_clarity1", this.runId);
					if (potion) {
						potion.SetCurrentCharges(item.GetSpecialValueFor("count"));
						potion.__saleGoldValue = this.SellGold(item); potion.__saleChargeCount = potion.GetCurrentCharges();
						if (!this.Drop(potion, hero.GetAbsOrigin(), this.runId)) { this.Destroy(potion); continue; }
						this.Destroy(item);
						try { this.TryGive(hero, potion, this.runId); } catch (error) { this.error("药水保留在地面", error); }
					}
				} else if (tonumber(kv?.ItemCastOnPickup) === 1 && !item.__pickupRunning && (item as CDOTA_Item_Lua).OnSpellStart !== undefined) {
					(item as CDOTA_Item_Lua).OnSpellStart();
				}
			}
			UnitAttributes.RefreshItems(hero);
		}
		for (const record of this.records) if (IsValid(record.item)) record.container = record.item.GetContainer() ?? record.container;
		this.records = this.records.filter(record => IsValid(record.item) || IsValid(record.container));
		this.Publish();
	}
	Publish() {
		const players: Record<string, AthenaInventoryItem[]> = {};
		for (const id of GameState.GetSession().participants) {
			const hero = PlayerResource.GetSelectedHeroEntity(id); if (!IsValid(hero)) continue;
			players[tostring(id)] = this.Inventory(hero).map(({ item, slot }) => ({ entity: item.entindex(), name: item.GetAbilityName(), slot,
				charges: item.GetCurrentCharges(), sellable: tonumber(KeyValues.items[item.GetAbilityName()]?.ItemSellable) !== 0, sell_gold: this.SellGold(item) }));
		}
		const data = { run_id: this.runId, players }, encoded = json.encode(data);
		if (encoded !== this.published) { this.published = encoded; CustomNetTables.SetTableValue("common", "item_inventory", data); }
	}
	private Stop() { this.running = false; this.generation++; if (this.timer) Timer.StopTimer(this.timer); this.timer = undefined; }
	reset() {
		this.Stop();
		this.merges = [];
		while (this.records.length > 0) this.Destroy(this.records[this.records.length - 1].item);
		this.published = "";
		CustomNetTables.SetTableValue("common", "item_inventory", { run_id: this.runId, players: {} });
	}
}
declare global { var Items: CItems; }
Items ??= new CItems();
