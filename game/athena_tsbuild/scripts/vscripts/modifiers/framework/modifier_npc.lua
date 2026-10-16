local __TSTL_FILE_PATH__ = "modifiers/framework/modifier_npc"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 7,["22"] = 8,["23"] = 8,["24"] = 8,["25"] = 9,["26"] = 10,["27"] = 10,["28"] = 10,["29"] = 10,["30"] = 10,["31"] = 10,["32"] = 10,["33"] = 10,["34"] = 9,["35"] = 5,["36"] = 4,["37"] = 5,["39"] = 5});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseModifier = ____dota_ts_adapter.BaseModifier
local registerModifier = ____dota_ts_adapter.registerModifier
--- 原版 NPC 固定位置、无敌、无碰撞与隐藏血条。
____exports.modifier_npc = __TS__Class()
local modifier_npc = ____exports.modifier_npc
modifier_npc.name = "modifier_npc"
__TS__ClassExtends(modifier_npc, BaseModifier)
function modifier_npc.prototype.IsHidden(self)
    return true
end
function modifier_npc.prototype.IsPurgable(self)
    return false
end
function modifier_npc.prototype.GetPriority(self)
    return MODIFIER_PRIORITY_HIGH
end
function modifier_npc.prototype.CheckState(self)
    return {
        [MODIFIER_STATE_ROOTED] = true,
        [MODIFIER_STATE_INVULNERABLE] = true,
        [MODIFIER_STATE_NO_HEALTH_BAR] = true,
        [MODIFIER_STATE_NO_UNIT_COLLISION] = true,
        [MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
        [MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS] = true
    }
end
modifier_npc = __TS__DecorateLegacy(
    {registerModifier(__TSTL_FILE_PATH__)},
    modifier_npc
)
____exports.modifier_npc = modifier_npc
return ____exports
