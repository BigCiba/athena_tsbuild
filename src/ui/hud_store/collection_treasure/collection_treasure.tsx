import { createEffect, createMemo, createSignal, For, onCleanup, Show } from "solid-js";
import { EOM_CostLabel } from "../../../components/EOMDesign/DataDisplay/EOM_CostLabel/EOM_CostLabel";
import { EOM_RedMark } from "../../../components/EOMDesign/DataDisplay/EOM_RedMark/EOM_RedMark";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_MenuLayout_Content } from "../../../components/EOMDesign/Layout/EOM_MenuLayout/EOM_MenuLayout";
import { StoreItemBlock, StoreItemImage } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import "./collection_treasure.less";
import { CurrencyIcon } from "../../../components/Player/Player";
import { normalizeDisplayNumber } from "./number_format";

type TreasureLevelData = {
    attribute?: Record<string, number>;
    effect?: string;
    treasure_level_exp?: Record<string, number>;
    level_cost?: number;
};
type TreasureLevelEntry = {
    level: number;
    data: TreasureLevelData;
};
type TreasureEntry = {
    itemID: string;
    rarity: number;
    levels: TreasureLevelEntry[];
};
type PlayerTreasureData = {
    collection_treasure_id: number | string;
    level: number;
    extra_exp: number;
};
type CurrentAttributeState = "locked" | "empty" | "content";

const TREASURE_RARITY_LEVEL_LIMIT_TOOLTIPS: Record<string, string> = {
    2: "#TreasureRarityLevelLimit2",
    3: "#TreasureRarityLevelLimit3",
    4: "#TreasureRarityLevelLimit4",
    5: "#TreasureRarityLevelLimit5",
};

function clampPercent(value: number) {
    return Math.max(0, Math.min(100, value));
}

function attributeTexts(attribute?: Record<string, number>) {
    return Object.entries(attribute ?? {}).map(([attributeName, value]) => {
        return GetPropertyLocalization(attributeName, toFiniteNumber(value, 0));
    });
}

function privilegeTexts(effect: string | undefined, level: number) {
    if (!effect) return [];

    return effect.split("|").map(privilege => {
        const privilegeID = privilege.trim();
        if (!privilegeID) return "";

        const privilegeData = KeyValues.privilege[privilegeID];
        if (privilegeData == undefined) return "";

        return getKeyValueDescription(
            GetLocalization(`#DOTA_Tooltip_ability_${privilegeID}`, ""),
            privilegeData.AbilityValues,
            { level, onlyShowNowLevel: true }
        );
    }).filter(text => text != "");
}

function levelEffectTexts(data: TreasureLevelData, level: number) {
    return [
        ...attributeTexts(data.attribute),
        ...privilegeTexts(data.effect, level),
    ].filter(text => text != "");
}

function CurrentAttributeRow(props: { text: string; }) {
    return <Panel class="CurrentAttributeRow">
        <Image class="CurrentAttributeRowDot" />
        <Panel class="CurrentAttributeRowContent">
            <Image class="CurrentAttributeRowBG" />
            <Label class="CurrentAttributeRowText" html text={props.text} />
        </Panel>
    </Panel>;
}

function LevelEffectRow(props: { level: number; effectTexts: string[]; locked: boolean; expItemID?: number; expAmount?: number; }) {
    const hasExp = createMemo(() => {
        return props.expItemID != undefined && (props.expAmount ?? 0) > 0;
        // return false
    });

    return <Panel class="LevelEffectRow" classList={{ Locked: props.locked }}>
        <Panel class="LevelEffectRowDotContent">
            <Image class="LevelEffectRowDot" />
            <Label class="LevelEffectRowLevelText" text={`${props.level}`} />
        </Panel>
        <Panel classList={{
            "LevelEffectRowDescriptionContent": true,
            "WithExp": hasExp(),
        }}>
            <Image class="LevelEffectRowDescriptionBG" />
            <Panel class="LevelEffectRowDescriptionList">
                <For each={props.effectTexts}>
                    {(text, index) => <Label classList={{ "LevelEffectRowDescriptionText": true, "FirstRow": index() === 0 }} html text={text} />}
                </For>
            </Panel>
        </Panel>
        <Show when={hasExp()}>
            <Panel class="LevelEffectRowExpContent">
                <Image class="LevelEffectRowExpBG" />
                <Panel class="LevelEffectRowExpDescrioption">
                    <StoreItemImage itemid={210002} />
                    <Label class="LevelEffectRowExpText" text={`+${props.expAmount}`} />
                    {/* <Label class="LevelEffectRowExpName" text={`#TreasureEffectExpName`} /> */}
                </Panel>
            </Panel>
        </Show>
    </Panel>;
}

