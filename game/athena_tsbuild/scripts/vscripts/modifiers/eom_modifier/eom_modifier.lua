local __TSTL_FILE_PATH__ = "modifiers/eom_modifier/eom_modifier"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 2,["13"] = 2,["14"] = 2,["15"] = 2,["16"] = 4,["17"] = 6,["18"] = 7,["19"] = 8,["20"] = 9,["21"] = 10,["22"] = 11,["24"] = 13,["25"] = 14,["27"] = 6,["28"] = 18,["29"] = 19,["30"] = 20,["31"] = 21,["32"] = 22,["33"] = 23,["34"] = 24,["35"] = 25,["36"] = 26,["37"] = 27,["41"] = 31,["43"] = 33,["44"] = 18,["46"] = 39,["47"] = 40,["48"] = 41,["49"] = 42,["50"] = 43,["52"] = 40,["53"] = 39,["54"] = 80,["55"] = 80,["56"] = 80,["58"] = 81,["60"] = 83,["61"] = 84,["62"] = 85,["63"] = 87,["65"] = 89,["67"] = 92,["68"] = 93,["69"] = 95,["70"] = 96,["71"] = 98,["72"] = 99,["73"] = 100,["74"] = 101,["75"] = 102,["76"] = 103,["78"] = 105,["79"] = 106,["81"] = 108,["82"] = 109,["84"] = 111,["85"] = 112,["88"] = 116,["90"] = 119,["91"] = 120,["92"] = 121,["93"] = 122,["94"] = 123,["95"] = 124,["96"] = 125,["97"] = 126,["98"] = 127,["99"] = 128,["100"] = 129,["101"] = 130,["102"] = 131,["104"] = 133,["106"] = 134,["107"] = 134,["108"] = 135,["109"] = 136,["110"] = 134,["114"] = 139,["115"] = 140,["117"] = 142,["118"] = 143,["120"] = 145,["121"] = 146,["123"] = 123,["124"] = 149,["125"] = 150,["126"] = 151,["127"] = 152,["128"] = 153,["130"] = 154,["131"] = 154,["132"] = 155,["133"] = 156,["134"] = 154,["138"] = 159,["139"] = 160,["141"] = 162,["142"] = 163,["144"] = 165,["145"] = 166,["147"] = 150,["148"] = 169,["149"] = 170,["150"] = 171,["152"] = 172,["153"] = 172,["154"] = 173,["155"] = 174,["156"] = 172,["160"] = 177,["161"] = 178,["163"] = 180,["164"] = 181,["166"] = 183,["167"] = 184,["169"] = 170,["170"] = 187,["171"] = 188,["172"] = 189,["173"] = 190,["175"] = 192,["176"] = 193,["178"] = 188,["179"] = 196,["180"] = 197,["181"] = 243,["182"] = 244,["184"] = 246,["185"] = 197,["186"] = 255,["187"] = 256,["188"] = 257,["189"] = 258,["190"] = 257,["193"] = 263,["194"] = 264,["195"] = 265,["196"] = 266,["197"] = 266,["198"] = 266,["200"] = 266,["202"] = 266,["203"] = 267,["204"] = 268,["206"] = 270,["207"] = 271,["209"] = 273,["210"] = 265,["211"] = 275,["212"] = 276,["213"] = 277,["214"] = 278,["215"] = 279,["216"] = 281,["217"] = 282,["218"] = 283,["219"] = 284,["220"] = 285,["223"] = 288,["224"] = 289,["225"] = 290,["231"] = 296,["232"] = 297,["234"] = 276,["236"] = 303,["237"] = 304,["238"] = 306,["239"] = 307,["241"] = 309,["242"] = 310,["243"] = 311,["245"] = 313,["246"] = 315,["247"] = 316,["248"] = 317,["249"] = 318,["250"] = 319,["251"] = 318,["253"] = 322,["254"] = 323,["255"] = 322,["261"] = 306,["262"] = 330,["263"] = 331,["264"] = 332,["266"] = 334,["267"] = 335,["268"] = 336,["270"] = 339,["271"] = 340,["272"] = 341,["274"] = 342,["275"] = 342,["276"] = 343,["277"] = 344,["279"] = 345,["280"] = 345,["281"] = 346,["282"] = 347,["285"] = 345,["288"] = 351,["289"] = 352,["291"] = 342,["294"] = 355,["295"] = 340,["297"] = 359,["298"] = 360,["300"] = 84,["301"] = 80,["302"] = 377,["303"] = 377,["304"] = 377,["305"] = 377,["306"] = 389,["307"] = 390,["310"] = 394,["311"] = 395,["312"] = 396,["313"] = 397,["314"] = 398,["315"] = 399,["318"] = 389,["319"] = 405,["320"] = 406,["323"] = 410,["324"] = 411,["325"] = 412,["326"] = 413,["327"] = 414,["329"] = 405,["330"] = 419,["331"] = 420,["334"] = 424,["335"] = 425,["336"] = 426,["337"] = 427,["338"] = 428,["339"] = 428,["340"] = 428,["341"] = 428,["342"] = 428,["343"] = 428,["344"] = 428,["346"] = 419,["347"] = 432,["348"] = 433,["351"] = 435,["352"] = 436,["353"] = 437,["354"] = 438,["355"] = 439,["356"] = 440,["357"] = 441,["361"] = 445,["362"] = 446,["363"] = 447,["364"] = 449,["365"] = 450,["366"] = 451,["367"] = 451,["369"] = 452,["370"] = 454,["371"] = 454,["372"] = 454,["373"] = 454,["374"] = 454,["375"] = 454,["379"] = 458,["380"] = 432,["381"] = 460,["382"] = 461,["385"] = 463,["386"] = 464,["387"] = 465,["388"] = 460,["389"] = 467,["390"] = 468,["393"] = 470,["394"] = 471,["395"] = 472,["396"] = 467,["397"] = 475,["398"] = 476,["401"] = 477,["402"] = 478,["403"] = 478,["405"] = 475,["406"] = 480,["407"] = 481,["408"] = 483,["409"] = 484,["410"] = 486,["411"] = 487,["412"] = 489,["413"] = 490,["414"] = 492,["415"] = 493,["416"] = 494,["417"] = 495,["419"] = 497,["422"] = 500,["423"] = 480,["424"] = 504,["425"] = 504,["426"] = 504,["427"] = 504,["428"] = 507,["429"] = 507,["430"] = 507,["431"] = 507,["432"] = 510,["433"] = 510,["434"] = 510,["435"] = 510});
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
        if PROPERTY_MAP_REVERSE[property] then
            PropertySystem:AddStaticProperty(entIndex, PROPERTY_MAP_REVERSE[property], sourceId, value)
        end
    end
