/**
 * 功能介绍：
 * 定义自定义伤害系统的伤害类型、伤害分类、伤害标记、入参和结算事件结构。
 *
 * 使用方法：
 * 调用 DamageSystem.DealDamage 时传入 DamageInfo；
 * 监听 damage_event 事件或进行统计时使用 DamageEvent 读取最终结算信息。
 */
/** 自定义的伤害类型 */
enum EOM_DAMAGE_TYPES {
	/** 无类型伤害 */
	DAMAGE_TYPE_NONE = 0,
	/** 物理 */
	DAMAGE_TYPE_PHYSICAL = 1 << 0,
	/** 魔法 */
	DAMAGE_TYPE_MAGICAL = 1 << 1,
	/** 纯粹 */
	DAMAGE_TYPE_PURE = 1 << 2,
}

interface DamageInfo {
	/** 受伤者 */
	target: CDOTA_BaseNPC,
	/** 攻击者 */
	attacker: CDOTA_BaseNPC,
	/** 伤害值 */
	damage: number,
	/** 伤害类型 */
	damage_type: EOM_DAMAGE_TYPES,
	/** 技能，可选 */
	ability?: AbilityClasses,
	/** 伤害标记，可选 */
	damage_flags?: EOM_DAMAGE_FLAGS,
	/** 伤害种类，可选，默认DOTA_DAMAGE_CATEGORY_SPELL */
	damage_category?: DamageCategory_t,
	/** 攻击状态，可选 */
	attack_states?: ATTACK_STATES,
	/** 伤害记录值，攻击造成伤害使用 */
	record?: number,
	/** 是否暴击 */
	is_crit?: boolean,
	/** 是否背刺 */
	is_backstab?: boolean,
	/** 属性系统本次计算的额外属性表 */
	extraProperties?: ExtraPropertyTable,
}
interface DamageEvent {
	/** 受伤者 */
	target: CDOTA_BaseNPC,
	/** 攻击者 */
	attacker: CDOTA_BaseNPC,
	/** 伤害值 */
	damage: number,
	/** 伤害类型 */
	damage_type: EOM_DAMAGE_TYPES,
	/** 技能，可选 */
	ability?: AbilityClasses,
	/** 伤害标记，可选 */
	damage_flags: EOM_DAMAGE_FLAGS,
	/** 伤害种类，可选，默认DOTA_DAMAGE_CATEGORY_SPELL */
	damage_category: DamageCategory_t,
	/** 攻击状态，可选 */
	attack_states?: ATTACK_STATES,
	/** 伤害记录值，攻击造成伤害使用 */
	record?: number,
	/** 是否暴击 */
	is_crit: boolean,
	/** 造成伤害前的生命值 */
	health_before_damage: number,
}
