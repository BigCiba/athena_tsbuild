class CPanoramaScript_Storage {
	storage: Record<string, any> = {};
	SaveData(key: any, data: any) {
		this.storage[key] = data;
	}
	LoadData<T = any>(key: any, defaultValue: T): T {
		return this.storage[key] ?? defaultValue;
	}
}

interface CustomUIConfig {
	Storage: CPanoramaScript_Storage;
}
const storage = CustomUIConfig.Storage as CPanoramaScript_Storage | undefined;
if (storage !== undefined) {
	Object.setPrototypeOf(storage, CPanoramaScript_Storage.prototype);
} else {
	CustomUIConfig.Storage = new CPanoramaScript_Storage();
}