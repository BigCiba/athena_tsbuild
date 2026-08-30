function ServerRequest(event, data, func, timeout, timeoutCallback) {
	return CustomUIConfig.ServerRequest(event, data, func, timeout, timeoutCallback);
}

function CancelRequest(index) {
	CustomUIConfig.CancelServerRequest(index);
}

function ClientRequest(event, data) {
	let t = CustomNetTables.GetTableValue("common", "client_ability");
	if (t) {
		let abilityEntIndex = t._;
		if (typeof abilityEntIndex == "number" && Entities.IsValidEntity(abilityEntIndex)) {
			GameEvents.SendEventClientSide("client_request_event", {
				event: event,
				data: JSON.stringify(data),
			});
			let value = Abilities.GetAbilityTextureName(abilityEntIndex);
			return JSON.parseSafe(value);
		}
	}
}
