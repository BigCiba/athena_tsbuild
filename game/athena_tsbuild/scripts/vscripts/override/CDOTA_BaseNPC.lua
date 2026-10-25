local __TSTL_FILE_PATH__ = "override/CDOTA_BaseNPC"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 49,["12"] = 49,["13"] = 49,["14"] = 49,["15"] = 49,["16"] = 49,["17"] = 49,["18"] = 49,["19"] = 49,["20"] = 49,["21"] = 49,["22"] = 49,["23"] = 49,["24"] = 49,["25"] = 49,["26"] = 49,["27"] = 49,["28"] = 49,["29"] = 49,["30"] = 49,["31"] = 49,["32"] = 64,["33"] = 65,["34"] = 66,["35"] = 67,["37"] = 69,["38"] = 65,["39"] = 71,["40"] = 72,["41"] = 73,["42"] = 73,["44"] = 74,["45"] = 74,["46"] = 74,["47"] = 74,["48"] = 74,["49"] = 71,["50"] = 77,["51"] = 78,["52"] = 78,["53"] = 78,["54"] = 78,["55"] = 78,["56"] = 77,["57"] = 81,["58"] = 81,["60"] = 82,["61"] = 83,["62"] = 82,["63"] = 85,["64"] = 85,["65"] = 85,["67"] = 85,["68"] = 85,["69"] = 86,["70"] = 86,["71"] = 86,["72"] = 88,["73"] = 89,["74"] = 89,["76"] = 90,["77"] = 90,["79"] = 91,["80"] = 91,["82"] = 92,["83"] = 92,["85"] = 93,["86"] = 93,["88"] = 95,["89"] = 96,["90"] = 95,["91"] = 98,["92"] = 99,["93"] = 100,["95"] = 98,["96"] = 103,["97"] = 104,["98"] = 105,["100"] = 103,["102"] = 110,["103"] = 110,["105"] = 112,["106"] = 113,["107"] = 114,["108"] = 114,["109"] = 114,["110"] = 114,["111"] = 114,["112"] = 114,["113"] = 114,["114"] = 114,["115"] = 114,["116"] = 112,["117"] = 117,["118"] = 118,["119"] = 119,["120"] = 119,["121"] = 119,["122"] = 119,["123"] = 119,["124"] = 119,["125"] = 119,["126"] = 119,["127"] = 119,["128"] = 117,["129"] = 121,["130"] = 121,["132"] = 122,["133"] = 123,["134"] = 124,["135"] = 122,["136"] = 126,["137"] = 126,["139"] = 127,["140"] = 128,["141"] = 127,["142"] = 131,["143"] = 131,["145"] = 132,["146"] = 133,["147"] = 132,["148"] = 135,["149"] = 135,["151"] = 136,["152"] = 137,["153"] = 136,["154"] = 307,["155"] = 308,["156"] = 308,["158"] = 309,["159"] = 310,["160"] = 311,["162"] = 313,["164"] = 309,["165"] = 317,["166"] = 317,["168"] = 318,["169"] = 319,["170"] = 320,["171"] = 321,["173"] = 323,["174"] = 324,["175"] = 318,["176"] = 326,["177"] = 326,["179"] = 327,["180"] = 328,["181"] = 329,["182"] = 330,["184"] = 327,["185"] = 333,["186"] = 333,["188"] = 334,["189"] = 335,["190"] = 336,["191"] = 337,["193"] = 339,["195"] = 334,["196"] = 343,["197"] = 344,["198"] = 344,["200"] = 345,["201"] = 343,["202"] = 348,["203"] = 348,["205"] = 349,["206"] = 350,["209"] = 351,["210"] = 352,["211"] = 353,["212"] = 354,["213"] = 355,["215"] = 357,["217"] = 359,["218"] = 349,["219"] = 362,["220"] = 362,["222"] = 363,["223"] = 364,["224"] = 366,["225"] = 367,["226"] = 368,["227"] = 369,["228"] = 369,["229"] = 369,["230"] = 369,["231"] = 370,["234"] = 371,["237"] = 372,["240"] = 373,["241"] = 369,["242"] = 369,["244"] = 363,["245"] = 378,["246"] = 378,["248"] = 379,["249"] = 380,["250"] = 380,["251"] = 380,["253"] = 380,["254"] = 379,["255"] = 382,["256"] = 382,["258"] = 384,["259"] = 385,["260"] = 386,["261"] = 388,["262"] = 389,["265"] = 392,["266"] = 394,["267"] = 395,["269"] = 397,["270"] = 398,["271"] = 399,["275"] = 403,["277"] = 405,["278"] = 406,["279"] = 407,["280"] = 408,["281"] = 409,["282"] = 409,["283"] = 409,["284"] = 409,["286"] = 411,["287"] = 411,["288"] = 411,["289"] = 411,["293"] = 415,["294"] = 384,["295"] = 418,["296"] = 418,["297"] = 419,["298"] = 420,["299"] = 421,["300"] = 422,["301"] = 423,["302"] = 424,["303"] = 424,["304"] = 424,["305"] = 424,["306"] = 424,["307"] = 424,["308"] = 424,["309"] = 425,["310"] = 426,["311"] = 427,["312"] = 428,["313"] = 429,["314"] = 430,["315"] = 431,["316"] = 432,["317"] = 433,["318"] = 434,["320"] = 436,["321"] = 437,["324"] = 440,["325"] = 440,["326"] = 440,["327"] = 440,["328"] = 440,["329"] = 440,["330"] = 440,["331"] = 440,["332"] = 418,["333"] = 450,["334"] = 451,["337"] = 454,["338"] = 455,["339"] = 461,["340"] = 462,["341"] = 463,["342"] = 465,["344"] = 450,["345"] = 468,["346"] = 469,["349"] = 470,["352"] = 472,["353"] = 478,["354"] = 479,["355"] = 480,["356"] = 482,["358"] = 468,["359"] = 485,["360"] = 486,["363"] = 487,["366"] = 488,["369"] = 490,["370"] = 485,["371"] = 495,["372"] = 496,["373"] = 497,["374"] = 497,["375"] = 497,["376"] = 497,["377"] = 497,["378"] = 497,["379"] = 497,["380"] = 504,["381"] = 505,["383"] = 507,["384"] = 508,["385"] = 509,["387"] = 511,["388"] = 512,["389"] = 513,["391"] = 516,["392"] = 495,["393"] = 518,["394"] = 519,["397"] = 520,["400"] = 523,["401"] = 524,["402"] = 525,["403"] = 526,["404"] = 527,["405"] = 528,["406"] = 529,["407"] = 530,["409"] = 532,["410"] = 532,["411"] = 532,["412"] = 533,["415"] = 534,["416"] = 532,["417"] = 532,["418"] = 518,["419"] = 537,["420"] = 538,["423"] = 539,["424"] = 539,["426"] = 541,["427"] = 542,["428"] = 543,["429"] = 544,["430"] = 545,["432"] = 549,["433"] = 550,["434"] = 551,["435"] = 552,["436"] = 553,["437"] = 554,["438"] = 555,["439"] = 556,["440"] = 557,["441"] = 558,["442"] = 559,["443"] = 559,["444"] = 559,["446"] = 548,["447"] = 548,["448"] = 548,["449"] = 548,["450"] = 548,["451"] = 548,["452"] = 548,["453"] = 548,["454"] = 548,["455"] = 548,["456"] = 548,["457"] = 548,["458"] = 548,["459"] = 548,["460"] = 548,["461"] = 566,["462"] = 568,["463"] = 569,["464"] = 570,["465"] = 572,["467"] = 537,["468"] = 575,["469"] = 575,["471"] = 576,["472"] = 577,["473"] = 577,["475"] = 579,["476"] = 581,["477"] = 582,["479"] = 576,["480"] = 585,["481"] = 586,["482"] = 586,["484"] = 588,["485"] = 588,["486"] = 590,["487"] = 585,["488"] = 592,["489"] = 593,["490"] = 593,["492"] = 595,["493"] = 597,["494"] = 592,["495"] = 599,["496"] = 601,["499"] = 604,["500"] = 605,["501"] = 606,["502"] = 607,["504"] = 609,["505"] = 611,["506"] = 616,["509"] = 619,["510"] = 620,["512"] = 621,["513"] = 621,["515"] = 622,["516"] = 623,["517"] = 624,["518"] = 625,["519"] = 626,["520"] = 627,["521"] = 628,["522"] = 629,["523"] = 630,["528"] = 633,["531"] = 634,["532"] = 635,["533"] = 636,["534"] = 637,["535"] = 638,["536"] = 639,["537"] = 640,["538"] = 641,["539"] = 642,["541"] = 599,["542"] = 645,["543"] = 646,["544"] = 647,["545"] = 648,["546"] = 649,["547"] = 651,["548"] = 652,["549"] = 653,["550"] = 654,["551"] = 655,["552"] = 656,["553"] = 657,["554"] = 658,["555"] = 645,["556"] = 661,["557"] = 661,["559"] = 662,["560"] = 662,["562"] = 663,["563"] = 663,["565"] = 664,["566"] = 664,["568"] = 665,["569"] = 665,["570"] = 665,["572"] = 666,["573"] = 667,["574"] = 668,["575"] = 665,["576"] = 670,["577"] = 670,["578"] = 670,["580"] = 670,["581"] = 670,["583"] = 671,["584"] = 671,["585"] = 671,["586"] = 671,["587"] = 671,["588"] = 672,["589"] = 672,["591"] = 673,["592"] = 674,["594"] = 676,["595"] = 670,["596"] = 678,["597"] = 679,["598"] = 680,["599"] = 681,["600"] = 678,["601"] = 683,["602"] = 683,["603"] = 683,["605"] = 684,["606"] = 684,["607"] = 686,["608"] = 687,["609"] = 687,["610"] = 688,["611"] = 688,["612"] = 688,["614"] = 689,["616"] = 690,["619"] = 692,["620"] = 692,["621"] = 693,["622"] = 693,["624"] = 694,["625"] = 694,["626"] = 695,["629"] = 697,["630"] = 697,["631"] = 697,["632"] = 697,["633"] = 697,["634"] = 697,["635"] = 697,["636"] = 697,["637"] = 697,["638"] = 697,["639"] = 697,["640"] = 697,["641"] = 697,["642"] = 697,["643"] = 700,["644"] = 700,["646"] = 683,["647"] = 702,["648"] = 703,["649"] = 703,["651"] = 704,["654"] = 707,["655"] = 708,["656"] = 708,["657"] = 708,["659"] = 709,["660"] = 709,["661"] = 709,["662"] = 709,["663"] = 710,["664"] = 711,["665"] = 702,["666"] = 713,["667"] = 714,["668"] = 714,["670"] = 715,["671"] = 716,["672"] = 716,["673"] = 716,["674"] = 717,["675"] = 718,["676"] = 718,["677"] = 718,["679"] = 719,["680"] = 719,["681"] = 719,["682"] = 719,["683"] = 720,["684"] = 721,["686"] = 716,["687"] = 716,["688"] = 724,["689"] = 725,["690"] = 726,["691"] = 726,["692"] = 726,["693"] = 726,["694"] = 726,["695"] = 713,["696"] = 728,["697"] = 729,["699"] = 730,["700"] = 730,["701"] = 731,["702"] = 732,["703"] = 732,["705"] = 730,["708"] = 734,["709"] = 728,["710"] = 736,["711"] = 737,["712"] = 737,["714"] = 738,["715"] = 739,["716"] = 739,["717"] = 739,["718"] = 740,["719"] = 741,["721"] = 739,["722"] = 739,["723"] = 744,["724"] = 736,["725"] = 747,["726"] = 748,["727"] = 748,["729"] = 749,["730"] = 750,["731"] = 750,["732"] = 750,["733"] = 751,["734"] = 752,["736"] = 750,["737"] = 750,["738"] = 755,["739"] = 747,["740"] = 757,["741"] = 758,["742"] = 758,["744"] = 759,["745"] = 759,["746"] = 759,["747"] = 759,["748"] = 757,["749"] = 761,["750"] = 762,["751"] = 762,["753"] = 763,["754"] = 763,["755"] = 763,["756"] = 763,["757"] = 761,["758"] = 766,["759"] = 767,["760"] = 767,["762"] = 768,["763"] = 768,["764"] = 768,["765"] = 768,["766"] = 769,["767"] = 769,["768"] = 769,["769"] = 770,["770"] = 771,["771"] = 772,["772"] = 773,["773"] = 774,["774"] = 775,["775"] = 776,["776"] = 769,["777"] = 769,["778"] = 778,["779"] = 779,["782"] = 782,["783"] = 782,["784"] = 782,["785"] = 782,["786"] = 782,["787"] = 784,["788"] = 784,["789"] = 784,["790"] = 785,["791"] = 785,["792"] = 785,["793"] = 785,["794"] = 785,["795"] = 785,["796"] = 785,["797"] = 785,["798"] = 785,["799"] = 785,["800"] = 784,["801"] = 782,["802"] = 782,["803"] = 782,["804"] = 766,["805"] = 798,["807"] = 799,["808"] = 799,["809"] = 800,["810"] = 801,["811"] = 802,["813"] = 799,["816"] = 798,["817"] = 806,["819"] = 807,["820"] = 807,["821"] = 808,["822"] = 809,["823"] = 810,["825"] = 807,["828"] = 806,["829"] = 814,["831"] = 815,["832"] = 815,["833"] = 816,["834"] = 817,["835"] = 818,["837"] = 815,["840"] = 821,["841"] = 814,["842"] = 823,["843"] = 824,["844"] = 824,["845"] = 824,["846"] = 824,["847"] = 823,["848"] = 826,["849"] = 827,["850"] = 826,["851"] = 829,["852"] = 830,["853"] = 830,["854"] = 830,["855"] = 830,["856"] = 829,["858"] = 853,["859"] = 854,["860"] = 855,["861"] = 856,["862"] = 857,["863"] = 858,["864"] = 858,["865"] = 858,["866"] = 858,["867"] = 858,["868"] = 858,["869"] = 858,["870"] = 858,["871"] = 858,["872"] = 858,["873"] = 858,["874"] = 858,["875"] = 870,["876"] = 871,["877"] = 873,["878"] = 875,["880"] = 854,["882"] = 883,["883"] = 884,["884"] = 885,["887"] = 886,["888"] = 887,["889"] = 888,["890"] = 889,["891"] = 890,["892"] = 890,["893"] = 890,["894"] = 890,["895"] = 890,["896"] = 890,["898"] = 892,["899"] = 884,["901"] = 899,["902"] = 900,["903"] = 901,["904"] = 900,["906"] = 910,["907"] = 911,["908"] = 910,["909"] = 913,["910"] = 914,["911"] = 913,["912"] = 923,["913"] = 924,["914"] = 923,["915"] = 926,["916"] = 927,["917"] = 926});
KnockBackFlag = KnockBackFlag or ({})
KnockBackFlag.IS_HIDDEN = 1
KnockBackFlag[KnockBackFlag.IS_HIDDEN] = "IS_HIDDEN"
KnockBackFlag.IS_BUFF = 2
KnockBackFlag[KnockBackFlag.IS_BUFF] = "IS_BUFF"
KnockBackFlag.IS_PURGABLE = 4
KnockBackFlag[KnockBackFlag.IS_PURGABLE] = "IS_PURGABLE"
KnockBackFlag.IS_NOT_PURGE_EXCEPTION = 8
KnockBackFlag[KnockBackFlag.IS_NOT_PURGE_EXCEPTION] = "IS_NOT_PURGE_EXCEPTION"
KnockBackFlag.NO_STUN = 16
KnockBackFlag[KnockBackFlag.NO_STUN] = "NO_STUN"
KnockBackFlag.IS_BLOCKABLE = 32
KnockBackFlag[KnockBackFlag.IS_BLOCKABLE] = "IS_BLOCKABLE"
KnockBackFlag.RETAIN_ON_DEATH = 64
KnockBackFlag[KnockBackFlag.RETAIN_ON_DEATH] = "RETAIN_ON_DEATH"
KnockBackFlag.DESTROY_TREES = 128
KnockBackFlag[KnockBackFlag.DESTROY_TREES] = "DESTROY_TREES"
KnockBackFlag.NO_STUN_PARTICLE = 256
KnockBackFlag[KnockBackFlag.NO_STUN_PARTICLE] = "NO_STUN_PARTICLE"
KnockBackFlag.IS_HORIZONTAL_FLAIL = 512
KnockBackFlag[KnockBackFlag.IS_HORIZONTAL_FLAIL] = "IS_HORIZONTAL_FLAIL"
BaseNPC = IsServer() and CDOTA_BaseNPC or C_DOTA_BaseNPC
BaseNPC.IsFriendly = function(self, hTarget)
    if IsValid(self) and IsValid(hTarget) then
        return self:GetTeamNumber() == hTarget:GetTeamNumber()
    end
    return false
