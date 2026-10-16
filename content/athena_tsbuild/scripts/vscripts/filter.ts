import { reloadable } from "./lib/tstl-utils";

@reloadable
class MFilter extends CModule {
	private _filters: Record<string, Partial<Record<string, FilterCallbackType>>> = {};
	initPriority(): number {
		return 0;
	}

	init(bReload: boolean) {
		let GameMode = GameRules.GetGameModeEntity();
		if (bReload) {

		}
		GameMode.SetTrackingProjectileFilter(function (...args) { return this.TrackingProjectileFilter(...args); }, this);
	}

	private TrackingProjectileFilter(params: TrackingProjectileFilterEvent): boolean {
		// 取消官方弹道
		let attacker = EntIndexToHScript<CDOTA_BaseNPC>(params.entindex_source_const);
		let target = EntIndexToHScript<CDOTA_BaseNPC>(params.entindex_target_const);
		// 禁用攻击弹道阻止发射，和目标的 DODGE_BULLET 闪避命中分开处理。
		if (params.is_attack === 1 && IsValid(attacker) && attacker.HasState(StateEnum.ATTACK_PROJECTILE_DISABLED)) {
			if (IsValid(target)) Event.Fire("attack_projectile_disabled", { unit: attacker, target });
			return false;
		}
		if (params.is_attack == 1 && IsValid(attacker) && IsValid(target)) {
			// @ts-ignore
			params.attacker = attacker;
			// @ts-ignore
			params.target = target;
			// let result = GetModifierProperty(attacker, EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK, params) ?? 0;
			// if (result == true) {
			// 	return false;
			// }
			let direction = CalcDirection(target, attacker);
			const distance = attacker.Script_GetAttackRange();
			let info: GuidedCreateParams = {
				caster: attacker,
				target: target,
				direction: direction,
				// ability: this,
				// debug: true,
				effectName: attacker.GetRangedProjectileName(),
				spawnOrigin: attacker.GetAttachmentPosition("attach_attack1") ?? attacker.GetAbsOrigin(),
				moveSpeed: params.move_speed,
				radius: BULLET_WIDTH,
				lifeTime: distance / params.move_speed,
				teamFilter: DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
				typeFilter: DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC,
				flagFilter: DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
				OnBulletHit: (target, position, bulletData) => {
					attacker.Attack(target);
					return true;
				}
			};
			const kv: any = GetUnitKeyValuesByName(attacker.GetUnitName());
			if (kv != undefined) {
				if (kv.GuidanceAngularVelocity != undefined && kv.GuidanceAngularVelocity != "") {
					info.angularVelocity = toFiniteNumber(kv.GuidanceAngularVelocity);
				}
				if (kv.ProjectileType != undefined && kv.ProjectileType == "PROJECTILE_TYPE_LINEAR") {
					info.angularVelocity = 0;
				}
			}
			Bullet.CreateGuidedBullet(info);
			return false;
		}
		return true;
	}
}

declare global {
	var Filter: MFilter;
}
if (_G.Filter == undefined) {
	_G.Filter = new MFilter();
}
