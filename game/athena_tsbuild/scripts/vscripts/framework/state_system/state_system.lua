local __TSTL_FILE_PATH__ = "framework/state_system/state_system"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 3,["19"] = 3,["20"] = 8,["21"] = 8,["22"] = 9,["24"] = 9,["25"] = 11,["26"] = 12,["27"] = 13,["28"] = 16,["29"] = 8,["30"] = 18,["31"] = 19,["32"] = 20,["33"] = 22,["34"] = 23,["35"] = 24,["36"] = 25,["37"] = 26,["40"] = 30,["42"] = 32,["44"] = 18,["45"] = 36,["46"] = 37,["47"] = 36,["48"] = 40,["49"] = 41,["50"] = 40,["51"] = 46,["52"] = 47,["53"] = 48,["55"] = 46,["56"] = 73,["57"] = 78,["58"] = 78,["60"] = 81,["61"] = 82,["62"] = 83,["63"] = 85,["64"] = 86,["65"] = 87,["67"] = 91,["68"] = 91,["69"] = 91,["70"] = 91,["71"] = 92,["72"] = 94,["73"] = 95,["74"] = 96,["75"] = 97,["76"] = 98,["77"] = 99,["78"] = 100,["79"] = 101,["82"] = 110,["83"] = 111,["84"] = 111,["85"] = 111,["86"] = 111,["87"] = 111,["88"] = 111,["89"] = 111,["90"] = 118,["91"] = 119,["92"] = 120,["93"] = 121,["96"] = 130,["97"] = 132,["98"] = 132,["99"] = 133,["100"] = 73,["101"] = 142,["102"] = 147,["103"] = 148,["105"] = 151,["106"] = 152,["107"] = 152,["109"] = 153,["110"] = 154,["111"] = 155,["112"] = 156,["115"] = 159,["117"] = 142,["118"] = 163,["119"] = 168,["120"] = 169,["121"] = 170,["122"] = 172,["123"] = 172,["125"] = 174,["126"] = 174,["127"] = 174,["128"] = 174,["129"] = 175,["130"] = 176,["131"] = 177,["132"] = 179,["133"] = 180,["134"] = 181,["136"] = 183,["138"] = 186,["139"] = 187,["140"] = 188,["142"] = 196,["143"] = 198,["145"] = 201,["146"] = 163,["147"] = 211,["148"] = 217,["149"] = 218,["150"] = 219,["151"] = 221,["152"] = 221,["154"] = 223,["155"] = 223,["156"] = 223,["157"] = 223,["158"] = 224,["159"] = 225,["160"] = 226,["161"] = 227,["162"] = 228,["163"] = 229,["164"] = 230,["166"] = 238,["167"] = 240,["169"] = 243,["170"] = 211,["171"] = 247,["172"] = 248,["173"] = 249,["174"] = 250,["175"] = 252,["176"] = 252,["177"] = 253,["178"] = 254,["179"] = 254,["180"] = 255,["182"] = 258,["183"] = 247,["184"] = 261,["185"] = 262,["186"] = 263,["187"] = 264,["188"] = 266,["189"] = 267,["192"] = 272,["193"] = 272,["194"] = 272,["195"] = 273,["196"] = 274,["197"] = 275,["198"] = 272,["199"] = 272,["200"] = 279,["201"] = 280,["202"] = 281,["203"] = 282,["207"] = 287,["208"] = 287,["209"] = 287,["210"] = 287,["211"] = 261,["212"] = 304,["213"] = 309,["214"] = 309,["216"] = 312,["217"] = 313,["218"] = 314,["219"] = 316,["220"] = 317,["221"] = 318,["223"] = 321,["224"] = 321,["225"] = 321,["226"] = 321,["227"] = 322,["228"] = 324,["229"] = 325,["230"] = 326,["232"] = 329,["233"] = 329,["234"] = 329,["235"] = 329,["236"] = 329,["237"] = 329,["238"] = 329,["240"] = 338,["241"] = 339,["242"] = 340,["243"] = 343,["244"] = 344,["246"] = 352,["247"] = 354,["248"] = 354,["249"] = 355,["250"] = 304,["251"] = 364,["252"] = 369,["253"] = 370,["255"] = 373,["256"] = 374,["257"] = 374,["259"] = 375,["260"] = 376,["261"] = 377,["262"] = 378,["265"] = 381,["267"] = 364,["268"] = 385,["269"] = 390,["270"] = 391,["271"] = 392,["272"] = 394,["273"] = 394,["275"] = 396,["276"] = 396,["277"] = 396,["278"] = 396,["279"] = 397,["280"] = 398,["281"] = 399,["282"] = 401,["283"] = 402,["285"] = 405,["286"] = 406,["287"] = 408,["288"] = 409,["290"] = 417,["291"] = 419,["293"] = 422,["294"] = 385,["295"] = 426,["296"] = 427,["297"] = 428,["298"] = 431,["299"] = 432,["300"] = 433,["301"] = 433,["302"] = 434,["303"] = 434,["304"] = 435,["306"] = 439,["307"] = 442,["308"] = 442,["309"] = 442,["310"] = 442,["311"] = 447,["312"] = 447,["313"] = 448,["314"] = 426,["315"] = 455,["316"] = 456,["317"] = 457,["318"] = 458,["319"] = 461,["320"] = 461,["321"] = 461,["323"] = 461,["324"] = 455,["325"] = 464,["326"] = 465,["327"] = 466,["328"] = 467,["329"] = 469,["330"] = 470,["332"] = 474,["333"] = 474,["334"] = 474,["335"] = 475,["336"] = 476,["337"] = 477,["338"] = 474,["339"] = 474,["340"] = 481,["343"] = 487,["346"] = 483,["347"] = 484,["354"] = 482,["358"] = 491,["359"] = 464,["360"] = 495,["361"] = 496,["362"] = 498,["363"] = 499,["364"] = 500,["366"] = 502,["368"] = 495,["369"] = 509,["370"] = 510,["371"] = 511,["372"] = 512,["373"] = 514,["375"] = 517,["377"] = 509,["378"] = 525,["379"] = 526,["380"] = 527,["381"] = 528,["382"] = 525,["383"] = 533,["384"] = 534,["385"] = 534,["386"] = 534,["387"] = 534,["388"] = 534,["389"] = 534,["390"] = 534,["391"] = 534,["392"] = 539,["393"] = 539,["394"] = 539,["395"] = 540,["396"] = 541,["397"] = 539,["398"] = 539,["399"] = 544,["400"] = 533,["401"] = 547,["402"] = 548,["403"] = 549,["404"] = 549,["406"] = 550,["409"] = 552,["410"] = 555,["411"] = 557,["412"] = 559,["413"] = 560,["414"] = 561,["415"] = 563,["416"] = 564,["418"] = 566,["419"] = 566,["421"] = 569,["422"] = 570,["424"] = 573,["425"] = 574,["426"] = 575,["427"] = 575,["428"] = 547,["429"] = 581,["430"] = 582,["431"] = 583,["432"] = 583,["433"] = 583,["435"] = 583,["437"] = 583,["438"] = 585,["439"] = 586,["440"] = 587,["441"] = 588,["442"] = 591,["443"] = 592,["445"] = 596,["446"] = 581,["447"] = 600,["448"] = 601,["449"] = 602,["450"] = 603,["451"] = 605,["452"] = 606,["454"] = 609,["455"] = 600,["456"] = 613,["457"] = 618,["458"] = 619,["461"] = 623,["462"] = 625,["463"] = 625,["464"] = 625,["465"] = 626,["466"] = 627,["467"] = 628,["468"] = 629,["470"] = 631,["471"] = 625,["472"] = 625,["473"] = 613,["474"] = 642,["475"] = 644,["476"] = 647,["477"] = 642,["478"] = 651,["479"] = 652,["482"] = 654,["483"] = 655,["484"] = 651,["485"] = 658,["486"] = 659,["487"] = 660,["488"] = 661,["489"] = 661,["490"] = 661,["493"] = 662,["494"] = 662,["495"] = 662,["496"] = 662,["497"] = 662,["498"] = 662,["500"] = 658,["501"] = 665,["502"] = 666,["503"] = 667,["504"] = 668,["505"] = 669,["507"] = 665,["508"] = 674,["509"] = 675,["510"] = 677,["511"] = 678,["512"] = 679,["513"] = 680,["516"] = 684,["517"] = 674,["518"] = 687,["519"] = 688,["520"] = 689,["521"] = 689,["523"] = 690,["524"] = 691,["525"] = 691,["527"] = 692,["528"] = 693,["529"] = 693,["531"] = 694,["532"] = 687,["533"] = 698,["534"] = 699,["535"] = 699,["536"] = 699,["537"] = 700,["538"] = 701,["539"] = 699,["540"] = 699,["541"] = 704,["542"] = 698,["543"] = 708,["544"] = 709,["545"] = 709,["546"] = 709,["549"] = 710,["550"] = 711,["551"] = 712,["552"] = 708,["553"] = 722,["554"] = 724,["555"] = 724,["556"] = 724,["557"] = 725,["558"] = 724,["559"] = 724,["560"] = 724,["561"] = 724,["562"] = 729,["563"] = 729,["564"] = 729,["565"] = 730,["566"] = 729,["567"] = 729,["568"] = 729,["569"] = 729,["570"] = 734,["571"] = 734,["572"] = 734,["573"] = 735,["574"] = 741,["575"] = 734,["576"] = 734,["577"] = 734,["578"] = 734,["579"] = 745,["580"] = 745,["581"] = 745,["582"] = 746,["583"] = 747,["584"] = 748,["585"] = 749,["587"] = 751,["588"] = 752,["591"] = 756,["592"] = 757,["593"] = 758,["595"] = 745,["596"] = 745,["597"] = 745,["598"] = 745,["599"] = 763,["600"] = 763,["601"] = 763,["602"] = 764,["603"] = 765,["604"] = 763,["605"] = 763,["606"] = 763,["607"] = 763,["608"] = 768,["609"] = 722,["610"] = 771,["611"] = 772,["612"] = 773,["613"] = 773,["615"] = 775,["616"] = 776,["617"] = 776,["619"] = 778,["620"] = 779,["621"] = 780,["622"] = 781,["623"] = 771,["624"] = 784,["625"] = 785,["626"] = 786,["627"] = 790,["628"] = 791,["629"] = 792,["630"] = 793,["631"] = 794,["632"] = 784,["633"] = 799,["634"] = 800,["635"] = 801,["636"] = 802,["637"] = 807,["639"] = 810,["640"] = 799,["641"] = 819,["642"] = 820,["643"] = 820,["645"] = 823,["646"] = 824,["648"] = 827,["649"] = 819,["650"] = 830,["651"] = 831,["652"] = 830,["653"] = 834,["654"] = 836,["655"] = 837,["656"] = 834,["657"] = 840,["658"] = 841,["659"] = 842,["660"] = 840,["661"] = 845,["662"] = 846,["663"] = 845,["664"] = 849,["665"] = 850,["666"] = 849,["667"] = 856,["668"] = 857,["671"] = 859,["672"] = 860,["673"] = 860,["675"] = 861,["678"] = 863,["679"] = 864,["680"] = 865,["681"] = 866,["682"] = 866,["684"] = 867,["685"] = 856,["686"] = 8,["687"] = 877,["688"] = 877});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MStateSystem = __TS__Class()
MStateSystem.name = "MStateSystem"
__TS__ClassExtends(MStateSystem, CModule)
function MStateSystem.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.NETTABLE_NAME = "state_system"
    self.SYNC_INTERVAL = 0.2
    self.MAX_NETTABLE_SIZE = 14000
    self.autoCleanupInterval = 30
