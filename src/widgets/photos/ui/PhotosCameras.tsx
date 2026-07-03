import {useRef} from 'react';

import {Canon7, Kiev4, Kiev60} from '@shared/models/cameras';
import {Centered} from '@shared/models/Shared.tsx';
import {CameraModel} from '@shared/ui/camera-model/CameraModel.tsx';
import {useLazyInView} from '@shared/hooks/useLazyInView.ts';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';

export const PhotosCameras = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const {shouldMount, isActive} = useLazyInView(sectionRef, {rootMargin: '300px 0px'});

	return (
		<div ref={sectionRef} className="about__cameras-section">
			<SectionTitle text="Мои фотоаппараты"/>
			<div className="about__cameras">
				{shouldMount ? (
					<>
						<CameraModel
							cameraProps={{position: [1, 0, 0], fov: 60}}
							label="Canon 7"
							isActive={isActive}
						>
							<Centered>
								<Canon7/>
							</Centered>
						</CameraModel>

						<CameraModel
							cameraProps={{position: [1, 0, 0], fov: 60}}
							label="Киев-4"
							isActive={isActive}
						>
							<Centered>
								<Kiev4 scale={0.12}/>
							</Centered>
						</CameraModel>

						<CameraModel
							cameraProps={{position: [50, 0, 0], fov: 60}}
							label="Киев-60"
							isActive={isActive}
						>
							<Centered>
								<Kiev60 scale={0.25}/>
							</Centered>
						</CameraModel>
					</>
				) : (
					<div className="about__cameras-placeholder" aria-hidden/>
				)}
			</div>
		</div>
	);
};
