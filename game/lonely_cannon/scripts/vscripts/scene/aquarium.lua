local __TSTL_FILE_PATH__ = "scene/aquarium"
local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 3,["6"] = 4,["7"] = 5,["8"] = 6,["9"] = 7,["10"] = 7,["11"] = 7,["13"] = 7,["14"] = 8,["15"] = 13,["18"] = 16,["19"] = 16,["20"] = 16,["21"] = 17,["22"] = 17,["23"] = 17,["24"] = 17,["25"] = 16,["26"] = 16,["27"] = 5,["28"] = 20,["29"] = 21,["30"] = 21,["31"] = 21,["32"] = 22,["33"] = 21,["34"] = 21,["35"] = 24,["36"] = 25,["37"] = 26,["38"] = 27,["41"] = 20});
particleIDList = {}
entList = {}
function Spawn(self, params)
    for k, v in pairs(KeyValues.collection) do
        local ____v_type_0 = v.type
        if ____v_type_0 == nil then
            ____v_type_0 = ""
        end
        if ____v_type_0 == "fish" then
            local ent = SpawnEntityFromTableSynchronous("prop_dynamic", {targetname = "portraitUnit", origin = "10000 0 0", model = v.model})
            entList[k] = ent:entindex()
        end
    end
    RequestEvent(
        "get_fish_ent",
        function()
            return {
                entindex = thisEntity:entindex(),
                fishEntList = entList
            }
        end
    )
end
function UpdateOnRemove(self, params)
    __TS__ArrayForEach(
        particleIDList,
        function(____, particleID)
            ParticleManager:DestroyParticle(particleID, false)
        end
    )
    for name, entindex in pairs(entList) do
        local ent = EntIndexToHScript(entindex)
        if IsValid(ent) then
            ent:RemoveSelf()
        end
    end
end
