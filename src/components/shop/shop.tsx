import { createEffect, createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import { createToggleWindowSignal } from "../../utils/solid_utils";
import "./legacy/shop/styles.less";

type ItemData = { ItemCost?: string | number; ItemStackable?: string | number; ItemPurchasable?: string | number; CrystalCost?: string | number; ScoreCost?: string | number; Rarity?: string | number; ItemResult?: string; ItemRequirements?: Record<string, string>; };
type ItemDefinitions = Record<string, ItemData>;
interface RecipeNode { name: string; x: number; y: number; }
interface RecipeLine { x: number; y: number; width: number; angle: number; }
const sideGroups = ["DefShop", "PracticeShop"];
const rarityColors = ["#BEBEBE", "#92E47E", "#7F93FC", "#D57BFF", "#FFE195", "#FF9595"];

/** 配方只用于展示；价格和材料消费始终由服务端校验。 */
export function recipeRequirements(definitions: ItemDefinitions) {
	const result: Record<string, string[]> = {};
	for (const data of Object.values(definitions)) {
		if (!data.ItemResult || !data.ItemRequirements) continue;
		const row = Object.keys(data.ItemRequirements).sort()[0];
		if (row !== undefined) result[data.ItemResult] = data.ItemRequirements[row].split(";").map(name => name.trim()).filter(Boolean);
	}
	return result;
}

/** 原版 400×180 三层节点坐标，重复材料保留为独立节点。 */
export function recipeLayout(name: string, recipes: Record<string, string[]>) {
	const nodes: RecipeNode[] = [], lines: RecipeLine[] = [];
	if (!name) return { nodes, lines };
	const required = recipes[name] ?? [], results = Object.keys(recipes).filter(result => recipes[result].includes(name));
	const rows = 1 + Number(required.length > 0) + Number(results.length > 0), blank = (180 - 32 * rows) / (rows + 1);
	const ys = [[0, blank + 16, 0], [blank + 16, blank * 2 + 48, 0], [blank + 16, blank * 2 + 48, blank * 3 + 80]][rows - 1];
	const layers = required.length && !results.length ? [0, 2, 1] : [1, 0, 2], center = { x: 201.5, y: ys[layers[0]] };
	nodes.push({ name, x: 180, y: center.y - 14.5 });
	const add = (names: string[], layer: number, above: boolean) => names.forEach((item, i) => {
		const x = 400 / (names.length * 2) * (i * 2 + 1), y = ys[layer];
		nodes.push({ name: item, x: x - 20, y: y - 14.5 });
		const from = above ? { x: x + 1.5, y } : center, to = above ? center : { x: x + 1.5, y };
		const dx = to.x - from.x, dy = to.y - from.y;
		lines.push({ ...from, width: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) * 180 / Math.PI });
	});
	add(results, layers[1], true); add(required, layers[2], false);
	return { nodes, lines };
}

/** 可负担高亮扣除持有材料；同一叠加实体按次数参与配方。 */
export function displayedPrice(entry: AthenaShopEntry, held: readonly AthenaInventoryItem[], definitions: ItemDefinitions, recipes: Record<string, string[]>) {
	if (entry.currency !== "gold" || !entry.ingredients.length) return entry.price;
	const used = new Map<number, number>();
	const fees: Record<string, number> = {};
	for (const data of Object.values(definitions)) if (data.ItemResult && data.ItemCost !== undefined) fees[data.ItemResult] = Number(data.ItemCost) || 0;
	const full = (name: string, path: string[] = []): number => path.includes(name) || path.length > 12 ? 0
		: (fees[name] ?? (Number(definitions[name]?.ItemCost) || 0)) + (recipes[name] ?? []).reduce((sum, part) => sum + full(part, [...path, name]), 0);
	const discount = (name: string, path: string[] = []): number | undefined => {
		if (path.includes(name) || path.length > 12) return;
		const owned = held.find(item => item.slot < 9 && item.name === name && (used.get(item.entity) ?? 0) < (Number(definitions[name]?.ItemStackable) === 1 ? Math.max(1, item.charges) : 1));
		if (owned) { used.set(owned.entity, (used.get(owned.entity) ?? 0) + 1); return full(name); }
		const data = definitions[name]; if (!data) return;
		if (!recipes[name]) return Number(data.ItemPurchasable) !== 0 && Number(data.ItemCost) > 0 && !(Number(data.CrystalCost) > 0) && !(Number(data.ScoreCost) > 0) ? 0 : undefined;
		let total = 0;
		for (const part of recipes[name]) { const value = discount(part, [...path, name]); if (value === undefined) return; total += value; }
		return total;
	};
	let total = 0;
	for (const name of entry.ingredients) { const value = discount(name); if (value === undefined) return; total += value; }
	return Math.max(0, entry.price - total);
}

