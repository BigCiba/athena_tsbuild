import { reloadable } from "../lib/tstl-utils";

/**
 * 功能介绍：
 * 管理英雄技能升级数据，记录每个单位已获得的升级项，并在技能数值读取时提供合并后的升级效果。
 *
 * 使用方法：
 * 通过全局单例 AbilityUpgrade 调用 AddAbilityUpgrade / RemoveAbilityUpgrade / ClearAbilityUpgrades 维护升级；
 * 通过 GetAbilityUpgrades / GetUpgradedValue 查询某个技能字段的最终数值。
 */
interface UpgradeData {
	name: string;
	level: number;
}

/** 单位的技能升级数据 */
interface UnitAbilityUpgrades {
	/** 升级列表 */
	upgrades: UpgradeData[];
}

@reloadable
class CAbilityUpgrade extends CModule {
	kv: KV;
	service_kv: KV;
	/** 存储每个单位的技能升级数据 entidx:Upgrades */
	private unitUpgrades: Record<number, UnitAbilityUpgrades> = {};
	/** 来源计数 source:<entidx,name> */
	private upgradeSource: Record<string, Partial<Record<number, string[]>>> = {};
	init(reload: boolean): void {
		if (!reload) {
			this.unitUpgrades = {};
			// 注册测试命令
			// if (IsInToolsMode()) {
			// 	Convars.RegisterCommand("test_upgrade", () => {
			// 		const hero = PlayerResource.GetSelectedHeroEntity(0);
			// 		if (hero !== undefined) {
			// 			const ability = hero.FindAbilityByName("phantom_assassin_1");
			// 			if (ability !== undefined) {
			// 				print("=== 技能升级测试 ===");
			// 				print(`基础 suriken_count: ${ability.GetSpecialValueFor("suriken_count")}`);

			// 				this.AddAbilityUpgrade(hero, "phantom_assassin_upgrade_1");
			// 				print(`升级后 suriken_count: ${ability.GetSpecialValueFor("suriken_count")}`);
			// 				print(`新增 damage_reduce: ${ability.GetSpecialValueFor("damage_reduce")}`);

			// 				this.AddAbilityUpgrade(hero, "phantom_assassin_upgrade_1");
			// 				print(`再次升级后 suriken_count: ${ability.GetSpecialValueFor("suriken_count")}`);
			// 			}
			// 		}
			// 	}, "测试技能升级系统", 0);
			// }
		}
		this.kv = LoadKeyValues("scripts/npc/abilities/ability_upgrades.kv");
		this.service_kv = LoadKeyValues("scripts/npc/abilities/ability_upgrades_service.kv");
	}
	/**
	 * 为单位添加技能升级
	 * @param unit 目标单位
	 * @param abilityUpgradeName 技能升级名称
	 * @param level 等级
	 * @param source 来源标识（可选）
	 */
	AddAbilityUpgrade(unit: CDOTA_BaseNPC, abilityUpgradeName: string, level: number = 1, source: string = ""): void {
		if (!IsValid(unit)) {
			print(`[AbilityUpgrade] 无效的单位`);
			return;
		}

		// 检查升级配置是否存在
		const upgradeConfig = this.kv[abilityUpgradeName] ?? this.service_kv[abilityUpgradeName];
		if (upgradeConfig === undefined) {
			print(`[AbilityUpgrade] 找不到升级配置: ${abilityUpgradeName}`);
			return;
		}

		const entindex = unit.GetEntityIndex();

		// 初始化单位数据
		if (this.unitUpgrades[entindex] === undefined) {
			this.unitUpgrades[entindex] = {
				upgrades: []
			};
		}

		const data = this.unitUpgrades[entindex];

		// 查找是否已存在该升级
		const existingUpgrade = data.upgrades.find(u => u.name === abilityUpgradeName);

		if (existingUpgrade) {
			// 检查 max 限制
			const maxCount = tonumber(upgradeConfig.max);
			if (maxCount !== undefined && existingUpgrade.level >= maxCount) {
				print(`[AbilityUpgrade] 升级 ${abilityUpgradeName} 已达到最大次数 (${maxCount})`);
				return;
			}

			// 检查来源是否匹配
			if (!this.isUpgradeFromSource(entindex, abilityUpgradeName, source)) {
				// 来源不同，无视
				print(`[AbilityUpgrade] 升级 ${abilityUpgradeName} 已存在且来源不同（当前来源: ${source}），无视`);
				return;
			}

			// 来源相同，检查等级
			if (level < existingUpgrade.level) {
				// 等级更低，不更新
				print(`[AbilityUpgrade] 升级 ${abilityUpgradeName} 等级更低（${level} < ${existingUpgrade.level}），不更新`);
				return;
			}

			// 更新等级
			existingUpgrade.level = level;
			print(`[AbilityUpgrade] 单位 ${entindex} 更新技能升级等级: ${abilityUpgradeName} -> ${level} (来源: ${source || "无"})`);
		} else {
			// 添加新升级
			data.upgrades.push({ name: abilityUpgradeName, level: level });

			// 记录来源
			if (this.upgradeSource[source] === undefined) {
				this.upgradeSource[source] = {};
			}
			if (this.upgradeSource[source][entindex] === undefined) {
				this.upgradeSource[source][entindex] = [];
			}
			this.upgradeSource[source][entindex].push(abilityUpgradeName);

			print(`[AbilityUpgrade] 单位 ${entindex} 添加技能升级: ${abilityUpgradeName} (等级: ${level}, 来源: ${source || "无"})`);

			// 发送事件（仅新增时）
			Event.Fire("ability_upgrade_added", {
				unit,
				upgradeName: abilityUpgradeName,
				level: level,
			});
		}

		// 刷新技能属性
		this.RefreshAbilityProperty(unit, abilityUpgradeName);

		// 同步到客户端
		this.SyncToClient(unit);
	}

