local __TSTL_FILE_PATH__ = "service/data_record"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["16"] = 5,["17"] = 7,["18"] = 9,["19"] = 11,["20"] = 13,["21"] = 4,["22"] = 15,["23"] = 15,["24"] = 15,["25"] = 15,["26"] = 16,["27"] = 17,["28"] = 18,["29"] = 18,["30"] = 18,["31"] = 19,["32"] = 18,["33"] = 18,["34"] = 21,["35"] = 21,["36"] = 21,["37"] = 22,["38"] = 23,["40"] = 21,["41"] = 21,["43"] = 16,["44"] = 29,["45"] = 29,["46"] = 29,["48"] = 30,["49"] = 30,["50"] = 30,["52"] = 31,["53"] = 32,["54"] = 33,["55"] = 34,["57"] = 29,["58"] = 41,["59"] = 42,["60"] = 42,["61"] = 43,["62"] = 41,["63"] = 46,["64"] = 46,["65"] = 46,["67"] = 47,["68"] = 48,["69"] = 49,["70"] = 50,["72"] = 46,["73"] = 57,["74"] = 58,["75"] = 59,["76"] = 57,["77"] = 62,["78"] = 62,["79"] = 62,["81"] = 63,["82"] = 63,["83"] = 63,["85"] = 64,["86"] = 65,["87"] = 66,["88"] = 67,["90"] = 62,["91"] = 74,["92"] = 75,["93"] = 75,["94"] = 76,["95"] = 74,["96"] = 79,["97"] = 79,["98"] = 79,["100"] = 80,["101"] = 81,["102"] = 82,["103"] = 83,["105"] = 79,["106"] = 90,["107"] = 91,["108"] = 92,["109"] = 90,["110"] = 4,["111"] = 105,["112"] = 105});
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
function CDataRecord.prototype.reset(self)
    self.playerMatchData = {}
    self.globalMatchData = {}
end
function CDataRecord.prototype.init(self, reload)
    if not reload then
        Event:Register(
            "game_start",
            function()
                self:reset()
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
