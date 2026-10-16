/**
 * @noSelfInFile
 * ⚠️ 此文件由 generate-property-system.js 自动生成，请勿手动修改！
 * 源文件: content/athena_tsbuild/scripts/vscripts/framework/property_system/properties.kv
 */

enum PropertyFunction {
	/** 生命值 */
	HEALTH = modifierfunction.MODIFIER_FUNCTION_LAST + 1,
	/** 基础生命值 */
	BASE_HEALTH,
	/** %最大生命值 */
	HEALTH_AMPLIFY,
	/** %进入房间时治疗 */
	HEAL_ROOM_START,
	/** %进入房间时生命流失 */
	HEALTH_COST_ROOM_START,
	/** 基础魔法 */
	BASE_MANA,
	/** 魔法值 */
	MANA,
	/** %魔法值 */
	MANA_AMPLIFY,
	/** 基础攻击 */
	BASE_ATTACK,
	/** 攻击力 */
	ATTACK,
	/** %攻击力 */
	ATTACK_AMPLIFY,
	/** 攻击速度 */
	ATTACKSPEED,
	/** %攻击速度降低 */
	ATTACKSPEED_REDUCTION,
	/** 召唤物攻击速度 */
	WISP_ATTACKSPEED,
	/** %召唤物伤害 */
	WISP_DAMAGE,
	/** %冷却缩减 */
	COOLDOWN_REDUCTION,
	/** %Boss技能间隔倍数 */
	BOSS_GAP_AMPLIFY,
	/** 攻击距离 */
	ATTACK_RANGE,
	/** 近战攻击距离 */
	ATTACK_RANGE_MELEE,
	/** 远程攻击距离 */
	ATTACK_RANGE_RANGER,
	/** 弹道距离 */
	BULLET_RANGE,
	/** %范围加成 */
	AOE_AMPLIFY,
	/** %<Crit:暴击率/> */
	CRIT_CHANCE,
	/** %攻击<Crit:暴击率/> */
	ATTACK_CRIT_CHANCE,
	/** %技能<Crit:暴击率/> */
	SPELL_CRIT_CHANCE,
	/** %触电攻击<Crit:暴击率/> */
	EXPOSE_ATTACK_CRIT_CHANCE,
	/** %<Crit:暴击伤害/> */
	CRIT_DAMAGE,
	/** %<Crit:暴击伤害[x]/> */
	CRIT_DAMAGE_MULT,
	/** %对<Shield:护盾/><Crit:暴击伤害/> */
	BARRIER_CRIT_DAMAGE,
	/** %对<Bleed:流血/>单位<Crit:暴击伤害/> */
	BLEED_CRIT_DAMAGE,
	/** %攻击<Crit:暴击伤害/> */
	ATTACK_CRIT_DAMAGE,
	/** %攻击<Crit:暴击伤害/>增幅 */
	ATTACK_CRIT_DAMAGE_BOOST,
	/** %技能<Crit:暴击伤害/> */
	SPELL_CRIT_DAMAGE,
	/** %技能<Crit:暴击伤害/>增幅 */
	SPELL_CRIT_DAMAGE_BOOST,
	/** 攻击附加伤害 */
	ATTACK_DAMAGE_PROC,
	/** 技能附加伤害 */
	SPELL_DAMAGE_PROC,
	/** 目标技能附加伤害 */
	SPELL_DAMAGE_PROC_TARGET,
	/** 目标附加伤害 */
	DAMAGE_PROC_TARGET,
	/** %伤害 */
	DAMAGE_AMPLIFY,
	/** %最终伤害 */
	FINAL_DAMAGE,
	/** %最终伤害 */
	FINAL_DAMAGE_101,
	/** %最终伤害 */
	FINAL_DAMAGE_102,
	/** %最终伤害 */
	FINAL_DAMAGE_103,
	/** %物理伤害 */
	PHYSICAL_DAMAGE_AMPLIFY,
	/** %魔法伤害 */
	MAGICAL_DAMAGE_AMPLIFY,
	/** %攻击伤害 */
	ATTACK_DAMAGE_AMPLIFY,
	/** %技能伤害 */
	SPELL_DAMAGE_AMPLIFY,
	/** %<Backstab:背刺/>伤害 */
	BACKSTAB_DAMAGE_AMPLIFY,
	/** %<Backstab:背刺/>伤害增幅[c] */
	BACKSTAB_DAMAGE_BOOST,
	/** %对<Shield:护盾/>伤害 */
	BARRIER_DAMAGE_AMPLIFY,
	/** %对<Shield:护盾/>伤害增幅[c] */
	BARRIER_DAMAGE_BOOST,
	/** %反击效果 */
	RETALIATED_DAMAGE_AMPLIFY,
	/** %环绕物伤害 */
	RING_DAMAGE_AMPLIFY,
	/** %环绕物伤害增幅[c] */
	RING_DAMAGE_BOOST,
	/** %剑气伤害 */
	BLADE_DAMAGE_AMPLIFY,
	/** %剑气速度 */
	BLADE_SPEED_AMPLIFY,
	/** %伤害减免 */
	DAMAGE_REDUCTION,
	/** %毒池中<Shield:护盾/>衰减间隔减缓 */
	POISON_POOL_SHIELD_ATTENUATION_INTERVAL_AMPLIFY,
	/** %受到伤害 */
	INCOMING_DAMAGE_AMPLIFY,
	/** %受到陷阱伤害 */
	TRAP_INCOMING_DAMAGE_AMPLIFY,
	/** %陷阱对敌伤害 */
	TRAP_DAMAGE_AMPLIFY,
	/** TODO:%<Poison:中毒/>衰减间隔减缓 */
	POISON_ATTENUATION_INTERVAL_AMPLIFY,
	/** %毒池中受到伤害 */
	POISON_POOL_INCOMING_DAMAGE_AMPLIFY,
	/** %酒馆效果提升 */
	TAVERN_EFFECT_AMPLIFY,
	/** %闪避 */
	EVASION,
	/** 规避伤害 */
	AVOID_DAMAGE,
	/** 最低生命值 */
	MIN_HEALTH,
	/** %治疗增强 */
	HEAL_AMPLIFY,
	/** %<Fury:怒气累积/> */
	FURY_AMPLIFY,
	/** 每秒<Fury:怒气累积/> */
	FURY_REGEN,
	/** %暴击<Fury:怒气累积/> */
	CRIT_FURY_AMPLIFY,
	/** %特技<Fury:怒气累积/> */
	SKILL_FURY_AMPLIFY,
	/** %环绕物伤害<Fury:怒气累积/> */
	RING_FURY_AMPLIFY,
	/** 移动速度 */
	MOVESPEED,
	/** 不计算的移动速度 */
	MOVESPEED_NOT_CALCULATED,
	/** %移动速度 */
	MOVESPEED_AMPLIFY,
	/** %<Discount:商店折扣/> */
	SHOP_DISCOUNT,
	/** %商店刷新金币返还 */
	SHOP_REFRESH_REFUND,
	/** <Split:散射/>次数 */
	SPLIT_COUNT,
	/** <Attack:攻击/>充能次数 */
	ABILITY_CHARGE_ATTACK,
	/** <Skill:特技/>充能次数 */
	ABILITY_CHARGE_SKILL,
	/** <Dodge:冲刺/>充能次数 */
	ABILITY_CHARGE_DODGE,
	/** <Defense:防御/>充能次数 */
	ABILITY_CHARGE_DEFENSE,
	/** <Ultimate:绝招/>充能次数 */
	ABILITY_CHARGE_ULTIMATE,
	/** <Ring:环绕物/>数量 */
	RING_COUNT,
	/** %<Ring:环绕物/>速度 */
	RING_SPEED_AMPLIFY,
	/** <Ring:环绕物/>追踪距离 */
	RING_TRACK_RADIUS,
	/** %多重雷击概率 */
	LIGHTNING_MULTIPLE_CHANCE,
	/** 雷击范围 */
	LIGHTNING_RADIUS,
	/** 雷击伤害 */
	LIGHTNING_DAMAGE,
	/** %<ArcLightning:闪电链/>触电概率 */
	LIGHTNING_EXPOSE_CHANCE,
	/** %<Electric:触电/>不消耗概率 */
	EXPOSE_KEEP_CHANCE,
	/** <ArcLightning:闪电链/>数量 */
	LIGHTNING_COUNT,
	/** %<Poison:中毒/>不衰减概率 */
	POISON_NO_ATTENUATION_CHANCE,
	/** %<Poison:中毒/>衰减降低 */
	POISON_ATTENUATION_REDUCTION,
	/** %<Frozen:冰冻/>不衰减概率 */
	FROZEN_NO_ATTENUATION_CHANCE,
	/** %<Frozen:冰冻/>衰减降低 */
	FROZEN_ATTENUATION_REDUCTION,
	/** %<Frozen:冰冻/>伤害增幅 */
	FROZEN_DAMAGE_AMPLIFY,
	/** %<Shield:护盾/>衰减降低 */
	SHIELD_ATTENUATION_REDUCTION,
	/** %<Shield:护盾/>衰减间隔减缓 */
	SHIELD_ATTENUATION_INTERVAL_AMPLIFY,
	/** %<Shield:护盾/>不衰减概率 */
	SHIELD_NO_ATTENUATION_CHANCE,
	/** 寒霜爆发施加<Frozen:冰冻/>层数 */
	FROZEN_BURST_STACK,
	/** 弹道弹射次数 */
	BOUNCE_COUNT,
	/** 激光弹射次数 */
	LASER_BOUNCE_COUNT,
	/** %激光伤害 */
	LASER_DAMAGE_AMPLIFY,
	/** 雪球弹射次数 */
	SNOWBALL_BOUNCE_COUNT,
	/** 雪球额外发射数量 */
	SNOWBALL_EXTRA_SHOT,
	/** 雪球伤害 */
	SNOWBALL_DAMAGE,
	/** 额外冰雹 */
	ICE_STRIKE,
	/** <Reflect:反弹/>伤害 */
	REFLECT_DAMAGE,
	/** 每次遭遇战获得攻击力 */
	PER_ENCOUNTER_ATTACK_BONUS,
	/** %每次遭遇战攻击力提升 */
	PER_ENCOUNTER_ATTACK_AMPLIFY,
	/** %每次遭遇战攻击伤害提升 */
	PER_ENCOUNTER_ATTACK_DAMAGE_AMPLIFY,
	/** %每次遭遇战特技伤害提升 */
	PER_ENCOUNTER_SKILL_DAMAGE_AMPLIFY,
	/** %每次遭遇战绝招伤害提升 */
	PER_ENCOUNTER_ULTIMATE_DAMAGE_AMPLIFY,
	/** %每次遭遇战物理伤害增幅提升 */
	PER_ENCOUNTER_PHYSICAL_DAMAGE_AMPLIFY,
	/** %每次遭遇战魔法伤害增幅提升 */
	PER_ENCOUNTER_MAGICAL_DAMAGE_AMPLIFY,
	/** %每次遭遇战近战英雄伤害提升 */
	PER_ENCOUNTER_MELEE_HERO_DAMAGE_AMPLIFY,
	/** %每次遭遇战远程英雄伤害提升 */
	PER_ENCOUNTER_RANGER_HERO_DAMAGE_AMPLIFY,
	/** %每次遭遇战暴击伤害增加 */
	PER_ENCOUNTER_CRIT_DAMAGE,
	/** 格挡 */
	BLOCK,
	/** %施加额外毒层数 */
	POISON_STACKS_AMPLIFY,
	/** %触电伤害增加 */
	SHOCK_DAMAGE_AMPLIFY,
	/** %施加额外流血层数 */
	BLEED_STACKS_AMPLIFY,
	/** %施加额外冰冻层数 */
	FREEZE_STACKS_AMPLIFY,
	/** %额外获得护盾量 */
	SHIELD_AMPLIFY,
	/** %暴击伤害增幅 */
	CRIT_DAMAGE_AMPLIFY,
	/** %近战英雄伤害增幅 */
	MELEE_HERO_DAMAGE_AMPLIFY,
	/** %远程英雄伤害增幅 */
	RANGER_HERO_DAMAGE_AMPLIFY,
	/** %血瓶回复生命值 */
	HEALTH_POTION_HEAL_AMPLIFY,
	/** %暴击概率增幅 */
	CRIT_CHANCE_AMPLIFY,
	/** %散射伤害 */
	SPLASH_DAMAGE_AMPLIFY,
	/** %散射伤害增幅[c] */
	SPLASH_DAMAGE_BOOST,
	/** %对异常状态目标伤害增幅 */
	DEBUFF_TARGET_DAMAGE_AMPLIFY,
	/** %对小怪伤害增幅[c] */
	MINION_DAMAGE_BOOST,
	/** %对首领伤害增幅[c] */
	BOSS_DAMAGE_BOOST,
	/** %对精英伤害增幅[c] */
	ELITE_DAMAGE_BOOST,
	/** %全增幅 */
	ALL_STATS_AMPLIFY,
	/** 绝招的蓝耗降低 */
	ULTIMATE_MANA_COST_REDUCE,
	/** %增益buff时间延长 */
	BUFF_DURATION,
	/** %减益buff时间延长 */
	DEBUFF_DURATION,
	/** %防御技能的充能时间缩短 */
	ABILITY_CHARGE_DEFENSE_TIME,
	/** %血瓶的回复量提高 */
	POTION_HEAL_RESTORE,
	/** %破坏物掉落概率 */
	BREAK_DROP_CHANCE,
	/** %掉落物收益 */
	BREAK_DROP_PROFIT_PCT,
	/** 复活次数 */
	REVIVE_COUNT,
	/** %复活后回复生命 */
	REVIVE_HEALTH_RECOVER,
	/** 初始金币 */
	INITIAL_GOLD,
	/** %局内经验提高 */
	EXP_GAIN_CHANCE,
	/** %金币房间的金币数量提高 */
	GOLD_ROOM_AMOUNT,
	/** %商店的商品稀有度提高 */
	SHOP_ITEM_RARITY,
	/** %遗物物品稀有度提升 */
	ARTIFACT_ITEM_RARITY,
	/** %获得祝福的稀有度提高 */
	BLESSING_RARITY,
	/** %$zeus祝福稀有度提升概率 */
	ZEUS_BLESS_RARITY_UP,
	/** %$poison祝福稀有度提升概率 */
	POISON_BLESS_RARITY_UP,
	/** %$ice祝福稀有度提升概率 */
	ICE_BLESS_RARITY_UP,
	/** %$bleed祝福稀有度提升概率 */
	BLEED_BLESS_RARITY_UP,
	/** %$crit祝福稀有度提升概率 */
	CRIT_BLESS_RARITY_UP,
	/** %$holy祝福稀有度提升概率 */
	HOLY_BLESS_RARITY_UP,
	/** %$wind祝福稀有度提升概率 */
	WIND_BLESS_RARITY_UP,
	/** 祝福刷新次数 */
	BLESS_REFRESH_COUNT,
	/** 获得全部遗物次数 */
	ARTIFACT_ALLIN_COUNT,
	/** 获得全部祝福次数 */
	BLESS_ALLIN_COUNT,
	/** 升级全部祝福次数 */
	BLESS_UPGRADE_ALLIN_COUNT,
	/** 获得全部技能升级次数 */
	ABILITY_UPGRADE_ALLIN_COUNT,
	/** 技能天赋刷新次数 */
	ABILITY_UPGRADE_REFRESH_COUNT,
	/** 装备潜能值增加 */
	EQUIP_EXTRA_POTENTIAL,
	/** %装备基础掉落 */
	EQUIP_EXTRA_DROP_BASE,
	/** %装备掉落加成 */
	EQUIP_DROP_PCT,
	/** %装备掉落数量加成 */
	EQUIP_DROP_NUM_PCT,
	/** %装备稀有度概率 */
	EQUIP_RARITY_CHANCE,
	/** %重铸/洗练不消耗潜能值概率 */
	EQUIP_POTENTIAL_LUCKY,
	/** %近距离伤害增幅[c] */
	MELEE_DAMAGE_BOOST,
	/** %远距离伤害增幅[c] */
	RANGED_DAMAGE_BOOST,
	/** %斩杀伤害 */
	EXECUTE_DAMAGE,
	/** %<Fury:怒气上限/>增幅 */
	RAGE_CAPACITY_AMPLIFY,
	/** %重击 */
	HEAVY_ATTACK,
	/** %生命回复 */
	HP_REGENERATION,
	/** %荆棘伤害 */
	THORNS_DAMAGE,
	/** %对流血敌人造成伤害 */
	DAMAGE_VS_BLEEDING_TARGETS,
	/** %对冰冻敌人造成伤害 */
	DAMAGE_VS_FROZEN_TARGETS,
	/** %对触电敌人造成伤害 */
	DAMAGE_VS_SHOCKED_TARGETS,
	/** %对中毒敌人造成伤害 */
	DAMAGE_VS_POISONED_TARGETS,
	/** %终结攻击伤害 */
	FINISHER_DAMAGE,
	/** %终结攻击暴击率 */
	FINISHER_CRIT_CHANCE,
	/** %特技加速 */
	SKILL_COOLDOWN_REDUCTION,
	/** %冲刺加速 */
	EVADE_COOLDOWN_REDUCTION,
	/** %防御加速 */
	BLOCK_COOLDOWN_REDUCTION,
	/** %绝招加速 */
	ULTIMATE_COOLDOWN_REDUCTION,
	/** %金币获取量 */
	GOLD_GAIN_AMOUNT,
	/** %经验获取量 */
	EXP_GAIN_AMOUNT,
	/** 遭遇战获得金币 */
	GOLD_REWARD_PER_ENCOUNTER,
	/** 遭遇战结束给予经验 */
	EXP_REWARD_PER_ENCOUNTER,
	/** %中毒衰减降低 */
	POISON_DECAY_REDUCTION,
	/** %流血触发间隔 */
	BLEED_TRIGGER_INTERVAL,
	/** %冰冻持续时间 */
	FREEZE_DURATION,
	/** %触电不衰减率 */
	SHOCK_NO_DECAY_RATE,
	/** %攻击获得<Fury:怒气/>% */
	RAGE_GAIN_PERCENT_PER_ATTACK,
	/** %防御获得<Fury:怒气/>% */
	RAGE_GAIN_PERCENT_PER_BLOCK,
	/** %闪避获得<Fury:怒气/>% */
	RAGE_GAIN_PERCENT_PER_EVADE,
	/** %绝招获得<Fury:怒气/>% */
	RAGE_GAIN_PERCENT_PER_ULTIMATE,
	/** %中毒伤害 */
	POISON_DAMAGE_AMPLIFY,
	/** %中毒伤害增幅[c] */
	POISON_DAMAGE_BOOST,
	/** %雷系伤害 */
	LIGHTNING_DAMAGE_AMPLIFY,
	/** %雷系伤害增幅[c] */
	LIGHTNING_DAMAGE_BOOST,
	/** %神圣系伤害增幅[c] */
	HOLY_SHIELD_DAMAGE_BOOST,
	/** %流血伤害 */
	BLEED_DAMAGE_AMPLIFY,
	/** %流血伤害增幅[c] */
	BLEED_DAMAGE_BOOST,
	/** %剑意伤害增幅[c] */
	BLADE_DAMAGE_BOOST,
	/** %冰冻系伤害 */
	FREEZE_DAMAGE_AMPLIFY,
	/** %冰冻伤害增幅[c] */
	FREEZE_DAMAGE_BOOST,
	/** %护盾系伤害 */
	SHIELD_DAMAGE_AMPLIFY,
	/** %斩杀伤害 */
	EXECUTE_DAMAGE_AMPLIFY,
	/** %条件伤害 */
	CONDITIONAL_DAMAGE_AMPLIFY,
	/** %攻击伤害增幅[b] */
	ATTACK_DAMAGE_BOOST,
	/** %技能伤害增幅[b] */
	SPELL_DAMAGE_BOOST,
	/** %特技伤害 */
	SKILL_DAMAGE_AMPLIFY,
	/** %特技技能增幅[b] */
	SKILL_DAMAGE_BOOST,
	/** %绝招伤害 */
	ULTIMATE_DAMAGE_AMPLIFY,
	/** %绝招伤害增幅[b] */
	ULTIMATE_DAMAGE_BOOST,
	/** %冲刺技能伤害 */
	DODGE_DAMAGE_AMPLIFY,
	/** %冲刺技能增幅[b] */
	DODGE_DAMAGE_BOOST,
	/** %防御技能伤害 */
	DEFENSE_DAMAGE_AMPLIFY,
	/** %防御技能增幅[b] */
	DEFENSE_DAMAGE_BOOST,
	/** %近战英雄伤害增幅 */
	MELEE_HERO_DAMAGE_BOOST,
	/** %远程英雄伤害增幅 */
	RANGER_HERO_DAMAGE_BOOST,
	/** %伤害增幅[a] */
	DAMAGE_BOOST,
	/** %魔法伤害增幅[a] */
	MAGICAL_DAMAGE_BOOST,
	/** %物理伤害增幅[a] */
	PHYSICAL_DAMAGE_BOOST,
	/** %升级获得伤害增幅[a] */
	DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得物理伤害增幅[a] */
	PHYSICAL_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得魔法伤害增幅[a] */
	MAGICAL_DAMAGE_BOOST_PER_LEVEL,
	/** %特技获得<Fury:怒气/> */
	RAGE_GAIN_PERCENT_PER_SKILL,
	/** 附加冰霜伤害 */
	BONUS_FROST_DAMAGE,
	/** 附加中毒伤害 */
	BONUS_POISON_DAMAGE,
	/** 附加闪电伤害 */
	BONUS_LIGHTNING_DAMAGE,
	/** 附加流血伤害 */
	BONUS_BLEED_DAMAGE,
	/** 每遭遇战回复生命值 */
	HP_REGEN_PER_ENCOUNTER,
	/** 每遭遇战回复怒气值 */
	MANA_REGEN_PER_ENCOUNTER,
	/** 魔法护甲 */
	ELEMENTAL_DAMAGE,
	/** 物理护甲 */
	PHYSICAL_ARMOR,
	/** 击杀怪物回复生命值 */
	HP_REGEN_ON_KILL,
	/** 攻速提升 */
	ATTACK_SPEED_BOOST,
	/** <DamageIntensity:伤害强度/> */
	DAMAGE_INTENSITY,
	/** %伤害强度增幅 */
	DAMAGE_INTENSITY_BOOST,
	/** <DefenseIntensity:防御强度/> */
	DEFENSE_INTENSITY,
	/** %防御强度增幅 */
	DEFENSE_INTENSITY_BOOST,
	/** %全伤害增幅 */
	HERO_DAMAGE_BOOST,
	/** %增伤[x] */
	DAMAGE_BOOST_MULT,
	/** 雷云伤害 */
	LIGHTNING_CLOUD_DAMAGE,
	/** 雷云持续时间 */
	LIGHTNING_CLOUD_DURATION,
	/** 雷云额外打击目标数 */
	LIGHTNING_CLOUD_HIT_COUNT,
	/** 精力恢复 */
	IDLE_POWER_RECOVER,
	/** 精力值 */
	IDLE_MAX_POWER,
	/** %精力值加成 */
	IDLE_MAX_POWER_PCT,
	/** %精力值消耗增加 */
	IDLE_POWER_COST_INC_PCT,
	/** %精力值消耗减少 */
	IDLE_POWER_COST_REDUCE_PCT,
	/** 钓鱼收益 */
	IDLE_FISH_TOTAL_PROFIT,
	/** %钓鱼收益加成 */
	IDLE_FISH_TOTAL_PROFIT_PCT,
	/** %普通宝藏出现概率 */
	IDLE_FISH_NORMALBOX_CHANCE,
	/** %传说宝藏出现概率 */
	IDLE_FISH_GOLDBOX_CHANCE,
	/** %宝藏收益 */
	IDLE_FISH_BOX_PROFIT_PCT,
	/** 技能升级选项 */
	ABILITY_UPGRADE_COUNT,
	/** %彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW_CHANCE,
	/** %1级彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW1_CHANCE,
	/** %2级彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW2_CHANCE,
	/** %3级彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW3_CHANCE,
	/** %4级彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW4_CHANCE,
	/** %5级彩虹鱼出现概率 */
	IDLE_FISH_RAINBOW5_CHANCE,
	/** %钓鱼上钩概率 */
	IDLE_FISH_CHANCE,
	/** 钓鱼数量 */
	IDLE_FISH_NUM,
	/** %钓鱼数量 */
	IDLE_FISH_NUM_PCT,
	/** %钓鱼暴击概率 */
	IDLE_FISH_CRIT_CHANCE,
	/** %钓鱼暴击收益 */
	IDLE_FISH_CRIT_NUM,
	/** 钓鱼幸运值（整体提升概率类的加成） */
	IDLE_FISH_LUCKY_NUM,
	/** 钓鱼效率 */
	IDLE_FISH_EFFICIENCY,
	/** %钓鱼交互长度 */
	IDLE_FISH_INTERACTION_PCT,
	/** %脱钩速度 */
	IDLE_FISH_ESCAPE_SPEED_PCT,
	/** %上钩等待时间减少 */
	IDLE_FISH_WAIT_TIME_REDUCE_PCT,
	/** 钓鱼信使协助槽位 */
	IDLE_FISH_COURIER_SLOT,
	/** 水族馆槽位 */
	AQUARIUM_SLOT,
	/** %神圣系伤害增强 */
	HOLY_SHIELD_DAMAGE_BOOST2,
	/** %剑意效果增强 */
	BLADE_SWORD_BOOST2,
	/** 冲刺距离 */
	DASH_DISTANCE,
	/** %移动距离效率 */
	MOVE_DISTANCE_EFFICIENCY,
	/** %探险基础收益 */
	EXPLORE_PROFIT_110005_PCT,
	/** %装备强化材料掉落 */
	RESOURCE_PROFIT_STONE_PCT,
	/** %装备打造材料掉落 */
	RESOURCE_PROFIT_FORGE_PCT,
	/** %潜能材料掉落 */
	RESOURCE_PROFIT_TALENT_PCT,
	/** %英雄经验掉落 */
	RESOURCE_PROFIT_210001_PCT,
	/** %雷电效果增强 */
	LIGHTNING_DAMAGE_BOOST2,
	/** %中毒效果增强 */
	POISON_DAMAGE_BOOST2,
	/** %冰冻效果增强 */
	FREEZE_DAMAGE_BOOST2,
	/** %流血效果增强 */
	BLEED_DAMAGE_BOOST2,
	/** %神圣流派等级效果加成 */
	HOLY_SUIT_EFFECT_BOOST,
	/** %雷电流派等级效果加成 */
	ZEUS_SUIT_EFFECT_BOOST,
	/** %冰冻流派等级效果加成 */
	ICE_SUIT_EFFECT_BOOST,
	/** %剧毒流派等级效果加成 */
	POISON_SUIT_EFFECT_BOOST,
	/** %狂暴流派等级效果加成 */
	BLEED_SUIT_EFFECT_BOOST,
	/** %<Crit:暴击/>流派等级效果加成 */
	CRIT_SUIT_EFFECT_BOOST,
	/** %御风流派等级效果加成 */
	WIND_SUIT_EFFECT_BOOST,
	/** 复活次数上限增加 */
	REVIVE_MAX,
	/** 刷新祝福次数上限增加 */
	IN_GAME_BLESS_REFRESH_MAX,
	/** 刷新技能升级次数上限增加 */
	IN_GAME_ABILITY_UPGRADE_MAX,
	/** %宝石掉落加成 */
	GEM_DROP_PCT,
	/** %宝石掉落数量加成 */
	GEM_DROP_NUM_PCT,
	/** 宝石额外基础掉落 */
	GEM_EXTRA_DROP_BASE,
	/** %所有存档及材料掉落总增 */
	TOTAL_DROP_NUM_PCT,
	/** %存档装备洗练数值提升 */
	REFINE_INC_PCT,
	/** 深渊模式每日免费开启次数 */
	ABYSSAL_FREE,
	/** %<DrawingChance:图纸掉落概率/> */
	DRAWING_DROP_CHANCE,
	/** %<GemRollChance:宝石高数值概率/> */
	GEM_ROLL_CHANCE,
	/** %探险触发额外奖励概率 */
	EXPLORE_EXTRA_CHANCE,
	/** %探险额外收益加成 */
	EXPLORE_EXTRA_PROFIT_PCT,
	/** %符文稀有度概率 */
	RUNE_RARITY_CHANCE,
	/** 符文吞噬可锁定副词条 */
	RUNE_DEVOUR_LOCK,
	/** 信使远征时长上限 */
	EXPLORE_LIMIT,
	/** %升级获得攻击伤害增幅[b] */
	ATTACK_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得技能伤害增幅[b] */
	SPELL_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得特技技能增幅[b] */
	SKILL_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得冲刺技能增幅[b] */
	DODGE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得防御技能增幅[b] */
	DEFENSE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得绝招伤害增幅[b] */
	ULTIMATE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得雷系伤害增幅[c] */
	LIGHTNING_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得冰冻伤害增幅[c] */
	FREEZE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得中毒伤害增幅[c] */
	POISON_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得流血伤害增幅[c] */
	BLEED_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得剑意伤害增幅[c] */
	BLADE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得神圣系伤害增幅[c] */
	HOLY_SHIELD_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得环绕物伤害增幅[c] */
	RING_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得散射伤害增幅[c] */
	SPLASH_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得近距离伤害增幅[c] */
	MELEE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得远距离伤害增幅[c] */
	RANGED_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得对精英伤害增幅[c] */
	ELITE_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得对首领伤害增幅[c] */
	BOSS_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得对<Shield:护盾/>伤害增幅[c] */
	BARRIER_DAMAGE_BOOST_PER_LEVEL,
	/** %升级获得<Backstab:背刺/>伤害增幅[c] */
	BACKSTAB_DAMAGE_BOOST_PER_LEVEL,
	/** %钓鱼为神话珍鱼概率 */
	IDLE_FISH_MYTH_FISH_CHANCE,
	/** %符文副属性<Modify:转移/>为对攻击生效 */
	ENGRAVING_1_TRANSFER,
	/** %符文副属性<Modify:转移/>为对特技生效 */
	ENGRAVING_2_TRANSFER,
	/** %符文副属性<Modify:转移/>为对冲刺生效 */
	ENGRAVING_3_TRANSFER,
	/** %符文副属性<Modify:转移/>为对防御生效 */
	ENGRAVING_4_TRANSFER,
	/** %符文副属性<Modify:转移/>为对绝招生效 */
	ENGRAVING_5_TRANSFER,
	/** %符文位于攻击时副属性<Subattribute:强化/> */
	ENGRAVING_1_STRENGTHEN,
	/** %符文位于特技时副属性<Subattribute:强化/> */
	ENGRAVING_2_STRENGTHEN,
	/** %符文位于冲刺时副属性<Subattribute:强化/> */
	ENGRAVING_3_STRENGTHEN,
	/** %符文位于防御时副属性<Subattribute:强化/> */
	ENGRAVING_4_STRENGTHEN,
	/** %符文位于绝招时副属性<Subattribute:强化/> */
	ENGRAVING_5_STRENGTHEN,
	/** 生命百分比敌方 */
	HEALTH_PERCENT_ENEMY,
	/** 攻击伤害基础力量派生 */
	ATTACK_DAMAGE_BASE_STR,
	/** 攻击伤害基础敏捷派生 */
	ATTACK_DAMAGE_BASE_AGI,
	/** 攻击伤害基础智力派生 */
	ATTACK_DAMAGE_BASE_INT,
	/** %基础攻击 */
	ATTACK_DAMAGE_BASE_PERCENTAGE,
	/** 基础攻击间隔固定调整 */
	BASE_ATTACK_TIME_CONSTANT_ADJUST,
	/** 攻击RANGE百分比 */
	ATTACK_RANGE_PERCENTAGE,
	/** 护甲基础力量派生 */
	ARMOR_BASE_STR,
	/** 护甲基础敏捷派生 */
	ARMOR_BASE_AGI,
	/** 护甲基础智力派生 */
	ARMOR_BASE_INT,
	/** 额外护甲 */
	ARMOR_BONUS,
	/** %基础护甲 */
	ARMOR_BASE_PERCENTAGE,
	/** %总护甲 */
	ARMOR_PERCENTAGE,
	/** 固定无视护甲 */
	IGNORE_ARMOR,
	/** 无视护甲百分比 */
	IGNORE_ARMOR_PERCENTAGE,
	/** 无视护甲百分比独立 */
	IGNORE_ARMOR_PERCENTAGE_UNIQUE,
	/** 无视护甲百分比目标 */
	IGNORE_ARMOR_PERCENTAGE_TARGET,
	/** 生命基础力量派生 */
	HEALTH_BASE_STR,
	/** 基础生命恢复固定力量派生 */
	BASE_HEALTH_REGEN_CONSTANT_STR,
	/** 基础生命恢复固定 */
	BASE_HEALTH_REGEN_CONSTANT,
	/** 生命恢复固定 */
	HEALTH_REGEN_CONSTANT,
	/** 生命恢复百分比 */
	HEALTH_REGEN_PERCENTAGE,
	/** 魔法基础智力派生 */
	MANA_BASE_INT,
	/** 基础魔法恢复固定智力派生 */
	BASE_MANA_REGEN_CONSTANT_INT,
	/** 魔法恢复固定 */
	MANA_REGEN_CONSTANT,
	/** 魔法恢复固定独立 */
	MANA_REGEN_CONSTANT_UNIQUE,
	/** 魔法恢复百分比 */
	MANA_REGEN_PERCENTAGE,
	/** 状态抗性叠加 */
	STATUS_RESISTANCE_STACKING,
	/** 状态抗性独立 */
	STATUS_RESISTANCE_UNIQUE,
	/** 状态抗性施法者 */
	STATUS_RESISTANCE_CASTER,
	/** 冷却减少固定 */
	COOLDOWN_CONSTANT,
	/** %物理暴击率 */
	PHYSICAL_CRITICALSTRIKE_CHANCE,
	/** %物理暴击伤害 */
	PHYSICAL_CRITICALSTRIKE_DAMAGE,
	/** 物理暴击伤害增幅 */
	PHYSICAL_CRITICALSTRIKE_DAMAGE_AMPLIFY,
	/** %魔法暴击率 */
	MAGICAL_CRITICALSTRIKE_CHANCE,
	/** %魔法暴击伤害 */
	MAGICAL_CRITICALSTRIKE_DAMAGE,
	/** 魔法暴击伤害增幅 */
	MAGICAL_CRITICALSTRIKE_DAMAGE_AMPLIFY,
	/** 暴击音效 */
	CRITICALSTRIKE_SOUND,
	/** 最大攻速额外 */
	MAX_ATTACKSPEED_BONUS,
	/** 造成物理伤害百分比 */
	OUTGOING_PHYSICAL_DAMAGE_PERCENTAGE,
	/** 造成物理伤害百分比敏捷派生 */
	OUTGOING_PHYSICAL_DAMAGE_PERCENTAGE_AGI,
	/** 造成魔法伤害百分比 */
	OUTGOING_MAGICAL_DAMAGE_PERCENTAGE,
	/** 造成魔法伤害百分比智力派生 */
	OUTGOING_MAGICAL_DAMAGE_PERCENTAGE_INT,
	/** 造成伤害百分比 */
	OUTGOING_DAMAGE_PERCENTAGE,
	/** 受到物理伤害百分比 */
	INCOMING_PHYSICAL_DAMAGE_PERCENTAGE,
	/** 受到魔法伤害百分比 */
	INCOMING_MAGICAL_DAMAGE_PERCENTAGE,
	/** 受到伤害百分比 */
	INCOMING_DAMAGE_PERCENTAGE,
	/** 受到伤害百分比力量派生 */
	INCOMING_DAMAGE_PERCENTAGE_STR,
	/** 伤害格挡 */
	IGNORE_DAMAGE,
	/** 无视伤害敏捷派生 */
	IGNORE_DAMAGE_AGI,
	/** 属性全属性额外 */
	STATS_ALL_BONUS,
	/** 属性全属性基础 */
	STATS_ALL_BASE,
	/** 属性全属性百分比 */
	STATS_ALL_PERCENTAGE,
	/** 属性全属性基础百分比 */
	STATS_ALL_BASE_PERCENTAGE,
	/** 属性力量额外 */
	STATS_STRENGTH_BONUS,
	/** 属性力量基础 */
	STATS_STRENGTH_BASE,
	/** 属性力量百分比 */
	STATS_STRENGTH_PERCENTAGE,
	/** 属性力量基础百分比 */
	STATS_STRENGTH_BASE_PERCENTAGE,
	/** 属性敏捷额外 */
	STATS_AGILITY_BONUS,
	/** 属性敏捷基础 */
	STATS_AGILITY_BASE,
	/** 属性敏捷百分比 */
	STATS_AGILITY_PERCENTAGE,
	/** 属性敏捷基础百分比 */
	STATS_AGILITY_BASE_PERCENTAGE,
	/** 属性智力额外 */
	STATS_INTELLECT_BONUS,
	/** 属性智力基础 */
	STATS_INTELLECT_BASE,
	/** 属性智力百分比 */
	STATS_INTELLECT_PERCENTAGE,
	/** 属性智力基础百分比 */
	STATS_INTELLECT_BASE_PERCENTAGE,
	/** 属性力量成长 */
	STATS_STRENGTH_GAIN,
	/** 属性敏捷成长 */
	STATS_AGILITY_GAIN,
	/** 属性智力成长 */
	STATS_INTELLECT_GAIN,
	/** 物理吸血 */
	PHYSICAL_LIFESTEAL,
	/** 魔法吸血 */
	MAGICAL_LIFESTEAL,
	/** 全属性吸血 */
	ALL_LIFESTEAL,
	/** 分裂伤害 */
	CLEAVE_DAMAGE,
	/** 分裂范围 */
	CLEAVE_RADIUS,
	/** 玩家击杀荣耀额外 */
	PLAYER_KILL_SCORE_BONUS,
	/** 玩家击杀金币百分比 */
	PLAYER_KILL_GOLD_PERCENTAGE,
	/** 玩家掉宝几率百分比 */
	PLAYER_DROP_CHANCE_PERCENTAGE,
	/** 钓鱼暴击几率 */
	FISHING_CRIT_CHANCE,
	/** 护甲减免百分比 */
	ARMOR_REDUCTION_PERCENTAGE,
	/** 挖宝暴击几率 */
	DIG_CRIT_CHANCE,
	/** 金币怪物额外 */
	GOLD_MONSTER_BONUS,
	/** 玩家金币每秒 */
	PLAYER_GOLD_PER_SECOND,
	/** 玩家魂晶每秒 */
	PLAYER_CRYSTAL_PER_SECOND,
	/** 玩家荣耀每秒 */
	PLAYER_SCORE_PER_SECOND,
	/** 玩家属性成长百分比 */
	PLAYER_ATTRIBUTE_GAIN_PERCENTAGE,
	/** 玩家经验成长百分比 */
	PLAYER_EXPERIENCE_GAIN_PERCENTAGE,
	/** 攻击减甲 */
	ATTACK_REDUCE_ARMOR,
	/** 魔法 */
	PERMANENT_MANA,
	/** 伤害减免 */
	ATHENA_DAMAGE_REDUCE,
	/** 伤害再减免 */
	ATHENA_DAMAGE_REDUCE2,
	/** 物理伤害 */
	ATHENA_PHYSICAL_DAMAGE,
	/** 魔法伤害 */
	ATHENA_MAGICAL_DAMAGE,
	/** 最终伤害 */
	ATHENA_FINALLY_DAMAGE,
	/** 每秒攻击 */
	ATTACK_PER_SEC,
	/** 每秒生命 */
	HEALTH_PER_SEC,
	/** 每秒护甲 */
	ARMOR_PER_SEC,
	/** 每秒全属性 */
	ALL_PER_SEC,
	/** 每秒力量 */
	STRENGTH_PER_SEC,
	/** 每秒敏捷 */
	AGILITY_PER_SEC,
	/** 每秒智力 */
	INTELLECT_PER_SEC,
	/** 每秒金币 */
	GOLD_PER_SEC,
	/** 每分钟物理伤害 */
	PHYSICAL_DAMAGE_PER_MIN,
	/** 每分钟魔法伤害 */
	MAGICAL_DAMAGE_PER_MIN,
	/** 每分钟攻击 */
	ATTACK_PER_MIN,
	/** 每分钟生命 */
	HEALTH_PER_MIN,
	/** 每分钟护甲 */
	ARMOR_PER_MIN,
	/** 每分钟全属性 */
	ALL_PER_MIN,
	/** 每分钟力量 */
	STRENGTH_PER_MIN,
	/** 每分钟敏捷 */
	AGILITY_PER_MIN,
	/** 每分钟智力 */
	INTELLECT_PER_MIN,
	/** 攻击攻击 */
	ATTACK_ATTACK,
	/** 攻击生命 */
	ATTACK_HEALTH,
	/** 攻击护甲 */
	ATTACK_ARMOR,
	/** 攻击全属性 */
	ATTACK_ALL,
	/** 攻击力量 */
	ATTACK_STRENGTH,
	/** 攻击敏捷 */
	ATTACK_AGILITY,
	/** 攻击智力 */
	ATTACK_INTELLECT,
	/** 击杀攻击 */
	KILL_ATTACK,
	/** 击杀生命 */
	KILL_HEALTH,
	/** 击杀护甲 */
	KILL_ARMOR,
	/** 击杀全属性 */
	KILL_ALL,
	/** 击杀力量 */
	KILL_STRENGTH,
	/** 击杀敏捷 */
	KILL_AGILITY,
	/** 击杀智力 */
	KILL_INTELLECT,
	/** 复活时间(降低) */
	RESPAWN_TIME,
	/** 物理伤害增强 */
	ITEM_PHYSICAL_DAMAGE,
	/** 物理伤害再增强 */
	ITEM_PHYSICAL_DAMAGE_2,
	/** 魔法伤害增强 */
	ITEM_MAGICAL_DAMAGE,
	/** 魔法伤害再增强 */
	ITEM_MAGICAL_DAMAGE_2,
	/** 忽视护甲百分比 */
	ITEM_ARMOR_IGNORE_PCT,
	/** 受到伤害 */
	ITEM_INCOMING_DAMAGE,
	/** 物理伤害减免 */
	ITEM_DAMAGE_REDUCE_PHYSICAL,
	/** 魔法伤害减免 */
	ITEM_DAMAGE_REDUCE_MAGICAL,
	/** 伤害减免 */
	ITEM_DAMAGE_REDUCE,
	/** 伤害再减免 */
	ITEM_DAMAGE_REDUCE_2,
	/** 伤害增强 */
	ITEM_OUTGOING_DAMAGE,
	/** 伤害再增强 */
	ITEM_OUTGOING_DAMAGE_2,
	/** 魔法暴击率 */
	ITEM_MAGICAL_CRIT_CHANCE,
	/** 魔法暴击伤害 */
	ITEM_MAGICAL_CRIT_DAMAGE,
	/** 魔法暴击伤害增强 */
	ITEM_MAGICAL_CRIT_DAMAGE_2,
	/** 物理暴击率 */
	ITEM_PHYSICAL_CRIT_CHANCE,
	/** 物理暴击伤害 */
	ITEM_PHYSICAL_CRIT_DAMAGE,
	/** 物理暴击伤害增强 */
	ITEM_PHYSICAL_CRIT_DAMAGE_2,
	/** 闪避 */
	ITEM_EVASION,
	/** 冷却缩减 */
	ITEM_COOLDOWN_REDUCTION,
	/** 钓鱼暴击几率TODO:没实现 */
	ITEM_FISHING_CRIT_CHANCE,
	/** 挖宝暴击几率TODO:没实现 */
	ITEM_DIG_CRIT_CHANCE,
	/** 攻击减甲的效果提升 */
	ITEM_ATTACK_ARMOR_REDUCE_PCT,
	/** 击杀增加金钱 */
	KILL_GOLD_FLAT,
	/** 每分钟护甲 */
	ITEM_ARMOR_PER_MIN,
	/** 初始力量 */
	BASE_STRENGTH,
	/** 初始敏捷 */
	BASE_AGILITY,
	/** 初始智力 */
	BASE_INTELLECT,
	/** 原始力量成长 */
	STRENGTH_GAIN,
	/** 原始敏捷成长 */
	AGILITY_GAIN,
	/** 原始智力成长 */
	INTELLECT_GAIN,
	/** 基础生命恢复 */
	BASE_HEALTH_REGEN,
	/** 基础魔法恢复 */
	BASE_MANA_REGEN,
	/** 基础攻击间隔 */
	BASE_ATTACK_TIME,
	/** 基础攻击距离 */
	BASE_ATTACK_RANGE,
	/** 永久冷却缩减 */
	ATHENA_COOLDOWN_REDUCTION,
	/** 永久闪避 */
	ATHENA_EVASION,
	/** 永久无视护甲 */
	ATHENA_ARMOR_IGNORE,
	/** 基础闪避 */
	BASE_EVASION,
	/** 装备每分钟智力 */
	ITEM_INTELLECT_PER_MIN,
	LAST,
}

