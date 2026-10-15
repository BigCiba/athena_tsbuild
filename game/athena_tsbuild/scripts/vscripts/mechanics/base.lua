local __TSTL_FILE_PATH__ = "mechanics/base"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["17"] = 11,["18"] = 11,["19"] = 12,["21"] = 12,["22"] = 14,["23"] = 15,["24"] = 11,["25"] = 19,["26"] = 20,["27"] = 21,["28"] = 21,["29"] = 21,["30"] = 21,["31"] = 21,["33"] = 19,["34"] = 28,["35"] = 28,["36"] = 28,["38"] = 29,["39"] = 28,["40"] = 11,["41"] = 37,["42"] = 37});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
--- 功能介绍：
-- 处理基地场景中的基础对象，当前主要用于临时阻挡、演示假人、镜像点和营地入口等地图实体初始化。
-- 
-- 使用方法：
-- 模块初始化时会自动扫描指定命名实体并注册交互；
-- 其他系统可通过全局 Base 访问后续扩展出的基地能力。
local CBase = __TS__Class()
CBase.name = "CBase"
__TS__ClassExtends(CBase, CModule)
function CBase.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.records = {}
    self.dummyList = {}
end
function CBase.prototype.init(self, reload)
    if not reload then
        Event:Register(
            "game_start",
            function(____, event)
            end
        )
    end
end
function CBase.prototype.ChangeDayTime(self, time)
    if time == nil then
        time = "night"
    end
    GameRules:SetTimeOfDay(time == "day" and 0.5 or 1)
end
CBase = __TS__DecorateLegacy({reloadable}, CBase)
if Base == nil then
    Base = __TS__New(CBase)
end
return ____exports
