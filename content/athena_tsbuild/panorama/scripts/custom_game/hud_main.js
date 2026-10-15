'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var GameVote = require('./GameVote.js');
var solid_utils = require('./solid_utils.js');

function HudMain() {
  const state = solid_utils.createNetDataSignal("common", "game_state");
  const round = solid_utils.createNetDataSignal("common", "round_state");
  const playerID = Players.GetLocalPlayer();
  const player = () => state()?.players?.[playerID];
  const heroes = Object.keys(GameUI.CustomUIConfig().npc_heroes_custom ?? {}).filter(name => name.startsWith("npc_dota_hero_")).sort();
  const selecting = () => state()?.state === "GameState_Prepare" || state()?.state === "GameState_DiffSelection";
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "AthenaSessionRoot",
      hittest: false
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return selecting();
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            "class": "AthenaSessionCard",
            hittest: true
          }, null),
          _el$3 = libs.createElement("Label", {
            "class": "AthenaTitle",
            get text() {
              return `${state()?.mode === "solo" ? "单人模式" : "团队模式"} · 第 ${state()?.run_id ?? 1} 局`;
            }
          }, _el$2);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return state()?.state === "GameState_Prepare";
          },
          get children() {
            return [libs.createElement("Label", {
              "class": "AthenaSection",
              text: "选择英雄，等待在线玩家准备"
            }, null), (() => {
              const _el$5 = libs.createElement("Panel", {
                "class": "AthenaHeroes"
              }, null);
              libs.insert(_el$5, libs.createComponent(libs.For, {
                each: heroes,
                children: hero => libs.createComponent(EOM_Button.EOM_Button, {
                  size: "Small",
                  get color() {
                    return player()?.hero === hero ? "Gold" : "Confirm";
                  },
                  text: `#${hero}`,
                  onactivate: () => GameVote.sendGameAction(state(), {
                    action: "select_hero",
                    hero
                  })
                })
              }));
              return _el$5;
            })(), libs.createComponent(libs.For, {
              get each() {
                return Object.keys(state()?.players ?? {});
              },
              children: key => {
                const id = Number(key);
                return libs.createComponent(libs.Show, {
                  get when() {
                    return state()?.players?.[id]?.online;
                  },
                  get children() {
                    const _el$11 = libs.createElement("Label", {
                      get text() {
                        return `${Players.GetPlayerName(id)}：${state()?.players?.[id]?.ready ? "已准备" : "未准备"}`;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$11, "text", `${Players.GetPlayerName(id)}：${state()?.players?.[id]?.ready ? "已准备" : "未准备"}`, _$p));
                    return _el$11;
                  }
                });
              }
            }), libs.createComponent(EOM_Button.EOM_Button, {
              get enabled() {
                return !!player()?.online;
              },
              get text() {
                return player()?.ready ? "取消准备" : "准备";
              },
              onactivate: () => GameVote.sendGameAction(state(), {
                action: "ready",
                ready: !player()?.ready
              })
            })];
          }
        }), null);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return state()?.state === "GameState_DiffSelection";
          },
          get children() {
            return [libs.createElement("Label", {
              "class": "AthenaSection",
              text: "选择难度（15 秒后按多数票确定，同票取较低难度）"
            }, null), (() => {
              const _el$7 = libs.createElement("Panel", {
                "class": "AthenaActions"
              }, null);
              libs.insert(_el$7, libs.createComponent(libs.For, {
                each: [1, 2, 3, 4, 5],
                children: difficulty => libs.createComponent(EOM_Button.EOM_Button, {
                  get color() {
                    return player()?.difficulty === difficulty ? "Gold" : "Confirm";
                  },
                  get enabled() {
                    return state()?.participants?.includes(playerID);
                  },
                  text: `难度 ${difficulty}`,
                  onactivate: () => GameVote.sendGameAction(state(), {
                    action: "difficulty",
                    difficulty
                  })
                })
              }));
              return _el$7;
            })()];
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$3, "text", `${state()?.mode === "solo" ? "单人模式" : "团队模式"} · 第 ${state()?.run_id ?? 1} 局`, _$p));
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return state()?.state === "GameState_Battle";
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
            "class": "AthenaBattleBar",
            hittest: true
          }, null),
          _el$9 = libs.createElement("Label", {
            get text() {
              return `第 ${state()?.run_id} 局 · 难度 ${state()?.difficulty} · 第 ${round()?.round_number ?? 1} 波 · ${round()?.stage === "prepare" ? "备战" : "战斗"}`;
            }
          }, _el$8);
        libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          text: "放弃本局",
          get enabled() {
            return libs.memo(() => !!state()?.participants?.includes(playerID))() && !state()?.vote;
          },
          onactivate: () => GameVote.sendGameAction(state(), {
            action: "abandon"
          })
        }), null);
        libs.insert(_el$8, libs.createComponent(GameVote.GameVote, {
          get snapshot() {
            return state();
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$9, "text", `第 ${state()?.run_id} 局 · 难度 ${state()?.difficulty} · 第 ${round()?.round_number ?? 1} 波 · ${round()?.stage === "prepare" ? "备战" : "战斗"}`, _$p));
        return _el$8;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return state()?.state === "GameState_RunInit" || state()?.state === "GameState_Reset";
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            "class": "AthenaSessionCard",
            hittest: true
          }, null),
          _el$1 = libs.createElement("Label", {
            "class": "AthenaTitle",
            get text() {
              return state()?.state === "GameState_Reset" ? "正在清理本局" : "正在初始化本局";
            }
          }, _el$0);
        libs.insert(_el$0, libs.createComponent(libs.Show, {
          get when() {
            return state()?.error;
          },
          get children() {
            return [(() => {
              const _el$10 = libs.createElement("Label", {
                "class": "AthenaError",
                get text() {
                  return state()?.error;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$10, "text", state()?.error, _$p));
              return _el$10;
            })(), libs.createComponent(EOM_Button.EOM_Button, {
              text: "重试清理",
              onactivate: () => GameVote.sendGameAction(state(), {
                action: "retry_cleanup"
              })
            })];
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$1, "text", state()?.state === "GameState_Reset" ? "正在清理本局" : "正在初始化本局", _$p));
        return _el$0;
      }
    }), null);
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
