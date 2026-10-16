'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var GameVote = require('./GameVote.js');
var solid_utils = require('./solid_utils.js');

const heroPreviewIDs = {
  "npc_dota_hero_omniknight": 57,
  "npc_dota_hero_windrunner": 21,
  "npc_dota_hero_phantom_assassin": 44,
  "npc_dota_hero_rubick": 86,
  "npc_dota_hero_juggernaut": 8,
  "npc_dota_hero_antimage": 1,
  "npc_dota_hero_lina": 25,
  "npc_dota_hero_nevermore": 11,
  "npc_dota_hero_legion_commander": 104,
  "npc_dota_hero_ember_spirit": 106,
  "npc_dota_hero_templar_assassin": 46,
  "npc_dota_hero_crystal_maiden": 5,
  "npc_dota_hero_monkey_king": 114,
  "npc_dota_hero_spectre": 67,
  "npc_dota_hero_oracle": 111,
  "npc_dota_hero_void_spirit": 126
};

function selectableHeroes(heroes) {
  return Object.keys(heroes).filter(name => name.startsWith("npc_dota_hero_") && Number(heroes[name].IsHero) === 1 && heroes[name].UnitLabel !== "hide");
}
function previewAbilities(hero) {
  return Array.from({
    length: 6
  }, (_, index) => String(hero?.[`Ability${index + 1}`] ?? "")).filter(name => name !== "" && name !== "generic_hidden");
}
const difficulties = ["Easy", "Common", "Hard", "Nightmare", "Hell"];
function playerLevelFromScore(score) {
  return score !== undefined && Number.isFinite(Number(score)) ? Math.floor(Number(score) / 10) : 1;
}
function PlayerCard(props) {
  const key = `player_${props.playerID}`;
  const steamID = Game.GetPlayerInfo(props.playerID)?.player_steamid ?? "0";
  const readLevel = () => playerLevelFromScore(CustomNetTables.GetTableValue("service", key)?.Score);
  const [level, setLevel] = libs.createSignal(readLevel());
  const listener = CustomNetTables.SubscribeNetTableListener("service", (_table, changedKey, value) => {
    if (changedKey === key) setLevel(playerLevelFromScore(value?.Score));
  });
  libs.onCleanup(() => CustomNetTables.UnsubscribeNetTableListener(listener));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "PlayerContainer"
      }, null),
      _el$2 = libs.createElement("DOTAAvatarImage", {
        "class": "AvatarAndHero",
        steamid: steamID
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        "class": "PlayerBackground"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        "class": "UserInfoContainer"
      }, _el$3),
      _el$5 = libs.createElement("DOTAUserName", {
        "class": "UserName",
        steamid: steamID
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "PlayerLevelContent"
      }, _el$),
      _el$7 = libs.createElement("Image", {
        get src() {
          return `s2r://panorama/images/profile_badges/bg_0${Math.ceil(level() / 100)}_psd.vtex`;
        }
      }, _el$6),
      _el$8 = libs.createElement("Image", {
        get src() {
          return `s2r://panorama/images/profile_badges/level_${`0${level()}`.slice(-2)}_png.vtex`;
        }
      }, _el$6),
      _el$9 = libs.createElement("Image", {
        get src() {
          return `s2r://panorama/images/profile_badges/bg_number_0${Math.ceil(level() / 100)}_psd.vtex`;
        }
      }, _el$6),
      _el$0 = libs.createElement("Label", {
        id: "ProfileLevelText",
        get text() {
          return String(level());
        }
      }, _el$9);
    libs.setProp(_el$2, "steamid", steamID);
    libs.setProp(_el$2, "style", {
      width: "54px",
      height: "54px",
      zIndex: 10,
      verticalAlign: "center",
      marginLeft: "20px",
      boxShadow: "#000000aa 0px 0px 5px 0px"
    });
    libs.setProp(_el$5, "steamid", steamID);
    libs.effect(_p$ => {
      const _v$ = `s2r://panorama/images/profile_badges/bg_0${Math.ceil(level() / 100)}_psd.vtex`,
        _v$2 = `s2r://panorama/images/profile_badges/level_${`0${level()}`.slice(-2)}_png.vtex`,
        _v$3 = `s2r://panorama/images/profile_badges/bg_number_0${Math.ceil(level() / 100)}_psd.vtex`,
        _v$4 = String(level());
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$7, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "src", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "src", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
}
function HeroSelection(props) {
  const heroes = GameUI.CustomUIConfig().npc_heroes_custom;
  const heroNames = selectableHeroes(heroes ?? {});
  const playerID = Players.GetLocalPlayer();
  const player = () => props.snapshot?.players?.[playerID];
  const preparing = () => props.snapshot?.state === "GameState_Prepare";
  const canPick = () => preparing() && !!player()?.online && !player()?.ready;
  const canVote = () => !!player()?.online && (preparing() || props.snapshot?.state === "GameState_DiffSelection" && !!props.snapshot.participants?.includes(playerID));
  const heroName = () => player()?.hero ?? heroNames[0] ?? "npc_dota_hero_omniknight";
  const heroData = () => heroes?.[heroName()];
  const displayName = () => {
    const name = $.Localize(`#${heroName()}`);
    return name !== `#${heroName()}` ? name : String(heroData()?.Name ?? heroName());
  };
  const [now, setNow] = libs.createSignal(Game.GetGameTime());
  const timer = setInterval(() => setNow(Game.GetGameTime()), 200);
  libs.onCleanup(() => clearInterval(timer));
  const countdown = () => Math.max(0, Math.ceil((props.snapshot?.end_time ?? now()) - now()));
  const attribute = () => {
    const primary = heroData()?.AttributePrimary;
    return primary === "DOTA_ATTRIBUTE_AGILITY" ? "agility" : primary === "DOTA_ATTRIBUTE_INTELLECT" ? "intelligence" : primary === "DOTA_ATTRIBUTE_ALL" ? "all" : "strength";
  };
  return (() => {
    const _el$1 = libs.createElement("Panel", {
        "class": "AthenaHeroSelection",
        hittest: false
      }, null),
      _el$10 = libs.createElement("Panel", {
        "class": "HeroSelectionRoot",
        hittest: false
      }, _el$1);
      libs.createElement("MoviePanel", {
        id: "BackgroundImage",
        "class": "HeroSelectionBackgroundScene",
        src: "file://{resources}/videos/ti10_aegis_frontpage.webm",
        repeat: true,
        autoplay: "onload",
        hittest: false
      }, _el$10);
      const _el$12 = libs.createElement("Panel", {
        "class": "MainSelectionPage"
      }, _el$10),
      _el$13 = libs.createElement("Panel", {
        "class": "SideBar"
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        "class": "PlayerList"
      }, _el$13),
      _el$15 = libs.createElement("Panel", {
        "class": "DiffList"
      }, _el$13),
      _el$16 = libs.createElement("Panel", {
        "class": "MainPage"
      }, _el$12),
      _el$17 = libs.createElement("Panel", {
        "class": "TimerContent"
      }, _el$16),
      _el$18 = libs.createElement("Label", {
        get text() {
          return String(countdown()).padStart(2, "0");
        }
      }, _el$17),
      _el$19 = libs.createElement("Panel", {
        "class": "HeroListAndChat"
      }, _el$16),
      _el$20 = libs.createElement("Panel", {
        "class": "HeroList"
      }, _el$19),
      _el$21 = libs.createElement("Panel", {
        id: "HeroSettingPanel"
      }, _el$19),
      _el$22 = libs.createElement("Panel", {
        id: "SettingPet",
        "class": "SettingPanel"
      }, _el$21),
      _el$23 = libs.createElement("Panel", {
        id: "MenuArrowContainer"
      }, _el$22);
      libs.createElement("Panel", {
        id: "MenuArrow"
      }, _el$23);
      libs.createElement("Image", {
        "class": "SettingIcon",
        src: "s2r://panorama/images/custom_game/hero_selection/pet_default_png.vtex",
        scaling: "stretch-to-cover-preserve-aspect"
      }, _el$22);
      const _el$26 = libs.createElement("Label", {
        get text() {
          return $.Localize("#Category_pet");
        }
      }, _el$22),
      _el$27 = libs.createElement("Panel", {
        id: "SettingSkin",
        "class": "SettingPanel"
      }, _el$21),
      _el$28 = libs.createElement("Panel", {
        id: "MenuArrowContainer"
      }, _el$27);
      libs.createElement("Panel", {
        id: "MenuArrow"
      }, _el$28);
      libs.createElement("Image", {
        "class": "SettingIcon",
        src: "s2r://panorama/images/custom_game/hero_selection/skin_default_png.vtex",
        scaling: "stretch-to-cover-preserve-aspect"
      }, _el$27);
      const _el$31 = libs.createElement("Label", {
        get text() {
          return $.Localize("#Category_skin");
        }
      }, _el$27),
      _el$32 = libs.createElement("Panel", {
        id: "SettingParticle",
        "class": "SettingPanel"
      }, _el$21),
      _el$33 = libs.createElement("Panel", {
        id: "MenuArrowContainer"
      }, _el$32);
      libs.createElement("Panel", {
        id: "MenuArrow"
      }, _el$33);
      libs.createElement("Image", {
        "class": "SettingIcon",
        src: "s2r://panorama/images/custom_game/hero_selection/particle_default_png.vtex",
        scaling: "stretch-to-cover-preserve-aspect"
      }, _el$32);
      const _el$36 = libs.createElement("Label", {
        get text() {
          return $.Localize("#Category_particle");
        }
      }, _el$32),
      _el$37 = libs.createElement("Panel", {
        id: "HeroInfoContent"
      }, _el$16),
      _el$38 = libs.createElement("Panel", {
        id: "HeroDataPanel"
      }, _el$37),
      _el$39 = libs.createElement("Panel", {
        id: "HeroNamePanel"
      }, _el$38),
      _el$40 = libs.createElement("Image", {
        id: "PrimaryAttributeImage",
        get src() {
          return `s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_${attribute()}_psd.vtex`;
        }
      }, _el$39),
      _el$41 = libs.createElement("Label", {
        get text() {
          return displayName();
        }
      }, _el$39),
      _el$42 = libs.createElement("Panel", {
        id: "HeroAbilityPanel"
      }, _el$38),
      _el$43 = libs.createElement("Button", {
        id: "HeroSelectPanel"
      }, _el$38),
      _el$44 = libs.createElement("Label", {
        get text() {
          return $.Localize("#SelectHero");
        }
      }, _el$43),
      _el$45 = libs.createElement("Panel", {
        id: "HeroScenePanel",
        hittest: false,
        hittestchildren: false
      }, _el$16);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(props.snapshot?.players ?? {});
      },
      children: key => libs.createComponent(PlayerCard, {
        get playerID() {
          return Number(key);
        }
      })
    }));
    libs.insert(_el$15, libs.createComponent(libs.For, {
      each: difficulties,
      children: (difficulty, index) => (() => {
        const _el$46 = libs.createElement("TabButton", {
            "class": `DiffButton GameMode_${difficulty}`,
            group: "diffGroup",
            get selected() {
              return player()?.difficulty === index() + 1;
            }
          }, null),
          _el$47 = libs.createElement("Image", {
            "class": "DiffIcon",
            get src() {
              return `s2r://panorama/images/hero_badges/hero_badge_rank_${index()}_png.vtex`;
            }
          }, _el$46),
          _el$48 = libs.createElement("Label", {
            get text() {
              return $.Localize(`#GameMode_${difficulty}`);
            }
          }, _el$46);
        libs.setProp(_el$46, "class", `DiffButton GameMode_${difficulty}`);
        libs.setProp(_el$46, "onactivate", () => {
          if (canVote()) GameVote.sendGameAction(props.snapshot, {
            action: "difficulty",
            difficulty: index() + 1
          });
        });
        libs.effect(_p$ => {
          const _v$11 = player()?.difficulty === index() + 1,
            _v$12 = canVote(),
            _v$13 = `s2r://panorama/images/hero_badges/hero_badge_rank_${index()}_png.vtex`,
            _v$14 = $.Localize(`#GameMode_${difficulty}`);
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$46, "selected", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$46, "enabled", _v$12, _p$._v$12));
          _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$47, "src", _v$13, _p$._v$13));
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$48, "text", _v$14, _p$._v$14));
          return _p$;
        }, {
          _v$11: undefined,
          _v$12: undefined,
          _v$13: undefined,
          _v$14: undefined
        });
        return _el$46;
      })()
    }));
    libs.insert(_el$20, libs.createComponent(libs.For, {
      each: heroNames,
      children: name => (() => {
        const _el$49 = libs.createElement("TabButton", {
            "class": "HeroCard Unlock",
            group: "athenaHeroes",
            get selected() {
              return name === heroName();
            }
          }, null),
          _el$50 = libs.createElement("DOTAHeroMovie", {
            heroname: name,
            hittest: false
          }, _el$49);
        libs.setProp(_el$49, "onactivate", () => {
          if (canPick()) GameVote.sendGameAction(props.snapshot, {
            action: "select_hero",
            hero: name
          });
        });
        libs.setProp(_el$50, "heroname", name);
        libs.effect(_p$ => {
          const _v$15 = name === heroName(),
            _v$16 = canPick();
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$49, "selected", _v$15, _p$._v$15));
          _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$49, "enabled", _v$16, _p$._v$16));
          return _p$;
        }, {
          _v$15: undefined,
          _v$16: undefined
        });
        return _el$49;
      })()
    }));
    libs.insert(_el$42, libs.createComponent(libs.For, {
      get each() {
        return previewAbilities(heroData());
      },
      children: name => (() => {
        const _el$51 = libs.createElement("DOTAAbilityImage", {
          "class": "HeroAbility",
          abilityname: name
        }, null);
        libs.setProp(_el$51, "abilityname", name);
        libs.setProp(_el$51, "onmouseover", self => $.DispatchEvent("DOTAShowAbilityTooltip", self, name));
        libs.setProp(_el$51, "onmouseout", self => $.DispatchEvent("DOTAHideAbilityTooltip", self));
        return _el$51;
      })()
    }));
    libs.setProp(_el$43, "onactivate", () => {
      if (canPick() && heroNames.includes(heroName())) GameVote.sendGameAction(props.snapshot, {
        action: "ready",
        ready: true
      });
    });
    libs.insert(_el$45, libs.createComponent(libs.For, {
      get each() {
        return [heroName()];
      },
      children: name => {
        let initialized = false;
        return (() => {
          const _el$52 = libs.createElement("DOTAScenePanel", {
            "class": "HeroScene",
            unit: name,
            light: "global_light",
            antialias: true,
            drawbackground: false,
            particleonly: false,
            hittest: false,
            hittestchildren: false
          }, null);
          libs.setProp(_el$52, "unit", name);
          libs.setProp(_el$52, "onload", self => {
            if (initialized) return;
            initialized = true;
            const heroID = Number(heroes?.[name]?.HeroID ?? heroPreviewIDs[name]);
            if (heroID > 0) self.SetScenePanelToLocalHero(heroID);
          });
          return _el$52;
        })();
      }
    }));
    libs.effect(_p$ => {
      const _v$5 = String(countdown()).padStart(2, "0"),
        _v$6 = $.Localize("#Category_pet"),
        _v$7 = $.Localize("#Category_skin"),
        _v$8 = $.Localize("#Category_particle"),
        _v$9 = `s2r://panorama/images/primary_attribute_icons/primary_attribute_icon_${attribute()}_psd.vtex`,
        _v$0 = displayName(),
        _v$1 = canPick() && heroNames.includes(heroName()),
        _v$10 = $.Localize("#SelectHero");
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$26, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$31, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$36, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$40, "src", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$41, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$43, "enabled", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$44, "text", _v$10, _p$._v$10));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined
    });
    return _el$1;
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
  const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "AthenaSessionRoot",
      hittest: false
    }, null);
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
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return selecting();
      },
      get children() {
        return libs.createComponent(HeroSelection, {
          get snapshot() {
            return state();
          }
        });
      }
    }), null);
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
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return state()?.state === "GameState_RunInit" || state()?.state === "GameState_Reset";
      },
      get children() {
        const _el$3 = libs.createElement("Panel", {
            "class": "AthenaSessionCard",
            hittest: true
          }, null),
          _el$4 = libs.createElement("Label", {
            "class": "AthenaTitle",
            get text() {
              return state()?.state === "GameState_Reset" ? "正在清理本局" : "正在初始化本局";
            }
          }, _el$3);
        libs.insert(_el$3, libs.createComponent(libs.Show, {
          get when() {
            return state()?.error;
          },
          get children() {
            return [(() => {
              const _el$5 = libs.createElement("Label", {
                "class": "AthenaError",
                get text() {
                  return state()?.error;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$5, "text", state()?.error, _$p));
              return _el$5;
            })(), libs.createComponent(EOM_Button.EOM_Button, {
              text: "重试清理",
              onactivate: () => GameVote.sendGameAction(state(), {
                action: "retry_cleanup"
              })
            })];
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$4, "text", state()?.state === "GameState_Reset" ? "正在清理本局" : "正在初始化本局", _$p));
        return _el$3;
      }
    }), null);
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
