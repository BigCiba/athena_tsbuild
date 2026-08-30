import classNames from "classnames";
import { For, ParentComponent, Show, children, createEffect, createMemo, createSignal, mergeProps, on, onCleanup, onMount, splitProps } from "solid-js";
import { createServiceNetData } from "../../utils/solid_utils";
import { GetPlayerInfoCache } from "../service_utils/service_netdata_helper";
import { EOM_Currency } from "../EOMDesign/DataDisplay/EOM_Currency/EOM_Currency";
import { EOM_BaseButton, EOM_Button } from "../EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../EOMDesign/Input/EOM_TextEntry/EOM_TextEntry";
import "./player.less";

const DEFAULT_AVATAR_BORDER_ID = "1710000";

interface PlayerAvatarAttribute extends PanelAttributes {
	/** 玩家ID */
	playerid?: PlayerID;
	/** 长id */
	steamid?: string | number;
	/** 短id */
	accountid?: string | number;
	/** 指定头像框；未指定时监听目标玩家资料缓存，本地玩家优先读取实时装备。 */
	borderid?: string | number;
}

function getEquippedAvatarBorderID(cosmeticEquips: NetDataDeclarations["player_cosmetic_equips"] | undefined) {
	for (const equip of Object.values(cosmeticEquips ?? {})) {
		const cosmeticID = String(equip.cosmetic_id);
		if (KeyValues.info_item_cosmetic[cosmeticID]?.type == COSMETIC_TYPE.BORDER) {
			return cosmeticID;
		}
	}
	return undefined;
}

export const PlayerAvatar: ParentComponent<PlayerAvatarAttribute> = (props) => {
	const [local, other] = splitProps(props, ["playerid", "steamid", "accountid", "borderid", "classList"]);
	const player_cosmetic_equips = createServiceNetData("player_cosmetic_equips", {});
	const cachedPlayerInfo = GetPlayerInfoCache({
		playerID: () => local.playerid,
		steamID: () => local.accountid,
		steam64ID: () => local.steamid,
	});
	const localPlayerSteamID = createMemo(() => CustomUIConfig.PlayerManager.ResolveSteamID({ playerID: Players.GetLocalPlayer() }));
	const isLocalPlayer = createMemo(() => {
		if (local.playerid != undefined) return local.playerid == Players.GetLocalPlayer();
		const targetSteamID = cachedPlayerInfo.steamID();
		return targetSteamID != undefined && targetSteamID == localPlayerSteamID();
	});
	let avatarImage: AvatarImage | undefined;
	const borderID = createMemo(() => {
		if (local.borderid != undefined) {
			return String(local.borderid);
		}
		const cachedBorderID = getEquippedAvatarBorderID(cachedPlayerInfo.data()?.player_cosmetic_equips);
		if (isLocalPlayer()) {
			return getEquippedAvatarBorderID(player_cosmetic_equips()) ?? cachedBorderID ?? DEFAULT_AVATAR_BORDER_ID;
		}
		return cachedBorderID ?? DEFAULT_AVATAR_BORDER_ID;
	});
	const steamid = createMemo(() => {
		if (local.steamid != undefined) {
			return local.steamid.toString();
		}
		if (local.playerid != undefined) {
			return Game.GetPlayerInfo(local.playerid)?.player_steamid;
		}
		return "-1";
	});
	const accountid = createMemo(() => {
		if (local.accountid != undefined) {
			return local.accountid.toString();
		}
		const steamID = steamid();
		return steamID != undefined ? Steam_64_3(steamID) : undefined;
	});
	const updateAccountID = () => {
		if (avatarImage != undefined && avatarImage.IsValid() && accountid() != undefined) {
			avatarImage.accountid = accountid()!;
		}
	};
	onMount(() => {
		let interval_id = setInterval(() => {
			if (avatarImage != undefined && avatarImage.IsValid()) {
				updateAccountID();
				clearInterval(interval_id);
				interval_id = -1;
			}
		}, 10);
		onCleanup(() => {
			if (interval_id != -1) {
				clearInterval(interval_id);
			}
		});
	});
	createEffect(updateAccountID);
	return <AvatarBorder class={classNames("PlayerAvatar", { ...local.classList })} borderid={borderID()} {...other} hittest={false} >
		<DOTAAvatarImage ref={avatarImage} steamid={steamid()} nocompendiumborder={true} hittest={false} hittestchildren={false} style={{ width: "48.04688%", height: "48.04688%", align: "center center", borderRadius: "10%" }} />
	</AvatarBorder>;
};

