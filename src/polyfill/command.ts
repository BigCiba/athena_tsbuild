
interface CustomUIConfig {
	ConsoleCommandUnique: Record<string, string>;
}
interface CScriptBindingPR_Game {
	AddCommandUnique: typeof Game.AddCommand;
}
Game.AddCommandUnique = (
	pszCommandName: string,
	callback: (name: string, ...args: string[]) => void,
	pszDescription: string,
	nFlags: number,
) => {
	CustomUIConfig.ConsoleCommandUnique ??= {};
	const uniqueKey = DoUniqueString(Math.floor(Date.now() / 1000));
	Game.AddCommand(pszCommandName + uniqueKey, callback, pszDescription, nFlags);
	const state = Game.GetState();
	// 这之前lua客户端还没初始化，所以先记下来接下来一起发
	if (state < DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
		CustomUIConfig.ConsoleCommandUnique[pszCommandName] = uniqueKey;
	} else {
		GameEvents.SendEventClientSide("custom_command_unique", { command: pszCommandName, unique: uniqueKey });
	}
};