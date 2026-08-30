local __TSTL_FILE_PATH__ = "service/player"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["14"] = 12,["15"] = 12,["16"] = 13,["18"] = 13,["19"] = 15,["20"] = 12,["21"] = 18,["22"] = 19,["23"] = 20,["25"] = 22,["26"] = 22,["28"] = 24,["29"] = 24,["30"] = 24,["31"] = 25,["32"] = 24,["33"] = 24,["34"] = 28,["35"] = 28,["36"] = 28,["37"] = 29,["38"] = 28,["39"] = 28,["40"] = 32,["41"] = 32,["42"] = 32,["43"] = 33,["44"] = 32,["45"] = 32,["46"] = 36,["47"] = 36,["48"] = 36,["49"] = 37,["50"] = 42,["51"] = 43,["52"] = 44,["53"] = 46,["54"] = 47,["56"] = 50,["58"] = 53,["59"] = 36,["60"] = 36,["61"] = 18,["62"] = 60,["63"] = 61,["64"] = 62,["66"] = 60,["67"] = 66,["68"] = 67,["69"] = 68,["70"] = 69,["72"] = 71,["73"] = 72,["74"] = 66,["75"] = 75,["76"] = 76,["77"] = 77,["78"] = 78,["79"] = 80,["80"] = 80,["81"] = 80,["82"] = 80,["83"] = 80,["84"] = 80,["85"] = 81,["86"] = 82,["87"] = 84,["88"] = 85,["89"] = 86,["90"] = 87,["92"] = 89,["93"] = 89,["94"] = 90,["95"] = 91,["96"] = 92,["97"] = 93,["98"] = 94,["100"] = 96,["101"] = 104,["102"] = 89,["105"] = 107,["106"] = 107,["107"] = 107,["108"] = 107,["109"] = 107,["110"] = 107,["111"] = 107,["112"] = 115,["113"] = 115,["114"] = 115,["115"] = 115,["116"] = 115,["117"] = 115,["118"] = 84,["120"] = 123,["121"] = 123,["122"] = 124,["123"] = 125,["125"] = 123,["128"] = 129,["129"] = 129,["130"] = 131,["131"] = 132,["132"] = 132,["133"] = 129,["134"] = 129,["135"] = 75,["136"] = 140,["137"] = 141,["138"] = 142,["139"] = 143,["140"] = 144,["143"] = 147,["144"] = 148,["145"] = 149,["146"] = 149,["147"] = 149,["148"] = 149,["149"] = 150,["150"] = 151,["153"] = 154,["154"] = 155,["156"] = 157,["157"] = 140,["158"] = 160,["159"] = 161,["160"] = 162,["161"] = 163,["163"] = 166,["164"] = 173,["165"] = 174,["167"] = 177,["168"] = 184,["169"] = 185,["171"] = 187,["172"] = 188,["173"] = 189,["174"] = 190,["175"] = 191,["176"] = 192,["177"] = 193,["178"] = 193,["179"] = 194,["181"] = 195,["183"] = 193,["184"] = 196,["185"] = 197,["186"] = 198,["187"] = 198,["188"] = 198,["190"] = 198,["191"] = 199,["192"] = 200,["195"] = 203,["196"] = 204,["197"] = 205,["201"] = 210,["202"] = 210,["203"] = 210,["204"] = 213,["205"] = 213,["206"] = 213,["207"] = 213,["208"] = 213,["209"] = 213,["210"] = 213,["211"] = 210,["212"] = 210,["213"] = 160,["214"] = 223,["215"] = 224,["216"] = 225,["218"] = 228,["219"] = 235,["220"] = 236,["222"] = 238,["223"] = 240,["224"] = 241,["225"] = 242,["226"] = 243,["227"] = 244,["229"] = 252,["230"] = 223,["231"] = 259,["232"] = 260,["233"] = 261,["234"] = 262,["235"] = 263,["236"] = 264,["240"] = 268,["241"] = 259,["242"] = 271,["243"] = 272,["244"] = 273,["245"] = 274,["247"] = 276,["248"] = 276,["249"] = 271,["250"] = 279,["251"] = 280,["252"] = 281,["253"] = 282,["255"] = 285,["256"] = 286,["258"] = 287,["259"] = 288,["261"] = 290,["265"] = 292,["266"] = 279,["267"] = 297,["268"] = 298,["269"] = 299,["270"] = 300,["271"] = 301,["272"] = 302,["273"] = 303,["275"] = 305,["276"] = 305,["277"] = 306,["278"] = 307,["279"] = 308,["280"] = 309,["282"] = 311,["283"] = 312,["285"] = 313,["286"] = 314,["288"] = 316,["289"] = 317,["294"] = 320,["296"] = 322,["297"] = 297,["298"] = 326,["299"] = 327,["300"] = 328,["301"] = 329,["302"] = 330,["304"] = 333,["305"] = 334,["306"] = 335,["307"] = 336,["308"] = 337,["310"] = 340,["311"] = 341,["312"] = 342,["313"] = 343,["315"] = 346,["316"] = 347,["317"] = 348,["318"] = 349,["319"] = 350,["321"] = 353,["322"] = 326,["323"] = 356,["324"] = 357,["325"] = 357,["326"] = 357,["328"] = 358,["329"] = 359,["330"] = 360,["331"] = 361,["333"] = 363,["334"] = 364,["335"] = 365,["336"] = 365,["337"] = 365,["339"] = 365,["341"] = 367,["344"] = 375,["345"] = 356,["346"] = 12,["347"] = 383,["348"] = 383});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 玩家后端数据
local CPlayerData = __TS__Class()
CPlayerData.name = "CPlayerData"
__TS__ClassExtends(CPlayerData, CModule)
function CPlayerData.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.DEFAULT_COURIER_ID = "600001"
end
function CPlayerData.prototype.init(self, reload)
    if not reload then
        self.playerShowRooms = {}
    end
    if self.heroVoiceTypes == nil then
        self.heroVoiceTypes = {}
    end
    RequestEvent(
        "like_show_room",
        function(event)
            return self:LikeShowRoom(event.PlayerID, event.target_player_id, event.target_uid)
        end
    )
    RequestEvent(
        "get_player_info",
        function(event)
            return self:GetPlayerInfo(event)
        end
    )
    RequestEvent(
        "leaderboard_mock_fetch",
        function(event)
            return self:GetMockLeaderboardData(event)
        end
    )
    RequestEvent(
        "player_unread_read",
        function(event)
            local result = CommonService:CallActionSync("/v1/equip/read", event.PlayerID, {system = event.system, ids = event.ids}, {ignoreInvalidResponse = false, commonCallback = false, showAddItems = false})
            if result.code == 0 or result.code == 200 then
                local unreadPatch = {}
                unreadPatch[event.system] = {}
                for _, id in ipairs(event.ids) do
                    unreadPatch[event.system][tostring(id)] = "nil"
                end
                CommonService:SetPlayerServiceNetData(event.PlayerID, "player_unread_ids", unreadPatch)
            end
            return {code = result.code or -1, message = result.message}
        end
    )
