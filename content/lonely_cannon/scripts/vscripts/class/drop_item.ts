import { EntityPool } from "./entity_pool";

// 商店物品
export class DropItem {
	private static readonly Classname = "dota_prop_customtexture";
	itemName: string;
	position: Vector;

	id: string;
	entity: CBaseEntity;
	playerID?: PlayerID;
	// panel: CPointClientUIWorldPanel;

	isDispose: boolean = false;
	isLanded: boolean = false;
	Quantitylimit: number = 9999999;
	particleIDs: ParticleID[] = [];
	private entityPoolKey: string;
	constructor(itemName: string, position: Vector, playerID?: PlayerID) {
		this.itemName = itemName;
		this.position = position;
		this.playerID = playerID;
		this.id = DoUniqueString(itemName);
		const kv = KeyValues.items[itemName];
		if (kv.Quantitylimit != undefined && kv.Quantitylimit != "") {
			this.Quantitylimit = toFiniteNumber(kv.Quantitylimit);
		}
		const model = DropItem.GetModel(kv);
		this.entityPoolKey = DropItem.GetEntityPoolKey(model, kv.Skin);
		this.entity = EntityPool.Acquire(this.entityPoolKey, DropItem.Classname, {
			// glowcolor: "0 255 0 255",
			angles: "0 -90 0",
			model: model,
			origin: position,
			skin: kv.Skin ?? "default",
			targetname: this.id,
			StartingAnim: "ACT_DOTA_IDLE",
			StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
		});
		if (kv.Particle != undefined) {
			if (this.playerID != undefined) {
				const player = PlayerResource.GetPlayer(this.playerID);
				if (player != undefined) {
					const particleID = ParticleManager.CreateParticleForPlayer(kv.Particle, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, this.entity, player);
					ParticleManager.SetParticleControlEnt(particleID, 1, this.entity, ParticleAttachment_t.PATTACH_INVALID, undefined, this.entity.GetAbsOrigin(), true);
					this.particleIDs.push(particleID);
				}
			} else {
				const particleID = ParticleManager.CreateParticleForce(kv.Particle, ParticleAttachment_t.PATTACH_ABSORIGIN_FOLLOW, this.entity);
				this.particleIDs.push(particleID);
			}
		}
		const entity = this.entity;
		entity.GameTimer(0.1, () => {
			// 抛物线掉落效果
			this.StartDropAnimation(entity);
		});

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
		// CustomNetTables.SetNetData("dropped_item", tostring(this.panel.GetEntityIndex()), {
		// 	item_name: itemName,
		// 	rarity: rarity,
		// });
		// this.panel.FollowEntityMerge(this.entity, "attach_orb");
	}

	/** 在 PRE_GAME 期间预先创建实体，避免战斗中首次掉落的创建尖峰。 */
	static Prewarm() {
		const models: Record<string, { model: string; skin: string | undefined }> = {};
		for (const itemName in KeyValues.items) {
			if (itemName != "Version") {
				const kv = KeyValues.items[itemName];
				const model = DropItem.GetModel(kv);
				const skin = kv.Skin;
				models[DropItem.GetEntityPoolKey(model, skin)] = { model, skin };
			}
		}
		for (const key in models) {
			const entry = models[key];
			const count = entry.model == DropItem.GetModel(KeyValues.items.item_coin_stack) ? 100 : 1;
			EntityPool.Prewarm(key, DropItem.Classname, {
				angles: "0 -90 0",
				model: entry.model,
				skin: entry.skin ?? "default",
				targetname: "pooled_drop_item",
				StartingAnim: "ACT_DOTA_IDLE",
				StartingAnimationLoopMode: "ANIM_LOOP_MODE_LOOPING",
			}, count);
		}
	}

	private static GetModel(kv: any): string {
		return (kv.Model == undefined || kv.Model == "") ? "models/development/invisiblebox.vmdl" : kv.Model;
	}

	private static GetEntityPoolKey(model: string, skin: string | undefined): string {
		return `drop_item:${model}:${skin ?? "default"}:0,-90,0:ACT_DOTA_IDLE`;
	}
	GetEntityIndex() {
		return this.entity.GetEntityIndex();
	}

	/** 是否已完成落地动画 */
	IsLanded() {
		return this.isLanded;
	}

	/** 抛物线掉落动画 */
	private StartDropAnimation(entity: CBaseEntity) {
		if (this.isDispose || this.entity !== entity) return;
		const initialPos = this.position;
		const startTime = GameRules.GetGameTime();
		const duration = 0.5; // 持续时间（秒）
		const peakHeight = 180; // 顶点高度

		entity.GameTimer(0, () => {
			if (this.isDispose || this.entity !== entity) return undefined;
			const elapsed = GameRules.GetGameTime() - startTime;

			if (elapsed >= duration) {
				// 动画结束，确保实体回到地面
				this.entity.SetLocalOrigin(initialPos);
				this.isLanded = true;
				return undefined; // 停止计时器
			}

			const t = elapsed / duration;
			// 0 -> 1 -> 0 的抛物线，t=0.5 时达到顶点
			const offsetZ = 4 * peakHeight * t * (1 - t);
			const newPos = Vector(initialPos.x, initialPos.y, initialPos.z + offsetZ);
			this.entity.SetLocalOrigin(newPos);

			return 0; // 每帧更新
		});
	}

	dispose() {
		if (this.isDispose) return;
		this.isDispose = true;
		// CustomNetTables.SetNetData("dropped_item", tostring(this.panel.GetEntityIndex()), undefined);
		if (IsValid(this.entity)) {
			EntityPool.Release(this.entityPoolKey, this.entity);
			this.entity = undefined as any;
		}
		this.particleIDs.forEach((id) => {
			ParticleManager.DestroyParticle(id, true);
		});
		this.particleIDs = [];
		// if (IsValid(this.panel)) {
		// 	this.panel.RemoveSelf();
		// 	this.panel = undefined as any;
		// }
	}
}
