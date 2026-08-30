local __TSTL_FILE_PATH__ = "service/unread"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 3,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 8,["21"] = 9,["23"] = 15,["24"] = 15,["25"] = 15,["27"] = 15,["28"] = 16,["29"] = 17,["30"] = 19,["31"] = 20,["33"] = 23,["34"] = 25,["35"] = 6,["36"] = 6,["37"] = 5,["38"] = 31,["39"] = 32,["40"] = 32,["41"] = 32,["42"] = 32,["43"] = 31,["44"] = 38,["45"] = 39,["46"] = 41,["48"] = 42,["49"] = 42,["50"] = 42,["51"] = 42,["52"] = 42,["53"] = 42,["54"] = 42,["55"] = 43,["56"] = 44,["58"] = 47,["60"] = 48,["61"] = 49,["63"] = 52,["64"] = 52,["66"] = 53,["67"] = 54,["68"] = 55,["77"] = 61,["80"] = 65,["81"] = 38,["82"] = 68,["83"] = 69,["84"] = 70,["85"] = 72,["86"] = 73,["88"] = 76,["89"] = 68,["90"] = 79,["91"] = 80,["92"] = 81,["93"] = 83,["94"] = 84,["96"] = 87,["97"] = 79,["98"] = 3,["99"] = 97,["100"] = 97});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CServiceUnread = __TS__Class()
CServiceUnread.name = "CServiceUnread"
__TS__ClassExtends(CServiceUnread, CModule)
function CServiceUnread.prototype.init(self, reload)
    RequestEvent(
        "fishing_unread_read",
        function(event)
            local system = tostring(event.system)
            if system ~= "fishing_tool" and system ~= "fishing_courier" then
                return {code = -1, message = "invalid fishing unread system"}
            end
            local ____event_ids_0 = event.ids
            if ____event_ids_0 == nil then
                ____event_ids_0 = {}
            end
            local ids = ____event_ids_0
            local unreadPatch = {}
            unreadPatch[system] = {}
            for _, id in ipairs(ids) do
                unreadPatch[system][tostring(id)] = "nil"
            end
            CommonService:SetPlayerServiceNetData(event.PlayerID, "player_unread_ids", unreadPatch)
            return {code = 0}
        end
    )
end
function CServiceUnread.prototype.CreateAddItemUnreadContext(self, playerID)
    return {
        playerTokenAmountsBefore = self:SnapshotPlayerTokenAmounts(playerID),
        playerCourierExistsBefore = self:SnapshotPlayerCourierExists(playerID)
    }
end
function CServiceUnread.prototype.ApplyAddItemUnreadConfig(self, playerID, addItems, context)
    local unreadPatch = {}
    for ____, buildPatch in ipairs(AddItemUnreadConfig) do
        do
            local patch = buildPatch(
                nil,
                playerID,
                addItems,
                context.playerTokenAmountsBefore,
                context.playerCourierExistsBefore
            )
            if type(patch) ~= "table" or patch == nil then
                goto __continue8
            end
            for system, ids in pairs(patch) do
                do
                    if type(ids) ~= "table" or ids == nil then
                        goto __continue10
                    end
                    if unreadPatch[system] == nil then
                        unreadPatch[system] = {}
                    end
                    for id, value in pairs(ids) do
                        if value == true then
                            unreadPatch[system][tostring(id)] = true
                        end
                    end
                end
                ::__continue10::
            end
        end
        ::__continue8::
    end
    if #__TS__ObjectKeys(unreadPatch) <= 0 then
        return
    end
    CommonService:SetPlayerServiceNetData(playerID, "player_unread_ids", unreadPatch)
end
function CServiceUnread.prototype.SnapshotPlayerTokenAmounts(self, playerID)
    local tokens = CommonService:GetPlayerServiceNetTable(playerID, "player_tokens") or ({})
    local snapshot = {}
    for id, data in pairs(tokens) do
        snapshot[tostring(id)] = toFiniteNumber(data and data.amounts, 0)
    end
    return snapshot
end
function CServiceUnread.prototype.SnapshotPlayerCourierExists(self, playerID)
    local couriers = CommonService:GetPlayerServiceNetTable(playerID, "player_couriers") or ({})
    local snapshot = {}
    for id in pairs(couriers) do
        snapshot[tostring(id)] = true
    end
    return snapshot
end
CServiceUnread = __TS__DecorateLegacy({reloadable}, CServiceUnread)
if ServiceUnread == nil then
    ServiceUnread = __TS__New(CServiceUnread)
end
return ____exports
