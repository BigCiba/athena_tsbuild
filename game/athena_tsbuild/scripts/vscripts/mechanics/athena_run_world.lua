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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 5,["17"] = 5,["18"] = 5,["20"] = 6,["21"] = 7,["22"] = 8,["23"] = 10,["24"] = 12,["25"] = 13,["26"] = 14,["27"] = 5,["28"] = 16,["29"] = 17,["31"] = 18,["32"] = 19,["33"] = 19,["35"] = 20,["36"] = 21,["37"] = 21,["39"] = 22,["40"] = 22,["45"] = 16,["46"] = 26,["47"] = 27,["48"] = 27,["49"] = 27,["50"] = 27,["51"] = 28,["52"] = 29,["53"] = 29,["55"] = 30,["56"] = 30,["57"] = 30,["58"] = 30,["59"] = 30,["60"] = 30,["61"] = 30,["62"] = 30,["63"] = 31,["64"] = 31,["66"] = 32,["67"] = 32,["68"] = 33,["69"] = 34,["70"] = 34,["71"] = 34,["72"] = 34,["73"] = 34,["74"] = 34,["75"] = 34,["76"] = 35,["77"] = 36,["78"] = 37,["79"] = 38,["80"] = 39,["81"] = 40,["83"] = 42,["84"] = 43,["85"] = 44,["86"] = 26,["87"] = 47,["88"] = 48,["89"] = 49,["91"] = 49,["95"] = 50,["96"] = 51,["97"] = 52,["98"] = 54,["99"] = 54,["101"] = 55,["102"] = 55,["103"] = 55,["104"] = 55,["105"] = 55,["106"] = 55,["107"] = 55,["108"] = 55,["109"] = 56,["111"] = 56,["115"] = 57,["116"] = 57,["117"] = 57,["119"] = 58,["120"] = 59,["121"] = 60,["122"] = 61,["123"] = 62,["124"] = 63,["125"] = 64,["126"] = 65,["127"] = 47,["128"] = 67,["129"] = 68,["130"] = 69,["133"] = 69,["135"] = 69,["136"] = 69,["137"] = 70,["138"] = 70,["141"] = 72,["142"] = 73,["143"] = 73,["144"] = 73,["145"] = 74,["148"] = 75,["149"] = 76,["152"] = 77,["153"] = 77,["154"] = 78,["155"] = 78,["157"] = 73,["158"] = 73,["159"] = 80,["160"] = 80,["161"] = 80,["162"] = 81,["163"] = 82,["164"] = 82,["165"] = 82,["166"] = 82,["167"] = 82,["169"] = 80,["170"] = 80,["171"] = 67,["172"] = 86,["173"] = 87,["175"] = 87,["176"] = 87,["177"] = 87,["179"] = 87,["180"] = 87,["181"] = 87,["185"] = 88,["186"] = 88,["187"] = 88,["189"] = 89,["190"] = 86,["191"] = 91,["192"] = 91,["193"] = 91,["194"] = 91,["195"] = 91,["196"] = 91,["197"] = 91,["198"] = 91,["199"] = 91,["200"] = 91,["202"] = 91,["203"] = 93,["204"] = 94,["206"] = 94,["207"] = 94,["208"] = 94,["210"] = 94,["211"] = 94,["214"] = 95,["215"] = 95,["216"] = 93,["217"] = 97,["218"] = 98,["219"] = 98,["220"] = 99,["221"] = 99,["223"] = 100,["226"] = 100,["228"] = 100,["229"] = 100,["230"] = 101,["231"] = 101,["232"] = 101,["235"] = 97,["236"] = 105,["237"] = 106,["238"] = 107,["239"] = 108,["240"] = 108,["241"] = 108,["242"] = 108,["244"] = 109,["245"] = 110,["246"] = 111,["247"] = 113,["248"] = 114,["249"] = 114,["250"] = 114,["252"] = 116,["254"] = 118,["255"] = 119,["256"] = 120,["257"] = 121,["258"] = 122,["259"] = 123,["261"] = 125,["262"] = 125,["263"] = 125,["264"] = 125,["266"] = 125,["268"] = 126,["269"] = 127,["270"] = 127,["271"] = 127,["273"] = 128,["274"] = 128,["275"] = 128,["276"] = 128,["277"] = 105});
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
