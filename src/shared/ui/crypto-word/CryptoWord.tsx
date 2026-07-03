import {useEffect, useRef, useState} from 'react';

import {useIsVisible} from '@shared/hooks/useIsVissible.ts';

import './cryptoWord.scss';


export const CryptoWord = ({text, framesPerLetter = 10}: { text: string, framesPerLetter?: number }) => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const [isPlayed, setIsPlayed] = useState(false);

	const ref = useRef<HTMLSpanElement>(null);
	const isVisible = useIsVisible(ref);

	const [display, setDisplay] = useState<string[]>([]);

	useEffect(() => {
		if (!isVisible) return;

		let frame = 0;
		let revealed = 0;
		const totalFramesPerLetter = framesPerLetter;

		const animate = () => {
			const newChars = text.split('').map((letter, i) => {
				if (i < revealed) return letter;
				if (letter === ' ') return '\u00A0';
				return characters[Math.floor(Math.random() * characters.length)];
			});

			setDisplay(newChars);

			frame++;
			if (frame % totalFramesPerLetter === 0) revealed++;
			if (revealed <= text.length) requestAnimationFrame(animate);
			if (revealed === text.length) {
				setIsPlayed(true);
				return;
			}
		};

		if (!isPlayed) animate();
	}, [isVisible, text]);

	return (
		<span className="crypto-word" ref={ref}>
			{isPlayed ? (
				text
			) : (
				display.map((char, i) => (
					<span key={i} className="crypto-letter" data-char={char}>
						{char}
					</span>
				))
			)}

		</span>
	);
};
