'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var tooltip_base = require('./tooltip_base.js');

let root = $.GetContextPanel();
function TooltipContents(props) {
  const heroCosmeticData = libs.createMemo(() => {
    const cosmeticData = KeyValues.info_item_cosmetic[props.title];
    if (cosmeticData == undefined || cosmeticData.type == COSMETIC_TYPE.BORDER || cosmeticData.type == COSMETIC_TYPE.TITLE) {
      return undefined;
    }
    return cosmeticData;
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "TitleImageText"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "TooltipTitle",
        html: true,
        get text() {
          return GetLocalization(props.title);
        }
      }, _el$),
      _el$7 = libs.createElement("Label", {
        id: "TooltipDesc",
        html: true,
        get text() {
          return GetLocalization(props.text, props.text);
        }
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.propTypeKey !== "";
      },
      get children() {
        const _el$3 = libs.createElement("Label", {
          "class": "TooltipPropType",
          get text() {
            return "[" + GetLocalization(props.propTypeKey) + "]";
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "text", "[" + GetLocalization(props.propTypeKey) + "]", _$p));
        return _el$3;
      }
    }), _el$7);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.specialEffectsImage;
      },
      get fallback() {
        return (() => {
          const _el$0 = libs.createElement("Image", {
            id: "TooltipImage",
            get src() {
              return props.image;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$0, "src", props.image, _$p));
          return _el$0;
        })();
      },
      get children() {
        const _el$4 = libs.createElement("Panel", {
            id: "TooltipSpecialEffectsImagePanel"
          }, null);
          libs.createElement("Image", {
            id: "TooltipSpecialEffectsFrame"
          }, _el$4);
          const _el$6 = libs.createElement("Image", {
            id: "TooltipImage",
            get src() {
              return props.image;
            }
          }, _el$4);
        libs.effect(_$p => libs.setProp(_el$6, "src", props.image, _$p));
        return _el$4;
      }
    }), _el$7);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return heroCosmeticData();
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
            id: "TooltipCosmeticHero"
          }, null),
          _el$9 = libs.createElement("Label", {
            "class": "BelongHero",
            get text() {
              return GetLocalization("#Cosmetic_BelongingHero");
            }
          }, _el$8);
        libs.effect(_$p => libs.setProp(_el$9, "text", GetLocalization("#Cosmetic_BelongingHero"), _$p));
        return _el$8;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization(props.title),
        _v$2 = GetLocalization(props.text, props.text);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get title() {
      return root.GetAttributeString("title", "");
    },
    get image() {
      return root.GetAttributeString("image", "");
    },
    get text() {
      return root.GetAttributeString("text", "");
    },
    get specialEffectsImage() {
      return root.GetAttributeInt("special_effects_image", 0) == 1;
    },
    get propTypeKey() {
      return root.GetAttributeString("prop_type", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();
