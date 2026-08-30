local __TSTL_FILE_PATH__ = "framework/notification"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["12"] = 4,["13"] = 4,["14"] = 5,["15"] = 7,["16"] = 8,["17"] = 9,["20"] = 11,["21"] = 11,["22"] = 12,["23"] = 11,["26"] = 7,["27"] = 16,["28"] = 16,["29"] = 16,["31"] = 17,["32"] = 18,["33"] = 19,["35"] = 16,["36"] = 23,["37"] = 24,["38"] = 23,["39"] = 26,["40"] = 27,["41"] = 28,["42"] = 29,["44"] = 26,["45"] = 32,["46"] = 33,["47"] = 32,["48"] = 35,["49"] = 36,["50"] = 37,["51"] = 38,["53"] = 35,["54"] = 41,["55"] = 42,["56"] = 43,["57"] = 44,["59"] = 46,["60"] = 47,["62"] = 49,["63"] = 55,["64"] = 41,["65"] = 57,["66"] = 58,["67"] = 59,["69"] = 61,["70"] = 66,["71"] = 57,["72"] = 68,["73"] = 69,["74"] = 70,["75"] = 71,["77"] = 73,["78"] = 74,["80"] = 76,["81"] = 82,["82"] = 68,["83"] = 84,["84"] = 85,["85"] = 86,["87"] = 88,["88"] = 93,["89"] = 84,["90"] = 95,["91"] = 96,["92"] = 97,["93"] = 98,["95"] = 95,["96"] = 103,["97"] = 104,["98"] = 105,["99"] = 106,["100"] = 107,["101"] = 108,["103"] = 103,["104"] = 112,["105"] = 113,["106"] = 114,["107"] = 115,["109"] = 112,["110"] = 4,["111"] = 122,["112"] = 122});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 通知系统模块
local CNotification = __TS__Class()
CNotification.name = "CNotification"
__TS__ClassExtends(CNotification, CModule)
function CNotification.prototype.init(self, bReload)
    if not bReload then
        self.tPlayersChatLineCount = {}
    end
    do
        local index = 0
        while index < DOTA_MAX_PLAYERS do
            self.tPlayersChatLineCount[index] = 2
            index = index + 1
        end
    end
end
function CNotification.prototype.ShowPlaceName(self, iPlayerID, text, duration)
    if duration == nil then
        duration = 2
    end
    local player = PlayerResource:GetPlayer(iPlayerID)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "ShowPlaceName", {text = text, duration = duration})
    end
end
function CNotification.prototype.Upper(self, tParams)
    CustomGameEventManager:Send_ServerToAllClients("notification_upper", tParams)
end
function CNotification.prototype.UpperToPlayer(self, iPlayerID, tParams)
    local player = PlayerResource:GetPlayer(iPlayerID)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "notification_upper", tParams)
    end
end
function CNotification.prototype.Combat(self, tParams)
    CustomGameEventManager:Send_ServerToAllClients("notification_combat", tParams)
end
function CNotification.prototype.CombatToPlayer(self, iPlayerID, tParams)
    local player = PlayerResource:GetPlayer(iPlayerID)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "notification_combat", tParams)
    end
end
function CNotification.prototype.CombatResource(self, tParams, tResourceSum)
    local list = {}
    for key, value in pairs(tResourceSum) do
        list[#list + 1] = {key, value}
    end
    if not tParams.message then
        tParams.message = "DrawReward_AllPlayer_Custom_Resources"
    end
    tParams.array_get = {type = "$0 $1", split = " / ", param_type = {"resource", "b_int"}, list = list}
    self:Combat(tParams)
end
function CNotification.prototype.CombatAttribute(self, tParams, tAttributesSum)
    if not tParams.message then
        tParams.message = "DrawReward_AttributeTotal"
    end
    tParams.array_get = {type = "custom_variable", split = " / ", list = tAttributesSum}
    self:Combat(tParams)
end
function CNotification.prototype.CombatResourceToPlayer(self, iPlayerID, tParams, tResourceSum)
    local list = {}
    for key, value in pairs(tResourceSum) do
        list[#list + 1] = {key, value}
    end
    if not tParams.message then
        tParams.message = "DrawReward_Custom_Resources"
    end
    tParams.array_get = {type = "$0 $1", split = " / ", param_type = {"resource", "b_int"}, list = list}
    self:CombatToPlayer(iPlayerID, tParams)
end
function CNotification.prototype.CombatAttributeToPlayer(self, iPlayerID, tParams, tAttributesSum)
    if not tParams.message then
        tParams.message = "DrawReward_AttributeTotal"
    end
    tParams.array_get = {type = "custom_variable", split = " / ", list = tAttributesSum}
    self:CombatToPlayer(iPlayerID, tParams)
end
function CNotification.prototype.ChatLine(self, tParams)
    local iPlayerID = tParams.player_id
    if type(iPlayerID) == "number" and PlayerResource:IsValidPlayerID(iPlayerID) then
        CustomGameEventManager:Send_ServerToAllClients("notification_chat_line", tParams)
    end
end
function CNotification.prototype.HelpTip(self, iPlayerID, tContent)
    local player = PlayerResource:GetPlayer(iPlayerID)
    tContent.flDuration = tContent.flDuration or 5
    tContent.sDirection = tContent.sDirection or "top"
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "notification_help", tContent)
    end
end
function CNotification.prototype.CloseHelpTip(self, iPlayerID, sPanelID)
    local player = PlayerResource:GetPlayer(iPlayerID)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "notification_close_help", {sPanelID = sPanelID})
    end
end
CNotification = __TS__DecorateLegacy({reloadable}, CNotification)
if Notification == nil then
    Notification = __TS__New(CNotification)
end
return ____exports
