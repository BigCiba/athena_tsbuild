local __TSTL_FILE_PATH__ = "override/CCustomNetTableManager"
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 47,["5"] = 48,["6"] = 49,["8"] = 51,["9"] = 52,["10"] = 52,["11"] = 53,["13"] = 52,["14"] = 52,["15"] = 52,["16"] = 57,["17"] = 58,["18"] = 59,["19"] = 60,["21"] = 62,["22"] = 63,["24"] = 65,["25"] = 66,["26"] = 66,["27"] = 68,["28"] = 69,["31"] = 72,["32"] = 51,["33"] = 74,["34"] = 75,["35"] = 76,["37"] = 78,["38"] = 74,["39"] = 80,["40"] = 81,["41"] = 82,["42"] = 84,["43"] = 80,["44"] = 86,["45"] = 87,["46"] = 89,["47"] = 91,["50"] = 95,["51"] = 96,["52"] = 86,["54"] = 103,["55"] = 104,["56"] = 105,["58"] = 107,["59"] = 108,["60"] = 109,["61"] = 110,["62"] = 111,["64"] = 113,["65"] = 114,["66"] = 114,["67"] = 115,["68"] = 116,["69"] = 116,["70"] = 116,["72"] = 118,["74"] = 120,["75"] = 107,["76"] = 122,["77"] = 123,["78"] = 124,["79"] = 125,["81"] = 127,["83"] = 130,["84"] = 131,["85"] = 132,["86"] = 133,["88"] = 135,["89"] = 136,["90"] = 136,["91"] = 137,["92"] = 139,["93"] = 141,["94"] = 143,["95"] = 143,["96"] = 143,["99"] = 146,["101"] = 148,["102"] = 122,["103"] = 152,["104"] = 153,["105"] = 153,["107"] = 154,["108"] = 154,["109"] = 154,["110"] = 154,["111"] = 155,["112"] = 156,["113"] = 157,["115"] = 152});
if IsServer() then
    if CCustomNetTableManager.SetTableValue_Engine == nil then
        CCustomNetTableManager.SetTableValue_Engine = CCustomNetTableManager.SetTableValue
    end
    CCustomNetTableManager.SetTableValue = function(self, tableName, keyName, value)
        xpcall(
            function()
                if type(value) == "table" then
                end
            end,
            traceback
        )
        local bSuccess = self:SetTableValue_Engine(tableName, keyName, value)
        if bSuccess then
            if CCustomNetTableManager.TablesKeys == nil then
                CCustomNetTableManager.TablesKeys = {}
            end
            if CCustomNetTableManager.TablesKeys[tableName] == nil then
                CCustomNetTableManager.TablesKeys[tableName] = {}
            end
            if value ~= nil and TableFindKey(CCustomNetTableManager.TablesKeys[tableName], keyName) == nil then
                local ____CCustomNetTableManager_TablesKeys_tableName_0 = CCustomNetTableManager.TablesKeys[tableName]
                ____CCustomNetTableManager_TablesKeys_tableName_0[#____CCustomNetTableManager_TablesKeys_tableName_0 + 1] = keyName
            elseif value == nil then
                ArrayRemove(CCustomNetTableManager.TablesKeys[tableName], keyName)
            end
        end
        return bSuccess
    end
    CCustomNetTableManager.GetAllTableKeys = function(self, tableName)
        if CCustomNetTableManager.TablesKeys ~= nil and CCustomNetTableManager.TablesKeys[tableName] ~= nil then
            return shallowcopy(CCustomNetTableManager.TablesKeys[tableName])
        end
        return {}
    end
    CCustomNetTableManager.SetNetData = function(self, tableName, tableKey, value, playerID)
        local keyName = playerID ~= nil and tableKey .. tostring(playerID) or tableKey
        local data = value == nil and "" or json.encode(value)
        CustomNetTables:SetTableValue(tableName, keyName, {data = data})
    end
    CCustomNetTableManager.GetNetData = function(self, tableName, tableKey, playerID)
        local keyName = playerID ~= nil and tostring(tableKey) .. tostring(playerID) or tableKey
        local t = CustomNetTables:GetTableValue(tableName, keyName)
        if t == nil or t.data == nil then
            return
        end
        local a = (json.decode(t.data))
        return a
    end
end
if IsClient() then
    if CCustomNetTableManager.GetTableValue_Engine == nil then
        CCustomNetTableManager.GetTableValue_Engine = CCustomNetTableManager.GetTableValue
    end
    CCustomNetTableManager.GetTableValue = function(self, tableName, keyName)
        local key = (tableName .. ",") .. keyName
        local key2 = GetFrameCount()
        if CCustomNetTableManager.ClientNetTable == nil then
            CCustomNetTableManager.ClientNetTable = {}
        end
        local t
        local ____opt_1 = CCustomNetTableManager.ClientNetTable[key]
        if (____opt_1 and ____opt_1[key2]) == nil then
            CCustomNetTableManager.ClientNetTable[key] = {}
            local ____temp_3 = self:GetTableValue_Engine(tableName, keyName)
            CCustomNetTableManager.ClientNetTable[key][key2] = ____temp_3
            t = ____temp_3
        else
            t = CCustomNetTableManager.ClientNetTable[key][key2]
        end
        return t
    end
    CCustomNetTableManager.GetNetData = function(self, tableName, tableKey, playerID)
        local keyName
        if playerID ~= nil then
            keyName = tableKey + playerID
        else
            keyName = tableKey
        end
        local key = (tableName .. ",") .. tostring(keyName)
        local key2 = GetFrameCount()
        if CCustomNetTableManager.ClientNetData == nil then
            CCustomNetTableManager.ClientNetData = {}
        end
        local t
        local ____opt_4 = CCustomNetTableManager.ClientNetData[key]
        if (____opt_4 and ____opt_4[key2]) == nil then
            CCustomNetTableManager.ClientNetData[key] = {}
            local a = CustomNetTables:GetTableValue(tableName, keyName)
            if a ~= nil and a.data ~= nil then
                local ____temp_6 = (json.decode(a.data))
                CCustomNetTableManager.ClientNetData[key][key2] = ____temp_6
                t = ____temp_6
            end
        else
            t = CCustomNetTableManager.ClientNetData[key][key2]
        end
        return t
    end
    CCustomNetTableManager.GetPlayerServiceNetTable = function(self, tableKey, playerID)
        if playerID == nil then
            playerID = GetLocalPlayerID()
        end
        local data = CustomNetTables:GetTableValue(
            "service",
            tableKey .. tostring(playerID)
        )
        if data ~= nil and data.data ~= nil then
            local kv = json.decode(data.data)
            return kv
        end
    end
end
