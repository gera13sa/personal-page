import {lazy, Suspense} from 'react';

import {profile} from '@shared/config/profile.ts';
import {getTotalExperienceShortLabel} from '@shared/lib/experienceDuration.ts';
import {AppButton} from '@shared/ui/app-button/AppButton.tsx';
import {CryptoWord} from '@shared/ui/crypto-word/CryptoWord.tsx';
import {ScrollReveal} from '@shared/ui/scroll-reveal/ScrollReveal.tsx';
import {useScrollTo} from '@shared/hooks/useScrollTo.ts';

import '../styles/hero.scss';

const HeroLaptop = lazy(() =>
	import('./HeroLaptop.tsx').then((module) => ({default: module.HeroLaptop})),
);

export const Hero = () => {
	const scrollTo = useScrollTo();

	return (
		<section className="hero" id="hero">
			<div className="hero__layout">
				<Suspense fallback={<div className="hero__model hero__model--placeholder" aria-hidden/>}>
					<HeroLaptop/>
				</Suspense>

				<ScrollReveal>
					<div className="hero__content">
						<p className="hero__greeting">
							<CryptoWord text="Привет, я" framesPerLetter={10}/>
						</p>
						<h1 className="hero__name">
							<CryptoWord text={profile.name} framesPerLetter={15}/>
						</h1>
						<p className="hero__title">
							<CryptoWord text={profile.title} framesPerLetter={12}/>
						</p>
						<p className="hero__location">
							{profile.location} · {getTotalExperienceShortLabel(profile.experience)}
						</p>
						<div className="hero__actions">
							<AppButton
								text="Смотреть проекты"
								type="glass"
								elastic
								onEvent={() => scrollTo('projects')}
							/>
							<AppButton
								text="Смотреть резюме"
								type="transparent"
								elastic
								onEvent={() => {
									window.open(profile.resume, '_blank', 'noopener,noreferrer');
								}}
							/>
							<AppButton
								text="Написать"
								type="transparent"
								elastic
								onEvent={() => scrollTo('contact')}
							/>
						</div>
					</div>
				</ScrollReveal>
			</div>

			<div className="hero__scroll-hint" aria-hidden="true">
				<span className="hero__scroll-line"/>
			</div>
		</section>
	);
};
