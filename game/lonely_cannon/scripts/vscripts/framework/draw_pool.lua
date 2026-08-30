local __TSTL_FILE_PATH__ = "framework/draw_pool"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__New = ____lualib.__TS__New
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 9,["17"] = 10,["18"] = 11,["19"] = 12,["20"] = 13,["21"] = 14,["23"] = 17,["24"] = 18,["25"] = 19,["27"] = 22,["28"] = 23,["29"] = 24,["30"] = 25,["31"] = 26,["32"] = 26,["33"] = 27,["34"] = 28,["35"] = 29,["37"] = 26,["38"] = 26,["39"] = 26,["40"] = 32,["41"] = 32,["42"] = 33,["43"] = 34,["44"] = 35,["45"] = 35,["46"] = 36,["47"] = 35,["48"] = 35,["49"] = 35,["51"] = 39,["53"] = 32,["54"] = 32,["55"] = 32,["56"] = 42,["57"] = 43,["58"] = 43,["59"] = 44,["60"] = 43,["61"] = 43,["62"] = 43,["63"] = 46,["64"] = 47,["65"] = 47,["66"] = 48,["67"] = 47,["68"] = 47,["69"] = 47,["71"] = 51,["73"] = 9,["74"] = 56,["75"] = 57,["76"] = 58,["78"] = 60,["79"] = 61,["82"] = 56,["83"] = 66,["84"] = 67,["85"] = 68,["87"] = 71,["88"] = 72,["90"] = 66,["91"] = 77,["92"] = 78,["95"] = 82,["96"] = 77,["97"] = 85,["98"] = 86,["101"] = 90,["102"] = 85,["103"] = 93,["104"] = 94,["107"] = 98,["108"] = 93,["109"] = 102,["110"] = 103,["113"] = 107,["114"] = 102,["115"] = 110,["116"] = 111,["119"] = 115,["120"] = 110,["121"] = 117,["122"] = 118,["125"] = 122,["126"] = 117,["127"] = 126,["128"] = 127,["131"] = 131,["132"] = 126,["133"] = 133,["134"] = 134,["135"] = 133,["136"] = 136,["137"] = 137,["140"] = 141,["141"] = 136,["142"] = 143,["143"] = 144,["146"] = 148,["147"] = 143,["148"] = 152,["149"] = 153,["150"] = 152,["151"] = 155,["152"] = 156,["153"] = 157,["155"] = 159,["156"] = 160,["159"] = 155,["160"] = 4,["161"] = 170,["162"] = 170});
local ____exports = {}
local ____weight_pool = require("class.weight_pool")
local CWeightPool = ____weight_pool.CWeightPool
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MDrawPool = __TS__Class()
MDrawPool.name = "MDrawPool"
__TS__ClassExtends(MDrawPool, CModule)
function MDrawPool.prototype.init(self, reload)
    local reservoirsKv = LoadKeyValues("scripts/npc/gameplay/reservoirs.kv")
    local poolsKv = LoadKeyValues("scripts/npc/gameplay/pools.kv")
    self._baseReservoirs = {}
    for k, v in pairs(reservoirsKv) do
        self._baseReservoirs[k] = __TS__New(CWeightPool, v)
    end
    self._pools = {}
    for k, v in pairs(poolsKv) do
        self._pools[k] = __TS__New(CWeightPool, v)
    end
    self._reservoirs = {}
    for k, oldReservoirs in pairs(self._baseReservoirs) do
        local newReservoirs = __TS__New(CWeightPool)
        local lcm
        oldReservoirs:Each(
            function(____, poolName, _)
                local pool = self._pools[poolName]
                if pool ~= nil and pool.TotalWeight ~= 0 then
                    lcm = lcm == nil and pool.TotalWeight or LeastCommonMultiple(lcm, pool.TotalWeight)
                end
            end,
            true
        )
        oldReservoirs:Each(
            function(____, poolName, weight1)
                local pool = self._pools[poolName]
                if pool ~= nil then
                    pool:Each(
                        function(____, item, weight2)
                            newReservoirs:Add(item, lcm / pool.TotalWeight * weight2 * weight1)
                        end,
                        true
                    )
                else
                    newReservoirs:Add(poolName, lcm == nil and weight1 or weight1 * lcm)
                end
            end,
            true
        )
        local gcm
        newReservoirs:Each(
            function(____, item, weight)
                gcm = gcm == nil and weight or GreatestCommonDivisor(gcm, weight)
            end,
            true
        )
        if gcm ~= nil then
            newReservoirs:Each(
                function(____, item, weight)
                    newReservoirs:Set(item, weight / gcm)
                end,
                true
            )
        end
        self._reservoirs[k] = newReservoirs
    end
