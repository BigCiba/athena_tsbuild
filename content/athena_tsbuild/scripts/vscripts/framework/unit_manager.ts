import { reloadable } from "../lib/tstl-utils";

declare var FindUnitsInRadius_Engine: typeof FindUnitsInRadius;
declare var FindUnitsInLine_Engine: typeof FindUnitsInLine;

enum UnitSearchShape {
	RADIUS = "radius",
	LINE = "line",
	SECTOR = "sector",
	TRUNCATED_SECTOR = "truncated_sector",
}

interface UnitSearchBaseOptions {
	teamNumber: DOTATeam_t;
	teamFilter: DOTA_UNIT_TARGET_TEAM;
	typeFilter: DOTA_UNIT_TARGET_TYPE;
	flagFilter: DOTA_UNIT_TARGET_FLAGS;
	order?: FindOrder;
	canGrowCache?: boolean;
}

interface UnitSearchRadiusOptions extends UnitSearchBaseOptions {
	shape: UnitSearchShape.RADIUS;
	position: Vector;
	radius: number;
}

interface UnitSearchLineOptions extends UnitSearchBaseOptions {
	shape: UnitSearchShape.LINE;
	start: Vector;
	end: Vector;
	width: number;
}

interface UnitSearchSectorOptions extends UnitSearchBaseOptions {
	shape: UnitSearchShape.SECTOR;
	position: Vector;
	radius: number;
	forwardVector: Vector;
	angle: number;
}

interface UnitSearchTruncatedSectorOptions extends UnitSearchBaseOptions {
	shape: UnitSearchShape.TRUNCATED_SECTOR;
	position: Vector;
	innerRadius: number;
	outerRadius: number;
	forwardVector: Vector;
	angle: number;
}

type UnitSearchOptions = UnitSearchRadiusOptions | UnitSearchLineOptions | UnitSearchSectorOptions | UnitSearchTruncatedSectorOptions;

interface UnitGridRecord {
	unit: CDOTA_BaseNPC;
	cellKey: string;
	entindex: EntityIndex;
}

interface SearchBounds {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
}

const DEFAULT_UNIT_MANAGER_CELL_SIZE = 512;
const DEFAULT_UNIT_MANAGER_UPDATE_INTERVAL = 0.1;

@reloadable
class CUnitManager extends CModule {
	useEngineFallbackOnMismatch = false;
	private cellSize = DEFAULT_UNIT_MANAGER_CELL_SIZE;
	private updateInterval = DEFAULT_UNIT_MANAGER_UPDATE_INTERVAL;
	private updateTimerId?: string;
	private cells: Record<string, CDOTA_BaseNPC[]> = {};
	private unitRecords: Partial<Record<EntityIndex, UnitGridRecord>> = {};
	private ready = false;

	initPriority() {
		return 8;
	}

	init(reload: boolean) {
		this.Clear();
		this.CollectExistingUnits();
		this.StartGridUpdate();
		Event.Register("npc_spawned", this.OnNPCSpawned, this);
		GameEvent("npc_spawned", this.OnGameNPCSpawned, this);
		this.ready = true;
		GameEvent("entity_killed", function (...args) { return this.OnEntityKilled(...args); }, this);
	}

	reset() {
		this.Clear();
		this.CollectExistingUnits();
		this.StartGridUpdate();
		this.ready = true;
	}

	SetCellSize(cellSize: number) {
		this.cellSize = math.max(128, cellSize);
		this.RebuildGrid();
	}

	SetUpdateInterval(interval: number) {
		this.updateInterval = math.max(FrameTime(), interval);
		this.StartGridUpdate();
	}

	AddUnit(unit: CDOTA_BaseNPC | undefined) {
		if (!this.IsSearchableUnit(unit)) return;
		this.UpdateUnitGrid(unit);
	}

	HasUnit(unit: CDOTA_BaseNPC | undefined) {
		if (!IsValid(unit)) return false;
		return this.unitRecords[unit.entindex()] != undefined;
	}

	IsUnitIndexValid(unit: CDOTA_BaseNPC | undefined) {
		if (!this.IsSearchableUnit(unit)) return false;
		const entindex = unit.entindex();
		const record = this.unitRecords[entindex];
		if (record == undefined) return false;
		const cellKey = this.GetCellKey(unit.GetAbsOrigin());
		const cell = this.cells[cellKey];
		return record.cellKey == cellKey && this.CellHasUnit(cell, entindex);
	}

