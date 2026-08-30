local __TSTL_FILE_PATH__ = "lib/dota_ts_adapter"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 175,["8"] = 176,["9"] = 176,["10"] = 177,["11"] = 178,["12"] = 181,["13"] = 182,["16"] = 186,["18"] = 175,["19"] = 16,["20"] = 16,["21"] = 16,["23"] = 16,["24"] = 45,["25"] = 45,["26"] = 45,["28"] = 45,["29"] = 51,["31"] = 51,["32"] = 58,["34"] = 58,["35"] = 64,["36"] = 64,["37"] = 64,["39"] = 64,["40"] = 65,["41"] = 72,["42"] = 65,["43"] = 77,["44"] = 77,["45"] = 77,["46"] = 77,["47"] = 80,["48"] = 80,["49"] = 80,["50"] = 80,["51"] = 83,["52"] = 83,["53"] = 83,["54"] = 83,["55"] = 86,["56"] = 87,["57"] = 89,["58"] = 91,["59"] = 92,["60"] = 94,["62"] = 96,["64"] = 100,["65"] = 102,["66"] = 104,["67"] = 106,["68"] = 107,["69"] = 108,["70"] = 109,["71"] = 110,["73"] = 107,["74"] = 91,["75"] = 115,["77"] = 117,["78"] = 119,["79"] = 120,["80"] = 122,["82"] = 124,["84"] = 127,["85"] = 129,["86"] = 131,["87"] = 133,["88"] = 134,["89"] = 135,["90"] = 136,["91"] = 137,["93"] = 134,["94"] = 141,["95"] = 142,["96"] = 143,["97"] = 144,["98"] = 145,["100"] = 147,["101"] = 148,["103"] = 150,["104"] = 151,["107"] = 155,["109"] = 158,["110"] = 159,["112"] = 119,["113"] = 115,["116"] = 167,["117"] = 168,["118"] = 170,["119"] = 171,["120"] = 170,["121"] = 167});
local ____exports = {}
function ____exports.toDotaClassInstance(self, instance, ____table)
    local ____table_0 = ____table
    local prototype = ____table_0.prototype
    while prototype do
        for key in pairs(prototype) do
            if not (rawget(instance, key) ~= nil) then
                instance[key] = prototype[key]
            end
        end
        prototype = getmetatable(prototype)
    end
end
____exports.BaseAbility = __TS__Class()
local BaseAbility = ____exports.BaseAbility
BaseAbility.name = "BaseAbility"
function BaseAbility.prototype.____constructor(self)
end
____exports.BaseItem = __TS__Class()
local BaseItem = ____exports.BaseItem
BaseItem.name = "BaseItem"
function BaseItem.prototype.____constructor(self)
end
function BaseItem.prototype.GetItemIntrinsicModifierName(self)
    return
end
function BaseItem.prototype.GetSuperiorItemList(self)
    return
end
____exports.BaseModifier = __TS__Class()
local BaseModifier = ____exports.BaseModifier
BaseModifier.name = "BaseModifier"
function BaseModifier.prototype.____constructor(self)
end
function BaseModifier.apply(self, target, caster, ability, modifierTable)
    return target:AddNewModifier(caster, ability, self.name, modifierTable)
end
____exports.BaseModifierMotionHorizontal = __TS__Class()
local BaseModifierMotionHorizontal = ____exports.BaseModifierMotionHorizontal
BaseModifierMotionHorizontal.name = "BaseModifierMotionHorizontal"
__TS__ClassExtends(BaseModifierMotionHorizontal, ____exports.BaseModifier)
____exports.BaseModifierMotionVertical = __TS__Class()
local BaseModifierMotionVertical = ____exports.BaseModifierMotionVertical
BaseModifierMotionVertical.name = "BaseModifierMotionVertical"
__TS__ClassExtends(BaseModifierMotionVertical, ____exports.BaseModifier)
____exports.BaseModifierMotionBoth = __TS__Class()
local BaseModifierMotionBoth = ____exports.BaseModifierMotionBoth
BaseModifierMotionBoth.name = "BaseModifierMotionBoth"
__TS__ClassExtends(BaseModifierMotionBoth, ____exports.BaseModifier)
setmetatable(____exports.BaseAbility.prototype, {__index = CDOTA_Ability_Lua or C_DOTA_Ability_Lua})
setmetatable(____exports.BaseItem.prototype, {__index = CDOTA_Item_Lua or C_DOTA_Item_Lua})
setmetatable(____exports.BaseModifier.prototype, {__index = CDOTA_Modifier_Lua or C_DOTA_Modifier_Lua})
____exports.registerAbility = function(____, name) return function(____, ability)
    if name ~= nil then
        ability.name = name
    else
        name = ability.name
    end
    local env = _G
    env[name] = {}
    ____exports.toDotaClassInstance(nil, env[name], ability)
    local originalSpawn = env[name].Spawn
    env[name].Spawn = function(self)
        self:____constructor()
        if originalSpawn then
            originalSpawn(self)
        end
    end
end end
____exports.registerModifier = function(self, name)
    --- NOTE:tstl的插件会将this改为当前文件路径
    local fileName = self
    return function(____, modifier)
        if name ~= nil then
            modifier.name = name
        else
            name = modifier.name
        end
        local env = _G
        env[name] = {}
        ____exports.toDotaClassInstance(nil, env[name], modifier)
        local originalOnCreated = env[name].OnCreated
        env[name].OnCreated = function(self, parameters)
            self:____constructor()
            if originalOnCreated ~= nil then
                originalOnCreated(self, parameters)
            end
        end
        local ____type = LUA_MODIFIER_MOTION_NONE
        local base = modifier.____super
        while base do
            if base == ____exports.BaseModifierMotionBoth then
                ____type = LUA_MODIFIER_MOTION_BOTH
                break
            elseif base == ____exports.BaseModifierMotionHorizontal then
                ____type = LUA_MODIFIER_MOTION_HORIZONTAL
                break
            elseif base == ____exports.BaseModifierMotionVertical then
                ____type = LUA_MODIFIER_MOTION_VERTICAL
                break
            end
            base = base.____super
        end
        if fileName and #fileName > 0 then
            LinkLuaModifier(name, fileName, ____type)
        end
    end
end
--- Use to expose top-level functions in entity scripts.
-- Usage: registerEntityFunction("OnStartTouch", (trigger: TriggerStartTouchEvent) => { <your code here> });
function ____exports.registerEntityFunction(self, name, f)
    local env = getfenv(2)
    env[name] = function(...)
        f(nil, ...)
    end
end
return ____exports
