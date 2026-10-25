local __TSTL_FILE_PATH__ = "framework/inventory"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["15"] = 6,["16"] = 7,["17"] = 8,["18"] = 8,["19"] = 9,["20"] = 10,["21"] = 11,["22"] = 11,["23"] = 11,["24"] = 11,["25"] = 11,["26"] = 12,["27"] = 13,["28"] = 8,["29"] = 8,["30"] = 8,["31"] = 15,["32"] = 15,["33"] = 16,["34"] = 17,["35"] = 18,["36"] = 15,["37"] = 15,["38"] = 15,["39"] = 6,["40"] = 4,["41"] = 23,["42"] = 23});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 物品引擎过滤器由框架统一持有；具体购买、拾取、转移规则交给玩法。
local CInventory = __TS__Class()
CInventory.name = "CInventory"
__TS__ClassExtends(CInventory, CModule)
function CInventory.prototype.init(self)
    local mode = GameRules:GetGameModeEntity()
    mode:SetItemAddedToInventoryFilter(
        function(____, event)
            local unit = EntIndexToHScript(event.inventory_parent_entindex_const)
            local item = EntIndexToHScript(event.item_entindex_const)
            local data = {
                unit = unit,
                item = item,
                allowed = IsValid(unit) and IsValid(item)
            }
            local errors = Event:Fire("inventory_filter", data)
            return data.allowed and not (errors and #errors)
        end,
        self
    )
    mode:SetExecuteOrderFilter(
        function(____, order)
            local data = {order = order, allowed = true}
            local errors = Event:Fire("inventory_order", data)
            return data.allowed and not (errors and #errors)
        end,
        self
    )
end
CInventory = __TS__DecorateLegacy({reloadable}, CInventory)
if Inventory == nil then
    Inventory = __TS__New(CInventory)
end
return ____exports
