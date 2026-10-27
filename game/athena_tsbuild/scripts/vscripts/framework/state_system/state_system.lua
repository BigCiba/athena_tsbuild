local __TSTL_FILE_PATH__ = "framework/state_system/state_system"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySort = ____lualib.__TS__ArraySort
local Set = ____lualib.Set
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__New = ____lualib.__TS__New
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__Delete = ____lualib.__TS__Delete
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__Number = ____lualib.__TS__Number
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["26"] = 3,["27"] = 3,["28"] = 8,["29"] = 8,["30"] = 9,["32"] = 9,["33"] = 11,["34"] = 12,["35"] = 13,["36"] = 16,["37"] = 8,["38"] = 18,["39"] = 19,["40"] = 20,["41"] = 22,["42"] = 23,["43"] = 24,["44"] = 25,["45"] = 26,["48"] = 30,["50"] = 32,["52"] = 18,["53"] = 36,["54"] = 37,["55"] = 36,["56"] = 40,["57"] = 41,["58"] = 40,["59"] = 46,["60"] = 47,["61"] = 48,["63"] = 46,["64"] = 64,["65"] = 65,["66"] = 66,["67"] = 64,["68"] = 69,["69"] = 70,["70"] = 70,["71"] = 71,["72"] = 71,["74"] = 72,["75"] = 73,["76"] = 73,["78"] = 74,["79"] = 74,["81"] = 75,["82"] = 75,["83"] = 75,["84"] = 76,["87"] = 80,["90"] = 78,["91"] = 79,["92"] = 79,["99"] = 81,["100"] = 75,["101"] = 75,["102"] = 83,["103"] = 83,["104"] = 83,["105"] = 84,["106"] = 84,["108"] = 85,["109"] = 83,["110"] = 83,["111"] = 87,["112"] = 87,["115"] = 92,["118"] = 89,["119"] = 89,["120"] = 89,["122"] = 89,["124"] = 89,["125"] = 91,["126"] = 91,["133"] = 88,["137"] = 94,["138"] = 69,["139"] = 97,["140"] = 98,["141"] = 98,["142"] = 99,["143"] = 99,["145"] = 100,["146"] = 101,["147"] = 101,["149"] = 102,["150"] = 103,["151"] = 103,["152"] = 103,["153"] = 103,["154"] = 104,["155"] = 104,["157"] = 106,["158"] = 106,["159"] = 106,["161"] = 106,["162"] = 106,["163"] = 106,["164"] = 107,["165"] = 107,["166"] = 107,["167"] = 107,["169"] = 106,["171"] = 109,["172"] = 97,["173"] = 112,["174"] = 113,["175"] = 113,["177"] = 114,["180"] = 115,["181"] = 115,["184"] = 115,["186"] = 115,["187"] = 115,["188"] = 115,["189"] = 115,["190"] = 116,["191"] = 117,["192"] = 117,["193"] = 118,["194"] = 118,["195"] = 118,["196"] = 118,["197"] = 118,["198"] = 118,["203"] = 120,["206"] = 121,["207"] = 122,["208"] = 123,["209"] = 123,["210"] = 123,["211"] = 123,["212"] = 123,["213"] = 124,["214"] = 124,["215"] = 124,["216"] = 124,["217"] = 124,["218"] = 125,["219"] = 125,["220"] = 125,["221"] = 125,["222"] = 126,["223"] = 126,["224"] = 126,["225"] = 126,["226"] = 127,["227"] = 127,["228"] = 129,["229"] = 129,["230"] = 129,["231"] = 129,["232"] = 130,["233"] = 130,["234"] = 130,["235"] = 130,["236"] = 130,["238"] = 130,["240"] = 130,["242"] = 129,["243"] = 129,["244"] = 129,["245"] = 129,["246"] = 129,["247"] = 129,["248"] = 129,["249"] = 129,["251"] = 133,["252"] = 133,["253"] = 133,["254"] = 133,["255"] = 134,["256"] = 134,["257"] = 134,["258"] = 134,["259"] = 134,["261"] = 134,["263"] = 134,["265"] = 133,["266"] = 133,["267"] = 133,["268"] = 133,["269"] = 133,["270"] = 133,["271"] = 133,["272"] = 133,["274"] = 137,["275"] = 137,["277"] = 137,["279"] = 138,["280"] = 138,["282"] = 138,["284"] = 139,["285"] = 139,["287"] = 141,["288"] = 141,["289"] = 141,["291"] = 112,["292"] = 145,["293"] = 145,["294"] = 145,["296"] = 146,["297"] = 146,["299"] = 147,["300"] = 147,["301"] = 148,["302"] = 148,["303"] = 148,["305"] = 148,["306"] = 149,["307"] = 149,["308"] = 149,["309"] = 149,["310"] = 150,["311"] = 150,["312"] = 150,["313"] = 150,["315"] = 151,["316"] = 151,["317"] = 151,["318"] = 151,["319"] = 151,["320"] = 151,["321"] = 151,["322"] = 151,["324"] = 152,["325"] = 152,["326"] = 153,["327"] = 154,["328"] = 145,["329"] = 157,["330"] = 158,["331"] = 158,["333"] = 159,["334"] = 160,["335"] = 160,["337"] = 161,["338"] = 162,["339"] = 163,["341"] = 164,["342"] = 165,["343"] = 165,["344"] = 165,["345"] = 165,["346"] = 165,["347"] = 166,["348"] = 166,["350"] = 167,["351"] = 167,["353"] = 167,["355"] = 168,["356"] = 168,["357"] = 168,["361"] = 170,["362"] = 157,["363"] = 173,["364"] = 174,["365"] = 174,["367"] = 175,["368"] = 175,["370"] = 175,["371"] = 175,["372"] = 175,["373"] = 175,["374"] = 175,["376"] = 175,["377"] = 176,["378"] = 176,["380"] = 177,["381"] = 177,["382"] = 177,["383"] = 178,["384"] = 178,["385"] = 173,["386"] = 181,["387"] = 182,["388"] = 182,["389"] = 183,["390"] = 181,["391"] = 186,["392"] = 186,["393"] = 186,["395"] = 187,["396"] = 187,["398"] = 188,["399"] = 188,["400"] = 189,["401"] = 189,["402"] = 189,["404"] = 189,["405"] = 190,["406"] = 190,["407"] = 190,["408"] = 190,["409"] = 191,["410"] = 191,["411"] = 191,["412"] = 191,["414"] = 192,["415"] = 192,["416"] = 192,["417"] = 192,["418"] = 192,["419"] = 192,["420"] = 192,["421"] = 192,["423"] = 193,["424"] = 193,["425"] = 194,["426"] = 195,["427"] = 186,["428"] = 198,["429"] = 199,["430"] = 199,["432"] = 200,["433"] = 201,["434"] = 201,["436"] = 202,["437"] = 203,["438"] = 204,["440"] = 205,["441"] = 206,["442"] = 206,["443"] = 206,["444"] = 206,["445"] = 206,["446"] = 207,["447"] = 207,["449"] = 208,["450"] = 208,["452"] = 208,["454"] = 209,["455"] = 209,["456"] = 209,["460"] = 211,["461"] = 198,["462"] = 214,["463"] = 215,["464"] = 215,["465"] = 216,["466"] = 214,["467"] = 219,["468"] = 220,["471"] = 221,["472"] = 222,["475"] = 223,["476"] = 224,["477"] = 224,["479"] = 219,["480"] = 227,["481"] = 228,["482"] = 228,["483"] = 229,["484"] = 229,["486"] = 230,["487"] = 230,["488"] = 230,["490"] = 230,["492"] = 230,["493"] = 227,["494"] = 233,["495"] = 234,["496"] = 235,["497"] = 235,["498"] = 236,["499"] = 236,["500"] = 236,["501"] = 236,["502"] = 237,["503"] = 237,["504"] = 237,["505"] = 237,["506"] = 237,["507"] = 237,["510"] = 238,["511"] = 238,["514"] = 233,["515"] = 241,["516"] = 242,["517"] = 242,["518"] = 242,["519"] = 242,["520"] = 242,["521"] = 242,["522"] = 242,["523"] = 242,["524"] = 243,["525"] = 243,["526"] = 243,["527"] = 243,["528"] = 243,["529"] = 243,["530"] = 243,["531"] = 241,["532"] = 245,["533"] = 246,["534"] = 247,["535"] = 248,["538"] = 249,["539"] = 251,["540"] = 252,["541"] = 253,["542"] = 254,["543"] = 254,["544"] = 254,["546"] = 254,["547"] = 254,["549"] = 256,["550"] = 256,["552"] = 257,["553"] = 257,["554"] = 257,["555"] = 245,["556"] = 260,["557"] = 261,["558"] = 262,["559"] = 262,["560"] = 262,["562"] = 262,["564"] = 262,["565"] = 263,["566"] = 264,["568"] = 265,["569"] = 265,["570"] = 265,["571"] = 265,["572"] = 265,["573"] = 265,["574"] = 266,["575"] = 266,["577"] = 267,["578"] = 267,["579"] = 267,["580"] = 267,["582"] = 267,["583"] = 268,["584"] = 268,["585"] = 268,["587"] = 269,["588"] = 269,["593"] = 271,["594"] = 271,["596"] = 260,["597"] = 274,["598"] = 275,["599"] = 275,["600"] = 275,["601"] = 275,["603"] = 275,["605"] = 275,["606"] = 274,["607"] = 279,["608"] = 284,["609"] = 285,["612"] = 289,["613"] = 291,["614"] = 291,["615"] = 291,["616"] = 292,["617"] = 293,["618"] = 294,["619"] = 295,["621"] = 297,["622"] = 291,["623"] = 291,["624"] = 279,["625"] = 308,["626"] = 309,["629"] = 310,["630"] = 311,["633"] = 312,["634"] = 312,["637"] = 312,["639"] = 312,["640"] = 312,["641"] = 312,["642"] = 312,["643"] = 313,["644"] = 314,["645"] = 315,["647"] = 316,["648"] = 317,["649"] = 317,["651"] = 318,["652"] = 318,["653"] = 318,["654"] = 318,["655"] = 319,["656"] = 319,["658"] = 320,["659"] = 320,["661"] = 320,["663"] = 321,["667"] = 324,["668"] = 324,["669"] = 324,["672"] = 308,["673"] = 329,["674"] = 330,["677"] = 332,["678"] = 333,["679"] = 329,["680"] = 336,["681"] = 337,["682"] = 338,["683"] = 339,["684"] = 339,["685"] = 339,["688"] = 340,["689"] = 340,["690"] = 340,["691"] = 340,["692"] = 340,["693"] = 340,["695"] = 336,["696"] = 343,["697"] = 344,["698"] = 345,["699"] = 346,["700"] = 347,["702"] = 343,["703"] = 352,["704"] = 353,["705"] = 355,["706"] = 356,["707"] = 357,["708"] = 358,["711"] = 362,["712"] = 352,["713"] = 365,["714"] = 366,["715"] = 367,["716"] = 367,["718"] = 368,["719"] = 369,["720"] = 369,["722"] = 370,["723"] = 371,["724"] = 371,["726"] = 372,["727"] = 365,["728"] = 376,["729"] = 377,["730"] = 377,["731"] = 377,["732"] = 378,["733"] = 379,["734"] = 377,["735"] = 377,["736"] = 382,["737"] = 376,["738"] = 386,["739"] = 387,["740"] = 387,["741"] = 387,["744"] = 388,["745"] = 389,["746"] = 390,["747"] = 386,["748"] = 400,["749"] = 402,["750"] = 402,["751"] = 402,["752"] = 403,["753"] = 402,["754"] = 402,["755"] = 402,["756"] = 402,["757"] = 407,["758"] = 407,["759"] = 407,["760"] = 408,["761"] = 407,["762"] = 407,["763"] = 407,["764"] = 407,["765"] = 412,["766"] = 412,["767"] = 412,["768"] = 413,["769"] = 419,["770"] = 412,["771"] = 412,["772"] = 412,["773"] = 412,["774"] = 423,["775"] = 423,["776"] = 423,["777"] = 424,["778"] = 425,["779"] = 426,["780"] = 427,["782"] = 429,["783"] = 430,["786"] = 434,["787"] = 435,["788"] = 436,["790"] = 423,["791"] = 423,["792"] = 423,["793"] = 423,["794"] = 441,["795"] = 441,["796"] = 441,["797"] = 442,["798"] = 443,["799"] = 441,["800"] = 441,["801"] = 441,["802"] = 441,["803"] = 446,["804"] = 400,["805"] = 449,["806"] = 450,["807"] = 451,["808"] = 451,["810"] = 453,["811"] = 454,["812"] = 454,["814"] = 456,["815"] = 457,["816"] = 458,["817"] = 459,["818"] = 449,["819"] = 462,["820"] = 463,["821"] = 464,["822"] = 468,["823"] = 469,["824"] = 470,["825"] = 471,["826"] = 472,["827"] = 462,["828"] = 477,["829"] = 478,["830"] = 479,["831"] = 480,["832"] = 485,["834"] = 488,["835"] = 477,["836"] = 497,["837"] = 498,["838"] = 498,["840"] = 501,["841"] = 502,["843"] = 505,["844"] = 497,["845"] = 508,["846"] = 509,["847"] = 508,["848"] = 512,["849"] = 514,["850"] = 515,["851"] = 512,["852"] = 518,["853"] = 519,["854"] = 520,["855"] = 518,["856"] = 523,["857"] = 524,["858"] = 523,["859"] = 527,["860"] = 528,["861"] = 527,["862"] = 534,["863"] = 535,["866"] = 537,["867"] = 538,["868"] = 538,["870"] = 541,["871"] = 542,["872"] = 543,["873"] = 544,["874"] = 544,["876"] = 545,["877"] = 534,["878"] = 8,["879"] = 555,["880"] = 555});
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
function MStateSystem.prototype.NextRegistrationOrder(self)
    StateData.nextRegistrationOrder = (StateData.nextRegistrationOrder or 0) + 1
    return StateData.nextRegistrationOrder
