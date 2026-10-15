local __TSTL_FILE_PATH__ = "framework/unit_manager"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 1,["13"] = 1,["14"] = 6,["15"] = 6,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 67,["20"] = 68,["21"] = 70,["22"] = 70,["23"] = 71,["25"] = 71,["26"] = 72,["27"] = 73,["28"] = 74,["29"] = 76,["30"] = 77,["31"] = 78,["32"] = 70,["33"] = 80,["34"] = 81,["35"] = 80,["36"] = 84,["37"] = 85,["38"] = 86,["39"] = 87,["40"] = 88,["41"] = 89,["42"] = 90,["43"] = 91,["44"] = 91,["45"] = 91,["46"] = 91,["47"] = 91,["48"] = 91,["49"] = 91,["50"] = 84,["51"] = 94,["52"] = 95,["53"] = 96,["54"] = 97,["55"] = 98,["56"] = 94,["57"] = 101,["58"] = 102,["59"] = 103,["60"] = 101,["61"] = 106,["62"] = 107,["63"] = 107,["64"] = 107,["65"] = 107,["66"] = 108,["67"] = 106,["68"] = 111,["69"] = 112,["72"] = 113,["73"] = 111,["74"] = 116,["75"] = 117,["76"] = 117,["78"] = 118,["79"] = 116,["80"] = 121,["81"] = 122,["82"] = 122,["84"] = 123,["85"] = 124,["86"] = 125,["87"] = 125,["89"] = 126,["90"] = 127,["91"] = 128,["92"] = 121,["93"] = 131,["94"] = 132,["95"] = 132,["97"] = 133,["98"] = 134,["99"] = 135,["100"] = 131,["101"] = 138,["102"] = 139,["103"] = 139,["105"] = 140,["106"] = 141,["107"] = 142,["108"] = 143,["109"] = 146,["110"] = 147,["111"] = 148,["112"] = 149,["113"] = 150,["114"] = 151,["115"] = 152,["116"] = 153,["117"] = 154,["118"] = 154,["119"] = 154,["121"] = 154,["123"] = 144,["124"] = 144,["125"] = 144,["126"] = 144,["127"] = 144,["128"] = 144,["129"] = 144,["130"] = 144,["131"] = 144,["132"] = 144,["133"] = 144,["134"] = 144,["135"] = 138,["136"] = 158,["137"] = 159,["140"] = 160,["141"] = 161,["142"] = 162,["145"] = 163,["146"] = 164,["147"] = 158,["148"] = 167,["149"] = 168,["150"] = 169,["151"] = 170,["152"] = 171,["154"] = 173,["155"] = 174,["156"] = 167,["157"] = 177,["158"] = 178,["159"] = 177,["160"] = 181,["161"] = 182,["162"] = 183,["163"] = 184,["164"] = 185,["165"] = 187,["167"] = 188,["168"] = 189,["169"] = 190,["171"] = 193,["172"] = 194,["173"] = 194,["175"] = 195,["176"] = 197,["177"] = 197,["179"] = 198,["180"] = 198,["182"] = 199,["186"] = 202,["187"] = 203,["188"] = 181,["189"] = 206,["190"] = 206,["191"] = 206,["193"] = 207,["194"] = 207,["195"] = 207,["196"] = 207,["197"] = 207,["198"] = 207,["199"] = 207,["200"] = 207,["201"] = 207,["202"] = 207,["203"] = 217,["204"] = 218,["205"] = 218,["206"] = 218,["207"] = 218,["208"] = 218,["209"] = 218,["210"] = 218,["211"] = 218,["212"] = 218,["213"] = 218,["214"] = 218,["215"] = 219,["216"] = 206,["217"] = 222,["218"] = 222,["219"] = 222,["221"] = 223,["222"] = 223,["223"] = 223,["224"] = 223,["225"] = 223,["226"] = 223,["227"] = 223,["228"] = 223,["229"] = 223,["230"] = 223,["231"] = 223,["232"] = 234,["233"] = 235,["234"] = 235,["235"] = 235,["236"] = 235,["237"] = 235,["238"] = 235,["239"] = 235,["240"] = 235,["241"] = 235,["242"] = 235,["243"] = 236,["244"] = 222,["245"] = 239,["246"] = 239,["247"] = 239,["249"] = 240,["250"] = 240,["251"] = 240,["252"] = 240,["253"] = 240,["254"] = 240,["255"] = 240,["256"] = 240,["257"] = 240,["258"] = 240,["259"] = 240,["260"] = 240,["261"] = 239,["262"] = 254,["263"] = 254,["264"] = 254,["266"] = 255,["267"] = 255,["268"] = 255,["269"] = 255,["270"] = 255,["271"] = 255,["272"] = 255,["273"] = 255,["274"] = 255,["275"] = 255,["276"] = 255,["277"] = 255,["278"] = 255,["279"] = 254,["280"] = 270,["281"] = 270,["282"] = 270,["284"] = 271,["285"] = 271,["287"] = 272,["288"] = 272,["289"] = 272,["290"] = 272,["291"] = 272,["292"] = 272,["293"] = 272,["294"] = 272,["295"] = 272,["296"] = 270,["297"] = 275,["298"] = 276,["299"] = 275,["300"] = 279,["301"] = 280,["302"] = 279,["303"] = 283,["304"] = 284,["305"] = 285,["308"] = 286,["309"] = 283,["310"] = 289,["311"] = 290,["312"] = 291,["313"] = 292,["315"] = 295,["316"] = 295,["317"] = 295,["318"] = 296,["319"] = 297,["320"] = 295,["321"] = 295,["322"] = 289,["323"] = 301,["324"] = 302,["325"] = 303,["326"] = 304,["328"] = 301,["329"] = 308,["330"] = 309,["331"] = 310,["332"] = 312,["334"] = 313,["335"] = 314,["336"] = 315,["338"] = 317,["340"] = 319,["344"] = 322,["345"] = 323,["347"] = 326,["348"] = 327,["350"] = 308,["351"] = 331,["352"] = 332,["353"] = 333,["354"] = 334,["355"] = 335,["356"] = 336,["357"] = 336,["358"] = 336,["360"] = 337,["361"] = 337,["364"] = 331,["365"] = 342,["366"] = 343,["367"] = 344,["368"] = 345,["369"] = 346,["370"] = 347,["371"] = 348,["372"] = 349,["374"] = 351,["376"] = 353,["378"] = 359,["379"] = 359,["380"] = 359,["382"] = 360,["383"] = 361,["384"] = 361,["386"] = 342,["387"] = 365,["388"] = 366,["389"] = 367,["393"] = 368,["394"] = 368,["395"] = 369,["396"] = 370,["397"] = 371,["399"] = 368,["402"] = 374,["403"] = 375,["405"] = 365,["406"] = 379,["407"] = 380,["408"] = 381,["409"] = 382,["411"] = 384,["412"] = 385,["414"] = 379,["415"] = 389,["416"] = 390,["417"] = 390,["419"] = 391,["420"] = 392,["421"] = 392,["424"] = 394,["425"] = 389,["426"] = 397,["427"] = 398,["428"] = 399,["429"] = 400,["430"] = 401,["431"] = 402,["432"] = 404,["433"] = 405,["434"] = 406,["435"] = 407,["436"] = 408,["437"] = 409,["442"] = 415,["443"] = 397,["444"] = 418,["445"] = 419,["446"] = 419,["448"] = 420,["449"] = 420,["451"] = 423,["452"] = 424,["454"] = 426,["455"] = 418,["456"] = 429,["457"] = 430,["458"] = 430,["460"] = 431,["461"] = 432,["462"] = 432,["465"] = 434,["466"] = 429,["467"] = 437,["468"] = 438,["471"] = 439,["472"] = 439,["473"] = 439,["474"] = 439,["475"] = 439,["476"] = 441,["477"] = 441,["478"] = 441,["479"] = 441,["480"] = 441,["481"] = 441,["482"] = 439,["483"] = 439,["484"] = 439,["485"] = 437,["486"] = 451,["487"] = 452,["488"] = 452,["489"] = 452,["490"] = 452,["491"] = 452,["492"] = 452,["493"] = 452,["494"] = 452,["495"] = 461,["496"] = 462,["497"] = 463,["498"] = 464,["499"] = 465,["500"] = 466,["501"] = 467,["502"] = 468,["503"] = 469,["504"] = 470,["505"] = 471,["506"] = 472,["508"] = 474,["509"] = 475,["510"] = 476,["511"] = 477,["512"] = 478,["514"] = 481,["515"] = 451,["516"] = 484,["517"] = 485,["518"] = 486,["519"] = 487,["521"] = 489,["522"] = 484,["523"] = 492,["524"] = 493,["525"] = 494,["526"] = 495,["527"] = 496,["530"] = 500,["531"] = 501,["532"] = 502,["533"] = 503,["536"] = 506,["537"] = 492,["538"] = 509,["539"] = 510,["540"] = 511,["542"] = 513,["543"] = 513,["544"] = 513,["545"] = 513,["546"] = 513,["547"] = 513,["548"] = 513,["549"] = 513,["550"] = 513,["551"] = 509,["552"] = 524,["553"] = 525,["554"] = 525,["555"] = 525,["556"] = 525,["557"] = 525,["558"] = 524,["559"] = 532,["560"] = 533,["561"] = 534,["563"] = 537,["564"] = 538,["565"] = 538,["566"] = 538,["567"] = 538,["568"] = 538,["569"] = 538,["571"] = 546,["572"] = 547,["574"] = 550,["575"] = 532,["576"] = 553,["577"] = 554,["578"] = 553,["579"] = 562,["580"] = 563,["581"] = 564,["582"] = 564,["583"] = 564,["584"] = 564,["586"] = 567,["587"] = 568,["589"] = 571,["590"] = 572,["591"] = 572,["592"] = 572,["593"] = 572,["594"] = 572,["595"] = 572,["596"] = 572,["597"] = 572,["599"] = 575,["600"] = 575,["601"] = 575,["602"] = 575,["603"] = 575,["604"] = 575,["605"] = 575,["606"] = 575,["607"] = 562,["608"] = 578,["609"] = 579,["610"] = 580,["611"] = 581,["612"] = 582,["613"] = 583,["614"] = 584,["615"] = 584,["616"] = 584,["617"] = 584,["619"] = 587,["620"] = 588,["621"] = 589,["622"] = 590,["623"] = 591,["624"] = 591,["625"] = 591,["626"] = 591,["627"] = 578,["628"] = 594,["629"] = 595,["630"] = 595,["632"] = 597,["633"] = 598,["634"] = 599,["635"] = 599,["637"] = 601,["638"] = 602,["639"] = 603,["640"] = 603,["642"] = 605,["643"] = 605,["644"] = 605,["645"] = 605,["646"] = 605,["647"] = 606,["648"] = 606,["650"] = 608,["651"] = 608,["653"] = 609,["654"] = 610,["655"] = 611,["656"] = 594,["657"] = 614,["658"] = 615,["659"] = 615,["660"] = 615,["661"] = 615,["662"] = 615,["663"] = 615,["664"] = 615,["665"] = 614,["666"] = 618,["667"] = 619,["668"] = 620,["671"] = 622,["672"] = 623,["673"] = 623,["674"] = 623,["675"] = 624,["676"] = 624,["677"] = 624,["678"] = 624,["679"] = 625,["680"] = 625,["681"] = 625,["682"] = 625,["683"] = 626,["684"] = 623,["685"] = 623,["686"] = 618,["687"] = 630,["688"] = 631,["689"] = 631,["691"] = 632,["692"] = 630,["693"] = 635,["694"] = 636,["695"] = 635,["696"] = 639,["697"] = 640,["698"] = 640,["699"] = 640,["700"] = 640,["701"] = 639,["702"] = 643,["703"] = 644,["704"] = 643,["705"] = 647,["706"] = 648,["707"] = 647,["708"] = 70,["709"] = 658,["710"] = 659,["711"] = 659,["713"] = 661,["714"] = 662,["715"] = 663,["716"] = 664,["717"] = 665,["718"] = 666,["719"] = 666,["720"] = 666,["721"] = 666,["722"] = 666,["723"] = 666,["724"] = 666,["725"] = 666,["726"] = 666,["728"] = 668,["729"] = 668,["730"] = 668,["731"] = 668,["732"] = 668,["733"] = 668,["734"] = 668,["735"] = 668,["736"] = 668,["737"] = 668,["738"] = 668,["739"] = 664,["741"] = 672,["742"] = 673,["743"] = 674,["744"] = 675,["745"] = 676,["746"] = 676,["747"] = 676,["748"] = 676,["749"] = 676,["750"] = 676,["751"] = 676,["752"] = 676,["753"] = 676,["755"] = 678,["756"] = 678,["757"] = 678,["758"] = 678,["759"] = 678,["760"] = 678,["761"] = 678,["762"] = 678,["763"] = 678,["764"] = 678,["765"] = 674});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local UnitSearchShape = UnitSearchShape or ({})
UnitSearchShape.RADIUS = "radius"
UnitSearchShape.LINE = "line"
UnitSearchShape.SECTOR = "sector"
UnitSearchShape.TRUNCATED_SECTOR = "truncated_sector"
local DEFAULT_UNIT_MANAGER_CELL_SIZE = 512
local DEFAULT_UNIT_MANAGER_UPDATE_INTERVAL = 0.1
local CUnitManager = __TS__Class()
CUnitManager.name = "CUnitManager"
__TS__ClassExtends(CUnitManager, CModule)
function CUnitManager.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.useEngineFallbackOnMismatch = false
    self.cellSize = DEFAULT_UNIT_MANAGER_CELL_SIZE
    self.updateInterval = DEFAULT_UNIT_MANAGER_UPDATE_INTERVAL
    self.cells = {}
    self.unitRecords = {}
    self.ready = false
