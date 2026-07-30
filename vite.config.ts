import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression, {defineAlgorithm} from 'vite-plugin-compression2';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
	plugins: [
		react(),
		ViteImageOptimizer({
			jpeg: {
				quality: 90,
			},
		}),
		compression({
			algorithms: [
				'gzip',
				'brotliCompress',
				defineAlgorithm('deflate', {level: 9}),
			],
		}),
	],
	// CORS for dev
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:4000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
