import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import { createToggleWindowSignal } from "../../utils/solid_utils";
import "./ShopPanel.less";

/** 只发送商品名/物品实体与局号；余额、价格和配方均以服务端快照为准。 */
export function ShopPanel(props: { snapshot?: AthenaGameSnapshot; }) {
	const [open, setOpen] = createToggleWindowSignal("shop");
	const catalog = useNetTable("common", "shop_catalog"), inventory = useNetTable("common", "item_inventory"), resources = useNetTable("common", "run_resources");
	const [group, setGroup] = createSignal("consumables"), [pending, setPending] = createSignal(""), [error, setError] = createSignal("");
	let serial = 0;
	const runId = () => props.snapshot?.run_id ?? 0;
	const active = () => props.snapshot?.state === "GameState_Battle" && catalog()?.run_id === runId();
	const balance = () => resources()?.run_id === runId() ? resources()?.players[String(Players.GetLocalPlayer())] : undefined;
	const groups = () => Object.keys(catalog()?.groups ?? {});
	const selectedGroup = () => groups().includes(group()) ? group() : groups()[0];
	// 原生网表把 Lua 数组传成数字键对象，统一还原成可迭代列表。
	const offers = () => Object.values(catalog()?.groups[selectedGroup()] ?? {});
	const held = () => inventory()?.run_id === runId() ? Object.values(inventory()?.players[String(Players.GetLocalPlayer())] ?? {}) : [];
	const itemName = (name: string) => { const token = "#DOTA_Tooltip_ability_" + name, text = $.Localize(token); return text === token ? name : text; };
	const request = (action: "buy" | "sell", item_name?: string, item_entity?: EntityIndex) => {
		if (!active() || pending()) return;
		const request_id = `${runId()}:${Game.GetGameTime()}:${++serial}`;
		setPending(request_id); setError("");
		GameEvents.SendCustomEventToServer("athena_shop_action", { run_id: runId(), request_id, action, item_name, item_entity });
	};
	createEffect(() => { runId(); setPending(""); setError(""); setOpen(false); });
	onMount(() => {
		const id = GameEvents.Subscribe("athena_shop_result", result => {
			if (result.run_id !== runId() || (pending() && result.request_id !== pending())) return;
			setPending(""); setError(result.success ? "" : "#ShopError_" + (result.error ?? "Failed"));
		});
		onCleanup(() => GameEvents.Unsubscribe(id));
	});
	const currencyToken = (currency: string) => "#CUSTOM_RESOURCE_TYPE_" + (currency === "crystal" ? "CRYSTAL" : currency === "score" ? "SCORE" : "GOLD");
	return <Show when={open() && active()}>
		<Panel id="AthenaShop" hittest={true}>
			<Panel class="ShopHeading"><Label text="#AthenaShopTitle" /><Button class="ShopClose" onactivate={() => setOpen(false)}><Label text="×" /></Button></Panel>
			<Panel class="ShopBalances">
				<Label text="#CUSTOM_RESOURCE_TYPE_GOLD" /><Label text={Math.floor(balance()?.gold ?? 0)} />
				<Label text="#CUSTOM_RESOURCE_TYPE_CRYSTAL" /><Label text={Math.floor(balance()?.crystal ?? 0)} />
				<Label text="#CUSTOM_RESOURCE_TYPE_SCORE" /><Label text={Math.floor(balance()?.score ?? 0)} />
			</Panel>
			<Panel class="ShopTabs"><For each={groups()}>{name => <Button classList={{ Selected: selectedGroup() === name }} onactivate={() => setGroup(name)}><Label text={"#ShopGroup_" + name} /></Button>}</For></Panel>
			<Panel class="ShopOffers"><For each={offers()}>{entry => <Panel class="ShopOffer" classList={{ HasRecipe: Object.keys(entry.ingredients ?? {}).length > 0 }}>
				<DOTAItemImage itemname={entry.name} showtooltip={true} />
				<Panel class="ShopOfferText"><Label text={itemName(entry.name)} /><Panel class="ShopCost"><Label text={entry.price} /><Label text={currencyToken(entry.currency)} /></Panel>
					<Show when={Object.keys(entry.ingredients ?? {}).length > 0}><Panel class="ShopIngredients"><Label text="#AthenaShopMaterials" /><For each={Object.values(entry.ingredients ?? {})}>{name => <DOTAItemImage itemname={name} showtooltip={true} />}</For></Panel></Show>
				</Panel>
				<Button class="ShopBuy" enabled={!pending() && (Object.keys(entry.ingredients ?? {}).length > 0 || (balance()?.[entry.currency] ?? 0) >= entry.price)} onactivate={() => request("buy", entry.name)}><Label text={Object.keys(entry.ingredients ?? {}).length > 0 ? "#AthenaShopCraft" : "#AthenaShopBuy"} /></Button>
			</Panel>}</For></Panel>
			<Label class="ShopInventoryTitle" text="#AthenaShopInventory" />
			<Panel class="ShopInventory"><For each={held()}>{item => <Panel class="ShopOwned">
				<DOTAItemImage itemname={item.name} showtooltip={true} />
				<Label class="ShopCharges" text={item.charges > 1 ? item.charges : ""} />
				<Button enabled={!pending() && Number(item.sellable) === 1} onactivate={() => request("sell", undefined, item.entity)}><Label text={`${$.Localize("#AthenaShopSell")} ${item.sell_gold}`} /></Button>
			</Panel>}</For></Panel>
			<Label class="ShopError" text={error()} />
		</Panel>
	</Show>;
}
