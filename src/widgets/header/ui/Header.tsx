import {useEffect, useState} from 'react';

import {AppButton} from '@shared/ui/app-button/AppButton.tsx';
import {CryptoWord} from '@shared/ui/crypto-word/CryptoWord.tsx';
import {useScrollTo} from '@shared/hooks/useScrollTo.ts';

import '../styles/header.scss';

const navItems = [
	{id: 'about', label: 'Обо мне'},
	{id: 'skills', label: 'Навыки'},
	{id: 'experience', label: 'Опыт'},
	{id: 'projects', label: 'Проекты'},
	{id: 'photos', label: 'Фото'},
	{id: 'contact', label: 'Контакты'},
];

export const Header = () => {
	const scrollTo = useScrollTo();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll, {passive: true});
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const closeOnResize = () => {
			if (window.innerWidth > 768) setMenuOpen(false);
		};
		window.addEventListener('resize', closeOnResize);
		return () => window.removeEventListener('resize', closeOnResize);
	}, []);

	return (
		<header className={`header-container ${scrolled ? 'header-container--scrolled' : ''}`}>
			<div className="header-content">
				<button
					type="button"
					className={`header-burger ${menuOpen ? 'header-burger--open' : ''}`}
					aria-label="Открыть меню"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((prev) => !prev)}
				>
					<span className="header-burger__line"/>
					<span className="header-burger__line"/>
					<span className="header-burger__line"/>
				</button>

				<nav className={`header-nav ${menuOpen ? 'header-nav--open' : ''}`}>
					{navItems.map((item) => (
						<AppButton
							key={item.id}
							text={<CryptoWord text={item.label}/>}
							type="glass"
							elastic
							onEvent={() => {
								scrollTo(item.id);
								setMenuOpen(false);
							}}
						/>
					))}
				</nav>
			</div>
		</header>
	);
};
