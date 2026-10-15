local __TSTL_FILE_PATH__ = "service/community"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 3,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 7,["19"] = 25,["20"] = 25,["21"] = 26,["23"] = 26,["24"] = 27,["25"] = 25,["26"] = 29,["27"] = 30,["28"] = 30,["29"] = 30,["30"] = 31,["31"] = 32,["33"] = 39,["34"] = 40,["35"] = 41,["36"] = 42,["37"] = 30,["38"] = 30,["39"] = 49,["40"] = 49,["41"] = 49,["42"] = 50,["43"] = 49,["44"] = 49,["45"] = 53,["46"] = 53,["47"] = 53,["48"] = 54,["49"] = 55,["50"] = 56,["51"] = 57,["52"] = 57,["53"] = 57,["54"] = 57,["55"] = 57,["57"] = 65,["58"] = 63,["59"] = 53,["60"] = 53,["61"] = 69,["62"] = 69,["63"] = 69,["64"] = 70,["65"] = 71,["66"] = 72,["68"] = 74,["69"] = 75,["70"] = 76,["71"] = 76,["72"] = 76,["73"] = 76,["75"] = 81,["76"] = 81,["77"] = 82,["78"] = 83,["80"] = 85,["81"] = 69,["82"] = 69,["83"] = 88,["84"] = 88,["85"] = 88,["86"] = 89,["87"] = 90,["88"] = 91,["90"] = 93,["91"] = 94,["92"] = 94,["93"] = 95,["94"] = 98,["95"] = 98,["97"] = 98,["99"] = 96,["100"] = 96,["101"] = 96,["102"] = 96,["103"] = 96,["105"] = 106,["106"] = 106,["107"] = 106,["108"] = 106,["109"] = 106,["111"] = 103,["112"] = 103,["113"] = 103,["114"] = 103,["115"] = 103,["116"] = 88,["117"] = 88,["118"] = 110,["119"] = 110,["120"] = 110,["121"] = 111,["122"] = 112,["123"] = 113,["125"] = 116,["126"] = 117,["127"] = 118,["129"] = 120,["130"] = 121,["132"] = 124,["133"] = 129,["134"] = 130,["135"] = 130,["136"] = 130,["137"] = 130,["139"] = 135,["140"] = 110,["141"] = 110,["142"] = 29,["143"] = 140,["144"] = 141,["145"] = 141,["147"] = 143,["148"] = 148,["149"] = 149,["150"] = 150,["151"] = 151,["152"] = 152,["153"] = 153,["154"] = 154,["155"] = 155,["156"] = 156,["158"] = 158,["159"] = 159,["160"] = 160,["161"] = 161,["163"] = 151,["164"] = 166,["165"] = 166,["166"] = 166,["167"] = 166,["168"] = 167,["169"] = 167,["170"] = 167,["171"] = 167,["172"] = 168,["173"] = 168,["174"] = 169,["175"] = 169,["176"] = 169,["177"] = 169,["178"] = 167,["179"] = 167,["180"] = 166,["181"] = 166,["182"] = 172,["183"] = 172,["184"] = 172,["185"] = 172,["186"] = 173,["187"] = 173,["188"] = 173,["189"] = 173,["190"] = 174,["191"] = 174,["192"] = 173,["193"] = 173,["194"] = 172,["195"] = 172,["196"] = 177,["197"] = 177,["198"] = 177,["199"] = 177,["200"] = 178,["201"] = 178,["202"] = 178,["203"] = 178,["204"] = 179,["205"] = 179,["206"] = 178,["207"] = 178,["208"] = 177,["209"] = 177,["210"] = 183,["211"] = 185,["212"] = 186,["213"] = 187,["214"] = 187,["215"] = 188,["217"] = 189,["219"] = 184,["220"] = 140,["221"] = 193,["222"] = 197,["223"] = 197,["225"] = 199,["226"] = 193,["227"] = 202,["228"] = 205,["229"] = 205,["231"] = 207,["232"] = 202,["233"] = 210,["234"] = 213,["235"] = 213,["237"] = 215,["238"] = 210,["239"] = 219,["240"] = 220,["241"] = 221,["242"] = 222,["243"] = 225,["244"] = 226,["245"] = 226,["246"] = 226,["247"] = 226,["249"] = 228,["250"] = 228,["251"] = 228,["252"] = 228,["253"] = 219,["254"] = 231,["255"] = 232,["256"] = 233,["257"] = 233,["258"] = 233,["259"] = 234,["260"] = 235,["261"] = 233,["262"] = 233,["263"] = 237,["264"] = 231,["265"] = 240,["266"] = 241,["267"] = 242,["268"] = 243,["269"] = 245,["270"] = 246,["271"] = 240,["272"] = 249,["273"] = 250,["274"] = 251,["275"] = 252,["276"] = 253,["277"] = 254,["278"] = 256,["279"] = 257,["282"] = 261,["283"] = 261,["284"] = 261,["285"] = 261,["288"] = 259,["295"] = 264,["296"] = 265,["298"] = 267,["299"] = 249,["300"] = 270,["301"] = 271,["302"] = 272,["303"] = 273,["304"] = 274,["306"] = 275,["307"] = 276,["309"] = 278,["310"] = 279,["314"] = 281,["315"] = 270,["316"] = 284,["317"] = 285,["318"] = 284,["319"] = 290,["320"] = 291,["321"] = 290,["322"] = 294,["323"] = 295,["324"] = 294,["325"] = 298,["326"] = 299,["329"] = 302,["330"] = 298,["331"] = 305,["332"] = 306,["333"] = 307,["334"] = 307,["335"] = 307,["336"] = 308,["337"] = 307,["339"] = 307,["340"] = 307,["341"] = 309,["342"] = 307,["344"] = 307,["345"] = 307,["346"] = 307,["348"] = 306,["349"] = 305,["350"] = 25,["351"] = 319,["352"] = 319});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local COMMUNITY_BASE_URL = "http://110.40.187.139:8200"
local COMMUNITY_ONLINE_URL = "https://community.eomgames.net"
local COMMUNITY_API_KEY = "4cdafd77a1989d3f9716b9bd0c7fedb1"
local COMMUNITY_DEFAULT_LANG = "zh"
local COMMUNITY_FEEDBACK_MAX_LENGTH = 2000
--- 社区服务：按 Panorama 请求代理社区 HTTP，数据仅返回给发起请求的客户端。
local CCommunity = __TS__Class()
CCommunity.name = "CCommunity"
__TS__ClassExtends(CCommunity, CModule)
function CCommunity.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.useOnlineURLInTools = false
end
function CCommunity.prototype.init(self, _bReload)
    RequestEvent(
        "community_set_test_url",
        function(event)
            if not IsInToolsMode() then
                return {ok = false, useOnline = true, url = COMMUNITY_ONLINE_URL, message = "Community URL switching is only available in Tools Mode"}
            end
            self.useOnlineURLInTools = event.useOnline
            local url = self:GetBaseUrl()
            print("[Community] API URL switched to " .. url)
            return {ok = true, useOnline = self.useOnlineURLInTools, url = url}
        end
    )
    RequestEvent(
        "community_refresh",
        function(event)
            return self:FetchHomeData(self:NormalizeLanguage(event.lang))
        end
    )
    RequestEvent(
        "community_contents",
        function(event)
            local lang = self:NormalizeLanguage(event.lang)
            local result = self:HTTP_GET_SYNC("/api/contents", {tag = event.tag, lang = lang})
            if not self:IsSuccess(result.statusCode) then
                return {
                    ok = false,
                    contents = {},
                    message = self:GetResponseMessage(result, "Community contents request failed")
                }
            end
            local ____opt_0 = result.body
            return {ok = true, contents = ____opt_0 and ____opt_0.contents or ({})}
        end
    )
    RequestEvent(
        "community_weekly_status",
        function(event)
            local steamID = self:GetPlayerSteamID(event.PlayerID)
            if steamID == nil then
                return {ok = false, message = "Steam ID unavailable"}
            end
            local result = self:HTTP_GET_SYNC("/api/weekly-rewards/current", {steam_id = steamID})
            if not self:IsSuccess(result.statusCode) then
                return {
                    ok = false,
                    message = self:GetResponseMessage(result, "Weekly reward status request failed")
                }
            end
            local ____opt_2 = result.body
            local state = ____opt_2 and ____opt_2.status
            if state ~= "available" and state ~= "received" then
                return {ok = false, message = "Invalid weekly reward status"}
            end
            return {ok = true, state = state}
        end
    )
    RequestEvent(
        "community_claim_weekly",
        function(event)
            local steamID = self:GetPlayerSteamID(event.PlayerID)
            if steamID == nil then
                return {ok = false, message = "Steam ID unavailable"}
            end
            local result = self:HTTP_POST_SYNC("/api/weekly-rewards/claim", {steam_id = steamID})
            local ____opt_4 = result.body
            local responseSuccess = ____opt_4 and ____opt_4.success
            if not self:IsSuccess(result.statusCode) or responseSuccess == false then
                local ____opt_8 = result.body
                local ____opt_6 = ____opt_8 and ____opt_8.data
                if ____opt_6 ~= nil then
                    ____opt_6 = ____opt_6.retryAfter
                end
                return {
                    ok = false,
                    retryAfter = ____opt_6,
                    message = self:GetResponseMessage(result, "Weekly reward claim failed")
                }
            end
            local ____tostring_13 = tostring
            local ____opt_10 = result.body
            local ____temp_12 = ____opt_10 and ____opt_10.message
            if ____temp_12 == nil then
                ____temp_12 = "Claimed successfully"
            end
            return {
                ok = true,
                state = "received",
                message = ____tostring_13(____temp_12)
            }
        end
    )
    RequestEvent(
        "community_submit_feedback",
        function(event)
            local steamID = self:GetPlayerSteamID(event.PlayerID)
            if steamID == nil then
                return {ok = false, message = "Steam ID unavailable"}
            end
            local content = __TS__StringTrim(tostring(event.content or ""))
            if content == "" or #content > COMMUNITY_FEEDBACK_MAX_LENGTH then
                return {ok = false, message = "Invalid feedback content"}
            end
            if event.type ~= "bug" and event.type ~= "suggestion" and event.type ~= "other" then
                return {ok = false, message = "Invalid feedback type"}
            end
            local result = self:HTTP_POST_SYNC("/api/feedbacks", {steam_id = steamID, type = event.type, content = content})
            if not self:IsSuccess(result.statusCode) then
                return {
                    ok = false,
                    message = self:GetResponseMessage(result, "Feedback submission failed")
                }
            end
            return {ok = true}
        end
    )