end
function MStateSystem.prototype.init(self, reload)
    if not reload then
        self:InitializeCore()
        if IsServer() then
            self:InitializeNetTableSync()
            self:StartAutoCleanup()
            if IsInToolsMode() then
                self:RegisterDebugCommands()
            end
        end
        self:print("State System initialized")
    else
        self:print("State System reloaded")
    end
end
function MStateSystem.prototype.initPriority(self)
    return 10
end
function MStateSystem.prototype.reset(self)
    self:ResetSystem()
end
function MStateSystem.prototype.InitializeCore(self)
    if not StateData then
        StateData = {unitStorage = {}, dirtyKeys = {}, lastSyncTime = 0, stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}}
    end
end
function MStateSystem.prototype.AddStaticState(self, key, stateId, sourceId, value, priority, metadata)
    if priority == nil then
        priority = 0
    end
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.static[stateKey]
    if not stateList then
        stateList = {}
        storage.static[stateKey] = stateList
    end
    local existingIndex = __TS__ArrayFindIndex(
        stateList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        local oldValue = self:GetStaticStateValue(key, stateKey)
        stateList[existingIndex + 1].value = value
        stateList[existingIndex + 1].priority = priority
        stateList[existingIndex + 1].metadata = metadata
        self:RecalculateStaticState(key, stateKey)
        local newValue = self:GetStaticStateValue(key, stateKey)
        if oldValue ~= newValue then
            Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = newValue})
        end
    else
        local oldValue = self:GetStaticStateValue(key, stateKey)
        stateList[#stateList + 1] = {
            sourceId = sourceId,
            value = value,
            priority = priority,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
        self:RecalculateStaticState(key, stateKey)
        local newValue = self:GetStaticStateValue(key, stateKey)
        if oldValue ~= newValue then
            Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = newValue})
        end
    end
    self:MarkDirty(key, stateKey)
    local ____StateData_stats_0, ____totalWrites_1 = StateData.stats, "totalWrites"
    ____StateData_stats_0[____totalWrites_1] = ____StateData_stats_0[____totalWrites_1] + 1
    return true
