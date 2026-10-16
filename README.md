# Dota 2 Custom Game - athena_tsbuild

## 项目起点

本项目从 `lonely_cannon` 的根提交 `4741a125753f53f4c6f8c58bbd1db28817c66f48`（框架清理）创建，已统一项目名称与路径、复制雅典娜 KV 和地图，并接入可重复开局的生命周期及基础波次调度。原版技能、AI、掉落与奖励等玩法仍需继续迁移。

同时合入其后续提交 `83b467b9445f8c597e7b991a88cca8ef6f9f55e6`：清理 c1 残留的命令、文案与资源引用，恢复伤害数字粒子及贴图；其中的 addon 名称已适配为 `athena_tsbuild`。

- 项目标识：`athena_tsbuild`
- 工作目录：`D:\Dota Addons\athena_tsbuild`
- 服务端源码：`content/athena_tsbuild/scripts/vscripts`
- Lua 输出：`game/athena_tsbuild/scripts/vscripts`
- Panorama 源码：`src`

UI 输出沿用入口原名，例如 `hud_demo.xml`、`hud_demo.js`、`hud_demo.css`。HUD、FlyoutScoreboard 和其他 UI 资源的文件名不附加项目名，`custom_ui_manifest.xml` 直接引用对应 XML 原名。

UI 图片检查覆盖全局/组件 CSS、XML 静态 `Image` 和内联样式。`pnpm run dev:solid` 持续监听，`pnpm run build:solid:dev` 一次性开发构建：缺失的自定义图片在产物中降级为 `none` 或现有的红叉占位图，检查器不改原始 LESS/XML；补齐图片后监听会自动恢复引用。检查同时识别 `file://{images}/custom_game/`、`file://{resources}/images/custom_game/` 和自定义 `s2r://` 纹理，以及源码图片或已有编译纹理。只有编译纹理时会规范化为 `s2r://` 引用。Dota 内置图片不按项目本地文件校验；内置图片应使用有效的引擎资源 URI，避免引用游戏未提供的原始 PNG。

复合图片声明缺少任意资源时整条降级为单个 `none`，资源完整的多重背景保持不变。不要逐张生成 `none, none` 或 `url(...), none`：资源编译器可能放行，但 Panorama 运行时会拒绝这种属性值。

`pnpm run build:solid` 为严格构建，缺图时退出失败并保留上次可用的 XML/CSS。完整缺图清单位于 `node_modules/.cache/panorama/missing-images.json`，包含生成文件、行号、原始 URL 和降级方式。`pnpm run test:ui-assets` 验证资源判断、降级、严格模式和补图后的自动恢复。修改 Rollup 编译器代码后需重新启动 UI 监听。

初始化已验证：VScripts 类型检查、Lua 输出构建和 Solid UI 首轮编译。一次性构建 VScripts 可运行 `node node_scripts/build-vscripts.js`；持续开发使用下文的现有脚本。

继承的 Source 2 已编译资源保留原始依赖元数据，部分仍记录旧 addon 的源路径；后续在 Dota 工坊工具中重新编译资源时生成新元数据。本次未进行 Dota 实机运行验证。

## 雅典娜 KV 配置

配置复制自 `D:\Dota Addons\athena-reborn\game\athena_reborn\scripts`，保留原版 `npc/kv` 目录及 `#base` 引用：40 个 `.kv` 文件、6 个 NPC `.txt` 入口或列表，以及 `shops.txt`。

后续直接编辑 `game/athena_tsbuild/scripts/npc/kv/**/*.kv`、`npc/*.txt` 和 `scripts/shops.txt`，不使用原版 Excel 导出流程。原版 `kv_js_config.txt` 属于旧 KV 转 JS 工具配置，未复制；本项目继续使用现有 Rollup KV 插件。

`npc/npc_abilities_custom.txt` 额外引用 `npc/framework/abilities.kv`，保留新框架初始化所需的 `client_ability`。配置中的原版 `ScriptFile` 和资源路径保持原样；技能脚本、其他资源及剩余 gameplay 表仍需逐步迁移，复制配置不代表全量玩法完成。

## 雅典娜地图

地图分为 `solo` 和 `team`：源文件分别为 `content/athena_tsbuild/maps/solo.vmap`、`team.vmap`，编译文件分别为 `game/athena_tsbuild/maps/solo.vpk`、`team.vpk`，替换原有 `main` 地图。两张地图共用 `guarding_athena` 小地图材质和贴图，各自使用同名的 overview 描述；同时保留地图直接引用的自定义粒子及其子粒子（共 16 个粒子的源文件和编译文件）。

