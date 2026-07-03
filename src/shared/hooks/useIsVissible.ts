import {useEffect, useState, type RefObject} from 'react';

export function useIsVisible<T extends Element>(ref: RefObject<T | null>, once = false) {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIntersecting(true);
				if (once) observer.disconnect();
			} else if (!once) {
				setIntersecting(false);
			}
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, once]);

	return isIntersecting;
}