end
function MStateSystem.prototype.ResolveStateValue(self, key, stateId, kind, params)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = StateData.unitStorage[key]
    if not storage then
        return false
    end
    local sources = {}
    if kind ~= "dynamic" then
        __TS__ArrayPushArray(sources, storage.static[stateKey] or ({}))
    end
    if kind ~= "static" then
        __TS__ArrayPushArray(sources, storage.dynamic[stateKey] or ({}))
    end
    local ranked = __TS__ArrayMap(
        sources,
        function(____, data)
            local priority = 0
            do
                local function ____catch(____error)
                    self:print("State priority failed", stateKey, data.sourceId, ____error)
                end
                local ____try, ____hasReturned = pcall(function()
                    local value = type(data.priority) == "function" and data:priority() or data.priority
                    if type(value) == "number" and value == value then
                        priority = value
                    end
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            return {data = data, priority = priority}
        end
    )
    __TS__ArraySort(
        ranked,
        function(____, a, b)
            if a.priority ~= b.priority then
                return b.priority - a.priority
            end
            return (b.data.registrationOrder or 0) - (a.data.registrationOrder or 0)
        end
    )
    for ____, ____value in ipairs(ranked) do
        local data = ____value.data
        do
            local function ____catch(____error)
                self:print("State callback failed", stateKey, data.sourceId, ____error)
            end
            local ____try, ____hasReturned, ____returnValue = pcall(function()
                local ____temp_0
                if data.callback ~= nil then
                    ____temp_0 = data:callback(params)
                else
                    ____temp_0 = data.value
                end
                local value = ____temp_0
                if type(value) == "boolean" then
                    return true, value
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
function MStateSystem.prototype.RefreshResolvedValue(self, key, stateId)
    local stateKey = self:NormalizeStateId(stateId)
    local storage = StateData.unitStorage[key]
    if not storage then
        return false
    end
    local previous = storage.cache[stateKey]
    if not previous and not storage.static[stateKey] and not storage.dynamic[stateKey] then
        return false
    end
    local value = self:ResolveStateValue(key, stateKey, "both")
    storage.cache[stateKey] = {
        value = value,
        cachedAt = self:GetCurrentTime()
    }
    if not previous or previous.value ~= value then
        self:MarkDirty(key, stateKey)
    end
    local ____temp_3 = previous and previous.value
    if ____temp_3 == nil then
        ____temp_3 = false
    end
    if ____temp_3 ~= value then
        local ____Event_8 = Event
        local ____Event_Fire_9 = Event.Fire
        local ____key_7 = key
        local ____temp_6 = previous and previous.value
        if ____temp_6 == nil then
            ____temp_6 = false
        end
        ____Event_Fire_9(____Event_8, "state_changed", {key = ____key_7, stateId = stateKey, oldValue = ____temp_6, newValue = value})
    end
    return value
end
function MStateSystem.prototype.ReplaceSourceStates(self, key, sourceId, staticStates, dynamicStates, priority)
    if priority == nil then
        priority = 0
    end
    if not IsServer() then
        return
    end
    local ____Set_11 = Set
    local ____array_10 = __TS__SparseArrayNew(unpack(__TS__ObjectKeys(staticStates)))
    __TS__SparseArrayPush(
        ____array_10,
        unpack(__TS__ObjectKeys(dynamicStates))
    )
    local ids = __TS__New(
        ____Set_11,
        {__TS__SparseArraySpread(____array_10)}
    )
    local previous = StateData.unitStorage[key]
    if previous then
        for ____, layer in ipairs({previous.static, previous.dynamic}) do
            for ____, id in ipairs(__TS__ObjectKeys(layer)) do
                if __TS__ArraySome(
                    layer[id],
                    function(____, data) return data.sourceId == sourceId end
                ) then
                    ids:add(id)
                end
            end
        end
    end
    if ids.size == 0 then
        return
    end
    local storage = self:GetStorage(key)
    for ____, id in __TS__Iterator(ids) do
        local ____opt_12 = storage.static[id]
        local oldStatic = ____opt_12 and __TS__ArrayFind(
            storage.static[id],
            function(____, data) return data.sourceId == sourceId end
        )
        local ____opt_14 = storage.dynamic[id]
        local oldDynamic = ____opt_14 and __TS__ArrayFind(
            storage.dynamic[id],
            function(____, data) return data.sourceId == sourceId end
        )
        local statics = __TS__ArrayFilter(
            storage.static[id] or ({}),
            function(____, data) return data.sourceId ~= sourceId end
        )
        local dynamics = __TS__ArrayFilter(
            storage.dynamic[id] or ({}),
            function(____, data) return data.sourceId ~= sourceId end
        )
        local value = staticStates[id]
        local callback = dynamicStates[id]
        if callback ~= nil then
            local ____sourceId_28 = sourceId
            local ____callback_29 = callback
            local ____priority_30 = priority
            local ____temp_21 = oldDynamic and oldDynamic.registrationOrder
            if ____temp_21 == nil then
                local ____temp_20
                if value == nil then
                    ____temp_20 = oldStatic and oldStatic.registrationOrder
                else
                    ____temp_20 = nil
                end
                ____temp_21 = ____temp_20
            end
            dynamics[#dynamics + 1] = {
                sourceId = ____sourceId_28,
                callback = ____callback_29,
                priority = ____priority_30,
                registrationOrder = ____temp_21 or self:NextRegistrationOrder(),
                addedTime = oldDynamic and oldDynamic.addedTime or oldStatic and oldStatic.addedTime or self:GetCurrentTime(),
                metadata = oldDynamic and oldDynamic.metadata
            }
        end
        if value ~= nil then
            local ____sourceId_43 = sourceId
            local ____value_44 = value
            local ____priority_45 = priority
            local ____temp_36 = oldStatic and oldStatic.registrationOrder
            if ____temp_36 == nil then
                local ____temp_35
                if callback == nil then
                    ____temp_35 = oldDynamic and oldDynamic.registrationOrder
                else
                    ____temp_35 = nil
                end
                ____temp_36 = ____temp_35
            end
            statics[#statics + 1] = {
                sourceId = ____sourceId_43,
                value = ____value_44,
                priority = ____priority_45,
                registrationOrder = ____temp_36 or self:NextRegistrationOrder(),
                addedTime = oldStatic and oldStatic.addedTime or oldDynamic and oldDynamic.addedTime or self:GetCurrentTime(),
                metadata = oldStatic and oldStatic.metadata
            }
        end
        if #statics > 0 then
            storage.static[id] = statics
        else
            __TS__Delete(storage.static, id)
        end
        if #dynamics > 0 then
            storage.dynamic[id] = dynamics
        else
            __TS__Delete(storage.dynamic, id)
        end
        local ____StateData_stats_46, ____totalWrites_47 = StateData.stats, "totalWrites"
        ____StateData_stats_46[____totalWrites_47] = ____StateData_stats_46[____totalWrites_47] + 1
    end
    for ____, id in __TS__Iterator(ids) do
        self:MarkDirty(key, id)
        self:RefreshResolvedValue(key, id)
    end
end
function MStateSystem.prototype.AddStaticState(self, key, stateId, sourceId, value, priority, metadata)
    if priority == nil then
        priority = 0
    end
    if not IsServer() then
        return false
    end
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local ____storage_static_48, ____stateKey_49 = storage.static, stateKey
    if ____storage_static_48[____stateKey_49] == nil then
        ____storage_static_48[____stateKey_49] = {}
    end
    local list = storage.static[stateKey]
    local existing = __TS__ArrayFind(
        list,
        function(____, data) return data.sourceId == sourceId end
    )
    if existing then
        existing.value = value
        existing.priority = priority
        existing.metadata = metadata
    else
        list[#list + 1] = {
            sourceId = sourceId,
            value = value,
            priority = priority,
            metadata = metadata,
            addedTime = self:GetCurrentTime(),
            registrationOrder = self:NextRegistrationOrder()
        }
    end
    local ____StateData_stats_51, ____totalWrites_52 = StateData.stats, "totalWrites"
    ____StateData_stats_51[____totalWrites_52] = ____StateData_stats_51[____totalWrites_52] + 1
    self:RefreshResolvedValue(key, stateKey)
    return true
end
function MStateSystem.prototype.RemoveStaticState(self, key, sourceId, stateId)
    if not IsServer() then
        return false
    end
    local storage = StateData.unitStorage[key]
    if not storage then
        return false
    end
    local ids = stateId ~= nil and ({self:NormalizeStateId(stateId)}) or __TS__ObjectKeys(storage.static)
    local removed = false
    for ____, id in ipairs(ids) do
        do
            local list = storage.static[id]
            local ____opt_53 = list
            local remaining = ____opt_53 and __TS__ArrayFilter(
                list,
                function(____, data) return data.sourceId ~= sourceId end
            )
            if not list or #remaining == #list then
                goto __continue64
            end
            if #remaining > 0 then
                storage.static[id] = remaining
            else
                __TS__Delete(storage.static, id)
            end
            removed = true
            self:MarkDirty(key, id)
            self:RefreshResolvedValue(key, id)
        end
        ::__continue64::
    end
    return removed
end
function MStateSystem.prototype.UpdateStaticStateValue(self, key, stateId, sourceId, newValue)
    if not IsServer() then
        return false
    end
    local ____opt_59 = StateData.unitStorage[key]
    local ____opt_55 = ____opt_59 and ____opt_59.static[self:NormalizeStateId(stateId)]
    if ____opt_55 ~= nil then
        local ____opt_56 = StateData.unitStorage[key]
        ____opt_55 = __TS__ArrayFind(
            ____opt_56 and ____opt_56.static[self:NormalizeStateId(stateId)],
            function(____, value) return value.sourceId == sourceId end
        )
    end
    local data = ____opt_55
    if not data then
        return false
    end
    data.value = newValue
    local ____StateData_stats_61, ____totalWrites_62 = StateData.stats, "totalWrites"
    ____StateData_stats_61[____totalWrites_62] = ____StateData_stats_61[____totalWrites_62] + 1
    self:RefreshResolvedValue(key, stateId)
    return true
end
function MStateSystem.prototype.GetStaticStateValue(self, key, stateId)
    local ____StateData_stats_63, ____totalReads_64 = StateData.stats, "totalReads"
    ____StateData_stats_63[____totalReads_64] = ____StateData_stats_63[____totalReads_64] + 1
    return self:ResolveStateValue(key, stateId, "static")
end
function MStateSystem.prototype.RegisterDynamicState(self, key, stateId, sourceId, callback, priority, metadata)
    if priority == nil then
        priority = 0
    end
    if not IsServer() then
        return false
    end
    local stateKey = self:NormalizeStateId(stateId)
    local storage = self:GetStorage(key)
    local ____storage_dynamic_65, ____stateKey_66 = storage.dynamic, stateKey
    if ____storage_dynamic_65[____stateKey_66] == nil then
        ____storage_dynamic_65[____stateKey_66] = {}
    end
    local list = storage.dynamic[stateKey]
    local existing = __TS__ArrayFind(
        list,
        function(____, data) return data.sourceId == sourceId end
    )
    if existing then
        existing.callback = callback
        existing.priority = priority
        existing.metadata = metadata
    else
        list[#list + 1] = {
            sourceId = sourceId,
            callback = callback,
            priority = priority,
            metadata = metadata,
            addedTime = self:GetCurrentTime(),
            registrationOrder = self:NextRegistrationOrder()
        }
    end
    local ____StateData_stats_68, ____totalWrites_69 = StateData.stats, "totalWrites"
    ____StateData_stats_68[____totalWrites_69] = ____StateData_stats_68[____totalWrites_69] + 1
    self:RefreshResolvedValue(key, stateKey)
    return true
end
function MStateSystem.prototype.UnregisterDynamicState(self, key, sourceId, stateId)
    if not IsServer() then
        return false
    end
    local storage = StateData.unitStorage[key]
    if not storage then
        return false
    end
    local ids = stateId ~= nil and ({self:NormalizeStateId(stateId)}) or __TS__ObjectKeys(storage.dynamic)
    local removed = false
    for ____, id in ipairs(ids) do
        do
            local list = storage.dynamic[id]
            local ____opt_70 = list
            local remaining = ____opt_70 and __TS__ArrayFilter(
                list,
                function(____, data) return data.sourceId ~= sourceId end
            )
            if not list or #remaining == #list then
                goto __continue83
            end
            if #remaining > 0 then
                storage.dynamic[id] = remaining
            else
                __TS__Delete(storage.dynamic, id)
            end
            removed = true
            self:MarkDirty(key, id)
            self:RefreshResolvedValue(key, id)
        end
        ::__continue83::
    end
    return removed
end
function MStateSystem.prototype.GetDynamicStateValue(self, key, stateId, params)
    local ____StateData_stats_72, ____totalReads_73 = StateData.stats, "totalReads"
    ____StateData_stats_72[____totalReads_73] = ____StateData_stats_72[____totalReads_73] + 1
    return self:ResolveStateValue(key, stateId, "dynamic", params)
end
function MStateSystem.prototype.ClearDynamicStateCache(self, key, stateId)
    if not IsServer() then
        return
    end
    local storage = StateData.unitStorage[key]
    if not storage then
        return
    end
    local ids = stateId ~= nil and ({self:NormalizeStateId(stateId)}) or __TS__ObjectKeys(storage.dynamic)
    for ____, id in ipairs(ids) do
        self:RefreshResolvedValue(key, id)
    end
end
function MStateSystem.prototype.GetStateValue(self, key, stateId, params)
    local ____StateData_stats_74, ____totalReads_75 = StateData.stats, "totalReads"
    ____StateData_stats_74[____totalReads_75] = ____StateData_stats_74[____totalReads_75] + 1
    if not IsServer() then
        return self:GetStateValueFromNetTable(key, stateId)
    end
    local ____temp_76
    if params == nil then
        ____temp_76 = self:RefreshResolvedValue(key, stateId)
    else
        ____temp_76 = self:ResolveStateValue(key, stateId, "both", params)
    end
    return ____temp_76
end
function MStateSystem.prototype.RefreshLiveStates(self)
    for ____, key in ipairs(__TS__ObjectKeys(StateData.unitStorage)) do
        local index = __TS__Number(key)
        local storage = StateData.unitStorage[index]
        local ids = __TS__New(
            Set,
            __TS__ObjectKeys(storage.dynamic)
        )
        for ____, id in ipairs(__TS__ObjectKeys(storage.static)) do
            if __TS__ArraySome(
                storage.static[id],
                function(____, data) return type(data.priority) == "function" end
            ) then
                ids:add(id)
            end
        end
        for ____, id in __TS__Iterator(ids) do
            self:RefreshResolvedValue(index, id)
        end
    end
end
function MStateSystem.prototype.InitializeNetTableSync(self)
    CustomNetTables:SetTableValue(
        self.NETTABLE_NAME,
        "init",
        {
            version = 2,
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
end
function MStateSystem.prototype.SyncDirtyStates(self)
    self:RefreshLiveStates()
    local dirtyArray = __TS__ObjectKeys(StateData.dirtyKeys)
    if #dirtyArray == 0 then
        return
    end
    local groups = {}
    for ____, dirtyKey in ipairs(dirtyArray) do
        __TS__Delete(StateData.dirtyKeys, dirtyKey)
        local entityKey = self:GetEntityKeyForNetTable(__TS__Number(__TS__StringSplit(dirtyKey, "|")[1]))
        local ____groups_77, ____entityKey_78 = groups, entityKey
        if ____groups_77[____entityKey_78] == nil then
            ____groups_77[____entityKey_78] = {}
        end
        local ____groups_entityKey_80 = groups[entityKey]
        ____groups_entityKey_80[#____groups_entityKey_80 + 1] = dirtyKey
    end
    for entityKey, keys in pairs(groups) do
        self:SyncEntityBatch(entityKey, keys)
    end
    StateData.lastSyncTime = self:GetCurrentTime()
    local ____StateData_stats_81, ____syncCount_82 = StateData.stats, "syncCount"
    ____StateData_stats_81[____syncCount_82] = ____StateData_stats_81[____syncCount_82] + 1
end
function MStateSystem.prototype.SyncEntityBatch(self, entityKey, dirtyKeys)
    local existing = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    local ____existing_83
    if existing then
        ____existing_83 = __TS__ObjectAssign({}, existing)
    else
        ____existing_83 = {}
    end
    local update = ____existing_83
    local changed = false
    for ____, dirtyKey in ipairs(dirtyKeys) do
        do
            local key, stateId = unpack(
                __TS__StringSplit(dirtyKey, "|"),
                1,
                2
            )
            local storage = StateData.unitStorage[__TS__Number(key)]
            if not storage then
                goto __continue114
            end
            local ____opt_84 = storage.cache[stateId]
            local ____temp_86 = ____opt_84 and ____opt_84.value
            if ____temp_86 == nil then
                ____temp_86 = false
            end
            local value = ____temp_86
            if update[stateId] ~= value then
                update[stateId] = value
                changed = true
            end
            if not storage.static[stateId] and not storage.dynamic[stateId] then
                __TS__Delete(storage.cache, stateId)
            end
        end
        ::__continue114::
    end
    if changed then
        CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, update)
    end
end
function MStateSystem.prototype.GetStateValueFromNetTable(self, key, stateId)
    local ____opt_87 = CustomNetTables:GetTableValue(
        self.NETTABLE_NAME,
        self:GetEntityKeyForNetTable(key)
    )
    if ____opt_87 ~= nil then
        ____opt_87 = ____opt_87[self:NormalizeStateId(stateId)]
    end
    return ____opt_87 == true
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
    if not IsServer() then
        return
    end
    local storage = StateData.unitStorage[key]
    if not storage then
        return
    end
    local ____Set_90 = Set
    local ____array_89 = __TS__SparseArrayNew(unpack(__TS__ObjectKeys(storage.static)))
    __TS__SparseArrayPush(
        ____array_89,
        unpack(__TS__ObjectKeys(storage.dynamic))
    )
    local ids = __TS__New(
        ____Set_90,
        {__TS__SparseArraySpread(____array_89)}
    )
    for ____, id in __TS__Iterator(ids) do
        local changed = false
        for ____, layer in ipairs({storage.static, storage.dynamic}) do
            do
                local list = layer[id]
                if not list then
                    goto __continue129
                end
                local remaining = __TS__ArrayFilter(
                    list,
                    function(____, data) return data.sourceId ~= sourceId end
                )
                if #list == #remaining then
                    goto __continue129
                end
                if #remaining == 0 then
                    __TS__Delete(layer, id)
                else
                    layer[id] = remaining
                end
                changed = true
            end
            ::__continue129::
        end
        if changed then
            self:MarkDirty(key, id)
            self:RefreshResolvedValue(key, id)
        end
    end
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
