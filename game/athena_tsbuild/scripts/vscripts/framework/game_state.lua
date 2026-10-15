local __TSTL_FILE_PATH__ = "framework/game_state"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["13"] = 2,["14"] = 2,["15"] = 3,["16"] = 3,["17"] = 4,["18"] = 4,["19"] = 5,["20"] = 5,["21"] = 6,["22"] = 6,["23"] = 7,["24"] = 7,["25"] = 8,["26"] = 8,["27"] = 9,["28"] = 9,["29"] = 10,["30"] = 10,["31"] = 11,["32"] = 11,["34"] = 14,["35"] = 15,["36"] = 14,["37"] = 15,["39"] = 15,["40"] = 18,["41"] = 19,["42"] = 23,["43"] = 14,["44"] = 24,["45"] = 24,["46"] = 24,["47"] = 26,["48"] = 27,["49"] = 27,["51"] = 28,["52"] = 29,["53"] = 30,["54"] = 30,["55"] = 30,["56"] = 30,["57"] = 30,["58"] = 31,["59"] = 32,["61"] = 34,["62"] = 35,["63"] = 35,["65"] = 36,["66"] = 36,["67"] = 36,["68"] = 37,["69"] = 37,["70"] = 37,["71"] = 37,["72"] = 36,["73"] = 36,["74"] = 39,["75"] = 40,["76"] = 40,["77"] = 40,["78"] = 41,["79"] = 41,["81"] = 40,["82"] = 40,["83"] = 40,["84"] = 40,["86"] = 44,["87"] = 26,["88"] = 51,["89"] = 52,["90"] = 52,["91"] = 52,["92"] = 52,["93"] = 52,["94"] = 52,["95"] = 52,["96"] = 52,["97"] = 52,["98"] = 53,["99"] = 53,["100"] = 51,["101"] = 56,["102"] = 56,["103"] = 56,["105"] = 57,["108"] = 58,["109"] = 59,["110"] = 59,["113"] = 60,["114"] = 61,["117"] = 62,["118"] = 62,["121"] = 72,["122"] = 72,["123"] = 73,["124"] = 73,["128"] = 64,["131"] = 65,["134"] = 65,["142"] = 66,["145"] = 66,["151"] = 67,["152"] = 68,["153"] = 68,["155"] = 69,["156"] = 69,["158"] = 70,["167"] = 74,["173"] = 75,["174"] = 76,["175"] = 77,["176"] = 77,["177"] = 78,["178"] = 78,["180"] = 56,["181"] = 81,["182"] = 82,["183"] = 81,["184"] = 85,["185"] = 86,["186"] = 86,["187"] = 86,["188"] = 86,["189"] = 86,["190"] = 86,["191"] = 86,["192"] = 86,["193"] = 86,["194"] = 87,["195"] = 85,["196"] = 89,["197"] = 89,["198"] = 89,["199"] = 90,["200"] = 90,["201"] = 90,["202"] = 91,["203"] = 91,["204"] = 91,["205"] = 91,["206"] = 91,["207"] = 91,["208"] = 92,["209"] = 93,["210"] = 94,["211"] = 94,["212"] = 94,["214"] = 94,["215"] = 95,["216"] = 92,["217"] = 97,["218"] = 98,["219"] = 98,["220"] = 99,["221"] = 99,["222"] = 99,["223"] = 99,["224"] = 97,["225"] = 101,["226"] = 102,["227"] = 102,["228"] = 102,["229"] = 102,["230"] = 103,["233"] = 104,["234"] = 104,["235"] = 101,["236"] = 107,["237"] = 107,["238"] = 107,["239"] = 107,["240"] = 107,["241"] = 107,["244"] = 107,["245"] = 108,["246"] = 109,["247"] = 110,["248"] = 110,["251"] = 111,["252"] = 112,["254"] = 112,["255"] = 112,["257"] = 112,["260"] = 113,["263"] = 113,["264"] = 113,["270"] = 114,["273"] = 116,["274"] = 116,["275"] = 116,["276"] = 116,["277"] = 116,["279"] = 117,["280"] = 119,["281"] = 120,["284"] = 121,["285"] = 122,["286"] = 122,["289"] = 124,["290"] = 124,["292"] = 125,["293"] = 126,["294"] = 126,["296"] = 127,["297"] = 127,["299"] = 128,["300"] = 129,["301"] = 129,["303"] = 130,["306"] = 132,["307"] = 108,["308"] = 134,["309"] = 135,["310"] = 135,["311"] = 135,["312"] = 135,["313"] = 135,["314"] = 135,["315"] = 135,["316"] = 135,["317"] = 135,["318"] = 135,["319"] = 135,["320"] = 135,["321"] = 135,["322"] = 135,["323"] = 134,["324"] = 14,["325"] = 15,["326"] = 149,["327"] = 149});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local ____run_session = require("class.run_session")
local RunSession = ____run_session.RunSession
local ____athena_run_world = require("mechanics.athena_run_world")
local AthenaRunWorld = ____athena_run_world.AthenaRunWorld
local ____GameState_Login = require("game_states.GameState_Login")
local GameState_Login = ____GameState_Login.GameState_Login
local ____GameState_Prepare = require("game_states.GameState_Prepare")
local GameState_Prepare = ____GameState_Prepare.GameState_Prepare
local ____GameState_DiffSelection = require("game_states.GameState_DiffSelection")
local GameState_DiffSelection = ____GameState_DiffSelection.GameState_DiffSelection
local ____GameState_RunInit = require("game_states.GameState_RunInit")
local GameState_RunInit = ____GameState_RunInit.GameState_RunInit
local ____GameState_Battle = require("game_states.GameState_Battle")
local GameState_Battle = ____GameState_Battle.GameState_Battle
local ____GameState_Settle = require("game_states.GameState_Settle")
local GameState_Settle = ____GameState_Settle.GameState_Settle
local ____GameState_Reset = require("game_states.GameState_Reset")
local GameState_Reset = ____GameState_Reset.GameState_Reset
--- 游戏阶段
____exports.CGameState = __TS__Class()
local CGameState = ____exports.CGameState
CGameState.name = "CGameState"
__TS__ClassExtends(CGameState, CModule)
function CGameState.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.world = __TS__New(AthenaRunWorld)
    self.transitioning = false
    self.runStarted = 0
