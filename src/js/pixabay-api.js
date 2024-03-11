// pixabay-api.js
export function fetchImages(query) {
  const API_KEY = '42796479-140a0b0d57e5aafe2bfea6b1d';
  const BASE_URL = 'https://pixabay.com/api/';
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFESEARCH = 'true';

  const response = fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = response.json();
  const images = data.hits;

  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('No images found');
  }

  return images;
}
