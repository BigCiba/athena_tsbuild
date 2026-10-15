local __TSTL_FILE_PATH__ = "override/CDOTA_Item_Lua"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 11,["5"] = 13,["6"] = 13});
if IsServer() then
    CDOTA_Item_Lua.OnChargeCountChanged = function(self)
    end
end
