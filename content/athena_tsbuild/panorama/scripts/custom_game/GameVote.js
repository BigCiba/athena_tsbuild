'use strict'; const exports = {}; GameUI.__loadModule('GameVote', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

function sendGameAction(snapshot, action) {
  if (snapshot?.run_id === undefined || snapshot.state_version === undefined) return;
  GameEvents.SendCustomEventToServer("athena_game_action", {
    ...action,
    run_id: snapshot.run_id,
    state_version: snapshot.state_version
  });
}
function GameVote(props) {
  const playerID = Players.GetLocalPlayer();
  return libs.createComponent(libs.Show, {
    get when() {
      return props.snapshot?.vote;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "AthenaVote"
        }, null),
        _el$2 = libs.createElement("Label", {
          get text() {
            return props.snapshot?.vote?.action === "replay" ? "是否再来一局？" : "是否放弃本局？";
          }
        }, _el$),
        _el$3 = libs.createElement("Label", {
          get text() {
            return `已同意 ${props.snapshot?.vote?.accepted.length ?? 0}/${props.snapshot?.vote?.voters.length ?? 0}，30 秒内未通过将取消。`;
          }
        }, _el$),
        _el$4 = libs.createElement("Panel", {
          "class": "AthenaActions"
        }, _el$);
      libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_Button, {
        text: "同意",
        get enabled() {
          return libs.memo(() => !!props.snapshot?.vote?.voters.includes(playerID))() && !props.snapshot?.vote?.accepted.includes(playerID);
        },
        onactivate: () => sendGameAction(props.snapshot, {
          action: "accept",
          vote_id: props.snapshot?.vote?.id
        })
      }), null);
      libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_Button, {
        text: "取消",
        color: "Cancel",
        get enabled() {
          return props.snapshot?.vote?.voters.includes(playerID);
        },
        onactivate: () => sendGameAction(props.snapshot, {
          action: "reject",
          vote_id: props.snapshot?.vote?.id
        })
      }), null);
      libs.effect(_p$ => {
        const _v$ = props.snapshot?.vote?.action === "replay" ? "是否再来一局？" : "是否放弃本局？",
          _v$2 = `已同意 ${props.snapshot?.vote?.accepted.length ?? 0}/${props.snapshot?.vote?.voters.length ?? 0}，30 秒内未通过将取消。`;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });
      return _el$;
    }
  });
}

exports.GameVote = GameVote;
exports.sendGameAction = sendGameAction;
