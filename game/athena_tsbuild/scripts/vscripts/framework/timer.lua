local __TSTL_FILE_PATH__ = "framework/timer"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__Delete = ____lualib.__TS__Delete
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["14"] = 13,["15"] = 13,["16"] = 14,["18"] = 14,["19"] = 16,["20"] = 17,["21"] = 18,["22"] = 19,["23"] = 20,["24"] = 13,["25"] = 28,["26"] = 29,["27"] = 30,["29"] = 32,["30"] = 33,["31"] = 34,["32"] = 35,["33"] = 36,["34"] = 36,["38"] = 40,["39"] = 41,["41"] = 28,["42"] = 45,["43"] = 46,["44"] = 47,["45"] = 48,["47"] = 45,["48"] = 52,["49"] = 53,["52"] = 56,["55"] = 60,["56"] = 61,["57"] = 62,["58"] = 63,["61"] = 66,["62"] = 67,["63"] = 52,["64"] = 70,["65"] = 71,["66"] = 72,["67"] = 73,["68"] = 74,["69"] = 74,["70"] = 74,["72"] = 74,["74"] = 74,["75"] = 75,["77"] = 76,["78"] = 77,["79"] = 79,["80"] = 80,["82"] = 83,["83"] = 84,["85"] = 87,["86"] = 89,["87"] = 90,["89"] = 92,["90"] = 94,["91"] = 95,["92"] = 96,["93"] = 97,["95"] = 99,["96"] = 100,["97"] = 103,["98"] = 103,["99"] = 103,["100"] = 103,["101"] = 104,["102"] = 106,["104"] = 109,["110"] = 113,["111"] = 70,["112"] = 116,["113"] = 117,["114"] = 118,["115"] = 119,["116"] = 124,["117"] = 125,["118"] = 126,["119"] = 125,["120"] = 128,["122"] = 131,["123"] = 132,["124"] = 132,["125"] = 132,["126"] = 136,["127"] = 137,["128"] = 137,["129"] = 137,["130"] = 138,["131"] = 139,["132"] = 137,["133"] = 137,["134"] = 137,["135"] = 132,["136"] = 132,["137"] = 132,["140"] = 116,["141"] = 147,["142"] = 148,["143"] = 149,["144"] = 149,["145"] = 149,["146"] = 149,["147"] = 150,["148"] = 151,["149"] = 151,["150"] = 151,["151"] = 151,["152"] = 151,["153"] = 151,["154"] = 151,["155"] = 158,["156"] = 158,["157"] = 159,["158"] = 160,["159"] = 147,["160"] = 166,["161"] = 167,["162"] = 168,["163"] = 169,["164"] = 170,["166"] = 172,["167"] = 166,["168"] = 178,["169"] = 179,["170"] = 180,["171"] = 181,["172"] = 182,["174"] = 184,["175"] = 178,["176"] = 188,["177"] = 189,["178"] = 188,["179"] = 193,["180"] = 194,["181"] = 195,["182"] = 193,["183"] = 197,["184"] = 198,["185"] = 199,["186"] = 200,["187"] = 201,["189"] = 197,["190"] = 13,["191"] = 210,["192"] = 210});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 计时器，不会被游戏暂停
local CTimer = __TS__Class()
CTimer.name = "CTimer"
__TS__ClassExtends(CTimer, CModule)
function CTimer.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.index = 1
    self.timerList = {}
    self.activeTimerIds = {}
    self.removedTimerCount = 0
    self.record = 0
