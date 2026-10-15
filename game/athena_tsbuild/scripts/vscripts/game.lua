local __TSTL_FILE_PATH__ = "game"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 3,["14"] = 3,["15"] = 5,["16"] = 5,["17"] = 6,["19"] = 6,["20"] = 8,["21"] = 9,["22"] = 10,["23"] = 16,["24"] = 18,["25"] = 5,["26"] = 19,["27"] = 20,["28"] = 20,["29"] = 20,["30"] = 20,["31"] = 20,["32"] = 20,["33"] = 20,["34"] = 21,["35"] = 21,["36"] = 21,["37"] = 21,["38"] = 21,["39"] = 21,["40"] = 21,["41"] = 22,["42"] = 22,["43"] = 22,["44"] = 22,["45"] = 22,["46"] = 22,["47"] = 22,["48"] = 24,["49"] = 24,["50"] = 24,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 24,["55"] = 25,["56"] = 25,["57"] = 25,["58"] = 25,["59"] = 25,["60"] = 25,["61"] = 25,["62"] = 26,["63"] = 26,["64"] = 26,["65"] = 26,["66"] = 26,["67"] = 26,["68"] = 26,["69"] = 27,["70"] = 27,["71"] = 27,["72"] = 27,["73"] = 27,["74"] = 27,["75"] = 27,["76"] = 29,["77"] = 30,["78"] = 31,["79"] = 31,["80"] = 31,["81"] = 31,["82"] = 31,["83"] = 31,["84"] = 31,["85"] = 31,["86"] = 31,["87"] = 33,["88"] = 34,["89"] = 35,["90"] = 35,["91"] = 35,["92"] = 35,["93"] = 35,["97"] = 19,["98"] = 54,["99"] = 55,["100"] = 56,["101"] = 57,["102"] = 58,["107"] = 54,["108"] = 69,["109"] = 70,["110"] = 71,["111"] = 72,["112"] = 73,["113"] = 74,["114"] = 75,["119"] = 71,["121"] = 82,["122"] = 83,["123"] = 84,["124"] = 85,["130"] = 69,["131"] = 97,["132"] = 98,["133"] = 99,["134"] = 99,["135"] = 100,["136"] = 101,["137"] = 102,["139"] = 99,["140"] = 99,["141"] = 99,["142"] = 105,["143"] = 97,["144"] = 113,["145"] = 114,["146"] = 115,["148"] = 116,["149"] = 117,["150"] = 117,["152"] = 118,["156"] = 120,["157"] = 113,["158"] = 122,["159"] = 122,["160"] = 122,["162"] = 123,["163"] = 124,["164"] = 125,["165"] = 126,["166"] = 127,["169"] = 130,["171"] = 124,["172"] = 133,["173"] = 122,["174"] = 136,["175"] = 137,["176"] = 136,["177"] = 140,["178"] = 141,["179"] = 142,["180"] = 143,["181"] = 140,["182"] = 145,["183"] = 146,["184"] = 145,["185"] = 152,["186"] = 153,["187"] = 152,["188"] = 155,["189"] = 156,["190"] = 155,["191"] = 159,["192"] = 160,["193"] = 161,["196"] = 162,["197"] = 164,["200"] = 168,["201"] = 169,["202"] = 170,["204"] = 172,["205"] = 173,["207"] = 175,["208"] = 176,["211"] = 180,["212"] = 181,["213"] = 182,["214"] = 183,["215"] = 185,["216"] = 186,["218"] = 189,["219"] = 190,["220"] = 191,["221"] = 192,["222"] = 193,["225"] = 197,["226"] = 159,["227"] = 200,["228"] = 201,["229"] = 202,["232"] = 203,["235"] = 205,["236"] = 206,["238"] = 208,["239"] = 209,["241"] = 211,["242"] = 212,["244"] = 214,["245"] = 215,["247"] = 217,["248"] = 218,["250"] = 220,["251"] = 221,["253"] = 224,["254"] = 225,["255"] = 226,["257"] = 228,["259"] = 231,["260"] = 232,["262"] = 235,["263"] = 236,["264"] = 238,["265"] = 239,["267"] = 242,["268"] = 243,["270"] = 246,["271"] = 247,["272"] = 247,["273"] = 247,["274"] = 247,["275"] = 247,["276"] = 247,["277"] = 247,["280"] = 252,["281"] = 253,["282"] = 200,["283"] = 255,["284"] = 256,["285"] = 257,["288"] = 258,["291"] = 259,["294"] = 260,["295"] = 260,["296"] = 260,["297"] = 260,["298"] = 261,["301"] = 262,["304"] = 263,["307"] = 264,["308"] = 260,["309"] = 260,["310"] = 255,["311"] = 267,["312"] = 268,["313"] = 271,["315"] = 282,["316"] = 283,["318"] = 286,["320"] = 289,["321"] = 290,["322"] = 291,["324"] = 294,["325"] = 295,["327"] = 267,["328"] = 298,["329"] = 299,["330"] = 300,["331"] = 302,["332"] = 303,["333"] = 304,["334"] = 305,["335"] = 306,["336"] = 308,["340"] = 316,["341"] = 317,["342"] = 319,["346"] = 327,["347"] = 328,["349"] = 330,["352"] = 334,["353"] = 298,["354"] = 336,["355"] = 337,["356"] = 336,["357"] = 339,["358"] = 340,["359"] = 339,["360"] = 5,["361"] = 348,["362"] = 348});
local ____exports = {}
local ____drop_item = require("class.drop_item")
local DropItem = ____drop_item.DropItem
local ____shop_item = require("class.shop_item")
local ShopItem = ____shop_item.ShopItem
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MGame = __TS__Class()
MGame.name = "MGame"
__TS__ClassExtends(MGame, CModule)
function MGame.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self._isPause = false
    self.tPlayerLastPauseTime = {}
    self.tPlayerLastUnPauseTime = {}
    self._playerCount = 1
    self._gameSuccess = false
