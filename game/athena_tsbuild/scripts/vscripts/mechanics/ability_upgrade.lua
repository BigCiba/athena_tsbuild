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
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 1,["18"] = 1,["19"] = 22,["20"] = 22,["21"] = 23,["23"] = 23,["24"] = 27,["25"] = 29,["26"] = 22,["27"] = 30,["28"] = 31,["29"] = 32,["31"] = 54,["32"] = 55,["33"] = 30,["34"] = 64,["35"] = 64,["36"] = 64,["38"] = 64,["39"] = 64,["41"] = 65,["42"] = 66,["45"] = 71,["46"] = 71,["47"] = 71,["49"] = 71,["50"] = 72,["51"] = 73,["54"] = 77,["55"] = 80,["56"] = 81,["58"] = 86,["59"] = 89,["60"] = 89,["61"] = 89,["62"] = 89,["63"] = 91,["64"] = 93,["65"] = 94,["66"] = 95,["69"] = 100,["70"] = 102,["73"] = 107,["74"] = 109,["77"] = 114,["78"] = 115,["80"] = 118,["81"] = 118,["82"] = 121,["83"] = 122,["85"] = 124,["86"] = 125,["88"] = 127,["89"] = 127,["90"] = 129,["91"] = 132,["93"] = 140,["94"] = 143,["95"] = 64,["96"] = 153,["97"] = 154,["98"] = 155,["99"] = 156,["101"] = 159,["102"] = 160,["103"] = 162,["104"] = 163,["105"] = 164,["107"] = 168,["108"] = 169,["109"] = 170,["112"] = 174,["113"] = 174,["114"] = 175,["115"] = 176,["116"] = 179,["117"] = 179,["118"] = 180,["119"] = 181,["120"] = 182,["123"] = 186,["124"] = 187,["125"] = 190,["126"] = 193,["127"] = 196,["128"] = 201,["130"] = 174,["133"] = 205,["134"] = 206,["135"] = 153,["136"] = 215,["137"] = 216,["138"] = 217,["139"] = 218,["141"] = 221,["142"] = 222,["143"] = 224,["144"] = 225,["146"] = 229,["147"] = 230,["148"] = 231,["150"] = 234,["151"] = 235,["152"] = 238,["153"] = 240,["154"] = 240,["155"] = 240,["156"] = 240,["157"] = 241,["158"] = 242,["159"] = 243,["160"] = 244,["161"] = 247,["162"] = 250,["165"] = 258,["166"] = 260,["167"] = 261,["168"] = 264,["170"] = 267,["171"] = 215,["172"] = 275,["173"] = 276,["174"] = 277,["176"] = 280,["177"] = 281,["178"] = 281,["179"] = 281,["180"] = 281,["181"] = 283,["182"] = 275,["183"] = 292,["184"] = 293,["186"] = 294,["187"] = 294,["188"] = 295,["189"] = 296,["191"] = 294,["194"] = 299,["195"] = 292,["196"] = 308,["197"] = 309,["198"] = 310,["200"] = 313,["201"] = 314,["202"] = 316,["203"] = 317,["205"] = 321,["206"] = 321,["207"] = 321,["208"] = 321,["209"] = 308,["210"] = 330,["211"] = 331,["212"] = 332,["214"] = 335,["215"] = 336,["216"] = 337,["218"] = 340,["220"] = 341,["221"] = 341,["222"] = 343,["223"] = 344,["224"] = 345,["226"] = 341,["229"] = 349,["230"] = 330,["231"] = 361,["232"] = 362,["233"] = 363,["235"] = 366,["236"] = 367,["237"] = 367,["238"] = 367,["239"] = 367,["240"] = 369,["241"] = 370,["243"] = 373,["244"] = 374,["245"] = 377,["246"] = 378,["247"] = 378,["248"] = 378,["250"] = 378,["251"] = 380,["252"] = 384,["253"] = 387,["254"] = 393,["256"] = 393,["258"] = 393,["259"] = 394,["260"] = 395,["264"] = 404,["265"] = 361,["266"] = 411,["267"] = 412,["270"] = 416,["271"] = 419,["272"] = 420,["274"] = 423,["275"] = 426,["276"] = 426,["277"] = 426,["278"] = 426,["279"] = 426,["280"] = 429,["281"] = 431,["282"] = 411,["283"] = 435,["284"] = 436,["285"] = 435,["286"] = 446,["287"] = 447,["288"] = 447,["289"] = 448,["290"] = 446,["291"] = 456,["292"] = 457,["293"] = 457,["294"] = 457,["296"] = 457,["297"] = 458,["298"] = 459,["299"] = 460,["300"] = 461,["301"] = 462,["302"] = 463,["306"] = 456,["307"] = 473,["308"] = 474,["309"] = 475,["310"] = 477,["311"] = 479,["312"] = 479,["313"] = 479,["314"] = 479,["315"] = 479,["317"] = 473,["318"] = 486,["319"] = 487,["320"] = 488,["321"] = 489,["322"] = 489,["325"] = 491,["326"] = 492,["327"] = 492,["328"] = 492,["329"] = 492,["330"] = 492,["331"] = 492,["333"] = 486,["334"] = 494,["335"] = 495,["336"] = 495,["337"] = 495,["340"] = 496,["341"] = 497,["342"] = 494,["343"] = 22,["344"] = 503,["345"] = 503});
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
function CAbilityUpgrade.prototype.CleanupUnitUpgrades(self, entindex)
    for ____, source in ipairs(__TS__ObjectKeys(self.upgradeSource)) do
        __TS__Delete(self.upgradeSource[source], entindex)
        if #__TS__ObjectKeys(self.upgradeSource[source]) == 0 then
            __TS__Delete(self.upgradeSource, source)
        end
    end
    __TS__Delete(self.unitUpgrades, entindex)
    if IsServer() then
        CustomNetTables:SetNetData(
            "ability_upgrade",
            tostring(entindex),
            nil
        )
    end
end
function CAbilityUpgrade.prototype.reset(self)
    if IsServer() then
        for ____, key in ipairs(CustomNetTables:GetAllTableKeys("ability_upgrade")) do
            CustomNetTables:SetNetData("ability_upgrade", key, nil)
        end
    end
    self.unitUpgrades = {}
    self.upgradeSource = {}
end
CAbilityUpgrade = __TS__DecorateLegacy({reloadable}, CAbilityUpgrade)
if AbilityUpgrade == nil then
    AbilityUpgrade = __TS__New(CAbilityUpgrade)
end
return ____exports