end
function CTimer.prototype.EnsureTimerStorage(self)
    if self.timerList == nil then
        self.timerList = {}
    end
    if self.activeTimerIds == nil then
        self.activeTimerIds = {}
        for ____, id in ipairs(__TS__ObjectKeys(self.timerList)) do
            if self.timerList[id] ~= nil then
                local ____self_activeTimerIds_0 = self.activeTimerIds
                ____self_activeTimerIds_0[#____self_activeTimerIds_0 + 1] = id
            end
        end
    end
    if self.removedTimerCount == nil then
        self.removedTimerCount = 0
    end
end
function CTimer.prototype.RemoveTimerById(self, id)
    if self.timerList[id] ~= nil then
        __TS__Delete(self.timerList, id)
        self.removedTimerCount = self.removedTimerCount + 1
    end
end
function CTimer.prototype.CompactActiveTimerIds(self)
    if self.removedTimerCount <= 0 then
        return
    end
    if self.removedTimerCount < 64 and self.removedTimerCount * 2 < #self.activeTimerIds then
        return
    end
    local activeTimerIds = {}
    for ____, id in ipairs(self.activeTimerIds) do
        if self.timerList[id] ~= nil then
            activeTimerIds[#activeTimerIds + 1] = id
        end
    end
    self.activeTimerIds = activeTimerIds
    self.removedTimerCount = 0
end
function CTimer.prototype.Think(self)
    self:EnsureTimerStorage()
    self.record = self.record + 1
    local frame = FrameTime()
    local ____IsServer_result_1
    if IsServer() then
        ____IsServer_result_1 = GameRules:IsGamePaused()
    else
        ____IsServer_result_1 = false
    end
    local isGamePaused = ____IsServer_result_1
    for i = #self.activeTimerIds, 1, -1 do
        do
            local id = self.activeTimerIds[i]
            local timerData = self.timerList[id]
            if timerData == nil then
                goto __continue18
            end
            if isGamePaused and (timerData.type == "GameTimer" or timerData.type == "Modifier") then
                goto __continue18
            end
            if timerData.entity ~= nil and not IsValid(timerData.entity) then
                self:RemoveTimerById(id)
                goto __continue18
            end
            timerData.stack = timerData.stack + frame
            if timerData.stack >= timerData.interval then
                local _, interval = xpcall(timerData.callback, traceback, timerData.entity or self)
                if self.timerList[id] ~= timerData then
                    goto __continue18
                end
                if type(interval) == "number" then
                    timerData.stack = timerData.stack - timerData.interval
                    timerData.interval = math.max(
                        interval,
                        FrameTime()
                    )
                elseif timerData.type == "Modifier" then
                    timerData.stack = timerData.stack - timerData.interval
                else
                    self:RemoveTimerById(id)
                end
            end
        end
        ::__continue18::
    end
    self:CompactActiveTimerIds()
end
function CTimer.prototype.init(self, reload)
    if not reload then
        if IsServer() then
            self.logicTimer = SpawnEntityFromTableSynchronous("logic_timer", {origin = "0 0 0", RefireTime = 0})
            local scope = self.logicTimer:GetOrCreatePrivateScriptScope()
            scope.OnTimer = function()
                self:Think()
            end
            self.logicTimer:RedirectOutput("OnTimer", "OnTimer", self.logicTimer)
        end
        if IsClient() then
            SpawnEntityFromTableAsynchronous(
                "prop_dynamic",
                {origin = "0 0 0", model = "models/development/invisiblebox.vmdl"},
                function(logicTimer)
                    logicTimer:SetContextThink(
                        DoUniqueString("Timer"),
                        function()
                            self:Think()
                            return FrameTime()
                        end,
                        0
                    )
                end,
                nil
            )
        end
    end
end
function CTimer.prototype.StartThink(self, ____type, entity, fInterval, funcThink)
    self:EnsureTimerStorage()
    fInterval = math.max(
        fInterval,
        FrameTime()
    )
    local id = tostring(self.index)
    self.timerList[id] = {
        interval = fInterval,
        stack = 0,
        type = ____type,
        entity = entity,
        callback = funcThink
    }
    local ____self_activeTimerIds_2 = self.activeTimerIds
    ____self_activeTimerIds_2[#____self_activeTimerIds_2 + 1] = id
    self.index = self.index + 1
    return id
end
function CTimer.prototype.Timer(self, entity, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = entity
        entity = nil
    end
    return self:StartThink("Timer", entity, fInterval, funcThink)
end
function CTimer.prototype.GameTimer(self, entity, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = entity
        entity = nil
    end
    return self:StartThink("GameTimer", entity, fInterval, funcThink)
end
function CTimer.prototype.StartIntervalThink(self, modifier, fInterval, funcThink)
    return self:StartThink("Modifier", modifier, fInterval, funcThink)
end
function CTimer.prototype.StopTimer(self, index)
    self:EnsureTimerStorage()
    self:RemoveTimerById(tostring(index))
end
function CTimer.prototype.RestartTimer(self, index)
    self:EnsureTimerStorage()
    local id = tostring(index)
    if self.timerList[id] then
        self.timerList[id].stack = 0
    end
end
CTimer = __TS__DecorateLegacy({reloadable}, CTimer)
if Timer == nil then
    Timer = __TS__New(CTimer)
end
return ____exports
