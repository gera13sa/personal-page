import {useState, useEffect} from 'react';

import MeshBackground from '@shared/ui/mesh-background/MeshBackground.tsx';

import {About} from '@widgets/about';
import {Contact} from '@widgets/contact';
import {Experience} from '@widgets/experience';
import {Header} from '@widgets/header';
import {Hero} from '@widgets/hero';
import {Photos} from '@widgets/photos';
import {Projects} from '@widgets/projects';
import {Skills} from '@widgets/skills';

import '../styles/homePage.scss';

export const HomePage = () => {
	const [columns, setColumns] = useState(30);

	useEffect(() => {
		const update = () => setColumns(Math.max(10, Math.floor(window.innerWidth / 36)));
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	return (
		<div className="home-page-container">
			<Header/>
			<main className="home-page-main">
				<Hero/>
				<About/>
				<Skills/>
				<Experience/>
				<Projects/>
				<Photos/>
				<Contact/>
			</main>

			<MeshBackground columns={columns}/>
		</div>
	);
};
