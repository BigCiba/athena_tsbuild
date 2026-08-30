import { render } from '@bigciba/solid-panorama-runtime';
import { onCleanup, onMount, Show } from 'solid-js';
import { useNetTable } from 'solid-panorama-all-in-jsx/events.macro';
import { DemoButton, DemoSelectionButton, DemoTextEntry, DemoToggle, EOM_DebugTool, EOM_DebugTool_Category } from '../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool';
import { createNetDataSignal } from '../../utils/solid_utils';

function Demo() {
	const demoSetting = useNetTable("common", "demo_settings");
	const settings = createNetDataSignal("common", "settings");
	const CompileTooltip = () => {
		const list = KeyValues.TooltipList ?? [];
		list.forEach((item: string) => {
			console.log("CompileTooltip: ", item);
			ShowCustomTooltip($.GetContextPanel(), item, {});
		});
	};
	onMount(() => {
		const eventIdList: GameEventListenerID[] = [];
		onCleanup(() => {
			eventIdList.forEach(id => GameEvents.Unsubscribe(id));
		});
	});
	return (
		<Show when={settings()?.is_in_tools_mode || demoSetting()?.ding}>
			<EOM_DebugTool direction="left" tabList={["常用", "后端"]} containerElement={
				<>
					{/* <EOM_DebugTool_AbilityPicker title="添加技能" eventName="AddAbility" itemNames={abilityList()} toggleList={getAbilityToggleList()} filterFunc={abilityFilter} /> */}

				</>
			}>
				{/* 常用 */}
				<EOM_DebugTool_Category tabIndex={0} title="游戏" >
					<DemoTextEntry eventName="ChangeHostTimescale" text="主机速度" />
					<DemoButton eventName="Standby" text="测试按钮" />
				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="技能和物品" >

				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="英雄" >
					<DemoButton eventName="Refresh" text="刷新状态" />
					<DemoToggle eventName="FreeSpells" text="无限技能" selected={demoSetting()?.free_spells == 1} />
					<DemoToggle eventName="AvoidDamage" text="免伤" selected={demoSetting()?.avoid_damage == 1} />
					<DemoToggle eventName="HugeDamage" text="秒杀" selected={demoSetting()?.huge_damage == 1} />
					<DemoTextEntry eventName="LevelUp" text="升级" />
					<DemoSelectionButton eventName="ChangeHero" text="更换英雄" />
				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="单位" >
					<DemoButton eventName="DummyTarget" text={GetLocalization("#Demo_CreateDummy")} />
					<DemoSelectionButton eventName="DemoLoadout" text="英雄配置" />
					<DemoSelectionButton eventName="CreateEnemy" text="创建单位" />
					<DemoButton eventName="RemoveSpawnedUnits" text="删除所有单位" />
					<DemoSelectionButton eventName="EOM_UnitInfo" text="单位信息面板" />
				</EOM_DebugTool_Category>

				{/* 后端 */}
				<EOM_DebugTool_Category tabIndex={1} title="数据" >
					<DemoButton eventName="Login" text="重新登录" />
					<DemoSelectionButton eventName="ServiceAddItem" text="后端物品" />
				</EOM_DebugTool_Category>



				<EOM_DebugTool_Category title="其他" >
					<DemoButton eventName="ReloadKeyValue" color="CyanButton" text="重载KV" />
					<DemoButton eventName="ReloadScript" color="GreenButton" text="重载脚本" />
					<DemoButton eventName="CompileTooltip" text="编译Popups" onactivate={() => CompileTooltip()} />
					<DemoButton eventName="Restart" color="RedButton" text="重开游戏" />
				</EOM_DebugTool_Category>
			</EOM_DebugTool>
		</Show>
	);
}

render(() => <Demo />, $.GetContextPanel());
