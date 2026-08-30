import { reloadable } from "../lib/tstl-utils";

@reloadable
class CServiceSideEffect extends CModule {
	init(reload: boolean) {

	}
	OnUpdatePlayerKeyValues(playerID: PlayerID, data: Table) {
		Event.Fire("player_settings_changed", { playerID: playerID, settings: data });
		const heroVoiceType = data["setting_switch_hero_voice_type"]?.value;
		if (heroVoiceType != undefined) {
			PlayerData.SetHeroVoiceType(playerID, heroVoiceType);
		}

		const hero = PlayerResource.GetSelectedHeroEntity(playerID);
		if (hero === undefined) return;
	}
}

declare global {
	/**
	 * @ServerOnly
	 */
	var ServiceSideEffect: CServiceSideEffect;
}
ServiceSideEffect ??= new CServiceSideEffect();
