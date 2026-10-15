local __TSTL_FILE_PATH__ = "modifiers/eom_modifier/eom_modifier"
local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 2,["13"] = 2,["14"] = 2,["15"] = 2,["16"] = 4,["17"] = 6,["18"] = 7,["19"] = 8,["20"] = 9,["21"] = 10,["22"] = 11,["24"] = 13,["25"] = 14,["27"] = 6,["28"] = 18,["29"] = 19,["30"] = 20,["31"] = 21,["32"] = 22,["33"] = 23,["34"] = 24,["35"] = 25,["36"] = 26,["37"] = 27,["41"] = 31,["43"] = 33,["44"] = 18,["46"] = 39,["47"] = 40,["48"] = 41,["49"] = 42,["50"] = 43,["52"] = 40,["53"] = 39,["54"] = 80,["55"] = 81,["57"] = 83,["58"] = 84,["59"] = 85,["60"] = 87,["62"] = 89,["64"] = 92,["65"] = 93,["66"] = 95,["67"] = 96,["68"] = 98,["69"] = 99,["70"] = 100,["71"] = 101,["72"] = 102,["73"] = 103,["75"] = 105,["76"] = 106,["78"] = 108,["79"] = 109,["81"] = 111,["82"] = 112,["85"] = 116,["87"] = 119,["88"] = 120,["89"] = 121,["90"] = 122,["91"] = 123,["92"] = 124,["93"] = 125,["94"] = 126,["95"] = 127,["96"] = 128,["97"] = 129,["98"] = 130,["99"] = 131,["101"] = 133,["103"] = 134,["104"] = 134,["105"] = 135,["106"] = 136,["107"] = 134,["111"] = 139,["112"] = 140,["114"] = 142,["115"] = 143,["117"] = 145,["118"] = 146,["120"] = 123,["121"] = 149,["122"] = 150,["123"] = 151,["124"] = 152,["125"] = 153,["127"] = 154,["128"] = 154,["129"] = 155,["130"] = 156,["131"] = 154,["135"] = 159,["136"] = 160,["138"] = 162,["139"] = 163,["141"] = 165,["142"] = 166,["144"] = 150,["145"] = 169,["146"] = 170,["147"] = 171,["149"] = 172,["150"] = 172,["151"] = 173,["152"] = 174,["153"] = 172,["157"] = 177,["158"] = 178,["160"] = 180,["161"] = 181,["163"] = 183,["164"] = 184,["166"] = 170,["167"] = 187,["168"] = 188,["169"] = 189,["170"] = 190,["172"] = 192,["173"] = 193,["175"] = 188,["176"] = 196,["177"] = 197,["178"] = 243,["179"] = 244,["181"] = 246,["182"] = 197,["183"] = 255,["184"] = 256,["185"] = 257,["186"] = 258,["187"] = 257,["190"] = 263,["191"] = 264,["192"] = 265,["193"] = 266,["194"] = 266,["195"] = 266,["197"] = 266,["199"] = 266,["200"] = 267,["201"] = 268,["203"] = 270,["204"] = 271,["206"] = 273,["207"] = 265,["208"] = 275,["209"] = 276,["210"] = 277,["211"] = 278,["212"] = 279,["213"] = 281,["214"] = 282,["215"] = 283,["216"] = 284,["217"] = 285,["220"] = 288,["221"] = 289,["222"] = 290,["228"] = 296,["229"] = 297,["231"] = 276,["233"] = 303,["234"] = 304,["235"] = 306,["236"] = 307,["238"] = 309,["239"] = 310,["240"] = 311,["242"] = 313,["243"] = 315,["244"] = 316,["245"] = 317,["246"] = 318,["247"] = 319,["248"] = 318,["250"] = 322,["251"] = 323,["252"] = 322,["258"] = 306,["259"] = 330,["260"] = 331,["261"] = 332,["263"] = 334,["264"] = 335,["265"] = 336,["267"] = 339,["268"] = 340,["269"] = 341,["271"] = 342,["272"] = 342,["273"] = 343,["274"] = 344,["276"] = 345,["277"] = 345,["278"] = 346,["279"] = 347,["282"] = 345,["285"] = 351,["286"] = 352,["288"] = 342,["291"] = 355,["292"] = 340,["294"] = 359,["295"] = 360,["297"] = 84,["298"] = 80,["299"] = 377,["300"] = 377,["301"] = 377,["302"] = 377,["303"] = 389,["304"] = 390,["307"] = 394,["308"] = 395,["309"] = 396,["310"] = 397,["311"] = 398,["312"] = 399,["315"] = 389,["316"] = 405,["317"] = 406,["320"] = 410,["321"] = 411,["322"] = 412,["323"] = 413,["324"] = 414,["326"] = 405,["327"] = 419,["328"] = 420,["331"] = 424,["332"] = 425,["333"] = 426,["334"] = 427,["335"] = 428,["336"] = 428,["337"] = 428,["338"] = 428,["339"] = 428,["340"] = 428,["341"] = 428,["343"] = 419,["344"] = 432,["345"] = 433,["348"] = 435,["349"] = 436,["350"] = 437,["351"] = 438,["352"] = 439,["353"] = 440,["354"] = 441,["355"] = 442,["359"] = 446,["360"] = 447,["361"] = 448,["362"] = 450,["363"] = 451,["364"] = 452,["365"] = 453,["366"] = 453,["367"] = 453,["369"] = 453,["372"] = 455,["373"] = 456,["374"] = 456,["376"] = 457,["377"] = 459,["378"] = 459,["379"] = 459,["380"] = 459,["381"] = 459,["382"] = 459,["386"] = 432,["387"] = 464,["388"] = 465,["391"] = 467,["392"] = 468,["393"] = 470,["394"] = 471,["395"] = 472,["396"] = 473,["397"] = 474,["398"] = 475,["399"] = 475,["400"] = 475,["402"] = 475,["406"] = 464,["407"] = 479,["408"] = 480,["411"] = 482,["412"] = 483,["413"] = 485,["414"] = 486,["415"] = 487,["416"] = 488,["417"] = 489,["418"] = 490,["419"] = 490,["420"] = 490,["422"] = 490,["426"] = 479,["427"] = 494,["428"] = 495,["429"] = 497,["430"] = 499,["431"] = 500,["432"] = 501,["433"] = 503,["434"] = 504,["435"] = 506,["436"] = 507,["437"] = 509,["438"] = 510,["439"] = 511,["440"] = 511,["441"] = 511,["443"] = 511,["446"] = 513,["447"] = 514,["448"] = 515,["450"] = 517,["453"] = 494,["454"] = 523,["455"] = 523,["456"] = 523,["457"] = 523,["458"] = 526,["459"] = 526,["460"] = 526,["461"] = 526,["462"] = 529,["463"] = 529,["464"] = 529,["465"] = 529});
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
    local calculateGenericBonuses = false
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
        if calculateGenericBonuses then
            local parent = self:GetParent()
            local ____parent_IsHero_result_3
            if parent:IsHero() then
                ____parent_IsHero_result_3 = parent:CalculateStatBonus(true)
            else
                ____parent_IsHero_result_3 = parent:CalculateGenericBonuses()
            end
        end
        if self.EventListener ~= nil then
            if self.__EventIDList == nil then
                self.__EventIDList = {}
            end
            for event, listener in pairs(self:EventListener()) do
                local ____self___EventIDList_4 = self.__EventIDList
                ____self___EventIDList_4[#____self___EventIDList_4 + 1] = Event:RegisterForOwner(
                    event,
                    listener,
                    self:GetParent()
                )
            end
        end
    end
