/** Auto-generated KV type definitions */

interface Npc_abilities_customKVItem {
	[k:string]: any;
	AbilityBehavior?: string;
	AbilityType?: string;
	BaseClass?: string;
	MaxLevel?: number;
	ScriptFile?: string;
}

interface Npc_units_customKVItem {
	[k:string]: any;
	AttackCapabilities?: string;
	BaseClass?: string;
	BoundsHullName?: string;
	HealthBarOffset?: number;
	Level?: number;
	Model?: string;
	ModelScale?: number;
	MovementCapabilities?: string;
	MovementSpeed?: number;
	SpawnModifier?: string;
	StatusHealth?: number;
	StatusHealthRegen?: number;
	StatusMana?: number;
	StatusManaRegen?: number;
	VisionDaytimeRange?: number;
	VisionNighttimeRange?: number;
}

interface Payments_orderKVItem {
	[k:string]: any;
	QRCode?: number;
	order?: number;
	pid?: number;
	region?: string;
	state?: number;
}

declare global {
	interface CustomUIConfig {
		npc_abilities_custom: Record<string, Npc_abilities_customKVItem>;
		npc_heroes_custom: {
		};
		npc_items_custom: {
		};
		npc_units_custom: Record<string, Npc_units_customKVItem>;
		payments_order: Record<string, Payments_orderKVItem>;
	}
}

export {};
