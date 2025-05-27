let currentPopup = null;

//Обработчик закрытия на overlay.
function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
        closeModal(e.currentTarget);
    }
}

//Закрытие на Esc.
function closeByEsc(e){
    if(e.key === 'Escape' && currentPopup !== null) {
        closeModal(currentPopup);
    }
}


// Открытие модального окна на overlay.
export function openModal(popup) {
    currentPopup = popup;
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
    popup.classList.add('popup_is-opened');
}


// Закрытие модального окна на кнопку.
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', closeByOverlay);
    currentPopup = null;
}