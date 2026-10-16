local __TSTL_FILE_PATH__ = "mechanics/special_spawner"
local ____lualib = require("lualib_bundle")
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayEvery = ____lualib.__TS__ArrayEvery
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__New = ____lualib.__TS__New
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 1,["19"] = 1,["20"] = 2,["21"] = 2,["23"] = 15,["24"] = 16,["25"] = 17,["26"] = 17,["28"] = 18,["29"] = 18,["30"] = 18,["31"] = 18,["32"] = 19,["33"] = 19,["34"] = 19,["35"] = 19,["36"] = 19,["38"] = 20,["39"] = 15,["41"] = 24,["42"] = 25,["43"] = 24,["44"] = 25,["46"] = 25,["47"] = 26,["48"] = 27,["49"] = 28,["50"] = 29,["51"] = 30,["52"] = 31,["53"] = 32,["54"] = 24,["55"] = 35,["56"] = 36,["57"] = 37,["58"] = 38,["59"] = 39,["60"] = 40,["61"] = 41,["62"] = 42,["63"] = 43,["64"] = 35,["65"] = 45,["66"] = 46,["67"] = 47,["72"] = 80,["73"] = 80,["74"] = 80,["75"] = 80,["76"] = 80,["77"] = 80,["80"] = 49,["81"] = 49,["82"] = 51,["83"] = 51,["84"] = 51,["85"] = 51,["86"] = 51,["87"] = 51,["88"] = 51,["89"] = 53,["90"] = 53,["92"] = 54,["93"] = 55,["94"] = 56,["96"] = 57,["97"] = 58,["98"] = 58,["100"] = 59,["101"] = 60,["102"] = 61,["103"] = 62,["104"] = 62,["106"] = 63,["107"] = 64,["108"] = 64,["111"] = 66,["112"] = 67,["113"] = 68,["114"] = 68,["115"] = 68,["116"] = 68,["117"] = 69,["118"] = 70,["119"] = 70,["120"] = 71,["121"] = 71,["123"] = 72,["124"] = 72,["125"] = 72,["126"] = 72,["127"] = 72,["128"] = 72,["129"] = 72,["130"] = 72,["131"] = 72,["135"] = 74,["136"] = 75,["137"] = 76,["138"] = 76,["139"] = 76,["140"] = 76,["141"] = 77,["142"] = 77,["143"] = 77,["145"] = 78,["147"] = 76,["148"] = 76,["155"] = 45,["156"] = 82,["157"] = 83,["160"] = 84,["161"] = 84,["162"] = 84,["165"] = 82,["166"] = 87,["167"] = 88,["168"] = 89,["171"] = 90,["172"] = 91,["173"] = 91,["174"] = 92,["175"] = 92,["176"] = 92,["178"] = 92,["180"] = 92,["181"] = 93,["182"] = 93,["183"] = 93,["184"] = 94,["187"] = 95,["188"] = 95,["193"] = 112,["194"] = 112,["195"] = 112,["196"] = 112,["197"] = 112,["198"] = 112,["199"] = 112,["202"] = 97,["203"] = 97,["205"] = 98,["206"] = 99,["207"] = 99,["209"] = 100,["210"] = 101,["211"] = 101,["213"] = 102,["214"] = 102,["215"] = 102,["216"] = 102,["217"] = 102,["218"] = 102,["219"] = 102,["220"] = 102,["221"] = 103,["222"] = 103,["224"] = 104,["225"] = 105,["226"] = 105,["227"] = 106,["228"] = 107,["229"] = 107,["231"] = 108,["232"] = 108,["233"] = 109,["234"] = 110,["235"] = 110,["236"] = 110,["243"] = 96,["246"] = 113,["247"] = 113,["249"] = 114,["250"] = 93,["251"] = 93,["252"] = 116,["253"] = 117,["254"] = 117,["255"] = 118,["256"] = 119,["257"] = 119,["259"] = 117,["261"] = 87,["262"] = 122,["263"] = 123,["264"] = 123,["265"] = 123,["266"] = 123,["267"] = 123,["268"] = 123,["269"] = 123,["270"] = 123,["271"] = 123,["273"] = 122,["274"] = 125,["275"] = 126,["278"] = 127,["279"] = 127,["280"] = 129,["281"] = 129,["282"] = 129,["283"] = 129,["284"] = 129,["286"] = 125,["287"] = 131,["288"] = 132,["289"] = 132,["290"] = 132,["291"] = 132,["292"] = 132,["294"] = 131,["295"] = 134,["296"] = 135,["297"] = 135,["299"] = 134,["300"] = 137,["301"] = 138,["302"] = 139,["303"] = 139,["305"] = 140,["306"] = 141,["307"] = 141,["309"] = 142,["310"] = 137,["311"] = 144,["312"] = 145,["315"] = 146,["316"] = 147,["317"] = 147,["318"] = 147,["319"] = 148,["320"] = 148,["321"] = 148,["324"] = 144,["325"] = 151,["326"] = 151,["327"] = 151,["329"] = 151,["330"] = 153,["331"] = 154,["332"] = 155,["333"] = 156,["334"] = 157,["335"] = 158,["336"] = 159,["337"] = 159,["338"] = 159,["340"] = 161,["341"] = 161,["343"] = 162,["345"] = 164,["346"] = 164,["347"] = 164,["348"] = 153,["349"] = 24,["350"] = 25,["351"] = 169,["352"] = 169});
local ____exports = {}
local ____weight_pool = require("class.weight_pool")
local CWeightPool = ____weight_pool.CWeightPool
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 保留原版对地图实体名或逗号分隔坐标的支持。
local function ResolvePosition(self, value)
    local anchor = Entities:FindByName(nil, value)
    if IsValid(anchor) then
        return anchor:GetAbsOrigin()
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
    error("特殊进攻刷新位置不存在：" .. value, 0)
