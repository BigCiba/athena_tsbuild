local __TSTL_FILE_PATH__ = "mechanics/ability_upgrade"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 1,["17"] = 1,["18"] = 22,["19"] = 22,["20"] = 23,["22"] = 23,["23"] = 27,["24"] = 29,["25"] = 22,["26"] = 30,["27"] = 31,["28"] = 32,["30"] = 54,["31"] = 55,["32"] = 30,["33"] = 64,["34"] = 64,["35"] = 64,["37"] = 64,["38"] = 64,["40"] = 65,["41"] = 66,["44"] = 71,["45"] = 71,["46"] = 71,["48"] = 71,["49"] = 72,["50"] = 73,["53"] = 77,["54"] = 80,["55"] = 81,["57"] = 86,["58"] = 89,["59"] = 89,["60"] = 89,["61"] = 89,["62"] = 91,["63"] = 93,["64"] = 94,["65"] = 95,["68"] = 100,["69"] = 102,["72"] = 107,["73"] = 109,["76"] = 114,["77"] = 115,["79"] = 118,["80"] = 118,["81"] = 121,["82"] = 122,["84"] = 124,["85"] = 125,["87"] = 127,["88"] = 127,["89"] = 129,["90"] = 132,["92"] = 140,["93"] = 143,["94"] = 64,["95"] = 153,["96"] = 154,["97"] = 155,["98"] = 156,["100"] = 159,["101"] = 160,["102"] = 162,["103"] = 163,["104"] = 164,["106"] = 168,["107"] = 169,["108"] = 170,["111"] = 174,["112"] = 174,["113"] = 175,["114"] = 176,["115"] = 179,["116"] = 179,["117"] = 180,["118"] = 181,["119"] = 182,["122"] = 186,["123"] = 187,["124"] = 190,["125"] = 193,["126"] = 196,["127"] = 201,["129"] = 174,["132"] = 205,["133"] = 206,["134"] = 153,["135"] = 215,["136"] = 216,["137"] = 217,["138"] = 218,["140"] = 221,["141"] = 222,["142"] = 224,["143"] = 225,["145"] = 229,["146"] = 230,["147"] = 231,["149"] = 234,["150"] = 235,["151"] = 238,["152"] = 240,["153"] = 240,["154"] = 240,["155"] = 240,["156"] = 241,["157"] = 242,["158"] = 243,["159"] = 244,["160"] = 247,["161"] = 250,["164"] = 258,["165"] = 260,["166"] = 261,["167"] = 264,["169"] = 267,["170"] = 215,["171"] = 275,["172"] = 276,["173"] = 277,["175"] = 280,["176"] = 281,["177"] = 281,["178"] = 281,["179"] = 281,["180"] = 283,["181"] = 275,["182"] = 292,["183"] = 293,["185"] = 294,["186"] = 294,["187"] = 295,["188"] = 296,["190"] = 294,["193"] = 299,["194"] = 292,["195"] = 308,["196"] = 309,["197"] = 310,["199"] = 313,["200"] = 314,["201"] = 316,["202"] = 317,["204"] = 321,["205"] = 321,["206"] = 321,["207"] = 321,["208"] = 308,["209"] = 330,["210"] = 331,["211"] = 332,["213"] = 335,["214"] = 336,["215"] = 337,["217"] = 340,["219"] = 341,["220"] = 341,["221"] = 343,["222"] = 344,["223"] = 345,["225"] = 341,["228"] = 349,["229"] = 330,["230"] = 361,["231"] = 362,["232"] = 363,["234"] = 366,["235"] = 367,["236"] = 367,["237"] = 367,["238"] = 367,["239"] = 369,["240"] = 370,["242"] = 373,["243"] = 374,["244"] = 377,["245"] = 378,["246"] = 378,["247"] = 378,["249"] = 378,["250"] = 380,["251"] = 384,["252"] = 387,["253"] = 393,["255"] = 393,["257"] = 393,["258"] = 394,["259"] = 395,["263"] = 404,["264"] = 361,["265"] = 411,["266"] = 412,["269"] = 416,["270"] = 419,["271"] = 420,["273"] = 423,["274"] = 426,["275"] = 426,["276"] = 426,["277"] = 426,["278"] = 426,["279"] = 429,["280"] = 431,["281"] = 411,["282"] = 435,["283"] = 436,["284"] = 435,["285"] = 446,["286"] = 447,["287"] = 447,["288"] = 448,["289"] = 446,["290"] = 456,["291"] = 457,["292"] = 457,["293"] = 457,["295"] = 457,["296"] = 458,["297"] = 459,["298"] = 460,["299"] = 461,["300"] = 462,["301"] = 463,["305"] = 456,["306"] = 473,["307"] = 474,["308"] = 475,["309"] = 477,["310"] = 479,["311"] = 479,["312"] = 479,["313"] = 479,["314"] = 479,["316"] = 473,["317"] = 485,["318"] = 486,["319"] = 487,["320"] = 485,["321"] = 22,["322"] = 493,["323"] = 493});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CAbilityUpgrade = __TS__Class()
CAbilityUpgrade.name = "CAbilityUpgrade"
__TS__ClassExtends(CAbilityUpgrade, CModule)
function CAbilityUpgrade.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.unitUpgrades = {}
    self.upgradeSource = {}
