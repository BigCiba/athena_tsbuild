import { createSignal, For, ParentComponent } from "solid-js";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Breadcrumb } from "../../../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { EOM_Segmented } from "../../../../components/EOMDesign/Navigation/EOM_Segmented/EOM_Segmented";
import { EOM_DropDown } from "../../../../components/EOMDesign/Input/EOM_DropDown/EOM_DropDown";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { PortraitsFullBodyLoadout } from "../../../../components/portraits/portraitsFullBodyLoadout";
import { DynamicKey } from "../../../../utils/solid_utils";
import { Pinyin } from "../../pinyin";
import "./unit_picker.less";

const CATEGORY_KEYS = ["enemies", "boss", "breakable", "interact", "summon"] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

const CATEGORY_LABEL_MAP: Record<CategoryKey, string> = {
	enemies: "敌人",
	boss: "Boss",
	breakable: "可破坏",
	interact: "交互",
	summon: "召唤",
};

const SEGMENT_LABELS = ["全部", ...CATEGORY_KEYS.map(k => CATEGORY_LABEL_MAP[k])];

const DIFFICULTY_OPTIONS = [
	{ value: 0, label: "无难度" },
	{ value: 1, label: "难度1" },
	{ value: 2, label: "难度2" },
	{ value: 3, label: "难度3" },
	{ value: 4, label: "难度4" },
	{ value: 5, label: "难度5" },
	{ value: 6, label: "难度6" },
	{ value: 7, label: "难度7" },
	{ value: 8, label: "难度8" },
	{ value: 9, label: "难度9" },
	{ value: 10, label: "难度10" },
	{ value: 11, label: "难度11" },
	{ value: 12, label: "难度12" },
];

const getCategorySource = (key: CategoryKey): Record<string, any> => {
	return (KeyValues as any)[key] ?? {};
};

const getAllCategorySource = (): Record<string, any> => {
	const result: Record<string, any> = {};
	for (let i = 0; i < CATEGORY_KEYS.length; i++) {
		const src = getCategorySource(CATEGORY_KEYS[i]);
		for (const key in src) {
			result[key] = src[key];
		}
	}
	return result;
};

type UnitMeta = {
	unitName: string;
	localizedName: string;
	xp: string;
	gold: string;
	hp: string;
	attack: string;
};

type KVRow = {
	key: string;
	value: string;
	depth: number;
	isLeaf: boolean;
};

