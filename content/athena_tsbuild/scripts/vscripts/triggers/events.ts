import { registerEntityFunction } from "../lib/dota_ts_adapter";
declare const thisEntity: CBaseEntity;

/** 原版地图仍引用 triggers/events；只桥接触碰事实，不在地图脚本中执行任务逻辑。 */
registerEntityFunction("OnStartTouch", (trigger: { activator?: CDOTA_BaseNPC; }) => {
	if (IsValid(trigger.activator)) Event.Fire("collision_trigger", { activator: trigger.activator, name: thisEntity.GetName(), type: 1 });
});
registerEntityFunction("OnEndTouch", (trigger: { activator?: CDOTA_BaseNPC; }) => {
	if (IsValid(trigger.activator)) Event.Fire("collision_trigger", { activator: trigger.activator, name: thisEntity.GetName(), type: 0 });
});
