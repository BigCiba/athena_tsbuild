local __TSTL_FILE_PATH__ = "framework/event"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["14"] = 1,["15"] = 1,["16"] = 210,["17"] = 210,["18"] = 211,["20"] = 211,["21"] = 212,["22"] = 213,["23"] = 210,["24"] = 215,["25"] = 216,["26"] = 215,["27"] = 219,["28"] = 220,["30"] = 222,["32"] = 219,["33"] = 225,["34"] = 225,["35"] = 233,["36"] = 234,["37"] = 235,["39"] = 236,["40"] = 236,["41"] = 237,["42"] = 238,["44"] = 238,["46"] = 238,["47"] = 239,["48"] = 240,["50"] = 236,["53"] = 245,["54"] = 246,["57"] = 233,["58"] = 255,["59"] = 262,["60"] = 262,["61"] = 262,["63"] = 264,["64"] = 264,["65"] = 264,["66"] = 264,["67"] = 265,["68"] = 272,["69"] = 272,["70"] = 273,["71"] = 255,["72"] = 277,["73"] = 280,["74"] = 281,["75"] = 281,["76"] = 281,["77"] = 281,["78"] = 282,["79"] = 282,["80"] = 283,["81"] = 277,["82"] = 287,["83"] = 288,["84"] = 289,["85"] = 290,["86"] = 291,["87"] = 292,["88"] = 292,["89"] = 292,["90"] = 292,["91"] = 292,["92"] = 292,["93"] = 292,["94"] = 292,["98"] = 295,["99"] = 287,["100"] = 302,["101"] = 308,["102"] = 310,["103"] = 315,["104"] = 316,["105"] = 316,["107"] = 317,["108"] = 318,["109"] = 319,["110"] = 319,["112"] = 321,["113"] = 325,["115"] = 327,["116"] = 318,["117"] = 329,["118"] = 315,["120"] = 334,["121"] = 302,["122"] = 341,["123"] = 344,["124"] = 344,["126"] = 347,["127"] = 347,["128"] = 347,["130"] = 349,["131"] = 349,["132"] = 349,["133"] = 349,["134"] = 350,["135"] = 357,["136"] = 360,["138"] = 361,["139"] = 361,["140"] = 362,["141"] = 363,["142"] = 364,["145"] = 361,["148"] = 369,["149"] = 370,["150"] = 341,["151"] = 376,["152"] = 378,["154"] = 379,["155"] = 379,["156"] = 380,["157"] = 381,["158"] = 382,["159"] = 385,["160"] = 386,["162"] = 389,["164"] = 379,["168"] = 394,["169"] = 376,["170"] = 400,["171"] = 401,["172"] = 403,["174"] = 404,["175"] = 404,["176"] = 405,["177"] = 406,["178"] = 407,["179"] = 408,["181"] = 404,["184"] = 412,["185"] = 413,["188"] = 417,["189"] = 400,["190"] = 423,["191"] = 424,["192"] = 425,["193"] = 425,["195"] = 427,["196"] = 428,["197"] = 428,["199"] = 429,["200"] = 430,["201"] = 423,["202"] = 436,["203"] = 437,["204"] = 438,["205"] = 436,["206"] = 444,["207"] = 445,["208"] = 446,["209"] = 446,["211"] = 450,["212"] = 451,["213"] = 452,["215"] = 454,["216"] = 444,["217"] = 460,["218"] = 465,["219"] = 466,["222"] = 472,["223"] = 472,["224"] = 472,["225"] = 473,["226"] = 473,["227"] = 473,["228"] = 474,["229"] = 475,["230"] = 475,["232"] = 476,["233"] = 477,["234"] = 477,["236"] = 478,["237"] = 473,["238"] = 473,["239"] = 480,["240"] = 482,["242"] = 483,["243"] = 483,["245"] = 484,["246"] = 485,["247"] = 485,["249"] = 486,["250"] = 486,["253"] = 490,["254"] = 491,["255"] = 492,["258"] = 493,["259"] = 490,["260"] = 490,["261"] = 490,["262"] = 497,["263"] = 498,["264"] = 498,["266"] = 499,["267"] = 504,["272"] = 508,["273"] = 460,["274"] = 512,["275"] = 513,["276"] = 512,["277"] = 519,["278"] = 524,["279"] = 526,["280"] = 527,["281"] = 528,["282"] = 526,["283"] = 531,["284"] = 532,["285"] = 519,["286"] = 541,["287"] = 546,["288"] = 547,["289"] = 548,["290"] = 548,["291"] = 548,["292"] = 548,["293"] = 548,["294"] = 548,["295"] = 548,["296"] = 548,["298"] = 541,["299"] = 559,["300"] = 565,["301"] = 566,["302"] = 567,["304"] = 565,["305"] = 571,["306"] = 559,["307"] = 577,["308"] = 578,["311"] = 580,["312"] = 581,["313"] = 582,["314"] = 583,["315"] = 584,["316"] = 586,["317"] = 587,["318"] = 589,["319"] = 590,["321"] = 590,["325"] = 590,["327"] = 590,["328"] = 590,["329"] = 591,["331"] = 591,["333"] = 591,["335"] = 590,["336"] = 592,["337"] = 594,["339"] = 596,["341"] = 599,["342"] = 577,["343"] = 605,["344"] = 606,["345"] = 607,["346"] = 609,["347"] = 610,["348"] = 611,["350"] = 614,["351"] = 605,["352"] = 210,["353"] = 624,["354"] = 624});
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
                    listener.removed = true
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
function MEvent.prototype.RegisterUnit(self, eventType, callback, role, unit, context)
    local eventID = self:Register(eventType, callback, context)
    local listener = __TS__ArrayFind(
        self.eventIdMap[eventType],
        function(____, entry) return entry.eventID == eventID end
    )
    listener.unitRole = role
    listener.unit = unit
    return eventID
