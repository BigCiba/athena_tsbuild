local __TSTL_FILE_PATH__ = "game"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["15"] = 4,["16"] = 6,["17"] = 7,["18"] = 8,["19"] = 14,["20"] = 16,["21"] = 3,["22"] = 17,["23"] = 18,["24"] = 18,["25"] = 18,["26"] = 18,["27"] = 18,["28"] = 18,["29"] = 18,["30"] = 19,["31"] = 19,["32"] = 19,["33"] = 19,["34"] = 19,["35"] = 19,["36"] = 19,["37"] = 20,["38"] = 20,["39"] = 20,["40"] = 20,["41"] = 20,["42"] = 20,["43"] = 20,["44"] = 22,["45"] = 22,["46"] = 22,["47"] = 22,["48"] = 22,["49"] = 22,["50"] = 22,["51"] = 23,["52"] = 23,["53"] = 23,["54"] = 23,["55"] = 23,["56"] = 23,["57"] = 23,["58"] = 24,["59"] = 24,["60"] = 24,["61"] = 24,["62"] = 24,["63"] = 24,["64"] = 24,["65"] = 25,["66"] = 25,["67"] = 25,["68"] = 25,["69"] = 25,["70"] = 25,["71"] = 25,["72"] = 27,["73"] = 28,["74"] = 30,["75"] = 30,["76"] = 30,["77"] = 30,["78"] = 30,["79"] = 30,["80"] = 30,["81"] = 30,["82"] = 30,["83"] = 31,["84"] = 31,["87"] = 32,["88"] = 34,["89"] = 35,["90"] = 36,["91"] = 36,["92"] = 36,["93"] = 36,["94"] = 36,["98"] = 17,["99"] = 55,["100"] = 56,["101"] = 57,["102"] = 58,["103"] = 59,["108"] = 55,["109"] = 70,["110"] = 71,["111"] = 72,["112"] = 73,["113"] = 74,["114"] = 75,["115"] = 76,["120"] = 72,["122"] = 83,["123"] = 84,["124"] = 85,["125"] = 86,["131"] = 70,["132"] = 98,["133"] = 99,["134"] = 100,["135"] = 100,["136"] = 101,["137"] = 102,["138"] = 103,["140"] = 100,["141"] = 100,["142"] = 100,["143"] = 106,["144"] = 98,["145"] = 114,["146"] = 115,["147"] = 116,["149"] = 117,["150"] = 118,["151"] = 118,["153"] = 119,["157"] = 121,["158"] = 114,["159"] = 123,["160"] = 123,["161"] = 123,["163"] = 124,["164"] = 125,["165"] = 126,["166"] = 127,["167"] = 128,["170"] = 131,["172"] = 125,["173"] = 134,["174"] = 123,["175"] = 137,["176"] = 138,["177"] = 137,["178"] = 141,["179"] = 142,["180"] = 143,["181"] = 144,["182"] = 141,["183"] = 146,["184"] = 147,["185"] = 146,["186"] = 153,["187"] = 154,["188"] = 153,["189"] = 156,["190"] = 157,["191"] = 156,["192"] = 160,["193"] = 161,["194"] = 162,["195"] = 162,["196"] = 163,["197"] = 163,["199"] = 160,["200"] = 166,["201"] = 167,["202"] = 168,["205"] = 169,["206"] = 171,["209"] = 175,["210"] = 176,["211"] = 177,["213"] = 179,["214"] = 180,["216"] = 182,["217"] = 183,["220"] = 187,["221"] = 188,["222"] = 189,["223"] = 190,["224"] = 192,["225"] = 193,["227"] = 196,["228"] = 197,["229"] = 198,["230"] = 199,["231"] = 200,["234"] = 204,["235"] = 166,["236"] = 207,["237"] = 208,["238"] = 209,["241"] = 210,["244"] = 212,["245"] = 213,["247"] = 215,["248"] = 216,["250"] = 218,["251"] = 219,["253"] = 221,["254"] = 222,["256"] = 224,["257"] = 225,["259"] = 227,["260"] = 228,["262"] = 231,["263"] = 232,["264"] = 233,["266"] = 235,["268"] = 238,["269"] = 239,["271"] = 242,["272"] = 243,["273"] = 245,["274"] = 246,["276"] = 249,["277"] = 250,["279"] = 253,["280"] = 254,["281"] = 254,["282"] = 254,["283"] = 254,["284"] = 254,["285"] = 254,["286"] = 254,["289"] = 259,["290"] = 260,["291"] = 207,["292"] = 262,["293"] = 263,["294"] = 264,["297"] = 265,["300"] = 266,["303"] = 267,["304"] = 267,["305"] = 267,["306"] = 267,["307"] = 268,["310"] = 269,["313"] = 270,["316"] = 271,["317"] = 267,["318"] = 267,["319"] = 262,["320"] = 274,["321"] = 275,["322"] = 278,["324"] = 289,["325"] = 290,["327"] = 293,["329"] = 296,["331"] = 301,["332"] = 302,["334"] = 274,["335"] = 305,["336"] = 306,["339"] = 307,["340"] = 308,["341"] = 310,["342"] = 311,["343"] = 312,["344"] = 313,["345"] = 314,["346"] = 316,["350"] = 324,["351"] = 325,["352"] = 327,["356"] = 335,["357"] = 336,["359"] = 338,["362"] = 342,["363"] = 305,["364"] = 344,["365"] = 345,["366"] = 344,["367"] = 347,["368"] = 348,["369"] = 347,["370"] = 3,["371"] = 356,["372"] = 356});
local ____exports = {}
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
                nil,
                nil,
                _G.modifier_events ~= nil and "modifier_events" or "modifier_invulnerable",
                nil,
                Vector(0, 0, 0),
                DOTA_TEAM_NOTEAM,
                false
            )
            if not IsValid(MODIFIER_EVENTS_DUMMY) then
                self:error("通信载体创建失败")
                return
            end
            _G.RECORD_SYSTEM_DUMMY = MODIFIER_EVENTS_DUMMY
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
                goto __continue32
            end
            return i
        end
        ::__continue32::
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
function MGame.prototype.ResetRunState(self)
    self._gameSuccess = false
    self.tPlayerLastPauseTime = {}
    self.tPlayerLastUnPauseTime = {}
    if self._isPause or GameRules:IsGamePaused() then
        self:Pause(false)
    end
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
        if _G.modifier_common ~= nil and not spawnedUnit:HasModifier("modifier_common") then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_common", nil)
        end
        if _G.modifier_hero ~= nil and spawnedUnit:IsRealHero() and not spawnedUnit:HasModifier("modifier_hero") then
            spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_hero", nil)
        end
        if _G.modifier_bless_set ~= nil and spawnedUnit:IsRealHero() and not spawnedUnit:HasModifier("modifier_bless_set") then
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
    end
    if state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        GameRules:SetTimeOfDay(0.26)
    end
end
function MGame.prototype.OnCustomTogglePause(self, tEvents)
    if GameState:GetStateName() ~= "GameState_Battle" and not self._isPause then
        return
    end
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