function ShopItemImage(props: { name: string; definitions: ItemDefinitions; canPurchase?: boolean; style?: Partial<VCSSStyleDeclaration>; onactivate: () => void; oncontextmenu: () => void; }) {
	const color = () => rarityColors[Number(props.definitions[props.name]?.Rarity)];
	return <Button id={props.name} class="CustomItemImage ShopItem" classList={{ CanPurchase: !!props.canPurchase }} style={props.style}
		onactivate={props.onactivate} oncontextmenu={props.oncontextmenu}
		onmouseover={self => $.DispatchEvent("DOTAShowAbilityTooltip", self, props.name)} onmouseout={self => $.DispatchEvent("DOTAHideAbilityTooltip", self)}>
		<DOTAItemImage id="CustomItemImage" itemname={props.name} showtooltip={false} hittest={false} style={{ width: "100%", height: "100%" }} />
		<Panel id="CustomItemImageBorder" hittest={false} style={{ width: "100%", height: "100%", border: color() ? `2px solid ${color()}` : "0px solid transparent" }} />
	</Button>;
}

interface DragItemPanel extends Panel { overrideentityindex?: ItemEntityIndex; m_Slot?: number; m_DragCompleted?: boolean; m_DragType?: string; shopRunId?: number; }

function StashSlot(props: { slot: number; item?: AthenaInventoryItem; active: boolean; runId: number; onselect: (name: string) => void; oncontext: (panel: Panel, item: AthenaInventoryItem) => void; }) {
	let button!: Panel;
	let disposed = false;
	const current = () => !disposed && props.active && props.item && Entities.IsValidEntity(props.item.entity) && Entities.GetItemInSlot(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), props.slot) === props.item.entity ? props.item : undefined;
	onMount(() => {
		const start = (_panel: PanelBase, callbacks: DragSettings) => {
			const item = current(); if (!item) return false;
			const image = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "dragImage") as ItemImage & DragItemPanel;
			image.itemname = item.name; image.overrideentityindex = item.entity as ItemEntityIndex; image.m_Slot = props.slot;
			image.m_DragType = "InventorySlot"; image.m_DragCompleted = false; image.shopRunId = props.runId;
			callbacks.displayPanel = image; callbacks.offsetX = 0; callbacks.offsetY = 0; return true;
		};
		const drop = (_panel: PanelBase, display: PanelBase) => {
			const dragged = display as DragItemPanel;
			if (disposed || !props.active || (dragged.shopRunId !== undefined && dragged.shopRunId !== props.runId) || dragged.overrideentityindex === undefined || !Entities.IsValidEntity(dragged.overrideentityindex)) return false;
			const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
			if (Abilities.GetCaster(dragged.overrideentityindex) !== hero) return false;
			Game.PrepareUnitOrders({ UnitIndex: hero, OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM, TargetIndex: props.slot as EntityIndex, AbilityIndex: dragged.overrideentityindex });
			dragged.m_DragCompleted = true; return true;
		};
		const end = (_panel: PanelBase, display: PanelBase) => {
			const dragged = display as DragItemPanel;
			const item = current();
			if (item && dragged.shopRunId === props.runId && dragged.overrideentityindex === item.entity && !dragged.m_DragCompleted) Game.DropItemAtCursor(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), item.entity as ItemEntityIndex);
			dragged.DeleteAsync(0); return true;
		};
		$.RegisterEventHandler("DragStart", button, start); $.RegisterEventHandler("DragDrop", button, drop); $.RegisterEventHandler("DragEnd", button, end);
		// 绑定在槽位 Panel 上的原生处理器随 Panel 删除；已经开始的拖拽另行失效。
		onCleanup(() => { disposed = true; });
	});
	return <Panel id={`inventory_slot_${props.slot}`} class="AbilityPanel InventoryItem is_item" classList={{ no_item: !props.item, no_ability: !props.item, show_item_charges: (props.item?.charges ?? 0) > 0 }} hittest={false}>
		<Panel id="ButtonAndLevel" hittest={false}><Panel id="ButtonWithLevelUpTab" hittest={false}><Panel id="ButtonWell" hittest={false}><Panel id="ButtonSize">
			<Panel id="AbilityButton" ref={button} draggable={true} onactivate={() => { const item = current(); if (item) props.onselect(item.name); }}
				oncontextmenu={self => { const item = current(); if (item) props.oncontext(self, item); }}
				onmouseover={self => { const item = current(); if (item) $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", self, item.name, Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())); }}
				onmouseout={self => $.DispatchEvent("DOTAHideAbilityTooltip", self)}>
				<DOTAItemImage id="ItemImage" itemname={props.item?.name ?? ""} showtooltip={false} hittest={false} style={{ width: "100%", height: "100%", visibility: props.item ? "visible" : "collapse" }} />
				<Panel id="AbilityBevel" hittest={false} /><Label id="ItemCharges" text={props.item?.charges ?? 0} hittest={false} /><Panel id="DropTargetHighlight" hittest={false} />
			</Panel>
		</Panel></Panel></Panel></Panel>
	</Panel>;
}

/** reborn 商店用 Solid 重做；原版布局选择器与 LESS 保持一致。 */
export function ShopPanel(props: { snapshot?: AthenaGameSnapshot; }) {
	const [open, setOpen] = createToggleWindowSignal("shop");
	const catalog = useNetTable("common", "shop_catalog"), inventory = useNetTable("common", "item_inventory"), resources = useNetTable("common", "run_resources");
	const definitions = (GameUI.CustomUIConfig().npc_items_custom ?? {}) as ItemDefinitions, recipes = recipeRequirements(definitions);
	const shopDefinitions = GameUI.CustomUIConfig().shops as Record<string, Record<string, number>> | undefined;
	const [selected, setSelected] = createSignal(""), [pending, setPending] = createSignal("");
	const [clock, setClock] = createSignal({ hour: 0, min: 0, day: true });
	let serial = 0;
	const runId = () => props.snapshot?.run_id ?? 0;
	const active = () => props.snapshot?.state === "GameState_Battle" && catalog()?.run_id === runId();
	const balance = () => resources()?.run_id === runId() ? resources()?.players[String(Players.GetLocalPlayer())] : undefined;
	const held = (): AthenaInventoryItem[] => inventory()?.run_id === runId() ? Object.values(inventory()?.players[String(Players.GetLocalPlayer())] ?? {}).map(item => ({ ...item, sellable: Number(item.sellable) === 1 })) : [];
	// 和原版一样从 shops.kv 枚举展示；服务端目录只补充报价，不能决定隐藏哪件商品。
	const groups = () => shopDefinitions ? Object.keys(shopDefinitions).filter(group => Object.keys(shopDefinitions[group]).length > 0) : Object.keys(catalog()?.groups ?? {});
	const offers = (group: string): AthenaShopEntry[] => {
		const quoted = Object.values(catalog()?.groups[group] ?? {}).map(entry => ({ ...entry, ingredients: Object.values(entry.ingredients ?? {}) }));
		if (!shopDefinitions) return quoted;
		return Object.keys(shopDefinitions[group] ?? {}).map(name => {
			const quote = quoted.find(entry => entry.name === name); if (quote) return quote;
			const data = definitions[name] ?? {}, currency = Number(data.CrystalCost) > 0 ? "crystal" : Number(data.ScoreCost) > 0 ? "score" : "gold";
			return { name, currency, price: Number(data[currency === "crystal" ? "CrystalCost" : currency === "score" ? "ScoreCost" : "ItemCost"]) || 0, ingredients: recipes[name] ?? [] };
		});
	};
	const entries = () => [...groups().flatMap(offers), ...Object.values(catalog()?.related ?? {}).map(entry => ({ ...entry, ingredients: Object.values(entry.ingredients ?? {}) }))];
	const entryFor = (name: string) => entries().find(entry => entry.name === name);
	const price = (entry: AthenaShopEntry) => displayedPrice(entry, held(), definitions, recipes);
	const purchasable = (entry: AthenaShopEntry) => (entry.currency !== "gold" || Number(definitions[entry.name]?.ItemPurchasable) !== 0 || entry.ingredients.length > 0) && (entry.price > 0 || entry.ingredients.length > 0);
	const canPurchase = (name: string) => { const entry = entryFor(name), cost = entry && price(entry); return active() && !pending() && !!entry && purchasable(entry) && cost !== undefined && (balance()?.[entry.currency] ?? 0) >= cost; };
	const layout = createMemo(() => recipeLayout(selected(), recipes));
	const report = (error: string) => ErrorMessage("#ShopError_" + error);
	const request = (action: "buy" | "sell", item_name?: string, item_entity?: EntityIndex) => {
		if (!active() || pending()) return;
		if (action === "buy") {
			const entry = entryFor(item_name ?? "");
			if (!entry || !purchasable(entry)) { report("ItemUnavailable"); return; }
			const cost = price(entry); if (cost === undefined) { report("MissingMaterials"); return; }
			if ((balance()?.[entry.currency] ?? 0) < cost) { report("NotEnoughResource"); return; }
		}
		const request_id = `${runId()}:${Game.GetGameTime()}:${++serial}`;
		setPending(request_id);
		GameEvents.SendCustomEventToServer("athena_shop_action", { run_id: runId(), request_id, action, item_name, item_entity });
	};
	const select = (name: string) => { if (active()) setSelected(name); };
	const moveFromStash = (item: AthenaInventoryItem) => {
		if (!active() || !held().some(current => current.entity === item.entity)) return;
		const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
		const slot = Array.from({ length: 9 }, (_, index) => index).find(index => Entities.GetItemInSlot(hero, index) === -1);
		if (slot !== undefined) Game.PrepareUnitOrders({ UnitIndex: hero, OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM, TargetIndex: slot as EntityIndex, AbilityIndex: item.entity as ItemEntityIndex });
	};
	const context = (panel: Panel, item: AthenaInventoryItem) => {
		const menuRun = runId(), valid = () => active() && runId() === menuRun && held().some(current => current.entity === item.entity);
		const menus: Record<string, () => void> = {
			"#AthenaShopInspect": () => { if (valid()) select(item.name); },
			"#AthenaShopRetrieve": () => { if (valid()) moveFromStash(item); },
		};
		if (Number(item.sellable) === 1) menus[`${$.Localize("#AthenaShopSell")} ${item.sell_gold}`] = () => { if (valid()) request("sell", undefined, item.entity); };
		GameUI.CustomUIConfig().showContextMenu(panel, menus, [0, 1]);
	};
	createEffect(() => { runId(); setPending(""); setSelected(""); setOpen(false); });
	onMount(() => {
		const id = GameEvents.Subscribe("athena_shop_result", result => {
			if (result.run_id !== runId() || result.request_id !== pending()) return;
			setPending("");
			if (result.success) Game.EmitSound("General.Buy"); else report(result.error ?? "Failed");
		});
		const check = GameEvents.Subscribe("custom_item_check", event => { if (active()) select(event.itemname); });
		const update = () => {
			const minutes = (((Game.GetDOTATime(false, false) + 155) % 600 + 600) % 600) * 0.04;
			setClock({ hour: Math.floor(minutes), min: Math.floor((minutes % 1) * 60), day: Game.IsDayTime() });
		};
		update(); const timer = setInterval(update, 100);
		onCleanup(() => { GameEvents.Unsubscribe(id); GameEvents.Unsubscribe(check); clearInterval(timer); });
	});
	const icon = (name: string, style?: Partial<VCSSStyleDeclaration>) => <ShopItemImage name={name} definitions={definitions} style={style} canPurchase={canPurchase(name)} onactivate={() => select(name)} oncontextmenu={() => request("buy", name)} />;
	const groupList = (group: string, side: boolean) => <Panel class="ShopItemsList" hittest={false}>
		<Label class="ShopItemsHeader" text={"#ShopGroup_" + group} />
		<Panel class="ShopItemsContainer"><For each={offers(group)}>{entry => side ? <Panel>
			{icon(entry.name)}<Panel class={entry.currency === "crystal" ? "SideCostCrystal" : "SideCostScore"} hittest={false}><Label text={entry.price} style={{ color: entry.currency === "crystal" ? "gradient(linear, 0% 0%, 0% 100%, from(#D7A0E5), to(#e2d3e6))" : "gradient(linear, 0% 0%, 0% 100%, from(#de5d17), to(#eac769))" }} /></Panel>
		</Panel> : icon(entry.name)}</For></Panel>
	</Panel>;
	return <Panel class="ShopRoot Reborn" hittest={false} style={{ zIndex: 60 }}>
		<Panel id="ShopMain" classList={{ ShopOpen: open() && active() }} hittest={false}>
			<Panel class="ShopContainer">
				<Panel class="SideShop">
					<Panel class="ShopHeader"><Label class="HeaderLabel" text="#mystery_store" /></Panel>
					<Panel class="ClockPanel" classList={{ DayTime: clock().day, NightTime: !clock().day }}><Panel class="IconContainer"><Image class="TimeIcon Sun" /><Image class="TimeIcon Moon" /></Panel><Label class="TimeLabel" text={`${String(clock().hour).padStart(2, "0")}:${String(clock().min).padStart(2, "0")}`} /></Panel>
					<Panel id="ShopItemContainer" class="SideShopItemContainer"><For each={groups().filter(group => sideGroups.includes(group))}>{group => groupList(group, true)}</For></Panel>
					<Panel class="MoneyContainer"><For each={[{ currency: "crystal" as const, name: "Crystal", icon: "DefIcon", color: "gradient(linear, 0% 0%, 0% 100%, from(#D7A0E5), to(#e2d3e6))" }, { currency: "score" as const, name: "Score", icon: "PracticeIcon", color: "gradient(linear, 0% 0%, 0% 100%, from(#de5d17), to(#eac769))" }]}>{resource => <Panel style={{ flowChildren: "down", horizontalAlign: "center" }} onmouseover={self => $.DispatchEvent("DOTAShowTextTooltip", self, "#Money" + resource.name + "_Description")} onmouseout={self => $.DispatchEvent("DOTAHideTextTooltip", self)}>
						<Label style={{ horizontalAlign: "center" }} text={"#Money" + resource.name} /><Panel style={{ horizontalAlign: "center", flowChildren: "right" }}><Image class={resource.icon} /><Label style={{ verticalAlign: "center", color: resource.color }} text={Math.floor(balance()?.[resource.currency] ?? 0)} /></Panel>
					</Panel>}</For></Panel>
				</Panel>
				<Panel class="NormalShop"><Panel class="ShopHeader"><Label class="HeaderLabel" text="#Store" /></Panel>
					<Panel id="ShopItemContainer"><For each={groups().filter(group => !sideGroups.includes(group))}>{group => groupList(group, false)}</For></Panel>
					<Panel id="RecipeMain" style={{ width: "100%", height: "180px", backgroundColor: "#00000077", verticalAlign: "bottom", zIndex: 5, backgroundSize: "cover" }}>
						<Panel id="ConnectorsContainer" hittest={false}><For each={layout().lines}>{line => <Panel class="Connector" style={{ width: `${line.width}px`, x: `${line.x}px`, y: `${line.y}px`, transform: `rotateZ(${line.angle}deg)` }} />}</For></Panel>
						<Panel id="ItemsContainer"><For each={layout().nodes}>{node => icon(node.name, { x: `${node.x}px`, y: `${node.y}px` })}</For></Panel>
					</Panel>
				</Panel>
			</Panel>
			<Panel id="stash" class="StashVisible StashActive" hittest={false} style={{ horizontalAlign: "right", height: "176px" }}>
				<Panel id="stash_bg" hittest={false}><Panel id="stash_upper" hittest={false} /><Panel id="stash_lower" hittest={false} /><Panel id="stash_active_lower" hittest={false} /><Label id="title" text="#DOTA_STASH" hittest={false} /></Panel>
				<Button id="grab_all_button" onactivate={self => { if (active()) $.DispatchEvent("DOTAHUDStashGrabAll", self); }}><Label text="#DOTA_Inventory_Grab_All" hittest={false} /></Button>
				<Panel id="stash_row" hittest={false}><For each={[9, 10, 11, 12, 13, 14]}>{slot => <StashSlot slot={slot} item={held().find(item => item.slot === slot)} active={active()} runId={runId()} onselect={select} oncontext={context} />}</For></Panel>
			</Panel>
		</Panel>
	</Panel>;
}
