import classNames from "classnames";
import { Accessor } from "solid-js";
import { EOM_Countdown } from "../../../components/EOMDesign/DataDisplay/EOM_Countdown/EOM_Countdown";
import { EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import "./Recommend.less";

const onactivate = (props: any/*typeof KeyValues.info_recommend[string]*/) => {
	if (props.active == "jump") {
		JumpToMenu({
			window_name: "MenuButton_" + props.param_1,
			menu: (props.param_2 ?? "").toString(),
			force: true,
		});
	} else if (props.active == "buy") {
		ClientSideEvent("directly_purchase", { itemid: props.param_1, source: "recommend" });
	}
};

export const Recommend = () => {
	return <Panel id="StoreRecommend" >
		<Image id="RecommendTitle" />
		<Panel id="RecommendContent" scroll="x">
			{/* <For each={Object.keys(KeyValues.info_recommend)}>
				{(item) => {
					const config = KeyValues.info_recommend[item];
					const type = config.type ?? "";
					return <RecommendItem
						{...KeyValues.info_recommend[item]}
						child={
							<Dynamic
								component={
									({
										hero: HeroBlock,
										courier: CourierBlock
									})[type]
								} />
						} />;
				}}
			</For> */}
		</Panel>
	</Panel>;
};
interface RecommendItemProps {
	id?: string;
	active?: string;
	name?: string;
	param_1?: string;
	param_2?: number;
	type?: string;
	child: Accessor<JSX.Element>;
}
const RecommendItem = (props: RecommendItemProps) => {
	let endTime = -1;
	return <EOM_BaseButton class={classNames("RecommendItem", props.type, {
		NoEndTime: endTime == -1,
	})} onactivate={p => {
		onactivate(props);
	}}>
		{props.child()}
		<Panel id="BottomMask" />
		<Panel flowChildren="down" width="100%" verticalAlign="bottom" marginBottom="60px">
			<Panel class="ViewDetail">
				<Panel align="center center" flowChildren="right">
					<Image class="Icon" />
					<Label class="Desc" text="#RecommendViewDetails" />
				</Panel>
			</Panel>
			<Image id="TitleImage" />
			<Label id="SubTitle" text={"#RecommendSubTitle_" + props.id} />
			<Panel id="RecommendEndTime" >
				<EOM_Countdown endTime={endTime} />
			</Panel>
		</Panel>
		<Label class="JumpTo" text="#Store_JumpTo" />
	</EOM_BaseButton>;
};

interface RecommendItemChildProps {

}

const HeroBlock = (props: RecommendItemChildProps) => {
	return <Panel>

	</Panel>;
};

const CourierBlock = (props: RecommendItemChildProps) => {
	return <Panel>

	</Panel>;
};