end
--- 原版特殊进攻；模块通过 Event 监听波次和对局事件，自行持有计时器及实体。
____exports.CSpecialSpawner = __TS__Class()
local CSpecialSpawner = ____exports.CSpecialSpawner
CSpecialSpawner.name = "CSpecialSpawner"
__TS__ClassExtends(CSpecialSpawner, CModule)
function CSpecialSpawner.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.rushes = {}
    self.started = {}
    self.timers = {}
    self.spawnGroups = {}
    self.units = {}
end
function CSpecialSpawner.prototype.init(self, reload)
    Event:UnregisterContext(self)
    Event:Register("game_start", self.OnGameStart, self)
    Event:Register("round_state_change", self.OnRoundStateChange, self)
    Event:Register("waves_complete", self.OnWavesComplete, self)
    Event:Register("game_end", self.OnGameEnd, self)
    Event:Register("game_reset", self.OnGameReset, self)
    Event:Register("npc_spawned", self.OnNPCSpawned, self)
    Event:Register("entity_killed", self.OnEntityKilled, self)
end
function CSpecialSpawner.prototype.OnGameStart(self, event)
    local session = GameState:GetSession()
    if event.runId ~= session.runId or session.state ~= "GameState_Battle" or self.running and self.runId == event.runId then
        return
    end
    do
        local function ____catch(reason)
            self:Stop()
            GameState:FinishRun(
                session.runId,
                "error",
                tostring(reason)
            )
        end
        local ____try, ____hasReturned = pcall(function()
            self:reset()
            self.runId = session.runId
            self.base = __TS__ArrayFind(
                __TS__ArrayMap(
                    Entities:FindAllByClassname("npc_dota_creature"),
                    function(____, entity) return entity end
                ),
                function(____, unit) return IsValid(unit) and unit:GetUnitName() == "athena" and unit:GetTeamNumber() == DOTA_TEAM_GOODGUYS and unit:IsAlive() end
            )
            if not self.base then
                error("特殊进攻缺少雅典娜基地", 0)
            end
            local data = LoadKeyValues("scripts/npc/kv/gameplay/special_rush.kv")
            local names = {}
            for ____, name in ipairs(__TS__ObjectKeys(data)) do
                do
                    local entry = data[name]
                    if not entry or type(entry) ~= "table" then
                        goto __continue14
                    end
                    local weights = {}
                    local unitPool = entry.UnitPool
                    for ____, unitName in ipairs(__TS__ObjectKeys(unitPool or ({}))) do
                        if not KeyValues.units[unitName] then
                            error("特殊进攻单位配置不存在：" .. unitName, 0)
                        end
                        weights[unitName] = tonumber(unitPool[unitName]) or 0
                        if __TS__ArrayIndexOf(names, unitName) < 0 then
                            names[#names + 1] = unitName
                        end
                    end
                    local pool = __TS__New(CWeightPool, weights)
                    local spawners = entry.Spawner
                    local positions = __TS__ArrayMap(
                        __TS__ObjectKeys(spawners or ({})),
                        function(____, position) return ResolvePosition(nil, position) end
                    )
                    local round = tonumber(entry.iRound) or 0
                    local interval = tonumber(entry.flInterval)
                    local duration = tonumber(entry.flDuration)
                    if round <= 0 or round % 1 ~= 0 or pool.TotalWeight <= 0 or #positions == 0 or interval ~= nil and interval <= 0 then
                        error("特殊进攻配置无效：" .. name, 0)
                    end
                    self.rushes[name] = {
                        round = round,
                        pool = pool,
                        positions = positions,
                        interval = interval,
                        duration = duration,
                        offset = tonumber(entry.fSpawnOffset) or 0,
                        sound = entry.sSoundName
                    }
                end
                ::__continue14::
            end
            self.running = true
            local rushes = self.rushes
            for ____, name in ipairs(names) do
                PrecacheUnitByNameAsync(
                    name,
                    function(handle)
                        if self.running and self.rushes == rushes then
                            local ____self_spawnGroups_0 = self.spawnGroups
                            ____self_spawnGroups_0[#____self_spawnGroups_0 + 1] = handle
                        else
                            UnloadSpawnGroupByHandle(handle)
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
function CSpecialSpawner.prototype.OnRoundStateChange(self, event)
    if not self.running or event.runId ~= self.runId or event.stage ~= "end" then
        return
    end
    for ____, name in ipairs(__TS__ObjectKeys(self.rushes)) do
        if self.rushes[name].round == event.round_number then
            self:StartRush(name)
        end
    end
end
function CSpecialSpawner.prototype.StartRush(self, name)
    local rush = self.rushes[name]
    if not self.running or self.started[name] or not rush or GameState:GetSession().runId ~= self.runId or GameState:GetSession().state ~= "GameState_Battle" then
        return
    end
    self.started[name] = true
    local runId = self.runId
    local rushes = self.rushes
    local ____temp_1
    if rush.duration == nil then
        ____temp_1 = nil
    else
        ____temp_1 = GameRules:GetGameTime() + rush.duration - 50 / GameRules:GetCustomGameDifficulty()
    end
    local ____end = ____temp_1
    self.timers[name] = Timer:GameTimer(
        0,
        function()
            if not self.running or self.rushes ~= rushes or GameState:GetSession().runId ~= runId or GameState:GetSession().state ~= "GameState_Battle" then
                return
            end
            if ____end ~= nil and GameRules:GetGameTime() >= ____end then
                __TS__Delete(self.timers, name)
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
                    if not IsValid(self.base) or not self.base:IsAlive() then
                        error("特殊进攻的基地目标不存在", 0)
                    end
                    for ____, position in ipairs(rush.positions) do
                        if not self.running then
                            return true
                        end
                        local unitName = rush.pool:Random()
                        if not unitName then
                            error("特殊进攻单位池为空：" .. name, 0)
                        end
                        local unit = CreateUnitByName(
                            unitName,
                            position + RandomVector(RandomFloat(0, rush.offset)),
                            true,
                            nil,
                            nil,
                            DOTA_TEAM_BADGUYS
                        )
                        if not IsValid(unit) then
                            error("特殊进攻单位创建失败：" .. unitName, 0)
                        end
                        self:TrackUnit(unit)
                        local ____opt_2 = CustomNetTables:GetNetData("common", "round_state")
                        local round = ____opt_2 and ____opt_2.round_number or rush.round
                        unit:AddNewModifier(unit, nil, "modifier_enemy_scaling", {round_number = round})
                        if unit:IsCreature() then
                            unit:SetRequiresReachingEndPath(true)
                        end
                        unit:SetInitialGoalEntity(self.base)
                        unit:SetMustReachEachGoalEntity(false)
                        unit:AddNewModifier(unit, nil, "modifier_original_health_bar", {})
                        unit:SetDeathXP(0)
                        unit:SetMaximumGoldBounty(0)
                        unit:SetMinimumGoldBounty(0)
                    end
                end)
                if not ____try then
                    ____hasReturned, ____returnValue = ____catch(____hasReturned)
                end
                if ____hasReturned then
                    return ____returnValue
                end
            end
            if rush.interval ~= nil then
                return rush.interval
            end
            __TS__Delete(self.timers, name)
        end
    )
    Notification:Upper({message = name})
    if rush.sound then
        Game:EachPlayer(function(____, id)
            local player = PlayerResource:GetPlayer(id)
            if IsValid(player) then
                EmitSoundOnClient(rush.sound, player)
            end
        end)
    end
end
function CSpecialSpawner.prototype.TrackUnit(self, unit)
    if not __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_units_4 = self.units
        ____self_units_4[#____self_units_4 + 1] = {
            index = unit:entindex(),
            unit = unit
        }
    end
end
function CSpecialSpawner.prototype.OnNPCSpawned(self, event)
    if not self.running then
        return
    end
    local unit = event.unit
    local owner = unit:GetOwnerEntity()
    if IsValid(owner) and __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == owner end
    ) or self.started.zeus and unit:GetUnitName() == "zeus_reborn" and unit:GetTeamNumber() == DOTA_TEAM_BADGUYS then
        self:TrackUnit(unit)
    end
end
function CSpecialSpawner.prototype.OnEntityKilled(self, event)
    if self.running and self.started.zeus and event.victim:GetUnitName() == "zeus_reborn" and __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == event.victim end
    ) then
        GameState:FinishRun(self.runId, "victory", "最终首领被击败")
    end
end
function CSpecialSpawner.prototype.OnWavesComplete(self, event)
    if self.running and event.runId == self.runId and not self.started.zeus then
        GameState:FinishRun(self.runId, "victory", "全部波次完成")
    end
end
function CSpecialSpawner.prototype.Stop(self)
    self.running = false
    for ____, timer in ipairs(__TS__ObjectValues(self.timers)) do
        Timer:StopTimer(timer)
    end
    self.timers = {}
    for ____, group in ipairs(self.spawnGroups) do
        UnloadSpawnGroupByHandle(group)
    end
    self.spawnGroups = {}
end
function CSpecialSpawner.prototype.OnGameEnd(self, event)
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
function CSpecialSpawner.prototype.OnGameReset(self, event)
    if event.runId == self.runId then
        self:reset()
    end
end
function CSpecialSpawner.prototype.reset(self)
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
    self.rushes = {}
    self.started = {}
    self.base = nil
end
CSpecialSpawner = __TS__DecorateLegacy({reloadable}, CSpecialSpawner)
____exports.CSpecialSpawner = CSpecialSpawner
if SpecialSpawner == nil then
    SpecialSpawner = __TS__New(____exports.CSpecialSpawner)
end
return ____exports
