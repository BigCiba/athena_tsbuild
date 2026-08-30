local __TSTL_FILE_PATH__ = "override/CDOTA_Item"
local ____lualib = require("lualib_bundle")
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 15,["8"] = 16,["9"] = 16,["11"] = 17,["12"] = 17,["13"] = 17,["15"] = 18,["16"] = 19,["17"] = 20,["18"] = 21,["19"] = 21,["20"] = 21,["21"] = 22,["22"] = 23,["24"] = 21,["25"] = 21,["27"] = 27,["28"] = 28,["29"] = 29,["31"] = 17,["32"] = 32,["33"] = 33,["35"] = 33,["37"] = 33,["38"] = 33,["39"] = 33,["41"] = 33,["42"] = 32,["43"] = 35,["44"] = 36,["46"] = 36,["48"] = 36,["49"] = 36,["50"] = 36,["52"] = 36,["53"] = 36,["54"] = 36,["55"] = 36,["56"] = 35});
if IsServer() then
    if CDOTA_Item.SetLevel_Engine == nil then
        CDOTA_Item.SetLevel_Engine = CDOTA_Item.SetLevel
    end
    CDOTA_Item.SetLevel = function(self, level, update)
        if update == nil then
            update = true
        end
        self:SetLevel_Engine(level)
        local caster = self:GetCaster()
        if caster.__items ~= nil then
            __TS__ArrayMap(
                caster.__items,
                function(____, data)
                    if data.entIndex == self:entindex() then
                        data.level = self:GetLevel()
                    end
                end
            )
        end
        self:__OnRefresh()
        if update then
            caster:UpdateAbilityNetData()
        end
    end
    CDOTA_Item.GetAccess = function(self)
        local ____opt_0 = KeyValues.items[self:GetAbilityName()]
        if ____opt_0 ~= nil then
            ____opt_0 = ____opt_0.Access
        end
        local ____opt_0_2 = ____opt_0
        if ____opt_0_2 == nil then
            ____opt_0_2 = ""
        end
        return ____opt_0_2
    end
    CDOTA_Item.GetSuits = function(self)
        local ____opt_3 = KeyValues.items[self:GetAbilityName()]
        if ____opt_3 ~= nil then
            ____opt_3 = ____opt_3.Suit
        end
        local ____opt_3_5 = ____opt_3
        if ____opt_3_5 == nil then
            ____opt_3_5 = ""
        end
        return __TS__ArrayFilter(
            __TS__StringSplit(____opt_3_5, "|"),
            function(____, s) return s ~= "" end
        )
    end
end
