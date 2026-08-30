# 配置系统架构说明

## 概述

本项目使用 Excel 作为配置的单一数据源，通过构建系统生成多种格式的配置文件。

## 密钥

```
备5: EFA3DA17178D1D4CF9994506C9C071BF
```
## 数据流

```
Excel 配置文件 (configure/)
    ↓
generate-configure.js
    ├→ JS 文件 (content/lonely_cannon/panorama/scripts/custom_game/configure/)
    └→ KV 文件 (game/lonely_cannon/scripts/npc/service/) [可选]
```

## 配置生成规则

### 1. Excel → JS（所有配置）
- **输出目录**：`content/lonely_cannon/panorama/scripts/custom_game/configure/`
- **用途**：前端 Panorama UI 使用
- **类型定义**：`src/declarations/configure.d.ts`
- **特点**：
  - 所有 Excel 配置都会生成对应的 JS 文件
  - 类型定义精确（直接来自 Excel 的类型声明）
  - 支持复杂的嵌套结构和可选字段

### 2. Excel → KV（可选）
- **输出目录**：`game/lonely_cannon/scripts/npc/service/`
- **用途**：服务端脚本使用
- **触发条件**：在 `configure-rules.json` 中设置 `"export_kv": true`
- **特点**：
  - 只生成标记了 `export_kv: true` 的配置
  - **不参与**前端的 KV→JS 转换
  - 仅用于服务端读取

## 关键设计

### 避免重复生成

**之前的问题**：如果 `service/` 目录参与前端 KV→JS 转换，会导致重复生成：

```
Excel → JS (configure/bp_season.js)
Excel → KV → JS (kv/bp_season.js)  ❌ 重复！
```

**解决方案**：
- `package.json` 的 `KV` 配置中**不包含** `"service"`
- `service/` 目录下的 KV 文件**仅用于服务端**
- 前端直接使用 `configure/` 目录下的 JS 文件

### 类型定义分离

**configure.d.ts**（所有业务配置的类型定义）：
```typescript
interface CustomUIConfig {
    // 所有 Excel 配置的类型定义都在这里
    bp_level_exp: Record<string, Bp_level_exp>;
    bp_rewards: Record<string, Record<string, Bp_rewards>>;
    bp_season: Bp_season;  // ✅ 即使 export_kv: true 也在这里
    collection: Collection;
    hero: Hero;
    // ...
}
```

**kv.d.ts**（游戏引擎原生 KV 的类型定义）：
```typescript
interface CustomUIConfig {
    // 只包含游戏引擎原生 KV
    heroes: Record<string, HeroesKVItem>;
    items: Record<string, ItemsKVItem>;
    abilities: Record<string, AbilitiesKVItem>;
    units: Record<string, UnitsKVItem>;
    // ...
}
```

**清晰分离**：
- `configure.d.ts` → 所有 Excel 配置（包括设置了 `export_kv: true` 的）
- `kv.d.ts` → 只包含游戏引擎原生 KV（heroes、items、abilities 等）

### export_kv 规则

在 `configure-rules.json` 中配置：

```json
{
    "bp_season": {
        "export_kv": true,
        "output_name": "bp_season"
    }
}
```

**效果**：
1. ✅ 生成 `configure/bp_season.js`（前端使用）
2. ✅ 生成 `service/bp_season.kv`（服务端使用）
3. ✅ 在 `configure.d.ts` 中生成类型定义
4. ✅ **不生成** `kv/bp_season.js`（避免重复）

## 配置分类

### 只生成 JS 的配置
- **示例**：`collection`、`hero`、`weapon`
- **特点**：前端专用的业务配置
- **类型定义**：`configure.d.ts`

### 同时生成 KV 和 JS 的配置
- **示例**：`bp_season`、`hero_level_grow`、`talent`
- **特点**：前后端都需要使用的配置
- **类型定义**：
  - 前端 JS 类型：`configure.d.ts`
  - 服务端 KV 格式：`service/xxx.kv`