end
function CPlayerData.prototype.SetHeroVoiceType(self, playerID, value)
    if value == "schinese" or value == "english" or value == "russian" then
        self.heroVoiceTypes[playerID] = value
    end
end
function CPlayerData.prototype.GetHeroVoiceType(self, playerID)
    local voiceType = self.heroVoiceTypes[playerID]
    if voiceType ~= nil then
        return voiceType
    end
    local language = Convars:GetStr("cl_language")
    return (language == "schinese" or language == "russian") and language or "english"
end
function CPlayerData.prototype.GetMockLeaderboardData(self, event)
    local itemCount = 21
    local baseSteamID = 256964371
    local playerNum = event.leaderboard_type == "common_match_hero" and 1 or math.min(
        4,
        math.max(
            1,
            math.floor(toFiniteNumber(event.player_num, 1))
        )
    )
    local heroIDs = {224, 225, 226, 227}
    local leaderboardData = {}
    local function createRankData(____, rank)
        local playerExtraData = {}
        local playerData = {}
        local firstPlayerID = ""
        do
            local playerIndex = 0
            while playerIndex < playerNum do
                local steamID = baseSteamID + (rank - 1) * playerNum + playerIndex
                local playerID = tostring(steamID)
                local heroID = event.hero_id or heroIDs[(rank + playerIndex - 1) % #heroIDs + 1]
                if firstPlayerID == "" then
                    firstPlayerID = playerID
                end
                playerExtraData[playerID] = {extra_data = {border = "1710000", invalid_avatar = "", invalid_name = "", title = "1711001"}}
                playerData[playerID] = {hero_id = heroID}
                playerIndex = playerIndex + 1
            end
        end
        local teamExtraData = {
            diff = (rank - 1) % 11 + 1,
            total_time = 60 + rank * 7 + playerNum * 3,
            mvp_uid = firstPlayerID,
            mvp_power = tostring(100000 + rank * 1000),
            player_data = playerData
        }
        return {
            team_id = firstPlayerID,
            rank = rank,
            team_extra_data = json.encode(teamExtraData),
            player_extra_data = playerExtraData
        }
    end
    do
        local rank = 1
        while rank <= itemCount do
            if rank >= event.start and rank <= event["end"] then
                leaderboardData[#leaderboardData + 1] = createRankData(nil, rank)
            end
            rank = rank + 1
        end
    end
    return {
        code = 0,
        data = {leaderboard_datas = {{
            leaderboard_data = leaderboardData,
            self_data = createRankData(nil, itemCount)
        }}}
    }
end
function CPlayerData.prototype.GetShortSteamID(self, event)
    if event.steamID ~= nil then
        local steamID = toFiniteNumber(event.steamID, 0)
        if steamID > 0 then
            return steamID
        end
    end
    if event.steam64ID ~= nil then
        local steam64Text = tostring(event.steam64ID)
        local steamID = toFiniteNumber(
            string.sub(steam64Text, 5),
            0
        ) - 1197960265728
        if steamID > 0 then
            return steamID
        end
    end
    if event.playerID ~= nil and PlayerResource:IsValidPlayerID(event.playerID) then
        return PlayerResource:GetSteamAccountID(event.playerID)
    end
    return nil
end
function CPlayerData.prototype.GetPlayerInfo(self, event)
    local targetUID = self:GetShortSteamID(event)
    if targetUID == nil or targetUID <= 0 then
        return {code = -1, message = "invalid steam id"}
    end
    local briefResult = CommonService:CallActionSync("/v1/brief/get_data", event.PlayerID, {target_uid = targetUID}, {ignoreInvalidResponse = false, commonCallback = false, showAddItems = false})
    if briefResult.code ~= 0 and briefResult.code ~= 200 then
        return {code = briefResult.code or -1, message = briefResult.message, steamID = targetUID}
    end
    local showRoomResult = CommonService:CallActionSync("/v1/brief/show_room", event.PlayerID, {target_uid = targetUID}, {ignoreInvalidResponse = false, commonCallback = false, showAddItems = false})
    if showRoomResult.code ~= 0 and showRoomResult.code ~= 200 then
        return {code = showRoomResult.code or -1, message = showRoomResult.message, steamID = targetUID}
    end
    local briefResultData = briefResult.data or ({})
    local showRoomResultData = showRoomResult.data or ({})
    local hasWrappedShowRoomData = showRoomResultData.player_show_rooms ~= nil
    local showRoomPlayerKeyValues = showRoomResultData.player_key_values
    local showRoomPlayerCounters = showRoomResultData.player_counters
    local hasShowRoomMetadata = showRoomPlayerKeyValues ~= nil or showRoomPlayerCounters ~= nil
    local ____hasWrappedShowRoomData_0
    if hasWrappedShowRoomData then
        ____hasWrappedShowRoomData_0 = showRoomResultData.player_show_rooms
    else
        ____hasWrappedShowRoomData_0 = hasShowRoomMetadata and ({}) or showRoomResultData
    end
    local showRoomData = ____hasWrappedShowRoomData_0
    local mergedPlayerCounters = {}
    if showRoomPlayerCounters ~= nil then
        local ____briefResultData_player_counters_3 = briefResultData.player_counters
        if ____briefResultData_player_counters_3 == nil then
            ____briefResultData_player_counters_3 = {}
        end
        for ____, counter in ipairs(__TS__ObjectValues(____briefResultData_player_counters_3)) do
            if (counter and counter.counter_type) ~= nil then
                mergedPlayerCounters[tostring(counter.counter_type)] = counter
            end
        end
        for ____, counter in ipairs(__TS__ObjectValues(showRoomPlayerCounters)) do
            if (counter and counter.counter_type) ~= nil then
                mergedPlayerCounters[tostring(counter.counter_type)] = counter
            end
        end
    end
    return {
        code = 0,
        steamID = targetUID,
        data = __TS__ObjectAssign(
            {},
            briefResultData,
            hasWrappedShowRoomData and showRoomResultData or ({}),
            showRoomPlayerKeyValues ~= nil and ({player_key_values = showRoomPlayerKeyValues}) or ({}),
            showRoomPlayerCounters ~= nil and ({player_counters = mergedPlayerCounters}) or ({}),
            {player_show_rooms = showRoomData}
        )
    }
end
function CPlayerData.prototype.LikeShowRoom(self, playerID, targetPlayerID, targetUID)
    if targetUID <= 0 or PlayerResource:GetSteamAccountID(playerID) == targetUID then
        return {code = -1}
    end
    local result = CommonService:CallActionSync("/v1/brief/like_show_room", playerID, {target_uid = targetUID}, {ignoreInvalidResponse = false, commonCallback = false, showAddItems = false})
    if result.code ~= 0 and result.code ~= 200 then
        return {code = result.code or -1, message = result.message}
    end
    CommonService:CommonCallback(playerID, result, false)
    if targetPlayerID ~= nil and PlayerResource:IsValidPlayerID(targetPlayerID) then
        local counters = CommonService:GetPlayerServiceNetTable(targetPlayerID, "player_counters") or ({})
        local counterType = "show_room_liked_total"
        local currentCounter = counters[counterType]
        CommonService:SetPlayerServiceNetData(targetPlayerID, "player_counters", {[counterType] = {counter_type = counterType, count = (currentCounter and currentCounter.count or 0) + 1, update_time = currentCounter and currentCounter.update_time or 0}})
    end
    return {code = result.code}
end
function CPlayerData.prototype.GetEquippedCourier(self, playerID)
    local playerCouriers = CommonService:GetPlayerServiceNetTable(playerID, "player_couriers")
    if playerCouriers ~= nil then
        for courierId, courierData in pairs(playerCouriers) do
            if courierData.equipped == true then
                return {id = courierId, star = courierData.star}
            end
        end
    end
    return {id = self.DEFAULT_COURIER_ID, star = 1}
end
function CPlayerData.prototype.GetCourierStar(self, playerID, courierId)
    local playerCouriers = CommonService:GetPlayerServiceNetTable(playerID, "player_couriers")
    if playerCouriers == nil then
        return 0
    end
    local ____opt_10 = playerCouriers[courierId]
    return ____opt_10 and ____opt_10.star or 0
end
function CPlayerData.prototype.GetTotalCourierStar(self, playerID)
    local playerCouriers = CommonService:GetPlayerServiceNetTable(playerID, "player_couriers")
    if playerCouriers == nil then
        return 0
    end
    local totalStar = 0
    for _, courierData in pairs(playerCouriers) do
        do
            if courierData == nil then
                goto __continue51
            end
            totalStar = totalStar + (courierData.star or 0)
        end
        ::__continue51::
    end
    return totalStar
end
function CPlayerData.prototype.GetServiceItemCount(self, playerID, id)
    id = tostring(id)
    local propType = tonumber(GetItemPropType(id))
    if propType == 1 then
        local playerTokens = CommonService:GetPlayerServiceNetTable(playerID, "player_tokens")
        if playerTokens == nil then
            return 0
        end
        local ____opt_12 = playerTokens[id]
        return ____opt_12 and ____opt_12.amounts or 0
    elseif propType == 4 then
        local props = CommonService:GetPlayerServiceNetTable(playerID, "player_props")
        if props == nil then
            return 0
        end
        local sum = 0
        for _, propData in pairs(props) do
            do
                if propData == nil then
                    goto __continue58
                end
                if propData.prop_id == tonumber(id) then
                    sum = sum + (propData.amounts or 0)
                end
            end
            ::__continue58::
        end
        return sum
    end
    return 0
end
function CPlayerData.prototype.TryPreDeductServiceItem(self, playerID, id, count)
    id = tostring(id)
    local costCount = math.floor(toFiniteNumber(count, 0))
    if costCount <= 0 then
        return true
    end
    local propType = tonumber(GetItemPropType(id))
    if propType == 1 then
        local playerTokens = CommonService:GetPlayerServiceNetTable(playerID, "player_tokens")
        if playerTokens == nil then
            return false
        end
        local tokenData = playerTokens[id]
        local currentAmount = toFiniteNumber(tokenData and tokenData.amounts, 0)
        if tokenData == nil or currentAmount < costCount then
            return false
        end
        tokenData.amounts = currentAmount - costCount
        local nextTokens = {}
        nextTokens[id] = tokenData
        CommonService:SetPlayerServiceNetData(playerID, "player_tokens", nextTokens)
        return true
    end
    return false
end
function CPlayerData.prototype.DealShowRoomData(self, playerID, data)
    local ____self_playerShowRooms_16, ____playerID_17 = self.playerShowRooms, playerID
    if ____self_playerShowRooms_16[____playerID_17] == nil then
        ____self_playerShowRooms_16[____playerID_17] = {}
    end
    for k, v in pairs(data) do
        local key = (tostring(v.show_type) .. "-") .. tostring(v.slot)
        if v.id == 0 then
            self.playerShowRooms[playerID][key] = "nil"
        else
            local parsed = {}
            if v.details and type(v.details) == "string" then
                local ____temp_18 = (json.decode(v.details))
                if ____temp_18 == nil then
                    ____temp_18 = {}
                end
                parsed = ____temp_18
            end
            self.playerShowRooms[playerID][key] = {show_type = v.show_type, slot = v.slot, id = v.id, [v.show_type] = parsed}
        end
    end
    CommonService:SetPlayerServiceNetData(playerID, "player_show_rooms", self.playerShowRooms[playerID])
end
CPlayerData = __TS__DecorateLegacy({reloadable}, CPlayerData)
if PlayerData == nil then
    PlayerData = __TS__New(CPlayerData)
end
return ____exports
