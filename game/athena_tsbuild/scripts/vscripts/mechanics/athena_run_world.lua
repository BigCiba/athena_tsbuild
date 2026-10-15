local __TSTL_FILE_PATH__ = "mechanics/athena_run_world"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__New = ____lualib.__TS__New
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__Number = ____lualib.__TS__Number
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 3,["18"] = 3,["20"] = 6,["21"] = 6,["22"] = 6,["24"] = 7,["25"] = 8,["26"] = 9,["27"] = 12,["28"] = 14,["29"] = 15,["30"] = 16,["31"] = 17,["32"] = 6,["33"] = 19,["34"] = 20,["36"] = 21,["37"] = 22,["38"] = 22,["40"] = 23,["41"] = 24,["42"] = 24,["44"] = 25,["45"] = 25,["50"] = 19,["51"] = 29,["52"] = 30,["53"] = 30,["54"] = 30,["55"] = 30,["56"] = 31,["57"] = 32,["58"] = 33,["59"] = 33,["61"] = 34,["62"] = 34,["63"] = 34,["64"] = 34,["65"] = 34,["66"] = 34,["67"] = 34,["68"] = 34,["69"] = 35,["70"] = 35,["72"] = 36,["73"] = 36,["74"] = 37,["75"] = 38,["76"] = 39,["77"] = 39,["78"] = 39,["79"] = 39,["80"] = 39,["81"] = 39,["82"] = 39,["83"] = 40,["84"] = 41,["85"] = 42,["86"] = 43,["87"] = 44,["88"] = 45,["89"] = 46,["91"] = 48,["92"] = 49,["93"] = 50,["94"] = 29,["95"] = 53,["96"] = 54,["97"] = 55,["99"] = 55,["103"] = 56,["104"] = 57,["105"] = 58,["106"] = 60,["107"] = 60,["109"] = 61,["110"] = 61,["111"] = 61,["112"] = 61,["113"] = 61,["114"] = 61,["115"] = 61,["116"] = 61,["117"] = 62,["119"] = 62,["123"] = 63,["124"] = 63,["125"] = 63,["127"] = 64,["128"] = 65,["129"] = 66,["130"] = 67,["131"] = 68,["132"] = 69,["133"] = 70,["134"] = 71,["135"] = 53,["136"] = 73,["137"] = 74,["138"] = 75,["141"] = 75,["143"] = 75,["144"] = 75,["145"] = 76,["146"] = 76,["149"] = 78,["150"] = 79,["151"] = 79,["152"] = 79,["153"] = 80,["156"] = 81,["157"] = 82,["160"] = 83,["161"] = 83,["162"] = 84,["163"] = 84,["165"] = 79,["166"] = 79,["167"] = 86,["168"] = 86,["169"] = 86,["170"] = 87,["171"] = 88,["172"] = 88,["173"] = 88,["174"] = 88,["175"] = 88,["177"] = 86,["178"] = 86,["179"] = 90,["180"] = 90,["181"] = 90,["182"] = 90,["183"] = 90,["184"] = 92,["185"] = 92,["186"] = 92,["187"] = 90,["188"] = 93,["189"] = 93,["190"] = 93,["191"] = 93,["192"] = 93,["193"] = 93,["194"] = 93,["195"] = 93,["197"] = 93,["199"] = 93,["200"] = 93,["201"] = 93,["202"] = 93,["203"] = 93,["204"] = 93,["205"] = 93,["206"] = 90,["207"] = 90,["208"] = 95,["209"] = 95,["210"] = 95,["211"] = 95,["212"] = 95,["215"] = 90,["216"] = 90,["217"] = 90,["218"] = 97,["219"] = 98,["220"] = 98,["221"] = 98,["222"] = 98,["223"] = 99,["224"] = 99,["225"] = 99,["226"] = 100,["231"] = 101,["232"] = 101,["233"] = 101,["234"] = 101,["235"] = 101,["236"] = 101,["239"] = 101,["241"] = 101,["248"] = 101,["251"] = 102,["252"] = 99,["253"] = 99,["254"] = 73,["255"] = 106,["256"] = 107,["258"] = 107,["259"] = 107,["260"] = 107,["262"] = 107,["263"] = 107,["264"] = 107,["268"] = 108,["269"] = 108,["270"] = 108,["272"] = 109,["273"] = 106,["274"] = 111,["275"] = 111,["276"] = 111,["277"] = 111,["278"] = 111,["279"] = 111,["280"] = 111,["281"] = 111,["282"] = 111,["283"] = 111,["285"] = 111,["286"] = 113,["287"] = 114,["289"] = 114,["290"] = 114,["291"] = 114,["293"] = 114,["294"] = 114,["297"] = 115,["298"] = 115,["299"] = 113,["300"] = 118,["301"] = 119,["302"] = 119,["303"] = 119,["304"] = 119,["305"] = 120,["306"] = 121,["307"] = 122,["308"] = 123,["309"] = 123,["310"] = 123,["311"] = 123,["312"] = 123,["313"] = 123,["314"] = 124,["315"] = 124,["316"] = 124,["317"] = 124,["318"] = 124,["319"] = 124,["320"] = 125,["321"] = 125,["322"] = 125,["323"] = 125,["324"] = 125,["325"] = 125,["326"] = 126,["327"] = 126,["328"] = 126,["329"] = 127,["330"] = 127,["331"] = 128,["332"] = 128,["333"] = 129,["334"] = 118,["335"] = 131,["336"] = 132,["337"] = 132,["339"] = 133,["340"] = 134,["341"] = 134,["343"] = 135,["344"] = 135,["345"] = 135,["346"] = 135,["347"] = 135,["348"] = 135,["349"] = 135,["350"] = 135,["351"] = 136,["352"] = 136,["354"] = 137,["355"] = 138,["356"] = 139,["357"] = 139,["359"] = 140,["360"] = 131,["361"] = 142,["362"] = 143,["363"] = 143,["365"] = 143,["367"] = 143,["368"] = 144,["369"] = 144,["371"] = 145,["374"] = 145,["376"] = 145,["377"] = 145,["378"] = 146,["379"] = 146,["380"] = 146,["383"] = 142,["384"] = 150,["385"] = 151,["386"] = 152,["387"] = 153,["388"] = 153,["389"] = 153,["390"] = 153,["392"] = 154,["393"] = 155,["394"] = 156,["395"] = 158,["396"] = 159,["397"] = 159,["398"] = 159,["400"] = 161,["402"] = 163,["403"] = 164,["404"] = 165,["405"] = 166,["406"] = 167,["407"] = 168,["409"] = 170,["410"] = 170,["411"] = 170,["412"] = 170,["414"] = 170,["416"] = 171,["417"] = 171,["418"] = 172,["419"] = 172,["420"] = 172,["422"] = 173,["423"] = 173,["424"] = 173,["425"] = 173,["426"] = 174,["427"] = 150,["428"] = 177,["429"] = 178,["430"] = 179,["431"] = 180,["432"] = 181,["434"] = 182,["435"] = 182,["436"] = 182,["438"] = 183,["439"] = 183,["441"] = 183,["445"] = 184,["446"] = 185,["448"] = 186,["449"] = 186,["450"] = 186,["452"] = 187,["454"] = 187,["458"] = 188,["459"] = 188,["460"] = 189,["461"] = 189,["463"] = 190,["464"] = 190,["465"] = 190,["466"] = 190,["467"] = 190,["468"] = 190,["469"] = 190,["470"] = 190,["471"] = 190,["472"] = 190,["473"] = 190,["474"] = 190,["475"] = 190,["476"] = 190,["480"] = 192,["481"] = 192,["483"] = 193,["484"] = 194,["485"] = 194,["486"] = 194,["487"] = 194,["488"] = 194,["490"] = 195,["491"] = 195,["492"] = 195,["494"] = 195,["496"] = 195,["497"] = 196,["498"] = 196,["500"] = 197,["501"] = 197,["502"] = 197,["503"] = 197,["504"] = 197,["505"] = 197,["506"] = 197,["507"] = 197,["508"] = 197,["512"] = 199,["513"] = 199,["515"] = 200,["516"] = 200,["517"] = 200,["518"] = 200,["519"] = 177});
local ____exports = {}
local ____round_runner = require("class.round_runner")
local RoundRunner = ____round_runner.RoundRunner
--- Dota 世界适配器。只移除本局拥有的实体，地图静态实体和账号数据不归本局清理。
____exports.AthenaRunWorld = __TS__Class()
local AthenaRunWorld = ____exports.AthenaRunWorld
AthenaRunWorld.name = "AthenaRunWorld"
function AthenaRunWorld.prototype.____constructor(self)
    self.runId = 0
    self.units = {}
    self.heroes = {}
    self.frozen = true
    self.waves = {}
    self.cleanupTasks = {}
    self.contextActive = false
    self.ownedData = {}
