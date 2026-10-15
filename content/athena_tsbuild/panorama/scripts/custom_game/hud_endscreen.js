'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_Button = require('./EOM_Button.js');
var GameVote = require('./GameVote.js');

const EndScreen = () => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const titles = {
    victory: "本局胜利",
    defeat: "本局失败",
    abandoned: "已放弃本局",
    error: "本局未能完成"
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HudEndScreenRoot",
      get ["class"]() {
        return libs.classNames("CustomHudRoot", {
          ShowHud: gameState()?.state === "GameState_Settle"
        });
      },
      hittest: false
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return gameState()?.result;
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            "class": "AthenaResultCard",
            hittest: true
          }, null),
          _el$3 = libs.createElement("Label", {
            "class": "AthenaResultTitle",
            get text() {
              return titles[gameState().result.outcome];
            }
          }, _el$2),
          _el$4 = libs.createElement("Label", {
            get text() {
              return `第 ${gameState()?.run_id} 局 · 难度 ${gameState()?.result?.difficulty} · 用时 ${Math.floor(gameState()?.result?.elapsed ?? 0)} 秒`;
            }
          }, _el$2),
          _el$5 = libs.createElement("Label", {
            get text() {
              return gameState()?.result?.reason;
            }
          }, _el$2);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return gameState()?.error;
          },
          get children() {
            const _el$6 = libs.createElement("Label", {
              get text() {
                return gameState()?.error;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$6, "text", gameState()?.error, _$p));
            return _el$6;
          }
        }), null);
        libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
          text: "再来一局",
          get enabled() {
            return libs.memo(() => !!gameState()?.participants?.includes(Players.GetLocalPlayer()))() && !gameState()?.vote;
          },
          onactivate: () => GameVote.sendGameAction(gameState(), {
            action: "replay"
          })
        }), null);
        libs.insert(_el$2, libs.createComponent(GameVote.GameVote, {
          get snapshot() {
            return gameState();
          }
        }), null);
        libs.effect(_p$ => {
          const _v$ = titles[gameState().result.outcome],
            _v$2 = `第 ${gameState()?.run_id} 局 · 难度 ${gameState()?.result?.difficulty} · 用时 ${Math.floor(gameState()?.result?.elapsed ?? 0)} 秒`,
            _v$3 = gameState()?.result?.reason;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined
        });
        return _el$2;
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("CustomHudRoot", {
      ShowHud: gameState()?.state === "GameState_Settle"
    }), _$p));
    return _el$;
  })();
};
libs.render(EndScreen, $.GetContextPanel());
