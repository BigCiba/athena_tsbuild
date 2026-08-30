local __TSTL_FILE_PATH__ = "override/CBaseEntity"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 63,["5"] = 64,["6"] = 65,["7"] = 64,["8"] = 67,["9"] = 68,["10"] = 69,["12"] = 71,["13"] = 67,["14"] = 73,["15"] = 74,["16"] = 74,["17"] = 74,["18"] = 74,["20"] = 74,["21"] = 73,["22"] = 76,["23"] = 77,["24"] = 78,["25"] = 79,["26"] = 80,["28"] = 82,["29"] = 76,["30"] = 84,["31"] = 85,["32"] = 86,["33"] = 87,["34"] = 88,["36"] = 90,["37"] = 84,["38"] = 92,["39"] = 93,["40"] = 92,["41"] = 100,["42"] = 101,["43"] = 104,["44"] = 105,["45"] = 106,["47"] = 109,["48"] = 109,["49"] = 109,["51"] = 109,["52"] = 110,["53"] = 111,["55"] = 114,["56"] = 115,["57"] = 116,["58"] = 118,["62"] = 123,["63"] = 124,["65"] = 126,["66"] = 126,["67"] = 126,["68"] = 126,["69"] = 127,["70"] = 128,["71"] = 129,["72"] = 130,["73"] = 131,["75"] = 134,["76"] = 135,["77"] = 137,["79"] = 126,["80"] = 126,["81"] = 140,["82"] = 141,["83"] = 101,["85"] = 149,["86"] = 150,["87"] = 151,["88"] = 152,["89"] = 153,["90"] = 154,["92"] = 156,["93"] = 150,["94"] = 158,["95"] = 159,["96"] = 158});
BaseEntity = IsServer() and CBaseEntity or C_BaseEntity
BaseEntity.IsAbility = function(self)
    return false
end
BaseEntity.SaveData = function(self, key, value)
    if self._saveData_ == nil then
        self._saveData_ = {}
    end
    self._saveData_[key] = value
end
BaseEntity.LoadData = function(self, key, defaultValue)
    local ____opt_0 = self._saveData_
    local ____temp_2 = ____opt_0 and ____opt_0[key]
    if ____temp_2 == nil then
        ____temp_2 = defaultValue
    end
    return ____temp_2
end
BaseEntity.Timer = function(self, sContextName, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = sContextName
        sContextName = DoUniqueString("Timer")
    end
    return Timer:GameTimer(self, fInterval, funcThink)
end
BaseEntity.GameTimer = function(self, sContextName, fInterval, funcThink)
    if funcThink == nil then
        funcThink = fInterval
        fInterval = sContextName
        sContextName = DoUniqueString("GameTimer")
    end
    return self:Timer(sContextName, fInterval, funcThink)
end
BaseEntity.StopTimer = function(self, sContextName)
    Timer:StopTimer(sContextName)
end
if IsServer() then
    CBaseEntity.StartThink = function(self, interval, name, callback)
        if type(name) == "function" and callback == nil then
            callback = name
            name = nil
        end
        local ____name_3 = name
        if ____name_3 == nil then
            ____name_3 = DoUniqueString("StartThink")
        end
        local timerName = ____name_3
        if self._ThinkList == nil then
            self._ThinkList = {}
        end
        if interval == -1 then
            if self._ThinkList[timerName] then
                Timer:StopTimer(self._ThinkList[timerName])
                self._ThinkList[timerName] = nil
            end
            return
        end
        if self._ThinkList[timerName] ~= nil then
            Timer:StopTimer(self._ThinkList[timerName])
        end
        local index = Timer:StartIntervalThink(
            self,
            interval,
            function()
                local result
                if callback ~= nil then
                    result = callback(self, timerName)
                elseif self.OnThink ~= nil then
                    result = self:OnThink(timerName)
                end
                if result == -1 then
                    Timer:StopTimer(self._ThinkList[timerName])
                    self._ThinkList[timerName] = nil
                end
            end
        )
        self._ThinkList[timerName] = index
        return timerName
    end
end
if IsClient() then
    C_BaseEntity.GameTimer = function(self, sContextName, fInterval, funcThink)
        if funcThink == nil then
            funcThink = fInterval
            fInterval = sContextName
            sContextName = DoUniqueString("GameTimer")
        end
        return self:Timer(sContextName, fInterval, funcThink)
    end
    C_BaseEntity.StopTimer = function(self, sContextName)
        self:SetContextThink(sContextName, nil, -1)
    end
end