end
function MDrawPool.prototype.Draw(self, reservoirOrPool, excluded)
    if self._reservoirs[reservoirOrPool] ~= nil then
        return self._reservoirs[reservoirOrPool]:Random(excluded)
    end
    if self._pools[reservoirOrPool] ~= nil then
        return self._pools[reservoirOrPool]:Random(excluded)
    end
    return
end
function MDrawPool.prototype.MultipleDraw(self, reservoirOrPool, count, excluded)
    if self._reservoirs[reservoirOrPool] ~= nil then
        return self._reservoirs[reservoirOrPool]:MultipleRandomWithoutReplacement(count, excluded)
    end
    if self._pools[reservoirOrPool] ~= nil then
        return self._pools[reservoirOrPool]:MultipleRandomWithoutReplacement(count, excluded)
    end
end
function MDrawPool.prototype.DrawReservoirOnly(self, sReservoirName, excluded)
    if self._baseReservoirs[sReservoirName] == nil then
        return
    end
    return self._baseReservoirs[sReservoirName]:Random(excluded)
end
function MDrawPool.prototype.MultipleDrawReservoirOnly(self, sReservoirName, count, excluded)
    if self._baseReservoirs[sReservoirName] == nil then
        return
    end
    return self._baseReservoirs[sReservoirName]:MultipleRandom(count, excluded)
end
function MDrawPool.prototype.MultipleDrawReservoirOnlyWithoutReplacement(self, sReservoirName, count, excluded)
    if self._baseReservoirs[sReservoirName] == nil then
        return
    end
    return self._baseReservoirs[sReservoirName]:MultipleRandomWithoutReplacement(count, excluded)
end
function MDrawPool.prototype.DrawReservoir(self, sReservoirName, excluded)
    if self._reservoirs[sReservoirName] == nil then
        return
    end
    return self._reservoirs[sReservoirName]:Random(excluded)
end
function MDrawPool.prototype.MultipleDrawReservoir(self, sReservoirName, count, excluded)
    if self._reservoirs[sReservoirName] == nil then
        return
    end
    return self._reservoirs[sReservoirName]:MultipleRandom(count, excluded)
end
function MDrawPool.prototype.MultipleDrawReservoirWithoutReplacement(self, sReservoirName, count, excluded)
    if self._reservoirs[sReservoirName] == nil then
        return
    end
    return self._reservoirs[sReservoirName]:MultipleRandomWithoutReplacement(count, excluded)
end
function MDrawPool.prototype.DrawPool(self, sPoolName, excluded)
    if self._pools[sPoolName] == nil then
        return
    end
    return self._pools[sPoolName]:Random(excluded)
end
function MDrawPool.prototype.GetPool(self, sPoolName)
    return self._pools[sPoolName]
end
function MDrawPool.prototype.MultipleDrawPool(self, sReservoirName, count, excluded)
    if self._pools[sReservoirName] == nil then
        return
    end
    return self._pools[sReservoirName]:MultipleRandom(count, excluded)
end
function MDrawPool.prototype.MultipleDrawPoolWithoutReplacement(self, sReservoirName, count, excluded)
    if self._pools[sReservoirName] == nil then
        return
    end
    return self._pools[sReservoirName]:MultipleRandomWithoutReplacement(count, excluded)
end
function MDrawPool.prototype.GetGameReservoirOrPool(self, name)
    return self._reservoirs[name] or self._pools[name]
end
function MDrawPool.prototype.DrawReservoirOrPool(self, name, excluded)
    if self._reservoirs[name] ~= nil then
        return self._reservoirs[name]:Random(excluded)
    end
    if self._pools[name] ~= nil then
        return self._pools[name]:Random(excluded)
    end
    return
end
MDrawPool = __TS__DecorateLegacy({reloadable}, MDrawPool)
if DrawPool == nil then
    DrawPool = __TS__New(MDrawPool)
end
return ____exports
