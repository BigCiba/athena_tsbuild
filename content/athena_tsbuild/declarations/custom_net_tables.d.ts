declare interface Table {
	[x: string]: any;
}

declare type TutorialUpperType = "MOVEMENT" | "ABILITY" | "TEXT" | "INTERACT";
declare interface TutorialTaskData {
	key: string;
	// 小任务文本
	text: string;
	ability?: AbilityTag;
	// 是否完成
	success: boolean;
}

declare interface TutorialUpperData {
	unique: number;
	type: TutorialUpperType,	// 类型
	text: string,		// 文本内容
	ability?: AbilityTag, 	// 关联技能（仅当type为ABILITY时有效）
	endTime: number,	// 结束时间
}

declare type PerformanceMetricLevel = "idle" | "ok" | "warn" | "hot";

declare interface PerformanceMetricSnapshot {
	key: string;
	label: string;
	group: string;
	avgMs: number;
	maxMs: number;
	lastMs: number;
	calls: number;
	samples: number;
	hot: number;
	level: PerformanceMetricLevel;
}

declare interface PerformanceHeatmapSnapshot {
	sequence: number;
	updatedAt: number;
	windowSeconds: number;
	systems: Record<string, PerformanceMetricSnapshot>;
}

interface GameModeDifficultyNetSnapshot {
	state: "idle" | "pending";
	playerDifficulties: Partial<Record<PlayerID, number>>;
	initiatorPlayerId?: PlayerID;
	endTime?: number;
	resolvedDifficulty?: number;
}

interface GameModeActiveNetSnapshot {
	modeId: string | number;
	difficulty: number;
	participantPlayerIds: PlayerID[];
	playerDifficulties: Partial<Record<PlayerID, number>>;
}

interface DungeonStartWaitNetSnapshot {
	state: "idle" | "pending";
	start_time?: number;
	end_time?: number;
	long_wait_second?: number;
}

interface GameModePrepareNetSnapshot {
	state: "None" | "pending" | "success" | "failed";
	requestModeId?: string | number;
	requesterPlayerId?: PlayerID;
	startTime?: number;
	endTime?: number;
	closeTime?: number;
	failReason?: "rejected" | "timeout";
	invitedPlayerIds: PlayerID[];
	playerResponses: Partial<Record<PlayerID, "Pending" | "Ready" | "Rejected">>;
	allResponded: boolean;
	allReady: boolean;
	hasRejected: boolean;
}

interface TeamRequestNet {
	state: "None" | "pending" | "success" | "failed";
	requestId?: string;
	requestType?: string;
	requesterPlayerId?: PlayerID;
	endTime?: number;
	closeTime?: number;
	text: {
		title: string;
		subtitle: string;
		cancel?: string;
		pendingInitiator: string;
		pendingOther: string;
		success: string;
		rejected: string;
		timeout: string;
	};
	failReason?: "rejected" | "timeout";
	playerResponses: Partial<Record<PlayerID, "Pending" | "Ready" | "Rejected">>;
}

interface GameModeRegistedNetSnapshot {
	modeId: string | number;
	configuredDifficulties?: number[];
	availableDifficulties: Array<{
		difficulty: number;
		name?: string;
		desc?: string;
		available?: boolean;
	}>;
	defaultDifficulty: number;
}

interface AbyssalStateNetSnapshot {
	state: "running" | "ended";
	start_time: number;
	end_time: number;
	duration: number;
	difficulty: number;
	kill_count: number;
	result?: "victory" | "defeat";
	reason?: "Timeout" | "AllPlayersDead" | "EarlySettlement";
}

interface LastEndScreenMetaSnapshot {
	snapshot_id: number;
	mode: "dungeon" | "abyssal" | "tutorial";
	result: "victory" | "defeat";
	difficulty: number;
	key_intensity?: number;
	end_time: number;
	participant_player_ids: PlayerID[];
}

interface LastEndScreenMvpSnapshot {
	snapshot_id: number;
	player_id: PlayerID;
	hero_name: string;
	owner_name: string;
	total_damage: number;
}

interface LastEndScreenPlayerSnapshot {
	snapshot_id: number;
	hero_name: string;
	completion_time: number;
}

interface LastDungeonEndProgressSnapshot {
	snapshot_id: number;
	zone_index: number;
	zone_total: number;
	room_index: number;
	room_step: number;
	room_total: number;
}

interface LastDungeonEndBattleSnapshot {
	snapshot_id: number;
	normal_kills: number;
	elite_kills: number;
	skill_damage_total: number;
	ability_damage_sources: Array<{
		ability_name: string;
		total_damage: number;
		ratio: number;
		count: number;
	}>;
}

interface LastDungeonEndBuildSnapshot {
	snapshot_id: number;
	blessings: Array<{
		name: string;
		rarity: number;
	}>;
	artifacts: Array<{
		item_name: string;
		level: number;
		entindex?: number;
	}>;
	selected_upgrades: string[];
	ability_upgrades: Array<{
		name: string;
		level: number;
	}>;
}

type LastAbyssalEndBattleSnapshot = LastDungeonEndBattleSnapshot;
type LastAbyssalEndBuildSnapshot = LastDungeonEndBuildSnapshot;

interface LastAbyssalEndSummarySnapshot {
	snapshot_id: number;
	alive_time: number;
	difficulty: number;
	score: number;
	kill_count: number;
	reason: "Timeout" | "AllPlayersDead" | "EarlySettlement";
	combo_multiplier_max?: number;
}

interface LastEndScreenRewardsSnapshot {
	snapshot_id: number;
	rewards: Array<{
		item_id: number;
		amounts: number;
		item_rarity: number;
		uid?: number;
	}>;
}

