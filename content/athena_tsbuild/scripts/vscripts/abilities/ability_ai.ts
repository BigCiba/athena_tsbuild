import { EOMAbility } from "./eom_ability";

export interface EOMAbilityAI {
	startCooldown: number;
	behavior: DOTA_ABILITY_BEHAVIOR,
	searchBehavior: AI_SEARCH_BEHAVIOR,
	aoeRadius: number,
	startWidth: number,
	endWidth: number,
	targetTeam: DOTA_UNIT_TARGET_TEAM,
	targetType: DOTA_UNIT_TARGET_TYPE,
	targetFlags: DOTA_UNIT_TARGET_FLAGS,
	funcSortFunction: (a: CDOTA_BaseNPC, b: CDOTA_BaseNPC) => boolean,
	funcCondition: (ability: CDOTA_Ability_Lua) => boolean,
	funcUnitsCallback: (this: CDOTA_Ability_Lua, tTargets: CDOTA_BaseNPC[]) => CDOTA_BaseNPC[],
	isNotPassive: boolean,
	orderType: FindOrder,

}
export class EOMAbilityAI extends EOMAbility {
	aiTimer: string | undefined;
	Spawn() {
		if (IsServer()) {
			this.ParseBehavior();
			this._StartThink();
		}
	}
	GetThinkInterval() {
		return AI_TIMER_TICK_TIME;
	}
	// 解析技能行为
	ParseBehavior() {
		// 主动技能解析技能行为
		if (!this.IsPassive() && this.behavior == undefined) {
			const behavior = tonumber(tostring(this.GetBehavior())) as DOTA_ABILITY_BEHAVIOR;
			if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET;
			} else if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET;
			} else if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT;
			}
		}
		// 初始化参数
		this.targetTeam = this.targetTeam ?? this.GetAbilityTargetTeam();
		this.targetType = this.targetType ?? this.GetAbilityTargetType();
		this.targetFlags = this.targetFlags ?? this.GetAbilityTargetFlags();
		if (this.targetTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_NONE) {
			this.targetTeam = DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY;
		}
		if (this.targetType == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_NONE) {
			this.targetType = DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS;
		}

		if ((this.targetType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
			this.targetType -= DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING;
		}
	}
	/** 开启AI Think */
	_StartThink() {
		this._StopThink();
		const hCaster = this.GetCaster();
		if (hCaster.HasState(StateEnum.AI_DISABLED)) {
			return this.GetThinkInterval();
		}
		if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition(this) != true) {
						return this.GetThinkInterval();
					}
					const aoeRadius = this.GetAOERadius();
					if (aoeRadius > 0) {
						const tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (IsValid(tTargets[0])) {
							this._CastAbilityNoTarget();
						}
					} else {
						this._CastAbilityNoTarget();
					}
				}
				return this.GetThinkInterval();
			});
		} else if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition(this) != true) {
						return this.GetThinkInterval();
					}
					const flCastRange = this.GetAICastRange();
					let vPosition = vec3_invalid;
					if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE) {
						const tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, flCastRange, this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (IsValid(tTargets[0])) {
							vPosition = tTargets[0].GetAbsOrigin();
						}
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET) {
						vPosition = GetAOEMostTargetsPosition(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType);
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET) {
						vPosition = GetLinearMostTargetsPosition(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetLinearStartWidth(), this.GetLinearEndWidth(), this.targetTeam, this.targetType, this.targetFlags, this.orderType, []);
					}
					if (vPosition != vec3_invalid) {
						this._CastAbilityOnPosition(vPosition);
					}
				}
				return this.GetThinkInterval();
			});
		} else if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition(this) != true) {
						return this.GetThinkInterval();
					}
					const flCastRange = this.GetAICastRange();
					let hTarget;
					if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE) {
						let tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, flCastRange, this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (this.funcUnitsCallback != undefined) {
							tTargets = this.funcUnitsCallback(tTargets);
						}
						if (IsValid(tTargets[0])) {
							hTarget = tTargets[0];
						}
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET) {
						hTarget = GetAOEMostTargetsSpellTarget(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType);
					}
					if (hTarget) {
						this._CastAbilityOnTarget(hTarget);
					}
				}
				return this.GetThinkInterval();
			});
		}
	}
	_StopThink() {
		if (this.aiTimer) {
			this.StopTimer(this.aiTimer);
			this.aiTimer = undefined;
		}
	}
	_CastAbilityNoTarget() {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET, this);
	}
	_CastAbilityOnPosition(vPosition: Vector) {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION, this, vPosition);
	}
	_CastAbilityOnTarget(hTarget: CDOTA_BaseNPC) {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET, this, hTarget);
	}
	_IsReady() {
		if (this.IsAbilityReady()) {
			return true;
		}
		return false;
	}
	GetAOERadius() {
		return this.aoeRadius ?? 0;
	}
	GetAICastRange() {
		return this.GetEffectiveCastRange(vec3_invalid, undefined as any);
	}
	GetLinearStartWidth() {
		return this.startWidth ?? 0;
	}
	GetLinearEndWidth() {
		return this.endWidth ?? 0;
	}
}
