local __TSTL_FILE_PATH__ = "service/login"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 1,["13"] = 1,["14"] = 18,["15"] = 20,["16"] = 20,["17"] = 21,["19"] = 21,["20"] = 23,["21"] = 27,["22"] = 28,["23"] = 29,["24"] = 30,["25"] = 20,["26"] = 31,["27"] = 32,["29"] = 35,["30"] = 35,["31"] = 35,["32"] = 36,["33"] = 35,["34"] = 35,["35"] = 38,["36"] = 38,["37"] = 38,["38"] = 39,["39"] = 38,["40"] = 38,["41"] = 41,["42"] = 41,["43"] = 41,["44"] = 42,["45"] = 43,["47"] = 41,["48"] = 41,["49"] = 31,["50"] = 48,["51"] = 49,["52"] = 50,["53"] = 49,["54"] = 52,["55"] = 54,["56"] = 48,["57"] = 57,["58"] = 58,["59"] = 59,["62"] = 62,["65"] = 65,["66"] = 65,["67"] = 65,["68"] = 65,["69"] = 65,["70"] = 66,["71"] = 67,["72"] = 68,["73"] = 69,["74"] = 70,["75"] = 71,["76"] = 72,["78"] = 74,["79"] = 75,["80"] = 76,["82"] = 78,["83"] = 79,["84"] = 80,["85"] = 81,["86"] = 82,["87"] = 83,["89"] = 65,["90"] = 65,["91"] = 65,["92"] = 57,["93"] = 88,["94"] = 89,["97"] = 92,["100"] = 95,["101"] = 96,["104"] = 99,["105"] = 100,["106"] = 102,["107"] = 103,["108"] = 103,["109"] = 103,["110"] = 104,["111"] = 105,["114"] = 108,["115"] = 109,["116"] = 110,["117"] = 111,["119"] = 103,["120"] = 103,["121"] = 88,["122"] = 116,["123"] = 117,["124"] = 118,["126"] = 120,["127"] = 121,["128"] = 122,["129"] = 123,["130"] = 124,["131"] = 116,["132"] = 127,["133"] = 128,["134"] = 127,["135"] = 131,["136"] = 132,["137"] = 133,["139"] = 135,["140"] = 136,["141"] = 137,["143"] = 139,["144"] = 140,["145"] = 141,["146"] = 142,["147"] = 131,["148"] = 145,["149"] = 146,["152"] = 149,["153"] = 150,["156"] = 153,["157"] = 154,["160"] = 157,["161"] = 158,["162"] = 159,["163"] = 145,["164"] = 165,["165"] = 166,["166"] = 166,["167"] = 166,["168"] = 166,["169"] = 166,["170"] = 166,["171"] = 166,["172"] = 166,["173"] = 165,["174"] = 180,["175"] = 181,["176"] = 182,["177"] = 183,["178"] = 184,["180"] = 186,["182"] = 188,["183"] = 188,["184"] = 188,["185"] = 188,["186"] = 192,["187"] = 193,["188"] = 180,["189"] = 199,["190"] = 200,["191"] = 201,["194"] = 204,["195"] = 205,["196"] = 199,["197"] = 212,["198"] = 213,["199"] = 214,["200"] = 215,["201"] = 212,["202"] = 222,["203"] = 223,["204"] = 224,["205"] = 225,["206"] = 226,["207"] = 227,["208"] = 228,["209"] = 229,["210"] = 222,["211"] = 236,["212"] = 237,["213"] = 237,["214"] = 237,["215"] = 237,["216"] = 237,["217"] = 238,["218"] = 239,["220"] = 241,["221"] = 242,["222"] = 237,["223"] = 237,["224"] = 236,["225"] = 246,["226"] = 247,["227"] = 248,["228"] = 249,["229"] = 251,["230"] = 252,["231"] = 253,["232"] = 253,["233"] = 254,["234"] = 255,["235"] = 259,["238"] = 263,["241"] = 267,["242"] = 246,["243"] = 274,["244"] = 275,["245"] = 275,["246"] = 275,["247"] = 275,["248"] = 275,["249"] = 276,["250"] = 277,["252"] = 279,["253"] = 275,["254"] = 275,["255"] = 274,["256"] = 287,["257"] = 288,["258"] = 288,["259"] = 288,["260"] = 288,["261"] = 288,["262"] = 289,["263"] = 288,["264"] = 288,["265"] = 287,["266"] = 297,["267"] = 298,["268"] = 298,["269"] = 298,["270"] = 298,["271"] = 298,["272"] = 299,["273"] = 300,["275"] = 302,["276"] = 298,["277"] = 298,["278"] = 297,["279"] = 309,["280"] = 310,["281"] = 310,["282"] = 310,["283"] = 310,["284"] = 310,["285"] = 311,["286"] = 312,["288"] = 314,["289"] = 310,["290"] = 310,["291"] = 309,["292"] = 320,["293"] = 321,["294"] = 321,["295"] = 321,["297"] = 322,["298"] = 322,["300"] = 323,["301"] = 324,["302"] = 325,["304"] = 327,["308"] = 329,["309"] = 320,["310"] = 335,["311"] = 338,["312"] = 339,["313"] = 340,["315"] = 341,["316"] = 342,["317"] = 343,["319"] = 345,["323"] = 347,["324"] = 335,["325"] = 350,["326"] = 351,["327"] = 351,["328"] = 351,["329"] = 351,["330"] = 351,["331"] = 352,["332"] = 351,["333"] = 351,["334"] = 350,["335"] = 356,["336"] = 357,["337"] = 357,["338"] = 357,["339"] = 357,["340"] = 357,["341"] = 358,["342"] = 357,["343"] = 357,["344"] = 356,["345"] = 362,["346"] = 363,["347"] = 363,["348"] = 363,["349"] = 363,["350"] = 363,["351"] = 364,["352"] = 363,["353"] = 363,["354"] = 362,["355"] = 368,["356"] = 369,["357"] = 370,["358"] = 370,["359"] = 370,["360"] = 370,["361"] = 370,["362"] = 371,["363"] = 370,["364"] = 370,["365"] = 373,["366"] = 373,["367"] = 373,["368"] = 373,["369"] = 373,["370"] = 374,["371"] = 373,["372"] = 373,["373"] = 368,["374"] = 381,["375"] = 382,["376"] = 383,["378"] = 385,["379"] = 386,["381"] = 381,["382"] = 395,["383"] = 396,["384"] = 397,["385"] = 398,["386"] = 399,["387"] = 399,["388"] = 399,["389"] = 399,["390"] = 399,["391"] = 400,["392"] = 401,["394"] = 403,["395"] = 399,["396"] = 399,["398"] = 406,["403"] = 411,["404"] = 412,["405"] = 412,["406"] = 412,["407"] = 412,["408"] = 411,["409"] = 395,["410"] = 419,["411"] = 420,["412"] = 421,["413"] = 422,["414"] = 423,["415"] = 424,["417"] = 426,["419"] = 419,["420"] = 432,["421"] = 433,["422"] = 432,["423"] = 439,["424"] = 440,["425"] = 441,["426"] = 442,["427"] = 443,["428"] = 444,["430"] = 446,["431"] = 447,["432"] = 448,["433"] = 449,["434"] = 449,["435"] = 449,["436"] = 449,["437"] = 450,["438"] = 451,["439"] = 453,["440"] = 454,["441"] = 455,["442"] = 456,["443"] = 457,["444"] = 457,["445"] = 457,["446"] = 457,["447"] = 458,["448"] = 458,["449"] = 458,["450"] = 458,["451"] = 458,["452"] = 461,["453"] = 457,["454"] = 457,["457"] = 448,["458"] = 439,["459"] = 472,["460"] = 473,["461"] = 473,["463"] = 474,["464"] = 472,["465"] = 477,["466"] = 478,["467"] = 477,["468"] = 484,["469"] = 485,["470"] = 486,["471"] = 487,["473"] = 490,["474"] = 491,["477"] = 494,["478"] = 494,["479"] = 495,["480"] = 496,["481"] = 497,["483"] = 494,["486"] = 501,["487"] = 484,["488"] = 509,["489"] = 510,["490"] = 511,["491"] = 512,["493"] = 516,["494"] = 517,["496"] = 521,["497"] = 521,["498"] = 521,["499"] = 522,["500"] = 523,["503"] = 527,["504"] = 509,["505"] = 534,["506"] = 535,["507"] = 537,["508"] = 538,["509"] = 539,["511"] = 537,["512"] = 543,["513"] = 534,["514"] = 20,["515"] = 551,["516"] = 551});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local REQUIRED_LOGIN_STEPS = {"login", "setting", "equipment", "attributes"}
local CLogin = __TS__Class()
CLogin.name = "CLogin"
__TS__ClassExtends(CLogin, CModule)
function CLogin.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.loginState = {}
    self.BP_SEASON = 1
    self.BPSeasonChecked = false
    self.ShouldFetchAfterCheck = false
    self.pendingBattlePassPlayers = {}
