local __TSTL_FILE_PATH__ = "abilities/heroes/omniknight/omniknight_0"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 2,["14"] = 3,["16"] = 7,["17"] = 8,["18"] = 7,["19"] = 11,["20"] = 12,["23"] = 13,["24"] = 13,["25"] = 13,["26"] = 13,["27"] = 13,["28"] = 13,["29"] = 11,["30"] = 16,["31"] = 17,["32"] = 16,["33"] = 17,["34"] = 18,["35"] = 18,["36"] = 18,["37"] = 19,["38"] = 20,["39"] = 19,["40"] = 24,["41"] = 24,["42"] = 24,["43"] = 26,["44"] = 26,["45"] = 26,["47"] = 27,["48"] = 28,["49"] = 28,["50"] = 29,["51"] = 29,["53"] = 30,["54"] = 30,["56"] = 31,["57"] = 31,["59"] = 32,["60"] = 26,["61"] = 34,["62"] = 34,["63"] = 34,["64"] = 34,["65"] = 34,["66"] = 34,["67"] = 34,["68"] = 34,["69"] = 35,["70"] = 35,["71"] = 35,["73"] = 36,["74"] = 36,["76"] = 35,["77"] = 38,["78"] = 38,["79"] = 38,["81"] = 39,["82"] = 40,["85"] = 41,["86"] = 42,["87"] = 42,["88"] = 42,["89"] = 42,["90"] = 42,["91"] = 42,["92"] = 42,["93"] = 42,["94"] = 42,["95"] = 42,["96"] = 42,["97"] = 44,["98"] = 44,["99"] = 44,["100"] = 44,["101"] = 44,["102"] = 45,["103"] = 45,["104"] = 45,["105"] = 45,["106"] = 45,["107"] = 46,["108"] = 46,["109"] = 46,["110"] = 46,["111"] = 46,["112"] = 47,["113"] = 48,["114"] = 49,["115"] = 50,["116"] = 50,["118"] = 38,["119"] = 17,["120"] = 16,["121"] = 17,["123"] = 17,["124"] = 54,["125"] = 55,["126"] = 54,["127"] = 55,["128"] = 56,["129"] = 56,["130"] = 56,["131"] = 57,["132"] = 57,["133"] = 57,["134"] = 58,["135"] = 58,["136"] = 58,["137"] = 59,["138"] = 60,["139"] = 61,["140"] = 61,["141"] = 61,["142"] = 61,["143"] = 61,["144"] = 62,["145"] = 62,["146"] = 62,["147"] = 62,["148"] = 62,["149"] = 62,["150"] = 62,["151"] = 62,["152"] = 62,["153"] = 63,["154"] = 63,["155"] = 63,["156"] = 63,["157"] = 63,["158"] = 63,["159"] = 63,["160"] = 63,["162"] = 59,["163"] = 66,["164"] = 66,["165"] = 66,["166"] = 66,["167"] = 66,["170"] = 66,["171"] = 66,["172"] = 66,["173"] = 66,["174"] = 67,["175"] = 68,["176"] = 68,["177"] = 68,["178"] = 68,["179"] = 68,["180"] = 69,["183"] = 70,["184"] = 70,["185"] = 72,["186"] = 73,["189"] = 74,["190"] = 75,["191"] = 76,["192"] = 77,["193"] = 78,["194"] = 78,["195"] = 78,["196"] = 78,["197"] = 78,["198"] = 78,["199"] = 78,["200"] = 79,["202"] = 68,["203"] = 67,["204"] = 55,["205"] = 54,["206"] = 55,["208"] = 55,["209"] = 85,["210"] = 86,["211"] = 85,["212"] = 86,["213"] = 86,["214"] = 85,["215"] = 86,["217"] = 86});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
require("modifiers.framework.modifier_stunned")
--- 保留原版雷霆战士标记和粒子映射；皮肤装备入口后续实现。
function ____exports.OmniknightParticle(self, caster, skill)
    return ((("particles/units/heroes/hero_omniknight/" .. (caster:HasModifier("modifier_omniknight_01") and "thunder_warrior/" or "")) .. "omniknight_") .. tostring(skill)) .. ".vpcf"
