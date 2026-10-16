
import { reloadable } from "../lib/tstl-utils";

declare type DemoEvents = {
	playerID: PlayerID,
	unit: CBaseEntity & CDOTA_BaseNPC | undefined,
	position: Vector,
	str: string,
	[x: string]: any;
};

@reloadable
class CDemo extends CModule {
	[x: string | number | symbol]: any;
	private readonly demoAttributeSource = "hud_demo_attribute";
	private readonly forceDashSearchRadius = 900;
	private forceDefensePending: Record<number, boolean> = {};
	private forceDashUnlockTime: Record<number, number> = {};
	/** 仅记录由 HUD Demo「添加属性」写入的值，避免覆盖其他系统的属性来源。 */
	private demoAttributeValues: Record<number, Record<string, number>> = {};
	damage_counter: boolean = false;
	performance_heatmap: boolean = false;
	free_spells: boolean = false;
	private creeps = true;
	avoid_damage: boolean = false;
	huge_damage: boolean = false;
	force_dash_auto_cast: boolean = false;
	lock_mouse: boolean = true;
	locl_camera: boolean = true;
	service_switch: boolean = true;
	spawnedUnitEntIndexes: EntityIndex[] = [];

	private RegisterSpawnedUnit(unit: CDOTA_BaseNPC) {
		if (!IsValid(unit)) {
			return;
		}
		this.spawnedUnitEntIndexes.push(unit.entindex());
	}

	private InitSpawnedUnitByKV(spawnedUnit: CDOTA_BaseNPC, unitName: string) {
		const kv: any = GetUnitKeyValuesByName(unitName);
		if (!IsValid(spawnedUnit) || kv == undefined) {
			return;
		}
		if (!spawnedUnit.IsHero() && (kv.AttackSpeedActivityModifiers != undefined || kv.AttackRangeActivityModifiers != undefined || kv.MovementSpeedActivityModifiers != undefined)) {
			spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_activity_modifiers", undefined, AddModifierFlag.IGNORE_DEATH);
		}
	}

	private CreateDemoUnitByTeam(data: DemoEvents, team: DOTATeam_t) {
		let hPlayerHero = PlayerResource.GetSelectedHeroEntity(data.playerID);
		if (!IsValid(hPlayerHero)) return;
		let vPosition = data.position;
		if (vPosition == vec3_invalid) return;
		let spawnedUnit = CreateUnitByName(data.str, vPosition, true, hPlayerHero, hPlayerHero, team);
		if (!IsValid(spawnedUnit)) {
			return;
		}
		spawnedUnit.SetForwardVector(vec3_bottom);
		spawnedUnit.SetControllableByPlayer(data.playerID, true);
		spawnedUnit.AddNewModifier(spawnedUnit, undefined, "modifier_ai_disabled", {});
		this.RegisterSpawnedUnit(spawnedUnit);
		this.InitSpawnedUnitByKV(spawnedUnit, data.str);
		this.ApplyDemoDifficultyModifiers(spawnedUnit, data);
		return spawnedUnit;
	}

