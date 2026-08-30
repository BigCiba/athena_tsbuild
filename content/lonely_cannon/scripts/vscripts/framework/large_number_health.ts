/** @noSelfInFile */

/**
 * 逻辑生命值上限。Dota 引擎的生命和 modifier stack 均不能可靠承载接近 int32 上限的值；
 * 超过此值的非英雄单位改用逻辑生命，客户端仅保留等比例的代理生命用于血条。
 */
const LARGE_NUMBER_HEALTH_TRIGGER = 1_000_000_000;
const LARGE_NUMBER_HEALTH_PROXY_MAX = 1_000_000;

interface LargeNumberHealthState {
	max: number;
	health: number;
}

interface LargeNumberHealthNetData {
	current: number;
	maximum: number;
}

declare interface CDOTA_BaseNPC {
	__largeNumberHealth?: LargeNumberHealthState;
}

declare interface CustomNetTableDeclarations {
	large_number_health: Record<string, LargeNumberHealthNetData>;
}

/**
 * 非英雄单位的大数值生命适配层。
 *
 * 游戏逻辑始终读取真实生命；引擎生命仅用于存活状态与血条百分比。此层的有效精确范围为
 * JavaScript/Lua 双精度安全整数范围（约 9e15），若设计需要继续扩大，应改用尾数/指数类型。
 */
class LargeNumberHealth {
	static IsActive(unit: CDOTA_BaseNPC): boolean {
		return unit.__largeNumberHealth != undefined;
	}

	static GetHealth(unit: CDOTA_BaseNPC): number | undefined {
		return unit.__largeNumberHealth?.health;
	}

	static GetMaxHealth(unit: CDOTA_BaseNPC): number | undefined {
		return unit.__largeNumberHealth?.max;
	}

	/** 将逻辑数值转换为安全的引擎数值，供血条和 modifier stack 同步使用。 */
	static ToProxyValue(unit: CDOTA_BaseNPC, amount: number): number {
		const state = unit.__largeNumberHealth;
		if (state == undefined) {
			return math.max(0, math.floor(amount));
		}
		if (amount <= 0 || state.max <= 0) {
			return 0;
		}
		return math.floor(LARGE_NUMBER_HEALTH_PROXY_MAX * amount / state.max);
	}

	/**
	 * 在属性变更后刷新逻辑上限，并保持当前生命百分比。
	 * @returns 单位当前是否使用逻辑生命。
	 */
	static Refresh(unit: CDOTA_BaseNPC): boolean {
		if (!IsServer() || unit.IsHero()) {
			return false;
		}

		const logicalMax = math.max(1, math.floor(unit.GetMaxHealth()));
		const previous = unit.__largeNumberHealth;
		const wasUsingLargeNumberHealth = previous != undefined;
		const shouldUseLargeNumberHealth = wasUsingLargeNumberHealth || logicalMax >= LARGE_NUMBER_HEALTH_TRIGGER;

		if (!shouldUseLargeNumberHealth) {
			return false;
		}

		const healthPercent = previous != undefined
			? previous.health / math.max(1, previous.max)
			: unit.GetHealth_Engine() / math.max(1, unit.GetMaxHealth_Engine());

		const state: LargeNumberHealthState = {
			max: logicalMax,
			health: math.max(1, math.min(logicalMax, logicalMax * healthPercent)),
		};
		unit.__largeNumberHealth = state;
		this.SyncEngineHealth(unit);
		return true;
	}

	static SetHealth(unit: CDOTA_BaseNPC, health: number): boolean {
		const state = unit.__largeNumberHealth;
		if (state == undefined) {
			return false;
		}
		state.health = math.max(0, math.min(state.max, health));
		this.SyncEngineHealth(unit);
		return true;
	}

	static ModifyHealth(unit: CDOTA_BaseNPC, health: number): boolean {
		return this.SetHealth(unit, health);
	}

	/** 单位重新生成时清理可能被复用的 entity index 网表数据。 */
	static Clear(unit: CDOTA_BaseNPC): void {
		if (!IsServer()) {
			return;
		}
		unit.__largeNumberHealth = undefined;
		CustomNetTables.SetTableValue("large_number_health", tostring(unit.entindex()), undefined);
	}

	private static SyncEngineHealth(unit: CDOTA_BaseNPC): void {
		const state = unit.__largeNumberHealth;
		if (state == undefined) {
			return;
		}

		// 禁止把逻辑生命写回引擎；代理生命只表示百分比。
		unit.SetMaxHealth_Engine(LARGE_NUMBER_HEALTH_PROXY_MAX);
		unit.SetBaseMaxHealth_Engine(LARGE_NUMBER_HEALTH_PROXY_MAX);
		const proxyHealth = state.health <= 0 ? 0 : math.max(1, this.ToProxyValue(unit, state.health));
		unit.SetHealth_Engine(proxyHealth);
		CustomNetTables.SetTableValue("large_number_health", tostring(unit.entindex()), {
			current: state.health,
			maximum: state.max,
		});
	}
}