end
function CLogin.prototype.init(self, reload)
    if not reload then
    end
    Event:Register(
        "game_init",
        function()
            self:Login()
        end
    )
    CustomUIEvent(
        "login_retry_white_list",
        function(event)
            self:RetryWhiteListLogin(event.PlayerID)
        end
    )
    Event:Register(
        "service_data_change",
        function(____, event)
            if event.key == "player_auth" then
                self:OnPlayerAuthChanged(event.playerID)
            end
        end
    )
end
function CLogin.prototype.Login(self)
    Game:EachPlayer(function(____, playerID)
        self:LoginPlayer(playerID)
    end)
    self:RequestServerTime()
    CommonService:CallAction("/v1/server/info", -1, {})
end
function CLogin.prototype.LoginPlayer(self, playerID)
    self:print("LoginPlayer")
    if self:FailCheatModeLogin(playerID) then
        return
    end
    if self:RequireLocalHostAuth(playerID) then
        return
    end
    CommonService:RepeatCallAction(
        "/v1/player/login",
        playerID,
        {},
        function(____, playerID, result)
            local code = toFiniteNumber(result.code, -1)
            if code == 0 then
                local info = self:ensureLoginInfo(playerID)
                if result.data ~= nil and result.data.black_list ~= nil then
                    info.state = PlayerLoginState.Banned
                    info.ban_end_time = result.data.black_list.time or 0
                    self:syncLoginState()
                else
                    info.state = PlayerLoginState.Success
                    info.steps.login = true
                    self:syncLoginState()
                end
                CommonService:CommonCallback(playerID, result)
                self:TriggerPostLoginSteps(playerID)
            elseif toFiniteString(result.message) == "not in white list" then
                local info = self:ensureLoginInfo(playerID)
                info.state = PlayerLoginState.NoPermission
                self:syncLoginState()
            end
        end,
        false
    )