type AbyssalRewardBoxType = "RuneBox" | "EngravingBox";

interface AbyssalRuneRewardItem {
	id: number;
	rune_item_id: number;
	rarity: number;
}

interface AbyssalEngravingRewardItem {
	id: number;
	engraving_item_id: number;
	rarity: number;
	class: number;
}

type AbyssalRewardItem = AbyssalRuneRewardItem | AbyssalEngravingRewardItem;

type LastAbyssalRewardPreviewSnapshot = {
	snapshot_id: number;
	revision: number;
} & ({
	box_type: "RuneBox";
	rewards: AbyssalRuneRewardItem[];
} | {
	box_type: "EngravingBox";
	rewards: AbyssalEngravingRewardItem[];
});

interface LastAbyssalRewardOverviewSnapshot {
	snapshot_id: number;
	received_box_types: AbyssalRewardBoxType[];
	rewards_by_box: Partial<{
		RuneBox: AbyssalRuneRewardItem[];
		EngravingBox: AbyssalEngravingRewardItem[];
	}>;
}

interface AbyssalEventNetSnapshot {
	eventId: string;
	startTime: number;
	endTime: number;
	duration: number;
}

interface AbyssalHordeStateNetSnapshot {
	isRunning: boolean;
	isLoading: boolean;
	abyssalEventRoundKillCount: number;
	currentAbyssalEventTriggerCount: number;
	hasPendingEventElite: boolean;
}

interface AbyssalHordeDebugStateNetSnapshot {
	currentPhase: number;
	killCount: number;
	aliveEnemyCount: number;
	maxAliveEnemyCount: number;
	isAbyssalEventCountingEnabled: boolean;
}

interface AbyssDropDebugNetSnapshot {
	dropId: string;
	baseChance: number;
	increaseChance: number;
	currentChance: number;
	dropMax?: number;
	droppedCount: number;
}

interface ComboStateNetSnapshot {
	comboCount: number;
	comboScore: number;
	currentMultiplier: number;
	peakMultiplier: number;
	multiplierProgressCount: number;
	comboTimer: number;
	comboTimerEndTime?: number;
	isTimerRunning: boolean;
	isPaused: boolean;
}

interface BattleGemState {
	isRunning: boolean;
	isLoading: boolean;
	isFinished: boolean;
	difficulty: number;
	currentLevel: number;
	maxLevel: number;
	result?: "success" | "failed";
	attackDuration: number;
	attackEndTime?: number;
	currentWave: number;
	totalWaveCount: number;
	aliveEnemyCount: number;
	totalEnemyCount: number;
	bossEntIndex?: EntityIndex;
	participantPlayerIds: PlayerID[];
	actionPurchasingPlayerIds: PlayerID[];
	actionPurchasedPlayerIds: PlayerID[];
}

interface DungeonNetTableData {
	difficulty: number;
	player_count: number;
	boss_round: number;
	boss_shrink_time: number;
	zone_index: number;
	room_index: number;
	game_success?: boolean;
}


type AccountLevelType = "equip_break_level" | "hero_level" | "collection_treasure" | "rune_break_level";

declare interface CustomNetTableDeclarations {
	common: {
		custom_pause: {
			pause: boolean,
			frozen?: boolean,
		};
		demo_settings: {
			[x: string]: any;
		};
		client_ability: {
			_: EntityIndex;
		};
		// 游戏阶段
		game_state: {
			state: string,
			start_time: number,
			end_time: number,
		};
		game_data: {
			champion_mode: boolean;
		};
		player_privileges: Record<string, boolean>;
		npc: Record<EntityIndex, {
			name: string;
			playerID?: PlayerID;
		}>;
	};
	ability_upgrade: Record<string, {
		upgrades: {
			name: string;
			level: number;
		}[];
	}>;
	ability_upgrades_list: Record<string, { json: string; }>;
	ability_upgrades_result: Record<string, { json: string; }>;
	request_0: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_1: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_2: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_3: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	service: Table;
	property_system: Table;
	state_system: Table;
}


/**
 * 方便json格式化的定义
 */
