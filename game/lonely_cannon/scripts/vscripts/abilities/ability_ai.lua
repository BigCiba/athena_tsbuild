local __TSTL_FILE_PATH__ = "abilities/ability_ai"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 20,["10"] = 20,["11"] = 20,["12"] = 20,["13"] = 22,["14"] = 23,["15"] = 24,["16"] = 25,["18"] = 22,["19"] = 28,["20"] = 29,["21"] = 28,["22"] = 32,["23"] = 34,["24"] = 35,["25"] = 36,["26"] = 37,["27"] = 38,["28"] = 39,["29"] = 40,["30"] = 41,["33"] = 45,["34"] = 46,["35"] = 47,["36"] = 48,["37"] = 49,["39"] = 51,["40"] = 52,["42"] = 55,["43"] = 56,["45"] = 32,["46"] = 60,["47"] = 61,["48"] = 62,["49"] = 63,["50"] = 64,["52"] = 66,["53"] = 67,["54"] = 67,["55"] = 67,["56"] = 68,["57"] = 69,["58"] = 70,["60"] = 72,["61"] = 73,["62"] = 74,["63"] = 74,["64"] = 74,["65"] = 74,["66"] = 74,["67"] = 74,["68"] = 74,["69"] = 74,["70"] = 74,["71"] = 74,["72"] = 74,["73"] = 75,["74"] = 76,["77"] = 79,["80"] = 82,["81"] = 67,["82"] = 67,["83"] = 84,["84"] = 85,["85"] = 85,["86"] = 85,["87"] = 86,["88"] = 87,["89"] = 88,["91"] = 90,["92"] = 91,["93"] = 92,["94"] = 93,["95"] = 93,["96"] = 93,["97"] = 93,["98"] = 93,["99"] = 93,["100"] = 93,["101"] = 93,["102"] = 93,["103"] = 93,["104"] = 93,["105"] = 94,["106"] = 95,["108"] = 97,["109"] = 98,["110"] = 98,["111"] = 98,["112"] = 98,["113"] = 98,["114"] = 98,["115"] = 98,["116"] = 98,["117"] = 98,["118"] = 98,["119"] = 99,["120"] = 100,["121"] = 100,["122"] = 100,["123"] = 100,["124"] = 100,["125"] = 100,["126"] = 100,["127"] = 100,["128"] = 100,["129"] = 100,["130"] = 100,["131"] = 100,["133"] = 102,["134"] = 103,["137"] = 106,["138"] = 85,["139"] = 85,["140"] = 108,["141"] = 109,["142"] = 109,["143"] = 109,["144"] = 110,["145"] = 111,["146"] = 112,["148"] = 114,["149"] = 115,["150"] = 116,["151"] = 117,["152"] = 117,["153"] = 117,["154"] = 117,["155"] = 117,["156"] = 117,["157"] = 117,["158"] = 117,["159"] = 117,["160"] = 117,["161"] = 117,["162"] = 118,["163"] = 119,["165"] = 121,["166"] = 122,["168"] = 124,["169"] = 125,["170"] = 125,["171"] = 125,["172"] = 125,["173"] = 125,["174"] = 125,["175"] = 125,["176"] = 125,["177"] = 125,["178"] = 125,["180"] = 127,["181"] = 128,["184"] = 131,["185"] = 109,["186"] = 109,["188"] = 60,["189"] = 135,["190"] = 136,["191"] = 137,["192"] = 138,["194"] = 135,["195"] = 141,["196"] = 142,["197"] = 141,["198"] = 144,["199"] = 145,["200"] = 144,["201"] = 147,["202"] = 148,["203"] = 147,["204"] = 150,["205"] = 151,["206"] = 152,["208"] = 154,["209"] = 150,["210"] = 156,["211"] = 157,["212"] = 156,["213"] = 159,["214"] = 160,["215"] = 159,["216"] = 162,["217"] = 163,["218"] = 162,["219"] = 165,["220"] = 166,["221"] = 165});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
____exports.EOMAbilityAI = __TS__Class()
local EOMAbilityAI = ____exports.EOMAbilityAI
EOMAbilityAI.name = "EOMAbilityAI"
__TS__ClassExtends(EOMAbilityAI, EOMAbility)
function EOMAbilityAI.prototype.Spawn(self)
    if IsServer() then
        self:ParseBehavior()
        self:_StartThink()
    end
end
function EOMAbilityAI.prototype.GetThinkInterval(self)
    return AI_TIMER_TICK_TIME
