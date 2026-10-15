local __TSTL_FILE_PATH__ = "mechanics/damage_system/damage_system"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 4,["20"] = 27,["21"] = 27,["22"] = 28,["24"] = 28,["25"] = 35,["26"] = 36,["27"] = 37,["28"] = 38,["29"] = 27,["30"] = 42,["31"] = 43,["34"] = 46,["35"] = 46,["36"] = 46,["37"] = 47,["38"] = 46,["39"] = 46,["40"] = 53,["41"] = 54,["42"] = 55,["43"] = 56,["44"] = 57,["45"] = 58,["46"] = 59,["47"] = 60,["48"] = 61,["49"] = 46,["50"] = 46,["51"] = 63,["52"] = 64,["53"] = 65,["54"] = 66,["55"] = 42,["56"] = 73,["57"] = 74,["58"] = 75,["59"] = 77,["60"] = 78,["62"] = 81,["65"] = 85,["66"] = 86,["67"] = 86,["68"] = 87,["71"] = 91,["72"] = 92,["73"] = 92,["74"] = 92,["75"] = 93,["76"] = 94,["77"] = 95,["78"] = 96,["79"] = 98,["80"] = 99,["81"] = 100,["82"] = 101,["83"] = 101,["84"] = 101,["85"] = 101,["86"] = 101,["87"] = 101,["88"] = 101,["89"] = 101,["90"] = 101,["91"] = 110,["92"] = 111,["95"] = 114,["96"] = 115,["98"] = 118,["99"] = 119,["100"] = 119,["101"] = 119,["102"] = 119,["105"] = 92,["106"] = 92,["107"] = 73,["108"] = 129,["109"] = 130,["110"] = 131,["111"] = 132,["113"] = 135,["114"] = 136,["115"] = 137,["116"] = 138,["117"] = 139,["119"] = 143,["121"] = 144,["122"] = 144,["123"] = 145,["124"] = 144,["127"] = 148,["128"] = 129,["129"] = 152,["130"] = 153,["131"] = 153,["133"] = 154,["134"] = 154,["136"] = 155,["137"] = 155,["139"] = 156,["140"] = 156,["142"] = 157,["143"] = 157,["145"] = 158,["146"] = 158,["148"] = 159,["149"] = 159,["151"] = 160,["152"] = 152,["153"] = 163,["154"] = 164,["155"] = 163,["156"] = 167,["157"] = 168,["158"] = 167,["159"] = 171,["160"] = 171,["161"] = 171,["165"] = 173,["166"] = 174,["167"] = 175,["168"] = 176,["169"] = 177,["171"] = 179,["172"] = 180,["174"] = 182,["175"] = 183,["177"] = 185,["178"] = 186,["179"] = 187,["180"] = 188,["181"] = 189,["184"] = 192,["185"] = 192,["187"] = 193,["188"] = 193,["190"] = 194,["191"] = 194,["193"] = 195,["194"] = 195,["197"] = 197,["198"] = 199,["199"] = 200,["200"] = 201,["201"] = 204,["202"] = 207,["203"] = 208,["204"] = 209,["205"] = 210,["206"] = 211,["207"] = 212,["208"] = 213,["210"] = 215,["211"] = 216,["212"] = 217,["213"] = 218,["214"] = 219,["216"] = 221,["219"] = 226,["220"] = 227,["221"] = 228,["224"] = 234,["225"] = 236,["226"] = 237,["227"] = 238,["228"] = 239,["229"] = 240,["230"] = 240,["231"] = 240,["232"] = 240,["233"] = 240,["234"] = 240,["235"] = 240,["236"] = 242,["239"] = 246,["240"] = 247,["241"] = 248,["242"] = 249,["243"] = 250,["244"] = 250,["245"] = 250,["246"] = 250,["247"] = 250,["248"] = 250,["249"] = 250,["250"] = 252,["254"] = 258,["255"] = 259,["256"] = 260,["257"] = 261,["258"] = 262,["260"] = 265,["261"] = 268,["262"] = 270,["263"] = 273,["265"] = 281,["266"] = 282,["267"] = 283,["269"] = 299,["270"] = 300,["271"] = 301,["272"] = 302,["274"] = 304,["275"] = 305,["277"] = 307,["280"] = 311,["281"] = 312,["283"] = 314,["284"] = 316,["285"] = 317,["286"] = 318,["288"] = 320,["289"] = 321,["290"] = 322,["291"] = 323,["293"] = 325,["295"] = 342,["296"] = 343,["298"] = 345,["299"] = 346,["300"] = 346,["301"] = 346,["302"] = 346,["303"] = 346,["304"] = 347,["305"] = 348,["306"] = 349,["307"] = 349,["308"] = 349,["309"] = 349,["310"] = 349,["311"] = 349,["312"] = 349,["313"] = 349,["314"] = 349,["318"] = 368,["319"] = 369,["326"] = 172,["329"] = 171,["330"] = 374,["331"] = 375,["332"] = 374,["333"] = 378,["334"] = 379,["335"] = 378,["336"] = 382,["337"] = 383,["338"] = 382,["339"] = 386,["340"] = 387,["341"] = 388,["342"] = 389,["343"] = 390,["344"] = 391,["346"] = 393,["347"] = 386,["348"] = 396,["349"] = 397,["350"] = 398,["351"] = 399,["352"] = 400,["353"] = 401,["355"] = 403,["356"] = 404,["357"] = 396,["358"] = 407,["359"] = 408,["360"] = 407,["361"] = 411,["362"] = 412,["363"] = 411,["364"] = 30,["365"] = 32,["366"] = 34,["367"] = 27,["368"] = 420,["369"] = 420});
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
            if self:hasCrit(params) then
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
                    Event:Fire("crit_event", params)
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
            params.damage = params.damage * (1 + GetOutgoingDamagePercent(nil, attacker, params) * 0.01)
            params.damage = params.damage * (1 + GetIncomingDamagePercent(nil, target, params) * 0.01)
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
            Event:Fire("damage_event", params)
            if not IsValid(params.target) then
                return true
            end
            if not params.target:IsAlive() then
                Event:Fire("entity_killed", {attacker = params.attacker, victim = params.target})
                if not IsValid(params.target) then
                    return true
                end
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
function CDamageSystem.prototype.hasCrit(self, params)
    return bit.band(params and params.damage_flags or 0, EOM_DAMAGE_FLAGS.NO_CRIT) ~= EOM_DAMAGE_FLAGS.NO_CRIT
end
function CDamageSystem.prototype.hasEvasion(self, params)
    return true
end
function CDamageSystem.prototype.hasAdjust(self, params)
    return true
end
function CDamageSystem.prototype.getCritChance(self, params)
    local chance = GetCritChance(params.attacker, params)
    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
        chance = chance + GetAttackCritChance(params.attacker, params)
    elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
        chance = chance + GetSpellCritChance(params.attacker, params)
    end
    return chance
end
function CDamageSystem.prototype.getCritDamage(self, params)
    local fCritDamage = GetCritDamage(params.attacker, params)
    if params.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
        fCritDamage = fCritDamage + GetAttackCritDamage(params.attacker, params)
    elseif params.damage_category == DOTA_DAMAGE_CATEGORY_SPELL then
        fCritDamage = fCritDamage + GetSpellCritDamage(params.attacker, params)
    end
    fCritDamage = fCritDamage * (1 + GetCritDamageMult(params.attacker, params) * 0.01)
    return fCritDamage
end
function CDamageSystem.prototype.getEvasionChance(self, params)
    return GetEvasion(params.target, params)
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
