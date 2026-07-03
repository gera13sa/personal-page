import {useRef, type ReactNode} from 'react';

import {useIsVisible} from '@shared/hooks/useIsVissible.ts';

import './scrollReveal.scss';

interface ScrollRevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export const ScrollReveal = ({children, className = '', delay = 0}: ScrollRevealProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(ref, true);

	return (
		<div
			ref={ref}
			className={`scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`}
			style={{transitionDelay: `${delay}ms`}}
		>
			{children}
		</div>
	);
};
