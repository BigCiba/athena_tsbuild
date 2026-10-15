import { reloadable } from "../lib/tstl-utils";

@reloadable
class CParticleClear extends CModule {
	private particleCounterByPlayer: Partial<Record<PlayerID, number>> = {};
	private maxCountByPlayer: Partial<Record<PlayerID, number>> = {};
	private totalCounter: number = 0;
	private readonly MAX_TOTAL_COUNT = 500;
	init(reload: boolean): void {
		if (!reload) {
			Timer.GameTimer(1, () => {
				this.particleCounterByPlayer = {};
				this.totalCounter = 0;
				this.RefreshMaxCount();
				return 1;
			});
		}
	}
	private RefreshMaxCount(): void {
		if (!IsServer()) return;
		this.maxCountByPlayer = {};
		Game.EachPlayer((playerID) => {
			const data = CustomNetTables.GetTableValue("service", "player_key_values" + playerID);
			let maxCount = 420;
			if (data != undefined && data.data != undefined) {
				const [kv] = json.decode(data.data);
				if (kv != undefined && kv["Setting_ParticleLevel"] != undefined) {
					let particleLevel = toFiniteNumber(kv["Setting_ParticleLevel"].value);
					maxCount = 10 * math.pow(1.6, particleLevel)
				}
			}

			this.maxCountByPlayer[playerID] = maxCount;
		})
	}
	GetMaxCount(playerID: PlayerID): number {
		return this.maxCountByPlayer[playerID] ?? 420;
	}

	GetCount(playerID: PlayerID): number {
		return this.particleCounterByPlayer[playerID] ?? 0;
	}

	GetTotalCount(): number {
		return this.totalCounter;
	}

	GetMaxTotalCount(): number {
		return this.MAX_TOTAL_COUNT;
	}

	CanCreate(playerID: PlayerID): boolean {
		return this.GetCount(playerID) < this.GetMaxCount(playerID)
			&& this.totalCounter < this.MAX_TOTAL_COUNT;
	}

	Record(playerID: PlayerID): void {
		this.particleCounterByPlayer[playerID] = this.GetCount(playerID) + 1;
		this.totalCounter = this.totalCounter + 1;
	}
}
declare global {
	var ParticleClear: CParticleClear;
}

ParticleClear ??= new CParticleClear();