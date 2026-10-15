local __TSTL_FILE_PATH__ = "class/run_session"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__Number = ____lualib.__TS__Number
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 2,["16"] = 2,["17"] = 2,["18"] = 12,["19"] = 12,["20"] = 12,["21"] = 3,["22"] = 4,["23"] = 5,["24"] = 6,["25"] = 7,["26"] = 8,["27"] = 11,["28"] = 12,["29"] = 13,["30"] = 13,["31"] = 13,["32"] = 15,["33"] = 16,["34"] = 16,["35"] = 16,["36"] = 16,["37"] = 16,["38"] = 16,["39"] = 16,["40"] = 16,["41"] = 16,["42"] = 21,["43"] = 21,["45"] = 22,["46"] = 22,["48"] = 23,["49"] = 23,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 25,["55"] = 26,["56"] = 26,["57"] = 26,["58"] = 26,["59"] = 27,["60"] = 27,["61"] = 27,["62"] = 27,["65"] = 29,["66"] = 15,["67"] = 32,["68"] = 33,["69"] = 33,["71"] = 34,["72"] = 35,["73"] = 35,["74"] = 36,["75"] = 36,["78"] = 38,["79"] = 38,["80"] = 38,["81"] = 38,["82"] = 38,["83"] = 38,["84"] = 38,["85"] = 38,["87"] = 32,["88"] = 40,["89"] = 41,["90"] = 42,["91"] = 42,["93"] = 43,["94"] = 43,["95"] = 43,["96"] = 40,["97"] = 45,["98"] = 46,["99"] = 47,["100"] = 47,["102"] = 48,["103"] = 48,["104"] = 45,["105"] = 50,["106"] = 51,["107"] = 51,["109"] = 52,["110"] = 52,["111"] = 52,["112"] = 52,["113"] = 52,["114"] = 52,["115"] = 52,["116"] = 53,["117"] = 53,["118"] = 53,["119"] = 53,["120"] = 53,["122"] = 54,["123"] = 54,["124"] = 50,["125"] = 56,["126"] = 58,["128"] = 58,["129"] = 58,["131"] = 58,["132"] = 59,["134"] = 60,["135"] = 60,["136"] = 56,["137"] = 63,["138"] = 64,["139"] = 64,["141"] = 65,["142"] = 65,["143"] = 66,["144"] = 66,["145"] = 66,["146"] = 66,["147"] = 67,["148"] = 67,["149"] = 67,["151"] = 65,["154"] = 69,["155"] = 69,["156"] = 63,["157"] = 72,["158"] = 73,["159"] = 73,["161"] = 74,["162"] = 74,["163"] = 74,["164"] = 74,["165"] = 74,["166"] = 74,["167"] = 74,["168"] = 74,["169"] = 74,["170"] = 72,["171"] = 76,["172"] = 77,["174"] = 77,["175"] = 77,["177"] = 77,["179"] = 77,["180"] = 77,["181"] = 77,["183"] = 77,["185"] = 77,["187"] = 77,["188"] = 77,["190"] = 78,["191"] = 78,["192"] = 78,["193"] = 78,["194"] = 78,["195"] = 78,["196"] = 78,["197"] = 79,["198"] = 79,["199"] = 79,["200"] = 79,["201"] = 79,["202"] = 79,["203"] = 79,["204"] = 79,["205"] = 79,["206"] = 79,["207"] = 79,["208"] = 76,["209"] = 81,["210"] = 82,["212"] = 82,["213"] = 82,["215"] = 82,["216"] = 82,["218"] = 83,["219"] = 83,["220"] = 83,["222"] = 84,["223"] = 84,["224"] = 84,["226"] = 84,["227"] = 81,["228"] = 86,["229"] = 86,["230"] = 86,["231"] = 86,["232"] = 86,["233"] = 86,["234"] = 87,["235"] = 87,["236"] = 87,["238"] = 87});
local ____exports = {}
--- 纯对局规则，不调用 Dota 引擎；每次准备都会生成新的局号。
____exports.RunSession = __TS__Class()
local RunSession = ____exports.RunSession
RunSession.name = "RunSession"
function RunSession.prototype.____constructor(self, mode, defaultHero)
    self.mode = mode
    self.defaultHero = defaultHero
    self.state = "GameState_Login"
    self.version = 0
    self.runId = 0
    self.difficulty = 2
    self.players = {}
    self.participants = {}
    self.voteSequence = 0
end
function RunSession.prototype.Matches(self, runId, version)
    return runId == self.runId and version == self.version
end
function RunSession.prototype.Transition(self, next)
    local edges = {
        GameState_Login = {"GameState_Prepare"},
        GameState_Prepare = {"GameState_DiffSelection"},
        GameState_DiffSelection = {"GameState_RunInit"},
        GameState_RunInit = {"GameState_Battle", "GameState_Settle"},
        GameState_Battle = {"GameState_Settle"},
        GameState_Settle = {"GameState_Reset"},
        GameState_Reset = {"GameState_Prepare"}
    }
    if __TS__ArrayIndexOf(edges[self.state], next) < 0 then
        return false
    end
    if next == "GameState_DiffSelection" and #self.participants == 0 then
        return false
    end
    if next == "GameState_Settle" and not self.result then
        return false
    end
    self.state = next
    self.version = self.version + 1
    self.vote = nil
    if next == "GameState_Prepare" then
        self.runId = self.runId + 1
        self.difficulty = 2
        self.participants = {}
        self.result = nil
        for ____, key in ipairs(__TS__ObjectKeys(self.players)) do
            local player = self.players[__TS__Number(key)]
            player.ready = false
            player.difficulty = 2
        end
    end
    return true
