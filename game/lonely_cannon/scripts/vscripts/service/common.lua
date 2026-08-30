local __TSTL_FILE_PATH__ = "service/common"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 1,["13"] = 1,["14"] = 2,["16"] = 7,["17"] = 7,["18"] = 8,["20"] = 8,["21"] = 9,["22"] = 7,["23"] = 10,["24"] = 12,["25"] = 12,["26"] = 12,["27"] = 13,["28"] = 15,["29"] = 16,["31"] = 12,["32"] = 12,["33"] = 21,["34"] = 21,["35"] = 21,["36"] = 22,["37"] = 24,["38"] = 21,["39"] = 21,["40"] = 10,["41"] = 27,["42"] = 27,["43"] = 27,["45"] = 27,["46"] = 27,["48"] = 31,["49"] = 32,["50"] = 33,["51"] = 34,["53"] = 36,["54"] = 37,["55"] = 38,["56"] = 39,["57"] = 40,["60"] = 38,["61"] = 27,["62"] = 47,["63"] = 47,["64"] = 47,["66"] = 47,["67"] = 47,["69"] = 48,["70"] = 49,["71"] = 49,["72"] = 49,["73"] = 49,["74"] = 50,["75"] = 49,["76"] = 49,["77"] = 49,["78"] = 52,["79"] = 47,["80"] = 55,["81"] = 55,["82"] = 55,["84"] = 55,["85"] = 55,["87"] = 56,["88"] = 57,["89"] = 58,["90"] = 59,["92"] = 61,["93"] = 62,["94"] = 62,["95"] = 62,["96"] = 62,["97"] = 63,["98"] = 64,["99"] = 65,["100"] = 65,["101"] = 65,["102"] = 65,["103"] = 66,["104"] = 67,["105"] = 68,["107"] = 70,["110"] = 74,["111"] = 75,["112"] = 75,["113"] = 75,["114"] = 75,["115"] = 75,["117"] = 75,["119"] = 64,["120"] = 55,["121"] = 80,["122"] = 82,["123"] = 82,["125"] = 82,["126"] = 82,["128"] = 82,["129"] = 82,["131"] = 83,["132"] = 84,["133"] = 85,["134"] = 86,["135"] = 87,["136"] = 88,["137"] = 89,["139"] = 91,["140"] = 93,["141"] = 94,["142"] = 94,["143"] = 94,["144"] = 94,["145"] = 95,["146"] = 96,["147"] = 97,["148"] = 97,["149"] = 97,["150"] = 97,["151"] = 98,["152"] = 99,["156"] = 103,["157"] = 104,["158"] = 105,["160"] = 108,["161"] = 109,["162"] = 111,["163"] = 112,["164"] = 112,["165"] = 112,["166"] = 112,["167"] = 112,["169"] = 112,["171"] = 114,["172"] = 114,["173"] = 114,["174"] = 114,["175"] = 114,["176"] = 114,["178"] = 114,["180"] = 96,["181"] = 80,["182"] = 119,["183"] = 121,["184"] = 121,["186"] = 121,["187"] = 121,["189"] = 122,["190"] = 123,["191"] = 125,["192"] = 125,["193"] = 125,["194"] = 125,["195"] = 125,["196"] = 126,["197"] = 125,["198"] = 125,["199"] = 125,["200"] = 125,["201"] = 125,["202"] = 128,["203"] = 119,["204"] = 131,["205"] = 132,["208"] = 135,["209"] = 136,["210"] = 137,["211"] = 138,["215"] = 142,["216"] = 143,["217"] = 144,["220"] = 147,["222"] = 131,["223"] = 151,["224"] = 152,["225"] = 153,["226"] = 154,["227"] = 155,["228"] = 156,["229"] = 157,["231"] = 153,["232"] = 160,["233"] = 151,["234"] = 170,["235"] = 177,["236"] = 177,["238"] = 180,["239"] = 181,["240"] = 181,["241"] = 181,["242"] = 181,["243"] = 181,["244"] = 181,["245"] = 181,["246"] = 181,["247"] = 181,["248"] = 170,["249"] = 190,["250"] = 197,["251"] = 197,["253"] = 198,["254"] = 198,["256"] = 199,["257"] = 199,["259"] = 201,["260"] = 202,["261"] = 203,["262"] = 203,["263"] = 203,["264"] = 203,["265"] = 204,["266"] = 204,["267"] = 204,["268"] = 204,["269"] = 204,["270"] = 205,["271"] = 206,["273"] = 208,["275"] = 210,["276"] = 204,["277"] = 204,["278"] = 204,["279"] = 204,["280"] = 204,["281"] = 212,["282"] = 213,["283"] = 214,["285"] = 203,["286"] = 203,["287"] = 217,["288"] = 190,["289"] = 228,["290"] = 243,["291"] = 243,["292"] = 243,["293"] = 243,["295"] = 243,["296"] = 243,["297"] = 243,["299"] = 243,["300"] = 243,["301"] = 243,["303"] = 243,["304"] = 243,["305"] = 243,["307"] = 243,["308"] = 243,["309"] = 243,["311"] = 243,["312"] = 244,["313"] = 245,["314"] = 245,["315"] = 245,["316"] = 245,["317"] = 245,["318"] = 245,["319"] = 245,["320"] = 245,["321"] = 246,["322"] = 247,["324"] = 249,["325"] = 228,["326"] = 252,["327"] = 253,["328"] = 254,["329"] = 255,["330"] = 256,["331"] = 257,["332"] = 258,["333"] = 259,["336"] = 262,["337"] = 252,["338"] = 265,["339"] = 266,["340"] = 267,["343"] = 271,["344"] = 275,["345"] = 276,["346"] = 276,["347"] = 276,["348"] = 277,["349"] = 276,["350"] = 276,["353"] = 282,["354"] = 265,["355"] = 286,["356"] = 288,["357"] = 288,["359"] = 289,["360"] = 290,["361"] = 294,["362"] = 296,["363"] = 298,["364"] = 299,["365"] = 299,["366"] = 299,["367"] = 299,["368"] = 299,["370"] = 302,["371"] = 303,["372"] = 304,["373"] = 305,["375"] = 307,["376"] = 308,["377"] = 309,["379"] = 311,["380"] = 311,["381"] = 311,["382"] = 311,["383"] = 311,["387"] = 315,["388"] = 316,["389"] = 318,["390"] = 319,["391"] = 320,["392"] = 322,["393"] = 323,["394"] = 324,["395"] = 325,["396"] = 326,["397"] = 327,["400"] = 330,["401"] = 331,["402"] = 332,["403"] = 334,["404"] = 335,["405"] = 336,["406"] = 337,["408"] = 339,["411"] = 342,["413"] = 346,["414"] = 347,["415"] = 349,["416"] = 350,["418"] = 353,["419"] = 354,["421"] = 354,["424"] = 357,["425"] = 358,["427"] = 361,["428"] = 362,["430"] = 362,["433"] = 364,["435"] = 385,["436"] = 387,["441"] = 286,["442"] = 394,["443"] = 395,["444"] = 396,["446"] = 399,["447"] = 400,["449"] = 402,["450"] = 403,["451"] = 404,["452"] = 405,["453"] = 406,["454"] = 407,["456"] = 409,["457"] = 409,["458"] = 409,["459"] = 409,["460"] = 409,["462"] = 409,["466"] = 413,["467"] = 394,["468"] = 416,["469"] = 423,["470"] = 423,["472"] = 425,["475"] = 428,["476"] = 429,["478"] = 431,["479"] = 432,["481"] = 434,["482"] = 435,["483"] = 436,["485"] = 438,["486"] = 440,["487"] = 440,["488"] = 440,["489"] = 440,["490"] = 440,["491"] = 442,["492"] = 416,["493"] = 446,["494"] = 448,["495"] = 448,["497"] = 449,["498"] = 450,["500"] = 452,["501"] = 453,["503"] = 455,["505"] = 458,["506"] = 458,["507"] = 458,["508"] = 458,["509"] = 458,["510"] = 460,["511"] = 446,["512"] = 463,["513"] = 466,["516"] = 469,["517"] = 463,["518"] = 472,["519"] = 475,["520"] = 475,["521"] = 475,["523"] = 475,["524"] = 472,["525"] = 478,["526"] = 479,["527"] = 480,["528"] = 481,["529"] = 482,["530"] = 483,["532"] = 485,["535"] = 488,["536"] = 489,["538"] = 491,["542"] = 495,["543"] = 478,["544"] = 498,["545"] = 499,["546"] = 500,["548"] = 502,["549"] = 498,["550"] = 505,["551"] = 506,["552"] = 507,["554"] = 505,["555"] = 7,["556"] = 519,["557"] = 519});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("service.config")
--- 服务器相关的通用的工具函数
local CCommonService = __TS__Class()
CCommonService.name = "CCommonService"
__TS__ClassExtends(CCommonService, CModule)
function CCommonService.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.serviceNettableData = {}
end
function CCommonService.prototype.init(self, reload)
    CustomUIEvent(
        "call_action",
        function(event)
            if type(event.params) == "string" then
                local params = json.decode(event.params)
                self:CallAction(event.actionName, event.PlayerID, params)
            end
        end
    )
    RequestEvent(
        "call_action_request",
        function(event)
            local result = CommonService:CallActionSync(event.action, event.PlayerID, event.action_params, {ignoreInvalidResponse = false, showAddItems = event.showAddItems})
            return result
        end
    )