end
function MGame.prototype.init(self, reload)
    GameEvent(
        "game_rules_state_change",
        function(self, ...)
            return self:OnGameRulesStateChange(...)
        end,
        self
    )
    GameEvent(
        "player_connect_full",
        function(self, ...)
            return self:OnPlayerConnectFull(...)
        end,
        self
    )
    GameEvent(
        "player_disconnect",
        function(self, ...)
            return self:OnPlayerDisconnect(...)
        end,
        self
    )
    GameEvent(
        "npc_spawned",
        function(self, ...)
            return self:OnNPCSpawned(...)
        end,
        self
    )
    GameEvent(
        "custom_npc_first_spawned",
        function(self, ...)
            return self:OnNPCFirstSpawned(...)
        end,
        self
    )
    GameEvent(
        "entity_killed",
        function(self, ...)
            return self:OnEntityKilled(...)
        end,
        self
    )
    CustomUIEvent(
        "CustomTogglePause",
        function(self, ...)
            return self:OnCustomTogglePause(...)
        end,
        self
    )
    if not reload then
        if IsServer() then
            _G.MODIFIER_EVENTS_DUMMY = CreateModifierThinker(
                not IsDedicatedServer() and GameRules:GetGameModeEntity() or nil,
                nil,
                "modifier_events",
                nil,
                Vector(0, 0, 0),
                DOTA_TEAM_NOTEAM,
                false
            )
            _G.CLIENT_ABILITY = MODIFIER_EVENTS_DUMMY:AddAbility("client_ability")
            if IsValid(CLIENT_ABILITY) then
                CustomNetTables:SetTableValue(
                    "common",
                    "client_ability",
                    {_ = CLIENT_ABILITY:entindex()}
                )
            end
        end
    end
end
function MGame.prototype.EachTeamsWithPlayer(self, funcCallBack)
    for iTeamNumber = DOTA_TEAM_FIRST, DOTA_TEAM_CUSTOM_7, 1 do
        local iPlayerCount = PlayerResource:GetPlayerCountForTeam(iTeamNumber)
        if iPlayerCount > 0 then
            if funcCallBack(nil, iTeamNumber) == true then
                break
            end
        end
    end
end
function MGame.prototype.EachPlayer(self, funcCallBack, iTeamNumber)
    if iTeamNumber == nil then
        self:EachTeamsWithPlayer(function(self, _iTeamNumber)
            for n = 1, PlayerResource:GetPlayerCountForTeam(_iTeamNumber), 1 do
                local iPlayerID = PlayerResource:GetNthPlayerIDOnTeam(_iTeamNumber, n)
                if PlayerResource:IsValidPlayerID(iPlayerID) then
                    if funcCallBack(nil, iPlayerID, _iTeamNumber, n) == true then
                        break
                    end
                end
            end
        end)
    else
        for n = 1, PlayerResource:GetPlayerCountForTeam(iTeamNumber), 1 do
            local iPlayerID = PlayerResource:GetNthPlayerIDOnTeam(iTeamNumber, n)
            if PlayerResource:IsValidPlayerID(iPlayerID) then
                if funcCallBack(nil, iPlayerID, iTeamNumber, n) == true then
                    break
                end
            end
        end
    end