end
function CCommunity.prototype.FetchHomeData(self, lang)
    if lang == nil then
        lang = COMMUNITY_DEFAULT_LANG
    end
    local data = {banners = {}, homeContents = {}, notices = {}}
    local firstFailure
    local pending = 3
    local co = coroutine.running()
    local function finish(____, result, apply)
        local success = self:IsSuccess(result.statusCode)
        if success then
            apply(nil)
        elseif firstFailure == nil then
            firstFailure = result
        end
        pending = pending - 1
        if pending == 0 then
            local resumeResult = {coroutine.resume(co)}
            assert(resumeResult[1], resumeResult[2])
        end
    end
    self:HTTP_GET(
        "/api/banners",
        {lang = lang},
        function(____, result)
            finish(
                nil,
                result,
                function()
                    local ____opt_14 = result.body
                    local banners = ____opt_14 and ____opt_14.banners or ({})
                    data.banners = __TS__ArrayFilter(
                        banners,
                        function(____, banner) return banner.imageUrl ~= nil and banner.imageUrl ~= "" end
                    )
                end
            )
        end
    )
    self:HTTP_GET(
        "/api/contents",
        {tag = "home", limit = 15, lang = lang},
        function(____, result)
            finish(
                nil,
                result,
                function()
                    local ____opt_16 = result.body
                    data.homeContents = ____opt_16 and ____opt_16.contents or ({})
                end
            )
        end
    )
    self:HTTP_GET(
        "/api/contents",
        {tag = "notice", limit = 30, lang = lang},
        function(____, result)
            finish(
                nil,
                result,
                function()
                    local ____opt_18 = result.body
                    data.notices = ____opt_18 and ____opt_18.contents or ({})
                end
            )
        end
    )
    coroutine.yield()
    local ____temp_21 = firstFailure == nil
    local ____data_22 = data
    local ____temp_20
    if firstFailure == nil then
        ____temp_20 = nil
    else
        ____temp_20 = self:GetResponseMessage(firstFailure, "Community home request failed")
    end
    return {ok = ____temp_21, data = ____data_22, message = ____temp_20}
