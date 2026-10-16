local __TSTL_FILE_PATH__ = "mechanics/neutral_spawners"
local ____lualib = require("lualib_bundle")
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 1,["19"] = 1,["21"] = 20,["22"] = 21,["23"] = 22,["24"] = 22,["26"] = 23,["27"] = 23,["28"] = 23,["29"] = 23,["30"] = 24,["31"] = 24,["32"] = 24,["33"] = 24,["34"] = 24,["36"] = 25,["37"] = 20,["39"] = 29,["40"] = 30,["41"] = 29,["42"] = 30,["44"] = 30,["45"] = 31,["46"] = 32,["47"] = 33,["48"] = 34,["49"] = 35,["50"] = 29,["51"] = 37,["52"] = 38,["53"] = 39,["54"] = 40,["55"] = 41,["56"] = 42,["57"] = 43,["58"] = 37,["59"] = 46,["60"] = 46,["61"] = 46,["62"] = 46,["63"] = 46,["64"] = 46,["65"] = 46,["66"] = 47,["67"] = 48,["68"] = 49,["69"] = 50,["71"] = 51,["72"] = 52,["73"] = 52,["75"] = 53,["77"] = 54,["78"] = 55,["79"] = 55,["81"] = 56,["82"] = 56,["83"] = 56,["84"] = 56,["85"] = 56,["88"] = 56,["92"] = 57,["93"] = 58,["95"] = 58,["99"] = 60,["100"] = 60,["101"] = 60,["102"] = 60,["104"] = 60,["105"] = 60,["106"] = 61,["107"] = 61,["108"] = 61,["109"] = 61,["110"] = 61,["111"] = 61,["112"] = 61,["113"] = 61,["114"] = 62,["115"] = 62,["116"] = 62,["117"] = 62,["119"] = 59,["120"] = 59,["121"] = 59,["122"] = 59,["123"] = 59,["124"] = 59,["125"] = 59,["126"] = 59,["127"] = 62,["128"] = 62,["129"] = 62,["130"] = 59,["131"] = 59,["132"] = 59,["133"] = 59,["134"] = 59,["135"] = 59,["142"] = 68,["143"] = 68,["145"] = 69,["146"] = 47,["147"] = 71,["148"] = 72,["149"] = 73,["152"] = 74,["155"] = 97,["156"] = 97,["157"] = 97,["158"] = 97,["159"] = 97,["160"] = 97,["163"] = 76,["164"] = 76,["165"] = 77,["166"] = 77,["167"] = 77,["168"] = 78,["169"] = 79,["170"] = 80,["171"] = 81,["173"] = 82,["174"] = 82,["176"] = 83,["177"] = 85,["178"] = 85,["179"] = 85,["180"] = 85,["181"] = 85,["185"] = 87,["186"] = 87,["187"] = 87,["188"] = 87,["189"] = 88,["194"] = 93,["195"] = 93,["196"] = 93,["197"] = 93,["198"] = 93,["199"] = 93,["200"] = 93,["203"] = 91,["204"] = 91,["205"] = 91,["206"] = 91,["207"] = 92,["208"] = 92,["215"] = 89,["218"] = 94,["219"] = 94,["221"] = 87,["222"] = 87,["229"] = 71,["230"] = 99,["232"] = 100,["233"] = 100,["234"] = 101,["235"] = 102,["236"] = 103,["237"] = 103,["238"] = 103,["239"] = 103,["240"] = 103,["241"] = 103,["242"] = 103,["243"] = 103,["244"] = 104,["245"] = 104,["247"] = 105,["248"] = 105,["249"] = 105,["250"] = 106,["251"] = 107,["252"] = 107,["254"] = 108,["256"] = 110,["257"] = 110,["258"] = 111,["259"] = 112,["260"] = 113,["261"] = 114,["262"] = 114,["263"] = 114,["264"] = 100,["267"] = 99,["268"] = 117,["269"] = 118,["270"] = 118,["271"] = 118,["272"] = 118,["273"] = 118,["274"] = 118,["275"] = 118,["276"] = 118,["277"] = 118,["279"] = 117,["280"] = 120,["281"] = 121,["284"] = 122,["285"] = 123,["286"] = 124,["287"] = 124,["291"] = 120,["292"] = 128,["293"] = 129,["296"] = 130,["297"] = 131,["298"] = 131,["299"] = 131,["300"] = 131,["301"] = 131,["303"] = 128,["304"] = 133,["305"] = 134,["306"] = 135,["307"] = 135,["309"] = 136,["310"] = 133,["311"] = 138,["312"] = 139,["315"] = 140,["316"] = 141,["317"] = 141,["318"] = 141,["319"] = 142,["320"] = 142,["321"] = 142,["324"] = 138,["325"] = 145,["326"] = 145,["327"] = 145,["329"] = 145,["330"] = 147,["331"] = 148,["332"] = 149,["333"] = 150,["334"] = 151,["335"] = 152,["336"] = 153,["337"] = 153,["338"] = 153,["340"] = 155,["341"] = 155,["343"] = 156,["345"] = 158,["346"] = 147,["347"] = 29,["348"] = 30,["349"] = 163,["350"] = 163});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 原版支持地图实体名和逗号分隔坐标；ForwardVector 也使用同一种写法。
local function ResolveVector(self, value)
    local entity = Entities:FindByName(nil, value)
    if IsValid(entity) then
        return entity:GetAbsOrigin()
    end
    local parts = __TS__ArrayMap(
        __TS__StringSplit(value, ","),
        function(____, part) return tonumber(part) end
    )
    if #parts == 3 and __TS__ArrayEvery(
        parts,
        function(____, part) return part ~= nil end
    ) then
        return Vector(parts[1], parts[2], parts[3])
    end
    error("野怪刷新位置或向量无效：" .. value, 0)
