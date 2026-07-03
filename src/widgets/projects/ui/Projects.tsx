import {useRef, useState, type MouseEvent} from 'react';

import {profile} from '@shared/config/profile.ts';
// import {useSpringScrollInertia} from '@shared/hooks/useSpringScrollInertia.ts';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';

import '../styles/projects.scss';

const ProjectCard = ({
	project,
}: {
	project: typeof profile.projects[number];
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState('');
	// const inertiaOffset = useSpringScrollInertia({
	// 	enabled: true,
	// 	strength: 0.2,
	// 	maxOffset: 24,
	// });

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
			// style={{transform: `translate3d(0, ${inertiaOffset}px, 0)`}}
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

export const Projects = () => (
	<section className="projects" id="projects">
		<SectionTitle text="Проекты" subtitle="Ключевые проекты из опыта работы в госсекторе и МФЦ"/>

		<div className="projects__grid">
			{profile.projects.map((project) => (
				<ProjectCard key={project.id} project={project}/>
			))}
		</div>
	</section>
);