/** 单位选择器 */
export const UnitPicker: ParentComponent = () => {
	const title = "单位选择器";
	const getValidUnits = (source: Record<string, any>): string[] => {
		const units: string[] = [];
		for (const unitName in source) {
			if (unitName === "Version") continue;
			const unitData = source[unitName];
			if (typeof unitData !== "object") continue;
			units.push(unitName);
		}
		return units;
	};
	const [segmentIndex, setSegmentIndex] = createSignal(0);
	const getUnitListBySegment = (idx: number): string[] => {
		if (idx === 0) {
			return getValidUnits(getAllCategorySource());
		}
		return getValidUnits(getCategorySource(CATEGORY_KEYS[idx - 1]));
	};
	const [itemList, setItemList] = createSignal(getUnitListBySegment(0));
	const [filterWord, setFilterWord] = createSignal("");
	const [selectedUnitName, setSelectedUnitName] = createSignal(itemList()[0] ?? "");
	const [previewTabIndex, setPreviewTabIndex] = createSignal(0);
	const [difficulty, setDifficulty] = createSignal(0);

	const getUnitKV = (unitName: string) => {
		for (let i = 0; i < CATEGORY_KEYS.length; i++) {
			const src = getCategorySource(CATEGORY_KEYS[i]);
			if (src[unitName] !== undefined) {
				return src[unitName];
			}
		}
		return {};
	};
	const parseNumber = (value: any, defaultValue = 0) => toFiniteNumber(value, defaultValue) as number;
	const toRangeText = (minValue: any, maxValue: any) => {
		const minNum = parseNumber(minValue, 0);
		const maxNum = parseNumber(maxValue, minNum);
		if (minNum === maxNum) {
			return String(minNum);
		}
		return `${minNum}-${maxNum}`;
	};
	const getAttackTypeText = (unitData: any) => {
		const capability = String(unitData?.AttackCapabilities ?? "");
		if (capability === "DOTA_UNIT_CAP_RANGED_ATTACK") {
			return "远程";
		}
		if (capability === "DOTA_UNIT_CAP_MELEE_ATTACK") {
			return "近战";
		}
		return "无攻击";
	};
	const getLocalizedUnitName = (unitName: string) => {
		const keys = [
			`#${unitName}`,
			`#DOTA_Tooltip_ability_${unitName}`,
			`#DOTA_Tooltip_npc_dota_creature_${unitName}`,
		];
		for (let i = 0; i < keys.length; i++) {
			const localized = GetLocalization(keys[i], "");
			if (localized !== "") {
				return localized;
			}
		}
		return unitName;
	};
	const getMeta = (unitName: string): UnitMeta => {
		const unitData = getUnitKV(unitName);
		const attackRangeText = toRangeText(unitData?.AttackDamageMin, unitData?.AttackDamageMax);
		const attackTypeText = getAttackTypeText(unitData);
		return {
			unitName,
			localizedName: getLocalizedUnitName(unitName),
			xp: String(parseNumber(unitData?.BountyXP, 0)),
			gold: toRangeText(unitData?.BountyGoldMin, unitData?.BountyGoldMax),
			hp: String(parseNumber(unitData?.StatusHealth, 0)),
			attack: `${attackRangeText}(${attackTypeText})`,
		};
	};
	const toKVRows = (data: any, depth = 0): KVRow[] => {
		if (data === undefined || data === null || typeof data !== "object") {
			return [];
		}
		const rows: KVRow[] = [];
		const keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = data[key];
			const isObject = value !== undefined && value !== null && typeof value === "object";
			if (isObject) {
				const isArray = Array.isArray(value);
				rows.push({
					key,
					value: isArray ? `[${value.length}]` : "{...}",
					depth,
					isLeaf: false,
				});
				const childRows = toKVRows(value, depth + 1);
				for (let j = 0; j < childRows.length; j++) {
					rows.push(childRows[j]);
				}
			} else {
				rows.push({
					key,
					value: String(value ?? ""),
					depth,
					isLeaf: true,
				});
			}
		}
		return rows;
	};
	const kvRows = () => toKVRows(getUnitKV(selectedUnitName()));
	const visible = (meta: UnitMeta) => {
		if (filterWord() === "") {
			return true;
		}
		let regExp: RegExp;
		try {
			regExp = new RegExp(filterWord(), "gim");
		} catch (error) {
			return true;
		}
		if (meta.unitName.search(regExp) !== -1) {
			return true;
		}
		if (meta.localizedName.search(regExp) !== -1 || Pinyin.test(regExp, meta.localizedName)) {
			return true;
		}
		return false;
	};

	useClientSideEvent("RefreshDebugToolData", () => {
		const latest = getUnitListBySegment(segmentIndex());
		setItemList([]);
		setItemList(latest);
		setSelectedUnitName(latest[0] ?? "");
	});

	return (
		<SelectionContainer
			eventName="CreateEnemy"
			title={title}
			hasFilter={true}
			hasRawMode={false}
			hasToggleSize={false}
			onSearch={text => setFilterWord(text)}
			width="1400px"
			height="720px"
		>
			<Panel width="100%" height="100%" flowChildren="down">
				<EOM_Segmented
					list={SEGMENT_LABELS}
					selected={segmentIndex()}
					itemWidth={90}
					onChange={(index) => {
						setSegmentIndex(index);
						const latest = getUnitListBySegment(index);
						setItemList([]);
						setItemList(latest);
						setSelectedUnitName(latest[0] ?? "");
					}}
				/>
				<Panel width="100%" height="100%" flowChildren="right">
					<Panel id="UnitListPanel">
						<Panel class="TitleRow">
							<Label class="RowItem" width="240px" text="ID" />
							<Label class="RowItem" width="fill-parent-flow(1.2)" text="本地化名字" />
							<Label class="RowItem" width="90px" text="经验" />
							{/* <Label class="RowItem" width="90px" text="金钱" /> */}
							<Label class="RowItem" width="90px" text="生命值" />
							<Label class="RowItem" width="140px" text="攻击力" />
						</Panel>
						<Panel id="ItemList" scroll="y">
							<For each={itemList()}>
								{(unitName, index) => {
									const meta = getMeta(unitName);
									return <EOM_BaseButton
										class={"ItemRow " + (index() % 2 === 0 ? "EvenRow" : "OddRow") + (visible(meta) ? "" : " Hide") + (selectedUnitName() === unitName ? " Selected" : "")}
										onactivate={() => setSelectedUnitName(unitName)}
									>
										<Label class="RowItem" width="240px" text={meta.unitName} />
										<Label class="RowItem" width="fill-parent-flow(1.2)" text={meta.localizedName} />
										<Label class="RowItem" width="90px" text={meta.xp} />
										{/* <Label class="RowItem" width="90px" text={meta.gold} /> */}
										<Label class="RowItem" width="90px" text={meta.hp} />
										<Label class="RowItem" width="140px" text={meta.attack} />
									</EOM_BaseButton>;
								}}
							</For>
						</Panel>
					</Panel>
					<Panel id="UnitDetailPanel">
						<Panel id="ModelPreviewPlaceholder">
							<Panel id="UnitDetailTitle">
								<EOM_Breadcrumb list={["模型", "KV"]} selected={previewTabIndex() + 1} onChange={(index) => setPreviewTabIndex(index)} />
								<Label horizontalAlign="right" marginRight="10px" visible={previewTabIndex() == 1} text="点击可复制" />
							</Panel>
							<Panel class="PreviewTab" classList={{ Show: previewTabIndex() === 0 }}>
								<DynamicKey key={selectedUnitName}>
									{unit => <PortraitsFullBodyLoadout id="FullBodyPreview" unit={unit} allowrotation />}
								</DynamicKey>
							</Panel>
							<Panel id="UnitKVPanel" class="PreviewTab" classList={{ Show: previewTabIndex() === 1 }}>
								<Label class="UnitKVName" text={selectedUnitName()} onactivate={() => $.DispatchEvent("CopyStringToClipboard", selectedUnitName(), null)} />
								<For each={kvRows()}>
									{(row) => <Panel class="KVRow">
										<Panel class="KVKeyWrap" >
											<Label class="KVKey" marginLeft={`${row.depth * 18}px`} text={`${row.isLeaf ? "└" : "├"} ${row.key}`} onactivate={() => $.DispatchEvent("CopyStringToClipboard", row.key, null)} />
										</Panel>
										<Label class="KVValue" text={row.value} onactivate={() => $.DispatchEvent("CopyStringToClipboard", row.value, null)} />
									</Panel>}
								</For>
							</Panel>
						</Panel>
						<Panel id="ActionRow">
							<EOM_BaseButton class="DemoButton RedButton" enabled={selectedUnitName() !== ""} onactivate={() => FireEvent("CreateEnemy", selectedUnitName(), { difficulty: difficulty() })}>
								<Label text="创建敌人" />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton RedButton" enabled={selectedUnitName() !== ""} onactivate={() => FireEvent("CreateEliteEnemy", selectedUnitName(), { difficulty: difficulty() })}>
								<Label text="创建精英敌人" />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton GreenButton" enabled={selectedUnitName() !== ""} onactivate={() => FireEvent("CreateAlly", selectedUnitName(), { difficulty: difficulty() })}>
								<Label text="创建友军" />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton" onactivate={() => FireEvent("RemoveSpawnedUnits", "")}>
								<Label text="删除所有单位" />
							</EOM_BaseButton>
							<EOM_DropDown
								placeholder={DIFFICULTY_OPTIONS[difficulty()]?.label ?? "无难度"}
								index={difficulty()}
								onChange={(index, item) => setDifficulty(DIFFICULTY_OPTIONS[index]?.value ?? 0)}
							>
								{DIFFICULTY_OPTIONS.map(opt => <Label id={String(opt.value)} text={opt.label} />)}
							</EOM_DropDown>
						</Panel>
					</Panel>
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};
