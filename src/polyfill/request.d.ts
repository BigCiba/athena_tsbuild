/**
 * 服务器请求
 * @param eventName 事件名
 * @param eventData 数据
 * @param callback 回调
 * @param timeout 超时
 */
declare function ServerRequest<
	EventName extends keyof ServerRequestEventDeclarations,
>(
	eventName: EventName,
	eventData: ServerRequestEventDeclarations[EventName]["params"],
	callback?: (data: ServerRequestEventDeclarations[EventName]["results"]) => void,
	timeout?: number,
	timeoutCallback?: () => void
): string;

/**
 * 客户端快速请求，只能在游戏进行到DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION之后生效
 * @param eventName 事件名
 * @param eventData 数据
 */
declare function ClientRequest<
	EventName extends keyof ClientRequestEventDeclarations,
>(
	eventName: EventName,
	eventData: ClientRequestEventDeclarations[EventName]["params"],
): ClientRequestEventDeclarations[EventName]["results"] | undefined;

/** 取消请求 */
declare function CancelRequest(index: string): void;

interface CustomUIConfig {
	ServerRequest<EventName extends keyof ServerRequestEventDeclarations>(
		eventName: EventName,
		eventData: ServerRequestEventDeclarations[EventName]["params"],
		callback?: (data: ServerRequestEventDeclarations[EventName]["results"]) => void,
		timeout?: number,
		timeoutCallback?: () => void
	): string;
	CancelServerRequest(index: string): void;
}
