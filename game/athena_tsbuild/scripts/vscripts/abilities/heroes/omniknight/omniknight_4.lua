local __TSTL_FILE_PATH__ = "abilities/heroes/omniknight/omniknight_4"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 1,["13"] = 1,["14"] = 2,["15"] = 2,["16"] = 2,["17"] = 3,["18"] = 3,["19"] = 5,["20"] = 6,["21"] = 5,["22"] = 6,["24"] = 6,["25"] = 7,["26"] = 5,["27"] = 8,["28"] = 8,["29"] = 8,["30"] = 9,["31"] = 9,["32"] = 9,["33"] = 9,["34"] = 9,["35"] = 9,["36"] = 9,["38"] = 9,["39"] = 9,["40"] = 9,["41"] = 9,["42"] = 9,["43"] = 9,["45"] = 9,["46"] = 9,["47"] = 9,["48"] = 10,["49"] = 11,["50"] = 12,["51"] = 12,["53"] = 10,["54"] = 14,["55"] = 15,["56"] = 16,["57"] = 17,["58"] = 18,["60"] = 19,["62"] = 14,["63"] = 21,["64"] = 22,["65"] = 24,["66"] = 24,["67"] = 24,["68"] = 24,["69"] = 24,["70"] = 24,["73"] = 25,["74"] = 25,["75"] = 26,["76"] = 26,["77"] = 27,["78"] = 28,["79"] = 28,["80"] = 29,["83"] = 30,["84"] = 31,["85"] = 32,["86"] = 33,["87"] = 34,["88"] = 34,["90"] = 35,["91"] = 36,["92"] = 36,["93"] = 36,["94"] = 36,["95"] = 36,["96"] = 37,["97"] = 38,["98"] = 39,["99"] = 40,["102"] = 41,["103"] = 41,["104"] = 41,["105"] = 41,["106"] = 42,["107"] = 42,["109"] = 43,["110"] = 43,["111"] = 43,["112"] = 43,["113"] = 43,["114"] = 43,["115"] = 43,["116"] = 43,["117"] = 43,["118"] = 43,["119"] = 43,["120"] = 43,["121"] = 43,["122"] = 43,["123"] = 45,["124"] = 45,["126"] = 46,["127"] = 41,["128"] = 41,["129"] = 28,["130"] = 49,["131"] = 21,["132"] = 6,["133"] = 5,["134"] = 6,["136"] = 6,["137"] = 53,["138"] = 54,["139"] = 53,["140"] = 54,["142"] = 54,["143"] = 63,["144"] = 53,["145"] = 64,["146"] = 65,["147"] = 64,["148"] = 68,["149"] = 68,["150"] = 68,["151"] = 68,["152"] = 68,["153"] = 68,["154"] = 68,["155"] = 69,["156"] = 69,["157"] = 69,["158"] = 70,["159"] = 70,["160"] = 70,["162"] = 70,["163"] = 71,["164"] = 72,["165"] = 72,["166"] = 72,["167"] = 73,["168"] = 74,["169"] = 75,["171"] = 72,["172"] = 71,["173"] = 79,["174"] = 80,["175"] = 80,["176"] = 81,["177"] = 81,["180"] = 82,["181"] = 83,["182"] = 84,["183"] = 84,["184"] = 84,["185"] = 84,["186"] = 84,["187"] = 84,["188"] = 84,["189"] = 84,["190"] = 84,["191"] = 84,["192"] = 84,["193"] = 86,["194"] = 86,["195"] = 86,["196"] = 86,["197"] = 86,["198"] = 86,["199"] = 86,["201"] = 87,["202"] = 87,["204"] = 79,["206"] = 55,["212"] = 56,["218"] = 57,["224"] = 58,["230"] = 59,["236"] = 60,["242"] = 61,["248"] = 62,["253"] = 54,["254"] = 53,["255"] = 54,["257"] = 54,["258"] = 91,["259"] = 92,["260"] = 91,["261"] = 92,["262"] = 93,["263"] = 93,["264"] = 93,["265"] = 94,["266"] = 94,["267"] = 94,["268"] = 94,["269"] = 94,["270"] = 94,["272"] = 94,["273"] = 94,["274"] = 97,["275"] = 97,["276"] = 97,["277"] = 98,["278"] = 98,["279"] = 98,["280"] = 99,["281"] = 99,["282"] = 99,["283"] = 100,["284"] = 101,["287"] = 102,["288"] = 102,["289"] = 102,["290"] = 103,["291"] = 104,["292"] = 105,["293"] = 105,["294"] = 105,["295"] = 105,["296"] = 105,["297"] = 106,["298"] = 107,["299"] = 107,["302"] = 100,["304"] = 95,["310"] = 96,["315"] = 92,["316"] = 91,["317"] = 92,["319"] = 92});
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
____exports.omniknight_4 = __TS__Class()
local omniknight_4 = ____exports.omniknight_4
omniknight_4.name = "omniknight_4"
__TS__ClassExtends(omniknight_4, EOMAbility)
function omniknight_4.prototype.____constructor(self, ...)
    EOMAbility.prototype.____constructor(self, ...)
    self.stormGeneration = 0