export function CollectionTreasure(props: { show?: boolean; }) {
    const playerTreasures = createServiceNetData("player_collection_treasures", {});
    const treasureList = createMemo<TreasureEntry[]>(() => {
        return Object.entries(KeyValues.collection_treasure ?? {}).map(([itemID, levelConfig]) => {
            const levels = Object.entries(levelConfig ?? {}).map(([level, data]) => ({
                level: toFiniteNumber(level, 0),
                data: data as TreasureLevelData,
            })).filter(({ level }) => level > 0)
                .sort((a, b) => a.level - b.level);

            return {
                itemID,
                rarity: GetServiceItemRarity(itemID),
                levels,
            };
        }).filter(({ levels }) => levels.length > 0)
            .sort((a, b) => b.rarity - a.rarity || toFiniteNumber(a.itemID) - toFiniteNumber(b.itemID));
    });

    const treasureByRarity = createMemo(() => {
        const result: Record<string, TreasureEntry[]> = {};
        for (const treasure of treasureList()) {
            result[treasure.rarity] ??= [];
            result[treasure.rarity].push(treasure);
        }
        return result;
    });

    const rarityList = createMemo(() => {
        return Object.keys(treasureByRarity()).sort((a, b) => Number(b) - Number(a));
    });

    const [selectedID, setSelectedID] = createSignal("");

    createEffect(() => {
        const selected = selectedID();
        if (selected && treasureList().some(treasure => treasure.itemID == selected)) {
            return;
        }
        setSelectedID(treasureList()[0]?.itemID ?? "");
    });

    const getTreasureConfig = (itemID: string) => {
        return treasureList().find(treasure => treasure.itemID == itemID);
    };
    const getTreasureLevelConfig = (itemID: string, level: number) => {
        const treasure = getTreasureConfig(itemID);
        return treasure?.levels.find(entry => entry.level == level);
    };

    const selectedTreasure = createMemo(() => {
        return getTreasureConfig(selectedID());
    });
    const selectedLevels = createMemo(() => selectedTreasure()?.levels ?? []);
    const maxLevel = createMemo(() => {
        return selectedLevels()[selectedLevels().length - 1]?.level ?? 0;
    });

    const getPlayerTreasureData = (itemID: string): PlayerTreasureData => {
        const treasureData = playerTreasures()[itemID];
        return {
            collection_treasure_id: treasureData?.collection_treasure_id ?? itemID,
            level: Math.max(0, toFiniteNumber(treasureData?.level, 0)),
            extra_exp: Math.max(0, toFiniteNumber(treasureData?.extra_exp, 0)),
        };
    };
    const selectedPlayerTreasure = createMemo(() => {
        return getPlayerTreasureData(selectedID());
    });
    const currentLevel = createMemo(() => {
        const max = maxLevel();
        return max > 0 ? Math.min(selectedPlayerTreasure().level, max) : 0;
    });
    const nextLevel = createMemo(() => {
        return currentLevel() + 1;
    });
    const nextLevelConfig = createMemo(() => {
        const level = nextLevel();
        return selectedLevels().find(entry => entry.level == level);
    });
    const isMaxLevel = createMemo(() => {
        const max = maxLevel();
        return max > 0 && currentLevel() >= max;
    });
    const levelProgressPercent = createMemo(() => {
        const max = maxLevel();
        if (max <= 0) return 0;
        return clampPercent(currentLevel() / max * 100);
    });
    const levelProgressSeparators = createMemo(() => {
        const max = maxLevel();
        const level = currentLevel();
        if (max <= 0 || level <= 1) return [];

        return Array.from({ length: level - 1 }, (_, index) => {
            return clampPercent((index + 1) / max * 100);
        });
    });
    const currentAttributes = createMemo(() => {
        const totals: Record<string, number> = {};
        const privileges: string[] = [];
        const level = currentLevel();
        if (level <= 0) return [];

        for (const entry of selectedLevels()) {
            if (entry.level > level) continue;

            for (const [attributeName, value] of Object.entries(entry.data.attribute ?? {})) {
                totals[attributeName] = (totals[attributeName] ?? 0) + toFiniteNumber(value, 0);
            }

            const text = privilegeTexts(entry.data.effect, entry.level).join("<br>");
            if (text != "") {
                privileges.push(text);
            }
        }

        const attributes = Object.entries(totals).map(([attributeName, value]) => {
            return GetPropertyLocalization(attributeName, normalizeDisplayNumber(value));
        });

        return [...attributes, ...privileges];
    });
    const currentAttributeState = createMemo<CurrentAttributeState>(() => {
        if (currentLevel() <= 0) return "locked";
        if (currentAttributes().length <= 0) return "empty";
        return "content";
    });
    const nextLevelCost = createMemo(() => {
        return nextLevelConfig()?.data.level_cost ?? 0;
    });
    const canTreasureLevelUp = (treasure: TreasureEntry) => {
        const treasureMaxLevel = treasure.levels[treasure.levels.length - 1]?.level ?? 0;
        if (treasureMaxLevel <= 0) return false;

        const treasureData = getPlayerTreasureData(treasure.itemID);
        const treasureLevel = Math.min(treasureData.level, treasureMaxLevel);
        if (treasureLevel >= treasureMaxLevel) return false;

        const treasureNextLevelConfig = treasure.levels.find(entry => entry.level == treasureLevel + 1);
        const treasureNextLevelCost = treasureNextLevelConfig?.data.level_cost ?? 0;
        return treasureNextLevelCost > 0 && treasureData.extra_exp >= treasureNextLevelCost;
    };
    const treasureItemRefs: Record<string, Panel> = {};
    let firstUpgradeableTreasureScrollSchedule: ScheduleID | undefined;
    let hasScrolledToFirstUpgradeableTreasure = false;

    createEffect(() => {
        if (hasScrolledToFirstUpgradeableTreasure || firstUpgradeableTreasureScrollSchedule != undefined) return;

        const firstUpgradeableTreasure = treasureList().find(canTreasureLevelUp);
        if (firstUpgradeableTreasure == undefined) return;

        setSelectedID(firstUpgradeableTreasure.itemID);
        // 等待列表项完成布局后，再定位到第一个可升级（带红点）的宝物。
        firstUpgradeableTreasureScrollSchedule = $.Schedule(0, () => {
            firstUpgradeableTreasureScrollSchedule = undefined;
            const treasureItem = treasureItemRefs[firstUpgradeableTreasure.itemID];
            if (!treasureItem?.IsValid()) return;

            treasureItem.ScrollParentToMakePanelFit(3, true);
            hasScrolledToFirstUpgradeableTreasure = true;
        });
    });
    onCleanup(() => {
        if (firstUpgradeableTreasureScrollSchedule == undefined) return;
        try {
            $.CancelScheduled(firstUpgradeableTreasureScrollSchedule);
        } catch (error) { }
    });
    const canLevelUp = createMemo(() => {
        const treasure = selectedTreasure();
        return treasure != undefined && canTreasureLevelUp(treasure);
    });
    const targetLevel = createMemo(() => {
        let level = currentLevel();
        let exp = selectedPlayerTreasure().extra_exp;

        for (const entry of selectedLevels()) {
            if (entry.level <= level) continue;

            const cost = entry.data.level_cost ?? 0;
            if (cost <= 0 || exp < cost) break;

            exp -= cost;
            level = entry.level;
        }

        return level;
    });
    const targetLevelCost = createMemo(() => {
        let costTotal = 0;

        for (const entry of selectedLevels()) {
            if (entry.level <= currentLevel()) continue;
            if (entry.level > targetLevel()) break;

            costTotal += entry.data.level_cost ?? 0;
        }

        return Math.max(costTotal, nextLevelCost());
    });
    const costItemID = createMemo(() => {
        return toFiniteNumber(selectedID(), 0);
    });
    const fastUpgradeIDs = createMemo(() => {
        return treasureList()
            .filter(treasure => canTreasureLevelUp(treasure))
            .map(treasure => toFiniteNumber(treasure.itemID, 0))
            .filter(itemID => itemID > 0);
    });
    const [requesting, setRequesting] = createSignal(false);
    let refImageBg: Panel | undefined;
    function ShowLevelupFx() {
        if (!refImageBg?.IsValid()) return;
        $.CreatePanel("DOTAParticleScenePanel", refImageBg, "LevelupFx", {
            particleName: "particles/ui/game/ui_game_falling_star_01.vpcf",
            cameraOrigin: "0 0 256",
            lookAt: "0 0 0",
            squarePixels: true,
            fov: 90,
            hittest: false,
        }).DeleteAsync(3);
        Game.EmitSound("ui.npe_badge");
    }

    return <EOM_MenuLayout_Content id="CollectionTreasureRoot" show={props.show}>
        <Panel id="CollectionTreasurePanel">
            <Image id="CollectionTreasureBG" />
            <Panel id="CollectionDetails">
                <Panel id="CollectionTopContent">
                    <Panel id="CollectionItemIconContent" ref={refImageBg}>
                        <StoreItemImage id="CollectionItemIcon" itemid={costItemID()} hittest={false} />
                    </Panel>
                    <Panel id="CollectionTopRightContent">
                        <Panel id="CollectionTitle">
                            <Label id="CollectionTitleText" class={"Rarity" + (selectedTreasure()?.rarity ?? 1)} text={`#${selectedID()}`} />
                        </Panel>
                        <Panel id="CollectionSubTitle">
                            <Image id="CollectionSubTitleBG" />
                            {/* <Label id="CollectionSubTitleText" class={"Rarity" + (selectedTreasure()?.rarity ?? 1)} text={`#Collection_Rarity_Treasure${selectedTreasure()?.rarity ?? 1}`} /> */}
                            <Label id="CollectionSubTitleText" text={`#TreasureSubTitle`} />
                        </Panel>

                        {/* <Panel id="CollectionLevelContent">
                            <Label id="CollectionLevelText" text={`Lv.${currentLevel()} / ${maxLevel()}`} />
                            <Panel id="CollectionLevelProgressBar">
                                <Panel id="CollectionLevelProgressBG" />
                                <Panel id="CollectionLevelProgressTrack">
                                    <Panel id="CollectionLevelProgressFill" style={{ clip: `rect( 0%, ${levelProgressPercent()}%, 100%, 0% )` }} />
                                    <For each={levelProgressSeparators()}>
                                        {(percent) => <Panel class="CollectionLevelProgressSeparator" style={{ position: `${percent}% 0px 0px` }} />}
                                    </For>
                                </Panel>
                            </Panel>
                        </Panel> */}
                        <Panel id="LvArea">
                            <Panel id="CollectionLevelContentWithBorder">
                                <Image class="CollectionLevelBG" />
                                <Panel id="CollectionLevelBorderTextContent">
                                    <Label class="CollectionLevelBorderText BorderText" text={`${currentLevel()}`} />
                                </Panel>
                            </Panel>
                            <Panel id="Triangle" visible={targetLevel() > currentLevel()} />
                            <Panel id="TargetLevel" visible={targetLevel() > currentLevel()}>
                                <Image class="CollectionLevelBG" />
                                <Panel id="CollectionLevelBorderTextContent">
                                    <Label class="CollectionLevelBorderText BorderText" text={`${targetLevel()}`} />
                                </Panel>
                            </Panel>
                        </Panel>
                    </Panel>
                </Panel>
                <Image class="CollectionDivider" />
                <Panel id="CollectionCurrentAttributes">
                    <Show when={currentAttributeState() == "locked"} fallback={<>
                        <Panel id="CollectionCurrentAttributesTitle">
                            <Image id="CollectionCurrentAttributesBG" />
                            <Label id="CollectionCurrentAttributesText" text="#TreasureCurrentAttributeTag" />
                        </Panel>
                        <Panel id="CollectionAttributesList">
                            <Show when={currentAttributeState() == "empty"} fallback={
                                <For each={currentAttributes()}>
                                    {(text) => <CurrentAttributeRow text={text} />}
                                </For>
                            }>
                                <Label class="CollectionAttributesPlaceholder" text="#TreasureCurrentAttributeNoDescription" />
                            </Show>
                        </Panel>
                    </>}>
                        <Panel id="CollectionCurrentAttributesLockedContent">
                            <Label id="CollectionCurrentAttributesLockedText" text="#TreasureCurrentAttributeLocked" />
                        </Panel>
                    </Show>
                </Panel>
                <Image class="CollectionDivider" />
                <Panel id="CollectionLevelEffects" classList={{ MaxLevel: isMaxLevel() }}>
                    <Panel id="CollectionLevelEffectsTitleContent">
                        {/* <Image id="CollectionLevelEffectsTitleBG" />
                        <Panel id="CollectionLevelEffectsTitle">
                            <Label id="CollectionLevelEffectsText1" text="#TreasureCurrentEffectTag" />
                            <Label id="CollectionLevelEffectsText2" text="#TreasureCurrentLevelPrefix" />
                            <Label id="CollectionLevelEffectsText3" text={`Lv.${currentLevel()}`} />
                        </Panel> */}
                        <Image id="CollectionCurrentAttributesBG" />
                        <Label id="CollectionCurrentAttributesText" text="#TreasureCurrentEffectTag" />
                    </Panel>
                    <Panel id="CollectionLevelEffectsList">
                        <For each={selectedLevels()}>
                            {({ level, data }) => {
                                const expEntry = Object.entries(data.treasure_level_exp ?? {})[0];
                                const expItemID = expEntry ? toFiniteNumber(expEntry[0], 0) : undefined;
                                const expAmount = expEntry ? toFiniteNumber(expEntry[1], 0) : undefined;

                                return <LevelEffectRow
                                    level={level}
                                    effectTexts={levelEffectTexts(data, level)}
                                    locked={level > currentLevel()}
                                    expItemID={expItemID}
                                    expAmount={expAmount}
                                />;
                            }}
                        </For>
                    </Panel>
                </Panel>
                <Show when={!isMaxLevel()}>
                    <Panel id="CollectionUpgradeSection">
                        <Panel id="CollectionUpgradeCostLabel">
                            {/* <Label id="CollectionUpgradeCostText1" vars={{ level: nextLevel() }} text={isMaxLevel() ? "#Collection_LevelMax" : "#TreasureUpgradeToText"} /> */}
                            <Label id="CollectionUpgradeCostText2" text="#TreasureUpgradeCostText" visible={!isMaxLevel()} />
                        </Panel>
                        <Panel id="CollectionUpgradeItemBlock">
                            <StoreItemBlock item_id={costItemID()} /*amounts={selectedPlayerTreasure().extra_exp}*/ visible={!isMaxLevel()} />
                            <Show when={canLevelUp()}>
                                <EOM_RedMark align="right top" />
                            </Show>
                        </Panel>
                        <EOM_CostLabel id="UpgradeCost" have={Math.min(selectedPlayerTreasure().extra_exp, targetLevelCost())} cost={targetLevelCost()} visible={!isMaxLevel()} />
                        <EOM_Button
                            id="UpgradeBtn"
                            text="#TreasureUpgradeBtn"
                            color="Confirm"
                            visible={true}
                            enabled={!requesting() && canLevelUp()}
                            onactivate={self => {
                                if (requesting()) return;
                                if (!canLevelUp()) return;
                                setRequesting(true);
                                CallActionRequest("/v1/collection/levelup_treasure", {
                                    collection_treasure_ids: [costItemID()],
                                }, () => {
                                    setRequesting(false);
                                    ShowLevelupFx();
                                });
                            }} />
                    </Panel>
                </Show>
            </Panel>
            <Panel id="CollectionRightContainer">
                <Panel id="CollectionList" scroll="y">
                    <For each={rarityList()}>
                        {(rarity) => <>
                            <Panel class={`CollectionRarityTitle Rarity${rarity}`}>
                                <Panel class={`CollectionRarityTitleContent Rarity${rarity}`}>
                                    <Label class={`RarityTitle Rarity${rarity}`} text={`#Collection_Rarity_Treasure${rarity}`} />
                                    <Image
                                        class={`CollectionRarityIcon Rarity${rarity}`}
                                        onmouseover={(panel) => {
                                            const tooltip = TREASURE_RARITY_LEVEL_LIMIT_TOOLTIPS[rarity];
                                            if (tooltip) {
                                                ShowCustomTooltip(panel, "text", { text: tooltip });
                                            }
                                        }}
                                        onmouseout={(panel) => HideCustomTooltip(panel, "text")}
                                    />
                                </Panel>
                            </Panel>
                            <For each={treasureByRarity()[rarity]}>
                                {(treasure) => {
                                    const treasureData = () => getPlayerTreasureData(treasure.itemID);
                                    const treasureMaxLevel = () => treasure.levels[treasure.levels.length - 1]?.level ?? 0;
                                    const treasureLevel = () => Math.min(treasureData().level, treasureMaxLevel());
                                    const treasureIsMax = () => treasureMaxLevel() > 0 && treasureLevel() >= treasureMaxLevel();

                                    return <Panel
                                        class="CollectionTreasureItem"
                                        ref={(panel: Panel) => { treasureItemRefs[treasure.itemID] = panel; }}
                                        classList={{
                                            [`Rarity${treasure.rarity}`]: true,
                                            Lock: treasureLevel() <= 0,
                                            Selected: selectedID() == treasure.itemID,
                                        }}
                                        onactivate={() => setSelectedID(treasure.itemID)}
                                    >
                                        <Show when={selectedID() == treasure.itemID}>
                                            <DOTAParticleScenePanel id="BorderParticle" particleName="particles/ui/game/ui_game_general_special_effects_03_fx.vpcf" cameraOrigin="0 0 93" fov={45} lookAt="0 0 0" hittest={false} squarePixels />
                                        </Show>
                                        <Panel id="CardBG" />
                                        <StoreItemImage id="CollectionIcon" itemid={treasure.itemID} />
                                        <Label id="Name" class={`Rarity${treasure.rarity}`} text={`#${treasure.itemID}`} />
                                        <Image id="LockIcon" hittest={false} />
                                        <Label id="CollectionLevel" classList={{ Max: treasureIsMax() }} visible={treasureLevel() > 0} text={`Lv.${treasureLevel()}${treasureIsMax() ? "(MAX)" : ""}`} />
                                        <EOM_CostLabel id="CollectionNumberCount" visible={treasureLevel() <= 0} hiddenCostOnZero={true} have={getPlayerTreasureData(treasure.itemID).extra_exp} cost={getTreasureLevelConfig(treasure.itemID, treasureLevel() + 1)?.data.level_cost ?? 0} />
                                        <Panel id="HasCount" visible={treasureLevel() > 0 && !treasureIsMax()}>
                                            <Panel id="IconContainer">
                                                <Panel id="IconBG" />
                                                <StoreItemImage id="SmallCollectionIcon" itemid={treasure.itemID} />
                                            </Panel>
                                            <Label id="HasCountText" text={`x${treasureData().extra_exp}`} />
                                        </Panel>
                                        <Panel id="SelectedHover" hittest={false} />
                                        <Show when={canTreasureLevelUp(treasure)}>
                                            <EOM_RedMark align="right top" />
                                        </Show>
                                    </Panel>;
                                }}
                            </For>
                        </>}
                    </For>
                </Panel>
                <Panel id="CollectionRightOperations">
                    <EOM_Button
                        id="FastUpgradeBtn"
                        text="#TreasureFastUpgradeBtn"
                        color="Gold"
                        visible={true}
                        enabled={!requesting() && fastUpgradeIDs().length > 0}
                        onactivate={self => {
                            if (requesting()) return;
                            const ids = fastUpgradeIDs();
                            if (ids.length <= 0) return;
                            setRequesting(true);
                            CallActionRequest("/v1/collection/levelup_treasure", {
                                collection_treasure_ids: ids,
                            }, () => {
                                setRequesting(false);
                                if (ids.includes(costItemID())) {
                                    ShowLevelupFx();
                                }
                            });
                        }} />
                </Panel>
            </Panel>
        </Panel>
    </EOM_MenuLayout_Content>;
}
