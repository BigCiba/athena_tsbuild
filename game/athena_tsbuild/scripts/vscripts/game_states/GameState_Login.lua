local __TSTL_FILE_PATH__ = "game_states/GameState_Login"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 7,["19"] = 7,["20"] = 8,["21"] = 9,["24"] = 12,["25"] = 7,["26"] = 7,["27"] = 7,["28"] = 6,["29"] = 4,["30"] = 5});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
____exports.GameState_Login = __TS__Class()
local GameState_Login = ____exports.GameState_Login
GameState_Login.name = "GameState_Login"
__TS__ClassExtends(GameState_Login, CGameStateBase)
function GameState_Login.prototype.OnStateStart(self)
    self:StartThink(
        0.5,
        function()
            if #GameState:GetOnlinePlayers() > 0 and Login:IsAllLoginState() and GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
                GameState:SwitchState("GameState_Prepare")
                return
            end
            return 0.5
        end,
        true
    )
end
GameState_Login = __TS__DecorateLegacy({reloadable}, GameState_Login)
____exports.GameState_Login = GameState_Login
return ____exports
