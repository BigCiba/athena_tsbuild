local __TSTL_FILE_PATH__ = "framework/unit_attributes"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 1,["17"] = 1,["19"] = 5,["20"] = 6,["21"] = 5,["22"] = 6,["24"] = 6,["25"] = 7,["26"] = 8,["27"] = 9,["28"] = 11,["29"] = 12,["30"] = 13,["31"] = 5,["32"] = 14,["33"] = 15,["34"] = 16,["35"] = 16,["36"] = 16,["37"] = 16,["38"] = 16,["39"] = 17,["40"] = 17,["41"] = 17,["42"] = 17,["43"] = 18,["44"] = 18,["45"] = 18,["47"] = 16,["48"] = 16,["49"] = 16,["50"] = 20,["51"] = 20,["52"] = 20,["53"] = 20,["54"] = 20,["55"] = 20,["56"] = 20,["57"] = 20,["58"] = 20,["59"] = 21,["60"] = 21,["61"] = 21,["62"] = 21,["63"] = 21,["64"] = 21,["65"] = 21,["66"] = 21,["67"] = 21,["68"] = 22,["69"] = 22,["70"] = 22,["71"] = 22,["72"] = 22,["73"] = 22,["74"] = 22,["75"] = 22,["76"] = 22,["77"] = 23,["78"] = 23,["79"] = 23,["80"] = 23,["81"] = 23,["82"] = 23,["84"] = 25,["85"] = 22,["86"] = 22,["87"] = 22,["88"] = 27,["89"] = 27,["90"] = 27,["91"] = 27,["92"] = 27,["93"] = 27,["94"] = 27,["95"] = 27,["96"] = 27,["97"] = 28,["98"] = 28,["99"] = 28,["100"] = 28,["101"] = 28,["103"] = 28,["104"] = 28,["105"] = 28,["106"] = 29,["107"] = 29,["108"] = 29,["109"] = 29,["110"] = 29,["112"] = 29,["113"] = 29,["114"] = 29,["115"] = 30,["116"] = 30,["117"] = 30,["118"] = 30,["119"] = 30,["120"] = 30,["121"] = 30,["122"] = 31,["125"] = 33,["128"] = 33,["129"] = 33,["130"] = 34,["131"] = 34,["132"] = 34,["133"] = 34,["134"] = 34,["135"] = 34,["136"] = 35,["137"] = 35,["138"] = 35,["139"] = 35,["140"] = 35,["141"] = 35,["142"] = 37,["143"] = 37,["144"] = 37,["145"] = 37,["146"] = 37,["147"] = 37,["148"] = 38,["149"] = 38,["150"] = 38,["151"] = 38,["152"] = 30,["153"] = 30,["154"] = 30,["155"] = 30,["156"] = 40,["157"] = 40,["158"] = 40,["159"] = 41,["162"] = 43,["163"] = 43,["164"] = 43,["165"] = 43,["166"] = 43,["167"] = 43,["168"] = 43,["170"] = 40,["171"] = 40,["172"] = 40,["173"] = 46,["174"] = 46,["175"] = 46,["176"] = 47,["179"] = 48,["180"] = 49,["181"] = 49,["183"] = 46,["184"] = 46,["185"] = 46,["186"] = 14,["187"] = 52,["188"] = 53,["189"] = 53,["190"] = 53,["191"] = 53,["192"] = 53,["193"] = 53,["194"] = 53,["195"] = 53,["196"] = 53,["197"] = 53,["199"] = 52,["200"] = 55,["201"] = 56,["202"] = 55,["203"] = 58,["204"] = 58,["205"] = 58,["206"] = 60,["207"] = 60,["208"] = 60,["210"] = 61,["211"] = 62,["212"] = 62,["214"] = 63,["215"] = 63,["217"] = 64,["218"] = 64,["220"] = 65,["221"] = 66,["222"] = 67,["223"] = 67,["224"] = 67,["225"] = 67,["226"] = 67,["227"] = 67,["228"] = 68,["229"] = 68,["231"] = 69,["232"] = 60,["233"] = 71,["234"] = 72,["235"] = 73,["236"] = 73,["238"] = 74,["239"] = 74,["240"] = 74,["241"] = 75,["242"] = 75,["243"] = 75,["245"] = 75,["247"] = 75,["248"] = 76,["249"] = 76,["250"] = 76,["251"] = 76,["252"] = 76,["253"] = 76,["254"] = 71,["255"] = 79,["256"] = 80,["259"] = 81,["260"] = 81,["262"] = 82,["264"] = 83,["265"] = 83,["266"] = 84,["267"] = 85,["269"] = 85,["271"] = 85,["273"] = 85,["275"] = 85,["276"] = 85,["278"] = 83,["281"] = 87,["282"] = 88,["283"] = 89,["284"] = 89,["285"] = 90,["286"] = 91,["289"] = 91,["291"] = 91,["293"] = 92,["294"] = 92,["296"] = 93,["297"] = 94,["298"] = 94,["299"] = 95,["300"] = 95,["302"] = 96,["307"] = 98,["309"] = 100,["310"] = 100,["311"] = 101,["312"] = 101,["313"] = 102,["314"] = 102,["315"] = 103,["316"] = 103,["317"] = 103,["318"] = 103,["319"] = 103,["320"] = 103,["322"] = 104,["323"] = 104,["324"] = 104,["325"] = 104,["326"] = 104,["327"] = 104,["331"] = 106,["332"] = 79,["333"] = 108,["334"] = 109,["335"] = 110,["336"] = 110,["338"] = 108,["339"] = 112,["340"] = 113,["341"] = 114,["342"] = 115,["343"] = 115,["344"] = 115,["345"] = 112,["346"] = 117,["347"] = 118,["348"] = 118,["349"] = 118,["350"] = 118,["351"] = 118,["352"] = 118,["353"] = 118,["355"] = 117,["356"] = 120,["357"] = 122,["358"] = 122,["359"] = 122,["360"] = 122,["361"] = 122,["362"] = 122,["363"] = 122,["364"] = 122,["365"] = 122,["366"] = 122,["367"] = 122,["368"] = 122,["369"] = 122,["370"] = 122,["371"] = 122,["372"] = 122,["373"] = 123,["374"] = 123,["375"] = 123,["376"] = 123,["377"] = 123,["378"] = 123,["379"] = 123,["381"] = 125,["382"] = 125,["383"] = 125,["384"] = 125,["385"] = 125,["386"] = 125,["387"] = 125,["389"] = 126,["390"] = 126,["391"] = 126,["392"] = 126,["394"] = 120,["395"] = 128,["396"] = 129,["397"] = 130,["400"] = 131,["401"] = 131,["402"] = 131,["403"] = 132,["404"] = 133,["405"] = 134,["406"] = 134,["407"] = 134,["410"] = 136,["411"] = 136,["412"] = 136,["413"] = 137,["414"] = 137,["417"] = 138,["418"] = 139,["419"] = 139,["420"] = 139,["421"] = 140,["422"] = 140,["423"] = 140,["424"] = 140,["428"] = 142,["429"] = 136,["430"] = 136,["431"] = 128,["432"] = 145,["433"] = 145,["434"] = 145,["436"] = 145,["437"] = 145,["438"] = 147,["439"] = 148,["440"] = 149,["441"] = 149,["442"] = 149,["443"] = 149,["444"] = 150,["445"] = 150,["446"] = 150,["447"] = 151,["448"] = 153,["449"] = 153,["450"] = 153,["451"] = 154,["452"] = 155,["453"] = 156,["454"] = 156,["455"] = 156,["456"] = 156,["457"] = 156,["458"] = 156,["461"] = 158,["462"] = 158,["463"] = 158,["464"] = 158,["465"] = 158,["466"] = 158,["467"] = 158,["470"] = 159,["471"] = 159,["474"] = 161,["475"] = 161,["476"] = 161,["477"] = 161,["478"] = 147,["479"] = 5,["480"] = 6,["481"] = 165,["482"] = 165});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 单位属性来源与成长生命周期；基础 KV 只由 modifier_common 初始化。
____exports.CUnitAttributes = __TS__Class()
local CUnitAttributes = ____exports.CUnitAttributes
CUnitAttributes.name = "CUnitAttributes"
__TS__ClassExtends(CUnitAttributes, CModule)
function CUnitAttributes.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.units = {}
    self.items = {}
    self.devoured = {}
    self.runId = 0
    self.seconds = 0
    self.killed = {}
