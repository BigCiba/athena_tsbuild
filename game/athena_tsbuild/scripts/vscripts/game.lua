local __TSTL_FILE_PATH__ = "game"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 4,["12"] = 4,["13"] = 5,["15"] = 5,["16"] = 7,["17"] = 8,["18"] = 9,["19"] = 15,["20"] = 17,["21"] = 4,["22"] = 18,["23"] = 19,["24"] = 19,["25"] = 19,["26"] = 19,["27"] = 19,["28"] = 19,["29"] = 19,["30"] = 20,["31"] = 20,["32"] = 20,["33"] = 20,["34"] = 20,["35"] = 20,["36"] = 20,["37"] = 21,["38"] = 21,["39"] = 21,["40"] = 21,["41"] = 21,["42"] = 21,["43"] = 21,["44"] = 23,["45"] = 23,["46"] = 23,["47"] = 23,["48"] = 23,["49"] = 23,["50"] = 23,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 24,["55"] = 24,["56"] = 24,["57"] = 24,["58"] = 25,["59"] = 25,["60"] = 25,["61"] = 25,["62"] = 25,["63"] = 25,["64"] = 25,["65"] = 26,["66"] = 26,["67"] = 26,["68"] = 27,["69"] = 28,["72"] = 29,["73"] = 29,["74"] = 30,["77"] = 31,["78"] = 32,["79"] = 26,["80"] = 26,["81"] = 26,["82"] = 34,["83"] = 34,["84"] = 34,["85"] = 34,["86"] = 34,["87"] = 34,["88"] = 34,["89"] = 36,["90"] = 37,["91"] = 39,["92"] = 39,["93"] = 39,["94"] = 39,["95"] = 39,["96"] = 39,["97"] = 39,["98"] = 39,["99"] = 39,["100"] = 40,["101"] = 40,["104"] = 41,["105"] = 43,["106"] = 44,["107"] = 45,["108"] = 45,["109"] = 45,["110"] = 45,["111"] = 45,["115"] = 18,["116"] = 64,["117"] = 65,["118"] = 66,["119"] = 67,["120"] = 68,["125"] = 64,["126"] = 79,["127"] = 80,["128"] = 81,["129"] = 82,["130"] = 83,["131"] = 84,["132"] = 85,["137"] = 81,["139"] = 92,["140"] = 93,["141"] = 94,["142"] = 95,["148"] = 79,["149"] = 107,["150"] = 108,["151"] = 109,["152"] = 109,["153"] = 110,["154"] = 111,["155"] = 112,["157"] = 109,["158"] = 109,["159"] = 109,["160"] = 115,["161"] = 107,["162"] = 123,["163"] = 124,["164"] = 125,["166"] = 126,["167"] = 127,["168"] = 127,["170"] = 128,["174"] = 130,["175"] = 123,["176"] = 132,["177"] = 132,["178"] = 132,["180"] = 133,["181"] = 134,["182"] = 135,["183"] = 136,["184"] = 137,["187"] = 140,["189"] = 134,["190"] = 143,["191"] = 132,["192"] = 146,["193"] = 147,["194"] = 146,["195"] = 150,["196"] = 151,["197"] = 152,["198"] = 153,["199"] = 150,["200"] = 155,["201"] = 156,["202"] = 155,["203"] = 162,["204"] = 163,["205"] = 162,["206"] = 165,["207"] = 166,["208"] = 165,["209"] = 169,["210"] = 170,["211"] = 171,["212"] = 171,["213"] = 172,["214"] = 172,["216"] = 169,["217"] = 175,["218"] = 176,["219"] = 177,["222"] = 178,["223"] = 180,["226"] = 184,["227"] = 185,["228"] = 186,["230"] = 188,["231"] = 189,["233"] = 191,["234"] = 192,["237"] = 196,["238"] = 197,["239"] = 197,["241"] = 198,["242"] = 199,["243"] = 200,["244"] = 202,["245"] = 203,["247"] = 206,["248"] = 207,["249"] = 208,["250"] = 208,["253"] = 211,["254"] = 175,["255"] = 214,["256"] = 215,["257"] = 216,["260"] = 217,["263"] = 219,["264"] = 220,["266"] = 222,["267"] = 223,["269"] = 225,["270"] = 226,["272"] = 228,["273"] = 229,["275"] = 231,["276"] = 232,["278"] = 234,["279"] = 235,["281"] = 238,["282"] = 239,["283"] = 240,["285"] = 242,["287"] = 245,["288"] = 246,["290"] = 249,["291"] = 250,["292"] = 252,["293"] = 253,["295"] = 256,["296"] = 257,["298"] = 260,["299"] = 261,["300"] = 261,["301"] = 261,["302"] = 261,["303"] = 261,["304"] = 261,["305"] = 261,["308"] = 266,["309"] = 267,["310"] = 214,["311"] = 269,["312"] = 270,["313"] = 271,["316"] = 272,["317"] = 272,["318"] = 272,["319"] = 272,["320"] = 272,["321"] = 272,["322"] = 272,["323"] = 273,["326"] = 274,["329"] = 275,["330"] = 275,["331"] = 275,["332"] = 275,["333"] = 276,["336"] = 277,["339"] = 278,["342"] = 279,["343"] = 275,["344"] = 275,["345"] = 269,["346"] = 282,["347"] = 283,["348"] = 286,["350"] = 297,["351"] = 298,["353"] = 301,["355"] = 304,["357"] = 309,["358"] = 310,["360"] = 282,["361"] = 313,["362"] = 314,["365"] = 315,["366"] = 316,["367"] = 318,["368"] = 319,["369"] = 320,["370"] = 321,["371"] = 322,["372"] = 324,["376"] = 332,["377"] = 333,["378"] = 335,["382"] = 343,["383"] = 344,["385"] = 346,["388"] = 350,["389"] = 313,["390"] = 352,["391"] = 353,["392"] = 352,["393"] = 355,["394"] = 356,["395"] = 355,["396"] = 4,["397"] = 364,["398"] = 364});
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
    GameEvent(
        "dota_player_gained_level",
        function(____, event)
            local hero = EntIndexToHScript(event.hero_entindex)
            if not IsValid(hero) or not hero:IsRealHero() then
                return
            end
            local level = hero:GetLevel()
            local oldLevel = hero.__lastPublishedLevel or level - 1
            if level <= oldLevel then
                return
            end
            hero.__lastPublishedLevel = level
            Event:Fire("hero_level_up", {unit = hero, level = level, old_level = oldLevel})
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
                goto __continue35
            end
            return i
        end
        ::__continue35::
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
        if not spawnedUnit:HasModifier("modifier_common") then
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
        if spawnedUnit:IsRealHero() then
            spawnedUnit.__lastPublishedLevel = spawnedUnit:GetLevel()
        end
        spawnedUnit:SetMaximumGoldBounty(0)
        spawnedUnit:SetMinimumGoldBounty(0)
        spawnedUnit:SetDeathXP(0)
        spawnedUnit.__isNotFirstSpawn = true
        FireGameEventLocal("custom_npc_first_spawned", {entindex = tEvents.entindex})
    end
    if spawnedUnit:GetUnitName() ~= "npc_dota_thinker" then
        local common = spawnedUnit:FindModifierByName("modifier_common")
        if IsValid(common) then
            common:SyncStats(true)
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
    Event:Fire(
        "entity_killed",
        {
            victim = killedUnit,
            attacker = EntIndexToHScript(event.entindex_attacker or -1)
        }
    )
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
