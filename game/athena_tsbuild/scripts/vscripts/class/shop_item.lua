local __TSTL_FILE_PATH__ = "class/shop_item"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 6,["10"] = 6,["11"] = 6,["12"] = 23,["13"] = 23,["14"] = 23,["16"] = 23,["17"] = 23,["19"] = 11,["20"] = 19,["21"] = 20,["22"] = 21,["23"] = 24,["24"] = 25,["25"] = 26,["26"] = 27,["27"] = 28,["28"] = 29,["29"] = 30,["30"] = 31,["31"] = 32,["32"] = 33,["34"] = 35,["35"] = 35,["36"] = 35,["37"] = 35,["38"] = 35,["39"] = 35,["40"] = 35,["41"] = 35,["42"] = 35,["43"] = 35,["44"] = 45,["45"] = 47,["46"] = 48,["47"] = 49,["48"] = 50,["49"] = 52,["50"] = 52,["51"] = 52,["52"] = 52,["53"] = 52,["54"] = 52,["55"] = 52,["56"] = 52,["57"] = 52,["58"] = 53,["59"] = 53,["62"] = 70,["63"] = 70,["64"] = 70,["65"] = 70,["66"] = 70,["67"] = 70,["68"] = 70,["69"] = 70,["70"] = 70,["71"] = 70,["72"] = 70,["73"] = 70,["74"] = 23,["75"] = 82,["76"] = 83,["77"] = 83,["78"] = 83,["79"] = 83,["80"] = 83,["81"] = 83,["82"] = 83,["83"] = 83,["84"] = 83,["85"] = 82,["86"] = 93,["87"] = 94,["88"] = 95,["90"] = 97,["91"] = 93,["92"] = 99,["93"] = 100,["96"] = 101,["97"] = 102,["98"] = 103,["99"] = 103,["100"] = 103,["101"] = 103,["102"] = 103,["104"] = 105,["105"] = 106,["106"] = 107,["108"] = 109,["109"] = 109,["110"] = 109,["111"] = 110,["112"] = 109,["113"] = 109,["114"] = 99,["115"] = 7,["116"] = 22});
local ____exports = {}
local ____entity_pool = require("class.entity_pool")
local EntityPool = ____entity_pool.EntityPool
____exports.ShopItem = __TS__Class()
local ShopItem = ____exports.ShopItem
ShopItem.name = "ShopItem"
function ShopItem.prototype.____constructor(self, itemName, rarity, position, isFree, ownerPlayerID, source)
    if isFree == nil then
        isFree = false
    end
    if source == nil then
        source = "Default"
    end
    self.isFree = false
    self.isDispose = false
    self.Quantitylimit = 9999999
    self.particleIDs = {}
    self.itemName = itemName
    self.rarity = rarity
    self.position = position
    self.isFree = isFree
    self.ownerPlayerID = ownerPlayerID
    self.source = source
    self.id = DoUniqueString(itemName)
    local kv = KeyValues.items[itemName]
    if kv.Quantitylimit ~= nil and kv.Quantitylimit ~= "" then
        self.Quantitylimit = toFiniteNumber(kv.Quantitylimit)
    end
    self.entity = EntityPool:Acquire(____exports.ShopItem.EntityPoolKey, ____exports.ShopItem.Classname, {
        glowcolor = "0 255 0 255",
        angles = ownerPlayerID == nil and "0 -90 0" or "90 0 0",
        model = "models/props_gameplay/neutral_box.vmdl",
        origin = position,
        scales = "1.2 1.2 1.2",
        targetname = "shop_item",
        StartingAnim = "capsule_idle_translate",
        StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
    })
    if ownerPlayerID ~= nil then
        local player = PlayerResource:GetPlayer(ownerPlayerID)
        if player ~= nil then
            self.entity:AddEffects(EF_NODRAW)
            local particleID = ParticleManager:CreateParticleForPlayer("particles/generic_gameplay/generic_client_item.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.entity, player)
            ParticleManager:SetParticleControlEnt(
                particleID,
                1,
                self.entity,
                PATTACH_INVALID,
                nil,
                self.entity:GetAbsOrigin(),
                true
            )
            local ____self_particleIDs_0 = self.particleIDs
            ____self_particleIDs_0[#____self_particleIDs_0 + 1] = particleID
        end
    end
    CustomNetTables:SetNetData(
        "dropped_item",
        tostring(self.entity:GetEntityIndex()),
        {
            kind = "shop",
            item_name = itemName,
            rarity = rarity,
            is_free = isFree,
            owner_player_id = ownerPlayerID,
            show_tip = true
        }
    )
end
function ShopItem.Prewarm(self)
    EntityPool:Prewarm(____exports.ShopItem.EntityPoolKey, ____exports.ShopItem.Classname, {
        glowcolor = "0 255 0 255",
        angles = "0 -90 0",
        model = "models/props_gameplay/neutral_box.vmdl",
        scales = "1.2 1.2 1.2",
        targetname = "pooled_shop_item",
        StartingAnim = "capsule_idle_translate",
        StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING"
    }, 16)
end
function ShopItem.prototype.GetEntityIndex(self)
    if self.entity == nil or not IsValid(self.entity) then
        return -1
    end
    return self.entity:GetEntityIndex()
end
function ShopItem.prototype.dispose(self)
    if self.isDispose then
        return
    end
    self.isDispose = true
    if self.entity ~= nil and IsValid(self.entity) then
        CustomNetTables:SetNetData(
            "dropped_item",
            tostring(self.entity:GetEntityIndex()),
            nil
        )
    end
    if IsValid(self.entity) then
        EntityPool:Release(____exports.ShopItem.EntityPoolKey, self.entity)
        self.entity = nil
    end
    __TS__ArrayForEach(
        self.particleIDs,
        function(____, id)
            ParticleManager:DestroyParticle(id, false)
        end
    )
end
ShopItem.Classname = "dota_prop_customtexture"
ShopItem.EntityPoolKey = "shop_item:neutral_box"
return ____exports