	/**
	 * 移除单位的指定技能升级（移除一次）
	 * @param unit 目标单位
	 * @param abilityUpgradeName 技能升级名称
	 * @param source 来源标识（可选，如果提供则只移除该来源的升级）
	 * @returns 是否成功移除
	 */
	RemoveAbilityUpgrade(unit: CDOTA_BaseNPC, abilityUpgradeName: string, source?: string): boolean {
		if (!IsValid(unit)) {
			print(`[AbilityUpgrade] 无效的单位`);
			return false;
		}

		const entindex = unit.GetEntityIndex();
		const data = this.unitUpgrades[entindex];

		if (data === undefined || data.upgrades.length === 0) {
			print(`[AbilityUpgrade] 单位 ${entindex} 没有任何技能升级`);
			return false;
		}

		// 如果指定了来源，检查来源是否匹配
		if (source !== undefined && !this.isUpgradeFromSource(entindex, abilityUpgradeName, source)) {
			print(`[AbilityUpgrade] 升级 ${abilityUpgradeName} 不属于来源 ${source}`);
			return false;
		}

		// 查找并移除第一个匹配的升级
		for (let i = 0; i < data.upgrades.length; i++) {
			if (data.upgrades[i].name === abilityUpgradeName) {
				const upgradeSource = source || "";

				// 从来源记录中移除
				if (this.upgradeSource[upgradeSource]?.[entindex]) {
					const sourceIndex = this.upgradeSource[upgradeSource][entindex].indexOf(abilityUpgradeName);
					if (sourceIndex !== -1) {
						this.upgradeSource[upgradeSource][entindex].splice(sourceIndex, 1);
					}
				}

				data.upgrades.splice(i, 1);
				print(`[AbilityUpgrade] 单位 ${entindex} 移除技能升级: ${abilityUpgradeName} (来源: ${source || "无"})`);

				// 刷新技能属性
				this.RefreshAbilityProperty(unit, abilityUpgradeName);

				// 同步到客户端
				this.SyncToClient(unit);

				// 发送事件
				Event.Fire("ability_upgrade_removed", {
					unit,
					upgradeName: abilityUpgradeName,
				});

				return true;
			}
		}

		print(`[AbilityUpgrade] 单位 ${entindex} 没有技能升级: ${abilityUpgradeName}`);
		return false;
	}

