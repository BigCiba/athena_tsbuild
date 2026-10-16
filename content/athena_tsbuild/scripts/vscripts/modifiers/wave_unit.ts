import { EOMModifier, registerEOMModifier } from "./eom_modifier/eom_modifier";

/** 普通波次标记。原版自定义血条尚未迁移，先保留可见的引擎血条。 */
@registerEOMModifier()
export class modifier_wave extends EOMModifier {
	IsHidden() { return true; }
	IsPurgable() { return false; }
	RemoveOnDeath() { return false; }
	GetPriority() { return modifierpriority.MODIFIER_PRIORITY_HIGH; }
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
}

/** 两种精英共用行为；各 modifier 以自身名称持有独立百分比来源。 */
class WaveChampionModifier extends EOMModifier {
	IsHidden() { return true; }
	IsPurgable() { return false; }
	RemoveOnDeath() { return false; }
	OnCreated(params: { round_number?: number; }) {
		if (IsServer()) { this.SetStackCount(params.round_number ?? 0); this.StartIntervalThink(1); }
	}
	StaticProperty(): Partial<Record<PropertyFunction, number>> {
		const difficulty = GameRules.GetCustomGameDifficulty();
		const bonus = difficulty / 2 * Math.pow(1 + 0.01 * difficulty, this.GetStackCount()) * 100;
		return { [PropertyFunction.HEALTH_AMPLIFY]: bonus, [PropertyFunction.ATTACK_AMPLIFY]: bonus };
	}
	OnIntervalThink() {
		const parent = this.GetParent();
		if (parent.IsAlive()) parent.Heal(parent.GetMaxHealth() * 0.01, undefined);
	}
	DeclareFunctions() { return [modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT, modifierfunction.MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT]; }
	GetModifierMoveSpeedBonus_Constant() { return -50; }
	GetModifierAttackSpeedBonus_Constant() { return 20 * GameRules.GetCustomGameDifficulty(); }
}

@registerEOMModifier()
export class modifier_champion extends WaveChampionModifier { }

/** 难度 3 起普通 wave 怪额外随机获得强化，保留原版模型放大与状态特效。 */
@registerEOMModifier()
export class modifier_elite extends WaveChampionModifier {
	OnCreated(params: { round_number?: number; }) {
		super.OnCreated(params);
		if (IsClient()) {
			const particle = ParticleManager.CreateParticle("particles/status_fx/status_effect_huskar_lifebreak.vpcf", ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, this.GetParent());
			this.AddParticle(particle, false, true, 10, false, false);
		}
	}
	DeclareFunctions() { return [...super.DeclareFunctions(), modifierfunction.MODIFIER_PROPERTY_MODEL_SCALE]; }
	GetModifierModelScale() { return 50; }
}