	RepairUnitIndex(unit: CDOTA_BaseNPC | undefined) {
		if (!this.IsSearchableUnit(unit)) return false;
		this.RemoveUnitFromAllCells(unit.entindex());
		this.UpdateUnitGrid(unit);
		return this.IsUnitIndexValid(unit);
	}

	GetUnitIndexReport(unit: CDOTA_BaseNPC | undefined) {
		if (!IsValid(unit)) return { valid: false };
		const entindex = unit.entindex();
		const position = unit.GetAbsOrigin();
		const currentCellKey = this.GetCellKey(position);
		const record = this.unitRecords[entindex];
		return {
			valid: true,
			entindex,
			name: unit.GetUnitName(),
			team: unit.GetTeamNumber(),
			position: this.GetReportVector(position),
			currentCellKey,
			recordCellKey: record?.cellKey,
			hasRecord: record != undefined,
			inCurrentCell: this.CellHasUnit(this.cells[currentCellKey], entindex),
			inRecordCell: record != undefined ? this.CellHasUnit(this.cells[record.cellKey], entindex) : false,
		};
	}

	RemoveUnit(unit: CDOTA_BaseNPC | undefined) {
		if (!IsValid(unit)) return;
		const entindex = unit.entindex();
		const record = this.unitRecords[entindex];
		if (record == undefined) return;
		this.RemoveUnitFromCell(entindex, record.cellKey);
		delete this.unitRecords[entindex];
	}

	Clear() {
		this.ready = false;
		if (this.updateTimerId != undefined && Timer != undefined) {
			Timer.StopTimer(this.updateTimerId);
			this.updateTimerId = undefined;
		}
		this.cells = {};
		this.unitRecords = {};
	}

	IsReady() {
		return this.ready;
	}

	FindUnits(options: UnitSearchOptions): CDOTA_BaseNPC[] {
		const bounds = this.GetSearchBounds(options);
		const candidates = this.GetUnitsInBounds(bounds);
		const result: CDOTA_BaseNPC[] = [];
		const seen: Partial<Record<EntityIndex, boolean>> = {};

		for (const unit of candidates) {
			if (!this.IsSearchableUnit(unit)) {
				this.RemoveUnit(unit);
				continue;
			}

			const entindex = unit.entindex();
			if (seen[entindex] === true) continue;
			seen[entindex] = true;

			if (!this.MatchUnitFilter(unit, options)) continue;
			if (!this.MatchShape(unit, options)) continue;
			result.push(unit);
		}

		this.SortUnits(result, options);
		return result;
	}

	FindUnitsInRadius(teamNumber: DOTATeam_t, position: Vector, radius: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS, order: FindOrder = FindOrder.FIND_ANY_ORDER) {
		const options: UnitSearchRadiusOptions = {
			shape: UnitSearchShape.RADIUS,
			teamNumber,
			position,
			radius,
			teamFilter,
			typeFilter,
			flagFilter,
			order,
		};
		const units = this.FindUnits(options);
		const engineUnits = this.useEngineFallbackOnMismatch ? FindUnitsInRadius_Engine?.(teamNumber, position, undefined, radius, teamFilter, typeFilter, flagFilter, order, false) : undefined;
		return this.UseEngineFallbackIfMismatch(units, engineUnits, options);
	}

	FindUnitsInLine(teamNumber: DOTATeam_t, start: Vector, end: Vector, width: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS, order: FindOrder = FindOrder.FIND_ANY_ORDER) {
		const options: UnitSearchLineOptions = {
			shape: UnitSearchShape.LINE,
			teamNumber,
			start,
			end,
			width,
			teamFilter,
			typeFilter,
			flagFilter,
			order,
		};
		const units = this.FindUnits(options);
		const engineUnits = this.useEngineFallbackOnMismatch ? FindUnitsInLine_Engine?.(teamNumber, start, end, undefined, width, teamFilter, typeFilter, flagFilter) : undefined;
		return this.UseEngineFallbackIfMismatch(units, engineUnits, options);
	}

