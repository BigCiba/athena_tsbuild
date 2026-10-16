import { EOMModifier, registerEOMModifier } from "../eom_modifier/eom_modifier";

/** 原版通用标记：仅隐藏自定义血条，不改变引擎 CheckState。 */
@registerEOMModifier({ IsHidden: true, IsPurgable: false, RemoveOnDeath: false })
export class modifier_no_health_bar extends EOMModifier {
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
}
