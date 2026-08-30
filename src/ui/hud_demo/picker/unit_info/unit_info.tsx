import { createSignal, For, Index, onCleanup, onMount, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { EOM_ToggleButton } from "../../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { EOM_Segmented } from "../../../../components/EOMDesign/Navigation/EOM_Segmented/EOM_Segmented";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { CommonItem } from "../../../../components/abilities/common/common_item";
import "./unit_info.less";

type UnitAbilityInfo = {
	abilityIndex: AbilityEntityIndex;
	abilityName: string;
	abilityLevel: number;
	slot: number;
};

const isSameAbilityList = (prev: UnitAbilityInfo[], next: UnitAbilityInfo[]) => {
	if (prev.length !== next.length) {
		return false;
	}
	for (let i = 0;i < prev.length;i++) {
		const prevAbility = prev[i];
		const nextAbility = next[i];
		if (
			prevAbility.abilityIndex !== nextAbility.abilityIndex ||
			prevAbility.abilityName !== nextAbility.abilityName ||
			prevAbility.abilityLevel !== nextAbility.abilityLevel ||
			prevAbility.slot !== nextAbility.slot
		) {
			return false;
		}
	}
	return true;
};

export const UnitInfo: ParentComponent = (props) => {
	let panel: Panel | undefined;
	const [tabIndex, setTabIndex] = createSignal(0);
	const [useCurrentUnit, setUseCurrentUnit] = createSignal(true);
	const [customEntIndexText, setCustomEntIndexText] = createSignal("");
	const [isMousePickingUnit, setIsMousePickingUnit] = createSignal(false);
	let wasLeftMouseDown = false;
	let waitLeftReleaseAfterStart = false;
	const syncCurrentUnitIndexText = () => {
		const entIndex = Players.GetLocalPlayerPortraitUnit();
		if (entIndex !== -1) {
			setCustomEntIndexText(String(entIndex));
		}
	};
	const getTargetEntIndex = () => {
		if (useCurrentUnit()) {
			return Players.GetLocalPlayerPortraitUnit();
		}
		return toFiniteNumber(customEntIndexText(), -1) as EntityIndex;
	};
	const pickUnitByMouse = () => {
		if (!isMousePickingUnit()) {
			wasLeftMouseDown = false;
			return;
		}
		const isLeftMouseDown = GameUI.IsMouseDown(0);
		if (waitLeftReleaseAfterStart) {
			if (isLeftMouseDown === false) {
				waitLeftReleaseAfterStart = false;
			}
			wasLeftMouseDown = isLeftMouseDown;
			return;
		}
		if (isLeftMouseDown === true && wasLeftMouseDown === false) {
			setIsMousePickingUnit(false);
			wasLeftMouseDown = isLeftMouseDown;
			return;
		}
		wasLeftMouseDown = isLeftMouseDown;
		const entIndex = GetCursorEntity();
		if (entIndex !== -1) {
			const nextText = String(entIndex);
			if (customEntIndexText() !== nextText) {
				setCustomEntIndexText(nextText);
			}
		}
	};
	const [unitInfo, setUnitInfo] = createStore({
		entIndex: -1 as EntityIndex,
		name: "",
		className: "",
		position: "0 0 0",
		forward: "0 0 0",
		health: "0",
		maxHealth: "0",
		mana: 0,
		maxMana: 0,
		attack: "0",
		attackrange: "0",
		attackSpeed: 0,
		baseAttackTime: "0",
		critChance: "0",
		critDamage: "0",
		movespeed: "0",
		abilities: [] as UnitAbilityInfo[],
		modifiers: {} as string[],
		items: [] as NetDataDeclarations["unit"][string]["items"],
	});
	const Update = () => {
		if (useCurrentUnit()) {
			syncCurrentUnitIndexText();
		}
		const entIndex = getTargetEntIndex();
		if (entIndex !== -1 && !Entities.IsAlive(entIndex) && !useCurrentUnit()) {
			setUseCurrentUnit(true);
			syncCurrentUnitIndexText();
			return;
		}
		if (entIndex !== -1 && panel?.FindAncestor("EOM_UnitInfo")?.BHasClass("Show")) {
			const position = Entities.GetAbsOrigin(entIndex);
			const forward = Entities.GetForward(entIndex);
			const abilities: UnitAbilityInfo[] = [];
			for (let slot = 0;slot < 24;slot++) {
				const abilityIndex = Entities.GetAbility(entIndex, slot);
				if (!abilityIndex) {
					continue;
				}
				const abilityName = Abilities.GetAbilityName(abilityIndex);
				if (abilityName === "" || abilityName.includes("attribute_bonus") || abilityName.includes("empty")) {
					continue;
				}
				abilities.push({
					abilityIndex,
					abilityName,
					abilityLevel: Abilities.GetLevel(abilityIndex),
					slot,
				});
			}

			const healthPct = Entities.GetHealth(entIndex) / Entities.GetMaxHealth(entIndex);
			const minHealth = Entities.IsAlive(entIndex) ? 1 : 0;
			const maxHealth = toFiniteNumber(Entities.GetMaxHealth(entIndex));
			const healthLabel = toFiniteNumber(Math.max(minHealth, Math.floor(healthPct * maxHealth)));
			const maxHealthLabel = toFiniteNumber(Math.floor(maxHealth));
			const stableAbilities = isSameAbilityList(unitInfo.abilities, abilities) ? unitInfo.abilities : abilities;
			setUnitInfo({
				entIndex: entIndex,
				name: `${Entities.GetUnitName(entIndex)} (${GetLocalization("#" + Entities.GetUnitName(entIndex))})`,
				className: Entities.GetClassNameAsCStr(entIndex),
				position: `${position[0].toFixed(0)}, ${position[1].toFixed(0)}, ${position[2].toFixed(0)}`,
				forward: `${forward[0].toFixed(3)}, ${forward[1].toFixed(3)}, ${forward[2].toFixed(3)}`,
				health: healthLabel,
				maxHealth: maxHealthLabel,
				mana: Entities.GetMana(entIndex),
				maxMana: Entities.GetMaxMana(entIndex),
				attack: toFiniteNumber(Entities.GetAttackDamage(entIndex)),
				attackrange: toFiniteNumber(Entities.GetAttackRange(entIndex)),
				attackSpeed: Round(Entities.GetAttackSpeed(entIndex) * 100),
				baseAttackTime: Entities.GetBaseAttackTime(entIndex).toFixed(2),
				critChance: `${Entities.GetPropertyValue(entIndex, "crit_chance").toFixed(2)}%`,
				critDamage: `${Entities.GetPropertyValue(entIndex, "crit_damage").toFixed(2)}%`,
				movespeed: `${Entities.GetMoveSpeedModifier(entIndex, Entities.GetBaseMoveSpeed(entIndex)).toFixed(0)} (${Entities.HasFlyMovementCapability(entIndex) ? "飞行" : "地面"})`,
				abilities: stableAbilities,
				modifiers: [...Array(Entities.GetNumBuffs(entIndex))].map((_, index) => {
					return Buffs.GetName(entIndex, Entities.GetBuff(entIndex, index)) + "," + Buffs.GetStackCount(entIndex, Entities.GetBuff(entIndex, index));
				}),
				items: (getNetDataKey("unit", entIndex.toString()) ?? { items: [] }).items
			});
		}
	};
	onMount(() => {
		syncCurrentUnitIndexText();
		const timer = setInterval(Update, 100);
		const pickTimer = setInterval(pickUnitByMouse, 100);
		onCleanup(() => {
			clearInterval(timer);
			clearInterval(pickTimer);
		});
	});
	return (
		<SelectionContainer
			eventName={"EOM_UnitInfo"}
			title={"单位信息面板"}
			width="600px"
			height="800px"
			hasRawMode={false}
			hasToggleSize={false}
			hasFilter={false}
		>
			<Panel width="100%" height="100%" flowChildren="down" ref={panel}>
				<Panel class="ControlRow">
					<EOM_ToggleButton verticalAlign="center" selected={useCurrentUnit()} text="当前单位" onchange={(p, checked) => {
						setUseCurrentUnit(checked);
						if (checked) {
							syncCurrentUnitIndexText();
						}
					}} />
					<Label class="ControlDivider" verticalAlign="center" text="|" />
					<EOM_TextEntry
						width="220px"
						height="30px"
						text={customEntIndexText()}
						textmode="numeric"
						enabled={!useCurrentUnit()}
						placeholder="输入实体Index"
						verticalAlign="center"
						onChange={(self, prev, text) => {
							setCustomEntIndexText(text);
						}}
					/>
					<EOM_BaseButton marginLeft="8px" tooltip="鼠标选取查找单位" verticalAlign="center" washColor={isMousePickingUnit() ? "White" : "LightGrey"} onactivate={() => {
						const nextPicking = !isMousePickingUnit();
						setIsMousePickingUnit(nextPicking);
						if (nextPicking) {
							setUseCurrentUnit(false);
							waitLeftReleaseAfterStart = true;
							wasLeftMouseDown = GameUI.IsMouseDown(0);
							pickUnitByMouse();
						} else {
							waitLeftReleaseAfterStart = false;
						}
					}}>
						<Image src="s2r://panorama/images/control_icons/24px/unusual.vsvg" />
					</EOM_BaseButton>
					{isMousePickingUnit() ? <Label class="PickingStateText" verticalAlign="center" text="检索中" /> : undefined}
				</Panel>
				<EOM_Segmented list={["实体信息", "技能", "Modifier", "物品"]} onChange={(index, name) => {
					setTabIndex(index);
				}} />
				<Panel width="100%" height="100%" >
					<Panel id="EntInfo" class="UnitInfoTab" classList={{ Show: tabIndex() == 0 }}>
						<EOM_UnitInfoRow key="实体ID" value={unitInfo.entIndex} />
						<EOM_UnitInfoRow key="实体名" value={unitInfo.name} />
						<EOM_UnitInfoRow key="实体类名" value={unitInfo.className} />
						<EOM_UnitInfoRow key="位置" value={unitInfo.position} eventName="UnitInfoPosition" />
						<EOM_UnitInfoRow key="朝向" value={unitInfo.forward} eventName="UnitInfoForward" />
						<EOM_UnitInfoRow key="生命" value={unitInfo.health + " / " + unitInfo.maxHealth} eventType="Add" eventName="UnitInfoHealth" />
						<EOM_UnitInfoRow key="魔法" value={unitInfo.mana + " / " + unitInfo.maxMana} eventType="Add" eventName="UnitInfoMana" />
						<EOM_UnitInfoRow key="攻击力" value={unitInfo.attack} eventType="Add" eventName="UnitInfoAttack" />
						<EOM_UnitInfoRow key="攻速" value={unitInfo.attackSpeed} eventType="Add" eventName="UnitInfoAttackSpeed" />
						<EOM_UnitInfoRow key="攻击间隔" value={unitInfo.baseAttackTime} eventName="UnitInfoAttackTime" />
						<EOM_UnitInfoRow key="攻击距离" value={unitInfo.attackrange} eventType="Add" eventName="UnitInfoAttackRange" />
						<EOM_UnitInfoRow key="暴击率" value={unitInfo.critChance} eventType="Add" eventName="UnitInfoCritChance" />
						<EOM_UnitInfoRow key="暴击伤害" value={unitInfo.critDamage} eventType="Add" eventName="UnitInfoCritDamage" />
						<EOM_UnitInfoRow key="移速" value={unitInfo.movespeed} eventName="UnitInfoMoveSpeed" />

					</Panel>
					<Panel id="AbilityList" class="UnitInfoTab" classList={{ Show: tabIndex() == 1 }}>
						<For each={unitInfo.abilities}>
							{(ability) => {
								const localizedName = GetLocalization(`#DOTA_Tooltip_ability_${ability.abilityName}`, "");
								const displayName = localizedName === "" ? ability.abilityName : localizedName;
								return <Panel class="AbilityActionPanel" onactivate={() => {
									Abilities.ExecuteAbility(ability.abilityIndex, unitInfo.entIndex, false);
								}}>
									<DOTAAbilityImage
										abilityname={ability.abilityName}
										customTooltip={{ name: "hero_ability", abilityName: ability.abilityName, entIndex: ability.abilityIndex }}
									/>
									<Label class="AbilityName" text={displayName} />
									<Label class="AbilityMeta" text={`槽位 ${ability.slot}  Lv.${ability.abilityLevel}`} />
								</Panel>;
							}}
						</For>
					</Panel>
					<Panel id="ModifierList" class="UnitInfoTab" classList={{ Show: tabIndex() == 2 }}>
						<Panel class="EOM_UnitInfoModifierRow">
							<Label class="EOM_UnitInfoModifierName" text="名" />
							<Label class="EOM_UnitInfoModifierCount" text="层数" />
							<Label class="EOM_UnitInfoModifierAction" text="操作" />
						</Panel>
						<For each={unitInfo.modifiers}>
							{(modifier, index) => {
								const [name, count] = modifier.split(",");
								return <EOM_UnitInfoModifierRow name={name} count={count} />;
							}}
						</For>
					</Panel>
					<Panel id="ItemList" class="UnitInfoTab" flowChildren="right-wrap" classList={{ Show: tabIndex() == 3 }}>
						<Index each={unitInfo.items}>
							{(data, index) => {
								return <CommonItem itemName={data().itemName} rarity={data().level} showTips>
									<Label visible={data().stackCount > 0} class="StackCount" text={data().stackCount} />
								</CommonItem>;
							}}
						</Index>
					</Panel>
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};


/** 单位信息面板实体信息行 */
const EOM_UnitInfoRow: ParentComponent<{
	key: string,
	value: string | number,
	eventName?: string,
	eventType?: string,
}> = (props) => {
	let label: LabelPanel | undefined;
	let entry: TextEntry | undefined;
	const [edit, setEdit] = createSignal(false);
	return <Panel class="EOM_UnitInfoRow" classList={{ Editable: props.eventName != undefined, Editing: edit() }}>
		<Label class="EOM_UnitInfoKey" text={props.key} />
		<Label ref={label} class="EOM_UnitInfoValue" visible={!edit()} text={props.value} />
		<EOM_TextEntry ref={entry} class="EOM_UnitInfoValue" visible={edit()} oninputsubmit={self => {
			FireEvent(props.eventName!, self.text);
			setEdit(false);
			$.DispatchEvent("DropInputFocus", self);
		}} />
		<Image class="EOM_UnitInfoEdit" classList={{ Add: props.eventType == "Add" }} onactivate={self => {
			if (!edit() && entry && label && props.eventType == undefined) {
				entry.text = label.text;
			}
			setEdit(!edit());
			entry?.SetFocus();
			entry?.SetFocus();
		}} />
	</Panel>;
};

/** 单位信息面板状态信息行 */
const EOM_UnitInfoModifierRow: ParentComponent<{
	name: string,
	count: string;
}> = (props) => {
	return <Panel class="EOM_UnitInfoModifierRow" tooltip_text={props.name}>
		<Label class="EOM_UnitInfoModifierName" text={props.name} />
		<Label class="EOM_UnitInfoModifierCount" text={props.count} />
		<Panel class="EOM_UnitInfoModifierAction">
			<Button class="ModifierActionButton DemoButton GreenButton" onactivate={self => FireEvent("UnitInfoRefreshModifier", props.name)}>
				<Label text="刷新" />
			</Button>
			<Button class="ModifierActionButton DemoButton RedButton" onactivate={self => FireEvent("UnitInfoRemoveModifier", props.name)}>
				<Label text="移除" />
			</Button>
		</Panel>
	</Panel>;
};
