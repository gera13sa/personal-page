/** Rounded-rect edge normals. Mid-gray (128) is no shift; R is X, G is Y. */
export function buildGlassLensMap(width: number, height: number, radius: number): string | null {
	const w = Math.max(1, Math.round(width));
	const h = Math.max(1, Math.round(height));
	if (w < 2 || h < 2) return null;

	const canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext('2d', {willReadFrequently: true});
	if (!ctx) return null;

	const image = ctx.createImageData(w, h);
	const data = image.data;
	const r = Math.min(Math.max(radius, 0), w / 2, h / 2);
	const bevel = Math.min(Math.max(r, 12), Math.min(w, h) * 0.48);

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const i = (y * w + x) * 4;
			const normal = edgeNormal(x + 0.5, y + 0.5, w, h, r);
			const dist = distanceToEdge(x + 0.5, y + 0.5, w, h, r);
			let dx = 0;
			let dy = 0;

			if (dist >= 0 && dist < bevel) {
				const t = 1 - dist / bevel;
				const amount = t * t;
				dx = normal.x * amount;
				dy = normal.y * amount;
			}

			data[i] = 128 + Math.round(dx * 127);
			data[i + 1] = 128 + Math.round(dy * 127);
			data[i + 2] = 128;
			data[i + 3] = 255;
		}
	}

	ctx.putImageData(image, 0, 0);
	return canvas.toDataURL('image/png');
}

function distanceToEdge(x: number, y: number, w: number, h: number, r: number): number {
	const hx = w / 2 - r;
	const hy = h / 2 - r;
	const qx = Math.abs(x - w / 2) - hx;
	const qy = Math.abs(y - h / 2) - hy;
	const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
	const inside = Math.min(Math.max(qx, qy), 0);
	return -(outside + inside - r);
}

function edgeNormal(x: number, y: number, w: number, h: number, r: number): {x: number; y: number} {
	const px = x - w / 2;
	const py = y - h / 2;
	const qx = Math.abs(px) - (w / 2 - r);
	const qy = Math.abs(py) - (h / 2 - r);

	if (qx > 0 && qy > 0) {
		const len = Math.hypot(qx, qy) || 1;
		return {x: (Math.sign(px) || 1) * (qx / len), y: (Math.sign(py) || 1) * (qy / len)};
	}

	if (Math.abs(px) / w >= Math.abs(py) / h) {
		return {x: Math.sign(px) || 1, y: 0};
	}

	return {x: 0, y: Math.sign(py) || 1};
}
