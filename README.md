# Dota 2 Custom Game - athena_tsbuild

## 项目起点

本项目从 `lonely_cannon` 的根提交 `4741a125753f53f4c6f8c58bbd1db28817c66f48`（框架清理）创建，当前完成项目名称与路径统一、Windows 含空格路径的构建修复及依赖安装，尚未迁移雅典娜玩法。

同时合入其后续提交 `83b467b9445f8c597e7b991a88cca8ef6f9f55e6`：清理 c1 残留的命令、文案与资源引用，恢复伤害数字粒子及贴图；其中的 addon 名称已适配为 `athena_tsbuild`。

- 项目标识：`athena_tsbuild`
- 工作目录：`D:\Dota Addons\athena_tsbuild`
- 服务端源码：`content/athena_tsbuild/scripts/vscripts`
- Lua 输出：`game/athena_tsbuild/scripts/vscripts`
- Panorama 源码：`src`

初始化已验证：VScripts 类型检查、Lua 输出构建和 Solid UI 首轮编译。一次性构建 VScripts 可运行 `node node_scripts/build-vscripts.js`；持续开发使用下文的现有脚本。

继承的 Source 2 已编译资源保留原始依赖元数据，部分仍记录旧 addon 的源路径；后续在 Dota 工坊工具中重新编译资源时生成新元数据。本次未进行 Dota 实机运行验证。


基于 Solid.js 和 TypeScript 的 Dota 2 自定义游戏项目，使用现代化的前端技术栈开发 Panorama UI。

## 🚀 快速开始

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
