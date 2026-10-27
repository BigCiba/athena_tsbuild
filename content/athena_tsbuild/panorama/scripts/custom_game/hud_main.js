'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var GameVote = require('./GameVote.js');
var solid_utils = require('./solid_utils.js');
var EOM_Button = require('./EOM_Button.js');

function RunResourcesPanel(props) {
  const [resources, _setResources] = libs.createSignal(CustomNetTables.GetTableValue("common", "run_resources"));
  const player = () => {
    const data = resources(),
      state = props.snapshot;
    if (!data || !state || data.run_id !== state.run_id || state.state !== "GameState_Battle" && state.state !== "GameState_Settle") return undefined;
    return data.players[String(Players.GetLocalPlayer())];
  };
  const number = value => Math.floor(value ?? 0).toString();
  const progress = () => Math.min(100, Math.max(0, (player()?.level_exp ?? 0) / (player()?.next_level_exp || 1) * 100));
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "run_resources") {
        _setResources(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return player();
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "AthenaResources",
          hittest: false
        }, null),
        _el$2 = libs.createElement("Panel", {
          "class": "AthenaResourceRow"
        }, _el$);
        libs.createElement("Label", {
          "class": "ResourceName",
          text: "#CUSTOM_RESOURCE_TYPE_GOLD"
        }, _el$2);
        const _el$4 = libs.createElement("Label", {
          id: "AthenaGold",
          "class": "GoldValue",
          get text() {
            return number(player()?.gold);
          }
        }, _el$2);
        libs.createElement("Label", {
          "class": "ResourceName",
          text: "#CUSTOM_RESOURCE_TYPE_CRYSTAL"
        }, _el$2);
        const _el$6 = libs.createElement("Label", {
          id: "AthenaCrystal",
          "class": "CrystalValue",
          get text() {
            return number(player()?.crystal);
          }
        }, _el$2);
        libs.createElement("Label", {
          "class": "ResourceName",
          text: "#CUSTOM_RESOURCE_TYPE_SCORE"
        }, _el$2);
        const _el$8 = libs.createElement("Label", {
          id: "AthenaScore",
          "class": "ScoreValue",
          get text() {
            return number(player()?.score);
          }
        }, _el$2),
        _el$9 = libs.createElement("Panel", {
          "class": "AthenaResourceRow"
        }, _el$),
        _el$0 = libs.createElement("Label", {
          id: "AthenaHeroLevel",
          get text() {
            return `Lv. ${player()?.level ?? 1}`;
          }
        }, _el$9);
        libs.createElement("Label", {
          "class": "ResourceName",
          text: "#CUSTOM_RESOURCE_TYPE_EXP"
        }, _el$9);
        const _el$10 = libs.createElement("Label", {
          id: "AthenaExperience",
          get text() {
            return libs.memo(() => !!player()?.next_level_exp)() ? `${number(player()?.level_exp)} / ${number(player()?.next_level_exp)}` : "MAX";
          }
        }, _el$9),
        _el$11 = libs.createElement("Panel", {
          "class": "AthenaExperienceTrack"
        }, _el$),
        _el$12 = libs.createElement("Panel", {
          "class": "AthenaExperienceFill",
          get style() {
            return {
              width: `${player()?.next_level_exp ? progress() : 100}%`
            };
          }
        }, _el$11);
      libs.effect(_p$ => {
        const _v$ = number(player()?.gold),
          _v$2 = number(player()?.crystal),
          _v$3 = number(player()?.score),
          _v$4 = `Lv. ${player()?.level ?? 1}`,
          _v$5 = libs.memo(() => !!player()?.next_level_exp)() ? `${number(player()?.level_exp)} / ${number(player()?.next_level_exp)}` : "MAX",
          _v$6 = {
            width: `${player()?.next_level_exp ? progress() : 100}%`
          };
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "style", _v$6, _p$._v$6));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined,
        _v$4: undefined,
        _v$5: undefined,
        _v$6: undefined
      });
      return _el$;
    }
  });
}

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const invalid = -1;
function emptyLowerHudState() {
  return {
    unit: invalid,
    controllable: false,
    alive: false,
    hero: false,
    multiSelection: false,
    learnMode: false,
    points: 0,
    abilities: [],
    items: Array.from({
      length: 9
    }),
    health: 0,
    maxHealth: 0,
    mana: 0,
    maxMana: 0,
    healthRegen: 0,
    manaRegen: 0,
    attack: 0,
    attackSpeed: 0,
    armor: 0,
    reduction: 0,
    movement: 0,
    attributes: [0, 0, 0]
  };
}
function hudAttribute(unit, stat) {
  if (!Entities.IsHero(unit)) return 0;
  const p = name => finite(Entities.GetPropertyValue(unit, name, false));
  const original = Math.floor(p("base_" + stat) + (Entities.GetLevel(unit) - 1) * p(stat + "_gain"));
  const base = Math.max(0, original + Math.floor(p("stats_" + stat + "_base") + p("stats_all_base")));
  return Math.max(0, Math.floor((base * (1 + (p("stats_" + stat + "_base_percentage") + p("stats_all_base_percentage")) * 0.01) + p("stats_" + stat + "_bonus") + p("stats_all_bonus")) * (1 + (p("stats_" + stat + "_percentage") + p("stats_all_percentage")) * 0.01)));
}
function readLowerHudState() {
  const unit = Players.GetLocalPlayerPortraitUnit();
  if (unit < 0 || !Entities.IsValidEntity(unit)) return emptyLowerHudState();
  const controllable = Entities.IsControllableByPlayer(unit, Players.GetLocalPlayer());
  const net = getNetDataKey("unit", String(unit));
  const actions = (entity, slot, item) => {
    const charge = Object.values(net?.abilities ?? {}).find(entry => entry.entIndex === entity);
    const maxCharges = item ? 0 : finite(charge?.maxCharge);
    const charges = item ? finite(Items.GetCurrentCharges(entity)) : finite(charge?.charge);
    const restore = charge?.isChargeCooldownFrozen ? finite(charge.chargeFrozenCooldownRemaining) : Math.max(0, finite(charge?.chargeRestoreTime) - Game.GetGameTime());
    return {
      entity,
      name: Abilities.GetAbilityName(entity),
      slot,
      item,
      level: Abilities.GetLevel(entity),
      maxLevel: Abilities.GetMaxLevel(entity),
      cooldown: Math.max(0, finite(Abilities.GetCooldownTimeRemaining(entity)), maxCharges > 0 && charges <= 0 ? restore : 0),
      cooldownLength: Math.max(0, finite(Abilities.GetCooldownLength(entity))),
      mana: Math.max(0, finite(Abilities.GetManaCost(entity))),
      hotkey: item ? slot < 6 ? Game.GetKeybindForInventorySlot(slot) : "" : Abilities.GetKeybind(entity),
      passive: Abilities.IsPassive(entity),
      canUpgrade: !item && controllable && Abilities.CanAbilityBeUpgraded(entity, false) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED,
      active: Abilities.GetToggleState(entity) || Abilities.GetAutoCastState(entity),
      charges,
      maxCharges,
      restore
    };
  };
  const abilities = [];
  for (let slot = 0; slot < Entities.GetAbilityCount(unit); slot++) {
    const entity = Entities.GetAbility(unit, slot);
    if (entity < 0 || !Entities.IsValidEntity(entity) || !Abilities.IsDisplayedAbility(entity)) continue;
    abilities.push(actions(entity, slot, false));
  }
  const items = Array.from({
    length: 9
  }, (_, slot) => {
    const entity = Entities.GetItemInSlot(unit, slot);
    return entity >= 0 && Entities.IsValidEntity(entity) ? actions(entity, slot, true) : undefined;
  });
  const largeHealth = CustomNetTables.GetTableValue("large_number_health", String(unit));
  const maxHealth = Math.max(0, finite(largeHealth?.maximum, Entities.GetMaxHealth(unit)));
  const attributes = [hudAttribute(unit, "strength"), hudAttribute(unit, "agility"), hudAttribute(unit, "intellect")];
  const selected = Players.GetSelectedEntities(Players.GetLocalPlayer());
  const p = name => finite(Entities.GetPropertyValue(unit, name, false));
  return {
    unit,
    controllable,
    alive: Entities.IsAlive(unit),
    hero: Entities.IsHero(unit),
    multiSelection: selected.length > 1 && selected.indexOf(unit) >= 0,
    learnMode: Game.IsInAbilityLearnMode(),
    points: Entities.GetAbilityPoints(unit),
    abilities,
    items,
    attributes,
    health: Math.max(0, Math.min(maxHealth, finite(largeHealth?.current, Entities.GetHealth(unit)))),
    maxHealth,
    mana: Math.max(0, finite(Entities.GetMana(unit))),
    maxMana: Math.max(0, finite(Entities.GetMaxMana(unit))),
    healthRegen: Math.max(0, p("base_health_regen") + attributes[0] * 0.16 + p("base_health_regen_constant") + p("base_health_regen_constant_str")) + p("health_regen_constant") + p("health_regen_percentage") * maxHealth * 0.01,
    manaRegen: Math.max(0, p("base_mana_regen")) + attributes[2] * 0.08 + p("base_mana_regen_constant_int") + p("mana_regen_constant") + p("mana_regen_constant_unique") + p("mana_regen_percentage") * Entities.GetMaxMana(unit) * 0.01,
    attack: (Entities.GetDamageMin(unit) + Entities.GetDamageMax(unit)) * 0.5 + Entities.GetDamageBonus(unit),
    attackSpeed: finite(Entities.GetAttackSpeed(unit)) * 100,
    armor: finite(Entities.GetPhysicalArmorValue(unit)),
    reduction: Math.max(0, p("damage_reduction")),
    movement: finite(Entities.GetMoveSpeedModifier(unit, Entities.GetBaseMoveSpeed(unit)))
  };
}
function hudNumber(value) {
  if (!Number.isFinite(value)) return "0";
  const magnitude = Math.abs(value);
  for (const [threshold, suffix] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]]) {
    if (magnitude >= threshold) return (value / threshold).toFixed(magnitude < threshold * 10 ? 1 : 0).replace(/\.0$/, "") + suffix;
  }
  return String(Math.floor(value));
}
function isCurrentHudAction(unit, action, runId) {
  const session = getNetDataKey("common", "game_state");
  if (!session || session.run_id !== runId || session.state !== "GameState_Battle" || Players.GetLocalPlayerPortraitUnit() !== unit || !Entities.IsValidEntity(unit) || !Entities.IsControllableByPlayer(unit, Players.GetLocalPlayer()) || !Entities.IsValidEntity(action.entity)) return false;
  return action.item ? Entities.GetItemInSlot(unit, action.slot) === action.entity : Entities.GetAbility(unit, action.slot) === action.entity;
}

