local __TSTL_FILE_PATH__ = "mechanics/run_resources"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["14"] = 4,["15"] = 5,["16"] = 4,["17"] = 5,["19"] = 5,["20"] = 6,["21"] = 7,["22"] = 8,["23"] = 9,["24"] = 10,["25"] = 11,["26"] = 4,["27"] = 12,["28"] = 13,["29"] = 15,["30"] = 15,["31"] = 15,["32"] = 15,["33"] = 15,["34"] = 16,["39"] = 18,["40"] = 18,["41"] = 18,["42"] = 18,["43"] = 18,["44"] = 18,["45"] = 18,["48"] = 17,["54"] = 15,["55"] = 15,["56"] = 15,["57"] = 15,["58"] = 20,["59"] = 21,["60"] = 22,["61"] = 22,["62"] = 22,["63"] = 22,["64"] = 22,["65"] = 22,["66"] = 22,["67"] = 22,["68"] = 22,["69"] = 23,["70"] = 23,["71"] = 23,["72"] = 23,["73"] = 23,["74"] = 24,["75"] = 25,["76"] = 25,["78"] = 23,["79"] = 23,["80"] = 23,["81"] = 27,["82"] = 27,["83"] = 27,["84"] = 28,["87"] = 29,["88"] = 33,["89"] = 34,["90"] = 34,["92"] = 27,["93"] = 27,["94"] = 27,["95"] = 36,["96"] = 36,["97"] = 36,["98"] = 37,["99"] = 37,["100"] = 37,["102"] = 36,["103"] = 36,["104"] = 36,["105"] = 39,["106"] = 39,["107"] = 39,["108"] = 40,["109"] = 40,["111"] = 39,["112"] = 39,["113"] = 39,["114"] = 12,["115"] = 43,["116"] = 44,["117"] = 45,["120"] = 47,["121"] = 47,["123"] = 48,["124"] = 48,["126"] = 43,["127"] = 50,["128"] = 51,["129"] = 52,["130"] = 50,["131"] = 56,["132"] = 57,["133"] = 58,["136"] = 59,["137"] = 59,["138"] = 59,["139"] = 60,["140"] = 61,["141"] = 62,["143"] = 62,["147"] = 63,["148"] = 64,["149"] = 65,["150"] = 66,["151"] = 67,["152"] = 67,["153"] = 67,["154"] = 67,["155"] = 67,["156"] = 67,["157"] = 67,["159"] = 69,["160"] = 69,["161"] = 56,["162"] = 72,["163"] = 73,["164"] = 73,["166"] = 74,["167"] = 74,["169"] = 75,["170"] = 75,["172"] = 76,["173"] = 72,["174"] = 79,["175"] = 80,["176"] = 80,["178"] = 81,["179"] = 81,["180"] = 82,["181"] = 83,["182"] = 83,["183"] = 84,["184"] = 84,["186"] = 86,["187"] = 87,["188"] = 87,["189"] = 88,["190"] = 88,["192"] = 89,["193"] = 90,["194"] = 91,["195"] = 92,["196"] = 92,["198"] = 93,["199"] = 94,["200"] = 95,["201"] = 95,["203"] = 97,["204"] = 97,["205"] = 97,["206"] = 97,["207"] = 97,["208"] = 97,["209"] = 97,["210"] = 97,["213"] = 98,["215"] = 99,["216"] = 99,["217"] = 79,["218"] = 101,["219"] = 101,["220"] = 101,["221"] = 101,["222"] = 101,["223"] = 102,["226"] = 105,["227"] = 107,["228"] = 108,["230"] = 109,["231"] = 109,["232"] = 110,["233"] = 110,["234"] = 110,["237"] = 111,["240"] = 112,["241"] = 109,["245"] = 115,["248"] = 116,["249"] = 117,["250"] = 117,["251"] = 117,["253"] = 117,["254"] = 117,["255"] = 117,["257"] = 117,["258"] = 118,["259"] = 118,["260"] = 118,["261"] = 118,["262"] = 120,["263"] = 120,["264"] = 120,["265"] = 120,["266"] = 120,["267"] = 120,["268"] = 120,["269"] = 120,["270"] = 120,["271"] = 121,["272"] = 121,["273"] = 121,["274"] = 121,["275"] = 121,["276"] = 121,["277"] = 121,["278"] = 121,["279"] = 121,["280"] = 122,["281"] = 122,["282"] = 122,["283"] = 122,["284"] = 122,["285"] = 122,["286"] = 122,["287"] = 122,["288"] = 122,["289"] = 123,["290"] = 123,["291"] = 123,["292"] = 123,["293"] = 123,["294"] = 123,["295"] = 123,["296"] = 123,["297"] = 123,["298"] = 124,["299"] = 101,["300"] = 126,["301"] = 127,["304"] = 128,["305"] = 129,["306"] = 130,["308"] = 131,["309"] = 131,["311"] = 132,["312"] = 132,["313"] = 132,["314"] = 132,["315"] = 132,["316"] = 132,["317"] = 132,["318"] = 132,["319"] = 132,["320"] = 132,["321"] = 132,["322"] = 132,["323"] = 133,["324"] = 133,["325"] = 133,["326"] = 133,["327"] = 133,["328"] = 133,["329"] = 134,["330"] = 134,["331"] = 134,["332"] = 134,["333"] = 134,["334"] = 134,["338"] = 136,["339"] = 126,["340"] = 138,["341"] = 139,["342"] = 140,["344"] = 141,["345"] = 141,["346"] = 141,["347"] = 142,["348"] = 142,["350"] = 143,["351"] = 143,["352"] = 144,["353"] = 145,["354"] = 145,["355"] = 145,["356"] = 145,["357"] = 145,["358"] = 145,["359"] = 145,["360"] = 145,["361"] = 145,["365"] = 149,["366"] = 150,["367"] = 151,["368"] = 152,["369"] = 153,["370"] = 153,["371"] = 153,["375"] = 155,["376"] = 155,["377"] = 155,["379"] = 138,["380"] = 157,["381"] = 158,["382"] = 159,["383"] = 160,["384"] = 161,["385"] = 161,["387"] = 163,["388"] = 163,["389"] = 163,["390"] = 164,["391"] = 157,["392"] = 4,["393"] = 5,["394"] = 168,["395"] = 168});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 局内资源、击杀基础奖励与资源类任务奖励。金币以引擎为准，账号资产不在本模块内。
____exports.CRunResources = __TS__Class()
local CRunResources = ____exports.CRunResources
CRunResources.name = "CRunResources"
__TS__ClassExtends(CRunResources, CModule)
function CRunResources.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.lastTick = 0
    self.heroes = {}
    self.balances = {}
    self.snapshot = {run_id = 0, active = false, players = {}}
