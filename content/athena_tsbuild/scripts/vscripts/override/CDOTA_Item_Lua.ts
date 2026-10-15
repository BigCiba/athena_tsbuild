/** @noSelfInFile */

//********************************************************************************
// Both
//********************************************************************************
declare interface CDOTA_Item_Lua {
	/** 覆盖官方的函数报错 */
	OnChargeCountChanged(): void;
}

if (IsServer()) {
	// 覆盖官方的函数报错
	CDOTA_Item_Lua.OnChargeCountChanged = function () { };
}