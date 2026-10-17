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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 1,["17"] = 1,["19"] = 5,["20"] = 6,["21"] = 5,["22"] = 6,["24"] = 6,["25"] = 7,["26"] = 8,["27"] = 9,["28"] = 10,["29"] = 11,["30"] = 12,["31"] = 13,["32"] = 14,["33"] = 5,["34"] = 15,["35"] = 16,["36"] = 17,["37"] = 17,["38"] = 17,["39"] = 17,["40"] = 17,["41"] = 18,["42"] = 18,["43"] = 18,["44"] = 18,["45"] = 19,["46"] = 19,["47"] = 19,["49"] = 17,["50"] = 17,["51"] = 17,["52"] = 21,["53"] = 21,["54"] = 21,["55"] = 21,["56"] = 21,["57"] = 21,["58"] = 21,["59"] = 21,["60"] = 21,["61"] = 22,["62"] = 22,["63"] = 22,["64"] = 22,["65"] = 22,["66"] = 22,["67"] = 22,["68"] = 22,["69"] = 22,["70"] = 23,["71"] = 23,["72"] = 23,["73"] = 23,["74"] = 23,["75"] = 23,["76"] = 23,["77"] = 23,["78"] = 23,["79"] = 24,["80"] = 24,["81"] = 24,["82"] = 24,["83"] = 24,["84"] = 24,["86"] = 26,["87"] = 23,["88"] = 23,["89"] = 23,["90"] = 28,["91"] = 28,["92"] = 28,["93"] = 28,["94"] = 28,["95"] = 28,["96"] = 28,["97"] = 28,["98"] = 28,["99"] = 29,["100"] = 29,["101"] = 29,["102"] = 30,["105"] = 31,["106"] = 32,["109"] = 33,["110"] = 34,["111"] = 34,["112"] = 34,["113"] = 35,["114"] = 35,["116"] = 36,["119"] = 29,["120"] = 29,["121"] = 29,["122"] = 39,["123"] = 39,["124"] = 39,["125"] = 39,["126"] = 39,["128"] = 39,["129"] = 39,["130"] = 39,["131"] = 40,["132"] = 40,["133"] = 40,["134"] = 40,["135"] = 40,["137"] = 40,["138"] = 40,["139"] = 40,["140"] = 41,["141"] = 41,["142"] = 41,["143"] = 41,["144"] = 41,["145"] = 41,["146"] = 41,["147"] = 42,["150"] = 44,["153"] = 44,["154"] = 44,["155"] = 45,["156"] = 45,["157"] = 45,["158"] = 45,["159"] = 45,["160"] = 45,["161"] = 46,["162"] = 46,["163"] = 46,["164"] = 46,["165"] = 46,["166"] = 46,["167"] = 48,["168"] = 48,["169"] = 48,["170"] = 48,["171"] = 48,["172"] = 48,["173"] = 49,["174"] = 49,["175"] = 49,["176"] = 49,["177"] = 41,["178"] = 41,["179"] = 41,["180"] = 41,["181"] = 51,["182"] = 51,["183"] = 51,["184"] = 52,["187"] = 54,["188"] = 54,["189"] = 54,["190"] = 54,["191"] = 54,["192"] = 54,["193"] = 54,["195"] = 51,["196"] = 51,["197"] = 51,["198"] = 57,["199"] = 57,["200"] = 57,["201"] = 58,["204"] = 59,["205"] = 60,["206"] = 60,["208"] = 57,["209"] = 57,["210"] = 57,["211"] = 15,["212"] = 63,["213"] = 64,["214"] = 64,["215"] = 64,["216"] = 64,["217"] = 64,["218"] = 64,["219"] = 64,["220"] = 64,["221"] = 64,["222"] = 64,["224"] = 63,["225"] = 66,["226"] = 67,["227"] = 66,["228"] = 69,["229"] = 69,["230"] = 69,["231"] = 71,["232"] = 71,["233"] = 71,["235"] = 72,["236"] = 73,["237"] = 73,["239"] = 74,["240"] = 74,["242"] = 75,["243"] = 75,["245"] = 76,["246"] = 77,["247"] = 78,["248"] = 78,["249"] = 78,["250"] = 78,["251"] = 78,["252"] = 78,["253"] = 79,["254"] = 79,["256"] = 80,["257"] = 71,["258"] = 82,["259"] = 83,["260"] = 84,["261"] = 84,["263"] = 85,["264"] = 85,["265"] = 85,["266"] = 86,["267"] = 86,["268"] = 86,["270"] = 86,["272"] = 86,["273"] = 87,["274"] = 87,["275"] = 87,["276"] = 87,["277"] = 87,["278"] = 87,["279"] = 82,["280"] = 90,["281"] = 91,["284"] = 92,["285"] = 92,["287"] = 93,["289"] = 94,["290"] = 94,["291"] = 95,["292"] = 96,["294"] = 96,["296"] = 96,["298"] = 96,["300"] = 96,["301"] = 96,["303"] = 94,["306"] = 98,["307"] = 99,["308"] = 100,["309"] = 100,["310"] = 101,["311"] = 102,["314"] = 102,["316"] = 102,["318"] = 103,["319"] = 103,["321"] = 104,["322"] = 105,["323"] = 105,["324"] = 106,["325"] = 106,["327"] = 107,["332"] = 109,["334"] = 111,["335"] = 111,["336"] = 112,["337"] = 112,["338"] = 113,["339"] = 113,["340"] = 114,["341"] = 114,["342"] = 114,["343"] = 114,["344"] = 114,["345"] = 114,["347"] = 115,["348"] = 115,["349"] = 115,["350"] = 115,["351"] = 115,["352"] = 115,["356"] = 117,["357"] = 90,["358"] = 119,["359"] = 120,["360"] = 121,["361"] = 121,["363"] = 119,["364"] = 123,["365"] = 124,["366"] = 125,["367"] = 126,["368"] = 126,["369"] = 126,["370"] = 123,["371"] = 128,["372"] = 129,["373"] = 129,["374"] = 129,["375"] = 129,["376"] = 129,["377"] = 129,["378"] = 129,["380"] = 128,["381"] = 131,["382"] = 133,["383"] = 133,["384"] = 133,["385"] = 133,["386"] = 133,["387"] = 133,["388"] = 133,["389"] = 133,["390"] = 133,["391"] = 133,["392"] = 133,["393"] = 133,["394"] = 133,["395"] = 133,["396"] = 133,["397"] = 133,["398"] = 134,["399"] = 134,["400"] = 134,["401"] = 134,["402"] = 134,["403"] = 134,["404"] = 134,["406"] = 136,["407"] = 136,["408"] = 136,["409"] = 136,["410"] = 136,["411"] = 136,["412"] = 136,["414"] = 137,["415"] = 137,["416"] = 137,["417"] = 137,["419"] = 131,["420"] = 139,["421"] = 140,["422"] = 141,["425"] = 142,["426"] = 142,["427"] = 142,["428"] = 142,["429"] = 143,["430"] = 144,["431"] = 145,["432"] = 145,["433"] = 145,["436"] = 139,["437"] = 148,["438"] = 148,["439"] = 148,["440"] = 150,["441"] = 151,["442"] = 152,["443"] = 152,["444"] = 152,["445"] = 152,["446"] = 153,["447"] = 153,["448"] = 153,["449"] = 154,["450"] = 156,["451"] = 156,["452"] = 156,["453"] = 157,["454"] = 158,["455"] = 159,["456"] = 159,["457"] = 159,["458"] = 159,["459"] = 159,["460"] = 159,["463"] = 161,["464"] = 161,["465"] = 161,["466"] = 161,["467"] = 161,["468"] = 161,["469"] = 161,["472"] = 162,["473"] = 162,["476"] = 164,["477"] = 164,["478"] = 164,["479"] = 164,["480"] = 150,["481"] = 5,["482"] = 6,["483"] = 168,["484"] = 168});
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
    self.running = false
    self.runId = 0
    self.lastSecondTick = 0
    self.lastMinuteTick = 0
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
        "tick_time",
        function(____, event)
            if not self.running or event.runId ~= self.runId then
                return
            end
            local key = event.tick_time == 1 and "lastSecondTick" or "lastMinuteTick"
            if event.tick <= self[key] then
                return
            end
            self[key] = event.tick
            for ____, ____value in ipairs(self.units) do
                local unit = ____value.unit
                if self:Active(unit) then
                    if event.tick_time == 1 then
                        self:RefreshItems(unit)
                    end
                    self:Grow(unit, event.tick_time == 1 and "SEC" or "MIN")
                end
            end
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
                    goto __continue53
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
            ::__continue53::
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
    return self.running and session.runId == self.runId and session.state == "GameState_Battle" and IsValid(unit) and unit:IsRealHero() and __TS__ArrayIncludes(
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
    if session.runId ~= runId or session.state ~= "GameState_Battle" or self.running and self.runId == runId then
        return
    end
    self.running = true
    self.runId = runId
    self.lastSecondTick = 0
    self.lastMinuteTick = 0
    for ____, playerID in ipairs(GameState:GetSession().participants) do
        local unit = PlayerResource:GetSelectedHeroEntity(playerID)
        if IsValid(unit) then
            self:Track(unit)
            self:RefreshItems(unit)
        end
    end
end
function CUnitAttributes.prototype.Stop(self)
    self.running = false
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
