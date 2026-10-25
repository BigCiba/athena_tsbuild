declare interface UpperNotificationData extends NotificationData {
	type?: "Normal" | "Warning";
	title?: string;
	override?: 0 | 1;
}
declare interface NotificationData {
	message: string;
	message_duration?: number;
	player_id?: PlayerID;
	player_id2?: PlayerID;
	teamnumber?: DOTATeam_t;
	team_only?: 0 | 1;
	panorama_class?: "CombatIconBase" | "CombatIconReward" | "CombatIconFishing" | "CombatIconWeapon" | string;
	[x: string]: any;
}
declare interface NotificationHelpData {
	/** 文本 */
	sText: string;
	/** 技能名列表 */
	tAbilities?: Table;
	/** 物品名列表 */
	tItems?: Table;
	/** 图片路径列表 */
	tImages?: Table;
	/** 顶层添加的样式 */
	sPanoramaClass?: Table;
	/** 可选对话显示持续时间，默认5秒 */
	flDuration?: number;
	/** 面板ID，重复ID会覆盖 */
	sPanelID: string;
	/** 绑定的面板ID，不填就是绝对位置 */
	sBindPanelID: string;
	/** 出现的绝对位置比如：135,224TODO:填百分比等功能 */
	sPosition?: string;
	/** 出现的位置比如：left，默认为top */
	sDirection: string;
	[x: string]: any;
}
declare interface CustomGameEventDeclarations {
	athena_shop_action: AthenaShopAction;
	athena_shop_result: AthenaShopResult;
	npc_interact: { npc: EntityIndex; runId: number; };
	task_remove: { taskname: string; runId: number; };
	task_mark: { taskname: string; runId: number; };
	task_claim: { taskname: string; runId: number; };
	task_dialog: { npc: EntityIndex; text: string; runId: number; };
	athena_game_action: AthenaGameAction;
	DemoEvent: {
		event_name: string,
		player_id: PlayerID,
		unit: EntityIndex,
		position: [number, number, number],
		str: string,
		[x: string]: any,
	};
	/** 切换暂停 */
	CustomTogglePause: {};
	/** 请求事件 */
	server_request_event: {
		event: string,
		data: string,
		queueIndex: string,
	};
	/** 请求事件结果 */
	server_request_event_result: {
		result: string,
		queueIndex: string,
		maxStep: number,
		nowStep: number,
	};
	/** 取消请求事件 */
	cancel_server_request_event: {
		queueIndex: string,
	};

	/** notification相关事件 */
	notification_upper: UpperNotificationData;
	notification_combat: NotificationData;
	notification_chat_line: NotificationData;
	notification_help: NotificationHelpData;
	notification_close_help: { sPanelID: string; };

	/** UI调用接口 */
	call_action: { actionName: keyof ServiceActionConfig, params: string; };

	/** 获得道具 */
	ReceiveRewards: { json: string;[x: string]: any; };
	/** 局内文字提示 */
	ReceiveGameplayText: { text: string; message?: string;[x: string]: any; };

	/** 地牢房间完成（包含下一房间索引） */
	dungeon_room_complete_detail: {
		room_id: number;
		next_room_index: number;
	};

	error_message: {
		message: string,
		sound: string,
		vars?: Record<string, string | number>;
	};
	/** lua服务器发送事件到客户端 */
	lua_server_to_client: {
		event_name: string,
		data: string,
	};

	/** 自定义网表 */
	request_net_data: { id: string, key: keyof NetDataDeclarations, bindPlayerID?: PlayerID; };
	/** 自定义网表数据流 */
	net_data_stream: {
		/** 网表的key */
		key: string,
		/** 标记 */
		id: string,
		/** 拆分数据的第几段 */
		step: number,
		/** 数据流 */
		data: string,
		/** 这个数据流的所属玩家ID */
		bindPlayerID: PlayerID,
		/** 是否最后一段数据 */
		done?: 0 | 1;
		/** 是否数据作废 */
		deleted?: boolean;
		/** 是否覆盖数据 */
		override?: boolean;
	};
	login_use_cdkey: { cdkey: string; };
	login_retry_white_list: {};


