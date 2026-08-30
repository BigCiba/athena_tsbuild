local __TSTL_FILE_PATH__ = "framework/game_state"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 2,["10"] = 2,["12"] = 5,["13"] = 6,["14"] = 5,["15"] = 6,["16"] = 9,["17"] = 10,["18"] = 11,["19"] = 12,["20"] = 13,["22"] = 9,["23"] = 21,["24"] = 24,["25"] = 25,["26"] = 26,["27"] = 28,["28"] = 29,["30"] = 31,["31"] = 21,["32"] = 34,["33"] = 35,["34"] = 36,["35"] = 38,["36"] = 39,["37"] = 41,["38"] = 42,["39"] = 43,["40"] = 43,["41"] = 43,["42"] = 43,["43"] = 43,["44"] = 43,["45"] = 44,["46"] = 34,["47"] = 47,["48"] = 48,["49"] = 47,["50"] = 51,["51"] = 52,["52"] = 53,["53"] = 54,["54"] = 55,["55"] = 56,["56"] = 57,["57"] = 58,["58"] = 59,["59"] = 60,["60"] = 61,["62"] = 63,["63"] = 51,["64"] = 65,["65"] = 66,["66"] = 66,["67"] = 66,["68"] = 66,["69"] = 66,["70"] = 66,["71"] = 66,["72"] = 66,["73"] = 66,["74"] = 65,["75"] = 5,["76"] = 6,["77"] = 77,["78"] = 77});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 游戏阶段
____exports.CGameState = __TS__Class()
local CGameState = ____exports.CGameState
CGameState.name = "CGameState"
__TS__ClassExtends(CGameState, CModule)
function CGameState.prototype.init(self, reload)
    if not reload then
        self.currentGameStage = self:CreateStateByName("GameState_Login")
        self.currentGameStage:OnStateStart()
        self:UpdateNetTable()
    end
end
function CGameState.prototype.CreateStateByName(self, className)
    local modulePath = "game_states." .. className
    local stateModule = require(modulePath)
    local StateClass = stateModule[className]
    if not StateClass then
        error((("游戏状态类 " .. className) .. " 不存在于模块 ") .. modulePath)
    end
    return __TS__New(StateClass)
end
function CGameState.prototype.SwitchState(self, nextStateClassName)
    local nextStateName = nextStateClassName or self:GetNextStateName(self.currentGameStage)
    local nextState = self:CreateStateByName(nextStateName)
    xpcall(self.currentGameStage.OnStateEnd, traceback, self.currentGameStage)
    xpcall(self.currentGameStage.dispose, traceback, self.currentGameStage)
    self.currentGameStage = nextState
    xpcall(self.currentGameStage.OnStateStart, traceback, self.currentGameStage)
    self:print(
        "Switching game state from",
        self.currentGameStage:GetName(),
        "to",
        nextState:GetName()
    )
    self:UpdateNetTable()
end
function CGameState.prototype.GetStateName(self)
    return self.currentGameStage:GetName()
end
function CGameState.prototype.GetNextStateName(self, previousState)
    if previousState:GetName() == "GameState_Login" then
        return "GameState_Prepare"
    elseif previousState:GetName() == "GameState_Prepare" then
        return "GameState_DiffSelection"
    elseif previousState:GetName() == "GameState_DiffSelection" then
        return "GameState_Dungeon"
    elseif previousState:GetName() == "GameState_Dungeon" then
        return "GameState_Settle"
    elseif previousState:GetName() == "GameState_Settle" then
        return "GameState_Prepare"
    end
    return "GameState_Login"
end
function CGameState.prototype.UpdateNetTable(self)
    CustomNetTables:SetNetData(
        "common",
        "game_state",
        {
            state = self.currentGameStage:GetName(),
            start_time = self.currentGameStage.timeStart,
            end_time = self.currentGameStage.timeEnd
        }
    )
end
CGameState = __TS__DecorateLegacy({reloadable}, CGameState)
____exports.CGameState = CGameState
if GameState == nil then
    GameState = __TS__New(____exports.CGameState)
end
return ____exports
