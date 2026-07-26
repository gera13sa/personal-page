import {Suspense, useEffect, useRef, useState, type ReactNode} from 'react';

import {OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

import {Controls} from '@shared/models/Shared';

import '@widgets/about/styles/about.scss';

interface CameraModelProps {
	children: ReactNode;
	cameraProps: {position: [number, number, number]; fov: number};
	label?: string;
	isActive?: boolean;
}

export const CameraModel = ({children, cameraProps, label, isActive = true}: CameraModelProps) => {
	const [hovered, setHovered] = useState(false);
	const [isIdle, setIsIdle] = useState(true);

	const orbitRef = useRef(null);
	const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const resetIdleTimer = () => {
		setIsIdle(false);

		if (idleTimeout.current) clearTimeout(idleTimeout.current);

		idleTimeout.current = setTimeout(() => {
			setIsIdle(true);
		}, 2000);
	};

	useEffect(() => {
		return () => {
			if (idleTimeout.current) clearTimeout(idleTimeout.current);
		};
	}, []);

	const isTouchDevice =
		typeof window !== 'undefined' &&
		('ontouchstart' in window || navigator.maxTouchPoints > 0);

	return (
		<div
			className={`camera-card ${hovered ? 'camera-card--hovered' : ''}`}
			onMouseEnter={() => {
				setHovered(true);
				resetIdleTimer();
			}}
			onMouseLeave={() => {
				setHovered(false);
				resetIdleTimer();
			}}
			onMouseMove={resetIdleTimer}
			onWheel={resetIdleTimer}
		>
			{label && <span className="camera-card__label">{label}</span>}
			<Canvas
				camera={cameraProps}
				dpr={[1, 1.5]}
				frameloop={isActive ? 'always' : 'never'}
				// gl={{powerPreference: 'high-performance'}}
				style={{
					backgroundColor: 'transparent',
					width: '100%',
					height: 300,
					aspectRatio: 1,
					pointerEvents: isTouchDevice ? 'none' : 'auto',
				}}
			>
				<ambientLight intensity={1.25}/>
				<ambientLight intensity={0.1}/>
				<directionalLight intensity={0.4}/>

				<Suspense fallback={null}>
					{children}
				</Suspense>

				<OrbitControls
					ref={orbitRef}
					enableZoom={false}
					autoRotateSpeed={1.2}
					touches={{
						ONE: null,
						TWO: null,
					}}
				/>

				<Controls orbitRef={orbitRef} isIdle={isIdle}/>
			</Canvas>
			<p className="camera-card__hint">Вращайте мышью</p>
		</div>
	);
};