### 游戏引擎原生 KV 配置
- **示例**：`heroes`、`items`、`abilities`
- **来源**：手写的 KV 文件（非 Excel 生成）
- **类型定义**：`kv.d.ts`
- **JS 生成**：`kv/xxx.js`（通过 plugin-kv.ts）

## 文件结构

```
lonely_cannon/
├── configure/                          # Excel 配置源文件
│   ├── bp/
│   │   ├── bp_season.xlsx            # 设置了 export_kv: true
│   │   ├── bp_level_exp.xlsx
│   │   └── bp_rewards.xlsx
│   ├── collection/
│   │   └── collection.xlsx
│   └── configure-rules.json           # 配置规则
│
├── game/lonely_cannon/scripts/npc/service/       # 服务端 KV 文件（Excel 生成）
│   ├── bp_season.kv                   # ✅ 从 Excel 生成
│   ├── hero_level_grow.kv
│   └── talent.kv
│
├── content/lonely_cannon/panorama/scripts/custom_game/
│   ├── configure/                     # 前端 JS 配置（Excel 生成）
│   │   ├── bp_season.js              # ✅ 从 Excel 直接生成
│   │   ├── bp_level_exp.js
│   │   └── collection.js
│   └── kv/                           # 游戏引擎 KV→JS
│       ├── heroes.js                 # ✅ 从 KV 生成
│       ├── items.js
│       └── abilities.js
│
└── src/declarations/
    ├── configure.d.ts                 # 所有 Excel 配置的类型定义
    └── kv.d.ts                        # 游戏引擎原生 KV 的类型定义
```

## 开发指南

### 添加新配置

1. **创建 Excel 文件**：在 `configure/` 目录下创建 `.xlsx` 文件
2. **配置规则**（可选）：在 `configure-rules.json` 中添加规则
3. **运行生成**：`npm run generate:configure`
4. **使用配置**：前端直接使用 `GameUI.CustomUIConfig().配置名`

### 如果需要服务端访问

1. **设置 export_kv**：在 `configure-rules.json` 中设置 `"export_kv": true`
2. **服务端使用**：通过 `LoadKeyValuesFile` 加载 `service/xxx.kv`
3. **前端使用**：直接使用 `GameUI.CustomUIConfig().配置名`（类型在 `configure.d.ts`）

### 类型定义

- **所有 Excel 配置**：查看 `src/declarations/configure.d.ts`
- **游戏引擎原生 KV**：查看 `src/declarations/kv.d.ts`
- **两者通过 `declare global` 合并**，没有冲突

## 注意事项

1. ⚠️ **不要手动修改**生成的 JS 和 KV 文件
2. ⚠️ **service/ 目录不参与前端构建**（已在 `package.json` 中排除）
3. ✅ **Excel 是唯一的数据源**，所有修改都应该在 Excel 中进行
4. ✅ **类型定义自动生成**，修改 Excel 后重新运行生成脚本即可

## 故障排查

### Q: 修改了 Excel 但前端没有更新？
A: 运行 `npm run generate:configure`

### Q: 找不到配置的类型定义？
A: 所有 Excel 配置的类型定义都在 `src/declarations/configure.d.ts` 中

### Q: service/ 目录的 KV 为什么不在 kv/ 目录生成 JS？
A: 这是**正确的行为**！`service/` 目录下的 KV 是从 Excel 生成的，前端应该使用 `configure/` 目录下直接从 Excel 生成的 JS 文件。

### Q: 发现 kv/ 和 configure/ 目录下有同名文件？
A: 删除 `kv/` 目录下对应的重复文件。从 `package.json` 移除 `"service"` 后，不会再生成这些重复文件。

### Q: 设置了 export_kv: true 的配置，类型定义在哪里？
A: 仍在 `configure.d.ts` 中。`export_kv: true` 只是额外生成 KV 文件给服务端使用，不影响前端的类型定义。
