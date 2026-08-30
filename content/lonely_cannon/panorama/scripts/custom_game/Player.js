'use strict'; const exports = {}; GameUI.__loadModule('Player', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');

const EOM_Currency = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_Currency type_" + (props.currencyType ?? "top"))
  });
  const [local, others] = libs.splitProps(merged, ["icon", "value", "onaddbuttonactivate"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
      libs.createElement("Panel", {
        id: 'Background'
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "EOM_CurrencyIcon",
        get backgroundImage() {
          return local.icon;
        }
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        "class": "EOM_CurrencyLabelContainer"
      }, _el$),
      _el$5 = libs.createElement("Label", {
        get text() {
          return local.value;
        }
      }, _el$4);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.onaddbuttonactivate != undefined;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_IconButton, {
          "class": "EOM_CurrencyRecharge",
          get icon() {
            return libs.createElement("Image", {}, null);
          },
          get onactivate() {
            return local.onaddbuttonactivate;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = local.icon,
        _v$2 = local.value;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "backgroundImage", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

function GetPropNum(props, item_id) {
  if (!props) return 0;
  let num = 0;
  for (let prop of Object.values(props)) {
    if (prop.prop_id == item_id) {
      num += prop.amounts;
    }
  }
  return num;
}
const PlayerCurrency = props => {
  const propType = GetPropType(props.itemID);
  const icon = libs.createMemo(() => {
    if (propType == PropType.Token) {
      return getImagePath(`tokens/${props.itemID}.png`);
    }
    return getImagePath(`store_items/${props.itemID}.png`);
  });
  const hasAddbutton = () => {
    if (props.itemID == 110001 || props.itemID == 110014) {
      return true;
    }
    return false;
  };
  const sourceValue = (() => {
    if (propType == PropType.Token) {
      const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
      return libs.createMemo(() => playerTokens()[props.itemID.toString()]?.amounts ?? 0);
    }
    if (propType == PropType.Hero) {
      const heroID = GetHeroInfoByGoodID(props.itemID)?.heroID;
      const playerHeroes = solid_utils.createServiceNetData("player_heroes", {});
      return libs.createMemo(() => heroID != undefined ? playerHeroes()[heroID.toString()]?.extra_star_exp ?? 0 : 0);
    }
    if (propType == PropType.Courier) {
      const playerCouriers = solid_utils.createServiceNetData("player_couriers", {});
      return libs.createMemo(() => playerCouriers()[props.itemID.toString()]?.extra_star_exp ?? 0);
    }
    if (propType == PropType.Essences) {
      const playerCollectionEssences = solid_utils.createServiceNetData("player_collection_essences", {});
      return libs.createMemo(() => playerCollectionEssences()[props.itemID.toString()]?.extra_exp ?? 0);
    }
    const playerProps = solid_utils.createServiceNetData("player_props", {});
    return libs.createMemo(() => GetPropNum(playerProps(), props.itemID));
  })();
  const value = libs.createMemo(() => props.value ?? sourceValue());
  return libs.createComponent(EOM_Currency, {
    get currencyType() {
      return props.currencyType;
    },
    get icon() {
      return icon();
    },
    get value() {
      return value();
    },
    get titleTooltip() {
      return {
        title: "#" + props.itemID,
        text: "#" + props.itemID + "_description"
      };
    },
    get onaddbuttonactivate() {
      return hasAddbutton() ? () => {
        if (props.itemID == 110001) {
          JumpToMenu({
            window_name: "store",
            menu: "Resource",
            force: true
          });
        }
        if (props.itemID == 110014) {
          ClientSideEvent("directly_purchase", {
            itemid: 802207,
            source: "DiceTokenAddButton"
          });
        }
      } : undefined;
    }
  });
};
const getCdkeyFailText = message => {
  if (message?.includes("fetch cdkey error")) {
    return "#fetch_cdkey_error";
  }
  return "#" + (message?.replace(/\s+/g, "_") ?? "");
};
const getCdkeyRewardItems = data => {
  return data.data?.add_items?.common ?? [];
};
const showCdkeyReceiveResult = data => {
  $.Msg(data);
  if (data.code == 0) {
    CustomUIConfig.showPopup("CommonConfirm", {
      text: "",
      title: "#CDK_Success",
      icon: "conv_checkmark",
      items: getCdkeyRewardItems(data)
    });
  } else {
    CustomUIConfig.showPopup("CommonConfirm", {
      text: getCdkeyFailText(data.message),
      title: "#CDK_Fail",
      icon: "conv_worngmark"
    });
  }
};
const ExchangeEntry = () => {
  const [key, setKey] = libs.createSignal("");
  return (() => {
    const _el$8 = libs.createElement("Panel", {
      hittest: false
    }, null);
    libs.setProp(_el$8, "className", "ExchangeEntry");
    libs.insert(_el$8, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
      style: {
        border: "0px",
        backgroundColor: "none"
      },
      get className() {
        return Language();
      },
      placeholder: "#Store_Exchange_Placeholder",
      onChange: self => {
        setKey(self.text);
      },
      oninputsubmit: self => {
        CallActionRequest("/v1/cdkey/receive", {
          key: key()
        }, showCdkeyReceiveResult);
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "ExchangeBTN",
      onactivate: () => {
        CallActionRequest("/v1/cdkey/receive", {
          key: key()
        }, showCdkeyReceiveResult);
      }
    }), null);
    return _el$8;
  })();
};
const CurrencyGroup = props => {
  const merged = libs.mergeProps(props, {
    class: "CurrencyGroup"
  });
  const [local, others] = libs.splitProps(merged, ["tokens", "values", "exchangeButton", "recentOrder", "currencyType"]);
  return (() => {
    const _el$9 = libs.createElement("Panel", libs.mergeProps$1(others, {
      hittest: false
    }), null);
    libs.spread(_el$9, libs.mergeProps$1(others, {
      "hittest": false
    }), true);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return local.recentOrder;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          id: "RecentOrder",
          size: "Small",
          onactivate: self => {
            self.enabled = false;
            CallActionRequest("/v1/shop/supplement_orders", {}, () => {
              self.enabled = true;
            });
          },
          get children() {
            return libs.createElement("Label", {
              id: "RecentOrderLabel",
              text: "#StoreRechargeReport"
            }, null);
          }
        });
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return local.exchangeButton;
      },
      get children() {
        return libs.createComponent(ExchangeEntry, {});
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(libs.For, {
      get each() {
        return props.tokens;
      },
      children: tokenID => {
        return libs.createComponent(PlayerCurrency, {
          get currencyType() {
            return local.currencyType;
          },
          itemID: tokenID,
          get value() {
            return local.values?.[tokenID];
          }
        });
      }
    }), null);
    return _el$9;
  })();
};
const CurrencyIcon = props => {
  const defaultClass = () => props.tokenID == PayType.MONEY ? {
    class: "CurrencyIcon " + props.tokenID
  } : {
    class: "CurrencyIcon CurrencyCash " + props.tokenID
  };
  const merged = libs.mergeProps(props, defaultClass());
  const [local, others] = libs.splitProps(merged, ["tokenID"]);
  return libs.createComponent(libs.Show, {
    get when() {
      return props.tokenID == PayType.MONEY;
    },
    get fallback() {
      return (() => {
        const _el$10 = libs.createElement("Image", libs.mergeProps$1(others, {
          get src() {
            return getSrcPath(`tokens/${props.tokenID}.png`);
          }
        }), null);
        libs.spread(_el$10, libs.mergeProps$1(others, {
          get src() {
            return getSrcPath(`tokens/${props.tokenID}.png`);
          }
        }), false);
        return _el$10;
      })();
    },
    get children() {
      const _el$1 = libs.createElement("Label", libs.mergeProps$1(others, {
        get text() {
          return (() => {
            const language = Language();
            let dollarMark = "￥";
            if (language == "english") {
              dollarMark = "$";
            } else if (language == "russian") {
              dollarMark = "₽";
            }
            return dollarMark;
          })();
        }
      }), null);
      libs.spread(_el$1, libs.mergeProps$1(others, {
        get text() {
          return (() => {
            const language = Language();
            let dollarMark = "￥";
            if (language == "english") {
              dollarMark = "$";
            } else if (language == "russian") {
              dollarMark = "₽";
            }
            return dollarMark;
          })();
        }
      }), false);
      return _el$1;
    }
  });
};

exports.CurrencyGroup = CurrencyGroup;
exports.CurrencyIcon = CurrencyIcon;
exports.EOM_Currency = EOM_Currency;
exports.ExchangeEntry = ExchangeEntry;
