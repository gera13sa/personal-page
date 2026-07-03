import {CryptoWord} from '@shared/ui/crypto-word/CryptoWord.tsx';

import './sectionTitle.scss';

interface SectionTitleProps {
	text: string;
	subtitle?: string;
}

export const SectionTitle = ({text, subtitle}: SectionTitleProps) => (
	<div className="section-title">
		<h2 className="section-title__heading">
			<CryptoWord text={text}/>
		</h2>
		{subtitle && <p className="section-title__subtitle">{subtitle}</p>}
	</div>
);
