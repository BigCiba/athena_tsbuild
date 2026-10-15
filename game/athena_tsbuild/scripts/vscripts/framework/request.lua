local __TSTL_FILE_PATH__ = "framework/request"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 3,["14"] = 4,["16"] = 4,["17"] = 5,["18"] = 3,["19"] = 6,["20"] = 7,["21"] = 6,["22"] = 9,["23"] = 10,["24"] = 11,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 11,["29"] = 11,["30"] = 11,["31"] = 12,["32"] = 12,["33"] = 12,["34"] = 13,["35"] = 14,["36"] = 15,["37"] = 16,["38"] = 17,["39"] = 18,["40"] = 18,["41"] = 18,["42"] = 18,["43"] = 18,["46"] = 12,["47"] = 12,["48"] = 12,["50"] = 23,["51"] = 23,["52"] = 23,["53"] = 23,["54"] = 23,["55"] = 23,["56"] = 23,["58"] = 9,["59"] = 35,["60"] = 36,["61"] = 35,["62"] = 42,["63"] = 43,["64"] = 43,["65"] = 43,["66"] = 43,["67"] = 43,["68"] = 43,["69"] = 43,["70"] = 42,["71"] = 52,["72"] = 53,["73"] = 54,["76"] = 56,["77"] = 57,["80"] = 59,["81"] = 60,["84"] = 62,["85"] = 63,["86"] = 63,["87"] = 64,["88"] = 66,["89"] = 67,["90"] = 68,["91"] = 69,["93"] = 71,["95"] = 74,["96"] = 75,["97"] = 76,["98"] = 77,["99"] = 78,["100"] = 79,["101"] = 80,["102"] = 81,["103"] = 82,["104"] = 83,["105"] = 84,["106"] = 85,["107"] = 86,["108"] = 86,["109"] = 86,["110"] = 86,["111"] = 86,["112"] = 86,["113"] = 86,["114"] = 86,["115"] = 86,["116"] = 91,["119"] = 63,["120"] = 63,["121"] = 63,["122"] = 95,["123"] = 62,["124"] = 52,["125"] = 107,["126"] = 108,["127"] = 107,["128"] = 114,["129"] = 115,["130"] = 115,["131"] = 115,["132"] = 115,["133"] = 115,["134"] = 115,["135"] = 115,["136"] = 115,["137"] = 114,["138"] = 127,["139"] = 128,["140"] = 129,["143"] = 131,["144"] = 132,["147"] = 134,["148"] = 135,["149"] = 136,["150"] = 137,["152"] = 139,["154"] = 141,["155"] = 142,["156"] = 143,["158"] = 127,["159"] = 3,["160"] = 150,["161"] = 150});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MRequest = __TS__Class()
MRequest.name = "MRequest"
__TS__ClassExtends(MRequest, CModule)
function MRequest.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.tEvents = {}
end
function MRequest.prototype.initPriority(self)
    return 2
end
function MRequest.prototype.init(self, reload)
    if IsServer() then
        CustomUIEvent(
            "server_request_event",
            function(self, ...)
                return self:OnServerEvent(...)
            end,
            self
        )
        CustomUIEvent(
            "cancel_server_request_event",
            function(self, tData)
                local playerID = tData.PlayerID
                local ____ = CustomNetTables.GetTableValue
                local keys = CustomNetTables:GetAllTableKeys("request_" .. tostring(playerID))
                for ____, key in ipairs(keys) do
                    if __TS__StringStartsWith(key, tData.queueIndex) then
                        CustomNetTables:SetTableValue(
                            "request_" .. tostring(playerID),
                            key,
                            nil
                        )
                    end
                end
            end,
            self
        )
    else
        GameEvent(
            "client_request_event",
            function(self, ...)
                return self:OnClientEvent(...)
            end,
            self
        )
    end
end
function MRequest.prototype.RegisterServerEvent(self, sEvent, func, context)
    self.tEvents[sEvent] = {callback = func, context = context}
end
function MRequest.prototype.FireServerEvent(self, sEvent, iPlayerID, data)
    self:OnServerEvent({
        event = sEvent,
        PlayerID = iPlayerID,
        data = json.encode(data),
        queueIndex = "",
        _IsFire = true
    })
end
function MRequest.prototype.OnServerEvent(self, tData)
    local hPlayer = PlayerResource:GetPlayer(tData.PlayerID or -1)
    if hPlayer == nil then
        return
    end
    local tEventTable = self.tEvents[tData.event]
    if tEventTable == nil then
        return
    end
    local data = json.decode(tData.data)
    if data == nil then
        return
    end
    coroutine.wrap(function()
        local a, b = xpcall(
            function()
                data.PlayerID = tData.PlayerID
                local result
                local func = tEventTable.callback
                if tEventTable.context ~= nil then
                    result = func(tEventTable.context, data)
                else
                    result = func(data)
                end
                if tData._IsFire ~= true and type(result) == "table" then
                    local stepAmount = 8192
                    local json_str = json.encode(result)
                    local length = #json_str
                    local maxStep = math.ceil(length / stepAmount)
                    local nowStep = 1
                    local queueIndex = tData.queueIndex
                    local s = ""
                    for i = 1, maxStep, 1 do
                        local iStart = Clamp((i - 1) * stepAmount + 1, 1, length)
                        local iEnd = Clamp(i * stepAmount, 1, length)
                        s = s .. string.sub(json_str, iStart, iEnd)
                        CustomNetTables:SetTableValue(
                            "request_" .. tostring(data.PlayerID),
                            (queueIndex .. "_____") .. tostring(nowStep),
                            {
                                result = string.sub(json_str, iStart, iEnd),
                                maxStep = maxStep,
                                nowStep = nowStep
                            }
                        )
                        nowStep = nowStep + 1
                    end
                end
            end,
            traceback
        )
        assert(a, b)
    end)()
end
function MRequest.prototype.RegisterClientEvent(self, sEvent, func, context)
    self.tEvents[sEvent] = {callback = func, context = context}
end
function MRequest.prototype.FireClientEvent(self, sEvent, iPlayerID, data)
    self:OnClientEvent({
        game_event_listener = -1,
        game_event_name = "",
        splitscreenplayer = GetLocalPlayerID(),
        event = sEvent,
        data = json.encode(data),
        _IsFire = true
    })
end
function MRequest.prototype.OnClientEvent(self, eventData)
    local eventTable = self.tEvents[eventData.event]
    if eventTable == nil then
        return
    end
    local data = json.decode(eventData.data)
    if data == nil then
        return
    end
    local result
    local func = eventTable.callback
    if eventTable.context ~= nil then
        result = func(eventTable.context, data)
    else
        result = func(data)
    end
    if eventData._IsFire ~= true and type(result) == "table" then
        local json_str = json.encode(result)
        _G.ClientRequestEventResult = json_str
    end
end
MRequest = __TS__DecorateLegacy({reloadable}, MRequest)
if Request == nil then
    Request = __TS__New(MRequest)
end
return ____exports