interface NetDataDeclarations {
	arena: {
		session: any;
	};
	combo: {
		state: ComboStateNetSnapshot;
	};
	cosmetic_particle_replace: Record<string, {
		particles: Record<string, string>;
	}>;
	common: {
		settings: {
			is_local_host: boolean,
			is_in_tools_mode: boolean,
			is_cheat_mode: boolean,
			[x: string]: any;
		};
		// 游戏的全局信息
		values: DungeonNetTableData;
		bp_season: {
			season: number;
		};
		server_time: {
			time_stamp: number;
		};
		// 游戏阶段
		game_state: {
			state: string,
			start_time: number,
			end_time?: number,
		};
		// 回合阶段
		round_state: {
			round_number: number,
			prep_end_time: number,
			timed_round_end_time?: number,
		};
		/** 登录进度 */
		login_state: Partial<Record<PlayerID, {
			state: PlayerLoginState,
			steps: {
				login: boolean,
				setting: boolean,
			},
			ban_end_time?: number;
		}>>;
		/** 游戏常量 */
		constant: {

		};
		hero_selection: {
			heroName: string;
			heroIndex: EntityIndex;
			wantHeroName?: string;
			pickHeroName?: string;
		};
		resource: { gold: number; };
		// 多选一等待处理的数量
		multi_choice_state: {
			// 多选一待选总数
			sum_count: number,
			// 队列中 技能升级数量
			skill_upgrade: number,
			// 祝福选择数量
			bless_selection: number,
			// 祝福升级数量
			bless_upgrade: number,
			// 神器升级数量
			artifact_upgrade: number,
			// 神器选择数量
			artifact_selection: number,
			// 激活UI的页面
			active_type?: string;
		};
		// 技能选择
		upgrade_selection: {
			options: Array<{
				id: string;
				ability_name: string;
				icon?: string;
				name?: string;
				description?: string;
			}>;
		};
		upgrade_selection_all: {
			options: Array<{
				id: string;
				ability_name: string;
			}>;
		};
		upgrade_selection_ex: {
			free_refresh_count: number;
			pay_refresh_count: number;
			allin_count: number;
		};
		restart_game_request: {
			state: "pending" | "success" | "failed";
			initiator_player_id: PlayerID;
			start_time: number;
			end_time: number;
			close_time?: number;
			fail_reason?: "rejected" | "timeout";
			players: Record<number, {
				status: "pending" | "accepted" | "rejected";
			}>;
		};
		game_mode_state: {
			selectedModeId?: string | number;
			activeModeId?: string | number;
			startingModeId?: string | number;
			startPendingEndTime?: number;
			startPendingWaitSecond?: number;
			maxAvailableDifficulty?: number;
		};
		game_mode_profiles: {
			registeredModes: Record<string, GameModeRegistedNetSnapshot>;
		};
		game_mode_prepare_request: GameModePrepareNetSnapshot;
		team_request: TeamRequestNet;
		game_mode_difficulty_selection: GameModeDifficultyNetSnapshot;
		game_mode_active_snapshot: GameModeActiveNetSnapshot | undefined;
		dungeon_start_wait: DungeonStartWaitNetSnapshot;
		abyssal_state: AbyssalStateNetSnapshot;
		abyssal_horde_state: AbyssalHordeStateNetSnapshot | undefined;
		abyssal_horde_debug_state: AbyssalHordeDebugStateNetSnapshot | undefined;
		abyssal_drop_state: AbyssDropDebugNetSnapshot[] | undefined;
		abyssal_events: AbyssalEventNetSnapshot[];
		battle_gem_state: BattleGemState;
		difficulty_key: {
			key: number;
			owner_id: PlayerID;
			key_data: DungeonKeyProps;
		} | undefined;
		combo_state: ComboStateNetSnapshot;
		// 祝福选择
		bless_selection: PlayerBlessSelect;
		// 神器选择
		artifact_selection: PlayerArtifactSelect;
		// 特权开局奖励自选
		privilege_reward_selection: {
			options: Array<{
				name: string;
				rarity: number;
			}>;
			title: string;
			remaining_count: number;
		};
		// 玩家当前已激活特权
		player_privileges: Record<string, boolean>;
		// 祝福升级选择
		bless_upgrade_selection: {
			options: Array<PlayerBlessUpgradeOption>;
			allin_count: number;
		};
		// 遗物升级选择
		artifact_upgrade_selection: {
			options: Array<{
				name: string;
				rarity: number;
				canUpgradeRarity: boolean;
				canUpgradePath: boolean;
				upgradePath?: string;
			}>;
		};
		/** 已选择的升级列表 */
		upgrade_list: {
			upgrades: string[];
		};
		/** 地牢加载黑屏 */
		dungeon_loading: {
			state: boolean;
		};
		/** boss入场效果 */
		boss_intro: {
			state: boolean;
		};
		/** boss入场镜头恢复数据 */
		boss_intro_camera: {
			state: boolean;
			targetEntIndex?: EntityIndex;
			targetX?: number;
			targetY?: number;
			targetZ?: number;
			forwardX?: number;
			forwardY?: number;
			forwardZ?: number;
			duration?: number;
			focusDistance?: number;
			heightOffset?: number;
			restoreDuration?: number;
			startTime?: number;
			endTime?: number;
			sequence?: number;
		};
		/** 首次选英雄 */
		first_hero_selection: {
			end_time: number;
		};
		/** 结算信息 */
		settle_info: {
			end_by_custom?: boolean;

			end_time: number;
			/** 是否显示结算的menu_bar，显示从结算持续到准备阶段结束 */
			show_menu_bar: boolean;
		};
		/** 深渊结算等待信息 */
		abyssal_settle_info: {
			snapshot_id: number;
			state: "waiting_first_ready" | "waiting_participants" | "all_summary_ready";
			wait_end_time: number;
		};
		/** 结算MVP摘要 */
		last_end_screen_meta: LastEndScreenMetaSnapshot;
		last_end_screen_mvp: LastEndScreenMvpSnapshot;
		input_mode: {
			mode: "keyboard" | "gamepad",
			isGamepad: 1 | 0,
		};
		interact_hold: {
			active: 1 | 0;
			progress: number;
			threshold: number;
		};
		performance_heatmap: PerformanceHeatmapSnapshot;
		/** 教学任务 */
		tutorial_task: {
			tutorial_key: string,
			task_data: TutorialTaskData[],
		};
		/** 教学阶段 */
		tutorial_stage: { stage: number; };
	};
	unit: Record<string, {
		items: {
			entIndex: EntityIndex,
			stackCount: number,
			charge: number,
			level: number,
			maxCharge: number,
			chargeRestoreTime: number,
			isChargeCooldownFrozen: boolean,
			chargeFrozenCooldownRemaining: number,
			itemName: string,
		}[],
		abilities: {
			entIndex: EntityIndex,
			stackCount: number,
			charge: number,
			maxCharge: number,
			chargeRestoreTime: number,
			isChargeCooldownFrozen: boolean,
			chargeFrozenCooldownRemaining: number,
			abilityName: string,
		}[],
	}>;
	dropped_item: Record<string, {
		kind?: "shop" | "client";
		item_name?: string;
		rarity?: number;
		item_id?: string;
		is_free?: boolean;
		owner_player_id?: PlayerID;
		show_tip: boolean;
	}>;
	player_data: PlayerDataType;
	dialog_event: Record<string, Record<number, {
		name: string;
		cost: {
			/** 实际被百分比修改后的消耗值 */
			value: number;
			/** 记录原始消耗值 */
			rawValue: number;
			type: "gold" | "crystal" | "score";
		}[];
		enable: boolean;
		auto_cast: boolean;
		autocastable: boolean;
		toggle_enabled: boolean;
		timer?: number;
		image?: string;
		level?: number;
		maxLevel?: number;
		faith_level?: number;
		faith_reward?: {
			name: string;
			count?: number;
			type: string;
		};
		vars: Record<string, string | number | AttributeValue>;
		description?: string;
		override_tooltip?: {
			type: "item" | "ability";
			name: string;
		};
	}>>;
	ability_upgrade: Record<string, {
		upgrades: {
			name: string;
			level: number;
		}[];
	}>;
	ability_values: Record<string, Record<string, Record<string, Partial<AbilityValueData>>>>;
	ability_values_2: Record<string, Record<string, Partial<AbilityValueData>>>;
	ability_uniques: Record<string, Record<string, Record<string, number>>>;
	ability_uniques_2: Record<string, Record<string, number>>;
	ability_values_data: Record<string, Record<string, any>>;

