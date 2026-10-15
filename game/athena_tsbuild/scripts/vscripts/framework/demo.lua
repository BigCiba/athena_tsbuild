local __TSTL_FILE_PATH__ = "framework/demo"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 2,["13"] = 2,["14"] = 12,["15"] = 12,["16"] = 13,["18"] = 13,["19"] = 15,["20"] = 16,["21"] = 17,["22"] = 18,["23"] = 20,["24"] = 21,["25"] = 22,["26"] = 23,["27"] = 24,["28"] = 25,["29"] = 26,["30"] = 27,["31"] = 28,["32"] = 29,["33"] = 30,["34"] = 12,["35"] = 32,["36"] = 33,["39"] = 36,["40"] = 36,["41"] = 32,["42"] = 39,["43"] = 40,["44"] = 41,["47"] = 44,["48"] = 45,["49"] = 45,["50"] = 45,["51"] = 45,["52"] = 45,["53"] = 45,["54"] = 45,["56"] = 39,["57"] = 49,["58"] = 50,["59"] = 51,["62"] = 52,["63"] = 53,["66"] = 54,["67"] = 54,["68"] = 54,["69"] = 54,["70"] = 54,["71"] = 54,["72"] = 54,["73"] = 54,["74"] = 55,["77"] = 58,["78"] = 59,["79"] = 60,["80"] = 61,["81"] = 62,["82"] = 63,["83"] = 64,["84"] = 49,["85"] = 67,["86"] = 68,["87"] = 69,["88"] = 70,["89"] = 71,["90"] = 72,["91"] = 72,["92"] = 72,["93"] = 72,["94"] = 72,["95"] = 73,["97"] = 76,["98"] = 76,["99"] = 76,["100"] = 76,["101"] = 76,["102"] = 76,["103"] = 76,["104"] = 77,["105"] = 77,["106"] = 77,["107"] = 77,["108"] = 77,["109"] = 77,["110"] = 77,["111"] = 79,["112"] = 79,["113"] = 79,["114"] = 80,["117"] = 83,["118"] = 85,["119"] = 86,["120"] = 87,["121"] = 88,["122"] = 89,["123"] = 90,["124"] = 96,["125"] = 97,["126"] = 98,["129"] = 101,["131"] = 79,["132"] = 79,["133"] = 79,["134"] = 67,["135"] = 112,["136"] = 113,["137"] = 113,["138"] = 113,["139"] = 114,["140"] = 114,["141"] = 114,["143"] = 114,["144"] = 114,["145"] = 114,["147"] = 114,["148"] = 112,["149"] = 122,["150"] = 123,["151"] = 124,["153"] = 126,["154"] = 127,["156"] = 129,["157"] = 129,["158"] = 129,["159"] = 129,["160"] = 129,["161"] = 129,["162"] = 129,["163"] = 129,["164"] = 129,["165"] = 122,["166"] = 132,["167"] = 133,["168"] = 134,["169"] = 135,["171"] = 133,["172"] = 132,["173"] = 140,["174"] = 141,["175"] = 141,["176"] = 141,["177"] = 141,["178"] = 141,["179"] = 141,["180"] = 141,["181"] = 141,["182"] = 141,["183"] = 141,["184"] = 151,["185"] = 140,["186"] = 153,["187"] = 154,["190"] = 157,["191"] = 158,["192"] = 159,["193"] = 161,["194"] = 162,["195"] = 163,["197"] = 164,["198"] = 164,["199"] = 165,["200"] = 166,["201"] = 167,["203"] = 169,["205"] = 164,["208"] = 173,["209"] = 174,["211"] = 176,["212"] = 177,["214"] = 179,["215"] = 180,["217"] = 153,["218"] = 183,["219"] = 184,["220"] = 185,["221"] = 186,["223"] = 183,["224"] = 193,["225"] = 194,["226"] = 193,["227"] = 197,["228"] = 197,["229"] = 203,["230"] = 204,["233"] = 205,["234"] = 205,["235"] = 205,["236"] = 205,["237"] = 205,["238"] = 203,["239"] = 213,["240"] = 214,["241"] = 215,["242"] = 216,["243"] = 217,["244"] = 218,["246"] = 219,["247"] = 219,["248"] = 220,["249"] = 221,["250"] = 222,["251"] = 223,["253"] = 219,["256"] = 226,["257"] = 227,["258"] = 227,["259"] = 227,["260"] = 228,["261"] = 229,["262"] = 227,["263"] = 227,["264"] = 231,["265"] = 232,["266"] = 233,["267"] = 234,["268"] = 234,["269"] = 234,["270"] = 234,["271"] = 234,["272"] = 234,["273"] = 234,["274"] = 234,["276"] = 213,["277"] = 239,["278"] = 240,["279"] = 241,["280"] = 242,["281"] = 243,["283"] = 245,["284"] = 239,["285"] = 248,["286"] = 249,["289"] = 250,["290"] = 251,["291"] = 252,["293"] = 254,["295"] = 256,["296"] = 248,["297"] = 259,["298"] = 260,["301"] = 261,["302"] = 262,["303"] = 263,["305"] = 265,["307"] = 267,["308"] = 259,["309"] = 272,["310"] = 273,["311"] = 274,["312"] = 275,["314"] = 277,["317"] = 272,["318"] = 283,["319"] = 284,["320"] = 285,["321"] = 283,["322"] = 288,["323"] = 289,["324"] = 290,["327"] = 294,["328"] = 294,["329"] = 294,["330"] = 294,["331"] = 294,["332"] = 294,["333"] = 294,["334"] = 294,["335"] = 295,["338"] = 299,["339"] = 300,["340"] = 301,["341"] = 302,["342"] = 303,["343"] = 288,["344"] = 305,["345"] = 306,["346"] = 307,["347"] = 308,["348"] = 308,["350"] = 305,["351"] = 312,["352"] = 313,["353"] = 314,["354"] = 312,["355"] = 318,["357"] = 319,["358"] = 319,["360"] = 320,["361"] = 321,["362"] = 322,["363"] = 323,["365"] = 325,["368"] = 319,["371"] = 327,["372"] = 318,["373"] = 334,["374"] = 336,["375"] = 337,["376"] = 334,["377"] = 340,["378"] = 341,["379"] = 342,["380"] = 340,["381"] = 345,["382"] = 346,["383"] = 347,["384"] = 348,["385"] = 345,["386"] = 350,["387"] = 351,["388"] = 350,["389"] = 356,["390"] = 357,["391"] = 358,["392"] = 356,["393"] = 360,["394"] = 360,["395"] = 364,["396"] = 365,["397"] = 366,["398"] = 366,["399"] = 366,["400"] = 366,["401"] = 366,["402"] = 366,["403"] = 366,["404"] = 366,["405"] = 367,["406"] = 364,["407"] = 12,["408"] = 374,["409"] = 374});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CDemo = __TS__Class()
CDemo.name = "CDemo"
__TS__ClassExtends(CDemo, CModule)
function CDemo.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.demoAttributeSource = "hud_demo_attribute"
    self.forceDashSearchRadius = 900
    self.forceDefensePending = {}
    self.forceDashUnlockTime = {}
    self.demoAttributeValues = {}
    self.damage_counter = false
    self.performance_heatmap = false
    self.free_spells = false
    self.avoid_damage = false
    self.huge_damage = false
    self.force_dash_auto_cast = false
    self.lock_mouse = true
    self.locl_camera = true
    self.service_switch = true
    self.spawnedUnitEntIndexes = {}
