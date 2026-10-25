local __TSTL_FILE_PATH__ = "abilities/items/drops/item_bag_of_coin"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 2,["11"] = 2,["12"] = 4,["13"] = 5,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 7,["19"] = 7,["20"] = 8,["21"] = 8,["22"] = 8,["23"] = 8,["24"] = 8,["25"] = 8,["26"] = 8,["28"] = 7,["29"] = 7,["30"] = 6,["31"] = 5,["32"] = 4,["33"] = 5,["35"] = 5});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMItem = ____eom_ability.EOMItem
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
____exports.item_bag_of_coin = __TS__Class()
local item_bag_of_coin = ____exports.item_bag_of_coin
item_bag_of_coin.name = "item_bag_of_coin"
__TS__ClassExtends(item_bag_of_coin, EOMItem)
function item_bag_of_coin.prototype.OnSpellStart(self)
    Items:UsePickup(
        self,
        function(____, hero)
            if RunResources:Modify(
                hero:GetPlayerOwnerID(),
                "gold",
                self:GetSpecialValueFor("gold"),
                self.__itemRunId
            ) then
                Items:SpendCharge(self)
            end
        end
    )
end
item_bag_of_coin = __TS__DecorateLegacy(
    {registerAbility(nil)},
    item_bag_of_coin
)
____exports.item_bag_of_coin = item_bag_of_coin
return ____exports
