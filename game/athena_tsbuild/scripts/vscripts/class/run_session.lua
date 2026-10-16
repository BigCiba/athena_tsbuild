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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 2,["16"] = 2,["17"] = 2,["18"] = 12,["19"] = 12,["20"] = 12,["21"] = 3,["22"] = 4,["23"] = 5,["24"] = 6,["25"] = 7,["26"] = 8,["27"] = 11,["28"] = 12,["29"] = 13,["30"] = 13,["31"] = 13,["32"] = 15,["33"] = 16,["34"] = 16,["35"] = 16,["36"] = 16,["37"] = 16,["38"] = 16,["39"] = 16,["40"] = 16,["41"] = 16,["42"] = 21,["43"] = 21,["45"] = 22,["46"] = 22,["48"] = 23,["49"] = 23,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 25,["55"] = 26,["56"] = 26,["57"] = 26,["58"] = 26,["59"] = 27,["60"] = 27,["61"] = 27,["62"] = 27,["65"] = 29,["66"] = 15,["67"] = 32,["68"] = 33,["69"] = 33,["71"] = 34,["72"] = 35,["73"] = 35,["74"] = 36,["75"] = 36,["78"] = 38,["79"] = 38,["80"] = 38,["81"] = 38,["82"] = 38,["83"] = 38,["84"] = 38,["85"] = 38,["87"] = 32,["88"] = 40,["89"] = 41,["90"] = 42,["91"] = 42,["93"] = 43,["94"] = 43,["95"] = 43,["96"] = 40,["97"] = 45,["98"] = 46,["99"] = 47,["100"] = 47,["102"] = 48,["103"] = 48,["104"] = 45,["105"] = 50,["106"] = 51,["107"] = 51,["109"] = 52,["110"] = 52,["111"] = 52,["112"] = 52,["113"] = 52,["114"] = 52,["115"] = 52,["116"] = 53,["117"] = 53,["118"] = 53,["119"] = 53,["120"] = 53,["122"] = 54,["123"] = 54,["124"] = 50,["125"] = 57,["126"] = 58,["127"] = 58,["129"] = 59,["130"] = 59,["131"] = 59,["132"] = 59,["133"] = 59,["134"] = 59,["135"] = 59,["136"] = 60,["137"] = 60,["139"] = 61,["140"] = 62,["141"] = 63,["142"] = 63,["143"] = 63,["146"] = 65,["147"] = 57,["148"] = 67,["149"] = 69,["151"] = 69,["152"] = 69,["154"] = 69,["155"] = 70,["157"] = 71,["158"] = 71,["159"] = 67,["160"] = 74,["161"] = 75,["162"] = 75,["164"] = 76,["165"] = 76,["166"] = 77,["167"] = 77,["168"] = 77,["169"] = 77,["170"] = 78,["171"] = 78,["172"] = 78,["174"] = 76,["177"] = 80,["178"] = 80,["179"] = 74,["180"] = 83,["181"] = 84,["182"] = 84,["184"] = 85,["185"] = 85,["186"] = 85,["187"] = 85,["188"] = 85,["189"] = 85,["190"] = 85,["191"] = 85,["192"] = 85,["193"] = 83,["194"] = 87,["195"] = 88,["197"] = 88,["198"] = 88,["200"] = 88,["202"] = 88,["203"] = 88,["204"] = 88,["206"] = 88,["208"] = 88,["210"] = 88,["211"] = 88,["213"] = 89,["214"] = 89,["215"] = 89,["216"] = 89,["217"] = 89,["218"] = 89,["219"] = 89,["220"] = 90,["221"] = 90,["222"] = 90,["223"] = 90,["224"] = 90,["225"] = 90,["226"] = 90,["227"] = 90,["228"] = 90,["229"] = 90,["230"] = 90,["231"] = 87,["232"] = 92,["233"] = 93,["235"] = 93,["236"] = 93,["238"] = 93,["239"] = 93,["241"] = 94,["242"] = 94,["243"] = 94,["245"] = 95,["246"] = 95,["247"] = 95,["249"] = 95,["250"] = 92,["251"] = 97,["252"] = 97,["253"] = 97,["254"] = 97,["255"] = 97,["256"] = 97,["257"] = 98,["258"] = 98,["259"] = 98,["261"] = 98});
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
function RunSession.prototype.FinalizeSelection(self, heroes, randomIndex)
    if self.state ~= "GameState_Prepare" or #heroes == 0 then
        return false
    end
    local online = __TS__ArrayFilter(
        __TS__ArrayMap(
            __TS__ObjectKeys(self.players),
            function(____, key) return __TS__Number(key) end
        ),
        function(____, id) return self.players[id].online end
    )
    if not #online or #online > (self.mode == "solo" and 1 or 4) then
        return false
    end
    for ____, id in ipairs(online) do
        local player = self.players[id]
        if not player.ready then
            player.hero = heroes[randomIndex(nil, #heroes) + 1]
            player.ready = true
        end
    end
    return self:LockParticipants()
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
