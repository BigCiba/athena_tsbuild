local __TSTL_FILE_PATH__ = "mechanics/wave_spawner"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 1,["18"] = 1,["20"] = 203,["21"] = 204,["22"] = 205,["23"] = 206,["24"] = 207,["26"] = 208,["27"] = 208,["28"] = 208,["30"] = 209,["31"] = 210,["33"] = 210,["37"] = 211,["38"] = 212,["40"] = 213,["41"] = 213,["42"] = 213,["44"] = 214,["46"] = 214,["50"] = 215,["51"] = 215,["52"] = 216,["53"] = 216,["55"] = 217,["56"] = 217,["57"] = 217,["58"] = 217,["59"] = 217,["60"] = 219,["61"] = 219,["62"] = 219,["63"] = 217,["64"] = 219,["65"] = 219,["66"] = 219,["67"] = 217,["68"] = 217,["69"] = 217,["70"] = 217,["71"] = 217,["72"] = 217,["73"] = 217,["74"] = 217,["75"] = 217,["79"] = 226,["80"] = 226,["82"] = 227,["83"] = 228,["84"] = 228,["85"] = 228,["86"] = 228,["87"] = 228,["89"] = 229,["90"] = 230,["91"] = 230,["93"] = 231,["94"] = 231,["95"] = 231,["96"] = 231,["97"] = 231,["98"] = 231,["99"] = 231,["100"] = 231,["101"] = 231,["102"] = 231,["106"] = 233,["107"] = 233,["109"] = 234,["110"] = 234,["111"] = 234,["112"] = 234,["113"] = 203,["115"] = 238,["116"] = 239,["117"] = 240,["118"] = 241,["119"] = 241,["121"] = 242,["122"] = 242,["123"] = 242,["124"] = 242,["125"] = 242,["126"] = 242,["127"] = 242,["128"] = 242,["129"] = 243,["130"] = 243,["132"] = 244,["133"] = 245,["134"] = 246,["135"] = 247,["136"] = 248,["137"] = 249,["138"] = 250,["139"] = 250,["141"] = 251,["142"] = 252,["143"] = 252,["144"] = 253,["145"] = 253,["149"] = 256,["150"] = 257,["151"] = 258,["152"] = 259,["153"] = 259,["155"] = 260,["156"] = 260,["157"] = 261,["158"] = 261,["159"] = 261,["160"] = 262,["161"] = 263,["162"] = 263,["164"] = 264,["165"] = 238,["167"] = 29,["168"] = 29,["169"] = 29,["170"] = 36,["171"] = 36,["172"] = 36,["173"] = 30,["174"] = 31,["175"] = 32,["176"] = 33,["177"] = 34,["178"] = 35,["179"] = 36,["180"] = 37,["181"] = 37,["182"] = 37,["183"] = 37,["184"] = 37,["185"] = 37,["186"] = 39,["187"] = 39,["188"] = 39,["189"] = 41,["190"] = 41,["191"] = 41,["192"] = 41,["194"] = 41,["195"] = 43,["197"] = 43,["198"] = 43,["200"] = 43,["201"] = 43,["202"] = 43,["203"] = 43,["205"] = 43,["206"] = 43,["207"] = 44,["208"] = 45,["209"] = 46,["210"] = 46,["211"] = 46,["214"] = 47,["215"] = 47,["216"] = 47,["217"] = 48,["218"] = 48,["219"] = 48,["220"] = 48,["221"] = 49,["222"] = 50,["223"] = 51,["225"] = 52,["226"] = 52,["228"] = 53,["229"] = 55,["230"] = 55,["231"] = 55,["232"] = 55,["233"] = 55,["238"] = 58,["239"] = 44,["240"] = 60,["241"] = 61,["244"] = 62,["245"] = 63,["246"] = 63,["247"] = 63,["250"] = 64,["251"] = 65,["254"] = 66,["255"] = 66,["257"] = 68,["258"] = 68,["259"] = 68,["260"] = 68,["263"] = 69,["264"] = 69,["265"] = 70,["266"] = 71,["267"] = 71,["269"] = 69,["271"] = 73,["273"] = 75,["275"] = 76,["276"] = 76,["278"] = 77,["279"] = 77,["280"] = 78,["281"] = 78,["283"] = 79,["284"] = 80,["285"] = 81,["287"] = 82,["288"] = 82,["289"] = 83,["290"] = 84,["291"] = 84,["292"] = 85,["293"] = 86,["294"] = 86,["295"] = 86,["297"] = 82,["300"] = 88,["303"] = 76,["306"] = 90,["309"] = 91,["310"] = 91,["311"] = 91,["312"] = 91,["313"] = 92,["314"] = 92,["315"] = 92,["316"] = 92,["317"] = 93,["319"] = 94,["320"] = 94,["322"] = 94,["323"] = 94,["324"] = 94,["325"] = 94,["327"] = 95,["328"] = 95,["330"] = 60,["332"] = 101,["333"] = 102,["334"] = 101,["335"] = 102,["337"] = 102,["338"] = 103,["339"] = 106,["340"] = 107,["341"] = 101,["342"] = 109,["343"] = 110,["344"] = 111,["345"] = 112,["346"] = 113,["347"] = 114,["348"] = 115,["349"] = 116,["350"] = 109,["351"] = 118,["352"] = 119,["353"] = 120,["354"] = 120,["356"] = 120,["359"] = 118,["360"] = 122,["361"] = 123,["362"] = 124,["365"] = 125,["368"] = 157,["369"] = 157,["370"] = 157,["371"] = 157,["372"] = 157,["373"] = 157,["376"] = 127,["377"] = 128,["378"] = 129,["379"] = 129,["380"] = 129,["381"] = 129,["382"] = 130,["383"] = 130,["384"] = 130,["385"] = 130,["386"] = 130,["387"] = 130,["388"] = 130,["389"] = 129,["390"] = 131,["391"] = 132,["392"] = 133,["393"] = 129,["394"] = 135,["395"] = 136,["396"] = 137,["397"] = 137,["398"] = 138,["399"] = 139,["400"] = 139,["401"] = 139,["403"] = 139,["405"] = 136,["406"] = 136,["407"] = 136,["408"] = 136,["409"] = 136,["410"] = 136,["411"] = 136,["412"] = 141,["413"] = 129,["414"] = 143,["415"] = 143,["416"] = 143,["417"] = 129,["418"] = 144,["419"] = 145,["420"] = 145,["421"] = 145,["424"] = 129,["425"] = 129,["426"] = 129,["427"] = 148,["428"] = 149,["429"] = 150,["430"] = 150,["431"] = 150,["432"] = 151,["437"] = 153,["438"] = 153,["439"] = 153,["440"] = 153,["441"] = 153,["442"] = 153,["443"] = 153,["446"] = 152,["447"] = 152,["454"] = 152,["457"] = 154,["458"] = 154,["460"] = 150,["461"] = 150,["467"] = 122,["468"] = 160,["469"] = 161,["470"] = 161,["471"] = 161,["472"] = 161,["473"] = 161,["474"] = 161,["475"] = 161,["476"] = 161,["477"] = 161,["479"] = 160,["480"] = 163,["481"] = 164,["484"] = 165,["485"] = 166,["486"] = 166,["487"] = 166,["488"] = 166,["489"] = 167,["490"] = 168,["491"] = 168,["494"] = 163,["495"] = 171,["496"] = 172,["497"] = 172,["498"] = 172,["500"] = 173,["502"] = 173,["504"] = 173,["505"] = 171,["506"] = 175,["507"] = 176,["510"] = 177,["511"] = 178,["512"] = 178,["513"] = 178,["514"] = 179,["515"] = 179,["516"] = 179,["519"] = 175,["520"] = 182,["521"] = 182,["522"] = 182,["524"] = 182,["525"] = 184,["526"] = 185,["527"] = 186,["528"] = 187,["529"] = 188,["530"] = 189,["531"] = 190,["532"] = 190,["533"] = 190,["535"] = 192,["536"] = 192,["538"] = 193,["540"] = 195,["541"] = 184,["542"] = 101,["543"] = 102,["544"] = 200,["545"] = 200});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 每局重新读取原版 KV；保留当前 38 波实际使用的字段和默认值。
function ____exports.LoadWaves(self)
    local rounds = LoadKeyValues("scripts/npc/kv/gameplay/round.kv")
    local groups = LoadKeyValues("scripts/npc/kv/gameplay/spawner_group.kv")
    local result = {}
    for ____, key in ipairs(__TS__ObjectKeys(rounds)) do
        do
            local data = rounds[key]
            if type(data) ~= "table" then
                goto __continue81
            end
            local group = groups[tostring(data.SpawnerGroupID)]
            if not group then
                error(
                    "波次刷怪组不存在：" .. tostring(data.SpawnerGroupID),
                    0
                )
            end
            local spawners = {}
            for ____, name in ipairs(__TS__ObjectKeys(group)) do
                do
                    local spawn = group[name]
                    if type(spawn) ~= "table" or not spawn.NPCName then
                        goto __continue84
                    end
                    if not KeyValues.units[spawn.NPCName] or spawn.ChampionNPCName and not KeyValues.units[spawn.ChampionNPCName] or not IsValid(Entities:FindByName(nil, spawn.SpawnerName)) then
                        error(
                            (("刷怪配置或锚点不存在：" .. tostring(spawn.NPCName)) .. "/") .. tostring(spawn.SpawnerName),
                            0
                        )
                    end
                    local total = tonumber(spawn.TotalUnitsToSpawn) or 0
                    local batch = tonumber(spawn.UnitsPerSpawn) or 1
                    if total <= 0 or total % 1 ~= 0 or batch <= 0 or batch % 1 ~= 0 then
                        error((("刷怪数量配置无效：" .. key) .. "/") .. name, 0)
                    end
                    spawners[#spawners + 1] = {
                        unit = spawn.NPCName,
                        anchor = spawn.SpawnerName,
                        total = total,
                        batch = batch,
                        interval = math.max(
                            0,
                            tonumber(spawn.SpawnInterval) or 0
                        ),
                        wait = math.max(
                            0,
                            tonumber(spawn.WaitForTime) or 0
                        ),
                        level = tonumber(spawn.CreatureLevel) or 0,
                        championUnit = spawn.ChampionNPCName,
                        championChance = tonumber(spawn.ChampionChance) or 0,
                        championMax = tonumber(spawn.ChampionMax) or 1,
                        championIntervalMax = tonumber(spawn.ChampionIntervalMax) or 999,
                        championLevel = tonumber(spawn.ChampionBonusLevel) or 0,
                        championScale = tonumber(spawn.ChampionBonusModelScale) or 1
                    }
                end
                ::__continue84::
            end
            if #spawners == 0 then
                error("波次没有刷怪配置：" .. key, 0)
            end
            local number = tonumber(data.RoundNumber) or 0
            if number <= 0 or number % 1 ~= 0 or __TS__ArraySome(
                result,
                function(____, wave) return wave.number == number end
            ) then
                error("波次编号无效或重复：" .. key, 0)
            end
            local duration = (tonumber(data.TimedRound) or 0) ~= 0 and (tonumber(data.TimedRoundDuration) or 60) or nil
            if duration ~= nil and duration <= 0 then
                error("定时波次时长无效：" .. key, 0)
            end
            result[#result + 1] = {
                number = number,
                prepare = math.max(
                    0,
                    tonumber(data.PrepareRoundTime) or 0
                ),
                duration = duration,
                sound = data.SoundName,
                spawners = spawners
            }
        end
        ::__continue81::
    end
    if #result == 0 then
        error("缺少有效波次配置", 0)
    end
    return __TS__ArraySort(
        result,
        function(____, a, b) return a.number - b.number end
    )