end
function MEvent.prototype.RegisterUnitListeners(self, listeners, owner, context)
    local ids = {}
    for eventType, roles in pairs(listeners) do
        for ____, role in ipairs({"source", "target", "global"}) do
            local callback = roles[role]
            if callback then
                ids[#ids + 1] = self:RegisterUnit(
                    eventType,
                    callback,
                    role,
                    owner,
                    context
                )
            end
        end
    end
    return ids
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
                    listeners[i + 1].removed = true
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
                    listeners[i + 1].removed = true
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
    for ____, listener in ipairs(listeners) do
        listener.removed = true
    end
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
function MEvent.prototype.Fire(self, eventType, data, route)
    local listeners = self.eventIdMap[eventType]
    if not listeners or #listeners == 0 then
        return
    end
    local function group(____, listener)
        return listener.unitRole == "source" and 0 or (listener.unitRole == "target" and 1 or 2)
    end
    local snapshot = __TS__ArraySort(
        __TS__ArraySlice(listeners),
        function(____, a, b)
            local groupOrder = group(nil, a) - group(nil, b)
            if groupOrder ~= 0 then
                return groupOrder
            end
            local priorityOrder = (b.priority or 100) - (a.priority or 100)
            if priorityOrder ~= 0 then
                return priorityOrder
            end
            return b.eventID - a.eventID
        end
    )
    local errors
    for ____, listener in ipairs(snapshot) do
        do
            if listener.removed or not listener.callback then
                goto __continue58
            end
            if listener.unitRole then
                if not route then
                    goto __continue58
                end
                if listener.unitRole ~= "global" and (not IsValid(listener.unit) or listener.unit ~= route[listener.unitRole]) then
                    goto __continue58
                end
            end
            local success, errorMsg = xpcall(
                function()
                    if listener.filter and not listener:filter(data) then
                        return
                    end
                    listener.callback(listener.context, data)
                end,
                traceback
            )
            if not success then
                if errors == nil then
                    errors = {}
                end
                errors[#errors + 1] = {eventID = listener.eventID, error = errorMsg}
                print((((("Event listener error:\nType: " .. eventType) .. "\nID: ") .. tostring(listener.eventID)) .. "\nError: ") .. tostring(errorMsg))
            end
        end
        ::__continue58::
    end
    return errors
end
function MEvent.prototype.FireUnit(self, eventType, data, source, target)
    return self:Fire(eventType, data, {source = source, target = target})
end
function MEvent.prototype.Once(self, eventType, callback, context)
    local eventID
    local function wrappedCallback(____, data)
        self:Unregister(eventID)
        callback(context, data)
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