end
function CUnitManager.prototype.initPriority(self)
    return 8
end
function CUnitManager.prototype.init(self, reload)
    self:Clear()
    self:CollectExistingUnits()
    self:StartGridUpdate()
    Event:Register("npc_spawned", self.OnNPCSpawned, self)
    GameEvent("npc_spawned", self.OnGameNPCSpawned, self)
    self.ready = true
    GameEvent(
        "entity_killed",
        function(self, ...)
            return self:OnEntityKilled(...)
        end,
        self
    )
end
function CUnitManager.prototype.reset(self)
    self:Clear()
    self:CollectExistingUnits()
    self:StartGridUpdate()
    self.ready = true
end
function CUnitManager.prototype.SetCellSize(self, cellSize)
    self.cellSize = math.max(128, cellSize)
    self:RebuildGrid()
end
function CUnitManager.prototype.SetUpdateInterval(self, interval)
    self.updateInterval = math.max(
        FrameTime(),
        interval
    )
    self:StartGridUpdate()
end
function CUnitManager.prototype.AddUnit(self, unit)
    if not self:IsSearchableUnit(unit) then
        return
    end
    self:UpdateUnitGrid(unit)
end
function CUnitManager.prototype.HasUnit(self, unit)
    if not IsValid(unit) then
        return false
    end
    return self.unitRecords[unit:entindex()] ~= nil
