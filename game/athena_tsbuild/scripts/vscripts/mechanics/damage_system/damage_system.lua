local __TSTL_FILE_PATH__ = "mechanics/damage_system/damage_system"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 4,["20"] = 27,["21"] = 27,["22"] = 28,["24"] = 28,["25"] = 35,["26"] = 36,["27"] = 37,["28"] = 38,["29"] = 27,["30"] = 42,["31"] = 43,["34"] = 46,["35"] = 46,["36"] = 46,["37"] = 47,["38"] = 46,["39"] = 46,["40"] = 53,["41"] = 54,["42"] = 55,["43"] = 56,["44"] = 57,["45"] = 58,["46"] = 59,["47"] = 60,["48"] = 61,["49"] = 62,["50"] = 46,["51"] = 46,["52"] = 64,["53"] = 65,["54"] = 66,["55"] = 67,["56"] = 42,["57"] = 74,["58"] = 75,["59"] = 76,["60"] = 78,["61"] = 79,["63"] = 82,["66"] = 86,["67"] = 87,["68"] = 87,["69"] = 88,["72"] = 92,["73"] = 93,["74"] = 93,["75"] = 93,["76"] = 94,["77"] = 95,["78"] = 96,["79"] = 97,["80"] = 99,["81"] = 100,["82"] = 101,["83"] = 102,["84"] = 102,["85"] = 102,["86"] = 102,["87"] = 102,["88"] = 102,["89"] = 102,["90"] = 102,["91"] = 102,["92"] = 111,["93"] = 112,["96"] = 115,["97"] = 116,["99"] = 119,["100"] = 120,["101"] = 120,["102"] = 120,["103"] = 120,["106"] = 93,["107"] = 93,["108"] = 74,["109"] = 130,["110"] = 131,["111"] = 132,["112"] = 133,["114"] = 136,["115"] = 137,["116"] = 138,["117"] = 139,["118"] = 140,["120"] = 144,["122"] = 145,["123"] = 145,["124"] = 146,["125"] = 145,["128"] = 149,["129"] = 130,["130"] = 153,["131"] = 154,["132"] = 154,["134"] = 155,["135"] = 155,["137"] = 156,["138"] = 156,["140"] = 157,["141"] = 157,["143"] = 158,["144"] = 158,["146"] = 159,["147"] = 159,["149"] = 160,["150"] = 160,["152"] = 161,["153"] = 153,["154"] = 164,["155"] = 165,["156"] = 164,["157"] = 168,["158"] = 169,["159"] = 168,["160"] = 172,["161"] = 172,["162"] = 172,["166"] = 174,["167"] = 175,["168"] = 176,["169"] = 177,["170"] = 178,["171"] = 179,["173"] = 181,["174"] = 182,["176"] = 184,["177"] = 185,["179"] = 187,["180"] = 188,["181"] = 189,["182"] = 190,["183"] = 191,["186"] = 194,["187"] = 194,["189"] = 195,["190"] = 195,["192"] = 196,["193"] = 196,["195"] = 197,["196"] = 197,["199"] = 199,["200"] = 201,["201"] = 202,["202"] = 202,["204"] = 203,["205"] = 204,["206"] = 205,["207"] = 208,["208"] = 211,["209"] = 212,["210"] = 213,["211"] = 214,["212"] = 215,["213"] = 216,["214"] = 217,["216"] = 219,["217"] = 220,["218"] = 221,["219"] = 222,["220"] = 223,["222"] = 225,["225"] = 230,["226"] = 231,["227"] = 232,["228"] = 233,["229"] = 233,["232"] = 236,["233"] = 237,["235"] = 238,["237"] = 239,["240"] = 245,["241"] = 247,["242"] = 248,["243"] = 249,["244"] = 250,["245"] = 251,["246"] = 251,["247"] = 251,["248"] = 251,["249"] = 251,["250"] = 251,["251"] = 251,["252"] = 253,["255"] = 257,["256"] = 258,["257"] = 259,["258"] = 260,["259"] = 261,["260"] = 261,["261"] = 261,["262"] = 261,["263"] = 261,["264"] = 261,["265"] = 261,["266"] = 263,["270"] = 269,["271"] = 270,["272"] = 271,["273"] = 272,["274"] = 273,["276"] = 276,["277"] = 279,["278"] = 280,["279"] = 281,["281"] = 284,["282"] = 285,["283"] = 287,["284"] = 287,["285"] = 287,["286"] = 287,["287"] = 290,["289"] = 298,["290"] = 299,["291"] = 300,["293"] = 316,["294"] = 317,["295"] = 318,["296"] = 319,["298"] = 321,["299"] = 322,["301"] = 324,["304"] = 328,["305"] = 329,["307"] = 331,["308"] = 332,["309"] = 333,["310"] = 334,["311"] = 334,["313"] = 336,["314"] = 337,["315"] = 338,["316"] = 338,["317"] = 338,["318"] = 339,["320"] = 341,["321"] = 342,["323"] = 344,["324"] = 346,["326"] = 363,["327"] = 364,["329"] = 366,["330"] = 367,["331"] = 367,["332"] = 367,["333"] = 367,["334"] = 367,["335"] = 368,["336"] = 369,["337"] = 370,["338"] = 370,["339"] = 370,["340"] = 370,["341"] = 370,["342"] = 370,["343"] = 370,["344"] = 370,["345"] = 370,["349"] = 389,["350"] = 390,["357"] = 173,["360"] = 172,["361"] = 394,["362"] = 395,["363"] = 395,["364"] = 395,["365"] = 396,["366"] = 397,["367"] = 397,["368"] = 397,["371"] = 398,["372"] = 400,["373"] = 401,["374"] = 402,["375"] = 402,["378"] = 394,["379"] = 406,["380"] = 407,["381"] = 408,["382"] = 408,["383"] = 408,["386"] = 409,["387"] = 409,["388"] = 410,["391"] = 411,["392"] = 411,["393"] = 412,["394"] = 412,["395"] = 412,["396"] = 412,["397"] = 412,["398"] = 412,["399"] = 412,["400"] = 412,["401"] = 412,["402"] = 412,["403"] = 412,["404"] = 415,["405"] = 415,["406"] = 415,["407"] = 415,["408"] = 415,["409"] = 415,["410"] = 415,["411"] = 415,["412"] = 415,["413"] = 415,["414"] = 415,["415"] = 415,["418"] = 420,["419"] = 420,["420"] = 420,["421"] = 420,["422"] = 420,["423"] = 420,["424"] = 420,["425"] = 420,["426"] = 420,["428"] = 406,["429"] = 425,["430"] = 426,["431"] = 425,["432"] = 430,["433"] = 431,["434"] = 430,["435"] = 434,["436"] = 435,["437"] = 434,["438"] = 438,["439"] = 439,["440"] = 440,["441"] = 441,["442"] = 442,["443"] = 443,["445"] = 445,["446"] = 438,["447"] = 448,["448"] = 449,["449"] = 450,["450"] = 451,["451"] = 452,["452"] = 453,["454"] = 455,["455"] = 456,["456"] = 448,["457"] = 459,["458"] = 460,["459"] = 459,["460"] = 463,["461"] = 464,["462"] = 463,["463"] = 30,["464"] = 32,["465"] = 34,["466"] = 27,["467"] = 472,["468"] = 472});
local ____exports = {}
local ____object_pool = require("class.object_pool")
local ObjectPool = ____object_pool.ObjectPool
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("mechanics.damage_system.damage_system_type")
--- 功能介绍：
-- 自定义伤害系统，封装护甲/抗性/闪避/吸血/暴击等结算，并向伤害统计模块输出 DamageEvent。
-- 
-- 使用方法：
-- 调用 DamageSystem.DealDamage(params, shouldRelease?) 造成自定义伤害；
-- params 使用 damage_system_type.ts 中的 DamageInfo 结构，结算后会触发 damage_event 事件。
local CDamageSystem = __TS__Class()
CDamageSystem.name = "CDamageSystem"
__TS__ClassExtends(CDamageSystem, CModule)
function CDamageSystem.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.damageMessages = {}
    self.isDamageMessageFlushScheduled = false
    self.damageMessageLimitWindowStart = -1
    self.damageMessageCountInWindow = 0
