import './appGlassPanel.scss';
import {clsx} from 'clsx';
import type {ReactNode} from 'react';


export const AppGlassPanel = ({children, classname}: {children: ReactNode, classname?: string}) => {
	return (
		<div className={clsx('app-glass-panel', classname)}>
			{children}
		</div>
	);
};
