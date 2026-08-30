import { reloadable } from "../lib/tstl-utils";

/** 通知系统模块 */
@reloadable
class CNotification extends CModule {
	tPlayersChatLineCount: Table;
	init(bReload: boolean): void {
		if (!bReload) {
			this.tPlayersChatLineCount = {};
		}
		for (let index = 0; index < DOTALimits_t.DOTA_MAX_PLAYERS; index++) {
			this.tPlayersChatLineCount[index] = 2;
		}
	}

	ShowPlaceName(iPlayerID: PlayerID, text: string, duration = 2) {
		const player = PlayerResource.GetPlayer(iPlayerID);
		if (player) {
			CustomGameEventManager.Send_ServerToPlayer(player, "ShowPlaceName", { text, duration });
		}
	}

	Upper(tParams: UpperNotificationData) {
		CustomGameEventManager.Send_ServerToAllClients("notification_upper", tParams);
	}
	UpperToPlayer(iPlayerID: PlayerID, tParams: UpperNotificationData) {
		const player = PlayerResource.GetPlayer(iPlayerID);
		if (player) {
			CustomGameEventManager.Send_ServerToPlayer(player, "notification_upper", tParams);
		}
	}
	Combat(tParams: NotificationData) {
		CustomGameEventManager.Send_ServerToAllClients("notification_combat", tParams);
	}
	CombatToPlayer(iPlayerID: PlayerID, tParams: NotificationData) {
		const player = PlayerResource.GetPlayer(iPlayerID);
		if (player) {
			CustomGameEventManager.Send_ServerToPlayer(player, "notification_combat", tParams);
		}
	}
	CombatResource(tParams: NotificationData, tResourceSum: Record<string, number>) {
		const list: Array<[string, number]> = [];
		for (const [key, value] of pairs(tResourceSum)) {
			list.push([key, value]);
		}
		if (!tParams.message) {
			tParams.message = "DrawReward_AllPlayer_Custom_Resources";
		}
		tParams.array_get = {
			type: "$0 $1",
			split: " / ",
			param_type: ["resource", "b_int"],
			list: list,
		};
		this.Combat(tParams);
	}
	CombatAttribute(tParams: NotificationData, tAttributesSum: Record<string, number>) {
		if (!tParams.message) {
			tParams.message = "DrawReward_AttributeTotal";
		}
		tParams.array_get = {
			type: "custom_variable",
			split: " / ",
			list: tAttributesSum,
		};
		this.Combat(tParams);
	}
	CombatResourceToPlayer(iPlayerID: PlayerID, tParams: NotificationData, tResourceSum: Record<string, number>) {
		const list: Array<[string, number]> = [];
		for (const [key, value] of pairs(tResourceSum)) {
			list.push([key, value]);
		}
		if (!tParams.message) {
			tParams.message = "DrawReward_Custom_Resources";
		}
		tParams.array_get = {
			type: "$0 $1",
			split: " / ",
			param_type: ["resource", "b_int"],
			list: list,
		};
		this.CombatToPlayer(iPlayerID, tParams);
	}
	CombatAttributeToPlayer(iPlayerID: PlayerID, tParams: NotificationData, tAttributesSum: Record<string, number>) {
		if (!tParams.message) {
			tParams.message = "DrawReward_AttributeTotal";
		}
		tParams.array_get = {
			type: "custom_variable",
			split: " / ",
			list: tAttributesSum,
		};
		this.CombatToPlayer(iPlayerID, tParams);
	}
	ChatLine(tParams: NotificationData) {
		const iPlayerID = tParams.player_id;
		if (typeof iPlayerID === "number" && PlayerResource.IsValidPlayerID(iPlayerID)) {
			CustomGameEventManager.Send_ServerToAllClients("notification_chat_line", tParams);
		}
	}

	/** 显示一个帮助信息在任意位置或者面板上 */
	HelpTip(iPlayerID: PlayerID, tContent: NotificationHelpData) {
		const player = PlayerResource.GetPlayer(iPlayerID);
		tContent.flDuration = tContent.flDuration || 5;
		tContent.sDirection = tContent.sDirection || "top";
		if (player) {
			CustomGameEventManager.Send_ServerToPlayer(player, "notification_help", tContent);
		}
	}
	/** 关闭指定ID帮助信息面板 */
	CloseHelpTip(iPlayerID: PlayerID, sPanelID: string) {
		const player = PlayerResource.GetPlayer(iPlayerID);
		if (player) {
			CustomGameEventManager.Send_ServerToPlayer(player, "notification_close_help", { sPanelID: sPanelID });
		}
	}
}
declare global {
	var Notification: CNotification;
}
Notification ??= new CNotification();