`game/athena_tsbuild/addoninfo.txt` 已登记 `solo`（1 人）和 `team`（1–4 人）。地图源文件和编译文件已由用户更新；本次检查文件存在及 VPK 目录结构，未进行 Dota 加载验证。原版地图触发器和玩法逻辑需在后续脚本迁移时接入。


基于 Solid.js 和 TypeScript 的 Dota 2 自定义游戏项目，使用现代化的前端技术栈开发 Panorama UI。

## 🚀 快速开始

### 重复开局流程

会话启动一次 `CModule.initialize()`，等待登录完成及引擎进入运行阶段后执行：

`Login → Prepare → DiffSelection → RunInit → Battle → Settle → Reset → Prepare ...`

- `Prepare`：每局进入选人界面立即开始 30 秒倒计时，同时选择英雄和 1–5 难度；到时为未确认的在线玩家随机选择可见英雄，保留已确认英雄和难度票，然后锁定本局参战名单。重开同样重新计时；锁定后加入者下一局再参与。
- `DiffSelection`：立即结算难度票，不额外等待。未选择默认 2，多数票决定，同票取较低值。
- `RunInit`：新建英雄和雅典娜基地，按 KV 初始化基础生命、攻击、魔法与护甲；初始金币沿用原版 300/200/100/0/0。初始化失败进入错误结算。
- `Battle`：按 `npc/kv/gameplay/round.kv` 与 `spawner_group.kv` 执行普通波次，内部循环备战、刷怪和波次结束；当前基础适配器命令怪物攻击基地。原版英雄技能、特殊刷怪、成长、掉落、奖励及难度数值缩放尚未迁移。
- `Settle`：基地死亡、最终首领死亡、全部波次完成或确认放弃，冻结本局结果并发送一次 `game_end`，不调用 `SetGameWinner` 终止承载会话。未接入真实奖励或后端结算，不会虚构发奖成功。
- `Reset`：停止旧阶段资源，释放本局实体、弹道和注册的释放函数，清空局内属性/状态/升级/统计数据与网表，替换为待命英雄并重建单位索引。保留登录与账号数据；清理失败留在本阶段，玩家可以重试。

放弃和再开需要当前在线参战玩家全部确认，投票使用不受暂停影响的 30 秒时限；拒绝、超时或投票成员掉线会取消。重开仍在当前 solo/team 地图内；阶段操作携带 `run_id` 和 `state_version`，旧局请求失效。暂停只在战斗阶段开启，结算时解除暂停。

代码接口：`class/run_session.ts` 管理纯规则，`framework/game_state.ts` 管理转换与请求校验，`mechanics/athena_run_world.ts` 管理世界资源，`class/round_runner.ts` 管理波次。新增阶段的计时器、引擎事件和内部事件应通过 `CGameStateBase.StartThink/Listen/Register` 持有；异步创建单位使用 `GameState.GetWorld().TrackUnit(unit, runId)`，掉落/粒子等资源用 `Own(runId, cleanup)` 绑定幂等释放函数。不要通过重复初始化模块或全局 `CModule.reset()` 重开。以后接入后端时，对局键需包含引擎会话标识与 `run_id`，正常结束和主动放弃都应通过同一终局入口结算。

运行 `pnpm run test:session` 验证规则、实际控制器/阶段和世界适配器在虚拟引擎中的行为；它不替代 Dota 实机验收。工坊工具模式可用 `athena_run_result victory` / `athena_run_result defeat` 手动结束当前战斗验证重开，不在正式环境注册这些命令。Dota 验收需分别验证 solo/team 连续三局、基地死亡、断线投票、属性同步和原版资源缺失情况。

### 英雄选择 UI

`hud_main` 在每局 `Prepare` / `DiffSelection` 挂载从 reborn 移植的英雄选择页面，保留原版样式与文本、玩家头像和等级徽章、五档难度、英雄动画卡片、模型与技能预览。玩家等级沿用原版 `service.player_<id>.Score / 10` 向下取整，尚无数据时显示原版默认等级 1。选英雄前即可投难度，确认英雄后锁定选择按钮；选人、确认与难度操作使用现有 `athena_game_action`，状态以服务端网表为准。重新准备后可再次选人，不使用原版仅首次生效的引擎 HeroSelection 页面或旧事件。

