local __TSTL_FILE_PATH__ = "mechanics/kv"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 28,["12"] = 28,["13"] = 29,["15"] = 29,["16"] = 30,["17"] = 31,["18"] = 32,["19"] = 33,["20"] = 34,["21"] = 28,["22"] = 35,["23"] = 36,["24"] = 35,["25"] = 39,["26"] = 40,["28"] = 39,["29"] = 44,["30"] = 45,["31"] = 46,["32"] = 47,["34"] = 49,["35"] = 50,["36"] = 51,["37"] = 52,["38"] = 53,["39"] = 54,["41"] = 56,["42"] = 58,["44"] = 61,["45"] = 62,["46"] = 63,["47"] = 64,["48"] = 65,["50"] = 68,["51"] = 44,["52"] = 71,["53"] = 72,["54"] = 73,["55"] = 74,["57"] = 76,["58"] = 71,["59"] = 79,["60"] = 79,["61"] = 79,["63"] = 80,["65"] = 80,["67"] = 80,["68"] = 81,["69"] = 81,["71"] = 82,["72"] = 79,["73"] = 28,["74"] = 90,["75"] = 90});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MKeyValues = __TS__Class()
MKeyValues.name = "MKeyValues"
__TS__ClassExtends(MKeyValues, CModule)
function MKeyValues.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.abilities = LoadKeyValues("scripts/npc/npc_abilities_custom.txt")
    self.units = LoadKeyValues("scripts/npc/npc_units_custom.txt")
    self.heroes = LoadKeyValues("scripts/npc/npc_heroes_custom.txt")
    self.hero_abilities = LoadKeyValues("scripts/npc/abilities/hero_abilities.kv")
    self.items = LoadKeyValues("scripts/npc/npc_items_custom.txt")
end
function MKeyValues.prototype.initPriority(self)
    return 3
end
function MKeyValues.prototype.init(self, reload)
    if IsClient() then
    end
end
function MKeyValues.prototype.GetUnitData(self, unit, ...)
    local unitName
    if type(unit) == "number" then
        unit = EntIndexToHScript(unit)
    end
    local kv
    if type(unit) == "table" and IsValid(unit) then
        unitName = unit:GetUnitName()
        kv = self.heroes[unitName] or self.units[unitName]
    elseif type(unit) == "string" then
        kv = self.heroes[unit] or self.units[unit]
    end
    if kv == nil then
        return nil
    end
    local t = {}
    local n = select("#", ...)
    for i = 1, n, 1 do
        local key = select(i, ...)
        t[i] = kv[key]
    end
    return unpack(t, 1, n)
end
function MKeyValues.prototype.GetAttackSoundSet(self, hUnit, tParams)
    local soundSet = (KeyValues:GetUnitData(hUnit, "SoundSet"))
    if type(soundSet) == "string" and soundSet ~= "" then
        return soundSet
    end
    return ""
end
function MKeyValues.prototype.GetKvAbilityValue(self, kv, name, key, level, caster)
    if level == nil then
        level = 1
    end
    local ____opt_0 = kv[name]
    if ____opt_0 ~= nil then
        ____opt_0 = ____opt_0.AbilityValues
    end
    local abilityValues = ____opt_0
    if abilityValues == nil then
        return 0
    end
    return GetAbilityValues(abilityValues[key], level, caster)
end
MKeyValues = __TS__DecorateLegacy({reloadable}, MKeyValues)
if KeyValues == nil then
    KeyValues = __TS__New(MKeyValues)
end
return ____exports
