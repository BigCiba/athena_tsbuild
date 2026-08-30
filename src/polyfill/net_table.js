/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function useNetDataKey(tableName, tableKey, callback, playerID) {
	if (playerID == -1) {
		for (let id = 0; id < 4; id++) {
			const net = CustomNetTables.GetTableValue(tableName, tableKey + id);
			if (net != undefined) {
				if (net.data == "") {
					callback(undefined, id);
				} else {
					const data = JSON.parseSafe(net.data);
					callback(data, id);
				}
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (new RegExp(`^${tableKey}[0-7]$`).test(key)) {
				if (value.data == "") {
					callback(undefined, id);
				} else {
					const data = JSON.parseSafe(value.data);
					const id = finiteNumber(Number(key.slice(-1)), -1);
					callback(data, id);
				}
			}
		});
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		const net = CustomNetTables.GetTableValue(tableName, realKey);
		if (net != undefined) {
			if (net.data == "") {
				callback(undefined);
			} else {
				const data = JSON.parseSafe(net.data);
				callback(data);
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == realKey) {
				if (value.data == "") {
					callback(undefined);
				} else {
					const data = JSON.parseSafe(value.data);
					callback(data);
				}
			}
		});
	} else {
		const net = CustomNetTables.GetTableValue(tableName, tableKey);
		if (net != undefined) {
			if (net.data == "") {
				callback(undefined);
			} else {
				const data = JSON.parseSafe(net.data);
				callback(data);
			}
		}
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(undefined);
				} else {
					const data = JSON.parseSafe(value.data);
					callback(data);
				}
			}
		});
	}
}
/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function ListenNetDataKey(tableName, tableKey, callback, playerID) {
	if (playerID == -1) {
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (new RegExp(`^${tableKey}[0-7]$`).test(key)) {
				const data = JSON.parseSafe(value.data);
				const id = finiteNumber(Number(key.slice(-1)), -1);
				callback(data, id);
			}
		});
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == realKey) {
				const data = JSON.parseSafe(value.data);
				callback(data);
			}
		});
	} else {
		return CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parseSafe(value.data);
				callback(data);
			}
		});
	}
}
function getNetDataKey(tableName, tableKey, playerID) {
	if (playerID == -1) {
		const result = {};
		for (let id = 0; id < 4; id++) {
			const realKey = tableKey + id;
			const net = CustomNetTables.GetTableValue(tableName, realKey);
			if (net != undefined) {
				const data = JSON.parseSafe(net.data);
				result[id] = data;
			}
		}
		return result;
	} else if (typeof playerID == "number") {
		const realKey = tableKey + playerID.toString();
		const net = CustomNetTables.GetTableValue(tableName, realKey);
		if (net != undefined) {
			const data = JSON.parseSafe(net.data);
			return data;
		}
	} else {
		const net = CustomNetTables.GetTableValue(tableName, tableKey);
		if (net != undefined) {
			const data = JSON.parseSafe(net.data);
			return data;
		}
	}
}

/** 网表，但是套的netdata的定义，因为是json所以会保留array */
function useServiceNetData(tableName, callback, playerID) {
	if (playerID == -1) {
		const cache = CustomNetTables.GetTableValue("service", tableName);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (tableName == key) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	} else if (typeof playerID == "number") {
		const tableKey = tableName + playerID.toString();
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	} else {
		const tableKey = tableName;
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			callback(data);
		}
		return CustomNetTables.SubscribeNetTableListener("service", (_, key, value) => {
			if (key == tableKey) {
				const data = JSON.parse(value.data);
				callback(data);
			}
		});
	}
}
function getServiceNetData(tableName, playerID) {
	if (playerID == -1) {
		const cache = CustomNetTables.GetTableValue("service", tableName);
		if (cache != undefined) {
			return JSON.parse(cache.data);
		}
	} else if (typeof playerID == "number") {
		const tableKey = tableName + playerID.toString();
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			return data;
		}
	} else {
		const tableKey = tableName;
		const cache = CustomNetTables.GetTableValue("service", tableKey);
		if (cache != undefined) {
			const data = JSON.parse(cache.data);
			return data;
		}
	}
}


/** 玩家数据监听 */
function SubscribePlayerDataListener(playerID, tableKey, callback) {
	if (playerID == -1) {
		let players = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
		return players.map((id) => CustomNetTables.SubscribeNetTableListener(`player_data_${id}`, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(id, undefined);
					return;
				}
				const data = JSON.parseSafe(value.data);
				callback(id, data);
			}
		}));
	} else {
		return [CustomNetTables.SubscribeNetTableListener(`player_data_${playerID}`, (_, key, value) => {
			if (key == tableKey) {
				if (value.data == "") {
					callback(playerID, undefined);
					return;
				}
				const data = JSON.parseSafe(value.data);
				callback(playerID, data);
			}
		})];
	}
}
function UnsubscribePlayerDataListener(keys) {
	for (const key of keys) {
		CustomNetTables.UnsubscribeNetTableListener(key);
	}
}
function GetPlayerData(playerID, tableKey) {
	let t = CustomNetTables.GetTableValue(`player_data_${playerID}`, tableKey);
	if (t == undefined) {
		return undefined;
	}
	return JSON.parseSafe(t.data);
}
function GetAllPlayerData(tableKey) {
	let players = Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS);
	let t = {};
	for (let i = 0; i < players.length; i++) {
		const playerID = players[i];
		let data = GetPlayerData(playerID, tableKey);
		if (data != undefined) {
			t[playerID] = data;
		}
	}
	return t;
}