end
function CGameState.prototype.initPriority(self)
    return -20
end
function CGameState.prototype.init(self, reload)
    if not self.world then
        self.world = __TS__New(AthenaRunWorld)
    end
    if not self.session then
        local mode = GetMapName() == "solo" and "solo" or "team"
        self.session = __TS__New(
            RunSession,
            mode,
            self:GetHeroList()[1] or "npc_dota_hero_phantom_assassin"
        )
        self.currentGameStage = self:CreateStateByName("GameState_Login")
        self.currentGameStage:OnStateStart()
    end
    CustomUIEvent("athena_game_action", self.OnAction, self)
    if self.monitor then
        Timer:StopTimer(self.monitor)
    end
    self.monitor = Timer:Timer(
        0.5,
        function()
            self:RefreshPlayers()
            self.session:ExpireVote(Time())
            self:UpdateNetTable()
            return 0.5
        end
    )
    if IsInToolsMode() then
        Convars:RegisterCommand(
            "athena_run_result",
            function(_command, value)
                if value == "victory" or value == "defeat" then
                    self:FinishRun(self.session.runId, value, "开发工具手动结束本局")
                end
            end,
            "DEV: finish current run with victory/defeat",
            0
        )
    end
    self:UpdateNetTable()
end
function CGameState.prototype.CreateStateByName(self, className)
    local states = {
        GameState_Login = GameState_Login,
        GameState_Prepare = GameState_Prepare,
        GameState_DiffSelection = GameState_DiffSelection,
        GameState_RunInit = GameState_RunInit,
        GameState_Battle = GameState_Battle,
        GameState_Settle = GameState_Settle,
        GameState_Reset = GameState_Reset
    }
    local State = states[className]
    return __TS__New(State)
