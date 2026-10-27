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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["14"] = 1,["15"] = 1,["16"] = 217,["17"] = 217,["18"] = 218,["20"] = 218,["21"] = 219,["22"] = 220,["23"] = 217,["24"] = 222,["25"] = 223,["26"] = 222,["27"] = 226,["28"] = 227,["30"] = 229,["32"] = 226,["33"] = 232,["34"] = 232,["35"] = 240,["36"] = 241,["37"] = 242,["39"] = 243,["40"] = 243,["41"] = 244,["42"] = 245,["44"] = 245,["46"] = 245,["47"] = 246,["48"] = 247,["50"] = 243,["53"] = 252,["54"] = 253,["57"] = 240,["58"] = 262,["59"] = 269,["60"] = 269,["61"] = 269,["63"] = 271,["64"] = 271,["65"] = 271,["66"] = 271,["67"] = 272,["68"] = 279,["69"] = 279,["70"] = 280,["71"] = 262,["72"] = 284,["73"] = 287,["74"] = 288,["75"] = 288,["76"] = 288,["77"] = 288,["78"] = 289,["79"] = 289,["80"] = 290,["81"] = 284,["82"] = 294,["83"] = 295,["84"] = 296,["85"] = 297,["86"] = 298,["87"] = 299,["88"] = 299,["89"] = 299,["90"] = 299,["91"] = 299,["92"] = 299,["93"] = 299,["94"] = 299,["98"] = 302,["99"] = 294,["100"] = 309,["101"] = 315,["102"] = 317,["103"] = 322,["104"] = 323,["105"] = 323,["107"] = 324,["108"] = 325,["109"] = 326,["110"] = 326,["112"] = 328,["113"] = 332,["115"] = 334,["116"] = 325,["117"] = 336,["118"] = 322,["120"] = 341,["121"] = 309,["122"] = 348,["123"] = 351,["124"] = 351,["126"] = 354,["127"] = 354,["128"] = 354,["130"] = 356,["131"] = 356,["132"] = 356,["133"] = 356,["134"] = 357,["135"] = 364,["136"] = 367,["138"] = 368,["139"] = 368,["140"] = 369,["141"] = 370,["142"] = 371,["145"] = 368,["148"] = 376,["149"] = 377,["150"] = 348,["151"] = 383,["152"] = 385,["154"] = 386,["155"] = 386,["156"] = 387,["157"] = 388,["158"] = 389,["159"] = 392,["160"] = 393,["162"] = 396,["164"] = 386,["168"] = 401,["169"] = 383,["170"] = 407,["171"] = 408,["172"] = 410,["174"] = 411,["175"] = 411,["176"] = 412,["177"] = 413,["178"] = 414,["179"] = 415,["181"] = 411,["184"] = 419,["185"] = 420,["188"] = 424,["189"] = 407,["190"] = 430,["191"] = 431,["192"] = 432,["193"] = 432,["195"] = 434,["196"] = 435,["197"] = 435,["199"] = 436,["200"] = 437,["201"] = 430,["202"] = 443,["203"] = 444,["204"] = 445,["205"] = 443,["206"] = 451,["207"] = 452,["208"] = 453,["209"] = 453,["211"] = 457,["212"] = 458,["213"] = 459,["215"] = 461,["216"] = 451,["217"] = 467,["218"] = 472,["219"] = 473,["222"] = 479,["223"] = 479,["224"] = 479,["225"] = 480,["226"] = 480,["227"] = 480,["228"] = 481,["229"] = 482,["230"] = 482,["232"] = 483,["233"] = 484,["234"] = 484,["236"] = 485,["237"] = 480,["238"] = 480,["239"] = 487,["240"] = 489,["242"] = 490,["243"] = 490,["245"] = 491,["246"] = 492,["247"] = 492,["249"] = 493,["250"] = 493,["253"] = 497,["254"] = 498,["255"] = 499,["258"] = 500,["259"] = 497,["260"] = 497,["261"] = 497,["262"] = 504,["263"] = 505,["264"] = 505,["266"] = 506,["267"] = 511,["272"] = 515,["273"] = 467,["274"] = 519,["275"] = 520,["276"] = 519,["277"] = 526,["278"] = 531,["279"] = 533,["280"] = 534,["281"] = 535,["282"] = 533,["283"] = 538,["284"] = 539,["285"] = 526,["286"] = 548,["287"] = 553,["288"] = 554,["289"] = 555,["290"] = 555,["291"] = 555,["292"] = 555,["293"] = 555,["294"] = 555,["295"] = 555,["296"] = 555,["298"] = 548,["299"] = 566,["300"] = 572,["301"] = 573,["302"] = 574,["304"] = 572,["305"] = 578,["306"] = 566,["307"] = 584,["308"] = 585,["311"] = 587,["312"] = 588,["313"] = 589,["314"] = 590,["315"] = 591,["316"] = 593,["317"] = 594,["318"] = 596,["319"] = 597,["321"] = 597,["325"] = 597,["327"] = 597,["328"] = 597,["329"] = 598,["331"] = 598,["333"] = 598,["335"] = 597,["336"] = 599,["337"] = 601,["339"] = 603,["341"] = 606,["342"] = 584,["343"] = 612,["344"] = 613,["345"] = 614,["346"] = 616,["347"] = 617,["348"] = 618,["350"] = 621,["351"] = 612,["352"] = 217,["353"] = 631,["354"] = 631});
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
