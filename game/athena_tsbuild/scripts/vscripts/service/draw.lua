local __TSTL_FILE_PATH__ = "service/draw"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 7,["19"] = 10,["20"] = 10,["21"] = 10,["22"] = 11,["23"] = 15,["24"] = 22,["25"] = 22,["26"] = 22,["27"] = 23,["29"] = 26,["30"] = 10,["31"] = 10,["32"] = 29,["33"] = 29,["34"] = 29,["35"] = 30,["36"] = 35,["37"] = 29,["38"] = 29,["39"] = 6,["40"] = 4,["41"] = 46,["42"] = 46});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 后端抽卡
local CServiceDraw = __TS__Class()
CServiceDraw.name = "CServiceDraw"
__TS__ClassExtends(CServiceDraw, CModule)
function CServiceDraw.prototype.init(self, bReload)
    if not bReload then
    end
    RequestEvent(
        "draw_card",
        function(event)
            local result = CommonService:CallActionSync("/v1/draw/card", event.PlayerID, {draw_type = event.count, pool_id = event.id}, {ignoreInvalidResponse = false, showAddItems = false})
            local items_list = {}
            local ____pairs_2 = pairs
            local ____opt_0 = result.data
            for source, items in ____pairs_2(____opt_0 and ____opt_0.add_items or ({})) do
                __TS__ArrayPushArray(items_list, items)
            end
            return {code = result.code or -1, items_list = items_list}
        end
    )
    RequestEvent(
        "change_lucky_choice",
        function(event)
            local result = CommonService:CallActionSync("/v1/draw/card/change_lucky_choice", event.PlayerID, {pool_id = event.pool_id, lucky_choice = event.lucky_choice}, {ignoreInvalidResponse = false, showAddItems = false})
            return {code = result.code or -1}
        end
    )
end
CServiceDraw = __TS__DecorateLegacy({reloadable}, CServiceDraw)
if Community == nil then
    Community = __TS__New(CServiceDraw)
end
return ____exports
