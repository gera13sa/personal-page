export interface PhotoItem {
	id: string;
	previewUrl: string;
	fullUrl: string;
}

const PHOTO_FILES = [
	'2024-09-30-0005.jpeg',
	'2024-10-02-0010.jpeg',
	'2024-10-03-0002.jpeg',
	'2024-10-03-0011.jpeg',
	'DSC05235.jpeg',
	'DSC05704.jpeg',
	'DSC05707.jpeg',
	'raw0023.jpeg',
	'scan012.jpeg',
	'raw0029.jpeg',
	'scan0030.jpeg',
	'scan019.jpeg',
	// 'scan020.jpeg',
] as const;

export const photos: PhotoItem[] = PHOTO_FILES.map((file) => ({
	id: file,
	previewUrl: `/photos/previews/preview_${file}`,
	fullUrl: `/photos/${file}`,
}));

export const INITIAL_PHOTOS_COUNT = 4;
