import classNames from "classnames";
import { batch, createEffect, createMemo, createSignal, For, on, onCleanup, onMount, ParentComponent, Show, untrack } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_Currency } from "../../../components/EOMDesign/DataDisplay/EOM_Currency/EOM_Currency";
import { EOM_BaseButton, EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { HeroCard } from "../../../components/hero/hero_card";
import { usePlayerAccountLevel } from "../../../components/service_utils/service_netdata_helper";
import { createServiceNetData, parseTokenCosts } from "../../../utils/solid_utils";
import { BasePopup, PopupProps } from "../base_popup";
import "./hero_talent.less";

export const Popup_HeroTalent: ParentComponent<PopupProps & { heroName: string; }> = (props) => {
	const [previewHeroName, setPreviewHeroName] = createSignal(props.heroName);
	const heroID = () => String(KeyValues.heroes[previewHeroName()]?.HeroID ?? 225);

	const player_heroes = createServiceNetData("player_heroes", {});
	const playerAccountLevel = usePlayerAccountLevel("hero_level");
	const heroLevel = () => playerAccountLevel().level ?? 0;
	const [changedTalentLevels, setChangedTalentLevels] = createStore<Record<string, number>>({});
	const [savedTalentLevels, setSavedTalentLevels] = createStore<Record<string, number>>({});

	// 反向依赖映射表：记录每个天赋是哪些天赋的前置
	// 格式：{ [talentID]: [{ dependentId: string, requiredLevel: number }] }
	const prerequisiteMap: Record<string, Array<{ dependentId: string, requiredLevel: number; }>> = {};
	Object.values(KeyValues.hero_talent).forEach(config => {
		if (config.requires) {
			const requires = config.requires.split("|");
			for (const require of requires) {
				const [requireId, requireLevel] = require.split(":");
				if (!prerequisiteMap[requireId]) {
					prerequisiteMap[requireId] = [];
				}
				prerequisiteMap[requireId].push({
					dependentId: config.talent_id,
					requiredLevel: toFiniteNumber(requireLevel)
				});
			}
		}
	});

	const getTalentTotalLevel = (talentID: string) => {
		return toFiniteNumber(savedTalentLevels[talentID]) + toFiniteNumber(changedTalentLevels[talentID]);
	};

	// 辅助函数：获取天赋的临时等级
	const getTalentTempLevel = (talentID: string) => {
		return toFiniteNumber(changedTalentLevels[talentID]);
	};

	// 取消临时天赋修改
	const cancelTalentChanged = () => {
		batch(() => {
			for (const key in changedTalentLevels) {
				setChangedTalentLevels(key, undefined as any);
			}
		});
	};

	const getTalentLevelsTable = () => {
		let talentLevels: Record<string, number> = {};
		for (const t in savedTalentLevels) {
			talentLevels[t] = savedTalentLevels[t];
		}
		for (const t in changedTalentLevels) {
			talentLevels[t] = toFiniteNumber(talentLevels[t]) + changedTalentLevels[t];
		}
		return talentLevels;
	};

	const player_tokens = createServiceNetData("player_tokens", {});

	function getTalentTokenCost(talents: Record<string, number>) {
		const costMap: Record<string, number> = {};
		for (const talentID in talents) {
			const savedLevel = toFiniteNumber(talents[talentID]);
			for (let i = 0; i < savedLevel; i++) {
				const effectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(i)];
				if (effectCfg?.talent_cost) {
					for (const cost of parseTokenCosts(effectCfg.talent_cost)) {
						costMap[cost.name] = (costMap[cost.name] ?? 0) + cost.value;
					}
				}
			}
		}
		return costMap;
	}

	// 只计算当前英雄已保存天赋的 token 消耗。
	const savedTokenCost = createMemo(() => {
		const heroInfo = player_heroes()[heroID()];
		const talents = JSON.parseSafe(heroInfo?.talents ?? "") ?? {};
		return getTalentTokenCost(talents);
	});

	// 计算临时天赋升级的 token 总消耗
	const tempTokenCost = createMemo(() => {
		const costMap: Record<string, number> = {};
		for (const talentID in changedTalentLevels) {
			const changeAmount = changedTalentLevels[talentID];
			if (changeAmount <= 0) continue;
			const savedLevel = toFiniteNumber(savedTalentLevels[talentID]);
			for (let i = 0; i < changeAmount; i++) {
				const level = savedLevel + i;
				const effectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(level)];
				if (effectCfg?.talent_cost) {
					for (const cost of parseTokenCosts(effectCfg.talent_cost)) {
						costMap[cost.name] = (costMap[cost.name] ?? 0) + cost.value;
					}
				}
			}
		}
		return costMap;
	});

	// 已保存消耗 + 临时消耗的总量
	const totalTokenCost = createMemo(() => {
		const costMap: Record<string, number> = { ...savedTokenCost() };
		for (const costName in tempTokenCost()) {
			costMap[costName] = (costMap[costName] ?? 0) + tempTokenCost()[costName];
		}
		return costMap;
	});

	// 检查天赋是否可以升级到下一级（token 足够 + 解锁等级满足）
	const canAffordTalentUpgrade = (talentID: string) => {
		const currentLevel = getTalentTotalLevel(talentID);
		const nextLevel = currentLevel + 1;
		// lock 从下一级配置获取（不变）
		const nextEffectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(nextLevel)];
		if (!nextEffectCfg) {
			return false;
		}
		// 解锁等级检查
		if (toFiniteNumber(nextEffectCfg.lock) > 0 && heroLevel() < nextEffectCfg.lock) return false;
		// talent_cost 从当前级配置获取 
		const curEffectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(currentLevel)];
		if (!curEffectCfg?.talent_cost) return true;
		// token 消耗检查（需扣除已保存消耗 + 临时消耗）
		const costs = parseTokenCosts(curEffectCfg.talent_cost);
		if (costs.length === 0) return false;
		return costs.every((cost) => {
			const actualAmount = player_tokens()?.[cost.name]?.amounts ?? 0;
			const totalCost = totalTokenCost()[cost.name] ?? 0;
			return actualAmount - totalCost - cost.value >= 0;
		});
	};


	const hasAnyChange = () => {
		for (const talentName in changedTalentLevels) {
			if (changedTalentLevels[talentName] != 0) {
				return true;
			}
		}
		return false;
	};

	// 加载已保存的天赋等级
	createEffect(on([heroID, player_heroes], () => {
		const curHeroID = heroID();
		const heroInfo = player_heroes()[curHeroID];
		const talents = JSON.parseSafe(heroInfo?.talents ?? "");
		batch(() => {
			for (const key in savedTalentLevels) {
				//@ts-ignore
				setSavedTalentLevels(key, undefined);
			}
			if (talents) {
				for (const key in talents) {
					if (savedTalentLevels[key] == undefined) {
						setSavedTalentLevels(key, talents[key]);
					}
				}
			}
			cancelTalentChanged();
		});
	}));


	let startX = 0;
	let startY = 0;
	let dragPanel: Panel | undefined;
	let dragNodeKey: string | undefined;
	let dragPanelInitx: number = 0;
	let dragPanelInity: number = 0;
	const [changePos, setChangePos] = createStore<Record<string, { x: number, y: number; }>>({});
	const [isAlt, setIsAlt] = createSignal(false);
	const getNodePos = (nodeKey: string, defaultX: number, defaultY: number) => {
		if (changePos[nodeKey]) {
			return { x: changePos[nodeKey].x, y: changePos[nodeKey].y };
		}
		return { x: defaultX, y: defaultY };
	};
	const getCursorPos = () => {
		const cursor = GameUI.GetCursorPosition();
		return {
			x: cursor[0] - Game.GetScreenWidth() / 2,
			y: cursor[1] - Game.GetScreenHeight() / 2
		};
	};

	// 优化：统一的节点尺寸计算函数，减少重复计算
	const getNodeHalfSize = (node: Panel) => {
		const scaleX = node.actualuiscale_x;
		const scaleY = node.actualuiscale_y;
		return {
			width: node.actuallayoutwidth / scaleX * 0.5,
			height: node.actuallayoutheight / scaleY * 0.5,
			scaleX,
			scaleY
		};
	};

	// 获取前置当前天赋的所有天赋及其所需等级
	// 返回格式：{ dependentId: string, currentLevel: number, requiredLevel: number }[]
	const getDependentTalents = (talentID: string) => {
		const map = prerequisiteMap;
		const dependents = map[talentID];

		if (!dependents || dependents.length === 0) {
			return [];
		}

		return dependents.map(({ dependentId, requiredLevel }) => ({
			dependentId,
			currentLevel: getTalentTotalLevel(dependentId),
			requiredLevel
		}));
	};

	const isPrerequisiteForOtherTalents = (talentIDToCheck: string) => {
		const currentLevel = getTalentTotalLevel(talentIDToCheck);

		if (currentLevel <= 0) {
			return false;
		}

		const levelAfterRefund = currentLevel - 1;

		// 获取所有依赖当前天赋的天赋
		const dependents = getDependentTalents(talentIDToCheck);

		// 检查是否有前置天赋会因为退点而不满足要求
		return dependents.some(({ currentLevel, requiredLevel }) =>
			currentLevel > 0 && levelAfterRefund < requiredLevel
		);
	};
	const [uiCanvas, setCanvas] = createSignal<any>();
	onMount(() => {
		const timer = setInterval(() => {
			if (dragNodeKey) {
				const cursor = getCursorPos();
				const offsetX = cursor.x - startX;
				const offsetY = cursor.y - startY;
				let newX = dragPanelInitx + offsetX;
				let newY = dragPanelInity + offsetY;
				let newRecord = { ...changePos };
				newRecord[dragNodeKey] = {
					x: newX,
					y: newY
				};
				setChangePos(newRecord);
			}
			setIsAlt(GameUI.IsAltDown() && Game.IsInToolsMode());
		}, 10);
		onCleanup(() => {
			clearInterval(timer);
		});
	});

	createEffect(() => {
		const canvas = uiCanvas();
		if (canvas == undefined) {
			return;
		}
		canvas.ClearJS("transparent");
		const talents = Object.values(KeyValues.hero_talent).filter(talent => {
			return String(talent.hero) == heroID();
		});

		// 节点半宽高，使连线连接到节点中心
		const halfNodeSize = 84 / 2;
		for (let i = 0; i < talents.length; i++) {
			const value = talents[i];
			const id = value.talent_id;
			if (value.requires) {
				const requires = value.requires.split("|");
				const [require_id, require_level] = requires[requires.length - 1].split(":");
				const startPos = getNodePos(require_id, toFiniteNumber(KeyValues.hero_talent[require_id].x), toFiniteNumber(KeyValues.hero_talent[require_id].y));
				const endPos = getNodePos(id, toFiniteNumber(value.x), toFiniteNumber(value.y));
				const isUnlock = getTalentTotalLevel(require_id) >= toFiniteNumber(require_level);

				canvas.DrawSoftLinePointsJS(2, [
					startPos.x + halfNodeSize,
					startPos.y + halfNodeSize,
					endPos.x + halfNodeSize,
					endPos.y + halfNodeSize
				], 4, 1, isUnlock ? "#C69947" : "#6e5d44");
			}
		}
	});
	createEffect(() => {
		for (const key in savedTalentLevels) {
			savedTalentLevels[key];
		}
		untrack(() => {
			cancelTalentChanged();
		});
	});

	return (<BasePopup id="HeroTalentPopup" PopupID={props.PopupID} group={props.group} size="large"
		title={LocalizeWithVars("HeroTalentTitle", { value: GetLocalization("#" + previewHeroName()) })}>
		<Panel id="Talent" class={"SelectHero" + heroID()}>
			<Panel id="TalentBlock">
				<Panel id="HeroSelectionList" >
					<For each={Object.keys(KeyValues.heroes)}>
						{(heroName, index) => {
							return <HeroCard heroName={heroName} selected={previewHeroName() == heroName} marginTop="26px" onactivate={() => {
								setPreviewHeroName(heroName);
							}} />;
						}}
					</For>
				</Panel>

				<Panel id="TalentContainer" >
					<UICanvas id="Canvas" ref={p => {
						$.Schedule(0.2, () => {
							setCanvas(p);
						});
					}} />
					<Panel class="Decoration" />
					<For each={Object.keys(KeyValues.hero_talent)}>
						{(talentID, _) => {
							const config = KeyValues.hero_talent[talentID];
							let x = toFiniteNumber(config.x);
							let y = toFiniteNumber(config.y);

							// 缓存前置要求数据解析
							const talentRequiresMemo = createMemo(() => {
								if (!config.requires) {
									return [];
								}
								return config.requires.split("|").map(d => {
									const [id, lv] = d.split(":");
									return {
										id,
										lv: toFiniteNumber(lv)
									};
								});
							});

							const isUnlocked = createMemo(() => {
								const requires = talentRequiresMemo();
								for (const { id, lv } of requires) {
									if (getTalentTotalLevel(id) < lv) {
										return false;
									}
								}
								return true;
							});

							// 天赋等级
							const talentLevel = createMemo(() => getTalentTotalLevel(talentID));

							const isMaxLevel = createMemo(() => talentLevel() >= config.max_level);
							const canUpgradeTalent = createMemo(() => {
								return isUnlocked() && !isMaxLevel() && canAffordTalentUpgrade(talentID);
							});

							const actualPos = createMemo(() => {
								const pos = getNodePos(talentID, x, y);
								return { x: pos.x, y: pos.y };
							});

							// 图标
							const iconPath = config.icon ? getImagePath("h3_hero_talent_tree/" + config.icon + ".png") : undefined;
							return <EOM_BaseButton id={talentID}
								style={{
									x: actualPos().x,
									y: actualPos().y
								}}
								class={classNames("TalentNode", { HideNode: heroID() != String(config.hero), Unlock: isUnlocked(), MaxLv: isMaxLevel() })}
								draggable={true}
								customTooltip={
									{
										name: "hero_talent",
										heroID: heroID(),
										talentName: talentID,
										level: talentLevel(),
										talentLevels: JSON.stringify(getTalentLevelsTable()),
										tokenCosts: JSON.stringify(totalTokenCost()),
									}
								}
								onDragStart={(p, c) => {
									// 只有按住 Alt 键时才能拖动
									if (!isAlt()) {
										return;
									}
									c.displayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "DragPanel");
									dragPanel = p;
									const parent = dragPanel.GetParent()!;
									const cursor = getCursorPos();
									startX = cursor.x;
									startY = cursor.y;

									// 绝对坐标模式：直接取面板当前位置，无需中心偏移计算
									const pos = dragPanel.GetPositionWithinAncestor(parent);
									const { scaleX, scaleY } = getNodeHalfSize(dragPanel);

									dragPanelInitx = pos.x / scaleX;
									dragPanelInity = pos.y / scaleY;
									dragNodeKey = talentID;
								}}
								onDragEnd={(p, c) => {
									c.DeleteAsync(-1);
									dragNodeKey = undefined;
								}}
								onactivate={() => {
									if (!canUpgradeTalent()) {
										return;
									}
									batch(() => {
										setChangedTalentLevels(talentID, (v) => toFiniteNumber(v) + 1);
										ClientSideEvent("FreshTalentLv", {
											name: talentID,
											level: getTalentTotalLevel(talentID),
											talentLevels: getTalentLevelsTable(),
										});
									});

								}}
								oncontextmenu={() => {
									batch(() => {
										// 检查是否还有临时点数可以退
										const tempLevel = getTalentTempLevel(talentID);
										if (tempLevel <= 0) {
											return;
										}
										// 检查是否是其他已升级天赋的前置依赖
										if (isPrerequisiteForOtherTalents(talentID)) {
											return;
										}
										setChangedTalentLevels(talentID, (v) => toFiniteNumber(v) - 1);
										ClientSideEvent("FreshTalentLv", {
											name: talentID,
											level: getTalentTotalLevel(talentID),
											talentLevels: getTalentLevelsTable(),
										});
									});
								}}
							>
								<Show when={canUpgradeTalent()}>
									<Panel class="TalentNodeLvBg" />
								</Show>
								<Panel id="TalentImage" classList={{ CustomIcon: iconPath != undefined }} backgroundImage={iconPath} />
								<Label id="TalentLv" text={`${talentLevel()}/${config.max_level}`} />
								<Panel id="LockImg" />

								<Show when={isAlt()}>
									<Label id="TalentPos" text={`${actualPos().x.toFixed(2)},${actualPos().y.toFixed(2)}`} />
									<Label id="TalentName" text={talentID} />
								</Show>
							</EOM_BaseButton>;
						}
						}
					</For>
				</Panel>
				<Panel id="TalentPoint" hittest={false}>
					<Panel class="CurrencyGroup" hittest={false}>
						<For each={[120012, 120013]}>
							{(tokenID) => {
								const actualAmount = () => player_tokens()?.[String(tokenID)]?.amounts ?? 0;
								const cost = () => totalTokenCost()[String(tokenID)] ?? 0;
								const displayValue = () => actualAmount() - cost();
								return <EOM_Currency
									titleTooltip={{ title: "#" + tokenID, text: "#" + tokenID + "_description" }}
									icon={getImagePath(`tokens/${tokenID}.png`)}
									value={displayValue()}
									currencyType="popup"
								/>;
							}}
						</For>
					</Panel>
					<Panel id="Btns" marginTop="10px" horizontalAlign="right" flowChildren="down">
						{/* <Label id="RemainingPoint" vars={{ value: talentRemainingPoints() }} text={"#RemainingPoint"} /> */}
						<EOM_Button id="ResetBtn" size={"Small"}
							text={"#Button_TalentReset"}
							onactivate={() => {
								CallAction("/v1/hero/change_talent", {
									hero_id: String(heroID()),
									talents: {}
								});
							}}
							html />
						<EOM_Button id="SaveBtn" enabled={hasAnyChange()} size={"Small"} text={"#Button_Save"} onactivate={() => {
							CallAction("/v1/hero/change_talent", {
								hero_id: String(heroID()),
								talents: getTalentLevelsTable()
							});
						}} />
						<EOM_Button id="CancelBtn" visible={hasAnyChange()} size={"Small"} text={"#Popup_Button_Cancel"} onactivate={() => {
							cancelTalentChanged();
						}} />
					</Panel>
				</Panel>
			</Panel>
		</Panel>
	</BasePopup>);
};
