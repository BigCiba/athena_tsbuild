local __TSTL_FILE_PATH__ = "override/CDOTA_Buff"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 74,["5"] = 75,["6"] = 75,["8"] = 77,["9"] = 79,["10"] = 79,["11"] = 79,["12"] = 79,["14"] = 79,["16"] = 80,["17"] = 81,["18"] = 81,["20"] = 82,["21"] = 84,["22"] = 85,["24"] = 88,["25"] = 88,["27"] = 90,["28"] = 74,["29"] = 92,["30"] = 93,["31"] = 93,["33"] = 95,["34"] = 97,["35"] = 97,["36"] = 97,["37"] = 97,["39"] = 97,["41"] = 98,["42"] = 92,["43"] = 100,["44"] = 101,["45"] = 101,["46"] = 101,["47"] = 101,["48"] = 101,["49"] = 101,["50"] = 100,["51"] = 103,["52"] = 104,["54"] = 106,["55"] = 107,["56"] = 108,["58"] = 110,["60"] = 106,["61"] = 113,["62"] = 114,["64"] = 116,["65"] = 117,["66"] = 118,["68"] = 120,["70"] = 116,["71"] = 123,["72"] = 124,["73"] = 127,["74"] = 128,["75"] = 129,["77"] = 132,["78"] = 132,["79"] = 132,["81"] = 132,["82"] = 133,["83"] = 134,["85"] = 137,["86"] = 138,["87"] = 139,["88"] = 141,["92"] = 146,["93"] = 147,["95"] = 149,["96"] = 149,["97"] = 149,["98"] = 149,["99"] = 150,["100"] = 151,["101"] = 152,["102"] = 153,["103"] = 154,["105"] = 157,["106"] = 158,["107"] = 160,["109"] = 149,["110"] = 149,["111"] = 163,["113"] = 123,["114"] = 166,["115"] = 166,["116"] = 166,["118"] = 167,["121"] = 170,["124"] = 173,["127"] = 176,["128"] = 177,["130"] = 179,["131"] = 180,["133"] = 182,["134"] = 183,["136"] = 185,["137"] = 186,["138"] = 187,["139"] = 188,["140"] = 189,["141"] = 190,["142"] = 191,["143"] = 192,["144"] = 193,["145"] = 194,["146"] = 195,["148"] = 197,["150"] = 199,["151"] = 200,["152"] = 201,["153"] = 202,["155"] = 205,["156"] = 206,["162"] = 214,["163"] = 215,["164"] = 217,["165"] = 218,["166"] = 220,["167"] = 221,["170"] = 224,["172"] = 227,["173"] = 233,["174"] = 234,["175"] = 234,["176"] = 234,["177"] = 234,["178"] = 235,["181"] = 236,["182"] = 237,["183"] = 238,["184"] = 239,["185"] = 240,["186"] = 241,["188"] = 243,["189"] = 244,["191"] = 246,["192"] = 247,["194"] = 234,["195"] = 234,["197"] = 166,["198"] = 252,["199"] = 253,["202"] = 256,["205"] = 259,["206"] = 260,["207"] = 261,["208"] = 262,["209"] = 263,["210"] = 264,["211"] = 265,["212"] = 266,["213"] = 267,["214"] = 268,["215"] = 269,["218"] = 272,["219"] = 273,["220"] = 274,["221"] = 275,["223"] = 277,["224"] = 278,["225"] = 279,["227"] = 281,["231"] = 285,["232"] = 286,["233"] = 287,["234"] = 287,["235"] = 287,["236"] = 287,["237"] = 288,["240"] = 289,["241"] = 290,["242"] = 291,["243"] = 292,["244"] = 293,["245"] = 294,["247"] = 296,["248"] = 297,["250"] = 299,["251"] = 300,["253"] = 287,["254"] = 287,["256"] = 304,["259"] = 307,["260"] = 308,["261"] = 309,["262"] = 310,["264"] = 252});
CDOTA_Buff.GetAbilitySpecialValueFor = function(self, sKey, unit)
    if not IsValid(self) then
        return 0
    end
    local ability = self.ability or self:GetAbility()
    if not IsValid(ability) then
        local ____self_sKey_0 = self[sKey]
        if ____self_sKey_0 == nil then
            ____self_sKey_0 = 0
        end
        return ____self_sKey_0
    end
    local level = ability:GetLevel() - 1
    if level == -1 then
        return 0
    end
    local caster = unit or ability:GetCaster()
    if not IsValid(caster) then
        caster = self:GetCaster()
    end
    if not IsValid(caster) then
        return 0
    end
    return ability:GetSpecialValueFor(sKey, caster)
