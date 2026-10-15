local __TSTL_FILE_PATH__ = "framework/constant"
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 5,["8"] = 6,["9"] = 7,["10"] = 8,["11"] = 9,["12"] = 11,["15"] = 16,["17"] = 18,["19"] = 21,["20"] = 23,["21"] = 24,["22"] = 26,["23"] = 28,["24"] = 30,["25"] = 31,["27"] = 32,["28"] = 32,["29"] = 33,["30"] = 32,["34"] = 37,["36"] = 39,["37"] = 39,["38"] = 39,["39"] = 39,["40"] = 39,["41"] = 39,["42"] = 39,["43"] = 39,["44"] = 39,["46"] = 42,["47"] = 44,["49"] = 51,["50"] = 51,["51"] = 51,["52"] = 51,["53"] = 51,["54"] = 51,["55"] = 51,["57"] = 60,["58"] = 67,["59"] = 67,["60"] = 67,["61"] = 67,["62"] = 67,["63"] = 67,["64"] = 67,["66"] = 75,["68"] = 77,["70"] = 80,["72"] = 83,["74"] = 85,["75"] = 88,["76"] = 89,["78"] = 92,["79"] = 92,["80"] = 92,["81"] = 92,["82"] = 92,["83"] = 92,["84"] = 92,["85"] = 92,["87"] = 101,["88"] = 101,["89"] = 101,["90"] = 101,["91"] = 101,["92"] = 101,["93"] = 101,["94"] = 101,["96"] = 110,["97"] = 110,["98"] = 110,["99"] = 110,["100"] = 110,["101"] = 110,["102"] = 110,["103"] = 110,["105"] = 120,["107"] = 122,["109"] = 124,["111"] = 126,["113"] = 128,["115"] = 130,["117"] = 132,["119"] = 134,["121"] = 136,["123"] = 138,["125"] = 140,["127"] = 142,["129"] = 144,["131"] = 146,["133"] = 148,["135"] = 150,["137"] = 152,["139"] = 154,["141"] = 156,["143"] = 158,["145"] = 160,["147"] = 162,["149"] = 164,["151"] = 166,["153"] = 168,["155"] = 170,["157"] = 172,["159"] = 174,["161"] = 176,["163"] = 178,["165"] = 180,["167"] = 182,["169"] = 184,["171"] = 186,["173"] = 188,["175"] = 192,["177"] = 194,["179"] = 196,["181"] = 198,["183"] = 200,["185"] = 203,["186"] = 203,["187"] = 203,["188"] = 203,["189"] = 203,["190"] = 203,["191"] = 203,["192"] = 203,["193"] = 203,["194"] = 203,["195"] = 203,["196"] = 203,["197"] = 203,["198"] = 203,["200"] = 218,["201"] = 218,["202"] = 218,["203"] = 218,["204"] = 218,["205"] = 218,["206"] = 218,["207"] = 218,["209"] = 228,["210"] = 232,["211"] = 233,["212"] = 234,["213"] = 235,["214"] = 236,["216"] = 242,["217"] = 243,["218"] = 244,["219"] = 245,["220"] = 246,["245"] = 274,["246"] = 274,["247"] = 274,["248"] = 274,["249"] = 274,["250"] = 274,["251"] = 274,["252"] = 274,["253"] = 274,["254"] = 274,["255"] = 274,["256"] = 274,["257"] = 274,["258"] = 274,["259"] = 274,["260"] = 274,["261"] = 274,["263"] = 293,["264"] = 293,["265"] = 293,["266"] = 293,["267"] = 293,["268"] = 293,["269"] = 293,["270"] = 293,["271"] = 293,["272"] = 293,["273"] = 293,["274"] = 293,["275"] = 293,["276"] = 293,["277"] = 293,["279"] = 311,["280"] = 313,["281"] = 313,["282"] = 313,["283"] = 313,["284"] = 313,["285"] = 313,["286"] = 313,["287"] = 313,["288"] = 311,["289"] = 311,["290"] = 311,["291"] = 311,["292"] = 311,["293"] = 311,["295"] = 358,["296"] = 358,["297"] = 358,["298"] = 358,["299"] = 358,["300"] = 358,["301"] = 358,["302"] = 358,["303"] = 358,["304"] = 358,["306"] = 378,["308"] = 380,["310"] = 382,["312"] = 384,["314"] = 386,["316"] = 389,["318"] = 392,["320"] = 395});
---
-- @VscriptsOnly
vec3_zero = Vector(0, 0, 0)
vec3_left = Vector(-1, 0, 0)
vec3_right = Vector(1, 0, 0)
vec3_top = Vector(0, 1, 0)
vec3_bottom = Vector(0, -1, 0)
vec3_invalid = Vector(3.402823466e+38, 3.402823466e+38, 3.402823466e+38)
---
-- @Both
AI_TIMER_TICK_TIME = 0.15
--- 暂停冷却
CUSTOM_PAUSE_CD = 60
--- 网格大小
GRID_SIZE = 384
MINIMUM_ATTACK_SPEED = 20
MAXIMUM_ATTACK_SPEED = 600
BULLET_WIDTH = 32
INTERACT_RADIUS = 200
HERO_MAX_LEVEL = 30
HERO_XP_PER_LEVEL_TABLE = {}
do
    local index = 0
    while index < 30 do
        HERO_XP_PER_LEVEL_TABLE[#HERO_XP_PER_LEVEL_TABLE + 1] = 75 * index + 50 * index * index
        index = index + 1
    end
end
--- 复活次数
HERO_RESPAWN_COUNT = 0
--- 酒馆商店物品Key
TAVERN_ITEMS = {
    "item_whisky",
    "item_beer",
    "item_rum",
    "item_tequila",
    "item_champagne",
    "item_gin",
    "item_wine"
}
--- 最大祝福类型数量数量（不包括风）
MAX_BLESS_TYPE_COUNT = 3
BLESS_RARITY_WEIGHT = {[1] = 60, [2] = 25, [3] = 10, [4] = 5}
--- 稀有度价格表
SHOP_RARITY_COST = {
    [1] = 50,
    [2] = 100,
    [3] = 150,
    [4] = 200,
    [5] = 250
}
--- 套装经验
SUIT_EXP = {[1] = 4, [2] = 8, [3] = 16, [4] = 32}
ARTIFACT_RARITY_WEIGHT = {
    [1] = 60,
    [2] = 25,
    [3] = 10,
    [4] = 5,
    [5] = 1
}
--- %基础背刺伤害
BASE_BACKSTAB_DAMAGE = 25
--- 陷阱伤害系数，生命百分比
TRAP_DAMAGE_FACTOR = 0.2
--- 伤害/防御强度 百分比
INTENSITY_FACTOR = 0.1
--- 钥匙每点强度提供的怪物生命额外乘区
DIFFICULTY_KEY_HEALTH_FACTOR_PER_INTENSITY = 0.052
--- 钥匙每点强度提供的怪物攻击额外乘区
DIFFICULTY_KEY_DAMAGE_FACTOR_PER_INTENSITY = 0.005
COOLDOWN_REDUCTION_RATE = 0.005
COOLDOWN_REDUCTION_CAP = 0.8
--- 难度对应的Boss冷却缩减（负值=增加冷却时间），key为难度等级
DIFFICULTY_COOLDOWN_REDUCTION = {
    [1] = -60,
    [2] = -50,
    [3] = -40,
    [4] = -30,
    [5] = -20,
    [6] = -10
}
--- 难度对应的Boss技能间隔增幅，key为难度等级
DIFFICULTY_BOSS_GAP_AMPLIFY = {
    [1] = 80,
    [2] = 60,
    [3] = 45,
    [4] = 30,
    [5] = 15,
    [6] = 5
}
--- 难度对应的陷阱伤害
DIFFICULTY_TRAP_DAMAGE_REDUCTION = {
    [1] = -90,
    [2] = -80,
    [3] = -70,
    [4] = -60,
    [5] = -40,
    [6] = -20
}
--- 触电伤害百分比
EXPOSE_DAMAGE_PCT = 25
--- 飞剑伤害
SWORD_DAMAGE = 24
--- 剑意每层提升
SWORD_INTENT_PCT_PER_STACK = 20
--- 剑意最大层数
SWORD_INTENT_MAX_STACK = 5
--- 护盾每秒衰减比例
SHIELD_DECAY_RATE = 30
--- 护盾每秒衰减最低值，生命上限系数
SHIELD_DECAY_MIN = 0.05
--- 护盾衰减间隔（秒）
SHIELD_DECAY_INTERVAL = 1
--- 中毒每秒衰减比例
POISON_DECAY_RATE = 30
--- 中毒衰减间隔（秒）
POISON_DECAY_INTERVAL = 1
--- 冰冻每秒衰减比例
FROZEN_DECAY_RATE = 30
--- 冰冻衰减间隔（秒）
FROZEN_DECAY_INTERVAL = 2
--- 冰冻增伤曲线最大值（%）
FROZEN_DAMAGE_AMPLIFY_MAX = 30
--- 冰冻增伤达到一半收益时的层数
FROZEN_DAMAGE_AMPLIFY_HALF_STACK = 50
--- 毒瓶最大数量
POISON_BOTTLE_MAX_COUNT = 5
--- 虚弱减少伤害
WEAK_REDUCE_DAMAGE_PCT = 1
--- 虚弱最大层数
WEAK_MAX_STACK = 25
--- 虚弱最大层数
WEAK_DURATION = 5
--- 斩杀线最大生命值%
EXECUTE_THRESHOLD_MAX_HEALTH = 20
--- 流血基础伤害次数
BLEED_DAMAGE_COUNT = 2
--- 流血基础伤害间隔
BLEED_DAMAGE_INTERVAL = 1
--- 流血移动额外伤害距离阈值
BLEED_MOVE_DAMAGE_DISTANCE_THRESHOLD = 100
--- 流血移动额外伤害内置冷却
BLEED_MOVE_DAMAGE_COOLDOWN = 0.25
--- 流血移动额外伤害百分比
BLEED_MOVE_DAMAGE_PCT = 40
--- 反击冷却
COUNTER_CD = 0.3
--- 暴击飞剑冷却
CRIT_CALL_BLADE_CD = 0.3
--- 健康血量
HEALTHY_PCT = 80
--- 残血血量
LOW_HEALTH_PCT = 20
--- 近距离
CLOSE_RANGE = 250
--- 远距离
FAR_RANGE = 850
--- 激光长度
LASER_LENGTH = 600
--- 激光宽度
LASER_WIDTH = 100
--- 天罚伤害
PUNISHMENT_DAMAGE = 30
--- 洗礼
PURIFY_DAMAGE = 48
--- 洗礼范围
PURIFY_RADIUS = 300
--- 霜冻印记伤害
ICE_MARK_DAMAGE = 24
--- 许愿池每次消耗
WISHING_POOL_COST = 10
--- 商店刷新基础消耗
SHOP_REFRESH_BASE_COST = 50
--- 商店刷新每次递增消耗
SHOP_REFRESH_COST_INCREMENT = 10
--- 祝福选择放弃获得金币
BLESS_GIVEUP_REWARD = 10
--- 祝福选择放弃获得金币稀有度
BLESS_GIVEUP_RARITY_REWARD = 5
--- 默认键盘按键设置
DEFAULT_KEYBOARD_BINDINGS = {
    [KeyFunction.Up] = "W",
    [KeyFunction.Down] = "S",
    [KeyFunction.Left] = "A",
    [KeyFunction.Right] = "D",
    [KeyFunction.Skill] = "MOUSE1",
    [KeyFunction.Dodge] = "SPACE",
    [KeyFunction.Defense] = "SHIFT",
    [KeyFunction.Ultimate] = "R",
    [KeyFunction.Attack] = "MOUSE0",
    [KeyFunction.Interact] = "E",
    [KeyFunction.Attribute] = "`",
    [KeyFunction.Upgrade] = "Q"
}
--- Mode2 (左键移动) 默认键位
DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK = __TS__ObjectAssign({}, DEFAULT_KEYBOARD_BINDINGS, {
    [KeyFunction.Skill] = "Q",
    [KeyFunction.Dodge] = "W",
    [KeyFunction.Defense] = "E",
    [KeyFunction.Ultimate] = "R",
    [KeyFunction.Attack] = "MOUSE1",
    [KeyFunction.Interact] = "F"
})
--- Mode3 (右键移动) 默认键位
DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK = __TS__ObjectAssign({}, DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK, {[KeyFunction.Attack] = "MOUSE0"})
MOVE_MODE_KEYBOARD = "keyboard"
MOVE_MODE_LEFT_CLICK = "left_click"
MOVE_MODE_RIGHT_CLICK = "right_click"
DEFAULT_MOVE_MODE = MOVE_MODE_RIGHT_CLICK
MOVE_MODE_DEFAULTS = {[MOVE_MODE_KEYBOARD] = DEFAULT_KEYBOARD_BINDINGS, [MOVE_MODE_LEFT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK, [MOVE_MODE_RIGHT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK}
--- 点击移动子模式
CLICK_MOVE_MODE_CLICK = "click"
CLICK_MOVE_MODE_HOLD = "hold"
CLICK_MOVE_MODE_FOLLOW = "follow"
DEFAULT_CLICK_MOVE_MODE = CLICK_MOVE_MODE_HOLD
DEFAULT_CAMERA_FOLLOW_MODE = "free"
--- joy5:		左肩键
-- joy6:		右肩键
-- joy7:		切换键
-- joy8:		菜单键
-- joy9:		左摇杆按下
-- joy10:		右摇杆按下
-- joy1:		A键(下)
-- joy2:		B键(右)
-- joy4:		Y键(上)
-- joy3:		X键(左)
-- z_axis_pos:	左扳机
-- y_axis_pos:	右扳机
-- pov_left:	十字方向键 - 左
-- pov_right:	十字方向键 - 右
-- pov_up:		十字方向键 - 上
-- pov_down:	十字方向键 - 下
-- x_axis_neg:	左摇杆 - 左
-- x_axis_pos:	左摇杆 - 右
-- y_axis_neg:	左摇杆 - 上
-- y_axis_pos:	左摇杆 - 下
-- r_axis_neg:	右摇杆 - 左
-- r_axis_pos:	右摇杆 - 右
-- u_axis_neg:	右摇杆 - 上
-- u_axis_pos:	右摇杆 - 下
DEFAULT_GAMEPAD_BINDINGS = {
    [KeyFunction.Up] = "y_axis_neg",
    [KeyFunction.Down] = "y_axis_pos",
    [KeyFunction.Left] = "x_axis_neg",
    [KeyFunction.Right] = "x_axis_pos",
    [KeyFunction.Skill] = "v_axis_pos",
    [KeyFunction.Dodge] = "joy1",
    [KeyFunction.Defense] = "joy4",
    [KeyFunction.Ultimate] = "joy2",
    [KeyFunction.Attack] = "joy3",
    [KeyFunction.Interact] = "joy5",
    [KeyFunction.Upgrade] = "joy7",
    [KeyFunction.OptionUp] = "pov_up",
    [KeyFunction.OptionDown] = "pov_down",
    [KeyFunction.OptionConfirm] = "joy10",
    [KeyFunction.ToggleAutoCast] = "joy9"
}
--- 任务类型枚举（前端更新的任务类型，event_id=24）
SERVICE_TASK_TYPE = SERVICE_TASK_TYPE or ({})
SERVICE_TASK_TYPE.TrapClearEnemy = 1
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.TrapClearEnemy] = "TrapClearEnemy"
SERVICE_TASK_TYPE.Fishing = 2
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.Fishing] = "Fishing"
SERVICE_TASK_TYPE.ActivateAllBlessings = 3
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.ActivateAllBlessings] = "ActivateAllBlessings"
SERVICE_TASK_TYPE.KillEnemy = 4
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.KillEnemy] = "KillEnemy"
SERVICE_TASK_TYPE.ShopItemPurchase = 5
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.ShopItemPurchase] = "ShopItemPurchase"
SERVICE_TASK_TYPE.AddItem = 6
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.AddItem] = "AddItem"
SERVICE_TASK_TYPE.Die = 7
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.Die] = "Die"
--- 深渊玩法配置
ABYSS_CONFIG = {
    base = {
        NeedDungeonDiff = 5,
        timeLimit = 600,
        initialEnemyCount = 10,
        flashEnemyHealthPct = 400,
        flashEnemyAttackPct = 30,
        flashEnemyModelScale = 100,
        autoPickupRadius = 200
    },
    spawn = {maxAliveEnemyCount = 60, minDistanceFromPlayer = 10},
    event = {initialTriggerCount = 20, triggerCountIncrease = 5, maxTriggerCount = 60},
    kill = {baseScore = 1},
    ui = {devourUnlock = 1}
}
--- 连击系统配置
COMBO_CONFIG = {
    initialMultiplier = 1,
    minMultiplier = 1,
    maxMultiplier = 10,
    multiplierIncreaseEveryCount = 4,
    multiplierIncreaseValue = 0.1,
    multiplierDecreaseValue = 0.1,
    comboCountdownDuration = 10,
    scoreRoundingMode = "floor"
}
--- Boss挑战时间
BOSS_MAX_TIME = 300
--- Boss缩圈初始范围
BOSS_SHRINK_START_RADIUS = 3000
--- Boss缩圈每秒减少范围
BOSS_SHRINK_RADIUS_PER_SECOND = 60
--- Boss缩圈百分比伤害
BOSS_SHRINK_OUTSIDE_DAMAGE_PCT = 5
--- Boss缩圈伤害tick
BOSS_SHRINK_TICK_INTERVAL = 1
--- 最大难度
MAX_DIFFICULTY = 15
--- 最大装备数量
EQUIP_MAX_COUNT = 400
--- 商店物品数量
SHOP_ITEM_COUNT = 5
