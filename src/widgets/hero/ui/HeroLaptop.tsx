import {Suspense, useEffect, useRef, useState} from 'react';

import {Bounds, OrbitControls, RandomizedLight} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

import {useLazyInView} from '@shared/hooks/useLazyInView.ts';
import {Laptop} from '@shared/models/laptop/Laptop.jsx';
import {Centered, Controls} from '@shared/models/Shared';

const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

export const HeroLaptop = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const orbitRef = useRef(null);
	const {isActive} = useLazyInView(containerRef, {rootMargin: '0px'});
	const [isReady, setIsReady] = useState(false);
	const [isMobile, setIsMobile] = useState(
		() => typeof window !== 'undefined' && window.matchMedia(MOBILE_MEDIA_QUERY).matches,
	);

	useEffect(() => {
		const idleCallback = window.requestIdleCallback
			? window.requestIdleCallback(() => setIsReady(true), {timeout: 500})
			: window.setTimeout(() => setIsReady(true), 300);

		return () => {
			if (window.requestIdleCallback) {
				window.cancelIdleCallback(idleCallback as number);
			} else {
				window.clearTimeout(idleCallback as number);
			}
		};
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
		const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const boundsMargin = isMobile ? 1.3 : 1.25;

	return (
		<div ref={containerRef} className="hero__model">
			{isReady && (
				<Canvas
					key={isMobile ? 'mobile' : 'desktop'}
					camera={{position: [0, 0.2, 1.35], fov: 25}}
					dpr={[1, 1.5]}
					frameloop={isActive ? 'always' : 'never'}
					gl={{powerPreference: 'high-performance', antialias: true}}
					style={{
						backgroundColor: 'transparent',
						overflow: 'visible',
						width: '100%',
						height: '100%',
					}}
				>
					<ambientLight intensity={5}/>
					<directionalLight position={[1, 2, - 5]} intensity={0.45}/>
					<RandomizedLight size={1} intensity={0.2} />
					<directionalLight position={[1, 2.5, -2]} intensity={0.25}/>

					<Suspense fallback={null}>
						<Bounds fit clip observe margin={boundsMargin}>
							<Centered>
								<Laptop
									scale={2.3}
									rotation={[0.3, 0, 0]}
								/>
							</Centered>
						</Bounds>
					</Suspense>

					<OrbitControls
						ref={orbitRef}
						enableZoom={false}
						enablePan={false}
						enableDamping={false}
						autoRotateSpeed={0.5}
						minPolarAngle={Math.PI / 3}
						maxPolarAngle={Math.PI / 1.8}
					/>

					<Controls orbitRef={orbitRef} isIdle/>
				</Canvas>
			)}
		</div>
	);
};
