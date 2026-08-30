'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

const EndScreen = () => {
  solid_utils.createNetDataSignal("common", "game_state");
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HudEndScreenRoot",
      get ["class"]() {
        return libs.classNames("CustomHudRoot", {});
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("CustomHudRoot", {}), _$p));
    return _el$;
  })();
};
libs.render(EndScreen, $.GetContextPanel());
