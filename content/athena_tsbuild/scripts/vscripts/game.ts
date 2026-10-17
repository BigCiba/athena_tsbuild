import { reloadable } from "./lib/tstl-utils";
import type { modifier_common } from "./modifiers/framework/modifier_common";

@reloadable
class MGame extends CModule {
	/** 游戏暂停 */
	private _isPause = false;
	private tPlayerLastPauseTime: Partial<Record<PlayerID, number>> = {};
	private tPlayerLastUnPauseTime: Partial<Record<PlayerID, number>> = {};
	// /** 游戏难度 */
	// private _difficulty = 1;
	// /** 游戏难度上限 */
	// private _maxDifficulty = 1;
	/** 玩家数量 */
	private _playerCount = 1;
	/** 游戏胜利 */
	private _gameSuccess = false;
	init(reload: boolean) {
		GameEvent("game_rules_state_change", function (...args) { return this.OnGameRulesStateChange(...args); }, this);
		GameEvent("player_connect_full", function (...args) { return this.OnPlayerConnectFull(...args); }, this);
		GameEvent("player_disconnect", function (...args) { return this.OnPlayerDisconnect(...args); }, this);

		GameEvent("npc_spawned", function (...args) { return this.OnNPCSpawned(...args); }, this);
		GameEvent("custom_npc_first_spawned", function (...args) { return this.OnNPCFirstSpawned(...args); }, this);
		GameEvent("entity_killed", function (...args) { return this.OnEntityKilled(...args); }, this);
		GameEvent("dota_player_gained_level", event => {
			const hero = EntIndexToHScript(event.hero_entindex) as CDOTA_BaseNPC_Hero;
			if (!IsValid(hero) || !hero.IsRealHero()) return;
			const level = hero.GetLevel(), oldLevel = hero.__lastPublishedLevel ?? level - 1;
			if (level <= oldLevel) return;
			hero.__lastPublishedLevel = level;
			Event.Fire("hero_level_up", { unit: hero, level, old_level: oldLevel });
		}, this);
		CustomUIEvent("CustomTogglePause", function (...args) { return this.OnCustomTogglePause(...args); }, this);

		if (!reload) {
			if (IsServer()) {
				// 精简框架没有旧版 modifier_events；内置 modifier 仍可创建通信载体。
				_G.MODIFIER_EVENTS_DUMMY = CreateModifierThinker(undefined, undefined, (_G as AnyTable).modifier_events !== undefined ? "modifier_events" : "modifier_invulnerable", undefined, Vector(0, 0, 0), DOTATeam_t.DOTA_TEAM_NOTEAM, false);
				if (!IsValid(MODIFIER_EVENTS_DUMMY)) { this.error("通信载体创建失败"); return; }
				_G.RECORD_SYSTEM_DUMMY = MODIFIER_EVENTS_DUMMY;
				// _G.RECORD_SYSTEM_DUMMY = CreateModifierThinker((!IsDedicatedServer() ? GameRules.GetGameModeEntity() as unknown as CDOTA_BaseNPC : undefined), undefined, "modifier_record_system_dummy", undefined, Vector(0, 0, 0), DOTATeam_t.DOTA_TEAM_NOTEAM, false);
				_G.CLIENT_ABILITY = MODIFIER_EVENTS_DUMMY.AddAbility("client_ability");
				if (IsValid(CLIENT_ABILITY)) {
					CustomNetTables.SetTableValue("common", "client_ability", {
						_: CLIENT_ABILITY.entindex()
					});
				}
			}
		}
	}
	// GetDifficulty() {
	// 	return this._difficulty;
	// }

	// GetMaxDifficulty() {
	// 	return this._maxDifficulty;
	// }

