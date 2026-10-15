local __TSTL_FILE_PATH__ = "service/store"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["13"] = 1,["14"] = 1,["16"] = 36,["17"] = 36,["18"] = 37,["20"] = 37,["21"] = 39,["22"] = 41,["23"] = 43,["24"] = 45,["25"] = 47,["26"] = 49,["27"] = 51,["28"] = 36,["29"] = 55,["30"] = 56,["31"] = 57,["33"] = 61,["34"] = 61,["35"] = 61,["36"] = 62,["37"] = 63,["38"] = 63,["40"] = 65,["41"] = 65,["42"] = 65,["43"] = 65,["44"] = 65,["45"] = 65,["46"] = 65,["47"] = 65,["48"] = 65,["49"] = 74,["50"] = 75,["51"] = 76,["52"] = 76,["53"] = 76,["54"] = 76,["55"] = 77,["56"] = 78,["57"] = 79,["58"] = 80,["59"] = 80,["60"] = 80,["61"] = 80,["63"] = 80,["64"] = 81,["65"] = 82,["66"] = 82,["67"] = 82,["68"] = 82,["69"] = 83,["71"] = 89,["72"] = 90,["73"] = 91,["74"] = 92,["75"] = 93,["76"] = 93,["77"] = 93,["78"] = 93,["79"] = 93,["80"] = 93,["81"] = 93,["82"] = 93,["83"] = 93,["84"] = 93,["85"] = 93,["86"] = 93,["87"] = 93,["91"] = 108,["92"] = 61,["93"] = 61,["94"] = 61,["95"] = 115,["96"] = 115,["97"] = 115,["98"] = 116,["99"] = 117,["100"] = 121,["101"] = 122,["102"] = 123,["103"] = 124,["104"] = 125,["105"] = 126,["106"] = 127,["108"] = 129,["109"] = 115,["110"] = 115,["111"] = 115,["112"] = 138,["113"] = 138,["114"] = 138,["115"] = 139,["116"] = 140,["117"] = 141,["118"] = 142,["119"] = 143,["121"] = 145,["122"] = 145,["123"] = 145,["124"] = 145,["125"] = 146,["126"] = 147,["127"] = 148,["129"] = 150,["132"] = 138,["133"] = 138,["134"] = 138,["135"] = 155,["136"] = 155,["137"] = 155,["138"] = 156,["139"] = 157,["140"] = 159,["141"] = 160,["142"] = 155,["143"] = 155,["144"] = 155,["145"] = 55,["146"] = 187,["147"] = 188,["148"] = 188,["149"] = 188,["152"] = 190,["153"] = 191,["154"] = 192,["157"] = 195,["158"] = 196,["159"] = 197,["160"] = 198,["161"] = 199,["164"] = 202,["165"] = 203,["166"] = 204,["169"] = 207,["170"] = 208,["177"] = 216,["178"] = 188,["179"] = 188,["180"] = 187,["181"] = 221,["182"] = 222,["183"] = 223,["184"] = 224,["185"] = 226,["186"] = 226,["187"] = 226,["188"] = 226,["189"] = 226,["190"] = 227,["191"] = 228,["192"] = 229,["193"] = 230,["194"] = 231,["195"] = 233,["196"] = 241,["198"] = 226,["199"] = 226,["200"] = 226,["201"] = 244,["203"] = 252,["204"] = 253,["205"] = 254,["207"] = 221,["208"] = 264,["209"] = 265,["212"] = 268,["213"] = 269,["214"] = 270,["216"] = 272,["217"] = 264,["218"] = 36,["219"] = 281,["220"] = 281});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 商城
local CStore = __TS__Class()
CStore.name = "CStore"
__TS__ClassExtends(CStore, CModule)
function CStore.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.orderList = {}
    self.orderStartTimeDelay = 10
    self.orderQueryMaxTime = IsInToolsMode() and 30 or 120
    self.orderQueryInterval = 10
    self.orderQueryFastInterval = 5
    self.orderQueryTimeoutInterval = 30
    self.orderPreCreateList = {}
