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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["14"] = 1,["15"] = 1,["16"] = 215,["17"] = 215,["18"] = 216,["20"] = 216,["21"] = 217,["22"] = 218,["23"] = 215,["24"] = 220,["25"] = 221,["26"] = 220,["27"] = 224,["28"] = 225,["30"] = 227,["32"] = 224,["33"] = 230,["34"] = 230,["35"] = 238,["36"] = 239,["37"] = 240,["39"] = 241,["40"] = 241,["41"] = 242,["42"] = 243,["44"] = 243,["46"] = 243,["47"] = 244,["48"] = 245,["50"] = 241,["53"] = 250,["54"] = 251,["57"] = 238,["58"] = 260,["59"] = 267,["60"] = 267,["61"] = 267,["63"] = 269,["64"] = 269,["65"] = 269,["66"] = 269,["67"] = 270,["68"] = 277,["69"] = 277,["70"] = 278,["71"] = 260,["72"] = 282,["73"] = 285,["74"] = 286,["75"] = 286,["76"] = 286,["77"] = 286,["78"] = 287,["79"] = 287,["80"] = 288,["81"] = 282,["82"] = 292,["83"] = 293,["84"] = 294,["85"] = 295,["86"] = 296,["87"] = 297,["88"] = 297,["89"] = 297,["90"] = 297,["91"] = 297,["92"] = 297,["93"] = 297,["94"] = 297,["98"] = 300,["99"] = 292,["100"] = 307,["101"] = 313,["102"] = 315,["103"] = 320,["104"] = 321,["105"] = 321,["107"] = 322,["108"] = 323,["109"] = 324,["110"] = 324,["112"] = 326,["113"] = 330,["115"] = 332,["116"] = 323,["117"] = 334,["118"] = 320,["120"] = 339,["121"] = 307,["122"] = 346,["123"] = 349,["124"] = 349,["126"] = 352,["127"] = 352,["128"] = 352,["130"] = 354,["131"] = 354,["132"] = 354,["133"] = 354,["134"] = 355,["135"] = 362,["136"] = 365,["138"] = 366,["139"] = 366,["140"] = 367,["141"] = 368,["142"] = 369,["145"] = 366,["148"] = 374,["149"] = 375,["150"] = 346,["151"] = 381,["152"] = 383,["154"] = 384,["155"] = 384,["156"] = 385,["157"] = 386,["158"] = 387,["159"] = 390,["160"] = 391,["162"] = 394,["164"] = 384,["168"] = 399,["169"] = 381,["170"] = 405,["171"] = 406,["172"] = 408,["174"] = 409,["175"] = 409,["176"] = 410,["177"] = 411,["178"] = 412,["179"] = 413,["181"] = 409,["184"] = 417,["185"] = 418,["188"] = 422,["189"] = 405,["190"] = 428,["191"] = 429,["192"] = 430,["193"] = 430,["195"] = 432,["196"] = 433,["197"] = 433,["199"] = 434,["200"] = 435,["201"] = 428,["202"] = 441,["203"] = 442,["204"] = 443,["205"] = 441,["206"] = 449,["207"] = 450,["208"] = 451,["209"] = 451,["211"] = 455,["212"] = 456,["213"] = 457,["215"] = 459,["216"] = 449,["217"] = 465,["218"] = 470,["219"] = 471,["222"] = 477,["223"] = 477,["224"] = 477,["225"] = 478,["226"] = 478,["227"] = 478,["228"] = 479,["229"] = 480,["230"] = 480,["232"] = 481,["233"] = 482,["234"] = 482,["236"] = 483,["237"] = 478,["238"] = 478,["239"] = 485,["240"] = 487,["242"] = 488,["243"] = 488,["245"] = 489,["246"] = 490,["247"] = 490,["249"] = 491,["250"] = 491,["253"] = 495,["254"] = 496,["255"] = 497,["258"] = 498,["259"] = 495,["260"] = 495,["261"] = 495,["262"] = 502,["263"] = 503,["264"] = 503,["266"] = 504,["267"] = 509,["272"] = 513,["273"] = 465,["274"] = 517,["275"] = 518,["276"] = 517,["277"] = 524,["278"] = 529,["279"] = 531,["280"] = 532,["281"] = 533,["282"] = 531,["283"] = 536,["284"] = 537,["285"] = 524,["286"] = 546,["287"] = 551,["288"] = 552,["289"] = 553,["290"] = 553,["291"] = 553,["292"] = 553,["293"] = 553,["294"] = 553,["295"] = 553,["296"] = 553,["298"] = 546,["299"] = 564,["300"] = 570,["301"] = 571,["302"] = 572,["304"] = 570,["305"] = 576,["306"] = 564,["307"] = 582,["308"] = 583,["311"] = 585,["312"] = 586,["313"] = 587,["314"] = 588,["315"] = 589,["316"] = 591,["317"] = 592,["318"] = 594,["319"] = 595,["321"] = 595,["325"] = 595,["327"] = 595,["328"] = 595,["329"] = 596,["331"] = 596,["333"] = 596,["335"] = 595,["336"] = 597,["337"] = 599,["339"] = 601,["341"] = 604,["342"] = 582,["343"] = 610,["344"] = 611,["345"] = 612,["346"] = 614,["347"] = 615,["348"] = 616,["350"] = 619,["351"] = 610,["352"] = 215,["353"] = 629,["354"] = 629});
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
