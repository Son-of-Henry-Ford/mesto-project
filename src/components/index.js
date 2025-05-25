import {initialCards} from "./cards.js";
import {openModal, closeModal} from "./modal.js";
import {createCard} from "./card.js";
import {enableValidation} from "./validate.js";
import '../pages/index.css';

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


// Функция отображения начальных карточек
function displayCards() {
// наполняем контейнер карточками.
    initialCards.forEach(card => {
        // отображаем на странице
        cardsList.append(createCard(card.name, card.link));
    })
}


// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closeModal(profilePopup);
    displayCards();
}


// Обработчик отправки формы новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardNameInput.value, cardUrlInput.value);
    cardsList.prepend(newCard);
    closeModal(cardPopup);
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

// Отправка формы профиля
cardFormElement.addEventListener('submit', handleCardFormSubmit);


displayCards();
// Добавление анимаций для всех карточек
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
})

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);