function ActionSlot(props) {
  let panel;
  let disposed = false;
  const current = () => !disposed && props.action && isCurrentHudAction(props.state.unit, props.action, props.runId) ? props.action : undefined;
  const activate = () => {
    const action = current();
    if (!action) return;
    if (GameUI.IsAltDown()) {
      Abilities.PingAbility(action.entity);
      return;
    }
    if (!action.item && (GameUI.IsControlDown() || Game.IsInAbilityLearnMode())) {
      if (Abilities.CanAbilityBeUpgraded(action.entity, false) === AbilityLearnResult_t.ABILITY_CAN_BE_UPGRADED) Abilities.AttemptToUpgrade(action.entity);
      return;
    }
    if (action.item && action.slot >= 6) return;
    Abilities.ExecuteAbility(action.entity, props.state.unit, false);
  };
  libs.onMount(() => {
    if (props.slot === undefined) return;
    const start = (_source, callbacks) => {
      const action = current();
      if (!action?.item) return false;
      const image = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "");
      image.itemname = action.name;
      image.overrideentityindex = action.entity;
      image.m_Slot = action.slot;
      image.m_DragType = "InventorySlot";
      image.m_DragCompleted = false;
      image.shopRunId = props.runId;
      image.style.width = "64px";
      image.style.height = "46px";
      callbacks.displayPanel = image;
      callbacks.offsetX = 0;
      callbacks.offsetY = 0;
      return true;
    };
    const drop = (_source, display) => {
      const drag = display;
      const unit = props.state.unit;
      if (disposed || props.slot === undefined || drag.overrideentityindex === undefined || drag.shopRunId !== props.runId || !Entities.IsValidEntity(drag.overrideentityindex) || !props.state.controllable || Abilities.GetCaster(drag.overrideentityindex) !== unit) return false;
      const snapshot = getNetDataKey("common", "game_state");
      if (snapshot?.run_id !== props.runId || snapshot.state !== "GameState_Battle" || Players.GetLocalPlayerPortraitUnit() !== unit) return false;
      Game.PrepareUnitOrders({
        UnitIndex: unit,
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
        TargetIndex: props.slot,
        AbilityIndex: drag.overrideentityindex
      });
      drag.m_DragCompleted = true;
      return true;
    };
    const end = (_source, display) => {
      const drag = display,
        action = current();
      if (action && drag.shopRunId === props.runId && drag.overrideentityindex === action.entity && !drag.m_DragCompleted) Game.DropItemAtCursor(props.state.unit, action.entity);
      drag.DeleteAsync(0);
      return true;
    };
    $.RegisterEventHandler("DragStart", panel, start);
    $.RegisterEventHandler("DragDrop", panel, drop);
    $.RegisterEventHandler("DragEnd", panel, end);
  });
  libs.onCleanup(() => {
    disposed = true;
  });
  const cooldownPercent = () => Math.min(1, (props.action?.cooldown ?? 0) / Math.max(0.1, props.action?.cooldownLength ?? 0, props.action?.cooldown ?? 0));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "AthenaHudSlot",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "ButtonAndLevel",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "ButtonWithLevelUpTab",
        hittest: false
      }, _el$2),
      _el$4 = libs.createElement("Button", {
        id: "LevelUpTab"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "LevelUpButton",
        hittest: false
      }, _el$4);
      libs.createElement("Panel", {
        id: "LevelUpIcon",
        hittest: false
      }, _el$5);
      const _el$7 = libs.createElement("Panel", {
        id: "ButtonWell",
        hittest: false
      }, _el$3),
      _el$8 = libs.createElement("Panel", {
        id: "ButtonSize",
        hittest: false
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "AbilityButton",
        get draggable() {
          return props.slot !== undefined;
        }
      }, _el$8),
      _el$0 = libs.createElement("Panel", {
        id: "CostContainer",
        hittest: false
      }, _el$8),
      _el$1 = libs.createElement("Panel", {
        id: "CostChildren",
        hittest: false
      }, _el$0),
      _el$10 = libs.createElement("Label", {
        id: "ManaCost",
        "class": "MonoNumbersFont",
        get text() {
          return hudNumber(props.action?.mana ?? 0);
        },
        hittest: false
      }, _el$1),
      _el$11 = libs.createElement("Panel", {
        id: "ItemChargesContainer",
        hittest: false
      }, _el$1),
      _el$12 = libs.createElement("Label", {
        id: "ItemCharges",
        get text() {
          return props.action?.charges ?? 0;
        },
        hittest: false
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        id: "HotkeyContainer",
        hittest: false
      }, _el$3),
      _el$14 = libs.createElement("Panel", {
        id: "Hotkey",
        hittest: false
      }, _el$13),
      _el$15 = libs.createElement("Label", {
        id: "HotkeyText",
        get text() {
          return props.action?.hotkey ?? "";
        },
        hittest: false
      }, _el$14),
      _el$16 = libs.createElement("Panel", {
        "class": "HudChargeRestore",
        hittest: false
      }, _el$3),
      _el$17 = libs.createElement("Label", {
        "class": "MonoNumbersFont",
        get text() {
          return props.action?.charges ?? 0;
        },
        hittest: false
      }, _el$16),
      _el$18 = libs.createElement("Label", {
        get text() {
          return ` (${Math.ceil(props.action?.restore ?? 0)})`;
        },
        hittest: false
      }, _el$16);
    libs.setProp(_el$4, "onactivate", () => {
      const action = current();
      if (action?.canUpgrade) Abilities.AttemptToUpgrade(action.entity);
    });
    const _ref$ = panel;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$9) : panel = _el$9;
    libs.setProp(_el$9, "onactivate", activate);
    libs.setProp(_el$9, "oncontextmenu", self => {
      const action = current();
      if (!action) return;
      if (action.item) props.oncontext(self, action);else if ((Abilities.GetBehavior(action.entity) & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST) !== 0) {
        Game.PrepareUnitOrders({
          UnitIndex: props.state.unit,
          OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
          AbilityIndex: action.entity
        });
      }
    });
    libs.setProp(_el$9, "onmouseover", self => {
      const action = props.action;
      if (action) $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", self, action.name, props.state.unit);
    });
    libs.setProp(_el$9, "onmouseout", self => $.DispatchEvent("DOTAHideAbilityTooltip", self));
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return props.action;
      },
      children: action => [libs.createComponent(libs.Show, {
        get when() {
          return action().item;
        },
        get fallback() {
          return (() => {
            const _el$26 = libs.createElement("DOTAAbilityImage", {
              id: "AbilityImage",
              get abilityname() {
                return action().name;
              },
              hittest: false
            }, null);
            libs.effect(_$p => libs.setProp(_el$26, "abilityname", action().name, _$p));
            return _el$26;
          })();
        },
        get children() {
          const _el$20 = libs.createElement("DOTAItemImage", {
            id: "ItemImage",
            get itemname() {
              return action().name;
            },
            showtooltip: false,
            hittest: false
          }, null);
          libs.effect(_$p => libs.setProp(_el$20, "itemname", action().name, _$p));
          return _el$20;
        }
      }), libs.createElement("Panel", {
        id: "AbilityBevel",
        hittest: false
      }, null), (() => {
        const _el$22 = libs.createElement("Panel", {
            id: "Cooldown",
            hittest: false
          }, null),
          _el$23 = libs.createElement("Panel", {
            id: "CooldownOverlay",
            get style() {
              return {
                clip: `radial(50% 50%, 0deg, ${-360 * cooldownPercent()}deg)`
              };
            },
            hittest: false
          }, _el$22),
          _el$24 = libs.createElement("Label", {
            id: "CooldownTimer",
            "class": "MonoNumbersFont",
            get text() {
              return Math.ceil(action().cooldown);
            },
            hittest: false
          }, _el$22);
        libs.effect(_p$ => {
          const _v$10 = action().cooldown > 0,
            _v$11 = {
              clip: `radial(50% 50%, 0deg, ${-360 * cooldownPercent()}deg)`
            },
            _v$12 = Math.ceil(action().cooldown);
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$22, "visible", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$23, "style", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$24, "text", _v$12, _p$._v$12));
          return _p$;
        }, {
          _v$10: undefined,
          _v$11: undefined,
          _v$12: undefined
        });
        return _el$22;
      })(), libs.createElement("Panel", {
        id: "AbilityStatusOverlay",
        hittest: false
      }, null)]
    }));
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return props.action && !props.action.item;
      },
      get children() {
        const _el$19 = libs.createElement("Panel", {
          id: "AbilityLevelContainer",
          hittest: false
        }, null);
        libs.insert(_el$19, libs.createComponent(libs.For, {
          get each() {
            return Array.from({
              length: Math.min(10, props.action?.maxLevel ?? 0)
            }, (_, i) => i);
          },
          children: level => (() => {
            const _el$27 = libs.createElement("Panel", {
              "class": "LevelPanel",
              hittest: false
            }, null);
            libs.effect(_$p => libs.setProp(_el$27, "classList", {
              active_level: level < Math.ceil((props.action?.level ?? 0) / Math.max(1, (props.action?.maxLevel ?? 1) / 10))
            }, _$p));
            return _el$27;
          })()
        }));
        return _el$19;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          InventoryItem: props.slot !== undefined,
          BackpackSlot: (props.slot ?? -1) >= 6,
          no_item: !props.action,
          no_level: !props.action || props.action.level === 0,
          is_passive: !!props.action?.passive,
          is_active: !!props.action?.active,
          in_cooldown: (props.action?.cooldown ?? 0) > 0,
          inactive_item: (props.slot ?? -1) >= 6,
          insufficient_mana: !!props.action && props.action.mana > props.state.mana,
          show_level_up_tab: !!props.action?.canUpgrade,
          show_item_charges: !!props.action && props.action.item && props.action.charges > 0,
          no_hotkey: !props.state.controllable || !props.action?.hotkey || !!props.action?.passive
        },
        _v$2 = !!props.action?.canUpgrade,
        _v$3 = props.slot !== undefined,
        _v$4 = !!props.action && props.action.mana > 0 && !props.action.passive && !(props.action.item && props.action.charges > 0),
        _v$5 = hudNumber(props.action?.mana ?? 0),
        _v$6 = props.action?.charges ?? 0,
        _v$7 = props.action?.hotkey ?? "",
        _v$8 = !!props.action && !props.action.item && props.action.maxCharges > 0,
        _v$9 = props.action?.charges ?? 0,
        _v$0 = !!props.action && props.action.charges < props.action.maxCharges && props.action.restore > 0,
        _v$1 = ` (${Math.ceil(props.action?.restore ?? 0)})`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "visible", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "draggable", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "visible", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$15, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "visible", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$17, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$18, "visible", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$18, "text", _v$1, _p$._v$1));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined
    });
    return _el$;
  })();
}
function LowerHud(props) {
  const [state, setState] = libs.createSignal(emptyLowerHudState());
  let serial = 0,
    pending = "",
    disposed = false;
  const runId = () => props.snapshot?.run_id ?? 0;
  const hudWidth = () => 521 + Math.max(321, 68 + Math.min(6, state().abilities.length) * (state().abilities.length >= 5 ? 58 : 65));
  libs.onMount(() => {
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
    const update = () => {
      if (!disposed) setState(readLowerHudState());
    };
    update();
    const timer = setInterval(update, 100);
    const events = ["dota_player_update_selected_unit", "dota_player_update_query_unit", "dota_portrait_ability_layout_changed", "dota_inventory_changed", "dota_hero_ability_points_changed"];
    const listeners = events.map(event => GameEvents.Subscribe(event, update));
    const result = GameEvents.Subscribe("athena_shop_result", response => {
      if (response.run_id !== runId() || response.request_id !== pending) return;
      pending = "";
      if (!response.success) ErrorMessage("#ShopError_" + (response.error ?? "Failed"));
    });
    libs.onCleanup(() => {
      disposed = true;
      clearInterval(timer);
      listeners.forEach(listener => GameEvents.Unsubscribe(listener));
      GameEvents.Unsubscribe(result);
    });
  });
  const context = (panel, action) => {
    const unit = state().unit,
      run = runId();
    const valid = () => !disposed && isCurrentHudAction(unit, action, run);
    const menus = {};
    if (action.slot < 6) menus["使用"] = () => {
      if (valid()) Abilities.ExecuteAbility(action.entity, unit, false);
    };
    menus["丢到地上"] = () => {
      if (valid()) Game.DropItemAtCursor(unit, action.entity);
    };
    const inventory = CustomNetTables.GetTableValue("common", "item_inventory");
    const owned = inventory?.run_id === run ? Object.values(inventory.players[String(Players.GetLocalPlayer())] ?? {}).find(item => item.entity === action.entity) : undefined;
    if (Number(owned?.sellable) === 1 && unit === Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())) {
      menus[`${$.Localize("#AthenaShopSell")} ${owned?.sell_gold ?? 0}`] = () => {
        if (!valid()) return;
        pending = `lower_hud:${run}:${Game.GetGameTime()}:${++serial}`;
        GameEvents.SendCustomEventToServer("athena_shop_action", {
          action: "sell",
          run_id: run,
          request_id: pending,
          item_entity: action.entity
        });
      };
    }
    GameUI.CustomUIConfig().showContextMenu(panel, menus, [0, 1]);
  };
  return (() => {
    const _el$28 = libs.createElement("Panel", {
        id: "lower_hud",
        "class": "AthenaLowerHud Reborn",
        hittest: false
      }, null),
      _el$29 = libs.createElement("Panel", {
        id: "center_with_stats",
        hittest: false
      }, _el$28),
      _el$30 = libs.createElement("Panel", {
        id: "center_block",
        get style() {
          return {
            width: `${hudWidth()}px`
          };
        },
        hittest: false
      }, _el$29);
      libs.createElement("Panel", {
        id: "left_flare",
        hittest: false
      }, _el$30);
      const _el$32 = libs.createElement("Panel", {
        id: "center_bg",
        get style() {
          return {
            width: `${hudWidth() - 464}px`
          };
        },
        hittest: true
      }, _el$30),
      _el$33 = libs.createElement("GenericPanel", {
        type: "DOTAMultiUnit",
        id: "multiunit",
        "class": "PortraitLocation"
      }, _el$30),
      _el$34 = libs.createElement("Panel", {
        id: "PortraitGroup",
        hittest: false
      }, _el$30);
      libs.createElement("Panel", {
        id: "PortraitBacker",
        hittest: false
      }, _el$34);
      libs.createElement("Panel", {
        id: "PortraitBackerColor",
        hittest: false
      }, _el$34);
      const _el$37 = libs.createElement("Panel", {
        id: "PortraitContainer",
        hittest: false
      }, _el$34);
      libs.createElement("DOTAPortrait", {
        id: "portraitHUD",
        "class": "PortraitLocation"
      }, _el$37);
      libs.createElement("DOTAPortrait", {
        id: "portraitHUDOverlay",
        "class": "PortraitLocation",
        hittest: false
      }, _el$37);
      libs.createElement("Panel", {
        id: "SilenceIcon",
        hittest: false
      }, _el$37);
      libs.createElement("Panel", {
        id: "MutedIcon",
        hittest: false
      }, _el$37);
      libs.createElement("Panel", {
        id: "DeathGradient",
        hittest: false
      }, _el$37);
      const _el$43 = libs.createElement("GenericPanel", {
        type: "DOTAHUDDeathPanel",
        id: "death_panel_buyback"
      }, _el$30);
      libs.createElement("GenericPanel", {
        type: "DOTAXP",
        id: "xp",
        hittest: false
      }, _el$30);
      libs.createElement("GenericPanel", {
        type: "DOTAUnitName",
        id: "unitname",
        hittest: false
      }, _el$30);
      const _el$46 = libs.createElement("GenericPanel", {
        type: "DOTALevelUpButton",
        id: "levelup"
      }, _el$30),
      _el$47 = libs.createElement("Panel", {
        id: "stats_container",
        hittest: false
      }, _el$30);
      libs.createElement("Panel", {
        id: "stats_container_bg",
        hittest: false
      }, _el$47);
      const _el$49 = libs.createElement("Panel", {
        id: "stats",
        hittest: false
      }, _el$47),
      _el$50 = libs.createElement("Panel", {
        id: "Aligner",
        hittest: false
      }, _el$49),
      _el$51 = libs.createElement("Panel", {
        id: "StatContainer",
        hittest: false
      }, _el$50),
      _el$52 = libs.createElement("Panel", {
        id: "stragiint",
        "class": "HudAttributes",
        hittest: false
      }, _el$47),
      _el$53 = libs.createElement("Panel", {
        id: "AbilitiesAndStatBranch",
        hittest: false
      }, _el$30),
      _el$54 = libs.createElement("Panel", {
        "class": "LeftRightFlow",
        hittest: false
      }, _el$53);
      libs.createElement("GenericPanel", {
        type: "DOTAHudTalentDisplay",
        id: "StatBranch",
        hittest: false
      }, _el$54);
      const _el$56 = libs.createElement("Panel", {
        id: "abilities",
        hittest: false
      }, _el$54),
      _el$57 = libs.createElement("Panel", {
        id: "health_mana",
        "class": "ValidUnit ShowMana",
        hittest: false
      }, _el$30),
      _el$58 = libs.createElement("Panel", {
        id: "HealthManaContainer",
        get style() {
          return {
            width: `${hudWidth() - 529}px`
          };
        },
        hittest: false
      }, _el$57),
      _el$59 = libs.createElement("Panel", {
        id: "HealthContainer",
        hittest: false
      }, _el$58),
      _el$60 = libs.createElement("ProgressBar", {
        id: "HealthProgress",
        get value() {
          return state().health / Math.max(1, state().maxHealth);
        },
        hittest: false
      }, _el$59),
      _el$61 = libs.createElement("Label", {
        id: "HealthLabel",
        "class": "MonoNumbersFont",
        get text() {
          return `${hudNumber(state().health)} / ${hudNumber(state().maxHealth)}`;
        },
        hittest: false
      }, _el$59),
      _el$62 = libs.createElement("Label", {
        id: "HealthRegenLabel",
        "class": "MonoNumbersFont",
        get text() {
          return `+${state().healthRegen.toFixed(1)}`;
        },
        hittest: false
      }, _el$59),
      _el$63 = libs.createElement("Panel", {
        id: "ManaContainer",
        hittest: false
      }, _el$58),
      _el$64 = libs.createElement("ProgressBar", {
        id: "ManaProgress",
        get value() {
          return state().mana / Math.max(1, state().maxMana);
        },
        hittest: false
      }, _el$63),
      _el$65 = libs.createElement("Label", {
        id: "ManaLabel",
        "class": "MonoNumbersFont",
        get text() {
          return `${hudNumber(state().mana)} / ${hudNumber(state().maxMana)}`;
        },
        hittest: false
      }, _el$63),
      _el$66 = libs.createElement("Label", {
        id: "ManaRegenLabel",
        "class": "MonoNumbersFont",
        get text() {
          return `+${state().manaRegen.toFixed(1)}`;
        },
        hittest: false
      }, _el$63),
      _el$67 = libs.createElement("Panel", {
        id: "inventory",
        hittest: false
      }, _el$30),
      _el$68 = libs.createElement("Panel", {
        id: "inventory_items",
        hittest: false
      }, _el$67),
      _el$69 = libs.createElement("Panel", {
        id: "InventoryContainer",
        hittest: false
      }, _el$68);
      libs.createElement("Panel", {
        id: "InventoryBG",
        "class": "InventoryBackground",
        hittest: false
      }, _el$69);
      const _el$71 = libs.createElement("Panel", {
        id: "inventory_list_container",
        hittest: false
      }, _el$69),
      _el$72 = libs.createElement("Panel", {
        id: "inventory_list",
        hittest: false
      }, _el$71),
      _el$73 = libs.createElement("Panel", {
        id: "inventory_list2",
        hittest: false
      }, _el$71),
      _el$74 = libs.createElement("Panel", {
        id: "inventory_backpack_list",
        hittest: false
      }, _el$69);
      libs.createElement("Panel", {
        id: "BackpackShadow",
        hittest: false
      }, _el$69);
      libs.createElement("Panel", {
        id: "right_flare",
        hittest: false
      }, _el$30);
    libs.insert(_el$51, libs.createComponent(libs.Index, {
      get each() {
        return [{
          icon: "damage",
          label: "攻击力",
          value: state().attack
        }, {
          icon: "attack_speed",
          label: "攻击速度",
          value: state().attackSpeed
        }, {
          icon: "armor",
          label: "护甲",
          value: state().armor
        }, {
          icon: "magic_resist",
          label: "伤害减免",
          value: state().reduction,
          percent: true
        }, {
          icon: "move_speed",
          label: "移动速度",
          value: state().movement
        }];
      },
      children: stat => (() => {
        const _el$77 = libs.createElement("Panel", {
            "class": "StatIconLabel"
          }, null),
          _el$78 = libs.createElement("Label", {
            "class": "StatRegionLabel MonoNumbersFont",
            get text() {
              return hudNumber(stat().value) + (stat().percent ? "%" : "");
            },
            hittest: false
          }, _el$77),
          _el$79 = libs.createElement("Panel", {
            get id() {
              return {
                damage: "DamageIcon",
                attack_speed: "AttackSpeedIcon",
                armor: "ArmorIcon",
                magic_resist: "MagicResistanceIcon",
                move_speed: "MoveSpeedIcon"
              }[stat().icon];
            },
            "class": "StatIcon",
            hittest: false
          }, _el$77);
        libs.effect(_p$ => {
          const _v$30 = `${stat().label}：${stat().value.toFixed(1)}${stat().percent ? "%" : ""}`,
            _v$31 = hudNumber(stat().value) + (stat().percent ? "%" : ""),
            _v$32 = {
              damage: "DamageIcon",
              attack_speed: "AttackSpeedIcon",
              armor: "ArmorIcon",
              magic_resist: "MagicResistanceIcon",
              move_speed: "MoveSpeedIcon"
            }[stat().icon];
          _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$77, "tooltip", _v$30, _p$._v$30));
          _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$78, "text", _v$31, _p$._v$31));
          _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$79, "id", _v$32, _p$._v$32));
          return _p$;
        }, {
          _v$30: undefined,
          _v$31: undefined,
          _v$32: undefined
        });
        return _el$77;
      })()
    }));
    libs.insert(_el$52, libs.createComponent(libs.Index, {
      get each() {
        return state().attributes;
      },
      children: (value, i) => (() => {
        const _el$80 = libs.createElement("Panel", {
            "class": "HudAttribute",
            hittest: false
          }, null),
          _el$81 = libs.createElement("Panel", {
            "class": `AttributeIcon Attribute${i}`,
            hittest: false
          }, _el$80),
          _el$82 = libs.createElement("Label", {
            get text() {
              return hudNumber(value());
            },
            hittest: false
          }, _el$80);
        libs.setProp(_el$81, "class", `AttributeIcon Attribute${i}`);
        libs.effect(_$p => libs.setProp(_el$82, "text", hudNumber(value()), _$p));
        return _el$80;
      })()
    }));
    libs.insert(_el$56, libs.createComponent(libs.Index, {
      get each() {
        return state().abilities;
      },
      children: action => libs.createComponent(ActionSlot, {
        get action() {
          return action();
        },
        get state() {
          return state();
        },
        get runId() {
          return runId();
        },
        oncontext: context
      })
    }));
    libs.insert(_el$72, libs.createComponent(libs.For, {
      each: [0, 1, 2],
      children: slot => libs.createComponent(ActionSlot, {
        get action() {
          return state().items[slot];
        },
        slot: slot,
        get state() {
          return state();
        },
        get runId() {
          return runId();
        },
        oncontext: context
      })
    }));
    libs.insert(_el$73, libs.createComponent(libs.For, {
      each: [3, 4, 5],
      children: slot => libs.createComponent(ActionSlot, {
        get action() {
          return state().items[slot];
        },
        slot: slot,
        get state() {
          return state();
        },
        get runId() {
          return runId();
        },
        oncontext: context
      })
    }));
    libs.insert(_el$74, libs.createComponent(libs.For, {
      each: [6, 7, 8],
      children: slot => libs.createComponent(ActionSlot, {
        get action() {
          return state().items[slot];
        },
        slot: slot,
        get state() {
          return state();
        },
        get runId() {
          return runId();
        },
        oncontext: context
      })
    }));
    libs.effect(_p$ => {
      const _v$13 = {
          NoUnit: state().unit < 0,
          UnitDead: !state().alive,
          ManyAbilities: state().abilities.length > 6
        },
        _v$14 = props.snapshot?.state === "GameState_Battle" || props.snapshot?.state === "GameState_Settle",
        _v$15 = {
          FiveAbilities: state().abilities.length === 5,
          SixAbilities: state().abilities.length >= 6,
          NonHero: !state().hero
        },
        _v$16 = {
          width: `${hudWidth()}px`
        },
        _v$17 = {
          width: `${hudWidth() - 464}px`
        },
        _v$18 = state().multiSelection,
        _v$19 = !state().multiSelection,
        _v$20 = !state().alive && state().unit >= 0,
        _v$21 = state().controllable && state().points > 0 && props.snapshot?.state === "GameState_Battle",
        _v$22 = state().hero,
        _v$23 = {
          width: `${hudWidth() - 529}px`
        },
        _v$24 = state().health / Math.max(1, state().maxHealth),
        _v$25 = `${hudNumber(state().health)} / ${hudNumber(state().maxHealth)}`,
        _v$26 = `+${state().healthRegen.toFixed(1)}`,
        _v$27 = state().mana / Math.max(1, state().maxMana),
        _v$28 = `${hudNumber(state().mana)} / ${hudNumber(state().maxMana)}`,
        _v$29 = `+${state().manaRegen.toFixed(1)}`;
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$28, "classList", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$28, "visible", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$30, "classList", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$30, "style", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$32, "style", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$33, "visible", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$34, "visible", _v$19, _p$._v$19));
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$43, "visible", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$46, "visible", _v$21, _p$._v$21));
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$52, "visible", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$58, "style", _v$23, _p$._v$23));
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$60, "value", _v$24, _p$._v$24));
      _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$61, "text", _v$25, _p$._v$25));
      _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$62, "text", _v$26, _p$._v$26));
      _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$64, "value", _v$27, _p$._v$27));
      _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$65, "text", _v$28, _p$._v$28));
      _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$66, "text", _v$29, _p$._v$29));
      return _p$;
    }, {
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined,
      _v$18: undefined,
      _v$19: undefined,
      _v$20: undefined,
      _v$21: undefined,
      _v$22: undefined,
      _v$23: undefined,
      _v$24: undefined,
      _v$25: undefined,
      _v$26: undefined,
      _v$27: undefined,
      _v$28: undefined,
      _v$29: undefined
    });
    return _el$28;
  })();
}