end
function EOMAbilityAI.prototype.ParseBehavior(self)
    if not self:IsPassive() and self.behavior == nil then
        local behavior = tonumber(tostring(self:GetBehavior()))
        if bit.band(behavior, DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR_NO_TARGET then
            self.behavior = DOTA_ABILITY_BEHAVIOR_NO_TARGET
        elseif bit.band(behavior, DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR_UNIT_TARGET then
            self.behavior = DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
        elseif bit.band(behavior, DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR_POINT then
            self.behavior = DOTA_ABILITY_BEHAVIOR_POINT
        end
    end
    self.targetTeam = self.targetTeam or self:GetAbilityTargetTeam()
    self.targetType = self.targetType or self:GetAbilityTargetType()
    self.targetFlags = self.targetFlags or self:GetAbilityTargetFlags()
    if self.targetTeam == DOTA_UNIT_TARGET_TEAM_NONE then
        self.targetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY
    end
    if self.targetType == DOTA_UNIT_TARGET_NONE then
        self.targetType = DOTA_UNIT_TARGET_HEROES_AND_CREEPS
    end
    if bit.band(self.targetType, DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_BUILDING then
        self.targetType = self.targetType - DOTA_UNIT_TARGET_BUILDING
    end
end
function EOMAbilityAI.prototype._StartThink(self)
    self:_StopThink()
    local hCaster = self:GetCaster()
    if hCaster:HasState(StateEnum.AI_DISABLED) then
        return self:GetThinkInterval()
    end
    if self.behavior == DOTA_ABILITY_BEHAVIOR_NO_TARGET then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition(self) ~= true then
                        return self:GetThinkInterval()
                    end
                    local aoeRadius = self:GetAOERadius()
                    if aoeRadius > 0 then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if IsValid(tTargets[1]) then
                            self:_CastAbilityNoTarget()
                        end
                    else
                        self:_CastAbilityNoTarget()
                    end
                end
                return self:GetThinkInterval()
            end
        )
    elseif self.behavior == DOTA_ABILITY_BEHAVIOR_POINT then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition(self) ~= true then
                        return self:GetThinkInterval()
                    end
                    local flCastRange = self:GetAICastRange()
                    local vPosition = vec3_invalid
                    if self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            flCastRange,
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if IsValid(tTargets[1]) then
                            vPosition = tTargets[1]:GetAbsOrigin()
                        end
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET then
                        vPosition = GetAOEMostTargetsPosition(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType
                        )
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET then
                        vPosition = GetLinearMostTargetsPosition(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetLinearStartWidth(),
                            self:GetLinearEndWidth(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            {}
                        )
                    end
                    if vPosition ~= vec3_invalid then
                        self:_CastAbilityOnPosition(vPosition)
                    end
                end
                return self:GetThinkInterval()
            end
        )
    elseif self.behavior == DOTA_ABILITY_BEHAVIOR_UNIT_TARGET then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition(self) ~= true then
                        return self:GetThinkInterval()
                    end
                    local flCastRange = self:GetAICastRange()
                    local hTarget
                    if self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            flCastRange,
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if self.funcUnitsCallback ~= nil then
                            tTargets = self:funcUnitsCallback(tTargets)
                        end
                        if IsValid(tTargets[1]) then
                            hTarget = tTargets[1]
                        end
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET then
                        hTarget = GetAOEMostTargetsSpellTarget(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType
                        )
                    end
                    if hTarget then
                        self:_CastAbilityOnTarget(hTarget)
                    end
                end
                return self:GetThinkInterval()
            end
        )
    end
end
function EOMAbilityAI.prototype._StopThink(self)
    if self.aiTimer then
        self:StopTimer(self.aiTimer)
        self.aiTimer = nil
    end
end
function EOMAbilityAI.prototype._CastAbilityNoTarget(self)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, self)
end
function EOMAbilityAI.prototype._CastAbilityOnPosition(self, vPosition)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, self, vPosition)
end
function EOMAbilityAI.prototype._CastAbilityOnTarget(self, hTarget)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_TARGET, self, hTarget)
end
function EOMAbilityAI.prototype._IsReady(self)
    if self:IsAbilityReady() then
        return true
    end
    return false
end
function EOMAbilityAI.prototype.GetAOERadius(self)
    return self.aoeRadius or 0
end
function EOMAbilityAI.prototype.GetAICastRange(self)
    return self:GetEffectiveCastRange(vec3_invalid, nil)
end
function EOMAbilityAI.prototype.GetLinearStartWidth(self)
    return self.startWidth or 0
end
function EOMAbilityAI.prototype.GetLinearEndWidth(self)
    return self.endWidth or 0
end
return ____exports
