# 单位自定义状态

状态来源通过 `StateSystem` 统一管理，单位使用 `unit.HasState(StateEnum.XXX)` 查询。服务端实时计算，Lua 客户端和 Panorama 读取 `state_system/unit_<entindex>` 快照。原生眩晕、无敌、缴械等仍使用 modifier 的 `CheckState()`，单次攻击/伤害标记仍使用 `ATTACK_STATES` / `EOM_DAMAGE_FLAGS`。

## 优先级

- 保留雅典娜原版语义：优先级数值越大越优先，静态与动态来源共同排序。
- 明确的 `false` 可以覆盖低优先级的 `true`；只有 `undefined` 表示该动态来源当前不声明状态。
- 原版未明确同优先级的稳定次序；新系统固定为后登记者优先。刷新已有来源不改变其登记顺序。
- 默认优先级统一为 0。EOM modifier 将 `GetPriority()` 同时用于静态和动态状态，在刷新或叠层变化时更新。
- 每个 modifier 实例有独立的状态 sourceId；同名多实例不会互相覆盖或销毁对方的状态。

## 动态刷新和同步

`cache` 仅保存上次聚合结果，用于事件与发布比较，静态层与动态层不再共享读取缓存。`GetStateValue()` 每次执行最新条件；带参数的查询不会覆盖用于客户端同步的默认值。

服务端每 0.2 秒主动检查动态条件和函数形式的优先级，条件改变时发送 `state_changed` 并发布最新快照，不要求玩法提前查询。相同状态不重复发送事件或写网表。动态回调应当只读取条件，不在回调中修改状态或执行玩法动作。

`ClearDynamicStateCache()` 保留为兼容入口，立即重新检查对应动态状态。单位及来源清理会同步最终 false 或空实体快照，不把旧局状态带入下一局。

## 原版状态映射

| 原版名称 | StateEnum | 当前接入 |
|---|---|---|
| `EOM_MODIFIER_STATE_NO_HEALTH_BAR` | `NO_HEALTH_BAR` | 隐藏自定义血条。波次、野怪、原版血条标记保留引擎血条；通用 `modifier_no_health_bar` 只隐藏自定义血条；NPC 保持隐藏策略。 |
| `EOM_MODIFIER_STATE_CRITICAL_IMMUNE` | `CRITICAL_IMMUNE` | 目标免疫物理/魔法暴击，包括强制暴击。原版未发现提供者，不自动给单位添加该状态。 |
| `EOM_MODIFIER_STATE_ATTACK_PROJECTILE_DISABLED` | `ATTACK_PROJECTILE_DISABLED` | 阻止该攻击者发射普通攻击弹道，并发送 `attack_projectile_disabled`。不阻止技能弹道，不等同于目标的 `DODGE_BULLET`。 |
| `EOM_MODIFIER_STATE_DASH_DISABLE` | `DASH_DISABLE` | 预留，未新增冲锋玩法或默认提供者。 |
| `EOM_MODIFIER_STATE_TELEPORT_DISABLE` | `TELEPORT_DISABLE` | 预留，公共传送玩法移植时检查。 |
| `EOM_MODIFIER_STATE_FEAR` | `FEAR` | 野怪回营 AI 同时检查此标记与引擎 `IsFeared()`；保留两种状态的独立含义。 |

原版影魔技能写了未声明的 `EOM_MODIFIER_STATE_FEARED`，后续该技能移植时统一使用 `StateEnum.FEAR`。本次没有搬入尚未移植的英雄技能，也没有改动旧项目。

`HEALTH_BAR` 是当前框架的显示许可，由 `modifier_common` 提供。Panorama 的 `Entities.HasHealthBar()` 要求此许可为 true 且聚合后的 `NO_HEALTH_BAR` 为 false。高优先级 modifier 可明确返回 false 恢复自定义血条。血条 UI 本体仍由独立 UI 移植工作接入。

## Modifier 用法

```ts
StaticState() {
	return { [StateEnum.CRITICAL_IMMUNE]: true };
}

DynamicState() {
	return {
		[StateEnum.NO_HEALTH_BAR]: () => !this.GetParent().HasModifier("modifier_trial_buff"),
	};
}
```

EOM 自动管理创建、刷新、叠层和销毁；刷新后省略的字段会释放旧来源。原生 modifier 的 `CheckState()` 与这里的自定义状态分开声明。

修改共享枚举后运行 `npm.cmd run sync:enums`、`npm.cmd run build:polyfill`；服务端最终产物使用 `node node_scripts/build-vscripts.js --incremental false` 完整生成，避免增量缓存跳过曾经只做类型检查的文件。回归入口是 `npm.cmd run test:states`。

本轮 22 项状态检查通过，包含生产 StateSystem、EOM 注册器、NPC 查询、伤害入口、攻击弹道过滤器与 Panorama 状态读取；另有 101 项现有属性、对局、选人、任务、刷怪与图片资源检查通过。Lua 完整编译及客户端共享代码编译通过。Dota VConsole 当前未连接，实际引擎回调、多人客户端及血条表现尚未实测。
