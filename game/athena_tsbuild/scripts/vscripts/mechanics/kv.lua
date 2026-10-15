local __TSTL_FILE_PATH__ = "mechanics/kv"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 28,["12"] = 28,["13"] = 29,["15"] = 29,["16"] = 30,["17"] = 31,["18"] = 32,["19"] = 33,["20"] = 34,["21"] = 28,["22"] = 35,["23"] = 36,["24"] = 35,["25"] = 39,["26"] = 40,["27"] = 40,["29"] = 41,["31"] = 39,["32"] = 45,["33"] = 46,["34"] = 47,["35"] = 48,["36"] = 49,["37"] = 50,["38"] = 45,["39"] = 53,["40"] = 54,["41"] = 55,["42"] = 56,["44"] = 58,["45"] = 59,["46"] = 60,["47"] = 61,["48"] = 62,["49"] = 63,["51"] = 65,["52"] = 67,["54"] = 70,["55"] = 71,["56"] = 72,["57"] = 73,["58"] = 74,["60"] = 77,["61"] = 53,["62"] = 80,["63"] = 81,["64"] = 82,["65"] = 83,["67"] = 85,["68"] = 80,["69"] = 88,["70"] = 88,["71"] = 88,["73"] = 89,["75"] = 89,["77"] = 89,["78"] = 90,["79"] = 90,["81"] = 91,["82"] = 88,["83"] = 28,["84"] = 99,["85"] = 99});
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
    self.hero_abilities = LoadKeyValues("scripts/npc/kv/abilities/ability_heroes.kv")
    self.items = LoadKeyValues("scripts/npc/npc_items_custom.txt")
end
function MKeyValues.prototype.initPriority(self)
    return 3
end
function MKeyValues.prototype.init(self, reload)
    if reload then
        self:Reload()
    end
    if IsClient() then
    end
end
function MKeyValues.prototype.Reload(self)
    self.abilities = LoadKeyValues("scripts/npc/npc_abilities_custom.txt")
    self.units = LoadKeyValues("scripts/npc/npc_units_custom.txt")
    self.heroes = LoadKeyValues("scripts/npc/npc_heroes_custom.txt")
    self.hero_abilities = LoadKeyValues("scripts/npc/kv/abilities/ability_heroes.kv")
    self.items = LoadKeyValues("scripts/npc/npc_items_custom.txt")
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