const sideGroups = ["DefShop", "PracticeShop"];
const rarityColors = ["#BEBEBE", "#92E47E", "#7F93FC", "#D57BFF", "#FFE195", "#FF9595"];
function recipeRequirements(definitions) {
  const result = {};
  for (const data of Object.values(definitions)) {
    if (!data.ItemResult || !data.ItemRequirements) continue;
    const row = Object.keys(data.ItemRequirements).sort()[0];
    if (row !== undefined) result[data.ItemResult] = data.ItemRequirements[row].split(";").map(name => name.trim()).filter(Boolean);
  }
  return result;
}
function recipeLayout(name, recipes) {
  const nodes = [],
    lines = [];
  if (!name) return {
    nodes,
    lines
  };
  const required = recipes[name] ?? [],
    results = Object.keys(recipes).filter(result => recipes[result].includes(name));
  const rows = 1 + Number(required.length > 0) + Number(results.length > 0),
    blank = (180 - 32 * rows) / (rows + 1);
  const ys = [[0, blank + 16, 0], [blank + 16, blank * 2 + 48, 0], [blank + 16, blank * 2 + 48, blank * 3 + 80]][rows - 1];
  const layers = required.length && !results.length ? [0, 2, 1] : [1, 0, 2],
    center = {
      x: 201.5,
      y: ys[layers[0]]
    };
  nodes.push({
    name,
    x: 180,
    y: center.y - 14.5
  });
  const add = (names, layer, above) => names.forEach((item, i) => {
    const x = 400 / (names.length * 2) * (i * 2 + 1),
      y = ys[layer];
    nodes.push({
      name: item,
      x: x - 20,
      y: y - 14.5
    });
    const from = above ? {
        x: x + 1.5,
        y
      } : center,
      to = above ? center : {
        x: x + 1.5,
        y
      };
    const dx = to.x - from.x,
      dy = to.y - from.y;
    lines.push({
      ...from,
      width: Math.sqrt(dx * dx + dy * dy),
      angle: Math.atan2(dy, dx) * 180 / Math.PI
    });
  });
  add(results, layers[1], true);
  add(required, layers[2], false);
  return {
    nodes,
    lines
  };
}
function displayedPrice(entry, held, definitions, recipes) {
  if (entry.currency !== "gold" || !entry.ingredients.length) return entry.price;
  const used = new Map();
  const fees = {};
  for (const data of Object.values(definitions)) if (data.ItemResult && data.ItemCost !== undefined) fees[data.ItemResult] = Number(data.ItemCost) || 0;
  const full = (name, path = []) => path.includes(name) || path.length > 12 ? 0 : (fees[name] ?? (Number(definitions[name]?.ItemCost) || 0)) + (recipes[name] ?? []).reduce((sum, part) => sum + full(part, [...path, name]), 0);
  const discount = (name, path = []) => {
    if (path.includes(name) || path.length > 12) return;
    const owned = held.find(item => item.slot < 9 && item.name === name && (used.get(item.entity) ?? 0) < (Number(definitions[name]?.ItemStackable) === 1 ? Math.max(1, item.charges) : 1));
    if (owned) {
      used.set(owned.entity, (used.get(owned.entity) ?? 0) + 1);
      return full(name);
    }
    const data = definitions[name];
    if (!data) return;
    if (!recipes[name]) return Number(data.ItemPurchasable) !== 0 && Number(data.ItemCost) > 0 && !(Number(data.CrystalCost) > 0) && !(Number(data.ScoreCost) > 0) ? 0 : undefined;
    let total = 0;
    for (const part of recipes[name]) {
      const value = discount(part, [...path, name]);
      if (value === undefined) return;
      total += value;
    }
    return total;
  };
  let total = 0;
  for (const name of entry.ingredients) {
    const value = discount(name);
    if (value === undefined) return;
    total += value;
  }
  return Math.max(0, entry.price - total);
}
function ShopItemImage(props) {
  const color = () => rarityColors[Number(props.definitions[props.name]?.Rarity)];
  return (() => {
    const _el$ = libs.createElement("Button", {
        get id() {
          return props.name;
        },
        "class": "CustomItemImage ShopItem",
        get style() {
          return props.style;
        },
        get onactivate() {
          return props.onactivate;
        },
        get oncontextmenu() {
          return props.oncontextmenu;
        }
      }, null),
      _el$2 = libs.createElement("DOTAItemImage", {
        id: "CustomItemImage",
        get itemname() {
          return props.name;
        },
        showtooltip: false,
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "CustomItemImageBorder",
        hittest: false,
        get style() {
          return {
            width: "100%",
            height: "100%",
            border: color() ? `2px solid ${color()}` : "0px solid transparent"
          };
        }
      }, _el$);
    libs.setProp(_el$, "onmouseover", self => $.DispatchEvent("DOTAShowAbilityTooltip", self, props.name));
    libs.setProp(_el$, "onmouseout", self => $.DispatchEvent("DOTAHideAbilityTooltip", self));
    libs.setProp(_el$2, "style", {
      width: "100%",
      height: "100%"
    });
    libs.effect(_p$ => {
      const _v$ = props.name,
        _v$2 = {
          CanPurchase: !!props.canPurchase
        },
        _v$3 = props.style,
        _v$4 = props.onactivate,
        _v$5 = props.oncontextmenu,
        _v$6 = props.name,
        _v$7 = {
          width: "100%",
          height: "100%",
          border: color() ? `2px solid ${color()}` : "0px solid transparent"
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "classList", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "style", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$, "onactivate", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$, "oncontextmenu", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$2, "itemname", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$3, "style", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$;
  })();
}
function StashSlot(props) {
  let button;
  let disposed = false;
  const current = () => !disposed && props.active && props.item && Entities.IsValidEntity(props.item.entity) && Entities.GetItemInSlot(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), props.slot) === props.item.entity ? props.item : undefined;
  libs.onMount(() => {
    const start = (_panel, callbacks) => {
      const item = current();
      if (!item) return false;
      const image = $.CreatePanel("DOTAItemImage", $.GetContextPanel(), "dragImage");
      image.itemname = item.name;
      image.overrideentityindex = item.entity;
      image.m_Slot = props.slot;
      image.m_DragType = "InventorySlot";
      image.m_DragCompleted = false;
      image.shopRunId = props.runId;
      callbacks.displayPanel = image;
      callbacks.offsetX = 0;
      callbacks.offsetY = 0;
      return true;
    };
    const drop = (_panel, display) => {
      const dragged = display;
      if (disposed || !props.active || dragged.shopRunId !== undefined && dragged.shopRunId !== props.runId || dragged.overrideentityindex === undefined || !Entities.IsValidEntity(dragged.overrideentityindex)) return false;
      const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
      if (Abilities.GetCaster(dragged.overrideentityindex) !== hero) return false;
      Game.PrepareUnitOrders({
        UnitIndex: hero,
        OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
        TargetIndex: props.slot,
        AbilityIndex: dragged.overrideentityindex
      });
      dragged.m_DragCompleted = true;
      return true;
    };
    const end = (_panel, display) => {
      const dragged = display;
      const item = current();
      if (item && dragged.shopRunId === props.runId && dragged.overrideentityindex === item.entity && !dragged.m_DragCompleted) Game.DropItemAtCursor(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()), item.entity);
      dragged.DeleteAsync(0);
      return true;
    };
    $.RegisterEventHandler("DragStart", button, start);
    $.RegisterEventHandler("DragDrop", button, drop);
    $.RegisterEventHandler("DragEnd", button, end);
    libs.onCleanup(() => {
      disposed = true;
    });
  });
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        get id() {
          return `inventory_slot_${props.slot}`;
        },
        "class": "AbilityPanel InventoryItem is_item",
        hittest: false
      }, null),
      _el$5 = libs.createElement("Panel", {
        id: "ButtonAndLevel",
        hittest: false
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "ButtonWithLevelUpTab",
        hittest: false
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "ButtonWell",
        hittest: false
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "ButtonSize"
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "AbilityButton",
        draggable: true
      }, _el$8),
      _el$0 = libs.createElement("DOTAItemImage", {
        id: "ItemImage",
        get itemname() {
          return props.item?.name ?? "";
        },
        showtooltip: false,
        hittest: false,
        get style() {
          return {
            width: "100%",
            height: "100%",
            visibility: props.item ? "visible" : "collapse"
          };
        }
      }, _el$9);
      libs.createElement("Panel", {
        id: "AbilityBevel",
        hittest: false
      }, _el$9);
      const _el$10 = libs.createElement("Label", {
        id: "ItemCharges",
        get text() {
          return props.item?.charges ?? 0;
        },
        hittest: false
      }, _el$9);
      libs.createElement("Panel", {
        id: "DropTargetHighlight",
        hittest: false
      }, _el$9);
    const _ref$ = button;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$9) : button = _el$9;
    libs.setProp(_el$9, "onactivate", () => {
      const item = current();
      if (item) props.onselect(item.name);
    });
    libs.setProp(_el$9, "oncontextmenu", self => {
      const item = current();
      if (item) props.oncontext(self, item);
    });
    libs.setProp(_el$9, "onmouseover", self => {
      const item = current();
      if (item) $.DispatchEvent("DOTAShowAbilityTooltipForEntityIndex", self, item.name, Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
    });
    libs.setProp(_el$9, "onmouseout", self => $.DispatchEvent("DOTAHideAbilityTooltip", self));
    libs.effect(_p$ => {
      const _v$8 = `inventory_slot_${props.slot}`,
        _v$9 = {
          no_item: !props.item,
          no_ability: !props.item,
          show_item_charges: (props.item?.charges ?? 0) > 0
        },
        _v$0 = props.item?.name ?? "",
        _v$1 = {
          width: "100%",
          height: "100%",
          visibility: props.item ? "visible" : "collapse"
        },
        _v$10 = props.item?.charges ?? 0;
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$4, "id", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$4, "classList", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$0, "itemname", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$0, "style", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$10, "text", _v$10, _p$._v$10));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined
    });
    return _el$4;
  })();
}
function ShopPanel(props) {
  const [open, setOpen] = solid_utils.createToggleWindowSignal("shop");
  const [catalog, _setCatalog] = libs.createSignal(CustomNetTables.GetTableValue("common", "shop_catalog")),
    [inventory, _setInventory] = libs.createSignal(CustomNetTables.GetTableValue("common", "item_inventory")),
    [resources, _setResources] = libs.createSignal(CustomNetTables.GetTableValue("common", "run_resources"));
  const definitions = GameUI.CustomUIConfig().npc_items_custom ?? {},
    recipes = recipeRequirements(definitions);
  const shopDefinitions = GameUI.CustomUIConfig().shops;
  const [selected, setSelected] = libs.createSignal(""),
    [pending, setPending] = libs.createSignal("");
  const [clock, setClock] = libs.createSignal({
    hour: 0,
    min: 0,
    day: true
  });
  let serial = 0;
  const runId = () => props.snapshot?.run_id ?? 0;
  const active = () => props.snapshot?.state === "GameState_Battle" && catalog()?.run_id === runId();
  const balance = () => resources()?.run_id === runId() ? resources()?.players[String(Players.GetLocalPlayer())] : undefined;
  const held = () => inventory()?.run_id === runId() ? Object.values(inventory()?.players[String(Players.GetLocalPlayer())] ?? {}).map(item => ({
    ...item,
    sellable: Number(item.sellable) === 1
  })) : [];
  const groups = () => shopDefinitions ? Object.keys(shopDefinitions).filter(group => Object.keys(shopDefinitions[group]).length > 0) : Object.keys(catalog()?.groups ?? {});
  const offers = group => {
    const quoted = Object.values(catalog()?.groups[group] ?? {}).map(entry => ({
      ...entry,
      ingredients: Object.values(entry.ingredients ?? {})
    }));
    if (!shopDefinitions) return quoted;
    return Object.keys(shopDefinitions[group] ?? {}).map(name => {
      const quote = quoted.find(entry => entry.name === name);
      if (quote) return quote;
      const data = definitions[name] ?? {},
        currency = Number(data.CrystalCost) > 0 ? "crystal" : Number(data.ScoreCost) > 0 ? "score" : "gold";
      return {
        name,
        currency,
        price: Number(data[currency === "crystal" ? "CrystalCost" : currency === "score" ? "ScoreCost" : "ItemCost"]) || 0,
        ingredients: recipes[name] ?? []
      };
    });
  };
  const entries = () => [...groups().flatMap(offers), ...Object.values(catalog()?.related ?? {}).map(entry => ({
    ...entry,
    ingredients: Object.values(entry.ingredients ?? {})
  }))];
  const entryFor = name => entries().find(entry => entry.name === name);
  const price = entry => displayedPrice(entry, held(), definitions, recipes);
  const purchasable = entry => (entry.currency !== "gold" || Number(definitions[entry.name]?.ItemPurchasable) !== 0 || entry.ingredients.length > 0) && (entry.price > 0 || entry.ingredients.length > 0);
  const canPurchase = name => {
    const entry = entryFor(name),
      cost = entry && price(entry);
    return active() && !pending() && !!entry && purchasable(entry) && cost !== undefined && (balance()?.[entry.currency] ?? 0) >= cost;
  };
  const layout = libs.createMemo(() => recipeLayout(selected(), recipes));
  const report = error => ErrorMessage("#ShopError_" + error);
  const request = (action, item_name, item_entity) => {
    if (!active() || pending()) return;
    if (action === "buy") {
      const entry = entryFor(item_name ?? "");
      if (!entry || !purchasable(entry)) {
        report("ItemUnavailable");
        return;
      }
      const cost = price(entry);
      if (cost === undefined) {
        report("MissingMaterials");
        return;
      }
      if ((balance()?.[entry.currency] ?? 0) < cost) {
        report("NotEnoughResource");
        return;
      }
    }
    const request_id = `${runId()}:${Game.GetGameTime()}:${++serial}`;
    setPending(request_id);
    GameEvents.SendCustomEventToServer("athena_shop_action", {
      run_id: runId(),
      request_id,
      action,
      item_name,
      item_entity
    });
  };
  const select = name => {
    if (active()) setSelected(name);
  };
  const moveFromStash = item => {
    if (!active() || !held().some(current => current.entity === item.entity)) return;
    const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
    const slot = Array.from({
      length: 9
    }, (_, index) => index).find(index => Entities.GetItemInSlot(hero, index) === -1);
    if (slot !== undefined) Game.PrepareUnitOrders({
      UnitIndex: hero,
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_ITEM,
      TargetIndex: slot,
      AbilityIndex: item.entity
    });
  };
  const context = (panel, item) => {
    const menuRun = runId(),
      valid = () => active() && runId() === menuRun && held().some(current => current.entity === item.entity);
    const menus = {
      "#AthenaShopInspect": () => {
        if (valid()) select(item.name);
      },
      "#AthenaShopRetrieve": () => {
        if (valid()) moveFromStash(item);
      }
    };
    if (Number(item.sellable) === 1) menus[`${$.Localize("#AthenaShopSell")} ${item.sell_gold}`] = () => {
      if (valid()) request("sell", undefined, item.entity);
    };
    GameUI.CustomUIConfig().showContextMenu(panel, menus, [0, 1]);
  };
  libs.createEffect(() => {
    runId();
    setPending("");
    setSelected("");
    setOpen(false);
  });
  libs.onMount(() => {
    const id = GameEvents.Subscribe("athena_shop_result", result => {
      if (result.run_id !== runId() || result.request_id !== pending()) return;
      setPending("");
      if (result.success) Game.EmitSound("General.Buy");else report(result.error ?? "Failed");
    });
    const check = GameEvents.Subscribe("custom_item_check", event => {
      if (active()) select(event.itemname);
    });
    const update = () => {
      const minutes = ((Game.GetDOTATime(false, false) + 155) % 600 + 600) % 600 * 0.04;
      setClock({
        hour: Math.floor(minutes),
        min: Math.floor(minutes % 1 * 60),
        day: Game.IsDayTime()
      });
    };
    update();
    const timer = setInterval(update, 100);
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
      GameEvents.Unsubscribe(check);
      clearInterval(timer);
    });
  });
  const icon = (name, style) => libs.createComponent(ShopItemImage, {
    name: name,
    definitions: definitions,
    style: style,
    get canPurchase() {
      return canPurchase(name);
    },
    onactivate: () => select(name),
    oncontextmenu: () => request("buy", name)
  });
  const groupList = (group, side) => (() => {
    const _el$12 = libs.createElement("Panel", {
        "class": "ShopItemsList",
        hittest: false
      }, null),
      _el$13 = libs.createElement("Label", {
        "class": "ShopItemsHeader",
        text: "#ShopGroup_" + group
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        "class": "ShopItemsContainer"
      }, _el$12);
    libs.setProp(_el$13, "text", "#ShopGroup_" + group);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      get each() {
        return offers(group);
      },
      children: entry => side ? (() => {
        const _el$15 = libs.createElement("Panel", {}, null),
          _el$16 = libs.createElement("Panel", {
            get ["class"]() {
              return entry.currency === "crystal" ? "SideCostCrystal" : "SideCostScore";
            },
            hittest: false
          }, _el$15),
          _el$17 = libs.createElement("Label", {
            get text() {
              return entry.price;
            },
            get style() {
              return {
                color: entry.currency === "crystal" ? "gradient(linear, 0% 0%, 0% 100%, from(#D7A0E5), to(#e2d3e6))" : "gradient(linear, 0% 0%, 0% 100%, from(#de5d17), to(#eac769))"
              };
            }
          }, _el$16);
        libs.insert(_el$15, () => icon(entry.name), _el$16);
        libs.effect(_p$ => {
          const _v$11 = entry.currency === "crystal" ? "SideCostCrystal" : "SideCostScore",
            _v$12 = entry.price,
            _v$13 = {
              color: entry.currency === "crystal" ? "gradient(linear, 0% 0%, 0% 100%, from(#D7A0E5), to(#e2d3e6))" : "gradient(linear, 0% 0%, 0% 100%, from(#de5d17), to(#eac769))"
            };
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$16, "class", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$17, "text", _v$12, _p$._v$12));
          _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$17, "style", _v$13, _p$._v$13));
          return _p$;
        }, {
          _v$11: undefined,
          _v$12: undefined,
          _v$13: undefined
        });
        return _el$15;
      })() : icon(entry.name)
    }));
    return _el$12;
  })();
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "shop_catalog") {
        _setCatalog(v);
      } else if (k === "item_inventory") {
        _setInventory(v);
      } else if (k === "run_resources") {
        _setResources(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return (() => {
    const _el$18 = libs.createElement("Panel", {
        "class": "ShopRoot Reborn",
        hittest: false
      }, null),
      _el$19 = libs.createElement("Panel", {
        id: "ShopMain",
        hittest: false
      }, _el$18),
      _el$20 = libs.createElement("Panel", {
        "class": "ShopContainer"
      }, _el$19),
      _el$21 = libs.createElement("Panel", {
        "class": "SideShop"
      }, _el$20),
      _el$22 = libs.createElement("Panel", {
        "class": "ShopHeader"
      }, _el$21);
      libs.createElement("Label", {
        "class": "HeaderLabel",
        text: "#mystery_store"
      }, _el$22);
      const _el$24 = libs.createElement("Panel", {
        "class": "ClockPanel"
      }, _el$21),
      _el$25 = libs.createElement("Panel", {
        "class": "IconContainer"
      }, _el$24);
      libs.createElement("Image", {
        "class": "TimeIcon Sun"
      }, _el$25);
      libs.createElement("Image", {
        "class": "TimeIcon Moon"
      }, _el$25);
      const _el$28 = libs.createElement("Label", {
        "class": "TimeLabel",
        get text() {
          return `${String(clock().hour).padStart(2, "0")}:${String(clock().min).padStart(2, "0")}`;
        }
      }, _el$24),
      _el$29 = libs.createElement("Panel", {
        id: "ShopItemContainer",
        "class": "SideShopItemContainer"
      }, _el$21),
      _el$30 = libs.createElement("Panel", {
        "class": "MoneyContainer"
      }, _el$21),
      _el$31 = libs.createElement("Panel", {
        "class": "NormalShop"
      }, _el$20),
      _el$32 = libs.createElement("Panel", {
        "class": "ShopHeader"
      }, _el$31);
      libs.createElement("Label", {
        "class": "HeaderLabel",
        text: "#Store"
      }, _el$32);
      const _el$34 = libs.createElement("Panel", {
        id: "ShopItemContainer"
      }, _el$31),
      _el$35 = libs.createElement("Panel", {
        id: "RecipeMain"
      }, _el$31),
      _el$36 = libs.createElement("Panel", {
        id: "ConnectorsContainer",
        hittest: false
      }, _el$35),
      _el$37 = libs.createElement("Panel", {
        id: "ItemsContainer"
      }, _el$35),
      _el$38 = libs.createElement("Panel", {
        id: "stash",
        "class": "StashVisible StashActive",
        hittest: false
      }, _el$19),
      _el$39 = libs.createElement("Panel", {
        id: "stash_bg",
        hittest: false
      }, _el$38);
      libs.createElement("Panel", {
        id: "stash_upper",
        hittest: false
      }, _el$39);
      libs.createElement("Panel", {
        id: "stash_lower",
        hittest: false
      }, _el$39);
      libs.createElement("Panel", {
        id: "stash_active_lower",
        hittest: false
      }, _el$39);
      libs.createElement("Label", {
        id: "title",
        text: "#DOTA_STASH",
        hittest: false
      }, _el$39);
      const _el$44 = libs.createElement("Button", {
        id: "grab_all_button"
      }, _el$38);
      libs.createElement("Label", {
        text: "#DOTA_Inventory_Grab_All",
        hittest: false
      }, _el$44);
      const _el$46 = libs.createElement("Panel", {
        id: "stash_row",
        hittest: false
      }, _el$38);
    libs.setProp(_el$18, "style", {
      zIndex: 60
    });
    libs.insert(_el$29, libs.createComponent(libs.For, {
      get each() {
        return groups().filter(group => sideGroups.includes(group));
      },
      children: group => groupList(group, true)
    }));
    libs.insert(_el$30, libs.createComponent(libs.For, {
      each: [{
        currency: "crystal",
        name: "Crystal",
        icon: "DefIcon",
        color: "gradient(linear, 0% 0%, 0% 100%, from(#D7A0E5), to(#e2d3e6))"
      }, {
        currency: "score",
        name: "Score",
        icon: "PracticeIcon",
        color: "gradient(linear, 0% 0%, 0% 100%, from(#de5d17), to(#eac769))"
      }],
      children: resource => (() => {
        const _el$47 = libs.createElement("Panel", {}, null),
          _el$48 = libs.createElement("Label", {
            get text() {
              return "#Money" + resource.name;
            }
          }, _el$47),
          _el$49 = libs.createElement("Panel", {}, _el$47),
          _el$50 = libs.createElement("Image", {
            get ["class"]() {
              return resource.icon;
            }
          }, _el$49),
          _el$51 = libs.createElement("Label", {
            get style() {
              return {
                verticalAlign: "center",
                color: resource.color
              };
            },
            get text() {
              return Math.floor(balance()?.[resource.currency] ?? 0);
            }
          }, _el$49);
        libs.setProp(_el$47, "style", {
          flowChildren: "down",
          horizontalAlign: "center"
        });
        libs.setProp(_el$47, "onmouseover", self => $.DispatchEvent("DOTAShowTextTooltip", self, "#Money" + resource.name + "_Description"));
        libs.setProp(_el$47, "onmouseout", self => $.DispatchEvent("DOTAHideTextTooltip", self));
        libs.setProp(_el$48, "style", {
          horizontalAlign: "center"
        });
        libs.setProp(_el$49, "style", {
          horizontalAlign: "center",
          flowChildren: "right"
        });
        libs.effect(_p$ => {
          const _v$17 = "#Money" + resource.name,
            _v$18 = resource.icon,
            _v$19 = {
              verticalAlign: "center",
              color: resource.color
            },
            _v$20 = Math.floor(balance()?.[resource.currency] ?? 0);
          _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$48, "text", _v$17, _p$._v$17));
          _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$50, "class", _v$18, _p$._v$18));
          _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$51, "style", _v$19, _p$._v$19));
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$51, "text", _v$20, _p$._v$20));
          return _p$;
        }, {
          _v$17: undefined,
          _v$18: undefined,
          _v$19: undefined,
          _v$20: undefined
        });
        return _el$47;
      })()
    }));
    libs.insert(_el$34, libs.createComponent(libs.For, {
      get each() {
        return groups().filter(group => !sideGroups.includes(group));
      },
      children: group => groupList(group, false)
    }));
    libs.setProp(_el$35, "style", {
      width: "100%",
      height: "180px",
      backgroundColor: "#00000077",
      verticalAlign: "bottom",
      zIndex: 5,
      backgroundSize: "cover"
    });
    libs.insert(_el$36, libs.createComponent(libs.For, {
      get each() {
        return layout().lines;
      },
      children: line => (() => {
        const _el$52 = libs.createElement("Panel", {
          "class": "Connector",
          get style() {
            return {
              width: `${line.width}px`,
              x: `${line.x}px`,
              y: `${line.y}px`,
              transform: `rotateZ(${line.angle}deg)`
            };
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$52, "style", {
          width: `${line.width}px`,
          x: `${line.x}px`,
          y: `${line.y}px`,
          transform: `rotateZ(${line.angle}deg)`
        }, _$p));
        return _el$52;
      })()
    }));
    libs.insert(_el$37, libs.createComponent(libs.For, {
      get each() {
        return layout().nodes;
      },
      children: node => icon(node.name, {
        x: `${node.x}px`,
        y: `${node.y}px`
      })
    }));
    libs.setProp(_el$38, "style", {
      horizontalAlign: "right",
      height: "176px"
    });
    libs.setProp(_el$44, "onactivate", self => {
      if (active()) $.DispatchEvent("DOTAHUDStashGrabAll", self);
    });
    libs.insert(_el$46, libs.createComponent(libs.For, {
      each: [9, 10, 11, 12, 13, 14],
      children: slot => libs.createComponent(StashSlot, {
        slot: slot,
        get item() {
          return held().find(item => item.slot === slot);
        },
        get active() {
          return active();
        },
        get runId() {
          return runId();
        },
        onselect: select,
        oncontext: context
      })
    }));
    libs.effect(_p$ => {
      const _v$14 = {
          ShopOpen: open() && active()
        },
        _v$15 = {
          DayTime: clock().day,
          NightTime: !clock().day
        },
        _v$16 = `${String(clock().hour).padStart(2, "0")}:${String(clock().min).padStart(2, "0")}`;
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$19, "classList", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$24, "classList", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$28, "text", _v$16, _p$._v$16));
      return _p$;
    }, {
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined
    });
    return _el$18;
  })();
}

