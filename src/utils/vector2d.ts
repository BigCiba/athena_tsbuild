export class Vector2D {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	Add(v: Vector2D | number): Vector2D {
		if (v instanceof Vector2D) {
			return new Vector2D(this.x + v.x, this.y + v.y);
		} else {
			return new Vector2D(this.x + v, this.y + v);
		}
	}
	Sub(v: Vector2D | number): Vector2D {
		if (v instanceof Vector2D) {
			return new Vector2D(this.x - v.x, this.y - v.y);
		} else {
			return new Vector2D(this.x - v, this.y - v);
		}
	}
	Mul(v: Vector2D | number): Vector2D {
		if (v instanceof Vector2D) {
			return new Vector2D(this.x * v.x, this.y * v.y);
		} else {
			return new Vector2D(this.x * v, this.y * v);
		}
	}
	Div(v: Vector2D | number): Vector2D {
		if (v instanceof Vector2D) {
			return new Vector2D(this.x / v.x, this.y / v.y);
		} else {
			return new Vector2D(this.x / v, this.y / v);
		}
	}
	Normalized(): Vector2D {
		const len = this.Length();
		if (len <= 0.0001) {
			return new Vector2D(0, 0);
		}
		return new Vector2D(this.x / len, this.y / len);
	}
	Length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	Equals(v: Vector2D): boolean {
		return this.x == v.x && this.y == v.y;
	}
	DotProduct(v: Vector2D): number {
		return this.x * v.x + this.y * v.y;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
	toVector3(): [number, number, number] {
		return [this.x, this.y, 0];
	}
	static VectorLerp(t: number, start: Vector2D, end: Vector2D): Vector2D {
		return start.Add(end.Sub(start).Mul(t));
	}
	static Rotate(vector: Vector2D, angle: number): Vector2D {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Vector2D(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos);
	}
}