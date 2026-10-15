'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');

function HudMain() {
  return libs.createElement("Image", {
    id: "Logo",
    hittest: false
  }, null);
}
libs.render(HudMain, $.GetContextPanel());