	FindUnitsInSector(teamNumber: DOTATeam_t, position: Vector, radius: number, forwardVector: Vector, angle: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS, order: FindOrder = FindOrder.FIND_ANY_ORDER) {
		return this.FindUnits({
			shape: UnitSearchShape.SECTOR,
			teamNumber,
			position,
			radius,
			forwardVector,
			angle,
			teamFilter,
			typeFilter,
			flagFilter,
			order,
		});
	}

	FindUnitsInTruncatedSector(teamNumber: DOTATeam_t, position: Vector, innerRadius: number, outerRadius: number, forwardVector: Vector, angle: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS, order: FindOrder = FindOrder.FIND_ANY_ORDER) {
		return this.FindUnits({
			shape: UnitSearchShape.TRUNCATED_SECTOR,
			teamNumber,
			position,
			innerRadius,
			outerRadius,
			forwardVector,
			angle,
			teamFilter,
			typeFilter,
			flagFilter,
			order,
		});
	}

	FindUnitsInRadiusWithAbility(caster: CDOTA_BaseNPC, position: Vector, radius: number, ability: CDOTABaseAbility, order: FindOrder = FindOrder.FIND_ANY_ORDER) {
		if (!IsValid(caster) || !IsValid(ability)) return [] as CDOTA_BaseNPC[];
		return this.FindUnitsInRadius(caster.GetTeamNumber(), position, radius, ability.GetAbilityTargetTeam(), ability.GetAbilityTargetType(), ability.GetAbilityTargetFlags(), order);
	}

	private OnNPCSpawned(event: EventCallback["npc_spawned"]) {
		this.AddUnit(event.unit);
	}

	private OnGameNPCSpawned(event: EventProperties<"npc_spawned">) {
		this.AddUnit(EntIndexToHScript(event.entindex) as CDOTA_BaseNPC);
	}

	private OnEntityKilled(event: EventProperties<"entity_killed">) {
		const killedUnit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;
		if (!IsValid(killedUnit)) return;
		this.RemoveUnit(killedUnit);
	}

	private StartGridUpdate() {
		if (this.updateTimerId != undefined) {
			Timer.StopTimer(this.updateTimerId);
			this.updateTimerId = undefined;
		}

		this.updateTimerId = Timer.GameTimer(this.updateInterval, () => {
			this.RefreshMovedUnits();
			return this.updateInterval;
		});
	}

	private CollectExistingUnits() {
		const units = Entities.FindAllByClassname("npc_dota_*") as CDOTA_BaseNPC[];
		for (const unit of units) {
			this.AddUnit(unit);
		}
	}

	private RefreshMovedUnits() {
		const removedUnits: CDOTA_BaseNPC[] = [];
		const updatedUnits: CDOTA_BaseNPC[] = [];

		for (const [_, record] of pairs(this.unitRecords)) {
			if (record == undefined || !this.IsSearchableUnit(record.unit)) {
				if (record != undefined) {
					removedUnits.push(record.unit);
				}
				continue;
			}
			updatedUnits.push(record.unit);
		}

		for (const unit of removedUnits) {
			this.RemoveUnit(unit);
		}

		for (const unit of updatedUnits) {
			this.UpdateUnitGrid(unit);
		}
	}

	private RebuildGrid() {
		this.cells = {};
		for (const [_, record] of pairs(this.unitRecords)) {
			if (record != undefined && this.IsSearchableUnit(record.unit)) {
				record.cellKey = this.GetCellKey(record.unit.GetAbsOrigin());
				this.cells[record.cellKey] ??= [];
				this.cells[record.cellKey].push(record.unit);
			}
		}
	}

	private UpdateUnitGrid(unit: CDOTA_BaseNPC) {
		const entindex = unit.entindex();
		const cellKey = this.GetCellKey(unit.GetAbsOrigin());
		const record = this.unitRecords[entindex];
		if (record != undefined) {
			if (record.cellKey != cellKey) {
				this.RemoveUnitFromCell(entindex, record.cellKey);
				record.cellKey = cellKey;
			}
			record.unit = unit;
		} else {
			this.unitRecords[entindex] = {
				unit,
				cellKey,
				entindex,
			};
		}
		this.cells[cellKey] ??= [];
		if (!this.CellHasUnit(this.cells[cellKey], entindex)) {
			this.cells[cellKey].push(unit);
		}
	}

