
declare interface CScriptBindingPR_Players {
	/**
	 * 获取属性值
	 * @param playerID 玩家ID
	 * @param propertyId 属性名
	 */
	GetPropertyValue(playerID: PlayerID, propertyId: string): number;

	/**
	 * 存储玩家设置到服务器
	 * @param key 设置名
	 * @param value 设置值
	 */
	SetPlayerSetting(key: string, value: any): void
	GetPlayerSetting<T>(key: string, dafaultValue: T): T
}
Players.GetPropertyValue = (playerID, propertyId) => {
	// 1代表玩家属性
	const entityKey = `1_${playerID}`;
	const data = CustomNetTables.GetTableValue("property_system", entityKey);
	if (data && data[propertyId] != undefined) {
		return toFiniteNumber(Float(data[propertyId]), 0) as number;
	}
	return 0;
};
Players.SetPlayerSetting = (key: string, value: any) => {
	if (value == true) {
		value = "TRUE";
	}
	if (value == false) {
		value = "FALSE";
	}
	CallAction("/v1/key/save", { type: "setting", key: key, value: String(value) });
}
Players.GetPlayerSetting = <T>(key: string, dafaultValue: T): T => {
	const playerKeyValues = getServiceNetData("player_key_values", Players.GetLocalPlayer()) ?? {};
	return (playerKeyValues[key]?.value ?? dafaultValue) as T;
}