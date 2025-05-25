function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
        closeModal(e.currentTarget);
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