end
function AthenaRunWorld.prototype.PreparePlayers(self, players)
    for ____, id in ipairs(players) do
        do
            local hero = PlayerResource:GetSelectedHeroEntity(id)
            if not IsValid(hero) then
                goto __continue4
            end
            hero:Stop()
            if not hero:HasModifier("modifier_invulnerable") then
                hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
            end
            if not hero:HasModifier("modifier_stunned") then
                hero:AddNewModifier(hero, nil, "modifier_stunned", {})
            end
        end
        ::__continue4::
    end
end
function AthenaRunWorld.prototype.Initialize(self, session)
    self.session = session
    self.runId = session.runId
    self.frozen = true
    self.contextActive = true
    self.waves = self:LoadWaves()
    local anchor = Entities:FindByName(nil, "athena")
    if not IsValid(anchor) then
        error("地图缺少 athena 基地锚点", 0)
    end
    self.base = CreateUnitByName(
        "athena",
        anchor:GetAbsOrigin(),
        true,
        nil,
        nil,
        DOTA_TEAM_GOODGUYS
    )
    if not IsValid(self.base) then
        error("雅典娜基地创建失败", 0)
    end
    self:TrackUnit(self.base, session.runId)
    self.base:SetForwardVector(anchor:GetForwardVector())
    self:ApplyInitialStats(self.base, KeyValues.units.athena)
    self.base:AddNewModifier(self.base, nil, "modifier_invulnerable", {})
    local initialGold = ({
        300,
        200,
        100,
        0,
        0
    })[session.difficulty]
    for ____, id in ipairs(session.participants) do
        local hero = self:CreatePlayerHero(id, session.players[id].hero, initialGold)
        self.heroes[id] = hero
        self:RecordOwnedData(hero)
        self:ApplyInitialStats(hero, KeyValues.heroes[session.players[id].hero])
        hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
        hero:AddNewModifier(hero, nil, "modifier_stunned", {})
    end
    UnitManager:reset()
    GameRules:SetCustomGameDifficulty(session.difficulty)
    Game:SetGameResult(false)
