import {useEffect, useId, useState, type RefObject} from 'react';
import {buildGlassLensMap} from './glassLensMap';

const reducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useGlassLens(ref: RefObject<HTMLElement | null>, enabled: boolean) {
	const filterId = `glass-lens-${useId().replace(/:/g, '')}`;
	const [mapHref, setMapHref] = useState<string | null>(null);
	const [scale, setScale] = useState(20);

	useEffect(() => {
		const el = ref.current;
		if (!enabled || !el || reducedMotion()) {
			setMapHref(null);
			return;
		}

		let frame = 0;
		const update = () => {
			const {width, height} = el.getBoundingClientRect();
			const radius = Number.parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
			setScale(Math.round(Math.min(28, Math.max(14, Math.min(width, height) * 0.42))));
			setMapHref(buildGlassLensMap(width, height, radius));
		};

		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};

		schedule();
		const observer = new ResizeObserver(schedule);
		observer.observe(el);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, [enabled, ref]);

	return {filterId, mapHref, scale};
}
