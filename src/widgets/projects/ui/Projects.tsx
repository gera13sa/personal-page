import {useEffect, useRef, useState, type MouseEvent} from 'react';

import {INITIAL_WORKS_COUNT, workExamples} from '@shared/config/projectWorks.ts';
import {profile} from '@shared/config/profile.ts';
import {AppButton} from '@shared/ui/app-button/AppButton.tsx';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';

import '../styles/projects.scss';


const ProjectCard = ({
	project,
}: {
	project: typeof profile.projects[number];
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState('');

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTransform(`perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`);
	};

	const handleMouseLeave = () => setTransform('');

	return (
		<div
			className="projects__card-shell projects__card-shell--inertia"
		>
			<div
				ref={cardRef}
				className="projects__card"
				style={{transform}}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<div className="projects__card-glow"/>
				<span className="projects__card-company">{project.company}</span>
				<h3 className="projects__card-title">{project.title}</h3>
				<p className="projects__card-desc">{project.description}</p>
				<div className="projects__card-tags">
					{project.tags.map((tag) => (
						<span key={tag} className="projects__tag">{tag}</span>
					))}
				</div>
			</div>
		</div>
	);
};

export const Projects = () => {
	const [showAll, setShowAll] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const visibleWorks = showAll ? workExamples : workExamples.slice(0, INITIAL_WORKS_COUNT);
	const hasMore = workExamples.length > INITIAL_WORKS_COUNT;

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveIndex(null);
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, []);

	return (
		<section className="projects" id="projects">
			<SectionTitle text="Проекты" subtitle="Ключевые проекты из опыта работы в госсекторе и МФЦ"/>

			<div className="projects__grid">
				{profile.projects.map((project) => (
					<ProjectCard key={project.id} project={project}/>
				))}
			</div>

			<div className="projects__gallery">
				{visibleWorks.map((work, index) => (
					<div
						className={`projects__shot ${activeIndex === index ? 'projects__shot--active' : ''}`}
						key={work.id}
						onClick={() => setActiveIndex(activeIndex === index ? null : index)}
					>
						<img src={work.previewUrl} alt={work.title} className="projects__shot-img" loading="lazy"/>
						<span className="projects__shot-title">{work.title}</span>
					</div>
				))}
			</div>

			{hasMore && !showAll && (
				<div className="projects__actions">
					<AppButton
						text="Показать ещё"
						type="glass"
						elastic
						onEvent={() => setShowAll(true)}
					/>
				</div>
			)}

			{activeIndex !== null && (
				<div className="projects__lightbox" onClick={() => setActiveIndex(null)}>
					<div className="projects__lightbox-content" onClick={(e) => e.stopPropagation()}>
						<img src={visibleWorks[activeIndex].fullUrl} alt={visibleWorks[activeIndex].title}/>
						<p className="projects__lightbox-caption">{visibleWorks[activeIndex].title}</p>
					</div>
				</div>
			)}
		</section>
	);
};