end
CDOTA_Buff.GetAbilityLevelSpecialValueFor = function(self, sKey, iLevel)
    if not IsValid(self) then
        return 0
    end
    local ability = self.ability or self:GetAbility()
    if not IsValid(ability) then
        local ____self_sKey_1 = self[sKey]
        if ____self_sKey_1 == nil then
            ____self_sKey_1 = 0
        end
        return ____self_sKey_1
    end
    return ability:GetLevelSpecialValueFor(sKey, iLevel)
end
CDOTA_Buff.PRD = function(self, chance, pseudo_random_recording)
    return PRD(
        nil,
        self:GetCaster(),
        chance,
        pseudo_random_recording or self:GetName()
    )
end
if CDOTA_Buff.IncrementStackCount_Engine == nil then
    CDOTA_Buff.IncrementStackCount_Engine = CDOTA_Buff.IncrementStackCount
end
CDOTA_Buff.IncrementStackCount = function(self, iStackCount)
    if iStackCount == nil then
        self:IncrementStackCount_Engine()
    else
        self:SetStackCount(self:GetStackCount() + iStackCount)
    end
end
if CDOTA_Buff.DecrementStackCount_Engine == nil then
    CDOTA_Buff.DecrementStackCount_Engine = CDOTA_Buff.DecrementStackCount
end
CDOTA_Buff.DecrementStackCount = function(self, iStackCount)
    if iStackCount == nil then
        self:DecrementStackCount_Engine()
    else
        self:SetStackCount(self:GetStackCount() - iStackCount)
    end
end
CDOTA_Buff.StartThink = function(self, interval, name, callback)
    if IsServer() then
        if type(name) == "function" and callback == nil then
            callback = name
            name = nil
        end
        local ____name_2 = name
        if ____name_2 == nil then
            ____name_2 = DoUniqueString("StartThink")
        end
        local timerName = ____name_2
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
    end
