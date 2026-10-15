local __TSTL_FILE_PATH__ = "override/GridNav"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 6,["5"] = 7,["6"] = 8,["7"] = 9,["9"] = 11,["10"] = 7,["11"] = 13,["12"] = 15,["13"] = 16,["14"] = 16,["15"] = 16,["16"] = 16,["17"] = 16,["18"] = 21,["19"] = 22,["20"] = 25,["22"] = 28,["25"] = 31,["26"] = 13});
if IsServer() then
    GridNav.IsValidPosition = function(self, position)
        if not self:IsTraversable(position) or self:IsBlocked(position) then
            return false
        end
        return true
    end
    GridNav.IsHole = function(self, position)
        local startVector = GetGroundPosition(position, nil) + Vector(0, 0, -5000)
        local traceTable = {
            startpos = startVector,
            endpos = startVector + Vector(0, 0, 3000),
            mask = 33570827
        }
        if TraceLine(traceTable) then
            if traceTable.hit then
                return true
            else
                return false
            end
        end
        return false
    end
end
