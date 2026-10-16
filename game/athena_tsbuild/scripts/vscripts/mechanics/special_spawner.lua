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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 1,["19"] = 1,["20"] = 2,["21"] = 2,["23"] = 15,["24"] = 16,["25"] = 17,["26"] = 17,["28"] = 18,["29"] = 18,["30"] = 18,["31"] = 18,["32"] = 19,["33"] = 19,["34"] = 19,["35"] = 19,["36"] = 19,["38"] = 20,["39"] = 15,["41"] = 24,["42"] = 25,["43"] = 24,["44"] = 25,["46"] = 25,["47"] = 26,["48"] = 27,["49"] = 28,["50"] = 29,["51"] = 30,["52"] = 31,["53"] = 24,["54"] = 34,["55"] = 35,["56"] = 36,["57"] = 37,["58"] = 38,["59"] = 39,["60"] = 40,["61"] = 41,["62"] = 42,["63"] = 34,["64"] = 44,["65"] = 45,["66"] = 46,["71"] = 76,["72"] = 76,["73"] = 76,["74"] = 76,["75"] = 76,["76"] = 76,["79"] = 48,["80"] = 48,["81"] = 50,["82"] = 50,["83"] = 50,["84"] = 50,["85"] = 50,["86"] = 50,["87"] = 50,["88"] = 52,["89"] = 52,["91"] = 53,["92"] = 54,["93"] = 55,["95"] = 56,["96"] = 57,["97"] = 57,["99"] = 58,["100"] = 59,["101"] = 60,["102"] = 61,["103"] = 61,["105"] = 62,["106"] = 63,["107"] = 63,["110"] = 65,["111"] = 66,["112"] = 67,["113"] = 67,["114"] = 67,["115"] = 67,["116"] = 68,["117"] = 69,["118"] = 69,["119"] = 70,["120"] = 70,["122"] = 71,["123"] = 71,["124"] = 71,["125"] = 71,["126"] = 71,["127"] = 71,["128"] = 71,["129"] = 71,["130"] = 71,["134"] = 73,["135"] = 75,["136"] = 75,["137"] = 75,["138"] = 75,["139"] = 75,["140"] = 75,["147"] = 44,["148"] = 78,["149"] = 79,["152"] = 80,["153"] = 80,["154"] = 80,["157"] = 78,["158"] = 83,["159"] = 84,["160"] = 85,["163"] = 86,["164"] = 87,["165"] = 87,["166"] = 88,["167"] = 88,["168"] = 88,["170"] = 88,["172"] = 88,["173"] = 89,["174"] = 89,["175"] = 89,["176"] = 90,["179"] = 91,["180"] = 91,["185"] = 108,["186"] = 108,["187"] = 108,["188"] = 108,["189"] = 108,["190"] = 108,["191"] = 108,["194"] = 93,["195"] = 93,["197"] = 94,["198"] = 95,["199"] = 95,["201"] = 96,["202"] = 97,["203"] = 97,["205"] = 98,["206"] = 98,["207"] = 98,["208"] = 98,["209"] = 98,["210"] = 98,["211"] = 98,["212"] = 98,["213"] = 99,["214"] = 99,["216"] = 100,["217"] = 101,["218"] = 101,["219"] = 102,["220"] = 103,["221"] = 103,["223"] = 104,["224"] = 104,["225"] = 105,["226"] = 106,["227"] = 106,["228"] = 106,["235"] = 92,["238"] = 109,["239"] = 109,["241"] = 110,["242"] = 89,["243"] = 89,["244"] = 112,["245"] = 113,["246"] = 113,["247"] = 114,["248"] = 115,["249"] = 115,["251"] = 113,["253"] = 83,["254"] = 118,["255"] = 119,["256"] = 119,["257"] = 119,["258"] = 119,["259"] = 119,["260"] = 119,["261"] = 119,["262"] = 119,["263"] = 119,["265"] = 118,["266"] = 121,["267"] = 122,["270"] = 123,["271"] = 123,["272"] = 125,["273"] = 125,["274"] = 125,["275"] = 125,["276"] = 125,["278"] = 121,["279"] = 127,["280"] = 128,["281"] = 128,["282"] = 128,["283"] = 128,["284"] = 128,["286"] = 127,["287"] = 130,["288"] = 131,["289"] = 131,["291"] = 130,["292"] = 133,["293"] = 134,["294"] = 135,["295"] = 135,["297"] = 136,["298"] = 133,["299"] = 138,["300"] = 139,["303"] = 140,["304"] = 141,["305"] = 141,["306"] = 141,["307"] = 142,["308"] = 142,["309"] = 142,["312"] = 138,["313"] = 145,["314"] = 145,["315"] = 145,["317"] = 145,["318"] = 147,["319"] = 148,["320"] = 149,["321"] = 150,["322"] = 151,["323"] = 152,["324"] = 153,["325"] = 153,["326"] = 153,["328"] = 155,["329"] = 155,["331"] = 156,["333"] = 158,["334"] = 158,["335"] = 158,["336"] = 147,["337"] = 24,["338"] = 25,["339"] = 163,["340"] = 163});
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
            for ____, name in ipairs(names) do
                PrecacheUnitByNameAsync(
                    name,
                    function()
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
    local ____temp_0
    if rush.duration == nil then
        ____temp_0 = nil
    else
        ____temp_0 = GameRules:GetGameTime() + rush.duration - 50 / GameRules:GetCustomGameDifficulty()
    end
    local ____end = ____temp_0
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
                        local ____opt_1 = CustomNetTables:GetNetData("common", "round_state")
                        local round = ____opt_1 and ____opt_1.round_number or rush.round
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
        local ____self_units_3 = self.units
        ____self_units_3[#____self_units_3 + 1] = {
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
