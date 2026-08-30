/**
 * 模块组
 */
declare var Modules: CModule[];

/** 基础模块功能 */
Modules ??= [];
class CModule {
	isModule: boolean = true;
	init(reload: boolean) { };
	initPriority() {
		return 0;
	}
	constructor() {
		Modules.push(this);
	}
	dispose() {
		Modules.splice(Modules.indexOf(this), 1);
	}
	static initialize() {
		Modules.sort((a, b) => b.initPriority() - a.initPriority()).forEach(m => m.init(false));
	}
	static reload() {
		Modules.sort((a, b) => b.initPriority() - a.initPriority()).forEach(m => m.init(true));
	}
	print(...args: any[]) {
		print(`[${this.constructor.name}${IsClient() ? " Client" : ""}]: `, ...args);
	}
	error(...args: any[]) {
		// TODO: 是否需要上报到服务器记录错误？
		print(`[${this.constructor.name} ERROR${IsClient() ? " Client" : ""}]: `, ...args);
	}
	reset() { }
	static reset() {
		Modules.forEach(m => m.reset());
	}
}