export const AvatarBorder: ParentComponent<PanelAttributes & { borderid: string; }> = (props) => {
	const [local, other] = splitProps(props, ["borderid", "classList", "children"]);
	const resolved = children(() => local.children);
	const particleName = createMemo(() => KeyValues.info_item_cosmetic[String(local.borderid)]?.particle ?? "");
	return <Panel classList={{ "AvatarBorder": true, ...local.classList }} {...other} >
		{resolved()}
		<Panel id="BaseBorder" hittest={false} style={{
			width: "100%",
			height: "100%",
			align: "center center",
			zIndex: 1,
			overflow: "noclip",
			backgroundImage: getImagePath(`store_items/${local.borderid}.png`),
			backgroundSize: "100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
		}} />
		<Show when={particleName() != ""}>
			<DOTAParticleScenePanel
				class="AvatarBorderParticle"
				particleName={particleName()}
				cameraOrigin="0 0 280"
				lookAt="0 0 0"
				fov={60}
				hittest={false}
				squarePixels
				particleonly
			/>
		</Show>
	</Panel>;
};

/** 显示称号图片及其配置的 UI 粒子特效。 */
export const PlayerTitle = (props: PanelAttributes & { titleid: string | number; }) => {
	const [local, other] = splitProps(props, ["titleid", "classList"]);
	const titleID = createMemo(() => String(local.titleid));
	const particleName = createMemo(() => KeyValues.info_item_cosmetic[titleID()]?.particle?.trim() ?? "");
	return <Panel classList={{ "PlayerTitle": true, ...local.classList }} {...other}>
		<Image
			class="PlayerTitleImage"
			src={getSrcPath(`cosmetic/AVATAR_NAME/${Language()}/${titleID()}.png`)}
			scaling="stretch-to-cover-preserve-aspect"
			hittest={false}
		/>
		<Show when={particleName()}>
			<DOTAParticleScenePanel
				class="PlayerTitleParticle"
				particleName={particleName()}
				cameraOrigin="0 0 200"
				lookAt="0 0 0"
				fov={60}
				hittest={false}
				squarePixels
				particleonly
			/>
		</Show>
	</Panel>;
};


interface PlayerCurrencyProps extends PanelAttributes {
	itemID: number;
	/**货币栏样式 */
	currencyType?: "top" | "popup";
	/** 指定显示数值；未指定时自动读取玩家数据。 */
	value?: number;
}
function GetPropNum(props: NetDataDeclarations["player_props"], item_id: number) {
	if (!props) return 0;
	let num = 0;
	for (let prop of Object.values(props)) {
		if (prop.prop_id == item_id) {
			num += prop.amounts;
		}
	}
	return num;
}
/** 货币栏 */
export const PlayerCurrency = (props: PlayerCurrencyProps) => {
	const propType = GetPropType(props.itemID);
	const icon = createMemo(() => {
		if (propType == PropType.Token) {
			return getImagePath(`tokens/${props.itemID}.png`);
		}
		return getImagePath(`store_items/${props.itemID}.png`);
	});
	const hasAddbutton = () => {
		if (props.itemID == 110001
			|| props.itemID == 110014
		) {
			return true;
		}
		return false;
	};
	const sourceValue = (() => {
		if (propType == PropType.Token) {
			const playerTokens = createServiceNetData("player_tokens", {});
			return createMemo(() => playerTokens()[props.itemID.toString()]?.amounts ?? 0);
		}
		if (propType == PropType.Hero) {
			const heroID = GetHeroInfoByGoodID(props.itemID)?.heroID;
			const playerHeroes = createServiceNetData("player_heroes", {});
			return createMemo(() => heroID != undefined ? playerHeroes()[heroID.toString()]?.extra_star_exp ?? 0 : 0);
		}
		if (propType == PropType.Courier) {
			const playerCouriers = createServiceNetData("player_couriers", {});
			return createMemo(() => playerCouriers()[props.itemID.toString()]?.extra_star_exp ?? 0);
		}
		if (propType == PropType.Essences) {
			const playerCollectionEssences = createServiceNetData("player_collection_essences", {});
			return createMemo(() => playerCollectionEssences()[props.itemID.toString()]?.extra_exp ?? 0);
		}
		const playerProps = createServiceNetData("player_props", {});
		return createMemo(() => GetPropNum(playerProps(), props.itemID));
	})();
	const value = createMemo(() => props.value ?? sourceValue());
	return (
		<EOM_Currency currencyType={props.currencyType} icon={icon()} value={value()} titleTooltip={{ title: "#" + props.itemID, text: "#" + props.itemID + "_description" }} onaddbuttonactivate={hasAddbutton() ? () => {
			if (props.itemID == 110001) {
				JumpToMenu({
					window_name: "store",
					menu: "Resource",
					force: true
				});
			}
			if (props.itemID == 110014) {
				ClientSideEvent("directly_purchase", { itemid: 802207, source: "DiceTokenAddButton" });
			}
		} : undefined} />
	);
};

