declare interface LargeNumberHealthNetData {
	current: number;
	maximum: number;
}

declare interface CustomNetTableDeclarations {
	large_number_health: Record<string, LargeNumberHealthNetData>;
}