	key_pressed: { key: string; position: [number, number, number] | null, entIndex: EntityIndex; };
	key_released: { key: string; position: [number, number, number] | null, entIndex: EntityIndex; };
	update_keybind: { func: string; key: string; isGamepad: boolean; };

	boss_camera_intro: {
		targetEntIndex: EntityIndex;
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
	camera_follow_target: {
		targetEntIndex: EntityIndex;
		heightOffset?: number;
	};
	camera_follow_position: {
		x: number;
		y: number;
		z?: number;
		distance?: number;
		yaw?: number;
		pitch?: number;
		lockPitch?: boolean;
		transitionDuration?: number;
	};
	camera_follow_hero: {
		transitionDuration?: number;
		x?: number;
		y?: number;
		z?: number;
	};

	fake_cosmetic_preview_enter: {
		playerID: PlayerID;
		heroName: string;
	};
	fake_cosmetic_preview_leave: {
		playerID: PlayerID;
	};
	fake_cosmetic_preview_cosmetic: {
		playerID: PlayerID;
		cosmeticID: number;
	};

	toggle_window_tag: {
		window_name: string,  // 是要跳转的窗口， MenuButton_ + 菜单名，
		menu?: string;		  // 是要跳转的菜单（如果有的话）
		menu2?: string,		  // 是要跳转的菜单2（如果有的话）
		force?: boolean,	  // 是是否强制跳转（如果为true则无论当前窗口状态如何都会跳转并打开窗口）
	};

	//********************************************************************************
	// 以上是框架通用事件，以下是各个项目自定义事件
	//********************************************************************************

	select_hero: { heroName: string; };
	select_upgrade: { upgrade_id: string; };
	select_upgrade_all: { upgrade_id: string; };
	select_upgrade_allin: {};
	select_bless: { blessName?: string; };
	select_bless_refresh: { type: string; };
	update_guaranteed_bless_suit: { suit: string; };
	select_bless_upgrade: { blessName: string; };
	select_bless_upgrade_allin: {};
	select_artifact_upgrade: { artifactName: string; artifactLevel: number; };
	select_upgrade_refresh: { type: string; };
	select_bless_allin: {};
	select_artifact: { artifactName?: string; };
	select_artifact_refresh: {};
	select_artifact_allin: {};
	select_privilege_reward: { itemName: string; };
	// 地牢系统事件
	dungeon_room_complete: { roomID: number; };
	dungeon_boss_defeated: { zone: number; };
	dungeon_end: {};
	dungeon_interact: { PlayerID: PlayerID; };

	cast_on_position: { abilityIndex: number; showEffects?: boolean; dotaunitorder_t?: number; };

	payment_on_close_popup: {
		status: 0 | 1,
		order_ids: string[],
	};

	/** 支付订单的结果 */
	payment_success: {
		order_id: string;
	};
	restart_game: { result?: "accepted" | "rejected"; };
	/** 模式准备与难度选择 */
	game_mode_prepare_response: { result: "accepted" | "rejected"; };
	team_request_response: { requestId?: string; result: "accepted" | "rejected"; };
	game_mode_select_difficulty: { difficulty: number; };
	game_mode_confirm_difficulty: { difficulty: number; };
	game_mode_cancel_selection: {};
	/** 使用钥匙 */
	use_key: { key: number; };
	dungeon_start_wait_cancel: {};
	receive_abyssal_rewards: { box_type: AbyssalRewardBoxType; };
	abyssal_summary_ready: {};
	battle_gem_receive_rewards: {
		actions: string;// {row: number;column: number;}[] 的json字符串
	};
	battle_gem_buy_actions: {
		buy_product: boolean;
	};
	abyssal_rewards_claim_failed: { box_type: AbyssalRewardBoxType; message?: string; };
	/** 钓鱼操作同步(每秒同步一次, 每秒60帧) */
	update_fishing_operate: {
		operate_seqs: string;
		bag_index: number;
		unique: string;
		finish?: boolean;
	};
	/** 钓鱼交互 */
	fishing_interactive: {
		state: 0 | 1 | 2;	// 0: 停止钓鱼, 1: 开始钓鱼, 2: 收杆
		extra_data?: number;
	};
	/** 蓄力甩杆 */
	throw_hook: {
		power: number; // 0 ~ 100
	};
	/** 钓鱼系统鱼的动作序列同步 */
	fishing_action_seq_sync: {
		action_seqs: string;
		step: number;
		unique: string;
	};
	/** 客户端请求钓鱼动作序列 */
	request_fishing_action_seq: {
		step: number;
	};
	/** 更新钓鱼装备配置 */
	fish_item_update_loadout: {
		fish_bait: number;
		fish_hooks: number[];
		fish_courier_ids: number[];
		times: 1;
	};
	/** 切换鱼竿 */
	fish_item_change_rod: {
		target_level: number;
	};
	/** 钓鱼结果 */
	fishing_result: {
		fish_name: string;
		fish_type: FishType;
		player_id: PlayerID;
		pos: string;
	};
	/** 钓鱼奖励 */
	fishing_reward: {
		fish_rewards: string; // json { item_id: number, amounts: number }[]
		box_rewards: string; // json { item_id: number, amounts: number }[]
		fish_price: string; // json { item_id: number, amounts: number }[]
		fish_id: string;
		fish_type: FishType;
		fish_weight?: number;
		fish_count: number;
		box_count: number;
		box_type: string;
	};
	/** 下次钓鱼冷却时间 */
	fishing_cooldown: {
		next_time: number;	//Game time
	};
	/** 重置伤害统计 */
	reset_damage_counter: {};
	/** 复活币选择（客户端→服务端） */
	revive_coin_choice: { use: 0 | 1; requestId?: string; };
	revive_coin_purchase_choice: { buy: 0 | 1; requestId?: string; };
	ShowPlaceName: {
		text: string,
		duration: number,
	};
	/** 教学顶部提示 */
	tutorial_upper_tip: TutorialUpperData;
	/** 关闭教学顶部提示 */
	tutorial_upper_close: { unique: number; };
	/** 教学预设事件 */
	tutorial_dungeon_start: { state: 0 | 1; };
	/** 玩家选择订单是否支付 */
	order_pay_choice: {
		state: 0 | 1;
		unique: string;
	};
	/** 订单成功 */
	order_payed: {
		state: 0 | 1;
		p_id: number;
		count: number;
		unique: string;
	};
	/** 订单支付方式历史记录 */
	order_payway_history: {
		key: string,
	};
	/** 跳过教程 */
	tutorial_abandon: {};

	active_scan: {};
	active_glyph: {};
	next_round: {};
}

declare interface GameEventDeclarations {
	cl_script_reload: {};
	pui_error_msg: { error: string; };
	trigger_start_touch: { trigger_name: string, activator_entindex: EntityIndex, caller_entindex: EntityIndex; };
	trigger_end_touch: { trigger_name: string, activator_entindex: EntityIndex, caller_entindex: EntityIndex; };
	send_command_unique_suffix: { str: string; };
	custom_entity_removed: { entindex: EntityIndex; };
	custom_npc_first_spawned: { entindex: EntityIndex; };
	client_side_event: { event_name: string, event_data: any; };
	client_request_event: { event: string, data: string, queueIndex?: string; };
	custom_ability_key_event: { event_name: string, phase: number; };

