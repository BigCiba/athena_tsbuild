export function normalizeDisplayNumber(value: number) {
	if (!Number.isFinite(value)) return 0;

	const integer = Math.round(value);
	if (Math.abs(value - integer) < 1e-9) {
		return integer;
	}

	return Number(value.toPrecision(12));
}
