import React, {useRef, useState, type MouseEvent, type ReactNode} from 'react';
import './appButton.scss';

export type ButtonType =
	| 'default'
	| 'transparent-borderless'
	| 'transparent'
	| 'danger'
	| 'primary'
	| 'secondary'
	| 'glass';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface AppButtonProps {
	onEvent?: (event: MouseEvent<HTMLDivElement>) => void | Promise<void>;
	text?: string | ReactNode;
	IconLeft?: ReactNode;
	IconRight?: ReactNode;
	disabled?: boolean;
	type?: ButtonType;
	size?: ButtonSize;
	loading?: boolean;
	className?: string;
	style?: React.CSSProperties;
	elastic?: boolean;
}


export const AppButton = ({
	                          onEvent,
	                          text,
	                          IconLeft,
	                          IconRight,
	                          disabled = false,
	                          type = 'default',
	                          size = 'medium',
	                          loading = false,
	                          className = '',
	                          style,
	                          elastic = false,
}: AppButtonProps) => {
	const [internalLoading, setInternalLoading] = useState(false);
	const isActuallyLoading = loading || internalLoading;
	const isActuallyDisabled = disabled || isActuallyLoading;
	const isTouchDevice = typeof window !== 'undefined' &&
		('ontouchstart' in window || navigator.maxTouchPoints > 0);
	const useElastic = elastic && !isTouchDevice;
	const ref = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState<string>('translate(0,0) scale(1,1)');
	const [lastTransform, setLastTransform] = useState({x: 0, y: 0});

	const handlePress = async (event: MouseEvent<HTMLDivElement>) => {
		if (isActuallyDisabled || !onEvent) return;
		setInternalLoading(true);
		try {
			const result = onEvent(event);
			if (result instanceof Promise) await result;
		} catch (error) {
			console.error('Ошибка в onEvent:', error);
		} finally {
			setInternalLoading(false);
		}
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!useElastic || !ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const midX = rect.width / 2;
		const midY = rect.height / 2;

		const moveX = (x - midX) / midX;
		const moveY = (y - midY) / midY;

		const translateX = moveX * 6;
		const translateY = moveY * 6;

		const stretchFactor = 0.125;
		const stretchX = 1 + Math.abs(moveX) * (stretchFactor / 1.5);
		const stretchY = 1 + Math.abs(moveY) * stretchFactor;

		setLastTransform({x: translateX, y: translateY});

		const originX = moveX > 0 ? '0%' : '100%';
		const originY = moveY > 0 ? '0%' : '100%';

		if (ref.current) {
			ref.current.style.transformOrigin = `${originX} ${originY}`;
		}

		setTransform(`translate(${translateX}px, ${translateY}px) scale(${stretchX}, ${stretchY})`);
	};

	const handleMouseLeave = () => {
		if (!useElastic) return;

		setTimeout(() => setTransform(`translate(${-lastTransform.x / 2}px, ${-lastTransform.y / 2}px) scale(1,1)`), 100);
		setTimeout(() => setTransform('translate(0,0) scale(1,1)'), 200);

		if (ref.current) {
			setTimeout(() => ref.current.style.transformOrigin = '50% 50%', 250);
		}
	};


	const buttonClasses = [
		'app-button',
		`app-button--${type}`,
		`app-button--${size}`,
		isActuallyDisabled ? 'app-button--disabled' : '',
		isActuallyLoading ? 'app-button--loading' : '',
		useElastic ? 'app-button--elastic' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			ref={ref}
			className={buttonClasses}
			onClick={handlePress}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onTouchEnd={() => setTransform('translate(0,0) scale(1,1)')}
			aria-disabled={isActuallyDisabled}
			aria-busy={isActuallyLoading}
			style={{...style, transform}}
		>
			<span className="app-button__content">
				{IconLeft}
				{text}
				{IconRight}
			</span>
		</div>
	);
};