end
--- 野怪模块自行订阅 Event，持有计时器、预载和实体，不依赖世界适配器。
____exports.CNeutralSpawners = __TS__Class()
local CNeutralSpawners = ____exports.CNeutralSpawners
CNeutralSpawners.name = "CNeutralSpawners"
__TS__ClassExtends(CNeutralSpawners, CModule)
function CNeutralSpawners.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.camps = {}
    self.timers = {}
    self.units = {}
end
function CNeutralSpawners.prototype.init(self, reload)
    Event:UnregisterContext(self)
    Event:Register("game_start", self.OnGameStart, self)
    Event:Register("game_end", self.OnGameEnd, self)
    Event:Register("game_reset", self.OnGameReset, self)
    Event:Register("entity_killed", self.OnEntityKilled, self)
    Event:Register("npc_spawned", self.OnNPCSpawned, self)
end
function CNeutralSpawners.prototype.GetLevel(self, unitName)
    local ____opt_0 = __TS__ArrayFind(
        self.camps,
        function(____, camp) return camp.unit == unitName end
    )
    return ____opt_0 and ____opt_0.level
end
function CNeutralSpawners.prototype.LoadCamps(self)
    local data = LoadKeyValues("scripts/npc/kv/gameplay/neutral_spawners.kv")
    local camps = {}
    for ____, groupName in ipairs(__TS__ObjectKeys(data)) do
        do
            local group = data[groupName]
            if type(group) ~= "table" or not group then
                goto __continue11
            end
            for ____, name in ipairs(__TS__ObjectKeys(group)) do
                do
                    local spawn = group[name]
                    if type(spawn) ~= "table" or not spawn or not spawn.NPCName then
                        goto __continue13
                    end
                    if not KeyValues.units[spawn.NPCName] or spawn.EliteName and not KeyValues.units[spawn.EliteName] then
                        local ____spawn_NPCName_3 = spawn.NPCName
                        local ____spawn_EliteName_2 = spawn.EliteName
                        if ____spawn_EliteName_2 == nil then
                            ____spawn_EliteName_2 = ""
                        end
                        error(
                            (("野怪单位配置不存在：" .. tostring(____spawn_NPCName_3)) .. "/") .. tostring(____spawn_EliteName_2),
                            0
                        )
                    end
                    local count = tonumber(spawn.TotalUnitsToSpawn) or 0
                    if count <= 0 or count % 1 ~= 0 then
                        error(
                            "野怪刷新数量无效：" .. tostring(spawn.NPCName),
                            0
                        )
                    end
                    local ____spawn_NPCName_7 = spawn.NPCName
                    local ____spawn_EliteName_4 = spawn.EliteName
                    if ____spawn_EliteName_4 == nil then
                        ____spawn_EliteName_4 = ""
                    end
                    local ____temp_8 = tonumber(spawn.EliteChance) or 0
                    local ____count_9 = count
                    local ____math_max_result_10 = math.max(
                        0,
                        tonumber(spawn.WaitForTime) or 0
                    )
                    local ____math_max_result_11 = math.max(
                        0,
                        tonumber(spawn.SpawnInterval) or 0
                    )
                    local ____ResolveVector_6 = ResolveVector
                    local ____spawn_SpawnerName_5 = spawn.SpawnerName
                    if ____spawn_SpawnerName_5 == nil then
                        ____spawn_SpawnerName_5 = ""
                    end
                    camps[#camps + 1] = {
                        unit = ____spawn_NPCName_7,
                        elite = ____spawn_EliteName_4,
                        eliteChance = ____temp_8,
                        count = ____count_9,
                        wait = ____math_max_result_10,
                        interval = ____math_max_result_11,
                        position = ____ResolveVector_6(nil, ____spawn_SpawnerName_5),
                        offset = math.max(
                            0,
                            tonumber(spawn.SpawnOffset) or 0
                        ),
                        forward = spawn.ForwardVector and ResolveVector(nil, spawn.ForwardVector) or nil,
                        grow = tonumber(spawn.GrowUp) == 1,
                        level = 1,
                        remaining = {}
                    }
                end
                ::__continue13::
            end
        end
        ::__continue11::
    end
    if #camps == 0 then
        error("缺少有效野怪刷新配置", 0)
    end
    return camps
