/** @noSelfInFile */
interface ModifierEvent {
	attacker?: CDOTA_BaseNPC;
	caster?: CDOTA_BaseNPC;
	unit?: CDOTA_BaseNPC;
	target?: CDOTA_BaseNPC;
	ability?: CDOTABaseAbility;
	inflictor?: CDOTABaseAbility;
	damage: number;
	damage_type: DAMAGE_TYPES;
	damage_category: DamageCategory_t;
	damage_flags: DOTADamageFlag_t;
	original_damage: number;
	ranged_attack: boolean;
	no_attack_cooldown: boolean;
	record: number;
	fail_type: attackfail;
	do_not_consume?: boolean;
	report_max?: boolean;
	eom_flags?: EOM_DAMAGE_FLAGS;
	attack_states?: ATTACK_STATES;
	itemname?: string;
	gain?: number;
	unitname?: string;
	player_id?: PlayerID;
	loots?: string[];
}
declare interface CDOTA_Buff {
	/**
	 * 获取buff来源技能当前等级键值，如获取不到则会返回0
	 * @param sKey 键名
	 * @returns 值
	 */
	GetAbilitySpecialValueFor(sKey: string, unit?: CDOTA_BaseNPC): number;
	/**
	 * 获取buff来源技能等级键值，如获取不到则会返回0
	 * @param sKey 键名
	 * @param iLevel 等级，-1为取当前等级，1级填值为0
	 * @returns 值
	 */
	GetAbilityLevelSpecialValueFor(sKey: string, iLevel: number): number;

	/** 伪随机 */
	PRD(chance: number, pseudo_random_recording?: string): boolean;
	/** 增加层数 */
	IncrementStackCount_Engine: typeof CDOTA_Buff.IncrementStackCount;
	IncrementStackCount(iStackCount?: number): void;
	/** 减少层数 */
	DecrementStackCount_Engine: typeof CDOTA_Buff.DecrementStackCount;
	DecrementStackCount(iStackCount?: number): void;
	/** 存Think的表，StartThink用到 */
	_ThinkList: Record<string, string>;
	/**
	 * 自定义的计时器，方便开多个，回调OnThink，name不填则会默认是唯一字符串
	 * @serverOnly
	 */
	StartThink(interval: number, name?: string, callback?: (name: string) => void): void;
	StartThink(interval: number, callback?: (name: string) => void): void;
	StartThink(interval: number, name?: any, callback?: any): void;
	/**
	 * 自定义的计时器的回调
	 * @serverOnly
	 */
	OnThink(name: string): void;

	/** @private */
	__dynamicStackData: { DieTime: number, StackCount: number, callback?: (stackCount: number) => void; }[];
	/** @private */
	__dynamicStack: number;
	AddStackCountDuration(addStack: number, duration: number, maxStack?: number, callback?: (stackCount: number) => void): void;
	RemoveStackCountDuration(removeStack: number): void;
}

