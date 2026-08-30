'use strict'; const exports = {}; GameUI.__loadModule('equipment_utils', exports); const require = GameUI.__require;

const HeroID2Name = (() => {
  let res = {};
  for (let [name, {
    HeroID
  }] of Object.entries(KeyValues.heroes)) {
    res[HeroID] = name;
  }
  return res;
})();
function FillCfgData(data) {
  const kv = KeyValues.info_item_equipment[data.equipment_item_id];
  if (kv == undefined) return false;
  const classSetting = KeyValues.equip_class_setting[kv.class];
  data.rarity = kv.rarity;
  data.equip_part = kv.equip_part;
  data.need_level = classSetting.need_level;
  data.class = kv.class;
  return true;
}
function GetEquipmentDetail(ids, callback, force = false) {
  CustomUIConfig.EquipmentDetailCache ??= {};
  let result = {};
  let requestIDs = force ? ids : ids.filter(id => {
    if (CustomUIConfig.EquipmentDetailCache[id]) {
      result[id] = CustomUIConfig.EquipmentDetailCache[id];
      return false;
    }
    return true;
  });
  if (requestIDs.length > 0) {
    return ServerRequest("get_equip_detail", {
      id: requestIDs.map(i => String(i))
    }, data => {
      for (let [id, v] of Object.entries(data)) {
        if (FillCfgData(v)) {
          result[id] = v;
          CustomUIConfig.EquipmentDetailCache[id] = v;
        }
      }
      callback(result);
    });
  } else {
    callback(result);
  }
}
function ShowServerEquipTooltip(p, props) {
  let ids = [props.id1];
  if (props.id2) {
    ids.push(props.id2);
  }
  GetEquipmentDetail(ids, () => {
    if (p.IsValid() && p.BHasHoverStyle()) {
      ShowCustomTooltip(p, "server_equip", {
        id1: props.id1,
        id2: props.id2,
        hero_id: props.hero_id
      });
    }
  }, props.force);
}

exports.HeroID2Name = HeroID2Name;
exports.ShowServerEquipTooltip = ShowServerEquipTooltip;