end
function CStore.prototype.init(self, bReload)
    if not bReload then
        self:startPollingOrders()
    end
    RequestEvent(
        "order_create",
        function(____, event)
            if not __TS__ArrayIncludes(self.orderPreCreateList, event.unique) then
                local ____self_orderPreCreateList_0 = self.orderPreCreateList
                ____self_orderPreCreateList_0[#____self_orderPreCreateList_0 + 1] = event.unique
            end
            local response = CommonService:CallActionSync("/v1/shop/create_order", event.PlayerID, {
                title = event.title,
                body = event.body,
                amounts = event.product_num,
                product_id = event.product_id,
                pay_type = event.pay_type,
                pmid = event.p_mid,
                country = event.country
            }, {commonCallback = false})
            local status = -1
            local data
            print(
                "order_create",
                json.encode(response)
            )
            if response.code == 0 or response.code == 200 then
                status = response.code or -1
                if response.data ~= nil then
                    local ____response_data_payment_order_3 = response.data.payment_order
                    if ____response_data_payment_order_3 == nil then
                        local ____opt_1 = response.data.player_orders
                        ____response_data_payment_order_3 = ____opt_1 and ____opt_1[1]
                    end
                    local paymentOrder = ____response_data_payment_order_3
                    if not (paymentOrder and paymentOrder.order_id) then
                        print(
                            "order_create missing order_id",
                            json.encode(data)
                        )
                        return {status = status, msg = "", data = data}
                    end
                    data = paymentOrder
                    local index = __TS__ArrayIndexOf(self.orderPreCreateList, event.unique)
                    if index ~= -1 then
                        __TS__ArraySplice(self.orderPreCreateList, index, 1)
                        local ____self_orderList_6 = self.orderList
                        ____self_orderList_6[#____self_orderList_6 + 1] = {
                            order = paymentOrder.order_id,
                            pid = event.product_id,
                            amount = event.product_num,
                            playerID = event.PlayerID,
                            time = Time(),
                            count = 0,
                            enable = true,
                            querying = false,
                            query_fast = event.fast == 1,
                            unique = event.unique
                        }
                    end
                end
            end
            return {status = status, msg = "", data = data or ({})}
        end,
        self
    )
    RequestEvent(
        "product_buy",
        function(____, event)
            DeepPrintTable(event)
            local response = CommonService:CallActionSync("/v1/shop/buy", event.PlayerID, {amounts = event.amounts, product_id = event.product_id}, {ignoreInvalidResponse = false, commonCallback = false})
            DeepPrintTable(response)
            local status = -1
            local data = {}
            if response.code == 0 or response.code == 200 then
                status = response.code or -1
                data = response.data
                CommonService:CommonCallback(event.PlayerID, response)
            end
            return {status = status, msg = response.message, data = data}
        end,
        self
    )
    CustomUIEvent(
        "order_pay_choice",
        function(____, event)
            local unique = event.unique
            local state = event.state
            local index = __TS__ArrayIndexOf(self.orderPreCreateList, event.unique)
            if index ~= -1 then
                __TS__ArraySplice(self.orderPreCreateList, index, 1)
            end
            local data = __TS__ArrayFind(
                self.orderList,
                function(____, order) return order.unique == unique end
            )
            if data ~= nil then
                if state == 1 then
                    data.query_fast = true
                else
                    data.query_fast = false
                end
            end
        end,
        self
    )
    CustomUIEvent(
        "order_payway_history",
        function(____, event)
            local playerID = event.PlayerID
            local key = event.key
            CommonService:SetPlayerServiceNetData(playerID, "player_key_values", {order_payway_history = {type = "settings", key = "order_payway_history", value = key}})
            Service:SetPlayerSetting(playerID, "order_payway_history", key)
        end,
        self
    )
end
function CStore.prototype.startPollingOrders(self)
    Timer:Timer(
        1,
        function()
            do
                pcall(function()
                    for i = #self.orderList, 1, -1 do
                        if self.orderList[i].enable == false then
                            table.remove(self.orderList, i)
                        end
                    end
                    local TimeNow = Time()
                    for i, orderData in ipairs(self.orderList) do
                        if orderData.query_fast then
                            if TimeNow >= orderData.time + self.orderQueryFastInterval then
                                self:QueryOrder(orderData)
                            end
                        else
                            if orderData.querying then
                                if TimeNow >= orderData.time + self.orderQueryTimeoutInterval then
                                    self:QueryOrder(orderData)
                                end
                            else
                                if TimeNow >= orderData.time + self.orderQueryInterval then
                                    self:QueryOrder(orderData)
                                end
                            end
                        end
                    end
                end)
            end
            return 1
        end
    )
end
function CStore.prototype.QueryOrder(self, orderData)
    if orderData.count < self.orderQueryMaxTime then
        orderData.count = orderData.count + 1
        orderData.querying = true
        CommonService:CallAction(
            "/v1/shop/query_order",
            orderData.playerID,
            {order_id = orderData.order},
            function(____, playerID, response, url)
                orderData.querying = false
                DeepPrintTable(response)
                if response.code == 0 or response.code == 200 then
                    orderData.enable = false
                    local player = PlayerResource:GetPlayer(orderData.playerID)
                    CustomGameEventManager:Send_ServerToPlayer(player, "order_payed", {state = 1, p_id = orderData.pid, count = orderData.amount, unique = orderData.unique})
                    CommonService:CommonCallback(orderData.playerID, response)
                end
            end,
            false
        )
        orderData.time = Time()
    else
        orderData.enable = false
        local player = PlayerResource:GetPlayer(orderData.playerID)
        CustomGameEventManager:Send_ServerToPlayer(player, "order_payed", {state = 0, p_id = orderData.pid, count = orderData.amount, unique = orderData.unique})
    end
end
function CStore.prototype.parsePurchasedProducts(self, data)
    if not data then
        return
    end
    local reconstruct = {purchased_products = {}}
    for k, v in pairs(data.purchased_products) do
        reconstruct.purchased_products[v.id] = v.purchased_num
    end
    return reconstruct
end
CStore = __TS__DecorateLegacy({reloadable}, CStore)
if Store == nil then
    Store = __TS__New(CStore)
end
return ____exports
