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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 1,["13"] = 1,["14"] = 6,["15"] = 6,["16"] = 6,["17"] = 6,["18"] = 6,["19"] = 67,["20"] = 68,["21"] = 70,["22"] = 70,["23"] = 71,["25"] = 71,["26"] = 72,["27"] = 73,["28"] = 74,["29"] = 76,["30"] = 77,["31"] = 78,["32"] = 70,["33"] = 80,["34"] = 81,["35"] = 80,["36"] = 84,["37"] = 85,["38"] = 86,["39"] = 87,["40"] = 88,["41"] = 89,["42"] = 90,["43"] = 91,["44"] = 91,["45"] = 91,["46"] = 91,["47"] = 91,["48"] = 91,["49"] = 91,["50"] = 84,["51"] = 94,["52"] = 95,["53"] = 94,["54"] = 98,["55"] = 99,["56"] = 100,["57"] = 98,["58"] = 103,["59"] = 104,["60"] = 104,["61"] = 104,["62"] = 104,["63"] = 105,["64"] = 103,["65"] = 108,["66"] = 109,["69"] = 110,["70"] = 108,["71"] = 113,["72"] = 114,["73"] = 114,["75"] = 115,["76"] = 113,["77"] = 118,["78"] = 119,["79"] = 119,["81"] = 120,["82"] = 121,["83"] = 122,["84"] = 122,["86"] = 123,["87"] = 124,["88"] = 125,["89"] = 118,["90"] = 128,["91"] = 129,["92"] = 129,["94"] = 130,["95"] = 131,["96"] = 132,["97"] = 128,["98"] = 135,["99"] = 136,["100"] = 136,["102"] = 137,["103"] = 138,["104"] = 139,["105"] = 140,["106"] = 143,["107"] = 144,["108"] = 145,["109"] = 146,["110"] = 147,["111"] = 148,["112"] = 149,["113"] = 150,["114"] = 151,["115"] = 151,["116"] = 151,["118"] = 151,["120"] = 141,["121"] = 141,["122"] = 141,["123"] = 141,["124"] = 141,["125"] = 141,["126"] = 141,["127"] = 141,["128"] = 141,["129"] = 141,["130"] = 141,["131"] = 141,["132"] = 135,["133"] = 155,["134"] = 156,["137"] = 157,["138"] = 158,["139"] = 159,["142"] = 160,["143"] = 161,["144"] = 155,["145"] = 164,["146"] = 165,["147"] = 166,["148"] = 167,["149"] = 168,["151"] = 170,["152"] = 171,["153"] = 164,["154"] = 174,["155"] = 175,["156"] = 174,["157"] = 178,["158"] = 179,["159"] = 180,["160"] = 181,["161"] = 182,["162"] = 184,["164"] = 185,["165"] = 186,["166"] = 187,["168"] = 190,["169"] = 191,["170"] = 191,["172"] = 192,["173"] = 194,["174"] = 194,["176"] = 195,["177"] = 195,["179"] = 196,["183"] = 199,["184"] = 200,["185"] = 178,["186"] = 203,["187"] = 203,["188"] = 203,["190"] = 204,["191"] = 204,["192"] = 204,["193"] = 204,["194"] = 204,["195"] = 204,["196"] = 204,["197"] = 204,["198"] = 204,["199"] = 204,["200"] = 214,["201"] = 215,["202"] = 215,["203"] = 215,["204"] = 215,["205"] = 215,["206"] = 215,["207"] = 215,["208"] = 215,["209"] = 215,["210"] = 215,["211"] = 215,["212"] = 216,["213"] = 203,["214"] = 219,["215"] = 219,["216"] = 219,["218"] = 220,["219"] = 220,["220"] = 220,["221"] = 220,["222"] = 220,["223"] = 220,["224"] = 220,["225"] = 220,["226"] = 220,["227"] = 220,["228"] = 220,["229"] = 231,["230"] = 232,["231"] = 232,["232"] = 232,["233"] = 232,["234"] = 232,["235"] = 232,["236"] = 232,["237"] = 232,["238"] = 232,["239"] = 232,["240"] = 233,["241"] = 219,["242"] = 236,["243"] = 236,["244"] = 236,["246"] = 237,["247"] = 237,["248"] = 237,["249"] = 237,["250"] = 237,["251"] = 237,["252"] = 237,["253"] = 237,["254"] = 237,["255"] = 237,["256"] = 237,["257"] = 237,["258"] = 236,["259"] = 251,["260"] = 251,["261"] = 251,["263"] = 252,["264"] = 252,["265"] = 252,["266"] = 252,["267"] = 252,["268"] = 252,["269"] = 252,["270"] = 252,["271"] = 252,["272"] = 252,["273"] = 252,["274"] = 252,["275"] = 252,["276"] = 251,["277"] = 267,["278"] = 267,["279"] = 267,["281"] = 268,["282"] = 268,["284"] = 269,["285"] = 269,["286"] = 269,["287"] = 269,["288"] = 269,["289"] = 269,["290"] = 269,["291"] = 269,["292"] = 269,["293"] = 267,["294"] = 272,["295"] = 273,["296"] = 272,["297"] = 276,["298"] = 277,["299"] = 276,["300"] = 280,["301"] = 281,["302"] = 282,["305"] = 283,["306"] = 280,["307"] = 286,["308"] = 287,["309"] = 288,["310"] = 289,["312"] = 292,["313"] = 292,["314"] = 292,["315"] = 293,["316"] = 294,["317"] = 292,["318"] = 292,["319"] = 286,["320"] = 298,["321"] = 299,["322"] = 300,["323"] = 301,["325"] = 298,["326"] = 305,["327"] = 306,["328"] = 307,["329"] = 309,["331"] = 310,["332"] = 311,["333"] = 312,["335"] = 314,["337"] = 316,["341"] = 319,["342"] = 320,["344"] = 323,["345"] = 324,["347"] = 305,["348"] = 328,["349"] = 329,["350"] = 330,["351"] = 331,["352"] = 332,["353"] = 333,["354"] = 333,["355"] = 333,["357"] = 334,["358"] = 334,["361"] = 328,["362"] = 339,["363"] = 340,["364"] = 341,["365"] = 342,["366"] = 343,["367"] = 344,["368"] = 345,["369"] = 346,["371"] = 348,["373"] = 350,["375"] = 356,["376"] = 356,["377"] = 356,["379"] = 357,["380"] = 358,["381"] = 358,["383"] = 339,["384"] = 362,["385"] = 363,["386"] = 364,["390"] = 365,["391"] = 365,["392"] = 366,["393"] = 367,["394"] = 368,["396"] = 365,["399"] = 371,["400"] = 372,["402"] = 362,["403"] = 376,["404"] = 377,["405"] = 378,["406"] = 379,["408"] = 381,["409"] = 382,["411"] = 376,["412"] = 386,["413"] = 387,["414"] = 387,["416"] = 388,["417"] = 389,["418"] = 389,["421"] = 391,["422"] = 386,["423"] = 394,["424"] = 395,["425"] = 396,["426"] = 397,["427"] = 398,["428"] = 399,["429"] = 401,["430"] = 402,["431"] = 403,["432"] = 404,["433"] = 405,["434"] = 406,["439"] = 412,["440"] = 394,["441"] = 415,["442"] = 416,["443"] = 416,["445"] = 417,["446"] = 417,["448"] = 420,["449"] = 421,["451"] = 423,["452"] = 415,["453"] = 426,["454"] = 427,["455"] = 427,["457"] = 428,["458"] = 429,["459"] = 429,["462"] = 431,["463"] = 426,["464"] = 434,["465"] = 435,["468"] = 436,["469"] = 436,["470"] = 436,["471"] = 436,["472"] = 436,["473"] = 438,["474"] = 438,["475"] = 438,["476"] = 438,["477"] = 438,["478"] = 438,["479"] = 436,["480"] = 436,["481"] = 436,["482"] = 434,["483"] = 448,["484"] = 449,["485"] = 449,["486"] = 449,["487"] = 449,["488"] = 449,["489"] = 449,["490"] = 449,["491"] = 449,["492"] = 458,["493"] = 459,["494"] = 460,["495"] = 461,["496"] = 462,["497"] = 463,["498"] = 464,["499"] = 465,["500"] = 466,["501"] = 467,["502"] = 468,["503"] = 469,["505"] = 471,["506"] = 472,["507"] = 473,["508"] = 474,["509"] = 475,["511"] = 478,["512"] = 448,["513"] = 481,["514"] = 482,["515"] = 483,["516"] = 484,["518"] = 486,["519"] = 481,["520"] = 489,["521"] = 490,["522"] = 491,["523"] = 492,["524"] = 493,["527"] = 497,["528"] = 498,["529"] = 499,["530"] = 500,["533"] = 503,["534"] = 489,["535"] = 506,["536"] = 507,["537"] = 508,["539"] = 510,["540"] = 510,["541"] = 510,["542"] = 510,["543"] = 510,["544"] = 510,["545"] = 510,["546"] = 510,["547"] = 510,["548"] = 506,["549"] = 521,["550"] = 522,["551"] = 522,["552"] = 522,["553"] = 522,["554"] = 522,["555"] = 521,["556"] = 529,["557"] = 530,["558"] = 531,["560"] = 534,["561"] = 535,["562"] = 535,["563"] = 535,["564"] = 535,["565"] = 535,["566"] = 535,["568"] = 543,["569"] = 544,["571"] = 547,["572"] = 529,["573"] = 550,["574"] = 551,["575"] = 550,["576"] = 559,["577"] = 560,["578"] = 561,["579"] = 561,["580"] = 561,["581"] = 561,["583"] = 564,["584"] = 565,["586"] = 568,["587"] = 569,["588"] = 569,["589"] = 569,["590"] = 569,["591"] = 569,["592"] = 569,["593"] = 569,["594"] = 569,["596"] = 572,["597"] = 572,["598"] = 572,["599"] = 572,["600"] = 572,["601"] = 572,["602"] = 572,["603"] = 572,["604"] = 559,["605"] = 575,["606"] = 576,["607"] = 577,["608"] = 578,["609"] = 579,["610"] = 580,["611"] = 581,["612"] = 581,["613"] = 581,["614"] = 581,["616"] = 584,["617"] = 585,["618"] = 586,["619"] = 587,["620"] = 588,["621"] = 588,["622"] = 588,["623"] = 588,["624"] = 575,["625"] = 591,["626"] = 592,["627"] = 592,["629"] = 594,["630"] = 595,["631"] = 596,["632"] = 596,["634"] = 598,["635"] = 599,["636"] = 600,["637"] = 600,["639"] = 602,["640"] = 602,["641"] = 602,["642"] = 602,["643"] = 602,["644"] = 603,["645"] = 603,["647"] = 605,["648"] = 605,["650"] = 606,["651"] = 607,["652"] = 608,["653"] = 591,["654"] = 611,["655"] = 612,["656"] = 612,["657"] = 612,["658"] = 612,["659"] = 612,["660"] = 612,["661"] = 612,["662"] = 611,["663"] = 615,["664"] = 616,["665"] = 617,["668"] = 619,["669"] = 620,["670"] = 620,["671"] = 620,["672"] = 621,["673"] = 621,["674"] = 621,["675"] = 621,["676"] = 622,["677"] = 622,["678"] = 622,["679"] = 622,["680"] = 623,["681"] = 620,["682"] = 620,["683"] = 615,["684"] = 627,["685"] = 628,["686"] = 628,["688"] = 629,["689"] = 627,["690"] = 632,["691"] = 633,["692"] = 632,["693"] = 636,["694"] = 637,["695"] = 637,["696"] = 637,["697"] = 637,["698"] = 636,["699"] = 640,["700"] = 641,["701"] = 640,["702"] = 644,["703"] = 645,["704"] = 644,["705"] = 70,["706"] = 655,["707"] = 656,["708"] = 656,["710"] = 658,["711"] = 659,["712"] = 660,["713"] = 661,["714"] = 662,["715"] = 663,["716"] = 663,["717"] = 663,["718"] = 663,["719"] = 663,["720"] = 663,["721"] = 663,["722"] = 663,["723"] = 663,["725"] = 665,["726"] = 665,["727"] = 665,["728"] = 665,["729"] = 665,["730"] = 665,["731"] = 665,["732"] = 665,["733"] = 665,["734"] = 665,["735"] = 665,["736"] = 661,["738"] = 669,["739"] = 670,["740"] = 671,["741"] = 672,["742"] = 673,["743"] = 673,["744"] = 673,["745"] = 673,["746"] = 673,["747"] = 673,["748"] = 673,["749"] = 673,["750"] = 673,["752"] = 675,["753"] = 675,["754"] = 675,["755"] = 675,["756"] = 675,["757"] = 675,["758"] = 675,["759"] = 675,["760"] = 675,["761"] = 675,["762"] = 671});
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
