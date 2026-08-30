local __TSTL_FILE_PATH__ = "framework/property_system/stress_test"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 3,["13"] = 3,["14"] = 34,["15"] = 34,["16"] = 35,["18"] = 35,["19"] = 36,["20"] = 37,["21"] = 38,["22"] = 39,["23"] = 40,["24"] = 43,["25"] = 43,["26"] = 43,["27"] = 43,["28"] = 43,["29"] = 43,["30"] = 43,["31"] = 43,["32"] = 43,["33"] = 43,["34"] = 34,["35"] = 54,["36"] = 55,["37"] = 56,["38"] = 57,["39"] = 58,["42"] = 61,["44"] = 54,["45"] = 65,["46"] = 66,["47"] = 65,["48"] = 72,["49"] = 73,["50"] = 74,["51"] = 75,["54"] = 79,["55"] = 80,["56"] = 81,["57"] = 84,["58"] = 87,["59"] = 90,["60"] = 93,["61"] = 96,["62"] = 98,["63"] = 99,["64"] = 101,["65"] = 102,["66"] = 103,["67"] = 72,["68"] = 107,["69"] = 108,["70"] = 109,["73"] = 114,["74"] = 116,["76"] = 120,["77"] = 123,["78"] = 125,["79"] = 107,["80"] = 130,["81"] = 131,["82"] = 132,["83"] = 133,["84"] = 134,["85"] = 135,["86"] = 130,["87"] = 138,["88"] = 139,["89"] = 142,["90"] = 142,["91"] = 142,["92"] = 142,["93"] = 142,["94"] = 142,["95"] = 142,["97"] = 150,["98"] = 150,["99"] = 151,["100"] = 152,["101"] = 154,["102"] = 154,["103"] = 154,["104"] = 154,["105"] = 154,["106"] = 154,["107"] = 154,["108"] = 154,["109"] = 154,["110"] = 154,["111"] = 154,["112"] = 166,["113"] = 166,["114"] = 150,["117"] = 169,["118"] = 138,["119"] = 172,["120"] = 173,["121"] = 175,["122"] = 176,["124"] = 178,["125"] = 178,["126"] = 180,["127"] = 180,["128"] = 180,["129"] = 180,["130"] = 180,["131"] = 187,["132"] = 187,["133"] = 187,["134"] = 187,["135"] = 187,["136"] = 187,["137"] = 187,["138"] = 192,["139"] = 193,["140"] = 193,["142"] = 178,["145"] = 197,["146"] = 172,["147"] = 200,["148"] = 201,["149"] = 203,["150"] = 204,["151"] = 206,["152"] = 207,["154"] = 210,["155"] = 210,["156"] = 211,["158"] = 214,["159"] = 214,["160"] = 215,["161"] = 216,["162"] = 218,["163"] = 225,["164"] = 214,["167"] = 210,["171"] = 230,["172"] = 230,["173"] = 231,["175"] = 233,["176"] = 233,["177"] = 234,["178"] = 237,["179"] = 238,["180"] = 237,["181"] = 241,["182"] = 241,["183"] = 241,["184"] = 241,["185"] = 241,["186"] = 241,["187"] = 241,["188"] = 249,["189"] = 233,["192"] = 230,["196"] = 254,["197"] = 255,["198"] = 200,["199"] = 260,["200"] = 261,["201"] = 263,["202"] = 263,["203"] = 263,["204"] = 264,["205"] = 267,["206"] = 268,["207"] = 269,["209"] = 273,["210"] = 275,["211"] = 263,["212"] = 263,["213"] = 260,["214"] = 279,["215"] = 280,["216"] = 283,["217"] = 286,["219"] = 288,["220"] = 288,["222"] = 289,["223"] = 290,["224"] = 290,["226"] = 292,["227"] = 295,["228"] = 296,["229"] = 297,["230"] = 298,["231"] = 301,["234"] = 288,["237"] = 306,["238"] = 306,["239"] = 306,["240"] = 307,["241"] = 308,["243"] = 313,["244"] = 313,["245"] = 313,["246"] = 313,["248"] = 314,["249"] = 314,["251"] = 315,["252"] = 316,["253"] = 316,["255"] = 318,["257"] = 320,["258"] = 320,["259"] = 321,["260"] = 322,["261"] = 320,["266"] = 314,["269"] = 279,["270"] = 329,["271"] = 330,["272"] = 332,["273"] = 333,["274"] = 334,["275"] = 335,["276"] = 338,["277"] = 339,["278"] = 340,["279"] = 341,["280"] = 342,["281"] = 343,["282"] = 346,["283"] = 347,["284"] = 348,["285"] = 349,["286"] = 351,["287"] = 352,["288"] = 353,["289"] = 354,["292"] = 359,["293"] = 360,["294"] = 361,["296"] = 363,["297"] = 363,["298"] = 363,["299"] = 363,["300"] = 364,["302"] = 365,["303"] = 365,["304"] = 366,["305"] = 365,["308"] = 370,["309"] = 371,["310"] = 372,["311"] = 372,["313"] = 373,["314"] = 374,["315"] = 374,["317"] = 375,["318"] = 376,["319"] = 376,["321"] = 377,["322"] = 378,["323"] = 379,["324"] = 329,["325"] = 382,["326"] = 383,["327"] = 384,["328"] = 385,["329"] = 386,["330"] = 387,["331"] = 388,["332"] = 389,["333"] = 390,["334"] = 391,["335"] = 393,["336"] = 394,["337"] = 382,["338"] = 399,["339"] = 400,["340"] = 403,["341"] = 406,["342"] = 407,["343"] = 408,["344"] = 409,["347"] = 413,["348"] = 414,["349"] = 415,["350"] = 399,["351"] = 420,["352"] = 422,["353"] = 422,["354"] = 422,["355"] = 423,["356"] = 424,["357"] = 422,["358"] = 422,["359"] = 422,["360"] = 422,["361"] = 428,["362"] = 428,["363"] = 428,["364"] = 429,["365"] = 429,["366"] = 429,["367"] = 429,["368"] = 429,["369"] = 429,["370"] = 429,["371"] = 429,["372"] = 428,["373"] = 428,["374"] = 428,["375"] = 428,["376"] = 440,["377"] = 440,["378"] = 440,["379"] = 441,["380"] = 441,["381"] = 441,["382"] = 441,["383"] = 441,["384"] = 441,["385"] = 441,["386"] = 441,["387"] = 440,["388"] = 440,["389"] = 440,["390"] = 440,["391"] = 452,["392"] = 452,["393"] = 452,["394"] = 453,["395"] = 452,["396"] = 452,["397"] = 452,["398"] = 452,["399"] = 457,["400"] = 457,["401"] = 457,["402"] = 458,["403"] = 459,["406"] = 463,["407"] = 464,["408"] = 465,["409"] = 467,["410"] = 468,["411"] = 469,["412"] = 470,["413"] = 471,["414"] = 472,["415"] = 457,["416"] = 457,["417"] = 457,["418"] = 457,["419"] = 476,["420"] = 476,["421"] = 476,["422"] = 477,["423"] = 476,["424"] = 476,["425"] = 476,["426"] = 476,["427"] = 420,["428"] = 484,["429"] = 485,["430"] = 486,["431"] = 489,["432"] = 490,["433"] = 493,["434"] = 498,["435"] = 499,["438"] = 503,["439"] = 504,["440"] = 507,["441"] = 508,["442"] = 511,["443"] = 511,["444"] = 511,["445"] = 511,["446"] = 511,["447"] = 511,["448"] = 511,["450"] = 520,["451"] = 520,["452"] = 521,["453"] = 521,["454"] = 521,["455"] = 521,["456"] = 521,["457"] = 521,["458"] = 520,["461"] = 529,["462"] = 532,["463"] = 533,["464"] = 535,["465"] = 536,["466"] = 537,["467"] = 538,["470"] = 542,["471"] = 543,["475"] = 549,["476"] = 549,["477"] = 549,["478"] = 550,["479"] = 551,["480"] = 552,["481"] = 553,["482"] = 555,["483"] = 556,["484"] = 557,["485"] = 558,["488"] = 563,["489"] = 564,["490"] = 549,["491"] = 549,["492"] = 484,["493"] = 34,["494"] = 574,["495"] = 574});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MPropertySystemStressTest = __TS__Class()
MPropertySystemStressTest.name = "MPropertySystemStressTest"
__TS__ClassExtends(MPropertySystemStressTest, CModule)
function MPropertySystemStressTest.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.testUnits = {}
    self.testPropertyIds = {}
    self.testStartTime = 0
    self.testEndTime = 0
    self.updateCount = 0
    self.DEFAULT_CONFIG = {
        unitCount = 100,
        propertiesPerUnit = 20,
        staticPropertiesPerUnit = 10,
        dynamicPropertiesPerUnit = 10,
        sourcesPerProperty = 3,
        duration = 60,
        updateInterval = 0.1,
        enableNetTableSync = true
    }
