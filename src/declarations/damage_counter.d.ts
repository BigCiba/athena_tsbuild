declare type DamageCounterNetTagCategory = "damage_type" | "damage_category" | "damage_flag" | "ability";

declare interface DamageCounterNetNode {
	category: DamageCounterNetTagCategory;
	key: string;
	totalDamage: number;
	count: number;
}

declare type DamageCounterNetResult = Record<string, DamageCounterNetNode>;

declare type DamageCounterNetCategoryResult = Partial<Record<DamageCounterNetTagCategory, DamageCounterNetResult>>;

declare interface DamageCounterNetPlayerResult {
	playerID: PlayerID;
	ownerEntityIndex: EntityIndex;
	ownerName: string;
	totalDamage: number;
	count: number;
	tags: DamageCounterNetResult;
	categories: DamageCounterNetCategoryResult;
}

declare type DamageCounterNetPlayerStore = Record<string, DamageCounterNetPlayerResult>;

declare interface DamageCounterNetSnapshot {
	sequence: number;
	updatedAt: number;
	players: DamageCounterNetPlayerStore;
}

declare interface DamageCounterLogEventPayload {
	id: string;
	sequence: number;
	playerID: PlayerID;
	ownerEntityIndex: EntityIndex;
	ownerName: string;
	abilityKey?: string;
	damageCategoryKey?: string;
	damageFlagKeys?: string[];
	damage: number;
	count: number;
	gameTime: number;
}

declare interface NetDataDeclarations {
	damage_counter: {
		snapshot: DamageCounterNetSnapshot;
	};
}