end
function MGame.prototype.GetValidPlayerCount(self, iTeamNumber)
    local n = 0
    self:EachPlayer(
        function(____, iPlayerID)
            local hHero = PlayerResource:GetSelectedHeroEntity(iPlayerID)
            if IsValid(hHero) then
                n = n + 1
            end
        end,
        iTeamNumber
    )
    return n
end
function MGame.prototype.GetPlayerTeamSlot(self, playerID)
    local team = PlayerResource:GetTeam(playerID)
    for i = 1, PlayerResource:GetPlayerCountForTeam(team), 1 do
        do
            local slotPlayerID = PlayerResource:GetNthPlayerIDOnTeam(team, i)
            if slotPlayerID ~= playerID then
                goto __continue31
            end
            return i
        end
        ::__continue31::
    end
    return 0
end
function MGame.prototype.GetPlayerCount(self, isConnected)
    if isConnected == nil then
        isConnected = false
    end
    local n = 0
    self:EachPlayer(function(____, playerID)
        if isConnected then
            if PlayerResource:GetConnectionState(playerID) == DOTA_CONNECTION_STATE_CONNECTED then
                n = n + 1
            end
        else
            n = n + 1
        end
    end)
    return n
end
function MGame.prototype.IsPause(self)
    return self._isPause
end
function MGame.prototype.Pause(self, bFlag)
    self._isPause = bFlag
    PauseGame(self._isPause)
    self:UpdateCustomPause()
end
function MGame.prototype.UpdateCustomPause(self)
    CustomNetTables:SetTableValue("common", "custom_pause", {pause = self._isPause})
end
function MGame.prototype.SetGameResult(self, success)
    self._gameSuccess = success
end
function MGame.prototype.GetGameResult(self)
    return self._gameSuccess
end
function MGame.prototype.OnNPCSpawned(self, tEvents)
    local spawnedUnit = EntIndexToHScript(tEvents.entindex)
    if not IsValid(spawnedUnit) then
        return
    end
    LargeNumberHealth:Clear(spawnedUnit)
    if spawnedUnit:IsRealHero() and spawnedUnit:GetPlayerOwnerID() == -1 then
        return
    end
    if spawnedUnit:GetUnitName() ~= "npc_dota_thinker" then
        if not spawnedUnit:HasModifier("modifier_common") then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_common", nil)
        end
        if spawnedUnit:IsRealHero() and not spawnedUnit:HasModifier("modifier_hero") then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_hero", nil)
        end
        if spawnedUnit:IsRealHero() and not spawnedUnit:HasModifier("modifier_bless_set") then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_bless_set", nil)
        end
    end
    if not spawnedUnit.__isNotFirstSpawn then
        spawnedUnit:SetMaximumGoldBounty(0)
        spawnedUnit:SetMinimumGoldBounty(0)
        spawnedUnit:SetDeathXP(0)
        spawnedUnit.__isNotFirstSpawn = true
        FireGameEventLocal("custom_npc_first_spawned", {entindex = tEvents.entindex})
    end
    if spawnedUnit:GetUnitName() ~= "npc_dota_thinker" then
        if spawnedUnit:HasModifier("modifier_common") then
            spawnedUnit:CalculateGenericBonuses()
            LargeNumberHealth:Refresh(spawnedUnit)
            spawnedUnit:SetMana(spawnedUnit:GetMaxMana())
        end
    end
    Event:Fire("npc_spawned", {unit = spawnedUnit})