end
function ____exports.OmniknightStun(self, caster, target, ability, duration)
    if not IsValid(target) or not target:IsAlive() or target:HasState(StateEnum.STUN_IMMUNE) then
        return
    end
    target:AddNewModifier(
        caster,
        ability,
        "modifier_athena_stunned",
        {duration = duration * (1 - target:GetStatusResistance())}
    )
end
____exports.omniknight_0 = __TS__Class()
local omniknight_0 = ____exports.omniknight_0
omniknight_0.name = "omniknight_0"
__TS__ClassExtends(omniknight_0, EOMAbility)
function omniknight_0.prototype.GetIntrinsicModifierName(self)
    return "modifier_omniknight_0"
end
function omniknight_0.prototype.GetBehavior(self)
    return self:GetCaster():HasModifier("modifier_omniknight_01") and bit.bor(DOTA_ABILITY_BEHAVIOR_NO_TARGET, DOTA_ABILITY_BEHAVIOR_IMMEDIATE) or bit.bor(DOTA_ABILITY_BEHAVIOR_PASSIVE, DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE)
end
function omniknight_0.prototype.GetCooldown(self, _level)
    return self:GetSpecialValueFor(self:GetCaster():HasModifier("modifier_omniknight_01") and "active_cooldown" or "cooldown")
end
function omniknight_0.prototype.GetLevelSpecialValueFor(self, key, level, caster)
    if caster == nil then
        caster = self:GetCaster()
    end
    local base = CDOTABaseAbility.GetLevelSpecialValueFor(self, key, level, caster)
    local ____opt_0 = caster:FindModifierByName("modifier_omniknight_3")
    local weight = ____opt_0 and ____opt_0:GetAbility()
    if level <= 0 or not IsValid(weight) or weight:GetLevel() <= 0 then
        return base
    end
    if key == "chance" then
        return base + weight:GetSpecialValueFor("bonus_chance")
    end
    if key == "str_factor" then
        return base + GetStrength(caster) * weight:GetSpecialValueFor("bonus_str_factor")
    end
    return base
end
function omniknight_0.prototype.OnSpellStart(self)
    self:GetCaster():AddNewModifier(
        self:GetCaster(),
        self,
        "modifier_omniknight_0_active",
        {}
    )
end
function omniknight_0.prototype.ThunderPower(self, target, sound)
    if sound == nil then
        sound = false
    end
    if IsValid(target) and (target:IsStunned() or target:HasState(StateEnum.STUNNED)) then
        self:Action(target, sound)
    end
end
function omniknight_0.prototype.Action(self, target, sound)
    if sound == nil then
        sound = false
    end
    local caster = self:GetCaster()
    if not IsServer() or not IsValid(caster) or not IsValid(target) then
        return
    end
    local origin = target:GetAbsOrigin()
    local victims = caster:GetScepterLevel() >= 2 and FindUnitsInRadius(
        caster:GetTeamNumber(),
        origin,
        nil,
        self:GetSpecialValueFor("scepter_radius"),
        self:GetAbilityTargetTeam(),
        self:GetAbilityTargetType(),
        self:GetAbilityTargetFlags(),
        FIND_ANY_ORDER,
        false
    ) or ({target})
    caster:DealDamage(
        victims,
        self,
        self:GetSpecialValueFor("str_factor")
    )
    local particle = ParticleManager:CreateParticle(
        ____exports.OmniknightParticle(nil, caster, 0),
        PATTACH_CUSTOMORIGIN,
        caster
    )
    ParticleManager:SetParticleControl(
        particle,
        0,
        Vector(origin.x, origin.y, origin.z + 5000)
    )
    ParticleManager:SetParticleControl(particle, 1, origin)
    ParticleManager:SetParticleControl(particle, 3, origin)
    ParticleManager:ReleaseParticleIndex(particle)
    if sound and IsValid(target) then
        target:EmitSound("Hero_Zuus.LightningBolt")
    end
