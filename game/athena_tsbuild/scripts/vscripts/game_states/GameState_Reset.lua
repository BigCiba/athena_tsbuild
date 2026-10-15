local __TSTL_FILE_PATH__ = "game_states/GameState_Reset"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 8,["19"] = 9,["20"] = 9,["21"] = 9,["22"] = 9,["23"] = 7,["24"] = 5,["25"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 清理失败时留在 Reset，不能带着半清理的世界进入下一局。
____exports.GameState_Reset = __TS__Class()
local GameState_Reset = ____exports.GameState_Reset
GameState_Reset.name = "GameState_Reset"
__TS__ClassExtends(GameState_Reset, CGameStateBase)
function GameState_Reset.prototype.OnStateStart(self)
    GameState:GetWorld():Cleanup()
    self:StartThink(
        0,
        function() return GameState:SwitchState("GameState_Prepare") end
    )
end
GameState_Reset = __TS__DecorateLegacy({reloadable}, GameState_Reset)
____exports.GameState_Reset = GameState_Reset
return ____exports
