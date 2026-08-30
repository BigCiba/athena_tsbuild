local __TSTL_FILE_PATH__ = "override/CDOTABaseAbility"
local ____lualib = require("lualib_bundle")
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__StringSubstring = ____lualib.__TS__StringSubstring
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 128,["8"] = 129,["9"] = 130,["10"] = 129,["11"] = 132,["12"] = 133,["15"] = 134,["16"] = 135,["19"] = 136,["20"] = 136,["21"] = 136,["22"] = 136,["23"] = 132,["24"] = 138,["25"] = 139,["26"] = 140,["27"] = 140,["28"] = 140,["29"] = 140,["31"] = 140,["32"] = 138,["33"] = 142,["34"] = 143,["35"] = 143,["36"] = 143,["37"] = 143,["38"] = 143,["39"] = 143,["40"] = 142,["41"] = 147,["42"] = 147,["44"] = 148,["45"] = 148,["47"] = 150,["48"] = 151,["49"] = 151,["51"] = 152,["52"] = 153,["53"] = 154,["54"] = 154,["55"] = 154,["57"] = 154,["59"] = 154,["60"] = 155,["61"] = 156,["63"] = 158,["64"] = 158,["65"] = 158,["67"] = 158,["68"] = 159,["69"] = 159,["70"] = 159,["72"] = 159,["73"] = 160,["74"] = 161,["76"] = 164,["77"] = 164,["78"] = 164,["79"] = 164,["80"] = 164,["81"] = 164,["82"] = 164,["83"] = 150,["84"] = 167,["85"] = 168,["86"] = 168,["87"] = 168,["88"] = 168,["89"] = 168,["90"] = 167,["91"] = 170,["92"] = 171,["93"] = 172,["97"] = 175,["98"] = 175,["99"] = 176,["100"] = 177,["101"] = 175,["104"] = 170,["105"] = 180,["106"] = 180,["107"] = 180,["109"] = 181,["110"] = 181,["112"] = 182,["113"] = 183,["114"] = 184,["115"] = 185,["117"] = 180,["118"] = 188,["119"] = 188,["120"] = 188,["122"] = 189,["123"] = 189,["125"] = 190,["126"] = 191,["127"] = 192,["128"] = 193,["130"] = 188,["131"] = 196,["132"] = 196,["133"] = 196,["135"] = 197,["136"] = 198,["137"] = 199,["138"] = 200,["140"] = 196,["141"] = 203,["142"] = 204,["143"] = 203,["144"] = 206,["145"] = 207,["146"] = 208,["147"] = 209,["148"] = 210,["149"] = 211,["150"] = 211,["151"] = 211,["152"] = 211,["153"] = 211,["154"] = 211,["158"] = 206,["159"] = 216,["160"] = 217,["162"] = 217,["164"] = 217,["165"] = 217,["166"] = 217,["168"] = 217,["169"] = 218,["170"] = 216,["171"] = 220,["172"] = 221,["173"] = 222,["174"] = 223,["176"] = 225,["177"] = 220,["178"] = 227,["179"] = 228,["180"] = 227,["181"] = 230,["182"] = 231,["183"] = 232,["184"] = 233,["186"] = 234,["187"] = 235,["189"] = 236,["192"] = 238,["195"] = 230,["196"] = 241,["197"] = 242,["198"] = 241,["199"] = 244,["200"] = 245,["201"] = 246,["203"] = 248,["204"] = 248,["205"] = 248,["206"] = 248,["207"] = 244,["208"] = 274,["209"] = 275,["210"] = 275,["212"] = 276,["213"] = 276,["214"] = 274,["215"] = 278,["216"] = 279,["217"] = 280,["218"] = 281,["219"] = 282,["222"] = 285,["223"] = 278,["224"] = 287,["225"] = 288,["226"] = 288,["228"] = 289,["229"] = 289,["230"] = 287,["231"] = 291,["232"] = 291,["233"] = 291,["235"] = 292,["238"] = 293,["239"] = 294,["240"] = 295,["242"] = 297,["243"] = 291,["244"] = 299,["245"] = 300,["246"] = 301,["247"] = 302,["248"] = 303,["249"] = 304,["250"] = 305,["251"] = 306,["252"] = 306,["253"] = 306,["254"] = 306,["255"] = 306,["256"] = 306,["257"] = 306,["258"] = 306,["259"] = 306,["261"] = 308,["263"] = 310,["264"] = 311,["265"] = 311,["266"] = 311,["267"] = 311,["268"] = 311,["269"] = 311,["270"] = 311,["271"] = 311,["272"] = 311,["274"] = 313,["276"] = 315,["277"] = 316,["278"] = 317,["280"] = 319,["281"] = 319,["282"] = 319,["283"] = 319,["284"] = 319,["285"] = 320,["286"] = 320,["287"] = 320,["288"] = 320,["289"] = 320,["290"] = 321,["291"] = 322,["292"] = 299,["293"] = 324,["294"] = 325,["295"] = 326,["296"] = 327,["297"] = 328,["298"] = 329,["299"] = 329,["300"] = 329,["301"] = 329,["302"] = 329,["303"] = 329,["304"] = 329,["305"] = 329,["306"] = 329,["307"] = 330,["308"] = 330,["309"] = 330,["310"] = 330,["311"] = 330,["312"] = 330,["313"] = 330,["314"] = 330,["315"] = 330,["317"] = 332,["318"] = 333,["320"] = 335,["321"] = 335,["322"] = 335,["323"] = 335,["324"] = 335,["325"] = 336,["326"] = 337,["327"] = 324,["328"] = 339,["329"] = 340,["330"] = 341,["331"] = 342,["332"] = 342,["333"] = 342,["334"] = 342,["335"] = 342,["336"] = 343,["337"] = 344,["338"] = 339,["339"] = 346,["340"] = 347,["341"] = 348,["342"] = 349,["343"] = 349,["344"] = 349,["345"] = 349,["346"] = 349,["347"] = 350,["348"] = 350,["349"] = 350,["350"] = 350,["351"] = 350,["352"] = 351,["353"] = 352,["354"] = 346,["355"] = 367,["356"] = 368,["357"] = 368,["359"] = 369,["360"] = 370,["361"] = 369,["362"] = 376,["363"] = 377,["364"] = 377,["366"] = 378,["367"] = 379,["368"] = 381,["369"] = 382,["370"] = 383,["371"] = 384,["372"] = 385,["373"] = 386,["374"] = 387,["376"] = 389,["377"] = 390,["378"] = 391,["380"] = 393,["382"] = 395,["383"] = 396,["385"] = 398,["386"] = 399,["388"] = 378,["389"] = 402,["390"] = 403,["391"] = 404,["392"] = 405,["393"] = 406,["394"] = 407,["395"] = 408,["396"] = 409,["397"] = 410,["398"] = 411,["399"] = 412,["400"] = 412,["401"] = 412,["402"] = 412,["403"] = 412,["404"] = 412,["408"] = 416,["409"] = 417,["410"] = 418,["411"] = 419,["412"] = 419,["413"] = 419,["414"] = 419,["415"] = 419,["416"] = 419,["420"] = 423,["421"] = 424,["422"] = 424,["424"] = 425,["425"] = 427,["426"] = 427,["429"] = 431,["430"] = 432,["431"] = 432,["432"] = 432,["434"] = 432,["435"] = 433,["436"] = 434,["437"] = 435,["438"] = 436,["439"] = 436,["440"] = 436,["441"] = 436,["442"] = 436,["443"] = 437,["444"] = 438,["445"] = 439,["446"] = 439,["447"] = 439,["448"] = 439,["449"] = 439,["450"] = 439,["455"] = 453,["456"] = 455,["457"] = 461,["458"] = 461,["459"] = 461,["460"] = 461,["461"] = 462,["462"] = 462,["464"] = 463,["465"] = 463,["467"] = 464,["468"] = 464,["470"] = 465,["471"] = 466,["473"] = 461,["474"] = 461,["476"] = 471,["477"] = 471,["478"] = 471,["479"] = 471,["480"] = 471,["481"] = 472,["483"] = 475,["484"] = 402,["485"] = 477,["486"] = 477,["487"] = 478,["488"] = 479,["489"] = 480,["490"] = 481,["491"] = 482,["492"] = 483,["493"] = 484,["494"] = 485,["495"] = 486,["496"] = 487,["497"] = 487,["498"] = 487,["499"] = 487,["500"] = 487,["501"] = 487,["505"] = 492,["506"] = 493,["507"] = 493,["508"] = 493,["510"] = 493,["511"] = 494,["512"] = 495,["513"] = 496,["514"] = 497,["515"] = 497,["516"] = 497,["517"] = 497,["518"] = 497,["519"] = 498,["520"] = 499,["521"] = 500,["522"] = 500,["523"] = 500,["524"] = 500,["525"] = 500,["526"] = 500,["531"] = 506,["532"] = 478,["533"] = 508,["534"] = 508,["535"] = 509,["536"] = 510,["537"] = 511,["538"] = 511,["539"] = 511,["540"] = 511,["541"] = 512,["542"] = 512,["543"] = 512,["544"] = 512,["545"] = 513,["546"] = 513,["547"] = 513,["548"] = 513,["549"] = 514,["550"] = 515,["551"] = 516,["552"] = 516,["553"] = 516,["554"] = 517,["555"] = 516,["556"] = 516,["558"] = 520,["559"] = 521,["560"] = 509,["561"] = 523,["562"] = 523,["563"] = 524,["564"] = 525,["565"] = 526,["566"] = 528,["567"] = 529,["569"] = 532,["570"] = 533,["572"] = 536,["573"] = 537,["574"] = 538,["576"] = 541,["577"] = 542,["579"] = 545,["580"] = 546,["582"] = 549,["583"] = 550,["585"] = 553,["586"] = 554,["588"] = 557,["589"] = 558,["591"] = 561,["592"] = 562,["594"] = 565,["595"] = 566,["597"] = 569,["598"] = 570,["600"] = 573,["601"] = 574,["603"] = 577,["604"] = 578,["606"] = 581,["607"] = 582,["609"] = 585,["610"] = 586,["612"] = 589,["613"] = 590,["615"] = 593,["616"] = 524,["617"] = 596,["618"] = 597,["619"] = 598,["621"] = 600,["622"] = 601,["624"] = 603,["625"] = 604,["627"] = 606,["628"] = 607,["630"] = 609,["631"] = 610,["633"] = 612,["634"] = 613,["636"] = 615,["637"] = 596,["638"] = 618,["639"] = 619,["640"] = 620,["641"] = 621,["642"] = 622,["644"] = 624,["645"] = 618,["646"] = 626,["647"] = 626,["648"] = 628,["649"] = 629,["651"] = 629,["653"] = 629,["654"] = 629,["655"] = 629,["657"] = 629,["658"] = 630,["659"] = 628,["660"] = 633,["661"] = 634,["662"] = 633,["663"] = 637,["664"] = 638,["665"] = 639,["666"] = 640,["667"] = 641,["668"] = 642,["669"] = 643,["671"] = 645,["672"] = 646,["673"] = 646,["674"] = 646,["675"] = 646,["677"] = 648,["678"] = 649,["680"] = 651,["681"] = 637,["682"] = 653,["683"] = 653,["684"] = 653,["686"] = 654,["687"] = 654,["688"] = 654,["689"] = 654,["690"] = 655,["691"] = 656,["693"] = 658,["694"] = 659,["695"] = 660,["697"] = 662,["698"] = 653,["699"] = 664,["700"] = 665,["701"] = 664,["702"] = 667,["703"] = 668,["704"] = 669,["705"] = 670,["706"] = 671,["707"] = 672,["708"] = 673,["709"] = 674,["710"] = 675,["711"] = 676,["712"] = 676,["713"] = 676,["714"] = 676,["715"] = 676,["716"] = 676,["717"] = 676,["718"] = 676,["719"] = 676,["720"] = 676,["721"] = 676,["722"] = 687,["723"] = 690,["726"] = 693,["727"] = 667,["729"] = 718,["730"] = 719,["731"] = 720,["732"] = 720,["734"] = 721,["735"] = 722,["738"] = 723,["739"] = 724,["740"] = 725,["741"] = 726,["742"] = 726,["743"] = 726,["744"] = 726,["745"] = 727,["746"] = 728,["748"] = 730,["749"] = 730,["750"] = 730,["751"] = 730,["752"] = 731,["753"] = 732,["754"] = 733,["755"] = 734,["756"] = 734,["757"] = 734,["758"] = 734,["759"] = 736,["760"] = 737,["761"] = 738,["763"] = 740,["764"] = 741,["765"] = 742,["766"] = 743,["767"] = 744,["768"] = 745,["770"] = 747,["771"] = 726,["772"] = 726,["773"] = 719,["774"] = 750,["775"] = 751,["776"] = 751,["778"] = 752,["779"] = 753,["780"] = 753,["781"] = 753,["782"] = 753,["783"] = 753,["784"] = 753,["785"] = 753,["786"] = 753,["787"] = 753,["788"] = 753,["789"] = 753,["790"] = 753,["791"] = 753,["792"] = 753,["793"] = 753,["794"] = 760,["795"] = 750});
DOTABaseAbility = IsServer() and CDOTABaseAbility or C_DOTABaseAbility
DOTABaseAbility.IsAbility = function(self)
    return true