end
BaseNPC.GetProperty = function(self, property)
    local propertyId = PROPERTY_MAP_REVERSE[property]
    if propertyId == nil then
        return 0
    end
    return PropertySystem:GetPropertyValueEx(
        propertyId,
        self:GetPlayerOwnerID(),
        self:entindex()
    )
end
BaseNPC.HasState = function(self, state, params)
    return StateSystem:GetStateValue(
        self:entindex(),
        state,
        params
    )
end
if BaseNPC.GetAttackDamage_Engine == nil then
    BaseNPC.GetAttackDamage_Engine = BaseNPC.GetAttackDamage
end
BaseNPC.GetAttackDamage = function(self)
    return GetAthenaAttack(self)
end
BaseNPC.AddPermanentAttribute = function(self, attribute, value, increase)
    if increase == nil then
        increase = false
    end
    return UnitAttributes:AddPermanent(self, attribute, value, increase)
end
BaseNPC.GetPermanentAttribute = function(self, attribute)
    return UnitAttributes:GetPermanent(self, attribute)
end
if IsServer() then
    if CDOTA_BaseNPC.GetHealth_Engine == nil then
        CDOTA_BaseNPC.GetHealth_Engine = CDOTA_BaseNPC.GetHealth
    end
    if CDOTA_BaseNPC.SetHealth_Engine == nil then
        CDOTA_BaseNPC.SetHealth_Engine = CDOTA_BaseNPC.SetHealth
    end
    if CDOTA_BaseNPC.ModifyHealth_Engine == nil then
        CDOTA_BaseNPC.ModifyHealth_Engine = CDOTA_BaseNPC.ModifyHealth
    end
    if CDOTA_BaseNPC.SetMaxHealth_Engine == nil then
        CDOTA_BaseNPC.SetMaxHealth_Engine = CDOTA_BaseNPC.SetMaxHealth
    end
    if CDOTA_BaseNPC.SetBaseMaxHealth_Engine == nil then
        CDOTA_BaseNPC.SetBaseMaxHealth_Engine = CDOTA_BaseNPC.SetBaseMaxHealth
    end
    CDOTA_BaseNPC.GetHealth = function(self)
        return LargeNumberHealth:GetHealth(self) or self:GetHealth_Engine()
    end
    CDOTA_BaseNPC.SetHealth = function(self, health)
        if not LargeNumberHealth:SetHealth(self, health) then
            self:SetHealth_Engine(health)
        end
    end
    CDOTA_BaseNPC.ModifyHealth = function(self, health, inflictor, lethal, damageFlags)
        if not LargeNumberHealth:ModifyHealth(self, health) then
            self:ModifyHealth_Engine(health, inflictor, lethal, damageFlags)
        end
    end