end
CDOTA_Buff.AddStackCountDuration = function(self, iStackCount, fDuration, iMaxAddStack, callback)
    if iMaxAddStack == nil then
        iMaxAddStack = -1
    end
    if type(iStackCount) ~= "number" then
        return
    end
    if iStackCount <= 0 then
        return
    end
    if fDuration <= 0 then
        return
    end
    if self.__dynamicStack == nil then
        self.__dynamicStack = 0
    end
    if self.__dynamicStackData == nil then
        self.__dynamicStackData = {}
    end
    if iMaxAddStack > 0 then
        iStackCount = math.min(iStackCount, iMaxAddStack)
    end
    local originalStack = self:GetStackCount() - self.__dynamicStack
    local newStack = self.__dynamicStack + iStackCount
    if iMaxAddStack > 0 and newStack > iMaxAddStack then
        local iOverflowStack = newStack - iMaxAddStack
        while #self.__dynamicStackData > 0 do
            local t = self.__dynamicStackData[1]
            if iOverflowStack > t.StackCount then
                newStack = newStack - t.StackCount
                iOverflowStack = iOverflowStack - t.StackCount
                if t.callback ~= nil then
                    t:callback(t.StackCount)
                end
                table.remove(self.__dynamicStackData, 1)
            else
                newStack = newStack - iOverflowStack
                t.StackCount = t.StackCount - iOverflowStack
                if t.callback ~= nil then
                    t:callback(iOverflowStack)
                end
                if t.StackCount == 0 then
                    table.remove(self.__dynamicStackData, 1)
                end
                break
            end
        end
    end
    self.__dynamicStack = newStack
    self:SetStackCount(originalStack + self.__dynamicStack)
    local dieTime = GameRules:GetGameTime() + fDuration
    local index = #self.__dynamicStackData + 1
    for i = #self.__dynamicStackData, 1, -1 do
        if dieTime >= self.__dynamicStackData[i].DieTime then
            break
        end
        index = i
    end
    table.insert(self.__dynamicStackData, index, {DieTime = dieTime, StackCount = iStackCount, callback = callback})
    if #self.__dynamicStackData == 1 then
        self:GetParent():GameTimer(
            self:GetName() .. "_StackCountTimer",
            fDuration,
            function()
                if not IsValid(self) then
                    return
                end
                local gameTime = GameRules:GetGameTime()
                while #self.__dynamicStackData > 0 and gameTime >= self.__dynamicStackData[1].DieTime do
                    local originalStack = self:GetStackCount() - self.__dynamicStack
                    self.__dynamicStack = self.__dynamicStack - self.__dynamicStackData[1].StackCount
                    if self.__dynamicStackData[1].callback ~= nil then
                        self.__dynamicStackData[1]:callback(self.__dynamicStackData[1].StackCount)
                    end
                    self:SetStackCount(originalStack + self.__dynamicStack)
                    table.remove(self.__dynamicStackData, 1)
                end
                if #self.__dynamicStackData > 0 then
                    return self.__dynamicStackData[1].DieTime - gameTime
                end
            end
        )
    end
end
CDOTA_Buff.RemoveStackCountDuration = function(self, iStackCount)
    if iStackCount <= 0 then
        return
    end
    if self.__dynamicStackData == nil then
        return
    end
    local removedStackCount = 0
    local newDuration
    local gameTime = GameRules:GetGameTime()
    while #self.__dynamicStackData > 0 and iStackCount > 0 do
        local t = self.__dynamicStackData[1]
        if t.StackCount > iStackCount then
            t.StackCount = t.StackCount - iStackCount
            removedStackCount = removedStackCount + iStackCount
            iStackCount = 0
            if t.callback ~= nil then
                t:callback(iStackCount)
            end
        else
            removedStackCount = removedStackCount + t.StackCount
            iStackCount = iStackCount - t.StackCount
            if t.callback ~= nil then
                t:callback(t.StackCount)
            end
            table.remove(self.__dynamicStackData, 1)
            if #self.__dynamicStackData > 0 then
                newDuration = self.__dynamicStackData[1].DieTime - gameTime
            else
                newDuration = -1
            end
        end
    end
    if newDuration ~= nil then
        if newDuration > 0 then
            self:GetParent():GameTimer(
                self:GetName() .. "_StackCountTimer",
                newDuration,
                function()
                    if not IsValid(self) then
                        return
                    end
                    local gameTime = GameRules:GetGameTime()
                    while #self.__dynamicStackData > 0 and gameTime >= self.__dynamicStackData[1].DieTime do
                        local originalStack = self:GetStackCount() - self.__dynamicStack
                        self.__dynamicStack = self.__dynamicStack - self.__dynamicStackData[1].StackCount
                        if self.__dynamicStackData[1].callback ~= nil then
                            self.__dynamicStackData[1]:callback(self.__dynamicStackData[1].StackCount)
                        end
                        self:SetStackCount(originalStack + self.__dynamicStack)
                        table.remove(self.__dynamicStackData, 1)
                    end
                    if #self.__dynamicStackData > 0 then
                        return self.__dynamicStackData[1].DieTime - gameTime
                    end
                end
            )
        else
            self:GetParent():StopTimer(self:GetName() .. "_StackCountTimer")
        end
    end
    if removedStackCount > 0 then
        local originalStack = self:GetStackCount() - self.__dynamicStack
        self.__dynamicStack = self.__dynamicStack - removedStackCount
        self:SetStackCount(originalStack + self.__dynamicStack)
    end
end
