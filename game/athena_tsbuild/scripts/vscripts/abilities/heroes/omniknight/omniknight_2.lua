local __TSTL_FILE_PATH__ = "abilities/heroes/omniknight/omniknight_2"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 1,["12"] = 2,["13"] = 2,["14"] = 2,["15"] = 3,["16"] = 3,["17"] = 5,["18"] = 6,["19"] = 5,["20"] = 6,["21"] = 7,["22"] = 8,["23"] = 9,["24"] = 9,["25"] = 9,["26"] = 9,["27"] = 9,["28"] = 9,["29"] = 9,["30"] = 9,["31"] = 10,["34"] = 11,["35"] = 11,["36"] = 11,["37"] = 11,["38"] = 13,["39"] = 13,["41"] = 14,["42"] = 14,["43"] = 14,["44"] = 14,["45"] = 14,["46"] = 14,["47"] = 14,["48"] = 14,["49"] = 14,["50"] = 15,["51"] = 16,["52"] = 7,["53"] = 6,["54"] = 5,["55"] = 6,["57"] = 6,["58"] = 20,["59"] = 21,["60"] = 20,["61"] = 21,["63"] = 21,["64"] = 24,["65"] = 25,["66"] = 26,["67"] = 27,["68"] = 20,["69"] = 28,["70"] = 29,["73"] = 30,["74"] = 31,["75"] = 31,["76"] = 31,["78"] = 31,["79"] = 32,["80"] = 33,["81"] = 34,["82"] = 35,["83"] = 36,["84"] = 36,["86"] = 28,["87"] = 38,["88"] = 38,["89"] = 38,["90"] = 39,["91"] = 39,["92"] = 39,["93"] = 40,["94"] = 41,["95"] = 42,["96"] = 43,["97"] = 41,["98"] = 40,["99"] = 46,["100"] = 46,["101"] = 46,["102"] = 47,["103"] = 47,["104"] = 47,["105"] = 48,["106"] = 48,["107"] = 48,["108"] = 49,["109"] = 49,["110"] = 49,["111"] = 50,["112"] = 50,["113"] = 50,["114"] = 51,["115"] = 51,["116"] = 51,["117"] = 52,["118"] = 52,["119"] = 52,["120"] = 52,["121"] = 52,["122"] = 52,["123"] = 52,["124"] = 53,["125"] = 53,["126"] = 53,["127"] = 54,["128"] = 54,["129"] = 54,["130"] = 54,["131"] = 54,["132"] = 54,["133"] = 54,["135"] = 54,["136"] = 54,["137"] = 54,["138"] = 54,["139"] = 54,["140"] = 54,["142"] = 54,["143"] = 54,["144"] = 54,["145"] = 55,["146"] = 56,["147"] = 56,["149"] = 55,["150"] = 58,["151"] = 59,["152"] = 59,["153"] = 60,["154"] = 60,["157"] = 61,["158"] = 61,["159"] = 62,["160"] = 62,["161"] = 62,["162"] = 62,["163"] = 62,["164"] = 62,["165"] = 62,["166"] = 62,["167"] = 62,["168"] = 62,["169"] = 62,["170"] = 65,["171"] = 66,["172"] = 67,["173"] = 67,["176"] = 69,["177"] = 70,["178"] = 70,["179"] = 70,["180"] = 70,["181"] = 70,["182"] = 70,["183"] = 70,["184"] = 70,["185"] = 70,["186"] = 70,["188"] = 71,["189"] = 71,["190"] = 71,["191"] = 71,["192"] = 71,["193"] = 72,["194"] = 73,["195"] = 58,["197"] = 22,["203"] = 23,["208"] = 21,["209"] = 20,["210"] = 21,["212"] = 21,["213"] = 77,["214"] = 78,["215"] = 77,["216"] = 78,["217"] = 79,["218"] = 79,["219"] = 79,["220"] = 79,["221"] = 79,["222"] = 79,["223"] = 79,["225"] = 79,["226"] = 79,["227"] = 79,["228"] = 79,["229"] = 79,["230"] = 79,["232"] = 79,["233"] = 79,["234"] = 79,["235"] = 86,["236"] = 86,["237"] = 86,["238"] = 87,["239"] = 88,["240"] = 88,["241"] = 88,["242"] = 88,["243"] = 88,["244"] = 88,["245"] = 88,["246"] = 87,["247"] = 94,["248"] = 95,["249"] = 95,["251"] = 96,["252"] = 97,["253"] = 98,["254"] = 98,["255"] = 98,["256"] = 98,["257"] = 98,["258"] = 98,["259"] = 98,["260"] = 98,["261"] = 98,["262"] = 99,["263"] = 100,["264"] = 101,["265"] = 94,["267"] = 80,["273"] = 81,["279"] = 82,["285"] = 83,["291"] = 84,["297"] = 85,["302"] = 78,["303"] = 77,["304"] = 78,["306"] = 78});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local AbilityValue = ____eom_ability.AbilityValue
local EOMAbility = ____eom_ability.EOMAbility
local registerEOMAbility = ____eom_ability.registerEOMAbility
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
local ____omniknight_0 = require("abilities.heroes.omniknight.omniknight_0")
local OmniknightParticle = ____omniknight_0.OmniknightParticle
____exports.omniknight_2 = __TS__Class()
local omniknight_2 = ____exports.omniknight_2
omniknight_2.name = "omniknight_2"
__TS__ClassExtends(omniknight_2, EOMAbility)
function omniknight_2.prototype.OnSpellStart(self)
    local caster = self:GetCaster()
    local device = CreateUnitByName(
        "heal_device",
        self:GetCursorPosition(),
        true,
        caster,
        caster,
        caster:GetTeamNumber()
    )
    if not IsValid(device) then
        return
    end
    device:SetControllableByPlayer(
        caster:GetPlayerOwnerID(),
        true
    )
    if not device:HasModifier("modifier_common") then
        device:AddNewModifier(device, nil, "modifier_common", {})
    end
    device:AddNewModifier(
        caster,
        self,
        "modifier_omniknight_2",
        {
            duration = self:GetSpecialValueFor("duration"),
            strength = GetStrength(caster)
        }
    )
    device:SetHealth(device:GetMaxHealth())
    device:EmitSound("Hero_Tinker.GridEffect")