end
function CRunResources.prototype.init(self)
    Event:UnregisterContext(self)
    Event:RegisterWithPriority(
        "game_start",
        function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == nil then
                return
            end
            do
                local function ____catch(____error)
                    self.running = false
                    self:Publish()
                    GameState:FinishRun(
                        runId,
                        "error",
                        tostring(____error)
                    )
                end
                local ____try, ____hasReturned = pcall(function()
                    self:Start(runId)
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end,
        300,
        self
    )
    Event:RegisterWithPriority("entity_killed", self.OnKilled, 300, self)
    Event:RegisterWithPriority("tick_time", self.OnTick, 50, self)
    Event:Register(
        "npc_spawned",
        function(____, ____bindingPattern0)
            local unit
            unit = ____bindingPattern0.unit
            return self:TrackSpawn(unit)
        end,
        self
    )
    Event:Register(
        "hero_level_up",
        function(____, ____bindingPattern0)
            local unit
            unit = ____bindingPattern0.unit
            local id = unit:GetPlayerOwnerID()
            if self:Active(id, self.runId) and self.heroes[id] == unit then
                self:Publish()
            end
        end,
        self
    )
    Event:Register(
        "task_reward",
        function(____, reward)
            if reward.handled or reward.type ~= "TASK_REWARD_TYPE_RESOURCE" then
                return
            end
            local resources = {CUSTOM_RESOURCE_TYPE_GOLD = "gold", CUSTOM_RESOURCE_TYPE_CRYSTAL = "crystal", CUSTOM_RESOURCE_TYPE_SCORE = "score", CUSTOM_RESOURCE_TYPE_EXP = "experience"}
            local resource = resources[reward.name]
            if resource and reward.amount >= 0 then
                reward.handled = self:Modify(reward.playerID, resource, reward.amount, reward.runId)
            end
        end,
        self
    )
    Event:Register(
        "game_end",
        function(____, event)
            if event.run_id == self.runId then
                self.running = false
                self:Publish()
            end
        end,
        self
    )
    Event:Register(
        "game_reset",
        function(____, event)
            if event.runId == self.runId and event.runId == GameState:GetSession().runId then
                self:reset()
            end
        end,
        self
    )
end
function CRunResources.prototype.TrackSpawn(self, unit)
    local session = GameState:GetSession()
    if not IsValid(unit) or session.state ~= "GameState_RunInit" and session.state ~= "GameState_Battle" then
        return
    end
    if unit.__resourceRunId == nil then
        unit.__resourceRunId = session.runId
    end
    if unit.__resourceRunId == session.runId and unit:IsAlive() then
        unit.__resourceDeathPaid = false
    end
end
function CRunResources.prototype.Active(self, playerID, runId)
    local session = GameState:GetSession()
    return self.running and runId == self.runId and session.runId == runId and session.state == "GameState_Battle" and __TS__ArrayIncludes(session.participants, playerID) and self.balances[playerID] ~= nil and IsValid(self.heroes[playerID]) and PlayerResource:GetSelectedHeroEntity(playerID) == self.heroes[playerID]
end
function CRunResources.prototype.Start(self, runId)
    local session = GameState:GetSession()
    if session.runId ~= runId or session.state ~= "GameState_Battle" or self.runId == runId then
        return
    end
    self:reset()
    self.runId = runId
    self.lastTick = 0
    for ____, id in ipairs(session.participants) do
        local hero = PlayerResource:GetSelectedHeroEntity(id)
        if not IsValid(hero) or not hero:IsRealHero() then
            error(
                ("玩家 " .. tostring(id)) .. " 的资源英雄不存在",
                0
            )
        end
        self.heroes[id] = hero
        self:TrackSpawn(hero)
        self.balances[id] = {crystal = 0, score = 0, goldFraction = 0}
        PlayerResource:SetGold(id, 0, false)
        PlayerResource:SetGold(id, ({
            300,
            200,
            100,
            0,
            0
        })[session.difficulty], true)
    end
    self.running = true
    self:Publish()
end
function CRunResources.prototype.Get(self, playerID, resource, runId)
    if not self:Active(playerID, runId) then
        return nil
    end
    if resource == "gold" then
        return PlayerResource:GetGold(playerID)
    end
    if resource == "experience" then
        return self.heroes[playerID]:GetCurrentXP()
    end
    return self.balances[playerID][resource]
end
function CRunResources.prototype.Modify(self, playerID, resource, amount, runId)
    if not self:Active(playerID, runId) or type(amount) ~= "number" or amount ~= amount or math.abs(amount) == math.huge then
        return false
    end
    local balance = self.balances[playerID]
    local hero = self.heroes[playerID]
    if resource == "gold" then
        local current = PlayerResource:GetGold(playerID)
        local total = current + balance.goldFraction + amount
        if total < 0 or math.abs(total) == math.huge then
            return false
        end
        local whole = math.floor(total)
        if whole < current then
            PlayerResource:SpendGold(playerID, current - whole, DOTA_ModifyGold_Unspecified)
        elseif whole > current then
            PlayerResource:ModifyGold(playerID, whole - current, true, DOTA_ModifyGold_Unspecified)
        end
        balance.goldFraction = total - whole
    elseif resource == "crystal" or resource == "score" then
        local total = balance[resource] + amount
        if total < 0 or math.abs(total) == math.huge then
            return false
        end
        balance[resource] = total
    elseif resource == "experience" then
        if amount < 0 then
            return false
        end
        if amount > 0 and hero:GetLevel() < HERO_MAX_LEVEL and not hero:AddExperience(
            amount,
            DOTA_ModifyXP_Unspecified,
            false,
            false,
            0
        ) then
            return false
        end
    else
        return false
    end
    self:Publish()
    return true
end
function CRunResources.prototype.OnKilled(self, ____bindingPattern0)
    local attacker
    local victim
    victim = ____bindingPattern0.victim
    attacker = ____bindingPattern0.attacker
    if not IsValid(victim) or not IsValid(attacker) or victim == attacker or victim:IsAlive() or victim.__resourceRunId ~= self.runId or attacker.__resourceRunId ~= self.runId or victim.__resourceDeathPaid or victim:GetTeamNumber() == attacker:GetTeamNumber() then
        return
    end
    local id = victim.iKillerPlayerID ~= nil and victim.iKillerPlayerID >= 0 and victim.iKillerPlayerID or attacker:GetPlayerOwnerID()
    if id < 0 then
        local owner = attacker:GetOwnerEntity()
        do
            local depth = 0
            while IsValid(owner) and depth < 8 do
                for ____, key in ipairs(__TS__ObjectKeys(self.heroes)) do
                    if self.heroes[tonumber(key)] == owner then
                        id = tonumber(key)
                    end
                end
                if id >= 0 then
                    break
                end
                owner = owner:GetOwnerEntity()
                depth = depth + 1
            end
        end
    end
    if not self:Active(id, self.runId) or attacker:GetTeamNumber() ~= self.heroes[id]:GetTeamNumber() then
        return
    end
    victim.__resourceDeathPaid = true
    local ____KeyValues_units_index_0 = KeyValues.units[victim:GetUnitName()]
    if ____KeyValues_units_index_0 == nil then
        ____KeyValues_units_index_0 = KeyValues.heroes[victim:GetUnitName()]
    end
    local ____KeyValues_units_index_0_1 = ____KeyValues_units_index_0
    if ____KeyValues_units_index_0_1 == nil then
        ____KeyValues_units_index_0_1 = {}
    end
    local kv = ____KeyValues_units_index_0_1
    local gold = (tonumber(kv.BountyGold) or 0) * math.max(
        0,
        1 + GetPlayerKillGoldPercentage(id) * 0.01
    )
    self:Modify(
        id,
        "gold",
        math.max(0, gold) + (attacker == self.heroes[id] and math.max(
            0,
            GetKillGoldFlat(attacker)
        ) or 0),
        self.runId
    )
    self:Modify(
        id,
        "crystal",
        math.max(
            0,
            tonumber(kv.BountyCrystal) or 0
        ),
        self.runId
    )
    self:Modify(
        id,
        "score",
        math.max(
            0,
            GetPlayerKillScoreBonus(id)
        ),
        self.runId
    )
    self:Modify(
        id,
        "experience",
        math.max(
            0,
            tonumber(kv.BountyXP) or 0
        ),
        self.runId
    )
    Event:Fire("unit_bounty", {playerID = id, victim = victim, attacker = attacker, runId = self.runId})
end
function CRunResources.prototype.OnTick(self, event)
    if event.tick_time ~= 1 or event.runId ~= self.runId or event.tick <= self.lastTick or not self.running then
        return
    end
    self.lastTick = event.tick
    local session = GameState:GetSession()
    for ____, id in ipairs(session.participants) do
        do
            if not self:Active(id, event.runId) then
                goto __continue54
            end
            self:Modify(
                id,
                "gold",
                GetGoldPerSec(self.heroes[id]) + GetPlayerGoldPerSecond(id) + ({
                    9,
                    6,
                    3,
                    0,
                    0
                })[session.difficulty],
                event.runId
            )
            self:Modify(
                id,
                "crystal",
                GetPlayerCrystalPerSecond(id),
                event.runId
            )
            self:Modify(
                id,
                "score",
                GetPlayerScorePerSecond(id),
                event.runId
            )
        end
        ::__continue54::
    end
    self:Publish()
end
function CRunResources.prototype.Publish(self)
    local players = {}
    for ____, key in ipairs(__TS__ObjectKeys(self.balances)) do
        do
            local id = tonumber(key)
            local hero = self.heroes[id]
            local balance = self.balances[id]
            if not IsValid(hero) then
                goto __continue58
            end
            local level = hero:GetLevel()
            local experience = hero:GetCurrentXP()
            local floor = HERO_XP_PER_LEVEL_TABLE[level] or experience
            players[key] = {
                gold = PlayerResource:GetGold(id),
                crystal = balance.crystal,
                score = balance.score,
                experience = experience,
                level = level,
                level_exp = math.max(0, experience - floor),
                next_level_exp = level >= HERO_MAX_LEVEL and 0 or (HERO_XP_PER_LEVEL_TABLE[level + 1] or floor) - floor
            }
        end
        ::__continue58::
    end
    local next = {run_id = self.runId, active = self.running, players = players}
    local changed = next.run_id ~= self.snapshot.run_id or next.active ~= self.snapshot.active or #__TS__ObjectKeys(players) ~= #__TS__ObjectKeys(self.snapshot.players)
    for ____, key in ipairs(__TS__ObjectKeys(players)) do
        local previous = self.snapshot.players[key]
        for ____, field in ipairs(__TS__ObjectKeys(players[key])) do
            if not previous or previous[field] ~= players[key][field] then
                changed = true
            end
        end
    end
    if changed then
        self.snapshot = next
        CustomNetTables:SetTableValue("common", "run_resources", next)
    end
end
function CRunResources.prototype.reset(self)
    self.running = false
    for ____, key in ipairs(__TS__ObjectKeys(self.balances)) do
        local id = tonumber(key)
        PlayerResource:SetGold(id, 0, false)
        PlayerResource:SetGold(id, 0, true)
    end
    self.heroes = {}
    self.balances = {}
    self.lastTick = 0
    self:Publish()
end
CRunResources = __TS__DecorateLegacy({reloadable}, CRunResources)
____exports.CRunResources = CRunResources
if RunResources == nil then
    RunResources = __TS__New(____exports.CRunResources)
end
return ____exports
