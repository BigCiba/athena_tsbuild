'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var Player = require('./Player.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');
require('./EOM_TextEntry.js');

({
  ...DEFAULT_GAMEPAD_BINDINGS
});
[KeyFunction.Up, KeyFunction.Down, KeyFunction.Left, KeyFunction.Right];
const [showPicker, setShowPicker] = libs.createSignal();
libs.createSignal({
  ...DEFAULT_KEYBOARD_BINDINGS
});
libs.createSignal({
  ...DEFAULT_GAMEPAD_BINDINGS
});
solid_utils.createServiceNetData("player_key_values", {});
libs.createSignal(MOVE_MODE_KEYBOARD);
libs.createSignal("2");
libs.createSignal(CLICK_MOVE_MODE_CLICK);
function Setting() {
  const {
    LayoutMenu,
    show,
    secondTabName,
    menuName
  } = EOM_MenuLayout.createMenuLayout("setting", () => ({}));
  const settings = solid_utils.createNetDataSignal("common", "settings");
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  libs.createMemo(() => settings()?.is_local_host == true || settings()?.is_local_host);
  return libs.createComponent(EOM_Popup.EOM_Popup, {
    id: "Setting",
    title: "#MenuButton_setting",
    get classList() {
      return {
        EOM_PopupMainShow: show(),
        ShowPicker: showPicker() != undefined
      };
    },
    hideClose: false,
    onClose: () => ToggleWindow("MenuButton_setting", false),
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "SettingMain"
        }, null),
        _el$2 = libs.createElement("Panel", {
          "class": "SettingColumn"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          "class": "TitleRow"
        }, _el$2);
        libs.createElement("Label", {
          text: "#Setting_Game",
          "class": "SectionHeader"
        }, _el$3);
        libs.createElement("Panel", {
          "class": "Separator"
        }, _el$2);
        const _el$6 = libs.createElement("Panel", {
          "class": "SettingList VerticalScrollStyle",
          scroll: "y"
        }, _el$2),
        _el$7 = libs.createElement("Panel", {
          "class": "SettingColumn"
        }, _el$),
        _el$8 = libs.createElement("Panel", {
          "class": "TitleRow"
        }, _el$7);
        libs.createElement("Label", {
          text: "#Setting_Hotkey",
          "class": "SectionHeader"
        }, _el$8);
        libs.createElement("Panel", {
          "class": "Separator"
        }, _el$7);
        libs.createElement("Panel", {
          id: "SettingTabContainer"
        }, _el$7);
        const _el$10 = libs.createElement("Panel", {
          "class": "SettingColumn"
        }, _el$),
        _el$11 = libs.createElement("Panel", {
          "class": "TitleRow"
        }, _el$10);
        libs.createElement("Label", {
          text: "#Store_Exchange_Placeholder",
          "class": "SectionHeader"
        }, _el$11);
        libs.createElement("Panel", {
          "class": "Separator"
        }, _el$10);
      libs.setProp(_el$6, "scroll", "y");
      libs.insert(_el$10, libs.createComponent(Player.ExchangeEntry, {}), null);
      libs.insert(_el$10, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return gameState()?.state == "GameState_Dungeon";
        },
        text: "#Setting_GiveUp",
        align: "right bottom",
        onactivate: self => GameEvents.SendCustomEventToServer("restart_game", {})
      }), null);
      return _el$;
    }
  });
}
libs.render(Setting, $.GetContextPanel());