	private RemoveUnitFromCell(entindex: EntityIndex, cellKey: string) {
		const cell = this.cells[cellKey];
		if (cell == undefined) return;
		for (let i = cell.length - 1; i >= 0; i--) {
			const unit = cell[i];
			if (!IsValid(unit) || unit.entindex() == entindex) {
				cell.splice(i, 1);
			}
		}
		if (cell.length == 0) {
			delete this.cells[cellKey];
		}
	}

	private RemoveUnitFromAllCells(entindex: EntityIndex) {
		const cellKeys: string[] = [];
		for (const [cellKey] of pairs(this.cells)) {
			cellKeys.push(cellKey);
		}
		for (const cellKey of cellKeys) {
			this.RemoveUnitFromCell(entindex, cellKey);
		}
	}

	private CellHasUnit(cell: CDOTA_BaseNPC[] | undefined, entindex: EntityIndex) {
		if (cell == undefined) return false;
		for (const unit of cell) {
			if (IsValid(unit) && unit.entindex() == entindex) return true;
		}
		return false;
	}

	private GetUnitsInBounds(bounds: SearchBounds) {
		const units: CDOTA_BaseNPC[] = [];
		const minCellX = this.GetCellIndex(bounds.minX);
		const maxCellX = this.GetCellIndex(bounds.maxX);
		const minCellY = this.GetCellIndex(bounds.minY);
		const maxCellY = this.GetCellIndex(bounds.maxY);

		for (const x of $range(minCellX, maxCellX, 1)) {
			for (const y of $range(minCellY, maxCellY, 1)) {
				const cell = this.cells[this.MakeCellKey(x, y)];
				if (cell != undefined) {
					for (const unit of cell) {
						units.push(unit);
					}
				}
			}
		}

		return units;
	}

	private UseEngineFallbackIfMismatch(units: CDOTA_BaseNPC[], engineUnits: CDOTA_BaseNPC[] | undefined, options: UnitSearchOptions) {
		if (engineUnits == undefined) return units;
		if (this.IsSameUnitList(units, engineUnits)) return units;

		// this.ReportSearchMismatch(units, engineUnits, options);
		for (const unit of engineUnits) {
			this.AddUnit(unit);
		}
		return engineUnits;
	}

	private IsSameUnitList(a: CDOTA_BaseNPC[], b: CDOTA_BaseNPC[]) {
		if (a.length != b.length) return false;
		for (const i of $range(0, a.length - 1, 1)) {
			if (!IsValid(a[i]) || !IsValid(b[i]) || a[i].entindex() != b[i].entindex()) return false;
		}
		return true;
	}

	private ReportSearchMismatch(units: CDOTA_BaseNPC[], engineUnits: CDOTA_BaseNPC[], options: UnitSearchOptions) {
		if (CommonService == undefined) return;
		CommonService.CallAction("/v1/log/report", 0, {
			level: "Server",
			message: `[UnitManager] FindUnits mismatch ${json.encode({
				options: this.GetReportOptions(options),
				unitManager: this.GetReportUnits(units),
				engine: this.GetReportUnits(engineUnits),
				missingFromUnitManager: this.GetMissingUnitReport(units, engineUnits),
				extraFromUnitManager: this.GetMissingUnitReport(engineUnits, units),
			})}`,
		});
	}

	private GetReportOptions(options: UnitSearchOptions) {
		const data: any = {
			shape: options.shape,
			teamNumber: options.teamNumber,
			teamFilter: options.teamFilter,
			typeFilter: options.typeFilter,
			flagFilter: options.flagFilter,
			order: options.order,
		};

		if (options.shape == UnitSearchShape.RADIUS) {
			data.position = this.GetReportVector(options.position);
			data.radius = options.radius;
		} else if (options.shape == UnitSearchShape.LINE) {
			data.start = this.GetReportVector(options.start);
			data.end = this.GetReportVector(options.end);
			data.width = options.width;
		} else if (options.shape == UnitSearchShape.SECTOR) {
			data.position = this.GetReportVector(options.position);
			data.radius = options.radius;
			data.forwardVector = this.GetReportVector(options.forwardVector);
			data.angle = options.angle;
		} else {
			data.position = this.GetReportVector(options.position);
			data.innerRadius = options.innerRadius;
			data.outerRadius = options.outerRadius;
			data.forwardVector = this.GetReportVector(options.forwardVector);
			data.angle = options.angle;
		}

		return data;
	}

