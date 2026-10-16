import { EOMModifier, registerEOMModifier, TransmitterData } from "../eom_modifier/eom_modifier";

/** Athena 敌人的难度、波次和随机成长；只提供加成，不初始化基础属性。 */
@registerEOMModifier({ IsHidden: true, IsPurgable: false, RemoveOnDeath: false })
export class modifier_enemy_scaling extends EOMModifier {
	@TransmitterData() private healthFactor = 1;
	@TransmitterData() private attackFactor = 1;
	@TransmitterData() private armorFactor = 1;
	OnCreated(params: { round_number?: number; }) {
		if (!IsServer()) return;
		const difficulty = GameRules.GetCustomGameDifficulty();
		const neutral = tonumber(KeyValues.units[this.GetParent().GetUnitName()]?.IsNeutralUnitType) === 1;
		const factor = neutral ? 1 : Math.pow(1.5, difficulty) * Math.pow(1 + 0.01 * difficulty, params.round_number ?? 1);
		this.healthFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor;
		this.armorFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor;
		this.attackFactor = RandomFloat(1, difficulty * 0.2 + 1.2) * factor;
	}
	DynamicProperty(): Partial<Record<PropertyFunction, DynamicPropertyFunction>> {
		const kv = KeyValues.units[this.GetParent().GetUnitName()];
		return {
			// 使用独立的 health/attack 加成，让精英百分比继续乘在成长后的数值上。
			[PropertyFunction.HEALTH]: () => GetBaseHealth(this.GetParent()) * (this.healthFactor - 1),
			[PropertyFunction.ATTACK]: () => GetBaseAttack(this.GetParent()) * (this.attackFactor - 1),
			[PropertyFunction.PHYSICAL_ARMOR]: () => (tonumber(kv?.Armor) ?? tonumber(kv?.ArmorPhysical) ?? 0) * (this.armorFactor - 1),
		};
	}
}
