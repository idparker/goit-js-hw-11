// main.js
import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showErrorToast,
  showEmptyMessage,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input');
const form = document.querySelector('form');
const loaderContainer = document.querySelector('.loader');

function getImages(event) {
  event.preventDefault();

  const QUERY = searchInput.value.trim();

  if (QUERY.length === 0) {
    showErrorToast('Please enter a search term before searching for images.');
    return;
  }

  gallery.innerHTML = '';
  loaderContainer.style.display = 'block';

  fetchImages(QUERY)
    .then(images => renderImages(images))
    .catch(error => {
      console.error('Error fetching images:', error);
      if (error.message === 'No images found') {
        showEmptyMessage();
      } else {
        showErrorToast('Failed to fetch images. Please try again later.');
      }
    });
}

form.addEventListener('submit', getImages);