	/**
	 * 遍历有玩家的队伍
	 * @param funcCallBack 回调，返回true的话会break遍历
	 */
	EachTeamsWithPlayer(funcCallBack: (iTeamNumber: DOTATeam_t) => boolean | void) {
		for (const iTeamNumber of $range(DOTATeam_t.DOTA_TEAM_FIRST, DOTATeam_t.DOTA_TEAM_CUSTOM_7, 1)) {
			let iPlayerCount = PlayerResource.GetPlayerCountForTeam(iTeamNumber);
			if (iPlayerCount > 0) {
				if (funcCallBack(iTeamNumber) == true) {
					break;
				}
			}
		}
	}
	/**
	 * 遍历玩家
	 * @param funcCallBack 回调，返回true的话会break遍历
	 * @param iTeamNumber 队伍，缺省则会遍历所有队伍的玩家
	 */
	EachPlayer(funcCallBack: (iPlayerID: PlayerID, iTeamNumber: DOTATeam_t, n: number) => boolean | void, iTeamNumber?: DOTATeam_t) {
		if (iTeamNumber == undefined) {
			this.EachTeamsWithPlayer(function (_iTeamNumber) {
				for (const n of $range(1, PlayerResource.GetPlayerCountForTeam(_iTeamNumber), 1)) {
					let iPlayerID = PlayerResource.GetNthPlayerIDOnTeam(_iTeamNumber, n);
					if (PlayerResource.IsValidPlayerID(iPlayerID)) {
						if (funcCallBack(iPlayerID, _iTeamNumber, n) == true) {
							break;
						}
					}
				}
			});
		} else {
			for (const n of $range(1, PlayerResource.GetPlayerCountForTeam(iTeamNumber), 1)) {
				let iPlayerID = PlayerResource.GetNthPlayerIDOnTeam(iTeamNumber, n);
				if (PlayerResource.IsValidPlayerID(iPlayerID)) {
					if (funcCallBack(iPlayerID, iTeamNumber, n) == true) {
						break;
					}
				}
			}
		}
	}
	/**
	 * 获取有效玩家数量
	 * @param iTeamNumber 队伍，缺省则会计算所有队伍的有效玩家
	 * @returns 有效玩家数量
	 */
	GetValidPlayerCount(iTeamNumber?: DOTATeam_t) {
		let n = 0;
		this.EachPlayer((iPlayerID) => {
			let hHero = PlayerResource.GetSelectedHeroEntity(iPlayerID);
			if (IsValid(hHero)) {
				n = n + 1;
			}
		}, iTeamNumber);
		return n;
	}

	/**
	 * 获取玩家在队伍中的位置，为防止玩家ID很大，返回值从1开始而不是像玩家ID一样从0开始
	 * @param playerID
	 * @returns
	 */
	GetPlayerTeamSlot(playerID: PlayerID | number) {
		let team = PlayerResource.GetTeam(playerID as PlayerID);
		for (const i of $range(1, PlayerResource.GetPlayerCountForTeam(team), 1)) {
			let slotPlayerID = PlayerResource.GetNthPlayerIDOnTeam(team, i);
			if (slotPlayerID != playerID) continue;
			return i;
		}
		return 0;
	}
	GetPlayerCount(isConnected: boolean = false) {
		let n = 0;
		this.EachPlayer(playerID => {
			if (isConnected) {
				if (PlayerResource.GetConnectionState(playerID) == DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED) {
					n++;
				}
			} else {
				n++;
			}
		});
		return n;
	}

	IsPause() {
		return this._isPause;
	}

	Pause(bFlag: boolean) {
		this._isPause = bFlag;
		PauseGame(this._isPause);
		this.UpdateCustomPause();
	}
	private UpdateCustomPause() {
		CustomNetTables.SetTableValue("common", "custom_pause", {
			pause: this._isPause,
		});
	}

	/** 设置游戏成功失败 */
	SetGameResult(success: boolean) {
		this._gameSuccess = success;
	}
	GetGameResult() {
		return this._gameSuccess;
	}
	/** 只重置局内标记与暂停冷却，保留登录及账号模块。 */
	ResetRunState() {
		this._gameSuccess = false;
		this.tPlayerLastPauseTime = {}; this.tPlayerLastUnPauseTime = {};
		if (this._isPause || GameRules.IsGamePaused()) this.Pause(false);
	}