end
function MStateSystem.prototype.RemoveStaticState(self, key, sourceId, stateId)
    if stateId then
        return self:RemoveSingleStaticState(key, sourceId, stateId)
    else
        local storage = StateData.unitStorage[key]
        if not storage then
            return false
        end
        local removed = false
        for sid in pairs(storage.static) do
            if self:RemoveSingleStaticState(key, sourceId, sid) then
                removed = true
            end
        end
        return removed
    end
end
function MStateSystem.prototype.RemoveSingleStaticState(self, key, sourceId, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.static[stateKey]
    if not stateList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        stateList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        local oldValue = self:GetStaticStateValue(key, stateKey)
        __TS__ArraySplice(stateList, index, 1)
        if #stateList == 0 then
            __TS__Delete(storage.static, stateKey)
            __TS__Delete(storage.cache, stateKey)
        else
            self:RecalculateStaticState(key, stateKey)
        end
        local newValue = self:GetStaticStateValue(key, stateKey)
        if oldValue ~= newValue then
            Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = newValue})
        end
        self:MarkDirty(key, stateKey)
        return true
    end
    return false
end
function MStateSystem.prototype.UpdateStaticStateValue(self, key, stateId, sourceId, newValue)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.static[stateKey]
    if not stateList then
        return false
    end
    local data = __TS__ArrayFind(
        stateList,
        function(____, d) return d.sourceId == sourceId end
    )
    if data then
        local oldValue = self:GetStaticStateValue(key, stateKey)
        data.value = newValue
        self:RecalculateStaticState(key, stateKey)
        local finalValue = self:GetStaticStateValue(key, stateKey)
        if oldValue ~= finalValue then
            Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = finalValue})
        end
        self:MarkDirty(key, stateKey)
        return true
    end
    return false
