local __TSTL_FILE_PATH__ = "override/CEntityInstance"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 4,["5"] = 5,["6"] = 6,["7"] = 6,["8"] = 6,["9"] = 6,["10"] = 9,["12"] = 4});
CEntityInstance.Remove = function(self)
    if IsValid(self) then
        FireGameEvent(
            "custom_entity_removed",
            {entindex = self:entindex()}
        )
        self:RemoveSelf()
    end
end