function TaskPanel(props) {
  const [tasks, _setTasks] = libs.createSignal(CustomNetTables.GetTableValue("common", "player_tasks"));
  const [definitions, _setDefinitions] = libs.createSignal(CustomNetTables.GetTableValue("common", "task_definitions"));
  const [npcs, _setNpcs] = libs.createSignal(CustomNetTables.GetTableValue("common", "npcs"));
  const [expanded, setExpanded] = libs.createSignal(true);
  const [dialog, setDialog] = libs.createSignal();
  const player = () => tasks()?.[String(Players.GetLocalPlayer())];
  const names = () => [...Object.keys(player()?.tInProgress ?? {}), ...Object.keys(player()?.tComplete ?? {}).filter(name => player()?.tComplete[name] === 2)].filter(name => !(definitions()?.[name]?.TaskTag ?? "").split(",").includes("TASK_TAG_HIDE"));
  const localize = key => {
    const text = $.Localize("#" + key);
    return text === "#" + key ? key : text;
  };
  libs.onMount(() => {
    const id = GameEvents.Subscribe("task_dialog", event => {
      if (event.runId === props.runId) setDialog(event);
    });
    libs.onCleanup(() => GameEvents.Unsubscribe(id));
  });
  const rewardText = reward => {
    if (reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER") return "专属装备";
    if (reward.TaskRewardType === "TASK_REWARD_TYPE_REBORN") return "转生";
    return (reward.TaskRewardName ?? "").split("|").map(part => {
      const [name, amount] = part.split(",");
      return `${localize(name)} × ${amount ?? 1}`;
    }).join("、");
  };
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "player_tasks") {
        _setTasks(v);
      } else if (k === "task_definitions") {
        _setDefinitions(v);
      } else if (k === "npcs") {
        _setNpcs(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return [(() => {
    const _el$ = libs.createElement("Panel", {
        id: "TaskMain",
        hittest: true
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "TaskTitle"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        get text() {
          return localize("questtitle");
        }
      }, _el$2),
      _el$4 = libs.createElement("Button", {
        "class": "ExpandButton"
      }, _el$2),
      _el$5 = libs.createElement("Label", {
        get text() {
          return expanded() ? "«" : "»";
        }
      }, _el$4);
    libs.setProp(_el$4, "onactivate", () => setExpanded(!expanded()));
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return expanded();
      },
      get children() {
        const _el$6 = libs.createElement("Panel", {
          "class": "TaskList"
        }, null);
        libs.insert(_el$6, libs.createComponent(libs.For, {
          get each() {
            return names();
          },
          children: name => {
            const definition = () => definitions()?.[name];
            const complete = () => player()?.tComplete[name] === 2;
            return (() => {
              const _el$7 = libs.createElement("Panel", {
                  "class": "TaskContainer"
                }, null);
                libs.createElement("Panel", {
                  "class": "SelectedBar"
                }, _el$7);
                const _el$9 = libs.createElement("Panel", {
                  "class": "EntryTitles"
                }, _el$7),
                _el$0 = libs.createElement("Label", {
                  "class": "TaskName",
                  get text() {
                    return localize("TaskTitle_" + name);
                  }
                }, _el$9),
                _el$1 = libs.createElement("Panel", {
                  flowChildren: "right"
                }, _el$9),
                _el$10 = libs.createElement("Panel", {
                  "class": "TaskButtonList"
                }, _el$9),
                _el$11 = libs.createElement("Label", {
                  "class": "TaskRequireTitle",
                  get text() {
                    return localize("TaskRequire");
                  }
                }, _el$9),
                _el$12 = libs.createElement("Label", {
                  "class": "TaskRequireTitle",
                  get text() {
                    return localize("TaskReward");
                  }
                }, _el$9),
                _el$13 = libs.createElement("Panel", {
                  "class": "TaskRewardRow"
                }, _el$9);
              libs.setProp(_el$1, "flowChildren", "right");
              libs.insert(_el$1, libs.createComponent(libs.For, {
                get each() {
                  return (definition()?.TaskTag ?? "").split(",").filter(Boolean);
                },
                children: tag => (() => {
                  const _el$15 = libs.createElement("Label", {
                    "class": "TaskTag",
                    get text() {
                      return localize(tag);
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$15, "text", localize(tag), _$p));
                  return _el$15;
                })()
              }));
              libs.insert(_el$10, libs.createComponent(libs.Show, {
                get when() {
                  return libs.memo(() => !!!complete())() && !(definition()?.TaskTag ?? "").includes("TASK_TAG_CANT_ABANDONED");
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    size: "Small",
                    get text() {
                      return localize("TaskGiveUp");
                    },
                    onactivate: () => GameEvents.SendCustomEventToServer("task_remove", {
                      taskname: name,
                      runId: props.runId
                    })
                  });
                }
              }), null);
              libs.insert(_el$10, libs.createComponent(libs.Show, {
                get when() {
                  return Object.values(definition()?.TaskStage ?? {}).some(stage => stage.TaskPosition);
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    size: "Small",
                    get text() {
                      return localize("TaskMark");
                    },
                    onactivate: () => GameEvents.SendCustomEventToServer("task_mark", {
                      taskname: name,
                      runId: props.runId
                    })
                  });
                }
              }), null);
              libs.insert(_el$9, libs.createComponent(libs.For, {
                get each() {
                  return Object.keys(definition()?.TaskStage ?? {});
                },
                children: key => (() => {
                  const _el$16 = libs.createElement("Panel", {
                      "class": "TaskRequireRow"
                    }, null),
                    _el$17 = libs.createElement("Label", {
                      "class": "TaskRequire",
                      get text() {
                        return localize(`Task_${name}_${key}`);
                      }
                    }, _el$16),
                    _el$18 = libs.createElement("Label", {
                      "class": "TaskProgress",
                      get text() {
                        return libs.memo(() => !!complete())() ? "已完成" : `${player()?.tInProgress[name]?.tStageProgress[key] ?? 0}/${definition()?.TaskStage[key].TaskStageCount}`;
                      }
                    }, _el$16);
                  libs.effect(_p$ => {
                    const _v$8 = localize(`Task_${name}_${key}`),
                      _v$9 = libs.memo(() => !!complete())() ? "已完成" : `${player()?.tInProgress[name]?.tStageProgress[key] ?? 0}/${definition()?.TaskStage[key].TaskStageCount}`;
                    _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$17, "text", _v$8, _p$._v$8));
                    _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$18, "text", _v$9, _p$._v$9));
                    return _p$;
                  }, {
                    _v$8: undefined,
                    _v$9: undefined
                  });
                  return _el$16;
                })()
              }), _el$12);
              libs.insert(_el$13, libs.createComponent(libs.For, {
                get each() {
                  return Object.values(definition()?.TaskReward ?? {});
                },
                children: reward => libs.createComponent(libs.Show, {
                  get when() {
                    return reward.TaskRewardType === "TASK_REWARD_TYPE_ITEM" || reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER";
                  },
                  get fallback() {
                    return (() => {
                      const _el$19 = libs.createElement("Label", {
                        "class": "TaskReward_Attribute",
                        get text() {
                          return rewardText(reward);
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$19, "text", rewardText(reward), _$p));
                      return _el$19;
                    })();
                  },
                  get children() {
                    return libs.createComponent(libs.For, {
                      get each() {
                        return libs.memo(() => reward.TaskRewardType === "TASK_REWARD_TYPE_SCEPTER")() ? ["item_" + Players.GetPlayerSelectedHero(Players.GetLocalPlayer())] : (reward.TaskRewardName ?? "").split("|").map(part => part.split(",")[0].trim());
                      },
                      children: item => (() => {
                        const _el$20 = libs.createElement("DOTAItemImage", {
                          "class": "TaskReward_Item",
                          itemname: item,
                          showtooltip: true
                        }, null);
                        libs.setProp(_el$20, "itemname", item);
                        return _el$20;
                      })()
                    });
                  }
                })
              }));
              libs.insert(_el$9, libs.createComponent(libs.Show, {
                get when() {
                  return player()?.rewardErrors[name];
                },
                get children() {
                  const _el$14 = libs.createElement("Label", {
                    "class": "TaskRewardError",
                    get text() {
                      return localize(player()?.rewardErrors[name] ?? "");
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$14, "text", localize(player()?.rewardErrors[name] ?? ""), _$p));
                  return _el$14;
                }
              }), null);
              libs.insert(_el$9, libs.createComponent(libs.Show, {
                get when() {
                  return libs.memo(() => !!player()?.rewardErrors[name])() && Number(definition()?.AutoComplete) === 1;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    size: "Small",
                    text: "重试领奖",
                    onactivate: () => GameEvents.SendCustomEventToServer("task_claim", {
                      taskname: name,
                      runId: props.runId
                    })
                  });
                }
              }), null);
              libs.effect(_p$ => {
                const _v$4 = {
                    Complete: complete()
                  },
                  _v$5 = localize("TaskTitle_" + name),
                  _v$6 = localize("TaskRequire"),
                  _v$7 = localize("TaskReward");
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "classList", _v$4, _p$._v$4));
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "text", _v$5, _p$._v$5));
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$11, "text", _v$6, _p$._v$6));
                _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$12, "text", _v$7, _p$._v$7));
                return _p$;
              }, {
                _v$4: undefined,
                _v$5: undefined,
                _v$6: undefined,
                _v$7: undefined
              });
              return _el$7;
            })();
          }
        }));
        return _el$6;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          Expand: expanded()
        },
        _v$2 = localize("questtitle"),
        _v$3 = expanded() ? "«" : "»";
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })(), libs.createComponent(libs.Show, {
    get when() {
      return dialog();
    },
    children: value => (() => {
      const _el$21 = libs.createElement("Panel", {
          "class": "TaskNPCDialog",
          hittest: true
        }, null),
        _el$22 = libs.createElement("Label", {
          "class": "TaskNPCName",
          get text() {
            return localize(npcs()?.[String(value().npc)]?.name ?? "");
          }
        }, _el$21),
        _el$23 = libs.createElement("Label", {
          "class": "TaskNPCText",
          get text() {
            return localize(value().text);
          }
        }, _el$21),
        _el$24 = libs.createElement("Panel", {
          "class": "TaskNPCActions"
        }, _el$21);
      libs.insert(_el$24, libs.createComponent(EOM_Button.EOM_Button, {
        text: "交谈",
        onactivate: () => GameEvents.SendCustomEventToServer("npc_interact", {
          npc: value().npc,
          runId: props.runId
        })
      }), null);
      libs.insert(_el$24, libs.createComponent(EOM_Button.EOM_Button, {
        text: "关闭",
        onactivate: () => setDialog(undefined)
      }), null);
      libs.effect(_p$ => {
        const _v$0 = localize(npcs()?.[String(value().npc)]?.name ?? ""),
          _v$1 = localize(value().text);
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$22, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$23, "text", _v$1, _p$._v$1));
        return _p$;
      }, {
        _v$0: undefined,
        _v$1: undefined
      });
      return _el$21;
    })()
  })];
}

