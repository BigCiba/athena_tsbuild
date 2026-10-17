local __TSTL_FILE_PATH__ = "modifiers/eom_modifier/eom_modifier"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__Number = ____lualib.__TS__Number
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["14"] = 1,["15"] = 1,["16"] = 2,["17"] = 2,["18"] = 2,["19"] = 2,["20"] = 2,["21"] = 2,["22"] = 4,["23"] = 6,["24"] = 7,["25"] = 8,["26"] = 9,["27"] = 10,["28"] = 11,["30"] = 13,["31"] = 14,["33"] = 6,["34"] = 18,["35"] = 19,["36"] = 20,["37"] = 21,["38"] = 22,["39"] = 23,["40"] = 24,["41"] = 25,["42"] = 26,["43"] = 27,["47"] = 31,["49"] = 33,["50"] = 18,["52"] = 39,["53"] = 40,["54"] = 41,["55"] = 42,["56"] = 43,["58"] = 40,["59"] = 39,["60"] = 80,["61"] = 80,["62"] = 80,["64"] = 81,["66"] = 83,["67"] = 84,["68"] = 85,["69"] = 87,["71"] = 89,["73"] = 92,["74"] = 93,["75"] = 95,["76"] = 96,["77"] = 98,["78"] = 99,["79"] = 100,["80"] = 101,["81"] = 102,["82"] = 103,["84"] = 105,["85"] = 106,["87"] = 108,["88"] = 109,["90"] = 111,["91"] = 112,["94"] = 116,["96"] = 119,["97"] = 120,["98"] = 121,["99"] = 122,["100"] = 123,["101"] = 124,["102"] = 125,["103"] = 126,["104"] = 127,["105"] = 128,["106"] = 129,["107"] = 130,["108"] = 131,["110"] = 133,["112"] = 134,["113"] = 134,["114"] = 135,["115"] = 136,["116"] = 134,["120"] = 139,["121"] = 140,["123"] = 142,["124"] = 143,["126"] = 145,["127"] = 146,["129"] = 123,["130"] = 149,["131"] = 150,["132"] = 151,["133"] = 152,["134"] = 153,["136"] = 154,["137"] = 154,["138"] = 155,["139"] = 156,["140"] = 154,["144"] = 159,["145"] = 160,["147"] = 162,["148"] = 163,["150"] = 165,["151"] = 166,["153"] = 150,["154"] = 169,["155"] = 170,["156"] = 171,["158"] = 172,["159"] = 172,["160"] = 173,["161"] = 174,["162"] = 172,["166"] = 177,["167"] = 178,["169"] = 180,["170"] = 181,["172"] = 183,["173"] = 184,["175"] = 170,["176"] = 187,["177"] = 188,["178"] = 189,["179"] = 190,["181"] = 192,["182"] = 193,["184"] = 188,["185"] = 196,["186"] = 197,["187"] = 243,["188"] = 244,["190"] = 246,["191"] = 197,["192"] = 255,["193"] = 256,["194"] = 257,["195"] = 258,["196"] = 257,["199"] = 263,["200"] = 264,["201"] = 265,["202"] = 266,["203"] = 266,["204"] = 266,["206"] = 266,["208"] = 266,["209"] = 267,["210"] = 268,["212"] = 270,["213"] = 271,["215"] = 273,["216"] = 265,["217"] = 275,["218"] = 276,["219"] = 277,["220"] = 278,["221"] = 279,["222"] = 281,["223"] = 282,["224"] = 283,["225"] = 284,["226"] = 285,["229"] = 288,["230"] = 289,["231"] = 290,["237"] = 296,["238"] = 297,["240"] = 276,["242"] = 303,["243"] = 304,["244"] = 306,["245"] = 307,["247"] = 309,["248"] = 310,["249"] = 311,["251"] = 313,["252"] = 315,["253"] = 316,["254"] = 317,["255"] = 318,["256"] = 319,["257"] = 318,["259"] = 322,["260"] = 323,["261"] = 322,["267"] = 306,["268"] = 330,["269"] = 331,["270"] = 332,["272"] = 334,["273"] = 335,["274"] = 336,["276"] = 339,["277"] = 340,["278"] = 341,["280"] = 342,["281"] = 342,["282"] = 343,["283"] = 344,["285"] = 345,["286"] = 345,["287"] = 346,["288"] = 347,["291"] = 345,["294"] = 351,["295"] = 352,["297"] = 342,["300"] = 355,["301"] = 340,["303"] = 359,["304"] = 360,["306"] = 84,["307"] = 80,["308"] = 378,["309"] = 378,["310"] = 378,["311"] = 378,["312"] = 393,["313"] = 394,["316"] = 398,["317"] = 399,["318"] = 400,["319"] = 401,["320"] = 402,["321"] = 403,["322"] = 404,["323"] = 404,["325"] = 404,["326"] = 405,["327"] = 406,["330"] = 393,["331"] = 412,["332"] = 413,["333"] = 413,["334"] = 413,["336"] = 413,["337"] = 412,["338"] = 416,["339"] = 417,["340"] = 417,["341"] = 417,["343"] = 417,["344"] = 416,["345"] = 420,["346"] = 421,["349"] = 422,["350"] = 422,["352"] = 422,["353"] = 422,["355"] = 423,["358"] = 423,["360"] = 423,["363"] = 423,["364"] = 423,["366"] = 422,["367"] = 422,["368"] = 422,["369"] = 422,["370"] = 420,["371"] = 426,["372"] = 427,["375"] = 429,["376"] = 430,["377"] = 431,["378"] = 432,["379"] = 433,["380"] = 434,["381"] = 435,["382"] = 436,["383"] = 436,["385"] = 436,["386"] = 437,["387"] = 438,["391"] = 442,["392"] = 443,["393"] = 445,["394"] = 446,["395"] = 447,["396"] = 447,["398"] = 448,["399"] = 448,["400"] = 448,["401"] = 448,["402"] = 448,["403"] = 448,["404"] = 448,["405"] = 448,["407"] = 450,["408"] = 451,["409"] = 451,["411"] = 452,["412"] = 454,["413"] = 454,["414"] = 454,["415"] = 454,["416"] = 454,["417"] = 454,["421"] = 458,["422"] = 426,["423"] = 460,["424"] = 461,["427"] = 463,["428"] = 464,["429"] = 465,["430"] = 460,["431"] = 467,["432"] = 468,["435"] = 470,["436"] = 471,["437"] = 472,["438"] = 467,["439"] = 475,["440"] = 476,["443"] = 477,["444"] = 478,["445"] = 478,["447"] = 475,["448"] = 480,["449"] = 481,["450"] = 483,["451"] = 484,["452"] = 487,["453"] = 488,["454"] = 489,["455"] = 490,["456"] = 491,["457"] = 492,["460"] = 496,["461"] = 496,["463"] = 498,["464"] = 499,["465"] = 500,["466"] = 501,["468"] = 503,["471"] = 506,["472"] = 480,["473"] = 510,["474"] = 510,["475"] = 510,["476"] = 510,["477"] = 513,["478"] = 513,["479"] = 513,["480"] = 513,["481"] = 516,["482"] = 516,["483"] = 516,["484"] = 516});
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
    local sourceId = self:GetPropertySourceId()
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
function EOMModifier.prototype.GetPropertySourceId(self)
    local ____self_3, ____PropertySourceId_4 = self, "__PropertySourceId"
    if ____self_3[____PropertySourceId_4] == nil then
        ____self_3[____PropertySourceId_4] = DoUniqueString(self:GetName() .. ":property")
    end
    return self.__PropertySourceId