end
function CGameState.prototype.SwitchState(self, nextStateClassName, runId)
    if runId == nil then
        runId = self.session.runId
    end
    if runId ~= self.session.runId then
        return
    end
    local next = nextStateClassName or self:GetNextStateName()
    if self.transitioning then
        self.pending = next
        return
    end
    local previous = self.session.state
    if not self.session:Transition(next) then
        return
    end
    self.transitioning = true
    self.lastError = nil
    do
        local function ____catch(reason)
            self.lastError = tostring(reason)
            self:error(self.lastError)
            if next == "GameState_RunInit" or next == "GameState_Battle" then
                self:FinishRun(runId, "error", self.lastError)
            end
        end
        local ____try, ____hasReturned = pcall(function()
            local exitError
            do
                local function ____catch(reason)
                    exitError = tostring(reason)
                end
                local ____try, ____hasReturned = pcall(function()
                    self.currentGameStage:dispose()
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            do
                local function ____catch(reason)
                    exitError = tostring(reason)
                end
                local ____try, ____hasReturned = pcall(function()
                    self.currentGameStage:OnStateEnd()
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            self.currentGameStage = self:CreateStateByName(next)
            if exitError and (next == "GameState_RunInit" or next == "GameState_Battle") then
                error(exitError, 0)
            end
            if next == "GameState_Battle" then
                self.runStarted = GameRules:GetGameTime()
            end
            self.currentGameStage:OnStateStart()
        end)
        local ____rethrow
        if not ____try then
            ____try, ____rethrow = pcall(function()
                ____catch(____hasReturned)
            end)
        end
        do
            self.transitioning = false
        end
        if not ____try then
            error(____rethrow, 0)
        end
    end
    self:print("Switching game state from", previous, "to", next)
    self:UpdateNetTable()
    local pending = self.pending
    self.pending = nil
    if pending then
        self:SwitchState(pending)
    end
end
function CGameState.prototype.GetStateName(self)
    return self.session.state
end
function CGameState.prototype.GetNextStateName(self)
    local next = {
        GameState_Login = "GameState_Prepare",
        GameState_Prepare = "GameState_DiffSelection",
        GameState_DiffSelection = "GameState_RunInit",
        GameState_RunInit = "GameState_Battle",
        GameState_Battle = "GameState_Settle",
        GameState_Settle = "GameState_Reset",
        GameState_Reset = "GameState_Prepare"
    }
    return next[self.session.state]
end
function CGameState.prototype.GetSession(self)
    return self.session
end
function CGameState.prototype.GetWorld(self)
    return self.world
end
function CGameState.prototype.GetHeroList(self)
    return __TS__ArraySort(__TS__ArrayFilter(
        __TS__ObjectKeys(KeyValues.heroes),
        function(____, name) return (string.find(name, "npc_dota_hero_", nil, true) or 0) - 1 == 0 end
    ))
end
function CGameState.prototype.GetOnlinePlayers(self)
    local result = {}
    Game:EachPlayer(function(____, id)
        if PlayerResource:GetTeam(id) == DOTA_TEAM_GOODGUYS and PlayerResource:GetConnectionState(id) == DOTA_CONNECTION_STATE_CONNECTED then
            result[#result + 1] = id
        end
    end)
    return result
end
function CGameState.prototype.RefreshPlayers(self)
    local online = self:GetOnlinePlayers()
    self.session:SyncPlayers(online)
    self.world:PreparePlayers((self.session.state == "GameState_Login" or self.session.state == "GameState_Prepare") and online or __TS__ArrayFilter(
        online,
        function(____, id) return __TS__ArrayIndexOf(self.session.participants, id) < 0 end
    ))
end
function CGameState.prototype.FinishRun(self, runId, outcome, reason)
    local elapsed = self.session.state == "GameState_Battle" and math.max(
        0,
        GameRules:GetGameTime() - self.runStarted
    ) or 0
    if not self.session:Finish(runId, outcome, reason, elapsed) then
        return
    end
    Game:SetGameResult(outcome == "victory")
    self:SwitchState("GameState_Settle", runId)
end
function CGameState.prototype.DebugRestart(self)
    if IsInToolsMode() then
        if self.session.state == "GameState_Battle" then
            self:FinishRun(self.session.runId, "abandoned", "开发工具放弃本局")
        elseif self.session.state == "GameState_Settle" then
            self:SwitchState("GameState_Reset")
        end
    end
end
function CGameState.prototype.OnAction(self, event)
    self:RefreshPlayers()
    if not self.session:Matches(event.run_id, event.state_version) then
        self:UpdateNetTable()
        return
    end
    local id = event.PlayerID
    local ____temp_2 = event.action == "retry_cleanup" and self.session.state == "GameState_Reset" and self.lastError and __TS__ArrayIndexOf(self.session.participants, id) >= 0
    if ____temp_2 then
        local ____opt_0 = self.session.players[id]
        ____temp_2 = ____opt_0 and ____opt_0.online
    end
    if ____temp_2 then
        do
            local function ____catch(reason)
                self.lastError = tostring(reason)
            end
            local ____try, ____hasReturned = pcall(function()
                self.currentGameStage:OnStateStart()
                self.lastError = nil
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
        self:UpdateNetTable()
        return
    end
    if event.action == "select_hero" and event.hero and __TS__ArrayIndexOf(
        self:GetHeroList(),
        event.hero
    ) >= 0 then
        self.session:SelectHero(id, event.hero)
    end
    local ready = event.ready
    if event.action == "ready" and (type(ready) == "boolean" or ready == 0 or ready == 1) then
        if not Login:IsPlayerRequiredLoginCompleted(id) then
            return
        end
        self.session:SetReady(id, ready == true or ready == 1)
        if self.session:LockParticipants() then
            self:SwitchState("GameState_DiffSelection")
        end
    end
    if event.action == "difficulty" and type(event.difficulty) == "number" then
        self.session:SetDifficulty(id, event.difficulty)
    end
    local now = Time()
    if event.action == "abandon" or event.action == "replay" then
        self.session:RequestVote(id, event.action, now)
    end
    if event.action == "accept" or event.action == "reject" then
        self.session:RespondVote(id, event.action == "accept", now, event.vote_id)
    end
    if self.session:VotePassed(now) then
        if self.session.vote.action == "abandon" then
            self:FinishRun(self.session.runId, "abandoned", "参战玩家确认放弃")
        else
            self:SwitchState("GameState_Reset")
        end
    end
    self:UpdateNetTable()
end
function CGameState.prototype.UpdateNetTable(self)
    CustomNetTables:SetNetData("common", "game_state", {
        state = self.session.state,
        start_time = self.currentGameStage.timeStart,
        end_time = self.currentGameStage.timeEnd,
        run_id = self.session.runId,
        state_version = self.session.version,
        mode = self.session.mode,
        difficulty = self.session.difficulty,
        players = self.session.players,
        participants = self.session.participants,
        result = self.session.result,
        vote = self.session.vote,
        error = self.lastError
    })
end
CGameState = __TS__DecorateLegacy({reloadable}, CGameState)
____exports.CGameState = CGameState
if GameState == nil then
    GameState = __TS__New(____exports.CGameState)
end
return ____exports
