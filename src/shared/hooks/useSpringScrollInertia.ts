import {useEffect, useState} from 'react';

interface UseSpringScrollInertiaOptions {
	enabled?: boolean;
	strength?: number;
	maxOffset?: number;
}

export const useSpringScrollInertia = ({
	enabled = true,
	strength = 0.14,
	maxOffset = 18,
}: UseSpringScrollInertiaOptions = {}) => {
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		if (!enabled || typeof window === 'undefined' || window.innerWidth <= 768) {
			setOffset(0);
			return;
		}

		let animationFrame = 0;
		let current = 0;
		let velocity = 0;
		let target = 0;
		let lastScrollY = window.scrollY;

		const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

		const handleScroll = () => {
			const dy = window.scrollY - lastScrollY;
			lastScrollY = window.scrollY;

			target = clamp(target + dy * strength, -maxOffset, maxOffset);
		};

		const animate = () => {
			const springForce = (target - current) * 0.14;
			velocity = (velocity + springForce) * 0.82;
			current += velocity;

			// Gradually pull the target back so cards return to base position.
			target *= 0.9;

			if (Math.abs(current) < 0.01 && Math.abs(velocity) < 0.01 && Math.abs(target) < 0.01) {
				current = 0;
				velocity = 0;
				target = 0;
			}

			setOffset(current);
			animationFrame = window.requestAnimationFrame(animate);
		};

		window.addEventListener('scroll', handleScroll, {passive: true});
		animationFrame = window.requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.cancelAnimationFrame(animationFrame);
		};
	}, [enabled, maxOffset, strength]);

	return offset;
};