end
function CDamageSystem.prototype.init(self, reload)
    if reload and self.damageInfoPool ~= nil then
        return
    end
    self.damageInfoPool = __TS__New(
        ObjectPool,
        function()
            return {attacker = RECORD_SYSTEM_DUMMY, target = RECORD_SYSTEM_DUMMY, damage = 0, damage_type = EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE}
        end,
        nil,
        function(____, params)
            params.ability = nil
            params.damage_flags = nil
            params.damage_category = nil
            params.attack_states = nil
            params.record = nil
            params.is_crit = nil
            params.is_backstab = nil
            params.is_cleave = nil
            params.extraProperties = nil
        end
    )
    self.damageMessages = {}
    self.isDamageMessageFlushScheduled = false
    self.damageMessageLimitWindowStart = -1
    self.damageMessageCountInWindow = 0
end
function CDamageSystem.prototype.QueueDamageMessage(self, message)
    local now = GameRules:GetGameTime()
    if self.damageMessageLimitWindowStart < 0 or now - self.damageMessageLimitWindowStart >= CDamageSystem.DAMAGE_MESSAGE_LIMIT_INTERVAL_SECONDS then
        self.damageMessageLimitWindowStart = now
        self.damageMessageCountInWindow = 0
    end
    if self.damageMessageCountInWindow >= CDamageSystem.MAX_DAMAGE_MESSAGES_PER_INTERVAL then
        return
    end
    self.damageMessageCountInWindow = self.damageMessageCountInWindow + 1
    local ____self_damageMessages_0 = self.damageMessages
    ____self_damageMessages_0[#____self_damageMessages_0 + 1] = message
    if self.isDamageMessageFlushScheduled then
        return
    end
    self.isDamageMessageFlushScheduled = true
    Timer:Timer(
        FrameTime(),
        function()
            local messages = self.damageMessages
            self.damageMessages = {}
            self.isDamageMessageFlushScheduled = false
            if #messages > 0 then
                local serializedMessages = {}
                local dataLength = 0
                for ____, message in ipairs(messages) do
                    local serializedMessage = table.concat({
                        message.victim,
                        message.attacker,
                        message.damage_type,
                        message.damage,
                        message.damage_length,
                        message.is_crit,
                        message.damage_effect
                    }, ":")
                    local nextLength = dataLength + #serializedMessage + (#serializedMessages > 0 and 1 or 0)
                    if nextLength > CDamageSystem.MAX_DAMAGE_MESSAGE_DATA_LENGTH then
                        break
                    end
                    serializedMessages[#serializedMessages + 1] = serializedMessage
                    dataLength = nextLength
                end
                if #serializedMessages > 0 then
                    FireGameEvent(
                        "custom_damage_msg",
                        {data = table.concat(serializedMessages, "|")}
                    )
                end
            end
        end
    )
end
function CDamageSystem.prototype.GetDamageDisplayValue(self, damage)
    local value = math.abs(Round(damage))
    if value <= 0 then
        return {damage = 0, damage_length = 1}
    end
    local damageLength = 1
    local divisor = 10
    while value >= divisor do
        damageLength = damageLength + 1
        divisor = divisor * 10
    end
    local displayLength = damageLength <= 5 and damageLength or 3 + (damageLength - 6) % 3
    do
        local index = displayLength
        while index < damageLength do
            value = math.floor(value / 10)
            index = index + 1
        end
    end
    return {damage = value, damage_length = damageLength}
end
function CDamageSystem.prototype.GetDamageDisplayEffect(self, damageFlags, isBackstab)
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.POISON_DAMAGE) then
        return 1
    end
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.SHIELD_DAMAGE) then
        return 2
    end
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.BLADE) then
        return 3
    end
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE) then
        return 4
    end
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE) then
        return 5
    end
    if isBackstab or BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.Backstab) then
        return 6
    end
    if BitAndEquals(damageFlags, EOM_DAMAGE_FLAGS.BLEEDING_DAMAGE) then
        return 7
    end
    return 0