end
function CNeutralSpawners.prototype.OnGameStart(self, event)
    local session = GameState:GetSession()
    if event.runId ~= session.runId or session.state ~= "GameState_Battle" or self.running and self.runId == event.runId then
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
            local ____temp_12 = self:LoadCamps()
            self.camps = ____temp_12
            local camps = ____temp_12
            self.running = true
            local names = {}
            for ____, camp in ipairs(camps) do
                for ____, name in ipairs({camp.unit, camp.elite}) do
                    do
                        if name == "" or __TS__ArrayIndexOf(names, name) >= 0 then
                            goto __continue24
                        end
                        names[#names + 1] = name
                        PrecacheUnitByNameAsync(
                            name,
                            function()
                            end
                        )
                    end
                    ::__continue24::
                end
                local ____self_timers_13 = self.timers
                ____self_timers_13[#____self_timers_13 + 1] = Timer:GameTimer(
                    camp.wait,
                    function()
                        if not self.running or self.camps ~= camps or GameState:GetSession().runId ~= runId or GameState:GetSession().state ~= "GameState_Battle" then
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
                                camp.remaining = __TS__ArrayFilter(
                                    camp.remaining,
                                    function(____, unit) return IsValid(unit) and unit:IsAlive() end
                                )
                                if #camp.remaining == 0 then
                                    self:SpawnCamp(camp)
                                end
                            end)
                            if not ____try then
                                ____hasReturned, ____returnValue = ____catch(____hasReturned)
                            end
                            if ____hasReturned then
                                return ____returnValue
                            end
                        end
                        if self.running and self.camps == camps then
                            return camp.interval
                        end
                    end
                )
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CNeutralSpawners.prototype.SpawnCamp(self, camp)
    do
        local i = 0
        while self.running and i < camp.count do
            local name = camp.elite ~= "" and RollPercentage(camp.eliteChance) and camp.elite or camp.unit
            local position = camp.position + RandomVector(RandomFloat(0, camp.offset))
            local unit = CreateUnitByName(
                name,
                position,
                true,
                nil,
                nil,
                DOTA_TEAM_BADGUYS
            )
            if not IsValid(unit) then
                error("野怪单位创建失败：" .. name, 0)
            end
            self:TrackUnit(unit)
            local ____camp_remaining_14 = camp.remaining
            ____camp_remaining_14[#____camp_remaining_14 + 1] = unit
            if camp.grow then
                if unit:IsCreature() then
                    unit:CreatureLevelUp(camp.level - 1)
                end
                camp.level = camp.level + 1
            end
            local ____opt_15 = CustomNetTables:GetNetData("common", "round_state")
            local round = ____opt_15 and ____opt_15.round_number or 1
            unit:AddNewModifier(unit, nil, "modifier_enemy_scaling", {round_number = round})
            unit:SetForwardVector(camp.forward or RandomVector(1))
            unit:AddNewModifier(unit, nil, "modifier_neutral", {})
            unit:SetDeathXP(0)
            unit:SetMaximumGoldBounty(0)
            unit:SetMinimumGoldBounty(0)
            i = i + 1
        end
    end
end
function CNeutralSpawners.prototype.TrackUnit(self, unit)
    if not __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_units_17 = self.units
        ____self_units_17[#____self_units_17 + 1] = {
            index = unit:entindex(),
            unit = unit
        }
    end
end
function CNeutralSpawners.prototype.OnEntityKilled(self, event)
    if not self.running then
        return
    end
    for ____, camp in ipairs(self.camps) do
        local index = __TS__ArrayIndexOf(camp.remaining, event.victim)
        if index >= 0 then
            __TS__ArraySplice(camp.remaining, index, 1)
            return
        end
    end
end
function CNeutralSpawners.prototype.OnNPCSpawned(self, event)
    if not self.running then
        return
    end
    local owner = event.unit:GetOwnerEntity()
    if IsValid(owner) and __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == owner end
    ) then
        self:TrackUnit(event.unit)
    end
end
function CNeutralSpawners.prototype.Stop(self)
    self.running = false
    for ____, timer in ipairs(self.timers) do
        Timer:StopTimer(timer)
    end
    self.timers = {}
end
function CNeutralSpawners.prototype.OnGameEnd(self, event)
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
function CNeutralSpawners.prototype.OnGameReset(self, event)
    if event.runId == self.runId then
        self:reset()
    end
end
function CNeutralSpawners.prototype.reset(self)
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
    self.camps = {}
end
CNeutralSpawners = __TS__DecorateLegacy({reloadable}, CNeutralSpawners)
____exports.CNeutralSpawners = CNeutralSpawners
if NeutralSpawners == nil then
    NeutralSpawners = __TS__New(____exports.CNeutralSpawners)
end
return ____exports
