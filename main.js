import images from "/gallery-items.js";

const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    btn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxImage: document.querySelector(".lightbox__image"),
    overlay: document.querySelector(".lightbox__overlay")
};

const imageGallery = createGalleryList(images);
refs.gallery.insertAdjacentHTML('afterBegin', imageGallery);
refs.gallery.addEventListener('click', onImageGalleryClick);
refs.btn.addEventListener('click', onButtonCloseClick)
refs.overlay.addEventListener('click', onLightboxCloseClick)

function createGalleryList(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    }).join('');
};

function onImageGalleryClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return
    }
    window.addEventListener("keydown", onKeyClick);
    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = e.target.dataset.source;
    refs.lightboxImage.alt = e.target.alt;
}

function onButtonCloseClick() {
    window.removeEventListener("keydown", onKeyClick);
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
}

function onKeyClick(e) {
    if (e.code === 'Escape') {
        onButtonCloseClick()
    }
}

function onLightboxCloseClick(e) {
    if (e.currentTarget === e.target) {
        onButtonCloseClick()
    }
}