end
function AthenaRunWorld.prototype.CreatePlayerHero(self, playerID, heroName, initialGold)
    local player = PlayerResource:GetPlayer(playerID)
    if not IsValid(player) then
        error(
            ("玩家 " .. tostring(playerID)) .. " 的控制实体不存在",
            0
        )
    end
    local oldHero = PlayerResource:GetSelectedHeroEntity(playerID)
    local anchor = Entities:FindByName(nil, "athena")
    local position = IsValid(oldHero) and oldHero:GetAbsOrigin() or (IsValid(anchor) and anchor:GetAbsOrigin() or Vector(0, 0, 0))
    if IsValid(oldHero) then
        oldHero:SafeRemoveUnit()
    end
    local hero = CreateUnitByName(
        heroName,
        position,
        true,
        player,
        player,
        DOTA_TEAM_GOODGUYS
    )
    if not IsValid(hero) then
        error(
            (("玩家 " .. tostring(playerID)) .. " 的英雄创建失败：") .. heroName,
            0
        )
    end
    if not hero:IsRealHero() then
        hero:SafeRemoveUnit()
        error("配置不是英雄：" .. heroName, 0)
    end
    player:SetSelectedHero(heroName)
    player:SetAssignedHeroEntity(hero)
    hero:SetPlayerID(playerID)
    hero:SetOwner(player)
    hero:SetControllableByPlayer(playerID, true)
    PlayerResource:SetGold(playerID, 0, false)
    PlayerResource:SetGold(playerID, initialGold, true)
    return hero
