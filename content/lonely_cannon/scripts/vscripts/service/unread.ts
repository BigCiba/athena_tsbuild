import { reloadable } from "../lib/tstl-utils";

@reloadable
class CServiceUnread extends CModule {
	init(reload: boolean) {
		RequestEvent("fishing_unread_read" as never, (event: any) => {
			const system = tostring(event.system);
			if (system != "fishing_tool" && system != "fishing_courier") {
				return {
					code: -1,
					message: "invalid fishing unread system",
				};
			}

			const ids = event.ids ?? [];
			const unreadPatch: Record<string, Record<string, "nil">> = {};
			unreadPatch[system] = {};

			for (const [_, id] of ipairs(ids)) {
				unreadPatch[system][tostring(id)] = "nil";
			}

			CommonService.SetPlayerServiceNetData(event.PlayerID, "player_unread_ids", unreadPatch as any);

			return {
				code: 0,
			};
		});
	}

	CreateAddItemUnreadContext(playerID: PlayerID) {
		return {
			playerTokenAmountsBefore: this.SnapshotPlayerTokenAmounts(playerID),
			playerCourierExistsBefore: this.SnapshotPlayerCourierExists(playerID),
		};
	}

	ApplyAddItemUnreadConfig(playerID: PlayerID, addItems: any, context: ReturnType<CServiceUnread["CreateAddItemUnreadContext"]>): void {
		const unreadPatch: Record<string, Record<string, true>> = {};

		for (const buildPatch of AddItemUnreadConfig) {
			const patch = buildPatch(playerID, addItems, context.playerTokenAmountsBefore, context.playerCourierExistsBefore);
			if (typeof patch != "object" || patch == undefined) {
				continue;
			}

			for (const [system, ids] of pairs(patch)) {
				if (typeof ids != "object" || ids == undefined) {
					continue;
				}

				unreadPatch[system as string] ??= {};
				for (const [id, value] of pairs(ids)) {
					if (value == true) {
						unreadPatch[system as string][tostring(id)] = true;
					}
				}
			}
		}

		if (Object.keys(unreadPatch).length <= 0) {
			return;
		}

		CommonService.SetPlayerServiceNetData(playerID, "player_unread_ids", unreadPatch as any);
	}

	private SnapshotPlayerTokenAmounts(playerID: PlayerID): Record<string, number> {
		const tokens = CommonService.GetPlayerServiceNetTable(playerID, "player_tokens") ?? {};
		const snapshot: Record<string, number> = {};

		for (const [id, data] of pairs(tokens)) {
			snapshot[tostring(id)] = toFiniteNumber(data?.amounts, 0);
		}

		return snapshot;
	}

	private SnapshotPlayerCourierExists(playerID: PlayerID): Record<string, true> {
		const couriers = CommonService.GetPlayerServiceNetTable(playerID, "player_couriers") ?? {};
		const snapshot: Record<string, true> = {};

		for (const [id] of pairs(couriers)) {
			snapshot[tostring(id)] = true;
		}

		return snapshot;
	}
}

declare global {
	/**
	 * @ServerOnly
	 */
	var ServiceUnread: CServiceUnread;
}
ServiceUnread ??= new CServiceUnread();
