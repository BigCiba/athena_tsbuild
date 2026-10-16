local __TSTL_FILE_PATH__ = "framework/event"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 182,["14"] = 182,["15"] = 183,["17"] = 183,["18"] = 184,["19"] = 185,["20"] = 182,["21"] = 187,["22"] = 188,["23"] = 187,["24"] = 191,["25"] = 192,["27"] = 194,["29"] = 191,["30"] = 197,["31"] = 197,["32"] = 205,["33"] = 206,["34"] = 207,["36"] = 208,["37"] = 208,["38"] = 209,["39"] = 210,["41"] = 210,["43"] = 210,["44"] = 211,["46"] = 208,["49"] = 216,["50"] = 217,["53"] = 205,["54"] = 226,["55"] = 233,["56"] = 233,["57"] = 233,["59"] = 235,["60"] = 235,["61"] = 235,["62"] = 235,["63"] = 236,["64"] = 243,["65"] = 243,["66"] = 244,["67"] = 226,["68"] = 251,["69"] = 257,["70"] = 259,["71"] = 264,["72"] = 265,["73"] = 265,["75"] = 266,["76"] = 267,["77"] = 268,["78"] = 268,["80"] = 270,["81"] = 274,["83"] = 276,["84"] = 267,["85"] = 278,["86"] = 264,["88"] = 283,["89"] = 251,["90"] = 290,["91"] = 293,["92"] = 293,["94"] = 296,["95"] = 296,["96"] = 296,["98"] = 298,["99"] = 298,["100"] = 298,["101"] = 298,["102"] = 299,["103"] = 306,["104"] = 309,["106"] = 310,["107"] = 310,["108"] = 311,["109"] = 312,["110"] = 313,["113"] = 310,["116"] = 318,["117"] = 319,["118"] = 290,["119"] = 325,["120"] = 327,["122"] = 328,["123"] = 328,["124"] = 329,["125"] = 330,["126"] = 333,["127"] = 334,["129"] = 337,["131"] = 328,["135"] = 342,["136"] = 325,["137"] = 348,["138"] = 349,["139"] = 351,["141"] = 352,["142"] = 352,["143"] = 353,["144"] = 354,["145"] = 355,["147"] = 352,["150"] = 359,["151"] = 360,["154"] = 364,["155"] = 348,["156"] = 370,["157"] = 371,["158"] = 372,["159"] = 372,["161"] = 374,["162"] = 375,["163"] = 376,["164"] = 370,["165"] = 382,["166"] = 383,["167"] = 384,["168"] = 382,["169"] = 390,["170"] = 391,["171"] = 392,["172"] = 392,["174"] = 396,["175"] = 397,["176"] = 398,["178"] = 400,["179"] = 390,["180"] = 406,["181"] = 410,["182"] = 411,["185"] = 416,["187"] = 418,["188"] = 418,["190"] = 419,["191"] = 422,["192"] = 423,["193"] = 424,["195"] = 426,["196"] = 427,["198"] = 431,["199"] = 438,["200"] = 439,["201"] = 439,["203"] = 440,["204"] = 445,["208"] = 418,["211"] = 450,["212"] = 451,["214"] = 454,["215"] = 406,["216"] = 460,["217"] = 465,["218"] = 467,["219"] = 468,["220"] = 469,["221"] = 467,["222"] = 472,["223"] = 473,["224"] = 460,["225"] = 482,["226"] = 487,["227"] = 488,["228"] = 489,["229"] = 489,["230"] = 489,["231"] = 489,["232"] = 489,["233"] = 489,["234"] = 489,["235"] = 489,["237"] = 482,["238"] = 500,["239"] = 506,["240"] = 507,["241"] = 508,["243"] = 506,["244"] = 512,["245"] = 500,["246"] = 518,["247"] = 519,["250"] = 521,["251"] = 522,["252"] = 523,["253"] = 524,["254"] = 525,["255"] = 527,["256"] = 528,["257"] = 530,["258"] = 531,["260"] = 531,["264"] = 531,["266"] = 531,["267"] = 531,["268"] = 532,["270"] = 532,["272"] = 532,["274"] = 531,["275"] = 533,["276"] = 535,["278"] = 537,["280"] = 540,["281"] = 518,["282"] = 546,["283"] = 547,["284"] = 548,["285"] = 550,["286"] = 551,["287"] = 552,["289"] = 555,["290"] = 546,["291"] = 182,["292"] = 565,["293"] = 565});
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