	player_key_values: Record<string, {
		type: string;
		key: string;
		value: string;
	}>;

	/** 代币 */
	player_tokens: Record<string, {
		token_id: number,
		amounts: number,
	}>;
	/** 道具 */
	player_props: Record<string, {
		id: number;
		prop_id: number;
		expire_time: number;
		amounts: number;
	}>;
	/** 邮件 */
	player_mails: Record<string, MailData>;
	/** 账号 */
	player_account_levels: Partial<Record<AccountLevelType, PlayerAccountLevel>>;
	/** 账号奖励领取记录 */
	player_account_level_rewards_receive_records: Partial<Record<AccountLevelType, Record<string, boolean>>>;
	/** 英雄星级奖励领取记录 */
	player_hero_star_rewards_receive_records: Record<string, Record<string, boolean>>;
	/** 天赋 */
	player_talent: {
		talents: string;
	};
	player_activity_tasks: Record<string, ServiceTaskInfo>;
	player_couriers: Record<string, ServiceCourierInfo>;
	player_idle_game_explore_building_data: { level: number; };
	player_game_data: {
		mainline_progress: number,
	};
	player_login_activity_data: {
		[activity_id: string]: {
			step: number,
			last_receive_time: number,
			closed: boolean,
			next_can_receive: boolean,
		};
	};
	player_saving_pot_activity_data: {
		[activity_id: string]: {
			plus: boolean,
			progress: number,
			update_time: number,
			free_received: boolean,
			plus_received: boolean,
		};
	};
	player_ornament: Record<string, {
		ornament_id: number,
		slot_id: number,
		hero_id: number,
		equipped: boolean,
		expire_time: number,
		permanent: boolean;
	}>;
	open_shop: {
		value: boolean;
	};
	player_collections: Record<string, {
		collection_id: number,
		collection_type: string,
		extra_exp: number,
		level: number,
	}>;
	player_collection_data: Record<string, {
		collection_type: string,
		total_level: number,
		received: number[];
	}>;
	player_blessings: Record<string, {
		blessing_id: number,
		permanent: boolean,
		expire_time: number,
	}>;
	version: {
		value: number;
	};
	dungeon: {
		/** 地牢进度 */
		progress: {
			zone: number;
			depth: number;
			roomsCleared: number;
			totalRooms: number;
			bossesDefeated: number;
		};
		/** 房间过渡状态 */
		transition: {
			isTransitioning: boolean;
			zone?: number;
			depth?: number;
			totalRooms?: number;
		};
	} & {
		/** 升级选项 (每个玩家独立) - 使用索引签名支持动态key */
		[key: string]: any;
	};

	/** 可交互物列表 */
	interactables: {
		list: Record<string, {
			type: string;
			name: string;
			level: number;
			x: number;
			y: number;
			z: number;
			radius: number;
			maxInteractions: number;
			dummyHandle: number;
			totalInteractions: number;
			visibleToPlayerID?: PlayerID;
			costInfo?: {
				cost: number;
				discountPercent?: number;
				costType?: string;
				costSource?: "tokens" | "resource";
				freeKey?: string;
			};
		}>;
	};
	info_products: Record<string, {
		product_id: number,
		start_time: number,
		end_time: number;
	}>;
	/**局外英雄数据 */
	player_heroes: Record<string, {
		hero_id: number,
		star: number,
		extra_star_exp: number,
		equip_suit: number;
		equip_weapon: number;
		rune_equip_suit: number;
		talents: string;
		used_talent_points: number;
	}>;