end
function RunSession.prototype.SyncPlayers(self, online)
    for ____, key in ipairs(__TS__ObjectKeys(self.players)) do
        self.players[__TS__Number(key)].online = false
    end
    for ____, id in ipairs(online) do
        if self.players[id] then
            self.players[id].online = true
        elseif self.state == "GameState_Prepare" or self.state == "GameState_Login" then
            self.players[id] = {hero = self.defaultHero, ready = false, difficulty = 2, online = true}
        end
    end
    if self.vote and __TS__ArraySome(
        self.vote.voters,
        function(____, id)
            local ____opt_0 = self.players[id]
            return not (____opt_0 and ____opt_0.online)
        end
    ) then
        self.vote = nil
    end
end
function RunSession.prototype.SelectHero(self, id, hero)
    local player = self.players[id]
    if self.state ~= "GameState_Prepare" or not (player and player.online) then
        return false
    end
    player.hero = hero
    player.ready = false
    return true
end
function RunSession.prototype.SetReady(self, id, ready)
    local player = self.players[id]
    if self.state ~= "GameState_Prepare" or not (player and player.online) then
        return false
    end
    player.ready = ready
    return true
end
function RunSession.prototype.LockParticipants(self)
    if self.state ~= "GameState_Prepare" then
        return false
    end
    local online = __TS__ArrayFilter(
        __TS__ArrayMap(
            __TS__ObjectKeys(self.players),
            function(____, key) return __TS__Number(key) end
        ),
        function(____, id) return self.players[id].online end
    )
    if not #online or #online > (self.mode == "solo" and 1 or 4) or __TS__ArraySome(
        online,
        function(____, id) return not self.players[id].ready end
    ) then
        return false
    end
    self.participants = online
    return true
end
function RunSession.prototype.SetDifficulty(self, id, value)
    local ____temp_8 = self.state ~= "GameState_Prepare" and self.state ~= "GameState_DiffSelection"
    if not ____temp_8 then
        local ____opt_6 = self.players[id]
        ____temp_8 = not (____opt_6 and ____opt_6.online)
    end
    if ____temp_8 or self.state == "GameState_DiffSelection" and __TS__ArrayIndexOf(self.participants, id) < 0 or value % 1 ~= 0 or value < 1 or value > 5 then
        return false
    end
    self.players[id].difficulty = value
    return true
end
function RunSession.prototype.ResolveDifficulty(self)
    local best = 1
    local bestCount = -1
    do
        local value = 1
        while value <= 5 do
            local count = #__TS__ArrayFilter(
                self.participants,
                function(____, id) return self.players[id].difficulty == value end
            )
            if count > bestCount then
                best = value
                bestCount = count
            end
            value = value + 1
        end
    end
    self.difficulty = best
    return best
end
function RunSession.prototype.Finish(self, runId, outcome, reason, elapsed)
    if runId ~= self.runId or self.result or self.state ~= "GameState_Battle" and self.state ~= "GameState_RunInit" then
        return false
    end
    self.result = {
        run_id = runId,
        outcome = outcome,
        reason = reason,
        elapsed = elapsed,
        difficulty = self.difficulty,
        participants = __TS__ArraySlice(self.participants)
    }
    return true
end
function RunSession.prototype.RequestVote(self, id, action, now)
    local ____temp_11 = self.vote or __TS__ArrayIndexOf(self.participants, id) < 0
    if not ____temp_11 then
        local ____opt_9 = self.players[id]
        ____temp_11 = not (____opt_9 and ____opt_9.online)
    end
    local ____temp_11_13 = ____temp_11
    if not ____temp_11_13 then
        local ____temp_12
        if action == "abandon" then
            ____temp_12 = self.state ~= "GameState_Battle"
        else
            ____temp_12 = self.state ~= "GameState_Settle"
        end
        ____temp_11_13 = ____temp_12
    end
    if ____temp_11_13 then
        return false
    end
    local voters = __TS__ArrayFilter(
        self.participants,
        function(____, player)
            local ____opt_14 = self.players[player]
            return ____opt_14 and ____opt_14.online
        end
    )
    local ____self_16, ____voteSequence_17 = self, "voteSequence"
    local ____self_voteSequence_18 = ____self_16[____voteSequence_17] + 1
    ____self_16[____voteSequence_17] = ____self_voteSequence_18
    self.vote = {
        id = ____self_voteSequence_18,
        action = action,
        deadline = now + 30,
        voters = voters,
        accepted = {id}
    }
    return true
end
function RunSession.prototype.RespondVote(self, id, accepted, now, voteId)
    local ____temp_21 = not self.vote or voteId ~= self.vote.id or now >= self.vote.deadline or __TS__ArrayIndexOf(self.vote.voters, id) < 0
    if not ____temp_21 then
        local ____opt_19 = self.players[id]
        ____temp_21 = not (____opt_19 and ____opt_19.online)
    end
    if ____temp_21 then
        return false
    end
    if not accepted then
        self.vote = nil
        return true
    end
    if __TS__ArrayIndexOf(self.vote.accepted, id) < 0 then
        local ____self_vote_accepted_22 = self.vote.accepted
        ____self_vote_accepted_22[#____self_vote_accepted_22 + 1] = id
    end
    return true
end
function RunSession.prototype.VotePassed(self, now)
    return not not self.vote and now < self.vote.deadline and #self.vote.voters > 0 and __TS__ArrayEvery(
        self.vote.voters,
        function(____, id) return __TS__ArrayIndexOf(self.vote.accepted, id) >= 0 end
    )
end
function RunSession.prototype.ExpireVote(self, now)
    if self.vote and now >= self.vote.deadline then
        self.vote = nil
    end
end
return ____exports
