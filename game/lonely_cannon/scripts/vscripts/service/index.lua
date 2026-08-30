local __TSTL_FILE_PATH__ = "service/index"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 1,["12"] = 1,["13"] = 8,["14"] = 9,["15"] = 10,["16"] = 11,["17"] = 12,["18"] = 13,["19"] = 14,["20"] = 15,["21"] = 16,["22"] = 17,["23"] = 18,["24"] = 20,["25"] = 20,["26"] = 21,["28"] = 21,["29"] = 23,["30"] = 24,["31"] = 25,["32"] = 26,["33"] = 20,["34"] = 27,["35"] = 28,["36"] = 27,["37"] = 30,["38"] = 31,["39"] = 31,["40"] = 31,["41"] = 31,["42"] = 31,["43"] = 31,["44"] = 31,["45"] = 32,["47"] = 30,["48"] = 42,["49"] = 43,["50"] = 43,["51"] = 43,["52"] = 44,["53"] = 44,["54"] = 44,["56"] = 44,["57"] = 44,["58"] = 44,["60"] = 44,["61"] = 42,["62"] = 52,["63"] = 53,["64"] = 54,["66"] = 56,["67"] = 57,["69"] = 59,["70"] = 59,["71"] = 59,["72"] = 59,["73"] = 59,["74"] = 59,["75"] = 59,["76"] = 59,["77"] = 59,["78"] = 52,["79"] = 65,["80"] = 66,["81"] = 67,["82"] = 68,["83"] = 73,["84"] = 74,["87"] = 78,["88"] = 79,["89"] = 79,["90"] = 79,["91"] = 80,["92"] = 81,["93"] = 79,["94"] = 79,["96"] = 65,["97"] = 86,["98"] = 87,["99"] = 88,["102"] = 92,["103"] = 93,["104"] = 94,["105"] = 95,["107"] = 98,["108"] = 99,["109"] = 100,["110"] = 86,["111"] = 104,["112"] = 105,["113"] = 106,["114"] = 107,["116"] = 104,["117"] = 110,["118"] = 111,["119"] = 112,["120"] = 113,["121"] = 113,["122"] = 113,["123"] = 114,["124"] = 115,["125"] = 116,["126"] = 117,["127"] = 117,["128"] = 117,["129"] = 117,["130"] = 117,["131"] = 117,["132"] = 117,["133"] = 117,["135"] = 114,["136"] = 123,["137"] = 113,["138"] = 113,["140"] = 110,["141"] = 20,["142"] = 135,["143"] = 135});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("service.reconstruct")
require("service.side_effect")
require("service.config")
require("service.common")
require("service.unread")
require("service.login")
require("service.store")
require("service.data_record")
require("service.draw")
require("service.community")
require("service.player")
local MService = __TS__Class()
MService.name = "MService"
__TS__ClassExtends(MService, CModule)
function MService.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.clickReportBatchSize = 10
    self.clickReportFlushDelay = 5
    self.clickReportQueues = {}
    self.clickReportFlushTimers = {}
end
function MService.prototype.initPriority(self)
    return 10
end
function MService.prototype.init(self, reload)
    GameEvent(
        "game_rules_state_change",
        function(self, ...)
            return self:OnGameRulesStateChange(...)
        end,
        self
    )
    if not reload then
    end
end
function MService.prototype.GetPlayerSetting(self, playerID, key, defaultValue)
    local ____opt_2 = CommonService:GetPlayerServiceNetTable(playerID, "player_key_values")
    local ____opt_0 = ____opt_2 and ____opt_2[key]
    local value = ____opt_0 and ____opt_0.value
    local ____tonumber_result_4 = tonumber(value)
    if ____tonumber_result_4 == nil then
        ____tonumber_result_4 = value
    end
    local ____tonumber_result_4_5 = ____tonumber_result_4
    if ____tonumber_result_4_5 == nil then
        ____tonumber_result_4_5 = defaultValue
    end
    return ____tonumber_result_4_5
end
function MService.prototype.SetPlayerSetting(self, playerID, key, value)
    if value == true then
        value = "TRUE"
    end
    if value == false then
        value = "FALSE"
    end
    CommonService:CallAction(
        "/v1/key/save",
        playerID,
        {
            type = "setting",
            key = key,
            value = tostring(value)
        }
    )
end
function MService.prototype.ReportClick(self, playerID, clickType, detail)
    local queue = self.clickReportQueues[playerID] or ({})
    self.clickReportQueues[playerID] = queue
    queue[#queue + 1] = {click_type = clickType, detail = detail}
    if #queue >= self.clickReportBatchSize then
        self:FlushClickReport(playerID)
        return
    end
    if self.clickReportFlushTimers[playerID] == nil then
        self.clickReportFlushTimers[playerID] = Timer:Timer(
            self.clickReportFlushDelay,
            function()
                __TS__Delete(self.clickReportFlushTimers, playerID)
                self:FlushClickReport(playerID)
            end
        )
    end
end
function MService.prototype.FlushClickReport(self, playerID)
    local queue = self.clickReportQueues[playerID]
    if queue == nil or #queue == 0 then
        return
    end
    local timer = self.clickReportFlushTimers[playerID]
    if timer ~= nil then
        Timer:StopTimer(timer)
        __TS__Delete(self.clickReportFlushTimers, playerID)
    end
    local clickMessages = __TS__ArraySlice(queue)
    self.clickReportQueues[playerID] = {}
    CommonService:CallAction("/v1/click/report", playerID, {click_messages = clickMessages})
end
function MService.prototype.OnGameRulesStateChange(self, events)
    local state = GameRules:State_Get()
    if state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        self:StartHeartBeatTimer()
    end
end
function MService.prototype.StartHeartBeatTimer(self)
    local interval = 60
    if self.heartBeatsTimer == nil then
        self.heartBeatsTimer = Timer:Timer(
            interval,
            function()
                Game:EachPlayer(function(____, playerID)
                    if PlayerResource:GetConnectionState(playerID) == DOTA_CONNECTION_STATE_CONNECTED then
                        CommonService:CallAction("/v1/player/heart_beat", playerID, {})
                        CommonService:HTTP_POST(
                            "https://metric.eomgames.net/heart_beat",
                            playerID,
                            {
                                project = "c1",
                                uid = PlayerResource:GetSteamAccountID(playerID)
                            }
                        )
                    end
                end)
                return interval
            end
        )
    end
end
MService = __TS__DecorateLegacy({reloadable}, MService)
if Service == nil then
    Service = __TS__New(MService)
end
return ____exports
