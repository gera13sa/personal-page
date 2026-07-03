import {getAllPhotos} from '@shared/api/photos';
import {useApi} from '@shared/hooks/useApi.ts';
import {useEffect} from 'react';

export const usePhotos = () => {
	const {data: photos, call: getPhotos, loading, error} = useApi(getAllPhotos);

	useEffect(() => {
		void getPhotos();
	}, []);

	return {
		photos,
		loading,
		error
	};
};
