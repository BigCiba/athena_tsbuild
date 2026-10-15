import { reloadable } from "../../lib/tstl-utils";

require("damage_system_type");

type CountDamageTagCategory = "ability";

type CountDamageNode = {
    category: CountDamageTagCategory,
    key: string,
    totalDamage: number,
    count: number,
}

type CountDamageResult = Record<string, CountDamageNode>

type CountDamageCategoryResult = Partial<Record<CountDamageTagCategory, CountDamageResult>>

type CountDamagePlayerResult = {
    playerID: PlayerID,
    ownerEntityIndex: EntityIndex,
    ownerName: string,
    totalDamage: number,
    count: number,
    categories: CountDamageCategoryResult,
}

type CountDamagePlayerStore = Partial<Record<PlayerID, CountDamagePlayerResult>>

type CountDamageParam = {
    damage: number,
    owner: CDOTA_BaseNPC,
    abilityName?: string,
}

const COUNT_DAMAGE_ABILITY_CATEGORY = "ability" as const;
const DAMAGE_COUNTER_DPS_INTERVAL = 0.25;

@reloadable
class CDamageCounter extends CModule {
    private playerDamageCount: CountDamagePlayerStore = {};
    private enabled: boolean = true;
    private dpsTimerID?: string;
    private playerDPSTracking: Partial<Record<PlayerID, {
        windowDamage: number;
        windowStartTime: number;
        maxDamagePerSecond: number;
    }>> = {};

    init(reload: boolean): void {
        if (!reload) {
            this.playerDamageCount = {};
            this.playerDPSTracking = {};
            this.enabled = true;
        }

        Event.Register("game_start", this.ClearDamageCount, this);
        Event.Register("damage_event", this.CountDamageFromDamageEvent, this);

        if (this.dpsTimerID === undefined) {
            this.dpsTimerID = Timer.GameTimer(DAMAGE_COUNTER_DPS_INTERVAL, () => {
                if (this.dpsTimerID === undefined) {
                    return undefined;
                }

                this.UpdateDamagePerSecond();
                return DAMAGE_COUNTER_DPS_INTERVAL;
            });
        }
    }

    initPriority(): number {
        return 100;
    }

    reset(): void {
        this.ClearDamageCount();
    }

    IsEnabled(): boolean {
        return this.enabled;
    }

    CountDamage(param: CountDamageParam): void {
        if (!this.enabled || param.damage <= 0) {
            return;
        }

        const playerResult = this.GetOrCreatePlayerResult(param.owner);
        if (playerResult === undefined) {
            return;
        }

        playerResult.totalDamage += param.damage;
        playerResult.count += 1;

        if (param.abilityName !== undefined && param.abilityName !== "") {
            this.CountAbilityDamage(playerResult, param.abilityName, param.damage);
        }

        this.playerDPSTracking[playerResult.playerID] ??= {
            windowDamage: 0,
            windowStartTime: GameRules.GetGameTime(),
            maxDamagePerSecond: 0,
        };
        this.playerDPSTracking[playerResult.playerID]!.windowDamage += param.damage;
    }

    CountDamageFromDamageEvent(event: DamageEvent): void {
        if (event.damage <= 0) {
            return;
        }

        this.CountDamage({
            owner: event.attacker,
            damage: event.damage,
            abilityName: this.GetAbilityNameFromDamageEvent(event),
        });
    }

    ClearDamageCount(): void {
        this.playerDamageCount = {};
        this.playerDPSTracking = {};
    }

    GetPlayerDamageCount(playerID: PlayerID, defaultVar?: CountDamagePlayerResult) {
        const result = this.playerDamageCount[playerID];
        if (result === undefined) {
            return defaultVar;
        }

        return this.ClonePlayerDamageResult(result);
    }

    GetPlayerMaxDamagePerSecond(playerID: PlayerID, defaultVar?: number) {
        const tracking = this.playerDPSTracking[playerID];
        if (tracking === undefined) {
            return defaultVar;
        }
        return tracking.maxDamagePerSecond;
    }

