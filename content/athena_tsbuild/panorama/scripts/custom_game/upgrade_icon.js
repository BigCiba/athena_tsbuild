'use strict'; const exports = {}; GameUI.__loadModule('upgrade_icon', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const PortraitsFullBodyLoadout = props => {
  const [local, others] = libs.splitProps(props, ["unit", "class", "camera", "background", "allowrotation", "children"]);
  const [key, SetKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "portraits_full_body_loadout";
  let camera = libs.createMemo(() => local.camera ?? "default");
  let queueReleased = false;
  let reload = false;
  let queueToken = QueueSerialSceneEntityLoad(entityName, () => {
    setSceneEnabled(true);
  });
  const releaseQueueToken = () => {
    if (!queueReleased) {
      queueReleased = true;
      ReleaseSerialSceneEntityLoad(entityName, queueToken);
    }
  };
  libs.onCleanup(() => {
    let s = key();
    if (s != undefined) {
      StopWaitSceneEntityLoad(entityName, s);
      SetKey(undefined);
    }
    releaseQueueToken();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("PortraitsFullBodyLoadout", local.class);
        }
      }), null),
      _el$2 = libs.createElement("DOTAScenePanel", {
        id: "PortraitsFullBodyLoadoutBG",
        hittest: false
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("PortraitsFullBodyLoadout", local.class);
      }
    }), true);
    libs.use(self => {
      if (local.background) {
        const kv = KeyValues.npc_units_custom[local.unit] ?? KeyValues.heroes[local.unit];
        if (kv != undefined && kv.Model2D != undefined && kv.Model2D != "") {
          self.SetUnit(kv.Model2D, "", true);
        }
      }
    }, _el$2);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$3 = libs.createElement("DOTAScenePanel", {
          id: "PortraitsFullBodyLoadoutScene",
          "animate-during-pause": true,
          map: "scene/portraits_full_body_loadout",
          get camera() {
            return camera();
          },
          light: "portrait_light",
          renderdeferred: true,
          rendershadows: true,
          deferredalpha: true,
          particleonly: false,
          get allowrotation() {
            return local.allowrotation;
          },
          antialias: true
        }, null);
        libs.use(self => {
          reload = false;
          SetKey(WaitSceneEntityLoad(entityName, {
            unitname: local.unit,
            camera: camera()
          }));
          let checkUpdate = () => {
            let s = key();
            if (!self.IsValid() || s == undefined) {
              if (s != undefined) {
                StopWaitSceneEntityLoad(entityName, s);
                SetKey(undefined);
              }
              releaseQueueToken();
            } else {
              $.Schedule(0, checkUpdate);
            }
          };
          checkUpdate();
        }, _el$3);
        libs.setProp(_el$3, "onload", self => {
          if (reload) {
            setSceneEnabled(false);
            queueReleased = false;
            queueToken = QueueSerialSceneEntityLoad(entityName, () => {
              setSceneEnabled(true);
            });
          } else {
            let s = key();
            if (s != undefined) {
              StopWaitSceneEntityLoad(entityName, s);
              SetKey(undefined);
            }
            releaseQueueToken();
            if (reload == false) {
              reload = true;
            }
          }
        });
        libs.effect(_p$ => {
          const _v$ = camera(),
            _v$2 = local.allowrotation;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "camera", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "allowrotation", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$3;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

const UpgradeIcon = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("UpgradeIcon", props.class, props.size ?? "small"),
    showRarity: true
  });
  const [local, others] = libs.splitProps(merged, ["upgradeID", "showRarity", "showTips"]);
  const kv = libs.createMemo(() => KeyValues.ability_upgrades[local.upgradeID]);
  const src = libs.createMemo(() => {
    const getTexturePath = name => {
      if (!name) return;
      if (name.startsWith("item_")) {
        const rawPath = `resource/flash3/images/items/${name.substring(5)}.png`;
        if (HasResource(rawPath)) {
          return "raw://" + rawPath;
        }
        return `file://{images}/items/${name.substring(5)}.png`;
      }
      const rawPath = `resource/flash3/images/spellicons/${name}.png`;
      if (HasResource(rawPath)) {
        return "raw://" + rawPath;
      }
      return `file://{images}/spellicons/${name}.png`;
    };
    let abilityTextureName = kv()?.AbilityTextureName;
    if (!abilityTextureName) {
      const abilityName = kv()?.ability_name;
      if (abilityName) {
        const abilityKv = KeyValues.npc_abilities_custom[abilityName];
        abilityTextureName = abilityKv?.AbilityTextureName;
      }
    }
    return getTexturePath(abilityTextureName);
  });
  const rarity = libs.createMemo(() => {
    return toFiniteNumber(kv()?.Rarity);
  });
  const tooltipProps = libs.createMemo(() => {
    return local.showTips ? {
      customTooltip: {
        name: "ability_upgrade",
        upgradeID: local.upgradeID
      }
    } : undefined;
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, tooltipProps), null),
      _el$2 = libs.createElement("Image", {
        id: "UpgradeImage",
        scaling: "stretch-to-fit-y-preserve-aspect",
        get src() {
          return src();
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, tooltipProps), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.showRarity;
      },
      get children() {
        const _el$3 = libs.createElement("Panel", {
          id: "Border",
          get ["class"]() {
            return "Rarity" + rarity();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "class", "Rarity" + rarity(), _$p));
        return _el$3;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$2, "src", src(), _$p));
    return _el$;
  })();
};

exports.PortraitsFullBodyLoadout = PortraitsFullBodyLoadout;
exports.UpgradeIcon = UpgradeIcon;
