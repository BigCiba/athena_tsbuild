local __TSTL_FILE_PATH__ = "framework/event"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 164,["14"] = 164,["15"] = 165,["17"] = 165,["18"] = 166,["19"] = 167,["20"] = 164,["21"] = 169,["22"] = 170,["23"] = 169,["24"] = 173,["25"] = 174,["27"] = 176,["29"] = 173,["30"] = 179,["31"] = 179,["32"] = 187,["33"] = 188,["34"] = 189,["36"] = 190,["37"] = 190,["38"] = 191,["39"] = 192,["41"] = 192,["43"] = 192,["44"] = 193,["46"] = 190,["49"] = 198,["50"] = 199,["53"] = 187,["54"] = 208,["55"] = 215,["56"] = 215,["57"] = 215,["59"] = 217,["60"] = 217,["61"] = 217,["62"] = 217,["63"] = 218,["64"] = 225,["65"] = 225,["66"] = 226,["67"] = 208,["68"] = 233,["69"] = 239,["70"] = 241,["71"] = 246,["72"] = 247,["73"] = 247,["75"] = 248,["76"] = 249,["77"] = 250,["78"] = 250,["80"] = 252,["81"] = 256,["83"] = 258,["84"] = 249,["85"] = 260,["86"] = 246,["88"] = 265,["89"] = 233,["90"] = 272,["91"] = 275,["92"] = 275,["94"] = 278,["95"] = 278,["96"] = 278,["98"] = 280,["99"] = 280,["100"] = 280,["101"] = 280,["102"] = 281,["103"] = 288,["104"] = 291,["106"] = 292,["107"] = 292,["108"] = 293,["109"] = 294,["110"] = 295,["113"] = 292,["116"] = 300,["117"] = 301,["118"] = 272,["119"] = 307,["120"] = 309,["122"] = 310,["123"] = 310,["124"] = 311,["125"] = 312,["126"] = 315,["127"] = 316,["129"] = 319,["131"] = 310,["135"] = 324,["136"] = 307,["137"] = 330,["138"] = 331,["139"] = 333,["141"] = 334,["142"] = 334,["143"] = 335,["144"] = 336,["145"] = 337,["147"] = 334,["150"] = 341,["151"] = 342,["154"] = 346,["155"] = 330,["156"] = 352,["157"] = 353,["158"] = 354,["159"] = 354,["161"] = 356,["162"] = 357,["163"] = 358,["164"] = 352,["165"] = 364,["166"] = 365,["167"] = 366,["168"] = 364,["169"] = 372,["170"] = 373,["171"] = 374,["172"] = 374,["174"] = 378,["175"] = 379,["176"] = 380,["178"] = 382,["179"] = 372,["180"] = 388,["181"] = 392,["182"] = 393,["185"] = 398,["187"] = 400,["188"] = 400,["190"] = 401,["191"] = 404,["192"] = 405,["193"] = 406,["195"] = 408,["196"] = 409,["198"] = 413,["199"] = 420,["200"] = 421,["201"] = 421,["203"] = 422,["204"] = 427,["208"] = 400,["211"] = 432,["212"] = 433,["214"] = 436,["215"] = 388,["216"] = 442,["217"] = 447,["218"] = 449,["219"] = 450,["220"] = 451,["221"] = 449,["222"] = 454,["223"] = 455,["224"] = 442,["225"] = 464,["226"] = 469,["227"] = 470,["228"] = 471,["229"] = 471,["230"] = 471,["231"] = 471,["232"] = 471,["233"] = 471,["234"] = 471,["235"] = 471,["237"] = 464,["238"] = 482,["239"] = 488,["240"] = 489,["241"] = 490,["243"] = 488,["244"] = 494,["245"] = 482,["246"] = 500,["247"] = 501,["250"] = 503,["251"] = 504,["252"] = 505,["253"] = 506,["254"] = 507,["255"] = 509,["256"] = 510,["257"] = 512,["258"] = 513,["260"] = 513,["264"] = 513,["266"] = 513,["267"] = 513,["268"] = 514,["270"] = 514,["272"] = 514,["274"] = 513,["275"] = 515,["276"] = 517,["278"] = 519,["280"] = 522,["281"] = 500,["282"] = 528,["283"] = 529,["284"] = 530,["285"] = 532,["286"] = 533,["287"] = 534,["289"] = 537,["290"] = 528,["291"] = 164,["292"] = 547,["293"] = 547});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MEvent = __TS__Class()
MEvent.name = "MEvent"
__TS__ClassExtends(MEvent, CModule)
function MEvent.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.eventId = 1
    self.eventIdMap = {}
