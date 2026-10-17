import { ObjectPool } from "../../class/object_pool";
import { reloadable } from "../../lib/tstl-utils";

require("damage_system_type");

type DamageMessage = {
	victim: EntityIndex;
	attacker: EntityIndex;
	damage_type: EOM_DAMAGE_TYPES;
	/** 粒子实际显示的伤害数值前缀（最多五位）。 */
	damage: number;
	/** 原始伤害整数的总位数，供客户端还原单位后缀。 */
	damage_length: number;
	is_crit: number;
	/** 控制点 1 的 X 值，由服务端根据伤害标记计算。 */
	damage_effect: number;
};

/**
 * 功能介绍：
 * 自定义伤害系统，封装护甲/抗性/闪避/吸血/暴击等结算，并向伤害统计模块输出 DamageEvent。
 *
 * 使用方法：
 * 调用 DamageSystem.DealDamage(params, shouldRelease?) 造成自定义伤害；
 * params 使用 damage_system_type.ts 中的 DamageInfo 结构，结算后会触发 damage_event 事件。
 */
@reloadable
class CDamageSystem extends CModule {
	/** 每个限流时间窗内最多发送的伤害数字，避免高频伤害压垮客户端事件与粒子系统。 */
	private static readonly MAX_DAMAGE_MESSAGES_PER_INTERVAL = 32;
	/** 伤害数字限流时间窗（秒）。 */
	private static readonly DAMAGE_MESSAGE_LIMIT_INTERVAL_SECONDS = 1;
	/** 预留事件字段容量，避免 custom.gameevents 的 string 字段因过长被截断。 */
	private static readonly MAX_DAMAGE_MESSAGE_DATA_LENGTH = 900;
	private damageMessages: DamageMessage[] = [];
	private isDamageMessageFlushScheduled = false;
	private damageMessageLimitWindowStart = -1;
	private damageMessageCountInWindow = 0;
	/** 伤害参数对象池 */
	private damageInfoPool!: ObjectPool<DamageInfo>;

	init(reload: boolean): void {
		if (reload && this.damageInfoPool !== undefined) {
			return;
		}
		this.damageInfoPool = new ObjectPool<DamageInfo>(() => {
			return {
				attacker: RECORD_SYSTEM_DUMMY,
				target: RECORD_SYSTEM_DUMMY,
				damage: 0,
				damage_type: EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
			};
		}, undefined, (params) => {
			params.ability = undefined;
			params.damage_flags = undefined;
			params.damage_category = undefined;
			params.attack_states = undefined;
			params.record = undefined;
			params.is_crit = undefined;
			params.is_backstab = undefined;
			params.is_cleave = undefined;
			params.extraProperties = undefined;
		});
		this.damageMessages = [];
		this.isDamageMessageFlushScheduled = false;
		this.damageMessageLimitWindowStart = -1;
		this.damageMessageCountInWindow = 0;
	}

	/**
	 * 将本帧的伤害数字合并为一次事件，在下一帧发送给 UI。
	 * 超出当前限流时间窗上限的数字会被丢弃，避免伤害风暴造成事件和粒子堆积。
	 */
	private QueueDamageMessage(message: DamageMessage) {
		const now = GameRules.GetGameTime();
		if (this.damageMessageLimitWindowStart < 0
			|| now - this.damageMessageLimitWindowStart >= CDamageSystem.DAMAGE_MESSAGE_LIMIT_INTERVAL_SECONDS) {
			this.damageMessageLimitWindowStart = now;
			this.damageMessageCountInWindow = 0;
		}

		if (this.damageMessageCountInWindow >= CDamageSystem.MAX_DAMAGE_MESSAGES_PER_INTERVAL) {
			return;
		}

		this.damageMessageCountInWindow++;
		this.damageMessages.push(message);
		if (this.isDamageMessageFlushScheduled) {
			return;
		}

		this.isDamageMessageFlushScheduled = true;
		Timer.Timer(FrameTime(), () => {
			const messages = this.damageMessages;
			this.damageMessages = [];
			this.isDamageMessageFlushScheduled = false;
			if (messages.length > 0) {
				// custom.gameevents 仅支持扁平字段；记录以 | 分隔，字段以 : 分隔。
				const serializedMessages: string[] = [];
				let dataLength = 0;
				for (const message of messages) {
					const serializedMessage = [
						message.victim,
						message.attacker,
						message.damage_type,
						message.damage,
						message.damage_length,
						message.is_crit,
						message.damage_effect,
					].join(":");
					const nextLength = dataLength + serializedMessage.length + (serializedMessages.length > 0 ? 1 : 0);
					if (nextLength > CDamageSystem.MAX_DAMAGE_MESSAGE_DATA_LENGTH) {
						break;
					}
					serializedMessages.push(serializedMessage);
					dataLength = nextLength;
				}

				if (serializedMessages.length > 0) {
					FireGameEvent("custom_damage_msg", { data: serializedMessages.join("|") });
				}
			}
		});
	}