	/** 阶段切换 */
	custom_game_state_change: { state_name: string, life_cycle: "Start" | "End"; };
	call_lua_client_action: { func_name: string, json: string; };
	custom_command_unique: { command: string, unique: string; };
	/** 切换UI窗口 */
	custom_ui_toggle_windows: { windowName: string, state?: 0 | 1, data?: any; };
	wait_scene_entity_load: { name: string, key: string, data?: string; };
	lua_server_to_client: { event_name: string, data: string; };
	/**
	 * 伤害特效
	 */
	custom_damage_msg: {
		/** 使用 | 分隔记录、: 分隔字段的批量伤害数字。 */
		data: string,
	};
	/** 假人伤害统计使用的原始伤害。 */
	dummy_damage_record: {
		victim: EntityIndex;
		ability_name: string;
		damage: string;
	};
}

type CommunityLanguage = "zh" | "en" | "ru";
type CommunityGuideTag = "basics" | "advanced" | "heroes" | "meta";
type CommunityFeedbackType = "bug" | "suggestion" | "other";
type CommunityWeeklyRewardState = "available" | "received";

interface CommunityBannerData {
	id: number | string;
	priority: number;
	title: string | null;
	link: string | null;
	imageUrl: string | null;
}

interface CommunityContentData {
	id: number | string;
	priority: number;
	publishedAt: string | null;
	title: string | null;
	link: string | null;
	coverImageUrl: string | null;
}

interface CommunityHomeData {
	banners: CommunityBannerData[];
	homeContents: CommunityContentData[];
	notices: CommunityContentData[];
}

declare interface ServerRequestEventDeclarations {
	measure_ping: {
		params: {};
		results: {};
	};
	community_refresh: {
		params: {
			lang: CommunityLanguage;
		};
		results: {
			ok: boolean;
			data: CommunityHomeData;
			message?: string;
		};
	};
	community_contents: {
		params: {
			lang: CommunityLanguage;
			tag: CommunityGuideTag;
		};
		results: {
			ok: boolean;
			contents: CommunityContentData[];
			message?: string;
		};
	};
	community_weekly_status: {
		params: {};
		results: {
			ok: boolean;
			state?: CommunityWeeklyRewardState;
			message?: string;
		};
	};
	community_claim_weekly: {
		params: {};
		results: {
			ok: boolean;
			state?: CommunityWeeklyRewardState;
			retryAfter?: number;
			message?: string;
		};
	};
	community_submit_feedback: {
		params: {
			type: CommunityFeedbackType;
			content: string;
		};
		results: {
			ok: boolean;
			message?: string;
		};
	};
	community_set_test_url: {
		params: {
			useOnline: boolean;
		};
		results: {
			ok: boolean;
			useOnline: boolean;
			url: string;
			message?: string;
		};
	};
	leaderboard_mock_fetch: {
		params: {
			leaderboard_type: "common_match" | "common_match_hero";
			player_num: number;
			hero_id?: number;
			start: number;
			end: number;
		};
		results: {
			code: number;
			data: LeaderboardFetchResponseData;
		};
	};
	call_action_request: {
		params: {
			action: keyof ServiceActionConfig,
			action_params: any,
			showAddItems: boolean,
		},
		results: {};
	};
	break_equipment: {
		params: {
			ids: number[];
		};
		results: {
			code: number;
			message?: string;
			data: Record<string, any>;
		};
	};
	player_unread_read: {
		params: {
			system: "equipment" | "gem" | "rune" | "engraving" | "prop" | "cosmetic" | "key" | "drawing",
			ids: number[],
		},
		results: {
			code: number,
			message?: string,
		};
	};
	like_show_room: {
		params: {
			target_player_id?: PlayerID,
			target_uid: number,
		},
		results: {
			code: number,
			message?: string,
		};
	};
	get_player_info: {
		params: {
			steamID?: number | string,
			steam64ID?: number | string,
			playerID?: PlayerID,
		},
		results: {
			code: number,
			message?: string,
			steamID?: number,
			data?: any,
		};
	};
	select_upgrade: {
		params: {
			upgradeID: string;
		};
		results: {};
	};
	product_buy: {
		params: {
			product_id: number,
			amounts: number,
		},
		results: {
			status: number,
			msg?: string,
		};
	};
	order_create: {
		params: {
			/** 订单页面上的标题 */
			title: string;
			/** 订单页面上的描述 */
			body: string;
			/** 商品ID */
			product_id: number;
			/** 商品数量 */
			product_num: number;
			/** 支付类型 */
			pay_type?: PaymentType;
			/** passion用的 */
			p_mid?: string;
			/** 地区 */
			country?: string;
			/** 唯一标识 */
			unique: string;
			/** 快速 */
			fast?: 0 | 1;
		},
		results: {
			status: number,
			data: {
				order_id: string,
				order_link: string,
			};
		};
	};