end
function CDamageSystem.prototype.AcquireDamageInfo(self)
    return self.damageInfoPool:Get()
end
function CDamageSystem.prototype.ReleaseDamageInfo(self, params)
    self.damageInfoPool:Release(params)
end
function CDamageSystem.prototype.DealDamage(self, params, shouldRelease)
    if shouldRelease == nil then
        shouldRelease = false
    end
    do
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            params.extraProperties = nil
            local attacker = params.attacker
            local target = params.target
            local originalDamage = params.damage
            if not IsValid(attacker) or not IsValid(target) then
                return true
            end
            if not target:IsAlive() or target:GetHealth() <= 0 or target:IsInvulnerable() then
                return true
            end
            if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK and target:HasState(StateEnum.ATTACK_IMMUNE) then
                return true
            end
            local ability = params.ability
            if IsValid(ability) then
                local caster = ability:GetCaster()
                if IsValid(caster) and caster:entindex() == attacker:entindex() then
                    params.extraProperties = PropertySystem:GetAbilityExtraPropertyTable(ability)
                end
            end
            if params.damage_flags == nil then
                params.damage_flags = EOM_DAMAGE_FLAGS.NONE
            end
            if params.damage_category == nil then
                params.damage_category = DOTA_DAMAGE_CATEGORY_BARRIER
            end
            if params.is_crit == nil then
                params.is_crit = false
            end
            if params.is_backstab == nil then
                params.is_backstab = false
            end
            --- 是否闪避标记
            local isEvasionFlag = false
            local canCrit = self:hasCrit(params)
            if not canCrit then
                params.is_crit = false
            end
            if canCrit then
                local fCritChance = self:getCritChance(params)
                local fCritDamage = self:getCritDamage(params)
                local fCritDamageReduce = 0
                if not params.is_crit then
                    if fCritChance > 0 and fCritDamage > 0 then
                        fCritDamage = fCritDamage * (1 - fCritDamageReduce * 0.01)
                        if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
                            fCritDamage = fCritDamage * (1 + GetAttackCritDamageBoost(attacker, params) * 0.01)
                        elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
                            fCritDamage = fCritDamage * (1 + GetSpellCritDamageBoost(attacker, params) * 0.01)
                        end
                        local pseudo_random_recording = ""
                        if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
                            pseudo_random_recording = "physical_critical_strike"
                        elseif params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
                            pseudo_random_recording = "magical_critical_strike"
                        end
                        params.is_crit = PRD(nil, attacker, fCritChance, pseudo_random_recording)
                    end
                end
                if params.is_crit then
                    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK and params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL then
                        local sound = GetCriticalstrikeSound(attacker, params)
                        if type(sound) == "string" and sound ~= "" then
                            EmitSoundOn(sound, attacker)
                        end
                    end
                    if params.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK and (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL or params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) then
                        Event:FireUnit("crit_event", params, attacker)
                    else
                        Event:Fire("crit_event", params)
                    end
                    params.damage = params.damage * (fCritDamage * 0.01)
                end
            end
            if self:hasEvasion(params) then
                local fMissChance = self:getMissChance(params)
                if fMissChance > 0 then
                    isEvasionFlag = PRD(nil, attacker, fMissChance, "getMissChance")
                    if isEvasionFlag then
                        SendOverheadEventMessage(
                            nil,
                            OVERHEAD_ALERT_EVADE,
                            target,
                            0,
                            attacker:GetPlayerOwner()
                        )
                        return true
                    end
                end
                local fEvasionChance = self:getEvasionChance(params)
                if fEvasionChance > 0 then
                    isEvasionFlag = PRD(nil, target, fEvasionChance, "getEvasionChance")
                    if isEvasionFlag then
                        SendOverheadEventMessage(
                            nil,
                            OVERHEAD_ALERT_EVADE,
                            target,
                            0,
                            attacker:GetPlayerOwner()
                        )
                        return true
                    end
                end
            end
            if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
                params.damage = params.damage + GetAttackDamageProc(attacker, params)
            elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
                params.damage = params.damage + GetSpellDamageProc(attacker, params)
                params.damage = params.damage + GetSpellDamageProcTarget(target, params)
            end
            params.damage = params.damage + GetDamageProcTarget(target, params)
            if not params.is_cleave then
                params.damage = params.damage * (1 + GetOutgoingDamagePercent(nil, attacker, params) * 0.01)
                params.damage = params.damage * GetAthenaOutgoingMultiplier(attacker, params)
            end
            params.damage = params.damage * (1 + GetIncomingDamagePercent(nil, target, params) * 0.01)
            params.damage = params.damage * GetAthenaIncomingMultiplier(target, params)
            params.damage = math.max(
                0,
                params.damage - GetAthenaDamageBlock(target, params)
            )
            if self:hasAdjust(params) then
            end
            if GetAvoidDamage(params.target, params) > 0 then
                params.damage = 0
                Event:Fire("avoid_damage", {unit = params.target})
            end
            local currentHealth = params.target:GetHealth()
            local minHealth = GetMinHealth(params.target, params)
            if currentHealth > params.damage + 1 then
                params.target:SetHealth(math.max(currentHealth - params.damage, minHealth))
            else
                if minHealth > 0 then
                    params.target:SetHealth(minHealth)
                else
                    params.target:Kill(params.ability, params.attacker)
                end
            end
            if not IsValid(params.target) then
                return true
            end
            params.health_before_damage = currentHealth
            self:ApplyLifesteal(params)
            self:ApplyCleave(params, originalDamage)
            if not IsValid(params.target) then
                return true
            end
            Event:Fire("damage_event", params)
            if IsValid(attacker) and IsValid(target) and params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK and not params.is_cleave and bit.band(
                params.attack_states or 0,
                bit.bor(ATTACK_STATES.NOT_PROCESSPROCS, ATTACK_STATES.FAKEATTACK)
            ) == 0 then
                Event:FireUnit("attack_landed", {attacker = attacker, target = target, record = params.record, attack_states = params.attack_states}, attacker, target)
            end
            if not IsValid(params.target) then
                return true
            end
            if not params.target:IsAlive() then
                LargeNumberHealth:Clear(params.target)
            end
            if not IsValid(params.attacker) then
                return true
            end
            local DisableDamageDisplay = KeyValues:GetUnitData(target, "DisableDamageDisplay")
            if DisableDamageDisplay ~= 1 and Service:GetPlayerSetting(
                params.attacker:GetPlayerOwnerID(),
                "setting_switch_damage_msg",
                true
            ) then
                local displayValue = self:GetDamageDisplayValue(params.damage)
                local displayEffect = self:GetDamageDisplayEffect(params.damage_flags, params.is_backstab)
                self:QueueDamageMessage({
                    victim = params.target:entindex(),
                    attacker = params.attacker:entindex(),
                    damage_type = params.damage_type,
                    damage = displayValue.damage,
                    damage_length = displayValue.damage_length,
                    is_crit = params.is_crit and 1 or 0,
                    damage_effect = displayEffect
                })
            end
        end)
        do
            if shouldRelease then
                self:ReleaseDamageInfo(params)
            end
        end
        if not ____try then
            error(____hasReturned, 0)
        end
        if ____try and ____hasReturned then
            return ____returnValue
        end
    end
