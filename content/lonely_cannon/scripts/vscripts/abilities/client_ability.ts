import { EOMAbility, registerEOMAbility } from "./eom_ability";

@registerEOMAbility()
class client_ability extends EOMAbility {
	GetAbilityTextureName(): string {
		if (_G.ClientRequestEventResult != undefined) {
			let sResult = _G.ClientRequestEventResult;
			_G.ClientRequestEventResult = undefined;
			return sResult;
		}
		return "";
	}
}