const PROPERTY_MAP: Record<string, PropertyFunction> = {
	health: PropertyFunction.HEALTH,
	base_health: PropertyFunction.BASE_HEALTH,
	health_amplify: PropertyFunction.HEALTH_AMPLIFY,
	heal_room_start: PropertyFunction.HEAL_ROOM_START,
	health_cost_room_start: PropertyFunction.HEALTH_COST_ROOM_START,
	base_mana: PropertyFunction.BASE_MANA,
	mana: PropertyFunction.MANA,
	mana_amplify: PropertyFunction.MANA_AMPLIFY,
	base_attack: PropertyFunction.BASE_ATTACK,
	attack: PropertyFunction.ATTACK,
	attack_amplify: PropertyFunction.ATTACK_AMPLIFY,
	attackspeed: PropertyFunction.ATTACKSPEED,
	attackspeed_reduction: PropertyFunction.ATTACKSPEED_REDUCTION,
	wisp_attackspeed: PropertyFunction.WISP_ATTACKSPEED,
	wisp_damage: PropertyFunction.WISP_DAMAGE,
	cooldown_reduction: PropertyFunction.COOLDOWN_REDUCTION,
	boss_gap_amplify: PropertyFunction.BOSS_GAP_AMPLIFY,
	attack_range: PropertyFunction.ATTACK_RANGE,
	attack_range_melee: PropertyFunction.ATTACK_RANGE_MELEE,
	attack_range_ranger: PropertyFunction.ATTACK_RANGE_RANGER,
	bullet_range: PropertyFunction.BULLET_RANGE,
	aoe_amplify: PropertyFunction.AOE_AMPLIFY,
	crit_chance: PropertyFunction.CRIT_CHANCE,
	attack_crit_chance: PropertyFunction.ATTACK_CRIT_CHANCE,
	spell_crit_chance: PropertyFunction.SPELL_CRIT_CHANCE,
	expose_attack_crit_chance: PropertyFunction.EXPOSE_ATTACK_CRIT_CHANCE,
	crit_damage: PropertyFunction.CRIT_DAMAGE,
	crit_damage_mult: PropertyFunction.CRIT_DAMAGE_MULT,
	barrier_crit_damage: PropertyFunction.BARRIER_CRIT_DAMAGE,
	bleed_crit_damage: PropertyFunction.BLEED_CRIT_DAMAGE,
	attack_crit_damage: PropertyFunction.ATTACK_CRIT_DAMAGE,
	attack_crit_damage_boost: PropertyFunction.ATTACK_CRIT_DAMAGE_BOOST,
	spell_crit_damage: PropertyFunction.SPELL_CRIT_DAMAGE,
	spell_crit_damage_boost: PropertyFunction.SPELL_CRIT_DAMAGE_BOOST,
	attack_damage_proc: PropertyFunction.ATTACK_DAMAGE_PROC,
	spell_damage_proc: PropertyFunction.SPELL_DAMAGE_PROC,
	spell_damage_proc_target: PropertyFunction.SPELL_DAMAGE_PROC_TARGET,
	damage_proc_target: PropertyFunction.DAMAGE_PROC_TARGET,
	damage_amplify: PropertyFunction.DAMAGE_AMPLIFY,
	final_damage: PropertyFunction.FINAL_DAMAGE,
	final_damage_101: PropertyFunction.FINAL_DAMAGE_101,
	final_damage_102: PropertyFunction.FINAL_DAMAGE_102,
	final_damage_103: PropertyFunction.FINAL_DAMAGE_103,
	physical_damage_amplify: PropertyFunction.PHYSICAL_DAMAGE_AMPLIFY,
	magical_damage_amplify: PropertyFunction.MAGICAL_DAMAGE_AMPLIFY,
	attack_damage_amplify: PropertyFunction.ATTACK_DAMAGE_AMPLIFY,
	spell_damage_amplify: PropertyFunction.SPELL_DAMAGE_AMPLIFY,
	backstab_damage_amplify: PropertyFunction.BACKSTAB_DAMAGE_AMPLIFY,
	backstab_damage_boost: PropertyFunction.BACKSTAB_DAMAGE_BOOST,
	barrier_damage_amplify: PropertyFunction.BARRIER_DAMAGE_AMPLIFY,
	barrier_damage_boost: PropertyFunction.BARRIER_DAMAGE_BOOST,
	retaliated_damage_amplify: PropertyFunction.RETALIATED_DAMAGE_AMPLIFY,
	ring_damage_amplify: PropertyFunction.RING_DAMAGE_AMPLIFY,
	ring_damage_boost: PropertyFunction.RING_DAMAGE_BOOST,
	blade_damage_amplify: PropertyFunction.BLADE_DAMAGE_AMPLIFY,
	blade_speed_amplify: PropertyFunction.BLADE_SPEED_AMPLIFY,
	damage_reduction: PropertyFunction.DAMAGE_REDUCTION,
	poison_pool_shield_attenuation_interval_amplify: PropertyFunction.POISON_POOL_SHIELD_ATTENUATION_INTERVAL_AMPLIFY,
	incoming_damage_amplify: PropertyFunction.INCOMING_DAMAGE_AMPLIFY,
	trap_incoming_damage_amplify: PropertyFunction.TRAP_INCOMING_DAMAGE_AMPLIFY,
	trap_damage_amplify: PropertyFunction.TRAP_DAMAGE_AMPLIFY,
	poison_attenuation_interval_amplify: PropertyFunction.POISON_ATTENUATION_INTERVAL_AMPLIFY,
	poison_pool_incoming_damage_amplify: PropertyFunction.POISON_POOL_INCOMING_DAMAGE_AMPLIFY,
	tavern_effect_amplify: PropertyFunction.TAVERN_EFFECT_AMPLIFY,
	evasion: PropertyFunction.EVASION,
	avoid_damage: PropertyFunction.AVOID_DAMAGE,
	min_health: PropertyFunction.MIN_HEALTH,
	heal_amplify: PropertyFunction.HEAL_AMPLIFY,
	fury_amplify: PropertyFunction.FURY_AMPLIFY,
	fury_regen: PropertyFunction.FURY_REGEN,
	crit_fury_amplify: PropertyFunction.CRIT_FURY_AMPLIFY,
	skill_fury_amplify: PropertyFunction.SKILL_FURY_AMPLIFY,
	ring_fury_amplify: PropertyFunction.RING_FURY_AMPLIFY,
	movespeed: PropertyFunction.MOVESPEED,
	movespeed_not_calculated: PropertyFunction.MOVESPEED_NOT_CALCULATED,
	movespeed_amplify: PropertyFunction.MOVESPEED_AMPLIFY,
	shop_discount: PropertyFunction.SHOP_DISCOUNT,
	shop_refresh_refund: PropertyFunction.SHOP_REFRESH_REFUND,
	split_count: PropertyFunction.SPLIT_COUNT,
	ability_charge_attack: PropertyFunction.ABILITY_CHARGE_ATTACK,
	ability_charge_skill: PropertyFunction.ABILITY_CHARGE_SKILL,
	ability_charge_dodge: PropertyFunction.ABILITY_CHARGE_DODGE,
	ability_charge_defense: PropertyFunction.ABILITY_CHARGE_DEFENSE,
	ability_charge_ultimate: PropertyFunction.ABILITY_CHARGE_ULTIMATE,
	ring_count: PropertyFunction.RING_COUNT,
	ring_speed_amplify: PropertyFunction.RING_SPEED_AMPLIFY,
	ring_track_radius: PropertyFunction.RING_TRACK_RADIUS,
	lightning_multiple_chance: PropertyFunction.LIGHTNING_MULTIPLE_CHANCE,
	lightning_radius: PropertyFunction.LIGHTNING_RADIUS,
	lightning_damage: PropertyFunction.LIGHTNING_DAMAGE,
	lightning_expose_chance: PropertyFunction.LIGHTNING_EXPOSE_CHANCE,
	expose_keep_chance: PropertyFunction.EXPOSE_KEEP_CHANCE,
	lightning_count: PropertyFunction.LIGHTNING_COUNT,
	poison_no_attenuation_chance: PropertyFunction.POISON_NO_ATTENUATION_CHANCE,
	poison_attenuation_reduction: PropertyFunction.POISON_ATTENUATION_REDUCTION,
	frozen_no_attenuation_chance: PropertyFunction.FROZEN_NO_ATTENUATION_CHANCE,
	frozen_attenuation_reduction: PropertyFunction.FROZEN_ATTENUATION_REDUCTION,
	frozen_damage_amplify: PropertyFunction.FROZEN_DAMAGE_AMPLIFY,
	shield_attenuation_reduction: PropertyFunction.SHIELD_ATTENUATION_REDUCTION,
	shield_attenuation_interval_amplify: PropertyFunction.SHIELD_ATTENUATION_INTERVAL_AMPLIFY,
	shield_no_attenuation_chance: PropertyFunction.SHIELD_NO_ATTENUATION_CHANCE,
	frozen_burst_stack: PropertyFunction.FROZEN_BURST_STACK,
	bounce_count: PropertyFunction.BOUNCE_COUNT,
	laser_bounce_count: PropertyFunction.LASER_BOUNCE_COUNT,
	laser_damage_amplify: PropertyFunction.LASER_DAMAGE_AMPLIFY,
	snowball_bounce_count: PropertyFunction.SNOWBALL_BOUNCE_COUNT,
	snowball_extra_shot: PropertyFunction.SNOWBALL_EXTRA_SHOT,
	snowball_damage: PropertyFunction.SNOWBALL_DAMAGE,
	ice_strike: PropertyFunction.ICE_STRIKE,
	reflect_damage: PropertyFunction.REFLECT_DAMAGE,
	per_encounter_attack_bonus: PropertyFunction.PER_ENCOUNTER_ATTACK_BONUS,
	per_encounter_attack_amplify: PropertyFunction.PER_ENCOUNTER_ATTACK_AMPLIFY,
	per_encounter_attack_damage_amplify: PropertyFunction.PER_ENCOUNTER_ATTACK_DAMAGE_AMPLIFY,
	per_encounter_skill_damage_amplify: PropertyFunction.PER_ENCOUNTER_SKILL_DAMAGE_AMPLIFY,
	per_encounter_ultimate_damage_amplify: PropertyFunction.PER_ENCOUNTER_ULTIMATE_DAMAGE_AMPLIFY,
	per_encounter_physical_damage_amplify: PropertyFunction.PER_ENCOUNTER_PHYSICAL_DAMAGE_AMPLIFY,
	per_encounter_magical_damage_amplify: PropertyFunction.PER_ENCOUNTER_MAGICAL_DAMAGE_AMPLIFY,
	per_encounter_melee_hero_damage_amplify: PropertyFunction.PER_ENCOUNTER_MELEE_HERO_DAMAGE_AMPLIFY,
	per_encounter_ranger_hero_damage_amplify: PropertyFunction.PER_ENCOUNTER_RANGER_HERO_DAMAGE_AMPLIFY,
	per_encounter_crit_damage: PropertyFunction.PER_ENCOUNTER_CRIT_DAMAGE,
	block: PropertyFunction.BLOCK,
	poison_stacks_amplify: PropertyFunction.POISON_STACKS_AMPLIFY,
	shock_damage_amplify: PropertyFunction.SHOCK_DAMAGE_AMPLIFY,
	bleed_stacks_amplify: PropertyFunction.BLEED_STACKS_AMPLIFY,
	freeze_stacks_amplify: PropertyFunction.FREEZE_STACKS_AMPLIFY,
	shield_amplify: PropertyFunction.SHIELD_AMPLIFY,
	crit_damage_amplify: PropertyFunction.CRIT_DAMAGE_AMPLIFY,
	melee_hero_damage_amplify: PropertyFunction.MELEE_HERO_DAMAGE_AMPLIFY,
	ranger_hero_damage_amplify: PropertyFunction.RANGER_HERO_DAMAGE_AMPLIFY,
	health_potion_heal_amplify: PropertyFunction.HEALTH_POTION_HEAL_AMPLIFY,
	crit_chance_amplify: PropertyFunction.CRIT_CHANCE_AMPLIFY,
	splash_damage_amplify: PropertyFunction.SPLASH_DAMAGE_AMPLIFY,
	splash_damage_boost: PropertyFunction.SPLASH_DAMAGE_BOOST,
	debuff_target_damage_amplify: PropertyFunction.DEBUFF_TARGET_DAMAGE_AMPLIFY,
	minion_damage_boost: PropertyFunction.MINION_DAMAGE_BOOST,
	boss_damage_boost: PropertyFunction.BOSS_DAMAGE_BOOST,
	elite_damage_boost: PropertyFunction.ELITE_DAMAGE_BOOST,
	all_stats_amplify: PropertyFunction.ALL_STATS_AMPLIFY,
	ultimate_mana_cost_reduce: PropertyFunction.ULTIMATE_MANA_COST_REDUCE,
	buff_duration: PropertyFunction.BUFF_DURATION,
	debuff_duration: PropertyFunction.DEBUFF_DURATION,
	ability_charge_defense_time: PropertyFunction.ABILITY_CHARGE_DEFENSE_TIME,
	potion_heal_restore: PropertyFunction.POTION_HEAL_RESTORE,
	break_drop_chance: PropertyFunction.BREAK_DROP_CHANCE,
	break_drop_profit_pct: PropertyFunction.BREAK_DROP_PROFIT_PCT,
	revive_count: PropertyFunction.REVIVE_COUNT,
	revive_health_recover: PropertyFunction.REVIVE_HEALTH_RECOVER,
	initial_gold: PropertyFunction.INITIAL_GOLD,
	exp_gain_chance: PropertyFunction.EXP_GAIN_CHANCE,
	gold_room_amount: PropertyFunction.GOLD_ROOM_AMOUNT,
	shop_item_rarity: PropertyFunction.SHOP_ITEM_RARITY,
	artifact_item_rarity: PropertyFunction.ARTIFACT_ITEM_RARITY,
	blessing_rarity: PropertyFunction.BLESSING_RARITY,
	zeus_bless_rarity_up: PropertyFunction.ZEUS_BLESS_RARITY_UP,
	poison_bless_rarity_up: PropertyFunction.POISON_BLESS_RARITY_UP,
	ice_bless_rarity_up: PropertyFunction.ICE_BLESS_RARITY_UP,
	bleed_bless_rarity_up: PropertyFunction.BLEED_BLESS_RARITY_UP,
	crit_bless_rarity_up: PropertyFunction.CRIT_BLESS_RARITY_UP,
	holy_bless_rarity_up: PropertyFunction.HOLY_BLESS_RARITY_UP,
	wind_bless_rarity_up: PropertyFunction.WIND_BLESS_RARITY_UP,
	bless_refresh_count: PropertyFunction.BLESS_REFRESH_COUNT,
	artifact_allin_count: PropertyFunction.ARTIFACT_ALLIN_COUNT,
	bless_allin_count: PropertyFunction.BLESS_ALLIN_COUNT,
	bless_upgrade_allin_count: PropertyFunction.BLESS_UPGRADE_ALLIN_COUNT,
	ability_upgrade_allin_count: PropertyFunction.ABILITY_UPGRADE_ALLIN_COUNT,
	ability_upgrade_refresh_count: PropertyFunction.ABILITY_UPGRADE_REFRESH_COUNT,
	equip_extra_potential: PropertyFunction.EQUIP_EXTRA_POTENTIAL,
	equip_extra_drop_base: PropertyFunction.EQUIP_EXTRA_DROP_BASE,
	equip_drop_pct: PropertyFunction.EQUIP_DROP_PCT,
	equip_drop_num_pct: PropertyFunction.EQUIP_DROP_NUM_PCT,
	equip_rarity_chance: PropertyFunction.EQUIP_RARITY_CHANCE,
	equip_potential_lucky: PropertyFunction.EQUIP_POTENTIAL_LUCKY,
	melee_damage_boost: PropertyFunction.MELEE_DAMAGE_BOOST,
	ranged_damage_boost: PropertyFunction.RANGED_DAMAGE_BOOST,
	execute_damage: PropertyFunction.EXECUTE_DAMAGE,
	rage_capacity_amplify: PropertyFunction.RAGE_CAPACITY_AMPLIFY,
	heavy_attack: PropertyFunction.HEAVY_ATTACK,
	hp_regeneration: PropertyFunction.HP_REGENERATION,
	thorns_damage: PropertyFunction.THORNS_DAMAGE,
	damage_vs_bleeding_targets: PropertyFunction.DAMAGE_VS_BLEEDING_TARGETS,
	damage_vs_frozen_targets: PropertyFunction.DAMAGE_VS_FROZEN_TARGETS,
	damage_vs_shocked_targets: PropertyFunction.DAMAGE_VS_SHOCKED_TARGETS,
	damage_vs_poisoned_targets: PropertyFunction.DAMAGE_VS_POISONED_TARGETS,
	finisher_damage: PropertyFunction.FINISHER_DAMAGE,
	finisher_crit_chance: PropertyFunction.FINISHER_CRIT_CHANCE,
	skill_cooldown_reduction: PropertyFunction.SKILL_COOLDOWN_REDUCTION,
	evade_cooldown_reduction: PropertyFunction.EVADE_COOLDOWN_REDUCTION,
	block_cooldown_reduction: PropertyFunction.BLOCK_COOLDOWN_REDUCTION,
	ultimate_cooldown_reduction: PropertyFunction.ULTIMATE_COOLDOWN_REDUCTION,
	gold_gain_amount: PropertyFunction.GOLD_GAIN_AMOUNT,
	exp_gain_amount: PropertyFunction.EXP_GAIN_AMOUNT,
	gold_reward_per_encounter: PropertyFunction.GOLD_REWARD_PER_ENCOUNTER,
	exp_reward_per_encounter: PropertyFunction.EXP_REWARD_PER_ENCOUNTER,
	poison_decay_reduction: PropertyFunction.POISON_DECAY_REDUCTION,
	bleed_trigger_interval: PropertyFunction.BLEED_TRIGGER_INTERVAL,
	freeze_duration: PropertyFunction.FREEZE_DURATION,
	shock_no_decay_rate: PropertyFunction.SHOCK_NO_DECAY_RATE,
	rage_gain_percent_per_attack: PropertyFunction.RAGE_GAIN_PERCENT_PER_ATTACK,
	rage_gain_percent_per_block: PropertyFunction.RAGE_GAIN_PERCENT_PER_BLOCK,
	rage_gain_percent_per_evade: PropertyFunction.RAGE_GAIN_PERCENT_PER_EVADE,
	rage_gain_percent_per_ultimate: PropertyFunction.RAGE_GAIN_PERCENT_PER_ULTIMATE,
	poison_damage_amplify: PropertyFunction.POISON_DAMAGE_AMPLIFY,
	poison_damage_boost: PropertyFunction.POISON_DAMAGE_BOOST,
	lightning_damage_amplify: PropertyFunction.LIGHTNING_DAMAGE_AMPLIFY,
	lightning_damage_boost: PropertyFunction.LIGHTNING_DAMAGE_BOOST,
	holy_shield_damage_boost: PropertyFunction.HOLY_SHIELD_DAMAGE_BOOST,
	bleed_damage_amplify: PropertyFunction.BLEED_DAMAGE_AMPLIFY,
	bleed_damage_boost: PropertyFunction.BLEED_DAMAGE_BOOST,
	blade_damage_boost: PropertyFunction.BLADE_DAMAGE_BOOST,
	freeze_damage_amplify: PropertyFunction.FREEZE_DAMAGE_AMPLIFY,
	freeze_damage_boost: PropertyFunction.FREEZE_DAMAGE_BOOST,
	shield_damage_amplify: PropertyFunction.SHIELD_DAMAGE_AMPLIFY,
	execute_damage_amplify: PropertyFunction.EXECUTE_DAMAGE_AMPLIFY,
	conditional_damage_amplify: PropertyFunction.CONDITIONAL_DAMAGE_AMPLIFY,
	attack_damage_boost: PropertyFunction.ATTACK_DAMAGE_BOOST,
	spell_damage_boost: PropertyFunction.SPELL_DAMAGE_BOOST,
	skill_damage_amplify: PropertyFunction.SKILL_DAMAGE_AMPLIFY,
	skill_damage_boost: PropertyFunction.SKILL_DAMAGE_BOOST,
	ultimate_damage_amplify: PropertyFunction.ULTIMATE_DAMAGE_AMPLIFY,
	ultimate_damage_boost: PropertyFunction.ULTIMATE_DAMAGE_BOOST,
	dodge_damage_amplify: PropertyFunction.DODGE_DAMAGE_AMPLIFY,
	dodge_damage_boost: PropertyFunction.DODGE_DAMAGE_BOOST,
	defense_damage_amplify: PropertyFunction.DEFENSE_DAMAGE_AMPLIFY,
	defense_damage_boost: PropertyFunction.DEFENSE_DAMAGE_BOOST,
	melee_hero_damage_boost: PropertyFunction.MELEE_HERO_DAMAGE_BOOST,
	ranger_hero_damage_boost: PropertyFunction.RANGER_HERO_DAMAGE_BOOST,
	damage_boost: PropertyFunction.DAMAGE_BOOST,
	magical_damage_boost: PropertyFunction.MAGICAL_DAMAGE_BOOST,
	physical_damage_boost: PropertyFunction.PHYSICAL_DAMAGE_BOOST,
	damage_boost_per_level: PropertyFunction.DAMAGE_BOOST_PER_LEVEL,
	physical_damage_boost_per_level: PropertyFunction.PHYSICAL_DAMAGE_BOOST_PER_LEVEL,
	magical_damage_boost_per_level: PropertyFunction.MAGICAL_DAMAGE_BOOST_PER_LEVEL,
	rage_gain_percent_per_skill: PropertyFunction.RAGE_GAIN_PERCENT_PER_SKILL,
	bonus_frost_damage: PropertyFunction.BONUS_FROST_DAMAGE,
	bonus_poison_damage: PropertyFunction.BONUS_POISON_DAMAGE,
	bonus_lightning_damage: PropertyFunction.BONUS_LIGHTNING_DAMAGE,
	bonus_bleed_damage: PropertyFunction.BONUS_BLEED_DAMAGE,
	hp_regen_per_encounter: PropertyFunction.HP_REGEN_PER_ENCOUNTER,
	mana_regen_per_encounter: PropertyFunction.MANA_REGEN_PER_ENCOUNTER,
	elemental_damage: PropertyFunction.ELEMENTAL_DAMAGE,
	physical_armor: PropertyFunction.PHYSICAL_ARMOR,
	hp_regen_on_kill: PropertyFunction.HP_REGEN_ON_KILL,
	attack_speed_boost: PropertyFunction.ATTACK_SPEED_BOOST,
	damage_intensity: PropertyFunction.DAMAGE_INTENSITY,
	damage_intensity_boost: PropertyFunction.DAMAGE_INTENSITY_BOOST,
	defense_intensity: PropertyFunction.DEFENSE_INTENSITY,
	defense_intensity_boost: PropertyFunction.DEFENSE_INTENSITY_BOOST,
	hero_damage_boost: PropertyFunction.HERO_DAMAGE_BOOST,
	damage_boost_mult: PropertyFunction.DAMAGE_BOOST_MULT,
	lightning_cloud_damage: PropertyFunction.LIGHTNING_CLOUD_DAMAGE,
	lightning_cloud_duration: PropertyFunction.LIGHTNING_CLOUD_DURATION,
	lightning_cloud_hit_count: PropertyFunction.LIGHTNING_CLOUD_HIT_COUNT,
	idle_power_recover: PropertyFunction.IDLE_POWER_RECOVER,
	idle_max_power: PropertyFunction.IDLE_MAX_POWER,
	idle_max_power_pct: PropertyFunction.IDLE_MAX_POWER_PCT,
	idle_power_cost_inc_pct: PropertyFunction.IDLE_POWER_COST_INC_PCT,
	idle_power_cost_reduce_pct: PropertyFunction.IDLE_POWER_COST_REDUCE_PCT,
	idle_fish_total_profit: PropertyFunction.IDLE_FISH_TOTAL_PROFIT,
	idle_fish_total_profit_pct: PropertyFunction.IDLE_FISH_TOTAL_PROFIT_PCT,
	idle_fish_normalbox_chance: PropertyFunction.IDLE_FISH_NORMALBOX_CHANCE,
	idle_fish_goldbox_chance: PropertyFunction.IDLE_FISH_GOLDBOX_CHANCE,
	idle_fish_box_profit_pct: PropertyFunction.IDLE_FISH_BOX_PROFIT_PCT,
	ability_upgrade_count: PropertyFunction.ABILITY_UPGRADE_COUNT,
	idle_fish_rainbow_chance: PropertyFunction.IDLE_FISH_RAINBOW_CHANCE,
	idle_fish_rainbow1_chance: PropertyFunction.IDLE_FISH_RAINBOW1_CHANCE,
	idle_fish_rainbow2_chance: PropertyFunction.IDLE_FISH_RAINBOW2_CHANCE,
	idle_fish_rainbow3_chance: PropertyFunction.IDLE_FISH_RAINBOW3_CHANCE,
	idle_fish_rainbow4_chance: PropertyFunction.IDLE_FISH_RAINBOW4_CHANCE,
	idle_fish_rainbow5_chance: PropertyFunction.IDLE_FISH_RAINBOW5_CHANCE,
	idle_fish_chance: PropertyFunction.IDLE_FISH_CHANCE,
	idle_fish_num: PropertyFunction.IDLE_FISH_NUM,
	idle_fish_num_pct: PropertyFunction.IDLE_FISH_NUM_PCT,
	idle_fish_crit_chance: PropertyFunction.IDLE_FISH_CRIT_CHANCE,
	idle_fish_crit_num: PropertyFunction.IDLE_FISH_CRIT_NUM,
	idle_fish_lucky_num: PropertyFunction.IDLE_FISH_LUCKY_NUM,
	idle_fish_efficiency: PropertyFunction.IDLE_FISH_EFFICIENCY,
	idle_fish_interaction_pct: PropertyFunction.IDLE_FISH_INTERACTION_PCT,
	idle_fish_escape_speed_pct: PropertyFunction.IDLE_FISH_ESCAPE_SPEED_PCT,
	idle_fish_wait_time_reduce_pct: PropertyFunction.IDLE_FISH_WAIT_TIME_REDUCE_PCT,
	idle_fish_courier_slot: PropertyFunction.IDLE_FISH_COURIER_SLOT,
	aquarium_slot: PropertyFunction.AQUARIUM_SLOT,
	holy_shield_damage_boost2: PropertyFunction.HOLY_SHIELD_DAMAGE_BOOST2,
	blade_sword_boost2: PropertyFunction.BLADE_SWORD_BOOST2,
	dash_distance: PropertyFunction.DASH_DISTANCE,
	move_distance_efficiency: PropertyFunction.MOVE_DISTANCE_EFFICIENCY,
	explore_profit_110005_pct: PropertyFunction.EXPLORE_PROFIT_110005_PCT,
	resource_profit_stone_pct: PropertyFunction.RESOURCE_PROFIT_STONE_PCT,
	resource_profit_forge_pct: PropertyFunction.RESOURCE_PROFIT_FORGE_PCT,
	resource_profit_talent_pct: PropertyFunction.RESOURCE_PROFIT_TALENT_PCT,
	resource_profit_210001_pct: PropertyFunction.RESOURCE_PROFIT_210001_PCT,
	lightning_damage_boost2: PropertyFunction.LIGHTNING_DAMAGE_BOOST2,
	poison_damage_boost2: PropertyFunction.POISON_DAMAGE_BOOST2,
	freeze_damage_boost2: PropertyFunction.FREEZE_DAMAGE_BOOST2,
	bleed_damage_boost2: PropertyFunction.BLEED_DAMAGE_BOOST2,
	holy_suit_effect_boost: PropertyFunction.HOLY_SUIT_EFFECT_BOOST,
	zeus_suit_effect_boost: PropertyFunction.ZEUS_SUIT_EFFECT_BOOST,
	ice_suit_effect_boost: PropertyFunction.ICE_SUIT_EFFECT_BOOST,
	poison_suit_effect_boost: PropertyFunction.POISON_SUIT_EFFECT_BOOST,
	bleed_suit_effect_boost: PropertyFunction.BLEED_SUIT_EFFECT_BOOST,
	crit_suit_effect_boost: PropertyFunction.CRIT_SUIT_EFFECT_BOOST,
	wind_suit_effect_boost: PropertyFunction.WIND_SUIT_EFFECT_BOOST,
	revive_max: PropertyFunction.REVIVE_MAX,
	in_game_bless_refresh_max: PropertyFunction.IN_GAME_BLESS_REFRESH_MAX,
	in_game_ability_upgrade_max: PropertyFunction.IN_GAME_ABILITY_UPGRADE_MAX,
	gem_drop_pct: PropertyFunction.GEM_DROP_PCT,
	gem_drop_num_pct: PropertyFunction.GEM_DROP_NUM_PCT,
	gem_extra_drop_base: PropertyFunction.GEM_EXTRA_DROP_BASE,
	total_drop_num_pct: PropertyFunction.TOTAL_DROP_NUM_PCT,
	refine_inc_pct: PropertyFunction.REFINE_INC_PCT,
	abyssal_free: PropertyFunction.ABYSSAL_FREE,
	drawing_drop_chance: PropertyFunction.DRAWING_DROP_CHANCE,
	gem_roll_change: PropertyFunction.GEM_ROLL_CHANCE,
	explore_extra_chance: PropertyFunction.EXPLORE_EXTRA_CHANCE,
	explore_extra_profit_pct: PropertyFunction.EXPLORE_EXTRA_PROFIT_PCT,
	rune_rarity_chance: PropertyFunction.RUNE_RARITY_CHANCE,
	rune_devour_lock: PropertyFunction.RUNE_DEVOUR_LOCK,
	explore_limit: PropertyFunction.EXPLORE_LIMIT,
	attack_damage_boost_per_level: PropertyFunction.ATTACK_DAMAGE_BOOST_PER_LEVEL,
	spell_damage_boost_per_level: PropertyFunction.SPELL_DAMAGE_BOOST_PER_LEVEL,
	skill_damage_boost_per_level: PropertyFunction.SKILL_DAMAGE_BOOST_PER_LEVEL,
	dodge_damage_boost_per_level: PropertyFunction.DODGE_DAMAGE_BOOST_PER_LEVEL,
	defense_damage_boost_per_level: PropertyFunction.DEFENSE_DAMAGE_BOOST_PER_LEVEL,
	ultimate_damage_boost_per_level: PropertyFunction.ULTIMATE_DAMAGE_BOOST_PER_LEVEL,
	lightning_damage_boost_per_level: PropertyFunction.LIGHTNING_DAMAGE_BOOST_PER_LEVEL,
	freeze_damage_boost_per_level: PropertyFunction.FREEZE_DAMAGE_BOOST_PER_LEVEL,
	poison_damage_boost_per_level: PropertyFunction.POISON_DAMAGE_BOOST_PER_LEVEL,
	bleed_damage_boost_per_level: PropertyFunction.BLEED_DAMAGE_BOOST_PER_LEVEL,
	blade_damage_boost_per_level: PropertyFunction.BLADE_DAMAGE_BOOST_PER_LEVEL,
	holy_shield_damage_boost_per_level: PropertyFunction.HOLY_SHIELD_DAMAGE_BOOST_PER_LEVEL,
	ring_damage_boost_per_level: PropertyFunction.RING_DAMAGE_BOOST_PER_LEVEL,
	splash_damage_boost_per_level: PropertyFunction.SPLASH_DAMAGE_BOOST_PER_LEVEL,
	melee_damage_boost_per_level: PropertyFunction.MELEE_DAMAGE_BOOST_PER_LEVEL,
	ranged_damage_boost_per_level: PropertyFunction.RANGED_DAMAGE_BOOST_PER_LEVEL,
	elite_damage_boost_per_level: PropertyFunction.ELITE_DAMAGE_BOOST_PER_LEVEL,
	boss_damage_boost_per_level: PropertyFunction.BOSS_DAMAGE_BOOST_PER_LEVEL,
	barrier_damage_boost_per_level: PropertyFunction.BARRIER_DAMAGE_BOOST_PER_LEVEL,
	backstab_damage_boost_per_level: PropertyFunction.BACKSTAB_DAMAGE_BOOST_PER_LEVEL,
	idle_fish_myth_fish_chance: PropertyFunction.IDLE_FISH_MYTH_FISH_CHANCE,
	engraving_1_transfer: PropertyFunction.ENGRAVING_1_TRANSFER,
	engraving_2_transfer: PropertyFunction.ENGRAVING_2_TRANSFER,
	engraving_3_transfer: PropertyFunction.ENGRAVING_3_TRANSFER,
	engraving_4_transfer: PropertyFunction.ENGRAVING_4_TRANSFER,
	engraving_5_transfer: PropertyFunction.ENGRAVING_5_TRANSFER,
	engraving_1_strengthen: PropertyFunction.ENGRAVING_1_STRENGTHEN,
	engraving_2_strengthen: PropertyFunction.ENGRAVING_2_STRENGTHEN,
	engraving_3_strengthen: PropertyFunction.ENGRAVING_3_STRENGTHEN,
	engraving_4_strengthen: PropertyFunction.ENGRAVING_4_STRENGTHEN,
	engraving_5_strengthen: PropertyFunction.ENGRAVING_5_STRENGTHEN,
	health_percent_enemy: PropertyFunction.HEALTH_PERCENT_ENEMY,
	attack_damage_base_str: PropertyFunction.ATTACK_DAMAGE_BASE_STR,
	attack_damage_base_agi: PropertyFunction.ATTACK_DAMAGE_BASE_AGI,
	attack_damage_base_int: PropertyFunction.ATTACK_DAMAGE_BASE_INT,
	attack_damage_base_percentage: PropertyFunction.ATTACK_DAMAGE_BASE_PERCENTAGE,
	base_attack_time_constant_adjust: PropertyFunction.BASE_ATTACK_TIME_CONSTANT_ADJUST,
	attack_range_percentage: PropertyFunction.ATTACK_RANGE_PERCENTAGE,
	armor_base_str: PropertyFunction.ARMOR_BASE_STR,
	armor_base_agi: PropertyFunction.ARMOR_BASE_AGI,
	armor_base_int: PropertyFunction.ARMOR_BASE_INT,
	armor_bonus: PropertyFunction.ARMOR_BONUS,
	armor_base_percentage: PropertyFunction.ARMOR_BASE_PERCENTAGE,
	armor_percentage: PropertyFunction.ARMOR_PERCENTAGE,
	ignore_armor: PropertyFunction.IGNORE_ARMOR,
	ignore_armor_percentage: PropertyFunction.IGNORE_ARMOR_PERCENTAGE,
	ignore_armor_percentage_unique: PropertyFunction.IGNORE_ARMOR_PERCENTAGE_UNIQUE,
	ignore_armor_percentage_target: PropertyFunction.IGNORE_ARMOR_PERCENTAGE_TARGET,
	health_base_str: PropertyFunction.HEALTH_BASE_STR,
	base_health_regen_constant_str: PropertyFunction.BASE_HEALTH_REGEN_CONSTANT_STR,
	base_health_regen_constant: PropertyFunction.BASE_HEALTH_REGEN_CONSTANT,
	health_regen_constant: PropertyFunction.HEALTH_REGEN_CONSTANT,
	health_regen_percentage: PropertyFunction.HEALTH_REGEN_PERCENTAGE,
	mana_base_int: PropertyFunction.MANA_BASE_INT,
	base_mana_regen_constant_int: PropertyFunction.BASE_MANA_REGEN_CONSTANT_INT,
	mana_regen_constant: PropertyFunction.MANA_REGEN_CONSTANT,
	mana_regen_constant_unique: PropertyFunction.MANA_REGEN_CONSTANT_UNIQUE,
	mana_regen_percentage: PropertyFunction.MANA_REGEN_PERCENTAGE,
	status_resistance_stacking: PropertyFunction.STATUS_RESISTANCE_STACKING,
	status_resistance_unique: PropertyFunction.STATUS_RESISTANCE_UNIQUE,
	status_resistance_caster: PropertyFunction.STATUS_RESISTANCE_CASTER,
	cooldown_constant: PropertyFunction.COOLDOWN_CONSTANT,
	physical_criticalstrike_chance: PropertyFunction.PHYSICAL_CRITICALSTRIKE_CHANCE,
	physical_criticalstrike_damage: PropertyFunction.PHYSICAL_CRITICALSTRIKE_DAMAGE,
	physical_criticalstrike_damage_amplify: PropertyFunction.PHYSICAL_CRITICALSTRIKE_DAMAGE_AMPLIFY,
	magical_criticalstrike_chance: PropertyFunction.MAGICAL_CRITICALSTRIKE_CHANCE,
	magical_criticalstrike_damage: PropertyFunction.MAGICAL_CRITICALSTRIKE_DAMAGE,
	magical_criticalstrike_damage_amplify: PropertyFunction.MAGICAL_CRITICALSTRIKE_DAMAGE_AMPLIFY,
	criticalstrike_sound: PropertyFunction.CRITICALSTRIKE_SOUND,
	max_attackspeed_bonus: PropertyFunction.MAX_ATTACKSPEED_BONUS,
	outgoing_physical_damage_percentage: PropertyFunction.OUTGOING_PHYSICAL_DAMAGE_PERCENTAGE,
	outgoing_physical_damage_percentage_agi: PropertyFunction.OUTGOING_PHYSICAL_DAMAGE_PERCENTAGE_AGI,
	outgoing_magical_damage_percentage: PropertyFunction.OUTGOING_MAGICAL_DAMAGE_PERCENTAGE,
	outgoing_magical_damage_percentage_int: PropertyFunction.OUTGOING_MAGICAL_DAMAGE_PERCENTAGE_INT,
	outgoing_damage_percentage: PropertyFunction.OUTGOING_DAMAGE_PERCENTAGE,
	incoming_physical_damage_percentage: PropertyFunction.INCOMING_PHYSICAL_DAMAGE_PERCENTAGE,
	incoming_magical_damage_percentage: PropertyFunction.INCOMING_MAGICAL_DAMAGE_PERCENTAGE,
	incoming_damage_percentage: PropertyFunction.INCOMING_DAMAGE_PERCENTAGE,
	incoming_damage_percentage_str: PropertyFunction.INCOMING_DAMAGE_PERCENTAGE_STR,
	ignore_damage: PropertyFunction.IGNORE_DAMAGE,
	ignore_damage_agi: PropertyFunction.IGNORE_DAMAGE_AGI,
	stats_all_bonus: PropertyFunction.STATS_ALL_BONUS,
	stats_all_base: PropertyFunction.STATS_ALL_BASE,
	stats_all_percentage: PropertyFunction.STATS_ALL_PERCENTAGE,
	stats_all_base_percentage: PropertyFunction.STATS_ALL_BASE_PERCENTAGE,
	stats_strength_bonus: PropertyFunction.STATS_STRENGTH_BONUS,
	stats_strength_base: PropertyFunction.STATS_STRENGTH_BASE,
	stats_strength_percentage: PropertyFunction.STATS_STRENGTH_PERCENTAGE,
	stats_strength_base_percentage: PropertyFunction.STATS_STRENGTH_BASE_PERCENTAGE,
	stats_agility_bonus: PropertyFunction.STATS_AGILITY_BONUS,
	stats_agility_base: PropertyFunction.STATS_AGILITY_BASE,
	stats_agility_percentage: PropertyFunction.STATS_AGILITY_PERCENTAGE,
	stats_agility_base_percentage: PropertyFunction.STATS_AGILITY_BASE_PERCENTAGE,
	stats_intellect_bonus: PropertyFunction.STATS_INTELLECT_BONUS,
	stats_intellect_base: PropertyFunction.STATS_INTELLECT_BASE,
	stats_intellect_percentage: PropertyFunction.STATS_INTELLECT_PERCENTAGE,
	stats_intellect_base_percentage: PropertyFunction.STATS_INTELLECT_BASE_PERCENTAGE,
	stats_strength_gain: PropertyFunction.STATS_STRENGTH_GAIN,
	stats_agility_gain: PropertyFunction.STATS_AGILITY_GAIN,
	stats_intellect_gain: PropertyFunction.STATS_INTELLECT_GAIN,
	physical_lifesteal: PropertyFunction.PHYSICAL_LIFESTEAL,
	magical_lifesteal: PropertyFunction.MAGICAL_LIFESTEAL,
	all_lifesteal: PropertyFunction.ALL_LIFESTEAL,
	cleave_damage: PropertyFunction.CLEAVE_DAMAGE,
	cleave_radius: PropertyFunction.CLEAVE_RADIUS,
	player_kill_score_bonus: PropertyFunction.PLAYER_KILL_SCORE_BONUS,
	player_kill_gold_percentage: PropertyFunction.PLAYER_KILL_GOLD_PERCENTAGE,
	player_drop_chance_percentage: PropertyFunction.PLAYER_DROP_CHANCE_PERCENTAGE,
	fishing_crit_chance: PropertyFunction.FISHING_CRIT_CHANCE,
	armor_reduction_percentage: PropertyFunction.ARMOR_REDUCTION_PERCENTAGE,
	dig_crit_chance: PropertyFunction.DIG_CRIT_CHANCE,
	gold_monster_bonus: PropertyFunction.GOLD_MONSTER_BONUS,
	player_gold_per_second: PropertyFunction.PLAYER_GOLD_PER_SECOND,
	player_crystal_per_second: PropertyFunction.PLAYER_CRYSTAL_PER_SECOND,
	player_score_per_second: PropertyFunction.PLAYER_SCORE_PER_SECOND,
	player_attribute_gain_percentage: PropertyFunction.PLAYER_ATTRIBUTE_GAIN_PERCENTAGE,
	player_experience_gain_percentage: PropertyFunction.PLAYER_EXPERIENCE_GAIN_PERCENTAGE,
	attack_reduce_armor: PropertyFunction.ATTACK_REDUCE_ARMOR,
	permanent_mana: PropertyFunction.PERMANENT_MANA,
	athena_damage_reduce: PropertyFunction.ATHENA_DAMAGE_REDUCE,
	athena_damage_reduce2: PropertyFunction.ATHENA_DAMAGE_REDUCE2,
	athena_physical_damage: PropertyFunction.ATHENA_PHYSICAL_DAMAGE,
	athena_magical_damage: PropertyFunction.ATHENA_MAGICAL_DAMAGE,
	athena_finally_damage: PropertyFunction.ATHENA_FINALLY_DAMAGE,
	attack_per_sec: PropertyFunction.ATTACK_PER_SEC,
	health_per_sec: PropertyFunction.HEALTH_PER_SEC,
	armor_per_sec: PropertyFunction.ARMOR_PER_SEC,
	all_per_sec: PropertyFunction.ALL_PER_SEC,
	strength_per_sec: PropertyFunction.STRENGTH_PER_SEC,
	agility_per_sec: PropertyFunction.AGILITY_PER_SEC,
	intellect_per_sec: PropertyFunction.INTELLECT_PER_SEC,
	gold_per_sec: PropertyFunction.GOLD_PER_SEC,
	physical_damage_per_min: PropertyFunction.PHYSICAL_DAMAGE_PER_MIN,
	magical_damage_per_min: PropertyFunction.MAGICAL_DAMAGE_PER_MIN,
	attack_per_min: PropertyFunction.ATTACK_PER_MIN,
	health_per_min: PropertyFunction.HEALTH_PER_MIN,
	armor_per_min: PropertyFunction.ARMOR_PER_MIN,
	all_per_min: PropertyFunction.ALL_PER_MIN,
	strength_per_min: PropertyFunction.STRENGTH_PER_MIN,
	agility_per_min: PropertyFunction.AGILITY_PER_MIN,
	intellect_per_min: PropertyFunction.INTELLECT_PER_MIN,
	attack_attack: PropertyFunction.ATTACK_ATTACK,
	attack_health: PropertyFunction.ATTACK_HEALTH,
	attack_armor: PropertyFunction.ATTACK_ARMOR,
	attack_all: PropertyFunction.ATTACK_ALL,
	attack_strength: PropertyFunction.ATTACK_STRENGTH,
	attack_agility: PropertyFunction.ATTACK_AGILITY,
	attack_intellect: PropertyFunction.ATTACK_INTELLECT,
	kill_attack: PropertyFunction.KILL_ATTACK,
	kill_health: PropertyFunction.KILL_HEALTH,
	kill_armor: PropertyFunction.KILL_ARMOR,
	kill_all: PropertyFunction.KILL_ALL,
	kill_strength: PropertyFunction.KILL_STRENGTH,
	kill_agility: PropertyFunction.KILL_AGILITY,
	kill_intellect: PropertyFunction.KILL_INTELLECT,
	respawn_time: PropertyFunction.RESPAWN_TIME,
	item_physical_damage: PropertyFunction.ITEM_PHYSICAL_DAMAGE,
	item_physical_damage_2: PropertyFunction.ITEM_PHYSICAL_DAMAGE_2,
	item_magical_damage: PropertyFunction.ITEM_MAGICAL_DAMAGE,
	item_magical_damage_2: PropertyFunction.ITEM_MAGICAL_DAMAGE_2,
	item_armor_ignore_pct: PropertyFunction.ITEM_ARMOR_IGNORE_PCT,
	item_incoming_damage: PropertyFunction.ITEM_INCOMING_DAMAGE,
	item_damage_reduce_physical: PropertyFunction.ITEM_DAMAGE_REDUCE_PHYSICAL,
	item_damage_reduce_magical: PropertyFunction.ITEM_DAMAGE_REDUCE_MAGICAL,
	item_damage_reduce: PropertyFunction.ITEM_DAMAGE_REDUCE,
	item_damage_reduce_2: PropertyFunction.ITEM_DAMAGE_REDUCE_2,
	item_outgoing_damage: PropertyFunction.ITEM_OUTGOING_DAMAGE,
	item_outgoing_damage_2: PropertyFunction.ITEM_OUTGOING_DAMAGE_2,
	item_magical_crit_chance: PropertyFunction.ITEM_MAGICAL_CRIT_CHANCE,
	item_magical_crit_damage: PropertyFunction.ITEM_MAGICAL_CRIT_DAMAGE,
	item_magical_crit_damage_2: PropertyFunction.ITEM_MAGICAL_CRIT_DAMAGE_2,
	item_physical_crit_chance: PropertyFunction.ITEM_PHYSICAL_CRIT_CHANCE,
	item_physical_crit_damage: PropertyFunction.ITEM_PHYSICAL_CRIT_DAMAGE,
	item_physical_crit_damage_2: PropertyFunction.ITEM_PHYSICAL_CRIT_DAMAGE_2,
	item_evasion: PropertyFunction.ITEM_EVASION,
	item_cooldown_reduction: PropertyFunction.ITEM_COOLDOWN_REDUCTION,
	item_fishing_crit_chance: PropertyFunction.ITEM_FISHING_CRIT_CHANCE,
	item_dig_crit_chance: PropertyFunction.ITEM_DIG_CRIT_CHANCE,
	item_attack_armor_reduce_pct: PropertyFunction.ITEM_ATTACK_ARMOR_REDUCE_PCT,
	kill_gold_flat: PropertyFunction.KILL_GOLD_FLAT,
	item_armor_per_min: PropertyFunction.ITEM_ARMOR_PER_MIN,
	base_strength: PropertyFunction.BASE_STRENGTH,
	base_agility: PropertyFunction.BASE_AGILITY,
	base_intellect: PropertyFunction.BASE_INTELLECT,
	strength_gain: PropertyFunction.STRENGTH_GAIN,
	agility_gain: PropertyFunction.AGILITY_GAIN,
	intellect_gain: PropertyFunction.INTELLECT_GAIN,
	base_health_regen: PropertyFunction.BASE_HEALTH_REGEN,
	base_mana_regen: PropertyFunction.BASE_MANA_REGEN,
	base_attack_time: PropertyFunction.BASE_ATTACK_TIME,
	base_attack_range: PropertyFunction.BASE_ATTACK_RANGE,
	athena_cooldown_reduction: PropertyFunction.ATHENA_COOLDOWN_REDUCTION,
	athena_evasion: PropertyFunction.ATHENA_EVASION,
	athena_armor_ignore: PropertyFunction.ATHENA_ARMOR_IGNORE,
	base_evasion: PropertyFunction.BASE_EVASION,
	item_intellect_per_min: PropertyFunction.ITEM_INTELLECT_PER_MIN,
};
const PROPERTY_MAP_REVERSE: Partial<Record<PropertyFunction, string>> = {};
for (const [k, v] of pairs(PROPERTY_MAP)) {
	PROPERTY_MAP_REVERSE[v] = k;
}

