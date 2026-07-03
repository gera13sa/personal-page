import {useCallback} from 'react';

export const useScrollTo = () => {
	return useCallback((sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const headerOffset = 100;
			const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
			window.scrollTo({top, behavior: 'smooth'});
		}
	}, []);
};
