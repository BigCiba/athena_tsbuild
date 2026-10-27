local __TSTL_FILE_PATH__ = "abilities/heroes/omniknight/omniknight_1"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 2,["14"] = 3,["15"] = 3,["16"] = 3,["17"] = 5,["18"] = 6,["19"] = 5,["20"] = 6,["21"] = 7,["22"] = 7,["23"] = 7,["24"] = 8,["25"] = 9,["26"] = 9,["27"] = 9,["29"] = 10,["30"] = 10,["32"] = 10,["34"] = 10,["36"] = 9,["37"] = 8,["38"] = 12,["39"] = 12,["40"] = 12,["41"] = 14,["42"] = 14,["43"] = 14,["44"] = 14,["46"] = 14,["48"] = 14,["49"] = 14,["50"] = 14,["51"] = 14,["52"] = 14,["53"] = 15,["54"] = 15,["55"] = 15,["56"] = 16,["57"] = 16,["58"] = 16,["60"] = 17,["63"] = 18,["64"] = 19,["65"] = 20,["66"] = 21,["67"] = 16,["68"] = 23,["69"] = 24,["70"] = 24,["71"] = 25,["74"] = 26,["75"] = 26,["76"] = 26,["77"] = 26,["78"] = 26,["79"] = 26,["80"] = 26,["81"] = 26,["82"] = 26,["83"] = 26,["84"] = 26,["85"] = 28,["86"] = 28,["87"] = 29,["88"] = 30,["89"] = 30,["90"] = 31,["91"] = 31,["92"] = 31,["93"] = 31,["94"] = 31,["95"] = 32,["96"] = 33,["97"] = 33,["98"] = 33,["99"] = 33,["100"] = 33,["101"] = 33,["102"] = 33,["103"] = 34,["104"] = 35,["105"] = 35,["106"] = 35,["107"] = 35,["108"] = 35,["109"] = 35,["112"] = 38,["113"] = 38,["114"] = 38,["115"] = 38,["116"] = 38,["117"] = 39,["118"] = 40,["119"] = 23,["120"] = 6,["121"] = 5,["122"] = 6,["124"] = 6,["125"] = 44,["126"] = 45,["127"] = 44,["128"] = 45,["129"] = 46,["130"] = 46,["131"] = 46,["132"] = 47,["133"] = 47,["134"] = 47,["135"] = 47,["136"] = 47,["137"] = 47,["139"] = 47,["140"] = 47,["141"] = 48,["142"] = 48,["143"] = 48,["145"] = 48,["146"] = 49,["147"] = 49,["148"] = 49,["150"] = 49,["151"] = 45,["152"] = 44,["153"] = 45,["155"] = 45});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local ____omniknight_0 = require("abilities.heroes.omniknight.omniknight_0")
local OmniknightParticle = ____omniknight_0.OmniknightParticle
local OmniknightStun = ____omniknight_0.OmniknightStun
____exports.omniknight_1 = __TS__Class()
local omniknight_1 = ____exports.omniknight_1
omniknight_1.name = "omniknight_1"
__TS__ClassExtends(omniknight_1, EOMAbility)
function omniknight_1.prototype.GetCooldown(self, _level)
    return self:GetSpecialValueFor("charge_restore_time") * (self:GetCaster():HasModifier("modifier_omniknight_2_aura") and 0.5 or 1)
end
function omniknight_1.prototype.GetMaxCharges(self)
    local ____temp_3
    if self:GetCaster():GetScepterLevel() >= 1 then
        ____temp_3 = self:GetSpecialValueFor("scepter_charges") or 4
    else
        local ____tonumber_2 = tonumber
        local ____opt_0 = KeyValues.abilities[self:GetAbilityName()]
        if ____opt_0 ~= nil then
            ____opt_0 = ____opt_0.CustomAbilityCharges
        end
        ____temp_3 = ____tonumber_2(____opt_0) or 3
    end
    return ____temp_3
end
function omniknight_1.prototype.OnScepterLevelup(self, _level)
    self:RefreshScepterCharges()