end
--- 生成波次单位，沿用原版难度/波数成长、精英规则、朝向、路径目标和零引擎赏金。
function ____exports.SpawnWaveUnit(self, spawner, champion, round, runId, track)
    local name = champion and spawner.championUnit and spawner.championUnit or spawner.unit
    local anchor = Entities:FindByName(nil, spawner.anchor)
    if not IsValid(anchor) then
        error("刷怪锚点不存在：" .. spawner.anchor, 0)
    end
    local unit = CreateUnitByName(
        name,
        anchor:GetAbsOrigin(),
        true,
        nil,
        nil,
        DOTA_TEAM_BADGUYS
    )
    if not IsValid(unit) then
        error("单位创建失败：" .. name, 0)
    end
    track(nil, unit)
    unit:SetForwardVector(anchor:GetForwardVector())
    unit.iRoundNumber = round
    unit.iDefendingTeamNumber = DOTA_TEAM_GOODGUYS
    if unit:IsCreature() then
        local creature = unit
        if (spawner.level or 0) > 0 then
            creature:CreatureLevelUp(spawner.level - unit:GetLevel())
        end
        if champion then
            creature:CreatureLevelUp(spawner.championLevel or 0)
            creature:SetChampion(true)
            if not spawner.championUnit then
                unit:SetModelScale(unit:GetModelScale() + (spawner.championScale or 1))
            end
        end
    end
    local difficulty = GameRules:GetCustomGameDifficulty()
    local elite = difficulty >= 3 and (string.find(name, "wave_", nil, true) or 0) - 1 >= 0 and RollPercentage(difficulty * 2)
    unit:AddNewModifier(unit, nil, "modifier_enemy_scaling", {round_number = round})
    if unit:IsCreature() then
        unit:SetRequiresReachingEndPath(true)
    end
    unit:SetInitialGoalEntity(anchor)
    unit:SetMustReachEachGoalEntity(false)
    unit:SetDeathXP(0)
    unit:SetMaximumGoldBounty(0)
    unit:SetMinimumGoldBounty(0)
    unit:AddNewModifier(unit, nil, champion and "modifier_champion" or "modifier_wave", {round_number = round})
    if elite then
        unit:AddNewModifier(unit, nil, "modifier_elite", {round_number = round})
    end
    return unit
