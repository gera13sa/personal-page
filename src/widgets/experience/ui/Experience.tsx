import {useState} from 'react';

import {profile} from '@shared/config/profile.ts';
import {
	getExperienceDuration,
	getTotalExperienceDuration,
} from '@shared/lib/experienceDuration.ts';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';
import {ScrollReveal} from '@shared/ui/scroll-reveal/ScrollReveal.tsx';

import '../styles/experience.scss';

export const Experience = () => {
	const [expandedId, setExpandedId] = useState<string | null>(profile.experience[0].id);

	return (
		<section className="experience" id="experience">
			<SectionTitle
				text="Опыт"
				subtitle={`${getTotalExperienceDuration(profile.experience)} в разработке фронтенда`}
			/>

			<div className="experience__timeline">
				{profile.experience.map((item, index) => {
					const isExpanded = expandedId === item.id;

					return (
						<div
							key={item.id}
							className={`experience__item ${isExpanded ? 'experience__item--expanded' : ''}`}
							onClick={() => setExpandedId(isExpanded ? null : item.id)}
						>
							<div className="experience__marker">
								<span className="experience__dot"/>
								{index < profile.experience.length - 1 && <span className="experience__line"/>}
							</div>

							<div className="experience__card">
								<div className="experience__card-header">
									<div>
										<h3 className="experience__company">{item.company}</h3>
										<p className="experience__role">{item.role}</p>
									</div>
									<div className="experience__meta">
										<span className="experience__period">{item.period}</span>
										<span className="experience__duration">
											{getExperienceDuration(item)}
										</span>
									</div>
								</div>

								<div className="experience__details">
									<ul className="experience__list">
										{item.description.map((point, i) => (
											<li key={i}>{point}</li>
										))}
									</ul>
									<div className="experience__stack">
										{item.stack.map((tech) => (
											<span key={tech} className="experience__stack-tag">{tech}</span>
										))}
									</div>
								</div>

								<span className="experience__toggle">{isExpanded ? '−' : '+'}</span>
							</div>
						</div>
					);
				})}
			</div>

			<div className="experience__education">
				<h3 className="experience__edu-title">Образование</h3>
				{profile.education.map((edu, index) => (
					<ScrollReveal key={edu.year + edu.degree} delay={index * 100}>
						<div className="experience__edu-card">
							<span className="experience__edu-year">{edu.year}</span>
							<div>
								<p className="experience__edu-degree">{edu.degree} · {edu.specialty}</p>
								<p className="experience__edu-uni">{edu.university}</p>
							</div>
						</div>
					</ScrollReveal>
				))}
			</div>
		</section>
	);
};