/** 兑换输入按钮 */
const getCdkeyFailText = (message?: string) => {
	if (message?.includes("fetch cdkey error")) {
		return "#fetch_cdkey_error";
	}
	return "#" + (message?.replace(/\s+/g, "_") ?? "");
};

interface CdkeyRewardItem {
	item_id: number;
	amounts?: number;
	item_rarity?: number;
	equip_id?: number | string;
}

interface CdkeyReceiveResponse {
	code?: number;
	message?: string;
	data?: {
		add_items?: {
			common?: CdkeyRewardItem[];
		};
	};
}

const getCdkeyRewardItems = (data: CdkeyReceiveResponse) => {
	return data.data?.add_items?.common ?? [];
};

const showCdkeyReceiveResult = (data: CdkeyReceiveResponse) => {
	$.Msg(data);
	if (data.code == 0) {
		CustomUIConfig.showPopup("CommonConfirm", {
			text: "",
			title: "#CDK_Success",
			icon: "conv_checkmark",
			items: getCdkeyRewardItems(data)
		});
	} else {
		CustomUIConfig.showPopup("CommonConfirm", {
			text: getCdkeyFailText(data.message),
			title: "#CDK_Fail",
			icon: "conv_worngmark"
		});
	}
};

export const ExchangeEntry = () => {
	const [key, setKey] = createSignal("");
	return (
		<Panel className="ExchangeEntry" hittest={false}>
			<EOM_TextEntry style={{ border: "0px", backgroundColor: "none" }} className={Language()} placeholder="#Store_Exchange_Placeholder" onChange={self => {
				setKey(self.text);
			}} oninputsubmit={(self) => {
				CallActionRequest("/v1/cdkey/receive", {
					key: key()
				}, showCdkeyReceiveResult);
			}} />
			<EOM_BaseButton id="ExchangeBTN" onactivate={() => {
				CallActionRequest("/v1/cdkey/receive", {
					key: key()
				}, showCdkeyReceiveResult);
			}} >
				{/* <Label id="ExchangeLabel" text="#Store_Exchange_Button" /> */}
			</EOM_BaseButton>
		</Panel>
	);
};

// 货币组
export const CurrencyGroup = (props: {
	/** 货币id列表 */
	tokens: number[];
	/** 按货币 ID 覆盖显示数值；用于需要延后展示服务端刷新结果的页面。 */
	values?: Partial<Record<number, number>>;
	/** 兑换输入框 */
	exchangeButton?: boolean;
	/** 补单 */
	recentOrder?: boolean;
	/**货币栏样式 */
	currencyType?: "top" | "popup";
} & PanelAttributes) => {
	const merged = mergeProps(props, { class: "CurrencyGroup" });
	const [local, others] = splitProps(merged, ["tokens", "values", "exchangeButton", "recentOrder", "currencyType"]);
	return (
		<Panel {...others} hittest={false}>
			<Show when={local.recentOrder}>
				<EOM_Button id="RecentOrder" size="Small" onactivate={self => {
					self.enabled = false;
					CallActionRequest("/v1/shop/supplement_orders", {}, () => {
						self.enabled = true;
					});
				}} >
					<Label id="RecentOrderLabel" text="#StoreRechargeReport" />
				</EOM_Button>
			</Show>
			<Show when={local.exchangeButton}>
				<ExchangeEntry />
			</Show>
			<For each={props.tokens}>
				{(tokenID) => {
					return <PlayerCurrency currencyType={local.currencyType} itemID={tokenID} value={local.values?.[tokenID]} />;
				}}
			</For>
		</Panel>
	);
};

export const CurrencyIcon = (props: { tokenID: number; } & PanelAttributes) => {
	const defaultClass = () => props.tokenID == PayType.MONEY ? { class: "CurrencyIcon " + props.tokenID } : { class: "CurrencyIcon CurrencyCash " + props.tokenID };
	const merged = mergeProps(props, defaultClass());
	const [local, others] = splitProps(merged, ["tokenID"]);
	return (
		<Show when={props.tokenID == PayType.MONEY} fallback={
			<Image {...(others) as ImageAttributes} src={getSrcPath(`tokens/${props.tokenID}.png`)} />
		}>
			<Label {...(others) as LabelAttributes} text={(() => {
				const language = Language();
				let dollarMark = "￥";
				if (language == "english") {
					dollarMark = "$";
				} else if (language == "russian") {
					dollarMark = "₽";
				}
				return dollarMark;
			})()} />
		</Show>
	);
};