页面附带原版背景视频、栏位默认图、83 张技能图标及相关中英文英雄/技能提示文本。精简 KV 中缺少的引擎 HeroID 仅通过预览映射补足，不修改玩法配置。宠物、皮肤和特效栏暂不可操作，库存、解锁与装备后端尚未接入；英雄库存解锁规则也尚未接入，可选名单沿用当前框架。`pnpm run test:hero-selection` 验证交互、阶段权限、预览资源和第二局恢复；实际模型、视频及布局仍需 Dota 内验收。

### 前置要求

- **Node.js**: v18.12 或更高版本
- **pnpm**: 推荐使用 pnpm 作为包管理器
- **Dota 2**: 已安装 Dota 2 工坊工具

### 安装步骤

#### 1. 安装依赖

```bash
pnpm install
```

#### 2. 生成配置文件

首次运行项目前，需要生成 TypeScript 配置文件和 VScripts 配置模块：

```bash
pnpm run generate:config
```

此命令会自动生成：
- `src/tsconfig.json` - Panorama UI 的 TypeScript 配置
- `content/athena_tsbuild/scripts/vscripts/tsconfig.json` - VScripts 的 TypeScript 配置
- `content/athena_tsbuild/scripts/vscripts/_config.ts` - 项目常量配置模块

#### 3. 启动开发模式

**方式一：同时启动 UI 和 VScripts 开发**

```bash
pnpm run dev:solid
pnpm run dev:vscripts
```

在两个终端分别运行以上命令，或者使用 VS Code 的任务运行器运行 `$(wrench) 开发` 任务。

**方式二：单独启动**

仅开发 Panorama UI：
```bash
pnpm run dev:solid
```

仅开发 VScripts：
```bash
pnpm run dev:vscripts
```

## 📦 项目结构

```
athena_tsbuild/
├── src/                          # 前端源代码
│   ├── ui/                       # Panorama UI 组件
│   │   ├── hud_main/            # 主 HUD 界面
│   │   ├── hud_menu_bar/        # 菜单栏
│   │   ├── hud_setting/         # 设置界面
│   │   └── custom_loading_screen/ # 自定义加载画面
│   ├── components/              # 可复用 UI 组件
│   │   └── EOMDesign/           # EOM 设计系统组件库
│   ├── polyfill/                # Panorama 兼容性补丁
│   └── declarations/            # TypeScript 类型定义
├── content/athena_tsbuild/                  # 内容目录（编译输出）
│   ├── panorama/                # Panorama UI 编译输出
│   └── scripts/vscripts/        # VScripts TypeScript 源代码
├── game/athena_tsbuild/                     # 游戏目录
│   └── scripts/vscripts/        # VScripts 编译后的 Lua 文件
├── rollup/                      # 构建系统配置
└── node_scripts/                # Node.js 构建脚本
```

## 🛠️ 可用命令

### 开发命令

| 命令 | 说明 |
|------|------|
| `pnpm run dev:solid` | 启动 Panorama UI 开发模式（watch） |
| `pnpm run dev:vscripts` | 启动 VScripts 开发模式（watch + 自动清理） |
| `pnpm run dev:vscripts:basic` | VScripts 开发模式（仅 watch，不清理） |

### 构建命令

| 命令 | 说明 |
|------|------|
| `pnpm run generate:config` | 生成 TypeScript 配置文件 |
| `pnpm run generate:image -- --prompt "一只可爱的动物"` | 通过 APIMart 生成图片并下载到 imagegen/ |
| `pnpm run generate:precache` | 生成预缓存文件 |
| `pnpm run generate:properties` | 从 properties.kv 生成 properties.ts |
| `pnpm run encrypt:vscripts` | 加密 VScripts Lua 文件（AES） |
| `pnpm run clean:images` | 清理未使用的图片资源 |

### APIMart 图片生成

生成图片前，先在本机环境变量里设置 `APIMART_API_KEY`。PowerShell 示例：

```powershell
$env:APIMART_API_KEY = "你的 APIMart Key"
```

然后执行：

```bash
pnpm run generate:image -- --prompt "一张可爱的治愈系插画"
```

默认模型为 `gpt-image-2`，默认输出目录为 `imagegen/`。可选参数包括 `--model`、`--size`、`--resolution`、`--n`、`--out-dir` 和 `--prefix`。

## 🎯 开发工作流

### 添加新的 UI 组件

