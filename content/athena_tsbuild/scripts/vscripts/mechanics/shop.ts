import { reloadable } from "../lib/tstl-utils";

type ShopCurrency = "gold" | "crystal" | "score";
interface ShopQuote { currency: ShopCurrency; price: number; materials: CDOTA_Item[]; }

/** 基础商店：商品白名单、服务端报价/配方、幂等交易和引擎商店操作适配。 */
@reloadable
export class CShop extends CModule {
	private runId = 0;
	private running = false;
	private entries: Record<string, AthenaShopEntry> = {};
	private recipes: Record<string, string[]> = {};
	private recipeCosts: Record<string, number> = {};
	private results: Record<string, AthenaShopResult> = {};
	private busy: Partial<Record<PlayerID, boolean>> = {};
	private requestListener?: CustomGameEventListenerID;
	init() {
		Event.UnregisterContext(this);
		if (this.requestListener !== undefined) StopCustomUIEvent(this.requestListener);
		Event.RegisterWithPriority("game_start", ({ runId }) => {
			if (runId === undefined) return;
			try { this.Start(runId); } catch (error) { this.running = false; GameState.FinishRun(runId, "error", tostring(error)); }
		}, 220, this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.running = false; }, this);
		Event.Register("game_reset", event => { if (event.runId === this.runId) this.reset(); }, this);
		Event.Register("inventory_order", event => {
			const order = event.order, type = order.order_type;
			if (type !== dotaunitorder_t.DOTA_UNIT_ORDER_PURCHASE_ITEM && type !== dotaunitorder_t.DOTA_UNIT_ORDER_SELL_ITEM
				&& type !== dotaunitorder_t.DOTA_UNIT_ORDER_DISASSEMBLE_ITEM) return;
			event.allowed = false; // 所有引擎购买/出售均改走同一资源事务，避免引擎再扣/加一次钱。
			if (type === dotaunitorder_t.DOTA_UNIT_ORDER_DISASSEMBLE_ITEM) return;
			const hero = Items.Hero(order.issuer_player_id_const, this.runId);
			if (!hero || order.units?.["0"] !== hero.entindex()) return; // 旧局英雄留下的排队订单不能重新解释为本局购买。
			const result = this.Action(order.issuer_player_id_const, { run_id: this.runId,
				request_id: `native:${order.sequence_number_const}:${type}`, action: type === dotaunitorder_t.DOTA_UNIT_ORDER_SELL_ITEM ? "sell" : "buy",
				item_name: order.shop_item_name, item_entity: order.entindex_ability });
			this.Reply(order.issuer_player_id_const, result);
		}, this);
		this.requestListener = CustomUIEvent("athena_shop_action", event => this.Reply(event.PlayerID, this.Action(event.PlayerID, event)), this);
	}
	private Start(runId: number) {
		const session = GameState.GetSession();
		if (runId !== session.runId || session.state !== "GameState_Battle" || this.runId === runId) return;
		this.reset(); this.runId = runId;
		const definitions = LoadKeyValues("scripts/npc/kv/gameplay/shops.kv") as Record<string, Record<string, number>>;
		for (const kv of Object.values(KeyValues.items)) {
			if (typeof kv === "object" && typeof kv.ItemResult === "string" && typeof kv.ItemRequirements === "object") {
				const requirements = kv.ItemRequirements as Record<string, string>, result = kv.ItemResult as string;
				const row = Object.keys(requirements).sort()[0];
				if (row !== undefined) {
					this.recipes[result] = tostring(requirements[row]).split(";").map(name => name.trim()).filter(name => name !== "");
					const fee = this.Price(kv, "gold");
					if (fee !== undefined) this.recipeCosts[result] = fee;
				}
			}
		}
		const groups: Record<string, AthenaShopEntry[]> = {};
		for (const [group, names] of pairs(definitions)) {
			const list: AthenaShopEntry[] = [];
			for (const name of Object.keys(names)) {
		const raw = KeyValues.items[name];
		const kv = typeof raw === "object" ? raw : {};
				const currency = this.Currency(kv), price = typeof raw === "object" ? this.BasePrice(name) : undefined;
				const entry: AthenaShopEntry = { name, currency, price: price ?? 0, ingredients: this.recipes[name] ?? [] };
				// 展示严格遵循原版商店配置；交易能力独立维护，不能用未迁移脚本删除目录项。
				list.push(entry);
				if (!Items.Supported(name)) continue;
				// 不能直接购买的任务/掉落物品只作为配方材料；有专用货币价格或配方的结果另行验证。
				if (price === undefined || (tonumber(kv.ItemPurchasable) === 0 && currency === "gold" && !this.recipes[name])) continue;
				if (price === 0 && !this.recipes[name]) continue;
				this.entries[name] = entry;
			}
			if (list.length > 0) groups[group] = list;
		}
		// 配方图允许继续购买已上架物品的受支持升级，不把它们重复塞进基础商品栏。
		const related: Record<string, AthenaShopEntry> = {};
		for (let depth = 0; depth < 12; depth++) {
			let added = false;
			for (const [name, ingredients] of pairs(this.recipes)) {
				if (this.entries[name] !== undefined || !ingredients.some(part => this.entries[part] !== undefined) || !Items.Supported(name)) continue;
				const price = this.BasePrice(name); if (price === undefined) continue;
				const entry: AthenaShopEntry = { name, ingredients, price, currency: this.Currency(KeyValues.items[name]) };
				this.entries[name] = entry; related[name] = entry; added = true;
			}
			if (!added) break;
		}
		this.running = true;
		CustomNetTables.SetTableValue("common", "shop_catalog", { run_id: runId, groups, related });
	}
	private Currency(kv: KV[string]): ShopCurrency {
		return (tonumber(kv.CrystalCost) ?? 0) > 0 ? "crystal" : (tonumber(kv.ScoreCost) ?? 0) > 0 ? "score" : "gold";
	}
	private Price(kv: KV[string], currency: ShopCurrency) {
		const value = tonumber(kv[currency === "crystal" ? "CrystalCost" : currency === "score" ? "ScoreCost" : "ItemCost"]);
		return value !== undefined && value === value && value >= 0 && value < math.huge ? value : undefined;
	}
	private BasePrice(name: string, path: string[] = []): number | undefined {
		const kv = KeyValues.items[name]; if (!kv || path.includes(name) || path.length > 12) return;
		const currency = this.Currency(kv);
		if (currency !== "gold") return this.Price(kv, currency);
		let total = this.recipeCosts[name] ?? this.Price(kv, "gold") ?? 0;
		if (!this.recipes[name]) return this.Price(kv, "gold");
		for (const part of this.recipes[name]) {
			const price = this.BasePrice(part, [...path, name]);
			if (price !== undefined && this.Currency(KeyValues.items[part]) === "gold") total += price;
		}
		return total < math.huge ? total : undefined;
	}
	/** 报价只读取实际持有物品；配方/价格/材料列表不接收客户端提供的数据。 */
	private Quote(hero: CDOTA_BaseNPC_Hero, name: string): ShopQuote | undefined {
		const kv = KeyValues.items[name], currency = this.Currency(kv), materials: CDOTA_Item[] = [];
		if (currency !== "gold") { const price = this.Price(kv, currency); return price === undefined ? undefined : { currency, price, materials }; }
		const inventory = Items.Inventory(hero).filter(entry => entry.slot < 9);
		const fill = (target: string, path: string[]): number | undefined => {
			if (path.includes(target) || path.length > 12) return;
			const owned = inventory.find(entry => {
				if (entry.item.GetAbilityName() !== target) return false;
				const count = tonumber(KeyValues.items[target]?.ItemStackable) === 1 ? math.max(1, entry.item.GetCurrentCharges()) : 1;
				return materials.filter(item => item === entry.item).length < count;
			});
			if (owned) { materials.push(owned.item); return 0; }
			const data = KeyValues.items[target]; if (!data) return;
			const recipe = this.recipes[target];
			if (!recipe && (tonumber(data.ItemPurchasable) === 0 || this.Currency(data) !== "gold")) return;
			let total = this.recipeCosts[target] ?? this.Price(data, "gold") ?? 0;
			if (!recipe) return total > 0 ? total : undefined;
			for (const part of recipe) { const price = fill(part, [...path, target]); if (price === undefined) return; total += price; }
			return total;
		};
		let price = this.recipeCosts[name] ?? this.Price(kv, "gold") ?? 0;
		if (this.recipes[name]) for (const part of this.recipes[name]) { const value = fill(part, [name]); if (value === undefined) return; price += value; }
		else price = this.Price(kv, "gold")!;
		return price !== undefined && price >= 0 && price < math.huge ? { currency, price, materials } : undefined;
	}
	Action(playerID: PlayerID, request: AthenaShopAction): AthenaShopResult {
		const fail = (error: string): AthenaShopResult => ({ run_id: request.run_id, request_id: request.request_id, success: false, error });
		if (typeof request.request_id !== "string" || request.request_id.length < 1 || request.request_id.length > 96) return fail("InvalidRequest");
		if (!this.running || request.run_id !== this.runId || this.runId !== GameState.GetSession().runId) return fail("StaleRun");
		const hero = Items.Hero(playerID, request.run_id); if (!hero || !hero.IsAlive()) return fail("Unavailable");
		const key = playerID + ":" + request.request_id;
		if (this.results[key]) return this.results[key];
		if (this.busy[playerID]) return fail("Busy");
		this.busy[playerID] = true;
		let error: string | undefined;
		try {
			Items.Sweep(); // 原生拾取叠加可能刚完成，交易前先结清剩余成本和物品栏快照。
			if (request.action === "buy") error = this.Buy(playerID, hero, request.item_name ?? "");
			else if (request.action === "sell") error = this.Sell(playerID, hero, request.item_entity);
			else error = "InvalidRequest";
		} catch (cause) { error = "Failed"; this.error("物品交易失败", cause); }
		finally { this.busy[playerID] = false; }
		const result = { run_id: this.runId, request_id: request.request_id, success: !error, error };
		this.results[key] = result;
		try { Items.Sweep(); } catch (cause) { this.error("交易后背包同步稍后重试", cause); }
		return result;
	}
	private Buy(id: PlayerID, hero: CDOTA_BaseNPC_Hero, name: string): string | undefined {
		if (!this.entries[name] || !Items.Supported(name)) return "ItemUnavailable";
		const quote = this.Quote(hero, name); if (!quote) return "MissingMaterials";
		if ((RunResources.Get(id, quote.currency, this.runId) ?? -1) < quote.price) return "NotEnoughResource";
		const item = Items.Create(id, name, this.runId); if (!item) return "CreateFailed";
		// 先准备可回退的落点；库存满时直接交付地面物品，不吞钱或丢物。
		if (!Items.Drop(item, hero.GetAbsOrigin(), this.runId)) { Items.Destroy(item); return "CreateFailed"; }
		const detached: { item: CDOTA_Item; charges: number; used: number; }[] = []; let paid = false;
		try {
			if (!RunResources.Modify(id, quote.currency, -quote.price, this.runId)) { Items.Destroy(item); return "NotEnoughResource"; }
			paid = true;
			item.__saleGoldValue = quote.currency === "gold" ? quote.price + quote.materials.reduce((total, material) => total + Items.SellGold(material)
				/ (tonumber(KeyValues.items[material.GetAbilityName()]?.ItemStackable) === 1 ? math.max(1, material.GetCurrentCharges()) : 1), 0) : 0;
			item.__saleChargeCount = math.max(1, item.GetCurrentCharges());
			for (const material of quote.materials) if (!detached.some(record => record.item === material)) {
				detached.push({ item: material, charges: material.GetCurrentCharges(), used: quote.materials.filter(part => part === material).length }); hero.TakeItem(material);
			}
			Items.TryGive(hero, item, this.runId);
			for (const record of detached) {
				if (tonumber(KeyValues.items[record.item.GetAbilityName()]?.ItemStackable) === 1 && record.charges > record.used) {
					record.item.SetCurrentCharges(record.charges - record.used);
					let restored = false;
					try { restored = Items.TryGive(hero, record.item, this.runId); } catch (error) { this.error("剩余材料保留在地面", error); }
					if (!restored) Items.Drop(record.item, hero.GetAbsOrigin(), this.runId);
				} else Items.Destroy(record.item);
			}
			return;
		} catch (cause) {
			if (paid) RunResources.Modify(id, quote.currency, quote.price, this.runId);
			Items.Destroy(item);
			for (const record of detached) if (IsValid(record.item)) {
				const material = record.item; material.SetCurrentCharges(record.charges);
				let restored = false;
				try { restored = Items.TryGive(hero, material, this.runId); } catch (error) { this.error("材料放回背包失败，改为落地", error); }
				if (!restored) Items.Drop(material, hero.GetAbsOrigin(), this.runId);
			}
			throw cause;
		}
	}
	private Sell(id: PlayerID, hero: CDOTA_BaseNPC_Hero, index?: EntityIndex): string | undefined {
		const item = EntIndexToHScript(index ?? -1 as EntityIndex) as CDOTA_Item;
		if (!Items.Owns(hero, item) || item.__sold || tonumber(KeyValues.items[item.GetAbilityName()]?.ItemSellable) === 0) return "CannotSell";
		const refund = Items.SellGold(item); item.__sold = true;
		if (!RunResources.Modify(id, "gold", refund, this.runId)) { item.__sold = false; return "Failed"; }
		Items.Destroy(item); return;
	}
	private Reply(id: PlayerID, result: AthenaShopResult) {
		const player = PlayerResource.GetPlayer(id);
		if (IsValid(player)) CustomGameEventManager.Send_ServerToPlayer(player, "athena_shop_result", result);
	}
	reset() {
		this.running = false; this.results = {}; this.busy = {}; this.entries = {}; this.recipes = {}; this.recipeCosts = {};
		CustomNetTables.SetTableValue("common", "shop_catalog", { run_id: this.runId, groups: {} });
	}
}
declare global { var Shop: CShop; }
Shop ??= new CShop();