interface PlayerNameAttribute extends PanelAttributes {
	/** 长id */
	steamid?: string | number;
	/** 短id */
	accountid?: string | number;
	/** 是否显示工会 */
	showgGild?: boolean;
}
export const PlayerName: ParentComponent<PlayerNameAttribute> = (props) => {
	const merged = mergeProps({ showgGild: false }, props);
	const [local, other] = splitProps(merged, ["children", "steamid", "accountid", "showgGild", "classList"]);
	const resolved = children(() => local.children);

	const showgGild = createMemo(() => local.showgGild);
	const steamid = createMemo(() => local.steamid != undefined ? local.steamid.toString() : undefined);
	const accountid = createMemo(() => {
		if (local.accountid != undefined) {
			return local.accountid.toString();
		}
		const steamID = steamid();
		return steamID != undefined ? Steam_64_3(steamID) : undefined;
	});
	let userNamePanel: UserName | undefined;
	const [username, setUserName] = createSignal("");

	let p_timer = -1;
	const updateName = () => {
		if (p_timer != -1) {
			clearInterval(p_timer);
		}
		// 开启计时器
		p_timer = setInterval(() => {
			if (userNamePanel != undefined && userNamePanel.IsValid()) {
				let label = userNamePanel.GetChild(0) as LabelPanel;
				let gild = label.text.match(/\[.*?\]/g);
				if (gild && gild[gild.length - 1]) {
					setUserName(label.text.replace(gild[gild.length - 1], ""));
				} else {
					setUserName(label.text);
				}
			}
		}, 10);
	};
	onMount(() => {
		// 更新accountid
		let interval_id = setInterval(() => {
			if (userNamePanel != undefined && userNamePanel.IsValid()) {
				if (accountid() != undefined) {
					userNamePanel.accountid = accountid()!;
				}
				if (local.showgGild == false) {
					userNamePanel.visible = false;
					updateName();
				} else {

				}

				// 在userNamePanel load 之后清除计时器
				clearInterval(interval_id);
				interval_id = -1;
			}
		}, 10);
		onCleanup(() => {
			if (interval_id != -1) {
				clearInterval(interval_id);
			}
			if (p_timer != -1) {
				clearInterval(p_timer);
			}
		});
	});

	createEffect(on(showgGild, show_gild => {
		if (userNamePanel) {
			if (!show_gild) {
				userNamePanel.visible = false;
				updateName();
			} else {
				userNamePanel.visible = true;
				if (p_timer != -1) {
					clearInterval(p_timer);
					p_timer = -1;
				}
			}
		}
	}));

	createEffect(() => {
		if (userNamePanel && accountid() != undefined) {
			userNamePanel.accountid = accountid()!;
		}
	});

	return (
		<Panel classList={{ "PlayerName": true, ...local.classList }} {...other} >
			<Label text={username()} />
			<DOTAUserName ref={userNamePanel} steamid={steamid()} hittest={false} />
			{resolved()}
		</Panel>
	);
};



interface EOM_AvatarAttribute extends PanelAttributes {
	/** 长id */
	steamid?: string;
	/** 短id */
	accountid?: string;
	/** tooltip */
}
//这个组件放在EOM_Avatar.tsx下多个地方使用会报错，放在这里就没问题。。。
export const EOM_Avatar: ParentComponent<EOM_AvatarAttribute> = (props) => {
	let avatarImage: AvatarImage | undefined;
	const merged = mergeProps({ steamid: "-1", accountid: "-1", }, props, { class: "EOM_Avatar" });
	const [local, others] = splitProps(merged, ["children", "steamid", "accountid"]);

	onMount(() => {
		// 首次初始化EOM_Avatar
		let interval_id = setInterval(() => {
			if (avatarImage != undefined && avatarImage?.IsValid()) {
				avatarImage.accountid = local.accountid.toString();
				clearInterval(interval_id);
				interval_id = -1;
			}
		}, 10);
		onCleanup(() => {
			if (interval_id != -1) {
				clearInterval(interval_id);
			}
		});
	});
	createEffect(() => {
		if (avatarImage != undefined && avatarImage?.IsValid()) {
			if (local.accountid) {
				avatarImage.accountid = local.accountid.toString();
			}
		}
	});
	return (
		<Panel {...others}>
			<DOTAAvatarImage ref={avatarImage} steamid={local.steamid} width="100%" height="100%" hittest={false} />
			{local.children}
		</Panel>
	);
};
