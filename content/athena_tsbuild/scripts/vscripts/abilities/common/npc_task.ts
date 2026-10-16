import { EOMAbility, registerEOMAbility } from "../eom_ability";

/** 保留原版 KV 的被动技能名；NPC 交互由 NPC 发布事件，任务流程集中在 Task。 */
@registerEOMAbility() export class npc_task_bh extends EOMAbility { }
@registerEOMAbility() export class npc_task_cuihua extends EOMAbility { }
@registerEOMAbility() export class npc_task_bajie extends EOMAbility { }
@registerEOMAbility() export class npc_task_simon extends EOMAbility { }
@registerEOMAbility() export class npc_task_bearzky extends EOMAbility { }
@registerEOMAbility() export class npc_task_beaverknight extends EOMAbility { }
