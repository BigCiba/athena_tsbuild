import { EOMItem } from "../../eom_ability";
import { registerAbility } from "../../../lib/dota_ts_adapter";
import { EOMModifier, registerEOMModifier } from "../../../modifiers/eom_modifier/eom_modifier";

/** 第一条赏金任务的战旗：原版友军基础攻击与攻击速度光环。 */
@registerAbility()
export class item_zhanqi extends EOMItem { GetIntrinsicModifierName() { return "modifier_item_zhanqi"; } }
@registerEOMModifier({ IsHidden: true, IsPurgable: false, RemoveOnDeath: false })
export class modifier_item_zhanqi extends EOMModifier {
	IsAura() { return true; }
	GetAuraRadius() { return this.GetAbilitySpecialValueFor("radius"); }
	GetAuraSearchTeam() { return DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY; }
	GetAuraSearchType() { return DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC; }
	GetAuraSearchFlags() { return DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE; }
	GetModifierAura() { return "modifier_item_zhanqi_buff"; }
}
@registerEOMModifier({ IsHidden: false, IsPurgable: false })
export class modifier_item_zhanqi_buff extends EOMModifier {
	StaticProperty() {
		return { [PropertyFunction.ATTACK_DAMAGE_BASE_PERCENTAGE]: this.GetAbilitySpecialValueFor("bonus_attack"),
			[PropertyFunction.ATTACKSPEED]: this.GetAbilitySpecialValueFor("bonus_attack_speed") };
	}
}
