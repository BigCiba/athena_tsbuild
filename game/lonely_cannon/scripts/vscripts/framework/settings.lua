local __TSTL_FILE_PATH__ = "framework/settings"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["16"] = 7,["17"] = 8,["18"] = 9,["19"] = 10,["20"] = 11,["21"] = 12,["22"] = 13,["23"] = 14,["24"] = 15,["25"] = 16,["26"] = 17,["27"] = 18,["28"] = 19,["29"] = 20,["30"] = 21,["31"] = 22,["32"] = 23,["33"] = 24,["34"] = 25,["35"] = 26,["36"] = 27,["37"] = 28,["38"] = 29,["39"] = 30,["40"] = 31,["41"] = 33,["42"] = 34,["43"] = 35,["44"] = 36,["45"] = 37,["46"] = 38,["47"] = 39,["48"] = 40,["49"] = 41,["50"] = 42,["51"] = 43,["52"] = 44,["53"] = 46,["54"] = 47,["55"] = 48,["56"] = 49,["57"] = 50,["58"] = 51,["59"] = 52,["60"] = 53,["61"] = 54,["62"] = 55,["63"] = 56,["64"] = 57,["65"] = 58,["66"] = 60,["67"] = 61,["68"] = 62,["69"] = 63,["70"] = 64,["71"] = 65,["72"] = 66,["73"] = 67,["74"] = 68,["75"] = 69,["76"] = 70,["77"] = 71,["78"] = 72,["79"] = 73,["80"] = 85,["81"] = 86,["82"] = 87,["83"] = 88,["84"] = 89,["86"] = 91,["87"] = 92,["89"] = 94,["90"] = 95,["91"] = 95,["92"] = 95,["93"] = 95,["94"] = 95,["95"] = 95,["96"] = 95,["97"] = 95,["98"] = 95,["99"] = 95,["100"] = 95,["102"] = 5,["103"] = 3,["104"] = 109,["105"] = 109});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MSettings = __TS__Class()
MSettings.name = "MSettings"
__TS__ClassExtends(MSettings, CModule)
function MSettings.prototype.init(self, reload)
    if IsServer() then
        local GameMode = GameRules:GetGameModeEntity()
        GameMode:SetInnateMeleeDamageBlockAmount(0)
        GameMode:SetInnateMeleeDamageBlockPerLevelAmount(0)
        GameMode:SetInnateMeleeDamageBlockPercent(0)
        GameMode:SetUnseenFogOfWarEnabled(false)
        GameRules:SetHeroRespawnEnabled(false)
        GameMode:SetFogOfWarDisabled(false)
        GameMode:SetFixedRespawnTime(1)
        GameRules:SetCustomGameAllowBattleMusic(false)
        GameRules:SetCustomGameAllowHeroPickMusic(false)
        GameRules:SetCustomGameAllowMusicAtGameStart(true)
        GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 4)
        GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
        GameRules:SetFirstBloodActive(false)
        GameRules:SetGoldPerTick(0)
        GameRules:SetGoldTickTime(99999)
        GameRules:SetHeroSelectionTime(0)
        GameRules:SetHeroSelectPenaltyTime(0)
        GameRules:SetHideKillMessageHeaders(true)
        GameRules:SetPostGameTime(3000)
        GameRules:SetPreGameTime(0)
        GameRules:SetSameHeroSelectionEnabled(true)
        GameRules:SetShowcaseTime(0)
        GameRules:SetStartingGold(0)
        GameRules:SetStrategyTime(0)
        GameRules:SetUseBaseGoldBountyOnHeroes(false)
        GameRules:SetUseCustomHeroXPValues(true)
        GameRules:SetSuggestItemsEnabled(false)
        GameMode:DisableHudFlip(true)
        GameMode:SetAlwaysShowPlayerNames(false)
        GameMode:SetAnnouncerDisabled(true)
        GameMode:SetCameraZRange(0, 20000)
        GameMode:SetCustomBackpackCooldownPercent(1)
        GameMode:SetCustomBackpackSwapCooldown(0)
        GameMode:SetCustomBuybackCooldownEnabled(true)
        GameMode:SetCustomBuybackCostEnabled(true)
        GameMode:SetBuybackEnabled(false)
        GameMode:SetCustomGameForceHero("npc_dota_hero_phantom_assassin")
        GameMode:SetUseCustomHeroLevels(true)
        GameMode:SetCustomHeroMaxLevel(HERO_MAX_LEVEL)
        GameMode:SetCustomXPRequiredToReachNextLevel(HERO_XP_PER_LEVEL_TABLE)
        GameMode:SetDaynightCycleDisabled(true)
        GameMode:SetDeathOverlayDisabled(true)
        GameMode:SetGoldSoundDisabled(false)
        GameMode:SetSendToStashEnabled(false)
        GameMode:SetCanSellAnywhere(false)
        GameMode:SetAllowNeutralItemDrops(false)
        GameMode:SetRandomHeroBonusItemGrantDisabled(true)
        GameMode:SetRecommendedItemsDisabled(true)
        GameMode:SetNeutralStashEnabled(false)
        GameMode:SetHudCombatEventsDisabled(true)
        GameMode:SetKillingSpreeAnnouncerDisabled(true)
        GameMode:SetLoseGoldOnDeath(false)
        GameMode:SetMaximumAttackSpeed(5000)
        GameMode:SetMinimumAttackSpeed(1)
        GameMode:SetPauseEnabled(true)
        GameMode:SetRecommendedItemsDisabled(true)
        GameMode:SetSelectionGoldPenaltyEnabled(false)
        GameMode:SetStashPurchasingDisabled(true)
        GameMode:SetStickyItemDisabled(true)
        GameMode:SetTPScrollSlotItemOverride("item_back")
        GameMode:SetGiveFreeTPOnDeath(false)
        GameMode:SetWeatherEffectsDisabled(true)
        GameMode:SetForcedHUDSkin("default")
        GameMode:SetGoldSoundDisabled(true)
        if IsInToolsMode() then
            GameRules:LockCustomGameSetupTeamAssignment(false)
            GameRules:EnableCustomGameSetupAutoLaunch(false)
            GameRules:SetCustomGameSetupAutoLaunchDelay(0)
        else
            GameRules:LockCustomGameSetupTeamAssignment(false)
            GameRules:EnableCustomGameSetupAutoLaunch(true)
        end
        GameRules:SetUseUniversalShopMode(true)
        CustomNetTables:SetNetData(
            "common",
            "settings",
            {
                is_local_host = not IsDedicatedServer() and not IsInToolsMode(),
                is_in_tools_mode = IsInToolsMode(),
                is_cheat_mode = GameRules:IsCheatMode(),
                HERO_MAX_LEVEL = HERO_MAX_LEVEL,
                HERO_XP_PER_LEVEL_TABLE = HERO_XP_PER_LEVEL_TABLE
            }
        )
    end
end
MSettings = __TS__DecorateLegacy({reloadable}, MSettings)
if Settings == nil then
    Settings = __TS__New(MSettings)
end
return ____exports
