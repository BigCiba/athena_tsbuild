local __TSTL_FILE_PATH__ = "class/entity_pool"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 7,["12"] = 7,["13"] = 7,["15"] = 7,["16"] = 13,["17"] = 14,["18"] = 15,["19"] = 16,["20"] = 17,["21"] = 18,["22"] = 19,["25"] = 23,["26"] = 24,["28"] = 26,["29"] = 27,["30"] = 13,["31"] = 31,["32"] = 32,["33"] = 33,["34"] = 33,["36"] = 34,["37"] = 34,["39"] = 31,["40"] = 37,["41"] = 38,["44"] = 40,["45"] = 41,["46"] = 42,["47"] = 43,["49"] = 45,["50"] = 46,["53"] = 50,["54"] = 51,["55"] = 52,["56"] = 37,["57"] = 59,["58"] = 60,["59"] = 61,["60"] = 62,["61"] = 63,["63"] = 65,["64"] = 66,["65"] = 66,["66"] = 66,["67"] = 66,["68"] = 70,["69"] = 71,["71"] = 59,["72"] = 76,["73"] = 77,["74"] = 78,["75"] = 79,["76"] = 79,["80"] = 82,["81"] = 76,["82"] = 8,["83"] = 10,["84"] = 11});
local ____exports = {}
--- Reuses visual-only entities instead of repeatedly creating and destroying
-- them during gameplay.  Entries are bucketed by their immutable spawn
--  configuration. Dynamic state is reapplied on every Acquire; immutable
--  state (model, skin, scale and animation) must be part of the pool key.
____exports.EntityPool = __TS__Class()
local EntityPool = ____exports.EntityPool
EntityPool.name = "EntityPool"
function EntityPool.prototype.____constructor(self)
end
function EntityPool.Acquire(self, key, classname, spawnTable)
    local entries = self.entities[key]
    local entity
    while entries ~= nil and #entries > 0 and entity == nil do
        local candidate = table.remove(entries)
        if IsValid(candidate) then
            entity = candidate
        end
    end
    if entity == nil then
        entity = SpawnEntityFromTableSynchronous(classname, spawnTable)
    end
    self:ApplyDynamicState(entity, spawnTable)
    return entity
end
function EntityPool.ApplyDynamicState(self, entity, spawnTable)
    entity:RemoveEffects(EF_NODRAW)
    if spawnTable.origin ~= nil then
        entity:SetAbsOrigin(spawnTable.origin)
    end
    if spawnTable.targetname ~= nil then
        entity:SetEntityName(spawnTable.targetname)
    end
end
function EntityPool.Release(self, key, entity)
    if not IsValid(entity) then
        return
    end
    local entries = self.entities[key]
    if entries == nil then
        entries = {}
        self.entities[key] = entries
    end
    if #entries >= self.MaxInactivePerKey then
        entity:RemoveSelf()
        return
    end
    entity:AddEffects(EF_NODRAW)
    entity:SetAbsOrigin(self.HiddenOrigin)
    entries[#entries + 1] = entity
end
function EntityPool.Prewarm(self, key, classname, spawnTable, count)
    local entries = self.entities[key]
    if entries == nil then
        entries = {}
        self.entities[key] = entries
    end
    while #entries < math.min(count, self.MaxInactivePerKey) do
        local entity = SpawnEntityFromTableSynchronous(
            classname,
            __TS__ObjectAssign({}, spawnTable, {origin = self.HiddenOrigin})
        )
        entity:AddEffects(EF_NODRAW)
        entries[#entries + 1] = entity
    end
end
function EntityPool.Clear(self)
    for key in pairs(self.entities) do
        for ____, entity in ipairs(self.entities[key]) do
            if IsValid(entity) then
                entity:RemoveSelf()
            end
        end
    end
    self.entities = {}
end
EntityPool.HiddenOrigin = Vector(10000, 10000, -10000)
EntityPool.MaxInactivePerKey = 128
EntityPool.entities = {}
return ____exports