end
function CLogin.prototype.RetryWhiteListLogin(self, playerID)
    if self:FailCheatModeLogin(playerID) then
        return
    end
    if self:RequireLocalHostAuth(playerID) then
        return
    end
    local info = self:ensureLoginInfo(playerID)
    if info.state ~= PlayerLoginState.NoPermission then
        return
    end
    info.state = PlayerLoginState.None
    self:syncLoginState()
    local retryCount = 5
    Timer:Timer(
        1,
        function()
            local currentInfo = self:ensureLoginInfo(playerID)
            if currentInfo.state == PlayerLoginState.Success or currentInfo.state == PlayerLoginState.Banned then
                return
            end
            self:LoginPlayer(playerID)
            retryCount = retryCount - 1
            if retryCount > 0 then
                return 2
            end
        end
    )
end
function CLogin.prototype.FailCheatModeLogin(self, playerID)
    if IsInToolsMode() or not GameRules:IsCheatMode() then
        return false
    end
    local info = self:ensureLoginInfo(playerID)
    info.state = PlayerLoginState.Failed
    self:syncLoginState()
    ErrorMessage("error_cheat_mode_not_allowed", playerID)
    return true
end
function CLogin.prototype.ShouldUseLocalHostAuth(self)
    return not IsDedicatedServer() and not IsInToolsMode()
end
function CLogin.prototype.RequireLocalHostAuth(self, playerID)
    if not self:ShouldUseLocalHostAuth() then
        return false
    end
    local auth = CommonService:GetPlayerServiceNetTable(playerID, "player_auth")
    if (auth and auth.player_session) ~= nil and auth.player_session ~= "" then
        return false
    end
    local info = self:ensureLoginInfo(playerID)
    info.state = PlayerLoginState.NeedAuth
    self:syncLoginState()
    return true
