import { createMemo, createSignal, For, onCleanup, onMount, ParentComponent, Show } from "solid-js";
import "./hero_ability.less";

/** 英雄技能描述 */
export const HeroAbility: ParentComponent<{
	abilityName: string;
	entIndex?: AbilityEntityIndex;
}> = (props) => {
	// 获取技能配置数据
	const abilityData = createMemo(() => {
		const config = GameUI.CustomUIConfig()?.hero_abilities;
		return config?.[props.abilityName];
	});
	// 获取技能名称（本地化）
	const abilityDisplayName = createMemo(() => {
		return GetLocalization("#DOTA_Tooltip_ability_" + props.abilityName);
	});
	// 获取技能名称（本地化）
	const abilityTag = createMemo(() => {
		return "#feature_" + abilityData()?.AbilityTag;
	});
	const [cooldown, setCooldown] = createSignal(abilityData()?.AbilityCooldown ?? 0);
	const [manaCost, setManaCost] = createSignal(abilityData()?.AbilityManaCost ?? 0);

	onMount(() => {
		const update = () => {
			if (props.entIndex != undefined && Entities.IsValidEntity(props.entIndex)) {
				setCooldown(Round(Abilities.GetAbilityCooldown(props.entIndex), 1));
				setManaCost(Abilities.GetManaCost(props.entIndex));
			}
		};
		update();
		const timer = setInterval(update, 200);
		onCleanup(() => clearInterval(timer));
	});


	// 获取技能值配置（含升级加成）
	const abilityValues = createMemo(() => {
		const data = abilityData();
		const baseValues = data?.AbilityValues || {};
		if (props.entIndex != undefined && Entities.IsValidEntity(props.entIndex)) {
			const unitEntIndex = Abilities.GetCaster(props.entIndex);
			return Abilities.GetUpgradedAbilityValues(props.abilityName, baseValues, unitEntIndex);
		}
		return baseValues;
	});
	// 获取技能描述（本地化）
	const abilityDescription = createMemo(() => {
		return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${props.abilityName}_description`), abilityValues());
	});

	// Lore
	const abilityLore = createMemo(() => {
		return GetLocalization(`#DOTA_Tooltip_ability_${props.abilityName}_lore`, "");
	});

	// 获取技能详细数值
	const abilityDetailValues = createMemo(() => {
		const values = abilityValues();
		return Object.entries(values)
			.map(([key, value]) => {
				let label = GetLocalization(`DOTA_Tooltip_ability_${props.abilityName}_${key}`, "");
				if (label.startsWith('DOTA_Tooltip')) label = key;
				const bHasPercent = label.startsWith('%');
				if (bHasPercent) label = label.substring(1);
				return {
					key,
					label,
					value: GetAbilityValue(value as any) + (bHasPercent ? '%' : '')
				};
			})
			.filter(item => item.label !== ""); // 过滤掉没有本地化的项
	});

	return (
		<Panel class="HeroAbility">
			{/* 技能头部 */}
			<Panel class="HeroAbility__Header">
				{/* 技能图标 */}
				<DOTAAbilityImage class="HeroAbility__Icon" abilityname={props.abilityName} />
				<Panel flowChildren="down">
					{/* 技能名称 */}
					<Label class="HeroAbility__Name" text={abilityDisplayName()} />
					{/* 技能类型 */}
					<Label class="HeroAbility__Tag" text={abilityTag()} />
				</Panel>
			</Panel>

			{/* 技能描述 */}
			<Label class="HeroAbility__Description" html text={abilityDescription()} />

			{/* 技能详细数值 */}
			<Show when={abilityDetailValues().length > 0}>
				<Panel class="HeroAbility__Details">
					<For each={abilityDetailValues()}>
						{(detail) => <Panel class="HeroAbility__Detail">
							<Label class="HeroAbility__DetailLabel" text={detail.label} />
							<Label class="HeroAbility__DetailValue" html text={detail.value} />
						</Panel>}
					</For>
				</Panel>
			</Show>

			{/* 技能属性（冷却/魔法/距离） */}
			<Panel class="HeroAbility__Properties">
				<Label visible={abilityData()?.AbilityCooldown != undefined} class="HeroAbility__PropertyValue AbilityCooldown" text={cooldown()} />
				<Label visible={manaCost() > 0} class="HeroAbility__PropertyValue AbilityManaCost" text={manaCost()} />
				<Label visible={abilityData()?.AbilityCastRange != undefined} class="HeroAbility__PropertyValue AbilityCastRange" text={abilityData()?.AbilityCastRange} />
			</Panel>

			{/* Lore */}
			<Panel class="HeroAbility_Lore" visible={abilityLore() != ""}>
				<Label text={abilityLore()} />
			</Panel>
		</Panel>
	);
};