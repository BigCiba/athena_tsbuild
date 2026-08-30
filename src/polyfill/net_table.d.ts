/** 网表 */
declare function useNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined, playerID: PlayerID) => void,
	playerID: PlayerID
): NetTableListenerID;
declare function useNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined) => void,
): NetTableListenerID;
declare function ListenNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	callback: (value: T[K] | undefined) => void,
): NetTableListenerID;
declare function getNetDataKey<
	TName extends keyof NetDataDeclarations,
	T extends NetDataDeclarations[TName],
	K extends keyof T,
>(
	tableName: TName,
	tableKey: K,
	playerID?: PlayerID
): T[K] | undefined;
