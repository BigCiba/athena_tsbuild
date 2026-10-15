/** @noSelfInFile */

//********************************************************************************
// Both
//********************************************************************************
declare interface CDOTA_Item {
	SetLevel_Engine: typeof CDOTA_Item.SetLevel;
	SetLevel(level: number, update?: boolean): void;
	/** 获取来源，一般用来区分类型 */
	GetAccess(): string;
	/** 获取套装类型 */
	GetSuits(): string[];
}

if (IsServer()) {
	CDOTA_Item.SetLevel_Engine ??= CDOTA_Item.SetLevel;
	CDOTA_Item.SetLevel = function (level: number, update: boolean = true) {
		this.SetLevel_Engine(level);
		const caster = this.GetCaster();
		if (caster.__items != undefined) {
			caster.__items.map((data) => {
				if (data.entIndex == this.entindex()) {
					data.level = this.GetLevel();
				}
			});
		}
		this.__OnRefresh();
		if (update) {
			caster.UpdateAbilityNetData();
		}
	};
	CDOTA_Item.GetAccess = function () {
		return KeyValues.items[this.GetAbilityName()]?.Access ?? "";
	};
	CDOTA_Item.GetSuits = function () {
		return ((KeyValues.items[this.GetAbilityName()]?.Suit ?? "") as string).split("|").filter(s => s != "");
	};
}