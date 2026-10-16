local __TSTL_FILE_PATH__ = "game_states/GameState_Prepare"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 8,["19"] = 9,["20"] = 10,["21"] = 11,["22"] = 11,["23"] = 11,["24"] = 13,["25"] = 13,["27"] = 11,["28"] = 11,["29"] = 7,["30"] = 17,["31"] = 17,["32"] = 5,["33"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 每局选人及准备。尚未创建本局世界，也不提前发送 game_start。
____exports.GameState_Prepare = __TS__Class()
local GameState_Prepare = ____exports.GameState_Prepare
GameState_Prepare.name = "GameState_Prepare"
__TS__ClassExtends(GameState_Prepare, CGameStateBase)
function GameState_Prepare.prototype.OnStateStart(self)
    self.timeEnd = self.timeStart + 30
    GameState:RefreshPlayers()
    local runId = GameState:GetSession().runId
    self:StartThink(
        30,
        function()
            if not GameState:CompleteSelection(runId) then
                return 1
            end
        end
    )
end
function GameState_Prepare.prototype.OnStateEnd(self)
end
GameState_Prepare = __TS__DecorateLegacy({reloadable}, GameState_Prepare)
____exports.GameState_Prepare = GameState_Prepare
return ____exports