end
function AthenaRunWorld.prototype.StartBattle(self, scope)
    self.frozen = false
    local ____array_0 = __TS__SparseArrayNew(unpack(self.units))
    __TS__SparseArrayPush(
        ____array_0,
        unpack(__TS__ObjectValues(self.heroes))
    )
    for ____, unit in ipairs({__TS__SparseArraySpread(____array_0)}) do
        if IsValid(unit) then
            unit:RemoveModifierByName("modifier_invulnerable")
            unit:RemoveModifierByName("modifier_stunned")
        end
    end
    local runId = self.runId
    scope:Listen(
        "entity_killed",
        function(____, event)
            if self.frozen or self.runId ~= runId then
                return
            end
            local victim = EntIndexToHScript(event.entindex_killed)
            if not IsValid(victim) then
                return
            end
            if victim == self.base then
                GameState:FinishRun(runId, "defeat", "雅典娜基地被摧毁")
            elseif victim:GetUnitName() == "zeus_reborn" and __TS__ArrayIndexOf(self.units, victim) >= 0 then
                GameState:FinishRun(runId, "victory", "最终首领被击败")
            end
        end
    )
    scope:Register(
        "npc_spawned",
        function(____, event)
            local owner = event.unit:GetOwnerEntity()
            if not self.frozen and IsValid(owner) and (__TS__ArrayIndexOf(self.units, owner) >= 0 or __TS__ArrayIndexOf(
                __TS__ObjectValues(self.heroes),
                owner
            ) >= 0) then
                self:TrackUnit(event.unit, runId)
            end
        end
    )
    self.rounds = __TS__New(
        RoundRunner,
        self.waves,
        {
            Spawn = function(____, spawner) return self:Spawn(spawner) end,
            IsAlive = function(____, entity)
                local unit = EntIndexToHScript(entity)
                return IsValid(unit) and unit:IsAlive()
            end,
            Publish = function(____, round, stage, deadline)
                local ____CustomNetTables_SetNetData_5 = CustomNetTables.SetNetData
                local ____round_2 = round
                local ____stage_3 = stage
                local ____temp_4 = stage == "prepare" and (deadline or 0) or 0
                local ____temp_1
                if stage == "battle" then
                    ____temp_1 = deadline
                else
                    ____temp_1 = nil
                end
                return ____CustomNetTables_SetNetData_5(CustomNetTables, "common", "round_state", {
                    round_number = ____round_2,
                    stage = ____stage_3,
                    run_id = runId,
                    prep_end_time = ____temp_4,
                    timed_round_end_time = ____temp_1
                })
            end,
            Complete = function() return GameState:FinishRun(runId, "victory", "全部波次完成") end,
            Clear = function(____, entities)
                for ____, index in ipairs(entities) do
                    local unit = EntIndexToHScript(index)
                    if IsValid(unit) and __TS__ArrayIndexOf(self.units, unit) >= 0 then
                        UTIL_Remove(unit)
                    end
                end
            end
        }
    )
    self.rounds:Start(GameRules:GetGameTime())
    scope:Own(function()
        local ____opt_6 = self.rounds
        return ____opt_6 and ____opt_6:Stop()
    end)
    scope:StartThink(
        0.1,
        function()
            if self.frozen or self.runId ~= runId then
                return
            end
            do
                local function ____catch(reason)
                    GameState:FinishRun(
                        runId,
                        "error",
                        tostring(reason)
                    )
                    return true
                end
                local ____try, ____hasReturned, ____returnValue = pcall(function()
                    local ____opt_8 = self.rounds
                    if ____opt_8 ~= nil then
                        ____opt_8:Tick(GameRules:GetGameTime())
                    end
                end)
                if not ____try then
                    ____hasReturned, ____returnValue = ____catch(____hasReturned)
                end
                if ____hasReturned then
                    return ____returnValue
                end
            end
            return 0.1
        end
    )
