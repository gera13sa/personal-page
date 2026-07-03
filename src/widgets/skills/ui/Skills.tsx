import {useState} from 'react';

import {profile} from '@shared/config/profile.ts';
// import {useSpringScrollInertia} from '@shared/hooks/useSpringScrollInertia.ts';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle.tsx';

import '../styles/skills.scss';

const SkillCard = ({
	skill,
}: {
	skill: { name: string; level: number };
}) => {
	// const inertiaOffset = useSpringScrollInertia({
	// 	enabled: true,
	// 	strength: 0.16,
	// 	maxOffset: 18,
	// });

	return (
		<div
			className="skills__card-shell skills__card-shell--inertia"
			// style={{transform: `translate3d(0, ${inertiaOffset}px, 0)`}}
		>
			<div className="skills__card">
				<div className="skills__card-header">
					<span className="skills__card-name">{skill.name}</span>
					{/*<span className="skills__card-level">{skill.level}%</span>*/}
				</div>
				<div className="skills__bar">
					<div
						className="skills__bar-fill"
						style={{'--level': `${skill.level}%`} as React.CSSProperties}
					/>
				</div>
			</div>
		</div>
	);
};

export const Skills = () => {
	const [activeCategory, setActiveCategory] = useState(profile.skillGroups[0].category);

	const currentGroup = profile.skillGroups.find((g) => g.category === activeCategory)!;

	return (
		<section className="skills" id="skills">
			<SectionTitle text="Навыки" subtitle="Технологии и инструменты, с которыми работаю ежедневно"/>

			<div className="skills__tabs">
				{profile.skillGroups.map((group) => (
					<button
						key={group.category}
						className={`skills__tab ${activeCategory === group.category ? 'skills__tab--active' : ''}`}
						onClick={() => setActiveCategory(group.category)}
					>
						{group.category}
					</button>
				))}
			</div>

			<div className="skills__grid">
				{currentGroup.skills.map((skill) => (
					<SkillCard key={skill.name} skill={skill}/>
				))}
			</div>

			<div className="skills__tags">
				{profile.skillGroups.flatMap((g) => g.skills).map((skill) => (
					<span className="skills__tag" key={skill.name}>{skill.name}</span>
				))}
			</div>
		</section>
	);
};