end
function EOMModifier.prototype.RegisterDynamicStates(self)
    if self.DynamicState == nil then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetName()
    local dynamicState = self:DynamicState()
    for state, func in pairs(dynamicState) do
        StateSystem:RegisterDynamicState(entIndex, state, sourceId, func)
    end
end
function EOMModifier.prototype.RegisterStaticStates(self)
    if self.StaticState == nil then
        return
    end
    local entIndex = self:GetParent():entindex()
    local sourceId = self:GetName()
    local staticState = self:StaticState()
    for state, value in pairs(staticState) do
        StateSystem:AddStaticState(
            entIndex,
            state,
            sourceId,
            value,
            self:GetPriority()
        )
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
            if PROPERTY_MAP_REVERSE[property] then
                PropertySystem:RegisterDynamicProperty(entIndex, PROPERTY_MAP_REVERSE[property], sourceId, func)
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
                local ____self___EventIDList_3 = self.__EventIDList
                ____self___EventIDList_3[#____self___EventIDList_3 + 1] = Event:RegisterForOwner(
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
    self:RefreshParentStats()
end
function EOMModifier.prototype.OnStackCountChanged(self, stackCount)
    if self._bDestroyed == true then
        return
    end
    self:RegisterStaticProperties()
    self:RegisterStaticStates()
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
    PropertySystem:RemoveStaticProperty(entIndex, sourceId)
    PropertySystem:UnregisterDynamicProperty(entIndex, sourceId)
    StateSystem:RemoveStaticState(entIndex, sourceId)
    StateSystem:UnregisterDynamicState(entIndex, sourceId)
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