end
function CDemo.prototype.RegisterSpawnedUnit(self, unit)
    if not IsValid(unit) then
        return
    end
    local ____self_spawnedUnitEntIndexes_0 = self.spawnedUnitEntIndexes
    ____self_spawnedUnitEntIndexes_0[#____self_spawnedUnitEntIndexes_0 + 1] = unit:entindex()
end
function CDemo.prototype.InitSpawnedUnitByKV(self, spawnedUnit, unitName)
    local kv = GetUnitKeyValuesByName(unitName)
    if not IsValid(spawnedUnit) or kv == nil then
        return
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
function CDemo.prototype.CreateDemoUnitByTeam(self, data, team)
    local hPlayerHero = PlayerResource:GetSelectedHeroEntity(data.playerID)
    if not IsValid(hPlayerHero) then
        return
    end
    local vPosition = data.position
    if vPosition == vec3_invalid then
        return
    end
    local spawnedUnit = CreateUnitByName(
        data.str,
        vPosition,
        true,
        hPlayerHero,
        hPlayerHero,
        team
    )
    if not IsValid(spawnedUnit) then
        return
    end
    spawnedUnit:SetForwardVector(vec3_bottom)
    spawnedUnit:SetControllableByPlayer(data.playerID, true)
    spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_ai_disabled", {})
    self:RegisterSpawnedUnit(spawnedUnit)
    self:InitSpawnedUnitByKV(spawnedUnit, data.str)
    self:ApplyDemoDifficultyModifiers(spawnedUnit, data)
    return spawnedUnit
end
function CDemo.prototype.init(self, bReload)
    if not bReload then
        self.demoAttributeValues = {}
        SendToServerConsole("sv_cheats 1")
        SendToServerConsole("dota_ability_debug 0")
        Event:Register(
            "dash_end",
            function(____, event) return self:OnForceDashEnd(event) end,
            self
        )
        self:UpdateSettings()
    end
    GameEvent(
        "player_chat",
        function(self, ...)
            return self:OnPlayerChat(...)
        end,
        self
    )
    GameEvent(
        "game_rules_state_change",
        function(self, ...)
            return self:OnGameRulesStateChange(...)
        end,
        self
    )
    CustomUIEvent(
        "DemoEvent",
        function(self, data)
            if not IsInToolsMode() then
                return
            end
            local eventName = data.event_name
            local playerID = data.PlayerID or -1
            local unit = EntIndexToHScript(data.unit or -1)
            local position = data.position ~= nil and Vector(data.position["0"], data.position["1"], data.position["2"]) or vec3_invalid
            local str = data.str
            if type(eventName) == "string" and type(self[eventName]) == "function" then
                local params = {playerID = playerID, unit = unit, position = position, str = str}
                for k, v in pairs(data) do
                    if k ~= "event_name" and k ~= "player_id" and k ~= "unit" and k ~= "position" and k ~= "str" then
                        params[k] = v
                    end
                end
                self[eventName](self, params)
            end
        end,
        self
    )
end
function CDemo.prototype.GetToolSetting(self, playerID, key, defaultValue)
    local ____opt_3 = CommonService:GetPlayerServiceNetTable(playerID, "player_key_values")
    local ____opt_1 = ____opt_3 and ____opt_3[key]
    local value = ____opt_1 and ____opt_1.value
    local ____tonumber_result_5 = tonumber(value)
    if ____tonumber_result_5 == nil then
        ____tonumber_result_5 = value
    end
    local ____tonumber_result_5_6 = ____tonumber_result_5
    if ____tonumber_result_5_6 == nil then
        ____tonumber_result_5_6 = defaultValue
    end
    return ____tonumber_result_5_6
end
function CDemo.prototype.SetToolSetting(self, playerID, key, value)
    if value == true then
        value = "TRUE"
    end
    if value == false then
        value = "FALSE"
    end
    CommonService:CallAction(
        "/v1/key/save",
        playerID,
        {
            type = "tool_settings",
            key = key,
            value = tostring(value)
        }
    )
end
function CDemo.prototype.LoadConfig(self)
    Game:EachPlayer(function(____, playerID)
        if not PlayerResource:IsFakeClient(playerID) then
            CommonService:RepeatCallAction("/v1/key/fetch", playerID, {type = "tool_settings"})
        end
    end)
end
function CDemo.prototype.UpdateSettings(self)
    local settings = {
        free_spells = self.free_spells,
        lock_mouse = self.lock_mouse,
        avoid_damage = self.avoid_damage,
        huge_damage = self.huge_damage,
        damage_counter = self.damage_counter,
        performance_heatmap = self.performance_heatmap,
        force_dash_auto_cast = self.force_dash_auto_cast,
        service_switch = self.service_switch
    }
    CustomNetTables:SetTableValue("common", "demo_settings", settings)
end
function CDemo.prototype.OnPlayerChat(self, events)
    if not IsInToolsMode() then
        return
    end
    local playerID = events.playerid
    local text = string.lower(events.text)
    local teamOnly = events.teamonly == 1
    local tokens = string.split(text, " ")
    local cmd = tokens[1]
    local args = {}
    do
        local i = 1
        while i < #tokens do
            local tmp = tonumber(tokens[i + 1])
            if tmp then
                table.insert(args, tmp)
            else
                table.insert(args, tokens[i + 1])
            end
            i = i + 1
        end
    end
    if text == "0" then
        SendToServerConsole("cl_ent_text")
    end
    if text == "1" then
        SendToServerConsole("ent_text")
    end
    if text == "2" then
        SendToServerConsole("ent_kill")
    end
end
function CDemo.prototype.OnGameRulesStateChange(self, tEvents)
    local state = GameRules:State_Get()
    if state == DOTA_GAMERULES_STATE_HERO_SELECTION then
        self:LoadConfig()
    end
end
function CDemo.prototype.ChangeHostTimescale(self, data)
    SendToServerConsole("host_timescale " .. data.str)
end
function CDemo.prototype.Standby(self, data)
end
function CDemo.prototype.AddItem(self, data)
    if not data.unit then
        return
    end
    local itemName, ground = unpack(
        __TS__StringSplit(data.str, "|"),
        1,
        2
    )
end
function CDemo.prototype.Refresh(self, data)
    local heroes = HeroList:GetAllHeroes()
    for ____, hero in ipairs(heroes) do
        local particleID = ParticleManager:CreateParticleForce("particles/items2_fx/refresher.vpcf", PATTACH_ROOTBONE_FOLLOW, hero)
        ParticleManager:ReleaseParticleIndex(particleID)
        hero:EmitSound("DOTA_Item.Refresher.Activate")
        do
            local index = 0
            while index < hero:GetAbilityCount() - 1 do
                local ability = hero:GetAbilityByIndex(index)
                if ability then
                    ability:EndCooldown()
                    ability:RestoreCharges(10)
                end
                index = index + 1
            end
        end
        local itemList = hero:GetAllItems()
        __TS__ArrayForEach(
            itemList,
            function(____, item)
                item:EndCooldown()
                item:RestoreCharges(10)
            end
        )
        local oldHp = hero:GetHealth()
        hero:SetHealth(hero:GetMaxHealth())
        hero:SetMana(hero:GetMaxMana())
        self:print(
            "hp:刷新状态:",
            hero,
            hero:GetMaxHealth(),
            oldHp,
            " ->",
            hero:GetHealth()
        )
    end
end
function CDemo.prototype.FreeSpells(self, data)
    SendToServerConsole("toggle dota_ability_debug")
    self.free_spells = not self.free_spells
    if self.free_spells then
        self:Refresh(data)
    end
    self:UpdateSettings()
end
function CDemo.prototype.AvoidDamage(self, data)
    if data.unit == nil then
        return
    end
    self.avoid_damage = not self.avoid_damage
    if data.unit:HasModifier("modifier_invulnerable_buff") then
        data.unit:RemoveModifierByName("modifier_invulnerable_buff")
    else
        data.unit:AddNewModifier(data.unit, nil, "modifier_invulnerable_buff", nil)
    end
    self:UpdateSettings()
end
function CDemo.prototype.HugeDamage(self, data)
    if data.unit == nil then
        return
    end
    self.huge_damage = not self.huge_damage
    if data.unit:HasModifier("modifier_huge_damage") then
        data.unit:RemoveModifierByName("modifier_huge_damage")
    else
        data.unit:AddNewModifier(data.unit, nil, "modifier_huge_damage", nil)
    end
    self:UpdateSettings()
end
function CDemo.prototype.ControlUnit(self, data)
    if data.Unit then
        if data.Unit:IsControllableByAnyPlayer() then
            data.Unit:SetControllableByPlayer(-1, true)
        else
            data.Unit:SetControllableByPlayer(data.PlayerID, true)
        end
    end
end
function CDemo.prototype.CreateEnemy(self, data)
    self:print("OnCreateEnemy:", data.str)
    self:CreateDemoUnitByTeam(data, DOTA_TEAM_BADGUYS)
end
function CDemo.prototype.DummyTarget(self, data)
    local playerHero = PlayerResource:GetSelectedHeroEntity(data.playerID)
    if not IsValid(playerHero) or data.position == vec3_invalid then
        return
    end
    local dummy = CreateUnitByName(
        "demo_dummy",
        data.position,
        true,
        playerHero,
        playerHero,
        DOTA_TEAM_BADGUYS
    )
    if not IsValid(dummy) then
        return
    end
    dummy:SetForwardVector(vec3_bottom)
    dummy:SetControllableByPlayer(data.playerID, false)
    dummy:AddNewModifier(dummy, nil, "modifier_ai_disabled", {})
    dummy:Hold()
    self:RegisterSpawnedUnit(dummy)
end
function CDemo.prototype.CreateEliteEnemy(self, data)
    self:print("OnCreateEliteEnemy:", data.str)
    local spawnedUnit = self:CreateDemoUnitByTeam(data, DOTA_TEAM_BADGUYS)
    if spawnedUnit ~= nil then
        spawnedUnit:AddNewModifier(spawnedUnit, nil, "modifier_elite", nil)
    end
end
function CDemo.prototype.CreateAlly(self, data)
    self:print("OnCreateAlly:", data.str)
    self:CreateDemoUnitByTeam(data, DOTA_TEAM_GOODGUYS)
end
function CDemo.prototype.RemoveSpawnedUnits(self, data)
    do
        local i = 0
        while i < #self.spawnedUnitEntIndexes do
            do
                local entIndex = self.spawnedUnitEntIndexes[i + 1]
                local unit = EntIndexToHScript(entIndex)
                if not IsValid(unit) then
                    goto __continue73
                end
                unit:SafeRemoveUnit()
            end
            ::__continue73::
            i = i + 1
        end
    end
    self.spawnedUnitEntIndexes = {}
end
function CDemo.prototype.Restart(self, data)
    CModule:reset()
    GameState:SwitchState("GameState_Prepare")
end
function CDemo.prototype.ReloadKeyValue(self, data)
    GameRules:Playtesting_UpdateAddOnKeyValues()
    FireGameEvent("client_reload_game_keyvalues", {})
end
function CDemo.prototype.ReloadScript(self, data)
    FireGameEvent("client_reload_game_keyvalues", {})
    SendToServerConsole("cl_script_reload")
    SendToServerConsole("script_reload")
end
function CDemo.prototype.RefreshServicePressed(self, data)
    print("RefreshServicePressed")
end
function CDemo.prototype.Login(self, data)
    print("ReLogin")
    Login:Login()
end
function CDemo.prototype.ServiceSwitch(self, data)
end
function CDemo.prototype.AddServiceToken(self, data)
    print("OnAddServiceToken", data.str)
    local item_id, amounts = unpack(
        __TS__ArrayMap(
            __TS__StringSplit(data.str, "|"),
            function(____, s) return tonumber(s) end
        ),
        1,
        2
    )
    CommonService:CallAction("/v1/gm/add_item", data.PlayerID, {add_items = {{item_id = item_id, amounts = amounts}}})
end
CDemo = __TS__DecorateLegacy({reloadable}, CDemo)
if Demo == nil then
    Demo = __TS__New(CDemo)
end
return ____exports