	init(bReload: boolean): void {
		this.creeps ??= true;
		if (!bReload) {
			this.demoAttributeValues = {};
			SendToServerConsole("sv_cheats 1");
			SendToServerConsole("dota_ability_debug 0");
			Event.Register("dash_end", (event) => this.OnForceDashEnd(event), this);
		}
		this.UpdateSettings();

		GameEvent("player_chat", function (...args) { return this.OnPlayerChat(...args); }, this);
		GameEvent("game_rules_state_change", function (...args) { return this.OnGameRulesStateChange(...args); }, this);
		// GameEvent("custom_npc_first_spawned", function (...args) { return this.OnNPCFirstSpawned(...args); }, this);
		CustomUIEvent("DemoEvent", function (data) {
			if (!IsInToolsMode()) {
				return
			}
			let eventName = data.event_name;
			// CustomUIEvent 会用事件真实发送者覆盖 PlayerID，不能信任客户端自报的 player_id。
			let playerID = data.PlayerID ?? -1;
			let unit = EntIndexToHScript((data.unit ?? - 1) as EntityIndex);
			let position = data.position != undefined ? Vector(data.position["0"], data.position["1"], data.position["2"]) : vec3_invalid;
			let str = data.str;
			if (typeof eventName == "string" && typeof this[eventName] == "function") {
				let params: DemoEvents = {
					playerID: playerID,
					unit: unit as CDOTA_BaseNPC,
					position: position,
					str: str,
				};
				for (let [k, v] of pairs(data)) {
					if (k != "event_name" && k != "player_id" && k != "unit" && k != "position" && k != "str") {
						params[k] = v;
					}
				}
				this[eventName](params);
			}
		}, this);
	}
	/**
	 * 获取玩家设置
	 * @param playerID 玩家ID
	 * @param key 设置键名
	 * @param defaultValue 默认值
	 * @returns 玩家设置值或默认值
	 */
	GetToolSetting<T>(playerID: PlayerID, key: string, defaultValue: T): T {
		let value = CommonService.GetPlayerServiceNetTable(playerID, "player_key_values")?.[key]?.value as T;
		return tonumber(value) as T ?? value ?? defaultValue;
	}
	/**
	 * 设置玩家设置
	 * @param playerID 玩家ID
	 * @param key 设置键名
	 * @param value 设置值
	 */
	SetToolSetting(playerID: PlayerID, key: string, value: any) {
		if (value == true) {
			value = "TRUE";
		}
		if (value == false) {
			value = "FALSE";
		}
		CommonService.CallAction("/v1/key/save", playerID, { type: "tool_settings", key: key, value: tostring(value) });
	}
	/** 加载配置 */
	private LoadConfig() {
		Game.EachPlayer((playerID) => {
			if (!PlayerResource.IsFakeClient(playerID)) {
				CommonService.RepeatCallAction("/v1/key/fetch", playerID, { type: "tool_settings" });
			}
		});
	}
	/** 更新 */
	UpdateSettings() {
		const settings = {
			free_spells: this.free_spells,
			creeps: this.creeps ? 1 : 0,
			lock_mouse: this.lock_mouse,
			avoid_damage: this.avoid_damage,
			huge_damage: this.huge_damage,
			damage_counter: this.damage_counter,
			performance_heatmap: this.performance_heatmap,
			force_dash_auto_cast: this.force_dash_auto_cast,
			service_switch: this.service_switch,
		};
		CustomNetTables.SetTableValue("common", "demo_settings", settings);
	}
	private OnPlayerChat(events: EventProperties<PlayerChatEvent>) {
		if (!IsInToolsMode()) {
			return;
		}
		let playerID = events.playerid;
		let text = string.lower(events.text);
		let teamOnly = events.teamonly == 1;

		let tokens = string.split(text, " ");
		let cmd = tokens[0];
		let args: any[] = [];
		for (let i = 1; i < tokens.length; i++) {
			const tmp = tonumber(tokens[i]);
			if (tmp) {
				table.insert(args, tmp);
			} else {
				table.insert(args, tokens[i]);
			}
		}

		if (text == "0") {
			SendToServerConsole("cl_ent_text");
		}
		if (text == "1") {
			SendToServerConsole("ent_text");
		}
		if (text == "2") {
			SendToServerConsole("ent_kill");
		}
	}
	private OnGameRulesStateChange(tEvents: EventProperties<object>) {
		let state = GameRules.State_Get();
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION) {
			this.LoadConfig();
		}
	}
	// ============================================================
	// region 游戏
	// ============================================================
	/** 主机速度 */
	ChangeHostTimescale(data: DemoEvents) {
		SendToServerConsole("host_timescale " + data.str);
	}
	IsCreepsEnabled() { return this.creeps ?? true; }
	/** 原版调试开关：关闭时清空当前波次并暂停，恢复后继续当前波次。 */
	NoCreepsButtonPressed(data: DemoEvents) {
		this.creeps = !this.IsCreepsEnabled();
		this.UpdateSettings();
		Event.Fire("demo_creeps_changed", { enabled: this.creeps });
	}
	/** 调试请求也通过事件进入 Task，不对外暴露分步任务流程。 */
	StartTask(data: DemoEvents) { Event.Fire("task_debug_start", { playerID: data.playerID, taskName: data.str }); }

	Standby(data: DemoEvents) {

	}
	// ============================================================
	// region 技能
	// ============================================================
	AddItem(data: DemoEvents) {
		if (!data.unit) return;
		const [itemName, ground] = data.str.split("|");

	}

	// ============================================================
	// region 英雄
	// ============================================================
	/** 刷新状态 */
	Refresh(data: DemoEvents) {
		let heroes = HeroList.GetAllHeroes();
		for (const hero of heroes) {
			const particleID = ParticleManager.CreateParticleForce("particles/items2_fx/refresher.vpcf", ParticleAttachment_t.PATTACH_ROOTBONE_FOLLOW, hero);
			ParticleManager.ReleaseParticleIndex(particleID);
			hero.EmitSound("DOTA_Item.Refresher.Activate");
			for (let index = 0; index < hero.GetAbilityCount() - 1; index++) {
				let ability = hero.GetAbilityByIndex(index);
				if (ability) {
					ability.EndCooldown();
					ability.RestoreCharges(10);
				}
			}
			const itemList = hero.GetAllItems();
			itemList.forEach((item) => {
				item.EndCooldown();
				item.RestoreCharges(10);
			});
			let oldHp = hero.GetHealth();
			hero.SetHealth(hero.GetMaxHealth());
			hero.SetMana(hero.GetMaxMana());
			this.print("hp:刷新状态:", hero, hero.GetMaxHealth(), oldHp, " ->", hero.GetHealth());
		}
	}

	/** 无限技能 */
	FreeSpells(data: DemoEvents) {
		SendToServerConsole("toggle dota_ability_debug");
		this.free_spells = !this.free_spells;
		if (this.free_spells) {
			this.Refresh(data);
		}
		this.UpdateSettings();
	}
	/** 免伤 */
	AvoidDamage(data: DemoEvents) {
		if (data.unit == undefined) return;
		this.avoid_damage = !this.avoid_damage;
		if (data.unit.HasModifier("modifier_invulnerable_buff")) {
			data.unit.RemoveModifierByName("modifier_invulnerable_buff");
		} else {
			data.unit.AddNewModifier(data.unit, undefined, "modifier_invulnerable_buff", undefined);
		}
		this.UpdateSettings();
	}
	/** 秒杀 */
	HugeDamage(data: DemoEvents) {
		if (data.unit == undefined) return;
		this.huge_damage = !this.huge_damage;
		if (data.unit.HasModifier("modifier_huge_damage")) {
			data.unit.RemoveModifierByName("modifier_huge_damage");
		} else {
			data.unit.AddNewModifier(data.unit, undefined, "modifier_huge_damage", undefined);
		}
		this.UpdateSettings();
	}
	// ============================================================
	// region 单位
	// ============================================================
	ControlUnit(data: DemoEvents) {
		if (data.Unit) {
			if (data.Unit.IsControllableByAnyPlayer()) {
				data.Unit.SetControllableByPlayer(-1, true);
			} else {
				data.Unit.SetControllableByPlayer(data.PlayerID, true);
			}
		}
	}

	/** 创建敌方单位 */
	CreateEnemy(data: DemoEvents) {
		this.print("OnCreateEnemy:", data.str);
		this.CreateDemoUnitByTeam(data, DOTATeam_t.DOTA_TEAM_BADGUYS);
	}
	/** 创建伤害统计假人 */
	DummyTarget(data: DemoEvents) {
		const playerHero = PlayerResource.GetSelectedHeroEntity(data.playerID);
		if (!IsValid(playerHero) || data.position == vec3_invalid) {
			return;
		}

		const dummy = CreateUnitByName("demo_dummy", data.position, true, playerHero, playerHero, DOTATeam_t.DOTA_TEAM_BADGUYS);
		if (!IsValid(dummy)) {
			return;
		}

		dummy.SetForwardVector(vec3_bottom);
		dummy.SetControllableByPlayer(data.playerID, false);
		dummy.AddNewModifier(dummy, undefined, "modifier_ai_disabled", {});
		dummy.Hold();
		this.RegisterSpawnedUnit(dummy);
	}
	CreateEliteEnemy(data: DemoEvents) {
		this.print("OnCreateEliteEnemy:", data.str);
		const spawnedUnit = this.CreateDemoUnitByTeam(data, DOTATeam_t.DOTA_TEAM_BADGUYS);
		spawnedUnit?.AddNewModifier(spawnedUnit, undefined, "modifier_elite", undefined);
	}

	/** 创建友方单位 */
	CreateAlly(data: DemoEvents) {
		this.print("OnCreateAlly:", data.str);
		this.CreateDemoUnitByTeam(data, DOTATeam_t.DOTA_TEAM_GOODGUYS);
	}

	/** 移除创建的单位 */
	RemoveSpawnedUnits(data: DemoEvents) {
		for (let i = 0; i < this.spawnedUnitEntIndexes.length; i++) {
			const entIndex = this.spawnedUnitEntIndexes[i];
			const unit = EntIndexToHScript(entIndex) as CDOTA_BaseNPC | undefined;
			if (!IsValid(unit)) {
				continue;
			}
			unit.SafeRemoveUnit();
		}
		this.spawnedUnitEntIndexes = [];
	}
	// ============================================================
	// region 其他
	// ============================================================

	/** 重开游戏 */
	Restart(data: DemoEvents) {
		GameState.DebugRestart();
	}
	/** 重载KV */
	ReloadKeyValue(data: DemoEvents) {
		GameRules.Playtesting_UpdateAddOnKeyValues();
		FireGameEvent("client_reload_game_keyvalues", {});
	}
	/** 重载脚本 */
	ReloadScript(data: DemoEvents) {
		FireGameEvent("client_reload_game_keyvalues", {});
		SendToServerConsole("cl_script_reload");
		SendToServerConsole("script_reload");
	}
	RefreshServicePressed(data: DemoEvents) {
		print("RefreshServicePressed");
		// Service.DebugRefreshData();
	}

	//----------------------后端----------------------
	Login(data: DemoEvents) {
		print("ReLogin");
		Login.Login();
	}
	ServiceSwitch(data: DemoEvents) {

	}

	AddServiceToken(data: DemoEvents) {
		print("OnAddServiceToken", data.str);
		let [item_id, amounts] = data.str.split("|").map(s => tonumber(s)!);
		CommonService.CallAction("/v1/gm/add_item", data.PlayerID, { add_items: [{ item_id, amounts }] });
	}
}

declare global {
	var Demo: CDemo;
}
Demo ??= new CDemo();