	player_devour_rune_results: Record<string, RuneDevourResultProps | "nil">;
	player_inlay_engraving_results: Record<string, RuneInlayResultProps | "nil">;
	/** 玩家刻印数据 */
	player_engravings: Record<string, SimplifyEngravingProps | "nil">;
	/** 玩家技能符文数据 */
	player_runes: Record<string, SimplifyRuneProps | "nil">;
	player_equipments: Record<string, any>;
	player_recast_equipment_v2_results: Record<string, RecastV2ResultProps | "nil">;
	player_gems: Record<string, any>;
	player_hero_equip_suits: {
		[hero_id: string]: {
			[suit_id: string]: {
				[part: string]: number;
			}; // 装备ID
		};
	};
	/** 玩家符文装备数据 */
	player_hero_rune_equip_suits: {
		[hero_id: string]: {
			[suit_id: string]: {
				[skill_id: string]: {
					[slot_id: string]: number | "nil";
				};
			};
		};
	};
	/** 后端计算的英雄技能局外属性 */
	hero_skill_outside_attributes: Record<string, OutsideAbilityAttributeMap>;
	/** 玩家符文解锁数据 */
	player_rune_unlock_data: Record<number, number>;
	player_common_first_passes: {
		[diff: string]: {
			diff: number;
			star: number;
		};
	};
	player_abyssal_first_passes: {
		[diff: string]: {
			diff: number;
			star: number;
		};
	};
	player_weapons: Record<string, {
		weapon_id: number;
		star: number;
		extra_star_exp: number;
	}>;
	player_card_lucky_choice: Record<string, {
		pool_id: number,
		lucky_choice: number,
	}>;
	//抽卡保底
	player_card_guarantees: {
		[inherit_id: string]: {
			[rarity: number]: number,
		};
	};
	info_cards: Record<string, {
		card_id: number,
		start_time: number,
		end_time: number;
	}>;
	player_shop_product_limits: Record<number, number>;
	player_achievements: Record<string, ServiceTaskInfo>;
	player_battle_passes: Record<number, {
		season: number,
		plus: boolean;
		level: number,
		extra_exp: number,
		received?: {
			plus: boolean,
			level: number,
		}[],
	}>;
	player_daily_tasks: Record<string, ServiceTaskInfo>;
	player_daily_task_box_receive_records: Record<string, {
		day: number,
		task_num: number,
	}>;
	player_weekly_tasks: Record<string, ServiceTaskInfo>;
	player_daily_bounty_tasks: Record<string, ServiceTaskInfo>;
	player_tower_rewards_preview: ServiceTowerRewardsPreview;
	player_weekly_bounty_tasks: Record<string, ServiceTaskInfo>;
	player_idle_game_data: {
		power: number;
		max_power: number;
		update_time: number;
	};
	global_idle_game_fish: {
		attributes: {
			aquarium_slot: number,
			idle_fish_normalbox_chance: number,
			idle_fish_rainbow_chance: number,
			idle_fish_total_profit: number;
		},
		effects: Record<string, number>;
	};
	player_room_rewards_preview: Record<number, {
		receive_times: number;
		rewards: RewardItem[];
	}>;
	player_unread_ids: {
		[system: string]: {
			[id: string]: boolean;
		};
	};
	player_idle_game_fishes: {
		[id: string]: {
			id: number,
			fish_item_id: number,
			is_rainbow: boolean,
			weight: number,
			fish_courier_ids?: number[],
			fish_hooks?: number[],
			fish_bait?: number,
			price: { item_id: number, amounts: number; }[];
			rod_level: number,
			show: boolean;
			get_time: number;
		};
	};
	player_idle_game_fish_fuinness_records: {
		[fish_item_id: string]: {
			fish_item_id: number,
			max_weight: number,
			first_get_time: number,
			max_weight_get_time: number;
		};
	};
	player_collection_essences: {
		[collection_essence_id: string]: {
			level: number;
			extra_exp: number;
		};
	};
	/** 玩家计数器 */
	player_counters: Record<string, {
		counter_type: string;
		count: number;
		update_time: number;
	}>;
	/** 玩家对各陈列室的点赞记录 */
	player_show_room_likes: Record<string, {
		target_uid: number;
		count: number;
		update_time: number;
	}>;
	/** 玩家简要战斗数据 */
	player_common_match_data: {
		max_diff: number,
		max_total_damage: string,
		max_damage_per_second: string,
	};
	/** 玩家简要通用数据 */
	player_common_data: {
		achievement_progress: number,
	};
	/** 玩家战斗记录 */
	player_common_match_records: {
		uid: number,
		match_id: number,
		hero_id: number,
		diff: number,
		pass: boolean,
		star: number,
		start_time: number,
		player_num: number,
		total_damage: string,
		bless: string,
		artifact: string,
	}[];
	/**陈列室数据 */
	player_show_rooms: Record<string, ShowRoomSlotData>;
	player_collection_treasures: Record<string, {
		collection_treasure_id: number,
		level: number,
		extra_exp: number,
	}>;
	player_growth_fund_activity_data: Record<string, {
		progress: number,
		received_rewards: number[],
		received: { reward_id: number; }[];
		plus: boolean,
	}>;
	player_starsea_activity_data: Record<string, {
		activity_id: number,
		step: number;
	}>;
	player_cosmetics: Record<string, {
		cosmetic_id: number,
		permanent?: number;
		expire_time?: number;
	}>;
	player_cosmetic_equips: Record<string, {
		cosmetic_id: number,
		hero_id: number;
		slot_id: number;
	}>;
	player_keys: Record<string, DungeonKeyProps>;
	player_drawings: Record<string, EquipmentDrawingProps>;
	player_auth: {
		player_session: string;
	};
	player_dragonboat_activity_data: Record<string, {
		activity_id: number;
		status: number;
		start_time: number;
		player_datas: {
			uid: number;
			is_robot: boolean;
			progress: number;
			rank: number;
		}[];
	}>;
}