end
--- 只推进当前波次；全部生成且清空存活怪物才结束，定时波次也可在时限到达后结束。
____exports.RoundRunner = __TS__Class()
local RoundRunner = ____exports.RoundRunner
RoundRunner.name = "RoundRunner"
function RoundRunner.prototype.____constructor(self, waves, host)
    self.waves = waves
    self.host = host
    self.index = 0
    self.stage = "prepare"
    self.deadline = 0
    self.active = false
    self.enemies = {}
    self.spawnState = {}
end
function RoundRunner.prototype.Start(self, now)
    self:Stop()
    self.active = true
    self.index = 0
    self:Prepare(now)
end
function RoundRunner.prototype.Stop(self)
    self.active = false
end
function RoundRunner.prototype.TrackEnemy(self, entity)
    if self.active and self.stage == "battle" and __TS__ArrayIndexOf(self.enemies, entity) < 0 then
        local ____self_enemies_0 = self.enemies
        ____self_enemies_0[#____self_enemies_0 + 1] = entity
    end
end
function RoundRunner.prototype.ClearEnemies(self)
    local ____this_2
    ____this_2 = self.host
    local ____opt_1 = ____this_2.Clear
    if ____opt_1 ~= nil then
        ____opt_1(
            ____this_2,
            __TS__ArraySlice(self.enemies)
        )
    end
    self.enemies = {}
end
function RoundRunner.prototype.Prepare(self, now)
    local wave = self.waves[self.index + 1]
    if not wave then
        self.active = false
        self.host:Complete()
        return
    end
    self.stage = "prepare"
    self.deadline = now + wave.prepare
    self.enemies = {}
    self.spawnState = __TS__ArrayMap(
        wave.spawners,
        function() return {spawned = 0, champions = 0, next = 0} end
    )
    local names = {}
    for ____, spawner in ipairs(wave.spawners) do
        for ____, name in ipairs({spawner.unit, spawner.championUnit}) do
            do
                if not name or __TS__ArrayIndexOf(names, name) >= 0 then
                    goto __continue12
                end
                names[#names + 1] = name
                PrecacheUnitByNameAsync(
                    name,
                    function()
                    end
                )
            end
            ::__continue12::
        end
    end
    self.host:Publish(wave.number, self.stage, self.deadline)
end
function RoundRunner.prototype.Tick(self, now)
    if not self.active then
        return
    end
    local wave = self.waves[self.index + 1]
    if self.stage == "end" then
        self.index = self.index + 1
        self:Prepare(now)
        return
    end
    if self.stage == "prepare" then
        if now < self.deadline then
            return
        end
        self.stage = "battle"
        self.deadline = wave.duration == nil and 0 or now + wave.duration
        do
            local i = 0
            while i < #wave.spawners do
                self.spawnState[i + 1].next = now + wave.spawners[i + 1].wait
                i = i + 1
            end
        end
        if wave.sound then
            Game:EachPlayer(function(____, id)
                local player = PlayerResource:GetPlayer(id)
                if IsValid(player) then
                    EmitSoundOnClient(wave.sound, player)
                end
            end)
        end
        self.host:Publish(wave.number, self.stage, self.deadline or nil)
    end
    local expired = self.deadline > 0 and now >= self.deadline
    do
        local i = 0
        while self.active and not expired and i < #wave.spawners do
            do
                local spawner = wave.spawners[i + 1]
                local progress = self.spawnState[i + 1]
                if progress.spawned >= spawner.total or now < progress.next then
                    goto __continue28
                end
                local count = math.min(spawner.batch, spawner.total - progress.spawned)
                local champions = 0
                EmitGlobalSound("Tutorial.Quest.complete_01")
                do
                    local n = 0
                    while self.active and n < count do
                        local champion = progress.champions < (spawner.championMax or 1) and champions < (spawner.championIntervalMax or 999) and RollPercentage(spawner.championChance or 0)
                        local ____self_enemies_3 = self.enemies
                        ____self_enemies_3[#____self_enemies_3 + 1] = self.host:Spawn(spawner, champion, wave.number)
                        progress.spawned = progress.spawned + 1
                        if champion then
                            progress.champions = progress.champions + 1
                            champions = champions + 1
                        end
                        n = n + 1
                    end
                end
                progress.next = progress.next + spawner.interval
            end
            ::__continue28::
            i = i + 1
        end
    end
    if not self.active then
        return
    end
    self.enemies = __TS__ArrayFilter(
        self.enemies,
        function(____, entity) return self.host:IsAlive(entity) end
    )
    local finishedSpawning = __TS__ArrayEvery(
        wave.spawners,
        function(____, spawner, i) return self.spawnState[i + 1].spawned >= spawner.total end
    )
    if expired or finishedSpawning and #self.enemies == 0 then
        local ____this_5
        ____this_5 = self.host
        local ____opt_4 = ____this_5.Clear
        if ____opt_4 ~= nil then
            ____opt_4(
                ____this_5,
                __TS__ArraySlice(self.enemies)
            )
        end
        self.stage = "end"
        self.host:Publish(wave.number, self.stage)
    end
end
--- 与 c1 一致：玩法模块自行订阅生命周期，世界适配器不创建或调度波次。
____exports.CWaveSpawner = __TS__Class()
local CWaveSpawner = ____exports.CWaveSpawner
CWaveSpawner.name = "CWaveSpawner"
__TS__ClassExtends(CWaveSpawner, CModule)
function CWaveSpawner.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.units = {}
    self.creepsEnabled = true
end
function CWaveSpawner.prototype.init(self, reload)
    self.creepsEnabled = Demo:IsCreepsEnabled()
    Event:UnregisterContext(self)
    Event:Register("game_start", self.OnGameStart, self)
    Event:Register("game_end", self.OnGameEnd, self)
    Event:Register("game_reset", self.OnGameReset, self)
    Event:Register("npc_spawned", self.OnNPCSpawned, self)
    Event:Register("demo_creeps_changed", self.OnCreepsChanged, self)
end
function CWaveSpawner.prototype.OnCreepsChanged(self, event)
    self.creepsEnabled = event.enabled
    if not event.enabled then
        local ____opt_6 = self.runner
        if ____opt_6 ~= nil then
            ____opt_6:ClearEnemies()
        end
    end
end
function CWaveSpawner.prototype.OnGameStart(self, event)
    local session = GameState:GetSession()
    if event.runId ~= session.runId or session.state ~= "GameState_Battle" or self.runner and self.runId == event.runId then
        return
    end
    local runId = session.runId
    do
        local function ____catch(reason)
            self:Stop()
            GameState:FinishRun(
                runId,
                "error",
                tostring(reason)
            )
        end
        local ____try, ____hasReturned = pcall(function()
            self:reset()
            self.runId = runId
            local runner = __TS__New(
                ____exports.RoundRunner,
                ____exports.LoadWaves(nil),
                {
                    Spawn = function(____, spawner, champion, round) return ____exports.SpawnWaveUnit(
                        nil,
                        spawner,
                        champion,
                        round,
                        runId,
                        function(____, unit) return self:TrackUnit(unit) end
                    ):entindex() end,
                    IsAlive = function(____, index)
                        local unit = EntIndexToHScript(index)
                        return IsValid(unit) and unit:IsAlive()
                    end,
                    Publish = function(____, round, stage, deadline)
                        local ____CustomNetTables_SetNetData_12 = CustomNetTables.SetNetData
                        local ____round_9 = round
                        local ____stage_10 = stage
                        local ____temp_11 = stage == "prepare" and (deadline or 0) or 0
                        local ____temp_8
                        if stage == "battle" then
                            ____temp_8 = deadline
                        else
                            ____temp_8 = nil
                        end
                        ____CustomNetTables_SetNetData_12(CustomNetTables, "common", "round_state", {
                            round_number = ____round_9,
                            stage = ____stage_10,
                            run_id = runId,
                            prep_end_time = ____temp_11,
                            timed_round_end_time = ____temp_8
                        })
                        Event:Fire("round_state_change", {runId = runId, round_number = round, stage = stage})
                    end,
                    Complete = function()
                        self:Stop()
                        Event:Fire("waves_complete", {runId = runId})
                    end,
                    Clear = function(____, indices)
                        for ____, record in ipairs(self.units) do
                            if __TS__ArrayIndexOf(indices, record.index) >= 0 and IsValid(record.unit) then
                                UTIL_Remove(record.unit)
                            end
                        end
                    end
                }
            )
            self.runner = runner
            runner:Start(GameRules:GetGameTime())
            self.timer = Timer:GameTimer(
                0.1,
                function()
                    if self.runner ~= runner or self.runId ~= runId or GameState:GetSession().runId ~= runId or GameState:GetSession().state ~= "GameState_Battle" then
                        return
                    end
                    do
                        local function ____catch(reason)
                            self:Stop()
                            GameState:FinishRun(
                                runId,
                                "error",
                                tostring(reason)
                            )
                            return true
                        end
                        local ____try, ____hasReturned, ____returnValue = pcall(function()
                            if self.creepsEnabled then
                                runner:Tick(GameRules:GetGameTime())
                            end
                        end)
                        if not ____try then
                            ____hasReturned, ____returnValue = ____catch(____hasReturned)
                        end
                        if ____hasReturned then
                            return ____returnValue
                        end
                    end
                    if self.runner == runner then
                        return 0.1
                    end
                end
            )
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CWaveSpawner.prototype.TrackUnit(self, unit)
    if not __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_units_13 = self.units
        ____self_units_13[#____self_units_13 + 1] = {
            index = unit:entindex(),
            unit = unit
        }
    end
end
function CWaveSpawner.prototype.OnNPCSpawned(self, event)
    if not self.runner then
        return
    end
    local owner = event.unit:GetOwnerEntity()
    if IsValid(owner) and __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == owner end
    ) then
        self:TrackUnit(event.unit)
        if event.unit:GetTeamNumber() == DOTA_TEAM_BADGUYS then
            self.runner:TrackEnemy(event.unit:entindex())
        end
    end
end
function CWaveSpawner.prototype.Stop(self)
    if self.timer then
        Timer:StopTimer(self.timer)
        self.timer = nil
    end
    local ____opt_14 = self.runner
    if ____opt_14 ~= nil then
        ____opt_14:Stop()
    end
    self.runner = nil
end
function CWaveSpawner.prototype.OnGameEnd(self, event)
    if event.run_id ~= self.runId then
        return
    end
    self:Stop()
    for ____, ____value in ipairs(self.units) do
        local unit = ____value.unit
        if IsValid(unit) then
            unit:Stop()
            unit:AddNewModifier(unit, nil, "modifier_invulnerable", {})
            unit:AddNewModifier(unit, nil, "modifier_stunned", {})
        end
    end
end
function CWaveSpawner.prototype.OnGameReset(self, event)
    if event.runId == self.runId then
        self:reset()
    end
end
function CWaveSpawner.prototype.reset(self)
    self:Stop()
    while #self.units > 0 do
        local record = self.units[#self.units]
        local current = EntIndexToHScript(record.index)
        if not IsValid(current) or current == record.unit then
            PropertySystem:CleanupUnitPropertiesByIndex(record.index)
            StateSystem:CleanupUnitStatesByIndex(record.index)
            AbilityUpgrade:CleanupUnitUpgrades(record.index)
        end
        if IsValid(record.unit) then
            UTIL_Remove(record.unit)
        end
        table.remove(self.units)
    end
    CustomNetTables:SetNetData("common", "round_state", nil)
end
CWaveSpawner = __TS__DecorateLegacy({reloadable}, CWaveSpawner)
____exports.CWaveSpawner = CWaveSpawner
if WaveSpawning == nil then
    WaveSpawning = __TS__New(____exports.CWaveSpawner)
end
return ____exports
