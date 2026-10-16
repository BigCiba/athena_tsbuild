import { reloadable } from "../lib/tstl-utils";

/** NPC 实体注册、范围交互与局内清理；不持有任务规则或 DialogEvent 列表。 */
@reloadable
export class CNPC extends CModule {
	private units: { unit: CDOTA_BaseNPC; index: EntityIndex; runId: number; inside: Record<number, boolean>; }[] = [];
	private timer?: string;
	private runId = 0;
	init(reload: boolean) {
		Event.UnregisterContext(this);
		Event.Register("game_start", event => this.Start(event.runId!), this);
		Event.Register("game_end", event => { if (event.run_id === this.runId) this.Stop(); }, this);
		Event.Register("game_reset", event => this.Clear(event.runId), this);
		CustomUIEvent("npc_interact", data => {
			const record = this.units.find(value => value.index === data.npc && value.runId === data.runId);
			if (record && this.timer) this.Interact(data.PlayerID, record);
		}, this);
	}
	CreateNPC(name: string, position: Vector, forward: Vector, runId: number) {
		const unit = CreateUnitByName(name, position, true, undefined, undefined, DOTATeam_t.DOTA_TEAM_GOODGUYS);
		if (!IsValid(unit)) throw `任务 NPC 创建失败：${name}`;
		this.units.push({ unit, index: unit.entindex(), runId, inside: {} });
		unit.SetForwardVector(forward);
		unit.AddNewModifier(unit, undefined, "modifier_npc", {});
		this.Publish();
		return unit;
	}
	private Interact(playerID: PlayerID, record: typeof this.units[number]) {
		const hero = PlayerResource.GetSelectedHeroEntity(playerID);
		if (!IsValid(record.unit) || !IsValid(hero) || !hero.IsRealHero() || !hero.IsAlive() || CalcDistance(hero, record.unit) > 400) return;
		Event.Fire("npc_interact", { playerID, npc: record.unit, runId: record.runId });
	}
	private Start(runId: number) {
		if (runId !== GameState.GetSession().runId || GameState.GetSession().state !== "GameState_Battle" || (this.timer && this.runId === runId)) return;
		this.Stop();
		this.runId = runId;
		this.timer = Timer.GameTimer(0.2, () => {
			if (!this.timer || this.runId !== runId || GameState.GetSession().runId !== runId || GameState.GetSession().state !== "GameState_Battle") return;
			Game.EachPlayer(playerID => {
				const hero = PlayerResource.GetSelectedHeroEntity(playerID);
				for (const record of this.units) {
					if (record.runId !== runId) continue;
					const inside = IsValid(hero) && hero.IsAlive() && IsValid(record.unit) && CalcDistance(hero, record.unit) <= 400;
					if (inside && !record.inside[playerID]) this.Interact(playerID, record);
					record.inside[playerID] = inside;
				}
			});
			return 0.2;
		});
	}
	private Stop() { if (this.timer) Timer.StopTimer(this.timer); this.timer = undefined; }
	private Clear(runId: number) {
		if (runId === this.runId) this.Stop();
		for (let i = this.units.length - 1; i >= 0; i--) {
			const record = this.units[i];
			if (record.runId !== runId) continue;
			if (IsValid(record.unit)) UTIL_Remove(record.unit);
			const current = EntIndexToHScript(record.index);
			if (!IsValid(current) || current === record.unit) {
				PropertySystem.CleanupUnitPropertiesByIndex(record.index); StateSystem.CleanupUnitStatesByIndex(record.index); AbilityUpgrade.CleanupUnitUpgrades(record.index);
			}
			this.units.splice(i, 1);
		}
		this.Publish();
	}
	private Publish() {
		const data: CustomNetTableDeclarations["common"]["npcs"] = {};
		for (const record of this.units) if (IsValid(record.unit)) data[tostring(record.index)] = { name: record.unit.GetUnitName(), runId: record.runId };
		CustomNetTables.SetTableValue("common", "npcs", data);
	}
}
declare global { var NPC: CNPC; }
NPC ??= new CNPC();
