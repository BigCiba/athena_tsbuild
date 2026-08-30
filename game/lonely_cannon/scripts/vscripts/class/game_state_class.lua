local __TSTL_FILE_PATH__ = "class/game_state_class"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 1,["11"] = 11,["12"] = 12,["13"] = 15,["14"] = 16,["15"] = 18,["16"] = 18,["17"] = 18,["18"] = 19,["19"] = 18,["20"] = 18,["21"] = 15,["22"] = 23,["23"] = 23,["24"] = 27,["25"] = 27,["26"] = 30,["27"] = 31,["28"] = 30,["29"] = 33,["30"] = 34,["32"] = 34,["33"] = 34,["34"] = 33,["35"] = 37,["36"] = 38,["37"] = 37,["38"] = 41,["39"] = 42,["40"] = 43,["41"] = 44,["43"] = 41});
local ____exports = {}
____exports.CGameStateBase = __TS__Class()
local CGameStateBase = ____exports.CGameStateBase
CGameStateBase.name = "CGameStateBase"
function CGameStateBase.prototype.____constructor(self)
    self.eventIDList = {}
end
function CGameStateBase.prototype.dispose(self)
    self:StopTimer()
    __TS__ArrayForEach(
        self.eventIDList,
        function(____, id)
            Event:Unregister(id)
        end
    )
end
function CGameStateBase.prototype.OnStateStart(self)
end
function CGameStateBase.prototype.OnStateEnd(self)
end
function CGameStateBase.prototype.StartThink(self, interval, callback)
    self.timerID = Timer:GameTimer(interval, callback)
end
function CGameStateBase.prototype.Register(self, eventName, callback)
    local ____self_eventIDList_0 = self.eventIDList
    local ____temp_1 = #____self_eventIDList_0 + 1
    ____self_eventIDList_0[____temp_1] = Event:Register(eventName, callback)
    return ____temp_1
end
function CGameStateBase.prototype.GetName(self)
    return self.constructor.name
end
function CGameStateBase.prototype.StopTimer(self)
    if self.timerID then
        Timer:StopTimer(self.timerID)
        self.timerID = nil
    end
end
return ____exports
