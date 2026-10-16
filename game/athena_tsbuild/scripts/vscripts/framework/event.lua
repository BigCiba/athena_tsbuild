local __TSTL_FILE_PATH__ = "framework/event"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 184,["14"] = 184,["15"] = 185,["17"] = 185,["18"] = 186,["19"] = 187,["20"] = 184,["21"] = 189,["22"] = 190,["23"] = 189,["24"] = 193,["25"] = 194,["27"] = 196,["29"] = 193,["30"] = 199,["31"] = 199,["32"] = 207,["33"] = 208,["34"] = 209,["36"] = 210,["37"] = 210,["38"] = 211,["39"] = 212,["41"] = 212,["43"] = 212,["44"] = 213,["46"] = 210,["49"] = 218,["50"] = 219,["53"] = 207,["54"] = 228,["55"] = 235,["56"] = 235,["57"] = 235,["59"] = 237,["60"] = 237,["61"] = 237,["62"] = 237,["63"] = 238,["64"] = 245,["65"] = 245,["66"] = 246,["67"] = 228,["68"] = 253,["69"] = 259,["70"] = 261,["71"] = 266,["72"] = 267,["73"] = 267,["75"] = 268,["76"] = 269,["77"] = 270,["78"] = 270,["80"] = 272,["81"] = 276,["83"] = 278,["84"] = 269,["85"] = 280,["86"] = 266,["88"] = 285,["89"] = 253,["90"] = 292,["91"] = 295,["92"] = 295,["94"] = 298,["95"] = 298,["96"] = 298,["98"] = 300,["99"] = 300,["100"] = 300,["101"] = 300,["102"] = 301,["103"] = 308,["104"] = 311,["106"] = 312,["107"] = 312,["108"] = 313,["109"] = 314,["110"] = 315,["113"] = 312,["116"] = 320,["117"] = 321,["118"] = 292,["119"] = 327,["120"] = 329,["122"] = 330,["123"] = 330,["124"] = 331,["125"] = 332,["126"] = 335,["127"] = 336,["129"] = 339,["131"] = 330,["135"] = 344,["136"] = 327,["137"] = 350,["138"] = 351,["139"] = 353,["141"] = 354,["142"] = 354,["143"] = 355,["144"] = 356,["145"] = 357,["147"] = 354,["150"] = 361,["151"] = 362,["154"] = 366,["155"] = 350,["156"] = 372,["157"] = 373,["158"] = 374,["159"] = 374,["161"] = 376,["162"] = 377,["163"] = 378,["164"] = 372,["165"] = 384,["166"] = 385,["167"] = 386,["168"] = 384,["169"] = 392,["170"] = 393,["171"] = 394,["172"] = 394,["174"] = 398,["175"] = 399,["176"] = 400,["178"] = 402,["179"] = 392,["180"] = 408,["181"] = 412,["182"] = 413,["185"] = 418,["187"] = 420,["188"] = 420,["190"] = 421,["191"] = 424,["192"] = 425,["193"] = 426,["195"] = 428,["196"] = 429,["198"] = 433,["199"] = 440,["200"] = 441,["201"] = 441,["203"] = 442,["204"] = 447,["208"] = 420,["211"] = 452,["212"] = 453,["214"] = 456,["215"] = 408,["216"] = 462,["217"] = 467,["218"] = 469,["219"] = 470,["220"] = 471,["221"] = 469,["222"] = 474,["223"] = 475,["224"] = 462,["225"] = 484,["226"] = 489,["227"] = 490,["228"] = 491,["229"] = 491,["230"] = 491,["231"] = 491,["232"] = 491,["233"] = 491,["234"] = 491,["235"] = 491,["237"] = 484,["238"] = 502,["239"] = 508,["240"] = 509,["241"] = 510,["243"] = 508,["244"] = 514,["245"] = 502,["246"] = 520,["247"] = 521,["250"] = 523,["251"] = 524,["252"] = 525,["253"] = 526,["254"] = 527,["255"] = 529,["256"] = 530,["257"] = 532,["258"] = 533,["260"] = 533,["264"] = 533,["266"] = 533,["267"] = 533,["268"] = 534,["270"] = 534,["272"] = 534,["274"] = 533,["275"] = 535,["276"] = 537,["278"] = 539,["280"] = 542,["281"] = 520,["282"] = 548,["283"] = 549,["284"] = 550,["285"] = 552,["286"] = 553,["287"] = 554,["289"] = 557,["290"] = 548,["291"] = 184,["292"] = 567,["293"] = 567});
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
