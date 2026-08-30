local __TSTL_FILE_PATH__ = "class/weight_pool"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__New = ____lualib.__TS__New
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["26"] = 21,["27"] = 21,["28"] = 21,["29"] = 27,["30"] = 22,["31"] = 23,["32"] = 24,["33"] = 25,["34"] = 28,["35"] = 29,["36"] = 30,["37"] = 31,["38"] = 32,["39"] = 33,["40"] = 34,["44"] = 27,["45"] = 40,["46"] = 40,["47"] = 40,["49"] = 41,["51"] = 42,["52"] = 43,["54"] = 46,["60"] = 40,["61"] = 52,["62"] = 53,["63"] = 52,["64"] = 56,["65"] = 57,["66"] = 56,["67"] = 60,["68"] = 61,["69"] = 62,["71"] = 64,["72"] = 65,["73"] = 66,["74"] = 67,["75"] = 68,["76"] = 69,["77"] = 70,["79"] = 60,["80"] = 74,["81"] = 75,["82"] = 75,["83"] = 75,["84"] = 75,["85"] = 74,["86"] = 78,["87"] = 79,["88"] = 80,["89"] = 81,["90"] = 82,["91"] = 83,["92"] = 84,["94"] = 78,["95"] = 115,["96"] = 116,["97"] = 117,["99"] = 121,["100"] = 122,["101"] = 123,["102"] = 124,["104"] = 125,["105"] = 126,["107"] = 128,["108"] = 129,["110"] = 131,["116"] = 136,["117"] = 137,["118"] = 139,["120"] = 140,["121"] = 141,["123"] = 145,["124"] = 146,["125"] = 147,["127"] = 150,["128"] = 153,["129"] = 154,["131"] = 157,["132"] = 158,["137"] = 115,["138"] = 169,["139"] = 170,["140"] = 172,["141"] = 173,["143"] = 176,["145"] = 177,["146"] = 177,["147"] = 178,["148"] = 177,["151"] = 180,["152"] = 182,["153"] = 184,["155"] = 185,["156"] = 186,["158"] = 189,["160"] = 191,["161"] = 191,["163"] = 192,["164"] = 193,["166"] = 196,["167"] = 197,["168"] = 199,["169"] = 200,["173"] = 191,["179"] = 205,["180"] = 169,["181"] = 215,["182"] = 216,["183"] = 217,["184"] = 218,["185"] = 219,["187"] = 222,["188"] = 224,["189"] = 226,["190"] = 227,["191"] = 228,["192"] = 229,["193"] = 231,["195"] = 232,["196"] = 233,["198"] = 236,["199"] = 237,["200"] = 238,["201"] = 239,["202"] = 241,["203"] = 242,["205"] = 245,["206"] = 246,["207"] = 247,["208"] = 248,["210"] = 251,["211"] = 253,["212"] = 254,["213"] = 256,["214"] = 257,["216"] = 260,["217"] = 262,["218"] = 263,["219"] = 264,["220"] = 265,["221"] = 267,["225"] = 270,["226"] = 215,["227"] = 273,["228"] = 274,["229"] = 273,["234"] = 89,["242"] = 93,["250"] = 97});
local ____exports = {}
local ____priority_queue = require("class.priority_queue")
local PriorityQueue = ____priority_queue.PriorityQueue
local math_pow = math.pow
local math_log = math.log
local math_floor = math.floor
local math_random = math.random
--- 权重池
-- 用于处理各种权重随机计算
-- 
-- 权重池仅提供2个相关参数：
-- item: string | number | symbol
-- weight: number
-- 
-- constructor的参数tList是以item为key，weight为value的表
-- 
-- 例子：const pool = new CWeightPool({})
____exports.CWeightPool = __TS__Class()
local CWeightPool = ____exports.CWeightPool
CWeightPool.name = "CWeightPool"
function CWeightPool.prototype.____constructor(self, tList)
    self._weightData = {}
    self._totalWeight = 0
    self._count = 0
    self._validCount = 0
    if tList ~= nil then
        for item, weight in pairs(tList) do
            self._weightData[item] = weight
            self._totalWeight = self._totalWeight + weight
            self._count = self._count + 1
            if weight > 0 then
                self._validCount = self._validCount + 1
            end
        end
    end
end
function CWeightPool.prototype.Each(self, func, ignoreZero)
    if ignoreZero == nil then
        ignoreZero = false
    end
    for item, weight in pairs(self._weightData) do
        do
            if ignoreZero == true and weight <= 0 then
                goto __continue7
            end
            if func(nil, item, weight) == true then
                return
            end
        end
        ::__continue7::
    end
end
function CWeightPool.prototype.Has(self, item)
    return self._weightData[item] ~= nil
end
function CWeightPool.prototype.Get(self, item)
    return self._weightData[item] or 0
