import {initialCards} from "./cards.js"
import {openModal, closeModal} from "../src/components/modal.js";
import {createCard} from "../src/components/card.js"
import {checkInputValidity} from "../src/components/validate.js"
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
buttonOpenProfile.addEventListener('click', () => {
    openModal(profilePopup);
})

// Закрытие формы редактирования профиля
buttonCloseProfile.addEventListener('click', () => {
    closeModal(profilePopup);
})

// Открытие формы добавления карточки
buttonAddCard.addEventListener('click', () => {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    openModal(cardPopup);
});

// Закрытие формы добавления карточки
buttonCloseCard.addEventListener('click', () => {
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


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector(".popup__button");
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((elem) => {
        return !elem.validity.valid;
    });
}

function toggleButtonState(input, buttonElement) {
    if (hasInvalidInput(input)) {
        buttonElement.classList.add("button_inactive");
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove("button_inactive");
        buttonElement.removeAttribute('disabled');

    }
}

enableValidation();

