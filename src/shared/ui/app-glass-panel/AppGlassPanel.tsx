import './appGlassPanel.scss';
import {clsx} from 'clsx';
import {useRef, type ReactNode} from 'react';
import {GlassLensFilter} from '@shared/ui/glass-lens/GlassLensFilter';
import {useGlassLens} from '@shared/ui/glass-lens/useGlassLens';


export const AppGlassPanel = ({children, classname}: {children: ReactNode, classname?: string}) => {
	const ref = useRef<HTMLDivElement>(null);
	const lens = useGlassLens(ref, true);

	return (
		<div
			ref={ref}
			className={clsx('app-glass-panel', classname)}
			style={lens.mapHref ? {
				backdropFilter: `url(#${lens.filterId}) saturate(1.2)`,
				WebkitBackdropFilter: `url(#${lens.filterId}) saturate(1.2)`,
			} : undefined}
		>
			{lens.mapHref ? <GlassLensFilter id={lens.filterId} mapHref={lens.mapHref} scale={lens.scale}/> : null}
			{children}
		</div>
	);
};
