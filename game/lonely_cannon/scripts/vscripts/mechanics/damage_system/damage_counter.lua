local __TSTL_FILE_PATH__ = "mechanics/damage_system/damage_counter"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 35,["13"] = 36,["14"] = 38,["15"] = 38,["16"] = 39,["18"] = 39,["19"] = 40,["20"] = 41,["21"] = 43,["22"] = 38,["23"] = 49,["24"] = 50,["25"] = 51,["26"] = 52,["27"] = 53,["29"] = 56,["30"] = 57,["31"] = 59,["32"] = 60,["33"] = 60,["34"] = 60,["35"] = 61,["36"] = 62,["38"] = 65,["39"] = 66,["40"] = 60,["41"] = 60,["43"] = 49,["44"] = 71,["45"] = 72,["46"] = 71,["47"] = 75,["48"] = 76,["49"] = 75,["50"] = 79,["51"] = 80,["52"] = 79,["53"] = 83,["54"] = 84,["57"] = 88,["58"] = 89,["61"] = 93,["62"] = 94,["63"] = 96,["64"] = 97,["66"] = 100,["67"] = 100,["68"] = 100,["69"] = 100,["70"] = 100,["71"] = 100,["72"] = 100,["74"] = 105,["75"] = 105,["76"] = 83,["77"] = 108,["78"] = 109,["81"] = 113,["82"] = 113,["83"] = 113,["84"] = 113,["85"] = 113,["86"] = 108,["87"] = 120,["88"] = 121,["89"] = 122,["90"] = 120,["91"] = 125,["92"] = 126,["93"] = 127,["94"] = 128,["96"] = 131,["97"] = 125,["98"] = 134,["99"] = 135,["100"] = 136,["101"] = 137,["103"] = 139,["104"] = 134,["105"] = 142,["106"] = 143,["107"] = 144,["108"] = 145,["110"] = 148,["111"] = 149,["112"] = 150,["113"] = 151,["115"] = 154,["116"] = 156,["117"] = 156,["118"] = 156,["119"] = 156,["120"] = 156,["121"] = 156,["122"] = 156,["123"] = 156,["124"] = 156,["125"] = 156,["127"] = 165,["128"] = 166,["129"] = 167,["130"] = 142,["131"] = 170,["132"] = 171,["133"] = 171,["134"] = 171,["136"] = 172,["137"] = 173,["138"] = 173,["140"] = 179,["141"] = 179,["142"] = 180,["143"] = 180,["144"] = 170,["145"] = 183,["146"] = 184,["147"] = 185,["149"] = 188,["150"] = 189,["151"] = 183,["152"] = 192,["153"] = 193,["154"] = 194,["156"] = 197,["157"] = 192,["158"] = 200,["159"] = 201,["160"] = 202,["162"] = 205,["163"] = 206,["164"] = 207,["166"] = 210,["167"] = 200,["168"] = 213,["169"] = 214,["170"] = 215,["171"] = 216,["173"] = 219,["174"] = 213,["175"] = 222,["176"] = 223,["177"] = 224,["178"] = 225,["179"] = 226,["180"] = 227,["181"] = 228,["182"] = 229,["183"] = 230,["184"] = 231,["187"] = 234,["188"] = 235,["191"] = 222,["192"] = 240,["193"] = 241,["194"] = 242,["195"] = 243,["197"] = 245,["198"] = 240,["199"] = 248,["200"] = 249,["201"] = 250,["202"] = 251,["204"] = 253,["205"] = 248,["206"] = 256,["207"] = 257,["208"] = 256,["209"] = 265,["210"] = 266,["211"] = 266,["212"] = 266,["213"] = 266,["214"] = 266,["215"] = 266,["216"] = 266,["217"] = 266,["218"] = 265,["219"] = 38,["220"] = 281,["221"] = 281});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("mechanics.damage_system.damage_system_type")
local COUNT_DAMAGE_ABILITY_CATEGORY = "ability"
local DAMAGE_COUNTER_DPS_INTERVAL = 0.25
local CDamageCounter = __TS__Class()
CDamageCounter.name = "CDamageCounter"
__TS__ClassExtends(CDamageCounter, CModule)
function CDamageCounter.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.playerDamageCount = {}
    self.enabled = true
    self.playerDPSTracking = {}