end
DOTABaseAbility.SaveData = function(self, key, value)
    if not IsValid(self) then
        return
    end
    local caster = self:GetCaster()
    if not IsValid(caster) then
        return
    end
    caster:SaveData(
        self:GetAbilityName() .. key,
        value
    )
end
DOTABaseAbility.LoadData = function(self, key, defaultValue)
    local caster = self:GetCaster()
    local ____opt_0 = caster._saveData_
    local ____temp_2 = ____opt_0 and ____opt_0[self:GetAbilityName() .. key]
    if ____temp_2 == nil then
        ____temp_2 = defaultValue
    end
    return ____temp_2
end
DOTABaseAbility.PRD = function(self, chance, pseudo_random_recording)
    return PRD(
        nil,
        self:GetCaster(),
        chance,
        pseudo_random_recording or self:GetName()
    )
end
if DOTABaseAbility.GetLevelSpecialValueFor_Engine == nil then
    DOTABaseAbility.GetLevelSpecialValueFor_Engine = DOTABaseAbility.GetLevelSpecialValueFor
end
if DOTABaseAbility.GetSpecialValueFor_Engine == nil then
    DOTABaseAbility.GetSpecialValueFor_Engine = DOTABaseAbility.GetSpecialValueFor
end
DOTABaseAbility.GetLevelSpecialValueFor = function(self, key, level, caster)
    if not IsValid(self) then
        return 0
    end
    caster = caster or self:GetCaster()
    local abilityName = self:GetAbilityName()
    local ____table_IsItem_result_3
    if self:IsItem() then
        ____table_IsItem_result_3 = KeyValues.items[abilityName]
    else
        ____table_IsItem_result_3 = KeyValues.abilities[abilityName]
    end
    local abilityKV = ____table_IsItem_result_3
    if abilityKV == nil then
        return 0
    end
    local ____abilityKV_AbilityValues_4 = abilityKV.AbilityValues
    if ____abilityKV_AbilityValues_4 == nil then
        ____abilityKV_AbilityValues_4 = {}
    end
    local AbilityValues = ____abilityKV_AbilityValues_4
    local ____abilityKV_key_5 = abilityKV[key]
    if ____abilityKV_key_5 == nil then
        ____abilityKV_key_5 = AbilityValues[key]
    end
    local valueKV = ____abilityKV_key_5
    local baseValue = GetAbilityValues(valueKV, level, caster)
    if key == "abilitycharges" then
    end
    return AbilityUpgrade:GetUpgradedValue(
        caster,
        abilityName,
        level,
        key,
        baseValue
    )
