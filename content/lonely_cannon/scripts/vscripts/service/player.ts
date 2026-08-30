import { reloadable } from "../lib/tstl-utils";

/** 道具类型，与前端 PropType 保持同步 */
const enum ServicePropType {
	Token = 1,
	Collection = 4,
}

type HeroVoiceType = "schinese" | "english" | "russian";

/** 玩家后端数据 */
@reloadable
class CPlayerData extends CModule {
	/** 默认信使ID */
	DEFAULT_COURIER_ID = "600001";
	playerShowRooms: Record<number, Record<string, any>>;
	heroVoiceTypes: Partial<Record<PlayerID, HeroVoiceType>>;
	init(reload: boolean): void {
		if (!reload) {
			this.playerShowRooms = {};
		}
		this.heroVoiceTypes ??= {};

		RequestEvent("like_show_room", (event) => {
			return this.LikeShowRoom(event.PlayerID, event.target_player_id, event.target_uid);
		});

		RequestEvent("get_player_info", (event) => {
			return this.GetPlayerInfo(event);
		});

		RequestEvent("leaderboard_mock_fetch", (event) => {
			return this.GetMockLeaderboardData(event);
		});

		RequestEvent("player_unread_read", (event) => {
			const result = CommonService.CallActionSync("/v1/equip/read", event.PlayerID, {
				system: event.system,
				ids: event.ids,
			}, { ignoreInvalidResponse: false, commonCallback: false, showAddItems: false });

			if (result.code == 0 || result.code == 200) {
				const unreadPatch: Record<string, Record<string, "nil">> = {};
				unreadPatch[event.system] = {};

				for (const [_, id] of ipairs(event.ids)) {
					unreadPatch[event.system][tostring(id)] = "nil";
				}

				CommonService.SetPlayerServiceNetData(event.PlayerID, "player_unread_ids", unreadPatch as any);
			}

			return {
				code: result.code ?? -1,
				message: result.message,
			};
		});
	}

	SetHeroVoiceType(playerID: PlayerID, value: unknown) {
		if (value === "schinese" || value === "english" || value === "russian") {
			this.heroVoiceTypes[playerID] = value;
		}
	}

	GetHeroVoiceType(playerID: PlayerID): HeroVoiceType {
		const voiceType = this.heroVoiceTypes[playerID];
		if (voiceType != undefined) {
			return voiceType;
		}
		const language = Convars.GetStr("cl_language");
		return language == "schinese" || language == "russian" ? language : "english";
	}

	private GetMockLeaderboardData(event: ServerRequestParams<"leaderboard_mock_fetch">) {
		const itemCount = 21;
		const baseSteamID = 256964371;
		const playerNum = event.leaderboard_type == "common_match_hero"
			? 1
			: math.min(4, math.max(1, math.floor(toFiniteNumber(event.player_num, 1))));
		const heroIDs = [224, 225, 226, 227];
		const leaderboardData: LeaderboardRankData[] = [];

		const createRankData = (rank: number): LeaderboardRankData => {
			const playerExtraData: Record<string, LeaderboardPlayerExtraData> = {};
			const playerData: NonNullable<LeaderboardTeamExtraData["player_data"]> = {};
			let firstPlayerID = "";

			for (let playerIndex = 0; playerIndex < playerNum; playerIndex++) {
				const steamID = baseSteamID + (rank - 1) * playerNum + playerIndex;
				const playerID = tostring(steamID);
				const heroID = event.hero_id ?? heroIDs[(rank + playerIndex - 1) % heroIDs.length];
				if (firstPlayerID == "") {
					firstPlayerID = playerID;
				}
				playerExtraData[playerID] = {
					extra_data: {
						border: "1710000",
						invalid_avatar: "",
						invalid_name: "",
						title: "1711001",
					},
				};
				playerData[playerID] = { hero_id: heroID };
			}

			const teamExtraData: LeaderboardTeamExtraData = {
				diff: (rank - 1) % 11 + 1,
				total_time: 60 + rank * 7 + playerNum * 3,
				mvp_uid: firstPlayerID,
				mvp_power: tostring(100000 + rank * 1000),
				player_data: playerData,
			};

			return {
				team_id: firstPlayerID,
				rank,
				team_extra_data: json.encode(teamExtraData),
				player_extra_data: playerExtraData,
			};
		};

		for (let rank = 1; rank <= itemCount; rank++) {
			if (rank >= event.start && rank <= event.end) {
				leaderboardData.push(createRankData(rank));
			}
		}

		return {
			code: 0,
			data: {
				leaderboard_datas: [{
					leaderboard_data: leaderboardData,
					self_data: createRankData(itemCount),
				}],
			},
		};
	}