	private GetReportUnits(units: CDOTA_BaseNPC[]) {
		const result: any[] = [];
		for (const unit of units) {
			result.push(this.GetReportUnit(unit));
		}
		return result;
	}

	private GetMissingUnitReport(baseUnits: CDOTA_BaseNPC[], compareUnits: CDOTA_BaseNPC[]) {
		const baseSet: Partial<Record<EntityIndex, boolean>> = {};
		for (const unit of baseUnits) {
			if (IsValid(unit)) {
				baseSet[unit.entindex()] = true;
			}
		}

		const result: any[] = [];
		for (const unit of compareUnits) {
			if (IsValid(unit) && baseSet[unit.entindex()] != true) {
				result.push(this.GetReportUnit(unit));
			}
		}
		return result;
	}

	private GetReportUnit(unit: CDOTA_BaseNPC) {
		if (!IsValid(unit)) {
			return { valid: false };
		}
		return {
			valid: true,
			entindex: unit.entindex(),
			name: unit.GetUnitName(),
			team: unit.GetTeamNumber(),
			position: this.GetReportVector(unit.GetAbsOrigin()),
			cellKey: this.GetCellKey(unit.GetAbsOrigin()),
			inUnitRecords: this.unitRecords[unit.entindex()] != undefined,
		};
	}

	private GetReportVector(position: Vector) {
		return {
			x: math.floor(position.x),
			y: math.floor(position.y),
			z: math.floor(position.z),
		};
	}

	private GetSearchBounds(options: UnitSearchOptions): SearchBounds {
		if (options.shape == UnitSearchShape.RADIUS) {
			return this.BoundsFromCenter(options.position, options.radius);
		}

		if (options.shape == UnitSearchShape.LINE) {
			return {
				minX: math.min(options.start.x, options.end.x) - options.width,
				maxX: math.max(options.start.x, options.end.x) + options.width,
				minY: math.min(options.start.y, options.end.y) - options.width,
				maxY: math.max(options.start.y, options.end.y) + options.width,
			};
		}

		if (options.shape == UnitSearchShape.SECTOR) {
			return this.BoundsFromCenter(options.position, options.radius);
		}

		return this.BoundsFromCenter(options.position, options.outerRadius);
	}

	private BoundsFromCenter(position: Vector, radius: number): SearchBounds {
		return {
			minX: position.x - radius,
			maxX: position.x + radius,
			minY: position.y - radius,
			maxY: position.y + radius,
		};
	}

	private MatchShape(unit: CDOTA_BaseNPC, options: UnitSearchOptions) {
		if (options.shape == UnitSearchShape.RADIUS) {
			return unit.IsPositionInRange(options.position, options.radius + unit.GetHullRadius());
		}

		if (options.shape == UnitSearchShape.LINE) {
			return this.IsUnitInLine(unit, options.start, options.end, options.width);
		}

		if (options.shape == UnitSearchShape.SECTOR) {
			return this.IsUnitInSector(unit, options.position, 0, options.radius, options.forwardVector, options.angle);
		}

		return this.IsUnitInSector(unit, options.position, options.innerRadius, options.outerRadius, options.forwardVector, options.angle);
	}

	private IsUnitInLine(unit: CDOTA_BaseNPC, start: Vector, end: Vector, width: number) {
		const position = unit.GetAbsOrigin();
		const segment = Vsub(end, start);
		segment.z = 0;
		const lengthSq = segment.x * segment.x + segment.y * segment.y;
		if (lengthSq <= 0) {
			return unit.IsPositionInRange(start, width + unit.GetHullRadius());
		}

		const toUnit = Vsub(position, start);
		toUnit.z = 0;
		const t = Clamp((toUnit.x * segment.x + toUnit.y * segment.y) / lengthSq, 0, 1);
		const closest = Vector(start.x + segment.x * t, start.y + segment.y * t, start.z + (end.z - start.z) * t);
		return unit.IsPositionInRange(closest, width + unit.GetHullRadius());
	}

