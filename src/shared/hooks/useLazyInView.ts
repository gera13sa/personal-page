import {useEffect, useState, type RefObject} from 'react';

interface UseLazyInViewOptions {
	rootMargin?: string;
	threshold?: number;
}

export function useLazyInView<T extends Element>(
	ref: RefObject<T | null>,
	{rootMargin = '200px 0px', threshold = 0}: UseLazyInViewOptions = {},
) {
	const [shouldMount, setShouldMount] = useState(false);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldMount(true);
					setIsActive(true);
				} else {
					setIsActive(false);
				}
			},
			{rootMargin, threshold},
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, rootMargin, threshold]);

	return {shouldMount, isActive};
}
