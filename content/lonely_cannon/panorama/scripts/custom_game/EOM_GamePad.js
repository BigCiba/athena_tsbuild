'use strict'; const exports = {}; GameUI.__loadModule('EOM_GamePad', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Breadcrumb = props => {
  const merged = libs.mergeProps({
    list: [],
    defaultSelected: 0,
    activateType: "onactivate",
    group: "EOM_Breadcrumb" + Math.random()
  }, props, {
    class: libs.classNames("EOM_Breadcrumb", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "list", "defaultSelected", "selected", "group", "activateType"]);
  const [selectedIndex, setSelectedIndex] = libs.createSignal(local.defaultSelected != undefined ? Math.min(local.list.length - 1, Math.max(0, local.defaultSelected - 1)) : undefined);
  const onHover = index => {
    if (local.activateType == "onhover") {
      onSelect(index);
    }
  };
  const onSelect = index => {
    setSelectedIndex(index);
    if (props.onChange) {
      props.onChange(index, local.list[index]);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return local.list;
      },
      children: (name, index) => [libs.memo((() => {
        const _c$ = libs.memo(() => index() > 0);
        return () => _c$() && libs.createElement("Label", {
          "class": "EOM_BreadcrumbSeparator",
          text: "/"
        }, null);
      })()), (() => {
        const _el$2 = libs.createElement("TabButton", {
          get group() {
            return local.group;
          },
          text: name
        }, null);
        libs.setProp(_el$2, "text", name);
        libs.setProp(_el$2, "onactivate", () => onSelect(index()));
        libs.setProp(_el$2, "onmouseover", () => onHover(index()));
        libs.effect(_p$ => {
          const _v$ = local.selected !== undefined ? local.selected - 1 === index() : selectedIndex() === index(),
            _v$2 = local.group;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "checked", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "group", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$2;
      })()]
    }));
    return _el$;
  })();
};

function EOM_Switch(props) {
  const [local, others] = libs.splitProps(props, ["class", "selected", "defaultSelected", "onchange", "onactivate"]);
  const [innerSelected, setInnerSelected] = libs.createSignal(local.defaultSelected ?? local.selected ?? false);
  const checked = () => local.selected ?? innerSelected();
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("EOM_Switch", local.class);
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        "class": "EOM_Switch_Track"
      }, _el$);
      libs.createElement("Panel", {
        "class": "EOM_Switch_Spacer"
      }, _el$2);
      libs.createElement("Panel", {
        "class": "EOM_Switch_Thumb"
      }, _el$2);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EOM_Switch", local.class);
      },
      get checked() {
        return checked();
      },
      "onactivate": p => {
        const newChecked = !checked();
        if (local.selected === undefined) {
          setInnerSelected(newChecked);
        }
        local.onchange?.(p, newChecked);
        if (typeof local.onactivate === "function") {
          local.onactivate(p);
        }
      }
    }), true);
    return _el$;
  })();
}

const normalizeKeyName = keyName => keyName.trim().toLowerCase();
const isStickDirectionKey = keyName => /^(x_axis|y_axis|r_axis|u_axis)_(neg|pos)$/.test(keyName);
const textKeyLabelMap = {
  joy5: "LB",
  joy6: "RB",
  joy7: "SELECT",
  joy8: "MENU",
  z_axis_pos: "LT",
  v_axis_pos: "RT",
  lb: "LB",
  rb: "RB",
  select: "SELECT",
  menu: "MENU",
  lt: "LT",
  rt: "RT"
};
const isKnownGamePadKey = keyName => /^(joy[1-9]|joy10|z_axis_pos|v_axis_pos|pov_left|pov_right|pov_up|pov_down|x_axis_neg|x_axis_pos|y_axis_neg|y_axis_pos|r_axis_neg|r_axis_pos|u_axis_neg|u_axis_pos|start|view|home|menu|select)$/.test(keyName);
const getTextKeyLabel = keyName => textKeyLabelMap[keyName];
const EOM_GamePad = rawProps => {
  const props = libs.mergeProps({
    keyName: ""
  }, {
    class: "EOM_GamePad"
  }, rawProps);
  const [local, others] = libs.splitProps(props, ["keyName", "children"]);
  const currentKeyName = libs.createMemo(() => normalizeKeyName(local.keyName));
  const isKnownKey = libs.createMemo(() => isKnownGamePadKey(currentKeyName()));
  const isStickKey = libs.createMemo(() => isStickDirectionKey(currentKeyName()));
  const textKeyLabel = libs.createMemo(() => getTextKeyLabel(currentKeyName()));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(props.class, {
          HasDirection: isStickKey(),
          IsTextKey: textKeyLabel() !== undefined
        }, isKnownKey() ? `Key-${currentKeyName()}` : undefined);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(props.class, {
          HasDirection: isStickKey(),
          IsTextKey: textKeyLabel() !== undefined
        }, isKnownKey() ? `Key-${currentKeyName()}` : undefined);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isKnownKey();
      },
      get fallback() {
        return (() => {
          const _el$2 = libs.createElement("Label", {
            "class": "EOM_GamePadText",
            get text() {
              return local.keyName;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$2, "text", local.keyName, _$p));
          return _el$2;
        })();
      },
      children: () => libs.createComponent(libs.Show, {
        get when() {
          return textKeyLabel() !== undefined;
        },
        get fallback() {
          return libs.createComponent(libs.Show, {
            get when() {
              return isStickKey();
            },
            get fallback() {
              return libs.createElement("Image", {
                "class": "EOM_GamePadIcon",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null);
            },
            get children() {
              return [libs.createElement("Image", {
                "class": "EOM_GamePadStick",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null), libs.createElement("Image", {
                "class": "EOM_GamePadDirection",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null)];
            }
          });
        },
        get children() {
          return [libs.createElement("Image", {
            "class": "EOM_GamePadTextBorder"
          }, null), (() => {
            const _el$4 = libs.createElement("Label", {
              "class": "EOM_GamePadTextValue",
              get text() {
                return textKeyLabel();
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$4, "text", textKeyLabel(), _$p));
            return _el$4;
          })()];
        }
      })
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.EOM_Breadcrumb = EOM_Breadcrumb;
exports.EOM_GamePad = EOM_GamePad;
exports.EOM_Switch = EOM_Switch;