end
function CDamageSystem.prototype.ApplyLifesteal(self, params)
    local ____params_1 = params
    local attacker = ____params_1.attacker
    local target = ____params_1.target
    if not IsValid(attacker) or not attacker:IsAlive() or target == attacker or target:IsBuilding() or target:IsOther() or bit.band(
        params.damage_flags or 0,
        bit.bor(EOM_DAMAGE_FLAGS.NO_LIFESTEAL, EOM_DAMAGE_FLAGS.REFLECT_DAMAGE)
    ) ~= 0 then
        return
    end
    local value = params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL and GetPhysicalLifesteal(attacker, params) or (params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL and GetMagicalLifesteal(attacker, params) or 0)
    if params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL or params.damage_type == EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL then
        local lifesteal = value + GetAllLifesteal(attacker, params)
        if lifesteal > 0 and params.damage > 0 then
            attacker:Heal(params.damage * lifesteal * 0.01, params.ability)
        end
    end
end
function CDamageSystem.prototype.ApplyCleave(self, params, originalDamage)
    if not IsValid(params.attacker) or params.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK or bit.band(
        params.attack_states or 0,
        bit.bor(ATTACK_STATES.NOT_PROCESSPROCS, ATTACK_STATES.NO_CLEAVE)
    ) ~= 0 then
        return
    end
    local radius = GetCleaveRadius(params.attacker, params)
    local percent = GetCleaveDamage(params.attacker, params)
    if radius <= 0 or percent <= 0 then
        return
    end
    local center = params.target:GetAbsOrigin()
    local damage = originalDamage * percent * 0.01
    local targets = FindUnitsInRadius(
        params.attacker:GetTeamNumber(),
        center,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE,
        FIND_ANY_ORDER,
        false
    )
    for ____, target in ipairs(targets) do
        if target ~= params.target and IsValid(target) and IsValid(params.attacker) then
            self:DealDamage({
                attacker = params.attacker,
                target = target,
                damage = damage,
                damage_type = EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL,
                damage_category = DOTA_DAMAGE_CATEGORY_SPELL,
                damage_flags = EOM_DAMAGE_FLAGS.NO_CRIT,
                attack_states = bit.bor(ATTACK_STATES.NO_CLEAVE, ATTACK_STATES.SKIPCOUNTING),
                is_cleave = true
            })
        end
    end
    if IsValid(params.attacker) and IsValid(params.target) then
        Event:FireUnit("cleave", {
            attacker = params.attacker,
            target = params.target,
            center = center,
            radius = radius,
            damage = damage,
            tTargets = targets
        }, params.attacker, params.target)
    end
