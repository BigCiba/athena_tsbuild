local __TSTL_FILE_PATH__ = "framework/particle_clear"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["15"] = 4,["16"] = 5,["17"] = 6,["18"] = 7,["19"] = 8,["20"] = 3,["21"] = 9,["22"] = 10,["23"] = 11,["24"] = 11,["25"] = 11,["26"] = 12,["27"] = 13,["28"] = 14,["29"] = 15,["30"] = 11,["31"] = 11,["33"] = 9,["34"] = 19,["35"] = 20,["38"] = 21,["39"] = 22,["40"] = 23,["41"] = 23,["42"] = 23,["43"] = 23,["44"] = 24,["45"] = 25,["46"] = 26,["47"] = 27,["48"] = 28,["49"] = 29,["52"] = 33,["53"] = 22,["54"] = 19,["55"] = 36,["56"] = 37,["57"] = 36,["58"] = 40,["59"] = 41,["60"] = 40,["61"] = 44,["62"] = 45,["63"] = 44,["64"] = 48,["65"] = 49,["66"] = 48,["67"] = 52,["68"] = 53,["69"] = 52,["70"] = 57,["71"] = 58,["72"] = 59,["73"] = 57,["74"] = 3,["75"] = 66,["76"] = 66});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CParticleClear = __TS__Class()
CParticleClear.name = "CParticleClear"
__TS__ClassExtends(CParticleClear, CModule)
function CParticleClear.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.particleCounterByPlayer = {}
    self.maxCountByPlayer = {}
    self.totalCounter = 0
    self.MAX_TOTAL_COUNT = 500
end
function CParticleClear.prototype.init(self, reload)
    if not reload then
        Timer:GameTimer(
            1,
            function()
                self.particleCounterByPlayer = {}
                self.totalCounter = 0
                self:RefreshMaxCount()
                return 1
            end
        )
    end
end
function CParticleClear.prototype.RefreshMaxCount(self)
    if not IsServer() then
        return
    end
    self.maxCountByPlayer = {}
    Game:EachPlayer(function(____, playerID)
        local data = CustomNetTables:GetTableValue(
            "service",
            "player_key_values" .. tostring(playerID)
        )
        local maxCount = 420
        if data ~= nil and data.data ~= nil then
            local kv = json.decode(data.data)
            if kv ~= nil and kv.Setting_ParticleLevel ~= nil then
                local particleLevel = toFiniteNumber(kv.Setting_ParticleLevel.value)
                maxCount = 10 * math.pow(1.6, particleLevel)
            end
        end
        self.maxCountByPlayer[playerID] = maxCount
    end)
end
function CParticleClear.prototype.GetMaxCount(self, playerID)
    return self.maxCountByPlayer[playerID] or 420
end
function CParticleClear.prototype.GetCount(self, playerID)
    return self.particleCounterByPlayer[playerID] or 0
end
function CParticleClear.prototype.GetTotalCount(self)
    return self.totalCounter
end
function CParticleClear.prototype.GetMaxTotalCount(self)
    return self.MAX_TOTAL_COUNT
end
function CParticleClear.prototype.CanCreate(self, playerID)
    return self:GetCount(playerID) < self:GetMaxCount(playerID) and self.totalCounter < self.MAX_TOTAL_COUNT
end
function CParticleClear.prototype.Record(self, playerID)
    self.particleCounterByPlayer[playerID] = self:GetCount(playerID) + 1
    self.totalCounter = self.totalCounter + 1
end
CParticleClear = __TS__DecorateLegacy({reloadable}, CParticleClear)
if ParticleClear == nil then
    ParticleClear = __TS__New(CParticleClear)
end
return ____exports
