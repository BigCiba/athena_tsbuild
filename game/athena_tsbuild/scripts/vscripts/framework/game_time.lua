local __TSTL_FILE_PATH__ = "framework/game_time"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["16"] = 5,["17"] = 7,["18"] = 8,["19"] = 9,["20"] = 4,["21"] = 10,["22"] = 11,["23"] = 12,["24"] = 12,["25"] = 12,["26"] = 12,["27"] = 12,["28"] = 12,["29"] = 12,["31"] = 12,["32"] = 12,["33"] = 12,["34"] = 13,["35"] = 13,["36"] = 13,["37"] = 13,["38"] = 13,["40"] = 13,["41"] = 13,["42"] = 13,["43"] = 14,["44"] = 14,["45"] = 14,["46"] = 14,["47"] = 14,["49"] = 14,["50"] = 14,["51"] = 14,["52"] = 15,["53"] = 16,["54"] = 17,["55"] = 17,["58"] = 10,["59"] = 20,["60"] = 21,["61"] = 22,["64"] = 23,["65"] = 23,["66"] = 23,["67"] = 24,["68"] = 25,["69"] = 25,["70"] = 25,["71"] = 26,["74"] = 27,["75"] = 28,["76"] = 28,["79"] = 29,["80"] = 30,["81"] = 32,["82"] = 33,["84"] = 34,["85"] = 25,["86"] = 25,["87"] = 20,["88"] = 37,["89"] = 37,["90"] = 37,["91"] = 37,["93"] = 37,["94"] = 37,["95"] = 4,["96"] = 40,["97"] = 40});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 本局唯一秒/分钟时钟；只发布事实，属性成长和玩法分别订阅。
local CGameTime = __TS__Class()
CGameTime.name = "CGameTime"
__TS__ClassExtends(CGameTime, CModule)
function CGameTime.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.tick = 0
    self.generation = 0
end
function CGameTime.prototype.init(self, reload)
    Event:UnregisterContext(self)
    Event:Register(
        "game_start",
        function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId ~= nil then
                self:Start(runId)
            end
        end,
        self
    )
    Event:Register(
        "game_end",
        function(____, event)
            if event.run_id == self.runId then
                self:Stop()
            end
        end,
        self
    )
    Event:Register(
        "game_reset",
        function(____, event)
            if event.runId == self.runId then
                self:Stop()
            end
        end,
        self
    )
    if reload and not self.timer then
        local session = GameState:GetSession()
        if session.state == "GameState_Battle" then
            self:Start(session.runId)
        end
    end
end
function CGameTime.prototype.Start(self, runId)
    local session = GameState:GetSession()
    if session.runId ~= runId or session.state ~= "GameState_Battle" or self.timer and self.runId == runId then
        return
    end
    self:Stop()
    self.runId = runId
    self.tick = 0
    local generation = self.generation
    self.timer = Timer:GameTimer(
        1,
        function()
            if generation ~= self.generation then
                return
            end
            local current = GameState:GetSession()
            if self.runId ~= runId or current.runId ~= runId or current.state ~= "GameState_Battle" then
                self:Stop()
                return
            end
            self.tick = self.tick + 1
            Event:FireUnit("tick_time", {runId = runId, tick = self.tick, tick_time = 1})
            if generation == self.generation and self.timer and self.runId == runId and self.tick % 60 == 0 and GameState:GetSession().state == "GameState_Battle" then
                Event:FireUnit("tick_time", {runId = runId, tick = self.tick, tick_time = 60})
            end
            return generation == self.generation and self.timer and 1 or nil
        end
    )
end
function CGameTime.prototype.Stop(self)
    self.generation = self.generation + 1
    if self.timer then
        Timer:StopTimer(self.timer)
    end
    self.timer = nil
end
CGameTime = __TS__DecorateLegacy({reloadable}, CGameTime)
if GameTime == nil then
    GameTime = __TS__New(CGameTime)
end
return ____exports