end
function CAbilityUpgrade.prototype.init(self, reload)
    if not reload then
        self.unitUpgrades = {}
    end
    self.kv = LoadKeyValues("scripts/npc/abilities/ability_upgrades.kv")
    self.service_kv = LoadKeyValues("scripts/npc/abilities/ability_upgrades_service.kv")
end
function CAbilityUpgrade.prototype.AddAbilityUpgrade(self, unit, abilityUpgradeName, level, source)
    if level == nil then
        level = 1
    end
    if source == nil then
        source = ""
    end
    if not IsValid(unit) then
        print("[AbilityUpgrade] 无效的单位")
        return
    end
    local ____self_kv_abilityUpgradeName_0 = self.kv[abilityUpgradeName]
    if ____self_kv_abilityUpgradeName_0 == nil then
        ____self_kv_abilityUpgradeName_0 = self.service_kv[abilityUpgradeName]
    end
    local upgradeConfig = ____self_kv_abilityUpgradeName_0
    if upgradeConfig == nil then
        print("[AbilityUpgrade] 找不到升级配置: " .. abilityUpgradeName)
        return
    end
    local entindex = unit:GetEntityIndex()
    if self.unitUpgrades[entindex] == nil then
        self.unitUpgrades[entindex] = {upgrades = {}}
    end
    local data = self.unitUpgrades[entindex]
    local existingUpgrade = __TS__ArrayFind(
        data.upgrades,
        function(____, u) return u.name == abilityUpgradeName end
    )
    if existingUpgrade then
        local maxCount = tonumber(upgradeConfig.max)
        if maxCount ~= nil and existingUpgrade.level >= maxCount then
            print(((("[AbilityUpgrade] 升级 " .. abilityUpgradeName) .. " 已达到最大次数 (") .. tostring(maxCount)) .. ")")
            return
        end
        if not self:isUpgradeFromSource(entindex, abilityUpgradeName, source) then
            print(((("[AbilityUpgrade] 升级 " .. abilityUpgradeName) .. " 已存在且来源不同（当前来源: ") .. source) .. "），无视")
            return
        end
        if level < existingUpgrade.level then
            print(((((("[AbilityUpgrade] 升级 " .. abilityUpgradeName) .. " 等级更低（") .. tostring(level)) .. " < ") .. tostring(existingUpgrade.level)) .. "），不更新")
            return
        end
        existingUpgrade.level = level
        print(((((((("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 更新技能升级等级: ") .. abilityUpgradeName) .. " -> ") .. tostring(level)) .. " (来源: ") .. (source or "无")) .. ")")
    else
        local ____data_upgrades_1 = data.upgrades
        ____data_upgrades_1[#____data_upgrades_1 + 1] = {name = abilityUpgradeName, level = level}
        if self.upgradeSource[source] == nil then
            self.upgradeSource[source] = {}
        end
        if self.upgradeSource[source][entindex] == nil then
            self.upgradeSource[source][entindex] = {}
        end
        local ____self_upgradeSource_source_entindex_2 = self.upgradeSource[source][entindex]
        ____self_upgradeSource_source_entindex_2[#____self_upgradeSource_source_entindex_2 + 1] = abilityUpgradeName
        print(((((((("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 添加技能升级: ") .. abilityUpgradeName) .. " (等级: ") .. tostring(level)) .. ", 来源: ") .. (source or "无")) .. ")")
        Event:Fire("ability_upgrade_added", {unit = unit, upgradeName = abilityUpgradeName, level = level})
    end
    self:RefreshAbilityProperty(unit, abilityUpgradeName)
    self:SyncToClient(unit)
end
function CAbilityUpgrade.prototype.RemoveAbilityUpgrade(self, unit, abilityUpgradeName, source)
    if not IsValid(unit) then
        print("[AbilityUpgrade] 无效的单位")
        return false
    end
    local entindex = unit:GetEntityIndex()
    local data = self.unitUpgrades[entindex]
    if data == nil or #data.upgrades == 0 then
        print(("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 没有任何技能升级")
        return false
    end
    if source ~= nil and not self:isUpgradeFromSource(entindex, abilityUpgradeName, source) then
        print((("[AbilityUpgrade] 升级 " .. abilityUpgradeName) .. " 不属于来源 ") .. source)
        return false
    end
    do
        local i = 0
        while i < #data.upgrades do
            if data.upgrades[i + 1].name == abilityUpgradeName then
                local upgradeSource = source or ""
                local ____opt_3 = self.upgradeSource[upgradeSource]
                if ____opt_3 and ____opt_3[entindex] then
                    local sourceIndex = __TS__ArrayIndexOf(self.upgradeSource[upgradeSource][entindex], abilityUpgradeName)
                    if sourceIndex ~= -1 then
                        __TS__ArraySplice(self.upgradeSource[upgradeSource][entindex], sourceIndex, 1)
                    end
                end
                __TS__ArraySplice(data.upgrades, i, 1)
                print(((((("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 移除技能升级: ") .. abilityUpgradeName) .. " (来源: ") .. (source or "无")) .. ")")
                self:RefreshAbilityProperty(unit, abilityUpgradeName)
                self:SyncToClient(unit)
                Event:Fire("ability_upgrade_removed", {unit = unit, upgradeName = abilityUpgradeName})
                return true
            end
            i = i + 1
        end
    end
    print((("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 没有技能升级: ") .. abilityUpgradeName)
    return false
end
function CAbilityUpgrade.prototype.RemoveAbilityUpgradeBySource(self, unit, source)
    if not IsValid(unit) then
        print("[AbilityUpgrade] 无效的单位")
        return 0
    end
    local entindex = unit:GetEntityIndex()
    local data = self.unitUpgrades[entindex]
    if data == nil or #data.upgrades == 0 or self.upgradeSource[source] == nil or self.upgradeSource[source][entindex] == nil then
        return 0
    end
    local sourceUpgrades = self.upgradeSource[source][entindex]
    if not sourceUpgrades or #sourceUpgrades == 0 then
        return 0
    end
    local removedCount = 0
    local removedUpgrades = {}
    for ____, upgradeName in ipairs(sourceUpgrades) do
        local index = __TS__ArrayFindIndex(
            data.upgrades,
            function(____, u) return u.name == upgradeName end
        )
        if index ~= -1 then
            __TS__ArraySplice(data.upgrades, index, 1)
            removedUpgrades[#removedUpgrades + 1] = upgradeName
            removedCount = removedCount + 1
            self:RefreshAbilityProperty(unit, upgradeName)
            Event:Fire("ability_upgrade_removed", {unit = unit, upgradeName = upgradeName})
        end
    end
    __TS__Delete(self.upgradeSource[source], entindex)
    if removedCount > 0 then
        print((((("[AbilityUpgrade] entindex " .. tostring(entindex)) .. " removed source ") .. source) .. " : ") .. tostring(removedCount))
        self:SyncToClient(unit)
    end
    return removedCount
end
function CAbilityUpgrade.prototype.GetAbilityUpgrades(self, unit)
    if not IsValid(unit) then
        return {}
    end
    local entindex = unit:GetEntityIndex()
    local data = IsServer() and self.unitUpgrades[entindex] or CustomNetTables:GetNetData(
        "ability_upgrade",
        tostring(entindex)
    )
    return data ~= nil and data.upgrades or ({})
end
function CAbilityUpgrade.prototype.HasAbilityUpgrade(self, unit, abilityUpgradeName)
    local upgrades = self:GetAbilityUpgrades(unit)
    do
        local i = 0
        while i < #upgrades do
            if upgrades[i + 1].name == abilityUpgradeName then
                return true
            end
            i = i + 1
        end
    end
    return false
end
function CAbilityUpgrade.prototype.GetAbilityUpgradeCount(self, unit, abilityUpgradeName)
    if not IsValid(unit) then
        return 0
    end
    local entindex = unit:GetEntityIndex()
    local data = self.unitUpgrades[entindex]
    if data == nil or #data.upgrades == 0 then
        return 0
    end
    return __TS__ArraySome(
        data.upgrades,
        function(____, u) return u.name == abilityUpgradeName end
    ) and 1 or 0
end
function CAbilityUpgrade.prototype.GetUpgradeLevelSumByAbilityName(self, unit, abilityName)
    if not IsValid(unit) then
        return 0
    end
    local upgrades = self:GetAbilityUpgrades(unit)
    if #upgrades == 0 then
        return 0
    end
    local sum = 0
    do
        local i = 0
        while i < #upgrades do
            local config = self.kv[upgrades[i + 1].name]
            if config ~= nil and config.ability_name == abilityName then
                sum = sum + upgrades[i + 1].level
            end
            i = i + 1
        end
    end
    return sum
end
function CAbilityUpgrade.prototype.GetUpgradedValue(self, unit, abilityName, abilityLevel, keyName, baseValue)
    if not IsValid(unit) then
        return baseValue
    end
    local entindex = unit:GetEntityIndex()
    local data = IsServer() and self.unitUpgrades[entindex] or CustomNetTables:GetNetData(
        "ability_upgrade",
        tostring(entindex)
    )
    if data == nil or #data.upgrades == 0 then
        return baseValue
    end
    local totalValue = baseValue
    local totalMultiplierPct = 0
    for ____, upgrade in ipairs(data.upgrades) do
        local ____self_kv_upgrade_name_5 = self.kv[upgrade.name]
        if ____self_kv_upgrade_name_5 == nil then
            ____self_kv_upgrade_name_5 = self.service_kv[upgrade.name]
        end
        local upgradeConfig = ____self_kv_upgrade_name_5
        if upgradeConfig ~= nil and upgradeConfig.ability_name == abilityName and upgradeConfig.AbilityValues ~= nil then
            local upgradeValue = upgradeConfig.AbilityValues[keyName]
            totalValue = totalValue + GetAbilityValues(upgradeValue, upgrade.level, unit)
            local ____opt_6 = upgradeConfig.AbilityValueMultipliers
            if ____opt_6 ~= nil then
                ____opt_6 = ____opt_6[keyName]
            end
            local multiplierValueName = ____opt_6
            if multiplierValueName ~= nil then
                totalMultiplierPct = totalMultiplierPct + GetAbilityValues(upgradeConfig.AbilityValues[multiplierValueName], upgrade.level, unit)
            end
        end
    end
    return totalValue * (1 + totalMultiplierPct * 0.01)
end
function CAbilityUpgrade.prototype.ClearAbilityUpgrades(self, unit)
    if not IsValid(unit) then
        return
    end
    local entindex = unit:GetEntityIndex()
    for source in pairs(self.upgradeSource) do
        __TS__Delete(self.upgradeSource[source], entindex)
    end
    __TS__Delete(self.unitUpgrades, entindex)
    CustomNetTables:SetNetData(
        "ability_upgrade",
        tostring(entindex),
        nil
    )
    Event:Fire("ability_upgrades_cleared", {unit = unit})
    print(("[AbilityUpgrade] 单位 " .. tostring(entindex)) .. " 技能升级已清除")
end
function CAbilityUpgrade.prototype.IsServiceUpgrade(self, abilityUpgradeName)
    return self.service_kv[abilityUpgradeName] ~= nil
end
function CAbilityUpgrade.prototype.isUpgradeFromSource(self, entindex, abilityUpgradeName, source)
    local ____opt_8 = self.upgradeSource[source]
    local sourceUpgrades = ____opt_8 and ____opt_8[entindex]
    return sourceUpgrades ~= nil and __TS__ArrayIncludes(sourceUpgrades, abilityUpgradeName)
end
function CAbilityUpgrade.prototype.RefreshAbilityProperty(self, unit, abilityUpgradeName)
    local ____self_kv_abilityUpgradeName_10 = self.kv[abilityUpgradeName]
    if ____self_kv_abilityUpgradeName_10 == nil then
        ____self_kv_abilityUpgradeName_10 = self.service_kv[abilityUpgradeName]
    end
    local upgradeConfig = ____self_kv_abilityUpgradeName_10
    if upgradeConfig ~= nil and upgradeConfig.ability_name ~= nil then
        local ability = unit:FindAbilityByName(upgradeConfig.ability_name)
        if ability ~= nil then
            ability:RefreshStaticProperty()
            if upgradeConfig.AbilityValues ~= nil and upgradeConfig.AbilityValues.abilitycharges ~= nil then
                ability:RefreshCharges()
            end
        end
    end
end
function CAbilityUpgrade.prototype.SyncToClient(self, unit)
    local entindex = unit:GetEntityIndex()
    local data = self.unitUpgrades[entindex]
    if data ~= nil then
        CustomNetTables:SetNetData(
            "ability_upgrade",
            tostring(entindex),
            {upgrades = data.upgrades}
        )
    end
end
function CAbilityUpgrade.prototype.reset(self)
    self.unitUpgrades = {}
    self.upgradeSource = {}
end
CAbilityUpgrade = __TS__DecorateLegacy({reloadable}, CAbilityUpgrade)
if AbilityUpgrade == nil then
    AbilityUpgrade = __TS__New(CAbilityUpgrade)
end
return ____exports
