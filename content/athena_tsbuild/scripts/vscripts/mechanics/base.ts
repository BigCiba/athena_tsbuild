import { reloadable } from "../lib/tstl-utils";

/**
 * 功能介绍：
 * 处理基地场景中的基础对象，当前主要用于临时阻挡、演示假人、镜像点和营地入口等地图实体初始化。
 *
 * 使用方法：
 * 模块初始化时会自动扫描指定命名实体并注册交互；
 * 其他系统可通过全局 Base 访问后续扩展出的基地能力。
 */
@reloadable
class CBase extends CModule {
	// 记录基地单位的表
	records: Record<number, CDOTA_BaseNPC> = {};
	dummyList: CDOTA_BaseNPC[] = [];
	blockID: number;
	mirror: EntityIndex | undefined;
	fishing_map: SpawnGroupHandle;
	init(reload: boolean): void {
		if (!reload) {
			Event.Register("game_start", (event) => {
			});
		}

	}

	/** 修改时间 */
	ChangeDayTime(time: "day" | "night" = "night") {
		GameRules.SetTimeOfDay(time == "day" ? 0.5 : 1.0);
	}
}

declare global {
	var Base: CBase;
}

Base ??= new CBase();
