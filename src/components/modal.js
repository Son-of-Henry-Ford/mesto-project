let currentPopup = null;


function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
        closeModal(e.currentTarget);
    }
}


function closeByEsc(e){
    if(e.key === 'Escape' && currentPopup !== null) {
        closeModal(currentPopup);
    }
}


// Открытие модального окна
export function openModal(popup) {
    currentPopup = popup;
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
    popup.classList.add('popup_is-opened');
}


// Закрытие модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', closeByOverlay);
}