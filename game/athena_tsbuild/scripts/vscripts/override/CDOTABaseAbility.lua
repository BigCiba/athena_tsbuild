local __TSTL_FILE_PATH__ = "override/CDOTABaseAbility"
local ____lualib = require("lualib_bundle")
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__StringSubstring = ____lualib.__TS__StringSubstring
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 131,["9"] = 132,["10"] = 133,["11"] = 132,["12"] = 135,["13"] = 136,["16"] = 137,["17"] = 138,["20"] = 139,["21"] = 139,["22"] = 139,["23"] = 139,["24"] = 135,["25"] = 141,["26"] = 142,["27"] = 143,["28"] = 143,["29"] = 143,["30"] = 143,["32"] = 143,["33"] = 141,["34"] = 145,["35"] = 146,["36"] = 146,["37"] = 146,["38"] = 146,["39"] = 146,["40"] = 146,["41"] = 145,["42"] = 150,["43"] = 150,["45"] = 151,["46"] = 151,["48"] = 153,["49"] = 154,["50"] = 154,["52"] = 155,["53"] = 156,["54"] = 157,["55"] = 157,["56"] = 157,["58"] = 157,["60"] = 157,["61"] = 158,["62"] = 159,["64"] = 161,["65"] = 161,["66"] = 161,["68"] = 161,["69"] = 162,["70"] = 162,["71"] = 162,["73"] = 162,["74"] = 163,["75"] = 164,["77"] = 167,["78"] = 167,["79"] = 167,["80"] = 167,["81"] = 167,["82"] = 167,["83"] = 167,["84"] = 153,["85"] = 170,["86"] = 171,["87"] = 171,["88"] = 171,["89"] = 171,["90"] = 171,["91"] = 170,["92"] = 173,["93"] = 174,["94"] = 175,["98"] = 178,["99"] = 178,["100"] = 179,["101"] = 180,["102"] = 178,["105"] = 173,["106"] = 183,["107"] = 183,["108"] = 183,["110"] = 184,["111"] = 184,["113"] = 185,["114"] = 186,["115"] = 187,["116"] = 188,["118"] = 183,["119"] = 191,["120"] = 191,["121"] = 191,["123"] = 192,["124"] = 192,["126"] = 193,["127"] = 194,["128"] = 195,["129"] = 196,["131"] = 191,["132"] = 199,["133"] = 199,["134"] = 199,["136"] = 200,["137"] = 201,["138"] = 202,["139"] = 203,["141"] = 199,["142"] = 206,["143"] = 207,["144"] = 206,["145"] = 209,["146"] = 210,["147"] = 211,["148"] = 212,["149"] = 213,["150"] = 214,["151"] = 214,["152"] = 214,["153"] = 214,["154"] = 214,["155"] = 214,["159"] = 209,["160"] = 219,["161"] = 220,["163"] = 220,["165"] = 220,["166"] = 220,["167"] = 220,["169"] = 220,["170"] = 221,["171"] = 219,["172"] = 223,["173"] = 224,["174"] = 225,["175"] = 226,["177"] = 228,["178"] = 223,["179"] = 230,["180"] = 231,["181"] = 230,["182"] = 233,["183"] = 234,["184"] = 235,["185"] = 236,["187"] = 237,["188"] = 238,["190"] = 239,["193"] = 241,["196"] = 233,["197"] = 244,["198"] = 245,["199"] = 244,["200"] = 247,["201"] = 248,["202"] = 249,["204"] = 251,["205"] = 251,["206"] = 251,["207"] = 251,["208"] = 247,["209"] = 277,["210"] = 278,["211"] = 278,["213"] = 279,["214"] = 279,["215"] = 277,["216"] = 281,["217"] = 282,["218"] = 283,["219"] = 284,["220"] = 285,["223"] = 288,["224"] = 281,["225"] = 290,["226"] = 291,["227"] = 291,["229"] = 292,["230"] = 292,["231"] = 290,["232"] = 294,["233"] = 294,["234"] = 294,["236"] = 295,["239"] = 296,["240"] = 297,["241"] = 298,["243"] = 300,["244"] = 294,["245"] = 302,["246"] = 303,["247"] = 304,["248"] = 305,["249"] = 306,["250"] = 307,["251"] = 308,["252"] = 309,["253"] = 309,["254"] = 309,["255"] = 309,["256"] = 309,["257"] = 309,["258"] = 309,["259"] = 309,["260"] = 309,["262"] = 311,["264"] = 313,["265"] = 314,["266"] = 314,["267"] = 314,["268"] = 314,["269"] = 314,["270"] = 314,["271"] = 314,["272"] = 314,["273"] = 314,["275"] = 316,["277"] = 318,["278"] = 319,["279"] = 320,["281"] = 322,["282"] = 322,["283"] = 322,["284"] = 322,["285"] = 322,["286"] = 323,["287"] = 323,["288"] = 323,["289"] = 323,["290"] = 323,["291"] = 324,["292"] = 325,["293"] = 302,["294"] = 327,["295"] = 328,["296"] = 329,["297"] = 330,["298"] = 331,["299"] = 332,["300"] = 332,["301"] = 332,["302"] = 332,["303"] = 332,["304"] = 332,["305"] = 332,["306"] = 332,["307"] = 332,["308"] = 333,["309"] = 333,["310"] = 333,["311"] = 333,["312"] = 333,["313"] = 333,["314"] = 333,["315"] = 333,["316"] = 333,["318"] = 335,["319"] = 336,["321"] = 338,["322"] = 338,["323"] = 338,["324"] = 338,["325"] = 338,["326"] = 339,["327"] = 340,["328"] = 327,["329"] = 342,["330"] = 343,["331"] = 344,["332"] = 345,["333"] = 345,["334"] = 345,["335"] = 345,["336"] = 345,["337"] = 346,["338"] = 347,["339"] = 342,["340"] = 349,["341"] = 350,["342"] = 351,["343"] = 352,["344"] = 352,["345"] = 352,["346"] = 352,["347"] = 352,["348"] = 353,["349"] = 353,["350"] = 353,["351"] = 353,["352"] = 353,["353"] = 354,["354"] = 355,["355"] = 349,["356"] = 370,["357"] = 371,["358"] = 371,["360"] = 372,["361"] = 373,["362"] = 372,["363"] = 379,["364"] = 380,["365"] = 380,["367"] = 381,["368"] = 382,["369"] = 384,["370"] = 385,["371"] = 386,["372"] = 387,["373"] = 388,["374"] = 389,["375"] = 390,["377"] = 392,["378"] = 393,["379"] = 394,["381"] = 396,["383"] = 398,["384"] = 399,["386"] = 401,["387"] = 402,["389"] = 381,["390"] = 405,["391"] = 406,["392"] = 407,["393"] = 408,["394"] = 409,["395"] = 410,["396"] = 411,["397"] = 412,["398"] = 413,["399"] = 414,["400"] = 415,["401"] = 415,["402"] = 415,["403"] = 415,["404"] = 415,["405"] = 415,["409"] = 419,["410"] = 420,["411"] = 421,["412"] = 422,["413"] = 422,["414"] = 422,["415"] = 422,["416"] = 422,["417"] = 422,["421"] = 426,["422"] = 427,["423"] = 427,["425"] = 428,["426"] = 428,["427"] = 428,["428"] = 428,["429"] = 428,["430"] = 428,["431"] = 428,["432"] = 428,["434"] = 430,["435"] = 431,["436"] = 431,["438"] = 432,["439"] = 434,["440"] = 434,["443"] = 438,["444"] = 439,["445"] = 439,["446"] = 439,["448"] = 439,["449"] = 440,["450"] = 441,["451"] = 442,["452"] = 443,["453"] = 443,["454"] = 443,["455"] = 443,["456"] = 443,["457"] = 444,["458"] = 445,["459"] = 446,["460"] = 446,["461"] = 446,["462"] = 446,["463"] = 446,["464"] = 446,["469"] = 460,["470"] = 462,["471"] = 468,["472"] = 468,["473"] = 468,["474"] = 468,["475"] = 469,["476"] = 469,["478"] = 470,["479"] = 470,["481"] = 471,["482"] = 471,["484"] = 472,["485"] = 473,["487"] = 468,["488"] = 468,["490"] = 478,["491"] = 478,["492"] = 478,["493"] = 478,["494"] = 478,["495"] = 479,["497"] = 482,["498"] = 405,["499"] = 484,["500"] = 484,["501"] = 485,["502"] = 486,["503"] = 487,["504"] = 488,["505"] = 489,["506"] = 490,["507"] = 491,["508"] = 492,["509"] = 493,["510"] = 494,["511"] = 495,["512"] = 495,["513"] = 495,["514"] = 495,["515"] = 495,["516"] = 495,["520"] = 500,["521"] = 501,["522"] = 501,["523"] = 501,["525"] = 501,["526"] = 502,["527"] = 503,["528"] = 504,["529"] = 505,["530"] = 505,["531"] = 505,["532"] = 505,["533"] = 505,["534"] = 506,["535"] = 507,["536"] = 508,["537"] = 508,["538"] = 508,["539"] = 508,["540"] = 508,["541"] = 508,["546"] = 514,["547"] = 515,["548"] = 485,["549"] = 517,["550"] = 517,["551"] = 518,["552"] = 519,["553"] = 520,["554"] = 520,["555"] = 520,["556"] = 520,["557"] = 521,["558"] = 521,["559"] = 521,["560"] = 521,["561"] = 522,["562"] = 522,["563"] = 522,["564"] = 522,["565"] = 523,["566"] = 524,["567"] = 525,["568"] = 525,["569"] = 525,["570"] = 526,["571"] = 525,["572"] = 525,["574"] = 529,["575"] = 530,["576"] = 518,["577"] = 532,["578"] = 532,["579"] = 533,["580"] = 534,["581"] = 535,["582"] = 537,["583"] = 538,["585"] = 541,["586"] = 542,["588"] = 545,["589"] = 546,["590"] = 547,["592"] = 550,["593"] = 551,["595"] = 554,["596"] = 555,["598"] = 558,["599"] = 559,["601"] = 562,["602"] = 563,["604"] = 566,["605"] = 567,["607"] = 570,["608"] = 571,["610"] = 574,["611"] = 575,["613"] = 578,["614"] = 579,["616"] = 582,["617"] = 583,["619"] = 586,["620"] = 587,["622"] = 590,["623"] = 591,["625"] = 594,["626"] = 595,["628"] = 598,["629"] = 599,["631"] = 602,["632"] = 533,["633"] = 605,["634"] = 606,["635"] = 607,["637"] = 609,["638"] = 610,["640"] = 612,["641"] = 613,["643"] = 615,["644"] = 616,["646"] = 618,["647"] = 619,["649"] = 621,["650"] = 622,["652"] = 624,["653"] = 605,["654"] = 627,["655"] = 628,["656"] = 629,["657"] = 630,["658"] = 631,["660"] = 633,["661"] = 627,["662"] = 635,["663"] = 635,["664"] = 637,["665"] = 638,["667"] = 638,["669"] = 638,["670"] = 638,["671"] = 638,["673"] = 638,["674"] = 639,["675"] = 637,["676"] = 642,["677"] = 643,["678"] = 642,["679"] = 646,["680"] = 647,["681"] = 648,["682"] = 649,["683"] = 650,["684"] = 651,["685"] = 652,["686"] = 653,["688"] = 655,["689"] = 656,["690"] = 656,["691"] = 656,["692"] = 656,["694"] = 658,["695"] = 659,["696"] = 660,["698"] = 662,["699"] = 646,["700"] = 664,["701"] = 664,["702"] = 664,["704"] = 665,["705"] = 666,["706"] = 666,["707"] = 666,["708"] = 666,["709"] = 667,["710"] = 668,["712"] = 670,["713"] = 671,["714"] = 672,["716"] = 674,["717"] = 675,["718"] = 664,["719"] = 678,["720"] = 679,["723"] = 680,["724"] = 681,["725"] = 681,["726"] = 681,["727"] = 681,["728"] = 681,["729"] = 681,["730"] = 681,["731"] = 681,["732"] = 681,["733"] = 681,["734"] = 682,["735"] = 682,["737"] = 678,["738"] = 684,["739"] = 685,["740"] = 684,["741"] = 687,["742"] = 688,["743"] = 689,["744"] = 690,["745"] = 691,["746"] = 692,["747"] = 693,["748"] = 694,["749"] = 695,["750"] = 696,["751"] = 696,["752"] = 696,["753"] = 696,["754"] = 696,["755"] = 696,["756"] = 696,["757"] = 696,["758"] = 696,["759"] = 696,["760"] = 696,["761"] = 707,["762"] = 710,["765"] = 713,["766"] = 687,["768"] = 738,["769"] = 739,["770"] = 740,["771"] = 740,["773"] = 741,["774"] = 742,["777"] = 743,["778"] = 744,["779"] = 745,["780"] = 746,["781"] = 746,["782"] = 746,["783"] = 746,["784"] = 747,["785"] = 748,["787"] = 750,["788"] = 750,["789"] = 750,["790"] = 750,["791"] = 751,["792"] = 752,["793"] = 753,["794"] = 754,["795"] = 754,["796"] = 754,["797"] = 754,["798"] = 756,["799"] = 757,["800"] = 758,["802"] = 760,["803"] = 761,["804"] = 762,["805"] = 763,["806"] = 764,["807"] = 765,["809"] = 767,["810"] = 746,["811"] = 746,["812"] = 739,["813"] = 770,["814"] = 771,["815"] = 771,["817"] = 772,["818"] = 773,["819"] = 773,["820"] = 773,["821"] = 773,["822"] = 773,["823"] = 773,["824"] = 773,["825"] = 773,["826"] = 773,["827"] = 773,["828"] = 773,["829"] = 773,["830"] = 773,["831"] = 773,["832"] = 773,["833"] = 780,["834"] = 770});
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
                local ____self___EventIDList_11 = self.__EventIDList
                ____self___EventIDList_11[#____self___EventIDList_11 + 1] = Event:RegisterForOwner(event, listener, caster, self)
            end
        end
        local abilityName = self:GetAbilityName()
        local ____KeyValues_abilities_abilityName_12 = KeyValues.abilities[abilityName]
        if ____KeyValues_abilities_abilityName_12 == nil then
            ____KeyValues_abilities_abilityName_12 = KeyValues.items[abilityName]
        end
        local kv = ____KeyValues_abilities_abilityName_12
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
        local oldCharge = self.__Charge
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
            local oldCharge = self.__Charge
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