end
function MPropertySystemStressTest.prototype.init(self, reload)
    if not reload then
        if IsServer() then
            if IsInToolsMode() then
                self:RegisterCommands()
            end
        end
        self:print("Stress test module loaded")
    end
end
function MPropertySystemStressTest.prototype.initPriority(self)
    return 5
end
function MPropertySystemStressTest.prototype.StartStressTest(self, config)
    print("StartStressTest")
    if self.testStartTime > 0 then
        self:print("Test already running! Use stop_stress_test first.")
        return
    end
    local finalConfig = __TS__ObjectAssign({}, self.DEFAULT_CONFIG, config)
    self:print("=== Starting Property System Stress Test ===")
    self:PrintConfig(finalConfig)
    self:PrepareTestEnvironment(finalConfig)
    self:RegisterTestProperties(finalConfig)
    self:CreateTestUnits(finalConfig)
    self:AddPropertiesToUnits(finalConfig)
    self:StartUpdateLoop(finalConfig)
    self.testStartTime = GameRules:GetGameTime()
    self.testEndTime = self.testStartTime + finalConfig.duration
    self:print(("Test started! Duration: " .. tostring(finalConfig.duration)) .. "s")
    self:print("Use \"property_test_status\" to check progress")
    self:print("Use \"property_test_stop\" to stop test")