end
function CLogin.prototype.OnPlayerAuthChanged(self, playerID)
    if not self:ShouldUseLocalHostAuth() then
        return
    end
    local auth = CommonService:GetPlayerServiceNetTable(playerID, "player_auth")
    if (auth and auth.player_session) == nil or auth.player_session == "" then
        return
    end
    local info = self:ensureLoginInfo(playerID)
    if info.state ~= PlayerLoginState.NeedAuth then
        return
    end
    info.state = PlayerLoginState.None
    self:syncLoginState()
    self:LoginPlayer(playerID)
end
function CLogin.prototype.createInitialSteps(self)
    return {
        login = false,
        setting = false,
        equipment = false,
        mails = false,
        activities = false,
        attributes = false
    }
end
function CLogin.prototype.ensureLoginInfo(self, playerID)
    local info = self.loginState[playerID]
    if info ~= nil then
        if info.steps == nil then
            info.steps = self:createInitialSteps()
        end
        return info
    end
    local fresh = {
        state = PlayerLoginState.None,
        steps = self:createInitialSteps()
    }
    self.loginState[playerID] = fresh
    return fresh
end
function CLogin.prototype.TriggerPostLoginSteps(self, playerID)
    local info = self:ensureLoginInfo(playerID)
    if info.state ~= PlayerLoginState.Success then
        return
    end
    self:FetchPlayerRequiredData(playerID)
    self:FetchPlayerOptionalData(playerID)
end
function CLogin.prototype.FetchPlayerRequiredData(self, playerID)
    self:FetchPlayerSettings(playerID)
    self:FetchPlayerEquipment(playerID)
    self:FetchPlayerAttributes(playerID)
end
function CLogin.prototype.FetchPlayerOptionalData(self, playerID)
    self:FetchPlayerMail(playerID)
    self:FetchPlayerActivities(playerID)
    self:FetchPlayerFishes(playerID)
    self:FetchPlayerFishingBagSettings(playerID)
    self:FetchPlayerEquipmentBreakSettings(playerID)
    self:FetchPlayerBriefData(playerID)
    self:FetchPlayerAllEquipment(playerID)
end
function CLogin.prototype.FetchPlayerSettings(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/key/fetch",
        playerID,
        {type = "settings"},
        function(____, playerID, result)
            if toFiniteNumber(result.code, -1) == 0 then
                self:MarkStepCompleted(playerID, "setting")
            end
            CommonService:CommonCallback(playerID, result)
            self:EnsureDefaultKeyboardBindings(playerID)
        end
    )
end
function CLogin.prototype.EnsureDefaultKeyboardBindings(self, playerID)
    local playerKeyValues = CommonService:GetPlayerServiceNetTable(playerID, "player_key_values") or ({})
    local missingBindings = {}
    local hasMissingBindings = false
    for func, key in pairs(DEFAULT_KEYBOARD_BINDINGS) do
        local settingKey = "keybind_keyboard_" .. func
        local ____opt_4 = playerKeyValues[settingKey]
        local existingValue = ____opt_4 and ____opt_4.value
        if existingValue == nil or existingValue == "" then
            missingBindings[settingKey] = {key = settingKey, value = key}
            hasMissingBindings = true
        end
    end
    if hasMissingBindings == false then
        return
    end
    CommonService:SetPlayerServiceNetData(playerID, "player_key_values", missingBindings)
end
function CLogin.prototype.FetchPlayerEquipment(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/equip/fetch_all",
        playerID,
        {only_equipped = true},
        function(____, playerID, result)
            if toFiniteNumber(result.code, -1) == 0 then
                self:MarkStepCompleted(playerID, "equipment")
            end
            CommonService:CommonCallback(playerID, result)
        end
    )
end
function CLogin.prototype.FetchPlayerAllEquipment(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/equip/fetch_all",
        playerID,
        {only_equipped = false},
        function(____, playerID, result)
            CommonService:CommonCallback(playerID, result, false)
        end
    )
