import {openModal, closeModal} from "./modal.js";
import {createCard} from "./card.js";
import {enableValidation} from "./validate.js";
import '../pages/index.css';
import {getInitialCards, getUser, updateUserData, addNewCard} from "./api"

// Получаем все всплывающие окна
const popups = document.querySelectorAll('.popup');
//Получаем ненумерованный список для карточек
const cardsList = document.querySelector('.places__list');
// Получаем попапы и элементы профиля
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
// Получаем элементы профиля
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__title');
const userJob = profile.querySelector('.profile__description');
const userAvatar = profile.querySelector('.profile__image');
// Кнопки открытия/закрытия формы профиля
const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonCloseProfile = profilePopup.querySelector('.popup__close');
// Элементы формы профиля
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
// Кнопки и элементы формы добавления карточки
const buttonAddCard = profile.querySelector('.profile__add-button');
const buttonCloseCard = cardPopup.querySelector('.popup__close');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');
const cardFormElement = cardPopup.querySelector('.popup__form');


const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const updatedUserData = {
        name: nameInput.value,
        about: jobInput.value
    };
    updateUserData(updatedUserData)
        .then(({name, about}) => {
            userName.textContent = name;
            userJob.textContent = about;
            closeModal(profilePopup);
        })
        .catch(function (error) {
            console.error("Не удалось обновить информацию о пользователе:", error);
        });
}


// Обработчик отправки формы новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };
    addNewCard(newCardData)
        .then(card => {
            const newCard = createCard(card, card.owner._id);
            cardsList.prepend(newCard);
            closeModal(cardPopup);
        })
        .catch(function (error) {
            console.error("Не удалось добавить карточку:", error);
        });
}


//Добавление анимации для всплывающих окон
function addPopupAnimations() {
    popups.forEach(popup => popup.classList.add("popup_is-animated"));
}


// Открытие формы редактирования профиля
buttonOpenProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(profilePopup);
})

// Закрытие формы редактирования профиля
buttonCloseProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal(profilePopup);
})

// Открытие формы добавления карточки
buttonAddCard.addEventListener('click', (e) => {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    e.stopPropagation();
    openModal(cardPopup);
});

// Закрытие формы добавления карточки
buttonCloseCard.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal(cardPopup);
})

// Отправка формы профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Отправка формы для карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);


function initApp() {
    Promise.all([getUser(), getInitialCards()])
        .then(([user, cards]) => {
            // Устанавливаем данные пользователя
            userName.textContent = user.name;
            userJob.textContent = user.about;
            userAvatar.src = user.avatar;

            // Сохраняем ID пользователя
            const userId = user._id;

            // Отрисовываем карточки
            cards.forEach(card => {
                cardsList.append(createCard(card, userId));
            });
        })
        .catch(error => {
            console.error("Ошибка при инициализации данных:", error);
        });

    addPopupAnimations();
    enableValidation(validationSettings);
}

initApp();