end
function CDamageCounter.prototype.init(self, reload)
    if not reload then
        self.playerDamageCount = {}
        self.playerDPSTracking = {}
        self.enabled = true
    end
    Event:Register("game_start", self.ClearDamageCount, self)
    Event:Register("damage_event", self.CountDamageFromDamageEvent, self)
    if self.dpsTimerID == nil then
        self.dpsTimerID = Timer:GameTimer(
            DAMAGE_COUNTER_DPS_INTERVAL,
            function()
                if self.dpsTimerID == nil then
                    return nil
                end
                self:UpdateDamagePerSecond()
                return DAMAGE_COUNTER_DPS_INTERVAL
            end
        )
    end
end
function CDamageCounter.prototype.initPriority(self)
    return 100
end
function CDamageCounter.prototype.reset(self)
    self:ClearDamageCount()
end
function CDamageCounter.prototype.IsEnabled(self)
    return self.enabled
end
function CDamageCounter.prototype.CountDamage(self, param)
    if not self.enabled or param.damage <= 0 then
        return
    end
    local playerResult = self:GetOrCreatePlayerResult(param.owner)
    if playerResult == nil then
        return
    end
    playerResult.totalDamage = playerResult.totalDamage + param.damage
    playerResult.count = playerResult.count + 1
    if param.abilityName ~= nil and param.abilityName ~= "" then
        self:CountAbilityDamage(playerResult, param.abilityName, param.damage)
    end
    local ____self_playerDPSTracking_0, ____playerResult_playerID_1 = self.playerDPSTracking, playerResult.playerID
    if ____self_playerDPSTracking_0[____playerResult_playerID_1] == nil then
        ____self_playerDPSTracking_0[____playerResult_playerID_1] = {
            windowDamage = 0,
            windowStartTime = GameRules:GetGameTime(),
            maxDamagePerSecond = 0
        }
    end
    local ____self_playerDPSTracking_playerResult_playerID_2, ____windowDamage_3 = self.playerDPSTracking[playerResult.playerID], "windowDamage"
    ____self_playerDPSTracking_playerResult_playerID_2[____windowDamage_3] = ____self_playerDPSTracking_playerResult_playerID_2[____windowDamage_3] + param.damage
end
function CDamageCounter.prototype.CountDamageFromDamageEvent(self, event)
    if event.damage <= 0 then
        return
    end
    self:CountDamage({
        owner = event.attacker,
        damage = event.damage,
        abilityName = self:GetAbilityNameFromDamageEvent(event)
    })
end
function CDamageCounter.prototype.ClearDamageCount(self)
    self.playerDamageCount = {}
    self.playerDPSTracking = {}
end
function CDamageCounter.prototype.GetPlayerDamageCount(self, playerID, defaultVar)
    local result = self.playerDamageCount[playerID]
    if result == nil then
        return defaultVar
    end
    return self:ClonePlayerDamageResult(result)
end
function CDamageCounter.prototype.GetPlayerMaxDamagePerSecond(self, playerID, defaultVar)
    local tracking = self.playerDPSTracking[playerID]
    if tracking == nil then
        return defaultVar
    end
    return tracking.maxDamagePerSecond
end
function CDamageCounter.prototype.GetOrCreatePlayerResult(self, owner)
    local playerID = self:GetOwnerPlayerID(owner)
    if playerID == nil then
        return nil
    end
    local snapshotOwner = self:GetPlayerSnapshotOwner(playerID, owner)
    local ownerEntityIndex = self:GetOwnerEntityIndex(snapshotOwner)
    if ownerEntityIndex == nil then
        return nil
    end
    local ownerName = snapshotOwner:GetUnitName()
    local ____self_playerDamageCount_4, ____playerID_5 = self.playerDamageCount, playerID
    if ____self_playerDamageCount_4[____playerID_5] == nil then
        ____self_playerDamageCount_4[____playerID_5] = {
            playerID = playerID,
            ownerEntityIndex = ownerEntityIndex,
            ownerName = ownerName,
            totalDamage = 0,
            count = 0,
            categories = {}
        }
    end
    self.playerDamageCount[playerID].ownerEntityIndex = ownerEntityIndex
    self.playerDamageCount[playerID].ownerName = ownerName
    return self.playerDamageCount[playerID]