	private GetShortSteamID(event: { steamID?: number | string; steam64ID?: number | string; playerID?: PlayerID; }): number | undefined {
		if (event.steamID != undefined) {
			const steamID = toFiniteNumber(event.steamID, 0);
			if (steamID > 0) {
				return steamID;
			}
		}
		if (event.steam64ID != undefined) {
			const steam64Text = tostring(event.steam64ID);
			const steamID = toFiniteNumber(string.sub(steam64Text, 5), 0) - 1197960265728;
			if (steamID > 0) {
				return steamID;
			}
		}
		if (event.playerID != undefined && PlayerResource.IsValidPlayerID(event.playerID)) {
			return PlayerResource.GetSteamAccountID(event.playerID);
		}
		return undefined;
	}

	GetPlayerInfo(event: ServerRequestParams<"get_player_info">) {
		const targetUID = this.GetShortSteamID(event);
		if (targetUID == undefined || targetUID <= 0) {
			return { code: -1, message: "invalid steam id" };
		}

		const briefResult = CommonService.CallActionSync("/v1/brief/get_data", event.PlayerID, {
			target_uid: targetUID,
		}, {
			ignoreInvalidResponse: false,
			commonCallback: false,
			showAddItems: false,
		});
		if (briefResult.code != 0 && briefResult.code != 200) {
			return { code: briefResult.code ?? -1, message: briefResult.message, steamID: targetUID };
		}

		const showRoomResult = CommonService.CallActionSync("/v1/brief/show_room", event.PlayerID, {
			target_uid: targetUID,
		}, {
			ignoreInvalidResponse: false,
			commonCallback: false,
			showAddItems: false,
		});
		if (showRoomResult.code != 0 && showRoomResult.code != 200) {
			return { code: showRoomResult.code ?? -1, message: showRoomResult.message, steamID: targetUID };
		}
		const briefResultData: Record<string, any> = briefResult.data ?? {};
		const showRoomResultData: Record<string, any> = showRoomResult.data ?? {};
		const hasWrappedShowRoomData = showRoomResultData.player_show_rooms != undefined;
		const showRoomPlayerKeyValues = showRoomResultData.player_key_values;
		const showRoomPlayerCounters = showRoomResultData.player_counters;
		const hasShowRoomMetadata = showRoomPlayerKeyValues != undefined || showRoomPlayerCounters != undefined;
		const showRoomData = hasWrappedShowRoomData
			? showRoomResultData.player_show_rooms
			: hasShowRoomMetadata ? {} : showRoomResultData;
		const mergedPlayerCounters: Record<string, any> = {};
		if (showRoomPlayerCounters != undefined) {
			for (const counter of Object.values(briefResultData.player_counters ?? {}) as Array<{ counter_type?: string | number; }>) {
				if (counter?.counter_type != undefined) {
					mergedPlayerCounters[tostring(counter.counter_type)] = counter;
				}
			}
			for (const counter of Object.values(showRoomPlayerCounters) as Array<{ counter_type?: string | number; }>) {
				if (counter?.counter_type != undefined) {
					mergedPlayerCounters[tostring(counter.counter_type)] = counter;
				}
			}
		}

		return {
			code: 0,
			steamID: targetUID,
			data: {
				...briefResultData,
				...(hasWrappedShowRoomData ? showRoomResultData : {}),
				...(showRoomPlayerKeyValues != undefined ? { player_key_values: showRoomPlayerKeyValues } : {}),
				...(showRoomPlayerCounters != undefined ? { player_counters: mergedPlayerCounters } : {}),
				player_show_rooms: showRoomData,
			},
		};
	}

	LikeShowRoom(playerID: PlayerID, targetPlayerID: PlayerID | undefined, targetUID: number) {
		if (targetUID <= 0 || PlayerResource.GetSteamAccountID(playerID) == targetUID) {
			return { code: -1 };
		}

		const result = CommonService.CallActionSync("/v1/brief/like_show_room", playerID, {
			target_uid: targetUID,
		}, {
			ignoreInvalidResponse: false,
			commonCallback: false,
			showAddItems: false,
		});
		if (result.code != 0 && result.code != 200) {
			return { code: result.code ?? -1, message: result.message };
		}
		CommonService.CommonCallback(playerID, result, false);

		if (targetPlayerID != undefined && PlayerResource.IsValidPlayerID(targetPlayerID)) {
			const counters = CommonService.GetPlayerServiceNetTable(targetPlayerID, "player_counters") ?? {};
			const counterType = "show_room_liked_total";
			const currentCounter = counters[counterType];
			CommonService.SetPlayerServiceNetData(targetPlayerID, "player_counters", {
				[counterType]: {
					counter_type: counterType,
					count: (currentCounter?.count ?? 0) + 1,
					update_time: currentCounter?.update_time ?? 0,
				},
			});
		}
		return { code: result.code };
	}
	/**
	 * 获取玩家当前装备的信使ID
	 * @param playerID 玩家ID
	 * @returns 信使ID
	 */
	GetEquippedCourier(playerID: PlayerID): { id: string, star: number; } {
		const playerCouriers = CommonService.GetPlayerServiceNetTable(playerID, "player_couriers");
		if (playerCouriers != undefined) {
			for (const [courierId, courierData] of pairs(playerCouriers)) {
				if (courierData.equipped == true) {
					return { id: courierId, star: courierData.star };;
				}
			}
		}
		return { id: this.DEFAULT_COURIER_ID, star: 1 };
	}

