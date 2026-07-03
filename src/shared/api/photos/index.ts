import axiosInstance from '@shared/api/axiosInstance.ts';
import {apiConfig} from '@shared/config/api.ts';


export const getAllPhotos = async () => {
	const response = await axiosInstance.get(`${apiConfig.baseURL}api/v1/photos`);
	return response.data;
};