end
function CDamageCounter.prototype.CountAbilityDamage(self, playerResult, abilityName, damage)
    local ____playerResult_categories_6, ____COUNT_DAMAGE_ABILITY_CATEGORY_7 = playerResult.categories, COUNT_DAMAGE_ABILITY_CATEGORY
    if ____playerResult_categories_6[____COUNT_DAMAGE_ABILITY_CATEGORY_7] == nil then
        ____playerResult_categories_6[____COUNT_DAMAGE_ABILITY_CATEGORY_7] = {}
    end
    local abilityResult = playerResult.categories[COUNT_DAMAGE_ABILITY_CATEGORY]
    if abilityResult[abilityName] == nil then
        abilityResult[abilityName] = {category = COUNT_DAMAGE_ABILITY_CATEGORY, key = abilityName, totalDamage = 0, count = 0}
    end
    local ____abilityResult_abilityName_8, ____totalDamage_9 = abilityResult[abilityName], "totalDamage"
    ____abilityResult_abilityName_8[____totalDamage_9] = ____abilityResult_abilityName_8[____totalDamage_9] + damage
    local ____abilityResult_abilityName_10, ____count_11 = abilityResult[abilityName], "count"
    ____abilityResult_abilityName_10[____count_11] = ____abilityResult_abilityName_10[____count_11] + 1
end
function CDamageCounter.prototype.GetAbilityNameFromDamageEvent(self, event)
    if event.ability == nil or not IsValid(event.ability) then
        return nil
    end
    local abilityName = event.ability:GetAbilityName()
    return abilityName ~= "" and abilityName or nil
end
function CDamageCounter.prototype.GetOwnerEntityIndex(self, owner)
    if not IsValid(owner) then
        return nil
    end
    return owner:GetEntityIndex()
end
function CDamageCounter.prototype.GetOwnerPlayerID(self, owner)
    if not IsValid(owner) then
        return nil
    end
    local playerID = owner:GetPlayerOwnerID()
    if playerID == nil or playerID < 0 then
        return nil
    end
    return playerID
end
function CDamageCounter.prototype.GetPlayerSnapshotOwner(self, playerID, fallbackOwner)
    local hero = PlayerResource:GetSelectedHeroEntity(playerID)
    if IsValid(hero) then
        return hero
    end
    return fallbackOwner
end
function CDamageCounter.prototype.UpdateDamagePerSecond(self)
    local currentTime = GameRules:GetGameTime()
    for ____, tracking in pairs(self.playerDPSTracking) do
        local t = tracking
        local elapsed = currentTime - t.windowStartTime
        if elapsed >= 1 then
            if t.windowDamage > 0 then
                local currentDPS = t.windowDamage / elapsed
                if currentDPS > t.maxDamagePerSecond then
                    t.maxDamagePerSecond = currentDPS
                end
            end
            t.windowDamage = 0
            t.windowStartTime = currentTime
        end
    end
end
function CDamageCounter.prototype.CloneTagResult(self, result)
    local clonedResult = {}
    for tag, node in pairs(result) do
        clonedResult[tag] = self:CloneTagNode(node)
    end
    return clonedResult
end
function CDamageCounter.prototype.CloneCategoryResult(self, result)
    local clonedResult = {}
    for category, categoryResult in pairs(result) do
        clonedResult[category] = self:CloneTagResult(categoryResult)
    end
    return clonedResult
end
function CDamageCounter.prototype.CloneTagNode(self, result)
    return {category = result.category, key = result.key, totalDamage = result.totalDamage, count = result.count}
end
function CDamageCounter.prototype.ClonePlayerDamageResult(self, result)
    return {
        playerID = result.playerID,
        ownerEntityIndex = result.ownerEntityIndex,
        ownerName = result.ownerName,
        totalDamage = result.totalDamage,
        count = result.count,
        categories = self:CloneCategoryResult(result.categories)
    }
end
CDamageCounter = __TS__DecorateLegacy({reloadable}, CDamageCounter)
if DamageCounter == nil then
    DamageCounter = __TS__New(CDamageCounter)
end
return ____exports
