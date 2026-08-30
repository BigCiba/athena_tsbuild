local __TSTL_FILE_PATH__ = "filter"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["15"] = 4,["16"] = 5,["17"] = 3,["18"] = 6,["19"] = 7,["20"] = 6,["21"] = 10,["22"] = 11,["23"] = 12,["25"] = 15,["26"] = 15,["27"] = 15,["28"] = 15,["29"] = 15,["30"] = 15,["31"] = 10,["32"] = 18,["33"] = 20,["34"] = 21,["35"] = 22,["36"] = 24,["37"] = 26,["38"] = 31,["39"] = 32,["40"] = 33,["41"] = 33,["42"] = 33,["43"] = 33,["44"] = 33,["45"] = 33,["46"] = 33,["47"] = 33,["48"] = 33,["49"] = 33,["50"] = 33,["51"] = 33,["52"] = 47,["53"] = 48,["54"] = 49,["55"] = 33,["56"] = 33,["57"] = 52,["58"] = 53,["59"] = 54,["60"] = 55,["62"] = 57,["63"] = 58,["66"] = 61,["67"] = 62,["69"] = 64,["70"] = 18,["71"] = 3,["72"] = 71,["73"] = 72});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MFilter = __TS__Class()
MFilter.name = "MFilter"
__TS__ClassExtends(MFilter, CModule)
function MFilter.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self._filters = {}
end
function MFilter.prototype.initPriority(self)
    return 0
end
function MFilter.prototype.init(self, bReload)
    local GameMode = GameRules:GetGameModeEntity()
    if bReload then
    end
    GameMode:SetTrackingProjectileFilter(
        function(self, ...)
            return self:TrackingProjectileFilter(...)
        end,
        self
    )
end
function MFilter.prototype.TrackingProjectileFilter(self, params)
    local attacker = EntIndexToHScript(params.entindex_source_const)
    local target = EntIndexToHScript(params.entindex_target_const)
    if params.is_attack == 1 and IsValid(attacker) and IsValid(target) then
        params.attacker = attacker
        params.target = target
        local direction = CalcDirection(target, attacker)
        local distance = attacker:Script_GetAttackRange()
        local info = {
            caster = attacker,
            target = target,
            direction = direction,
            effectName = attacker:GetRangedProjectileName(),
            spawnOrigin = attacker:GetAttachmentPosition("attach_attack1") or attacker:GetAbsOrigin(),
            moveSpeed = params.move_speed,
            radius = BULLET_WIDTH,
            lifeTime = distance / params.move_speed,
            teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
            typeFilter = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            flagFilter = DOTA_UNIT_TARGET_FLAG_NONE,
            OnBulletHit = function(target, position, bulletData)
                attacker:Attack(target)
                return true
            end
        }
        local kv = GetUnitKeyValuesByName(attacker:GetUnitName())
        if kv ~= nil then
            if kv.GuidanceAngularVelocity ~= nil and kv.GuidanceAngularVelocity ~= "" then
                info.angularVelocity = toFiniteNumber(kv.GuidanceAngularVelocity)
            end
            if kv.ProjectileType ~= nil and kv.ProjectileType == "PROJECTILE_TYPE_LINEAR" then
                info.angularVelocity = 0
            end
        end
        Bullet:CreateGuidedBullet(info)
        return false
    end
    return true
end
MFilter = __TS__DecorateLegacy({reloadable}, MFilter)
if _G.Filter == nil then
    _G.Filter = __TS__New(MFilter)
end
return ____exports
