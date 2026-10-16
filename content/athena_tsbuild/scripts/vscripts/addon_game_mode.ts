/** @noSelfInFile **/

SendToServerConsole("dota_combine_models 0");
Convars.SetBool("dota_combine_models", false);
SendToServerConsole("dota_max_physical_items_purchase_limit 99999");

require("requires")
function Activate() {
	print("=== Activate ===");
	CModule.initialize()
}

function Precache(context: CScriptPrecacheContext) {
	let precacheAutoList: Record<string, string[]> = require("precache_auto");
	for (const sPrecacheMode in precacheAutoList) {
		const aList = precacheAutoList[sPrecacheMode];
		if (sPrecacheMode == "particle_tool" && (IsInToolsMode() || !IsDedicatedServer())) {
			for (const [_, sResource] of ipairs(aList)) {
				PrecacheResource("particle", sResource, context);
			}
		} else {
			aList.forEach(sResource => {
				PrecacheResource(sPrecacheMode, sResource, context);
			});
		}
	}

	let precacheList: Record<string, string[]> = require("precache");
	for (const [sPrecacheMode, list] of pairs(precacheList)) {
		for (const [_, sResource] of ipairs(list)) {
			PrecacheResource(sPrecacheMode, sResource, context);
		}
	}

	// 沿用 Athena 原版的地图级单位预载，确保直接创建和重开替换英雄时模型已驻留。
	for (const units of [KeyValues.units, KeyValues.heroes]) {
		for (const name in units) {
			if (name !== "Version" && typeof units[name] === "object") PrecacheUnitByNameSync(name, context);
		}
	}

	// for (const k in KeyValues.ItemsKv) {
	// 	if (k != "Version") {
	// 		PrecacheItemByNameSync(k, context);
	// 	}
	// }
}

function SpawnGroupPrecache(hSpawnGroup: SpawnGroupHandle, context: CScriptPrecacheContext) {
}

require("reload");
