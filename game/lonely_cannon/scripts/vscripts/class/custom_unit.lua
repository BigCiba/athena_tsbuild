local __TSTL_FILE_PATH__ = "class/custom_unit"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 1,["9"] = 10,["10"] = 6,["11"] = 8,["12"] = 11,["13"] = 12,["14"] = 12,["15"] = 12,["16"] = 12,["17"] = 12,["18"] = 12,["19"] = 12,["20"] = 12,["21"] = 12,["22"] = 12,["23"] = 12,["24"] = 12,["25"] = 12,["26"] = 12,["27"] = 23,["28"] = 23,["29"] = 23,["30"] = 24,["31"] = 25,["32"] = 26,["34"] = 28,["35"] = 29,["36"] = 30,["37"] = 31,["38"] = 32,["39"] = 33,["40"] = 34,["42"] = 36,["43"] = 37,["44"] = 38,["47"] = 41,["48"] = 23,["49"] = 23,["50"] = 43,["51"] = 43,["52"] = 43,["53"] = 43,["54"] = 43,["55"] = 43,["56"] = 43,["57"] = 43,["58"] = 43,["59"] = 44,["60"] = 44,["62"] = 10,["63"] = 49,["64"] = 51,["65"] = 49,["66"] = 53,["67"] = 60,["68"] = 60,["69"] = 60,["70"] = 60,["71"] = 60,["72"] = 60,["73"] = 60,["74"] = 53,["75"] = 66,["76"] = 67,["77"] = 67,["78"] = 67,["79"] = 67,["80"] = 67,["81"] = 66,["82"] = 73,["83"] = 74,["84"] = 73,["85"] = 76,["86"] = 77,["87"] = 76,["88"] = 79,["89"] = 80,["90"] = 79,["91"] = 82,["92"] = 83,["93"] = 82,["94"] = 85,["95"] = 86,["96"] = 85,["97"] = 88,["98"] = 89,["99"] = 88,["100"] = 91,["101"] = 92,["102"] = 91,["103"] = 96,["104"] = 98,["105"] = 96,["106"] = 100,["107"] = 102,["108"] = 100,["109"] = 104,["110"] = 106,["111"] = 104,["112"] = 108,["113"] = 110,["114"] = 108,["115"] = 112,["116"] = 113,["117"] = 114,["119"] = 112,["120"] = 121,["121"] = 122,["122"] = 123,["123"] = 124,["124"] = 125,["125"] = 125,["126"] = 125,["127"] = 126,["128"] = 127,["129"] = 128,["130"] = 128,["131"] = 128,["132"] = 128,["133"] = 128,["134"] = 128,["135"] = 128,["136"] = 128,["137"] = 128,["138"] = 128,["139"] = 128,["140"] = 139,["141"] = 140,["142"] = 142,["143"] = 128,["144"] = 128,["145"] = 145,["146"] = 146,["147"] = 125,["148"] = 125,["149"] = 121,["150"] = 149,["151"] = 149,["152"] = 152,["153"] = 153,["154"] = 154,["155"] = 152,["156"] = 156,["157"] = 157,["158"] = 158,["159"] = 156,["160"] = 161,["161"] = 162,["164"] = 163,["165"] = 165,["166"] = 166,["167"] = 167,["169"] = 169,["170"] = 170,["171"] = 170,["173"] = 171,["174"] = 172,["176"] = 161});
local ____exports = {}
____exports.CustomUnit = __TS__Class()
local CustomUnit = ____exports.CustomUnit
CustomUnit.name = "CustomUnit"
function CustomUnit.prototype.____constructor(self, unitName, position, team)
    self.enableAttackTime = 0
    self.isDispose = false
    self.kv = KeyValues.units[unitName]
    self.entity = SpawnEntityFromTableSynchronous(
        "dota_prop_customtexture",
        {
            angles = "0 0 0",
            model = self.kv.Model,
            origin = (((tostring(position.x) .. " ") .. tostring(position.y)) .. " ") .. tostring(position.z),
            targetname = unitName,
            StartingAnim = "ACT_DOTA_SPAWN",
            StartingAnimationLoopMode = "ANIM_LOOP_MODE_USE_SEQUENCE_SETTINGS",
            IdleAnim = "ACT_DOTA_IDLE",
            IdleAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
            teamnumber = tostring(team)
        }
    )
    self.entity:StartThink(
        0,
        function()
            if self.wantPosition ~= nil then
                if self:IsSequenceFinished() then
                    self:SetSequence("ACT_DOTA_RUN")
                end
                local currentPos = self:GetAbsOrigin()
                local direction = CalcDirection2D(self.wantPosition, currentPos)
                local movespeed = self:GetMoveSpeed()
                local distanceDt = movespeed * FrameTime()
                self:SetForwardVector(direction)
                if CalcDistance(self.wantPosition, currentPos) > distanceDt then
                    self.entity:SetLocalOrigin(currentPos + direction * distanceDt)
                else
                    self.entity:SetLocalOrigin(self.wantPosition)
                    self.wantPosition = nil
                    self:SetSequence("ACT_DOTA_IDLE")
                end
            end
            self:SyncThinkerPosition()
        end
    )
    self.modifierThinker = CreateModifierThinker(
        nil,
        nil,
        "modifier_custom_thinker",
        {},
        position,
        team,
        false
    )
    if UnitManager ~= nil then
        UnitManager:AddUnit(self.modifierThinker)
    end