end
DOTABaseAbility.GetSpecialValueFor = function(self, key, caster)
    return self:GetLevelSpecialValueFor(
        key,
        self:GetLevel(),
        caster
    )
end
DOTABaseAbility.GetSpecialValue = function(self)
    local entries = self.__AbilityValueEntries
    if entries == nil then
        return
    end
    do
        local i = 0
        while i < #entries do
            local entry = entries[i + 1]
            self[entry.propertyKey] = self:GetSpecialValueFor(entry.specialValueKey)
            i = i + 1
        end
    end
end
DOTABaseAbility.IncrementStackCount = function(self, stackCount, update)
    if update == nil then
        update = false
    end
    if self.__StackCount == nil then
        self.__StackCount = 0
    end
    self.__StackCount = self.__StackCount + (stackCount or 1)
    self:RefreshStaticProperty()
    if update and self:IsItem() then
        self:GetCaster():UpdateAbilityNetData()
    end
end
DOTABaseAbility.DecrementStackCount = function(self, stackCount, update)
    if update == nil then
        update = false
    end
    if self.__StackCount == nil then
        self.__StackCount = 0
    end
    self.__StackCount = self.__StackCount - (stackCount or 1)
    self:RefreshStaticProperty()
    if update and self:IsItem() then
        self:GetCaster():UpdateAbilityNetData()
    end