	GetCourierStar(playerID: PlayerID, courierId: string): number {
		const playerCouriers = CommonService.GetPlayerServiceNetTable(playerID, "player_couriers");
		if (playerCouriers == undefined) {
			return 0;
		}
		return playerCouriers[courierId]?.star ?? 0;
	}

	GetTotalCourierStar(playerID: PlayerID): number {
		const playerCouriers = CommonService.GetPlayerServiceNetTable(playerID, "player_couriers");
		if (playerCouriers == undefined) {
			return 0;
		}

		let totalStar = 0;
		for (const [_, courierData] of pairs(playerCouriers)) {
			if (courierData == undefined) {
				continue;
			}
			totalStar += courierData.star ?? 0;
		}
		return totalStar;
	}


	/** 获取玩家服务端道具数量，支持货币(Token)和藏品(Collection) */
	GetServiceItemCount(playerID: PlayerID, id: string | number): number {
		id = tostring(id);
		const propType = tonumber(GetItemPropType(id));
		if (propType == ServicePropType.Token) {
			const playerTokens = CommonService.GetPlayerServiceNetTable(playerID, "player_tokens");
			if (playerTokens == undefined) {
				return 0;
			}
			return playerTokens[id]?.amounts ?? 0;
		} else if (propType == ServicePropType.Collection) {
			const props = CommonService.GetPlayerServiceNetTable(playerID, "player_props");
			if (props == undefined) {
				return 0;
			}
			let sum = 0;
			for (const [_, propData] of pairs(props)) {
				if (propData == undefined) {
					continue;
				}
				if (propData.prop_id == tonumber(id)) {
					sum += propData.amounts ?? 0;
				}
			}
			return sum;
		}
		return 0;
	}

	/** 预先扣除服务端道具缓存，避免远端购买请求返回前重复消费同一份库存。 */
	TryPreDeductServiceItem(playerID: PlayerID, id: string | number, count: number): boolean {
		id = tostring(id);
		const costCount = math.floor(toFiniteNumber(count, 0));
		if (costCount <= 0) {
			return true;
		}

		const propType = tonumber(GetItemPropType(id));
		if (propType == ServicePropType.Token) {
			const playerTokens = CommonService.GetPlayerServiceNetTable(playerID, "player_tokens");
			if (playerTokens == undefined) {
				return false;
			}

			const tokenData = playerTokens[id];
			const currentAmount = toFiniteNumber(tokenData?.amounts, 0);
			if (tokenData == undefined || currentAmount < costCount) {
				return false;
			}

			tokenData.amounts = currentAmount - costCount;
			const nextTokens: Record<string, any> = {};
			nextTokens[id] = tokenData;
			CommonService.SetPlayerServiceNetData(playerID, "player_tokens", nextTokens);
			return true;
		}

		return false;
	}

	DealShowRoomData(playerID: PlayerID, data: any) {
		this.playerShowRooms[playerID] ??= {};
		for (const [k, v] of pairs(data)) {
			const key = `${v.show_type}-${v.slot}`;
			if (v.id === 0) {
				this.playerShowRooms[playerID][key] = "nil";
			} else {
				let parsed: any = {};
				if (v.details && typeof v.details === "string") {
					parsed = json.decode(v.details)[0] ?? {};
				}
				this.playerShowRooms[playerID][key] = {
					show_type: v.show_type,
					slot: v.slot,
					id: v.id,
					[v.show_type]: parsed,
				};
			}
		}
		CommonService.SetPlayerServiceNetData(playerID, "player_show_rooms", this.playerShowRooms[playerID]);
	}

}

declare global {
	var PlayerData: CPlayerData;
}
PlayerData ??= new CPlayerData();