PropertySystem.RegisterProperty({ id: "health", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_health", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "heal_room_start", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_cost_room_start", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_mana", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attackspeed", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attackspeed_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "wisp_attackspeed", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "wisp_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, enableCache: false });
PropertySystem.RegisterProperty({ id: "boss_gap_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_range", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_range_melee", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_range_ranger", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bullet_range", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "aoe_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "expose_attack_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_damage_mult", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, enableCache: false });
PropertySystem.RegisterProperty({ id: "barrier_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_crit_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_crit_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_proc", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_damage_proc", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_damage_proc_target", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_proc_target", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "final_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "final_damage_101", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "final_damage_102", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "final_damage_103", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "backstab_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "backstab_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "barrier_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "barrier_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "retaliated_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "blade_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "blade_speed_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_pool_shield_attenuation_interval_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "incoming_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "trap_incoming_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "trap_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_attenuation_interval_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_pool_incoming_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "tavern_effect_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "evasion", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, enableCache: false });
PropertySystem.RegisterProperty({ id: "avoid_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.FIRST, enableCache: false });
PropertySystem.RegisterProperty({ id: "min_health", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MAX, enableCache: false });
PropertySystem.RegisterProperty({ id: "heal_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "fury_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "fury_regen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_fury_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "skill_fury_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_fury_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "movespeed", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "movespeed_not_calculated", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "movespeed_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shop_discount", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MAX, enableCache: false });
PropertySystem.RegisterProperty({ id: "shop_refresh_refund", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MAX, enableCache: false });
PropertySystem.RegisterProperty({ id: "split_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_skill", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_dodge", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_defense", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_ultimate", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_speed_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ring_track_radius", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_multiple_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_radius", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_expose_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "expose_keep_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_no_attenuation_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_attenuation_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "frozen_no_attenuation_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "frozen_attenuation_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "frozen_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shield_attenuation_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shield_attenuation_interval_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shield_no_attenuation_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "frozen_burst_stack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bounce_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "laser_bounce_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "laser_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "snowball_bounce_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "snowball_extra_shot", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "snowball_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ice_strike", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "reflect_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "per_encounter_attack_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "attack" });
PropertySystem.RegisterProperty({ id: "per_encounter_attack_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "attack_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_attack_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "attack_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_skill_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "skill_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_ultimate_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "ultimate_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_physical_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "physical_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_magical_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "magical_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_melee_hero_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "melee_hero_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_ranger_hero_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "ranger_hero_damage_amplify" });
PropertySystem.RegisterProperty({ id: "per_encounter_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "dungeon_room_complete", event_link_id: "crit_damage" });
PropertySystem.RegisterProperty({ id: "block", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_stacks_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shock_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_stacks_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "freeze_stacks_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shield_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "melee_hero_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ranger_hero_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_potion_heal_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_chance_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "splash_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "splash_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "debuff_target_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "minion_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "boss_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "elite_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "all_stats_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ultimate_mana_cost_reduce", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "buff_duration", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "debuff_duration", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_charge_defense_time", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "potion_heal_restore", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "break_drop_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "break_drop_profit_pct", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "revive_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "revive_health_recover", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, defaultValue: 30, enableCache: false });
PropertySystem.RegisterProperty({ id: "initial_gold", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "exp_gain_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gold_room_amount", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shop_item_rarity", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "artifact_item_rarity", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "blessing_rarity", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "zeus_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ice_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "holy_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "wind_bless_rarity_up", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bless_refresh_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "artifact_allin_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bless_allin_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bless_upgrade_allin_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_upgrade_allin_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_upgrade_refresh_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_extra_potential", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_extra_drop_base", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_drop_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_drop_num_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_rarity_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "equip_potential_lucky", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "melee_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ranged_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "execute_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rage_capacity_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "heavy_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "hp_regeneration", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "thorns_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_vs_bleeding_targets", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_vs_frozen_targets", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_vs_shocked_targets", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_vs_poisoned_targets", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "finisher_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "finisher_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "skill_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "evade_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "block_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ultimate_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gold_gain_amount", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "exp_gain_amount", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gold_reward_per_encounter", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "exp_reward_per_encounter", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_decay_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_trigger_interval", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "freeze_duration", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shock_no_decay_rate", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rage_gain_percent_per_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rage_gain_percent_per_block", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rage_gain_percent_per_evade", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rage_gain_percent_per_ultimate", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "holy_shield_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "blade_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "freeze_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "freeze_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "shield_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "execute_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "conditional_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "spell_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "skill_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "skill_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ultimate_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ultimate_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "dodge_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "dodge_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "defense_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "defense_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "melee_hero_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ranger_hero_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "damage_boost" });
PropertySystem.RegisterProperty({ id: "physical_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "physical_damage_boost" });
PropertySystem.RegisterProperty({ id: "magical_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "magical_damage_boost" });
PropertySystem.RegisterProperty({ id: "rage_gain_percent_per_skill", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bonus_frost_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bonus_poison_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bonus_lightning_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bonus_bleed_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "hp_regen_per_encounter", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_regen_per_encounter", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "elemental_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_armor", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "hp_regen_on_kill", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_speed_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_intensity", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_intensity_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "defense_intensity", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "defense_intensity_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "hero_damage_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "damage_boost_mult", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_cloud_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_cloud_duration", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_cloud_hit_count", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_power_recover", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_max_power", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_max_power_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_power_cost_inc_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_power_cost_reduce_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_total_profit", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_total_profit_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_normalbox_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_goldbox_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_box_profit_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ability_upgrade_count", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow1_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow2_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow3_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow4_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_rainbow5_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_num", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_num_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_crit_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_crit_num", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_lucky_num", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_efficiency", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_interaction_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_escape_speed_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_wait_time_reduce_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "idle_fish_courier_slot", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "aquarium_slot", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "holy_shield_damage_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "blade_sword_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "dash_distance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "move_distance_efficiency", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "explore_profit_110005_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "resource_profit_stone_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "resource_profit_forge_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "resource_profit_talent_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "resource_profit_210001_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "lightning_damage_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_damage_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "freeze_damage_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_damage_boost2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "holy_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "zeus_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "ice_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "poison_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "bleed_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "crit_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "wind_suit_effect_boost", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "revive_max", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "in_game_bless_refresh_max", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "in_game_ability_upgrade_max", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gem_drop_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gem_drop_num_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gem_extra_drop_base", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "total_drop_num_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "refine_inc_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "abyssal_free", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "drawing_drop_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "gem_roll_change", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "explore_extra_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "explore_extra_profit_pct", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rune_rarity_chance", scope: PropertyScope.PLAYER, valueType: PropertyValueType.PERCENTAGE, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "rune_devour_lock", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "explore_limit", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "attack_damage_boost" });
PropertySystem.RegisterProperty({ id: "spell_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "spell_damage_boost" });
PropertySystem.RegisterProperty({ id: "skill_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "skill_damage_boost" });
PropertySystem.RegisterProperty({ id: "dodge_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "dodge_damage_boost" });
PropertySystem.RegisterProperty({ id: "defense_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "defense_damage_boost" });
PropertySystem.RegisterProperty({ id: "ultimate_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "ultimate_damage_boost" });
PropertySystem.RegisterProperty({ id: "lightning_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "lightning_damage_boost" });
PropertySystem.RegisterProperty({ id: "freeze_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "freeze_damage_boost" });
PropertySystem.RegisterProperty({ id: "poison_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "poison_damage_boost" });
PropertySystem.RegisterProperty({ id: "bleed_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "bleed_damage_boost" });
PropertySystem.RegisterProperty({ id: "blade_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "blade_damage_boost" });
PropertySystem.RegisterProperty({ id: "holy_shield_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "holy_shield_damage_boost" });
PropertySystem.RegisterProperty({ id: "ring_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "ring_damage_boost" });
PropertySystem.RegisterProperty({ id: "splash_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "splash_damage_boost" });
PropertySystem.RegisterProperty({ id: "melee_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "melee_damage_boost" });
PropertySystem.RegisterProperty({ id: "ranged_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "ranged_damage_boost" });
PropertySystem.RegisterProperty({ id: "elite_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "elite_damage_boost" });
PropertySystem.RegisterProperty({ id: "boss_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "boss_damage_boost" });
PropertySystem.RegisterProperty({ id: "barrier_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "barrier_damage_boost" });
PropertySystem.RegisterProperty({ id: "backstab_damage_boost_per_level", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false, event_name: "hero_level_up", event_link_id: "backstab_damage_boost" });
PropertySystem.RegisterProperty({ id: "idle_fish_myth_fish_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_1_transfer", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_2_transfer", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_3_transfer", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_4_transfer", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_5_transfer", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_1_strengthen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_2_strengthen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_3_strengthen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_4_strengthen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "engraving_5_strengthen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_percent_enemy", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_base_str", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_base_agi", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_base_int", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_damage_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_attack_time_constant_adjust", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_range_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_base_str", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_base_agi", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_base_int", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_armor", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_armor_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_armor_percentage_unique", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MAX, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_armor_percentage_target", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_base_str", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_health_regen_constant_str", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_health_regen_constant", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_regen_constant", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_regen_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_base_int", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_mana_regen_constant_int", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_regen_constant", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_regen_constant_unique", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "mana_regen_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "status_resistance_stacking", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "status_resistance_unique", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MAX, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "status_resistance_caster", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "cooldown_constant", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_criticalstrike_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_criticalstrike_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_criticalstrike_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_criticalstrike_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_criticalstrike_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_criticalstrike_damage_amplify", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "criticalstrike_sound", scope: PropertyScope.UNIT, valueType: PropertyValueType.CUSTOM, aggregation: AggregationStrategy.FIRST, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "max_attackspeed_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "outgoing_physical_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "outgoing_physical_damage_percentage_agi", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "outgoing_magical_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "outgoing_magical_damage_percentage_int", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "outgoing_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "incoming_physical_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "incoming_magical_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "incoming_damage_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "incoming_damage_percentage_str", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "ignore_damage_agi", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_all_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_all_base", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_all_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_all_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_strength_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_strength_base", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_strength_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_strength_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_agility_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_agility_base", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_agility_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_agility_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_intellect_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_intellect_base", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_intellect_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_intellect_base_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_strength_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_agility_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "stats_intellect_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_lifesteal", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_lifesteal", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "all_lifesteal", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "cleave_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "cleave_radius", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_kill_score_bonus", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_kill_gold_percentage", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_drop_chance_percentage", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "fishing_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_reduction_percentage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "dig_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "gold_monster_bonus", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_gold_per_second", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_crystal_per_second", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_score_per_second", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_attribute_gain_percentage", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "player_experience_gain_percentage", scope: PropertyScope.PLAYER, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_reduce_armor", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "permanent_mana", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_damage_reduce", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_damage_reduce2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_physical_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_magical_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_finally_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "all_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "strength_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "agility_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "intellect_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "gold_per_sec", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "physical_damage_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "magical_damage_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "health_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "armor_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "all_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "strength_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "agility_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "intellect_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_health", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_armor", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_all", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_strength", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_agility", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "attack_intellect", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_attack", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_health", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_armor", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_all", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_strength", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_agility", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_intellect", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "respawn_time", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_physical_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_physical_damage_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_magical_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_magical_damage_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_armor_ignore_pct", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_incoming_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_damage_reduce_physical", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_damage_reduce_magical", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_damage_reduce", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_damage_reduce_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_outgoing_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_outgoing_damage_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_magical_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_magical_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_magical_crit_damage_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_physical_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_physical_crit_damage", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_physical_crit_damage_2", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.MULTIPLY, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_evasion", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.DECMUL, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_fishing_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_dig_crit_chance", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_attack_armor_reduce_pct", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "kill_gold_flat", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_armor_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_strength", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_agility", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_intellect", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "strength_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "agility_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "intellect_gain", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_health_regen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_mana_regen", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_attack_time", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_attack_range", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, notify: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_cooldown_reduction", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_evasion", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "athena_armor_ignore", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "base_evasion", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, enableCache: false });
PropertySystem.RegisterProperty({ id: "item_intellect_per_min", scope: PropertyScope.UNIT, valueType: PropertyValueType.NUMBER, aggregation: AggregationStrategy.SUM, syncToClient: true, enableCache: false });

/** 生命值 */
function GetHealth(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health", params);
}
/** 基础生命值 */
function GetBaseHealth(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_health", params);
}
/** %最大生命值 */
function GetHealthAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_amplify", params);
}
/** %进入房间时治疗 */
function GetHealRoomStart(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "heal_room_start", params);
}
/** %进入房间时生命流失 */
function GetHealthCostRoomStart(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_cost_room_start", params);
}
/** 基础魔法 */
function GetBaseMana(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_mana", params);
}
/** 魔法值 */
function GetMana(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana", params);
}
/** %魔法值 */
function GetManaAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana_amplify", params);
}
/** 基础攻击 */
function GetBaseAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_attack", params);
}
/** 攻击力 */
function GetAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack", params);
}
/** %攻击力 */
function GetAttackAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_amplify", params);
}
/** 攻击速度 */
function GetAttackspeed(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attackspeed", params);
}
/** %攻击速度降低 */
function GetAttackspeedReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attackspeed_reduction", params);
}
/** 召唤物攻击速度 */
function GetWispAttackspeed(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "wisp_attackspeed", params);
}
/** %召唤物伤害 */
function GetWispDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "wisp_damage", params);
}
/** %冷却缩减 */
function GetCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "cooldown_reduction", params);
}
/** %Boss技能间隔倍数 */
function GetBossGapAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "boss_gap_amplify", params);
}
/** 攻击距离 */
function GetAttackRange(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_range", params);
}
/** 近战攻击距离 */
function GetAttackRangeMelee(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_range_melee", params);
}
/** 远程攻击距离 */
function GetAttackRangeRanger(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_range_ranger", params);
}
/** 弹道距离 */
function GetBulletRange(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bullet_range", params);
}
/** %范围加成 */
function GetAoeAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "aoe_amplify", params);
}
/** %<Crit:暴击率/> */
function GetCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_chance", params);
}
/** %攻击<Crit:暴击率/> */
function GetAttackCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_crit_chance", params);
}
/** %技能<Crit:暴击率/> */
function GetSpellCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_crit_chance", params);
}
/** %触电攻击<Crit:暴击率/> */
function GetExposeAttackCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "expose_attack_crit_chance", params);
}
/** %<Crit:暴击伤害/> */
function GetCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_damage", params);
}
/** %<Crit:暴击伤害[x]/> */
function GetCritDamageMult(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_damage_mult", params);
}
/** %对<Shield:护盾/><Crit:暴击伤害/> */
function GetBarrierCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "barrier_crit_damage", params);
}
/** %对<Bleed:流血/>单位<Crit:暴击伤害/> */
function GetBleedCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_crit_damage", params);
}
/** %攻击<Crit:暴击伤害/> */
function GetAttackCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_crit_damage", params);
}
/** %攻击<Crit:暴击伤害/>增幅 */
function GetAttackCritDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_crit_damage_boost", params);
}
/** %技能<Crit:暴击伤害/> */
function GetSpellCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_crit_damage", params);
}
/** %技能<Crit:暴击伤害/>增幅 */
function GetSpellCritDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_crit_damage_boost", params);
}
/** 攻击附加伤害 */
function GetAttackDamageProc(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_proc", params);
}
/** 技能附加伤害 */
function GetSpellDamageProc(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_damage_proc", params);
}
/** 目标技能附加伤害 */
function GetSpellDamageProcTarget(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_damage_proc_target", params);
}
/** 目标附加伤害 */
function GetDamageProcTarget(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_proc_target", params);
}
/** %伤害 */
function GetDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_amplify", params);
}
/** %最终伤害 */
function GetFinalDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "final_damage", params);
}
/** %最终伤害 */
function GetFinalDamage101(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "final_damage_101", params);
}
/** %最终伤害 */
function GetFinalDamage102(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "final_damage_102", params);
}
/** %最终伤害 */
function GetFinalDamage103(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "final_damage_103", params);
}
/** %物理伤害 */
function GetPhysicalDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_damage_amplify", params);
}
/** %魔法伤害 */
function GetMagicalDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_damage_amplify", params);
}
/** %攻击伤害 */
function GetAttackDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_amplify", params);
}
/** %技能伤害 */
function GetSpellDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_damage_amplify", params);
}
/** %<Backstab:背刺/>伤害 */
function GetBackstabDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "backstab_damage_amplify", params);
}
/** %<Backstab:背刺/>伤害增幅[c] */
function GetBackstabDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "backstab_damage_boost", params);
}
/** %对<Shield:护盾/>伤害 */
function GetBarrierDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "barrier_damage_amplify", params);
}
/** %对<Shield:护盾/>伤害增幅[c] */
function GetBarrierDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "barrier_damage_boost", params);
}
/** %反击效果 */
function GetRetaliatedDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "retaliated_damage_amplify", params);
}
/** %环绕物伤害 */
function GetRingDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_damage_amplify", params);
}
/** %环绕物伤害增幅[c] */
function GetRingDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_damage_boost", params);
}
/** %剑气伤害 */
function GetBladeDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "blade_damage_amplify", params);
}
/** %剑气速度 */
function GetBladeSpeedAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "blade_speed_amplify", params);
}
/** %伤害减免 */
function GetDamageReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_reduction", params);
}
/** %毒池中<Shield:护盾/>衰减间隔减缓 */
function GetPoisonPoolShieldAttenuationIntervalAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_pool_shield_attenuation_interval_amplify", params);
}
/** %受到伤害 */
function GetIncomingDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "incoming_damage_amplify", params);
}
/** %受到陷阱伤害 */
function GetTrapIncomingDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "trap_incoming_damage_amplify", params);
}
/** %陷阱对敌伤害 */
function GetTrapDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "trap_damage_amplify", params);
}
/** TODO:%<Poison:中毒/>衰减间隔减缓 */
function GetPoisonAttenuationIntervalAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_attenuation_interval_amplify", params);
}
/** %毒池中受到伤害 */
function GetPoisonPoolIncomingDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_pool_incoming_damage_amplify", params);
}
/** %酒馆效果提升 */
function GetTavernEffectAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "tavern_effect_amplify", params);
}
/** %闪避 */
function GetEvasion(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "evasion", params);
}
/** 规避伤害 */
function GetAvoidDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "avoid_damage", params);
}
/** 最低生命值 */
function GetMinHealth(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "min_health", params);
}
/** %治疗增强 */
function GetHealAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "heal_amplify", params);
}
/** %<Fury:怒气累积/> */
function GetFuryAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "fury_amplify", params);
}
/** 每秒<Fury:怒气累积/> */
function GetFuryRegen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "fury_regen", params);
}
/** %暴击<Fury:怒气累积/> */
function GetCritFuryAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_fury_amplify", params);
}
/** %特技<Fury:怒气累积/> */
function GetSkillFuryAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "skill_fury_amplify", params);
}
/** %环绕物伤害<Fury:怒气累积/> */
function GetRingFuryAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_fury_amplify", params);
}
/** 移动速度 */
function GetMovespeed(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "movespeed", params);
}
/** 不计算的移动速度 */
function GetMovespeedNotCalculated(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "movespeed_not_calculated", params);
}
/** %移动速度 */
function GetMovespeedAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "movespeed_amplify", params);
}
/** %<Discount:商店折扣/> */
function GetShopDiscount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shop_discount", params);
}
/** %商店刷新金币返还 */
function GetShopRefreshRefund(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shop_refresh_refund", params);
}
/** <Split:散射/>次数 */
function GetSplitCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "split_count", params);
}
/** <Attack:攻击/>充能次数 */
function GetAbilityChargeAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_attack", params);
}
/** <Skill:特技/>充能次数 */
function GetAbilityChargeSkill(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_skill", params);
}
/** <Dodge:冲刺/>充能次数 */
function GetAbilityChargeDodge(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_dodge", params);
}
/** <Defense:防御/>充能次数 */
function GetAbilityChargeDefense(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_defense", params);
}
/** <Ultimate:绝招/>充能次数 */
function GetAbilityChargeUltimate(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_ultimate", params);
}
/** <Ring:环绕物/>数量 */
function GetRingCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_count", params);
}
/** %<Ring:环绕物/>速度 */
function GetRingSpeedAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_speed_amplify", params);
}
/** <Ring:环绕物/>追踪距离 */
function GetRingTrackRadius(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_track_radius", params);
}
/** %多重雷击概率 */
function GetLightningMultipleChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_multiple_chance", params);
}
/** 雷击范围 */
function GetLightningRadius(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_radius", params);
}
/** 雷击伤害 */
function GetLightningDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_damage", params);
}
/** %<ArcLightning:闪电链/>触电概率 */
function GetLightningExposeChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_expose_chance", params);
}
/** %<Electric:触电/>不消耗概率 */
function GetExposeKeepChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "expose_keep_chance", params);
}
/** <ArcLightning:闪电链/>数量 */
function GetLightningCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_count", params);
}
/** %<Poison:中毒/>不衰减概率 */
function GetPoisonNoAttenuationChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_no_attenuation_chance", params);
}
/** %<Poison:中毒/>衰减降低 */
function GetPoisonAttenuationReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_attenuation_reduction", params);
}
/** %<Frozen:冰冻/>不衰减概率 */
function GetFrozenNoAttenuationChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "frozen_no_attenuation_chance", params);
}
/** %<Frozen:冰冻/>衰减降低 */
function GetFrozenAttenuationReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "frozen_attenuation_reduction", params);
}
/** %<Frozen:冰冻/>伤害增幅 */
function GetFrozenDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "frozen_damage_amplify", params);
}
/** %<Shield:护盾/>衰减降低 */
function GetShieldAttenuationReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shield_attenuation_reduction", params);
}
/** %<Shield:护盾/>衰减间隔减缓 */
function GetShieldAttenuationIntervalAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shield_attenuation_interval_amplify", params);
}
/** %<Shield:护盾/>不衰减概率 */
function GetShieldNoAttenuationChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shield_no_attenuation_chance", params);
}
/** 寒霜爆发施加<Frozen:冰冻/>层数 */
function GetFrozenBurstStack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "frozen_burst_stack", params);
}
/** 弹道弹射次数 */
function GetBounceCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bounce_count", params);
}
/** 激光弹射次数 */
function GetLaserBounceCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "laser_bounce_count", params);
}
/** %激光伤害 */
function GetLaserDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "laser_damage_amplify", params);
}
/** 雪球弹射次数 */
function GetSnowballBounceCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "snowball_bounce_count", params);
}
/** 雪球额外发射数量 */
function GetSnowballExtraShot(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "snowball_extra_shot", params);
}
/** 雪球伤害 */
function GetSnowballDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "snowball_damage", params);
}
/** 额外冰雹 */
function GetIceStrike(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ice_strike", params);
}
/** <Reflect:反弹/>伤害 */
function GetReflectDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "reflect_damage", params);
}
/** 每次遭遇战获得攻击力 */
function GetPerEncounterAttackBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_attack_bonus", params);
}
/** %每次遭遇战攻击力提升 */
function GetPerEncounterAttackAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_attack_amplify", params);
}
/** %每次遭遇战攻击伤害提升 */
function GetPerEncounterAttackDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_attack_damage_amplify", params);
}
/** %每次遭遇战特技伤害提升 */
function GetPerEncounterSkillDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_skill_damage_amplify", params);
}
/** %每次遭遇战绝招伤害提升 */
function GetPerEncounterUltimateDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_ultimate_damage_amplify", params);
}
/** %每次遭遇战物理伤害增幅提升 */
function GetPerEncounterPhysicalDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_physical_damage_amplify", params);
}
/** %每次遭遇战魔法伤害增幅提升 */
function GetPerEncounterMagicalDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_magical_damage_amplify", params);
}
/** %每次遭遇战近战英雄伤害提升 */
function GetPerEncounterMeleeHeroDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_melee_hero_damage_amplify", params);
}
/** %每次遭遇战远程英雄伤害提升 */
function GetPerEncounterRangerHeroDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_ranger_hero_damage_amplify", params);
}
/** %每次遭遇战暴击伤害增加 */
function GetPerEncounterCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "per_encounter_crit_damage", params);
}
/** 格挡 */
function GetBlock(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "block", params);
}
/** %施加额外毒层数 */
function GetPoisonStacksAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_stacks_amplify", params);
}
/** %触电伤害增加 */
function GetShockDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shock_damage_amplify", params);
}
/** %施加额外流血层数 */
function GetBleedStacksAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_stacks_amplify", params);
}
/** %施加额外冰冻层数 */
function GetFreezeStacksAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_stacks_amplify", params);
}
/** %额外获得护盾量 */
function GetShieldAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shield_amplify", params);
}
/** %暴击伤害增幅 */
function GetCritDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_damage_amplify", params);
}
/** %近战英雄伤害增幅 */
function GetMeleeHeroDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "melee_hero_damage_amplify", params);
}
/** %远程英雄伤害增幅 */
function GetRangerHeroDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ranger_hero_damage_amplify", params);
}
/** %血瓶回复生命值 */
function GetHealthPotionHealAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_potion_heal_amplify", params);
}
/** %暴击概率增幅 */
function GetCritChanceAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_chance_amplify", params);
}
/** %散射伤害 */
function GetSplashDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "splash_damage_amplify", params);
}
/** %散射伤害增幅[c] */
function GetSplashDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "splash_damage_boost", params);
}
/** %对异常状态目标伤害增幅 */
function GetDebuffTargetDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "debuff_target_damage_amplify", params);
}
/** %对小怪伤害增幅[c] */
function GetMinionDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "minion_damage_boost", params);
}
/** %对首领伤害增幅[c] */
function GetBossDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "boss_damage_boost", params);
}
/** %对精英伤害增幅[c] */
function GetEliteDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "elite_damage_boost", params);
}
/** 绝招的蓝耗降低 */
function GetUltimateManaCostReduce(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ultimate_mana_cost_reduce", params);
}
/** %增益buff时间延长 */
function GetBuffDuration(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "buff_duration", params);
}
/** %减益buff时间延长 */
function GetDebuffDuration(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "debuff_duration", params);
}
/** %防御技能的充能时间缩短 */
function GetAbilityChargeDefenseTime(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ability_charge_defense_time", params);
}
/** %血瓶的回复量提高 */
function GetPotionHealRestore(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "potion_heal_restore", params);
}
/** %破坏物掉落概率 */
function GetBreakDropChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "break_drop_chance", params);
}
/** %掉落物收益 */
function GetBreakDropProfitPct(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "break_drop_profit_pct", params);
}
/** 复活次数 */
function GetReviveCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "revive_count", params);
}
/** %复活后回复生命 */
function GetReviveHealthRecover(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "revive_health_recover", params);
}
/** 初始金币 */
function GetInitialGold(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "initial_gold", params);
}
/** %局内经验提高 */
function GetExpGainChance(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "exp_gain_chance", params);
}
/** %金币房间的金币数量提高 */
function GetGoldRoomAmount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gold_room_amount", params);
}
/** %商店的商品稀有度提高 */
function GetShopItemRarity(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "shop_item_rarity", params);
}
/** %遗物物品稀有度提升 */
function GetArtifactItemRarity(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "artifact_item_rarity", params);
}
/** %获得祝福的稀有度提高 */
function GetBlessingRarity(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "blessing_rarity", params);
}
/** 祝福刷新次数 */
function GetBlessRefreshCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "bless_refresh_count", params);
}
/** 获得全部遗物次数 */
function GetArtifactAllinCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "artifact_allin_count", params);
}
/** 获得全部祝福次数 */
function GetBlessAllinCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "bless_allin_count", params);
}
/** 升级全部祝福次数 */
function GetBlessUpgradeAllinCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "bless_upgrade_allin_count", params);
}
/** 获得全部技能升级次数 */
function GetAbilityUpgradeAllinCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "ability_upgrade_allin_count", params);
}
/** 技能天赋刷新次数 */
function GetAbilityUpgradeRefreshCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "ability_upgrade_refresh_count", params);
}
/** %近距离伤害增幅[c] */
function GetMeleeDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "melee_damage_boost", params);
}
/** %远距离伤害增幅[c] */
function GetRangedDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ranged_damage_boost", params);
}
/** %斩杀伤害 */
function GetExecuteDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "execute_damage", params);
}
/** %<Fury:怒气上限/>增幅 */
function GetRageCapacityAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "rage_capacity_amplify", params);
}
/** %重击 */
function GetHeavyAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "heavy_attack", params);
}
/** %生命回复 */
function GetHpRegeneration(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "hp_regeneration", params);
}
/** %荆棘伤害 */
function GetThornsDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "thorns_damage", params);
}
/** %对流血敌人造成伤害 */
function GetDamageVsBleedingTargets(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_vs_bleeding_targets", params);
}
/** %对冰冻敌人造成伤害 */
function GetDamageVsFrozenTargets(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_vs_frozen_targets", params);
}
/** %对触电敌人造成伤害 */
function GetDamageVsShockedTargets(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_vs_shocked_targets", params);
}
/** %对中毒敌人造成伤害 */
function GetDamageVsPoisonedTargets(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_vs_poisoned_targets", params);
}
/** %终结攻击伤害 */
function GetFinisherDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "finisher_damage", params);
}
/** %终结攻击暴击率 */
function GetFinisherCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "finisher_crit_chance", params);
}
/** %特技加速 */
function GetSkillCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "skill_cooldown_reduction", params);
}
/** %冲刺加速 */
function GetEvadeCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "evade_cooldown_reduction", params);
}
/** %防御加速 */
function GetBlockCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "block_cooldown_reduction", params);
}
/** %绝招加速 */
function GetUltimateCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ultimate_cooldown_reduction", params);
}
/** %金币获取量 */
function GetGoldGainAmount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gold_gain_amount", params);
}
/** %经验获取量 */
function GetExpGainAmount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "exp_gain_amount", params);
}
/** 遭遇战获得金币 */
function GetGoldRewardPerEncounter(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gold_reward_per_encounter", params);
}
/** 遭遇战结束给予经验 */
function GetExpRewardPerEncounter(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "exp_reward_per_encounter", params);
}
/** %中毒衰减降低 */
function GetPoisonDecayReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_decay_reduction", params);
}
/** %流血触发间隔 */
function GetBleedTriggerInterval(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_trigger_interval", params);
}
/** %冰冻持续时间 */
function GetFreezeDuration(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_duration", params);
}
/** %触电不衰减率 */
function GetShockNoDecayRate(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shock_no_decay_rate", params);
}
/** %攻击获得<Fury:怒气/>% */
function GetRageGainPercentPerAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "rage_gain_percent_per_attack", params);
}
/** %防御获得<Fury:怒气/>% */
function GetRageGainPercentPerBlock(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "rage_gain_percent_per_block", params);
}
/** %闪避获得<Fury:怒气/>% */
function GetRageGainPercentPerEvade(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "rage_gain_percent_per_evade", params);
}
/** %绝招获得<Fury:怒气/>% */
function GetRageGainPercentPerUltimate(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "rage_gain_percent_per_ultimate", params);
}
/** %中毒伤害 */
function GetPoisonDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_damage_amplify", params);
}
/** %中毒伤害增幅[c] */
function GetPoisonDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_damage_boost", params);
}
/** %雷系伤害 */
function GetLightningDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_damage_amplify", params);
}
/** %雷系伤害增幅[c] */
function GetLightningDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_damage_boost", params);
}
/** %神圣系伤害增幅[c] */
function GetHolyShieldDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "holy_shield_damage_boost", params);
}
/** %流血伤害 */
function GetBleedDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_damage_amplify", params);
}
/** %流血伤害增幅[c] */
function GetBleedDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_damage_boost", params);
}
/** %剑意伤害增幅[c] */
function GetBladeDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "blade_damage_boost", params);
}
/** %冰冻系伤害 */
function GetFreezeDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_damage_amplify", params);
}
/** %冰冻伤害增幅[c] */
function GetFreezeDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_damage_boost", params);
}
/** %护盾系伤害 */
function GetShieldDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "shield_damage_amplify", params);
}
/** %斩杀伤害 */
function GetExecuteDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "execute_damage_amplify", params);
}
/** %条件伤害 */
function GetConditionalDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "conditional_damage_amplify", params);
}
/** %攻击伤害增幅[b] */
function GetAttackDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_boost", params);
}
/** %技能伤害增幅[b] */
function GetSpellDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_damage_boost", params);
}
/** %特技伤害 */
function GetSkillDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "skill_damage_amplify", params);
}
/** %特技技能增幅[b] */
function GetSkillDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "skill_damage_boost", params);
}
/** %绝招伤害 */
function GetUltimateDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ultimate_damage_amplify", params);
}
/** %绝招伤害增幅[b] */
function GetUltimateDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ultimate_damage_boost", params);
}
/** %冲刺技能伤害 */
function GetDodgeDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "dodge_damage_amplify", params);
}
/** %冲刺技能增幅[b] */
function GetDodgeDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "dodge_damage_boost", params);
}
/** %防御技能伤害 */
function GetDefenseDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "defense_damage_amplify", params);
}
/** %防御技能增幅[b] */
function GetDefenseDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "defense_damage_boost", params);
}
/** %近战英雄伤害增幅 */
function GetMeleeHeroDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "melee_hero_damage_boost", params);
}
/** %远程英雄伤害增幅 */
function GetRangerHeroDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ranger_hero_damage_boost", params);
}
/** %伤害增幅[a] */
function GetDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_boost", params);
}
/** %魔法伤害增幅[a] */
function GetMagicalDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_damage_boost", params);
}
/** %物理伤害增幅[a] */
function GetPhysicalDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_damage_boost", params);
}
/** %升级获得伤害增幅[a] */
function GetDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_boost_per_level", params);
}
/** %升级获得物理伤害增幅[a] */
function GetPhysicalDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_damage_boost_per_level", params);
}
/** %升级获得魔法伤害增幅[a] */
function GetMagicalDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_damage_boost_per_level", params);
}
/** 每遭遇战回复生命值 */
function GetHpRegenPerEncounter(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "hp_regen_per_encounter", params);
}
/** 每遭遇战回复怒气值 */
function GetManaRegenPerEncounter(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "mana_regen_per_encounter", params);
}
/** <DamageIntensity:伤害强度/> */
function GetDamageIntensity(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_intensity", params);
}
/** %伤害强度增幅 */
function GetDamageIntensityBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_intensity_boost", params);
}
/** <DefenseIntensity:防御强度/> */
function GetDefenseIntensity(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "defense_intensity", params);
}
/** %防御强度增幅 */
function GetDefenseIntensityBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "defense_intensity_boost", params);
}
/** %全伤害增幅 */
function GetHeroDamageBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "hero_damage_boost", params);
}
/** %增伤[x] */
function GetDamageBoostMult(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "damage_boost_mult", params);
}
/** 雷云伤害 */
function GetLightningCloudDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_cloud_damage", params);
}
/** 雷云持续时间 */
function GetLightningCloudDuration(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_cloud_duration", params);
}
/** 雷云额外打击目标数 */
function GetLightningCloudHitCount(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_cloud_hit_count", params);
}
/** 技能升级选项 */
function GetAbilityUpgradeCount(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "ability_upgrade_count", params);
}
/** 水族馆槽位 */
function GetAquariumSlot(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "aquarium_slot", params);
}
/** %神圣系伤害增强 */
function GetHolyShieldDamageBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "holy_shield_damage_boost2", params);
}
/** %剑意效果增强 */
function GetBladeSwordBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "blade_sword_boost2", params);
}
/** 冲刺距离 */
function GetDashDistance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "dash_distance", params);
}
/** %移动距离效率 */
function GetMoveDistanceEfficiency(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "move_distance_efficiency", params);
}
/** %雷电效果增强 */
function GetLightningDamageBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_damage_boost2", params);
}
/** %中毒效果增强 */
function GetPoisonDamageBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_damage_boost2", params);
}
/** %冰冻效果增强 */
function GetFreezeDamageBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_damage_boost2", params);
}
/** %流血效果增强 */
function GetBleedDamageBoost2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_damage_boost2", params);
}
/** %神圣流派等级效果加成 */
function GetHolySuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "holy_suit_effect_boost", params);
}
/** %雷电流派等级效果加成 */
function GetZeusSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "zeus_suit_effect_boost", params);
}
/** %冰冻流派等级效果加成 */
function GetIceSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ice_suit_effect_boost", params);
}
/** %剧毒流派等级效果加成 */
function GetPoisonSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_suit_effect_boost", params);
}
/** %狂暴流派等级效果加成 */
function GetBleedSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_suit_effect_boost", params);
}
/** %<Crit:暴击/>流派等级效果加成 */
function GetCritSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "crit_suit_effect_boost", params);
}
/** %御风流派等级效果加成 */
function GetWindSuitEffectBoost(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "wind_suit_effect_boost", params);
}
/** 复活次数上限增加 */
function GetReviveMax(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "revive_max", params);
}
/** 刷新祝福次数上限增加 */
function GetInGameBlessRefreshMax(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "in_game_bless_refresh_max", params);
}
/** 刷新技能升级次数上限增加 */
function GetInGameAbilityUpgradeMax(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "in_game_ability_upgrade_max", params);
}
/** %宝石掉落加成 */
function GetGemDropPct(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gem_drop_pct", params);
}
/** %宝石掉落数量加成 */
function GetGemDropNumPct(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gem_drop_num_pct", params);
}
/** 宝石额外基础掉落 */
function GetGemExtraDropBase(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gem_extra_drop_base", params);
}
/** %所有存档及材料掉落总增 */
function GetTotalDropNumPct(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "total_drop_num_pct", params);
}
/** %存档装备洗练数值提升 */
function GetRefineIncPct(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "refine_inc_pct", params);
}
/** 深渊模式每日免费开启次数 */
function GetAbyssalFree(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "abyssal_free", params);
}
/** %<DrawingChance:图纸掉落概率/> */
function GetDrawingDropChance(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "drawing_drop_chance", params);
}
/** %<GemRollChance:宝石高数值概率/> */
function GetGemRollChance(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "gem_roll_change", params);
}
/** %探险触发额外奖励概率 */
function GetExploreExtraChance(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "explore_extra_chance", params);
}
/** %探险额外收益加成 */
function GetExploreExtraProfitPct(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "explore_extra_profit_pct", params);
}
/** %符文稀有度概率 */
function GetRuneRarityChance(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "rune_rarity_chance", params);
}
/** 符文吞噬可锁定副词条 */
function GetRuneDevourLock(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "rune_devour_lock", params);
}
/** 信使远征时长上限 */
function GetExploreLimit(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "explore_limit", params);
}
/** %升级获得攻击伤害增幅[b] */
function GetAttackDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_boost_per_level", params);
}
/** %升级获得技能伤害增幅[b] */
function GetSpellDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "spell_damage_boost_per_level", params);
}
/** %升级获得特技技能增幅[b] */
function GetSkillDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "skill_damage_boost_per_level", params);
}
/** %升级获得冲刺技能增幅[b] */
function GetDodgeDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "dodge_damage_boost_per_level", params);
}
/** %升级获得防御技能增幅[b] */
function GetDefenseDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "defense_damage_boost_per_level", params);
}
/** %升级获得绝招伤害增幅[b] */
function GetUltimateDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ultimate_damage_boost_per_level", params);
}
/** %升级获得雷系伤害增幅[c] */
function GetLightningDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "lightning_damage_boost_per_level", params);
}
/** %升级获得冰冻伤害增幅[c] */
function GetFreezeDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "freeze_damage_boost_per_level", params);
}
/** %升级获得中毒伤害增幅[c] */
function GetPoisonDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "poison_damage_boost_per_level", params);
}
/** %升级获得流血伤害增幅[c] */
function GetBleedDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "bleed_damage_boost_per_level", params);
}
/** %升级获得剑意伤害增幅[c] */
function GetBladeDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "blade_damage_boost_per_level", params);
}
/** %升级获得神圣系伤害增幅[c] */
function GetHolyShieldDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "holy_shield_damage_boost_per_level", params);
}
/** %升级获得环绕物伤害增幅[c] */
function GetRingDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ring_damage_boost_per_level", params);
}
/** %升级获得散射伤害增幅[c] */
function GetSplashDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "splash_damage_boost_per_level", params);
}
/** %升级获得近距离伤害增幅[c] */
function GetMeleeDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "melee_damage_boost_per_level", params);
}
/** %升级获得远距离伤害增幅[c] */
function GetRangedDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ranged_damage_boost_per_level", params);
}
/** %升级获得对精英伤害增幅[c] */
function GetEliteDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "elite_damage_boost_per_level", params);
}
/** %升级获得对首领伤害增幅[c] */
function GetBossDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "boss_damage_boost_per_level", params);
}
/** %升级获得对<Shield:护盾/>伤害增幅[c] */
function GetBarrierDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "barrier_damage_boost_per_level", params);
}
/** %升级获得<Backstab:背刺/>伤害增幅[c] */
function GetBackstabDamageBoostPerLevel(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "backstab_damage_boost_per_level", params);
}
/** %钓鱼为神话珍鱼概率 */
function GetIdleFishMythFishChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "idle_fish_myth_fish_chance", params);
}
/** %符文副属性<Modify:转移/>为对攻击生效 */
function GetEngraving1Transfer(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_1_transfer", params);
}
/** %符文副属性<Modify:转移/>为对特技生效 */
function GetEngraving2Transfer(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_2_transfer", params);
}
/** %符文副属性<Modify:转移/>为对冲刺生效 */
function GetEngraving3Transfer(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_3_transfer", params);
}
/** %符文副属性<Modify:转移/>为对防御生效 */
function GetEngraving4Transfer(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_4_transfer", params);
}
/** %符文副属性<Modify:转移/>为对绝招生效 */
function GetEngraving5Transfer(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_5_transfer", params);
}
/** %符文位于攻击时副属性<Subattribute:强化/> */
function GetEngraving1Strengthen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_1_strengthen", params);
}
/** %符文位于特技时副属性<Subattribute:强化/> */
function GetEngraving2Strengthen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_2_strengthen", params);
}
/** %符文位于冲刺时副属性<Subattribute:强化/> */
function GetEngraving3Strengthen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_3_strengthen", params);
}
/** %符文位于防御时副属性<Subattribute:强化/> */
function GetEngraving4Strengthen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_4_strengthen", params);
}
/** %符文位于绝招时副属性<Subattribute:强化/> */
function GetEngraving5Strengthen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "engraving_5_strengthen", params);
}
/** 生命百分比敌方 */
function GetHealthPercentEnemy(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_percent_enemy", params);
}
/** 攻击伤害基础力量派生 */
function GetAttackDamageBaseStr(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_base_str", params);
}
/** 攻击伤害基础敏捷派生 */
function GetAttackDamageBaseAgi(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_base_agi", params);
}
/** 攻击伤害基础智力派生 */
function GetAttackDamageBaseInt(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_base_int", params);
}
/** %基础攻击 */
function GetAttackDamageBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_damage_base_percentage", params);
}
/** 基础攻击间隔固定调整 */
function GetBaseAttackTimeConstantAdjust(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_attack_time_constant_adjust", params);
}
/** 攻击RANGE百分比 */
function GetAttackRangePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_range_percentage", params);
}
/** 护甲基础力量派生 */
function GetArmorBaseStr(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_base_str", params);
}
/** 护甲基础敏捷派生 */
function GetArmorBaseAgi(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_base_agi", params);
}
/** 护甲基础智力派生 */
function GetArmorBaseInt(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_base_int", params);
}
/** 额外护甲 */
function GetArmorBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_bonus", params);
}
/** %基础护甲 */
function GetArmorBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_base_percentage", params);
}
/** %总护甲 */
function GetArmorPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_percentage", params);
}
/** 固定无视护甲 */
function GetIgnoreArmor(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_armor", params);
}
/** 无视护甲百分比 */
function GetIgnoreArmorPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_armor_percentage", params);
}
/** 无视护甲百分比独立 */
function GetIgnoreArmorPercentageUnique(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_armor_percentage_unique", params);
}
/** 无视护甲百分比目标 */
function GetIgnoreArmorPercentageTarget(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_armor_percentage_target", params);
}
/** 生命基础力量派生 */
function GetHealthBaseStr(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_base_str", params);
}
/** 基础生命恢复固定力量派生 */
function GetBaseHealthRegenConstantStr(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_health_regen_constant_str", params);
}
/** 基础生命恢复固定 */
function GetBaseHealthRegenConstant(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_health_regen_constant", params);
}
/** 生命恢复固定 */
function GetHealthRegenConstant(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_regen_constant", params);
}
/** 生命恢复百分比 */
function GetHealthRegenPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_regen_percentage", params);
}
/** 魔法基础智力派生 */
function GetManaBaseInt(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana_base_int", params);
}
/** 基础魔法恢复固定智力派生 */
function GetBaseManaRegenConstantInt(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_mana_regen_constant_int", params);
}
/** 魔法恢复固定 */
function GetManaRegenConstant(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana_regen_constant", params);
}
/** 魔法恢复固定独立 */
function GetManaRegenConstantUnique(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana_regen_constant_unique", params);
}
/** 魔法恢复百分比 */
function GetManaRegenPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "mana_regen_percentage", params);
}
/** 状态抗性叠加 */
function GetStatusResistanceStacking(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "status_resistance_stacking", params);
}
/** 状态抗性独立 */
function GetStatusResistanceUnique(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "status_resistance_unique", params);
}
/** 状态抗性施法者 */
function GetStatusResistanceCaster(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "status_resistance_caster", params);
}
/** 冷却减少固定 */
function GetCooldownConstant(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "cooldown_constant", params);
}
/** %物理暴击率 */
function GetPhysicalCriticalstrikeChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_criticalstrike_chance", params);
}
/** %物理暴击伤害 */
function GetPhysicalCriticalstrikeDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_criticalstrike_damage", params);
}
/** 物理暴击伤害增幅 */
function GetPhysicalCriticalstrikeDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_criticalstrike_damage_amplify", params);
}
/** %魔法暴击率 */
function GetMagicalCriticalstrikeChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_criticalstrike_chance", params);
}
/** %魔法暴击伤害 */
function GetMagicalCriticalstrikeDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_criticalstrike_damage", params);
}
/** 魔法暴击伤害增幅 */
function GetMagicalCriticalstrikeDamageAmplify(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_criticalstrike_damage_amplify", params);
}
/** 暴击音效 */
function GetCriticalstrikeSound(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "criticalstrike_sound", params);
}
/** 最大攻速额外 */
function GetMaxAttackspeedBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "max_attackspeed_bonus", params);
}
/** 造成物理伤害百分比 */
function GetOutgoingPhysicalDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "outgoing_physical_damage_percentage", params);
}
/** 造成物理伤害百分比敏捷派生 */
function GetOutgoingPhysicalDamagePercentageAgi(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "outgoing_physical_damage_percentage_agi", params);
}
/** 造成魔法伤害百分比 */
function GetOutgoingMagicalDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "outgoing_magical_damage_percentage", params);
}
/** 造成魔法伤害百分比智力派生 */
function GetOutgoingMagicalDamagePercentageInt(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "outgoing_magical_damage_percentage_int", params);
}
/** 造成伤害百分比 */
function GetOutgoingDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "outgoing_damage_percentage", params);
}
/** 受到物理伤害百分比 */
function GetIncomingPhysicalDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "incoming_physical_damage_percentage", params);
}
/** 受到魔法伤害百分比 */
function GetIncomingMagicalDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "incoming_magical_damage_percentage", params);
}
/** 受到伤害百分比 */
function GetIncomingDamagePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "incoming_damage_percentage", params);
}
/** 受到伤害百分比力量派生 */
function GetIncomingDamagePercentageStr(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "incoming_damage_percentage_str", params);
}
/** 伤害格挡 */
function GetIgnoreDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_damage", params);
}
/** 无视伤害敏捷派生 */
function GetIgnoreDamageAgi(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "ignore_damage_agi", params);
}
/** 属性全属性额外 */
function GetStatsAllBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_all_bonus", params);
}
/** 属性全属性基础 */
function GetStatsAllBase(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_all_base", params);
}
/** 属性全属性百分比 */
function GetStatsAllPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_all_percentage", params);
}
/** 属性全属性基础百分比 */
function GetStatsAllBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_all_base_percentage", params);
}
/** 属性力量额外 */
function GetStatsStrengthBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_strength_bonus", params);
}
/** 属性力量基础 */
function GetStatsStrengthBase(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_strength_base", params);
}
/** 属性力量百分比 */
function GetStatsStrengthPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_strength_percentage", params);
}
/** 属性力量基础百分比 */
function GetStatsStrengthBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_strength_base_percentage", params);
}
/** 属性敏捷额外 */
function GetStatsAgilityBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_agility_bonus", params);
}
/** 属性敏捷基础 */
function GetStatsAgilityBase(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_agility_base", params);
}
/** 属性敏捷百分比 */
function GetStatsAgilityPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_agility_percentage", params);
}
/** 属性敏捷基础百分比 */
function GetStatsAgilityBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_agility_base_percentage", params);
}
/** 属性智力额外 */
function GetStatsIntellectBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_intellect_bonus", params);
}
/** 属性智力基础 */
function GetStatsIntellectBase(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_intellect_base", params);
}
/** 属性智力百分比 */
function GetStatsIntellectPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_intellect_percentage", params);
}
/** 属性智力基础百分比 */
function GetStatsIntellectBasePercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_intellect_base_percentage", params);
}
/** 属性力量成长 */
function GetStatsStrengthGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_strength_gain", params);
}
/** 属性敏捷成长 */
function GetStatsAgilityGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_agility_gain", params);
}
/** 属性智力成长 */
function GetStatsIntellectGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "stats_intellect_gain", params);
}
/** 物理吸血 */
function GetPhysicalLifesteal(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_lifesteal", params);
}
/** 魔法吸血 */
function GetMagicalLifesteal(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_lifesteal", params);
}
/** 全属性吸血 */
function GetAllLifesteal(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "all_lifesteal", params);
}
/** 分裂伤害 */
function GetCleaveDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "cleave_damage", params);
}
/** 分裂范围 */
function GetCleaveRadius(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "cleave_radius", params);
}
/** 玩家击杀荣耀额外 */
function GetPlayerKillScoreBonus(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_kill_score_bonus", params);
}
/** 玩家击杀金币百分比 */
function GetPlayerKillGoldPercentage(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_kill_gold_percentage", params);
}
/** 玩家掉宝几率百分比 */
function GetPlayerDropChancePercentage(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_drop_chance_percentage", params);
}
/** 钓鱼暴击几率 */
function GetFishingCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "fishing_crit_chance", params);
}
/** 护甲减免百分比 */
function GetArmorReductionPercentage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_reduction_percentage", params);
}
/** 挖宝暴击几率 */
function GetDigCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "dig_crit_chance", params);
}
/** 金币怪物额外 */
function GetGoldMonsterBonus(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "gold_monster_bonus", params);
}
/** 玩家金币每秒 */
function GetPlayerGoldPerSecond(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_gold_per_second", params);
}
/** 玩家魂晶每秒 */
function GetPlayerCrystalPerSecond(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_crystal_per_second", params);
}
/** 玩家荣耀每秒 */
function GetPlayerScorePerSecond(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_score_per_second", params);
}
/** 玩家属性成长百分比 */
function GetPlayerAttributeGainPercentage(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_attribute_gain_percentage", params);
}
/** 玩家经验成长百分比 */
function GetPlayerExperienceGainPercentage(playerID: PlayerID, params?: any) {
	return PropertySystem.GetPropertyValue(playerID, "player_experience_gain_percentage", params);
}
/** 攻击减甲 */
function GetAttackReduceArmor(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_reduce_armor", params);
}
/** 魔法 */
function GetPermanentMana(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "permanent_mana", params);
}
/** 伤害减免 */
function GetAthenaDamageReduce(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "athena_damage_reduce", params);
}
/** 伤害再减免 */
function GetAthenaDamageReduce2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "athena_damage_reduce2", params);
}
/** 物理伤害 */
function GetAthenaPhysicalDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "athena_physical_damage", params);
}
/** 魔法伤害 */
function GetAthenaMagicalDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "athena_magical_damage", params);
}
/** 最终伤害 */
function GetAthenaFinallyDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "athena_finally_damage", params);
}
/** 每秒攻击 */
function GetAttackPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_per_sec", params);
}
/** 每秒生命 */
function GetHealthPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_per_sec", params);
}
/** 每秒护甲 */
function GetArmorPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_per_sec", params);
}
/** 每秒全属性 */
function GetAllPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "all_per_sec", params);
}
/** 每秒力量 */
function GetStrengthPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "strength_per_sec", params);
}
/** 每秒敏捷 */
function GetAgilityPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "agility_per_sec", params);
}
/** 每秒智力 */
function GetIntellectPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "intellect_per_sec", params);
}
/** 每秒金币 */
function GetGoldPerSec(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "gold_per_sec", params);
}
/** 每分钟物理伤害 */
function GetPhysicalDamagePerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "physical_damage_per_min", params);
}
/** 每分钟魔法伤害 */
function GetMagicalDamagePerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "magical_damage_per_min", params);
}
/** 每分钟攻击 */
function GetAttackPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_per_min", params);
}
/** 每分钟生命 */
function GetHealthPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "health_per_min", params);
}
/** 每分钟护甲 */
function GetArmorPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "armor_per_min", params);
}
/** 每分钟全属性 */
function GetAllPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "all_per_min", params);
}
/** 每分钟力量 */
function GetStrengthPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "strength_per_min", params);
}
/** 每分钟敏捷 */
function GetAgilityPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "agility_per_min", params);
}
/** 每分钟智力 */
function GetIntellectPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "intellect_per_min", params);
}
/** 攻击攻击 */
function GetAttackAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_attack", params);
}
/** 攻击生命 */
function GetAttackHealth(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_health", params);
}
/** 攻击护甲 */
function GetAttackArmor(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_armor", params);
}
/** 攻击全属性 */
function GetAttackAll(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_all", params);
}
/** 攻击力量 */
function GetAttackStrength(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_strength", params);
}
/** 攻击敏捷 */
function GetAttackAgility(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_agility", params);
}
/** 攻击智力 */
function GetAttackIntellect(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "attack_intellect", params);
}
/** 击杀攻击 */
function GetKillAttack(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_attack", params);
}
/** 击杀生命 */
function GetKillHealth(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_health", params);
}
/** 击杀护甲 */
function GetKillArmor(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_armor", params);
}
/** 击杀全属性 */
function GetKillAll(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_all", params);
}
/** 击杀力量 */
function GetKillStrength(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_strength", params);
}
/** 击杀敏捷 */
function GetKillAgility(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_agility", params);
}
/** 击杀智力 */
function GetKillIntellect(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_intellect", params);
}
/** 复活时间(降低) */
function GetRespawnTime(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "respawn_time", params);
}
/** 物理伤害增强 */
function GetItemPhysicalDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_physical_damage", params);
}
/** 物理伤害再增强 */
function GetItemPhysicalDamage2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_physical_damage_2", params);
}
/** 魔法伤害增强 */
function GetItemMagicalDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_magical_damage", params);
}
/** 魔法伤害再增强 */
function GetItemMagicalDamage2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_magical_damage_2", params);
}
/** 忽视护甲百分比 */
function GetItemArmorIgnorePct(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_armor_ignore_pct", params);
}
/** 受到伤害 */
function GetItemIncomingDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_incoming_damage", params);
}
/** 物理伤害减免 */
function GetItemDamageReducePhysical(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_damage_reduce_physical", params);
}
/** 魔法伤害减免 */
function GetItemDamageReduceMagical(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_damage_reduce_magical", params);
}
/** 伤害减免 */
function GetItemDamageReduce(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_damage_reduce", params);
}
/** 伤害再减免 */
function GetItemDamageReduce2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_damage_reduce_2", params);
}
/** 伤害增强 */
function GetItemOutgoingDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_outgoing_damage", params);
}
/** 伤害再增强 */
function GetItemOutgoingDamage2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_outgoing_damage_2", params);
}
/** 魔法暴击率 */
function GetItemMagicalCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_magical_crit_chance", params);
}
/** 魔法暴击伤害 */
function GetItemMagicalCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_magical_crit_damage", params);
}
/** 魔法暴击伤害增强 */
function GetItemMagicalCritDamage2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_magical_crit_damage_2", params);
}
/** 物理暴击率 */
function GetItemPhysicalCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_physical_crit_chance", params);
}
/** 物理暴击伤害 */
function GetItemPhysicalCritDamage(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_physical_crit_damage", params);
}
/** 物理暴击伤害增强 */
function GetItemPhysicalCritDamage2(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_physical_crit_damage_2", params);
}
/** 闪避 */
function GetItemEvasion(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_evasion", params);
}
/** 冷却缩减 */
function GetItemCooldownReduction(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_cooldown_reduction", params);
}
/** 钓鱼暴击几率TODO:没实现 */
function GetItemFishingCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_fishing_crit_chance", params);
}
/** 挖宝暴击几率TODO:没实现 */
function GetItemDigCritChance(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_dig_crit_chance", params);
}
/** 攻击减甲的效果提升 */
function GetItemAttackArmorReducePct(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_attack_armor_reduce_pct", params);
}
/** 击杀增加金钱 */
function GetKillGoldFlat(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "kill_gold_flat", params);
}
/** 每分钟护甲 */
function GetItemArmorPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_armor_per_min", params);
}
/** 初始力量 */
function GetBaseStrength(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_strength", params);
}
/** 初始敏捷 */
function GetBaseAgility(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_agility", params);
}
/** 初始智力 */
function GetBaseIntellect(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_intellect", params);
}
/** 原始力量成长 */
function GetStrengthGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "strength_gain", params);
}
/** 原始敏捷成长 */
function GetAgilityGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "agility_gain", params);
}
/** 原始智力成长 */
function GetIntellectGain(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "intellect_gain", params);
}
/** 基础生命恢复 */
function GetBaseHealthRegen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_health_regen", params);
}
/** 基础魔法恢复 */
function GetBaseManaRegen(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_mana_regen", params);
}
/** 基础攻击间隔 */
function GetBaseAttackTime(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_attack_time", params);
}
/** 基础攻击距离 */
function GetBaseAttackRange(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_attack_range", params);
}
/** 基础闪避 */
function GetBaseEvasion(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "base_evasion", params);
}
/** 装备每分钟智力 */
function GetItemIntellectPerMin(unit: CDOTA_BaseNPC, params?: any) {
	return PropertySystem.GetPropertyValue(unit.entindex(), "item_intellect_per_min", params);
}

