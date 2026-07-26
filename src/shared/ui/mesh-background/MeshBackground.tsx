import {useEffect, useState} from 'react';

export default function MeshBackground({columns = 10}) {
	const [bgSize, setBgSize] = useState('64px 64px');

	useEffect(() => {
		const updateSize = () => {
			const w = window.innerWidth / columns;
			setBgSize(`${w}px ${w}px`);
		};
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [columns]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				marginLeft: -1,
				marginTop: -1,
				backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
        `,
				backgroundSize: bgSize,
				backgroundColor: 'black',
				zIndex: -1,
				WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
				maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
				WebkitMaskSize: '100% 100%',
				maskSize: '100% 100%',
			}}
		/>
	);
}
