/** @noSelfInFile **/

import { reloadable } from "./lib/tstl-utils";

SendToConsole("dota_combine_models 0");
Convars.SetBool("dota_combine_models", false);

require("requires");

@reloadable
class MClient extends CModule {
	keyEvent: Record<string, { key_name: string; }> = {};
	abilityKeyEvent: Record<string, { slot: number, key_name: string, quick_cast: boolean; }> = {};
	commandUnique: Record<string, string> = {};
	WaitSceneEntityLoadData: Record<string, { key: string, data: string; }[]> = {};
	initPriority(): number {
		return 1;
	}
	init(bReload: boolean) {
		if (!bReload) {
		}
		GameEvent("client_reload_game_keyvalues", () => {
			require("addon_game_mode_client");
		}, undefined);
		GameEvent("custom_command_unique", function (event) {
			this.commandUnique[event.command] = event.unique;
		}, this);
		GameEvent("lua_server_to_client", function (event) {
			let eventName = event.event_name as keyof EventCallback;
			let [data] = json.decode(event.data);
			if (data != undefined) {
				Event.Fire(eventName, data);
			}
		}, this);
		GameEvent("wait_scene_entity_load", function (event) {
			let data = event.data;
			if (this.WaitSceneEntityLoadData == undefined) {
				this.WaitSceneEntityLoadData = {};
			}
			if (this.WaitSceneEntityLoadData[event.name] == undefined) {
				this.WaitSceneEntityLoadData[event.name] = [];
			}
			if (data != undefined) {
				this.WaitSceneEntityLoadData[event.name].push({ key: event.key, data: data });
			} else {
				for (const [i, v] of ipairs(this.WaitSceneEntityLoadData[event.name])) {
					if (v.key == event.key) {
						table.remove(this.WaitSceneEntityLoadData[event.name], i);
						break;
					}
				}
			}
		}, this);
		RequestEvent("register_key_event", function (...args) { return this.OnRegisterKeyEvent(...args); }, this);
		RequestEvent("unregister_key_event", function (...args) { return this.OnUnregisterKeyEvent(...args); }, this);
		RequestEvent("register_ability_key_event", function (...args) { return this.OnRegisterAbilityKeyEvent(...args); }, this);
		RequestEvent("unregister_ability_key_event", function (...args) { return this.OnUnregisterAbilityKeyEvent(...args); }, this);
		RequestEvent("call_lua_client_function", function (...args) { return this.OnCallLuaClientFunction(...args); }, this);
	}

	GetSceneEntityData<T extends keyof SceneEntityLoadData>(name: T): SceneEntityLoadData[T] | undefined {
		let t = this.WaitSceneEntityLoadData[name];
		if (t != undefined && t[0] != undefined) {
			let [data] = json.decode(t[0].data);
			if (data != undefined) {
				this.WaitSceneEntityLoadData[name].shift();
				return data;
			}
		}
	}
	private OnRegisterKeyEvent(eventData: { key_name: string; }) {
		let eventName = DoUniqueString(eventData.key_name);
		SendToConsole(`bind ${eventData.key_name} +${eventName}`);
		this.keyEvent[eventName] = { key_name: eventData.key_name };
		return { unique_name: eventName, event_name: eventData.key_name, };
	}
	private OnUnregisterKeyEvent(eventData: { event_name: string; }) {
		let keyEvent = this.keyEvent[eventData.event_name];
		let success = false;
		if (keyEvent != undefined) {
			success = true;
			delete this.keyEvent[eventData.event_name];
			SendToConsole(`unbind ${keyEvent.key_name} +${eventData.event_name}`);
		}
		return { success: success };
	}
	private OnRegisterAbilityKeyEvent(tEvents: { slot: number, key_name: string, quick_cast: boolean; }) {
		let sEventName = DoUniqueString(tEvents.key_name);
		SendToConsole(`bind ${tEvents.key_name} +${sEventName}`);
		this.abilityKeyEvent[sEventName] = { slot: tEvents.slot, key_name: tEvents.key_name, quick_cast: tEvents.quick_cast };
		return { event_name: sEventName };
	}
	private OnUnregisterAbilityKeyEvent(tEvents: { event_name: string; }) {
		let tAbilityKeyEvent = this.abilityKeyEvent[tEvents.event_name];
		let bSuccess = false;
		if (tAbilityKeyEvent != undefined) {
			bSuccess = true;
			// @ts-ignore
			this.abilityKeyEvent[tEvents.event_name] = undefined;
			SendToConsole(`unbind ${tAbilityKeyEvent.key_name} +${tEvents.event_name}`);
		}
		return { success: bSuccess };
	}
	private OnCallLuaClientFunction(tEvents: { func_name: string; args_json: string; }) {
		let sFunctionName = tEvents.func_name;
		let value;
		// @ts-ignore
		let func = _G[sFunctionName];
		if (type(func) == "function") {
			try {
				let [args] = json.decode(tEvents.args_json);
				if (type(args) == "table") {
					value = func(unpack(args));
				} else {
					value = func();
				}
			} catch (error) { }
		}
		return { value: value };
	}
	/**
	 * lua客户端和UI通信的接口
	 * @param command 在UI端使用Game.AddCommandUnique注册的命令名
	 * @param args 参数列表
	 */
	SendToConsole(command: string, ...args: string[]) {
		let unique = this.commandUnique[command];
		if (unique != undefined) {
			let t = [command + unique, ...args];
			SendToConsole(table.concat(t, " "));
		}
	}
}
declare global {
	/**
	 * @ClientOnly
	 */
	var Client: MClient;
	function CalculatePropertyValue(propertyId: string, current: number, value: number): number;
}

Client ??= new MClient();

if (!GameModeActivated) {
	CModule.initialize();
}

require("reload");

_G.CalculatePropertyValue = function (propertyId: string, current: number, value: number) {
	return PropertySystem.AggregatePropertyValues(propertyId, current, value);
};