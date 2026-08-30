import { createEffect, createSignal, Index, ParentComponent, Show } from "solid-js";
import { Portal } from "../../../../components/EOMChildren";
import { EOM_BaseButton } from "../../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../../../../components/EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import { EOM_ToggleButton } from "../../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { FireEvent, SelectionContainer } from "../../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { createServiceNetData } from "../../../../utils/solid_utils";
import "./loadout_picker.less";

const SETTING_KEY = "hud_demo_loadouts";

type DemoLoadoutConfig = {
	id: string;
	name: string;
	heroName?: string;
	includeAttributes: boolean;
	includeBlessings: boolean;
	includeArtifacts: boolean;
	includeSkillUpgrades?: boolean;
	attributes?: Record<string, number>;
	blessings?: Array<{ name: string; rarity: number; }>;
	artifacts?: Array<{ name: string; rarity: number; }>;
	skillUpgrades?: Array<{ name: string; level: number; }>;
	updatedAt?: number;
};

type PendingConfirmation = {
	type: "save" | "delete";
	config: DemoLoadoutConfig;
};

function NormalizeConfigs(value: unknown): DemoLoadoutConfig[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter((config): config is DemoLoadoutConfig => {
			return typeof config?.id === "string" && typeof config.name === "string";
		})
		.map(config => ({
			...config,
			includeSkillUpgrades: config.includeSkillUpgrades !== false,
		}));
}

function ReadConfigs(): DemoLoadoutConfig[] {
	const rawValue = Players.GetPlayerSetting<string>(SETTING_KEY, "[]");
	return NormalizeConfigs(JSON.parseSafe(rawValue));
}

