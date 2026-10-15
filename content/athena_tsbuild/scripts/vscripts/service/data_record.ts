import { reloadable } from "../lib/tstl-utils";

/** 数据埋点 */
@reloadable
class CDataRecord extends CModule {
	/** 每局清空的玩家数据 */
	playerMatchData: Record<number, Record<string, string | number>> = {};
	/** 每局清空的数据 */
	globalMatchData: Record<string, string | number> = {};
	/** 不清空的玩家数据 */
	playerData: Record<number, Record<string, string | number>> = {};
	/** 不清空的数据 */
	globalData: Record<string, string | number> = {};
	/** 清理本局埋点，保留账号和会话累计数据。 */
	reset(): void { this.playerMatchData = {}; this.globalMatchData = {}; }
	init(reload: boolean): void {
		if (!reload) {
			Event.Register("game_start", () => {
				this.reset();
			});
			Event.Register("damage_event", (params) => {
				if (params.target.IsRealHero() && params.damage > 0 && params.attacker != params.target) {
					this.RecordMatchData("HitCount", 1, "add");
				}
			});
		}
	}
	/** 记录玩家数据 */
	RecordPlayerMatchData<K extends keyof PlayerDataRecord, T extends PlayerDataRecord[K]>(playerID: PlayerID, key: K, value: T, method: "add" | "set" = "add") {
		this.playerMatchData[playerID] ??= {};
		if (method == "add" && typeof value == "number") {
			this.playerMatchData[playerID][key] = ((this.playerMatchData[playerID][key] ?? 0) as number) + (value as number);
		} else if (method == "set") {
			this.playerMatchData[playerID][key] = value;
		}
	}

	/** 获取玩家数据（每局清空） */
	GetPlayerMatchData<K extends keyof PlayerDataRecord>(playerID: PlayerID, key: K): PlayerDataRecord[K] | undefined;
	GetPlayerMatchData<K extends keyof PlayerDataRecord>(playerID: PlayerID, key: K, defaultVar: PlayerDataRecord[K]): PlayerDataRecord[K];
	GetPlayerMatchData(playerID: PlayerID, key: any, defaultVar?: any) {
		const val = this.playerMatchData[playerID]?.[key];
		return (val !== undefined ? val : defaultVar) as any;
	}
	/** 记录全局数据 */
	RecordMatchData<K extends keyof DataRecord, T extends DataRecord[K]>(key: K, value: T, method: "add" | "set" = "add") {
		if (method == "add" && typeof value == "number") {
			this.globalMatchData[key] = ((this.globalMatchData[key] ?? 0) as number) + (value as number);
		} else if (method == "set") {
			this.globalMatchData[key] = value;
		}
	}

	/** 获取全局数据（每局清空） */
	GetMatchData<K extends keyof DataRecord>(key: K): DataRecord[K] | undefined;
	GetMatchData<K extends keyof DataRecord>(key: K, defaultVar: DataRecord[K]): DataRecord[K];
	GetMatchData(key: any, defaultVar?: any) {
		const val = this.globalMatchData[key];
		return (val !== undefined ? val : defaultVar) as any;
	}
	/** 记录玩家数据（不清空） */
	RecordPlayerData<K extends keyof PlayerDataRecord, T extends PlayerDataRecord[K]>(playerID: PlayerID, key: K, value: T, method: "add" | "set" = "add") {
		this.playerData[playerID] ??= {};
		if (method == "add" && typeof value == "number") {
			this.playerData[playerID][key] = ((this.playerData[playerID][key] ?? 0) as number) + (value as number);
		} else if (method == "set") {
			this.playerData[playerID][key] = value;
		}
	}

	/** 获取玩家数据（不清空） */
	GetPlayerData<K extends keyof PlayerDataRecord>(playerID: PlayerID, key: K): PlayerDataRecord[K] | undefined;
	GetPlayerData<K extends keyof PlayerDataRecord>(playerID: PlayerID, key: K, defaultVar: PlayerDataRecord[K]): PlayerDataRecord[K];
	GetPlayerData(playerID: PlayerID, key: any, defaultVar?: any) {
		const val = this.playerData[playerID]?.[key];
		return (val !== undefined ? val : defaultVar) as any;
	}
	/** 记录全局数据（不清空） */
	RecordData<K extends keyof DataRecord, T extends DataRecord[K]>(key: K, value: T, method: "add" | "set" = "add") {
		if (method == "add" && typeof value == "number") {
			this.globalData[key] = ((this.globalData[key] ?? 0) as number) + (value as number);
		} else if (method == "set") {
			this.globalData[key] = value;
		}
	}

	/** 获取全局数据（不清空） */
	GetData<K extends keyof DataRecord>(key: K): DataRecord[K] | undefined;
	GetData<K extends keyof DataRecord>(key: K, defaultVar: DataRecord[K]): DataRecord[K];
	GetData(key: any, defaultVar?: any) {
		const val = this.globalData[key];
		return (val !== undefined ? val : defaultVar) as any;
	}

}

declare global {
	var DataRecord: CDataRecord;
	interface PlayerDataRecord {
	}
	interface DataRecord {
		HitCount: number;
	}
}
DataRecord ??= new CDataRecord();
