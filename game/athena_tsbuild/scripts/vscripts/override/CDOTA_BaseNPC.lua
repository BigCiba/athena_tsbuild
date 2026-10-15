local __TSTL_FILE_PATH__ = "override/CDOTA_BaseNPC"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 46,["11"] = 46,["12"] = 46,["13"] = 46,["14"] = 46,["15"] = 46,["16"] = 46,["17"] = 46,["18"] = 46,["19"] = 46,["20"] = 46,["21"] = 46,["22"] = 46,["23"] = 46,["24"] = 46,["25"] = 46,["26"] = 46,["27"] = 46,["28"] = 46,["29"] = 46,["30"] = 46,["31"] = 61,["32"] = 62,["33"] = 63,["34"] = 64,["36"] = 66,["37"] = 62,["38"] = 68,["39"] = 69,["40"] = 70,["41"] = 70,["43"] = 71,["44"] = 71,["45"] = 71,["46"] = 71,["47"] = 71,["48"] = 68,["49"] = 74,["50"] = 74,["52"] = 75,["53"] = 76,["54"] = 75,["55"] = 79,["56"] = 80,["57"] = 80,["59"] = 81,["60"] = 81,["62"] = 82,["63"] = 82,["65"] = 83,["66"] = 83,["68"] = 84,["69"] = 84,["71"] = 86,["72"] = 87,["73"] = 86,["74"] = 89,["75"] = 90,["76"] = 91,["78"] = 89,["79"] = 94,["80"] = 95,["81"] = 96,["83"] = 94,["85"] = 101,["86"] = 101,["88"] = 103,["89"] = 104,["90"] = 105,["91"] = 105,["92"] = 105,["93"] = 105,["94"] = 105,["95"] = 105,["96"] = 105,["97"] = 105,["98"] = 105,["99"] = 103,["100"] = 108,["101"] = 109,["102"] = 110,["103"] = 110,["104"] = 110,["105"] = 110,["106"] = 110,["107"] = 110,["108"] = 110,["109"] = 110,["110"] = 110,["111"] = 108,["112"] = 112,["113"] = 112,["115"] = 113,["116"] = 114,["117"] = 115,["118"] = 113,["119"] = 117,["120"] = 117,["122"] = 118,["123"] = 119,["124"] = 120,["125"] = 118,["126"] = 127,["127"] = 127,["129"] = 128,["130"] = 129,["131"] = 128,["132"] = 131,["133"] = 131,["135"] = 132,["136"] = 133,["137"] = 132,["138"] = 301,["139"] = 302,["140"] = 302,["142"] = 303,["143"] = 304,["144"] = 305,["146"] = 307,["148"] = 303,["149"] = 311,["150"] = 311,["152"] = 312,["153"] = 313,["154"] = 314,["155"] = 315,["157"] = 317,["158"] = 318,["159"] = 312,["160"] = 320,["161"] = 320,["163"] = 321,["164"] = 322,["165"] = 323,["166"] = 324,["168"] = 321,["169"] = 327,["170"] = 327,["172"] = 328,["173"] = 329,["174"] = 330,["175"] = 331,["177"] = 333,["179"] = 328,["180"] = 337,["181"] = 338,["182"] = 338,["184"] = 339,["185"] = 337,["186"] = 342,["187"] = 342,["189"] = 343,["190"] = 344,["193"] = 345,["194"] = 346,["195"] = 347,["196"] = 348,["197"] = 349,["199"] = 351,["201"] = 353,["202"] = 343,["203"] = 356,["204"] = 356,["206"] = 357,["207"] = 358,["208"] = 360,["209"] = 361,["210"] = 362,["211"] = 363,["212"] = 363,["213"] = 363,["214"] = 363,["215"] = 364,["218"] = 365,["221"] = 366,["224"] = 367,["225"] = 363,["226"] = 363,["228"] = 357,["229"] = 372,["230"] = 372,["232"] = 373,["233"] = 374,["234"] = 374,["235"] = 374,["237"] = 374,["238"] = 373,["239"] = 376,["240"] = 376,["242"] = 378,["243"] = 379,["244"] = 380,["245"] = 382,["246"] = 383,["249"] = 386,["250"] = 388,["251"] = 389,["253"] = 391,["254"] = 392,["255"] = 393,["259"] = 397,["261"] = 399,["262"] = 400,["263"] = 401,["264"] = 402,["265"] = 403,["266"] = 403,["267"] = 403,["268"] = 403,["270"] = 405,["271"] = 405,["272"] = 405,["273"] = 405,["277"] = 409,["278"] = 378,["279"] = 412,["280"] = 412,["281"] = 413,["282"] = 414,["283"] = 415,["284"] = 416,["285"] = 417,["286"] = 418,["287"] = 418,["288"] = 418,["289"] = 418,["290"] = 418,["291"] = 418,["292"] = 418,["293"] = 419,["294"] = 420,["295"] = 421,["296"] = 422,["297"] = 423,["298"] = 424,["299"] = 425,["300"] = 426,["301"] = 427,["302"] = 428,["304"] = 430,["305"] = 431,["308"] = 434,["309"] = 434,["310"] = 434,["311"] = 434,["312"] = 434,["313"] = 434,["314"] = 434,["315"] = 434,["316"] = 412,["317"] = 444,["318"] = 445,["321"] = 448,["322"] = 449,["323"] = 455,["324"] = 456,["325"] = 457,["326"] = 459,["328"] = 444,["329"] = 462,["330"] = 463,["333"] = 464,["336"] = 466,["337"] = 472,["338"] = 473,["339"] = 474,["340"] = 476,["342"] = 462,["343"] = 479,["344"] = 480,["347"] = 481,["350"] = 482,["353"] = 484,["354"] = 479,["355"] = 489,["356"] = 490,["357"] = 491,["358"] = 491,["359"] = 491,["360"] = 491,["361"] = 491,["362"] = 491,["363"] = 491,["364"] = 498,["365"] = 499,["367"] = 501,["368"] = 502,["369"] = 503,["371"] = 505,["372"] = 506,["373"] = 507,["375"] = 510,["376"] = 489,["377"] = 512,["378"] = 513,["381"] = 514,["384"] = 517,["385"] = 518,["386"] = 519,["387"] = 520,["388"] = 521,["389"] = 522,["390"] = 523,["391"] = 524,["393"] = 526,["394"] = 526,["395"] = 526,["396"] = 527,["399"] = 528,["400"] = 526,["401"] = 526,["402"] = 512,["403"] = 531,["404"] = 532,["407"] = 533,["408"] = 533,["410"] = 535,["411"] = 536,["412"] = 537,["413"] = 538,["414"] = 539,["416"] = 543,["417"] = 544,["418"] = 545,["419"] = 546,["420"] = 547,["421"] = 548,["422"] = 549,["423"] = 550,["424"] = 551,["425"] = 552,["426"] = 553,["427"] = 553,["428"] = 553,["430"] = 542,["431"] = 542,["432"] = 542,["433"] = 542,["434"] = 542,["435"] = 542,["436"] = 542,["437"] = 542,["438"] = 542,["439"] = 542,["440"] = 542,["441"] = 542,["442"] = 542,["443"] = 542,["444"] = 542,["445"] = 560,["446"] = 562,["447"] = 563,["448"] = 564,["449"] = 566,["451"] = 531,["452"] = 569,["453"] = 569,["455"] = 570,["456"] = 571,["457"] = 571,["459"] = 573,["460"] = 575,["461"] = 576,["463"] = 570,["464"] = 579,["465"] = 580,["466"] = 580,["468"] = 582,["469"] = 582,["470"] = 584,["471"] = 579,["472"] = 586,["473"] = 587,["474"] = 587,["476"] = 589,["477"] = 591,["478"] = 586,["479"] = 593,["480"] = 595,["483"] = 598,["484"] = 599,["485"] = 600,["486"] = 601,["488"] = 603,["489"] = 605,["490"] = 610,["493"] = 613,["494"] = 614,["496"] = 615,["497"] = 615,["499"] = 616,["500"] = 617,["501"] = 618,["502"] = 619,["503"] = 620,["504"] = 621,["505"] = 622,["506"] = 623,["507"] = 624,["512"] = 627,["515"] = 628,["516"] = 629,["517"] = 630,["518"] = 631,["519"] = 632,["520"] = 633,["521"] = 634,["522"] = 635,["523"] = 636,["525"] = 593,["526"] = 639,["527"] = 640,["528"] = 641,["529"] = 642,["530"] = 643,["531"] = 645,["532"] = 646,["533"] = 647,["534"] = 648,["535"] = 649,["536"] = 650,["537"] = 651,["538"] = 652,["539"] = 639,["540"] = 655,["541"] = 655,["543"] = 656,["544"] = 656,["546"] = 657,["547"] = 657,["549"] = 658,["550"] = 658,["551"] = 658,["553"] = 659,["554"] = 659,["556"] = 660,["557"] = 661,["558"] = 662,["559"] = 662,["560"] = 662,["561"] = 662,["562"] = 662,["563"] = 662,["564"] = 662,["565"] = 662,["566"] = 662,["567"] = 662,["568"] = 662,["569"] = 662,["570"] = 673,["571"] = 674,["572"] = 675,["573"] = 676,["575"] = 678,["576"] = 658,["577"] = 680,["578"] = 680,["579"] = 680,["581"] = 680,["582"] = 680,["584"] = 681,["585"] = 681,["587"] = 682,["588"] = 683,["589"] = 684,["590"] = 685,["592"] = 687,["593"] = 687,["594"] = 687,["595"] = 687,["596"] = 687,["597"] = 687,["598"] = 687,["599"] = 687,["600"] = 687,["601"] = 687,["602"] = 687,["603"] = 687,["604"] = 698,["605"] = 699,["606"] = 700,["607"] = 701,["609"] = 703,["610"] = 680,["611"] = 705,["612"] = 706,["613"] = 706,["615"] = 707,["618"] = 710,["619"] = 711,["620"] = 712,["621"] = 712,["622"] = 712,["623"] = 712,["624"] = 713,["625"] = 714,["626"] = 715,["627"] = 705,["628"] = 717,["629"] = 718,["630"] = 718,["632"] = 719,["633"] = 720,["634"] = 720,["635"] = 720,["636"] = 721,["637"] = 722,["638"] = 723,["639"] = 723,["640"] = 723,["641"] = 723,["642"] = 724,["643"] = 725,["645"] = 720,["646"] = 720,["647"] = 728,["648"] = 729,["649"] = 729,["650"] = 729,["651"] = 729,["652"] = 729,["653"] = 717,["654"] = 731,["655"] = 732,["656"] = 733,["657"] = 733,["659"] = 734,["660"] = 734,["661"] = 734,["662"] = 735,["663"] = 736,["664"] = 737,["666"] = 734,["667"] = 734,["668"] = 740,["669"] = 731,["670"] = 742,["671"] = 743,["672"] = 743,["674"] = 744,["675"] = 745,["676"] = 745,["677"] = 745,["678"] = 746,["679"] = 747,["681"] = 745,["682"] = 745,["683"] = 750,["684"] = 742,["685"] = 753,["686"] = 754,["687"] = 754,["689"] = 755,["690"] = 756,["691"] = 756,["692"] = 756,["693"] = 757,["694"] = 758,["696"] = 756,["697"] = 756,["698"] = 761,["699"] = 753,["700"] = 763,["701"] = 764,["702"] = 764,["704"] = 765,["705"] = 765,["706"] = 765,["707"] = 765,["708"] = 763,["709"] = 767,["710"] = 768,["711"] = 768,["713"] = 769,["714"] = 769,["715"] = 769,["716"] = 769,["717"] = 767,["718"] = 772,["719"] = 773,["720"] = 773,["722"] = 774,["723"] = 774,["724"] = 774,["725"] = 775,["726"] = 776,["727"] = 777,["728"] = 778,["729"] = 779,["730"] = 780,["731"] = 781,["732"] = 774,["733"] = 774,["734"] = 783,["735"] = 784,["738"] = 787,["739"] = 787,["740"] = 787,["741"] = 787,["742"] = 787,["743"] = 789,["744"] = 789,["745"] = 789,["746"] = 790,["747"] = 790,["748"] = 790,["749"] = 790,["750"] = 790,["751"] = 790,["752"] = 790,["753"] = 790,["754"] = 790,["755"] = 790,["756"] = 789,["757"] = 787,["758"] = 787,["759"] = 787,["760"] = 772,["761"] = 803,["763"] = 804,["764"] = 804,["765"] = 805,["766"] = 806,["767"] = 807,["769"] = 804,["772"] = 803,["773"] = 811,["775"] = 812,["776"] = 812,["777"] = 813,["778"] = 814,["779"] = 815,["781"] = 812,["784"] = 811,["785"] = 819,["787"] = 820,["788"] = 820,["789"] = 821,["790"] = 822,["791"] = 823,["793"] = 820,["796"] = 826,["797"] = 819,["798"] = 828,["799"] = 829,["800"] = 829,["801"] = 829,["802"] = 829,["803"] = 828,["804"] = 831,["805"] = 832,["806"] = 831,["807"] = 834,["808"] = 835,["809"] = 835,["810"] = 835,["811"] = 835,["812"] = 834,["814"] = 858,["815"] = 859,["816"] = 860,["817"] = 861,["818"] = 862,["819"] = 863,["820"] = 863,["821"] = 863,["822"] = 863,["823"] = 863,["824"] = 863,["825"] = 863,["826"] = 863,["827"] = 863,["828"] = 863,["829"] = 863,["830"] = 863,["831"] = 875,["832"] = 876,["833"] = 878,["834"] = 880,["836"] = 859,["838"] = 888,["839"] = 889,["840"] = 890,["843"] = 891,["844"] = 892,["845"] = 893,["846"] = 894,["847"] = 895,["848"] = 895,["849"] = 895,["850"] = 895,["851"] = 895,["852"] = 895,["854"] = 897,["855"] = 889,["857"] = 904,["858"] = 905,["859"] = 906,["860"] = 905,["862"] = 915,["863"] = 916,["864"] = 915,["865"] = 918,["866"] = 919,["867"] = 918,["868"] = 928,["869"] = 929,["870"] = 928,["871"] = 931,["872"] = 932,["873"] = 931});
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
if BaseNPC.GetAttackDamage_Engine == nil then
    BaseNPC.GetAttackDamage_Engine = BaseNPC.GetAttackDamage