end
function MGame.prototype.OnNPCFirstSpawned(self, tEvents)
    local spawnedUnit = EntIndexToHScript(tEvents.entindex)
    if not IsValid(spawnedUnit) then
        return
    end
    if spawnedUnit:GetUnitName() == "npc_dota_thinker" then
        return
    end
    if spawnedUnit:HasAbility("ability_capture") then
        spawnedUnit:RemoveAbility("ability_capture")
    end
    if spawnedUnit:HasAbility("abyssal_underlord_portal_warp") then
        spawnedUnit:RemoveAbility("abyssal_underlord_portal_warp")
    end
    if spawnedUnit:HasAbility("twin_gate_portal_warp") then
        spawnedUnit:RemoveAbility("twin_gate_portal_warp")
    end
    if spawnedUnit:HasAbility("ability_lamp_use") then
        spawnedUnit:RemoveAbility("ability_lamp_use")
    end
    if spawnedUnit:HasAbility("ability_pluck_famango") then
        spawnedUnit:RemoveAbility("ability_pluck_famango")
    end
    if spawnedUnit:HasAbility("special_bonus_attributes") then
        spawnedUnit:RemoveAbility("special_bonus_attributes")
    end
    if spawnedUnit:IsRealHero() then
        spawnedUnit:SetStashEnabled(true)
        spawnedUnit:SetAbilityPoints(0)
    else
        spawnedUnit:SetUnitCanRespawn_Engine(true)
    end
    if spawnedUnit:GetClassname() == "npc_dota_building" then
        spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_breakable_building", nil)
    end
    local kv = GetUnitKeyValuesByName(spawnedUnit:GetUnitName())
    if kv ~= nil then
        if kv.SpawnModifier ~= nil and kv.SpawnModifier ~= "" then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, kv.SpawnModifier, nil)
        end
        if kv.AIModifier ~= nil and kv.AIModifier ~= "" then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, kv.AIModifier, nil)
        end
        if not spawnedUnit:IsHero() and (kv.AttackSpeedActivityModifiers ~= nil or kv.AttackRangeActivityModifiers ~= nil or kv.MovementSpeedActivityModifiers ~= nil) then
            spawnedUnit:AddNewModifier(
                spawnedUnit,
                nil,
                "modifier_activity_modifiers",
                nil,
                AddModifierFlag.IGNORE_DEATH
            )
        end
    end
    spawnedUnit:CallAbilityCreated()
    Event:Fire("npc_first_spawned", {unit = spawnedUnit})
end
function MGame.prototype.OnEntityKilled(self, event)
    local killedUnit = EntIndexToHScript(event.entindex_killed)
    if not IsValid(killedUnit) then
        return
    end
    if killedUnit:IsRealHero() then
        return
    end
    if killedUnit:UnitCanRespawn() then
        return
    end
    killedUnit:GameTimer(
        "RecyclingUnit",
        8,
        function()
            if killedUnit:IsAlive() then
                return
            end
            if killedUnit:IsRealHero() then
                return
            end
            if killedUnit:UnitCanRespawn() then
                return
            end
            killedUnit:SafeRemoveUnit()
        end
    )
end
function MGame.prototype.OnGameRulesStateChange(self, events)
    local state = GameRules:State_Get()
    if state == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
    end
    if state == DOTA_GAMERULES_STATE_HERO_SELECTION then
        Event:Fire("game_init", {})
    end
    if state == DOTA_GAMERULES_STATE_STRATEGY_TIME then
    end
    if state == DOTA_GAMERULES_STATE_PRE_GAME then
        DropItem:Prewarm()
        ShopItem:Prewarm()
    end
    if state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        GameRules:SetTimeOfDay(0.26)
    end
end
function MGame.prototype.OnCustomTogglePause(self, tEvents)
    self:print("CustomTogglePause", tEvents)
    local playerID = tEvents.PlayerID
    if self:GetValidPlayerCount() > 1 then
        local now = Time()
        if self._isPause then
            local fTime = self.tPlayerLastUnPauseTime[playerID]
            if fTime ~= nil and now - fTime < CUSTOM_PAUSE_CD then
                ErrorMessage("Custom_Cant_Unpause", playerID)
                return
            end
        else
            local fTime = self.tPlayerLastPauseTime[playerID]
            if fTime ~= nil and now - fTime < CUSTOM_PAUSE_CD then
                ErrorMessage("Custom_Cant_Pause", playerID)
                return
            end
        end
        if self._isPause then
            self.tPlayerLastUnPauseTime[playerID] = now
        else
            self.tPlayerLastPauseTime[playerID] = now
        end
    end
    self:Pause(not self._isPause)
end
function MGame.prototype.OnPlayerConnectFull(self, events)
    PrintTable(events)
end
function MGame.prototype.OnPlayerDisconnect(self, events)
    PrintTable(events)
end
MGame = __TS__DecorateLegacy({reloadable}, MGame)
if Game == nil then
    Game = __TS__New(MGame)
end
return ____exports