/** 陈列室槽位基础数据 */
declare interface ShowRoomSlotBaseData {
	slot: number;
	id: number;
	weapon?: ShowRoomWeaponDetails;
	equipment?: ShowRoomEquipmentDetails;
	courier?: ShowRoomCourierDetails;
	cosmetic?: NetDataDeclarations["player_cosmetics"][string];
}

declare interface ShowRoomWeaponSlotData extends ShowRoomSlotBaseData {
	show_type: "weapon";
	weapon: ShowRoomWeaponDetails;
}

declare interface ShowRoomEquipmentSlotData extends ShowRoomSlotBaseData {
	show_type: "equipment";
	equipment: ShowRoomEquipmentDetails;
}

declare interface ShowRoomCourierSlotData extends ShowRoomSlotBaseData {
	show_type: "courier";
	courier: ShowRoomCourierDetails;
}

declare interface ShowRoomCosmeticSlotData extends ShowRoomSlotBaseData {
	show_type: "cosmetic";
	cosmetic: NetDataDeclarations["player_cosmetics"][string];
}

declare type ShowRoomSlotData = ShowRoomWeaponSlotData | ShowRoomEquipmentSlotData | ShowRoomCourierSlotData | ShowRoomCosmeticSlotData;

/** 陈列室物品 creation_details JSON 内容 */
declare interface ShowRoomCreationDetails {
	first_get_time: number;
	origin: string;
}

/**陈列室武器details */
declare interface ShowRoomWeaponDetails {
	uid: number;
	weapon_id: number;
	star: number;
	extra_star_exp: number;
	total_star_exp: number;
	creation_details: string;
}

/**陈列室装备details */
declare interface ShowRoomEquipmentDetails {
	equipment_item_id: number;
	level: number;
	remaining_potential: number;
	total_potential: number;
	main_entry_data: string;
	adverb_entry_data: string;
	ability_entry_data: string;
	myth_entry_data: string;
	chaos_entry_data: string;
	inlay_gems_data: string;
	drawing_entry_data: string;
	locked: boolean;
	in_check: string;
	equip_part: number;
	rarity: number;
	class: number;
	in_equip_suit: string;
	in_show_room: string;
	creation_details: string;
}

/**陈列室信使details */
declare interface ShowRoomCourierDetails {
	uid: number;
	courier_id: number;
	star: number;
	extra_star_exp: number;
	total_star_exp: number;
	equipped: boolean;
	use_func: string;
	creation_details: string;
}


declare interface PlayerDataType {
	info: {
		player_id: number, // 玩家ID
		steamID: number, // steamID
		hero_name: string, // 英雄名字
		hero_entity_index: EntityIndex, // 英雄实体index
		team_nth: number, // 队伍位置
		courier_name: string, // 信使名字
		courier_entity_index: EntityIndex, // 信使实体index
	};
	resource: {
		heart: number, // 复活次数
		gold: number, // 金币
	};
	/** 通用选择 */
	common_selection: CommonSelectionData;

	settlement: {
		item_id: number;
		amounts: number;
		item_rarity: number;
		uid?: number;
	}[];
	last_end_screen_player: LastEndScreenPlayerSnapshot;
	last_dungeon_end_progress: LastDungeonEndProgressSnapshot;
	last_dungeon_end_battle: LastDungeonEndBattleSnapshot;
	last_dungeon_end_build: LastDungeonEndBuildSnapshot;
	last_abyssal_end_summary: LastAbyssalEndSummarySnapshot;
	last_abyssal_end_battle: LastAbyssalEndBattleSnapshot;
	last_abyssal_end_build: LastAbyssalEndBuildSnapshot;
	last_end_screen_rewards: LastEndScreenRewardsSnapshot;
	last_abyssal_reward_preview: LastAbyssalRewardPreviewSnapshot;
	last_abyssal_reward_overview: LastAbyssalRewardOverviewSnapshot;
	dps: Record<string, Partial<Record<DAMAGE_TYPES, number>>>;
}

interface ShardUpgrade {
	attr: string,
	value: number;
}
declare enum UpgradeType {
	Shard,
	Scepter,
	Replace,
}

type ScepterUpgrade = string;
/** 邮件数据结构 */
declare interface MailData {
	/** 邮件ID */
	mail_id: number,
	/** 分类 */
	category: string,
	/** 标题 */
	title: string,
	/** 英文标题 */
	title_en: string,
	/** 俄语标题 */
	title_ru: string,
	/** 简短标题 */
	sub_title: string,
	/** 简短英文标题 */
	sub_title_en: string,
	/** 简短俄语标题 */
	sub_title_ru: string,
	/** 内容 */
	content: string,
	/** 英文内容 */
	content_en: string,
	/** 俄语内容 */
	content_ru: string,
	/** 开始时间 */
	// start_time: number,
	/** 过期时间 */
	expire_time: number,
	/** 奖励 */
	items: {
		item_id: string,
		amounts: number,

	}[],
	/** 状态，0：未阅读，1：已读，2：已领取，9：已删除 */
	step: number,
}
declare type CommonSelectionImageType = "custom" | "item" | "item_like" | "ability" | "ability_like";

declare interface CommonSelectionData {
	/** 名字 */
	name?: string;
	/** 描述 */
	description?: string;
	description_options?: {
		ReplaceValuesOption?: ReplaceValuesOption;
		level?: number;
	};
	/** 数值 */
	vars?: Record<string, number | string>;
	/** 数值 */
	AbilityValues?: Record<string, AbilityValueData>;
	/** 不填图标 */
	src?: string;
	/** 类型 */
	ImageType?: CommonSelectionImageType;
	/** 技能升级ID */
	AbilityUpgradeID?: string;
	/** 选项列表 */
	selections: CommonSelectionOption[];

