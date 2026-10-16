import { EOMModifier, registerEOMModifier } from "./eom_modifier/eom_modifier";

/** 原版营地返回规则：追击离出生点超过 400 持续 5 秒后返回，空闲时自动回营。 */
@registerEOMModifier()
export class modifier_neutral extends EOMModifier {
	private camp?: Vector;
	private returnAt?: number;
	IsHidden() { return true; }
	IsPurgable() { return false; }
	RemoveOnDeath() { return false; }
	GetPriority() { return modifierpriority.MODIFIER_PRIORITY_HIGH; }
	CheckState() { return { [modifierstate.MODIFIER_STATE_NO_HEALTH_BAR]: false }; }
	StaticState() { return { [StateEnum.NO_HEALTH_BAR]: true }; }
	OnCreated() {
		if (IsServer() && this.GetParent().HasMovementCapability()) {
			this.camp = this.GetParent().GetAbsOrigin(); this.StartIntervalThink(0.1);
		}
	}
	OnIntervalThink() {
		const unit = this.GetParent();
		if (this.camp === undefined || !unit.IsAlive() || unit.IsFeared() || unit.HasState(StateEnum.FEAR) || unit.IsStunned()) { this.returnAt = undefined; return; }
		const distance = ((unit.GetAbsOrigin() - this.camp) as Vector).Length2D();
		if (IsValid(unit.GetAggroTarget())) {
			if (distance > 400) {
				this.returnAt ??= GameRules.GetGameTime() + 5;
				if (GameRules.GetGameTime() >= this.returnAt) { unit.MoveToPosition(this.camp); this.returnAt = undefined; }
			} else this.returnAt = undefined;
		} else if (distance > 0) {
			this.returnAt = undefined;
			const targets = FindUnitsInRadius(unit.GetTeamNumber(), unit.GetAbsOrigin(), undefined, unit.Script_GetAttackRange(),
				DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO,
				DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE, FindOrder.FIND_CLOSEST, false);
			if (targets.length === 0) unit.MoveToPosition(this.camp);
			else unit.MoveToPositionAggressive(unit.GetAbsOrigin());
		} else this.returnAt = undefined;
	}
}
