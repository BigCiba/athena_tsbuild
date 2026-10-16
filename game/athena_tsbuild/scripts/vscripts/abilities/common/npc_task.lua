local __TSTL_FILE_PATH__ = "abilities/common/npc_task"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 4,["15"] = 4,["16"] = 4,["17"] = 4,["18"] = 4,["20"] = 4,["21"] = 5,["22"] = 5,["23"] = 5,["24"] = 5,["25"] = 5,["26"] = 5,["27"] = 5,["29"] = 5,["30"] = 6,["31"] = 6,["32"] = 6,["33"] = 6,["34"] = 6,["35"] = 6,["36"] = 6,["38"] = 6,["39"] = 7,["40"] = 7,["41"] = 7,["42"] = 7,["43"] = 7,["44"] = 7,["45"] = 7,["47"] = 7,["48"] = 8,["49"] = 8,["50"] = 8,["51"] = 8,["52"] = 8,["53"] = 8,["54"] = 8,["56"] = 8,["57"] = 9,["58"] = 9,["59"] = 9,["60"] = 9,["61"] = 9,["62"] = 9,["63"] = 9,["65"] = 9});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
--- 保留原版 KV 的被动技能名；NPC 交互由 NPC 发布事件，任务流程集中在 Task。
____exports.npc_task_bh = __TS__Class()
local npc_task_bh = ____exports.npc_task_bh
npc_task_bh.name = "npc_task_bh"
__TS__ClassExtends(npc_task_bh, EOMAbility)
npc_task_bh = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_bh
)
____exports.npc_task_bh = npc_task_bh
____exports.npc_task_cuihua = __TS__Class()
local npc_task_cuihua = ____exports.npc_task_cuihua
npc_task_cuihua.name = "npc_task_cuihua"
__TS__ClassExtends(npc_task_cuihua, EOMAbility)
npc_task_cuihua = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_cuihua
)
____exports.npc_task_cuihua = npc_task_cuihua
____exports.npc_task_bajie = __TS__Class()
local npc_task_bajie = ____exports.npc_task_bajie
npc_task_bajie.name = "npc_task_bajie"
__TS__ClassExtends(npc_task_bajie, EOMAbility)
npc_task_bajie = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_bajie
)
____exports.npc_task_bajie = npc_task_bajie
____exports.npc_task_simon = __TS__Class()
local npc_task_simon = ____exports.npc_task_simon
npc_task_simon.name = "npc_task_simon"
__TS__ClassExtends(npc_task_simon, EOMAbility)
npc_task_simon = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_simon
)
____exports.npc_task_simon = npc_task_simon
____exports.npc_task_bearzky = __TS__Class()
local npc_task_bearzky = ____exports.npc_task_bearzky
npc_task_bearzky.name = "npc_task_bearzky"
__TS__ClassExtends(npc_task_bearzky, EOMAbility)
npc_task_bearzky = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_bearzky
)
____exports.npc_task_bearzky = npc_task_bearzky
____exports.npc_task_beaverknight = __TS__Class()
local npc_task_beaverknight = ____exports.npc_task_beaverknight
npc_task_beaverknight.name = "npc_task_beaverknight"
__TS__ClassExtends(npc_task_beaverknight, EOMAbility)
npc_task_beaverknight = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    npc_task_beaverknight
)
____exports.npc_task_beaverknight = npc_task_beaverknight
return ____exports
