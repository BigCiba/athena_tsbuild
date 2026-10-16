import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

/** 原版特殊进攻使用的引擎血条标记，不依赖尚未迁移的自定义血条。 */
@registerModifier()
export class modifier_original_health_bar extends BaseModifier {
	IsHidden() { return true; }
	IsPurgable() { return false; }
	RemoveOnDeath() { return false; }
	GetPriority() { return modifierpriority.MODIFIER_PRIORITY_HIGH; }
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
}