end
function CUnitManager.prototype.IsUnitIndexValid(self, unit)
    if not self:IsSearchableUnit(unit) then
        return false
    end
    local entindex = unit:entindex()
    local record = self.unitRecords[entindex]
    if record == nil then
        return false
    end
    local cellKey = self:GetCellKey(unit:GetAbsOrigin())
    local cell = self.cells[cellKey]
    return record.cellKey == cellKey and self:CellHasUnit(cell, entindex)
end
function CUnitManager.prototype.RepairUnitIndex(self, unit)
    if not self:IsSearchableUnit(unit) then
        return false
    end
    self:RemoveUnitFromAllCells(unit:entindex())
    self:UpdateUnitGrid(unit)
    return self:IsUnitIndexValid(unit)
end
function CUnitManager.prototype.GetUnitIndexReport(self, unit)
    if not IsValid(unit) then
        return {valid = false}
    end
    local entindex = unit:entindex()
    local position = unit:GetAbsOrigin()
    local currentCellKey = self:GetCellKey(position)
    local record = self.unitRecords[entindex]
    local ____entindex_3 = entindex
    local ____temp_4 = unit:GetUnitName()
    local ____temp_5 = unit:GetTeamNumber()
    local ____temp_6 = self:GetReportVector(position)
    local ____currentCellKey_7 = currentCellKey
    local ____temp_8 = record and record.cellKey
    local ____temp_9 = record ~= nil
    local ____temp_10 = self:CellHasUnit(self.cells[currentCellKey], entindex)
    local ____temp_2
    if record ~= nil then
        ____temp_2 = self:CellHasUnit(self.cells[record.cellKey], entindex)
    else
        ____temp_2 = false
    end
    return {
        valid = true,
        entindex = ____entindex_3,
        name = ____temp_4,
        team = ____temp_5,
        position = ____temp_6,
        currentCellKey = ____currentCellKey_7,
        recordCellKey = ____temp_8,
        hasRecord = ____temp_9,
        inCurrentCell = ____temp_10,
        inRecordCell = ____temp_2
    }
