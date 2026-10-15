import { reloadable } from "../lib/tstl-utils";

@reloadable
class MMessage extends CModule {
	SendGameplayText(playerID: PlayerID, text: string) {
		const player = PlayerResource.GetPlayer(playerID);
		if (player == undefined) {
			return;
		}

		const toastData = { text };

		CustomGameEventManager.Send_ServerToPlayer(player, "ReceiveGameplayText", toastData);
	}
}

declare global {
	var Message: MMessage;
}

Message ??= new MMessage();