function HudMain() {
  const state = solid_utils.createNetDataSignal("common", "game_state");
  const [resources, _setResources] = libs.createSignal(CustomNetTables.GetTableValue("common", "run_resources"));
  const gold = () => resources()?.run_id === state()?.run_id ? resources()?.players[String(Players.GetLocalPlayer())]?.gold ?? 0 : 0;
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "run_resources") {
        _setResources(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "AthenaMainRoot",
        hittest: false
      }, null),
      _el$3 = libs.createElement("Panel", {
        id: "MinimapContainer"
      }, _el$);
      libs.createElement("DOTAMinimap", {}, _el$3);
      const _el$5 = libs.createElement("Panel", {
        "class": "GlyphScan"
      }, _el$3),
      _el$6 = libs.createElement("Button", {
        "class": "TowerUpgrade",
        enabled: true
      }, _el$5);
      libs.createElement("Panel", {
        "class": "TowerUpgradeIcon"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        "class": "CooldownCover"
      }, _el$6),
      _el$9 = libs.createElement("Button", {
        get ["class"]() {
          return libs.classNames("TowerProtect", {
            Cooldown: true
          });
        }
      }, _el$5);
      libs.createElement("Panel", {
        "class": "TowerProtectIcon"
      }, _el$9);
      const _el$1 = libs.createElement("Panel", {
        "class": "CooldownCover"
      }, _el$9),
      _el$10 = libs.createElement("Panel", {
        id: "ShopPanel"
      }, _el$),
      _el$11 = libs.createElement("Panel", {
        id: "shop_launcher_bg"
      }, _el$10);
      libs.createElement("Panel", {
        id: "HUDSkinFXGold",
        "class": "GleamPanel",
        hittest: false
      }, _el$11);
      const _el$13 = libs.createElement("Button", {
        id: "ShopButton"
      }, _el$10),
      _el$14 = libs.createElement("Label", {
        id: "CustomGoldLabel",
        hittest: false,
        "class": "MonoNumbersFont ShopButtonValueLabel",
        get text() {
          return Math.floor(gold());
        }
      }, _el$13);
      libs.createElement("Panel", {
        id: "CustomGoldIcon",
        hittest: false
      }, _el$13);
      const _el$16 = libs.createElement("Button", {
        "class": "NextRound"
      }, _el$10);
      libs.createElement("Panel", {
        "class": "NextRoundIcon"
      }, _el$16);
      const _el$18 = libs.createElement("Panel", {
        "class": "CooldownCover"
      }, _el$16);
    libs.insert(_el$, libs.createComponent(RunResourcesPanel, {
      get snapshot() {
        return state();
      }
    }), _el$3);
    libs.insert(_el$, libs.createComponent(ShopPanel, {
      get snapshot() {
        return state();
      }
    }), _el$3);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return state()?.state === "GameState_Battle";
      },
      get children() {
        return libs.createComponent(TaskPanel, {
          get runId() {
            return state()?.run_id ?? 0;
          }
        });
      }
    }), _el$3);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => state()?.state === "GameState_Battle")() && state()?.vote;
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
          "class": "AthenaBattleVote",
          hittest: true
        }, null);
        libs.insert(_el$2, libs.createComponent(GameVote.GameVote, {
          get snapshot() {
            return state();
          }
        }));
        return _el$2;
      }
    }), _el$3);
    libs.setProp(_el$6, "onactivate", self => GameEvents.SendCustomGameEventToServer("active_scan", {}));
    libs.setProp(_el$8, "style", {
      clip: "radial(50% 50% ,0deg,-311deg)"
    });
    libs.setProp(_el$9, "enabled", !true);
    libs.setProp(_el$9, "onactivate", self => GameEvents.SendCustomGameEventToServer("active_glyph", {}));
    libs.setProp(_el$1, "style", {
      clip: `radial(50% 50% ,0deg,${180}deg)`
    });
    libs.insert(_el$, libs.createComponent(LowerHud, {
      get snapshot() {
        return state();
      }
    }), _el$10);
    libs.setProp(_el$13, "onactivate", () => ToggleWindow("shop"));
    libs.setProp(_el$16, "tooltip", "#NextRound");
    libs.setProp(_el$16, "onactivate", () => {
      GameEvents.SendCustomGameEventToServer("next_round", {});
    });
    libs.setProp(_el$18, "style", {
      clip: "radial(50% 50% ,0deg,-360deg)"
    });
    libs.effect(_p$ => {
      const _v$ = {
          title: `${GetLocalization("#TowerUpgradeTitle")}（${Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_RADAR)}）`,
          text: GetLocalization("#TowerUpgrade_description") + `<font color='#ffcc33'>${GetLocalization("#TowerUpgrade_Cost") + 0}</font>`
        },
        _v$2 = libs.classNames("TowerProtect", {
          Cooldown: true
        }),
        _v$3 = {
          title: GetLocalization("#TowerProtectTitle") + `（${Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ACTIVATE_GLYPH)}）`,
          text: GetLocalization("#TowerProtect_description")
        },
        _v$4 = state()?.state === "GameState_Battle",
        _v$5 = Math.floor(gold());
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "titleTooltip", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "titleTooltip", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$13, "enabled", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
