local __TSTL_FILE_PATH__ = "service/reconstruct"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 2,["12"] = 2,["13"] = 3,["14"] = 4,["15"] = 4,["16"] = 8,["17"] = 9,["18"] = 10,["19"] = 12,["20"] = 14,["22"] = 16,["23"] = 17,["26"] = 20,["27"] = 8,["28"] = 2,["29"] = 30,["30"] = 30});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CServiceReconstruct = __TS__Class()
CServiceReconstruct.name = "CServiceReconstruct"
__TS__ClassExtends(CServiceReconstruct, CModule)
function CServiceReconstruct.prototype.init(self, reload)
end
function CServiceReconstruct.prototype.ParseMailData(self, data)
    local reconstruct = {}
    for k, v in pairs(data) do
        if v.step == 9 then
            reconstruct[tostring(v.mail_id)] = "nil"
        else
            v.items = (json.decode(v.items))
            reconstruct[tostring(v.mail_id)] = v
        end
    end
    return reconstruct
end
CServiceReconstruct = __TS__DecorateLegacy({reloadable}, CServiceReconstruct)
if ServiceReconstruct == nil then
    ServiceReconstruct = __TS__New(CServiceReconstruct)
end
return ____exports