	private OnNPCSpawned(tEvents: EventProperties<NpcSpawnedEvent>) {
		let spawnedUnit = EntIndexToHScript<CDOTA_BaseNPC>(tEvents.entindex);
		if (!IsValid(spawnedUnit)) return;
		LargeNumberHealth.Clear(spawnedUnit);

		if (spawnedUnit.IsRealHero() && spawnedUnit.GetPlayerOwnerID() == -1) {
			return;
		}

		if (spawnedUnit.GetUnitName() != "npc_dota_thinker") {
			if (!spawnedUnit.HasModifier("modifier_common")) {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_common", undefined);
			}
			if ((_G as AnyTable).modifier_hero !== undefined && spawnedUnit.IsRealHero() && !spawnedUnit.HasModifier("modifier_hero")) {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_hero", undefined);
			}
			if ((_G as AnyTable).modifier_bless_set !== undefined && spawnedUnit.IsRealHero() && !spawnedUnit.HasModifier("modifier_bless_set")) {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_bless_set", undefined);
			}
		}

		if (!spawnedUnit.__isNotFirstSpawn) {
			if (spawnedUnit.IsRealHero()) spawnedUnit.__lastPublishedLevel = spawnedUnit.GetLevel();
			spawnedUnit.SetMaximumGoldBounty(0);
			spawnedUnit.SetMinimumGoldBounty(0);
			spawnedUnit.SetDeathXP(0);

			spawnedUnit.__isNotFirstSpawn = true;
			FireGameEventLocal("custom_npc_first_spawned", { entindex: tEvents.entindex });
		} else if (spawnedUnit.IsHero()) {
			// 原版英雄再次出生也触发 OnReborn，不伪造转生层数。
			Event.FireUnit("reborn", { unit: spawnedUnit }, spawnedUnit);
		}

		if (spawnedUnit.GetUnitName() != "npc_dota_thinker") {
			const common = spawnedUnit.FindModifierByName("modifier_common") as modifier_common;
			if (IsValid(common)) common.SyncStats(true);
		}

		Event.Fire("npc_spawned", { unit: spawnedUnit });
	}

	private OnNPCFirstSpawned(tEvents: EventProperties<{ entindex: EntityIndex; }>) {
		let spawnedUnit = EntIndexToHScript<CDOTA_BaseNPC>(tEvents.entindex);
		if (!IsValid(spawnedUnit)) return;
		if (spawnedUnit.GetUnitName() == "npc_dota_thinker") return;

		if (spawnedUnit.HasAbility("ability_capture")) {
			spawnedUnit.RemoveAbility("ability_capture");
		}
		if (spawnedUnit.HasAbility("abyssal_underlord_portal_warp")) {
			spawnedUnit.RemoveAbility("abyssal_underlord_portal_warp");
		}
		if (spawnedUnit.HasAbility("twin_gate_portal_warp")) {
			spawnedUnit.RemoveAbility("twin_gate_portal_warp");
		}
		if (spawnedUnit.HasAbility("ability_lamp_use")) {
			spawnedUnit.RemoveAbility("ability_lamp_use");
		}
		if (spawnedUnit.HasAbility("ability_pluck_famango")) {
			spawnedUnit.RemoveAbility("ability_pluck_famango");
		}
		if (spawnedUnit.HasAbility("special_bonus_attributes")) {
			spawnedUnit.RemoveAbility("special_bonus_attributes");
		}

		if (spawnedUnit.IsRealHero()) {
			spawnedUnit.SetStashEnabled(true);
			spawnedUnit.SetAbilityPoints(0);
		} else {
			spawnedUnit.SetUnitCanRespawn_Engine(true);
		}

		if (spawnedUnit.GetClassname() == "npc_dota_building") {
			spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_breakable_building", undefined);
		}

		const kv: any = GetUnitKeyValuesByName(spawnedUnit.GetUnitName());
		if (kv != undefined) {
			// 出生自带的modifier
			if (kv.SpawnModifier != undefined && kv.SpawnModifier != "") {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, kv.SpawnModifier, undefined);
			}
			// AI modifier
			if (kv.AIModifier != undefined && kv.AIModifier != "") {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, kv.AIModifier, undefined);
			}