CDOTA_Buff.GetAbilitySpecialValueFor = function (sKey: string, unit?: CDOTA_BaseNPC) {
	if (!IsValid(this)) return 0;
	// @ts-ignore
	let ability = (this.ability as CDOTABaseAbility | undefined) ?? this.GetAbility();
	// @ts-ignore
	if (!IsValid(ability)) return this[sKey] ?? 0;
	let level = ability.GetLevel() - 1;
	if (level == -1) return 0;
	let caster: CDOTA_BaseNPC | undefined = unit ?? ability.GetCaster();

	if (!IsValid(caster)) {
		caster = this.GetCaster();
	}

	if (!IsValid(caster)) return 0;
	// return AbilityValues.GetAbilityLevelSpecialValueFor(ability.GetAbilityName(), sKey, level, caster, undefined, AbilityValues.GetAbilityOverrideAbilityValue(ability.entindex(), sKey));
	return ability.GetSpecialValueFor(sKey, caster);
};
CDOTA_Buff.GetAbilityLevelSpecialValueFor = function (sKey: string, iLevel: number) {
	if (!IsValid(this)) return 0;
	// @ts-ignore
	let ability = (this.ability as CDOTABaseAbility | undefined) ?? this.GetAbility();
	// @ts-ignore
	if (!IsValid(ability)) return this[sKey] ?? 0;
	return ability.GetLevelSpecialValueFor(sKey, iLevel);
};
CDOTA_Buff.PRD = function (chance, pseudo_random_recording) {
	return PRD(this.GetCaster(), chance, pseudo_random_recording ?? this.GetName());
};
if (CDOTA_Buff.IncrementStackCount_Engine == undefined) {
	CDOTA_Buff.IncrementStackCount_Engine = CDOTA_Buff.IncrementStackCount;
}
CDOTA_Buff.IncrementStackCount = function (iStackCount?: number) {
	if (iStackCount == undefined) {
		this.IncrementStackCount_Engine();
	} else {
		this.SetStackCount(this.GetStackCount() + iStackCount);
	}
};
if (CDOTA_Buff.DecrementStackCount_Engine == undefined) {
	CDOTA_Buff.DecrementStackCount_Engine = CDOTA_Buff.DecrementStackCount;
}
CDOTA_Buff.DecrementStackCount = function (iStackCount?: number) {
	if (iStackCount == undefined) {
		this.DecrementStackCount_Engine();
	} else {
		this.SetStackCount(this.GetStackCount() - iStackCount);
	}
};
CDOTA_Buff.StartThink = function (interval: number, name, callback) {
	if (IsServer()) {
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
	}
};
CDOTA_Buff.AddStackCountDuration = function (iStackCount, fDuration, iMaxAddStack = -1, callback) {
	if (typeof iStackCount != "number") {
		return;
	}
	if (iStackCount <= 0) {
		return;
	}
	if (fDuration <= 0) {
		return;
	}
	if (this.__dynamicStack == undefined) {
		this.__dynamicStack = 0;
	}
	if (this.__dynamicStackData == undefined) {
		this.__dynamicStackData = [];
	}
	if (iMaxAddStack > 0) {
		iStackCount = Math.min(iStackCount, iMaxAddStack);
	}
	let originalStack = this.GetStackCount() - this.__dynamicStack;
	let newStack = this.__dynamicStack + iStackCount;
	if (iMaxAddStack > 0 && newStack > iMaxAddStack) {
		let iOverflowStack = newStack - iMaxAddStack;
		while (this.__dynamicStackData.length > 0) {
			let t = this.__dynamicStackData[0];
			if (iOverflowStack > t.StackCount) {
				newStack -= t.StackCount;
				iOverflowStack -= t.StackCount;
				if (t.callback != undefined) {
					t.callback(t.StackCount);
				}
				table.remove(this.__dynamicStackData, 1);
			} else {
				newStack -= iOverflowStack;
				t.StackCount -= iOverflowStack;
				if (t.callback != undefined) {
					t.callback(iOverflowStack);
				}

				if (t.StackCount == 0) {
					table.remove(this.__dynamicStackData, 1);
				}

				break;
			}
		}
	}

	this.__dynamicStack = newStack;
	this.SetStackCount(originalStack + this.__dynamicStack);

	let dieTime = GameRules.GetGameTime() + fDuration;
	let index = this.__dynamicStackData.length + 1;

	for (const i of $range(this.__dynamicStackData.length, 1, -1)) {
		if (dieTime >= this.__dynamicStackData[i - 1].DieTime) {
			break;
		}
		index = i;
	}

	table.insert(this.__dynamicStackData, index, {
		DieTime: dieTime,
		StackCount: iStackCount,
		callback: callback
	});

	if (this.__dynamicStackData.length == 1) {
		this.GetParent().GameTimer(`${this.GetName()}_StackCountTimer`, fDuration, () => {
			if (!IsValid(this)) return;
			let gameTime = GameRules.GetGameTime();
			while (this.__dynamicStackData.length > 0 && gameTime >= this.__dynamicStackData[0].DieTime) {
				let originalStack = this.GetStackCount() - this.__dynamicStack;
				this.__dynamicStack -= this.__dynamicStackData[0].StackCount;
				if (this.__dynamicStackData[0].callback != undefined) {
					this.__dynamicStackData[0].callback(this.__dynamicStackData[0].StackCount);
				}
				this.SetStackCount(originalStack + this.__dynamicStack);
				table.remove(this.__dynamicStackData, 1);
			}
			if (this.__dynamicStackData.length > 0) {
				return this.__dynamicStackData[0].DieTime - gameTime;
			}
		});
	}
};
CDOTA_Buff.RemoveStackCountDuration = function (iStackCount) {
	if (iStackCount <= 0) {
		return;
	}
	if (this.__dynamicStackData == undefined) {
		return;
	}
	let removedStackCount = 0;
	let newDuration;
	let gameTime = GameRules.GetGameTime();
	while (this.__dynamicStackData.length > 0 && iStackCount > 0) {
		let t = this.__dynamicStackData[0];
		if (t.StackCount > iStackCount) {
			t.StackCount -= iStackCount;
			removedStackCount += iStackCount;
			iStackCount = 0;
			if (t.callback != undefined) {
				t.callback(iStackCount);
			}
		} else {
			removedStackCount += t.StackCount;
			iStackCount -= t.StackCount;
			if (t.callback != undefined) {
				t.callback(t.StackCount);
			}
			table.remove(this.__dynamicStackData, 1);
			if (this.__dynamicStackData.length > 0) {
				newDuration = this.__dynamicStackData[0].DieTime - gameTime;
			} else {
				newDuration = -1;
			}
		}
	}
	if (newDuration != undefined) {
		if (newDuration > 0) {
			this.GetParent().GameTimer(`${this.GetName()}_StackCountTimer`, newDuration, () => {
				if (!IsValid(this)) return;
				let gameTime = GameRules.GetGameTime();
				while (this.__dynamicStackData.length > 0 && gameTime >= this.__dynamicStackData[0].DieTime) {
					let originalStack = this.GetStackCount() - this.__dynamicStack;
					this.__dynamicStack -= this.__dynamicStackData[0].StackCount;
					if (this.__dynamicStackData[0].callback != undefined) {
						this.__dynamicStackData[0].callback(this.__dynamicStackData[0].StackCount);
					}
					this.SetStackCount(originalStack + this.__dynamicStack);
					table.remove(this.__dynamicStackData, 1);
				}
				if (this.__dynamicStackData.length > 0) {
					return this.__dynamicStackData[0].DieTime - gameTime;
				}
			});
		} else {
			this.GetParent().StopTimer(`${this.GetName()}_StackCountTimer`);
		}
	}
	if (removedStackCount > 0) {
		let originalStack = this.GetStackCount() - this.__dynamicStack;
		this.__dynamicStack -= removedStackCount;
		this.SetStackCount(originalStack + this.__dynamicStack);
	}
};
