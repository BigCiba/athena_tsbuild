# 代码职责边界

- `framework` 按完整的框架职责组织文件，`mechanics` 按完整的玩法职责组织文件。
- 零散计算函数放在所属职责文件内；不在 `mechanics` 新建工具或属性初始化补位文件。
- 单位基础属性由 `modifiers/framework/modifier_common.ts` 从 KV 统一初始化。难度、波次、精英等加成归对应玩法或 modifier，使用独立属性来源，避免重复写入基础属性。
- 玩法模块通过 `CModule` 和 `Event` 接入生命周期，自行管理资源，不耦合到 `athena_run_world`。
- 除非用户明确要求，不采用工单或 PR 模式开发。
