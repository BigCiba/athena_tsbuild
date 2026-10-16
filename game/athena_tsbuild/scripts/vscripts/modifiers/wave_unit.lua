local __TSTL_FILE_PATH__ = "modifiers/wave_unit"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 1,["15"] = 4,["16"] = 5,["17"] = 4,["18"] = 5,["19"] = 6,["20"] = 6,["21"] = 6,["22"] = 7,["23"] = 7,["24"] = 7,["25"] = 8,["26"] = 8,["27"] = 8,["28"] = 9,["29"] = 9,["30"] = 9,["31"] = 10,["32"] = 10,["33"] = 10,["34"] = 11,["35"] = 11,["36"] = 11,["37"] = 5,["38"] = 4,["39"] = 5,["41"] = 5,["43"] = 15,["44"] = 15,["45"] = 15,["46"] = 16,["47"] = 16,["48"] = 16,["49"] = 17,["50"] = 17,["51"] = 17,["52"] = 18,["53"] = 18,["54"] = 18,["55"] = 19,["56"] = 20,["57"] = 20,["58"] = 20,["60"] = 19,["61"] = 22,["62"] = 23,["63"] = 24,["64"] = 25,["65"] = 22,["66"] = 27,["67"] = 28,["68"] = 29,["69"] = 29,["70"] = 29,["71"] = 29,["72"] = 29,["74"] = 27,["75"] = 31,["76"] = 31,["77"] = 31,["78"] = 32,["79"] = 32,["80"] = 32,["81"] = 33,["82"] = 33,["83"] = 33,["84"] = 36,["85"] = 37,["86"] = 36,["87"] = 37,["88"] = 37,["89"] = 36,["90"] = 37,["92"] = 37,["94"] = 40,["95"] = 41,["96"] = 40,["97"] = 41,["98"] = 42,["99"] = 41,["100"] = 44,["101"] = 45,["102"] = 45,["103"] = 45,["104"] = 45,["105"] = 45,["106"] = 46,["107"] = 46,["108"] = 46,["109"] = 46,["110"] = 46,["111"] = 46,["112"] = 46,["113"] = 46,["115"] = 42,["116"] = 49,["117"] = 41,["118"] = 49,["119"] = 49,["120"] = 49,["121"] = 50,["122"] = 50,["123"] = 50,["124"] = 41,["125"] = 40,["126"] = 41,["128"] = 41});
local ____exports = {}
local ____eom_modifier = require("modifiers.eom_modifier.eom_modifier")
local EOMModifier = ____eom_modifier.EOMModifier
local registerEOMModifier = ____eom_modifier.registerEOMModifier
--- 普通波次标记。原版自定义血条尚未迁移，先保留可见的引擎血条。
____exports.modifier_wave = __TS__Class()
local modifier_wave = ____exports.modifier_wave
modifier_wave.name = "modifier_wave"
__TS__ClassExtends(modifier_wave, EOMModifier)
function modifier_wave.prototype.IsHidden(self)
    return true
end
function modifier_wave.prototype.IsPurgable(self)
    return false
end
function modifier_wave.prototype.RemoveOnDeath(self)
    return false
end
function modifier_wave.prototype.GetPriority(self)
    return MODIFIER_PRIORITY_HIGH
end
function modifier_wave.prototype.CheckState(self)
    return {[MODIFIER_STATE_NO_HEALTH_BAR] = false}
end
function modifier_wave.prototype.StaticState(self)
    return {[StateEnum.NO_HEALTH_BAR] = true}
end
modifier_wave = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_wave
)
____exports.modifier_wave = modifier_wave
--- 两种精英共用行为；各 modifier 以自身名称持有独立百分比来源。
local WaveChampionModifier = __TS__Class()
WaveChampionModifier.name = "WaveChampionModifier"
__TS__ClassExtends(WaveChampionModifier, EOMModifier)
function WaveChampionModifier.prototype.IsHidden(self)
    return true
end
function WaveChampionModifier.prototype.IsPurgable(self)
    return false
end
function WaveChampionModifier.prototype.RemoveOnDeath(self)
    return false
end
function WaveChampionModifier.prototype.OnCreated(self, params)
    if IsServer() then
        self:SetStackCount(params.round_number or 0)
        self:StartIntervalThink(1)
    end
end
function WaveChampionModifier.prototype.StaticProperty(self)
    local difficulty = GameRules:GetCustomGameDifficulty()
    local bonus = difficulty / 2 * (1 + 0.01 * difficulty) ^ self:GetStackCount() * 100
    return {[PropertyFunction.HEALTH_AMPLIFY] = bonus, [PropertyFunction.ATTACK_AMPLIFY] = bonus}
end
function WaveChampionModifier.prototype.OnIntervalThink(self)
    local parent = self:GetParent()
    if parent:IsAlive() then
        parent:Heal(
            parent:GetMaxHealth() * 0.01,
            nil
        )
    end
end
function WaveChampionModifier.prototype.DeclareFunctions(self)
    return {MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT, MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT}
end
function WaveChampionModifier.prototype.GetModifierMoveSpeedBonus_Constant(self)
    return -50
end
function WaveChampionModifier.prototype.GetModifierAttackSpeedBonus_Constant(self)
    return 20 * GameRules:GetCustomGameDifficulty()
end
____exports.modifier_champion = __TS__Class()
local modifier_champion = ____exports.modifier_champion
modifier_champion.name = "modifier_champion"
__TS__ClassExtends(modifier_champion, WaveChampionModifier)
modifier_champion = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_champion
)
____exports.modifier_champion = modifier_champion
--- 难度 3 起普通 wave 怪额外随机获得强化，保留原版模型放大与状态特效。
____exports.modifier_elite = __TS__Class()
local modifier_elite = ____exports.modifier_elite
modifier_elite.name = "modifier_elite"
__TS__ClassExtends(modifier_elite, WaveChampionModifier)
function modifier_elite.prototype.OnCreated(self, params)
    WaveChampionModifier.prototype.OnCreated(self, params)
    if IsClient() then
        local particle = ParticleManager:CreateParticle(
            "particles/status_fx/status_effect_huskar_lifebreak.vpcf",
            PATTACH_ABSORIGIN_FOLLOW,
            self:GetParent()
        )
        self:AddParticle(
            particle,
            false,
            true,
            10,
            false,
            false
        )
    end
end
function modifier_elite.prototype.DeclareFunctions(self)
    local ____array_0 = __TS__SparseArrayNew(unpack(WaveChampionModifier.prototype.DeclareFunctions(self)))
    __TS__SparseArrayPush(____array_0, MODIFIER_PROPERTY_MODEL_SCALE)
    return {__TS__SparseArraySpread(____array_0)}
end
function modifier_elite.prototype.GetModifierModelScale(self)
    return 50
end
modifier_elite = __TS__DecorateLegacy(
    {registerEOMModifier(__TSTL_FILE_PATH__)},
    modifier_elite
)
____exports.modifier_elite = modifier_elite
return ____exports