end
BaseNPC.GetAttackDamage = function(self)
    return (self:GetProperty(PropertyFunction.BASE_ATTACK) + self:GetProperty(PropertyFunction.ATTACK)) * (1 + self:GetProperty(PropertyFunction.ATTACK_AMPLIFY) / 100)
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
    local defenseIntensity = self:GetProperty(PropertyFunction.DEFENSE_INTENSITY) * (1 + self:GetProperty(PropertyFunction.DEFENSE_INTENSITY_BOOST) * 0.01)
    return math.floor((self:GetProperty(PropertyFunction.BASE_HEALTH) + self:GetProperty(PropertyFunction.HEALTH)) * (1 + self:GetProperty(PropertyFunction.HEALTH_AMPLIFY) * 0.01) * (1 + defenseIntensity * INTENSITY_FACTOR * 0.01))
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
    return math.floor((self:GetProperty(PropertyFunction.BASE_MANA) + self:GetProperty(PropertyFunction.MANA)) * (1 + self:GetProperty(PropertyFunction.MANA_AMPLIFY) * 0.01))
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
                        goto __continue101
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
                ::__continue101::
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
    CDOTA_BaseNPC.AddItem = function(self, item, updateNetData)
        if updateNetData == nil then
            updateNetData = true
        end
        if self.__items == nil then
            self.__items = {}
        end
        self:AddItem_Engine(item)
        item:__OnCreated()
        local ____self___items_23 = self.__items
        ____self___items_23[#____self___items_23 + 1] = {
            entIndex = item:entindex(),
            itemName = item:GetAbilityName(),
            level = item:GetLevel(),
            stackCount = item.__StackCount or 0,
            charge = item.__Charge or 0,
            maxCharge = item:GetMaxCharges(),
            chargeRestoreTime = item.__ChargeRestoreTime or 0,
            isChargeCooldownFrozen = item:IsChargeCooldownFrozen(),
            chargeFrozenCooldownRemaining = item:GetChargeCooldownRemaining()
        }
        self:TakeItem(item)
        Event:Fire("item_added", {unit = self, item = item})
        if updateNetData then
            self:UpdateAbilityNetData()
        end
        return item
    end
    CDOTA_BaseNPC.AddItemByName = function(self, itemName, level, updateNetData)
        if level == nil then
            level = 1
        end
        if updateNetData == nil then
            updateNetData = true
        end
        if self.__items == nil then
            self.__items = {}
        end
        local item = self:AddItemByName_Engine(itemName)
        item:__OnCreated()
        if level > 1 then
            item:SetLevel(level, false)
        end
        local ____self___items_24 = self.__items
        ____self___items_24[#____self___items_24 + 1] = {
            entIndex = item:entindex(),
            itemName = item:GetAbilityName(),
            level = item:GetLevel(),
            stackCount = item.__StackCount or 0,
            charge = item.__Charge or 0,
            maxCharge = item:GetMaxCharges(),
            chargeRestoreTime = item.__ChargeRestoreTime or 0,
            isChargeCooldownFrozen = item:IsChargeCooldownFrozen(),
            chargeFrozenCooldownRemaining = item:GetChargeCooldownRemaining()
        }
        self:TakeItem(item)
        Event:Fire("item_added", {unit = self, item = item})
        if updateNetData then
            self:UpdateAbilityNetData()
        end
        return item
    end
    CDOTA_BaseNPC.RemoveItem = function(self, item)
        if self.__items == nil then
            self.__items = {}
        end
        if not IsValid(item) then
            return
        end
        Event:Fire("item_consumed", {unit = self, item = item})
        item:__OnDestroy()
        self.__items = __TS__ArrayFilter(
            self.__items,
            function(____, data) return data.entIndex ~= item:entindex() end
        )
        self:RemoveItem_Engine(item)
        Event:Fire("item_removed", {unit = self, item = item})
        self:UpdateAbilityNetData()
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
                    item:__OnDestroy()
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
        CustomNetTables:SetNetData(
            "unit",
            tostring(self:entindex()),
            nil
        )
    end
    CDOTA_BaseNPC.GetAllItems = function(self)
        local items = {}
        if self.__items == nil then
            self.__items = {}
        end
        __TS__ArrayForEach(
            self.__items,
            function(____, data)
                local item = EntIndexToHScript(data.entIndex)
                if IsValid(item) then
                    items[#items + 1] = item
                end
            end
        )
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
