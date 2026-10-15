-- [debug fallback] production environment may remove the debug module
if _G.debug == nil then _G.debug = {} end
if _G.debug.traceback == nil then _G.debug.traceback = function(...) return "" end end
if _G.debug.getinfo == nil then _G.debug.getinfo = function(...) return { source = "", what = "" } end end
local __TSTL_FILE_PATH__ = "addon_game_mode_client"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 3,["11"] = 3,["12"] = 5,["13"] = 6,["14"] = 8,["15"] = 10,["16"] = 10,["17"] = 11,["19"] = 11,["20"] = 12,["21"] = 13,["22"] = 14,["23"] = 15,["24"] = 10,["25"] = 16,["26"] = 17,["27"] = 16,["28"] = 19,["29"] = 20,["31"] = 22,["32"] = 22,["33"] = 22,["34"] = 23,["35"] = 22,["36"] = 22,["37"] = 22,["38"] = 25,["39"] = 25,["40"] = 25,["41"] = 26,["42"] = 25,["43"] = 25,["44"] = 25,["45"] = 28,["46"] = 28,["47"] = 28,["48"] = 29,["49"] = 30,["50"] = 31,["51"] = 32,["53"] = 28,["54"] = 28,["55"] = 28,["56"] = 35,["57"] = 35,["58"] = 35,["59"] = 36,["60"] = 37,["61"] = 38,["63"] = 40,["64"] = 41,["66"] = 43,["67"] = 44,["68"] = 44,["70"] = 46,["71"] = 47,["72"] = 48,["77"] = 35,["78"] = 35,["79"] = 35,["80"] = 54,["81"] = 54,["82"] = 54,["83"] = 54,["84"] = 54,["85"] = 54,["86"] = 54,["87"] = 55,["88"] = 55,["89"] = 55,["90"] = 55,["91"] = 55,["92"] = 55,["93"] = 55,["94"] = 56,["95"] = 56,["96"] = 56,["97"] = 56,["98"] = 56,["99"] = 56,["100"] = 56,["101"] = 57,["102"] = 57,["103"] = 57,["104"] = 57,["105"] = 57,["106"] = 57,["107"] = 57,["108"] = 58,["109"] = 58,["110"] = 58,["111"] = 58,["112"] = 58,["113"] = 58,["114"] = 58,["115"] = 19,["116"] = 61,["117"] = 62,["118"] = 63,["119"] = 64,["120"] = 65,["121"] = 66,["122"] = 67,["125"] = 61,["126"] = 71,["127"] = 72,["128"] = 73,["129"] = 74,["130"] = 75,["131"] = 71,["132"] = 77,["133"] = 78,["134"] = 79,["135"] = 80,["136"] = 81,["137"] = 82,["138"] = 83,["140"] = 85,["141"] = 77,["142"] = 87,["143"] = 88,["144"] = 89,["145"] = 90,["146"] = 91,["147"] = 87,["148"] = 93,["149"] = 94,["150"] = 95,["151"] = 96,["152"] = 97,["153"] = 99,["154"] = 100,["156"] = 102,["157"] = 93,["158"] = 104,["159"] = 105,["160"] = 106,["161"] = 108,["162"] = 109,["165"] = 111,["166"] = 112,["167"] = 113,["169"] = 115,["174"] = 119,["175"] = 104,["176"] = 126,["177"] = 127,["178"] = 128,["179"] = 129,["180"] = 130,["182"] = 126,["183"] = 10,["184"] = 142,["185"] = 142,["187"] = 144,["188"] = 145,["190"] = 148,["191"] = 150,["192"] = 151,["193"] = 150});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
SendToConsole("dota_combine_models 0")
Convars:SetBool("dota_combine_models", false)
require("requires")
local MClient = __TS__Class()
MClient.name = "MClient"
__TS__ClassExtends(MClient, CModule)
function MClient.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.keyEvent = {}
    self.abilityKeyEvent = {}
    self.commandUnique = {}
    self.WaitSceneEntityLoadData = {}
end
function MClient.prototype.initPriority(self)
    return 1
