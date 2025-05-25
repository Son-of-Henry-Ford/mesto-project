const page = document.querySelector('.page');


function closeByOverlay(e) {
    if(!e.target.closest('.popup__content')){
        const openPopup = document.querySelector('.popup.popup_is-opened');
        closeModal(openPopup);
    }
}


function closeByEsc(e){
    if(e.key === 'Escape') {
        const openPopup = document.querySelector('.popup.popup_is-opened');
        closeModal(openPopup);
    }
}


// Открытие модального окна
export function openModal(popup) {
    page.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
    popup.classList.add('popup_is-opened');
}


// Закрытие модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    page.removeEventListener('click', closeByOverlay);
}