	// 是否可以点击选项
	CardDisable?: 0 | 1;
}

declare interface CommonSelectionOption {
	index?: number;
	/** 名字 */
	name: string;
	/** 描述 */
	description?: string;
	/** 数值 */
	vars?: Record<string, string | number>;
	/** 属性 */
	attributes?: Record<string, AttributeValue>;
	/** 数值 */
	AbilityValues?: Record<string, AbilityValueData>;
	/** 不填图标 */
	src?: string;
	/** 物品名字，描述会显示物品属性 */
	itemname?: string;
	/** 类型 */
	ImageType?: CommonSelectionImageType;
	/** 是否为按钮 */
	isButton?: 0 | 1;
	/** 按钮颜色 */
	buttonColor?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
	/** 技能升级ID */
	AbilityUpgradeID?: string[];
	/** 技能升级 */
	AbilityUpgrade?: {
		type: "ABILITY_UPGRADES_TYPE_VALUE" | "ABILITY_UPGRADES_TYPE_UNIQUE";
		ability_name: string;
		operator?: "ABILITY_UPGRADES_OP_ADD" | "ABILITY_UPGRADES_OP_MUL";
		operator_value?: number;
		value_name?: string;
		value_key_name?: string;
		unique?: string;
		AbilityValues?: Record<string, number | Record<string, number>>;
		max_count?: number;
	};
	/** 回调 */
	callback?: (index: number, option: CommonSelectionOption) => void | false;

	/** 重roll */
	isReroll?: 0 | 1;
}

interface FishShopItem {
	name: string;
	cost: number[];
	limit?: number;
	src: string;
	count: number;
	cooldown: number;
	cooldownRemaining: number;
	sort: number;
}

interface FishingBagAutoSellConfig {
	rarities: number[];
	stars: number[];
	keepMinEnabled: boolean;
	keepMinCount: number;
}

interface FishingBagAutoSellRuntimeConfig extends FishingBagAutoSellConfig {
	enabled: boolean;
}

interface BrotatoShopItem {
	name: string;
	cost: number[];
	limit?: number;
	src: string;
	count: number;
	sort: number;
	costType: string;
	shopType: string;
	rarity: number;
	soldOut: boolean;
	hide: boolean;
	cooldown?: number;
	readyTime?: number;
	vars: Record<string, number>;
	overrideItem?: string;
}

interface RewardItem {
	item_id: string;
	equipment_ids: string[];
	amounts: number;
	extra_tag?: string;
}

interface ServiceTaskInfo {
	task_id: number,
	extra_id: number,
	start_time: number,
	end_time: number,
	progress: number,
	target: number,
	index: number,
	receive_progress: number;
}

interface ServiceTowerRewardsPreview {
	match_id?: number;
	total_action_chance: number; // 行动点
	base_gem_rewards: string;
	preview: string;
}
interface ServiceCourierInfo {
	courier_id: number,
	star: number,
	exp: number,
	extra_star_exp: number,
	equipped: boolean,
	assist_slot: number,
}
interface RankInfo {
	member: string,
	rank: number,
	team_extra_data?: {
		extra_data: {
			mainline_progress?: string;
			challenge_mode?: string;
			ornament_score: string;
		};
	};
	player_extra_data?: {
		[uid: string]: {
			extra_data: {
				avatar_frame: string,
				mainline_progress: string;
			};
		};
	};
}

interface LeaderboardPlayerExtraData {
	extra_data: {
		border?: string;
		invalid_avatar?: string;
		invalid_name?: string;
		title?: string;
		[x: string]: string | undefined;
	};
}

interface LeaderboardTeamExtraData {
	diff?: number | string;
	total_time?: number | string;
	mvp_uid?: number | string;
	mvp_power?: number | string;
	player_data?: Record<string, {
		hero_id?: number | string;
	}>;
}

interface LeaderboardRankData {
	team_id: string;
	rank: number;
	team_extra_data: string;
	player_extra_data: Record<string, LeaderboardPlayerExtraData>;
}

interface LeaderboardData {
	leaderboard_data: LeaderboardRankData[];
	self_data?: LeaderboardRankData;
}

interface LeaderboardFetchResponseData {
	leaderboard_datas: LeaderboardData[];
}
declare interface BackpackItemProps {
	id: number;
	name: string;
	quality: number;
	tab: number;
	use_numlimit: number;
	is_sell: number;
	sell_price: number;
	price_num: number;
	expire_type: number;
	expire_time: number;
	use_func: string;
	use_func_param_1: number;
	use_func_param_2: number;
}


interface Equipment {
	id: number, // 装备ID
	equipment_item_id: number, // 物品ID
	equip_part: number; //装备部位
	rarity: number,//稀有度
	class: number,
	level: number,
	remaining_potential: number,
	main_entry_data: string,//主词条
	adverb_entry_data: string,//副词条
	myth_entry_data: string,//神话词条,
	chaos_entry_data: string,//混沌词条
	drawing_entry_data: string, // 打造词条信息
	in_equip_suit: string,
	locked: boolean,
	in_check: string,
}

interface SimplifyEquipmentProps {
	id: number, // 装备ID
	equipment_item_id: number, // 物品ID , 读表用
	level: number,				//强化等级
	remaining_potential: number,	//潜能值
	locked: boolean,
	in_equip_suit: string,
	ability_entry_data: { id: string; }[]; //通用技能
	inlay_gems_data: string;
	in_check: string;
	//to kv
	class: number,
	equip_part: number; //装备部位
	rarity: number,//稀有度
	need_level: number,//穿戴等级 
}

