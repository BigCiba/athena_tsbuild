import { createSignal, For, Index, onCleanup, onMount, Show } from "solid-js";
import { emptyLowerHudState, HudAction, hudNumber, isCurrentHudAction, LowerHudState, readLowerHudState } from "./lower_hud_state";
import "./LowerHud.less";

interface HudDrag extends Panel {
	overrideentityindex?: ItemEntityIndex;
	m_Slot?: number;
	m_DragType?: string;
	m_DragCompleted?: boolean;
	shopRunId?: number;
}

/** 技能和物品共用显示外壳，原生 API 继续负责目标选择和施法。 */
function ActionSlot(props: { action?: HudAction; slot?: number; state: LowerHudState; runId: number; oncontext: (panel: Panel, item: HudAction) => void; }) {
	let panel!: Panel;
	let disposed = false;
	const current = () => !disposed && props.action && isCurrentHudAction(props.state.unit, props.action, props.runId) ? props.action : undefined;
	const activate = () => {
		const action = current(); if (!action) return;
		if (GameUI.IsAltDown()) { Abilities.PingAbility(action.entity); return; }
		if (!action.item && (GameUI.IsControlDown() || Game.IsInAbilityLearnMode())) {
			if (Abilities.CanAbilityBeUpgraded(action.entity, false) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED) Abilities.AttemptToUpgrade(action.entity);
			return;
		}
		if (action.item && action.slot >= 6) return;
		Abilities.ExecuteAbility(action.entity, props.state.unit, false);
	};
	onMount(() => {
		if (props.slot === undefined) return;
		const start = (_source: PanelBase, callbacks: DragSettings) => {
			const action = current(); if (!action?.item) return false;
			const image = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "") as ItemImage & HudDrag;
			image.itemname = action.name; image.overrideentityindex = action.entity as ItemEntityIndex;
			image.m_Slot = action.slot; image.m_DragType = "InventorySlot"; image.m_DragCompleted = false; image.shopRunId = props.runId;
			image.style.width = "64px"; image.style.height = "46px";
			callbacks.displayPanel = image; callbacks.offsetX = 0; callbacks.offsetY = 0; return true;
		};
		const drop = (_source: PanelBase, display: PanelBase) => {
			const drag = display as HudDrag;
			const unit = props.state.unit;
			if (disposed || props.slot === undefined || drag.overrideentityindex === undefined || drag.shopRunId !== props.runId
				|| !Entities.IsValidEntity(drag.overrideentityindex) || !props.state.controllable || Abilities.GetCaster(drag.overrideentityindex) !== unit) return false;
			const snapshot = getNetDataKey("common", "game_state");
			if (snapshot?.run_id !== props.runId || snapshot.state !== "GameState_Battle" || Players.GetLocalPlayerPortraitUnit() !== unit) return false;
			Game.PrepareUnitOrders({ UnitIndex: unit, OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM, TargetIndex: props.slot as EntityIndex, AbilityIndex: drag.overrideentityindex });
			drag.m_DragCompleted = true; return true;
		};
		const end = (_source: PanelBase, display: PanelBase) => {
			const drag = display as HudDrag, action = current();
			if (action && drag.shopRunId === props.runId && drag.overrideentityindex === action.entity && !drag.m_DragCompleted) Game.DropItemAtCursor(props.state.unit, action.entity as ItemEntityIndex);
			drag.DeleteAsync(0); return true;
		};
		$.RegisterEventHandler("DragStart", panel, start); $.RegisterEventHandler("DragDrop", panel, drop); $.RegisterEventHandler("DragEnd", panel, end);
	});
	onCleanup(() => { disposed = true; });
	const cooldownPercent = () => Math.min(1, (props.action?.cooldown ?? 0) / Math.max(0.1, props.action?.cooldownLength ?? 0, props.action?.cooldown ?? 0));
	return <Panel class="AthenaHudSlot" classList={{ InventoryItem: props.slot !== undefined, BackpackSlot: (props.slot ?? -1) >= 6,
		no_item: !props.action, no_level: !props.action || props.action.level === 0, is_passive: !!props.action?.passive,
		is_active: !!props.action?.active, in_cooldown: (props.action?.cooldown ?? 0) > 0, inactive_item: (props.slot ?? -1) >= 6, insufficient_mana: !!props.action && props.action.mana > props.state.mana,
		show_level_up_tab: !!props.action?.canUpgrade, show_item_charges: !!props.action && props.action.item && props.action.charges > 0,
		no_hotkey: !props.state.controllable || !props.action?.hotkey || !!props.action?.passive }} hittest={false}>
		<Panel id="ButtonAndLevel" hittest={false}><Panel id="ButtonWithLevelUpTab" hittest={false}>
			<Button id="LevelUpTab" visible={!!props.action?.canUpgrade} onactivate={() => { const action = current(); if (action?.canUpgrade) Abilities.AttemptToUpgrade(action.entity); }}>
				<Panel id="LevelUpButton" hittest={false}><Panel id="LevelUpIcon" hittest={false} /></Panel>
			</Button>
			<Panel id="ButtonWell" hittest={false}><Panel id="ButtonSize" hittest={false}>
				<Panel id="AbilityButton" ref={panel} draggable={props.slot !== undefined} onactivate={activate}
					oncontextmenu={self => {
						const action = current(); if (!action) return;
						if (action.item) props.oncontext(self, action);
						else if ((Abilities.GetBehavior(action.entity) & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST) !== 0) {
							Game.PrepareUnitOrders({ UnitIndex: props.state.unit, OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO, AbilityIndex: action.entity });
						}
					}}
					onmouseover={self => { const action = props.action; if (action) $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", self, action.name, props.state.unit); }}
					onmouseout={self => $.DispatchEvent("DOTAHideAbilityTooltip", self)}>
					<Show when={props.action}>{(action: () => HudAction) => <>
						<Show when={action().item} fallback={<DOTAAbilityImage id="AbilityImage" abilityname={action().name} hittest={false} />}>
							<DOTAItemImage id="ItemImage" itemname={action().name} showtooltip={false} hittest={false} />
						</Show>
						<Panel id="AbilityBevel" hittest={false} />
						<Panel id="Cooldown" visible={action().cooldown > 0} hittest={false}>
							<Panel id="CooldownOverlay" style={{ clip: `radial(50% 50%, 0deg, ${-360 * cooldownPercent()}deg)` }} hittest={false} />
							<Label id="CooldownTimer" class="MonoNumbersFont" text={Math.ceil(action().cooldown)} hittest={false} />
						</Panel>
						<Panel id="AbilityStatusOverlay" hittest={false} />
					</>}</Show>
				</Panel>
				<Panel id="CostContainer" hittest={false}><Panel id="CostChildren" hittest={false}>
					<Label id="ManaCost" class="MonoNumbersFont" visible={!!props.action && props.action.mana > 0 && !props.action.passive && !(props.action.item && props.action.charges > 0)} text={hudNumber(props.action?.mana ?? 0)} hittest={false} />
					<Panel id="ItemChargesContainer" hittest={false}><Label id="ItemCharges" text={props.action?.charges ?? 0} hittest={false} /></Panel>
				</Panel></Panel>
			</Panel></Panel>
			<Panel id="HotkeyContainer" hittest={false}><Panel id="Hotkey" hittest={false}><Label id="HotkeyText" text={props.action?.hotkey ?? ""} hittest={false} /></Panel></Panel>
			<Panel class="HudChargeRestore" visible={!!props.action && !props.action.item && props.action.maxCharges > 0} hittest={false}>
				<Label class="MonoNumbersFont" text={props.action?.charges ?? 0} hittest={false} />
				<Label visible={!!props.action && props.action.charges < props.action.maxCharges && props.action.restore > 0} text={` (${Math.ceil(props.action?.restore ?? 0)})`} hittest={false} />
			</Panel>
		</Panel>
		<Show when={props.action && !props.action.item}><Panel id="AbilityLevelContainer" hittest={false}>
			<For each={Array.from({ length: Math.min(10, props.action?.maxLevel ?? 0) }, (_, i) => i)}>{level => <Panel class="LevelPanel" classList={{ active_level: level < Math.ceil((props.action?.level ?? 0) / Math.max(1, (props.action?.maxLevel ?? 1) / 10)) }} hittest={false} />}</For>
		</Panel></Show>
		</Panel>
	</Panel>;
}

/** 官方组件维持原 ID 和层级；不加载依赖整套官方 HUD DOM 的 hud_reborn.js。 */
export function LowerHud(props: { snapshot?: AthenaGameSnapshot; }) {
	const [state, setState] = createSignal(emptyLowerHudState());
	let serial = 0, pending = "", disposed = false;
	const runId = () => props.snapshot?.run_id ?? 0;
	// 官方 219px 左区 + 至少 321px 技能区 + 302px 物品/右饰区。
	const hudWidth = () => 521 + Math.max(321, 68 + Math.min(6, state().abilities.length) * (state().abilities.length >= 5 ? 58 : 65));
	onMount(() => {
		GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
		const update = () => { if (!disposed) setState(readLowerHudState()); };
		update();
		const timer = setInterval(update, 100);
		const events = ["dota_player_update_selected_unit", "dota_player_update_query_unit", "dota_portrait_ability_layout_changed", "dota_inventory_changed", "dota_hero_ability_points_changed"] as const;
		const listeners = events.map(event => GameEvents.Subscribe(event, update));
		const result = GameEvents.Subscribe("athena_shop_result", response => {
			if (response.run_id !== runId() || response.request_id !== pending) return;
			pending = "";
			if (!response.success) ErrorMessage("#ShopError_" + (response.error ?? "Failed"));
		});
		onCleanup(() => { disposed = true; clearInterval(timer); listeners.forEach(listener => GameEvents.Unsubscribe(listener)); GameEvents.Unsubscribe(result); });
	});
	const context = (panel: Panel, action: HudAction) => {
		const unit = state().unit, run = runId();
		const valid = () => !disposed && isCurrentHudAction(unit, action, run);
		const menus: Record<string, () => void> = {};
		if (action.slot < 6) menus["使用"] = () => { if (valid()) Abilities.ExecuteAbility(action.entity, unit, false); };
		menus["丢到地上"] = () => { if (valid()) Game.DropItemAtCursor(unit, action.entity as ItemEntityIndex); };
		const inventory = CustomNetTables.GetTableValue("common", "item_inventory");
		const owned = inventory?.run_id === run ? Object.values(inventory.players[String(Players.GetLocalPlayer())] ?? {}).find(item => item.entity === action.entity) : undefined;
		if (Number(owned?.sellable) === 1 && unit === Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())) {
			menus[`${$.Localize("#AthenaShopSell")} ${owned?.sell_gold ?? 0}`] = () => {
				if (!valid()) return;
				pending = `lower_hud:${run}:${Game.GetGameTime()}:${++serial}`;
				GameEvents.SendCustomEventToServer("athena_shop_action", { action: "sell", run_id: run, request_id: pending, item_entity: action.entity });
			};
		}
		GameUI.CustomUIConfig().showContextMenu(panel, menus, [0, 1]);
	};
	return <Panel id="lower_hud" class="AthenaLowerHud Reborn" classList={{ NoUnit: state().unit < 0, UnitDead: !state().alive, ManyAbilities: state().abilities.length > 6 }}
		hittest={false} visible={props.snapshot?.state === "GameState_Battle" || props.snapshot?.state === "GameState_Settle"}>
		<Panel id="center_with_stats" hittest={false}>
			<Panel id="center_block" classList={{ FiveAbilities: state().abilities.length === 5, SixAbilities: state().abilities.length >= 6, NonHero: !state().hero }} style={{ width: `${hudWidth()}px` }} hittest={false}>
				<Panel id="left_flare" hittest={false} />
				<Panel id="center_bg" style={{ width: `${hudWidth() - 464}px` }} hittest={true} />
				<GenericPanel type="DOTAMultiUnit" id="multiunit" class="PortraitLocation" visible={state().multiSelection} />
				<Panel id="PortraitGroup" hittest={false} visible={!state().multiSelection}>
					<Panel id="PortraitBacker" hittest={false} /><Panel id="PortraitBackerColor" hittest={false} />
					<Panel id="PortraitContainer" hittest={false}>
						<DOTAPortrait id="portraitHUD" class="PortraitLocation" />
						<DOTAPortrait id="portraitHUDOverlay" class="PortraitLocation" hittest={false} />
						<Panel id="SilenceIcon" hittest={false} /><Panel id="MutedIcon" hittest={false} /><Panel id="DeathGradient" hittest={false} />
					</Panel>
				</Panel>
				<GenericPanel type="DOTAHUDDeathPanel" id="death_panel_buyback" visible={!state().alive && state().unit >= 0} />
				<GenericPanel type="DOTAXP" id="xp" hittest={false} />
				<GenericPanel type="DOTAUnitName" id="unitname" hittest={false} />
				<GenericPanel type="DOTALevelUpButton" id="levelup" visible={state().controllable && state().points > 0 && props.snapshot?.state === "GameState_Battle"} />
				<Panel id="stats_container" hittest={false}><Panel id="stats_container_bg" hittest={false} /><Panel id="stats" hittest={false}><Panel id="Aligner" hittest={false}><Panel id="StatContainer" hittest={false}>
					<Index each={[
						{ icon: "damage", label: "攻击力", value: state().attack }, { icon: "attack_speed", label: "攻击速度", value: state().attackSpeed },
						{ icon: "armor", label: "护甲", value: state().armor }, { icon: "magic_resist", label: "伤害减免", value: state().reduction, percent: true },
						{ icon: "move_speed", label: "移动速度", value: state().movement },
					]}>{stat => <Panel class="StatIconLabel" tooltip={`${stat().label}：${stat().value.toFixed(1)}${stat().percent ? "%" : ""}`}>
						<Label class="StatRegionLabel MonoNumbersFont" text={hudNumber(stat().value) + (stat().percent ? "%" : "")} hittest={false} /><Panel id={({ damage: "DamageIcon", attack_speed: "AttackSpeedIcon", armor: "ArmorIcon", magic_resist: "MagicResistanceIcon", move_speed: "MoveSpeedIcon" })[stat().icon]} class="StatIcon" hittest={false} />
					</Panel>}</Index>
				</Panel></Panel></Panel>
				<Panel id="stragiint" class="HudAttributes" visible={state().hero} hittest={false}><Index each={state().attributes}>{(value, i) => <Panel class="HudAttribute" hittest={false}>
					<Panel class={`AttributeIcon Attribute${i}`} hittest={false} /><Label text={hudNumber(value())} hittest={false} />
				</Panel>}</Index></Panel>
				</Panel>
				<Panel id="AbilitiesAndStatBranch" hittest={false}><Panel class="LeftRightFlow" hittest={false}><GenericPanel type="DOTAHudTalentDisplay" id="StatBranch" hittest={false} />
					<Panel id="abilities" hittest={false}><Index each={state().abilities}>{action => <ActionSlot action={action()} state={state()} runId={runId()} oncontext={context} />}</Index></Panel></Panel></Panel>
				<Panel id="health_mana" class="ValidUnit ShowMana" hittest={false}><Panel id="HealthManaContainer" style={{ width: `${hudWidth() - 529}px` }} hittest={false}>
					<Panel id="HealthContainer" hittest={false}>
						<ProgressBar id="HealthProgress" value={state().health / Math.max(1, state().maxHealth)} hittest={false} />
						<Label id="HealthLabel" class="MonoNumbersFont" text={`${hudNumber(state().health)} / ${hudNumber(state().maxHealth)}`} hittest={false} />
						<Label id="HealthRegenLabel" class="MonoNumbersFont" text={`+${state().healthRegen.toFixed(1)}`} hittest={false} />
					</Panel>
					<Panel id="ManaContainer" hittest={false}>
						<ProgressBar id="ManaProgress" value={state().mana / Math.max(1, state().maxMana)} hittest={false} />
						<Label id="ManaLabel" class="MonoNumbersFont" text={`${hudNumber(state().mana)} / ${hudNumber(state().maxMana)}`} hittest={false} />
						<Label id="ManaRegenLabel" class="MonoNumbersFont" text={`+${state().manaRegen.toFixed(1)}`} hittest={false} />
					</Panel>
				</Panel></Panel>
				<Panel id="inventory" hittest={false}><Panel id="inventory_items" hittest={false}><Panel id="InventoryContainer" hittest={false}>
					<Panel id="InventoryBG" class="InventoryBackground" hittest={false} />
					<Panel id="inventory_list_container" hittest={false}>
						<Panel id="inventory_list" hittest={false}><For each={[0, 1, 2]}>{slot => <ActionSlot action={state().items[slot]} slot={slot} state={state()} runId={runId()} oncontext={context} />}</For></Panel>
						<Panel id="inventory_list2" hittest={false}><For each={[3, 4, 5]}>{slot => <ActionSlot action={state().items[slot]} slot={slot} state={state()} runId={runId()} oncontext={context} />}</For></Panel>
					</Panel>
					<Panel id="inventory_backpack_list" hittest={false}><For each={[6, 7, 8]}>{slot => <ActionSlot action={state().items[slot]} slot={slot} state={state()} runId={runId()} oncontext={context} />}</For></Panel>
					<Panel id="BackpackShadow" hittest={false} />
				</Panel></Panel></Panel>
				<Panel id="right_flare" hittest={false} />
			</Panel>
		</Panel>
	</Panel>;
}
