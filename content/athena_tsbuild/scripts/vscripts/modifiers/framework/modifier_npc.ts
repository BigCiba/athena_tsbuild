import { EOMModifier, registerEOMModifier } from "../eom_modifier/eom_modifier";

/** 原版 NPC 固定位置、无敌、无碰撞与隐藏血条。 */
@registerEOMModifier()
export class modifier_npc extends EOMModifier {
	IsHidden() { return true; }
	IsPurgable() { return false; }
	GetPriority() { return modifierpriority.MODIFIER_PRIORITY_HIGH; }
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
	CheckState() {
		return {
			[modifierstate.MODIFIER_STATE_ROOTED]: true,
			[modifierstate.MODIFIER_STATE_INVULNERABLE]: true,
			[modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: true,
			[modifierstate.MODIFIER_STATE_NO_UNIT_COLLISION]: true,
			[modifierstate.MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY]: true,
			[modifierstate.MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS]: true,
		};
	}
}
