/** @noSelfInFile */

declare interface CBaseEntity {
	bIsNotFirstSpawn: boolean | undefined;
	_tOverrideData: Record<any, any>;
	_saveData_?: Table;
	/**
	 * 实体计时器
	 * @serverOnly 
	 * @param sContextName 索引，可缺省
	 * @param fInterval 时间
	 * @param funcThink 回调，返回number则会额外再计时一次
	 * @returns 索引
	 */
	Timer(fInterval: number, funcThink: () => any): string;
	Timer(sContextName: string, fInterval: number, funcThink: () => any): string;

	/**
	 * 实体计时器，暂停不会计时
	 * @param sContextName 索引，可缺省
	 * @param fInterval 时间
	 * @param funcThink 回调，返回number则会额外再计时一次
	 * @returns 索引
	 */
	GameTimer(fInterval: number, funcThink: () => any): string;
	GameTimer(sContextName: string, fInterval: number, funcThink: () => any): string;

	/**
	 * 暂停计时器
	 * @param sContextName 索引
	 */
	StopTimer(sContextName: string): void;
	/**
	 * 检查实体是否为CDOTABaseAbility
	 */
	/** 存Think的表，StartThink用到 */
	_ThinkList: Record<string, string>;
	/**
	 * 自定义的计时器，方便开多个，回调OnThink，name不填则会默认是唯一字符串，传入-1停止计时器
	 * @serverOnly
	 */
	StartThink(interval: number, name?: string, callback?: (name: string) => void): string;
	StartThink(interval: number, callback?: (name: string) => void): string;
	StartThink(interval: number, name?: any, callback?: any): string;

	/**
	 * 自定义的计时器的回调
	 * @serverOnly
	 */
	OnThink(name: string): void;
	IsAbility(): this is CDOTABaseAbility;
	SaveData(key: string, value: any): void;
	LoadData<T>(key: string, defaultValue: T): T;


	/** 
	 * 武器资源修改相关信息，__weapon实体才有该表
	 * @private
	 */
	__asset_modifier: { particle_color?: Vector; };
}

let BaseEntity = IsServer() ? CBaseEntity : C_BaseEntity;
BaseEntity.IsAbility = function () {
	return false;
};
BaseEntity.SaveData = function (key, value) {
	if (this._saveData_ == undefined) {
		this._saveData_ = {};
	}
	this._saveData_[key] = value;
};
BaseEntity.LoadData = function (key, defaultValue) {
	return this._saveData_?.[key] ?? defaultValue;
};
BaseEntity.Timer = function (sContextName: any, fInterval: any, funcThink: any) {
	if (funcThink == undefined) {
		funcThink = fInterval;
		fInterval = sContextName;
		sContextName = DoUniqueString("Timer");
	}
	return Timer.GameTimer(this, fInterval, funcThink);
};
BaseEntity.GameTimer = function (sContextName: any, fInterval: any, funcThink: any) {
	if (funcThink == undefined) {
		funcThink = fInterval;
		fInterval = sContextName;
		sContextName = DoUniqueString("GameTimer");
	}
	return this.Timer(sContextName, fInterval, funcThink);
};
BaseEntity.StopTimer = function (sContextName: any) {
	Timer.StopTimer(sContextName);
};

//********************************************************************************
// Server
//********************************************************************************

if (IsServer()) {
	CBaseEntity.StartThink = function (interval, name, callback) {
		// 根据参数数量动态指定参数
		// StartThink(interval, callback)
		if (typeof name === 'function' && callback === undefined) {
			callback = name;
			name = undefined;
		}

		const timerName = name ?? DoUniqueString("StartThink");
		if (this._ThinkList == undefined) {
			this._ThinkList = {};
		}
		// 传入-1停止计时器
		if (interval == -1) {
			if (this._ThinkList[timerName]) {
				Timer.StopTimer(this._ThinkList[timerName]);
				// @ts-ignore
				this._ThinkList[timerName] = undefined;
			}
			return;
		}
		// 停止同名计时器
		if (this._ThinkList[timerName] != undefined) {
			Timer.StopTimer(this._ThinkList[timerName]);
		}
		const index = Timer.StartIntervalThink(this, interval, () => {
			let result: any;
			if (callback != undefined) {
				result = callback(this, timerName);
			} else if (this.OnThink != undefined) {
				result = this.OnThink(timerName);
			}
			// 如果回调返回-1，停止计时器
			if (result === -1) {
				Timer.StopTimer(this._ThinkList[timerName]);
				// @ts-ignore
				this._ThinkList[timerName] = undefined;
			}
		});
		this._ThinkList[timerName] = index;
		return timerName;
	};
}

//********************************************************************************
// Client
//********************************************************************************

if (IsClient()) {
	C_BaseEntity.GameTimer = function (sContextName: any, fInterval: any, funcThink: any) {
		if (funcThink == undefined) {
			funcThink = fInterval;
			fInterval = sContextName;
			sContextName = DoUniqueString("GameTimer");
		}
		return this.Timer(sContextName, fInterval, funcThink);
	};
	C_BaseEntity.StopTimer = function (sContextName: any) {
		this.SetContextThink(sContextName, undefined, -1);
	};
}