	//获取存档装备详情
	get_rune_detail: {
		params: {
			id: string,
		},
		results: Record<string, SimplifyRuneProps>;
	};

	get_engraving_detail: {
		params: {
			id: string,
		},
		results: Record<string, SimplifyEngravingProps>;
	};

	//获取存档装备详情
	get_equip_detail: {
		params: {
			id: string[],
		},
		results: Record<string, EquipmentProps>;
	};

	get_gem_detail: {
		params: {
			id: string[],
		},
		results: Record<string, GemProps>;
	};

	filter_gems: {
		params: {
			main: string[],
			include: string[],
			exclude: string[],
		},
		results: {
			ids: number[],
		};
	};

	/** 抽卡 */
	draw_card: {
		params: {
			count: number,
			id: number,
		},
		results: {
			code: number,
			items_list: {
				item_id: number,
				amounts: number,
				item_rarity: number,
				draw_card_rarity: number,
				origin_item_id?: number,
			}[];
		};
	};
	/**修改心愿单 */
	change_lucky_choice: {
		params: {
			pool_id: number,
			lucky_choice: number;
		};
		results: {};
	};
}


declare interface ClientRequestEventDeclarations {
	register_key_event: {
		params: {
			key_name: string,
		},
		results: {
			unique_name: string,
			event_name: string,
		};
	};
	unregister_key_event: {
		params: {
			event_name: string,
		},
		results: {
			success: boolean,
		};
	};
	register_ability_key_event: {
		params: {
			slot: number,
			key_name: string,
			quick_cast: boolean,
		},
		results: {
			event_name: string,
		};
	};
	unregister_ability_key_event: {
		params: {
			event_name: string,
		},
		results: {
			success: boolean,
		};
	};
	get_camera_entity: {
		params: {
			position: [number, number, number];
		},
		results: {
			entindex: EntityIndex,
		};
	};
	call_lua_client_function: {
		params: {
			func_name: string,
			args_json: string,
		},
		results: {
			value: any,
		};
	};
	/* 客户端网络请求 */
	get_iso_code: {
		params: {
			uid: string,
			response_key: string,
		},
		results: {};
	};
	get_fish_ent: {
		params: {
		},
		results: {
			entindex: EntityIndex,
			fishEntList: Record<string, EntityIndex>,
		};
	};
}

/** Scene场景加载完成数据 */
declare interface SceneEntityLoadData {
	portraits_full_body_loadout: {
		unitname: string;
		camera?: string;
	};
	portraits_mvp: {
		unitname: string;
	};
	courier: {
		id: number,
		scale?: number,
		camera?: string,
	};
	fish: {
		fish_name: string,
		scale?: number,
		camera?: string,
	};
	athena: {
		skin_id?: string;
		base_id?: string;
	};
	weapon_3d_preview: {
		model: string;
		default_config: string;
	};
	fish_rod_preview: {
		model: string;
	};
	fish_3d_preview: {
		fishID: string;
	};
	hero_preview: {
		heroName?: string;
		bodyGroup?: string;
		bodyGroupChoice?: number;
	};
}
