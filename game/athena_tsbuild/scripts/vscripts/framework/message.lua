local __TSTL_FILE_PATH__ = "framework/message"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["16"] = 7,["19"] = 11,["20"] = 13,["21"] = 5,["22"] = 3,["23"] = 21,["24"] = 21});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MMessage = __TS__Class()
MMessage.name = "MMessage"
__TS__ClassExtends(MMessage, CModule)
function MMessage.prototype.SendGameplayText(self, playerID, text)
    local player = PlayerResource:GetPlayer(playerID)
    if player == nil then
        return
    end
    local toastData = {text = text}
    CustomGameEventManager:Send_ServerToPlayer(player, "ReceiveGameplayText", toastData)
end
MMessage = __TS__DecorateLegacy({reloadable}, MMessage)
if Message == nil then
    Message = __TS__New(MMessage)
end
return ____exports
