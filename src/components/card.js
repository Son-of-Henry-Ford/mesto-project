import {openModal, closeModal} from "./modal.js";
const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');

// Элементы попапа изображения
const imageFormTitle = imagePopup.querySelector('.popup__caption');
const imageFormImage = imagePopup.querySelector('.popup__image');

// Функция добавления слушателя на кнопку "лайк" карточки.
function setLikeListener(card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
}


// Функция добавления слушателя на кнопку удаления карточки.
function setDeleteListener(card) {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const cardToRemove = deleteButton.closest('.places__item');
        cardToRemove.remove();
    });
}


//Функция добавления слушателей открытия и закрытия картинки
function setImagePopupListener(cardImage, name, link) {
    cardImage.addEventListener('click', () => {
        imageFormTitle.textContent = name;
        imageFormImage.src = link;
        openModal(imagePopup);
    });
    //добавление слушателя для закрытия картинки.
    const closeButton = imagePopup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(imagePopup);
    });
}


// Функция создания карточки
export function createCard(name, link) {
    // клонируем содержимое тега template.
    const card = cardElement.cloneNode(true);
    //Наполнение контейнера.
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    //добавление слушателя для кнопки "лайк".
    setLikeListener(card);
    //добавление слушателя для кнопки удаления.
    setDeleteListener(card);
    //добавление слушателя для открытия картинки.
    setImagePopupListener(cardImage, name, link);
    return card;
}