import { ParentComponent, createEffect, createSignal, mergeProps, on, onCleanup, splitProps } from "solid-js";
import './CustomTip.less';

let LastTIP = 1;
for (let i = 1; i < 1000; i++) {
	const key = "#Custom_Tip_" + i;
	const sLoc = GetLocalization(key);
	if (key == sLoc) {
		break;
	}
	LastTIP = i;
}

let tipQueue = Array(LastTIP).fill(1).map((a, i) => i + 1).sort(() => Math.random() - 0.5);

interface CustomTipAttribute extends PanelAttributes {
	tick?: number;
}

/**
 * @param tick 自动跳转间隔
 */
export const CustomTip: ParentComponent<CustomTipAttribute> = (props) => {
	const merged = mergeProps({ tick: 5 }, props);
	const [local, others] = splitProps(merged, ["tick"]);
	const [index, SetIndex] = createSignal(0);
	const [id, setID] = createSignal(-1);

	const PrevTip = () => {
		SetIndex(old => ((old <= 0) ? old + LastTIP - 1 : old - 1) % LastTIP);
	};
	const nextTip = () => {
		SetIndex(old => (old + 1) % LastTIP);
	};

	createEffect(on(index, (v) => {
		if (id() != -1) {
			try {
				$.CancelScheduled(id() as ScheduleID);
			} catch (error) { }
		}
		setID($.Schedule(local.tick, () => {
			nextTip();
		}));
	}));

	onCleanup(() => {
		if (id() != -1) {
			try {
				$.CancelScheduled(id() as ScheduleID);
				setID(-1);
			} catch (error) { }
		}
	});

	return (
		<Panel {...others} class="CustomTip">
			<Button id="PrevTip" onactivate={PrevTip} />
			<Label id="TipLabel" text={"#Custom_Tip_" + tipQueue[index()]} hittest={false} />
			<Button id="NextTip" onactivate={nextTip} />
		</Panel>
	);
};