end
omniknight_2 = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    omniknight_2
)
____exports.omniknight_2 = omniknight_2
____exports.modifier_omniknight_2 = __TS__Class()
local modifier_omniknight_2 = ____exports.modifier_omniknight_2
modifier_omniknight_2.name = "modifier_omniknight_2"
__TS__ClassExtends(modifier_omniknight_2, EOMModifier)
function modifier_omniknight_2.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.health = 0
    self.armor = 0
    self.scepterDamage = 0
    self.scepterPulse = false
end
function modifier_omniknight_2.prototype.OnCreated(self, params)
    if not IsServer() then
        return
    end
    local parent = self:GetParent()
    local ____KeyValues_units_index_0 = KeyValues.units[parent:GetUnitName()]
    if ____KeyValues_units_index_0 == nil then
        ____KeyValues_units_index_0 = {}
    end
    local kv = ____KeyValues_units_index_0
    self.health = params.strength * 100 - (tonumber(kv.CustomStatusHealth) or tonumber(kv.StatusHealth) or 0)
    self.armor = params.strength - (tonumber(kv.Armor) or tonumber(kv.ArmorPhysical) or 0)
    self.scepterPulse = self:GetCaster():GetScepterLevel() >= 3
    self.scepterDamage = self:GetAbilitySpecialValueFor("scepter_damage")
    if self.scepterPulse then
        self:StartIntervalThink(self.scepter_interval)
    end
end
function modifier_omniknight_2.prototype.StaticProperty(self)
    return {[PropertyFunction.HEALTH] = self.health, [PropertyFunction.PHYSICAL_ARMOR] = self.armor}
end
function modifier_omniknight_2.prototype.StaticState(self)
    return {[StateEnum.NO_HEALTH_BAR] = true}
end
function modifier_omniknight_2.prototype.DynamicState(self)
    return {[StateEnum.FLYING_FOR_PATHING_PURPOSES_ONLY] = function()
        local caster = self:GetCaster()
        return IsValid(caster) and (caster:HasModifier("modifier_scepter_custom") or caster:HasScepter())
    end}
end
function modifier_omniknight_2.prototype.IsAura(self)
    return true
end
function modifier_omniknight_2.prototype.GetAuraRadius(self)
    return self.radius
end
function modifier_omniknight_2.prototype.GetAuraSearchTeam(self)
    return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_omniknight_2.prototype.GetAuraSearchType(self)
    return bit.bor(DOTA_UNIT_TARGET_HERO, DOTA_UNIT_TARGET_BASIC)
end
function modifier_omniknight_2.prototype.GetAuraSearchFlags(self)
    return DOTA_UNIT_TARGET_FLAG_NONE
end
function modifier_omniknight_2.prototype.GetModifierAura(self)
    return "modifier_omniknight_2_aura"
end
function modifier_omniknight_2.prototype.GetEffectName(self)
    return OmniknightParticle(
        nil,
        self:GetCaster(),
        2
    )
end
function modifier_omniknight_2.prototype.GetEffectAttachType(self)
    return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_omniknight_2.prototype.EventListener(self)
    return {
        game_end = function(____, ____bindingPattern0)
            local run_id
            run_id = ____bindingPattern0.run_id
            if run_id == GameState:GetSession().runId then
                self:Destroy()
            end
        end,
        game_reset = function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == GameState:GetSession().runId then
                self:Destroy()
            end
        end
    }
