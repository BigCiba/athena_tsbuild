local __TSTL_FILE_PATH__ = "game_states/GameState_Settle"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 7,["19"] = 10,["20"] = 10,["21"] = 5,["22"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 结算阶段
____exports.GameState_Settle = __TS__Class()
local GameState_Settle = ____exports.GameState_Settle
GameState_Settle.name = "GameState_Settle"
__TS__ClassExtends(GameState_Settle, CGameStateBase)
function GameState_Settle.prototype.OnStateStart(self)
end
function GameState_Settle.prototype.OnStateEnd(self)
end
GameState_Settle = __TS__DecorateLegacy({reloadable}, GameState_Settle)
____exports.GameState_Settle = GameState_Settle
return ____exports
