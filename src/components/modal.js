// Открытие модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


// Закрытие модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}