end
function modifier_omniknight_2.prototype.OnDestroy(self)
    if IsServer() and IsValid(self:GetParent()) then
        UTIL_Remove(self:GetParent())
    end
end
function modifier_omniknight_2.prototype.OnIntervalThink(self)
    local caster = self:GetCaster()
    local ability = self:GetAbility()
    if not IsValid(caster) or not IsValid(ability) then
        self:Destroy()
        return
    end
    local parent = self:GetParent()
    local thunder = caster:FindAbilityByName("omniknight_0")
    local targets = FindUnitsInRadius(
        parent:GetTeamNumber(),
        parent:GetAbsOrigin(),
        nil,
        self.radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        bit.bor(DOTA_UNIT_TARGET_HERO, DOTA_UNIT_TARGET_BASIC),
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    for ____, target in ipairs(targets) do
        caster:DealDamage(target, ability, self.scepterDamage, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
        if IsValid(thunder) then
            thunder:ThunderPower(target)
        end
    end
    local particle = ParticleManager:CreateParticle("particles/econ/items/disruptor/disruptor_ti8_immortal_weapon/disruptor_ti8_immortal_thunder_strike_bolt.vpcf", PATTACH_ABSORIGIN_FOLLOW, parent)
    for ____, point in ipairs({1, 2}) do
        ParticleManager:SetParticleControlEnt(
            particle,
            point,
            parent,
            PATTACH_ABSORIGIN_FOLLOW,
            "",
            parent:GetAbsOrigin(),
            false
        )
    end
    ParticleManager:SetParticleControl(
        particle,
        7,
        Vector(self.radius - 50, 0, 0)
    )
    ParticleManager:ReleaseParticleIndex(particle)
    parent:EmitSound("Hero_Disruptor.ThunderStrike.Target")
end
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2.prototype,
    "radius",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2.prototype,
    "scepter_interval",
    nil
)
modifier_omniknight_2 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = true, IsPurgable = false})},
    modifier_omniknight_2
)
____exports.modifier_omniknight_2 = modifier_omniknight_2
____exports.modifier_omniknight_2_aura = __TS__Class()
local modifier_omniknight_2_aura = ____exports.modifier_omniknight_2_aura
modifier_omniknight_2_aura.name = "modifier_omniknight_2_aura"
__TS__ClassExtends(modifier_omniknight_2_aura, EOMModifier)
function modifier_omniknight_2_aura.prototype.EventListener(self)
    return {
        game_end = function(____, ____bindingPattern0)
            local run_id
            run_id = ____bindingPattern0.run_id
            if run_id == GameState:GetSession().runId then
                self:Destroy()
            end
        end,
        game_reset = function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == GameState:GetSession().runId then
                self:Destroy()
            end
        end
    }
end
function modifier_omniknight_2_aura.prototype.IsDebuff(self)
    return not self:GetParent():IsFriendly(self:GetCaster())
end
function modifier_omniknight_2_aura.prototype.DynamicProperty(self)
    return {
        [PropertyFunction.HEALTH_REGEN_CONSTANT] = function() return self:IsDebuff() and 0 or self.health_regen end,
        [PropertyFunction.HEALTH_REGEN_PERCENTAGE] = function() return self:IsDebuff() and 0 or self.health_regen_pct end,
        [PropertyFunction.MANA_REGEN_CONSTANT] = function() return self:IsDebuff() and 0 or self.mana_regen end,
        [PropertyFunction.ATTACKSPEED] = function() return self:IsDebuff() and -self.attackspeed_reduce or 0 end,
        [PropertyFunction.MOVESPEED_AMPLIFY] = function() return self:IsDebuff() and -self.movespeed_reduce or 0 end
    }
end
function modifier_omniknight_2_aura.prototype.Roll(self)
    if not IsServer() or not RollPercentage(self.chance) then
        return false
    end
    local parent = self:GetParent()
    local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_omniknight/omniknight_2_refresh.vpcf", PATTACH_ABSORIGIN, parent)
    ParticleManager:SetParticleControl(
        particle,
        0,
        Vector(
            parent:GetAbsOrigin().x,
            parent:GetAbsOrigin().y,
            parent:GetAbsOrigin().z + 100
        )
    )
    ParticleManager:ReleaseParticleIndex(particle)
    parent:EmitSound("Hero_Tinker.RearmStart")
    return true
end
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "health_regen",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "mana_regen",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "health_regen_pct",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "chance",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "attackspeed_reduce",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_2_aura.prototype,
    "movespeed_reduce",
    nil
)
modifier_omniknight_2_aura = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false})},
    modifier_omniknight_2_aura
)
____exports.modifier_omniknight_2_aura = modifier_omniknight_2_aura
return ____exports
