local __TSTL_FILE_PATH__ = "game_states/GameState_DiffSelection"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 8,["19"] = 7,["20"] = 5,["21"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 选完英雄后的准备阶段
____exports.GameState_DiffSelection = __TS__Class()
local GameState_DiffSelection = ____exports.GameState_DiffSelection
GameState_DiffSelection.name = "GameState_DiffSelection"
__TS__ClassExtends(GameState_DiffSelection, CGameStateBase)
function GameState_DiffSelection.prototype.OnStateStart(self)
    EmitAnnouncerSound("UI.DiffSelection")
end
GameState_DiffSelection = __TS__DecorateLegacy({reloadable}, GameState_DiffSelection)
____exports.GameState_DiffSelection = GameState_DiffSelection
return ____exports
