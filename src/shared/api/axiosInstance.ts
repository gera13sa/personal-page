import axios from 'axios';
import {apiConfig} from '@shared/config/api.js';


const axiosInstance = axios.create({
	baseURL: apiConfig.baseURL,
	timeout: apiConfig.timeout,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			delete axiosInstance.defaults.headers.common['Authorization'];
			config.headers.Authorization = `Bearer ${token}`;
			config.headers['Access-Control-Allow-Origin'] = '*';
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