end
function omniknight_4.prototype.OnDestroy(self)
    self.stormGeneration = self.stormGeneration + 1
end
function omniknight_4.prototype.EventListener(self)
    return {
        game_end = function(____, ____bindingPattern0)
            local run_id
            run_id = ____bindingPattern0.run_id
            if run_id == GameState:GetSession().runId then
                self:StopStorms()
            end
        end,
        game_reset = function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == GameState:GetSession().runId then
                self:StopStorms()
            end
        end
    }
end
function omniknight_4.prototype.StopStorms(self)
    self.stormGeneration = self.stormGeneration + 1
    if self:GetToggleState() then
        self:ToggleAbility()
    end
end
function omniknight_4.prototype.OnToggle(self)
    local caster = self:GetCaster()
    if self:GetToggleState() then
        caster:AddNewModifier(caster, self, "modifier_omniknight_4", {})
        caster:EmitSound("Hero_Terrorblade.Reflection")
    else
        caster:RemoveModifierByName("modifier_omniknight_4")
    end
end
function omniknight_4.prototype.ThunderStorm(self, target)
    local caster = self:GetCaster()
    if not IsServer() or not IsValid(target) or not target:IsAlive() or not PRD(
        nil,
        self,
        self:GetSpecialValueFor("storm_chance"),
        "omniknight_4"
    ) then
        return
    end
    local generation = self.stormGeneration
    local runId = GameState:GetSession().runId
    local damage = self:GetSpecialValueFor("storm_str_damage")
    local jumps = self:GetSpecialValueFor("storm_jump_count")
    local hit = {}
    local strike
    strike = function(____, victim)
        if not IsValid(self) or not IsValid(caster) or not IsValid(victim) or not victim:IsAlive() or generation ~= self.stormGeneration or GameState:GetSession().runId ~= runId then
            return
        end
        local origin = victim:GetAbsOrigin()
        hit[#hit + 1] = victim
        caster:DealDamage(victim, self, damage)
        local thunder = caster:FindAbilityByName("omniknight_0")
        if IsValid(thunder) then
            thunder:ThunderPower(victim)
        end
        local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf", PATTACH_CUSTOMORIGIN, caster)
        ParticleManager:SetParticleControl(
            particle,
            0,
            Vector(origin.x, origin.y, origin.z + 900)
        )
        ParticleManager:SetParticleControl(particle, 1, origin)
        ParticleManager:ReleaseParticleIndex(particle)
        caster:EmitSound("Hero_Leshrac.Lightning_Storm")
        if #hit >= jumps then
            return
        end
        self:StartThink(
            self:GetSpecialValueFor("storm_interval"),
            DoUniqueString("omniknight_storm"),
            function()
                if not IsValid(self) or not IsValid(caster) or generation ~= self.stormGeneration or GameState:GetSession().runId ~= runId then
                    return -1
                end
                local next = __TS__ArrayFind(
                    FindUnitsInRadius(
                        caster:GetTeamNumber(),
                        origin,
                        nil,
                        600,
                        self:GetAbilityTargetTeam(),
                        self:GetAbilityTargetType(),
                        self:GetAbilityTargetFlags(),
                        FIND_CLOSEST,
                        false
                    ),
                    function(____, unit) return __TS__ArrayIndexOf(hit, unit) < 0 end
                )
                if next then
                    strike(nil, next)
                end
                return -1
            end
        )
    end
    strike(nil, target)
end
omniknight_4 = __TS__DecorateLegacy(
    {registerEOMAbility(nil)},
    omniknight_4
)
____exports.omniknight_4 = omniknight_4
____exports.modifier_omniknight_4 = __TS__Class()
local modifier_omniknight_4 = ____exports.modifier_omniknight_4
modifier_omniknight_4.name = "modifier_omniknight_4"
__TS__ClassExtends(modifier_omniknight_4, EOMModifier)
function modifier_omniknight_4.prototype.____constructor(self, ...)
    EOMModifier.prototype.____constructor(self, ...)
    self.retaliationReady = true
end
function modifier_omniknight_4.prototype.StaticProperty(self)
    return {[PropertyFunction.ATTACKSPEED] = self.bonus_attackspeed, [PropertyFunction.MOVESPEED] = self.bonus_movespeed, [PropertyFunction.ARMOR_BONUS] = self.bonus_resistance, [PropertyFunction.OUTGOING_MAGICAL_DAMAGE_PERCENTAGE] = self.bonus_amp_percent}
end
function modifier_omniknight_4.prototype.GetEffectName(self)
    return OmniknightParticle(
        nil,
        self:GetParent(),
        4
    )
end
function modifier_omniknight_4.prototype.GetEffectAttachType(self)
    return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_omniknight_4.prototype.OnCreated(self)
    if IsServer() then
        self:StartIntervalThink(self.palsy_interval)
    end
end
function modifier_omniknight_4.prototype.UnitEventListener(self)
    return {attack_landed = {target = function(____, ____bindingPattern0)
        local attacker
        attacker = ____bindingPattern0.attacker
        if self.retaliationReady and self:GetParent():HasModifier("modifier_omniknight_01") then
            self.retaliationReady = false
            self:GetAbility():ThunderStorm(attacker)
        end
    end}}
end
function modifier_omniknight_4.prototype.OnIntervalThink(self)
    local caster = self:GetCaster()
    local ability = self:GetAbility()
    if not IsValid(caster) or not IsValid(ability) then
        self:Destroy()
        return
    end
    self.retaliationReady = true
    caster:SpendMana(self.mana_cost, ability)
    local targets = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        self.palsy_radius,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags(),
        FIND_CLOSEST,
        false
    )
    for ____, target in ipairs(targets) do
        target:AddNewModifier(
            caster,
            ability,
            "modifier_omniknight_4_debuff",
            {duration = self.palsy_duration * (1 - target:GetStatusResistance())}
        )
    end
    if caster:GetMana() < self.mana_cost and ability:GetToggleState() then
        ability:ToggleAbility()
    end
