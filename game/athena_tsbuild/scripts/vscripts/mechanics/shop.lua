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
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["23"] = 1,["24"] = 1,["26"] = 7,["27"] = 8,["28"] = 7,["29"] = 8,["31"] = 8,["32"] = 9,["33"] = 10,["34"] = 11,["35"] = 12,["36"] = 13,["37"] = 14,["38"] = 15,["39"] = 7,["40"] = 17,["41"] = 18,["42"] = 19,["43"] = 19,["45"] = 20,["46"] = 20,["47"] = 20,["48"] = 20,["49"] = 20,["50"] = 21,["55"] = 22,["56"] = 22,["57"] = 22,["58"] = 22,["59"] = 22,["60"] = 22,["63"] = 22,["69"] = 20,["70"] = 20,["71"] = 20,["72"] = 20,["73"] = 24,["74"] = 24,["75"] = 24,["76"] = 24,["77"] = 24,["79"] = 24,["80"] = 24,["81"] = 24,["82"] = 25,["83"] = 25,["84"] = 25,["85"] = 25,["86"] = 25,["88"] = 25,["89"] = 25,["90"] = 25,["91"] = 26,["92"] = 26,["93"] = 26,["94"] = 27,["95"] = 27,["96"] = 28,["99"] = 30,["100"] = 31,["103"] = 32,["104"] = 33,["106"] = 33,["107"] = 33,["112"] = 34,["113"] = 34,["114"] = 34,["115"] = 34,["116"] = 34,["117"] = 34,["118"] = 34,["119"] = 34,["120"] = 34,["121"] = 34,["122"] = 37,["123"] = 26,["124"] = 26,["125"] = 26,["126"] = 39,["127"] = 39,["128"] = 39,["129"] = 39,["130"] = 39,["131"] = 39,["132"] = 39,["133"] = 39,["134"] = 17,["135"] = 41,["136"] = 42,["137"] = 43,["140"] = 44,["141"] = 44,["142"] = 45,["143"] = 46,["144"] = 47,["145"] = 48,["146"] = 48,["147"] = 49,["148"] = 50,["149"] = 51,["150"] = 51,["151"] = 51,["152"] = 51,["153"] = 51,["154"] = 51,["155"] = 51,["156"] = 51,["157"] = 51,["158"] = 51,["159"] = 52,["160"] = 53,["161"] = 53,["166"] = 57,["167"] = 58,["168"] = 59,["169"] = 60,["171"] = 61,["172"] = 62,["173"] = 62,["174"] = 62,["176"] = 62,["178"] = 62,["179"] = 63,["180"] = 63,["181"] = 63,["183"] = 63,["185"] = 63,["186"] = 63,["187"] = 64,["188"] = 66,["189"] = 67,["190"] = 67,["192"] = 69,["193"] = 69,["195"] = 70,["196"] = 70,["198"] = 71,["202"] = 73,["203"] = 73,["206"] = 76,["208"] = 77,["209"] = 77,["210"] = 78,["211"] = 79,["213"] = 80,["214"] = 80,["215"] = 80,["216"] = 80,["217"] = 80,["219"] = 81,["220"] = 81,["221"] = 81,["223"] = 82,["224"] = 82,["225"] = 82,["226"] = 82,["227"] = 82,["228"] = 82,["229"] = 83,["230"] = 83,["231"] = 83,["235"] = 85,["238"] = 77,["241"] = 87,["242"] = 88,["243"] = 41,["244"] = 90,["245"] = 91,["246"] = 90,["247"] = 93,["248"] = 94,["249"] = 95,["250"] = 93,["251"] = 97,["252"] = 97,["253"] = 97,["255"] = 98,["256"] = 98,["259"] = 99,["260"] = 100,["261"] = 100,["263"] = 101,["264"] = 102,["265"] = 102,["267"] = 103,["268"] = 104,["269"] = 104,["270"] = 104,["271"] = 104,["272"] = 104,["273"] = 104,["274"] = 104,["275"] = 104,["276"] = 105,["277"] = 105,["280"] = 107,["281"] = 97,["282"] = 110,["283"] = 111,["284"] = 111,["285"] = 111,["286"] = 112,["287"] = 112,["288"] = 112,["289"] = 112,["290"] = 112,["292"] = 112,["294"] = 112,["296"] = 113,["297"] = 113,["298"] = 113,["299"] = 113,["300"] = 114,["301"] = 114,["302"] = 115,["305"] = 116,["306"] = 116,["307"] = 116,["308"] = 117,["309"] = 117,["311"] = 118,["312"] = 118,["314"] = 118,["316"] = 118,["317"] = 118,["318"] = 118,["319"] = 118,["320"] = 119,["321"] = 119,["322"] = 119,["323"] = 119,["324"] = 116,["325"] = 116,["326"] = 121,["327"] = 121,["328"] = 121,["330"] = 122,["331"] = 122,["334"] = 123,["335"] = 124,["338"] = 125,["339"] = 126,["340"] = 126,["342"] = 127,["343"] = 127,["344"] = 127,["345"] = 127,["346"] = 127,["347"] = 127,["348"] = 127,["349"] = 127,["350"] = 127,["353"] = 127,["355"] = 128,["356"] = 114,["357"] = 130,["358"] = 131,["359"] = 131,["360"] = 131,["361"] = 131,["364"] = 131,["367"] = 132,["369"] = 133,["370"] = 110,["371"] = 135,["372"] = 136,["373"] = 136,["374"] = 136,["375"] = 137,["376"] = 137,["378"] = 138,["379"] = 138,["381"] = 139,["382"] = 139,["383"] = 139,["385"] = 140,["386"] = 141,["387"] = 141,["389"] = 142,["390"] = 142,["392"] = 143,["393"] = 144,["396"] = 150,["397"] = 150,["400"] = 146,["401"] = 147,["402"] = 147,["403"] = 148,["404"] = 148,["406"] = 149,["416"] = 151,["422"] = 152,["423"] = 153,["426"] = 154,["429"] = 154,["435"] = 155,["436"] = 135,["437"] = 157,["438"] = 158,["439"] = 158,["441"] = 159,["442"] = 159,["443"] = 159,["445"] = 160,["446"] = 160,["448"] = 161,["449"] = 161,["450"] = 161,["452"] = 163,["453"] = 163,["454"] = 163,["455"] = 163,["456"] = 163,["457"] = 163,["458"] = 163,["460"] = 164,["461"] = 164,["464"] = 185,["465"] = 185,["467"] = 186,["468"] = 187,["469"] = 187,["470"] = 188,["471"] = 188,["472"] = 189,["475"] = 190,["478"] = 190,["484"] = 191,["485"] = 191,["486"] = 191,["487"] = 191,["488"] = 191,["489"] = 191,["493"] = 193,["496"] = 166,["497"] = 166,["498"] = 166,["500"] = 167,["501"] = 168,["502"] = 168,["503"] = 168,["504"] = 168,["505"] = 168,["506"] = 169,["507"] = 169,["509"] = 169,["511"] = 168,["512"] = 169,["513"] = 169,["514"] = 169,["515"] = 168,["516"] = 168,["517"] = 168,["518"] = 170,["519"] = 170,["520"] = 170,["521"] = 170,["522"] = 171,["523"] = 171,["524"] = 171,["525"] = 171,["526"] = 171,["527"] = 172,["528"] = 172,["529"] = 172,["530"] = 172,["531"] = 172,["532"] = 172,["533"] = 172,["534"] = 172,["535"] = 172,["538"] = 174,["539"] = 175,["540"] = 176,["541"] = 176,["543"] = 176,["545"] = 176,["546"] = 177,["547"] = 178,["550"] = 179,["553"] = 179,["559"] = 180,["560"] = 180,["561"] = 180,["562"] = 180,["563"] = 180,["564"] = 180,["567"] = 181,["570"] = 183,["576"] = 165,["579"] = 157,["580"] = 196,["581"] = 197,["582"] = 198,["584"] = 198,["585"] = 198,["587"] = 198,["589"] = 198,["591"] = 198,["592"] = 198,["594"] = 199,["595"] = 199,["596"] = 200,["597"] = 200,["598"] = 200,["600"] = 201,["602"] = 196,["603"] = 203,["604"] = 204,["605"] = 205,["606"] = 205,["608"] = 203,["609"] = 207,["610"] = 208,["611"] = 208,["612"] = 208,["613"] = 208,["614"] = 208,["615"] = 208,["616"] = 209,["617"] = 207,["618"] = 7,["619"] = 8,["620"] = 213,["621"] = 213});
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
    self.recipeCosts = {}
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
                local fee = self:Price(kv, "gold")
                if fee ~= nil then
                    self.recipeCosts[result] = fee
                end
            end
        end
    end
    local groups = {}
    for group, names in pairs(definitions) do
        local list = {}
        for ____, name in ipairs(__TS__ObjectKeys(names)) do
            do
                local raw = KeyValues.items[name]
                local ____temp_3
                if type(raw) == "table" then
                    ____temp_3 = raw
                else
                    ____temp_3 = {}
                end
                local kv = ____temp_3
                local ____temp_4
                if type(raw) == "table" then
                    ____temp_4 = self:BasePrice(name)
                else
                    ____temp_4 = nil
                end
                local currency = self:Currency(kv)
                local price = ____temp_4
                local entry = {name = name, currency = currency, price = price or 0, ingredients = self.recipes[name] or ({})}
                list[#list + 1] = entry
                if not Items:Supported(name) then
                    goto __continue27
                end
                if price == nil or tonumber(kv.ItemPurchasable) == 0 and currency == "gold" and not self.recipes[name] then
                    goto __continue27
                end
                if price == 0 and not self.recipes[name] then
                    goto __continue27
                end
                self.entries[name] = entry
            end
            ::__continue27::
        end
        if #list > 0 then
            groups[group] = list
        end
    end
    local related = {}
    do
        local depth = 0
        while depth < 12 do
            local added = false
            for name, ingredients in pairs(self.recipes) do
                do
                    if self.entries[name] ~= nil or not __TS__ArraySome(
                        ingredients,
                        function(____, part) return self.entries[part] ~= nil end
                    ) or not Items:Supported(name) then
                        goto __continue35
                    end
                    local price = self:BasePrice(name)
                    if price == nil then
                        goto __continue35
                    end
                    local entry = {
                        name = name,
                        ingredients = ingredients,
                        price = price,
                        currency = self:Currency(KeyValues.items[name])
                    }
                    self.entries[name] = entry
                    related[name] = entry
                    added = true
                end
                ::__continue35::
            end
            if not added then
                break
            end
            depth = depth + 1
        end
    end
    self.running = true
    CustomNetTables:SetTableValue("common", "shop_catalog", {run_id = runId, groups = groups, related = related})
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
    local total = self.recipeCosts[name] or self:Price(kv, "gold") or 0
    if not self.recipes[name] then
        return self:Price(kv, "gold")
    end
    for ____, part in ipairs(self.recipes[name]) do
        local ____self_BasePrice_6 = self.BasePrice
        local ____array_5 = __TS__SparseArrayNew(unpack(path))
        __TS__SparseArrayPush(____array_5, name)
        local price = ____self_BasePrice_6(
            self,
            part,
            {__TS__SparseArraySpread(____array_5)}
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
        local ____temp_7
        if price == nil then
            ____temp_7 = nil
        else
            ____temp_7 = {currency = currency, price = price, materials = materials}
        end
        return ____temp_7
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
                local ____tonumber_10 = tonumber
                local ____opt_8 = KeyValues.items[target]
                if ____opt_8 ~= nil then
                    ____opt_8 = ____opt_8.ItemStackable
                end
                local count = ____tonumber_10(____opt_8) == 1 and math.max(
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
        local total = self.recipeCosts[target] or self:Price(data, "gold") or 0
        if not recipe then
            return total > 0 and total or nil
        end
        for ____, part in ipairs(recipe) do
            local ____array_11 = __TS__SparseArrayNew(unpack(path))
            __TS__SparseArrayPush(____array_11, target)
            local price = fill(
                nil,
                part,
                {__TS__SparseArraySpread(____array_11)}
            )
            if price == nil then
                return
            end
            total = total + price
        end
        return total
    end
    local price = self.recipeCosts[name] or self:Price(kv, "gold") or 0
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
                    local ____total_16 = total
                    local ____temp_15 = Items:SellGold(material)
                    local ____tonumber_14 = tonumber
                    local ____opt_12 = KeyValues.items[material:GetAbilityName()]
                    if ____opt_12 ~= nil then
                        ____opt_12 = ____opt_12.ItemStackable
                    end
                    return ____total_16 + ____temp_15 / (____tonumber_14(____opt_12) == 1 and math.max(
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
                local ____tonumber_19 = tonumber
                local ____opt_17 = KeyValues.items[record.item:GetAbilityName()]
                if ____opt_17 ~= nil then
                    ____opt_17 = ____opt_17.ItemStackable
                end
                if ____tonumber_19(____opt_17) == 1 and record.charges > record.used then
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
    local ____temp_23 = not Items:Owns(hero, item) or item.__sold
    if not ____temp_23 then
        local ____tonumber_22 = tonumber
        local ____opt_20 = KeyValues.items[item:GetAbilityName()]
        if ____opt_20 ~= nil then
            ____opt_20 = ____opt_20.ItemSellable
        end
        ____temp_23 = ____tonumber_22(____opt_20) == 0
    end
    if ____temp_23 then
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
    self.recipeCosts = {}
    CustomNetTables:SetTableValue("common", "shop_catalog", {run_id = self.runId, groups = {}})
end
CShop = __TS__DecorateLegacy({reloadable}, CShop)
____exports.CShop = CShop
if Shop == nil then
    Shop = __TS__New(____exports.CShop)
end
return ____exports