end
function MEvent.prototype.initPriority(self)
    return 9
end
function MEvent.prototype.init(self, reload)
    if not reload then
    else
        self:cleanupModuleListeners()
    end
end
function MEvent.prototype.reset(self)
end
function MEvent.prototype.cleanupModuleListeners(self)
    self:print("cleanupModuleListeners")
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                local listener = listeners[i + 1]
                local ____opt_0 = listener.context
                if ____opt_0 ~= nil then
                    ____opt_0 = ____opt_0.isModule
                end
                if ____opt_0 == true then
                    table.remove(listeners, i + 1)
                end
                i = i - 1
            end
        end
        if #listeners == 0 then
            __TS__Delete(self.eventIdMap, eventType)
        end
    end
end
function MEvent.prototype.Register(self, eventType, callback, context, filter)
    local ____self_eventIdMap_2, ____eventType_3 = self.eventIdMap, eventType
    if ____self_eventIdMap_2[____eventType_3] == nil then
        ____self_eventIdMap_2[____eventType_3] = {}
    end
    local ____self_4, ____eventId_5 = self, "eventId"
    local ____self_eventId_6 = ____self_4[____eventId_5]
    ____self_4[____eventId_5] = ____self_eventId_6 + 1
    local eventID = ____self_eventId_6
    local listener = {context = context, eventID = eventID, callback = callback, filter = filter}
    local ____self_eventIdMap_eventType_7 = self.eventIdMap[eventType]
    ____self_eventIdMap_eventType_7[#____self_eventIdMap_eventType_7 + 1] = listener
    return eventID
end
function MEvent.prototype.RegisterForOwner(self, eventType, callback, owner, context)
    local filter
    if eventType == "damage_event" or eventType == "crit_event" or eventType == "expose_effect" or eventType == "lightning_strike" then
        filter = function(____, data)
            if not IsValid(owner) then
                return false
            end
            local ownerPlayerID = owner:GetPlayerOwnerID()
            local function belongsToOwner(____, entity)
                if entity == owner then
                    return true
                end
                if ownerPlayerID >= 0 and IsValid(entity) and entity:GetPlayerOwnerID() == ownerPlayerID then
                    return true
                end
                return false
            end
            return belongsToOwner(nil, data.attacker) or belongsToOwner(nil, data.target) or belongsToOwner(nil, data.caster)
        end
    end
    return self:Register(eventType, callback, context, filter)
end
function MEvent.prototype.RegisterWithPriority(self, eventType, callback, priority, context)
    if priority == nil then
        priority = 100
    end
    local ____self_eventIdMap_8, ____eventType_9 = self.eventIdMap, eventType
    if ____self_eventIdMap_8[____eventType_9] == nil then
        ____self_eventIdMap_8[____eventType_9] = {}
    end
    local ____self_10, ____eventId_11 = self, "eventId"
    local ____self_eventId_12 = ____self_10[____eventId_11]
    ____self_10[____eventId_11] = ____self_eventId_12 + 1
    local eventID = ____self_eventId_12
    local listener = {context = context, eventID = eventID, callback = callback, priority = priority}
    local listeners = self.eventIdMap[eventType]
    local insertIndex = #listeners
    do
        local i = 0
        while i < #listeners do
            local currentPriority = listeners[i + 1].priority or 100
            if priority < currentPriority then
                insertIndex = i
                break
            end
            i = i + 1
        end
    end
    table.insert(listeners, insertIndex + 1, listener)
    return eventID
end
function MEvent.prototype.Unregister(self, eventId)
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                if listeners[i + 1].eventID == eventId then
                    table.remove(listeners, i + 1)
                    if #listeners == 0 then
                        __TS__Delete(self.eventIdMap, eventType)
                    end
                    return true
                end
                i = i - 1
            end
        end
    end
    return false
end
function MEvent.prototype.UnregisterContext(self, context)
    local count = 0
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                if listeners[i + 1].context == context then
                    table.remove(listeners, i + 1)
                    count = count + 1
                end
                i = i - 1
            end
        end
        if #listeners == 0 then
            __TS__Delete(self.eventIdMap, eventType)
        end
    end
    return count
end
function MEvent.prototype.UnregisterAll(self, eventType)
    local listeners = self.eventIdMap[eventType]
    if not listeners then
        return 0
    end
    local count = #listeners
    __TS__Delete(self.eventIdMap, eventType)
    return count
end
function MEvent.prototype.HasListeners(self, eventType)
    local listeners = self.eventIdMap[eventType]
    return listeners ~= nil and #listeners > 0
end
function MEvent.prototype.GetListenerCount(self, eventType)
    if eventType ~= nil then
        local ____opt_13 = self.eventIdMap[eventType]
        return ____opt_13 and #____opt_13 or 0
    end
    local total = 0
    for _, listeners in pairs(self.eventIdMap) do
        total = total + #listeners
    end
    return total
end
function MEvent.prototype.Fire(self, eventType, data)
    local listeners = self.eventIdMap[eventType]
    if not listeners or #listeners == 0 then
        return
    end
    local errors
    do
        local i = #listeners - 1
        while i >= 0 do
            do
                local listener = listeners[i + 1]
                if not listener or not listener.callback then
                    table.remove(listeners, i + 1)
                    goto __continue46
                end
                if listener.filter ~= nil and not listener:filter(data) then
                    goto __continue46
                end
                local success, errorMsg = xpcall(listener.callback, traceback, listener.context, data)
                if not success then
                    if errors == nil then
                        errors = {}
                    end
                    errors[#errors + 1] = {eventID = listener.eventID, error = errorMsg}
                    print((((("Event listener error:\nType: " .. eventType) .. "\nID: ") .. tostring(listener.eventID)) .. "\nError: ") .. tostring(errorMsg))
                end
            end
            ::__continue46::
            i = i - 1
        end
    end
    if #listeners == 0 then
        __TS__Delete(self.eventIdMap, eventType)
    end
    return errors
end
function MEvent.prototype.Once(self, eventType, callback, context)
    local eventID
    local function wrappedCallback(____, data)
        callback(context, data)
        self:Unregister(eventID)
    end
    eventID = self:Register(eventType, wrappedCallback, context)
    return eventID
end
function MEvent.prototype.FireClient(self, playerID, eventType, data)
    local player = PlayerResource:GetPlayer(playerID)
    if player ~= nil then
        CustomGameEventManager:Send_ServerToPlayer(
            player,
            "lua_server_to_client",
            {
                event_name = eventType,
                data = json.encode(data)
            }
        )
    end
end
function MEvent.prototype.RegisterFiltered(self, eventType, filter, callback, context)
    local function wrappedCallback(____, data)
        if filter(nil, data) then
            callback(context, data)
        end
    end
    return self:Register(eventType, wrappedCallback, context)
end
function MEvent.prototype.DebugPrint(self)
    if IsDedicatedServer() then
        return
    end
    print("=== Event System Debug ===")
    print("Total event types: " .. tostring(#__TS__ObjectKeys(self.eventIdMap)))
    print("Total listeners: " .. tostring(self:GetListenerCount()))
    print("Next event ID: " .. tostring(self.eventId))
    print("")
    for eventType, listeners in pairs(self.eventIdMap) do
        print(((("[" .. eventType) .. "] (") .. tostring(#listeners)) .. " listeners)")
        for ____, listener in ipairs(listeners) do
            local ____opt_17 = listener.context
            if ____opt_17 ~= nil then
                ____opt_17 = ____opt_17.constructor
            end
            local ____opt_result_19
            if ____opt_17 ~= nil then
                ____opt_result_19 = ____opt_17.name
            end
            local ____opt_result_19_22 = ____opt_result_19
            if ____opt_result_19_22 == nil then
                local ____opt_20 = listener.context
                if ____opt_20 ~= nil then
                    ____opt_20 = ____opt_20.isModule
                end
                ____opt_result_19_22 = ____opt_20 and "Module" or "Global"
            end
            local contextName = ____opt_result_19_22
            local priority = listener.priority or 100
            print((((("  - ID:" .. tostring(listener.eventID)) .. " Priority:") .. tostring(priority)) .. " Context:") .. tostring(contextName))
        end
        print("")
    end
    print("========================")
end
function MEvent.prototype.GetMemoryStats(self)
    local totalListeners = 0
    local totalEventTypes = 0
    for _, listeners in pairs(self.eventIdMap) do
        totalEventTypes = totalEventTypes + 1
        totalListeners = totalListeners + #listeners
    end
    return {eventTypes = totalEventTypes, listeners = totalListeners, avgListenersPerType = totalEventTypes > 0 and totalListeners / totalEventTypes or 0}
end
MEvent = __TS__DecorateLegacy({reloadable}, MEvent)
if Event == nil then
    Event = __TS__New(MEvent)
end
return ____exports
