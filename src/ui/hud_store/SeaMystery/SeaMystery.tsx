import { createEffect, createMemo, createSignal, For, Index } from "solid-js";
import { EOM_Button } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_ToggleButton } from "../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { CurrencyIcon } from "../../../components/Player/Player";
import { StoreItem, StoreItemImage } from "../../../components/StoreItem/StoreItem";
import { createServiceNetData } from "../../../utils/solid_utils";
import "./SeaMystery.less";

type StoreProductData = (typeof KeyValues.info_shop_product)[keyof typeof KeyValues.info_shop_product];

interface SeaMysteryProps {
	itemList: StoreProductData[];
	/** 当前深海秘宝卡池为 3001；保留为参数以支持未来活动池。 */
	poolID?: number;
	/** 通知商店顶部货币栏冻结或恢复服务端数据刷新。 */
	onDrawStateChange?: (drawing: boolean) => void;
}

export const SeaMystery = (props: SeaMysteryProps) => {
	const poolID = () => props.poolID ?? 3001;
	const poolConfig = createMemo(() => KeyValues.drawcards[String(poolID())]);
	const rouletteList = createMemo(() => KeyValues.drawcards_pond[String(poolID())]?.map(item => String(item.drop_id)) ?? []);
	const purchasedProducts = createServiceNetData("player_shop_product_limits", {});
	const playerTokens = createServiceNetData("player_tokens", {});
	const playerCardGuarantees = createServiceNetData("player_card_guarantees", {});
	let pointer: Panel | undefined;
	let rotatingParticle: ParticleScenePanel | undefined;
	const power = () => 5;
	const [drawEnabled, setDrawEnabled] = createSignal(true);
	const [drawInProgress, setDrawInProgress] = createSignal(false);
	const [skipAnimation, setSkipAnimation] = createSignal(false);
	const [tokenCount, setTokenCount] = createSignal(0);
	const [luckyPercent, setLuckyPercent] = createSignal(0);
	const refreshDrawDisplay = () => {
		const guarantees = playerCardGuarantees()[poolConfig()?.inheritance_lucky ?? 0];
		const drawItem = poolConfig()?.item;
		setTokenCount(drawItem == undefined ? 0 : playerTokens()[drawItem]?.amounts ?? 0);
		setLuckyPercent((guarantees?.[5] ?? 0) / Math.max(1, poolConfig()?.q5_must ?? 1));
	};
	// 非抽奖期间正常同步；抽奖开始后锁定到结果展示，避免服务端数据抢先泄露结果。
	createEffect(() => {
		if (!drawInProgress()) refreshDrawDisplay();
	});
	const setDrawingState = (drawing: boolean) => {
		setDrawInProgress(drawing);
		props.onDrawStateChange?.(drawing);
	};

	function createCubicBezier(x1: number, y1: number, x2: number, y2: number) {
		const bezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
			const u = 1 - t;
			return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
		};
		const derivative = (t: number, p0: number, p1: number, p2: number, p3: number) => {
			const u = 1 - t;
			return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
		};
		return (x: number) => {
			let t = x;
			for (let i = 0; i < 5; i++) {
				const dx = derivative(t, 0, x1, x2, 1);
				if (dx === 0) break;
				t = Math.max(0, Math.min(1, t - (bezier(t, 0, x1, x2, 1) - x) / dx));
			}
			return bezier(t, 0, y1, y2, 1);
		};
	}

	const playDrawAnimation = (degrees: number, callback: () => void) => {
		rotatingParticle?.ReloadScene();
		rotatingParticle?.AddClass("Show");
		degrees += $.RandomInt(-14, 14);
		const easing = createCubicBezier(0.24, 0.24, 0, RemapValClamped(power(), 1, 5, 1.06, 1.02));
		Game.EmitSound("UI.SeaMystery.Draw");
		if (!pointer?.IsValid()) {
			callback();
			return;
		}

		const currentTransform = pointer.style.transform ?? "";
		let currentRotation = Number(currentTransform.match(/rotateZ\\(([-\\d.]+)deg\\)/)?.[1] ?? 0);
		const startRotation = currentRotation;
		const baseRotation = 360 * 2 * power();
		const targetRotation = baseRotation + (360 - baseRotation % 360) % 360 + degrees;
		const rotationRange = targetRotation - startRotation;
		const duration = (2 + power() * 0.2) * 1500;
		const startTime = Date.now();
		Timer.CreateTimer("SeaMysteryDrawAnimation", 0, () => {
			if (!pointer?.IsValid()) return;
			const progress = Math.min((Date.now() - startTime) / duration, 1);
			if (progress < 1) {
				currentRotation = startRotation + rotationRange * easing(progress);
				pointer.style.transform = `rotateZ(${currentRotation}deg)`;
				return 0;
			}
			rotatingParticle?.RemoveClass("Show");
			callback();
		});
	};

	const draw = (count: number) => {
		const config = poolConfig();
		if (!config || !drawEnabled()) return;
		setDrawEnabled(false);
		setDrawingState(true);
		ServerRequest("draw_card", { count, id: config.id }, (data) => {
			if (data.code != 0 || !data.items_list?.length) {
				setDrawEnabled(true);
				setDrawingState(false);
				return;
			}
			const resultItems = data.items_list;
			const pondItems = KeyValues.drawcards_pond[String(poolID())];
			const rarityMap: Record<string, number> = {};
			pondItems?.forEach((item: any) => { rarityMap[String(item.drop_id)] = item.drop_rarity ?? 0; });
			const matchedItems = resultItems.filter(item => rouletteList().includes(String(item.origin_item_id ?? item.item_id)));
			const targetItem = matchedItems.length > 0
				? matchedItems.sort((a, b) => (rarityMap[String(b.origin_item_id ?? b.item_id)] ?? 0) - (rarityMap[String(a.origin_item_id ?? a.item_id)] ?? 0))[0]
				: resultItems[resultItems.length - 1];
			const index = rouletteList().indexOf(String(targetItem.origin_item_id ?? targetItem.item_id));
			const showResult = () => {
				setDrawEnabled(true);
				refreshDrawDisplay();
				setDrawingState(false);
				const sortedItems = [...resultItems].sort((a, b) =>
					(rarityMap[String(b.origin_item_id ?? b.item_id)] ?? 0) - (rarityMap[String(a.origin_item_id ?? a.item_id)] ?? 0)
				);
				ShowPopup("StoreBuyItemResult", { title: GetLocalization("#SeaMysteryResultTitle"), result: "success", items: sortedItems });
			};
			if (index < 0 || skipAnimation()) {
				showResult();
			} else {
				playDrawAnimation(index * 30 + 15, showResult);
			}
		}, 15, () => {
			setDrawEnabled(true);
			setDrawingState(false);
		});
	};

	return <Panel id="SeaMysteryContent">
		<Panel id="DrawerBG" />
		<Panel id="DrawerBG2" />
		<Panel id="DrawerBG3" />
		<Panel id="LeftContent">
			{/* <Image id="SeaMysteryTitle" />
				<EOM_Currency id="SeaMysteryCurrency" icon={getImagePath(`tokens/${poolConfig()!.item}.png`)} value={tokenCount()} titleTooltip={{ title: `#${poolConfig()!.item}`, text: `#${poolConfig()!.item}_description` }} /> */}
			<Panel id="StoreItemContent">
				<Panel id="SeaMysteryDesc">
					<Label html id="SeaMysteryDesc_Title" text={GetLocalization("#SeaMystery")} />
					<Label html id="SeaMysteryDesc_Desc" text={GetLocalization("#SeaMysteryDesc")} />
				</Panel>
				<Panel id="ItemList" scroll="y">
					<Index each={props.itemList}>
						{data => <StoreItem itemid={data().id} purchased_num={purchasedProducts()[data().id]} />}
					</Index>
				</Panel>
			</Panel>
		</Panel>
		<Panel id="RightContent">
			{/* <CurrencyGroup tokens={[poolConfig()!.item]} /> */}
			<Panel id="RouletteTitleImage" />
			<Panel id="RouletteMain">
				<Panel id="Compass2" />
				<Panel id="Compass3">
					{/* <DOTAParticleScenePanel id="Compass3Particle" hittest={false} particleName="particles/ui/game/ui_game_athena_sea_treasure_fx.vpcf" lookAt="0 0 0" cameraOrigin="0 0 220" fov={60} squarePixels /> */}
				</Panel>
				<Panel id="Compass1" />
				{/* <DOTAParticleScenePanel id="Compass2Particle" hittest={false} particleName="particles/ui/game/ui_game_athena_sea_treasure_fx_static.vpcf" lookAt="0 0 0" cameraOrigin="0 0 220" fov={60} squarePixels />
					<DOTAParticleScenePanel id="RotatingParticle" ref={rotatingParticle} hittest={false} particleName="particles/ui/game/ui_game_athena_sea_treasure_rotation_01.vpcf" lookAt="0 0 0" cameraOrigin="0 0 114" fov={90} squarePixels /> */}
				<Panel id="Pointer" ref={pointer} hittest={false}>
					<DOTAParticleScenePanel id="PointerParticle" hittest={false} particleName="particles/ui/game/ui_game_athena_triden_01.vpcf" lookAt="0 0 0" cameraOrigin="0 0 290" fov={90} />
				</Panel>
				<Panel id="RouletteItemList">
					<For each={rouletteList()}>
						{(itemID, index) => <Panel class="RewardItemCol" style={{ transform: `rotateZ(${30 * index() + 15}deg)` }} hittest={false}>
							<DOTAParticleScenePanel id="Bubble" style={{ transform: `rotateZ(${-30 * index() - 15}deg)` }} visible={itemID == "110016"} hittest={false} particleName="particles/ui/game/ui_game_general_special_effects_02_fx.vpcf" cameraOrigin="0 0 40" fov={40} lookAt="0 0 0" />
							<StoreItemImage itemid={itemID} style={{ transform: `rotateZ(${-30 * index() - 15}deg)` }} />
						</Panel>}
					</For>
				</Panel>
			</Panel>
			<Panel id="RouletteTitle">
				<Label text={GetLocalization("#RouletteDesc")} />
				<Image id="Info" tooltip_text={GetLocalization("#RouletteInfo")} />
			</Panel>
			<Panel id="SeaMysteryLuckyContainer" tooltip_text="#Draw_Lucky_Tips">
				<Panel id="SeaMysteryLuckyFrame" >
					<Panel id="SeaMysteryLuckyFill" height={`${233 * Math.min(1, luckyPercent())}px`} >
						<Label id="SeaMysteryLuckyValue" text={`${Round(luckyPercent() * 100, 1)}%`} visible={luckyPercent() >= 0.5} />
					</Panel>
					<Panel id="SeaMysteryLuckyBadgeContent" transform={`translateY(${-233 * luckyPercent()}px)`}>
						<Panel id="SeaMysteryLuckyBadge" />
						<Label id="SeaMysteryLuckyValue" text={`${Round(luckyPercent() * 100, 1)}%`} visible={luckyPercent() < 0.5} />
					</Panel>
				</Panel>
				<Label id="SeaMysteryLuckyTitle" text={GetLocalization("#Draw_Pool_LuckyValue")} />
			</Panel>
			<Panel id="DrawBtnContainer">
				<Panel id="Draw1">
					<Panel class="CostContainer">
						<CurrencyIcon tokenID={poolConfig()!.item} />
						<Label text={`×${poolConfig()!.one_num}`} />
					</Panel>
					<EOM_Button enabled={drawEnabled() && tokenCount() >= poolConfig()!.one_num} text={GetLocalization("#Sea_Count_1")} onactivate={() => draw(1)} />
				</Panel>
				<Panel id="Draw2">
					<Panel class="CostContainer">
						<CurrencyIcon tokenID={poolConfig()!.item} />
						<Label text={`×${poolConfig()!.ten_num}`} />
					</Panel>
					<EOM_Button enabled={drawEnabled() && tokenCount() >= poolConfig()!.ten_num} text={GetLocalization("#Sea_Count_10")} onactivate={() => draw(10)} />
				</Panel>
			</Panel>
			<EOM_ToggleButton id="SkipButton" text={GetLocalization("#Draw_Skip_Animation")} onchange={(_, checked) => setSkipAnimation(checked)} />
		</Panel>
	</Panel>
};