end
omniknight_0 = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    omniknight_0
)
____exports.omniknight_0 = omniknight_0
____exports.modifier_omniknight_0 = __TS__Class()
local modifier_omniknight_0 = ____exports.modifier_omniknight_0
modifier_omniknight_0.name = "modifier_omniknight_0"
__TS__ClassExtends(modifier_omniknight_0, EOMModifier)
function modifier_omniknight_0.prototype.StaticProperty(self)
    return {[PropertyFunction.STATS_STRENGTH_BONUS] = self:GetStackCount()}
end
function modifier_omniknight_0.prototype.DeclareFunctions(self)
    return {MODIFIER_PROPERTY_TOOLTIP}
end
function modifier_omniknight_0.prototype.OnTooltip(self)
    return self:GetStackCount()
end
function modifier_omniknight_0.prototype.OnCreated(self)
    if IsClient() then
        local particle = ParticleManager:CreateParticle(
            "particles/econ/items/faceless_void/faceless_void_weapon_voidhammer/faceless_void_weapon_voidhammer.vpcf",
            PATTACH_CUSTOMORIGIN,
            self:GetParent()
        )
        ParticleManager:SetParticleControlEnt(
            particle,
            0,
            self:GetParent(),
            PATTACH_POINT_FOLLOW,
            "attach_attack1",
            self:GetParent():GetAbsOrigin(),
            true
        )
        self:AddParticle(
            particle,
            false,
            false,
            -1,
            false,
            false
        )
    end
end
function modifier_omniknight_0.prototype.EventListener(self)
    return {game_reset = function(____, ____bindingPattern0)
        local runId
        runId = ____bindingPattern0.runId
        if runId ~= GameState:GetSession().runId then
            return
        end
        self:SetStackCount(0)
        self:GetParent():RemoveModifierByName("modifier_omniknight_0_active")
    end}
end
function modifier_omniknight_0.prototype.UnitEventListener(self)
    return {attack_landed = {source = function(____, ____bindingPattern0)
        local attack_states
        local target
        target = ____bindingPattern0.target
        attack_states = ____bindingPattern0.attack_states
        if bit.band(attack_states or 0, ATTACK_STATES.SKIPCOUNTING) ~= 0 or not IsValid(target) or not target:IsAlive() then
            return
        end
        local parent = self:GetParent()
        local ability = self:GetAbility()
        ability:ThunderPower(target, true)
        if not IsValid(target) then
            return
        end
        if ability:IsCooldownReady() and RollPercentage(ability:GetSpecialValueFor("chance")) or parent:HasModifier("modifier_omniknight_0_active") then
            local aura = parent:FindModifierByName("modifier_omniknight_2_aura")
            ability:StartCooldown(aura and aura:Roll() and 0 or ability:GetSpecialValueFor("cooldown"))
            self:IncrementStackCount()
            ____exports.OmniknightStun(
                nil,
                parent,
                target,
                ability,
                ability:GetSpecialValueFor("stun_duration")
            )
            parent:RemoveModifierByName("modifier_omniknight_0_active")
        end
    end}}
end
modifier_omniknight_0 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false, RemoveOnDeath = false, AllowIllusionDuplicate = true})},
    modifier_omniknight_0
)
____exports.modifier_omniknight_0 = modifier_omniknight_0
____exports.modifier_omniknight_0_active = __TS__Class()
local modifier_omniknight_0_active = ____exports.modifier_omniknight_0_active
modifier_omniknight_0_active.name = "modifier_omniknight_0_active"
__TS__ClassExtends(modifier_omniknight_0_active, EOMModifier)
modifier_omniknight_0_active = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false, RemoveOnDeath = false})},
    modifier_omniknight_0_active
)
____exports.modifier_omniknight_0_active = modifier_omniknight_0_active
return ____exports
