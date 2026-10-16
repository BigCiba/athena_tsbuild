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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 2,["13"] = 2,["14"] = 12,["15"] = 12,["16"] = 13,["18"] = 13,["19"] = 15,["20"] = 16,["21"] = 17,["22"] = 18,["23"] = 20,["24"] = 21,["25"] = 22,["26"] = 23,["27"] = 24,["28"] = 25,["29"] = 26,["30"] = 27,["31"] = 28,["32"] = 29,["33"] = 30,["34"] = 31,["35"] = 12,["36"] = 33,["37"] = 34,["40"] = 37,["41"] = 37,["42"] = 33,["43"] = 40,["44"] = 41,["45"] = 42,["48"] = 45,["49"] = 46,["50"] = 46,["51"] = 46,["52"] = 46,["53"] = 46,["54"] = 46,["55"] = 46,["57"] = 40,["58"] = 50,["59"] = 51,["60"] = 52,["63"] = 53,["64"] = 54,["67"] = 55,["68"] = 55,["69"] = 55,["70"] = 55,["71"] = 55,["72"] = 55,["73"] = 55,["74"] = 55,["75"] = 56,["78"] = 59,["79"] = 60,["80"] = 61,["81"] = 62,["82"] = 63,["83"] = 64,["84"] = 65,["85"] = 50,["86"] = 68,["87"] = 69,["88"] = 69,["90"] = 70,["91"] = 71,["92"] = 72,["93"] = 73,["94"] = 74,["95"] = 74,["96"] = 74,["97"] = 74,["98"] = 74,["100"] = 76,["101"] = 78,["102"] = 78,["103"] = 78,["104"] = 78,["105"] = 78,["106"] = 78,["107"] = 78,["108"] = 79,["109"] = 79,["110"] = 79,["111"] = 79,["112"] = 79,["113"] = 79,["114"] = 79,["115"] = 81,["116"] = 81,["117"] = 81,["118"] = 82,["121"] = 85,["122"] = 87,["123"] = 88,["124"] = 89,["125"] = 90,["126"] = 91,["127"] = 92,["128"] = 98,["129"] = 99,["130"] = 100,["133"] = 103,["135"] = 81,["136"] = 81,["137"] = 81,["138"] = 68,["139"] = 114,["140"] = 115,["141"] = 115,["142"] = 115,["143"] = 116,["144"] = 116,["145"] = 116,["147"] = 116,["148"] = 116,["149"] = 116,["151"] = 116,["152"] = 114,["153"] = 124,["154"] = 125,["155"] = 126,["157"] = 128,["158"] = 129,["160"] = 131,["161"] = 131,["162"] = 131,["163"] = 131,["164"] = 131,["165"] = 131,["166"] = 131,["167"] = 131,["168"] = 131,["169"] = 124,["170"] = 134,["171"] = 135,["172"] = 136,["173"] = 137,["175"] = 135,["176"] = 134,["177"] = 142,["178"] = 143,["179"] = 143,["180"] = 143,["181"] = 143,["182"] = 143,["183"] = 143,["184"] = 143,["185"] = 143,["186"] = 143,["187"] = 143,["188"] = 143,["189"] = 154,["190"] = 142,["191"] = 156,["192"] = 157,["195"] = 160,["196"] = 161,["197"] = 162,["198"] = 164,["199"] = 165,["200"] = 166,["202"] = 167,["203"] = 167,["204"] = 168,["205"] = 169,["206"] = 170,["208"] = 172,["210"] = 167,["213"] = 176,["214"] = 177,["216"] = 179,["217"] = 180,["219"] = 182,["220"] = 183,["222"] = 156,["223"] = 186,["224"] = 187,["225"] = 188,["226"] = 189,["228"] = 186,["229"] = 196,["230"] = 197,["231"] = 196,["232"] = 199,["233"] = 199,["234"] = 199,["235"] = 199,["237"] = 199,["238"] = 199,["239"] = 201,["240"] = 202,["241"] = 203,["242"] = 204,["243"] = 201,["244"] = 207,["245"] = 207,["246"] = 207,["247"] = 209,["248"] = 209,["249"] = 215,["250"] = 216,["253"] = 217,["254"] = 217,["255"] = 217,["256"] = 217,["257"] = 217,["258"] = 215,["259"] = 225,["260"] = 226,["261"] = 227,["262"] = 228,["263"] = 229,["264"] = 230,["266"] = 231,["267"] = 231,["268"] = 232,["269"] = 233,["270"] = 234,["271"] = 235,["273"] = 231,["276"] = 238,["277"] = 239,["278"] = 239,["279"] = 239,["280"] = 240,["281"] = 241,["282"] = 239,["283"] = 239,["284"] = 243,["285"] = 244,["286"] = 245,["287"] = 246,["288"] = 246,["289"] = 246,["290"] = 246,["291"] = 246,["292"] = 246,["293"] = 246,["294"] = 246,["296"] = 225,["297"] = 251,["298"] = 252,["299"] = 253,["300"] = 254,["301"] = 255,["303"] = 257,["304"] = 251,["305"] = 260,["306"] = 261,["309"] = 262,["310"] = 263,["311"] = 264,["313"] = 266,["315"] = 268,["316"] = 260,["317"] = 271,["318"] = 272,["321"] = 273,["322"] = 274,["323"] = 275,["325"] = 277,["327"] = 279,["328"] = 271,["329"] = 284,["330"] = 285,["331"] = 286,["332"] = 287,["334"] = 289,["337"] = 284,["338"] = 295,["339"] = 296,["340"] = 297,["341"] = 295,["342"] = 300,["343"] = 301,["344"] = 302,["347"] = 306,["348"] = 306,["349"] = 306,["350"] = 306,["351"] = 306,["352"] = 306,["353"] = 306,["354"] = 306,["355"] = 307,["358"] = 311,["359"] = 312,["360"] = 313,["361"] = 314,["362"] = 315,["363"] = 300,["364"] = 317,["365"] = 318,["366"] = 319,["367"] = 320,["368"] = 320,["370"] = 317,["371"] = 324,["372"] = 325,["373"] = 326,["374"] = 324,["375"] = 330,["377"] = 331,["378"] = 331,["380"] = 332,["381"] = 333,["382"] = 334,["383"] = 335,["385"] = 337,["388"] = 331,["391"] = 339,["392"] = 330,["393"] = 346,["394"] = 347,["395"] = 346,["396"] = 350,["397"] = 351,["398"] = 352,["399"] = 350,["400"] = 355,["401"] = 356,["402"] = 357,["403"] = 358,["404"] = 355,["405"] = 360,["406"] = 361,["407"] = 360,["408"] = 366,["409"] = 367,["410"] = 368,["411"] = 366,["412"] = 370,["413"] = 370,["414"] = 374,["415"] = 375,["416"] = 376,["417"] = 376,["418"] = 376,["419"] = 376,["420"] = 376,["421"] = 376,["422"] = 376,["423"] = 376,["424"] = 377,["425"] = 374,["426"] = 12,["427"] = 384,["428"] = 384});
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
    self.creeps = true
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
    if self.creeps == nil then
        self.creeps = true
    end
    if not bReload then
        self.demoAttributeValues = {}
        SendToServerConsole("sv_cheats 1")
        SendToServerConsole("dota_ability_debug 0")
        Event:Register(
            "dash_end",
            function(____, event) return self:OnForceDashEnd(event) end,
            self
        )
    end
    self:UpdateSettings()
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
        creeps = self.creeps and 1 or 0,
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
function CDemo.prototype.IsCreepsEnabled(self)
    local ____self_creeps_7 = self.creeps
    if ____self_creeps_7 == nil then
        ____self_creeps_7 = true
    end
    return ____self_creeps_7
end
function CDemo.prototype.NoCreepsButtonPressed(self, data)
    self.creeps = not self:IsCreepsEnabled()
    self:UpdateSettings()
    Event:Fire("demo_creeps_changed", {enabled = self.creeps})
end
function CDemo.prototype.StartTask(self, data)
    Event:Fire("task_debug_start", {playerID = data.playerID, taskName = data.str})
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
                    goto __continue76
                end
                unit:SafeRemoveUnit()
            end
            ::__continue76::
            i = i + 1
        end
    end
    self.spawnedUnitEntIndexes = {}
end
function CDemo.prototype.Restart(self, data)
    GameState:DebugRestart()
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