end
function CUnitManager.prototype.RemoveUnit(self, unit)
    if not IsValid(unit) then
        return
    end
    local entindex = unit:entindex()
    local record = self.unitRecords[entindex]
    if record == nil then
        return
    end
    self:RemoveUnitFromCell(entindex, record.cellKey)
    __TS__Delete(self.unitRecords, entindex)
end
function CUnitManager.prototype.Clear(self)
    self.ready = false
    if self.updateTimerId ~= nil and Timer ~= nil then
        Timer:StopTimer(self.updateTimerId)
        self.updateTimerId = nil
    end
    self.cells = {}
    self.unitRecords = {}
end
function CUnitManager.prototype.IsReady(self)
    return self.ready
end
function CUnitManager.prototype.FindUnits(self, options)
    local bounds = self:GetSearchBounds(options)
    local candidates = self:GetUnitsInBounds(bounds)
    local result = {}
    local seen = {}
    for ____, unit in ipairs(candidates) do
        do
            if not self:IsSearchableUnit(unit) then
                self:RemoveUnit(unit)
                goto __continue26
            end
            local entindex = unit:entindex()
            if seen[entindex] == true then
                goto __continue26
            end
            seen[entindex] = true
            if not self:MatchUnitFilter(unit, options) then
                goto __continue26
            end
            if not self:MatchShape(unit, options) then
                goto __continue26
            end
            result[#result + 1] = unit
        end
        ::__continue26::
    end
    self:SortUnits(result, options)
    return result
end
function CUnitManager.prototype.FindUnitsInRadius(self, teamNumber, position, radius, teamFilter, typeFilter, flagFilter, order)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    local options = {
        shape = UnitSearchShape.RADIUS,
        teamNumber = teamNumber,
        position = position,
        radius = radius,
        teamFilter = teamFilter,
        typeFilter = typeFilter,
        flagFilter = flagFilter,
        order = order
    }
    local units = self:FindUnits(options)
    local engineUnits = self.useEngineFallbackOnMismatch and (FindUnitsInRadius_Engine and FindUnitsInRadius_Engine(
        teamNumber,
        position,
        nil,
        radius,
        teamFilter,
        typeFilter,
        flagFilter,
        order,
        false
    )) or nil
    return self:UseEngineFallbackIfMismatch(units, engineUnits, options)
end
function CUnitManager.prototype.FindUnitsInLine(self, teamNumber, start, ____end, width, teamFilter, typeFilter, flagFilter, order)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    local options = {
        shape = UnitSearchShape.LINE,
        teamNumber = teamNumber,
        start = start,
        ["end"] = ____end,
        width = width,
        teamFilter = teamFilter,
        typeFilter = typeFilter,
        flagFilter = flagFilter,
        order = order
    }
    local units = self:FindUnits(options)
    local engineUnits = self.useEngineFallbackOnMismatch and (FindUnitsInLine_Engine and FindUnitsInLine_Engine(
        teamNumber,
        start,
        ____end,
        nil,
        width,
        teamFilter,
        typeFilter,
        flagFilter
    )) or nil
    return self:UseEngineFallbackIfMismatch(units, engineUnits, options)
end
function CUnitManager.prototype.FindUnitsInSector(self, teamNumber, position, radius, forwardVector, angle, teamFilter, typeFilter, flagFilter, order)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    return self:FindUnits({
        shape = UnitSearchShape.SECTOR,
        teamNumber = teamNumber,
        position = position,
        radius = radius,
        forwardVector = forwardVector,
        angle = angle,
        teamFilter = teamFilter,
        typeFilter = typeFilter,
        flagFilter = flagFilter,
        order = order
    })
end
function CUnitManager.prototype.FindUnitsInTruncatedSector(self, teamNumber, position, innerRadius, outerRadius, forwardVector, angle, teamFilter, typeFilter, flagFilter, order)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    return self:FindUnits({
        shape = UnitSearchShape.TRUNCATED_SECTOR,
        teamNumber = teamNumber,
        position = position,
        innerRadius = innerRadius,
        outerRadius = outerRadius,
        forwardVector = forwardVector,
        angle = angle,
        teamFilter = teamFilter,
        typeFilter = typeFilter,
        flagFilter = flagFilter,
        order = order
    })
end
function CUnitManager.prototype.FindUnitsInRadiusWithAbility(self, caster, position, radius, ability, order)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    if not IsValid(caster) or not IsValid(ability) then
        return {}
    end
    return self:FindUnitsInRadius(
        caster:GetTeamNumber(),
        position,
        radius,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags(),
        order
    )
end
function CUnitManager.prototype.OnNPCSpawned(self, event)
    self:AddUnit(event.unit)
end
function CUnitManager.prototype.OnGameNPCSpawned(self, event)
    self:AddUnit(EntIndexToHScript(event.entindex))
end
function CUnitManager.prototype.OnEntityKilled(self, event)
    local killedUnit = EntIndexToHScript(event.entindex_killed)
    if not IsValid(killedUnit) then
        return
    end
    self:RemoveUnit(killedUnit)
end
function CUnitManager.prototype.StartGridUpdate(self)
    if self.updateTimerId ~= nil then
        Timer:StopTimer(self.updateTimerId)
        self.updateTimerId = nil
    end
    self.updateTimerId = Timer:GameTimer(
        self.updateInterval,
        function()
            self:RefreshMovedUnits()
            return self.updateInterval
        end
    )
end
function CUnitManager.prototype.CollectExistingUnits(self)
    local units = Entities:FindAllByClassname("npc_dota_*")
    for ____, unit in ipairs(units) do
        self:AddUnit(unit)
    end
end
function CUnitManager.prototype.RefreshMovedUnits(self)
    local removedUnits = {}
    local updatedUnits = {}
    for _, record in pairs(self.unitRecords) do
        do
            if record == nil or not self:IsSearchableUnit(record.unit) then
                if record ~= nil then
                    removedUnits[#removedUnits + 1] = record.unit
                end
                goto __continue49
            end
            updatedUnits[#updatedUnits + 1] = record.unit
        end
        ::__continue49::
    end
    for ____, unit in ipairs(removedUnits) do
        self:RemoveUnit(unit)
    end
    for ____, unit in ipairs(updatedUnits) do
        self:UpdateUnitGrid(unit)
    end
end
function CUnitManager.prototype.RebuildGrid(self)
    self.cells = {}
    for _, record in pairs(self.unitRecords) do
        if record ~= nil and self:IsSearchableUnit(record.unit) then
            record.cellKey = self:GetCellKey(record.unit:GetAbsOrigin())
            local ____self_cells_15, ____record_cellKey_16 = self.cells, record.cellKey
            if ____self_cells_15[____record_cellKey_16] == nil then
                ____self_cells_15[____record_cellKey_16] = {}
            end
            local ____self_cells_record_cellKey_17 = self.cells[record.cellKey]
            ____self_cells_record_cellKey_17[#____self_cells_record_cellKey_17 + 1] = record.unit
        end
    end
end
function CUnitManager.prototype.UpdateUnitGrid(self, unit)
    local entindex = unit:entindex()
    local cellKey = self:GetCellKey(unit:GetAbsOrigin())
    local record = self.unitRecords[entindex]
    if record ~= nil then
        if record.cellKey ~= cellKey then
            self:RemoveUnitFromCell(entindex, record.cellKey)
            record.cellKey = cellKey
        end
        record.unit = unit
    else
        self.unitRecords[entindex] = {unit = unit, cellKey = cellKey, entindex = entindex}
    end
    local ____self_cells_18, ____cellKey_19 = self.cells, cellKey
    if ____self_cells_18[____cellKey_19] == nil then
        ____self_cells_18[____cellKey_19] = {}
    end
    if not self:CellHasUnit(self.cells[cellKey], entindex) then
        local ____self_cells_cellKey_20 = self.cells[cellKey]
        ____self_cells_cellKey_20[#____self_cells_cellKey_20 + 1] = unit
    end
end
function CUnitManager.prototype.RemoveUnitFromCell(self, entindex, cellKey)
    local cell = self.cells[cellKey]
    if cell == nil then
        return
    end
    do
        local i = #cell - 1
        while i >= 0 do
            local unit = cell[i + 1]
            if not IsValid(unit) or unit:entindex() == entindex then
                __TS__ArraySplice(cell, i, 1)
            end
            i = i - 1
        end
    end
    if #cell == 0 then
        __TS__Delete(self.cells, cellKey)
    end
end
function CUnitManager.prototype.RemoveUnitFromAllCells(self, entindex)
    local cellKeys = {}
    for cellKey in pairs(self.cells) do
        cellKeys[#cellKeys + 1] = cellKey
    end
    for ____, cellKey in ipairs(cellKeys) do
        self:RemoveUnitFromCell(entindex, cellKey)
    end
end
function CUnitManager.prototype.CellHasUnit(self, cell, entindex)
    if cell == nil then
        return false
    end
    for ____, unit in ipairs(cell) do
        if IsValid(unit) and unit:entindex() == entindex then
            return true
        end
    end
    return false
end
function CUnitManager.prototype.GetUnitsInBounds(self, bounds)
    local units = {}
    local minCellX = self:GetCellIndex(bounds.minX)
    local maxCellX = self:GetCellIndex(bounds.maxX)
    local minCellY = self:GetCellIndex(bounds.minY)
    local maxCellY = self:GetCellIndex(bounds.maxY)
    for x = minCellX, maxCellX, 1 do
        for y = minCellY, maxCellY, 1 do
            local cell = self.cells[self:MakeCellKey(x, y)]
            if cell ~= nil then
                for ____, unit in ipairs(cell) do
                    units[#units + 1] = unit
                end
            end
        end
    end
    return units
end
function CUnitManager.prototype.UseEngineFallbackIfMismatch(self, units, engineUnits, options)
    if engineUnits == nil then
        return units
    end
    if self:IsSameUnitList(units, engineUnits) then
        return units
    end
    for ____, unit in ipairs(engineUnits) do
        self:AddUnit(unit)
    end
    return engineUnits
end
function CUnitManager.prototype.IsSameUnitList(self, a, b)
    if #a ~= #b then
        return false
    end
    for i = 0, #a - 1, 1 do
        if not IsValid(a[i + 1]) or not IsValid(b[i + 1]) or a[i + 1]:entindex() ~= b[i + 1]:entindex() then
            return false
        end
    end
    return true
end
function CUnitManager.prototype.ReportSearchMismatch(self, units, engineUnits, options)
    if CommonService == nil then
        return
    end
    CommonService:CallAction(
        "/v1/log/report",
        0,
        {
            level = "Server",
            message = "[UnitManager] FindUnits mismatch " .. json.encode({
                options = self:GetReportOptions(options),
                unitManager = self:GetReportUnits(units),
                engine = self:GetReportUnits(engineUnits),
                missingFromUnitManager = self:GetMissingUnitReport(units, engineUnits),
                extraFromUnitManager = self:GetMissingUnitReport(engineUnits, units)
            })
        }
    )
end
function CUnitManager.prototype.GetReportOptions(self, options)
    local data = {
        shape = options.shape,
        teamNumber = options.teamNumber,
        teamFilter = options.teamFilter,
        typeFilter = options.typeFilter,
        flagFilter = options.flagFilter,
        order = options.order
    }
    if options.shape == UnitSearchShape.RADIUS then
        data.position = self:GetReportVector(options.position)
        data.radius = options.radius
    elseif options.shape == UnitSearchShape.LINE then
        data.start = self:GetReportVector(options.start)
        data["end"] = self:GetReportVector(options["end"])
        data.width = options.width
    elseif options.shape == UnitSearchShape.SECTOR then
        data.position = self:GetReportVector(options.position)
        data.radius = options.radius
        data.forwardVector = self:GetReportVector(options.forwardVector)
        data.angle = options.angle
    else
        data.position = self:GetReportVector(options.position)
        data.innerRadius = options.innerRadius
        data.outerRadius = options.outerRadius
        data.forwardVector = self:GetReportVector(options.forwardVector)
        data.angle = options.angle
    end
    return data
end
function CUnitManager.prototype.GetReportUnits(self, units)
    local result = {}
    for ____, unit in ipairs(units) do
        result[#result + 1] = self:GetReportUnit(unit)
    end
    return result
end
function CUnitManager.prototype.GetMissingUnitReport(self, baseUnits, compareUnits)
    local baseSet = {}
    for ____, unit in ipairs(baseUnits) do
        if IsValid(unit) then
            baseSet[unit:entindex()] = true
        end
    end
    local result = {}
    for ____, unit in ipairs(compareUnits) do
        if IsValid(unit) and baseSet[unit:entindex()] ~= true then
            result[#result + 1] = self:GetReportUnit(unit)
        end
    end
    return result
end
function CUnitManager.prototype.GetReportUnit(self, unit)
    if not IsValid(unit) then
        return {valid = false}
    end
    return {
        valid = true,
        entindex = unit:entindex(),
        name = unit:GetUnitName(),
        team = unit:GetTeamNumber(),
        position = self:GetReportVector(unit:GetAbsOrigin()),
        cellKey = self:GetCellKey(unit:GetAbsOrigin()),
        inUnitRecords = self.unitRecords[unit:entindex()] ~= nil
    }
end
function CUnitManager.prototype.GetReportVector(self, position)
    return {
        x = math.floor(position.x),
        y = math.floor(position.y),
        z = math.floor(position.z)
    }
end
function CUnitManager.prototype.GetSearchBounds(self, options)
    if options.shape == UnitSearchShape.RADIUS then
        return self:BoundsFromCenter(options.position, options.radius)
    end
    if options.shape == UnitSearchShape.LINE then
        return {
            minX = math.min(options.start.x, options["end"].x) - options.width,
            maxX = math.max(options.start.x, options["end"].x) + options.width,
            minY = math.min(options.start.y, options["end"].y) - options.width,
            maxY = math.max(options.start.y, options["end"].y) + options.width
        }
    end
    if options.shape == UnitSearchShape.SECTOR then
        return self:BoundsFromCenter(options.position, options.radius)
    end
    return self:BoundsFromCenter(options.position, options.outerRadius)
end
function CUnitManager.prototype.BoundsFromCenter(self, position, radius)
    return {minX = position.x - radius, maxX = position.x + radius, minY = position.y - radius, maxY = position.y + radius}
end
function CUnitManager.prototype.MatchShape(self, unit, options)
    if options.shape == UnitSearchShape.RADIUS then
        return unit:IsPositionInRange(
            options.position,
            options.radius + unit:GetHullRadius()
        )
    end
    if options.shape == UnitSearchShape.LINE then
        return self:IsUnitInLine(unit, options.start, options["end"], options.width)
    end
    if options.shape == UnitSearchShape.SECTOR then
        return self:IsUnitInSector(
            unit,
            options.position,
            0,
            options.radius,
            options.forwardVector,
            options.angle
        )
    end
    return self:IsUnitInSector(
        unit,
        options.position,
        options.innerRadius,
        options.outerRadius,
        options.forwardVector,
        options.angle
    )
end
function CUnitManager.prototype.IsUnitInLine(self, unit, start, ____end, width)
    local position = unit:GetAbsOrigin()
    local segment = ____end - start
    segment.z = 0
    local lengthSq = segment.x * segment.x + segment.y * segment.y
    if lengthSq <= 0 then
        return unit:IsPositionInRange(
            start,
            width + unit:GetHullRadius()
        )
    end
    local toUnit = position - start
    toUnit.z = 0
    local t = Clamp((toUnit.x * segment.x + toUnit.y * segment.y) / lengthSq, 0, 1)
    local closest = Vector(start.x + segment.x * t, start.y + segment.y * t, start.z + (____end.z - start.z) * t)
    return unit:IsPositionInRange(
        closest,
        width + unit:GetHullRadius()
    )
end
function CUnitManager.prototype.IsUnitInSector(self, unit, position, innerRadius, outerRadius, forwardVector, angle)
    if VectorIsZero(forwardVector) or outerRadius <= 0 or angle <= 0 or innerRadius >= outerRadius then
        return false
    end
    local targetVector = unit:GetAbsOrigin() - position
    targetVector.z = 0
    if VectorIsZero(targetVector) then
        return innerRadius <= 0
    end
    local direction = Vector(forwardVector.x, forwardVector.y, 0):Normalized()
    local distance = targetVector:Length2D()
    if distance > outerRadius + unit:GetHullRadius() then
        return false
    end
    local theta = math.deg(math.acos(Clamp(
        direction:Dot(targetVector:Normalized()),
        -1,
        1
    )))
    if theta > angle / 2 then
        return false
    end
    if innerRadius <= 0 then
        return true
    end
    local innerChordDepth = innerRadius * math.cos(math.rad(angle / 2))
    local forwardDistance = direction:Dot(targetVector)
    return forwardDistance + unit:GetHullRadius() >= innerChordDepth
end
function CUnitManager.prototype.MatchUnitFilter(self, unit, options)
    return UnitFilter(
        unit,
        options.teamFilter,
        options.typeFilter,
        options.flagFilter,
        options.teamNumber
    ) == UF_SUCCESS
end
function CUnitManager.prototype.SortUnits(self, units, options)
    local order = options.order or FIND_ANY_ORDER
    if order == FIND_ANY_ORDER then
        return
    end
    local origin = self:GetOrderOrigin(options)
    __TS__ArraySort(
        units,
        function(____, a, b)
            local da = VectorDistanceSq(
                a:GetAbsOrigin(),
                origin
            )
            local db = VectorDistanceSq(
                b:GetAbsOrigin(),
                origin
            )
            return order == FIND_CLOSEST and da - db or db - da
        end
    )
end
function CUnitManager.prototype.GetOrderOrigin(self, options)
    if options.shape == UnitSearchShape.LINE then
        return options.start
    end
    return options.position
end
function CUnitManager.prototype.IsSearchableUnit(self, unit)
    return IsValid(unit) and type(unit.GetAbsOrigin) == "function" and type(unit.GetTeamNumber) == "function"
end
function CUnitManager.prototype.GetCellKey(self, position)
    return self:MakeCellKey(
        self:GetCellIndex(position.x),
        self:GetCellIndex(position.y)
    )
end
function CUnitManager.prototype.GetCellIndex(self, value)
    return math.floor(value / self.cellSize)
end
function CUnitManager.prototype.MakeCellKey(self, x, y)
    return (tostring(x) .. "_") .. tostring(y)
end
CUnitManager = __TS__DecorateLegacy({reloadable}, CUnitManager)
_G.UNIT_SEARCH_SHAPE = UnitSearchShape
if UnitManager == nil then
    UnitManager = __TS__New(CUnitManager)
end
local globalTable = _G
if globalTable.FindUnitsInRadius_Engine == nil then
    globalTable.FindUnitsInRadius_Engine = FindUnitsInRadius
    globalTable.FindUnitsInRadius = function(teamNumber, position, cacheUnit, radius, teamFilter, typeFilter, flagFilter, order, canGrowCache)
        if UnitManager ~= nil and UnitManager:IsReady() then
            return UnitManager:FindUnitsInRadius(
                teamNumber,
                position,
                radius,
                teamFilter,
                typeFilter,
                flagFilter,
                order
            )
        end
        return FindUnitsInRadius_Engine(
            teamNumber,
            position,
            cacheUnit,
            radius,
            teamFilter,
            typeFilter,
            flagFilter,
            order,
            canGrowCache
        )
    end
end
if globalTable.FindUnitsInLine_Engine == nil then
    globalTable.FindUnitsInLine_Engine = FindUnitsInLine
    globalTable.FindUnitsInLine = function(teamNumber, start, ____end, cacheUnit, width, teamFilter, typeFilter, flagFilter)
        if UnitManager ~= nil and UnitManager:IsReady() then
            return UnitManager:FindUnitsInLine(
                teamNumber,
                start,
                ____end,
                width,
                teamFilter,
                typeFilter,
                flagFilter
            )
        end
        return FindUnitsInLine_Engine(
            teamNumber,
            start,
            ____end,
            cacheUnit,
            width,
            teamFilter,
            typeFilter,
            flagFilter
        )
    end
end
return ____exports