end
DOTABaseAbility.SetStackCount = function(self, stackCount, update)
    if update == nil then
        update = false
    end
    self.__StackCount = stackCount
    self:RefreshStaticProperty()
    if update and self:IsItem() then
        self:GetCaster():UpdateAbilityNetData()
    end
end
DOTABaseAbility.GetStackCount = function(self)
    return self.__StackCount or 0
end
DOTABaseAbility.RefreshStaticProperty = function(self)
    local caster = self:GetCaster()
    if self.StaticProperty ~= nil then
        for property, value in pairs(self:StaticProperty()) do
            if PROPERTY_MAP_REVERSE[property] then
                PropertySystem:AddStaticProperty(
                    caster:entindex(),
                    PROPERTY_MAP_REVERSE[property],
                    self:GetName() .. tostring(self:entindex()),
                    value
                )
            end
        end
    end
end
DOTABaseAbility.GetAbilityTag = function(self)
    local ____opt_6 = KeyValues.abilities[self:GetAbilityName()]
    if ____opt_6 ~= nil then
        ____opt_6 = ____opt_6.AbilityTag
    end
    local ____opt_6_8 = ____opt_6
    if ____opt_6_8 == nil then
        ____opt_6_8 = "None"
    end
    local abilityTag = ____opt_6_8
    return AbilityTag[abilityTag]
end
DOTABaseAbility.GetMaxCharges = function(self)
    local charge = self:GetSpecialValueFor("abilitycharges")
    if charge > 0 then
        return 1 + charge
    end
    return 0
end
DOTABaseAbility.GetCharges = function(self)
    return self.__Charge
end
DOTABaseAbility.GetChargeRestoreTime = function(self)
    local cooldown = self:GetEffectiveCooldown(self:GetLevel() - 1)
    local abilityTag = self:GetAbilityTag()
    local caster = self:GetCaster()
    repeat
        local ____switch33 = abilityTag
        local ____cond33 = ____switch33 == AbilityTag.Defense
        if ____cond33 then
            return cooldown * (1 - GetAbilityChargeDefenseTime(caster) * 0.01)
        end
        do
            return cooldown
        end
    until true
end
DOTABaseAbility.IsChargeCooldownFrozen = function(self)
    return self.__IsChargeCooldownFrozen == true
end
DOTABaseAbility.GetChargeCooldownRemaining = function(self)
    if self:IsChargeCooldownFrozen() then
        return self.__ChargeFrozenCooldownRemaining or 0
    end
    return math.max(
        0,
        (self.__ChargeRestoreTime or GameRules:GetGameTime()) - GameRules:GetGameTime()
    )
