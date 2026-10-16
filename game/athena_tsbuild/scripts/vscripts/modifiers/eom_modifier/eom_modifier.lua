local __TSTL_FILE_PATH__ = "modifiers/eom_modifier/eom_modifier"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Number = ____lualib.__TS__Number
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 2,["13"] = 2,["14"] = 2,["15"] = 2,["16"] = 2,["17"] = 2,["18"] = 4,["19"] = 6,["20"] = 7,["21"] = 8,["22"] = 9,["23"] = 10,["24"] = 11,["26"] = 13,["27"] = 14,["29"] = 6,["30"] = 18,["31"] = 19,["32"] = 20,["33"] = 21,["34"] = 22,["35"] = 23,["36"] = 24,["37"] = 25,["38"] = 26,["39"] = 27,["43"] = 31,["45"] = 33,["46"] = 18,["48"] = 39,["49"] = 40,["50"] = 41,["51"] = 42,["52"] = 43,["54"] = 40,["55"] = 39,["56"] = 80,["57"] = 80,["58"] = 80,["60"] = 81,["62"] = 83,["63"] = 84,["64"] = 85,["65"] = 87,["67"] = 89,["69"] = 92,["70"] = 93,["71"] = 95,["72"] = 96,["73"] = 98,["74"] = 99,["75"] = 100,["76"] = 101,["77"] = 102,["78"] = 103,["80"] = 105,["81"] = 106,["83"] = 108,["84"] = 109,["86"] = 111,["87"] = 112,["90"] = 116,["92"] = 119,["93"] = 120,["94"] = 121,["95"] = 122,["96"] = 123,["97"] = 124,["98"] = 125,["99"] = 126,["100"] = 127,["101"] = 128,["102"] = 129,["103"] = 130,["104"] = 131,["106"] = 133,["108"] = 134,["109"] = 134,["110"] = 135,["111"] = 136,["112"] = 134,["116"] = 139,["117"] = 140,["119"] = 142,["120"] = 143,["122"] = 145,["123"] = 146,["125"] = 123,["126"] = 149,["127"] = 150,["128"] = 151,["129"] = 152,["130"] = 153,["132"] = 154,["133"] = 154,["134"] = 155,["135"] = 156,["136"] = 154,["140"] = 159,["141"] = 160,["143"] = 162,["144"] = 163,["146"] = 165,["147"] = 166,["149"] = 150,["150"] = 169,["151"] = 170,["152"] = 171,["154"] = 172,["155"] = 172,["156"] = 173,["157"] = 174,["158"] = 172,["162"] = 177,["163"] = 178,["165"] = 180,["166"] = 181,["168"] = 183,["169"] = 184,["171"] = 170,["172"] = 187,["173"] = 188,["174"] = 189,["175"] = 190,["177"] = 192,["178"] = 193,["180"] = 188,["181"] = 196,["182"] = 197,["183"] = 243,["184"] = 244,["186"] = 246,["187"] = 197,["188"] = 255,["189"] = 256,["190"] = 257,["191"] = 258,["192"] = 257,["195"] = 263,["196"] = 264,["197"] = 265,["198"] = 266,["199"] = 266,["200"] = 266,["202"] = 266,["204"] = 266,["205"] = 267,["206"] = 268,["208"] = 270,["209"] = 271,["211"] = 273,["212"] = 265,["213"] = 275,["214"] = 276,["215"] = 277,["216"] = 278,["217"] = 279,["218"] = 281,["219"] = 282,["220"] = 283,["221"] = 284,["222"] = 285,["225"] = 288,["226"] = 289,["227"] = 290,["233"] = 296,["234"] = 297,["236"] = 276,["238"] = 303,["239"] = 304,["240"] = 306,["241"] = 307,["243"] = 309,["244"] = 310,["245"] = 311,["247"] = 313,["248"] = 315,["249"] = 316,["250"] = 317,["251"] = 318,["252"] = 319,["253"] = 318,["255"] = 322,["256"] = 323,["257"] = 322,["263"] = 306,["264"] = 330,["265"] = 331,["266"] = 332,["268"] = 334,["269"] = 335,["270"] = 336,["272"] = 339,["273"] = 340,["274"] = 341,["276"] = 342,["277"] = 342,["278"] = 343,["279"] = 344,["281"] = 345,["282"] = 345,["283"] = 346,["284"] = 347,["287"] = 345,["290"] = 351,["291"] = 352,["293"] = 342,["296"] = 355,["297"] = 340,["299"] = 359,["300"] = 360,["302"] = 84,["303"] = 80,["304"] = 377,["305"] = 377,["306"] = 377,["307"] = 377,["308"] = 393,["309"] = 394,["312"] = 398,["313"] = 399,["314"] = 400,["315"] = 401,["316"] = 402,["317"] = 403,["318"] = 404,["319"] = 404,["321"] = 404,["322"] = 405,["323"] = 406,["326"] = 393,["327"] = 412,["328"] = 413,["329"] = 413,["330"] = 413,["332"] = 413,["333"] = 412,["334"] = 416,["335"] = 417,["338"] = 418,["339"] = 418,["340"] = 419,["341"] = 419,["342"] = 420,["343"] = 420,["344"] = 420,["347"] = 421,["348"] = 422,["349"] = 423,["350"] = 423,["351"] = 423,["352"] = 423,["353"] = 423,["354"] = 423,["355"] = 423,["356"] = 424,["357"] = 424,["359"] = 416,["360"] = 429,["361"] = 430,["364"] = 431,["365"] = 431,["366"] = 432,["367"] = 432,["368"] = 433,["369"] = 433,["370"] = 433,["373"] = 434,["374"] = 435,["375"] = 436,["376"] = 436,["377"] = 436,["378"] = 436,["379"] = 436,["380"] = 436,["381"] = 436,["382"] = 437,["383"] = 437,["385"] = 429,["386"] = 441,["387"] = 442,["390"] = 444,["391"] = 445,["392"] = 446,["393"] = 447,["394"] = 448,["395"] = 449,["396"] = 450,["397"] = 451,["398"] = 451,["400"] = 451,["401"] = 452,["402"] = 453,["406"] = 457,["407"] = 458,["408"] = 459,["409"] = 461,["410"] = 462,["411"] = 463,["412"] = 463,["414"] = 464,["415"] = 466,["416"] = 466,["417"] = 466,["418"] = 466,["419"] = 466,["420"] = 466,["424"] = 470,["425"] = 441,["426"] = 472,["427"] = 473,["430"] = 475,["431"] = 476,["432"] = 477,["433"] = 478,["434"] = 472,["435"] = 480,["436"] = 481,["439"] = 483,["440"] = 484,["441"] = 485,["442"] = 486,["443"] = 480,["444"] = 489,["445"] = 490,["448"] = 491,["449"] = 492,["450"] = 492,["452"] = 489,["453"] = 494,["454"] = 495,["455"] = 497,["456"] = 498,["457"] = 501,["458"] = 502,["459"] = 503,["460"] = 504,["461"] = 505,["462"] = 506,["465"] = 510,["466"] = 510,["468"] = 512,["469"] = 513,["470"] = 514,["471"] = 515,["473"] = 517,["476"] = 520,["477"] = 494,["478"] = 524,["479"] = 524,["480"] = 524,["481"] = 524,["482"] = 527,["483"] = 527,["484"] = 527,["485"] = 527,["486"] = 530,["487"] = 530,["488"] = 530,["489"] = 530});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local collectAbilityValueEntries = ____eom_ability.collectAbilityValueEntries
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseModifier = ____dota_ts_adapter.BaseModifier
local BaseModifierMotionBoth = ____dota_ts_adapter.BaseModifierMotionBoth
local BaseModifierMotionHorizontal = ____dota_ts_adapter.BaseModifierMotionHorizontal
local BaseModifierMotionVertical = ____dota_ts_adapter.BaseModifierMotionVertical
local toDotaClassInstance = ____dota_ts_adapter.toDotaClassInstance
local TransmitterDataRegistry = {}
local function registerTransmitterData(self, ctor, propertyKey)
    local key = ctor.name or tostring(ctor)
    local list = TransmitterDataRegistry[key]
    if list == nil then
        list = {}
        TransmitterDataRegistry[key] = list
    end
    if not __TS__ArrayIncludes(list, propertyKey) then
        list[#list + 1] = propertyKey
    end
end
local function collectTransmitterDataEntries(self, ctor)
    local fields = {}
    local current = ctor
    while current ~= nil do
        local key = current.name or tostring(current)
        local list = TransmitterDataRegistry[key]
        if list ~= nil then
            for ____, name in ipairs(list) do
                if not __TS__ArrayIncludes(fields, name) then
                    fields[#fields + 1] = name
                end
            end
        end
        current = current.____super
    end
    return fields
end
--- Modifier 客户端同步数据装饰器
function ____exports.TransmitterData(self)
    return function(____, target, propertyKey)
        local constructor = target.constructor
        if constructor ~= nil then
            registerTransmitterData(nil, constructor, propertyKey)
        end
    end
end
____exports.registerEOMModifier = function(self, param)
    if param == nil then
        param = {}
    end
    local name = param and param.name
    --- NOTE:tstl的插件会将this改为当前文件路径
    local fileName = self
    return function(____, modifier)
        if name ~= nil then
            modifier.name = name
        else
            name = modifier.name
        end
        local env = _G
        env[name] = {}
        toDotaClassInstance(nil, env[name], modifier)
        local abilityValueEntries = collectAbilityValueEntries(nil, modifier)
        local isEOMModifier = false
        local ____type = LUA_MODIFIER_MOTION_NONE
        local base = modifier.____super
        while base do
            if not isEOMModifier and (base == ____exports.EOMModifier or base == ____exports.EOMModifierMotionBoth or base == ____exports.EOMModifierMotionHorizontal or base == ____exports.EOMModifierMotionVertical) then
                isEOMModifier = true
            end
            if base == ____exports.EOMModifierMotionBoth or base == BaseModifierMotionBoth then
                ____type = LUA_MODIFIER_MOTION_BOTH
                break
            elseif base == ____exports.EOMModifierMotionHorizontal or base == BaseModifierMotionHorizontal then
                ____type = LUA_MODIFIER_MOTION_HORIZONTAL
                break
            elseif base == ____exports.EOMModifierMotionVertical or base == BaseModifierMotionVertical then
                ____type = LUA_MODIFIER_MOTION_VERTICAL
                break
            end
            base = base.____super
        end
        local classType = env[name]
        local transmitterDataFields = collectTransmitterDataEntries(nil, modifier)
        local originalGetAbilitySpecialValue = classType.GetAbilitySpecialValue
        local originalOnCreated = classType.OnCreated
        classType.OnCreated = function(self, parameters)
            self:____constructor()
            self.__AbilityValueEntries = abilityValueEntries
            self.parent = self:GetParent()
            self.caster = self:GetCaster()
            self.ability = self:GetAbility()
            self.name = name
            if #transmitterDataFields > 0 and IsServer() then
                self:SetHasCustomTransmitterData(true)
            end
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetAbilitySpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnCreated ~= nil then
                originalOnCreated(self, parameters)
            end
            if isEOMModifier and originalOnCreated ~= ____exports.EOMModifier.prototype.OnCreated then
                ____exports.EOMModifier.prototype.OnCreated(self, parameters)
            end
        end
        local originalOnRefresh = classType.OnRefresh
        classType.OnRefresh = function(self, parameters)
            self.caster = self:GetCaster()
            self.ability = self:GetAbility()
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetAbilitySpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnRefresh ~= nil then
                originalOnRefresh(self, parameters)
            end
            if isEOMModifier and originalOnRefresh ~= ____exports.EOMModifier.prototype.OnRefresh then
                ____exports.EOMModifier.prototype.OnRefresh(self, parameters)
            end
        end
        local originalOnStackCountChanged = classType.OnStackCountChanged
        classType.OnStackCountChanged = function(self, parameters)
            if self.__AbilityValueEntries ~= nil then
                do
                    local i = 0
                    while i < #self.__AbilityValueEntries do
                        local entry = self.__AbilityValueEntries[i + 1]
                        self[entry.propertyKey] = self:GetAbilitySpecialValueFor(entry.specialValueKey)
                        i = i + 1
                    end
                end
            end
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnStackCountChanged ~= nil then
                originalOnStackCountChanged(self, parameters)
            end
            if isEOMModifier and originalOnStackCountChanged ~= ____exports.EOMModifier.prototype.OnStackCountChanged then
                ____exports.EOMModifier.prototype.OnStackCountChanged(self, parameters)
            end
        end
        local originalOnDestroy = classType.OnDestroy
        classType.OnDestroy = function(self)
            if originalOnDestroy ~= nil then
                originalOnDestroy(self)
            end
            if isEOMModifier and originalOnDestroy ~= ____exports.EOMModifier.prototype.OnDestroy then
                ____exports.EOMModifier.prototype.OnDestroy(self)
            end
        end
        local originalGetTexture = classType.GetTexture
        classType.GetTexture = function(self)
            if originalGetTexture ~= nil then
                return originalGetTexture(self)
            end
            return ____exports.EOMModifier.prototype.GetTexture(self)
        end
        for key, value in pairs(param) do
            if key ~= "name" and type(classType[key]) ~= "function" then
                classType[key] = function()
                    return value
                end
            end
        end
        if #transmitterDataFields > 0 then
            local originalAddCustomTransmitterData = classType.AddCustomTransmitterData
            classType.AddCustomTransmitterData = function(self)
                local ____temp_2
                if originalAddCustomTransmitterData ~= nil then
                    ____temp_2 = originalAddCustomTransmitterData(self)
                else
                    ____temp_2 = nil
                end
                local payload = ____temp_2
                if payload == nil then
                    payload = {}
                end
                for ____, field in ipairs(transmitterDataFields) do
                    payload[field] = self[field]
                end
                return payload
            end
            local originalHandleCustomTransmitterData = classType.HandleCustomTransmitterData
            classType.HandleCustomTransmitterData = function(self, data)
                if data ~= nil then
                    for ____, field in ipairs(transmitterDataFields) do
                        if data[field] ~= nil then
                            if type(data[field]) == "userdata" then
                                local result = tonumber(tostring(data[field])) or 0
                                self[field] = result
                                if self.OnTransmitterDataUpdated ~= nil then
                                    self:OnTransmitterDataUpdated(field, result)
                                end
                            else
                                self[field] = data[field]
                                if self.OnTransmitterDataUpdated ~= nil then
                                    self:OnTransmitterDataUpdated(field, data[field])
                                end
                            end
                        end
                    end
                end
                if originalHandleCustomTransmitterData ~= nil then
                    originalHandleCustomTransmitterData(self, data)
                end
            end
        end
        local extraDeclareList = {}
        local originalDeclareFunctions = classType.DeclareFunctions
        local function bindDeclareEntries(self, declareMap, isDynamic)
            for modifierfunction, value in pairs(declareMap) do
                do
                    local methodName = MODIFIER_FUNCTION_MAP[modifierfunction]
                    if methodName == nil then
                        goto __continue69
                    end
                    extraDeclareList[#extraDeclareList + 1] = modifierfunction
                    local existing = classType[methodName]
                    if type(existing) ~= "function" then
                        if isDynamic and type(value) == "function" then
                            classType[methodName] = function(self, params)
                                return value:call(self, params)
                            end
                        else
                            classType[methodName] = function()
                                return value
                            end
                        end
                    end
                end
                ::__continue69::
            end
        end
        if classType.StaticDeclare ~= nil then
            local staticDeclare = classType:StaticDeclare()
            bindDeclareEntries(nil, staticDeclare, false)
        end
        if classType.DynamicDeclare ~= nil then
            local dynamicDeclare = classType:DynamicDeclare()
            bindDeclareEntries(nil, dynamicDeclare, true)
        end
        if #extraDeclareList > 0 or originalDeclareFunctions ~= nil then
            classType.DeclareFunctions = function(self)
                local result = originalDeclareFunctions ~= nil and (originalDeclareFunctions(self) or ({})) or ({})
                do
                    local i = 0
                    while i < #extraDeclareList do
                        local funcId = extraDeclareList[i + 1]
                        local exists = false
                        do
                            local j = 0
                            while j < #result do
                                if result[j + 1] == funcId then
                                    exists = true
                                    break
                                end
                                j = j + 1
                            end
                        end
                        if not exists then
                            result[#result + 1] = funcId
                        end
                        i = i + 1
                    end
                end
                return result
            end
        end
        if fileName and #fileName > 0 then
            LinkLuaModifier(name, fileName, ____type)
        end
    end
end
____exports.EOMModifier = __TS__Class()
local EOMModifier = ____exports.EOMModifier
EOMModifier.name = "EOMModifier"
__TS__ClassExtends(EOMModifier, BaseModifier)
function EOMModifier.prototype.RegisterStaticProperties(self)
    if self.StaticProperty == nil then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetName()
    local staticProperty = self:StaticProperty()
    for property, value in pairs(staticProperty) do
        local id = PROPERTY_MAP_REVERSE[property]
        if id then
            if self._RegisteredPropertyKeys == nil then
                self._RegisteredPropertyKeys = {}
            end
            self._RegisteredPropertyKeys[property] = true
            local key = PropertyData.configs[id].scope == PropertyScope.PLAYER and self:GetParent():GetPlayerOwnerID() or entIndex
            PropertySystem:AddStaticProperty(key, id, sourceId, value)
        end
    end
end
function EOMModifier.prototype.GetStateSourceId(self)
    local ____self_3, ____StateSourceId_4 = self, "__StateSourceId"
    if ____self_3[____StateSourceId_4] == nil then
        ____self_3[____StateSourceId_4] = DoUniqueString(self:GetName() .. ":state")
    end
    return self.__StateSourceId
end
function EOMModifier.prototype.RegisterDynamicStates(self)
    if not IsServer() or self.DynamicState == nil and self.__DynamicStateIDs == nil then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetStateSourceId()
    local ____opt_6 = self.DynamicState
    local dynamicState = ____opt_6 and ____opt_6(self) or ({})
    for ____, state in ipairs(self.__DynamicStateIDs or ({})) do
        if dynamicState[state] == nil then
            StateSystem:UnregisterDynamicState(entIndex, sourceId, state)
        end
    end
    self.__DynamicStateIDs = {}
    for state, func in pairs(dynamicState) do
        StateSystem:RegisterDynamicState(
            entIndex,
            state,
            sourceId,
            func,
            self:GetPriority()
        )
        local ____self___DynamicStateIDs_8 = self.__DynamicStateIDs
        ____self___DynamicStateIDs_8[#____self___DynamicStateIDs_8 + 1] = state
    end
end
function EOMModifier.prototype.RegisterStaticStates(self)
    if not IsServer() or self.StaticState == nil and self.__StaticStateIDs == nil then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetStateSourceId()
    local ____opt_9 = self.StaticState
    local staticState = ____opt_9 and ____opt_9(self) or ({})
    for ____, state in ipairs(self.__StaticStateIDs or ({})) do
        if staticState[state] == nil then
            StateSystem:RemoveStaticState(entIndex, sourceId, state)
        end
    end
    self.__StaticStateIDs = {}
    for state, value in pairs(staticState) do
        StateSystem:AddStaticState(
            entIndex,
            state,
            sourceId,
            value,
            self:GetPriority()
        )
        local ____self___StaticStateIDs_11 = self.__StaticStateIDs
        ____self___StaticStateIDs_11[#____self___StaticStateIDs_11 + 1] = state
    end
end
function EOMModifier.prototype.OnCreated(self, params)
    if self._bDestroyed == true then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetName()
    if self.DynamicProperty ~= nil then
        local dynamicProperty = self:DynamicProperty()
        for property, func in pairs(dynamicProperty) do
            local id = PROPERTY_MAP_REVERSE[property]
            if id then
                if self._RegisteredPropertyKeys == nil then
                    self._RegisteredPropertyKeys = {}
                end
                self._RegisteredPropertyKeys[property] = true
                local key = PropertyData.configs[id].scope == PropertyScope.PLAYER and self:GetParent():GetPlayerOwnerID() or entIndex
                PropertySystem:RegisterDynamicProperty(key, id, sourceId, func)
            end
        end
    end
    self:RegisterStaticProperties()
    self:RegisterDynamicStates()
    self:RegisterStaticStates()
    if IsServer() then
        if self.EventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            for event, listener in pairs(self:EventListener()) do
                local ____self___EventIDList_12 = self.__EventIDList
                ____self___EventIDList_12[#____self___EventIDList_12 + 1] = Event:RegisterForOwner(
                    event,
                    listener,
                    self:GetParent()
                )
            end
        end
    end
    self:RefreshParentStats()
end
function EOMModifier.prototype.OnRefresh(self, params)
    if self._bDestroyed == true then
        return
    end
    self:RegisterStaticProperties()
    self:RegisterStaticStates()
    self:RegisterDynamicStates()
    self:RefreshParentStats()
end
function EOMModifier.prototype.OnStackCountChanged(self, stackCount)
    if self._bDestroyed == true then
        return
    end
    self:RegisterStaticProperties()
    self:RegisterStaticStates()
    self:RegisterDynamicStates()
    self:RefreshParentStats()
end
function EOMModifier.prototype.RefreshParentStats(self)
    if not IsServer() or not IsValid(self:GetParent()) then
        return
    end
    local common = self:GetParent():FindModifierByName("modifier_common")
    if IsValid(common) and not common._bDestroyed then
        common:SyncStats()
    end
end
function EOMModifier.prototype.OnDestroy(self)
    self._bDestroyed = true
    local sourceId = self:GetName()
    local entIndex = self:GetParent():entindex()
    for ____, property in ipairs(__TS__ObjectKeys(self._RegisteredPropertyKeys or ({}))) do
        local id = PROPERTY_MAP_REVERSE[__TS__Number(property)]
        if id then
            local key = PropertyData.configs[id].scope == PropertyScope.PLAYER and self:GetParent():GetPlayerOwnerID() or entIndex
            PropertySystem:RemoveStaticProperty(key, sourceId, id)
            PropertySystem:UnregisterDynamicProperty(key, sourceId, id)
        end
    end
    if IsServer() then
        StateSystem:CleanupSourceStates(entIndex, self.__StateSourceId or sourceId)
    end
    if IsServer() then
        if self.__EventIDList ~= nil then
            for i, v in ipairs(self.__EventIDList) do
                Event:Unregister(v)
            end
            self.__EventIDList = nil
        end
    end
    self:RefreshParentStats()
end
____exports.EOMModifierMotionHorizontal = __TS__Class()
local EOMModifierMotionHorizontal = ____exports.EOMModifierMotionHorizontal
EOMModifierMotionHorizontal.name = "EOMModifierMotionHorizontal"
__TS__ClassExtends(EOMModifierMotionHorizontal, ____exports.EOMModifier)
____exports.EOMModifierMotionVertical = __TS__Class()
local EOMModifierMotionVertical = ____exports.EOMModifierMotionVertical
EOMModifierMotionVertical.name = "EOMModifierMotionVertical"
__TS__ClassExtends(EOMModifierMotionVertical, ____exports.EOMModifier)
____exports.EOMModifierMotionBoth = __TS__Class()
local EOMModifierMotionBoth = ____exports.EOMModifierMotionBoth
EOMModifierMotionBoth.name = "EOMModifierMotionBoth"
__TS__ClassExtends(EOMModifierMotionBoth, ____exports.EOMModifier)
return ____exports
