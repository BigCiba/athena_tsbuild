local __TSTL_FILE_PATH__ = "class/drop_item"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 4,["10"] = 4,["11"] = 4,["12"] = 19,["13"] = 14,["14"] = 15,["15"] = 16,["16"] = 17,["17"] = 20,["18"] = 21,["19"] = 22,["20"] = 23,["21"] = 24,["22"] = 25,["23"] = 26,["25"] = 28,["26"] = 29,["27"] = 30,["28"] = 30,["29"] = 30,["30"] = 30,["31"] = 34,["32"] = 35,["33"] = 35,["34"] = 35,["36"] = 30,["37"] = 30,["38"] = 30,["39"] = 30,["40"] = 30,["41"] = 30,["42"] = 30,["43"] = 30,["44"] = 30,["45"] = 40,["46"] = 41,["47"] = 42,["48"] = 43,["49"] = 44,["50"] = 45,["51"] = 45,["52"] = 45,["53"] = 45,["54"] = 45,["55"] = 45,["56"] = 45,["57"] = 45,["58"] = 45,["59"] = 46,["60"] = 46,["63"] = 49,["64"] = 50,["65"] = 50,["68"] = 53,["69"] = 54,["70"] = 54,["71"] = 54,["72"] = 56,["73"] = 54,["74"] = 54,["75"] = 19,["76"] = 80,["77"] = 81,["78"] = 82,["79"] = 83,["80"] = 84,["81"] = 85,["82"] = 86,["83"] = 87,["86"] = 90,["87"] = 91,["88"] = 92,["89"] = 93,["90"] = 93,["91"] = 93,["92"] = 93,["93"] = 93,["94"] = 93,["95"] = 93,["96"] = 93,["98"] = 80,["99"] = 104,["100"] = 105,["101"] = 104,["102"] = 108,["103"] = 109,["104"] = 108,["105"] = 111,["106"] = 112,["107"] = 111,["108"] = 116,["109"] = 117,["110"] = 116,["111"] = 121,["112"] = 122,["115"] = 123,["116"] = 124,["117"] = 125,["118"] = 126,["119"] = 128,["120"] = 128,["121"] = 128,["122"] = 129,["123"] = 129,["125"] = 130,["126"] = 132,["127"] = 134,["128"] = 135,["129"] = 136,["131"] = 139,["132"] = 141,["133"] = 142,["134"] = 143,["135"] = 145,["136"] = 128,["137"] = 128,["138"] = 121,["139"] = 149,["140"] = 150,["143"] = 151,["144"] = 153,["145"] = 154,["146"] = 155,["148"] = 157,["149"] = 157,["150"] = 157,["151"] = 158,["152"] = 157,["153"] = 157,["154"] = 160,["155"] = 149,["156"] = 5});
local ____exports = {}
local ____entity_pool = require("class.entity_pool")
local EntityPool = ____entity_pool.EntityPool
____exports.DropItem = __TS__Class()
local DropItem = ____exports.DropItem
DropItem.name = "DropItem"
function DropItem.prototype.____constructor(self, itemName, position, playerID)
    self.isDispose = false
    self.isLanded = false
    self.Quantitylimit = 9999999
    self.particleIDs = {}
    self.itemName = itemName
    self.position = position
    self.playerID = playerID
    self.id = DoUniqueString(itemName)
    local kv = KeyValues.items[itemName]
    if kv.Quantitylimit ~= nil and kv.Quantitylimit ~= "" then
        self.Quantitylimit = toFiniteNumber(kv.Quantitylimit)
    end
    local model = ____exports.DropItem:GetModel(kv)
    self.entityPoolKey = ____exports.DropItem:GetEntityPoolKey(model, kv.Skin)
    local ____EntityPool_4 = EntityPool
    local ____EntityPool_Acquire_5 = EntityPool.Acquire
    local ____self_entityPoolKey_2 = self.entityPoolKey
    local ____exports_DropItem_Classname_3 = ____exports.DropItem.Classname
    local ____position_1 = position
    local ____kv_Skin_0 = kv.Skin
    if ____kv_Skin_0 == nil then
        ____kv_Skin_0 = "default"
    end
    self.entity = ____EntityPool_Acquire_5(____EntityPool_4, ____self_entityPoolKey_2, ____exports_DropItem_Classname_3, {
        angles = "0 -90 0",
        model = model,
        origin = ____position_1,
        skin = ____kv_Skin_0,
        targetname = self.id,
        StartingAnim = "ACT_DOTA_IDLE",
        StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
    })
    if kv.Particle ~= nil then
        if self.playerID ~= nil then
            local player = PlayerResource:GetPlayer(self.playerID)
            if player ~= nil then
                local particleID = ParticleManager:CreateParticleForPlayer(kv.Particle, PATTACH_ABSORIGIN_FOLLOW, self.entity, player)
                ParticleManager:SetParticleControlEnt(
                    particleID,
                    1,
                    self.entity,
                    PATTACH_INVALID,
                    nil,
                    self.entity:GetAbsOrigin(),
                    true
                )
                local ____self_particleIDs_6 = self.particleIDs
                ____self_particleIDs_6[#____self_particleIDs_6 + 1] = particleID
            end
        else
            local particleID = ParticleManager:CreateParticleForce(kv.Particle, PATTACH_ABSORIGIN_FOLLOW, self.entity)
            local ____self_particleIDs_7 = self.particleIDs
            ____self_particleIDs_7[#____self_particleIDs_7 + 1] = particleID
        end
    end
    local entity = self.entity
    entity:GameTimer(
        0.1,
        function()
            self:StartDropAnimation(entity)
        end
    )
end
function DropItem.Prewarm(self)
    local models = {}
    for itemName in pairs(KeyValues.items) do
        if itemName ~= "Version" then
            local kv = KeyValues.items[itemName]
            local model = ____exports.DropItem:GetModel(kv)
            local skin = kv.Skin
            models[____exports.DropItem:GetEntityPoolKey(model, skin)] = {model = model, skin = skin}
        end
    end
    for key in pairs(models) do
        local entry = models[key]
        local count = entry.model == ____exports.DropItem:GetModel(KeyValues.items.item_coin_stack) and 100 or 1
        EntityPool:Prewarm(key, ____exports.DropItem.Classname, {
            angles = "0 -90 0",
            model = entry.model,
            skin = entry.skin or "default",
            targetname = "pooled_drop_item",
            StartingAnim = "ACT_DOTA_IDLE",
            StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
        }, count)
    end
end
function DropItem.GetModel(self, kv)
    return (kv.Model == nil or kv.Model == "") and "models/development/invisiblebox.vmdl" or kv.Model
end
function DropItem.GetEntityPoolKey(self, model, skin)
    return ((("drop_item:" .. model) .. ":") .. (skin or "default")) .. ":0,-90,0:ACT_DOTA_IDLE"
end
function DropItem.prototype.GetEntityIndex(self)
    return self.entity:GetEntityIndex()
end
function DropItem.prototype.IsLanded(self)
    return self.isLanded
end
function DropItem.prototype.StartDropAnimation(self, entity)
    if self.isDispose or self.entity ~= entity then
        return
    end
    local initialPos = self.position
    local startTime = GameRules:GetGameTime()
    local duration = 0.5
    local peakHeight = 180
    entity:GameTimer(
        0,
        function()
            if self.isDispose or self.entity ~= entity then
                return nil
            end
            local elapsed = GameRules:GetGameTime() - startTime
            if elapsed >= duration then
                self.entity:SetLocalOrigin(initialPos)
                self.isLanded = true
                return nil
            end
            local t = elapsed / duration
            local offsetZ = 4 * peakHeight * t * (1 - t)
            local newPos = Vector(initialPos.x, initialPos.y, initialPos.z + offsetZ)
            self.entity:SetLocalOrigin(newPos)
            return 0
        end
    )
end
function DropItem.prototype.dispose(self)
    if self.isDispose then
        return
    end
    self.isDispose = true
    if IsValid(self.entity) then
        EntityPool:Release(self.entityPoolKey, self.entity)
        self.entity = nil
    end
    __TS__ArrayForEach(
        self.particleIDs,
        function(____, id)
            ParticleManager:DestroyParticle(id, true)
        end
    )
    self.particleIDs = {}
end
DropItem.Classname = "dota_prop_customtexture"
return ____exports
