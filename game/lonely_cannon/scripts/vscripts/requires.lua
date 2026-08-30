local __TSTL_FILE_PATH__ = "requires"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 2,["5"] = 4,["6"] = 5,["7"] = 6,["8"] = 13,["9"] = 14,["10"] = 15,["11"] = 16,["12"] = 17,["13"] = 18});
pcall(require, "encrypt")
require("modifierfunction")
require("framework.index")
require("override.index")
require("modifiers.index")
require("mechanics.index")
if IsServer() then
    require("filter")
    require("service.index")
    require("game")
else
end