end
DOTABaseAbility.AddParticle = function(self, particleID)
    if self.__ParticleIDs == nil then
        self.__ParticleIDs = {}
    end
    local ____self___ParticleIDs_9 = self.__ParticleIDs
    ____self___ParticleIDs_9[#____self___ParticleIDs_9 + 1] = particleID
end
DOTABaseAbility.DestroyParticles = function(self)
    if self.__ParticleIDs ~= nil then
        for i, particleID in ipairs(self.__ParticleIDs) do
            ParticleManager:DestroyParticle(particleID, false)
            ParticleManager:ReleaseParticleIndex(particleID)
        end
    end
    self.__ParticleIDs = {}
end
DOTABaseAbility.AddWarningParticle = function(self, particleID)
    if self.__WarningParticleIDs == nil then
        self.__WarningParticleIDs = {}
    end
    local ____self___WarningParticleIDs_10 = self.__WarningParticleIDs
    ____self___WarningParticleIDs_10[#____self___WarningParticleIDs_10 + 1] = particleID
end
DOTABaseAbility.DestroyWarningParticles = function(self, interrupted)
    if interrupted == nil then
        interrupted = false
    end
    if self.__WarningParticleIDs == nil then
        return
    end
    for ____, warnParticleId in ipairs(self.__WarningParticleIDs) do
        ParticleManager:DestroyParticle(warnParticleId, interrupted)
        ParticleManager:ReleaseParticleIndex(warnParticleId)
    end
    self.__WarningParticleIDs = {}
end
DOTABaseAbility.LineWarning = function(self, start, ____end, startWidth, endWidth, duration)
    local particleID = ParticleManager:CreateParticleForce("particles/generic_gameplay/creep_linear_warning_fx.vpcf", PATTACH_CUSTOMORIGIN, nil)
    local startUnit = start
    local startPosition = start
    local endUnit = ____end
    local endPosition = ____end
    if startUnit.GetAbsOrigin ~= nil then
        ParticleManager:SetParticleControlEnt(
            particleID,
            0,
            startUnit,
            PATTACH_ABSORIGIN_FOLLOW,
            nil,
            startUnit:GetAbsOrigin(),
            true
        )
    else
        ParticleManager:SetParticleControl(particleID, 0, startPosition)
    end
    if endUnit.GetAbsOrigin ~= nil then
        ParticleManager:SetParticleControlEnt(
            particleID,
            1,
            endUnit,
            PATTACH_ABSORIGIN_FOLLOW,
            nil,
            endUnit:GetAbsOrigin(),
            true
        )
    else
        ParticleManager:SetParticleControl(particleID, 1, endPosition)
    end
    if duration == nil then
        duration = endWidth
        endWidth = startWidth
    end
    ParticleManager:SetParticleControl(
        particleID,
        2,
        Vector(duration, startWidth, endWidth)
    )
    ParticleManager:SetParticleControl(
        particleID,
        15,
        Vector(1, 0, 0)
    )
    self:AddWarningParticle(particleID)
    return particleID
end
DOTABaseAbility.CircleWarning = function(self, start, radius, duration)
    local unit = start
    local position = start
    local particleID = ParticleManager:CreateParticleForce("particles/warning/circular.vpcf", PATTACH_CUSTOMORIGIN, nil)
    if unit.GetAbsOrigin ~= nil then
        ParticleManager:SetParticleControlEnt(
            particleID,
            0,
            unit,
            PATTACH_ABSORIGIN_FOLLOW,
            nil,
            unit:GetAbsOrigin(),
            true
        )
        ParticleManager:SetParticleControlEnt(
            particleID,
            1,
            unit,
            PATTACH_ABSORIGIN_FOLLOW,
            nil,
            unit:GetAbsOrigin(),
            true
        )
    else
        ParticleManager:SetParticleControl(particleID, 0, position)
        ParticleManager:SetParticleControl(particleID, 1, position)
    end
    ParticleManager:SetParticleControl(
        particleID,
        2,
        Vector(radius, duration, 0)
    )
    self:AddWarningParticle(particleID)
    return particleID
end
DOTABaseAbility.SectorWarning = function(self, start, direction, radius, angle, duration)
    local particleID = ParticleManager:CreateParticleForce("particles/warning/sector.vpcf", PATTACH_CUSTOMORIGIN, nil)
    ParticleManager:SetParticleControlTransformForward(particleID, 0, start, direction)
    ParticleManager:SetParticleControl(
        particleID,
        1,
        Vector(radius, angle, duration)
    )
    self:AddWarningParticle(particleID)
    return particleID
end
DOTABaseAbility.TruncatedSectorWarning = function(self, start, direction, innerRadius, outerRadius, angle, duration)
    local particleID = ParticleManager:CreateParticleForce("particles/warning/creep_sector_waring_fx.vpcf", PATTACH_CUSTOMORIGIN, nil)
    ParticleManager:SetParticleControlTransformForward(particleID, 0, start, direction)
    ParticleManager:SetParticleControl(
        particleID,
        1,
        Vector(innerRadius, outerRadius, angle)
    )
    ParticleManager:SetParticleControl(
        particleID,
        2,
        Vector(outerRadius, duration, 0)
    )
    self:AddWarningParticle(particleID)
    return particleID
end
DOTALuaAbility = IsServer() and CDOTA_Ability_Lua or C_DOTA_Ability_Lua
if DOTALuaAbility.GetCooldown_Engine == nil then
    DOTALuaAbility.GetCooldown_Engine = DOTALuaAbility.GetCooldown
end
DOTALuaAbility.GetCooldown = function(self, level)
    return self:GetCooldown_Engine(level)
end
if IsServer() then
    if CDOTABaseAbility.SetFrozenCooldown_Engine == nil then
        CDOTABaseAbility.SetFrozenCooldown_Engine = CDOTABaseAbility.SetFrozenCooldown
    end
    CDOTABaseAbility.SetFrozenCooldown = function(self, frozen)
        self:SetFrozenCooldown_Engine(frozen)
        local caster = self:GetCaster()
        local now = GameRules:GetGameTime()
        local hasChargeCooldown = self:GetMaxCharges() > 0 and self:GetCharges() < self:GetMaxCharges()
        if frozen then
            if not self:IsChargeCooldownFrozen() then
                self.__IsChargeCooldownFrozen = true
                self.__ChargeFrozenCooldownRemaining = hasChargeCooldown and math.max(0, self.__ChargeRestoreTime - now) or 0
            end
        elseif self:IsChargeCooldownFrozen() then
            if hasChargeCooldown then
                self.__ChargeRestoreTime = now + (self.__ChargeFrozenCooldownRemaining or 0)
            else
                self.__ChargeRestoreTime = now
            end
            self.__IsChargeCooldownFrozen = false
            self.__ChargeFrozenCooldownRemaining = 0
        end
        if IsValid(caster) then
            caster:UpdateAbilityNetData()
        end
    end
    CDOTABaseAbility.__OnCreated = function(self)
        self.__Charge = 0
        self.__ChargeRestoreTime = GameRules:GetGameTime()
        self.__IsChargeCooldownFrozen = false
        self.__ChargeFrozenCooldownRemaining = 0
        local caster = self:GetCaster()
        local playerID = caster:GetPlayerOwnerID()
        if self.StaticProperty ~= nil then
            for property, value in pairs(self:StaticProperty()) do
                if PROPERTY_MAP_REVERSE[property] then
                    PropertySystem:AddStaticProperty(
                        caster:entindex(),
                        PROPERTY_MAP_REVERSE[property],
                        self:GetName() .. tostring(self:entindex()),
                        value
                    )
                end
            end
        end
        if self.DynamicProperty ~= nil then
            for property, func in pairs(self:DynamicProperty()) do
                if PROPERTY_MAP_REVERSE[property] then
                    PropertySystem:RegisterDynamicProperty(
                        caster:entindex(),
                        PROPERTY_MAP_REVERSE[property],
                        self:GetName() .. tostring(self:entindex()),
                        func
                    )
                end
            end
        end
        if self.EventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            for event, listener in pairs(self:EventListener()) do
                local ____self___EventIDList_11 = self.__EventIDList
                ____self___EventIDList_11[#____self___EventIDList_11 + 1] = Event:RegisterForOwner(event, listener, caster)
            end
        end
        local abilityName = self:GetAbilityName()
        local ____KeyValues_abilities_abilityName_12 = KeyValues.abilities[abilityName]
        if ____KeyValues_abilities_abilityName_12 == nil then
            ____KeyValues_abilities_abilityName_12 = KeyValues.items[abilityName]
        end
        local kv = ____KeyValues_abilities_abilityName_12
        if kv ~= nil and kv.AbilityValues ~= nil and kv.AbilityValues ~= "" then
            for k, valueData in pairs(kv.AbilityValues) do
                if __TS__StringStartsWith(k, "item_") then
                    local value = GetAbilityValues(
                        valueData,
                        self:GetLevel(),
                        caster
                    )
                    local property = __TS__StringSubstring(k, 5)
                    if PROPERTY_MAP[property] ~= nil then
                        PropertySystem:AddStaticProperty(
                            caster:entindex(),
                            property,
                            ("item_" .. self:GetName()) .. tostring(self:entindex()),
                            value
                        )
                    end
                end
            end
        end
        local abilityTag = self:GetAbilityTag()
        if abilityTag == AbilityTag.Attack or abilityTag == AbilityTag.Skill or abilityTag == AbilityTag.Dodge or abilityTag == AbilityTag.Defense or abilityTag == AbilityTag.Ultimate then
            self:StartThink(
                0,
                "ChargeRestore",
                function()
                    if self:GetMaxCharges() <= 0 then
                        return 0
                    end
                    if self:GetChargeRestoreTime() <= 0 then
                        return 0
                    end
                    if self:IsChargeCooldownFrozen() then
                        return 0
                    end
                    if self:GetCharges() < self:GetMaxCharges() and GameRules:GetGameTime() >= self.__ChargeRestoreTime then
                        self:RestoreCharges()
                    end
                end
            )
        end
        if IsServer() and kv ~= nil and Service:GetPlayerSetting(
            playerID,
            "setting_switch_" .. tostring(kv.AbilityTag),
            false
        ) then
            self:ToggleAutoCast()
        end
        self:OnCreated()
    end
    CDOTABaseAbility.OnCreated = function(self)
    end
    CDOTABaseAbility.__OnRefresh = function(self)
        self.__Charge = 0
        self.__ChargeRestoreTime = GameRules:GetGameTime()
        self.__IsChargeCooldownFrozen = false
        self.__ChargeFrozenCooldownRemaining = 0
        local caster = self:GetCaster()
        if self.StaticProperty ~= nil then
            for property, value in pairs(self:StaticProperty()) do
                if PROPERTY_MAP_REVERSE[property] then
                    PropertySystem:AddStaticProperty(
                        caster:entindex(),
                        PROPERTY_MAP_REVERSE[property],
                        self:GetName() .. tostring(self:entindex()),
                        value
                    )
                end
            end
        end
        local abilityName = self:GetAbilityName()
        local ____KeyValues_abilities_abilityName_13 = KeyValues.abilities[abilityName]
        if ____KeyValues_abilities_abilityName_13 == nil then
            ____KeyValues_abilities_abilityName_13 = KeyValues.items[abilityName]
        end
        local kv = ____KeyValues_abilities_abilityName_13
        if kv ~= nil and kv.AbilityValues ~= nil and kv.AbilityValues ~= "" then
            for k, valueData in pairs(kv.AbilityValues) do
                if __TS__StringStartsWith(k, "item_") then
                    local value = GetAbilityValues(
                        valueData,
                        self:GetLevel(),
                        caster
                    )
                    local property = __TS__StringSubstring(k, 5)
                    if PROPERTY_MAP[property] ~= nil then
                        PropertySystem:AddStaticProperty(
                            caster:entindex(),
                            property,
                            ("item_" .. self:GetName()) .. tostring(self:entindex()),
                            value
                        )
                    end
                end
            end
        end
        self:OnRefresh()
    end
    CDOTABaseAbility.OnRefresh = function(self)
    end
    CDOTABaseAbility.__OnDestroy = function(self)
        local caster = self:GetCaster()
        PropertySystem:RemoveStaticProperty(
            caster:entindex(),
            self:GetName() .. tostring(self:entindex())
        )
        PropertySystem:RemoveStaticProperty(
            caster:entindex(),
            ("item_" .. self:GetName()) .. tostring(self:entindex())
        )
        PropertySystem:UnregisterDynamicProperty(
            caster:entindex(),
            self:GetName() .. tostring(self:entindex())
        )
        PropertySystem:ClearAbilityStaticProperties(self)
        if self.__EventIDList ~= nil then
            __TS__ArrayForEach(
                self.__EventIDList,
                function(____, eventID)
                    Event:Unregister(eventID)
                end
            )
        end
        self:DestroyParticles()
        self:OnDestroy()
    end
    CDOTABaseAbility.OnDestroy = function(self)
    end
    CDOTABaseAbility.IsAbilityReady = function(self)
        local hCaster = self:GetCaster()
        local iBehavior = self:GetBehaviorInt()
        if not IsValid(hCaster) then
            return false
        end
        if not (hCaster:IsAlive() or bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) == DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) then
            return false
        end
        local hAbility = hCaster:GetCurrentActiveAbility()
        if IsValid(hAbility) and hAbility:IsInAbilityPhase() then
            return false
        end
        if self:GetLevel() <= 0 then
            return false
        end
        if self:IsHidden() then
            return false
        end
        if not self:IsActivated() then
            return false
        end
        if not self:IsCooldownReady() then
            return false
        end
        if not self:IsOwnersManaEnough() then
            return false
        end
        if not self:IsOwnersGoldEnough(hCaster:GetPlayerOwnerID()) then
            return false
        end
        if hCaster:IsHexed() or hCaster:IsCommandRestricted() then
            return false
        end
        if bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE) ~= DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE and hCaster:IsStunned() then
            return false
        end
        if not self:IsItem() and not self:IsPassive() and hCaster:IsSilenced() then
            return false
        end
        if not self:IsItem() and self:IsPassive() and hCaster:PassivesDisabled() then
            return false
        end
        if self:IsItem() and not self:IsPassive() and hCaster:IsMuted() then
            return false
        end
        if bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR_IMMEDIATE) ~= DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR_IMMEDIATE and hCaster:IsChanneling() then
            return false
        end
        if not self:IsFullyCastable() then
            return false
        end
        return true
    end
    CDOTABaseAbility.CanProcsCast = function(self)
        if not IsValid(self) then
            return false
        end
        if not self:IsAbility() then
            return false
        end
        if self:IsItem() then
            return false
        end
        if self:IsPassive() then
            return false
        end
        if self:IsToggle() then
            return false
        end
        if not self:ProcsMagicStick() then
            return false
        end
        return true
    end
    CDOTABaseAbility.ReduceCooldown = function(self, reduce)
        local remaining = self:GetCooldownTimeRemaining()
        self:EndCooldown()
        if remaining > reduce then
            self:StartCooldown(remaining - reduce)
        end
        self:RefreshCharges()
    end
    CDOTABaseAbility.OnController = function(self, position, direction)
    end
    CDOTABaseAbility.GetDamageType = function(self)
        local ____opt_14 = KeyValues.abilities[self:GetAbilityName()]
        if ____opt_14 ~= nil then
            ____opt_14 = ____opt_14.AbilityDamageType
        end
        local ____opt_14_16 = ____opt_14
        if ____opt_14_16 == nil then
            ____opt_14_16 = "DAMAGE_TYPE_NONE"
        end
        local kvDamageType = ____opt_14_16
        return EOM_DAMAGE_TYPES[kvDamageType]
    end
    CDOTABaseAbility.UseCooldown = function(self)
        self:UseResources(false, false, false, true)
    end
    CDOTABaseAbility.UseCharges = function(self)
        if self.__Charge > 0 then
            local wasChargeCooldownFrozen = self:IsChargeCooldownFrozen()
            local frozenCooldownRemaining = self.__ChargeFrozenCooldownRemaining or 0
            self.__Charge = self.__Charge - 1
            if self.__ChargeRestoreTime < GameRules:GetGameTime() then
                self.__ChargeRestoreTime = GameRules:GetGameTime() + self:GetChargeRestoreTime()
            end
            if wasChargeCooldownFrozen then
                self.__ChargeFrozenCooldownRemaining = frozenCooldownRemaining > 0 and frozenCooldownRemaining or math.max(
                    0,
                    self.__ChargeRestoreTime - GameRules:GetGameTime()
                )
            end
            self:GetCaster():UpdateAbilityNetData()
            return true
        end
        return false
    end
    CDOTABaseAbility.RestoreCharges = function(self, charges)
        if charges == nil then
            charges = 1
        end
        self.__Charge = math.min(
            self.__Charge + charges,
            self:GetMaxCharges()
        )
        if self.__Charge < self:GetMaxCharges() then
            self.__ChargeRestoreTime = GameRules:GetGameTime() + self:GetChargeRestoreTime()
        else
            self.__ChargeRestoreTime = GameRules:GetGameTime()
            self.__IsChargeCooldownFrozen = false
            self.__ChargeFrozenCooldownRemaining = 0
        end
        self:GetCaster():UpdateAbilityNetData()
    end
    CDOTABaseAbility.GetCastCooldown = function(self)
        return 0
    end
    CDOTABaseAbility.GetSupportCastPoint = function(self)
        local caster = self:GetCaster()
        local playerID = caster:GetPlayerOwnerID()
        local animMode = Service:GetPlayerSetting(playerID, "aim_mode", 2)
        local position = self:GetCursorPosition()
        if animMode == 3 then
            return position
        elseif animMode == 2 then
            local animDistance = Service:GetPlayerSetting(playerID, "Setting_aim_distance", 300)
            local targets = FindUnitsInRadius(
                caster:GetTeamNumber(),
                position,
                nil,
                animDistance,
                DOTA_UNIT_TARGET_TEAM_ENEMY,
                DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
                DOTA_UNIT_TARGET_FLAG_NONE,
                FIND_CLOSEST,
                false
            )
            if targets[1] then
                return targets[1]:GetAbsOrigin()
            end
        end
        return position
    end
