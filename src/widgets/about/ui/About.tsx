import {profile} from '@shared/config/profile.ts';
import {SectionTitle} from '@shared/ui/section-title/SectionTitle';
import {ScrollReveal} from '@shared/ui/scroll-reveal/ScrollReveal';

import '../styles/about.scss';


export const About = () => {
	return (
		<section className="about" id="about">
			<SectionTitle text="Обо мне" subtitle="Frontend-разработчик с опытом в госсекторе и любовью к пленочной фотографии"/>

			<div className="about__content">
				<ScrollReveal>
					<div className="about__text">
						{profile.about.map((paragraph, index) => (
							<p key={index} className="about__paragraph">{paragraph}</p>
						))}

						<div className="about__languages">
							{profile.languages.map((lang) => (
								<div key={lang.name} className="about__lang">
									<span className="about__lang-name">{lang.name}</span>
									<span className="about__lang-level">{lang.level}</span>
								</div>
							))}
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
};
