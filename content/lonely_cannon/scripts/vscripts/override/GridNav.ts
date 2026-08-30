declare interface GridNav {
	/** 是否是有效位置，如果是坑洞需要额外检查IsHole */
	IsValidPosition(position: Vector): boolean;
	IsHole(position: Vector): boolean;
}
if (IsServer()) {
	GridNav.IsValidPosition = function (position) {
		if (!this.IsTraversable(position) || this.IsBlocked(position)) {
			return false;
		}
		return true;
	};
	GridNav.IsHole = function (position) {
		// 额外检查是否是地图坑洞，需要地形铺设block bullets材质，高度从地面往下5000开始往上3000进行trace，确保能穿过坑洞底部
		let startVector = Vadd(GetGroundPosition(position, undefined), Vector(0, 0, -5000));
		let traceTable: TraceLineInputs = {
			startpos: startVector,
			endpos: startVector + Vector(0, 0, 3000) as Vector,
			mask: 33570827,
		};
		if (TraceLine(traceTable)) {
			if (traceTable.hit) {
				// DebugDrawLine(traceTable.startpos, traceTable.pos, 0, 255, 0, true, 1);
				// DebugDrawLine(traceTable.pos, (traceTable.pos + traceTable.normal * 10) as Vector, 0, 0, 255, true, 1);
				return true;
			} else {
				// DebugDrawLine(traceTable.startpos, traceTable.endpos, 255, 0, 0, true, 1);
				return false;
			}
		};
		return false;
	};
}