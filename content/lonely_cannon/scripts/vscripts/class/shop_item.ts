import { EntityPool } from "./entity_pool";

export type ShopItemSource = "Default" | "TravelingMerchant";

// 商店物品
export class ShopItem {
	private static readonly Classname = "dota_prop_customtexture";
	itemName: string;
	rarity: number;
	position: Vector;
	isFree: boolean = false;
	ownerPlayerID?: PlayerID;
	source: ShopItemSource;

	id: string;
	entity: CBaseEntity;
	panel: CPointClientUIWorldPanel;

	isDispose: boolean = false;
	Quantitylimit: number = 9999999;
	particleIDs: ParticleID[] = [];
	private static readonly EntityPoolKey = "shop_item:neutral_box";
	constructor(itemName: string, rarity: number, position: Vector, isFree: boolean = false, ownerPlayerID?: PlayerID, source: ShopItemSource = "Default") {
		this.itemName = itemName;
		this.rarity = rarity;
		this.position = position;
		this.isFree = isFree;
		this.ownerPlayerID = ownerPlayerID;
		this.source = source;
		this.id = DoUniqueString(itemName);
		const kv = KeyValues.items[itemName];
		if (kv.Quantitylimit != undefined && kv.Quantitylimit != "") {
			this.Quantitylimit = toFiniteNumber(kv.Quantitylimit);
		}
		this.entity = EntityPool.Acquire(ShopItem.EntityPoolKey, ShopItem.Classname, {
			glowcolor: "0 255 0 255",
			angles: ownerPlayerID == undefined ? "0 -90 0" : "90 0 0",
			model: "models/props_gameplay/neutral_box.vmdl",
			origin: position,
			scales: "1.2 1.2 1.2",
			targetname: "shop_item",
			StartingAnim: "capsule_idle_translate",
			StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
		});
		if (ownerPlayerID != undefined) {

			const player = PlayerResource.GetPlayer(ownerPlayerID);
			if (player != undefined) {
				this.entity.AddEffects(EntityEffects.EF_NODRAW);
				const particleID = ParticleManager.CreateParticleForPlayer("particles/generic_gameplay/generic_client_item.vpcf",
					ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, this.entity, player);
				ParticleManager.SetParticleControlEnt(particleID, 1, this.entity, ParticleAttachment_t.PATTACH_INVALID, undefined, this.entity.GetAbsOrigin(), true);
				this.particleIDs.push(particleID);
			}
		}

		// this.panel = SpawnEntityFromTableSynchronous("point_clientui_world_panel", {
		// 	origin: Vadd(position, Vector(0, 50, 100)),
		// 	dialog_layout_name: "file://{resources}/layout/custom_game/tooltips/drop_item.xml",
		// 	width: 100,
		// 	height: 100,
		// 	panel_dpi: 32,
		// 	horizontal_align: 1,
		// 	vertical_align: 1,
		// 	angles: "0 0 45",
		// 	// ignore_input: 1,
		// 	parentname: this.id,
		// 	panel_id: itemName,
		// }) as CPointClientUIWorldPanel;
		CustomNetTables.SetNetData("dropped_item", tostring(this.entity.GetEntityIndex()), {
			kind: "shop",
			item_name: itemName,
			rarity: rarity,
			is_free: isFree,
			owner_player_id: ownerPlayerID,
			show_tip: true,
		});
		// this.panel.FollowEntityMerge(this.entity, "attach_orb");
	}

	/** 商店刷新最多同时显示多件物品，预热数量按该峰值保留。 */
	static Prewarm() {
		EntityPool.Prewarm(ShopItem.EntityPoolKey, ShopItem.Classname, {
			glowcolor: "0 255 0 255",
			angles: "0 -90 0",
			model: "models/props_gameplay/neutral_box.vmdl",
			scales: "1.2 1.2 1.2",
			targetname: "pooled_shop_item",
			StartingAnim: "capsule_idle_translate",
			StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
		}, 16);
	}
	GetEntityIndex() {
		if (this.entity === undefined || !IsValid(this.entity)) {
			return -1 as EntityIndex;
		}
		return this.entity.GetEntityIndex();
	}
	dispose() {
		if (this.isDispose) return;
		this.isDispose = true;
		if (this.entity !== undefined && IsValid(this.entity)) {
			CustomNetTables.SetNetData("dropped_item", tostring(this.entity.GetEntityIndex()), undefined);
		}
		if (IsValid(this.entity)) {
			EntityPool.Release(ShopItem.EntityPoolKey, this.entity);
			this.entity = undefined as any;
		}
		this.particleIDs.forEach((id) => {
			ParticleManager.DestroyParticle(id, false);
		});
		// if (IsValid(this.panel)) {
		// 	this.panel.RemoveSelf();
		// 	this.panel = undefined as any;
		// }
	}
}
