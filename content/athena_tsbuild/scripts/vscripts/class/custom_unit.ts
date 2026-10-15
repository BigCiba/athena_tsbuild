export class CustomUnit {
	kv: Table;
	entity: CBaseEntity;
	wantPosition: Vector | undefined;

	enableAttackTime: number = 0;

	isDispose: boolean = false;
	modifierThinker: CDOTA_BaseNPC;
	constructor(unitName: string, position: Vector, team: DOTATeam_t) {
		this.kv = KeyValues.units[unitName];
		this.entity = SpawnEntityFromTableSynchronous("dota_prop_customtexture", {
			angles: "0 0 0",
			model: this.kv.Model,
			origin: `${position.x} ${position.y} ${position.z}`,
			targetname: unitName,
			StartingAnim: "ACT_DOTA_SPAWN",
			StartingAnimationLoopMode: "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
			IdleAnim: "ACT_DOTA_IDLE",
			IdleAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
			teamnumber: tostring(team)
		});
		this.entity.StartThink(0, () => {
			if (this.wantPosition != undefined) {
				if (this.IsSequenceFinished()) {
					this.SetSequence("ACT_DOTA_RUN");
				}
				const currentPos = this.GetAbsOrigin();
				const direction = CalcDirection2D(this.wantPosition, currentPos);
				const movespeed = this.GetMoveSpeed();
				const distanceDt = movespeed * FrameTime();
				this.SetForwardVector(direction);
				if (CalcDistance(this.wantPosition, currentPos) > distanceDt) {
					this.entity.SetLocalOrigin((currentPos + direction * distanceDt) as Vector);
				} else {
					this.entity.SetLocalOrigin(this.wantPosition);
					this.wantPosition = undefined;
					this.SetSequence("ACT_DOTA_IDLE");
				}
			}
			this.SyncThinkerPosition();
		});
		this.modifierThinker = CreateModifierThinker(undefined, undefined, "modifier_custom_thinker", {}, position, team, false);
		UnitManager?.AddUnit(this.modifierThinker);
	}
	// ============================================================
	// region Action
	// ============================================================
	StartGesture(sequenceName: string) {
		// @ts-ignore
		this.entity.SetSequence(sequenceName);
	}
	AddNewModifier(
		caster: CDOTA_BaseNPC | undefined,
		ability: CDOTABaseAbility | undefined,
		modifierName: string,
		modifierTable: object | undefined,
		flags?: AddModifierFlag,
	): CDOTA_Buff | undefined {
		return this.modifierThinker.AddNewModifier(caster, ability, modifierName, modifierTable, flags);
	}

	// ============================================================
	// region Set
	// ============================================================
	SetForwardVector(forward: Vector) {
		this.entity.SetLocalAngles(0, VectorToAngles(forward).y, 0);
	}

	// ============================================================
	// region Get
	// ============================================================
	GetAbsOrigin() {
		return this.entity.GetAbsOrigin();
	}
	GetForwardVector() {
		return this.entity.GetForwardVector();
	}
	GetMoveSpeed() {
		return this.kv.MovementSpeed;
	}
	GetEntityIndex() {
		return this.entity.GetEntityIndex();
	}
	GetUnitName() {
		return this.entity.GetName();
	}
	GetRangedProjectileName() {
		return this.kv.ProjectileModel;
	}
	GetProjectileSpeed() {
		return this.kv.ProjectileSpeed;
	}


	private GetSequence() {
		// @ts-ignore
		return this.entity.GetSequence();
	}
	private SetSequence(sequenceName: string) {
		// @ts-ignore
		this.entity.SetSequence(sequenceName);
	}
	private GetCycle(): number {
		// @ts-ignore
		return this.entity.GetCycle();
	}
	private IsSequenceFinished(): boolean {
		// @ts-ignore
		return this.entity.IsSequenceFinished();
	}
	private SyncThinkerPosition() {
		if (IsValid(this.modifierThinker) && IsValid(this.entity)) {
			this.modifierThinker.SetAbsOrigin(this.entity.GetAbsOrigin());
		}
	}

	// ============================================================
	// region Attack
	// ============================================================
	Attack() {
		this.Stop();
		this.StartGesture("ACT_DOTA_ATTACK");
		this.enableAttackTime = GameRules.GetGameTime() + 2;
		this.entity.StartThink(0.3, () => {
			const start = this.GetAbsOrigin();
			const direction = this.GetForwardVector();
			let info: GuidedCreateParams = {
				caster: this.modifierThinker,
				direction: direction,
				effectName: "particles/units/creep/ranged_creep/ranged_creep_1_base_attack_fx.vpcf",
				spawnOrigin: (start + direction * 100 + Vector(0, 0, 45)) as Vector,
				moveSpeed: 900,
				radius: BULLET_WIDTH,
				lifeTime: 1200 / 900,
				reflectable: true,
				teamFilter: DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
				typeFilter: DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
				OnBulletHit: (target, position, bulletData) => {
					this.modifierThinker.Attack(target, { baseDamage: 10 });
					// FireModifierEvent(modifierfunction.MODIFIER_EVENT_ON_ATTACK_LANDED, {}, caster, target);
					return true;
				}
			};
			Bullet.CreateGuidedBullet(info);
			return -1;
		});
	}
	GetAttackCooldown() {

	}
	Move(position: Vector) {
		this.wantPosition = position;
		this.StartGesture("ACT_DOTA_RUN");
	}
	Stop() {
		this.wantPosition = undefined;
		this.SetSequence("ACT_DOTA_IDLE");
	}
	/** 销毁 */
	dispose() {
		if (this.isDispose) return;
		this.isDispose = true;

		if (IsValid(this.entity)) {
			this.entity.RemoveSelf();
			this.entity = undefined as any;
		}
		if (IsValid(this.modifierThinker)) {
			UnitManager?.RemoveUnit(this.modifierThinker);
			this.modifierThinker.RemoveSelf();
			this.modifierThinker = undefined as any;
		}
	}
}
