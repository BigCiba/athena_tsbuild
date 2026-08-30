import { Accessor, createEffect, createMemo, createSignal, For, onCleanup, Show } from "solid-js";
import "./RankBadgeBanner.less";

const RANK_BADGE_INTERVAL_SECONDS = 2;
const RANK_BADGE_HEROES: Record<number, string> = {
	224: "assa",
	225: "guns",
	226: "mage",
	227: "pala",
};

const getRankBadgeAssetRank = (rank: number) => rank <= 3 ? rank : 10;

interface PlayerRankBadgeData {
	image: string;
	rank: number;
	heroID: number;
}

function getPlayerRankBadges(data: any): PlayerRankBadgeData[] {
	const briefMatchData = data?.player_common_match_data ?? {};
	const leaderboardDatas = data?.leaderboard_datas ?? briefMatchData.leaderboard_datas ?? [];
	const badges: PlayerRankBadgeData[] = [];

	for (const leaderboard of Array.isArray(leaderboardDatas) ? leaderboardDatas : []) {
		const rank = toFiniteNumber(leaderboard?.self_data?.rank, -1);
		const leaderboardKey = leaderboard?.leaderboard_key as string | undefined;
		const [, language, keyHeroID] = leaderboardKey?.split(":") ?? [];
		const heroID = Number(keyHeroID);
		const heroName = RANK_BADGE_HEROES[heroID];
		if (heroName == undefined || rank < 1 || rank > 10) continue;
		badges.push({
			image: getSrcPath(`conv/badge/${heroName}_${getRankBadgeAssetRank(rank)}_${language == "cn" ? "cn" : "en"}.png`),
			rank,
			heroID,
		});
	}
	return badges.sort((a, b) => a.rank - b.rank || a.heroID - b.heroID);
}

export const PlayerHeroRankBadge = (props: { data: Accessor<any>; heroID: Accessor<number | undefined>; }) => {
	const rankBadge = createMemo(() => getPlayerRankBadges(props.data()).find(badge => badge.heroID == props.heroID()));
	return <Image class="PlayerHeroRankBadge" src={rankBadge()?.image ?? ""} visible={rankBadge() != undefined} hittest={false} />;
};

export const PlayerRankBadgeBanner = (props: { data: Accessor<any>; active?: Accessor<boolean>; }) => {
	const rankBadges = createMemo(() => getPlayerRankBadges(props.data()));
	const [rankBadgeIndex, setRankBadgeIndex] = createSignal(0);
	const getRankBadgePosition = (index: number) => {
		const count = rankBadges().length;
		if (count <= 1) return 0;
		const currentIndex = Math.min(rankBadgeIndex(), count - 1);
		let position = index - currentIndex;
		if (position > count / 2) position -= count;
		if (position < -count / 2) position += count;
		return Math.max(-2, Math.min(2, position));
	};

	createEffect(() => {
		const count = rankBadges().length;
		if (count == 0 || rankBadgeIndex() >= count) setRankBadgeIndex(0);
	});
	createEffect(() => {
		const count = rankBadges().length;
		if (!(props.active?.() ?? true) || count <= 1) return;
		const timer = setInterval(() => {
			setRankBadgeIndex(index => (index + 1) % count);
		}, RANK_BADGE_INTERVAL_SECONDS * 1000);
		onCleanup(() => clearInterval(timer));
	});

	return <Show when={rankBadges().length > 0}>
		<Panel class="PlayerRankBadgeBanner">
			<Panel class="RankBadgeList">
				<For each={rankBadges()}>
					{(badge, index) => <Panel class={`RankBadgeSlide Index${getRankBadgePosition(index())}`} hittest={false}>
						<Image class="RankBadgeImage" src={badge.image} hittest={false} />
					</Panel>}
				</For>
			</Panel>
		</Panel>
	</Show>;
};