end
function omniknight_1.prototype.OnScepterRemove(self)
    local ____self_RefreshScepterCharges_7 = self.RefreshScepterCharges
    local ____tonumber_6 = tonumber
    local ____opt_4 = KeyValues.abilities[self:GetAbilityName()]
    if ____opt_4 ~= nil then
        ____opt_4 = ____opt_4.CustomAbilityCharges
    end
    ____self_RefreshScepterCharges_7(
        self,
        ____tonumber_6(____opt_4) or 3
    )
end
function omniknight_1.prototype.UnitEventListener(self)
    return {scepter_levelup = {source = function() return self:RefreshScepterCharges() end}}
end
function omniknight_1.prototype.RefreshScepterCharges(self, limit)
    if limit == nil then
        limit = self:GetMaxCharges()
    end
    if not IsServer() then
        return
    end
    local old = self:GetCharges()
    self.__Charge = math.min(old or 0, limit)
    self:GetCaster():UpdateAbilityNetData()
    self:__NotifyChargeChanged(old)
end
function omniknight_1.prototype.OnSpellStart(self)
    local caster = self:GetCaster()
    local thunder = caster:FindAbilityByName("omniknight_0")
    if not IsValid(thunder) then
        return
    end
    local targets = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        self:GetSpecialValueFor("radius"),
        thunder:GetAbilityTargetTeam(),
        thunder:GetAbilityTargetType(),
        thunder:GetAbilityTargetFlags(),
        FIND_ANY_ORDER,
        false
    )
    local damage = self:GetSpecialValueFor("base_damage")
    local duration = self:GetSpecialValueFor("stun_duration")
    for ____, target in ipairs(targets) do
        local ____opt_8 = target:FindModifierByName("modifier_omniknight_1_debuff")
        local stacks = ____opt_8 and ____opt_8:GetStackCount() or 0
        caster:DealDamage(
            target,
            thunder,
            damage * (1 + stacks * self:GetSpecialValueFor("damage_increase_pct") * 0.01)
        )
        thunder:ThunderPower(target)
        OmniknightStun(
            nil,
            caster,
            target,
            self,
            duration
        )
        if IsValid(target) and target:IsAlive() and caster:HasModifier("modifier_omniknight_01") then
            target:AddNewModifier(
                caster,
                self,
                "modifier_omniknight_1_debuff",
                {duration = duration * (1 - target:GetStatusResistance())}
            )
        end
    end
    local particle = ParticleManager:CreateParticle(
        OmniknightParticle(nil, caster, 1),
        PATTACH_ABSORIGIN,
        caster
    )
    ParticleManager:ReleaseParticleIndex(particle)
    caster:EmitSound("n_creep_Thunderlizard_Big.Stomp")
end
omniknight_1 = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    omniknight_1
)
____exports.omniknight_1 = omniknight_1
____exports.modifier_omniknight_1_debuff = __TS__Class()
local modifier_omniknight_1_debuff = ____exports.modifier_omniknight_1_debuff
modifier_omniknight_1_debuff.name = "modifier_omniknight_1_debuff"
__TS__ClassExtends(modifier_omniknight_1_debuff, EOMModifier)
function modifier_omniknight_1_debuff.prototype.IgnoreTenacity(self)
    return true
end
function modifier_omniknight_1_debuff.prototype.EventListener(self)
    return {game_reset = function(____, ____bindingPattern0)
        local runId
        runId = ____bindingPattern0.runId
        if runId == GameState:GetSession().runId then
            self:Destroy()
        end
    end}
end
function modifier_omniknight_1_debuff.prototype.OnCreated(self)
    if IsServer() then
        self:IncrementStackCount()
    end
end
function modifier_omniknight_1_debuff.prototype.OnRefresh(self)
    if IsServer() then
        self:IncrementStackCount()
    end
end
modifier_omniknight_1_debuff = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsDebuff = true, IsPurgable = true})},
    modifier_omniknight_1_debuff
)
____exports.modifier_omniknight_1_debuff = modifier_omniknight_1_debuff
return ____exports