interface EquipmentProps extends SimplifyEquipmentProps {
	main_entry_data: ServerEquipAttribute[],
	adverb_entry_data: ServerEquipAttribute[],
	chaos_entry_data: ServerEquipAttribute[],//混沌词条
	drawing_entry_data: ServerEquipAttribute[],
	myth_entry_data: { id: string; value: number; min: number; max: number; percent: number; }[];//神话词条
	ability_entry_data: { id: string; }[]; //通用技能
	creation_details: ShowRoomCreationDetails;// 创建信息
}

interface RecastV2OptionEntryProps {
	id: string;
	value?: string | number;
	base_value?: string | number;
	extra_value?: string | number;
	percent?: string | number;
	base_min?: string | number;
	base_max?: string | number;
}

interface RecastV2ResultProps {
	id: number;
	entry_type: number;
	entry_index: number;
	option_entry_data?: string | RecastV2OptionEntryProps[];
	options: string; // 逗号分隔的两个属性ID
}

interface SimplifyGemProps {
	id: number,
	gem_item_id: number,
	locked: boolean,
	level: number,
	//to kv
	rarity: number,
}

interface GemProps extends SimplifyGemProps {
	main_entry_data: ServerEquipAttribute[],
	adverb_entry_data: ServerEquipAttribute[],
	chaos_entry_data: ServerEquipAttribute[],//混沌词条
	myth_entry_data: { id: string; value: number; min: number; max: number; }[];//神话词条
	ability_entry_data: { id: string; }[]; //通用技能
}

interface RuneSuitPoint {
	id: string;
	value: number;
}

interface RuneEquipPosition {
	raw: string;
	hero_id: number;
	plan_id: number;
	skill_id: number;
	slot_id: number;
}

interface RuneInlayEngravingData {
	engraving_item_id?: number;
	rarity?: number;
	class?: number;
	adverb_entry_data: ServerEquipAttribute[];
}

interface RuneDevourResultProps {
	id: number;
	main_entry_data: ServerEquipAttribute[];
	adverb_entry_data: ServerEquipAttribute[];
	rune_suit_data: RuneSuitPoint[];
	replaced_target?: string;
}

interface RuneInlayResultProps {
	id: number;
	inlay_engravings_data: RuneInlayEngravingData[];
	replaced_target: string;
}

interface SimplifyRuneProps {
	id: number;
	rune_item_id: number;
	rarity: number;
	main_entry_data: ServerEquipAttribute[];
	adverb_entry_data: ServerEquipAttribute[];
	rune_suit_data: RuneSuitPoint[];
	inlay_engravings_data: RuneInlayEngravingData[];
	in_rune_equip_suit: string;
	in_rune_equip_suit_data: RuneEquipPosition[];
	locked: boolean;
	in_check: string;
}

interface SimplifyEngravingProps {
	id: number;
	engraving_item_id: number;
	rarity: number;
	class: number;
	adverb_entry_data: ServerEquipAttribute[];
	locked: boolean;
	creation_details?: ShowRoomCreationDetails;
}

interface DungeonKeyProps {
	id: number;
	key_item_id: number;
	rarity: number;
	intensity: number;
	durability: number;
	origin_durability: number;
	level: number;
	main_entry_data: string;
	adverb_entry_data: string;
	locked: boolean;
	extra_exp?: number;
}
interface EquipmentDrawingProps {
	id: number;
	drawing_item_id: number;
	rarity: number;
	drawing_part: number;
	level: number;
	main_entry_data: string;
	drawing_entry_data: string;
	locked: boolean;
}

interface ServerEquipAttribute {
	id: string;
	percent?: number,
	base_min?: number,
	base_max?: number,
	//白字部分
	base_value: number;
	extra_value?: string | number;
	//总和
	value: number;
}

interface PlayerBlessData {
	name: string;
	rarity: number;
	up?: boolean;
}

interface PlayerBlessUpgradeOption extends PlayerBlessData {
	canUpgrade: boolean;
	maxLevel: number;

	upgradeLevel: number;
}

interface PlayerBlessSelect {
	options: PlayerBlessData[];
	free_refresh_count: number;
	pay_refresh_count: number;
	allin_count: number;
	give_up: boolean;
	draw_count: number;
}

interface PlayerArtifactData {
	name: string;
	rarity: number;
}

interface PlayerArtifactSelect {
	options: PlayerArtifactData[];
	refresh_count: number;
	allin_count: number;
	give_up: boolean;
	draw_count: number;
}

interface PlayerAccountLevel {
	level: number;
	extra_exp: number;
}

interface AccountRewardsReceiveRecord {
	account_type: AccountLevelType;
	level: number;
}

/**
 * 单个外部属性数据
 * 包含属性、特权、神话词条、技能等
 */
interface OutsideAttribute {
	/** 基础属性值 */
	attributes?: Record<string, number>;
	/** 特权效果 */
	effects?: Record<string, number>;
	/** 神话词条 */
	myth?: Record<string, number>;
	/** 信使技能数据 */
	skills?: Record<string, number>;
	/** 天赋 */
	ability_upgrade?: Record<string, number>;
}

/**
 * 外部属性映射表
 * 键为属性名称（如 "global_blessing"），值为 OutsideAttribute
 */
type OutsideAttributeMap = Record<string, OutsideAttribute>;

type OutsideAbilityAttribute = {
	/** Rune Attributes */
	hero_skill_rune: {
		attributes?: Record<string, number>;
		effects?: Record<string, number>;
	};

};

/** Record<AbilityId, data> */
type OutsideAbilityAttributeMap = Record<string, {
	data: OutsideAbilityAttribute;
}>;
