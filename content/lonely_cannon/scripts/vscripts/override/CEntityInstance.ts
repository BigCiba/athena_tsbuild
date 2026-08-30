declare interface CEntityInstance {
	Remove(): void;
}
CEntityInstance.Remove = function () {
	if (IsValid(this)) {
		FireGameEvent("custom_entity_removed", {
			entindex: this.entindex(),
		});
		this.RemoveSelf();
	}
};
