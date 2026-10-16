import { EOMModifier, registerEOMModifier } from "./eom_modifier/eom_modifier";

/** 原版特殊进攻使用的引擎血条标记，不依赖尚未迁移的自定义血条。 */
@registerEOMModifier()
export class modifier_original_health_bar extends EOMModifier {
	IsHidden() { return true; }
	IsPurgable() { return false; }
	RemoveOnDeath() { return false; }
	GetPriority() { return modifierpriority.MODIFIER_PRIORITY_HIGH; }
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
	/** 原版保留引擎血条并隐藏自定义血条。 */
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
}