	private IsUnitInSector(unit: CDOTA_BaseNPC, position: Vector, innerRadius: number, outerRadius: number, forwardVector: Vector, angle: number) {
		if (VectorIsZero(forwardVector) || outerRadius <= 0 || angle <= 0 || innerRadius >= outerRadius) return false;

		const targetVector = Vsub(unit.GetAbsOrigin(), position);
		targetVector.z = 0;
		if (VectorIsZero(targetVector)) return innerRadius <= 0;

		const direction = Vector(forwardVector.x, forwardVector.y, 0).Normalized();
		const distance = targetVector.Length2D();
		if (distance > outerRadius + unit.GetHullRadius()) return false;

		const theta = math.deg(Math.acos(Clamp(direction.Dot(targetVector.Normalized()), -1, 1)));
		if (theta > angle / 2) return false;

		if (innerRadius <= 0) return true;
		const innerChordDepth = innerRadius * math.cos(math.rad(angle / 2));
		const forwardDistance = direction.Dot(targetVector);
		return forwardDistance + unit.GetHullRadius() >= innerChordDepth;
	}

	private MatchUnitFilter(unit: CDOTA_BaseNPC, options: UnitSearchBaseOptions) {
		return UnitFilter(unit, options.teamFilter, options.typeFilter, options.flagFilter, options.teamNumber) == UnitFilterResult.UF_SUCCESS;
	}

	private SortUnits(units: CDOTA_BaseNPC[], options: UnitSearchOptions) {
		const order = options.order ?? FindOrder.FIND_ANY_ORDER;
		if (order == FindOrder.FIND_ANY_ORDER) return;

		const origin = this.GetOrderOrigin(options);
		units.sort((a, b) => {
			const da = VectorDistanceSq(a.GetAbsOrigin(), origin);
			const db = VectorDistanceSq(b.GetAbsOrigin(), origin);
			return order == FindOrder.FIND_CLOSEST ? da - db : db - da;
		});
	}

	private GetOrderOrigin(options: UnitSearchOptions) {
		if (options.shape == UnitSearchShape.LINE) return options.start;
		return options.position;
	}

	private IsSearchableUnit(unit: CDOTA_BaseNPC | undefined): unit is CDOTA_BaseNPC {
		return IsValid(unit) && typeof unit.GetAbsOrigin == "function" && typeof unit.GetTeamNumber == "function";
	}

	private GetCellKey(position: Vector) {
		return this.MakeCellKey(this.GetCellIndex(position.x), this.GetCellIndex(position.y));
	}

	private GetCellIndex(value: number) {
		return math.floor(value / this.cellSize);
	}

	private MakeCellKey(x: number, y: number) {
		return `${x}_${y}`;
	}
}

declare global {
	type UnitManagerSearchOptions = UnitSearchOptions;
	var UNIT_SEARCH_SHAPE: typeof UnitSearchShape;
	var UnitManager: CUnitManager;
}

_G.UNIT_SEARCH_SHAPE = UnitSearchShape;
UnitManager ??= new CUnitManager();

const globalTable = _G as any;
if (globalTable.FindUnitsInRadius_Engine == undefined) {
	globalTable.FindUnitsInRadius_Engine = FindUnitsInRadius;
	globalTable.FindUnitsInRadius = ((teamNumber: DOTATeam_t, position: Vector, cacheUnit: CBaseEntity | undefined, radius: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS, order: FindOrder, canGrowCache: boolean) => {
		if (UnitManager != undefined && UnitManager.IsReady()) {
			return UnitManager.FindUnitsInRadius(teamNumber, position, radius, teamFilter, typeFilter, flagFilter, order);
		}
		return FindUnitsInRadius_Engine(teamNumber, position, cacheUnit, radius, teamFilter, typeFilter, flagFilter, order, canGrowCache);
	}) as typeof FindUnitsInRadius;
}

if (globalTable.FindUnitsInLine_Engine == undefined) {
	globalTable.FindUnitsInLine_Engine = FindUnitsInLine;
	globalTable.FindUnitsInLine = ((teamNumber: DOTATeam_t, start: Vector, end: Vector, cacheUnit: CBaseEntity | undefined, width: number, teamFilter: DOTA_UNIT_TARGET_TEAM, typeFilter: DOTA_UNIT_TARGET_TYPE, flagFilter: DOTA_UNIT_TARGET_FLAGS) => {
		if (UnitManager != undefined && UnitManager.IsReady()) {
			return UnitManager.FindUnitsInLine(teamNumber, start, end, width, teamFilter, typeFilter, flagFilter);
		}
		return FindUnitsInLine_Engine(teamNumber, start, end, cacheUnit, width, teamFilter, typeFilter, flagFilter);
	}) as typeof FindUnitsInLine;
}