1. 在 `package.json` 的 `panorama` 部分添加组件名称
2. 创建组件文件：
   ```
   src/ui/{type}/{name}/
   ├── {name}.tsx    # Solid.js 组件
   ├── {name}.less   # 样式文件
   └── {name}.xml    # 布局文件（可选，会自动生成）
   ```
3. 运行 `pnpm run dev:solid` 查看效果

### 编写 VScripts

1. 在 `content/athena_tsbuild/scripts/vscripts/` 目录下编写 TypeScript 代码
2. 使用项目配置模块：
   ```typescript
   import { ADDON_NAME, GetDebugTag } from "./_config";
   ```
3. 运行 `pnpm run dev:vscripts` 自动编译为 Lua

### 使用可复用组件

项目内置 EOM 设计系统组件库，位于 `src/components/EOMDesign/`：

```typescript
import { EOM_Button } from "@common/components/EOMDesign/Input/EOM_Button/EOM_Button";

// 使用组件
<EOM_Button color="Purple" onClick={() => console.log("clicked")}>
  点击我
</EOM_Button>
```

## 📝 重要提示

### Panorama CSS 限制

Dota 2 Panorama 引擎不支持 CSS 简写属性，必须使用完整属性名：

```less
/* ❌ 错误 - 不支持简写 */
transition: all 0.3s ease;

/* ✅ 正确 - 使用完整属性 */
transition-property: all;
transition-duration: 0.3s;
transition-timing-function: ease;
```

### 动态路径配置

项目所有路径基于 `package.json` 的 `name` 字段动态生成。修改项目名称时：
1. 更新 `package.json` 中的 `name`
2. 运行 `pnpm run generate:config`
3. 重新构建项目

### 首次运行检查清单

- [ ] 安装依赖：`pnpm install`
- [ ] 生成配置：`pnpm run generate:config`
- [ ] 启动 UI 开发：`pnpm run dev:solid`
- [ ] 启动 VScripts 开发：`pnpm run dev:vscripts`
- [ ] 在 Dota 2 工坊工具中加载自定义游戏

## 📚 更多文档

- [动态路径系统说明](docs/DYNAMIC_PATHS.md)
- [VScripts 配置模块](docs/VSCRIPTS_CONFIG.md)
- [Panorama CSS 指南](docs/PANORAMA_CSS_GUIDE.md)
- [网络通信指南](docs/NETTABLE_GUIDE.md)

## 🔧 技术栈

- **UI 框架**: Solid.js (自定义 Panorama 运行时)
- **语言**: TypeScript
- **样式**: LESS
- **VScripts**: TypeScript → Lua (TypeScript-to-Lua)
- **构建工具**: Rollup + Babel
- **包管理**: pnpm

## ⚡ 性能优化

- 代码分割：common、libs 自动分离
- 按需加载：组件按类型拆分（HUD、Tooltip、ContextMenu）
- Polyfill 合并：统一加载兼容性补丁
- VScripts 加密：支持 AES 加密保护代码

---


## UI层级
- hud的z-index从0到9
优先级从高到低的顺序
- [1001]context_menus: 右键菜单
- [1000]hud_demo: debug工具，应该放置在最高层级
- [100]hud_login: 登录界面
<!-- 弹窗提示 -->
- [81]hud_message: 局外道具通知
- [80]popups: 弹窗
<!-- 功能窗口 -->
- [61]hud_menu_bar: 菜单栏，包含了官方的按钮
- [61]hud_setting: 设置
- [60]hud_hero_selection: 英雄选择
- [60]hud_rank: 排行榜
- [60]hud_equipment: 抽卡
- [60]hud_draw: 抽卡
- [60]hud_profile: 档案
- [60]hud_activity: 活动
- [60]hud_hero: 英雄
- [60]hud_store: 商店
- [60]hud_mail: 邮件
<!-- 开局 -->
<!-- 游戏内 -->
- [52]hud_equipment_draw: 装备翻牌
- [51]hud_pause: 暂停的tip，应该放置在最高层级
- [50]hud_chat: 聊天窗口
- [49]hud_tutorial: 新手引导，需要在各个hud上显示提示
- [41]hud_endscreen: 结算界面
- [40]hud_selection: 选择
- [30]hud_fishing: 钓鱼
- [20]hud_main: 游戏内主界面
- [11]hud_notification: 消息窗口提示
- [10]overhead: 单位的头顶血条
- [0]默认层级

**开始你的自定义游戏开发之旅！** 🎮