end
function CUnitAttributes.prototype.init(self)
    Event:UnregisterContext(self)
    Event:Register(
        "npc_spawned",
        function(____, ____bindingPattern0)
            local unit
            unit = ____bindingPattern0.unit
            self.killed = __TS__ArrayFilter(
                self.killed,
                function(____, victim) return IsValid(victim) and victim ~= unit end
            )
            if unit:IsRealHero() then
                self:Track(unit)
                self:RefreshItems(unit)
            end
        end,
        self
    )
    Event:Register(
        "item_added",
        function(____, ____bindingPattern0)
            local unit
            unit = ____bindingPattern0.unit
            return self:RefreshItems(unit)
        end,
        self
    )
    Event:Register(
        "item_removed",
        function(____, ____bindingPattern0)
            local unit
            unit = ____bindingPattern0.unit
            return self:RefreshItems(unit)
        end,
        self
    )
    Event:Register(
        "hero_level_up",
        function(____, ____bindingPattern0)
            local old_level
            local level
            local unit
            unit = ____bindingPattern0.unit
            level = ____bindingPattern0.level
            old_level = ____bindingPattern0.old_level
            for ____, stat in ipairs({"STRENGTH", "AGILITY", "INTELLECT"}) do
                self:AddPermanent(
                    unit,
                    "CUSTOM_ATTRIBUTE_" .. stat,
                    AthenaProperty(unit, PropertyFunction[("STATS_" .. stat) .. "_GAIN"]) * math.max(0, level - old_level)
                )
            end
            self:Sync(unit)
        end,
        self
    )
    Event:Register(
        "game_start",
        function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            return self:Start(runId)
        end,
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
        function(____, event)
            if event.runId == GameState:GetSession().runId then
                self:Clear()
            end
        end,
        self
    )
    Event:RegisterWithPriority(
        "entity_killed",
        function(____, ____bindingPattern0)
            local attacker
            local victim
            victim = ____bindingPattern0.victim
            attacker = ____bindingPattern0.attacker
            if not self:Active(attacker) or victim == attacker or victim:GetTeamNumber() == attacker:GetTeamNumber() then
                return
            end
            if __TS__ArrayIncludes(self.killed, victim) then
                return
            end
            local ____self_killed_0 = self.killed
            ____self_killed_0[#____self_killed_0 + 1] = victim
            self:AddPermanent(
                attacker,
                "CUSTOM_ATTRIBUTE_ALL",
                GetKillAll(attacker),
                true
            )
            self:AddPermanent(
                attacker,
                "CUSTOM_ATTRIBUTE_ATTACK",
                GetKillAttack(attacker),
                true
            )
            self:AddPermanent(
                attacker,
                "CUSTOM_ATTRIBUTE_STRENGTH",
                GetKillAttack(attacker),
                true
            )
            self:GrantGold(
                attacker,
                GetKillGoldFlat(attacker)
            )
        end,
        200,
        self
    )
    Event:Register(
        "damage_event",
        function(____, event)
            if not self:Active(event.attacker) or event.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK or bit.band(event.attack_states or 0, ATTACK_STATES.SKIPCOUNTING) ~= 0 then
                return
            end
            for ____, stat in ipairs({"HEALTH", "ARMOR", "ATTACK", "ALL"}) do
                self:AddPermanent(
                    event.attacker,
                    "CUSTOM_ATTRIBUTE_" .. stat,
                    AthenaProperty(event.attacker, PropertyFunction["ATTACK_" .. stat]),
                    true
                )
            end
        end,
        self
    )
    Event:Register(
        "task_reward",
        function(____, reward)
            if reward.handled or reward.type ~= "TASK_REWARD_TYPE_ATTRIBUTE" then
                return
            end
            local unit = PlayerResource:GetSelectedHeroEntity(reward.playerID)
            if IsValid(unit) then
                reward.handled = self:AddPermanent(unit, reward.name, reward.amount)
            end
        end,
        self
    )
end
function CUnitAttributes.prototype.Track(self, unit)
    if not __TS__ArraySome(
        self.units,
        function(____, record) return record.unit == unit end
    ) then
        local ____self_units_1 = self.units
        ____self_units_1[#____self_units_1 + 1] = {
            unit = unit,
            index = unit:entindex(),
            playerID = unit:GetPlayerOwnerID()
        }
    end
end
function CUnitAttributes.prototype.Key(self, unit, propertyId)
    return PropertyData.configs[propertyId].scope == PropertyScope.PLAYER and unit:GetPlayerOwnerID() or unit:entindex()
end
function CUnitAttributes.prototype.Source(self, unit, attribute)
    return (("athena_permanent:" .. tostring(unit:entindex())) .. ":") .. attribute
end
function CUnitAttributes.prototype.AddPermanent(self, unit, attribute, value, increase)
    if increase == nil then
        increase = false
    end
    local property = ATHENA_PERMANENT_PROPERTIES[attribute]
    if not IsServer() or not IsValid(unit) or not unit:IsRealHero() or property == nil or value ~= value or math.abs(value) == math.huge then
        return false
    end
    if value == 0 then
        return true
    end
    if increase then
        value = value * (1 + GetPlayerAttributeGainPercentage(unit:GetPlayerOwnerID()) * 0.01)
    end
    self:Track(unit)
    local id = PROPERTY_MAP_REVERSE[property]
    local success = PropertySystem:AddStaticProperty(
        self:Key(unit, id),
        id,
        self:Source(unit, attribute),
        self:GetPermanent(unit, attribute) + value
    )
    if success then
        self:Sync(unit)
    end
    return success
end
function CUnitAttributes.prototype.GetPermanent(self, unit, attribute)
    local property = ATHENA_PERMANENT_PROPERTIES[attribute]
    if property == nil then
        return 0
    end
    local id = PROPERTY_MAP_REVERSE[property]
    local key = self:Key(unit, id)
    local scope = PropertyData.configs[id].scope
    local ____temp_2
    if scope == PropertyScope.UNIT then
        ____temp_2 = PropertyData.unitStorage[key]
    else
        ____temp_2 = PropertyData.playerStorage[key]
    end
    local storage = ____temp_2
    local ____opt_5 = storage and storage.static[id]
    local ____opt_3 = ____opt_5 and __TS__ArrayFind(
        storage and storage.static[id],
        function(____, entry) return entry.sourceId == self:Source(unit, attribute) end
    )
    return ____opt_3 and ____opt_3.value or 0
end
function CUnitAttributes.prototype.RefreshItems(self, unit, devoured)
    if not IsServer() or not IsValid(unit) or not unit:IsRealHero() then
        return
    end
    if devoured ~= nil then
        self.devoured[unit:entindex()] = devoured
    end
    local equipped = {}
    do
        local slot = 0
        while slot < 6 do
            local item = unit:GetItemInSlot(slot)
            local ____IsValid_result_13 = IsValid(item)
            if ____IsValid_result_13 then
                local ____opt_11 = KeyValues.items[item:GetAbilityName()]
                if ____opt_11 ~= nil then
                    ____opt_11 = ____opt_11.CustomItemType
                end
                ____IsValid_result_13 = ____opt_11 ~= "CUSTOM_ITEM_TYPE_DIVINE"
            end
            if ____IsValid_result_13 then
                equipped[#equipped + 1] = item
            end
            slot = slot + 1
        end
    end
    local values = {}
    for field, property in pairs(ATHENA_ITEM_PROPERTIES) do
        local id = PROPERTY_MAP_REVERSE[property]
        local aggregation = ATHENA_ITEM_AGGREGATIONS[field]
        local total = 0
        local ____array_14 = __TS__SparseArrayNew(unpack(equipped))
        __TS__SparseArrayPush(
            ____array_14,
            unpack(self.devoured[unit:entindex()] or ({}))
        )
        for ____, item in ipairs({__TS__SparseArraySpread(____array_14)}) do
            do
                if not IsValid(item) then
                    goto __continue46
                end
                local value = item:GetSpecialValueFor(field, unit)
                if aggregation == AggregationStrategy.DECMUL then
                    total = (1 - (1 - total * 0.01) * (1 - value * 0.01)) * 100
                elseif aggregation == AggregationStrategy.MULTIPLY then
                    total = ((1 + total * 0.01) * (1 + value * 0.01) - 1) * 100
                else
                    total = total + value
                end
            end
            ::__continue46::
        end
        values[id] = total
    end
    local previous = self.items[unit:entindex()] or ({})
    local source = "athena_items:" .. tostring(unit:entindex())
    self.items[unit:entindex()] = values
    self:Track(unit)
    for id, value in pairs(values) do
        if (previous[id] or 0) ~= value then
            if value == 0 then
                PropertySystem:RemoveStaticProperty(
                    self:Key(unit, id),
                    source,
                    id
                )
            else
                PropertySystem:AddStaticProperty(
                    self:Key(unit, id),
                    id,
                    source,
                    value
                )
            end
        end
    end
    self:Sync(unit)
end
function CUnitAttributes.prototype.Sync(self, unit)
    local common = unit:FindModifierByName("modifier_common")
    if IsValid(common) then
        common:SyncStats()
    end
end
function CUnitAttributes.prototype.Active(self, unit)
    local session = GameState:GetSession()
    return self.timer ~= nil and session.runId == self.runId and session.state == "GameState_Battle" and IsValid(unit) and unit:IsRealHero() and __TS__ArrayIncludes(
        session.participants,
        unit:GetPlayerOwnerID()
    )
end
function CUnitAttributes.prototype.GrantGold(self, unit, value)
    if value ~= 0 then
        PlayerResource:ModifyGold(
            unit:GetPlayerOwnerID(),
            value,
            true,
            DOTA_ModifyGold_Unspecified
        )
    end
end
function CUnitAttributes.prototype.Grow(self, unit, interval)
    local stats = interval == "SEC" and ({
        "HEALTH",
        "ATTACK",
        "ARMOR",
        "ALL",
        "STRENGTH",
        "AGILITY",
        "INTELLECT"
    }) or ({
        "HEALTH",
        "ATTACK",
        "ALL",
        "INTELLECT",
        "PHYSICAL_DAMAGE",
        "MAGICAL_DAMAGE"
    })
    for ____, stat in ipairs(stats) do
        self:AddPermanent(
            unit,
            "CUSTOM_ATTRIBUTE_" .. stat,
            interval == "MIN" and stat == "INTELLECT" and GetItemIntellectPerMin(unit) or AthenaProperty(unit, PropertyFunction[(stat .. "_PER_") .. interval]),
            true
        )
    end
    if interval == "MIN" then
        self:AddPermanent(
            unit,
            "CUSTOM_ATTRIBUTE_ARMOR",
            GetItemArmorPerMin(unit),
            true
        )
    else
        self:GrantGold(
            unit,
            GetGoldPerSec(unit) + GetPlayerGoldPerSecond(unit:GetPlayerOwnerID())
        )
    end
end
function CUnitAttributes.prototype.Start(self, runId)
    local session = GameState:GetSession()
    if session.runId ~= runId or session.state ~= "GameState_Battle" or self.timer and self.runId == runId then
        return
    end
    self:Stop()
    self.runId = runId
    self.seconds = 0
    for ____, playerID in ipairs(GameState:GetSession().participants) do
        local unit = PlayerResource:GetSelectedHeroEntity(playerID)
        if IsValid(unit) then
            self:Track(unit)
            self:RefreshItems(unit)
        end
    end
    self.timer = Timer:GameTimer(
        1,
        function()
            if GameState:GetSession().runId ~= runId or GameState:GetSession().state ~= "GameState_Battle" then
                self:Stop()
                return
            end
            self.seconds = self.seconds + 1
            for ____, ____value in ipairs(self.units) do
                local unit = ____value.unit
                if self:Active(unit) then
                    self:RefreshItems(unit)
                    self:Grow(unit, "SEC")
                    if self.seconds % 60 == 0 then
                        self:Grow(unit, "MIN")
                    end
                end
            end
            return 1
        end
    )
end
function CUnitAttributes.prototype.Stop(self)
    if self.timer then
        Timer:StopTimer(self.timer)
    end
    self.timer = nil
end
function CUnitAttributes.prototype.Clear(self)
    self:Stop()
    for ____, ____value in ipairs(self.units) do
        local unit = ____value.unit
        local index = ____value.index
        local playerID = ____value.playerID
        local function keyFor(____, id)
            return PropertyData.configs[id].scope == PropertyScope.PLAYER and playerID or index
        end
        local current = EntIndexToHScript(index)
        local function canClear(____, id)
            return PropertyData.configs[id].scope == PropertyScope.PLAYER or not IsValid(current) or current == unit
        end
        for attribute, property in pairs(ATHENA_PERMANENT_PROPERTIES) do
            local id = PROPERTY_MAP_REVERSE[property]
            if canClear(nil, id) then
                PropertySystem:RemoveStaticProperty(
                    keyFor(nil, id),
                    (("athena_permanent:" .. tostring(index)) .. ":") .. attribute,
                    id
                )
            end
        end
        for id in pairs(self.items[index] or ({})) do
            if canClear(nil, id) then
                PropertySystem:RemoveStaticProperty(
                    keyFor(nil, id),
                    "athena_items:" .. tostring(index),
                    id
                )
            end
        end
        if IsValid(unit) then
            self:Sync(unit)
        end
    end
    self.units = {}
    self.items = {}
    self.devoured = {}
    self.killed = {}
end
CUnitAttributes = __TS__DecorateLegacy({reloadable}, CUnitAttributes)
____exports.CUnitAttributes = CUnitAttributes
if UnitAttributes == nil then
    UnitAttributes = __TS__New(____exports.CUnitAttributes)
end
return ____exports