end
function CCommunity.prototype.HTTP_GET(self, path, query, callback, timeout)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    self:HTTP_REQUEST({method = "GET", path = path, query = query, timeout = timeout}, callback)
end
function CCommunity.prototype.HTTP_GET_SYNC(self, path, query, timeout)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    return self:HTTP_REQUEST_SYNC({method = "GET", path = path, query = query, timeout = timeout})
end
function CCommunity.prototype.HTTP_POST_SYNC(self, path, body, timeout)
    if timeout == nil then
        timeout = REQUEST_TIME_OUT
    end
    return self:HTTP_REQUEST_SYNC({method = "POST", path = path, body = body, timeout = timeout})
end
function CCommunity.prototype.HTTP_REQUEST(self, options, callback)
    local url = self:BuildUrl(options.path, options.query or ({}))
    local handle = self:CreateRequest(options.method, url, options.timeout or REQUEST_TIME_OUT)
    if options.body ~= nil then
        setmetatable(options.body, {__jsontype = "object"})
        handle:SetHTTPRequestRawPostBody(
            "application/json",
            json.encode(options.body)
        )
    end
    handle:Send(function(response) return callback(
        nil,
        self:DecodeResponse(options.method, url, response)
    ) end)
end
function CCommunity.prototype.HTTP_REQUEST_SYNC(self, options)
    local co = coroutine.running()
    self:HTTP_REQUEST(
        options,
        function(____, result)
            local resumeResult = {coroutine.resume(co, result)}
            assert(resumeResult[1], resumeResult[2])
        end
    )
    return (coroutine.yield())
