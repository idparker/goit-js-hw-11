import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');

function getImages(event) {
  event.preventDefault();

  const loaderContainer = document.querySelector('.loader');
  loaderContainer.style.display = 'block';

  const API_KEY = '42796479-140a0b0d57e5aafe2bfea6b1d';
  const BASE_URL = 'https://pixabay.com/api/';
  const QUERY = searchInput.value.trim();
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFESEARCH = 'true';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${QUERY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`
  )
    .then(response => response.json())
    .then(data => {
      const images = data.hits;
      // Проверка на отсутствие картинок
      if (!Array.isArray(images) || QUERY.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: '#ef4040',
          messageColor: '#fff',
        });
        gallery.innerHTML = '';
        return;
      }

      const imageHTML = images
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            downloads,
            comments,
            views,
          }) => {
            return `<li class="gallery-item">
              <a href="${largeImageURL}" class="gallery-link"><img class="gallery-img" src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" title="${tags}" /></a>
              <div class="activity">
              <h3>Likes<p class="activity-item">${likes}</p></h3>
              <h3>Views<p class="activity-item">${views}</p></h3>
              <h3>Comments<p class="activity-item">${comments}</p></h3>
              <h3>Downloads<p class="activity-item">${downloads}</p></div></h3>
          </li>`;
          }
        )
        .join('');

      gallery.innerHTML = imageHTML;
      let lightbox = new SimpleLightbox('.gallery a');
      loaderContainer.style.display = 'none';
      lightbox.refresh();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Ошибка',
        message: 'Не удалось получить картинки. Попробуйте позже.',
        position: 'topRight',
      });

      loaderContainer.style.display = 'none';
    });
}

searchButton.addEventListener('click', getImages);