const PROPERTY_FUNCTION_MAP: Record<string, (this: void, unit: any, params?: any) => number> = {
	health: GetHealth,
	base_health: GetBaseHealth,
	health_amplify: GetHealthAmplify,
	heal_room_start: GetHealRoomStart,
	health_cost_room_start: GetHealthCostRoomStart,
	base_mana: GetBaseMana,
	mana: GetMana,
	mana_amplify: GetManaAmplify,
	base_attack: GetBaseAttack,
	attack: GetAttack,
	attack_amplify: GetAttackAmplify,
	attackspeed: GetAttackspeed,
	attackspeed_reduction: GetAttackspeedReduction,
	wisp_attackspeed: GetWispAttackspeed,
	wisp_damage: GetWispDamage,
	cooldown_reduction: GetCooldownReduction,
	boss_gap_amplify: GetBossGapAmplify,
	attack_range: GetAttackRange,
	attack_range_melee: GetAttackRangeMelee,
	attack_range_ranger: GetAttackRangeRanger,
	bullet_range: GetBulletRange,
	aoe_amplify: GetAoeAmplify,
	crit_chance: GetCritChance,
	attack_crit_chance: GetAttackCritChance,
	spell_crit_chance: GetSpellCritChance,
	expose_attack_crit_chance: GetExposeAttackCritChance,
	crit_damage: GetCritDamage,
	crit_damage_mult: GetCritDamageMult,
	barrier_crit_damage: GetBarrierCritDamage,
	bleed_crit_damage: GetBleedCritDamage,
	attack_crit_damage: GetAttackCritDamage,
	attack_crit_damage_boost: GetAttackCritDamageBoost,
	spell_crit_damage: GetSpellCritDamage,
	spell_crit_damage_boost: GetSpellCritDamageBoost,
	attack_damage_proc: GetAttackDamageProc,
	spell_damage_proc: GetSpellDamageProc,
	spell_damage_proc_target: GetSpellDamageProcTarget,
	damage_proc_target: GetDamageProcTarget,
	damage_amplify: GetDamageAmplify,
	final_damage: GetFinalDamage,
	final_damage_101: GetFinalDamage101,
	final_damage_102: GetFinalDamage102,
	final_damage_103: GetFinalDamage103,
	physical_damage_amplify: GetPhysicalDamageAmplify,
	magical_damage_amplify: GetMagicalDamageAmplify,
	attack_damage_amplify: GetAttackDamageAmplify,
	spell_damage_amplify: GetSpellDamageAmplify,
	backstab_damage_amplify: GetBackstabDamageAmplify,
	backstab_damage_boost: GetBackstabDamageBoost,
	barrier_damage_amplify: GetBarrierDamageAmplify,
	barrier_damage_boost: GetBarrierDamageBoost,
	retaliated_damage_amplify: GetRetaliatedDamageAmplify,
	ring_damage_amplify: GetRingDamageAmplify,
	ring_damage_boost: GetRingDamageBoost,
	blade_damage_amplify: GetBladeDamageAmplify,
	blade_speed_amplify: GetBladeSpeedAmplify,
	damage_reduction: GetDamageReduction,
	poison_pool_shield_attenuation_interval_amplify: GetPoisonPoolShieldAttenuationIntervalAmplify,
	incoming_damage_amplify: GetIncomingDamageAmplify,
	trap_incoming_damage_amplify: GetTrapIncomingDamageAmplify,
	trap_damage_amplify: GetTrapDamageAmplify,
	poison_attenuation_interval_amplify: GetPoisonAttenuationIntervalAmplify,
	poison_pool_incoming_damage_amplify: GetPoisonPoolIncomingDamageAmplify,
	tavern_effect_amplify: GetTavernEffectAmplify,
	evasion: GetEvasion,
	avoid_damage: GetAvoidDamage,
	min_health: GetMinHealth,
	heal_amplify: GetHealAmplify,
	fury_amplify: GetFuryAmplify,
	fury_regen: GetFuryRegen,
	crit_fury_amplify: GetCritFuryAmplify,
	skill_fury_amplify: GetSkillFuryAmplify,
	ring_fury_amplify: GetRingFuryAmplify,
	movespeed: GetMovespeed,
	movespeed_not_calculated: GetMovespeedNotCalculated,
	movespeed_amplify: GetMovespeedAmplify,
	shop_discount: GetShopDiscount,
	shop_refresh_refund: GetShopRefreshRefund,
	split_count: GetSplitCount,
	ability_charge_attack: GetAbilityChargeAttack,
	ability_charge_skill: GetAbilityChargeSkill,
	ability_charge_dodge: GetAbilityChargeDodge,
	ability_charge_defense: GetAbilityChargeDefense,
	ability_charge_ultimate: GetAbilityChargeUltimate,
	ring_count: GetRingCount,
	ring_speed_amplify: GetRingSpeedAmplify,
	ring_track_radius: GetRingTrackRadius,
	lightning_multiple_chance: GetLightningMultipleChance,
	lightning_radius: GetLightningRadius,
	lightning_damage: GetLightningDamage,
	lightning_expose_chance: GetLightningExposeChance,
	expose_keep_chance: GetExposeKeepChance,
	lightning_count: GetLightningCount,
	poison_no_attenuation_chance: GetPoisonNoAttenuationChance,
	poison_attenuation_reduction: GetPoisonAttenuationReduction,
	frozen_no_attenuation_chance: GetFrozenNoAttenuationChance,
	frozen_attenuation_reduction: GetFrozenAttenuationReduction,
	frozen_damage_amplify: GetFrozenDamageAmplify,
	shield_attenuation_reduction: GetShieldAttenuationReduction,
	shield_attenuation_interval_amplify: GetShieldAttenuationIntervalAmplify,
	shield_no_attenuation_chance: GetShieldNoAttenuationChance,
	frozen_burst_stack: GetFrozenBurstStack,
	bounce_count: GetBounceCount,
	laser_bounce_count: GetLaserBounceCount,
	laser_damage_amplify: GetLaserDamageAmplify,
	snowball_bounce_count: GetSnowballBounceCount,
	snowball_extra_shot: GetSnowballExtraShot,
	snowball_damage: GetSnowballDamage,
	ice_strike: GetIceStrike,
	reflect_damage: GetReflectDamage,
	per_encounter_attack_bonus: GetPerEncounterAttackBonus,
	per_encounter_attack_amplify: GetPerEncounterAttackAmplify,
	per_encounter_attack_damage_amplify: GetPerEncounterAttackDamageAmplify,
	per_encounter_skill_damage_amplify: GetPerEncounterSkillDamageAmplify,
	per_encounter_ultimate_damage_amplify: GetPerEncounterUltimateDamageAmplify,
	per_encounter_physical_damage_amplify: GetPerEncounterPhysicalDamageAmplify,
	per_encounter_magical_damage_amplify: GetPerEncounterMagicalDamageAmplify,
	per_encounter_melee_hero_damage_amplify: GetPerEncounterMeleeHeroDamageAmplify,
	per_encounter_ranger_hero_damage_amplify: GetPerEncounterRangerHeroDamageAmplify,
	per_encounter_crit_damage: GetPerEncounterCritDamage,
	block: GetBlock,
	poison_stacks_amplify: GetPoisonStacksAmplify,
	shock_damage_amplify: GetShockDamageAmplify,
	bleed_stacks_amplify: GetBleedStacksAmplify,
	freeze_stacks_amplify: GetFreezeStacksAmplify,
	shield_amplify: GetShieldAmplify,
	crit_damage_amplify: GetCritDamageAmplify,
	melee_hero_damage_amplify: GetMeleeHeroDamageAmplify,
	ranger_hero_damage_amplify: GetRangerHeroDamageAmplify,
	health_potion_heal_amplify: GetHealthPotionHealAmplify,
	crit_chance_amplify: GetCritChanceAmplify,
	splash_damage_amplify: GetSplashDamageAmplify,
	splash_damage_boost: GetSplashDamageBoost,
	debuff_target_damage_amplify: GetDebuffTargetDamageAmplify,
	minion_damage_boost: GetMinionDamageBoost,
	boss_damage_boost: GetBossDamageBoost,
	elite_damage_boost: GetEliteDamageBoost,
	ultimate_mana_cost_reduce: GetUltimateManaCostReduce,
	buff_duration: GetBuffDuration,
	debuff_duration: GetDebuffDuration,
	ability_charge_defense_time: GetAbilityChargeDefenseTime,
	potion_heal_restore: GetPotionHealRestore,
	break_drop_chance: GetBreakDropChance,
	break_drop_profit_pct: GetBreakDropProfitPct,
	revive_count: GetReviveCount,
	revive_health_recover: GetReviveHealthRecover,
	initial_gold: GetInitialGold,
	exp_gain_chance: GetExpGainChance,
	gold_room_amount: GetGoldRoomAmount,
	shop_item_rarity: GetShopItemRarity,
	artifact_item_rarity: GetArtifactItemRarity,
	blessing_rarity: GetBlessingRarity,
	bless_refresh_count: GetBlessRefreshCount,
	artifact_allin_count: GetArtifactAllinCount,
	bless_allin_count: GetBlessAllinCount,
	bless_upgrade_allin_count: GetBlessUpgradeAllinCount,
	ability_upgrade_allin_count: GetAbilityUpgradeAllinCount,
	ability_upgrade_refresh_count: GetAbilityUpgradeRefreshCount,
	melee_damage_boost: GetMeleeDamageBoost,
	ranged_damage_boost: GetRangedDamageBoost,
	execute_damage: GetExecuteDamage,
	rage_capacity_amplify: GetRageCapacityAmplify,
	heavy_attack: GetHeavyAttack,
	hp_regeneration: GetHpRegeneration,
	thorns_damage: GetThornsDamage,
	damage_vs_bleeding_targets: GetDamageVsBleedingTargets,
	damage_vs_frozen_targets: GetDamageVsFrozenTargets,
	damage_vs_shocked_targets: GetDamageVsShockedTargets,
	damage_vs_poisoned_targets: GetDamageVsPoisonedTargets,
	finisher_damage: GetFinisherDamage,
	finisher_crit_chance: GetFinisherCritChance,
	skill_cooldown_reduction: GetSkillCooldownReduction,
	evade_cooldown_reduction: GetEvadeCooldownReduction,
	block_cooldown_reduction: GetBlockCooldownReduction,
	ultimate_cooldown_reduction: GetUltimateCooldownReduction,
	gold_gain_amount: GetGoldGainAmount,
	exp_gain_amount: GetExpGainAmount,
	gold_reward_per_encounter: GetGoldRewardPerEncounter,
	exp_reward_per_encounter: GetExpRewardPerEncounter,
	poison_decay_reduction: GetPoisonDecayReduction,
	bleed_trigger_interval: GetBleedTriggerInterval,
	freeze_duration: GetFreezeDuration,
	shock_no_decay_rate: GetShockNoDecayRate,
	rage_gain_percent_per_attack: GetRageGainPercentPerAttack,
	rage_gain_percent_per_block: GetRageGainPercentPerBlock,
	rage_gain_percent_per_evade: GetRageGainPercentPerEvade,
	rage_gain_percent_per_ultimate: GetRageGainPercentPerUltimate,
	poison_damage_amplify: GetPoisonDamageAmplify,
	poison_damage_boost: GetPoisonDamageBoost,
	lightning_damage_amplify: GetLightningDamageAmplify,
	lightning_damage_boost: GetLightningDamageBoost,
	holy_shield_damage_boost: GetHolyShieldDamageBoost,
	bleed_damage_amplify: GetBleedDamageAmplify,
	bleed_damage_boost: GetBleedDamageBoost,
	blade_damage_boost: GetBladeDamageBoost,
	freeze_damage_amplify: GetFreezeDamageAmplify,
	freeze_damage_boost: GetFreezeDamageBoost,
	shield_damage_amplify: GetShieldDamageAmplify,
	execute_damage_amplify: GetExecuteDamageAmplify,
	conditional_damage_amplify: GetConditionalDamageAmplify,
	attack_damage_boost: GetAttackDamageBoost,
	spell_damage_boost: GetSpellDamageBoost,
	skill_damage_amplify: GetSkillDamageAmplify,
	skill_damage_boost: GetSkillDamageBoost,
	ultimate_damage_amplify: GetUltimateDamageAmplify,
	ultimate_damage_boost: GetUltimateDamageBoost,
	dodge_damage_amplify: GetDodgeDamageAmplify,
	dodge_damage_boost: GetDodgeDamageBoost,
	defense_damage_amplify: GetDefenseDamageAmplify,
	defense_damage_boost: GetDefenseDamageBoost,
	melee_hero_damage_boost: GetMeleeHeroDamageBoost,
	ranger_hero_damage_boost: GetRangerHeroDamageBoost,
	damage_boost: GetDamageBoost,
	magical_damage_boost: GetMagicalDamageBoost,
	physical_damage_boost: GetPhysicalDamageBoost,
	damage_boost_per_level: GetDamageBoostPerLevel,
	physical_damage_boost_per_level: GetPhysicalDamageBoostPerLevel,
	magical_damage_boost_per_level: GetMagicalDamageBoostPerLevel,
	hp_regen_per_encounter: GetHpRegenPerEncounter,
	mana_regen_per_encounter: GetManaRegenPerEncounter,
	damage_intensity: GetDamageIntensity,
	damage_intensity_boost: GetDamageIntensityBoost,
	defense_intensity: GetDefenseIntensity,
	defense_intensity_boost: GetDefenseIntensityBoost,
	hero_damage_boost: GetHeroDamageBoost,
	damage_boost_mult: GetDamageBoostMult,
	lightning_cloud_damage: GetLightningCloudDamage,
	lightning_cloud_duration: GetLightningCloudDuration,
	lightning_cloud_hit_count: GetLightningCloudHitCount,
	ability_upgrade_count: GetAbilityUpgradeCount,
	aquarium_slot: GetAquariumSlot,
	holy_shield_damage_boost2: GetHolyShieldDamageBoost2,
	blade_sword_boost2: GetBladeSwordBoost2,
	dash_distance: GetDashDistance,
	move_distance_efficiency: GetMoveDistanceEfficiency,
	lightning_damage_boost2: GetLightningDamageBoost2,
	poison_damage_boost2: GetPoisonDamageBoost2,
	freeze_damage_boost2: GetFreezeDamageBoost2,
	bleed_damage_boost2: GetBleedDamageBoost2,
	holy_suit_effect_boost: GetHolySuitEffectBoost,
	zeus_suit_effect_boost: GetZeusSuitEffectBoost,
	ice_suit_effect_boost: GetIceSuitEffectBoost,
	poison_suit_effect_boost: GetPoisonSuitEffectBoost,
	bleed_suit_effect_boost: GetBleedSuitEffectBoost,
	crit_suit_effect_boost: GetCritSuitEffectBoost,
	wind_suit_effect_boost: GetWindSuitEffectBoost,
	revive_max: GetReviveMax,
	in_game_bless_refresh_max: GetInGameBlessRefreshMax,
	in_game_ability_upgrade_max: GetInGameAbilityUpgradeMax,
	gem_drop_pct: GetGemDropPct,
	gem_drop_num_pct: GetGemDropNumPct,
	gem_extra_drop_base: GetGemExtraDropBase,
	total_drop_num_pct: GetTotalDropNumPct,
	refine_inc_pct: GetRefineIncPct,
	abyssal_free: GetAbyssalFree,
	drawing_drop_chance: GetDrawingDropChance,
	gem_roll_change: GetGemRollChance,
	explore_extra_chance: GetExploreExtraChance,
	explore_extra_profit_pct: GetExploreExtraProfitPct,
	rune_rarity_chance: GetRuneRarityChance,
	rune_devour_lock: GetRuneDevourLock,
	explore_limit: GetExploreLimit,
	attack_damage_boost_per_level: GetAttackDamageBoostPerLevel,
	spell_damage_boost_per_level: GetSpellDamageBoostPerLevel,
	skill_damage_boost_per_level: GetSkillDamageBoostPerLevel,
	dodge_damage_boost_per_level: GetDodgeDamageBoostPerLevel,
	defense_damage_boost_per_level: GetDefenseDamageBoostPerLevel,
	ultimate_damage_boost_per_level: GetUltimateDamageBoostPerLevel,
	lightning_damage_boost_per_level: GetLightningDamageBoostPerLevel,
	freeze_damage_boost_per_level: GetFreezeDamageBoostPerLevel,
	poison_damage_boost_per_level: GetPoisonDamageBoostPerLevel,
	bleed_damage_boost_per_level: GetBleedDamageBoostPerLevel,
	blade_damage_boost_per_level: GetBladeDamageBoostPerLevel,
	holy_shield_damage_boost_per_level: GetHolyShieldDamageBoostPerLevel,
	ring_damage_boost_per_level: GetRingDamageBoostPerLevel,
	splash_damage_boost_per_level: GetSplashDamageBoostPerLevel,
	melee_damage_boost_per_level: GetMeleeDamageBoostPerLevel,
	ranged_damage_boost_per_level: GetRangedDamageBoostPerLevel,
	elite_damage_boost_per_level: GetEliteDamageBoostPerLevel,
	boss_damage_boost_per_level: GetBossDamageBoostPerLevel,
	barrier_damage_boost_per_level: GetBarrierDamageBoostPerLevel,
	backstab_damage_boost_per_level: GetBackstabDamageBoostPerLevel,
	idle_fish_myth_fish_chance: GetIdleFishMythFishChance,
	engraving_1_transfer: GetEngraving1Transfer,
	engraving_2_transfer: GetEngraving2Transfer,
	engraving_3_transfer: GetEngraving3Transfer,
	engraving_4_transfer: GetEngraving4Transfer,
	engraving_5_transfer: GetEngraving5Transfer,
	engraving_1_strengthen: GetEngraving1Strengthen,
	engraving_2_strengthen: GetEngraving2Strengthen,
	engraving_3_strengthen: GetEngraving3Strengthen,
	engraving_4_strengthen: GetEngraving4Strengthen,
	engraving_5_strengthen: GetEngraving5Strengthen,
	health_percent_enemy: GetHealthPercentEnemy,
	attack_damage_base_str: GetAttackDamageBaseStr,
	attack_damage_base_agi: GetAttackDamageBaseAgi,
	attack_damage_base_int: GetAttackDamageBaseInt,
	attack_damage_base_percentage: GetAttackDamageBasePercentage,
	base_attack_time_constant_adjust: GetBaseAttackTimeConstantAdjust,
	attack_range_percentage: GetAttackRangePercentage,
	armor_base_str: GetArmorBaseStr,
	armor_base_agi: GetArmorBaseAgi,
	armor_base_int: GetArmorBaseInt,
	armor_bonus: GetArmorBonus,
	armor_base_percentage: GetArmorBasePercentage,
	armor_percentage: GetArmorPercentage,
	ignore_armor: GetIgnoreArmor,
	ignore_armor_percentage: GetIgnoreArmorPercentage,
	ignore_armor_percentage_unique: GetIgnoreArmorPercentageUnique,
	ignore_armor_percentage_target: GetIgnoreArmorPercentageTarget,
	health_base_str: GetHealthBaseStr,
	base_health_regen_constant_str: GetBaseHealthRegenConstantStr,
	base_health_regen_constant: GetBaseHealthRegenConstant,
	health_regen_constant: GetHealthRegenConstant,
	health_regen_percentage: GetHealthRegenPercentage,
	mana_base_int: GetManaBaseInt,
	base_mana_regen_constant_int: GetBaseManaRegenConstantInt,
	mana_regen_constant: GetManaRegenConstant,
	mana_regen_constant_unique: GetManaRegenConstantUnique,
	mana_regen_percentage: GetManaRegenPercentage,
	status_resistance_stacking: GetStatusResistanceStacking,
	status_resistance_unique: GetStatusResistanceUnique,
	status_resistance_caster: GetStatusResistanceCaster,
	cooldown_constant: GetCooldownConstant,
	physical_criticalstrike_chance: GetPhysicalCriticalstrikeChance,
	physical_criticalstrike_damage: GetPhysicalCriticalstrikeDamage,
	physical_criticalstrike_damage_amplify: GetPhysicalCriticalstrikeDamageAmplify,
	magical_criticalstrike_chance: GetMagicalCriticalstrikeChance,
	magical_criticalstrike_damage: GetMagicalCriticalstrikeDamage,
	magical_criticalstrike_damage_amplify: GetMagicalCriticalstrikeDamageAmplify,
	criticalstrike_sound: GetCriticalstrikeSound,
	max_attackspeed_bonus: GetMaxAttackspeedBonus,
	outgoing_physical_damage_percentage: GetOutgoingPhysicalDamagePercentage,
	outgoing_physical_damage_percentage_agi: GetOutgoingPhysicalDamagePercentageAgi,
	outgoing_magical_damage_percentage: GetOutgoingMagicalDamagePercentage,
	outgoing_magical_damage_percentage_int: GetOutgoingMagicalDamagePercentageInt,
	outgoing_damage_percentage: GetOutgoingDamagePercentage,
	incoming_physical_damage_percentage: GetIncomingPhysicalDamagePercentage,
	incoming_magical_damage_percentage: GetIncomingMagicalDamagePercentage,
	incoming_damage_percentage: GetIncomingDamagePercentage,
	incoming_damage_percentage_str: GetIncomingDamagePercentageStr,
	ignore_damage: GetIgnoreDamage,
	ignore_damage_agi: GetIgnoreDamageAgi,
	stats_all_bonus: GetStatsAllBonus,
	stats_all_base: GetStatsAllBase,
	stats_all_percentage: GetStatsAllPercentage,
	stats_all_base_percentage: GetStatsAllBasePercentage,
	stats_strength_bonus: GetStatsStrengthBonus,
	stats_strength_base: GetStatsStrengthBase,
	stats_strength_percentage: GetStatsStrengthPercentage,
	stats_strength_base_percentage: GetStatsStrengthBasePercentage,
	stats_agility_bonus: GetStatsAgilityBonus,
	stats_agility_base: GetStatsAgilityBase,
	stats_agility_percentage: GetStatsAgilityPercentage,
	stats_agility_base_percentage: GetStatsAgilityBasePercentage,
	stats_intellect_bonus: GetStatsIntellectBonus,
	stats_intellect_base: GetStatsIntellectBase,
	stats_intellect_percentage: GetStatsIntellectPercentage,
	stats_intellect_base_percentage: GetStatsIntellectBasePercentage,
	stats_strength_gain: GetStatsStrengthGain,
	stats_agility_gain: GetStatsAgilityGain,
	stats_intellect_gain: GetStatsIntellectGain,
	physical_lifesteal: GetPhysicalLifesteal,
	magical_lifesteal: GetMagicalLifesteal,
	all_lifesteal: GetAllLifesteal,
	cleave_damage: GetCleaveDamage,
	cleave_radius: GetCleaveRadius,
	player_kill_score_bonus: GetPlayerKillScoreBonus,
	player_kill_gold_percentage: GetPlayerKillGoldPercentage,
	player_drop_chance_percentage: GetPlayerDropChancePercentage,
	fishing_crit_chance: GetFishingCritChance,
	armor_reduction_percentage: GetArmorReductionPercentage,
	dig_crit_chance: GetDigCritChance,
	gold_monster_bonus: GetGoldMonsterBonus,
	player_gold_per_second: GetPlayerGoldPerSecond,
	player_crystal_per_second: GetPlayerCrystalPerSecond,
	player_score_per_second: GetPlayerScorePerSecond,
	player_attribute_gain_percentage: GetPlayerAttributeGainPercentage,
	player_experience_gain_percentage: GetPlayerExperienceGainPercentage,
	attack_reduce_armor: GetAttackReduceArmor,
	permanent_mana: GetPermanentMana,
	athena_damage_reduce: GetAthenaDamageReduce,
	athena_damage_reduce2: GetAthenaDamageReduce2,
	athena_physical_damage: GetAthenaPhysicalDamage,
	athena_magical_damage: GetAthenaMagicalDamage,
	athena_finally_damage: GetAthenaFinallyDamage,
	attack_per_sec: GetAttackPerSec,
	health_per_sec: GetHealthPerSec,
	armor_per_sec: GetArmorPerSec,
	all_per_sec: GetAllPerSec,
	strength_per_sec: GetStrengthPerSec,
	agility_per_sec: GetAgilityPerSec,
	intellect_per_sec: GetIntellectPerSec,
	gold_per_sec: GetGoldPerSec,
	physical_damage_per_min: GetPhysicalDamagePerMin,
	magical_damage_per_min: GetMagicalDamagePerMin,
	attack_per_min: GetAttackPerMin,
	health_per_min: GetHealthPerMin,
	armor_per_min: GetArmorPerMin,
	all_per_min: GetAllPerMin,
	strength_per_min: GetStrengthPerMin,
	agility_per_min: GetAgilityPerMin,
	intellect_per_min: GetIntellectPerMin,
	attack_attack: GetAttackAttack,
	attack_health: GetAttackHealth,
	attack_armor: GetAttackArmor,
	attack_all: GetAttackAll,
	attack_strength: GetAttackStrength,
	attack_agility: GetAttackAgility,
	attack_intellect: GetAttackIntellect,
	kill_attack: GetKillAttack,
	kill_health: GetKillHealth,
	kill_armor: GetKillArmor,
	kill_all: GetKillAll,
	kill_strength: GetKillStrength,
	kill_agility: GetKillAgility,
	kill_intellect: GetKillIntellect,
	respawn_time: GetRespawnTime,
	item_physical_damage: GetItemPhysicalDamage,
	item_physical_damage_2: GetItemPhysicalDamage2,
	item_magical_damage: GetItemMagicalDamage,
	item_magical_damage_2: GetItemMagicalDamage2,
	item_armor_ignore_pct: GetItemArmorIgnorePct,
	item_incoming_damage: GetItemIncomingDamage,
	item_damage_reduce_physical: GetItemDamageReducePhysical,
	item_damage_reduce_magical: GetItemDamageReduceMagical,
	item_damage_reduce: GetItemDamageReduce,
	item_damage_reduce_2: GetItemDamageReduce2,
	item_outgoing_damage: GetItemOutgoingDamage,
	item_outgoing_damage_2: GetItemOutgoingDamage2,
	item_magical_crit_chance: GetItemMagicalCritChance,
	item_magical_crit_damage: GetItemMagicalCritDamage,
	item_magical_crit_damage_2: GetItemMagicalCritDamage2,
	item_physical_crit_chance: GetItemPhysicalCritChance,
	item_physical_crit_damage: GetItemPhysicalCritDamage,
	item_physical_crit_damage_2: GetItemPhysicalCritDamage2,
	item_evasion: GetItemEvasion,
	item_cooldown_reduction: GetItemCooldownReduction,
	item_fishing_crit_chance: GetItemFishingCritChance,
	item_dig_crit_chance: GetItemDigCritChance,
	item_attack_armor_reduce_pct: GetItemAttackArmorReducePct,
	kill_gold_flat: GetKillGoldFlat,
	item_armor_per_min: GetItemArmorPerMin,
	base_strength: GetBaseStrength,
	base_agility: GetBaseAgility,
	base_intellect: GetBaseIntellect,
	strength_gain: GetStrengthGain,
	agility_gain: GetAgilityGain,
	intellect_gain: GetIntellectGain,
	base_health_regen: GetBaseHealthRegen,
	base_mana_regen: GetBaseManaRegen,
	base_attack_time: GetBaseAttackTime,
	base_attack_range: GetBaseAttackRange,
	base_evasion: GetBaseEvasion,
	item_intellect_per_min: GetItemIntellectPerMin,
};
