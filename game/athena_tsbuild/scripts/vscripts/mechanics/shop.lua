local __TSTL_FILE_PATH__ = "mechanics/shop"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["23"] = 1,["24"] = 1,["26"] = 7,["27"] = 8,["28"] = 7,["29"] = 8,["31"] = 8,["32"] = 9,["33"] = 10,["34"] = 11,["35"] = 12,["36"] = 13,["37"] = 14,["38"] = 7,["39"] = 16,["40"] = 17,["41"] = 18,["42"] = 18,["44"] = 19,["45"] = 19,["46"] = 19,["47"] = 19,["48"] = 19,["49"] = 20,["54"] = 21,["55"] = 21,["56"] = 21,["57"] = 21,["58"] = 21,["59"] = 21,["62"] = 21,["68"] = 19,["69"] = 19,["70"] = 19,["71"] = 19,["72"] = 23,["73"] = 23,["74"] = 23,["75"] = 23,["76"] = 23,["78"] = 23,["79"] = 23,["80"] = 23,["81"] = 24,["82"] = 24,["83"] = 24,["84"] = 24,["85"] = 24,["87"] = 24,["88"] = 24,["89"] = 24,["90"] = 25,["91"] = 25,["92"] = 25,["93"] = 26,["94"] = 26,["95"] = 27,["98"] = 29,["99"] = 30,["102"] = 31,["103"] = 32,["105"] = 32,["106"] = 32,["111"] = 33,["112"] = 33,["113"] = 33,["114"] = 33,["115"] = 33,["116"] = 33,["117"] = 33,["118"] = 33,["119"] = 33,["120"] = 33,["121"] = 36,["122"] = 25,["123"] = 25,["124"] = 25,["125"] = 38,["126"] = 38,["127"] = 38,["128"] = 38,["129"] = 38,["130"] = 38,["131"] = 38,["132"] = 38,["133"] = 16,["134"] = 40,["135"] = 41,["136"] = 42,["139"] = 43,["140"] = 43,["141"] = 44,["142"] = 45,["143"] = 46,["144"] = 47,["145"] = 47,["146"] = 48,["147"] = 49,["148"] = 49,["149"] = 49,["150"] = 49,["151"] = 49,["152"] = 49,["153"] = 49,["154"] = 49,["155"] = 49,["156"] = 49,["157"] = 49,["161"] = 52,["162"] = 53,["163"] = 54,["164"] = 55,["166"] = 56,["167"] = 56,["169"] = 57,["170"] = 57,["171"] = 57,["172"] = 59,["173"] = 59,["175"] = 60,["176"] = 60,["178"] = 61,["179"] = 62,["180"] = 62,["184"] = 64,["185"] = 64,["188"] = 66,["189"] = 67,["190"] = 40,["191"] = 69,["192"] = 70,["193"] = 69,["194"] = 72,["195"] = 73,["196"] = 74,["197"] = 72,["198"] = 76,["199"] = 76,["200"] = 76,["202"] = 77,["203"] = 77,["206"] = 78,["207"] = 79,["208"] = 79,["210"] = 80,["211"] = 81,["212"] = 81,["214"] = 82,["215"] = 83,["216"] = 83,["217"] = 83,["218"] = 83,["219"] = 83,["220"] = 83,["221"] = 83,["222"] = 83,["223"] = 84,["224"] = 84,["227"] = 86,["228"] = 76,["229"] = 89,["230"] = 90,["231"] = 90,["232"] = 90,["233"] = 91,["234"] = 91,["235"] = 91,["236"] = 91,["237"] = 91,["239"] = 91,["241"] = 91,["243"] = 92,["244"] = 92,["245"] = 92,["246"] = 92,["247"] = 93,["248"] = 93,["249"] = 94,["252"] = 95,["253"] = 95,["254"] = 95,["255"] = 96,["256"] = 96,["258"] = 97,["259"] = 97,["261"] = 97,["263"] = 97,["264"] = 97,["265"] = 97,["266"] = 97,["267"] = 98,["268"] = 98,["269"] = 98,["270"] = 98,["271"] = 95,["272"] = 95,["273"] = 100,["274"] = 100,["275"] = 100,["277"] = 101,["278"] = 101,["281"] = 102,["282"] = 103,["285"] = 104,["286"] = 105,["287"] = 105,["289"] = 106,["290"] = 106,["291"] = 106,["292"] = 106,["293"] = 106,["294"] = 106,["295"] = 106,["296"] = 106,["297"] = 106,["300"] = 106,["302"] = 107,["303"] = 93,["304"] = 109,["305"] = 110,["306"] = 110,["307"] = 110,["308"] = 110,["311"] = 110,["314"] = 111,["316"] = 112,["317"] = 89,["318"] = 114,["319"] = 115,["320"] = 115,["321"] = 115,["322"] = 116,["323"] = 116,["325"] = 117,["326"] = 117,["328"] = 118,["329"] = 118,["330"] = 118,["332"] = 119,["333"] = 120,["334"] = 120,["336"] = 121,["337"] = 121,["339"] = 122,["340"] = 123,["343"] = 129,["344"] = 129,["347"] = 125,["348"] = 126,["349"] = 126,["350"] = 127,["351"] = 127,["353"] = 128,["363"] = 130,["369"] = 131,["370"] = 132,["373"] = 133,["376"] = 133,["382"] = 134,["383"] = 114,["384"] = 136,["385"] = 137,["386"] = 137,["388"] = 138,["389"] = 138,["390"] = 138,["392"] = 139,["393"] = 139,["395"] = 140,["396"] = 140,["397"] = 140,["399"] = 142,["400"] = 142,["401"] = 142,["402"] = 142,["403"] = 142,["404"] = 142,["405"] = 142,["407"] = 143,["408"] = 143,["411"] = 164,["412"] = 164,["414"] = 165,["415"] = 166,["416"] = 166,["417"] = 167,["418"] = 167,["419"] = 168,["422"] = 169,["425"] = 169,["431"] = 170,["432"] = 170,["433"] = 170,["434"] = 170,["435"] = 170,["436"] = 170,["440"] = 172,["443"] = 145,["444"] = 145,["445"] = 145,["447"] = 146,["448"] = 147,["449"] = 147,["450"] = 147,["451"] = 147,["452"] = 147,["453"] = 148,["454"] = 148,["456"] = 148,["458"] = 147,["459"] = 148,["460"] = 148,["461"] = 148,["462"] = 147,["463"] = 147,["464"] = 147,["465"] = 149,["466"] = 149,["467"] = 149,["468"] = 149,["469"] = 150,["470"] = 150,["471"] = 150,["472"] = 150,["473"] = 150,["474"] = 151,["475"] = 151,["476"] = 151,["477"] = 151,["478"] = 151,["479"] = 151,["480"] = 151,["481"] = 151,["482"] = 151,["485"] = 153,["486"] = 154,["487"] = 155,["488"] = 155,["490"] = 155,["492"] = 155,["493"] = 156,["494"] = 157,["497"] = 158,["500"] = 158,["506"] = 159,["507"] = 159,["508"] = 159,["509"] = 159,["510"] = 159,["511"] = 159,["514"] = 160,["517"] = 162,["523"] = 144,["526"] = 136,["527"] = 175,["528"] = 176,["529"] = 177,["531"] = 177,["532"] = 177,["534"] = 177,["536"] = 177,["538"] = 177,["539"] = 177,["541"] = 178,["542"] = 178,["543"] = 179,["544"] = 179,["545"] = 179,["547"] = 180,["549"] = 175,["550"] = 182,["551"] = 183,["552"] = 184,["553"] = 184,["555"] = 182,["556"] = 186,["557"] = 187,["558"] = 187,["559"] = 187,["560"] = 187,["561"] = 187,["562"] = 188,["563"] = 186,["564"] = 7,["565"] = 8,["566"] = 192,["567"] = 192});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 基础商店：商品白名单、服务端报价/配方、幂等交易和引擎商店操作适配。
____exports.CShop = __TS__Class()
local CShop = ____exports.CShop
CShop.name = "CShop"
__TS__ClassExtends(CShop, CModule)
function CShop.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.runId = 0
    self.running = false
    self.entries = {}
    self.recipes = {}
    self.results = {}
    self.busy = {}
