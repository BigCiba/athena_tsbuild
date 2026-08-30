/** @noSelfInFile */
// @ts-nocheck

declare let thisEntity: CBaseEntity & { unitname: string; };

function OnStartTouch(trigger: { activator?: CBaseEntity, caller: CBaseEntity; }) {
	if (!IsValid(trigger.activator) || !IsValid(trigger.caller)) return;
	if (!trigger.activator.IsBaseNPC()) return;
	if (trigger.activator.IsBuilding()) return;
	if (trigger.activator.IsInvulnerable()) return;
	if (!trigger.caller.LoadData("enabled", true)) return;
	const caster = trigger.activator as CDOTA_BaseNPC;
	const triggerName = thisEntity.GetName();
	// print("OnStartTouch - trigger ", triggerName);
	const prefix = triggerName.split("_")[0];
	const trapList = Entities.FindAllByName(prefix + "_trap_floor_model");
	const spawnGroup = thisEntity.GetSpawnGroupHandle();
	trigger.caller.SaveData("enabled", false);
	trigger.caller.GameTimer(2, () => {
		trigger.caller.SaveData("enabled", true);
	});
	for (const trap of trapList) {
		if (trap.GetSpawnGroupHandle() === spawnGroup) {
			Event.Fire("trap_floor", {
				caster: caster,
				trap: trap,
			});
		}
	}
	// FireGameEventLocal("trigger_start_touch", {
	// 	trigger_name: triggerName,
	// 	activator_entindex: trigger.activator?.GetEntityIndex() ?? -1 as EntityIndex,
	// 	caller_entindex: trigger.caller.GetEntityIndex(),
	// });
	// Event.Fire("trap_floor", {

	// })
}
function OnEndTouch(trigger: { activator?: CBaseEntity, caller: CBaseEntity; }) {
	const triggerName = thisEntity.GetName();
	// print("OnEndTouch - trigger ", triggerName);

	// FireGameEventLocal("trigger_end_touch", {
	// 	trigger_name: triggerName,
	// 	activator_entindex: trigger.activator?.GetEntityIndex() ?? -1 as EntityIndex,
	// 	caller_entindex: trigger.caller.GetEntityIndex(),
	// });
}