	/**
	 * 将伤害压缩为伤害粒子真正会显示的前缀与总位数。
	 * 显示规则最多需要五位有效数字，后续数字只影响单位后缀，因此无需传给客户端。
	 */
	private GetDamageDisplayValue(damage: number): { damage: number; damage_length: number; } {
		let value = math.abs(Round(damage));
		if (value <= 0) {
			return { damage: 0, damage_length: 1 };
		}

		let damageLength = 1;
		let divisor = 10;
		while (value >= divisor) {
			damageLength++;
			divisor *= 10;
		}

		// 6、9、12…位显示前三位；7、10…位显示前四位；8、11…位显示前五位。
		const displayLength = damageLength <= 5 ? damageLength : 3 + (damageLength - 6) % 3;
		for (let index = displayLength; index < damageLength; index++) {
			value = math.floor(value / 10);
		}

		return { damage: value, damage_length: damageLength };
	}

	/** 根据伤害标记计算伤害数字粒子控制点 1 的 X 值。 */
	private GetDamageDisplayEffect(damageFlags: EOM_DAMAGE_FLAGS, isBackstab: boolean): number {
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.POISON_DAMAGE)) return 1;
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.SHIELD_DAMAGE)) return 2;
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.BLADE)) return 3;
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE)) return 4;
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE)) return 5;
		if (isBackstab || BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.Backstab)) return 6;
		if (BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE)) return 7;
		return 0;
	}

	AcquireDamageInfo(): DamageInfo {
		return this.damageInfoPool.Get();
	}

	ReleaseDamageInfo(params: DamageInfo): void {
		this.damageInfoPool.Release(params);
	}

	DealDamage(params: DamageInfo, shouldRelease: boolean = false): void {
		try {
			params.extraProperties = undefined;
			const attacker = params.attacker;
			const target = params.target;
			const originalDamage = params.damage;
			if (!IsValid(attacker) || !IsValid(target)) {
				return;
			}
			if (!target.IsAlive() || target.GetHealth() <= 0 || target.IsInvulnerable()) {
				return;
			}
			if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK && target.HasState(StateEnum.ATTACK_IMMUNE)) {
				return;
			}
			const ability = params.ability;
			if (IsValid(ability)) {
				const caster = ability.GetCaster();
				if (IsValid(caster) && caster.entindex() === attacker.entindex()) {
					params.extraProperties = PropertySystem.GetAbilityExtraPropertyTable(ability);
				}
			}
			params.damage_flags ??= EOM_DAMAGE_FLAGS.NONE;
			params.damage_category ??= DamageCategory_t.DOTA_DAMAGE_CATEGORY_BARRIER;
			params.is_crit ??= false;
			params.is_backstab ??= false;
			/** 是否闪避标记 */
			let isEvasionFlag = false;
			// 暴击处理
			const canCrit = this.hasCrit(params);
			if (!canCrit) params.is_crit = false;
			if (canCrit) {
				let fCritChance = this.getCritChance(params);
				let fCritDamage = this.getCritDamage(params);

				// TODO
				let fCritDamageReduce = 0;

				// 如果没有暴击
				if (!params.is_crit) {
					if (fCritChance > 0 && fCritDamage > 0) {
						fCritDamage *= (1 - fCritDamageReduce * 0.01);
						if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK) {
							fCritDamage *= (1 + GetAttackCritDamageBoost(attacker, params) * 0.01);
						} else if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL) {
							fCritDamage *= (1 + GetSpellCritDamageBoost(attacker, params) * 0.01);
						}
						let pseudo_random_recording = "";
						if (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
							pseudo_random_recording = "physical_critical_strike";
						} else if (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
							pseudo_random_recording = "magical_critical_strike";
						}
						params.is_crit = PRD(attacker, fCritChance, pseudo_random_recording);
					}
				}


				if (params.is_crit) {
					if (params.damage_category === DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK && params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
						const sound = GetCriticalstrikeSound(attacker, params) as any;
						if (typeof sound === "string" && sound !== "") EmitSoundOn(sound, attacker);
					}
					// 原版 OnCritical 仅通知非普攻；现有 C1 普通订阅仍接收所有暴击。
					if (params.damage_category !== DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK
						&& (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL || params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)) Event.FireUnit("crit_event", params as DamageEvent, attacker);
					else Event.Fire("crit_event", params as DamageEvent);
					params.damage *= fCritDamage * 0.01;
				}
			}


			// 闪避处理
			if (this.hasEvasion(params)) {
				// 先计算攻击单位的miss几率
				let fMissChance = this.getMissChance(params);
				if (fMissChance > 0) {
					isEvasionFlag = PRD(attacker, fMissChance, "getMissChance");
					if (isEvasionFlag) {
						SendOverheadEventMessage(undefined, DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_EVADE, target, 0, attacker.GetPlayerOwner());
						// FireModifierEvent(EOMModifierEvents.MODIFIER_EVENT_ON_EVASION, params, target, attacker);
						return;
					}
				}
				// 计算目标单位的闪避几率
				let fEvasionChance = this.getEvasionChance(params);
				if (fEvasionChance > 0) {
					isEvasionFlag = PRD(target, fEvasionChance, "getEvasionChance");
					if (isEvasionFlag) {
						SendOverheadEventMessage(undefined, DOTA_OVERHEAD_ALERT.OVERHEAD_ALERT_EVADE, target, 0, attacker.GetPlayerOwner());
						// FireModifierEvent(EOMModifierEvents.MODIFIER_EVENT_ON_EVASION, params, target, attacker);
						return;
					}
				}
			}

			// 攻击附加伤害
			if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK) {
				params.damage += GetAttackDamageProc(attacker, params);
			} else if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL) {
				params.damage += GetSpellDamageProc(attacker, params);
				params.damage += GetSpellDamageProcTarget(target, params);
			}

			params.damage += GetDamageProcTarget(target, params);

			// 伤害放大
			if (!params.is_cleave) {
				params.damage *= (1 + GetOutgoingDamagePercent(attacker, params) * 0.01);
				params.damage *= GetAthenaOutgoingMultiplier(attacker, params);
			}
			// 伤害减免
			params.damage *= (1 + GetIncomingDamagePercent(target, params) * 0.01);
			params.damage *= GetAthenaIncomingMultiplier(target, params);
			// 原版格挡对纯粹伤害同样生效，始终在百分比减免之后扣除。
			params.damage = math.max(0, params.damage - GetAthenaDamageBlock(target, params));

			// 伤害调整
			if (this.hasAdjust(params)) {
				// damage -= GetAdjustDamage(target, params);
				// damage = math.max(0, damage);
				// FireModifierEvent(EOMModifierEvents.MODIFIER_EVENT_ON_ADJUST, params, attacker, target);
			}


			// 最后处理规避伤害
			if (GetAvoidDamage(params.target, params) > 0) {
				params.damage = 0;
				Event.Fire("avoid_damage", { unit: params.target });
				// return;
			}

			// 护盾系统：查找护盾modifier并消耗
			// const shieldModifier = params.target.GetShieldModifier();
			// if (shieldModifier != undefined && !BitAndEquals(params.damage_flags, EOM_DAMAGE_FLAGS.IGNORE_BARRIER)) {
			// 	const shield = shieldModifier as any;
			// 	if (shield.ConsumeShield != undefined) {
			// 		const originalDamage = params.damage;
			// 		params.damage = shield.ConsumeShield(params.damage);
			// 		const shieldConsumed = originalDamage - params.damage;
			// 		Event.Fire("consume_shield", { damageEvent: params as DamageEvent, shield: shieldConsumed });
			// 	}
			// }

			const currentHealth = params.target.GetHealth();
			const minHealth = GetMinHealth(params.target, params);
			if (currentHealth > params.damage + 1) {
				params.target.SetHealth(math.max(currentHealth - params.damage, minHealth));
			} else {
				if (minHealth > 0) {
					params.target.SetHealth(minHealth);
				} else {
					params.target.Kill(params.ability, params.attacker);
				}
			}
			// Kill 会同步触发死亡事件和 modifier OnDestroy；临时单位可能在调用链中直接 RemoveSelf。
			if (!IsValid(params.target)) {
				return;
			}
			(params as any).health_before_damage = currentHealth;
			this.ApplyLifesteal(params);
			this.ApplyCleave(params, originalDamage);
			if (!IsValid(params.target)) return;

			Event.Fire("damage_event", params as DamageEvent);
			if (!IsValid(params.target)) {
				return;
			}
			if (!params.target.IsAlive()) {
				// Kill 已由 game.OnEntityKilled 接收原生死亡事件并发布，禁止重复结算。
				LargeNumberHealth.Clear(params.target);
			}
			// if (currentHealth > damage) {
			// 	params.target.SetHealth((math.max(1, currentHealth - damage, minHealth)));
			// } else {
			// 	if (minHealth > 0) {
			// 		params.target.SetHealth(minHealth);
			// 	} else {
			// 		params.target.Kill(params.ability, params.attacker);
			// 		FireGameEvent("battle_killed", {
			// 			entindex_attacker: params.attacker.entindex(),
			// 			entindex_killed: params.target.entindex(),
			// 		});
			// 	}
			// }
			// 自己发布受伤事件
			// FireModifierEvent(EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE, damageInfoEvent, attacker, target);
			if (!IsValid(params.attacker)) {
				return;
			}
			let [DisableDamageDisplay] = KeyValues.GetUnitData<[number]>(target, "DisableDamageDisplay");
			if (DisableDamageDisplay != 1 && Service.GetPlayerSetting(params.attacker.GetPlayerOwnerID(), "setting_switch_damage_msg", true)) {
				const displayValue = this.GetDamageDisplayValue(params.damage);
				const displayEffect = this.GetDamageDisplayEffect(params.damage_flags, params.is_backstab);
				this.QueueDamageMessage({
					victim: params.target.entindex(),
					attacker: params.attacker.entindex(),
					damage_type: params.damage_type,
					damage: displayValue.damage,
					damage_length: displayValue.damage_length,
					is_crit: params.is_crit ? 1 : 0,
					damage_effect: displayEffect,
				});

			}
			// 发布伤害数值事件
			// FireGameEvent("custom_damage_msg", {
			// 	victim: target.entindex(),
			// 	attacker: attacker.entindex(),
			// 	damage_type: params.damage_type,
			// 	damage: tostring(damage),
			// });
		} finally {
			if (shouldRelease) {
				this.ReleaseDamageInfo(params);
			}
		}
	}
	private ApplyLifesteal(params: DamageInfo) {
		const { attacker, target } = params;
		if (!IsValid(attacker) || !attacker.IsAlive() || target === attacker || target.IsBuilding() || target.IsOther()
			|| ((params.damage_flags ?? 0) & (EOM_DAMAGE_FLAGS.NO_LIFESTEAL | EOM_DAMAGE_FLAGS.REFLECT_DAMAGE)) !== 0) return;
		const value = params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL ? GetPhysicalLifesteal(attacker, params)
			: params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL ? GetMagicalLifesteal(attacker, params) : 0;
		if (params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL || params.damage_type === EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
			const lifesteal = value + GetAllLifesteal(attacker, params);
			if (lifesteal > 0 && params.damage > 0) attacker.Heal(params.damage * lifesteal * 0.01, params.ability);
		}
	}
	/** 分裂以本次原始攻击伤害为基数；跳过暴击和攻击计数，禁止再次分裂。 */
	private ApplyCleave(params: DamageInfo, originalDamage: number) {
		if (!IsValid(params.attacker) || params.damage_category !== DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK
			|| ((params.attack_states ?? 0) & (ATTACK_STATES.NOT_PROCESSPROCS | ATTACK_STATES.NO_CLEAVE)) !== 0) return;
		const radius = GetCleaveRadius(params.attacker, params), percent = GetCleaveDamage(params.attacker, params);
		if (radius <= 0 || percent <= 0) return;
		const center = params.target.GetAbsOrigin(), damage = originalDamage * percent * 0.01;
		const targets = FindUnitsInRadius(params.attacker.GetTeamNumber(), center, undefined, radius,
			DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY, DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE, FindOrder.FIND_ANY_ORDER, false);
		for (const target of targets) if (target !== params.target && IsValid(target) && IsValid(params.attacker)) this.DealDamage({
			attacker: params.attacker, target, damage,
			damage_type: EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL, damage_category: DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL,
			damage_flags: EOM_DAMAGE_FLAGS.NO_CRIT, attack_states: ATTACK_STATES.NO_CLEAVE | ATTACK_STATES.SKIPCOUNTING, is_cleave: true,
		});
		if (IsValid(params.attacker) && IsValid(params.target)) Event.FireUnit("cleave", {
			attacker: params.attacker, target: params.target, center, radius, damage, tTargets: targets,
		}, params.attacker, params.target);
	}
	/** 是否可以暴击 */
	hasCrit(params: DamageInfo) {
		return ((params.damage_flags ?? 0) & EOM_DAMAGE_FLAGS.NO_CRIT) !== EOM_DAMAGE_FLAGS.NO_CRIT
			&& !params.target.HasState(StateEnum.CRITICAL_IMMUNE) && !params.attacker.HasState(StateEnum.NO_CRIT);
	}
	/** 是否可以闪避 */
	hasEvasion(params: DamageInfo) {
		return params.damage_category === DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK;
	}
	/** 是否可以护盾易伤调整伤害 */
	hasAdjust(params: DamageInfo) {
		return true;
	}
	/** 获取暴击率 */
	getCritChance(params: DamageInfo) {
		let chance = GetCritChance(params.attacker, params) + GetAthenaCritChance(params.attacker, params);
		if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK) {
			chance += GetAttackCritChance(params.attacker, params);
		} else if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL) {
			chance += GetSpellCritChance(params.attacker, params);
		}
		return chance;
	}
	/** 获取暴击伤害 */
	getCritDamage(params: DamageInfo) {
		let fCritDamage = GetCritDamage(params.attacker, params) + GetAthenaCritDamage(params.attacker, params);
		if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_ATTACK) {
			fCritDamage += GetAttackCritDamage(params.attacker, params);
		} else if (params.damage_category == DamageCategory_t.DOTA_DAMAGE_CATEGORY_SPELL) {
			fCritDamage += GetSpellCritDamage(params.attacker, params);
		}
		fCritDamage *= (1 + GetCritDamageMult(params.attacker, params) * 0.01);
		return fCritDamage;
	}
	/** 获取闪避率 */
	getEvasionChance(params: DamageInfo) {
		return GetAthenaEvasion(params.target, params);
	}
	/** 获取丢失率 */
	getMissChance(params: DamageInfo) {
		return 0;
	}
}

declare global {
	var DamageSystem: CDamageSystem;
}

DamageSystem ??= new CDamageSystem();
