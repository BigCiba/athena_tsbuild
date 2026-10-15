local __TSTL_FILE_PATH__ = "class/game_state_class"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 2,["9"] = 2,["10"] = 2,["12"] = 3,["13"] = 5,["14"] = 6,["15"] = 7,["16"] = 2,["17"] = 8,["18"] = 9,["21"] = 10,["22"] = 10,["23"] = 11,["25"] = 12,["26"] = 12,["29"] = 12,["32"] = 12,["33"] = 12,["39"] = 12,["42"] = 13,["43"] = 14,["45"] = 14,["49"] = 8,["50"] = 16,["51"] = 16,["52"] = 17,["53"] = 17,["54"] = 18,["55"] = 18,["56"] = 18,["58"] = 19,["59"] = 19,["60"] = 19,["62"] = 19,["63"] = 20,["64"] = 21,["65"] = 21,["66"] = 21,["67"] = 18,["68"] = 23,["69"] = 23,["70"] = 23,["71"] = 23,["72"] = 25,["73"] = 26,["74"] = 26,["75"] = 26,["76"] = 26,["77"] = 26,["79"] = 26,["80"] = 26,["81"] = 26,["82"] = 27,["83"] = 27,["84"] = 25,["85"] = 29,["86"] = 30,["87"] = 30,["88"] = 30,["89"] = 30,["90"] = 30,["92"] = 30,["93"] = 30,["94"] = 31,["95"] = 31,["96"] = 29,["97"] = 33,["98"] = 33,["99"] = 33,["100"] = 34,["101"] = 34,["102"] = 34,["103"] = 34,["104"] = 34,["105"] = 34,["106"] = 34});
local ____exports = {}
--- 阶段持有全部计时器和监听器；退出后使晚到的回调失效。
____exports.CGameStateBase = __TS__Class()
local CGameStateBase = ____exports.CGameStateBase
CGameStateBase.name = "CGameStateBase"
function CGameStateBase.prototype.____constructor(self)
    self.timeStart = GameRules:GetGameTime()
    self.disposed = false
    self.timers = {}
    self.cleanup = {}
end
function CGameStateBase.prototype.dispose(self)
    if self.disposed then
        return
    end
    self.disposed = true
    self:StopTimer()
    local failures = {}
    do
        local i = #self.cleanup - 1
        while i >= 0 do
            do
                local function ____catch(reason)
                    failures[#failures + 1] = tostring(reason)
                end
                local ____try, ____hasReturned = pcall(function()
                    local ____self_0 = self.cleanup
                    ____self_0[i + 1](____self_0)
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            i = i - 1
        end
    end
    self.cleanup = {}
    if #failures > 0 then
        error(
            table.concat(failures, "; "),
            0
        )
    end
end
function CGameStateBase.prototype.OnStateStart(self)
end
function CGameStateBase.prototype.OnStateEnd(self)
end
function CGameStateBase.prototype.StartThink(self, interval, callback, realTime)
    if realTime == nil then
        realTime = false
    end
    local function guarded()
        if not self.disposed then
            return callback(nil)
        end
    end
    local id = realTime and Timer:Timer(interval, guarded) or Timer:GameTimer(interval, guarded)
    local ____self_timers_1 = self.timers
    ____self_timers_1[#____self_timers_1 + 1] = id
    return id
end
function CGameStateBase.prototype.Own(self, cleanup)
    local ____self_cleanup_2 = self.cleanup
    ____self_cleanup_2[#____self_cleanup_2 + 1] = cleanup
end
function CGameStateBase.prototype.Listen(self, name, callback)
    local id = ListenToGameEvent(
        name,
        function(event)
            if not self.disposed then
                callback(nil, event)
            end
        end,
        nil
    )
    self:Own(function() return StopListeningToGameEvent(id) end)
    return id
end
function CGameStateBase.prototype.Register(self, eventName, callback)
    local id = Event:Register(
        eventName,
        function(____, data)
            if not self.disposed then
                callback(nil, data)
            end
        end
    )
    self:Own(function() return Event:Unregister(id) end)
    return id
end
function CGameStateBase.prototype.GetName(self)
    return self.constructor.name
end
function CGameStateBase.prototype.StopTimer(self)
    __TS__ArrayForEach(
        self.timers,
        function(____, id) return Timer:StopTimer(id) end
    )
    self.timers = {}
end
return ____exports
