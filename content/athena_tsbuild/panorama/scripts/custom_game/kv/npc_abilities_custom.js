GameUI.CustomUIConfig().npc_abilities_custom = {
	"client_ability": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/client_ability",
		"AbilityType": "ABILITY_TYPE_BASIC",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_HIDDEN"
	},
	"omniknight_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/omniknight/omniknight_0",
		"AbilityTextureName": "omniknight_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES_STRONG",
		"MaxLevel": 1,
		"AbilityCooldown": 2,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE| DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"stun_duration": 4,
			"chance": 10,
			"str_factor": {
				"value": 0,
				"_str": 10
			},
			"scepter_radius": 300,
			"active_cooldown": 6,
			"cooldown": 2
		}
	},
	"omniknight_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/omniknight/omniknight_1",
		"AbilityTextureName": "omniknight_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES_STRONG",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastPoint": 0.3,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 8,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": "20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"base_damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_str": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"str_factor": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40",
			"radius": 400,
			"stun_duration": 2,
			"max_charges": 3,
			"charge_restore_time": 8,
			"scepter_charges": 4,
			"damage_increase_pct": 25
		}
	},
	"omniknight_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/omniknight/omniknight_2",
		"AbilityTextureName": "omniknight_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 60,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"radius": 600,
			"health_regen": "10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
			"mana_regen": "4 8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68 72 76 80",
			"health_regen_pct": "0.5 1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 6 6.5 7 7.5 8 8.5 9 9.5 10",
			"chance": "61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80",
			"attackspeed_reduce": 50,
			"movespeed_reduce": 15,
			"duration": 40,
			"scepter_damage": {
				"value": 0,
				"_str": 10
			},
			"scepter_interval": 1
		}
	},
	"omniknight_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/omniknight/omniknight_3",
		"AbilityTextureName": "omniknight_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES_STRONG",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"bonus_attackspeed": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
			"bonus_str": "40 80 120 160 200 240 280 320 360 400 440 480 520 560 600 640 680 720 760 800",
			"bonus_str_pct": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"bonus_chance": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"bonus_str_factor": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"attack_count": 8
		}
	},
	"omniknight_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/omniknight/omniknight_4",
		"AbilityTextureName": "omniknight_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastPoint": 0,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "60 120 180 240 300 360 420 480",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_TOGGLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"bonus_movespeed": "45 60 75 90 105 120 135 150",
			"bonus_resistance": "10 12 14 16 18 20 22 24",
			"bonus_amp_percent": "100 125 150 175 200 225 250 275",
			"mana_cost": "10 20 30 40 50 60 70 80",
			"palsy_attackspeed": "80 100 120 140 160 180 200 220",
			"palsy_movespeed": "120 135 150 165 180 195 210 225",
			"palsy_duration": 0.5,
			"palsy_interval": 1,
			"scepter_damage": {
				"value": 0,
				"_str": 10
			},
			"palsy_radius": 600,
			"storm_str_damage": {
				"value": 0,
				"_str": "10 20 30 40 50 60 70 80"
			},
			"storm_jump_count": 4,
			"storm_chance": 30,
			"storm_interval": 0.3,
			"bonus_attackspeed": "60 70 80 90 100 110 120 130"
		}
	},
	"templar_assassin_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/templar_assassin/templar_assassin_0",
		"AbilityTextureName": "templar_assassin_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"PurgeType": "PurgeTypeStrong",
		"MaxLevel": 1,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 6,
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityValues": {
			"charge_restore_time": 6,
			"max_charges": 3,
			"cost_pct_per_stack": 3,
			"scepter_damage": 10,
			"scepter_radius": 300
		}
	},
	"templar_assassin_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/templar_assassin/templar_assassin_1",
		"AbilityTextureName": "templar_assassin_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "40 80 120 160 200 240 280 320 360 400 440 480 520 560 600 640 680 720 760 800",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "250 500 750 1000 1250 1500 1750 2000 2250 2500 2750 3000 3250 3500 3750 4000 4250 4500 4750 5000",
				"_agi": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60"
			},
			"health_pct": 30,
			"angle": 90,
			"distance": 600,
			"duration": 5,
			"speed": 2000,
			"bonus_pct": 50,
			"scepter_duration": 2
		}
	},
	"templar_assassin_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/templar_assassin/templar_assassin_2",
		"AbilityTextureName": "templar_assassin_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 0.1,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 6,
		"AbilityCooldown": 6,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "3|4",
		"AbilityManaCost": "20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"speed": 1600,
			"distance": 800,
			"movespeed": 50,
			"duration": 3,
			"radius": 200,
			"scepter_refresh_chance": 30
		}
	},
	"templar_assassin_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/templar_assassin/templar_assassin_3",
		"AbilityTextureName": "templar_assassin_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": "60 120 180 240 300 360 420 480 540 600 660 720 780 840 900 960 1020 1080 1140 1200",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_agi": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"resistance": "5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100",
			"duration": 6,
			"radius": 150,
			"damage_tick": 0.25,
			"active_radius": 300,
			"active_duration": 1,
			"delay": 0.5,
			"bonus_attack_range": "20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400",
			"scepter_stun_duration": 2
		}
	},
	"templar_assassin_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/templar_assassin/templar_assassin_4",
		"AbilityTextureName": "templar_assassin_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCooldown": 30,
		"AbilityManaCost": "200 400 600 800 1000 1200 1400 1600",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_TOGGLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "400 800 1200 1600 2000 2400 2800 3200",
				"_agi": "2 4 6 8 10 12 14 16"
			},
			"damage_tick": 0.2,
			"radius": 600,
			"mana_cost_pct": 2,
			"turn_rate": 80,
			"movespeed": 100,
			"duration": 0.1,
			"scepter_chance": 15
		}
	},
	"drow_ranger_0_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_0_1",
		"AbilityTextureName": "drow_ranger_frost_arrows",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"chance": 25,
			"agi_damage": 5,
			"radius": 300,
			"delay": 0.5,
			"agi_damage_increase": 0.01
		}
	},
	"drow_ranger_0_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_0_2",
		"AbilityTextureName": "drow_ranger_0_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"AbilityValues": {
			"agi_factor": 5,
			"bonus_attack_range": 550
		}
	},
	"drow_ranger_1_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_1_1",
		"AbilityTextureName": "drow_ranger_1_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1200,
		"AbilityCooldown": 8,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"arrows_per_sec": 16,
			"distance": 1000,
			"chance": 15,
			"cooldown": 3,
			"duration": 4,
			"base_damage": 50,
			"agility_damage": 1.5,
			"radius": 500,
			"movespeed_reduce": 30,
			"reduce_duration": 1.5,
			"collision_radius": 50,
			"speed": 900
		}
	},
	"drow_ranger_1_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_1_2",
		"AbilityTextureName": "drow_ranger_1_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 4,
			"count": 4,
			"attack_factor": 0.25,
			"interval": 0.3
		}
	},
	"drow_ranger_2_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_2_1",
		"AbilityTextureName": "drow_ranger_marksmanship",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"base_damage": 50,
			"agi_damage": 2,
			"duration": 3
		}
	},
	"drow_ranger_2_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_2_2",
		"AbilityTextureName": "drow_ranger_3_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"base_damage": 50,
			"agi_damage": 2,
			"duration": 3
		}
	},
	"drow_ranger_3_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_3_1",
		"AbilityTextureName": "drow_ranger_marksmanship",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"base_damage": 50,
			"agi_damage": 1.5,
			"movespeed_reduce": -10,
			"reduce_duration": 3,
			"require_count": 8,
			"curse_duration": 2
		}
	},
	"drow_ranger_3_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_3_2",
		"AbilityTextureName": "drow_ranger_3_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"base_damage": 50,
			"agi_damage": 0.1,
			"extra_agi_damage": 4,
			"require_count": 30,
			"agi_percent": 40,
			"duration": 4,
			"debuff_duration": 3
		}
	},
	"drow_ranger_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_0",
		"AbilityTextureName": "drow_ranger_frost_arrows",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"agi_damage": 5,
			"radius": 300,
			"delay": 0.5,
			"agi_damage_increase": 0.01
		}
	},
	"drow_ranger_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_1",
		"AbilityTextureName": "drow_ranger_1_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1200,
		"AbilityCooldown": 8,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"speed": 900,
			"arrows_per_sec": 16,
			"distance": 1000,
			"chance": 15,
			"duration": 4,
			"base_damage": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
			"curse_duration": 2,
			"require_count": 8,
			"agility_damage": "0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5",
			"radius": 500,
			"movespeed_reduce": 30,
			"reduce_duration": 1.5,
			"collision_radius": 50
		}
	},
	"drow_ranger_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_2",
		"AbilityTextureName": "drow_ranger_1_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 12,
		"AbilityManaCost": "20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 6,
			"count": 4,
			"attack_factor": "0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5",
			"interval": 0.3
		}
	},
	"drow_ranger_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_3",
		"AbilityTextureName": "drow_ranger_3_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"base_damage": "25 50 75 100 125 150 175 200 225 250 275 300 325 350 375 400 425 450 475 500",
			"attack_damage": "0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2",
			"extra_agi_damage": "4 8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68 72 76 80",
			"require_count": 30,
			"agi_percent": 40,
			"duration": 4,
			"debuff_duration": 3
		}
	},
	"drow_ranger_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/drow_ranger/drow_ranger_4",
		"AbilityTextureName": "drow_ranger_marksmanship_ti9",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastPoint": 2,
		"AbilityCooldown": 60,
		"AbilityManaCost": "200 400 600 800 1000 1200 1400 1600",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"broke_damage": 50,
			"agi_damage": "120 240 360 480 600 720 840 960"
		}
	},
	"spectre_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_0",
		"AbilityTextureName": "spectre_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCooldown": 3,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 5,
			"unit_limit": 6,
			"attack_count": 3,
			"damage": 60,
			"health": 30,
			"radius": 600,
			"scepter_illusion_damage": 100
		}
	},
	"spectre_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_1",
		"AbilityTextureName": "spectre_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCooldown": 3,
		"AbilityManaCost": "100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270 280 290",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_str": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"distance": 3000,
			"speed": 2000,
			"radius": 200,
			"per_damage": {
				"value": 0,
				"_str": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"movespeed": 60,
			"duration": 10,
			"root_duration": "1.5 1.7 1.9 2.1 2.3 2.5 2.7 2.9 3.1 3.3 3.5 3.7 3.9 4.1 4.3 4.5 4.7 4.9 5.1 5.3"
		}
	},
	"spectre_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_2",
		"AbilityTextureName": "spectre_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCooldown": 10,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_str": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"damage_limit": {
				"value": 0,
				"_str": "8 16 24 32 40 48 56 64 72 80 88 96 104 112 120 128 136 144 152 160"
			},
			"health_cost": 1,
			"damage_active": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"heal": "0.3 0.6 0.9 1.2 1.5 1.8 2.1 2.4 2.7 3 3.3 3.6 3.9 4.2 4.5 4.8 5.1 5.4 5.7 6",
			"radius": 450,
			"shock_duration": 3,
			"damage_add": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"active_health_cost": 30,
			"scepter_min_damage_pct": 50
		}
	},
	"spectre_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_3",
		"AbilityTextureName": "spectre_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"health": 1,
			"max_reduce": "42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80",
			"damage": {
				"value": 0,
				"_str": "0.05 0.1 0.15 0.2 0.25 0.3 0.35 0.4 0.45 0.5 0.55 0.6 0.65 0.7 0.75 0.8 0.85 0.9 0.95 1"
			},
			"radius": 350,
			"regen": "12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50",
			"str": "0.5 1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 6 6.5 7 7.5 8 8.5 9 9.5 10",
			"damage_limit": 0.1,
			"max_radius": 1200,
			"health_str": 0.3,
			"trigge_percent": 1,
			"scepter_damage_limit": 15
		}
	},
	"spectre_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_4",
		"AbilityTextureName": "spectre_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1200,
		"AbilityCooldown": 60,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "300 450 600 750 900 1050 1200 1350",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_str": "30 60 90 120 150 180 210 240"
			},
			"soul_loss": 30,
			"damage_count": 4,
			"max_bonus_damage": 30,
			"duration": 30,
			"stun_duration": 2.5,
			"radius": 450,
			"damage_deepen": 50,
			"damage_time_point": 1.4,
			"scepter_cooldown": 50
		}
	},
	"spectre_1_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/spectre/spectre_1",
		"AbilityTextureName": "spectre_1_0",
		"AbilityCastAnimation": "ACT_DOTA_CAST4_STATUE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_HIDDEN"
	},
	"juggernaut_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_0",
		"AbilityTextureName": "juggernaut_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 1,
		"AbilityCooldown": 10,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"duration": 4,
			"critical": 400,
			"attackspeed": 100
		},
		"AbilityDuration": 6
	},
	"juggernaut_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_1",
		"AbilityTextureName": "juggernaut_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"PurgeType": "PurgeTypeWeak",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_OVERRIDE_ABILITY_1",
		"AbilityCooldown": 12,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_attack_damage": "0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5"
			},
			"blade_fury_radius": 600,
			"attackspeed": 100,
			"movespeed": 80,
			"duration": 4,
			"blade_fury_damage_tick": 0.2,
			"illusion_damage_percent": 30
		}
	},
	"juggernaut_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_2",
		"AbilityTextureName": "juggernaut_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"PurgeType": "PurgeTypeWeak",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 30,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"duration": 30,
			"output_damage": "55 60 65 70 75 80 85 90 95 100 105 110 115 120 125 130 135 140 145 150",
			"input_damage": "72.5 70 67.5 65 62.5 60 57.5 55 52.5 50 47.5 45 42.5 40 37.5 35 32.5 30 27.5 25",
			"images_count": "1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5",
			"invuln_duration": 0.3
		},
		"AbilityDuration": 10
	},
	"juggernaut_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_3",
		"AbilityTextureName": "juggernaut_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "3|4",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "80 160 240 320 400 480 560 640 720 800 880 960 1040 1120 1200 1280 1360 1440 1520 1600",
				"_attack_damage": "0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 1.1 1.80 2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2"
			},
			"bonus_attack_speed": 15,
			"duration": "4 4.4 4.8 5.2 5.6 6 6.4 6.8 7.2 7.6 8 8.4 8.8 9.2 9.6 10 10.4 10.8 11.2 11.6",
			"radius": 300,
			"scepter_damage_pct": 1,
			"scepter_reduce_pct": 0.5,
			"scepter_ignore_armor_chance": 35
		},
		"AbilityDuration": 6
	},
	"juggernaut_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_4",
		"AbilityTextureName": "juggernaut_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 16,
		"AbilityManaCost": 110,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NO_INVIS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"duration": "1.5 1.6 1.7 1.8 1.9 2 2.1 2.2",
			"radius": 600,
			"interval": 0.05,
			"damage": {
				"value": 0,
				"_attack_damage": "3.6 7.2 10.8 14.4 18 21.6 25.2 28.8"
			},
			"buff_duration": 4
		},
		"AbilityDuration": 9
	},
	"juggernaut_2_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_2_1",
		"AbilityTextureName": "juggernaut_2_1",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES_STRONG",
		"MaxLevel": 20,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK_EVENT",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"duration": 1,
			"width": 225
		}
	},
	"juggernaut_0_juggernaut_01": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_0_juggernaut_01",
		"AbilityTextureName": "juggernaut_0_juggernaut_01",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 1,
		"AbilityCastRange": 1200,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"threshold": 8,
			"interval": 0.1,
			"duration": 10,
			"scepter_mark_damage": {
				"value": 0,
				"_agi": 8
			}
		}
	},
	"juggernaut_1_juggernaut_01": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_1_juggernaut_01",
		"AbilityTextureName": "juggernaut_1_juggernaut_01",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastPoint": 0.15,
		"AbilityCooldown": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115 120 125 130 135",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_agi": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"radius": 450,
			"interval": 0.1
		}
	},
	"juggernaut_2_juggernaut_01": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_2_juggernaut_01",
		"AbilityTextureName": "juggernaut_2_juggernaut_01",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 3000,
		"AbilityCooldown": 16,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"property_pct": "43 46 49 52 55 58 61 64 67 70 73 76 79 82 85 88 91 94 97 100",
			"duration": 8
		}
	},
	"juggernaut_2_juggernaut_01_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_2_juggernaut_01_1",
		"AbilityTextureName": "juggernaut_2_juggernaut_01_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 1,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 6000,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"speed": 1600,
			"property_pct": "43 46 49 52 55 58 61 64 67 70 73 76 79 82 85 88 91 94 97 100",
			"duration": 8
		}
	},
	"juggernaut_3_juggernaut_01": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_3_juggernaut_01",
		"AbilityTextureName": "juggernaut_3_juggernaut_01",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCooldown": 20,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"duration": 10,
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_agi": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"distance": 2000,
			"start_radius": 175,
			"end_radius": 225
		}
	},
	"juggernaut_4_juggernaut_01": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/juggernaut/juggernaut_01/juggernaut_4_juggernaut_01",
		"AbilityTextureName": "juggernaut_4_juggernaut_01",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_TAUNT",
		"AbilityCastPoint": 0.72,
		"AbilityCooldown": 60,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"delay": 0.75,
			"radius": 600,
			"interval": 0.3,
			"wave_damage": {
				"value": "400 800 1200 1600 2000 2400 2800 3200",
				"_agi": "20 40 60 80 100 120 140 160"
			},
			"distance": 2000,
			"start_radius": 225,
			"end_radius": 300,
			"count": 8,
			"duration": 3.15,
			"damage": {
				"value": "400 800 1200 1600 2000 2400 2800 3200",
				"_agi": "100 200 300 400 500 600 700 800"
			}
		}
	},
	"nevermore_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/nevermore/nevermore_0",
		"AbilityTextureName": "nevermore_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCooldown": 1,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 250,
			"damage": {
				"value": 0,
				"_str": 5
			},
			"scepter_cooldown": 0.5,
			"trigger_pct": 90,
			"respawn_cooldown": 30
		}
	},
	"nevermore_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/nevermore/nevermore_1",
		"AbilityTextureName": "nevermore_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_RAZE_2",
		"AbilityCastPoint": 0.55,
		"AbilityCooldown": 8,
		"AbilityManaCost": "40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "175 350 525 700 875 1050 1225 1400 1575 1750 1925 2100 2275 2450 2625 2800 2975 3150 3325 3500",
				"_str": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"shadowraze_radius": 300,
			"shadowraze_count": 3,
			"shadowraze_range": "300 600 900",
			"reduce_damage": 30,
			"stack_reduce_damage": 10,
			"max_reduce_damage": 80,
			"duration": 8,
			"combo_duration": 3,
			"scepter_bonus_damage": 50
		}
	},
	"nevermore_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/nevermore/nevermore_2",
		"AbilityTextureName": "nevermore_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_RAZE_3",
		"AbilityCastPoint": 0.55,
		"AbilityCooldown": 45,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_str": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"health_regen_pct": "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23",
			"damage_deepen": 40,
			"movespeed_reduce": 20,
			"duration": 16,
			"radius": 900,
			"scepter_interval": 0.5
		}
	},
	"nevermore_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/nevermore/nevermore_3",
		"AbilityTextureName": "nevermore_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"attack_per_str": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"mana_cost": "10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
			"active_factor": 2,
			"bonus_attackspeed": "20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400",
			"armor_ignore": 60,
			"scepter_crit_damage": 250,
			"scepter_cooldown": 1.5
		}
	},
	"nevermore_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/nevermore/nevermore_4",
		"AbilityTextureName": "nevermore_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_6",
		"AbilityCastPoint": 1.67,
		"AbilityCooldown": 50,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "300 600 900 1200 1500 1800 2100 2400",
				"_str": "6 12 18 24 30 36"
			},
			"soul_count": 24,
			"distance": 1200,
			"fear_duration": 3.6,
			"line_width_start": 125,
			"line_width_end": 350,
			"line_speed": 700,
			"pull_speed": 30,
			"tick_rate": 0.1,
			"pull_rotate_speed": 0.25,
			"animation_rate": 0.2
		}
	},
	"rubick_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/rubick/rubick_0",
		"AbilityTextureName": "rubick_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_int": 10
			},
			"center_damage": 5,
			"radius": 200,
			"center_radius": 50,
			"max_count": 5,
			"damage_factor": {
				"value": 0,
				"_agi": 5
			},
			"bounce_radius": 500
		}
	},
	"rubick_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/rubick/rubick_1",
		"AbilityTextureName": "rubick_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1400,
		"AbilityCooldown": 13,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"pull_damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_int": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"pull_duration": 0.6,
			"pull_bonus": 2,
			"open_damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"radius": 500,
			"interval": 0.1,
			"stun_duration": 1.5
		}
	},
	"rubick_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/rubick/rubick_2",
		"AbilityTextureName": "rubick_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityCastRange": 3000,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 8,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "80 95 110 125 140 155 170 185 200 215 230 245 260 275 290 305 320 335 350 365",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"delay": 1,
			"radius": 300,
			"shield_factor": {
				"value": 0,
				"_int": 50
			},
			"shield_duration": 6,
			"scepter_delay": 0,
			"scepter_factor": 2,
			"cooldown_reduction": 15,
			"stun_duration": 1
		}
	},
	"rubick_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/rubick/rubick_3",
		"AbilityTextureName": "rubick_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1400,
		"AbilityCooldown": 18,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "160 190 220 250 280 310 340 370 400 430 460 490 520 550 580 610 640 670 700 730",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"delay": 1,
			"radius": 400,
			"duration": 5,
			"interval": 0.5,
			"scepter_delay": 0,
			"scepter_interval": 0.25
		}
	},
	"rubick_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/rubick/rubick_4",
		"AbilityTextureName": "rubick_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"SpellDispellableType": "SPELL_DISPELLABLE_NO",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1000,
		"AbilityCooldown": 40,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "300 450 600 750 900 1050 1200 1350",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800",
				"_int": "1 2 3 4 5 6 7 8"
			},
			"movespeed": 100,
			"attackspeed": 99999,
			"radius": 600,
			"interval": 1,
			"interval_reduction": 0.925,
			"count": 50,
			"damage_deepen": 10,
			"scepter_count": 80,
			"health_reduce_pct": 20
		}
	},
	"windrunner_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/windrunner/windrunner_0",
		"AbilityTextureName": "windrunner_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 1,
		"AbilityCastRange": 800,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 16,
		"AbilityCooldown": 16,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"bonus_attack_range": 250,
			"bonus_attackspeed": 400,
			"attacktime": 1,
			"duration": 8,
			"delay_pct": 20,
			"scepter_damage": {
				"value": 0,
				"_agi": 10
			}
		}
	},
	"windrunner_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/windrunner/windrunner_1",
		"AbilityTextureName": "windrunner_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1500,
		"AbilityCooldown": 9,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityChannelTime": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "30 60 90 120 150 180 210 240 270 300 330 360 390 420 450 480 510 540 570 600",
				"_attack_damage": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"range": 1200,
			"speed": 3000,
			"radius": 125,
			"delay": 0.4,
			"cooldown_reduction": 60,
			"bonus_range": 800,
			"bonus_damage_pct": 60,
			"scepter_chance": 15
		}
	},
	"windrunner_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/windrunner/windrunner_2",
		"AbilityTextureName": "windrunner_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"spirit_count": 3,
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"duration": 12,
			"stun_duration": 1,
			"distance": 1200,
			"width": 150,
			"armor_reduce": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40",
			"reduce_duration": 4,
			"speed": 1200
		}
	},
	"windrunner_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/windrunner/windrunner_3",
		"AbilityTextureName": "windrunner_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"SpellDispellableType": "SPELL_DISPELLABLE_YES",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"CustomAbilityCharges": 2,
		"AbilityChargeRestoreTime": 12,
		"AbilityCooldown": 12,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"bonus_movespeed": "54 58 62 66 70 74 78 82 86 90 94 98 102 106 110 114 118 122 126 130",
			"movespeed_pct": "22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60",
			"movespeed_reduce_pct": "12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50",
			"radius": 325,
			"duration": 4
		}
	},
	"windrunner_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/windrunner/windrunner_4",
		"AbilityTextureName": "windrunner_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 90,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "2|3",
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800",
				"_agi": "5 10 15 20 25 30 35 40"
			},
			"damage_radius": 200,
			"radius": 1200,
			"duration": 4,
			"delay": 0.5,
			"interval": 0.03,
			"chance": 40,
			"scepter_bonus_duration": 4,
			"scepter_interval": 8,
			"scepter_duration": 1
		}
	},
	"crystal_maiden_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/crystal_maiden/crystal_maiden_0",
		"AbilityTextureName": "crystal_maiden_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "1|3",
		"AbilityManaCost": 50,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_BOTH",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"duration": 5,
			"radius": 275,
			"movespeed_reduce_pct": 8,
			"cold_radius": 900,
			"mark_duration": 10,
			"max_count": 5,
			"scepter_freeze_duration": 2
		}
	},
	"crystal_maiden_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/crystal_maiden/crystal_maiden_1",
		"AbilityTextureName": "crystal_maiden_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 15,
		"AbilityCooldown": 15,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_int": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60"
			},
			"frozen_duration": 1.2,
			"duration": 6,
			"movespeed": "25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115 120",
			"attackspeed": "25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115 120",
			"radius": 900,
			"radius_per_cold": 100,
			"damage_per_cold": 30,
			"frozen_per_cold": 0.3
		}
	},
	"crystal_maiden_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/crystal_maiden/crystal_maiden_2",
		"AbilityTextureName": "crystal_maiden_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityManaCost": "80 85 90 95 100 105 110 115 120 125 130 135 140 145 150 155 160 165 170 175",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"duration": 6,
			"radius": 300,
			"movespeed_reduce": 50,
			"slow_duration": 3,
			"interval": 0.8,
			"delay": 0.4,
			"interval_per_cold": 0.05,
			"radius_per_cold": 30
		}
	},
	"crystal_maiden_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/crystal_maiden/crystal_maiden_3",
		"AbilityTextureName": "crystal_maiden_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"cooldown_reduce": "11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30",
			"mana_regen": "8 16 24 32 40 48 56 64 72 80 88 96 104 112 120 128 136 144 152 160",
			"refresh_chance": 15,
			"scepter_max_count": 3,
			"chance_per_cold": 1
		}
	},
	"crystal_maiden_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/crystal_maiden/crystal_maiden_4",
		"AbilityTextureName": "crystal_maiden_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600",
				"_int": "2 4 6 8 10 12 14 16"
			},
			"radius": 900,
			"duration": 8,
			"curse_duration": 4,
			"damage_deepen": "40 60 80 100 120 140 160 180",
			"frozen_speed": 150,
			"duration_per_cold": 1
		}
	},
	"oracle_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/oracle/oracle_0",
		"AbilityTextureName": "oracle_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.15,
		"AbilityCooldown": 30,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": 50,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_BOTH",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"intellect_stack": 5,
			"exp_gain_pct": 30,
			"bonus_damage": 50,
			"bonus_damage_stack": 1,
			"duration": 15
		}
	},
	"oracle_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/oracle/oracle_1",
		"AbilityTextureName": "oracle_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.15,
		"AbilityCooldown": 2.25,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "80 160 240 320 400 480 560 640 720 800 880 960 1040 1120 1200 1280 1360 1440 1520 1600",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"damage_dot": {
				"value": 0,
				"_int": "0.5 1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 6 6.5 7 7.5 8 8.5 9 9.5 10"
			},
			"interval": 0.25,
			"radius": 300,
			"duration": 9,
			"damage_reduce_pct": 30,
			"scepter_interval": 1
		}
	},
	"oracle_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/oracle/oracle_2",
		"AbilityTextureName": "oracle_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 16,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"bonus_intellect": "10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
			"base_level": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"util_level": "1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5",
			"cooldown_reduction": "21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40",
			"duration": 9,
			"scepter_bonus_int_pct": 15
		}
	},
	"oracle_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/oracle/oracle_3",
		"AbilityTextureName": "oracle_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 28,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_int": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60"
			},
			"movespeed": 200,
			"block_count": "6 6 6 6 7 7 7 7 8 8 8 8 9 9 9 9 10 10 10 10",
			"block_duration": 1,
			"duration": 14,
			"scepter_root_radius": 300,
			"scepter_root_duration": 1
		}
	},
	"oracle_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/oracle/oracle_4",
		"AbilityTextureName": "oracle_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 60,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600",
				"_int": "80 160 240 320 400 480 560 640"
			},
			"radius": 600,
			"pull_duration": 0.5,
			"stun_duration": 2,
			"imprison_duration": 6,
			"bonus_damage": 200
		}
	},
	"void_spirit_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/void_spirit/void_spirit_0",
		"AbilityTextureName": "void_spirit_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1200,
		"AbilityCooldown": 5,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 10,
			"scepter_cooldown": 2
		}
	},
	"void_spirit_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/void_spirit/void_spirit_1",
		"AbilityTextureName": "void_spirit_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastPoint": 0,
		"AbilityCooldown": 10,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"base_shield": "2000 4000 6000 8000 10000 12000 14000 16000 18000 20000 22000 24000 26000 28000 30000 32000 34000 36000 38000 40000",
			"damage_reduce_pct": 20,
			"shield_per_attack": {
				"value": 0,
				"_int": 40
			},
			"radius": 500,
			"duration": 10,
			"active_duration": 0.3,
			"debuff_duration": 6
		}
	},
	"void_spirit_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/void_spirit/void_spirit_2",
		"AbilityTextureName": "void_spirit_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 0.2,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 12,
		"AbilityCooldown": 12,
		"AbilityManaCost": "60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"radius": 275,
			"disappear_time": 1.3,
			"stun_duration": 2
		}
	},
	"void_spirit_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/void_spirit/void_spirit_3",
		"AbilityTextureName": "void_spirit_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 0.2,
		"CustomAbilityCharges": 2,
		"AbilityChargeRestoreTime": 6,
		"AbilityCooldown": 6,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "3|4",
		"AbilityManaCost": "20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 175,
			"min_travel_distance": 200,
			"max_travel_distance": 1600,
			"pop_damage_delay": 2,
			"movement_slow_pct": 80,
			"search_radius": 300,
			"bonus_damage": "400 800 1200 1600 2000 2400 2800 3200 3600 4000 4400 4800 5200 5600 6000 6400 6800 7200 7600 8000",
			"damage": {
				"value": 0,
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"damage_deepen": 50,
			"scepter_cooldown": 2
		}
	},
	"void_spirit_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/void_spirit/void_spirit_4",
		"AbilityTextureName": "void_spirit_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 40,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "400 800 1200 1600 2000 2400 2800 3200",
				"_int": "100 200 300 400 500 600 700 800"
			},
			"radius": 275,
			"disappear_time": 1.3,
			"portals_per_ring": 6,
			"destination_fx_radius": 183,
			"angle_per_ring_portal": 60,
			"first_ring_distance_offset": 520,
			"stun_duration": 6
		}
	},
	"monkey_king_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/monkey_king/monkey_king_0",
		"AbilityTextureName": "monkey_king_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage_reduce": 0.5,
			"damage_deep": 2,
			"scepter_chance": 15,
			"scepter_critical": 50
		}
	},
	"monkey_king_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/monkey_king/monkey_king_1",
		"AbilityTextureName": "monkey_king_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_MK_STRIKE",
		"AbilityCooldown": 10,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_agi": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"strike_damage": {
				"value": 0,
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"radius": 350,
			"miss": 60,
			"distance": 1200,
			"duration": 4
		}
	},
	"monkey_king_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/monkey_king/monkey_king_2",
		"AbilityTextureName": "monkey_king_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 16,
		"AbilityManaCost": "80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230 240 250 260 270",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage_reduce_percent": "2.5 5 7.5 10 12.5 15 17.5 20 22.5 25 27.5 30 32.5 35 37.5 40 42.5 45 47.5 50",
			"bonus_armor": "10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105",
			"duration": 2,
			"shield_duration": 10,
			"radius": 600,
			"cooldown_reduce": 80,
			"movespeed": 120
		}
	},
	"monkey_king_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/monkey_king/monkey_king_3",
		"AbilityTextureName": "monkey_king_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCooldown": 20,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "1|2",
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"cleave_radius": 300,
			"cleave_damage": "60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440",
			"duration": "6.5 7 7.5 8 8.5 9 9.5 10 10.5 11 11.5 12 12.5 13 13.5 14 14.5 15 15.5 16",
			"summon_count": 2,
			"max_count": 9,
			"scepter_interval": 4,
			"scepter_duration": 12,
			"scepter_counter_duration": 2,
			"scepter_counter_attack": 1
		}
	},
	"monkey_king_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/monkey_king/monkey_king_4",
		"AbilityTextureName": "monkey_king_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_MK_STRIKE",
		"AbilityCastRange": 1200,
		"AbilityCooldown": 60,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"thump_damage": {
				"value": 0,
				"_attack_damage": "40 80 120 160 200 240 280 320"
			},
			"thump_radius": 1200,
			"thump_duration": 1,
			"crush_damage": {
				"value": 0,
				"_attack_damage": "80 160 240 320 400 480 560 640"
			},
			"crush_radius": 400,
			"crush_duration": 4,
			"pure_pct": "20 30 40 50 60 70 80 90",
			"scepter_count": 9,
			"scepter_damage_pct": 20
		}
	},
	"lina_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/lina/lina_0",
		"AbilityTextureName": "lina_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_int": 1
			},
			"reduce": {
				"value": 0,
				"_int": 0.5
			},
			"duration": 10,
			"radius": 350,
			"interval": 1,
			"ignite_count": 1,
			"scepter_damage": {
				"value": 0,
				"_int": 192
			},
			"scepter_chance": 30,
			"scepter_ignite_count": 6
		}
	},
	"lina_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/lina/lina_1",
		"AbilityTextureName": "lina_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 2000,
		"AbilityCastPoint": 0.48,
		"AbilityCooldown": 12,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_int": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60"
			},
			"duration": 3,
			"distance": 2000,
			"width": 200,
			"stun_duration": 1.5,
			"miss": 100,
			"miss_duration": 3.5,
			"ignite_count": 6,
			"scepter_duration": 6,
			"scepter_damage_pct": 20
		}
	},
	"lina_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/lina/lina_2",
		"AbilityTextureName": "lina_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1300,
		"AbilityCastPoint": 0.48,
		"AbilityCooldown": 6,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "80 160 240 320 400 480 560 640 720 800 880 960 1040 1120 1200 1280 1360 1440 1520 1600",
				"_int": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"radius": 350,
			"stun_duration": 1.5,
			"tick_damage": {
				"value": 0,
				"_int": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"duration": 3,
			"interval": 1,
			"movespeed": 80,
			"ignite_count": 3,
			"scepter_count": 2
		}
	},
	"lina_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/lina/lina_3",
		"AbilityTextureName": "lina_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_int": "0.25 0.5 0.75 1.0 1.25 1.5 1.75 2 2.25 2.5 2.75 3.0 3.25 3.5 3.75 4.0 4.25 4.5 4.75 5.0"
			},
			"bonus_attack_speed": 10,
			"duration": 5,
			"interval": 1,
			"ignite_count": 1
		}
	},
	"lina_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/lina/lina_4",
		"AbilityTextureName": "lina_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"_int": "12 24 36 48 60 72 84 96"
			},
			"radius": 250,
			"max_radius": 800,
			"stun_duration": "1.25 1.5 1.75 2 2.25 2.5 2.75 3",
			"delay": 1,
			"wave_count": 12,
			"count_per_wave": 2,
			"interval": 0.25,
			"duration": 3,
			"ignite_count": 2,
			"scepter_meteor_damage_pct": 60
		}
	},
	"ember_spirit_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_0",
		"AbilityTextureName": "ember_spirit_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCooldown": 2,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 4,
			"critical": 400,
			"radius": 200
		},
		"AbilityDuration": 6
	},
	"ember_spirit_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_1",
		"AbilityTextureName": "ember_spirit_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastRange": 1000,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "200 400 600 800 1000 1200 1400 1600 1800 2000 2200 2400 2600 2800 3000 3200 3400 3600 3800 4000",
				"_attack_damage": "1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5 5.25 5.5 5.75 6"
			},
			"interval": 0.1,
			"radius": 600,
			"count": 6,
			"scepter_bonus_charges": 2,
			"scepter_cooldown": 8
		}
	},
	"ember_spirit_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_2",
		"AbilityTextureName": "ember_spirit_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1000,
		"AbilityCooldown": 6,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityChannelTime": 0.5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"distance": 1350
		}
	},
	"ember_spirit_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_3",
		"AbilityTextureName": "ember_spirit_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 10,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage_reduce_pct": "22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60",
			"health_cost_pct": "0.4 1 1.4 1.8 2.2 2.6 3 3.4 3.8 4.2 4.6 5 5.4 5.8 6.2 6.6 7 7.4 7.8 8.2",
			"attack_per_health": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
			"bonus_stack": "1 2 2 2 3 3 3 4 4 4 5 5 5 6 6 6 7 7 7 8"
		}
	},
	"ember_spirit_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_4",
		"AbilityTextureName": "ember_spirit_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_INVALID",
		"AbilityCastRange": 0,
		"CustomAbilityCharges": 3,
		"AbilityChargeRestoreTime": 16,
		"AbilityCooldown": 16,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "1|2",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"speed_multiplier": 400,
			"max_charges": 3,
			"charge_restore_time": 16,
			"damage": {
				"value": "100 200 300 400 500 600 700 800",
				"_agi": "30 60 90 120 150 180 210 240"
			},
			"radius": 450,
			"duration": 45,
			"scepter_max_charges": 6
		}
	},
	"ember_spirit_4_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/ember_spirit/ember_spirit_4",
		"AbilityTextureName": "ember_spirit_4_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 8,
		"AbilityCastAnimation": "ACT_INVALID",
		"AbilityCooldown": 0,
		"AbilityManaCost": "50 75 100 125 150 175 200 225",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_AUTOCAST | DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"speed_multiplier": 400,
			"max_charges": 3,
			"charge_restore_time": 38,
			"damage": {
				"value": "100 200 300 400 500 600 700 800",
				"_agi": "30 60 90 120 150 180 210 240"
			},
			"radius": 450,
			"speed": 1300,
			"scepter_max_charges": 6
		}
	},
	"legion_commander_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/legion_commander/legion_commander_0",
		"AbilityTextureName": "legion_commander_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"duration": 2,
			"threshold": 50,
			"scepter_threshold": 30
		}
	},
	"legion_commander_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/legion_commander/legion_commander_1",
		"AbilityTextureName": "legion_commander_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"radius": 500,
			"duration": 12,
			"regen": "1 2 3 4 5 6  8 9 10 11 12 13 14 15 16 17 18 19 20",
			"critical": 250,
			"armor": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60",
			"cooldown": 0.5,
			"taunt_duration": 3,
			"scepter_duration": 6,
			"scepter_armor_pct": 60
		}
	},
	"legion_commander_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/legion_commander/legion_commander_2",
		"AbilityTextureName": "legion_commander_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 30,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage_percent": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60",
			"attackspeed": "10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
			"health": 80,
			"movespeed": "5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100",
			"duration": "5 5.2 5.4 5.6 5.8 6 6.2 6.4 6.6 6.8 7 7.2 7.4 7.6 7.8 8 8.2 8.4 8.6 8.8",
			"scepter_duration": 2
		}
	},
	"legion_commander_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/legion_commander/legion_commander_3",
		"AbilityTextureName": "legion_commander_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"AbilityCooldown": 2,
		"IgnoreCooldownReduction": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "80 160 240 320 400 480 560 640 720 800 880 960 1040 1120 1200 1280 1360 1440 1520 1600",
				"_attack_damage": "1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5 5.25 5.5 5.75 6"
			},
			"heal": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40",
			"refresh_chance": "15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34",
			"distance": 500,
			"width": 200,
			"speed": 1000,
			"scepter_attack": 10
		}
	},
	"legion_commander_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/legion_commander/legion_commander_4",
		"AbilityTextureName": "legion_commander_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCooldown": 45,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"str": "50 100 150 200 250 300 350 400",
			"str_percent": "4 8 12 16 20 24 28 32",
			"chance": "15 20 25 30 35 40 45 50",
			"duration": 5,
			"kill_str": 0.24
		}
	},
	"antimage_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/antimage/antimage_0",
		"AbilityTextureName": "antimage_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"AbilityCooldown": 10,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityValues": {
			"stats": 1,
			"max_count": 50,
			"all": 0.1,
			"duration": 10,
			"scepter_max_count": 100
		}
	},
	"antimage_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/antimage/antimage_1",
		"AbilityTextureName": "antimage_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 6,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000",
				"_agi": "3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60"
			},
			"radius": 500,
			"angle": 86,
			"regen": 30
		}
	},
	"antimage_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/antimage/antimage_2",
		"AbilityTextureName": "antimage_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_OVERRIDE_ABILITY_4",
		"AbilityCooldown": 45,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 3,
		"AbilityManaCost": "120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": "10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
				"_agi": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
			},
			"radius": 400,
			"duration": 15,
			"heal": "5 5.4 5.8 6.2 6.6 7 7.4 7.8 8.2 8.6 9 9.4 9.8 10.2 10.6 11 11.4 11.8 12.2 12.6"
		}
	},
	"antimage_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/antimage/antimage_3",
		"AbilityTextureName": "antimage_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 1,
		"LevelsBetweenUpgrades": 3,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"attack": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40",
			"damage": {
				"value": 0,
				"_attack_damage": "0.25 0.5 0.75 1 1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5"
			},
			"duration": 5,
			"max_attack": 10
		}
	},
	"antimage_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/antimage/antimage_4",
		"AbilityTextureName": "antimage_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.35,
		"AbilityCooldown": 120,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "300 450 600 750 900 1050 1200 1350",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": 40,
			"transformation_time": 0.35,
			"base_attack_time": 1,
			"bonus_range": 800,
			"bonus_damage": "400 800 1200 1600 2000 2400 2800 3200",
			"cleave_radius": 300,
			"cleave_damage": 100,
			"spirits": 20,
			"spirit_speed": 800,
			"max_distance": 2000,
			"give_up_distance": 1700,
			"ghost_spawn_rate": 0.25,
			"radius": 1000,
			"damage": {
				"value": 0,
				"_attack_damage": "0.5 1 1.5 2 2.5 3 3.5 4"
			},
			"heal_percent": 10
		}
	},
	"phantom_assassin_0": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/phantom_assassin/phantom_assassin_0",
		"AbilityTextureName": "phantom_assassin_0",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 1,
		"HasScepterUpgrade": 1,
		"ScepterLevel": "1|3",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"duration": 10,
			"bonus_damage_percent": 4,
			"critical_chance": 30,
			"critical_damage": 400,
			"life_steal": 10,
			"scepter_attack": 8,
			"scepter_crit_damage": 100
		}
	},
	"phantom_assassin_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/phantom_assassin/phantom_assassin_1",
		"AbilityTextureName": "phantom_assassin_1",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastAnimation": "ACT_DOTA_SPAWN",
		"AbilityCastPoint": 0,
		"AbilityCooldown": 8,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 2,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_attack_damage": "1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5 5.25 5.5 5.75 6"
			},
			"radius": 300,
			"duration": 3,
			"reduce_pct": 100,
			"cooldown_pct": 10
		}
	},
	"phantom_assassin_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/phantom_assassin/phantom_assassin_2",
		"AbilityTextureName": "phantom_assassin_2",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastRange": 0,
		"AbilityCastPoint": 0.1,
		"AbilityCooldown": 6,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": {
				"value": "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
				"_attack_damage": "1.25 1.5 1.75 2 2.25 2.5 2.75 3 3.25 3.5 3.75 4 4.25 4.5 4.75 5 5.25 5.5 5.75 6"
			},
			"blink_range": "550 600 650 700 750 800 850 900 950 1000 1050 1100 1150 1200 1250 1300 1350 1400 1450 1500",
			"width": 200
		}
	},
	"phantom_assassin_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/phantom_assassin/phantom_assassin_3",
		"AbilityTextureName": "phantom_assassin_3",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"MaxLevel": 20,
		"RequiredLevel": 0,
		"LevelsBetweenUpgrades": 3,
		"AbilityCastRange": 625,
		"AbilityCooldown": 10,
		"AbilityManaCost": "40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200 210 220 230",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"chance": 25,
			"damage": {
				"value": 0,
				"_agi": "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40"
			},
			"reduce_armor": "6 12 18 24 30 36 42 48 54 60 66 72 78 84 90 96 102 108 114 120",
			"duration": 2
		}
	},
	"phantom_assassin_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/phantom_assassin/phantom_assassin_4",
		"AbilityTextureName": "phantom_assassin_4",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 8,
		"RequiredLevel": 8,
		"LevelsBetweenUpgrades": 24,
		"AbilityCastAnimation": "ACT_DOTA_SPAWN",
		"AbilityCastRange": 0,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 100,
		"HasScepterUpgrade": 1,
		"ScepterLevel": 4,
		"AbilityManaCost": "200 300 400 500 600 700 800 900",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"range": 900,
			"damage": {
				"value": 0,
				"_attack_damage": "1 2 3 4 5 6 7 8"
			},
			"interval": 0.04,
			"width": 200,
			"count": 60,
			"scepter_interval": 0.4
		}
	},
	"ogre_strike": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/ogre_strike",
		"AbilityTextureName": "meepo_geostrike_scavenger",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 583,
		"AbilityCastPoint": 1.7,
		"AbilityCooldown": 12,
		"AbilityManaCost": 80,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"stun_duration": 2,
			"radius": 400,
			"damage": 12000
		}
	},
	"ogre_jump_strike": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/ogre_jump_strike",
		"AbilityTextureName": "brewmaster_thunder_clap",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 2.1,
		"AbilityCooldown": 8,
		"AbilityManaCost": 80,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"stun_duration": 2,
			"radius": 400,
			"damage": 12000
		}
	},
	"boss_beat": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_beat",
		"AbilityTextureName": "polar_furbolg_ursa_warrior_thunder_clap",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 250,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 4,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"stun_duration": 0.1,
			"damage": 5000
		}
	},
	"hell_beast_aura": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/hell_beast_aura",
		"AbilityTextureName": "kobold_taskmaster_speed_aura",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"attack_pct": 50,
			"attackspeed": 50,
			"movespeed": 50,
			"aura_radius": 500
		}
	},
	"boss_stone": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_stone",
		"AbilityTextureName": "granite_golem_hp_aura",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"magical_reduce": 30
		}
	},
	"dog_wound": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/dog_wound",
		"AbilityTextureName": "life_stealer_open_wounds",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": 1000,
			"armor_reduce": 20,
			"attackspeed": 50,
			"movespeed": 20,
			"duration": 30
		}
	},
	"boss_rage": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_rage",
		"AbilityTextureName": "life_stealer_rage",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCooldown": 10,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"attackspeed": 400,
			"attakc_time": 0.8,
			"movespeed": 100,
			"damaeg_pct": 50,
			"duration": 10
		}
	},
	"dragon_energy_ball": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/dragon_energy_ball",
		"AbilityTextureName": "satyr_hellcaller_shockwave",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": 30,
			"attackspeed": 200
		}
	},
	"boss_invisible": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_invisible",
		"AbilityTextureName": "sandking_sand_storm",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 600,
			"damage": 5000
		}
	},
	"boss_burrowstrike": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_burrowstrike",
		"AbilityTextureName": "sandking_burrowstrike",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 12000,
			"width": 200,
			"duration": 2.17
		}
	},
	"boss_epicenter": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_epicenter",
		"AbilityTextureName": "sandking_epicenter",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 12000,
			"radius": 900
		}
	},
	"boss_soulbody": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_soulbody",
		"AbilityTextureName": "visage_gravekeepers_cloak",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_pct": 60
		}
	},
	"boss_soulconnect": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_soulconnect",
		"AbilityTextureName": "visage_soul_assumption",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 600
		}
	},
	"boss_soulclash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_soulclash",
		"AbilityTextureName": "visage_grave_chill",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastRange": 600,
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": 60
		}
	},
	"zombie_tower": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/zombie_tower",
		"AbilityTextureName": "undying_tombstone",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 30
		}
	},
	"trial": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/trial",
		"AbilityTextureName": "mars_arena_of_blood",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"radius": 900
		}
	},
	"bash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/bash",
		"AbilityTextureName": "mars_gods_rebuke",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"damage": 500
		}
	},
	"shield_block": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/shield_block",
		"AbilityTextureName": "mars_bulwark",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"duration": 2,
			"stun_duration": 1,
			"attackspeed": 100,
			"attackspeed_duration": 2
		}
	},
	"mana_break": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/mana_break",
		"AbilityTextureName": "nyx_assassin_mana_burn",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"chance": 25,
			"mana": 30
		}
	},
	"boss_fire_stun": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_fire_stun",
		"AbilityTextureName": "ember_spirit_sleight_of_fist",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 8000,
			"heal": 5000,
			"chance": 25,
			"duration": 2
		}
	},
	"boss_fire_land": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_fire_land",
		"AbilityTextureName": "doom_bringer_doom",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"chance": 10,
			"damage": 8000,
			"duration": 3,
			"radius": 600,
			"heal": 20000
		}
	},
	"boss_fire_reborn": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_fire_reborn",
		"AbilityTextureName": "doom_bringer_scorched_earth",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"boss_absorb": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_absorb",
		"AbilityTextureName": "treant_leech_seed",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"heal": 40000,
			"damage": 20000
		}
	},
	"boss_green_protect": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_green_protect",
		"AbilityTextureName": "treant_living_armor",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"armor": 40,
			"damage_reduce": 40,
			"regen": 4000,
			"duration": 10
		}
	},
	"boss_overgrowth": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_overgrowth",
		"AbilityTextureName": "treant_overgrowth",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 40,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 900,
			"damage": 10000,
			"regen": 8,
			"movespeed": 100,
			"duration": 12
		}
	},
	"boss_untouchable": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_untouchable",
		"AbilityTextureName": "enchantress_untouchable",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"slow_attack_speed": 100,
			"attackspeed": 100
		}
	},
	"hit_back": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/hit_back",
		"AbilityTextureName": "enchantress_impetus",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"arcane_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/arcane_attack",
		"AbilityTextureName": "obsidian_destroyer_arcane_orb",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"bonus_damage": 5,
			"bonus_attack_speed": "100 200 300 400"
		}
	},
	"original_crash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/original_crash",
		"AbilityTextureName": "obsidian_destroyer_sanity_eclipse",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"base_damage": "1000 2000 3000 4000"
		}
	},
	"boss_chaos_land": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_chaos_land",
		"AbilityTextureName": "doom_bringer_scorched_earth",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 20000,
			"aura_radius": 600
		}
	},
	"boss_chaos_fall": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_chaos_fall",
		"AbilityTextureName": "invoker_chaos_meteor",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 120000,
			"radius": 600
		}
	},
	"demon_sun_strike": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/demon_sun_strike",
		"AbilityTextureName": "invoker_sun_strike",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": 300000,
			"radius": 175,
			"delay": 1.7,
			"distance": 900
		}
	},
	"boss_hell_fist": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/nature/boss_hell_fist",
		"AbilityTextureName": "doom_bringer_infernal_blade",
		"AbilityType": "DOTA_ABILITY_TYPE_BASIC",
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastRange": 300,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"stun_duration": 0.1,
			"damage_percent": 25,
			"damage_per_second": 20000,
			"duration": 3
		}
	},
	"wave_9_1": {
		"Note": "强攻",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_9_1",
		"AbilityTextureName": "legion_commander_press_the_attack",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 6,
		"AbilityValues": {
			"heal": "1000 1500 2000 2500 5000",
			"attackspeed": "200 300 400 500 1000"
		}
	},
	"wave_9_2": {
		"Note": "勇气",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_9_2",
		"AbilityTextureName": "legion_commander_moment_of_courage",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"heal": "1000 2000 3000 4000 8000",
			"chance": "15 17 19 21 23"
		}
	},
	"life_absorb": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/life_absorb",
		"AbilityTextureName": "death_prophet_spirit_siphon",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_DP_SPIRIT_SIPHON",
		"AbilityCastRange": 900,
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "500 1000 1500 2000 4000",
			"heal": 1000
		}
	},
	"wolf_critical": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wolf_critical",
		"AbilityTextureName": "lycan_summon_wolves_critical_strike",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"chance": "20 30 40 50 100",
			"critical": "250 300 350 400 800"
		}
	},
	"wolf_wound": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wolf_wound",
		"AbilityTextureName": "ursa_fury_swipes",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"bonus_reset_time": 15,
			"bonus_reset_time_roshan": 6,
			"damage_per_stack": "200 400 600 800 1000"
		}
	},
	"wolf_invisible": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wolf_invisible",
		"AbilityTextureName": "lycan_summon_wolves_invisibility",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"jugg_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/jugg_attack",
		"AbilityTextureName": "juggernaut_omni_slash",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"bonus_attack_speed": "100 200 300 400 500",
			"evasion": "30 40 50 60 70",
			"critical": "200 300 400 500 600",
			"chance": 25,
			"armor_reduce": -150,
			"duration": 2
		}
	},
	"bomb_suicide": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/bomb_suicide",
		"AbilityTextureName": "techies_suicide",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "12000 16000 20000 24000 48000",
			"radius": 600
		}
	},
	"soul_tremble": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/soul_tremble",
		"AbilityTextureName": "bane_enfeeble",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"reduce": "60 80 100 120 140"
		}
	},
	"soul_hurt": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/soul_hurt",
		"AbilityTextureName": "bane_brain_sap",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"rate": "0.1 0.15 0.2 0.25 0.5"
		}
	},
	"wave_34_1": {
		"Note": "女妖突袭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_34_1",
		"AbilityTextureName": "venomancer_poison_sting",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "20000 40000 60000 80000 100000",
		"AbilityValues": {
			"duration": 6,
			"movespeed": -500,
			"speed": 600
		}
	},
	"fuhuosishi": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/fuhuosishi",
		"AbilityTextureName": "dark_troll_warlord_raise_dead",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityManaCost": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"radius": "600 600 600 600 600",
			"duration": "60 60 60 60 60"
		}
	},
	"roshan_stun": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/roshan_stun",
		"AbilityTextureName": "roshan_bash",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "20000 30000 40000 50000 100000",
			"chance": "10 12 14 16 20",
			"duration": "1.6 1.7 1.8 1.9 2.0",
			"cooldown": "8 7 6 5 4",
			"attackspeed": "50 100 150 200 250"
		}
	},
	"slardar_stun": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/slardar_stun",
		"AbilityTextureName": "slardar_bash",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "18000 26000 34000 42000 84000",
			"chance": "10 12 14 16 20",
			"duration": 6,
			"stats": "150 300 450 600 1200",
			"attackspeed": "50 100 150 200 250"
		}
	},
	"slardar_crush": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/slardar_crush",
		"AbilityTextureName": "slardar_slithereen_crush",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 0.35,
		"AbilityCooldown": "14 13 12 11 10",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "30000 60000 90000 120000 240000",
			"radius": "400 400 400 400 400",
			"duration": "1.2 1.4 1.6 1.8 2.0"
		}
	},
	"slardar_run": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/slardar_run",
		"AbilityTextureName": "slardar_sprint",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"roshan_strike": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/roshan_strike",
		"AbilityTextureName": "roshan_slam",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "40000 80000 120000 160000 320000",
			"radius": "450 450 450 450 450"
		}
	},
	"roshan_shock": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/roshan_shock",
		"AbilityTextureName": "roshan_halloween_angry",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"attackspeed": "100 200 300 400 800",
			"radius": "600 600 600 600 600",
			"movespeed": 300,
			"shock_duration": "2 3 4 5 6",
			"duration": "10 10 10 10 10"
		}
	},
	"mubei": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/mubei",
		"AbilityTextureName": "undying_tombstone_alt",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 60,
		"AbilityManaCost": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"heal": "1 2 3 4 5",
			"radius": "600 600 600 600 600",
			"duration": "20 18 16 14 10",
			"cooldown": "60 50 40 30 20",
			"health": "0 200000 400000 600000 800000"
		}
	},
	"shiwangchouxue": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/shiwangchouxue",
		"AbilityTextureName": "undying_decay",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_UNDYING_DECAY",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 3,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": "11 14 17 20 25",
			"heal": "11 14 17 20 25",
			"radius": 450
		}
	},
	"fulan": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/fulan",
		"AbilityTextureName": "greevil_rot",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "50000 100000 150000 200000 250000",
			"radius": "400 400 400 400 400",
			"movespeed": -700
		}
	},
	"boss_clear": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/boss_clear",
		"AbilityTextureName": "chen_test_of_faith_teleport",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"interval": 5,
			"duration": 1.5
		}
	},
	"boss_blink": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/boss_blink",
		"AbilityTextureName": "abyssal_underlord_dark_rift",
		"MaxLevel": 5,
		"AbilityCooldown": "10 9 8 7 6",
		"AbilityChannelTime": "2.0 1.8 1.6 1.4 1.2",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"cooldown": "10 9 8 7 6",
			"duration": 2
		}
	},
	"hades_1": {
		"Note": "死亡脉冲",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/hades_1",
		"AbilityTextureName": "necrolyte_death_pulse",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.1,
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "20000 40000 60000 80000 100000",
		"AbilityValues": {
			"radius": 1500,
			"regen": 3,
			"speed": 400
		}
	},
	"hades_2": {
		"Note": "竭心光环",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/hades_2",
		"AbilityTextureName": "necrolyte_heartstopper_aura",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"percent": "1 1.5 2 2.5 3 ",
			"regen_reduce": "60 70 80 90 100",
			"interval": 0.25,
			"duration": "3 4 5 6 7",
			"radius": 1200
		}
	},
	"hades_3": {
		"Note": "死亡契约",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/hades_3",
		"AbilityTextureName": "necrolyte_sadist",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": "10 9 8 7 6",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 4,
		"AbilityValues": {
			"stun_duration": 3
		}
	},
	"hades_4": {
		"Note": "死神镰刀",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/hades_4",
		"AbilityTextureName": "necrolyte_reapers_scythe",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.55,
		"AbilityCooldown": "10 9 8 7 6",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage_per_health": "1 1.2 1.4 1.6 1.8",
			"stun_duration": 1.5
		}
	},
	"poseidon_1": {
		"Note": "水怒",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/poseidon_1",
		"AbilityTextureName": "kunkka_torrent",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": "4 5 6 7 8",
		"AbilityDamage": "4000 8000 12000 16000 32000",
		"AbilityValues": {
			"bonus_armor": "30 60 90 120 150",
			"bonus_move_speed": "50 60 70 80 90",
			"delay": 1.6,
			"stun_duration": 1.6,
			"torrent_interval": 0.2,
			"torrent_max_distance": 1100,
			"slow_duration": 3,
			"radius": 225
		}
	},
	"poseidon_3": {
		"Note": "海怒",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/poseidon_3",
		"AbilityTextureName": "tidehunter_ravage",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "6000 12000 18000 24000 48000",
		"AbilityValues": {
			"speed": 725,
			"duration": "2.5 3 3.5 4 4.5",
			"radius": 1250
		}
	},
	"poseidon_2": {
		"Note": "潮汐使者",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/poseidon_2",
		"AbilityTextureName": "kunkka_divine_anchor_tidebringer",
		"MaxLevel": 5,
		"AbilityCooldown": "4 3.5 3 2.5 2",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"cleave_starting_width": 150,
			"cleave_ending_width": 650,
			"cleave_distance": 1500,
			"cleave_damage": "60 80 100 120 140",
			"damage_bonus": "5000 10000 15000 20000 40000"
		}
	},
	"lightning_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/lightning_attack",
		"AbilityTextureName": "zuus_arc_lightning",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 1.25,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "20000 40000 60000 80000 160000",
			"radius": "600 600 600 600 600",
			"jump_count": "3 4 5 6 8",
			"jump_delay": "0.25 0.25 0.25 0.25 0.25"
		}
	},
	"lightning_crash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/lightning_crash",
		"AbilityTextureName": "zuus_lightning_bolt",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "40000 80000 120000 160000 320000",
			"att_rate": "10 13 16 19 25",
			"def_rate": "5 8 11 14 20",
			"miss": "50 60 70 80 90"
		}
	},
	"thunder_wrath": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/thunder_wrath",
		"AbilityTextureName": "zuus_thundergods_wrath_alt1",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 25,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "100000 200000 300000 400000 800000",
			"duration": "6 8 10 12 16",
			"attackspeed": "1000 1200 1400 1600 3200",
			"movespeed": "100 150 200 250 300",
			"cooldown_increase": 20
		}
	},
	"god_body": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/god_body",
		"AbilityTextureName": "zuus_static_field_alt1",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.1,
		"AbilityCooldown": 2,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"max_damage": "12 10 8 6 4",
			"regen": "2 3 4 5 6"
		}
	},
	"electrostatic_field": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/electrostatic_field",
		"AbilityTextureName": "zuus_static_field",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.1,
		"AbilityCooldown": 25,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"max_stack": 50,
			"radius": 1200,
			"silence_per_stack": 0.01,
			"damage": "12 14 16 18 20"
		}
	},
	"thunder_cloud": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/thunder_cloud",
		"AbilityTextureName": "zuus_lightning_bolt_immortal",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.1,
		"AbilityCooldown": 30,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "8000 16000 24000 32000 64000",
			"duration": "5 6 7 8 10"
		}
	},
	"golem_skin": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/golem_skin",
		"AbilityTextureName": "modifier_magicimmune",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"mdef": "20 30 40 50 60"
		}
	},
	"golem_spilt": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/golem_spilt",
		"AbilityTextureName": "mud_golem_rock_destroy",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"elite_34_1": {
		"Note": "痛苦尖叫",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_34_1",
		"AbilityTextureName": "queenofpain_scream_of_pain",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCooldown": 7,
		"AbilityManaCost": 110,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityDamage": "40000 80000 120000 160000 200000",
		"AbilityValues": {
			"projectile_speed": 900,
			"shock_duration": 1.5,
			"radius": 600
		}
	},
	"elite_34_2": {
		"Note": "女王幻影",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_34_2",
		"AbilityTextureName": "queenofpain_sanguine_blink",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCooldown": 40,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"duration": 30,
			"radius": 600,
			"health_pct": 50
		}
	},
	"elite_34_3": {
		"Note": "痛苦匕首",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_34_3",
		"AbilityTextureName": "queenofpain_sanguine_shadow_strike",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"stun_duration": 0.2,
			"duration": 0.8
		}
	},
	"great_cleave": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/great_cleave",
		"AbilityTextureName": "sven_great_cleave",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"great_cleave_radius": 300,
			"great_cleave_damage": "20 35 50 65 80"
		}
	},
	"shock_wave": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/shock_wave",
		"AbilityTextureName": "earthshaker_echo_slam",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 1,
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "10000 20000 30000 40000 60000",
			"radius": 300,
			"speed": 600,
			"distance": 1200
		}
	},
	"earthshake": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/earthshake",
		"AbilityTextureName": "earthshaker_aftershock_egset",
		"MaxLevel": 5,
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 80,
			"delay": 4,
			"radius": 1200
		}
	},
	"enchant_totem": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/enchant_totem",
		"AbilityTextureName": "earthshaker_enchant_totem",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 0,
		"AbilityCastPoint": 0.69,
		"AbilityCooldown": 5,
		"AbilityManaCost": 50,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 14,
		"AbilityValues": {
			"totem_damage_percentage": "3000 4000 5000 6000 7000",
			"duration": 6,
			"radius": 500,
			"stun_duration": 2
		}
	},
	"mana_purge": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/mana_purge",
		"AbilityTextureName": "nyx_assassin_mana_burn",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCooldown": 16,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"storm_bolt": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/storm_bolt",
		"AbilityTextureName": "sven_storm_bolt",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 6,
		"AbilityManaCost": 140,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityDamage": "6000 12000 18000 24000 48000",
		"AbilityValues": {
			"bolt_speed": 1000,
			"bolt_stun_duration": 2,
			"bolt_aoe": 255,
			"vision_radius": 225
		}
	},
	"gush": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/gush",
		"AbilityTextureName": "tidehunter_gush",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 700,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 12,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityValues": {
			"projectile_speed": "4000 4000 4000 4000",
			"movement_speed": -80,
			"armor_bonus": "25 40 55 70 85",
			"damage": "2000 4000 6000 8000 10000",
			"duration": 4
		}
	},
	"anchor_smash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/anchor_smash",
		"AbilityTextureName": "tidehunter_anchor_smash",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 400,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 4,
		"AbilityManaCost": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityValues": {
			"damage_reduction": -60,
			"reduction_duration": 6,
			"radius": 400,
			"damage": "2000 4000 6000 8000 10000"
		}
	},
	"warcry": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/warcry",
		"AbilityTextureName": "sven_warcry",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 900,
		"AbilityCooldown": 14,
		"AbilityManaCost": 25,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 7,
		"AbilityValues": {
			"warcry_armor": "30 60 90 120 150",
			"warcry_movespeed": 50,
			"radius": 900,
			"warcry_attackspeed": "40 50 60 70 80"
		}
	},
	"gods_strength": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/gods_strength",
		"AbilityTextureName": "sven_gods_strength",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 40,
		"AbilityManaCost": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": "25.0 25.0 25.0",
		"AbilityValues": {
			"gods_strength_damage": "1500 2000 2500 3000 3500",
			"attack_time": -1,
			"radius": 900
		}
	},
	"hunt": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/hunt",
		"AbilityTextureName": "lycan_shapeshift",
		"MaxLevel": 5,
		"AbilityCastRange": 1200,
		"AbilityCooldown": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"critical": "300 350 400 450 900",
			"reduce": "150 300 450 600 750",
			"interval_min": 2,
			"interval_max": 6,
			"evasion": 40,
			"alert_range": 900
		}
	},
	"howl": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/howl",
		"AbilityTextureName": "lycan_howl",
		"MaxLevel": 5,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"duration": 1.5
		}
	},
	"slience": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/slience",
		"AbilityTextureName": "death_prophet_silence",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 900,
		"AbilityCastPoint": "0.5 0.5 0.5 0.5",
		"AbilityCooldown": 12,
		"AbilityManaCost": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityDuration": "3.0 4.0 5.0 6.0",
		"AbilityValues": {
			"radius": 425,
			"duration": "2.0 2.5 3.0 3.5 4.0"
		}
	},
	"boss": {
		"Note": "Boss",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/boss",
		"AbilityTextureName": "monkey_king_wukongs_command_ti9",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityDuration": 5,
		"AbilityValues": {
			"damage_limit": 30,
			"damage_reduce": "70 75 80 85 90"
		}
	},
	"captain": {
		"Note": "首领",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/captain",
		"AbilityTextureName": "blue_dragonspawn_overseer_devotion_aura",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityDuration": 5,
		"AbilityValues": {
			"damage_limit": 60,
			"damage_reduce": "70 75 80 85 90",
			"crit_chance": 25,
			"crit_mult": "200 300 400 500 600",
			"health_regen_pct": 1,
			"movespeed": -50,
			"attackspeed": "20 40 60 80 100"
		}
	},
	"elite": {
		"Note": "精英怪",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite",
		"AbilityTextureName": "life_stealer_rage_immortal",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"health_regen_pct": 1,
			"movespeed": -50,
			"attackspeed": "20 40 60 80 100"
		}
	},
	"elite_4_1": {
		"Note": "清醒拍打",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_4_1",
		"AbilityTextureName": "polar_furbolg_ursa_warrior_thunder_clap",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 300,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 8,
		"AbilityManaCost": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityDuration": 0.5,
		"AbilityDamage": "600 1200 1800 2400 3000"
	},
	"wave_5_1": {
		"Note": "活水",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_5_1",
		"AbilityTextureName": "morphling_morph_replicate",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 12,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_BOTH",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 5,
		"AbilityValues": {
			"attackspeed": "20 30 40 50 60",
			"radius": 300
		}
	},
	"wave_5_2": {
		"Note": "泼水",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_5_2",
		"AbilityTextureName": "water_damage",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 12,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": "2 2.5 3 3.5 4",
		"AbilityValues": {
			"movespeed": "20 30 40 50 60"
		}
	},
	"wave_7_1": {
		"Note": "闪电",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_7_1",
		"AbilityTextureName": "wisp_tether",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 12,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "150 300 450 600 750"
	},
	"elite_7_1": {
		"Note": "妖术",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_7_1",
		"AbilityTextureName": "shadow_shaman_voodoo",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 30,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityDuration": "1 1.5 2 2.5 3",
		"AbilityValues": {
			"movespeed": 100
		}
	},
	"elite_7_2": {
		"Note": "暗言术",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_7_2",
		"AbilityTextureName": "warlock_shadow_word",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 500,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 16,
		"AbilityManaCost": 150,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ALLIES_NO",
		"AbilityDuration": "4 6 8 10 12",
		"AbilityDamage": "200 400 600 800 1000",
		"AbilityValues": {
			"tick_interval": 1,
			"regen_reduce": "40 50 60 70 80"
		}
	},
	"elite_7_3": {
		"Note": "聚变",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_7_3",
		"AbilityTextureName": "warlock_upheaval",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 12,
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_NO",
		"AbilityDuration": 6,
		"AbilityValues": {
			"radius": 900,
			"max_slow": 84
		}
	},
	"elite_7_4": {
		"Note": "混乱之雨",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_7_4",
		"AbilityTextureName": "invoker_chaos_meteor",
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityManaCost": 300,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityDuration": 2,
		"AbilityDamage": "800 1600 2400 3200 4000",
		"AbilityValues": {
			"radius": 600,
			"delay": 1.3
		}
	},
	"elite_28_1": {
		"Note": "不如跳舞",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_28_1",
		"AbilityTextureName": "furion_wrath_of_nature",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_TAUNT",
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityDuration": 7.2,
		"AbilityValues": {
			"regen": "20 40 60 80 100"
		}
	},
	"elite_28_2": {
		"Note": "传送",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_28_2",
		"AbilityTextureName": "furion_teleportation",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"count": 8,
			"delay": 2.5
		}
	},
	"wave_30_1": {
		"Note": "生命窃取",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_30_1",
		"AbilityTextureName": "necronomicon_warrior_mana_burn",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"percent": "2 3 4 5 6"
		}
	},
	"wave_30_2": {
		"Note": "死亡渴望",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_30_2",
		"AbilityTextureName": "necronomicon_warrior_sight",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attackspeed": "10 20 30 40 50",
			"movespeed": "5 10 15 20 25",
			"trigger_pct": 5
		}
	},
	"wave_30_3": {
		"Note": "遗愿",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_30_3",
		"AbilityTextureName": "necronomicon_warrior_last_will",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "15000 30000 45000 60000 75000"
	},
	"elite_30_1": {
		"Note": "法力燃烧",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_30_1",
		"AbilityTextureName": "nyx_assassin_mana_burn",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 700,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": "12 11 10 9 6",
		"AbilityManaCost": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage_pct": "20 40 60 80 100",
			"mana_burn": "30 40 50 60 70"
		}
	},
	"elite_30_2": {
		"Note": "死亡之箭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_30_2",
		"AbilityTextureName": "necronomicon_archer_mana_burn",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 8,
		"AbilityValues": {
			"health_reduce": "1000 2000 3000 4000 5000"
		}
	},
	"elite_30_3": {
		"Note": "命令光环",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_30_3",
		"AbilityTextureName": "necronomicon_archer_aoe",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"radius": 900,
			"bonus_attack": "15 20 25 30 35"
		}
	},
	"wave_31_1": {
		"Note": "大恶魔",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_31_1",
		"AbilityTextureName": "terrorblade_metamorphosis_alt1",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"lifesteal": "200 300 400 500 1000",
			"attackspeed": "100 200 300 400 800",
			"crit_chance": "20 25 30 35 50",
			"crit_mult": "700 800 900 1000 1200"
		}
	},
	"wave_31_2": {
		"Note": "灵魂隔断",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_31_2",
		"AbilityTextureName": "terrorblade_sunder_alt1",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 40,
		"AbilityManaCost": 1000,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "75 80 85 90 95"
		}
	},
	"wave_32_1": {
		"Note": "神圣攻击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_32_1",
		"AbilityTextureName": "chen_test_of_faith",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"chance": 15,
			"damage": "8000 16000 24000 32000 40000"
		}
	},
	"wave_32_2": {
		"Note": "神圣护甲",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_32_2",
		"AbilityTextureName": "chen_penitence",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastPoint": 0.25,
		"AbilityCooldown": "20 19 18 17 16",
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityDuration": "4 5 6 7 8"
	},
	"wave_33_1": {
		"Note": "魔力损毁",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_33_1",
		"AbilityTextureName": "antimage_mana_break",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"mana_burn": "200 400 600 800 1600"
		}
	},
	"wave_33_2": {
		"Note": "海蚀",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/wave_33_2",
		"AbilityTextureName": "tidehunter_gush",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 2,
		"AbilityValues": {
			"armor_reduce": "30 60 90 120 150"
		}
	},
	"elite_33_1": {
		"Note": "海妖幻影",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_33_1",
		"AbilityTextureName": "naga_siren_mirror_image",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": "12 11 10 9 8",
		"AbilityManaCost": 200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 4,
		"AbilityDamage": "20000 40000 60000 80000 100000",
		"AbilityValues": {
			"radius": 400,
			"image_count": 5,
			"delay": 0.5,
			"outgoing_damage": "30 40 50 60 70",
			"incoming_damage": 1200
		}
	},
	"elite_33_2": {
		"Note": "激流",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_33_2",
		"AbilityTextureName": "naga_siren_rip_tide",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityDuration": 4,
		"AbilityDamage": "15000 30000 45000 60000 75000",
		"AbilityValues": {
			"armor_reduce": "15 30 45 60 75",
			"radius": 450
		}
	},
	"elite_33_3": {
		"Note": "海妖之歌",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_33_3",
		"AbilityTextureName": "naga_siren_song_of_the_siren",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCooldown": 16,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 3,
		"AbilityValues": {
			"attackspeed": "100 200 300 400 500",
			"radius": 1800
		}
	},
	"elite_34_4": {
		"Note": "SM",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_34_4",
		"AbilityTextureName": "meepo_earthbind",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 1.5
	},
	"elite_34_5": {
		"Note": "超声波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/elite_34_5",
		"AbilityTextureName": "queenofpain_sonic_wave",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"SpellImmunityType": "SPELL_IMMUNITY_ENEMIES_YES",
		"AbilityDamage": "50000 100000 150000 200000 250000",
		"AbilityValues": {
			"damage_pct": 20,
			"cooldown_add": 8,
			"distance": 900,
			"starting_aoe": 100,
			"final_aoe": 450,
			"speed": 900
		}
	},
	"troll_block": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_block",
		"AbilityTextureName": "dragon_knight_dragon_tail",
		"MaxLevel": 5,
		"AbilityCooldown": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"block": "40 50 60 70 80",
			"duration": "1.2 1.4 1.6 1.8 2.0"
		}
	},
	"troll_knockback": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_knockback",
		"AbilityTextureName": "troll_warlord_berserkers_rage_active",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"stun": "15 20 25 30 35",
			"duration": "1.2 1.4 1.6 1.8 2.0",
			"damage": "8000 16000 24000 32000 64000"
		}
	},
	"troll_concentrate": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_concentrate",
		"AbilityTextureName": "troll_warlord_whirling_axes_ranged",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"attackspeed": "5 10 15 20 25",
			"attack": "150 300 450 600 1200"
		}
	},
	"troll_heal": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_heal",
		"AbilityTextureName": "forest_troll_high_priest_heal",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"heal": "300 600 900 1200 1800",
			"aura_radius": 600
		}
	},
	"troll_blink": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_blink",
		"AbilityTextureName": "lone_druid_savage_roar_bear",
		"MaxLevel": 5,
		"AbilityCooldown": "3 2.5 2 1.5 1",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"troll_fireball": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/troll_fireball",
		"AbilityTextureName": "black_dragon_fireball",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "9000 18000 27000 36000 72000"
		}
	},
	"alien_parasitism": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_parasitism",
		"AbilityTextureName": "life_stealer_infest",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"damage": "40 50 60 70 80"
		}
	},
	"alien_line": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_line",
		"AbilityTextureName": "wisp_tether",
		"MaxLevel": 5,
		"AbilityCooldown": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"hp": "5 4 3 2 1",
			"damage": "2000 4000 6000 8000 10000"
		}
	},
	"alien_split": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_split",
		"AbilityTextureName": "enigma_demonic_conversion",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"count": "2 3 4 5 6"
		}
	},
	"alien_growth": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_growth",
		"AbilityTextureName": "enigma_malefice",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"duration": "12 11 10 9 8"
		}
	},
	"alien_blackhole": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_blackhole",
		"AbilityTextureName": "enigma_black_hole",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE",
		"AbilityValues": {
			"damage": "20000 40000 60000 80000 90000"
		}
	},
	"alien_obsidian_star": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/alien_obsidian_star",
		"AbilityTextureName": "abaddon_aphotic_shield_alliance",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "10000 20000 30000 40000 50000"
		}
	},
	"solar_magic_fire": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_magic_fire",
		"AbilityTextureName": "oracle_purifying_flames",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCooldown": 15,
		"AbilityChannelTime": "6 7 8 9 10",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "10000 20000 30000 40000 50000"
		}
	},
	"solar_noice_wave": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_noice_wave",
		"AbilityTextureName": "bane_brain_sap",
		"MaxLevel": 5,
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": "40 50 60 70 80"
		}
	},
	"solar_lifesteal": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_lifesteal",
		"AbilityTextureName": "night_stalker_hunter_in_the_night",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attackspeed": "20 40 60 80 100",
			"damage": "10 15 20 25 30"
		}
	},
	"solar_scare": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_scare",
		"AbilityTextureName": "night_stalker_crippling_fear",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"miss": "40 50 60 70 80",
			"duration": "6 7 8 9 10"
		}
	},
	"solar_ghost": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_ghost",
		"AbilityTextureName": "spectre_haunt",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"interval": "5 4 3 2 1",
			"damage": "10 15 20 25 30"
		}
	},
	"solar_barren_aura": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_barren_aura",
		"AbilityTextureName": "night_stalker_darkness",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"regen": "5 10 15 20 25",
			"aura_radius": 600
		}
	},
	"solar_ice_blade": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_ice_blade",
		"AbilityTextureName": "abaddon_frostmourne",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attackspeed": "100 200 300 400 500",
			"movespeed": "50 100 150 200 400"
		}
	},
	"solar_lock": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_lock",
		"AbilityTextureName": "shadow_demon_soul_catcher",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"duration": "2 3 4 5 6"
		}
	},
	"solar_fire": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy/solar_fire",
		"AbilityTextureName": "invoker_forge_spirit",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"interval": "5 4 3 2 1",
			"health": 50000,
			"damage": 2000,
			"armor": 3
		}
	},
	"pet_1_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_1_1",
		"AbilityTextureName": "shadow_shaman_voodoo",
		"MaxLevel": 5,
		"AbilityCooldown": "90 85 80 75 70",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": 90
		}
	},
	"pet_4_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_4_1",
		"AbilityTextureName": "keeper_of_the_light_chakra_magic",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityDuration": 6,
		"AbilityValues": {
			"cooldown_reduction": "6 7 8 9 10",
			"mana_restore": "15 20 25 30 35"
		}
	},
	"pet_4_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_4_2",
		"AbilityTextureName": "jakiro_ice_path",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 2,
		"AbilityValues": {
			"path_radius": 125
		}
	},
	"pet_4_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_4_3",
		"AbilityTextureName": "crystal_maiden_freezing_field",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityChannelTime": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 800,
			"explosion_radius": 300,
			"explosion_interval": 0.1,
			"slow_duration": 1,
			"movespeed_slow": -30,
			"attack_slow": -60,
			"damage": "4 6 8 10 12"
		}
	},
	"pet_37_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_37_1",
		"AbilityTextureName": "faceless_void_time_dilation",
		"MaxLevel": 5,
		"AbilityCooldown": 11,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": "2 2.25 2.5 2.75 3",
		"AbilityValues": {
			"radius": 600
		}
	},
	"pet_37_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_37_2",
		"AbilityTextureName": "faceless_void_backtrack",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"chance": "15 17 19 21 23"
		}
	},
	"pet_49_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_49_1",
		"AbilityTextureName": "dazzle_shallow_grave",
		"MaxLevel": 5,
		"AbilityCooldown": "90 85 80 75 70",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"duration": 5
		}
	},
	"pet_57_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_57_1",
		"AbilityTextureName": "lina_dragon_slave",
		"MaxLevel": 5,
		"AbilityCastRange": 1300,
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"interval": 15,
			"damage": "10 12 14 16 18",
			"speed": 900,
			"distance": 1300,
			"width": 300
		}
	},
	"pet_85_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_85_1",
		"AbilityTextureName": "chen_divine_favor",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": "12 11 10 9 8",
			"duration": 2
		}
	},
	"pet_86_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_86_1",
		"AbilityTextureName": "beastmaster_hawk_invisibility",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": 8,
			"duration": 3,
			"movespeed": "50 60 70 80 90",
			"attackspeed": "200 220 240 260 280"
		}
	},
	"pet_15_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_15_1",
		"AbilityTextureName": "ember_spirit_flame_guard",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "1 2 3 4 5",
		"AbilityValues": {
			"interval": 0.25,
			"radius": 400
		}
	},
	"pet_15_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_15_2",
		"AbilityTextureName": "ember_spirit_searing_chains",
		"MaxLevel": 5,
		"AbilityCooldown": "90 85 80 75 70",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": "90 85 80 75 70"
		}
	},
	"pet_16_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_16_1",
		"AbilityTextureName": "ancient_apparition/ti8_immortal_back/ancient_apparition_ice_vortex_immortal",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"movespeed": "20 25 30 35 40",
			"attackspeed": "50 60 70 80 90",
			"radius": 600
		}
	},
	"pet_16_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_16_2",
		"AbilityTextureName": "wisp_relocate",
		"MaxLevel": 5,
		"AbilityCooldown": "90 85 80 75 70",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": "90 85 80 75 70"
		}
	},
	"pet_22_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_1",
		"AbilityTextureName": "pet_22_1",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 10,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 3,
		"AbilityDamage": "6 8 10 12 14",
		"AbilityValues": {
			"radius": 200,
			"delay": 2.5,
			"count": 6,
			"interval": 0.1
		}
	},
	"pet_22_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_2",
		"AbilityTextureName": "alchemist_goblins_greed",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": "60 58 56 54 52",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityDuration": 3,
		"AbilityValues": {
			"interval": 0.1
		}
	},
	"pet_22_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_3",
		"AbilityTextureName": "modifier_cny_beast_aegis",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 8,
		"AbilityDamage": "4 6 8 10 12",
		"AbilityValues": {
			"radius": 600,
			"armor": "-15 -30 -45 -60 -75",
			"distance": 300,
			"fear_duration": 2
		}
	},
	"pet_22_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4",
		"AbilityTextureName": "invoker/esl_ablityicons_relicsoftheilluminatedseer/invoker_forge_spirit",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_DIE",
		"AbilityCastPoint": 1.3,
		"AbilityCooldown": "100 90  80 70 60",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 45
	},
	"pet_22_5": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_5",
		"AbilityTextureName": "omni_knight/adoring_wingfall/omniknight_purification",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"attackspeed": "60 70 80 90 100",
			"movespeed": "40 50 60 70 80",
			"health_regen": "15 30 45 60 75",
			"mana_regen": "6 9 12 15 18"
		}
	},
	"pet_22_4_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4_1",
		"AbilityTextureName": "modifier_cny2015_combat",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDuration": 0.5,
		"AbilityValues": {
			"cleave_percent": 100,
			"cleave_radius": 300
		}
	},
	"pet_22_4_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4_2",
		"AbilityTextureName": "modifier_cny2015_support_aura",
		"MaxLevel": 5,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_6",
		"AbilityCastPoint": 1.74,
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 2,
		"AbilityDamage": "30 40 50 60 70",
		"AbilityValues": {
			"radius": 400
		}
	},
	"pet_22_4_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4_3",
		"AbilityTextureName": "modifier_cny2015_speed",
		"MaxLevel": 5,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_MAGNUS_SKEWER_START",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.74,
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "20 25 30 35 40",
		"AbilityValues": {
			"distance": 1500,
			"speed": 1500,
			"radius": 200
		}
	},
	"pet_22_4_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4_4",
		"AbilityTextureName": "brewmaster_thunder_clap",
		"MaxLevel": 5,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_LEAP_STUN",
		"AbilityCastRange": 1000,
		"AbilityCastPoint": 0.6,
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 2,
		"AbilityDamage": "10 20 30 40 50",
		"AbilityValues": {
			"duration": 0.6,
			"radius": 400
		}
	},
	"pet_22_4_5": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_22_4_5",
		"AbilityTextureName": "modifier_cny_beast_aegis",
		"MaxLevel": 5,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_TELEPORT",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 1.8,
		"AbilityCooldown": 20,
		"AbilityChannelTime": 7,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_CHANNELLED | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "80 120 140 160 180",
		"AbilityValues": {
			"width": 200,
			"radius": 1000
		}
	},
	"pet_41_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_41_1",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"movespeed": "60 70 80 90 100"
		}
	},
	"pet_44_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_44_1",
		"AbilityTextureName": "slardar_slithereen_crush",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 1.5,
		"AbilityDamage": "6 8 10 12 14",
		"AbilityValues": {
			"radius": 450
		}
	},
	"pet_44_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_44_2",
		"AbilityTextureName": "slardar_sprint",
		"MaxLevel": 5,
		"AbilityCooldown": "15 14 13 12 11",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityDuration": 6,
		"AbilityValues": {
			"movespeed": "50 60 70 80 90"
		}
	},
	"pet_6_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_6_1",
		"AbilityTextureName": "bounty_hunter/hunters_hoard/bounty_hunter_track",
		"MaxLevel": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDamage": "1 2 3 4 5",
		"AbilityValues": {
			"interval": 0.35,
			"radius": 500,
			"movespeed": "15 20 25 30 35",
			"attackspeed": "30 40 50 60 70"
		}
	},
	"pet_6_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_6_2",
		"AbilityTextureName": "crystal_maiden_brilliance_aura_ti9_gold",
		"MaxLevel": 5,
		"AbilityCooldown": "90 85 80 75 70",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityValues": {
			"interval": "90 85 80 75 70"
		}
	},
	"pet_9_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_9_1",
		"AbilityTextureName": "doom_bringer/ti8_immortal_arm/doom_bringer_devour_immortal",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 90,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"bonus_gold": 10,
			"bonus_exp": 10
		}
	},
	"pet_9_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_9_2",
		"AbilityTextureName": "doom_bringer_scorched_earth",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 20,
		"AbilityDamage": "1 2 3 4 5",
		"AbilityValues": {
			"radius": 900,
			"regen": "2 2.5 3  3.5 4",
			"movespeed": "12 15 18 21 24"
		}
	},
	"pet_9_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_9_3",
		"AbilityTextureName": "doom_bringer_doom",
		"MaxLevel": 5,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 15,
		"AbilityDamage": "4 8 12 16 20",
		"AbilityValues": {
			"radius": 250
		}
	},
	"pet_24_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_24_1",
		"AbilityTextureName": "meepo/colossal_crystal_chorus/meepo_poof",
		"MaxLevel": 5,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 15,
		"AbilityDamage": "6 8 10 12 14",
		"AbilityValues": {
			"radius": 300,
			"slow_duration": 1.5,
			"interval": 0.75,
			"movespeed_slow": 30
		}
	},
	"pet_24_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_24_2",
		"AbilityTextureName": "tusk/glaciomarine_ability_icons/tusk_walrus_kick",
		"MaxLevel": 5,
		"AbilityCastAnimation": "ACT_DOTA_DIE",
		"AbilityCastPoint": 0.6,
		"AbilityCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 2,
		"AbilityDamage": "3 6 9 12 15",
		"AbilityValues": {
			"radius": 300
		}
	},
	"pet_24_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/pets/pet_24_3",
		"AbilityTextureName": "mirana_leap",
		"MaxLevel": 5,
		"AbilityCooldown": "3 2.75 2.5 2.25 2",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityDuration": 1,
		"AbilityDamage": "1 2 3 4 5",
		"AbilityValues": {
			"distance": "600 700 800 900 1000",
			"speed": 1300,
			"acceleration": 6000,
			"radius": 300
		}
	},
	"courier_blink": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_blink",
		"AbilityTextureName": "antimage_blink",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 0
	},
	"courier_teleport": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_teleport",
		"AbilityTextureName": "keeper_of_the_light_recall",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 60
	},
	"courier_bag": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_bag",
		"AbilityTextureName": "courier_return_stash_items",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 0
	},
	"courier_auto_potion": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_auto_potion",
		"AbilityTextureName": "alchemist_unstable_concoction",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_TOGGLE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 0
	},
	"courier_swap": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_swap",
		"AbilityTextureName": "courier_transfer_items",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 0
	},
	"courier_suicide": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_suicide",
		"AbilityTextureName": "leoric_reincarnate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE",
		"AbilityCooldown": 0
	},
	"demon_chains_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/demon_chains_1",
		"AbilityTextureName": "warlock_golem_flaming_fists",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"bonus_damage": 18,
			"cleave_radius": 350,
			"chance": 15,
			"attackspeed": 500,
			"duration": 0.5
		}
	},
	"demon_chains_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/demon_chains_2",
		"AbilityTextureName": "warlock_golem_permanent_immolation",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 12,
			"radius": 600
		}
	},
	"demon_chains_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/demon_chains_3",
		"AbilityTextureName": "warlock_rain_of_chaos",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"aura_hp_regen_percent": 4,
			"aura_attack_percent": 30,
			"aura_attackspeed": 80,
			"aura_radius": 900
		}
	},
	"anneal": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/anneal",
		"AbilityTextureName": "chaos_knight_chaos_strike",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"exp": 40,
			"gold": 20
		}
	},
	"npc_task_bh": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"npc_task_cuihua": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"npc_task_bajie": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"npc_task_simon": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"npc_task_bearzky": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"npc_task_beaverknight": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/npc_task",
		"AbilityTextureName": "bounty_hunter_track",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"ciba": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/ciba",
		"AbilityTextureName": "meepo_divided_we_stand",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PURE"
	},
	"athena_heal": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/athena_heal",
		"AbilityTextureName": "enchantress_natures_attendants",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityCooldown": 120,
		"AbilityValues": {
			"health": 80,
			"mana": 16,
			"duration": 30
		}
	},
	"athena_guard": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/athena_guard",
		"AbilityTextureName": "lich_frost_armor",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityCooldown": 180,
		"AbilityValues": {
			"reduce": 25,
			"armor": 10,
			"duration": 30
		}
	},
	"unit_state": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/unit_state",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE | DOTA_ABILITY_BEHAVIOR_HIDDEN"
	},
	"empty_1": {
		"BaseClass": "ability_datadriven",
		"AbilityTextureName": "empty",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE"
	},
	"empty_2": {
		"BaseClass": "ability_datadriven",
		"AbilityTextureName": "empty",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE"
	},
	"empty_3": {
		"BaseClass": "ability_datadriven",
		"AbilityTextureName": "empty",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE"
	},
	"empty_4": {
		"BaseClass": "ability_datadriven",
		"AbilityTextureName": "empty",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE"
	},
	"talent": {
		"BaseClass": "ability_datadriven",
		"AbilityTextureName": "empty",
		"MaxLevel": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE | DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE"
	},
	"dash": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dash",
		"AbilityTextureName": "dark_seer_surge",
		"MaxLevel": 1,
		"AbilityManaCost": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_OPTIONAL_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"duration": 0.1,
			"max_distance": 500,
			"min_distance": 100
		}
	},
	"courier_give_item_to_hero": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/courier_give_item_to_hero",
		"AbilityTextureName": "courier_transfer_items",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE | DOTA_ABILITY_BEHAVIOR_RUNE_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityCooldown": 0.1
	},
	"courier_pick_item": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/courier_pick_item",
		"AbilityTextureName": "courier_queue_pickup_from_stash",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityCooldown": 0.1
	},
	"courier_drop_item": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/courier_drop_item",
		"AbilityTextureName": "courier_return_stash_items",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityCooldown": 0.1
	},
	"courier_combine_item": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/courier_combine_item",
		"AbilityTextureName": "action_patrol",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityCooldown": 0.1
	},
	"courier_teleport_item": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/courier_teleport_item",
		"AbilityTextureName": "courier_return_to_base",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_AOE | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityCooldown": 0.1
	},
	"dialog_event_ability_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"dialog_event_ability_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"dialog_event_ability_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"dialog_event_ability_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"dialog_event_ability_5": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"dialog_event_ability_6": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/dialog_event_ability",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE | DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	}
};
