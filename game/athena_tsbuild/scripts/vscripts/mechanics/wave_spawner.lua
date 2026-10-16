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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 1,["18"] = 1,["20"] = 211,["21"] = 212,["22"] = 213,["23"] = 214,["24"] = 215,["26"] = 216,["27"] = 216,["28"] = 216,["30"] = 217,["31"] = 218,["33"] = 218,["37"] = 219,["38"] = 220,["40"] = 221,["41"] = 221,["42"] = 221,["44"] = 222,["46"] = 222,["50"] = 223,["51"] = 223,["52"] = 224,["53"] = 224,["55"] = 225,["56"] = 225,["57"] = 225,["58"] = 225,["59"] = 225,["60"] = 227,["61"] = 227,["62"] = 227,["63"] = 225,["64"] = 227,["65"] = 227,["66"] = 227,["67"] = 225,["68"] = 225,["69"] = 225,["70"] = 225,["71"] = 225,["72"] = 225,["73"] = 225,["74"] = 225,["75"] = 225,["79"] = 234,["80"] = 234,["82"] = 235,["83"] = 236,["84"] = 236,["85"] = 236,["86"] = 236,["87"] = 236,["89"] = 237,["90"] = 238,["91"] = 238,["93"] = 239,["94"] = 239,["95"] = 239,["96"] = 239,["97"] = 239,["98"] = 239,["99"] = 239,["100"] = 239,["101"] = 239,["102"] = 239,["106"] = 241,["107"] = 241,["109"] = 242,["110"] = 242,["111"] = 242,["112"] = 242,["113"] = 211,["115"] = 246,["116"] = 247,["117"] = 248,["118"] = 249,["119"] = 249,["121"] = 250,["122"] = 250,["123"] = 250,["124"] = 250,["125"] = 250,["126"] = 250,["127"] = 250,["128"] = 250,["129"] = 251,["130"] = 251,["132"] = 252,["133"] = 253,["134"] = 254,["135"] = 255,["136"] = 256,["137"] = 257,["138"] = 258,["139"] = 258,["141"] = 259,["142"] = 260,["143"] = 260,["144"] = 261,["145"] = 261,["149"] = 264,["150"] = 265,["151"] = 266,["152"] = 267,["153"] = 267,["155"] = 268,["156"] = 268,["157"] = 269,["158"] = 269,["159"] = 269,["160"] = 270,["161"] = 271,["162"] = 271,["164"] = 272,["165"] = 246,["167"] = 29,["168"] = 29,["169"] = 29,["170"] = 37,["171"] = 37,["172"] = 37,["173"] = 30,["174"] = 31,["175"] = 32,["176"] = 33,["177"] = 34,["178"] = 35,["179"] = 36,["180"] = 37,["181"] = 38,["182"] = 38,["183"] = 38,["184"] = 38,["185"] = 38,["186"] = 38,["187"] = 40,["188"] = 40,["189"] = 40,["190"] = 40,["191"] = 42,["192"] = 42,["193"] = 42,["194"] = 42,["196"] = 42,["197"] = 44,["199"] = 44,["200"] = 44,["202"] = 44,["203"] = 44,["204"] = 44,["205"] = 44,["207"] = 44,["208"] = 44,["209"] = 45,["210"] = 46,["211"] = 46,["213"] = 47,["214"] = 45,["215"] = 49,["216"] = 50,["217"] = 51,["218"] = 51,["219"] = 51,["222"] = 52,["223"] = 52,["224"] = 52,["225"] = 53,["226"] = 53,["227"] = 53,["228"] = 53,["229"] = 54,["230"] = 55,["231"] = 56,["233"] = 57,["234"] = 57,["236"] = 58,["237"] = 59,["238"] = 59,["239"] = 59,["240"] = 60,["241"] = 61,["242"] = 61,["243"] = 61,["245"] = 62,["247"] = 59,["248"] = 59,["253"] = 66,["254"] = 49,["255"] = 68,["256"] = 69,["259"] = 70,["260"] = 71,["261"] = 71,["262"] = 71,["265"] = 72,["266"] = 73,["269"] = 74,["270"] = 74,["272"] = 76,["273"] = 76,["274"] = 76,["275"] = 76,["278"] = 77,["279"] = 77,["280"] = 78,["281"] = 79,["282"] = 79,["284"] = 77,["286"] = 81,["288"] = 83,["290"] = 84,["291"] = 84,["293"] = 85,["294"] = 85,["295"] = 86,["296"] = 86,["298"] = 87,["299"] = 88,["300"] = 89,["302"] = 90,["303"] = 90,["304"] = 91,["305"] = 92,["306"] = 92,["307"] = 93,["308"] = 94,["309"] = 94,["310"] = 94,["312"] = 90,["315"] = 96,["318"] = 84,["321"] = 98,["324"] = 99,["325"] = 99,["326"] = 99,["327"] = 99,["328"] = 100,["329"] = 100,["330"] = 100,["331"] = 100,["332"] = 101,["334"] = 102,["335"] = 102,["337"] = 102,["338"] = 102,["339"] = 102,["340"] = 102,["342"] = 103,["343"] = 103,["344"] = 103,["346"] = 68,["348"] = 109,["349"] = 110,["350"] = 109,["351"] = 110,["353"] = 110,["354"] = 111,["355"] = 114,["356"] = 115,["357"] = 109,["358"] = 117,["359"] = 118,["360"] = 119,["361"] = 120,["362"] = 121,["363"] = 122,["364"] = 123,["365"] = 124,["366"] = 117,["367"] = 126,["368"] = 127,["369"] = 128,["370"] = 128,["372"] = 128,["375"] = 126,["376"] = 130,["377"] = 131,["378"] = 132,["381"] = 133,["384"] = 165,["385"] = 165,["386"] = 165,["387"] = 165,["388"] = 165,["389"] = 165,["392"] = 135,["393"] = 136,["394"] = 137,["395"] = 137,["396"] = 137,["397"] = 137,["398"] = 138,["399"] = 138,["400"] = 138,["401"] = 138,["402"] = 138,["403"] = 138,["404"] = 138,["405"] = 137,["406"] = 139,["407"] = 140,["408"] = 141,["409"] = 137,["410"] = 143,["411"] = 144,["412"] = 145,["413"] = 145,["414"] = 146,["415"] = 147,["416"] = 147,["417"] = 147,["419"] = 147,["421"] = 144,["422"] = 144,["423"] = 144,["424"] = 144,["425"] = 144,["426"] = 144,["427"] = 144,["428"] = 149,["429"] = 137,["430"] = 151,["431"] = 151,["432"] = 151,["433"] = 137,["434"] = 152,["435"] = 153,["436"] = 153,["437"] = 153,["440"] = 137,["441"] = 137,["442"] = 137,["443"] = 156,["444"] = 157,["445"] = 158,["446"] = 158,["447"] = 158,["448"] = 159,["453"] = 161,["454"] = 161,["455"] = 161,["456"] = 161,["457"] = 161,["458"] = 161,["459"] = 161,["462"] = 160,["463"] = 160,["470"] = 160,["473"] = 162,["474"] = 162,["476"] = 158,["477"] = 158,["483"] = 130,["484"] = 168,["485"] = 169,["486"] = 169,["487"] = 169,["488"] = 169,["489"] = 169,["490"] = 169,["491"] = 169,["492"] = 169,["493"] = 169,["495"] = 168,["496"] = 171,["497"] = 172,["500"] = 173,["501"] = 174,["502"] = 174,["503"] = 174,["504"] = 174,["505"] = 175,["506"] = 176,["507"] = 176,["510"] = 171,["511"] = 179,["512"] = 180,["513"] = 180,["514"] = 180,["516"] = 181,["518"] = 181,["520"] = 181,["521"] = 179,["522"] = 183,["523"] = 184,["526"] = 185,["527"] = 186,["528"] = 186,["529"] = 186,["530"] = 187,["531"] = 187,["532"] = 187,["535"] = 183,["536"] = 190,["537"] = 190,["538"] = 190,["540"] = 190,["541"] = 192,["542"] = 193,["543"] = 194,["544"] = 195,["545"] = 196,["546"] = 197,["547"] = 198,["548"] = 198,["549"] = 198,["551"] = 200,["552"] = 200,["554"] = 201,["556"] = 203,["557"] = 192,["558"] = 109,["559"] = 110,["560"] = 208,["561"] = 208});
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
                goto __continue86
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
                        goto __continue89
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
                ::__continue89::
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
        ::__continue86::
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
    self.spawnGroups = {}
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
    self:Unload()
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
function RoundRunner.prototype.Unload(self)
    for ____, group in ipairs(self.spawnGroups) do
        UnloadSpawnGroupByHandle(group)
    end
    self.spawnGroups = {}
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
                    goto __continue15
                end
                names[#names + 1] = name
                PrecacheUnitByNameAsync(
                    name,
                    function(handle)
                        local group = handle
                        if self.active and self.waves[self.index + 1] == wave and self.stage ~= "end" then
                            local ____self_spawnGroups_3 = self.spawnGroups
                            ____self_spawnGroups_3[#____self_spawnGroups_3 + 1] = group
                        else
                            UnloadSpawnGroupByHandle(group)
                        end
                    end
                )
            end
            ::__continue15::
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
                    goto __continue33
                end
                local count = math.min(spawner.batch, spawner.total - progress.spawned)
                local champions = 0
                EmitGlobalSound("Tutorial.Quest.complete_01")
                do
                    local n = 0
                    while self.active and n < count do
                        local champion = progress.champions < (spawner.championMax or 1) and champions < (spawner.championIntervalMax or 999) and RollPercentage(spawner.championChance or 0)
                        local ____self_enemies_4 = self.enemies
                        ____self_enemies_4[#____self_enemies_4 + 1] = self.host:Spawn(spawner, champion, wave.number)
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
            ::__continue33::
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
        local ____this_6
        ____this_6 = self.host
        local ____opt_5 = ____this_6.Clear
        if ____opt_5 ~= nil then
            ____opt_5(
                ____this_6,
                __TS__ArraySlice(self.enemies)
            )
        end
        self.stage = "end"
        self:Unload()
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
        local ____opt_7 = self.runner
        if ____opt_7 ~= nil then
            ____opt_7:ClearEnemies()
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
                        local ____CustomNetTables_SetNetData_13 = CustomNetTables.SetNetData
                        local ____round_10 = round
                        local ____stage_11 = stage
                        local ____temp_12 = stage == "prepare" and (deadline or 0) or 0
                        local ____temp_9
                        if stage == "battle" then
                            ____temp_9 = deadline
                        else
                            ____temp_9 = nil
                        end
                        ____CustomNetTables_SetNetData_13(CustomNetTables, "common", "round_state", {
                            round_number = ____round_10,
                            stage = ____stage_11,
                            run_id = runId,
                            prep_end_time = ____temp_12,
                            timed_round_end_time = ____temp_9
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
        local ____self_units_14 = self.units
        ____self_units_14[#____self_units_14 + 1] = {
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
    local ____opt_15 = self.runner
    if ____opt_15 ~= nil then
        ____opt_15:Stop()
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