end
function CLogin.prototype.FetchPlayerMail(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/mails/fetch",
        playerID,
        {},
        function(____, playerID, result)
            if toFiniteNumber(result.code, -1) == 0 then
                self:MarkStepCompleted(playerID, "mails")
            end
            CommonService:CommonCallback(playerID, result)
        end
    )
end
function CLogin.prototype.FetchPlayerAttributes(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/outside/get_privileges",
        playerID,
        {},
        function(____, playerID, result)
            if toFiniteNumber(result.code, -1) == 0 then
                self:MarkStepCompleted(playerID, "attributes")
            end
            CommonService:CommonCallback(playerID, result)
        end
    )
end
function CLogin.prototype.FlushPendingBattlePassFetch(self)
    for ____, ____value in ipairs(__TS__ObjectEntries(self.pendingBattlePassPlayers)) do
        local playerIDKey = ____value[1]
        local pending = ____value[2]
        do
            if not pending then
                goto __continue62
            end
            local numericPlayerID = toFiniteNumber(playerIDKey, -1)
            if numericPlayerID >= 0 then
                self:BPFetch(numericPlayerID, {step = "activities", playerID = numericPlayerID, preIncremented = true})
            end
            __TS__Delete(self.pendingBattlePassPlayers, numericPlayerID)
        end
        ::__continue62::
    end
    self.ShouldFetchAfterCheck = false
end
function CLogin.prototype.FetchPlayerActivities(self, playerID)
    local activity_data = LoadKeyValues("scripts/npc/service/activity_data.kv")
    local activityConfigs = activity_data or ({})
    for activityID in pairs(activityConfigs) do
        do
            local numericActivityID = tonumber(activityID)
            if numericActivityID == nil or numericActivityID <= 0 then
                goto __continue67
            end
            CommonService:CallAction("/v1/activity/data", playerID, {activity_id = numericActivityID})
        end
        ::__continue67::
    end
    self:RequestBattlePass(playerID)
end
function CLogin.prototype.FetchPlayerFishes(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/idle_game/fetch_fishes",
        playerID,
        {},
        function(____, currentPlayerID, response)
            CommonService:CommonCallback(currentPlayerID, response, false)
        end
    )
end
function CLogin.prototype.FetchPlayerFishingBagSettings(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/key/fetch",
        playerID,
        {type = "fishing_bag"},
        function(____, currentPlayerID, response)
            CommonService:CommonCallback(currentPlayerID, response, false)
        end
    )
end
function CLogin.prototype.FetchPlayerEquipmentBreakSettings(self, playerID)
    CommonService:RepeatCallAction(
        "/v1/key/fetch",
        playerID,
        {type = "equipment_break"},
        function(____, currentPlayerID, response)
            CommonService:CommonCallback(currentPlayerID, response, false)
        end
    )
end
function CLogin.prototype.FetchPlayerBriefData(self, playerID)
    local targetUID = OVERRIDE_STEAMID or PlayerResource:GetSteamAccountID(playerID)
    CommonService:RepeatCallAction(
        "/v1/brief/get_data",
        playerID,
        {target_uid = targetUID},
        function(____, currentPlayerID, response)
            CommonService:CommonCallback(currentPlayerID, response, false)
        end
    )
    CommonService:RepeatCallAction(
        "/v1/brief/show_room",
        playerID,
        {target_uid = targetUID},
        function(____, currentPlayerID, response)
            CommonService:CommonCallback(currentPlayerID, response, false)
        end
    )
end
function CLogin.prototype.RequestBattlePass(self, playerID)
    if self.BPSeasonChecked then
        self:BPFetch(playerID, {step = "activities", playerID = playerID})
    else
        self.pendingBattlePassPlayers[playerID] = true
        self.ShouldFetchAfterCheck = true
    end
