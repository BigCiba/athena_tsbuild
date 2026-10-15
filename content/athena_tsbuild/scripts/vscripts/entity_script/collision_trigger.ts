import { registerEntityFunction } from "../lib/dota_ts_adapter";
declare const thisEntity: CBaseEntity;
registerEntityFunction("CollisionTrigger_OnStartTouch", (event) => {
	// @ts-ignore
	const unit = event.activator as CDOTA_BaseNPC | undefined;
	const name = thisEntity?.GetName() ?? "";
	if (unit && name != "") {
		Event.Fire("collision_trigger", {
			activator: unit,
			name: name,
			type: 1,
		});
	}
});
registerEntityFunction("CollisionTrigger_OnEndTouch", (event) => {
	// @ts-ignore
	const unit = event.activator as CDOTA_BaseNPC | undefined;
	const name = thisEntity?.GetName() ?? "";
	if (unit && name != "") {
		Event.Fire("collision_trigger", {
			activator: unit,
			name: name,
			type: 0,
		});
	}
});