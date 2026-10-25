local __TSTL_FILE_PATH__ = "mechanics/athena_run_world"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__Number = ____lualib.__TS__Number
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 5,["17"] = 5,["18"] = 5,["20"] = 6,["21"] = 7,["22"] = 8,["23"] = 10,["24"] = 12,["25"] = 13,["26"] = 14,["27"] = 5,["28"] = 16,["29"] = 17,["31"] = 18,["32"] = 19,["33"] = 19,["35"] = 20,["36"] = 21,["37"] = 21,["39"] = 22,["40"] = 22,["45"] = 16,["46"] = 26,["47"] = 27,["48"] = 27,["49"] = 27,["50"] = 27,["51"] = 28,["52"] = 29,["53"] = 29,["55"] = 30,["56"] = 30,["57"] = 30,["58"] = 30,["59"] = 30,["60"] = 30,["61"] = 30,["62"] = 30,["63"] = 31,["64"] = 31,["66"] = 32,["67"] = 32,["68"] = 33,["69"] = 34,["70"] = 35,["71"] = 36,["72"] = 37,["73"] = 38,["74"] = 39,["76"] = 41,["77"] = 42,["78"] = 43,["79"] = 26,["80"] = 46,["81"] = 47,["82"] = 48,["84"] = 48,["88"] = 49,["89"] = 50,["90"] = 51,["91"] = 53,["92"] = 53,["94"] = 54,["95"] = 54,["96"] = 54,["97"] = 54,["98"] = 54,["99"] = 54,["100"] = 54,["101"] = 54,["102"] = 55,["104"] = 55,["108"] = 56,["109"] = 56,["110"] = 56,["112"] = 57,["113"] = 58,["114"] = 59,["115"] = 60,["116"] = 61,["117"] = 62,["118"] = 63,["119"] = 64,["120"] = 46,["121"] = 66,["122"] = 67,["123"] = 68,["126"] = 68,["128"] = 68,["129"] = 68,["130"] = 69,["131"] = 69,["134"] = 71,["135"] = 72,["136"] = 72,["137"] = 72,["138"] = 73,["141"] = 74,["142"] = 75,["145"] = 76,["146"] = 76,["147"] = 77,["148"] = 77,["150"] = 72,["151"] = 72,["152"] = 79,["153"] = 79,["154"] = 79,["155"] = 80,["156"] = 81,["157"] = 81,["158"] = 81,["159"] = 81,["160"] = 81,["162"] = 79,["163"] = 79,["164"] = 66,["165"] = 85,["166"] = 86,["168"] = 86,["169"] = 86,["170"] = 86,["172"] = 86,["173"] = 86,["174"] = 86,["178"] = 87,["179"] = 87,["180"] = 87,["182"] = 88,["183"] = 85,["184"] = 90,["185"] = 90,["186"] = 90,["187"] = 90,["188"] = 90,["189"] = 90,["190"] = 90,["191"] = 90,["192"] = 90,["193"] = 90,["195"] = 90,["196"] = 92,["197"] = 93,["199"] = 93,["200"] = 93,["201"] = 93,["203"] = 93,["204"] = 93,["207"] = 94,["208"] = 94,["209"] = 92,["210"] = 96,["211"] = 97,["212"] = 97,["213"] = 98,["214"] = 98,["216"] = 99,["219"] = 99,["221"] = 99,["222"] = 99,["223"] = 100,["224"] = 100,["225"] = 100,["228"] = 96,["229"] = 104,["230"] = 105,["231"] = 106,["232"] = 107,["233"] = 107,["234"] = 107,["235"] = 107,["237"] = 108,["238"] = 109,["239"] = 110,["240"] = 112,["241"] = 113,["242"] = 113,["243"] = 113,["245"] = 115,["247"] = 117,["248"] = 118,["249"] = 120,["250"] = 121,["251"] = 122,["252"] = 123,["254"] = 125,["255"] = 125,["256"] = 125,["257"] = 125,["259"] = 125,["261"] = 126,["262"] = 127,["263"] = 127,["264"] = 127,["266"] = 128,["267"] = 128,["268"] = 128,["269"] = 128,["270"] = 104});
local ____exports = {}
--- Dota 世界适配器。只移除本局拥有的实体，地图静态实体和账号数据不归本局清理。
____exports.AthenaRunWorld = __TS__Class()
local AthenaRunWorld = ____exports.AthenaRunWorld
AthenaRunWorld.name = "AthenaRunWorld"
function AthenaRunWorld.prototype.____constructor(self)
    self.runId = 0
    self.units = {}
    self.heroes = {}
    self.frozen = true
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
    self.base:AddNewModifier(self.base, nil, "modifier_invulnerable", {})
    for ____, id in ipairs(session.participants) do
        local hero = self:CreatePlayerHero(id, session.players[id].hero)
        self.heroes[id] = hero
        self:RecordOwnedData(hero)
        hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
        hero:AddNewModifier(hero, nil, "modifier_stunned", {})
    end
    UnitManager:reset()
    GameRules:SetCustomGameDifficulty(session.difficulty)
    Game:SetGameResult(false)