	/**
	 * 移除指定来源的所有技能升级
	 * @param unit 目标单位
	 * @param source 来源标识
	 * @returns 移除的数量
	 */
	RemoveAbilityUpgradeBySource(unit: CDOTA_BaseNPC, source: string): number {
		if (!IsValid(unit)) {
			print(`[AbilityUpgrade] 无效的单位`);
			return 0;
		}

		const entindex = unit.GetEntityIndex();
		const data = this.unitUpgrades[entindex];

		if (data === undefined || data.upgrades.length === 0 || this.upgradeSource[source] == undefined || this.upgradeSource[source][entindex] == undefined) {
			return 0;
		}

		// 获取该来源的所有升级名称
		const sourceUpgrades = this.upgradeSource[source][entindex];
		if (!sourceUpgrades || sourceUpgrades.length === 0) {
			return 0;
		}

		let removedCount = 0;
		const removedUpgrades: string[] = [];

		// 遍历该来源的升级列表
		for (const upgradeName of sourceUpgrades) {
			// 从单位数据中移除
			const index = data.upgrades.findIndex(u => u.name === upgradeName);
			if (index !== -1) {
				data.upgrades.splice(index, 1);
				removedUpgrades.push(upgradeName);
				removedCount++;

				// 刷新技能属性
				this.RefreshAbilityProperty(unit, upgradeName);

				// 发送事件
				Event.Fire("ability_upgrade_removed", {
					unit,
					upgradeName: upgradeName,
				});
			}
		}

		// 清除来源记录
		delete this.upgradeSource[source][entindex];

		if (removedCount > 0) {
			print(`[AbilityUpgrade] entindex ${entindex} removed source ${source} : ${removedCount}`);

			// 同步到客户端
			this.SyncToClient(unit);
		}

		return removedCount;
	}

	/**
	 * 获取单位的所有技能升级
	 * @param unit 目标单位
	 * @returns 技能升级列表
	 */
	GetAbilityUpgrades(unit: CDOTA_BaseNPC): UpgradeData[] {
		if (!IsValid(unit)) {
			return [];
		}

		const entindex = unit.GetEntityIndex();
		const data = IsServer() ? this.unitUpgrades[entindex] : CustomNetTables.GetNetData("ability_upgrade", `${entindex}`);

		return data !== undefined ? data.upgrades : [];
	}

