import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const refs = {
  galleryContainer: document.querySelector('.gallery'),
};

const createGalleryMarkup = galleryItems => {
  return galleryItems
    .map(item => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`;
    })
    .join('');
};

const onEscKeyPress = (e, modal) => {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    modal.close();
  }
};

const getPreviewImgUrl = el => {
  return el.dataset.source;
};

const showBasicLightbox = previewImgUrl => {
  const modal = basicLightbox.create(`
		<img width="1400" height="900" src="${previewImgUrl}">`);
  modal.show();

  window.addEventListener('keydown', e => onEscKeyPress(e, modal), { once: true });
};

const onGalleryContainerClick = e => {
  e.preventDefault();
  const currentEl = e.target;
  const isGalleryItem = currentEl.classList.contains('gallery__image');

  if (!isGalleryItem) {
    return;
  }

  const previewImgUrl = getPreviewImgUrl(currentEl);
  showBasicLightbox(previewImgUrl);
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.innerHTML = galleryMarkup;

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
