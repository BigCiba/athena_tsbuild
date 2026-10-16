local __TSTL_FILE_PATH__ = "game_states/GameState_Reset"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["14"] = 5,["15"] = 6,["16"] = 5,["17"] = 6,["18"] = 7,["19"] = 8,["20"] = 8,["21"] = 8,["22"] = 8,["23"] = 9,["25"] = 9,["26"] = 9,["27"] = 9,["28"] = 9,["29"] = 9,["30"] = 9,["31"] = 9,["35"] = 10,["36"] = 11,["37"] = 11,["38"] = 11,["39"] = 11,["40"] = 7,["41"] = 5,["42"] = 6});
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
    local errors = Event:Fire(
        "game_reset",
        {runId = GameState:GetSession().runId}
    )
    if errors and #errors then
        error(
            table.concat(
                __TS__ArrayMap(
                    errors,
                    function(____, ____error) return ____error.error end
                ),
                "; "
            ),
            0
        )
    end
    GameState:GetWorld():Cleanup()
    self:StartThink(
        0,
        function() return GameState:SwitchState("GameState_Prepare") end
    )
end
GameState_Reset = __TS__DecorateLegacy({reloadable}, GameState_Reset)
____exports.GameState_Reset = GameState_Reset
return ____exports
