local __TSTL_FILE_PATH__ = "framework/event"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 166,["14"] = 166,["15"] = 167,["17"] = 167,["18"] = 168,["19"] = 169,["20"] = 166,["21"] = 171,["22"] = 172,["23"] = 171,["24"] = 175,["25"] = 176,["27"] = 178,["29"] = 175,["30"] = 181,["31"] = 181,["32"] = 189,["33"] = 190,["34"] = 191,["36"] = 192,["37"] = 192,["38"] = 193,["39"] = 194,["41"] = 194,["43"] = 194,["44"] = 195,["46"] = 192,["49"] = 200,["50"] = 201,["53"] = 189,["54"] = 210,["55"] = 217,["56"] = 217,["57"] = 217,["59"] = 219,["60"] = 219,["61"] = 219,["62"] = 219,["63"] = 220,["64"] = 227,["65"] = 227,["66"] = 228,["67"] = 210,["68"] = 235,["69"] = 241,["70"] = 243,["71"] = 248,["72"] = 249,["73"] = 249,["75"] = 250,["76"] = 251,["77"] = 252,["78"] = 252,["80"] = 254,["81"] = 258,["83"] = 260,["84"] = 251,["85"] = 262,["86"] = 248,["88"] = 267,["89"] = 235,["90"] = 274,["91"] = 277,["92"] = 277,["94"] = 280,["95"] = 280,["96"] = 280,["98"] = 282,["99"] = 282,["100"] = 282,["101"] = 282,["102"] = 283,["103"] = 290,["104"] = 293,["106"] = 294,["107"] = 294,["108"] = 295,["109"] = 296,["110"] = 297,["113"] = 294,["116"] = 302,["117"] = 303,["118"] = 274,["119"] = 309,["120"] = 311,["122"] = 312,["123"] = 312,["124"] = 313,["125"] = 314,["126"] = 317,["127"] = 318,["129"] = 321,["131"] = 312,["135"] = 326,["136"] = 309,["137"] = 332,["138"] = 333,["139"] = 335,["141"] = 336,["142"] = 336,["143"] = 337,["144"] = 338,["145"] = 339,["147"] = 336,["150"] = 343,["151"] = 344,["154"] = 348,["155"] = 332,["156"] = 354,["157"] = 355,["158"] = 356,["159"] = 356,["161"] = 358,["162"] = 359,["163"] = 360,["164"] = 354,["165"] = 366,["166"] = 367,["167"] = 368,["168"] = 366,["169"] = 374,["170"] = 375,["171"] = 376,["172"] = 376,["174"] = 380,["175"] = 381,["176"] = 382,["178"] = 384,["179"] = 374,["180"] = 390,["181"] = 394,["182"] = 395,["185"] = 400,["187"] = 402,["188"] = 402,["190"] = 403,["191"] = 406,["192"] = 407,["193"] = 408,["195"] = 410,["196"] = 411,["198"] = 415,["199"] = 422,["200"] = 423,["201"] = 423,["203"] = 424,["204"] = 429,["208"] = 402,["211"] = 434,["212"] = 435,["214"] = 438,["215"] = 390,["216"] = 444,["217"] = 449,["218"] = 451,["219"] = 452,["220"] = 453,["221"] = 451,["222"] = 456,["223"] = 457,["224"] = 444,["225"] = 466,["226"] = 471,["227"] = 472,["228"] = 473,["229"] = 473,["230"] = 473,["231"] = 473,["232"] = 473,["233"] = 473,["234"] = 473,["235"] = 473,["237"] = 466,["238"] = 484,["239"] = 490,["240"] = 491,["241"] = 492,["243"] = 490,["244"] = 496,["245"] = 484,["246"] = 502,["247"] = 503,["250"] = 505,["251"] = 506,["252"] = 507,["253"] = 508,["254"] = 509,["255"] = 511,["256"] = 512,["257"] = 514,["258"] = 515,["260"] = 515,["264"] = 515,["266"] = 515,["267"] = 515,["268"] = 516,["270"] = 516,["272"] = 516,["274"] = 515,["275"] = 517,["276"] = 519,["278"] = 521,["280"] = 524,["281"] = 502,["282"] = 530,["283"] = 531,["284"] = 532,["285"] = 534,["286"] = 535,["287"] = 536,["289"] = 539,["290"] = 530,["291"] = 166,["292"] = 549,["293"] = 549});
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
