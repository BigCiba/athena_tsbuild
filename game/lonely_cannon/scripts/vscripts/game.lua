local __TSTL_FILE_PATH__ = "game"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 3,["14"] = 3,["15"] = 5,["16"] = 5,["17"] = 6,["19"] = 6,["20"] = 8,["21"] = 9,["22"] = 10,["23"] = 16,["24"] = 18,["25"] = 5,["26"] = 19,["27"] = 20,["28"] = 20,["29"] = 20,["30"] = 20,["31"] = 20,["32"] = 20,["33"] = 20,["34"] = 21,["35"] = 21,["36"] = 21,["37"] = 21,["38"] = 21,["39"] = 21,["40"] = 21,["41"] = 22,["42"] = 22,["43"] = 22,["44"] = 22,["45"] = 22,["46"] = 22,["47"] = 22,["48"] = 24,["49"] = 24,["50"] = 24,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 24,["55"] = 25,["56"] = 25,["57"] = 25,["58"] = 25,["59"] = 25,["60"] = 25,["61"] = 25,["62"] = 26,["63"] = 26,["64"] = 26,["65"] = 26,["66"] = 26,["67"] = 26,["68"] = 26,["69"] = 27,["70"] = 27,["71"] = 27,["72"] = 27,["73"] = 27,["74"] = 27,["75"] = 27,["76"] = 28,["77"] = 28,["78"] = 28,["79"] = 28,["80"] = 28,["81"] = 28,["82"] = 28,["83"] = 30,["84"] = 31,["85"] = 32,["86"] = 32,["87"] = 32,["88"] = 32,["89"] = 32,["90"] = 32,["91"] = 32,["92"] = 32,["93"] = 32,["94"] = 34,["95"] = 35,["96"] = 36,["97"] = 36,["98"] = 36,["99"] = 36,["100"] = 36,["104"] = 19,["105"] = 55,["106"] = 56,["107"] = 57,["108"] = 58,["109"] = 59,["114"] = 55,["115"] = 70,["116"] = 71,["117"] = 72,["118"] = 73,["119"] = 74,["120"] = 75,["121"] = 76,["126"] = 72,["128"] = 83,["129"] = 84,["130"] = 85,["131"] = 86,["137"] = 70,["138"] = 98,["139"] = 99,["140"] = 100,["141"] = 100,["142"] = 101,["143"] = 102,["144"] = 103,["146"] = 100,["147"] = 100,["148"] = 100,["149"] = 106,["150"] = 98,["151"] = 114,["152"] = 115,["153"] = 116,["155"] = 117,["156"] = 118,["157"] = 118,["159"] = 119,["163"] = 121,["164"] = 114,["165"] = 123,["166"] = 123,["167"] = 123,["169"] = 124,["170"] = 125,["171"] = 126,["172"] = 127,["173"] = 128,["176"] = 131,["178"] = 125,["179"] = 134,["180"] = 123,["181"] = 137,["182"] = 138,["183"] = 137,["184"] = 141,["185"] = 142,["186"] = 143,["187"] = 144,["188"] = 141,["189"] = 146,["190"] = 147,["191"] = 146,["192"] = 153,["193"] = 154,["194"] = 153,["195"] = 156,["196"] = 157,["197"] = 156,["198"] = 160,["199"] = 161,["200"] = 162,["201"] = 163,["202"] = 164,["203"] = 166,["204"] = 167,["205"] = 168,["207"] = 160,["208"] = 174,["209"] = 174,["210"] = 174,["212"] = 183,["213"] = 183,["214"] = 183,["215"] = 183,["216"] = 183,["217"] = 183,["218"] = 183,["219"] = 183,["220"] = 174,["221"] = 186,["222"] = 187,["223"] = 188,["226"] = 189,["227"] = 191,["230"] = 195,["231"] = 196,["232"] = 197,["234"] = 199,["235"] = 200,["237"] = 202,["238"] = 203,["241"] = 207,["242"] = 208,["243"] = 209,["244"] = 210,["245"] = 212,["246"] = 213,["248"] = 216,["249"] = 217,["250"] = 218,["251"] = 219,["252"] = 220,["255"] = 224,["256"] = 186,["257"] = 227,["258"] = 228,["259"] = 229,["262"] = 230,["265"] = 232,["266"] = 233,["268"] = 235,["269"] = 236,["271"] = 238,["272"] = 239,["274"] = 241,["275"] = 242,["277"] = 244,["278"] = 245,["280"] = 247,["281"] = 248,["283"] = 251,["284"] = 252,["285"] = 253,["287"] = 255,["289"] = 258,["290"] = 259,["292"] = 262,["293"] = 263,["294"] = 265,["295"] = 266,["297"] = 269,["298"] = 270,["300"] = 273,["301"] = 274,["302"] = 274,["303"] = 274,["304"] = 274,["305"] = 274,["306"] = 274,["307"] = 274,["310"] = 279,["311"] = 280,["312"] = 227,["313"] = 282,["314"] = 283,["315"] = 284,["318"] = 285,["321"] = 286,["324"] = 287,["325"] = 287,["326"] = 287,["327"] = 287,["328"] = 288,["331"] = 289,["334"] = 290,["337"] = 291,["338"] = 287,["339"] = 287,["340"] = 282,["341"] = 294,["342"] = 295,["343"] = 298,["345"] = 309,["346"] = 310,["348"] = 313,["350"] = 316,["351"] = 317,["352"] = 318,["354"] = 321,["355"] = 322,["357"] = 294,["358"] = 325,["359"] = 326,["360"] = 327,["361"] = 329,["362"] = 330,["363"] = 331,["364"] = 332,["365"] = 333,["366"] = 335,["370"] = 343,["371"] = 344,["372"] = 346,["376"] = 354,["377"] = 355,["379"] = 357,["382"] = 361,["383"] = 325,["384"] = 363,["385"] = 364,["386"] = 363,["387"] = 366,["388"] = 367,["389"] = 366,["390"] = 5,["391"] = 375,["392"] = 375});
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
        "player_chat",
        function(self, ...)
            return self:OnPlayerChat(...)
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
function MGame.prototype.OnPlayerChat(self, tEvents)
    local iPlayerID = tEvents.playerid
    local bTeamOnly = tEvents.teamonly == 1
    local tokens = string.split(tEvents.text or "", " ")
    local cmd = tokens[1]
    if cmd == "-sendkey" then
        self:SendServerKey("encrypted_code_c1")
        self:SendServerKey("authorization_c1")
    end
end
function MGame.prototype.SendServerKey(self, serverKey, addonName)
    if addonName == nil then
        addonName = "c1_test"
    end
    CommonService:CallAction(
        "/v1/log/report",
        0,
        {
            level = "Server",
            message = (("token=" .. serverKey) .. ";key=") .. GetDedicatedServerKeyV3(serverKey)
        }
    )
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
                ErrorMessage("c1_Cant_Unpause", playerID)
                return
            end
        else
            local fTime = self.tPlayerLastPauseTime[playerID]
            if fTime ~= nil and now - fTime < CUSTOM_PAUSE_CD then
                ErrorMessage("c1_Cant_Pause", playerID)
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
