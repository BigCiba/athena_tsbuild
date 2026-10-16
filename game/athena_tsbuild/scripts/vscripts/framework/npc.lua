local __TSTL_FILE_PATH__ = "framework/npc"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["14"] = 4,["15"] = 5,["16"] = 4,["17"] = 5,["19"] = 5,["20"] = 6,["21"] = 8,["22"] = 4,["23"] = 9,["24"] = 10,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 11,["29"] = 11,["30"] = 12,["31"] = 12,["32"] = 12,["33"] = 12,["34"] = 12,["36"] = 12,["37"] = 12,["38"] = 12,["39"] = 13,["40"] = 13,["41"] = 13,["42"] = 13,["43"] = 13,["44"] = 14,["45"] = 14,["46"] = 14,["47"] = 15,["48"] = 15,["49"] = 15,["50"] = 15,["51"] = 16,["52"] = 16,["54"] = 14,["55"] = 14,["56"] = 14,["57"] = 9,["58"] = 19,["59"] = 20,["60"] = 20,["61"] = 20,["62"] = 20,["63"] = 20,["64"] = 20,["65"] = 20,["66"] = 20,["67"] = 21,["68"] = 21,["70"] = 22,["71"] = 22,["72"] = 22,["73"] = 22,["74"] = 22,["75"] = 22,["76"] = 22,["77"] = 23,["78"] = 24,["79"] = 25,["80"] = 26,["81"] = 19,["82"] = 28,["83"] = 29,["84"] = 30,["87"] = 31,["88"] = 28,["89"] = 33,["90"] = 34,["93"] = 35,["94"] = 36,["95"] = 37,["96"] = 37,["97"] = 37,["98"] = 38,["101"] = 39,["102"] = 40,["103"] = 41,["105"] = 42,["106"] = 42,["108"] = 43,["109"] = 44,["110"] = 44,["112"] = 45,["116"] = 39,["117"] = 48,["118"] = 37,["119"] = 37,["120"] = 33,["121"] = 51,["122"] = 51,["123"] = 51,["125"] = 51,["126"] = 51,["127"] = 52,["128"] = 53,["129"] = 53,["132"] = 54,["133"] = 54,["135"] = 55,["136"] = 56,["137"] = 56,["139"] = 57,["140"] = 57,["142"] = 58,["143"] = 59,["144"] = 60,["145"] = 60,["146"] = 60,["148"] = 62,["151"] = 54,["154"] = 64,["155"] = 52,["156"] = 66,["157"] = 67,["158"] = 68,["159"] = 68,["160"] = 68,["161"] = 68,["162"] = 68,["163"] = 68,["166"] = 69,["167"] = 66,["168"] = 4,["169"] = 5,["170"] = 73,["171"] = 73});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- NPC 实体注册、范围交互与局内清理；不持有任务规则或 DialogEvent 列表。
____exports.CNPC = __TS__Class()
local CNPC = ____exports.CNPC
CNPC.name = "CNPC"
__TS__ClassExtends(CNPC, CModule)
function CNPC.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.units = {}
    self.runId = 0
end
function CNPC.prototype.init(self, reload)
    Event:UnregisterContext(self)
    Event:Register(
        "game_start",
        function(____, event) return self:Start(event.runId) end,
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
        function(____, event) return self:Clear(event.runId) end,
        self
    )
    CustomUIEvent(
        "npc_interact",
        function(____, data)
            local record = __TS__ArrayFind(
                self.units,
                function(____, value) return value.index == data.npc and value.runId == data.runId end
            )
            if record and self.timer then
                self:Interact(data.PlayerID, record)
            end
        end,
        self
    )
end
function CNPC.prototype.CreateNPC(self, name, position, forward, runId)
    local unit = CreateUnitByName(
        name,
        position,
        true,
        nil,
        nil,
        DOTA_TEAM_GOODGUYS
    )
    if not IsValid(unit) then
        error("任务 NPC 创建失败：" .. name, 0)
    end
    local ____self_units_0 = self.units
    ____self_units_0[#____self_units_0 + 1] = {
        unit = unit,
        index = unit:entindex(),
        runId = runId,
        inside = {}
    }
    unit:SetForwardVector(forward)
    unit:AddNewModifier(unit, nil, "modifier_npc", {})
    self:Publish()
    return unit
end
function CNPC.prototype.Interact(self, playerID, record)
    local hero = PlayerResource:GetSelectedHeroEntity(playerID)
    if not IsValid(record.unit) or not IsValid(hero) or not hero:IsRealHero() or not hero:IsAlive() or CalcDistance(hero, record.unit) > 400 then
        return
    end
    Event:Fire("npc_interact", {playerID = playerID, npc = record.unit, runId = record.runId})
end
function CNPC.prototype.Start(self, runId)
    if runId ~= GameState:GetSession().runId or GameState:GetSession().state ~= "GameState_Battle" or self.timer and self.runId == runId then
        return
    end
    self:Stop()
    self.runId = runId
    self.timer = Timer:GameTimer(
        0.2,
        function()
            if not self.timer or self.runId ~= runId or GameState:GetSession().runId ~= runId or GameState:GetSession().state ~= "GameState_Battle" then
                return
            end
            Game:EachPlayer(function(____, playerID)
                local hero = PlayerResource:GetSelectedHeroEntity(playerID)
                for ____, record in ipairs(self.units) do
                    do
                        if record.runId ~= runId then
                            goto __continue19
                        end
                        local inside = IsValid(hero) and hero:IsAlive() and IsValid(record.unit) and CalcDistance(hero, record.unit) <= 400
                        if inside and not record.inside[playerID] then
                            self:Interact(playerID, record)
                        end
                        record.inside[playerID] = inside
                    end
                    ::__continue19::
                end
            end)
            return 0.2
        end
    )
end
function CNPC.prototype.Stop(self)
    if self.timer then
        Timer:StopTimer(self.timer)
    end
    self.timer = nil
end
function CNPC.prototype.Clear(self, runId)
    if runId == self.runId then
        self:Stop()
    end
    do
        local i = #self.units - 1
        while i >= 0 do
            do
                local record = self.units[i + 1]
                if record.runId ~= runId then
                    goto __continue28
                end
                if IsValid(record.unit) then
                    UTIL_Remove(record.unit)
                end
                local current = EntIndexToHScript(record.index)
                if not IsValid(current) or current == record.unit then
                    PropertySystem:CleanupUnitPropertiesByIndex(record.index)
                    StateSystem:CleanupUnitStatesByIndex(record.index)
                    AbilityUpgrade:CleanupUnitUpgrades(record.index)
                end
                __TS__ArraySplice(self.units, i, 1)
            end
            ::__continue28::
            i = i - 1
        end
    end
    self:Publish()
end
function CNPC.prototype.Publish(self)
    local data = {}
    for ____, record in ipairs(self.units) do
        if IsValid(record.unit) then
            data[tostring(record.index)] = {
                name = record.unit:GetUnitName(),
                runId = record.runId
            }
        end
    end
    CustomNetTables:SetTableValue("common", "npcs", data)
end
CNPC = __TS__DecorateLegacy({reloadable}, CNPC)
____exports.CNPC = CNPC
if NPC == nil then
    NPC = __TS__New(____exports.CNPC)
end
return ____exports
