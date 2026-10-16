local __TSTL_FILE_PATH__ = "override/CDOTA_BaseNPC"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 49,["11"] = 49,["12"] = 49,["13"] = 49,["14"] = 49,["15"] = 49,["16"] = 49,["17"] = 49,["18"] = 49,["19"] = 49,["20"] = 49,["21"] = 49,["22"] = 49,["23"] = 49,["24"] = 49,["25"] = 49,["26"] = 49,["27"] = 49,["28"] = 49,["29"] = 49,["30"] = 49,["31"] = 64,["32"] = 65,["33"] = 66,["34"] = 67,["36"] = 69,["37"] = 65,["38"] = 71,["39"] = 72,["40"] = 73,["41"] = 73,["43"] = 74,["44"] = 74,["45"] = 74,["46"] = 74,["47"] = 74,["48"] = 71,["49"] = 77,["50"] = 78,["51"] = 78,["52"] = 78,["53"] = 78,["54"] = 78,["55"] = 77,["56"] = 81,["57"] = 81,["59"] = 82,["60"] = 83,["61"] = 82,["62"] = 85,["63"] = 85,["64"] = 85,["66"] = 85,["67"] = 85,["68"] = 86,["69"] = 86,["70"] = 86,["71"] = 88,["72"] = 89,["73"] = 89,["75"] = 90,["76"] = 90,["78"] = 91,["79"] = 91,["81"] = 92,["82"] = 92,["84"] = 93,["85"] = 93,["87"] = 95,["88"] = 96,["89"] = 95,["90"] = 98,["91"] = 99,["92"] = 100,["94"] = 98,["95"] = 103,["96"] = 104,["97"] = 105,["99"] = 103,["101"] = 110,["102"] = 110,["104"] = 112,["105"] = 113,["106"] = 114,["107"] = 114,["108"] = 114,["109"] = 114,["110"] = 114,["111"] = 114,["112"] = 114,["113"] = 114,["114"] = 114,["115"] = 112,["116"] = 117,["117"] = 118,["118"] = 119,["119"] = 119,["120"] = 119,["121"] = 119,["122"] = 119,["123"] = 119,["124"] = 119,["125"] = 119,["126"] = 119,["127"] = 117,["128"] = 121,["129"] = 121,["131"] = 122,["132"] = 123,["133"] = 124,["134"] = 122,["135"] = 126,["136"] = 126,["138"] = 127,["139"] = 128,["140"] = 127,["141"] = 131,["142"] = 131,["144"] = 132,["145"] = 133,["146"] = 132,["147"] = 135,["148"] = 135,["150"] = 136,["151"] = 137,["152"] = 136,["153"] = 303,["154"] = 304,["155"] = 304,["157"] = 305,["158"] = 306,["159"] = 307,["161"] = 309,["163"] = 305,["164"] = 313,["165"] = 313,["167"] = 314,["168"] = 315,["169"] = 316,["170"] = 317,["172"] = 319,["173"] = 320,["174"] = 314,["175"] = 322,["176"] = 322,["178"] = 323,["179"] = 324,["180"] = 325,["181"] = 326,["183"] = 323,["184"] = 329,["185"] = 329,["187"] = 330,["188"] = 331,["189"] = 332,["190"] = 333,["192"] = 335,["194"] = 330,["195"] = 339,["196"] = 340,["197"] = 340,["199"] = 341,["200"] = 339,["201"] = 344,["202"] = 344,["204"] = 345,["205"] = 346,["208"] = 347,["209"] = 348,["210"] = 349,["211"] = 350,["212"] = 351,["214"] = 353,["216"] = 355,["217"] = 345,["218"] = 358,["219"] = 358,["221"] = 359,["222"] = 360,["223"] = 362,["224"] = 363,["225"] = 364,["226"] = 365,["227"] = 365,["228"] = 365,["229"] = 365,["230"] = 366,["233"] = 367,["236"] = 368,["239"] = 369,["240"] = 365,["241"] = 365,["243"] = 359,["244"] = 374,["245"] = 374,["247"] = 375,["248"] = 376,["249"] = 376,["250"] = 376,["252"] = 376,["253"] = 375,["254"] = 378,["255"] = 378,["257"] = 380,["258"] = 381,["259"] = 382,["260"] = 384,["261"] = 385,["264"] = 388,["265"] = 390,["266"] = 391,["268"] = 393,["269"] = 394,["270"] = 395,["274"] = 399,["276"] = 401,["277"] = 402,["278"] = 403,["279"] = 404,["280"] = 405,["281"] = 405,["282"] = 405,["283"] = 405,["285"] = 407,["286"] = 407,["287"] = 407,["288"] = 407,["292"] = 411,["293"] = 380,["294"] = 414,["295"] = 414,["296"] = 415,["297"] = 416,["298"] = 417,["299"] = 418,["300"] = 419,["301"] = 420,["302"] = 420,["303"] = 420,["304"] = 420,["305"] = 420,["306"] = 420,["307"] = 420,["308"] = 421,["309"] = 422,["310"] = 423,["311"] = 424,["312"] = 425,["313"] = 426,["314"] = 427,["315"] = 428,["316"] = 429,["317"] = 430,["319"] = 432,["320"] = 433,["323"] = 436,["324"] = 436,["325"] = 436,["326"] = 436,["327"] = 436,["328"] = 436,["329"] = 436,["330"] = 436,["331"] = 414,["332"] = 446,["333"] = 447,["336"] = 450,["337"] = 451,["338"] = 457,["339"] = 458,["340"] = 459,["341"] = 461,["343"] = 446,["344"] = 464,["345"] = 465,["348"] = 466,["351"] = 468,["352"] = 474,["353"] = 475,["354"] = 476,["355"] = 478,["357"] = 464,["358"] = 481,["359"] = 482,["362"] = 483,["365"] = 484,["368"] = 486,["369"] = 481,["370"] = 491,["371"] = 492,["372"] = 493,["373"] = 493,["374"] = 493,["375"] = 493,["376"] = 493,["377"] = 493,["378"] = 493,["379"] = 500,["380"] = 501,["382"] = 503,["383"] = 504,["384"] = 505,["386"] = 507,["387"] = 508,["388"] = 509,["390"] = 512,["391"] = 491,["392"] = 514,["393"] = 515,["396"] = 516,["399"] = 519,["400"] = 520,["401"] = 521,["402"] = 522,["403"] = 523,["404"] = 524,["405"] = 525,["406"] = 526,["408"] = 528,["409"] = 528,["410"] = 528,["411"] = 529,["414"] = 530,["415"] = 528,["416"] = 528,["417"] = 514,["418"] = 533,["419"] = 534,["422"] = 535,["423"] = 535,["425"] = 537,["426"] = 538,["427"] = 539,["428"] = 540,["429"] = 541,["431"] = 545,["432"] = 546,["433"] = 547,["434"] = 548,["435"] = 549,["436"] = 550,["437"] = 551,["438"] = 552,["439"] = 553,["440"] = 554,["441"] = 555,["442"] = 555,["443"] = 555,["445"] = 544,["446"] = 544,["447"] = 544,["448"] = 544,["449"] = 544,["450"] = 544,["451"] = 544,["452"] = 544,["453"] = 544,["454"] = 544,["455"] = 544,["456"] = 544,["457"] = 544,["458"] = 544,["459"] = 544,["460"] = 562,["461"] = 564,["462"] = 565,["463"] = 566,["464"] = 568,["466"] = 533,["467"] = 571,["468"] = 571,["470"] = 572,["471"] = 573,["472"] = 573,["474"] = 575,["475"] = 577,["476"] = 578,["478"] = 572,["479"] = 581,["480"] = 582,["481"] = 582,["483"] = 584,["484"] = 584,["485"] = 586,["486"] = 581,["487"] = 588,["488"] = 589,["489"] = 589,["491"] = 591,["492"] = 593,["493"] = 588,["494"] = 595,["495"] = 597,["498"] = 600,["499"] = 601,["500"] = 602,["501"] = 603,["503"] = 605,["504"] = 607,["505"] = 612,["508"] = 615,["509"] = 616,["511"] = 617,["512"] = 617,["514"] = 618,["515"] = 619,["516"] = 620,["517"] = 621,["518"] = 622,["519"] = 623,["520"] = 624,["521"] = 625,["522"] = 626,["527"] = 629,["530"] = 630,["531"] = 631,["532"] = 632,["533"] = 633,["534"] = 634,["535"] = 635,["536"] = 636,["537"] = 637,["538"] = 638,["540"] = 595,["541"] = 641,["542"] = 642,["543"] = 643,["544"] = 644,["545"] = 645,["546"] = 647,["547"] = 648,["548"] = 649,["549"] = 650,["550"] = 651,["551"] = 652,["552"] = 653,["553"] = 654,["554"] = 641,["555"] = 657,["556"] = 657,["558"] = 658,["559"] = 658,["561"] = 659,["562"] = 659,["564"] = 660,["565"] = 660,["566"] = 660,["568"] = 661,["569"] = 661,["571"] = 662,["572"] = 663,["573"] = 664,["574"] = 664,["575"] = 664,["576"] = 664,["577"] = 664,["578"] = 664,["579"] = 664,["580"] = 664,["581"] = 664,["582"] = 664,["583"] = 664,["584"] = 664,["585"] = 675,["586"] = 676,["587"] = 677,["588"] = 678,["590"] = 680,["591"] = 660,["592"] = 682,["593"] = 682,["594"] = 682,["596"] = 682,["597"] = 682,["599"] = 683,["600"] = 683,["602"] = 684,["603"] = 685,["604"] = 686,["605"] = 687,["607"] = 689,["608"] = 689,["609"] = 689,["610"] = 689,["611"] = 689,["612"] = 689,["613"] = 689,["614"] = 689,["615"] = 689,["616"] = 689,["617"] = 689,["618"] = 689,["619"] = 700,["620"] = 701,["621"] = 702,["622"] = 703,["624"] = 705,["625"] = 682,["626"] = 707,["627"] = 708,["628"] = 708,["630"] = 709,["633"] = 712,["634"] = 713,["635"] = 714,["636"] = 714,["637"] = 714,["638"] = 714,["639"] = 715,["640"] = 716,["641"] = 717,["642"] = 707,["643"] = 719,["644"] = 720,["645"] = 720,["647"] = 721,["648"] = 722,["649"] = 722,["650"] = 722,["651"] = 723,["652"] = 724,["653"] = 725,["654"] = 725,["655"] = 725,["656"] = 725,["657"] = 726,["658"] = 727,["660"] = 722,["661"] = 722,["662"] = 730,["663"] = 731,["664"] = 731,["665"] = 731,["666"] = 731,["667"] = 731,["668"] = 719,["669"] = 733,["670"] = 734,["671"] = 735,["672"] = 735,["674"] = 736,["675"] = 736,["676"] = 736,["677"] = 737,["678"] = 738,["679"] = 739,["681"] = 736,["682"] = 736,["683"] = 742,["684"] = 733,["685"] = 744,["686"] = 745,["687"] = 745,["689"] = 746,["690"] = 747,["691"] = 747,["692"] = 747,["693"] = 748,["694"] = 749,["696"] = 747,["697"] = 747,["698"] = 752,["699"] = 744,["700"] = 755,["701"] = 756,["702"] = 756,["704"] = 757,["705"] = 758,["706"] = 758,["707"] = 758,["708"] = 759,["709"] = 760,["711"] = 758,["712"] = 758,["713"] = 763,["714"] = 755,["715"] = 765,["716"] = 766,["717"] = 766,["719"] = 767,["720"] = 767,["721"] = 767,["722"] = 767,["723"] = 765,["724"] = 769,["725"] = 770,["726"] = 770,["728"] = 771,["729"] = 771,["730"] = 771,["731"] = 771,["732"] = 769,["733"] = 774,["734"] = 775,["735"] = 775,["737"] = 776,["738"] = 776,["739"] = 776,["740"] = 777,["741"] = 778,["742"] = 779,["743"] = 780,["744"] = 781,["745"] = 782,["746"] = 783,["747"] = 776,["748"] = 776,["749"] = 785,["750"] = 786,["753"] = 789,["754"] = 789,["755"] = 789,["756"] = 789,["757"] = 789,["758"] = 791,["759"] = 791,["760"] = 791,["761"] = 792,["762"] = 792,["763"] = 792,["764"] = 792,["765"] = 792,["766"] = 792,["767"] = 792,["768"] = 792,["769"] = 792,["770"] = 792,["771"] = 791,["772"] = 789,["773"] = 789,["774"] = 789,["775"] = 774,["776"] = 805,["778"] = 806,["779"] = 806,["780"] = 807,["781"] = 808,["782"] = 809,["784"] = 806,["787"] = 805,["788"] = 813,["790"] = 814,["791"] = 814,["792"] = 815,["793"] = 816,["794"] = 817,["796"] = 814,["799"] = 813,["800"] = 821,["802"] = 822,["803"] = 822,["804"] = 823,["805"] = 824,["806"] = 825,["808"] = 822,["811"] = 828,["812"] = 821,["813"] = 830,["814"] = 831,["815"] = 831,["816"] = 831,["817"] = 831,["818"] = 830,["819"] = 833,["820"] = 834,["821"] = 833,["822"] = 836,["823"] = 837,["824"] = 837,["825"] = 837,["826"] = 837,["827"] = 836,["829"] = 860,["830"] = 861,["831"] = 862,["832"] = 863,["833"] = 864,["834"] = 865,["835"] = 865,["836"] = 865,["837"] = 865,["838"] = 865,["839"] = 865,["840"] = 865,["841"] = 865,["842"] = 865,["843"] = 865,["844"] = 865,["845"] = 865,["846"] = 877,["847"] = 878,["848"] = 880,["849"] = 882,["851"] = 861,["853"] = 890,["854"] = 891,["855"] = 892,["858"] = 893,["859"] = 894,["860"] = 895,["861"] = 896,["862"] = 897,["863"] = 897,["864"] = 897,["865"] = 897,["866"] = 897,["867"] = 897,["869"] = 899,["870"] = 891,["872"] = 906,["873"] = 907,["874"] = 908,["875"] = 907,["877"] = 917,["878"] = 918,["879"] = 917,["880"] = 920,["881"] = 921,["882"] = 920,["883"] = 930,["884"] = 931,["885"] = 930,["886"] = 933,["887"] = 934,["888"] = 933});
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