end
function EOMModifier.prototype.GetStateSourceId(self)
    local ____self_6, ____StateSourceId_7 = self, "__StateSourceId"
    if ____self_6[____StateSourceId_7] == nil then
        ____self_6[____StateSourceId_7] = DoUniqueString(self:GetName() .. ":state")
    end
    return self.__StateSourceId
end
function EOMModifier.prototype.RegisterStates(self)
    if not IsServer() or self.StaticState == nil and self.DynamicState == nil and self.__StateSourceId == nil then
        return
    end
    local ____StateSystem_14 = StateSystem
    local ____StateSystem_ReplaceSourceStates_15 = StateSystem.ReplaceSourceStates
    local ____array_13 = __TS__SparseArrayNew(
        self:GetParent():entindex(),
        self:GetStateSourceId()
    )
    local ____opt_9 = self.StaticState
    __TS__SparseArrayPush(
        ____array_13,
        ____opt_9 and ____opt_9(self) or ({})
    )
    local ____opt_11 = self.DynamicState
    __TS__SparseArrayPush(
        ____array_13,
        ____opt_11 and ____opt_11(self) or ({}),
        self:GetPriority()
    )
    ____StateSystem_ReplaceSourceStates_15(
        ____StateSystem_14,
        __TS__SparseArraySpread(____array_13)
    )
end
function EOMModifier.prototype.OnCreated(self, params)
    if self._bDestroyed == true then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetPropertySourceId()
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
    self:RegisterStates()
    if IsServer() then
        if self.UnitEventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            __TS__ArrayPushArray(
                self.__EventIDList,
                Event:RegisterUnitListeners(
                    self:UnitEventListener(),
                    self:GetParent(),
                    self
                )
            )
        end
        if self.EventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            for event, listener in pairs(self:EventListener()) do
                local ____self___EventIDList_16 = self.__EventIDList
                ____self___EventIDList_16[#____self___EventIDList_16 + 1] = Event:RegisterForOwner(
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
    self:RegisterStates()
    self:RefreshParentStats()
end
function EOMModifier.prototype.OnStackCountChanged(self, stackCount)
    if self._bDestroyed == true then
        return
    end
    self:RegisterStaticProperties()
    self:RegisterStates()
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
    local sourceId = self.__PropertySourceId or self:GetName()
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