end
function MPropertySystemStressTest.prototype.StopStressTest(self)
    if self.testStartTime == 0 then
        self:print("No test running")
        return
    end
    if self.updateTimer then
        self.updateTimer = nil
    end
    self:GenerateTestReport()
    self:CleanupTest()
    self:print("Test stopped")
end
function MPropertySystemStressTest.prototype.PrepareTestEnvironment(self, config)
    self.testUnits = {}
    self.testPropertyIds = {}
    self.updateCount = 0
    self.testStartTime = 0
    self.testEndTime = 0
end
function MPropertySystemStressTest.prototype.RegisterTestProperties(self, config)
    self:print("Registering test properties...")
    local propertyTypes = {
        {prefix = "damage", aggregation = AggregationStrategy.SUM},
        {prefix = "armor", aggregation = AggregationStrategy.SUM},
        {prefix = "speed", aggregation = AggregationStrategy.MULTIPLY},
        {prefix = "crit", aggregation = AggregationStrategy.MAX},
        {prefix = "resist", aggregation = AggregationStrategy.MIN}
    }
    do
        local i = 0
        while i < config.propertiesPerUnit do
            local ____type = propertyTypes[i % #propertyTypes + 1]
            local propertyId = (("test_" .. ____type.prefix) .. "_") .. tostring(i)
            PropertySystem:RegisterProperty({
                id = propertyId,
                scope = PropertyScope.UNIT,
                valueType = PropertyValueType.NUMBER,
                aggregation = ____type.aggregation,
                defaultValue = ____type.prefix == "speed" and 1 or 0,
                syncToClient = config.enableNetTableSync,
                syncPriority = i,
                enableCache = true,
                cacheDuration = 1
            })
            local ____self_testPropertyIds_0 = self.testPropertyIds
            ____self_testPropertyIds_0[#____self_testPropertyIds_0 + 1] = propertyId
            i = i + 1
        end
    end
    self:print(("Registered " .. tostring(#self.testPropertyIds)) .. " test properties")
end
function MPropertySystemStressTest.prototype.CreateTestUnits(self, config)
    self:print("Creating test units...")
    local spawnPoint = Entities:FindByClassname(nil, "info_player_start_goodguys")
    local position = spawnPoint ~= nil and spawnPoint:GetAbsOrigin() or Vector(0, 0, 128)
    do
        local i = 0
        while i < config.unitCount do
            local offset = Vector(
                RandomFloat(-500, 500),
                RandomFloat(-500, 500),
                0
            )
            local unit = SpawnEntityFromTableSynchronous(
                "dota_prop_customtexture",
                {
                    origin = position:__add(offset),
                    model = "models/props_gameplay/tombstone.vmdl"
                }
            )
            if unit ~= nil then
                local ____self_testUnits_1 = self.testUnits
                ____self_testUnits_1[#____self_testUnits_1 + 1] = unit
            end
            i = i + 1
        end
    end
    self:print(("Created " .. tostring(#self.testUnits)) .. " test units")
end
function MPropertySystemStressTest.prototype.AddPropertiesToUnits(self, config)
    self:print("Adding properties to units...")
    local totalStaticProps = 0
    local totalDynamicProps = 0
    for ____, unit in ipairs(self.testUnits) do
        local entIndex = unit:GetEntityIndex()
        do
            local i = 0
            while i < config.staticPropertiesPerUnit do
                local propertyId = self.testPropertyIds[i + 1]
                do
                    local s = 0
                    while s < config.sourcesPerProperty do
                        local sourceId = (("source_" .. tostring(i)) .. "_") .. tostring(s)
                        local value = RandomFloat(1, 100)
                        PropertySystem:AddStaticProperty(entIndex, propertyId, sourceId, value)
                        totalStaticProps = totalStaticProps + 1
                        s = s + 1
                    end
                end
                i = i + 1
            end
        end
        do
            local i = 0
            while i < config.dynamicPropertiesPerUnit do
                local propertyId = self.testPropertyIds[config.staticPropertiesPerUnit + i + 1]
                do
                    local s = 0
                    while s < config.sourcesPerProperty do
                        local sourceId = (("dynamic_" .. tostring(i)) .. "_") .. tostring(s)
                        local function callback()
                            return unit:GetHealth() * 0.01
                        end
                        PropertySystem:RegisterDynamicProperty(
                            entIndex,
                            propertyId,
                            sourceId,
                            callback,
                            s
                        )
                        totalDynamicProps = totalDynamicProps + 1
                        s = s + 1
                    end
                end
                i = i + 1
            end
        end
    end
    self:print(("Added " .. tostring(totalStaticProps)) .. " static properties")
    self:print(("Added " .. tostring(totalDynamicProps)) .. " dynamic properties")
end
function MPropertySystemStressTest.prototype.StartUpdateLoop(self, config)
    self:print("Starting update loop...")
    self.updateTimer = Timer:GameTimer(
        config.updateInterval,
        function()
            local currentTime = GameRules:GetGameTime()
            if currentTime >= self.testEndTime then
                self:StopStressTest()
                return nil
            end
            self:PerformUpdate(config)
            return config.updateInterval
        end
    )
end
function MPropertySystemStressTest.prototype.PerformUpdate(self, config)
    self.updateCount = self.updateCount + 1
    local updateCount = math.floor(config.unitCount * 0.1)
    local updatedUnits = {}
    do
        local i = 0
        while i < updateCount do
            do
                local unit = self.testUnits[RandomInt(0, #self.testUnits - 1) + 1]
                if not unit or not IsValid(unit) then
                    goto __continue37
                end
                local entIndex = unit:GetEntityIndex()
                local propIndex = RandomInt(0, config.staticPropertiesPerUnit - 1)
                local propertyId = self.testPropertyIds[propIndex + 1]
                local sourceIndex = RandomInt(0, config.sourcesPerProperty - 1)
                local sourceId = (("source_" .. tostring(propIndex)) .. "_") .. tostring(sourceIndex)
                updatedUnits[#updatedUnits + 1] = {unit = unit, propertyId = propertyId}
            end
            ::__continue37::
            i = i + 1
        end
    end
    for ____, ____value in ipairs(updatedUnits) do
        local unit = ____value.unit
        local propertyId = ____value.propertyId
        local entIndex = unit:GetEntityIndex()
        PropertySystem:GetPropertyValue(entIndex, propertyId)
    end
    local hotUnitCount = math.max(
        1,
        math.floor(config.unitCount * 0.1)
    )
    do
        local i = 0
        while i < hotUnitCount do
            do
                local unit = self.testUnits[i % #self.testUnits + 1]
                if not unit or not IsValid(unit) then
                    goto __continue42
                end
                local entIndex = unit:GetEntityIndex()
                do
                    local p = 0
                    while p < math.min(3, config.propertiesPerUnit) do
                        local propertyId = self.testPropertyIds[p + 1]
                        PropertySystem:GetPropertyValue(entIndex, propertyId)
                        p = p + 1
                    end
                end
            end
            ::__continue42::
            i = i + 1
        end
    end
end
function MPropertySystemStressTest.prototype.GenerateTestReport(self)
    local duration = GameRules:GetGameTime() - self.testStartTime
    self:print("=== Property System Stress Test Report ===")
    self:print(("Duration: " .. __TS__NumberToFixed(duration, 2)) .. "s")
    self:print("Updates: " .. tostring(self.updateCount))
    self:print("Average UPS: " .. __TS__NumberToFixed(self.updateCount / duration, 2))
    local stats = PropertyData.stats
    self:print("\n=== Performance Stats ===")
    self:print("Total Reads: " .. tostring(stats.totalReads))
    self:print(((("Cache Hits: " .. tostring(stats.cacheHits)) .. " (") .. __TS__NumberToFixed(stats.cacheHits / stats.totalReads * 100, 2)) .. "%)")
    self:print("Total Writes: " .. tostring(stats.totalWrites))
    self:print("Sync Count: " .. tostring(stats.syncCount))
    local sizeStats = PropertySystem:GetNetTableSizeStats()
    self:print("\n=== NetTable Size Stats ===")
    self:print(("Total Size: " .. tostring(sizeStats.total)) .. " bytes")
    self:print("Entity Count: " .. tostring(sizeStats.entities.size))
    if #sizeStats.warnings > 0 then
        self:print("\n⚠️ SIZE WARNINGS:")
        for ____, warning in ipairs(sizeStats.warnings) do
            self:print("  " .. warning)
        end
    end
    local entitiesArray = {}
    for k, v in pairs(sizeStats.entities) do
        entitiesArray[#entitiesArray + 1] = {k, v}
    end
    local sorted = __TS__ArraySort(
        entitiesArray,
        function(____, a, b) return b[2] - a[2] end
    )
    self:print("\nTop 5 largest entities:")
    do
        local i = 0
        while i < math.min(5, #sorted) do
            self:print(((("  " .. sorted[i + 1][1]) .. ": ") .. tostring(sorted[i + 1][2])) .. " bytes")
            i = i + 1
        end
    end
    self:print("\n=== Storage Stats ===")
    local playerStorageCount = 0
    for _ in pairs(PropertyData.playerStorage) do
        playerStorageCount = playerStorageCount + 1
    end
    local unitStorageCount = 0
    for _ in pairs(PropertyData.unitStorage) do
        unitStorageCount = unitStorageCount + 1
    end
    local dirtyKeysCount = 0
    for _ in pairs(PropertyData.dirtyKeys) do
        dirtyKeysCount = dirtyKeysCount + 1
    end
    self:print("Player Storages: " .. tostring(playerStorageCount))
    self:print("Unit Storages: " .. tostring(unitStorageCount))
    self:print("Dirty Keys: " .. tostring(dirtyKeysCount))
end
function MPropertySystemStressTest.prototype.PrintConfig(self, config)
    self:print("Test Configuration:")
    self:print("  Units: " .. tostring(config.unitCount))
    self:print("  Properties/Unit: " .. tostring(config.propertiesPerUnit))
    self:print("  Static: " .. tostring(config.staticPropertiesPerUnit))
    self:print("  Dynamic: " .. tostring(config.dynamicPropertiesPerUnit))
    self:print("  Sources/Property: " .. tostring(config.sourcesPerProperty))
    self:print(("  Duration: " .. tostring(config.duration)) .. "s")
    self:print(("  Update Interval: " .. tostring(config.updateInterval)) .. "s")
    self:print("  NetTable Sync: " .. tostring(config.enableNetTableSync))
    local totalProps = config.unitCount * config.propertiesPerUnit * config.sourcesPerProperty
    self:print("  Total Properties: " .. tostring(totalProps))
end
function MPropertySystemStressTest.prototype.CleanupTest(self)
    self:print("Cleaning up test...")
    PropertySystem:ForceSyncAllDirty()
    for ____, unit in ipairs(self.testUnits) do
        if unit and IsValid(unit) then
            PropertySystem:CleanupUnitProperties(unit)
            UTIL_Remove(unit)
        end
    end
    self.testUnits = {}
    self.testPropertyIds = {}
    self:print("Test stopped")
end
function MPropertySystemStressTest.prototype.RegisterCommands(self)
    Convars:RegisterCommand(
        "property_test_start",
        function()
            print("property_test_start")
            self:StartStressTest()
        end,
        "Start property system stress test",
        0
    )
    Convars:RegisterCommand(
        "property_test_start_small",
        function()
            self:StartStressTest({
                unitCount = 10,
                propertiesPerUnit = 10,
                staticPropertiesPerUnit = 5,
                dynamicPropertiesPerUnit = 5,
                sourcesPerProperty = 2,
                duration = 30
            })
        end,
        "Start small stress test (10 units, 30s)",
        0
    )
    Convars:RegisterCommand(
        "property_test_start_large",
        function()
            self:StartStressTest({
                unitCount = 200,
                propertiesPerUnit = 30,
                staticPropertiesPerUnit = 15,
                dynamicPropertiesPerUnit = 15,
                sourcesPerProperty = 5,
                duration = 120
            })
        end,
        "Start large stress test (200 units, 120s)",
        0
    )
    Convars:RegisterCommand(
        "property_test_stop",
        function()
            self:StopStressTest()
        end,
        "Stop current stress test",
        0
    )
    Convars:RegisterCommand(
        "property_test_status",
        function()
            if self.testStartTime == 0 then
                self:print("No test running")
                return
            end
            local currentTime = GameRules:GetGameTime()
            local elapsed = currentTime - self.testStartTime
            local remaining = self.testEndTime - currentTime
            self:print("=== Test Status ===")
            self:print(("Elapsed: " .. __TS__NumberToFixed(elapsed, 2)) .. "s")
            self:print(("Remaining: " .. __TS__NumberToFixed(remaining, 2)) .. "s")
            self:print("Updates: " .. tostring(self.updateCount))
            self:print("Units: " .. tostring(#self.testUnits))
            self:print("Properties: " .. tostring(#self.testPropertyIds))
        end,
        "Show test status",
        0
    )
    Convars:RegisterCommand(
        "property_test_nettable",
        function()
            self:TestNetTableSize()
        end,
        "Test NetTable size limit with single unit",
        0
    )
end
function MPropertySystemStressTest.prototype.TestNetTableSize(self)
    self:print("=== NetTable Size Test ===")
    self:print("Creating unit with increasing properties until size limit...")
    local spawnPoint = Entities:FindByClassname(nil, "info_player_start_goodguys")
    local position = spawnPoint ~= nil and spawnPoint:GetAbsOrigin() or Vector(0, 0, 128)
    local unit = SpawnEntityFromTableSynchronous("dota_prop_customtexture", {origin = position, model = "models/props_gameplay/tombstone.vmdl"})
    if not unit then
        self:print("Failed to create test unit")
        return
    end
    local entIndex = unit:GetEntityIndex()
    local propertyCount = 0
    while true do
        local propertyId = "nettable_test_prop_" .. tostring(propertyCount)
        PropertySystem:RegisterProperty({
            id = propertyId,
            scope = PropertyScope.UNIT,
            valueType = PropertyValueType.NUMBER,
            aggregation = AggregationStrategy.SUM,
            syncToClient = true
        })
        do
            local s = 0
            while s < 10 do
                PropertySystem:AddStaticProperty(
                    entIndex,
                    propertyId,
                    "source_" .. tostring(s),
                    RandomFloat(1, 100)
                )
                s = s + 1
            end
        end
        propertyCount = propertyCount + 1
        local size = PropertySystem:EstimateEntityNetTableSize(PropertyScope.UNIT, entIndex)
        self:print(((("Properties: " .. tostring(propertyCount)) .. ", Estimated Size: ") .. tostring(size)) .. " bytes")
        if size > 13000 then
            self:print("\n⚠️ Approaching size limit!")
            self:print("Maximum safe properties: ~" .. tostring(propertyCount))
            self:print(("With 10 sources per property: " .. tostring(propertyCount * 10)) .. " total values")
            break
        end
        if propertyCount > 1000 then
            self:print("Reached safety limit (1000 properties)")
            break
        end
    end
    Timer:GameTimer(
        0.5,
        function()
            local sizeStats = PropertySystem:GetNetTableSizeStats()
            self:print("\n=== Final Stats ===")
            self:print("Total entities: " .. tostring(sizeStats.entities.size))
            self:print(("Total size: " .. tostring(sizeStats.total)) .. " bytes")
            if #sizeStats.warnings > 0 then
                self:print("\n⚠️ WARNINGS:")
                for ____, warning in ipairs(sizeStats.warnings) do
                    self:print("  " .. warning)
                end
            end
            UTIL_Remove(unit)
            return nil
        end
    )
end
MPropertySystemStressTest = __TS__DecorateLegacy({reloadable}, MPropertySystemStressTest)
if PropertySystemStressTest == nil then
    PropertySystemStressTest = __TS__New(MPropertySystemStressTest)
end
return ____exports