end
function MClient.prototype.init(self, bReload)
    if not bReload then
    end
    GameEvent(
        "client_reload_game_keyvalues",
        function()
            KeyValues:Reload()
        end,
        nil
    )
    GameEvent(
        "custom_command_unique",
        function(self, event)
            self.commandUnique[event.command] = event.unique
        end,
        self
    )
    GameEvent(
        "lua_server_to_client",
        function(self, event)
            local eventName = event.event_name
            local data = json.decode(event.data)
            if data ~= nil then
                Event:Fire(eventName, data)
            end
        end,
        self
    )
    GameEvent(
        "wait_scene_entity_load",
        function(self, event)
            local data = event.data
            if self.WaitSceneEntityLoadData == nil then
                self.WaitSceneEntityLoadData = {}
            end
            if self.WaitSceneEntityLoadData[event.name] == nil then
                self.WaitSceneEntityLoadData[event.name] = {}
            end
            if data ~= nil then
                local ____self_WaitSceneEntityLoadData_event_name_0 = self.WaitSceneEntityLoadData[event.name]
                ____self_WaitSceneEntityLoadData_event_name_0[#____self_WaitSceneEntityLoadData_event_name_0 + 1] = {key = event.key, data = data}
            else
                for i, v in ipairs(self.WaitSceneEntityLoadData[event.name]) do
                    if v.key == event.key then
                        table.remove(self.WaitSceneEntityLoadData[event.name], i)
                        break
                    end
                end
            end
        end,
        self
    )
    RequestEvent(
        "register_key_event",
        function(self, ...)
            return self:OnRegisterKeyEvent(...)
        end,
        self
    )
    RequestEvent(
        "unregister_key_event",
        function(self, ...)
            return self:OnUnregisterKeyEvent(...)
        end,
        self
    )
    RequestEvent(
        "register_ability_key_event",
        function(self, ...)
            return self:OnRegisterAbilityKeyEvent(...)
        end,
        self
    )
    RequestEvent(
        "unregister_ability_key_event",
        function(self, ...)
            return self:OnUnregisterAbilityKeyEvent(...)
        end,
        self
    )
    RequestEvent(
        "call_lua_client_function",
        function(self, ...)
            return self:OnCallLuaClientFunction(...)
        end,
        self
    )
end
function MClient.prototype.GetSceneEntityData(self, name)
    local t = self.WaitSceneEntityLoadData[name]
    if t ~= nil and t[1] ~= nil then
        local data = json.decode(t[1].data)
        if data ~= nil then
            table.remove(self.WaitSceneEntityLoadData[name], 1)
            return data
        end
    end
end
function MClient.prototype.OnRegisterKeyEvent(self, eventData)
    local eventName = DoUniqueString(eventData.key_name)
    SendToConsole((("bind " .. eventData.key_name) .. " +") .. eventName)
    self.keyEvent[eventName] = {key_name = eventData.key_name}
    return {unique_name = eventName, event_name = eventData.key_name}
end
function MClient.prototype.OnUnregisterKeyEvent(self, eventData)
    local keyEvent = self.keyEvent[eventData.event_name]
    local success = false
    if keyEvent ~= nil then
        success = true
        __TS__Delete(self.keyEvent, eventData.event_name)
        SendToConsole((("unbind " .. keyEvent.key_name) .. " +") .. eventData.event_name)
    end
    return {success = success}
end
function MClient.prototype.OnRegisterAbilityKeyEvent(self, tEvents)
    local sEventName = DoUniqueString(tEvents.key_name)
    SendToConsole((("bind " .. tEvents.key_name) .. " +") .. sEventName)
    self.abilityKeyEvent[sEventName] = {slot = tEvents.slot, key_name = tEvents.key_name, quick_cast = tEvents.quick_cast}
    return {event_name = sEventName}
end
function MClient.prototype.OnUnregisterAbilityKeyEvent(self, tEvents)
    local tAbilityKeyEvent = self.abilityKeyEvent[tEvents.event_name]
    local bSuccess = false
    if tAbilityKeyEvent ~= nil then
        bSuccess = true
        self.abilityKeyEvent[tEvents.event_name] = nil
        SendToConsole((("unbind " .. tAbilityKeyEvent.key_name) .. " +") .. tEvents.event_name)
    end
    return {success = bSuccess}
end
function MClient.prototype.OnCallLuaClientFunction(self, tEvents)
    local sFunctionName = tEvents.func_name
    local value
    local func = _G[sFunctionName]
    if type(func) == "function" then
        do
            pcall(function()
                local args = json.decode(tEvents.args_json)
                if type(args) == "table" then
                    value = func(unpack(args))
                else
                    value = func()
                end
            end)
        end
    end
    return {value = value}
end
function MClient.prototype.SendToConsole(self, command, ...)
    local unique = self.commandUnique[command]
    if unique ~= nil then
        local t = {command .. unique, ...}
        SendToConsole(table.concat(t, " "))
    end
end
MClient = __TS__DecorateLegacy({reloadable}, MClient)
if Client == nil then
    Client = __TS__New(MClient)
end
if not GameModeActivated then
    CModule:initialize()
end
require("reload")
_G.CalculatePropertyValue = function(propertyId, current, value)
    return PropertySystem:AggregatePropertyValues(propertyId, current, value)
end
return ____exports
