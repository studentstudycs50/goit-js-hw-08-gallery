import galleryItems from "./js/gallery-items.js"

const listGalleryRef = document.querySelector('.js-gallery')
const modalRef = document.querySelector('.js-lightbox')
const imageModalRef = document.querySelector('.lightbox__image')
const closeModalButton = document.querySelector('button[data-action="close-lightbox"]')


let indexCurrentImage = 0;

listGalleryRef.addEventListener('click', onOpenModal)


function createGallery() {
    let markup = ''
    for (let i = 0; i < galleryItems.length; i += 1) {
        markup += `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${galleryItems[i].original}"
        >
          <img
            class="gallery__image"
            src="${galleryItems[i].preview}"
            data-source="${galleryItems[i].original}"
            alt="${galleryItems[i].description}"
            data-index="${i}"
          />
        </a>
      </li>`

     
    }

    listGalleryRef.innerHTML = markup
}
createGallery() 



function onOpenModal(event) {
    event.preventDefault()
    if (event.target.nodeName !== 'IMG') {
        return
    }
    indexCurrentImage = Number(event.target.dataset.index)
    modalRef.classList.add('is-open')
    imageModalRef.src = event.target.dataset.source
    closeModalButton.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onPressKey)
    
}


function onCloseModal() {
    modalRef.classList.remove('is-open')
    imageModalRef.src = ""
    window.removeEventListener("keydown", onPressKey);
}

function onPressKey(event) {
    switch (event.code) {
        case 'Escape':
            onCloseModal()
            break;
         case 'ArrowRight':
            indexCurrentImage + 1 === galleryItems.length ? (indexCurrentImage === 0) : indexCurrentImage += 1;
            imageModalRef.src = galleryItems[indexCurrentImage].original
             break;
        case 'ArrowLeft':
            indexCurrentImage === 0 ? (indexCurrentImage = galleryItems.length - 1) : indexCurrentImage -=1;
            imageModalRef.src = galleryItems[indexCurrentImage].original
                break;
        default:
            break;
    }
}







