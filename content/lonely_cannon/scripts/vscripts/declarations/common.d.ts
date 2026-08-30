declare interface CEntityPointer {
	/**
	 * Has underlying C++ entity object been deleted?
	 *
	 * @both
	 */
	IsNull(): boolean;
}

declare interface CDOTA_Item {
	_devourType_?: DevourType;
	_created_?: boolean;
	_is_locked?: boolean;
	_expiry_time?: number;
}
declare interface CDOTA_BaseNPC {
	__counter_ready__: boolean;
	GetCaster(): CDOTA_BaseNPC | undefined;
	GetDieTime(): unknown;
	aStateModifers: CDOTA_Modifier_Lua[] | undefined;
	hModifierCommon: CDOTA_Buff | undefined;
	iKillerPlayerID: PlayerID | undefined;
	iRoundNumber: number | undefined;
	bLevelDrawTraced: boolean | undefined;
	/**
	 * 获取单位的unit_state技能
	 * @returns
	 */
	GetDummyAbility(): CDOTABaseAbility | undefined;
}

/**尺寸，[XSize, YSize] */
declare type SIZE = [number, number];