	/**
	 * 检查单位是否有指定的技能升级
	 * @param unit 目标单位
	 * @param abilityUpgradeName 技能升级名称
	 * @returns 是否拥有该升级
	 */
	HasAbilityUpgrade(unit: CDOTA_BaseNPC, abilityUpgradeName: string): boolean {
		const upgrades = this.GetAbilityUpgrades(unit);
		for (let i = 0; i < upgrades.length; i++) {
			if (upgrades[i].name === abilityUpgradeName) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 获取单位某个技能升级的数量
	 * @param unit 目标单位
	 * @param abilityUpgradeName 技能升级名称
	 * @returns 拥有该升级的数量
	 */
	GetAbilityUpgradeCount(unit: CDOTA_BaseNPC, abilityUpgradeName: string): number {
		if (!IsValid(unit)) {
			return 0;
		}

		const entindex = unit.GetEntityIndex();
		const data = this.unitUpgrades[entindex];

		if (data === undefined || data.upgrades.length === 0) {
			return 0;
		}

		// 检查是否拥有该升级（新数据结构中每个升级是唯一的）
		return data.upgrades.some(u => u.name === abilityUpgradeName) ? 1 : 0;
	}

	/**
	 * 获取单位所有局内、以指定技能为目标的升级等级总和
	 * @param unit 目标单位
	 * @param abilityName 被升级的技能名称（对应 KV 中的 ability_name）
	 * @returns 所有匹配的局内升级等级总和
	 */
	GetUpgradeLevelSumByAbilityName(unit: CDOTA_BaseNPC, abilityName: string): number {
		if (!IsValid(unit)) {
			return 0;
		}

		const upgrades = this.GetAbilityUpgrades(unit);
		if (upgrades.length === 0) {
			return 0;
		}

		let sum = 0;
		for (let i = 0; i < upgrades.length; i++) {
			// 局外升级不属于本局获得的技能强化，不能计入此处的升级次数。
			const config = this.kv[upgrades[i].name];
			if (config !== undefined && config.ability_name === abilityName) {
				sum += upgrades[i].level;
			}
		}

		return sum;
	}

	/**
	 * 获取技能键值的升级后数值
	 * @param unit 目标单位
	 * @param abilityName 技能名称
	 * @param abilityLevel 技能等级（参数保留，但实际使用升级数据的 level）
	 * @param keyName 键值名称
	 * @param baseValue 基础值
	 * @returns 升级后的数值
	 */
	GetUpgradedValue(unit: CDOTA_BaseNPC, abilityName: string, abilityLevel: number, keyName: string, baseValue: number): number {
		if (!IsValid(unit)) {
			return baseValue;
		}

		const entindex = unit.GetEntityIndex();
		const data = IsServer() ? this.unitUpgrades[entindex] : CustomNetTables.GetNetData("ability_upgrade", `${entindex}`) as UnitAbilityUpgrades | undefined;

		if (data === undefined || data.upgrades.length === 0) {
			return baseValue;
		}

		let totalValue = baseValue;
		let totalMultiplierPct = 0;

		// 遍历所有相关升级
		for (const upgrade of data.upgrades) {
			const upgradeConfig = this.kv[upgrade.name] ?? this.service_kv[upgrade.name];

			if (upgradeConfig !== undefined &&
				upgradeConfig.ability_name === abilityName &&
				upgradeConfig.AbilityValues !== undefined) {

				const upgradeValue = upgradeConfig.AbilityValues[keyName];

				// 使用升级数据的 level，而不是参数的 abilityLevel
				totalValue += GetAbilityValues(
					upgradeValue,
					upgrade.level,  // 使用升级存储的 level
					unit
				);

				const multiplierValueName = upgradeConfig.AbilityValueMultipliers?.[keyName];
				if (multiplierValueName !== undefined) {
					totalMultiplierPct += GetAbilityValues(
						upgradeConfig.AbilityValues[multiplierValueName],
						upgrade.level,
						unit
					);
				}
			}
		}

		return totalValue * (1 + totalMultiplierPct * 0.01);
	}

	/**
	 * 清除单位的所有技能升级
	 * @param unit 目标单位
	 */
	ClearAbilityUpgrades(unit: CDOTA_BaseNPC): void {
		if (!IsValid(unit)) {
			return;
		}

		const entindex = unit.GetEntityIndex();

		// 清除单位的所有来源记录
		for (const source in this.upgradeSource) {
			delete this.upgradeSource[source][entindex];
		}

		delete this.unitUpgrades[entindex];

		// 同步到客户端
		CustomNetTables.SetNetData("ability_upgrade", `${entindex}`, undefined);

		// 发送事件
		Event.Fire("ability_upgrades_cleared", { unit });

		print(`[AbilityUpgrade] 单位 ${entindex} 技能升级已清除`);
	}

	/** 是否是局外升级 */
	IsServiceUpgrade(abilityUpgradeName: string): boolean {
		return this.service_kv[abilityUpgradeName] !== undefined;
	}

	/**
	 * 检查升级是否属于指定来源
	 * @param entindex 单位索引
	 * @param abilityUpgradeName 技能升级名称
	 * @param source 来源标识
	 * @returns 是否属于该来源
	 */
	private isUpgradeFromSource(entindex: number, abilityUpgradeName: string, source: string): boolean {
		const sourceUpgrades = this.upgradeSource[source]?.[entindex];
		return sourceUpgrades !== undefined && sourceUpgrades.includes(abilityUpgradeName);
	}

	/**
	 * 刷新技能属性
	 * @param unit 目标单位
	 * @param abilityUpgradeName 技能升级名称
	 */
	private RefreshAbilityProperty(unit: CDOTA_BaseNPC, abilityUpgradeName: string): void {
		const upgradeConfig = this.kv[abilityUpgradeName] ?? this.service_kv[abilityUpgradeName];
		if (upgradeConfig !== undefined && upgradeConfig.ability_name != undefined) {
			const ability = unit.FindAbilityByName(upgradeConfig.ability_name);
			if (ability !== undefined) {
				ability.RefreshStaticProperty();
				if (upgradeConfig.AbilityValues !== undefined && upgradeConfig.AbilityValues.abilitycharges != undefined) {
					ability.RefreshCharges();
				}
			}
		}
	}

	/**
	 * 同步单位的技能升级数据到客户端
	 * @param unit 目标单位
	 */
	private SyncToClient(unit: CDOTA_BaseNPC): void {
		const entindex = unit.GetEntityIndex();
		const data = this.unitUpgrades[entindex];

		if (data !== undefined) {
			// 同步完整的升级数据（包含 name 和 level）
			CustomNetTables.SetNetData("ability_upgrade", `${entindex}`, {
				upgrades: data.upgrades
			});
		}
	}

	reset(): void {
		this.unitUpgrades = {};
		this.upgradeSource = {};
	}
} declare global {
	var AbilityUpgrade: CAbilityUpgrade;
}

AbilityUpgrade ??= new CAbilityUpgrade();
