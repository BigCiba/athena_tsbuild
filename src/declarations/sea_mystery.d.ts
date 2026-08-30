interface MoonstoneActivityNetData {
	received?: string | number[];
	extra_num?: number;
	round?: number;
	total_num?: number;
	activity_id?: number;
}

declare interface NetDataDeclarations {
	player_moonstone_activity_data: Record<string, MoonstoneActivityNetData>;
}
