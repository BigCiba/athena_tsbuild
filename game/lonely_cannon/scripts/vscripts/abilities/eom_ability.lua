local __TSTL_FILE_PATH__ = "abilities/eom_ability"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 8,["12"] = 10,["13"] = 11,["14"] = 12,["15"] = 13,["16"] = 14,["17"] = 15,["19"] = 18,["21"] = 19,["22"] = 19,["23"] = 20,["24"] = 21,["27"] = 19,["30"] = 26,["31"] = 27,["33"] = 29,["35"] = 10,["36"] = 33,["37"] = 34,["38"] = 35,["39"] = 36,["40"] = 37,["41"] = 38,["42"] = 39,["44"] = 40,["45"] = 40,["46"] = 41,["47"] = 42,["49"] = 43,["50"] = 43,["51"] = 44,["52"] = 45,["55"] = 43,["58"] = 49,["59"] = 50,["61"] = 40,["65"] = 54,["67"] = 56,["68"] = 33,["74"] = 66,["75"] = 67,["76"] = 68,["77"] = 69,["78"] = 70,["79"] = 71,["80"] = 72,["82"] = 67,["83"] = 66,["84"] = 96,["85"] = 97,["86"] = 98,["87"] = 99,["88"] = 101,["90"] = 103,["92"] = 106,["93"] = 109,["94"] = 111,["95"] = 112,["96"] = 114,["97"] = 115,["98"] = 116,["99"] = 117,["100"] = 118,["101"] = 119,["102"] = 120,["103"] = 121,["104"] = 122,["105"] = 123,["106"] = 124,["107"] = 125,["108"] = 126,["109"] = 127,["110"] = 128,["111"] = 129,["112"] = 130,["113"] = 132,["114"] = 133,["116"] = 134,["117"] = 134,["118"] = 135,["119"] = 136,["120"] = 134,["124"] = 140,["125"] = 141,["126"] = 142,["127"] = 143,["129"] = 145,["132"] = 148,["133"] = 149,["134"] = 150,["136"] = 152,["139"] = 155,["141"] = 156,["142"] = 156,["144"] = 156,["145"] = 157,["149"] = 163,["150"] = 164,["151"] = 165,["153"] = 115,["154"] = 169,["155"] = 170,["156"] = 171,["157"] = 172,["159"] = 173,["160"] = 173,["161"] = 174,["162"] = 175,["163"] = 173,["167"] = 179,["168"] = 180,["170"] = 170,["171"] = 184,["172"] = 185,["173"] = 186,["174"] = 187,["176"] = 188,["177"] = 188,["178"] = 189,["179"] = 190,["180"] = 188,["184"] = 194,["185"] = 195,["187"] = 185,["188"] = 98,["189"] = 96,["190"] = 203,["191"] = 203,["192"] = 203,["193"] = 203,["194"] = 209,["195"] = 209,["196"] = 209,["197"] = 209});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local BaseItem = ____dota_ts_adapter.BaseItem
local toDotaClassInstance = ____dota_ts_adapter.toDotaClassInstance
local AbilityValueRegistry = {}
local function registerAbilityValueEntry(self, ctor, propertyKey, specialValueKey)
    local registryKey = ctor.name or tostring(ctor)
    local list = AbilityValueRegistry[registryKey]
    if list == nil then
        list = {}
        AbilityValueRegistry[registryKey] = list
    end
    local existingIndex = -1
    do
        local i = 0
        while i < #list do
            if list[i + 1].propertyKey == propertyKey then
                existingIndex = i
                break
            end
            i = i + 1
        end
    end
    if existingIndex ~= -1 then
        list[existingIndex + 1].specialValueKey = specialValueKey
    else
        list[#list + 1] = {propertyKey = propertyKey, specialValueKey = specialValueKey}
    end
end
function ____exports.collectAbilityValueEntries(self, ctor)
    local fields = {}
    local current = ctor
    while current ~= nil do
        local registryKey = current.name or tostring(current)
        local list = AbilityValueRegistry[registryKey]
        if list ~= nil then
            do
                local i = 0
                while i < #list do
                    local entry = list[i + 1]
                    local duplicated = false
                    do
                        local j = 0
                        while j < #fields do
                            if fields[j + 1].propertyKey == entry.propertyKey then
                                duplicated = true
                                break
                            end
                            j = j + 1
                        end
                    end
                    if not duplicated then
                        fields[#fields + 1] = entry
                    end
                    i = i + 1
                end
            end
        end
        current = current.____super
    end
    return fields
end
--- Ability 数值装饰器：
-- - 收集被装饰字段
-- - 统一通过 this.GetSpecialValueFor("xxx") 读取
-- - 支持modifier 统一通过 this.GetAbilitySpecialValueFor("xxx") 读取
-- - 支持可选别名：@AbilityValue("duration")
function ____exports.AbilityValue(self, specialValueKey)
    return function(____, target, propertyKey)
        local propertyName = propertyKey
        local kvKey = specialValueKey or propertyName
        local ctor = target.constructor
        if ctor ~= nil then
            registerAbilityValueEntry(nil, ctor, propertyName, kvKey)
        end
    end
end
____exports.registerEOMAbility = function(____, param)
    local name = param and param.name
    return function(____, ability)
        if name ~= nil then
            ability.name = name
        else
            name = ability.name
        end
        local env = _G
        env[name] = {}
        toDotaClassInstance(nil, env[name], ability)
        local abilityValueEntries = ____exports.collectAbilityValueEntries(nil, ability)
        local originalSpawn = env[name].Spawn
        env[name].Spawn = function(self)
            self.__AbilityValueEntries = abilityValueEntries
            self.behavior = param and param.behavior
            self.searchBehavior = param and param.searchBehavior or AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE
            self.aoeRadius = param and param.aoeRadius
            self.startWidth = param and param.startWidth
            self.endWidth = param and param.endWidth
            self.targetTeam = param and param.targetTeam
            self.targetType = param and param.targetType
            self.targetFlags = param and param.targetFlags
            self.funcSortFunction = param and param.funcSortFunction
            self.funcCondition = param and param.funcCondition
            self.funcUnitsCallback = param and param.funcUnitsCallback
            self.isNotPassive = param and param.isNotPassive
            self.orderType = param and param.orderType or FIND_ANY_ORDER
            EntityConstructor(self)
            self.__AbilityValueEntries = abilityValueEntries
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetSpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if IsServer() then
                if (param and param.startLevel) ~= nil then
                    if type(param.startLevel) == "function" then
                        self:SetLevel(param:startLevel(self))
                    else
                        self:SetLevel(param.startLevel)
                    end
                end
                if (param and param.startCooldown) ~= nil then
                    if type(param.startCooldown) == "function" then
                        self:StartCooldown(param:startCooldown(self))
                    else
                        self:StartCooldown(param.startCooldown)
                    end
                else
                    local kv = KeyValues.abilities[self:GetAbilityName()]
                    local ____opt_result_34
                    if kv ~= nil then
                        ____opt_result_34 = kv.AbilityStartCooldown
                    end
                    if ____opt_result_34 ~= nil then
                        self:StartCooldown(toFiniteNumber(kv.AbilityStartCooldown, 1))
                    end
                end
            end
            self:____constructor()
            if originalSpawn then
                originalSpawn(self)
            end
        end
        local originalOnUpgrade = env[name].OnUpgrade
        env[name].OnUpgrade = function(self)
            self.__AbilityValueEntries = abilityValueEntries
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetSpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if originalOnUpgrade ~= nil then
                originalOnUpgrade(self)
            end
        end
        local originalOnSpellStart = env[name].OnSpellStart
        env[name].OnSpellStart = function(self)
            self.__AbilityValueEntries = abilityValueEntries
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetSpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if originalOnSpellStart ~= nil then
                originalOnSpellStart(self)
            end
        end
    end
end
____exports.EOMAbility = __TS__Class()
local EOMAbility = ____exports.EOMAbility
EOMAbility.name = "EOMAbility"
__TS__ClassExtends(EOMAbility, BaseAbility)
____exports.EOMItem = __TS__Class()
local EOMItem = ____exports.EOMItem
EOMItem.name = "EOMItem"
__TS__ClassExtends(EOMItem, BaseItem)
return ____exports
