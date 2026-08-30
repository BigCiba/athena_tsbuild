local __TSTL_FILE_PATH__ = "service/data_record"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["16"] = 5,["17"] = 7,["18"] = 9,["19"] = 11,["20"] = 13,["21"] = 4,["22"] = 14,["23"] = 15,["24"] = 16,["25"] = 16,["26"] = 16,["27"] = 17,["28"] = 18,["29"] = 16,["30"] = 16,["31"] = 20,["32"] = 20,["33"] = 20,["34"] = 21,["35"] = 22,["37"] = 20,["38"] = 20,["40"] = 14,["41"] = 28,["42"] = 28,["43"] = 28,["45"] = 29,["46"] = 29,["47"] = 29,["49"] = 30,["50"] = 31,["51"] = 32,["52"] = 33,["54"] = 28,["55"] = 40,["56"] = 41,["57"] = 41,["58"] = 42,["59"] = 40,["60"] = 45,["61"] = 45,["62"] = 45,["64"] = 46,["65"] = 47,["66"] = 48,["67"] = 49,["69"] = 45,["70"] = 56,["71"] = 57,["72"] = 58,["73"] = 56,["74"] = 61,["75"] = 61,["76"] = 61,["78"] = 62,["79"] = 62,["80"] = 62,["82"] = 63,["83"] = 64,["84"] = 65,["85"] = 66,["87"] = 61,["88"] = 73,["89"] = 74,["90"] = 74,["91"] = 75,["92"] = 73,["93"] = 78,["94"] = 78,["95"] = 78,["97"] = 79,["98"] = 80,["99"] = 81,["100"] = 82,["102"] = 78,["103"] = 89,["104"] = 90,["105"] = 91,["106"] = 89,["107"] = 4,["108"] = 104,["109"] = 104});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 数据埋点
local CDataRecord = __TS__Class()
CDataRecord.name = "CDataRecord"
__TS__ClassExtends(CDataRecord, CModule)
function CDataRecord.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.playerMatchData = {}
    self.globalMatchData = {}
    self.playerData = {}
    self.globalData = {}
end
function CDataRecord.prototype.init(self, reload)
    if not reload then
        Event:Register(
            "game_start",
            function()
                self.playerMatchData = {}
                self.globalMatchData = {}
            end
        )
        Event:Register(
            "damage_event",
            function(____, params)
                if params.target:IsRealHero() and params.damage > 0 and params.attacker ~= params.target then
                    self:RecordMatchData("HitCount", 1, "add")
                end
            end
        )
    end
end
function CDataRecord.prototype.RecordPlayerMatchData(self, playerID, key, value, method)
    if method == nil then
        method = "add"
    end
    local ____self_playerMatchData_0, ____playerID_1 = self.playerMatchData, playerID
    if ____self_playerMatchData_0[____playerID_1] == nil then
        ____self_playerMatchData_0[____playerID_1] = {}
    end
    if method == "add" and type(value) == "number" then
        self.playerMatchData[playerID][key] = (self.playerMatchData[playerID][key] or 0) + value
    elseif method == "set" then
        self.playerMatchData[playerID][key] = value
    end
end
function CDataRecord.prototype.GetPlayerMatchData(self, playerID, key, defaultVar)
    local ____opt_2 = self.playerMatchData[playerID]
    local val = ____opt_2 and ____opt_2[key]
    return val ~= nil and val or defaultVar
end
function CDataRecord.prototype.RecordMatchData(self, key, value, method)
    if method == nil then
        method = "add"
    end
    if method == "add" and type(value) == "number" then
        self.globalMatchData[key] = (self.globalMatchData[key] or 0) + value
    elseif method == "set" then
        self.globalMatchData[key] = value
    end
end
function CDataRecord.prototype.GetMatchData(self, key, defaultVar)
    local val = self.globalMatchData[key]
    return val ~= nil and val or defaultVar
end
function CDataRecord.prototype.RecordPlayerData(self, playerID, key, value, method)
    if method == nil then
        method = "add"
    end
    local ____self_playerData_4, ____playerID_5 = self.playerData, playerID
    if ____self_playerData_4[____playerID_5] == nil then
        ____self_playerData_4[____playerID_5] = {}
    end
    if method == "add" and type(value) == "number" then
        self.playerData[playerID][key] = (self.playerData[playerID][key] or 0) + value
    elseif method == "set" then
        self.playerData[playerID][key] = value
    end
end
function CDataRecord.prototype.GetPlayerData(self, playerID, key, defaultVar)
    local ____opt_6 = self.playerData[playerID]
    local val = ____opt_6 and ____opt_6[key]
    return val ~= nil and val or defaultVar
end
function CDataRecord.prototype.RecordData(self, key, value, method)
    if method == nil then
        method = "add"
    end
    if method == "add" and type(value) == "number" then
        self.globalData[key] = (self.globalData[key] or 0) + value
    elseif method == "set" then
        self.globalData[key] = value
    end
end
function CDataRecord.prototype.GetData(self, key, defaultVar)
    local val = self.globalData[key]
    return val ~= nil and val or defaultVar
end
CDataRecord = __TS__DecorateLegacy({reloadable}, CDataRecord)
if DataRecord == nil then
    DataRecord = __TS__New(CDataRecord)
end
return ____exports
