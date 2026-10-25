'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var GameVote = require('./GameVote.js');
var EOM_Button = require('./EOM_Button.js');
var solid_utils = require('./solid_utils.js');

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
  GetLocalization("#TowerProtect_description");
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
        id: "ActionPanel"
      }, _el$),
      _el$11 = libs.createElement("Panel", {
        id: "LeftPart"
      }, _el$10);
      libs.createElement("DOTAPortrait", {}, _el$11);
      libs.createElement("Panel", {
        id: "LeftPartSkin"
      }, _el$11);
      libs.createElement("Panel", {
        id: "CenterPart"
      }, _el$10);
      libs.createElement("Panel", {
        id: "RightPart"
      }, _el$10);
      const _el$16 = libs.createElement("Panel", {
        id: "ShopPanel"
      }, _el$),
      _el$17 = libs.createElement("Panel", {
        id: "shop_launcher_bg"
      }, _el$16);
      libs.createElement("Panel", {
        id: "HUDSkinFXGold",
        "class": "GleamPanel",
        hittest: false
      }, _el$17);
      const _el$19 = libs.createElement("Button", {
        id: "ShopButton"
      }, _el$16);
      libs.createElement("Label", {
        id: "CustomGoldLabel",
        hittest: false,
        "class": "MonoNumbersFont ShopButtonValueLabel",
        text: "{s:gold}"
      }, _el$19);
      libs.createElement("Panel", {
        id: "CustomGoldIcon",
        hittest: false
      }, _el$19);
      const _el$22 = libs.createElement("Button", {
        "class": "NextRound"
      }, _el$16);
      libs.createElement("Panel", {
        "class": "NextRoundIcon"
      }, _el$22);
      const _el$24 = libs.createElement("Panel", {
        "class": "CooldownCover"
      }, _el$22);
    libs.insert(_el$, libs.createComponent(RunResourcesPanel, {
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
    libs.setProp(_el$19, "onactivate", () => ToggleWindow("shop"));
    libs.setProp(_el$22, "tooltip", "#NextRound");
    libs.setProp(_el$22, "onactivate", () => {
      GameEvents.SendCustomGameEventToServer("next_round", {});
    });
    libs.setProp(_el$24, "style", {
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
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "titleTooltip", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "titleTooltip", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
