local __TSTL_FILE_PATH__ = "override/CDOTABaseAbility"
local ____lualib = require("lualib_bundle")
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__StringSubstring = ____lualib.__TS__StringSubstring
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 131,["9"] = 132,["10"] = 133,["11"] = 132,["12"] = 135,["13"] = 136,["16"] = 137,["17"] = 138,["20"] = 139,["21"] = 139,["22"] = 139,["23"] = 139,["24"] = 135,["25"] = 141,["26"] = 142,["27"] = 143,["28"] = 143,["29"] = 143,["30"] = 143,["32"] = 143,["33"] = 141,["34"] = 145,["35"] = 146,["36"] = 146,["37"] = 146,["38"] = 146,["39"] = 146,["40"] = 146,["41"] = 145,["42"] = 150,["43"] = 150,["45"] = 151,["46"] = 151,["48"] = 153,["49"] = 154,["50"] = 154,["52"] = 155,["53"] = 156,["54"] = 157,["55"] = 157,["56"] = 157,["58"] = 157,["60"] = 157,["61"] = 158,["62"] = 159,["64"] = 161,["65"] = 161,["66"] = 161,["68"] = 161,["69"] = 162,["70"] = 162,["71"] = 162,["73"] = 162,["74"] = 163,["75"] = 164,["77"] = 167,["78"] = 167,["79"] = 167,["80"] = 167,["81"] = 167,["82"] = 167,["83"] = 167,["84"] = 153,["85"] = 170,["86"] = 171,["87"] = 171,["88"] = 171,["89"] = 171,["90"] = 171,["91"] = 170,["92"] = 173,["93"] = 174,["94"] = 175,["98"] = 178,["99"] = 178,["100"] = 179,["101"] = 180,["102"] = 178,["105"] = 173,["106"] = 183,["107"] = 183,["108"] = 183,["110"] = 184,["111"] = 184,["113"] = 185,["114"] = 186,["115"] = 187,["116"] = 188,["118"] = 183,["119"] = 191,["120"] = 191,["121"] = 191,["123"] = 192,["124"] = 192,["126"] = 193,["127"] = 194,["128"] = 195,["129"] = 196,["131"] = 191,["132"] = 199,["133"] = 199,["134"] = 199,["136"] = 200,["137"] = 201,["138"] = 202,["139"] = 203,["141"] = 199,["142"] = 206,["143"] = 207,["144"] = 206,["145"] = 209,["146"] = 210,["147"] = 211,["148"] = 212,["149"] = 213,["150"] = 214,["151"] = 214,["152"] = 214,["153"] = 214,["154"] = 214,["155"] = 214,["159"] = 209,["160"] = 219,["161"] = 220,["163"] = 220,["165"] = 220,["166"] = 220,["167"] = 220,["169"] = 220,["170"] = 221,["171"] = 219,["172"] = 223,["173"] = 224,["174"] = 225,["175"] = 226,["177"] = 228,["178"] = 228,["179"] = 228,["181"] = 228,["183"] = 228,["184"] = 228,["185"] = 228,["186"] = 228,["187"] = 223,["188"] = 230,["189"] = 231,["190"] = 230,["191"] = 233,["192"] = 234,["193"] = 235,["194"] = 236,["196"] = 237,["197"] = 238,["199"] = 239,["202"] = 241,["205"] = 233,["206"] = 244,["207"] = 245,["208"] = 244,["209"] = 247,["210"] = 248,["211"] = 249,["213"] = 251,["214"] = 251,["215"] = 251,["216"] = 251,["217"] = 247,["218"] = 277,["219"] = 278,["220"] = 278,["222"] = 279,["223"] = 279,["224"] = 277,["225"] = 281,["226"] = 282,["227"] = 283,["228"] = 284,["229"] = 285,["232"] = 288,["233"] = 281,["234"] = 290,["235"] = 291,["236"] = 291,["238"] = 292,["239"] = 292,["240"] = 290,["241"] = 294,["242"] = 294,["243"] = 294,["245"] = 295,["248"] = 296,["249"] = 297,["250"] = 298,["252"] = 300,["253"] = 294,["254"] = 302,["255"] = 303,["256"] = 304,["257"] = 305,["258"] = 306,["259"] = 307,["260"] = 308,["261"] = 309,["262"] = 309,["263"] = 309,["264"] = 309,["265"] = 309,["266"] = 309,["267"] = 309,["268"] = 309,["269"] = 309,["271"] = 311,["273"] = 313,["274"] = 314,["275"] = 314,["276"] = 314,["277"] = 314,["278"] = 314,["279"] = 314,["280"] = 314,["281"] = 314,["282"] = 314,["284"] = 316,["286"] = 318,["287"] = 319,["288"] = 320,["290"] = 322,["291"] = 322,["292"] = 322,["293"] = 322,["294"] = 322,["295"] = 323,["296"] = 323,["297"] = 323,["298"] = 323,["299"] = 323,["300"] = 324,["301"] = 325,["302"] = 302,["303"] = 327,["304"] = 328,["305"] = 329,["306"] = 330,["307"] = 331,["308"] = 332,["309"] = 332,["310"] = 332,["311"] = 332,["312"] = 332,["313"] = 332,["314"] = 332,["315"] = 332,["316"] = 332,["317"] = 333,["318"] = 333,["319"] = 333,["320"] = 333,["321"] = 333,["322"] = 333,["323"] = 333,["324"] = 333,["325"] = 333,["327"] = 335,["328"] = 336,["330"] = 338,["331"] = 338,["332"] = 338,["333"] = 338,["334"] = 338,["335"] = 339,["336"] = 340,["337"] = 327,["338"] = 342,["339"] = 343,["340"] = 344,["341"] = 345,["342"] = 345,["343"] = 345,["344"] = 345,["345"] = 345,["346"] = 346,["347"] = 347,["348"] = 342,["349"] = 349,["350"] = 350,["351"] = 351,["352"] = 352,["353"] = 352,["354"] = 352,["355"] = 352,["356"] = 352,["357"] = 353,["358"] = 353,["359"] = 353,["360"] = 353,["361"] = 353,["362"] = 354,["363"] = 355,["364"] = 349,["365"] = 370,["366"] = 371,["367"] = 371,["369"] = 372,["370"] = 373,["371"] = 372,["372"] = 379,["373"] = 380,["374"] = 380,["376"] = 381,["377"] = 382,["378"] = 384,["379"] = 385,["380"] = 386,["381"] = 387,["382"] = 388,["383"] = 389,["384"] = 390,["386"] = 392,["387"] = 393,["388"] = 394,["390"] = 396,["392"] = 398,["393"] = 399,["395"] = 401,["396"] = 402,["398"] = 381,["399"] = 405,["400"] = 406,["401"] = 407,["402"] = 408,["403"] = 409,["404"] = 410,["405"] = 411,["406"] = 412,["407"] = 413,["408"] = 414,["409"] = 415,["410"] = 415,["411"] = 415,["412"] = 415,["413"] = 415,["414"] = 415,["418"] = 419,["419"] = 420,["420"] = 421,["421"] = 422,["422"] = 422,["423"] = 422,["424"] = 422,["425"] = 422,["426"] = 422,["430"] = 426,["431"] = 427,["432"] = 427,["434"] = 428,["435"] = 428,["436"] = 428,["437"] = 428,["438"] = 428,["439"] = 428,["440"] = 428,["441"] = 428,["443"] = 430,["444"] = 431,["445"] = 431,["447"] = 432,["448"] = 434,["449"] = 434,["452"] = 438,["453"] = 439,["454"] = 439,["455"] = 439,["457"] = 439,["458"] = 440,["460"] = 440,["461"] = 440,["463"] = 440,["464"] = 440,["466"] = 441,["467"] = 442,["468"] = 443,["469"] = 444,["470"] = 444,["471"] = 444,["472"] = 444,["473"] = 444,["474"] = 445,["475"] = 446,["476"] = 447,["477"] = 447,["478"] = 447,["479"] = 447,["480"] = 447,["481"] = 447,["486"] = 461,["487"] = 463,["489"] = 467,["491"] = 467,["492"] = 467,["494"] = 463,["496"] = 463,["497"] = 469,["498"] = 469,["499"] = 469,["500"] = 469,["501"] = 470,["502"] = 470,["504"] = 471,["505"] = 471,["507"] = 472,["508"] = 472,["510"] = 473,["511"] = 474,["513"] = 469,["514"] = 469,["516"] = 479,["517"] = 479,["518"] = 479,["519"] = 479,["520"] = 479,["521"] = 480,["523"] = 483,["524"] = 405,["525"] = 485,["526"] = 485,["527"] = 486,["528"] = 487,["529"] = 488,["530"] = 489,["531"] = 490,["532"] = 491,["533"] = 492,["534"] = 493,["535"] = 493,["537"] = 493,["539"] = 493,["540"] = 493,["542"] = 494,["543"] = 495,["544"] = 496,["545"] = 497,["546"] = 497,["547"] = 497,["548"] = 497,["549"] = 497,["550"] = 497,["554"] = 502,["555"] = 503,["556"] = 503,["557"] = 503,["559"] = 503,["560"] = 504,["561"] = 505,["562"] = 506,["563"] = 507,["564"] = 507,["565"] = 507,["566"] = 507,["567"] = 507,["568"] = 508,["569"] = 509,["570"] = 510,["571"] = 510,["572"] = 510,["573"] = 510,["574"] = 510,["575"] = 510,["580"] = 516,["581"] = 517,["582"] = 486,["583"] = 519,["584"] = 519,["585"] = 520,["586"] = 521,["587"] = 522,["588"] = 522,["589"] = 522,["590"] = 522,["591"] = 523,["592"] = 523,["593"] = 523,["594"] = 523,["595"] = 524,["596"] = 524,["597"] = 524,["598"] = 524,["599"] = 525,["600"] = 526,["601"] = 527,["602"] = 527,["603"] = 527,["604"] = 528,["605"] = 527,["606"] = 527,["608"] = 531,["609"] = 532,["610"] = 520,["611"] = 534,["612"] = 534,["613"] = 535,["614"] = 536,["615"] = 537,["616"] = 539,["617"] = 540,["619"] = 543,["620"] = 544,["622"] = 547,["623"] = 548,["624"] = 549,["626"] = 552,["627"] = 553,["629"] = 556,["630"] = 557,["632"] = 560,["633"] = 561,["635"] = 564,["636"] = 565,["638"] = 568,["639"] = 569,["641"] = 572,["642"] = 573,["644"] = 576,["645"] = 577,["647"] = 580,["648"] = 581,["650"] = 584,["651"] = 585,["653"] = 588,["654"] = 589,["656"] = 592,["657"] = 593,["659"] = 596,["660"] = 597,["662"] = 600,["663"] = 601,["665"] = 604,["666"] = 535,["667"] = 607,["668"] = 608,["669"] = 609,["671"] = 611,["672"] = 612,["674"] = 614,["675"] = 615,["677"] = 617,["678"] = 618,["680"] = 620,["681"] = 621,["683"] = 623,["684"] = 624,["686"] = 626,["687"] = 607,["688"] = 629,["689"] = 630,["690"] = 631,["691"] = 632,["692"] = 633,["694"] = 635,["695"] = 629,["696"] = 637,["697"] = 637,["698"] = 639,["699"] = 640,["701"] = 640,["703"] = 640,["704"] = 640,["705"] = 640,["707"] = 640,["708"] = 641,["709"] = 639,["710"] = 644,["711"] = 645,["712"] = 644,["713"] = 648,["714"] = 649,["715"] = 650,["716"] = 651,["717"] = 652,["718"] = 653,["719"] = 654,["720"] = 655,["722"] = 657,["723"] = 658,["724"] = 658,["725"] = 658,["726"] = 658,["728"] = 660,["729"] = 661,["730"] = 662,["732"] = 664,["733"] = 648,["734"] = 666,["735"] = 666,["736"] = 666,["738"] = 667,["739"] = 668,["740"] = 668,["741"] = 668,["742"] = 668,["743"] = 669,["745"] = 669,["746"] = 669,["748"] = 669,["750"] = 669,["752"] = 669,["753"] = 669,["755"] = 670,["756"] = 671,["758"] = 673,["759"] = 674,["760"] = 675,["762"] = 677,["763"] = 678,["764"] = 666,["765"] = 681,["766"] = 682,["769"] = 683,["770"] = 684,["771"] = 684,["772"] = 684,["773"] = 684,["774"] = 684,["775"] = 684,["776"] = 684,["777"] = 684,["778"] = 684,["779"] = 684,["780"] = 685,["781"] = 685,["783"] = 681,["784"] = 687,["785"] = 688,["786"] = 687,["787"] = 690,["788"] = 691,["789"] = 692,["790"] = 693,["791"] = 694,["792"] = 695,["793"] = 696,["794"] = 697,["795"] = 698,["796"] = 699,["797"] = 699,["798"] = 699,["799"] = 699,["800"] = 699,["801"] = 699,["802"] = 699,["803"] = 699,["804"] = 699,["805"] = 699,["806"] = 699,["807"] = 710,["808"] = 713,["811"] = 716,["812"] = 690,["814"] = 741,["815"] = 742,["816"] = 743,["817"] = 743,["819"] = 744,["820"] = 745,["823"] = 746,["824"] = 747,["825"] = 748,["826"] = 749,["827"] = 749,["828"] = 749,["829"] = 749,["830"] = 750,["831"] = 751,["833"] = 753,["834"] = 753,["835"] = 753,["836"] = 753,["837"] = 754,["838"] = 755,["839"] = 756,["840"] = 757,["841"] = 757,["842"] = 757,["843"] = 757,["844"] = 759,["845"] = 760,["846"] = 761,["848"] = 763,["849"] = 764,["850"] = 765,["851"] = 766,["852"] = 767,["853"] = 768,["855"] = 770,["856"] = 749,["857"] = 749,["858"] = 742,["859"] = 773,["860"] = 774,["861"] = 774,["863"] = 775,["864"] = 776,["865"] = 776,["866"] = 776,["867"] = 776,["868"] = 776,["869"] = 776,["870"] = 776,["871"] = 776,["872"] = 776,["873"] = 776,["874"] = 776,["875"] = 776,["876"] = 776,["877"] = 776,["878"] = 776,["879"] = 783,["880"] = 773});
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
    local ____math_max_12 = math.max
    local ____tonumber_11 = tonumber
    local ____opt_9 = KeyValues.abilities[self:GetAbilityName()]
    if ____opt_9 ~= nil then
        ____opt_9 = ____opt_9.CustomAbilityCharges
    end
    return ____math_max_12(
        0,
        ____tonumber_11(____opt_9) or 0
    )
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
    local ____self___ParticleIDs_13 = self.__ParticleIDs
    ____self___ParticleIDs_13[#____self___ParticleIDs_13 + 1] = particleID
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
    local ____self___WarningParticleIDs_14 = self.__WarningParticleIDs
    ____self___WarningParticleIDs_14[#____self___WarningParticleIDs_14 + 1] = particleID
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
        if IsServer() and self.UnitEventListener then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            __TS__ArrayPushArray(
                self.__EventIDList,
                Event:RegisterUnitListeners(
                    self:UnitEventListener(),
                    caster,
                    self
                )
            )
        end
        if self.EventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            for event, listener in pairs(self:EventListener()) do
                local ____self___EventIDList_15 = self.__EventIDList
                ____self___EventIDList_15[#____self___EventIDList_15 + 1] = Event:RegisterForOwner(event, listener, caster, self)
            end
        end
        local abilityName = self:GetAbilityName()
        local ____KeyValues_abilities_abilityName_16 = KeyValues.abilities[abilityName]
        if ____KeyValues_abilities_abilityName_16 == nil then
            ____KeyValues_abilities_abilityName_16 = KeyValues.items[abilityName]
        end
        local kv = ____KeyValues_abilities_abilityName_16
        local ____tonumber_20 = tonumber
        local ____opt_result_19
        if kv ~= nil then
            ____opt_result_19 = kv.CustomAbilityCharges
        end
        if (____tonumber_20(____opt_result_19) or 0) > 0 then
            self.__Charge = self:GetMaxCharges()
        end
        if not self:IsItem() and kv ~= nil and kv.AbilityValues ~= nil and kv.AbilityValues ~= "" then
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
        local ____temp_25 = abilityTag == AbilityTag.Attack or abilityTag == AbilityTag.Skill or abilityTag == AbilityTag.Dodge or abilityTag == AbilityTag.Defense or abilityTag == AbilityTag.Ultimate
        if not ____temp_25 then
            local ____tonumber_24 = tonumber
            local ____opt_result_23
            if kv ~= nil then
                ____opt_result_23 = kv.CustomAbilityCharges
            end
            ____temp_25 = (____tonumber_24(____opt_result_23) or 0) > 0
        end
        if ____temp_25 then
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
        local oldCharge = self.__Charge
        self.__Charge = 0
        self.__ChargeRestoreTime = GameRules:GetGameTime()
        self.__IsChargeCooldownFrozen = false
        self.__ChargeFrozenCooldownRemaining = 0
        local caster = self:GetCaster()
        local ____tonumber_28 = tonumber
        local ____opt_26 = KeyValues.abilities[self:GetAbilityName()]
        if ____opt_26 ~= nil then
            ____opt_26 = ____opt_26.CustomAbilityCharges
        end
        if (____tonumber_28(____opt_26) or 0) > 0 then
            self.__Charge = self:GetMaxCharges()
        end
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
        local ____KeyValues_abilities_abilityName_29 = KeyValues.abilities[abilityName]
        if ____KeyValues_abilities_abilityName_29 == nil then
            ____KeyValues_abilities_abilityName_29 = KeyValues.items[abilityName]
        end
        local kv = ____KeyValues_abilities_abilityName_29
        if not self:IsItem() and kv ~= nil and kv.AbilityValues ~= nil and kv.AbilityValues ~= "" then
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
        self:__NotifyChargeChanged(oldCharge)
        self:OnRefresh()
    end
    CDOTABaseAbility.OnRefresh = function(self)
    end
    CDOTABaseAbility.__OnDestroy = function(self)
        local caster = self:IsItem() and (self.__inventoryOwner or self:GetCaster()) or self:GetCaster()
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
        local ____opt_30 = KeyValues.abilities[self:GetAbilityName()]
        if ____opt_30 ~= nil then
            ____opt_30 = ____opt_30.AbilityDamageType
        end
        local ____opt_30_32 = ____opt_30
        if ____opt_30_32 == nil then
            ____opt_30_32 = "DAMAGE_TYPE_NONE"
        end
        local kvDamageType = ____opt_30_32
        return EOM_DAMAGE_TYPES[kvDamageType]
    end
    CDOTABaseAbility.UseCooldown = function(self)
        self:UseResources(false, false, false, true)
    end
    CDOTABaseAbility.UseCharges = function(self)
        if self.__Charge > 0 then
            local oldCharge = self.__Charge
            local wasChargeCooldownFrozen = self:IsChargeCooldownFrozen()
            local frozenCooldownRemaining = self.__ChargeFrozenCooldownRemaining or 0
            self.__Charge = self.__Charge - 1
            if oldCharge == self:GetMaxCharges() or self.__ChargeRestoreTime <= GameRules:GetGameTime() then
                self.__ChargeRestoreTime = GameRules:GetGameTime() + self:GetChargeRestoreTime()
            end
            if wasChargeCooldownFrozen then
                self.__ChargeFrozenCooldownRemaining = frozenCooldownRemaining > 0 and frozenCooldownRemaining or math.max(
                    0,
                    self.__ChargeRestoreTime - GameRules:GetGameTime()
                )
            end
            self:GetCaster():UpdateAbilityNetData()
            self:__NotifyChargeChanged(oldCharge)
            return true
        end
        return false
    end
    CDOTABaseAbility.RestoreCharges = function(self, charges)
        if charges == nil then
            charges = 1
        end
        local oldCharge = self.__Charge
        self.__Charge = math.min(
            self.__Charge + charges,
            self:GetMaxCharges()
        )
        local ____temp_36 = oldCharge == 0 and self.__Charge > 0
        if ____temp_36 then
            local ____tonumber_35 = tonumber
            local ____opt_33 = KeyValues.abilities[self:GetAbilityName()]
            if ____opt_33 ~= nil then
                ____opt_33 = ____opt_33.CustomAbilityCharges
            end
            ____temp_36 = (____tonumber_35(____opt_33) or 0) > 0
        end
        if ____temp_36 then
            self:EndCooldown()
        end
        if self.__Charge < self:GetMaxCharges() then
            self.__ChargeRestoreTime = GameRules:GetGameTime() + self:GetChargeRestoreTime()
        else
            self.__ChargeRestoreTime = GameRules:GetGameTime()
            self.__IsChargeCooldownFrozen = false
            self.__ChargeFrozenCooldownRemaining = 0
        end
        self:GetCaster():UpdateAbilityNetData()
        self:__NotifyChargeChanged(oldCharge)
    end
    CDOTABaseAbility.__NotifyChargeChanged = function(self, oldCharge)
        if not IsServer() or oldCharge == self.__Charge then
            return
        end
        local charge = self.__Charge
        Event:FireUnit(
            "ability_charge_changed",
            {
                unit = self:GetCaster(),
                ability = self,
                charge = charge,
                old_charge = oldCharge
            },
            self:GetCaster()
        )
        if IsValid(self) and self.OnAbilityChargeChanged then
            self:OnAbilityChargeChanged(charge, oldCharge)
        end
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