end
function CCommonService.prototype.HTTP_GET(self, url, playerID, callback, timeout, NoServerKey)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    if NoServerKey == nil then
        NoServerKey = false
    end
    local handle = CreateHTTPRequestScriptVM("GET", url)
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    if (IsDedicatedServer() or IsInToolsMode()) and not NoServerKey then
        handle:SetHTTPRequestHeaderValue("Authorization", ServerKey)
    end
    self:SetPlayerAuthHeader(handle, playerID, url)
    handle:SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000)
    handle:Send(function(response)
        if type(callback) == "function" then
            callback(nil, playerID, response, url)
        else
        end
    end)
end
function CCommonService.prototype.HTTP_GET_SYNC(self, url, playerID, timeout, NoServerKey)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    if NoServerKey == nil then
        NoServerKey = false
    end
    local co = coroutine.running()
    self:HTTP_GET(
        url,
        playerID,
        function(____, playerID, response, url)
            assert({coroutine.resume(co, response, url)})
        end,
        timeout
    )
    return coroutine.yield()
end
function CCommonService.prototype.HTTP_PUT(self, url, playerID, params, callback, timeout, NoServerKey)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    if NoServerKey == nil then
        NoServerKey = false
    end
    local handle = CreateHTTPRequestScriptVM("PUT", url)
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    if (IsDedicatedServer() or IsInToolsMode()) and not NoServerKey then
        handle:SetHTTPRequestHeaderValue("Authorization", ServerKey)
    end
    self:SetPlayerAuthHeader(handle, playerID, url)
    handle:SetHTTPRequestRawPostBody(
        "application/json",
        json.encode(params)
    )
    handle:SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000)
    handle:Send(function(response)
        PrintLongStr(
            (("StatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
            url
        )
        local result
        if response ~= nil and response.Body then
            result = json.decode(response.Body)
        end
        if result == 404 then
            return
        end
        if type(callback) == "function" then
            local ____callback_2 = callback
            local ____playerID_1 = playerID
            local ____result_0 = result
            if ____result_0 == nil then
                ____result_0 = {}
            end
            ____callback_2(nil, ____playerID_1, ____result_0, url)
        end
    end)
end
function CCommonService.prototype.HTTP_POST(self, url, playerID, params, callback, timeout, NoServerKey, ignoreInvalidResponse)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    if NoServerKey == nil then
        NoServerKey = false
    end
    if ignoreInvalidResponse == nil then
        ignoreInvalidResponse = true
    end
    self:print("<!> CCommonService.HTTP_POST: " .. url)
    DeepPrintTable(params)
    local handle = CreateHTTPRequestScriptVM("POST", url)
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    handle:SetHTTPRequestHeaderValue("Accept-Encoding", "gzip")
    if (IsDedicatedServer() or IsInToolsMode()) and not NoServerKey then
        handle:SetHTTPRequestHeaderValue("Authorization", ServerKey)
    end
    self:SetPlayerAuthHeader(handle, playerID, url)
    setmetatable(params, {__jsontype = "object"})
    handle:SetHTTPRequestRawPostBody(
        "application/json",
        json.encode(params)
    )
    handle:SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000)
    handle:Send(function(response)
        PrintLongStr(
            (("StatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
            url
        )
        if ignoreInvalidResponse then
            if response.StatusCode ~= 200 then
                return
            end
        end
        local result
        if response ~= nil and response.Body then
            result = json.decode(response.Body)
        end
        print(("<!><HTTP> CCommonService.HTTP_POST(" .. url) .. ") RESPONSE body:")
        print(response.Body)
        if type(callback) == "function" then
            local ____callback_5 = callback
            local ____playerID_4 = playerID
            local ____result_3 = result
            if ____result_3 == nil then
                ____result_3 = {}
            end
            ____callback_5(nil, ____playerID_4, ____result_3, url)
        else
            local ____CommonService_8 = CommonService
            local ____CommonService_CommonCallback_9 = CommonService.CommonCallback
            local ____playerID_7 = playerID
            local ____result_6 = result
            if ____result_6 == nil then
                ____result_6 = {}
            end
            ____CommonService_CommonCallback_9(____CommonService_8, ____playerID_7, ____result_6)
        end
    end)
end
function CCommonService.prototype.HTTP_POST_SYNC(self, url, playerID, params, timeout, NoServerKey, ignoreInvalidResponse)
    if NoServerKey == nil then
        NoServerKey = false
    end
    if ignoreInvalidResponse == nil then
        ignoreInvalidResponse = true
    end
    local co = coroutine.running()
    self:print(url)
    self:HTTP_POST(
        url,
        playerID,
        params,
        function(____, playerID, response, url)
            assert((coroutine.resume(co, response)))
        end,
        timeout,
        NoServerKey,
        ignoreInvalidResponse
    )
    return (coroutine.yield())
end
function CCommonService.prototype.SetPlayerAuthHeader(self, handle, playerID, url)
    if IsDedicatedServer() or IsInToolsMode() then
        return
    end
    if __TS__StringIncludes(url, "/v1/settle/match_begin") then
        local sessions = self:GetAllPlayerAuthSessions()
        if sessions ~= "" then
            handle:SetHTTPRequestHeaderValue("session", sessions)
        end
        return
    else
        local auth = self:GetPlayerServiceNetTable(playerID, "player_auth")
        local session = auth and auth.player_session
        if session == nil or session == "" then
            return
        end
        handle:SetHTTPRequestHeaderValue("session", session)
    end
end
function CCommonService.prototype.GetAllPlayerAuthSessions(self)
    local sessions = ""
    Game:EachPlayer(function(____, playerID)
        local auth = self:GetPlayerServiceNetTable(playerID, "player_auth")
        local session = auth and auth.player_session
        if session ~= nil and session ~= "" then
            sessions = sessions .. session
        end
    end)
    return sessions
end
function CCommonService.prototype.CallAction(self, action, playerID, params, callback, ignoreInvalidResponse)
    if ignoreInvalidResponse == nil then
        ignoreInvalidResponse = true
    end
    local address = self:WrapUrl(action)
    self:HTTP_POST(
        address,
        playerID,
        self:SetDefaultParams(params, playerID, {}),
        callback,
        nil,
        nil,
        ignoreInvalidResponse
    )
end
function CCommonService.prototype.RepeatCallAction(self, action, playerID, params, callback, ignoreInvalidResponse, repeatCount, interval)
    if ignoreInvalidResponse == nil then
        ignoreInvalidResponse = true
    end
    if repeatCount == nil then
        repeatCount = 8
    end
    if interval == nil then
        interval = 5
    end
    local address = self:WrapUrl(action)
    local bindDefault = self:SetDefaultParams(params, playerID, {})
    local id
    id = Timer:Timer(
        0,
        function()
            self:HTTP_POST(
                address,
                playerID,
                bindDefault,
                function(____, playerID, result, url)
                    if type(callback) == "function" then
                        callback(nil, playerID, result or ({}), url)
                    else
                        CommonService:CommonCallback(playerID, result or ({}))
                    end
                    Timer:StopTimer(id)
                end,
                nil,
                nil,
                ignoreInvalidResponse
            )
            repeatCount = repeatCount - 1
            if repeatCount > 0 then
                return interval
            end
        end
    )
    return id
end
function CCommonService.prototype.CallActionSync(self, action, playerID, params, extraOptions)
    local ____temp_14 = extraOptions or ({})
    local timeout = ____temp_14.timeout
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    local NoServerKey = ____temp_14.NoServerKey
    if NoServerKey == nil then
        NoServerKey = false
    end
    local ignoreInvalidResponse = ____temp_14.ignoreInvalidResponse
    if ignoreInvalidResponse == nil then
        ignoreInvalidResponse = true
    end
    local commonCallback = ____temp_14.commonCallback
    if commonCallback == nil then
        commonCallback = true
    end
    local showAddItems = ____temp_14.showAddItems
    if showAddItems == nil then
        showAddItems = true
    end
    local toastDelay = ____temp_14.toastDelay
    local address = self:WrapUrl(action)
    local res = (self:HTTP_POST_SYNC(
        address,
        playerID,
        self:SetDefaultParams(params or ({}), playerID, {}),
        timeout,
        NoServerKey,
        ignoreInvalidResponse
    ))
    if commonCallback then
        CommonService:CommonCallback(playerID, res, showAddItems, toastDelay)
    end
    return res
end
function CCommonService.prototype.transformBoolean(self, obj)
    for k, v in pairs(obj) do
        if type(v) == "table" then
            obj[k] = self:transformBoolean(v)
        elseif v == "TRUE" then
            obj[k] = true
        elseif v == "FALSE" then
            obj[k] = false
        end
    end
    return obj
end
function CCommonService.prototype.SendReceiveRewards(self, playerID, rewardList, toastDelay)
    local player = PlayerResource:GetPlayer(playerID)
    if player == nil then
        return
    end
    local toastData = {json = json.encode(rewardList)}
    if toastDelay then
        Timer:Timer(
            toastDelay,
            function()
                CustomGameEventManager:Send_ServerToPlayer(player, "ReceiveRewards", toastData)
            end
        )
        return
    end
    CustomGameEventManager:Send_ServerToPlayer(player, "ReceiveRewards", toastData)
end
function CCommonService.prototype.CommonCallback(self, playerID, response, showAddItems, toastDelay)
    if showAddItems == nil then
        showAddItems = true
    end
    if (response.code == 0 or response.code == 200) and response.data then
        for K, V in pairs(response.data) do
            if type(V) == "table" then
                V = self:transformBoolean(V)
                if RawDataConfig[K] ~= nil then
                    K, V = unpack(
                        RawDataConfig[K](RawDataConfig, playerID, K, V),
                        1,
                        2
                    )
                end
                local reconstructInfo = ReconstructConfig[K]
                if reconstructInfo ~= nil then
                    if type(reconstructInfo) == "function" then
                        V = reconstructInfo(nil, V, playerID)
                    else
                        local func, key = unpack(reconstructInfo, 1, 2)
                        if type(key) == "string" then
                            V = func(nil, V, key)
                        else
                            V = func(
                                nil,
                                V,
                                unpack(key)
                            )
                        end
                    end
                end
                if K == "add_items" and showAddItems then
                    local newList = {}
                    for way, list in pairs(V) do
                        if not __TS__ArrayIncludes(AddItemBlackList, way) then
                            for _, tData in pairs(list) do
                                local t = {}
                                __TS__ObjectAssign(t, tData)
                                t.way = way
                                newList[#newList + 1] = t
                                if AddItemCallback[t.item_id] then
                                    AddItemCallback[t.item_id](AddItemCallback, t, playerID)
                                end
                            end
                        elseif AddItemBlackListConfig[way] ~= nil then
                            local blackList = {}
                            for _, tData in pairs(list) do
                                local t = {}
                                __TS__ObjectAssign(t, tData)
                                t.way = way
                                blackList[#blackList + 1] = t
                            end
                            AddItemBlackListConfig[way](AddItemBlackListConfig, blackList, playerID)
                        end
                    end
                    self:SendReceiveRewards(playerID, newList, toastDelay)
                end
                if NetTableKeys[K] ~= nil then
                    if NetTableKeys[K] then
                        if SideEffectConfig[K] ~= nil then
                            SideEffectConfig[K](SideEffectConfig, playerID, V)
                        end
                        local result = self:SetPlayerServiceNetData(playerID, K, V, OverrideDataConfig[K] ~= nil)
                        local ____opt_15 = AfterSideEffectConfig[K]
                        if ____opt_15 ~= nil then
                            ____opt_15(AfterSideEffectConfig, playerID, result)
                        end
                    else
                        if SideEffectConfig[K] ~= nil then
                            SideEffectConfig[K](SideEffectConfig, V)
                        end
                        local result = self:SetServiceNetData(K, V, OverrideDataConfig[K] ~= nil)
                        local ____opt_17 = AfterSideEffectConfig[K]
                        if ____opt_17 ~= nil then
                            ____opt_17(AfterSideEffectConfig, playerID, result)
                        end
                    end
                    Event:Fire("service_data_change", {playerID = playerID, key = K})
                end
                if SpecialDealKeys[K] then
                    SpecialDealKeys[K](SpecialDealKeys, playerID, V)
                end
            end
        end
    end
end
function CCommonService.prototype.SetDefaultParams(self, params, playerID, tDefaultParams)
    if not params then
        params = {}
    end
    if params.uid == nil and type(playerID) == "number" and PlayerResource:IsValidPlayerID(playerID) then
        params.uid = OVERRIDE_STEAMID or PlayerResource:GetSteamAccountID(playerID)
    end
    if tDefaultParams ~= nil then
        for K, V in pairs(tDefaultParams) do
            if K == "sid" then
                params.sid = tostring(PlayerResource:GetSteamID(playerID))
            elseif K == "name" then
                params.name = PlayerResource:GetPlayerName(playerID) == "" and V or PlayerResource:GetPlayerName(playerID)
            else
                local ____params_20 = params
                local ____K_21 = K
                local ____params_K_19 = params[K]
                if ____params_K_19 == nil then
                    ____params_K_19 = V
                end
                ____params_20[____K_21] = ____params_K_19
            end
        end
    end
    return params
end
function CCommonService.prototype.SetPlayerServiceNetData(self, playerID, k, v, override)
    if override == nil then
        override = false
    end
    if playerID == -1 then
        return
    end
    if self.serviceNettableData[k] == nil then
        self.serviceNettableData[k] = {}
    end
    if self.serviceNettableData[k][playerID] == nil then
        self.serviceNettableData[k][playerID] = {}
    end
    v = not override and self:ServiceTableOverride(self.serviceNettableData[k][playerID], v) or v
    if FinalConfig[k] ~= nil then
        v = FinalConfig[k](FinalConfig, v, playerID)
    end
    self.serviceNettableData[k][playerID] = v
    CustomNetTables:SetTableValue(
        "service",
        k .. tostring(playerID),
        {data = json.encode(self.serviceNettableData[k][playerID])}
    )
    return self.serviceNettableData[k][playerID]
end
function CCommonService.prototype.SetServiceNetData(self, k, v, override)
    if override == nil then
        override = false
    end
    if self.serviceNettableData[k] == nil then
        self.serviceNettableData[k] = {}
    end
    if override then
        self.serviceNettableData[k] = v
    else
        self.serviceNettableData[k] = self:ServiceTableOverride(self.serviceNettableData[k], v)
    end
    CustomNetTables:SetTableValue(
        "service",
        k,
        {data = json.encode(self.serviceNettableData[k])}
    )
    return self.serviceNettableData[k]
end
function CCommonService.prototype.GetPlayerServiceNetTable(self, playerID, k)
    if self.serviceNettableData[k] == nil then
        return
    end
    return self.serviceNettableData[k][playerID]
end
function CCommonService.prototype.GetServiceNetTable(self, k, defaultValue)
    local ____self_serviceNettableData_k_22 = self.serviceNettableData[k]
    if ____self_serviceNettableData_k_22 == nil then
        ____self_serviceNettableData_k_22 = defaultValue
    end
    return ____self_serviceNettableData_k_22
end
function CCommonService.prototype.ServiceTableOverride(self, mainTable, ____table)
    for k in pairs(____table) do
        local v = ____table[k]
        if type(v) == "table" then
            if type(mainTable[k]) == "table" then
                mainTable[k] = self:ServiceTableOverride(mainTable[k], v)
            else
                mainTable[k] = self:ServiceTableOverride({}, v)
            end
        else
            if v == "nil" then
                mainTable[k] = nil
            else
                mainTable[k] = v
            end
        end
    end
    return mainTable
end
function CCommonService.prototype.WrapUrl(self, url, address)
    if address then
        return ((((address .. url) .. "?cheat=") .. tostring(Service_IsCheat)) .. "&local=") .. tostring(Service_IsLocal)
    end
    return ((((ServiceAddress .. url) .. "?cheat=") .. tostring(Service_IsCheat)) .. "&local=") .. tostring(Service_IsLocal)
end
function CCommonService.prototype.UploadError(self, level, msg)
    if not IsInToolsMode() then
        self:CallAction("/v1/log/report", 0, {level = level, message = msg})
    end
end
CCommonService = __TS__DecorateLegacy({reloadable}, CCommonService)
if CommonService == nil then
    CommonService = __TS__New(CCommonService)
end
return ____exports
