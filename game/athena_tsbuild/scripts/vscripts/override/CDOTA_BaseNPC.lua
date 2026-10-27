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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 51,["12"] = 51,["13"] = 51,["14"] = 51,["15"] = 51,["16"] = 51,["17"] = 51,["18"] = 51,["19"] = 51,["20"] = 51,["21"] = 51,["22"] = 51,["23"] = 51,["24"] = 51,["25"] = 51,["26"] = 51,["27"] = 51,["28"] = 51,["29"] = 51,["30"] = 51,["31"] = 51,["32"] = 66,["33"] = 67,["34"] = 68,["35"] = 69,["37"] = 71,["38"] = 67,["39"] = 73,["40"] = 74,["41"] = 75,["42"] = 75,["44"] = 76,["45"] = 76,["46"] = 76,["47"] = 76,["48"] = 76,["49"] = 73,["50"] = 79,["51"] = 80,["52"] = 80,["53"] = 80,["54"] = 80,["55"] = 80,["56"] = 79,["57"] = 83,["58"] = 83,["60"] = 84,["61"] = 85,["62"] = 84,["63"] = 87,["64"] = 87,["65"] = 87,["67"] = 87,["68"] = 87,["69"] = 88,["70"] = 88,["71"] = 88,["72"] = 90,["73"] = 91,["74"] = 91,["76"] = 92,["77"] = 92,["79"] = 93,["80"] = 93,["82"] = 94,["83"] = 94,["85"] = 95,["86"] = 95,["88"] = 97,["89"] = 98,["90"] = 97,["91"] = 100,["92"] = 101,["93"] = 102,["95"] = 100,["96"] = 105,["97"] = 106,["98"] = 107,["100"] = 105,["102"] = 112,["103"] = 112,["105"] = 114,["106"] = 115,["107"] = 116,["108"] = 116,["109"] = 116,["110"] = 116,["111"] = 116,["112"] = 116,["113"] = 116,["114"] = 116,["115"] = 116,["116"] = 114,["117"] = 119,["118"] = 120,["119"] = 121,["120"] = 121,["121"] = 121,["122"] = 121,["123"] = 121,["124"] = 121,["125"] = 121,["126"] = 121,["127"] = 121,["128"] = 119,["129"] = 123,["130"] = 123,["132"] = 124,["133"] = 125,["134"] = 126,["135"] = 124,["136"] = 128,["137"] = 128,["139"] = 129,["140"] = 130,["141"] = 130,["142"] = 130,["143"] = 130,["144"] = 130,["145"] = 130,["146"] = 129,["147"] = 132,["148"] = 133,["149"] = 132,["150"] = 136,["151"] = 136,["153"] = 137,["154"] = 138,["155"] = 137,["156"] = 140,["157"] = 140,["159"] = 141,["160"] = 142,["161"] = 141,["162"] = 312,["163"] = 313,["164"] = 313,["166"] = 314,["167"] = 315,["168"] = 316,["170"] = 318,["172"] = 314,["173"] = 322,["174"] = 322,["176"] = 323,["177"] = 324,["178"] = 325,["179"] = 326,["181"] = 328,["182"] = 329,["183"] = 323,["184"] = 331,["185"] = 331,["187"] = 332,["188"] = 333,["189"] = 334,["190"] = 335,["192"] = 332,["193"] = 338,["194"] = 338,["196"] = 339,["197"] = 340,["198"] = 341,["199"] = 342,["201"] = 344,["203"] = 339,["204"] = 348,["205"] = 349,["206"] = 349,["208"] = 350,["209"] = 348,["210"] = 353,["211"] = 353,["213"] = 354,["214"] = 355,["217"] = 356,["218"] = 357,["219"] = 358,["220"] = 359,["221"] = 360,["223"] = 362,["225"] = 364,["226"] = 354,["227"] = 367,["228"] = 367,["230"] = 368,["231"] = 369,["232"] = 371,["233"] = 372,["234"] = 373,["235"] = 374,["236"] = 374,["237"] = 374,["238"] = 374,["239"] = 375,["242"] = 376,["245"] = 377,["248"] = 378,["249"] = 374,["250"] = 374,["252"] = 368,["253"] = 383,["254"] = 383,["256"] = 384,["257"] = 385,["258"] = 385,["259"] = 385,["261"] = 385,["262"] = 384,["263"] = 387,["264"] = 387,["266"] = 389,["267"] = 390,["268"] = 391,["269"] = 393,["270"] = 394,["273"] = 397,["274"] = 399,["275"] = 400,["277"] = 402,["278"] = 403,["279"] = 404,["283"] = 408,["285"] = 410,["286"] = 411,["287"] = 412,["288"] = 413,["289"] = 414,["290"] = 414,["291"] = 414,["292"] = 414,["294"] = 416,["295"] = 416,["296"] = 416,["297"] = 416,["301"] = 420,["302"] = 389,["303"] = 423,["304"] = 423,["305"] = 424,["306"] = 425,["307"] = 426,["308"] = 427,["309"] = 428,["310"] = 429,["311"] = 429,["312"] = 429,["313"] = 429,["314"] = 429,["315"] = 429,["316"] = 429,["317"] = 430,["318"] = 431,["319"] = 432,["320"] = 433,["321"] = 434,["322"] = 435,["323"] = 436,["324"] = 437,["325"] = 438,["326"] = 439,["328"] = 441,["329"] = 442,["332"] = 445,["333"] = 445,["334"] = 445,["335"] = 445,["336"] = 445,["337"] = 445,["338"] = 445,["339"] = 445,["340"] = 423,["341"] = 455,["342"] = 456,["345"] = 459,["346"] = 460,["347"] = 466,["348"] = 467,["349"] = 468,["350"] = 470,["352"] = 455,["353"] = 473,["354"] = 474,["357"] = 475,["360"] = 477,["361"] = 483,["362"] = 484,["363"] = 485,["364"] = 487,["366"] = 473,["367"] = 490,["368"] = 491,["371"] = 492,["374"] = 493,["377"] = 495,["378"] = 490,["379"] = 500,["380"] = 501,["381"] = 502,["382"] = 502,["383"] = 502,["384"] = 502,["385"] = 502,["386"] = 502,["387"] = 502,["388"] = 509,["389"] = 510,["391"] = 512,["392"] = 513,["393"] = 514,["395"] = 516,["396"] = 517,["397"] = 518,["399"] = 521,["400"] = 500,["401"] = 523,["402"] = 524,["405"] = 525,["408"] = 528,["409"] = 529,["410"] = 530,["411"] = 531,["412"] = 532,["413"] = 533,["414"] = 534,["415"] = 535,["417"] = 537,["418"] = 537,["419"] = 537,["420"] = 538,["423"] = 539,["424"] = 537,["425"] = 537,["426"] = 523,["427"] = 542,["428"] = 543,["431"] = 544,["432"] = 544,["434"] = 546,["435"] = 547,["436"] = 548,["437"] = 549,["438"] = 550,["440"] = 554,["441"] = 555,["442"] = 556,["443"] = 557,["444"] = 558,["445"] = 559,["446"] = 560,["447"] = 561,["448"] = 562,["449"] = 563,["450"] = 564,["451"] = 564,["452"] = 564,["454"] = 553,["455"] = 553,["456"] = 553,["457"] = 553,["458"] = 553,["459"] = 553,["460"] = 553,["461"] = 553,["462"] = 553,["463"] = 553,["464"] = 553,["465"] = 553,["466"] = 553,["467"] = 553,["468"] = 553,["469"] = 571,["470"] = 573,["471"] = 574,["472"] = 575,["473"] = 577,["475"] = 542,["476"] = 580,["477"] = 580,["479"] = 581,["480"] = 582,["481"] = 582,["483"] = 584,["484"] = 586,["485"] = 587,["487"] = 581,["488"] = 590,["489"] = 591,["490"] = 591,["492"] = 593,["493"] = 593,["494"] = 595,["495"] = 590,["496"] = 597,["497"] = 598,["498"] = 598,["500"] = 600,["501"] = 602,["502"] = 597,["503"] = 604,["504"] = 606,["507"] = 609,["508"] = 610,["509"] = 611,["510"] = 612,["512"] = 614,["513"] = 616,["514"] = 621,["517"] = 624,["518"] = 625,["520"] = 626,["521"] = 626,["523"] = 627,["524"] = 628,["525"] = 629,["526"] = 630,["527"] = 631,["528"] = 632,["529"] = 633,["530"] = 634,["531"] = 635,["536"] = 638,["539"] = 639,["540"] = 640,["541"] = 641,["542"] = 642,["543"] = 643,["544"] = 644,["545"] = 645,["546"] = 646,["547"] = 647,["549"] = 604,["550"] = 650,["551"] = 651,["552"] = 652,["553"] = 653,["554"] = 654,["555"] = 656,["556"] = 657,["557"] = 658,["558"] = 659,["559"] = 660,["560"] = 661,["561"] = 662,["562"] = 663,["563"] = 650,["564"] = 666,["565"] = 666,["567"] = 667,["568"] = 667,["570"] = 668,["571"] = 668,["573"] = 669,["574"] = 669,["576"] = 670,["577"] = 670,["578"] = 670,["580"] = 671,["581"] = 672,["582"] = 673,["583"] = 670,["584"] = 675,["585"] = 675,["586"] = 675,["588"] = 675,["589"] = 675,["591"] = 676,["592"] = 676,["593"] = 676,["594"] = 676,["595"] = 676,["596"] = 677,["597"] = 677,["599"] = 678,["600"] = 679,["602"] = 681,["603"] = 675,["604"] = 683,["605"] = 684,["606"] = 685,["607"] = 686,["608"] = 683,["609"] = 688,["610"] = 688,["611"] = 688,["613"] = 689,["614"] = 689,["615"] = 691,["616"] = 692,["617"] = 692,["618"] = 693,["619"] = 693,["620"] = 693,["622"] = 694,["624"] = 695,["627"] = 697,["628"] = 697,["629"] = 698,["630"] = 698,["632"] = 699,["633"] = 699,["634"] = 700,["637"] = 702,["638"] = 702,["639"] = 702,["640"] = 702,["641"] = 702,["642"] = 702,["643"] = 702,["644"] = 702,["645"] = 702,["646"] = 702,["647"] = 702,["648"] = 702,["649"] = 702,["650"] = 702,["651"] = 705,["652"] = 705,["654"] = 688,["655"] = 707,["656"] = 708,["657"] = 708,["659"] = 709,["662"] = 712,["663"] = 713,["664"] = 713,["665"] = 713,["667"] = 714,["668"] = 714,["669"] = 714,["670"] = 714,["671"] = 715,["672"] = 716,["673"] = 707,["674"] = 718,["675"] = 719,["676"] = 719,["678"] = 720,["679"] = 721,["680"] = 721,["681"] = 721,["682"] = 722,["683"] = 723,["684"] = 723,["685"] = 723,["687"] = 724,["688"] = 724,["689"] = 724,["690"] = 724,["691"] = 725,["692"] = 726,["694"] = 721,["695"] = 721,["696"] = 729,["697"] = 730,["698"] = 731,["699"] = 731,["700"] = 731,["701"] = 731,["702"] = 731,["703"] = 718,["704"] = 733,["705"] = 734,["707"] = 735,["708"] = 735,["709"] = 736,["710"] = 737,["711"] = 737,["713"] = 735,["716"] = 739,["717"] = 733,["718"] = 741,["719"] = 742,["720"] = 742,["722"] = 743,["723"] = 744,["724"] = 744,["725"] = 744,["726"] = 745,["727"] = 746,["729"] = 744,["730"] = 744,["731"] = 749,["732"] = 741,["733"] = 752,["734"] = 753,["735"] = 753,["737"] = 754,["738"] = 755,["739"] = 755,["740"] = 755,["741"] = 756,["742"] = 757,["744"] = 755,["745"] = 755,["746"] = 760,["747"] = 752,["748"] = 762,["749"] = 763,["750"] = 763,["752"] = 764,["753"] = 764,["754"] = 764,["755"] = 764,["756"] = 762,["757"] = 766,["758"] = 767,["759"] = 767,["761"] = 768,["762"] = 768,["763"] = 768,["764"] = 768,["765"] = 766,["766"] = 771,["767"] = 772,["768"] = 772,["770"] = 773,["771"] = 773,["772"] = 773,["773"] = 773,["774"] = 774,["775"] = 774,["776"] = 774,["777"] = 775,["778"] = 776,["779"] = 777,["780"] = 778,["781"] = 779,["782"] = 780,["783"] = 781,["784"] = 774,["785"] = 774,["786"] = 783,["787"] = 784,["791"] = 787,["792"] = 787,["793"] = 788,["794"] = 789,["795"] = 789,["797"] = 787,["800"] = 791,["801"] = 791,["802"] = 791,["803"] = 791,["804"] = 791,["805"] = 793,["806"] = 793,["807"] = 793,["808"] = 794,["809"] = 794,["810"] = 794,["811"] = 794,["812"] = 794,["813"] = 794,["814"] = 794,["815"] = 794,["816"] = 794,["817"] = 794,["818"] = 793,["819"] = 791,["820"] = 791,["821"] = 791,["822"] = 771,["823"] = 807,["825"] = 808,["826"] = 808,["827"] = 809,["828"] = 810,["829"] = 811,["831"] = 808,["834"] = 814,["835"] = 807,["836"] = 816,["838"] = 817,["839"] = 817,["840"] = 818,["841"] = 819,["842"] = 820,["844"] = 817,["847"] = 823,["848"] = 816,["849"] = 825,["851"] = 826,["852"] = 826,["853"] = 827,["854"] = 828,["855"] = 829,["857"] = 826,["860"] = 832,["861"] = 825,["862"] = 834,["863"] = 835,["864"] = 835,["865"] = 835,["866"] = 835,["867"] = 834,["868"] = 837,["869"] = 838,["870"] = 837,["871"] = 840,["872"] = 841,["873"] = 841,["874"] = 841,["875"] = 841,["876"] = 840,["878"] = 864,["879"] = 865,["880"] = 866,["881"] = 867,["882"] = 868,["883"] = 869,["884"] = 869,["885"] = 869,["886"] = 869,["887"] = 869,["888"] = 869,["889"] = 869,["890"] = 869,["891"] = 869,["892"] = 869,["893"] = 869,["894"] = 869,["895"] = 881,["896"] = 882,["897"] = 884,["898"] = 886,["900"] = 865,["902"] = 894,["903"] = 895,["904"] = 896,["907"] = 897,["908"] = 898,["909"] = 899,["910"] = 900,["911"] = 901,["912"] = 901,["913"] = 901,["914"] = 901,["915"] = 901,["916"] = 901,["918"] = 903,["919"] = 895,["921"] = 910,["922"] = 911,["923"] = 912,["924"] = 911,["926"] = 921,["927"] = 922,["928"] = 921,["929"] = 924,["930"] = 925,["931"] = 924,["932"] = 934,["933"] = 935,["934"] = 934,["935"] = 937,["936"] = 938,["937"] = 937});
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
BaseNPC.GetScepterLevel = function(self)
    local ____math_max_2 = math.max
    local ____opt_0 = self:FindModifierByName("modifier_scepter_custom")
    return ____math_max_2(
        0,
        ____opt_0 and ____opt_0:GetStackCount() or 0
    )
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
        local ____self___unitCanRespawn__3 = self.__unitCanRespawn_
        if ____self___unitCanRespawn__3 == nil then
            ____self___unitCanRespawn__3 = false
        end
        return ____self___unitCanRespawn__3
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
        local ____castPoint_5 = castPoint
        local ____castPoint_6 = castPoint
        local ____castAnimation_7 = castAnimation
        local ____orderType_8 = orderType
        local ____extraData_animationRate_9 = extraData.animationRate
        local ____temp_10 = extraData.position and VectorToString(extraData.position) or nil
        local ____temp_11 = IsValid(extraData.target) and extraData.target:entindex() or nil
        local ____extraData_bFadeAnimation_12 = extraData.bFadeAnimation
        local ____extraData_fadeAnimationTime_13 = extraData.fadeAnimationTime
        local ____activityModifier_14 = activityModifier
        local ____extraData_bIgnoreBackswing_4 = extraData.bIgnoreBackswing
        if ____extraData_bIgnoreBackswing_4 == nil then
            ____extraData_bIgnoreBackswing_4 = true
        end
        local data = {
            duration = ____castPoint_5,
            castPoint = ____castPoint_6,
            castAnimation = ____castAnimation_7,
            orderType = ____orderType_8,
            animationRate = ____extraData_animationRate_9,
            position = ____temp_10,
            targetIndex = ____temp_11,
            bFadeAnimation = ____extraData_bFadeAnimation_12,
            fadeAnimationTime = ____extraData_fadeAnimationTime_13,
            activityModifier = ____activityModifier_14,
            bIgnoreBackswing = ____extraData_bIgnoreBackswing_4,
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
        local ____self___activityModifiers_15 = self.__activityModifiers
        ____self___activityModifiers_15[#____self___activityModifiers_15 + 1] = sName
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
            if abilityTag == AbilityTag.Skill or abilityTag == AbilityTag.Dodge or abilityTag == AbilityTag.Defense or abilityTag == AbilityTag.Ultimate or abilityTag == AbilityTag.None and not ability:IsItem() then
                damage_category = DOTA_DAMAGE_CATEGORY_SPELL
            end
        end
        if __TS__ArrayIsArray(target) then
            for i, v in ipairs(target) do
                do
                    if not IsValid(v) then
                        goto __continue105
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
                ::__continue105::
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
        do
            local slot = 0
            while slot < self:GetAbilityCount() do
                local ability = self:GetAbilityByIndex(slot)
                if IsValid(ability) and type(ability.GetMaxCharges) == "function" then
                    abilities[#abilities + 1] = ability
                end
                slot = slot + 1
            end
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
        self:UpdateAbilityNetData()
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
        self:UpdateAbilityNetData()
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