/** 保存和应用当前英雄的调试构筑。 */
export const LoadoutPicker: ParentComponent = () => {
	const [configs, setConfigs] = createSignal(ReadConfigs());
	const [importText, setImportText] = createSignal("");
	const [importStatus, setImportStatus] = createSignal("");
	const [pendingConfirmation, setPendingConfirmation] = createSignal<PendingConfirmation>();
	const playerKeyValues = createServiceNetData("player_key_values", {});
	let lastSyncedConfigText: string | undefined;
	createEffect(() => {
		const configText = playerKeyValues()[SETTING_KEY]?.value ?? "[]";
		if (configText === lastSyncedConfigText) return;
		lastSyncedConfigText = configText;
		const savedConfigs = JSON.parseSafe(configText);
		if (Array.isArray(savedConfigs)) setConfigs(NormalizeConfigs(savedConfigs));
	});

	const persistConfigs = (nextConfigs: DemoLoadoutConfig[]) => {
		setConfigs(nextConfigs);
		// Players.SetPlayerSetting(SETTING_KEY, JSON.stringify(nextConfigs));
	};
	const updateConfig = (id: string, update: Partial<DemoLoadoutConfig>) => {
		persistConfigs(configs().map(config => config.id === id ? { ...config, ...update } : config));
	};
	const saveConfig = (id: string) => {
		const nextConfigs = configs();
		persistConfigs(nextConfigs);
		FireEvent("SaveDemoLoadout", "", {
			config_id: id,
			configs: JSON.stringify(nextConfigs),
		});
	};
	const addConfig = () => {
		const config: DemoLoadoutConfig = {
			id: `loadout_${Game.Time()}_${configs().length}`,
			name: `配置 ${configs().length + 1}`,
			includeAttributes: true,
			includeBlessings: true,
			includeArtifacts: true,
			includeSkillUpgrades: true,
		};
		const nextConfigs = [...configs(), config];
		persistConfigs(nextConfigs);
		FireEvent("SaveDemoLoadout", "", {
			config_id: config.id,
			configs: JSON.stringify(nextConfigs),
		});
	};
	const deleteConfig = (id: string) => {
		const nextConfigs = configs().filter(config => config.id !== id);
		persistConfigs(nextConfigs);
		FireEvent("ImportDemoLoadouts", "", {
			configs: JSON.stringify(nextConfigs),
		});
	};
	const confirmPendingAction = () => {
		const pending = pendingConfirmation();
		if (!pending) return;
		setPendingConfirmation();
		if (pending.type === "save") {
			saveConfig(pending.config.id);
		} else {
			deleteConfig(pending.config.id);
		}
	};
	const exportConfigs = () => {
		$.DispatchEvent("CopyStringToClipboard", JSON.stringify(configs()), null as any);
		setImportStatus(`已复制 ${configs().length} 个配置`);
	};
	const importConfigs = () => {
		const parsed = JSON.parseSafe(importText().trim());
		const importedConfigs = NormalizeConfigs(parsed);
		if (!Array.isArray(parsed) || importedConfigs.length !== parsed.length) {
			setImportStatus("导入失败：配置 JSON 格式错误");
			return;
		}
		persistConfigs(importedConfigs);
		FireEvent("ImportDemoLoadouts", "", {
			configs: JSON.stringify(importedConfigs),
		});
		setImportText("");
		setImportStatus(`已导入 ${importedConfigs.length} 个配置`);
	};

	return <SelectionContainer
		eventName="DemoLoadout"
		title="英雄配置"
		hasFilter={false}
		hasRawMode={false}
		hasToggleSize={false}
		width="800px"
		height="600px"
	>
		<Panel id="DemoLoadoutPicker">
			<Panel id="LoadoutHeader">
				<Label text="保存或应用当前英雄的调试属性、祝福、遗物和技能升级。" />
				<EOM_BaseButton class="DemoButton GreenButton" onactivate={addConfig}>
					<Label text="新建配置" />
				</EOM_BaseButton>
			</Panel>
			<Panel id="LoadoutTransfer">
				<EOM_TextEntry
					id="LoadoutImportText"
					text={importText()}
					placeholder="在这里粘贴配置 JSON"
					onChange={(_, __, text) => {
						setImportText(text);
						setImportStatus("");
					}}
				/>
				<EOM_BaseButton class="DemoButton CyanButton LoadoutTransferButton" onactivate={exportConfigs}>
					<Label text="导出全部" />
				</EOM_BaseButton>
				<EOM_BaseButton class="DemoButton GreenButton LoadoutTransferButton" onactivate={importConfigs}>
					<Label text="导入" />
				</EOM_BaseButton>
				<Label id="LoadoutImportStatus" text={importStatus()} />
			</Panel>
			<Panel id="LoadoutList" scroll="y">
				<Index each={configs()} fallback={<Label id="EmptyHint" text="暂无配置" />}>
					{config => <Panel class="LoadoutRow" flowChildren="down">
						<Panel class="LoadoutTopRow">
							<EOM_TextEntry
								class="LoadoutName"
								text={config().name}
								placeholder="配置名称"
								onChange={(_, __, text) => updateConfig(config().id, { name: text.trim() || "未命名配置" })}
							/>
							<EOM_BaseButton class="DemoButton CyanButton LoadoutApplyButton" onactivate={() => FireEvent("ApplyDemoLoadout", "", { config: JSON.stringify(config()) })}>
								<Label text="应用" />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton GreenButton LoadoutSecondaryButton" onactivate={() => setPendingConfirmation({ type: "save", config: config() })}>
								<Label text="保存当前" />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton RedButton LoadoutSecondaryButton LoadoutDeleteButton" onactivate={() => setPendingConfirmation({ type: "delete", config: config() })}>
								<Label text="删除" />
							</EOM_BaseButton>
						</Panel>
						<Panel class="LoadoutOptions">
							<EOM_ToggleButton selected={config().includeAttributes} text="属性" onchange={(_, checked) => updateConfig(config().id, { includeAttributes: checked })} />
							<EOM_ToggleButton selected={config().includeBlessings} text="祝福" onchange={(_, checked) => updateConfig(config().id, { includeBlessings: checked })} />
							<EOM_ToggleButton selected={config().includeArtifacts} text="遗物" onchange={(_, checked) => updateConfig(config().id, { includeArtifacts: checked })} />
							<EOM_ToggleButton selected={config().includeSkillUpgrades !== false} text="技能升级" onchange={(_, checked) => updateConfig(config().id, { includeSkillUpgrades: checked })} />
							<Label class="LoadoutSummary" text={`属性 ${Object.keys(config().attributes ?? {}).length} · 祝福 ${config().blessings?.length ?? 0} · 遗物 ${config().artifacts?.length ?? 0} · 技能升级 ${config().skillUpgrades?.reduce((total, upgrade) => total + upgrade.level, 0) ?? 0}`} />
						</Panel>
					</Panel>}
				</Index>
			</Panel>
		</Panel>
		<Portal mount={$.GetContextPanel()}>
			<Show when={pendingConfirmation()}>
				<Panel id="DemoLoadoutConfirmOverlay">
					<Panel id="DemoLoadoutConfirmDialog" flowChildren="down">
						<Label
							id="DemoLoadoutConfirmTitle"
							text={GetLocalization(pendingConfirmation()!.type === "save" ? "#DemoLoadout_SaveConfirmTitle" : "#DemoLoadout_DeleteConfirmTitle")}
						/>
						<Label
							id="DemoLoadoutConfirmText"
							text={LocalizeWithVars(
								pendingConfirmation()!.type === "save" ? "#DemoLoadout_SaveConfirmText" : "#DemoLoadout_DeleteConfirmText",
								{ name: pendingConfirmation()!.config.name },
							)}
						/>
						<Panel id="DemoLoadoutConfirmButtons">
							<EOM_BaseButton class="DemoButton RedButton DemoLoadoutConfirmButton" onactivate={() => setPendingConfirmation()}>
								<Label text={GetLocalization("#Popup_Button_Cancel")} />
							</EOM_BaseButton>
							<EOM_BaseButton class="DemoButton GreenButton DemoLoadoutConfirmButton" onactivate={confirmPendingAction}>
								<Label text={GetLocalization(pendingConfirmation()!.type === "save" ? "#DemoLoadout_SaveConfirmButton" : "#DemoLoadout_DeleteConfirmButton")} />
							</EOM_BaseButton>
						</Panel>
					</Panel>
				</Panel>
			</Show>
		</Portal>
	</SelectionContainer>;
};
