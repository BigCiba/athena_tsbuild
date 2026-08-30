/**
 * Reuses visual-only entities instead of repeatedly creating and destroying
 * them during gameplay.  Entries are bucketed by their immutable spawn
	 * configuration. Dynamic state is reapplied on every Acquire; immutable
	 * state (model, skin, scale and animation) must be part of the pool key.
 */
export class EntityPool {
	private static readonly HiddenOrigin = Vector(10000, 10000, -10000);
	/** Allows the 100-entity stress test to be fully recycled on its next run. */
	private static readonly MaxInactivePerKey = 128;
	private static entities: Record<string, CBaseEntity[]> = {};

	static Acquire(key: string, classname: string, spawnTable: Record<string, any>): CBaseEntity {
		const entries = this.entities[key];
		let entity: CBaseEntity | undefined;
		while (entries != undefined && entries.length > 0 && entity == undefined) {
			const candidate = entries.pop()!;
			if (IsValid(candidate)) {
				entity = candidate;
			}
		}

		if (entity == undefined) {
			entity = SpawnEntityFromTableSynchronous(classname, spawnTable);
		}
		this.ApplyDynamicState(entity, spawnTable);
		return entity;
	}

	/** Applies every spawn-table field that is intentionally mutable per use. */
	private static ApplyDynamicState(entity: CBaseEntity, spawnTable: Record<string, any>) {
		entity.RemoveEffects(EntityEffects.EF_NODRAW);
		if (spawnTable.origin != undefined) entity.SetAbsOrigin(spawnTable.origin);
		if (spawnTable.targetname != undefined) entity.SetEntityName(spawnTable.targetname);
	}

	static Release(key: string, entity: CBaseEntity | undefined) {
		if (!IsValid(entity)) return;

		let entries = this.entities[key];
		if (entries == undefined) {
			entries = [];
			this.entities[key] = entries;
		}
		if (entries.length >= this.MaxInactivePerKey) {
			entity.RemoveSelf();
			return;
		}

		entity.AddEffects(EntityEffects.EF_NODRAW);
		entity.SetAbsOrigin(this.HiddenOrigin);
		entries.push(entity);
	}

	/**
	 * Creates inactive entries ahead of gameplay. Calling this repeatedly is
	 * safe: it only fills the bucket up to the requested count.
	 */
	static Prewarm(key: string, classname: string, spawnTable: Record<string, any>, count: number) {
		let entries = this.entities[key];
		if (entries == undefined) {
			entries = [];
			this.entities[key] = entries;
		}
		while (entries.length < Math.min(count, this.MaxInactivePerKey)) {
			const entity = SpawnEntityFromTableSynchronous(classname, {
				...spawnTable,
				origin: this.HiddenOrigin,
			});
			entity.AddEffects(EntityEffects.EF_NODRAW);
			entries.push(entity);
		}
	}

	/** Frees retained entities, intended for map teardown or a full reload. */
	static Clear() {
		for (const key in this.entities) {
			for (const entity of this.entities[key]) {
				if (IsValid(entity)) entity.RemoveSelf();
			}
		}
		this.entities = {};
	}
}