end
function EOMModifier.prototype.OnRefresh(self, params)
    if self._bDestroyed == true then
        return
    end
    local calculateGenericBonuses = false
    local sourceId = self:GetName()
    self:RegisterStaticProperties()
    self:RegisterStaticStates()
    if IsServer() then
        if calculateGenericBonuses then
            local parent = self:GetParent()
            local ____parent_IsHero_result_5
            if parent:IsHero() then
                ____parent_IsHero_result_5 = parent:CalculateStatBonus(true)
            else
                ____parent_IsHero_result_5 = parent:CalculateGenericBonuses()
            end
        end
    end
end
function EOMModifier.prototype.OnStackCountChanged(self, stackCount)
    if self._bDestroyed == true then
        return
    end
    local calculateGenericBonuses = false
    local sourceId = self:GetName()
    self:RegisterStaticProperties()
    self:RegisterStaticStates()
    if IsServer() then
        if calculateGenericBonuses then
            local parent = self:GetParent()
            local ____parent_IsHero_result_6
            if parent:IsHero() then
                ____parent_IsHero_result_6 = parent:CalculateStatBonus(true)
            else
                ____parent_IsHero_result_6 = parent:CalculateGenericBonuses()
            end
        end
    end
end
function EOMModifier.prototype.OnDestroy(self)
    self._bDestroyed = true
    local calculateGenericBonuses = false
    local parent = self:GetParent()
    local sourceId = self:GetName()
    local entIndex = self:GetParent():entindex()
    PropertySystem:RemoveStaticProperty(entIndex, sourceId)
    PropertySystem:UnregisterDynamicProperty(entIndex, sourceId)
    StateSystem:RemoveStaticState(entIndex, sourceId)
    StateSystem:UnregisterDynamicState(entIndex, sourceId)
    if IsServer() then
        if calculateGenericBonuses and IsValid(parent) then
            local ____parent_IsHero_result_7
            if parent:IsHero() then
                ____parent_IsHero_result_7 = parent:CalculateStatBonus(true)
            else
                ____parent_IsHero_result_7 = parent:CalculateGenericBonuses()
            end
        end
        if self.__EventIDList ~= nil then
            for i, v in ipairs(self.__EventIDList) do
                Event:Unregister(v)
            end
            self.__EventIDList = nil
        end
    end
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
