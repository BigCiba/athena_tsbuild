local __TSTL_FILE_PATH__ = "game_states/GameState_Battle"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 8,["19"] = 9,["20"] = 10,["21"] = 7,["22"] = 12,["23"] = 12,["24"] = 12,["25"] = 5,["26"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 战斗的计时器与刷怪都由阶段持有，退出后不再推进旧波次。
____exports.GameState_Battle = __TS__Class()
local GameState_Battle = ____exports.GameState_Battle
GameState_Battle.name = "GameState_Battle"
__TS__ClassExtends(GameState_Battle, CGameStateBase)
function GameState_Battle.prototype.OnStateStart(self)
    local runId = GameState:GetSession().runId
    Event:Fire("game_start", {runId = runId})
    GameState:GetWorld():StartBattle(self)
end
function GameState_Battle.prototype.OnStateEnd(self)
    GameState:GetWorld():Freeze()
end
GameState_Battle = __TS__DecorateLegacy({reloadable}, GameState_Battle)
____exports.GameState_Battle = GameState_Battle
return ____exports