end
function CShop.prototype.init(self)
    Event:UnregisterContext(self)
    if self.requestListener ~= nil then
        StopCustomUIEvent(self.requestListener)
    end
    Event:RegisterWithPriority(
        "game_start",
        function(____, ____bindingPattern0)
            local runId
            runId = ____bindingPattern0.runId
            if runId == nil then
                return
            end
            do
                local function ____catch(____error)
                    self.running = false
                    GameState:FinishRun(
                        runId,
                        "error",
                        tostring(____error)
                    )
                end
                local ____try, ____hasReturned = pcall(function()
                    self:Start(runId)
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end,
        220,
        self
    )
    Event:Register(
        "game_end",
        function(____, event)
            if event.run_id == self.runId then
                self.running = false
            end
        end,
        self
    )
    Event:Register(
        "game_reset",
        function(____, event)
            if event.runId == self.runId then
                self:reset()
            end
        end,
        self
    )
    Event:Register(
        "inventory_order",
        function(____, event)
            local order = event.order
            local ____type = order.order_type
            if ____type ~= DOTA_UNIT_ORDER_PURCHASE_ITEM and ____type ~= DOTA_UNIT_ORDER_SELL_ITEM and ____type ~= DOTA_UNIT_ORDER_DISASSEMBLE_ITEM then
                return
            end
            event.allowed = false
            if ____type == DOTA_UNIT_ORDER_DISASSEMBLE_ITEM then
                return
            end
            local hero = Items:Hero(order.issuer_player_id_const, self.runId)
            local ____temp_2 = not hero
            if not ____temp_2 then
                local ____opt_0 = order.units
                ____temp_2 = (____opt_0 and ____opt_0["0"]) ~= hero:entindex()
            end
            if ____temp_2 then
                return
            end
            local result = self:Action(
                order.issuer_player_id_const,
                {
                    run_id = self.runId,
                    request_id = (("native:" .. tostring(order.sequence_number_const)) .. ":") .. tostring(____type),
                    action = ____type == DOTA_UNIT_ORDER_SELL_ITEM and "sell" or "buy",
                    item_name = order.shop_item_name,
                    item_entity = order.entindex_ability
                }
            )
            self:Reply(order.issuer_player_id_const, result)
        end,
        self
    )
    self.requestListener = CustomUIEvent(
        "athena_shop_action",
        function(____, event) return self:Reply(
            event.PlayerID,
            self:Action(event.PlayerID, event)
        ) end,
        self
    )
end
function CShop.prototype.Start(self, runId)
    local session = GameState:GetSession()
    if runId ~= session.runId or session.state ~= "GameState_Battle" or self.runId == runId then
        return
    end
    self:reset()
    self.runId = runId
    local definitions = LoadKeyValues("scripts/npc/kv/gameplay/shops.kv")
    for ____, kv in ipairs(__TS__ObjectValues(KeyValues.items)) do
        if type(kv) == "table" and type(kv.ItemResult) == "string" and type(kv.ItemRequirements) == "table" then
            local requirements = kv.ItemRequirements
            local result = kv.ItemResult
            local row = __TS__ArraySort(__TS__ObjectKeys(requirements))[1]
            if row ~= nil then
                self.recipes[result] = __TS__ArrayFilter(
                    __TS__ArrayMap(
                        __TS__StringSplit(
                            tostring(requirements[row]),
                            ";"
                        ),
                        function(____, name) return __TS__StringTrim(name) end
                    ),
                    function(____, name) return name ~= "" end
                )
            end
        end
    end
    local groups = {}
    for group, names in pairs(definitions) do
        local list = {}
        for ____, name in ipairs(__TS__ObjectKeys(names)) do
            do
                if not Items:Supported(name) then
                    goto __continue26
                end
                local kv = KeyValues.items[name]
                local currency = self:Currency(kv)
                local price = self:BasePrice(name)
                if price == nil or tonumber(kv.ItemPurchasable) == 0 and currency == "gold" and not self.recipes[name] then
                    goto __continue26
                end
                if price == 0 and not self.recipes[name] then
                    goto __continue26
                end
                local entry = {name = name, currency = currency, price = price, ingredients = self.recipes[name] or ({})}
                self.entries[name] = entry
                list[#list + 1] = entry
            end
            ::__continue26::
        end
        if #list > 0 then
            groups[group] = list
        end
    end
    self.running = true
    CustomNetTables:SetTableValue("common", "shop_catalog", {run_id = runId, groups = groups})
end
function CShop.prototype.Currency(self, kv)
    return (tonumber(kv.CrystalCost) or 0) > 0 and "crystal" or ((tonumber(kv.ScoreCost) or 0) > 0 and "score" or "gold")
end
function CShop.prototype.Price(self, kv, currency)
    local value = tonumber(kv[currency == "crystal" and "CrystalCost" or (currency == "score" and "ScoreCost" or "ItemCost")])
    return value ~= nil and value == value and value >= 0 and value < math.huge and value or nil
end
function CShop.prototype.BasePrice(self, name, path)
    if path == nil then
        path = {}
    end
    local kv = KeyValues.items[name]
    if not kv or __TS__ArrayIncludes(path, name) or #path > 12 then
        return
    end
    local currency = self:Currency(kv)
    if currency ~= "gold" then
        return self:Price(kv, currency)
    end
    local total = self:Price(kv, "gold") or 0
    if not self.recipes[name] then
        return self:Price(kv, "gold")
    end
    for ____, part in ipairs(self.recipes[name]) do
        local ____self_BasePrice_4 = self.BasePrice
        local ____array_3 = __TS__SparseArrayNew(unpack(path))
        __TS__SparseArrayPush(____array_3, name)
        local price = ____self_BasePrice_4(
            self,
            part,
            {__TS__SparseArraySpread(____array_3)}
        )
        if price ~= nil and self:Currency(KeyValues.items[part]) == "gold" then
            total = total + price
        end
    end
    return total < math.huge and total or nil
end
function CShop.prototype.Quote(self, hero, name)
    local kv = KeyValues.items[name]
    local currency = self:Currency(kv)
    local materials = {}
    if currency ~= "gold" then
        local price = self:Price(kv, currency)
        local ____temp_5
        if price == nil then
            ____temp_5 = nil
        else
            ____temp_5 = {currency = currency, price = price, materials = materials}
        end
        return ____temp_5
    end
    local inventory = __TS__ArrayFilter(
        Items:Inventory(hero),
        function(____, entry) return entry.slot < 9 end
    )
    local fill
    fill = function(____, target, path)
        if __TS__ArrayIncludes(path, target) or #path > 12 then
            return
        end
        local owned = __TS__ArrayFind(
            inventory,
            function(____, entry)
                if entry.item:GetAbilityName() ~= target then
                    return false
                end
                local ____tonumber_8 = tonumber
                local ____opt_6 = KeyValues.items[target]
                if ____opt_6 ~= nil then
                    ____opt_6 = ____opt_6.ItemStackable
                end
                local count = ____tonumber_8(____opt_6) == 1 and math.max(
                    1,
                    entry.item:GetCurrentCharges()
                ) or 1
                return #__TS__ArrayFilter(
                    materials,
                    function(____, item) return item == entry.item end
                ) < count
            end
        )
        if owned then
            materials[#materials + 1] = owned.item
            return 0
        end
        local data = KeyValues.items[target]
        if not data then
            return
        end
        local recipe = self.recipes[target]
        if not recipe and (tonumber(data.ItemPurchasable) == 0 or self:Currency(data) ~= "gold") then
            return
        end
        local total = self:Price(data, "gold") or 0
        if not recipe then
            return total > 0 and total or nil
        end
        for ____, part in ipairs(recipe) do
            local ____array_9 = __TS__SparseArrayNew(unpack(path))
            __TS__SparseArrayPush(____array_9, target)
            local price = fill(
                nil,
                part,
                {__TS__SparseArraySpread(____array_9)}
            )
            if price == nil then
                return
            end
            total = total + price
        end
        return total
    end
    local price = self:Price(kv, "gold") or 0
    if self.recipes[name] then
        for ____, part in ipairs(self.recipes[name]) do
            local value = fill(nil, part, {name})
            if value == nil then
                return
            end
            price = price + value
        end
    else
        price = self:Price(kv, "gold")
    end
    return price ~= nil and price >= 0 and price < math.huge and ({currency = currency, price = price, materials = materials}) or nil
end
function CShop.prototype.Action(self, playerID, request)
    local function fail(____, ____error)
        return {run_id = request.run_id, request_id = request.request_id, success = false, error = ____error}
    end
    if type(request.request_id) ~= "string" or #request.request_id < 1 or #request.request_id > 96 then
        return fail(nil, "InvalidRequest")
    end
    if not self.running or request.run_id ~= self.runId or self.runId ~= GameState:GetSession().runId then
        return fail(nil, "StaleRun")
    end
    local hero = Items:Hero(playerID, request.run_id)
    if not hero or not hero:IsAlive() then
        return fail(nil, "Unavailable")
    end
    local key = (tostring(playerID) .. ":") .. request.request_id
    if self.results[key] then
        return self.results[key]
    end
    if self.busy[playerID] then
        return fail(nil, "Busy")
    end
    self.busy[playerID] = true
    local ____error
    do
        local function ____catch(cause)
            ____error = "Failed"
            self:error("物品交易失败", cause)
        end
        local ____try, ____hasReturned = pcall(function()
            Items:Sweep()
            if request.action == "buy" then
                ____error = self:Buy(playerID, hero, request.item_name or "")
            elseif request.action == "sell" then
                ____error = self:Sell(playerID, hero, request.item_entity)
            else
                ____error = "InvalidRequest"
            end
        end)
        local ____rethrow
        if not ____try then
            ____try, ____rethrow = pcall(function()
                ____catch(____hasReturned)
            end)
        end
        do
            self.busy[playerID] = false
        end
        if not ____try then
            error(____rethrow, 0)
        end
    end
    local result = {run_id = self.runId, request_id = request.request_id, success = not ____error, error = ____error}
    self.results[key] = result
    do
        local function ____catch(cause)
            self:error("交易后背包同步稍后重试", cause)
        end
        local ____try, ____hasReturned = pcall(function()
            Items:Sweep()
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
    return result
end
function CShop.prototype.Buy(self, id, hero, name)
    if not self.entries[name] or not Items:Supported(name) then
        return "ItemUnavailable"
    end
    local quote = self:Quote(hero, name)
    if not quote then
        return "MissingMaterials"
    end
    if (RunResources:Get(id, quote.currency, self.runId) or -1) < quote.price then
        return "NotEnoughResource"
    end
    local item = Items:Create(id, name, self.runId)
    if not item then
        return "CreateFailed"
    end
    if not Items:Drop(
        item,
        hero:GetAbsOrigin(),
        self.runId
    ) then
        Items:Destroy(item)
        return "CreateFailed"
    end
    local detached = {}
    local paid = false
    do
        local function ____catch(cause)
            if paid then
                RunResources:Modify(id, quote.currency, quote.price, self.runId)
            end
            Items:Destroy(item)
            for ____, record in ipairs(detached) do
                if IsValid(record.item) then
                    local material = record.item
                    material:SetCurrentCharges(record.charges)
                    local restored = false
                    do
                        local function ____catch(____error)
                            self:error("材料放回背包失败，改为落地", ____error)
                        end
                        local ____try, ____hasReturned = pcall(function()
                            restored = Items:TryGive(hero, material, self.runId)
                        end)
                        if not ____try then
                            ____catch(____hasReturned)
                        end
                    end
                    if not restored then
                        Items:Drop(
                            material,
                            hero:GetAbsOrigin(),
                            self.runId
                        )
                    end
                end
            end
            error(cause, 0)
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if not RunResources:Modify(id, quote.currency, -quote.price, self.runId) then
                Items:Destroy(item)
                return true, "NotEnoughResource"
            end
            paid = true
            item.__saleGoldValue = quote.currency == "gold" and quote.price + __TS__ArrayReduce(
                quote.materials,
                function(____, total, material)
                    local ____total_14 = total
                    local ____temp_13 = Items:SellGold(material)
                    local ____tonumber_12 = tonumber
                    local ____opt_10 = KeyValues.items[material:GetAbilityName()]
                    if ____opt_10 ~= nil then
                        ____opt_10 = ____opt_10.ItemStackable
                    end
                    return ____total_14 + ____temp_13 / (____tonumber_12(____opt_10) == 1 and math.max(
                        1,
                        material:GetCurrentCharges()
                    ) or 1)
                end,
                0
            ) or 0
            item.__saleChargeCount = math.max(
                1,
                item:GetCurrentCharges()
            )
            for ____, material in ipairs(quote.materials) do
                if not __TS__ArraySome(
                    detached,
                    function(____, record) return record.item == material end
                ) then
                    detached[#detached + 1] = {
                        item = material,
                        charges = material:GetCurrentCharges(),
                        used = #__TS__ArrayFilter(
                            quote.materials,
                            function(____, part) return part == material end
                        )
                    }
                    hero:TakeItem(material)
                end
            end
            Items:TryGive(hero, item, self.runId)
            for ____, record in ipairs(detached) do
                local ____tonumber_17 = tonumber
                local ____opt_15 = KeyValues.items[record.item:GetAbilityName()]
                if ____opt_15 ~= nil then
                    ____opt_15 = ____opt_15.ItemStackable
                end
                if ____tonumber_17(____opt_15) == 1 and record.charges > record.used then
                    record.item:SetCurrentCharges(record.charges - record.used)
                    local restored = false
                    do
                        local function ____catch(____error)
                            self:error("剩余材料保留在地面", ____error)
                        end
                        local ____try, ____hasReturned = pcall(function()
                            restored = Items:TryGive(hero, record.item, self.runId)
                        end)
                        if not ____try then
                            ____catch(____hasReturned)
                        end
                    end
                    if not restored then
                        Items:Drop(
                            record.item,
                            hero:GetAbsOrigin(),
                            self.runId
                        )
                    end
                else
                    Items:Destroy(record.item)
                end
            end
            return true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function CShop.prototype.Sell(self, id, hero, index)
    local item = EntIndexToHScript(index or -1)
    local ____temp_21 = not Items:Owns(hero, item) or item.__sold
    if not ____temp_21 then
        local ____tonumber_20 = tonumber
        local ____opt_18 = KeyValues.items[item:GetAbilityName()]
        if ____opt_18 ~= nil then
            ____opt_18 = ____opt_18.ItemSellable
        end
        ____temp_21 = ____tonumber_20(____opt_18) == 0
    end
    if ____temp_21 then
        return "CannotSell"
    end
    local refund = Items:SellGold(item)
    item.__sold = true
    if not RunResources:Modify(id, "gold", refund, self.runId) then
        item.__sold = false
        return "Failed"
    end
    Items:Destroy(item)
    return
end
function CShop.prototype.Reply(self, id, result)
    local player = PlayerResource:GetPlayer(id)
    if IsValid(player) then
        CustomGameEventManager:Send_ServerToPlayer(player, "athena_shop_result", result)
    end
end
function CShop.prototype.reset(self)
    self.running = false
    self.results = {}
    self.busy = {}
    self.entries = {}
    self.recipes = {}
    CustomNetTables:SetTableValue("common", "shop_catalog", {run_id = self.runId, groups = {}})
end
CShop = __TS__DecorateLegacy({reloadable}, CShop)
____exports.CShop = CShop
if Shop == nil then
    Shop = __TS__New(____exports.CShop)
end
return ____exports