end
function CCommunity.prototype.CreateRequest(self, method, url, timeout)
    local handle = CreateHTTPRequestScriptVM(method, url)
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    handle:SetHTTPRequestHeaderValue("Accept", "application/json")
    handle:SetHTTPRequestAbsoluteTimeoutMS(timeout * 1000)
    return handle
end
function CCommunity.prototype.DecodeResponse(self, method, url, response)
    local statusCode = response and response.StatusCode or -1
    local rawBody = response and response.Body or ""
    self:print((("[Community] " .. method) .. " ") .. url)
    self:print("[Community] StatusCode: " .. tostring(statusCode))
    self:print(rawBody)
    local body
    if rawBody ~= "" then
        do
            local function ____catch(err)
                self:error(
                    "json decode failed url=" .. url,
                    tostring(err)
                )
            end
            local ____try, ____hasReturned = pcall(function()
                body = json.decode(rawBody)
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
    if not self:IsSuccess(statusCode) then
        self:error((((method .. " failed url=") .. url) .. " status=") .. tostring(statusCode))
    end
    return {statusCode = statusCode, body = body, rawBody = rawBody, url = url}
end
function CCommunity.prototype.BuildUrl(self, path, query)
    local url = self:GetBaseUrl()
    url = url .. path
    local separator = "?"
    for key, value in pairs(query) do
        do
            if value == nil then
                goto __continue47
            end
            url = url .. ((separator .. key) .. "=") .. tostring(value)
            separator = "&"
        end
        ::__continue47::
    end
    return url
end
function CCommunity.prototype.GetBaseUrl(self)
    return IsInToolsMode() and not self.useOnlineURLInTools and COMMUNITY_BASE_URL or COMMUNITY_ONLINE_URL
end
function CCommunity.prototype.NormalizeLanguage(self, lang)
    return (lang == "en" or lang == "ru") and lang or "zh"
end
function CCommunity.prototype.IsSuccess(self, statusCode)
    return statusCode >= 200 and statusCode < 300
end
function CCommunity.prototype.GetPlayerSteamID(self, playerID)
    if not PlayerResource:IsValidPlayerID(playerID) then
        return
    end
    return tostring(PlayerResource:GetSteamAccountID(playerID))
end
function CCommunity.prototype.GetResponseMessage(self, result, fallback)
    local ____tostring_36 = tostring
    local ____opt_27 = result.body
    local ____temp_31 = ____opt_27 and ____opt_27.statusMessage
    if ____temp_31 == nil then
        local ____opt_29 = result.body
        ____temp_31 = ____opt_29 and ____opt_29.message
    end
    local ____temp_31_34 = ____temp_31
    if ____temp_31_34 == nil then
        local ____opt_32 = result.body
        ____temp_31_34 = ____opt_32 and ____opt_32.error
    end
    local ____temp_31_34_35 = ____temp_31_34
    if ____temp_31_34_35 == nil then
        ____temp_31_34_35 = fallback
    end
    return ____tostring_36(____temp_31_34_35)
end
CCommunity = __TS__DecorateLegacy({reloadable}, CCommunity)
if CommunityService == nil then
    CommunityService = __TS__New(CCommunity)
end
return ____exports