end
function CWeightPool.prototype.Set(self, item, weight)
    if not self:Has(item) then
        self._count = self._count + 1
    end
    local old = self:Get(item)
    self._weightData[item] = weight
    self._totalWeight = self._totalWeight + (weight - old)
    if old > 0 and weight <= 0 then
        self._validCount = self._validCount - 1
    elseif old <= 0 and weight > 0 then
        self._validCount = self._validCount + 1
    end
end
function CWeightPool.prototype.Add(self, item, iWeight)
    self:Set(
        item,
        self:Get(item) + iWeight
    )
end
function CWeightPool.prototype.Remove(self, item)
    local old = self:Get(item)
    __TS__Delete(self._weightData, item)
    self._totalWeight = self._totalWeight - old
    self._count = self._count - 1
    if old > 0 then
        self._validCount = self._validCount - 1
    end
end
function CWeightPool.prototype.Random(self, excluded, weightPct)
    if self._validCount <= 0 then
        return nil
    end
    local totalWeight = self._totalWeight
    if weightPct ~= nil then
        totalWeight = 0
        for item, weight in pairs(self._weightData) do
            do
                if weight <= 0 then
                    goto __continue22
                end
                if weightPct[item] ~= nil then
                    totalWeight = totalWeight + weight * (1 + weightPct[item] * 0.01)
                else
                    totalWeight = totalWeight + weight
                end
            end
            ::__continue22::
        end
    end
    local randomNumber = math_random(1, totalWeight)
    local cumulativeWeight = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 then
                goto __continue26
            end
            local currentWeight = weight
            if weightPct ~= nil and weightPct[item] ~= nil then
                currentWeight = weight * (1 + weightPct[item] * 0.01)
            end
            cumulativeWeight = cumulativeWeight + currentWeight
            if excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue26
            end
            if randomNumber <= cumulativeWeight then
                return item
            end
        end
        ::__continue26::
    end
end
function CWeightPool.prototype.MultipleRandom(self, count, excluded)
    local result = {}
    if self._validCount <= 0 then
        return result
    end
    local randomNumbers = {}
    do
        local i = 0
        while i < count do
            randomNumbers[i + 1] = math_random(1, self._totalWeight)
            i = i + 1
        end
    end
    count = #randomNumbers
    local cumulativeWeight = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 or excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue35
            end
            cumulativeWeight = cumulativeWeight + weight
            do
                local i = #randomNumbers
                while i >= 1 do
                    do
                        if randomNumbers[i] > cumulativeWeight then
                            goto __continue38
                        end
                        result[count - #randomNumbers + 1] = item
                        table.remove(randomNumbers, i)
                        if #randomNumbers <= 0 then
                            return result
                        end
                    end
                    ::__continue38::
                    i = i - 1
                end
            end
        end
        ::__continue35::
    end
    return result
end
function CWeightPool.prototype.MultipleRandomWithoutReplacement(self, count, excluded)
    if self._validCount <= 0 then
        return {}
    elseif count > self._validCount then
        count = self._validCount
    end
    count = math_floor(count)
    local queue = __TS__New(PriorityQueue)
    local Xw = 0 / 0
    local Tw = 0
    local w_acc = 0
    local i = 0
    for item, weight in pairs(self._weightData) do
        do
            if weight <= 0 or excluded ~= nil and __TS__ArrayIndexOf(excluded, item) ~= -1 then
                goto __continue44
            end
            if i < count then
                local u = math_random()
                local k = math_pow(u, 1 / weight)
                queue:Enqueue(item, k)
                i = i + 1
                goto __continue44
            end
            if w_acc == 0 then
                Tw = queue:PeekPriority() or 0
                local r = math_random()
                Xw = math_log(r) / math_log(Tw)
            end
            local w = weight
            if w_acc + w < Xw then
                w_acc = w_acc + w
                i = i + 1
                goto __continue44
            end
            w_acc = 0
            local tw = math_pow(Tw, w)
            local r2 = tw + (1 - tw) * math_random()
            local ki = math_pow(r2, 1 / w)
            queue:DequeueEnqueue(item, ki)
            i = i + 1
        end
        ::__continue44::
    end
    return queue:ToElementArray()
end
function CWeightPool.prototype.Copy(self)
    return __TS__New(____exports.CWeightPool, self._weightData)
end
__TS__SetDescriptor(
    CWeightPool.prototype,
    "Count",
    {get = function(self)
        return self._validCount
    end},
    true
)
__TS__SetDescriptor(
    CWeightPool.prototype,
    "ValidCount",
    {get = function(self)
        return self._validCount
    end},
    true
)
__TS__SetDescriptor(
    CWeightPool.prototype,
    "TotalWeight",
    {get = function(self)
        return self._totalWeight
    end},
    true
)
return ____exports
