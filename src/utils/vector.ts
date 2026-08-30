export class Vector {
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	Add(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
		} else {
			return new Vector(this.x + v, this.y + v, this.z + v);
		}
	}
	Sub(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
		} else {
			return new Vector(this.x - v, this.y - v, this.z - v);
		}
	}
	Mul(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
		} else {
			return new Vector(this.x * v, this.y * v, this.z * v);
		}
	}
	Div(v: Vector | number): Vector {
		if (v instanceof Vector) {
			return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
		} else {
			return new Vector(this.x / v, this.y / v, this.z / v);
		}
	}
	Normalized(): Vector {
		const len = this.Length();
		if (len <= 0.0001) {
			return new Vector(0, 0, 0);
		}
		return new Vector(this.x / len, this.y / len, this.z / len);
	}
	Length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	Equals(v: Vector): boolean {
		return this.x == v.x && this.y == v.y && this.z == v.z;
	}
	DotProduct(v: Vector): number {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	CrossProduct(v: Vector): Vector {
		return new Vector(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x,
		);
	}
	toString() {
		return `${this.x},${this.y},${this.z}`;
	}
	toVector3(): [number, number, number] {
		return [this.x, this.y, this.z];
	}
	static VectorLerp(t: number, start: Vector, end: Vector): Vector {
		return start.Add(end.Sub(start).Mul(t));
	}
}