local __TSTL_FILE_PATH__ = "game_states/GameState_Login"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["17"] = 5,["18"] = 6,["19"] = 4,["20"] = 7,["21"] = 8,["22"] = 8,["23"] = 8,["24"] = 9,["25"] = 10,["28"] = 13,["29"] = 18,["30"] = 8,["31"] = 8,["32"] = 7,["33"] = 4,["34"] = 5});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
____exports.GameState_Login = __TS__Class()
local GameState_Login = ____exports.GameState_Login
GameState_Login.name = "GameState_Login"
__TS__ClassExtends(GameState_Login, CGameStateBase)
function GameState_Login.prototype.____constructor(self, ...)
    CGameStateBase.prototype.____constructor(self, ...)
    self.times = 0
end
function GameState_Login.prototype.OnStateStart(self)
    Timer:Timer(
        1,
        function()
            if Login:IsAllLoginState() then
                GameState:SwitchState("GameState_Prepare")
                return
            end
            self.times = self.times + 1
            return 1
        end
    )
end
GameState_Login = __TS__DecorateLegacy({reloadable}, GameState_Login)
____exports.GameState_Login = GameState_Login
return ____exports