end
function CLogin.prototype.BPFetch(self, targetPlayerID, options)
    if targetPlayerID ~= nil then
        if not PlayerResource:IsFakeClient(targetPlayerID) then
            if (options and options.step) ~= nil and options.playerID ~= nil then
                CommonService:RepeatCallAction(
                    "/v1/battle_pass/fetch",
                    targetPlayerID,
                    {season = self.BP_SEASON},
                    function(____, playerID, result)
                        if toFiniteNumber(result.code, -1) == 0 then
                            self:MarkStepCompleted(playerID, "activities")
                        end
                        CommonService:CommonCallback(playerID, result)
                    end
                )
            else
                CommonService:CallAction("/v1/battle_pass/fetch", targetPlayerID, {season = self.BP_SEASON})
            end
        end
        return
    end
    Game:EachPlayer(function(____, playerID)
        self:BPFetch(
            playerID,
            options ~= nil and __TS__ObjectAssign({}, options, {playerID = playerID}) or nil
        )
    end)
end
function CLogin.prototype.MarkStepCompleted(self, playerID, step)
    local info = self:ensureLoginInfo(playerID)
    if info.steps[step] ~= true then
        info.steps[step] = true
        self:print((("[MarkStepCompleted] 玩家 " .. tostring(playerID)) .. " 完成步骤: ") .. step)
        self:syncLoginState()
    else
        self:print(((("[MarkStepCompleted] 玩家 " .. tostring(playerID)) .. " 步骤 ") .. step) .. " 已完成")
    end
end
function CLogin.prototype.syncLoginState(self)
    CustomNetTables:SetNetData("common", "login_state", self.loginState)
end
function CLogin.prototype.RequestServerTime(self)
    local url = CommonService:WrapUrl("/server/time")
    local handle = CreateHTTPRequestScriptVM("POST", url)
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    if IsDedicatedServer() then
        handle:SetHTTPRequestHeaderValue("Authorization", ServerKey)
    end
    handle:SetHTTPRequestRawPostBody("application/json", "{}")
    handle:SetHTTPRequestAbsoluteTimeoutMS(30 * 1000)
    handle:Send(function(response)
        PrintLongStr(
            (("StatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
            url
        )
        if response ~= nil and response.Body then
            local result = json.decode(response.Body)
            if result ~= nil and result.data ~= nil and result.data.server_time ~= nil then
                local time = result.data.server_time
                self.ServiceTimeOffset = time
                self.SystemTimeOffset = GetSystemTimeMS() * 0.001
                Timer:Timer(
                    GameRules:GetGameModeEntity(),
                    1,
                    function()
                        CustomNetTables:SetNetData(
                            "common",
                            "server_time",
                            {time_stamp = self:GetServiceTimestamp()}
                        )
                        return 1
                    end
                )
            end
        end
    end)
end
function CLogin.prototype.GetServiceTimestamp(self)
    if self.SystemTimeOffset == nil or self.ServiceTimeOffset == nil then
        return 0
    end
    return self.ServiceTimeOffset + (GetSystemTimeMS() * 0.001 - self.SystemTimeOffset)
end
function CLogin.prototype.IsRequiredStepCompleted(self, info, step)
    return info.steps[step] == true
end
function CLogin.prototype.IsPlayerRequiredLoginCompleted(self, playerID)
    local info = self.loginState[playerID]
    if info == nil then
        return false
    end
    if info.state ~= PlayerLoginState.Success then
        return false
    end
    do
        local i = 0
        while i < #REQUIRED_LOGIN_STEPS do
            local step = REQUIRED_LOGIN_STEPS[i + 1]
            if not self:IsRequiredStepCompleted(info, step) then
                return false
            end
            i = i + 1
        end
    end
    return true
end
function CLogin.prototype.IsPlayerLoginCompleted(self, playerID)
    local info = self.loginState[playerID]
    if info == nil then
        return false
    end
    if info.state ~= PlayerLoginState.Success then
        return false
    end
    for ____, ____value in ipairs(__TS__ObjectEntries(info.steps or ({}))) do
        local stepName = ____value[1]
        local completed = ____value[2]
        if not completed then
            return false
        end
    end
    return true
end
function CLogin.prototype.IsAllLoginState(self)
    local allDone = true
    Game:EachPlayer(function(____, playerID)
        if not self:IsPlayerRequiredLoginCompleted(playerID) then
            allDone = false
        end
    end)
    return allDone
end
CLogin = __TS__DecorateLegacy({reloadable}, CLogin)
if Login == nil then
    Login = __TS__New(CLogin)
end
return ____exports
