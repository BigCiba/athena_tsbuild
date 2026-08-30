'use strict'; const exports = {}; GameUI.__loadModule('service_netdata_helper', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

function usePlayerAccountLevel(levelType = "hero_level", playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return data?.[levelType] ?? {
      level: 1,
      extra_exp: 0
    };
  }
  const playerAccountLevels = solid_utils.createServiceNetData("player_account_levels", playerID);
  return libs.createMemo(() => Parse(playerAccountLevels()));
}
function usePlayerMaxDiff(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return toFiniteNumber(data?.max_diff, 0);
  }
  const playerCommonMatchData = solid_utils.createServiceNetData("player_common_match_data", playerID);
  return libs.createMemo(() => Parse(playerCommonMatchData()));
}
function usePlayerMaxAbyssalDiff(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    let maxDiff = 0;
    for (const [diffText, info] of Object.entries(data ?? {})) {
      if ((info?.star ?? 0) <= 0) {
        continue;
      }
      const diff = toFiniteNumber(diffText, 0);
      if (diff > maxDiff) {
        maxDiff = diff;
      }
    }
    return maxDiff;
  }
  const playerAbyssalFirstPasses = solid_utils.createServiceNetData("player_abyssal_first_passes", playerID);
  return libs.createMemo(() => Parse(playerAbyssalFirstPasses()));
}

exports.usePlayerAccountLevel = usePlayerAccountLevel;
exports.usePlayerMaxAbyssalDiff = usePlayerMaxAbyssalDiff;
exports.usePlayerMaxDiff = usePlayerMaxDiff;