end
if BaseNPC.Heal_Engine == nil then
    BaseNPC.Heal_Engine = BaseNPC.Heal
end
BaseNPC.Heal = function(self, amount, inflictor)
    local hp = self:GetHealth()
    self:ModifyHealth(
        math.min(
            hp + amount,
            self:GetMaxHealth()
        ),
        inflictor,
        false,
        0
    )
end
BaseNPC.HealthCost = function(self, amount)
    local hp = self:GetHealth()
    self:ModifyHealth(
        math.min(
            hp + amount,
            self:GetMaxHealth()
        ),
        nil,
        false,
        0
    )
end
if BaseNPC.GiveMana_Engine == nil then
    BaseNPC.GiveMana_Engine = BaseNPC.GiveMana
end
BaseNPC.GiveMana = function(self, mana)
    self:GiveMana_Engine(mana)
    Event:Fire("give_mana", {unit = self, manaAmount = mana})
end
if BaseNPC.GetMaxHealth_Engine == nil then
    BaseNPC.GetMaxHealth_Engine = BaseNPC.GetMaxHealth
end
BaseNPC.GetMaxHealth = function(self)
    return GetAthenaMaxHealth(self)
end
if BaseNPC.GetHealthPercent_Engine == nil then
    BaseNPC.GetHealthPercent_Engine = BaseNPC.GetHealthPercent