end
function CustomUnit.prototype.StartGesture(self, sequenceName)
    self.entity:SetSequence(sequenceName)
end
function CustomUnit.prototype.AddNewModifier(self, caster, ability, modifierName, modifierTable, flags)
    return self.modifierThinker:AddNewModifier(
        caster,
        ability,
        modifierName,
        modifierTable,
        flags
    )
end
function CustomUnit.prototype.SetForwardVector(self, forward)
    self.entity:SetLocalAngles(
        0,
        VectorToAngles(forward).y,
        0
    )
end
function CustomUnit.prototype.GetAbsOrigin(self)
    return self.entity:GetAbsOrigin()
end
function CustomUnit.prototype.GetForwardVector(self)
    return self.entity:GetForwardVector()
end
function CustomUnit.prototype.GetMoveSpeed(self)
    return self.kv.MovementSpeed
end
function CustomUnit.prototype.GetEntityIndex(self)
    return self.entity:GetEntityIndex()
end
function CustomUnit.prototype.GetUnitName(self)
    return self.entity:GetName()
end
function CustomUnit.prototype.GetRangedProjectileName(self)
    return self.kv.ProjectileModel
end
function CustomUnit.prototype.GetProjectileSpeed(self)
    return self.kv.ProjectileSpeed
end
function CustomUnit.prototype.GetSequence(self)
    return self.entity:GetSequence()
end
function CustomUnit.prototype.SetSequence(self, sequenceName)
    self.entity:SetSequence(sequenceName)
end
function CustomUnit.prototype.GetCycle(self)
    return self.entity:GetCycle()
end
function CustomUnit.prototype.IsSequenceFinished(self)
    return self.entity:IsSequenceFinished()
end
function CustomUnit.prototype.SyncThinkerPosition(self)
    if IsValid(self.modifierThinker) and IsValid(self.entity) then
        self.modifierThinker:SetAbsOrigin(self.entity:GetAbsOrigin())
    end
end
function CustomUnit.prototype.Attack(self)
    self:Stop()
    self:StartGesture("ACT_DOTA_ATTACK")
    self.enableAttackTime = GameRules:GetGameTime() + 2
    self.entity:StartThink(
        0.3,
        function()
            local start = self:GetAbsOrigin()
            local direction = self:GetForwardVector()
            local info = {
                caster = self.modifierThinker,
                direction = direction,
                effectName = "particles/units/creep/ranged_creep/ranged_creep_1_base_attack_fx.vpcf",
                spawnOrigin = start + direction * 100 + Vector(0, 0, 45),
                moveSpeed = 900,
                radius = BULLET_WIDTH,
                lifeTime = 1200 / 900,
                reflectable = true,
                teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
                typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
                OnBulletHit = function(target, position, bulletData)
                    self.modifierThinker:Attack(target, {baseDamage = 10})
                    return true
                end
            }
            Bullet:CreateGuidedBullet(info)
            return -1
        end
    )
end
function CustomUnit.prototype.GetAttackCooldown(self)
end
function CustomUnit.prototype.Move(self, position)
    self.wantPosition = position
    self:StartGesture("ACT_DOTA_RUN")
end
function CustomUnit.prototype.Stop(self)
    self.wantPosition = nil
    self:SetSequence("ACT_DOTA_IDLE")
end
function CustomUnit.prototype.dispose(self)
    if self.isDispose then
        return
    end
    self.isDispose = true
    if IsValid(self.entity) then
        self.entity:RemoveSelf()
        self.entity = nil
    end
    if IsValid(self.modifierThinker) then
        if UnitManager ~= nil then
            UnitManager:RemoveUnit(self.modifierThinker)
        end
        self.modifierThinker:RemoveSelf()
        self.modifierThinker = nil
    end
end
return ____exports