end
function AthenaRunWorld.prototype.CreatePlayerHero(self, playerID, heroName)
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
    PlayerResource:SetGold(playerID, 0, true)
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
end
function AthenaRunWorld.prototype.TrackUnit(self, unit, runId)
    local ____temp_4 = not self.contextActive or runId ~= self.runId
    if not ____temp_4 then
        local ____runId_3 = runId
        local ____opt_1 = self.session
        ____temp_4 = ____runId_3 ~= (____opt_1 and ____opt_1.runId)
    end
    if ____temp_4 or self.session.state ~= "GameState_RunInit" and self.session.state ~= "GameState_Battle" then
        if IsValid(unit) then
            UTIL_Remove(unit)
        end
        return
    end
    if __TS__ArrayIndexOf(self.units, unit) < 0 then
        local ____self_units_5 = self.units
        ____self_units_5[#____self_units_5 + 1] = unit
    end
    self:RecordOwnedData(unit)
end
function AthenaRunWorld.prototype.RecordOwnedData(self, unit)
    if not __TS__ArraySome(
        self.ownedData,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_ownedData_6 = self.ownedData
        ____self_ownedData_6[#____self_ownedData_6 + 1] = {
            index = unit:entindex(),
            unit = unit
        }
    end
end
function AthenaRunWorld.prototype.Own(self, runId, cleanup)
    local ____temp_10 = not self.contextActive or runId ~= self.runId
    if not ____temp_10 then
        local ____runId_9 = runId
        local ____opt_7 = self.session
        ____temp_10 = ____runId_9 ~= (____opt_7 and ____opt_7.runId)
    end
    if ____temp_10 or self.session.state ~= "GameState_RunInit" and self.session.state ~= "GameState_Battle" then
        cleanup(nil)
        return
    end
    local ____self_cleanupTasks_11 = self.cleanupTasks
    ____self_cleanupTasks_11[#____self_cleanupTasks_11 + 1] = cleanup
end
function AthenaRunWorld.prototype.Freeze(self)
    self.frozen = true
    Bullet:reset()
    if GameRules:IsGamePaused() then
        Game:Pause(false)
    end
    local ____array_12 = __TS__SparseArrayNew(unpack(self.units))
    __TS__SparseArrayPush(
        ____array_12,
        unpack(__TS__ObjectValues(self.heroes))
    )
    for ____, unit in ipairs({__TS__SparseArraySpread(____array_12)}) do
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
        local ____self_13 = self.cleanupTasks
        ____self_13[#self.cleanupTasks](____self_13)
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
        local placeholder = self:CreatePlayerHero(id, self.session.players[id].hero)
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
    local ____opt_14 = self.session
    for ____, id in ipairs(____opt_14 and ____opt_14.participants or ({})) do
        PropertySystem:ClearDynamicPropertyCache(PropertyScope.PLAYER, id)
    end
    DamageCounter:reset()
    DataRecord:reset()
    UnitManager:reset()
    Game:ResetRunState()
end
return ____exports