end
if IsServer() then
    CDOTABaseAbility.LockFacingTarget = function(self, target, turnRate, duration)
        if turnRate == nil then
            turnRate = 1
        end
        local caster = self:GetCaster()
        if not IsValid(caster) or not IsValid(target) then
            return
        end
        local lockDuration = duration or self:GetCastPoint()
        local endTime = lockDuration >= 0 and GameRules:GetGameTime() + lockDuration or -1
        local currentYaw = caster:GetLocalAngles().y
        self:StartThink(
            0,
            "LockFacingTarget",
            function()
                if not IsValid(self) or not IsValid(caster) or not IsValid(target) or not caster:IsAlive() or not target:IsAlive() then
                    return -1
                end
                local targetDirection = CalcDirection2D(
                    target:GetAbsOrigin(),
                    caster
                )
                local targetYaw = VectorToAngles(targetDirection).y
                local angleDiff = AngleDiff(targetYaw, currentYaw)
                local maxAngleChange = turnRate * FrameTime()
                local angleStep = math.max(
                    -maxAngleChange,
                    math.min(maxAngleChange, angleDiff)
                )
                local newYaw = currentYaw + angleStep
                if math.abs(angleDiff) <= maxAngleChange then
                    newYaw = targetYaw
                end
                caster:SetLocalAngles(0, newYaw, 0)
                caster:SetForwardVector(AnglesToVector(caster:GetLocalAngles()))
                caster:FaceTowards(caster:GetAbsOrigin() + caster:GetForwardVector())
                currentYaw = newYaw
                if endTime >= 0 and GameRules:GetGameTime() >= endTime then
                    return -1
                end
                return 0
            end
        )
    end
    CDOTABaseAbility.FacingSupport = function(self, start, target, turnRate, distance, duration, flowAngle)
        if turnRate == nil then
            turnRate = 1
        end
        local caster = self:GetCaster()
        local thinker = CreateModifierThinker(
            caster,
            self,
            "modifier_tracing_support",
            {
                duration = duration or self:GetCastPoint(),
                entindex = target:entindex(),
                flowAngle = flowAngle or 0,
                turnRate = turnRate,
                distance = distance or self:GetCastRange(vec3_zero, nil)
            },
            start,
            caster:GetTeamNumber(),
            false
        )
        return thinker
    end
end