    private GetOrCreatePlayerResult(owner: CDOTA_BaseNPC): CountDamagePlayerResult | undefined {
        const playerID = this.GetOwnerPlayerID(owner);
        if (playerID === undefined) {
            return undefined;
        }

        const snapshotOwner = this.GetPlayerSnapshotOwner(playerID, owner);
        const ownerEntityIndex = this.GetOwnerEntityIndex(snapshotOwner);
        if (ownerEntityIndex === undefined) {
            return undefined;
        }

        const ownerName = snapshotOwner.GetUnitName();

        this.playerDamageCount[playerID] ??= {
            playerID,
            ownerEntityIndex,
            ownerName,
            totalDamage: 0,
            count: 0,
            categories: {},
        };

        this.playerDamageCount[playerID]!.ownerEntityIndex = ownerEntityIndex;
        this.playerDamageCount[playerID]!.ownerName = ownerName;
        return this.playerDamageCount[playerID];
    }

    private CountAbilityDamage(playerResult: CountDamagePlayerResult, abilityName: string, damage: number): void {
        playerResult.categories[COUNT_DAMAGE_ABILITY_CATEGORY] ??= {};
        const abilityResult = playerResult.categories[COUNT_DAMAGE_ABILITY_CATEGORY]!;
        abilityResult[abilityName] ??= {
            category: COUNT_DAMAGE_ABILITY_CATEGORY,
            key: abilityName,
            totalDamage: 0,
            count: 0,
        };
        abilityResult[abilityName].totalDamage += damage;
        abilityResult[abilityName].count += 1;
    }

    private GetAbilityNameFromDamageEvent(event: DamageEvent): string | undefined {
        if (event.ability === undefined || !IsValid(event.ability)) {
            return undefined;
        }

        const abilityName = event.ability.GetAbilityName();
        return abilityName !== "" ? abilityName : undefined;
    }

    private GetOwnerEntityIndex(owner: CDOTA_BaseNPC): EntityIndex | undefined {
        if (!IsValid(owner)) {
            return undefined;
        }

        return owner.GetEntityIndex();
    }

    private GetOwnerPlayerID(owner: CDOTA_BaseNPC): PlayerID | undefined {
        if (!IsValid(owner)) {
            return undefined;
        }

        const playerID = owner.GetPlayerOwnerID();
        if (playerID === undefined || playerID < 0) {
            return undefined;
        }

        return playerID as PlayerID;
    }

    private GetPlayerSnapshotOwner(playerID: PlayerID, fallbackOwner: CDOTA_BaseNPC): CDOTA_BaseNPC {
        const hero = PlayerResource.GetSelectedHeroEntity(playerID);
        if (IsValid(hero)) {
            return hero;
        }

        return fallbackOwner;
    }

    private UpdateDamagePerSecond(): void {
        const currentTime = GameRules.GetGameTime();
        for (const [, tracking] of pairs(this.playerDPSTracking as any)) {
            const t = tracking as { windowDamage: number; windowStartTime: number; maxDamagePerSecond: number };
            const elapsed = currentTime - t.windowStartTime;
            if (elapsed >= 1.0) {
                if (t.windowDamage > 0) {
                    const currentDPS = t.windowDamage / elapsed;
                    if (currentDPS > t.maxDamagePerSecond) {
                        t.maxDamagePerSecond = currentDPS;
                    }
                }
                t.windowDamage = 0;
                t.windowStartTime = currentTime;
            }
        }
    }

    private CloneTagResult(result: CountDamageResult): CountDamageResult {
        const clonedResult: CountDamageResult = {};
        for (const [tag, node] of pairs(result as any)) {
            clonedResult[tag as string] = this.CloneTagNode(node as CountDamageNode);
        }
        return clonedResult;
    }

    private CloneCategoryResult(result: CountDamageCategoryResult): CountDamageCategoryResult {
        const clonedResult: CountDamageCategoryResult = {};
        for (const [category, categoryResult] of pairs(result as any)) {
            clonedResult[category as CountDamageTagCategory] = this.CloneTagResult(categoryResult as CountDamageResult);
        }
        return clonedResult;
    }

    private CloneTagNode(result: CountDamageNode): CountDamageNode {
        return {
            category: result.category,
            key: result.key,
            totalDamage: result.totalDamage,
            count: result.count,
        };
    }

    private ClonePlayerDamageResult(result: CountDamagePlayerResult): CountDamagePlayerResult {
        return {
            playerID: result.playerID,
            ownerEntityIndex: result.ownerEntityIndex,
            ownerName: result.ownerName,
            totalDamage: result.totalDamage,
            count: result.count,
            categories: this.CloneCategoryResult(result.categories),
        };
    }
}

declare global {
    var DamageCounter: CDamageCounter;
}

DamageCounter ??= new CDamageCounter();