end
BaseNPC.GetHealthPercent = function(self)
    return self:GetHealth() / self:GetMaxHealth() * 100
end
if BaseNPC.GetMaxMana_Engine == nil then
    BaseNPC.GetMaxMana_Engine = BaseNPC.GetMaxMana
end
BaseNPC.GetMaxMana = function(self)
    return GetAthenaMaxMana(self)
end
if IsServer() then
    if CDOTA_BaseNPC.EmitSound_Engine == nil then
        CDOTA_BaseNPC.EmitSound_Engine = CDOTA_BaseNPC.EmitSound
    end
    CDOTA_BaseNPC.EmitSound = function(self, sound, position)
        if position then
            EmitSoundOnLocationWithCaster(position, sound, self)
        else
            self:EmitSound_Engine(sound)
        end
    end
    if CDOTA_BaseNPC.AddAbility_Engine == nil then
        CDOTA_BaseNPC.AddAbility_Engine = CDOTA_BaseNPC.AddAbility
    end
    CDOTA_BaseNPC.AddAbility = function(self, abilityName, level)
        local ability = self:AddAbility_Engine(abilityName)
        if level ~= nil and IsValid(ability) then
            ability:SetLevel(level)
        end
        ability:__OnCreated()
        return ability
    end
    if CDOTA_BaseNPC.RemoveAbility_Engine == nil then
        CDOTA_BaseNPC.RemoveAbility_Engine = CDOTA_BaseNPC.RemoveAbility
    end
    CDOTA_BaseNPC.RemoveAbility = function(self, abilityName)
        local ability = self:FindAbilityByName(abilityName)
        if IsValid(ability) then
            self:RemoveAbilityByHandle(ability)
        end
    end
    if CDOTA_BaseNPC.RemoveAbilityByHandle_Engine == nil then
        CDOTA_BaseNPC.RemoveAbilityByHandle_Engine = CDOTA_BaseNPC.RemoveAbilityByHandle
    end
    CDOTA_BaseNPC.RemoveAbilityByHandle = function(self, ability)
        if IsValid(ability) then
            if ability.__OnDestroy ~= nil then
                ability:__OnDestroy()
            end
            self:RemoveAbilityByHandle_Engine(ability)
        end
    end
    CDOTA_BaseNPC.GetAttachmentPosition = function(self, attachName)
        if not IsValid(self) then
            return vec3_zero
        end
        return self:GetAttachmentOrigin(self:ScriptLookupAttachment(attachName))
    end
    if CDOTA_BaseNPC.RespawnUnit_Engine == nil then
        CDOTA_BaseNPC.RespawnUnit_Engine = CDOTA_BaseNPC.RespawnUnit
    end
    CDOTA_BaseNPC.RespawnUnit = function(self)
        if not self:UnitCanRespawn() then
            return
        end
        local model = self:FirstMoveChild()
        while model ~= nil do
            local next = model:NextMovePeer()
            if model ~= nil and model:GetClassname() ~= "" and model:GetClassname() == "dota_item_wearable" then
                UTIL_Remove(model)
            end
            model = next
        end
        self:RespawnUnit_Engine()
    end
    if CDOTA_BaseNPC.SetUnitCanRespawn_Engine == nil then
        CDOTA_BaseNPC.SetUnitCanRespawn_Engine = CDOTA_BaseNPC.SetUnitCanRespawn
    end
    CDOTA_BaseNPC.SetUnitCanRespawn = function(self, flag)
        self.__unitCanRespawn_ = flag
        if flag == true then
            self:StopTimer("RecyclingUnit")
        elseif not self:IsAlive() and not self:IsRealHero() then
            self:GameTimer(
                "RecyclingUnit",
                8,
                function()
                    if self:IsAlive() then
                        return
                    end
                    if self:IsRealHero() then
                        return
                    end
                    if self:UnitCanRespawn() then
                        return
                    end
                    self:SafeRemoveUnit()
                end
            )
        end
    end
    if CDOTA_BaseNPC.UnitCanRespawn_Engine == nil then
        CDOTA_BaseNPC.UnitCanRespawn_Engine = CDOTA_BaseNPC.UnitCanRespawn
    end
    CDOTA_BaseNPC.UnitCanRespawn = function(self)
        local ____self___unitCanRespawn__0 = self.__unitCanRespawn_
        if ____self___unitCanRespawn__0 == nil then
            ____self___unitCanRespawn__0 = false
        end
        return ____self___unitCanRespawn__0
    end
    if CDOTA_BaseNPC.AddNewModifier_Engine == nil then
        CDOTA_BaseNPC.AddNewModifier_Engine = CDOTA_BaseNPC.AddNewModifier
    end
    CDOTA_BaseNPC.AddNewModifier = function(self, caster, ability, modifierName, modifierTable, flags)
        local modifier = nil
        if flags ~= nil then
            if IsValid(self) and bit.band(flags, AddModifierFlag.IGNORE_DEATH) == AddModifierFlag.IGNORE_DEATH then
                if self.__isRemoving then
                    return
                end
                local isDead = not self:IsAlive()
                if isDead then
                    self:SetHealth(1)
                end
                modifier = self:AddNewModifier_Engine(caster, ability, modifierName, modifierTable)
                if isDead then
                    self:SetHealth(0)
                end
            end
        else
            modifier = self:AddNewModifier_Engine(caster, ability, modifierName, modifierTable)
        end
        if IsValid(modifier) and IsValid(caster) then
            local duration = modifier:GetDuration()
            if duration > 0 then
                if modifier:IsDebuff() then
                    modifier:SetDuration(
                        duration * (1 + GetDebuffDuration(caster, nil) * 0.01),
                        false
                    )
                else
                    modifier:SetDuration(
                        duration * (1 + GetBuffDuration(caster, nil) * 0.01),
                        false
                    )
                end
            end
        end
        return modifier
    end
    CDOTA_BaseNPC.ExecuteOrder = function(self, iOrder, ...)
        local arg = {...}
        local hAbility
        local hTarget
        local vPosition
        local tPositionOrder = {DOTA_UNIT_ORDER_MOVE_TO_POSITION, DOTA_UNIT_ORDER_ATTACK_MOVE}
        local tTargetOrder = {DOTA_UNIT_ORDER_MOVE_TO_TARGET, DOTA_UNIT_ORDER_ATTACK_TARGET}
        local tAbilityOrder = {
            DOTA_UNIT_ORDER_CAST_POSITION,
            DOTA_UNIT_ORDER_CAST_TARGET,
            DOTA_UNIT_ORDER_CAST_TARGET_TREE,
            DOTA_UNIT_ORDER_CAST_NO_TARGET,
            DOTA_UNIT_ORDER_CAST_TOGGLE
        }
        if TableFindKey(tPositionOrder, iOrder) ~= nil then
            vPosition = arg[1]
        elseif TableFindKey(tTargetOrder, iOrder) ~= nil then
            hTarget = arg[1]
        elseif TableFindKey(tAbilityOrder, iOrder) ~= nil then
            if iOrder == DOTA_UNIT_ORDER_CAST_POSITION then
                hAbility = arg[1]
                vPosition = arg[2]
            elseif iOrder == DOTA_UNIT_ORDER_CAST_NO_TARGET or iOrder == DOTA_UNIT_ORDER_CAST_TOGGLE then
                hAbility = arg[1]
            else
                hAbility = arg[1]
                hTarget = arg[2]
            end
        end
        ExecuteOrderFromTable({
            UnitIndex = self:entindex(),
            OrderType = iOrder,
            TargetIndex = IsValid(hTarget) and hTarget:entindex() or nil,
            AbilityIndex = IsValid(hAbility) and hAbility:entindex() or nil,
            Position = vPosition,
            Queue = false
        })
    end
    CDOTA_BaseNPC.Dash = function(self, direction, distance, height, duration, callback)
        if not self:IsAlive() then
            return
        end
        local extraDistance = GetDashDistance(self, nil)
        local kv = {direction = direction, dash_duration = duration, dash_distance = distance + extraDistance, dash_height = height}
        self:RemoveModifierByName("modifier_dash")
        local buff = self:AddNewModifier(self, nil, "modifier_dash", kv)
        if IsValid(buff) and callback ~= nil then
            buff.callback = callback
        end
    end
    CDOTA_BaseNPC.KnockBack = function(self, direction, distance, height, duration, callback)
        if not self:IsAlive() then
            return
        end
        if self:HasState(StateEnum.KNOCKBACK_IMMUNE) then
            return
        end
        local kv = {direction = direction, dash_duration = duration, dash_distance = distance, dash_height = height}
        self:RemoveModifierByName("modifier_knockback_custom")
        local buff = self:AddNewModifier(self, nil, "modifier_knockback_custom", kv)
        if IsValid(buff) and callback ~= nil then
            buff.callback = callback
        end
    end
    CDOTA_BaseNPC.Stun = function(self, caster, ability, duration)
        if not IsValid(self) then
            return
        end
        if duration <= 0 then
            return
        end
        if self:HasState(StateEnum.STUN_IMMUNE) then
            return
        end
        self:AddNewModifier(caster, ability, "modifier_stunned", {duration = duration})
    end
    CDOTA_BaseNPC.SummonUnit = function(self, unitName, position, duration, extraData)
        local forward = self:GetForwardVector()
        local unitData = {
            MapUnitName = unitName,
            angles = (((tostring(forward.x) .. " ") .. tostring(forward.y)) .. " ") .. tostring(forward.z),
            teamnumber = self:GetTeamNumber(),
            NeverMoveToClearSpace = false,
            IsSummoned = "1"
        }
        if extraData ~= nil then
            unitData = TableOverride(unitData, extraData)
        end
        local unit = CreateUnitFromTable(unitData, position)
        if not IsValid(unit) then
            return nil
        end
        unit.__Summoner = self
        if duration ~= nil and duration > 0 then
            unit:AddNewModifier(self, nil, "modifier_kill", {duration = duration})
        end
        return unit
    end
    CDOTA_BaseNPC.SafeRemoveUnit = function(self)
        if not IsValid(self) then
            return
        end
        if self.__isRemoving then
            return
        end
        self.__isRemoving = true
        self:RemoveAllModifiers(0, false, true, false)
        self:ForceKill(false)
        self:MakeIllusion()
        self:AddNoDraw()
        self:CallAbilityDestroy()
        if PropertySystem ~= nil then
            PropertySystem:CleanupUnitProperties(self)
        end
        Timer:GameTimer(
            0,
            function()
                if self:IsNull() then
                    return
                end
                self:Remove()
            end
        )
    end
    CDOTA_BaseNPC.PassiveCast = function(self, ability, orderType, extraData, func)
        if not IsValid(ability) then
            return
        end
        if extraData == nil then
            extraData = {}
        end
        local castPoint = extraData.castPoint or ability:GetCastPoint()
        local castAnimation = extraData.castAnimation or ability:GetCastAnimation()
        local activityModifier = extraData.sActivityModifier
        if extraData.sActivityModifier and type(extraData.sActivityModifier) == "table" then
            activityModifier = json.encode(extraData.sActivityModifier)
        end
        local ____castPoint_2 = castPoint
        local ____castPoint_3 = castPoint
        local ____castAnimation_4 = castAnimation
        local ____orderType_5 = orderType
        local ____extraData_animationRate_6 = extraData.animationRate
        local ____temp_7 = extraData.position and VectorToString(extraData.position) or nil
        local ____temp_8 = IsValid(extraData.target) and extraData.target:entindex() or nil
        local ____extraData_bFadeAnimation_9 = extraData.bFadeAnimation
        local ____extraData_fadeAnimationTime_10 = extraData.fadeAnimationTime
        local ____activityModifier_11 = activityModifier
        local ____extraData_bIgnoreBackswing_1 = extraData.bIgnoreBackswing
        if ____extraData_bIgnoreBackswing_1 == nil then
            ____extraData_bIgnoreBackswing_1 = true
        end
        local data = {
            duration = ____castPoint_2,
            castPoint = ____castPoint_3,
            castAnimation = ____castAnimation_4,
            orderType = ____orderType_5,
            animationRate = ____extraData_animationRate_6,
            position = ____temp_7,
            targetIndex = ____temp_8,
            bFadeAnimation = ____extraData_bFadeAnimation_9,
            fadeAnimationTime = ____extraData_fadeAnimationTime_10,
            activityModifier = ____activityModifier_11,
            bIgnoreBackswing = ____extraData_bIgnoreBackswing_1,
            bUseCooldown = (extraData.bUseCooldown == nil or extraData.bUseCooldown == true) and 1 or 0,
            bUseMana = (extraData.bUseMana == nil or extraData.bUseMana == true) and 1 or 0
        }
        ability.CustomAbilityPhaseStart = extraData.OnAbilityPhaseStart
        ability.CustomAbilityPhaseInterrupted = extraData.OnAbilityPhaseInterrupted
        local modifier = self:AddNewModifier(self, ability, "modifier_passive_cast", data)
        if IsValid(modifier) then
            modifier.callback = func
        end
    end
    if CDOTA_BaseNPC.AddActivityModifier_Engine == nil then
        CDOTA_BaseNPC.AddActivityModifier_Engine = CDOTA_BaseNPC.AddActivityModifier
    end
    CDOTA_BaseNPC.UpdateActivityModifier = function(self)
        if self.__activityModifiers == nil then
            self.__activityModifiers = {}
        end
        self:ClearActivityModifiers()
        for i = 0, #self.__activityModifiers - 1, 1 do
            self:AddActivityModifier_Engine(self.__activityModifiers[i + 1])
        end
    end
    CDOTA_BaseNPC.AddActivityModifier = function(self, sName)
        if self.__activityModifiers == nil then
            self.__activityModifiers = {}
        end
        local ____self___activityModifiers_12 = self.__activityModifiers
        ____self___activityModifiers_12[#____self___activityModifiers_12 + 1] = sName
        self:UpdateActivityModifier()
    end
    CDOTA_BaseNPC.RemoveActivityModifier = function(self, sName)
        if self.__activityModifiers == nil then
            self.__activityModifiers = {}
        end
        ArrayRemove(self.__activityModifiers, sName)
        self:UpdateActivityModifier()
    end
    CDOTA_BaseNPC.DealDamage = function(self, target, ability, damage, damage_type, damage_flags)
        if not IsValid(self) or ability ~= nil and not IsValid(ability) then
            return
        end
        local damage_category = DOTA_DAMAGE_CATEGORY_BARRIER
        if ability ~= nil then
            if damage_type == nil then
                damage_type = ability:GetDamageType()
            end
            local abilityTag = ability:GetAbilityTag()
            if abilityTag == AbilityTag.Skill or abilityTag == AbilityTag.Dodge or abilityTag == AbilityTag.Defense or abilityTag == AbilityTag.Ultimate then
                damage_category = DOTA_DAMAGE_CATEGORY_SPELL
            end
        end
        if __TS__ArrayIsArray(target) then
            for i, v in ipairs(target) do
                do
                    if not IsValid(v) then
                        goto __continue104
                    end
                    local params = DamageSystem:AcquireDamageInfo()
                    params.attacker = self
                    params.target = v
                    params.ability = ability
                    params.damage = damage
                    params.damage_type = damage_type or EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE
                    params.damage_flags = damage_flags
                    params.damage_category = damage_category
                    DamageSystem:DealDamage(params, true)
                end
                ::__continue104::
            end
        else
            if not IsValid(target) then
                return
            end
            local params = DamageSystem:AcquireDamageInfo()
            params.attacker = self
            params.target = target
            params.ability = ability
            params.damage = damage
            params.damage_type = damage_type or EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE
            params.damage_flags = damage_flags
            params.damage_category = damage_category
            DamageSystem:DealDamage(params, true)
        end
    end
    CDOTA_BaseNPC.Attack = function(self, target, params)
        local baseDamage = params and params.baseDamage or self:GetAttackDamage()
        local damageAmplify = params and params.damageAmplify or 0
        local bonusDamage = params and params.bonusDamage or 0
        local damageType = params and params.damageType or EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL
        local damageInfo = DamageSystem:AcquireDamageInfo()
        damageInfo.attacker = self
        damageInfo.target = target
        damageInfo.damage = (baseDamage + bonusDamage) * (1 + damageAmplify)
        damageInfo.damage_category = DOTA_DAMAGE_CATEGORY_ATTACK
        damageInfo.damage_type = damageType
        damageInfo.damage_flags = params and params.flags or EOM_DAMAGE_FLAGS.NONE
        DamageSystem:DealDamage(damageInfo, true)
    end
    if CDOTA_BaseNPC.AddItem_Engine == nil then
        CDOTA_BaseNPC.AddItem_Engine = CDOTA_BaseNPC.AddItem
    end
    if CDOTA_BaseNPC.AddItemByName_Engine == nil then
        CDOTA_BaseNPC.AddItemByName_Engine = CDOTA_BaseNPC.AddItemByName
    end
    if CDOTA_BaseNPC.RemoveItem_Engine == nil then
        CDOTA_BaseNPC.RemoveItem_Engine = CDOTA_BaseNPC.RemoveItem
    end
    if CDOTA_BaseNPC.TakeItem_Engine == nil then
        CDOTA_BaseNPC.TakeItem_Engine = CDOTA_BaseNPC.TakeItem
    end
    CDOTA_BaseNPC.AddItem = function(self, item, updateNetData)
        if updateNetData == nil then
            updateNetData = true
        end
        local added = self:AddItem_Engine(item)
        self:SyncInventory(updateNetData)
        return added
    end
    CDOTA_BaseNPC.AddItemByName = function(self, itemName, level, updateNetData)
        if level == nil then
            level = 1
        end
        if updateNetData == nil then
            updateNetData = true
        end
        local item = CreateItem(
            itemName,
            PlayerResource:GetPlayer(self:GetPlayerOwnerID()),
            self:IsRealHero() and self or nil
        )
        if not IsValid(item) then
            error("物品创建失败：" .. itemName, 0)
        end
        if level > 1 then
            item:SetLevel(level, false)
        end
        return self:AddItem(item, updateNetData)
    end
    CDOTA_BaseNPC.TakeItem = function(self, item)
        local result = self:TakeItem_Engine(item)
        self:SyncInventory()
        return result
    end
    CDOTA_BaseNPC.SyncInventory = function(self, updateNetData)
        if updateNetData == nil then
            updateNetData = true
        end
        local previous = self.__inventoryItems or ({})
        local current = self:GetAllItems()
        self.__inventoryItems = current
        for ____, item in ipairs(previous) do
            if not __TS__ArrayIncludes(current, item) then
                if IsValid(item) and item.__inventoryOwner == self then
                    item:__OnDestroy()
                    item.__inventoryOwner = nil
                else
                    Event:UnregisterContext(item)
                end
                Event:Fire("item_removed", {unit = self, item = item})
            end
        end
        for ____, item in ipairs(current) do
            if not __TS__ArrayIncludes(previous, item) then
                if IsValid(item.__inventoryOwner) and item.__inventoryOwner ~= self then
                    item.__inventoryOwner:SyncInventory(false)
                end
                item.__inventoryOwner = self
                item:__OnCreated()
                Event:Fire("item_added", {unit = self, item = item})
            end
        end
        self.__items = __TS__ArrayMap(
            current,
            function(____, item) return {
                entIndex = item:entindex(),
                itemName = item:GetAbilityName(),
                level = item:GetLevel(),
                stackCount = item.__StackCount or 0,
                charge = item.__Charge or 0,
                maxCharge = item:GetMaxCharges(),
                chargeRestoreTime = item.__ChargeRestoreTime or 0,
                isChargeCooldownFrozen = item:IsChargeCooldownFrozen(),
                chargeFrozenCooldownRemaining = item:GetChargeCooldownRemaining()
            } end
        )
        if updateNetData then
            self:UpdateAbilityNetData()
        end
    end
    CDOTA_BaseNPC.RemoveItem = function(self, item)
        if self.__items == nil then
            self.__items = {}
        end
        if not IsValid(item) then
            return
        end
        Event:Fire("item_consumed", {unit = self, item = item})
        if item.__inventoryOwner == self then
            item:__OnDestroy()
            item.__inventoryOwner = nil
        end
        self.__items = __TS__ArrayFilter(
            self.__items,
            function(____, data) return data.entIndex ~= item:entindex() end
        )
        self:RemoveItem_Engine(item)
        self:SyncInventory()
    end
    CDOTA_BaseNPC.RemoveAllItem = function(self)
        if self.__items == nil then
            self.__items = {}
        end
        local removingItems = self:GetAllItems()
        __TS__ArrayForEach(
            removingItems,
            function(____, item)
                if IsValid(item) then
                    if item.__inventoryOwner == self then
                        item:__OnDestroy()
                        item.__inventoryOwner = nil
                    end
                    self.__items = __TS__ArrayFilter(
                        self.__items or ({}),
                        function(____, data) return data.entIndex ~= item:entindex() end
                    )
                    self:RemoveItem_Engine(item)
                    Event:Fire("item_removed", {unit = self, item = item})
                end
            end
        )
        self.__items = {}
        self.__inventoryItems = {}
        CustomNetTables:SetNetData(
            "unit",
            tostring(self:entindex()),
            nil
        )
    end
    CDOTA_BaseNPC.GetAllItems = function(self)
        local items = {}
        do
            local slot = 0
            while slot <= 16 do
                local item = self:GetItemInSlot(slot)
                if IsValid(item) and not __TS__ArrayIncludes(items, item) then
                    items[#items + 1] = item
                end
                slot = slot + 1
            end
        end
        return items
    end
    CDOTA_BaseNPC.GetItemByName = function(self, itemName)
        if self.__items == nil then
            self.__items = {}
        end
        local item
        __TS__ArrayMap(
            self.__items,
            function(____, data)
                if data.itemName == itemName then
                    item = EntIndexToHScript(data.entIndex)
                end
            end
        )
        return item
    end
    CDOTA_BaseNPC.GetItemByNameAndLevel = function(self, itemName, level)
        if self.__items == nil then
            self.__items = {}
        end
        local item
        __TS__ArrayMap(
            self.__items,
            function(____, data)
                if data.itemName == itemName and data.level == level then
                    item = EntIndexToHScript(data.entIndex)
                end
            end
        )
        return item
    end
    CDOTA_BaseNPC.HasItem = function(self, itemName)
        if self.__items == nil then
            self.__items = {}
        end
        return __TS__ArraySome(
            self.__items,
            function(____, data) return data.itemName == itemName end
        )
    end
    CDOTA_BaseNPC.GetItemCount = function(self, itemName)
        if self.__items == nil then
            self.__items = {}
        end
        return #__TS__ArrayFilter(
            self.__items,
            function(____, data) return data.itemName == itemName end
        )
    end
    CDOTA_BaseNPC.UpdateAbilityNetData = function(self)
        if self.__items == nil then
            self.__items = {}
        end
        self.__items = __TS__ArrayFilter(
            self.__items,
            function(____, data) return IsValid(EntIndexToHScript(data.entIndex)) end
        )
        __TS__ArrayForEach(
            self.__items,
            function(____, data)
                local item = EntIndexToHScript(data.entIndex)
                data.stackCount = item.__StackCount or 0
                data.charge = item.__Charge or 0
                data.maxCharge = item:GetMaxCharges()
                data.chargeRestoreTime = item.__ChargeRestoreTime or 0
                data.isChargeCooldownFrozen = item:IsChargeCooldownFrozen()
                data.chargeFrozenCooldownRemaining = item:GetChargeCooldownRemaining()
            end
        )
        local abilities = {}
        if not self:IsRealHero() then
            return
        end
        CustomNetTables:SetNetData(
            "unit",
            tostring(self:entindex()),
            {
                items = self.__items,
                abilities = __TS__ArrayMap(
                    abilities,
                    function(____, ability)
                        return {
                            entIndex = ability:entindex() or -1,
                            stackCount = ability.__StackCount or 0,
                            abilityName = ability:GetAbilityName(),
                            charge = ability.__Charge or 0,
                            maxCharge = ability:GetMaxCharges(),
                            chargeRestoreTime = ability.__ChargeRestoreTime or 0,
                            isChargeCooldownFrozen = ability:IsChargeCooldownFrozen(),
                            chargeFrozenCooldownRemaining = ability:GetChargeCooldownRemaining()
                        }
                    end
                )
            }
        )
    end
    CDOTA_BaseNPC.CallAbilityCreated = function(self)
        do
            local i = 0
            while i < self:GetAbilityCount() do
                local ability = self:GetAbilityByIndex(i)
                if IsValid(ability) then
                    ability:__OnCreated()
                end
                i = i + 1
            end
        end
    end
    CDOTA_BaseNPC.CallAbilityRefresh = function(self)
        do
            local i = 0
            while i < self:GetAbilityCount() do
                local ability = self:GetAbilityByIndex(i)
                if IsValid(ability) then
                    ability:__OnRefresh()
                end
                i = i + 1
            end
        end
    end
    CDOTA_BaseNPC.CallAbilityDestroy = function(self)
        do
            local i = 0
            while i < self:GetAbilityCount() do
                local ability = self:GetAbilityByIndex(i)
                if IsValid(ability) then
                    ability:__OnDestroy()
                end
                i = i + 1
            end
        end
        self:RemoveAllItem()
    end
    CDOTA_BaseNPC.IsBoss = function(self)
        return __TS__StringIncludes(
            self:GetUnitLabel(),
            "boss"
        )
    end
    CDOTA_BaseNPC.IsElite = function(self)
        return self:HasModifier("modifier_elite")
    end
    CDOTA_BaseNPC.IsCreep = function(self)
        return __TS__StringIncludes(
            self:GetUnitLabel(),
            "creep"
        )
    end
end
if IsServer() then
    CDOTA_BaseNPC.SimulateCast = function(self, castData)
        self:RemoveModifierByName("modifier_simulate_cast")
        local castPoint = castData.castPoint or 0
        local duration = math.max(castData.duration or 0, castPoint or 0)
        local data = {
            duration = duration,
            castPoint = castPoint,
            castAnimation = castData.castAnimation,
            orderType = castData.orderType,
            animationRate = castData.animationRate or 1,
            animationFadeIn = castData.animationFadeIn,
            animationFadeOut = castData.animationFadeOut,
            position = castData.position and VectorToString(castData.position) or nil,
            targetIndex = IsValid(castData.target) and castData.target:entindex() or nil,
            activityModifier = castData.activityModifier
        }
        local modifier = self:AddNewModifier(self, nil, "modifier_simulate_cast", data)
        if IsValid(modifier) then
            modifier.OnSpellStart = castData.OnSpellStart
            modifier.OnFinish = castData.OnFinish
        end
    end
end
if IsServer() then
    CDOTA_BaseNPC.PushOff = function(self, position)
        if self:HasState(StateEnum.KNOCKBACK_IMMUNE) then
            return
        end
        self:SetAbsOrigin(position)
        local hullRadius = self:GetHullRadius() + 50
        local hullUnits = FindEnemiesInRadius(self, position, hullRadius)
        for ____, target in ipairs(hullUnits) do
            target:KnockBack(
                CalcDirection2D(target, position),
                hullRadius - CalcDistance(target, position),
                0,
                0.06
            )
        end
        FindClearSpaceForUnit(self, position, true)
    end
end
if IsServer() then
    CDOTA_BaseNPC.IsCasting = function(self)
        return self:IsChanneling() or self:HasModifier("modifier_simulate_cast") or self:HasModifier("modifier_passive_cast") or self:GetCurrentActiveAbility() ~= nil
    end
end
BaseNPC.IsHealthy = function(self)
    return self:GetHealthPercent() >= HEALTHY_PCT
end
BaseNPC.IsLowHealth = function(self)
    return self:GetHealthPercent() <= LOW_HEALTH_PCT
end
BaseNPC.IsCloseRange = function(self, target)
    return CalcDistance(self, target) <= CLOSE_RANGE
end
BaseNPC.IsFarRange = function(self, target)
    return CalcDistance(self, target) >= FAR_RANGE
end
