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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["13"] = 2,["14"] = 2,["15"] = 3,["16"] = 3,["17"] = 4,["18"] = 4,["19"] = 5,["20"] = 5,["21"] = 6,["22"] = 6,["23"] = 7,["24"] = 7,["25"] = 8,["26"] = 8,["27"] = 9,["28"] = 9,["29"] = 10,["30"] = 10,["31"] = 11,["32"] = 11,["34"] = 14,["35"] = 15,["36"] = 14,["37"] = 15,["39"] = 15,["40"] = 18,["41"] = 19,["42"] = 23,["43"] = 14,["44"] = 24,["45"] = 24,["46"] = 24,["47"] = 26,["48"] = 27,["49"] = 27,["51"] = 28,["52"] = 29,["53"] = 30,["54"] = 30,["55"] = 30,["56"] = 30,["57"] = 30,["58"] = 31,["59"] = 32,["61"] = 34,["62"] = 35,["63"] = 35,["65"] = 36,["66"] = 36,["67"] = 36,["68"] = 37,["69"] = 37,["70"] = 37,["71"] = 37,["72"] = 37,["73"] = 36,["74"] = 36,["75"] = 39,["76"] = 40,["77"] = 40,["78"] = 40,["79"] = 41,["80"] = 41,["82"] = 40,["83"] = 40,["84"] = 40,["85"] = 40,["87"] = 44,["88"] = 26,["89"] = 51,["90"] = 52,["91"] = 52,["92"] = 52,["93"] = 52,["94"] = 52,["95"] = 52,["96"] = 52,["97"] = 52,["98"] = 52,["99"] = 53,["100"] = 53,["101"] = 51,["102"] = 56,["103"] = 56,["104"] = 56,["106"] = 57,["109"] = 58,["110"] = 59,["111"] = 59,["114"] = 60,["115"] = 61,["118"] = 62,["119"] = 62,["122"] = 72,["123"] = 72,["124"] = 73,["125"] = 73,["129"] = 64,["132"] = 65,["135"] = 65,["143"] = 66,["146"] = 66,["152"] = 67,["153"] = 68,["154"] = 68,["156"] = 69,["157"] = 69,["159"] = 70,["168"] = 74,["174"] = 75,["175"] = 76,["176"] = 77,["177"] = 77,["178"] = 78,["179"] = 78,["181"] = 56,["182"] = 81,["183"] = 82,["184"] = 81,["185"] = 85,["186"] = 86,["187"] = 86,["188"] = 86,["189"] = 86,["190"] = 86,["191"] = 86,["192"] = 86,["193"] = 86,["194"] = 86,["195"] = 87,["196"] = 85,["197"] = 89,["198"] = 89,["199"] = 89,["200"] = 90,["201"] = 90,["202"] = 90,["203"] = 91,["204"] = 91,["205"] = 91,["206"] = 91,["207"] = 91,["208"] = 91,["209"] = 92,["210"] = 93,["211"] = 94,["212"] = 94,["213"] = 94,["215"] = 94,["216"] = 95,["217"] = 92,["218"] = 97,["219"] = 98,["220"] = 98,["221"] = 99,["222"] = 99,["223"] = 99,["224"] = 99,["225"] = 97,["226"] = 101,["227"] = 102,["228"] = 102,["229"] = 102,["230"] = 102,["231"] = 103,["234"] = 104,["235"] = 104,["236"] = 101,["237"] = 107,["238"] = 107,["239"] = 107,["240"] = 107,["241"] = 107,["242"] = 107,["245"] = 107,["246"] = 109,["247"] = 109,["248"] = 109,["250"] = 110,["251"] = 110,["253"] = 111,["254"] = 112,["255"] = 113,["256"] = 113,["257"] = 113,["258"] = 113,["259"] = 114,["260"] = 114,["261"] = 114,["262"] = 114,["263"] = 114,["265"] = 115,["266"] = 115,["268"] = 116,["269"] = 116,["270"] = 109,["271"] = 118,["272"] = 119,["273"] = 120,["274"] = 120,["277"] = 121,["278"] = 122,["280"] = 122,["281"] = 122,["283"] = 122,["286"] = 123,["289"] = 123,["290"] = 123,["296"] = 124,["299"] = 126,["300"] = 126,["301"] = 126,["302"] = 126,["303"] = 126,["305"] = 127,["306"] = 129,["307"] = 130,["310"] = 131,["312"] = 133,["313"] = 133,["315"] = 134,["316"] = 135,["317"] = 135,["319"] = 136,["320"] = 136,["322"] = 137,["323"] = 138,["324"] = 138,["326"] = 139,["329"] = 141,["330"] = 142,["331"] = 118,["332"] = 144,["333"] = 145,["334"] = 145,["335"] = 145,["336"] = 145,["337"] = 145,["338"] = 145,["339"] = 145,["340"] = 145,["341"] = 145,["342"] = 145,["343"] = 145,["344"] = 145,["345"] = 145,["346"] = 145,["347"] = 144,["348"] = 14,["349"] = 15,["350"] = 159,["351"] = 159});
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
            self:CompleteSelection(self.session.runId)
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
function CGameState.prototype.CompleteSelection(self, runId, timedOut)
    if timedOut == nil then
        timedOut = false
    end
    if runId ~= self.session.runId or self.session.state ~= "GameState_Prepare" then
        return false
    end
    self:RefreshPlayers()
    if timedOut then
        local heroes = __TS__ArrayFilter(
            self:GetHeroList(),
            function(____, name) return tonumber(KeyValues.heroes[name].IsHero) == 1 and KeyValues.heroes[name].UnitLabel ~= "hide" end
        )
        if not self.session:FinalizeSelection(
            heroes,
            function(____, count) return RandomInt(0, count - 1) end
        ) then
            return false
        end
    elseif not self.session:LockParticipants() then
        return false
    end
    self:SwitchState("GameState_DiffSelection", runId)
    return true
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
    self:CompleteSelection(self.session.runId)
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
