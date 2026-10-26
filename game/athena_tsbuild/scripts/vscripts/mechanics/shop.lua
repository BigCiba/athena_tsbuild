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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["23"] = 1,["24"] = 1,["26"] = 7,["27"] = 8,["28"] = 7,["29"] = 8,["31"] = 8,["32"] = 9,["33"] = 10,["34"] = 11,["35"] = 12,["36"] = 13,["37"] = 14,["38"] = 15,["39"] = 7,["40"] = 17,["41"] = 18,["42"] = 19,["43"] = 19,["45"] = 20,["46"] = 20,["47"] = 20,["48"] = 20,["49"] = 20,["50"] = 21,["55"] = 22,["56"] = 22,["57"] = 22,["58"] = 22,["59"] = 22,["60"] = 22,["63"] = 22,["69"] = 20,["70"] = 20,["71"] = 20,["72"] = 20,["73"] = 24,["74"] = 24,["75"] = 24,["76"] = 24,["77"] = 24,["79"] = 24,["80"] = 24,["81"] = 24,["82"] = 25,["83"] = 25,["84"] = 25,["85"] = 25,["86"] = 25,["88"] = 25,["89"] = 25,["90"] = 25,["91"] = 26,["92"] = 26,["93"] = 26,["94"] = 27,["95"] = 27,["96"] = 28,["99"] = 30,["100"] = 31,["103"] = 32,["104"] = 33,["106"] = 33,["107"] = 33,["112"] = 34,["113"] = 34,["114"] = 34,["115"] = 34,["116"] = 34,["117"] = 34,["118"] = 34,["119"] = 34,["120"] = 34,["121"] = 34,["122"] = 37,["123"] = 26,["124"] = 26,["125"] = 26,["126"] = 39,["127"] = 39,["128"] = 39,["129"] = 39,["130"] = 39,["131"] = 39,["132"] = 39,["133"] = 39,["134"] = 17,["135"] = 41,["136"] = 42,["137"] = 43,["140"] = 44,["141"] = 44,["142"] = 45,["143"] = 46,["144"] = 47,["145"] = 48,["146"] = 48,["147"] = 49,["148"] = 50,["149"] = 51,["150"] = 51,["151"] = 51,["152"] = 51,["153"] = 51,["154"] = 51,["155"] = 51,["156"] = 51,["157"] = 51,["158"] = 51,["159"] = 52,["160"] = 53,["161"] = 53,["166"] = 57,["167"] = 58,["168"] = 59,["169"] = 60,["171"] = 61,["172"] = 61,["173"] = 61,["175"] = 61,["177"] = 61,["178"] = 61,["179"] = 62,["180"] = 62,["181"] = 62,["183"] = 62,["185"] = 62,["186"] = 62,["187"] = 63,["188"] = 65,["189"] = 66,["190"] = 66,["192"] = 68,["193"] = 68,["195"] = 69,["196"] = 69,["198"] = 70,["202"] = 72,["203"] = 72,["206"] = 75,["208"] = 76,["209"] = 76,["210"] = 77,["211"] = 78,["213"] = 79,["214"] = 79,["215"] = 79,["216"] = 79,["217"] = 79,["219"] = 80,["220"] = 80,["221"] = 80,["223"] = 81,["224"] = 81,["225"] = 81,["226"] = 81,["227"] = 81,["228"] = 81,["229"] = 82,["230"] = 82,["231"] = 82,["235"] = 84,["238"] = 76,["241"] = 86,["242"] = 87,["243"] = 41,["244"] = 89,["245"] = 90,["246"] = 89,["247"] = 92,["248"] = 93,["249"] = 94,["250"] = 92,["251"] = 96,["252"] = 96,["253"] = 96,["255"] = 97,["256"] = 97,["259"] = 98,["260"] = 99,["261"] = 99,["263"] = 100,["264"] = 101,["265"] = 101,["267"] = 102,["268"] = 103,["269"] = 103,["270"] = 103,["271"] = 103,["272"] = 103,["273"] = 103,["274"] = 103,["275"] = 103,["276"] = 104,["277"] = 104,["280"] = 106,["281"] = 96,["282"] = 109,["283"] = 110,["284"] = 110,["285"] = 110,["286"] = 111,["287"] = 111,["288"] = 111,["289"] = 111,["290"] = 111,["292"] = 111,["294"] = 111,["296"] = 112,["297"] = 112,["298"] = 112,["299"] = 112,["300"] = 113,["301"] = 113,["302"] = 114,["305"] = 115,["306"] = 115,["307"] = 115,["308"] = 116,["309"] = 116,["311"] = 117,["312"] = 117,["314"] = 117,["316"] = 117,["317"] = 117,["318"] = 117,["319"] = 117,["320"] = 118,["321"] = 118,["322"] = 118,["323"] = 118,["324"] = 115,["325"] = 115,["326"] = 120,["327"] = 120,["328"] = 120,["330"] = 121,["331"] = 121,["334"] = 122,["335"] = 123,["338"] = 124,["339"] = 125,["340"] = 125,["342"] = 126,["343"] = 126,["344"] = 126,["345"] = 126,["346"] = 126,["347"] = 126,["348"] = 126,["349"] = 126,["350"] = 126,["353"] = 126,["355"] = 127,["356"] = 113,["357"] = 129,["358"] = 130,["359"] = 130,["360"] = 130,["361"] = 130,["364"] = 130,["367"] = 131,["369"] = 132,["370"] = 109,["371"] = 134,["372"] = 135,["373"] = 135,["374"] = 135,["375"] = 136,["376"] = 136,["378"] = 137,["379"] = 137,["381"] = 138,["382"] = 138,["383"] = 138,["385"] = 139,["386"] = 140,["387"] = 140,["389"] = 141,["390"] = 141,["392"] = 142,["393"] = 143,["396"] = 149,["397"] = 149,["400"] = 145,["401"] = 146,["402"] = 146,["403"] = 147,["404"] = 147,["406"] = 148,["416"] = 150,["422"] = 151,["423"] = 152,["426"] = 153,["429"] = 153,["435"] = 154,["436"] = 134,["437"] = 156,["438"] = 157,["439"] = 157,["441"] = 158,["442"] = 158,["443"] = 158,["445"] = 159,["446"] = 159,["448"] = 160,["449"] = 160,["450"] = 160,["452"] = 162,["453"] = 162,["454"] = 162,["455"] = 162,["456"] = 162,["457"] = 162,["458"] = 162,["460"] = 163,["461"] = 163,["464"] = 184,["465"] = 184,["467"] = 185,["468"] = 186,["469"] = 186,["470"] = 187,["471"] = 187,["472"] = 188,["475"] = 189,["478"] = 189,["484"] = 190,["485"] = 190,["486"] = 190,["487"] = 190,["488"] = 190,["489"] = 190,["493"] = 192,["496"] = 165,["497"] = 165,["498"] = 165,["500"] = 166,["501"] = 167,["502"] = 167,["503"] = 167,["504"] = 167,["505"] = 167,["506"] = 168,["507"] = 168,["509"] = 168,["511"] = 167,["512"] = 168,["513"] = 168,["514"] = 168,["515"] = 167,["516"] = 167,["517"] = 167,["518"] = 169,["519"] = 169,["520"] = 169,["521"] = 169,["522"] = 170,["523"] = 170,["524"] = 170,["525"] = 170,["526"] = 170,["527"] = 171,["528"] = 171,["529"] = 171,["530"] = 171,["531"] = 171,["532"] = 171,["533"] = 171,["534"] = 171,["535"] = 171,["538"] = 173,["539"] = 174,["540"] = 175,["541"] = 175,["543"] = 175,["545"] = 175,["546"] = 176,["547"] = 177,["550"] = 178,["553"] = 178,["559"] = 179,["560"] = 179,["561"] = 179,["562"] = 179,["563"] = 179,["564"] = 179,["567"] = 180,["570"] = 182,["576"] = 164,["579"] = 156,["580"] = 195,["581"] = 196,["582"] = 197,["584"] = 197,["585"] = 197,["587"] = 197,["589"] = 197,["591"] = 197,["592"] = 197,["594"] = 198,["595"] = 198,["596"] = 199,["597"] = 199,["598"] = 199,["600"] = 200,["602"] = 195,["603"] = 202,["604"] = 203,["605"] = 204,["606"] = 204,["608"] = 202,["609"] = 206,["610"] = 207,["611"] = 207,["612"] = 207,["613"] = 207,["614"] = 207,["615"] = 207,["616"] = 208,["617"] = 206,["618"] = 7,["619"] = 8,["620"] = 212,["621"] = 212});
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
                local ____temp_3
                if type(raw) == "table" then
                    ____temp_3 = raw
                else
                    ____temp_3 = {}
                end
                local raw = KeyValues.items[name]
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
