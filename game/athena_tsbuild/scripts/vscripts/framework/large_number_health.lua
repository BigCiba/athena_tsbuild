local __TSTL_FILE_PATH__ = "framework/large_number_health"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 7,["8"] = 8,["13"] = 34,["14"] = 34,["16"] = 34,["17"] = 35,["18"] = 36,["19"] = 35,["20"] = 39,["21"] = 40,["22"] = 40,["23"] = 39,["24"] = 43,["25"] = 44,["26"] = 44,["27"] = 43,["28"] = 48,["29"] = 49,["30"] = 50,["31"] = 51,["32"] = 51,["33"] = 51,["34"] = 51,["36"] = 53,["37"] = 54,["39"] = 56,["40"] = 48,["41"] = 63,["42"] = 64,["43"] = 65,["45"] = 68,["46"] = 68,["47"] = 68,["48"] = 68,["49"] = 69,["50"] = 70,["51"] = 71,["52"] = 73,["53"] = 74,["55"] = 77,["56"] = 79,["57"] = 79,["58"] = 79,["59"] = 81,["60"] = 81,["61"] = 83,["62"] = 83,["63"] = 83,["64"] = 81,["65"] = 81,["66"] = 85,["67"] = 86,["68"] = 87,["69"] = 63,["70"] = 90,["71"] = 91,["72"] = 92,["73"] = 93,["75"] = 95,["76"] = 95,["77"] = 95,["78"] = 95,["79"] = 96,["80"] = 97,["81"] = 90,["82"] = 100,["83"] = 101,["84"] = 100,["85"] = 105,["86"] = 106,["89"] = 109,["90"] = 110,["91"] = 110,["92"] = 110,["93"] = 110,["94"] = 110,["95"] = 105,["96"] = 113,["97"] = 114,["98"] = 115,["101"] = 120,["102"] = 121,["103"] = 122,["104"] = 122,["105"] = 122,["106"] = 122,["107"] = 123,["108"] = 124,["109"] = 124,["110"] = 124,["111"] = 124,["112"] = 124,["113"] = 113});
--- 逻辑生命值上限。Dota 引擎的生命和 modifier stack 均不能可靠承载接近 int32 上限的值；
-- 超过此值的非英雄单位改用逻辑生命，客户端仅保留等比例的代理生命用于血条。
LARGE_NUMBER_HEALTH_TRIGGER = 1000000000
LARGE_NUMBER_HEALTH_PROXY_MAX = 1000000
--- 非英雄单位的大数值生命适配层。
-- 
-- 游戏逻辑始终读取真实生命；引擎生命仅用于存活状态与血条百分比。此层的有效精确范围为
-- JavaScript/Lua 双精度安全整数范围（约 9e15），若设计需要继续扩大，应改用尾数/指数类型。
LargeNumberHealth = __TS__Class()
LargeNumberHealth.name = "LargeNumberHealth"
function LargeNumberHealth.prototype.____constructor(self)
end
function LargeNumberHealth.IsActive(self, unit)
    return unit.__largeNumberHealth ~= nil
end
function LargeNumberHealth.GetHealth(self, unit)
    local ____opt_0 = unit.__largeNumberHealth
    return ____opt_0 and ____opt_0.health
end
function LargeNumberHealth.GetMaxHealth(self, unit)
    local ____opt_2 = unit.__largeNumberHealth
    return ____opt_2 and ____opt_2.max
end
function LargeNumberHealth.ToProxyValue(self, unit, amount)
    local state = unit.__largeNumberHealth
    if state == nil then
        return math.max(
            0,
            math.floor(amount)
        )
    end
    if amount <= 0 or state.max <= 0 then
        return 0
    end
    return math.floor(LARGE_NUMBER_HEALTH_PROXY_MAX * amount / state.max)
end
function LargeNumberHealth.Refresh(self, unit)
    if not IsServer() or unit:IsHero() then
        return false
    end
    local logicalMax = math.max(
        1,
        math.floor(unit:GetMaxHealth())
    )
    local previous = unit.__largeNumberHealth
    local wasUsingLargeNumberHealth = previous ~= nil
    local shouldUseLargeNumberHealth = wasUsingLargeNumberHealth or logicalMax >= LARGE_NUMBER_HEALTH_TRIGGER
    if not shouldUseLargeNumberHealth then
        return false
    end
    local healthPercent = previous ~= nil and previous.health / math.max(1, previous.max) or unit:GetHealth_Engine() / math.max(
        1,
        unit:GetMaxHealth_Engine()
    )
    local state = {
        max = logicalMax,
        health = math.max(
            1,
            math.min(logicalMax, logicalMax * healthPercent)
        )
    }
    unit.__largeNumberHealth = state
    self:SyncEngineHealth(unit)
    return true
end
function LargeNumberHealth.SetHealth(self, unit, health)
    local state = unit.__largeNumberHealth
    if state == nil then
        return false
    end
    state.health = math.max(
        0,
        math.min(state.max, health)
    )
    self:SyncEngineHealth(unit)
    return true
end
function LargeNumberHealth.ModifyHealth(self, unit, health)
    return self:SetHealth(unit, health)
end
function LargeNumberHealth.Clear(self, unit)
    if not IsServer() then
        return
    end
    unit.__largeNumberHealth = nil
    CustomNetTables:SetTableValue(
        "large_number_health",
        tostring(unit:entindex()),
        nil
    )
end
function LargeNumberHealth.SyncEngineHealth(self, unit)
    local state = unit.__largeNumberHealth
    if state == nil then
        return
    end
    unit:SetMaxHealth_Engine(LARGE_NUMBER_HEALTH_PROXY_MAX)
    unit:SetBaseMaxHealth_Engine(LARGE_NUMBER_HEALTH_PROXY_MAX)
    local proxyHealth = state.health <= 0 and 0 or math.max(
        1,
        self:ToProxyValue(unit, state.health)
    )
    unit:SetHealth_Engine(proxyHealth)
    CustomNetTables:SetTableValue(
        "large_number_health",
        tostring(unit:entindex()),
        {current = state.health, maximum = state.max}
    )
end
