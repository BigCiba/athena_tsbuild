local __TSTL_FILE_PATH__ = "game_states/GameState_RunInit"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["13"] = 5,["14"] = 6,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 8,["21"] = 13,["22"] = 13,["23"] = 13,["24"] = 13,["25"] = 13,["28"] = 10,["29"] = 11,["30"] = 11,["31"] = 11,["32"] = 11,["38"] = 7,["39"] = 5,["40"] = 6});
local ____exports = {}
local ____game_state_class = require("class.game_state_class")
local CGameStateBase = ____game_state_class.CGameStateBase
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 创建本局世界；初始化失败统一进入错误结算，保留清理和重试入口。
____exports.GameState_RunInit = __TS__Class()
local GameState_RunInit = ____exports.GameState_RunInit
GameState_RunInit.name = "GameState_RunInit"
__TS__ClassExtends(GameState_RunInit, CGameStateBase)
function GameState_RunInit.prototype.OnStateStart(self)
    local runId = GameState:GetSession().runId
    do
        local function ____catch(reason)
            GameState:FinishRun(
                runId,
                "error",
                tostring(reason)
            )
        end
        local ____try, ____hasReturned = pcall(function()
            GameState:GetWorld():Initialize(GameState:GetSession())
            self:StartThink(
                0,
                function() return GameState:SwitchState("GameState_Battle", runId) end
            )
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
GameState_RunInit = __TS__DecorateLegacy({reloadable}, GameState_RunInit)
____exports.GameState_RunInit = GameState_RunInit
return ____exports
