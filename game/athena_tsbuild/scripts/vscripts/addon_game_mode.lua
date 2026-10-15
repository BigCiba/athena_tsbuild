-- [debug fallback] production environment may remove the debug module
if _G.debug == nil then _G.debug = {} end
if _G.debug.traceback == nil then _G.debug.traceback = function(...) return "" end end
if _G.debug.getinfo == nil then _G.debug.getinfo = function(...) return { source = "", what = "" } end end
local __TSTL_FILE_PATH__ = "addon_game_mode"
local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 3,["6"] = 4,["7"] = 5,["8"] = 7,["9"] = 8,["10"] = 9,["11"] = 10,["12"] = 8,["13"] = 13,["14"] = 14,["15"] = 15,["16"] = 16,["17"] = 17,["18"] = 18,["19"] = 19,["22"] = 22,["23"] = 22,["24"] = 22,["25"] = 23,["26"] = 22,["27"] = 22,["30"] = 28,["31"] = 29,["32"] = 30,["33"] = 31,["36"] = 13,["37"] = 55,["38"] = 55,["39"] = 58});
SendToServerConsole("dota_combine_models 0")
Convars:SetBool("dota_combine_models", false)
SendToServerConsole("dota_max_physical_items_purchase_limit 99999")
require("requires")
function Activate()
    print("=== Activate ===")
    CModule:initialize()
end
function Precache(context)
    local precacheAutoList = require("precache_auto")
    for sPrecacheMode in pairs(precacheAutoList) do
        local aList = precacheAutoList[sPrecacheMode]
        if sPrecacheMode == "particle_tool" and (IsInToolsMode() or not IsDedicatedServer()) then
            for _, sResource in ipairs(aList) do
                PrecacheResource("particle", sResource, context)
            end
        else
            __TS__ArrayForEach(
                aList,
                function(____, sResource)
                    PrecacheResource(sPrecacheMode, sResource, context)
                end
            )
        end
    end
    local precacheList = require("precache")
    for sPrecacheMode, list in pairs(precacheList) do
        for _, sResource in ipairs(list) do
            PrecacheResource(sPrecacheMode, sResource, context)
        end
    end
end
function SpawnGroupPrecache(hSpawnGroup, context)
end
require("reload")
