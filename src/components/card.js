import {openModal, closeModal} from "./modal.js";
import {deleteCard, addLike, removeLike} from "./api"

const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');

// Элементы попапа изображения
const imageFormTitle = imagePopup.querySelector('.popup__caption');
const imageFormImage = imagePopup.querySelector('.popup__image');


// Функция добавления слушателя на кнопку "лайк" карточки.
function handleLikeListener(cardId, likeButton, likeCounter) {
    return () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        const likeRequest = isLiked ? removeLike(cardId) : addLike(cardId);
        likeRequest
            .then((cardsList) => {
                    likeButton.classList.toggle('card__like-button_is-active');
                    likeCounter.textContent = cardsList.likes.length;
                }
            )
            .catch((error) => {
                console.error("Ошибка постановки/снятия лайка:", error);
            })
    }
}


function handleCardDelete(cardId, deleteButton) {
    return () => {
        deleteCard(cardId)
            .then(() => {
                deleteButton.closest('.places__item').remove();
            })
            .catch(error => {
                console.error("Ошибка удаления карточки:", error);
            });
    };
}


//Функция добавления слушателей открытия и закрытия картинки
function setImagePopupListener(cardImage, card) {
    cardImage.addEventListener('click', (e) => {
        e.stopPropagation();
        imageFormTitle.textContent = card.name;
        imageFormImage.src = card.link;
        openModal(imagePopup);
    });
    //добавление слушателя для закрытия картинки.
    const closeButton = imagePopup.querySelector('.popup__close');
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal(imagePopup);
    });
}


// Функция создания карточки
export function createCard(newCard, myUserId) {
    // клонируем содержимое тега template.
    const card = cardElement.cloneNode(true);
    //Наполнение контейнера.
    const cardImage = card.querySelector('.card__image');
    cardImage.src = newCard.link;
    cardImage.alt = newCard.name;
    card.querySelector('.card__title').textContent = newCard.name;
    //Определение значения счётчика лайков
    const likeCounter = card.querySelector('.card__like-counter');
    likeCounter.textContent = newCard.likes.length;
    const deleteButton = card.querySelector('.card__delete-button');
    //добавление слушателя для кнопки "лайк".
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeListener(newCard._id, likeButton, likeCounter));
    //Включение выделения понравившихся картинок
    if (newCard.likes.find(like => like._id === myUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    //добавление слушателя на кнопку удаления для владельца.
    if (newCard.owner._id === myUserId) {
        const deleteButton = card.querySelector('.card__delete-button');
        deleteButton.addEventListener('click',
            handleCardDelete(newCard._id, deleteButton)
        );
    } else {
        deleteButton.classList.add('card__delete-button_hidden');
    }
    //добавление слушателя для открытия картинки.
    setImagePopupListener(cardImage, newCard);
    return card;
}