# 原版自定义事件迁移

语义来源：`athena-reborn/game/athena_reborn/scripts/vscripts/modifiers/events.lua`、`modifier_events.lua` 及各发布点。事件复用当前 `Event` 注册表，不加载旧版 modifier_events，也不复制一套旧事件总线。

## 分发与生命周期

- 普通监听按优先级从大到小执行，默认 100；同级后注册先执行。普通注册与优先级注册混用仍遵循此规则。
- 一次分发使用快照：新监听下次参与；注销、按上下文注销、清空监听立即使快照内对应项失效。
- Once 在调用业务回调前注销，抛错或递归触发均只执行一次；回调和过滤器异常不阻断其他监听者。
- 原版单位事件使用 `FireUnit` 和 `UnitEventListener`：先来源，再目标，最后全局；各组内同级后注册先执行。原版没有 modifier 优先级排序。
- 来源和目标按实体引用精确匹配，同玩家的其他英雄/召唤物不自动通过。原版同时声明来源和目标的监听保留两次调用，不能全局去重。
- Modifier 与技能自动记录并在销毁时注销这些监听；刷新不重复注册。普通 `EventListener` 保留 C1 原有行为。

```ts
UnitEventListener(): Partial<UnitEventListenerMap> {
    return {
        valid_ability_executed: { source: event => this.OnValidCast(event) },
        cleave: { target: event => this.OnCleaveReceived(event) },
        tick_time: { global: event => this.OnTick(event) },
    };
}
```

普通模块也可用 `Event.RegisterUnit(eventName, callback, "source", unit, context)`；全局路由用 `"global"`。移植同一监听时只使用一个注册入口，避免同时登记到普通监听和单位监听。

## 十项自定义 modifier 事件

| 原版 | 当前事件 | 触发及参数 |
| --- | --- | --- |
| `ON_VALID_ABILITY_EXECUTED` | `valid_ability_executed` | common 的 `OnAbilityExecuted`；仅所属单位，排除物品、toggle、不触发魔棒的技能。传原始参数，来源 unit、目标 target。不附加冷却、被动技能判断，不改用 FULLY_CAST 阶段。 |
| `ON_CLEAVE` | `cleave` | 实际分裂结算后一次；传 attacker、主 target、center、radius、原始伤害乘分裂百分比、原查询 tTargets（含主目标）。来源 attacker、目标主 target；无分裂属性、法术、禁止分裂/禁止 proc 不发布。 |
| `ON_ABILITY_CHARGE_CHANGED` | `ability_charge_changed` | 自定义充能消耗、恢复及刷新归零实际变化时；传 unit、ability、charge、old_charge。先总线，再技能 `OnAbilityChargeChanged`，来源 unit；封顶恢复、零充能消耗失败不发布。 |
| `ON_REBORN` | `reborn` | 英雄再次出生时来源 unit，只传 unit；首次出生不触发。转生玩法尚未移植，后续层数实际变化时传 level，不从复活推算转生层数。 |
| `ON_TICK_TIME` | `tick_time` | `GameTime` 是唯一发布者，每局每秒发 tick_time=1，每 60 秒额外发 60；传 runId、tick。无来源/目标，仅全局。 |
| `ON_CRITICAL` | `crit_event` | 复用当前通知。非普攻物理/魔法暴击以 FireUnit 发布，来源 attacker、无目标；旧版全局/来源监听仅参与此路径。普攻或其他类型使用普通 Fire，现有 C1 订阅仍收到，旧版监听不触发。暴击免疫/NO_CRIT 阻止发布。 |
| `ON_ATTACK_PROJECTILE_DISABLED` | `attack_projectile_disabled` | 普通攻击弹道被攻击者状态阻止时；传 unit、可选 target，仅来源 unit（原版不向目标路由）。技能弹道不触发；没有有效目标也保留来源通知。 |
| `ON_ITEM_DEVOURED` | `item_devoured` | 接口预留；吞噬玩法尚未移植。成功、属性刷新后发布，来源 unit，不能用 item_consumed 代替。后续保留总线通知先于物品 OnDevoured。 |
| `ON_SCEPTER_LEVELUP` | `scepter_levelup` | 接口预留，原版未发此总线事件。实际专属装备对技能的 OnScepterLevelup 直接回调应随玩法迁移，不能用空事件替代。 |
| `ON_ATTACK_START_CUSTOM` | `attack_start_custom` | 接口预留，原版没有有效发布者/消费者。不自动绑定 pre_attack_event/attack_event。 |

## 公共时钟与重复结算

`GameTime` 通过 CModule/Event 接入 game_start/game_end/game_reset，仅持有一个本局计时器；重复开始和热重载不再开时钟。结束后停止，旧局回调和旧 reset 不影响新局。第 60 秒先秒通知，再分钟通知；秒通知中结束本局会取消分钟通知。

`UnitAttributes` 删除直接增长计时器，消费公共 tick_time；秒/分钟分别记录已消费 tick，重复或旧局通知不会重复成长。击杀由 `game.OnEntityKilled` 接收原生死亡并唯一发布，自定义伤害的 `Kill()` 路径不再补发同一事件；成长和任务的已有去重保护继续保留。不能另外恢复旧 modifier_attribute 的定时成长监听。

## 全局自定义事件

- `custom_npc_first_spawned`、`custom_round_state_change` 已分别接到 `npc_first_spawned`、`round_state_change`，不新增重复别名。
- `custom_time_event` 与 modifier tick 统一为唯一 `tick_time`。原版练功房尚未移植，后续订阅同一时钟。
- `custom_entity_removed` 已有引擎 GameEvent 通知，保留该入口，不新增可能与 UpdateOnRemove 重复的结算通知。
- 经验和传送沿用已预留的 `hero_gain_exp`、`teleport`；首次连接/重连与背包变化预留 `player_first_spawned`、`player_reconnect`、`inventory_contents_changed`。没有对应玩法消费者时不制造发布点。
- Panorama 的 UI 请求、热更新通知、地图触发器继续走各自现有通道，不与 modifier 总线混合。

## 验证

- `npm run test:events`：执行生产 TS Event、EOM 生命周期、common、伤害、充能覆盖和公共时钟。
- `npm run test:migration`：覆盖整体复核的八项修复、状态原子刷新，以及明确保留的静态属性省略字段限制。
- `npm run test:properties`、`npm run test:states`：复核既有成长、伤害和状态边界，公共 fixture 使用实际 Event。
- `node node_scripts/build-vscripts.js --incremental false`：完整生成 Lua，避免 noEmit 的增量记录导致漏写产物。
- `node_scripts/test-event-system.lua`：用 Lua 5.3 兼容运行时验证实际生成 Lua，覆盖优先级数值 0、分发中注销、Once 抛错/递归、单位路由与上下文。
- 本地 Lua 验证运行时安装在忽略目录 `.local/lua-runtime`，命令：`node .local/lua-runtime/node_modules/fengari-node-cli/src/lua-cli.js node_scripts/test-event-system.lua`。
- 同一运行时执行 `node_scripts/test-migration-regressions.lua`，验证动态默认快照和状态切换在生成 Lua 中同样生效。

这些检查不代替 Dota 实机的引擎施法回调、弹道和连续对局验收。