end
function MStateSystem.prototype.GetStaticStateValue(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local cachedEntry = storage.cache[stateKey]
    local ____StateData_stats_2, ____totalReads_3 = StateData.stats, "totalReads"
    ____StateData_stats_2[____totalReads_3] = ____StateData_stats_2[____totalReads_3] + 1
    if cachedEntry ~= nil then
        local ____StateData_stats_4, ____cacheHits_5 = StateData.stats, "cacheHits"
        ____StateData_stats_4[____cacheHits_5] = ____StateData_stats_4[____cacheHits_5] + 1
        return cachedEntry.value
    end
    return false
end
function MStateSystem.prototype.RecalculateStaticState(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.static[stateKey]
    if not stateList or #stateList == 0 then
        __TS__Delete(storage.cache, stateKey)
        return
    end
    local sortedList = __TS__ArraySort(
        {unpack(stateList)},
        function(____, a, b)
            local priorityA = type(a.priority) == "function" and a:priority() or a.priority
            local priorityB = type(b.priority) == "function" and b:priority() or b.priority
            return priorityA - priorityB
        end
    )
    local result = false
    for ____, data in ipairs(sortedList) do
        if data.value == true then
            result = true
            break
        end
    end
    storage.cache[stateKey] = {
        value = result,
        cachedAt = self:GetCurrentTime()
    }
end
function MStateSystem.prototype.RegisterDynamicState(self, key, stateId, sourceId, callback, priority, metadata)
    if priority == nil then
        priority = 100
    end
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.dynamic[stateKey]
    if not stateList then
        stateList = {}
        storage.dynamic[stateKey] = stateList
    end
    local existingIndex = __TS__ArrayFindIndex(
        stateList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        stateList[existingIndex + 1].callback = callback
        stateList[existingIndex + 1].priority = priority
        stateList[existingIndex + 1].metadata = metadata
    else
        stateList[#stateList + 1] = {
            sourceId = sourceId,
            callback = callback,
            priority = priority,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
    end
    local oldValue = self:GetDynamicStateValueInternal(key, stateKey)
    __TS__Delete(storage.cache, stateKey)
    local newValue = self:GetDynamicStateValueInternal(key, stateKey)
    if oldValue ~= newValue then
        Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = newValue})
    end
    self:MarkDirty(key, stateKey)
    local ____StateData_stats_6, ____totalWrites_7 = StateData.stats, "totalWrites"
    ____StateData_stats_6[____totalWrites_7] = ____StateData_stats_6[____totalWrites_7] + 1
    return true
end
function MStateSystem.prototype.UnregisterDynamicState(self, key, sourceId, stateId)
    if stateId then
        return self:UnregisterSingleDynamicState(key, sourceId, stateId)
    else
        local storage = StateData.unitStorage[key]
        if not storage then
            return false
        end
        local removed = false
        for sid in pairs(storage.dynamic) do
            if self:UnregisterSingleDynamicState(key, sourceId, sid) then
                removed = true
            end
        end
        return removed
    end
end
function MStateSystem.prototype.UnregisterSingleDynamicState(self, key, sourceId, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.dynamic[stateKey]
    if not stateList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        stateList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        local oldValue = self:GetDynamicStateValueInternal(key, stateKey)
        __TS__ArraySplice(stateList, index, 1)
        if #stateList == 0 then
            __TS__Delete(storage.dynamic, stateKey)
        end
        __TS__Delete(storage.cache, stateKey)
        local newValue = self:GetDynamicStateValueInternal(key, stateKey)
        if oldValue ~= newValue then
            Event:Fire("state_changed", {key = key, stateId = stateKey, oldValue = oldValue, newValue = newValue})
        end
        self:MarkDirty(key, stateKey)
        return true
    end
    return false
end
function MStateSystem.prototype.GetDynamicStateValue(self, key, stateId, params)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local cached = storage.cache[stateKey]
    if cached ~= nil then
        local ____StateData_stats_8, ____totalReads_9 = StateData.stats, "totalReads"
        ____StateData_stats_8[____totalReads_9] = ____StateData_stats_8[____totalReads_9] + 1
        local ____StateData_stats_10, ____cacheHits_11 = StateData.stats, "cacheHits"
        ____StateData_stats_10[____cacheHits_11] = ____StateData_stats_10[____cacheHits_11] + 1
        return cached.value
    end
    local value = self:CalculateDynamicStateValue(key, stateKey, params)
    storage.cache[stateKey] = {
        value = value,
        cachedAt = self:GetCurrentTime()
    }
    local ____StateData_stats_12, ____totalReads_13 = StateData.stats, "totalReads"
    ____StateData_stats_12[____totalReads_13] = ____StateData_stats_12[____totalReads_13] + 1
    return value
end
function MStateSystem.prototype.GetDynamicStateValueInternal(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local cached = storage.cache[stateKey]
    local ____temp_16 = cached and cached.value
    if ____temp_16 == nil then
        ____temp_16 = false
    end
    return ____temp_16
end
function MStateSystem.prototype.CalculateDynamicStateValue(self, key, stateId, params)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local stateList = storage.dynamic[stateKey]
    if not stateList or #stateList == 0 then
        return false
    end
    local sortedList = __TS__ArraySort(
        {unpack(stateList)},
        function(____, a, b)
            local priorityA = type(a.priority) == "function" and a:priority() or a.priority
            local priorityB = type(b.priority) == "function" and b:priority() or b.priority
            return priorityA - priorityB
        end
    )
    for ____, data in ipairs(sortedList) do
        do
            local function ____catch(____error)
                self:print((((("[Error] Dynamic state callback failed: " .. stateKey) .. " (") .. data.sourceId) .. "): ") .. tostring(____error))
            end
            local ____try, ____hasReturned, ____returnValue = pcall(function()
                if data:callback(params) == true then
                    return true, true
                end
            end)
            if not ____try then
                ____hasReturned, ____returnValue = ____catch(____hasReturned)
            end
            if ____hasReturned then
                return ____returnValue
            end
        end
    end
    return false
end
function MStateSystem.prototype.ClearDynamicStateCache(self, key, stateId)
    local storage = self:GetStorage(key)
    if stateId then
        local stateKey = self:NormalizeStateId(stateId)
        __TS__Delete(storage.cache, stateKey)
    else
        storage.cache = {}
    end
end
function MStateSystem.prototype.GetStateValue(self, key, stateId, params)
    if IsServer() then
        local staticValue = self:GetStaticStateValue(key, stateId)
        local dynamicValue = self:GetDynamicStateValue(key, stateId, params)
        return staticValue or dynamicValue
    else
        return self:GetStateValueFromNetTable(key, stateId)
    end
end
function MStateSystem.prototype.GetStateValueInternal(self, key, stateId)
    local staticValue = self:GetStaticStateValue(key, stateId)
    local dynamicValue = self:GetDynamicStateValueInternal(key, stateId)
    return staticValue or dynamicValue
end
function MStateSystem.prototype.InitializeNetTableSync(self)
    CustomNetTables:SetTableValue(
        self.NETTABLE_NAME,
        "init",
        {
            version = 1,
            time = self:GetCurrentTime()
        }
    )
    Timer:GameTimer(
        self.SYNC_INTERVAL,
        function()
            self:SyncDirtyStates()
            return self.SYNC_INTERVAL
        end
    )
    self:print("NetTable sync initialized")
end
function MStateSystem.prototype.SyncDirtyStates(self)
    local dirtyKeysCount = 0
    for _ in pairs(StateData.dirtyKeys) do
        dirtyKeysCount = dirtyKeysCount + 1
    end
    if dirtyKeysCount == 0 then
        return
    end
    local dirtyArray = __TS__ObjectKeys(StateData.dirtyKeys)
    local groupedByEntity = {}
    for ____, dirtyKey in ipairs(dirtyArray) do
        local parts = __TS__StringSplit(dirtyKey, "|")
        local key = tonumber(parts[1])
        local entityKey = self:GetEntityKeyForNetTable(key)
        if not groupedByEntity[entityKey] then
            groupedByEntity[entityKey] = {}
        end
        local ____groupedByEntity_entityKey_17 = groupedByEntity[entityKey]
        ____groupedByEntity_entityKey_17[#____groupedByEntity_entityKey_17 + 1] = dirtyKey
    end
    for entityKey, keys in pairs(groupedByEntity) do
        self:SyncEntityBatch(entityKey, keys)
    end
    StateData.dirtyKeys = {}
    StateData.lastSyncTime = self:GetCurrentTime()
    local ____StateData_stats_18, ____syncCount_19 = StateData.stats, "syncCount"
    ____StateData_stats_18[____syncCount_19] = ____StateData_stats_18[____syncCount_19] + 1
end
function MStateSystem.prototype.SyncEntityBatch(self, entityKey, dirtyKeys)
    local existingData = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    local ____existingData_20
    if existingData then
        ____existingData_20 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_20 = {}
    end
    local update = ____existingData_20
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local parts = __TS__StringSplit(dirtyKey, "|")
        local key = tonumber(parts[1])
        local stateId = parts[2]
        local value = self:GetStateValueInternal(key, stateId)
        update[stateId] = value
    end
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, update)
end
function MStateSystem.prototype.GetStateValueFromNetTable(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local entityKey = self:GetEntityKeyForNetTable(key)
    local data = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    if data and data[stateKey] ~= nil then
        return data[stateKey]
    end
    return false
end
function MStateSystem.prototype.ListenStateChange(self, key, stateId, callback)
    if IsServer() then
        self:print("[Warning] ListenStateChange should only be used on client")
        return
    end
    local lastValue = self:GetStateValueFromNetTable(key, stateId)
    Timer:GameTimer(
        0.1,
        function()
            local newValue = self:GetStateValueFromNetTable(key, stateId)
            if newValue ~= lastValue then
                callback(lastValue, newValue)
                lastValue = newValue
            end
            return 0.1
        end
    )
end
function MStateSystem.prototype.CleanupSourceStates(self, key, sourceId)
    self:RemoveStaticState(key, sourceId)
    self:UnregisterDynamicState(key, sourceId)
end
function MStateSystem.prototype.CleanupUnitStates(self, unit)
    if not unit then
        return
    end
    local entIndex = unit:GetEntityIndex()
    self:CleanupUnitStatesByIndex(entIndex)
end
function MStateSystem.prototype.CleanupUnitStatesByIndex(self, entIndex)
    self:CleanupStorage(entIndex)
    local prefix = tostring(entIndex) .. "|"
    for ____, key in ipairs(__TS__ObjectKeys(StateData.dirtyKeys)) do
        if (string.find(key, prefix, nil, true) or 0) - 1 == 0 then
            __TS__Delete(StateData.dirtyKeys, key)
        end
    end
    if IsServer() then
        CustomNetTables:SetTableValue(
            self.NETTABLE_NAME,
            self:GetEntityKeyForNetTable(entIndex),
            {}
        )
    end
end
function MStateSystem.prototype.CleanupStorage(self, key)
    local storage = StateData.unitStorage[key]
    if storage ~= nil then
        __TS__Delete(StateData.unitStorage, key)
        self:print("Cleaned up storage: Unit " .. tostring(key))
    end
end
function MStateSystem.prototype.CleanupEmptyStorages(self)
    local cleanedCount = 0
    for key, storage in pairs(StateData.unitStorage) do
        if self:IsStorageEmpty(storage) then
            __TS__Delete(StateData.unitStorage, key)
            cleanedCount = cleanedCount + 1
        end
    end
    return cleanedCount
end
function MStateSystem.prototype.IsStorageEmpty(self, storage)
    local staticCount = 0
    for _ in pairs(storage.static) do
        staticCount = staticCount + 1
    end
    local dynamicCount = 0
    for _ in pairs(storage.dynamic) do
        dynamicCount = dynamicCount + 1
    end
    local cacheCount = 0
    for _ in pairs(storage.cache) do
        cacheCount = cacheCount + 1
    end
    return staticCount == 0 and dynamicCount == 0 and cacheCount == 0
end
function MStateSystem.prototype.StartAutoCleanup(self)
    Timer:GameTimer(
        self.autoCleanupInterval,
        function()
            self:CleanupEmptyStorages()
            return self.autoCleanupInterval
        end
    )
    self:print(("Auto cleanup started (" .. tostring(self.autoCleanupInterval)) .. "s)")
end
function MStateSystem.prototype.ResetSystem(self)
    if IsServer() then
        for ____, key in ipairs(CustomNetTables:GetAllTableKeys("state_system")) do
            CustomNetTables:SetTableValue("state_system", key, {})
        end
    end
    StateData.unitStorage = {}
    StateData.dirtyKeys = {}
    StateData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
end
function MStateSystem.prototype.RegisterDebugCommands(self)
    Convars:RegisterCommand(
        "state_status",
        function()
            self:PrintSystemStatus()
        end,
        "Print state system status",
        0
    )
    Convars:RegisterCommand(
        "state_stats",
        function()
            self:PrintPerformanceStats()
        end,
        "Print performance statistics",
        0
    )
    Convars:RegisterCommand(
        "state_reset_stats",
        function()
            StateData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
            self:print("Statistics reset")
        end,
        "Reset performance statistics",
        0
    )
    Convars:RegisterCommand(
        "state_list",
        function()
            local stateSet = {}
            for ____, storage in pairs(StateData.unitStorage) do
                for sid in pairs(storage.static) do
                    stateSet[tostring(sid)] = true
                end
                for sid in pairs(storage.dynamic) do
                    stateSet[tostring(sid)] = true
                end
            end
            self:print("=== Known States ===")
            for sid in pairs(stateSet) do
                self:print(sid)
            end
        end,
        "List all known states",
        0
    )
    Convars:RegisterCommand(
        "state_cleanup",
        function()
            local count = self:CleanupEmptyStorages()
            self:print(("Cleaned up " .. tostring(count)) .. " empty storages")
        end,
        "Force cleanup empty storages",
        0
    )
    self:print("Debug commands registered")
end
function MStateSystem.prototype.PrintSystemStatus(self)
    local unitCount = 0
    for _ in pairs(StateData.unitStorage) do
        unitCount = unitCount + 1
    end
    local dirtyKeysCount = 0
    for _ in pairs(StateData.dirtyKeys) do
        dirtyKeysCount = dirtyKeysCount + 1
    end
    self:print("=== State System Status ===")
    self:print("Unit Storages: " .. tostring(unitCount))
    self:print("Dirty Keys: " .. tostring(dirtyKeysCount))
    self:print(("Last Sync: " .. __TS__NumberToFixed(StateData.lastSyncTime, 2)) .. "s")
end
function MStateSystem.prototype.PrintPerformanceStats(self)
    local stats = StateData.stats
    local hitRate = stats.totalReads > 0 and __TS__NumberToFixed(stats.cacheHits / stats.totalReads * 100, 2) or "0.00"
    self:print("=== Performance Stats ===")
    self:print("Total Reads: " .. tostring(stats.totalReads))
    self:print(((("Cache Hits: " .. tostring(stats.cacheHits)) .. " (") .. hitRate) .. "%)")
    self:print("Total Writes: " .. tostring(stats.totalWrites))
    self:print("Sync Count: " .. tostring(stats.syncCount))
end
function MStateSystem.prototype.GetStorage(self, key)
    local storage = StateData.unitStorage[key]
    if not storage then
        storage = {static = {}, dynamic = {}, cache = {}}
        StateData.unitStorage[key] = storage
    end
    return storage
end
function MStateSystem.prototype.GetEntityContext(self, entity)
    if not entity or not IsValid(entity) then
        return nil
    end
    if entity.IsBaseNPC and entity:IsBaseNPC() then
        return entity:GetEntityIndex()
    end
    return nil
end
function MStateSystem.prototype.NormalizeStateId(self, stateId)
    return tostring(stateId)
end
function MStateSystem.prototype.GetDirtyKey(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    return (tostring(key) .. "|") .. stateKey
end
function MStateSystem.prototype.MarkDirty(self, key, stateId)
    local dirtyKey = self:GetDirtyKey(key, stateId)
    StateData.dirtyKeys[dirtyKey] = true
end
function MStateSystem.prototype.GetEntityKeyForNetTable(self, key)
    return "unit_" .. tostring(key)
end
function MStateSystem.prototype.GetCurrentTime(self)
    return GameRules:GetGameTime()
end
function MStateSystem.prototype.ForceSyncAllDirty(self)
    if not IsServer() then
        return
    end
    local dirtyCount = 0
    for _ in pairs(StateData.dirtyKeys) do
        dirtyCount = dirtyCount + 1
    end
    if dirtyCount == 0 then
        return
    end
    self:print(("[ForceSyncAllDirty] Syncing " .. tostring(dirtyCount)) .. " dirty states...")
    self:SyncDirtyStates()
    local remainingCount = 0
    for _ in pairs(StateData.dirtyKeys) do
        remainingCount = remainingCount + 1
    end
    self:print("[ForceSyncAllDirty] Sync completed, remaining: " .. tostring(remainingCount))
end
MStateSystem = __TS__DecorateLegacy({reloadable}, MStateSystem)
if StateSystem == nil then
    StateSystem = __TS__New(MStateSystem)
end
return ____exports
