import { ParentComponent } from "solid-js";
import { EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_ToggleButton } from "../../../components/EOMDesign/Input/EOM_ToggleButton/EOM_ToggleButton";
import { SelectionContainer } from "../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { createServiceNetData } from "../../../utils/solid_utils";

interface ServiceToggleButtonProps {
	text: string;
	serviceKey: string;
	width?: string;
	margin?: string;
}
const player_key_values = createServiceNetData("player_key_values", {});

/** 服务开关切换按钮 */
const ServiceToggleButton: ParentComponent<ServiceToggleButtonProps> = (props) => {

	return (
		<EOM_ToggleButton
			text={props.text}
			width={props.width ?? "30%"}
			margin={props.margin ?? "5px"}
			selected={Boolean(player_key_values()[props.serviceKey]?.value ?? true)}
			onchange={(_, check) => {
				CallAction("/v1/key/save", {
					type: "tool_settings",
					key: props.serviceKey,
					value: check ? "TRUE" : "FALSE"
				});
			}}
		/>
	);
};

/** 局外存档开关 */
export const ServiceSwitch = () => {
	const serviceKeys = [
		"toggle_service_collection",
		"toggle_service_talent",
		"toggle_service_blessing",
		"toggle_service_courier",
		"toggle_service_equipment",
		"toggle_service_hero",
		"toggle_service_weapon"
	];

	const toggleAll = (value: boolean) => {
		serviceKeys.forEach(key => {
			CallAction("/v1/key/save", {
				type: "tool_settings",
				key: key,
				value: value ? "TRUE" : "FALSE"
			});
		});
	};

	return (
		<SelectionContainer
			eventName="ServiceSwitch"
			title="存档开关"
			width="500px"
			height="700px"
			hasFilter={false}
			hasRawMode={false}
			hasToggleSize={false}
		>
			<Panel width="100%" height="100%" flowChildren="down">
				<Panel width="100%" flowChildren="right">
					<EOM_BaseButton class="DemoButton" width="fill-parent-flow(1)" onactivate={() => toggleAll(true)}>
						<Label text="全部打开" />
					</EOM_BaseButton>
					<EOM_BaseButton class="DemoButton" width="fill-parent-flow(1)" onactivate={() => toggleAll(false)}>
						<Label text="全部关闭" />
					</EOM_BaseButton>
				</Panel>
				<Panel width="100%" height="fill-parent-flow(1)" flowChildren="right-wrap">
					<ServiceToggleButton text="藏品" serviceKey="toggle_service_collection" />
					<ServiceToggleButton text="天赋" serviceKey="toggle_service_talent" />
					<ServiceToggleButton text="祝福" serviceKey="toggle_service_blessing" />
					<ServiceToggleButton text="信使" serviceKey="toggle_service_courier" />
					<ServiceToggleButton text="装备" serviceKey="toggle_service_equipment" />
					<ServiceToggleButton text="英雄" serviceKey="toggle_service_hero" />
					<ServiceToggleButton text="武器" serviceKey="toggle_service_weapon" />
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};