			if (!spawnedUnit.IsHero() && (kv.AttackSpeedActivityModifiers != undefined || kv.AttackRangeActivityModifiers != undefined || kv.MovementSpeedActivityModifiers != undefined)) {
				spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_activity_modifiers", undefined, AddModifierFlag.IGNORE_DEATH);
			}
		}

		// 遍历初始技能调用OnCreated函数
		spawnedUnit.CallAbilityCreated();
		Event.Fire("npc_first_spawned", { unit: spawnedUnit });
	}
	private OnEntityKilled(event: EventProperties<"entity_killed">) {
		const killedUnit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;
		if (!IsValid(killedUnit)) return;
		Event.Fire("entity_killed", { victim: killedUnit, attacker: EntIndexToHScript(event.entindex_attacker ?? -1) as CDOTA_BaseNPC });
		if (killedUnit.IsRealHero()) return;
		if (killedUnit.UnitCanRespawn()) return;
		killedUnit.GameTimer("RecyclingUnit", 8, () => {
			if (killedUnit.IsAlive()) return;
			if (killedUnit.IsRealHero()) return;
			if (killedUnit.UnitCanRespawn()) return;
			killedUnit.SafeRemoveUnit();
		});
	}
	private OnGameRulesStateChange(events: EventProperties<object>) {
		let state = GameRules.State_Get();

		// 游戏初始化
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
			// if (!IsInToolsMode()) {
			// 	if (!IsDedicatedServer() || GameRules.IsCheatMode()) {
			// 		let bb = 1;
			// 		while (true) {
			// 			bb = bb + 1;
			// 		}
			// 	}
			// }
		}
		// 选择英雄
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION) {
			Event.Fire("game_init", {});
		}
		// 策略时间
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME) {
		}
		// 准备阶段
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME) {
			// DropItem.Prewarm();
			// ShopItem.Prewarm();
		}
		// 游戏开始
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
			GameRules.SetTimeOfDay(0.26);
		}
	}
	private OnCustomTogglePause(tEvents: UIEventProperties<"CustomTogglePause">) {
		if (GameState.GetStateName() !== "GameState_Battle" && !this._isPause) return;
		this.print("CustomTogglePause", tEvents);
		let playerID = tEvents.PlayerID;
		// 多人游戏下的暂停、解除暂停有CD，单人无限制
		if (this.GetValidPlayerCount() > 1) {
			let now = Time();
			if (this._isPause) {
				let fTime = this.tPlayerLastUnPauseTime[playerID];
				if (fTime != undefined && now - fTime < CUSTOM_PAUSE_CD) {
					// 通知，暂无
					ErrorMessage("Custom_Cant_Unpause", playerID);
					// Notification.CombatToPlayer(iPlayerID, {
					// 	message: "Custom_Cant_Unpause_Time",
					// 	int_cant_pause_time: math.ceil(fTime + CUSTOM_PAUSE_CD - now),
					// });
					return;
				}
			} else {
				let fTime = this.tPlayerLastPauseTime[playerID];
				if (fTime != undefined && now - fTime < CUSTOM_PAUSE_CD) {
					// 通知，暂无
					ErrorMessage("Custom_Cant_Pause", playerID);
					// Notification.CombatToPlayer(iPlayerID, {
					// 	message: "Custom_Cant_Pause_Time",
					// 	int_cant_pause_time: math.ceil(fTime + CUSTOM_PAUSE_CD - now),
					// });
					return;
				}
			}
			if (this._isPause) {
				this.tPlayerLastUnPauseTime[playerID] = now;
			} else {
				this.tPlayerLastPauseTime[playerID] = now;
			}
		}

		this.Pause(!this._isPause);
	}
	private OnPlayerConnectFull(events: EventProperties<object>) {
		PrintTable(events);
	}
	private OnPlayerDisconnect(events: EventProperties<object>) {
		PrintTable(events);
	}

}
declare global {
	/** @ServerOnly */
	var Game: MGame;
}
Game ??= new MGame();