end
function CDamageSystem.prototype.hasCrit(self, params)
    return bit.band(params.damage_flags or 0, EOM_DAMAGE_FLAGS.NO_CRIT) ~= EOM_DAMAGE_FLAGS.NO_CRIT and not params.target:HasState(StateEnum.CRITICAL_IMMUNE) and not params.attacker:HasState(StateEnum.NO_CRIT)
end
function CDamageSystem.prototype.hasEvasion(self, params)
    return params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK
end
function CDamageSystem.prototype.hasAdjust(self, params)
    return true
end
function CDamageSystem.prototype.getCritChance(self, params)
    local chance = GetCritChance(params.attacker, params) + GetAthenaCritChance(params.attacker, params)
    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
        chance = chance + GetAttackCritChance(params.attacker, params)
    elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
        chance = chance + GetSpellCritChance(params.attacker, params)
    end
    return chance
end
function CDamageSystem.prototype.getCritDamage(self, params)
    local fCritDamage = GetCritDamage(params.attacker, params) + GetAthenaCritDamage(params.attacker, params)
    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
        fCritDamage = fCritDamage + GetAttackCritDamage(params.attacker, params)
    elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
        fCritDamage = fCritDamage + GetSpellCritDamage(params.attacker, params)
    end
    fCritDamage = fCritDamage * (1 + GetCritDamageMult(params.attacker, params) * 0.01)
    return fCritDamage
end
function CDamageSystem.prototype.getEvasionChance(self, params)
    return GetAthenaEvasion(params.target, params)
end
function CDamageSystem.prototype.getMissChance(self, params)
    return 0
end
CDamageSystem.MAX_DAMAGE_MESSAGES_PER_INTERVAL = 32
CDamageSystem.DAMAGE_MESSAGE_LIMIT_INTERVAL_SECONDS = 1
CDamageSystem.MAX_DAMAGE_MESSAGE_DATA_LENGTH = 900
CDamageSystem = __TS__DecorateLegacy({reloadable}, CDamageSystem)
if DamageSystem == nil then
    DamageSystem = __TS__New(CDamageSystem)
end
return ____exports