end
function AthenaRunWorld.prototype.TrackUnit(self, unit, runId)
    local ____temp_13 = not self.contextActive or runId ~= self.runId
    if not ____temp_13 then
        local ____runId_12 = runId
        local ____opt_10 = self.session
        ____temp_13 = ____runId_12 ~= (____opt_10 and ____opt_10.runId)
    end
    if ____temp_13 or self.session.state ~= "GameState_RunInit" and self.session.state ~= "GameState_Battle" then
        if IsValid(unit) then
            UTIL_Remove(unit)
        end
        return
    end
    if __TS__ArrayIndexOf(self.units, unit) < 0 then
        local ____self_units_14 = self.units
        ____self_units_14[#____self_units_14 + 1] = unit
    end
    self:RecordOwnedData(unit)
end
function AthenaRunWorld.prototype.RecordOwnedData(self, unit)
    if not __TS__ArraySome(
        self.ownedData,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_ownedData_15 = self.ownedData
        ____self_ownedData_15[#____self_ownedData_15 + 1] = {
            index = unit:entindex(),
            unit = unit
        }
    end
end
function AthenaRunWorld.prototype.Own(self, runId, cleanup)
    local ____temp_19 = not self.contextActive or runId ~= self.runId
    if not ____temp_19 then
        local ____runId_18 = runId
        local ____opt_16 = self.session
        ____temp_19 = ____runId_18 ~= (____opt_16 and ____opt_16.runId)
    end
    if ____temp_19 or self.session.state ~= "GameState_RunInit" and self.session.state ~= "GameState_Battle" then
        cleanup(nil)
        return
    end
    local ____self_cleanupTasks_20 = self.cleanupTasks
    ____self_cleanupTasks_20[#____self_cleanupTasks_20 + 1] = cleanup
end
function AthenaRunWorld.prototype.ApplyInitialStats(self, unit, data)
    local health = math.max(
        1,
        tonumber(data.CustomStatusHealth) or unit:GetMaxHealth_Engine()
    )
    local attack = tonumber(data.AttackDamage) or unit:GetAttackDamage_Engine()
    local mana = tonumber(data.StatusMana) or unit:GetMaxMana_Engine()
    local source = ("run:" .. tostring(self.runId)) .. ":kv"
    PropertySystem:AddStaticProperty(
        unit:entindex(),
        "base_health",
        source,
        health
    )
    PropertySystem:AddStaticProperty(
        unit:entindex(),
        "base_attack",
        source,
        attack
    )
    PropertySystem:AddStaticProperty(
        unit:entindex(),
        "base_mana",
        source,
        mana
    )
    unit:SetBaseMaxHealth(health)
    unit:SetMaxHealth(health)
    unit:SetHealth(health)
    unit:SetBaseDamageMin(attack)
    unit:SetBaseDamageMax(attack)
    unit:SetMaxMana(mana)
    unit:SetMana(mana)
    unit:SetPhysicalArmorBaseValue(tonumber(data.Armor) or 0)
end
function AthenaRunWorld.prototype.Spawn(self, spawner)
    if self.frozen then
        error("已结束的对局禁止刷怪", 0)
    end
    local anchor = Entities:FindByName(nil, spawner.anchor)
    if not IsValid(anchor) then
        error("刷怪锚点不存在：" .. spawner.anchor, 0)
    end
    local unit = CreateUnitByName(
        spawner.unit,
        anchor:GetAbsOrigin(),
        true,
        nil,
        nil,
        DOTA_TEAM_BADGUYS
    )
    if not IsValid(unit) then
        error("单位创建失败：" .. spawner.unit, 0)
    end
    self:TrackUnit(unit, self.runId)
    self:ApplyInitialStats(unit, KeyValues.units[spawner.unit])
    if IsValid(self.base) then
        unit:MoveToTargetToAttack(self.base)
    end
    return unit:entindex()
end
function AthenaRunWorld.prototype.Freeze(self)
    self.frozen = true
    local ____opt_21 = self.rounds
    if ____opt_21 ~= nil then
        ____opt_21:Stop()
    end
    Bullet:reset()
    if GameRules:IsGamePaused() then
        Game:Pause(false)
    end
    local ____array_23 = __TS__SparseArrayNew(unpack(self.units))
    __TS__SparseArrayPush(
        ____array_23,
        unpack(__TS__ObjectValues(self.heroes))
    )
    for ____, unit in ipairs({__TS__SparseArraySpread(____array_23)}) do
        if IsValid(unit) then
            unit:Stop()
            unit:AddNewModifier(unit, nil, "modifier_invulnerable", {})
            unit:AddNewModifier(unit, nil, "modifier_stunned", {})
        end
    end
end
function AthenaRunWorld.prototype.Cleanup(self)
    self.contextActive = false
    self:Freeze()
    while #self.cleanupTasks > 0 do
        local ____self_24 = self.cleanupTasks
        ____self_24[#self.cleanupTasks](____self_24)
        table.remove(self.cleanupTasks)
    end
    while #self.ownedData > 0 do
        local record = self.ownedData[#self.ownedData]
        local current = EntIndexToHScript(record.index)
        if not IsValid(current) or current == record.unit then
            PropertySystem:CleanupUnitPropertiesByIndex(record.index)
            StateSystem:CleanupUnitStatesByIndex(record.index)
            AbilityUpgrade:CleanupUnitUpgrades(record.index)
        end
        table.remove(self.ownedData)
    end
    for ____, key in ipairs(__TS__ObjectKeys(self.heroes)) do
        local id = __TS__Number(key)
        local placeholder = self:CreatePlayerHero(id, "npc_dota_hero_phantom_assassin", 0)
        placeholder:AddNewModifier(placeholder, nil, "modifier_invulnerable", {})
        placeholder:AddNewModifier(placeholder, nil, "modifier_stunned", {})
        __TS__Delete(self.heroes, id)
    end
    while #self.units > 0 do
        local unit = self.units[#self.units]
        if IsValid(unit) then
            UTIL_Remove(unit)
        end
        table.remove(self.units)
    end
    self.base = nil
    self.rounds = nil
    local ____opt_25 = self.session
    for ____, id in ipairs(____opt_25 and ____opt_25.participants or ({})) do
        PropertySystem:ClearDynamicPropertyCache(PropertyScope.PLAYER, id)
    end
    DamageCounter:reset()
    DataRecord:reset()
    UnitManager:reset()
    Game:ResetRunState()
    CustomNetTables:SetNetData("common", "round_state", nil)
end
function AthenaRunWorld.prototype.LoadWaves(self)
    local rounds = LoadKeyValues("scripts/npc/kv/gameplay/round.kv")
    local groups = LoadKeyValues("scripts/npc/kv/gameplay/spawner_group.kv")
    local result = {}
    for ____, key in ipairs(__TS__ObjectKeys(rounds)) do
        do
            local data = rounds[key]
            if type(data) ~= "table" then
                goto __continue74
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
                        goto __continue77
                    end
                    if not KeyValues.units[spawn.NPCName] or not IsValid(Entities:FindByName(nil, spawn.SpawnerName)) then
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
                            0.1,
                            tonumber(spawn.SpawnInterval) or 0.1
                        ),
                        wait = math.max(
                            0,
                            tonumber(spawn.WaitForTime) or 0
                        )
                    }
                end
                ::__continue77::
            end
            if not #spawners then
                error("波次没有刷怪配置：" .. key, 0)
            end
            local number = tonumber(data.RoundNumber) or 0
            if number <= 0 or __TS__ArraySome(
                result,
                function(____, wave) return wave.number == number end
            ) then
                error("波次编号无效或重复：" .. key, 0)
            end
            local ____temp_27
            if tonumber(data.TimedRound) == 1 then
                ____temp_27 = tonumber(data.RoundDuration)
            else
                ____temp_27 = nil
            end
            local duration = ____temp_27
            if tonumber(data.TimedRound) == 1 and (duration == nil or duration <= 0) then
                error("定时波次时长无效：" .. key, 0)
            end
            result[#result + 1] = {
                number = number,
                prepare = math.max(
                    0,
                    tonumber(data.PrepareRoundTime) or 0
                ),
                duration = duration,
                spawners = spawners
            }
        end
        ::__continue74::
    end
    if not #result then
        error("缺少有效波次配置", 0)
    end
    return __TS__ArraySort(
        result,
        function(____, a, b) return a.number - b.number end
    )
end
return ____exports