end
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "bonus_attackspeed",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "bonus_movespeed",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "bonus_resistance",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "bonus_amp_percent",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "mana_cost",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "palsy_duration",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "palsy_radius",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4.prototype,
    "palsy_interval",
    nil
)
modifier_omniknight_4 = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsPurgable = false})},
    modifier_omniknight_4
)
____exports.modifier_omniknight_4 = modifier_omniknight_4
____exports.modifier_omniknight_4_debuff = __TS__Class()
local modifier_omniknight_4_debuff = ____exports.modifier_omniknight_4_debuff
modifier_omniknight_4_debuff.name = "modifier_omniknight_4_debuff"
__TS__ClassExtends(modifier_omniknight_4_debuff, EOMModifier)
function modifier_omniknight_4_debuff.prototype.IgnoreTenacity(self)
    return true
end
function modifier_omniknight_4_debuff.prototype.EventListener(self)
    return {game_reset = function(____, ____bindingPattern0)
        local runId
        runId = ____bindingPattern0.runId
        if runId == GameState:GetSession().runId then
            self:Destroy()
        end
    end}
end
function modifier_omniknight_4_debuff.prototype.StaticProperty(self)
    return {[PropertyFunction.ATTACKSPEED] = -self.palsy_attackspeed, [PropertyFunction.MOVESPEED] = -self.palsy_movespeed}
end
function modifier_omniknight_4_debuff.prototype.GetEffectName(self)
    return "particles/units/heroes/hero_leshrac/leshrac_lightning_slow.vpcf"
end
function modifier_omniknight_4_debuff.prototype.GetEffectAttachType(self)
    return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_omniknight_4_debuff.prototype.OnCreated(self)
    if not IsServer() then
        return
    end
    local caster = self:GetCaster()
    local ability = self:GetAbility()
    local parent = self:GetParent()
    ability:ThunderStorm(parent)
    if caster:GetScepterLevel() >= 4 then
        caster:DealDamage(
            parent,
            ability,
            ability:GetSpecialValueFor("scepter_damage")
        )
        local thunder = caster:FindAbilityByName("omniknight_0")
        if IsValid(thunder) then
            thunder:ThunderPower(parent)
        end
    end
end
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4_debuff.prototype,
    "palsy_attackspeed",
    nil
)
__TS__DecorateLegacy(
    {AbilityValue(nil)},
    modifier_omniknight_4_debuff.prototype,
    "palsy_movespeed",
    nil
)
modifier_omniknight_4_debuff = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__, {IsHidden = false, IsDebuff = true, IsPurgable = true, IsPurgeException = true})},
    modifier_omniknight_4_debuff
)
____exports.modifier_omniknight_4_debuff = modifier_omniknight_4_debuff
return ____exports
