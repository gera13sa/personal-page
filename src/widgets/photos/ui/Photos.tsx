import {lazy, Suspense, useEffect, useState} from 'react';

import {photos, INITIAL_PHOTOS_COUNT} from '@shared/config/photos.ts';
import {AppButton} from '@shared/ui/app-button/AppButton.tsx';
import {ScrollReveal} from '@shared/ui/scroll-reveal/ScrollReveal.tsx';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';

import '../styles/photos.scss';

const PhotosCameras = lazy(() =>
	import('./PhotosCameras.tsx').then((module) => ({default: module.PhotosCameras})),
);

export const Photos = () => {
	const [showAll, setShowAll] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const visiblePhotos = showAll ? photos : photos.slice(0, INITIAL_PHOTOS_COUNT);
	const hasMore = photos.length > INITIAL_PHOTOS_COUNT;

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveIndex(null);
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, []);

	return (
		<section className="photos" id="photos">
			<SectionTitle text="Фотография" />

			<div className="photos__grid">
				{visiblePhotos.map((photo, index) => (
					<div
						className={`photos__card ${activeIndex === index ? 'photos__card--active' : ''}`}
						key={photo.id}
						onClick={() => setActiveIndex(activeIndex === index ? null : index)}
					>
						<img src={photo.previewUrl} alt="" className="photos__img" loading="lazy" />
					</div>
				))}
			</div>

			{hasMore && !showAll && (
				<div className="photos__actions">
					<AppButton
						text="Показать ещё"
						type="glass"
						elastic
						onEvent={() => setShowAll(true)}
					/>
				</div>
			)}

			{activeIndex !== null && (
				<div className="photos__lightbox" onClick={() => setActiveIndex(null)}>
					<div className="photos__lightbox-content" onClick={(e) => e.stopPropagation()}>
						<div className="photos__lightbox-image">
							<img src={visiblePhotos[activeIndex].fullUrl} alt="" />
						</div>
					</div>
				</div>
			)}

			<ScrollReveal delay={200}>
				<Suspense fallback={<div className="about__cameras-placeholder" aria-hidden/>}>
					<PhotosCameras/>
				</Suspense>
			</ScrollReveal>
		</section>
	);
};
