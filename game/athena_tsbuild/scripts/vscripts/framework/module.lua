local __TSTL_FILE_PATH__ = "framework/module"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 7,["10"] = 7,["12"] = 8,["13"] = 8,["15"] = 9,["16"] = 15,["17"] = 14,["18"] = 10,["19"] = 10,["20"] = 11,["21"] = 12,["22"] = 11,["23"] = 17,["24"] = 18,["25"] = 18,["26"] = 18,["27"] = 18,["28"] = 18,["29"] = 17,["30"] = 20,["31"] = 21,["32"] = 21,["33"] = 21,["34"] = 21,["35"] = 21,["36"] = 21,["37"] = 21,["38"] = 20,["39"] = 23,["40"] = 24,["41"] = 24,["42"] = 24,["43"] = 24,["44"] = 24,["45"] = 24,["46"] = 24,["47"] = 23,["48"] = 26,["49"] = 27,["50"] = 27,["51"] = 27,["52"] = 27,["53"] = 26,["54"] = 29,["55"] = 31,["56"] = 31,["57"] = 31,["58"] = 31,["59"] = 29,["60"] = 33,["61"] = 33,["62"] = 34,["63"] = 35,["64"] = 35,["65"] = 35,["66"] = 35,["67"] = 34});
if Modules == nil then
    Modules = {}
end
CModule = __TS__Class()
CModule.name = "CModule"
function CModule.prototype.____constructor(self)
    self.isModule = true
    Modules[#Modules + 1] = self
end
function CModule.prototype.init(self, reload)
end
function CModule.prototype.initPriority(self)
    return 0
end
function CModule.prototype.dispose(self)
    __TS__ArraySplice(
        Modules,
        __TS__ArrayIndexOf(Modules, self),
        1
    )
end
function CModule.initialize(self)
    __TS__ArrayForEach(
        __TS__ArraySort(
            Modules,
            function(____, a, b) return b:initPriority() - a:initPriority() end
        ),
        function(____, m) return m:init(false) end
    )
end
function CModule.reload(self)
    __TS__ArrayForEach(
        __TS__ArraySort(
            Modules,
            function(____, a, b) return b:initPriority() - a:initPriority() end
        ),
        function(____, m) return m:init(true) end
    )
end
function CModule.prototype.print(self, ...)
    print(
        (("[" .. self.constructor.name) .. (IsClient() and " Client" or "")) .. "]: ",
        ...
    )
end
function CModule.prototype.error(self, ...)
    print(
        ((("[" .. self.constructor.name) .. " ERROR") .. (IsClient() and " Client" or "")) .. "]: ",
        ...
    )
end
function CModule.prototype.reset(self)
end
function CModule.reset(self)
    __TS__ArrayForEach(
        Modules,
        function(____, m) return m:reset() end
    )
end
