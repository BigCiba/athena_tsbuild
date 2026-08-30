import { CWeightPool } from "../class/weight_pool";
import { reloadable } from "../lib/tstl-utils";

@reloadable
class MDrawPool extends CModule {
	private _reservoirs: Record<string, CWeightPool<string>>;
	private _baseReservoirs: Record<string, CWeightPool<string>>;
	private _pools: Record<string, CWeightPool<string>>;
	init(reload: boolean): void {
		const reservoirsKv = LoadKeyValues("scripts/npc/gameplay/reservoirs.kv");
		const poolsKv = LoadKeyValues("scripts/npc/gameplay/pools.kv");
		this._baseReservoirs = {};
		for (const [k, v] of pairs(reservoirsKv)) {
			this._baseReservoirs[k] = new CWeightPool(v);
		}

		this._pools = {};
		for (const [k, v] of pairs(poolsKv)) {
			this._pools[k] = new CWeightPool(v);
		}

		this._reservoirs = {};
		for (const [k, oldReservoirs] of pairs(this._baseReservoirs)) {
			let newReservoirs = new CWeightPool<string>();
			let lcm: number;
			oldReservoirs.Each((poolName, _) => {
				let pool = this._pools[poolName];
				if (pool != undefined && pool.TotalWeight != 0) {
					lcm = lcm == undefined ? pool.TotalWeight : LeastCommonMultiple(lcm, pool.TotalWeight);
				}
			}, true);
			oldReservoirs.Each((poolName, weight1) => {
				let pool = this._pools[poolName];
				if (pool != undefined) {
					pool.Each((item, weight2) => {
						newReservoirs.Add(item, lcm! / pool.TotalWeight * weight2 * weight1);
					}, true);
				} else {
					newReservoirs.Add(poolName, lcm == undefined ? weight1 : weight1 * lcm);
				}
			}, true);
			let gcm: number;
			newReservoirs.Each((item, weight) => {
				gcm = gcm == undefined ? weight : GreatestCommonDivisor(gcm, weight);
			}, true);
			if (gcm! != undefined) {
				newReservoirs.Each((item, weight) => {
					newReservoirs.Set(item, weight / gcm);
				}, true);
			}
			this._reservoirs[k] = newReservoirs;
		}
	}

	/** 抽奖 */
	Draw(reservoirOrPool: string, excluded?: string[]) {
		if (this._reservoirs[reservoirOrPool] != undefined) {
			return this._reservoirs[reservoirOrPool].Random(excluded);
		}
		if (this._pools[reservoirOrPool] != undefined) {
			return this._pools[reservoirOrPool].Random(excluded);
		}
		return;
	}
	/** 多次抽奖不重复 */
	MultipleDraw(reservoirOrPool: string, count: number, excluded?: string[]) {
		if (this._reservoirs[reservoirOrPool] != undefined) {
			return this._reservoirs[reservoirOrPool].MultipleRandomWithoutReplacement(count, excluded);
		}

		if (this._pools[reservoirOrPool] != undefined) {
			return this._pools[reservoirOrPool].MultipleRandomWithoutReplacement(count, excluded);
		}

	}
	// 仅抽奖堆
	DrawReservoirOnly(sReservoirName: string, excluded?: string[]) {
		if (this._baseReservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._baseReservoirs[sReservoirName].Random(excluded);
	}
	// 多次抽奖堆（结果可重复）
	MultipleDrawReservoirOnly(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._baseReservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._baseReservoirs[sReservoirName].MultipleRandom(count, excluded);
	}
	// 多次根据权重随机（结果不重复）
	MultipleDrawReservoirOnlyWithoutReplacement(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._baseReservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._baseReservoirs[sReservoirName].MultipleRandomWithoutReplacement(count, excluded);
	}

	/** 抽奖堆 */
	DrawReservoir(sReservoirName: string, excluded?: string[]) {
		if (this._reservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._reservoirs[sReservoirName].Random(excluded);
	}
	/** 多次抽奖堆 */
	MultipleDrawReservoir(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._reservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._reservoirs[sReservoirName].MultipleRandom(count, excluded);
	}
	MultipleDrawReservoirWithoutReplacement(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._reservoirs[sReservoirName] == undefined) {
			return;
		}

		return this._reservoirs[sReservoirName].MultipleRandomWithoutReplacement(count, excluded);
	}

	// 抽奖池
	DrawPool(sPoolName: string, excluded?: string[]) {
		if (this._pools[sPoolName] == undefined) {
			return;
		}

		return this._pools[sPoolName].Random(excluded);
	}
	GetPool(sPoolName: string) {
		return this._pools[sPoolName];
	}
	MultipleDrawPool(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._pools[sReservoirName] == undefined) {
			return;
		}

		return this._pools[sReservoirName].MultipleRandom(count, excluded);
	}
	MultipleDrawPoolWithoutReplacement(sReservoirName: string, count: number, excluded?: string[]) {
		if (this._pools[sReservoirName] == undefined) {
			return;
		}

		return this._pools[sReservoirName].MultipleRandomWithoutReplacement(count, excluded);
	}

	// 获取游戏里的水库或池子
	GetGameReservoirOrPool(name: string): CWeightPool<string> | undefined {
		return this._reservoirs[name] ?? this._pools[name];
	}
	DrawReservoirOrPool(name: string, excluded?: string[]) {
		if (this._reservoirs[name] != undefined) {
			return this._reservoirs[name].Random(excluded);
		}
		if (this._pools[name] != undefined) {
			return this._pools[name].Random(excluded);
		}
		return;
	}
}


declare global {
	var DrawPool: MDrawPool;
}
DrawPool ??= new MDrawPool();